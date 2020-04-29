var app=function(){"use strict";function e(){}const t=e=>e;function n(e){return e()}function r(){return Object.create(null)}function a(e){e.forEach(n)}function i(e){return"function"==typeof e}function o(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function s(t,n,r){t.$$.on_destroy.push(function(t,...n){if(null==t)return e;const r=t.subscribe(...n);return r.unsubscribe?()=>r.unsubscribe():r}(n,r))}function c(e,t,n,r){if(e){const a=l(e,t,n,r);return e[0](a)}}function l(e,t,n,r){return e[1]&&r?function(e,t){for(const n in t)e[n]=t[n];return e}(n.ctx.slice(),e[1](r(t))):n.ctx}function d(e,t,n,r){if(e[2]&&r){const a=e[2](r(n));if(void 0===t.dirty)return a;if("object"==typeof a){const e=[],n=Math.max(t.dirty.length,a.length);for(let r=0;r<n;r+=1)e[r]=t.dirty[r]|a[r];return e}return t.dirty|a}return t.dirty}const u="undefined"!=typeof window;let f=u?()=>window.performance.now():()=>Date.now(),m=u?e=>requestAnimationFrame(e):e;const h=new Set;function p(e){h.forEach(t=>{t.c(e)||(h.delete(t),t.f())}),0!==h.size&&m(p)}function g(e){let t;return 0===h.size&&m(p),{promise:new Promise(n=>{h.add(t={c:e,f:n})}),abort(){h.delete(t)}}}function $(e,t){e.appendChild(t)}function b(e,t,n){e.insertBefore(t,n||null)}function w(e){e.parentNode.removeChild(e)}function y(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function x(e){return document.createElement(e)}function k(e){return document.createTextNode(e)}function v(){return k(" ")}function C(){return k("")}function A(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function j(e,t){t=""+t,e.data!==t&&(e.data=t)}class z{constructor(e,t=null){this.e=x("div"),this.a=t,this.u(e)}m(e,t=null){for(let n=0;n<this.n.length;n+=1)b(e,this.n[n],t);this.t=e}u(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}p(e){this.d(),this.u(e),this.m(this.t,this.a)}d(){this.n.forEach(w)}}const _=new Set;let S,O=0;function E(e,t,n,r,a,i,o,s=0){const c=16.666/r;let l="{\n";for(let e=0;e<=1;e+=c){const r=t+(n-t)*i(e);l+=100*e+`%{${o(r,1-r)}}\n`}const d=l+`100% {${o(n,1-n)}}\n}`,u=`__svelte_${function(e){let t=5381,n=e.length;for(;n--;)t=(t<<5)-t^e.charCodeAt(n);return t>>>0}(d)}_${s}`,f=e.ownerDocument;_.add(f);const m=f.__svelte_stylesheet||(f.__svelte_stylesheet=f.head.appendChild(x("style")).sheet),h=f.__svelte_rules||(f.__svelte_rules={});h[u]||(h[u]=!0,m.insertRule(`@keyframes ${u} ${d}`,m.cssRules.length));const p=e.style.animation||"";return e.style.animation=`${p?p+", ":""}${u} ${r}ms linear ${a}ms 1 both`,O+=1,u}function R(e,t){const n=(e.style.animation||"").split(", "),r=n.filter(t?e=>e.indexOf(t)<0:e=>-1===e.indexOf("__svelte")),a=n.length-r.length;a&&(e.style.animation=r.join(", "),O-=a,O||m(()=>{O||(_.forEach(e=>{const t=e.__svelte_stylesheet;let n=t.cssRules.length;for(;n--;)t.deleteRule(n);e.__svelte_rules={}}),_.clear())}))}function N(e){S=e}function P(){if(!S)throw new Error("Function called outside component initialization");return S}function M(e){P().$$.after_update.push(e)}const B=[],L=[],J=[],H=[],G=Promise.resolve();let T=!1;function I(e){J.push(e)}let X=!1;const Y=new Set;function F(){if(!X){X=!0;do{for(let e=0;e<B.length;e+=1){const t=B[e];N(t),V(t.$$)}for(B.length=0;L.length;)L.pop()();for(let e=0;e<J.length;e+=1){const t=J[e];Y.has(t)||(Y.add(t),t())}J.length=0}while(B.length);for(;H.length;)H.pop()();T=!1,X=!1,Y.clear()}}function V(e){if(null!==e.fragment){e.update(),a(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(I)}}let W;function Q(){return W||(W=Promise.resolve(),W.then(()=>{W=null})),W}function K(e,t,n){e.dispatchEvent(function(e,t){const n=document.createEvent("CustomEvent");return n.initCustomEvent(e,!1,!1,t),n}(`${t?"intro":"outro"}${n}`))}const q=new Set;let D;function U(){D={r:0,c:[],p:D}}function Z(){D.r||a(D.c),D=D.p}function ee(e,t){e&&e.i&&(q.delete(e),e.i(t))}function te(e,t,n,r){if(e&&e.o){if(q.has(e))return;q.add(e),D.c.push(()=>{q.delete(e),r&&(n&&e.d(1),r())}),e.o(t)}}const ne={duration:0};function re(e){e&&e.c()}function ae(e,t,r){const{fragment:o,on_mount:s,on_destroy:c,after_update:l}=e.$$;o&&o.m(t,r),I(()=>{const t=s.map(n).filter(i);c?c.push(...t):a(t),e.$$.on_mount=[]}),l.forEach(I)}function ie(e,t){const n=e.$$;null!==n.fragment&&(a(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function oe(e,t){-1===e.$$.dirty[0]&&(B.push(e),T||(T=!0,G.then(F)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function se(t,n,i,o,s,c,l=[-1]){const d=S;N(t);const u=n.props||{},f=t.$$={fragment:null,ctx:null,props:c,update:e,not_equal:s,bound:r(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(d?d.$$.context:[]),callbacks:r(),dirty:l};let m=!1;if(f.ctx=i?i(t,u,(e,n,...r)=>{const a=r.length?r[0]:n;return f.ctx&&s(f.ctx[e],f.ctx[e]=a)&&(f.bound[e]&&f.bound[e](a),m&&oe(t,e)),n}):[],f.update(),m=!0,a(f.before_update),f.fragment=!!o&&o(f.ctx),n.target){if(n.hydrate){const e=function(e){return Array.from(e.childNodes)}(n.target);f.fragment&&f.fragment.l(e),e.forEach(w)}else f.fragment&&f.fragment.c();n.intro&&ee(t.$$.fragment),ae(t,n.target,n.anchor),F()}N(d)}class ce{$destroy(){ie(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}const le=[{id:0,name:"Home",iconClass:"fas fa-home",color:"green",description:'Welcome to JameScript.com, the Code Home, or "Chome" as it were, of me, <a href="https://eljamez.com">James Augustus Hall</a>. I\'m primarily a Front End Engineer and these are my personal projects. I hope you find something useful, fun, and / or interesing.',technical:'The site you are now viewing is hosted via <a href="https://pages.github.com/">GitHub Pages</a> and build using <a href="https://emotion.sh/">Emotion</a> and <a href="https://svelte.dev/">Svelte</a>, with help from <a href="https://fontawesome.com/">Font Awesome</a> and <a href="https://fonts.google.com/">Google Fonts</a>'},{id:1,name:"Repos",iconClass:"fab fa-github",color:"blue",link:"https://github.com/eljamez/",projects:[{name:"js-package-generator",description:"Generate a (vanilla) JS package with this easy-to-use command line tool. Just run `npx js-package-generator`",url:"https://www.jamescript.com/js-package-generator/",iconClass:"fas fa-tools"},{name:"React Keyboard",description:"A piano keyboard React component w/ musical typing.",url:"https://www.jamescript.com/React-Keyboard/",iconClass:"fas fa-music"},{name:"Vanilla JS Library Boilerplate",description:"A starting place to create a JavaScript library",url:"http://www.jamescript.com/Vanilla-JS-Library-Boilerplate/",iconClass:"fab fa-js"}]},{id:2,name:"NPM",iconClass:"fab fa-npm",color:"red",link:"https://www.npmjs.com/~eljamez",projects:[{name:"js-package-generator",description:"Generate a (vanilla) JS package with this easy-to-use command line tool. Just run `npx js-package-generator`",url:"https://www.npmjs.com/package/js-package-generator/",iconClass:"fas fa-tools"},{name:"React Keyboard",description:"A piano keyboard React component w/ musical typing.",url:"https://www.npmjs.com/package/react-keyboard-component",iconClass:"fas fa-music"}]},{id:3,name:"CodePen",iconClass:"fab fa-codepen",color:"purple",link:"https://codepen.io/eljamez",projects:[{name:"eljamez, a css typeface",description:"An experiment where fonts and css meet.",url:"https://codepen.io/eljamez/pen/dYNjvY",embed:'<iframe height="400" style="width: 100%;" scrolling="no" title="eljamez, a css typeface" src="https://codepen.io/eljamez/embed/dYNjvY?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">\n        See the Pen <a href=\'https://codepen.io/eljamez/pen/dYNjvY\'>eljamez, a css typeface</a> by James Hall\n        (<a href=\'https://codepen.io/eljamez\'>@eljamez</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\n      </iframe>',iconClass:"fas fa-font"},{name:"Place those Buttons!",description:"Just a fun experiment to place dots on a screen",url:"https://codepen.io/eljamez/pen/OJPMQbV",embed:'<iframe height="400" style="width: 100%;" scrolling="no" title="Place those Buttons!" src="https://codepen.io/eljamez/embed/OJPMQbV?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">\n        See the Pen <a href=\'https://codepen.io/eljamez/pen/OJPMQbV\'>Place those Buttons!</a> by James Hall\n        (<a href=\'https://codepen.io/eljamez\'>@eljamez</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\n      </iframe>',iconClass:"far fa-circle"},{name:"Bendo",description:"Bending elements based on scroll position",url:"https://codepen.io/eljamez/pen/byVojv",embed:'<iframe height="400" style="width: 100%;" scrolling="no" title="Bendo" src="https://codepen.io/eljamez/embed/byVojv?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">\n        See the Pen <a href=\'https://codepen.io/eljamez/pen/byVojv\'>Bendo</a> by James Hall\n        (<a href=\'https://codepen.io/eljamez\'>@eljamez</a>) on <a href=\'https://codepen.io\'>CodePen</a>.\n      </iframe>',iconClass:"fab fa-js"}]}],de=[{name:"eljamez",url:"https://eljamez.com",iconClass:"fas fa-laptop-house"},{name:"twitter",url:"https://twitter.com/eljamez",iconClass:"fab fa-twitter"},{name:"ensly mogul",url:"https://enslymogul.com",iconClass:"fas fa-music"},{name:"soundcloud",url:"https://soundcloud.com/eljamez",iconClass:"fab fa-soundcloud"},{name:"linkedin",url:"https://www.linkedin.com/in/eljamez/",iconClass:"fab fa-linkedin-in"},{name:"spotify",url:"https://open.spotify.com/playlist/4yQ0U5YrMbK2IKqFYT0O0n?si=O3f7zQ1gR5-99SbRLrwNXQ",iconClass:"fab fa-spotify"}],ue=[];function fe(t,n=e){let r;const a=[];function i(e){if(o(t,e)&&(t=e,r)){const e=!ue.length;for(let e=0;e<a.length;e+=1){const n=a[e];n[1](),ue.push(n,t)}if(e){for(let e=0;e<ue.length;e+=2)ue[e][0](ue[e+1]);ue.length=0}}}return{set:i,update:function(e){i(e(t))},subscribe:function(o,s=e){const c=[o,s];return a.push(c),1===a.length&&(r=n(i)||e),o(t),()=>{const e=a.indexOf(c);-1!==e&&a.splice(e,1),0===a.length&&(r(),r=null)}}}}const me={width:"620px",height:{header:"36px"}},he="870px",pe="140px",ge={header:"58px"},$e="80px",be={xSmall:"6px",small:"10px",mid:"20px",large:"30px",xLarge:"40px"},we={yellow:"240, 219, 79",gray:"50, 51, 48",blue:"3, 102, 214",red:"196, 11, 10",green:"71, 139, 66",purple:"174, 99, 228"},ye={yellow:`rgb(${we.yellow})`,gray:`rgb(${we.gray})`,blue:`rgb(${we.blue})`,red:`rgb(${we.red})`,green:`rgb(${we.green})`,purple:`rgb(${we.purple})`},xe="text-shadow: 0 1px 1px "+ye.gray,ke="font-family: 'Staatliches', cursive",ve="transition: all .2s ease",Ce=fe("Home"),Ae=fe(window.innerWidth<me.width.split("px")[0]);"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var je,ze,_e=(function(e,t){!function(e){var t=function(){function e(e){this.isSpeedy=void 0===e.speedy||e.speedy,this.tags=[],this.ctr=0,this.nonce=e.nonce,this.key=e.key,this.container=e.container,this.before=null}var t=e.prototype;return t.insert=function(e){if(this.ctr%(this.isSpeedy?65e3:1)==0){var t,n=function(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),void 0!==e.nonce&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t}(this);t=0===this.tags.length?this.before:this.tags[this.tags.length-1].nextSibling,this.container.insertBefore(n,t),this.tags.push(n)}var r=this.tags[this.tags.length-1];if(this.isSpeedy){var a=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}(r);try{var i=105===e.charCodeAt(1)&&64===e.charCodeAt(0);a.insertRule(e,i?0:a.cssRules.length)}catch(e){}}else r.appendChild(document.createTextNode(e));this.ctr++},t.flush=function(){this.tags.forEach((function(e){return e.parentNode.removeChild(e)})),this.tags=[],this.ctr=0},e}();function n(e){function t(e,t,r){var a=t.trim().split(h);t=a;var i=a.length,o=e.length;switch(o){case 0:case 1:var s=0;for(e=0===o?"":e[0]+" ";s<i;++s)t[s]=n(e,t[s],r).trim();break;default:var c=s=0;for(t=[];s<i;++s)for(var l=0;l<o;++l)t[c++]=n(e[l]+" ",a[s],r).trim()}return t}function n(e,t,n){var r=t.charCodeAt(0);switch(33>r&&(r=(t=t.trim()).charCodeAt(0)),r){case 38:return t.replace(p,"$1"+e.trim());case 58:return e.trim()+t.replace(p,"$1"+e.trim());default:if(0<1*n&&0<t.indexOf("\f"))return t.replace(p,(58===e.charCodeAt(0)?"":"$1")+e.trim())}return e+t}function r(e,t,n,i){var o=e+";",s=2*t+3*n+4*i;if(944===s){e=o.indexOf(":",9)+1;var c=o.substring(e,o.length-1).trim();return c=o.substring(0,e).trim()+c+";",1===S||2===S&&a(c,1)?"-webkit-"+c+c:c}if(0===S||2===S&&!a(o,1))return o;switch(s){case 1015:return 97===o.charCodeAt(10)?"-webkit-"+o+o:o;case 951:return 116===o.charCodeAt(3)?"-webkit-"+o+o:o;case 963:return 110===o.charCodeAt(5)?"-webkit-"+o+o:o;case 1009:if(100!==o.charCodeAt(4))break;case 969:case 942:return"-webkit-"+o+o;case 978:return"-webkit-"+o+"-moz-"+o+o;case 1019:case 983:return"-webkit-"+o+"-moz-"+o+"-ms-"+o+o;case 883:if(45===o.charCodeAt(8))return"-webkit-"+o+o;if(0<o.indexOf("image-set(",11))return o.replace(A,"$1-webkit-$2")+o;break;case 932:if(45===o.charCodeAt(4))switch(o.charCodeAt(5)){case 103:return"-webkit-box-"+o.replace("-grow","")+"-webkit-"+o+"-ms-"+o.replace("grow","positive")+o;case 115:return"-webkit-"+o+"-ms-"+o.replace("shrink","negative")+o;case 98:return"-webkit-"+o+"-ms-"+o.replace("basis","preferred-size")+o}return"-webkit-"+o+"-ms-"+o+o;case 964:return"-webkit-"+o+"-ms-flex-"+o+o;case 1023:if(99!==o.charCodeAt(8))break;return"-webkit-box-pack"+(c=o.substring(o.indexOf(":",15)).replace("flex-","").replace("space-between","justify"))+"-webkit-"+o+"-ms-flex-pack"+c+o;case 1005:return f.test(o)?o.replace(u,":-webkit-")+o.replace(u,":-moz-")+o:o;case 1e3:switch(t=(c=o.substring(13).trim()).indexOf("-")+1,c.charCodeAt(0)+c.charCodeAt(t)){case 226:c=o.replace(w,"tb");break;case 232:c=o.replace(w,"tb-rl");break;case 220:c=o.replace(w,"lr");break;default:return o}return"-webkit-"+o+"-ms-"+c+o;case 1017:if(-1===o.indexOf("sticky",9))break;case 975:switch(t=(o=e).length-10,s=(c=(33===o.charCodeAt(t)?o.substring(0,t):o).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|c.charCodeAt(7))){case 203:if(111>c.charCodeAt(8))break;case 115:o=o.replace(c,"-webkit-"+c)+";"+o;break;case 207:case 102:o=o.replace(c,"-webkit-"+(102<s?"inline-":"")+"box")+";"+o.replace(c,"-webkit-"+c)+";"+o.replace(c,"-ms-"+c+"box")+";"+o}return o+";";case 938:if(45===o.charCodeAt(5))switch(o.charCodeAt(6)){case 105:return c=o.replace("-items",""),"-webkit-"+o+"-webkit-box-"+c+"-ms-flex-"+c+o;case 115:return"-webkit-"+o+"-ms-flex-item-"+o.replace(k,"")+o;default:return"-webkit-"+o+"-ms-flex-line-pack"+o.replace("align-content","").replace(k,"")+o}break;case 973:case 989:if(45!==o.charCodeAt(3)||122===o.charCodeAt(4))break;case 931:case 953:if(!0===C.test(e))return 115===(c=e.substring(e.indexOf(":")+1)).charCodeAt(0)?r(e.replace("stretch","fill-available"),t,n,i).replace(":fill-available",":stretch"):o.replace(c,"-webkit-"+c)+o.replace(c,"-moz-"+c.replace("fill-",""))+o;break;case 962:if(o="-webkit-"+o+(102===o.charCodeAt(5)?"-ms-"+o:"")+o,211===n+i&&105===o.charCodeAt(13)&&0<o.indexOf("transform",10))return o.substring(0,o.indexOf(";",27)+1).replace(m,"$1-webkit-$2")+o}return o}function a(e,t){var n=e.indexOf(1===t?":":"{"),r=e.substring(0,3!==t?n:10);return n=e.substring(n+1,e.length-1),N(2!==t?r:r.replace(v,"$1"),n,t)}function i(e,t){var n=r(t,t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2));return n!==t+";"?n.replace(x," or ($1)").substring(4):"("+t+")"}function o(e,t,n,r,a,i,o,s,l,d){for(var u,f=0,m=t;f<R;++f)switch(u=E[f].call(c,e,m,n,r,a,i,o,s,l,d)){case void 0:case!1:case!0:case null:break;default:m=u}if(m!==t)return m}function s(e){return void 0!==(e=e.prefix)&&(N=null,e?"function"!=typeof e?S=1:(S=2,N=e):S=0),s}function c(e,n){var s=e;if(33>s.charCodeAt(0)&&(s=s.trim()),s=[s],0<R){var c=o(-1,n,s,s,z,j,0,0,0,0);void 0!==c&&"string"==typeof c&&(n=c)}var u=function e(n,s,c,u,f){for(var m,h,p,w,x,k=0,v=0,C=0,A=0,E=0,N=0,M=p=m=0,B=0,L=0,J=0,H=0,G=c.length,T=G-1,I="",X="",Y="",F="";B<G;){if(h=c.charCodeAt(B),B===T&&0!==v+A+C+k&&(0!==v&&(h=47===v?10:47),A=C=k=0,G++,T++),0===v+A+C+k){if(B===T&&(0<L&&(I=I.replace(d,"")),0<I.trim().length)){switch(h){case 32:case 9:case 59:case 13:case 10:break;default:I+=c.charAt(B)}h=59}switch(h){case 123:for(m=(I=I.trim()).charCodeAt(0),p=1,H=++B;B<G;){switch(h=c.charCodeAt(B)){case 123:p++;break;case 125:p--;break;case 47:switch(h=c.charCodeAt(B+1)){case 42:case 47:e:{for(M=B+1;M<T;++M)switch(c.charCodeAt(M)){case 47:if(42===h&&42===c.charCodeAt(M-1)&&B+2!==M){B=M+1;break e}break;case 10:if(47===h){B=M+1;break e}}B=M}}break;case 91:h++;case 40:h++;case 34:case 39:for(;B++<T&&c.charCodeAt(B)!==h;);}if(0===p)break;B++}switch(p=c.substring(H,B),0===m&&(m=(I=I.replace(l,"").trim()).charCodeAt(0)),m){case 64:switch(0<L&&(I=I.replace(d,"")),h=I.charCodeAt(1)){case 100:case 109:case 115:case 45:L=s;break;default:L=O}if(H=(p=e(s,L,p,h,f+1)).length,0<R&&(x=o(3,p,L=t(O,I,J),s,z,j,H,h,f,u),I=L.join(""),void 0!==x&&0===(H=(p=x.trim()).length)&&(h=0,p="")),0<H)switch(h){case 115:I=I.replace(y,i);case 100:case 109:case 45:p=I+"{"+p+"}";break;case 107:p=(I=I.replace(g,"$1 $2"))+"{"+p+"}",p=1===S||2===S&&a("@"+p,3)?"@-webkit-"+p+"@"+p:"@"+p;break;default:p=I+p,112===u&&(X+=p,p="")}else p="";break;default:p=e(s,t(s,I,J),p,u,f+1)}Y+=p,p=J=L=M=m=0,I="",h=c.charCodeAt(++B);break;case 125:case 59:if(1<(H=(I=(0<L?I.replace(d,""):I).trim()).length))switch(0===M&&(m=I.charCodeAt(0),45===m||96<m&&123>m)&&(H=(I=I.replace(" ",":")).length),0<R&&void 0!==(x=o(1,I,s,n,z,j,X.length,u,f,u))&&0===(H=(I=x.trim()).length)&&(I="\0\0"),m=I.charCodeAt(0),h=I.charCodeAt(1),m){case 0:break;case 64:if(105===h||99===h){F+=I+c.charAt(B);break}default:58!==I.charCodeAt(H-1)&&(X+=r(I,m,h,I.charCodeAt(2)))}J=L=M=m=0,I="",h=c.charCodeAt(++B)}}switch(h){case 13:case 10:47===v?v=0:0===1+m&&107!==u&&0<I.length&&(L=1,I+="\0"),0<R*P&&o(0,I,s,n,z,j,X.length,u,f,u),j=1,z++;break;case 59:case 125:if(0===v+A+C+k){j++;break}default:switch(j++,w=c.charAt(B),h){case 9:case 32:if(0===A+k+v)switch(E){case 44:case 58:case 9:case 32:w="";break;default:32!==h&&(w=" ")}break;case 0:w="\\0";break;case 12:w="\\f";break;case 11:w="\\v";break;case 38:0===A+v+k&&(L=J=1,w="\f"+w);break;case 108:if(0===A+v+k+_&&0<M)switch(B-M){case 2:112===E&&58===c.charCodeAt(B-3)&&(_=E);case 8:111===N&&(_=N)}break;case 58:0===A+v+k&&(M=B);break;case 44:0===v+C+A+k&&(L=1,w+="\r");break;case 34:case 39:0===v&&(A=A===h?0:0===A?h:A);break;case 91:0===A+v+C&&k++;break;case 93:0===A+v+C&&k--;break;case 41:0===A+v+k&&C--;break;case 40:if(0===A+v+k){if(0===m)switch(2*E+3*N){case 533:break;default:m=1}C++}break;case 64:0===v+C+A+k+M+p&&(p=1);break;case 42:case 47:if(!(0<A+k+C))switch(v){case 0:switch(2*h+3*c.charCodeAt(B+1)){case 235:v=47;break;case 220:H=B,v=42}break;case 42:47===h&&42===E&&H+2!==B&&(33===c.charCodeAt(H+2)&&(X+=c.substring(H,B+1)),w="",v=0)}}0===v&&(I+=w)}N=E,E=h,B++}if(0<(H=X.length)){if(L=s,0<R&&void 0!==(x=o(2,X,L,n,z,j,H,u,f,u))&&0===(X=x).length)return F+X+Y;if(X=L.join(",")+"{"+X+"}",0!=S*_){switch(2!==S||a(X,2)||(_=0),_){case 111:X=X.replace(b,":-moz-$1")+X;break;case 112:X=X.replace($,"::-webkit-input-$1")+X.replace($,"::-moz-$1")+X.replace($,":-ms-input-$1")+X}_=0}}return F+X+Y}(O,s,n,0,0);return 0<R&&void 0!==(c=o(-2,u,s,s,z,j,u.length,0,0,0))&&(u=c),_=0,j=z=1,u}var l=/^\0+/g,d=/[\0\r\f]/g,u=/: */g,f=/zoo|gra/,m=/([,: ])(transform)/g,h=/,\r+?/g,p=/([\t\r\n ])*\f?&/g,g=/@(k\w+)\s*(\S*)\s*/,$=/::(place)/g,b=/:(read-only)/g,w=/[svh]\w+-[tblr]{2}/,y=/\(\s*(.*)\s*\)/g,x=/([\s\S]*?);/g,k=/-self|flex-/g,v=/[^]*?(:[rp][el]a[\w-]+)[^]*/,C=/stretch|:\s*\w+\-(?:conte|avail)/,A=/([^-])(image-set\()/,j=1,z=1,_=0,S=1,O=[],E=[],R=0,N=null,P=0;return c.use=function e(t){switch(t){case void 0:case null:R=E.length=0;break;default:if("function"==typeof t)E[R++]=t;else if("object"==typeof t)for(var n=0,r=t.length;n<r;++n)e(t[n]);else P=0|!!t}return e},c.set=s,void 0!==e&&s(e),c}function r(e){e&&a.current.insert(e+"}")}var a={current:null},i=function(e,t,n,i,o,s,c,l,d,u){switch(e){case 1:switch(t.charCodeAt(0)){case 64:return a.current.insert(t+";"),"";case 108:if(98===t.charCodeAt(2))return""}break;case 2:if(0===l)return t+"/*|*/";break;case 3:switch(l){case 102:case 112:return a.current.insert(n[0]+t),"";default:return t+(0===u?"/*|*/":"")}case-2:t.split("/*|*/}").forEach(r)}},o={animationIterationCount:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},s=/[A-Z]|^ms/g,c=/_EMO_([^_]+?)_([^]*?)_EMO_/g,l=function(e){return 45===e.charCodeAt(1)},d=function(e){return null!=e&&"boolean"!=typeof e},u=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return l(e)?e:e.replace(s,"-$&").toLowerCase()}(e)),t[e]}}(),f=function(e,t){switch(e){case"animation":case"animationName":if("string"==typeof t)return t.replace(c,(function(e,t,n){return h={name:t,styles:n,next:h},t}))}return 1===o[e]||l(e)||"number"!=typeof t||0===t?t:t+"px"};function m(e,t,n,r){if(null==n)return"";if(void 0!==n.__emotion_styles)return n;switch(typeof n){case"boolean":return"";case"object":if(1===n.anim)return h={name:n.name,styles:n.styles,next:h},n.name;if(void 0!==n.styles){var a=n.next;if(void 0!==a)for(;void 0!==a;)h={name:a.name,styles:a.styles,next:h},a=a.next;return n.styles+";"}return function(e,t,n){var r="";if(Array.isArray(n))for(var a=0;a<n.length;a++)r+=m(e,t,n[a],!1);else for(var i in n){var o=n[i];if("object"!=typeof o)null!=t&&void 0!==t[o]?r+=i+"{"+t[o]+"}":d(o)&&(r+=u(i)+":"+f(i,o)+";");else if(!Array.isArray(o)||"string"!=typeof o[0]||null!=t&&void 0!==t[o[0]]){var s=m(e,t,o,!1);switch(i){case"animation":case"animationName":r+=u(i)+":"+s+";";break;default:r+=i+"{"+s+"}"}}else for(var c=0;c<o.length;c++)d(o[c])&&(r+=u(i)+":"+f(i,o[c])+";")}return r}(e,t,n);case"function":if(void 0!==e){var i=h,o=n(e);return h=i,m(e,t,o,r)}}if(null==t)return n;var s=t[n];return void 0===s||r?n:s}var h,p=/label:\s*([^\s;\n{]+)\s*;/g,g=function(e,t,n){if(1===e.length&&"object"==typeof e[0]&&null!==e[0]&&void 0!==e[0].styles)return e[0];var r=!0,a="";h=void 0;var i=e[0];null==i||void 0===i.raw?(r=!1,a+=m(n,t,i,!1)):a+=i[0];for(var o=1;o<e.length;o++)a+=m(n,t,e[o],46===a.charCodeAt(a.length-1)),r&&(a+=i[o]);p.lastIndex=0;for(var s,c="";null!==(s=p.exec(a));)c+="-"+s[1];return{name:function(e){for(var t,n=e.length,r=n^n,a=0;n>=4;)t=1540483477*(65535&(t=255&e.charCodeAt(a)|(255&e.charCodeAt(++a))<<8|(255&e.charCodeAt(++a))<<16|(255&e.charCodeAt(++a))<<24))+((1540483477*(t>>>16)&65535)<<16),r=1540483477*(65535&r)+((1540483477*(r>>>16)&65535)<<16)^(t=1540483477*(65535&(t^=t>>>24))+((1540483477*(t>>>16)&65535)<<16)),n-=4,++a;switch(n){case 3:r^=(255&e.charCodeAt(a+2))<<16;case 2:r^=(255&e.charCodeAt(a+1))<<8;case 1:r=1540483477*(65535&(r^=255&e.charCodeAt(a)))+((1540483477*(r>>>16)&65535)<<16)}return r=1540483477*(65535&(r^=r>>>13))+((1540483477*(r>>>16)&65535)<<16),((r^=r>>>15)>>>0).toString(36)}(a)+c,styles:a,next:h}};function $(e,t,n){var r="";return n.split(" ").forEach((function(n){void 0!==e[n]?t.push(e[n]):r+=n+" "})),r}function b(e,t){if(void 0===e.inserted[t.name])return e.insert("",t,e.sheet,!0)}function w(e,t,n){var r=[],a=$(e,r,n);return r.length<2?n:a+t(r)}var y=function e(t){for(var n="",r=0;r<t.length;r++){var a=t[r];if(null!=a){var i=void 0;switch(typeof a){case"boolean":break;case"object":if(Array.isArray(a))i=e(a);else for(var o in i="",a)a[o]&&o&&(i&&(i+=" "),i+=o);break;default:i=a}i&&(n&&(n+=" "),n+=i)}}return n},x=function(e){var r=function(e){void 0===e&&(e={});var r,o=e.key||"css";void 0!==e.prefix&&(r={prefix:e.prefix});var s,c=new n(r),l={};s=e.container||document.head;var d,u=document.querySelectorAll("style[data-emotion-"+o+"]");Array.prototype.forEach.call(u,(function(e){e.getAttribute("data-emotion-"+o).split(" ").forEach((function(e){l[e]=!0})),e.parentNode!==s&&s.appendChild(e)})),c.use(e.stylisPlugins)(i),d=function(e,t,n,r){var i=t.name;a.current=n,c(e,t.styles),r&&(f.inserted[i]=!0)};var f={key:o,sheet:new t({key:o,container:s,nonce:e.nonce,speedy:e.speedy}),nonce:e.nonce,inserted:l,registered:{},insert:d};return f}(void 0);r.sheet.speedy=function(e){this.isSpeedy=e},r.compat=!0;var o=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var a=g(t,r.registered,void 0);return function(e,t,n){var r=e.key+"-"+t.name;if(void 0===e.registered[r]&&(e.registered[r]=t.styles),void 0===e.inserted[t.name]){var a=t;do{e.insert("."+r,a,e.sheet,!0),a=a.next}while(void 0!==a)}}(r,a),r.key+"-"+a.name};return{css:o,cx:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return w(r.registered,o,y(t))},injectGlobal:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var a=g(t,r.registered);b(r,a)},keyframes:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];var a=g(t,r.registered),i="animation-"+a.name;return b(r,{name:a.name,styles:"@keyframes "+i+"{"+a.styles+"}"}),i},hydrate:function(e){e.forEach((function(e){r.inserted[e]=!0}))},flush:function(){r.registered={},r.inserted={},r.sheet.flush()},sheet:r.sheet,cache:r,getRegisteredStyles:$.bind(null,r.registered),merge:w.bind(null,r.registered,o)}}(),k=x.flush,v=x.hydrate,C=x.cx,A=x.merge,j=x.getRegisteredStyles,z=x.injectGlobal,_=x.keyframes,S=x.css,O=x.sheet,E=x.cache;e.cache=E,e.css=S,e.cx=C,e.flush=k,e.getRegisteredStyles=j,e.hydrate=v,e.injectGlobal=z,e.keyframes=_,e.merge=A,e.sheet=O,Object.defineProperty(e,"__esModule",{value:!0})}(t)}(je={exports:{}},je.exports),je.exports),Se=(ze=_e)&&ze.__esModule&&Object.prototype.hasOwnProperty.call(ze,"default")?ze.default:ze;const{css:Oe}=Se,Ee={container:Oe`
    font-family: "Montserrat", sans-serif;
    box-sizing: border-box;

    @media (min-width: ${me.width}) {
      display: grid;
      grid-template-columns: ${pe} auto;
      grid-template-rows: 100vh;
      justify-items: stretch;
    }

    @media (min-width: ${he}) {
      grid-template-columns: ${"200px"} auto;
    }
  `};function Re(e){let t,n;const r=e[2].default,a=c(r,e,e[1],null),i=a||function(e){let t;return{c(){t=x("em"),t.textContent="Missing Content"},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}();return{c(){t=x("div"),i&&i.c(),A(t,"class",e[0])},m(e,r){b(e,t,r),i&&i.m(t,null),n=!0},p(e,[t]){a&&a.p&&2&t&&a.p(l(r,e,e[1],null),d(r,e[1],t,null))},i(e){n||(ee(i,e),n=!0)},o(e){te(i,e),n=!1},d(e){e&&w(t),i&&i.d(e)}}}function Ne(e,t,n){const{container:r}=Ee;let{$$slots:a={},$$scope:i}=t;return e.$set=e=>{"$$scope"in e&&n(1,i=e.$$scope)},[r,i,a]}class Pe extends ce{constructor(e){super(),se(this,e,Ne,Re,o,{})}}const{css:Me}=Se,Be={sidebar:Me`
    ${ve};
    box-sizing: border-box;
    background-image: url("../../public/bg.png");
    text-shadow: 0px 0px 2px black;
    font-size: 0.8rem;
    padding-top: ${me.height.header};

    @media (min-width: ${me.width}) {
      grid-column: 1 / span 1;
      grid-row: 1 / span 1;
      padding-top: ${ge.header};
    }

    @media (min-width: ${he}) {
      padding-top: ${$e};
    }
  `};function Le(e){let t,n,r;const a=e[2].default,i=c(a,e,e[1],null),o=i||function(e){let t;return{c(){t=x("em"),t.textContent="missing content"},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}();return{c(){t=x("aside"),o&&o.c(),A(t,"class",n=Be.sidebar)},m(e,n){b(e,t,n),o&&o.m(t,null),r=!0},p(e,[t]){i&&i.p&&2&t&&i.p(l(a,e,e[1],null),d(a,e[1],t,null))},i(e){r||(ee(o,e),r=!0)},o(e){te(o,e),r=!1},d(e){e&&w(t),o&&o.d(e)}}}function Je(e,t,n){const{container:r}=Be;let{$$slots:a={},$$scope:i}=t;return e.$set=e=>{"$$scope"in e&&n(1,i=e.$$scope)},[r,i,a]}class He extends ce{constructor(e){super(),se(this,e,Je,Le,o,{})}}const{css:Ge}=Se,Te={title:Ge`
    box-sizing: border-box;
    position: absolute;
    padding: ${be.small} ${be.large};
    z-index: 11;
    width: 100vw;

    h1 {
      ${ke};
      ${xe};
      ${ve};
      text-transform: uppercase;
      font-size: 2rem;
      margin: 0;
      text-align: center;
      color: ${ye.yellow};
    }

    @media (min-width: ${me.width}) {
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
  `};function Ie(t){let n,r,a;return{c(){n=x("div"),r=x("h1"),r.textContent="JameScript.com",A(n,"class",a=Te.title)},m(e,t){b(e,n,t),$(n,r)},p:e,i:e,o:e,d(e){e&&w(n)}}}class Xe extends ce{constructor(e){super(),se(this,e,null,Ie,o,{})}}const{css:Ye}=Se,Fe=Ye`
    border: 0px;
    cursor: pointer;
    text-align: center;
    color: ${ye.yellow};
    width: 25%;
    padding: ${be.small} ${be.large};
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

    @media (min-width: ${me.width}) {
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
        padding-right: ${be.xsmall};
        line-height: 2.1rem;
      }
    }
  `,Ve=Ye`
    &:hover {
      i {
        transform: scale(1.2);
      }

      @media (min-width: ${me.width}) {
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
  `,We=Ye`
     {
      ${xe};
      color: white;
      i {
        transform: scale(1.2);
      }

      @media (min-width: ${me.width}) {
        transform: translateX(${be.xLarge});
        width: 80%;
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
      @media (min-width: ${he}) {
        transform: translateX(${be.large});
        width: 100%;
        span {
          transform: scaleX(1);
        }
        i {
          transform: scale(0.8);
        }
      }
    }
  `;function Qe(t){let n,r,a,o,s,c,l,d,u,f=t[0].name+"";return{c(){n=x("button"),r=x("span"),a=k(f),o=v(),s=x("i"),A(s,"class",c="fab "+t[0].iconClass),A(n,"class",l=t[3]`
    ${Fe};
    ${t[2]?We:Ve};
    background-color: ${t[2]&&ye[t[0].color]};
    color: ${ye[t[0].color]};`),A(n,"data-name",d=t[0].name)},m(e,c,l){var d,f,m,h;b(e,n,c),$(n,r),$(r,a),$(n,o),$(n,s),l&&u(),f="click",m=function(){i(t[1])&&t[1].apply(this,arguments)},(d=n).addEventListener(f,m,h),u=()=>d.removeEventListener(f,m,h)},p(e,[r]){t=e,1&r&&f!==(f=t[0].name+"")&&j(a,f),1&r&&c!==(c="fab "+t[0].iconClass)&&A(s,"class",c),5&r&&l!==(l=t[3]`
    ${Fe};
    ${t[2]?We:Ve};
    background-color: ${t[2]&&ye[t[0].color]};
    color: ${ye[t[0].color]};`)&&A(n,"class",l),1&r&&d!==(d=t[0].name)&&A(n,"data-name",d)},i:e,o:e,d(e){e&&w(n),u()}}}function Ke(e,t,n){let r;s(e,Ce,e=>n(4,r=e));let{section:a}=t,{handleButtonClick:i}=t;const{css:o}=Se;let c;return M(()=>{n(2,c=a.name===r)}),e.$set=e=>{"section"in e&&n(0,a=e.section),"handleButtonClick"in e&&n(1,i=e.handleButtonClick)},[a,i,c,o]}class qe extends ce{constructor(e){super(),se(this,e,Ke,Qe,o,{section:0,handleButtonClick:1})}}const{css:De}=Se,Ue={nav:De`
    padding-top: ${be.mid};
  `};function Ze(e){let t,n,r;const a=e[2].default,i=c(a,e,e[1],null),o=i||function(e){let t;return{c(){t=x("em"),t.textContent="missing content"},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}();return{c(){t=x("nav"),o&&o.c(),A(t,"class",n=Ue.nav)},m(e,n){b(e,t,n),o&&o.m(t,null),r=!0},p(e,[t]){i&&i.p&&2&t&&i.p(l(a,e,e[1],null),d(a,e[1],t,null))},i(e){r||(ee(o,e),r=!0)},o(e){te(o,e),r=!1},d(e){e&&w(t),o&&o.d(e)}}}function et(e,t,n){const{container:r}=Ue;let{$$slots:a={},$$scope:i}=t;return e.$set=e=>{"$$scope"in e&&n(1,i=e.$$scope)},[r,i,a]}class tt extends ce{constructor(e){super(),se(this,e,et,Ze,o,{})}}const{css:nt}=Se,rt={links:nt`
    ${xe};
    padding: ${be.small} 0 ${be.small};
    text-align: center;

    h2 {
      ${ke};
      font-size: 1.8rem;
      margin: 0;
    }

    ul {
      list-style: none;
      padding: ${be.xSmall} 0 0;

      li {
        font-size: 0.9rem;
        a {
          ${ve};
          display: block;
          padding: ${be.xSmall} 0 0;
          line-height: 1.4rem;
        }
        a:hover {
          color: white;
          transform: translateX(-${be.xSmall});
        }
        i {
          margin-left: 0.6rem;
        }
      }
    }
    p {
      line-height: 1.2rem;
    }

    @media (min-width: ${me.width}) {
      padding: ${be.mid};
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
      padding: ${be.large};
    }
  `};function at(e,t,n){const r=e.slice();return r[1]=t[n],r}function it(t){let n,r,a,i,o,s,c,l,d=t[1].name+"";return{c(){n=x("li"),r=x("a"),a=k(d),i=v(),o=x("i"),l=v(),A(o,"class",s=t[1].iconClass),A(r,"href",c=t[1].url)},m(e,t){b(e,n,t),$(n,r),$(r,a),$(r,i),$(r,o),$(n,l)},p:e,d(e){e&&w(n)}}}function ot(t){let n,r,a,i,o,s=de,c=[];for(let e=0;e<s.length;e+=1)c[e]=it(at(t,s,e));return{c(){n=x("div"),r=x("h2"),r.textContent=""+st,a=v(),i=x("ul");for(let e=0;e<c.length;e+=1)c[e].c();A(n,"class",o=rt.links)},m(e,t){b(e,n,t),$(n,r),$(n,a),$(n,i);for(let e=0;e<c.length;e+=1)c[e].m(i,null)},p(e,[t]){if(0&t){let n;for(s=de,n=0;n<s.length;n+=1){const r=at(e,s,n);c[n]?c[n].p(r,t):(c[n]=it(r),c[n].c(),c[n].m(i,null))}for(;n<c.length;n+=1)c[n].d(1);c.length=s.length}},i:e,o:e,d(e){e&&w(n),y(c,e)}}}const st="Links";function ct(e){return[]}class lt extends ce{constructor(e){super(),se(this,e,ct,ot,o,{})}}const{css:dt}=Se;dt`
    padding: ${be.large};
    ${xe};
    h2 {
      font-size: 1.8rem;
      text-align: right;
      ${ke};
    }
    p {
      line-height: 1.2rem;
    }
  `;function ut(e){const t=e-1;return t*t*t+1}function ft(e){return--e*e*e*e*e+1}function mt(e,{delay:t=0,duration:n=400,easing:r=ut,x:a=0,y:i=0,opacity:o=0}){const s=getComputedStyle(e),c=+s.opacity,l="none"===s.transform?"":s.transform,d=c*(1-o);return{delay:t,duration:n,easing:r,css:(e,t)=>`\n\t\t\ttransform: ${l} translate(${(1-e)*a}px, ${(1-e)*i}px);\n\t\t\topacity: ${c-d*t}`}}const{css:ht}=Se,pt=ht`
    ${ve};
    box-sizing: border-box;
    padding-top: ${be.small};

    @media (min-width: ${me.width}) {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
      justify-self: stretch;
      padding-top: ${ge.header};
      overflow-y: scroll;
      position: relative;
    }

    @media (min-width: ${he}) {
      padding-top: ${$e};
    }
  `,{css:gt}=Se,$t={project:gt`
    box-sizing: border-box;
    border-radius: 5px;
    padding: ${be.mid};
    background-color: rgba(0, 0, 0, 0.5);
    margin: ${be.large} 0;
    width: 100%;

    h3 {
      margin: 0 0 ${be.xSmall};
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: bold;
      i {
        margin-right: ${be.xSmall};
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

    @media (min-width: ${me.width}) {
      margin: 0 0 ${be.large};
      h3 {
        font-size: 1.6rem;
      }
    }

    @media (min-width: ${he}) {
      margin: ${be.large} 0 calc(${be.large} * 2);
      h3 {
        font-size: 1.8rem;
        transform: translateY(-30px);
        color: rgba(0, 0, 0, 0.5);
        line-height: 0;

        i {
          display: none;
        }
      }

      p {
        i {
          display: inline-block;
          margin-right: ${be.xSmall};
        }
      }
    }
  `};function bt(e){let t,n,r,a,i,o=e[0].name+"";return{c(){t=x("h3"),n=x("i"),a=v(),i=k(o),A(n,"class",r=e[0].iconClass)},m(e,r){b(e,t,r),$(t,n),$(t,a),$(t,i)},p(e,t){1&t&&r!==(r=e[0].iconClass)&&A(n,"class",r),1&t&&o!==(o=e[0].name+"")&&j(i,o)},d(e){e&&w(t)}}}function wt(e){let t,n,r,a,i=e[0].url+"";return{c(){t=x("p"),n=x("a"),r=k(i),A(n,"href",a=e[0].url)},m(e,a){b(e,t,a),$(t,n),$(n,r)},p(e,t){1&t&&i!==(i=e[0].url+"")&&j(r,i),1&t&&a!==(a=e[0].url)&&A(n,"href",a)},d(e){e&&w(t)}}}function yt(e){let t,n,r,a,i,o=e[0].description+"";return{c(){t=x("p"),n=x("i"),a=v(),i=k(o),A(n,"class",r=e[0].iconClass)},m(e,r){b(e,t,r),$(t,n),$(t,a),$(t,i)},p(e,t){1&t&&r!==(r=e[0].iconClass)&&A(n,"class",r),1&t&&o!==(o=e[0].description+"")&&j(i,o)},d(e){e&&w(t)}}}function xt(e){let t,n=e[0].embed+"";return{c(){t=new z(n,null)},m(e,n){t.m(e,n)},p(e,r){1&r&&n!==(n=e[0].embed+"")&&t.p(n)},d(e){e&&t.d()}}}function kt(t){let n,r,a,i,o,s=t[0].name&&bt(t),c=t[0].url&&wt(t),l=t[0].description&&yt(t),d=t[0].embed&&xt(t);return{c(){n=x("div"),s&&s.c(),r=v(),c&&c.c(),a=v(),l&&l.c(),i=v(),d&&d.c(),A(n,"class",o=$t.project)},m(e,t){b(e,n,t),s&&s.m(n,null),$(n,r),c&&c.m(n,null),$(n,a),l&&l.m(n,null),$(n,i),d&&d.m(n,null)},p(e,[t]){e[0].name?s?s.p(e,t):(s=bt(e),s.c(),s.m(n,r)):s&&(s.d(1),s=null),e[0].url?c?c.p(e,t):(c=wt(e),c.c(),c.m(n,a)):c&&(c.d(1),c=null),e[0].description?l?l.p(e,t):(l=yt(e),l.c(),l.m(n,i)):l&&(l.d(1),l=null),e[0].embed?d?d.p(e,t):(d=xt(e),d.c(),d.m(n,null)):d&&(d.d(1),d=null)},i:e,o:e,d(e){e&&w(n),s&&s.d(),c&&c.d(),l&&l.d(),d&&d.d()}}}function vt(e,t,n){let{project:r}=t;return e.$set=e=>{"project"in e&&n(0,r=e.project)},[r]}class Ct extends ce{constructor(e){super(),se(this,e,vt,kt,o,{project:0})}}const{css:At}=Se,jt={section:At`
    box-sizing: border-box;
    padding: ${be.mid};

    h2 {
      ${ke};
      ${xe};
      margin: 0;
      font-size: 1.6rem;
      text-align: center;
      padding-bottom: 0;
      text-transform: uppercase;
    }

    @media (min-width: ${me.width}) {
      padding: ${be.mid} ${be.large};
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
    text-indent: ${be.mid};
    margin: ${be.mid} 0;
    line-height: 1.6rem;

    &::first-letter {
      font-size: 2rem;
    }

    @media (min-width: ${me.width}) {
      width: 80%;
    }
  `,link:At`
    ${xe};
    font-size: 1.2rem;
    text-align: center;
    margin: 0;

    @media (min-width: ${me.width}) {
      text-align: left;
      padding-bottom: ${be.mid};
    }

    @media (min-width: ${he}) {
      margin-bottom: ${be.mid};
      font-size: 2rem;
    }
  `};function zt(e,t,n){const r=e.slice();return r[4]=t[n],r}function _t(e){let t,n,r=e[0].name+"";return{c(){t=x("h2"),n=k(r)},m(e,r){b(e,t,r),$(t,n)},p(e,t){1&t&&r!==(r=e[0].name+"")&&j(n,r)},d(e){e&&w(t)}}}function St(e){let t,n,r,a,i,o=e[0].link+"";return{c(){t=x("p"),n=x("a"),r=k(o),A(n,"href",a=e[0].link),A(t,"class",i=jt.link)},m(e,a){b(e,t,a),$(t,n),$(n,r)},p(e,t){1&t&&o!==(o=e[0].link+"")&&j(r,o),1&t&&a!==(a=e[0].link)&&A(n,"href",a)},d(e){e&&w(t)}}}function Ot(e){let t,n,r=e[0].description+"";return{c(){t=x("p"),A(t,"class",n=jt.description)},m(e,n){b(e,t,n),t.innerHTML=r},p(e,n){1&n&&r!==(r=e[0].description+"")&&(t.innerHTML=r)},d(e){e&&w(t)}}}function Et(e){let t,n,r=e[0].technical+"";return{c(){t=x("p"),A(t,"class",n=jt.description)},m(e,n){b(e,t,n),t.innerHTML=r},p(e,n){1&n&&r!==(r=e[0].technical+"")&&(t.innerHTML=r)},d(e){e&&w(t)}}}function Rt(e){let t,n,r=e[0].projects,a=[];for(let t=0;t<r.length;t+=1)a[t]=Nt(zt(e,r,t));const i=e=>te(a[e],1,1,()=>{a[e]=null});return{c(){for(let e=0;e<a.length;e+=1)a[e].c();t=C()},m(e,r){for(let t=0;t<a.length;t+=1)a[t].m(e,r);b(e,t,r),n=!0},p(e,n){if(1&n){let o;for(r=e[0].projects,o=0;o<r.length;o+=1){const i=zt(e,r,o);a[o]?(a[o].p(i,n),ee(a[o],1)):(a[o]=Nt(i),a[o].c(),ee(a[o],1),a[o].m(t.parentNode,t))}for(U(),o=r.length;o<a.length;o+=1)i(o);Z()}},i(e){if(!n){for(let e=0;e<r.length;e+=1)ee(a[e]);n=!0}},o(e){a=a.filter(Boolean);for(let e=0;e<a.length;e+=1)te(a[e]);n=!1},d(e){y(a,e),e&&w(t)}}}function Nt(e){let t;const n=new Ct({props:{project:e[4]}});return{c(){re(n.$$.fragment)},m(e,r){ae(n,e,r),t=!0},p(e,t){const r={};1&t&&(r.project=e[4]),n.$set(r)},i(e){t||(ee(n.$$.fragment,e),t=!0)},o(e){te(n.$$.fragment,e),t=!1},d(e){ie(n,e)}}}function Pt(n){let r,o,s,c,l,d,u,m,h,p=n[0].name&&_t(n),y=n[0].link&&St(n),k=n[0].description&&Ot(n),C=n[0].technical&&Et(n),j=n[0].projects&&Rt(n);return{c(){r=x("div"),p&&p.c(),o=v(),y&&y.c(),s=v(),k&&k.c(),c=v(),C&&C.c(),l=v(),j&&j.c(),A(r,"class",d=n[1]`
    ${jt.section};
    section_${n[0].name.toLowerCase()};`)},m(e,t){b(e,r,t),p&&p.m(r,null),$(r,o),y&&y.m(r,null),$(r,s),k&&k.m(r,null),$(r,c),C&&C.m(r,null),$(r,l),j&&j.m(r,null),h=!0},p(e,[t]){e[0].name?p?p.p(e,t):(p=_t(e),p.c(),p.m(r,o)):p&&(p.d(1),p=null),e[0].link?y?y.p(e,t):(y=St(e),y.c(),y.m(r,s)):y&&(y.d(1),y=null),e[0].description?k?k.p(e,t):(k=Ot(e),k.c(),k.m(r,c)):k&&(k.d(1),k=null),e[0].technical?C?C.p(e,t):(C=Et(e),C.c(),C.m(r,l)):C&&(C.d(1),C=null),e[0].projects?j?(j.p(e,t),ee(j,1)):(j=Rt(e),j.c(),ee(j,1),j.m(r,null)):j&&(U(),te(j,1,1,()=>{j=null}),Z()),(!h||1&t&&d!==(d=e[1]`
    ${jt.section};
    section_${e[0].name.toLowerCase()};`))&&A(r,"class",d)},i(n){h||(ee(j),I(()=>{m&&m.end(1),u||(u=function(n,r,a){let o,s,c=r(n,a),l=!1,d=0;function u(){o&&R(n,o)}function m(){const{delay:r=0,duration:a=300,easing:i=t,tick:m=e,css:h}=c||ne;h&&(o=E(n,0,1,a,r,i,h,d++)),m(0,1);const p=f()+r,$=p+a;s&&s.abort(),l=!0,I(()=>K(n,!0,"start")),s=g(e=>{if(l){if(e>=$)return m(1,0),K(n,!0,"end"),u(),l=!1;if(e>=p){const t=i((e-p)/a);m(t,1-t)}}return l})}let h=!1;return{start(){h||(R(n),i(c)?(c=c(),Q().then(m)):m())},invalidate(){h=!1},end(){l&&(u(),l=!1)}}}(r,mt,{delay:50,duration:200,x:-20,opacity:0,easing:ft})),u.start()}),h=!0)},o(n){te(j),u&&u.invalidate(),m=function(n,r,o){let s,c=r(n,o),l=!0;const d=D;function u(){const{delay:r=0,duration:i=300,easing:o=t,tick:u=e,css:m}=c||ne;m&&(s=E(n,1,0,i,r,o,m));const h=f()+r,p=h+i;I(()=>K(n,!1,"start")),g(e=>{if(l){if(e>=p)return u(0,1),K(n,!1,"end"),--d.r||a(d.c),!1;if(e>=h){const t=o((e-h)/i);u(1-t,t)}}return l})}return d.r+=1,i(c)?Q().then(()=>{c=c(),u()}):u(),{end(e){e&&c.tick&&c.tick(1,0),l&&(s&&R(n,s),l=!1)}}}(r,mt,{delay:50,duration:200,x:20,opacity:0,easing:ft}),h=!1},d(e){e&&w(r),p&&p.d(),y&&y.d(),k&&k.d(),C&&C.d(),j&&j.d(),e&&m&&m.end()}}}function Mt(e,t,n){let r;s(e,Ae,e=>n(2,r=e));let{section:a}=t;const{css:i}=Se;return e.$set=e=>{"section"in e&&n(0,a=e.section)},[a,i]}class Bt extends ce{constructor(e){super(),se(this,e,Mt,Pt,o,{section:0})}}function Lt(e,t,n){const r=e.slice();return r[5]=t[n],r}function Jt(t){let n;const r=new Bt({props:{section:t[5]}});return{c(){re(r.$$.fragment)},m(e,t){ae(r,e,t),n=!0},p:e,i(e){n||(ee(r.$$.fragment,e),n=!0)},o(e){te(r.$$.fragment,e),n=!1},d(e){ie(r,e)}}}function Ht(e){let t,n,r=e[5].name===e[2]&&Jt(e);return{c(){r&&r.c(),t=C()},m(e,a){r&&r.m(e,a),b(e,t,a),n=!0},p(e,n){e[5].name===e[2]?r?(r.p(e,n),ee(r,1)):(r=Jt(e),r.c(),ee(r,1),r.m(t.parentNode,t)):r&&(U(),te(r,1,1,()=>{r=null}),Z())},i(e){n||(ee(r),n=!0)},o(e){te(r),n=!1},d(e){r&&r.d(e),e&&w(t)}}}function Gt(e){let t,n,r,a=le,i=[];for(let t=0;t<a.length;t+=1)i[t]=Ht(Lt(e,a,t));const o=e=>te(i[e],1,1,()=>{i[e]=null});return{c(){t=x("main");for(let e=0;e<i.length;e+=1)i[e].c();A(t,"class",n=e[3]`
    ${pt};
    background: linear-gradient(${e[1]}deg, rgba(${we[e[0].color]}, 1) 0%, rgba(${we[e[0].color]}, 0.5) 100%);`)},m(e,n){b(e,t,n);for(let e=0;e<i.length;e+=1)i[e].m(t,null);r=!0},p(e,[s]){if(4&s){let n;for(a=le,n=0;n<a.length;n+=1){const r=Lt(e,a,n);i[n]?(i[n].p(r,s),ee(i[n],1)):(i[n]=Ht(r),i[n].c(),ee(i[n],1),i[n].m(t,null))}for(U(),n=a.length;n<i.length;n+=1)o(n);Z()}(!r||3&s&&n!==(n=e[3]`
    ${pt};
    background: linear-gradient(${e[1]}deg, rgba(${we[e[0].color]}, 1) 0%, rgba(${we[e[0].color]}, 0.5) 100%);`))&&A(t,"class",n)},i(e){if(!r){for(let e=0;e<a.length;e+=1)ee(i[e]);r=!0}},o(e){i=i.filter(Boolean);for(let e=0;e<i.length;e+=1)te(i[e]);r=!1},d(e){e&&w(t),y(i,e)}}}function Tt(e,t,n){let r,a;s(e,Ae,e=>n(4,r=e)),s(e,Ce,e=>n(2,a=e));const{css:i}=Se;let o=le[0],c=r?180:90;return M(()=>{n(0,o=le.find(e=>e.name===a)),n(1,c=r?180:90)}),[o,c,a,i]}class It extends ce{constructor(e){super(),se(this,e,Tt,Gt,o,{})}}const{css:Xt}=Se,Yt={footer:Xt`
    box-sizing: border-box;
    padding: ${be.mid};
    text-align: center;

    @media (min-width: ${me.width}) {
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
  `};function Ft(e){let t,n,r,a,i;const o=e[2].default,s=c(o,e,e[1],null),u=s||function(e){let t;return{c(){t=x("em"),t.textContent="Missing Content"},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}();return{c(){t=x("footer"),u&&u.c(),n=v(),r=x("p"),r.textContent="James Augustus Hall ©",A(t,"class",a=Yt.footer)},m(e,a){b(e,t,a),u&&u.m(t,null),$(t,n),$(t,r),i=!0},p(e,[t]){s&&s.p&&2&t&&s.p(l(o,e,e[1],null),d(o,e[1],t,null))},i(e){i||(ee(u,e),i=!0)},o(e){te(u,e),i=!1},d(e){e&&w(t),u&&u.d(e)}}}function Vt(e,t,n){const{container:r}=Yt;let{$$slots:a={},$$scope:i}=t;return e.$set=e=>{"$$scope"in e&&n(1,i=e.$$scope)},[r,i,a]}class Wt extends ce{constructor(e){super(),se(this,e,Vt,Ft,o,{})}}function Qt(e,t,n){const r=e.slice();return r[3]=t[n],r}function Kt(t){let n;const r=new qe({props:{section:t[3],handleButtonClick:t[1]}});return{c(){re(r.$$.fragment)},m(e,t){ae(r,e,t),n=!0},p:e,i(e){n||(ee(r.$$.fragment,e),n=!0)},o(e){te(r.$$.fragment,e),n=!1},d(e){ie(r,e)}}}function qt(e){let t,n,r=le,a=[];for(let t=0;t<r.length;t+=1)a[t]=Kt(Qt(e,r,t));const i=e=>te(a[e],1,1,()=>{a[e]=null});return{c(){for(let e=0;e<a.length;e+=1)a[e].c();t=C()},m(e,r){for(let t=0;t<a.length;t+=1)a[t].m(e,r);b(e,t,r),n=!0},p(e,n){if(2&n){let o;for(r=le,o=0;o<r.length;o+=1){const i=Qt(e,r,o);a[o]?(a[o].p(i,n),ee(a[o],1)):(a[o]=Kt(i),a[o].c(),ee(a[o],1),a[o].m(t.parentNode,t))}for(U(),o=r.length;o<a.length;o+=1)i(o);Z()}},i(e){if(!n){for(let e=0;e<r.length;e+=1)ee(a[e]);n=!0}},o(e){a=a.filter(Boolean);for(let e=0;e<a.length;e+=1)te(a[e]);n=!1},d(e){y(a,e),e&&w(t)}}}function Dt(e){let t,n;const r=new lt({}),a=new Wt({props:{$$slots:{default:[Ut]},$$scope:{ctx:e}}});return{c(){re(r.$$.fragment),t=v(),re(a.$$.fragment)},m(e,i){ae(r,e,i),b(e,t,i),ae(a,e,i),n=!0},i(e){n||(ee(r.$$.fragment,e),ee(a.$$.fragment,e),n=!0)},o(e){te(r.$$.fragment,e),te(a.$$.fragment,e),n=!1},d(e){ie(r,e),e&&w(t),ie(a,e)}}}function Ut(e){let t;return{c(){t=x("i"),A(t,"class","fas fa-coffee")},m(e,n){b(e,t,n)},d(e){e&&w(t)}}}function Zt(e){let t,n,r;const a=new tt({props:{$$slots:{default:[qt]},$$scope:{ctx:e}}});let i=!e[0]&&Dt(e);return{c(){re(a.$$.fragment),t=v(),i&&i.c(),n=C()},m(e,o){ae(a,e,o),b(e,t,o),i&&i.m(e,o),b(e,n,o),r=!0},p(e,t){const r={};64&t&&(r.$$scope={dirty:t,ctx:e}),a.$set(r),e[0]?i&&(U(),te(i,1,1,()=>{i=null}),Z()):i?ee(i,1):(i=Dt(e),i.c(),ee(i,1),i.m(n.parentNode,n))},i(e){r||(ee(a.$$.fragment,e),ee(i),r=!0)},o(e){te(a.$$.fragment,e),te(i),r=!1},d(e){ie(a,e),e&&w(t),i&&i.d(e),e&&w(n)}}}function en(e){let t;const n=new Wt({props:{$$slots:{default:[tn]},$$scope:{ctx:e}}});return{c(){re(n.$$.fragment)},m(e,r){ae(n,e,r),t=!0},i(e){t||(ee(n.$$.fragment,e),t=!0)},o(e){te(n.$$.fragment,e),t=!1},d(e){ie(n,e)}}}function tn(e){let t;const n=new lt({});return{c(){re(n.$$.fragment)},m(e,r){ae(n,e,r),t=!0},i(e){t||(ee(n.$$.fragment,e),t=!0)},o(e){te(n.$$.fragment,e),t=!1},d(e){ie(n,e)}}}function nn(e){let t,n,r,a,i;const o=new Xe({}),s=new He({props:{$$slots:{default:[Zt]},$$scope:{ctx:e}}}),c=new It({});let l=e[0]&&en(e);return{c(){re(o.$$.fragment),t=v(),re(s.$$.fragment),n=v(),re(c.$$.fragment),r=v(),l&&l.c(),a=C()},m(e,d){ae(o,e,d),b(e,t,d),ae(s,e,d),b(e,n,d),ae(c,e,d),b(e,r,d),l&&l.m(e,d),b(e,a,d),i=!0},p(e,t){const n={};65&t&&(n.$$scope={dirty:t,ctx:e}),s.$set(n),e[0]?l?ee(l,1):(l=en(e),l.c(),ee(l,1),l.m(a.parentNode,a)):l&&(U(),te(l,1,1,()=>{l=null}),Z())},i(e){i||(ee(o.$$.fragment,e),ee(s.$$.fragment,e),ee(c.$$.fragment,e),ee(l),i=!0)},o(e){te(o.$$.fragment,e),te(s.$$.fragment,e),te(c.$$.fragment,e),te(l),i=!1},d(e){ie(o,e),e&&w(t),ie(s,e),e&&w(n),ie(c,e),e&&w(r),l&&l.d(e),e&&w(a)}}}function rn(e){let t;const n=new Pe({props:{$$slots:{default:[nn]},$$scope:{ctx:e}}});return{c(){re(n.$$.fragment)},m(e,r){ae(n,e,r),t=!0},p(e,[t]){const r={};65&t&&(r.$$scope={dirty:t,ctx:e}),n.$set(r)},i(e){t||(ee(n.$$.fragment,e),t=!0)},o(e){te(n.$$.fragment,e),t=!1},d(e){ie(n,e)}}}function an(e,t,n){let r;s(e,Ae,e=>n(0,r=e));const a=e=>{Ae.set(window.innerWidth<me.width.split("px")[0])};return function(e){P().$$.on_mount.push(e)}(()=>{window.addEventListener("resize",a)}),function(e){P().$$.on_destroy.push(e)}(()=>{window.removeEventListener("resize",a)}),[r,e=>{Ce.set(e.currentTarget.dataset.name)}]}return new class extends ce{constructor(e){super(),se(this,e,an,rn,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
