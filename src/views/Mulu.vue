<template>
	<div class="mulu">
		<!-- 目录顶部 -->
		<Bar :title="{title:'优质书源'}"></Bar>
		<div class="mulu-top">
			<div class="mulu-topl">
				<h3 class="mulu-title">目录 </h3>
				<span class="mulu-desc">共{{mulus.length}}章</span>
				<!-- <span class="chapterBtn" v-on:click="reverseChapter()" v-text="isReverse?'正序':'倒序'">倒序</span> -->
				<span class="mulu-btn" id="J_reverseChapterBtn" @click='list' :v-text="isReverse?'正序':'倒序'">倒序</span>
			</div>
		</div>
		<!-- 目录 -->
		<div class="mulu-body">
			<div v-if='!isReverse'>
				<div class="mulu-bbox" v-for='mulu in mulus'>
					<div class="mulu-this">
						<span @click="toReader(mulu.order)" data-bookid="mulu.id">{{mulu.order}} {{mulu.title}}</span>
						<van-icon class="lock" v-show='mulu.isVip' name="vip-card-o" size='2rem' />
					</div>
				</div>
			</div>
			<div v-else>
				<div class="mulu-bbox" v-for='mulu in isrmulus' :key="mulu.order" @click="toReader(mulu.order)">
					<div class="mulu-this">
						<span data-bookid="mulu.id">{{mulu.order}} {{mulu.title}}</span>
						<van-icon class="lock" v-show='mulu.isVip' name="vip-card-o" size='2rem' />
					</div>
				</div>
			</div>

		</div>
		<!-- <div v-for='items in fenlei':key='items.key'>
        <h4 class="title" >{{items.title}}</h4>
        <van-row>reverseSum()
            <van-col span="8" v-for='key in items.data':key='key.name' >
              <div class="auto" @click="tozhifenlei(key.name)">
                <div class="name">{{key.name}}</div>
                <div class="naber">{{key.bookCount}}</div>
            </div></van-col>
        </van-row>
        
    </div> -->

	</div>
</template>

<script>
	import { Row, Col, Icon } from 'vant';
	import Bar from "../components/Bar.vue"
	let that = this
	export default {
		name: 'mulu',

		data() {
			return {
				tabs: [{
						title: '男生',
						key: 'male'
					},
					{
						title: '女生',
						key: 'female'
					},
					{
						title: '漫画',
						key: 'picture'
					},
					{
						title: '出版',
						key: 'press'
					}
				],
				mulus: [],
				id: '',
				isReverse: false,
				isrmulus: [],
				zjian: [],
				length: 0
			};
		},
		created() {
			this.id = this.$route.params.id;
			if(this.id) {
				const url = '/api/toc/' + this.id + '?view=chapters'
				console.log('that.pinglunurls', url)
				this.axios.get(url).then(response => {
					this.mulus = response.data.chapters
					this.length = this.mulus.length
					this.$store.commit('addlength', response.data.length)
					this.$store.commit('add', response.data.chapters)
				}, err => {
					alert('response.data', err)
				})
			}
			// https://api.zhuishushenqi.com/toc/577b477dbd86a4bd3f8bf1b2?view=chapters

			this.mulus = this.$store.state.mulus
			this.length = this.$store.state.length
		},
		components: {

			[Row.name]: Row,
			[Icon.name]: Icon,
			[Col.name]: Col,
			Bar

		},

		computed: {

		},
		methods: {
			list() {

				let j = 0
				for(var i = this.mulus.length - 1; i >= 0; i--) {
					this.zjian[j] = this.mulus[i]
					j++;
				}
				this.isrmulus = this.zjian
				this.isReverse = !this.isReverse
				console.log(111)
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
		}
	}
</script>

<style>
	.mulus {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow-y: auto;
		font-size: 12px;
		background: #ebebeb;
		padding-bottom: 5rem;
	}
	
	.mulu-top {
		padding: .8rem 1.2rem;
		font-size: 16px;
		border-bottom: 1px solid #f8f8f8;
	}
	
	.mulu-topl {
		display: inline;
	}
	
	.mulu-title {
		font-size: 14px;
		display: inline;
		font-weight: bold;
	}
	
	.mulu-desc {
		color: #999;
		font-size: 12px;
		font-weight: 400;
	}
	
	.mulu-btn {
		float: right;
		font-size: 14px;
	}
	
	.mulu-body {
		display: block;
		overflow: hidden;
	}
	
	.mulu-bbox {
		position: relative;
		height: 2.7rem;
		line-height: 2.7rem;
		border-bottom: 1px solid #f8f8f8;
		margin-left: 1.2rem;
	}
	
	.mulu-this {
		display: inline-block;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #999;
	}
	
	.mulu-this span {
		display: inline;
		font-size: 13px;
	}
	
	.lock {
		position: absolute;
		top: 0.4rem;
		right: 1.6rem;
		width: 1rem;
		height: 2.8em;
		background-size: 1rem;
	}
</style>