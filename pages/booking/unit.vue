<template>
	<view>
		<view class="header">
			<view class="selectAddress">
				<AddressPicker @change="change" :level="3">{{planLocate}}
					<view class="container"></view>
				</AddressPicker>
			</view>
			<view class="searchBox">
				<!-- 替换组件的搜索图标 -->
				<uni-search-bar placeholder="搜索接种点" @confirm="search" @cancel="cancel" cancel-text="取消" class="search">
					<uni-icons slot="searchIcon" color="#999999" size="18" type="search" />
				</uni-search-bar>
			</view>

		</view>
		<scroll-view scroll-y="true" class="unitPonit">
			<view class="unitItem" v-for="item in points">
				<text class="point">{{item.name}}</text>
				<view class="btn"><button type="primary" @click="point(item.id)">选择</button></view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import AddressPicker from "@/components/lingdang-AddressPicker/AddressPicker.vue"
	import mSearch from '@/components/mehaotian-search/mehaotian-search.vue';
	export default {
		components: {
			AddressPicker,
			mSearch
		},
		data() {
			return {
				planLocate: '地区',
				//省市区
				address: '',
				points: []
			}
		},

		onLoad() {},
		methods: {
			//选择接种点
			point(id) {
				uni.navigateTo({
					url: '/pages/booking/bookingSubmit?id=' + id,
				})
			},
			//根据地址获取接种点
			async findPoint() {
				let that = this
				console.log(that.openId)
				const result = await this.$myRuquest({
					url: '/point/findPoint',
					method: 'POST',
					data: {
						region: that.address,
					},
				})
				that.points = result.data.data
				console.log(result)
			},
			//父组件的获取子组件传递的值， 在为josn 有code和name
			change(result) {
				//地址格式化
				JSON.stringify(result.data);
				console.log(JSON.stringify(result.data))
				let arr = []
				result.data.forEach((item, index) => {
						arr.push(item.name)
						if (index === 2) {
							this.planLocate = item.name
						}
					}
				);
				this.address = arr.join('-')
				//根据地址获取接种点
				this.findPoint()
			},
		},


	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6FA;
	}
	.header {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-content: space-between;
		/* 竖向中间自动空间 */
		border-bottom: 1px solid #999999;
	}

	.selectAddress {
		margin-left: 8rpx;
		width: 210rpx;
		height: 40rpx;
		border-radius: 20rpx;
		line-height: 100rpx;
		padding: 5rpx;
		color: #00d59c;
	}

	.container {
		position: relative;
		right: -88px;
		top: -26px;
		width: 0px;
		/*  宽高设置为0，很重要，否则达不到效果 */
		height: 0px;
		border: 6px solid #00d59c;
		border-bottom-color: transparent;
		/* 设置透明背景色 */
		border-left-color: transparent;
		border-right-color: transparent;

	}

	.searchBox {
		width: 575rpx;

	}

	.unitPonit {
		background: #fff;
	}

	.unitItem {
		width: 95%;
		height: 40rpx;
		border-bottom: 1px solid #999999;
		padding: 10px 0px;
		display: flex;
		justify-content: space-between;
		align-content: space-between;
		/* 竖向中间自动空间 */
		margin: 0 auto;
	}

	.point {
		color: #555555;
		font-size: 12px;
		height: 40rpx;
		line-height: 40rpx;
	}

	.btn {
		display: inline-block;
	}

	.btn button {
		width: 60px;
		height: 20px;
		font-size: 12px;
		text-align: center;
		line-height: 20px;
	}
</style>
