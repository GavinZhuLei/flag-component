# Page

> 页面布局模板

```js
import Page from 'components/Page'
```

## Props

| name | type | default | description |
| :--- | :--- | :--- | :--- |
| title | String |  | 页面标题 |
| menus | Array | \[\] | 页面左侧菜单树配置数据 |

menus参数示例：
```js
[
    {
        name: '菜单标题',
        path: 'path-name', // 菜单地址，此处配置名称与路由中name一致，保证路由的唯一性
        active: 'true', // 配置是否是当前的菜单
        children: [ // 如果有子集菜单在此处配置 ]
    }
]
```





