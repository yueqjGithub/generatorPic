<template>
  <div class="page-container flex-row flex-jst-btw flex-ali-center">
    <div class="menu-container beauty-Scroll">
      <el-scrollbar>
        <el-menu
          router
          :collapse-transition="false"
          :default-active="defaultActive"
        >
          <el-menu-item v-for="k in routerList" :key="k.path" :index='k.path' class="cus-menu-item">
            <span slot='title'>{{k.title}}</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>
    <!--        内容区域-->
    <div class="layout-content beauty-Scroll">
      <el-scrollbar>
        <router-view></router-view>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mainLayout',
  data () {
    return {
      routerList: [
        { name: 'genDbs', path: '/genDbs', title: '生成邓白氏' },
        { name: 'genZz', path: '/genZz', title: '生成营业执照' },
        { name: 'genGz', path: '/genGz', title: '生成章印' }
      ]
    }
  },
  computed: {
    defaultActive () {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #e8e8ee;
  .menu-container {
    width: 2rem;
    height: 100vh;
    background: #ffffff;
    margin-right: .2rem;
  }
  .layout-content {
    flex: 2;
    height: 100vh;
    background: #ffffff;
  }
}
</style>
