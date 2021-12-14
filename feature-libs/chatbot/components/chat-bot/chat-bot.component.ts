import { Component, OnInit } from '@angular/core';
import { ChatBotConfig, ChatBotService } from '@spartacus/chatbot/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { defaultChatBotConfig } from '../../core/config/default-chat-bot-config';
@Component({
  selector: 'cx-chat-bot',
  templateUrl: './chat-bot.component.html',
})
export class ChatBotComponent implements OnInit {
  constructor(
    protected config: ChatBotConfig,
    protected service: ChatBotService
  ) {}

  TEMP_CONFIG = defaultChatBotConfig; // TODO: Remove and inject proper config
  closeIcon = ICON_TYPE.CLOSE;

  /**
   * Detemines if chatbot is in open state.
   */
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    console.log(this.config.chatBot); // TODO: Config is not visible inside component
  }

  conversation$ = this.service.conversation$;
  options$ = this.service.options$;
}
