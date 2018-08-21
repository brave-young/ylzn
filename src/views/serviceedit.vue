<template>
	<section style="height: 100%;">
		<el-col :span="24" class="toolbar" style="padding: 5px;">
			<el-button size='small' type="primary" @click="inserttexts()" style='float: right;'>新增</el-button>
		</el-col>
		<el-table size='small' :data="texts" highlight-current-row class='el-table-owner'>
			<el-table-column prop="title" label="标题" min-width="350" align='center'>
			</el-table-column>
			<el-table-column prop="time" label="时间" min-width="350" align='center'>
			</el-table-column>
			<el-table-column label="操作" width="250" align='center'>
				<template scope="scope">
					<el-button size="mini" @click="textsedit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" @click="textsdel(scope.$index, scope.row)" type='danger'>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-col :span="24" class="toolbar" style='height: 40px;'>
		</el-col>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="insertVisible" :close-on-click-modal="false" width='1000px' top='6vh' @open='dilogopen()' @close='dilogclose()'>
			类型:
			<el-radio-group v-model="resource">
				<el-radio label="功能说明" value=1></el-radio>
				<el-radio label="服务协议" value=0></el-radio>
				<el-radio label="客服电话" value=2></el-radio>
				<el-radio label="官方微信" value=3></el-radio>
				<el-radio label="官方微博" value=4></el-radio>
			</el-radio-group>
			<br /> 标题:
			<el-input auto-complete="off" v-model='inserttexttitle'></el-input>
			内容:
			<!--富文本-->
			<quill-editor ref="myQuillEditor" v-model='insertcontent' :options="editorOption">
			</quill-editor>
			<el-upload style="display:none" :data='form' :action="apiurl" ref="uniqueId" id="uniqueId" :on-success='handleSuccess' list-type='picture'>
				<el-button size="small" type="primary" id='imgInput'>点击上传</el-button>
			</el-upload>
			<!--富文本-->
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="subinserttexts">提交</el-button>
				<el-button @click.native="insertVisible = false">取消</el-button>
			</div>
		</el-dialog>
		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editVisible" :close-on-click-modal="false" width='1000px' top='6vh' @open='dilogopen()' @close='dilogclose()'>
			类型:
			<el-radio-group v-model="resource" :disabled="true">
				<el-radio label="功能说明"></el-radio>
				<el-radio label="服务协议"></el-radio>
				<el-radio label="客服电话"></el-radio>
				<el-radio label="官方微信"></el-radio>
				<el-radio label="官方微博"></el-radio>
			</el-radio-group>
			<br /> 主题:
			<el-input auto-complete="off" v-model='texttitle'></el-input>
			内容:
			<quill-editor ref="myQuillEditor" v-model='content' :options="editorOption">
			</quill-editor>
			<el-upload style="display:none" :data='form' :action="apiurl" ref="uniqueId" id="uniqueId" :on-success='handleSuccess1' list-type='picture'>
				<el-button size="small" type="primary" id='imgInput'>点击上传</el-button>
			</el-upload>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click='subtestsedit()'>提交</el-button>
				<el-button @click.native="editVisible = false">取消</el-button>
			</div>
		</el-dialog>

	</section>

</template>

