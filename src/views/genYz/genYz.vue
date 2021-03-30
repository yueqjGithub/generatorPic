<template>
  <div class="content-container flex-row flex-jst-btw flex-ali-start">
    <div class="result-container beauty-scroll">
      <el-scrollbar>
        <div class="full-width result" id="picResult" ref="picResult">
          <img src="@/assets/img/yzbg.jpg" alt="" class="dbsBg">
          <canvas ref="myCav" id="myCav" :width="canvasOptions.width" :height="canvasOptions.height"
                  :style="{
            left: `${canvasOptions.left}%`,
            top: `${canvasOptions.top}%`,
            transform: `rotateZ(${canvasOptions.degZ}deg) rotateX(${canvasOptions.degX}deg) rotateY(${canvasOptions.degY}deg)`
          }"
          ></canvas>
        </div>
      </el-scrollbar>
    </div>
    <div class="options-container beauty-scroll">
      <el-scrollbar>
        <div class="full-width flex-row flex-jst-btw flex-ali-center">
          <h2>印章设置(带*为非实时属性)</h2>
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
            <el-input-number v-model="canvasOptions.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="canvasOptions.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转(X)">
            <el-input-number v-model="canvasOptions.degX" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转(Y)">
            <el-input-number v-model="canvasOptions.degY" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转(Z)">
            <el-input-number v-model="canvasOptions.degZ" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="透明度" >
            <el-input-number v-model="canvasOptions.alpha" :min="0" :max="1" :step="0.1"></el-input-number>
          </el-form-item>
          <h3>文字设置</h3>
          <el-form-item label="文字边距" >
            <el-input-number v-model="canvasOptions.distance" :step="0.1" :min="0" :max="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字" >
            <el-input v-model="canvasOptions.content" type="text"></el-input>
          </el-form-item>
          <el-form-item label="文字颜色" >
            <el-color-picker v-model="canvasOptions.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="文字大小" >
            <el-input-number v-model="canvasOptions.wordFontSize" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="编号大小" >
            <el-input-number v-model="canvasOptions.codeSize" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="编号" >
            <el-input v-model="canvasOptions.code" type="text"></el-input>
          </el-form-item>
          <el-form-item label="噪点数量" >
            <el-input-number v-model="canvasOptions.noice" :min="0" :step="1000"></el-input-number>
          </el-form-item>
          <h3>投影设置</h3>
          <el-row>
            <el-form-item label="投影开关">
              <el-checkbox v-model="canvasOptions.openFront">光源向投影</el-checkbox>
              <el-checkbox v-model="canvasOptions.openBack">背向投影</el-checkbox>
            </el-form-item>
          </el-row>
          <el-row>
            <el-form-item label="光源角度">
              <el-input-number v-model="canvasOptions.lightDeg" :step="1"></el-input-number>
            </el-form-item>
            <el-form-item label="光源投影色">
              <el-color-picker v-model="canvasOptions.frontColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="光源投影距离">
              <el-input-number v-model="canvasOptions.frontDistance" :step="0.1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="背向投影色">
              <el-color-picker v-model="canvasOptions.backColor"></el-color-picker>
            </el-form-item>
            <el-form-item label="背向投影距离">
              <el-input-number v-model="canvasOptions.backDistance" :step="0.1" :min="0"></el-input-number>
            </el-form-item>
          </el-row>
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
import html2canvas from 'html2canvas'
import { dataURLToBlob } from '@/utils/utils'
export default {
  name: 'genYz',
  data () {
    return {
      mc: null,
      ctx: null,
      canvasOptions: {
        width: 470,
        height: 460,
        left: 17.55,
        top: 28.5,
        alpha: 0.9,
        wordAlpha: 0.9,
        wordFontSize: 40,
        codeSize: 23,
        distance: 0.8,
        degX: -6,
        degY: 6,
        degZ: 33.8,
        content: '锦江市场监督管理',
        code: '501398266',
        noice: 1000,
        color: '#582A15',
        frontColor: '#737070',
        lightDeg: 28,
        frontDistance: 0.1,
        backColor: '#0E0A0A',
        backDistance: 1.3,
        openFront: false,
        openBack: false
      }
    }
  },
  watch: {
    'canvasOptions.width': {
      handler: function (val) {
        this.canvasOptions.height = val
      }
    },
    canvasOptions: {
      immediate: false,
      deep: true,
      handler: function (val) {
        this.restore()
        this.drawWord(val.wordFontSize, val.distance, val.alpha, val.codeSize)
      }
    }
  },
  mounted () {
    this.mc = this.$refs.myCav
  },
  methods: {
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
    restore () {
      const vm = this
      if (vm.ctx) {
        vm.ctx.setTransform(1, 0, 0, 1, 0, 0)
        vm.ctx.clearRect(0, 0, vm.canvasOptions.width, vm.canvasOptions.height)
      }
    },
    drawWord (fontSize = 20, distance = 0.8, alpha = 0.9, codeSize) {
      const vm = this
      vm.ctx = vm.mc.getContext('2d')
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
      vm.ctx.fillStyle = vm.canvasOptions.color
      vm.ctx.globalAlpha = alpha
      // vm.ctx.color = color
      wordList.reverse().forEach((item, idx) => {
        vm.ctx.save()
        vm.ctx.translate(vm.canvasOptions.width / 2, vm.canvasOptions.height / 2)
        const start = (idx * angle) - 1.125 * Math.PI
        const translateX = Math.cos(start) * ((vm.canvasOptions.width / 2) * distance)
        const translateY = Math.sin(start) * ((vm.canvasOptions.height / 2) * distance)
        // vm.ctx.textAlign = 'center'
        vm.ctx.translate(translateX, translateY)
        vm.ctx.rotate(start + (0.5 * Math.PI))
        vm.ctx.scale(-1, 1)
        vm.ctx.fillText(item, -(fontSize / 2), (fontSize / 2))
        if (vm.canvasOptions.openFront) {
          vm.ctx.globalCompositeOperation = 'destination-over'
          vm.ctx.fillStyle = vm.canvasOptions.frontColor
          const frontTarget = (vm.canvasOptions.lightDeg * Math.PI / 180) - start - 0.5 * Math.PI
          const frontX = Math.cos(frontTarget) * vm.canvasOptions.frontDistance
          const frontY = Math.sin(frontTarget) * vm.canvasOptions.frontDistance
          vm.ctx.translate(frontX, frontY)
          vm.ctx.fillText(item, -(fontSize / 2), (fontSize / 2))
          vm.ctx.translate(-frontX, -frontY)
        }
        // 背向投影
        if (vm.canvasOptions.openBack) {
          vm.ctx.globalCompositeOperation = 'destination-over'
          vm.ctx.fillStyle = vm.canvasOptions.backColor
          const backTarget = ((vm.canvasOptions.lightDeg + 180) * Math.PI / 180) - start - 0.5 * Math.PI
          const backX = Math.cos(backTarget) * vm.canvasOptions.backDistance
          const backY = Math.sin(backTarget) * vm.canvasOptions.backDistance
          vm.ctx.translate(backX, backY)
          vm.ctx.fillText(item, -(fontSize / 2), (fontSize / 2))
        }
        vm.ctx.restore()
      })
      const angle1 = 0.45 * Math.PI / (codeList.length - 1)
      vm.ctx.font = `bold ${codeSize}px 'yahei'`
      codeList.reverse().forEach((item, idx) => {
        vm.ctx.save()
        vm.ctx.translate(vm.canvasOptions.width / 2, vm.canvasOptions.height / 2)
        const start = 0.725 * Math.PI - (idx * angle1)
        const translateX = Math.cos(start) * ((vm.canvasOptions.width / 2) * distance)
        const translateY = Math.sin(start) * ((vm.canvasOptions.height / 2) * distance)
        vm.ctx.translate(translateX, translateY)
        vm.ctx.rotate(start - 0.5 * Math.PI)
        vm.ctx.scale(-1, 1)
        vm.ctx.fillText(item, -(codeSize / 2), (codeSize / 2))
        // vm.ctx.globalCompositeOperation = 'destination-over'
        // vm.ctx.fillStyle = '#fff'
        // vm.ctx.translate(-1, 0)
        // vm.ctx.fillText(item, -(codeSize / 2), (codeSize / 2))
        // 光源向投影
        if (vm.canvasOptions.openFront) {
          vm.ctx.globalCompositeOperation = 'destination-over'
          vm.ctx.fillStyle = vm.canvasOptions.frontColor
          const frontTarget = (vm.canvasOptions.lightDeg * Math.PI / 180) - start + 0.5 * Math.PI
          const frontX = Math.cos(frontTarget) * vm.canvasOptions.frontDistance
          const frontY = Math.sin(frontTarget) * vm.canvasOptions.frontDistance
          vm.ctx.translate(frontX, frontY)
          vm.ctx.fillText(item, -(codeSize / 2), (codeSize / 2))
          vm.ctx.translate(-frontX, -frontY)
        }
        // 背向投影
        if (vm.canvasOptions.openBack) {
          vm.ctx.globalCompositeOperation = 'destination-over'
          vm.ctx.fillStyle = vm.canvasOptions.backColor
          const backTarget = ((vm.canvasOptions.lightDeg + 180) * Math.PI / 180) - start + 0.5 * Math.PI
          const backX = Math.cos(backTarget) * vm.canvasOptions.backDistance
          const backY = Math.sin(backTarget) * vm.canvasOptions.backDistance
          vm.ctx.translate(backX, backY)
          vm.ctx.fillText(item, -(codeSize / 2), (codeSize / 2))
        }
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
