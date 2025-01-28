"use strict";

var containerEl = document.querySelector(".container");
var canvasEl = document.querySelector("canvas#neuro");
var devicePixelRatio = Math.min(window.devicePixelRatio, 2);
var pointer = {
  x: 0,
  y: 0,
  tX: 0,
  tY: 0
};
var uniforms;
var gl = initShader();
setupEvents();
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
render();
function initShader() {
  var vsSource = document.getElementById("vertShader").innerHTML;
  var fsSource = document.getElementById("fragShader").innerHTML;
  var gl = canvasEl.getContext("webgl") || canvasEl.getContext("experimental-webgl");
  if (!gl) {
    alert("WebGL is not supported by your browser.");
  }
  function createShader(gl, sourceCode, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, sourceCode);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }
  var vertexShader = createShader(gl, vsSource, gl.VERTEX_SHADER);
  var fragmentShader = createShader(gl, fsSource, gl.FRAGMENT_SHADER);
  function createShaderProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }
  var shaderProgram = createShaderProgram(gl, vertexShader, fragmentShader);
  uniforms = getUniforms(shaderProgram);
  function getUniforms(program) {
    var uniforms = [];
    var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (var i = 0; i < uniformCount; i++) {
      var uniformName = gl.getActiveUniform(program, i).name;
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName);
    }
    return uniforms;
  }
  var vertices = new Float32Array([-1., -1., 1., -1., -1., 1., 1., 1., -1., -1., 1., -1., -1., 1., 1., 1., -1., -1., 1., -1., -1., 1., 1., 1.]);
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  gl.useProgram(shaderProgram);
  var positionLocation = gl.getAttribLocation(shaderProgram, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  return gl;
}
function render() {
  var currentTime = performance.now();
  pointer.x += (pointer.tX - pointer.x) * .5;
  pointer.y += (pointer.tY - pointer.y) * .5;
  gl.uniform1f(uniforms.u_time, currentTime);
  gl.uniform2f(uniforms.u_pointer_position, pointer.x / window.innerWidth, 1 - pointer.y / window.innerHeight);
  gl.uniform1f(uniforms.u_scroll_progress, window["scrollY"] / (2 * window.innerHeight));
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  requestAnimationFrame(render);
}
function resizeCanvas() {
  canvasEl.width = window.innerWidth * devicePixelRatio;
  canvasEl.height = window.innerHeight * devicePixelRatio;
  gl.uniform1f(uniforms.u_ratio, canvasEl.width / canvasEl.height);
  gl.viewport(0, 0, canvasEl.width, canvasEl.height);
}
function setupEvents() {
  window.addEventListener("pointermove", function (e) {
    updateMousePosition(e.clientX, e.clientY);
  });
  window.addEventListener("touchmove", function (e) {
    updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
  });
  window.addEventListener("click", function (e) {
    updateMousePosition(e.clientX, e.clientY);
  });
  function updateMousePosition(eX, eY) {
    pointer.tX = eX;
    pointer.tY = eY;
  }
}
var app = new Vue({
  el: "#mount",
  data: function data() {
    return {
      wdo: {},
      title: "Arrow Glaze",
      aero: {
        basic: false,
        transparency: CSS.supports('color', 'rgba(0,0,0,0.5)'),
        blur: CSS.supports('backdrop-filter', 'blur(1px)'),
        css: {
          boxShadow: true,
          overflowHidden: true,
          dropShadowFilter: false
        }
      },
      showSidebar: false
    };
  },
  beforeDestroy: function beforeDestroy() {
    this.wdo.destroy();
  }
});
$(".window").draggable({
  handle: ".titlebar",
  containment: "#mount"
});