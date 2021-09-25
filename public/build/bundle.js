var app=function(){"use strict";function e(){}const t=e=>e;function n(e){return e()}function r(){return Object.create(null)}function i(e){e.forEach(n)}function o(e){return"function"==typeof e}function a(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function s(t,n,r){t.$$.on_destroy.push(function(t,...n){if(null==t)return e;const r=t.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}(n,r))}function c(e,t,n,r){if(e){const i=l(e,t,n,r);return e[0](i)}}function l(e,t,n,r){return e[1]&&r?function(e,t){for(const n in t)e[n]=t[n];return e}(n.ctx.slice(),e[1](r(t))):n.ctx}function u(e,t,n,r){if(e[2]&&r){const i=e[2](r(n));if(void 0===t.dirty)return i;if("object"==typeof i){const e=[],n=Math.max(t.dirty.length,i.length);for(let r=0;r<n;r+=1)e[r]=t.dirty[r]|i[r];return e}return t.dirty|i}return t.dirty}const d="undefined"!=typeof window;let f=d?()=>window.performance.now():()=>Date.now(),m=d?e=>requestAnimationFrame(e):e;const p=new Set;function h(e){p.forEach(t=>{t.c(e)||(p.delete(t),t.f())}),0!==p.size&&m(h)}function g(e){let t;return 0===p.size&&m(h),{promise:new Promise(n=>{p.add(t={c:e,f:n})}),abort(){p.delete(t)}}}function $(e,t){e.appendChild(t)}function b(e,t,n){e.insertBefore(t,n||null)}function w(e){e.parentNode.removeChild(e)}function y(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function k(e){return document.createElement(e)}function x(e){return document.createTextNode(e)}function v(){return x(" ")}function C(){return x("")}function A(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function z(e,t){t=""+t,e.data!==t&&(e.data=t)}const _=new Set;let j,S=0;function E(e,t,n,r,i,o,a,s=0){const c=16.666/r;let l="{\n";for(let e=0;e<=1;e+=c){const r=t+(n-t)*o(e);l+=100*e+`%{${a(r,1-r)}}\n`}const u=l+`100% {${a(n,1-n)}}\n}`,d=`__svelte_${function(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}(u)}_${s}`,f=e.ownerDocument;_.add(f);const m=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(k("style")).sheet),p=f.__svelte_rules||(f.__svelte_rules={});p[d]||(p[d]=!0,m.insertRule(`@keyframes ${d} ${u}`,m.cssRules.length));const h=e.style.animation||"";return e.style.animation=`${h?h+", ":""}${d} ${r}ms linear ${i}ms 1 both`,S+=1,d}function O(e,t){const n=(e.style.animation||"").split(", "),r=n.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),i=n.length-r.length;i&&(e.style.animation=r.join(", "),S-=i,S||m(()=>{S||(_.forEach(e=>{const t=e.__svelte_stylesheet;let n=t.cssRules.length;for(;n--;)t.deleteRule(n);e.__svelte_rules={}}),_.clear())}))}function M(e){j=e}function L(){if(!j)throw new Error("Function called outside component initialization");return j}function H(e){L().$$.after_update.push(e)}const N=[],R=[],T=[],P=[],G=Promise.resolve();let q=!1;function B(e){T.push(e)}let X=!1;const F=new Set;function I(){if(!X){X=!0;do{for(let e=0;e<N.length;e+=1){const t=N[e];M(t),W(t.$$)}for(N.length=0;R.length;)R.pop()();for(let e=0;e<T.length;e+=1){const t=T[e];F.has(t)||(F.add(t),t())}T.length=0}while(N.length);for(;P.length;)P.pop()();q=!1,X=!1,F.clear()}}function W(e){if(null!==e.fragment){e.update(),i(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(B)}}let D;function J(){return D||(D=Promise.resolve(),D.then(()=>{D=null})),D}function Q(e,t,n){e.dispatchEvent(function(e,t){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!1,!1,t),n}(`${t?"intro":"outro"}${n}`))}const K=new Set;let Y;function U(){Y={r:0,c:[],p:Y}}function Z(){Y.r||i(Y.c),Y=Y.p}function V(e,t){e&&e.i&&(K.delete(e),e.i(t))}function ee(e,t,n,r){if(e&&e.o){if(K.has(e))return;K.add(e),Y.c.push(()=>{K.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}}const te={duration:0};function ne(e,t){const n=t.token={};function r(e,r,i,o){if(t.token!==n)return;t.resolved=o;let a=t.ctx;void 0!==i&&(a=a.slice(),a[i]=o);const s=e&&(t.current=e)(a);let c=!1;t.block&&(t.blocks?t.blocks.forEach((e,n)=>{n!==r&&e&&(U(),ee(e,1,1,()=>{t.blocks[n]=null}),Z())}):t.block.d(1),s.c(),V(s,1),s.m(t.mount(),t.anchor),c=!0),t.block=s,t.blocks&&(t.blocks[r]=s),c&&I()}if((i=e)&&"object"==typeof i&&"function"==typeof i.then){const n=L();if(e.then(e=>{M(n),r(t.then,1,t.value,e),M(null)},e=>{M(n),r(t.catch,2,t.error,e),M(null)}),t.current!==t.pending)return r(t.pending,0),!0}else{if(t.current!==t.then)return r(t.then,1,t.value,e),!0;t.resolved=e}var i}function re(e){e&&e.c()}function ie(e,t,r){const{fragment:a,on_mount:s,on_destroy:c,after_update:l}=e.$$;a&&a.m(t,r),B(()=>{const t=s.map(n).filter(o);c?c.push(...t):i(t),e.$$.on_mount=[]}),l.forEach(B)}function oe(e,t){const n=e.$$;null!==n.fragment&&(i(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function ae(e,t){-1===e.$$.dirty[0]&&(N.push(e),q||(q=!0,G.then(I)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function se(t,n,o,a,s,c,l=[-1]){const u=j;M(t);const d=n.props||{},f=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:s,bound:r(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(u?u.$$.context:[]),callbacks:r(),dirty:l};let m=!1;if(f.ctx=o?o(t,d,(e,n,...r)=>{const i=r.length?r[0]:n;return f.ctx&&s(f.ctx[e],f.ctx[e]=i)&&(f.bound[e]&&f.bound[e](i),m&&ae(t,e)),n}):[],f.update(),m=!0,i(f.before_update),f.fragment=!!a&&a(f.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);f.fragment&&f.fragment.l(e),e.forEach(w)}else f.fragment&&f.fragment.c();n.intro&&V(t.$$.fragment),ie(t,n.target,n.anchor),I()}M(u)}class ce{$destroy(){oe(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}let le=[];fetch("https://codepen.io/collection/XEovPJ/feed/").then(e=>e.text()).then(e=>(new window.DOMParser).parseFromString(e,"text/xml")).then(e=>{e.querySelectorAll("item").forEach(e=>{const t=e.querySelector("description").innerHTML.split("<p>")[3].split("</p>")[0].trim(),n={name:e.querySelector("title").innerHTML,url:e.querySelector("link").innerHTML,image:e.querySelector("link").innerHTML+"/image/thumb.png",description:t.length?t:"A Cool JameScript™ CodePen"};le.push(n)})});const ue=[{id:0,name:"Home",iconClass:"fas fa-home",color:"green",description:'Welcome to JameScript.com, the Code Home, or "Chome" as it were, of me, <a href="https://eljamez.com">James Augustus Hall</a>. I\'m primarily a Front End Engineer and these are my personal projects and experiments. I hope you find something useful, fun, and / or interesing.',technical:'The site you are now viewing is hosted via <a href="https://pages.github.com/">GitHub Pages</a> and build using <a href="https://emotion.sh/">Emotion</a> and <a href="https://svelte.dev/">Svelte</a>, with help from <a href="https://fontawesome.com/">Font Awesome</a> and <a href="https://fonts.google.com/">Google Fonts</a>'},{id:1,name:"CodePen",iconClass:"fab fa-codepen",color:"purple",link:"https://codepen.io/eljamez",projects:le},{id:2,name:"Repos",iconClass:"fab fa-github",color:"blue",link:"https://github.com/eljamez/",projects:async()=>{let e=await fetch("https://api.github.com/users/eljamez/repos");return(await e.json()).reduce((e,t)=>{if(!t.private)return e=[...e,{name:t.name,description:t.description,url:t.homepage||t.html_url,image:t.owner.avatar_url}]},[])}},{id:3,name:"NPM",iconClass:"fab fa-npm",color:"red",link:"https://www.npmjs.com/~eljamez",projects:async()=>{let e=await fetch("https://api.npms.io/v2/search?q=author:eljamez");return(await e.json()).results.reduce((e,t)=>e=[...e,{name:t.package.name,description:t.package.description,url:t.package.links.npm}],[])}}],de=[{name:"eljamez",url:"https://eljamez.com",iconClass:"fas fa-laptop-house"},{name:"twitter",url:"https://twitter.com/eljamez",iconClass:"fab fa-twitter"},{name:"ensly mogul",url:"http://enslymogul.com",iconClass:"fas fa-music"},{name:"soundcloud",url:"https://soundcloud.com/eljamez",iconClass:"fab fa-soundcloud"},{name:"linkedin",url:"https://www.linkedin.com/in/eljamez/",iconClass:"fab fa-linkedin-in"},{name:"spotify",url:"https://open.spotify.com/playlist/4yQ0U5YrMbK2IKqFYT0O0n?si=O3f7zQ1gR5-99SbRLrwNXQ",iconClass:"fab fa-spotify"}],fe=[];function me(t,n=e){let r;const i=[];function o(e){if(a(t,e)&&(t=e,r)){const e=!fe.length;for(let e=0;e<i.length;e+=1){const n=i[e];n[1](),fe.push(n,t)}if(e){for(let e=0;e<fe.length;e+=2)fe[e][0](fe[e+1]);fe.length=0}}}return{set:o,update:function(e){o(e(t))},subscribe:function(a,s=e){const c=[a,s];return i.push(c),1===i.length&&(r=n(o)||e),a(t),()=>{const e=i.indexOf(c);-1!==e&&i.splice(e,1),0===i.length&&(r(),r=null)}}}}const pe={width:"620px",height:{header:"36px"}},he="870px",ge="140px",$e={header:"58px"},be="80px",we={xSmall:"6px",small:"10px",mid:"20px",large:"30px",xLarge:"40px"},ye={yellow:"240, 219, 79",gray:"50, 51, 48",blue:"3, 102, 214",red:"196, 11, 10",green:"71, 139, 66",purple:"174, 99, 228"},ke={yellow:`rgb(${ye.yellow})`,gray:`rgb(${ye.gray})`,blue:`rgb(${ye.blue})`,red:`rgb(${ye.red})`,green:`rgb(${ye.green})`,purple:`rgb(${ye.purple})`},xe="text-shadow: 0 1px 1px "+ke.gray,ve="font-family: 'Staatliches', cursive",Ce="transition: all .2s ease",Ae=me("Home"),ze=me(window.innerWidth<pe.width.split("px")[0]);"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var _e,je,Se=(function(e,t){!function(e){var t=function(){function e(e){this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.before=null}var t=e.prototype;return t.insert=function(e){if(this.ctr%(this.isSpeedy?65e3:1)==0){var t,n=function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t}(this);t=0===this.tags.length?this.before:this.tags[this.tags.length-1].nextSibling,this.container.insertBefore(n,t),this.tags.push(n)}var r=this.tags[this.tags.length-1];if(this.isSpeedy){var i=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(r);try{var o=105===e.charCodeAt(1)&&64===e.charCodeAt(0);i.insertRule(e,o?0:i.cssRules.length)}catch(e){}}else r.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}();function n(e){function t(e,t,r){var i=t.trim().split(p);t=i;var o=i.length,a=e.length;switch(a){case 0:case 1:var s=0;for(e=0===a?"":e[0]+" ";s<o;++s)t[s]=n(e,t[s],r).trim();break;default:var c=s=0;for(t=[];s<o;++s)for(var l=0;l<a;++l)t[c++]=n(e[l]+" ",i[s],r).trim()}return t}function n(e,t,n){var r=t.charCodeAt(0);switch(33>r&&(r=(t=t.trim()).charCodeAt(0)),r){case 38:return t.replace(h,"$1"+e.trim());case 58:return e.trim()+t.replace(h,"$1"+e.trim());default:if(0<1*n&&0<t.indexOf("\f"))return t.replace(h,(58===e.charCodeAt(0)?"":"$1")+e.trim())}return e+t}function r(e,t,n,o){var a=e+";",s=2*t+3*n+4*o;if(944===s){e=a.indexOf(":",9)+1;var c=a.substring(e,a.length-1).trim();return c=a.substring(0,e).trim()+c+";",1===S||2===S&&i(c,1)?"-webkit-"+c+c:c}if(0===S||2===S&&!i(a,1))return a;switch(s){case 1015:return 97===a.charCodeAt(10)?"-webkit-"+a+a:a;case 951:return 116===a.charCodeAt(3)?"-webkit-"+a+a:a;case 963:return 110===a.charCodeAt(5)?"-webkit-"+a+a:a;case 1009:if(100!==a.charCodeAt(4))break;case 969:case 942:return"-webkit-"+a+a;case 978:return"-webkit-"+a+"-moz-"+a+a;case 1019:case 983:return"-webkit-"+a+"-moz-"+a+"-ms-"+a+a;case 883:if(45===a.charCodeAt(8))return"-webkit-"+a+a;if(0<a.indexOf("image-set(",11))return a.replace(A,"$1-webkit-$2")+a;break;case 932:if(45===a.charCodeAt(4))switch(a.charCodeAt(5)){case 103:return"-webkit-box-"+a.replace("-grow","")+"-webkit-"+a+"-ms-"+a.replace("grow","positive")+a;case 115:return"-webkit-"+a+"-ms-"+a.replace("shrink","negative")+a;case 98:return"-webkit-"+a+"-ms-"+a.replace("basis","preferred-size")+a}return"-webkit-"+a+"-ms-"+a+a;case 964:return"-webkit-"+a+"-ms-flex-"+a+a;case 1023:if(99!==a.charCodeAt(8))break;return"-webkit-box-pack"+(c=a.substring(a.indexOf(":",15)).replace("flex-","").replace("space-between","justify"))+"-webkit-"+a+"-ms-flex-pack"+c+a;case 1005:return f.test(a)?a.replace(d,":-webkit-")+a.replace(d,":-moz-")+a:a;case 1e3:switch(t=(c=a.substring(13).trim()).indexOf("-")+1,c.charCodeAt(0)+c.charCodeAt(t)){case 226:c=a.replace(w,"tb");break;case 232:c=a.replace(w,"tb-rl");break;case 220:c=a.replace(w,"lr");break;default:return a}return"-webkit-"+a+"-ms-"+c+a;case 1017:if(-1===a.indexOf("sticky",9))break;case 975:switch(t=(a=e).length-10,s=(c=(33===a.charCodeAt(t)?a.substring(0,t):a).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|c.charCodeAt(7))){case 203:if(111>c.charCodeAt(8))break;case 115:a=a.replace(c,"-webkit-"+c)+";"+a;break;case 207:case 102:a=a.replace(c,"-webkit-"+(102<s?"inline-":"")+"box")+";"+a.replace(c,"-webkit-"+c)+";"+a.replace(c,"-ms-"+c+"box")+";"+a}return a+";";case 938:if(45===a.charCodeAt(5))switch(a.charCodeAt(6)){case 105:return c=a.replace("-items",""),"-webkit-"+a+"-webkit-box-"+c+"-ms-flex-"+c+a;case 115:return"-webkit-"+a+"-ms-flex-item-"+a.replace(x,"")+a;default:return"-webkit-"+a+"-ms-flex-line-pack"+a.replace("align-content","").replace(x,"")+a}break;case 973:case 989:if(45!==a.charCodeAt(3)||122===a.charCodeAt(4))break;case 931:case 953:if(!0===C.test(e))return 115===(c=e.substring(e.indexOf(":")+1)).charCodeAt(0)?r(e.replace("stretch","fill-available"),t,n,o).replace(":fill-available",":stretch"):a.replace(c,"-webkit-"+c)+a.replace(c,"-moz-"+c.replace("fill-",""))+a;break;case 962:if(a="-webkit-"+a+(102===a.charCodeAt(5)?"-ms-"+a:"")+a,211===n+o&&105===a.charCodeAt(13)&&0<a.indexOf("transform",10))return a.substring(0,a.indexOf(";",27)+1).replace(m,"$1-webkit-$2")+a}return a}function i(e,t){var n=e.indexOf(1===t?":":"{"),r=e.substring(0,3!==t?n:10);return n=e.substring(n+1,e.length-1),L(2!==t?r:r.replace(v,"$1"),n,t)}function o(e,t){var n=r(t,t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2));return n!==t+";"?n.replace(k," or ($1)").substring(4):"("+t+")"}function a(e,t,n,r,i,o,a,s,l,u){for(var d,f=0,m=t;f<M;++f)switch(d=O[f].call(c,e,m,n,r,i,o,a,s,l,u)){case void 0:case!1:case!0:case null:break;default:m=d}if(m!==t)return m}function s(e){return void 0!==(e=e.prefix)&&(L=null,e?"function"!=typeof e?S=1:(S=2,L=e):S=0),s}function c(e,n){var s=e;if(33>s.charCodeAt(0)&&(s=s.trim()),s=[s],0<M){var c=a(-1,n,s,s,_,z,0,0,0,0);void 0!==c&&"string"==typeof c&&(n=c)}var d=function e(n,s,c,d,f){for(var m,p,h,w,k,x=0,v=0,C=0,A=0,O=0,L=0,N=h=m=0,R=0,T=0,P=0,G=0,q=c.length,B=q-1,X="",F="",I="",W="";R<q;){if(p=c.charCodeAt(R),R===B&&0!==v+A+C+x&&(0!==v&&(p=47===v?10:47),A=C=x=0,q++,B++),0===v+A+C+x){if(R===B&&(0<T&&(X=X.replace(u,"")),0<X.trim().length)){switch(p){case 32:case 9:case 59:case 13:case 10:break;default:X+=c.charAt(R)}p=59}switch(p){case 123:for(m=(X=X.trim()).charCodeAt(0),h=1,G=++R;R<q;){switch(p=c.charCodeAt(R)){case 123:h++;break;case 125:h--;break;case 47:switch(p=c.charCodeAt(R+1)){case 42:case 47:e:{for(N=R+1;N<B;++N)switch(c.charCodeAt(N)){case 47:if(42===p&&42===c.charCodeAt(N-1)&&R+2!==N){R=N+1;break e}break;case 10:if(47===p){R=N+1;break e}}R=N}}break;case 91:p++;case 40:p++;case 34:case 39:for(;R++<B&&c.charCodeAt(R)!==p;);}if(0===h)break;R++}switch(h=c.substring(G,R),0===m&&(m=(X=X.replace(l,"").trim()).charCodeAt(0)),m){case 64:switch(0<T&&(X=X.replace(u,"")),p=X.charCodeAt(1)){case 100:case 109:case 115:case 45:T=s;break;default:T=E}if(G=(h=e(s,T,h,p,f+1)).length,0<M&&(k=a(3,h,T=t(E,X,P),s,_,z,G,p,f,d),X=T.join(""),void 0!==k&&0===(G=(h=k.trim()).length)&&(p=0,h="")),0<G)switch(p){case 115:X=X.replace(y,o);case 100:case 109:case 45:h=X+"{"+h+"}";break;case 107:h=(X=X.replace(g,"$1 $2"))+"{"+h+"}",h=1===S||2===S&&i("@"+h,3)?"@-webkit-"+h+"@"+h:"@"+h;break;default:h=X+h,112===d&&(F+=h,h="")}else h="";break;default:h=e(s,t(s,X,P),h,d,f+1)}I+=h,h=P=T=N=m=0,X="",p=c.charCodeAt(++R);break;case 125:case 59:if(1<(G=(X=(0<T?X.replace(u,""):X).trim()).length))switch(0===N&&(m=X.charCodeAt(0),45===m||96<m&&123>m)&&(G=(X=X.replace(" ",":")).length),0<M&&void 0!==(k=a(1,X,s,n,_,z,F.length,d,f,d))&&0===(G=(X=k.trim()).length)&&(X="\0\0"),m=X.charCodeAt(0),p=X.charCodeAt(1),m){case 0:break;case 64:if(105===p||99===p){W+=X+c.charAt(R);break}default:58!==X.charCodeAt(G-1)&&(F+=r(X,m,p,X.charCodeAt(2)))}P=T=N=m=0,X="",p=c.charCodeAt(++R)}}switch(p){case 13:case 10:47===v?v=0:0===1+m&&107!==d&&0<X.length&&(T=1,X+="\0"),0<M*H&&a(0,X,s,n,_,z,F.length,d,f,d),z=1,_++;break;case 59:case 125:if(0===v+A+C+x){z++;break}default:switch(z++,w=c.charAt(R),p){case 9:case 32:if(0===A+x+v)switch(O){case 44:case 58:case 9:case 32:w="";break;default:32!==p&&(w=" ")}break;case 0:w="\\0";break;case 12:w="\\f";break;case 11:w="\\v";break;case 38:0===A+v+x&&(T=P=1,w="\f"+w);break;case 108:if(0===A+v+x+j&&0<N)switch(R-N){case 2:112===O&&58===c.charCodeAt(R-3)&&(j=O);case 8:111===L&&(j=L)}break;case 58:0===A+v+x&&(N=R);break;case 44:0===v+C+A+x&&(T=1,w+="\r");break;case 34:case 39:0===v&&(A=A===p?0:0===A?p:A);break;case 91:0===A+v+C&&x++;break;case 93:0===A+v+C&&x--;break;case 41:0===A+v+x&&C--;break;case 40:if(0===A+v+x){if(0===m)switch(2*O+3*L){case 533:break;default:m=1}C++}break;case 64:0===v+C+A+x+N+h&&(h=1);break;case 42:case 47:if(!(0<A+x+C))switch(v){case 0:switch(2*p+3*c.charCodeAt(R+1)){case 235:v=47;break;case 220:G=R,v=42}break;case 42:47===p&&42===O&&G+2!==R&&(33===c.charCodeAt(G+2)&&(F+=c.substring(G,R+1)),w="",v=0)}}0===v&&(X+=w)}L=O,O=p,R++}if(0<(G=F.length)){if(T=s,0<M&&void 0!==(k=a(2,F,T,n,_,z,G,d,f,d))&&0===(F=k).length)return W+F+I;if(F=T.join(",")+"{"+F+"}",0!=S*j){switch(2!==S||i(F,2)||(j=0),j){case 111:F=F.replace(b,":-moz-$1")+F;break;case 112:F=F.replace($,"::-webkit-input-$1")+F.replace($,"::-moz-$1")+F.replace($,":-ms-input-$1")+F}j=0}}return W+F+I}(E,s,n,0,0);return 0<M&&void 0!==(c=a(-2,d,s,s,_,z,d.length,0,0,0))&&(d=c),j=0,z=_=1,d}var l=/^\0+/g,u=/[\0\r\f]/g,d=/: */g,f=/zoo|gra/,m=/([,: ])(transform)/g,p=/,\r+?/g,h=/([\t\r\n ])*\f?&/g,g=/@(k\w+)\s*(\S*)\s*/,$=/::(place)/g,b=/:(read-only)/g,w=/[svh]\w+-[tblr]{2}/,y=/\(\s*(.*)\s*\)/g,k=/([\s\S]*?);/g,x=/-self|flex-/g,v=/[^]*?(:[rp][el]a[\w-]+)[^]*/,C=/stretch|:\s*\w+\-(?:conte|avail)/,A=/([^-])(image-set\()/,z=1,_=1,j=0,S=1,E=[],O=[],M=0,L=null,H=0;return c.use=function e(t){switch(t){case void 0:case null:M=O.length=0;break;default:if("function"==typeof t)O[M++]=t;else if("object"==typeof t)for(var n=0,r=t.length;n<r;++n)e(t[n]);else H=0|!!t}return e},c.set=s,void 0!==e&&s(e),c}function r(e){e&&i.current.insert(e+"}")}var i={current:null},o=function(e,t,n,o,a,s,c,l,u,d){switch(e){case 1:switch(t.charCodeAt(0)){case 64:return i.current.insert(t+";"),"";case 108:if(98===t.charCodeAt(2))return""}break;case 2:if(0===l)return t+"/*|*/";break;case 3:switch(l){case 102:case 112:return i.current.insert(n[0]+t),"";default:return t+(0===d?"/*|*/":"")}case-2:t.split("/*|*/}").forEach(r)}},a={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},s=/[A-Z]|^ms/g,c=/_EMO_([^_]+?)_([^]*?)_EMO_/g,l=function(e){return 45===e.charCodeAt(1)},u=function(e){return null!=e&&"boolean"!=typeof e},d=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return l(e)?e:e.replace(s,"-$&").toLowerCase()}(e)),t[e]}}(),f=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(c,(function(e,t,n){return p={name:t,styles:n,next:p},t}))}return 1===a[e]||l(e)||"number"!=typeof t||0===t?t:t+"px"};function m(e,t,n,r){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return p={name:n.name,styles:n.styles,next:p},n.name;if(void 0!==n.styles){var i=n.next;if(void 0!==i)for(;void 0!==i;)p={name:i.name,styles:i.styles,next:p},i=i.next;return n.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var i=0;i<n.length;i++)r+=m(e,t,n[i],!1);else for(var o in n){var a=n[o];if("object"!=typeof a)null!=t&&void 0!==t[a]?r+=o+"{"+t[a]+"}":u(a)&&(r+=d(o)+":"+f(o,a)+";");else if(!Array.isArray(a)||"string"!=typeof a[0]||null!=t&&void 0!==t[a[0]]){var s=m(e,t,a,!1);switch(o){case"animation":case"animationName":r+=d(o)+":"+s+";";break;default:r+=o+"{"+s+"}"}}else for(var c=0;c<a.length;c++)u(a[c])&&(r+=d(o)+":"+f(o,a[c])+";")}return r}(e,t,n);case"function":if(void 0!==e){var o=p,a=n(e);return p=o,m(e,t,a,r)}}if(null==t)return n;var s=t[n];return void 0===s||r?n:s}var p,h=/label:\s*([^\s;\n{]+)\s*;/g,g=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var r=!0,i="";p=void 0;var o=e[0];null==o||void 0===o.raw?(r=!1,i+=m(n,t,o,!1)):i+=o[0];for(var a=1;a<e.length;a++)i+=m(n,t,e[a],46===i.charCodeAt(i.length-1)),r&&(i+=o[a]);h.lastIndex=0;for(var s,c="";null!==(s=h.exec(i));)c+="-"+s[1];return{name:function(e){for(var t,n=e.length,r=n^n,i=0;n>=4;)t=1540483477*(65535&(t=255&e.charCodeAt(i)|(255&e.charCodeAt(++i))<<8|(255&e.charCodeAt(++i))<<16|(255&e.charCodeAt(++i))<<24))+((1540483477*(t>>>16)&65535)<<16),r=1540483477*(65535&r)+((1540483477*(r>>>16)&65535)<<16)^(t=1540483477*(65535&(t^=t>>>24))+((1540483477*(t>>>16)&65535)<<16)),n-=4,++i;switch(n){case 3:r^=(255&e.charCodeAt(i+2))<<16;case 2:r^=(255&e.charCodeAt(i+1))<<8;case 1:r=1540483477*(65535&(r^=255&e.charCodeAt(i)))+((1540483477*(r>>>16)&65535)<<16)}return r=1540483477*(65535&(r^=r>>>13))+((1540483477*(r>>>16)&65535)<<16),((r^=r>>>15)>>>0).toString(36)}(i)+c,styles:i,next:p}};function $(e,t,n){var r="";return n.split(" ").forEach((function(n){void 0!==e[n]?t.push(e[n]):r+=n+" "})),r}function b(e,t){if(void 0===e.inserted[t.name])return e.insert("",t,e.sheet,!0)}function w(e,t,n){var r=[],i=$(e,r,n);return r.length<2?n:i+t(r)}var y=function e(t){for(var n="",r=0;r<t.length;r++){var i=t[r];if(null!=i){var o=void 0;switch(typeof i){case"boolean":break;case"object":if(Array.isArray(i))o=e(i);else for(var a in o="",i)i[a]&&a&&(o&&(o+=" "),o+=a);break;default:o=i}o&&(n&&(n+=" "),n+=o)}}return n},k=function(e){var r=function(e){void 0===e&&(e={});var r,a=e.key||"css";void 0!==e.prefix&&(r={prefix:e.prefix});var s,c=new n(r),l={};s=e.container||document.head;var u,d=document.querySelectorAll("style[data-emotion-"+a+"]");Array.prototype.forEach.call(d,(function(e){e.getAttribute("data-emotion-"+a).split(" ").forEach((function(e){l[e]=!0})),e.parentNode!==s&&s.appendChild(e)})),c.use(e.stylisPlugins)(o),u=function(e,t,n,r){var o=t.name;i.current=n,c(e,t.styles),r&&(f.inserted[o]=!0)};var f={key:a,sheet:new t({key:a,container:s,nonce:e.nonce,speedy:e.speedy}),nonce:e.nonce,inserted:l,registered:{},insert:u};return f}(void 0);r.sheet.speedy=function(e){this.isSpeedy=e},r.compat=!0;var a=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var i=g(t,r.registered,void 0);return function(e,t,n){var r=e.key+"-"+t.name;if(void 0===e.registered[r]&&(e.registered[r]=t.styles),void 0===e.inserted[t.name]){var i=t;do{e.insert("."+r,i,e.sheet,!0),i=i.next}while(void 0!==i)}}(r,i),r.key+"-"+i.name};return{css:a,cx:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return w(r.registered,a,y(t))},injectGlobal:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var i=g(t,r.registered);b(r,i)},keyframes:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var i=g(t,r.registered),o="animation-"+i.name;return b(r,{name:i.name,styles:"@keyframes "+o+"{"+i.styles+"}"}),o},hydrate:function(e){e.forEach((function(e){r.inserted[e]=!0}))},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:$.bind(null,r.registered),merge:w.bind(null,r.registered,a)}}(),x=k.flush,v=k.hydrate,C=k.cx,A=k.merge,z=k.getRegisteredStyles,_=k.injectGlobal,j=k.keyframes,S=k.css,E=k.sheet,O=k.cache;e.cache=O,e.css=S,e.cx=C,e.flush=x,e.getRegisteredStyles=z,e.hydrate=v,e.injectGlobal=_,e.keyframes=j,e.merge=A,e.sheet=E,Object.defineProperty(e,"__esModule",{value:!0})}(t)}(_e={exports:{}},_e.exports),_e.exports),Ee=(je=Se)&&je.__esModule&&Object.prototype.hasOwnProperty.call(je,"default")?je.default:je;const{css:Oe}=Ee,Me={container:Oe`
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;

    @media (min-width: ${pe.width}) {
      display: grid;
      grid-template-columns: ${ge} auto;
      grid-template-rows: 100vh;
      justify-items: stretch;
    }

    @media (min-width: ${he}) {
      grid-template-columns: ${"200px"} auto;
    }
  `};function Le(e){let t,n;const r=e[2].default,i=c(r,e,e[1],null),o=i||function(e){let t;return{c(){t=k("em"),t.textContent="Missing Content"},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}();return{c(){t=k("div"),o&&o.c(),A(t,"class",e[0])},m(e,r){b(e,t,r),o&&o.m(t,null),n=!0},p(e,[t]){i&&i.p&&2&t&&i.p(l(r,e,e[1],null),u(r,e[1],t,null))},i(e){n||(V(o,e),n=!0)},o(e){ee(o,e),n=!1},d(e){e&&w(t),o&&o.d(e)}}}function He(e,t,n){const{container:r}=Me;let{$$slots:i={},$$scope:o}=t;return e.$set=e=>{"$$scope"in e&&n(1,o=e.$$scope)},[r,o,i]}class Ne extends ce{constructor(e){super(),se(this,e,He,Le,a,{})}}const{css:Re}=Ee,Te={sidebar:Re`
    ${Ce};
    box-sizing: border-box;
    background-image: url("../../public/bg.png");
    text-shadow: 0px 0px 2px black;
    font-size: 0.8rem;
    padding-top: ${pe.height.header};

    @media (min-width: ${pe.width}) {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
      padding-top: ${$e.header};
    }

    @media (min-width: ${he}) {
      padding-top: ${be};
    }
  `};function Pe(e){let t,n,r;const i=e[2].default,o=c(i,e,e[1],null),a=o||function(e){let t;return{c(){t=k("em"),t.textContent="missing content"},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}();return{c(){t=k("aside"),a&&a.c(),A(t,"class",n=Te.sidebar)},m(e,n){b(e,t,n),a&&a.m(t,null),r=!0},p(e,[t]){o&&o.p&&2&t&&o.p(l(i,e,e[1],null),u(i,e[1],t,null))},i(e){r||(V(a,e),r=!0)},o(e){ee(a,e),r=!1},d(e){e&&w(t),a&&a.d(e)}}}function Ge(e,t,n){const{container:r}=Te;let{$$slots:i={},$$scope:o}=t;return e.$set=e=>{"$$scope"in e&&n(1,o=e.$$scope)},[r,o,i]}class qe extends ce{constructor(e){super(),se(this,e,Ge,Pe,a,{})}}const{css:Be}=Ee,Xe={title:Be`
    box-sizing: border-box;
    position: absolute;
    padding: ${we.small} ${we.large};
    z-index: 11;
    width: 100vw;

    h1 {
      ${ve};
      ${xe};
      ${Ce};
      text-transform: uppercase;
      font-size: 2rem;
      margin: 0;
      text-align: center;
      color: ${ke.yellow};
    }

    @media (min-width: ${pe.width}) {
      h1 {
        text-align: left;
        font-size: 3rem;
      }
    }
    @media (min-width: ${he}) {
      h1 {
        font-size: 4rem;
      }
    }
  `};function Fe(t){let n,r,i;return{c(){n=k("div"),r=k("h1"),r.textContent="JameScript.com",A(n,"class",i=Xe.title)},m(e,t){b(e,n,t),$(n,r)},p:e,i:e,o:e,d(e){e&&w(n)}}}class Ie extends ce{constructor(e){super(),se(this,e,null,Fe,a,{})}}const{css:We}=Ee,De=We`
    border: 0px;
    cursor: pointer;
    text-align: center;
    color: ${ke.yellow};
    width: 25%;
    padding: ${we.small} ${we.large};
    background: transparent;
    margin: 0;
    transition: all 0.2s ease;

    span {
      display: none;
    }

    i {
      font-size: 1.5rem;
      transform-origin: center;
      transition: all 0.4s ease;
    }

    @media (min-width: ${pe.width}) {
      width: 100%;
      i {
        font-size: 2.5rem;
      }
    }

    @media (min-width: ${he}) {
      text-align: right;
      span {
        display: inline-block;
        font-size: 1.3rem;
        transform-origin: right;
        transform: scaleX(0);
        transition: all 0.4s ease;
        overflow: hidden;
        padding-right: ${we.xsmall};
        line-height: 2.1rem;
      }
    }
  `,Je=We`
    &:hover {
      i {
        transform: scale(1.2);
      }

      @media (min-width: ${pe.width}) {
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }

      @media (min-width: ${he}) {
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
    }
  `,Qe=We`
     {
      ${xe};
      color: white;
      i {
        transform: scale(1.2);
      }

      @media (min-width: ${pe.width}) {
        transform: translateX(${we.xLarge});
        width: 80%;
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
      @media (min-width: ${he}) {
        transform: translateX(${we.large});
        width: 100%;
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
    }
  `;function Ke(t){let n,r,i,a,s,c,l,u,d,f=t[0].name+"";return{c(){n=k("button"),r=k("span"),i=x(f),a=v(),s=k("i"),A(s,"class",c="fab "+t[0].iconClass),A(n,"class",l=t[3]`
    ${De};
    ${t[2]?Qe:Je};
    background-color: ${t[2]&&ke[t[0].color]};
    color: ${ke[t[0].color]};`),A(n,"data-name",u=t[0].name)},m(e,c,l){var u,f,m,p;b(e,n,c),$(n,r),$(r,i),$(n,a),$(n,s),l&&d(),f="click",m=function(){o(t[1])&&t[1].apply(this,arguments)},(u=n).addEventListener(f,m,p),d=()=>u.removeEventListener(f,m,p)},p(e,[r]){t=e,1&r&&f!==(f=t[0].name+"")&&z(i,f),1&r&&c!==(c="fab "+t[0].iconClass)&&A(s,"class",c),5&r&&l!==(l=t[3]`
    ${De};
    ${t[2]?Qe:Je};
    background-color: ${t[2]&&ke[t[0].color]};
    color: ${ke[t[0].color]};`)&&A(n,"class",l),1&r&&u!==(u=t[0].name)&&A(n,"data-name",u)},i:e,o:e,d(e){e&&w(n),d()}}}function Ye(e,t,n){let r;s(e,Ae,e=>n(4,r=e));let{section:i}=t,{handleButtonClick:o}=t;const{css:a}=Ee;let c;return H(()=>{n(2,c=i.name===r)}),e.$set=e=>{"section"in e&&n(0,i=e.section),"handleButtonClick"in e&&n(1,o=e.handleButtonClick)},[i,o,c,a]}class Ue extends ce{constructor(e){super(),se(this,e,Ye,Ke,a,{section:0,handleButtonClick:1})}}const{css:Ze}=Ee,Ve={nav:Ze`
    padding-top: ${we.mid};
  `};function et(e){let t,n,r;const i=e[2].default,o=c(i,e,e[1],null),a=o||function(e){let t;return{c(){t=k("em"),t.textContent="missing content"},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}();return{c(){t=k("nav"),a&&a.c(),A(t,"class",n=Ve.nav)},m(e,n){b(e,t,n),a&&a.m(t,null),r=!0},p(e,[t]){o&&o.p&&2&t&&o.p(l(i,e,e[1],null),u(i,e[1],t,null))},i(e){r||(V(a,e),r=!0)},o(e){ee(a,e),r=!1},d(e){e&&w(t),a&&a.d(e)}}}function tt(e,t,n){const{container:r}=Ve;let{$$slots:i={},$$scope:o}=t;return e.$set=e=>{"$$scope"in e&&n(1,o=e.$$scope)},[r,o,i]}class nt extends ce{constructor(e){super(),se(this,e,tt,et,a,{})}}const{css:rt}=Ee,it={links:rt`
    ${xe};
    padding: ${we.small} 0 ${we.small};
    text-align: center;

    h2 {
      ${ve};
      font-size: 1.8rem;
      margin: 0;
    }

    ul {
      list-style: none;
      padding: ${we.xSmall} 0 0;

      li {
        font-size: 0.9rem;
        a {
          ${Ce};
          display: block;
          padding: ${we.xSmall} 0 0;
          line-height: 1.4rem;
        }
        a:hover {
          color: white;
          transform: translateX(-${we.xSmall});
        }
        i {
          margin-left: 0.6rem;
        }
      }
    }
    p {
      line-height: 1.2rem;
    }

    @media (min-width: ${pe.width}) {
      padding: ${we.mid};
      text-align: right;
      ul {
        li {
          font-size: 0.8rem;
          i {
            margin-left: 0.2rem;
            font-size: 0.6rem;
          }
        }
      }
    }

    @media (min-width: ${he}) {
      padding: ${we.large};
    }
  `};function ot(e,t,n){const r=e.slice();return r[1]=t[n],r}function at(t){let n,r,i,o,a,s,c,l,u=t[1].name+"";return{c(){n=k("li"),r=k("a"),i=x(u),o=v(),a=k("i"),l=v(),A(a,"class",s=t[1].iconClass),A(r,"href",c=t[1].url)},m(e,t){b(e,n,t),$(n,r),$(r,i),$(r,o),$(r,a),$(n,l)},p:e,d(e){e&&w(n)}}}function st(t){let n,r,i,o,a,s=de,c=[];for(let e=0;e<s.length;e+=1)c[e]=at(ot(t,s,e));return{c(){n=k("div"),r=k("h2"),r.textContent=""+ct,i=v(),o=k("ul");for(let e=0;e<c.length;e+=1)c[e].c();A(n,"class",a=it.links)},m(e,t){b(e,n,t),$(n,r),$(n,i),$(n,o);for(let e=0;e<c.length;e+=1)c[e].m(o,null)},p(e,[t]){if(0&t){let n;for(s=de,n=0;n<s.length;n+=1){const r=ot(e,s,n);c[n]?c[n].p(r,t):(c[n]=at(r),c[n].c(),c[n].m(o,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=s.length}},i:e,o:e,d(e){e&&w(n),y(c,e)}}}const ct="Links";function lt(e){return[]}class ut extends ce{constructor(e){super(),se(this,e,lt,st,a,{})}}const{css:dt}=Ee;dt`
    padding: ${we.large};
    ${xe};
    h2 {
      font-size: 1.8rem;
      text-align: right;
      ${ve};
    }
    p {
      line-height: 1.2rem;
    }
  `;function ft(e){const t=e-1;return t*t*t+1}function mt(e){return--e*e*e*e*e+1}function pt(e,{delay:t=0,duration:n=400,easing:r=ft,x:i=0,y:o=0,opacity:a=0}){const s=getComputedStyle(e),c=+s.opacity,l="none"===s.transform?"":s.transform,u=c*(1-a);return{delay:t,duration:n,easing:r,css:(e,t)=>`\n\t\t\ttransform: ${l} translate(${(1-e)*i}px, ${(1-e)*o}px);\n\t\t\topacity: ${c-u*t}`}}const{css:ht}=Ee,gt=ht`
    ${Ce};
    box-sizing: border-box;
    padding-top: ${we.small};

    @media (min-width: ${pe.width}) {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
      justify-self: stretch;
      padding-top: ${$e.header};
      overflow-y: scroll;
      position: relative;
    }

    @media (min-width: ${he}) {
      padding-top: ${be};
    }
  `,{css:$t}=Ee,bt={project:$t`
    display: grid;
    grid-template-columns: 50px 1fr;
    box-sizing: border-box;
    border-radius: 5px;
    margin: ${we.large} 0;
    width: 100%;
    overflow: hidden;
    background-position: center;
    background-size: cover;

    h3 {
      margin: 0 0 ${we.xSmall};
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: bold;
      i {
        margin-right: ${we.xSmall};
      }
    }

    p {
      a {
        font-size: 0.8rem;
        font-weight: bold;
      }

      i {
        display: none;
      }
    }

    p:first-of-type {
      margin-top: 0px;
    }

    p:last-of-type {
      margin-bottom: 0px;
    }

    @media (min-width: ${pe.width}) {
      background-image: none !important;
      background-color: rgba(0, 0, 0, 0.5);
      grid-template-columns: 100px 1fr;
      gap: ${we.mid};
      padding: ${we.mid};
      margin: 0 0 ${we.large};

      h3 {
        margin-top: 0;
        font-size: 1.6rem;
      }
    }

    @media (min-width: ${he}) {
      p {
        i {
          display: inline-block;
          margin-right: ${we.xSmall};
        }
      }
    }
  `,imageHolder:$t`
    display: none;
    border-radius: 5px;
    background-size: cover;
    background-position: 50%;
    height: 50px;
    width: 0px;
    grid-column: 1 / span 0;

    @media (min-width: ${pe.width}) {
      display: block;
      height: 100px;
      width: 100px;
      grid-column: 1 / span 1;
    }
  `,contentHolder:$t`
    grid-column: 1 / -1;
    background-color: rgba(0, 0, 0, 0.5);
    padding: ${we.small};

    @media (min-width: ${pe.width}) {
      grid-column: 2 / -1;
      background-color: transparent;
      padding: 0;
    }
  `};function wt(e){let t,n,r=e[0].name+"";return{c(){t=k("h3"),n=x(r)},m(e,r){b(e,t,r),$(t,n)},p(e,t){1&t&&r!==(r=e[0].name+"")&&z(n,r)},d(e){e&&w(t)}}}function yt(e){let t,n,r,i,o=e[0].url+"";return{c(){t=k("p"),n=k("a"),r=x(o),A(n,"href",i=e[0].url)},m(e,i){b(e,t,i),$(t,n),$(n,r)},p(e,t){1&t&&o!==(o=e[0].url+"")&&z(r,o),1&t&&i!==(i=e[0].url)&&A(n,"href",i)},d(e){e&&w(t)}}}function kt(e){let t,n,r=e[0].description+"";return{c(){t=k("p"),n=x(r)},m(e,r){b(e,t,r),$(t,n)},p(e,t){1&t&&r!==(r=e[0].description+"")&&z(n,r)},d(e){e&&w(t)}}}function xt(t){let n,r,i,o,a,s,c,l,u,d,f,m=t[0].name&&wt(t),p=t[0].url&&yt(t),h=t[0].description&&kt(t);return{c(){n=k("div"),r=k("div"),a=v(),s=k("div"),m&&m.c(),c=v(),p&&p.c(),l=v(),h&&h.c(),A(r,"class",i=bt.imageHolder),A(r,"style",o=`background-image: url(${t[1]})`),A(s,"class",u=bt.contentHolder),A(n,"class",d=bt.project),A(n,"style",f=`background-image: url(${t[1]})`)},m(e,t){b(e,n,t),$(n,r),$(n,a),$(n,s),m&&m.m(s,null),$(s,c),p&&p.m(s,null),$(s,l),h&&h.m(s,null)},p(e,[t]){e[0].name?m?m.p(e,t):(m=wt(e),m.c(),m.m(s,c)):m&&(m.d(1),m=null),e[0].url?p?p.p(e,t):(p=yt(e),p.c(),p.m(s,l)):p&&(p.d(1),p=null),e[0].description?h?h.p(e,t):(h=kt(e),h.c(),h.m(s,null)):h&&(h.d(1),h=null)},i:e,o:e,d(e){e&&w(n),m&&m.d(),p&&p.d(),h&&h.d()}}}function vt(e,t,n){let{project:r}=t;const i=r.image?r.image:"public/avatar.png";return e.$set=e=>{"project"in e&&n(0,r=e.project)},[r,i]}class Ct extends ce{constructor(e){super(),se(this,e,vt,xt,a,{project:0})}}const{css:At}=Ee,zt={section:At`
    box-sizing: border-box;
    padding: ${we.mid};

    h2 {
      ${ve};
      ${xe};
      margin: 0;
      font-size: 1.6rem;
      text-align: center;
      padding-bottom: 0;
      text-transform: uppercase;
    }

    @media (min-width: ${pe.width}) {
      padding: ${we.mid} ${we.large};
      position: absolute;
      justify-self: stretch;
      min-width: 100%;

      h2 {
        text-align: left;
        font-size: 1.8rem;
      }
    }

    @media (min-width: ${he}) {
      h2 {
        display: none;
      }
    }
  `,description:At`
    text-indent: ${we.mid};
    margin: ${we.mid} 0;
    line-height: 1.6rem;

    &::first-letter {
      font-size: 2rem;
    }

    @media (min-width: ${pe.width}) {
      width: 80%;
    }
  `,link:At`
    ${xe};
    font-size: 1.2rem;
    text-align: center;
    margin: 0;

    @media (min-width: ${pe.width}) {
      text-align: left;
      padding-bottom: ${we.mid};
    }

    @media (min-width: ${he}) {
      margin-bottom: ${we.mid};
      font-size: 2rem;
    }
  `};function _t(e,t,n){const r=e.slice();return r[7]=t[n],r}function jt(e){let t,n,r=e[0].name+"";return{c(){t=k("h2"),n=x(r)},m(e,r){b(e,t,r),$(t,n)},p(e,t){1&t&&r!==(r=e[0].name+"")&&z(n,r)},d(e){e&&w(t)}}}function St(e){let t,n,r,i,o,a=e[0].link+"";return{c(){t=k("p"),n=k("a"),r=x(a),A(n,"href",i=e[0].link),A(t,"class",o=zt.link)},m(e,i){b(e,t,i),$(t,n),$(n,r)},p(e,t){1&t&&a!==(a=e[0].link+"")&&z(r,a),1&t&&i!==(i=e[0].link)&&A(n,"href",i)},d(e){e&&w(t)}}}function Et(e){let t,n,r=e[0].description+"";return{c(){t=k("p"),A(t,"class",n=zt.description)},m(e,n){b(e,t,n),t.innerHTML=r},p(e,n){1&n&&r!==(r=e[0].description+"")&&(t.innerHTML=r)},d(e){e&&w(t)}}}function Ot(e){let t,n,r=e[0].technical+"";return{c(){t=k("p"),A(t,"class",n=zt.description)},m(e,n){b(e,t,n),t.innerHTML=r},p(e,n){1&n&&r!==(r=e[0].technical+"")&&(t.innerHTML=r)},d(e){e&&w(t)}}}function Mt(e){let t,n,r,i={ctx:e,current:null,token:null,pending:Rt,then:Ht,catch:Lt,value:5,error:6,blocks:[,,,]};return ne(n=e[2](e[0]),i),{c(){t=C(),i.block.c()},m(e,n){b(e,t,n),i.block.m(e,i.anchor=n),i.mount=()=>t.parentNode,i.anchor=t,r=!0},p(t,r){if(e=t,i.ctx=e,1&r&&n!==(n=e[2](e[0]))&&ne(n,i));else{const t=e.slice();t[5]=i.resolved,i.block.p(t,r)}},i(e){r||(V(i.block),r=!0)},o(e){for(let e=0;e<3;e+=1){ee(i.blocks[e])}r=!1},d(e){e&&w(t),i.block.d(e),i.token=null,i=null}}}function Lt(t){let n,r,i,o=t[6].message+"";return{c(){n=k("p"),r=x("Something went wrong: "),i=x(o)},m(e,t){b(e,n,t),$(n,r),$(n,i)},p(e,t){1&t&&o!==(o=e[6].message+"")&&z(i,o)},i:e,o:e,d(e){e&&w(n)}}}function Ht(e){let t,n,r=e[5],i=[];for(let t=0;t<r.length;t+=1)i[t]=Nt(_t(e,r,t));const o=e=>ee(i[e],1,1,()=>{i[e]=null});return{c(){for(let e=0;e<i.length;e+=1)i[e].c();t=C()},m(e,r){for(let t=0;t<i.length;t+=1)i[t].m(e,r);b(e,t,r),n=!0},p(e,n){if(5&n){let a;for(r=e[5],a=0;a<r.length;a+=1){const o=_t(e,r,a);i[a]?(i[a].p(o,n),V(i[a],1)):(i[a]=Nt(o),i[a].c(),V(i[a],1),i[a].m(t.parentNode,t))}for(U(),a=r.length;a<i.length;a+=1)o(a);Z()}},i(e){if(!n){for(let e=0;e<r.length;e+=1)V(i[e]);n=!0}},o(e){i=i.filter(Boolean);for(let e=0;e<i.length;e+=1)ee(i[e]);n=!1},d(e){y(i,e),e&&w(t)}}}function Nt(e){let t;const n=new Ct({props:{project:e[7]}});return{c(){re(n.$$.fragment)},m(e,r){ie(n,e,r),t=!0},p(e,t){const r={};1&t&&(r.project=e[7]),n.$set(r)},i(e){t||(V(n.$$.fragment,e),t=!0)},o(e){ee(n.$$.fragment,e),t=!1},d(e){oe(n,e)}}}function Rt(t){let n;return{c(){n=k("p"),n.textContent="Getting Data"},m(e,t){b(e,n,t)},p:e,i:e,o:e,d(e){e&&w(n)}}}function Tt(n){let r,a,s,c,l,u,d,m,p,h=n[0].name&&jt(n),y=n[0].link&&St(n),x=n[0].description&&Et(n),C=n[0].technical&&Ot(n),z=n[0].projects&&Mt(n);return{c(){r=k("div"),h&&h.c(),a=v(),y&&y.c(),s=v(),x&&x.c(),c=v(),C&&C.c(),l=v(),z&&z.c(),A(r,"class",u=n[1]`
    ${zt.section};
    section_${n[0].name.toLowerCase()};`)},m(e,t){b(e,r,t),h&&h.m(r,null),$(r,a),y&&y.m(r,null),$(r,s),x&&x.m(r,null),$(r,c),C&&C.m(r,null),$(r,l),z&&z.m(r,null),p=!0},p(e,[t]){e[0].name?h?h.p(e,t):(h=jt(e),h.c(),h.m(r,a)):h&&(h.d(1),h=null),e[0].link?y?y.p(e,t):(y=St(e),y.c(),y.m(r,s)):y&&(y.d(1),y=null),e[0].description?x?x.p(e,t):(x=Et(e),x.c(),x.m(r,c)):x&&(x.d(1),x=null),e[0].technical?C?C.p(e,t):(C=Ot(e),C.c(),C.m(r,l)):C&&(C.d(1),C=null),e[0].projects?z?(z.p(e,t),V(z,1)):(z=Mt(e),z.c(),V(z,1),z.m(r,null)):z&&(U(),ee(z,1,1,()=>{z=null}),Z()),(!p||1&t&&u!==(u=e[1]`
    ${zt.section};
    section_${e[0].name.toLowerCase()};`))&&A(r,"class",u)},i(n){p||(V(z),B(()=>{m&&m.end(1),d||(d=function(n,r,i){let a,s,c=r(n,i),l=!1,u=0;function d(){a&&O(n,a)}function m(){const{delay:r=0,duration:i=300,easing:o=t,tick:m=e,css:p}=c||te;p&&(a=E(n,0,1,i,r,o,p,u++)),m(0,1);const h=f()+r,$=h+i;s&&s.abort(),l=!0,B(()=>Q(n,!0,"start")),s=g(e=>{if(l){if(e>=$)return m(1,0),Q(n,!0,"end"),d(),l=!1;if(e>=h){const t=o((e-h)/i);m(t,1-t)}}return l})}let p=!1;return{start(){p||(O(n),o(c)?(c=c(),J().then(m)):m())},invalidate(){p=!1},end(){l&&(d(),l=!1)}}}(r,pt,{delay:50,duration:200,x:-20,opacity:0,easing:mt})),d.start()}),p=!0)},o(n){ee(z),d&&d.invalidate(),m=function(n,r,a){let s,c=r(n,a),l=!0;const u=Y;function d(){const{delay:r=0,duration:o=300,easing:a=t,tick:d=e,css:m}=c||te;m&&(s=E(n,1,0,o,r,a,m));const p=f()+r,h=p+o;B(()=>Q(n,!1,"start")),g(e=>{if(l){if(e>=h)return d(0,1),Q(n,!1,"end"),--u.r||i(u.c),!1;if(e>=p){const t=a((e-p)/o);d(1-t,t)}}return l})}return u.r+=1,o(c)?J().then(()=>{c=c(),d()}):d(),{end(e){e&&c.tick&&c.tick(1,0),l&&(s&&O(n,s),l=!1)}}}(r,pt,{delay:50,duration:200,x:20,opacity:0,easing:mt}),p=!1},d(e){e&&w(r),h&&h.d(),y&&y.d(),x&&x.d(),C&&C.d(),z&&z.d(),e&&m&&m.end()}}}function Pt(e,t,n){let r;s(e,ze,e=>n(3,r=e));let{section:i}=t;const{css:o}=Ee;return e.$set=e=>{"section"in e&&n(0,i=e.section)},[i,o,async e=>{if("CodePen"!==e.name){return await e.projects()}return e.projects}]}class Gt extends ce{constructor(e){super(),se(this,e,Pt,Tt,a,{section:0})}}function qt(e,t,n){const r=e.slice();return r[5]=t[n],r}function Bt(t){let n;const r=new Gt({props:{section:t[5]}});return{c(){re(r.$$.fragment)},m(e,t){ie(r,e,t),n=!0},p:e,i(e){n||(V(r.$$.fragment,e),n=!0)},o(e){ee(r.$$.fragment,e),n=!1},d(e){oe(r,e)}}}function Xt(e){let t,n,r=e[5].name===e[2]&&Bt(e);return{c(){r&&r.c(),t=C()},m(e,i){r&&r.m(e,i),b(e,t,i),n=!0},p(e,n){e[5].name===e[2]?r?(r.p(e,n),V(r,1)):(r=Bt(e),r.c(),V(r,1),r.m(t.parentNode,t)):r&&(U(),ee(r,1,1,()=>{r=null}),Z())},i(e){n||(V(r),n=!0)},o(e){ee(r),n=!1},d(e){r&&r.d(e),e&&w(t)}}}function Ft(e){let t,n,r,i=ue,o=[];for(let t=0;t<i.length;t+=1)o[t]=Xt(qt(e,i,t));const a=e=>ee(o[e],1,1,()=>{o[e]=null});return{c(){t=k("main");for(let e=0;e<o.length;e+=1)o[e].c();A(t,"class",n=e[3]`
    ${gt};
    background: linear-gradient(${e[1]}deg, rgba(${ye[e[0].color]}, 1) 0%, rgba(${ye[e[0].color]}, 0.5) 100%);`)},m(e,n){b(e,t,n);for(let e=0;e<o.length;e+=1)o[e].m(t,null);r=!0},p(e,[s]){if(4&s){let n;for(i=ue,n=0;n<i.length;n+=1){const r=qt(e,i,n);o[n]?(o[n].p(r,s),V(o[n],1)):(o[n]=Xt(r),o[n].c(),V(o[n],1),o[n].m(t,null))}for(U(),n=i.length;n<o.length;n+=1)a(n);Z()}(!r||3&s&&n!==(n=e[3]`
    ${gt};
    background: linear-gradient(${e[1]}deg, rgba(${ye[e[0].color]}, 1) 0%, rgba(${ye[e[0].color]}, 0.5) 100%);`))&&A(t,"class",n)},i(e){if(!r){for(let e=0;e<i.length;e+=1)V(o[e]);r=!0}},o(e){o=o.filter(Boolean);for(let e=0;e<o.length;e+=1)ee(o[e]);r=!1},d(e){e&&w(t),y(o,e)}}}function It(e,t,n){let r,i;s(e,ze,e=>n(4,r=e)),s(e,Ae,e=>n(2,i=e));const{css:o}=Ee;let a=ue[0],c=r?180:90;return H(()=>{n(0,a=ue.find(e=>e.name===i)),n(1,c=r?180:90)}),[a,c,i,o]}class Wt extends ce{constructor(e){super(),se(this,e,It,Ft,a,{})}}const{css:Dt}=Ee,Jt={footer:Dt`
    box-sizing: border-box;
    padding: ${we.mid};
    text-align: center;

    @media (min-width: ${pe.width}) {
      text-align: right;
      padding-bottom: 0;

      p {
        font-size: 1.1rem;
      }
    }

    @media (min-width: ${he}) {
      p {
        font-size: 0.8rem;
      }
    }
  `};function Qt(e){let t,n,r,i,o;const a=e[2].default,s=c(a,e,e[1],null),d=s||function(e){let t;return{c(){t=k("em"),t.textContent="Missing Content"},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}();return{c(){t=k("footer"),d&&d.c(),n=v(),r=k("p"),r.textContent="James Augustus Hall ©",A(t,"class",i=Jt.footer)},m(e,i){b(e,t,i),d&&d.m(t,null),$(t,n),$(t,r),o=!0},p(e,[t]){s&&s.p&&2&t&&s.p(l(a,e,e[1],null),u(a,e[1],t,null))},i(e){o||(V(d,e),o=!0)},o(e){ee(d,e),o=!1},d(e){e&&w(t),d&&d.d(e)}}}function Kt(e,t,n){const{container:r}=Jt;let{$$slots:i={},$$scope:o}=t;return e.$set=e=>{"$$scope"in e&&n(1,o=e.$$scope)},[r,o,i]}class Yt extends ce{constructor(e){super(),se(this,e,Kt,Qt,a,{})}}function Ut(e,t,n){const r=e.slice();return r[3]=t[n],r}function Zt(t){let n;const r=new Ue({props:{section:t[3],handleButtonClick:t[1]}});return{c(){re(r.$$.fragment)},m(e,t){ie(r,e,t),n=!0},p:e,i(e){n||(V(r.$$.fragment,e),n=!0)},o(e){ee(r.$$.fragment,e),n=!1},d(e){oe(r,e)}}}function Vt(e){let t,n,r=ue,i=[];for(let t=0;t<r.length;t+=1)i[t]=Zt(Ut(e,r,t));const o=e=>ee(i[e],1,1,()=>{i[e]=null});return{c(){for(let e=0;e<i.length;e+=1)i[e].c();t=C()},m(e,r){for(let t=0;t<i.length;t+=1)i[t].m(e,r);b(e,t,r),n=!0},p(e,n){if(2&n){let a;for(r=ue,a=0;a<r.length;a+=1){const o=Ut(e,r,a);i[a]?(i[a].p(o,n),V(i[a],1)):(i[a]=Zt(o),i[a].c(),V(i[a],1),i[a].m(t.parentNode,t))}for(U(),a=r.length;a<i.length;a+=1)o(a);Z()}},i(e){if(!n){for(let e=0;e<r.length;e+=1)V(i[e]);n=!0}},o(e){i=i.filter(Boolean);for(let e=0;e<i.length;e+=1)ee(i[e]);n=!1},d(e){y(i,e),e&&w(t)}}}function en(e){let t,n;const r=new ut({}),i=new Yt({props:{$$slots:{default:[tn]},$$scope:{ctx:e}}});return{c(){re(r.$$.fragment),t=v(),re(i.$$.fragment)},m(e,o){ie(r,e,o),b(e,t,o),ie(i,e,o),n=!0},i(e){n||(V(r.$$.fragment,e),V(i.$$.fragment,e),n=!0)},o(e){ee(r.$$.fragment,e),ee(i.$$.fragment,e),n=!1},d(e){oe(r,e),e&&w(t),oe(i,e)}}}function tn(e){let t;return{c(){t=k("i"),A(t,"class","fas fa-coffee")},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}function nn(e){let t,n,r;const i=new nt({props:{$$slots:{default:[Vt]},$$scope:{ctx:e}}});let o=!e[0]&&en(e);return{c(){re(i.$$.fragment),t=v(),o&&o.c(),n=C()},m(e,a){ie(i,e,a),b(e,t,a),o&&o.m(e,a),b(e,n,a),r=!0},p(e,t){const r={};64&t&&(r.$$scope={dirty:t,ctx:e}),i.$set(r),e[0]?o&&(U(),ee(o,1,1,()=>{o=null}),Z()):o?V(o,1):(o=en(e),o.c(),V(o,1),o.m(n.parentNode,n))},i(e){r||(V(i.$$.fragment,e),V(o),r=!0)},o(e){ee(i.$$.fragment,e),ee(o),r=!1},d(e){oe(i,e),e&&w(t),o&&o.d(e),e&&w(n)}}}function rn(e){let t;const n=new Yt({props:{$$slots:{default:[on]},$$scope:{ctx:e}}});return{c(){re(n.$$.fragment)},m(e,r){ie(n,e,r),t=!0},i(e){t||(V(n.$$.fragment,e),t=!0)},o(e){ee(n.$$.fragment,e),t=!1},d(e){oe(n,e)}}}function on(e){let t;const n=new ut({});return{c(){re(n.$$.fragment)},m(e,r){ie(n,e,r),t=!0},i(e){t||(V(n.$$.fragment,e),t=!0)},o(e){ee(n.$$.fragment,e),t=!1},d(e){oe(n,e)}}}function an(e){let t,n,r,i,o;const a=new Ie({}),s=new qe({props:{$$slots:{default:[nn]},$$scope:{ctx:e}}}),c=new Wt({});let l=e[0]&&rn(e);return{c(){re(a.$$.fragment),t=v(),re(s.$$.fragment),n=v(),re(c.$$.fragment),r=v(),l&&l.c(),i=C()},m(e,u){ie(a,e,u),b(e,t,u),ie(s,e,u),b(e,n,u),ie(c,e,u),b(e,r,u),l&&l.m(e,u),b(e,i,u),o=!0},p(e,t){const n={};65&t&&(n.$$scope={dirty:t,ctx:e}),s.$set(n),e[0]?l?V(l,1):(l=rn(e),l.c(),V(l,1),l.m(i.parentNode,i)):l&&(U(),ee(l,1,1,()=>{l=null}),Z())},i(e){o||(V(a.$$.fragment,e),V(s.$$.fragment,e),V(c.$$.fragment,e),V(l),o=!0)},o(e){ee(a.$$.fragment,e),ee(s.$$.fragment,e),ee(c.$$.fragment,e),ee(l),o=!1},d(e){oe(a,e),e&&w(t),oe(s,e),e&&w(n),oe(c,e),e&&w(r),l&&l.d(e),e&&w(i)}}}function sn(e){let t;const n=new Ne({props:{$$slots:{default:[an]},$$scope:{ctx:e}}});return{c(){re(n.$$.fragment)},m(e,r){ie(n,e,r),t=!0},p(e,[t]){const r={};65&t&&(r.$$scope={dirty:t,ctx:e}),n.$set(r)},i(e){t||(V(n.$$.fragment,e),t=!0)},o(e){ee(n.$$.fragment,e),t=!1},d(e){oe(n,e)}}}function cn(e,t,n){let r;s(e,ze,e=>n(0,r=e));const i=e=>{ze.set(window.innerWidth<pe.width.split("px")[0])};return function(e){L().$$.on_mount.push(e)}(()=>{window.addEventListener("resize",i)}),function(e){L().$$.on_destroy.push(e)}(()=>{window.removeEventListener("resize",i)}),[r,e=>{Ae.set(e.currentTarget.dataset.name)}]}return new class extends ce{constructor(e){super(),se(this,e,cn,sn,a,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
