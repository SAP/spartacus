/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { ChatGtpBtpConnector } from '../connectors';
import { ConfiguratorCommonsService } from '../facade/configurator-commons.service';
import { ConfiguratorGroupsService } from '../facade/configurator-groups.service';
import { ChatGPT4 } from '../model/chat-gpt-4.model';
import { Configurator } from '../model/configurator.model';
import { ConfiguratorChatGtpMapperService } from './configurator-chat-gpt-mapper.service';

const START_MSG =
  'You are an assistant designed to help the user with configuring a product. ' +
  'A configuration consists of list of Groups, which have Attributes. Each attribute has a list of selectable Values.' +
  'Attributes for which property isSingleSelection is true can have only one value, while others can have multiple values.' +
  'The configuration state of the current group is provided along with the user messages in JSON format. ' +
  'The state of the other groups can be accessed by navigating to these groups. ' +
  'To complete a configuration navigate through each group and make selections for those attributes. ' +
  // 'When responding to the user please make suggestions which values to select in natural language as well as in JSON format.' +
  // 'The JSON should follow this format {"selections": [{ "attribute_id": "string", "value_ids": ["string"] } ] }. ' +
  // 'The JSON should be given without any announcement at the end of the response. ' +
  'Please help the user with selecting the attribute values based on his wishes and needs. ' +
  'Please only answer questions related to the product and the configuration and politely deny any other queries.';

type GtpGroupResponse = { groupId: string };

const FUNCTION_NAV_TO_GROUP: ChatGPT4.Function = {
  name: 'navaigate-to-group',
  description: 'Navigates to the given group',
  parameters: {
    type: 'object',
    properties: {
      groupId: {
        type: 'string',
        description: 'id of group to navigate to',
      },
    },
    required: ['groupId'],
  },
};

type GtpSelection = {
  id: string;
  values: [string];
};
type GtpSelectionResponse = {
  selections: [GtpSelection];
};

