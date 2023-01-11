

function main() {
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
	//需要手动设置精度
	precision mediump float;
	// 创建uniform变量
	uniform vec4 u_Color;
    void main() {
      gl_FragColor = u_Color;
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
	// 4.获取a_postion attribute变量
	const a_Postion = gl.getAttribLocation(program, 'a_Postion');
	if (a_Postion < 0) {
		console.log('Failed to locate the a_Postion attribute');
		return;
	}
	const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
	if (a_PointSize < 0) {
		console.log('Failed to locate the a_PointSize attribute');
		return;
	}
	const u_Color = gl.getUniformLocation(program, 'u_Color');
	if (u_Color < 0) {
		console.log('Failed to locate the u_Color uniform');
		return;
	}

	// // 5.将顶点位置传递给attribute变量
	// gl.vertexAttrib3f(a_Postion, 0.1, 0.2, 1);
	gl.vertexAttrib1f(a_PointSize, 10.0);

	// canvas点击事件
	const gl_points = [] //点位数组
	const gl_colors = [] //颜色数组
	ctx.onclick = function (e) {
		//获取鼠标的位置
		var x = e.clientX;
		var y = e.clientY;
		//获取鼠标相对于canvas的位置
		var canvas = e.target.getBoundingClientRect();
		var canvas_left = x - canvas.left;
		var canvas_top = y - canvas.top;

		// 获取canvas元素的宽度和高度
		var canvas_width = ctx.offsetWidth;
		var canvas_height = ctx.offsetHeight;

		//获取鼠标相对于canvas的位置,转变为其次坐标
		var click_x = (canvas_left - canvas_width / 2) / (canvas_width / 2);
		var click_y = (canvas_height / 2 - canvas_top) / (canvas_height / 2);
		console.log(click_x, click_y);


		gl_points.push({
			click_x,
			click_y
		});
		if (click_x > 0 && click_y > 0) {
			gl_colors.push({
				r: 1.0,
				g: 0.0,
				b: 0.0,
				a: 1.0  // 绘制红色
			});
		} else if (click_x < 0 && click_y < 0) {
			gl_colors.push({
				r: 0.0,
				g: 1.0,
				b: 0.0,
				a: 1.0 // 绘制绿色
			});
		} else {
			gl_colors.push({
				r: 1.0,
				g: 1.0,
				b: 1.0,
				a: 1.0 // 绘制白色
			});
		}


		for (var i = 0; i < gl_points.length; i++) {
			gl.vertexAttrib2f(a_Postion, gl_points[i].click_x, gl_points[i].click_y);
			gl.uniform4f(u_Color, gl_colors[i].r, gl_colors[i].g, gl_colors[i].b, gl_colors[i].a);
			// 7.画一个点
			gl.drawArrays(gl.POINTS, 0, 1);
		};


	};
	// 6. 清除画布颜色
	// gl.clearColor(1, 1, 1, 1.0);
	// gl.clear(gl.COLOR_BUFFER_BIT);
}