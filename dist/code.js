!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}({0:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));const r=(e,t="💪( ͡❛ ͜ʖ ͡❛҂)")=>"string"==typeof e?((e,t)=>{const[n,r]=e.split(t);return{name:n,id:r}})(e,t):((e,t)=>`${e.name}${t}${e.id}`)(e,t)},6:function(e,t,n){"use strict";n.r(t);var r=n(0);figma.showUI(__html__);const o=new Map,i=(e,t)=>{e.forEach(e=>{const n=Object(r.a)({name:e.name,id:e.id});t.set(n,e),"children"in e&&i(e.children,t)})};i(figma.currentPage.children,o),figma.ui.postMessage({type:"send-list",list:Array.from(o.keys())}),figma.ui.onmessage=e=>{const{type:t}=e;if("focus"===t){const t=o.get(e.data.key);t&&figma.viewport.scrollAndZoomIntoView([t])}}}});