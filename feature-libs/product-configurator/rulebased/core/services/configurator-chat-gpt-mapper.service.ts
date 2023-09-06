/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { ChatGPT4 } from '../model/chat-gpt-4.model';
import { Configurator } from '../model/configurator.model';
const multiValuedUiTypes: Configurator.UiType[] = [
  Configurator.UiType.CHECKBOXLIST,
  Configurator.UiType.CHECKBOXLIST_PRODUCT,
  Configurator.UiType.MULTI_SELECTION_IMAGE,
  Configurator.UiType.LISTBOX_MULTI,
];
/**
 * Configurator chat-gpt sample implementation
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorChatGtpMapperService {
  constructor() {}

  serializeConfiguration(config: Configurator.Configuration): string {
    // filter configuration object to relevant properties and sub-objects
    /**const simplified = JSON.stringify(config.flatGroups, [
      'flatGroups',
      'attributes',
      'name',
      'description',
      'id',
      'values',
      'value',
      'valueDisplay',
      'valuePrice',
      'label',
      'uiType',
    ]);**/
    const simplified: ChatGPT4.Group[] = [];
    config.flatGroups.forEach((group) => simplified.push(this.mapGroup(group)));
    console.log('Config context for GTP:', { groups: simplified });
    return JSON.stringify({ groups: simplified });
  }

  protected mapGroup(group: Configurator.Group): ChatGPT4.Group {
    const gtpGroup: ChatGPT4.Group = {
      id: group.name ?? group.id,
      name: group.description,
      attributes: [],
    };
    group.attributes?.forEach((attribute) => {
      if (!!attribute.visible) {
        gtpGroup.attributes.push(this.mapAttribute(attribute));
      }
    });
    return gtpGroup;
  }
  protected mapAttribute(
    attribute: Configurator.Attribute
  ): ChatGPT4.Attribute {
    const gtpAttribute: ChatGPT4.Attribute = {
      id: attribute.name,
      name: attribute.label,
      isSingleSelection: this.isSingleValued(attribute.uiType),
      isMandatory: attribute.required ?? false,
      isReadOnly: attribute.uiType === Configurator.UiType.READ_ONLY,
      values: [],
    };
    if (attribute.description) {
      gtpAttribute.description = attribute.description;
    }
    attribute.values?.forEach((value) =>
      gtpAttribute.values.push(this.mapValue(value))
    );
    return gtpAttribute;
  }

  public isSingleValued(uiType?: Configurator.UiType): boolean {
    return uiType ? !multiValuedUiTypes.includes(uiType) : true;
  }

  protected mapValue(value: Configurator.Value): ChatGPT4.Value {
    const gtpValue: ChatGPT4.Value = {
      id: value.name ?? value.valueCode,
      name: value.valueDisplay,
      isSelected: value.selected ?? false,
    };
    if (value.description) {
      gtpValue.description = value.description;
    }
    if (value.valuePrice?.formattedValue) {
      gtpValue.price = value.valuePrice?.formattedValue;
    }
    return gtpValue;
  }
}
