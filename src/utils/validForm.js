export default {

	//验证手机号
	validPhone(value) {

		return /^1[3456789]\d{9}$/.test(value);

	},

	//验证密码 [!@.,\w]
	validPwd(value, min, max) {

		return new RegExp('^[!@\\.\\w]{'+ min +',' + max + '}$').test(value);

	},

	//验证两值严格(===)相等
	validEqual(v1, v2) {
		return Object.is(v1, v2);
	},

	//随机生产验证码 6位数字
	generateValidCode() {

		//获取时间戳
		var time = new Date().getTime().toString().substr(-3, 3);

		//获取随机数
		var random = Math.random().toString().substr(-3, 3);

		return time.concat(random);

	}


}