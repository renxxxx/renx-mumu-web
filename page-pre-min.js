var vConsole=new VConsole({onReady:function(){$("#__vconsole .vc-switch").text("vc"),vConsole.hideSwitch()}}),token=$.cookie("token");function randomnum(n){for(var e="",o=0;o<n;o++)e+=Math.floor(10*Math.random());return e}function isPc(){for(var n=navigator.userAgent,e=["Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"],o=!0,t=0;t<e.length;t++)if(n.indexOf(e[t])>0){o=!1;break}return o}function O(n){this.value=n,O.prototype.attr=function(n){if(this.last=null,!this.value||!n)return null;var e=n.split("."),o=this.value;for(var t in e)if(e[t].indexOf("[")>=0){var i=e[t].substring(0,e[t].indexOf("[")),r=e[t].substring(e[t].indexOf("[")+1,e[t].indexOf("]"));if(null==(o=o[i])||null==o){o=null;break}if(o.length<=r){o=null;break}o=o[r]}else if(null==(o=o[e[t]])||null==o){o=null;break}return o}}function o(n){return new O(n)}token||(token=(new Date).getTime()+randomnum(5),$.cookie("token",token,{path:"/"}));