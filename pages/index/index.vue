<template>
	<view>
		<view class="header">
			<view class="selectAddress">
				<AddressPicker @change="change" :level="2">{{planLocate}}
				<view class="container"></view>
				</AddressPicker> 
			</view>
	
		</view>
		<view>
			<tabDetails :planLocate="planLocate"></tabDetails>
		</view>
	</view>
	
		
</template>

<script>
	import AddressPicker from "@/components/lingdang-AddressPicker/AddressPicker.vue"
	import tabDetails from "../../components/tabs/tab_details.vue"

	export default {
		components:{AddressPicker,tabDetails},
		data() {
			return {
				planLocate:'请选择地区',
				}
		},
	
		onLoad() {
			// this.getSwipers()
			    
		},
		methods: {
			 //父组件的获取子组件传递的值， 在为josn 有code和name
		  change(result) { 
			 JSON.stringify(result.data);
			   this.planLocate = ''; 
			   result.data.forEach( (item,index) =>{ 
				   if(index===1){ this.planLocate += item.name 
						}
				   }
				   ) ; 
				   let arr =this.planLocate.split('-'); 
				   console.log(arr) 
			   },
		  async getSwipers () {
						const res = await this.$myRuquest({
							url: '/users/findUser'
						})
						console.log(res)
					},
		},
	}
</script>

<style lang="scss">
	
	.header{
		width: 750rpx;
		height: 200rpx;
		background-color: #007AFF;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.selectAddress{
		border: 1px #fff solid;
		width:250rpx;
		height:50rpx;
		border-radius: 20rpx;
		position: absolute;
		padding: 5px;
		color: #fff;
	}
	.container{
		position: relative;
		right: -98px;
		top: -13px;
		width: 0px;                 /*  宽高设置为0，很重要，否则达不到效果 */
		height: 0px;
		border:8px solid #fff;
		border-bottom-color: transparent;    /* 设置透明背景色 */
		border-left-color: transparent;
		border-right-color: transparent;

	}
	.content_items {
			display: flex;
			.content_item {
				text-align: center;
				float: left;
				padding: 10rpx 0;
				flex: 1;
			}
		}
		.active {
			color: #EB4450;
			border-bottom: 5rpx solid #DD524D;
		}
</style>
