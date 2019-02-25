<script>
  import api from './api/index'
  import CONFIG from './config/index'
  import aldstat from "./utils/ald-stat.js"
export default {
   created () {
    console.log('APP created');
    wx.showLoading({"title": '加载中'});
  },
}
</script>

<style>
  page{
  width: 100%;
  height: 100%;
}
  @font-face {
    font-family: 'iconfont';  /* project id 385880 */
    src: url('//at.alicdn.com/t/font_385880_0yr0kb0nnekit3xr.eot');
    src: url('//at.alicdn.com/t/font_385880_0yr0kb0nnekit3xr.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_385880_0yr0kb0nnekit3xr.woff') format('woff'),
    url('//at.alicdn.com/t/font_385880_0yr0kb0nnekit3xr.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_385880_0yr0kb0nnekit3xr.svg#iconfont') format('svg');
  }
  .iconfont {
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-check:before { content: "\e649"; }

  .icon-go1:before { content: "\e63f"; }

  .icon-go:before { content: "\e658"; }

  .icon-xiazai45:before { content: "\e61a"; }

  .icon-jinbi:before { content: "\e68f"; }

  .icon-guanbi:before { content: "\e635"; }

  .icon-question:before { content: "\e615"; }

  .icon-jia:before { content: "\e6e9"; }

  .icon-bianji:before { content: "\e62b"; }

  .icon-icon-yxj-address:before { content: "\e60e"; }

  .icon-back:before { content: "\e737"; }

  .icon-jian:before { content: "\e608"; }

  .icon-fa-angle-up:before { content: "\e645"; }

  .icon-qian:before { content: "\e609"; }

  .icon-jiazai:before { content: "\e628"; }

  .icon-shanchu:before { content: "\e600"; }

  .icon-shanchu1:before { content: "\e624"; }

  .icon-delete:before { content: "\e601"; }

  .icon-quan:before { content: "\e646"; }

  .icon-fa-angle-down:before { content: "\e738"; }

  .icon-history:before { content: "\e73a"; }

  view{
    box-sizing: border-box;
  }
</style>
