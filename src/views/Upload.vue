<template>
<div>
<v-app id="inspire">
    <h1>upload.vue</h1>
    <v-btn color="primary" @click="login">test</v-btn>
    <form>
        <input type="file" name="file" @change="fileChange"/>
        <br><label>文件名称：{{fileName}}</label>
        <br><label>文件大小：{{fileSize}}</label>
        <br><label>文件类型：{{fileType}}</label>
        <br>上传速度：{{speed}}
        <br>剩余时间：{{rtime}}
        <v-progress-linear v-model="valueDeterminate"></v-progress-linear>
        <v-flex md6>
            <v-btn color="success" @click="upload">上传</v-btn>
            <v-btn color="warning">取消</v-btn>
        </v-flex>
    </form>
</v-app>
</div>
</template>

<script>
import $ from "jquery";
import { spread } from 'q';
export default {
data: () => ({
    
      valueDeterminate: 20,
      fileName:'',//文件名称
      fileSize:'',//文件大小
      fileType:'',//文件类型
      file:'',//需要上传的文件
      otime:'',//前一步时间
      oload:'',//已下载的
      speed:'',//下载速度
      rtime:''//剩余时间

}),
methods:{
    login: function(){
        var that = this;
        this.$axios.get("/jj/hello")
          .then(function(data){
            console.log(data.data);
          })
    },
    fileChange: function(e){
        var file = e.target.files[0];//获取文件对象
        this.file = file;
        var size = file.size;
        // console.log(file);
        this.fileName = file.name;
        // 1024*1024 = 1048576
        this.fileSize = size>1048576?String(size>>20)+"MB":size>1024?String(size>>10)+"KB":String(size)+"B";
        // console.log(this.fileSize);
        this.fileType = file.type;
    },
    upload: function(){
        let formData = new FormData();
        formData.append('file', this.file);
        var that = this;
        let config = {
            headers:{
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: function(e){
                // console.log((e.loaded / e.total * 100) | 0);
                that.valueDeterminate = (e.loaded / e.total * 100) | 0;
                if(that.otime && that.oload){
                    let time = (new Date().getTime() - that.otime)/1000;
                    let load = e.loaded - that.oload;
                    let speed = load/time;
                    that.rtime = parseInt((e.total-e.loaded)/speed)+"s";
                    that.speed = speed>1048576?String(speed>>20)+"M/s":speed>1024?String(speed>>10)+"K/s":String(speed)+"b/s";
                }
                that.otime = new Date().getTime();
                that.oload = e.loaded;
            }
        }
        this.$axios.post('/jj/upload', formData, config)
            .then(function(data){
                console.log(data.data)
            })
    }
}
}
</script>

<style>

</style>