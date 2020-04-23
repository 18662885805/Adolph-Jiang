<template>
	<view class="container">
<!-- 		<view class="left-bottom-sign"></view>
		<view class="right-top-sign"></view> -->
		<view class="wrapper">
			<view class="left-top-sign">eFMS</view>
			<view class="welcome">
				登录
			</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">账号</text>
					<input 
						:value="account" 
						placeholder="请输入账号"
						maxlength="11"
						data-key="account"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<text class="tit">密码</text>
					<input 
						value="" 
						placeholder="请输入密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
						displayable
					/>
				</view>
				<view class="input-item">
					<text class="tit">站点</text>
					<picker 
						@change="bindPickerChange" 
						:value="index" 
						range-key='name'
						:range="siteList"
						mode = selector
						class="site_picker"
						:style="{height:'100upx',lineHeight:'100upx',fontSize:'50upx'}"
					>
						 {{siteList.length ? siteList[index]['name'] : ''}}
					</picker>
				</view>
			</view>
			<button class="confirm-btn-login" @click="bindLogin">登录</button>
			<view class="login-notice-container">
				<view class="login-notice">
					<a @click="showModal1">《版权申明及使用须知》</a>
					<a @click="showModal2">《隐私政策》</a>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName1 ? 'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{item1_title}}</view>
				</view>
				<scroll-view class="padding-xl-login" scroll-y="true">
					<view class="notice-content" v-html="item1_content"></view>
				</scroll-view>
				<button class="cu-btn bg-red margin-tb-sm lg" @click="hideModal1">关闭</button>
			</view>
		</view>
		<view class="cu-modal" :class="modalName2 ? 'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{item2_title}}</view>
				</view>
				<scroll-view class="padding-xl-login" scroll-y="true">
					<view class="notice-content" v-html="item2_content"></view>
				</scroll-view>
				<button class="cu-btn bg-red margin-tb-sm lg" @click="hideModal2">关闭</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import {loginForm,accountKey,login,getPrivacy} from '../../api/api.js'
	import JSEncrypt from 'jsencrypt';
	export default {
		components: {
		    mInput,
		},
		data() {
			return {
				title: 'MJK',
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				index: 0,
				siteList:[],
				pkey: "",
				loading:false,
				item1_id:null,
				item2_id:null,
				item1_content:'',
				item2_content:'',
				item1_title:'',
				item2_title:'',
				modalName1:false,
				modalName2:false
			}
		},
		onLoad() {			
		},
		onShow(){
			uni.clearStorageSync();
			this.getLoginForm();
			this.getAccountKey();
			getPrivacy({ 
				params:{type:1},
			}).then(res => {
				if (res.status === 200) {
					this.item1_id = res.data.id;
					this.item1_content = res.data.content;
					this.item1_title = res.data.title;
				}
			 });
			getPrivacy({
				params:{type:2},
			}).then(res => {
				if (res.status === 200) {
					this.item2_id = res.data.id;
					this.item2_content = res.data.content;
					this.item2_title = res.data.title;
				}
			});
		},
		onReady() {			
		},
		onHide(){
		},
		
		computed: mapState(['forcedLogin']),
		methods: {
				bindApi(){
					uni.showToast({
					    icon: 'none',
					    title: 'API test'
					});
					accountKey().then(res => {
						console.log(res)
					})
				},
				inputChange(e){
					const key = e.currentTarget.dataset.key;
					this[key] = e.detail.value;
				},
				bindPickerChange(e) {			            
			            this.index = e.target.value;
						this.site_id = this.siteList[this.index]['id'];
			    },			    
			    bindLogin() {
			        if (this.account.length < 1) {
			            uni.showToast({
			                icon: 'none',
			                title: '账号最短为 1 个字符'
			            });
			            return;
			        };
			        if (this.password.length < 1) {
			            uni.showToast({
			                icon: 'none',
			                title: '密码最短为 1 个字符'
			            });
			            return;
			        };
					uni.showLoading({
						title:'登录中'
					})
					var that = this;
			        const loginData = {
						username: this.account,
						password: this.encryptRequest(this.password, this.pkey),
						site_id: this.site_id,
						privacy_ids: this.item1_id + "," + this.item2_id,
						code: uni.getStorageSync("code"),
						open_id: uni.getStorageSync("open_id")
			        };				
					login(loginData).then((res) => {
						console.log('0414',res.data)
						if (res.status === 200){
							uni.hideLoading();
							uni.showToast({
								icon: 'none',
								title: '登录成功'
							});
							uni.setStorageSync('username', this.account);
							uni.setStorageSync('efmsToken',res.data.token);
							uni.setStorageSync('site',res.data.site);
							uni.setStorageSync('user_id',res.data.user&&res.data.user.id ? res.data.user.id :'');						
							uni.setStorageSync('real_name',res.data.user&&res.data.user.real_name ? res.data.user.real_name :'');
							uni.setStorageSync('department',res.data.user&&res.data.user.department ? res.data.user.department :'');
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/index/index'
								})
							}, 1000);	
							
						}else{
							uni.hideLoading();
							//登陆失败
							// uni.switchTab({
							// 	url: '/pages/homepage/index'
							// })
						}						
					})
			    },  
				getLoginForm(){
					loginForm().then((res) => {
						var resData = res.data;
						const {content} = resData;
						var itemList = content[2].options;
						this.site_id = itemList[0]['id'];
						this.siteList = itemList;
					});
				},
				getAccountKey(){
					accountKey().then((res) => {
						this.pkey = res.data.key;
					});
				},
				encryptRequest(data, publicKey) {				
				    var encrypt = new JSEncrypt();
				    encrypt.setPublicKey(publicKey);
				    return encrypt.encrypt(data);
				},
				showModal1(){
					this.modalName1 = true;
				},
				hideModal1(){
					this.modalName1 = false;
				},
				showModal2(){
					this.modalName2 = true;
				},
				hideModal2(){
					this.modalName2 = false;
				}
			},	
		}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
		margin-top: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.action-row {
	    display: flex;
	    flex-direction: row;
	    justify-content: center;
	}
	
	.input-group {
		background-color: #ffffff;
		margin-top: 20rpx;
		position: relative;
		border: none;
	}
	
	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}
	
	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}
	
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.btn-row{
		margin-top: 40rpx;
		width: 100%;
	}
	
	.login-button{
		width: 100%;
	}
	
	.site_picker{
		width: 100%;
	}
	
	/* demo css */
	page{
		background: #fff;
	}
	.container{
		padding-top: 10upx;
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;	
	}
	.back-btn{
		position:absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}
	.left-top-sign{
		font-size: 120upx;
		color: $page-color-base;
		position:relative;
		margin-left: 20upx;
		margin-top: 20upx;
	}
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}
	.left-bottom-sign{
		position:absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
		z-index: 95;
	}
	.welcome{
		position:relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	
	.input-content{
		padding: 0 60upx;
	}

	.input-item{
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: center;
		padding: 0 30upx;
		background:$page-color-light;
		height: 200upx;
		border-radius: 4px;
		margin-bottom: 20upx;
		&:last-child{
			margin-bottom: 0;
		}
		.tit{
			height: 50upx;
			line-height: 50upx;
			font-size: 50upx;
			color: $font-color-base;
		}
		input{
			height: 100upx;
			line-height: 100upx;
			font-size: 50upx;
			color: $font-color-dark;
			width: 100%;
		}	
	}
	
	.confirm-btn-login{
		font-size: 50upx;
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50px;
		margin-top: 50upx;
		background: #174276;
		color: #fff;
		font-size: 50upx;
		&:after{
			border-radius: 100px;
		}
	}
	
	.forget-section{
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}
	.register-section{
		position:absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;
		text{
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
	
	.login-notice-container{
		margin-top: 30rpx;
		padding: 0 30rpx;
		display: flex;
		justify-content: center;
	}
	
	.login-notice{
		margin-top: 10rpx;
		font-size: $font-sm;
		display: flex;
		flex-direction: column;
		align-items: center;
		a{
			color: $font-color-spec;
		}
	}
	
	.notice-content{
		text-align: left;
		font-size: $font-sm;
	}
	
</style>
