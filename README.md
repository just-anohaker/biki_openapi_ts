# 库功能说明

## 概述

biki_openapi_ts是biki_openapi的typescript版本实现，使用方式如下：

```javascript
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
```

库提供了三类操作：PublicClient, AuthorizationClient, WebSocketClient

## PublicClient - 公共方法客户端

### 1. 查询系统支持的所有交易对及精度

***async getSymbol()***

### 2.获取所有交易对行情

***async getAllTickers()***

### 3.获取各个币对最新成交价

***async getMarket()***

### 4. 获取指定币对当前行情

***async getTicker(symbol)***

| 字段   | 类型   | 是否必须 | 说明                          |
| ------ | ------ | -------- | ----------------------------- |
| symbol | string | true     | btcusdt, ltcusdt, ethusdt ... |

### 5. 获取成交记录

***async getTrades(symbol)***

| 字段   | 类型   | 是否必须 | 说明                          |
| ------ | ------ | -------- | ----------------------------- |
| symbol | string | true     | btcusdt, ltcusdt, ethusdt ... |

### 6. 获取K线数据

***async getRecords(symbol, period)***

| 字段   | 类型                      | 是否必须 | 说明                                                     |
| ------ | ------------------------- | -------- | -------------------------------------------------------- |
| symbol | string                    | true     | btcusdt,ltcusdt,ethusdt ...                              |
| period | RecordsPeriodType(number) | true     | k线周期，单位为分钟，<br />1代表1分钟，<br />1天代表1440 |

*RecordsPeriodType*：

```typescript
export const enum RecordsPeriodType {
  	OneMin = 1,						// 1分钟
    FiveMin = 5,					// 5分钟
    HalfHour = 30,				// 30分钟(半小时)
    OneHour = 60,					// 60分钟(1小时)
    OneDay = 1440,				// 1天	
    OneWeek = 10080,			// 1周
    OneMonth = 43200			// 1月
}	
```

### 7. 获取买卖盘深度

***async getMarketDepth(symbol, type)***

| 字段   | 类型                    | 是否必须 | 说明                                   |
| ------ | ----------------------- | -------- | -------------------------------------- |
| symbol | string                  | true     | btcusdt, ltcusdt, ethusdt ...          |
| type   | MarketDepthType(string) | true     | 深度类型(合并深度0-2), step0时精义最高 |

*MarketDepthTypes*：

```typescript
export const enum MarketDepthTypes {
    Step0 = "step0",					// 深度0
    Step1 = "step1",					// 深度1
    Step2 = "step2"						// 深度2
}
```



## AuthorizationClient - 授权方法客户端

### 1. 获取资产余额

***async getAccount()***

### 2. 获取当前委托

***async getNewOrder(symbol, pageSize, page)***

| 字段     | 类型   | 是否必须 | 说明                        |
| -------- | ------ | -------- | --------------------------- |
| symbol   | string | true     | btcusdt,ltcusdt,ethusdt ... |
| pageSize | string | false    | 每次页数据数                |
| page     | string | false    | 页码                        |

### 3. 获取全部委托

***async getAllOrder(symbol, startDate, endDate, pageSize, page, sort)***

| 字段      | 类型   | 是否必须 | 说明                                    |
| --------- | ------ | -------- | --------------------------------------- |
| symbol    | string | true     | btcusdt,ltcusdt,ethusdt ...             |
| startDate | string | false    | 开始时间，精确到秒"yyyy-MM-dd mm:hh:ss" |
| endDate   | string | false    | 结束时间，精确到秒"yyyy-MM-dd mm:hh:ss" |
| pageSize  | string | false    | 每页数据数                              |
| page      | string | false    | 页码                                    |
| sort      | string | false    | "1"表示倒序                             |

### 4. 获取全部成交记录

***async getAllTrade(symbol, startDate, endDate, pageSize, page, sort)***


| 字段      | 类型   | 是否必须 | 说明                                    |
| --------- | ------ | -------- | --------------------------------------- |
| symbol    | string | true     | btcusdt,ltcusdt,ethusdt ...             |
| startDate | string | false    | 开始时间，精确到秒"yyyy-MM-dd mm:hh:ss" |
| endDate   | string | false    | 结束时间，精确到秒"yyyy-MM-dd mm:hh:ss" |
| pageSize  | string | false    | 每页数据数                              |
| page      | string | false    | 页码                                    |
| sort      | string | false    | "1"表示倒序                             |

### 5. 获取订单详情

***async getOrderInfo(orderId, symbol)***

| 字段    | 类型   | 是否必须 | 说明                        |
| ------- | ------ | -------- | --------------------------- |
| orderId | string | true     | 订单号                      |
| symbol  | string | true     | btcusdt,ltcusdt,ethusdt ... |

### 6. 创建订单

***async createOrder(symbol, type, side, volume, price, feeIsUserExchangeCoin)***

| 字段                  | 类型   | 是否必须 | 说明                                                         |
| --------------------- | ------ | -------- | ------------------------------------------------------------ |
| symbol                | string | true     | btcusdt, ltcusdt, ethusdt ...                                |
| type                  | string | true     | "1":限价委托;"2":市价委托                                    |
| side                  | string | true     | 买卖方向: "BUY"/"SELL"                                       |
| volume                | string | true     | 购买数量,<br />type="1":表示买卖数量;<br />type="2":买表示总价格，卖表示总个数 |
| price                 | string | false    | 委托单价<br />type=“2”时忽略此参数                           |
| feeIsUserExchangeCoin | string | false    | 默认写"0"                                                    |

### 7. 取消委托单

***async cancelOrder(orderId, symbol)***

