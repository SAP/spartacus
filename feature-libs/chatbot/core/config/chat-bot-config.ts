import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ChatBotConfig {
  chatBot?: {
    botName: string;
    botAvatar: string;
    autoOpen: boolean;
    messagesDelay: number;
  };
}

declare module '@spartacus/core' {
  interface Config extends ChatBotConfig {}
}
