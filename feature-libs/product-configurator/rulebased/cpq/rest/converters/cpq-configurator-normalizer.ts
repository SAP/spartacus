/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Converter, TranslationService } from '@spartacus/core';
import { ConfiguratorModelUtils } from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { take } from 'rxjs/operators';
import { Cpq } from '../cpq.models';
import { CpqConfiguratorNormalizerUtilsService } from './cpq-configurator-normalizer-utils.service';

@Injectable()
export class CpqConfiguratorNormalizer
  implements Converter<Cpq.Configuration, Configurator.Configuration>
{
  constructor(
    protected cpqConfiguratorNormalizerUtilsService: CpqConfiguratorNormalizerUtilsService,
    protected translation: TranslationService
  ) {}

  convert(
    source: Cpq.Configuration,
    target?: Configurator.Configuration
  ): Configurator.Configuration {
    const resultTarget: Configurator.Configuration = {
      ...target,
      configId: '', //will later be populated with final value
      complete: !source.incompleteAttributes?.length,
      consistent:
        !source.invalidMessages?.length &&
        !source.failedValidations?.length &&
        !source.incompleteMessages?.length &&
        !source.errorMessages?.length,
      totalNumberOfIssues: this.generateTotalNumberOfIssues(source),
      productCode: source.productSystemId,
      priceSummary:
        this.cpqConfiguratorNormalizerUtilsService.convertPriceSummary(source),
      groups: [],
      flatGroups: [],
      owner: ConfiguratorModelUtils.createInitialOwner(),
      interactionState: {},
      errorMessages: this.generateErrorMessages(source),
      warningMessages: this.generateWarningMessages(source),
      pricingEnabled: true,
    };
    source.tabs?.forEach((tab) =>
      this.convertGroup(
        tab,
        source.attributes ?? [],
        source.currencyISOCode,
        resultTarget.groups,
        resultTarget.flatGroups
      )
    );

    if (!resultTarget.groups || resultTarget.groups.length === 0) {
      this.convertGenericGroup(
        source.attributes ?? [],
        source.incompleteAttributes ?? [],
        source.currencyISOCode,
        resultTarget.groups,
        resultTarget.flatGroups
      );
    }

    return resultTarget;
  }

  protected generateTotalNumberOfIssues(source: Cpq.Configuration): number {
    const numberOfIssues: number =
      (source.incompleteAttributes?.length ?? 0) +
      (source.incompleteMessages?.length ?? 0) +
      (source.invalidMessages?.length ?? 0) +
      (source.failedValidations?.length ?? 0) +
      (source.errorMessages?.length ?? 0);
    return numberOfIssues;
  }

  protected generateWarningMessages(source: Cpq.Configuration): string[] {
    let warnMsgs: string[] = [];
    warnMsgs = warnMsgs.concat(source.failedValidations ?? []);
    warnMsgs = warnMsgs.concat(source.incompleteMessages ?? []);
    return warnMsgs;
  }

  protected generateErrorMessages(source: Cpq.Configuration): string[] {
    let errorMsgs: string[] = [];
    errorMsgs = errorMsgs.concat(source.errorMessages ?? []);
    errorMsgs = errorMsgs.concat(source.invalidMessages ?? []);
    return errorMsgs;
  }

  protected convertGroup(
    source: Cpq.Tab,
    sourceAttributes: Cpq.Attribute[],
    currency: string,
    groupList: Configurator.Group[],
    flatGroupList: Configurator.Group[]
  ) {
    const attributes: Configurator.Attribute[] = [];
    if (source.isSelected) {
      sourceAttributes.forEach((sourceAttribute) =>
        this.convertAttribute(sourceAttribute, source.id, currency, attributes)
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

  protected convertGenericGroup(
    sourceAttributes: Cpq.Attribute[],
    incompleteAttributes: string[],
    currency: string,
    groupList: Configurator.Group[],
    flatGroupList: Configurator.Group[]
  ) {
    const attributes: Configurator.Attribute[] = [];
    sourceAttributes.forEach((sourceAttribute) =>
      this.convertAttribute(sourceAttribute, 1, currency, attributes)
    );
    const group: Configurator.Group = {
      id: '1',
      name: '_GEN',
      configurable: true,
      complete: incompleteAttributes.length === 0,
      consistent: true,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: attributes,
      subGroups: [],
    };

    this.translation
      .translate('configurator.group.general')
      .pipe(take(1))
      .subscribe((generalText) => (group.description = generalText));

    groupList.push(group);
    flatGroupList.push(group);
  }

  protected convertAttribute(
    sourceAttribute: Cpq.Attribute,
    groupId: number,
    currency: string,
    attributeList: Configurator.Attribute[]
  ): void {
    const attribute: Configurator.Attribute = {
      attrCode: sourceAttribute.stdAttrCode,
      name: sourceAttribute.pA_ID.toString(),
      description: sourceAttribute.description,
      label:
        this.cpqConfiguratorNormalizerUtilsService.convertAttributeLabel(
          sourceAttribute
        ),
      required: sourceAttribute.required,
      isLineItem: sourceAttribute.isLineItem,
      uiType: this.convertAttributeType(sourceAttribute),
      dataType:
        this.cpqConfiguratorNormalizerUtilsService.convertDataType(
          sourceAttribute
        ),
      quantity: Number(sourceAttribute.quantity),
      groupId: groupId.toString(),
      userInput: sourceAttribute.userInput,
      hasConflicts: sourceAttribute.hasConflict,
      selectedSingleValue: undefined,
      images: [],
      visible: true,
    };

    if (
      sourceAttribute.values &&
      sourceAttribute.displayAs !== Cpq.DisplayAs.INPUT
    ) {
      const values: Configurator.Value[] = [];
      sourceAttribute.values.forEach((value) =>
        this.convertValue(value, sourceAttribute, currency, values)
      );
      attribute.values = values;
      this.setSelectedSingleValue(attribute);
    }
    attribute.attributePriceTotal =
      this.cpqConfiguratorNormalizerUtilsService.calculateAttributePriceTotal(
        attribute,
        currency
      );
    this.compileAttributeIncomplete(attribute);
    attributeList.push(attribute);
  }

  protected setSelectedSingleValue(attribute: Configurator.Attribute) {
    const values = attribute.values;
    if (values) {
      const selectedValues = values
        .map((entry) => entry)
        .filter((entry) => entry.selected);
      if (selectedValues && selectedValues.length === 1) {
        attribute.selectedSingleValue = selectedValues[0].valueCode;
      }
    }
  }

  protected convertValueDisplay(
    sourceValue: Cpq.Value,
    sourceAttribute: Cpq.Attribute,
    value: Configurator.Value
  ): void {
    if (
      sourceAttribute.displayAs === Cpq.DisplayAs.DROPDOWN &&
      sourceValue.selected &&
      sourceValue.paV_ID === 0
    ) {
      this.translation
        .translate('configurator.attribute.dropDownSelectMsg')
        .pipe(take(1))
        .subscribe((text) => (value.valueDisplay = text));
    } else {
      value.valueDisplay = sourceValue.valueDisplay;
    }
  }

  protected convertValueCode(valueCode: number): string {
    return valueCode === 0
      ? Configurator.RetractValueCode
      : valueCode.toString();
  }

  protected convertValue(
    sourceValue: Cpq.Value,
    sourceAttribute: Cpq.Attribute,
    currency: string,
    values: Configurator.Value[]
  ): void {
    if (this.hasValueToBeIgnored(sourceAttribute, sourceValue)) {
      return;
    }
    const value: Configurator.Value = {
      valueCode: this.convertValueCode(sourceValue.paV_ID),
      name: sourceValue.valueCode,
      description: sourceValue.description,
      productSystemId: sourceValue.productSystemId,
      selected: sourceValue.selected,
      quantity: this.cpqConfiguratorNormalizerUtilsService.convertQuantity(
        sourceValue,
        sourceAttribute
      ),
      valuePrice: this.cpqConfiguratorNormalizerUtilsService.convertValuePrice(
        sourceValue,
        currency
      ),
      images: [],
    };

    this.convertValueDisplay(sourceValue, sourceAttribute, value);
    value.valuePriceTotal =
      this.cpqConfiguratorNormalizerUtilsService.calculateValuePriceTotal(
        value.quantity ?? 1,
        value.valuePrice
      );

    values.push(value);
  }

  protected convertAttributeType(
    sourceAttribute: Cpq.Attribute
  ): Configurator.UiType {
    const displayAs = sourceAttribute.displayAs;

    const displayAsProduct: boolean =
      sourceAttribute.values &&
      this.cpqConfiguratorNormalizerUtilsService.hasAnyProducts(
        sourceAttribute.values
      )
        ? true
        : false;
    const isEnabled: boolean = sourceAttribute.isEnabled ?? false;

    if (
      !isEnabled &&
      (displayAs === Cpq.DisplayAs.RADIO_BUTTON ||
        displayAs === Cpq.DisplayAs.DROPDOWN ||
        displayAs === Cpq.DisplayAs.CHECK_BOX ||
        displayAs === Cpq.DisplayAs.INPUT)
    ) {
      return Configurator.UiType.READ_ONLY;
    }

    return this.findUiTypeFromDisplayType(
      displayAs,
      displayAsProduct,
      sourceAttribute
    );
  }

  protected findUiTypeFromDisplayType(
    displayAs: number | undefined,
    displayAsProduct: boolean,
    sourceAttribute: Cpq.Attribute
  ): Configurator.UiType {
    let uiType: Configurator.UiType;
    switch (displayAs) {
      case Cpq.DisplayAs.RADIO_BUTTON: {
        uiType = displayAsProduct
          ? Configurator.UiType.RADIOBUTTON_PRODUCT
          : Configurator.UiType.RADIOBUTTON;
        break;
      }

      case Cpq.DisplayAs.DROPDOWN: {
        uiType = displayAsProduct
          ? Configurator.UiType.DROPDOWN_PRODUCT
          : Configurator.UiType.DROPDOWN;
        break;
      }

      case Cpq.DisplayAs.CHECK_BOX: {
        uiType = displayAsProduct
          ? Configurator.UiType.CHECKBOXLIST_PRODUCT
          : Configurator.UiType.CHECKBOXLIST;
        break;
      }

      case Cpq.DisplayAs.INPUT: {
        uiType =
          sourceAttribute.dataType === Cpq.DataType.INPUT_STRING
            ? Configurator.UiType.STRING
            : Configurator.UiType.NOT_IMPLEMENTED;
        break;
      }

      default: {
        uiType = Configurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }

  protected compileAttributeIncomplete(attribute: Configurator.Attribute) {
    //Default value for incomplete is false
    attribute.incomplete = false;

    switch (attribute.uiType) {
      case Configurator.UiType.RADIOBUTTON:
      case Configurator.UiType.RADIOBUTTON_PRODUCT:
      case Configurator.UiType.DROPDOWN:
      case Configurator.UiType.DROPDOWN_PRODUCT:
      case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
        if (
          !attribute.selectedSingleValue ||
          attribute.selectedSingleValue === Configurator.RetractValueCode
        ) {
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
          attribute.values?.find((value) => value.selected) !== undefined
            ? true
            : false;

        if (!isOneValueSelected) {
          attribute.incomplete = true;
        }
        break;
      }
    }
  }

  protected hasValueToBeIgnored(
    attribute: Cpq.Attribute,
    value: Cpq.Value
  ): boolean {
    const selectedValues = attribute.values
      ?.map((entry) => entry)
      .filter((entry) => entry.selected && entry.paV_ID !== 0);
    return (
      (attribute.displayAs === Cpq.DisplayAs.DROPDOWN &&
        attribute.required &&
        selectedValues &&
        selectedValues.length > 0 &&
        value.paV_ID === 0) ??
      false
    );
  }
}
