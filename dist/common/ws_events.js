"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// WS API
exports.WS_TRADE_TICKER_SUB = "{\"event\":\"sub\",\"params\":{\"channel\":\"market_symbol_trade_ticker\",\"cb_id\":\"custom string\"}}";
exports.WS_TRADE_TICKER_UNSUB = "{\"event\":\"unsub\",\"params\":{\"channel\":\"market_symbol_trade_ticker\"}}";
exports.WS_MARKET_DEPTH_SUB = "{\"event\":\"sub\",\"params\":{\"channel\":\"market_symbol_depth_steplevel\",\"cb_id\":\"custom string\",\"asks\":150,\"bids\":150}}";
exports.WS_MARKET_DEPTH_UNSUB = "{\"event\":\"unsub\",\"params\":{\"channel\":\"market_symbol_depth_steplevel\",\"cb_id\":\"custom string\",\"asks\":150,\"bids\":150}}";
exports.WS_MARKET_KLINE_SUB = "{\"event\":\"sub\",\"params\":{\"channel\":\"market_symbol_kline_period\",\"cb_id\":\"custom string\"}}";
exports.WS_MARKET_KLINE_UNSUB = "{\"event\":\"unsub\",\"params\":{\"channel\":\"market_symbol_kline_period\"}}";
