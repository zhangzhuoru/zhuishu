<template>
	<div class="fenlei">
		<div class="bar">
			<div class="bar-heard">

				<span class="bar-text"></span>
			</div>
			<div class="bar-z-heard">分类</div>
			<div class="bar-r-heard"@click='tosousuo'>
				<van-icon name="search" size="1.5rem"/>
			</div>
		</div>
		<div v-for='items in fenlei' :key='items.key'>
			<h4 class="title">{{items.title}}</h4>
			<van-row>
				<van-col span="8" v-for='key in items.data' :key='key.name'>
					<div class="auto" @click="tozhifenlei(key.name)">
						<div class="name">{{key.name}}</div>
						<div class="naber">{{key.bookCount}}</div>
					</div>
				</van-col>
			</van-row>

		</div>

	</div>
</template>

<script>
	import { Row, Col,Icon } from 'vant';
	const url = '/api/cats/lv2/statistics'
	let that = this
	export default {
		name: 'fenlei',

		data() {
			return {
				tabs: [{
						title: '男生',
						key: 'male'
					},
					{
						title: '女生',
						key: 'female'
					},
					{
						title: '漫画',
						key: 'picture'
					},
					{
						title: '出版',
						key: 'press'
					}
				],
				fenlei: []
			};
		},
		created() {

			this.axios.get(url).then(response => {
				console.log('response.data', response.data)

				for(var key in response.data) {
					this.tabs.map(a => {
						if(a.key == key) {
							a['data'] = response.data[key]
						}
					})
				}
				this.fenlei = this.tabs
				console.log('response.data', this.tabs)
			}, err => {
				alert('response.data', err)
			})
		},
		components: {

			[Row.name]: Row,

			[Col.name]: Col,
			[Icon.name]: Icon

		},
		methods: {
			tozhifenlei(major) {
				console.log('this.$storemajor', major)
				this.$store.commit('addmajor', major)
				this.$router.push({
					path: "/zhifenlei",
					name: "zhifenlei",
					params: {
						major: major
					}
				});

			},
			tosousuo(major) {
				
				this.$router.push({
					path: "/search",
					
				});

			},
		}
	}
</script>

<style>
	.fenlei {
		padding-bottom: 5rem;
	}
	
	.title {
		padding: 0 .4rem;
		height: 1.6rem;
		line-height: 1.6rem;
		font-weight: 400;
		color: #999
	}
	
	.van-col {
		text-align: center;
		height: 5rem;
		padding: 1rem 0;
	}
	
	.name {
		line-height: 1.5rem;
		font-size: 20px;
		font-weight: 700;
		color: #333
	}
	
	.naber {
		line-height: 1rem;
		font-size: 16px;
		color: #ccc;
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
		margin-top: .5rem;
	}
</style>