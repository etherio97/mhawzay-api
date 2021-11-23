"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(err, req, res, next) {
    let status = err.status || 500;
    let error = err.message || "Something went wrong";
    res.status(status);
    res.json({ status, error });
    res.end();
    console.log(err);
}
exports.errorHandler = errorHandler;
