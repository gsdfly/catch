webpackJsonp([2],{kDcO:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=t("2Hum"),i={name:"gamehistory",data:function(){return{htmlShow:!1,dataList:{},current_page:1,hasNext:!0,size:20,loading:!0}},mounted:function(){var n=this;Object(a.e)({page:1,size:this.size}).then(function(e){try{n.dataList=e.response.list,n.current_page=e.response.pagination.current_page,e.response.pagination.current_page===e.response.pagination.total_pages&&(n.hasNext=!1)}catch(n){}n.htmlShow=!0,n.callAppFunction("showContent")})},methods:{goDollRoom:function(){this.callAppFunction("changeToHomeTab")},addEventScroll:function(n){n.target.scrollTop+3*n.target.clientHeight/2>=document.querySelector(".main").offsetHeight&&this.loading&&this.getGameHistory()},getGameHistory:function(){var n=this;this.loading=!1,console.log(this.hasNext),this.hasNext&&Object(a.e)({page:this.current_page+1,size:this.size}).then(function(e){n.loading=!0;try{e.response.list.forEach(function(n){this.dataList.push(n)}.bind(n)),n.current_page=e.response.pagination.current_page,e.response.pagination.current_page===e.response.pagination.total_pages&&(n.hasNext=!1)}catch(n){}}).catch(function(){n.loading=!0})}}},o={render:function(){var n=this,e=n.$createElement,a=n._self._c||e;return n.htmlShow?a("div",{staticClass:"gamehistory",on:{scroll:function(e){n.addEventScroll(e)}}},[n.dataList.length>0?a("ul",{staticClass:"main"},n._l(n.dataList,function(e){return a("li",[a("div",{staticClass:"doll"},[a("img",{attrs:{src:e.image,alt:""}})]),n._v(" "),a("div",{staticClass:"dollInfo"},[a("h3",[n._v(n._s(e.doll_name))]),n._v(" "),a("p",[n._v(n._s(e.start_time))])]),n._v(" "),a("div",{staticClass:"caught"},[e.prize?a("img",{attrs:{src:t("ruZr"),alt:""}}):a("span",[n._v("抓取失败")])])])})):a("div",{staticClass:"nothing"},[a("img",{attrs:{src:t("u+ek"),alt:""}}),n._v(" "),a("p",[n._v("您还没有进行过一场游戏")]),n._v(" "),a("button",{on:{click:n.goDollRoom}},[n._v("去游戏")])])]):n._e()},staticRenderFns:[]},A=t("/Xao")(i,o,!1,function(n){t("nGTl")},"data-v-3a369e77",null);e.default=A.exports},nGTl:function(n,e,t){var a=t("wLV7");"string"==typeof a&&(a=[[n.i,a,""]]),a.locals&&(n.exports=a.locals);t("8bSs")("792040f4",a,!0)},ruZr:function(n,e,t){n.exports=t.p+"static/img/stamp_success.3dbca70.png"},"u+ek":function(n,e,t){n.exports=t.p+"static/img/history_none.349d231.png"},wLV7:function(n,e,t){(n.exports=t("BkJT")(!0)).push([n.i,"\n.gamehistory[data-v-3a369e77]{\n  width: 100%;\n  height: 100%;\n  background: #fff2f2;\n  overflow: auto;\n  font-size: 0.48rem;\n}\n.gamehistory ul[data-v-3a369e77]{\n  width: 100%;\n  /*height: 100%;*/\n  padding:0.36rem 0.36rem 0.3rem 0.36rem;\n  /*overflow: auto;*/\n}\n.gamehistory ul li[data-v-3a369e77]{\n  width: 100%;\n  height: 2.46rem;\n  padding: 0.18rem 0.28rem;\n  background: #fff;\n  margin: 0 0 0.06rem 0;\n  border-radius: 0.18rem;\n}\n.gamehistory ul li .doll[data-v-3a369e77]{\n  width: 2.1rem;\n  height: 100%;\n  float: left;\n}\n.gamehistory ul li .doll img[data-v-3a369e77]{\n  display: block;\n  width: 100%;\n  height: 100%;\n  border-radius: 0.18rem;\n}\n.gamehistory ul li .dollInfo[data-v-3a369e77]{\n  /*width: 100;*/\n  float: left;\n  margin: 0 0 0 0.54rem;\n}\n.gamehistory ul li .dollInfo h3[data-v-3a369e77]{\n  line-height: 1.3rem;\n  max-width: 5rem;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.gamehistory ul li .dollInfo p[data-v-3a369e77]{\n  font-size: 0.36rem;\n  color: #999999;\n}\n.gamehistory ul li .caught[data-v-3a369e77]{\n  float: right;\n  font-size: 0.36rem;\n  color: #999999;\n  line-height: 2.1rem;\n}\n.gamehistory ul li .caught img[data-v-3a369e77]{\n  margin: 0.2rem 0 0 0;\n  width: 1.82rem;\n  height: 1.69rem;\n  display: block;\n}\n.nothing[data-v-3a369e77]{\n  width: 100%;\n  height: 100%;\n  position: relative;\n  top:0;\n  left: 0;\n  padding: 0.1px;\n}\n.nothing>img[data-v-3a369e77]{\n  width: 2.84rem;\n  display: block;\n  margin: 30% auto 0 auto;\n}\n.nothing>p[data-v-3a369e77]{\n  font-size: 0.52rem;\n  color: #999;\n  text-align: center;\n  margin: 2rem 0 0 0;\n}\n.nothing>button[data-v-3a369e77]{\n  width: 7.14rem;\n  height: 1.38rem;\n  font-size: 0.52rem;\n  color: #fff;\n  border-radius: 0.18rem;\n  background: #f972c7;\n  border: none;\n  outline: none;\n  position: absolute;\n  bottom:25%;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n","",{version:3,sources:["C:/Users/lester/Desktop/app/catchapp/src/components/gamehistory.vue"],names:[],mappings:";AACA;EACE,YAAY;EACZ,aAAa;EACb,oBAAoB;EACpB,eAAe;EACf,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,iBAAiB;EACjB,uCAAuC;EACvC,mBAAmB;CACpB;AACD;EACE,YAAY;EACZ,gBAAgB;EAChB,yBAAyB;EACzB,iBAAiB;EACjB,sBAAsB;EACtB,uBAAuB;CACxB;AACD;EACE,cAAc;EACd,aAAa;EACb,YAAY;CACb;AACD;EACE,eAAe;EACf,YAAY;EACZ,aAAa;EACb,uBAAuB;CACxB;AACD;EACE,eAAe;EACf,YAAY;EACZ,sBAAsB;CACvB;AACD;EACE,oBAAoB;EACpB,gBAAgB;EAChB,iBAAiB;EACjB,oBAAoB;EACpB,wBAAwB;CACzB;AACD;EACE,mBAAmB;EACnB,eAAe;CAChB;AACD;EACE,aAAa;EACb,mBAAmB;EACnB,eAAe;EACf,oBAAoB;CACrB;AACD;EACE,qBAAqB;EACrB,eAAe;EACf,gBAAgB;EAChB,eAAe;CAChB;AACD;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,MAAM;EACN,QAAQ;EACR,eAAe;CAChB;AACD;EACE,eAAe;EACf,eAAe;EACf,wBAAwB;CACzB;AACD;EACE,mBAAmB;EACnB,YAAY;EACZ,mBAAmB;EACnB,mBAAmB;CACpB;AACD;EACE,eAAe;EACf,gBAAgB;EAChB,mBAAmB;EACnB,YAAY;EACZ,uBAAuB;EACvB,oBAAoB;EACpB,aAAa;EACb,cAAc;EACd,mBAAmB;EACnB,WAAW;EACX,UAAU;EACV,oCAAoC;UAC5B,4BAA4B;CACrC",file:"gamehistory.vue",sourcesContent:["\n.gamehistory[data-v-3a369e77]{\n  width: 100%;\n  height: 100%;\n  background: #fff2f2;\n  overflow: auto;\n  font-size: 0.48rem;\n}\n.gamehistory ul[data-v-3a369e77]{\n  width: 100%;\n  /*height: 100%;*/\n  padding:0.36rem 0.36rem 0.3rem 0.36rem;\n  /*overflow: auto;*/\n}\n.gamehistory ul li[data-v-3a369e77]{\n  width: 100%;\n  height: 2.46rem;\n  padding: 0.18rem 0.28rem;\n  background: #fff;\n  margin: 0 0 0.06rem 0;\n  border-radius: 0.18rem;\n}\n.gamehistory ul li .doll[data-v-3a369e77]{\n  width: 2.1rem;\n  height: 100%;\n  float: left;\n}\n.gamehistory ul li .doll img[data-v-3a369e77]{\n  display: block;\n  width: 100%;\n  height: 100%;\n  border-radius: 0.18rem;\n}\n.gamehistory ul li .dollInfo[data-v-3a369e77]{\n  /*width: 100;*/\n  float: left;\n  margin: 0 0 0 0.54rem;\n}\n.gamehistory ul li .dollInfo h3[data-v-3a369e77]{\n  line-height: 1.3rem;\n  max-width: 5rem;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n.gamehistory ul li .dollInfo p[data-v-3a369e77]{\n  font-size: 0.36rem;\n  color: #999999;\n}\n.gamehistory ul li .caught[data-v-3a369e77]{\n  float: right;\n  font-size: 0.36rem;\n  color: #999999;\n  line-height: 2.1rem;\n}\n.gamehistory ul li .caught img[data-v-3a369e77]{\n  margin: 0.2rem 0 0 0;\n  width: 1.82rem;\n  height: 1.69rem;\n  display: block;\n}\n.nothing[data-v-3a369e77]{\n  width: 100%;\n  height: 100%;\n  position: relative;\n  top:0;\n  left: 0;\n  padding: 0.1px;\n}\n.nothing>img[data-v-3a369e77]{\n  width: 2.84rem;\n  display: block;\n  margin: 30% auto 0 auto;\n}\n.nothing>p[data-v-3a369e77]{\n  font-size: 0.52rem;\n  color: #999;\n  text-align: center;\n  margin: 2rem 0 0 0;\n}\n.nothing>button[data-v-3a369e77]{\n  width: 7.14rem;\n  height: 1.38rem;\n  font-size: 0.52rem;\n  color: #fff;\n  border-radius: 0.18rem;\n  background: #f972c7;\n  border: none;\n  outline: none;\n  position: absolute;\n  bottom:25%;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=2.2fd77be1aac94c3aace1.js.map