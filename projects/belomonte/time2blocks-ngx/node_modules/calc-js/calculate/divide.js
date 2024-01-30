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
