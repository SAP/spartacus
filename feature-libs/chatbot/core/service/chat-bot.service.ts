import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatBotService {
  constructor() {}

  conversation$ = new BehaviorSubject<any[]>([]);

  addMessage(message: any) {
    this.conversation$.next([...this.conversation$.getValue(), message]);
  }
}
