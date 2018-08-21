import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import routes from './routes'
import VueRouter from 'vue-router'
import md5 from 'js-md5';
Vue.prototype.$md5 = md5
Vue.use(VueRouter)
const router = new VueRouter({
	routes
})
router.beforeEach((to, from, next) => {
	if(to.path == '/login') {
		sessionStorage.removeItem('user');
	}
	let user = JSON.parse(sessionStorage.getItem('user'));
	if(user) {
		if(user.type == 1) {
			router.options.routes[12].hidden = false
		} else {
			router.options.routes[12].hidden = true
		}
	}
	if(!user && to.path != '/login') {
		next({
			path: '/login'
		})
	} else {
		next()
	}
})
//设置全局域名
//Vue.prototype.base = 'http://192.168.1.152:8080'

//Vue.prototype.base = 'http://192.168.1.94:8080'
//Vue.prototype.base = 'http://221.229.214.168:8080'
//Vue.prototype.base = 'http://127.0.0.1:8080'
//Vue.prototype.base = 'http://www.jp.evdbus.com:8080'
//Vue.prototype.base = 'http://47.97.101.245:8080'
//Vue.prototype.base = 'http://www.yw.evdbus.com/'
//Vue.prototype.base = 'http://120.27.222.66:8080'
//Vue.prototype.base = 'http://10.11.100.19:8080'
//Vue.prototype.base = 'http://10.11.100.66:8080'
//Vue.prototype.base = 'http://47.98.104.165:8080'
//Vue.prototype.base = 'http://47.97.165.26:8080'
Vue.prototype.base = 'http://www.jp.zjylzn.com:8080'
//Vue.prototype.imgbase = '../yl/'
//elelment ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//vue amap
import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
	// 申请的高德key
	key: 'http://webapi.amap.com/maps?v=1.4.0&key=ba314aa9f9655647cda6daac0ba59cc2',
	// 插件集合
	plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],

});
// echart
//vue resource  
import VueResource from 'vue-resource'
Vue.use(VueResource)
//quill
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)

Vue.prototype.nowtimestamp = ''
Vue.prototype.appkey = '123abcd321'
//设置全局方法接口加密
Vue.prototype.tokenencryption = function (){
	this.nowtimestamp = String(Date.parse(new Date())/1000)
}

Vue.http.interceptors.push(function(request, next) {//拦截器
// 跨域携带cookie
   request.credentials = true;
next()
})

//去警告
Vue.config.productionTip = false
new Vue({
	router,
	render: h => h(App)
}).$mount('#app')