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

/***/ "./src/Scripts.ts":
/*!************************!*\
  !*** ./src/Scripts.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"InitScript\": () => (/* binding */ InitScript),\n/* harmony export */   \"RunScript\": () => (/* binding */ RunScript)\n/* harmony export */ });\n/* harmony import */ var _calculations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calculations */ \"./src/calculations.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n\n\nfunction InitScript(mode) {\n    if (mode == _types__WEBPACK_IMPORTED_MODULE_1__.MODE.Focal) {\n        document.querySelectorAll(\".inoptional\").forEach(function (el) {\n            el.style.visibility = \"visible\";\n        });\n    }\n    else {\n        document.querySelectorAll(\".inoptional\").forEach(function (el) {\n            el.style.visibility = \"visible\";\n        });\n        // document.getElementById(\"initposx\").style.visibility=\"visible\";\n        // document.getElementById(\"initposy\").style.visibility=\"visible\";\n        // document.getElementById(\"inputangle\").style.visibility=\"visible\";\n    }\n}\nfunction RunScript(render, par) {\n    par.particles = parseFloat(document.getElementById(\"input1\").value);\n    par.step = parseFloat(document.getElementById(\"input2\").value);\n    par.alpha = parseFloat(document.getElementById(\"input3\").value);\n    par.energy = parseFloat(document.getElementById(\"inputenergy\").value);\n    par.initpos.x = parseFloat(document.getElementById(\"initposx\").value);\n    par.initpos.y = parseFloat(document.getElementById(\"initposy\").value);\n    par.maxangle = parseFloat(document.getElementById(\"inputangle\").value) * Math.PI / 180.;\n    render.draw((0,_calculations__WEBPACK_IMPORTED_MODULE_0__.calculation)(par), par);\n}\n\n\n//# sourceURL=webpack://webbf/./src/Scripts.ts?");

/***/ }),

/***/ "./src/calculations.ts":
/*!*****************************!*\
  !*** ./src/calculations.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calculation\": () => (/* binding */ calculation)\n/* harmony export */ });\nfunction calculation(par) {\n    let position = new Array(par.particles);\n    let velocity;\n    let w = new Array(10);\n    let phi = new Array(10);\n    let pos;\n    for (let i = 0; i < 10; ++i) {\n        w[i] = Math.random() * 2.;\n        phi[i] = Math.random() * 2. * Math.PI;\n    }\n    for (let i = 0; i < par.particles; ++i) {\n        [pos, velocity] = par.initrandom();\n        position[i] = new Array(2 * par.step);\n        [position[i][0], position[i][1]] = pos.toarray();\n        for (let j = 1; j < par.step; ++j) {\n            for (let k = 0; k < w.length; ++k) {\n                velocity.x += .0025 * (-w[k] * Math.sin(w[k] * pos.x * phi[k]) + Math.cos(w[k] * pos.y + phi[k]));\n                velocity.y += .0025 * (-w[k] * Math.sin(w[k] * pos.y * phi[k]) + Math.cos(w[k] * pos.x + phi[k]));\n            }\n            pos = pos.sum(velocity);\n            [position[i][2 * j], position[i][2 * j + 1]] = pos.toarray();\n        }\n    }\n    return position;\n}\n\n\n//# sourceURL=webpack://webbf/./src/calculations.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderer */ \"./src/renderer.ts\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ \"./src/types.ts\");\n/* harmony import */ var _Scripts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Scripts */ \"./src/Scripts.ts\");\n\n\n\nwindow.onload = () => {\n    const render = new _renderer__WEBPACK_IMPORTED_MODULE_0__.renderer();\n    const buttonfocal = document.getElementById(\"buttonfocal\");\n    const buttondisk = document.getElementById(\"buttondisk\");\n    const buttondirectional = document.getElementById(\"buttondirectional\");\n    const runbutton = document.getElementById(\"runbutton\");\n    let par = new _types__WEBPACK_IMPORTED_MODULE_1__.parameter();\n    buttonfocal.addEventListener(\"click\", () => {\n        (0,_Scripts__WEBPACK_IMPORTED_MODULE_2__.InitScript)(_types__WEBPACK_IMPORTED_MODULE_1__.MODE.Focal);\n        par.mode = _types__WEBPACK_IMPORTED_MODULE_1__.MODE.Focal;\n    });\n    buttondisk.addEventListener(\"click\", () => {\n        (0,_Scripts__WEBPACK_IMPORTED_MODULE_2__.InitScript)(_types__WEBPACK_IMPORTED_MODULE_1__.MODE.Radial);\n        par.mode = _types__WEBPACK_IMPORTED_MODULE_1__.MODE.Radial;\n    });\n    buttondirectional.addEventListener(\"click\", () => {\n        (0,_Scripts__WEBPACK_IMPORTED_MODULE_2__.InitScript)(_types__WEBPACK_IMPORTED_MODULE_1__.MODE.Directional);\n        par.mode = _types__WEBPACK_IMPORTED_MODULE_1__.MODE.Directional;\n    });\n    runbutton.addEventListener(\"click\", () => {\n        (0,_Scripts__WEBPACK_IMPORTED_MODULE_2__.RunScript)(render, par);\n    });\n};\n\n\n//# sourceURL=webpack://webbf/./src/main.ts?");

