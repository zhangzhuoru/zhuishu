<template>
	<div :class="'Reader'+nub">
		<!-- 目录顶部 -->
		<div :id="'dsds'+nub" :style="'font-size:'+(20+2*type)+'px!important;'">{{timu}}</div>
		<div @click="list">
			<div v-for='(item,index) in neirong' :class="'p'+nub" :key="'a'+index" :style="'font-size:'+(16+2*type)+'px!important;'">{{item}}</div>
		</div>
		<!-- 目录顶部 -->
		<div class="read-heard" v-show='isshow'>
			<div class="btn-mulu-l-heard" @click="goback">
				<span class="read-heard-icon">< </span>
				<span class="read-heard-text">返回</span>
			</div>
			<div class="btn-mulus-heard" @click="look">{{title}}</div>
			<div class="btn-mulu-r-heard" @click="gohome">首页</div>
		</div>
		<!-- 目录顶部 -->

		<!-- 目录顶部 -->
		<div class="read-foot" v-show='isshow'>
			<div class="toBookShelf" v-if='!shouc' @click="xiugshouc">加入书架</div>
			<div class="toBookShelf" v-else @click="xiugshouc">撤出书架</div>

			<div class="read-foot-a">
				<span class="btn-foot-l" @click="cout">Aa-</span>
				<span class="btn-line"><span class="btn-content" :style="'width:'+25*type+'%;'"></span></span>
				<span class="btn-foot-r" @click="add">Aa+</span>
			</div>
			<div class="read-foot-t">
				<span class="btn-square" :class="1==nub ? 'btn-square-act':''" @click="nub = 1">默认</span>
				<span class="btn-square-z" :class="2==nub ? 'btn-square-act':''" @click="nub = 2">夜间</span>
				<span class="btn-square-r" :class="{'btn-square-act':3==nub}" @click="nub = 3">护眼</span>
			</div>
			<div class="read-foot-ml">
				<span class="btn-mulu-l" @click="gobefor">上一章</span>
				<span class="btn-mulus" @click="mulu">目录</span>
				<span class="btn-mulu-r" @click="gonext">下一章</span>
			</div>

		</div>
		<!-- 目录顶部 -->

		<div class="drawer" v-if="show">
			<div class="hide-title">
				<p>{{title}}</p>
				<p>目录</p>
			</div>
			<ul class="hide-mulus">
				<div v-for='mulu in allmulu' class="hide-mulu" :class="{'hide-mulu-act':mulu.order==order}" @click='goclick(mulu.order)'>{{mulu.title}}</div>
			</ul>
		</div>

		<div class="bg" v-show="show" @click="muluclose"></div>

	</div>
</template>

<script>
	import { Row, Col, Icon, Popup } from 'vant';

	let that = this
	export default {
		name: 'Reader',

		data() {
			return {
				order: 1,
				isshow: false,
				isrmulus: [],
				timu: "",
				counter: '',
				allmulu: [],
				show: false,
				title: '',
				neirong: [],
				link: '',
				nub: 3,
				type: 0,
				shouc: false,
				item: {},
				myshouc: [],
				//搜索商品数据
				lookProducts: [],

				//当前用户的搜索历史记录
				lookHistory: {},
				userLoginStatus: [],

				userId: '',
				isbook: true,
				y: 0,
				ys: 3300
			};
		},
		created() {
			this.myshouc = this.$store.state.myshouc
			console.log('this.item', this.$store.state.item)
			this.order = this.$route.params.order;
			console.log('that.order', this.order)
			this.allmulu = this.$store.state.mulus
			this.link = this.allmulu[this.order - 1].link
			console.log('that.link', this.order)
			// https://api.zhuishushenqi.com/toc/577b477dbd86a4bd3f8bf1b2?view=chapters
			const url = '/chapter2/chapter/' + this.link
			console.log('that.url', url)
			this.axios.get(url).then(response => {
				this.timu = response.data.chapter.title
				this.neirong = response.data.chapter.cpContent.split('\n\n');
			}, err => {
				alert('response.data', err)
			})

			this.title = this.$store.state.title
			//获取用户id

			this.userId = JSON.parse(localStorage.getItem('userLogin')).userId;
			//获取用户登录状态
			var userLogin = localStorage.getItem('userLogin');
			this.userLoginStatus = userLogin == undefined ? null : JSON.parse(userLogin);

			//获取当前用户的本地存储搜索历史记录
			var lookHistoryData = localStorage.getItem('lookHistory');

			this.lookHistory = lookHistoryData == undefined ? {} : JSON.parse(lookHistoryData);
			const result = this.lookHistory[this.userId].findIndex(fruit => fruit._id === this.$store.state.item._id);
			if(result > -1) {
				this.shouc = this.lookHistory[this.userId][result].like
				this.y = this.lookHistory[this.userId][result].scrollTop
			}
			let that = this

			function sc() {
				window.scrollTo(0, that.y);
			}
			var timer = setTimeout(() => {

				sc()
				clearTimeout(timer);
				timer = null;

			}, 100)

		},

		computed: {
			mulus() {
				// JSON.stringify(this.neirong)
				var mulus = this.neirong
			},
		},

		components: {

			[Row.name]: Row,
			[Icon.name]: Icon,
			[Col.name]: Col,
			[Popup.name]: Popup

		},

		mounted() {
			console.log(this.neirong)
		},
		beforeRouteLeave(to, form, next) {
			var scrollTop = document.documentElement.scrollTop;
			console.log('scrollTop', scrollTop)
			this.y = scrollTop
			this.look(scrollTop)

			next();
		},
		methods: {
			list() {

				// this.isReverse=!this.isReverse
				this.isshow = !this.isshow

				console.log(111)
				console.log(this.show)
			},
			goclick(order) {
				this.order = order
				this.link = this.allmulu[this.order - 1].link
				const url = '/chapter2/chapter/' + this.link
				console.log('that.pinglunurlss+', this.order)
				this.axios.get(url).then(response => {
					this.timu = response.data.chapter.title
					this.neirong = response.data.chapter.cpContent.split('\n\n')
				}, err => {
					alert('response.data', err)
				})
				this.show = !this.show
			},
			goback() {
				this.$router.go(-1);
			},
			gohome() {
				this.$router.push("/");
			},
			gonext() {
				this.link = this.allmulu[this.order++].link
				const url = '/chapter2/chapter/' + this.link
				console.log('that.pinglunurlss+', this.order)
				this.axios.get(url).then(response => {
					this.timu = response.data.chapter.title
					this.neirong = response.data.chapter.cpContent.split('\n\n')
				}, err => {
					alert('response.data', err)
				})
			},
			gobefor() {
				if(this.order == 1) {
					return
				} else {
					this.order = this.order - 1
					this.link = this.allmulu[this.order - 1].link
					const url = '/chapter2/chapter/' + this.link
					console.log('that.pinglunurlss-', this.order)
					this.axios.get(url).then(response => {
						this.timu = response.data.chapter.title
						this.neirong = response.data.chapter.cpContent.split('\n\n')
					}, err => {
						alert('response.data', err)
					})
				}

			},
			cout() {
				if(this.type == 0) {
					return
				} else {
					this.type = this.type - 1
					console.log('that.type', this.type)
				}
			},
			add() {
				if(this.type == 4) {
					return
				} else {
					this.type = this.type + 1
					console.log('that.type', this.type)
				}
			},
			xiugshouc() {
				if(!this.userLoginStatus.loginStatus) {
					//如果未登录, 提示用户登录
					this.$toast('您尚未登录');
				} else if(this.userLoginStatus.loginStatus) {

					//显示sku面板
					this.shouc = !this.shouc;

				}
			},
			mulu() {
				// this.isReverse=!this.isReverse
				this.isshow = !this.isshow
				this.show = !this.show
				console.log(111)
				console.log(this.show)
			},
			muluclose() {
				// this.isReverse=!this.isReverse
				this.show = !this.show
				console.log(111)
				console.log(this.show)
			},
			tozhifenlei(major) {
				console.log(major)
				this.$router.push({
					path: "/zhifenlei",
					name: "zhifenlei",
					params: {
						major: major
					}
				});

			},
			look(scrollTop) {
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
					console.log('scrollTop2', this.y)
					this.lookHistory[this.userId][result]['scrollTop'] = this.y
				}
				if(result == -1) {
					this.$store.state.item['lastmulu'] = this.order
					this.$store.state.item['like'] = this.shouc
					console.log('scrollTop2', this.y)
					this.$store.state.item['scrollTop'] = this.y
					this.lookHistory[this.userId].push(this.$store.state.item)
				}

				localStorage.setItem('lookHistory', JSON.stringify(this.lookHistory));

			},
		}
	}
