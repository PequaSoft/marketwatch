(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{538:function(t,e,r){"use strict";r.r(e);r(65),r(68),r(56),r(62),r(111);var o=r(41),l=r(109),n=(r(376),r(384),r(378)),c=r(379),d=r(380),h=r(77),m=r.n(h),v=r(373),f=r.n(v),_=(r(386),r(387),r(388)),x={name:"Modal",components:{loginModal:n.a,profileModal:c.a,registerModal:d.a,ChartLine:_.a},props:["id"],data:function(){return{activeTab:"/intraday/".concat(this.id),isLoginVisible:!1,isProfileVisible:!1,isRegisterVisible:!1,isLoanPmtsVisible:!1,modal2:!1,itemsx:["Per Year","Per Month","Per Quarter"],Calc_principal:"0",Calc_rate:"0.0000",curr_From:"usd",curr_To:"usd",sInterval:"1min",Calc_pmtsperyear:12,Calc_numpmts:"0",Calc_pmt:"0.00",sYears:"0",sPmtsPeryear:"Monthly",sPmts:"0",startupTab:0,tabs:[{id:1,name:"Task",route:"/intraday/task"},{id:2,name:"Project",route:"/intraday/project"}],items:["btc","cad","chf","eur","usd"],interval:["1min","5min","15min","30min","60min","Daily","Weekly","Monthly"],headers:[{text:"Section",align:"left",sortable:!1,value:"section",class:"primary white--text title"},{text:"Category",align:"left",sortable:!1,value:"category",class:"primary white--text title"},{text:"Value",align:"right",value:"value",class:"primary white--text title"}],results_a:[],results_b:[],results_c:[],results_d:[],results_e:[],results_f:[],results_g:[],results_h:[],results_i:[],results_j:[],modal3:!1,componentKey:0,dataLabel:"Open",labelOpen:"Open",labelHigh:"High",labelLow:"Low",labelClose:"Close",labelVolume:"Volume",bgColor:"#81894e",beginZero:!1,borderColor:"#81894e",ssrcLoanName:"",snewLoanName:"",chartShow:1,chartBeg:1,chartEnd:10,nonblankRules:[function(t){return!!t||"The input is required"}]}},computed:Object(l.b)({xUID:"globalData/get_uid",xPWD:"globalData/get_pwd",xAxios:"globalData/get_axios",xForex:"globalData/get_forex",xAlphaKey:"globalData/get_AlphaKey"}),metaInfo:{title:"Sector",meta:[{vmid:"og:title",property:"og:title",content:"Sector Page"},{vmid:"og:site_name",property:"og:site_name",content:"Sector"},{vmid:"og:type",property:"og:type",content:"Website"},{vmid:"og:url",property:"og:url",content:"https://markettrackerpro.com/sector"},{vmid:"og:description",property:"og:description",content:"This is where users can analyze sector data."},{name:"twitter:card",content:"summary"},{name:"twitter:site",content:"@pequasoft"},{name:"twitter:title",content:"Sector"},{name:"twitter:description",content:"This is where users can analyze sector data."},{name:"twitter:url",content:"https://twitter.com/PequaSoft"},{name:"twitter:domain",content:"PequaSoft"},{itemprop:"name",content:"Sector"},{itemprop:"description",content:"This is where users can analyze sector data."},{itemprop:"image",content:"https://markettrackerpro.com/sector"}]},created:function(){var t=this;this.$bus.$on("HDR_LOGIN",(function(data){t.$bus.$emit("ACTIVATE_LOGIN","abc"),t.isLoginVisible=!0})),this.$bus.$on("HDR_REGISTER",(function(data){t.$bus.$emit("ACTIVATE_REGISTER","abc"),t.isRegisterVisible=!0})),this.$bus.$on("HDR_PROFILE",(function(data){t.$bus.$emit("ACTIVATE_PROFILE","abc"),t.isProfileVisible=!0})),this.$bus.$on("HDR_CONFIRMCLEAR",(function(data){t.$store.commit("globalData/loansClear")}))},mounted:function(){this.getIntraDay()},methods:{axiosLoadIntraDay:function(){var t=this;localStorage.getItem("token");var e=new FormData;for(e.append("title",JSON.stringify(this.xUID)),e.append("content",JSON.stringify(this.xPWD)),e.append("fromCurrency",this.curr_From),e.append("toCurrency",this.curr_To),e.append("Interval",this.sInterval),e.append("alphakey",this.xAlphaKey);this.results_a.length;)this.results_a.pop();Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:m.a.post(t.xAxios+"xSector",e).then((function(e){var r=JSON.stringify(e);if(r=t.cleanString(r,92),r=t.cleanString(r,34),1==(r=t.cleanString(r,39)).includes("status:true",1)){for(;t.results_a.length;)t.results_a.pop();for(;t.results_b.length;)t.results_b.pop();for(;t.results_c.length;)t.results_c.pop();t.chartShow=0,t.beginZero=!0;var o,l,n,c,d=r.split("},"),h=d[0].split(":{")[3].split(","),m=h[0].split(":"),v=h[1].split(":");o="Meta Data",c=m[0],n=m[1],o="",c=v[0],n=v[1]+":"+v[2]+":"+v[3];for(var _=d.length,i=1;i<_;i++)if(i>=1){h=d[i].split(",");for(var x=0;x<h.length;x++)m=h[x].split(":"),0==x&&(l=m[0],o=m[0]+":"+m[1],c=m[2].substring(1),n=(n=m[3]).replace("}","")),x>0&&(o="",c=m[0],n=(n=(n=m[1]).replace("}","")).replace("}","")),"Rank A"==l&&t.results_a.push({section:o,category:c,value:n}),"Rank B"==l&&t.results_b.push({section:o,category:c,value:n}),"Rank C"==l&&t.results_c.push({section:o,category:c,value:n}),"Rank D"==l&&t.results_d.push({section:o,category:c,value:n}),"Rank E"==l&&t.results_e.push({section:o,category:c,value:n}),"Rank F"==l&&t.results_f.push({section:o,category:c,value:n}),"Rank G"==l&&t.results_g.push({section:o,category:c,value:n}),"Rank H"==l&&t.results_h.push({section:o,category:c,value:n}),"Rank I"==l&&t.results_i.push({section:o,category:c,value:n}),"Rank J"==l&&t.results_j.push({section:o,category:c,value:n})}}else f.a.fire({title:'<font face="verdana" color="red">Invalid Request</font>',html:'<font face="verdana" color="black">Invalid request or limit of 5 requests per minute has been exceeded.</font>',type:"warning",confirmButtonColor:"#3085d6",confirmButtonText:"OK"})}));case 1:case"end":return r.stop()}}),r)})))(),this.componentKey=1,this.$bus.$emit("UPDATE_LINECHART_LABELS",this.ts_labels),this.$bus.$emit("UPDATE_LINECHART_DATA",this.ts_open)},getTokenValue:function(t,e,r){if(0!=t.includes(e)){for(var o=t.indexOf(e),l=e.length+1,n=t.substring(o+l),c="",d=n.length,h=0;h<d;h++){if(n[h]==String.fromCharCode(44))return c;if(n[h]==String.fromCharCode(124))return c;c+=n[h]}return c}},getIntraDay:function(){this.axiosLoadIntraDay()},loadCharts:function(){var t,e,r=this.ts_results.length,o=0,i=0;if(t=this.chartBeg,e=this.chartEnd,null!=t&&null!=e){t<1&&(t=1),e<1&&(e=r),e>r&&(e=r),t>e&&(t=e);var l=this.ts_results.length;if(null!=l&&0!=l){for(var n=l-t;this.ts_labels.length;)this.ts_labels.pop(),this.ts_open.pop(),this.ts_high.pop(),this.ts_low.pop(),this.ts_close.pop();for(i=t;i<e+1;i++){if(this.ts_labels[o]=i,this.ts_open[o]=this.ts_results[n].open,this.ts_high[o]=this.ts_results[n].high,this.ts_low[o]=this.ts_results[n].low,this.ts_close[o]=this.ts_results[n].close,i>=e)return;n--,o++}}}},showChart:function(){this.chartShow=1,this.beginZero=!1,this.ts_high[0]=this.ts_results[0].high,this.ts_high[1]=this.ts_results[1].high},close:function(){alert("close This:")},cleanString:function(t,e){for(var source=t,r="",i=0;i<t.length;i++)source.charCodeAt(i)!==e&&(r+=t[i]);return r},exportTableToExcel:function(t){var e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",o="application/vnd.ms-excel",l=document.getElementById(t),n=l.outerHTML.replace(/ /g,"%20");if(r=r?r+".xls":"excel_data.xls",e=document.createElement("a"),document.body.appendChild(e),navigator.msSaveOrOpenBlob){var c=new Blob(["\ufeff",n],{type:o});navigator.msSaveOrOpenBlob(c,r)}else e.href="data:"+o+", "+n,e.download=r,e.click()},showLogin:function(){this.$bus.$emit("ACTIVATE_LOGIN","abc"),this.isLoginVisible=!0},showProfile:function(){this.$bus.$emit("ACTIVATE_PROFILE","abc"),this.isProfileVisible=!0},showRegister:function(){this.$bus.$emit("ACTIVATE_REGISTER","abc"),this.isRegisterVisible=!0},closeLogin:function(){this.isLoginVisible=!1},closeProfile:function(){this.isProfileVisible=!1},closeRegister:function(){this.isRegisterVisible=!1},showLoanPmts:function(){this.$bus.$emit("ACTIVATE_LOANPMTS","abc"),this.isLoanPmtsVisible=!0},guestLogin:function(){this.$store.commit("globalData/setUID","guest"),this.$store.commit("globalData/setPWD","guest"),this.$store.commit("globalData/setEmail","guest@guest.com"),this.$store.commit("globalData/setLoginStatus",1),this.$bus.$emit("UPDATE_PROFILE","guest","guest","guest@guest.com","Demo"),this.$bus.$emit("EXIT_LOGIN","guest","guest")},editData:function(){var t=12;"Monthly"===this.sPmtsPeryear&&(t=12),"Quarterly"===this.sPmtsPeryear&&(t=4),"Annual"===this.sPmtsPeryear&&(t=1),this.sPmts=this.sYears*t}}},y=r(95),T=r(127),w=r.n(T),E=r(193),D=r(383),C=r(531),S=r(365),P=r(367),R=r(528),I=r(542),V=r(535),component=Object(y.a)(x,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"dashboard "},[r("div",{attrs:{align:"center"}},[r("v-layout",{attrs:{"justify-center":""}},[r("h1",{staticClass:"subheading grey--text text-center "},[t._v("Sectors")])]),t._v(" "),r("v-layout",{attrs:{row:"",wrap:"","justify-center":""}},[r("v-flex",[r("v-card",{staticClass:"mx-auto",attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg9:""}},[r("v-tabs",{staticClass:"text-left",attrs:{vertical:"","background-color":"rgb(230,230,235)"}},[r("v-tab",[t._v("Real-Time Performance")]),t._v(" "),r("v-tab",[t._v("1 Day Performance")]),t._v(" "),r("v-tab",[t._v("5 Day Performance")]),t._v(" "),r("v-tab",[t._v("1 Month Performance")]),t._v(" "),r("v-tab",[t._v("3 Month Performance")]),t._v(" "),r("v-tab",[t._v("Year-to-Date Performance")]),t._v(" "),r("v-tab",[t._v("1 Year Performance")]),t._v(" "),r("v-tab",[t._v("3 Year Performance")]),t._v(" "),r("v-tab",[t._v("5 Year Performance")]),t._v(" "),r("v-tab",[t._v("10 Year Performance")]),t._v(" "),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg12:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_1",headers:t.headers,items:t.results_a,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_1","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1),t._v(" "),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg11:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_2",headers:t.headers,items:t.results_b,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_2","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1),t._v(" "),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg11:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_3",headers:t.headers,items:t.results_c,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_3","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1),t._v(" "),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg11:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_4",headers:t.headers,items:t.results_d,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_4","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg11:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_5",headers:t.headers,items:t.results_e,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_5","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg11:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_6",headers:t.headers,items:t.results_f,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_6","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg11:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_7",headers:t.headers,items:t.results_g,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_7","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg11:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_8",headers:t.headers,items:t.results_h,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_8","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{staticClass:"my-1",attrs:{xs9:"",md9:"",lg11:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_9",headers:t.headers,items:t.results_i,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_9","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1),r("v-tab-item",[r("v-card",{attrs:{flat:"",height:"400"}},[r("v-flex",{attrs:{xs9:"",md9:"",lg11:""}},[r("v-data-table",{staticClass:"elevation-1 fixed-header",attrs:{id:"myDataTable_10",headers:t.headers,items:t.results_j,"items-per-page":11,"hide-default-footer":""}})],1),t._v(" "),r("div",{staticStyle:{"padding-top":"10px"}},[r("v-btn",{staticStyle:{width:"200px"},attrs:{color:"primary"},on:{click:function(e){return t.exportTableToExcel("myDataTable_10","sectordata")}}},[t._v("Export to Excel")])],1)],1)],1)],1)],1)],1)],1)],1)],1),t._v(" "),r("v-layout",{attrs:{row:"",wrap:"","justify-center":""}}),t._v(" "),r("loginModal",{directives:[{name:"show",rawName:"v-show",value:t.isLoginVisible,expression:"isLoginVisible"}],on:{close:t.closeLogin}}),t._v(" "),r("profileModal",{directives:[{name:"show",rawName:"v-show",value:t.isProfileVisible,expression:"isProfileVisible"}],on:{close:t.closeProfile}}),t._v(" "),r("registerModal",{directives:[{name:"show",rawName:"v-show",value:t.isRegisterVisible,expression:"isRegisterVisible"}],on:{close:t.closeRegister}})],1)}),[],!1,null,null,null);e.default=component.exports;w()(component,{VBtn:E.a,VCard:D.a,VDataTable:C.a,VFlex:S.a,VLayout:P.a,VTab:R.a,VTabItem:I.a,VTabs:V.a})}}]);