<template>

	<div class="register">
		<div class="nav">
			<router-link :to="{name: 'login'}" class="login-text">登录</router-link>
		</div>

		<div class="register-imgbox">
			<img class="register-img" src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=3471c0a5e9fe9925df01610255c135ba/1f178a82b9014a90f85b9edda0773912b31bee6d.jpg" />
		</div>
		<van-row>
			<van-col offset="2" span="20">

				<van-cell-group>
					<van-field label="手机号" v-model="userInfo.phone" placeholder="输入手机号" />
					<van-field type="password" label="密码" v-model="userInfo.pwd" placeholder="密码(8-16位)" />

					<van-field type="password" label="确认密码" v-model="userInfo.repwd" placeholder="确认密码" />

					<van-field label="短信验证码" v-model="userInfo.validcode">
						<van-button slot="button" size="small" style='background: #b93321;color: #fff;' @click="sendValidCode" :disabled="isDisabled">{{validCodeText}}</van-button>
					</van-field>

				</van-cell-group>

				<van-button class="register-btn" size="large" style='background: #b93321;color: #fff;' @click="regitser">注册</van-button>

			</van-col>
		</van-row>

	</div>

</template>

<script>
	import Vue from 'vue'
	import { CellGroup, Field, Button } from 'vant'

	import validForm from '../utils/validForm.js'

	import tip from '../utils/tip.js'

	import tool from '../utils/tool.js'

	export default {

		name: 'Register',

		data() {
			return {

				//随机生成验证码
				validCode: '',

				validCodeText: '发送验证码',

				isDisabled: false,

				//用户列表
				users: null,

				//用户信息
				userInfo: {
					phone: '',
					pwd: '',
					repwd: '',
					validcode: ''
				}
			}
		},

		components: {
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button
		},

		methods: {
			//注册
			regitser() {

				//验证手机号
				if(!validForm.validPhone(this.userInfo.phone)) {

					tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone');

				} else if(!validForm.validPwd(this.userInfo.pwd, 8, 16)) {
					//验证密码

					tip.dialogTip('密码只支持!@._字母数字组合', true, this.userInfo, 'pwd');

				} else if(!validForm.validEqual(this.userInfo.pwd, this.userInfo.repwd)) {
					//验证密码

					tip.dialogTip('两次密码不一致', true, this.userInfo, 'repwd');

				} else if(!validForm.validEqual(this.userInfo.validcode, this.validCode) || this.userInfo.validcode.length < 6) {

					//验证密码
					tip.dialogTip('验证码不正确', true, this.userInfo, 'validcode');

				} else {
					//存储之前需要验是否存在该用户
					for(var i = 0; i < this.users.length; i++) {

						if(this.users[i].phone == this.userInfo.phone) {
							tip.dialogTip('该手机号已被注册');
							return;
						}

					}

					//如果不存在该用户, 添加一个用户到用户列表users
					//生成用户id
					var time = new Date();
					var uid = 'vue' + time.getTime();
					var phone = this.userInfo.phone;
					var pwd = this.userInfo.pwd;
					var registerTime = tool.format(time, 'yyyy-MM-dd hh:mm:ss');

					var user = {
						uid,
						phone,
						pwd,
						registerTime
					};

					this.users.push(user);
					var usersData = JSON.stringify(this.users);

					//写入本地存储users
					localStorage.setItem('users', usersData);

					//跳转到登录组件
					this.$router.push({
						name: 'login'
					});

				}

			},

			//发送验证码
			sendValidCode() {

				if(!validForm.validPhone(this.userInfo.phone)) {
					// Dialog.alert({
					// 	title: '手机号码不正确'
					// }).then(() => {
					// 	this.userInfo.phone = '';
					// })

					tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone');
				} else {

					this.isDisabled = true;

					//60秒后自动恢复
					var time = 5;

					this.validCodeText = time + 's后重新发送';

					var timer = setInterval(() => {

						if(time <= 0) {

							this.isDisabled = false;

							this.validCodeText = '发送验证码';

							//清除定时器
							clearInterval(timer);
							time = null;

						} else {

							this.validCodeText = --time + 's后重新发送';

						}

					}, 1000)

					//发送验证码
					this.validCode = validForm.generateValidCode();
					this.$toast('验证码是：' + this.validCode);
				}

			}

		},

		created() {

			var userData = localStorage.getItem('users');

			this.users = userData == undefined ? [] : JSON.parse(userData);

		}

	}
</script>

<style>
	.register-btn {
		margin-top: 1.3333rem;
	}
	
	.register-imgbox {
		height: 8rem;
		width: 100%;
		position: relative;
		border-radius: 50%;
	}
	
	.register-img {
		margin: auto;
		position: absolute;
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	
	.nav {
		height: 2.6666rem;
		background: #b93321;
		margin-bottom: 1.3333rem;
	}
	
	.login-text {
		float: right;
		font-size: 14PX;
		color: #fff;
		line-height: 2.6666rem;
		margin-right: 0.5333rem;
	}
</style>