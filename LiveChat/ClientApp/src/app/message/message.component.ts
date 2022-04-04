import { Component, Input, OnInit } from '@angular/core';
import { MessageReceiveModel } from 'src/models/message-receive.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input()
  message?: MessageReceiveModel;

  constructor() { }

  ngOnInit(): void {
  }

}
