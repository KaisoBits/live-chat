import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageReceiveModel } from 'src/models/message-receive.model';
import { MessageSendModel } from 'src/models/message-send.model';
import { ChatService } from 'src/services/chat.service';

@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: MessageReceiveModel[] = [
    {
      author: 'John',
      date: new Date(),
      content: 'Welcome to the chat! I\'m the local bot. Hope you\'ll have some fun. :)',
    },
  ];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.messageStream.pipe(untilDestroyed(this))
      .subscribe(m => this.messages.push(m));

    //this.chatService.sendMessage();
  }

  async onSent(message: string): Promise<void> {
    const model: MessageSendModel = {
      content: message,
    };

    await this.chatService.sendMessage(model);
  }

}
