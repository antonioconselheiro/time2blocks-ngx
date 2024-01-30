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
