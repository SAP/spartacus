/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
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
      configId: source.configurationId ?? '', //if empty, will later be populated with final value
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
        this.getTabAttributes(source, tab),
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
    return (
      (source.incompleteAttributes?.length ?? 0) +
      (source.incompleteMessages?.length ?? 0) +
      (source.invalidMessages?.length ?? 0) +
      (source.failedValidations?.length ?? 0) +
      (source.errorMessages?.length ?? 0)
    );
  }

  protected generateWarningMessages(source: Cpq.Configuration): string[] {
    return [
      ...(source.failedValidations ?? []),
      ...(source.incompleteMessages ?? []),
    ];
  }

  protected generateErrorMessages(source: Cpq.Configuration): string[] {
    return [...(source.errorMessages ?? []), ...(source.invalidMessages ?? [])];
  }

  protected convertGroup(
    source: Cpq.Tab,
    sourceAttributes: Cpq.Attribute[],
    currency: string,
    groupList: Configurator.Group[],
    flatGroupList: Configurator.Group[]
  ) {
    const attributes: Configurator.Attribute[] = [];
    sourceAttributes.forEach((sourceAttribute) =>
      this.convertAttribute(sourceAttribute, source.id, currency, attributes)
    );

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

  protected isUITypeReadOnly(attribute: Configurator.Attribute): boolean {
    return attribute.uiType === Configurator.UiType.READ_ONLY;
  }

  protected hasRetractValue(sourceAttribute: Cpq.Attribute): boolean {
    return sourceAttribute.values?.some((value) => value.paV_ID === 0) ?? false;
  }

  protected isNoValueSelected(sourceAttribute: Cpq.Attribute): boolean {
    return !sourceAttribute.values?.filter((value) => value.selected).length;
  }

  protected setRetractValueDisplay(
    attribute: Configurator.Attribute,
    value: Configurator.Value
  ) {
    if (
      (attribute.uiType === Configurator.UiType.DROPDOWN ||
        attribute.uiType === Configurator.UiType.DROPDOWN_PRODUCT) &&
      value.selected
    ) {
      this.translation
        .translate('configurator.attribute.dropDownSelectMsg')
        .pipe(take(1))
        .subscribe((text) => (value.valueDisplay = text));
    } else {
      this.translation
        .translate('configurator.attribute.noOptionSelectedMsg')
        .pipe(take(1))
        .subscribe((text) => (value.valueDisplay = text));
    }
  }

  protected isSingleSelectionUiType(
    attribute: Configurator.Attribute
  ): boolean {
    return (
      attribute.uiType === Configurator.UiType.RADIOBUTTON ||
      attribute.uiType === Configurator.UiType.DROPDOWN ||
      attribute.uiType === Configurator.UiType.DROPDOWN_PRODUCT ||
      attribute.uiType === Configurator.UiType.RADIOBUTTON_PRODUCT
    );
  }

  protected isDropDownUiType(attribute: Configurator.Attribute): boolean {
    return (
      attribute.uiType === Configurator.UiType.DROPDOWN ||
      attribute.uiType === Configurator.UiType.DROPDOWN_PRODUCT
    );
  }

  /**
   * Determines whether a retract value needs to be added for the given attribute.
   * A retract value is added when the attribute is not required and is of a single
   * selection ui type (`RADIOBUTTON`, `DROPDOWN`, `DROPDOWN_PRODUCT` or
   * `RADIOBUTTON_PRODUCT`). It allows the user to deselect a previously selected value.
   *
   * @param attribute - converted attribute
   * @returns `true` - if a retract value needs to be added
   */
  protected isRetractValueNeeded(attribute: Configurator.Attribute): boolean {
    return !attribute.required && this.isSingleSelectionUiType(attribute);
  }

  /**
   * Determines whether a documentation value needs to be added for a required
   * drop-down list. This is the case when the attribute is required, is of a
   * drop-down ui type (`DROPDOWN` or `DROPDOWN_PRODUCT`) and no value is selected.
   * It documents in the UI that a value still needs to be picked, without acting
   * as a retract value.
   *
   * @param sourceAttribute - source CPQ attribute
   * @param attribute - converted attribute
   * @returns `true` - if a documentation value needs to be added
   */
  protected isRequiredDropDownDocumentationValueNeeded(
    sourceAttribute: Cpq.Attribute,
    attribute: Configurator.Attribute
  ): boolean {
    return (
      (attribute.required ?? false) &&
      this.isDropDownUiType(attribute) &&
      this.isNoValueSelected(sourceAttribute)
    );
  }

  /**
   * Adds a retract value for a not required single selection attribute, so that the
   * user can deselect a previously selected value.
   *
   * @param sourceAttribute - source CPQ attribute
   * @param attribute - converted attribute
   * @param values - list of converted values the retract value is added to
   */
  protected addRetractValue(
    sourceAttribute: Cpq.Attribute,
    attribute: Configurator.Attribute,
    values: Configurator.Value[]
  ) {
    if (
      !this.isUITypeReadOnly(attribute) &&
      !this.hasRetractValue(sourceAttribute) &&
      this.isRetractValueNeeded(attribute)
    ) {
      this.addGenericValue(sourceAttribute, attribute, values);
    }
  }

  /**
   * Adds a documentation value for a required drop-down list when no value is
   * selected. Although it looks the same in the UI as a retract value, it only
   * documents that a value still needs to be picked.
   *
   * @param sourceAttribute - source CPQ attribute
   * @param attribute - converted attribute
   * @param values - list of converted values the documentation value is added to
   */
  protected addDocumentationValue(
    sourceAttribute: Cpq.Attribute,
    attribute: Configurator.Attribute,
    values: Configurator.Value[]
  ) {
    if (
      !this.isUITypeReadOnly(attribute) &&
      !this.hasRetractValue(sourceAttribute) &&
      this.isRequiredDropDownDocumentationValueNeeded(
        sourceAttribute,
        attribute
      )
    ) {
      this.addGenericValue(sourceAttribute, attribute, values);
    }
  }

  /**
   * Creates and adds a generic value (using the retract value code)
   * to the given list of values and sets its display text.
   *
   * @param sourceAttribute - source CPQ attribute
   * @param attribute - converted attribute
   * @param values - list of converted values the value is added to
   */
  protected addGenericValue(
    sourceAttribute: Cpq.Attribute,
    attribute: Configurator.Attribute,
    values: Configurator.Value[]
  ) {
    const value: Configurator.Value = {
      valueCode: Configurator.RetractValueCode,
      selected: this.isNoValueSelected(sourceAttribute),
    };
    this.setRetractValueDisplay(attribute, value);
    values.push(value);
  }

  protected convertAttribute(
    sourceAttribute: Cpq.Attribute,
    groupId: number,
    currency: string,
    attributeList: Configurator.Attribute[]
  ): void {
    const attribute: Configurator.Attribute = {
      attrCode: sourceAttribute.stdAttrCode,
      name: this.mapPAId(sourceAttribute),
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
      this.addRetractValue(sourceAttribute, attribute, values);
      this.addDocumentationValue(sourceAttribute, attribute, values);
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

  /**
   * In case the CPQ API is called via REST, the attribute id is returned using field name pA_ID.
   * If we call CPQ via OCC the attribute is mapped to field name PA_ID.
   * This can't be changed easily and is related to the non-standard conform name 'pA_ID';
   * @param sourceAttribute source attribute
   * @returns value of PA_ID or pA_ID, depending on which field is filled.
   */
  protected mapPAId(sourceAttribute: Cpq.Attribute): string {
    return sourceAttribute.pA_ID
      ? sourceAttribute.pA_ID.toString()
      : (<any>sourceAttribute).PA_ID.toString();
  }

  protected setSelectedSingleValue(attribute: Configurator.Attribute) {
    const values = attribute.values;
    if (values) {
      const selectedValues = values.filter((entry) => entry.selected);
      if (selectedValues?.length === 1) {
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

    const displayAsProduct: boolean = !!(
      sourceAttribute.values &&
      this.cpqConfiguratorNormalizerUtilsService.hasAnyProducts(
        sourceAttribute.values
      )
    );
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
          attribute.values?.find((value) => value.selected) !== undefined;
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
    const selectedValues = attribute.values?.filter(
      (entry) => entry.selected && entry.paV_ID !== 0
    );
    return (
      (attribute.displayAs === Cpq.DisplayAs.DROPDOWN &&
        attribute.required &&
        selectedValues &&
        selectedValues.length > 0 &&
        value.paV_ID === 0) ??
      false
    );
  }

  protected getTabAttributes(
    source: Cpq.Configuration,
    tab: Cpq.Tab
  ): Cpq.Attribute[] {
    if (source.hasFullConfigurationState) {
      return tab.attributes ?? [];
    }
    return tab.isSelected ? (source.attributes ?? []) : [];
  }
}
