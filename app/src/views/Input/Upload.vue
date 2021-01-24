<template>
  <div class="upload">
    <banner
      icon="md-cloud-upload"
      title="文件上传"
      subTitle="正在将文件上传到服务器"
    ></banner>
    <div class="steps">
      <step-tip :active="3"></step-tip>
    </div>
    <div></div>
    <div class="action">
      <div>
        <el-button @click="back">取消申请</el-button>
        <el-button @click="back">上一步</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import StepTip from './components/StepTip';
import Banner from '../components/Banner';
export default {
  components: {
    Banner,
    StepTip,
  },
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

<style lang="scss" scoped>
.upload {
  width: 100%;
  height: 100%;
  .steps {
    padding-top: 20px;
  }
  .action {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #f1f1f1;
  }
}
</style>
