

function main() {
	// 创建着色器源码
	const VERTEX_SHADER_SOURCE = `
	// 创建attribute变量
	attribute vec4 a_Postion;
	//attribute float a_PointSize;
    // 必须要存在 main 函数
    void main() {
      // 要绘制的点的坐标
      gl_Position = a_Postion;
      // 点的大小
      gl_PointSize = 5.0;
    }
  `; // 顶点着色器

	const FRAGMENT_SHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
   `; // 片元着色器

	// 1.获取canvas元素
	const ctx = document.getElementById('canvas');
	if (!ctx) {
		console.log('Failed to retrieve the <canvas> element');
		return;
	}
	// 2.获取WebGL的渲染上下文
	const gl = ctx.getContext('webgl')
	if (!gl) {
		console.log('Failed to create WebGL context');
		return;
	}

	// 3.初始化着色器
	const program = initShader(gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE)
	if (!program) {
		console.log('Failed to initialize shader');
		return;
	}

	console.log(program)

	// 设置点的位置
	var n = initVertexBuffers(gl, program);

	// 绘制点的数量
	gl.drawArrays(gl.POINTS, 0, n);
}


// 初始化顶点数据
function initVertexBuffers(gl, program) {
	var vertexData = [
		//x y
		0.0, 0.5,
		-0.5, -0.5,
		0.5, -0.5
	]
	var n = 3; //顶点的数量
	// 1.创建缓冲区对象
	var vertexBuffer = gl.createBuffer();
	if(!vertexBuffer){
		console.log('Failed to create Vertex Buffer');
		return -1;
	}
	// 2.将缓冲区对象绑定到目标
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
	// 3. 将数据写入到缓冲区对象中
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW)

	// 获取坐标属性
	var a_Postion = gl.getAttribLocation(program, 'a_Postion')
	// 将缓冲区对象分配给一个属性变量
	gl.vertexAttribPointer(a_Postion, 2, gl.FLOAT, false, 0, 0)
	// 启用分配
	gl.enableVertexAttribArray(a_Postion)
	return n;
}