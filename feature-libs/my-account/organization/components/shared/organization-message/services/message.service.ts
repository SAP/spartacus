import { Injectable, Type } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { Message, MessageComponentData } from '../message.model';

// const DEFAULT_MESSAGE_TIMEOUT = 3000;

@Injectable()
export class MessageService {
  protected data$: Subject<Message> = new Subject();

  get(): Observable<Message> {
    return this.data$;
  }

  add<T extends MessageComponentData>(message: T, component?: Type<any>): void {
    if (!message.type) {
      message.type = GlobalMessageType.MSG_TYPE_INFO;
    }

    // if (!message.timeout && message.type === GlobalMessageType.MSG_TYPE_INFO) {
    //   message.timeout = DEFAULT_MESSAGE_TIMEOUT;
    // }

    this.data$.next({
      data: message,
      component,
    });
  }

  clear(): void {
    this.data$.next();
  }
}
