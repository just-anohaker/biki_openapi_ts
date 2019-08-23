"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var axios = require("axios");
var helper_1 = require("./helper");
var config_1 = require("../common/config");
var routes = __importStar(require("../common/routes"));
var AuthorizationClient = /** @class */ (function () {
    function AuthorizationClient(apiKey, apiSecretKey) {
        this.apiKey = apiKey;
        this.apiSecretKey = apiSecretKey;
    }
    AuthorizationClient.prototype.getAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(routes.REST_ACCOUNT)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthorizationClient.prototype.getNewOrder = function (symbol, pageSize, page) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {};
                        params.symbol = symbol;
                        if (pageSize !== undefined) {
                            params.pageSize = pageSize;
                        }
                        if (page !== undefined) {
                            params.page = page;
                        }
                        return [4 /*yield*/, this.get(routes.REST_NEW_ORDER, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthorizationClient.prototype.getAllOrder = function (symbol, startDate, endDate, pageSize, page, sort) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {};
                        params.symbol = symbol;
                        if (startDate !== undefined) {
                            params.startDate = startDate;
                        }
                        if (endDate !== undefined) {
                            params.endDate = endDate;
                        }
                        if (pageSize !== undefined) {
                            params.pageSize = pageSize;
                        }
                        if (page !== undefined) {
                            params.page = page;
                        }
                        if (sort !== undefined) {
                            params.sort = sort;
                        }
                        return [4 /*yield*/, this.get(routes.REST_ALL_ORDER, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthorizationClient.prototype.getAllTrade = function (symbol, startDate, endDate, pageSize, page, sort) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {};
                        params.symbol = symbol;
                        if (startDate !== undefined) {
                            params.startDate = startDate;
                        }
                        if (endDate !== undefined) {
                            params.endDate = endDate;
                        }
                        if (pageSize !== undefined) {
                            params.pageSize = pageSize;
                        }
                        if (page !== undefined) {
                            params.page = page;
                        }
                        if (sort !== undefined) {
                            params.sort = sort;
                        }
                        return [4 /*yield*/, this.get(routes.REST_ALL_TRADE, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthorizationClient.prototype.getOrderInfo = function (orderId, symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { order_id: orderId, symbol: symbol };
                        return [4 /*yield*/, this.get(routes.REST_ORDER_INFO, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthorizationClient.prototype.createOrder = function (symbol, type, side, volume, price, feeIsUserExchangeCoin) {
        if (feeIsUserExchangeCoin === void 0) { feeIsUserExchangeCoin = "0"; }
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = {
                            symbol: symbol,
                            type: type === "limit" ? "1" : "2",
                            volume: volume,
                            side: side.toUpperCase()
                        };
                        if (price !== undefined) {
                            params.price = price;
                        }
                        if (feeIsUserExchangeCoin !== undefined) {
                            params.fee_is_user_exchange_coin = feeIsUserExchangeCoin;
                        }
                        return [4 /*yield*/, this.post(routes.REST_CREATE_ORDER, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthorizationClient.prototype.cancelOrder = function (orderId, symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { order_id: orderId, symbol: symbol };
                        return [4 /*yield*/, this.post(routes.REST_CANCEL_ORDER, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthorizationClient.prototype.cancelAllOrder = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            var params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { symbol: symbol };
                        return [4 /*yield*/, this.post(routes.REST_CANCEL_ORDER_ALL, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthorizationClient.prototype.massReplace = function (symbol, createOrders, cancelOrders) {
        return __awaiter(this, void 0, void 0, function () {
            var params, convCreateOrders, _i, createOrders_1, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        params = { symbol: symbol };
                        if (cancelOrders !== undefined) {
                            params.mass_cancel = JSON.stringify(cancelOrders);
                        }
                        if (createOrders !== undefined) {
                            convCreateOrders = [];
                            for (_i = 0, createOrders_1 = createOrders; _i < createOrders_1.length; _i++) {
                                order = createOrders_1[_i];
                                order.side = order.side.toUpperCase();
                                order.type = order.type === "limit" ? "1" : "2";
                                convCreateOrders.push(order);
                            }
                            params.mass_place = JSON.stringify(convCreateOrders);
                        }
                        return [4 /*yield*/, this.post(routes.REST_MASS_REPLACE, params)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthorizationClient.prototype.get = function (path, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var uri, querystr, url, resp, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = helper_1.buildRestURI(path);
                        querystr = helper_1.buildQueryString(this.signParams(params));
                        url = uri + querystr;
                        return [4 /*yield*/, axios.default.get(url, { headers: config_1.HEADERS })];
                    case 1:
                        resp = _a.sent();
                        if (resp.status !== 200) {
                            throw new Error(resp.statusText);
                        }
                        return [2 /*return*/, resp.data];
                    case 2:
                        error_1 = _a.sent();
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorizationClient.prototype.post = function (path, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var uri, body, resp, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = helper_1.buildRestURI(path);
                        body = this.signParams(params);
                        return [4 /*yield*/, axios.default.post(uri, body, { headers: config_1.HEADERS })];
                    case 1:
                        resp = _a.sent();
                        if (resp.status !== 200) {
                            throw new Error(resp.statusText);
                        }
                        return [2 /*return*/, resp.data];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorizationClient.prototype.signParams = function (args, sign) {
        if (args === void 0) { args = {}; }
        if (sign === void 0) { sign = true; }
        var body = Object.assign({}, args);
        if (sign) {
            body.api_key = this.apiKey;
            body.time = this.Timestamp;
            var keys = Object.keys(body);
            var sortedKeys = keys.sort();
            var message = "";
            for (var _i = 0, sortedKeys_1 = sortedKeys; _i < sortedKeys_1.length; _i++) {
                var key = sortedKeys_1[_i];
                var value = body[key];
                message += key;
                message += String(value);
            }
            console.log("message:", message);
            var md5Inst = crypto_1.default.createHash("md5");
            md5Inst.update(message + this.apiSecretKey, "utf8");
            var md5HexMsg = md5Inst.digest("hex");
            body.sign = md5HexMsg;
        }
        console.log("signParams:", JSON.stringify(body, null, 2));
        return body;
    };
    Object.defineProperty(AuthorizationClient.prototype, "Timestamp", {
        get: function () {
            return Math.floor(Date.now() / 1000).toString();
        },
        enumerable: true,
        configurable: true
    });
    return AuthorizationClient;
}());
exports.default = AuthorizationClient;
