import { DAYS_IN_ONE_YEAR, DAYS_IN_WEEK } from './consts'

export default class CalendarHeatmap {
  constructor (endDate, values, max, weekstart) {
    this.endDate = this._parseDate(endDate)
    this.max = Math.max(...values.map(day => day.count))
    this.min = Math.min(...values.map(day => day.count))
    this.startDate = this._shiftDate(endDate, -DAYS_IN_ONE_YEAR)
    this.values = values
    this.weekstart = weekstart
  }

  get activities () {
    return this.values.reduce((newValues, day) => {
      newValues[this._keyDayParser(day.date)] = {
        workoutId: day.workoutId,
        count: day.count,
        colorIndex: this.getColorIndex(day.count)
      }
      return newValues
    }, {})
  }

  get weekCount () {
    return this.getDaysCount() / DAYS_IN_WEEK
  }

  get calendar () {
    const date = this._shiftDate(
      this.startDate,
      -this.getCountEmptyDaysAtStart() + this.weekstart
    )
    return Array.from({ length: this.weekCount }, () =>
      Array.from({ length: DAYS_IN_WEEK }, () => {
        const dDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        )
        const dayValues = this.activities[this._keyDayParser(dDate)]
        date.setDate(date.getDate() + 1)
        const weekEnd = date.getDay() === 1 || date.getDay() === 0 ? -1 : 0
        return {
          date: dDate,
          count: dayValues ? dayValues.count : 0,
          colorIndex: dayValues ? dayValues.colorIndex : weekEnd || 0,
          workoutId: dayValues ? dayValues.workoutId : 0
        }
      })
    )
  }

  get firstFullWeekOfMonths () {
    return this.calendar.reduce((months, week, index, weeks) => {
      if (index > 0) {
        let lastWeek = weeks[index - 1][0].date
        let currentWeek = week[0].date
        if (lastWeek.getFullYear() < currentWeek.getFullYear() || lastWeek.getMonth() < currentWeek.getMonth()) {
          months.push({ value: currentWeek.getMonth(), index })
        }
      }
      return months
    }, [])
  }

  getColorIndex (value) {
    let x = (value - this.min) / (this.max - this.min) * 4
    return Math.ceil(x) + 2
  }

  getCountEmptyDaysAtStart () {
    return this.startDate.getDay()
  }

  getCountEmptyDaysAtEnd () {
    return (DAYS_IN_WEEK - 1) - this.endDate.getDay()
  }

  getDaysCount () {
    return DAYS_IN_ONE_YEAR + 1 + this.getCountEmptyDaysAtStart() + this.getCountEmptyDaysAtEnd()
  }

  _shiftDate (date, numDays) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + numDays)
    return newDate
  }

  _parseDate (entry) {
    return (entry instanceof Date) ? entry : (new Date(entry))
  }

  _keyDayParser (date) {
    let day = this._parseDate(date)
    return `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`
  }
}
