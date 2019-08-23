export { default as PublicClient } from "./lib/public-client";
export { default as AuthorizationClient } from "./lib/authorization-client";
export { default as WebSocketClient } from "./lib/websocket-client";

export const enum RecordsPeriodType {
    OneMin = 1,						// 1分钟
    FiveMin = 5,					// 5分钟
    HalfHour = 30,				    // 30分钟(半小时)
    OneHour = 60,					// 60分钟(1小时)
    OneDay = 1440,			        // 1天	
    OneWeek = 10080,			    // 1周
    OneMonth = 43200			    // 1月
}

export const enum MarketDepthTypes {
    Step0 = "step0",		        // 深度0
    Step1 = "step1",				// 深度1
    Step2 = "step2"					// 深度2
}

export const enum WebSocketSubscribeDepthStepType {
    Step0 = 0,                      // 深度0
    Step1 = 1,                      // 深度1
    Step2 = 2                       // 深度2
};

export const enum WebSocketSubscribeKLinePeriodType {
    OneMin = "1min",                // 1分钟
    FiveMin = "5min",               // 5分钟    
    FifteenMin = "15min",           // 15分钟
    HalfHour = "30min",             // 30分钟(半小时)
    OneHour = "60min",              // 60分钟(1小时)
    OneDay = "1day",                // 1天
    OneWeek = "1week"               // 1周
}