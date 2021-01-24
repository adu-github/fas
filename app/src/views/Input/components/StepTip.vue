<template>
  <div class="step-tip">
    <el-steps :active="active" align-center>
      <el-step title="插入设备"></el-step>
      <el-step title="选择文件"></el-step>
      <el-step title="确认文件"></el-step>
      <el-step title="上传文件"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: ['active'],
};
</script>

<style lang="scss">
.step-tip {
  .el-steps {
    .el-step {
      .el-step__head {
        .el-step__line {
          height: 1px;
        }
        .el-step__icon.is-text {
          border-radius: 50%;
          border: 1px solid;
          border-color: inherit;
        }
      }
      .el-step__main {
        .el-step__title {
          font-size: 12px;
        }
      }
      .el-step__head.is-finish {
        color: #353535;
        border-color: #353535;
      }
      .el-step__title.is-finish {
        color: #353535;
      }
      .el-step__head.is-process {
        color: #3280fc;
        border-color: #3280fc;
      }
      .el-step__title.is-process {
        color: #3280fc;
      }
      .el-step__head.is-wait {
        color: #808080;
        border-color: #808080;
      }
      .el-step__title.is-wait {
        color: #808080;
      }
    }
  }
}
</style>
