const BASE_URL = 'http://localhost:3000'
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res)=>{
				console.log(res.data.code)
				if(res.data.code == 200) {
					resolve(res)
					
				}
				
			},
			fail: (err)=>{
				reject(err)
				uni.showToast({
					title: '请求接口失败'
				})
				
			}
		})
	})
}