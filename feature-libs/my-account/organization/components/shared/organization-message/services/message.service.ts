import { Injectable } from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { MessageData, MessageEventData } from '../message.model';

// const DEFAULT_INFO_TIMEOUT = 3000;

@Injectable()
export class MessageService {
  protected data$: Subject<MessageData> = new Subject();

  get(): Observable<MessageData> {
    return this.data$;
  }

  add<
    O extends MessageEventData = MessageEventData,
    T extends MessageData<O> = MessageData<O>
  >(message: T): Subject<O> {
    message = { ...this.getDefaultMessage(message), ...message };

    message.events = new Subject<O>();

    this.data$.next(message);
    return message.events;
  }

  close(message: Subject<MessageEventData>) {
    message.next({ close: true });
  }

  /**
   * Sets the message type to INFO, and adds a default timeout
   * for info messages.
   */
  protected getDefaultMessage<T extends MessageData = MessageData>(
    _message: T
  ): MessageData {
    const defaultMessage: MessageData = {
      type: GlobalMessageType.MSG_TYPE_INFO,
    };
    // if (!message.type || message.type === GlobalMessageType.MSG_TYPE_INFO) {
    //   defaultMessage.timeout = DEFAULT_INFO_TIMEOUT;
    // }
    return defaultMessage;
  }

  clear(): void {
    this.data$.next();
  }
}
