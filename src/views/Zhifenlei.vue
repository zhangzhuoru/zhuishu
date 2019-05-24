<template>
	<div class="zhifenlei">
		<Bar :title="{title}"></Bar>
		<van-tabs v-model="active">
			<van-tab title="全部" @click='tozhifenlei(title)'>
				<Leibiao :zhifenlei="{zjia}"></Leibiao>
				

			</van-tab>
			<van-tab v-for="index in shux">
				<div class="tab-title" slot="title" @click="tozhifenlei(index)">{{ index }}</div>
				<Leibiao :zhifenlei="{zjia}"></Leibiao>

			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import Leibiao from "../components/Leibiao.vue"
	import Bar from "../components/Bar.vue"
	import { Tab, Tabs, Card } from 'vant';
	const urls = '/api/cats/lv2'

	export default {
		name: 'zhifenlei',

		data() {
			return {
				major: '',
				zhifenlei: [],
				shux: [],
				zjia: [],
				active: 0,
				title: ''
			};
		},
		created() {

	
			this.major = this.$route.params.major;
			this.major = this.$store.state.major
	
			this.title = this.major;
			this.axios.get(urls).then(response => {
				this.shux = response.data
				let sss = []
				for(var key in response.data) {
					for(var a in response.data[key]) {
						if(response.data[key][a].major == this.major) {
							sss = response.data[key][a].mins
						}
					}
				}
				this.shux = sss

			}, err => {
				alert('response.data', err)
			})
			const url = '/api/book/by-categories?gender=male&type=hot&major=' + this.major + '&start=0&limit=10'
			this.axios.get(url).then(response => {
				this.zjia = response.data.books
				console.log('this.zhifenlei', this.zhifenlei)
			}, err => {
				alert('response.data', err)
			})

		},
		methods: {

			tozhifenlei: function(title) {
				const urlss = '/api/book/by-categories?gender=male&type=hot&major=' + this.major + '&minor=' + title + '&start=0&limit=10'
				this.axios.get(urlss).then(response => {
					this.zjia = response.data.books
					console.log('this.zjia',this.zjia)
				}, err => {
					alert('response.data', err)
				})
			},

			toabout(id) {
				console.log(id)
				this.$store.commit('addid', id)
				this.$router.push({
					path: "/about",
					name: "about",
					params: {
						id: id
					}
				});
			},
		},
		components: {

			[Tab.name]: Tab,
			[Card.name]: Card,
			[Tabs.name]: Tabs,
			Leibiao,
			Bar
		},

	}
</script>

<style>
	.zhifenlei {
		padding-bottom: 4rem;
	}
	
	.van-tabs__wrap van-tabs__wrap--scrollable van-hairline--top-bottom {
		background-color: #fff;
	}
	
	.van-tabs__line {
		background-color: #fff;
	}
	
	.van-tab--active {
		font-weight: 800;
		color: red
	}
	
	.box {
		background-color: #f5f2ed;
	}
	
	.paddingl {
		padding-left: 0.6rem;
	}
	
	.padding {
		padding: .6rem 0;
	}
	
	.cover {
		float: left;
		display: block;
		height: 6rem;
		width: 5.6rem;
	}
	
	.auto {
		display: inline-block;
		width: 4.4rem;
		height: 5.6rem;
		margin-right: 10px;
	}
	
	.right {
		margin-left: 5.6rem;
	}
	
	.name {
		height: 1.4rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 1.2rem;
		font-size: 16px;
		color: #333!important;
		font-weight: bold;
	}
	
	.over {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #999;
		font-size: 12px;
		height: 1.4rem;
		line-height: 1.2rem;
	}
	
	.important {
		color: #666;
		font-size: 12px;
		height: 1.4rem;
		line-height: 1.2rem;
	}
	
	.c-red {
		color: #b93321;
		font-size: 12px;
		height: 1.4rem;
		line-height: 1.2rem;
	}
</style>