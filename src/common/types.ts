export const enum RequestMethods {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE"
}

export type RequestHeader = {
    "Content-Type": string;
}

export type KeyValueType = {
    [key: string]: {} | null | undefined;
}

export type WebSocketOnMessageType = (data: KeyValueType) => void;
export type WebSocketSubscribeParams = {
    channel: string;
    cb_id: string;
    asks?: number;
    bids?: number;
}
export type WebSocketUnsubscribeParams = {
    channel: string;
    asks?: number;
    bids?: number;
}
