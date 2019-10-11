export namespace Configurator {
  export interface Attribute {
    stdAttrCode?: number;
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
  }

  export interface Value {
    valueCode?: string;
    valueDisplay?: string;
    description?: string;
    selected?: boolean;
    quantity?: number;
    price?: number;
    productSystemId?: string;
    isCommerceProduct?: boolean;
  }

  export interface Configuration {
    configId: string;
    consistent?: boolean;
    complete?: boolean;
    productCode?: string;
    attributes?: Attribute[];
  }

  export enum UiType {
    NOT_IMPLEMENTED = 'not_implemented',
    RADIOBUTTON = 'radioGroup',
    CHECKBOX = 'checkBoxList',
    DROPDOWN = 'dropdown',
    LISTBOX = 'listbox',
    LISTBOX_MULTI = 'listboxmulti',
    READ_ONLY = 'readonly',
    INPUT = 'inputField',
    STRING = 'string',
    AUTO_COMPLETE_CUSTOM = 'input_autocomplete',
  }
}
