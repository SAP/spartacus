import { ComponentFactoryResolver, NgModule } from '@angular/core';
import {
  CmsConfig,
  I18nConfig,
  MODULE_INITIALIZER,
  provideConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  chatBotTranslationChunksConfig,
  chatBotTranslations,
} from '@spartacus/chatbot/assets';
import { ChatBotRootModule, CHAT_BOT_FEATURE } from '@spartacus/chatbot/root';
import { chatbotFactory } from '@spartacus/chatbot/components';
import { OutletService } from '@spartacus/storefront';
import { defaultChatBotConfig } from '@spartacus/chatbot/core';

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
    {
      provide: MODULE_INITIALIZER,
      useFactory: chatbotFactory,
      deps: [ComponentFactoryResolver, OutletService],
      multi: true,
    },
    provideDefaultConfig(defaultChatBotConfig),
  ],
})
export class ChatBotFeatureModule {}
