<template>
  <div>
    <h1>
      Complete Page
    </h1>
    <el-button @click="goToWelcome">继续申请</el-button>
    <el-button @click="goToAccount">回到登录页</el-button>
    <el-button @click="exit">退出程序</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    goToWelcome() {
      this.$router.push('welcome');
    },
    goToAccount() {
      this.$router.push('account');
    },
    exit() {},
  },
};
</script>
