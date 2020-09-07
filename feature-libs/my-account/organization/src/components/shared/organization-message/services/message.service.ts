import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { Message, MessageComponentData } from '../message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message$: Subject<Message> = new Subject();

  add<T extends MessageComponentData>(
    data: T,
    component?: Type<any>,
    timeout?: number
  ) {
    this.message$.next({
      data,
      component,
      timeout,
    });
  }

  clear() {
    this.message$.next(null);
  }
}
