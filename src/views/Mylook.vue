<template>
	<div class="shouchan">
		<div class="bar">
			<div class="bar-heard" @click="goback">
				<van-icon name="arrow-left" class="bar-icon" />
				<span class="bar-text">返回</span>
			</div>
			<div class="bar-z-heard">我看过的</div>
			<div class="bar-r-heard matop" @click="gosc">编辑</div>
		</div>
		<section class="empty" v-if='lookHistory[userId].length==0'>
			<router-link :to="{ name: 'fenlei' }">
				<div class="empty-icon">
					<van-icon name="add-square" />
				</div>
				<p class="empty-notice">快去浏览喜欢的小说吧</p>
			</router-link>
		</section>
		<div class="cod" v-else>
			<div class="look-box" v-for="item in lookHistory[userId]">
				<div class="paddingl">
					<div class="padding">
						<div class="cover">
							<img class="auto" :src="'http://statics.zhuishushenqi.com'+item.cover" alt="">
						</div>

						<div class="right">
							<h3 class="name">{{item.title}}</h3>

							<p class="over">阅读到第{{item.lastmulu}}章</p>
							<button class="sc" @click='dosc(item)' v-if='issc'>删除</button>
							<button class="sc" v-else @click='toabout(item._id,item)'>
								去阅读
							</button>

							<p class="over"></p>
							<p class="important">
								<span class="c-red"></span>
								<span class="split"></span>
								<span class="c-red"></span>
							</p>
						</div>
					</div>

				</div>
			</div>
			<div class="show-more">没有更多书籍</div>
		</div>
	</div>

</template>

<script>
	import { Icon } from 'vant';
	import Leibiao from "../components/Leibiao.vue"
	import Bar from "../components/Bar.vue"
	export default {
		name: 'paihang',
		created() {
			this.userId = JSON.parse(localStorage.getItem('userLogin')).userId;

			//获取当前用户的本地存储搜索历史记录
			var lookHistoryData = localStorage.getItem('lookHistory');

			this.lookHistory = lookHistoryData == undefined ? {} : JSON.parse(lookHistoryData);
			this.zjia = this.$store.state.myshouc

			console.log('this.myshouc', this.lookHistory[this.userId])
		},

		methods: {
			toabout(id) {
				console.log(id)
				this.$router.push({
					path: "/about",
					name: "about",
					params: {
						id: id
					}
				});
			},
			goback() {
				this.$router.go(-1);
			},
			gosc() {
				this.issc = !this.issc
			},
			dosc(item) {
				let a = this.lookHistory[this.userId].filter(a => a !== item);
				this.lookHistory[this.userId] = a
				localStorage.setItem('lookHistory', JSON.stringify(this.lookHistory));

				console.log('this.myshouc', this.lookHistory[this.userId])
			},
			toabout(id, item) {
				console.log('changeitem', item)
				this.$store.commit('changeitem', item)
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

		data() {
			return {
				zjia: [],
				myshouc: [],
				lookHistory: {},

				userId: '',
				issc: false
			};
		},
		components: {

			[Icon.name]: Icon,
			Leibiao,
			Bar

		},

	}
</script>

<style>
	.empty {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.empty a {
		display: block;
		text-align: center;
		margin-top: -50px;
		margin: auto;
	}
	
	.empty .empty-icon {
		font-size: 80px;
		color: #ccc;
	}
	
	.empty .empty-notice {
		margin-top: 10px;
		color: #999;
	}
	
	.cod {
		min-height: 36rem;
		background-color: #f5f2ed;
	}
	
	.look-box {
		background-color: #FFF;
	}
	
	.paddingl {
		padding-left: 0.6rem;
	}
	
	.padding {
		padding: .6rem 0;
		border-bottom: 1px solid #ccc;
	}
	
	.cover {
		float: left;
		display: block;
		height: 6rem;
		width: 5.6rem;
	}
	
	.sc {
		float: right;
		width: 6rem;
		margin-right: 0.6rem;
		border-radius: .5rem;
		background-color: #b93321;
		color: #fff;
		padding: .5rem;
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
	.matop{
		margin-top: 0;
	}
</style>