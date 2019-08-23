"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var zlib_1 = __importDefault(require("zlib"));
var ws_1 = __importDefault(require("ws"));
var config_1 = require("../common/config");
function noop() { }
var WebSocketClient = /** @class */ (function () {
    function WebSocketClient(debug) {
        if (debug === void 0) { debug = false; }
        this.debug = debug;
        this.isOpened = false;
        this.subscribeEvents = [];
    }
    Object.defineProperty(WebSocketClient.prototype, "OnMessage", {
        get: function () {
            return this.onMessage;
        },
        set: function (onMessage) {
            this.onMessage = onMessage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebSocketClient.prototype, "IsOpened", {
        get: function () {
            return this.isOpened;
        },
        enumerable: true,
        configurable: true
    });
    WebSocketClient.prototype.subscribeTradeTicker = function (base, quote, cbId) {
        if (cbId === void 0) { cbId = "custom string"; }
        var event = "market_" + base.toLowerCase() + quote.toLowerCase() + "_trade_ticker";
        var subscribeData = { channel: event, cb_id: cbId };
        this.appendSubscribeData(subscribeData);
    };
    WebSocketClient.prototype.unsubscribeTradeTicker = function (base, quote) {
        var event = "market_" + base.toLowerCase() + quote.toLowerCase() + "_trade_ticker";
        var unsubscribeData = { channel: event };
        this.removeSubscribeData(unsubscribeData);
    };
    WebSocketClient.prototype.subscribeDepth = function (base, quote, step, cbId, asks, bids) {
        if (cbId === void 0) { cbId = "custom string"; }
        if (asks === void 0) { asks = 150; }
        if (bids === void 0) { bids = 150; }
        var event = "market_" + base.toLowerCase() + quote.toLowerCase() + "_depth_step" + step;
        var subscribeData = { channel: event, cb_id: cbId, asks: asks, bids: bids };
        this.appendSubscribeData(subscribeData);
    };
    WebSocketClient.prototype.unsubscribeDepth = function (base, quote, step, asks, bids) {
        if (asks === void 0) { asks = 150; }
        if (bids === void 0) { bids = 150; }
        var event = "market_" + base.toLowerCase() + quote.toLowerCase() + "_depth_step" + step;
        var unsubscribeData = { channel: event, asks: asks, bids: bids };
        this.removeSubscribeData(unsubscribeData);
    };
    WebSocketClient.prototype.subscribeKLine = function (base, quote, period, cbId) {
        if (cbId === void 0) { cbId = "custom string"; }
        var event = "market_" + base.toLowerCase() + quote.toLowerCase() + "_kline_" + period;
        var subscribeData = { channel: event, cb_id: cbId };
        this.appendSubscribeData(subscribeData);
    };
    WebSocketClient.prototype.unsubscribeKLine = function (base, quote, period) {
        var event = "market_" + base.toLowerCase() + quote.toLowerCase() + "_kline_" + period;
        var unsubscribeData = { channel: event };
        this.removeSubscribeData(unsubscribeData);
    };
    WebSocketClient.prototype.connect = function () {
        this.close();
        this.client = new ws_1.default(config_1.WS_URL);
        this.client.onopen = this.onOpenEvent.bind(this);
        this.client.onclose = this.onCloseEvent.bind(this);
        this.client.onerror = this.onErrorEvent.bind(this);
        this.client.onmessage = this.onMessageEvent.bind(this);
        this.debug ? console.log("connect:", config_1.WS_URL) : undefined;
    };
    WebSocketClient.prototype.close = function () {
        if (this.client !== undefined) {
            console.log("websocket close");
            this.client.onopen = noop;
            this.client.onclose = noop;
            this.client.onerror = noop;
            this.client.onmessage = noop;
            this.client.close();
            this.client = undefined;
            this.isOpened = false;
        }
    };
    WebSocketClient.prototype.subscribe = function (data) {
        this.IsOpened ? this.client.send(JSON.stringify(data)) : undefined;
    };
    WebSocketClient.prototype.appendSubscribeData = function (data) {
        var found = this.subscribeEvents.find(function (val) {
            return val.channel === data.channel
                // && val.cb_id === data.cb_id
                && val.asks === data.asks
                && val.bids === data.bids;
        });
        if (found === undefined) {
            this.subscribeEvents.push(data);
        }
        var subscribeData = { event: "sub", params: data };
        this.subscribe(subscribeData);
    };
    WebSocketClient.prototype.removeSubscribeData = function (data) {
        var found = this.subscribeEvents.findIndex(function (val) {
            return val.channel === data.channel
                && val.asks === data.asks
                && val.bids === data.bids;
        });
        if (found !== -1) {
            this.subscribeEvents.splice(found, 1);
            var unsubscribeData = { event: "unsub", params: data };
            this.subscribe(unsubscribeData);
        }
    };
    WebSocketClient.prototype.onOpenEvent = function (event) {
        var _this = this;
        this.debug ? console.log("onOpenEvent") : undefined;
        this.isOpened = true;
        this.subscribeEvents.forEach(function (val) {
            var subscribeData = { event: "sub", params: val };
            _this.subscribe(subscribeData);
        });
    };
    WebSocketClient.prototype.onCloseEvent = function (event) {
        this.debug ? console.log("onCloseEvent:", event.code, event.reason) : undefined;
        this.isOpened = false;
        this.close();
        this.connect();
    };
    WebSocketClient.prototype.onErrorEvent = function (event) {
        this.debug ? console.log("onErrorEvent:", event.type, event.message) : undefined;
    };
    WebSocketClient.prototype.onMessageEvent = function (event) {
        if (event.type !== "message")
            return;
        try {
            var socket = event.target;
            var ungzipData = zlib_1.default.gunzipSync(event.data).toString("utf8");
            var jsonData = JSON.parse(ungzipData);
            this.debug ? console.log("onMessageEvent:", event.type, ungzipData) : undefined;
            if (jsonData.ping != null) {
                var pongMsg = { pong: jsonData.ping };
                socket.send(JSON.stringify(pongMsg));
            }
            else {
                this.debug ? console.log("onMessageEvent message:", JSON.stringify(jsonData)) : undefined;
                this.onMessage ? this.onMessage(jsonData) : undefined;
            }
        }
        catch (error) {
            // TODO
        }
    };
    return WebSocketClient;
}());
exports.default = WebSocketClient;
