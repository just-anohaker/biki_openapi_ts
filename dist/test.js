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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var public_client_1 = __importDefault(require("./lib/public-client"));
var authorization_client_1 = __importDefault(require("./lib/authorization-client"));
var websocket_client_1 = __importDefault(require("./lib/websocket-client"));
// const api_key: string = "d7e4d03168ac95fca79ffd60a9dc3632";
// const secretkey: string = "23dd2c1b3090b5fw03a4b5f0af428cb1";
var api_key = 'b1a5712dfbe38e5d4b9a2d95bb14efb9';
var secretkey = 'c75bb0e10aba426c542bb6f97e737e72';
var publicclient = new public_client_1.default();
void (publicclient);
var authclient = new authorization_client_1.default(api_key, secretkey);
void (authclient);
var websocketClient = new websocket_client_1.default();
void (websocketClient);
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        /// public 
        // const symbols = await publicclient.getSymbols();
        // console.log("getSymbols:", JSON.stringify(symbols));
        // const alltickers = await publicclient.getAllTickers();
        // console.log("getAllTickers:", JSON.stringify(alltickers));
        // const market = await publicclient.getMarket();
        // console.log("getMarket:", JSON.stringify(market));
        // const ticker = await publicclient.getTicker("ethusdt");
        // console.log("getTicker:", JSON.stringify(ticker));
        // const trades = await publicclient.getTrades("btcusdt");
        // console.log("getTrades:", JSON.stringify(trades));
        // const records = await publicclient.getRecords("ltcusdt", 60);
        // console.log("getRecords:", JSON.stringify(records));
        // const depth = await publicclient.getMarketDepth("ethusdt", "step2");
        // console.log("getMarketDepth:", JSON.stringify(depth));
        /// auth
        // const account = await authclient.getAccount();
        // console.log("getAccount:", JSON.stringify(account));
        // const newOrder = await authclient.getNewOrder("btcusdt");
        // console.log("getNewOrder:", newOrder);
        // const allOrder = await authclient.getAllOrder("btcusdt");
        // console.log("getAllOrder:", allOrder);
        // const allTrade = await authclient.getAllTrade("btcusdt");
        // console.log("getAllTrade:", allTrade);
        /// websocket
        websocketClient.OnMessage = _onMessage;
        websocketClient.subscribeTradeTicker("btc", "usdt");
        websocketClient.subscribeTradeTicker("eth", "usdt");
        websocketClient.subscribeKLine("eth", "usdt", "5min" /* FiveMin */);
        websocketClient.connect();
        setInterval(function () { }, 1000);
        return [2 /*return*/];
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
