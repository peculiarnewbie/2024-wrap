var a=Object.defineProperty;var o=(i,e,t)=>e in i?a(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var s=(i,e,t)=>o(i,typeof e!="symbol"?e+"":e,t);import{H as d,s as p,a as u}from"./index-DLTZNgnt.js";class n extends d{constructor(t,r){super(t,r);s(this,"$$PROVIDER_TYPE","AUDIO");s(this,"airPlay");p(()=>{this.airPlay=new u(this.media,r)},this.scope)}get type(){return"audio"}setup(){super.setup(),this.type==="audio"&&this.ctx.notify("provider-setup",this)}get audio(){return this.media}}export{n as AudioProvider};
