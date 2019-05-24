<template>
	<div id="app">
		<div>
			<router-view></router-view>
		</div>
		<van-tabbar v-model="active">
			<van-tabbar-item icon="apps-o" @click="goState()">分类</van-tabbar-item>
			<van-tabbar-item icon="hot-o" @click="goState0()">搜索</van-tabbar-item>
			<van-tabbar-item icon="like-o" @click="goState1()">我的</van-tabbar-item>
			<van-tabbar-item icon="descending" @click="goState2()">排行</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import { Tabbar, TabbarItem } from 'vant';
	export default {

		data() {
			return {
				active: 0
			};
		},
		components: {

			[Tabbar.name]: Tabbar,

			[TabbarItem.name]: TabbarItem

		},
		methods: {
			goState() {
				this.$router.push({
					name: 'fenlei'
				});
			},
			goState1() {
				this.$router.push({
					name: 'wode'
				});
			},
			goState0() {
				this.$router.push({
					name: 'search'
				});
			},
			goState2() {
				this.$router.push({
					name: 'paihang'
				});
			}

		},

	}
</script>

<style scoped>
	.van-tabbar-item--active {
		color: #b93321;
	}
	
	.van-tabbar {
		height: 65px;
		z-index: 10;
	}
	
	.van-tabbar-item__icon {
		font-size: 25px;
	}
	
	.van-tabbar-item {
		font-size: 17px;
	}
	
	.auto {
		display: inline-block;
		width: 4.4rem;
		height: 5.6rem;
		margin-right: 10px;
	}
	
	.clearfix {
		overflow: hidden;
	}
	
	.fl {
		float: left;
	}
	
	.fr {
		float: right;
	}
</style>