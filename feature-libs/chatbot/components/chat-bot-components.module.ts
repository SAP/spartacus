import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { I18nModule, UrlModule, ProductModule } from '@spartacus/core';
import {
  OutletPosition,
  OutletService,
  IconModule,
  CarouselModule,
  MediaModule,
} from '@spartacus/storefront';
import { ChatBotComponent } from './chat-bot/chat-bot.component';
import { ChatBotRecommendationsComponent } from './chat-bot-recommendations/chat-bot-recommendations.component';
@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    CarouselModule,
    UrlModule,
    MediaModule,
    ProductModule
  ],
  declarations: [ChatBotComponent, ChatBotRecommendationsComponent],
  exports: [ChatBotComponent, ChatBotRecommendationsComponent],
})
export class ChatBotComponentsModule {}

export function chatbotFactory(
  componentFactoryResolver: ComponentFactoryResolver,
  outletService: OutletService
) {
  const result = () => {
    const factory =
      componentFactoryResolver.resolveComponentFactory(ChatBotComponent);
    outletService.add('cx-storefront', <any>factory, OutletPosition.AFTER);
  };
  return result;
}
