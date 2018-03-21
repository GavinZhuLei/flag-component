const menus = [
  {
    name: '数据表格',
    path: 'datagrid'
  },
  {
    name: '弹框',
    path: 'dialog'
  },
  {
    name: '图片上传',
    path: 'upload'
  },
  {
    name: '文件上传',
    path: 'fileupload'
  },
  {
    name: '图片预览',
    path: 'imagepreview'
  }
]

const setActive = (curmenus, name) => {
  for (let i = 0; i < curmenus.length; i++) {
    if (curmenus[i].path === name) {
      curmenus[i].active = true
    } else {
      curmenus[i].active = false
    }
    if (curmenus[i].children && curmenus[i].children.length > 0) {
      setActive(curmenus[i].children, name)
    }
  }
}

export const getMenu = (name) => {
  setActive(menus, name)

  return menus
}
