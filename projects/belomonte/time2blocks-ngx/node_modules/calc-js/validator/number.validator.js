"use strict";
exports.__esModule = true;
var config_service_1 = require("./../config/config.service");
var equation_stringify_1 = require("./equation.stringify");
var NumberValidator = /** @class */ (function () {
    function NumberValidator() {
    }
    NumberValidator.getInstance = function () {
        if (!this.instance) {
            this.instance = new NumberValidator();
        }
        return this.instance;
    };
    NumberValidator.prototype.validate = function (value, executedEquation, completeEquation, calcConfig) {
        var errorMessage = this.validateSingleNumber(value, undefined, calcConfig);
        if (errorMessage) {
            return this.generateErrorMessage(value, executedEquation, completeEquation, errorMessage);
        }
        return null;
    };
    NumberValidator.prototype.validateSingleNumber = function (value, complementaryErrorMessage, customConfig) {
        var config = config_service_1.ConfigService.getInstance().createConfigs(customConfig);
        if (config.throwNaN) {
            var checkNaNMessage = this.checkNaN(value);
            if (checkNaNMessage) {
                return this.joinMessages(checkNaNMessage, complementaryErrorMessage);
            }
        }
        if (config.throwInfinite) {
            var checkInfiniteMessage = this.checkInfinite(value);
            if (checkInfiniteMessage) {
                return this.joinMessages(checkInfiniteMessage, complementaryErrorMessage);
            }
        }
        if (config.throwUnsafeNumber) {
            var checkUnsafeNumberMessage = this.checkUnsafeNumber(value);
            if (checkUnsafeNumberMessage) {
                return this.joinMessages(checkUnsafeNumberMessage, complementaryErrorMessage);
            }
        }
        return null;
    };
    NumberValidator.prototype.joinMessages = function (message, complementaryErrorMessage) {
        if (complementaryErrorMessage) {
            return complementaryErrorMessage + "\n" + message;
        }
        return message;
    };
    NumberValidator.prototype.generateErrorMessage = function (value, executedEquation, completeEquation, errorMessage) {
        var completeEquationStr = equation_stringify_1.equationStringify(completeEquation);
        if (executedEquation) {
            if (executedEquation.operations.length === completeEquation.operations.length) {
                return "Invalid result value in equation " + completeEquationStr + ", " + errorMessage;
            }
            else {
                var executedEquationStr = equation_stringify_1.equationStringify(executedEquation);
                return "Invalid result value in " + executedEquationStr + " in equation " + completeEquationStr + ", " + errorMessage;
            }
        }
        else {
            return "Invalid value " + value + " in equation " + completeEquationStr + ", " + errorMessage;
        }
    };
    NumberValidator.prototype.checkNaN = function (value) {
        if (isNaN(value)) {
            return "NaN was found";
        }
        return null;
    };
    NumberValidator.prototype.checkInfinite = function (value) {
        if (!Number.isFinite(value)) {
            return "infinite value was found";
        }
        return null;
    };
    NumberValidator.prototype.checkUnsafeNumber = function (value) {
        var isSafeInteger = !!String(value).split('.').find(function (str) { return !Number.isSafeInteger(Number(str)); });
        if (isSafeInteger) {
            return value + " is not a secure number";
        }
        return null;
    };
    NumberValidator.instance = null;
    return NumberValidator;
}());
exports.NumberValidator = NumberValidator;