| 字段    | 类型   | 是否必须 | 说明                        |
| ------- | ------ | -------- | --------------------------- |
| orderId | string | true     | 订单Id                      |
| symbol  | string | true     | btcusdt,ltcusdt,ethusdt ... |

### 8. 取消指定币对全部委托单

***async cancelAllOrder(symbol)***

| 字段   | 类型   | 是否必须 | 说明                        |
| ------ | ------ | -------- | --------------------------- |
| symbol | string | true     | btcusdt,ltcusdt,ethusdt ... |

### 9. 批量下单撤单

***async massReplace(symbol, createOrders, cancelOrders)***

| 字段         | 类型   | 是否必须 | 说明                                                         |
| ------------ | ------ | -------- | ------------------------------------------------------------ |
| symbol       | string | true     | btcusdt,ltcusdt,ethusdt ...                                  |
| createOrders | String | false    | [{side: "BUY", type: "1", volume: "0.01", price: "6400", fee_is_user_exchange_coin: "0"}, {...}, ...] |
| cancelOrders | string | false    | [1234, 1235, ...]                                            |

## WebSocketClient - Socket连接客户端

**WebSocketSubscribeDepthStepType ** 说明

```typescript
export const enum WebSocketSubscribeDepthStepType {
    Step0 = 0,                      // 深度0
    Step1 = 1,                      // 深度1
    Step2 = 2                       // 深度2
};
```

**WebSocketSubscribeKLinePeriodType** 说明

```typescript
export const enum WebSocketSubscribeKLinePeriodType {
    OneMin = "1min",                // 1分钟
    FiveMin = "5min",               // 5分钟    
    FifteenMin = "15min",           // 15分钟
    HalfHour = "30min",             // 30分钟(半小时)
    OneHour = "60min",              // 60分钟(1小时)
    OneDay = "1day",                // 1天
    OneWeek = "1week"               // 1周
}
```



### 1. 连接

***connect()***

### 2. 断开

***close()***

### 3. 设置事件回调

***set OnMessage(onMessage: (data: {[key: string]: {} | null | undefined;}) => void )***

### 4. 获取事件回调

***get OnMessage() => (data: {[key: string]: {} | null | undefined; }) => void*** 

### 5. 是否已连接

***get IsOpened()***

### 6. 订阅实时成交信息

***subscribeTradeTicker(base, quote, cbId)***

| 字段  | 类型   | 是否必须 | 说明                                 |
| ----- | ------ | -------- | ------------------------------------ |
| base  | string | true     | 币对的前半部分,btcusdt -> base:btc   |
| quote | string | true     | 币对的后半部分,btcusdt -> quote:usdt |
| cbId  | string | false    | 默认值:"custom string"               |

### 7. 取消订阅实时成交信息

***unsubscribeTradeTicker(base, quote)***

| 字段  | 类型   | 是否必须 | 说明                                 |
| ----- | ------ | -------- | ------------------------------------ |
| base  | string | true     | 币对的前半部分,btcusdt -> base:btc   |
| quote | string | true     | 币对的后半部分,btcusdt -> quote:usdt |

### 8. 订阅深度盘口

***subscribeDepth(base, quote, step, cbId, asks, bids)***

| 字段  | 类型                                    | 是否必须 | 说明                                   |
| ----- | --------------------------------------- | -------- | -------------------------------------- |
| base  | string                                  | true     | 币对的前半部分,btcusdt -> base:btc     |
| quote | string                                  | true     | 币对的后半部分,btcusdt -> quote:usdt   |
| step  | WebSocketSubscribeDepthStepType(number) | true     | 精度,参见(WebSocketSubscribeDepthType) |
| cbId  | string                                  | false    | 默认值:"custom string"                 |
| asks  | number                                  | false    | 默认值:150                             |
| bids  | number                                  | false    | 默认值:150                             |

### 9. 取消订阅深度盘口

***unsubscribeDepth(base, quote, step, asks, bids)***

| 字段  | 类型                                    | 是否必须 | 说明                                   |
| ----- | --------------------------------------- | -------- | -------------------------------------- |
| base  | string                                  | true     | 币对的前半部分,btcusdt -> base:btc     |
| quote | string                                  | true     | 币对的后半部分,btcusdt -> quote:usdt   |
| step  | WebSocketSubscribeDepthStepType(number) | true     | 精度,参见(WebSocketSubscribeDepthType) |
| asks  | number                                  | false    | 默认值:150                             |
| bids  | number                                  | false    | 默认值:150                             |

### 10. 订阅K线数据

***subscribeKLine(base, quote, period, cbId)***

| 字段   | 类型                                      | 是否必须 | 说明                                         |
| ------ | ----------------------------------------- | -------- | -------------------------------------------- |
| base   | string                                    | true     | 币对的前半部分,btcusdt -> base:btc           |
| quote  | string                                    | true     | 币对的后半部分,btcusdt -> quote:usdt         |
| period | WebSocketSubscribeKLinePeriodType(string) | true     | 精度,参见(WebSocketSubscribeKLinePeriodType) |
| cbId   | string                                    | false    | 默认值:"custom string"                       |

### 11. 取消订阅K线数据

***unsubscribeKLine(base, quote, period)***

| 字段   | 类型                                      | 是否必须 | 说明                                         |
| ------ | ----------------------------------------- | -------- | -------------------------------------------- |
| base   | string                                    | true     | 币对的前半部分,btcusdt -> base:btc           |
| quote  | string                                    | true     | 币对的后半部分,btcusdt -> quote:usdt         |
| period | WebSocketSubscribeKLinePeriodType(string) | true     | 精度,参见(WebSocketSubscribeKLinePeriodType) |

