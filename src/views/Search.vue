<template>
	<div class="search">
		<form>
			<van-search ref="search" v-model="keyWord" placeholder="输入搜索内容" show-action background="#fff">
				<div slot="action" style="color: #748389;" @click='gohot'>确认</div>
			</van-search>
		</form>
		<div v-if="show" class='tips-box'>
			<div class='tip-item' v-for='(item,index) in schkey' :key="index" @click='clickhot(item)'>
				{{item}}
			</div>
		</div>
		<div class='search-recommend'>

			<div class='layer'>
				<div class='title hot-div '>搜索热词</div>
				<div class='change' data-type='hot' @click='changegoods(goods)'>换一批</div>
				<div class='word-list'>
					<div class='word-item' v-for='(item,index) in goods' :key='index' @click='clickhot(item)'>
						{{item}}
					</div>
				</div>
			</div>
			<div class='layer'>
				<div class='title hot-div '>热门推荐</div>
				<div class='change' data-type='recommend' @click='changehot(hot)'>换一批</div>
				<div class='word-list'>
					<div class='word-item' v-for='(item,index) in hot' :key='index' @click='clickhot(item)'>
						{{item}}
					</div>
				</div>
			</div>
			<div class='layer'>
				<div class='title hot-div '>历史记录</div>
				<div class='change' data-type='recommend' @click='sc'>删除历史</div>
				<div class='word-list'>
					<div class='word-item' v-for='(item, index) in searchHistory[userId]' :key='index' @click='clickhot(item)'>
						{{item}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Search } from 'vant'
	export default {
		name: 'Search',

		data() {
			return {
				keyWord: '',

				//搜索商品数据
				searchProducts: [],

				//当前用户的搜索历史记录
				searchHistory: {},

				userId: '',

				//获取焦点
				isFocus: true,
				val: [],
				recVal: [],
				hot: [],
				goods: ["总裁", "废柴", "穿越", "重生", "老公"],
				schkey: [],
				show: false
			};
		},

		created() {
			//https://novel.juhe.im/search-hotwords
			// const hoturl = 'https://novel.juhe.im/search-hotwords'

			// this.axios.get(hoturl).then(response => {
			// 	this.val = response.data.searchHotWords
			// 	this.hot = this.random(10, this.val, 0)
			// 	console.log('that.url', this.random(10, this.val, 0))

			// }, err => {
			// 	alert('response.data', err)
			// })
			const hoturl = 'http://b.zhuishushenqi.com/book/hot-word'

			this.axios.get(hoturl).then(response => {
				this.val = response.data.hotWords
				this.hot = this.random(6, this.val, 0)
				console.log('that.url', this.random(6, this.val, 0))

			}, err => {
				alert('response.data', err)
			})
			// const goodsurl = 'https://novel.juhe.im/hot-books'

			// this.axios.get(goodsurl).then(response => {
			// 	this.recVal = response.data.hotWords
			// 	this.goods = this.random(6, this.recVal, 0)
			// 	console.log('that.url', this.random(6, this.recVal, 0))

			// }, err => {
			// 	alert('response.data', err)
			// })
			//获取用户id
			var userLogin = localStorage.getItem('userLogin');
			this.userId = userLogin == null ? '' : JSON.parse(userLogin).userId;
			console.log('this.userId', this.userId)

			//获取当前用户的本地存储搜索历史记录
			var searchHistoryData = localStorage.getItem('searchHistory');

			this.searchHistory = searchHistoryData == undefined ? {} : JSON.parse(searchHistoryData);

		},

		mounted() {
			var search = this.$refs.search.querySelector('input');

			search.focus();
			console.log('search.focus()', search.value)
		},

		components: {
			[Search.name]: Search
		},
		watch: {
			keyWord: function(newVal) {
				if(newVal) {
					const keyurl = '/api/book/auto-complete?query=' + newVal + '&start=0&limit=10'

					this.axios.get(keyurl).then(response => {
						this.schkey = response.data.keywords
						console.log('that.url', this.schkey)

					}, err => {
						alert('response.data', err)
					})
					this.show = true
				}
				if(newVal == '') {
					this.show = false
				}

			}
		},
		methods: {

			random(count, arr, min, max) {
				let temp = [...arr];
				let randomArr = [];
				let result = [];
				let c = 0;
				while(1) {
					max = temp.length - 1;
					let index = Math.floor(Math.random() * max + min)
					randomArr.push(temp[index]);
					temp.splice(index, 1);
					c++;
					if(c == count) {
						return randomArr;
					}
				}
			},
			gohot() {
				if(this.keyWord == '' || this.keyWord == undefined) {
					this.$toast('搜索关键不能为空');
					return;
				}
				this.search(this.keyWord);
				let hotword = this.keyWord
				this.$store.commit('addhotword', hotword)
				this.$router.push({
					path: "/searchmore",
					name: "searchmore",
					params: {
						hotword: hotword
					}
				});
			},
			changegoods(arr) {
				this.goods = this.random(4, arr, 0)
			},
			changehot(arr) {
				this.hot = this.random(6, arr, 0)
			},
			sc(){
				this.searchHistory[this.userId] = [];
				console.log(this.searchHistory[this.userId],this.userId)
				localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
			},
			clickhot(hotword) {
				this.search(hotword);
				console.log('this.hotword ', hotword)
				this.$store.commit('addhotword', hotword)
				this.$router.push({
					path: "/searchmore",
					name: "searchmore",
					params: {
						hotword: hotword
					}
				});
			},
			search(keyWord) {

				this.searchProducts = [];

				if(!this.searchHistory[this.userId]) {

					this.searchHistory[this.userId] = [];

				} else if(this.searchHistory[this.userId].length >= 10) {

					this.searchHistory[this.userId].shift();

				}

				if(this.searchHistory[this.userId].indexOf(keyWord) === -1) {
					this.searchHistory[this.userId].push(keyWord);
					localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
				}

			},
		}
	}
</script>

<style>
	.search {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
	}
	
	.van-search__content {
		background-color: #2222!important;
	}
	
	.van-search__action {
		color: #fff;
	}
	
	.tag-row {
		text-align: center;
	}
	
	.van-search__content {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		background-color: #f7f8fa;
		border-radius: 20px;
		padding-left: 10px;
	}
	
	.search-recommend,
	.tips-box {
		position: absolute;
		width: 100%;
		min-height: 41rem;
		background-color: white;
		z-index: 100;
	}
	
	.tips-box {
		z-index: 200;
	}
	
	.tips-box .tip-item {
		display: block;
		width: 100%;
		height: 30px;
		margin-left: 10px;
		line-height: 10px;
		font-weight: 600;
	}
	
	.search-recommend .close-btn {
		position: absolute;
		bottom: 50px;
		left: 50%;
		color: rgb(46, 45, 45);
		font-weight: 600;
		transform: translateX(-50%);
	}
	
	.search-recommend .layer {
		width: 100%;
		position: relative;
	}
	
	.layer .title {
		margin: 5px 0;
		font-size: 20px;
		font-weight: 600;
		color: rgb(124, 124, 124);
	}
	
	.layer .change {
		position: absolute;
		right: 15px;
		top: 5px;
		color: rgb(143, 143, 147);
		font-size: 12px;
	}
	
	.layer .word-item {
		display: inline-block;
		height: 20px;
		background-color: rgba(34, 34, 34, 0.133);
		border-radius: 15px;
		line-height: 20px;
		font-size: 13px;
		text-align: center;
		padding: 5px 10px;
		margin: 5px;
		color: rgb(164, 164, 172);
	}
	
	.banner-container {
		width: 100%;
		height: 25%;
	}
	
	.banner-item {
		width: 100%;
		height: 100%;
	}
	
	.img {
		display: block;
		width: 100%;
		height: 100%;
	}
	
	.mb {
		width: 100%;
		height: calc(70% - 10px);
		padding-bottom: 40px;
		box-sizing: border-box;
	}
	
	.mb::after {
		display: block;
		content: '';
		height: 0;
		overflow: hidden;
		clear: both;
	}
	
	.mb div {
		width: 50%;
		height: 50%;
		float: left;
		border: 1px rgb(235, 235, 235) solid;
		box-sizing: border-box;
	}
	
	.mb div {
		display: block;
		margin-left: 50%;
		transform: translateX(-50%);
		text-align: center;
		color: rgb(46, 45, 45);
		margin-bottom: 10px;
	}
	
	.mb .icon {
		display: block;
		margin-top: 35%;
		font-size: 30px;
		color: rgb(77, 80, 79);
	}
</style>