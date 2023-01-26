(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[414],{8017:function(e,t,n){"use strict";n.d(t,{v:function(){return E}});var r=n(5893),i=n(7294),l=n(3241);let o={heading1:"heading1",heading2:"heading2",heading3:"heading3",heading4:"heading4",heading5:"heading5",heading6:"heading6",paragraph:"paragraph",preformatted:"preformatted",strong:"strong",em:"em",listItem:"list-item",oListItem:"o-list-item",list:"group-list-item",oList:"group-o-list-item",image:"image",embed:"embed",hyperlink:"hyperlink",label:"label",span:"span"},s={[o.listItem]:"listItem",[o.oListItem]:"oListItem",[o.list]:"list",[o.oList]:"oList"},a=e=>(t,n,r,i,l)=>{let o=e[s[t]||t];if(o)return o({type:t,node:n,text:r,children:i,key:l})},u=(...e)=>(...t)=>{for(let n=0;n<e.length;n++){let r=e[n];if(r){let e=r(...t);if(null!=e)return e}}},d=()=>(++d.i).toString();d.i=0;let p=e=>{let t=f(e),n=[];for(let e=0;e<t.length;e++)n.push(h(t[e]));return{key:d(),children:n}},c=(e,t=[])=>({key:d(),type:e.type,text:"text"in e?e.text:void 0,node:e,children:t}),m=e=>c({type:o.span,text:e,spans:[]}),f=e=>{let t=e.slice(0);for(let e=0;e<t.length;e++){let n=t[e];if(n.type===o.listItem||n.type===o.oListItem){let r=[n];for(;t[e+1]&&t[e+1].type===n.type;)r.push(t[e+1]),t.splice(e,1);n.type===o.listItem?t[e]={type:o.list,items:r}:t[e]={type:o.oList,items:r}}}return t},h=e=>{if("text"in e)return c(e,g(e.spans,e));if("items"in e){let t=[];for(let n=0;n<e.items.length;n++)t.push(h(e.items[n]));return c(e,t)}return c(e)},g=(e,t,n)=>{if(!e.length)return[m(t.text)];let r=e.slice(0);r.sort((e,t)=>e.start-t.start||t.end-e.end);let i=[];for(let e=0;e<r.length;e++){let l=r[e],o=n&&n.start||0,s=l.start-o,a=l.end-o,u=t.text.slice(s,a),d=[];for(let t=e;t<r.length;t++){let e=r[t];e!==l&&(e.start>=l.start&&e.end<=l.end?(d.push(e),r.splice(t,1),t--):e.start<l.end&&e.end>l.start&&(d.push({...e,end:l.end}),r[t]={...e,start:l.end}))}0===e&&s>0&&i.push(m(t.text.slice(0,s)));let p={...l,text:u};i.push(c(p,g(d,{...t,text:u},l))),a<t.text.length&&i.push(m(t.text.slice(a,r[e+1]?r[e+1].start-o:void 0)))}return i},y=(e,t)=>v(p(e).children,t),v=(e,t)=>{let n=[];for(let r=0;r<e.length;r++){let i=e[r],l=t(i.type,i.node,i.text,v(i.children,t),i.key);null!=l&&n.push(l)}return n},x={Any:"Any",Document:"Document",Media:"Media",Web:"Web"},k=e=>{var t;return{link_type:x.Document,id:e.id,uid:e.uid??void 0,type:e.type,tags:e.tags,lang:e.lang,url:e.url??void 0,slug:null==(t=e.slugs)?void 0:t[0],...e.data&&Object.keys(e.data).length>0?{data:e.data}:{}}},b=(e,t)=>{if(!e)return null;let n="link_type"in e?e:k(e);switch(n.link_type){case x.Media:case x.Web:return"url"in n?n.url:null;case x.Document:if("id"in n&&t){let e=t(n);if(null!=e)return e}if("url"in n&&n.url)return n.url;return null;case x.Any:default:return null}};var j=n(2194),L=n(4253);let T=e=>{let t=/^(\/(?!\/)|#)/.test(e),n=!t&&!/^https?:\/\//.test(e);return t&&!n},C=i.createContext({}),_=()=>i.useContext(C)||{},w=(e,t)=>{let n;let i=_();if(!j.N){if("field"in e&&e.field){if(e.field.link_type)Object.keys(e.field).length>1&&!("url"in e.field||"uid"in e.field||"id"in e.field)&&console.warn(`[PrismicLink] The provided field is missing required properties to properly render a link. The link may not render correctly. For more details, see ${(0,L._)("missing-link-properties")}`,e.field);else throw console.error(`[PrismicLink] This "field" prop value caused an error to be thrown.
`,e.field),Error(`[PrismicLink] The provided field is missing required properties to properly render a link. The link will not render. For more details, see ${(0,L._)("missing-link-properties")}`)}else"document"in e&&e.document&&!("url"in e.document||"id"in e.document)&&console.warn(`[PrismicLink] The provided document is missing required properties to properly render a link. The link may not render correctly. For more details, see ${(0,L._)("missing-link-properties")}`,e.document)}let l=e.linkResolver||i.linkResolver;"href"in e?n=e.href:"document"in e&&e.document?n=b(e.document,l):"field"in e&&e.field&&(n=b(e.field,l));let o=n&&T(n),s=e.target||"field"in e&&e.field&&"target"in e.field&&e.field.target||!o&&"_blank"||void 0,a=e.rel||("_blank"===s?"noopener noreferrer":void 0),u=e.internalComponent||i.internalLinkComponent||"a",d=e.externalComponent||i.externalLinkComponent||"a",p=Object.assign({},e);return delete p.linkResolver,delete p.internalComponent,delete p.externalComponent,delete p.rel,delete p.target,"field"in p?delete p.field:"document"in p?delete p.document:"href"in p&&delete p.href,n?(0,r.jsx)(o?u:d,{...p,ref:t,href:n,target:s,rel:a}):null};j.N||(w.displayName="PrismicLink");let I=i.forwardRef(w),R=e=>a({heading1:({children:e,key:t})=>(0,r.jsx)("h1",{children:e},t),heading2:({children:e,key:t})=>(0,r.jsx)("h2",{children:e},t),heading3:({children:e,key:t})=>(0,r.jsx)("h3",{children:e},t),heading4:({children:e,key:t})=>(0,r.jsx)("h4",{children:e},t),heading5:({children:e,key:t})=>(0,r.jsx)("h5",{children:e},t),heading6:({children:e,key:t})=>(0,r.jsx)("h6",{children:e},t),paragraph:({children:e,key:t})=>(0,r.jsx)("p",{children:e},t),preformatted:({node:e,key:t})=>(0,r.jsx)("pre",{children:e.text},t),strong:({children:e,key:t})=>(0,r.jsx)("strong",{children:e},t),em:({children:e,key:t})=>(0,r.jsx)("em",{children:e},t),listItem:({children:e,key:t})=>(0,r.jsx)("li",{children:e},t),oListItem:({children:e,key:t})=>(0,r.jsx)("li",{children:e},t),list:({children:e,key:t})=>(0,r.jsx)("ul",{children:e},t),oList:({children:e,key:t})=>(0,r.jsx)("ol",{children:e},t),image:({node:t,key:n})=>{let i=(0,r.jsx)("img",{src:t.url,alt:t.alt??void 0,"data-copyright":t.copyright?t.copyright:void 0});return(0,r.jsx)("p",{className:"block-img",children:t.linkTo?(0,r.jsx)(I,{linkResolver:e.linkResolver,internalComponent:e.internalLinkComponent,externalComponent:e.externalLinkComponent,field:t.linkTo,children:i}):i},n)},embed:({node:e,key:t})=>(0,r.jsx)("div",{"data-oembed":e.oembed.embed_url,"data-oembed-type":e.oembed.type,"data-oembed-provider":e.oembed.provider_name,dangerouslySetInnerHTML:{__html:e.oembed.html??""}},t),hyperlink:({node:t,children:n,key:i})=>(0,r.jsx)(I,{field:t.data,linkResolver:e.linkResolver,internalComponent:e.internalLinkComponent,externalComponent:e.externalLinkComponent,children:n},i),label:({node:e,children:t,key:n})=>(0,r.jsx)("span",{className:e.data.label,children:t},n),span:({text:e,key:t})=>{let n=[],l=0;for(let t of e.split("\n"))l>0&&n.push((0,r.jsx)("br",{},`${l}__break`)),n.push((0,r.jsx)(i.Fragment,{children:t},`${l}__line`)),l++;return(0,r.jsx)(i.Fragment,{children:n},t)}}),E=e=>{let t=_();return i.useMemo(()=>{if(!l.qO(e.field))return null!=e.fallback?(0,r.jsx)(r.Fragment,{children:e.fallback}):null;{let n=e.linkResolver||t.linkResolver,l=u("object"==typeof e.components?a(e.components):e.components,"object"==typeof t.richTextComponents?a(t.richTextComponents):t.richTextComponents,R({linkResolver:n,internalLinkComponent:e.internalLinkComponent,externalLinkComponent:e.externalLinkComponent})),o=y(e.field,(e,t,n,r,o)=>{let s=l(e,t,n,r,o);return i.isValidElement(s)&&null==s.key?i.cloneElement(s,{key:o}):s});return(0,r.jsx)(r.Fragment,{children:o})}},[e.field,e.internalLinkComponent,e.externalLinkComponent,e.components,e.linkResolver,e.fallback,t.linkResolver,t.richTextComponents])}},2194:function(e,t,n){"use strict";n.d(t,{N:function(){return r}}),void 0===n(3454)&&(globalThis.process={env:{}});let r=!0},4253:function(e,t,n){"use strict";n.d(t,{_:function(){return r}});let r=e=>`https://prismic.dev/msg/react/v2.5.1/${e}`},4184:function(e,t){var n;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/!function(){"use strict";var r={}.hasOwnProperty;function i(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var l=typeof n;if("string"===l||"number"===l)e.push(n);else if(Array.isArray(n)){if(n.length){var o=i.apply(null,n);o&&e.push(o)}}else if("object"===l){if(n.toString!==Object.prototype.toString&&!n.toString.toString().includes("[native code]")){e.push(n.toString());continue}for(var s in n)r.call(n,s)&&n[s]&&e.push(s)}}}return e.join(" ")}e.exports?(i.default=i,e.exports=i):void 0!==(n=(function(){return i}).apply(t,[]))&&(e.exports=n)}()},3454:function(e,t,n){"use strict";var r,i;e.exports=(null==(r=n.g.process)?void 0:r.env)&&"object"==typeof(null==(i=n.g.process)?void 0:i.env)?n.g.process:n(7663)},7663:function(e){!function(){var t={229:function(e){var t,n,r,i=e.exports={};function l(){throw Error("setTimeout has not been defined")}function o(){throw Error("clearTimeout has not been defined")}function s(e){if(t===setTimeout)return setTimeout(e,0);if((t===l||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:l}catch(e){t=l}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var a=[],u=!1,d=-1;function p(){u&&r&&(u=!1,r.length?a=r.concat(a):d=-1,a.length&&c())}function c(){if(!u){var e=s(p);u=!0;for(var t=a.length;t;){for(r=a,a=[];++d<t;)r&&r[d].run();d=-1,t=a.length}r=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function m(e,t){this.fun=e,this.array=t}function f(){}i.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];a.push(new m(e,t)),1!==a.length||u||s(c)},m.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=f,i.addListener=f,i.once=f,i.off=f,i.removeListener=f,i.removeAllListeners=f,i.emit=f,i.prependListener=f,i.prependOnceListener=f,i.listeners=function(e){return[]},i.binding=function(e){throw Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw Error("process.chdir is not supported")},i.umask=function(){return 0}}},n={};function r(e){var i=n[e];if(void 0!==i)return i.exports;var l=n[e]={exports:{}},o=!0;try{t[e](l,l.exports,r),o=!1}finally{o&&delete n[e]}return l.exports}r.ab="//";var i=r(229);e.exports=i}()},3241:function(e,t,n){"use strict";n.d(t,{S$:function(){return l},qO:function(){return i}});let r=e=>null!=e,i=e=>!!r(e)&&(1===e.length&&"text"in e[0]?!!e[0].text:!!e.length),l=e=>r(e)&&!!e.url,o=e=>r(o)&&!!e}}]);