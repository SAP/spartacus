import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

@NgModule({
  imports: [CommonModule, I18nModule, I18nModule],
  providers: [
    provideDefaultConfig({
      cmsComponents: {
        ChatBotComponent: {
          component: ChatBotComponent,
        },
      },
    }),
  ],
  declarations: [ChatBotComponent],
  exports: [ChatBotComponent],
})
export class ChatBotComponentsModule {}
