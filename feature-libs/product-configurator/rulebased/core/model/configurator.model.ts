/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonConfigurator } from '@spartacus/product-configurator/common';

// Note that this namespace should be augmentable, therefore it's exposed in the 'public_api.ts'
// of the rulebased entry point, and there is no index.ts file in this folder

export namespace Configurator {
  export interface Attribute {
    attrCode?: number;
    name: string;
    label?: string;
    description?: string;
    required?: boolean;
    incomplete?: boolean;
    uiType?: UiType;
    /** Allows to work with a custom variation of an uiType, in order to register a specific component for rendering an attribute.
     * In case a custom variation exist, it is of format <OCC uiType>___<X>, e.g. RADIO_BUTTON___CUSTOM.
     * The normalizers do not change it and just use the first portion of it to find the uiType the SPA business logic
     * is attached to. Per default, if no customization is present, this attribute matches the OCC uiType */
    uiTypeVariation?: string;
    dataType?: DataType;
    quantity?: number;
    values?: Value[];
    groupId?: string;
    selectedSingleValue?: string;
    userInput?: string;
    isLineItem?: boolean;
    maxlength?: number;
    images?: Image[];
    numDecimalPlaces?: number;
    numTotalLength?: number;
    negativeAllowed?: boolean;
    hasNonNavigableConflict?: boolean;
    hasConflicts?: boolean;
    retractTriggered?: boolean;
    attributePriceTotal?: PriceDetails;
    intervalInDomain?: boolean;
    key?: string;
    validationType?: string;
    visible?: boolean;
    domainOnDemand?: boolean;
    /** Container metadata, present only if this attribute is a CPQ container,
     * i.e. it can hold multiple individually configurable sub-product instances. */
    container?: Container;
    /** Identifier of the container row this attribute belongs to. Only set for
     * attributes of a nested (row) configuration; needed to build update requests
     * in the row context. */
    containerRowId?: string;
  }

  /**
   * Metadata of a container. The link to the attribute (CPQ: stdAttrCode) is
   * implicit, as the container is attached to the attribute it belongs to.
   */
  export interface Container {
    minRows?: number;
    maxRows?: number;
    failedValidations?: string[];
    rows: ContainerRow[];
  }

  /**
   * A single, individually configurable sub-product instance of a container.
   */
  export interface ContainerRow {
    id: string;
    productSystemId?: string;
    productName?: string;
    selected?: boolean;
    actions?: ContainerRowAction[];
    /** Id of the group carrying the nested configuration of this row.
     * Only present if the row is selected and configurable. */
    groupId?: string;
  }

  export interface Value {
    valueCode: string;
    name?: string;
    valueDisplay?: string;
    description?: string;
    selected?: boolean;
    quantity?: number;
    valuePrice?: PriceDetails;
    valuePriceTotal?: PriceDetails;
    productSystemId?: string;
    isCommerceProduct?: boolean;
    images?: Image[];
  }

  export interface Group {
    attributes?: Attribute[];
    id: string;
    name?: string;
    description?: string;
    groupType?: GroupType;
    configurable?: boolean;
    complete?: boolean;
    consistent?: boolean;
    subGroups: Group[];
    /** Messages from a nested (container row) configuration, including severity. */
    messages?: Message[];
  }

  /**
   * A message issued by the configuration engine for a configuration or for a
   * nested product configuration. Maps to SAPCPQMessage.
   */
  export interface Message {
    message: string;
    severity?: MessageSeverity;
  }

  export interface ValueSupplement {
    attributeValueKey: string;
    priceValue: PriceDetails;
    obsoletePriceValue: PriceDetails;
  }

  export interface AttributeSupplement {
    attributeUiKey: string;
    valueSupplements: ValueSupplement[];
  }

  export interface Configuration {
    configId: string;
    consistent?: boolean;
    complete?: boolean;
    totalNumberOfIssues?: number;
    productCode: string;
    groups: Group[];
    flatGroups: Group[];
    priceSupplements?: AttributeSupplement[];
    priceSummary?: PriceSummary;
    overview?: Overview;
    owner: CommonConfigurator.Owner;
    nextOwner?: CommonConfigurator.Owner;
    isCartEntryUpdateRequired?: boolean;
    interactionState: InteractionState;
    updateType?: UpdateType;
    errorMessages?: string[];
    warningMessages?: string[];
    variants?: Variant[];
    kbKey?: KB;
    pricingEnabled?: boolean;
    hideBasePriceAndSelectedOptions?: boolean;
    immediateConflictResolution?: boolean;
    newConfiguration?: boolean;
    isPricingAsync?: boolean;
  }

  export interface ConfigurationWithOverview extends Configuration {
    overview: Overview;
  }

  export interface InteractionState {
    currentGroup?: string;
    menuParentGroup?: string;
    groupsVisited?: {
      [id: string]: boolean;
    };
    issueNavigationDone?: boolean;
    isConflictResolutionMode?: boolean;
    showConflictSolverDialog?: boolean;
    newConfiguration?: boolean;
  }

  export interface Overview {
    configId: string;
    totalNumberOfIssues?: number;
    numberOfIncompleteCharacteristics?: number;
    numberOfConflicts?: number;
    groups?: GroupOverview[];
    priceSummary?: PriceSummary;
    productCode: string;
    attributeFilters?: OverviewFilter[];
    groupFilters?: string[];
    possibleGroups?: GroupOverview[];
  }

  export interface GroupOverview {
    id: string;
    groupDescription?: string;
    attributes?: AttributeOverview[];
    subGroups?: GroupOverview[];
  }

