<!--
 * @FileDescription: 登录首页
 * @Author: hbh
 * @Date: 2021-02-05
 -->
<template>
  <div>
    <div class="login-wrap">
      <div class="login-content">
        <div class="login">
          <div class="login-body">
            <h3 class="login-title">欢迎来到鸿云！请登录--测试修改</h3>
            <el-form ref="form" :model="loginData" label-width="80px">
              <el-form-item>
                <el-input
                  placeholder="手机号/用户名/邮箱"
                  v-model="loginData.username"
                >
                  <i slot="prefix" class="icon-user"></i>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  type="password"
                  placeholder="请输入您的密码"
                  v-model="loginData.password"
                >
                  <i slot="prefix" class="icon-pas-icon"></i>
                </el-input>
              </el-form-item>
              <el-form-item class="forget-password">
                <el-checkbox label="记住密码" name="type"></el-checkbox>
                <span
                  @click="handleClickforgePassword"
                  class="forget-password__inner"
                  >忘记密码</span
                >
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login-btn"
                  type="primary"
                  @click="handleClickLogin('ruleForm')"
                  >立即登录</el-button
                >
              </el-form-item>
            </el-form>
            <!-- 三方登录模式 -->
            <div class="login-other">
              <div class="login-other-title">
                <span>第三方账号登录</span>
              </div>
              <ul class="login-other-list">
                <li><img src="@/assets/admin_images/wechat.png" /></li>
                <li><img src="@/assets/admin_images/qq.png" /></li>
                <li><img src="@/assets/admin_images/wechat2.png" /></li>
              </ul>
            </div>
          </div>
          <div class="login-foot">
            还没有账号？<span @click="handlerClickRegister" class="register"
              >立即注册</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 登录用户名密码
      loginData: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapState({
      isLogin(state) {
        return state.user.isLoginOut;
      }
    })
  },
  methods: {
    // 用户登录
    async handleClickLogin() {
      let result = await this.$store.dispatch("user/login", this.loginData);
      if (result) {
        let redirectPath = this.$route.query.redirect || "resourcesSpace";
        if (redirectPath === "login") {
          this.$router.push({
            name: "resourcesSpace"
          });
        } else {
          this.$router.push({
            name: redirectPath || "/"
          });
        }
      } else {
        this.$message({
          message: "用户名或密码错误，请重新输入",
          type: "warning"
        });
      }
    },
    // 忘记密码
    handleClickforgePassword() {
      this.$router.push({
        name: "ForgePassword" // 忘记密码
      });
    },
    // 注册
    handlerClickRegister() {
      this.$router.push({
        name: "Register" // 注册
      });
    }
  },
  mounted() {
    // 退出后清除所有存储的数据
    if (this.isLogin) {
      window.localStorage.clear();
      window.clearVuexAlong(true, true);
    }
  }
};
</script>
<style lang="less">
@import "./less/login.less";
</style>
