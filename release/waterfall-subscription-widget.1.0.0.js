/**
 * almond 0.2.5 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

/**
 * @license RequireJS text 2.0.5+ Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/text for details
 */

var requirejs,require,define;(function(e){function t(e,t){return m.call(e,t)}function i(e,t){var i,r,n,a,s,o,l,u,c,d,p=t&&t.split("/"),f=g.map,w=f&&f["*"]||{};if(e&&"."===e.charAt(0))if(t){for(p=p.slice(0,p.length-1),e=p.concat(e.split("/")),u=0;e.length>u;u+=1)if(d=e[u],"."===d)e.splice(u,1),u-=1;else if(".."===d){if(1===u&&(".."===e[2]||".."===e[0]))break;u>0&&(e.splice(u-1,2),u-=2)}e=e.join("/")}else 0===e.indexOf("./")&&(e=e.substring(2));if((p||w)&&f){for(i=e.split("/"),u=i.length;u>0;u-=1){if(r=i.slice(0,u).join("/"),p)for(c=p.length;c>0;c-=1)if(n=f[p.slice(0,c).join("/")],n&&(n=n[r])){a=n,s=u;break}if(a)break;!o&&w&&w[r]&&(o=w[r],l=u)}!a&&o&&(a=o,s=l),a&&(i.splice(0,s,a),e=i.join("/"))}return e}function r(t,i){return function(){return c.apply(e,h.call(arguments,0).concat([t,i]))}}function n(e){return function(t){return i(t,e)}}function a(e){return function(t){f[e]=t}}function s(i){if(t(w,i)){var r=w[i];delete w[i],b[i]=!0,u.apply(e,r)}if(!t(f,i)&&!t(b,i))throw Error("No "+i);return f[i]}function o(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function l(e){return function(){return g&&g.config&&g.config[e]||{}}}var u,c,d,p,f={},w={},g={},b={},m=Object.prototype.hasOwnProperty,h=[].slice;d=function(e,t){var r,a=o(e),l=a[0];return e=a[1],l&&(l=i(l,t),r=s(l)),l?e=r&&r.normalize?r.normalize(e,n(t)):i(e,t):(e=i(e,t),a=o(e),l=a[0],e=a[1],l&&(r=s(l))),{f:l?l+"!"+e:e,n:e,pr:l,p:r}},p={require:function(e){return r(e)},exports:function(e){var t=f[e];return t!==void 0?t:f[e]={}},module:function(e){return{id:e,uri:"",exports:f[e],config:l(e)}}},u=function(i,n,o,l){var u,c,g,m,h,v,y=[];if(l=l||i,"function"==typeof o){for(n=!n.length&&o.length?["require","exports","module"]:n,h=0;n.length>h;h+=1)if(m=d(n[h],l),c=m.f,"require"===c)y[h]=p.require(i);else if("exports"===c)y[h]=p.exports(i),v=!0;else if("module"===c)u=y[h]=p.module(i);else if(t(f,c)||t(w,c)||t(b,c))y[h]=s(c);else{if(!m.p)throw Error(i+" missing "+c);m.p.load(m.n,r(l,!0),a(c),{}),y[h]=f[c]}g=o.apply(f[i],y),i&&(u&&u.exports!==e&&u.exports!==f[i]?f[i]=u.exports:g===e&&v||(f[i]=g))}else i&&(f[i]=o)},requirejs=require=c=function(t,i,r,n,a){return"string"==typeof t?p[t]?p[t](i):s(d(t,i).f):(t.splice||(g=t,i.splice?(t=i,i=r,r=null):t=e),i=i||function(){},"function"==typeof r&&(r=n,n=a),n?u(e,t,i,r):setTimeout(function(){u(e,t,i,r)},4),c)},c.config=function(e){return g=e,g.deps&&c(g.deps,g.callback),c},define=function(e,i,r){i.splice||(r=i,i=[]),t(f,e)||t(w,e)||(w[e]=[e,i,r])},define.amd={jQuery:!0}})(),define("almond",function(){}),define("waterfall-subscription-widget/console",[],function(){function e(e){return function(){var t=Array.prototype.join.call(arguments,"");return window.console[e]("waterfall-subscription-widget: "+t)}}for(var t,i=function(){},r={},n=["debug","log","error"],a=0;n.length>a;a++)t=n[a],r[t]=window.console?e(t):i;return r}),define("waterfall-subscription-widget/dom",["waterfall-subscription-widget/console"],function(e){function t(e,t){return"string"==typeof e&&(t=e,e=document),e.querySelector(t)}function i(e,t){return"string"==typeof e&&(t=e,e=document),e.querySelectorAll(t)}function r(e,t){var i=e.parentElement.querySelectorAll(t),r=0;do{if(i[r]===e)return!0;r++}while(i.length>r);return!1}function n(e,t){var i=e.parentElement;return i?r(i,t)?i:n(i,t):null}function a(t,i,r,n){return t?t.addEventListener?t.addEventListener(i,r,n):t.attachEvent?t.attachEvent(i,r):(e.error("el",t,"cannot listen to events"),!1):(e.error("cannot hook non-existent element"),!1)}function s(e,t){for(var i=e.className.split(" "),r=0;i.length>r;r++)if(i[r]===t)return!0;return!1}function o(e,t){var i=e.className.split(" ");s(e,t)||(i.push(t),e.className=i.join(" "))}function l(e,t){for(var i=e.className.split(" "),r=[],n=0;i.length>n;n++)i[n]!==t&&r.push(i[n]);e.className=r.join(" ")}return{qs:t,qsa:i,matches:r,closest:n,hook:a,hasClass:s,addClass:o,removeClass:l}}),define("text",["module"],function(e){var t,i,r,n,a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],s=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,o=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,l="undefined"!=typeof location&&location.href,u=l&&location.protocol&&location.protocol.replace(/\:/,""),c=l&&location.hostname,d=l&&(location.port||void 0),p=[],f=e.config&&e.config()||{};return t={version:"2.0.5+",strip:function(e){if(e){e=e.replace(s,"");var t=e.match(o);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:f.createXhr||function(){var e,t,i;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){i=a[t];try{e=new ActiveXObject(i)}catch(r){}if(e){a=[i];break}}return e},parseName:function(e){var t,i,r,n=!1,a=e.indexOf("."),s=0===e.indexOf("./")||0===e.indexOf("../");return-1!==a&&(!s||a>1)?(t=e.substring(0,a),i=e.substring(a+1,e.length)):t=e,r=i||t,a=r.indexOf("!"),-1!==a&&(n="strip"===r.substring(a+1),r=r.substring(0,a),i?i=r:t=r),{moduleName:t,ext:i,strip:n}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,i,r,n){var a,s,o,l=t.xdRegExp.exec(e);return l?(a=l[2],s=l[3],s=s.split(":"),o=s[1],s=s[0],!(a&&a!==i||s&&s.toLowerCase()!==r.toLowerCase()||(o||s)&&o!==n)):!0},finishLoad:function(e,i,r,n){r=i?t.strip(r):r,f.isBuild&&(p[e]=r),n(r)},load:function(e,i,r,n){if(n.isBuild&&!n.inlineText)return r(),void 0;f.isBuild=n.isBuild;var a=t.parseName(e),s=a.moduleName+(a.ext?"."+a.ext:""),o=i.toUrl(s),p=f.useXhr||t.useXhr;!l||p(o,u,c,d)?t.get(o,function(i){t.finishLoad(e,a.strip,i,r)},function(e){r.error&&r.error(e)}):i([s],function(e){t.finishLoad(a.moduleName+"."+a.ext,a.strip,e,r)})},write:function(e,i,r){if(p.hasOwnProperty(i)){var n=t.jsEscape(p[i]);r.asModule(e+"!"+i,"define(function () { return '"+n+"';});\n")}},writeFile:function(e,i,r,n,a){var s=t.parseName(i),o=s.ext?"."+s.ext:"",l=s.moduleName+o,u=r.toUrl(s.moduleName+o)+".js";t.load(l,r,function(){var i=function(e){return n(u,e)};i.asModule=function(e,t){return n.asModule(e,u,t)},t.write(e,l,i,a)},a)}},"node"===f.env||!f.env&&"undefined"!=typeof process&&process.versions&&process.versions.node?(i=require.nodeRequire("fs"),t.get=function(e,t){var r=i.readFileSync(e,"utf8");0===r.indexOf("﻿")&&(r=r.substring(1)),t(r)}):"xhr"===f.env||!f.env&&t.createXhr()?t.get=function(e,i,r,n){var a,s=t.createXhr();if(s.open("GET",e,!0),n)for(a in n)n.hasOwnProperty(a)&&s.setRequestHeader(a.toLowerCase(),n[a]);f.onXhr&&f.onXhr(s,e),s.onreadystatechange=function(){var t,n;4===s.readyState&&(t=s.status,t>399&&600>t?(n=Error(e+" HTTP status: "+t),n.xhr=s,r(n)):i(s.responseText))},s.send(null)}:"rhino"===f.env||!f.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var i,r,n="utf-8",a=new java.io.File(e),s=java.lang.System.getProperty("line.separator"),o=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(a),n)),l="";try{for(i=new java.lang.StringBuffer,r=o.readLine(),r&&r.length()&&65279===r.charAt(0)&&(r=r.substring(1)),i.append(r);null!==(r=o.readLine());)i.append(s),i.append(r);l=""+i+""}finally{o.close()}t(l)}:("xpconnect"===f.env||!f.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(r=Components.classes,n=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),t.get=function(e,t){var i,a,s={},o=new FileUtils.File(e);try{i=r["@mozilla.org/network/file-input-stream;1"].createInstance(n.nsIFileInputStream),i.init(o,1,0,!1),a=r["@mozilla.org/intl/converter-input-stream;1"].createInstance(n.nsIConverterInputStream),a.init(i,"utf-8",i.available(),n.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),a.readString(i.available(),s),a.close(),i.close(),t(s.value)}catch(l){throw Error((o&&o.path||"")+": "+l)}}),t}),define("text!templates/subscription-widget.template.html",[],function(){return'<div class="waterfall-subscription-widget-root"><fieldset><legend>Mobile Number:</legend><label><span class="waterfall-subscription-widget-label">Area code</span><input class="waterfall-subscription-widget-area-code" type="tel" placeholder="512" maxlength="3" pattern="[0-9]{3}"></label><label><span class="waterfall-subscription-widget-label">Prefix</span><input class="waterfall-subscription-widget-prefix" type="tel" placeholder="555" maxlength="3" pattern="[0-9]{3}"></label><label><span class="waterfall-subscription-widget-label">Line number</span><input class="waterfall-subscription-widget-line-no" type="tel" placeholder="1234" maxlength="4" pattern="[0-9]{4}"></label><button class="waterfall-subscription-widget-submit-btn" type="button">Sign Up</button></fieldset><p class="waterfall-subscription-widget-result"></p><p>Message and Data Rates May Apply</p><p>Service is compatible with most handsets. To unsubscribe at any time simply text&nbsp;<strong>STOP</strong>&nbsp;to 67463. For help, please send&nbsp;<strong>HELP</strong>&nbsp;to 67463 or contact us at support@msgme.com or 866-251-1200. Message frequency: No more than 30 message per month.</p><iframe src="//threebeta.waterfallmobile.com/widget/subscribe-frame.html"></iframe></div>'}),define("text!css/subscription-widget.css",[],function(){return'.waterfall-subscription-widget{/*! normalize.css v2.1.0 | MIT License | git.io/normalize */}.waterfall-subscription-widget article,.waterfall-subscription-widget aside,.waterfall-subscription-widget details,.waterfall-subscription-widget figcaption,.waterfall-subscription-widget figure,.waterfall-subscription-widget footer,.waterfall-subscription-widget header,.waterfall-subscription-widget hgroup,.waterfall-subscription-widget main,.waterfall-subscription-widget nav,.waterfall-subscription-widget section,.waterfall-subscription-widget summary{display:block}.waterfall-subscription-widget audio,.waterfall-subscription-widget canvas,.waterfall-subscription-widget video{display:inline-block}.waterfall-subscription-widget audio:not([controls]){display:none;height:0}.waterfall-subscription-widget [hidden]{display:none}.waterfall-subscription-widget html{font-family:sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}.waterfall-subscription-widget body{margin:0}.waterfall-subscription-widget a:focus{outline:thin dotted}.waterfall-subscription-widget a:active,.waterfall-subscription-widget a:hover{outline:0}.waterfall-subscription-widget h1{font-size:2em;margin:.67em 0}.waterfall-subscription-widget abbr[title]{border-bottom:1px dotted}.waterfall-subscription-widget b,.waterfall-subscription-widget strong{font-weight:bold}.waterfall-subscription-widget dfn{font-style:italic}.waterfall-subscription-widget hr{-moz-box-sizing:content-box;box-sizing:content-box;height:0}.waterfall-subscription-widget mark{background:#ff0;color:#000}.waterfall-subscription-widget code,.waterfall-subscription-widget kbd,.waterfall-subscription-widget pre,.waterfall-subscription-widget samp{font-family:monospace,serif;font-size:1em}.waterfall-subscription-widget pre{white-space:pre-wrap}.waterfall-subscription-widget q{quotes:"\\201C" "\\201D" "\\2018" "\\2019"}.waterfall-subscription-widget small{font-size:80%}.waterfall-subscription-widget sub,.waterfall-subscription-widget sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}.waterfall-subscription-widget sup{top:-0.5em}.waterfall-subscription-widget sub{bottom:-0.25em}.waterfall-subscription-widget img{border:0}.waterfall-subscription-widget svg:not(:root){overflow:hidden}.waterfall-subscription-widget figure{margin:0}.waterfall-subscription-widget fieldset{border:1px solid #c0c0c0;margin:0 2px;padding:.35em .625em .75em}.waterfall-subscription-widget legend{border:0;padding:0}.waterfall-subscription-widget button,.waterfall-subscription-widget input,.waterfall-subscription-widget select,.waterfall-subscription-widget textarea{font-family:inherit;font-size:100%;margin:0}.waterfall-subscription-widget button,.waterfall-subscription-widget input{line-height:normal}.waterfall-subscription-widget button,.waterfall-subscription-widget select{text-transform:none}.waterfall-subscription-widget button,.waterfall-subscription-widget html input[type="button"],.waterfall-subscription-widget input[type="reset"],.waterfall-subscription-widget input[type="submit"]{-webkit-appearance:button;cursor:pointer}.waterfall-subscription-widget button[disabled],.waterfall-subscription-widget html input[disabled]{cursor:default}.waterfall-subscription-widget input[type="checkbox"],.waterfall-subscription-widget input[type="radio"]{box-sizing:border-box;padding:0}.waterfall-subscription-widget input[type="search"]{-webkit-appearance:textfield;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;box-sizing:content-box}.waterfall-subscription-widget input[type="search"]::-webkit-search-cancel-button,.waterfall-subscription-widget input[type="search"]::-webkit-search-decoration{-webkit-appearance:none}.waterfall-subscription-widget button::-moz-focus-inner,.waterfall-subscription-widget input::-moz-focus-inner{border:0;padding:0}.waterfall-subscription-widget textarea{overflow:auto;vertical-align:top}.waterfall-subscription-widget table{border-collapse:collapse;border-spacing:0}.waterfall-subscription-widget fieldset{border:0;padding:0;margin:0}.waterfall-subscription-widget label{margin-right:.5em}.waterfall-subscription-widget label span.waterfall-subscription-widget-label{display:none}.waterfall-subscription-widget input.waterfall-subscription-widget-area-code,.waterfall-subscription-widget input.waterfall-subscription-widget-prefix{text-align:center;width:1.7999999999999998em}.waterfall-subscription-widget input.waterfall-subscription-widget-line-no{text-align:center;width:2.4em}.waterfall-subscription-widget iframe{width:0;height:0;display:none}.waterfall-subscription-widget .waterfall-subscription-widget-result{display:none}.waterfall-subscription-widget .waterfall-subscription-widget-result.waterfall-subscription-widget-success,.waterfall-subscription-widget .waterfall-subscription-widget-result.waterfall-subscription-widget-failure{display:block}'}),define("waterfall-subscription-widget/inject",["waterfall-subscription-widget/dom","text!templates/subscription-widget.template.html","text!css/subscription-widget.css"],function(e,t,i){function r(){var r=document.createElement("style");r.className="waterfall-subscription-widget-styles",r.innerHTML=i,document.querySelector("head").appendChild(r);var a,s,o=document.querySelectorAll(".waterfall-subscription-widget");for(a=0;o.length>a;a++)s=o[a],s.id="waterfall-subscription-widget-"+n,s.innerHTML=t,e.qs(s,"iframe").src+="#"+s.id,n++}var n=0;return r}),define("waterfall-subscription-widget",["waterfall-subscription-widget/console","waterfall-subscription-widget/dom","waterfall-subscription-widget/inject"],function(e,t,i){function r(e){return e?w+"-"+e:e}function n(e){return"."+w+e}function a(e){var t=e.getAttribute("pattern");return A[t]||(A[t]=RegExp(t)),A[t].test(e.value)}function s(e){if(t.matches(e,j)){var i=a(e);return i?t.removeClass(e,v):t.addClass(e,v),i}}function o(e){for(var i=t.qsa(e,j),r=null,n=0;i.length>n;n++)s(i[n])||null!==r||(r=n);return null!==r?(i[r].focus(),t.addClass(e,v)):t.removeClass(e,v),null===r}function l(e){var i=t.qs(e,n("-area-code")),r=t.qs(e,n("-prefix")),a=t.qs(e,n("-line-no"));return i.value+r.value+a.value}function u(e){var i=e.getAttribute(h),r=e.getAttribute(b),n=t.qs(e,"iframe");n.contentWindow.postMessage(JSON.stringify({type:"subscribe",widgetId:r,mobileNumber:i}),n.src),e.removeAttribute(h)}function c(i){var r,n;try{if(n=JSON.parse(i.data),!n.id)return e.error("Message with no id specified: "+i.data),void 0;r=t.qs("#"+n.id),z[n.type]?z[n.type](n,r):e.error('Unexpected message type "'+n.type+'": '+i.data)}catch(a){e.error('Failed to handle message "'+i.data+'": '+a.message)}}function d(e){var i=t.closest(e.target,q),n=t.qs(i,k),a=t.qs(i,C);t.removeClass(a,y),t.removeClass(a,x),o(i)&&(n.setAttribute("disabled",!0),t.addClass(i,r("busy")),i.setAttribute(h,l(i)),"true"===i.getAttribute(m)&&u(i))}function p(e){s(e.target)}function f(){var e;i(),e=t.qsa(q);for(var r=0;e.length>r;r++)t.hook(e[r],"blur",p,!0),t.hook(e[r],"change",p,!0),t.hook(t.qs(e[r],k),"click",d),t.hook(window,"message",c)}var w="waterfall-subscription-widget",g="data-waterfall-",b=g+"widgetid",m=g+"ready",h=g+"pending-mobile-number",v=r("invalid"),y=r("success"),x=r("failure"),q=n(""),k=n("-submit-btn"),C=n("-result"),j=n(" input"),A={},z={};if(z.ready=function(e,t){t.setAttribute(m,!0),t.hasAttribute(h)&&u(t)},z.result=function(e,i){var n,a,s=t.qs(i,C);if(t.removeClass(i,r("busy")),t.qs(i,k).removeAttribute("disabled"),s.innerHTML=e.message,e.success){for(n=t.qsa(i,j),a=0;n.length>a;a++)n[a].value="";t.addClass(s,y)}else t.addClass(s,x)},!document)return e.error("no `document` in scope"),void 0;var E=null,L=t.qs("script["+b+"]");return L?(E=L.getAttribute(b),L.removeAttribute(b),"complete"!==document.readyState?t.hook(window,"load",f):f(),void 0):(e.error(w+": could not find a script with a"+"`data-waterfall-widgetid` attribute"),void 0)}),require("waterfall-subscription-widget");