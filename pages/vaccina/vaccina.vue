<template>
	<view>
		<view class="header">
			<view class="content">
				<view class="contact" @click='contact'>联系我们 > </view>
			</view>
		
		</view>
		<view class="searchs">
			<text class="title">接种点列表</text>
			<text class="tip">已覆盖21省117个城市，持续跟新中...</text>
			<view class="searchBox">
				<!-- 替换组件的搜索图标 -->
				<uni-search-bar placeholder="搜索接种点" @confirm="search" @cancel="cancel" cancel-text="取消">
				    <uni-icons slot="searchIcon" color="#999999" size="18" type="search" />
				</uni-search-bar>
			</view>
			
			<view class="map">
				<view class="box" @click="mapClick">
					<text>{{address}}接种点</text>
				</view>
			</view>
			<!-- //后端循环数据 -->
			<view class="item">
				<view class="left">
					<uni-badge text="3" type="warning" ></uni-badge>
				</view>
				
				<view class="center">
					<text class="name">嘻嘻哈哈服务中心嘻嘻哈哈服务中心</text>
					<text class="address">地址:嘻嘻哈哈街道45号</text>
				</view>
				<view class="right">
					<uni-icons type="location-filled" size="20" color="blue"></uni-icons>
					<view>333.4km</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		components:{mSearch},
		data() {
			return {
				//获取地址蓝参数
					address:''
				}
		},
	
		onLoad(options) {
			//地址传参
			this.address= options.planLocate
		
		},
		methods: {
			mapClick(){
				
				uni.navigateTo({
				  url: '/pages/map/map',
				})
			},
			search(){
				
			},
			cancel(){
				
			},
			//联系我们
			contact(){
				
			},
			//
			blur() {
			            console.log(3);
			          
			        },
		},
	}
</script>

<style lang="scss">
	.header{
		width: 750rpx;
		height: 300rpx;
	}
	.content{
		width: 750rpx;
		height: 300rpx;
		background-color: #007AFF;
		position: absolute;
	}
	.contact{
		text-align: center;
		width: 25%;
		position: relative;
		bottom: -100px;
		left:139px;
		border-radius: 20px;
		border: 1px #fff solid ;
		padding: 5px;
		color: #fff;
	}
	.searchs{
		padding: 10px 0;
	}
	.title{
		
		color: #000;
		font-weight: bold;
		font-size: 16px;
		padding: 5px 20px;
	}
	.tip{
		color: #F0AD4E;
		font-size: 12px;
		text-align: right;
	},
	.searchBox{
		margin: 0 auto;
		width: 600rpx;
		height: 120rpx;
	
	}
	.map{
		width: 750rpx;
		border-top: 1px solid #ccc;
		
	}
	.box{
		width: 500rpx;
		margin: 20px auto;
		height: 100rpx;
		background: #007AFF;
		text-align: center;
		line-height: 100rpx;
	}
	.item{
		display: flex;
		border-bottom: 1px solid #ccc;
	}
	.item .left{
		width:100rpx ;
	}
	.item .right{
		width: 200rpx;
		text-align: center;
	}
	.item .center{
		flex:1
	}
	.item .center .name{
		
		font-size: 16px;
		display: block;
		margin-bottom: 10px;
	}
	.item .center .address{
		font-size: 12px;
		display: block;
		color: #ccc;
		margin-bottom: 10px;
	}
</style>
