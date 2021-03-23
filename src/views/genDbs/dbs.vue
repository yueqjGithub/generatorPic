<template>
  <div class="content-container flex-row flex-jst-btw flex-ali-start">
    <div class="result-container beauty-scroll">
      <el-scrollbar>
        <div class="full-width result">
          <img src="@/assets/img/dbs1.jpg" alt="" class="dbsBg">
          <p class="sx-word"
          :style='{
            top: `${companyName.top}%`,
            left: `${companyName.left}%`,
            letterSpacing: `${companyName.letterSpace}px`,
            fontFamily: companyName.fontFamily,
            fontSize: `${companyName.fontSize}px`,
            transform: `rotate(${companyName.deg}deg)`,
            color: companyName.color,
            fontWeight: companyName.fontBold
          }'
          >{{companyName.content}}</p>
        </div>
      </el-scrollbar>
    </div>
    <div class="options-container">
      <h2>公司名称设置</h2>
      <el-form :model="companyName" inline label-width='80px' label-position='right' size="mini">
        <el-form-item label="名称">
          <el-input v-model="companyName.content"></el-input>
        </el-form-item>
        <el-form-item label='垂直偏移'>
          <el-input-number v-model="companyName.top" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label='水平偏移'>
          <el-input-number v-model="companyName.left" :step="0.1"></el-input-number>
        </el-form-item>
        <el-form-item label='旋转角度'>
          <el-input-number v-model="companyName.deg"></el-input-number>
        </el-form-item>
        <el-form-item label='字体大小'>
          <el-input-number v-model="companyName.fontSize" :min='10'></el-input-number>
        </el-form-item>
        <el-form-item label='字体颜色'>
          <el-color-picker v-model="companyName.color"></el-color-picker>
        </el-form-item>
        <el-form-item label='字间距'>
          <el-input-number v-model="companyName.letterSpace"></el-input-number>
        </el-form-item>
        <el-form-item label='字重'>
          <el-select v-model="companyName.fontBold">
            <el-option label='加粗' value='bold'></el-option>
            <el-option label='正常' value='normal'></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dbs',
  data () {
    return {
      companyName: {
        content: '有限公司的',
        top: 33.3,
        left: 2,
        letterSpace: -1,
        fontFamily: 'sxzt3',
        fontSize: 18,
        color: '#333333',
        deg: 0,
        fontBold: 'bold'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.content-container{
  width: 100%;
  box-sizing: border-box;
  padding: .2rem;
  height: 100vh;
  overflow: hidden;
  .result-container{
    width: 40%;
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
  }
}
</style>