/***/ }),

/***/ "./src/renderer.ts":
/*!*************************!*\
  !*** ./src/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"renderer\": () => (/* binding */ renderer)\n/* harmony export */ });\n/* harmony import */ var _shadersources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shadersources */ \"./src/shadersources.ts\");\n\nclass renderer {\n    constructor() {\n        this.setupwebgl();\n    }\n    ;\n    setupwebgl() {\n        const canvas = document.getElementById(\"gl\");\n        canvas.width = canvas.clientWidth;\n        canvas.height = canvas.clientHeight;\n        this.gl = canvas.getContext('webgl2');\n        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);\n        let vertexshader = this.gl.createShader(this.gl.VERTEX_SHADER);\n        let fragmenshader = this.gl.createShader(this.gl.FRAGMENT_SHADER);\n        this.gl.shaderSource(vertexshader, _shadersources__WEBPACK_IMPORTED_MODULE_0__.vssource);\n        this.gl.compileShader(vertexshader);\n        if (!this.gl.getShaderParameter(vertexshader, this.gl.COMPILE_STATUS)) {\n            console.error(this.gl.getShaderInfoLog(vertexshader));\n        }\n        this.gl.shaderSource(fragmenshader, _shadersources__WEBPACK_IMPORTED_MODULE_0__.fssource);\n        this.gl.compileShader(fragmenshader);\n        if (!this.gl.getShaderParameter(fragmenshader, this.gl.COMPILE_STATUS)) {\n            console.error(this.gl.getShaderInfoLog(fragmenshader));\n        }\n        this.program = this.gl.createProgram();\n        this.gl.attachShader(this.program, vertexshader);\n        this.gl.attachShader(this.program, fragmenshader);\n        this.gl.linkProgram(this.program);\n        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {\n            console.error(this.gl.getProgramInfoLog(this.program));\n        }\n        this.gl.clearColor(0., 0., 0., 0.);\n        this.gl.enable(this.gl.BLEND);\n        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.DST_ALPHA);\n        this.gl.disable(this.gl.DEPTH_TEST);\n        this.gl.useProgram(this.program);\n        this.utrans = this.gl.getUniformLocation(this.program, 'trans');\n        this.upos = this.gl.getAttribLocation(this.program, 'pos');\n        this.ualpha = this.gl.getUniformLocation(this.program, 'alpha');\n        this.bufferpos = this.gl.createBuffer();\n        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.bufferpos);\n    }\n    draw(position, par) {\n        this.gl.clearColor(1., 0., 0., 1.);\n        const trans = par.getmatrix();\n        this.gl.uniformMatrix4fv(this.utrans, true, trans);\n        this.gl.uniform1f(this.ualpha, par.alpha);\n        for (let i = 0; i < position.length; ++i) {\n            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(position[i]), this.gl.DYNAMIC_DRAW);\n            this.gl.vertexAttribPointer(this.upos, 2, this.gl.FLOAT, false, 0, 0);\n            this.gl.enableVertexAttribArray(this.upos);\n            this.gl.drawArrays(this.gl.LINE_STRIP, 0, position[i].length * .5);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://webbf/./src/renderer.ts?");

/***/ }),

