/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { switchMap, take, tap } from 'rxjs/operators';
import { ChatGtpBtpConnector } from '../connectors';
import { ChatGPT4 } from '../model/chat-gpt-4.model';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../facade/configurator-commons.service';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorChatGtpMapperService } from './configurator-chat-gpt-mapper.service';

/**
 * Configurator chat-gpt sample implementation
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorChatGtpService {
  constructor(
    protected connector: ChatGtpBtpConnector,
    protected mapper: ConfiguratorChatGtpMapperService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService
  ) {}

  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        )
      );

  private conversation: ChatGPT4.Message[] = [];

  public restartConversation() {
    this.conversation = [];
  }

  public ask(question: string): Observable<ChatGPT4.Message> {
    return this.configuration$.pipe(
      take(1),
      switchMap((config) => {
        const context = this.mapper.serializeConfiguration(config);
        console.log(context);
        this.addQuestionToConversation(question);

        return this.connector
          .ask(this.conversation)
          .pipe(tap((message) => this.conversation.push(message)));
      })
    );
  }

  protected addQuestionToConversation(question: string) {
    const questionMessage = {
      role: ChatGPT4.Role.USER,
      content: question,
    };
    this.conversation.push(questionMessage);
  }
}
