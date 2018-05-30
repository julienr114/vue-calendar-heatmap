# vue-calendar-heatmap

<p align="center">
    <img src="https://i.imgur.com/ntYYTKX.png" alt="Screenshot"/>
</p>

<p align="center">
    <a href="https://www.npmjs.com/package/vue-calendar-heatmap">
        <img src="https://img.shields.io/npm/v/vue-calendar-heatmap.svg"/> 
        <img src="https://img.shields.io/npm/dm/vue-calendar-heatmap.svg"/>
    </a> 
    <a href="https://vuejs.org/">
        <img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"/>
    </a>
</p>

A lightweight calendar heatmap Vuejs component built on SVG, inspired by github's contribution calendar graph. With vertical mode, tooltip powered by [v-tooltip](https://github.com/Akryum/v-tooltip).

## Getting started

1. Load Module
``` shell
npm insall --save vue-calendar-heatmap
```
2. Import in your vuejs application
``` javascript
import CalendarHeatmap from 'vue-calendar-heatmap'

// in a parent component script
export default {
    components: {
        CalendarHeatmap
    },
  
    data () {
        return {
        today: new Date(),
        values: [{ date: '2017-11-09', count: 1 }, { date: '2017-11-20', count: 1 }]
    }
  // ...
}
```
``` html
<!-- in a parent component template -->
<template>
    <div id="parent">
        <calendar-heatmap :end-date="today" :values="values" />
    </div>
</template>
```


## Availables props
### **values** - `values` - required
Array of objects with `date` and `count` keys. `date` values can be a date parseable string, a millisecond timestamp, or a Date object. `count` value should be a number.
``` html
 <vue-calendar-heatmap :values="[{ date: '2018-9-22', count: 6 }, ...]" ... />
```
### **endDate** - `end-date` - required  
Can be a date parseable string, a millisecond timestamp, or a Date object. The calendar will start automatically one year before this date.
``` html
 <vue-calendar-heatmap endDate="2018-9-22" ... />
```

### colorRange - `color-range` 
A Array of 5 strings which represents the colors of the progression. The color at `colorRange[0]` will always represent the values for a `count: 0`. The others are automatically distributed over the maximum value of count, unless you specify `max` props. Default value is equal to the example.
``` html
 <vue-calendar-heatmap :range-color="['ebedf0', '#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']" ... />
```

### max - `max`
Any number which should be the max color.
``` html
 <vue-calendar-heatmap :max="10" ... />
```
### tooltip - `tooltip`
Boolean for enabble/disable tooltip on square hover. `true` by default.
``` html
 <vue-calendar-heatmap :tooltip="false" ... />
```
### tooltipUnit - `tooltip-unit`
String representing heatmap's unit of measure. His value is `"contributions"` by default. 
``` html
 <vue-calendar-heatmap tooltip-unit="stars" ... />
```

### vertical - `vertical`
Boolean to switch to vertical mode. `false` by default.
``` html
 <vue-calendar-heatmap :vertical="true" ... />
```