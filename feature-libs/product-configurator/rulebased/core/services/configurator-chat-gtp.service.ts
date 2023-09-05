/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { ChatGtpBtpConnector } from '../connectors';
import { ConfiguratorCommonsService } from '../facade/configurator-commons.service';
import { ChatGPT4 } from '../model/chat-gpt-4.model';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorChatGtpMapperService } from './configurator-chat-gpt-mapper.service';

const START_MSG =
  'You are an assistant designed to help with configuring a product based on the users wishes and needs. ' +
  'The current configuration state is provided along with the user messages in JSON format. ' +
  'A configuration consists of list of Attributes. Each attribute is part of one Group and one Value can be selected.' +
  'Groups are identified by property description. Attributes are identified by property label. Values are identified by property valueDisplay.' +
  'When responding to the user please make suggestions which values to choose in natural language as well as in JSON format.' +
  'The JSON should follow this format {"selections": [{ "attribute": { "name": name; "value": name } }]}". The JSON should be given at the end of the response starting with ##JSON##.' +
  'Please only answer questions related to the product and the configuration and politely deny any other queries.'; //as well as json format.';

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
        this.addQuestionToConversation(question, context);
        return this.callChatConnector().pipe(
          map((message) => this.handleConfigChanges(message, config)),
          tap((message) => this.conversation.push(message))
        );
      })
    );
  }

  protected callChatConnector() {
    return this.connector.ask(this.conversation).pipe(
      tap((response) => console.log('Usage Data:', response.usage)),
      map((response) => response.choices[0].message)
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

  protected handleConfigChanges(
    message: ChatGPT4.Message,
    config: Configurator.Configuration
  ): ChatGPT4.Message {
    {
      const jsonStart = message.content.indexOf('{');
      const jsonEnd = message.content.lastIndexOf('}');
      if (jsonStart >= 0 && jsonEnd >= 0) {
        const jsonStr = message.content.slice(jsonStart, jsonEnd + 1);
        try {
          this.updateConfig(jsonStr, config);
        } catch (error) {
          console.error('failed to apply config changes', error);
        }
        const messageWithoutJson =
          message.content.slice(0, jsonStart) +
          message.content.slice(jsonEnd + 1);
        message.content = messageWithoutJson.replace(/```/g, '').replace(/##JSON##/g,'');
      }

      return message;
    }
  }

  protected updateConfig(json: string, config: Configurator.Configuration) {
    console.log('attempting to parse json response from gtp \n' + json);
    const updates: {
      selections: [{ attribute: { name: string; value: string } }];
    } = JSON.parse(json);
    console.log('applying config changes', updates);
    updates.selections.forEach((update) => {
      const attribute = this.findAttribute(update.attribute.name, config);
      if (!attribute) {
        console.log(
          'attribute not found in config, attr name=' + update.attribute.name
        );
        return;
      }
      console.log('updating attribute', attribute);
      if (attribute.uiType === Configurator.UiType.CHECKBOXLIST) {
        console.log('updating multi valued attributes not ye supported...');
        return;
      }
      this.configuratorCommonsService.updateConfiguration(
        config.owner.key,
        {
          ...attribute,
          selectedSingleValue: this.findValue(
            update.attribute.value,
            attribute
          ),
        },
        Configurator.UpdateType.ATTRIBUTE
      );
    });
  }
  protected findValue(
    valueName: string,
    attribute: Configurator.Attribute
  ): string {
    const value = attribute.values?.find(
      (value) => value.name === valueName || value.valueDisplay === valueName
    );
    return value?.name ? value.name : valueName;
  }
  protected findAttribute(
    name: string,
    config: Configurator.Configuration
  ): Configurator.Attribute | undefined {
    return config.flatGroups
      .flatMap((group) => group.attributes)
      .find(
        (attribute) => attribute?.name === name || attribute?.label === name
      );
  }
}
