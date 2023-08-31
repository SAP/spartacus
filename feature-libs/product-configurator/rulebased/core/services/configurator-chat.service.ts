import { Injectable } from '@angular/core';
import { ConfiguratorChat } from '../model/chat.model';

/**
 * Configurator chat-gpt sample implementation
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorChatService {
  private conversation: ConfiguratorChat.ChatMessage[];
  public startSession() {
    this.conversation = [];
  }

  public ask(question: string): ConfiguratorChat.ChatMessage {
    const questionMessage = this.createQuestion(question);
    this.conversation.push(questionMessage);

    const response = {
      creationDate: new Date(),
      role: ConfiguratorChat.Role.ASSISTANT,
      content: 'your question was: ' + question,
    };
    this.conversation.push(response);

    return response;
  }

  protected createQuestion(question: string): ConfiguratorChat.ChatMessage {
    return {
      creationDate: new Date(),
      role: ConfiguratorChat.Role.USER,
      content: question,
    };
  }
}
