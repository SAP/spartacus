import { GenericConfigurator } from './generic-configurator.model';

export namespace Configurator {
  export interface Attribute {
    attrCode?: number;
    name: string;
    label?: string;
    description?: string;
    required?: boolean;
    incomplete?: boolean;
    uiType?: UiType;
    dataType?: string;
    quantity?: number;
    values?: Value[];
    selectedSingleValue?: string;
    userInput?: string;
    isLineItem?: boolean;
    maxlength?: number;
  }

  export interface Value {
    valueCode?: string;
    name?: string;
    valueDisplay?: string;
    description?: string;
    selected?: boolean;
    quantity?: number;
    price?: number;
    productSystemId?: string;
    isCommerceProduct?: boolean;
  }

  export interface Group {
    attributes?: Attribute[];
    id?: string;
    name?: string;
    description?: string;
    groupType?: GroupType;
    configurable?: boolean;
    subGroups?: Group[];
  }

  export interface Configuration {
    configId: string;
    consistent?: boolean;
    complete?: boolean;
    productCode?: string;
    groups?: Group[];
    flatGroups?: Group[];
    priceSummary?: PriceSummary;
    overview?: Overview;
    owner?: GenericConfigurator.Owner;
    nextOwner?: GenericConfigurator.Owner;
  }

  export interface Overview {
    groups?: GroupOverview[];
  }

  export interface GroupOverview {
    id: string;
    groupDescription: string;
    attributes: AttributeOverview[];
  }

  export interface AttributeOverview {
    attribute: string;
    value: string;
  }

  export interface PriceSummary {
    basePrice?: PriceDetails;
    currentTotal?: PriceDetails;
    currentTotalSavings?: PriceSavingDetails;
    selectedOptions?: PriceDetails;
  }

  export interface PriceDetails {
    currencyIso?: string;
    formattedValue?: string;
    value?: number;
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
    ownerKey: string;
  }

  export enum GroupType {
    ATTRIBUTE_GROUP = 'AttributeGroup',
    SUB_ITEM_GROUP = 'SubItemGroup',
  }

  export enum UiType {
    NOT_IMPLEMENTED = 'not_implemented',
    RADIOBUTTON = 'radioGroup',
    CHECKBOX = 'checkBoxList',
    DROPDOWN = 'dropdown',
    LISTBOX = 'listbox',
    LISTBOX_MULTI = 'listboxmulti',
    READ_ONLY = 'readonly',
    STRING = 'string',
    AUTO_COMPLETE_CUSTOM = 'input_autocomplete',
  }
}
