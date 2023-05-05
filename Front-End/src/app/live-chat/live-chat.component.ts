import { Component, OnInit, EventEmitter } from '@angular/core';
import { SocketioService } from './web-socket.service';

import { FormBuilder } from '@angular/forms';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss'],
})
export class LiveChatComponent implements OnInit {
  onChat = new EventEmitter();
  title = 'socketio-angular';

  CHAT_ROOM = 'myRandomChatRoomId';

  messages: any = [];

  tokenForm = this.formBuilder.group({
    token: '',
  });

  messageForm = this.formBuilder.group({
    message: '',
  });
  sender = {
    id: '1',
    name: 'Customer',
  };

  constructor(
    private socketService: SocketioService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    console.log("Khởi tạo oninit")
    if (sessionStorage.getItem('token')) {
      this.tokenForm.patchValue({
        token: sessionStorage.getItem('token'),
      });
      const token = this.tokenForm.get('token')?.value;
      this.sender = jwt_decode(token);
      if (token) {
        this.socketService.setupSocketConnection(token);
        this.socketService.subscribeToMessages((err, data) => {
          this.messages = [...this.messages, data];
        });
      }
    } else {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5OTkiLCJuYW1lIjoiQ3VzdG9tZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.pZymsNgr3U6gQGdLtmf4-k-M3YRILhcauAkkDGWLF7s';
      this.sender = jwt_decode(token);
      if (token) {
        this.socketService.setupSocketConnection(token);
        this.socketService.subscribeToMessages((err, data) => {
          this.messages = [...this.messages, data];
        });
      }
    }
  }

  submitToken() {
    const token = this.tokenForm.get('token')?.value;
    this.sender = jwt_decode(token);
    if (token) {
      this.socketService.setupSocketConnection(token);
      this.socketService.subscribeToMessages((err, data) => {
        console.log('NEW MESSAGE ', data);
        this.messages = [...this.messages, data];
      });
    }
  }

  submitMessage() {
    const message = this.messageForm.get('message')?.value;
    if (message) {
      this.socketService.sendMessage(
        { message, roomName: this.CHAT_ROOM },
        (cb) => {
        }
      );
      this.messages = [
        ...this.messages,
        {
          message,
          ...this.sender,
        },
      ];
      // clear the input after the message is sent
      this.messageForm.reset();
    }
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
