import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

// Create store
const createStore = () => {
  return new Vuex.Store({
    state,
    getters,
    actions,
    mutations
  })
}

export default createStore
