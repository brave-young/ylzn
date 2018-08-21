<template>
	<section>
		<el-col :span="24" class="toolbar" style="padding: 5px;">
			<el-button size='small' type="primary" @click="settingadd()" style='float: right;'>新增</el-button>
			<el-button size='small' type="primary" @click="updatefun()" style='float: right;margin-right: 20px;'>远程升级</el-button>
		</el-col>
		<el-table size='small' :data="setlist" highlight-current-row v-loading="listLoading" class='el-table-owner'>
			<el-table-column prop="code" label="编码" width="210" align='center'>
			</el-table-column>
			<el-table-column prop="chs" label="CH" width="210" align='center'>
			</el-table-column>
			<el-table-column prop="en" label="EN" width="210" align='center'>
			</el-table-column>
			<el-table-column prop="detail" label="详情" min-width="300" align='center' :formatter='sub'>
			</el-table-column>
			<el-table-column prop="status" label="类型" width="200" align='center'>
				<template slot-scope="scope">
					<el-tag type='info' v-text="scope.row.status == '0' ? '不显示' :(scope.row.status == '1' ? 'Android' : (scope.row.status == '2' ? 'ios':'Android/ios'))"></el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="250" align='center'>
				<template scope="scope">
					<el-button size="small" @click="seesetlist(scope.$index, scope.row)" icon="el-icon-edit">设置</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :visible.sync="feedconvisible" :close-on-click-modal="false" width='800px' @close='closeDialog'>
			<el-form :model="setlistone" label-width="80px" ref="seeForm">
				<el-form-item label="编码">
					<el-input v-model="setlistone.code" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="CH">
					<el-input v-model="setlistone.chs" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="EN">
					<el-input v-model="setlistone.en"></el-input>
				</el-form-item>
				<el-form-item label="详情">
					<el-input type="textarea" v-model="setlistone.detail"></el-input>
				</el-form-item>
				<el-form-item label="操作类型">
					<el-radio-group v-model="setlistone.type">
						<el-radio label="成功" value=1></el-radio>
						<el-radio label="失败" value=0></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="显示设备">
					<el-radio-group v-model="setlistone.status">
						<el-radio label="不显示" value = 0></el-radio>
						<el-radio label="Android" value = 1></el-radio>
						<el-radio label="IOS" value = 2></el-radio>
						<el-radio label="通用" value = 3></el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click='submitreply'>提交</el-button>
				<el-button @click.native="feedconvisible = false">取消</el-button>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="addconvisible" :close-on-click-modal="false" width='800px' @close='closeDialog'>
			<el-form :model="setlistadd" label-width="80px" ref="seeForm">
				<el-form-item label="编码">
					<el-input v-model="setlistadd.code" auto-complete="off" :disabled=orinput></el-input>
				</el-form-item>
				<el-form-item label="CH">
					<el-input v-model="setlistadd.chs" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="EN">
					<el-input v-model="setlistadd.en"></el-input>
				</el-form-item>
				<el-form-item label="详情">
					<el-input type="textarea" v-model="setlistadd.detail"></el-input>
				</el-form-item>
				<el-form-item label="操作类型">
					<el-radio-group v-model="setlistadd.type">
						<el-radio label="1">成功</el-radio>
						<el-radio label="0">失败</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="显示设备">
					<el-radio-group v-model="setlistadd.status">
						<el-radio label="0">不显示</el-radio>
						<el-radio label="1">Android</el-radio>
						<el-radio label="2">IOS</el-radio>
						<el-radio label="3">通用</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click='submitadd'>提交</el-button>
				<el-button @click.native="addconvisible = false">取消</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data() {
			return {
				setlist: [],
				listLoading: false,
				feedconvisible: false,
				addconvisible: false,
				title: '',
				setlistone: {},
				setlistadd: {},
				resource: '',
				orinput:true
			}
		},
		methods: {
			//过滤长文本
			sub(row, colum) {
				let sss = row.detail;
				if(sss) {
					if(sss.length > 15) {
						sss = sss.substring(0, 15)
						return sss + '......'
					} else {
						return sss
					}
				}
			},
			getsetlist() {
				this.tokenencryption()
				this.$http.post(this.base + "/yw/code/select",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
					}), {emulateJSON: true}).then(res => {
					if(res.body.type == 0) {
						this.setlist = res.body.data
					} else {
						this.$message({
						type: 'warning',
						message: '暂无数据',
					});
					}
				})
			},
			closeDialog() {
				this.setlistone = {}
				this.setlistadd = {}
				this.getsetlist()
			},
			submitreply() {
				if(this.setlistone.type == '成功'){
					this.setlistone.type = 1
				}else if(this.setlistone.type == '失败'){
					this.setlistone.type = 0
				}
				if(this.setlistone.status == '不显示'){
					this.setlistone.status = 0
				}else if(this.setlistone.status == 'Android'){
					this.setlistone.status = 1
				}else if(this.setlistone.status == 'IOS'){
					this.setlistone.status = 2
				}else if(this.setlistone.status == '通用'){
					this.setlistone.status = 3
				}
				this.$confirm('确定提交?', '提示', {
					type: 'warning'
				}).then(() => {
					this.tokenencryption()
					this.$http.post(this.base + "/yw/code/update",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							chs: String(this.setlistone.chs),
							code: String(this.setlistone.code),
							detail: String(this.setlistone.detail),
							en: String(this.setlistone.en),
//							id: String(this.setlistone.id),
							status: String(this.setlistone.status),
							type: String(this.setlistone.type)
					}), {emulateJSON: true}).then(res => {
						this.$message({
							type: 'success',
							message: '提交成功',
						});
						this.feedconvisible = false
						this.getsetlist()
					})
				}).catch(() => {

				});
			},
			seesetlist(index, row) {
				this.setlistone = ''
				this.feedconvisible = true
				this.title = this.setlist[index].infocode
				this.setlistone = JSON.parse(JSON.stringify(this.setlist[index]));
				if(this.setlistone.type == 1){
					this.setlistone.type = '成功'
				}else if(this.setlistone.type == 0){
					this.setlistone.type = '失败'
				}
				if(this.setlistone.status == 0){
					this.setlistone.status = '不显示'
				}else if(this.setlistone.status == 1){
					this.setlistone.status = 'Android'
				}else if(this.setlistone.status == 2){
					this.setlistone.status = 'IOS'
				}else if(this.setlistone.status == 3){
					this.setlistone.status = '通用'
				}
			},
			settingadd() {
				this.addconvisible = true
				if(this.setlist.length>0){
					this.setlistadd.code = this.setlist[this.setlist.length-1].code+1
					this.orinput == true
				}else{
					this.orinput == false
				}
				
			},
			updatefun() {
				this.$router.push('/update')
			},
			submitadd() {
				if(this.setlistadd.code && this.setlistadd.type && this.setlistadd.status) {
					this.$confirm('确定提交?', '提示', {
						type: 'warning'
					}).then(() => {
						this.tokenencryption()
						this.$http.post(this.base + "/yw/code/insert",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							chs: String(this.setlistadd.chs),
							code: String(this.setlistadd.code),
							detail: String(this.setlistadd.detail),
							en: String(this.setlistadd.en),
							status: String(this.setlistadd.status),
							type: String(this.setlistadd.type)
					}), {emulateJSON: true}).then(res => {
							this.$message({
								type: 'success',
								message: '提交成功',
							});
							this.addconvisible = false
							this.getsetlist()
						})
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
		mounted() {
			this.setlistadd = {}
			this.getsetlist();
		}
	}
</script>

<style scoped>

</style>