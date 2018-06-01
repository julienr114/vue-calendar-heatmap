# vue-calendar-heatmap

![](https://i.imgur.com/ntYYTKX.png)

[![npm](https://img.shields.io/npm/v/vue-calendar-heatmap.svg) ![npm](https://img.shields.io/npm/dm/vue-calendar-heatmap.svg)](https://www.npmjs.com/package/vue-calendar-heatmap)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A lightweight calendar heatmap Vuejs component built on SVG, inspired by github's contribution calendar graph. With vertical mode, tooltip powered by [v-tooltip](https://github.com/Akryum/v-tooltip).

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save vue-calendar-heatmap
```

## Default import

Global Install:

```javascript
import Vue from 'vue'
import VueCalendarHeatmap from 'vue-calendar-heatmap'

Vue.use(VueCalendarHeatmap)
```

Use specific components:

```javascript
import Vue from 'vue'
import { CalendarHeatmap } from 'vue-calendar-heatmap'

Vue.component('calendarHeatmap', CalendarHeatmap)
```

or in a parent components `.vue` file

```html
<script>
  import { CalendarHeatmap } from 'vue-calendar-heatmap'

  export default {
    components: {
      CalendarHeatmap
    },
    // ...
  }
</script>
```

**⚠️ A css file is included when importing the package. You may have to setup your bundler to embed the css in your page.**

## Distribution import

Global Install:

```javascript
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.css'
import VueCalendarHeatmap from 'vue-calendar-heatmap/dist/vue-calendar-heatmap.common'

Vue.use(VueCalendarHeatmap)
```

Use specific components:

```javascript
import 'vue-calendar-heatmap/dist/vue-calendar-heatmap.css'
import { CalendarHeatmap } from 'vue-calendar-heatmap/dist/vue-calendar-heatmap.common'

Vue.component('calendarHeatmap', CalendarHeatmap)
```

**⚠️ You may have to setup your bundler to embed the css file in your page.**

## Browser

```html
<link rel="stylesheet" href="vue-calendar-heatmap/dist/vue-calendar-heatmap.css"/>

<script src="vue.js"></script>
<script src="vue-calendar-heatmap/dist/vue-calendar-heatmap.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Install all the components:

```javascript
Vue.use(VueCalendarHeatmap)
```

Use specific components:

```javascript
Vue.component('calendarHeatmap', VueCalendarHeatmap.CalendarHeatmap)
```

# Usage

## Availables props

### **values** - `values` - _required_
Array of objects with `date` and `count` keys. `date` values can be a date parseable string, a millisecond timestamp, or a Date object. `count` value should be a number.
``` html
 <calendar-heatmap :values="[{ date: '2018-9-22', count: 6 }, ...]" ... />
```
### **endDate** - `end-date` - _required_
Can be a date parseable string, a millisecond timestamp, or a Date object. The calendar will start automatically one year before this date.
``` html
 <calendar-heatmap endDate="2018-9-22" ... />
```

### **colorRange** - `color-range` 
A Array of 5 strings which represents the colors of the progression. The color at `colorRange[0]` will always represent the values for a `count: 0`. The others are automatically distributed over the maximum value of count, unless you specify `max` props. Default value is equal to the example.
``` html
 <calendar-heatmap :range-color="['ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']" ... />
```

### **max** - `max`
Any number which should be the max color.
``` html
 <calendar-heatmap :max="10" ... />
```
### **tooltip** - `tooltip`
Boolean for enabble/disable tooltip on square hover. `true` by default.
``` html
 <calendar-heatmap :tooltip="false" ... />
```
### **tooltipUnit** - `tooltip-unit`
String representing heatmap's unit of measure. His value is `"contributions"` by default. 
``` html
 <calendar-heatmap tooltip-unit="stars" ... />
```

### **vertical** - `vertical`
Boolean to switch to vertical mode. `false` by default.
``` html
 <calendar-heatmap :vertical="true" ... />
```

## License

[MIT](http://opensource.org/licenses/MIT)
