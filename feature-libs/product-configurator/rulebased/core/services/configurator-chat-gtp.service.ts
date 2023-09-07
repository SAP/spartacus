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
  'A configuration consists of list of Groups, which have Attributes. Each attribute has a list of selectable Values.' +
  'Attributes for which property isSingleSelection is true can have only one value, while others can have multiple values.' +
  'All objects are identified by property name.' +
  'When responding to the user please make suggestions which values to select in natural language as well as in JSON format.' +
  'The JSON should follow this format {"selections": [{ "attribute": { "id": "id", "values": ["id"] } }] }. ' +
  'The JSON should be given without any announcement at the end of the response. '+
  'Please only answer questions related to the product and the configuration and politely deny any other queries.';

type GtpUpdateResponse = {
  attribute: {
    id: string;
    values: [string];
  };
};

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
      tap((response) => this.handleTokenLimit(response.usage)),
      map((response) => response.choices[0].message)
    );
  }

  handleTokenLimit(usage: ChatGPT4.Usage): void {
    console.log('current token usage: ', usage);
    // very simple implementation, but should be sufficient in most cases
    if (usage.total_tokens > (8 * 1024 * 0.75)) {
      console.log(
        'More than 75% of the 8K token limit consumed, dropping last message.'
      );
      this.conversation = [this.conversation[0]].concat(
        this.conversation.slice(2)
      );
    }
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
        message.content = messageWithoutJson;
      }

      return message;
    }
  }

  protected updateConfig(json: string, config: Configurator.Configuration) {
    console.log('attempting to parse json response from gtp \n' + json);
    const updates: {
      selections: [GtpUpdateResponse];
    } = JSON.parse(json);
    console.log('applying config changes', updates);
    updates.selections.forEach((update) => {
      const attribute = this.findAttribute(update.attribute.id, config);
      if (!attribute) {
        console.log(
          'attribute not found in config, attr name=' + update.attribute.id
        );
        return;
      }
      if (this.mapper.isSingleValued(attribute.uiType)) {
        this.updateSingleValuedAttribute(config.owner.key, attribute, update);
      } else {
        this.updateMultiValuedAttribute(config.owner.key, attribute, update);
      }
    });
  }
  updateMultiValuedAttribute(
    owner: string,
    attribute: Configurator.Attribute,
    update: GtpUpdateResponse
  ) {
    const values = this.calculateSelectedValues(
      update.attribute.values,
      attribute
    );
    console.log(`updating attribute ${attribute.name} to these values`, values);
    this.configuratorCommonsService.updateConfiguration(
      owner,
      {
        ...attribute,
        values: values,
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }
  protected calculateSelectedValues(
    valueIds: [string],
    attribute: Configurator.Attribute
  ): Configurator.Value[] {
    const values: Configurator.Value[] = [];
    attribute.values?.forEach((value) => {
      const isSelected =
        (!!value.name && valueIds.includes(value.name)) ||
        (!!value.valueCode && valueIds.includes(value.valueCode)) ||
        (!!value.valueDisplay && valueIds.includes(value.valueDisplay));

      values.push({ ...value, selected: isSelected });
    });
    return values;
  }

  protected updateSingleValuedAttribute(
    owner: string,
    attribute: Configurator.Attribute,
    update: GtpUpdateResponse
  ) {
    const selectedValueName = this.findValue(
      update.attribute.values[0],
      attribute
    )?.name;
    console.log(
      `selecting ${selectedValueName} for attribute ${attribute.name}`
    );
    this.configuratorCommonsService.updateConfiguration(
      owner,
      {
        ...attribute,
        selectedSingleValue: selectedValueName,
      },
      Configurator.UpdateType.ATTRIBUTE
    );
  }

  protected findValue(
    valueName: string,
    attribute: Configurator.Attribute
  ): Configurator.Value | undefined {
    const value = attribute.values?.find(
      (value) => value.name === valueName || value.valueDisplay === valueName
    );
    return value;
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
