<template>
    <div id="_ManageVideos_SeriesVideos" style="width:100%;max-width:800px;position:absolute;top:0;bottom:0;background-color: #ffffff;font-size:0;
        left:50%;transform: translateX(-50%);box-sizing: border-box;" >
        
        <div style="width:100%;height:40px;line-height:40px;border-bottom: 1px solid #e8e8e8;box-sizing: border-box;position: relative;">
            <span style="font-size:16px;width:40px;height:40px;text-align: center;cursor: pointer;display: inline-block;" @click="$routerr.back()">
                <template v-if="!$routerr.isFirst()" >
                    &lt;
                </template>
                <template v-else >
                    <img src='../../assets/img/home.png' style="vertical-align: text-bottom;width: 50%;"/>
                </template>
            </span>
            <span style="font-size:16px;display: inline-block;width:calc(100% - 80px)">
                专辑 : {{series.name}}
            </span>
            <span @click="$router.push('/manage-videos/series?no='+query.no)"  style="display:inline-block;width:40px;height:40px;text-align: center;cursor: pointer;">
                <img src="../../assets/img/detail.png"  style="width:25px;height:25px;"/>
            </span>
        </div>
        
        <div style="width:100%;position:absolute;top:40px;bottom:0;left:0;right:0;">
            <div ref='videosScroll' @scroll="videosScroll" style="position: absolute;top:0;bottom:40px;width:100%;overflow: auto;">
                <div @click="videos.selected=item; $router.push({path:'./video', query:{no:item.no}})" :key=item.no v-for="item,index in videos.rows" 
                    style="width:32.3%;height:160px;cursor: pointer;margin:0.5%;box-sizing: border-box;position: relative;display:inline-block;
                        vertical-align: middle;"
                    :style="{backgroundColor:videos.selected==item?'rgb(214 214 214 / 0.5)':'unset'}">
                    <img :src="item.cover" draggable="false" style="display:block;width:100%;height:160px;object-fit: cover;"/>
                    <div style="height:15px;width:100%;background-color: rgba(255, 255, 255, 0.5);position: absolute;top:145px;">
                        <span style="display: inline-block;">
                            <img src="../../assets/img/comment.png" style="width:15px;vertical-align: middle;" draggable="false"/>
                            <span style="font-size: 12px;vertical-align: middle;margin-left:2px;">
                                {{item.commentCount?item.commentCount:0}}
                            </span>
                        </span>
                        <span style="display: inline-block;margin-left:10px;">
                            <img src="../../assets/img/view.png" style="width:15px;vertical-align: middle;" draggable="false"/>
                            <span style="font-size: 12px;vertical-align: middle;margin-left:2px;">
                                {{item.viewCount?item.viewCount:0}}
                            </span>
                        </span>
                    </div>
                    <div v-if="videos.selected==item" style="position: absolute;top:0;bottom:0;left:0;right:0;background-color: rgb(12 12 12 / 64%);">
                    </div>
                    <div @click.stop="videos.coverSelected=item" v-if="videos.coverSelected!=item" style="position: absolute;top:0;right:0;width:25px;
                        height:25px;line-height: 25px;background-color: #ffffff;text-align: center;">
                        <img src="../../assets/img/more.png" style="width:20px;"/>
                    </div>
                    <div v-if="videos.coverSelected==item" @click.stop="" style="position: absolute;top:0;bottom:0;left:0;right:0;background-color: #ffffffdc;">
                        <div @click="videos.coverSelected=null" style="height:30px;line-height: 30px;border-bottom: 1px solid #838383;text-align: center;font-size: 16px;">
                            关闭
                        </div>
                        <div style="height:30px;line-height: 30px;border-bottom: 1px solid #838383;text-align: center;font-size: 16px;">
                            <span @click="videoMoveLeft(index)" style="display: inline-block;width:50%;border-right: 1px solid #838383;">&lt;</span>
                            <span @click="videoMoveRight(index)" style="display: inline-block;width:50%;">&gt;</span>
                        </div>
                    </div>
                </div>
                <div @click="(!videos.isNoData && !videos.isFullData) ? loadMoreVideos() : ''" style="width:100%;line-height:40px;font-size: 16px;text-align: center;color:#cccccc;">
                    {{videos.isNoData?'暂无数据':videos.isFullData?'已全部加载':'点击加载更多'}}
                </div>
            </div>
            <div @click="createVideo" style="width:100%;text-align: center;height:40px;line-height: 40px;font-size: 16px;position: absolute;bottom:0;cursor: pointer;
                background-color: rgb(179, 179, 179);">
                创建视频
            </div>
        </div>

        <div v-if="isCreateVideo" style="position: absolute;top:0;bottom:0;left:0;right:0;background-color: rgba(25, 25, 25, 0.9);">
            <div style="width:100%;height:380px;box-sizing: border-box;background-color: #ffffff;margin-top: 10%;position: relative;">
                <div style="height:40px;line-height:40px;text-align: center;font-size: 16px;">
                    创建视频
                </div>
                <video :src="fileObjectUrl" controls style="height:300px;width:100%;background-color: #000000;"></video>
                <div style="margin-top:25px;position: absolute;bottom:0;width:100%;">
                    <button @click="confirmCreateVideo" style="font-size:16px;width:50%;border:none;box-sizing: border-box;background-color: #838383;height:40px;color:#e8e8e8;">
                        确定
                    </button>
                    <button @click="isCreateVideo=0" style="font-size:16px;width:50%;border:none;box-sizing: border-box;background-color: #d4d4d4;height:40px;">
                        取消
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: '_ManageVideos_SeriesVideos',
    data() {
        return {
           query:{},
           series:{},
           isCreateVideo:0,
           file:null,
           videos:{
                rows:[],
                rcount:20,
                isNoData:0,
                isFullData:0,
                selected:null,
                coverSelected:null,
                map:{}
            },
        }
    },
    methods:{
        videosScroll(){
            let ts = this
            if(ts.$uu.isScrollBottom(ts.$refs.videosScroll)){
                ts.loadMoreVideos()
            }
        },
        confirmCreateVideo(){
            let ts = this
            var formData = new FormData()
            formData.append('file',ts.file)
            ts.$axios.post('/mumu/upload-file', formData, {
                headers:{'Content-Type':'multipart/form-data'}
            }).then(res=>{
                if(res.data.code==0){
                    ts.$axios.post('/mumu/manage-my-videos/create-video', ts.$qs.stringify({
                        seriesNo:ts.query.no,
                        url:res.data.data.url
                    })).then(res=>{
                        if(res.data.code==0){
                            let no = res.data.data.no
                            let newRow = {
                                no:no,
                                url:res.data.data.url
                            }
                            ts.videos.rows.unshift(newRow)
                            ts.videos.rows.selected = newRow
                            ts.isCreateVideo=0
                            ts.$router.push({path:'./video',query:{no:no}})
                        }else{
                            ts.$notify({message:res.data.message})
                        }
                    })
                } else {
                    ts.$notify({message:res.data.message})
                }
            })
        },
        createVideo(){
            let ts = this
            ts.$$('<input type="file"/>').change(function(){
                ts.isCreateVideo=1
                ts.file=this.files[0]
                ts.fileObjectUrl=URL.createObjectURL(ts.file)
            }).click()
        },
        loadMoreVideos(){
            let ts = this
            if(ts.videos.isNoData || ts.videos.isFullData)
                return;
            ts.$axios.post('/mumu/manage-my-videos/get-series-videos',ts.$qs.stringify({
                seriesNo: ts.query.no,
                rstart: ts.videos.rows.length+1,
                rcount: ts.videos.rcount
            })).then(function (res) {
                let rows = res.data.data.rows;
                if(rows.length==0 && ts.videos.rows.length==0)
                    ts.videos.isNoData=1
                if(rows.length==0 && ts.videos.rows.length>0)
                    ts.videos.isFullData=1
                ts.videos.rows.push(...rows)
                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    ts.videos.map[row.no]=row
                }
            })
        },
        start(){
            let ts = this
            ts.fullPath = ts.$route.fullPath;
            ts.$store.components[ts.$el.id]=ts
            ts.query = ts.$uu.getCurrentQuery()
            ts.$axios.post('/mumu/manage-my-videos/get-series',ts.$qs.stringify({no:ts.query.no})).then(res=>{
                ts.series=res.data.data.row
            })
            ts.videos= {
                rows:[],
                rcount:20,
                selected:null,
                coverSelected:null,
                map:{}
            }
            ts.loadMoreVideos()
        },
        videoMoveLeft(index){
            let ts = this
            let left = ts.videos.rows[index-1]
            let left2 = ts.videos.rows[index-2]
            let current = ts.videos.rows[index]
            if(!left)
                return;
            let numInSeries = null;
            if(left2){
                numInSeries = (left2.numInSeries + left.numInSeries) / 2
            }else
                numInSeries = left.numInSeries - 1
            ts.$axios.post('/mumu/manage-my-videos/modify-video',ts.$qs.stringify({
                no: current.no,
                numInSeries: numInSeries
            })).then(function (res) {
                if(res.data.code == 0){
                    let temp = ts.videos.rows[index];
                    ts.videos.rows[index]=ts.videos.rows[index-1];
                    ts.videos.rows[index-1] = temp
                }
            })
        },
        videoMoveRight(index){
            let ts = this
            let right = ts.videos.rows[index+1]
            let right2 = ts.videos.rows[index+2]
            let current = ts.videos.rows[index]
            if(!right)
                return;
            let numInSeries = null;
            if(right2){
                numInSeries = (right2.numInSeries + right.numInSeries) / 2
            }else
                numInSeries = right.numInSeries + 1
            ts.$axios.post('/mumu/manage-my-videos/modify-video',ts.$qs.stringify({
                no: current.no,
                numInSeries: numInSeries
            })).then(function (res) {
                if(res.data.code == 0){
                    let temp = ts.videos.rows[index];
                    ts.videos.rows[index]=ts.videos.rows[index+1];
                    ts.videos.rows[index+1] = temp
                }
            })
        }
    },
    activated(){
        
        let ts = this
        ts.prevTs = window.ts
        window.ts = ts
        if(!ts.fullPath || (ts.fullPath && ts.fullPath != ts.$route.fullPath))
            ts.start()
    },
    deactivated(){
        let ts = this
        window.ts = ts.prevTs
    }
}
</script>

<style>
body {
    background-color: #191919;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@media screen and (min-width: 800px) {
    
}
</style>
