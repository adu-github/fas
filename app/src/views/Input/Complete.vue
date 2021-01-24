<template>
  <div class="complete">
    <banner
      icon="md-checkmark-circle"
      title="完成"
      subTitle="上传文件已经完成，等待审批"
    ></banner>
    <div class="steps">
      <step-tip :active="4"></step-tip>
    </div>
    <div></div>
    <div class="action">
      <div>
        <el-button @click="exit">完成</el-button>
        <el-button @click="back">上一步</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import Banner from '../components/Banner';
import StepTip from './components/StepTip';
export default {
  components: {
    Banner,
    StepTip,
  },
  data() {
    return { active: 4 };
  },
  methods: {
    ...mapActions(['setErrorMessage']),
    goToWelcome() {
      this.$router.push('welcome');
    },
    goToAccount() {
      this.$router.push('account');
    },
    exit() {
      this.setErrorMessage('网络发生了错误');
      this.$router.push('error');
    },
  },
};
</script>

<style lang="scss" scoped>
.complete {
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
