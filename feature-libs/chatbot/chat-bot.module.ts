import { NgModule } from '@angular/core';
import { ChatBotCoreModule } from '@spartacus/chatbot/core';
import { ChatBotComponentsModule } from '@spartacus/chatbot/components';

@NgModule({
  imports: [ChatBotCoreModule, ChatBotComponentsModule],
})
export class ChatBotModule {}
