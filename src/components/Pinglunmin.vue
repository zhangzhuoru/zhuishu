<template>
	<div class="pinglunmin">
		<div id="c-comment-list" v-for='item in pinglunmin.pinglun'>
			<div class="pdl">
				<div class="inner">
					<img class='avater' :src="'http://statics.zhuishushenqi.com'+item.pinglunurl" alt="">
					<div class="rit">
						<p class="rit-name">{{item.nickname}}</p>
						<p class="rit-title">{{item.title}}</p>
						<p class="score">
							<i class="star-full"></i>
							<i class="star-full"></i>
							<i class="star-full"></i>
							<i class="star-full"></i>
							<i class="star-full"></i>
						</p>
						<p class="rit-content">{{item.content}}</p>
						<p class="rit-love">
							<span class="rit-love-o">{{ item.updated | time}}</span>
							<span class="rit-love-t">{{item.likeCount}}人觉得有用</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import moment from 'moment';
	export default {

		name: 'pinglunmin',
		props: {
			pinglunmin: ''
		},
		created() {
			console.log('pinglunmin', this.pinglunmin)
		},
		filters: {
			time(updated) {
				moment.locale('zh-cn');
				let result = moment(updated).fromNow();
				return result.replace(/\s/g, ""); //去除文章中间空格
			}
		},
	}
</script>

<style scoped>
	.c-comment-list {
		display: block;
	}
	
	.pdl {
		padding: .7rem 0 0 1.2rem!important;
	}
	
	.c-comment-list .rit {
		display: block;
	}
	
	.rit-name {
		position: relative;
		height: .8rem;
		line-height: .8rem;
		color: #a58d5e;
		font-size: 12px;
	}
	
	.rit-title {
		height: 1.1rem;
		line-height: 1.2rem;
		font-weight: 700;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #000;
	}
	
	.rit-content {
		height: 2.2rem;
		overflow: hidden;
		line-height: 1.2rem;
		text-align: justify;
		color: #999;
	}
	
	.rit-love {
		padding-top: .3333rem;
		height: 1.2rem;
		overflow: hidden;
		position: relative;
	}
	
	.rit-love span {
		display: inline-block;
		vertical-align: middle;
	}
	
	.rit-love-o {
		position: absolute;
		left: 0;
		color: #999;
	}
	
	.rit-love-t {
		position: absolute;
		color: #999;
		right: 0;
	}
	
	.avater {
		width: 2rem;
		height: 2rem;
		border-radius: 2rem;
		float: left;
		margin-right: 1.2rem;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.inner {
		position: relative;
		padding-left: 2.4rem;
		padding-right: .53333rem;
		padding-bottom: .21333rem;
		border-bottom: 1px solid #ebebeb;
	}
</style>