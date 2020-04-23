<template>
	<view>			   
		<uni-collapse accordion="true">
		    <uni-collapse-item title="携出人信息" class="collapse-item" showAnimation=true>
		        <view class="cu-list menu card-menu margin-top margin-bottom">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">携出人姓名</text>
						</view>
						<view class="action">
							<input type="text" v-model="take_person" placeholder="请输入姓名"></input>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">携出人工号</text>
						</view>
						<view class="action">
							<input type="text" v-model="pers_no" placeholder="请输入工号">
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">手机号</text>
						</view>
						<view class="action">
							<input type="number" maxlength="11"
							v-model="phone"						
							placeholder='请输入11位手机号' >
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">部门/外部单位</text>
						</view>
						<view class="action">
							<input type="text" v-model="department" placeholder="例如RBAC/PRS">
						</view>
					</view>									
				</view>
		    </uni-collapse-item>
		</uni-collapse>
		<uni-collapse accordion="true">
		    <uni-collapse-item title="携出单信息" class="collapse-item" showAnimation=true>
		        <view class="cu-list menu card-menu margin-top margin-bottom">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">厂区</text>
						</view>
						<select v-model="factory" :style="{width:'300upx',height:'80upx'}">
							 <option v-for="item in location" v-bind:value="item.id">
							   {{ item.number }}
							 </option>
						</select>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">携出日期</text>
						</view>
						<view class="action">
							<picker mode="date" :value="get_start" start="2020-01-01" end="2050-01-01" @change="DateChange">
								<view class="picker">
									{{get_start}}
								</view>
							</picker>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">携出原因</text>
						</view>
						<view class="action">
							<input type="text" v-model="reason" placeholder="请输入携出原因">
						</view>
					</view>
					
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">是否需要归还</text>
						</view>
						<view class="action">
							<switch @change="SwitchNeedReturn" :class="need_return ?'checked':''" :checked="need_return?true:false"></switch>
						</view>
					</view>
					<view class="cu-item" v-if="need_return">
						<view class="content">
							<text class="text-grey">归还日期</text>
						</view>
						<view class="action">
							<picker mode="date" :value="get_back" start="2020-01-01" end="2050-01-01" @change="BackDateChange">
								<view class="picker">
									{{get_back}}
								</view>
							</picker>
						</view>
					</view>
				</view>
		    </uni-collapse-item>
		</uni-collapse>
		<uni-collapse accordion="true">
		    <uni-collapse-item title="物品信息" class="collapse-item" showAnimation=true>
		        <view class="cu-list menu card-menu margin-top margin-bottom" v-for="(item,index) in goods" v-bind:key="index">
					<view class="cu-item" :style="{display:'flex',alignItems:'center',height:'100upx'}">
						<view class="content">
							<text class="text-grey">物品类型</text>
						</view>
						<view class="select-content">
							<select v-model="item.g_type" @change="handleType(item.g_type,index)" :style="{width:'300upx',height:'80upx'}">								
								<option v-for="type in typeOptions" v-bind:value="type.id" v-bind:key="type.id">
								  {{ type.name }}
								</option>
							  </select>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">名称</text>
						</view>
						<view class="action">
							<input type="text" v-model="item.name" placeholder="请输入"></input>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">{{item.g_type | typeName}}</text>
						</view>
						<view class="action">
							<input type="text" v-model="item.g_model" :placeholder='[1,2,4].indexOf(item.g_type)>-1?"请输入":"请输入(选填)"'></input>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">数量</text>
						</view>
						<view class="action">
							<input type="number" v-model="item.count" placeholder='请输入数量'>
						</view>
					</view>
					<view  class="cu-item" :style="{display:'flex',alignItems:'center',height:'100upx'}">
						<view>
							<text class="text-grey">单位</text>
						</view>
						<view>
							<select class="num_type" name="select2" v-model="item.unit" :style="{width:'300upx',height:'80upx'}">
							  <option value='1'>pcs</option>
							  <option value='2'>set</option>
							</select>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">备注</text>
						</view>
						<view class="action">
							 <input type="text" v-model="item.remarks" placeholder='请输入备注(选填)'>
						</view>
					</view>
					<view class="cu-item" :style="{display:'flex',flexDirection:'column',alignItems:'flex-start'}">
						<text class="text-grey" :style="{marginTop:'30upx'}">图片上传</text>
						<view :style="{marginTop:'30upx',border:'1px solid black'}">
							<Upload
								limit="9"
								@uploadImage="uploadImage()"
							>
							</Upload>							
						</view>				
					</view>
					<view class="cu-bar bg-white" v-show="goods.length===1 ||goods.length-1===index" @click="Insert_goods(index)" :style="{padding:'30upx 20upx'}">
						<Button type="primary">添加</Button>
					</view>
					<view class="cu-bar bg-white" v-show="goods.length>1" @click="deleteNum(index)" :style="{padding:'30upx 20upx'}">
						<Button type="danger">删除</Button>
					</view>
				</view>
		    </uni-collapse-item>
		</uni-collapse>
		<view class="cu-bar bg-white">
			<button class="confirm-btn" @click="handleSubmit">确认</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import {
		getFactory,
		goodsRecordDetail,
		myTrainingRecord
	} from '../../api/api.js'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from '@/components/uni-list/uni-list.vue'
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	import Upload from '@/ThorUI/components/tui-upload/tui-upload.vue'
	import Button from '@/ThorUI/components/button/button.vue'
	export default {
		data() {
			return {
				factoryIndex:0,
				factoryList:[],
				get_start: '2020-01-01',
				get_back:'2020-01-01',
				imgList: [],
				modalName: null,
				textareaBValue: '',
			    group1: [],
				group2: [],
				obj: "",
				num: 1,
				item: "",
				items: [],
				applist: [],
				Approval: [],
				approver: "",
				apid: "",
				owner: "",
				staff: "",
				objs: [],
				team: [],
				phoneNum: "",
				phoneNum3: "",
				tips: "",
				checked: 0,
				popupVisible1: false,
				comment: "",
				error: "",
				exam_name: "",
				exam_id: "",
				return_date: "",
				successImgStr: "",
				params_obj: {},
				goal: "",
				location_options: [],
				selectedOptions: [],
				location: [],
				area: {},
				num_type: 1,
		
				take_person: "",
				pers_no:"",
				phone:"",
				department:"",
				factory:undefined,
				out_day:"",
				need_return: 0,
				return_time:"",
				reason:"",
				goods:[{g_type:undefined,name:'',g_model:'',count:undefined,unit:'1',price:'',remarks:'',source:''}],
				typeOptions:[{id:1,name:"产品"},{id:2,name:'固定资产'},{id:3,name:'办公用品/其它'},{id:4,name:"废弃物"},{id:5,name:"设备/工具/配件"}],
				imageList:[]
			};
		},
		onLoad() {	
			console.log('1227','demo onLoad')
		},
		onShow(){
			console.log('1227','demo onShow')
			getFactory().then(res => {
				console.log('0224',res.data);
				this.location = res.data;
			});
		},
		onReady() {	
			console.log('1227','demo onReady')
		},
		onHide(){	
			console.log('1227','demo onHide')
		},
		components: {
		    "uni-collapse":uniCollapse,
			"uni-collapse-item":uniCollapseItem,
			uniSection,
			uniList,
			uniListItem,
			Upload,
			Button
		},
		vuerify: {
		      take_person: {
		        test: /\S+$/,
		        message:'请输入携出人姓名'
		      },
		      pers_no: {
		        test: /\S+$/,
		        message:'请输入携出人工号'
		      },
		      department: {
		        test: /\S+$/,
		        message:'请输入携出人部门'
		      },
		      phone: {
		        test: /^1[0-9]{10}$/,
		        message: 'warn'
		      },
		      factory: {
		        test: /\S+$/,
		        message:'warn'
		      },
		      out_day: {
		        test: /\S+$/,
		        message:'请选择携出日期'
		      },
		      reason: {
		        test: /\S+$/,
		        message: 'warn'
		      },
		      num: {
		        test: /\d+/,
		        message: 'warn'
		      },
		      obj: {
		        test: /\S+$/,
		        message: 'warn'
		      },
		},
		filters: {
			unit(val){
			        switch (val) {
			          case 1:
			            return "pcs";
			          case 2:
			            return "set";
			        }
			},
			typeName(val){
			 switch (val) {
				  case 1:return "型号";
				  break;
				  case 2:return "固定资产号";
				  break;
				  case 3:return "型号";
				  break;
				  case 4:return "类型";
				  break;
				  case 5:return "规格/型号";
				  break;
				  default:return "型号"
				}
			},
			fileName(val){
				switch (val) {
				  case 1:return "请在此处上传成品DN/SI清单";
				  break;
				  case 2:return "请在此处上传固定资产清单(选填)";
				  break;
				  case 3:return "请在此处上传办公用品照片(选填)";
				  break;
				  case 4:return "请在此处上传废弃物称重清单";
				  break;
				  case 5:return "请在此处上传设备/工具/配件照片(选填)";
				  break;
				  default:return ""
				}
			 }
		},
		
		methods: {
			getFactoryList(){
				getFactory().then((res) => {
					this.factoryList = res.data;
				});
			},
			getGoodRecord(){
				goodsRecordDetail({
					site_id:uni.getStorageSync("site"),
					id:1
				}).then((res)=>{
					console.log(res)
				})
			},
			pickerFactory(e){
				this.factoryIndex = e.target.value;
				this.factory_id = this.factoryList[this.factoryIndex]['id'];
			},
			DateChange(e) {
				this.get_start = e.detail.value
			},
			BackDateChange(e){
				this.get_back = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定删除图片？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			},
			SwitchNeedReturn(e){
				this.need_return = e.detail.value
			},
			handleType(val,index){
				if(val===1){
				  this.goods[index].unit=undefined;
				}else{
				  this.goods[index].unit='1';
				}
			},
			uploadImage(index, url) {
				let _this = this;
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: 'v1/upload/card/',
						name: this.fileKeyName,
						header: {
							//设置请求头
						},
						formData: {},
						filePath: url,
						success: function(res) {
							console.log(res)
							if (res.statusCode == 200) {
								//返回结果 此处需要按接口实际返回进行修改
								let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
								//判断code，以实际接口规范判断
								if (d.code % 100 === 0) {
									// 上传成功 d.url 为上传后图片地址，以实际接口返回为准
									d.url && (_this.imageList[index] = d.url)
									_this.$set(_this.statusArr, index, d.url ? "1" : "3")
								} else {
									// 上传失败
									_this.$set(_this.statusArr, index, "3")
								}
								resolve(index)
							} else {
								_this.$set(_this.statusArr, index, "3")
								reject(index)
							}
						},
						fail: function(res) {
							_this.$set(_this.statusArr, index, "3")
							reject(index)
						}
					})
				})
	
			},			
			Insert_goods(i){
			  console.log(this.goods);
			  if(!this.goods[i].g_type){
				  uni.showToast({
				  	icon: 'none',
				  	title: '请选择物品类型'
				  });
				  return false
			  }
	
			  if(!this.goods[i].name){
				  uni.showToast({
				  	icon: 'none',
				  	title: '请输入物品名称'
				  });
				  return false
			  }
	
			  if([1,2,4].indexOf(this.goods[i].g_type)>-1&&!this.goods[i].g_model){
				  uni.showToast({
				  	icon: 'none',
				  	title: '请填写相应型号/类型/资产号'
				  });
				  return false
			  }
	
			  if(!this.goods[i].unit){
				  uni.showToast({
				  	icon: 'none',
				  	title: '单位不能为空'
				  });
				  return false
			  }
	
			  if([1,4].indexOf(this.goods[i].g_type)>-1&&!this.goods[i].source){
				  // uni.showToast({
				  // 	icon: 'none',
				  // 	title: '请上传物品附件'
				  // });
				  // return false
			  }
			  this.goods.push({g_type:undefined,name:'',g_model:'',count:undefined,unit:'1',price:'',remarks:'',source:''});
	
			  // } else {
			  //   Toast(Object.values(this.errors)[0]);
			  // }
		  },
			
			deleteNum(index){
				this.goods.splice(index, 1);
			},			 
			handleSubmit() {		          
				if(this.need_return&&!this.return_time){
					alert('请选择归还日期');
					return false
				}	  
				let post_number=0;
				this.goods.map(function (goods,index) {
					if(!goods.g_type){
						alert('请输入物品类型');
						return false
					}else if(!goods.name){
						alert('请输入物品名称');
						return false
					}else if([1,2,4].indexOf(goods.g_type)>-1&&!goods.g_model){
						alert('请填写相应型号/类型/资产号');
						return false
					}else if(!goods.unit){
						alert('单位不能为空');
						return false
					}else if([1,4].indexOf(goods.g_type)>-1&&!goods.source){
						alert('请上传相关附件');
						return false
					}else{
						post_number+=1
					}
				});
				if(post_number===this.goods.length){
					this.handlePostInfo()
				}
		    },
			handlePostInfo(){
			    console.log(this.goods);
	// 		  MessageBox.confirm(this.$t("newcarryout.b5ecd6f0974f11e9a5048c8590a7c397"),{confirmButtonText: this.$t('button.ok'), cancelButtonText: this.$t('button.cancel') }).then(action => {
	// 			this.params_obj = {
	// 			  site_id: localStorage.getItem("site"),
	// 			  goods: JSON.stringify(this.goods),
	// 			  take_person: this.take_person,
	// 			  pers_no:this.pers_no,
	// 			  department:this.department,
	// 			  phone: this.phone,
	// 			  // source: this.successImgStr,
	// 			  reason: this.reason,
	// 			  out_day:this.out_day?this.out_day:null,
	// 			  need_return: this.need_return,
	// 			  // created_remarks: this.comment,
	// 			  factory: this.factory,
	// 			  return_time:this.return_time?this.return_time:null,
	// 			};
	// 			// if (this.return_date) {
	// 			//   this.params_obj.return_time = this.return_date;
	// 			// }
	
	// 			this.$axios({
	// 				method: "POST",
	// 				url: "/v1/carryout/goodsrecord/param/",
	// 				headers: {Authorization: "JWT " + localStorage.getItem("token")},
	// 				data: this.params_obj
	// 			  }
	// 			).then((res) => {
	// 			  // console.log(res);
	// 			  if (res.status === 200) {
	// 				let _this = this;
	// 				Toast("保存成功");
	// 				_this.$router.back(-1);					
	// 			  }
				 
	// 			});
	// 		  });
		  },
		}
	}
</script>

<style lang='scss'>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.collapse-item{
		
	}
	.confirm-btn{
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		margin-bottom: 70upx;
		background: #0bc99d;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
</style>
