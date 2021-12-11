import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducerProvider, reducerToken } from './reducers/index';
import { effects } from './effects/index';
import { CHAT_BOT_FEATURE } from './chat-bot-state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(CHAT_BOT_FEATURE, reducerToken),
    EffectsModule.forFeature(effects),
  ],
  providers: [reducerProvider],
})
export class ChatBotStoreModule {}
