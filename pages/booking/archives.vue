<template>
	<view>
		<uni-forms :rules="rules" :value="formData" ref="form" validate-trigger="bind" err-show-type="undertext" >
			<uni-group title="基本信息" top="0">
				<uni-forms-item name="name" required label="姓名">
					<input type="text" v-model="formData.name" class="uni-input-border" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item name="idCard" required label="身份证号" >
					<input type="text" v-model="formData.idCard" @blur="goAgeSex" class="uni-input-border" placeholder="请输入身份证号" />
				</uni-forms-item>
				<!-- 使用原生input，需要绑定binddata -->
				<uni-forms-item name="age"  label="年龄">
					<input type="text" v-model="formData.age" class="uni-input-border" placeholder="请输入年龄" />
				</uni-forms-item>
				<uni-forms-item  name="sex" label="性别">
					<input type="text" v-model="formData.sex" class="uni-input-border" placeholder="请输入性别" />
				</uni-forms-item>
				<uni-forms-item name="brithDay"  label="出生年月">
					<input type="text" v-model="formData.brithDay" class="uni-input-border" placeholder="请输入出生年月" />
				</uni-forms-item>
				<uni-forms-item name="phone" label="手机号">
					<input type="text" v-model="formData.phone" class="uni-input-border" placeholder="请输入手机号" />
				</uni-forms-item>
				<uni-forms-item name="address" label="详细地址">
					<input type="text" v-model="formData.address" class="uni-input-border" placeholder="请输入详细地址" />
				</uni-forms-item>
				<uni-forms-item name="isIll" label="有无慢性病" labelWidth="100">
					 <view class="uni-list-cell uni-list-cell-pd">
								<switch :checked="formData.isIll" @change="changeIsIll"/>
						</view>
				</uni-forms-item>
				<uni-forms-item name="isWill" label="是否接受接种" labelWidth="100">
					 <view class="uni-list-cell uni-list-cell-pd">
								<switch :checked="formData.isWill" @change="changeIsWill"/>
						</view>
				</uni-forms-item>
			</uni-group>
			<view style="text-align: center;">
			<button  @click="submitForm('form')" type="primary"  style="display: inline; width: 100rpx;margin-right: 100rpx; ">提交</button>
			<button  @click="resetForm" type="warn"style="display: inline;">重置</button>
			</view>
		</uni-forms>
		
	</view>
</template>
 
<script>
	export default {
		onLoad(optipns) {
			if(optipns){
				this.updateId = optipns.id
			}
			this.getUserInfo()
			console.log(this.updateId)
		},
		data() {
			return {
				updateId:'',
				formData: {
					name: '',
					age: '',
					sex: '',
					idCard: '',
					openId:'',
					phone:'',
					address:'',
					brithDay:'',
					isIll:false,
					isWill:true
				},
	
				show: false,
				rules: {
					name: {
						rules: [{
								required: true,
								errorMessage: '请输入用户名'
							},
							{
								minLength: 3,
								maxLength: 15,
								errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符'
							}
						]
					},
					cardId: {
						rules: [{
								required: true,
								errorMessage: '请输入身份证号'
							},
							{
								format: 'int',
								errorMessage: '身份证号必须是数字'
							},
							{
								minLength: 18,
								maxLength: 18,
								errorMessage: '身份证号不正确'
							}
						]
					},
					age: {
						rules: [{
								required: true,
								errorMessage: '请输入年龄'
							},
							{
								format: 'int',
								errorMessage: '年龄必须是数字'
							},
							{
								minimum: 18,
								maximum: 30,
								errorMessage: '年龄应该大于 {minimum} 岁，小于 {maximum} 岁'
							}
						]
					},
				
				}
			}
		},
		methods: {
			changeIsIll(){
				this.formData.isIll = !this.formData.isIll
			},
			changeIsWill(){
				this.formData.isWill = !this.formData.isWill
			},
			////获取微信用户信息
			getUserInfo(){
				let that = this
				wx.getStorage({
						key: 'opid_sessionKey',
						success: function(res) {
							console.log(res)
						 that.formData.openId= res.data.openid
						},
						fail: function(res) {
						}
				 
					  })
				
			},
			goAgeSex(){
				if(this.formData.idCard==''){
					return
				}else{
					//获取输入身份证号码
					var UUserCard = this.formData.idCard;
					//获取出生日期
					this.formData.brithDay=UUserCard.substring(6, 10) + "-" + UUserCard.substring(10, 12) + "-" + UUserCard.substring(12, 14);
					//获取性别
					if (parseInt(UUserCard.substr(16, 1)) % 2 == 1) {
					this.formData.sex='男'
					//是男则执行代码 ...
					} else {
					this.formData.sex='女'
					//是女则执行代码 ...
					}
					//获取年龄
					var myDate = new Date();
					var month = myDate.getMonth() + 1;
					var day = myDate.getDate();
					var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1;
					if (UUserCard.substring(10, 12) < month || UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day) {
					age++;
					}
					this.formData.age = age
					//年龄 age
				}
			
			},
			change(name, value) {
				this.formData.checked = value
				this.$refs.form.setValue(name, value)
			},
			//提交建档数据
			async archives(res) {
				console.log(this.updateId)
				let that = this
				if(that.updateId==undefined||that.updateId==''){
					const result = await this.$myRuquest({
						url: '/archives/createArchives',
						method:'POST',
						data:{
							name:res.name,
							idCard:res.idCard,
							age:res.age,
							sex:res.sex,
							phone:res.phone,
							address:res.address,
							wxId:res.openId,
							isIll:res.isIll,
							isWill:res.isWill,
							brithDay:res.brithDay
						},
					})
					if(result.data.code==200){
						 uni.showToast({
							title: '操作成功'
						})
					}
				}else{
					const result = await this.$myRuquest({
						url: '/archives/updateArchives',
						method:'POST',
						data:{
							id:that.updateId,
							name:res.name,
							idCard:res.idCard,
							age:res.age,
							sex:res.sex,
							phone:res.phone,
							address:res.address,
							isIll:res.isIll,
							isWill:res.isWill,
							brithDay:res.brithDay
						},
					});
					//如果修改成功将updateId设置为空
					if(result.data.code==200){
						that.updateId = ''
						uni.showToast({
							title: '操作成功'
						})
					}
				}
				
				
			},
			
			submitForm(form) {
				let that = this
				this.$refs[form]
					.submit()
					.then(res => {
						uni.showToast({
							title: '验证成功'
						})
						this.archives(that.formData)
						//两秒后跳回预约页面
						setTimeout(()=>{
							 uni.navigateTo({
							  url: '/pages/booking/booking',
							})
						},2000)
					})
					.catch(errors => {
						console.error('验证失败：', errors)
					})
			},
 
			//重置表单 。原生的组件input组件不能重置表单
			resetForm() {
				this.$refs.form.resetFields()
			},
			validateField(form) {
				this.$refs[form]
					.validateField(['name'])
					.then(res => {
						uni.showToast({
							title: '验证成功'
						})
						console.log('表单的值：', res)
						
					})
					.catch(errors => {
						console.error('验证失败：', errors)
					})
			},
 
			clearValidate(form, name) {
				if (!name) name = []
				this.$refs[form].clearValidate(name)
			}
		}
	}
</script>
<style>
	page{
		padding-bottom:100rpx ;
	}
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
</style>