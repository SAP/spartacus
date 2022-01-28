import { NgModule } from '@angular/core';
import {
  CmsConfig,
  // provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
// import { defaultChatBotLayoutConfig } from './config/default-chat-bot-layout-config';
import { CHAT_BOT_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultChatBotComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [CHAT_BOT_FEATURE]: {
        cmsComponents: ['ChatBotComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  declarations: [],
  providers: [
    // provideDefaultConfig(defaultChatBotLayoutConfig),
    provideDefaultConfigFactory(defaultChatBotComponentsConfig),
  ],
})
export class ChatBotRootModule {}
