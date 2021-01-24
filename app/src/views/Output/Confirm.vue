<template>
  <div>
    <h1>
      Confirm Page
    </h1>
    <el-button @click="back">上一步</el-button>
    <el-button type="primary" @click="next">下一步</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    next() {
      this.$router.push('download');
    },
    back() {
      this.$router.push('choice');
    },
  },
};
</script>
