<template>
	<div class="searchmore">
		<Bar :title="{title}"></Bar>
		<div class="cod">
			<Leibiao :zhifenlei="{zjia}"></Leibiao>
			<div class="show-more">没有更多书籍</div>
		</div>

	</div>
</template>

<script>
	import Leibiao from "../components/Leibiao.vue"
	import Bar from "../components/Bar.vue"
	import { Tab, Tabs, Card } from 'vant';
	const urls = '/api/cats/lv2'

	export default {
		name: 'searchmore',

		data() {
			return {
				hotword: '',
				zhifenlei: [],
				shux: [],
				zjia: [],
				active: 0,
				title: ''
			};
		},
		created() {

			if(this.$route.params.hotword) {
				this.hotword = this.$route.params.hotword;
			}
			if(!this.$route.params.hotword) {
				this.hotword = this.$store.state.hotword
				console.log('this.hotword ', this.hotword)
			}
			this.title = '跟' + this.hotword + '有关的书籍';
			const url = '/api/book/fuzzy-search?query=' + this.hotword + '&start=0&limit=10'

			this.axios.get(url).then(response => {
				this.zjia = response.data.books
				console.log('this.zhifenlei', this.zjia)
			}, err => {
				alert('response.data', err)
			})

		},
		methods: {

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
	.searchmore {
		padding-bottom: 4rem;
	}
	
	.van-tabs__wrap van-tabs__wrap--scrollable van-hairline--top-bottom {
		background-color: #fff;
	}
	
	.van-tabs__line {
		background-color: #fff;
	}
	
	.cod {
		min-height: 31rem;
		background-color: #f5f2ed;
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
	
	.show-more {
		height: 2.2rem;
		line-height: 2.2rem;
		display: block;
		text-align: center;
		vertical-align: baseline;
		color: #999;
	}
</style>