import { Injectable } from '@angular/core';
import { ChatDetailItem } from './chat-detail/interfaces/chat-detail';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private chats: ChatDetailItem[] = Array(10)
    .fill(null)
    .map((value, index) => ({
      id: `${index}`,
      title: `Title: ${index}`,
      subtitle: `Subtitle: ${index}`,
    }));

  constructor() {}

  byId(id: string): ChatDetailItem {
    return this.chats.find((a) => a.id === id);
  }

  getAll(): ChatDetailItem[] {
    return this.chats;
  }
}
