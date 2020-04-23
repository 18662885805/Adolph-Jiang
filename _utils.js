import uniRequest from 'uni-request';

export function toFetch(config) {

	config.headers = {
		"Authorization": "JWT " + localStorage.getItem("token")
	};

	const { method, data } = config;

	if (method === "get" || method === "delete") {
		config.params = {
			...data
		};
	} else {
		config.data = {
			...data
		};
	}

	return uniRequest(config);
}

export function getColor(type) {
	let color;

	switch (type) {
	case 1: //创建
		color = "#13c2c2";
		break;
	case 3: //待审批  待处理
		color = "#2db7f5";
		break;
	case 4: //审批通过  已处理
		color = "#87d068";
		break;
	case 5: //审批未通过
		color = "#f50";
		break;
	case 6: //撤回  退回  被撤回  被退回  未生效
		color = "#ccc";
		break;
	case 7: //已关闭
		color = "#108ee9";
		break;
	default:
		color = "#000";
	}

	return color;
}

export function getType(o) {
	const type = Object.prototype.toString.call(o)
	const typeLength = type.length

	return type.substring(8, typeLength - 1)
}

export function getFileSize(num) {
	if(!num){
		return "0 Bytes"
	}
	const sizeArr = ['Bytes', 'KB', 'MB', 'GB', 'TB']

	let index = 0, srcsize = parseFloat(num)
	index = Math.floor(Math.log(srcsize)/Math.log(1024))
	let size = srcsize/Math.pow(1024,index)
	size = size.toFixed(2)
	return size + sizeArr[index]
}
