var tt,video,videoNo=window.location.search.substring(1).split("&")[0].split("=")[1],lastCurrentTime=localStorage.getItem("currentTime-"+videoNo),currentIndex=parseInt(localStorage.getItem("currentIndex-"+videoNo)),currentCaption=JSON.parse(localStorage.getItem("currentCaption-"+videoNo)),jumpedcaption=currentCaption,runstep=0,playRestored=0,restored=0,zh={subtitles:"",monitor:"",subtitlesList:[]},en={subtitles:"",monitor:"",subtitlesList:[],current:currentCaption,currentIndex:currentIndex},chooseDomList=[],translationtext="",_this=window,videoele=$("#video")[0];function init(){getVideo()}function getVideo(){$.ajax({url:"/mumu/video?",type:"get",data:"videoNo="+videoNo,async:!0,success:function(e){(video=e.data.video).height&&video.width&&($("#video").css("height",parseInt($("#video").css("width").replace("px",""))*(video.height/video.width)),$("#summtrans").css("height",$("#video").css("height")),$("#wordsframe").css("height",$("#video").css("height"))),$.ajax({url:video.captionUrl,type:"get",async:!0,success:function(e){getEnSubtitles(e)}})}})}function restore(){if(!restored){if(0==lastCurrentTime)return void(restored=1);lastCurrentTime&&($("#video")[0].currentTime=lastCurrentTime,$("#video")[0].currentTime>=lastCurrentTime&&(restored=1))}}function playRestore(){playRestored||lastCurrentTime&&($("#video")[0].currentTime=lastCurrentTime,$("#video")[0].currentTime>=lastCurrentTime&&(playRestored=1))}function onCanPlay(){playRestore()}function onDurationChange(){}function onLoadedMetadata(){}function onLoadedData(){}function onLoadStart(){}function onPlaying(){}function onProgress(){}function onReadyStateChange(){}function onSuspend(){}function onTimeUpdate(){restore(),videoele.paused&&monitor(1e3*videoele.currentTime)}function monitor(e){if($("#loading").hide(),localStorage.setItem("durationsec-"+videoNo,$("#video")[0].duration),localStorage.setItem("currentTime-"+videoNo,$("#video")[0].currentTime),!(_this.en.current&&_this.en.current.startTime<=e&&e<_this.en.current.endTime)){var t=_this.en.subtitlesList[_this.en.currentIndex+1];if(t&&t.startTime<=e&&e<t.endTime)return _this.en.current=t,_this.en.currentIndex++,void _this.setline(t);t&&e<t.startTime&&(!_this.en.current||e>_this.en.current.endTime)||$(_this.en.subtitlesList).each((function(t,s){if(s.startTime<=e&&e<s.endTime){debugger;return _this.en.current=s,_this.en.currentIndex=t,void _this.setline(s)}}))}}function onWaiting(){}function onClick(){$("#video").attr("controls",!0)}function showSearchFn(){$(".dialogSearch input").val($(".dialogTitle #kw").html()),$(".dialogSearch").css({display:"flex"}),$(".dialogSearch input").focus(),$(".dialogTitle").css({display:"none"}),pauseVideo()}function searchClearFn(){$(".dialogSearch input").val("")}function hideSearchFn(){$(".dialogTitle #kw").html($(".dialogSearch input").val()),$(".dialogSearch").css({display:"none"}),$(".dialogTitle").css({display:"block"}),$(".dialogSearch input").val()||($("#zh_subtitles span").css({background:"transparent",color:"black"}),$(".dialog").css({display:"none"}),pauseVideo(),$(".yibiao").html(""),$(".fanyi").html(""))}function searchFn(e){if(13==e.keyCode){translatee($(".searchClass").val()),hideSearchFn()}}function getEnSubtitles(e){let t=[];t=e.split(/[(\r\n)\r\n]+/),t.forEach(((e,s)=>{e||t.splice(s,1);new RegExp(/^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d/).test(e)&&_this.en.subtitlesList.push({startTime:_this.timeCycle(e.split(" --\x3e ")[0].replace(",",".")),endTime:_this.timeCycle(e.split(" --\x3e ")[1].replace(",",".")),chValue:t[s+1],enValue:t[s+2]})})),_this.en.subtitlesList.forEach(((e,t)=>{t<_this.en.subtitlesList.length-2&&_this.en.subtitlesList[t+1].startTime-e.endTime>1e3&&_this.en.subtitlesList.splice(t+1,0,{startTime:parseInt(e.endTime)+1e3,endTime:_this.en.subtitlesList[t+1].startTime,chValue:"",enValue:""})}));var s=_this.en.subtitlesList[0];s&&s.startTime>0&&_this.en.subtitlesList.splice(0,0,{startTime:0,endTime:s.startTime,chValue:"",enValue:""});var n=_this.en.subtitlesList[_this.en.subtitlesList.length-1];n&&_this.en.subtitlesList.push({startTime:parseInt(n.endTime)+1e3,endTime:parseInt(n.endTime)+2e3,chValue:"",enValue:""}),_this.en.currentIndex>=0&&(_this.en.current=_this.en.subtitlesList[_this.en.currentIndex],_this.setline(_this.en.current)),$("#video").attr("src",video.url)}function setline(e){if(!e)return;localStorage.setItem("currentCaption-"+videoNo,JSON.stringify(e)),localStorage.setItem("currentIndex-"+videoNo,_this.en.currentIndex);let t=e.enValue.split(" ");$("#zh_subtitles").html(""),_this.en.currentwords=t;for(let e=0;e<t.length;e++)$("#zh_subtitles").append('<span onmousedown="pauseVideo()" ontouchstart="pauseVideo()" onclick="pauseVideo();locateWord('+(e+1)+')" onmouseover="this.ttt=setTimeout(function(){pauseVideo();locateWord('+(e+1)+');},100)" onmouseout="clearTimeout(this.ttt)" style="user-select: none;display: inline-block;cursor: pointer;font-weight: 900;font-size: 18px;padding-left:3px;padding-right:3px;" class="font span'+e+'">'+t[e]+"</span>");$(".dialog").css({display:"none"}),$(".dialogTitle #kw").html(""),currwordno=0,$(".dialog").css({display:"none"}),$(".dialogTitle #kw").html(""),$("#summtrans").hide(),$("#video").css("top","0px")}function prevline(){if(_this.en.currentIndex>0){var e=_this.en.currentIndex,t=_this.en.subtitlesList[--e];t&&(t.enValue||(t=_this.en.subtitlesList[--e])),t&&(_this.en.currentIndex=e,_this.en.current=t,jumpedcaption=t,$("#video")[0].currentTime=t.startTime/1e3,_this.setline(t),currwordno=0,chHideDialog(),$(".dialog").css({display:"none"}),$(".dialogTitle #kw").html(""))}}function currline(){var e=_this.en.currentIndex,t=_this.en.current;t&&(t.enValue||(t=_this.en.subtitlesList[--e]),t&&(_this.en.currentIndex=e,_this.en.current=t,$("#video")[0].currentTime=t.startTime/1e3,jumpedcaption=t,_this.setline(t),currwordno=0,chHideDialog(),$(".dialog").css({display:"none"}),$(".dialogTitle #kw").html("")))}function nextline(){var e=_this.en.currentIndex,t=_this.en.subtitlesList[++e];t&&(t.enValue||(t=_this.en.subtitlesList[++e]),t&&(_this.en.currentIndex=e,_this.en.current=t,jumpedcaption=t,$("#video")[0].currentTime=t.startTime/1e3,_this.setline(t),currwordno=0,chHideDialog(),$(".dialog").css({display:"none"}),$(".dialogTitle #kw").html("")))}function translatee(e){e=e.replace(/^(,|\.|\?|!)+/,"").replace(/(,|\.|\?|!)+$/,""),$("#summtrans").show(),$("#summtrans-word").text(e),$("#word-in").val(e),clearTimeout(window.timeoutdo1),window.timeoutdo1=setTimeout((function(){if(window.aaa=setTimeout((function(){$("#summtrans-phonetic").hide(),$("#summtrans-speak").hide(),$("#summtrans-value").hide()}),500),null==e||null==e||!e.toString().trim())return $("#summtrans-phonetic").hide(),$("#summtrans-speak").hide(),void $("#summtrans-value").hide();$.ajax({url:"/mumu/translate?from="+video.language+"&to=2&q="+e,type:"get",async:!0,success:function(e){clearTimeout(window.aaa),e.data.phonetic?$("#summtrans-phonetic").text("/"+e.data.phonetic+"/").show():$("#summtrans-phonetic").hide(),e.data.speakUrl?$("#summtrans-speak").attr("play-url",e.data.speakUrl).show():$("#summtrans-speak").hide(),$("#summtrans-vv").html("").scrollTop(0),e.data.translations&&$(e.data.translations).each((function(e,t){$("#summtrans-vv").append(`<div>${t}</div>`)})),e.data.webTranslations&&($("#summtrans-vv").append('<div style="margin-top:10px;">网络释义: </div>'),$(e.data.webTranslations).each((function(e,t){$("#summtrans-vv").append(`<div>${t}</div>`)}))),$("#summtrans-vv").show(),$("#summtrans-value").show(),$("#summtrans").show(),$("#video").css("top","-1000px")}})}),200)}function pauseVideo(){$("#video")[0].pause()}function playVideo(){$("#video")[0].play()}function videoPlay(){$(".dialog").hide(),$("#summtrans").hide(),$("#summtrans-word").text(""),$("#wordsframe").hide(),$("#word-in").val(""),$("#summtrans-value").hide(),$("#summtrans-vv").text(""),$("#summtrans-phonetic").text("").hide(""),$("#summtrans-speak").attr("play-src","").hide(""),$("#video").css("top","0px"),clearInterval(_this.en.monitor),_this.en.monitor=setInterval((function(){if(jumpedcaption){if(!(jumpedcaption.startTime/1e3<videoele.currentTime))return;jumpedcaption=null}monitor(1e3*videoele.currentTime)}),10),currwordno=0,_this.translationtext="",$("#zh_subtitles span").css({background:"transparent",color:"black"}),$(".startFn").css({display:"none"}),$(".stopFn").css({display:"inline"}),$(".dialog").css({display:"none"}),$(".dialogTitle #kw").html(""),$(".searchClass").val(""),$(".yibiao").html(""),$(".fanyi").html("")}function videoPause(){clearInterval(_this.en.monitor),$(".stopFn").css({display:"none"}),$(".startFn").css({display:"inline"})}function enSubtitlesShow(){1==$("#zh_subtitles").css("opacity")?($("#zh_subtitles").css("opacity",0),$("#hideBtn").text("SHOW")):($("#zh_subtitles").css("opacity",1),$("#hideBtn").text("HIDE"))}function chShowDialog(){if(!_this.en.current)return;$("#video")[0].currentTime;$(".chDialog").css("display","block"),$(".chDialog div").html(_this.en.current.chValue),pauseVideo()}function chHideDialog(){$(".chDialog").css("display","none")}function timeCycle(e){let t=e.split(":"),s=0;return t.forEach(((e,t)=>{switch(t){case 0:s+=60*parseFloat(e)*60*1e3;break;case 1:s+=60*parseFloat(e)*1e3;break;case 2:s+=1e3*parseFloat(e);break}})),s}function touchstartFn(e){_coordinates={clientX:e.changedTouches[0].clientX,clientY:e.changedTouches[0].clientY,pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY},choooseStart(_coordinates)}function touchmoveFn(e){_coordinates={clientX:e.changedTouches[0].clientX,clientY:e.changedTouches[0].clientY,pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY},choooseMove(_coordinates)}function touchendFn(e){_coordinates={clientX:e.changedTouches[0].clientX,clientY:e.changedTouches[0].clientY,pageX:e.changedTouches[0].pageX,pageY:e.changedTouches[0].pageY},choooseEnd(_coordinates)}function choooseStart(e){let t=$("#zh_subtitles").width()+$("#zh_subtitles").offset().left-5,s=$("#zh_subtitles").height()+$("#zh_subtitles").offset().top-5;if(chooseDomList=[],$("#zh_subtitles span").css({background:"transparent",color:"black"}),ele=document.elementFromPoint(e.pageX,e.pageY),!$(ele).hasClass("font"))return;let n=e.clientX||e.pageX,i=e.clientY||e.pageY;t-5>n&&n>$("#zh_subtitles").offset().left+5&&$("#zh_subtitles").offset().top+5<i&&i<s-5&&ele.className.lastIndexOf("font span ")<0&&" "!=ele.innerHTML&&(_this.chooseDomList.push({class:ele.className,value:ele.innerHTML}),$("."+ele.className.split(" ")[1]).css({background:"#d2cbcb",color:"black"}))}function choooseMove(e){if(ele=document.elementFromPoint(e.pageX,e.pageY),!$(ele).hasClass("font"))return;let t=e.clientX||e.pageX,s=e.clientY||e.pageY,n=$("#zh_subtitles").width()+$("#zh_subtitles").offset().left,i=$("#zh_subtitles").height()+$("#zh_subtitles").offset().top;if(n-5>t&&t>$("#zh_subtitles").offset().left+5&&$("#zh_subtitles").offset().top+5<s&&s<i-5&&ele.className.lastIndexOf("font span ")<0){let e=!0;if(_this.chooseDomList.findIndex((function(t,s){t.class==ele.className&&(e=!1)})),e&&" "!=ele.innerHTML)if(_this.chooseDomList.length){let e=parseInt(_this.chooseDomList[_this.chooseDomList.length-1].class.replace("font span","")),t=parseInt(ele.className.replace("font span",""));if(t==e+1)_this.chooseDomList.push({class:ele.className,value:ele.innerHTML}),$("."+ele.className.split(" ")[1]).css({background:"#d2cbcb",color:"black"});else if(t>e+1)for(let s=e;s<t;s++)$(".span"+s),_this.chooseDomList.push({class:$(".span"+s).attr("class"),value:$(".span"+s).html()}),$(".span"+s).css({background:"#d2cbcb",color:"black"});else for(let s=t;s<e;s++)$(".span"+s),_this.chooseDomList.push({class:$(".span"+s).attr("class"),value:$(".span"+s).html()}),$(".span"+s).css({background:"#d2cbcb",color:"black"})}else _this.chooseDomList.push({class:ele.className,value:ele.innerHTML}),$("."+ele.className.split(" ")[1]).css({background:"#d2cbcb",color:"black"})}}function choooseEnd(e){ele=document.elementFromPoint(e.pageX,e.pageY);for(let e=0;e<_this.chooseDomList.length-1;e++)for(let t=0;t<_this.chooseDomList.length-e-1;t++)if(parseInt(_this.chooseDomList[t].class.replace("font span",""))>parseInt(_this.chooseDomList[t+1].class.replace("font span",""))){let e=_this.chooseDomList[t];_this.chooseDomList[t]=_this.chooseDomList[t+1],_this.chooseDomList[t+1]=e}let t="";$(_this.chooseDomList).each((function(e,s){e>0?t+=" "+s.value.replace(/^(,|\.|\?|!)+/,"").replace(/(,|\.|\?|!)+$/,""):t=s.value.replace(/^(,|\.|\?|!)+/,"").replace(/(,|\.|\?|!)+$/,"")})),t?(_this.translationtext=t,translatee(t)):_this.translationtext="",$(".searchClass").blur()}currentCaption&&_this.setline(currentCaption),init(),$(".yibiao").on("click","span svg",(function(){new Audio($(this).attr("playsrc")).play()})),$("#zh_subtitles").mousedown((e=>{_this.moveStata=!0,_coordinates={clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY},choooseStart(_this._coordinates),$("#zh_subtitles").mousemove((e=>{_this.moveStata&&(_coordinates={clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY},_this.choooseMove(_this._coordinates))})).mouseup((function(e){_this.moveStata=!1,_coordinates={clientX:e.clientX,clientY:e.clientY,pageX:e.pageX,pageY:e.pageY},_this.choooseEnd(_this._coordinates),$("#zh_subtitles").unbind("mousemove").unbind("mouseup")}))}));var lastTouchEnd,currwordno=0,keyCodes=[];function locateWord(e){currwordno=e,$(".font").css({background:"transparent"}),$(".font.span"+(currwordno-1)).css({background:"#d2cbcb"}),pauseVideo(),$("#summtrans-word").show(),currwordno>0&&($("#wordsframe").hide(),translatee(_this.en.currentwords[currwordno-1]))}function onresize(){isPc()?$("#gearframe").hide():$("#gearframe").show(),video.height&&video.width&&$("#video").css("height",parseInt($("#video").css("width").replace("px",""))*(video.height/video.width))}document.onkeydown=function(e){var t=e||window.e,s=t.keyCode||t.which,n=(keyCodes=[]).pop();switch(null!=n&&null!=n&&keyCodes.push(n),s!=n&&keyCodes.push(s),keyCodes.join()){case"27":$("#summtrans").hide(),$("#summtrans-word").text(""),$("#summtrans-phonetic").text("").hide(),$("#summtrans-speak").attr("play-url","").hide(),$("#summtrans-value").hide(),$("#summtrans-vv").text(""),$("#wordsframe").hide(),$("#word-in").val(""),$("#words .word").remove(),$("#video").css("top",0);break;case"32":if(document.activeElement==$("#word-in")[0])return;$("#video")[0].paused?(chHideDialog(),playVideo()):pauseVideo();break;case"13":document.activeElement==$("#word-in")[0]?($("#wordsframe").hide(),translatee($("#word-in").val()),$("#word-in").val()||($("#summtrans").hide(),$("#wordsframe").hide(),$("#video").css("top",0))):($("#summtrans").hide(),$("#wordsframe").show(),$("#word-in").focus(),$("#word-in").trigger("input"),pauseVideo());break;case"97":case"65":if(document.activeElement==$("#word-in")[0])return;prevline();break;case"115":case"83":if(document.activeElement==$("#word-in")[0])return;currline();break;case"119":case"87":if(document.activeElement==$("#word-in")[0])return;$(".chDialog").is(":hidden")?chShowDialog():chHideDialog();break;case"100":case"68":if(document.activeElement==$("#word-in")[0])return;nextline();break;case"113":case"81":if(document.activeElement==$("#word-in")[0])return;currwordno<=1?currwordno=_this.en.currentwords.length:currwordno--,locateWord(currwordno);break;case"101":case"69":if(document.activeElement==$("#word-in")[0])return;++currwordno>_this.en.currentwords.length&&(currwordno=1),locateWord(currwordno);break}},document.onkeyup=function(e){keyCodes.pop()},document.onfocus=function(){keyCodes=[]},window.onbeforeunload=function(){navigator.sendBeacon("/mumu/page-out")},document.addEventListener("touchend",(function(e){var t=(new Date).getTime();t-lastTouchEnd<=300&&e.preventDefault(),lastTouchEnd=t}),!1),isPc()&&$("#gearframe").hide();