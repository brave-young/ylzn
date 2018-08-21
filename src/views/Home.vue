<template>
	<section class="full">
		<el-row class="container">
			<el-col :span="24" class="header">
				<el-col :span="4" class="logo logo-width">
					<!--<a id="logolink" href="#/main">{{sysUserName}}</a>-->
					<a id="logolink" href="#/main">应领智能</a>
				</el-col>
				<el-col :span='16' class='tables'>
					<!--导航菜单-->
					<el-menu :default-active="$route.path" class="el-menu-vertical-demo" router mode="horizontal">
						<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
							<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
						</template>
					</el-menu>
				</el-col>
				<el-col :span="2" class="userinfo">
					<el-dropdown trigger="click">
						<span class="el-dropdown-link userinfo-inner"><img style="width: 70px;" src="../../static/logo1.png"/></span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
			</el-col>
			<el-col :span="24" class="main">
				<section class="content-container">
						<el-col :span="24" class="content-wrapper">
							<transition name="fade" mode="out-in">
								<router-view></router-view>
							</transition>
						</el-col>
				</section>
			</el-col>
		</el-row>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			handleselect: function(a, b) {},
			itemchecked: function(e) {
				e.target.style.backgroundColor = 'red'
			},
			//退出登录
			logout: function() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			collapse: function() {
				this.collapsed = !this.collapsed;
			},
		},
		mounted() {
			//获取本地存储user
			var user = sessionStorage.getItem('user');
			if(user) {
				user = JSON.parse(user);
				//				console.log(user.corporationname)
				this.sysUserName = user.corporationname || '';
				//				this.sysUserAvatar = user.avatar || '';
			}
		}
	}
</script>

<style lang='scss' scoped>
	#logolink {
		font-size: 25px;
		font-weight: bolder;
		color: #fff;
	}
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		height: 100%;
		min-width: 1350px;
		overflow-x: hidden;
		.header {
			border-bottom: 1px solid #f6f6f6;
			height: 61px;
			line-height: 60px;
			background: #fff;
			color: #fff;
			.userinfo {
				text-align: right;
				padding-right: 15px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color: #fff;
					img {
						border: 2px solid #999;
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.tables{
				padding-left: 3%;
			}
			.logo {
				height: 60px;
				font-size: 22px;
				padding-left: 20px;
				padding-right: 20px;
				background: #367fa9;
				text-align: center;
				.txt {
					color: #fff;
				}
			}
			.logo-width {
				width: 240px;
			}
			.logo-collapse-width {
				display: none;
			}
			.tools {
				padding: 0px 23px;
				width: 14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			position: absolute;
			top: 60px;
			bottom: 0px;
			margin-top: 6px;
			overflow: hidden;	
				.content-container {
				
				flex: 1;
				overflow-y: scroll;
				padding-left: 0px;
				padding-top: 0px;
				.breadcrumb-container {
					.title {
						width: 200px;
						float: left;
						color: #333;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					box-sizing: border-box;
					height: 100%;
				}
			}
		}
	}
	
	.el-menu-item {	
		color: #000;
		font-weight: bold;
		padding: 0 12px;
	}
</style>