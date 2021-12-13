import { CommonModule } from '@angular/common';
import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { OutletPosition, OutletService } from '@spartacus/storefront';
import { ChatBotComponent } from './chat-bot/chat-bot.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ChatBotComponent],
  exports: [ChatBotComponent],
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
