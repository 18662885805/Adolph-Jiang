<template>  
	<view class="container" :style="{background:'#174264'}">
		<view class="header_content">
		</view>
		<view class="icon_content">
			<navigator url="/pages/scan/index"  open-type='switchTab' hover-class="navigator-hover">
				<view class="icon_item">				
					<image src="../../static/carryout-large.png" mode="aspectFit" :style="{width:'200upx'}"/>						
				    <text class="text" :style="{display:'block',width:'100%',textAlign:'center'}">物品携出</text>				
				</view>
			</navigator>
			<navigator url="/pages/card/index"  open-type='switchTab' hover-class="navigator-hover">
				<view class="icon_item">				
					<image src="../../static/card-large.png" mode="aspectFit" :style="{width:'200upx'}"/>						
				    <text class="text" :style="{display:'block',width:'100%',textAlign:'center'}">卡证查询</text>				
				</view>
			</navigator>	
			<!-- <view class="icon_item">
				<image src="../../static/qrcode-large.png" mode="aspectFit" @click="scan" :style="{width:'200upx'}"/>						
				<text class="text" :style="{display:'block',width:'100%',textAlign:'center'}">扫一扫</text>
			</view> -->
		</view>
		
		
		
	</view>
</template>  
<script>  
import uniGrid from "@/components/uni-grid/uni-grid.vue"
import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
import cmdNoticeBar from "@/components/cmd-notice-bar/cmd-notice-bar.vue"
    export default {
		
		data(){
			return {
				result:'',
				resultText:''
			}
		},
		onLoad() {
			
		},
		onShow(){	
		},
		onReady() {			
		},
		onHide(){			 
		},
		onUnload(){  		  
		},  
		methods:{
			scan(){
				var that = this;
				//（1）调用摄像头扫描
				uni.scanCode({
					onlyFromCamera: true,
				    success: function (res) {
				        console.log('条码内容：' + res.result);
						if(res.result){
							uni.setStorageSync('serial_number',res.result)
							uni.navigateTo({		
								 url: '/pages/scan/index'
							})
						}
				    }
				});	
			},
			ToCarryoutNew(){
				uni.switchTab({
				    url: '/pages/page3/index'
				});
			},
			
			initScan() {  
			    let _this = this;  
			    /* #ifdef APP-PLUS */  
			    main = plus.android.runtimeMainActivity();//获取activity  
			    /* var context = plus.android.importClass('android.content.Context'); */  
			    var IntentFilter = plus.android.importClass('android.content.IntentFilter');  
			    /* var Intent = plus.android.importClass('android.content.Intent'); */  
			    filter = new IntentFilter();  
			    filter.addAction("com.se4500.onDecodeComplete");  
			    receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver',{  
			    onReceive : function(context, intent) {  
			        plus.android.importClass(intent);  
			 /*这个se4500很坑，不同的手机或pda，这个值就不一样，要具体去查硬件api*/  
			        let code = intent.getStringExtra("se4500");  
			        /* rmker.showTip('条码:'+code); */  
			        /*调用本页面某方法*/  
			        _this.queryCode(code);  
			    }});  
			    /* #endif */  
			},  
			startScan(){  
			    /* #ifdef APP-PLUS */  
			    main.registerReceiver(receiver,filter);  
			    /* #endif */  
			},  
			stopScan(){  
			    /* #ifdef APP-PLUS */  
			    main.unregisterReceiver(receiver);  
			    /* #endif */  
			},  
			queryCode: function(code){  
			//防重复  
			    if(_codeQueryTag)return false;  
			    _codeQueryTag = true;  
			    setTimeout(function(){  
			        _codeQueryTag = false;  
			    },150);  
			    //到这里扫描成功了，可以调用自己的业务逻辑，code就是扫描的结果  
			},  
		},
		components: {
			uniGrid,
			uniGridItem,
			cmdNoticeBar
		}
    }  
</script>  
<style>
	
</style>
<style lang='scss' scoped>
	@function realSize($args) {
		@return $args / 1.5;
	}
	.container{
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #ffffff;
	}
	.header_content {
		width: 100%;
		height: 200rpx;		
	}
	.icon_content{
		width: 100%;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.icon_item{
		width: 300upx;
		height:300upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
	}
	.text{
		font-size: 45upx;
	}


</style>
