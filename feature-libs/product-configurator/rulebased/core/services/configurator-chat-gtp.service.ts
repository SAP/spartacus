/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Product, ProductScope, ProductService } from '@spartacus/core';
import { ConfiguratorRouterExtractorService } from '@spartacus/product-configurator/common';
import { Observable, OperatorFunction, combineLatest, of } from 'rxjs';
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
  'If a value has a price, selecting it, will increase the total price  by its amount. '+
  'If a value has no price, it is already included in the base price. '+
  'The total price is th sum of the base price and all selected value prices.  ' +
  'The configuration state of the current group is provided along with the user messages in JSON format. ' +
  'The state of the other groups can be accessed by navigating to these groups. ' +
  'To complete a configuration navigate through each group and make selections for those attributes. ' +
  'To change values of attributes of previous groups, first navigate back to this group. '+
  // 'When responding to the user please make suggestions which values to select in natural language as well as in JSON format.' +
  // 'The JSON should follow this format {"selections": [{ "attribute_id": "string", "value_ids": ["string"] } ] }. ' +
  // 'The JSON should be given without any announcement at the end of the response. ' +
  'Please help the user with selecting the attribute values based on his wishes and needs. ' +
  'Please do not use any markdown syntax in your response.' +
  'Please only answer questions related to the product and the configuration and politely deny any other queries.';

type GtpGroupResponse = { groupId: string };

