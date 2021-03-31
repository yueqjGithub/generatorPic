<template>
  <div class="content-container flex-row flex-jst-btw flex-ali-start">
    <div class="result-container beauty-scroll">
      <el-scrollbar>
        <div class="full-width result" id="picResult" ref="picResult">
          <img :src="bgInfo" alt="" class="dbsBg" v-if="bgInfo">
          <img src="@/assets/img/zzbg.jpg" alt="" class="dbsBg" v-else>
          <p class="sx-word"
             :style='{
            top: `${code.top}%`,
            left: `${code.left}%`,
            letterSpacing: `${code.letterSpace}px`,
            fontSize: `${code.fontSize}px`,
            transform: `rotate(${code.deg}deg)`,
            color: code.color,
          }'
          >{{code.content}}</p>
          <p class="sx-word"
             :style='{
            top: `${companyName.top}%`,
            left: `${companyName.left}%`,
            letterSpacing: `${companyName.letterSpace}px`,
            fontSize: `${companyName.fontSize}px`,
            transform: `rotate(${companyName.deg}deg)`,
            color: companyName.color,
          }'
          >{{companyName.content}}</p>
          <p class="sx-word"
             :style='{
            top: `${type.top}%`,
            left: `${type.left}%`,
            letterSpacing: `${type.letterSpace}px`,
            fontSize: `${type.fontSize}px`,
            transform: `rotate(${type.deg}deg)`,
            color: type.color,
          }'
          >{{type.content}}</p>
          <p class="sx-word"
             :style='{
            top: `${legal.top}%`,
            left: `${legal.left}%`,
            letterSpacing: `${legal.letterSpace}px`,
            fontSize: `${legal.fontSize}px`,
            transform: `rotate(${legal.deg}deg)`,
            color: legal.color,
          }'
          >{{legal.content}}</p>
          <p class="sx-word break-p"
             :style='{
            top: `${scope.top}%`,
            left: `${scope.left}%`,
            letterSpacing: `${scope.letterSpace}px`,
            fontSize: `${scope.fontSize}px`,
            transform: `rotate(${scope.deg}deg)`,
            color: scope.color,
            width: `${scope.width}px`,
            lineHeight: `${scope.lineHeight}px`
          }'
          >{{scope.content}}</p>
          <div
          :style="{
            position: 'absolute',
            top: `${qrCode.top}%`,
            left: `${qrCode.left}%`,
            transform: `rotate(${qrCode.deg}deg)`,
            filter: `blur(${qrCode.blur}px)`
          }"
          >
            <qrcode-vue render-as="svg" :value="codeContent" :size="qrCode.width" level="L" background="rgba(255,255,255,0)" :foreground="qrCode.color"/>
          </div>
          <p class="sx-word break-p"
             :style='{
            top: `${registerMoney.top}%`,
            left: `${registerMoney.left}%`,
            letterSpacing: `${registerMoney.letterSpace}px`,
            fontSize: `${registerMoney.fontSize}px`,
            transform: `rotate(${registerMoney.deg}deg)`,
            color: registerMoney.color,
          }'
          >{{registerMoney.content}}</p>
          <p class="sx-word break-p"
             :style='{
            top: `${createTime.top}%`,
            left: `${createTime.left}%`,
            letterSpacing: `${createTime.letterSpace}px`,
            fontSize: `${createTime.fontSize}px`,
            transform: `rotate(${createTime.deg}deg)`,
            color: createTime.color,
          }'
          >{{createTime.content}}</p>
          <p class="sx-word break-p"
             :style='{
            top: `${dateLimit.top}%`,
            left: `${dateLimit.left}%`,
            letterSpacing: `${dateLimit.letterSpace}px`,
            fontSize: `${dateLimit.fontSize}px`,
            transform: `rotate(${dateLimit.deg}deg)`,
            color: dateLimit.color,
          }'
          >{{dateLimit.content}}</p>
          <p class="sx-word break-p"
             :style='{
            top: `${address.top}%`,
            left: `${address.left}%`,
            letterSpacing: `${address.letterSpace}px`,
            fontSize: `${address.fontSize}px`,
            transform: `rotate(${address.deg}deg)`,
            color: address.color,
            width: `${address.width}px`,
            lineHeight: `${address.lineHeight}px`
          }'
          >{{address.content}}</p>
          <p class="sx-word"
             :style='{
            top: `${dateStr.top1}%`,
            left: `${dateStr.left1}%`,
            letterSpacing: `${dateStr.letterSpace1}px`,
            fontSize: `${dateStr.fontSize1}px`,
            transform: `rotate(${dateStr.deg1}deg)`,
            color: dateStr.color,
          }'
          >{{dateStr.year}}</p>
          <p class="sx-word"
             :style='{
            top: `${dateStr.top2}%`,
            left: `${dateStr.left2}%`,
            letterSpacing: `${dateStr.letterSpace2}px`,
            fontSize: `${dateStr.fontSize2}px`,
            transform: `rotate(${dateStr.deg2}deg)`,
            color: dateStr.color,
          }'
          >{{dateStr.month}}</p>
          <p class="sx-word"
             :style='{
            top: `${dateStr.top3}%`,
            left: `${dateStr.left3}%`,
            letterSpacing: `${dateStr.letterSpace3}px`,
            fontSize: `${dateStr.fontSize3}px`,
            transform: `rotate(${dateStr.deg3}deg)`,
            color: dateStr.color,
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
        <h2>统一社会信用代码设置</h2>
        <el-form :model="code" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-form-item label="内容">
            <el-input type="text" v-model="code.content"></el-input>
          </el-form-item>
          <el-form-item label="文字大小">
            <el-input-number v-model="code.fontSize" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字间距">
            <el-input-number v-model="code.letterSpace" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="code.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="code.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="code.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="code.deg" :step="0.1"></el-input-number>
          </el-form-item>
        </el-form>
        <h2>名称设置</h2>
        <el-form :model="companyName" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-form-item label="内容">
            <el-input type="text" v-model="companyName.content"></el-input>
          </el-form-item>
          <el-form-item label="文字大小">
            <el-input-number v-model="companyName.fontSize" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字间距">
            <el-input-number v-model="companyName.letterSpace" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="companyName.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="companyName.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="companyName.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="companyName.deg" :step="0.1"></el-input-number>
          </el-form-item>
        </el-form>
        <h2>类型设置</h2>
        <el-form :model="type" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-form-item label="内容">
            <el-input type="text" v-model="type.content"></el-input>
          </el-form-item>
          <el-form-item label="文字大小">
            <el-input-number v-model="type.fontSize" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字间距">
            <el-input-number v-model="type.letterSpace" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="type.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="type.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="type.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="type.deg" :step="0.1"></el-input-number>
          </el-form-item>
        </el-form>
        <h2>法人设置</h2>
        <el-form :model="legal" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-form-item label="内容">
            <el-input type="text" v-model="legal.content"></el-input>
          </el-form-item>
          <el-form-item label="文字大小">
            <el-input-number v-model="legal.fontSize" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字间距">
            <el-input-number v-model="legal.letterSpace" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="legal.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="legal.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="legal.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="legal.deg" :step="0.1"></el-input-number>
          </el-form-item>
        </el-form>
        <h2>经营范围</h2>
        <el-form :model="scope" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="内容">
                <el-input type="textarea" v-model="scope.content" :rows="10" style="width: 20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="文字大小">
            <el-input-number v-model="scope.fontSize" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字间距">
            <el-input-number v-model="scope.letterSpace" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="行高">
            <el-input-number v-model="scope.lineHeight" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="scope.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="内容宽度">
            <el-input-number v-model="scope.width" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="scope.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="scope.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="scope.deg" :step="0.1"></el-input-number>
          </el-form-item>
        </el-form>
        <h2>二维码设置</h2>
        <el-form :model="qrCode" inline label-width="80px" label-position="right" size="mini" class="cus-form">
          <el-form-item label="二维码大小">
            <el-input-number v-model="qrCode.width"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="qrCode.deg"></el-input-number>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="qrCode.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="qrCode.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label='颜色'>
            <el-color-picker v-model="qrCode.color"></el-color-picker>
          </el-form-item>
        </el-form>
        <h2>注册资本</h2>
        <el-form :model="registerMoney" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-row>
            <el-form-item label="内容">
              <el-input type="text" v-model="registerMoney.content" ></el-input>
            </el-form-item>
          </el-row>
          <el-form-item label="文字大小">
            <el-input-number v-model="registerMoney.fontSize" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字间距">
            <el-input-number v-model="registerMoney.letterSpace" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="registerMoney.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="registerMoney.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="registerMoney.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="registerMoney.deg" :step="0.1"></el-input-number>
          </el-form-item>
        </el-form>
        <h2>成立日期</h2>
        <el-form :model="createTime" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-row>
            <el-form-item label="内容">
              <el-input type="text" v-model="createTime.content" ></el-input>
            </el-form-item>
          </el-row>
          <el-form-item label="文字大小">
            <el-input-number v-model="createTime.fontSize" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字间距">
            <el-input-number v-model="createTime.letterSpace" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="createTime.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="createTime.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="createTime.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="createTime.deg" :step="0.1"></el-input-number>
          </el-form-item>
        </el-form>
        <h2>营业期限</h2>
        <el-form :model="dateLimit" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-row>
            <el-form-item label="内容">
              <el-input type="text" v-model="dateLimit.content" ></el-input>
            </el-form-item>
          </el-row>
          <el-form-item label="文字大小">
            <el-input-number v-model="dateLimit.fontSize" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字间距">
            <el-input-number v-model="dateLimit.letterSpace" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="dateLimit.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="dateLimit.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="dateLimit.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="dateLimit.deg" :step="0.1"></el-input-number>
          </el-form-item>
        </el-form>
        <h2>住所</h2>
        <el-form :model="address" inline label-width='80px' label-position='right' size="mini" class="cus-form">
          <el-row>
            <el-col :span="24">
              <el-form-item label="内容">
                <el-input type="textarea" v-model="address.content" :rows="3" style="width: 20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="文字大小">
            <el-input-number v-model="address.fontSize" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="文字间距">
            <el-input-number v-model="address.letterSpace" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="行高">
            <el-input-number v-model="address.lineHeight" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label='字体颜色'>
            <el-color-picker v-model="address.color"></el-color-picker>
          </el-form-item>
          <el-form-item label="内容宽度">
            <el-input-number v-model="address.width" :step="1"></el-input-number>
          </el-form-item>
          <el-form-item label="水平偏移量">
            <el-input-number v-model="address.left" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="垂直偏移量">
            <el-input-number v-model="address.top" :step="0.1"></el-input-number>
          </el-form-item>
          <el-form-item label="旋转角度">
            <el-input-number v-model="address.deg" :step="0.1"></el-input-number>
          </el-form-item>
        </el-form>
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
              <el-input-number v-model="dateStr.deg1" :step="0.1"></el-input-number>
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
              <el-input-number v-model="dateStr.deg2" :step="0.1"></el-input-number>
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
              <el-input-number v-model="dateStr.deg3" :step="0.1"></el-input-number>
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
import QrcodeVue from 'qrcode.vue'
import html2canvas from 'html2canvas'
import { dataURLToBlob } from '@/utils/utils'
import yz1 from '@/assets/img/1.png'
import yz2 from '@/assets/img/2.png'
import yz3 from '@/assets/img/3.png'
export default {
  name: 'genZz',
  components: {
    QrcodeVue
  },
  data () {
    return {
      mc: null,
      ctx: null,
      bgInfo: null,
      curYzBg: undefined, // 当前选择的印章背景
      canvasOptions: {
        width: 160,
        height: 160,
        left: 74.8,
        top: 65.5,
        alpha: 0.6,
        wordAlpha: 0.6,
        wordFontSize: 20,
        codeSize: 13,
        distance: 0.8,
        deg: 0,
        content: '锦江市场监督管理',
        code: '501398266',
        noice: 1000
      },
      code: {
        content: 'MMMMMMMMMMMMMM',
        color: '#413c3c',
        deg: 0.3,
        fontSize: 14,
        letterSpace: 0,
        top: 31,
        left: 9.8
      },
      companyName: {
        content: 'XXXXXXX有限公司',
        color: '#413c3c',
        deg: 0.3,
        fontSize: 14,
        letterSpace: 0,
        top: 44.8,
        left: 22.8
      },
      type: {
        content: '有限责任公司(自然人独资)',
        color: '#413c3c',
        deg: 0.3,
        fontSize: 14,
        letterSpace: 0,
        top: 49.8,
        left: 22.6
      },
      legal: {
        content: 'XXX',
        color: '#413c3c',
        deg: 0.3,
        fontSize: 14,
        letterSpace: 0,
        top: 54.6,
        left: 22.8
      },
      scope: {
        content: '公司从事XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        color: '#413c3c',
        deg: 0.1,
        fontSize: 14,
        letterSpace: 0,
        top: 59.8,
        left: 22.8,
        width: 280,
        lineHeight: 14
      },
      qrCode: {
        width: 71,
        deg: 0,
        left: 71.2,
        top: 27.5,
        color: '#333333',
        blur: 0
      },
      registerMoney: {
        content: '壹万元整',
        color: '#413c3c',
        deg: 0.3,
        fontSize: 14,
        letterSpace: 0,
        top: 44.2,
        left: 67.8
      },
      createTime: {
        content: '2021年3月26日',
        color: '#413c3c',
        deg: 0.3,
        fontSize: 14,
        letterSpace: 0,
        top: 49.1,
        left: 67.8
      },
      dateLimit: {
        content: '2021年3月26日至无固定期限',
        color: '#413c3c',
        deg: 0.3,
        fontSize: 14,
        letterSpace: 0,
        top: 53.9,
        left: 67.8
      },
      address: {
        content: '四川省成都市高新区孵化园楚风国际中心',
        color: '#413c3c',
        deg: 0.3,
        fontSize: 14,
        letterSpace: 0,
        top: 59.1,
        left: 67.8,
        width: 224,
        lineHeight: 14
      },
      dateStr: {
        year: '2021',
        month: '01',
        day: '01',
        color: '#413c3c',
        fontSize1: 19,
        fontSize2: 19,
        fontSize3: 19,
        top1: 82.6,
        top2: 82.6,
        top3: 82.6,
        left1: 72,
        left2: 79.9,
        left3: 84.6,
        letterSpace1: -1,
        letterSpace2: -1,
        letterSpace3: -1,
        deg1: 0.3,
        deg2: 0.3,
        deg3: 0.3
      },
      yzList: [
        { src: yz1, width: '', value: 1 },
        { src: yz2, width: '', value: 2 },
        { src: yz3, width: '', value: 3 }
      ]
    }
  },
  watch: {
    'canvasOptions.width': {
      handler: function (val) {
        this.canvasOptions.height = val
      }
    }
  },
  computed: {
    codeContent () {
      return `http://www.gsxt.gov.cn/index.html?uniscid=${this.code.content}`
    }
  },
  mounted () {
    this.mc = this.$refs.myCav
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
        font-family: 'yzword';
      }
      .break-p{
        word-wrap: break-word;
        word-break: break-all;
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
