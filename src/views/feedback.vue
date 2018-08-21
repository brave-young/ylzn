<template>
	<section style="height: 100%;">
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" size='small' style='margin-left: 5px;'>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="用户名" style='width: 240px;'></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="searchFeeds">查询</el-button>
				</el-form-item>
				<el-dropdown trigger="click">
					<el-button type="primary" size='small'>显示类型<i class="el-icon-arrow-down el-icon--right"></i></el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native='untreated'>未处理</el-dropdown-item>
						<el-dropdown-item @click.native='alreadyview'>已查看</el-dropdown-item>
						<el-dropdown-item @click.native='alreadyprocessed'>已回复</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-form>

		</el-col>

		<!--列表-->
		<el-table size='small' :data="users" highlight-current-row v-loading="listLoading" class='el-table-owner'>
			<el-table-column prop="status" label="状态" width="200" align='center'>
				<template slot-scope="scope">
					<el-tag :type="scope.row.status == '0' ? 'danger' : (scope.row.status == '2' ? 'success':'warning')" v-text="scope.row.status == '0' ? '未处理' : (scope.row.status == '2' ? '已回复':'已查看')"></el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="user.phone" label="用户" width="300" align='center'>
			</el-table-column>
			<el-table-column prop="submitinfo" label="内容" min-width="400" align='center' :formatter='sub'>
			</el-table-column>
			<el-table-column prop="createdate" label="时间" width="200" align='center'>
			</el-table-column>
			<el-table-column label="操作" width="250" align='center'>
				<template scope="scope">
					<el-button size="small" @click="seefeedback(scope.$index, scope.row)" icon="el-icon-edit">回复</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :title=this.title :visible.sync="feedconvisible" :close-on-click-modal="false" width='800px' @close='closeDialog'>
			<!--内容-->
			<div style="color: #5a5e66;font-weight: bold;font-size: 14px;">内容:</div>
			<p style="margin-left: 40px;margin-top: 10px;width: 500px;color: #333;font-size: 10px;">{{this.subcon}}</p>
			<!--图片-->
			<div style="color: #5a5e66;font-weight: bold;">图片:</div>
			<!--图片容器-->
			<div style="width: 100%;height: 120px;margin-left: 50px;margin-top: 5px;">
				<img style="width: 80px;box-shadow: 5px 5px 2px #888888;" v-bind:src="imgurl1" @click="viewbig($event)"/>
				<img style="width: 80px;box-shadow: 5px 5px 2px #888888;" v-bind:src="imgurl2"  @click="viewbig($event)"/>
				<img style="width: 80px;box-shadow: 5px 5px 2px #888888;" v-bind:src="imgurl3"  @click="viewbig($event)"/>
			</div>
			<div style='margin-top: 10px;color: #5a5e66;font-weight: bold;'>回复:</div>
			<textarea name="" rows="" cols="" style="width: 600px;height: 120px;margin-left: 40px;margin-top:10px; text-indent: 2em;color: #5a5e66;border-radius: 5px;box-shadow: 5px 5px 2px #888888;" v-model="backmessage"></textarea>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click='submitreply'>发送回复</el-button>
				<el-button @click.native="feedconvisible = false">取消</el-button>
			</div>
		</el-dialog>
		<el-dialog top=2vh :visible.sync="bigimgvisible" :close-on-click-modal="false" width='420px' style='padding: 0;'>
			<!--内容-->
			<div style="height: 620px;">
				<img style="width:350px;display: block;margin: 0 auto;" v-bind:src='bigimg'/>
			</div>
			
		</el-dialog>
		<!--工具条-->
		<el-col :span="24" class="toolbar" v-show='v1'>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange1" :page-size="pagesize1" :total="total1" :current-page.sync='pagenow1' style="float:right;">
			</el-pagination>
		</el-col>
		<el-col :span="24" class="toolbar" v-show='v2'>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange2" :page-size="pagesize2" :total="total2" :current-page.sync='pagenow2' style="float:right;">
			</el-pagination>
		</el-col>
		<el-col :span="24" class="toolbar" v-show='v3'>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange3" :page-size="pagesize3" :total="total3" :current-page.sync='pagenow3' style="float:right;">
			</el-pagination>
		</el-col>
		<el-col :span="24" class="toolbar" v-show='v4'>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange4" :page-size="pagesize4" :total="total4" :current-page.sync='pagenow4' style="float:right;">
			</el-pagination>
		</el-col>
		<el-col :span="24" class="toolbar" v-show='v5'>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange5" :page-size="pagesize5" :total="total5" :current-page.sync='pagenow5' style="float:right;">
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
				users: [],
				//初始页面分页
				total1: 0,
				page1: 1,
				pagenow1: 1,
				pagesize1: 2,
				//搜索分页
				total2: 0,
				page2: 1,
				pagenow2: 1,
				pagesize2: 2,
				//未处理
				total3: 0,
				page3: 1,
				pagenow3: 1,
				pagesize3: 2,
				//已查看
				total4: 0,
				page4: 1,
				pagenow4: 1,
				pagesize4: 2,
				//已回复
				total5: 0,
				page5: 1,
				pagenow5: 1,
				pagesize5: 2,
				//
				listLoading: false,
				sels: [], //列表选中列
				//回复弹框
				feedconvisible: false,
				//回复
				backmessage: '',
				//反馈详情
				title: '用户名:',
				imgurl: '',
				imgurl1: '',
				imgurl2: '',
				imgurl3: '',
				replycon: '',
				subcon: '',
				reindex: '',
				v1: true,
				v2: false,
				v3: false,
				v4: false,
				v5: false,
				bigimg:'',
				bigimgvisible:false
			}
		},
		methods: {
			//过滤长文本
			sub(row, colum) {
				let sss = row.submitinfo;
				if(sss.length > 15) {
					sss = sss.substring(0, 15)
					return sss + '......'
				} else {
					return sss
				}
			},
			//点击回复
			seefeedback(index, row) {
				this.feedconvisible = true;
				this.tokenencryption()
				if(this.users[index].status == 0) {
					this.$http.post(this.base + "/yw/suggest/replyInfo",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							status: 1,
							replyinfo: '',
							id: this.users[index].id
					}), {emulateJSON: true}).then(res => {})
				}
				this.reindex = index
				this.title = "用户名 : " + this.users[index].user.phone
				this.subcon = this.users[index].submitinfo
				this.backmessage = this.users[index].replyinfo
				this.imgurl = this.users[index].pictureurl.split(',')
				this.imgurl1 = this.imgurl[0]
				this.imgurl2 = this.imgurl[1]
				this.imgurl3 = this.imgurl[2]
			},
			//提交回复
			submitreply() {
				if(this.users[this.reindex].status === 2) {
					this.$message({
						type: 'warning',
						message: '请勿重复回复',
					});

				} else {	
					this.$confirm('确定提交?', '提示', {
						type: 'warning'
					}).then(() => {
						this.tokenencryption()
						this.$http.post(this.base + "/yw/suggest/replyInfo",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							status: 2,
								replyinfo: this.backmessage,
								id: this.users[this.reindex].id
					}), {emulateJSON: true}).then(res => {
							this.$message({
								type: 'success',
								message: '提交成功',
							});
						})
					}).catch(() => {

					});
						
				}

			},
			handleCurrentChange1(val) {
				this.page1 = val;
				this.getFeeds();
			},
			handleCurrentChange2(val) {
				this.page2 = val;
				this.searchFeeds();
			},
			handleCurrentChange3(val) {
				this.page3 = val;
				this.untreated();
			},
			handleCurrentChange4(val) {
				this.page4 = val;
				this.alreadyview();
			},
			handleCurrentChange5(val) {
				this.page5 = val;
				this.alreadyprocessed();
			},
			//获取反馈列表
			getFeeds() {
				this.v1 = true
				this.v2 = false
				this.v3 = false
				this.v4 = false
				this.v5 = false
				this.listLoading = true;
				this.tokenencryption()
				this.$http.post(this.base + "/yw/suggest/qureyAll",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							page: this.page1,
						rows: 13
					}), {emulateJSON: true}).then(res => {
					if(res.body.type == 0) {
						this.pagesize1 = 13
						this.users = res.body.data.data
						this.total1 = res.body.data.total
					} else {
						this.users = []
						this.total1 = 0
						this.$message({
								message: '暂无数据',
								type: 'warning'
							});
					}
				})

				this.listLoading = false;
			},
			//查询用户意见
			searchFeeds() {
				if(this.filters.name) {
					this.v2 = true
					this.v1 = false
					this.v3 = false
					this.v4 = false
					this.v5 = false
					this.tokenencryption()
					this.$http.post(this.base + "/yw/suggest/selectByPhone",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							phone: this.filters.name,
							page: this.page2,
							rows: 13
					}), {emulateJSON: true}).then(res => {
						if(res.body.type == 0) {
							this.pagesize2 = 13
							this.users = res.body.data.data
							this.total2 = res.body.data.total
						} else {
							this.users = []
							this.total2 = 0
						}
					})
				} else {
					this.$router.push('/jump');
				}
			},
			//未处理
			untreated() {
				this.v3 = true
				this.v1 = false
				this.v2 = false
				this.v4 = false
				this.v5 = false
				this.tokenencryption()
				this.$http.post(this.base + "/yw/suggest/qureyAllByStatus",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							status: 0,
							page: this.page3,
							rows: 13
					}), {emulateJSON: true}).then(res => {
					if(res.body.type == 0) {
						this.pagesize3 = 13
						this.users = res.body.data.data
						this.total3 = res.body.data.total
					} else {
						this.users = []
						this.total3 = 0
					}
				})
			},
			//已查看
			alreadyview() {
				this.v4 = true
				this.v1 = false
				this.v3 = false
				this.v2 = false
				this.v5 = false
				this.tokenencryption()
				this.$http.post(this.base + "/yw/suggest/qureyAllByStatus",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							status: 1,
						page: this.page4,
						rows: 13
					}), {emulateJSON: true}).then(res => {
					if(res.body.type == 0) {
						this.pagesize4 = 13
						this.users = res.body.data.data
						this.total4 = res.body.data.total
					} else {
						this.users = []
						this.total4 = 0
					}
				})
			},
			//已回复
			alreadyprocessed() {
				this.v5 = true
				this.v1 = false
				this.v3 = false
				this.v4 = false
				this.v2 = false
				this.tokenencryption()
				this.$http.post(this.base + "/yw/suggest/qureyAllByStatus",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							status: 2,
						page: this.page5,
						rows: 13
					}), {emulateJSON: true}).then(res => {
					if(res.body.type == 0) {
						this.pagesize5 = 13
						this.users = res.body.data.data
						this.total5 = res.body.data.total
					} else {
						this.users = []
						this.total5 = 0
					}
				})
			},

			//对话框关闭
			closeDialog() {
				//				this.backmessage = ''
				this.getFeeds();
				this.reindex = ''
			},
			//删除
			handleDel: function(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {

				}).catch(() => {

				});
			},
			//显示大图
			viewbig(e){
				this.bigimgvisible=true
				this.bigimg=e.currentTarget.src
			}
		},
		mounted() {
			this.getFeeds();
		}
	}
</script>

<style scoped>

</style>