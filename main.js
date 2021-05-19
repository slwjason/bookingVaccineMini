import Vue from 'vue'
import App from './App'
import { myRequest } from 'static/util/api.js'
//分享
import share from '@/static/js/share.js'
Vue.mixin(share)
Vue.config.productionTip = false
Vue.prototype.$myRuquest = myRequest
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
