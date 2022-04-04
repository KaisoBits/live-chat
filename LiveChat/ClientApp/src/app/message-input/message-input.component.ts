import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent implements OnInit {
  @Input()
  public enabled = true;

  @Output()
  public sent = new EventEmitter<string>();

  public messageText: string = '';

  constructor() {}

  ngOnInit(): void {}

  public keyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSend();
    }
  }

  public onSend(): void {
    if (!this.enabled) {
      return;
    }

    const trimmedMessage = this.messageText.trim();
    if (!trimmedMessage) {
      return;
    }

    this.sent.emit(trimmedMessage);
    this.messageText = '';
  }
}
