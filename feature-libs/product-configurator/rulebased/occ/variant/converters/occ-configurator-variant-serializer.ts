/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { OccConfigurator } from '../variant-configurator-occ.models';
import { Configurator } from './../../../core/model/configurator.model';

@Injectable({ providedIn: 'root' })
export class OccConfiguratorVariantSerializer
  implements
    Converter<Configurator.Configuration, OccConfigurator.Configuration>
{
  /**
   * @deprecated since 6.2
   */
  static readonly RETRACT_VALUE_CODE = '###RETRACT_VALUE_CODE###';

  convert(
    source: Configurator.Configuration,
    target?: OccConfigurator.Configuration
  ): OccConfigurator.Configuration {
    const resultGroups: OccConfigurator.Group[] = [];
    source.groups.forEach((group) => this.convertGroup(group, resultGroups));

    const resultTarget: OccConfigurator.Configuration = {
      ...target,
      configId: source.configId,
      rootProduct: source.productCode,
      complete: source.complete,
      groups: resultGroups,
    };

    return resultTarget;
  }

  convertGroup(source: Configurator.Group, occGroups: OccConfigurator.Group[]) {
    const resultSubGroups: OccConfigurator.Group[] = [];
    const resultAttributes: OccConfigurator.Attribute[] = [];

    if (source.attributes) {
      source.attributes.forEach((attribute) =>
        this.convertAttribute(attribute, resultAttributes)
      );
    }
    if (source.subGroups) {
      source.subGroups.forEach((subGroup) =>
        this.convertGroup(subGroup, resultSubGroups)
      );
    }

    const group: OccConfigurator.Group = {
      name: source.name,
      id: source.id,
      configurable: source.configurable,
      groupType: this.convertGroupType(
        source.groupType ?? Configurator.GroupType.ATTRIBUTE_GROUP
      ),
      description: source.description,
      attributes: resultAttributes,
      subGroups: resultSubGroups,
    };

    occGroups.push(group);
  }

  protected isRetractValue(attribute: Configurator.Attribute): boolean {
    return attribute.selectedSingleValue === Configurator.RetractValueCode;
  }

  protected getRetractedValue(
    attribute: Configurator.Attribute
  ): string | undefined {
    return attribute.values?.find((value) => value.selected)?.valueCode;
  }

  protected retractValue(
    attribute: Configurator.Attribute,
    targetAttribute: OccConfigurator.Attribute
  ) {
    if (!this.isRetractValue(attribute)) {
      targetAttribute.value = attribute.selectedSingleValue;
    } else {
      targetAttribute.value = this.getRetractedValue(attribute);
      targetAttribute.retractTriggered = true;
    }
  }

  convertAttribute(
    attribute: Configurator.Attribute,
    occAttributes: OccConfigurator.Attribute[]
  ): void {
    const uiType = attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED;
    const targetAttribute: OccConfigurator.Attribute = {
      key: attribute.name,
      name: attribute.name,
      langDepName: attribute.label,
      required: attribute.required,
      retractTriggered: attribute.retractTriggered,
      type: this.convertCharacteristicType(uiType),
    };
    const singleValueTypes = [
      Configurator.UiType.RADIOBUTTON,
      Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT,
      Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT,
      Configurator.UiType.DROPDOWN,
      Configurator.UiType.SINGLE_SELECTION_IMAGE,
    ];

    const multiValueTypes = [
      Configurator.UiType.CHECKBOXLIST,
      Configurator.UiType.CHECKBOX,
      Configurator.UiType.MULTI_SELECTION_IMAGE,
    ];

    const inputTypesSetValue = [
      Configurator.UiType.STRING,
      Configurator.UiType.SAP_DATE,
    ];

    const inputTypesSetFormattedValue = [Configurator.UiType.NUMERIC];

    if (singleValueTypes.includes(uiType)) {
      this.retractValue(attribute, targetAttribute);
    } else if (inputTypesSetValue.includes(uiType)) {
      targetAttribute.value = attribute.userInput;
    } else if (inputTypesSetFormattedValue.includes(uiType)) {
      targetAttribute.formattedValue = attribute.userInput;
    } else if (multiValueTypes.includes(uiType)) {
      const domainValues: OccConfigurator.Value[] = [];
      if (attribute.values) {
        attribute.values.forEach((value) => {
          this.convertValue(value, domainValues);
        });
      }
      targetAttribute.domainValues = domainValues;
    }

    occAttributes.push(targetAttribute);
  }

  convertValue(value: Configurator.Value, values: OccConfigurator.Value[]) {
    values.push({
      key: value.valueCode,
      langDepName: value.valueDisplay,
      name: value.name,
      selected: value.selected,
    });
  }

  convertCharacteristicType(type: Configurator.UiType): OccConfigurator.UiType {
    const singleValueTypes = [
      Configurator.UiType.RADIOBUTTON,
      Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT,
      Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT,
      Configurator.UiType.DROPDOWN,
      Configurator.UiType.SINGLE_SELECTION_IMAGE,
    ];

    if (singleValueTypes.includes(type)) {
      return this.convertCharacteristicTypeSingleValue(type);
    } else {
      return this.convertCharacteristicTypeMultiValueAndInput(type);
    }
  }

  protected convertCharacteristicTypeSingleValue(
    type: Configurator.UiType
  ): OccConfigurator.UiType {
    let uiType: OccConfigurator.UiType;
    switch (type) {
      case Configurator.UiType.RADIOBUTTON: {
        uiType = OccConfigurator.UiType.RADIO_BUTTON;
        break;
      }
      case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT: {
        uiType = OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT;
        break;
      }
      case Configurator.UiType.DROPDOWN: {
        uiType = OccConfigurator.UiType.DROPDOWN;
        break;
      }
      case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT: {
        uiType = OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
        break;
      }
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        uiType = OccConfigurator.UiType.SINGLE_SELECTION_IMAGE;
        break;
      }
      default: {
        uiType = OccConfigurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }

  protected convertCharacteristicTypeMultiValueAndInput(
    type: Configurator.UiType
  ): OccConfigurator.UiType {
    let uiType: OccConfigurator.UiType;
    switch (type) {
      case Configurator.UiType.STRING: {
        uiType = OccConfigurator.UiType.STRING;
        break;
      }
      case Configurator.UiType.NUMERIC: {
        uiType = OccConfigurator.UiType.NUMERIC;
        break;
      }
      case Configurator.UiType.SAP_DATE: {
        uiType = OccConfigurator.UiType.SAP_DATE;
        break;
      }
      case Configurator.UiType.CHECKBOX: {
        uiType = OccConfigurator.UiType.CHECK_BOX;
        break;
      }
      case Configurator.UiType.CHECKBOXLIST: {
        uiType = OccConfigurator.UiType.CHECK_BOX_LIST;
        break;
      }
      case Configurator.UiType.MULTI_SELECTION_IMAGE: {
        uiType = OccConfigurator.UiType.MULTI_SELECTION_IMAGE;
        break;
      }
      default: {
        uiType = OccConfigurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }

  convertGroupType(
    groupType: Configurator.GroupType
  ): OccConfigurator.GroupType {
    switch (groupType) {
      case Configurator.GroupType.ATTRIBUTE_GROUP:
        return OccConfigurator.GroupType.CSTIC_GROUP;
      case Configurator.GroupType.SUB_ITEM_GROUP:
        return OccConfigurator.GroupType.INSTANCE;
      case Configurator.GroupType.CONFLICT_GROUP:
        return OccConfigurator.GroupType.CONFLICT;
      case Configurator.GroupType.CONFLICT_HEADER_GROUP:
        return OccConfigurator.GroupType.CONFLICT_HEADER;
    }
  }
}
