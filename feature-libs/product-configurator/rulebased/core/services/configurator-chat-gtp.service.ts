/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ChatGtpBtpConnector } from '../connectors';
import { ChatGPT4 } from '../model/chat-gpt-4.model';
import { Observable } from 'rxjs';

/**
 * Configurator chat-gpt sample implementation
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorChatGtpService {
  constructor(protected connector: ChatGtpBtpConnector) {}

  private conversation: ChatGPT4.Message[] = [];

  public restartConversation() {
    this.conversation = [];
  }

  public ask(question: string): Observable<ChatGPT4.Message> {
    this.addQuestionToConversation(question);

    return this.connector
      .ask(this.conversation)
      .pipe(tap((message) => this.conversation.push(message)));
  }

  protected addQuestionToConversation(question: string) {
    const questionMessage = {
      role: ChatGPT4.Role.USER,
      content: question,
    };
    this.conversation.push(questionMessage);
  }
}