</script>

<style>
	.Reader1 {
		background-color: #eee6dd;
		z-index: 1000;
		position: absolute;
	}
	
	#dsds1 {
		color: #333;
		padding: 1.6rem 1.2rem 0.8rem 1.2rem;
		line-height: 1.5;
		font-size: 20px;
	}
	
	.p1 {
		font-size: 16px;
		line-height: 1.5;
		margin: 0 1.2rem;
		color: #5c5d58;
	}
	
	.Reader2 {
		background-color: #0c0c0c;
		z-index: 1000;
		position: absolute;
	}
	
	#dsds2 {
		color: #888;
		padding: 1.6rem 1.2rem 0.8rem 1.2rem;
		line-height: 1.5;
		font-size: 19px;
	}
	
	.p2 {
		font-size: 16px;
		line-height: 1.5;
		margin: 0 1.2rem;
		color: #666;
	}
	
	.Reader3 {
		background-color: #b8cd8d;
		z-index: 1000;
		position: absolute;
	}
	
	#dsds3 {
		color: #0c2e10;
		padding: 1.6rem 1.2rem 0.8rem 1.2rem;
		line-height: 1.5;
		font-size: 19px;
	}
	
	.p3 {
		font-size: 16px;
		line-height: 1.5;
		margin: 0 1.2rem;
		color: rgba(12, 46, 16, .8);
	}
	
	.read-heard {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 21;
		width: 100%;
		height: 2.3333rem;
		color: #fff;
		background-color: rgba(50, 51, 52, .9);
		transition: all .2s ease;
		z-index: 1111;
	}
	
	.read-foot {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		font-size: 12px;
		color: #fff;
		height: 6.725rem;
		padding: 1.2rem;
		background-color: rgba(50, 51, 52, .9);
		transition: transform .15s;
		z-index: 1111;
	}
	
	.read-foot-a {
		position: relative;
		height: 1.6rem;
		margin-bottom: 1.2rem;
		line-height: 1.6rem;
		font-size: 0;
	}
	
	.btn-foot-l {
		width: 1.7rem;
		font-size: 16px;
		font-weight: 600;
		color: #888;
	}
	
	.btn-line {
		width: 12.8rem;
		line-height: 1.6rem;
		background: #b2b2b2;
		margin: 0 .6rem;
		display: inline-block;
		font-size: 14px;
		height: 4px;
		color: #fff;
		font-size: 14px;
		position: absolute;
		left: 50%;
		border: 1px solid #535353;
		margin-left: -6.4rem;
		margin-top: 0.5rem;
	}
	
	.btn-content {
		height: 4px;
		color: #fff;
		font-size: 14px;
		display: block;
		background: #b93221;
	}
	
	.btn-foot-r {
		width: 1.7rem;
		font-size: 16px;
		font-weight: 600;
		color: #fff;
		float: right;
		margin-right: .6rem;
	}
	
	.read-foot-t {
		position: relative;
		height: 1.6rem;
		margin-bottom: 1.2rem;
		font-size: 0;
		display: block;
		zoom: 1;
		visibility: visible;
	}
	
	.btn-square {
		display: inline-block;
		vertical-align: middle;
		height: 1.6rem;
		line-height: 1.6rem;
		text-align: center;
		border-radius: 4px;
		font-size: 14px;
		width: 4.8rem;
		color: #fff;
		border: 1px solid #535353;
		margin: 0 .45333rem;
	}
	
	.btn-square-z {
		display: inline-block;
		vertical-align: middle;
		height: 1.6rem;
		line-height: 1.6rem;
		text-align: center;
		border-radius: 4px;
		font-size: 14px;
		width: 4.8rem;
		color: #fff;
		margin: 0 .45333rem;
		position: absolute;
		left: 50%;
		border: 1px solid #535353;
		margin-left: -2.4rem;
	}
	
	.btn-square-r {
		display: inline-block;
		vertical-align: middle;
		height: 1.6rem;
		line-height: 1.6rem;
		text-align: center;
		border-radius: 4px;
		font-size: 14px;
		width: 4.8rem;
		color: #fff;
		border: 1px solid #535353;
		margin: 0 .45333rem;
		float: right;
		margin-right: .3rem;
	}
	
	.btn-square-act {
		
		color: #b93221;
		border: 1px solid #b93221;
		border-radius: .10667rem;

	}
	
	.read-foot-mulu {
		position: relative;
		height: 1.6rem;
		margin-bottom: .53333rem;
		font-size: 0;
	}
	
	.btn-mulu-l {
		display: inline-block;
		vertical-align: middle;
		height: 1.6rem;
		line-height: 1.6rem;
		text-align: center;
		border-radius: 2px;
		color: #fff;
		font-size: 14px;
		width: 3rem;
	}
	
	.btn-mulus {
		width: 5.8rem;
		height: 1.6rem;
		line-height: 1.6rem;
		color: #a8a8a8;
		text-align: center;
		position: absolute;
		left: 50%;
		margin-left: -3rem;
		display: inline-block;
		vertical-align: middle;
	}
	
	.btn-mulu-l-heard {
		display: inline-block;
		vertical-align: middle;
		text-align: center;
		border-radius: 2px;
		color: #fff;
		font-size: 14px;
		width: 3rem;
	}
	
	.read-heard-icon {
		text-align: center;
		color: #fff;
		font-size: 20px;
		font-weight: bold;
		line-height: 2.3333rem;
		display: inline-block;
		vertical-align: middle;
		font-style: normal;
	}
	
	.read-heard-text {
		text-align: center;
		color: #fff;
		font-size: 12px;
		line-height: 1rem;
		display: inline-block;
		vertical-align: middle;
		font-style: normal;
		line-height: 2.3333rem;
		margin-left: .3rem;
	}
	
	.btn-mulus-heard {
		width: 6.4rem;
		height: 1.6rem;
		color: #fff;
		font-weight: bold;
		font-size: 12px;
		text-align: center;
		position: absolute;
		left: 50%;
		margin-left: -3rem;
		display: inline-block;
		vertical-align: middle;
		line-height: 2.3333rem;
		text-align: center;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.btn-mulu-r-heard {
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
	
	.btn-mulu-r {
		display: inline-block;
		vertical-align: middle;
		height: 1.6rem;
		line-height: 1.6rem;
		text-align: center;
		border-radius: 2px;
		color: #fff;
		font-size: 14px;
		width: 3rem;
		float: right;
		margin-right: .3rem;
	}
	
	.drawer {
		position: fixed;
		top: 0;
		left: 0;
		width: 16rem;
		height: 100%;
		background: #fff;
		z-index: 1001;
	}
	
	.bg {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		background: rgba(7, 17, 27, 0.5);
	}
	
	.hide-title {
		position: fixed;
		left: 0;
		top: 0;
		width: 14.8rem;
		top: 0;
		height: 3.8rem;
		background: #fff;
		border-bottom: 1px solid #f2f2f2;
		padding-left: 1.2rem;
		z-index: 1002;
		display: block;
	}
	
	.hide-title p:first-of-type {
		font-size: 1rem;
		line-height: 1rem;
		padding: .4rem 0 .53333rem 0;
	}
	
	.hide-title p:nth-of-type(2) {
		font-size: 1rem;
		height: 1rem;
		line-height: 1rem;
		color: #999;
	}
	
	.hide-mulus {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		padding-top: 4rem;
		overflow-y: auto;
	}
	
	.hide-mulu {
		line-height: 2.6666rem;
		margin-left: 1.2rem;
		padding-right: 2rem;
		border-bottom: 1px solid #f2f2f2;
		color: #999;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		font-size: 12px;
	}
	
	.hide-mulu-act {
		color: #b93321;
	}
	
	.toBookShelf {
		position: absolute;
		width: 3.4rem;
		height: 1.6rem;
		background: rgba(50, 51, 52, .9);
		border-radius: 1.6rem 0 0 1.6rem;
		color: #fff;
		right: 0;
		font-size: .34667rem;
		line-height: 1.6rem;
		padding-left: 1.0rem;
		top: -2rem;
	}
</style>