import mediator from "./mediator";

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

mediator.on("changeTasks", data => {
    storage.save(data);
});

mediator.emit("loadTasks", storage.get());

export default storage;
