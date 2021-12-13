import { Component } from '@angular/core';
import { ChatBotConfig, ChatBotService } from '@spartacus/chatbot/core';

@Component({
  selector: 'cx-chat-bot',
  templateUrl: './chat-bot.component.html',
})
export class ChatBotComponent {
  constructor(
    protected config: ChatBotConfig,
    protected service: ChatBotService
  ) {}

  ngOnInit() {
    console.log(this.config.chatBot);
  }
}
