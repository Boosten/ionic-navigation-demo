import { Component } from '@angular/core';
import { ChatDetailItem } from './chat-detail/interfaces/chat-detail';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public items: ChatDetailItem[] = [];

  constructor(private chatService: ChatService) {
    this.items = this.chatService.getAll();
  }
}
