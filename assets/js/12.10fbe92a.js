(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{169:function(t,s,e){},339:function(t,s,e){"use strict";var i=e(169);e.n(i).a},416:function(t,s,e){"use strict";e.r(s);var i=e(135),a=e.n(i),n={name:"FixedHeader",data:function(){return{description:"",isPosts:!1}},props:{content:{type:Array,default:function(){return[]}}},computed:{title:function(){var t;switch(this.$route.path.slice(1,6)){case"posts":t=this.$page.title,this.isPosts=!0,this.description=this.$page.lastUpdated?"Last updated at: "+a()(this.$page.lastUpdated).format("LLL"):"";break;case"tags/":t="",this.isPosts=!1,this.description="";break;case"about":t=this.$themeConfig.menus.about||"about",this.isPosts=!1,this.description="";break;default:t=this.$site.title||"Welcome",this.isPosts=!1,this.description=this.$site.description||"Hope to hear from you"}return t}}},o=(e(339),e(3)),r=Object(o.a)(n,function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"content-header index-header"},[e("div",{staticClass:"container fade-scale in"},[e("h1",{staticClass:"title",class:{"post-content-header":t.isPosts},attrs:{id:"conentHeader"}},[t._v(t._s(t.title))]),t._v(" "),e("h5",{staticClass:"subtitle"},[t._v(t._s(t.description))])])])},[],!1,null,"b73434f0",null);s.default=r.exports}}]);