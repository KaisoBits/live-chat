import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { MessageReceiveModel } from '../../models/message-receive.model';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit, AfterViewChecked {
  @Input()
  public messages: MessageReceiveModel[] = [];

  public glueToBottom = true;

  @ViewChild('feedDiv')
  private feedDiv!: ElementRef<HTMLElement>;

  private lastMessageCount = 0;

  constructor() {}

  public ngOnInit(): void {}

  public ngAfterViewChecked(): void {
    if (this.lastMessageCount === this.messages.length) {
      return;
    }

    this.lastMessageCount = this.messages.length;

    if (this.glueToBottom) {
      this.scrollToBottom();
    }
  }

  public onScroll(ev: Event): void {
    const el = ev.target as HTMLDivElement;
    const targetScroll = el.scrollHeight - el.clientHeight;
    this.glueToBottom = targetScroll - 10 < el.scrollTop;
  }

  public scrollToBottom(): void {
    const el = this.feedDiv.nativeElement;
    const targetTop = el.scrollHeight - el.clientHeight;
    el.scrollTop = targetTop;
  }
}
