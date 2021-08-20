<template>
	<view>
		<view class="title">
			<p>
				预防接种记录
			</p>
		</view>
		<view class="title_2">
			<p>
				(Vaccination Record)
			</p>
		</view>
		<view class="msg">
			<view class="msg_item">
				<view class="left">
					<p>证件类型</p>
					<p>ID Type</p>
				</view>
				<view class="right">
					<p>身份证</p>
				</view>
			</view>
			<view class="msg_item">
				<view class="left">
					<p>证件号</p>
					<p>ID No.</p>
				</view>
				<view class="right">
					<p>123456789</p>
				</view>
			</view>
			<view class="msg_item">
				<view class="left">
					<p>受种者姓名</p>
					<p>Name</p>
				</view>
				<view class="right">
					<p>小欢</p>
				</view>
			</view>
			<view class="msg_item">
				<view class="left">
					<p>性别</p>
					<p>Gender</p>
				</view>
				<view class="right">
					<p>女</p>
				</view>
			</view>
		</view>
		<view class="tab">
			<uni-table>
				<uni-tr class="tab_th">
					<uni-th align="center">疫苗名称</uni-th>
					<uni-th align="center">接种日期</uni-th>
					<uni-th align="center">疫苗批号</uni-th>
					<uni-th align="center">生产企业</uni-th>
					<uni-th align="center">接种单位</uni-th>
				</uni-tr>
				<uni-tr>
					<uni-td>重组新型冠状病毒疫苗（5型腺病毒载体）</uni-td>
					<uni-td>2021-06-03</uni-td>
					<uni-td>NCOV202104016H</uni-td>
					<uni-td>康希诺生物股份公司</uni-td>
					<uni-td>桃浦镇第二社区卫生服务中心</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.title {
		margin-top: 10px;
	}
	.title p {
		text-align: center;
		font-weight: 700;
		font-size: 16px;
		color: #2F3130;
	}
	.title_2 p {
		text-align: center;
		font-size: 15px;
		color: #535353;
	}
	.msg {
		margin: 15px 15px 0 15px;
		padding: 5px 0;
		border-top: #f0f0f0 1px solid;
		border-bottom: #f0f0f0 1px solid;
	}
	.msg_item {
		margin-bottom: 5px;
		width: 100%;
		height: 40px;
	}
	.left {
		float: left;
		width: 80px;
	}
	.right {
		float: left;
	}
	.msg_item .left p {
		line-height: 20px;
		color: #9C9DA2;
		font-size: 13px;
	}
	.msg_item .right p {
		line-height: 40px;
		color: #474B4A;
		font-size: 13px;
	}
	.tab {
		margin: 0 15px;
	}
	.tab uni-table {
		width: 100%;
	}
	.tab_th {
		background-color: #F1F9FF;
	}
	.uni-table-th[data-v-511e81f9] {
		color: #93c1ca;
		font-size: 13px;
	}
	.uni-table-td[data-v-321f8e79] {
		font-size: 13px;
	}
</style>
