<template>
	<view>
		<view class="content">
			<tabs :tabs='tablist' v-on:tabActive='tabActive' />
				<block v-if="contentIndex==0" >
						<scroll-view class="contentChild" scroll-y="true">
							<uni-card class="card1" title="疫苗接种" thumbnail="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png" extra="额外信息" note="Tips">
					
							  <view class="description">
							  	<text>接种对象:18-59岁成年人，不限社会户籍</text>
							  </view>
							  <view class="process">
							  	<text>接种流程:</text>
							  </view>
							  
							  <button class="button" @click="booking">立即预约</button>
							</uni-card>
							<uni-card @click="map" class="card2">
								<text class="title">接种地图</text>
								<text class="tip">查看附件接种点</text>
							</uni-card>
						</scroll-view>
					
				</block>
				<block v-if="contentIndex==1">
					
					
				</block>
				<block v-if="contentIndex==2">
					第三页内容
				</block>
			</tabs>
		</view>
	</view>
</template>
<script>
	import tabs from '../../components/tabs/tabs.vue'
	export default {
		props: {
			planLocate: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
			
				tablist: [{
						index: 0,
						value: '接种指南',
						isActive: true
					},
					{
						index: 1,
						value: '疫苗问答',
						isActive: false
					},
					{
						index: 2,
						value: '最新动态',
						isActive: false
					}
				],
				contentIndex: '',
				images: []
			}
		},
		methods: {
			//预约
			booking(){
				uni.redirectTo({
				  url: '/pages/booking/booking',
				})
			},
			//tab
			tabActive(tabIndex) {
				this.tablist.map((value, index) => {
					value.isActive = tabIndex == index ? true : false
				})
				this.contentIndex = tabIndex
			},
			//map
			map(){
				  uni.redirectTo({
				    url: '/pages/vaccina/vaccina?planLocate='+this.planLocate,
				  })
			}
		
		},
		components: {
			tabs,
		}
	}
</script>
<style lang="scss">
	.content{
		background: #fff;
		position: relative;height: 100%;width: 100%;
	}

	.contentChild{
		background-color: #ccc;
		min-height: 2000rpx;
		
		
	}
	.contentChild .card1 .title{
		font-size: 20px;
		font-weight: bold;
	}
	.contentChild .card1 .button{
		background-color: #007AFF;
	}
	.contentChild .card2 .title{
		display: block;
		font-size: 20px;
		font-weight: bold;
	}
	.contentChild .card2 .tip{
		font-size: 12px;
	}
</style>
