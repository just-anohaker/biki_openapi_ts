import { RecordsPeriodType, MarketDepthTypes } from "../index";
declare class PublicClient {
    constructor();
    getSymbols(): Promise<any>;
    getAllTickers(): Promise<any>;
    getMarket(): Promise<any>;
    getTicker(symbol: string): Promise<any>;
    getTrades(symbol: string): Promise<any>;
    getRecords(symbol: string, period: RecordsPeriodType): Promise<any>;
    getMarketDepth(symbol: string, type: MarketDepthTypes): Promise<any>;
    private get;
}
export default PublicClient;
