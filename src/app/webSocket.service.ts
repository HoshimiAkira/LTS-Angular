import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private readonly HEARTBEAT_INTERVAL_MS = 20000;
  private heartbeatInterval: any;

  public message$: Subject<any> = new Subject();

  constructor() {
    this.initSocket();
  }

  private initSocket() {
    const uuid = localStorage.getItem('uuid');
    this.socket = new WebSocket('ws://localhost:8080/websocket?userId='+uuid);
    this.socket.onopen = () => {
      console.log('WebSocket open');
    };
    this.socket.onclose = () => {
      console.log('WebSocket close');
      clearInterval(this.heartbeatInterval); 
    };
    this.socket.onerror = (error) => {
      console.error('WebSocket error：', error);
    };
    this.socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      this.message$.next(data);
    });
    this.heartbeatInterval = setInterval(() => { 
      this.sendHeartbeat();
    }, this.HEARTBEAT_INTERVAL_MS);
  }

  sendHeartbeat() {
    if (this.socket.readyState === WebSocket.OPEN) {
      const message = { type: 'heartbeat', data: '' };
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket close');
    }
  }

  public send(message: any) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket close');
    }
  }

  public close() {
    this.socket.close();
  }
}