---
home: true 
footer: MIT Licensed | Copyright © 2021-present razorness
---

<Demo :initial-round="2"/>
<Links/>

## Installation

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash:no-line-numbers
# install in your project
yarn add vue3-calendar-heatmap
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash:no-line-numbers
# install in your project
npm install -D vue3-calendar-heatmap
```

  </CodeGroupItem>
</CodeGroup>

## Import

### Global install

```typescript:no-line-numbers
import VueCalendarHeatmap from 'vue3-calendar-heatmap'

app.use(VueCalendarHeatmap)
```

### Use specific components

```typescript:no-line-numbers
import { CalendarHeatmap } from 'vue3-calendar-heatmap'

app.component('CalendarHeatmap', CalendarHeatmap)
```

### Use directly in component

```typescript:no-line-numbers
import { CalendarHeatmap } from 'vue3-calendar-heatmap'

export default {
    components: {
        CalendarHeatmap
    },
    // ...
}
```

::: warning A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.
:::

## Usage

### values

- Type: `Array<{ date: Date | string; count: number; }>`
- Required: true
- Details:

  Array of objects with `date` and `count` keys. `date` values can be a date parseable string, a millisecond timestamp, or a Date object. `count` value should
  be a number.

```html
<calendar-heatmap :values="[{ date: '2018-9-22', count: 6 }, ...]" .../>
```

### endDate

- Type: `string`
- Required: true
- Details:

  Can be a date parseable string, a millisecond timestamp, or a Date object. The calendar will start automatically one year before this date.

```html
<calendar-heatmap :end-date="2018-9-22" .../>
```

### round

- Type: `number` between `0` and `5`
- Details:

  Number to create rounded corners or cirlces in heatmap. `0` by default.

```html
<calendar-heatmap :round="0" .../>
```

#### Example (:round="0")

<Demo :initialRound="0"/>

#### Example (:round="5")

<Demo :initialRound="5"/>

### darkMode 
- Type: `boolean`
- Details:

  Boolean to toggle default color range between dark and light mode.
  Toggle page between light and dark mode to see in action.

```html
<calendar-heatmap dark-mode .../>
```

#### Example (:round="0")

### rangeColor

- Type: `Array<string>`
- Details:

  Array of strings which represents the colors of the progression.

    - The color at `rangeColor[0]` will always represent the values for a `count: null`
    - The color at `rangeColor[1]` will always represent the values for a `count: 0`
    - The others are automatically distributed over the maximum value of count, unless you specify `max` props.

```html
<calendar-heatmap :range-color="['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']" .../>
```

#### Example

<Demo :range-color="[ '#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39' ]"/>

### max

- Type: `number`
- Details:

  Any number which should be the max color.

```html
<calendar-heatmap :max="10" .../>
```

### noDataText

- Type: `string`
- Details:

  Tooltip text to display on days without data. null by default (shows no tooltip at all).

```html
<calendar-heatmap :no-data-text="no data for this day" .../>
```

### tooltip

- Type: `boolean`
- Details:

  Boolean for enable/disable tooltip on square hover. true by default.

```html
<calendar-heatmap :tooltip="false" .../>
```

### tooltipUnit

- Type: `string`
- Details:

  String representing heatmap's unit of measure. Value is "contributions" by default.

```html
<calendar-heatmap tooltip-unit="stars" .../>
```

### tooltipFormatter

- Type: `function(value: { date: Date | string; count: number; }): string`
- Details:

  A method to have full control about tooltip content.

```html
<calendar-heatmap :tooltip-formatter="(v) => v.count" .../>
```

### vertical

- Type: `boolean`
- Details:

  Boolean to switch to vertical mode. false by default.

```html
<calendar-heatmap vertical .../>
```

#### Example
<Demo orientation="vertical"/>
