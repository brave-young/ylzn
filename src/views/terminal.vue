<template>
	<section class="full">
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="filters" size='small' style='margin-left: 10px;'>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="录入终端" style='width: 400px;'></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table height='82%' size='small' :data="terminals" highlight-current-row v-loading="listLoading" class='el-table-owner'>
			<el-table-column prop="tid" label="终端ID" width="400" align='center'>
			</el-table-column>
			<el-table-column prop="cid" label="车架号" min-width="300" align='center'>
			</el-table-column>
			</el-table-column>
			<el-table-column prop="status" label="是否被绑定" width="300" :formatter='st' align='center'>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="17" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				total: 0,
				page: 1,
				listLoading: false,
				terminals: [],

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
			handleCurrentChange(val) {
				this.page = val;
				this.getterminals();
			},
			//获取终端列表
			getterminals() {
				this.tokenencryption()
				this.$http.post(this.base + "/yw/device/selectAllDevice", JSON.stringify({
					encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
					timeStamp: this.nowtimestamp,
					sourceForm: '2',
					page: this.page,
					rows: 17
				}), {
					emulateJSON: true
				}).then(res => {
					if(res.body.type == 0) {
						this.terminals = res.body.data.data
						this.total = res.body.data.total
					} else {
						this.$message({
							type: 'warning',
							message: "查询失败",
						});
					}
				})

			},
			p(s) {
				return s < 10 ? '0' + s : s;
			},
			//终端录入
			handleAdd: function() {
				if(this.filters.name) {
					this.tokenencryption()
					this.$http.post(this.base + '/yw/device/selectDevice', JSON.stringify({
						encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
						timeStamp: this.nowtimestamp,
						sourceForm: '2',
						tid: this.filters.name,
					}), {
						emulateJSON: true
					}).then(res => {
						if(res.body.type != 0) {
							this.$confirm('确认提交吗？', '提示', {}).then(() => {

								var myDate = new Date();
								//获取当前年
								var year = myDate.getFullYear();
								//获取当前月
								var month = myDate.getMonth() + 1;
								//获取当前日
								var date = myDate.getDate();
								var h = myDate.getHours(); //获取当前小时数(0-23)
								var m = myDate.getMinutes(); //获取当前分钟数(0-59)
								var s = myDate.getSeconds();
								var now = year + '-' + this.p(month) + "-" + this.p(date) + " " + this.p(h) + ':' + this.p(m) + ":" + this.p(s);

								this.$http.post(this.base + '/yw/device/insertDevice', JSON.stringify({
									encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
									timeStamp: this.nowtimestamp,
									sourceForm: '2',
									tid: this.filters.name,
									source: '1',
									status: '0',
									createTime:String(now)
								}), {
									emulateJSON: true
								}).then(res => {
									if(res.body.type == 0) {
										this.$message({
											type: 'success',
											message: "录入成功",
										});
									}
									this.getterminals();
								})
							})

						} else if(res.body.type == 0) {
							this.$message({
								type: 'warning',
								message: "终端已存在",
							});
						}
					})

				} else {
					this.$message({
						type: 'warning',
						message: "请输入终端ID",
					});
				}
			},
		},
		mounted() {
			this.getterminals();
		}
	}
</script>
<style scoped>

</style>