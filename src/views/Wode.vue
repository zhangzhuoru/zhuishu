<template>
	<div class="my">

		<div class="bar">
			<div class="bar-heard">

				<span class="bar-text"></span>
			</div>
			<div class="bar-z-heard">我的</div>
			<div class="bar-r-heard"></div>
		</div>
		<van-row>
			<van-col span="24">
				<div class="my-box">
					<img class="my-img" src="https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/crop%3D56%2C200%2C555%2C366%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26/sign=65c33a9ad82a283457e96c4b6680ffc6/f603918fa0ec08fa54a7392055ee3d6d54fbda95.jpg" />
				</div>
			</van-col>

			<van-col class="cell-col" span="24">
				<van-list>
					<van-cell @click="goState(item.path)" :title="item.title" v-for="(item, index) in listData" :key="index">
						<van-icon name="arrow" /></van-cell>
				</van-list>
			</van-col>

			<van-col class="logout" span="24">
				<van-button style='background: #b93321;color: #fff;border-radius: 2px;' size="small" @click='goout'>退出</van-button>
			</van-col>
		</van-row>

	</div>
</template>

<script>
	import { List, Cell, Button, Icon } from 'vant'
	import { Row, Col } from 'vant';

	const url = '/api/cats/lv2/statistics'
	let that = this
	export default {
		name: 'fenlei',

		data() {
			return {
				loginStatus: '',
				fenlei: [],
				userLogin: '',
				user: '',
				listData: [{
						title: '我的积分',
						path: {
							name: 'wode'
						}
					},
					{
						title: '我的豆币',
						path: {
							name: 'wode'
						}
					},
					{
						title: '我的收藏',
						path: {
							name: 'mylike'
						}
					},
					{
						title: '我看过的',
						path: {
							name: 'mylook'
						}
					},
					{
						title: '设置',
						path: {
							name: 'wode'
						}
					}

				]
			};
		},
		created() {
			var userLogin = localStorage.getItem('userLogin');

			this.userLogin = userLogin == undefined ? {} : JSON.parse(userLogin);
			this.loginStatus = this.userLogin['loginStatus']
			console.log()
			if(!this.loginStatus) {
				this.$router.push("/login");
				var user = localStorage.getItem('userLogin');

				this.user = user == undefined ? '' : JSON.parse(user).userId
			}

		},
		components: {

			[List.name]: List,
			[Cell.name]: Cell,
			[Button.name]: Button,
			[Row.name]: Row,
			[Icon.name]: Icon,
			[Col.name]: Col,

		},

		methods: {
			goState(path) {
				this.$router.push(path);
			},
			goout() {
				localStorage.setItem('userLogin', JSON.stringify({
					loginStatus: false
				}));

				this.$store.commit('changeloginStatus', false)
				this.$router.push('/login');
			}
		}
	}
</script>

<style>
	.my-box {
		height: 8rem;
		width: 100%;
		position: relative;
		border-radius: 50%;
		display: block;
	}
	
	.my-img {
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
	
	.cell-col {
		margin-top: 4rem;
	}
	
	.logout {
		padding: 12rem 0.4rem 0;
	}
	
	.bar {
		position: relative;
		z-index: 200;
		width: 100%;
		height: 2.5rem;
		overflow: hidden;
		background-color: #b93321;
		color: #fff;
	}
	
	.bar-heard {
		display: inline-block;
		vertical-align: middle;
		text-align: center;
		border-radius: 2px;
		color: #fff;
		font-size: 14px;
		width: 3rem;
	}
	
	.bar-icon {
		text-align: center;
		color: #fff;
		font-size: 1.2rem;
		line-height: 2.3333rem;
		display: inline-block;
		vertical-align: middle;
		font-style: normal;
	}
	
	.bar-text {
		text-align: center;
		color: #fff;
		font-size: 12px;
		line-height: 1rem;
		display: inline-block;
		vertical-align: middle;
		font-style: normal;
		line-height: 2.3333rem;
	}
	
	.bar-z-heard {
		width: 70%;
		height: 1.6rem;
		color: #fff;
		font-weight: bold;
		font-size: 14px;
		text-align: center;
		position: absolute;
		display: inline-block;
		vertical-align: middle;
		line-height: 2.3333rem;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.bar-r-heard {
		display: inline-block;
		vertical-align: middle;
		height: 1.6rem;
		line-height: 2.333rem;
		text-align: center;
		border-radius: 2px;
		color: #fff;
		font-size: 14px;
		width: 3rem;
		float: right;
		margin-right: .3rem;
	}
</style>