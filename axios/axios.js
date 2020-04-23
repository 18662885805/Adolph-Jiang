import axios from '@/js_sdk/gangdiedao-uni-axios'

let loadingCount = 0;

function addLoading() {
	loadingCount++
}

function isCloseLoading() {
	loadingCount--
	if (loadingCount == 0) {
		uni.hideLoading();
	}
}


//拦截器 在请求之前拦截
axios.interceptors.request.use(config => {
    var config_info = ['/v1/form/account/login/', "/v1/account/key/", "/v1/account/privacy/info/search/"];
    if (config_info.indexOf(config.url) > -1){
		// return true;
    }else{
		addLoading();
		if (uni.getStorageSync("efmsToken")){
			config.headers['Authorization'] = 'JWT ' + uni.getStorageSync('efmsToken');
		}
        if (config.method == 'post'){
			config.data = {
				site_id: uni.getStorageSync('site'),
				...config.data,
			};	
        } else if (config.method == 'get'){
			config.params = {
				site_id: uni.getStorageSync('site'),
				...config.params,
			};
        }	
    }
    return config
},function (error) {
	return Promise.reject(error);
})

// 拦截器 在请求之后拦截(涉及跳转登录页面)
axios.interceptors.response.use(
	res => {
		isCloseLoading();
		//接口跑通,并返回相关信息
		switch (res.status) {
			case 200:
				if (res.data.errNo || parseInt(res.data.errNo) === 0) {
					//正常返回errNo
					switch (parseInt(res.data.errNo)) {
						//无错误
						case 0:
							  if (res.data.content.msg) {
								res.data = res.data.content.results;
							  } else {
								res.data = res.data.content;
							  }
							  return res;
							  break;
						//有错误
						case 1:		
							console.log('0414--axios',res)
							  uni.showToast({
								  icon: 'none',
								  title: res.data.error
							  });
							  
							  return res;
							  break;
						case 2:
								uni.reLaunch({
								    url: '/pages/login/index'
								});
								uni.showToast({
									icon: 'none',
									title: '登录失效，请重新登录' //登录失效，请重新登录
								});
								break;
						case 3:
							uni.reLaunch({
							    url: '/pages/index/index'
							});
							uni.showToast({
								icon: 'none',
								title: res.data.error
							});
							break;
						case 4:						
							uni.showToast({
								icon: 'none',
								title: res.data.error
							});
							break;
						case 6:
							uni.showToast({
								icon: 'none',
								title: res.data.error
							});
							break;
					}
				} else {
					return res;
				}
				break;
			case 201:
				return res;
				break;
			case 204:
				return res;
				break;
			case 400:
				if (Array.isArray(res.data)) {
					Toast(res.data[0]);
				} else {
					var keyArr = Object.keys(res.data);
					var val = res.data[keyArr[0]];
					if (Array.isArray(val)) {
						uni.showToast({
							icon: 'none',
							title: val[0]
						});
					} else if (typeof(val) === 'object') {
						var keyArr2 = Object.keys(val);
						var val2 = val[keyArr2[0]];
						uni.showToast({
							icon: 'none',
							title: val2
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: val
						});
					}
				}
				break;
			case 401:
				uni.clearStorageSync();
				uni.showToast({
					icon: 'none',
					title: '登录过期下线，如需使用请重新登录'
				});
				uni.reLaunch({
					url: '/pages/login/index'
				});
				break;
			case 403:
				uni.showToast({
					icon: 'none',
					title: '您没有该操作权限'
				});
				break;
			case 404:
				uni.showToast({
					icon: 'none',
					title: '您所访问的页面不存在'
				});
				break;
			case 500:
				uni.showToast({
					icon: 'none',
					title: '服务器错误'
				});
				break;
			case 502:
				uni.showToast({
					icon: 'none',
					title: '服务器连接错误'
				});
				break;
			case 503:
				uni.showToast({
					icon: 'none',
					title: '服务器连接错误'
				});
				break;
			case 504:
				uni.showToast({
					icon: 'none',
					title: '服务器连接错误,请检查您的网络状况'
				});
				break;
			default:
				break;
			
		}
	},

	error => {
	//接口未跑通
	uni.clearStorageSync();
    isCloseLoading();
    let res = error.response;
	if(res){
		switch (res.status) {
			case 400:
				if(Array.isArray(res.data)){
						uni.showToast({ icon: 'none',title: res.data[0]});
				}else{
					var keyArr = Object.keys(res.data);
					var val = res.data[keyArr[0]];
					if (Array.isArray(val)) {
						uni.showToast({ icon: 'none',title: val[0]});
					} else if (typeof (val) === 'object') {
						var keyArr2 = Object.keys(val);
						var val2 = val[keyArr2[0]];
						uni.showToast({ icon: 'none',title: val2});
					} else {
						uni.showToast({ icon: 'none',title: val});
					}
				}
				break;
			case 401:
				uni.showToast({
					 icon: 'none',
					title: '登录过期下线，如需使用请重新登录'
				});
				uni.reLaunch({
				    url: '/pages/login/index'
				});
				break;
			case 403:
				uni.showToast({
					 icon: 'none',
					title: '您没有该操作权限'
				});
				break;
			case 404:
				uni.showToast({
					 icon: 'none',
					title: '您所访问的页面不存在'
				});
				break;
			case 500:
				uni.showToast({
					 icon: 'none',
					title: '服务器错误'
				});
				break;
			case 502:
				uni.showToast({
					 icon: 'none',
					title: '服务器连接错误'
				});
				break;
			case 503:
				uni.showToast({
					 icon: 'none',
					title: '服务器连接错误'
				});
				break;
			case 504:
				uni.showToast({
					icon: 'none',
					title: '服务器连接错误,请检查您的网络状况'
				});
				break;
			default:
				break;
		} 
    }
    return Promise.reject(error.response);   // 返回接口返回的错误信息
  });


export default axios