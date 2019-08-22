import crypto from "crypto";
import axios = require("axios");
import { KeyValueType } from "../common/types";
import { buildRestURI, buildQueryString } from "./helper";
import { HEADERS } from "../common/config";
import * as routes from "../common/routes";

class AuthorizationClient {
    constructor(private apiKey: string, private apiSecretKey: string) { }

    async getAccount() {
        return await this.get(routes.REST_ACCOUNT);
    }

    async getNewOrder(symbol: string, pageSize?: string, page?: string) {
        const params: KeyValueType = {};
        params.symbol = symbol;
        if (pageSize !== undefined) {
            params.pageSize = pageSize;
        }
        if (page !== undefined) {
            params.page = page;
        }
        return await this.get(routes.REST_NEW_ORDER, params);
    }

    async getAllOrder(symbol: string, startDate?: string, endDate?: string, pageSize?: string, page?: string, sort?: "1") {
        const params: KeyValueType = {};
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
        return await this.get(routes.REST_ALL_ORDER, params);
    }

    async getAllTrade(symbol: string, startDate?: string, endDate?: string, pageSize?: string, page?: string, sort?: "1") {
        const params: KeyValueType = {};
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
        return await this.get(routes.REST_ALL_TRADE, params);
    }

    async getOrderInfo(orderId: string, symbol: string) {
        const params: KeyValueType = { order_id: orderId, symbol };
        return await this.get(routes.REST_ORDER_INFO, params);
    }

    async createOrder(symbol: string, type: string, side: string, volume: string, price?: string, feeIsUserExchangeCoin: string = "0") {
        const params: KeyValueType = {
            symbol,
            type: type === "limit" ? "1" : "2",
            volume,
            side: side.toUpperCase()
        };
        if (price !== undefined) {
            params.price = price;
        }
        if (feeIsUserExchangeCoin !== undefined) {
            params.fee_is_user_exchange_coin = feeIsUserExchangeCoin;
        }

        return await this.post(routes.REST_CREATE_ORDER, params);
    }

    async cancelOrder(orderId: string, symbol: string) {
        const params: KeyValueType = { order_id: orderId, symbol };
        return await this.post(routes.REST_CANCEL_ORDER, params);
    }

    async cancelAllOrder(symbol: string) {
        const params: KeyValueType = { symbol };
        return await this.post(routes.REST_CANCEL_ORDER_ALL, params);
    }

    async massReplace(symbol: string, createOrders?: KeyValueType[], cancelOrders?: number[]) {
        const params: KeyValueType = { symbol };
        if (cancelOrders !== undefined) {
            params.mass_cancel = JSON.stringify(cancelOrders);
        }
        if (createOrders !== undefined) {
            const convCreateOrders: KeyValueType[] = [];
            for (let order of createOrders) {
                order.side = (order.side! as string).toUpperCase();
                order.type = (order.type! as string) === "limit" ? "1" : "2";
                convCreateOrders.push(order);
            }
            params.mass_place = JSON.stringify(convCreateOrders);
        }
        return await this.post(routes.REST_MASS_REPLACE, params);
    }

    private async get(path: string, params: KeyValueType = {}) {
        try {
            const uri = buildRestURI(path);
            const querystr = buildQueryString(this.signParams(params));
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

    private async post(path: string, params: KeyValueType = {}) {
        try {
            const uri = buildRestURI(path);
            const body = this.signParams(params);
            const resp = await axios.default.post(uri, body, { headers: HEADERS });
            if (resp.status !== 200) {
                throw new Error(resp.statusText);
            }
            return resp.data;
        } catch (error) {
            throw error;
        }
    }

    private signParams(args: KeyValueType = {}, sign: boolean = true) {
        const body = Object.assign({}, args);
        if (sign) {
            body.api_key = this.apiKey;
            body.time = this.Timestamp;

            const keys = Object.keys(body);
            const sortedKeys = keys.sort();
            let message = "";
            for (let key of sortedKeys) {
                const value = body[key];
                message += key;
                message += String(value);
            }
            console.log("message:", message);
            const md5Inst = crypto.createHash("md5");
            md5Inst.update(message + this.apiSecretKey, "utf8");
            const md5HexMsg = md5Inst.digest("hex");
            body.sign = md5HexMsg;
        }
        console.log("signParams:", JSON.stringify(body, null, 2));
        return body;
    }

    private get Timestamp(): string {
        return Math.floor(Date.now() / 1000).toString();
    }
}

export default AuthorizationClient;