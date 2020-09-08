import { Injectable, Type } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { Message, MessageComponentData } from '../message.model';

@Injectable()
export class MessageService {
  protected data$: Subject<Message> = new Subject();

  get(): Observable<Message> {
    return this.data$;
  }

  add<T extends MessageComponentData>(
    message: T,
    component?: Type<any>,
    timeout?: number
  ): void {
    if (!message.type) {
      message.type = GlobalMessageType.MSG_TYPE_INFO;
    }

    this.data$.next({
      data: message,
      component,
      timeout,
    });
  }

  clear(): void {
    this.data$.next();
  }
}
