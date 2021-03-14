'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event(identify) {
        this._identify = identify;
    }
    Object.defineProperty(Event.prototype, "identify", {
        get: function () {
            return this._identify;
        },
        enumerable: false,
        configurable: true
    });
    return Event;
}());
exports.default = Event;
//# sourceMappingURL=event.js.map