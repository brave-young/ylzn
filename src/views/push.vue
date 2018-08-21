<template>
	<el-row  style="height: 100%;">
		<el-col :span="24" class="toolbar" style="padding-bottom: 20px;">
		</el-col>
		<el-row style="height: 100%;">
			<el-col :span="10">
				<p style="padding-left: 20px;font-size: 20px;font-weight: bold;">消息推送</p>
				<el-form :model="pushlist" label-width="80px" ref="seeForm" style='margin-top: 80px;margin-left: 30px;font-weight:bold;'>
					<el-form-item label="推送对象:">
						<el-autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请选择推送对象" @select="handleSelect"></el-autocomplete>
					</el-form-item>
					<el-form-item label="主题:">
						<el-input v-model="pushlist.infocode" auto-complete="off" style='width: 80%;'></el-input>
					</el-form-item>
					<el-form-item label="推送内容:">
						<el-input type="textarea" v-model="pushlist.detail" style='width: 80%' :autosize="{ minRows: 8}"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" @click='pushbutton' style='margin-left: 75%;margin-top: 19px;'>发送</el-button>
			</el-col>
			<el-col :span="13" style="height: 85%;">
				<el-table size='small' :data="queryall" highlight-current-row  style="font-size: 12px;line-height: 12px;height: 100%;">
					<el-table-column prop="phone" label="用户" width="110" align='center'>
					</el-table-column>
					<el-table-column prop="title" label="主题" width="180" align='center'>
					</el-table-column>
					<el-table-column prop="time" label="时间" min-width="180" align='center'>
					</el-table-column>
					<el-table-column label="操作" width="200" align='center'>
						<template scope="scope">
							<el-button size="mini" @click="pushdetail(scope.$index, scope.row)">查看</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
			</el-col>
		</el-row>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				queryall:[],
				pushlist: {
					infocode:'',
					detail:''
				},
				
				restaurants: [],
				state4: '',
				timeout: null,
				users: [],
				pushphone: '',
				uids: {},
				page:1,
				total:0,
			}
		},

		methods: {
			//获取历史推送
			getpush(){
				this.tokenencryption()
				this.$http.post(this.base + "/yw/push/queryAll",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							page: this.page,
							rows: 10
					}), {emulateJSON: true}).then(res => {
						if(res.body.type==0){
							this.queryall = res.body.data.data
							this.total = res.body.data.total
						}
					})
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getpush();
			},
			//查看详情
			pushdetail(index, row){
				this.pushlist.infocode = this.queryall[index].title
				this.pushlist.detail = this.queryall[index].content	
			},
			//获取用户列表手机号
			getUsers() {
				var user = sessionStorage.getItem('user');
				//				this.listLoading = true;
				if(user) {
					user = JSON.parse(user);
					this.tokenencryption()
					this.$http.post(this.base + "/yw/user/selectUserList",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							aid: user.id,
							page: 1,
							rows: 1111
					}), {emulateJSON: true}).then(res => {
						let {
							data,
							info,
							type
						} = res.body;
						if(type !== "0") {} else {
							for(var i = 0; i < res.body.data.data.length; i++) {
								this.users.push({
									"value": res.body.data.data[i].phone
								})
								this.uids[res.body.data.data[i].phone] = res.body.data.data[i].uid;
							}
							//							this.users.unshift({
							//								'value': 'ALL'
							//							})
						}
					})
				}
			},
			loadAll() {
				return this.users
			},
			querySearchAsync(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					cb(results);
				}, 0 * Math.random());
			},
			createStateFilter(queryString) {
				return(state) => {
					return(state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			handleSelect(item) {
				this.pushphone = item.value
			},
			pushbutton() {
				if(this.pushlist.detail && this.pushphone !== '') {
					this.$confirm('确定提交?', '提示', {
						type: 'warning'
					}).then(() => {
						if(this.pushphone !== 'ALL') {
							//个人推送
							this.tokenencryption()
							this.$http.post(this.base + "/yw/push/pushWithTag",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							tag: String(this.pushphone),
							title: String(this.pushlist.infocode),
							content: String(this.pushlist.detail),
							uid: String(this.uids[this.pushphone])
					}), {emulateJSON: true}).then(res => {
								if(res.body.type == 0) {
									this.$message({
										type: 'success',
										message: '提交成功',
									});
								} else {
									this.$message({
										type: 'warning',
										message: '提交失败',
									});
								}

							})
						} else {
							//全部推送
						}

					}).catch(() => {

					});
				} else {
					this.$message({
						type: 'warning',
						message: '请补全信息',
					});
				}
			}
		},

		mounted: function() {
			this.restaurants = this.loadAll();
			this.getUsers()
			this.getpush()
		},
		updated: function() {

		}
	}
</script>

<style scoped>

</style>