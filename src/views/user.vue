<template>
	<section class="full">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" size='small'>
				<el-form-item>
					<el-input v-model="filters.phone" placeholder="登录名" style='width: 240px;'></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table size='small' :data="users"  highlight-current-row v-loading="listLoading" class='el-table-owner' height='85%' >
			<el-table-column prop="name" label="用户名"  align='center'>
			</el-table-column>
			<el-table-column prop="phone" label="登录名"  align='center'>
			</el-table-column>
			<el-table-column prop="createTime" label="注册时间"  align='center'>
			</el-table-column>
			<el-table-column prop="phone" label="联系电话"  style='font-size: 10px;' align='center'>
			</el-table-column>
			<el-table-column prop="cid" label="车辆"  style='font-size: 10px;' align='center'>
			</el-table-column>
			<el-table-column label="操作"  align='center'>
				<template scope="scope">
					<el-button size="mini" @click="handleSee(scope.$index, scope.row)">用户信息</el-button>
					<el-button size="mini" @click="handlecarlist(scope.$index, scope.row)">设备信息</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="11" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
		<!--查看界面-->
		<el-dialog title="用户信息" :visible.sync="seeFormVisible" :close-on-click-modal="false" width='800px'>
			<el-form :model="seeForm" label-width="80px" ref="seeForm">
				<el-form-item label="用户名">
					<el-input v-model="seeForm.name" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="seeForm.phone" auto-complete="off" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="seeForm.userInfo.sex" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input v-model="seeForm.userInfo.age" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="创建日期">
					<el-input v-model="seeForm.createTime" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="seeForm.userInfo.address" :disabled="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="seeFormVisible = false">取消</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import { AMapManager } from 'vue-amap';
	export default {
		data() {
			return {
				filters: {
					phone: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				seeFormVisible: false, //查看界面是否显示

				//查看界面数据
				seeForm: {
					name: '',
					phone: '',
					createTime: '',
					userInfo:{
						sex: '',
						age: '',
						address: '',
					}
				},
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				var user = sessionStorage.getItem('user');
				//				this.listLoading = true;
				if(user) {
					user = JSON.parse(user);
					this.tokenencryption()				
//					this.$http.jsonp(this.base + "/yw/user/selectUserList", {
//						params: {
//							aid: user.id,
//							page: this.page,
//							rows: 11
//						}
//					})	
					this.$http.post(this.base + "/yw/user/selectUserList", JSON.stringify({
							aid: user.id,
							page: this.page,
							rows: 11,
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),//加密后的字符串
							timeStamp: this.nowtimestamp,//时间戳
							sourceForm:'2'//请求来源 1 app 2 web
					}), {emulateJSON: true}).then(res => {
						let {
							data,
							info,
							type
						} = res.body;
						if(type !== "0") {} else {
							this.users = data.data;
							this.total = data.total;
							//this.listLoading = false;
						}
					})
				}
			},
			//查询数据库
			search() {
				if(this.filters.phone) {
					this.tokenencryption()
					this.$http.post(this.base + "/yw/user/selectUser", JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							phone: String(this.filters.phone)
					}), {emulateJSON: true}).then(res => {
						if(res.body.type == 0) {
							this.users = res.body.data
							//this.total = 1
						} else {
							this.users = []
							this.total = 0
						}

					})
				} else {
					this.getUsers()
				}
			},
			//显示查看界面
			handleSee: function(index, row) {
				this.seeFormVisible = true;
				//传入当前查看的用户信息表
				this.seeForm = this.users[index];
				if(this.seeForm.userInfo.sex == 0 || this.seeForm.userInfo.sex == '女') {
					this.seeForm.userInfo.sex = '女'
				} else {
					this.seeForm.userInfo.sex = '男'
				}
			},
			handlecarlist(index,row){
				sessionStorage.setItem('uid', this.users[index].id);
				sessionStorage.setItem('userphone', this.users[index].phone);
				this.$router.push('/carList');
			}
		},
		mounted() {
			this.getUsers();
		},
	}
</script>

<style scoped>
	.amap-wrapper {
		width: 98%;
		height: 390px;
		margin: 5px auto;
	}
	
	.fault {
		color: red;
	}
	
	.fault1 {
		color: red;
	}
	
	.offline {
		color: #969696;
	}
	
	.online {
		color: #409eff;
	}
</style>