const FUNCTION_SELECT_VALUES: ChatGPT4.Function = {
  name: 'select-attribute-values',
  description: 'Applies the given values to the given attributes',
  parameters: {
    type: 'object',
    required: ['selections'],
    properties: {
      selections: {
        description: 'list of selections',
        type: 'array',
        items: {
          description: 'attribute',
          required: ['id', 'values'],
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'attribute id',
            },
            values: {
              description: 'list of value ids',
              type: 'array',
              items: {
                description: 'value id',
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
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
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorGroupService: ConfiguratorGroupsService
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
  private functions: ChatGPT4.Function[] = [
    FUNCTION_NAV_TO_GROUP,
    FUNCTION_SELECT_VALUES,
  ];

  public initConversation(
    initialUserMessage: string
  ): Observable<ChatGPT4.Message> {
    this.conversation = [];
    this.addSystemMessage();
    return this.ask(initialUserMessage);
  }

  public ask(question: string): Observable<ChatGPT4.Message> {
    try {
      return this.configuration$.pipe(
        take(1),
        switchMap((config) => {
          this.addQuestionToConversation(question, config);
          return this.callChatConnector(config).pipe(
            map((response) => response.choices[0].message),
            //map((message) => this.handleConfigChanges(message, config)),
            tap((message) => this.conversation.push(message))
          );
        })
      );
    } catch (error) {
      console.error(error);
      return of({
        role: ChatGPT4.Role.ASSISTANT,
        content:
          'Sorry I was not able to handle your request - please try again',
      });
    }
  }

  protected callChatConnector(
    config: Configurator.Configuration
  ): Observable<ChatGPT4.Response> {
    return this.connector.ask(this.conversation, this.functions).pipe(
      tap((response) => this.handleTokenLimit(response.usage)),
      switchMap((response) => this.handleFunctionCall(response, config))
    );
  }

  protected addQuestionToConversation(
    question: string,
    config?: Configurator.Configuration
  ) {
    const context = config
      ? '\ncurrent configuration in json format:\n' +
        this.mapper.serializeConfiguration(config)
      : '';

    const message: ChatGPT4.Message = {
      role: ChatGPT4.Role.USER,
      content: question + context,
    };

    this.conversation.push(message);
  }

  addFunctionResultToConversation(
    functionName: string,
    config?: Configurator.Configuration
  ) {
    const context = config
      ? '\ncurrent configuration in json format:\n' +
        this.mapper.serializeConfiguration(config)
      : 'the function was executed';

    let message: ChatGPT4.Message;
    message = {
      role: ChatGPT4.Role.FUNCTION,
      name: functionName,
      content: context,
    };

    this.conversation.push(message);
  }

  protected addSystemMessage() {
    const questionMessage = {
      role: ChatGPT4.Role.SYSTEM,
      content: START_MSG,
    };
    this.conversation.push(questionMessage);
  }

  protected handleFunctionCall(
    response: ChatGPT4.Response,
    config: Configurator.Configuration
  ): Observable<ChatGPT4.Response> {
    if (response.choices[0].finish_reason === ChatGPT4.FinishReason.CALL) {
      const message = response.choices[0].message;
      if (!message.function_call) {
        console.log(message);
        throw new Error('function call missing in message');
      }
      console.log('GTP wants to call a function', message.function_call);
      switch (message.function_call.name) {
        case FUNCTION_NAV_TO_GROUP.name:
          return this.triggerGroupNavigation(message.function_call, config);
        case FUNCTION_SELECT_VALUES.name:
          return this.handleConfigChanges(message.function_call, config);
        default:
          console.log(`function ${message.function_call} is unknown!`);
          return of(response);
      }
    }
    return of(response);
  }

  protected triggerGroupNavigation(
    functionCall: ChatGPT4.FunctionCall,
    config: Configurator.Configuration
  ): Observable<ChatGPT4.Response> {
    const arg: GtpGroupResponse = JSON.parse(functionCall.arguments);
    this.configuratorGroupService.navigateToGroup(config, arg.groupId);
    return this.configuration$.pipe(
      filter(
        (config) =>
          (config.flatGroups.find((group) => group.id === arg.groupId)
            ?.attributes?.length ?? 0) > 0
      ),
      take(1),
      tap((newConfig) =>
        this.addFunctionResultToConversation(
          FUNCTION_NAV_TO_GROUP.name,
          newConfig
        )
      ),
      switchMap((newConfig) => this.callChatConnector(newConfig))
    );
  }

  handleTokenLimit(usage: ChatGPT4.Usage): void {
    console.log('current token usage: ', usage);
    // very simple implementation, but should be sufficient in most cases
    if (usage.total_tokens > 8 * 1024 * 0.75) {
      console.log(
        'More than 75% of the 8K token limit consumed, dropping last message.'
      );
      this.conversation = [this.conversation[0]].concat(
        this.conversation.slice(2)
      );
    }
  }

  protected handleConfigChanges(
    functionCall: ChatGPT4.FunctionCall,
    config: Configurator.Configuration
  ): Observable<ChatGPT4.Response> {
    {
      let updates: GtpSelectionResponse;

      console.log(
        'attempting to parse json response from gtp \n' + functionCall.arguments
      );
      updates = JSON.parse(functionCall.arguments);
      this.updateConfig(updates, config);

      return this.configuration$.pipe(
        // better would be to check that there are no pending updates
        // so we can also handle cases were the updates failed properly.
        filter((config) => this.isLastUpdateApplied(updates, config)),
        take(1),
        tap((newConfig) =>
          this.addFunctionResultToConversation(
            FUNCTION_SELECT_VALUES.name,
            newConfig
          )
        ),
        switchMap((newConfig) => this.callChatConnector(newConfig))
      );
    }
  }

  protected updateConfig(
    updates: GtpSelectionResponse,
    config: Configurator.Configuration
  ) {
    console.log('applying config changes', updates);
    updates.selections.forEach((update) => {
      const attribute = this.findAttribute(update.id, config);
      if (!attribute) {
        console.log('attribute not found in config, attr name=' + update.id);
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
    update: GtpSelection
  ) {
    const values = this.calculateSelectedValues(update.values, attribute);
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
    update: GtpSelection
  ) {
    const selectedValueName = this.findValue(update.values[0], attribute)?.name;
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

  protected isLastUpdateApplied(
    updates: GtpSelectionResponse,
    config: Configurator.Configuration
  ) {
    let currentValue;
    const lastUpdate = updates.selections.pop();
    if (lastUpdate) {
      const currentAttr = this.findAttribute(lastUpdate.id, config);
      if (currentAttr) {
        currentValue = this.findValue(lastUpdate.values[0], currentAttr);
      }
    }
    return currentValue?.selected ?? true;
  }
}
