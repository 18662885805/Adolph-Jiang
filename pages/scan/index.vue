<template>
	<view>
		<view class="top-content">
			<image class="scan-icon" src="../../static/scan.png" @click="scanSearch"></image>
			<input class="search-input"  v-model="search_code"/>
			<view class="search-button" @click="handleSearch">搜索</view>
		</view>
		<view class="cu-list menu  margin-top margin-bottom" v-if="items">
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">编号</text>
				</view>
				<view class="action">
					<text>{{items.code}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">携出人姓名</text>
				</view>
				<view class="action">
					<text>{{ items.take_person }}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">部门</text>
				</view>
				<view class="action">
					<text>{{ items.department }}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">手机号</text>
				</view>
				<view class="action">
					<text>{{ items.phone }}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">厂区</text>
				</view>
				<view class="action">
					<text>{{ items.factory&&items.factory.name}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">携出日期</text>
				</view>
				<view class="action">
					<text>{{items.out_day}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">携出原因</text>
				</view>
				<view class="action">
					<text>{{items.reason}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">是否需要归还</text>
				</view>
				<view class="action">
					<text>{{ items.need_return ? '需要归还' : ''}} {{ items.return_time }}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="text-grey">创建人</text>
				</view>
				<view class="action">
					<text>{{items.created}} {{ items.created_time  | dateFormat }}</text>
				</view>
			</view>									
		</view>
			
		<uni-collapse accordion="true" v-if="items">
		    <uni-collapse-item title="物品信息" class="collapse-item" :showAnimation=true>
		        <view class="cu-list menu card-menu margin-top margin-bottom" v-for="(item,index) in items.goods" v-bind:key="index">
					<view class="cu-item" :style="{display:'flex',alignItems:'center',height:'100upx'}">
						<view class="content">
							<text class="text-grey">物品类型</text>
						</view>
						<view class="action">
							<text>{{item.g_type}}</text>
						</view>				
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">名称</text>
						</view>
						<view class="action">
							<text>{{item.name}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">型号</text>
						</view>
						<view class="action">
							<text>{{item.g_model}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">数量</text>
						</view>
						<view class="action">
							<text>{{item.count}}{{item.unit}}</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">备注</text>
						</view>
						<view class="action">
							<text>{{item.remarks}}</text>
						</view>
					</view>
					<view class="cu-item" :style="{display:'flex',flexDirection:'column',alignItems:'flex-start'}">
						<text class="text-grey">附件</text>
						<view v-for="(url,index) in item.source.split(',')" v-bind:key="index">
							<image
								:src="getImageUrl(url)"
								mode="aspectFit"
								style="width:600upx"
								v-if="checkImage(url)"
							></image>
							<button @click="downloadFile(url)" v-if="!checkImage(url)" style="margin: 20upx 0;">下载查看</button>
							<!-- <view v-if="!checkImage(url)" style="width: 100%;height:100upx;">
								<text>下载查看</text>
								<web-view :webview-styles="webviewStyles" :src="getImageUrl(url)"></web-view>
							</view> -->
						</view>						
					</view>				
				</view>
		    </uni-collapse-item>
		</uni-collapse>
		<view :style="{display:'flex',flexDirection:'column',alignItems:'flex-start',background:'#fff',padding:'30upx'}" v-if="items">
			<text>图片上传</text>
			<view :style="{marginTop:'30upx'}">
				<!-- <Upload
					limit="9"
					serverUrl="https://wx.mjk24.com/v1/upload/card/"  
					@complete="result"
				>
				</Upload> -->		
				<ImgUpload 
					url="https://wx.mjk24.com/v1/upload/card/" 
					upload_img_wh="width:200upx;height:200upx;"
					@change="changeImage"
				/>
			</view>				
		</view>
		<view :style="{display:'flex',flexDirection:'column',alignItems:'flex-start',background:'#fff',padding:'30upx'}" v-if="items">
			<text>备注</text>
			<view class="action" style="width: 100%;overflow: auto;height: 100upx;">
				 <input type="text" v-model="leave_comment" placeholder='请输入备注(拒绝出厂时必填)'>
			</view>
		</view>
		
		<view class="operation-content" v-if="items">
			<button class="confirm-btn-scan" @click="carry_confirm()">确认离厂</button>
			<button class="confirm-btn-scan2" @click="carry_refuse()">拒绝离厂</button>
			
		</view>
		<tui-modal :show="modal6" @click="carry_confirm()" @cancel="hide6()" content="确定离场？" color="#174276" :size="32" :button="button6"></tui-modal>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import {
		getFactory,
		goodsRecordDetail,
		myTrainingRecord,
		carryGoodsRecordInfo,
		carryOutSure
	} from '../../api/api.js'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import Upload from '@/ThorUI/components/tui-upload/tui-upload.vue'
	import tuiModal from "@/ThorUI/components/modal/modal"
	import ImgUpload from '@/components/sunui-upimg/sunui-upimg.vue'
	import moment from 'moment'
	export default {
		data() {
			return {
					objs: [],
					obj: "",
					goods_name: "",
					goods_num: "",
					num: "",
					datetime: "",
					owner: "",
					staff: "",
					applydate: "",
					tips: "",
					imgurl: [],
					urls: [],
					popupVisible1: false,
					popupVisible2: false,
					popupVisible3: false,
					reject_comment:"",
					leave_comment:"",
					comment: "",
					reviews: "",
					isShow: false,
					pics:[],
					json_goods:[],
					need_return:"",
					return_time:"",
					remark:"",
					approver_id:"",
					id:"",
					code:"",
					exam_name:"",
					exam_id:"",
					remnant:200,
					project_id:"",
					phone:"",
					is_return:"",
					status:0,
					real:"",
					status_btn:1,
					img_urls:"",
					audit:[],
					next:[],
					items:null,
					self_num:0,
				    leaveImgStr:"",
				    info_object:undefined,
				    o_type:'1',
					
					imageData: [],
					serverUrl:"http://upload.cn",
					site_id: uni.getStorageSync('site'),
					modal6: false,
					button6: [{
						text: "取消",
						type: 'gray'
					}, {
						text: "确定"
					}],
					search_code:'',
					webviewStyles: {
						progress: {
							color: '#FF3333'
						}
					}
			}
		},
		onLoad() {
			console.log('page onLoad')
			var that = this;
			var pages = getCurrentPages();
			var page = (pages[pages.length - 1]).route; 
			// 注册监听扫描头
			const value = uni.getStorageSync('efmsToken');
			var main = plus.android.runtimeMainActivity(); //获取activity
			var context = plus.android.importClass('android.content.Context'); //上下文  
			var receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {  
				onReceive: function(context, intent){//实现onReceiver回调函数  
					var Number = intent.getStringExtra("data"); 
					if(page == 'pages/scan/index'){
						console.log('saomajieguo-----',Number)
						that.search_code = Number;
						that.searchSerialNumber(Number)
					}else{
						return
					}	
				}   
			});  
			var IntentFilter = plus.android.importClass('android.content.IntentFilter');//引入过滤器  
			var Intent = plus.android.importClass('android.content.Intent');  
			var filter = new IntentFilter();  
			filter.addAction('com.sunmi.scanner.ACTION_DATA_CODE_RECEIVED'); //监听扫码广播  
			main.registerReceiver(receiver, filter); //注册监听  
		},
		onShow(){
			console.log('page onShow')
		},
		onReady() {	
			
		},
		onHide(){	
			console.log('page onHide')
			//main.registerReceiver(receiver, filter); //注册监听  
			
		},
		components: {
		    "uni-collapse":uniCollapse,
			"uni-collapse-item":uniCollapseItem,
			uniSection,
			uniList,
			uniListItem,
			Upload,
			ImgUpload,
			tuiModal
		},
		methods: {
			inputCode(e){
				this.search_code = e.target.value
			},
			handleSearch(){			
				console.log(this.search_code);
				uni.showLoading({
					title:'搜索中'
				})
				carryGoodsRecordInfo({serial_number:this.search_code}).then(res => {
					if(res.data){
						this.items=res.data.results;
						this.id=res.data.results.id;
						uni.hideLoading();
					}else{
						this.items=null;
						this.id='';
						this.imageData = [];
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '无效编号,请重新输入'
						});
					}
					
				})
			},
			scanSearch(){
				var that = this;
				uni.scanCode({
					onlyFromCamera: true,
				    success: function (res) {
						if(res.result){
							that.search_code = res.result;
							uni.showLoading({
								title:'搜索中'
							})
							carryGoodsRecordInfo({serial_number:res.result}).then(res => {
								if(res.data){
									that.items=res.data.results;
									that.id=res.data.results.id;
									uni.hideLoading();
								}else{
									that.items=null;
									that.id='';
									that.imageData = [];
									that.search_code =''
									uni.hideLoading();
									uni.showToast({
										icon: 'none',
										title: '无效编号,请重新扫码'
									});
								}
								
							})
						}
				    },
				});	
			},
			searchSerialNumber(value){	
				uni.showLoading({
					title:'搜索中'
				})
				carryGoodsRecordInfo({serial_number:value}).then(res => {
					console.log('carryGoodsRecordInfo',res)
					if(res.data){
						this.items=res.data.results;
						this.id=res.data.results.id;
						uni.hideLoading();
					}else{
						this.items=null;
						this.id='';
						this.imageData = [];
						this.search_code =''
						uni.hideLoading();
						uni.showToast({
							icon: 'none',
							title: '无效编号,请重新扫码'
						});
					}
					
				})
			},
			getImageList(img_str){
				if(img_str){
					var img_list = [];
					img_str.split(',').forEach()(s => {
						img_list.push({url:this.getImageUrl(s)})
					});
					return img_list;
				}else{
					return []
				}
			},
			getImageUrl(path) {	
			    return "https://wx.mjk24.com/source/" + path;  //123服务器
			},
			getImageInfo(e) {
			},
			emit(e){
			},
			result: function(e) {
				this.imageData = e.imgArr;
			},
			changeImage:function(e) {
				this.imageData = e.imgArr;
			},
			show6() {
				this.modal6 = true
			},
			hide6() {
				alert(123)
				this.modal6 = false
			},
			carry_confirm(){
				if(!(this.imageData&&this.imageData.length)){
					uni.showToast({
						icon: 'none',
						title: '请上传照片附件!'
					});
					return
				}
				uni.showLoading({
					title:''
				})
				const data = {
					id:this.id,
					remarks:this.leave_comment,
					source:this.imageData&&this.imageData.length ? this.imageData.join(',') : '',
					type:1,
				}
				carryOutSure(data).then((res) => {
					console.log('0414',res)
					uni.hideLoading()
					if(res){
						//操作失败
						if(res.data&&res.data.errNo == 1){
							var error_data = res.data.error ? res.data.error :'操作失败'
							uni.showToast({
								icon: 'none',
								title: error_data
							});
						}else{
							this.items=null;
							this.id='';
							this.imageData = [];
							this.search_code ='';
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							});
							// uni.switchTab({
							//     url: '/pages/index/index'
							// });	
						}
					}else{
						uni.showToast({
							icon: 'none',
							title: 'error'
						});
					}
						
				})
			},
			carry_refuse(){
				if(!this.leave_comment){
					uni.showToast({
						icon: 'none',
						title: '请填写备注!'
					});
					return
				}
				if(!(this.imageData&&this.imageData.length)){
					uni.showToast({
						icon: 'none',
						title: '请上传照片附件!'
					});
					return
				}
				uni.showLoading({
					title:''
				})
				const data = {
					id:this.id,
					remarks:this.leave_comment,
					source:this.imageData&&this.imageData.length ? this.imageData.join(',') : '',
					type:2,
				}
				carryOutSure(data).then((res) => {
					uni.hideLoading()
					if(res){
						//操作失败
						if(res.data&&res.data.errNo == 1){
							var error_data = res.data.error ? res.data.error :'操作失败'
							uni.showToast({
								icon: 'none',
								title: error_data
							});
						}else{
							this.items=null;
							this.id='';
							this.imageData = [];
							this.search_code ='';
							uni.showToast({
								icon: 'none',
								title: '操作成功'
							});
							// uni.switchTab({
							//     url: '/pages/index/index'
							// });	
						}
					}else{
						uni.showToast({
							icon: 'none',
							title: 'error'
						});
					}
						
				})

			},
			getCurPage(){
			   var pages = getCurrentPages();  
			   var page = (pages[pages.length - 1]).route; 
			   console.log(page)
				return page
			},
			 //获取文件类型
			getFileType(name){
			    const full_name_list = name.split('.');
			    let fileType;
			    if(full_name_list&&(full_name_list.length>1)){
			      fileType = full_name_list.pop();
			    }else{
			      fileType = '';
			    }
			    return fileType
			},
			//检测图片类型
			checkImage(name){
				var type = this.getFileType(name);
				
				if(type == 'jpg' || type == 'png' || type == 'bmp' || type == 'tif' || type == 'gif' || type == 'JPEG' ){
					return true
				}else{
					return false
				}
				
			},
			downloadFile(url){
				if(!url){
					return
				}
				uni.downloadFile({
				  url: this.getImageUrl(url),
				  success: function (res) {
				    var filePath = res.tempFilePath;
					console.log('downloadFile--res',res);
				    uni.openDocument({
				      filePath: filePath,
				      success: function (res) {
				        console.log('打开文档成功');
				      }
				    });
				  }
				});
			}
			
		},
		filters: {
			dateFormat: function(c) {
				return moment(c).format("YYYY-MM-DD");
			},
			timeFormat: function(c) {
				return moment(c).format("MM-DD HH:mm");
			}
		}
		
	}
</script>

<style>	
	.top-content{
		width: 100%;
		height: 160upx;
		background: #174264;
		padding:0 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}
	.search-input{
		width: 100%;
		height: 100upx;
		border: 1px solid #FFFFFF;
		border-radius: 20upx;
		background: #FFFFFF;
		padding-left: 10upx;
		font-size: 60upx;
		color: #666666;
	}
	.scan-icon{
		display: block;
		height: 100upx;
		width: 160upx;
		margin-right: 40upx;
	}
	.search-button{
		width: 240upx;
		height: 100upx;
		border: 1px solid #FFFFFF;
		border-radius: 20upx;
		background: #174264;
		text-align: center;
		line-height: 100upx;
		color: #FFFFFF;
		margin-left: 20upx;
		font-size: 40upx
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.collapse-item{
		
	}
	.operation-content{
		width: 100%;
		height: 360upx;
		padding-top: 20upx;
		padding-bottom: 60upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background: #FFFFFF;
	}
	.confirm-btn-scan{
		width: 90%;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50px;
		background: #174276;
		color: #fff;
		font-size: 40upx
	}
	.confirm-btn-scan2{
		width: 90%;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50px;
		background: #ff4500;
		color: #fff;
		font-size: 40upx
	}
</style>
