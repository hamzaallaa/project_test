export default (context, inject) => {
  async function getUsers(id=null) {
    let users=null
    await context.store.dispatch('getUsers',id)
    users = context.store.getters.getUsers
     return users
  }
  async function createUser(data) {
    let users = null
    await context.store.dispatch('createUsers', data)
    users = context.store.getters.createUser
    return users
  }
  async function updeteUser(id, data) {
    let payload = {
      id: id,
      data:data
    }

    await context.store.dispatch('updateUsers', payload)
    let users =await context.store.getters.updateUser
    return users
  }
  async function deleteUser(id) {
    await context.store.dispatch('deleteUsers',id)
  }

  inject('createUser', createUser)
  inject('getUsers', getUsers)
  inject('updeteUser', updeteUser)
  inject('deleteUser', deleteUser)
}
