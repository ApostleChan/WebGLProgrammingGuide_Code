function main(){
	// 获取canvas元素
	let canvas = document.getElementById('canvas');
	
	let gl = canvas.getContext('webgl');
	if(!gl){
		console.log('Failed to retrieve the <canvas> element');
		return false;
	}
	// get the rendering context for 2DCG
	let ctx = canvas.getContext('2d');
	
	// 明确清理的颜色
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	// 清理canvas
	gl.clear(gl.COLOR_BUFFER_BIT);
}