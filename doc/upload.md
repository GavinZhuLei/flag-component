# upload

> 图片上传组件.

```js
import Upload from 'components/Upload'
```

## Props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| value | Array |  | 当前上传组件所展示的图片，使用v-model绑定。数组中为对象形式（{url: ''}） |
| limit | Number | 1024 | 上传文件的最大限制，单位是Kb |
| accept | String |  | 上传图片的格式限制（image/gif, image/jpeg），默认为不限制 |
| action | String |  | 图片上传地址 |
| disabled | Boolean | false | 禁用图片上传 |
| length | Number | 8 | 可上传图片的最大张数 |

## Events

| name | params | description |
| :--- | :--- | :--- |
| on-success | \(res\) | 图片上传成功后出发，参数res为成功后返回的值 |
| on-preview | \(url\) | 图片预览时触发，参数url为预览的图片地址 |



