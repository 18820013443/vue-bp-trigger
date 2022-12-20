import Layout from '@/layout'

export const assembleMenu = (res) => {
  const data = res
  data.forEach((el, index) => {
    if (el.component === 'Layout') {
      el.component = Layout
    } else {
      el.component = loadView(el.component)
    }
    if (el.children && el.children.length) {
      el.children = assembleMenu(el.children)
    } else {
      delete el['children']
      delete el['redirect']
    }
  })
  return data
  // return res.filter(el => {
  //   delete el['id']
  //   delete el['redirect']
  //   // delete el['children']
  //   delete el['alwaysShow']
  //   if (el.component === 'Layout') {
  //     el.component = Layout
  //   }
  //   if (el.children && el.children.length) {
  //     el.children.forEach(e => {
  //       e.component = loadView(e.component)
  //     })
  //   }
  //   if (el.children) {
  //     el.chidren = assembleChildren(el.children)
  //   }
  //   if (el.component) {
  //     if (el.component === 'Layout') {
  //       el.component = Layout
  //     } else {
  //       const component = el.component
  //       el.component = loadView(component)
  //     }
  //   }
  //   if (el.children != null && el.children && el.children.length) {
  //     el.children = assembleMenu(el.children, el)
  //   } else {
  //     delete el['children']
  //   }
  //   return true
  // })
}

export const assembleChildren = (childrenData) => {
  let children = []
  childrenData.forEach((el, index) => {
    if (el.children && el.children.length) {
      el.children.forEach(e => {
        e.path = el.path + '/' + e.path
        if (e.children && e.children.length) {
          children = children.concat(assembleChildren(e.children), e)
          return
        }
        children.push(e)
      })
      return
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = (view) => {
  return resolve => require([`@/views/bp/${view}`], resolve)
}

// export const loadView = (view) => import('@/views/bp/' + view)

