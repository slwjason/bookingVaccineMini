<template>
	<view>
		<tabs :tabs='tablist' v-on:tabActive='tabActive' />
		<block v-if="contentIndex==0">
			<view class="bg">
				<view v-if="appoints.length<=0" class="tip">暂无当前预约记录</view>
				<view class="item" v-for="item in appoints" :key="item.id" @click="details(item.archives)">
					<view class="pad">
						<view class="left">
							<view class="item_top">
								<text class="name">{{item.archivesName}}</text>
								<text class="sex" :style="item.sex === '男' ? boy : girl">{{item.sex}}</text>
								<text class="age">{{item.age}}</text>
							</view>
							<view>
								<text class="public">预约单位:</text>
								<text class="hospitalName public_item">{{item.hospitalName}}</text>
							</view>
							<view>
								<text class="public">接种点:</text>
								<text class="pointName public_item">{{item.pointName}}</text>
							</view>
							<view>
								<text class="public">疫苗类型:</text>
								<text class="vaccineName public_item">{{item.vaccineName}}</text>
							</view>
							<view>
								<text class="public">预约时间:</text>
								<text class="createDate public_item">{{item.createDate}}</text>
							</view>
						</view>
						<view class="right">
							<p>></p>
						</view>
					</view>
				</view>

			</view>
		</block>
		<block v-if="contentIndex==1">
			<view class="bg">
				<view v-if="records.length<=0" class="tip">暂无历史预约记录</view>
				<view class="item" v-for="item in records" :key="item.id" @click="details(item.archives)">
					<view class="pad">
						<view class="left">
							<view class="item_top">
								<text class="name">{{item.archivesName}}</text>
								<text class="sex" :style="item.sex === '男' ? boy : girl">{{item.sex}}</text>
								<text class="age">{{item.age}}</text>
							</view>
							<view>
								<text class="public">预约单位:</text>
								<text class="hospitalName public_item">{{item.hospitalName}}</text>
							</view>
							<view>
								<text class="public">接种点:</text>
								<text class="pointName public_item">{{item.pointName}}</text>
							</view>
							<view>
								<text class="public">疫苗类型:</text>
								<text class="vaccineName public_item">{{item.vaccineName}}</text>
							</view>
							<view>
								<text class="public">预约时间:</text>
								<text class="createDate public_item">{{item.createDate}}</text>
							</view>
						</view>
						<view class="right">
							<p>></p>
						</view>
					</view>
				</view>
			</view>
		</block>
		</tabs>
	</view>
</template>

<script>
	import tabs from '../../components/tabs/tabs.vue'
	export default {

		data() {
			return {
				boy:'background-color:#aaaaff',
				girl:'background-color:pink',
				tablist: [{
						index: 0,
						value: '当前预约',
						isActive: true
					},
					{
						index: 1,
						value: '预约记录',
						isActive: false
					}
				],
				contentIndex: '',
				images: [],
				records: [],
				appoints: [],
				archivesId: ''
				
			}
		},
		onLoad(options) {
			let that = this
			if (options.id != undefined || options.id != '') {
				that.archivesId = options.id;
				that.findRecord();
				that.findAppoints()
			}
		},
		methods: {
			//下拉刷新
			   onPullDownRefresh() {
				 this.findRecord();
				 this.findAppoints()
			    setTimeout(() => {
			     uni.stopPullDownRefresh()
			    }, 1000);
			   },
			tabActive(tabIndex) {
				this.tablist.map((value, index) => {
					value.isActive = tabIndex == index ? true : false
				})
				this.contentIndex = tabIndex
			},
			//查找未处理预约记录
			async findAppoints() {
				let that = this
				const result = await this.$myRuquest({
					url: '/appointment/findAppointById',
					method: 'POST',
					data: {
						archivesId: that.archivesId,
						status: '待处理'
					},
				})
				if (result.data.code == 200) {
					that.appoints = result.data.data
				}

			},
			//详情
			details(id){
				uni.navigateTo({
				 url: '/pages/record/recordDetails?record='+id,
				});
			},
			//查找已处理预约记录
			async findRecord() {
				let that = this
				const result = await this.$myRuquest({
					url: '/appointment/findAppointById',
					method: 'POST',
					data: {
						archivesId: that.archivesId,
						status: '已处理'
					},
				})
				if (result.data.code == 200) {
					that.records = result.data.data
				}

			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F6FA;
	}

	.bg {
		padding: 20rpx;
		/* 		background-color: #F5F6FA; */
	}

	.item {
		padding: 20rpx 20rpx 10rpx 20rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		border-radius: 15rpx;
	}

	.pad {
		padding: 10rpx 10rpx;
	}

	.pad::after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.item_top {
		margin-bottom: 10rpx;
	}

	.left {
		float: left;
	}

	.right {
		float: right;
	}

	.right p {
		padding-top: 80rpx;
		font-size: 40rpx;
	}

	.vaccines {
		margin: 0 20rpx;
	}

	.sex {
		margin: 0 18rpx;
		padding: 0 5rpx;
		border-radius: 10rpx;
		color: #00557f;
	}

	.public {
		font-size: 14px;
		color: #444444;
	}

	.public_item {
		font-size: 14px;
	}

	.hospitalName {
		color: #00557F;
	}

	.vaccineName {
		color: #F0AD4E;
	}

	.createDate {
		color: #DD524D;
	}

	.pointName {
		color: #00557F
	}

	.tip {
		font-size: 20px;
		color: #838383;
		width: 100%;
		text-align: center;
		margin: 500rpx auto;
	}
</style>
