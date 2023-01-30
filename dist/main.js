/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./src/renderer.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n\r\n\r\nvar render;\r\nwindow.onload = () => {\r\n    render = new _renderer__WEBPACK_IMPORTED_MODULE_0__.renderer();\r\n    const buttonnormal = document.getElementById(\"buttonnormal\");\r\n    const buttondisk = document.getElementById(\"buttondisk\");\r\n    buttonnormal.addEventListener(\"click\", () => {\r\n        RunScript(false);\r\n    });\r\n    buttondisk.addEventListener(\"click\", () => {\r\n        RunScript(true);\r\n    });\r\n};\r\nfunction RunScript(mode) {\r\n    let par = new _types__WEBPACK_IMPORTED_MODULE_1__.parameter();\r\n    par.particles = parseFloat(document.getElementById(\"input1\").value);\r\n    par.step = parseFloat(document.getElementById(\"input2\").value);\r\n    par.alpha = parseFloat(document.getElementById(\"input3\").value);\r\n    par.mode = mode;\r\n    if (!mode)\r\n        par.translation = new _types__WEBPACK_IMPORTED_MODULE_1__.vec2(-1., 0.);\r\n    render.draw(calculation(par), par);\r\n}\r\nfunction calculation(par) {\r\n    let position = new Array(par.particles);\r\n    let velocity;\r\n    let w = new Array(10);\r\n    let phi = new Array(10);\r\n    let pos;\r\n    for (let i = 0; i < 10; ++i) {\r\n        w[i] = Math.random() * 2.;\r\n        phi[i] = Math.random() * 2. * Math.PI;\r\n    }\r\n    for (let i = 0; i < par.particles; ++i) {\r\n        [pos, velocity] = par.randompointandvelocity();\r\n        position[i] = new Array(2 * par.step);\r\n        for (let j = 0; j < par.step; ++j) {\r\n            for (let k = 0; k < w.length; ++k) {\r\n                velocity.x += par.strength * (-w[k] * Math.sin(w[k] * pos.x * phi[k]) + Math.cos(w[k] * pos.y + phi[k]));\r\n                velocity.y += par.strength * (-w[k] * Math.sin(w[k] * pos.y * phi[k]) + Math.cos(w[k] * pos.x + phi[k]));\r\n            }\r\n            pos = pos.sum(velocity);\r\n            [position[i][2 * j], position[i][2 * j + 1]] = pos.toarray();\r\n        }\r\n    }\r\n    return position;\r\n}\r\n\n\n//# sourceURL=webpack://webbf/./src/main.ts?");

/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderer\": () => (/* binding */ renderer)\n/* harmony export */ });\n/* harmony import */ var _shadersources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shadersources */ \"./src/shadersources.ts\");\n\r\nclass renderer {\r\n    constructor() {\r\n        this.setupwebgl();\r\n    }\r\n    ;\r\n    setupwebgl() {\r\n        const canvas = document.getElementById(\"gl\");\r\n        canvas.width = canvas.clientWidth;\r\n        canvas.height = canvas.clientHeight;\r\n        this.gl = canvas.getContext('webgl2');\r\n        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);\r\n        let vertexshader = this.gl.createShader(this.gl.VERTEX_SHADER);\r\n        let fragmenshader = this.gl.createShader(this.gl.FRAGMENT_SHADER);\r\n        this.gl.shaderSource(vertexshader, _shadersources__WEBPACK_IMPORTED_MODULE_0__.vssource);\r\n        this.gl.compileShader(vertexshader);\r\n        if (!this.gl.getShaderParameter(vertexshader, this.gl.COMPILE_STATUS)) {\r\n            console.error(this.gl.getShaderInfoLog(vertexshader));\r\n        }\r\n        this.gl.shaderSource(fragmenshader, _shadersources__WEBPACK_IMPORTED_MODULE_0__.fssource);\r\n        this.gl.compileShader(fragmenshader);\r\n        if (!this.gl.getShaderParameter(fragmenshader, this.gl.COMPILE_STATUS)) {\r\n            console.error(this.gl.getShaderInfoLog(fragmenshader));\r\n        }\r\n        this.program = this.gl.createProgram();\r\n        this.gl.attachShader(this.program, vertexshader);\r\n        this.gl.attachShader(this.program, fragmenshader);\r\n        this.gl.linkProgram(this.program);\r\n        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {\r\n            console.error(this.gl.getProgramInfoLog(this.program));\r\n        }\r\n        this.gl.clearColor(0., 0., 0., 0.);\r\n        this.gl.enable(this.gl.BLEND);\r\n        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.DST_ALPHA);\r\n        this.gl.disable(this.gl.DEPTH_TEST);\r\n        this.gl.useProgram(this.program);\r\n        this.utrans = this.gl.getUniformLocation(this.program, 'trans');\r\n        this.upos = this.gl.getAttribLocation(this.program, 'pos');\r\n        this.ualpha = this.gl.getUniformLocation(this.program, 'alpha');\r\n        this.bufferpos = this.gl.createBuffer();\r\n        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferpos);\r\n    }\r\n    draw(position, par) {\r\n        this.gl.clearColor(1., 0., 0., 1.);\r\n        const trans = par.getmatrix();\r\n        this.gl.uniformMatrix4fv(this.utrans, true, trans);\r\n        this.gl.uniform1f(this.ualpha, par.alpha);\r\n        for (let i = 0; i < position.length; ++i) {\r\n            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(position[i]), this.gl.DYNAMIC_DRAW);\r\n            this.gl.vertexAttribPointer(this.upos, 2, this.gl.FLOAT, false, 0, 0);\r\n            this.gl.enableVertexAttribArray(this.upos);\r\n            this.gl.drawArrays(this.gl.LINE_STRIP, 0, position[i].length * .5);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://webbf/./src/renderer.ts?");

