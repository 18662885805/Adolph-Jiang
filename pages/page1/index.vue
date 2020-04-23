<template>
	<view>	
		<uni-collapse accordion="true">
		    <uni-collapse-item title="申请人信息" class="collapse-item" showAnimation="true">
		        <view class="cu-list menu card-menu margin-top margin-bottom">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">创建人</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">创建人ID</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">部门</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">成本中心</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
				</view>
		    </uni-collapse-item>
		</uni-collapse>
		
		<uni-collapse accordion="true">
		    <uni-collapse-item title="携出人信息" class="collapse-item" showAnimation=true>
		        <view class="cu-list menu card-menu margin-top margin-bottom">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">携出人</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">携出人手机号码</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">工号/证件号</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">部门/外部单位</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
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
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">携出原因</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">物品信息</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">携出日期</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">是否需要归还</text>
						</view>
						<view class="action">
							<view class="cu-tag round bg-red light">需归还</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">归还日期</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
				</view>
		    </uni-collapse-item>
		</uni-collapse>
		<uni-collapse accordion="true">
		    <uni-collapse-item title="物品信息" class="collapse-item" showAnimation=true>
		        <view class="cu-list menu card-menu margin-top margin-bottom">
					<view class="cu-item">
						<view class="content">
							<text class="text-grey">物品类型</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">XXXXXS</text>
						</view>
					</view>
					<view class="cu-item">
						<text class="text-grey">流转记录</text>
					</view>
					<view class="cu-item">
						<image 
						src="http://img4.bitautoimg.com/autoalbum/files/20180921/537/20180921170747747252210_6267379_3.jpg"
						mode="aspectFit"
						style="wi"
						></image>
					</view>
				</view>
		    </uni-collapse-item>
		</uni-collapse>
		<view class="cu-bar bg-white">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/4
			</view>
		</view>
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
				<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
				 <image :src="imgList[index]" mode="aspectFill"></image>
					<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
						<text class='cuIcon-close'></text>
					</view>
				</view>
				<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
					<text class='cuIcon-cameraadd'></text>
				</view>
			</view>	
		</view>
		<view class="cu-bar bg-white">
			<button class="confirm-btn">确认</button>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import {
		getFactory,
		goodsRecordDetail
	} from '../../api/api.js'
	export default {
		data() {
			return {
				factoryIndex:0,
				factoryList:[],
				need_return:false,
				time: '12:01',
				date: '2018-12-25',
				radio: 'A',
				imgList: [],
				modalName: null,
				textareaBValue: ''
			};
		},
		onLoad() {	
			console.log('1227','demo onLoad')
		},
		onShow(){
			console.log('1227','demo onShow')
		},
		onReady() {	
			console.log('1227','demo onReady')
		},
		onHide(){	
			console.log('1227','demo onHide')
		},
		components: {
		    "uni-collapse":uniCollapse,
			"uni-collapse-item":uniCollapseItem
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
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value
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
			}
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
		background: #002140;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
</style>

