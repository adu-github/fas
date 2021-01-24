<template>
  <div>
    <h1>
      Welcome Page
    </h1>
    <el-button @click="back">取消申请</el-button>
    <el-button @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push('account');
    },
    next() {
      this.$router.push('choice');
    },
  },
};
</script>
