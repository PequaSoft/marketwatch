(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{371:function(t,e,o){"use strict";o.d(e,"a",(function(){return c})),o.d(e,"b",(function(){return f})),o.d(e,"c",(function(){return m}));var n=o(383),r=o(1),c=Object(r.i)("v-card__actions"),l=Object(r.i)("v-card__subtitle"),f=Object(r.i)("v-card__text"),m=Object(r.i)("v-card__title");n.a},412:function(t,e,o){var content=o(524);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(24).default)("54b3e4ba",content,!0,{sourceMap:!1})},523:function(t,e,o){"use strict";var n=o(412);o.n(n).a},524:function(t,e,o){(e=o(23)(!1)).push([t.i,".VuetifyLogo{width:180px;transform:rotateY(560deg);-webkit-animation:turn 3.5s ease-out 1s forwards;animation:turn 3.5s ease-out 1s forwards}@-webkit-keyframes turn{to{transform:rotateY(0deg)}}@keyframes turn{to{transform:rotateY(0deg)}}",""]),t.exports=e},534:function(t,e,o){"use strict";o.r(e);o(523);var n=o(95),r=Object(n.a)({},(function(){var t=this.$createElement;return(this._self._c||t)("img",{staticClass:"VuetifyLogo",attrs:{alt:"Vuetify Logo",src:"PequaSoft.png"}})}),[],!1,null,null,null).exports,c=o(378),l=o(379),f=o(380),m={components:{VuetifyLogo:r,loginModal:c.a,profileModal:l.a,registerModal:f.a},data:function(){return{isLoginVisible:!1,isProfileVisible:!1,isRegisterVisible:!1}},created:function(){var t=this;this.$bus.$on("HDR_LOGIN",(function(data){t.$bus.$emit("ACTIVATE_LOGIN","abc"),t.isLoginVisible=!0})),this.$bus.$on("HDR_REGISTER",(function(data){t.$bus.$emit("ACTIVATE_REGISTER","abc"),t.isRegisterVisible=!0})),this.$bus.$on("HDR_PROFILE",(function(data){t.$bus.$emit("ACTIVATE_PROFILE","abc"),t.isProfileVisible=!0}))},mounted:function(){this.$bus.$emit("LOAD_INITIAL","abc"),setTimeout(this.goIndices,3e3)},methods:{goIndices:function(){this.$router.push("/indices")},showLogin:function(){this.$bus.$emit("ACTIVATE_LOGIN","abc"),this.isLoginVisible=!0},showProfile:function(){this.$bus.$emit("ACTIVATE_PROFILE","abc"),this.isProfileVisible=!0},showRegister:function(){this.$bus.$emit("ACTIVATE_REGISTER","abc"),this.isRegisterVisible=!0},closeLogin:function(){this.isLoginVisible=!1},closeProfile:function(){this.isProfileVisible=!1},closeRegister:function(){this.isRegisterVisible=!1}},metaInfo:{title:"Index",meta:[{vmid:"og:title",property:"og:title",content:"MarketTrackerPro Menu"},{vmid:"og:site_name",property:"og:site_name",content:"MarketTrackerPro"},{vmid:"og:type",property:"og:type",content:"Website"},{vmid:"og:url",property:"og:url",content:"https://markettrackerpro.com"},{vmid:"og:description",property:"og:description",content:"This is where users can view the site"},{name:"twitter:card",content:"summary"},{name:"twitter:site",content:"@pequasoft"},{name:"twitter:title",content:"Menu Page"},{name:"twitter:description",content:"This is where users can view the site."},{name:"twitter:url",content:"https://twitter.com/PequaSoft"},{name:"twitter:domain",content:"PequaSoft"},{itemprop:"name",content:"Menu Page"},{itemprop:"description",content:"This is where users can view the site."},{itemprop:"image",content:"https://pequasoft.com"}]}},d=o(127),v=o.n(d),h=o(193),_=o(383),w=o(371),V=o(365),x=o(367),y=o(369),T=Object(n.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("v-layout",{attrs:{column:"","justify-center":"","align-center":""}},[o("v-flex",{staticClass:"mx-auto",attrs:{xs12:"",sm12:"",md12:"",xl12:""}},[o("v-card",{staticClass:"accent"},[o("v-card-title",{staticClass:"grey--text text--lighten-2 headline"},[o("v-flex",{attrs:{"pa-2":"",md7:"",xl8:""}},[t._v("\n          MarketWatch By PequaSoft\n        ")]),t._v(" "),o("v-flex",{attrs:{"pa-2":"",md5:"",xl4:""}},[o("vuetify-logo")],1)],1),t._v(" "),o("v-card-text",{staticClass:"grey--text text--lighten-2"},[o("p",[t._v("MarketTrackerPro is a financial market data program developed in the Nuxt Vuetify framework.")]),t._v(" "),o("p",[o("br"),t._v(" "),o("br"),t._v(" "),o("br"),t._v(" "),o("br"),t._v(" "),o("br")]),t._v(" "),o("p",[t._v("Thank you for visiting this site look forward to bringing more exciting features in the future.")]),t._v(" "),o("div",{staticClass:"text-xs-right"},[o("em",[o("small",[t._v("— PequaSoft")])])]),t._v(" "),o("hr",{staticClass:"my-3"})]),t._v(" "),o("v-card-actions",[o("v-spacer"),t._v(" "),o("v-btn",{attrs:{color:"primary",nuxt:"",to:"/indices"}},[t._v("Continue")])],1)],1)],1),t._v(" "),o("loginModal",{directives:[{name:"show",rawName:"v-show",value:t.isLoginVisible,expression:"isLoginVisible"}],on:{close:t.closeLogin}}),t._v(" "),o("profileModal",{directives:[{name:"show",rawName:"v-show",value:t.isProfileVisible,expression:"isProfileVisible"}],on:{close:t.closeProfile}}),t._v(" "),o("registerModal",{directives:[{name:"show",rawName:"v-show",value:t.isRegisterVisible,expression:"isRegisterVisible"}],on:{close:t.closeRegister}})],1)}),[],!1,null,null,null);e.default=T.exports;v()(T,{VBtn:h.a,VCard:_.a,VCardActions:w.a,VCardText:w.b,VCardTitle:w.c,VFlex:V.a,VLayout:x.a,VSpacer:y.a})}}]);