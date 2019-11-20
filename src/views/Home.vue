<template>
	<div class="home">
		<nav class="navbar">
			<div class="navbar-toggle" @click="toggleMenu">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</div>
			<div class="sidebar">
				<a class="logo" href="/">
					Web前端导航
				</a>
				<transition name="menu">
					<div class="menu" v-show="showMenu" :class="{'active':showMenu}">
						<a class="menu-item" :class="{'active':currentAnchor==item['id']}" @click="setActiveAnchor(item['id'])" :href="'/#'+item['id']" v-for="(item,idx) in menu" :key="idx">
							{{item['name']}}
						</a>
					</div>
				</transition>
			</div>
		</nav>
		<div class="container">
			<div class="block" :id="item['id']" v-for="(item,idx) in menu" :key="idx">
				<div class="header">{{item['name']}}</div>
				<div>
					<a :href="field['url']" class="item"  v-for="(field,key) in list[item['id']]" :key="key">
						<div class="logo">
							<img :src="field['logo']" :alt="field['name']">
						</div>
						<div class="card-body">
							<div class="name" :title="field['name']">
								{{field['name']}}
							</div>
							<div class="desc" :title="field['desc']">
								{{field['desc']}}
							</div>
						</div>
						<div class="card-footer">More</div>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { menu, list } from '../assets/navigation.json'
import Vue from 'vue'
const cubic = (value :number) :number => Math.pow(value, 3)
const easeInOutCubic = (value :number) :number => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2

