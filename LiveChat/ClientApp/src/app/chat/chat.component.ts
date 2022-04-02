import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageModel } from 'src/models/message-model';
import { ChatService } from 'src/services/chat.service';

@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  messages: MessageModel[] = [
    {
      authorId: 'John',
      date: new Date(),
      message: 'Welcome to the chat! I\'m the local bot. Hope you\'ll have some fun. :)',
      profilePicture: 'https://www.pinkvilla.com/imageresize/dawn_cp_111_main_0.jpg?width=752&format=webp&t=pvorg'
    },
  ];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.chatService.messageStream.pipe(untilDestroyed(this))
      .subscribe(m => this.messages.push(m));

    //this.chatService.sendMessage();
  }

  async onSent(message: string): Promise<void> {
    let model: MessageModel = {
      authorId: 'Admin',
      date: new Date(),
      message: message,
      profilePicture: 'https://images.impresa.pt/expresso/2022-01-09-hacker-using-phone/1x1'
    };

    await this.chatService.sendMessage(model);
  }

}
