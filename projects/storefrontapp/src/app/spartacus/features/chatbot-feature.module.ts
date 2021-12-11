import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  chatBotTranslationChunksConfig,
  chatBotTranslations,
} from '@spartacus/chatbot/assets';
import { ChatBotRootModule, CHAT_BOT_FEATURE } from '@spartacus/chatbot/root';

@NgModule({
  imports: [ChatBotRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [CHAT_BOT_FEATURE]: {
          module: () =>
            import('@spartacus/chatbot').then((m) => m.ChatBotModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: chatBotTranslations,
        chunks: chatBotTranslationChunksConfig,
      },
    }),
  ],
})
export class ChatBotFeatureModule {}
