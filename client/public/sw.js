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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/js/sw.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/js/sw.js":
/*!*****************************!*\
  !*** ./client/src/js/sw.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _appInfo = __webpack_require__(/*! ./utils/appInfo */ \"./client/src/js/utils/appInfo.js\");\n\nvar AppInfo = _interopRequireWildcard(_appInfo);\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nvar CACHE_NAME = AppInfo.APP_NAME + AppInfo.APP_VERSION;\n\nvar APP_SHELL_TO_CACHE = [\"/\", \"js/bundle.js\", \"css/style.css\"];\n\nself.addEventListener(\"install\", function (event) {\n    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {\n        return cache.addAll(APP_SHELL_TO_CACHE);\n    }));\n});\n\nself.addEventListener(\"activate\", function (event) {\n    event.waitUntil(caches.keys().then(function (cacheNames) {\n        return Promise.all(cacheNames.filter(function (cacheName) {\n            return cacheName.startsWith(AppInfo.APP_NAME) && cacheName != CACHE_NAME;\n        }).map(function (cacheName) {\n            return caches.delete(cacheName);\n        }));\n    }));\n});\n\nself.addEventListener(\"fetch\", function (event) {\n    if (event.request.url.indexOf(\"/api\") != -1) {\n        event.respondWith(fetch(event.request));\n    } else {\n        event.respondWith(caches.open(CACHE_NAME).then(function (cache) {\n            return cache.match(event.request).then(function (response) {\n                return response || fetch(event.request);\n            });\n        }));\n    }\n});\n\n//# sourceURL=webpack:///./client/src/js/sw.js?");

/***/ }),

/***/ "./client/src/js/utils/appInfo.js":
/*!****************************************!*\
  !*** ./client/src/js/utils/appInfo.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar APP_NAME = exports.APP_NAME = \"Taskor\";\nvar APP_VERSION = exports.APP_VERSION = \"1.2.3\";\n\n//# sourceURL=webpack:///./client/src/js/utils/appInfo.js?");

/***/ })

/******/ });