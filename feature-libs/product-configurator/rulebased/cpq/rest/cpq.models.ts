/**
 *
 * An interface representing the models used for the communication with the CPQ configurator
 */
export namespace Cpq {
  /**
   * Response of create configuration requests
   */
  export interface ConfigurationCreatedResponseData {
    /**
     * CPQ configuration ID of the newly created configuration
     */
    configurationId: string;
  }

  /**
   * An interface representing the CPQ configuration.
   */
  export interface Configuration {
    productSystemId: string;
    productName?: string;
    completed?: boolean;
    incompleteMessages?: string[];
    incompleteAttributes?: string[];
    invalidMessages?: string[];
    failedValidations?: string[];
    errorMessages?: string[];
    conflictMessages?: string[];
    numberOfConflicts?: number;
    currencyISOCode: string;
    currencySign?: string;
    responder?: Cpq.Responder;
    tabs?: Tab[];
    attributes?: Attribute[]; // attributes of current selected tab
  }

  /**
   *
   * An interface representing the CPQ configuration responder.
   */
  export interface Responder {
    totalPrice?: string;
    baseProductPrice?: string;
  }

  /**
   *
   * An interface representing the CPQ configuration tab.
   */
  export interface Tab {
    id: number;
    name?: string;
    displayName?: string;
    isIncomplete?: boolean;
    isSelected?: boolean;
    attributes?: Attribute[]; // used for overview - has to be populated explicitly
  }

  /**
   *
   * An interface representing the CPQ configuration attribute.
   */
  export interface Attribute {
    pA_ID: number;
    stdAttrCode: number;
    name?: string;
    description?: string;
    label?: string;
    displayAs?: number;
    dataType?: Cpq.DataType;
    required?: boolean;
    incomplete?: boolean;
    isEnabled?: boolean;
    isLineItem?: boolean;
    hasConflict?: boolean;
    userInput?: string;
    quantity?: string;
    values?: Value[];
  }

  /**
   *
   * An interface representing the CPQ configuration attribute value.
   */
  export interface Value {
    paV_ID: number;
    valueCode?: string;
    valueDisplay?: string;
    description?: string;
    productSystemId?: string;
    selected?: boolean;
    price?: string;
    quantity?: string;
  }

  /**
   *
   * An interface representing the structure for update of CPQ configuration attribute.
   */
  export interface UpdateAttribute {
    configurationId: string;
    standardAttributeCode: string;
    changeAttributeValue: ChangeAttributeValue;
    tabId: string;
  }

  /**
   *
   * An interface representing the update request body structure for update of CPQ configuration attribute.
   */
  export interface ChangeAttributeValue {
    attributeValueIds?: string;
    userInput?: string;
    quantity?: number;
  }
  /**
   *
   * An interface representing the structure for update quantity of CPQ configuration attribute value.
   */
  export interface UpdateValue {
    configurationId: string;
    standardAttributeCode: string;
    attributeValueId: string;
    quantity: number;
    tabId: string;
  }

  /**
   *
   * An enum representing possible displayAs value.
   */
  export enum DisplayAs {
    RADIO_BUTTON = 1,
    CHECK_BOX = 2,
    DROPDOWN = 3,
    LIST_BOX = 4,
    LIST_BOX_MULTI = 5,
    READ_ONLY = 71,
    INPUT = 95,
    AUTO_COMPLETE_CUSTOM = 102,
  }

  export enum DataType {
    INPUT_STRING = 'String',
    INPUT_NUMBER = 'Number',
    QTY_ATTRIBUTE_LEVEL = 'Quantity',
    QTY_VALUE_LEVEL = 'Attr.Quantity',
    N_A = 'N/A',
  }
}
