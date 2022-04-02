import { Component, Input, OnInit } from '@angular/core';
import { MessageModel } from 'src/models/message-model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input()
  message?: MessageModel;

  constructor() { }

  ngOnInit(): void {
  }

}
