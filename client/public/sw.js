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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
eval("\n\nvar CACHE_NAME = 'taskor-2f1a28'; // Depends on app version\nvar APP_SHELL_TO_CACHE = ['/', 'js/bundle.js', 'css/style.css'];\n\nself.addEventListener('install', function (event) {\n    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {\n        return cache.addAll(APP_SHELL_TO_CACHE);\n    }));\n});\n\nself.addEventListener('activate', function (event) {\n    event.waitUntil(caches.keys().then(function (cacheNames) {\n        return Promise.all(cacheNames.filter(function (cacheName) {\n            return cacheName.startsWith('taskor-') && cacheName != CACHE_NAME;\n        }).map(function (cacheName) {\n            return caches.delete(cacheName);\n        }));\n    }));\n});\n\nself.addEventListener('fetch', function (event) {\n    if (event.request.url.indexOf('/api') != -1) {\n        event.respondWith(fetch(event.request));\n    } else {\n        event.respondWith(caches.open(CACHE_NAME).then(function (cache) {\n            return cache.match(event.request).then(function (response) {\n                return response || fetch(event.request);\n            });\n        }));\n    }\n});\n\n//# sourceURL=webpack:///./client/src/js/sw.js?");

/***/ })

/******/ });