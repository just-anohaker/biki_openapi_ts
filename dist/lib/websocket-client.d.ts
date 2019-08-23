import { WebSocketOnMessageType } from "../common/types";
import { WebSocketSubscribeKLinePeriodType, WebSocketSubscribeDepthStepType } from "../index";
declare class WebSocketClient {
    private debug;
    private client?;
    private isOpened;
    private onMessage?;
    private subscribeEvents;
    constructor(debug?: boolean);
    OnMessage: WebSocketOnMessageType | undefined;
    readonly IsOpened: boolean;
    subscribeTradeTicker(base: string, quote: string, cbId?: string): void;
    unsubscribeTradeTicker(base: string, quote: string): void;
    subscribeDepth(base: string, quote: string, step: WebSocketSubscribeDepthStepType, cbId?: string, asks?: number, bids?: number): void;
    unsubscribeDepth(base: string, quote: string, step: WebSocketSubscribeDepthStepType, asks?: number, bids?: number): void;
    subscribeKLine(base: string, quote: string, period: WebSocketSubscribeKLinePeriodType, cbId?: string): void;
    unsubscribeKLine(base: string, quote: string, period: WebSocketSubscribeKLinePeriodType): void;
    connect(): void;
    close(): void;
    private subscribe;
    private appendSubscribeData;
    private removeSubscribeData;
    private onOpenEvent;
    private onCloseEvent;
    private onErrorEvent;
    private onMessageEvent;
}
export default WebSocketClient;
