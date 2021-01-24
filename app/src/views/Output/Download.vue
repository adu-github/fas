<template>
  <div>
    <h1>
      Upload Page
    </h1>
    <el-button @click="back">上一步</el-button>
    <el-button @click="error">发送错误</el-button>
    <el-button type="primary" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    next() {
      this.$router.push('complete');
    },
    error() {
      this.$router.push('error');
    },
    back() {
      this.$router.push('confirm');
    },
  },
};
</script>
