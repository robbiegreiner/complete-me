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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_Complete_Me_js__ = __webpack_require__(1);





var completeMe = new __WEBPACK_IMPORTED_MODULE_0__scripts_Complete_Me_js__["a" /* default */]();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Node_js__ = __webpack_require__(2);


class CompleteMe {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(word) {
    const node = new __WEBPACK_IMPORTED_MODULE_0__Node_js__["a" /* default */]();

    if (this.root === null) {
      this.root = node;
    }

    let letters = [...word.toLowerCase()];

    let currentNode = this.root;

    // creates a childnode.letter node for each letter
    letters.forEach(letter => {
      if (!currentNode.childNode[letter]) {
        currentNode.childNode[letter] = new __WEBPACK_IMPORTED_MODULE_0__Node_js__["a" /* default */](letter);
      }
      currentNode = currentNode.childNode[letter];
    })

    if (!currentNode.isFullWord) {
      currentNode.isFullWord = true;
      this.wordCount++;
    }
  }

  count() {
    return this.wordCount;
  }

  suggest(word) {
    let wordsArray = [...word];
    let currentNode = this.root;
    let suggestions = [];


    for (var i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.childNode[wordsArray[i]];
    }

    const searchTrie = (word, currentNode) => {
      const keys = Object.keys(currentNode.childNode);

      for (var j = 0; j < keys.length; j++) {
        const child = currentNode.childNode[keys[j]];
        const newString = word + child.letter;

        if (child.isFullWord) {
          suggestions.push({value: newString, frequency:
          child.frequency, lastTouched: child.lastTouched});
        }
        searchTrie(newString, child)
      }
    }

    if (currentNode && currentNode.isFullWord) {
      suggestions.push({value: word, frequency: currentNode.frequency, lastTouched: currentNode.lastTouched});
    }
    if (currentNode) {
      searchTrie(word, currentNode);
    }
    suggestions.sort((a, b) => {
      return b.frequency - a.frequency || b.lastTouched - a.lastTouched;
    })
    return suggestions.map(obj => {
      return obj.value;
    });
  }

  select(word) {
    let wordsArray = [...word];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.childNode[wordsArray[i]];
    }
    currentNode.frequency++;
    currentNode.lastTouched = Date.now()
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }



}
/* harmony export (immutable) */ __webpack_exports__["a"] = CompleteMe;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Node {
  constructor(letter = null) {
    this.letter = letter;
    this.isFullWord = false;
    this.childNode = {};
    this.frequency = 0;
    this.lastTouched = 0;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Node;



/***/ })
/******/ ]);