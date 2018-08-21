
let routes = [
	//登录
	{
		path: '/login',
		component: resolve=>require(['./views/Login.vue'],resolve),
		name: 'Login',
	},
	//404
	{
		path: '/404',
		component: resolve=>require(['./views/404.vue'],resolve),
		name: 'NotFound',
	},
	//首页
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		children: [{
			path: '/main',
			component: resolve=>require(['./views/Main.vue'],resolve),
			name: '亿为科技'
		}]
	},
	//用户列表
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		iconCls: 'el-icon-date',
		leaf: true, //只有一个节点
		children: [{
			path: '/user',
			component: resolve=>require(['./views/user.vue'],resolve),
			name: '用户列表'
		}]
	},
	//设备授权列表
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		iconCls: 'el-icon-date',
		leaf: true, //只有一个节点
		children: [{
			path: '/authorization',
			component: resolve=>require(['./views/authorization.vue'],resolve),
			name: '车辆列表'
		}]
	},
	//透传数据查询
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		iconCls: 'el-icon-date',
		hidden:true,
		leaf: true, //只有一个节点
		children: [{
			path: '/page6',
			component: resolve=>require(['./views/Page6.vue'],resolve),
			name: '透传模块'
		}]
	},
	//gps记录查询
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		iconCls: 'el-icon-date',
		hidden:true,
		leaf: true, //只有一个节点
		children: [{
			path: '/gpsService',
			component: resolve=>require(['./views/gpsService.vue'],resolve),
			name: '定位服务'
		}]
	},
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		iconCls: 'el-icon-date',
		leaf: true, //只有一个节点
		children: [{
			path: '/feedback',
			component: resolve=>require(['./views/feedback.vue'],resolve),
			name: '意见反馈'
		}]
	},
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		iconCls: 'el-icon-date',
		leaf: true, //只有一个节点
		children: [{
			path: '/serviceedit',
			component: resolve=>require(['./views/serviceedit.vue'],resolve),
			name: '服务说明'
		}]
	},
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		hidden:true,
		leaf: true, //只有一个节点
		children: [{
			path: '/jump',
			component: resolve=>require(['./views/jump.vue'],resolve),
			name: ''
		}]
	},
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		hidden:true,
		leaf: true, //只有一个节点
		children: [{
			path: '/carList',
			component: resolve=>require(['./views/carList.vue'],resolve),
			name: 'echart'
		}]
	},
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		leaf: true, //只有一个节点
		iconCls: 'el-icon-date',
		children: [{
			path: '/push',
			component: resolve=>require(['./views/push.vue'],resolve),
			name: '消息推送'
		}]
	},
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		leaf: true, //只有一个节点
		hidden:true,
		iconCls: 'el-icon-date',
		children: [{
			path: '/setting',
			component: resolve=>require(['./views/rootsetting.vue'],resolve),
			name: '高级设置'
		}]
	},
	
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		leaf: true, //只有一个节点
		hidden:true,
		children: [{
			path: '/update',
			component: resolve=>require(['./views/update.vue'],resolve),
			name: '远程升级'
		}]
	},
	{
		path: '/',
		component: resolve=>require(['./views/Home.vue'],resolve),
		name: '',
		leaf: true, //只有一个节点
		iconCls: 'el-icon-date',
		children: [{
			path: '/terminal',
			component: resolve=>require(['./views/terminal.vue'],resolve),
			name: '终端模块'
		}]
	},
	{
		path: '*',
		hidden: true,
		redirect: {
			path: '/404'
		}
	}
];

export default routes;