const FUNCTION_NAV_TO_GROUP: ChatGPT4.Function = {
  name: 'navigate-to-group',
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
  attribute_id: string;
  value_ids: [string];
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
          description: 'attribute and its values that shall be selected',
          required: ['attribute_id', 'value_ids'],
          type: 'object',
          properties: {
            attribute_id: {
              type: 'string',
              description: 'attribute id of the selection',
            },
            value_ids: {
              description:
                'list of value ids to be selected for this attribute',
              type: 'array',
              items: {
                description: 'value id of the attribute',
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
  configuration$: Observable<Configurator.Configuration> =
    this.configRouterExtractorService
      .extractRouterData()
      .pipe(
        switchMap((routerData) =>
          this.configuratorCommonsService.getConfiguration(routerData.owner)
        )
      );

  product$: Observable<Product> = this.configuration$.pipe(
    switchMap((config) =>
      this.productService.get(config.productCode, ProductScope.LIST)
    ),
    filter((product) => !!product) as OperatorFunction<
      Product | undefined,
      Product
    >
  );

  configWithProduct$ = combineLatest([this.configuration$, this.product$]);

  private conversation: ChatGPT4.Message[];
  private functions: ChatGPT4.Function[] = [
    FUNCTION_NAV_TO_GROUP,
    FUNCTION_SELECT_VALUES,
  ];

  constructor(
    protected connector: ChatGtpBtpConnector,
    protected mapper: ConfiguratorChatGtpMapperService,
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected configuratorGroupService: ConfiguratorGroupsService,
    protected productService: ProductService
  ) {}

  public initConversation(
    initialUserMessage: string
  ): Observable<ChatGPT4.Message> {
    this.conversation = [];
    this.addSystemMessage();
    return this.ask(initialUserMessage);
  }

  public ask(question: string): Observable<ChatGPT4.Message> {
    try {
      return this.configWithProduct$.pipe(
        take(1),
        switchMap((configWithProduct) => {
          this.addQuestionToConversation(question);
          return this.callChatConnector(
            configWithProduct[0],
            configWithProduct[1]
          ).pipe(
            map((response) => response.choices[0].message),
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
    config: Configurator.Configuration,
    product: Product
  ): Observable<ChatGPT4.Response> {
    const originalMessage = this.appendContextToCurrentMessage(config, product);
    return this.connector.ask(this.conversation, this.functions).pipe(
      tap(() => this.restoreOriginalMessageWithoutContext(originalMessage)),
      tap((response) => this.handleTokenLimit(response.usage)),
      switchMap((response) => this.handleFunctionCall(response, config))
    );
  }

  protected restoreOriginalMessageWithoutContext(
    originalMessage: ChatGPT4.Message
  ) {
    this.conversation.pop();
    this.conversation.push(originalMessage);
  }

  protected appendContextToCurrentMessage(
    config: Configurator.Configuration,
    product: Product
  ): ChatGPT4.Message {
    const currentMessage = this.conversation.pop();
    if (!currentMessage) {
      throw new Error('conversation may not be empty!');
    }
    const context = this.mapper.serializeConfiguration(config, product);
    const currentMessageWithContext = {
      ...currentMessage,
      content:
        currentMessage.content +
        '\ncurrent configuration in json format:\n' +
        context,
    };
    this.conversation.push(currentMessageWithContext);

    return currentMessage;
  }

  protected addQuestionToConversation(question: string) {
    const message: ChatGPT4.Message = {
      role: ChatGPT4.Role.USER,
      content: question,
    };
    this.conversation.push(message);
  }

  addFunctionResultToConversation(functionName: string) {
    let message: ChatGPT4.Message;
    message = {
      role: ChatGPT4.Role.FUNCTION,
      name: functionName,
      content: '',
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
      this.conversation.push(message);
      console.log(
        `GTP wants to call function ${message.function_call.name} with args ${message.function_call.arguments}`
      );
      switch (message.function_call.name) {
        case FUNCTION_NAV_TO_GROUP.name:
          this.storeCurrentGroupState(config);
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

  protected storeCurrentGroupState(config: Configurator.Configuration) {
    const lastMessage = this.conversation[this.conversation.length - 1];
    lastMessage.content =
      lastMessage.content +
      '\ncurrent configuration in json format:\n' +
      this.mapper.serializeConfiguration(config);
  }

  protected triggerGroupNavigation(
    functionCall: ChatGPT4.FunctionCall,
    config: Configurator.Configuration
  ): Observable<ChatGPT4.Response> {
    const arg: GtpGroupResponse = JSON.parse(functionCall.arguments);
    this.configuratorGroupService.navigateToGroup(config, arg.groupId);
    return this.configWithProduct$.pipe(
      filter(
        (configWithProduct) =>
          (configWithProduct[0].flatGroups.find(
            (group) => group.id === arg.groupId
          )?.attributes?.length ?? 0) > 0
      ),
      take(1),
      tap(() =>
        this.addFunctionResultToConversation(FUNCTION_NAV_TO_GROUP.name)
      ),
      switchMap((configWithProduct) =>
        this.callChatConnector(configWithProduct[0], configWithProduct[1])
      )
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
      let updates: GtpSelectionResponse = JSON.parse(functionCall.arguments);

      this.updateConfig(updates, config);
      const lastTimeStamp = config.timestamp;

      return this.configWithProduct$.pipe(
        // better would be to check that there are no pending updates
        // so we can also handle cases were the updates failed properly.
        filter(((configWithProduct) => configWithProduct[0].timestamp !== lastTimeStamp)),
        filter((configWithProduct) =>
          this.isLastUpdateApplied(updates, configWithProduct[0])
        ),
        filter((configWithProduct) => this.isPricingMerged(configWithProduct[0])),
        take(1),
        tap(() =>
          this.addFunctionResultToConversation(FUNCTION_SELECT_VALUES.name)
        ),
        switchMap((configWithProduct) =>
          this.callChatConnector(configWithProduct[0], configWithProduct[1])
        )
      );
    }
  }

  isPricingMerged(config: Configurator.Configuration): boolean {
    const pricingMerged = config.pricingMerged || !config.pricingEnabled;
    console.log('pricing merged=' +config.pricingMerged +' pricingEnabled='+config.pricingEnabled);
    return pricingMerged;
  }

  protected updateConfig(
    updates: GtpSelectionResponse,
    config: Configurator.Configuration
  ) {
    updates.selections.forEach((update) => {
      const attribute = this.findAttribute(update.attribute_id, config);
      if (!attribute) {
        console.log(
          'attribute not found in config, attr name=' + update.attribute_id
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
    update: GtpSelection
  ) {
    const values = this.calculateSelectedValues(update.value_ids, attribute);
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
    const selectedValueName = this.findValue(
      update.value_ids[0],
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

  protected isLastUpdateApplied(
    updates: GtpSelectionResponse,
    config: Configurator.Configuration
  ) {
    let currentValue;
    const lastUpdate = updates.selections[updates.selections.length - 1];
    if (lastUpdate) {
      const currentAttr = this.findAttribute(lastUpdate.attribute_id, config);
      if (currentAttr) {
        currentValue = this.findValue(lastUpdate.value_ids[0], currentAttr);
      }
    }
    const applied = currentValue?.selected ?? true;
    console.log(
      `last update is ${applied ? 'applied' : 'not yet applied'}`,
      lastUpdate
    );
    return applied;
  }
}
