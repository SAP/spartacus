import { Type } from '@angular/core';
import { GlobalMessageType, Translatable } from '@spartacus/core';

export class MessageComponentData {
  message?: Translatable;
  type?: GlobalMessageType;
  timeout?: number;
}

export interface Message {
  text?: Translatable;

  component?: Type<any>;
  data?: MessageComponentData;
}
