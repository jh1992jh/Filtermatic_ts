"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ID = function () {
    return ("_" +
        Math.random()
            .toString(36)
            .substr(2, 9));
};
