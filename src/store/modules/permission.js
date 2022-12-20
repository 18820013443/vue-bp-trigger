import { buildMenu } from '@/api/bp/menu'
// import { assembleMenu } from '@/router/routers'
import { constantRoutes } from '@/router'
// import router from '@/router'
// import { resetRouter } from '@/router'

const state = {
  routers: constantRoutes,
  menu: []
}

const mutations = {
  'GET_MENU': (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  GetMenu({ commit, state }) {
    return new Promise((resolve, reject) => {
      buildMenu().then(response => {
        // const data = response
        // console.log(data)
        // const dynamicMenu = assembleMenu(data)
        // dynamicMenu.push({ path: '*', redirect: '/404', hidden: true })
        // const menu = state.routers.concat(dynamicMenu)
        // commit('GET_MENU', menu)
        // resetRouter()
        // router.addRoutes(menu)
        response = JSON.parse(JSON.stringify(response))
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
