let uu={}

function getUrlParam(name)
{
       var query =decodeURIComponent(window.location.search.substring(1));
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == name){
                 return pair[1]
                }
       }
       return null;
}
uu.getUrlParam=getUrlParam;

function trimToBlank(value)
{
      var v = null
      if(value==null||value==undefined)
          return ''
          v =value+''
          return v.toString().trim();
        
}
uu.trimToBlank=trimToBlank;

function trimToNull(value)
{
      var v = null
      if(value==null||value==undefined)
          return null
          v = value+''
          return v.toString().trim();
}
uu.trimToNull=trimToNull;

function isEmpty(value)
{
      if(value==null||value==undefined||value.toString().trim()=='')
          return true
      else
        return false
}
uu.isEmpty=isEmpty;

function isNull(value)
{
      if(value==null||value==undefined)
          return true
      else
        return false
}
uu.isNull=isNull;

function isBlank(value)
{
      if(value==null||value==undefined)
          return false
        if(value.toString().trim()=='')
          return true
        else
          return false
}
uu.isBlank=isBlank;


function O(target){
  this.target=target;
  
  O.prototype.attr = function(keyChain,newValue){
    var carrier=target;
    var parent=null;
    if(!this.target || !keyChain){
      return null;
    }
     var keys= keyChain.split('.')
     for(var i in keys){
          parent=target[keys[i-1]];
         if(keys[i].indexOf('[')>=0){
            var key=keys[i].substring(0,keys[i].indexOf('['));
            var index = keys[i].substring(keys[i].indexOf('[')+1,keys[i].indexOf(']'));
            carrier=carrier[key];
            if(carrier==null || carrier==undefined){
              carrier=null;
              break;
            }
            if(carrier.length<=index){
               carrier=null;
                break;
            }
            carrier=carrier[index];
         }else {
            carrier=carrier[keys[i]];
            if(carrier==null || carrier==undefined){
              carrier=null;
              break;
            }
         }
     }
     if(newValue !== undefined && parent){
       parent[keys[keys.length-1]]=newValue
     }
     return carrier;
  }
}
uu.O=O;

function o(data){
  return new O(data);
}
uu.o=o;


function is_weixn(){  
  var ua = navigator.userAgent.toLowerCase();  
  if(ua.match(/MicroMessenger/i)=="micromessenger") {  
      return true;  
  } else {  
      return false;  
  }  
}
uu.is_weixn=is_weixn;


function randomnum(n){ 
  var t=''; 
  for(var i=0;i<n;i++){ 
      t+=Math.floor(Math.random()*10); 
  }
  t=t.replace(/^0/,'1')
  return t; 
}
uu.randomnum=randomnum;

function isPc() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length;v++){
    if (userAgentInfo.indexOf(Agents[v]) > 0){
      flag = false;
      break;
    }
  }
  return flag;
}
uu.isPc=isPc;

function clearAllCookie() {  
  var keys = document.cookie.match(/[^ =;]+(?==)/g);  
  if(keys) {  
      for(var i = keys.length; i--;)  
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
  }  
}
uu.clearAllCookie=clearAllCookie;

function copy(param){
  param.text;
  var textarea = document.createElement('textarea');
  textarea.style['position']='absolute'
  textarea.style['top']='-1000px'
  document.body.appendChild(textarea)
  textarea.value=param.text;
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea)
}
uu.copy=copy;

function changearr(arr,i1,i2){
  var o3=arr[i1];
  arr[i1]=arr[i2]
  arr[i2]=o3
}
uu.changearr=changearr;

export default uu;