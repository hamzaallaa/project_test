<template>
<div >
  <v-card class="mx-auto my-5"  >
     <v-card-title>
      <h2 class="text-h4">
        Utilisateur
      </h2>
    </v-card-title>
  </v-card>
  <v-card class="mx-auto py-3"  >
    <div class="text-right">
      <v-btn
        class="mx-5 my-2  "
        fab
        dark
        small
        color="secondary"
        to="/users/create"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1 my-2 mx-5"
  >
    <template v-slot:item.status="{ item }">
      <v-chip
        :color="getColor(item.status)"
        dark
        class="status"
      >
        {{ item.status }}
      </v-chip>
    </template>
    <template v-slot:item.createdDate="{ item }">
        {{ formatDate(item.createdDate) }}
    </template>
    <template  v-slot:item.delete="{ item }">
      <div class="d-flex">
        <div class="pointer " @click="deleteUser(item._id)">
          <v-icon  >
          mdi-delete
          </v-icon>
        </div>
        <div class="pointer mx-2">
          <nuxt-link class="text-decoration-none" :to="`/users/update/${item._id}`">
            <v-icon  >
              mdi-update
            </v-icon>
          </nuxt-link>
        </div>
      </div>
    </template>
  </v-data-table>
  </v-card>
</div>
</template>


<script>
  export default {
    data () {
      return {
        headers: [
          {text: 'ID',value: '_id'},
          { text: ' Date de création', value: 'createdDate' },
          { text: 'Etat', value: 'status' },
          { text: 'Nome', value: 'firstName' },
          { text: 'Prenom', value: 'lastName' },
          { text: "Nom d'utilisateur", value: 'userName' },
          { text: "Matricule", value: 'registrationNumber' },
          { text: "Action", value: 'delete' },
        ],
        desserts: [],
        users:null
      }
    },
    async  fetch(){
        this.users= await  this.$getUsers()
        this.desserts=this.users.data
   },
    methods: {
      getColor (status) {
        if (status == "Validé") return '#5BE881'
        else if (status=="Rejeté") return '#FF0000'
        else return '#FDB64D'
      },
     async deleteUser(id){
        const res= await this.$deleteUser(id)
        this.desserts=this.desserts.filter(user=> user._id!=id)
      },
       formatDate (date) {
          var date = new Date(date);
          return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear()
      },
    },
  }
</script>

<style>
.pointer{
  cursor: pointer;
}
.hover:hover{
  stroke: red;
}
.status{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
