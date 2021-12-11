import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultChatBotConfig } from './config/default-chat-bot-config';
import { ChatBotStoreModule } from './store/chat-bot-store.module';

@NgModule({
  imports: [ChatBotStoreModule],
  providers: [provideDefaultConfig(defaultChatBotConfig)],
})
export class ChatBotCoreModule {}
