export namespace OccConfigurator {
  /**
   *
   * An interface representing the variant configuration consumed through OCC.
   */
  export interface Configuration {
    /**
     * @member {string} [configId]
     */
    configId: string;
    /**
     * @member {boolean} [complete]
     */
    complete?: boolean;
    /**
     * Configuration is consistent, meaning it does not contain conflicts
     *
     * @member {boolean}
     */
    consistent?: boolean;
    totalNumberOfIssues?: number;
    groups?: Group[];
    rootProduct?: string;
  }

  export interface Prices {
    configId: string;
    attributes?: Supplements[];
    pricingError?: boolean;
    showDeltaPrices?: boolean;
    priceSummary?: PriceSummary;
  }

  export interface Supplements {
    csticUiKey: string;
    selectedValues: string[];
    priceSupplements: ValueSupplements[];
  }

  export interface ValueSupplements {
    attributeValueKey: string;
    priceValue: PriceDetails;
    obsoletePriceValue: PriceDetails;
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

  export interface Group {
    configurable?: boolean;
    complete?: boolean;
    consistent?: boolean;
    attributes?: Attribute[];
    description?: string;
    groupType: GroupType;
    id: string;
    name?: string;
    subGroups?: Group[];
  }

  export interface Attribute {
    name: string;
    langDepName?: string;
    type?: UiType;
    domainValues?: Value[];
    required?: boolean;
    value?: string;
    key: string;
    formattedValue?: string;
    maxlength?: number;
    images?: Image[];
    typeLength?: number;
    numberScale?: number;
    negativeAllowed?: boolean;
    conflicts?: string[];
    retractTriggered?: boolean;
  }

  export interface Value {
    key: string;
    name?: string;
    langDepName?: string;
    readonly?: boolean;
    selected?: boolean;
    images?: Image[];
  }

  export interface AddToCartParameters {
    userId?: string;
    cartId?: string;
    product?: AddToCartProductData;
    quantity?: number;
    configId?: string;
  }

  export interface UpdateConfigurationForCartEntryParameters {
    userId?: string;
    cartId?: string;
    product?: AddToCartProductData;
    quantity?: number;
    configId: string;
    entryNumber: string;
    configurationInfos: ConfigurationInfo[];
  }

  export interface ConfigurationInfo {
    configuratorType: string;
  }

  export interface AddToCartProductData {
    code?: string;
  }

  export interface Overview {
    id: string;
    totalNumberOfIssues?: number;
    groups?: GroupOverview[];
    pricing?: PriceSummary;
    productCode?: string;
  }

  export interface GroupOverview {
    id: string;
    groupDescription?: string;
    characteristicValues?: CharacteristicOverview[];
    subGroups?: GroupOverview[];
  }

  export interface CharacteristicOverview {
    characteristic: string;
    characteristicId?: string;
    value: string;
    valueId?: string;
  }
  export interface Image {
    imageType: ImageType;
    format: ImageFormatType;
    url?: string;
    altText?: string;
    galleryIndex?: number;
  }

  export enum GroupType {
    CSTIC_GROUP = 'CSTIC_GROUP',
    INSTANCE = 'INSTANCE',
    CONFLICT_HEADER = 'CONFLICT_HEADER',
    CONFLICT = 'CONFLICT',
  }

  export enum UiType {
    STRING = 'STRING',
    NUMERIC = 'NUMERIC',
    CHECK_BOX = 'CHECK_BOX',
    CHECK_BOX_LIST = 'CHECK_BOX_LIST',
    RADIO_BUTTON = 'RADIO_BUTTON',
    RADIO_BUTTON_ADDITIONAL_INPUT = 'RADIO_BUTTON_ADDITIONAL_INPUT',
    DROPDOWN = 'DROPDOWN',
    DROPDOWN_ADDITIONAL_INPUT = 'DROPDOWN_ADDITIONAL_INPUT',
    READ_ONLY = 'READ_ONLY',
    NOT_IMPLEMENTED = 'NOT_IMPLEMENTED',
    SINGLE_SELECTION_IMAGE = 'SINGLE_SELECTION_IMAGE',
    MULTI_SELECTION_IMAGE = 'MULTI_SELECTION_IMAGE',
  }

  export enum PriceType {
    BUY = 'BUY',
  }

  export enum ImageFormatType {
    VALUE_IMAGE = 'VALUE_IMAGE',
    CSTIC_IMAGE = 'CSTIC_IMAGE',
  }

  export enum ImageType {
    PRIMARY = 'PRIMARY',
    GALLERY = 'GALLERY',
  }
}
