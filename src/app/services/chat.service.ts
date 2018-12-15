import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io('http://localhost:8083');

  constructor() { }

  joinRoom(data) {
    this.socket.emit('join', data);
  }

  leaveRoom(data) {
    this.socket.emit('leave', data);
  }

  newUserJoined() {
    let observable = new Observable<{ username: string, message: string }>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  userLeft() {
    let observable = new Observable<{ username: string, message: string }>(observer => {
      this.socket.on('user left', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  newMessage() {
    let observable = new Observable<{ username: string, message: string }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
    return observable;
  }
}
