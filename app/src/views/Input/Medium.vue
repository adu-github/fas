<template>
  <div class="medium">
    <banner icon="usb" title="设备插入" subTitle="请插入 U 盘或 CD"></banner>
    <div class="steps">
      <step-tip :active="0"></step-tip>
    </div>
    <div class="readme">
      <div>
        <svg-icon iconClass="usb1"></svg-icon>
        <svg-icon iconClass="usb2"></svg-icon>
        <svg-icon iconClass="usb3"></svg-icon>
      </div>
      <div>
        请先插入USB、移动硬盘或光盘，然后点击下一步
      </div>
    </div>
    <div class="action">
      <div>
        <el-button @click="back">取消申请</el-button>
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
      this.$router.push('choice');
    },
    back() {
      this.$router.push('welcome');
    },
  },
};
</script>

<style lang="scss" scoped>
.medium {
  width: 100%;
  .steps {
    padding-top: 20px;
  }
  .readme {
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