<script>
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	//0.协议 1.功能说明 2.客户电话 3.官方微信 4.官方微博
	export default {
		data() {
			return {
				agreement: 1,
				agreement1:1,
				agreement2:1,
				agreement3:1,
				//判断是否存在协议条款
				form: {
					key: '',
					token: ''
				},
				file_logo_img_url: [],
				texts: [],
				addRange: '',
				editVisible: false,
				insertVisible: false,
				//当前选中id
				textsindex: '',
				texttitle: '',
				inserttexttitle: '',
				insertcontent: '',
				resource: '',
				resourcetype: '',
				content: '123',
				apiurl: 'https://upload-z2.qiniup.com',
				qiniutoken: '',
				editorOption: {
					modules: {
						toolbar: [
							['bold', 'italic', 'underline', 'strike'],
							[{'header': 1}, {'header': 2}], // custom button values
							[{'list': 'ordered'}, {'list': 'bullet'}],
							[{
								'indent': '-1'
							}, {
								'indent': '+1'
							}], // outdent/indent
							[{
								'header': [1, 2, 3, 4, 5, 6, false]
							}],

							[{
								'color': []
							}],
							[{
								'font': []
							}],
							[{
								'align': []
							}],

							['clean'],
							['image']
						],
					}
				}

			}
		},
		methods: {
			//生成uuid
			uuid() {
				var s = [];
				var hexDigits = "0123456789abcdef";
				for(var i = 0; i < 36; i++) {
					s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
				}
				s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
				s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
				s[8] = s[13] = s[18] = s[23] = "-";
				var uuid = s.join("");
				return uuid;
			},
			//获取列表
			gettexts() {
				this.agreement=1
				this.agreement1=1
				this.agreement2=1
				this.agreement3=1
				this.texts = []
				this.tokenencryption()
				this.$http.post(this.base + "/yw/serviceItem/selectServiceItem",JSON.stringify({
						encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
						timeStamp: this.nowtimestamp,
						sourceForm:'2',		
					}), {emulateJSON: true}).then(res => {
					if(res.body.type == 0) {
						this.texts = res.body.data
						for(var i = 0; i < this.texts.length; i++) {
							if(this.texts[i].type == 0) {
								this.agreement = 0
							}
							if(this.texts[i].type == 2) {
								this.agreement1 = 0
							}
							if(this.texts[i].type == 3) {
								this.agreement2 = 0
							}
							if(this.texts[i].type == 4) {
								this.agreement3 = 0
							}
						}
					} else {
						this.texts = []
					}
				})
			},
			//重新绑定图片上传按钮事件
			//对话框打开
			dilogopen() {
				this.timeout1 = setTimeout(() => {
					this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler)
				}, 10)
			},
			//对话框关闭
			dilogclose() {
				clearTimeout(this.timeout1);
			},
			imgHandler(state) {
				this.addRange = this.$refs.myQuillEditor.quill.getSelection()
				if(state) {
					let fileInput = document.getElementById('imgInput')
					fileInput.click() // 加一个触发事件
					this.tokenget()
				}
				this.uploadType = 'image'
			},
			//新增
			inserttexts() {
				this.inserttexttitle = '';
				this.insertcontent = '';
				this.resource = '';
				this.resourcetype = '';
				this.insertVisible = true;
			},
			//获取token
			tokenget() {
				this.form.key = this.uuid()
				this.tokenencryption()
				this.$http.post(this.base + "/yw/common/uploadToken",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
					}), {emulateJSON: true}).then(res => {
					if(res.body.type == 0) {
						this.form.token = res.body.data
					} else {
						this.token = ''
					}
				})
			},
			//上传成功
			
			handleSuccess(response, file, filelist) {
				this.tokenencryption()
				this.$http.post(this.base + "/yw/common/joinUrl",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							photoKey: response.key
					}), {emulateJSON: true}).then(res => {
					this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, this.uploadType, res.body.data)

				})
			},
			handleSuccess1(response, file, filelist) {
				this.tokenencryption()
				this.$http.post(this.base + "/yw/common/joinUrl",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							photoKey: response.key
					}), {emulateJSON: true}).then(res => {
					this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, this.uploadType, res.body.data)

				})
			},
			//新增提交
			subinserttexts() {
				if(this.resource == '服务协议') {
					this.resourcetype = 0
				} else if(this.resource == '功能说明') {
					this.resourcetype = 1
				}else if(this.resource == '客服电话') {
					this.resourcetype = 2
					this.inserttexttitle = '客服电话'
				}else if(this.resource == '官方微信') {
					this.resourcetype = 3
					this.inserttexttitle = '官方微信'
				}else if(this.resource == '官方微博') {
					this.resourcetype = 4
					this.inserttexttitle = '官方微博'
				}
				if(this.resourcetype == 0 && this.agreement == 0) {
					this.$message({
						type: 'warning',
						message: '协议已存在',
					});
				} else if(this.resourcetype == 2 && this.agreement1 == 0){
					this.$message({
						type: 'warning',
						message: '请修改原号码',
					});
				} else if(this.resourcetype == 3 && this.agreement2 == 0){
					this.$message({
						type: 'warning',
						message: '请修改原微信',
					});
				} else if(this.resourcetype == 4 && this.agreement3 == 0){
					this.$message({
						type: 'warning',
						message: '请修改原微博',
					});
				} else{
					this.$confirm('确认提交吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.tokenencryption()
						this.$http.post(this.base + "/yw/serviceItem/insertServiceItem",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							content: this.insertcontent,
							type: this.resourcetype,
							title: this.inserttexttitle
					}), {emulateJSON: true}).then(res => {
							if(res.body.type == 0) {
								this.$message({
									type: 'success',
									message: '添加成功',
								});
								this.insertVisible = false,
									this.gettexts()
							} else {
								this.$message({
									message: '添加失败',
								});
							}
						})
					}).catch(() => {})
				}

			},
			//编辑
			textsedit(index, row) {
				this.textsindex = ''
				this.content = ''
				this.texttitle = ''
				this.editVisible = true
				this.content = this.texts[index].content
				this.texttitle = this.texts[index].title
				this.textsindex = index
				if(this.texts[index].type == 0) {
					this.resource = '服务协议'
				} else if(this.texts[index].type == 1){
					this.resource = '功能说明'
				}else if(this.texts[index].type == 2){
					this.resource = '客服电话'
				}else if(this.texts[index].type == 3){
					this.resource = '官方微信'
				}else if(this.texts[index].type == 4){
					this.resource = '官方微博'
				}
			},
			//编辑提交
			subtestsedit() {
				this.$confirm('确认提交吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tokenencryption()
					this.$http.post(this.base + "/yw/serviceItem/updateServiceItem",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							id: this.texts[this.textsindex].id,
							content: String(this.content),
							title: this.texttitle
					}), {emulateJSON: true}).then(res => {
						if(res.body.type == 0) {
							this.$message({
								type: 'success',
								message: '编辑成功',
							});
							this.editVisible = false
							this.gettexts()
						} else {
							this.$message({
								message: '编辑失败',
							});
						}
					})
				}).catch(() => {

				})
			},
			//删除
			textsdel(index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.tokenencryption()
					this.$http.post(this.base + "/yw/serviceItem/deleteServiceItem",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							id: this.texts[index].id
					}), {emulateJSON: true}).then(res => {
						if(res.body.type == 0) {
							this.$message({
								type: 'success',
								message: '删除成功',
							});
							this.gettexts()
						} else {
							this.$message({
								message: '删除失败',
							});
						}
					})
				}).catch(() => {

				})

			}

		},
		mounted() {
			this.gettexts()
		}
	}
</script>

<style lang='scss' scoped>
	.quill-editor {
		margin-top: 5px;
		margin-bottom: 50px;
		height: 350px;
		.ql-container {
			height: 400px;
		}
	}
</style>