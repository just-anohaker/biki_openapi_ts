export declare const enum RequestMethods {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE"
}
export declare type RequestHeader = {
    "Content-Type": string;
};
export declare type KeyValueType = {
    [key: string]: {} | null | undefined;
};
export declare type WebSocketOnMessageType = (data: KeyValueType) => void;
export declare type WebSocketSubscribeParams = {
    channel: string;
    cb_id: string;
    asks?: number;
    bids?: number;
};
export declare type WebSocketUnsubscribeParams = {
    channel: string;
    asks?: number;
    bids?: number;
};
