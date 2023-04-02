<template>
  <div class="login_page fill_contain">
    <transition name="el-fade-in">
      <section class="form_container">
        <div class="manage_tip">
          <p>后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="email">
            <el-input v-model="loginForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="=password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="isLoading" @click="onLogin" class="submit_btn">登录
            </el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {email: 'hzzhu2@ifytek.com', password: '123456'},
      rules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
      disabled: false,
      isLoading: false
    }
  },
  methods: {
    onLogin() {
      this.disabled = true
      this.isLoading = true
      const loginInfo = {
        email: this.loginForm.email,
        password: this.loginForm.password
      }
      this.$store.dispatch("Login", loginInfo).then(() => {
        this.$router.push({path: '/'})
      }).catch(err => {
        this.isLoading = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 导入混合样式文件
@import "../style/mixin";

.login_page {
  background-color: #324057;
}

.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;

  p {
    font-size: 34px;
    color: #1f1d1d;
  }
}

.form_container {
  @include wh(320px, 320px);
  @include ctp(320px, 320px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;

  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}

.tip {
  font-size: 12px;
  color: red;
}
</style>