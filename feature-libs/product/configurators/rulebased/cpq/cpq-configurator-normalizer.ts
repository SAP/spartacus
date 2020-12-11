import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { Configurator } from './../core/model/configurator.model';
import { Cpq } from './cpq.models';

@Injectable()
export class CpqConfiguratorNormalizer
  implements Converter<Cpq.Configuration, Configurator.Configuration> {
  constructor() {}

  convert(
    source: Cpq.Configuration,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    const resultTarget: Configurator.Configuration = {
      ...target,
      complete:
        source.incompleteMessages.length === 0 &&
        source.incompleteAttributes.length === 0,
      consistent:
        source.invalidMessages.length === 0 &&
        source.failedValidations.length === 0 &&
        source.errorMessages.length === 0 &&
        source.conflictMessages.length === 0,
      totalNumberOfIssues: source.numberOfConflicts,
      productCode: source.productSystemId,
      groups: [],
      flatGroups: [],
    };
    source.tabs.forEach((tab) =>
      this.convertGroup(
        tab,
        source.attributes,
        resultTarget.groups,
        resultTarget.flatGroups
      )
    );
    return resultTarget;
  }

  convertGroup(
    source: Cpq.Tab,
    sourceAttributes: Cpq.Attribute[],
    groupList: Configurator.Group[],
    flatGroupList: Configurator.Group[]
  ) {
    const attributes: Configurator.Attribute[] = [];
    if (source.isSelected) {
      sourceAttributes.forEach((sourceAttribute) =>
        this.convertAttribute(sourceAttribute, source.id, attributes)
      );
    }

    const group: Configurator.Group = {
      id: source.id.toString(),
      name: source.name,
      description: source.displayName,
      configurable: true,
      complete: !source.isIncomplete,
      consistent: true,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: attributes,
      subGroups: [],
    };

    flatGroupList.push(group);
    groupList.push(group);
  }

  convertAttribute(
    sourceAttribute: Cpq.Attribute,
    groupId: number,
    attributeList: Configurator.Attribute[]
  ): void {
    const attribute: Configurator.Attribute = {
      attrCode: sourceAttribute.stdAttrCode,
      name: sourceAttribute.name,
      description: sourceAttribute.description,
      label: sourceAttribute.label,
      quantity: Number(sourceAttribute.quantity),
      required: sourceAttribute.required,
      isLineItem: sourceAttribute.isLineItem,
      uiType: this.convertAttributeType(
        sourceAttribute.displayAs,
        this.hasAnyProducts(sourceAttribute?.values)
      ),
      groupId: groupId.toString(),
      userInput: sourceAttribute.userInput,
      hasConflicts: sourceAttribute.hasConflict,
      selectedSingleValue: null,
      values: [],
      images: [],
    };

    if (sourceAttribute.values) {
      sourceAttribute.values.forEach((value) =>
        this.convertValue(value, attribute.values)
      );
      this.setSelectedSingleValue(attribute);
    }

    this.compileAttributeIncomplete(attribute);
    attributeList.push(attribute);
  }

  setSelectedSingleValue(attribute: Configurator.Attribute) {
    const selectedValues = attribute.values
      .map((entry) => entry)
      .filter((entry) => entry.selected);
    if (selectedValues && selectedValues.length === 1) {
      attribute.selectedSingleValue = selectedValues[0].valueCode;
    }
  }

  convertValue(sourceValue: Cpq.Value, values: Configurator.Value[]): void {
    const value: Configurator.Value = {
      valueCode: sourceValue.paV_ID.toString(),
      name: sourceValue.valueCode,
      valueDisplay: sourceValue.valueDisplay,
      description: sourceValue.description,
      productSystemId: sourceValue.productSystemId,
      selected: sourceValue.selected,
      images: [],
    };

    values.push(value);
  }

  convertAttributeType(
    displayAs: Cpq.DisplayAs,
    displayAsProduct = false
  ): Configurator.UiType {
    let uiType: Configurator.UiType;
    switch (displayAs) {
      case Cpq.DisplayAs.RADIO_BUTTON: {
        if (displayAsProduct) {
          uiType = Configurator.UiType.RADIOBUTTON_PRODUCT;
        } else {
          uiType = Configurator.UiType.RADIOBUTTON;
        }

        break;
      }

      case Cpq.DisplayAs.DROPDOWN: {
        if (displayAsProduct) {
          uiType = Configurator.UiType.DROPDOWN_PRODUCT;
        } else {
          uiType = Configurator.UiType.DROPDOWN;
        }

        break;
      }

      case Cpq.DisplayAs.CHECK_BOX: {
        if (displayAsProduct) {
          uiType = Configurator.UiType.CHECKBOXLIST_PRODUCT;
        } else {
          uiType = Configurator.UiType.CHECKBOXLIST;
        }

        break;
      }

      case Cpq.DisplayAs.INPUT: {
        uiType = Configurator.UiType.STRING;
        break;
      }

      case Cpq.DisplayAs.READ_ONLY: {
        uiType = Configurator.UiType.READ_ONLY;
        break;
      }

      default: {
        uiType = Configurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }

  compileAttributeIncomplete(attribute: Configurator.Attribute) {
    //Default value for incomplete is false
    attribute.incomplete = false;

    switch (attribute.uiType) {
      case Configurator.UiType.RADIOBUTTON:
      case Configurator.UiType.RADIOBUTTON_PRODUCT:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.DROPDOWN_PRODUCT:
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        if (!attribute.selectedSingleValue) {
          attribute.incomplete = true;
        }
        break;
      }
      case Configurator.UiType.NUMERIC:
      case Configurator.UiType.STRING: {
        if (!attribute.userInput) {
          attribute.incomplete = true;
        }
        break;
      }

      case Configurator.UiType.CHECKBOXLIST:
      case Configurator.UiType.CHECKBOXLIST_PRODUCT:
      case Configurator.UiType.CHECKBOX:
      case Configurator.UiType.MULTI_SELECTION_IMAGE: {
        const isOneValueSelected =
          attribute.values.find((value) => value.selected) !== undefined
            ? true
            : false;

        if (!isOneValueSelected) {
          attribute.incomplete = true;
        }
        break;
      }
    }
  }

  private hasAnyProducts(attributeValues: Cpq.Value[]): boolean {
    return attributeValues.some((value: Cpq.Value) => value?.productSystemId);
  }
}
