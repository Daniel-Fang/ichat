/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type } from '@/enum/Type';
type Fn = (args?: Array<any>) => any;

class Chat {
  ws: WebSocket;
  timeout: number;
  promise: Promise<any>;
  eventHub: { [name: string]: Fn[] };
  invocationId: number;
  invocationIdMap: Map<number, any>;
  _ready: boolean;

  constructor (url = 'ws://localhost:9000', timeout = 10000) {
    this.ws = new WebSocket(url);
    this.timeout = timeout;
    this.invocationId = 0;
    this.invocationIdMap = new Map();
    this.eventHub = Object.create(null);
    this._ready = false;
    this.promise = new Promise((resolve, reject) => {
      this.ws.addEventListener('open', () => {
        resolve(this);
      });
      this.ws.addEventListener('message', (ev: MessageEvent) => {
        const data = JSON.parse(ev.data);
        switch(data.type) {
          case Type.Heartbeat:
            // 心跳消息，60s发送一次
            this.ws.send(JSON.stringify({ type: 1 }));
            break;
          case Type.Callback:
            // 消息发送成功消息
            this._feedback(data);
            break;
          case Type.Push:
            // 接收到服务端推送的消息
            this._emitEvent('receive', data);
            break;
          default:
            break;
        }
      });
      this.ws.addEventListener('error', (ev: Event) => {
        reject(ev);
        this._emitEvent('error', ev);
      });
      this.ws.addEventListener('close', (ev: CloseEvent) => {
        reject(ev);
        this._emitEvent('close', ev);
      });
    });
  }

  isReady (): boolean {
    return this._ready;
  }

  generateInvocationId (): number {
    return this.invocationId++;
  } 

  onMessage (callback: Fn): void {
    this._registerEvent('receive', callback);
  }

  onClose (callback: Fn): void {
    this._registerEvent('close', callback);
  }

  onError (callback: Fn): void {
    this._registerEvent('error', callback);
  }

  sendMessage<T> (type: number, message: string): Promise<T> {
    return this._send(type, message);
  }

  close (code?: number, reason?: string): void {
    this.ws.close(code, reason);
  }

  _registerEvent (name: string, fn: Fn): Fn {
    if (this.eventHub[name]) {
        this.eventHub[name].push(fn);
    } else {
        this.eventHub[name] = [fn];
    }
    return () => {
        // 取消事件注册
        const index = this.eventHub[name].indexOf(fn);
        index !== -1 && (this.eventHub[name].splice(index, 1));
    };
  }

  _emitEvent (name: string, ...args: any): void {
    if (this.eventHub[name]) {
      this.eventHub[name].forEach(item => {
        item.apply(this, args);
      })
    }
  }

  _send (type: number, message: string, invocationId = this.generateInvocationId()): Promise<any> {
    let data;
    if (typeof message === 'string') {
      data = {
        invocationId,
        message,
        type
      }
    } else {
      data = message;
    }
    this.ws.send(JSON.stringify(data));
    const p = new Promise((resolve, reject) => {
      this.invocationIdMap.set(invocationId, (result: any) => {
        this.invocationIdMap.delete(invocationId);
        resolve(result);
      })
      setTimeout(() => {
        this.invocationIdMap.delete(invocationId);
        reject(new Error('timeout'));
      }, this.timeout);
    })
    return p;
  }

  _feedback (res: { invocationId: number, result: any}): void {
    this.invocationIdMap.get(res.invocationId)(res.result);
  }
}

export default Chat;