import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { from, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageModel } from 'src/models/message-model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public get messageStream(): Observable<MessageModel> {
    return this._messageStream;
  }
  private _messageStream = new Subject<MessageModel>();

  private _hubConnection: signalR.HubConnection;
  private _initialized = false;

  constructor(private _http: HttpClient) {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.webApi + '/chat')
      .withAutomaticReconnect()
      .build();
  }

  public async init(): Promise<void> {
    if (this._initialized) return;
    this._initialized = true;

    this._hubConnection.on('messagesend', (model: MessageModel) =>
      this._messageStream.next(model)
    );

    try {
      await this._hubConnection.start();
      console.log('SignalR started');
    } catch (err) {
      console.error('SignalR error:', err);
    }
  }

  public async sendMessage(message: MessageModel) {
    await this._hubConnection.invoke('SendMessage', message);
  }
}
