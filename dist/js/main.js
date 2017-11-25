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
/******/ 	__webpack_require__.p = "/todolist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var mediator = (function() {
    var events = {};

    function on(evt, handler) {
        events[evt] = events[evt] || [];
        events[evt].push(handler);
    }

    function off(evt, handler) {
        if (!events[evt] || events[evt].indexOf(handler) === -1) {
            console.error("Event or handler doesn't exist");
            return;
        }

        var index = events[evt].indexOf(handler);
        events[evt].splice(index, 1);
    }

    function emit(evt, data) {
        if (!events[evt]) {
            console.error("Event doesn't exist");
            return;
        }

        events[evt].forEach(function(fn) {
            fn(data);
        });
    }

    return {
        on: on,
        off: off,
        emit: emit
    };
}());

/* harmony default export */ __webpack_exports__["a"] = (mediator);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_main_sass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_main_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_main_sass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__todolist__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__storage__ = __webpack_require__(6);





/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__closestParentClass__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mediator__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__escapeHtmlTags__ = __webpack_require__(5);




var todoList = (function(extend, state) {
    let tasks;
    let activeType = "daily";
    const dom      = {
        daily  : document.querySelector("#daily-todo"),
        weekly : document.querySelector("#weekly-todo"),
        input  : document.querySelector("#add-input"),
        addBtn : document.querySelector("#add-btn"),
        lists  : document.querySelector(".lists")
    };

    // Get tasks by type
    function _getType(type) {
        return tasks.filter((task) => {
            if (task.type == type) {
                return task;
            }
        });
    }

    function _getCompletedState(task) {
        if (task.completed) {
            return "item completed";
        } else {
            return "item";
        }
    }

    function _getTaskIndex(target) {
        const task  = Object(__WEBPACK_IMPORTED_MODULE_0__closestParentClass__["a" /* default */])(target, "item");
        const items = [].slice.call(Object(__WEBPACK_IMPORTED_MODULE_0__closestParentClass__["a" /* default */])(target, "items").children);
        return items.indexOf(task);
    }

    // Add task to DOM
    function _addToDom(section, task) {
        const title = Object(__WEBPACK_IMPORTED_MODULE_2__escapeHtmlTags__["a" /* default */])(task.title);
        const completed = _getCompletedState(task);
        const template =
            `<div class="${completed}" data-index="">
                <label class="checkbox-group">
                    <input type="checkbox" class="item-hide-checkbox">
                    <div class="checkbox-icon">
                        <i class="fa fa-square-o"></i>
                        <i class="fa fa-check-square-o"></i>
                    </div>
                    <p class="item-title">${title}</p>
                </label>
                <input type="text" class="item-input" value="${title}">
                <div class="item-actions">
                    <div class="edit">
                        <i class="fa fa-pencil"></i>
                    </div>
                    <div class="save">
                        <i class="fa fa-check"></i>
                    </div>
                    <div class="delete">
                        <i class="fa fa-trash"></i>
                    </div>
                </div>
            </div>`
        section.innerHTML += template;
    }

    function _render(type) {
        const selectedType = _getType(type)
        const section = dom[type].querySelector(".items");
        section.innerHTML = ""
        selectedType.forEach(_addToDom.bind(null, section));
    }

    function _init(data) {
        if (tasks) {
            return;
        }

        tasks = data;
        _render("daily");
        _render("weekly");
    }

    function newTask(title = dom.input.value, type = activeType) {
        const task = {
            title,
            type,
            completed: false
        };
        tasks.push(task);

        __WEBPACK_IMPORTED_MODULE_1__mediator__["a" /* default */].emit("changeTasks", tasks);
        _render(type);
    }

    function remove(index, type = activeType) {
        const selectedType = _getType(type);

        tasks.splice(tasks.indexOf(selectedType[index]), 1);

        __WEBPACK_IMPORTED_MODULE_1__mediator__["a" /* default */].emit("changeTasks", tasks);
        _render(type);
    }

    function complete(index, type = activeType) {
        const selectedType = _getType(type);
        const task = selectedType[index];
        task.completed = !task.completed;

        __WEBPACK_IMPORTED_MODULE_1__mediator__["a" /* default */].emit("changeTasks", tasks);
        _render(type);
    }

    function save(index, title, type = activeType) {
        const selectedType = _getType(type);
        selectedType[index].title = title;

        __WEBPACK_IMPORTED_MODULE_1__mediator__["a" /* default */].emit("changeTasks", tasks);
        _render(type);
    }

    // Input handler
    function _addTaskHandler(e) {
        if (e.target == dom.input && e.code != "Enter") {
            return;
        }
        if (dom.input.value.length <= 0) {
            return;
        }
        newTask();
        dom.input.value = "";
    }

    // Change the active section to the other
    function _changeType(e) {
        if(Object(__WEBPACK_IMPORTED_MODULE_0__closestParentClass__["a" /* default */])(e.target, "list").classList.contains("active")) {
            return;
        }

        dom[activeType].classList.toggle("active")
        if (activeType == "daily") {
            activeType = "weekly";
        } else {
            activeType = "daily";
        }
        dom[activeType].classList.toggle("active")
        dom.input.setAttribute("placeholder", `Add ${activeType} task`);
    }

    function _removeTaskHandler(e) {
        const target = e.target;
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__closestParentClass__["a" /* default */])(target, "delete")) {
            return;
        }
        const index = _getTaskIndex(target);
        remove(index);
    }

    function _completeTaskHandler(e) {
        const target = e.target;
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__closestParentClass__["a" /* default */])(target, "checkbox-group")) {
            return;
        }
        const index = _getTaskIndex(target);
        complete(index);
    }

    function _editTaskHandler(e) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__closestParentClass__["a" /* default */])(e.target, "edit")) {
            return;
        }
        const task  = Object(__WEBPACK_IMPORTED_MODULE_0__closestParentClass__["a" /* default */])(e.target, "item");
        const input = task.querySelector(".item-input");
        const index = _getTaskIndex(task)
        task.classList.add("active");
        input.focus();
    }

    function _saveTaskHandler(e) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_0__closestParentClass__["a" /* default */])(e.target, "save") && e.code != "Enter") {
            return;
        }
        const task  = Object(__WEBPACK_IMPORTED_MODULE_0__closestParentClass__["a" /* default */])(e.target, "item");
        const input = task.querySelector(".item-input").value;
        const index = _getTaskIndex(task);
        save(index, input);
    }

    // Add Events to DOM
    dom.daily.addEventListener("click", _changeType);
    dom.weekly.addEventListener("click", _changeType);
    dom.addBtn.addEventListener("click", _addTaskHandler);
    dom.input.addEventListener("keydown", _addTaskHandler);
    dom.lists.addEventListener("click", _removeTaskHandler);
    dom.lists.addEventListener("click", _completeTaskHandler);
    dom.lists.addEventListener("click", _editTaskHandler);
    dom.lists.addEventListener("click", _saveTaskHandler);
    dom.lists.addEventListener("keydown", _saveTaskHandler);

    __WEBPACK_IMPORTED_MODULE_1__mediator__["a" /* default */].on("loadTasks", (data) => {
        _init(data);
    });

    return {
        new: newTask,
        remove: remove,
        complete: complete,
        save: save
    };
}());

