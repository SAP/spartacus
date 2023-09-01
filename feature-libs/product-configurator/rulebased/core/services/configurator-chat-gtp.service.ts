/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ChatGtpBtpConnector } from '../connectors';
import { ChatGPT4 } from '../model/chat-gpt-4.model';
import { Observable } from 'rxjs';
import { ConfiguratorCommonsService } from '../facade/configurator-commons.service';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorChatGtpMapperService } from './configurator-chat-gpt-mapper.service';

const START_MSG =
  'You are an assistant designed to help with configuring a product based on the users wishes and needs. ' +
  'The current configuration state is provided along with the user messages in JSON format. ' +
  'A configuration consists of attributes with a list of values for each attribute Attributes and values are identified by the name property.' +
  'For each attribute one value can be selected.' +
  'When responding to the user please make suggestions which values to choose in natural language.'; //as well as json format.';

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
  private conversation: ChatGPT4.Message[];

  public initConversation(
    initialUserMessage: string
  ): Observable<ChatGPT4.Message> {
    this.conversation = [];
    this.addSystemMessage();
    return this.ask(initialUserMessage);
  }

  public ask(question: string): Observable<ChatGPT4.Message> {
    return this.configuration$.pipe(
      take(1),
      switchMap((config) => {
        const context = this.mapper.serializeConfiguration(config);
        return this.callChatConnector(question, context);
      })
    );
  }

  private callChatConnector(question: string, context?: string) {
    this.addQuestionToConversation(question, context);
    return this.connector.ask(this.conversation).pipe(
      tap((response) => console.log(response.usage)),
      map((response) => response.choices[0].message),
      tap((message) => this.conversation.push(message))
    );
  }

  protected addQuestionToConversation(question: string, context?: string) {
    const questionMessage = {
      role: ChatGPT4.Role.USER,
      content: question + '\ncurrent configuration in json format:\n' + context,
    };
    this.conversation.push(questionMessage);
  }

  protected addSystemMessage() {
    const questionMessage = {
      role: ChatGPT4.Role.SYSTEM,
      content: START_MSG,
    };
    this.conversation.push(questionMessage);
  }
}
