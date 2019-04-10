<template>
<div>
  <template v-for="item in items">
    <v-list dense class="pa-0" :key="item.text">
      <!-- 菜单有孩子的情况 -->
      <v-list-group
        v-if="item.children"
        :key="item.text"
        :prepend-icon="item.icon"
        append-icon="keyboard_arrow_down"
      >    
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- ################### router-link ############### -->
        <router-link :to="child.url?child.url:'/#'"
          v-for="(child, i) in item.children"
          :key="i" class="text--primary"
        >
          <v-list-tile
            @click="1"
            :ripple="{ class: 'blue--text' }"
          >
            <v-list-tile-action >
              <v-icon>{{ child.icon?child.icon:' ' }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <!-- ################### end ############### -->
      </v-list-group>
      <!-- 菜单没有孩子的情况 -->
      <!-- ################### router-link ############### -->
      <router-link v-else :to="item.url?item.url:'/#'" :key="item.url" class="text--primary">
        <v-list-tile  @click="1" :key="item.text" :ripple="{ class: 'blue--text' }">
          
          <v-list-tile-action>
            <v-icon>{{ item.icon?item.icon:' ' }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>  
        </v-list-tile>
      </router-link>
      <!-- ################### end ############### -->    
    </v-list>
  </template>
</div>
</template>

<script>
  export default {
    
    data: () => ({
      items: [
        {
          icon: 'home',
          text: 'More',
          model: false,
          children: [
            { text: 'Page1', url: '/test'},
            { text: 'Page2', url:'/test'},
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        {
          icon: 'perm_identity',
          text: 'xxxxx',
          model: false,
          children: [
            { text: 'Page1', url: '/test'},
            { text: 'Page2', url:'/test'},
            { text: 'Print' },
            { text: 'Undo changes' },
            { text: 'Other contacts' }
          ]
        },
        { icon: 'folder', text: '用户' , url:'/user'},
        { icon: 'input', text: 'Settings' , url:'#'},
        { icon: 'folder', text: '文件上传' , url:'/upload'},
      ]
    })
  }
</script>

<style>
a{
  text-decoration: none;
}
</style>
