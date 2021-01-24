<template>
  <div class="choice">
    <banner
      icon="md-document"
      title="文件选择"
      subTitle="浏览文件夹，选择要导入的文件"
    ></banner>
    <div class="steps">
      <step-tip :active="1"></step-tip>
    </div>
    <div>
      <el-tree
        :props="props"
        :load="loadNode"
        lazy
        show-checkbox
        @check-change="handleCheckChange"
      >
      </el-tree>
    </div>
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
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
      },
      count: 1,
    };
  },
  methods: {
    next() {
      this.$router.push('confirm');
    },
    back() {
      this.$router.push('medium');
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    handleNodeClick(data) {
      console.log(data);
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: 'region1' }, { name: 'region2' }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === 'region1') {
        hasChild = true;
      } else if (node.data.name === 'region2') {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }
      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: 'zone' + this.count++,
            },
            {
              name: 'zone' + this.count++,
            },
          ];
        } else {
          data = [];
        }
        resolve(data);
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.choice {
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
