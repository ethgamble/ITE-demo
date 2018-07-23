<template>
  <div>
    <div>
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <a class="navbar-brand navbar-link" href="#/"><img src="../assets/logo.png" id="logo">{{ config.appName }} </a>
            <button class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
          </div>
          <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="nav navbar-nav navbar-right">
              <li role="presentation"><a href="" @click.prevent="login">登陆 </a></li>
              <li role="presentation"><a href="" @click.prevent="logout">退出 </a></li>
              <el-dropdown v-if="isLogin">
                <span class="el-dropdown-link">
                  <a href="#/profile"><img class="img-circle" :src="user.avatar_url" id="head-portrait"></a>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>ID: {{ user.id }}</el-dropdown-item>
                  <el-dropdown-item>昵称: {{ user.username }}</el-dropdown-item>
                  <el-dropdown-item>{{config.tokenName}}: {{ user.token }} ≈ {{ user.token/2 }}KEY</el-dropdown-item>
                  <el-dropdown-item>累计签到: {{ user.signIn.length }} 次</el-dropdown-item>
                  <el-dropdown-item divided>币乎发文: {{user.artNum}}</el-dropdown-item>
                  <el-dropdown-item>粉丝: {{ user.fans }} </el-dropdown-item>
                  <el-dropdown-item>关注: {{ user.follows }} </el-dropdown-item>
                  <el-dropdown-item divided disabled> 点头像进入个人中心 </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
  import config from '../config/config.js'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        config: config,
        centerDialogVisible: false
      }
    },
    created: function () {

    },

    computed: {
      ...mapGetters({
        isLogin: 'isLogin',
        user: 'getUser',
      }),
    },

    mounted: function () {

    },

    methods: {
      login() {
        scatter.getIdentity({
          accounts: [config.eosNetwork]
        }).then(identity => {
          //...
          console.log(identity);
        }).catch(error => {
          //...
        });
      },

      logout() {
        scatter.forgetIdentity().then(() => {
          //...
          console.log("forget");
        });
      }
    }
  }

</script>

<style>
  .voteTitle {
    font-size: 22px;
    margin-left: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  
  .wrap {
    white-space: normal;
    width: 260px;
  }
  
  #head-portrait {
    max-height: 40px;
    margin-right: 4px;
    margin-left: 10px;
    margin-top: 11px;
    display: inline-block;
    /*border-radius:10px;*/
  }
  
  #logo {
    max-height: 40px;
    margin-right: 10px;
    margin-top: -4px;
    display: inline-block;
  }
</style>