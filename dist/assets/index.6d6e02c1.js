var e=Object.defineProperty,t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,n=Object.prototype.propertyIsEnumerable,s=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,o=(e,o)=>{for(var r in o||(o={}))a.call(o,r)&&s(e,r,o[r]);if(t)for(var r of t(o))n.call(o,r)&&s(e,r,o[r]);return e};import{h as r,N as i,c as l,a as c,H as d,F as m,L as p,d as u,u as _,b as h,e as f,r as g,o as y,f as v,w as E,g as b,i as O,j,k as w,l as L,m as P,n as I,p as A,q as x,s as D,t as R,v as T,x as V,y as k,z as S,A as N,B as U,C as W,D as $,E as M,G as J,I as q,J as z,K as B,M as C,O as K,P as Y,Q as F,R as G,S as H,T as Q,U as X,V as Z,W as ee,X as te,Y as ae,Z as ne,_ as se,$ as oe,a0 as re,a1 as ie,a2 as le,a3 as ce,a4 as de,a5 as me,a6 as pe,a7 as ue,a8 as _e,a9 as he,aa as fe,ab as ge}from"./vendor.12723aba.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const ye={},ve=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`/yubi-form-joy/dist/${e}`)in ye)return;ye[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const n=document.createElement("link");return n.rel=t?"stylesheet":"modulepreload",t||(n.as="script",n.crossOrigin=""),n.href=e,document.head.appendChild(n),t?new Promise(((e,t)=>{n.addEventListener("load",e),n.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},Ee=e=>()=>r(i,null,{default:()=>r(e)}),be=[{path:"/home",name:"home",component:()=>ve((()=>import("./index.f8796975.js")),["assets/index.f8796975.js","assets/index.cccae6f8.css","assets/vendor.12723aba.js"]),meta:{title:"主页",icon:Ee(d)}},{path:"/demo",name:"demo",component:()=>ve((()=>import("./index.0a5be43c.js")),["assets/index.0a5be43c.js","assets/vendor.12723aba.js"]),meta:{title:"DEMO",icon:Ee(d)}},{path:"/schema",name:"表单",redirect:"/schema/op",component:()=>ve((()=>import("./index.1493f638.js")),["assets/index.1493f638.js","assets/vendor.12723aba.js"]),meta:{title:"表单页",icon:Ee(m)},children:[{path:"demo",name:"表单demo",component:()=>ve((()=>import("./index.a8263d96.js")),["assets/index.a8263d96.js","assets/index.4a9bd498.css","assets/index.vue_vue_type_script_setup_true_lang.9c1d4a84.js","assets/vendor.12723aba.js"])},{path:"op",name:"制作表单",component:()=>ve((()=>import("./index.262156ba.js")),["assets/index.262156ba.js","assets/index.34115dca.css","assets/vendor.12723aba.js","assets/index.vue_vue_type_script_setup_true_lang.9c1d4a84.js"])},{path:"manager",name:"表单管理",component:()=>ve((()=>import("./index.0eebcbce.js")),["assets/index.0eebcbce.js","assets/vendor.12723aba.js"])}]},{path:"/login",name:"Login",component:()=>ve((()=>import("./index.034e1272.js")),["assets/index.034e1272.js","assets/index.ba0e0d75.css","assets/index.vue_vue_type_script_setup_true_lang.9c1d4a84.js","assets/vendor.12723aba.js"]),meta:{title:"登录页",icon:Ee(p),isSingle:!0}},{path:"/textAnime",name:"textAnime",component:()=>ve((()=>import("./index.9fbcc1cd.js")),["assets/index.9fbcc1cd.js","assets/index.aa97b11b.css","assets/vendor.12723aba.js"]),meta:{title:"文本动画",icon:Ee(p),isSingle:!0}}],Oe=l({history:c(),routes:be});Oe.beforeEach(((e,t)=>!0));var je=u({__name:"index",setup(e){const t=_();h();const a=f((()=>{var e;return(null==(e=t.currentRoute.value.meta)?void 0:e.isSingle)||!1})),n=be.map((e=>{var t,a;const n={};if(e.children){const t=e.path;Object.assign(n,{children:e.children.map((e=>{var a,n;return o({label:(null==(a=e.meta)?void 0:a.title)||e.name||e.path,key:`${t}/${e.path}`},(null==(n=e.meta)?void 0:n.icon)&&{icon:e.meta.icon})}))})}return Object.assign(n,o({label:(null==(t=e.meta)?void 0:t.title)||e.name||e.path,key:e.path},(null==(a=e.meta)?void 0:a.icon)&&{icon:e.meta.icon})),n})),s=(e,a)=>{t.push(e)};return(e,t)=>{const o=g("router-view"),r=g("n-layout-content"),i=g("n-menu"),l=g("n-layout-sider"),c=g("n-layout"),d=g("n-space");return y(),v(d,{vertical:"",size:"large"},{default:E((()=>[b(c,{"has-sider":"","sider-placement":"right",style:{height:"100vh"}},{default:E((()=>[b(r,null,{default:E((()=>[b(o)])),_:1}),O(a)?j("",!0):(y(),v(l,{key:0,bordered:"","show-trigger":"","collapse-mode":"width","collapsed-width":64,width:180,"native-scrollbar":!1},{default:E((()=>[b(i,{"collapsed-width":64,"collapsed-icon-size":22,options:O(n),"on-update:value":s},null,8,["options"])])),_:1}))])),_:1})])),_:1})}}}),we=u({__name:"App",setup:e=>(w.registerLanguage("json",L),(e,t)=>{const a=g("n-message-provider"),n=g("n-config-provider");return y(),v(n,{"theme-overrides":{common:{fontWeightStrong:"600"}},hljs:O(w)},{default:E((()=>[b(a,null,{default:E((()=>[b(je)])),_:1})])),_:1},8,["hljs"])})});const Le=P({components:[I,A,x,D,R,i,T,V,k,S,N,U,W,$,M,J,q,z,B,C,K,Y,F,G,H,Q,X,Z,ee,te,ae,ne,se,oe,re,ie,le,ce,de,me,pe,ue,_e,he]});if(window.__POWERED_BY_WUJIE__){let e;window.__WUJIE_MOUNT=()=>{e=fe(we),e.use(Oe),e.use(ge,{test:"测试options"}),e.use(Le),e.mount("#app")},window.__WUJIE_UNMOUNT=()=>{e.unmount()}}else{const e=fe(we);e.use(Le),e.use(ge,{test:"测试options"}),e.use(Oe),e.mount("#app")}
