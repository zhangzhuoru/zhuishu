<template>
	<div class="about">
		<div class="about-box">
			<!-- 头部栏 -->
			<Bar :title="{title:'书籍详情'}"></Bar>
			<!-- 图书请求数据布局 -->
			<div class="bookqq">
				<!-- 图书详情 -->
				<div class="book-detail">
					<img class="flotl" :src="'http://statics.zhuishushenqi.com'+item.cover" alt="">
					<div class="desc">
						<h1 class="title">{{about.title}}</h1>
						<p class="sku">
							<span class="c-red">{{about.author}}</span><i>|</i>
							<span>{{about.minorCateV2}}</span><i>|</i><span>{{about.wordCount}}</span>
						</p>
						<p class="update">{{ about.updated | time}}更新</p>
					</div>
				</div>
				<!-- 按钮 -->
				<div class="read-link">
					<a class="buttonl" v-if='!shouc' @click='addlikes'><i>加入书架</i></a>
					<a class="buttonl1" v-else @click='addlikes'><i>撤出书架</i></a>
					<a class="buttonr" style="margin: 0px 0px 0px 3%;" @click="toReader(order)"><i>开始阅读</i></a>
				</div>
				<!-- 人气 -->
				<div class="reader-data">
					<p class="item"><span class="key">追人气</span> <span class="numb">{{about.latelyFollower}}</span></p>
					<p class="item"><span class="key">读者留存率</span> <span class="numb">{{about.retentionRatio}}</span></p>
					<p class="item"><span class="key">日更字数/天</span> <span class="numb">{{about.serializeWordCount}}</span></p>
				</div>
				<!-- 故事简介 -->
				<div class="jieshao">
					<div class="introduction" @click='change'>
						<p :class="{active:bool}" style="user-select: text;">{{about.longIntro}}</p>
						<van-icon class="arrow" :name="bool ? 'arrow-up':'arrow-down'" />
					</div>
					<div class='mulu'>
						<div class="chapter-item">
							<div class="inner">目录
								<span @click='tomulu(id)'>[{{ about.updated | time}}更新] {{about.lastChapter}}</span>
								<van-icon class="arrowto" name="arrow" />
							</div>
						</div>
					</div>
				</div>

			</div>
			<!-- 评论 -->
			<div class="pinglun">
				<!-- 评论头部 -->
				<div class="hot-comment-top">
					<h2>热门书评</h2>
					<div class="more">更多评论</div>
				</div>
				<!-- 评论内容 -->
				<Pinglunmin :pinglunmin="{pinglun}"></Pinglunmin>
			</div>
			<!-- 推荐 -->
			<div class="tuijian">
				<h4 class="tj-maybe">你可能感兴趣<i class="tj-tip"></i><span class="tj-more">更多</span></h4>
				<!-- 推荐列表 -->
				<div class="tjleibiao">
					<div class="tj-box" v-for='tj in tuijian'>
						<img class="tj-img"  :src="'http://statics.zhuishushenqi.com'+tj.cover" alt="">
						<span class="tj-sm">{{tj.title}}</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Pinglunmin from "../components/Pinglunmin.vue"
	import Bar from "../components/Bar.vue"
	import { Icon } from 'vant';
	import moment from 'moment';
	let that = this
	export default {
		name: 'about',

		data() {
			return {
				about: {},
				bool: false,
				pinglun: [],
				addpd: {},
				tuijian: [],
				id: '',
				title: '',
				userLoginStatus: [],
				shouc: false,
				lastmulu: '',
				lookHistory: {},
				order: 1,
				userId: '',
				mulus: [],
				loding:false,
				item:[]
			};
		},
		created() {
			//获取用户登录状态findIndex
			var userLogin = localStorage.getItem('userLogin');
			this.item = this.$store.state.item
			this.userId = userLogin == undefined ? null : JSON.parse(userLogin).userId;

			this.userLoginStatus = userLogin == undefined ? null : JSON.parse(userLogin);
			var lookHistoryData = localStorage.getItem('lookHistory');

			this.lookHistory = lookHistoryData == undefined ? {} : JSON.parse(lookHistoryData);
			if(this.$route.params.id) {
				this.id = this.$route.params.id;
			}
			if(!this.$route.params.id) {
				this.id = this.$store.state.id
			}
			console.log('that.pinglunurls', !this.$route.params.id)
			const url = '/api/book/' + this.id
			this.axios.get(url).then(response => {
				this.about = response.data
				this.$store.commit('addtitle', response.data.title)
				this.logding=true
			}, err => {
				alert('response.data', err)
			})
			const plurl = '/api/post/review/best-by-book?book=' + this.id + '&limit=10'
			this.axios.get(plurl).then(response => {
				let plun = response.data.reviews
				plun.map(that => {
					that['nickname'] = that.author.nickname
					that['pinglunurl'] = that.author.avatar
				})
				this.pinglun = plun.splice(0, 2)
			}, err => {
				alert('response.data', err)
			})
			// https://api.zhuishushenqi.com/book/57206c3539a913ad65d35c7b/recommend
			const tjurl = '/api/book/' + this.id + '/recommend'
			console.log('that.pinglunurls', tjurl)
			this.axios.get(tjurl).then(response => {
				this.tuijian = response.data.books.splice(0, 3)
			}, err => {
				alert('response.data', err)
			})
			// https://api.zhuishushenqi.com/atoc?view=summary&book=57206c3539a913ad65d35c7b
			const syurl = '/api/atoc?view=summary&book=' + this.id
			console.log('that.pinglunurls', tjurl)
			this.axios.get(syurl).then(response => {
				this.id = response.data[0]._id
				const mulusurl = '/api/toc/' + this.id + '?view=chapters'
				console.log('that.pinglunurls', mulusurl)
				this.axios.get(mulusurl).then(response => {
					this.mulus = response.data.chapters
					this.$store.commit('add', response.data.chapters)
					console.log('this.mulus',this.mulus)
				}, err => {
					alert('response.data', err)
				})
			}, err => {
				alert('response.data', err)
			})
			this.title = this.$store.state.title

			const result = this.lookHistory[this.userId].findIndex(fruit => fruit._id === this.$store.state.item._id);
			if(result > -1) {
				this.order = this.lookHistory[this.userId][result].lastmulu
				this.shouc = this.lookHistory[this.userId][result].like
				console.log('this.shoucthis.shouc', this.order)
			}
			

		},
		beforeRouteLeave(to, form, next) {
			this.look()

			next();
		},
		filters: {
			time(updated) {
				moment.locale('zh-cn');
				let result = moment(updated).fromNow();
				return result.replace(/\s/g, ""); //去除文章中间空格
			}
		},

		components: {

			[Icon.name]: Icon,
			Pinglunmin,
			Bar
		},
		methods: {
			change() {
				this.bool = !this.bool
			},
			tomulu(id) {
				this.$router.push({
					path: "/mulu",
					name: "mulu",
					params: {
						id: id
					}
				});

			},
			addlikes() {

				if(!this.userLoginStatus.loginStatus) {
					//如果未登录, 提示用户登录
					this.$toast('您尚未登录');
				} else if(this.userLoginStatus.loginStatus) {

					//显示sku面板
					this.shouc = !this.shouc;

				}
			},
			toReader(order) {
				console.log(order)
				this.$router.push({
					path: "/reader",
					name: "reader",
					params: {
						order: order
					}
				});

			},
			look(keyWord) {
				console.log('this.lookHistory[this.userId]', this.lookHistory[this.userId])
				this.lookProducts = [];

				if(!this.lookHistory[this.userId]) {

					this.lookHistory[this.userId] = [];

				}
				const result = this.lookHistory[this.userId].findIndex(fruit => fruit._id === this.$store.state.item._id);

				console.log(result) // { name: 'cherries', quantity: 5 }
				//				for(var i=1;i<this.lookHistory[this.userId].length;i++){
				//					if(this.lookHistory[this.userId][i]._id==this.$store.state.item._id){
				//						
				//						this.isbook=false
				//						console.log('this.isbook',this.isbook)
				//					}
				//				}
				if(result > -1) {
					this.lookHistory[this.userId][result]['lastmulu'] = this.order
					this.lookHistory[this.userId][result]['like'] = this.shouc
				}
				if(result == -1) {
					this.$store.state.item['lastmulu'] = this.order
					this.$store.state.item['like'] = this.shouc
					this.lookHistory[this.userId].push(this.$store.state.item)
				}

				localStorage.setItem('lookHistory', JSON.stringify(this.lookHistory));

			},
		}
	}
