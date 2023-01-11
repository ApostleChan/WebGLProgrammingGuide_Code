

function main(){
	// 创建着色器源码
	const VERTEX_SHADER_SOURCE = `
    // 必须要存在 main 函数
    void main() {
      // 要绘制的点的坐标
      gl_Position = vec4(0.0,0.0,0.0,1.0);
      // 点的大小
      gl_PointSize = 30.0;
    }
  `; // 顶点着色器

	const FRAGMENT_SHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
   `; // 片元着色器

	// 1.获取canvas元素
	const ctx = document.getElementById('canvas');
	if(!ctx){
		console.log('Failed to retrieve the <canvas> element');
		return;
	}
	// 2.获取WebGL的渲染上下文
	const gl = ctx.getContext('webgl')
	if(!gl){
		console.log('Failed to create WebGL context');
		return;
	}

	// 3.初始化着色器
	if(!initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)){
		console.log('Failed to initialize shader');
		return;
	}
	// 4. 清除画布颜色
	gl.clearColor(1, 1, 1, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	// 5.画一个点
	gl.drawArrays(gl.POINTS, 0, 1);
; 
	
}