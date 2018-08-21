<template>
	<section>
		<el-row>
			<div style="width: 240px;float: left;overflow: auto;">
				<div class="userphone">用户名 : {{userphone}}</div>
				<ul style="padding: 0;">
					<li class="carsindex" v-for='(cars,index) in usercarlist'>
						<p style="padding-top: 10px;">车架号 : {{cars.id}}</p>
						<img v-bind:src="cars.isonline == 0?'./static/a1.png':'./static/a2.png'" />
						<p>
							<el-button size="mini" @click="unbind(index)">解除绑定</el-button>
							<el-button size='mini' @click='handlemain(index)'>车辆详情</el-button>
						</p>

					</li>
				</ul>
			</div>
			<div style="overflow:  auto;">
				<p class="cartitle">
					<span style="font-weight: bold;margin-left: 25px;">车架号 : <span style="color: #008B00;">{{this.carid}}</span></span>
					<span style="margin-left: 20px;font-weight: bold;">状态 : <span style="color: #008B00;">{{this.carisonline}}</span></span>
					<span style="margin-left: 20px;font-weight: bold;color: #008B00;">{{this.isstart}}</span>
					<span v-show=runtimeshow style="font-weight: bold;margin-left: 25px;">当前行驶时间<span style="margin-left: 20px;font-weight: bold;color: #008B00;">{{this.runtime}}</span></span>
				</p>
				<div class="carinfowrap">
					<div class="carinfo">
						<div class="stateswrap">
							<p class="carinfoTime">
								<span style="margin-left: 20px;">8001数据接收时间 :
									<span style="color: red;">
										{{this.time8001}}
									</span>
								</span>
							</p>
							<p  class="carinfoTime">
								<span style="margin-left: 20px;">8002数据接收时间 :
									<span  style="color: red;">
										{{this.time8002}}
									</span>
								</span>
							</p>
							<p  class="carinfoTime">
								<span style="margin-left: 20px;">8003数据接收时间 :
									<span  style="color: red;">
										{{this.time8003}}
									</span>
								</span>
							</p>
						</div>
						<div class="stateswrap">
							<div class="grid-content">
								<p class="contitle">车辆基本数据</p>
								<div class="conlight infowrap">
									<div class="" style="width: 650px;">
										<p class="tablerow">
											<span class="tablerowa">电量 :</span>
											<span class="tablerowb">{{this.amount_car}}</span>
										</p>
										<p class="tablerow">
											<span class="tablerowa">车速 :</span>
											<span class="tablerowb">{{this.speed_car}}</span>
										</p>
										<p class="tablerow">
											<span class="tablerowa">里程 :</span>
											<span class="tablerowb">{{this.Total_Mileage}}</span>
										</p>
										<p class="tablerow">
											<span class="tablerowa">ACC :</span>
											<span class="tablerowb">{{this.acc}}</span>
										</p>
										<p class="tablerow">
											<span class="tablerowa">档位 :</span>
											<span class="tablerowb">{{this.gears}}</span>
										</p>
										<p class="tablerow">
											<span class="tablerowa">故障(等级) :</span>
											<span class="tablerowb">{{this.mcu_Fault_Level}}</span>
										</p>
										<p class="tablerow">
											<span class="tablerowa">加速踏板开度 :</span>
											<span class="tablerowb">{{this.Pedal_Speed}}</span>
										</p>
										<p class="tablerow">
											<span class="tablerowa">制动踏板开度 :</span>
											<span class="tablerowb">{{this.Brake_Pedal_Opening}}</span>
										</p>
										
										
										<p class="tablerow">
											<span class="tablerowa">BCM运行状态 :</span>
											<span class="tablerowb">{{this.BCM_Running_State}}</span>
										</p>
										<p class="tablerow">
											<span class="tablerowa">MCU工作状态 :</span>
											<span class="tablerowb">{{this.mcu_Working_Status}}</span>
										</p>										
									</div>		
									<ul class="" style="width: 350px;display: flex;flex-wrap: wrap;">
										<li class="states1">
										<img v-bind:src="SafeStates[4]==1?'./static/刹车on.png':'./static/刹车.png'" />
										<p>手刹</p>
									</li>
									<li class="states1">
										<img v-bind:src="SafeStates[3]==1?'./static/安全带on.png':'./static/安全带off.png'" />
										<p>主驾驶安全带</p>
									</li>
									<li class="states1">
										<img v-bind:src="SafeStates[2]==1?'./static/安全带on.png':'./static/安全带off.png'" />
										<p>副驾驶安全带</p>
									</li>
									<li class="states1">
										<img v-bind:src="SafeStates[5]==1?'./static/应急灯on.png':'./static/应急灯.png'" />
										<p>应急灯</p>
									</li>
									<li class="states1">
										<img v-bind:src="SafeStates[1]==1?'./static/危险on.png':'./static/危险.png'" />
										<p>是否碰撞</p>
									</li>
									<li class="states1">
										<img v-bind:src="SafeStates[0]==0?'./static/锁off.png':'./static/锁.png'" />
										<p>玻璃升降锁</p>
									</li>
									</ul>

									
								</div>
							</div>
						</div>
						<div class="stateswrap">
							<div class="grid-content">
								<p class="contitle">车灯信息</p>
								<ul class="conlight lightwrap">
									<!--车灯状态  15c145   bfbfbf-->
									<li class="states">
										<img v-bind:src="carlights[7]==1?'./static/近光灯on.png':'./static/近光灯.png'" />
										<p>近光灯</p>
									</li>
									<li class="states">
										<img v-bind:src="carlights[6]==1?'./static/远光灯on.png':'./static/远光灯.png'" />
										<p>远光灯</p>
									</li>

									<li class="states">
										<img v-bind:src="carlights[4]==1?'./static/左on.png':'./static/左.png'" />
										<p>左转灯</p>
									</li>
									<li class="states">
										<img v-bind:src="carlights[5]==1?'./static/右on.png':'./static/右.png'" />
										<p>右转灯</p>
									</li>
									<li class="states">
										<img v-bind:src="carlights[3]==1?'./static/前雾灯on.png':'./static/前雾灯.png'" />
										<p>前雾灯</p>
									</li>
									<li class="states">
										<img v-bind:src="carlights[2]==1?'./static/后雾灯on.png':'./static/后雾灯.png'" />
										<p>后雾灯</p>
									</li>
									<li class="states">
										<img v-bind:src="carlights[1]==1?'./static/示廓灯on.png':'./static/示廓灯.png'" />
										<p>示廓灯</p>
									</li>
									<li class="states">
										<img v-bind:src="carlights[0]==1?'./static/室内灯on.png':'./static/室内灯.png'" />
										<p>顶灯</p>
									</li>
								</ul>

							</div>

							<div class="grid-content">
								<p class="contitle">车门信息</p>
								<ul class="conlight carconwrap">
									<!--车门状态-->
									<li class="states">
										<img v-bind:src="cardoors[7]==0?'./static/车门open.png':'./static/车门.png'" />
										<p>左前门</p>
									</li>
									<li class="states">
										<img v-bind:src="cardoors[6]==0?'./static/车门open.png':'./static/车门.png'" />
										<p>右前门</p>
									</li>
									<li class="states">
										<img v-bind:src="cardoors[5]==0?'./static/车门open.png':'./static/车门.png'" />
										<p>左后门</p>
									</li>
									<li class="states">
										<img v-bind:src="cardoors[4]==0?'./static/车门open.png':'./static/车门.png'" />
										<p>右后门</p>
									</li>
									<li class="states">
										<img v-bind:src="SafeStates[7]==0?'./static/车门open.png':'./static/车门.png'" />
										<p>后备箱门</p>
									</li>
									<li class="states">
										<img v-bind:src="cardoors[3]==0?'./static/锁off.png':'./static/锁.png'" />
										<p>左前门门锁</p>
									</li>
									<li class="states">
										<img v-bind:src="cardoors[2]==0?'./static/锁off.png':'./static/锁.png'" />
										<p>右前门门锁</p>
									</li>
									<li class="states">
										<img v-bind:src="cardoors[1]==0?'./static/锁off.png':'./static/锁.png'" />
										<p>左后门门锁</p>
									</li>
									<li class="states">
										<img v-bind:src="cardoors[0]==0?'./static/锁off.png':'./static/锁.png'" />
										<p>右后门门锁</p>
									</li>
									<li class="states">
										<img v-bind:src="SafeStates[6]==0?'./static/锁off.png':'./static/锁.png'" />
										<p>后备箱门门锁</p>
									</li>
								</ul>
							</div>
						</div>
						<div class="stateswrap">
							<div class="motorWrap">
								<p class="contitle">电机信息</p>
								<div style="padding: 5px;">
									<p class="motorline">
										<span class="motorrowa">电机转速 :</span>
										<span class="motorrowb">{{this.Motor_Speed}}</span>
									</p>
									<p class="motorline">
										<span class="motorrowa">电机扭矩 :</span>
										<span class="motorrowb">{{this.motor_Torque}}</span>
									</p>
									<p class="motorline">
										<span class="motorrowa">电机输出功率 :</span>
										<span class="motorrowb">{{this.Motor_Output}}</span>
									</p>
									<p class="motorline">
										<span class="motorrowa">电机温度 :</span>
										<span class="motorrowb">{{this.motor_t}}</span>
									</p>
									<p class="motorline">
										<span class="motorrowa">电机高压接触器状态 :</span>
										<span class="motorrowb">{{this.Motor_High_Voltage_Contactor_Status}}</span>
									</p>
									<p class="motorline">
										<span class="motorrowa">电机系统行车模式 :</span>
										<span class="motorrowb">{{this.Motor_System_Driving_Mode}}</span>
									</p>
									<p class="motorline">
										<span class="motorrowa">电机当前控制模式 :</span>
										<span class="motorrowb">{{this.Motor_System_Driving_Mode}}</span>
									</p>
									<p class="motorline">
										<span class="motorrowa">BMS高压输出请求信号 :</span>
										<span class="motorrowb">{{this.bms_High_Voltage_Output_Request_Signal}}</span>
									</p>
								</div>
								
							</div>
							<div class="mcuWrap">
								<p class="contitle">MCU详情</p>
								<div style="padding: 5px;">
									<p class="mculine">
										<span class="motorrowa">MCU母线电压 :</span>
										<span class="motorrowb">{{this.MCU_Voltage}}</span>
									</p>
									<p class="mculine">
										<span class="motorrowa">MCU母线电流 :</span>
										<span class="motorrowb">{{this.MCU_Current}}</span>
									</p>
									<p class="mculine">
										<span class="motorrowa">MCU温度 :</span>
										<span class="motorrowb">{{this.MCU_t}}</span>
									</p>
									<p class="mculine">
										<span class="motorrowa">高压互锁（HVIL）状态 :</span>
										<span class="motorrowb">{{this.hvil_Status}}</span>
									</p>
								</div>		
							</div>
						</div>
						
						<div class="stateswrap">
							<div class="carwindow">
								<p class="windowline">
									<span class="windowrowa">左前窗开关（司机侧） :</span>
									<span class="windowrowb">{{this.driverleft}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">右前窗开关（司机侧） :</span>
									<span class="windowrowb">{{this.driverright}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">左后窗开关（司机侧） :</span>
									<span class="windowrowb">{{this.driverleftrear}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">右后窗开关（司机侧） :</span>
									<span class="windowrowb">{{this.driverrightrear}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">右前窗开关（乘员侧） :</span>
									<span class="windowrowb">{{this.passengersright}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">左后窗开关（乘员侧） :</span>
									<span class="windowrowb">{{this.passengersleftrear}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">右后窗开关（乘员侧） :</span>
									<span class="windowrowb">{{this.passengersrightrear}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">天窗开关 :</span>
									<span class="windowrowb">{{this.skylight}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">前雨刮HI开关 :</span>
									<span class="windowrowb">{{this.wiperhi}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">前雨刮LOW开关 :</span>
									<span class="windowrowb">{{this.wiperlow}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">前雨刮INT开关 :</span>
									<span class="windowrowb">{{this.wiperint}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">前雨刮洗涤开关 :</span>
									<span class="windowrowb">{{this.wiperwash}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">后雨刮开关 :</span>
									<span class="windowrowb">{{this.wiperrear}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">后雨刮洗涤开关 :</span>
									<span class="windowrowb">{{this.wiperrearwash}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">加速有效信号 :</span>
									<span class="windowrowb">{{this.Accelerated_Effective_Signal}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">制动有效信号 :</span>
									<span class="windowrowb">{{this.Brake_Signal}}</span>
								</p>
							</div>	
						</div>
						<!--8001-->
						
					</div>
					<el-row class='carError' v-show=true>			
						<div class="stateswrap" v-show=errora>
							<div class="carwindow">
								<p class="contitle">一级故障</p>
								<p class="windowline">
									<span class="windowrowa">MCU温度过高:</span>
									<span class="windowrowb">{{this.errordataA[7]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">电机温度过高 :</span>
									<span class="windowrowb">{{this.errordataA[6]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线电压过高:</span>
									<span class="windowrowb">{{this.errordataA[5]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线电压过低 :</span>
									<span class="windowrowb">{{this.errordataA[4]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线过流:</span>
									<span class="windowrowb">{{this.errordataA[3]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">相电流过流 :</span>
									<span class="windowrowb">{{this.errordataA[2]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">电机超速:</span>
									<span class="windowrowb">{{this.errordataA[1]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">三相电流不平衡 :</span>
									<span class="windowrowb">{{this.errordataA[0]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">电机堵转 :</span>
									<span class="windowrowb">{{this.errordataA[15]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">CAN通讯故障 :</span>
									<span class="windowrowb">{{this.errordataA[14]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线电流采样故障 :</span>
									<span class="windowrowb">{{this.errordataA[13]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">相电流采样故障 :</span>
									<span class="windowrowb">{{this.errordataA[12]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">旋转编码器解析故障 :</span>
									<span class="windowrowb">{{this.errordataA[11]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">加速踏板故障 :</span>
									<span class="windowrowb">{{this.errordataA[10]}}</span>
								</p>
							</div>	
						</div>
						<div class="stateswrap" v-show=errorb>
							<div class="carwindow">
								<p class="contitle">二级故障</p>
								<p class="windowline">
									<span class="windowrowa">MCU温度过高:</span>
									<span class="windowrowb">{{this.errordataB[7]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">电机温度过高 :</span>
									<span class="windowrowb">{{this.errordataB[6]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线电压过高:</span>
									<span class="windowrowb">{{this.errordataB[5]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线电压过低 :</span>
									<span class="windowrowb">{{this.errordataB[4]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线过流:</span>
									<span class="windowrowb">{{this.errordataB[3]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">相电流过流 :</span>
									<span class="windowrowb">{{this.errordataB[2]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">电机超速:</span>
									<span class="windowrowb">{{this.errordataB[1]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">三相电流不平衡 :</span>
									<span class="windowrowb">{{this.errordataB[0]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">电机堵转 :</span>
									<span class="windowrowb">{{this.errordataB[15]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">CAN通讯故障 :</span>
									<span class="windowrowb">{{this.errordataB[14]}}</span>
								</p>
							</div>	
						</div>	
						<div class="stateswrap" v-show=errorc>
							<div class="carwindow">
								<p class="contitle">三级故障</p>
								<p class="windowline">
									<span class="windowrowa">MCU温度过高:</span>
									<span class="windowrowb">{{this.errordataC[7]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">电机温度过高 :</span>
									<span class="windowrowb">{{this.errordataC[6]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线电压过高:</span>
									<span class="windowrowb">{{this.errordataC[5]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线电压过低 :</span>
									<span class="windowrowb">{{this.errordataC[4]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">MCU母线过流:</span>
									<span class="windowrowb">{{this.errordataC[3]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">相电流过流 :</span>
									<span class="windowrowb">{{this.errordataC[2]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">电机超速:</span>
									<span class="windowrowb">{{this.errordataC[1]}}</span>
								</p>
								<p class="windowline">
									<span class="windowrowa">初始化故障 :</span>
									<span class="windowrowb">{{this.errordataC[0]}}</span>
								</p>
							</div>	
						</div>
					</el-row>
					<el-row class='carline-wrap'>
						<el-col :span="24" class='toolbar carline-wrapA'>
							<el-form :inline="true" size='small' style="margin: 0;">
								<el-form-item>
									<el-button :disabled='seegps' type="info" v-on:click="hour1()" style='margin-left: 3px;'>一小时</el-button>
								</el-form-item>
								<el-form-item>
									<el-button :disabled='seegps' type="info" v-on:click="hour3()" style='margin-left: 3px;'>三小时</el-button>
								</el-form-item>
								<el-form-item>
									<el-button :disabled='seegps' type="info" v-on:click="hour6()" style='margin-left: 3px;'>六小时</el-button>
								</el-form-item>
								<el-form-item>
									<el-button :disabled='seegps' type="info" v-on:click="hour24()" style='margin-left: 3px;'>一天</el-button>
								</el-form-item>
								<el-date-picker :disabled='seegps' :picker-options="pickerOptions1" size='small' v-model="value3" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
								</el-date-picker>
								<el-form-item>
									<el-button :disabled='seegps' type="info" v-on:click="search()" icon="el-icon-search" style='margin-left: 20px;'>查询</el-button>
								</el-form-item>
							</el-form>
						</el-col>

					</el-row>
					<el-row v-show=lineshow>
						<el-col :span="24">
							<div id="vLine" style="width:100%; height:400px;"></div>
						</el-col>
					</el-row>
					<el-row class='carline-wrap'>
						<el-col :span="24" class='toolbar carline-wrapA'>
							<el-form :inline="true" size='small' style="margin: 0;">
								<el-date-picker :picker-options="pickerOptions1" size='small' v-model="value4" type="month" placeholder="选择月">
								</el-date-picker>
								<el-form-item>
									<el-button :disabled='seegps' type="info" v-on:click="searchbymouth()" icon="el-icon-search" style='margin-left: 20px;'>查询</el-button>
								</el-form-item>
							</el-form>
						</el-col>
						<el-col :span="24" v-show=barshow>
							<div id="mileageBar" style="width:100%; height:450px;"></div>
						</el-col>
					</el-row>
				</div>
				<p class="cargps">
					<span style="font-weight: bold;margin-left: 25px;">定位时间 : <span style="color: #008B00;">{{this.gpstime}}</span></span>
					<span style="margin-left: 20px;font-weight: bold;">地点 : <span style="color: #008B00;">{{this.windows}}</span></span>
					<el-button :disabled='seegps' round type="success" size="small" @click="loadgps()" style='float: right;margin-right: 20px;'>历史行驶轨迹 </el-button>
				</p>
				<!--地图-->
				<div class="amap-wrapper">
					<el-amap vid="amapDemo" :center="center" :zoom='zoom' style='margin-top: 10px;'>
						<el-amap-marker :offset=[0,0] v-for="marker in markers" :position="marker.position" icon='./static/aa.png'></el-amap-marker>
					</el-amap>
				</div>
			</div>
		</el-row>
	</section>
</template>

<script>
	import { AMapManager } from "vue-amap";
	import echarts from "echarts";
	export default {
		data() {
			return {
				usercarlist: [],
				userphone: "",
				uid: "",
				userphone: "",
				//当前车架号 当前车状态
				carid: "",
				carisonline: "",
				cartid: "",
				sunid: '',
				//
				carinstructs: [],
				//8001
				//模块三
				carlights2: [],
				//车辆启停状态及行驶时间
				isstart: '',
				runtime: '',
				runtimeshow: false,
				//模拟数据
//				res: 'aa5514008001010000000000000000000000FFFF0000000010000000000000000000000000000000000000000001',
				arrdata: [],
				arrdata8002: [],
				//前一天8002
				arrdata8002y: [],
				arrdata8003: [],
				//MCU工作状态
				mcu_Working_Status: '',
				//MCU故障等级
				mcu_Fault_Level: '',
				//BMS高压输出请求信号
				bms_High_Voltage_Output_Request_Signal: '',
				//电机高压接触器状态
				Motor_High_Voltage_Contactor_Status: '',
				//高压互锁（HVIL）状态
				hvil_Status: "",
				//档位
				gears: '',
				//电机系统行车模式
				Motor_System_Driving_Mode: '',
				//电机当前控制模式
				Motor_Current_Control_Mode: '',
				//加速踏板开度
				Pedal_Speed: '',
				//加速有效信号
				Accelerated_Effective_Signal: '',
				//制动踏板开度
				Brake_Pedal_Opening: '',
				//制动有效信号
				Brake_Signal: '',
				//循环计数
				//bcm运行状态
				BCM_Running_State: '',
				//灯光状态 15
				carlights: [],
				//车门16
				cardoors: [],
				//17 安全
				SafeStates: [],
				//18 司机侧车窗
				driverleft: '',
				driverright: '',
				driverleftrear: '',
				driverrightrear: '',
				//19 乘员车窗  天窗
				skylight: '',
				passengersright: '',
				passengersleftrear: '',
				passengersrightrear: '',
				//20 雨刮
				wiperhi: '',
				wiperlow: '',
				wiperint: '',
				wiperwash: '',
				wiperrear: '',
				wiperrearwash: '',
				acc: '',
				Motor_Speed: '',
				motor_Torque: '',
				Motor_Output: "",
				MCU_Voltage: "",
				MCU_Current: '',
				MCU_t: '',
				motor_t: '',
				speed_car: '',
				Total_Mileage: '',
				amount_car: '',
				//
				seegps: true,
				//地图
				PI: 3.14159265358979324,
				x_pi: 3.14159265358979324 * 3000.0 / 180.0,
				center: [120.0218, 30.275376],
				markers: [],
				zoom: 13,
				gpstime: "",
				windows: "",
				//折线图
				startbymouth: "",
				endbymouth: '',
				mileageX: '',
				mileageY: '',
				mileageBar: null,
				vLine: null,
				lineshow: false,
				barshow: false,
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				value3: '',
				value4: '',
				startTime: "",
				endTime: "",
				vxdata: [2, 3, 4],
				socydata: [1, 1, 1],
				vtotal: [2, 2, 2],
				atotal: [3, 3, 3],
				Ttotal: [4, 4, 4],
				errorshow: false,
				errora: false,
				errorb: false,
				errorc: false,
				errordataA: [],
				errordataB: [],
				errordataC: [],
				time8001: '',
				time8002: '',
				time8003: ''

			};
		},
		methods: {
			//是否在线
			isonlinecolors(row, rowIndex, columnIndex) {
				if(this.usercarlist[row.rowIndex].isonline == 0) {
					return {
						color: "#c0c0c0"
					};
				} else if(this.usercarlist[row.rowIndex].isonline == 1) {
					return {
						color: "#000"
					};
				}
			},

			getcarList() {
				this.uid = sessionStorage.getItem("uid");
				this.userphone = sessionStorage.getItem("userphone");
				this.usercarlist = [];
				this.usercarlistVisible = true;
				this.tokenencryption()
				this.$http.post(this.base + "/yw/car/selectUserCars", JSON.stringify({
					encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
					timeStamp: this.nowtimestamp,
					sourceForm: '2',
					uid: String(this.uid)
				}), {
					emulateJSON: true
				}).then(res => {
					if(res.body.type !== "0") {
						this.usercarlist = [];
					} else {
						this.usercarlist = res.body.data;
					}
				});
			},
			//解除绑定
			unbind(index) {
				this.$confirm("确定解绑?", "提示", {
						type: "warning"
					})
					.then(() => {
						this.tokenencryption()
						this.$http
							.post(this.base + "/yw/car/unbindCid", JSON.stringify({
								encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
								timeStamp: this.nowtimestamp,
								sourceForm: '2',
								id: this.usercarlist[index].id
							}), {
								emulateJSON: true
							}).then(res => {
								if(res.body.type == 0) {
									this.usercarlist.splice(index, 1);
									this.$message({
										type: "success",
										message: "解绑成功"
									});
								}
							});
					})
					.catch(() => {});
			},
			//获取定位
			handleMap(index) {
				this.windows = "";
				this.markers = [];
				//下发指令请求最新位置
				this.tokenencryption()
				this.$http
					.post(this.base + "/yw/location/pushLocationInstruct", JSON.stringify({
						encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
						timeStamp: this.nowtimestamp,
						sourceForm: '2',
						tid: this.usercarlist[index].tid
					}), {
						emulateJSON: true
					})
					.then(res => {
						this.tokenencryption()
						this.$http.post(this.base + "/yw/location/selectLocation", JSON.stringify({
								encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
								timeStamp: this.nowtimestamp,
								sourceForm: '2',
								tid: this.usercarlist[index].tid
							}), {
								emulateJSON: true
							})
							.then(res => {
								if(res.body.type == 0) {
									this.gpstime = res.body.data.locatetime;
									this.markers = [{
										position: this.gcj_encrypt(
											res.body.data.latitude,
											res.body.data.longitude
										)
									}];
									this.locations = this.markers[0].position;
									this.locations = this.locations.join(",");
									this.center = this.gcj_encrypt(
										res.body.data.latitude,
										res.body.data.longitude
									);
									this.$http
										.jsonp("http://restapi.amap.com/v3/geocode/regeo", {
											params: {
												key: "d4256ffc634ab4b3e07927a02f00b0e1",
												location: this.locations
											}
										})
										.then(res => {
											if(res.body.status == 1) {
												this.windows = res.body.regeocode.formatted_address;
											}
										});
								} else if(res.body.type == 1) {

								} else {
									this.markers = "";
									this.gpstime=''
								}
							});
					});
			},

			//数据解析方法
			//十六转二进制补满八位
			hextobinary(x) {
				let x1 = parseInt(x, 16).toString(2);
				let x1str = x1.split("");
				if(x1str.length < 8) {
					let sunnum = 8 - x1str.length;
					for(let j = 0; j < sunnum; j++) {
						x1str.unshift("0");
					}
				}
				return x1str;
			},
			//十六进制转十进制
			hextodecimal(x) {
				let x1 = parseInt(x, 16)
				return x1
			},
			//二进制转十六进制
			bintohex(x) {
				let x1 = parseInt(x, 2).toString(16)
				return x1
			},
			//8001解析
			//字节编号
			//6  0-1:MCU当前工作状态   2-3:RESERVED  4-6:MCU故障等级  7:RESERVED
			//mcu工作状态
			mcuWorkingStatus() {
				let byte6 = this.hextobinary(this.arrdata[6])
				let a = this.bintohex(byte6[6] + byte6[7])
				let mcuStates = (a == 0 && 'MCU上电') || (a == 1 && '无高压输出') || (a == 2 && '高压输出')
				return mcuStates
			},
			//mcu故障等级
			mcuFaultLevel() {
				let byte6 = this.hextobinary(this.arrdata[6])
				let a = this.bintohex(byte6[1] + byte6[2] + byte6[3])
				let mcuFault = (a == 0 && '无故障') || (a == 1 && '一级故障') || (a == 2 && '二级故障') || (a == 3 && '三级故障')
				return mcuFault
			},

			//7 2-3:BMS高压输出请求信号   4:电机高压接触器状态  5:高压互锁（HVIL）状态
			//BMS高压输出请求信号
			bmsHighVoltageOutputRequestSignal() {
				let byte7 = this.hextobinary(this.arrdata[7])
				let a = this.bintohex(byte7[4] + byte7[5])
				let bmssignal = (a == 0 && '无请求') || (a == 1 && '请求断开') || (a == 2 && '请求闭合')
				return bmssignal
			},
			//电机高压接触器状态
			MotorHighVoltageContactorStatus() {
				let byte7 = this.hextobinary(this.arrdata[7])
				let a = this.bintohex(byte7[3])
				let MotorStatus = (a == 0 && '断开') || (a == 1 && '闭合')
				return MotorStatus
			},
			//高压互锁（HVIL）状态
			hvilStatus() {
				let byte7 = this.hextobinary(this.arrdata[7])
				let a = this.bintohex(byte7[2])
				let hvils = (a == 0 && 'disconnection') || (a == 1 && 'OK')
				return hvils
			},
			//8 0-1:档位状态  3-4:电机系统行车模式  5-6:电机当前控制模式
			//档位状态
			gear() {
				let byte8 = this.hextobinary(this.arrdata[8])
				let a = this.bintohex(byte8[6] + byte8[7])
				let gears = (a == 0 && 'P') || (a == 1 && 'N') || (a == 2 && 'D') || (a == 3 && 'R')
				return gears
			},
			//电机系统行车模式
			MotorSystemDrivingMode() {
				let byte8 = this.hextobinary(this.arrdata[8])
				let a = this.bintohex(byte8[3] + byte8[4])
				let Motormode = (a == 0 && '正常模式') || (a == 1 && '运动模式') || (a == 2 && '经济模式') || (a == 3 && '跛行模式')
				return Motormode
			},
			//电机当前控制模式
			MotorCurrentControlMode() {
				let byte8 = this.hextobinary(this.arrdata[8])
				let a = this.bintohex(byte8[1] + byte8[2])
				let motorcontrol = (a == 0 && 'Inactive') || (a == 1 && '转矩模式') || (a == 2 && '转速模式')
				return motorcontrol
			},
			//9 0-6:加速踏板开度        7:加速有效信号
			//加速踏板开度
			PedalSpeed() {
				let byte9 = this.hextobinary(this.arrdata[9])
				let peadl = parseInt(byte9[1] + byte9[2] + byte9[3] + byte9[4] + byte9[5] + byte9[6], 2)
				return peadl + '%'
			},
			//加速有效信号
			AcceleratedEffectiveSignal() {
				let byte9 = this.hextobinary(this.arrdata[9])
				let a = byte9[0]
				let Accelerated = (a == 0 && '无效') || (a == 1 && '有效')
				return Accelerated
			},
			//10 0-6:制动踏板开度  7:制动有效信号	
			BrakePedalOpening() {
				let byte10 = this.hextobinary(this.arrdata[10])
				let PedalOpening = parseInt(byte10[1] + byte10[2] + byte10[3] + byte10[4] + byte10[5] + byte10[6], 2)
				return PedalOpening + '%'
			},
			//制动有效信号
			BrakeSignal() {
				let byte10 = this.hextobinary(this.arrdata[10])
				let a = byte10[0]
				let brake = (a == 0 && '无效') || (a == 1 && '有效')
				return brake
			},
			//11
			//12 循环计数
			//13
			//14 0-1:BCM运行状态
			BCMRunningState() {
				let byte14 = this.hextobinary(this.arrdata[14])
				let a = this.bintohex(byte14[6] + byte14[7])
				let bcmstate = (a == 0 && 'Normal') || (a == 1 && 'Fault')
				return bcmstate
			},
			//15 灯光状态
			StateOfTheLight() {
				let byte15 = this.hextobinary(this.arrdata[15])
				return byte15
			},
			//16 车门状态
			StateOfTheDoor() {
				let byte16 = this.hextobinary(this.arrdata[16])
				return byte16
			},
			//17 安全状态
			SafeState() {
				let byte17 = this.hextobinary(this.arrdata[17])
				return byte17
			},
			//18 司机侧车窗开关
			DriverWindowSwitch(x, y) {
				let byte18 = this.hextobinary(this.arrdata[18])
				let a = byte18[x] + byte18[y]
				let windowstates = (a == '00' && '无动作') || (a == '01' && '上升') || (a == '10' && '下降')
				return windowstates
			},

			//19乘员侧车窗开关
			PassengersWindowSwitch(x, y) {
				let byte19 = this.hextobinary(this.arrdata[19])
				let a = byte19[x] + byte19[y]
				if(x == 6) {
					let Passengerswindowstates = (a == '00' && '无动作') || (a == '01' && '上升') || (a == '10' && '下降') || (a == '11' && '全开')
					return Passengerswindowstates
				} else {
					let Passengerswindowstates = (a == '00' && '无动作') || (a == '01' && '上升') || (a == '10' && '下降')
					return Passengerswindowstates
				}
			},
			//20 雨刮 acc
			//雨刮   acc
			WiperSwitch(x) {
				let byte20 = this.hextobinary(this.arrdata[20])
				let a = byte20[x]
				let wipers = (a == 0 && 'OFF') || (a == 1 && 'ON')
				return wipers
			},
			//21
			//22-23 电机转速
			MotorSpeed(x, y) {
				let byte2223 = this.hextodecimal(x + y)
				return(byte2223 - 10000)
			},
			//电机扭矩 24 25
			motorTorque(x, y) {
				let byte2425 = this.hextodecimal(x + y)
				return(byte2425 * 0.5 - 1500)
			},
			//电机输出功率 26.27
			MotorOutput(x, y) {
				let byte2627 = this.hextodecimal(x + y)
				return(byte2627 * 0.5 - 1000)
			},
			//28.29 预留
			//30 31  MCU母线电压
			MCUBusVoltage(x, y) {
				let byte3031 = this.hextodecimal(x + y)
				return((byte3031 / 100).toFixed(2))
			},
			//32 33 MCU母线电流
			MCUBusCurrent(x, y) {
				let byte3233 = this.hextodecimal(x + y)
				return((byte3233 / 10 - 400).toFixed(1))
			},
			//MCU温度 34
			MCUTemperature(x) {
				let byte34 = this.hextodecimal(x)
				return(byte34 - 40)
			},
			//电机温度 35
			motorTemperature(x) {
				let byte35 = this.hextodecimal(x)
				return(byte35 - 40)
			},
			//36 37 空
			//38 39 当前车速
			speedcar(x, y) {
				let byte3839 = this.hextodecimal(x + y)
				return(byte3839)
			},
			//40 41 Total mileage
			TotalMileage(x, y, z) {
				let byte4041 = this.hextodecimal(x + y + z)
				return(byte4041)
			}, // 42 43 当前电量
			amountcar(x) {
				let byte4243 = this.hextodecimal(x)
				return(byte4243)
			},
			//正常or故障
			booLean(x) {
				return(x == 0 && '正常') || (x == 1 && '故障')
			},
			//协议解析
			ByteGrouping(x) {
				var arrdatas = []
				for(let i = 0; i < x.length; i += 2) {
					arrdatas.push(x.substr(i, 2))
				}
				return arrdatas
			},
			//开始解析
			start(x) {
				this.arrdata = this.ByteGrouping(x)
				this.mcu_Working_Status = this.mcuWorkingStatus()
				this.mcu_Fault_Level = this.mcuFaultLevel()
				this.bms_High_Voltage_Output_Request_Signal = this.bmsHighVoltageOutputRequestSignal()
				this.Motor_High_Voltage_Contactor_Status = this.MotorHighVoltageContactorStatus()
				this.hvil_Status = this.hvilStatus()
				this.gears = this.gear()
				this.Motor_System_Driving_Mode = this.MotorSystemDrivingMode()
				this.Motor_System_Driving_Mode = this.MotorCurrentControlMode()
				this.Pedal_Speed = this.PedalSpeed()
				this.Accelerated_Effective_Signal = this.AcceleratedEffectiveSignal()
				this.Brake_Pedal_Opening = this.BrakePedalOpening()
				this.Brake_Signal = this.BrakeSignal()
				//循环计数
				this.BCM_Running_State = this.BCMRunningState()
				//灯光
				this.carlights = this.StateOfTheLight()
				this.cardoors = this.StateOfTheDoor()
				this.SafeStates = this.SafeState()
				//司机
				this.driverleft = this.DriverWindowSwitch(6, 7)
				this.driverright = this.DriverWindowSwitch(4, 5)
				this.driverleftrear = this.DriverWindowSwitch(2, 3)
				this.driverrightrear = this.DriverWindowSwitch(0, 1)
				//乘员
				this.skylight = this.PassengersWindowSwitch(6, 7)
				this.passengersright = this.PassengersWindowSwitch(4, 5)
				this.passengersleftrear = this.PassengersWindowSwitch(2, 3)
				this.passengersrightrear = this.PassengersWindowSwitch(0, 1)

				this.wiperhi = this.WiperSwitch(7)
				this.wiperlow = this.WiperSwitch(6)
				this.wiperint = this.WiperSwitch(5)
				this.wiperwash = this.WiperSwitch(4)
				this.wiperrear = this.WiperSwitch(3)
				this.wiperrearwash = this.WiperSwitch(2)
				//acc
				this.acc = this.WiperSwitch(1)
				this.Motor_Speed = this.MotorSpeed(this.arrdata[23], this.arrdata[22]) + 'rpm'
				this.motor_Torque = this.motorTorque(this.arrdata[25], this.arrdata[24]) + 'Nm'
				this.Motor_Output = this.MotorOutput(this.arrdata[27], this.arrdata[26]) + 'kw'
				this.MCU_Voltage = this.MCUBusVoltage(this.arrdata[31], this.arrdata[30]) + 'V'
				this.MCU_Current = this.MCUBusCurrent(this.arrdata[33], this.arrdata[32]) + 'A'
				this.MCU_t = this.MCUTemperature(this.arrdata[34]) + '℃'
				this.motor_t = this.motorTemperature(this.arrdata[35]) + '℃'

				this.speed_car = this.speedcar(this.arrdata[39], this.arrdata[38]) + 'Km/h'
				this.Total_Mileage = this.TotalMileage(this.arrdata[42], this.arrdata[41], this.arrdata[40]) + 'Km'
				this.amount_car = this.amountcar(this.arrdata[43]) + '%'
			},

			//实时请求数据
			request() {
				this.tokenencryption()
				this.$http
					.post(this.base + "/yw/upload/selectCarStateInstruct", JSON.stringify({
						encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
						timeStamp: this.nowtimestamp,
						sourceForm: '2',
						tid: this.cartid
					}), {
						emulateJSON: true
					}).then(res => {
						if(res.body.data) {

							this.carinstructs = res.body.data;
							this.time8001 = this.carinstructs['8001Time']
							this.time8002 = this.carinstructs['8002Time']
							this.time8003 = this.carinstructs['8003Time']
							if(parseInt(this.carinstructs.isStart) && this.carisonline == '在线') {
								this.isstart = '启动'
								this.runtimeshow = true
								let starttime = parseInt(this.carinstructs.startTime / 1000)
								let nowtime = Date.parse(new Date()) / 1000
								if(nowtime - starttime < 60) {
									this.runtime = nowtime - starttime + '秒'
								} else if(60 < nowtime - starttime && nowtime - starttime < 3600) {
									this.runtime = parseInt((nowtime - starttime) / 60) + '分钟' + (nowtime - starttime) % 60 + '秒'
								} else {
									this.runtime = parseInt((nowtime - starttime) / 3600) + '小时 ' + parseInt(((nowtime - starttime) % 3600) / 60) + '分钟' + ((nowtime - starttime) % 3600) % 60 + '秒'
								}
							} else {
								this.isstart = '未启动'
								this.runtimeshow = false
							}
							if(this.carinstructs[8001]) {
								this.start(this.carinstructs[8001])
							}
							//
							if(this.carinstructs[8003] && this.mcu_Fault_Level != '无故障') {
								this.errorshow = true
								this.arrdata8003 = this.ByteGrouping(this.carinstructs[8003])
								if(this.mcu_Fault_Level == '一级故障') {
									this.errora = true
									this.errorb = false
									this.errorc = false

									let errordatasA = this.hextobinary(this.arrdata8003[7]).concat(this.hextobinary(this.arrdata8003[8]))
									for(let i = 0; i < errordatasA.length; i++) {
										this.errordataA.push(this.booLean(errordatasA[i]))
									}
								}
								if(this.mcu_Fault_Level == '二级故障') {
									this.errora = false
									this.errorb = true
									this.errorc = false
									let errordatasB = this.hextobinary(this.arrdata8003[10]).concat(this.hextobinary(this.arrdata8003[11]))
									for(let i = 0; i < errordatasB.length; i++) {
										this.errordataB.push(this.booLean(errordatasB[i]))
									}

								}
								if(this.mcu_Fault_Level == '无故障') {
									this.errora = false
									this.errorb = false
									this.errorc = true
									let errordatasC = this.hextobinary(this.arrdata8003[13])
									for(let i = 0; i < errordatasC.length; i++) {
										this.errordataC.push(this.booLean(errordatasC[i]))
									}
								}
							}
						} else {
							this.runtimeshow = false
						}
					});
			},
			handlemain(index) {
				this.time8001 = ''
				this.time8002 = ''
				this.time8003 = ''
				this.gpstime = ''
				this.windows = ''
				this.isstart = ''
				this.runtime = ''
				this.mcu_Working_Status = ''
				this.mcu_Fault_Level = ''
				this.bms_High_Voltage_Output_Request_Signal = ''
				this.Motor_High_Voltage_Contactor_Status = ''
				this.hvil_Status = ''
				this.gears = ''
				this.Motor_System_Driving_Mode = ''
				this.Motor_System_Driving_Mode = ''
				this.Pedal_Speed = ''
				this.Accelerated_Effective_Signal = ''
				this.Brake_Pedal_Opening = ''
				this.Brake_Signal = ''
				//循环计数
				this.BCM_Running_State = ''
				//灯光
				this.carlights = []
				this.cardoors = []
				this.SafeStates = []
				//司机
				this.driverleft = ''
				this.driverright = ''
				this.driverleftrear = ''
				this.driverrightrear = ''
				//乘员
				this.skylight = ''
				this.passengersright = ''
				this.passengersleftrear = ''
				this.passengersrightrear = ''
				this.wiperhi = ''
				this.wiperlow = ''
				this.wiperint = ''
				this.wiperwash = ''
				this.wiperrear = ''
				this.wiperrearwash = ''
				//acc
				this.acc = ''
				this.Motor_Speed = ''
				this.motor_Torque = ''
				this.Motor_Output = ''
				this.MCU_Voltage = ''
				this.MCU_Current = ''
				this.MCU_t = ''
				this.motor_t = ''
				this.speed_car = ''
				this.Total_Mileage = ''
				this.amount_car = ''
				this.value3 = '',
					this.value4 = '',
					this.startTime = '',
					this.endTime = '',
					this.vxdata = [],
					this.socydata = [],
					this.vtotal = [],
					this.atotal = [],
					this.Ttotal = [],

					this.seegps = false;
				
				this.carid = this.usercarlist[index].id;
				this.sunid = this.usercarlist[index].tid;
				if(this.usercarlist[index].isonline == 1) {
					this.carisonline = "在线";
				} else {
					this.carisonline = "离线";
				}
				this.cartid = this.usercarlist[index].tid;
				//清除计时器;
				clearInterval(this.interval);
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.request();
					this.handleMap(index);
				}, 100);
				this.interval = setInterval(() => {
					this.request();
				}, 10000);
				//获取定位

				//绘制折线图
				this.hour1();
				//绘制里程
				this.searchfirst()

			},
			//根据时间绘制折线
			hour1() {
				this.onehour(1);
				this.getvlinedata(this.startTime, this.endTime, "02");
			},
			hour3() {
				this.onehour(3);
				this.getvlinedata(this.startTime, this.endTime, "02");
			},
			hour6() {
				this.onehour(6);
				this.getvlinedata(this.startTime, this.endTime, "02");
			},
			hour24() {
				this.onehour(24);
				this.getvlinedata(this.startTime, this.endTime, "02");
			},
			//折线图search方法
			search() {
				if(this.value3) {
					var date = new Date(this.value3[1]);
					this.endTime = Date.parse(date)
					var oneweekdate = new Date(this.value3[0]);
					this.startTime = Date.parse(oneweekdate)
					this.getvlinedata(this.startTime, this.endTime, "02");
				} else {
					this.$message({
						type: "warning",
						message: "请选择时间范围"
					});
				}
			},
			//获取电压折线图数据
			getvlinedata(st, et, a) {
				this.tokenencryption()
				this.lineshow = true
				this.$http
					.post(this.base + "/yw/upload/queryInstructByTime", JSON.stringify({
						encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
						timeStamp: this.nowtimestamp,
						sourceForm: '2',
						tid: this.sunid,
						startTime: st,
						endTime: et,
						deviceCode: a,
						functionCode: '80'
					}), {
						emulateJSON: true
					})
					.then(res => {
						if(res.body.type == 0) {
							
							//电量
							var instructsdata = [];
							var instructsV = [];
							var instructsA = [];
							var instructsT = [];
							var instructsTime = [];
							for(var i = 0; i < res.body.data.length; i++) {
								var date = new Date(parseInt(res.body.data[i].createTime));
								var year = date.getFullYear(); //获取当前年份
								var mon = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; //获取当前月份
								var da = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //获取当前日
								var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取小时
								var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //获取分钟
								var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //获取秒
								var instime = year + "-" + mon + "-" + da + " " + h + ":" + m + ":" + s;
								instructsTime.push(instime)
								let datas = this.ByteGrouping(res.body.data[i].instruct)
								instructsdata.push(
									this.amountcar(datas[27])
								)

								instructsV.push(
									this.MCUBusVoltage(datas[15], datas[14])
								)
								instructsA.push(
									this.MCUBusCurrent(datas[17], datas[16])
								)
								instructsT.push(
									this.MCUTemperature(datas[18])
								)
							}
							this.vxdata = instructsTime,
								this.socydata = instructsdata,
								this.vtotal = instructsV,
								this.atotal = instructsA,
								this.Ttotal = instructsT,
								
								this.drawvLineChart()
						} else {
							this.$message({
								type: "warning",
								message: "折线图无数据"
							});
							this.lineshow = false
							this.startTime = '',
								this.endTime = '',
								this.vxdata = [],
								this.socydata = [],
								this.vtotal = [],
								this.atotal = [],
								this.Ttotal = [],
								
								this.drawvLineChart()
						}

					});
			},
			//绘制电压电流电量折线图
			drawvLineChart() {
				this.vLine = echarts.init(document.getElementById("vLine"));
				this.vLine.setOption({
					title: {
						text: "车辆信息"
					},
					tooltip: {
						trigger: "axis"
					},
					legend: {
						data: [
							"电量",
							"MCU母线电压",
							"MCU母线电流",
							"MCU温度"
						]
					},
					grid: {
						show: true,
						left: "3%",
						right: "3%",
						bottom: "3%",
						containLabel: true
					},
					xAxis: {
						splitArea: {
							show: true
						}, //保留网格区域
						boundaryGap: false,
						interval: 10,
						data: this.vxdata
					},
					yAxis: {
						name: "电压:V 电流:A",
						splitArea: {
							show: true
						}, //保留网格区域
						//						type: 'value',
						splitLine: {
							show: true
						},
						//						interval: 10
					},
					series: [{
							name: "电量",
							type: "line",
							showSymbol: false,
							smooth: true,
							smoothMonotone: "x",
							data: this.socydata
						}, {
							name: "MCU母线电压",
							type: "line",
							showSymbol: false,
							smooth: true,
							smoothMonotone: "x",
							data: this.vtotal
						},
						{
							name: "MCU母线电流",
							type: "line",
							showSymbol: false,
							smooth: true,
							data: this.atotal
						},
						{
							name: "MCU温度",
							type: "line",
							showSymbol: false,
							smooth: true,
							data: this.Ttotal
						}
					]
				});
			},

			//绘制里程统计
			//默认本月里程
			searchfirst() {
				var datea = new Date()
				var yeara = datea.getFullYear(); //获取当前年份
				var mona = datea.getMonth() + 1 < 10 ? "0" + (datea.getMonth() + 1) : datea.getMonth() + 1; //获取当前月份
				var nowtime = yeara + "-" + mona + "-" + '01' + " " + '00' + ":" + '00' + ":" + '00';
				this.value4 = new Date(nowtime)
				this.searchbymouth()
			},
			//里程
			searchbymouth() {
				if(this.value4) {
					var date = new Date(this.value4);
					var year = date.getFullYear(); //获取当前年份
					var mon = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1; //获取当前月份
					var da = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //获取当前日
					var h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //获取小时
					var m = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //获取分钟
					var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //获取秒					
					this.endbymouth = year + "-" + mon + "-" + 31
					var oneweekdate = new Date(date - 1);
					var year1 = oneweekdate.getFullYear(); //获取当前年份
					var mon1 = oneweekdate.getMonth() + 1 < 10 ? "0" + (oneweekdate.getMonth() + 1) : oneweekdate.getMonth() + 1; //获取当前月份
					var da1 = oneweekdate.getDate() < 10 ? "0" + oneweekdate.getDate() : oneweekdate.getDate(); //获取当前日
					this.startbymouth = year1 + "-" + mon1 + "-" + da1
					//绘制柱状图
					//获取里程数据
					this.barshow = true
					this.tokenencryption()
					this.$http.post(this.base + "/yw/calculate/selectByTime", JSON.stringify({
						encryptSign: String(this.$md5(this.nowtimestamp + this.appkey).toUpperCase()),
						timeStamp: this.nowtimestamp,
						sourceForm: '2',
						tid: String(this.sunid),
						start: String(this.startbymouth),
						end: String(this.endbymouth),
						deviceCode: '02',
						functionCode: '80'
					}), {
						emulateJSON: true
					}).then(res => {
						if(res.body.type == 0) {
							var mileagexdata = []
							var mileageydata = []
							if(res.body.data.length == 1) {
								mileagexdata.unshift(res.body.data[0].time.substring(8))
								this.arrdata8002 = this.ByteGrouping(res.body.data[0].instruct)
								mileageydata.unshift(this.TotalMileage(this.arrdata8002[24], this.arrdata8002[25], this.arrdata8002[26]) - 0)
							} else {
								for(var i = 0; i < res.body.data.length - 1; i++) {
									mileagexdata.unshift(res.body.data[i].time.substring(8))
									this.arrdata8002 = this.ByteGrouping(res.body.data[i].instruct)
									this.arrdata8002y = this.ByteGrouping(res.body.data[i + 1].instruct)
									mileageydata.unshift(this.TotalMileage(this.arrdata8002[24], this.arrdata8002[25], this.arrdata8002[26]) - this.TotalMileage(this.arrdata8002y[10], this.arrdata8002y[11], this.arrdata8002y[12]))
								}
							}

							this.mileageX = mileagexdata
							this.mileageY = mileageydata
							this.drawbarmileage(this.mileageX, this.mileageY)

						} else {
							this.barshow = false
							this.mileageX = []
							this.mileageY = []
							this.drawbarmileage(this.mileageX, this.mileageY)
							this.$message({
								type: "warning",
								message: "里程暂无数据"
							});
						}
					});

				} else {
					this.$message({
						type: "warning",
						message: "请选择时间范围"
					});
				}
			},
			drawbarmileage(x, y) {
				this.mileageBar = echarts.init(document.getElementById('mileageBar'));
				this.mileageBar.setOption({
					title: {
						text: '里程'
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter: '日期 : {b0} 号</br>{a0}: {c0} km'
					},
					grid: {
						show: true,
						left: "1%",
						right: "1%",
						bottom: "1%",
						containLabel: true
					},
					xAxis: {
						splitArea: {
							show: true
						}, //保留网格区域
						boundaryGap: true,
						data: x
					},
					yAxis: {
						name: '里程:Km',
						interval: 5,
						splitArea: {
							show: true
						}, //保留网格区域
						type: "value",
						splitLine: {
							show: true
						}
					},
					series: [{
						name: '里程',
						type: "bar",
						barMaxWidth: 15, //最大宽度
						showSymbol: false,
						itemStyle: {
							normal: {
								color: '#008B00'
							}
						},
						data: y
					}]
				});
			},
			//跳转历史轨迹
			loadgps() {
				clearInterval(this.interval);
				clearTimeout(this.timeout);
				sessionStorage.setItem("sunid", this.sunid);
				sessionStorage.setItem("carid", this.carid);
				this.$router.push("/gpsService");
			},

			//获取时间选择器时间

			//获取当前时间
			//hour 小时之前
			onehour(hour) {

				var date = new Date();
				this.endTime = Date.parse(date);
				var oneweekdate = new Date(date - hour * 60 * 60 * 1000);
				this.startTime = Date.parse(oneweekdate);
				this.value3 = [oneweekdate, date];
			},
			//坐标系转换
			delta(lat, lon) {
				// Krasovsky 1940
				//
				// a = 6378245.0, 1/f = 298.3
				// b = a * (1 - f)
				// ee = (a^2 - b^2) / a^2;
				var a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
				var ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
				var dLat = this.transformLat(lon - 105.0, lat - 35.0);
				var dLon = this.transformLon(lon - 105.0, lat - 35.0);
				var radLat = lat / 180.0 * this.PI;
				var magic = Math.sin(radLat);
				magic = 1 - ee * magic * magic;
				var sqrtMagic = Math.sqrt(magic);
				dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * this.PI);
				dLon = dLon * 180.0 / (a / sqrtMagic * Math.cos(radLat) * this.PI);
				return {
					lat: dLat,
					lon: dLon
				};
			},
			transformLat(x, y) {
				var ret = -100.0 +
					2.0 * x +
					3.0 * y +
					0.2 * y * y +
					0.1 * x * y +
					0.2 * Math.sqrt(Math.abs(x));
				ret +=
					(20.0 * Math.sin(6.0 * x * this.PI) +
						20.0 * Math.sin(2.0 * x * this.PI)) *
					2.0 /
					3.0;
				ret +=
					(20.0 * Math.sin(y * this.PI) + 40.0 * Math.sin(y / 3.0 * this.PI)) *
					2.0 /
					3.0;
				ret +=
					(160.0 * Math.sin(y / 12.0 * this.PI) +
						320 * Math.sin(y * this.PI / 30.0)) *
					2.0 /
					3.0;
				return ret;
			},
			transformLon(x, y) {
				var ret =
					300.0 +
					x +
					2.0 * y +
					0.1 * x * x +
					0.1 * x * y +
					0.1 * Math.sqrt(Math.abs(x));
				ret +=
					(20.0 * Math.sin(6.0 * x * this.PI) +
						20.0 * Math.sin(2.0 * x * this.PI)) *
					2.0 /
					3.0;
				ret +=
					(20.0 * Math.sin(x * this.PI) + 40.0 * Math.sin(x / 3.0 * this.PI)) *
					2.0 /
					3.0;
				ret +=
					(150.0 * Math.sin(x / 12.0 * this.PI) +
						300.0 * Math.sin(x / 30.0 * this.PI)) *
					2.0 /
					3.0;
				return ret;
			},
			//GPS---高德
			gcj_encrypt(wgsLat, wgsLon) {
				var d = this.delta(wgsLat, wgsLon);
				var la = parseFloat(wgsLat) + parseFloat(d.lat);
				return [
					parseFloat(wgsLon) + parseFloat(d.lon),
					parseFloat(wgsLat) + parseFloat(d.lat)
				];
			},

		},
		mounted() {
			this.getcarList();
		},
		beforeRouteLeave(to, from, next) {
			next()
			clearInterval(this.interval);
			clearTimeout(this.timeout);

		}

	};
</script>

<style scoped>
	li {
		list-style-type: none;
	}
	
	p,
	ul {
		padding: 0;
		margin: 0;
	}
	
	.userphone {
		width: 240px;
		color: #333;
		font-weight: bold;
		height: 80px;
		background: #f0f8ff;
		text-align: center;
		line-height: 80px;
		margin-top: 15px;
	}
	
	.carsindex {
		width: 240px;
		height: 160px;
		padding: 0;
		background: #f0f8ff;
		font-weight: bold;
		text-align: center;
	}
	
	.amap-wrapper {
		width: 95%;
		height: 500px;
		margin: 0 auto;
		margin-bottom: 20px;
	}
	
	.cartitle {
		font-size: 18px;
		width: 95%;
		margin: 8px auto;
		background: #f0f8ff;
		height: 35px;
		line-height: 35px;
	}
	
	.cargps {
		font-size: 18px;
		width: 95%;
		margin: 8px auto;
		background: #f0f8ff;
		height: 35px;
		line-height: 35px;
	}
	
	.carinfo {
		width: 95%;
		margin: 5px auto;
	}
	
	.fault1 {
		color: red;
	}
	
	.stateswrap {
		width: 100%;
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
	}
	
	.states,.states1{
		width: 90px;
		height: 90px;
		/*background: #f0f8ff;*/
		text-align: center;
		font-weight: bold;
		color: #666;
		margin: 10px;
	}
	.states1{
		background: none;
	}
	.statesa {
		width: 90px;
		height: 90px;
		text-align: center;
		/*background: #f0f8ff;*/
	}
	
	.states-content,
	.carError {
		margin-top: 30px;
		font-size: 15px;
		font-weight: bold;
	}
	
	.carError {
		width: 95%;
		margin: 5px auto;
	}
	
	.states-now {
		color: red;
	}
	
	.states-line {
		margin-top: 20px;
	}
	
	.states-name {
		margin-left: 30px;
	}
	
	.states img {
		width: 70%;
	}
	
	.carinfo-wrap {
		margin-top: 20px;
		font-weight: bold;
	}
	
	.carinfo-row {
		margin-left: 50px;
	}
	
	.carline-wrap {
		width: 95%;
		margin: 2px auto;
	}
	
	.carline-wrapA {
		padding-bottom: 0px;
		margin-top: 2px;
	}
	
	.grid-content {
		margin-top: 20px;
		margin-left: 5px;
		border: 1px solid #E4E4E4;
		border-radius: 15px;
		min-height: 260px;
	}
	
	.contitle {
		font-size: 18px;
		text-align: center;
		padding-top: 5px;
		font-weight: bold;
	}
	
	.conlight {
		display: flex;
		flex-wrap: wrap;
		padding: 5px;
		padding-top: 0;
	}
	
	.lightwrap {
		width: 445px;
	}
	
	.carconwrap {
		width: 550px;
	}
	
	.infowrap {
		width: 1015px;
		margin-top: 15px;
	}
	.tablerow{
		height: 40px;
		line-height: 40px;
		color: #666;
		font-weight: bold;
		padding: 5px;
		display: inline-block;
	}
	.tablerowa{
		display: inline-block;
		width: 120px;
		height: 40px;
		text-align: center;
		background: #E4E7ED;
		border-radius: 8px;
	}
	.tablerowb{
		display: inline-block;
		width: 180px;
		height: 40px;
		color: red;
		text-align: center;
		background: #E4E7ED;
		vertical-align: middle;
		border-radius: 8px;
	}
	.mcuWrap,.motorWrap{
		margin-top: 20px;
		margin-left: 5px;
		border: 1px solid #E4E4E4;
		border-radius: 15px;
		min-height: 260px;
		
	}
	.motorWrap{
		width: 680px;
	}
	.motorline,.mculine{
		height: 40px;
		line-height: 40px;
		color: #666;
		font-weight: bold;
		padding: 5px;
		display: inline-block;
	}
	.mcuWrap{
		width: 335px;
	}
	.motorrowa{
		display: inline-block;
		width: 200px;
		height: 40px;
		text-align: center;
		background: #E4E7ED;
		border-radius: 8px;
	}
	.motorrowb{
		border-radius: 8px;
		display: inline-block;
		width: 105px;
		height: 40px;
		text-align: center;
		background: #E4E7ED;
		color: red;
		vertical-align: middle;
	}
	.carwindow{
		margin-top: 20px;
		border: 1px solid #E4E4E4;
		border-radius: 15px;
		min-height: 160px;
		width: 1010px;
		padding: 10px;
	}
	.windowrowa{
		display: inline-block;
		width: 180px;
		height: 30px;
		text-align: center;
		/*background: #E4E7ED;*/
	}
	.windowrowb{
		display: inline-block;
		width: 50px;
		height: 30px;
		border-radius: 8px;
		text-align: center;
		background: #E4E7ED;
		color: red;
		vertical-align: middle;
	}
	.windowline{
		height: 30px;
		line-height: 30px;
		color: #666;
		font-weight: bold;
		padding: 5px;
		display: inline-block;
	}
	.carinfoTime{
		font-size: 16px;
		font-weight: bold;
	}
	
</style>