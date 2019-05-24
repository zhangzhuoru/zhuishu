<template>
	<div class="login">
		<div class="nav">
			<router-link :to="{path: 'register'}" class="register-text">注册</router-link>
		</div>

		<div class="logo-img">
			<img class="auto-img" src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=3471c0a5e9fe9925df01610255c135ba/1f178a82b9014a90f85b9edda0773912b31bee6d.jpg" />
		</div>
		<van-row>
			<van-col offset="2" span="20">

				<van-cell-group>

					<van-field label="手机号" placeholder="输入手机号" v-model="userInfo.phone" />
					<van-field type="password" label="密码" placeholder="密码(8-16位)" v-model="userInfo.pwd" />

				</van-cell-group>

				<van-button class="login-btn" size="large" style='background: #b93321;color: #fff;' @click="login">登录</van-button>

			</van-col>
		</van-row>

	</div>
</template>

<script>
	import { CellGroup, Field, Button } from 'vant'

	import validForm from '../utils/validForm.js'

	import tip from '../utils/tip.js'

	export default {
		name: 'Login',

		data() {

			return {

				//用户列表
				users: [],

				//用户信息
				userInfo: {
					phone: '',
					pwd: ''
				}

			};

		},

		components: {
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button
		},

		methods: {

			login() {

				//验证手机号
				if(!validForm.validPhone(this.userInfo.phone)) {

					tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone');

				} else if(!validForm.validPwd(this.userInfo.pwd, 8, 16)) {
					//验证密码

					tip.dialogTip('密码只支持!@._字母数字组合', true, this.userInfo, 'pwd');

				} else {

					var userData = localStorage.getItem('users');

					if(userData) {
						//如果存在用户
						this.users = JSON.parse(userData);

						for(var i = 0; i < this.users.length; i++) {

							if(this.users[i].phone == this.userInfo.phone) {
								//如果手机号匹配, 验证密码

								if(this.users[i].pwd == this.userInfo.pwd) {

									//保存用户登录状态{userId: 手机号, loginStatus: true}

									localStorage.setItem('userLogin', JSON.stringify({
										userId: this.userInfo.phone,
										loginStatus: true
									}));

									this.$store.commit('changeloginStatus', true)
									return this.$router.push({
										name: 'wode'
									});

								} else {

									return tip.dialogTip('手机号或者密码不正确');

								}

							}

						}

						//不存该用户
						tip.dialogTip('该用户不存在');

					}

				}

			}

		}

	}
</script>

<style>
	.login-btn {
		margin-top: 1.3333rem;
	}
	
	.nav {
		height: 2.3333rem;
		background: #b93321;
		margin-bottom: 1.3333rem;
	}
	
	.logo-img {
		height: 8rem;
		width: 100%;
		position: relative;
		border-radius: 50%;
	}
	
	.auto-img {
		margin: auto;
		position: absolute;
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		display: block;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
	}
	
	.register-text {
		float: right;
		font-size: 14PX;
		color: #fff;
		line-height: 2.3333rem;
		margin-right: 0.5333rem;
	}
</style>