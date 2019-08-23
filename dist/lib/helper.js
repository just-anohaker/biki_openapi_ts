"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var querystring_1 = __importDefault(require("querystring"));
var config_1 = require("../common/config");
function buildRestURI(path) {
    return config_1.API_URL + path;
}
exports.buildRestURI = buildRestURI;
function buildQueryString(params) {
    if (params === void 0) { params = {}; }
    var querystr = querystring_1.default.stringify(params);
    if (querystr !== "") {
        return "?" + querystr;
    }
    return "";
}
exports.buildQueryString = buildQueryString;
exports.default = {
    buildRestURI: buildRestURI,
    buildQueryString: buildQueryString
};
