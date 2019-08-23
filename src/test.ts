import {
    PublicClient,
    AuthorizationClient,
    WebSocketClient
} from ".";
import {
    MarketDepthTypes,
    WebSocketSubscribeKLinePeriodType
} from "."

// const api_key: string = "d7e4d03168ac95fca79ffd60a9dc3632";
// const secretkey: string = "23dd2c1b3090b5fw03a4b5f0af428cb1";

const api_key: string = 'b1a5712dfbe38e5d4b9a2d95bb14efb9';
const secretkey: string = 'c75bb0e10aba426c542bb6f97e737e72';

const publicclient = new PublicClient();
void (publicclient);
const authclient = new AuthorizationClient(api_key, secretkey);
void (authclient);
const websocketClient = new WebSocketClient();
void (websocketClient);

(async () => {
    // public 
    const symbols = await publicclient.getSymbols();
    console.log("getSymbols:", JSON.stringify(symbols));

    const alltickers = await publicclient.getAllTickers();
    console.log("getAllTickers:", JSON.stringify(alltickers));

    const market = await publicclient.getMarket();
    console.log("getMarket:", JSON.stringify(market));

    const ticker = await publicclient.getTicker("ethusdt");
    console.log("getTicker:", JSON.stringify(ticker));

    const trades = await publicclient.getTrades("btcusdt");
    console.log("getTrades:", JSON.stringify(trades));

    const records = await publicclient.getRecords("ltcusdt", 60);
    console.log("getRecords:", JSON.stringify(records));

    const depth = await publicclient.getMarketDepth("ethusdt", MarketDepthTypes.Step2);
    console.log("getMarketDepth:", JSON.stringify(depth));


    // auth
    const account = await authclient.getAccount();
    console.log("getAccount:", JSON.stringify(account));

    const newOrder = await authclient.getNewOrder("btcusdt");
    console.log("getNewOrder:", newOrder);

    const allOrder = await authclient.getAllOrder("btcusdt");
    console.log("getAllOrder:", allOrder);

    const allTrade = await authclient.getAllTrade("btcusdt");
    console.log("getAllTrade:", allTrade);

    /// websocket
    websocketClient.OnMessage = _onMessage;
    websocketClient.connect();
    websocketClient.subscribeTradeTicker("btc", "usdt");
    websocketClient.subscribeTradeTicker("eth", "usdt");
    websocketClient.subscribeKLine("eth", "usdt", WebSocketSubscribeKLinePeriodType.FiveMin);

    // TODO
    setInterval(() => { }, 1000);
})()
    .then(() => { })
    .catch((error: any) => console.log("error:", error.toString()));


let count = 0;
const max_count = 5;
function _onMessage(data: any) {
    console.log("_onMessage:", JSON.stringify(data));
    count++;
    if (count > max_count) {
        websocketClient.unsubscribeTradeTicker("eth", "usdt");
    }
}