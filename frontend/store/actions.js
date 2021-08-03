import ax from 'axios'
export default {
  async getUsers({ commit }, id) {
    const response = await this.$http.get(`/users/`, { params: id })
    commit('SETUSERS', response.data)
  },
  async createUsers({ commit }, data) {
    let response = null
    try {
      response = await this.$http.post(`/users/`, data)
      commit('CREATEUSER', response.data)

    } catch (err) {
      console.log("err", err)
      commit('CREATEUSER', null)
    }

  },
  async updateUsers({ commit }, payload) {
    try {
      let response = null
      response = await this.$http.put(`/users/${payload.id}`, payload.data)
      commit('UPDATEUSER', response.data.data)
    } catch (err) {
      console.log(err)
      commit('UPDATEUSER', null)
    }

  },
  async deleteUsers({ commit }, id) {
    let response = null
    response = await this.$http.delete(`/users/${id}`)
    console.log('response', response)
  }

}
