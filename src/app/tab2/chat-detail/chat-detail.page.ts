import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../chat.service';
import { ChatDetailItem } from './interfaces/chat-detail';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.page.html',
  styleUrls: ['./chat-detail.page.scss'],
})
export class ChatDetailPage implements OnInit {
  public item: ChatDetailItem;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {
    const id = route.snapshot.paramMap.get('id');
    this.item = this.chatService.byId(id);
  }

  ngOnInit() {}
}