</script>

<style>
	.about {
		padding-bottom: 3.6rem;
		font-size: 12px;
		background: #ebebeb;
	}
	
	.book-detail {
		padding: 1rem;
		background: #fff;
	}
	
	.flotl {
		float: left;
		width: 3.5rem;
		height: 4.75rem;
	}
	
	.desc {
		margin-left: 4rem;
		display: block;
	}
	
	.desc .title {
		display: block;
		height: 1.375rem;
		font-weight: 400;
		font-size: 16px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.sku {
		height: 1.375rem;
		font-size: 12px;
	}
	
	.sku span {
		font-weight: 400;
		color: #999;
	}
	
	.sku i {
		padding: 0 .375rem;
	}
	
	.sku .c-red {
		color: #b93321;
	}
	
	.update {
		font-weight: 400;
		color: #999;
		height: 1.375rem;
	}
	
	.read-link {
		padding: 1.2rem 1.2rem;
		border-bottom: 1px solid #ebebeb;
		font-size: 0;
		background: #fff;
		display: block;
	}
	
	.read-link .buttonl {
		display: inline-block;
		vertical-align: middle;
		height: 2.375rem;
		line-height: 2.375rem;
		border: 1px solid #b93321;
		border-radius: 2px;
		text-align: center;
		color: #b93321;
		font-size: 16px;
		width: 45%;
		vertical-align: baseline;
		margin-right: 5%;
	}
	
	.read-link .buttonl1 {
		display: inline-block;
		vertical-align: middle;
		height: 2.375rem;
		line-height: 2.375rem;
		border: 1px solid #999;
		background: #999;
		color: #fff;
		border-radius: 2px;
		text-align: center;
		font-size: 16px;
		width: 45%;
		vertical-align: baseline;
		margin-right: 5%;
	}
	
	.read-link .buttonr {
		display: inline-block;
		vertical-align: middle;
		height: 2.375rem;
		line-height: 2.375rem;
		background-color: #b93321;
		border: 1px solid #b93321;
		border-radius: 2px;
		text-align: center;
		color: #fff;
		font-size: 16px;
		width: 45%;
		vertical-align: baseline;
		margin-right: 5%;
	}
	
	.reader-data {
		padding: 1.2rem 0;
		border-bottom: 1px solid #ebebeb;
		font-size: 0;
		background: #fff;
	}
	
	.reader-data .item {
		display: inline-block;
		vertical-align: middle;
		width: 33%;
		text-align: center;
	}
	
	.reader-data .item .key {
		color: #999;
		display: block;
		line-height: 1.2rem;
		font-size: 12px;
	}
	
	.reader-data .item .numb {
		margin-top: .25rem;
		font-size: 18px;
		display: block;
		line-height: 1.2rem;
		color: #222;
		font-weight: 500;
	}
	
	.introduction {
		position: relative;
		padding: 1.2rem;
		background: #fff;
		color: #222;
		font-weight: 400;
		border-bottom: 1px solid #ebebeb;
	}
	
	.introduction p {
		line-height: 1.6rem;
		font-size: 13px;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}
	
	.introduction .active {
		height: auto!important;
		overflow: auto!important;
		overflow-x: auto;
		overflow-y: auto;
		display: block!important;
	}
	
	.arrow {
		position: absolute;
		width: 1.2rem;
		height: 1.2rem;
		bottom: .8rem;
		right: .1rem;
		background-size: 60%;
		background-repeat: no-repeat;
		background-position: 50%;
	}
	
	.chapter-item {
		display: block;
		background: #fff;
		padding: 0 0 0 1.2rem;
		border-bottom: 1px solid #ebebeb;
		line-height: 1.2rem;
		color: #333;
	}
	
	.chapter-item .inner {
		position: relative;
		font-size: 14px;
		padding: 1.2rem 1.3rem 1.2rem 0;
		border-top: 1px solid #f4f4f4;
	}
	
	.inner span {
		float: right;
		max-width: 65%;
		color: #999;
		word-break: break-all;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		-webkit-box-orient: vertical;
		font-size: 12px;
		font-weight: 400;
	}
	
	.arrowto {
		position: absolute;
		width: 1.2rem;
		height: 1.2rem;
		bottom: 1.1rem;
		right: .1rem;
		background-size: 60%;
		background-repeat: no-repeat;
		background-position: 50%;
	}
	
	.pinglun {
		background: #fff;
		margin-bottom: .5rem;
		display: block;
		font-size: 12px;
		color: #222;
		font-weight: 400;
	}
	
	.hot-comment-top {
		height: 2.1875rem;
		position: relative;
	}
	
	.hot-comment-top h2 {
		height: 2.15rem;
		line-height: 2.15rem;
		padding: 0 1.2rem;
		font-size: 14px;
		font-weight: 400;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.more {
		display: block;
		height: 2.15rem;
		line-height: 2.15rem;
		padding: 0 1.2rem;
		font-size: 12px;
		color: #999;
		font-weight: 400;
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.tuijian {
		background: #fff;
		margin-bottom: .6667rem;
	}
	
	.tj-maybe {
		position: relative;
		height: 2.4rem;
		padding: 0 .8rem;
		line-height: 2.4rem;
		font-size: 14px;
		overflow: hidden;
		text-align: left;
		font-weight: bold;
		color: rgb(0, 0, 0);
	}
	
	.tj-tip {
		position: absolute;
		left: 0;
		top: .8rem;
		width: .12rem;
		height: .8rem;
		background-color: #b93321;
	}
	
	.tj-more {
		position: absolute;
		right: 1.2rem;
		color: #b93321;
		font-size: 12px;
	}
	
	.tjleibiao {
		display: block;
	}
	
	.tj-box {
		display: inline-block;
		width: 25%;
		height: 7rem;
		padding: 0 .8rem;
		text-align: left;
		overflow: hidden;
	}
	
	.tj-img {
		height: 4.5rem;
	}
	
	.tj-sm {
		display: block;
		height: 2rem;
		line-height: 2rem;
		color: #333;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 12px;
	}
</style>