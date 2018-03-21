# DataGrid

> 数据表格组件，集成查询分页操作

```js
import DataGrid from 'components/DataGrid'
```

## Props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| filter | Object |  | 查询数据表格的过滤条件，包括查询和分页参数 |
| paging | Boolean | false | 是否支持分页 |
| search | Boolean | false | 是否支持查询 |
| form | Boolean | false | 是否支持查询，行内表单布局，此参数优先级比search高，可看作是search的升级，可使查询表单更好看 |
| batch | Boolean | false | 是否支持批量操作，需要与element-ui的el-table组件配合使用 |
| label-width | String | 60px | form为true时，控制查询表单的label宽度 |

## Slots

| name | description |
| :--- | :--- |
| default | 数据表格内容，根据具体场景展示 |
| search | search为true时，展示查询内容 |
| form | form为true时，展示查询内容 |
| tool | 自定义的一些操作 |
| batch | 批量操作 |

## Events

| name | params | description |
| :--- | :--- | :--- |
| on-load | \(filter\) | 表格加载数据时候触发（调用load方法、查询、分页操作），filter参数是请求数据的查询条件 |

## Methods

| name | params | description |
| :--- | :--- | :--- |
| load |  | 加载数据，此操作会触发on-load事件并且触发loading效果 |
| paged | \(total\) | 设置分页数据，当数据加载结束时需要为分页赋值，此操作将解除loading效果 |



