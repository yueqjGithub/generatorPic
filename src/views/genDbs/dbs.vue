<template>
  <div class="content-container flex-row flex-jst-btw flex-ali-start">
    <div class="result-container beauty-scroll">
      <el-scrollbar>
        <div class="full-width result" id="picResult" ref="picResult">
          <img :src="bgInfo" alt="" class="dbsBg" v-if="bgInfo">
          <img src="@/assets/img/dbs1.jpg" alt="" class="dbsBg" v-else>
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
          <p class="sx-word"
          :style='{
            top: `${authorization.top}%`,
            left: `${authorization.left}%`,
            letterSpacing: `${authorization.letterSpace}px`,
            fontFamily: authorization.fontFamily,
            fontSize: `${authorization.fontSize}px`,
            transform: `rotate(${authorization.deg}deg)`,
            color: authorization.color,
            fontWeight: authorization.fontBold
          }'
          >{{authorization.content}}</p>
          <p class="sx-word"
           :style='{
            top: `${dateStr.top1}%`,
            left: `${dateStr.left1}%`,
            letterSpacing: `${dateStr.letterSpace1}px`,
            fontFamily: dateStr.fontFamily,
            fontSize: `${dateStr.fontSize1}px`,
            transform: `rotate(${dateStr.deg1}deg)`,
            color: dateStr.color,
            fontWeight: dateStr.fontBold
          }'
          >{{dateStr.year}}</p>
          <p class="sx-word"
             :style='{
            top: `${dateStr.top2}%`,
            left: `${dateStr.left2}%`,
            letterSpacing: `${dateStr.letterSpace2}px`,
            fontFamily: dateStr.fontFamily,
            fontSize: `${dateStr.fontSize2}px`,
            transform: `rotate(${dateStr.deg2}deg)`,
            color: dateStr.color,
            fontWeight: dateStr.fontBold
          }'
          >{{dateStr.month}}</p>
          <p class="sx-word"
             :style='{
            top: `${dateStr.top3}%`,
            left: `${dateStr.left3}%`,
            letterSpacing: `${dateStr.letterSpace3}px`,
            fontFamily: dateStr.fontFamily,
            fontSize: `${dateStr.fontSize3}px`,
            transform: `rotate(${dateStr.deg3}deg)`,
            color: dateStr.color,
            fontWeight: dateStr.fontBold
          }'
          >{{dateStr.day}}</p>
          <canvas ref="myCav" id="myCav" :width="canvasOptions.width" :height="canvasOptions.height"
          :style="{
            left: `${canvasOptions.left}%`,
            top: `${canvasOptions.top}%`,
            transform: `rotate(${canvasOptions.deg}deg)`
          }"
          ></canvas>
        </div>
      </el-scrollbar>
    </div>
    <div class="options-container beauty-scroll">
      <el-scrollbar>
        <el-button type="primary" @click="emitUpload">自定义背景</el-button>
        <input type="file" accept="image/*"  capture="camera" ref="uploadInput" @change="doUpload($event)" style="display: none;"/>
        <h2>公司名称设置</h2>
        <el-form :model="companyName" inline label-width='80px' label-position='right' size="mini" class="cus-form">
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
          <el-form-item label='字体'>
            <el-select v-model="companyName.fontFamily">
              <el-option v-for="k in fonts" :key="k.value" :label='k.name' :value='k.value'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='字重'>
            <el-select v-model="companyName.fontBold">
              <el-option label='加粗' value='bold'></el-option>
              <el-option label='正常' value='normal'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <h2>授权代表设置</h2>
        <el-form :model="authorization" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-form-item label="名称">
            <el-input v-model="authorization.content"></el-input>
          </el-form-item>
          <el-form-item label='垂直偏移'>
            <el-input-number v-model="authorization.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label='水平偏移'>
            <el-input-number v-model="authorization.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label='旋转角度'>
            <el-input-number v-model="authorization.deg"></el-input-number>
          </el-form-item>
          <el-form-item label='字体大小'>
            <el-input-number v-model="authorization.fontSize" :min='10'></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="authorization.color"></el-color-picker>
          </el-form-item>
          <el-form-item label='字间距'>
            <el-input-number v-model="authorization.letterSpace"></el-input-number>
          </el-form-item>
          <el-form-item label='字体'>
            <el-select v-model="authorization.fontFamily">
              <el-option v-for="k in fonts" :key="k.value" :label='k.name' :value='k.value'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label='字重'>
            <el-select v-model="authorization.fontBold">
              <el-option label='加粗' value='bold'></el-option>
              <el-option label='正常' value='normal'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!--      年月日-->
        <h2>日期设置</h2>
        <el-form :model="dateStr" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-row>
            <el-form-item label="年">
              <el-input v-model="dateStr.year"></el-input>
            </el-form-item>
            <el-form-item label="月">
              <el-input v-model="dateStr.month"></el-input>
            </el-form-item>
            <el-form-item label="日">
              <el-input v-model="dateStr.day"></el-input>
            </el-form-item>
            <el-form-item label='字体颜色'>
              <el-color-picker v-model="dateStr.color"></el-color-picker>
            </el-form-item>
            <el-form-item label='字体'>
              <el-select v-model="dateStr.fontFamily">
                <el-option v-for="k in fonts" :key="k.value" :label='k.name' :value='k.value'></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='字重'>
              <el-select v-model="dateStr.fontBold">
                <el-option label='加粗' value='bold'></el-option>
                <el-option label='正常' value='normal'></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <h3>年设置</h3>
          <el-row>
            <el-form-item label='垂直偏移'>
              <el-input-number v-model="dateStr.top1" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label='水平偏移'>
              <el-input-number v-model="dateStr.left1" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label='旋转角度'>
              <el-input-number v-model="dateStr.deg1"></el-input-number>
            </el-form-item>
            <el-form-item label='字体大小'>
              <el-input-number v-model="dateStr.fontSize1" :min='10'></el-input-number>
            </el-form-item>
            <el-form-item label='字间距'>
              <el-input-number v-model="dateStr.letterSpace1"></el-input-number>
            </el-form-item>
          </el-row>
          <h3>月设置</h3>
          <el-row>
            <el-form-item label='垂直偏移'>
              <el-input-number v-model="dateStr.top2" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label='水平偏移'>
              <el-input-number v-model="dateStr.left2" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label='旋转角度'>
              <el-input-number v-model="dateStr.deg2"></el-input-number>
            </el-form-item>
            <el-form-item label='字体大小'>
              <el-input-number v-model="dateStr.fontSize2" :min='10'></el-input-number>
            </el-form-item>
            <el-form-item label='字间距'>
              <el-input-number v-model="dateStr.letterSpace2"></el-input-number>
            </el-form-item>
          </el-row>
          <h3>日设置</h3>
          <el-row>
            <el-form-item label='垂直偏移'>
              <el-input-number v-model="dateStr.top3" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label='水平偏移'>
              <el-input-number v-model="dateStr.left3" :step="0.1"></el-input-number>
            </el-form-item>
            <el-form-item label='旋转角度'>
              <el-input-number v-model="dateStr.deg3"></el-input-number>
            </el-form-item>
            <el-form-item label='字体大小'>
              <el-input-number v-model="dateStr.fontSize3" :min='10'></el-input-number>
            </el-form-item>
            <el-form-item label='字间距'>
              <el-input-number v-model="dateStr.letterSpace3"></el-input-number>
            </el-form-item>
          </el-row>
        </el-form>
        <div class="full-width flex-row flex-jst-btw flex-ali-center">
          <h2>印章设置(带 * 为非实时属性)</h2>
          <el-button size="small" type="primary" @click="restore">清除印章</el-button>
        </div>
        <el-form :model="canvasOptions" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <h3>全局设置</h3>
          <el-form-item label="宽度" required>
            <el-input-number v-model="canvasOptions.width"></el-input-number>
          </el-form-item>
          <el-form-item label="高度" required>
            <el-input-number v-model="canvasOptions.height" disabled></el-input-number>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="canvasOptions.left"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="canvasOptions.top"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转">
            <el-input-number v-model="canvasOptions.deg"></el-input-number>
          </el-form-item>
          <el-form-item label="透明度" required>
            <el-input-number v-model="canvasOptions.alpha" :min="0" :max="1" :step="0.1"></el-input-number>
          </el-form-item>
          <el-row>
            <el-form-item label="印章类型">
              <div class="flex-row flex-jst-btw flex-ali-center">
                <img :src="k.src" alt="" v-for="k in yzList" :key="k.value" class="yzbg-panel" :class="curYzBg === k.value ? 'cur-bg' : ''" @click="curYzBg = k.value">
              </div>
            </el-form-item>
            <el-row>
              <el-button size="small" type="primary" @click="drawBg">绘制印章底图</el-button>
            </el-row>
          </el-row>
          <h3>文字设置</h3>
          <el-form-item label="文字边距" required>
            <el-input-number v-model="canvasOptions.distance" :step="0.1" :min="0" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字" required>
            <el-input v-model="canvasOptions.content" type="text"></el-input>
          </el-form-item>
          <el-form-item label="文字透明度" required>
            <el-input-number v-model="canvasOptions.wordAlpha" :step="0.1" :min="0" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字大小" required>
            <el-input-number v-model="canvasOptions.wordFontSize" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="编号大小" required>
            <el-input-number v-model="canvasOptions.codeSize" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="编号" required>
            <el-input v-model="canvasOptions.code" type="text"></el-input>
          </el-form-item>
          <el-form-item label="噪点数量" required>
            <el-input-number v-model="canvasOptions.noice" :min="0" :step="1000"></el-input-number>
          </el-form-item>
          <el-row>
            <div class="pa-col-sm">
              <el-button type="primary" size="small" @click="drawWord(canvasOptions.wordFontSize, canvasOptions.distance, canvasOptions.wordAlpha, canvasOptions.codeSize)">生成印章文字</el-button>
              <el-button type="primary" size="small" @click="makeNoice(canvasOptions.noice)">增加噪点</el-button>
            </div>
          </el-row>
        </el-form>
        <div class="full-width flex-row flex-jst-center flex-ali-center pa-col-sm">
          <el-button type="primary" @click="saveImage">保存图片</el-button>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import html2canvas from 'html2canvas'
