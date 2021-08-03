<template>
  <v-app dark>
    <div v-if="show">
      <div class="loading h-f" >
        <span class="loading-icon"></span>
      </div>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="secondary"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon class="white--text">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text"  v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <!-- <v-spacer /> -->
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-account',
          title: 'Utilisateur',
          to: '/users'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      show:true
    }
  },
  mounted(){
    setTimeout(()=>{
      this.show=false
      console.log('test=>',this.show)
    },2000)
  }
}
</script>
<style scoped>

.loading {
display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    z-index: 999999999999999;
    position: fixed;
    background: #fff;
    width: 100%;

}

.loading-icon {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 2px solid #FF8F00;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  line-height: 56px;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: #fff;
  outline: none;
  transition: all ease 0.5s;
  border-left-color: #fff;
}
.loading-icon {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
