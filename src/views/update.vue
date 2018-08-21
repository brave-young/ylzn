<template>
	<el-row>
		<el-col :span="24" class="toolbar" style="padding-bottom: 20px;">
		</el-col>
		<el-row>
			<el-col :span="10">
				<div style="padding-left: 50px;">
					<span style="font-size: 25px;font-weight: bold;margin-left: 10px;">远程升级</span>
					<el-upload style='margin-top: 20px;' class="upload-demo" drag action  :on-change='beforeAvatarUpload' :auto-upload='false'>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					</el-upload>
					<el-form :model="types" label-width="100px" ref="seeForm" style='margin-top: 30px;font-weight: bold;'>
						<el-form-item label="版本号码">
							<el-input style='width: 250px;' v-model="types.infocode" auto-complete="off"></el-input>
						</el-form-item>
						<el-form-item label="升级对象">
							<el-radio-group v-model="types.type">
								<el-radio label="0">门模块</el-radio>
								<el-radio label="1">主控</el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="升级状态">
							<el-radio-group v-model="types.status">
								<el-radio label="0">启用</el-radio>
								<el-radio label="1">未启用</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-form>
				</div>

				<el-button style='margin-top: 30px;margin-left: 350px;' @click='updatebut()' type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
			</el-col>
			<el-col :span="13">

			</el-col>
		</el-row>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				aaa: [],
				uuidstr: '',
				nowtime: '',
				types: {type:'',infocode:'',status:''},
			}
		},

		methods: {
			nowdate() {
				var date = new Date();
				var year = date.getFullYear(); //获取当前年份
				var mon = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; //获取当前月份
				var da = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //获取当前日
				var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取小时
				var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //获取分钟
				var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //获取秒
				this.nowtime = year + "-" + mon + "-" + da + " " + h + ":" + m + ":" + s;
			},
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
			updatebut() {
				this.uuidstr = this.uuid()
				this.nowdate()
				if(this.aaa.length == 0||this.types.type == ''||this.types.status==''||this.types.infocode=='') {
					this.$message({
						type: "warning",
						message: "请补全升级信息"
					});
				} else {
					this.$confirm('确认提交吗?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$http.post('http://120.27.222.66:8080/yw/version/insert', JSON.stringify({
							id: String(this.uuidstr),
							type: this.types.type, //门模块0  主控1  等
							length: this.aaa.length,
							time: String(this.nowtime),
							version: this.types.infocode,
							status: this.types.status, //0启用1未启用
							content: this.aaa.join(',')
						}), {
							emulateJSON: true
						}).then(res => {
						})
					}).catch(() => {

					})
				}
			},
			beforeAvatarUpload(file, fileList) {
				var updatearr = []
				var updatearr1 = []
				var reader = new FileReader()
				reader.readAsText(file.raw)
				reader.onload = function(e) {
					let arrdata = e.target.result.split("\r\n")
					for(let i = 0; i < arrdata.length; i++) {
						if(arrdata[i].split('')[7] == '0' && arrdata[i].split('')[8] == '0') {
							updatearr.push(arrdata[i].slice(9, 41))
						}
					}
					for(let j = 0; j < arrdata.length; j += 32) {
						updatearr1.push(updatearr.slice(j, j + 32).join(''))
					}
				}
				this.aaa = updatearr1
			},
		},

		mounted: function() {

		},
		updated: function() {

		}
	}
</script>

<style scoped>

</style>