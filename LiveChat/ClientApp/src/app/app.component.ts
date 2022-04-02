import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/services/chat.service';
declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LiveChat';

  constructor(private _chatService: ChatService) {}

  async ngOnInit(): Promise<void> {
    particlesJS.load('particles-js', '/assets/particles.json', null);
    await this._chatService.init();
  }
}
