/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nwebSocket = new WebSocket(\"ws://localhost:8080/sockets/events/\");\nwebSocket.onmessage = function(event){\n\tif (typeof event === \"string\"){\n\t\tmessageReceive(event);\n\t}\n}\nfunction messageRecieve(msg){\n\tconsole.log(\"messageReceive: \" + msg);\n\tdocument.getElementsByTagName(\"h1\")[0].innerHTML = msg;\n\tdat = JSON.parse(msg);\n\t\n\tflag = false;\n\tif (\"color\" in dat){\n\t\tdinos[dat.color].x = dat.x;\n\t\tdinos[dat.color].y = dat.y;\n\t}\n\telse{\n\t\tdinos[\"blue\"].x = dat.x;\n\t\tdinos[\"blue\"].y = dat.y;\n\t}\n}\nvar canvas = document.getElementById('canvas');\nctx = canvas.getContext('2d');\n\nfunction trackKeys(keys) {\n  let down = Object.create(null);\n  function track(event) {\n    if (keys.includes(event.key)) {\n      down[event.key] = event.type == \"keydown\";\n      event.preventDefault();\n      webSocket.send(event.key);\n      console.log(event.key);\n    }\n  }\n  window.addEventListener(\"keydown\", track);\n  window.addEventListener(\"keyup\", track);\n\n  return down;\n}\nfunction sendDat() {\n  webSocket.send();\n}\nfunction Sprite(img, srcwidth, srcheight, width, height, positions){\n  this.img = img;\n  this.srcwidth = srcwidth;\n  this.srcheight = srcheight;\n  this.width = width;\n  this.height = height;\n  this.positions = positions;\n}\n\nSprite.prototype = {\n\tdraw: function(position, x, y){\n\t\tvar pos = this.positions[position];\n\t\tctx.drawImage(\n\t\t\t\tthis.img,\n\t\t\t\tpos[0],\n\t\t\t\tpos[1],\n\t\t\t\tthis.srcwidth,\n\t\t\t\tthis.srcheight,\n\t\t\t\tx, y,\n\t\t\t\tthis.width,\n\t\t\t\tthis.height\n\t\t);\n\t}\n};\nfunction Dino(path, startframe, endframe, x = 0, y = 0){\n\tthis.x = x;\n\tthis.y = y;\n\tthis.path = path;\n\tthis.lastframe = startframe;\n\tthis.startframe = startframe;\n\tthis.endframe = endframe;\n\tthis.img = new Image();\n\tthis.img.src = path;\n\tvar loc = []; \n\tfor(let i=this.startframe; i<this.endframe;i++){\n\t    loc[i] = [i*24, 0];\n\t}\n\tthis.sprite = new Sprite(this.img, 24, 24, 48, 48, loc);\n}\n\nDino.prototype = {\n\tdraw: function(){\n\t\tthis.sprite.draw(this.lastframe++, this.x, this.y);\n\t\tif (this.lastframe >= this.endframe){\n\t\t\tthis.lastframe = this.startframe; \n\t\t}\n\t}\n}\n\ndinos = {\n\t\"blue\": new Dino('res/sheets/DinoSprites - doux.png', 4, 10),\n\t\"red\": new Dino('res/sheets/DinoSprites - mort.png', 4, 10, 300, 300)\n} \n\nsetInterval(() => {\n\tctx.mozImageSmoothingEnabled = false;\n\tctx.webkitImageSmoothingEnabled = false;\n\tctx.msImageSmoothingEnabled = false;\n\tctx.imageSmoothingEnabled = false;\n\tctx.clearRect(0, 0, canvas.width, canvas.height);\n\tfor (const [color, dino] of Object.entries(dinos)) {\n\t  dino.draw();\n\t}\n}, 200);\n\nsetTimeout(() => {\n\tmessageRecieve(\"{\\\"x\\\":50, \\\"y\\\":10}\");\n}, 700);\nsetTimeout(() => {\n\tmessageRecieve(\"{\\\"color\\\":\\\"red\\\", \\\"x\\\":325, \\\"y\\\":318}\");\n}, 1500);\n\ndocument.getElementsByTagName(\"h1\")[0].innerHTML =\"Hello\";\nconsole.log(\"Init\");\nconst arrowKeys = trackKeys([\"ArrowLeft\", \"ArrowRight\", \"ArrowUp\", \"w\", \"a\", \"s\", \"d\", \"W\", \"A\", \"S\", \"D\"]);\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });