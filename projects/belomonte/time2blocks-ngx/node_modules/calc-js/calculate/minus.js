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
