import{f as T,al as _,a4 as b,a0 as g,r as p,a6 as l,a7 as i,a8 as o,ab as y,a9 as t,aa as m,am as Q,an as h,ao as f,ap as V,aq as C,ad as N,ar as k,K as $,as as q,at as B,ae as I,ac as K,au as A,ah as L}from"./index.c3a10183.js";import{Q as U,a as z,b as u,c as D}from"./QItemLabel.fb36f7ae.js";import{Q as S}from"./QPage.ba5cebd1.js";function j(){return T(_)}const x=g({setup(){const e=j(),s=p(""),n=p([{title:"learn iconic",done:!1},{title:"learn quasar",done:!1},{title:"learn capacitor",done:!1}]);return{tasks:n,deleteTask:r=>{e.dialog({title:"Alert",message:"Are you sure want to delete task?",cancel:!0,persistent:!0}).onOk(()=>{n.value.splice(r,1),e.notify("task deleted successfully.")})},addNewTask:r=>{n.value.push({title:r,done:!1}),s.value=""},newTask:s}}}),E={class:"row q-pa-sm bg-primary"},F={key:0,class:"no-tasks absolute-center"},M=y("div",{class:"text-h5 text-primary text-center"}," No Tasks ",-1);function O(e,s,n,v,w,r){return l(),i(S,{class:"bg-grey-3 column"},{default:o(()=>[y("div",E,[t(h,{filled:"",modelValue:e.newTask,"onUpdate:modelValue":s[1]||(s[1]=a=>e.newTask=a),placeholder:"Add task",dense:"","bg-color":"white",class:"col",onKeyup:s[2]||(s[2]=Q(a=>e.addNewTask(e.newTask),["enter"]))},{append:o(()=>[t(m,{round:"",dense:"",flat:"",icon:"add",onClick:s[0]||(s[0]=a=>e.addNewTask(e.newTask))})]),_:1},8,["modelValue"])]),t(U,{class:"bg-white",separator:"",bordered:""},{default:o(()=>[(l(!0),f(C,null,V(e.tasks,(a,c)=>$((l(),i(z,{key:c,clickable:"",onClick:d=>a.done=!a.done,class:q({"done bg-blue-1":a.done})},{default:o(()=>[t(u,{avatar:""},{default:o(()=>[t(B,{modelValue:a.done,"onUpdate:modelValue":d=>a.done=d,color:"primary",class:"no-pointer-events"},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024),t(u,null,{default:o(()=>[t(D,null,{default:o(()=>[I(K(a.title),1)]),_:2},1024)]),_:2},1024),a.done?(l(),i(u,{key:0,side:""},{default:o(()=>[t(m,{onClick:A(d=>e.deleteTask(c),["stop"]),round:"",color:"primary",flat:"",icon:"delete",dense:""},null,8,["onClick"])]),_:2},1024)):k("",!0)]),_:2},1032,["onClick","class"])),[[L]])),128))]),_:1}),e.tasks.length?k("",!0):(l(),f("div",F,[t(N,{name:"check",size:"100px",color:"primary"}),M]))]),_:1})}var H=b(x,[["render",O]]);export{H as default};
