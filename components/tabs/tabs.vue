<template>
	<view class="questionbar">
		<view class="content_items">
			<view class="content_item" 
				v-for="(item,index) in tabs" 
				:key="item.index" 
				:class="item.isActive ? 'active' : ''"
				@tap="handlerActive(item.index)"
			>
				{{item.value}}
			</view>
		</view>
		<slot></slot>
	
	</view>
</template>
<script>
	export default {
		data() {
			return {

			};
		},
		props: {
			tabs: {
				type: Array,
				default: []
			}
		},
		methods:{
			handlerActive(index){
				
				this.$emit('tabActive',index)
			}
		}
	}
</script>

<style lang="scss">
	
	.questionbar{
		position: sticky;top: 0;z-index: 999;
	}
.content_items {
		background-color: #fff;
		display: flex;
		.content_item {
			text-align: center;
			float: left;
			padding: 10rpx 0;
			flex: 1;
		}
		
	}
	.active {
		color: blue;
		border-bottom: 5rpx solid blue;
	}
</style>
