"use strict";
exports.__esModule = true;
var config_service_1 = require("../config/config.service");
var number_validator_1 = require("../validator/number.validator");
var error_service_1 = require("./../error/error.service");
var divide_1 = require("./divide");
var minus_1 = require("./minus");
var multiply_1 = require("./multiply");
var sum_1 = require("./sum");
var CalcBuild = /** @class */ (function () {
    function CalcBuild() {
        this.numberValidator = number_validator_1.NumberValidator.getInstance();
        this.errorService = error_service_1.ErrorService.getInstance();
    }
    CalcBuild.getInstance = function () {
        if (!this.instance) {
            this.instance = new CalcBuild();
        }
        return this.instance;
    };
    CalcBuild.configure = function (config) {
        config_service_1.ConfigService.configure(config);
    };
    CalcBuild.prototype.calculate = function (equation, config) {
        this.validateEquation(equation, config);
        var executedEquation = this.createExecutedEquation(equation);
        var equationCopy = [].concat(equation.operations);
        var operation;
        var finalResult = equation.baseNumber;
        while (operation = equationCopy.shift()) {
            if (typeof operation === 'function') {
                finalResult = operation(finalResult);
            }
            else {
                finalResult = CalcBuild.calcMap[operation.type](finalResult, operation.value);
            }
            executedEquation.operations.push(operation);
            this.validate(finalResult, executedEquation, equation, config);
        }
        return finalResult;
    };
    CalcBuild.prototype.createExecutedEquation = function (equation) {
        return {
            baseNumber: equation.baseNumber,
            operations: []
        };
    };
    CalcBuild.prototype.validate = function (value, executedEquation, equation, config) {
        var errorMessage = this.numberValidator.validate(value, executedEquation, equation, config);
        if (errorMessage) {
            this.errorService.emitError(config, errorMessage);
        }
    };
    CalcBuild.prototype.validateEquation = function (equation, config) {
        var _this = this;
        this.validate(equation.baseNumber, null, equation, config);
        equation.operations.forEach(function (operation) {
            if (typeof operation !== 'function') {
                _this.validate(operation.value, null, equation, config);
            }
        });
    };
    CalcBuild.instance = null;
    CalcBuild.calcMap = {
        '+': sum_1.sum,
        '-': minus_1.minus,
        '/': divide_1.divide,
        '*': multiply_1.multiply
    };
    return CalcBuild;
}());
exports.CalcBuild = CalcBuild;
