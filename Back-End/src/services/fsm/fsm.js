'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var FSM = /** @class */ (function () {
    function FSM(initStateIdentify) {
        this._allStates = new Map();
        this._curState = null;
        this._processingTransition = false;
        this._initEventIdentify = initStateIdentify;
    }
    Object.defineProperty(FSM.prototype, "allStates", {
        get: function () {
            return this._allStates;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FSM.prototype, "curState", {
        get: function () {
            return this._curState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FSM.prototype, "willTransition", {
        get: function () {
            return this._processingTransition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FSM.prototype, "initEventIdentify", {
        get: function () {
            return this._initEventIdentify;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FSM.prototype, "isTerminated", {
        get: function () {
            return this._curState === null;
        },
        enumerable: false,
        configurable: true
    });
    FSM.prototype.addState = function (state) {
        var identify = state.identify;
        if (this.isTerminated) {
            if (this._allStates.has(identify)) {
                throw new Error("state is already in: " + identify);
            }
            state.machine = this;
            this._allStates.set(identify, state);
        }
        else {
            throw new Error("state machine is already in running: " + identify);
        }
    };
    FSM.prototype.create = function () {
        if (this.isTerminated) {
            var initState = this._allStates.get(this._initEventIdentify);
            if (!initState) {
                throw new Error("cannot find initial state: " + this._initEventIdentify);
            }
            this._curState = initState;
        }
    };
    FSM.prototype.terminate = function () {
        if (!this.isTerminated) {
            this._curState = null;
        }
    };
    FSM.prototype.processEvent = function (event) {
        if (!this._processingTransition && this._curState) {
            var nextStateName = this._curState.getTransition(event.identify);
            var nextState = this._allStates.get(nextStateName);
            if (nextState) {
                this._processingTransition = true;
                this._curState.machine = null;
            }
            var transitionAllowed = this._curState.canGoto(event, nextState);
            if (transitionAllowed) {
                if (nextState) {
                    var preState = this._curState;
                    this._curState.onExit(event, nextState);
                    this._curState.machine = this;
                    this._curState = nextState;
                    this._processingTransition = false;
                    return this._curState.onEnter(event, preState);
                }
            }
            else {
                this._curState.machine = this;
                return { error: true, message: 'Transition is now allowed\n' };
            }
        }
    };
    return FSM;
}());
exports.default = FSM;
//# sourceMappingURL=fsm.js.map