<template>
	<view>
		<view class="tip">
			 <icon type="warn" size="12"/>
			<text>具体库存、接种疫苗，以接种当天门诊实际库存、供应疫苗种类为准</text>
		</view>
		<view class="header">
			<view class="ponit">
				<text class="left">接种点</text>
				<text class="right">{{point.pointName}}</text>
			</view>
			<view class="unit">
				<text class="left">接种单位</text>
				<text class="right">{{point.hospitalName}}</text>
			</view>
		</view>
		<view class="main">
			<view class="main_header">
				<text class="">接种疫苗</text>
			</view>
			<view class="main_content">
				<view class="main_content_title">新冠疫苗</view>
				<view class="main_content_content">
					<view >
						 <radio-group @change="radioChange" class="radioBox">
						                <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in point.items" :key="item.vaccine">
						                    <view class="radio">
						                        <radio :value="item.vaccine" :checked="index === current" />
						                    </view>
						                   <view class="vaccine">
						                   	<view class="vaccine_name">{{item.vaccineName}}</view>
						                   	<view class="vaccine_num">可约数：{{item.num}}</view>
						                   </view>
						                </label>
						            </radio-group>
						 <!-- <checkbox-group @change="change">
								<checkbox :value="point.vaccine" :checked="flag" />
							</checkbox-group> -->
						</view>
					
				</view>
				
			</view>
		</view>
		<view class="footer">
			<view class="btn">
				<button  @click="submitBooking" type="primary"  style="display: inline-block; width: 700rpx;font-size: 14px; text-align: center;">选好了</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
	
		data() {
			return {
					flag:false,
					id:'',//接种点id
					point:{},
					vaccineId:'',
					current: null,
					archivesId:'',//预约人，
					vaccine:""
				}
		},
	
		onLoad(options) {
			let that = this
			if(options.id!=undefined || options.id!=''){
				this.id = options.id;
				this.getPoint()
				
				
			}
			//获取缓存中的archivesId
			wx.getStorage({
					key: 'archivesId',
					success: function(res) {
						that.archivesId = res.data
					},
				  })
		},
		methods: {
			//单选框监听
			change(e){
				this.flag = !this.flag
				this.vaccineId = e.detail.value
			},
			//监听疫苗单选框
			 radioChange(evt) {
			            for (let i = 0; i < this.point.items.length; i++) {
			                if (this.point.items[i].vaccine === evt.target.value) {
								this.vaccine = evt.target.value
			                    this.current = i;
			                    break;
			                }
			            }
						 console.log(this.vaccine)
			        },
			//根据id获取接种点信息
			async getPoint() {
				let that = this
				
				const result = await this.$myRuquest({
					url: '/point/getPoint',
					method:'POST',
					data:{
						id:that.id,
					},
				})
				that.point = result.data.data
				
				
			},
			//根据id获取接种点信息
			async submitBooking() {
				let that = this
				const result = await this.$myRuquest({
					url: '/appointment/createAppointment',
					method:'POST',
					data:{
						archives:that.archivesId,
						hospital:that.point.hospital,
						point:that.point.point,
						vaccine:that.vaccine,
					},
				})
				console.log(result)
			},
		},
		
		
	}
</script>

<style lang="scss">

	.header{
		background: #fff;
		width: 100%;
		height:90rpx;
		padding: 10px;
	}
	.ponit , .unit{
		height: 20rpx;
		line-height: 20rpx;
		margin-bottom: 40rpx;
	}
	
	.left{
		font-size: 12px;
		color: #999999;
		margin-right: 40rpx;
	}
	.right{
		font-size: 14px;
		color: #555555;
	}
	.tip{
		font-size: 10px;
		color: #808080;
		background: #F0AD4E;
		height: 50rpx;
		line-height: 50rpx;
	}
	.main{
		background: #fff;
		width: 100%;
		padding: 10px;
		margin-top: 40rpx;
	}
	.main_header{
		height: 60rpx;
		line-height: 60rpx;
		text-align: left;
		font-size: 12px;
		color: #999999;
		border-bottom: 1px solid #999999;
	}
	.main_content{
		padding: 10px 0;
	}
	.main_content_title{
		font-size: 14px;
		color: #555555;
		text-align: left;
	}
	.main_content_content{
		padding: 10px 0;
		
	}
	.main_content_content .checkBox{
		position: relative;
		top: -7px;
		margin-right: 20rpx;
		display: inline-block;
		height: 20px;
	}
	.radioBox{
		width: 200rpx;
		position: absolute;
	}
	.radio{
		display: inline-block;
		position: relative;
		top:-7px;
		
	}
	.main_content_content .vaccine{
		display: inline-block;
		margin-top: 10px;
	}
	.main_content_content .vaccine .vaccine_name{
		font-size: 14px;
	}
	.main_content_content .vaccine .vaccine_num{
		font-size: 10px;
		color: #DD524D;
	}
		
	.footer{
		background: #fff;
		height: 50rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		
	}
	.btn{
		margin: 0 auto;
		width: 700rpx;
	}
</style>
