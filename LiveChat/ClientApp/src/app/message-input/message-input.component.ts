import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-message-input',
  templateUrl: './message-input.component.html',
  styleUrls: ['./message-input.component.scss'],
})
export class MessageInputComponent implements OnInit {
  @Output()
  public sent = new EventEmitter<string>();

  messageText: string = '';

  constructor() {}

  ngOnInit(): void {}

  keyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSend();
    }
  }

  onSend(): void {
    const trimmedMessage = this.messageText.trim();
    if (!trimmedMessage) {
      return;
    }

    this.sent.emit(trimmedMessage);
    this.messageText = '';
  }
}
