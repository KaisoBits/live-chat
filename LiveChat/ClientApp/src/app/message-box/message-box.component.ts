import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  DoCheck,
  AfterViewChecked,
  AfterContentChecked,
} from '@angular/core';
import { MessageModel } from 'src/models/message-model';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit,  AfterViewChecked {
  @Input()
  messages: MessageModel[] = [];

  @ViewChild('feedDiv')
  feedDiv!: ElementRef<HTMLElement>;

  glueToBottom = true;

  private lastMessageCount = 0;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    if (this.lastMessageCount === this.messages.length) {
      return;
    }

    this.lastMessageCount = this.messages.length;

    if (this.glueToBottom) {
      this.scrollToBottom();
    }
  }

  onScroll(ev: Event): void {
    const el = ev.target as HTMLDivElement;
    const targetScroll = el.scrollHeight - el.clientHeight;
    this.glueToBottom = targetScroll - 10 < el.scrollTop;
  }

  scrollToBottom() {
    const el = this.feedDiv.nativeElement;
    const targetTop = el.scrollHeight - el.clientHeight;
    el.scrollTop = targetTop;
  }
}
