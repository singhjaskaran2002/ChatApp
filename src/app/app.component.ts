import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  messageArray: Array<{ username: string, message: string }> = [];

  @ViewChild('chatDiv') private myScrollContainer: ElementRef<any>

  message: string;
  username: string;
  room: string;

  constructor(
    private chatService: ChatService
  ) {
    this.chatService.newUserJoined().subscribe(data => {
      this.messageArray.push(data);
    });

    this.chatService.userLeft().subscribe(data => {
      this.messageArray.push(data);
    });

    this.chatService.newMessage().subscribe(data => {
      this.messageArray.push(data);
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  join() {
    this.chatService.joinRoom({ username: this.username, room: this.room });
  }

  leave() {
    this.chatService.leaveRoom({ username: this.username, room: this.room });
  }

  send() {
    this.chatService.sendMessage({ username: this.username, room: this.room, message: this.message });
    this.message = '';
    document.getElementById('message').focus();
  }
}