/* unused harmony default export */ var _unused_webpack_default_export = (todoList);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = closestParentClass;
function closestParentClass(elm, elmClass) {
    let parent = elm;
    for(; parent && parent !== document.body; parent = parent.parentNode) {
        if (parent.classList.contains(elmClass)) {
            return parent;
        }
    }
    return false;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = escapeHtmlTags;
function escapeHtmlTags(text) {
    const specialEntities = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;"
    };
    const textToSanitize = text.split("");
    const sanitizedText = textToSanitize.map((char) => {
        if (char in specialEntities) {
            return specialEntities[char];
        }

        return char;
    }).join("");

    return sanitizedText;
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mediator__ = __webpack_require__(0);


var storage = {
    save: function save(data) {
        localStorage.setItem("todoList", JSON.stringify(data));
    },
    get: function get() {
        let tasks = JSON.parse(localStorage.getItem("todoList"));
        if (!tasks) {
            tasks = [{
                title: "Add your first task to your to do list",
                type: "daily",
                completed: false,
            }, {
                title: "Click to the weekly section to add a weekly task",
                type: "weekly",
                completed: false,
            }];
            this.save(tasks);
        }

        return tasks;
    }
};

__WEBPACK_IMPORTED_MODULE_0__mediator__["a" /* default */].on("changeTasks", data => {
    storage.save(data);
});

__WEBPACK_IMPORTED_MODULE_0__mediator__["a" /* default */].emit("loadTasks", storage.get());

/* unused harmony default export */ var _unused_webpack_default_export = (storage);


/***/ })
/******/ ]);