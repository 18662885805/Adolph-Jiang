<template>
	<view class="container">
		<view class="cu-card case">
			<view class="cu-list shadow menu card-menu">		
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">账号</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{username}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">姓名</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{real_name}}</text>
					</view>
				</view>
				<view class="cu-item">
					<view class="content">
						<text class="text-grey">部门</text>
					</view>
					<view class="action">
						<text class="text-grey text-sm">{{department}}</text>
					</view>
				</view>
			</view>		
		</view>
		<button class="confirm-btn-logout" @click="bindLogout()">退出登录</button>	
	</view>
</template>

<script>
	import{logout} from '../../api/api.js';
	export default {
		data(){	
			return {
				real_name:null,
				username:null,
				department:null,
			}
		},
		onLoad() {			
		},
		onShow(){
			this.real_name = uni.getStorageSync('real_name') ? uni.getStorageSync('real_name') :'-';
			this.username = uni.getStorageSync('username') ? uni.getStorageSync('username') :'-';
			this.department = uni.getStorageSync('department') ? uni.getStorageSync('department') :'-';
			
		},
		onReady() {	
			
		},
		onHide(){	
		},
		methods: {
			bindLogout(){
				uni.navigateTo({
				    url: '/pages/login/index'
				});
				// logout({
				// 	data:{
				// 		site_id:uni.getStorageSync('user_id')
				// 	}
				// }).then((res) => {
				// 	if(res.status===200){
				// 		uni.showToast({
				// 		    icon: 'none',
				// 		    title: '登出成功'
				// 		});
				// 	}
				// }).catch(function (err) { });
				
			},
		}
	}
</script>

<style lang='scss'>
	.container{
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #174264;
		vertical-align: center;
	}
	.confirm-btn-logout{
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: linear-gradient(-30deg, rgba(252, 135, 29, 1), rgba(246, 185, 9, 1));
		box-shadow: 0px 4px 10px 0px rgba(255, 121, 0, 0.5);
		color: rgba(255, 255, 255, 1);
		font-size: 50upx;
		&:after{
			border-radius: 100px;
		}
	}
</style>
