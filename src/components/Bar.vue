<template>
	<div class="bar">
		<div class="bar-heard" @click="goback">
			<van-icon name="arrow-left" class="bar-icon" />
			<span class="bar-text">返回</span>
		</div>
		<div class="bar-z-heard">{{title.title}}</div>
		<div class="bar-r-heard matop" @click="gohome">首页</div>
	</div>
</template>

<script>
	import { Icon } from 'vant';
	export default {
		name: 'bar',
		props: {
			title: Object
		},

		created() {
			console.log('this.title,', this.title)
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
			gohome() {
				this.$router.push("/");
			},
		},
		components: {

			[Icon.name]: Icon,
		},

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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