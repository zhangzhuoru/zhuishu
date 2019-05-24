<template>
	<div class="shouchan">
		<div class="bar">
			<div class="bar-heard" @click="goback">
				<van-icon name="arrow-left" class="bar-icon" />
				<span class="bar-text">返回</span>
			</div>
			<div class="bar-z-heard">我的收藏</div>
			<div class="bar-r-heard" @click="gosc">编辑</div>
		</div>
		<section class="empty" v-if='lookHistory[userId].findIndex( fruit => fruit.like === true )==-1'>
			<router-link :to="{ name: 'fenlei' }">
				<p class="empty-notice2">当前收藏为空</p>
				<div class="empty-icon">
					<van-icon name="add-square" />
				</div>
				<p class="empty-notice">快去添加喜欢的小说吧</p>
			</router-link>
		</section>
		<div class="cod" v-else>
			<div class="like-box" v-for="item in lookHistory[userId]" @click='toabout(item._id,item)' v-show='item.like'>
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

		},

		methods: {
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
			gosc() {
				this.issc = !this.issc
			},
			goback() {
				this.$router.go(-1);
			},
			dosc(item) {
				let a = this.lookHistory[this.userId].filter(a => a !== item);
				this.lookHistory[this.userId] = a
				localStorage.setItem('lookHistory', JSON.stringify(this.lookHistory));

				console.log('this.myshouc', this.lookHistory[this.userId])
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
	
	.empty .empty-notice2 {
		margin-bottom: 3rem;
		color: #999;
		margin-top: -50px;
		font-size: 26px;
		;
	}
	
	.box {
		background-color: #f5f2ed;
	}
	
	.paddingl {
		padding-left: 0.6rem;
	}
	
	.padding {
		padding: .6rem 0;
		border-bottom: 1px solid #ccc;
	}
	
	.cod {
		min-height: 36rem;
		background-color: #f5f2ed;
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
	
	.sc {
		float: right;
		width: 6rem;
		margin-right: 0.6rem;
		border-radius: .5rem;
		background-color: #b93321;
		color: #fff;
		padding: .5rem;
	}
	
	.like-box {
		background-color: #FFF;
	}
</style>