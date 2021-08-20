<template>
	<view>
		<uni-forms :rules="rules" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext"  >
			<uni-group title="正式档案绑定" top="0">
				<uni-forms-item name="phone" required label="手机号" >
					<input type="text" v-model="formData.phone" class="uni-input-border" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="idCard" required label="身份证号" >
					<input type="text" v-model="formData.idCard"  class="uni-input-border" placeholder="请输入身份证号" />
				</uni-forms-item>
			</uni-group>
			<view class="footer">
				<button @click="submitForm('form')" type="primary"
					style="display: inline; width: 466rpx;font-size: 14px;">绑定受种者档案</button>
				<button @click="resetForm"
					style="display: inline; width: 254rpx; background-color: #007AFF;font-size: 14px;" >重置</button>
			</view>
		</uni-forms>
	</view>
</template>

<script>
	export default {
		onLoad() {
			
		},
		data(){
			return{
				
					formData:{
						phone:'',
						idCard:''
					},
					rules:{
						idCard: {
							rules: [{
									required: true,
									errorMessage: '请输入身份证号'
								},
								{
									format: 'int',
									errorMessage: '身份证号必须是数字'
								},
								
							]
						},
						phone: {
							rules: [{
									required: true,
									errorMessage: '请输入手机号'
								},
								{
									format: 'int',
									errorMessage: '手机号必须是数字'
								},
								
							]
						},
					}
			}
		},
		methods:{
			//表单提交
			async archivesFormal(res){
				let that = this
				const result = await this.$myRuquest({
					url: '/archivesFormal/createArchivesFormal',
					method:'POST',
					data:{
						idCard:res.idCard,
						phone:res.phone,
					},
				})
				if(result.data.code==200){
					uni.showToast({
						title: '操作成功'
					})
					//两秒后跳回预约页面
					setTimeout(()=>{
						 uni.navigateTo({
						  url: '/pages/booking/booking',
						})
					},2000)
				}
				
			},
			submitForm(form) {
				let that = this
				this.$refs[form]
					.submit()
					.then(res => {
						this.archivesFormal(that.formData)
					})
					.catch(errors => {
						console.error('验证失败：', errors)
					})
			},
			 //重置表单 。原生的组件input组件不能重置表单
			 resetForm() {
				 this.clear()
			 	this.$refs.form.resetFields()
			 },
			clear(){
				this.formData.idCard = ''
				this.formData.phone  =''
			}
			
		},
		
	}
</script>

<style lang="scss">
	
	.uni-input-border {
		padding: 0 10px;
		height: 35px;
		width: 100%;
		font-size: 14px;
		color: #666;
		border: 1px #e5e5e5 solid;
		border-radius: 5px;
		box-sizing: border-box;
	}
	.footer {
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 73rpx;
		background: #fff;
		align-items: center;
		justify-content: center;
		display: flex;
	}
</style>
