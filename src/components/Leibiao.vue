<template>
	<div class="leibiao">
		<div class="box" v-for="item in zhifenlei.zjia" @click='toabout(item._id,item)'>
			<div class="paddingl">
				<div class="padding">
					<div class="cover">
						<img class="auto" :src="'http://statics.zhuishushenqi.com'+item.cover" alt="">
					</div>

					<div class="right">
						<h3 class="name">{{item.title}}</h3>
						<p class="over">{{item.author}}<span class="over">|</span>{{item.majorCate}}</p>
						<p class="over">{{item.shortIntro}}</p>
						<p class="important">
							<span class="c-red">{{item.latelyFollower}}</span>人气
							<span class="split">|</span>
							<span class="c-red">{{item.retentionRatio}}</span>读者留存
						</p>
					</div>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'leibiao',
		props: {
			zhifenlei: Object
		},
		created() {
			console.log('zhifenleifffff', this.zhifenlei)
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
		},

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.box {
		background-color: #f5f2ed;
	}
	
	.paddingl {
		padding-left: 0.6rem;
		

	}
	
	.padding {
		padding: .6rem 0;
		border-bottom: 1px solid rgb(221, 221, 221);
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