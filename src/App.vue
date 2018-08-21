<template>
  <div id="app">
    <transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body,html{
	margin: 0px;
	padding: 0px;
	min-width:1400px;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
	height: 100%;
}

#app {
	min-width:1400px;
	height: 100%;
}
.canvas1 {
	background: #fff;
    	position: fixed;
    	z-index: -1;
	}
.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

.toolbar {
	background: #f2f2f2;
	padding: 5px;
	margin: 5px 0px;
	height: 44px;
	.el-form-item {
		margin-bottom: 5px;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
a{
	text-decoration: none;
}
.full{
	height: 100%;
}
.el-table-owner{
	width: 100%;
	font-size: 12px;
	line-height: 12px;
	height: 85%;
}
</style>
