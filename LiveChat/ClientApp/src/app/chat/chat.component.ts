import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageReceiveModel } from 'src/models/message-receive.model';
import { MessageSendModel } from 'src/models/message-send.model';
import { ChatService, ConnectionState } from 'src/services/chat.service';

@UntilDestroy()
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public messages: MessageReceiveModel[] = [
    {
      author: 'John',
      date: new Date(),
      content:
        "Welcome to the chat! I'm the local bot. Hope you'll have some fun. :)",
    },
  ];

  public connectionState?: ConnectionState;

  constructor(
    private chatService: ChatService,
    private snackbar: MatSnackBar
  ) {}

  public ngOnInit(): void {
    this.chatService.messageStream
      .pipe(untilDestroyed(this))
      .subscribe((m) => this.messages.push(m));

    this.chatService.connectionState
      .pipe(untilDestroyed(this))
      .subscribe((newState) => {
        this.snackbar.dismiss();

        if (this.connectionState) {
          switch (newState) {
            case 'disconnected':
              this.snackbar.open('Disconnected, reload the page');
              break;
            case 'reconnecting':
              this.snackbar.open('Connection lost. Reconnecting...');
              break;
            case 'connected':
              this.snackbar.open('Connected', undefined, { duration: 3000 });
              break;
          }
        }

        this.connectionState = newState;
      });
  }

  public async onSent(message: string): Promise<void> {
    const model: MessageSendModel = {
      content: message,
    };

    await this.chatService.sendMessage(model);
  }
}
