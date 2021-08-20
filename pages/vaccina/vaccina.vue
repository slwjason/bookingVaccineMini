<template>
	<view>
	
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
				<view class="selectAddress">
					<AddressPicker @change="change" :level="3">{{planLocate}}
					<view class="container"></view>
					</AddressPicker> 
				</view>
				<view class="box" @click="mapClick">
					<text>查看接种点</text>
				</view>
			</view>
			<!-- //后端循环数据 -->
			<view class="item" v-for="(item,index) in points" :key='item.id'>
				<view class="left">
					<uni-badge :text="(index+1)" type="warning" ></uni-badge>
				</view>
				
				<view class="center">
					<text class="name">{{item.name}}</text>
					<text class="address">地址:{{item.address}}</text>
				</view>
				<view class="right">
					<uni-icons type="location-filled" size="20" color="blue"></uni-icons>
					<view>{{item.distance}}km</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import AddressPicker from "@/components/lingdang-AddressPicker/AddressPicker.vue"
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		components:{AddressPicker,mSearch},
		data() {
			return {
				//获取地址蓝参数
					region:'',
					points:[],
					aa:3,
					lat:'',
					lng:'',
					planLocate:'请选择地区',
			}
		},
	
		onLoad(options) {
			//地址传参
			this.address= options.planLocate
			// this.points()
		},
		onLoad() {
			let that = this
			wx.getStorage({
				key: 'address',
				success: function(res) {
					console.log(res)
					that.lat = res.data.latitude
					that.lng = res.data.longitude
				},
				fail: function(res) {
					uni.showToast({
						title: '系统繁忙！请稍后重试'
					})
				}
			
			})
			
		},
		methods: {
			 getDistance(lat1, lng1, lat2, lng2) {
			    lat1 = lat1 || 0;
			    lng1 = lng1 || 0;
			    lat2 = lat2 || 0;
			    lng2 = lng2 || 0;
			    var rad1 = lat1 * Math.PI / 180.0;
			    var rad2 = lat2 * Math.PI / 180.0;
			    var a = rad1 - rad2;
			    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
			    var r = 6378137;
			    return (r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))).toFixed(0)
			  },
			
			mapClick(){
				uni.navigateTo({
				  url: '/pages/map/map?region='+this.region,
				})
			},
		
			async search(e){
				
				let that = this
				if(that.region==''){
					uni.showToast({
						icon:"error",
						title:'请先选择地区'
					})
				}else{
					const result = await this.$myRuquest({
						url: '/point/findPointBySearch',
						method: 'POST',
						data: {
							name:'%'+e.value+'%'
						}
					})
					that.points = result.data.data
					for (var i = 0; i < that.points.length; i++) {
						that.points[i].distance = this.getDistance('28.67876584957988','116.02387302274906',that.points[i].latitude,that.points[i].longitude)/1000
					}
				}
				
			},
			//父组件的获取子组件传递的值， 在为josn 有code和name
			change(result) { 
				var arr = []
				console.log(result)
				 JSON.stringify(result.data);
				   this.planLocate = ''; 
				   result.data.forEach( (item,index) =>{ 
					   if(index===2){ this.planLocate += item.name 
							}
							arr.push(item.name)
					   }
					) ; 
					this.region = arr.join('-')
					this.findPoints()
					   
			 },
			//查找接种点
			
			async findPoints() {
				let that = this
				const result = await this.$myRuquest({
					url: '/point/findPoint',
					method: 'POST',
					data: {
						region:this.region 
					},
				})
				
				that.points = result.data.data
				for (var i = 0; i < that.points.length; i++) {
					that.points[i].distance = this.getDistance('28.67876584957988','116.02387302274906',that.points[i].latitude,that.points[i].longitude)/1000
				}
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
	.selectAddress{
	 border: 1px #567f98 solid;
	 width:200rpx;
	 height:40rpx;
	 border-radius: 20rpx;
	 position: relative;
	 padding: 5rpx;
	 top:50rpx;
	 color: #567f98;
	}
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
		margin: -15px 0rpx 10rpx 235rpx;
		height: 100rpx;
		background: #007AFF;
		text-align: center;
		line-height: 100rpx;
		border-radius: 20px;
	}
	.container{
	 position: relative;
	 right: -83px;
	 top: -13px;
	 width: 0px;                 /*  宽高设置为0，很重要，否则达不到效果 */
	 height: 0px;
	 border:6px solid#567f98;
	 border-bottom-color: transparent;    /* 设置透明背景色 */
	 border-left-color: transparent;
	 border-right-color: transparent;
		
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
