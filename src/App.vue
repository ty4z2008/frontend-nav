<template>
	<div>
		<router-view></router-view>
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
	overflow: hidden;
	height: 100%;
}
body{
	font-size: 13px;
	margin:0;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	background-color:#eff3f6;
	height: 100%;
	overflow-y: auto;
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
*{
	background-repeat: no-repeat;
	box-sizing: border-box;
}
</style>
