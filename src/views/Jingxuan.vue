<template>
	<div class="jingxuan">
		<h1>This is an jingxuan page</h1>
	</div>
</template>

<script>
	const url = '/api/recommendPage/nodes/5910018c8094b1e228e5868f'
	export default {
		name: 'jingxuan',
		created() {
			this.axios.get(url).then(response => {
				let data = response.data.data
				console.log('data', data)
				data = Array.from(data).sort((a, b) => {
					return a.order - b.order;
				});
				let sexOrder = this.sex === 'male' ? [2, 5, 7, 9] : [1, 4, 6, 8];
				data = data.filter((obj) => {
					return sexOrder.includes(obj.order) && obj.type === 0;
				});
				console.log('data', Array.from(data, value => value._id))
			}, err => {
				alert('response.data', err)
			})
		},
		data() {
			return {

			};
		},

	}
</script>

<style>

</style>