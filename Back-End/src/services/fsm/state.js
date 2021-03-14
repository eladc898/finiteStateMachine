'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var State = /** @class */ (function () {
    function State(identify) {
        this._identify = identify;
        this._transitions = new Map();
    }
    Object.defineProperty(State.prototype, "identify", {
        get: function () {
            return this._identify;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "transitions", {
        get: function () {
            return this._transitions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(State.prototype, "machine", {
        get: function () {
            return this._machine;
        },
        set: function (machine) {
            this._machine = machine;
        },
        enumerable: false,
        configurable: true
    });
    State.prototype.addTransition = function (event, state) {
        var eventIdentify = event.identify;
        var stateIdentify = state.identify;
        if (this._transitions.has(eventIdentify)) {
            throw new Error("Event " + eventIdentify + " already existed");
        }
        this._transitions.set(eventIdentify, stateIdentify);
    };
    State.prototype.getTransition = function (eventIdentify) {
        return this._transitions.get(eventIdentify);
    };
    State.prototype.onEnter = function (event, preState) {
        if (!event || !preState)
            return;
        var message = "Entering state " + this._identify + " from state " + preState.identify + " by event " + event.identify + "\n";
        console.log(message);
        return message;
    };
    State.prototype.onExit = function (event, nextState) {
        if (!event || !nextState)
            return;
        var message = "Leaving from state " + this._identify + " to state " + nextState.identify + " by event " + event.identify + "\n";
        console.log(message);
        return message;
    };
    State.prototype.canGoto = function (event, nextState) {
        return event && nextState && this._transitions.has(event.identify) &&
            this._transitions.get(event.identify) === nextState.identify;
    };
    return State;
}());
exports.default = State;
//# sourceMappingURL=state.js.map