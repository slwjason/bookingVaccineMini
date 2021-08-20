const BASE_URL = 'http://192.168.43.102:3000'
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res)=>{
				if(res.data.code == 200) {
					resolve(res)
				}
				if(res.data.code == 500){
					uni.showToast({
						icon:"error",
						title: res.data.msg
					})
				}
				if(res.data.data.code =='ER_DUP_ENTRY'){
					uni.showToast({
						title: '您已经绑定过了'
					})
				}
			},
			fail: (err)=>{
				reject(err)
				uni.showToast({
					icon:"error",
					title: '系统繁忙！'
				})
				
			}
		})
	})
}