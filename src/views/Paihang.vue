<template>
	<div class="paihang">
		<Bar :title="{title}"></Bar>
		<div class='major'>
			<div v-for="(item,index) in rankList">
				<div class='major-name'>{{item.title}}</div>
				<div class='rank-list'>
					<div class='rank-item' v-for="itemName in item.data" @click='topaihmore(itemName._id)'>
						<img class='rank-item-img' :src="'http://statics.zhuishushenqi.com'+itemName.cover"></img>
						<div class='rank-item-title'>{{itemName.title}}</div>
					</div>

				</div>
				<van-collapse v-model="activeNames" accordion>
					<van-collapse-item title="别人家的排行榜" name="index+1">
						<div class='rank-item' v-for="itemName in item.that" @click='topaihmore(itemName._id)'>
							<img class='rank-item-img ph-hide' :src="'http://statics.zhuishushenqi.com'+itemName.cover"></img>
							<div class='rank-item-title'>{{itemName.title}}</div>
						</div>
					</van-collapse-item>

				</van-collapse>
			</div>
		</div>
	</div>

</template>

<script>
	import { Collapse, CollapseItem } from 'vant';
	import Bar from "../components/Bar.vue"
	export default {
		name: 'paihang',
		created() {
			const url = '/api/ranking/gender'

			this.axios.get(url).then(response => {
				for(var key in response.data) {
					this.major.map(a => {
						if(a.key == key) {
							a['data'] = response.data[key].splice(0, 7);
							a['that'] = response.data[key]

						}
					})
				}
				this.rankList = this.major
				console.log('this.myshouc', this.rankList)

			}, err => {
				alert('response.data', err)
			})

		},
		data() {
			return {
				major: [{
						title: '男生',
						key: 'male'
					},
					{
						title: '女生',
						key: 'female'
					},

				],
				rankList: [],
				activeNames: ['2'],
				title: '排行榜'
			};
		},
		components: {
			[Collapse.name]: Collapse,
			[CollapseItem.name]: CollapseItem,
			Bar
		},
		methods: {

			topaihmore(paihid) {
				console.log('paihid', paihid)
				this.$store.commit('addpaih', paihid)
				this.$router.push({
					path: "/paihmore",
					name: "paihmore",
					params: {
						paihid: paihid
					}
				});
			},

		}
	}
</script>

<style>
	.major {
		padding-bottom: 4rem;
	}
	
	.major .major-name {
		width: 100%;
		height: 40px;
		background-color: rgb(230, 230, 230);
		line-height: 40px;
		padding-left: 10px;
		box-sizing: border-box;
		color: rgb(84, 85, 85);
	}
	
	.major .rank-item {
		width: 100%;
		height: 30px;
		display: flex;
		margin: 10px 0;
	}
	
	.rank-item-img {
		display: block;
		flex: 0 0 30px;
		height: 100%;
		width: 30px;
		margin-left: 10px;
	}
	
	.ph-hide {
		opacity: 0;
	}
	
	.rank-item-title {
		flex: 1;
		height: 100%;
		margin-left: 10px;
		line-height: 30px;
		color: #000;
	}
</style>