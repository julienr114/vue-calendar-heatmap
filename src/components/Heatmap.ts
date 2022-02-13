export interface Value {
	date: Date | string;
	count: number;
}

export interface Activity {
	count: number;
	colorIndex: number;
}

export type Activities = Map<string, Activity>;

export interface CalendarItem {
	date: Date;
	count?: number;
	colorIndex: number;
}

export type Calendar = CalendarItem[][];

export interface Month {
	value: number;
	index: number;
}

export interface Locale {
	months: string[];
	days: string[];
	on: string;
	less: string;
	more: string;
}

export type TooltipFormatter = (item: CalendarItem, unit: string) => string;

export class Heatmap {

	static readonly DEFAULT_RANGE_COLOR_LIGHT = [ '#ebedf0', '#dae2ef', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e' ];
	static readonly DEFAULT_RANGE_COLOR_DARK  = [ '#1f1f22', '#1e334a', '#1d466c', '#1d5689', '#1d69ac', '#1B95D1' ];
	// other color candidates
	// static readonly DEFAULT_RANGE_COLOR_LIGHT = [ '#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39' ];
	// static readonly DEFAULT_RANGE_COLOR_DARK  = [ '#161b22', '#0e4429', '#006d32', '#26a641', '#39d353' ];
	// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#011526', '#012E40', '#025959', '#02735E', '#038C65' ];
	// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#161b22', '#015958', '#008F8C', '#0CABA8', '#0FC2C0' ];
	// static readonly DEFAULT_RANGE_COLOR_DARK    = [ '#012030', '#13678A', '#45C4B0', '#9AEBA3', '#DAFDBA' ];
	static readonly DEFAULT_LOCALE: Locale = {
		months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
		days  : [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
		on    : 'on',
		less  : 'Less',
		more  : 'More'
	};
	static readonly DEFAULT_TOOLTIP_UNIT   = 'contributions';
	static readonly DAYS_IN_ONE_YEAR       = 365;
	static readonly DAYS_IN_WEEK           = 7;
	static readonly SQUARE_SIZE            = 10;

	startDate: Date;
	endDate: Date;
	max: number;

	private _values: Value[];
	private _firstFullWeekOfMonths?: Month[];
	private _activities?: Activities;
	private _calendar?: Calendar;

	constructor(endDate: Date | string, values: Value[], max?: number) {
		this.endDate   = this.parseDate(endDate);
		this.max       = max || Math.ceil((Math.max(...values.map(day => day.count)) / 5) * 4);
		this.startDate = this.shiftDate(endDate, -Heatmap.DAYS_IN_ONE_YEAR);
		this._values   = values;
	}

	set values(v: Value[]) {
		this.max                    = Math.ceil((Math.max(...v.map(day => day.count)) / 5) * 4);
		this._values                = v;
		this._firstFullWeekOfMonths = undefined;
		this._calendar              = undefined;
		this._activities            = undefined;
	}

	get values(): Value[] {
		return this._values;
	}

	get activities(): Activities {
		if (!this._activities) {
			this._activities = new Map();
			for (let i = 0, len = this.values.length; i < len; i++) {
				this._activities.set(this.keyDayParser(this.values[ i ].date), {
					count     : this.values[ i ].count,
					colorIndex: this.getColorIndex(this.values[ i ].count)
				});
			}
		}
		return this._activities;
	}

	get weekCount() {
		return this.getDaysCount() / Heatmap.DAYS_IN_WEEK;
	}

	get calendar() {
		if (!this._calendar) {
			let date       = this.shiftDate(this.startDate, -this.getCountEmptyDaysAtStart());
			date           = new Date(date.getFullYear(), date.getMonth(), date.getDate());
			this._calendar = new Array(this.weekCount);
			for (let i = 0, len = this._calendar.length; i < len; i++) {
				this._calendar[ i ] = new Array(Heatmap.DAYS_IN_WEEK);
				for (let j = 0; j < Heatmap.DAYS_IN_WEEK; j++) {
					const dayValues          = this.activities.get(this.keyDayParser(date));
					this._calendar[ i ][ j ] = {
						date      : new Date(date.valueOf()),
						count     : dayValues ? dayValues.count : undefined,
						colorIndex: dayValues ? dayValues.colorIndex : 0
					};
					date.setDate(date.getDate() + 1);
				}
			}
		}
		return this._calendar;
	}

	get firstFullWeekOfMonths(): Month[] {
		if (!this._firstFullWeekOfMonths) {
			const cal                   = this.calendar;
			this._firstFullWeekOfMonths = [];
			for (let index = 1, len = cal.length; index < len; index++) {
				const lastWeek    = cal[ index - 1 ][ 0 ].date,
					  currentWeek = cal[ index ][ 0 ].date;
				if (lastWeek.getFullYear() < currentWeek.getFullYear() || lastWeek.getMonth() < currentWeek.getMonth()) {
					this._firstFullWeekOfMonths.push({ value: currentWeek.getMonth(), index });
				}
			}
		}
		return this._firstFullWeekOfMonths;
	}

	getColorIndex(count?: number) {
		if (count === null || count === undefined) {
			return 0;
		} else if (count <= 0) {
			return 1;
		} else if (count >= this.max) {
			return 5;
		} else {
			return (Math.ceil(((count * 100) / this.max) * (0.03))) + 1;
		}
	}

	getCountEmptyDaysAtStart() {
		return this.startDate.getDay();
	}

	getCountEmptyDaysAtEnd() {
		return (Heatmap.DAYS_IN_WEEK - 1) - this.endDate.getDay();
	}

	getDaysCount() {
		return Heatmap.DAYS_IN_ONE_YEAR + 1 + this.getCountEmptyDaysAtStart() + this.getCountEmptyDaysAtEnd();
	}

	private shiftDate(date: Date | string, numDays: number) {
		const newDate = new Date(date);
		newDate.setDate(newDate.getDate() + numDays);
		return newDate;
	}

	private parseDate(entry: Date | string) {
		return (entry instanceof Date) ? entry : (new Date(entry));
	}

	private keyDayParser(date: Date | string) {
		const day = this.parseDate(date);
		return String(day.getFullYear()) + String(day.getMonth()).padStart(2, '0') + String(day.getDate()).padStart(2, '0');
	}

}
