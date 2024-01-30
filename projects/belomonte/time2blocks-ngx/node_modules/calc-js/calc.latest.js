var define = typeof define !== 'undefined' ? define : function define(name, argsNames, calle) {
  define.clazzes = define.clazzes || {}
  calle.apply(null, argsNames.map(() => define.clazzes));
};

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("launch-error-strategy.type", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("config/calc-config", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("config/config.service", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ConfigService = /** @class */ (function () {
        function ConfigService() {
        }
        ConfigService.getInstance = function () {
            if (!this.instance) {
                this.instance = new ConfigService();
            }
            return this.instance;
        };
        ConfigService.configure = function (config) {
            this.defaultConfig = this.getInstance().mergeConfigs(this.defaultConfig, config);
        };
        ConfigService.prototype.mergeConfigs = function (config, mergeWith) {
            var clonedConfig = JSON.parse(JSON.stringify(config));
            if (!mergeWith) {
                return clonedConfig;
            }
            if (mergeWith.thrownStrategy !== undefined) {
                clonedConfig.thrownStrategy = mergeWith.thrownStrategy;
            }
            if (mergeWith.throwNaN !== undefined) {
                clonedConfig.throwNaN = mergeWith.throwNaN;
            }
            if (mergeWith.throwInfinite !== undefined) {
                clonedConfig.throwInfinite = mergeWith.throwInfinite;
            }
            if (mergeWith.throwUnsafeNumber !== undefined) {
                clonedConfig.throwUnsafeNumber = mergeWith.throwUnsafeNumber;
            }
            return clonedConfig;
        };
        ConfigService.prototype.createConfigs = function (customConfig) {
            return this.mergeConfigs(ConfigService.defaultConfig, customConfig);
        };
        ConfigService.instance = null;
        ConfigService.defaultConfig = {
            thrownStrategy: 'emit-event',
            throwNaN: true,
            throwInfinite: true,
            throwUnsafeNumber: true
        };
        return ConfigService;
    }());
    exports.ConfigService = ConfigService;
});
define("domain/operator.type", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("domain/operation.model", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("domain/equation.model", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
define("validator/equation.stringify", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function equationStringify(equation) {
        var stringifiedEquation = String(equation.baseNumber);
        var operationsCopy = [].concat(equation.operations);
        var operation;
        while (operation = operationsCopy.shift()) {
            if (typeof operation === 'function') {
                stringifiedEquation = "(" + stringifiedEquation + " " + operation.name + "(n) => n)";
            }
            else {
                stringifiedEquation = "(" + stringifiedEquation + " " + operation.type + " " + operation.value + ")";
            }
        }
        return stringifiedEquation;
    }
    exports.equationStringify = equationStringify;
});
define("validator/number.validator", ["require", "exports", "config/config.service", "validator/equation.stringify"], function (require, exports, config_service_1, equation_stringify_1) {
    "use strict";
    exports.__esModule = true;
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
});
define("error/calc-error", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var CalcError = /** @class */ (function (_super) {
        __extends(CalcError, _super);
        function CalcError() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return CalcError;
    }(Error));
    exports.CalcError = CalcError;
});
define("error/error.service", ["require", "exports", "error/calc-error"], function (require, exports, calc_error_1) {
    "use strict";
    exports.__esModule = true;
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
});
define("calculate/divide", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function divide(n1, n2) {
        var length = String(n1 / n2).replace(/\d+\.?/, '').length;
        var baseDecimal = '1';
        while (length--) {
            baseDecimal = baseDecimal + "0";
        }
        baseDecimal = Number(baseDecimal);
        n1 = Math.round(n1 * baseDecimal);
        return (n1 / n2) / baseDecimal;
    }
    exports.divide = divide;
});
define("calculate/minus", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function minus(n1, n2) {
        if (n1 % 1 === 0 && n2 % 1 === 0) {
            return n1 - n2;
        }
        var n1Length = String(n1).replace(/\d+\.?/, '').length, n2Length = String(n2).replace(/\d+\.?/, '').length;
        var length = n1Length > n2Length ? n1Length : n2Length;
        var baseDecimal = '1';
        while (length--) {
            baseDecimal = baseDecimal + "0";
        }
        baseDecimal = Number(baseDecimal);
        n1 = Math.round(n1 * baseDecimal);
        n2 = Math.round(n2 * baseDecimal);
        return (n1 - n2) / baseDecimal;
    }
    exports.minus = minus;
});
define("calculate/multiply", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function multiply(n1, n2) {
        if (n1 % 1 === 0 && n2 % 1 === 0) {
            return n1 * n2;
        }
        var n1Length, n2Length, n1BaseDecimal = 1, n2BaseDecimal = 1;
        if (n1 % 1 !== 0) {
            n1Length = String(n1).replace(/\d+\.?/, '').length;
            while (n1Length--) {
                n1BaseDecimal = n1BaseDecimal + "0";
            }
            n1BaseDecimal = Number(n1BaseDecimal);
        }
        if (n2 % 1 !== 0) {
            n2Length = String(n2).replace(/\d+\.?/, '').length;
            while (n2Length--) {
                n2BaseDecimal = n2BaseDecimal + "0";
            }
            n2BaseDecimal = Number(n2BaseDecimal);
        }
        n1 = Math.round(n1 * n1BaseDecimal);
        n2 = Math.round(n2 * n2BaseDecimal);
        return (n1 * n2) / (n1BaseDecimal * n2BaseDecimal);
    }
    exports.multiply = multiply;
});
define("calculate/sum", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function sum(n1, n2) {
        if (n1 % 1 === 0 && n2 % 1 === 0) {
            return n1 + n2;
        }
        var n1Length = String(n1).replace(/\d+\.?/, '').length, n2Length = String(n2).replace(/\d+\.?/, '').length;
        var length = n1Length > n2Length ? n1Length : n2Length;
        var baseDecimal = '1';
        while (length--) {
            baseDecimal = baseDecimal + "0";
        }
        baseDecimal = Number(baseDecimal);
        n1 = Math.round(n1 * baseDecimal);
        n2 = Math.round(n2 * baseDecimal);
        return (n1 + n2) / baseDecimal;
    }
    exports.sum = sum;
});
define("calculate/calc-build", ["require", "exports", "config/config.service", "validator/number.validator", "error/error.service", "calculate/divide", "calculate/minus", "calculate/multiply", "calculate/sum"], function (require, exports, config_service_2, number_validator_1, error_service_1, divide_1, minus_1, multiply_1, sum_1) {
    "use strict";
    exports.__esModule = true;
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
            config_service_2.ConfigService.configure(config);
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
});
define("equation.type-guard", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    function equationTypeGuard(operations) {
        if (operations[0]) {
            return true;
        }
        return false;
    }
    exports.equationTypeGuard = equationTypeGuard;
});
define("calc", ["require", "exports", "calculate/calc-build", "config/config.service", "equation.type-guard", "error/error.service", "validator/number.validator"], function (require, exports, calc_build_1, config_service_3, equation_type_guard_1, error_service_2, number_validator_2) {
    "use strict";
    exports.__esModule = true;
    var Calc = /** @class */ (function () {
        function Calc(baseNumber, customConfig) {
            this.baseNumber = baseNumber;
            this.calcBuild = calc_build_1.CalcBuild.getInstance();
            this.configService = config_service_3.ConfigService.getInstance();
            this.operations = [];
            this.customConfig = config_service_3.ConfigService.defaultConfig;
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
            var errorMessage = number_validator_2.NumberValidator.getInstance().validateSingleNumber(value, complementaryErrorMessage, config);
            if (errorMessage) {
                var definitiveConfig = config_service_3.ConfigService.getInstance().createConfigs(config);
                error_service_2.ErrorService.getInstance().emitError(definitiveConfig, errorMessage);
                return false;
            }
            return true;
        };
        Calc.onError = function (calle) {
            error_service_2.ErrorService.getInstance().onError(calle);
        };
        Calc.configure = function (config) {
            config_service_3.ConfigService.getInstance().createConfigs(config);
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
});
define("index", ["require", "exports", "calc", "error/calc-error"], function (require, exports, calc_1, calc_error_2) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    exports.__esModule = true;
    __export(calc_1);
    __export(calc_error_2);
});

if (define.clazzes) {
  if (typeof window !== 'undefined') {
    window.Calc = define.clazzes.Calc;
    window.CalcError = define.clazzes.CalcError;
  }

  if (typeof module !== 'undefined' && 'exports' in module) {
    module.exports = define.clazzes;
  }

  if (typeof exports !== 'undefined') {
    exports = define.clazzes;
  }
}
