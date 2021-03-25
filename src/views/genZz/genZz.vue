<template>
  <div class="content-container flex-row flex-jst-btw flex-ali-start">
    <div class="result-container beauty-scroll">
      <el-scrollbar>
        <div class="full-width result" id="picResult" ref="picResult">
          <img src="@/assets/img/zzbg.jpg" alt="" class="dbsBg">
        </div>
      </el-scrollbar>
    </div>
    <div class="options-container beauty-scroll">
      <el-scrollbar>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'genZz'
}
</script>

<style lang="scss" scoped>
.content-container{
  #myCav{
    position: absolute;
  }
  h2{
    margin: .2rem 0;
  }
  .cus-form{
    border-bottom: 1px dashed grey;
  }
  width: 100%;
  box-sizing: border-box;
  padding: .2rem;
  height: 100vh;
  overflow: hidden;
  .result-container{
    width: 60%;
    height: 100%;
    .result{
      position: relative;
      .dbsBg{
        display: block;
        width: 100%;
        height: auto;
      }
      .sx-word{
        position: absolute;
      }
    }
  }
  .options-container{
    flex: 1;
    margin-left: .2rem;
    height: 100%;
  }
  .yzbg-panel{
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    margin-right: .2rem;
    &.cur-bg{
      box-shadow: 0px 0px 3px 4px rgba(0, 150, 180, 1);
    }
  }
}
</style>
