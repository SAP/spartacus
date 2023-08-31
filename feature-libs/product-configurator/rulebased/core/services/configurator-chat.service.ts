import { Injectable } from '@angular/core';
import { ChatGPT4 } from '../model/chat-gpt-4.model';

/**
 * Configurator chat-gpt sample implementation
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorChatService {
  private conversation: ChatGPT4.Message[];
  public startSession() {
    this.conversation = [];
  }

  public ask(question: string): ChatGPT4.Message {
    const questionMessage = this.createQuestion(question);
    this.conversation.push(questionMessage);

    const response = {
      role: ChatGPT4.Role.ASSISTANT,
      content: 'your question was: ' + question,
    };
    this.conversation.push(response);

    return response;
  }

  protected createQuestion(question: string): ChatGPT4.Message {
    return {
      role: ChatGPT4.Role.USER,
      content: question,
    };
  }
}
