"use strict";
exports.__esModule = true;
var calc_build_1 = require("./calculate/calc-build");
var config_service_1 = require("./config/config.service");
var equation_type_guard_1 = require("./equation.type-guard");
var error_service_1 = require("./error/error.service");
var number_validator_1 = require("./validator/number.validator");
var Calc = /** @class */ (function () {
    function Calc(baseNumber, customConfig) {
        this.baseNumber = baseNumber;
        this.calcBuild = calc_build_1.CalcBuild.getInstance();
        this.configService = config_service_1.ConfigService.getInstance();
        this.operations = [];
        this.customConfig = config_service_1.ConfigService.defaultConfig;
        this.customConfig = this.configService.createConfigs(customConfig);
    }
    /**
     * It will throw (or console it) if this isn't a valid number.
     * @returns if is valid return true, if is invalid return false.
     *
     * @param value
     * Number to be verified
     *
     * @param complementaryErrorMessage
     * Aditional information to add to the error object (this will come first)
     *
     * @param config
     * Some overriden configuration
     */
    Calc.checkNumber = function (value, complementaryErrorMessage, config) {
        var errorMessage = number_validator_1.NumberValidator.getInstance().validateSingleNumber(value, complementaryErrorMessage, config);
        if (errorMessage) {
            var definitiveConfig = config_service_1.ConfigService.getInstance().createConfigs(config);
            error_service_1.ErrorService.getInstance().emitError(definitiveConfig, errorMessage);
            return false;
        }
        return true;
    };
    Calc.onError = function (calle) {
        error_service_1.ErrorService.getInstance().onError(calle);
    };
    Calc.configure = function (config) {
        config_service_1.ConfigService.getInstance().createConfigs(config);
    };
    Calc.sum = function (x, y, config) {
        return new Calc(x, config).sum(y).finish();
    };
    Calc.minus = function (x, y, config) {
        return new Calc(x, config).minus(y).finish();
    };
    Calc.divide = function (x, y, config) {
        return new Calc(x, config).divide(y).finish();
    };
    Calc.multiply = function (x, y, config) {
        return new Calc(x, config).multiply(y).finish();
    };
    Calc.prototype.sum = function (value) {
        this.operations.push({ type: '+', value: value });
        return this;
    };
    Calc.prototype.minus = function (value) {
        this.operations.push({ type: '-', value: value });
        return this;
    };
    Calc.prototype.divide = function (value) {
        this.operations.push({ type: '/', value: value });
        return this;
    };
    Calc.prototype.multiply = function (value) {
        this.operations.push({ type: '*', value: value });
        return this;
    };
    Calc.prototype.pipe = function (lambda) {
        this.operations.push(lambda);
        return this;
    };
    Calc.prototype.finish = function () {
        var operations = this.operations;
        var baseNumber = this.baseNumber;
        if (equation_type_guard_1.equationTypeGuard(operations)) {
            return this.calcBuild.calculate({
                baseNumber: baseNumber, operations: operations
            }, this.customConfig);
        }
        return baseNumber;
    };
    return Calc;
}());
exports.Calc = Calc;
