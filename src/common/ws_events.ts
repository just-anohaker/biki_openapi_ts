// WS API
export const WS_TRADE_TICKER_SUB: string = `{"event":"sub","params":{"channel":"market_symbol_trade_ticker","cb_id":"custom string"}}`;
export const WS_TRADE_TICKER_UNSUB: string = `{"event":"unsub","params":{"channel":"market_symbol_trade_ticker"}}`;

export const WS_MARKET_DEPTH_SUB: string = `{"event":"sub","params":{"channel":"market_symbol_depth_steplevel","cb_id":"custom string","asks":150,"bids":150}}`;
export const WS_MARKET_DEPTH_UNSUB: string = `{"event":"unsub","params":{"channel":"market_symbol_depth_steplevel","cb_id":"custom string","asks":150,"bids":150}}`;

export const WS_MARKET_KLINE_SUB: string = `{"event":"sub","params":{"channel":"market_symbol_kline_period","cb_id":"custom string"}}`;
export const WS_MARKET_KLINE_UNSUB: string = `{"event":"unsub","params":{"channel":"market_symbol_kline_period"}}`;