/***/ "./src/shadersources.ts":
/*!******************************!*\
  !*** ./src/shadersources.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cssource\": () => (/* binding */ cssource),\n/* harmony export */   \"fssource\": () => (/* binding */ fssource),\n/* harmony export */   \"vssource\": () => (/* binding */ vssource)\n/* harmony export */ });\nconst vssource = `#version 300 es\n\nin vec2 pos;\n\nuniform mat4 trans;\n\nvoid main() {\n  gl_Position = trans*vec4(pos.x-1.,pos.y, 0.0, 1.0);\n}`;\nconst fssource = `#version 300 es\nprecision highp float;\n\nout vec4 color;\n\nuniform float alpha;\n\nvoid main() {\n  color = vec4(1.,1.,0.,alpha);\n}`;\nconst cssource = `#version 300 es\nlayout(local_size_x=1024) in;\n\nlayout(std430,binding=2) buffer pos{\n\tvec4 position[];\n};\n\nlayout(std430,binding=3) buffer vel{\n\tvec2 velocity[];\n};\n\nuniform ivec2 size;\n\nconst uint gid=gl_GlobalInvocationID.x;\n\nuniform float w[10];\nuniform float phi[10];\n\nvoid main(){\n\n\tvec2 pos=position[gid].xy;\n\tvec2 vel=velocity[gid];\n\n\tfor(int i=0;i<10;++i){\n\t\n\t\tvel=vel+0.0025*(-w[i]*sin(w[i]*pos*phi[i])+cos(w[i]*pos.yx+phi[i]));\n\t\n\t}\n\n\tposition[gid].zw=pos;\n\tvelocity[gid]=vel;\n\tposition[gid].xy=pos+vel;\n\n}`;\n\n\n//# sourceURL=webpack://webbf/./src/shadersources.ts?");

/***/ }),

/***/ "./src/types.ts":
/*!**********************!*\
  !*** ./src/types.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MODE\": () => (/* binding */ MODE),\n/* harmony export */   \"parameter\": () => (/* binding */ parameter),\n/* harmony export */   \"vec2\": () => (/* binding */ vec2)\n/* harmony export */ });\nclass vec2 {\n    constructor(x, y) {\n        this.x = 0;\n        this.y = 0;\n        this.x = x;\n        this.y = y;\n    }\n    mul(k) {\n        return new vec2(this.x * k, this.y * k);\n    }\n    sum(v) {\n        return new vec2(this.x + v.x, v.y + this.y);\n    }\n    toarray() {\n        return [this.x, this.y];\n    }\n}\n;\nvar MODE;\n(function (MODE) {\n    MODE[MODE[\"Focal\"] = 1] = \"Focal\";\n    MODE[MODE[\"Radial\"] = 0] = \"Radial\";\n    MODE[MODE[\"Directional\"] = 2] = \"Directional\";\n})(MODE || (MODE = {}));\n;\nclass parameter {\n    constructor(par, step, angle, zoom, initpos, mod, transparency, strength) {\n        this.particles = 250;\n        this.step = 125;\n        this.maxangle = Math.PI / 3.;\n        this.zoom = new vec2(0.02, 0.02);\n        this.translation = new vec2(0., 0.);\n        this.alpha = 0.5;\n        this.energy = 1.;\n        this.mode = MODE.Focal;\n        this.initpos = new vec2(0., 0.);\n        this.particles = par !== null && par !== void 0 ? par : 250;\n        this.step = step !== null && step !== void 0 ? step : 125;\n        this.maxangle = angle !== null && angle !== void 0 ? angle : Math.PI / 4.;\n        this.zoom = zoom !== null && zoom !== void 0 ? zoom : new vec2(0.02, 0.02);\n        this.alpha = transparency !== null && transparency !== void 0 ? transparency : 0.5;\n        this.mode = mod !== null && mod !== void 0 ? mod : MODE.Focal;\n    }\n    ;\n    getmatrix() {\n        return [this.zoom.x, 0., 0., -this.initpos.x * (this.zoom.x - 1) + this.translation.x,\n            0., this.zoom.y, 0., -this.initpos.y * (this.zoom.y - 1) + this.translation.y,\n            0., 0., 1., 0.,\n            0., 0., 0., 1.];\n    }\n    initrandom() {\n        let velocity;\n        let position;\n        let angle;\n        switch (this.mode) {\n            case MODE.Focal:\n                angle = (2. * Math.random() - 1) * this.maxangle;\n                velocity = new vec2(Math.cos(angle), Math.sin(angle)).mul(this.energy);\n                position = this.initpos;\n                break;\n            case MODE.Radial:\n                angle = Math.random() * 2 * Math.PI;\n                velocity = new vec2(Math.cos(angle), Math.sin(angle)).mul(this.energy);\n                position = this.initpos;\n                break;\n            default:\n                velocity = new vec2(this.energy, 0);\n                let y = (2 * Math.random() - 1) / this.zoom.y;\n                position = new vec2(this.initpos.x, y);\n                break;\n        }\n        return [position, velocity];\n    }\n}\n\n\n//# sourceURL=webpack://webbf/./src/types.ts?");

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