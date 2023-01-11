function main(){
	// 1.获取canvas元素
	let canvas = document.getElementById('canvas');
	if(!canvas){
		console.log('Failed to retrieve the <canvas> element');
		return false;
	}
	// 2.请求来自元素中的2D图形的渲染“上下文”
	let ctx = canvas.getContext('2d');
	
	// 3.使用上下文支持的方法绘制二维图形
	ctx.fillStyle = 'rgba(0, 0, 255, 1.0)'; // set a blue color
	ctx.fillRect(120, 10, 150, 150); // fill a rectangle with the color
}