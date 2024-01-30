"use strict";
exports.__esModule = true;
var calc_error_1 = require("./calc-error");
var ErrorService = /** @class */ (function () {
    function ErrorService() {
        this.errorEventEmitter = null;
    }
    ErrorService.getInstance = function () {
        if (!this.instance) {
            this.instance = new ErrorService();
        }
        return this.instance;
    };
    ErrorService.prototype.onError = function (calle) {
        this.errorEventEmitter = calle;
    };
    ErrorService.prototype.emitError = function (config, error) {
        var calcError = new calc_error_1.CalcError(error);
        if (config.thrownStrategy === 'emit-event' && this.errorEventEmitter) {
            this.errorEventEmitter(calcError);
        }
        else if (config.thrownStrategy === 'console') {
            console.error(calcError);
        }
        else {
            throw calcError;
        }
    };
    ErrorService.instance = null;
    return ErrorService;
}());
exports.ErrorService = ErrorService;
