import zlib from "zlib";
import WebSocket from "ws";
import { WS_URL } from "../common/config";
import { KeyValueType, WebSocketOnMessageType, WebSocketSubscribeParams, WebSocketUnsubscribeParams } from "../common/types";
import { WebSocketSubscribeKLinePeriodType, WebSocketSubscribeDepthStepType } from "../index";

function noop() { }

class WebSocketClient {
    private client?: WebSocket;
    private isOpened: boolean;

    private onMessage?: WebSocketOnMessageType;
    private subscribeEvents: WebSocketSubscribeParams[];

    constructor(private debug: boolean = false) {
        this.isOpened = false;
        this.subscribeEvents = [];
    }

    get OnMessage(): WebSocketOnMessageType | undefined {
        return this.onMessage;
    }

    set OnMessage(onMessage: WebSocketOnMessageType | undefined) {
        this.onMessage = onMessage;
    }

    get IsOpened(): boolean {
        return this.isOpened;
    }

    subscribeTradeTicker(base: string, quote: string, cbId: string = "custom string") {
        const event = `market_${base.toLowerCase()}${quote.toLowerCase()}_trade_ticker`;
        const subscribeData: WebSocketSubscribeParams = { channel: event, cb_id: cbId };
        this.appendSubscribeData(subscribeData);
    }

    unsubscribeTradeTicker(base: string, quote: string) {
        const event = `market_${base.toLowerCase()}${quote.toLowerCase()}_trade_ticker`;
        const unsubscribeData: WebSocketUnsubscribeParams = { channel: event };
        this.removeSubscribeData(unsubscribeData);
    }

    subscribeDepth(base: string, quote: string, step: WebSocketSubscribeDepthStepType, cbId: string = "custom string", asks: number = 150, bids: number = 150) {
        const event = `market_${base.toLowerCase()}${quote.toLowerCase()}_depth_step${step}`;
        const subscribeData: WebSocketSubscribeParams = { channel: event, cb_id: cbId, asks, bids };
        this.appendSubscribeData(subscribeData);
    }

    unsubscribeDepth(base: string, quote: string, step: WebSocketSubscribeDepthStepType, asks: number = 150, bids: number = 150) {
        const event = `market_${base.toLowerCase()}${quote.toLowerCase()}_depth_step${step}`;
        const unsubscribeData: WebSocketUnsubscribeParams = { channel: event, asks, bids };
        this.removeSubscribeData(unsubscribeData);
    }

    subscribeKLine(base: string, quote: string, period: WebSocketSubscribeKLinePeriodType, cbId: string = "custom string") {
        const event = `market_${base.toLowerCase()}${quote.toLowerCase()}_kline_${period}`;
        const subscribeData: WebSocketSubscribeParams = { channel: event, cb_id: cbId };
        this.appendSubscribeData(subscribeData);
    }

    unsubscribeKLine(base: string, quote: string, period: WebSocketSubscribeKLinePeriodType) {
        const event = `market_${base.toLowerCase()}${quote.toLowerCase()}_kline_${period}`;
        const unsubscribeData = { channel: event };
        this.removeSubscribeData(unsubscribeData);
    }

    connect() {
        this.close();

        this.client = new WebSocket(WS_URL);
        this.client.onopen = this.onOpenEvent.bind(this);
        this.client.onclose = this.onCloseEvent.bind(this);
        this.client.onerror = this.onErrorEvent.bind(this);
        this.client.onmessage = this.onMessageEvent.bind(this);

        this.debug ? console.log("connect:", WS_URL) : undefined;
    }

    close() {
        if (this.client !== undefined) {
            console.log("websocket close");
            this.client.onopen = noop;
            this.client.onclose = noop;
            this.client.onerror = noop;
            this.client.onmessage = noop;
            this.client.close();
            this.client = undefined;
            this.isOpened = false;
        }
    }

    private subscribe(data: KeyValueType) {
        this.IsOpened ? this.client!.send(JSON.stringify(data)) : undefined;
    }

    private appendSubscribeData(data: WebSocketSubscribeParams) {
        const found = this.subscribeEvents.find(val => {
            return val.channel === data.channel
                // && val.cb_id === data.cb_id
                && val.asks === data.asks
                && val.bids === data.bids;
        });
        if (found === undefined) {
            this.subscribeEvents.push(data);
        }
        const subscribeData = { event: "sub", params: data };
        this.subscribe(subscribeData);
    }

    private removeSubscribeData(data: WebSocketUnsubscribeParams) {
        const found = this.subscribeEvents.findIndex(val => {
            return val.channel === data.channel
                && val.asks === data.asks
                && val.bids === data.bids
        });
        if (found !== -1) {
            this.subscribeEvents.splice(found, 1);
            const unsubscribeData = { event: "unsub", params: data };
            this.subscribe(unsubscribeData);
        }
    }

    private onOpenEvent(event: WebSocket.OpenEvent) {
        this.debug ? console.log("onOpenEvent") : undefined;
        this.isOpened = true;
        this.subscribeEvents.forEach(val => {
            const subscribeData = { event: "sub", params: val };
            this.subscribe(subscribeData);
        });
    }

    private onCloseEvent(event: WebSocket.CloseEvent) {
        this.debug ? console.log("onCloseEvent:", event.code, event.reason) : undefined;
        this.isOpened = false;
        this.close();
        this.connect();
    }

    private onErrorEvent(event: WebSocket.ErrorEvent) {
        this.debug ? console.log("onErrorEvent:", event.type, event.message) : undefined;
    }

    private onMessageEvent(event: WebSocket.MessageEvent) {
        if (event.type !== "message") return;

        try {
            const socket = event.target;
            const ungzipData = zlib.gunzipSync(event.data as Buffer).toString("utf8");
            const jsonData = JSON.parse(ungzipData);
            this.debug ? console.log("onMessageEvent:", event.type, ungzipData) : undefined;
            if (jsonData.ping != null) {
                const pongMsg = { pong: jsonData.ping };
                socket.send(JSON.stringify(pongMsg));
            } else {
                this.debug ? console.log("onMessageEvent message:", JSON.stringify(jsonData)) : undefined;
                this.onMessage ? this.onMessage(jsonData) : undefined;
            }
        } catch (error) {
            // TODO
        }
    }
}

export default WebSocketClient;