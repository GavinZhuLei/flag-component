# Dialog

> 模态弹框

```js
import CustomDialog from 'components/Dialog'
```

> 注意：此处组件名称不能定义Dialog，会与html中dialog冲突

## Props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| visible | Boolean |  | 模态框是否处于展示状态 |
| loading-text | String |  | 模态框提交的时候，loading的文字 |
| title | String |  | 标题 |
| width | Number | 600 | 模态框的宽度 |
| form | Boolean | true | 弹框中是否包含表单，默认为true，此时在弹框再次展示的时候DOM会重新渲染 |

## Slots

| name | description |
| :--- | :--- |
| default | 弹框内容 |
| action | 自定义弹框底部操作，覆盖默认的取消和保存按钮 |

## Events

| name | params | description |
| :--- | :--- | :--- |
| on-submit |  | 弹框触发提交操作时触发 |
| on-close |  | 弹框关闭时触发 |

## Methods

| name | params | description |
| :--- | :--- | :--- |
| close |  | 关闭弹窗 |
| submit |  | 触发弹窗的loading效果，触发on-submit事件 |
| end |  | 取消触发提交的loading效果 |



