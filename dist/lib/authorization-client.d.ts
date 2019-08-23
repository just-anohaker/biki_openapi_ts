import { KeyValueType } from "../common/types";
declare class AuthorizationClient {
    private apiKey;
    private apiSecretKey;
    constructor(apiKey: string, apiSecretKey: string);
    getAccount(): Promise<any>;
    getNewOrder(symbol: string, pageSize?: string, page?: string): Promise<any>;
    getAllOrder(symbol: string, startDate?: string, endDate?: string, pageSize?: string, page?: string, sort?: "1"): Promise<any>;
    getAllTrade(symbol: string, startDate?: string, endDate?: string, pageSize?: string, page?: string, sort?: "1"): Promise<any>;
    getOrderInfo(orderId: string, symbol: string): Promise<any>;
    createOrder(symbol: string, type: string, side: string, volume: string, price?: string, feeIsUserExchangeCoin?: string): Promise<any>;
    cancelOrder(orderId: string, symbol: string): Promise<any>;
    cancelAllOrder(symbol: string): Promise<any>;
    massReplace(symbol: string, createOrders?: KeyValueType[], cancelOrders?: number[]): Promise<any>;
    private get;
    private post;
    private signParams;
    private readonly Timestamp;
}
export default AuthorizationClient;
