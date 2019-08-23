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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
// const api_key: string = "d7e4d03168ac95fca79ffd60a9dc3632";
// const secretkey: string = "23dd2c1b3090b5fw03a4b5f0af428cb1";
var api_key = 'b1a5712dfbe38e5d4b9a2d95bb14efb9';
var secretkey = 'c75bb0e10aba426c542bb6f97e737e72';
var publicclient = new _1.PublicClient();
void (publicclient);
var authclient = new _1.AuthorizationClient(api_key, secretkey);
void (authclient);
var websocketClient = new _1.WebSocketClient();
void (websocketClient);
(function () { return __awaiter(_this, void 0, void 0, function () {
    var symbols, alltickers, market, ticker, trades, records, depth, account, newOrder, allOrder, allTrade;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, publicclient.getSymbols()];
            case 1:
                symbols = _a.sent();
                console.log("getSymbols:", JSON.stringify(symbols));
                return [4 /*yield*/, publicclient.getAllTickers()];
            case 2:
                alltickers = _a.sent();
                console.log("getAllTickers:", JSON.stringify(alltickers));
                return [4 /*yield*/, publicclient.getMarket()];
            case 3:
                market = _a.sent();
                console.log("getMarket:", JSON.stringify(market));
                return [4 /*yield*/, publicclient.getTicker("ethusdt")];
            case 4:
                ticker = _a.sent();
                console.log("getTicker:", JSON.stringify(ticker));
                return [4 /*yield*/, publicclient.getTrades("btcusdt")];
            case 5:
                trades = _a.sent();
                console.log("getTrades:", JSON.stringify(trades));
                return [4 /*yield*/, publicclient.getRecords("ltcusdt", 60)];
            case 6:
                records = _a.sent();
                console.log("getRecords:", JSON.stringify(records));
                return [4 /*yield*/, publicclient.getMarketDepth("ethusdt", "step2" /* Step2 */)];
            case 7:
                depth = _a.sent();
                console.log("getMarketDepth:", JSON.stringify(depth));
                return [4 /*yield*/, authclient.getAccount()];
            case 8:
                account = _a.sent();
                console.log("getAccount:", JSON.stringify(account));
                return [4 /*yield*/, authclient.getNewOrder("btcusdt")];
            case 9:
                newOrder = _a.sent();
                console.log("getNewOrder:", newOrder);
                return [4 /*yield*/, authclient.getAllOrder("btcusdt")];
            case 10:
                allOrder = _a.sent();
                console.log("getAllOrder:", allOrder);
                return [4 /*yield*/, authclient.getAllTrade("btcusdt")];
            case 11:
                allTrade = _a.sent();
                console.log("getAllTrade:", allTrade);
                /// websocket
                websocketClient.OnMessage = _onMessage;
                websocketClient.connect();
                websocketClient.subscribeTradeTicker("btc", "usdt");
                websocketClient.subscribeTradeTicker("eth", "usdt");
                websocketClient.subscribeKLine("eth", "usdt", "5min" /* FiveMin */);
                // TODO
                setInterval(function () { }, 1000);
                return [2 /*return*/];
        }
    });
}); })()
    .then(function () { })
    .catch(function (error) { return console.log("error:", error.toString()); });
var count = 0;
var max_count = 5;
function _onMessage(data) {
    console.log("_onMessage:", JSON.stringify(data));
    count++;
    if (count > max_count) {
        websocketClient.unsubscribeTradeTicker("eth", "usdt");
    }
}
