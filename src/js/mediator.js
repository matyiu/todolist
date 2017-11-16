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

export default mediator;
