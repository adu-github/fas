<template>
  <div class="error-page">
    <div class="banner">
      <div>
        <svg-icon
          v-if="icon"
          className="banner-icon"
          iconClass="ios-sad"
        ></svg-icon>
      </div>
      <div class="title">
        <div class="main">导入出错了</div>
      </div>
      <div>
        {{ message }}
      </div>
      <div class="action">
        <div>
          <el-button>取消申请</el-button>
          <el-button>重试一次</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SvgIcon from './SvgIcon';
export default {
  components: {
    SvgIcon,
  },
  computed: {
    ...mapState({
      message: (state) => state.error.message,
    }),
  },
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.error-page {
  .banner {
    background: $bg;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    padding-left: 40px;
    .main {
      color: $light_gray;
      font-size: 30px;
    }
    .sub {
      color: $dark_gray;
      font-size: 12px;
    }
    .banner-icon {
      color: $light_gray;
      font-size: 50px;
      margin-right: 12px;
    }
  }
}
</style>
