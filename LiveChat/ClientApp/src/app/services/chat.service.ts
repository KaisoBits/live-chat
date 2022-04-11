import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageReceiveModel } from '../models/message-receive.model';
import { MessageSendModel } from '../models/message-send.model';

export type ConnectionState = 'connected' | 'disconnected' | 'reconnecting';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public get connectionState(): Observable<ConnectionState> {
    return this._connectionState;
  }
  private _connectionState = new BehaviorSubject<ConnectionState>(
    'disconnected'
  );

  public get messageStream(): Observable<MessageReceiveModel> {
    return this._messageStream;
  }
  private _messageStream = new Subject<MessageReceiveModel>();

  private _hubConnection: signalR.HubConnection;
  private _initialized = false;

  constructor(private _http: HttpClient) {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.webApi + '/chat')
      .withAutomaticReconnect()
      .build();
  }

  public async init(): Promise<void> {
    if (this._initialized) {
      return;
    }
    this._initialized = true;

    this._hubConnection.on('messagesend', (model: MessageReceiveModel) =>
      this._messageStream.next(model)
    );

    this._hubConnection.onreconnecting(() => this._connectionState.next('reconnecting'));
    this._hubConnection.onreconnected(() => this._connectionState.next('connected'));
    this._hubConnection.onclose(() => this._connectionState.next('disconnected'));

    try {
      await this._hubConnection.start();
      console.log('SignalR started');
      this._connectionState.next('connected');
    } catch (err) {
      console.error('SignalR error:', err);
    }
  }

  public async sendMessage(message: MessageSendModel) {
    await this._hubConnection.invoke('SendMessage', message);
  }
}
