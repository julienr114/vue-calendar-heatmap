# vue-calendar-heatmap

> work in progress

A calendar heatmap Vuejs component built on SVG, inspired by github's contribution calendar graph

## props

| keys  | Type  | Required | Exemple |
|---|---|---|---|
| values `values` | Array of objects with `date` and `count` keys. `date` values can be a date parseable string, a millisecond timestamp, or a Date object. `count` value should be a number. | true | `:values="[{ date: '2018-9-22', count: 6 }, ...]"` |
| endDate `end-date`  | Can be a date parseable string, a millisecond timestamp, or a Date object. The calendar will start automatically one year before this date. | true  | `endDate="2018-9-22"`  | 
| colorRange `color-range` | A Array of 5 strings which represents the colors of the progression. The color at `colorRange[0]` will always represent the values for a `count: 0`. The others are automatically distributed over the maximum value of count, unless you specify `max` props. | false. Default value is equal to the example | `:range-color="['ebedf0', '#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e']"` 
| max `max` | Any number which should be the max color | false | `:max="10"`
| tooltip `tooltip` | Boolean for enabble/disable tooltip on square hover. `true` by default | false | `:tooltip="false"`
| tooltipUnit `tooltip-unit` | String representing heatmap's unit of measure. His value is `"contributions"` by default. | false | `tooltip-unit="stars"` 