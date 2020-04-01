<template>
	<div>
		<router-view></router-view>
		<div class="footer">
			<a href="https://github.com/ty4z2008/frontend-nav" target="_blank" class="copyright">
				<img src="/assets/images/icon/github-favicon.svg"/> Code of this site
			</a>
			<a href="https://t.me/scalesystem" target="_blank" title="构建大规模分布式系统" class="copyright">
				<img src="/assets/images/icon/telegram-favicon.png"/> Scale System
			</a>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
	components: {}
})
export default class App extends Vue {}
</script>

<style>
html{
	height: 100%;
	overflow-y: auto;
}
body{
	font-size: 13px;
	margin:0;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color:#eff3f6;
	height: 100%;
}
a{
	color: #1890ff;
	text-decoration: none;
	background-color: transparent;
	outline: none;
	cursor: pointer;
	-webkit-text-decoration-skip: objects;
	-webkit-transition: color .3s ease;
	transition: color .3s ease;
}
.footer{
	display: flex;
	align-items: center;
	justify-content: center;
}
.copyright{
	color: #000;
	font-size: 14px;
	display: flex;
	justify-content: center;
	text-align: center;
	align-items: center;
	line-height: 40px;
}
.copyright+.copyright{
	margin-left:10px;
}
.copyright:hover{
	text-decoration: underline;
}
.copyright img{
	margin-right: 3px;
	width: 20px;
	height: 20px;
	overflow: hidden;
}
*{
	background-repeat: no-repeat;
	box-sizing: border-box;
}
</style>
