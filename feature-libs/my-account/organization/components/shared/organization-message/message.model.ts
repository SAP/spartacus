import { Type } from '@angular/core';
import { GlobalMessageType, Translatable } from '@spartacus/core';
import { Subject } from 'rxjs';
import { BaseMessageComponent } from './base-message.component';

export class MessageData<
  O extends MessageEventData = MessageEventData,
  T extends BaseMessageComponent = BaseMessageComponent
> {
  /**
   * The message contains the `translatable` message that is rendered
   * inside the message component.
   */
  message?: Translatable;

  /**
   * The type of message is used to render the style of the message.
   */
  type?: GlobalMessageType;

  /**
   * The timeout is used to remove the message component automatically
   * without any user interaction.
   */
  timeout?: number;

  /**
   * The (optional) component is rendered inside message component.
   *
   * If no specific component is given, the `NotificationMessageComponent` is used.
   */
  component?: Type<T>;

  /**
   * The event data subject can be used to publish and observe custom events.
   */
  events?: Subject<O>;
}

export interface MessageEventData {
  close?: boolean;
}
