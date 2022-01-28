import { ActionReducerMap } from '@ngrx/store';

import { InjectionToken, Provider } from '@angular/core';
import { ChatBotState } from '../chat-bot-state';

export function getReducers(): ActionReducerMap<ChatBotState> {
  return { chatBot: (state) => state };
}

export const reducerToken: InjectionToken<ActionReducerMap<ChatBotState>> =
  new InjectionToken<ActionReducerMap<ChatBotState>>('ChatBotReducers');

export const reducerProvider: Provider = {
  provide: reducerToken,
  useFactory: getReducers,
};
