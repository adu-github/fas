<template>
  <div class="banner">
    <div>
      <svg-icon
        v-if="icon"
        className="banner-icon"
        :iconClass="icon"
      ></svg-icon>
    </div>
    <div class="title">
      <div class="main">{{ title }}</div>
      <div class="sub">{{ subTitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'subTitle', 'icon'],
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
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
</style>
