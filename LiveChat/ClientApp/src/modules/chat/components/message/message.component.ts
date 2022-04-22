import { Component, Input, OnInit } from '@angular/core';
import { MessageReceiveModel } from '../../models/message-receive.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input()
  public message?: MessageReceiveModel;

  constructor() { }

  public ngOnInit(): void {
  }

}
