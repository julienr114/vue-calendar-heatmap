# vue3-calendar-heatmap

---
**NOTE**

This is primary a Typescript rewrite of [vue-calendar-heatmap](https://github.com/julienr114/vue-calendar-heatmap) for Vue 3.

---


![](https://i.imgur.com/ntYYTKX.png)

![npm](https://img.shields.io/npm/v/vue3-calendar-heatmap.svg?style=flat-square)
[![TypeScript](https://img.shields.io/badge/-Typescript-informational?style=flat-square)](https://www.typescriptlang.org/)
[![vue2](https://img.shields.io/badge/vue-3.x-brightgreen.svg?style=flat-square)](https://vuejs.org/)

A lightweight calendar heatmap Vuejs component built on SVG, inspired by github's contribution calendar graph. With vertical mode, tooltip powered
by [Tippy.js](https://github.com/atomiks/tippyjs).

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```shell
npm install --save vue3-calendar-heatmap
```

## Default import

Global Install:

```javascript
import VueCalendarHeatmap from 'vue3-calendar-heatmap'

app.use(VueCalendarHeatmap)
```

Use specific components:

```javascript
import { CalendarHeatmap } from 'vue3-calendar-heatmap'

app.component('CalendarHeatmap', CalendarHeatmap)
```

or in a parent components `.vue` file

```html
<script>
    import { CalendarHeatmap } from 'vue3-calendar-heatmap'

    export default {
        components: {
            CalendarHeatmap
        },
        // ...
    }
</script>
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

# Usage

## Availables props

### **values** - `values` - _required_
Array of objects with `date` and `count` keys. `date` values can be a date parseable string, a millisecond timestamp, or a Date object. `count` value should be
a number.

```html
<calendar-heatmap :values="[{ date: '2018-9-22', count: 6 }, ...]" .../>
```
### **endDate** - `end-date` - _required_
Can be a date parseable string, a millisecond timestamp, or a Date object. The calendar will start automatically one year before this date.
```html
<calendar-heatmap :end-date="2018-9-22" .../>
```

### **rangeColor** - `range-color`
Array of 6 strings which represents the colors of the progression.

- The color at `rangeColor[0]` will always represent the values for a `count: null`
- The color at `rangeColor[1]` will always represent the values for a `count: 0`
- The others are automatically distributed over the maximum value of count, unless you specify `max` props.

- Default value is equal to the example.
```html
<calendar-heatmap :range-color="['ebedf0', 'dae2ef', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']" .../>
```

### **max** - `max`
Any number which should be the max color.
```html
<calendar-heatmap :max="10" .../>
```

### **noDataText** - `no-data-text`
Tooltip text to display on days without data. `null` by default (shows no tooltip at all).
```html
<calendar-heatmap :no-data-text="no data for this day" .../>
```

### **tooltip** - `tooltip`
Boolean for enable/disable tooltip on square hover. `true` by default.
```html
<calendar-heatmap :tooltip="false" .../>
```

### **tooltipUnit** - `tooltip-unit`
String representing heatmap's unit of measure. Value is `"contributions"` by default.
```html
<calendar-heatmap tooltip-unit="stars" .../>
```

### **tooltipFormatter** - `tooltip-formatter`
A method to have full control about tooltip content.

```html

<calendar-heatmap :tooltip-formatter="(v) => v.count" .../>
```

### **vertical** - `vertical`

Boolean to switch to vertical mode. `false` by default.

```html

<calendar-heatmap :vertical="true" .../>
```

### **round** - `round`

Number to create rounded corners or cirlces in heatmap. `0` by default.

```html

<calendar-heatmap :round="2" .../>
```

## License

[MIT](http://opensource.org/licenses/MIT)
