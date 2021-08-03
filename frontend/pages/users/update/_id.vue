<template>
  <div class="overflow-hidden px-2">
  <v-card class="mx-auto my-5 d-flex  justify-space-between align-center"  >
       <v-btn
       class="mx-3"
       to="/users"
        icon
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    <v-card-title>
      <h2 class="text-h4 title">
        mettre à jour l'utilisateur
      </h2>
    </v-card-title>
  </v-card>
   <v-card class="mx-auto  py-10" >
     <v-form>
       <v-container>
          <v-row>
            <v-col  cols="12" sm="6" md="4">
               <v-text-field label="Nom" placeholder="Nom" outlined dense v-model="data.firstName" ></v-text-field>
            </v-col>
            <v-col  cols="12" sm="6" md="4">
               <v-text-field label="Prenom" placeholder="Prenom" outlined dense v-model="data.lastName" ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="12" sm="6" md="4">
               <v-select :items="items" label="Etat" outlined dense v-model="data.status"  ></v-select>
             </v-col>
             <v-col  cols="12" sm="6" md="4">
               <v-text-field label="Nome d'utilisateur" placeholder="Nome d'utilisateur" outlined dense v-model="data.userName" ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4" >
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Date"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    prepend-icon="mdi-calendar"
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col  cols="12" sm="6" md="4">
               <v-text-field label="Matricule" placeholder="Matricule" outlined dense v-model="data.registrationNumber" ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
  </v-form>
  </v-card>
  <v-card class=" my-5 d-flex  justify-space-between align-center" >
    <v-card-title>
      <h3 class="text-h4">
        Actions
      </h3>
    </v-card-title>
      <v-btn
      class="ma-2 "
      :loading="loading"
      :disabled="loading"
      color="secondary"
      @click="updateUser()"
    >
      Confirm
    </v-btn>
  </v-card>
       <div class="wapper">
         <v-alert border="left" class="alert" :class="{'active':activeSuccess}"  elevation="3"  type="success"  >Succès</v-alert>
       </div>
       <div class="wapper">
       <v-alert border="left" class="alert" :class="{'active':activeERR}"   elevation="3"  type="error"  >Données invalides</v-alert>
       </div>
  </div>
</template>

<script>
  export default {
    data() {
       return{
           items: ['En validation', 'Validé', 'Rejeté'],
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
          dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
          menu1: false,
          menu2: false,
          loading: false,
          data:{
            firstName:null,
            lastName:null,
            status:null,
            userName:null,
            registrationNumber:null,
            createdDate:null
          },
          activeSuccess:false,
          activeERR:false
       }
    },
   async mounted(){
      let res= await this.$getUsers(this.$route.params.id)
      this.data.firstName= res.data[0].firstName
      this.data.lastName= res.data[0].lastName
      this.data.status= res.data[0].status
      this.data.userName= res.data[0].userName
      this.data.registrationNumber= res.data[0].registrationNumber
      this.data.createdDate= res.data[0].createdDate
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
      // loader () {
      //   const l = this.loader
      //   console.log("==>",this[l])
      //   this[l] = !this[l]
      //   setTimeout(() => (this[l] = false), 2000)
      //   this.loader = null
      // },
    },
    methods: {
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
     async updateUser(){
        this.loading=true
        this.data.createdDate=this.computedDateFormatted
       let res= await this.$updeteUser(this.$route.params.id,this.data)
       if(res){
         setTimeout(() => {
              this.loading=false
               this.activeSuccess = true
               setTimeout(() => {
                 this.activeSuccess = false
              }, 2000)
            }, 1000)
       }else{
          setTimeout(() => {
              this.loading=false
            this.activeERR = true
            setTimeout(() => {
              this.activeERR = false
           }, 2000)
         }, 1000)
       }
      }
    },
  }
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
    .alert{
    width: 230px;
    position: absolute;
    z-index: 999999;
    transition: all 0.5s;
    bottom: -83px;
    opacity: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
  .active{
    bottom: 20px;
    opacity: 1;
    display: block !important;
  }
  .wapper{
    width: 100%;
    position: relative;
  }
  @media (max-width:750px){
   .v-application .text-h4{
      font-size: 1.5rem !important;
    }
  }
  @media (max-width:450px){
   .v-application .text-h4{
      font-size: 1.25rem !important;
    }
  }
</style>
