import { Component } from '@angular/core';
import { ChatBotConfig, ChatBotService } from '@spartacus/chatbot/core';
import { ICON_TYPE } from '@spartacus/storefront';
@Component({
  selector: 'cx-chat-bot',
  templateUrl: './chat-bot.component.html',
})
export class ChatBotComponent {
  constructor(
    protected chatBotConfig: ChatBotConfig,
    protected service: ChatBotService
  ) {}

  config = this.chatBotConfig.chatBot;

  closeIcon = ICON_TYPE.CLOSE;

  /**
   * Detemines if chatbot is in open state.
   */
  isOpen = this.config.autoOpen;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  conversation$ = this.service.conversation$;
  options$ = this.service.options$;
}
