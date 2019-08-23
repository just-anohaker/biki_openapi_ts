export { default as PublicClient } from "./lib/public-client";
export { default as AuthorizationClient } from "./lib/authorization-client";
export { default as WebSocketClient } from "./lib/websocket-client";
export declare const enum RecordsPeriodType {
    OneMin = 1,
    FiveMin = 5,
    HalfHour = 30,
    OneHour = 60,
    OneDay = 1440,
    OneWeek = 10080,
    OneMonth = 43200
}
export declare const enum MarketDepthTypes {
    Step0 = "step0",
    Step1 = "step1",
    Step2 = "step2"
}
export declare const enum WebSocketSubscribeDepthStepType {
    Step0 = 0,
    Step1 = 1,
    Step2 = 2
}
export declare const enum WebSocketSubscribeKLinePeriodType {
    OneMin = "1min",
    FiveMin = "5min",
    FifteenMin = "15min",
    HalfHour = "30min",
    OneHour = "60min",
    OneDay = "1day",
    OneWeek = "1week"
}
