import axios = require("axios");
import { buildRestURI, buildQueryString } from "./helper";
import * as routes from "../common/routes";
import { KeyValueType } from "../common/types";
import { HEADERS } from "../common/config";
import { RecordsPeriodType, MarketDepthTypes } from "../index";

class PublicClient {
    constructor() { }

    async getSymbols() {
        return await this.get(routes.REST_SYMBOLS);
    }

    async getAllTickers() {
        return await this.get(routes.REST_ALL_TICKER);
    }

    async getMarket() {
        return await this.get(routes.REST_MARKET);
    }

    async getTicker(symbol: string) {
        return await this.get(routes.REST_TICKER, { symbol });
    }

    async getTrades(symbol: string) {
        return await this.get(routes.REST_TRADES, { symbol });
    }

    async getRecords(symbol: string, period: RecordsPeriodType) {
        return await this.get(routes.REST_RECORDS, { symbol, period });
    }

    async getMarketDepth(symbol: string, type: MarketDepthTypes) {
        return await this.get(routes.REST_DEPTH, { symbol, type });
    }

    private async get(path: string, params: KeyValueType = {}) {
        try {
            const uri = buildRestURI(path);
            const querystr = buildQueryString(params);
            const url = uri + querystr;
            const resp = await axios.default.get(url, { headers: HEADERS });
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.data;
        } catch (error) {
            throw error;
        }
    }
}

export default PublicClient;