/***/ }),

/***/ "./src/shadersources.ts":
/*!******************************!*\
  !*** ./src/shadersources.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cssource\": () => (/* binding */ cssource),\n/* harmony export */   \"fssource\": () => (/* binding */ fssource),\n/* harmony export */   \"vssource\": () => (/* binding */ vssource)\n/* harmony export */ });\nconst vssource = `#version 300 es\r\n\r\nin vec2 pos;\r\n\r\nuniform mat4 trans;\r\n\r\nvoid main() {\r\n  gl_Position = trans*vec4(pos.x-1.,pos.y, 0.0, 1.0);\r\n}`;\r\nconst fssource = `#version 300 es\r\nprecision highp float;\r\n\r\nout vec4 color;\r\n\r\nuniform float alpha;\r\n\r\nvoid main() {\r\n  color = vec4(1.,1.,0.,alpha);\r\n}`;\r\nconst cssource = `#version 300 es\r\nlayout(local_size_x=1024) in;\r\n\r\nlayout(std430,binding=2) buffer pos{\r\n\tvec4 position[];\r\n};\r\n\r\nlayout(std430,binding=3) buffer vel{\r\n\tvec2 velocity[];\r\n};\r\n\r\nuniform ivec2 size;\r\n\r\nconst uint gid=gl_GlobalInvocationID.x;\r\n\r\nuniform float w[10];\r\nuniform float phi[10];\r\n\r\nvoid main(){\r\n\r\n\tvec2 pos=position[gid].xy;\r\n\tvec2 vel=velocity[gid];\r\n\r\n\tfor(int i=0;i<10;++i){\r\n\t\r\n\t\tvel=vel+0.0025*(-w[i]*sin(w[i]*pos*phi[i])+cos(w[i]*pos.yx+phi[i]));\r\n\t\r\n\t}\r\n\r\n\tposition[gid].zw=pos;\r\n\tvelocity[gid]=vel;\r\n\tposition[gid].xy=pos+vel;\r\n\r\n}`;\r\n\n\n//# sourceURL=webpack://webbf/./src/shadersources.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"parameter\": () => (/* binding */ parameter),\n/* harmony export */   \"vec2\": () => (/* binding */ vec2)\n/* harmony export */ });\nclass vec2 {\r\n    constructor(x, y) {\r\n        this.x = 0;\r\n        this.y = 0;\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    mul(k) {\r\n        return new vec2(this.x * k, this.y * k);\r\n    }\r\n    sum(v) {\r\n        return new vec2(this.x + v.x, v.y + this.y);\r\n    }\r\n    toarray() {\r\n        return [this.x, this.y];\r\n    }\r\n}\r\n;\r\nclass parameter {\r\n    constructor(par, step, angle, zoom, trans, mod, transparency, strength) {\r\n        this.particles = 250;\r\n        this.step = 125;\r\n        this.maxangle = Math.PI / 3.;\r\n        this.zoom = new vec2(0.02, 0.02);\r\n        this.translation = new vec2(0., 0.);\r\n        this.alpha = 0.5;\r\n        this.mode = false;\r\n        this.strength = 0.0025;\r\n        this.particles = par !== null && par !== void 0 ? par : 250;\r\n        this.step = step !== null && step !== void 0 ? step : 125;\r\n        this.maxangle = angle !== null && angle !== void 0 ? angle : Math.PI / 4.;\r\n        this.zoom = zoom !== null && zoom !== void 0 ? zoom : new vec2(0.02, 0.02);\r\n        this.alpha = transparency !== null && transparency !== void 0 ? transparency : 0.5;\r\n        this.translation = trans !== null && trans !== void 0 ? trans : new vec2(0., 0.);\r\n        this.mode = mod !== null && mod !== void 0 ? mod : false;\r\n        this.strength = strength !== null && strength !== void 0 ? strength : 0.0025;\r\n    }\r\n    ;\r\n    getmatrix() {\r\n        return [this.zoom.x, 0., 0., this.translation.x,\r\n            0., this.zoom.y, 0., this.translation.y,\r\n            0., 0., 1., 0.,\r\n            0., 0., 0., 1.];\r\n    }\r\n    randompointandvelocity() {\r\n        let position;\r\n        let velocity;\r\n        if (this.mode) {\r\n            let rand = Math.random() * 2. * Math.PI;\r\n            velocity = new vec2(Math.cos(rand), Math.sin(rand));\r\n            position = velocity.mul(0.1);\r\n        }\r\n        else {\r\n            let rand = (Math.random() * 2 - 1) * this.maxangle;\r\n            velocity = new vec2(Math.cos(rand), Math.sin(rand));\r\n            rand = (Math.random() * 2 - 1) * this.maxangle;\r\n            position = new vec2(0., (Math.random() - 1) * .5);\r\n        }\r\n        return [position, velocity];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://webbf/./src/types.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;