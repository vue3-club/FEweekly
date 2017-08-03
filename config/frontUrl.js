const api = {
	development: 'http://127.0.0.1:9090',
	production: "http://api.feweekly.vue-js.com"
}
export const frontUrl = (()=>{
	if(process.env.NODE_ENV) return api[process.env.NODE_ENV];
	return api['development'];
})()