import { dataURLToBlob } from '@/utils/utils'
import yz1 from '../../assets/img/1.png'
import yz2 from '../../assets/img/2.png'
import yz3 from '../../assets/img/3.png'
export default {
  name: 'dbs',
  data () {
    return {
      mc: null,
      ctx: null,
      bgInfo: null,
      curYzBg: undefined, // 当前选择的印章背景
      canvasOptions: {
        width: 180,
        height: 180,
        left: 13.8,
        top: 66.5,
        alpha: 0.6,
        wordAlpha: 0.6,
        wordFontSize: 20,
        codeSize: 13,
        distance: 0.8,
        deg: 0,
        content: '',
        code: '',
        noice: 1000
      },
      companyName: {
        content: 'xxxxxx有限公司',
        top: 33.3,
        left: 2,
        letterSpace: -1,
        fontFamily: 'sxzt3',
        fontSize: 18,
        color: '#333333',
        deg: 0,
        fontBold: 'normal'
      },
      authorization: {
        content: '授权人',
        top: 45.3,
        left: 4.6,
        letterSpace: -1,
        fontFamily: 'sxzt3',
        fontSize: 18,
        color: '#333333',
        deg: 0,
        fontBold: 'normal'
      },
      dateStr: {
        year: 2021,
        month: 1,
        day: 1,
        fontFamily: 'sxzt3',
        fontBold: 'normal',
        color: '#333333',
        fontSize1: 18,
        fontSize2: 18,
        fontSize3: 18,
        top1: 52.2,
        top2: 52.2,
        top3: 52.2,
        left1: 3.4,
        left2: 12.3,
        left3: 18.8,
        letterSpace1: -1,
        letterSpace2: -1,
        letterSpace3: -1,
        deg1: 0,
        deg2: 0,
        deg3: 0
      },
      yzList: [
        { src: yz1, width: '', value: 1 },
        { src: yz2, width: '', value: 2 },
        { src: yz3, width: '', value: 3 }
      ]
    }
  },
  mounted () {
    this.mc = this.$refs.myCav
  },
  watch: {
    'canvasOptions.width': {
      handler: function (val) {
        this.canvasOptions.height = val
      }
    }
  },
  computed: {
    ...mapState(['fonts'])
  },
  methods: {
    emitUpload () {
      this.$refs.uploadInput.click()
    },
    doUpload (e) {
      const vm = this
      const target = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(target)
      reader.onload = () => {
        vm.bgInfo = reader.result
      }
    },
    saveImage () {
      const canvasID = this.$refs.picResult
      const a = document.createElement('a')
      html2canvas(canvasID).then(canvas => {
        const dom = document.body.appendChild(canvas)
        dom.style.display = 'none'
        a.style.display = 'none'
        document.body.removeChild(dom)
        const blob = dataURLToBlob(dom.toDataURL('image/png'))
        a.setAttribute('href', URL.createObjectURL(blob))
        a.setAttribute('download', 'text' + '.png')
        document.body.appendChild(a)
        a.click()
        URL.revokeObjectURL(blob)
        document.body.removeChild(a)
      })
    },
    drawBg () {
      const vm = this
      vm.ctx = vm.mc.getContext('2d')
      vm.ctx.globalAlpha = vm.canvasOptions.alpha
      const bgTarget = vm.yzList.find(item => item.value === vm.curYzBg)
      const img = new Image()
      img.onload = function () {
        vm.ctx.clearRect(0, 0, vm.canvasOptions.width, vm.canvasOptions.height)
        vm.ctx.drawImage(img, 0, 0, vm.canvasOptions.width, vm.canvasOptions.height)
      }
      img.src = bgTarget.src
    },
    restore () {
      const vm = this
      vm.ctx.setTransform(1, 0, 0, 1, 0, 0)
      vm.ctx.clearRect(0, 0, vm.canvasOptions.width, vm.canvasOptions.height)
    },
    drawWord (fontSize = 20, distance = 0.8, alpha = 0.9, codeSize) {
      const vm = this
      const wordList = vm.canvasOptions.content.split('') // 计算角度，文字大概是编码的2倍
      const codeList = vm.canvasOptions.code.split('')
      if (wordList.length === 0) {
        vm.$message.error('印章文字不能为空')
        return false
      }
      if (codeList.length === 0) {
        vm.$message.error('印章编号不能为空')
        return false
      }
      const angle = 1.25 * Math.PI / (wordList.length - 1) // 左右各留5度作为文字和编码的距离
      vm.ctx.font = `bold ${fontSize}px 'yzword' `
      // 文字颜色设置
      const { data } = vm.ctx.getImageData(vm.canvasOptions.width / 2, vm.canvasOptions.height / 2, 1, 1)
      vm.ctx.fillStyle = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3]})`
      vm.ctx.globalAlpha = alpha
      // vm.ctx.color = color
      wordList.forEach((item, idx) => {
        vm.ctx.save()
        vm.ctx.translate(vm.canvasOptions.width / 2, vm.canvasOptions.height / 2)
        const start = (idx * angle) - 1.125 * Math.PI
        const translateX = Math.cos(start) * ((vm.canvasOptions.width / 2) * distance)
        const translateY = Math.sin(start) * ((vm.canvasOptions.height / 2) * distance)
        // vm.ctx.textAlign = 'center'
        vm.ctx.translate(translateX, translateY)
        vm.ctx.rotate(start + (0.5 * Math.PI))
        vm.ctx.fillText(item, -(fontSize / 2), (fontSize / 2))
        vm.ctx.restore()
      })
      const angle1 = 0.45 * Math.PI / (codeList.length - 1)
      vm.ctx.font = `bold ${codeSize}px 'yahei'`
      codeList.forEach((item, idx) => {
        vm.ctx.save()
        vm.ctx.translate(vm.canvasOptions.width / 2, vm.canvasOptions.height / 2)
        const start = 0.725 * Math.PI - (idx * angle1)
        const translateX = Math.cos(start) * ((vm.canvasOptions.width / 2) * distance)
        const translateY = Math.sin(start) * ((vm.canvasOptions.height / 2) * distance)
        vm.ctx.translate(translateX, translateY)
        vm.ctx.rotate(start - 0.5 * Math.PI)
        vm.ctx.fillText(item, -(codeSize / 2), (codeSize / 2))
        vm.ctx.restore()
      })
    },
    makeNoice (count) {
      const vm = this
      let target = count
      const imageData = vm.ctx.getImageData(0, 0, vm.canvasOptions.width, vm.canvasOptions.height)
      for (let k = 0; k < imageData.data.length; k += 4) {
        const r = imageData.data[k]
        const a = imageData.data[k + 3]
        if (r > 0) {
          if (target > 0) {
            target--
            if (Math.random() > 0.95) {
              imageData.data[k + 3] = a * (0.3 + Math.random() * 0.6)
            }
          }
        }
      }
      vm.ctx.clearRect(0, 0, vm.canvasOptions.width, vm.canvasOptions.height)
      vm.ctx.putImageData(imageData, 0, 0)
    }
  }
}
</script>

<style scoped lang="scss">
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
