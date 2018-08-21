<template>
	<section class="full">
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters" size='small' style='margin-left: 10px;'>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="登录名" style='width: 240px;'></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="search">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table size='small' :data="users" highlight-current-row v-loading="listLoading" class='el-table-owner' height='85%' >
			<el-table-column prop="id" label="车架号" width="300" align='center'>
			</el-table-column>
			<el-table-column prop="uid" label="用户ID" width="300" align='center'>
			</el-table-column>
			</el-table-column>
			<el-table-column prop="status" label="是否被绑定" width="300" :formatter='st' align='center'>
			</el-table-column>
			<el-table-column prop="createTime" label="添加时间" min-width="150" align='center'>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next,jumper" @current-change="handleCurrentChange" :page-size="17" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false" width='800px'>
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm" style='margin-bottom: 100px;'>
				<el-form-item label="终端" prop="tid">
					<el-input v-model="addForm.tid" auto-complete="off" style='width: 65%;'></el-input>
				</el-form-item>
				<el-form-item label="车架号" prop="id">
					<el-input v-model="addForm.id" style='width: 65%;'></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [], //列表选中列
				editFormVisible: false, //编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}]
				},

				addFormVisible: false, //新增界面是否显示
				addLoading: false,
				addFormRules: {
					tid: [{
						required: true,
						message: '请输入终端号',
						trigger: 'blur'
					}],
					id: [{
						required: true,
						message: '请输入车架号',
						trigger: 'blur'
					}]
				},
				//新增界面数据
				addForm: {
					tid: '',
					id: ''
				}

			}
		},
		methods: {
			
			//是否绑定
			st(row, column) {
				let sts = row.status;
				switch(sts) {
					case 1:
						return "是";
						break;
					case 0:
						return "否";
						break;
				}
			},
			//过滤器
			myfilter(value) {
				if(value.indexOf(this.filters.name) > -1) {
					return value
				}
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取设备列表
			getUsers() {
				var user = sessionStorage.getItem('user');
				if(user) {
					user = JSON.parse(user);
					this.tokenencryption()
					this.$http.post(this.base+"/yw/car/selectCarList", JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							aid: user.id,
							page: this.page,
							rows: 17
					}), {emulateJSON: true}).then(res => {
						let {
							data,
							info,
							type
						} = res.body;
						if(type !== "0") {
							
						} else {
							this.users = data.data
							this.total = data.total
						}
					})
				}
			},
			//搜索数据
			search() {
				if(this.filters.name) {
					this.tokenencryption()
					this.$http.post(this.base+"/yw/car/selectCar",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							id: this.filters.name
					}), {emulateJSON: true}).then(res => {
						if(res.body.info = '查询成功') {
							this.users = []
							this.users.push(res.body.data) 
						} else {
							this.users = []
						}
					})
				} else {
					this.getUsers()
				}
			},
			//显示新增界面
			handleAdd: function() {
				this.addFormVisible = true;
				this.addForm = {
					id: '',
					tid: ''
				};
			},
			//新增
			addSubmit: function() {
				this.$refs.addForm.validate((valid) => {
					if(valid) {
						this.tokenencryption()
						this.$http.post(this.base+'/yw/device/selectDevice',JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							tid: this.addForm.tid,
					}), {emulateJSON: true}).then(res=>{
						if(res.body.type == 0 && res.body.data.status==0){
							//终端已录入 未绑定
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							var user1 = sessionStorage.getItem('user');
							this.addLoading = true;
							this.tokenencryption()
							this.$http.post(this.base+'/yw/car/insertNewCar',JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							id: this.addForm.id,
							tid: this.addForm.tid,
							status:'0'
					}), {emulateJSON: true}).then(res => {
								this.addLoading = false;
								let {
									data,
									info,
									type
								} = res.body;
								if(type == '0') {
									this.$message({
										type: 'success',
										message: "添加成功",
									});
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
									this.getUsers();
								} else {
									this.$message({
										type: 'warning',
										message: "添加失败",
									});
								}
							});
						});	
						}else if(res.body.type == 0 && res.body.data.status==1){
							//终端已录入 已绑定
							this.$message({
								type: "warning",
								message: "终端已被车辆绑定"
							});
						}else if(res.body.type != 0) {
							this.$message({
								type: "warning",
								message: "终端未录入"
							});
						}
					})
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						
						

					} else {
						return false
					}
				})
			},
		},
		mounted() {
			this.getUsers();
		}
	}
</script>
<style scoped>

</style>