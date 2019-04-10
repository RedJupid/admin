<template>
<v-app>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                    large
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large>code</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field id="username" prepend-icon="person" name="username" label="Username" type="text"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</v-app>
</template>
<script></script>


<script>
import $ from "jquery";
export default {
data: () => ({

}),
methods:{
    login: function(){
        var username = $("#username").val();
        var password = $("#password").val();
        // fetch("/api/login",{
        //     headers:{
        //       'Content-Type': 'application/json'
        //     },
        //     method: "post",
        //     body: JSON.stringify({
        //       username: username,
        //       password: password
        //     })
        // })
        // .then(function(result){
        //     // console.log(result);
        //     return result.json()
        // })
        // .then(function(data){
        //   console.log(data);
        // })
        var that = this;
        this.$axios.post("/api/login",{userName:username, password:password})
          .then(function(data){
            console.log(data.data);
            if(data.data.code==200){
              that.$router.replace('/home');
            }
          })
    }
}

}
</script>

<style>

</style>
