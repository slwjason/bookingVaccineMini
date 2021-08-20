## v1.0.0
## 使用方法
<template>
	<view class="">
		<fever-popup ref="popupRef" @btnCallBack="onPopupBtn"></fever-popup>
		<view class="viewItem" @click="onPopup(8)">标题+内容+选择器+按钮</view>
		<view class="viewItem" @click="onPopup(1)">标题+内容+按钮</view>
		<view class="viewItem" @click="onPopup(2)">内容+按钮</view>
		<view class="viewItem" @click="onPopup(3)">标题+按钮</view>
		<view class="viewItem" @click="onPopup(7)">标题+内容</view>
		<view class="viewItem" @click="onPopup(4)">标题</view>
		<view class="viewItem" @click="onPopup(5)">内容</view>
		<view class="viewItem" @click="onPopup(6)">按钮(自定义)</view>
	</view>
</template>
<script>
	var popupRef;
	import feverPopup from '@/feverUI/fever-popup/fever-popup';
	export default {
		components: {feverPopup},
		data() {
			return {}
		},
		mounted() {},
		onLoad(options) {},
		onReady() {
			popupRef=this.$refs.popupRef;
		},
		onShow() {},
		created() {},
		methods: {
			onPopup(i){
				if(i==1){
					popupRef.type='def';
					popupRef.mark=true;
					popupRef.info={
						title: '弹窗提醒',
						centent: ['这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容', '这是内容这是内容这是内容这是内容这是内'],
						btn: ['确认']
					};
				}else if(i==2){
					popupRef.type='def';
					popupRef.mark=true;
					popupRef.info={
						centent: ['这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容', '这是内容这是内容这是内容这是内容这是内'],
						btn: ['确认']
					};
				}else if(i==3){
					popupRef.type='def';
					popupRef.mark=true;
					popupRef.info={
						title: '弹窗提醒',
						btn: ['确认']
					};
				}else if(i==4){
					popupRef.type='def';
					popupRef.info={
						title: '弹窗提醒',
					};
				}else if(i==5){
					popupRef.type='def';
					popupRef.mark=true;
					popupRef.info={
						centent: ['这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容', '这是内容这是内容这是内容这是内容这是内'],
					};
				}else if(i==6){
					popupRef.type='def';
					popupRef.mark=true;
					popupRef.info={
						btn: [1, 2, 3,'自定义']
					};
				}else if(i==7){
					popupRef.type='def';
					popupRef.mark=true;
					popupRef.info={
						title: '弹窗提醒',
						centent: ['这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容', '这是内容这是内容这是内容这是内容这是内']
					};
				}else if(i==8){
					popupRef.type='def';
					popupRef.mark=true;
					popupRef.checked={state:false};
					popupRef.info={
						title: '弹窗提醒',
						centent: ['这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容', '这是内容这是内容这是内容这是内容这是内'],
						btn: ['确认']
					};
				}
			},
			onPopupBtn(item){//组件回调
				console.log(item);
			}
		}
	}
</script>

<style scoped>
	.viewItem{
		position: relative;
		width: 100%;
		padding: 20rpx;
		margin-top: 50rpx;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		font-weight: 300;
		color: #FFFFFF;
		background-color: rgba(212, 201, 240, 0.8);
	}
</style>
