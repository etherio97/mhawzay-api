"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nullSafe = void 0;
function nullSafe(data) {
    const result = {};
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
            result[key] = value;
        }
    });
    return result;
}
exports.nullSafe = nullSafe;
