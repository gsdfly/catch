webpackJsonp([7],{OloL:function(n,e,r){(n.exports=r("BkJT")(!0)).push([n.i,"\n.order[data-v-6628aebb] {\n  width: 100%;\n  height: 100%;\n  padding: 0.36rem;\n  background: #fff2f2;\n  overflow: auto;\n  font-size: 0.44rem;\n  color: #999999;\n}\n.order .orderInfo[data-v-6628aebb] {\n  width: 100%;\n  padding: 0.36rem 0.36rem 0 0.36rem;\n  background: #fff;\n  border-radius: 0.18rem;\n  overflow: hidden;\n}\n.order .orderInfo .imgs[data-v-6628aebb] {\n  width: 100%;\n  /*height: 2.1rem;*/\n  overflow: auto;\n  margin: 0 0 0.12rem 0;\n  /*display: flex;*/\n  /*justify-content: space-between;*/\n  /*flex-wrap: wrap;*/\n}\n.order .orderInfo .imgs img[data-v-6628aebb] {\n  width: 2.1rem;\n  /*height: 100%;*/\n  float: left;\n  border-radius: 0.18rem;\n  /*margin: 0 0.3rem 0.3rem 0;*/\n  margin-right:calc((100% - 8.4rem)/3);\n  margin-bottom:calc((100% - 8.4rem)/3);\n}\n.order .orderInfo .imgs img[data-v-6628aebb]:nth-of-type(4n) {\n  margin: 0;\n}\n.order dl[data-v-6628aebb] {\n  width: 100%;\n  min-height: 1.66rem;\n  line-height: 1.65rem;\n  border-top: 1px solid #dfdfdf;\n  overflow: hidden;\n}\n.order dl dt[data-v-6628aebb] {\n  float: left;\n}\n.order dl dd[data-v-6628aebb] {\n  float: right;\n  max-width: 88%;\n  color: #494949;\n}\n.order .userInfo[data-v-6628aebb] {\n  width: 100%;\n  padding: 0 0.36rem 0.36rem 0.36rem;\n  background: #fff;\n  margin: 0.36rem 0 0 0;\n  border-radius: 0.18rem;\n}\n.order .userInfo dl[data-v-6628aebb]:first-of-type {\n  border-top: none;\n}\n.order .userInfo dl[data-v-6628aebb]:last-of-type {\n  line-height: 0.5rem;\n  padding: 0.6rem 0 0 0;\n}\n\n\n","",{version:3,sources:["C:/Users/lester/Desktop/app/catchapp/src/components/order.vue"],names:[],mappings:";AACA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,oBAAoB;EACpB,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,YAAY;EACZ,mCAAmC;EACnC,iBAAiB;EACjB,uBAAuB;EACvB,iBAAiB;CAClB;AACD;EACE,YAAY;EACZ,mBAAmB;EACnB,eAAe;EACf,sBAAsB;EACtB,kBAAkB;EAClB,mCAAmC;EACnC,oBAAoB;CACrB;AACD;EACE,cAAc;EACd,iBAAiB;EACjB,YAAY;EACZ,uBAAuB;EACvB,8BAA8B;EAC9B,qCAAqC;EACrC,sCAAsC;CACvC;AACD;EACE,UAAU;CACX;AACD;EACE,YAAY;EACZ,oBAAoB;EACpB,qBAAqB;EACrB,8BAA8B;EAC9B,iBAAiB;CAClB;AACD;EACE,YAAY;CACb;AACD;EACE,aAAa;EACb,eAAe;EACf,eAAe;CAChB;AACD;EACE,YAAY;EACZ,mCAAmC;EACnC,iBAAiB;EACjB,sBAAsB;EACtB,uBAAuB;CACxB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,oBAAoB;EACpB,sBAAsB;CACvB",file:"order.vue",sourcesContent:["\n.order[data-v-6628aebb] {\n  width: 100%;\n  height: 100%;\n  padding: 0.36rem;\n  background: #fff2f2;\n  overflow: auto;\n  font-size: 0.44rem;\n  color: #999999;\n}\n.order .orderInfo[data-v-6628aebb] {\n  width: 100%;\n  padding: 0.36rem 0.36rem 0 0.36rem;\n  background: #fff;\n  border-radius: 0.18rem;\n  overflow: hidden;\n}\n.order .orderInfo .imgs[data-v-6628aebb] {\n  width: 100%;\n  /*height: 2.1rem;*/\n  overflow: auto;\n  margin: 0 0 0.12rem 0;\n  /*display: flex;*/\n  /*justify-content: space-between;*/\n  /*flex-wrap: wrap;*/\n}\n.order .orderInfo .imgs img[data-v-6628aebb] {\n  width: 2.1rem;\n  /*height: 100%;*/\n  float: left;\n  border-radius: 0.18rem;\n  /*margin: 0 0.3rem 0.3rem 0;*/\n  margin-right:calc((100% - 8.4rem)/3);\n  margin-bottom:calc((100% - 8.4rem)/3);\n}\n.order .orderInfo .imgs img[data-v-6628aebb]:nth-of-type(4n) {\n  margin: 0;\n}\n.order dl[data-v-6628aebb] {\n  width: 100%;\n  min-height: 1.66rem;\n  line-height: 1.65rem;\n  border-top: 1px solid #dfdfdf;\n  overflow: hidden;\n}\n.order dl dt[data-v-6628aebb] {\n  float: left;\n}\n.order dl dd[data-v-6628aebb] {\n  float: right;\n  max-width: 88%;\n  color: #494949;\n}\n.order .userInfo[data-v-6628aebb] {\n  width: 100%;\n  padding: 0 0.36rem 0.36rem 0.36rem;\n  background: #fff;\n  margin: 0.36rem 0 0 0;\n  border-radius: 0.18rem;\n}\n.order .userInfo dl[data-v-6628aebb]:first-of-type {\n  border-top: none;\n}\n.order .userInfo dl[data-v-6628aebb]:last-of-type {\n  line-height: 0.5rem;\n  padding: 0.6rem 0 0 0;\n}\n\n\n"],sourceRoot:""}])},R7Pr:function(n,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r("2Hum"),d={name:"order",data:function(){return{orderInfo:{},htmlShow:!1}},mounted:function(){var n=this,e=this.$route.query.dollID;Object(t.c)({id:e}).then(function(e){n.orderInfo=e.response,n.htmlShow=!0,n.callAppFunction("showContent")})}},o={render:function(){var n=this.$createElement,e=this._self._c||n;return this.htmlShow?e("div",{staticClass:"order"},[e("div",{staticClass:"orderInfo"},[e("div",{staticClass:"imgs"},this._l(this.orderInfo.doll_snapshot.slice(0,2),function(n,r){return e("img",{attrs:{src:n.picture,alt:""}})})),this._v(" "),e("dl",[e("dt",[this._v("当前状态")]),this._v(" "),e("dd",[this._v(this._s(this.orderInfo.status))])]),this._v(" "),e("dl",[e("dt",[this._v("快递")]),this._v(" "),e("dd",[this._v(this._s(this.orderInfo.express_company))])]),this._v(" "),e("dl",[e("dt",[this._v("订单号")]),this._v(" "),e("dd",[this._v(this._s(this.orderInfo.express_no))])])]),this._v(" "),e("div",{staticClass:"userInfo"},[e("dl",[e("dt",[this._v("收件人")]),this._v(" "),e("dd",[this._v(this._s(this.orderInfo.address_snapshot.name))])]),this._v(" "),e("dl",[e("dt",[this._v("联系电话")]),this._v(" "),e("dd",[this._v(this._s(this.orderInfo.address_snapshot.phone))])]),this._v(" "),e("dl",[e("dt",[this._v("地址")]),this._v(" "),e("dd",[this._v("\n        "+this._s(""+this.orderInfo.address_snapshot.province+this.orderInfo.address_snapshot.city+this.orderInfo.address_snapshot.area+this.orderInfo.address_snapshot.address)+"\n      ")])])])]):this._e()},staticRenderFns:[]},a=r("/Xao")(d,o,!1,function(n){r("uTUF")},"data-v-6628aebb",null);e.default=a.exports},uTUF:function(n,e,r){var t=r("OloL");"string"==typeof t&&(t=[[n.i,t,""]]),t.locals&&(n.exports=t.locals);r("8bSs")("2657a4a6",t,!0)}});
//# sourceMappingURL=7.d098e5276296a81665e8.js.map