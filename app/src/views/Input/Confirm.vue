<template>
  <div class="confirm">
    <banner
      icon="md-checkbox"
      title="文件确认"
      subTitle="请再次确认要导入的文件"
    ></banner>
    <div class="steps">
      <step-tip :active="2"></step-tip>
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
import Banner from '../components/Banner';
import StepTip from './components/StepTip';
export default {
  components: {
    Banner,
    StepTip,
  },
  methods: {
    next() {
      this.$router.push('upload');
    },
    back() {
      this.$router.push('choice');
    },
  },
};
</script>
<style lang="scss" scoped>
.confirm {
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