  export interface AttributeOverview {
    attribute: string;
    attributeId?: string;
    value: string;
    valueId?: string;
    productCode?: string;
    type?: AttributeOverviewType;
    quantity?: number;
    valuePrice?: PriceDetails;
    valuePriceTotal?: PriceDetails;
  }

  export interface PriceSummary {
    basePrice?: PriceDetails;
    currentTotal?: PriceDetails;
    currentTotalSavings?: PriceSavingDetails;
    selectedOptions?: PriceDetails;
  }

  export interface PriceDetails {
    currencyIso: string;
    formattedValue?: string;
    value: number;
  }

  export interface PriceSavingDetails extends PriceDetails {
    maxQuantity?: number;
    minQuantity?: number;
  }

  export interface AddToCartParameters {
    userId: string;
    cartId: string;
    productCode: string;
    quantity: number;
    configId: string;
    owner: CommonConfigurator.Owner;
  }

  export interface AddContainerRowParameters {
    configId: string;
    owner: CommonConfigurator.Owner;
    stdAttrCode: number;
    productSystemId: string;
    /** Identifier of the parent container row for nested containers; omit for root level. */
    parentRowId?: string;
  }

  export interface RemoveContainerRowParameters {
    configId: string;
    owner: CommonConfigurator.Owner;
    rowId: string;
  }

  export interface UpdateConfigurationForCartEntryParameters {
    userId: string;
    cartId: string;
    cartEntryNumber: string;
    configuration: Configurator.Configuration;
  }

  export interface Image {
    type?: ImageType;
    format?: ImageFormatType;
    url?: string;
    altText?: string;
    galleryIndex?: number;
  }

  export interface Variant {
    productCode: string;
  }

  export interface KB {
    kbName?: string;
    kbLogsys?: string;
    kbVersion?: string;
    kbBuildNumber?: string;
  }

  export enum GroupType {
    ATTRIBUTE_GROUP = 'AttributeGroup',
    SUB_ITEM_GROUP = 'SubItemGroup',
    CONFLICT_HEADER_GROUP = 'ConflictHeaderGroup',
    CONFLICT_GROUP = 'ConflictGroup',
    /** Group representing the nested configuration of one container row. */
    CONTAINER_ROW_GROUP = 'ContainerRowGroup',
  }

  export enum ContainerRowAction {
    DELETE = 'DELETE',
    EDIT = 'EDIT',
    COPY = 'COPY',
    ADD = 'ADD',
  }

  export enum MessageSeverity {
    INFO = 'info',
    WARNING = 'warning',
  }

  export enum UiType {
    NOT_IMPLEMENTED = 'not_implemented',
    RADIOBUTTON = 'radioGroup',
    RADIOBUTTON_ADDITIONAL_INPUT = 'radioGroup_add',
    CHECKBOX = 'checkBox',
    CHECKBOXLIST = 'checkBoxList',
    DROPDOWN = 'dropdown',
    DROPDOWN_ADDITIONAL_INPUT = 'dropdown_add',
    LISTBOX = 'listbox',
    LISTBOX_MULTI = 'listboxmulti',
    READ_ONLY = 'readonly',
    READ_ONLY_SINGLE_SELECTION_IMAGE = 'read_only_single_selection_image',
    READ_ONLY_MULTI_SELECTION_IMAGE = 'read_only_multi_selection_image',
    STRING = 'string',
    NUMERIC = 'numeric',
    SAP_DATE = 'sap_date',
    AUTO_COMPLETE_CUSTOM = 'input_autocomplete',
    MULTI_SELECTION_IMAGE = 'multi_selection_image',
    SINGLE_SELECTION_IMAGE = 'single_selection_image',

    //introduced with CPQ

    CHECKBOXLIST_PRODUCT = 'checkBoxListProduct',
    DROPDOWN_PRODUCT = 'dropdownProduct',
    RADIOBUTTON_PRODUCT = 'radioGroupProduct',
    CONTAINER = 'container',
  }

  export enum ImageFormatType {
    VALUE_IMAGE = 'VALUE_IMAGE',
    ATTRIBUTE_IMAGE = 'ATTRIBUTE_IMAGE',
  }

  export enum ImageType {
    PRIMARY = 'PRIMARY',
    GALLERY = 'GALLERY',
  }

  export enum DataType {
    INPUT_STRING = 'String',
    INPUT_NUMBER = 'Number',
    USER_SELECTION_QTY_ATTRIBUTE_LEVEL = 'UserSelectionWithAttributeQuantity',
    USER_SELECTION_QTY_VALUE_LEVEL = 'UserSelectionWithValueQuantity',
    USER_SELECTION_NO_QTY = 'UserSelectionWithoutQuantity',
    NOT_IMPLEMENTED = 'not_implemented',
  }
  export enum UpdateType {
    ATTRIBUTE = 'Attribute',
    ATTRIBUTE_QUANTITY = 'AttributeQuantity',
    VALUE_QUANTITY = 'ValueQuantity',
  }

  export enum AttributeOverviewType {
    GENERAL = 'general',
    BUNDLE = 'bundle',
  }

  export enum ValidationType {
    NONE = 'NONE',
    NUMERIC = 'NUMERIC',
    SAP_DATE = 'SAP_DATE',
  }
  export enum OverviewFilter {
    VISIBLE = 'PRIMARY',
    USER_INPUT = 'USER_INPUT',
    PRICE_RELEVANT = 'PRICE_RELEVANT',
  }

  export const ConflictIdPrefix = 'CONFLICT';
  export const ConflictHeaderId = 'CONFLICT_HEADER';
  export const ContainerRowGroupIdPrefix = 'CONTAINER_ROW';
  export const CustomUiTypeIndicator = '___';
  export const RetractValueCode = '###RETRACT_VALUE_CODE###';
}
