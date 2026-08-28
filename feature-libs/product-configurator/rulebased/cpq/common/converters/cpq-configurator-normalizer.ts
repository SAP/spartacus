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

  /**
   * Converts a CPQ configuration to the configurator-independent model.
   *
   * @param source - CPQ configuration
   * @param target - optional target configuration to be filled
   */
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
      messages: this.convertMessages(source.messages),
      hasFullConfigurationState: source.hasFullConfigurationState,
      pricingEnabled: true,
    };

    source.tabs?.forEach((tab) =>
      this.convertGroup(
        tab,
        this.getTabAttributes(source, tab),
        source.currencyISOCode,
        resultTarget.groups,
        resultTarget.flatGroups,
        source.sapContainers
      )
    );

    if (!resultTarget.groups || resultTarget.groups.length === 0) {
      this.convertGenericGroup(
        source.attributes ?? [],
        source.incompleteAttributes ?? [],
        source.currencyISOCode,
        resultTarget.groups,
        resultTarget.flatGroups,
        source.sapContainers
      );
    }

    return resultTarget;
  }

  protected generateTotalNumberOfIssues(source: Cpq.Configuration): number {
    return this.cpqConfiguratorNormalizerUtilsService.calculateTotalNumberOfIssues(
      source
    );
  }

  /**
   * Collects warning messages from failed validations and incomplete messages.
   *
   * @param source - CPQ configuration
   * @returns Warning messages
   */
  protected generateWarningMessages(source: Cpq.Configuration): string[] {
    return [
      ...(source.failedValidations ?? []),
      ...(source.incompleteMessages ?? []),
    ];
  }

  /**
   * Collects error messages from error and invalid messages.   *
   *
   * @param source - CPQ configuration
   * @returns Error messages
   */
  protected generateErrorMessages(source: Cpq.Configuration): string[] {
    return [...(source.errorMessages ?? []), ...(source.invalidMessages ?? [])];
  }

  protected convertGroup(
    source: Cpq.Tab,
    sourceAttributes: Cpq.Attribute[],
    currency: string,
    groupList: Configurator.Group[],
    flatGroupList: Configurator.Group[],
    containers?: Cpq.Container[],
    containerRowId?: string,
    parentRowGroupId?: string
  ) {
    const groupId = this.createTabGroupId(source.id, parentRowGroupId);
    const attributes: Configurator.Attribute[] = [];
    sourceAttributes.forEach((sourceAttribute) =>
      this.convertAttribute(
        sourceAttribute,
        source.id,
        currency,
        attributes,
        containerRowId,
        parentRowGroupId
      )
    );

    const group: Configurator.Group = {
      id: groupId,
      name: source.name,
      description: source.displayName,
      configurable: true,
      complete: !source.isIncomplete,
      consistent: true,
      groupType: Configurator.GroupType.ATTRIBUTE_GROUP,
      attributes: attributes,
      subGroups: [],
    };

    // Register the group before attaching its containers, so that the tabs of a
    // nested configuration follow their parent tab in the flat group list.
    flatGroupList.push(group);
    groupList.push(group);

    this.attachContainers(group, containers, currency, flatGroupList);
  }

  /**
   * Builds the group ID of a configuration tab. Tabs of a nested (container row)
   * configuration are prefixed with the ID of their row group, because CPQ numbers
   * the tabs of every configuration independently. Without the prefix a nested tab
   * would carry the same ID as a tab of the root configuration, and all ID based
   * group lookups would resolve to the root tab.
   *
   * @param tabId - CPQ tab ID
   * @param parentRowGroupId - ID of the container row group, for nested tabs only
   * @returns Group ID of the tab
   */
  protected createTabGroupId(tabId: number, parentRowGroupId?: string): string {
    return parentRowGroupId ? `${parentRowGroupId}@${tabId}` : tabId.toString();
  }

  protected convertGenericGroup(
    sourceAttributes: Cpq.Attribute[],
    incompleteAttributes: string[],
    currency: string,
    groupList: Configurator.Group[],
    flatGroupList: Configurator.Group[],
    containers?: Cpq.Container[],
    containerRowId?: string
  ) {
    const attributes: Configurator.Attribute[] = [];
    sourceAttributes.forEach((sourceAttribute) =>
      this.convertAttribute(
        sourceAttribute,
        1,
        currency,
        attributes,
        containerRowId
      )
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

    this.attachContainers(group, containers, currency, flatGroupList);
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
   * Adds a required selection prompt value for a required drop-down list when
   * no value is selected. Although it looks the same in the UI as a retract
   * value, it only prompts the user that a value still needs to be picked.
   *
   * @param sourceAttribute - source CPQ attribute
   * @param attribute - converted attribute
   * @param values - list of converted values the required selection prompt value is added to
   */
  protected addRequiredSelectionPromptValue(
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
    attributeList: Configurator.Attribute[],
    containerRowId?: string,
    parentRowGroupId?: string
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
      groupId: this.createTabGroupId(groupId, parentRowGroupId),
      userInput: sourceAttribute.userInput,
      hasConflicts: sourceAttribute.hasConflict,
      selectedSingleValue: undefined,
      images: [],
      visible: true,
    };
    if (containerRowId) {
      attribute.containerRowId = containerRowId;
    }

    if (
      sourceAttribute.values &&
      sourceAttribute.displayAs !== Cpq.DisplayAs.INPUT
    ) {
      const values: Configurator.Value[] = [];
      this.addRetractValue(sourceAttribute, attribute, values);
      this.addRequiredSelectionPromptValue(sourceAttribute, attribute, values);
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

      case Cpq.DisplayAs.CONTAINER: {
        uiType = Configurator.UiType.CONTAINER;
        break;
      }

      default: {
        uiType = Configurator.UiType.NOT_IMPLEMENTED;
      }
    }
    return uiType;
  }

  /**
   * Marks an attribute as incomplete when it has no selected value or user input.
   *
   * @param attribute - converted attribute
   * @protected
   */
  protected compileAttributeIncomplete(attribute: Configurator.Attribute) {
    //Default value for incomplete is false
    attribute.incomplete = false;

    const singleValueTypes = [
      Configurator.UiType.RADIOBUTTON,
      Configurator.UiType.RADIOBUTTON_PRODUCT,
      Configurator.UiType.DROPDOWN,
      Configurator.UiType.DROPDOWN_PRODUCT,
      Configurator.UiType.SINGLE_SELECTION_IMAGE,
    ];
    const inputTypes = [
      Configurator.UiType.NUMERIC,
      Configurator.UiType.STRING,
    ];
    const multiValueTypes = [
      Configurator.UiType.CHECKBOXLIST,
      Configurator.UiType.CHECKBOXLIST_PRODUCT,
      Configurator.UiType.CHECKBOX,
      Configurator.UiType.MULTI_SELECTION_IMAGE,
    ];
    const uiType = attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED;
    if (singleValueTypes.includes(uiType)) {
      this.compileAttributeIncompleteSingleLevel(attribute);
    } else if (inputTypes.includes(uiType)) {
      this.compileAttributeIncompleteInputTypes(attribute);
    } else if (multiValueTypes.includes(uiType)) {
      this.compileAttributeIncompleteMultiSelect(attribute);
    } else if (uiType === Configurator.UiType.CONTAINER) {
      this.compileAttributeIncompleteContainer(attribute);
    }
  }

  /**
   * Marks a single selection attribute as incomplete when it has no selected value or the retract value is selected.
   *
   * @param attribute - converted attribute
   * @protected
   */
  protected compileAttributeIncompleteSingleLevel(
    attribute: Configurator.Attribute
  ): void {
    if (
      !attribute.selectedSingleValue ||
      attribute.selectedSingleValue === Configurator.RetractValueCode
    ) {
      attribute.incomplete = true;
    }
  }

  /**
   * Marks an input type attribute as incomplete when it has no user input.
   *
   * @param attribute - converted attribute
   * @protected
   */
  protected compileAttributeIncompleteInputTypes(
    attribute: Configurator.Attribute
  ): void {
    if (!attribute.userInput) {
      attribute.incomplete = true;
    }
  }

  /**
   * Marks a multi selection attribute as incomplete when it has no selected values.
   *
   * @param attribute - converted attribute
   * @protected
   */
  protected compileAttributeIncompleteMultiSelect(
    attribute: Configurator.Attribute
  ): void {
    attribute.incomplete = !attribute.values?.some((value) => value.selected);
  }

  /**
   * Marks a container attribute as incomplete when the number of selected rows is less than the minimum required rows.
   *
   * @param attribute - converted attribute
   * @protected
   */
  protected compileAttributeIncompleteContainer(
    attribute: Configurator.Attribute
  ): void {
    const selectedRows =
      attribute.container?.rows?.filter((row) => row.selected).length ?? 0;
    const minRows = attribute.container?.minRows ?? 0;
    attribute.incomplete = selectedRows < minRows;
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

  /**
   * Attaches matching CPQ containers to the group's attributes and appends
   * nested container-row groups to the group's subGroups.
   */
  protected attachContainers(
    group: Configurator.Group,
    containers: Cpq.Container[] | undefined,
    currency: string,
    flatGroupList: Configurator.Group[]
  ): void {
    if (!containers?.length || !group.attributes?.length) {
      return;
    }
    group.attributes.forEach((attribute) => {
      const sourceContainer = containers.find(
        (container) => container.stdAttrCode === attribute.attrCode
      );
      if (sourceContainer) {
        attribute.container = this.convertContainer(
          sourceContainer,
          attribute.attrCode ?? sourceContainer.stdAttrCode,
          group,
          currency,
          flatGroupList
        );
        this.applyContainerRequired(attribute);
        this.compileAttributeIncomplete(attribute);
      }
    });
  }

  /**
   * Marks a container attribute as required when `minRows` is at least 1,
   * even if the source CPQ attribute is not required. CPQ signals a
   * container as non-complete in case nothing is selected even if it's marked as non-required
   * attribute in CPQ modeling
   *
   * @param attribute - converted attribute
   */
  protected applyContainerRequired(attribute: Configurator.Attribute): void {
    if (
      attribute.uiType === Configurator.UiType.CONTAINER &&
      (attribute.container?.minRows ?? 0) >= 1
    ) {
      attribute.required = true;
    }
  }

  protected convertContainer(
    source: Cpq.Container,
    attrCode: number,
    parentGroup: Configurator.Group,
    currency: string,
    flatGroupList: Configurator.Group[]
  ): Configurator.Container {
    return {
      minRows: source.minRows,
      maxRows: source.maxRows,
      messages: this.convertMessages(source.messages),
      rows: (source.rows ?? []).map((row) =>
        this.convertContainerRow(
          row,
          attrCode,
          parentGroup,
          currency,
          flatGroupList
        )
      ),
    };
  }

  protected convertContainerRow(
    source: Cpq.ContainerRow,
    attrCode: number,
    parentGroup: Configurator.Group,
    currency: string,
    flatGroupList: Configurator.Group[]
  ): Configurator.ContainerRow {
    const nestedConfiguration = source.configuration;
    const row: Configurator.ContainerRow = {
      id: source.id,
      minRows: source.minRows,
      maxRows: source.maxRows,
      productSystemId: source.productSystemId,
      productName: source.productName,
      selected: source.selected,
      actions: this.convertContainerRowActions(source.actions),
    };

    if (nestedConfiguration) {
      const rowGroup = this.convertNestedConfiguration(
        nestedConfiguration,
        source,
        attrCode,
        currency,
        flatGroupList
      );
      parentGroup.subGroups.push(rowGroup);
      row.groupId = rowGroup.id;
    }

    return row;
  }

  protected convertNestedConfiguration(
    source: Cpq.NestedProductConfiguration,
    row: Cpq.ContainerRow,
    attrCode: number,
    currency: string,
    flatGroupList: Configurator.Group[]
  ): Configurator.Group {
    const rowGroup: Configurator.Group = {
      id: `${Configurator.ContainerRowGroupIdPrefix}@${attrCode}@${row.id}`,
      name: row.productSystemId,
      description: row.productName,
      configurable: true,
      complete: source.completed,
      consistent: true,
      groupType: Configurator.GroupType.CONTAINER_ROW_GROUP,
      attributes: [],
      subGroups: [],
      messages: this.convertMessages(source.messages),
    };

    source.tabs?.forEach((tab) =>
      this.convertGroup(
        tab,
        tab.attributes ?? [],
        currency,
        rowGroup.subGroups,
        flatGroupList,
        source.containers,
        row.id,
        rowGroup.id
      )
    );

    return rowGroup;
  }

  protected convertMessages(
    source?: Cpq.Message[]
  ): Configurator.Message[] | undefined {
    if (!source?.length) {
      return undefined;
    }
    return source
      .filter((entry) => !!entry.message)
      .map((entry) => ({
        message: entry.message as string,
        severity: this.convertMessageSeverity(entry.severity),
      }));
  }

  /**
   * Converts CPQ message severity to the configurator-independent model.
   *
   * Note: This is NOT a one-to-one mapping. CPQ severity levels are intentionally
   * escalated to be more strict in the configurator model:
   * - CPQ INFO is mapped to CONFIGURATOR WARNING (informational messages become warnings)
   * - CPQ WARNING is mapped to CONFIGURATOR ERROR (warnings become errors)
   * This escalation ensures that important information from CPQ is more prominently
   * surfaced to users in the configurator UI.
   *
   * @param severity - CPQ message severity
   * @returns Escalated Configurator message severity, or `undefined` if the CPQ severity is not recognized
   * @protected
   */
  protected convertMessageSeverity(
    severity?: Cpq.MessageSeverity
  ): Configurator.MessageSeverity | undefined {
    switch (severity) {
      case Cpq.MessageSeverity.INFO:
        return Configurator.MessageSeverity.WARNING;
      case Cpq.MessageSeverity.WARNING:
        return Configurator.MessageSeverity.ERROR;
      default:
        return undefined;
    }
  }

  protected convertContainerRowActions(
    actions?: Cpq.ContainerRowAction[]
  ): Configurator.ContainerRowAction[] | undefined {
    if (!actions?.length) {
      return undefined;
    }
    return actions
      .map((action) => this.convertContainerRowAction(action))
      .filter(
        (action): action is Configurator.ContainerRowAction =>
          action !== undefined
      );
  }

  protected convertContainerRowAction(
    action: string
  ): Configurator.ContainerRowAction | undefined {
    switch (action) {
      case Cpq.ContainerRowAction.DELETE:
        return Configurator.ContainerRowAction.DELETE;
      case Cpq.ContainerRowAction.EDIT:
        return Configurator.ContainerRowAction.EDIT;
      case Cpq.ContainerRowAction.COPY:
        return Configurator.ContainerRowAction.COPY;
      case Cpq.ContainerRowAction.ADD:
        return Configurator.ContainerRowAction.ADD;
      default:
        return undefined;
    }
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
