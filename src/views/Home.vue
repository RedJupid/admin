<template>
  <v-app :dark="false">
    <v-navigation-drawer fixed v-model="drawer" app :clipped="primaryDrawer.clipped">
      <Menu/>
    </v-navigation-drawer>
    <v-toolbar dense :color="primaryDrawer.color" dark fixed app :clipped-left="primaryDrawer.clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
    
    <div class="contrainer">
      <router-view></router-view>
    </div>
    
    <v-footer :color="primaryDrawer.color" app :inset="footer.inset">
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import Menu from '../components/Menu'
  export default {
    data: () => ({
      drawer: null,
      primaryDrawer: {
        clipped: true,
        color: "blue darken-3"
      },
      footer: {
        inset: false
      }
    }),
    components:{
      Menu
    }
  }
</script>

<style>
.v-content{
  padding: 0;
}
</style>
