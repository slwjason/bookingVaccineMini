<template>
	<view>
		<view class="map_container">
		  <map class="map" id="map" :longitude="longitude" :latitude="latitude" scale="14" show-location="true" :markers="markers" bindmarkertap="makertap">
		  </map> 
		</view>

	</view>
	<!-- <view>
		<map id="map1" ref="map1"></map>
	</view> -->
	
</template>

<script>
	// 引用百度地图微信小程序JSAPI模块
	var bmap = require('../../static/js/bmap-wx.js'); 
	var wxMarkerData = []; 
	export default {
		data(){
			return{
				markers: [],
				latitude: '28.655707', 
				longitude: '115.904222', 
				rgcData: {} ,
				points:[],
				region:''
			}
		},
		onLoad(options) {
			this.region = options.region
			this.findPoints()
		},
		methods:{
			//查找接种点
			async findPoints() {
				console.log(3)
				let that = this
				const result = await this.$myRuquest({
					url: '/point/findPoint',
					method: 'POST',
					data: {
						region:that.region
					},
				})
				console.log(result)
				that.points = result.data.data
				
				that.map()
			},
			makertap(e) {
			    var that = this; 
			    var id = e.markerId; 
			    that.showSearchInfo(wxMarkerData, id); 
			}, 
			map(){
				console.log(3)
				var that = this; 
				// 新建百度地图对象 
				var BMap = new bmap.BMapWX({ 
				    ak: 'KdioGwNtM1Q9zXTCynZB5kChrZGu9TGG' 
				}); 
				var fail = function(data) { 
				    console.log(data) 
				}; 
				var success = function(data) { 
				    wxMarkerData = data.wxMarkerData; 
					this.markers = wxMarkerData 
					this.latitude = wxMarkerData[0].latitude 
					this.longitude = wxMarkerData[0].longitude 
				  
				} 
				for (var i = 0; i < this.points.length; i++) {
					
					let obj = new Object()
					obj = {
						address: this.points[i].address,
						alpha: 1,
						height: undefined,
						iconPath: "../../static/imgs/icon-pin.png",
						iconTapPath: "../../static/imgs/icon-pin.png",
						id: i,
						latitude:this.points[i].latitude,
						longitude: this.points[i].longitude,
						width: undefined,
					}
					this.markers.push(obj)
				
				}
				
				
				console.log(this.markers)
				//
				// 发起regeocoding检索请求 
				BMap.regeocoding({ 
				    fail: fail, 
				    success:success,
				    iconPath: '../../static/imgs/icon-pin.png', 
				    iconTapPath: '../../static/imgs/icon-pin.png' 
				}); 
			},
			showSearchInfo(data, i) {
			    var that = this; 
				// this.rgcData
			    // that.setData({ 
			    //     rgcData: { 
			    //         address: '地址：' + data[i].address + '\n', 
			    //         desc: '描述：' + data[i].desc + '\n', 
			    //         business: '商圈：' + data[i].business 
			    //     } 
			    // }); 
			} 
		}
	}
	
	

</script>

<style>
	#map1{
		width:100%;
		height:100%
	}
	.map_container{ 
	    height:1200rpx; 
	    width: 100%; 
	} 
	
	.map { 
	    height: 100%; 
	    width: 100%; 
	}
</style>
