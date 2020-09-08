import { Type } from '@angular/core';
import { GlobalMessageType, Translatable } from '@spartacus/core';

export class MessageComponentData {
  message?: Translatable;
  type?: GlobalMessageType;
}

export interface Message {
  text?: Translatable;
  type?: GlobalMessageType;
  timeout?: number;

  component?: Type<any>;
  data?: MessageComponentData;
}
