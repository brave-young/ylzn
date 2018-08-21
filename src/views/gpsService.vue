<template>
	<el-row style="height: 100%;">  
		<div style="width: 350px;float: left;overflow: auto;">
			<div class="userphone">用户名 : {{carid}}</div>
			<el-table size='small' :data="timelists" highlight-current-row class='el-table-owner'>

				<el-table-column prop="locationtime" label="时间" width='170' align='center' :formatter='timetype'>
				</el-table-column>
				<el-table-column prop="distance" label="里程(Km)" width='80' align='center'>
					<template slot-scope="scope">
						<span style="color: #008B00;font-weight: bold;">{{scope.row.distance}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="90" align='right'>
					<template scope="scope">
						<el-button size="mini" @click="trackmap(scope.$index, scope.row)">查看轨迹</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination small layout="prev, pager, next" @current-change="handleCurrentChange1" :page-size="15" :total="timetotal" style="float:right;margin-top: 15px;">
			</el-pagination>
		</div>
		<div style="overflow: auto;height: 85%;">
			<div class="amap-wrapper">
				<el-amap vid="amapDemo" :center="center" :zooms='zoom' rotateEnable='true'>
					<el-amap-marker v-for="marker in markers" :position="marker.position" :icon='marker.icon'></el-amap-marker>
					<el-amap-polyline geodesic=ture :strokeWeight='polyline.strokeWeight' :strokeColor='polyline.strokeColor' :lineCap='polyline.lineCap' :lineJoin='polyline.lineJoin' :path="polyline.path"></el-amap-polyline>
				</el-amap>
			</div>
		</div>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				//地图
				zoom: [12, 18],
				markers: [],
				center: [120.027489, 30.281567],
				arr1: [],
				polyline: {

					lineJoin: 'round',
					strokeWeight: 5,
					strokeColor: '#1bac2e',
					path: [],
					lineCap: 'round',
					events: {
						click(e) {
							alert();
						},
					},
					editable: false,
				},
				carid: '',
				timelists: [],
				timepage: 1,
				timetotal: 0,
				timetid: '',
				index1: 0,
				resindex: 0,
				PI: 3.14159265358979324,
				x_pi: 3.14159265358979324 * 3000.0 / 180.0,
			}
		},
		methods: {
			handleCurrentChange1(val) {
				this.timepage = val;
				this.tracktimesrequest()
			},
			//查看行程列表
			trackTimes() {
				this.timelists = []
				this.timetotal = 0
				this.timetid = sessionStorage.getItem('sunid')
				this.carid = sessionStorage.getItem('carid')
				this.tracktimesrequest()
			},
			//请求行程接口
			tracktimesrequest() {
				this.tokenencryption()
				this.$http.post(this.base + "/yw/track/querAllGroup",JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							tid: this.timetid,
						page: this.timepage,
						rows: 15,
						type: "1"
					}), {emulateJSON: true}).then(res => {
					if(res.body.type !== '0') {
						this.timelists = []
						this.timetotal = 0
					} else {
						this.timelists = res.body.data.data
						this.timetotal = res.body.data.total
					}
				}).catch(e => {

				})
			},
			//坐标系转换
			delta(lat, lon) {

				// Krasovsky 1940
				//
				// a = 6378245.0, 1/f = 298.3
				// b = a * (1 - f)
				// ee = (a^2 - b^2) / a^2;
				var a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
				var ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
				var dLat = this.transformLat(lon - 105.0, lat - 35.0)
				var dLon = this.transformLon(lon - 105.0, lat - 35.0)
				var radLat = lat / 180.0 * this.PI
				var magic = Math.sin(radLat)
				magic = 1 - ee * magic * magic
				var sqrtMagic = Math.sqrt(magic)
				dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * this.PI)
				dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * this.PI)
				return {
					'lat': dLat,
					'lon': dLon
				};
			},
			transformLat(x, y) {
				var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
				ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0
				ret += (20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) * 2.0 / 3.0
				ret += (160.0 * Math.sin(y / 12.0 * this.PI) + 320 * Math.sin(y * this.PI / 30.0)) * 2.0 / 3.0
				return ret
			},
			transformLon(x, y) {
				var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
				ret += (20.0 * Math.sin(6.0 * x * this.PI) + 20.0 * Math.sin(2.0 * x * this.PI)) * 2.0 / 3.0;
				ret += (20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) * 2.0 / 3.0;
				ret += (150.0 * Math.sin(x / 12.0 * this.PI) + 300.0 * Math.sin(x / 30.0 * this.PI)) * 2.0 / 3.0;
				return ret;
			},
			//GPS---高德
			gcj_encrypt(wgsLat, wgsLon) {
				var d = this.delta(wgsLat, wgsLon);
				var la = parseFloat(wgsLat) + parseFloat(d.lat)
				return [parseFloat(wgsLon) + parseFloat(d.lon), parseFloat(wgsLat) + parseFloat(d.lat)]
			},

			//轨迹查询
			trackmap(index, row) {
				this.zoom = [15, 18]
				this.index1 = 0;
				clearInterval(this.times);
				this.polyline.path = []
				this.markers = []
				this.tokenencryption()
				this.$http.post(this.base + '/yw/track/querAllGroupDetail',JSON.stringify({
							encryptSign: String(this.$md5(this.nowtimestamp+this.appkey).toUpperCase()),
							timeStamp: this.nowtimestamp,
							sourceForm:'2',
							locationTime: this.timelists[index].locationTime
					}), {emulateJSON: true}).then(res => {
					if(res.body.type == 0) {
						for(var i = 0; i < res.body.data.length; i++) {
							if(res.body.data[i].errortype == 0 && res.body.data[i].speed < 1000 && res.body.data[i].createtime.substring(0, 2) == '18' || res.body.data[i].createtime.substring(0, 2) == '19') {
								this.arr1 = this.gcj_encrypt(res.body.data[i].latitude, res.body.data[i].longitude)
								this.polyline.path.push(this.arr1)
								this.arr1 = []
							}
						}
						if(this.polyline.path.length == 0) {
							this.$message({
								type: "warning",
								message: "暂无数据"
							});
						} else {
							this.center = this.polyline.path[0]
							this.markers = [{
								position: this.polyline.path[0],
								icon: './static/起点.png'
							}, {
								position: this.polyline.path[this.polyline.path.length - 1],
								icon: './static/终点.png'
							}];
						}
						//
						//																		this.times = setInterval(()=>{
						//																			this.index1++
						//																			this.markers = [{position: this.gcj_encrypt(res.body.data[this.index1].latitude, res.body.data[this.index1].longitude)}];
						//																			this.resindex= res.body.data.length
						//																			if(this.index1==this.resindex-1){								
						//																				clearInterval(this.times);
						//																				this.markers = [{position: this.gcj_encrypt(res.body.data[0].latitude, res.body.data[0].longitude)}];
						//																			}
						//																		},100)
					} else {
						this.$message({
								type: "warning",
								message: "暂无数据"
							});
					}
				})
			},
			//
			//时间戳转换
			getLocalTime(date) {
				let dates = new Date(date); //如果date为10位不需要乘1000
				let Y = dates.getFullYear() + '-';
				let M = (dates.getMonth() + 1 < 10 ? '0' + (dates.getMonth() + 1) : dates.getMonth() + 1) + '-';
				let D = (dates.getDate() < 10 ? '0' + (dates.getDate()) : dates.getDate()) + ' ';
				let h = (dates.getHours() < 10 ? '0' + dates.getHours() : dates.getHours()) + ':';
				let m = (dates.getMinutes() < 10 ? '0' + dates.getMinutes() : dates.getMinutes()) + ':';
				let s = (dates.getSeconds() < 10 ? '0' + dates.getSeconds() : dates.getSeconds());
				return Y + M + D + h + m + s;
			},
			timetype(row, column) {
				let sts = row.locationTime;
				return this.getLocalTime(parseInt(sts))
			},
		},
		mounted() {
			this.trackTimes()
		}
	}
</script>

<style scoped>
	.userphone {
		width: 300px;
		color: #333;
		font-weight: bold;
		height: 40px;
		background: #F0F8FF;
		text-align: center;
		line-height: 40px;
		margin-top: 5px;
	}
	
	.amap-wrapper {
		width: 98%;
		height: 100%;
		margin: 0px auto;
	}
</style>