import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection(token: string) {
    this.socket = io(environment.SOCKET_ENDPOINT, {
      auth: {
        token,
      },
    });
  }

  // Handle message receive event
  subscribeToMessages = (cb) => {
    let message = '';
    if (!this.socket) return true;
    this.socket.on('message', (msg) => {
      return cb(null, msg);
    });
    return true;
  };

  sendMessage = ({ message, roomName }, cb) => {
    if (this.socket) this.socket.emit('message', { message, roomName }, cb);
  };

  joinRoom = (roomName) => {
    this.socket.emit('join', roomName);
  };

  disconnect() {
    // console.log(this.socket)
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
