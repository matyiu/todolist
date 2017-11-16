import closestParentClass from "./closestParentClass";
import mediator from "./mediator"

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
        const task  = closestParentClass(target, "item");
        const items = [].slice.call(closestParentClass(target, "items").children);
        return items.indexOf(task);
    }

    // Add task to DOM
    function _addToDom(section, task) {
        const title = task.title;
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

        mediator.emit("changeTasks", tasks);
        _render(type);
    }

    function remove(index, type = activeType) {
        const selectedType = _getType(type);

        tasks.splice(tasks.indexOf(selectedType[index]), 1);

        mediator.emit("changeTasks", tasks);
        _render(type);
    }

    function complete(index, type = activeType) {
        const selectedType = _getType(type);
        const task = selectedType[index];
        task.completed = !task.completed;

        mediator.emit("changeTasks", tasks);
        _render(type);
    }

    function save(index, title, type = activeType) {
        const selectedType = _getType(type);
        selectedType[index].title = title;

        mediator.emit("changeTasks", tasks);
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
        if(closestParentClass(e.target, "list").classList.contains("active")) {
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
        if (!closestParentClass(target, "delete")) {
            return;
        }
        const index = _getTaskIndex(target);
        remove(index);
    }

    function _completeTaskHandler(e) {
        const target = e.target;
        if (!closestParentClass(target, "checkbox-group")) {
            return;
        }
        const index = _getTaskIndex(target);
        complete(index);
    }

    function _editTaskHandler(e) {
        if (!closestParentClass(e.target, "edit")) {
            return;
        }
        const task  = closestParentClass(e.target, "item");
        const input = task.querySelector(".item-input");
        const index = _getTaskIndex(task)
        task.classList.add("active");
        input.focus();
    }

    function _saveTaskHandler(e) {
        if (!closestParentClass(e.target, "save") && e.code != "Enter") {
            return;
        }
        const task  = closestParentClass(e.target, "item");
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

    mediator.on("loadTasks", (data) => {
        _init(data);
    });

    return {
        new: newTask,
        remove: remove,
        complete: complete,
        save: save
    };
}());

export default todoList;
