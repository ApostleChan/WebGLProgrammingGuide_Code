

function main(){
	// 创建着色器源码
	const VERTEX_SHADER_SOURCE = `
	// 创建attribute变量
	attribute vec4 a_Postion;
	attribute float a_PointSize;
    // 必须要存在 main 函数
    void main() {
      // 要绘制的点的坐标
      gl_Position = a_Postion;
      // 点的大小
      gl_PointSize = a_PointSize;
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
	const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)
	if(!program){
		console.log('Failed to initialize shader');
		return;
	}
	// 4.获取a_postion attribute变量
	const a_Postion = gl.getAttribLocation(program, 'a_Postion');
	if(a_Postion <0){
		console.log('Failed to locate the a_Postion attribute');
		return;
	}
	const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
	if(a_PointSize <0){
		console.log('Failed to locate the a_PointSize attribute');
		return;
	}


	// 5.将顶点位置传递给attribute变量
	gl.vertexAttrib3f(a_Postion, 0.1,0.2,1);
	gl.vertexAttrib1f(a_PointSize, 10.0);


	// 6. 清除画布颜色
	// gl.clearColor(1, 1, 1, 1.0);
	// gl.clear(gl.COLOR_BUFFER_BIT);
	
	// 7.画一个点
	gl.drawArrays(gl.POINTS, 0, 1);
; 
	
}