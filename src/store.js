import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		mulus: [],
		title: [],
		id: '',
		major: '',
		length: 0,
		hotword: '',
		loginStatus: false,
		item: {},
		myshouc: [],
		paih:''
	},
	mutations: {
		add(state, payload) {
			state.mulus = payload
		},
		addmajor(state, payload) {
			state.major = payload
		},
		addpaih(state, payload) {
			state.paih = payload
		},
		addlength(state, payload) {
			state.length = payload
		},
		addid(state, payload) {
			state.id = payload
		},
		addhotword(state, payload) {
			state.hotword = payload
		},
		addmyshouc(state, payload) {
			state.myshouc = payload
		},
		changeloginStatus(state, payload) {
			state.loginStatus = payload
		},
		changeitem(state, payload) {
			state.item = payload
		},
		addtitle(state, payload) {
			state.title = payload
		}
	},
	actions: {

	}
})