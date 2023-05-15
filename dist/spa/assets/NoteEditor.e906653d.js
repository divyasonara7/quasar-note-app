import{n as vt,a as re,c as b,h as p,b as se,r as B,aj as gt,z as ce,e as De,x as de,w as P,d as ue,o as U,g as te,C as ke,l as xe,ar as Ee,u as pt,Y as yt,N as _e,E as We,as as qe,O as je,F as Ie,at as Qe,P as Ue,au as Ke,R as Ge,av as Ve,aw as bt,B as wt,ax as Ct,ay as He,p as Xe,az as kt,T as Ye,aA as xt,aB as Je,aC as St,D as Be,aD as Ze,aE as Tt,aF as qt,ac as et,a9 as R,A as tt,aG as ot,aH as Bt,aI as Pt,aJ as Oe,aK as Et,a3 as Ht,$ as Ot,am as zt,aL as Lt,a4 as $t,a5 as ie,a6 as pe,a7 as Z,a8 as ee,an as ze,aa as Le,aM as $e,aN as Nt,ad as ye}from"./index.d397fa6f.js";import{c as Se}from"./selection.5036a1ca.js";import{a as Ne,Q as At}from"./QItem.4e95f650.js";import{Q as Rt}from"./QPage.1e85232e.js";import{C as Mt}from"./Container.8e1c36cd.js";import{a as Ft,c as Dt,u as _t}from"./notes.edf89f49.js";function nt(e,t){if(t&&e===t)return null;const o=e.nodeName.toLowerCase();if(["div","li","ul","ol","blockquote"].includes(o)===!0)return e;const n=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,l=n.display;return l==="block"||l==="table"?e:nt(e.parentNode)}function be(e,t,o){return!e||e===document.body?!1:o===!0&&e===t||(t===document?document.body:t).contains(e.parentNode)}function lt(e,t,o){if(o||(o=document.createRange(),o.selectNode(e),o.setStart(e,0)),t.count===0)o.setEnd(e,t.count);else if(t.count>0)if(e.nodeType===Node.TEXT_NODE)e.textContent.length<t.count?t.count-=e.textContent.length:(o.setEnd(e,t.count),t.count=0);else for(let n=0;t.count!==0&&n<e.childNodes.length;n++)o=lt(e.childNodes[n],t,o);return o}const Wt=/^https?:\/\//;class jt{constructor(t,o){this.el=t,this.eVm=o,this._range=null}get selection(){if(this.el){const t=document.getSelection();if(be(t.anchorNode,this.el,!0)&&be(t.focusNode,this.el,!0))return t}return null}get hasSelection(){return this.selection!==null?this.selection.toString().length>0:!1}get range(){const t=this.selection;return t!==null&&t.rangeCount?t.getRangeAt(0):this._range}get parent(){const t=this.range;if(t!==null){const o=t.startContainer;return o.nodeType===document.ELEMENT_NODE?o:o.parentNode}return null}get blockParent(){const t=this.parent;return t!==null?nt(t,this.el):null}save(t=this.range){t!==null&&(this._range=t)}restore(t=this._range){const o=document.createRange(),n=document.getSelection();t!==null?(o.setStart(t.startContainer,t.startOffset),o.setEnd(t.endContainer,t.endOffset),n.removeAllRanges(),n.addRange(o)):(n.selectAllChildren(this.el),n.collapseToEnd())}savePosition(){let t=-1,o;const n=document.getSelection(),l=this.el.parentNode;if(n.focusNode&&be(n.focusNode,l))for(o=n.focusNode,t=n.focusOffset;o&&o!==l;)o!==this.el&&o.previousSibling?(o=o.previousSibling,t+=o.textContent.length):o=o.parentNode;this.savedPos=t}restorePosition(t=0){if(this.savedPos>0&&this.savedPos<t){const o=window.getSelection(),n=lt(this.el,{count:this.savedPos});n&&(n.collapse(!1),o.removeAllRanges(),o.addRange(n))}}hasParent(t,o){const n=o?this.parent:this.blockParent;return n!==null?n.nodeName.toLowerCase()===t.toLowerCase():!1}hasParents(t,o,n=this.parent){return n===null?!1:t.includes(n.nodeName.toLowerCase())===!0?!0:o===!0?this.hasParents(t,o,n.parentNode):!1}is(t,o){if(this.selection===null)return!1;switch(t){case"formatBlock":return o==="DIV"&&this.parent===this.el||this.hasParent(o,o==="PRE");case"link":return this.hasParent("A",!0);case"fontSize":return document.queryCommandValue(t)===o;case"fontName":const n=document.queryCommandValue(t);return n===`"${o}"`||n===o;case"fullscreen":return this.eVm.inFullscreen.value;case"viewsource":return this.eVm.isViewingSource.value;case void 0:return!1;default:const l=document.queryCommandState(t);return o!==void 0?l===o:l}}getParentAttribute(t){return this.parent!==null?this.parent.getAttribute(t):null}can(t){if(t==="outdent")return this.hasParents(["blockquote","li"],!0);if(t==="indent")return this.hasParents(["li"],!0);if(t==="link")return this.selection!==null||this.is("link")}apply(t,o,n=vt){if(t==="formatBlock")["BLOCKQUOTE","H1","H2","H3","H4","H5","H6"].includes(o)&&this.is(t,o)&&(t="outdent",o=null),o==="PRE"&&this.is(t,"PRE")&&(o="P");else if(t==="print"){n();const l=window.open();l.document.write(`
        <!doctype html>
        <html>
          <head>
            <title>Print - ${document.title}</title>
          </head>
          <body>
            <div>${this.el.innerHTML}</div>
          </body>
        </html>
      `),l.print(),l.close();return}else if(t==="link"){const l=this.getParentAttribute("href");if(l===null){const u=this.selectWord(this.selection),a=u?u.toString():"";if(!a.length&&(!this.range||!this.range.cloneContents().querySelector("img")))return;this.eVm.editLinkUrl.value=Wt.test(a)?a:"https://",document.execCommand("createLink",!1,this.eVm.editLinkUrl.value),this.save(u.getRangeAt(0))}else this.eVm.editLinkUrl.value=l,this.range.selectNodeContents(this.parent),this.save();return}else if(t==="fullscreen"){this.eVm.toggleFullscreen(),n();return}else if(t==="viewsource"){this.eVm.isViewingSource.value=this.eVm.isViewingSource.value===!1,this.eVm.setContent(this.eVm.props.modelValue),n();return}document.execCommand(t,!1,o),n()}selectWord(t){if(t===null||t.isCollapsed!==!0||t.modify===void 0)return t;const o=document.createRange();o.setStart(t.anchorNode,t.anchorOffset),o.setEnd(t.focusNode,t.focusOffset);const n=o.collapsed?["backward","forward"]:["forward","backward"];o.detach();const l=t.focusNode,u=t.focusOffset;return t.collapse(t.anchorNode,t.anchorOffset),t.modify("move",n[0],"character"),t.modify("move",n[1],"word"),t.extend(l,u),t.modify("extend",n[1],"character"),t.modify("extend",n[0],"word"),t}}var It=re({name:"QBtnGroup",props:{unelevated:Boolean,outline:Boolean,flat:Boolean,rounded:Boolean,square:Boolean,push:Boolean,stretch:Boolean,glossy:Boolean,spread:Boolean},setup(e,{slots:t}){const o=b(()=>{const n=["unelevated","outline","flat","rounded","square","push","stretch","glossy"].filter(l=>e[l]===!0).map(l=>`q-btn-group--${l}`).join(" ");return`q-btn-group row no-wrap${n.length>0?" "+n:""}`+(e.spread===!0?" q-btn-group--spread":" inline")});return()=>p("div",{class:o.value},se(t.default))}});const it={target:{default:!0},noParentEvent:Boolean,contextMenu:Boolean};function at({showing:e,avoidEmit:t,configureAnchorEl:o}){const{props:n,proxy:l,emit:u}=te(),a=B(null);let s=null;function d(c){return a.value===null?!1:c===void 0||c.touches===void 0||c.touches.length<=1}const f={};o===void 0&&(Object.assign(f,{hide(c){l.hide(c)},toggle(c){l.toggle(c),c.qAnchorHandled=!0},toggleKey(c){gt(c,13)===!0&&f.toggle(c)},contextClick(c){l.hide(c),ce(c),De(()=>{l.show(c),c.qAnchorHandled=!0})},prevent:ce,mobileTouch(c){if(f.mobileCleanup(c),d(c)!==!0)return;l.hide(c),a.value.classList.add("non-selectable");const k=c.target;de(f,"anchor",[[k,"touchmove","mobileCleanup","passive"],[k,"touchend","mobileCleanup","passive"],[k,"touchcancel","mobileCleanup","passive"],[a.value,"contextmenu","prevent","notPassive"]]),s=setTimeout(()=>{s=null,l.show(c),c.qAnchorHandled=!0},300)},mobileCleanup(c){a.value.classList.remove("non-selectable"),s!==null&&(clearTimeout(s),s=null),e.value===!0&&c!==void 0&&Se()}}),o=function(c=n.contextMenu){if(n.noParentEvent===!0||a.value===null)return;let k;c===!0?l.$q.platform.is.mobile===!0?k=[[a.value,"touchstart","mobileTouch","passive"]]:k=[[a.value,"mousedown","hide","passive"],[a.value,"contextmenu","contextClick","notPassive"]]:k=[[a.value,"click","toggle","passive"],[a.value,"keyup","toggleKey","passive"]],de(f,"anchor",k)});function h(){ke(f,"anchor")}function y(c){for(a.value=c;a.value.classList.contains("q-anchor--skip");)a.value=a.value.parentNode;o()}function v(){if(n.target===!1||n.target===""||l.$el.parentNode===null)a.value=null;else if(n.target===!0)y(l.$el.parentNode);else{let c=n.target;if(typeof n.target=="string")try{c=document.querySelector(n.target)}catch{c=void 0}c!=null?(a.value=c.$el||c,o()):(a.value=null,console.error(`Anchor: target "${n.target}" not found`))}}return P(()=>n.contextMenu,c=>{a.value!==null&&(h(),o(c))}),P(()=>n.target,()=>{a.value!==null&&h(),v()}),P(()=>n.noParentEvent,c=>{a.value!==null&&(c===!0?h():o())}),ue(()=>{v(),t!==!0&&n.modelValue===!0&&a.value===null&&u("update:modelValue",!1)}),U(()=>{s!==null&&clearTimeout(s),h()}),{anchorEl:a,canShow:d,anchorEvents:f}}function rt(e,t){const o=B(null);let n;function l(s,d){const f=`${d!==void 0?"add":"remove"}EventListener`,h=d!==void 0?d:n;s!==window&&s[f]("scroll",h,xe.passive),window[f]("scroll",h,xe.passive),n=d}function u(){o.value!==null&&(l(o.value),o.value=null)}const a=P(()=>e.noParentEvent,()=>{o.value!==null&&(u(),t())});return U(a),{localScrollTarget:o,unconfigureScrollTarget:u,changeScrollEvent:l}}const{notPassiveCapture:fe}=xe,Q=[];function he(e){const t=e.target;if(t===void 0||t.nodeType===8||t.classList.contains("no-pointer-events")===!0)return;let o=Ee.length-1;for(;o>=0;){const n=Ee[o].$;if(n.type.name!=="QDialog")break;if(n.props.seamless!==!0)return;o--}for(let n=Q.length-1;n>=0;n--){const l=Q[n];if((l.anchorEl.value===null||l.anchorEl.value.contains(t)===!1)&&(t===document.body||l.innerRef.value!==null&&l.innerRef.value.contains(t)===!1))e.qClickOutside=!0,l.onClickOutside(e);else return}}function st(e){Q.push(e),Q.length===1&&(document.addEventListener("mousedown",he,fe),document.addEventListener("touchstart",he,fe))}function me(e){const t=Q.findIndex(o=>o===e);t>-1&&(Q.splice(t,1),Q.length===0&&(document.removeEventListener("mousedown",he,fe),document.removeEventListener("touchstart",he,fe)))}let Ae,Re;function ve(e){const t=e.split(" ");return t.length!==2?!1:["top","center","bottom"].includes(t[0])!==!0?(console.error("Anchor/Self position must start with one of top/center/bottom"),!1):["left","middle","right","start","end"].includes(t[1])!==!0?(console.error("Anchor/Self position must end with one of left/middle/right/start/end"),!1):!0}function ut(e){return e?!(e.length!==2||typeof e[0]!="number"||typeof e[1]!="number"):!0}const Te={"start#ltr":"left","start#rtl":"right","end#ltr":"right","end#rtl":"left"};["left","middle","right"].forEach(e=>{Te[`${e}#ltr`]=e,Te[`${e}#rtl`]=e});function ge(e,t){const o=e.split(" ");return{vertical:o[0],horizontal:Te[`${o[1]}#${t===!0?"rtl":"ltr"}`]}}function Qt(e,t){let{top:o,left:n,right:l,bottom:u,width:a,height:s}=e.getBoundingClientRect();return t!==void 0&&(o-=t[1],n-=t[0],u+=t[1],l+=t[0],a+=t[0],s+=t[1]),{top:o,bottom:u,height:s,left:n,right:l,width:a,middle:n+(l-n)/2,center:o+(u-o)/2}}function Ut(e,t,o){let{top:n,left:l}=e.getBoundingClientRect();return n+=t.top,l+=t.left,o!==void 0&&(n+=o[1],l+=o[0]),{top:n,bottom:n+1,height:1,left:l,right:l+1,width:1,middle:l,center:n}}function Kt(e){return{top:0,center:e.offsetHeight/2,bottom:e.offsetHeight,left:0,middle:e.offsetWidth/2,right:e.offsetWidth}}function Me(e,t,o){return{top:e[o.anchorOrigin.vertical]-t[o.selfOrigin.vertical],left:e[o.anchorOrigin.horizontal]-t[o.selfOrigin.horizontal]}}function ct(e){if(pt.is.ios===!0&&window.visualViewport!==void 0){const s=document.body.style,{offsetLeft:d,offsetTop:f}=window.visualViewport;d!==Ae&&(s.setProperty("--q-pe-left",d+"px"),Ae=d),f!==Re&&(s.setProperty("--q-pe-top",f+"px"),Re=f)}const{scrollLeft:t,scrollTop:o}=e.el,n=e.absoluteOffset===void 0?Qt(e.anchorEl,e.cover===!0?[0,0]:e.offset):Ut(e.anchorEl,e.absoluteOffset,e.offset);let l={maxHeight:e.maxHeight,maxWidth:e.maxWidth,visibility:"visible"};(e.fit===!0||e.cover===!0)&&(l.minWidth=n.width+"px",e.cover===!0&&(l.minHeight=n.height+"px")),Object.assign(e.el.style,l);const u=Kt(e.el);let a=Me(n,u,e);if(e.absoluteOffset===void 0||e.offset===void 0)we(a,n,u,e.anchorOrigin,e.selfOrigin);else{const{top:s,left:d}=a;we(a,n,u,e.anchorOrigin,e.selfOrigin);let f=!1;if(a.top!==s){f=!0;const h=2*e.offset[1];n.center=n.top-=h,n.bottom-=h+2}if(a.left!==d){f=!0;const h=2*e.offset[0];n.middle=n.left-=h,n.right-=h+2}f===!0&&(a=Me(n,u,e),we(a,n,u,e.anchorOrigin,e.selfOrigin))}l={top:a.top+"px",left:a.left+"px"},a.maxHeight!==void 0&&(l.maxHeight=a.maxHeight+"px",n.height>a.maxHeight&&(l.minHeight=l.maxHeight)),a.maxWidth!==void 0&&(l.maxWidth=a.maxWidth+"px",n.width>a.maxWidth&&(l.minWidth=l.maxWidth)),Object.assign(e.el.style,l),e.el.scrollTop!==o&&(e.el.scrollTop=o),e.el.scrollLeft!==t&&(e.el.scrollLeft=t)}function we(e,t,o,n,l){const u=o.bottom,a=o.right,s=yt(),d=window.innerHeight-s,f=document.body.clientWidth;if(e.top<0||e.top+u>d)if(l.vertical==="center")e.top=t[n.vertical]>d/2?Math.max(0,d-u):0,e.maxHeight=Math.min(u,d);else if(t[n.vertical]>d/2){const h=Math.min(d,n.vertical==="center"?t.center:n.vertical===l.vertical?t.bottom:t.top);e.maxHeight=Math.min(u,h),e.top=Math.max(0,h-u)}else e.top=Math.max(0,n.vertical==="center"?t.center:n.vertical===l.vertical?t.top:t.bottom),e.maxHeight=Math.min(u,d-e.top);if(e.left<0||e.left+a>f)if(e.maxWidth=Math.min(a,f),l.horizontal==="middle")e.left=t[n.horizontal]>f/2?Math.max(0,f-a):0;else if(t[n.horizontal]>f/2){const h=Math.min(f,n.horizontal==="middle"?t.middle:n.horizontal===l.horizontal?t.right:t.left);e.maxWidth=Math.min(a,h),e.left=Math.max(0,h-e.maxWidth)}else e.left=Math.max(0,n.horizontal==="middle"?t.middle:n.horizontal===l.horizontal?t.left:t.right),e.maxWidth=Math.min(a,f-e.left)}var Gt=re({name:"QMenu",inheritAttrs:!1,props:{...it,..._e,...We,...qe,persistent:Boolean,autoClose:Boolean,separateClosePopup:Boolean,noRouteDismiss:Boolean,noRefocus:Boolean,noFocus:Boolean,fit:Boolean,cover:Boolean,square:Boolean,anchor:{type:String,validator:ve},self:{type:String,validator:ve},offset:{type:Array,validator:ut},scrollTarget:{default:void 0},touchPosition:Boolean,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null}},emits:[...je,"click","escapeKey"],setup(e,{slots:t,emit:o,attrs:n}){let l=null,u,a,s;const d=te(),{proxy:f}=d,{$q:h}=f,y=B(null),v=B(!1),c=b(()=>e.persistent!==!0&&e.noRouteDismiss!==!0),k=Ie(e,h),{registerTick:q,removeTick:L}=Qe(),{registerTimeout:E}=Ue(),{transitionProps:H,transitionStyle:O}=Ke(e),{localScrollTarget:m,changeScrollEvent:T,unconfigureScrollTarget:K}=rt(e,C),{anchorEl:w,canShow:oe}=at({showing:v}),{hide:M}=Ge({showing:v,canShow:oe,handleShow:Y,handleHide:J,hideOnRouteChange:c,processOnMount:!0}),{showPortal:F,hidePortal:D,renderPortal:ne}=Ve(d,y,r,"menu"),_={anchorEl:w,innerRef:y,onClickOutside(i){if(e.persistent!==!0&&v.value===!0)return M(i),(i.type==="touchstart"||i.target.classList.contains("q-dialog__backdrop"))&&Be(i),!0}},G=b(()=>ge(e.anchor||(e.cover===!0?"center middle":"bottom start"),h.lang.rtl)),V=b(()=>e.cover===!0?G.value:ge(e.self||"top start",h.lang.rtl)),N=b(()=>(e.square===!0?" q-menu--square":"")+(k.value===!0?" q-menu--dark q-dark":"")),le=b(()=>e.autoClose===!0?{onClick:A}:{}),X=b(()=>v.value===!0&&e.persistent!==!0);P(X,i=>{i===!0?(xt($),st(_)):(He($),me(_))});function W(){Je(()=>{let i=y.value;i&&i.contains(document.activeElement)!==!0&&(i=i.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||i.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||i.querySelector("[autofocus], [data-autofocus]")||i,i.focus({preventScroll:!0}))})}function Y(i){if(l=e.noRefocus===!1?document.activeElement:null,bt(x),F(),C(),u=void 0,i!==void 0&&(e.touchPosition||e.contextMenu)){const g=wt(i);if(g.left!==void 0){const{top:S,left:z}=w.value.getBoundingClientRect();u={left:g.left-z,top:g.top-S}}}a===void 0&&(a=P(()=>h.screen.width+"|"+h.screen.height+"|"+e.self+"|"+e.anchor+"|"+h.lang.rtl,I)),e.noFocus!==!0&&document.activeElement.blur(),q(()=>{I(),e.noFocus!==!0&&W()}),E(()=>{h.platform.is.ios===!0&&(s=e.autoClose,y.value.click()),I(),F(!0),o("show",i)},e.transitionDuration)}function J(i){L(),D(),j(!0),l!==null&&(i===void 0||i.qClickOutside!==!0)&&(((i&&i.type.indexOf("key")===0?l.closest('[tabindex]:not([tabindex^="-"])'):void 0)||l).focus(),l=null),E(()=>{D(!0),o("hide",i)},e.transitionDuration)}function j(i){u=void 0,a!==void 0&&(a(),a=void 0),(i===!0||v.value===!0)&&(Ct(x),K(),me(_),He($)),i!==!0&&(l=null)}function C(){(w.value!==null||e.scrollTarget!==void 0)&&(m.value=Xe(w.value,e.scrollTarget),T(m.value,I))}function A(i){s!==!0?(kt(f,i),o("click",i)):s=!1}function x(i){X.value===!0&&e.noFocus!==!0&&St(y.value,i.target)!==!0&&W()}function $(i){o("escapeKey"),M(i)}function I(){const i=y.value;i===null||w.value===null||ct({el:i,offset:e.offset,anchorEl:w.value,anchorOrigin:G.value,selfOrigin:V.value,absoluteOffset:u,fit:e.fit,cover:e.cover,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function r(){return p(Ye,H.value,()=>v.value===!0?p("div",{role:"menu",...n,ref:y,tabindex:-1,class:["q-menu q-position-engine scroll"+N.value,n.class],style:[n.style,O.value],...le.value},se(t.default)):null)}return U(j),Object.assign(f,{focus:W,updatePosition:I}),ne}});const Vt=Object.keys(Ze),Xt=e=>Vt.reduce((t,o)=>{const n=e[o];return n!==void 0&&(t[o]=n),t},{});var Yt=re({name:"QBtnDropdown",props:{...Ze,...qe,modelValue:Boolean,split:Boolean,dropdownIcon:String,contentClass:[Array,String,Object],contentStyle:[Array,String,Object],cover:Boolean,persistent:Boolean,noRouteDismiss:Boolean,autoClose:Boolean,menuAnchor:{type:String,default:"bottom end"},menuSelf:{type:String,default:"top end"},menuOffset:Array,disableMainBtn:Boolean,disableDropdown:Boolean,noIconAnimation:Boolean,toggleAriaLabel:String},emits:["update:modelValue","click","beforeShow","show","beforeHide","hide"],setup(e,{slots:t,emit:o}){const{proxy:n}=te(),l=B(e.modelValue),u=B(null),a=Tt(),s=b(()=>{const m={"aria-expanded":l.value===!0?"true":"false","aria-haspopup":"true","aria-controls":a,"aria-label":e.toggleAriaLabel||n.$q.lang.label[l.value===!0?"collapse":"expand"](e.label)};return(e.disable===!0||e.split===!1&&e.disableMainBtn===!0||e.disableDropdown===!0)&&(m["aria-disabled"]="true"),m}),d=b(()=>"q-btn-dropdown__arrow"+(l.value===!0&&e.noIconAnimation===!1?" rotate-180":"")+(e.split===!1?" q-btn-dropdown__arrow-container":"")),f=b(()=>qt(e)),h=b(()=>Xt(e));P(()=>e.modelValue,m=>{u.value!==null&&u.value[m?"show":"hide"]()}),P(()=>e.split,O);function y(m){l.value=!0,o("beforeShow",m)}function v(m){o("show",m),o("update:modelValue",!0)}function c(m){l.value=!1,o("beforeHide",m)}function k(m){o("hide",m),o("update:modelValue",!1)}function q(m){o("click",m)}function L(m){tt(m),O(),o("click",m)}function E(m){u.value!==null&&u.value.toggle(m)}function H(m){u.value!==null&&u.value.show(m)}function O(m){u.value!==null&&u.value.hide(m)}return Object.assign(n,{show:H,hide:O,toggle:E}),ue(()=>{e.modelValue===!0&&H()}),()=>{const m=[p(et,{class:d.value,name:e.dropdownIcon||n.$q.iconSet.arrow.dropdown})];return e.disableDropdown!==!0&&m.push(p(Gt,{ref:u,id:a,class:e.contentClass,style:e.contentStyle,cover:e.cover,fit:!0,persistent:e.persistent,noRouteDismiss:e.noRouteDismiss,autoClose:e.autoClose,anchor:e.menuAnchor,self:e.menuSelf,offset:e.menuOffset,separateClosePopup:!0,transitionShow:e.transitionShow,transitionHide:e.transitionHide,transitionDuration:e.transitionDuration,onBeforeShow:y,onShow:v,onBeforeHide:c,onHide:k},t.default)),e.split===!1?p(R,{class:"q-btn-dropdown q-btn-dropdown--simple",...h.value,...s.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:q},{default:()=>se(t.label,[]).concat(m),loading:t.loading}):p(It,{class:"q-btn-dropdown q-btn-dropdown--split no-wrap q-btn-item",rounded:e.rounded,square:e.square,...f.value,glossy:e.glossy,stretch:e.stretch},()=>[p(R,{class:"q-btn-dropdown--current",...h.value,disable:e.disable===!0||e.disableMainBtn===!0,noWrap:!0,round:!1,onClick:L},{default:t.label,loading:t.loading}),p(R,{class:"q-btn-dropdown__arrow-container q-anchor--skip",...s.value,...f.value,disable:e.disable===!0||e.disableDropdown===!0,rounded:e.rounded,color:e.color,textColor:e.textColor,dense:e.dense,size:e.size,padding:e.padding,ripple:e.ripple},()=>m)])}}}),Jt=re({name:"QTooltip",inheritAttrs:!1,props:{...it,..._e,...qe,maxHeight:{type:String,default:null},maxWidth:{type:String,default:null},transitionShow:{default:"jump-down"},transitionHide:{default:"jump-up"},anchor:{type:String,default:"bottom middle",validator:ve},self:{type:String,default:"top middle",validator:ve},offset:{type:Array,default:()=>[14,14],validator:ut},scrollTarget:{default:void 0},delay:{type:Number,default:0},hideDelay:{type:Number,default:0}},emits:[...je],setup(e,{slots:t,emit:o,attrs:n}){let l,u;const a=te(),{proxy:{$q:s}}=a,d=B(null),f=B(!1),h=b(()=>ge(e.anchor,s.lang.rtl)),y=b(()=>ge(e.self,s.lang.rtl)),v=b(()=>e.persistent!==!0),{registerTick:c,removeTick:k}=Qe(),{registerTimeout:q}=Ue(),{transitionProps:L,transitionStyle:E}=Ke(e),{localScrollTarget:H,changeScrollEvent:O,unconfigureScrollTarget:m}=rt(e,Y),{anchorEl:T,canShow:K,anchorEvents:w}=at({showing:f,configureAnchorEl:W}),{show:oe,hide:M}=Ge({showing:f,canShow:K,handleShow:_,handleHide:G,hideOnRouteChange:v,processOnMount:!0});Object.assign(w,{delayShow:le,delayHide:X});const{showPortal:F,hidePortal:D,renderPortal:ne}=Ve(a,d,j,"tooltip");if(s.platform.is.mobile===!0){const C={anchorEl:T,innerRef:d,onClickOutside(x){return M(x),x.target.classList.contains("q-dialog__backdrop")&&Be(x),!0}},A=b(()=>e.modelValue===null&&e.persistent!==!0&&f.value===!0);P(A,x=>{(x===!0?st:me)(C)}),U(()=>{me(C)})}function _(C){F(),c(()=>{u=new MutationObserver(()=>N()),u.observe(d.value,{attributes:!1,childList:!0,characterData:!0,subtree:!0}),N(),Y()}),l===void 0&&(l=P(()=>s.screen.width+"|"+s.screen.height+"|"+e.self+"|"+e.anchor+"|"+s.lang.rtl,N)),q(()=>{F(!0),o("show",C)},e.transitionDuration)}function G(C){k(),D(),V(),q(()=>{D(!0),o("hide",C)},e.transitionDuration)}function V(){u!==void 0&&(u.disconnect(),u=void 0),l!==void 0&&(l(),l=void 0),m(),ke(w,"tooltipTemp")}function N(){const C=d.value;T.value===null||!C||ct({el:C,offset:e.offset,anchorEl:T.value,anchorOrigin:h.value,selfOrigin:y.value,maxHeight:e.maxHeight,maxWidth:e.maxWidth})}function le(C){if(s.platform.is.mobile===!0){Se(),document.body.classList.add("non-selectable");const A=T.value,x=["touchmove","touchcancel","touchend","click"].map($=>[A,$,"delayHide","passiveCapture"]);de(w,"tooltipTemp",x)}q(()=>{oe(C)},e.delay)}function X(C){s.platform.is.mobile===!0&&(ke(w,"tooltipTemp"),Se(),setTimeout(()=>{document.body.classList.remove("non-selectable")},10)),q(()=>{M(C)},e.hideDelay)}function W(){if(e.noParentEvent===!0||T.value===null)return;const C=s.platform.is.mobile===!0?[[T.value,"touchstart","delayShow","passive"]]:[[T.value,"mouseenter","delayShow","passive"],[T.value,"mouseleave","delayHide","passive"]];de(w,"anchor",C)}function Y(){if(T.value!==null||e.scrollTarget!==void 0){H.value=Xe(T.value,e.scrollTarget);const C=e.noParentEvent===!0?N:M;O(H.value,C)}}function J(){return f.value===!0?p("div",{...n,ref:d,class:["q-tooltip q-tooltip--style q-position-engine no-pointer-events",n.class],style:[n.style,E.value],role:"tooltip"},se(t.default)):null}function j(){return p(Ye,L.value,J)}return U(V),Object.assign(a.proxy,{updatePosition:N}),ne}});function dt(e,t,o){t.handler?t.handler(e,o,o.caret):o.runCmd(t.cmd,t.param)}function Pe(e){return p("div",{class:"q-editor__toolbar-group"},e)}function ft(e,t,o,n=!1){const l=n||(t.type==="toggle"?t.toggled?t.toggled(e):t.cmd&&e.caret.is(t.cmd,t.param):!1),u=[];if(t.tip&&e.$q.platform.is.desktop){const a=t.key?p("div",[p("small",`(CTRL + ${String.fromCharCode(t.key)})`)]):null;u.push(p(Jt,{delay:1e3},()=>[p("div",{innerHTML:t.tip}),a]))}return p(R,{...e.buttonProps.value,icon:t.icon!==null?t.icon:void 0,color:l?t.toggleColor||e.props.toolbarToggleColor:t.color||e.props.toolbarColor,textColor:l&&!e.props.toolbarPush?null:t.textColor||e.props.toolbarTextColor,label:t.label,disable:t.disable?typeof t.disable=="function"?t.disable(e):!0:!1,size:"sm",onClick(a){o&&o(),dt(a,t,e)}},()=>u)}function Zt(e,t){const o=t.list==="only-icons";let n=t.label,l=t.icon!==null?t.icon:void 0,u,a;function s(){f.component.proxy.hide()}if(o)a=t.options.map(h=>{const y=h.type===void 0?e.caret.is(h.cmd,h.param):!1;return y&&(n=h.tip,l=h.icon!==null?h.icon:void 0),ft(e,h,s,y)}),u=e.toolbarBackgroundClass.value,a=[Pe(a)];else{const h=e.props.toolbarToggleColor!==void 0?`text-${e.props.toolbarToggleColor}`:null,y=e.props.toolbarTextColor!==void 0?`text-${e.props.toolbarTextColor}`:null,v=t.list==="no-icons";a=t.options.map(c=>{const k=c.disable?c.disable(e):!1,q=c.type===void 0?e.caret.is(c.cmd,c.param):!1;q&&(n=c.tip,l=c.icon!==null?c.icon:void 0);const L=c.htmlTip;return p(At,{active:q,activeClass:h,clickable:!0,disable:k,dense:!0,onClick(E){s(),e.contentRef.value!==null&&e.contentRef.value.focus(),e.caret.restore(),dt(E,c,e)}},()=>[v===!0?null:p(Ne,{class:q?h:y,side:!0},()=>p(et,{name:c.icon!==null?c.icon:void 0})),p(Ne,L?()=>p("div",{class:"text-no-wrap",innerHTML:c.htmlTip}):c.tip?()=>p("div",{class:"text-no-wrap"},c.tip):void 0)])}),u=[e.toolbarBackgroundClass.value,y]}const d=t.highlight&&n!==t.label,f=p(Yt,{...e.buttonProps.value,noCaps:!0,noWrap:!0,color:d?e.props.toolbarToggleColor:e.props.toolbarColor,textColor:d&&!e.props.toolbarPush?null:e.props.toolbarTextColor,label:t.fixedLabel?t.label:n,icon:t.fixedIcon?t.icon!==null?t.icon:void 0:l,contentClass:u},()=>a);return f}function eo(e){if(e.caret)return e.buttons.value.filter(t=>!e.isViewingSource.value||t.find(o=>o.cmd==="viewsource")).map(t=>Pe(t.map(o=>e.isViewingSource.value&&o.cmd!=="viewsource"?!1:o.type==="slot"?se(e.slots[o.slot]):o.type==="dropdown"?Zt(e,o):ft(e,o))))}function to(e,t,o,n={}){const l=Object.keys(n);if(l.length===0)return{};const u={default_font:{cmd:"fontName",param:e,icon:o,tip:t}};return l.forEach(a=>{const s=n[a];u[a]={cmd:"fontName",param:s,icon:o,tip:s,htmlTip:`<font face="${s}">${s}</font>`}}),u}function oo(e){if(e.caret){const t=e.props.toolbarColor||e.props.toolbarTextColor;let o=e.editLinkUrl.value;const n=()=>{e.caret.restore(),o!==e.editLinkUrl.value&&document.execCommand("createLink",!1,o===""?" ":o),e.editLinkUrl.value=null};return[p("div",{class:`q-mx-xs text-${t}`},`${e.$q.lang.editor.url}: `),p("input",{key:"qedt_btm_input",class:"col q-editor__link-input",value:o,onInput:l=>{tt(l),o=l.target.value},onKeydown:l=>{if(ot(l)!==!0)switch(l.keyCode){case 13:return ce(l),n();case 27:ce(l),e.caret.restore(),(!e.editLinkUrl.value||e.editLinkUrl.value==="https://")&&document.execCommand("unlink"),e.editLinkUrl.value=null;break}}}),Pe([p(R,{key:"qedt_btm_rem",tabindex:-1,...e.buttonProps.value,label:e.$q.lang.label.remove,noCaps:!0,onClick:()=>{e.caret.restore(),document.execCommand("unlink"),e.editLinkUrl.value=null}}),p(R,{key:"qedt_btm_upd",...e.buttonProps.value,label:e.$q.lang.label.update,noCaps:!0,onClick:n})])]}}let ae=0;const no={fullscreen:Boolean,noRouteFullscreenExit:Boolean},lo=["update:fullscreen","fullscreen"];function io(){const e=te(),{props:t,emit:o,proxy:n}=e;let l,u,a;const s=B(!1);Bt(e)===!0&&P(()=>n.$route.fullPath,()=>{t.noRouteFullscreenExit!==!0&&h()}),P(()=>t.fullscreen,y=>{s.value!==y&&d()}),P(s,y=>{o("update:fullscreen",y),o("fullscreen",y)});function d(){s.value===!0?h():f()}function f(){s.value!==!0&&(s.value=!0,a=n.$el.parentNode,a.replaceChild(u,n.$el),document.body.appendChild(n.$el),ae++,ae===1&&document.body.classList.add("q-body--fullscreen-mixin"),l={handler:h},Oe.add(l))}function h(){s.value===!0&&(l!==void 0&&(Oe.remove(l),l=void 0),a.replaceChild(n.$el,u),s.value=!1,ae=Math.max(0,ae-1),ae===0&&(document.body.classList.remove("q-body--fullscreen-mixin"),n.$el.scrollIntoView!==void 0&&setTimeout(()=>{n.$el.scrollIntoView()})))}return Pt(()=>{u=document.createElement("span")}),ue(()=>{t.fullscreen===!0&&f()}),U(h),Object.assign(n,{toggleFullscreen:d,setFullscreen:f,exitFullscreen:h}),{inFullscreen:s,toggleFullscreen:d}}const ao=Object.prototype.toString,Ce=Object.prototype.hasOwnProperty,ro=new Set(["Boolean","Number","String","Function","Array","Date","RegExp"].map(e=>"[object "+e+"]"));function Fe(e){if(e!==Object(e)||ro.has(ao.call(e))===!0||e.constructor&&Ce.call(e,"constructor")===!1&&Ce.call(e.constructor.prototype,"isPrototypeOf")===!1)return!1;let t;for(t in e);return t===void 0||Ce.call(e,t)}function ht(){let e,t,o,n,l,u,a=arguments[0]||{},s=1,d=!1;const f=arguments.length;for(typeof a=="boolean"&&(d=a,a=arguments[1]||{},s=2),Object(a)!==a&&typeof a!="function"&&(a={}),f===s&&(a=this,s--);s<f;s++)if((e=arguments[s])!==null)for(t in e)o=a[t],n=e[t],a!==n&&(d===!0&&n&&((l=Array.isArray(n))||Fe(n)===!0)?(l===!0?u=Array.isArray(o)===!0?o:[]:u=Fe(o)===!0?o:{},a[t]=ht(d,u,n)):n!==void 0&&(a[t]=n));return a}var so=re({name:"QEditor",props:{...We,...no,modelValue:{type:String,required:!0},readonly:Boolean,disable:Boolean,minHeight:{type:String,default:"10rem"},maxHeight:String,height:String,definitions:Object,fonts:Object,placeholder:String,toolbar:{type:Array,validator:e=>e.length===0||e.every(t=>t.length),default(){return[["left","center","right","justify"],["bold","italic","underline","strike"],["undo","redo"]]}},toolbarColor:String,toolbarBg:String,toolbarTextColor:String,toolbarToggleColor:{type:String,default:"primary"},toolbarOutline:Boolean,toolbarPush:Boolean,toolbarRounded:Boolean,paragraphTag:{type:String,validator:e=>["div","p"].includes(e),default:"div"},contentStyle:Object,contentClass:[Object,Array,String],square:Boolean,flat:Boolean,dense:Boolean},emits:[...lo,"update:modelValue","keydown","click","mouseup","keyup","touchend","focus","blur"],setup(e,{slots:t,emit:o,attrs:n}){const{proxy:l,vnode:u}=te(),{$q:a}=l,s=Ie(e,a),{inFullscreen:d,toggleFullscreen:f}=io(),h=Et(n,u),y=B(null),v=B(null),c=B(null),k=B(!1),q=b(()=>!e.readonly&&!e.disable);let L,E,H=e.modelValue;document.execCommand("defaultParagraphSeparator",!1,e.paragraphTag),L=window.getComputedStyle(document.body).fontFamily;const O=b(()=>e.toolbarBg?` bg-${e.toolbarBg}`:""),m=b(()=>{const r=e.toolbarOutline!==!0&&e.toolbarPush!==!0;return{type:"a",flat:r,noWrap:!0,outline:e.toolbarOutline,push:e.toolbarPush,rounded:e.toolbarRounded,dense:!0,color:e.toolbarColor,disable:!q.value,size:"sm"}}),T=b(()=>{const r=a.lang.editor,i=a.iconSet.editor;return{bold:{cmd:"bold",icon:i.bold,tip:r.bold,key:66},italic:{cmd:"italic",icon:i.italic,tip:r.italic,key:73},strike:{cmd:"strikeThrough",icon:i.strikethrough,tip:r.strikethrough,key:83},underline:{cmd:"underline",icon:i.underline,tip:r.underline,key:85},unordered:{cmd:"insertUnorderedList",icon:i.unorderedList,tip:r.unorderedList},ordered:{cmd:"insertOrderedList",icon:i.orderedList,tip:r.orderedList},subscript:{cmd:"subscript",icon:i.subscript,tip:r.subscript,htmlTip:"x<subscript>2</subscript>"},superscript:{cmd:"superscript",icon:i.superscript,tip:r.superscript,htmlTip:"x<superscript>2</superscript>"},link:{cmd:"link",disable:g=>g.caret&&!g.caret.can("link"),icon:i.hyperlink,tip:r.hyperlink,key:76},fullscreen:{cmd:"fullscreen",icon:i.toggleFullscreen,tip:r.toggleFullscreen,key:70},viewsource:{cmd:"viewsource",icon:i.viewSource,tip:r.viewSource},quote:{cmd:"formatBlock",param:"BLOCKQUOTE",icon:i.quote,tip:r.quote,key:81},left:{cmd:"justifyLeft",icon:i.left,tip:r.left},center:{cmd:"justifyCenter",icon:i.center,tip:r.center},right:{cmd:"justifyRight",icon:i.right,tip:r.right},justify:{cmd:"justifyFull",icon:i.justify,tip:r.justify},print:{type:"no-state",cmd:"print",icon:i.print,tip:r.print,key:80},outdent:{type:"no-state",disable:g=>g.caret&&!g.caret.can("outdent"),cmd:"outdent",icon:i.outdent,tip:r.outdent},indent:{type:"no-state",disable:g=>g.caret&&!g.caret.can("indent"),cmd:"indent",icon:i.indent,tip:r.indent},removeFormat:{type:"no-state",cmd:"removeFormat",icon:i.removeFormat,tip:r.removeFormat},hr:{type:"no-state",cmd:"insertHorizontalRule",icon:i.hr,tip:r.hr},undo:{type:"no-state",cmd:"undo",icon:i.undo,tip:r.undo,key:90},redo:{type:"no-state",cmd:"redo",icon:i.redo,tip:r.redo,key:89},h1:{cmd:"formatBlock",param:"H1",icon:i.heading1||i.heading,tip:r.heading1,htmlTip:`<h1 class="q-ma-none">${r.heading1}</h1>`},h2:{cmd:"formatBlock",param:"H2",icon:i.heading2||i.heading,tip:r.heading2,htmlTip:`<h2 class="q-ma-none">${r.heading2}</h2>`},h3:{cmd:"formatBlock",param:"H3",icon:i.heading3||i.heading,tip:r.heading3,htmlTip:`<h3 class="q-ma-none">${r.heading3}</h3>`},h4:{cmd:"formatBlock",param:"H4",icon:i.heading4||i.heading,tip:r.heading4,htmlTip:`<h4 class="q-ma-none">${r.heading4}</h4>`},h5:{cmd:"formatBlock",param:"H5",icon:i.heading5||i.heading,tip:r.heading5,htmlTip:`<h5 class="q-ma-none">${r.heading5}</h5>`},h6:{cmd:"formatBlock",param:"H6",icon:i.heading6||i.heading,tip:r.heading6,htmlTip:`<h6 class="q-ma-none">${r.heading6}</h6>`},p:{cmd:"formatBlock",param:e.paragraphTag,icon:i.heading,tip:r.paragraph},code:{cmd:"formatBlock",param:"PRE",icon:i.code,htmlTip:`<code>${r.code}</code>`},"size-1":{cmd:"fontSize",param:"1",icon:i.size1||i.size,tip:r.size1,htmlTip:`<font size="1">${r.size1}</font>`},"size-2":{cmd:"fontSize",param:"2",icon:i.size2||i.size,tip:r.size2,htmlTip:`<font size="2">${r.size2}</font>`},"size-3":{cmd:"fontSize",param:"3",icon:i.size3||i.size,tip:r.size3,htmlTip:`<font size="3">${r.size3}</font>`},"size-4":{cmd:"fontSize",param:"4",icon:i.size4||i.size,tip:r.size4,htmlTip:`<font size="4">${r.size4}</font>`},"size-5":{cmd:"fontSize",param:"5",icon:i.size5||i.size,tip:r.size5,htmlTip:`<font size="5">${r.size5}</font>`},"size-6":{cmd:"fontSize",param:"6",icon:i.size6||i.size,tip:r.size6,htmlTip:`<font size="6">${r.size6}</font>`},"size-7":{cmd:"fontSize",param:"7",icon:i.size7||i.size,tip:r.size7,htmlTip:`<font size="7">${r.size7}</font>`}}}),K=b(()=>{const r=e.definitions||{},i=e.definitions||e.fonts?ht(!0,{},T.value,r,to(L,a.lang.editor.defaultFont,a.iconSet.editor.font,e.fonts)):T.value;return e.toolbar.map(g=>g.map(S=>{if(S.options)return{type:"dropdown",icon:S.icon,label:S.label,size:"sm",dense:!0,fixedLabel:S.fixedLabel,fixedIcon:S.fixedIcon,highlight:S.highlight,list:S.list,options:S.options.map(mt=>i[mt])};const z=i[S];return z?z.type==="no-state"||r[S]&&(z.cmd===void 0||T.value[z.cmd]&&T.value[z.cmd].type==="no-state")?z:Object.assign({type:"toggle"},z):{type:"slot",slot:S}}))}),w={$q:a,props:e,slots:t,inFullscreen:d,toggleFullscreen:f,runCmd:A,isViewingSource:k,editLinkUrl:c,toolbarBackgroundClass:O,buttonProps:m,contentRef:v,buttons:K,setContent:C};P(()=>e.modelValue,r=>{H!==r&&(H=r,C(r,!0))});const oe=b(()=>e.toolbar&&e.toolbar.length>0),M=b(()=>{const r={},i=g=>{g.key&&(r[g.key]={cmd:g.cmd,param:g.param})};return K.value.forEach(g=>{g.forEach(S=>{S.options?S.options.forEach(i):i(S)})}),r}),F=b(()=>d.value?e.contentStyle:[{minHeight:e.minHeight,height:e.height,maxHeight:e.maxHeight},e.contentStyle]),D=b(()=>`q-editor q-editor--${k.value===!0?"source":"default"}`+(e.disable===!0?" disabled":"")+(d.value===!0?" fullscreen column":"")+(e.square===!0?" q-editor--square no-border-radius":"")+(e.flat===!0?" q-editor--flat":"")+(e.dense===!0?" q-editor--dense":"")+(s.value===!0?" q-editor--dark q-dark":"")),ne=b(()=>[e.contentClass,"q-editor__content",{col:d.value,"overflow-auto":d.value||e.maxHeight}]),_=b(()=>e.disable===!0?{"aria-disabled":"true"}:e.readonly===!0?{"aria-readonly":"true"}:{});function G(){if(v.value!==null){const r=`inner${k.value===!0?"Text":"HTML"}`,i=v.value[r];i!==e.modelValue&&(H=i,o("update:modelValue",i))}}function V(r){if(o("keydown",r),r.ctrlKey!==!0||ot(r)===!0){x();return}const i=r.keyCode,g=M.value[i];if(g!==void 0){const{cmd:S,param:z}=g;Be(r),A(S,z,!1)}}function N(r){x(),o("click",r)}function le(r){if(v.value!==null){const{scrollTop:i,scrollHeight:g}=v.value;E=g-i}w.caret.save(),o("blur",r)}function X(r){De(()=>{v.value!==null&&E!==void 0&&(v.value.scrollTop=v.value.scrollHeight-E)}),o("focus",r)}function W(r){const i=y.value;if(i!==null&&i.contains(r.target)===!0&&(r.relatedTarget===null||i.contains(r.relatedTarget)!==!0)){const g=`inner${k.value===!0?"Text":"HTML"}`;w.caret.restorePosition(v.value[g].length),x()}}function Y(r){const i=y.value;i!==null&&i.contains(r.target)===!0&&(r.relatedTarget===null||i.contains(r.relatedTarget)!==!0)&&(w.caret.savePosition(),x())}function J(){E=void 0}function j(r){w.caret.save()}function C(r,i){if(v.value!==null){i===!0&&w.caret.savePosition();const g=`inner${k.value===!0?"Text":"HTML"}`;v.value[g]=r,i===!0&&(w.caret.restorePosition(v.value[g].length),x())}}function A(r,i,g=!0){$(),w.caret.restore(),w.caret.apply(r,i,()=>{$(),w.caret.save(),g&&x()})}function x(){setTimeout(()=>{c.value=null,l.$forceUpdate()},1)}function $(){Je(()=>{v.value!==null&&v.value.focus({preventScroll:!0})})}function I(){return v.value}return ue(()=>{w.caret=l.caret=new jt(v.value,w),C(e.modelValue),x(),document.addEventListener("selectionchange",j)}),U(()=>{document.removeEventListener("selectionchange",j)}),Object.assign(l,{runCmd:A,refreshToolbar:x,focus:$,getContentEl:I}),()=>{let r;if(oe.value){const i=[p("div",{key:"qedt_top",class:"q-editor__toolbar row no-wrap scroll-x"+O.value},eo(w))];c.value!==null&&i.push(p("div",{key:"qedt_btm",class:"q-editor__toolbar row no-wrap items-center scroll-x"+O.value},oo(w))),r=p("div",{key:"toolbar_ctainer",class:"q-editor__toolbars-container"},i)}return p("div",{ref:y,class:D.value,style:{height:d.value===!0?"100%":null},..._.value,onFocusin:W,onFocusout:Y},[r,p("div",{ref:v,style:F.value,class:ne.value,contenteditable:q.value,placeholder:e.placeholder,...h.listeners.value,onInput:G,onKeydown:V,onClick:N,onBlur:le,onFocus:X,onMousedown:J,onTouchstartPassive:J})])}}});const uo=Ot({components:{Container:Mt},name:"PageNew",setup(){const e=zt(),t=Lt(),o=B({}),n=()=>{u.value?(console.log("note.value",o.value),_t(o.value).then(d=>{e.push("/")})):Dt(o.value).then(d=>{e.push("/"),o.value={}})},l=b(()=>o.value.title&&o.value.description),u=b(()=>!!t.params.id);ue(()=>{u.value&&a(t.params.id)});const a=d=>{Ft(d).then(f=>{o.value=f})};return{note:o,submit:n,formIsValid:l,hasIdParam:u,onContentChange:d=>{o.value.content=d}}}}),co={key:0},fo={key:1},ho={class:"q-mt-md"};function mo(e,t,o,n,l,u){const a=$t("Container");return ie(),pe(Rt,{padding:""},{default:Z(()=>[ee(a,null,{default:Z(()=>[e.hasIdParam?(ie(),ze("h3",fo,"Edit Note")):(ie(),ze("h3",co,"New Note")),Le("form",{onSubmit:t[3]||(t[3]=(...s)=>e.submit&&e.submit(...s))},[ee($e,{class:"q-mt-sm",outlined:"",modelValue:e.note.title,"onUpdate:modelValue":t[0]||(t[0]=s=>e.note.title=s),label:"Title",rules:[s=>!!s||"Title is required"]},null,8,["modelValue","rules"]),ee($e,{class:"q-mt-sm",outlined:"",modelValue:e.note.description,"onUpdate:modelValue":t[1]||(t[1]=s=>e.note.description=s),label:"Description",dense:"",rules:[s=>!!s||"Description is required"]},null,8,["modelValue","rules"]),ee(Nt,{flat:"",bordered:"",class:"q-mt-sm"},{default:Z(()=>[ee(so,{modelValue:e.note.content,"onUpdate:modelValue":[t[2]||(t[2]=s=>e.note.content=s),e.onContentChange],"min-height":"5rem"},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),Le("div",ho,[ee(R,{color:"grey",to:"/",type:"reset"},{default:Z(()=>[ye("Cancel")]),_:1}),e.hasIdParam?(ie(),pe(R,{key:1,class:"q-ml-sm",color:"positive",type:"submit",disable:!e.formIsValid},{default:Z(()=>[ye(" update ")]),_:1},8,["disable"])):(ie(),pe(R,{key:0,class:"q-ml-sm",color:"positive",type:"submit",disable:!e.formIsValid},{default:Z(()=>[ye(" Create ")]),_:1},8,["disable"]))])],32)]),_:1})]),_:1})}var Co=Ht(uo,[["render",mo]]);export{Co as default};