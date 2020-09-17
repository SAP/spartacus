import { Injectable, Type } from '@angular/core';
import { GlobalMessageType, Translatable } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { Message, MessageComponentData } from '../message.model';

const DEFAULT_NOTIFY_TIMEOUT = 3000;

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
    this.data$.next({
      data: message,
      component,
    });
  }

  notify(message: Translatable) {
    const data: MessageComponentData = {
      message,
      timeout: DEFAULT_NOTIFY_TIMEOUT,
      type: GlobalMessageType.MSG_TYPE_INFO,
    };
    this.data$.next({
      data,
    });
  }

  clear(): void {
    this.data$.next();
  }
}
