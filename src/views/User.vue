<template>
<div>
  <v-container fluid grid-list-lg>
    <v-layout row wrap justify-end>
      <v-flex md4>
          <v-text-field label="Regular" v-model="input"></v-text-field>
      </v-flex>
      <v-flex md2>
        <v-btn color="info" @click="search=input">查询</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12 md12>
        <v-card>
          <v-btn color="green" dark absolute top right fab @click="dialog = true"><v-icon>add</v-icon></v-btn>
          <v-data-table
            :rows-per-page-items=[10]
            :headers="headers"
            :items="users"
            :search="search"
            hide-actions
            :pagination.sync="pagination"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.userName }}</td>
              <td>{{ props.item.password }}</td>
              <td>
                <v-btn fab dark small color="primary" @click="updateDialog($event)">
                  <v-icon small >edit</v-icon>
                </v-btn>
                <v-btn fab light small color="white" @click="deleteDialog($event)">
                  <v-icon small >delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2 pa-3">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- -------------------------------- 新增对话框 ------------------------------------ -->
  <div class="text-xs-center">
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline primary lighten-2" primary-title>用户新增</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field label="用户名" required v-model="user.username"></v-text-field>
            <v-text-field type="password" label="密码" required v-model="user.password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">取消</v-btn>
          <v-btn color="primary" @click="addUser()">提交</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- -------------------------------- 更新对话框 ------------------------------------ -->
  <div class="text-xs-center">
    <v-dialog v-model="dialog2">
      <v-card>
        <v-card-title class="headline primary lighten-2" primary-title>用户更新</v-card-title>
        <v-card-text>
          id:{{user.id}}
          <v-form ref="form">
            <v-text-field label="用户名" required v-model="user.username"></v-text-field>
            <v-text-field label="密码" required v-model="user.password"></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog2 = false">取消</v-btn>
          <v-btn color="primary" @click="updateUser()">更新</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <!-- -------------------------------- 删除对话框 ------------------------------------ -->
  <div class="text-xs-center">
    <v-dialog v-model="dialog3">
      <v-card>
        <v-card-title class="headline primary lighten-2" primary-title>用户删除</v-card-title>
        <v-card-text>
          id:{{user.id}}
          用户名:{{user.username}}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog3 = false">取消</v-btn>
          <v-btn color="primary" @click="deleteUser()">删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</div>
</template>

<script>
import $ from 'jquery'
  export default {
    data () {
    return {
      user:{
        id:"",
        username:"",
        password:""
      },
      dialog: false,// 新增对话框
      dialog2: false,// 更新对话框
      dialog3: false,// 删除对话框
      input: '',// 搜索的输入
      search: '',// 具体搜索的内容
      pagination: {},
      // 表的头部
      headers: [
        { text: 'id', align: 'left', sortable: false, value: 'id'},
        { text: '用户名', value: 'userName', sortable: false},
        { text: '密码', value: 'password', sortable: false},
        { text: '', value: '', sortable: false}
      ],
      users : []
    }
  },
  methods: {

    //删除用户操作
    deleteUser: function(){
      var that = this;
      console.log(this.user.id+" "+this.user.username+this.user.password);
      this.$axios({
        method:'delete',
        url:'/api/user/'+that.user.id,
        data:{
          id:that.user.id
        }
      }).then(function(data){
        let result = data.data;
        // console.log(result);
        that.dialog=false;
        that.init();
      })
      that.dialog3=false;
    },
    // 更新用户操作
    updateUser: function(){
      var that = this;
      console.log(this.user.id+" "+this.user.username+this.user.password);
      this.$axios({
        method:'put',
        url:'/api/user/'+that.user.id,
        data:{
          id:that.user.id,
          userName:that.user.username,
          password:that.user.password
        }
      }).then(function(data){
        let result = data.data;
        // console.log(result);
        that.dialog=false;
        that.init();
      })
      that.dialog2=false;
    },
    // 弹出删除对话框
    deleteDialog:function(e){
      this.dialog3=true;
      let tr = $(e.target).parents('tr');// 得到父级元素tr的jquery对象
      let children = tr.children();
      // console.log($(children[0]).text());
      this.user.id       = $(children[0]).text();
      this.user.username = $(children[1]).text();
      this.user.password = $(children[2]).text();
    },
    // 弹出更新对话框
    updateDialog:function(e){
      this.dialog2=true;
      let tr = $(e.target).parents('tr');// 得到父级元素tr的jquery对象
      let children = tr.children();
      // console.log($(children[0]).text());
      this.user.id       = $(children[0]).text();
      this.user.username = $(children[1]).text();
      this.user.password = $(children[2]).text();
    },
    // 用户添加的操作
    addUser:function(){
      var that = this;
      console.log(this.user.username+this.user.password);
      this.$axios({
        method:'post',
        url:'/api/user',
        data:{
          userName:that.user.username,
          password:that.user.password
        }
      }).then(function(data){
        let result = data.data;
        // console.log(result);
        that.dialog=false;
        that.init();
      })
      that.dialog = false;
    },
    init(){
      var that = this;
      this.$axios.get('/api/user').then(function(data){
        let result = data.data;
        console.log(result);
        that.users = result;  
      })
    },
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    // init(){
    //   var that = this;
    //   this.$axios.get('/api/user').then(function(data){
    //     let result = data.data;
    //     console.log(result);
    //     that.users = result;  
    //   })
    // },
    
  },
  beforeCreate: function(){
    var that = this;
    this.$axios.get('/api/user').then(function(data){
      let result = data.data;
      that.pagination.totalItems = result.length;
      that.users = result;  
    })
  }
}
</script>

<style>
i{
  text-align: center;
}
</style>
