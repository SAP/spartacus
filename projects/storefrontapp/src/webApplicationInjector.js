/*
 * [y] hybris Platform
 *
 * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
/*!
  * $script.js JS loader & dependency manager
  * https://github.com/ded/script.js
  * (c) Dustin Diaz 2014 | License MIT
  */
 !function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t():"function"==typeof define&&define.amd?define(t):this.$script=t()}(0,function(){function d(e,t){for(var n=0,r=e.length;n<r;++n)if(!t(e[n]))return s;return 1}function u(e,t){d(e,function(e){return t(e),1})}function l(e,t,n){function r(e){return e.call?e():g[e]}function a(){if(!--c)for(var e in g[s]=1,i&&i(),w)d(e.split("|"),r)&&!u(w[e],r)&&(w[e]=[])}e=e[m]?e:[e];var o=t&&t.call,i=o?t:n,s=o?e.join(""):t,c=e.length;return setTimeout(function(){u(e,function e(t,n){return null===t?a():(!n&&!/^https?:\/\//.test(t)&&p&&(t=-1===t.indexOf(".js")?p+t+".js":p+t),I[t]?(s&&(v[s]=1),2==I[t]?a():setTimeout(function(){e(t,!0)},0)):(I[t]=1,s&&(v[s]=1),void f(t,a)))})},0),l}function f(e,t){var n,r=o.createElement("script");r.onload=r.onerror=r[h]=function(){r[c]&&!/^c|loade/.test(r[c])||n||(r.onload=r[h]=null,n=1,I[e]=2,t())},r.async=1,r.src=a?e+(-1===e.indexOf("?")?"?":"&")+a:e,i.insertBefore(r,i.lastChild)}var p,a,o=document,i=o.getElementsByTagName("head")[0],s=!1,m="push",c="readyState",h="onreadystatechange",g={},v={},w={},I={};return l.get=f,l.order=function(n,r,a){!function e(t){t=n.shift(),n.length?l(t,e):l(t,r,a)}()},l.path=function(e){p=e},l.urlArgs=function(e){a=e},l.ready=function(e,t,n){e=e[m]?e:[e];var r,a=[];return!u(e,function(e){g[e]||a[m](e)})&&d(e,function(e){return g[e]})?t():(r=e.join("|"),w[r]=w[r]||[],w[r][m](t),n&&n(a)),l},l.done=function(e){l([null],e)},l
 /*
  * [y] hybris Platform
  *
  * Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
  *
  * This software is the confidential and proprietary information of SAP
  * ("Confidential Information"). You shall not disclose such Confidential
  * Information and shall use it only in accordance with the terms of the
  * license agreement you entered into with SAP.
  */}),// jshint ignore:line
 function(i){
 /*
     * Only allow wildcard 2 levels deep.
     * See webApplicationInjectorTest.js for more details
     */
 var r=function(){
 // to not expose validAllowOriginPattern
 return new RegExp(/^(([-*a-zA-Z0-9]+[.])*([-a-zA-Z0-9]+[.]))?[-a-zA-Z0-9]+(:[0-9]{1,5})?$/)},e=[i.location.host],a=document.currentScript||document.querySelector("script#smartedit-injector");
 /*
      * START of Whitelisting: expected CSV of ant-like wildcards with "*"
      * to be found in either data-smartedit-allow-origin attribute or allow-origin query parameter (for smarteditaddon support)
      */if(a){var t=a.getAttribute("data-smartedit-allow-origin");if(!t){var n=i.document.createElement("a");n.href=a.src;var o=u(n.search,"allow-origin");o&&(t=decodeURI(o))}t&&(e=e.concat(t.split(",")))}var s=e.map(function(e){var t=e.trim();if(r().test(t)){var n=["^","$"].join(t.replace(/\./g,"\\.").replace(/\*/g,"[-a-zA-Z0-9]*"));return new RegExp(n)}throw new Error("Allowed whitelist characters are a-Z, A-Z, 0-9, - or period. A wildcard * can be used to represent a prefixed domain. E.g.: *.domain.com can be used for subdomain.domain.com.")});function c(e,t){if(!/^(https?:)\/\/([-.a-zA-Z0-9]+(:[0-9]{1,5})?)$/.test(e))return!1;var n=i.document.createElement("a");return n.href=e,("https:"!==t.protocol||"https:"===n.protocol)&&s.some(function(e){return e.lastIndex=0,e.test(n.host)})}
 // END of Whitelisting
 var d="smartEditBootstrap";function u(e,t){var a={};return e.replace(/([?&])([^&=]+)=([^&]*)?/g,function(e,t,n,r){a[n]=r}),a[t]}parent.postMessage({pk:Math.random(),gatewayId:d,eventId:"loading",data:{location:document.location.href}},"*"),i.onbeforeunload=function(){parent.postMessage({pk:Math.random(),gatewayId:d,eventId:"unloading",data:{location:document.location.href}},"*")},function e(){var t,n,r=(t=u(a.src,"heart-beat-interval"),n=a.getAttribute("data-smartedit-heart-beat-interval"),parseInt(t||n)||500);parent.postMessage({pk:Math.random(),gatewayId:"heartBeatGateway",eventId:"heartBeat",data:{location:document.location.href}},"*"),setTimeout(e,r)}(),i.addEventListener("load",function(){parent.postMessage({pk:Math.random(),gatewayId:d,eventId:"bootstrapSmartEdit",data:{location:document.location.href}},"*")});var l=function(e,t,n){n<t.length&&$script(t[n],function(){l(e,t,n+1)})},f=function(e,t,n){var r=document.createElement("link");r.rel="stylesheet",r.href=t[n],e.appendChild(r),n+1<t.length&&f(e,t,n+1)};
 // Listen to message from child window
 i.addEventListener("message",function(e){
 // Do not remove the line below as it will expose XSS vulnerabilities.
 if(!c(e.origin,i.location))throw new Error(e.origin+" is not allowed to override this storefront.");var t=e.data;if(t.gatewayId===d&&"bundle"===t.eventId){parent.postMessage({gatewayId:d,eventId:"promiseAcknowledgement",data:{pk:t.pk}},"*");var n=t.data;if(i.smartedit=i.smartedit||{},n.resources&&n.resources.properties)for(var r in n.resources.properties)// jshint ignore:line
 i.smartedit[r]=n.resources.properties[r];var a=document.getElementsByTagName("head")[0];
 //JS Files
 if(n.resources&&n.resources.js&&0<n.resources.js.length){var o=n.resources.js.filter(function(e){return!e.namespaceToCheck||!window[e.namespaceToCheck]}).map(function(e){return e.src});l(a,o,0)}
 //CSS Files
 n.resources&&n.resources.css&&0<n.resources.css.length&&f(a,n.resources.css,0),parent.postMessage({gatewayId:d,eventId:"promiseReturn",data:{pk:t.pk,type:"success"}},"*")}},!1),i.SmarteditWAI={},i.SmarteditWAI.isAllowed=c,i.SmarteditWAI.createAllowOriginRegex=r,Object.freeze(i.SmarteditWAI)}(window);