export default Vue.extend({
	name: 'Home',
	data () {
		return {
			menu: menu,
			list: list,
			el: document.body,
			showMenu: false,
			currentAnchor: ''
		}
	},
	methods: {
		toggleMenu ():void {
			this.showMenu = !this.showMenu
		},
		setActiveAnchor (anchor:string):void {
			this.currentAnchor = anchor
			this.showMenu = false
			let anchorBlock = document.querySelector(`#${anchor}`) as HTMLElement
			if (!anchorBlock) return
			let offsetTop = anchorBlock.offsetTop
			this.scrollTo(offsetTop)
		},
		scrollTo (offset :number) {
			const el = document.body as HTMLElement
			const beginTime = Date.now()
			const beginValue = el.scrollTop
			const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
			const frameFunc = () => {
				const progress = (Date.now() - beginTime) / 500
				if (progress < 1) {
					el.scrollTop = offset > beginValue ? offset - (offset - beginValue) * (1 - easeInOutCubic(progress)) : offset + (beginValue - offset) * (1 - easeInOutCubic(progress))
					rAF(frameFunc)
				} else {
					el.scrollTop = offset
				}
			}
			rAF(frameFunc)
		},
		/**
		 * init page
		 */
		init ():Boolean {
			let anchor = location.hash
			if (anchor) {
				let anchorBlock = document.querySelector(anchor) as HTMLElement
				if (!anchorBlock) return false
				let offsetTop = anchorBlock.offsetTop
				this.scrollTo(offsetTop)
				this.currentAnchor = anchor.replace(/#/, '')
			}
			return true
		}
	},
	mounted () {
		this.$nextTick(() => {
			this.init()
		})
	}
})
</script>
<style scoped>
.home{
	display: flex;
}
.home .sidebar{
	display: flex;
	box-sizing: border-box;
	flex-direction: column;
	color: #6b7386;
}
.navbar{
	z-index: 2;
	position: fixed;
	left: 0;
	top: 0;
	width: 160px;
	height: 100vh;
	background: #30333c;
}
.navbar .navbar-toggle {
	background: rgba(0,0,0,0.6);
	position: absolute;
	right: 10px;
	top: 10px;
	right: 10px;
	padding: 9px 10px;
	border: 1px solid transparent;
	border-radius: 4px;
	cursor: pointer;
	z-index: 20;
}
.navbar-toggle:hover,.navbar-toggle:focus{
	background: rgba(0,0,0,0.85);
}
.navbar-toggle .icon-bar {
	display: block;
	width: 22px;
	background-color: #fff;
	height: 2px;
	border-radius: 1px;
	margin-bottom: 4px;
}
.navbar-toggle .icon-bar:last-child{
	margin-bottom: 0;
}

.sidebar .logo{
	color: rgba(255, 255, 255, 0.9);
	font-size: 18px;
	text-align: center;
	height: 53px;
	line-height: 53px;
	font-weight: bold;
	display: block;
	overflow: hidden;
}

.sidebar .logo:hover{
	color:#fff;
}
.sidebar .menu{
	list-style: none;
	overflow: hidden;
	overflow-y: auto;
	-webkit-transition-property: height, visibility;
	-o-transition-property: height, visibility;
	transition-property: height, visibility;
	-webkit-transition-duration: 0.25s;
	-o-transition-duration: 0.25s;
	transition-duration: 0.25s;
	-webkit-transition-timing-function: ease-in-out;
	-o-transition-timing-function: ease-in-out;
	transition-timing-function: ease-in-out;
}
.home .sidebar .menu.active{
	position: relative;
	height: 200px;
	visibility: visible;
}

.sidebar .menu-item{
	color: #fff;
	text-decoration: none;
	line-height: 40px;
	height: 40px;
	display: -webkit-box;
	font-size: 13px;
	display: -ms-flexbox;
	display: flex;
	position: relative;
	padding-left: 15px;
}
.sidebar .menu-item.active,.sidebar .menu-item:not(.active):hover{
	background: rgba(0,0,0,0.6);
}
.sidebar .menu-item.active:before{
	content: '';
	position: absolute;
	left:0;
	top:0;
	height: 100%;
	width:3px;
	background:#1890ff;
}
.home .container{
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	position: relative;
	-webkit-box-orient: vertical;
	-ms-flex-direction: column;
	flex-direction: column;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	margin-left: 160px;
	width: 100%;
	padding: 20px;
}
.container .block{
	border-radius: 5px;
	background: #fff;
	color: inherit;
	display: block;
	padding: 0 15px;
	margin-bottom: 15px;
}
.container .block .header{
	line-height: 40px;
	padding:5px;
	font-size: 18px;
}
.container .item{
	background: #fff;
	color: #616161;
	display: inline-block;
	font-size: 13px;
	padding:  0 10px;
	margin-right: 20px;
	margin-bottom: 20px;
	overflow: hidden;
	transition: box-shadow 135ms cubic-bezier(.4,0,.2,1),width 235ms cubic-bezier(.4,0,.2,1);
	vertical-align: top;
	width: 240px;
	z-index: 1;
	box-shadow: 0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16);
	transition: box-shadow 135ms cubic-bezier(.4,0,.2,1);
	-webkit-tap-highlight-color: transparent;
	will-change: transform,opacity;
	overflow: hidden;
	height:125px;
	position: relative;
}
.container .item:last-child{
	margin-right: 0;
}
.container .item:focus,.container .item:hover {
	box-shadow: 0 1px 3px 1px rgba(60,64,67,.2),0 2px 8px 4px rgba(60,64,67,.1)
}
.container .item .logo{
	background-size: cover;
	border-radius: 50%;
	float: left;
	margin-top: 16px;
	margin-right: 20px;
	height: 44px;
	width: 44px;
	background-color: #fafafa;
	overflow: hidden;
	display: inline-flex;
	justify-content: center;
	align-items: center;
}
.container .item .logo img{
	width: 100%;
}
.container .item .card-body{
	height:80px;
	padding-top: 20px;
}
.container .item .name{
	font-size: 15px;
	color: #212121;
	font-size: inherit;
	font-weight: 500;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	line-height: 1.2;
	margin: 0 0 8px;
}
.container .item .desc{
	font-size: 13px;
	color:#30333c;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	display: -webkit-box;
	white-space: normal;
	font-weight: 400;
	/* margin: 0 0 16px; */
	max-height:70px;
	overflow: hidden;
	word-break: break-all;
}
.container .item .card-footer{
	clear: left;
	margin: 0;
	position: relative;
	color: inherit;
	padding: 16px 10px 12px;
	text-decoration: none;
	display: flex;
	justify-content: flex-end;
}
@media (min-width: 992px){
	.navbar-toggle {
		display: none;
	}
	.home .sidebar .menu {
		display: block !important;
	}
	.navbar-header {
		float: left;
	}
}
@media screen and (max-width:992px) {
	.home .navbar{
		width:100%;
		height: auto;
	}
	.home .sidebar .menu{
		height: 0;
		visibility: hidden;
	}
	.home .container{
		margin-left:auto;
		margin-top: 50px;
	}
	.container .item{
		width: 100%;
		display: block;
	}
	.sidebar .menu-item{
		text-align: center;
		align-items: center;
		justify-content: center;
	}
}

</style>
