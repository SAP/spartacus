export namespace Occ {
  /**
   *
   * An interface representing Country.
   */
  export interface Country {
    /**
     * @member {string} [isocode]
     */
    isocode?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
  }

  /**
   *
   * An interface representing Region.
   */
  export interface Region {
    /**
     * @member {string} [countryIso]
     */
    countryIso?: string;
    /**
     * @member {string} [isocode]
     */
    isocode?: string;
    /**
     * @member {string} [isocodeShort]
     */
    isocodeShort?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
  }

  /**
   *
   * An interface representing RegionList.
   */
  export interface RegionList {
    /**
     * @member {Region[]} [regions]
     */
    regions?: Region[];
  }

  export interface AddressList {
    addresses?: Address[];
  }

  /**
   *
   * An interface representing Address.
   */
  export interface Address {
    /**
     * @member {string} [companyName]
     */
    companyName?: string;
    /**
     * @member {Country} [country]
     */
    country?: Country;
    /**
     * @member {boolean} [defaultAddress]
     */
    defaultAddress?: boolean;
    /**
     * @member {string} [email]
     */
    email?: string;
    /**
     * @member {string} [firstName]
     */
    firstName?: string;
    /**
     * @member {string} [formattedAddress]
     */
    formattedAddress?: string;
    /**
     * @member {string} [id]
     */
    id?: string;
    /**
     * @member {string} [lastName]
     */
    lastName?: string;
    /**
     * @member {string} [line1]
     */
    line1?: string;
    /**
     * @member {string} [line2]
     */
    line2?: string;
    /**
     * @member {string} [phone]
     */
    phone?: string;
    /**
     * @member {string} [town]
     */
    cellphone?: string;
    /**
     * @member {string} [postalCode]
     */
    postalCode?: string;
    /**
     * @member {Region} [region]
     */
    region?: Region;
    /**
     * @member {string} [town]
     */
    district?: string;
    /**
     * @member {boolean} [shippingAddress]
     */
    shippingAddress?: boolean;
    /**
     * @member {string} [title]
     */
    title?: string;
    /**
     * @member {string} [titleCode]
     */
    titleCode?: string;
    /**
     * @member {string} [town]
     */
    town?: string;
    /**
     * @member {boolean} [visibleInAddressBook]
     */
    visibleInAddressBook?: boolean;
  }

  /**
   *
   * An interface representing AddressList.
   */
  export interface AddressList {
    /**
     * @member {Address[]} [addresses]
     */
    addresses?: Address[];
  }

  /**
   *
   * An interface representing ErrorModel.
   * Error message
   *
   */
  export interface ErrorModel {
    /**
     * @member {string} [message] Descriptive, human readable error message.
     */
    message?: string;
    /**
     * @member {string} [reason] Additional classification specific for each
     * error type e.g. 'noStock'.
     */
    reason?: string;
    /**
     * @member {string} [subject] Identifier of the related object e.g. '1'.
     */
    subject?: string;
    /**
     * @member {string} [subjectType] Type of the object related to the error
     * e.g. 'entry'.
     */
    subjectType?: string;
    /**
     * @member {string} [type] Type of the error e.g. 'LowStockError'.
     */
    type?: string;
  }

  /**
   *
   * An interface representing ErrorList.
   * List of errors
   *
   */
  export interface ErrorList {
    /**
     * @member {ErrorModel[]} [errors]
     */
    errors?: ErrorModel[];
  }

  /**
   *
   * An interface representing AddressValidation.
   */
  export interface AddressValidation {
    /**
     * @member {string} [decision]
     */
    decision?: string;
    /**
     * @member {ErrorList} [errors]
     */
    errors?: ErrorList;
    /**
     * @member {Address[]} [suggestedAddresses]
     */
    suggestedAddresses?: Address[];
  }

  /**
   *
   * An interface representing Price.
   */
  export interface Price {
    /**
     * @member {string} [currencyIso]
     */
    currencyIso?: string;
    /**
     * @member {string} [formattedValue]
     */
    formattedValue?: string;
    /**
     * @member {number} [maxQuantity]
     */
    maxQuantity?: number;
    /**
     * @member {number} [minQuantity]
     */
    minQuantity?: number;
    /**
     * @member {PriceType} [priceType] Possible values include: 'BUY', 'FROM'
     */
    priceType?: PriceType;
    /**
     * @member {number} [value]
     */
    value?: number;
  }

  /**
   *
   * An interface representing Stock.
   */
  export interface Stock {
    /**
     * @member {number} [stockLevel]
     */
    stockLevel?: number;
    /**
     * @member {string} [stockLevelStatus]
     */
    stockLevelStatus?: string;
  }

  /**
   *
   * An interface representing Image.
   */
  export interface Image {
    /**
     * @member {string} [altText]
     */
    altText?: string;
    /**
     * @member {string} [format]
     */
    format?: string;
    /**
     * @member {number} [galleryIndex]
     */
    galleryIndex?: number;
    /**
     * @member {ImageType} [imageType] Possible values include: 'PRIMARY',
     * 'GALLERY'
     */
    imageType?: ImageType;
    /**
     * @member {string} [url]
     */
    url?: string;
  }

  /**
   *
   * An interface representing VariantOptionQualifier.
   */
  export interface VariantOptionQualifier {
    /**
     * @member {Image} [image]
     */
    image?: Image;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [qualifier]
     */
    qualifier?: string;
    /**
     * @member {string} [value]
     */
    value?: string;
  }

  /**
   *
   * An interface representing VariantOption.
   */
  export interface VariantOption {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {Price} [priceData]
     */
    priceData?: Price;
    /**
     * @member {Stock} [stock]
     */
    stock?: Stock;
    /**
     * @member {string} [url]
     */
    url?: string;
    /**
     * @member {VariantOptionQualifier[]} [variantOptionQualifiers]
     */
    variantOptionQualifiers?: VariantOptionQualifier[];
  }

  /**
   *
   * An interface representing BaseOption.
   */
  export interface BaseOption {
    /**
     * @member {VariantOption[]} [options]
     */
    options?: VariantOption[];
    /**
     * @member {VariantOption} [selected]
     */
    selected?: VariantOption;
    /**
     * @member {string} [variantType]
     */
    variantType?: string;
  }

  /**
   *
   * An interface representing SearchQuery.
   */
  export interface SearchQuery {
    /**
     * @member {string} [value]
     */
    value?: string;
  }

  /**
   *
   * An interface representing SearchState.
   */
  export interface SearchState {
    /**
     * @member {SearchQuery} [query]
     */
    query?: SearchQuery;
    /**
     * @member {string} [url]
     */
    url?: string;
  }

  /**
   *
   * An interface representing Breadcrumb.
   */
  export interface Breadcrumb {
    /**
     * @member {string} [facetCode]
     */
    facetCode?: string;
    /**
     * @member {string} [facetName]
     */
    facetName?: string;
    /**
     * @member {string} [facetValueCode]
     */
    facetValueCode?: string;
    /**
     * @member {string} [facetValueName]
     */
    facetValueName?: string;
    /**
     * @member {SearchState} [removeQuery]
     */
    removeQuery?: SearchState;
    /**
     * @member {SearchState} [truncateQuery]
     */
    truncateQuery?: SearchState;
  }

  /**
   *
   * An interface representing Component.
   */
  export interface Component {
    /**
     * @member {Date} [modifiedTime]
     */
    modifiedTime?: Date;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {any} [otherProperties]
     */
    otherProperties?: any;
    /**
     * @member {string} [typeCode]
     */
    typeCode?: string;
    /**
     * @member {string} [uid]
     */
    uid?: string;
  }

  /**
   *
   * An interface representing ComponentList.
   */
  export interface ComponentList {
    /**
     * @member {Component[]} [component]
     */
    component?: Component[] | any[];
  }

  /**
   *
   * An interface representing ContentSlot.
   */
  export interface ContentSlot {
    /**
     * @member {ComponentList} [components]
     */
    components?: ComponentList;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [position]
     */
    position?: string;
    /**
     * @member {string} [slotId]
     */
    slotId?: string;
    /**
     * @member {boolean} [slotShared]
     */
    slotShared?: boolean;
    /**
     * @member {string} [slotStatus]
     */
    slotStatus?: string;
    /**
     * @member {any} [properties]
     */
    properties?: any;
  }

  /**
   *
   * An interface representing ContentSlotList.
   */
  export interface ContentSlotList {
    /**
     * @member {ContentSlot[]} [contentSlot]
     */
    contentSlot?: ContentSlot[];
  }

  /**
   *
   * An interface representing CMSPage.
   */
  export interface CMSPage {
    /**
     * @member {ContentSlotList} [contentSlots]
     */
    contentSlots?: ContentSlotList;
    /**
     * @member {boolean} [defaultPage]
     */
    defaultPage?: boolean;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [template]
     */
    template?: string;
    /**
     * @member {string} [title]
     */
    title?: string;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {string} [typeCode]
     */
    typeCode?: string;
    /**
     * @member {string} [uid]
     */
    uid?: string;
    /**
     * @member {string} [label]
     */
    label?: string;
    /**
     * @member {any} [properties]
     */
    properties?: any;

    robotTag?: PageRobots;
  }

  /**
   * The page robot information is exposed with 4 string values.
   */
  export enum PageRobots {
    INDEX_FOLLOW = 'INDEX_FOLLOW',
    NOINDEX_FOLLOW = 'NOINDEX_FOLLOW',
    INDEX_NOFOLLOW = 'INDEX_NOFOLLOW',
    NOINDEX_NOFOLLOW = 'NOINDEX_NOFOLLOW',
  }

  /**
   *
   * An interface representing CardType.
   */
  export interface CardType {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
  }

  /**
   *
   * An interface representing CardTypeList.
   */
  export interface CardTypeList {
    /**
     * @member {CardType[]} [cardTypes]
     */
    cardTypes?: CardType[];
  }

  /**
   *
   * An interface representing PaymentType.
   */
  export interface PaymentType {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [displayName]
     */
    displayName?: string;
  }

  /**
   *
   * An interface representing PaymentTypeList.
   */
  export interface PaymentTypeList {
    /**
     * @member {PaymentType[]} [paymentTypes]
     */
    paymentTypes?: PaymentType[];
  }

  /**
   *
   * An interface representing PromotionOrderEntryConsumed.
   */
  export interface PromotionOrderEntryConsumed {
    /**
     * @member {number} [adjustedUnitPrice]
     */
    adjustedUnitPrice?: number;
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {number} [orderEntryNumber]
     */
    orderEntryNumber?: number;
    /**
     * @member {number} [quantity]
     */
    quantity?: number;
  }

  /**
   *
   * An interface representing PromotionRestriction.
   */
  export interface PromotionRestriction {
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {string} [restrictionType]
     */
    restrictionType?: string;
  }

  /**
   *
   * An interface representing Promotion.
   */
  export interface Promotion {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string[]} [couldFireMessages]
     */
    couldFireMessages?: string[];
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {boolean} [enabled]
     */
    enabled?: boolean;
    /**
     * @member {Date} [endDate]
     */
    endDate?: Date;
    /**
     * @member {string[]} [firedMessages]
     */
    firedMessages?: string[];
    /**
     * @member {number} [priority]
     */
    priority?: number;
    /**
     * @member {Image} [productBanner]
     */
    productBanner?: Image;
    /**
     * @member {string} [promotionGroup]
     */
    promotionGroup?: string;
    /**
     * @member {string} [promotionType]
     */
    promotionType?: string;
    /**
     * @member {PromotionRestriction[]} [restrictions]
     */
    restrictions?: PromotionRestriction[];
    /**
     * @member {Date} [startDate]
     */
    startDate?: Date;
    /**
     * @member {string} [title]
     */
    title?: string;
  }

  /**
   *
   * An interface representing PromotionResult.
   */
  export interface PromotionResult {
    /**
     * @member {PromotionOrderEntryConsumed[]} [consumedEntries]
     */
    consumedEntries?: PromotionOrderEntryConsumed[];
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {Promotion} [promotion]
     */
    promotion?: Promotion;
  }

  /**
   *
   * An interface representing Currency.
   */
  export interface Currency {
    /**
     * @member {boolean} [active]
     */
    active?: boolean;
    /**
     * @member {string} [isocode]
     */
    isocode?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [symbol]
     */
    symbol?: string;
  }

  /**
   *
   * An interface representing Voucher.
   */
  export interface Voucher {
    /**
     * @member {Price} [appliedValue]
     */
    appliedValue?: Price;
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {Currency} [currency]
     */
    currency?: Currency;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {boolean} [freeShipping]
     */
    freeShipping?: boolean;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {number} [value]
     */
    value?: number;
    /**
     * @member {string} [valueFormatted]
     */
    valueFormatted?: string;
    /**
     * @member {string} [valueString]
     */
    valueString?: string;
    /**
     * @member {string} [voucherCode]
     */
    voucherCode?: string;
  }

  /**
   *
   * An interface representing DeliveryMode.
   */
  export interface DeliveryMode {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {Price} [deliveryCost]
     */
    deliveryCost?: Price;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
  }

  /**
   *
   * An interface representing GeoPoint.
   */
  export interface GeoPoint {
    /**
     * @member {number} [latitude]
     */
    latitude?: number;
    /**
     * @member {number} [longitude]
     */
    longitude?: number;
  }

  /**
   *
   * An interface representing Time.
   */
  export interface Time {
    /**
     * @member {string} [formattedHour]
     */
    formattedHour?: string;
    /**
     * @member {number} [hour]
     */
    hour?: number;
    /**
     * @member {number} [minute]
     */
    minute?: number;
  }

  /**
   *
   * An interface representing SpecialOpeningDay.
   */
  export interface SpecialOpeningDay {
    /**
     * @member {boolean} [closed]
     */
    closed?: boolean;
    /**
     * @member {Time} [closingTime]
     */
    closingTime?: Time;
    /**
     * @member {string} [comment]
     */
    comment?: string;
    /**
     * @member {Date} [date]
     */
    date?: Date;
    /**
     * @member {string} [formattedDate]
     */
    formattedDate?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {Time} [openingTime]
     */
    openingTime?: Time;
  }

  /**
   *
   * An interface representing WeekdayOpeningDay.
   */
  export interface WeekdayOpeningDay {
    /**
     * @member {boolean} [closed]
     */
    closed?: boolean;
    /**
     * @member {Time} [closingTime]
     */
    closingTime?: Time;
    /**
     * @member {Time} [openingTime]
     */
    openingTime?: Time;
    /**
     * @member {string} [weekDay]
     */
    weekDay?: string;
  }

  /**
   *
   * An interface representing OpeningSchedule.
   */
  export interface OpeningSchedule {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {SpecialOpeningDay[]} [specialDayOpeningList]
     */
    specialDayOpeningList?: SpecialOpeningDay[];
    /**
     * @member {WeekdayOpeningDay[]} [weekDayOpeningList]
     */
    weekDayOpeningList?: WeekdayOpeningDay[];
  }

  /**
   *
   * An interface representing PointOfService.
   */
  export interface PointOfService {
    /**
     * @member {Address} [address]
     */
    address?: Address;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {string} [displayName]
     */
    displayName?: string;
    /**
     * @member {number} [distanceKm]
     */
    distanceKm?: number;
    /**
     * @member {{ [propertyName: string]: string }} [features]
     */
    features?: { [propertyName: string]: string };
    /**
     * @member {string} [formattedDistance]
     */
    formattedDistance?: string;
    /**
     * @member {GeoPoint} [geoPoint]
     */
    geoPoint?: GeoPoint;
    /**
     * @member {Image} [mapIcon]
     */
    mapIcon?: Image;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {OpeningSchedule} [openingHours]
     */
    openingHours?: OpeningSchedule;
    /**
     * @member {string} [storeContent]
     */
    storeContent?: string;
    /**
     * @member {Image[]} [storeImages]
     */
    storeImages?: Image[];
    /**
     * @member {string} [url]
     */
    url?: string;
  }

  /**
   *
   * An interface representing Category.
   */
  export interface Category {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [code]
     */
    name?: string;
    /**
     * @member {Image} [image]
     */
    image?: Image;
    /**
     * @member {string} [url]
     */
    url?: string;
  }

  /**
   *
   * An interface representing FeatureUnit.
   */
  export interface FeatureUnit {
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [symbol]
     */
    symbol?: string;
    /**
     * @member {string} [unitType]
     */
    unitType?: string;
  }

  /**
   *
   * An interface representing FeatureValue.
   */
  export interface FeatureValue {
    /**
     * @member {string} [value]
     */
    value?: string;
  }

  /**
   *
   * An interface representing Feature.
   */
  export interface Feature {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {boolean} [comparable]
     */
    comparable?: boolean;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {FeatureUnit} [featureUnit]
     */
    featureUnit?: FeatureUnit;
    /**
     * @member {FeatureValue[]} [featureValues]
     */
    featureValues?: FeatureValue[];
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {boolean} [range]
     */
    range?: boolean;
    /**
     * @member {string} [type]
     */
    type?: string;
  }

  /**
   *
   * An interface representing Classification.
   */
  export interface Classification {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {Feature[]} [features]
     */
    features?: Feature[];
    /**
     * @member {string} [name]
     */
    name?: string;
  }

  /**
   *
   * An interface representing FutureStock.
   */
  export interface FutureStock {
    /**
     * @member {Date} [date]
     */
    date?: Date;
    /**
     * @member {string} [formattedDate]
     */
    formattedDate?: string;
    /**
     * @member {Stock} [stock]
     */
    stock?: Stock;
  }

  /**
   *
   * An interface representing PriceRange.
   */
  export interface PriceRange {
    /**
     * @member {Price} [maxPrice]
     */
    maxPrice?: Price;
    /**
     * @member {Price} [minPrice]
     */
    minPrice?: Price;
  }

  /**
   *
   * An interface representing ProductReference.
   */
  export interface ProductReference {
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {boolean} [preselected]
     */
    preselected?: boolean;
    /**
     * @member {number} [quantity]
     */
    quantity?: number;
    /**
     * @member {string} [referenceType]
     */
    referenceType?: string;
    /**
     * @member {Product} [target]
     */
    target?: Product;
  }

  /**
   *
   * An interface representing Language.
   */
  export interface Language {
    /**
     * @member {boolean} [active]
     */
    active?: boolean;
    /**
     * @member {string} [isocode]
     */
    isocode?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [nativeName]
     */
    nativeName?: string;
  }

  /**
   *
   * An interface representing User.
   */
  export interface User {
    /**
     * @member {Currency} [currency]
     */
    currency?: Currency;
    /**
     * @member {string} [customerId]
     */
    customerId?: string;
    /**
     * @member {Date} [deactivationDate]
     */
    deactivationDate?: Date;
    /**
     * @member {Address} [defaultAddress]
     */
    defaultAddress?: Address;
    /**
     * @member {string} [displayUid]
     */
    displayUid?: string;
    /**
     * @member {string} [firstName]
     */
    firstName?: string;
    /**
     * @member {Language} [language]
     */
    language?: Language;
    /**
     * @member {string} [lastName]
     */
    lastName?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [title]
     */
    title?: string;
    /**
     * @member {string} [titleCode]
     */
    titleCode?: string;
    /**
     * @member {string} [uid]
     */
    uid?: string;
  }

  /**
   *
   * An interface representing Review.
   */
  export interface Review {
    /**
     * @member {string} [alias]
     */
    alias?: string;
    /**
     * @member {string} [comment]
     */
    comment?: string;
    /**
     * @member {Date} [date]
     */
    date?: Date;
    /**
     * @member {string} [headline]
     */
    headline?: string;
    /**
     * @member {string} [id]
     */
    id?: string;
    /**
     * @member {User} [principal]
     */
    principal?: User;
    /**
     * @member {number} [rating]
     */
    rating?: number;
  }

  /**
   *
   * An interface representing VariantCategory.
   */
  export interface VariantCategory {
    /**
     * @member {boolean} [hasImage]
     */
    hasImage?: boolean;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {number} [priority]
     */
    priority?: number;
  }

  /**
   *
   * An interface representing VariantValueCategory.
   */
  export interface VariantValueCategory {
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {number} [sequence]
     */
    sequence?: number;
    /**
     * @member {VariantCategory[]} [superCategories]
     */
    superCategories?: VariantCategory[];
  }

  /**
   *
   * An interface representing VariantMatrixElement.
   */
  export interface VariantMatrixElement {
    /**
     * @member {VariantMatrixElement[]} [elements]
     */
    elements?: VariantMatrixElement[];
    /**
     * @member {boolean} [isLeaf]
     */
    isLeaf?: boolean;
    /**
     * @member {VariantCategory} [parentVariantCategory]
     */
    parentVariantCategory?: VariantCategory;
    /**
     * @member {VariantOption} [variantOption]
     */
    variantOption?: VariantOption;
    /**
     * @member {VariantValueCategory} [variantValueCategory]
     */
    variantValueCategory?: VariantValueCategory;
  }

  /**
   *
   * An interface representing Product.
   */
  export interface Product {
    /**
     * @member {boolean} [availableForPickup]
     */
    availableForPickup?: boolean;
    /**
     * @member {number} [averageRating]
     */
    averageRating?: number;
    /**
     * @member {BaseOption[]} [baseOptions]
     */
    baseOptions?: BaseOption[];
    /**
     * @member {string} [baseProduct]
     */
    baseProduct?: string;
    /**
     * @member {Category[]} [categories]
     */
    categories?: Category[];
    /**
     * @member {Classification[]} [classifications]
     */
    classifications?: Classification[];
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {FutureStock[]} [futureStocks]
     */
    futureStocks?: FutureStock[];
    /**
     * @member {Image[]} [images]
     */
    images?: Image[];
    /**
     * @member {string} [manufacturer]
     */
    manufacturer?: string;
    /**
     * @member {boolean} [multidimensional]
     */
    multidimensional?: boolean;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {number} [numberOfReviews]
     */
    numberOfReviews?: number;
    /**
     * @member {Promotion[]} [potentialPromotions]
     */
    potentialPromotions?: Promotion[];
    /**
     * @member {Price} [price]
     */
    price?: Price;
    /**
     * @member {PriceRange} [priceRange]
     */
    priceRange?: PriceRange;
    /**
     * @member {ProductReference[]} [productReferences]
     */
    productReferences?: ProductReference[];
    /**
     * @member {boolean} [purchasable]
     */
    purchasable?: boolean;
    /**
     * @member {Review[]} [reviews]
     */
    reviews?: Review[];
    /**
     * @member {Stock} [stock]
     */
    stock?: Stock;
    /**
     * @member {string} [summary]
     */
    summary?: string;
    /**
     * @member {string} [url]
     */
    url?: string;
    /**
     * @member {VariantMatrixElement[]} [variantMatrix]
     */
    variantMatrix?: VariantMatrixElement[];
    /**
     * @member {VariantOption[]} [variantOptions]
     */
    variantOptions?: VariantOption[];
    /**
     * @member {string} [variantType]
     */
    variantType?: string;
    /**
     * @member {Price[]} [volumePrices]
     */
    volumePrices?: Price[];
    /**
     * @member {boolean} [volumePricesFlag]
     */
    volumePricesFlag?: boolean;
  }

  /**
   *
   * An interface representing OrderEntry.
   */
  export interface OrderEntry {
    /**
     * @member {Price} [basePrice]
     */
    basePrice?: Price;
    /**
     * @member {DeliveryMode} [deliveryMode]
     */
    deliveryMode?: DeliveryMode;
    /**
     * @member {PointOfService} [deliveryPointOfService]
     */
    deliveryPointOfService?: PointOfService;
    /**
     * @member {number} [entryNumber]
     */
    entryNumber?: number;
    /**
     * @member {Product} [product]
     */
    product?: Product;
    /**
     * @member {number} [quantity]
     */
    quantity?: number;
    /**
     * @member {Price} [totalPrice]
     */
    totalPrice?: Price;
    /**
     * @member {boolean} [updateable]
     */
    updateable?: boolean;
    /**
     * @member {StatusSummary[]} [statusSummaryList]
     */
    statusSummaryList?: StatusSummary[];
    /**
     * @member {ConfigurationInfo[]} [configurationInfos]
     */
    configurationInfos?: ConfigurationInfo[];
  }

  /**
   *
   * An interface representing ConfigurationInfo.
   * Provides information about configuration values of the entry.
   */
  export interface ConfigurationInfo {
    /**
     * @member {string} [configurationLabel]
     */
    configurationLabel?: string;
    /**
     * @member {string} [configurationValue]
     */
    configurationValue?: string;
    /**
     * @member {string} [configuratorType]
     */
    configuratorType?: string;
    /**
     * @member {string} [status]
     */
    status?: string;
  }

  /**
   * Possible order entry statuses
   */
  export enum OrderEntryStatus {
    Success = 'SUCCESS',
    Info = 'INFO',
    Warning = 'WARNING',
    Error = 'ERROR',
  }

  /**
   *
   * An interface representing StatusSummary.
   * Provides status including number of issues for configurable entry.
   */
  export interface StatusSummary {
    /**
     * @member {number} [numberOfIssues]
     */
    numberOfIssues?: number;
    /**
     * @member {string} [status]
     */
    status?: OrderEntryStatus;
  }

  /**
   *
   * An interface representing DeliveryOrderEntryGroup.
   */
  export interface DeliveryOrderEntryGroup {
    /**
     * @member {Address} [deliveryAddress]
     */
    deliveryAddress?: Address;
    /**
     * @member {OrderEntry[]} [entries]
     */
    entries?: OrderEntry[];
    /**
     * @member {number} [quantity]
     */
    quantity?: number;
    /**
     * @member {Price} [totalPriceWithTax]
     */
    totalPriceWithTax?: Price;
  }

  /**
   *
   * An interface representing PaymentDetails.
   */
  export interface PaymentDetails {
    /**
     * @member {string} [accountHolderName]
     */
    accountHolderName?: string;
    /**
     * @member {Address} [billingAddress]
     */
    billingAddress?: Address;
    /**
     * @member {string} [cardNumber]
     */
    cardNumber?: string;
    /**
     * @member {CardType} [cardType]
     */
    cardType?: CardType;
    /**
     * @member {string} [cvn]
     */
    cvn?: string;
    /**
     * @member {boolean} [defaultPayment]
     */
    defaultPayment?: boolean;
    /**
     * @member {string} [expiryMonth]
     */
    expiryMonth?: string;
    /**
     * @member {string} [expiryYear]
     */
    expiryYear?: string;
    /**
     * @member {string} [id]
     */
    id?: string;
    /**
     * @member {string} [issueNumber]
     */
    issueNumber?: string;
    /**
     * @member {boolean} [saved]
     */
    saved?: boolean;
    /**
     * @member {string} [startMonth]
     */
    startMonth?: string;
    /**
     * @member {string} [startYear]
     */
    startYear?: string;
    /**
     * @member {string} [subscriptionId]
     */
    subscriptionId?: string;
  }

  /**
   *
   * An interface representing PickupOrderEntryGroup.
   */
  export interface PickupOrderEntryGroup {
    /**
     * @member {PointOfService} [deliveryPointOfService]
     */
    deliveryPointOfService?: PointOfService;
    /**
     * @member {number} [distance]
     */
    distance?: number;
    /**
     * @member {OrderEntry[]} [entries]
     */
    entries?: OrderEntry[];
    /**
     * @member {number} [quantity]
     */
    quantity?: number;
    /**
     * @member {Price} [totalPriceWithTax]
     */
    totalPriceWithTax?: Price;
  }

  /**
   *
   * An interface representing Principal.
   */
  export interface Principal {
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [uid]
     */
    uid?: string;
  }

  /**
   *
   * An interface representing Cart.
   */
  export interface Cart {
    /**
     * @member {PromotionResult[]} [appliedOrderPromotions]
     */
    appliedOrderPromotions?: PromotionResult[];
    /**
     * @member {PromotionResult[]} [appliedProductPromotions]
     */
    appliedProductPromotions?: PromotionResult[];
    /**
     * @member {Voucher[]} [appliedVouchers]
     */
    appliedVouchers?: Voucher[];
    /**
     * @member {boolean} [calculated]
     */
    calculated?: boolean;
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {Address} [deliveryAddress]
     */
    deliveryAddress?: Address;
    /**
     * @member {Price} [deliveryCost]
     */
    deliveryCost?: Price;
    /**
     * @member {number} [deliveryItemsQuantity]
     */
    deliveryItemsQuantity?: number;
    /**
     * @member {DeliveryMode} [deliveryMode]
     */
    deliveryMode?: DeliveryMode;
    /**
     * @member {DeliveryOrderEntryGroup[]} [deliveryOrderGroups]
     */
    deliveryOrderGroups?: DeliveryOrderEntryGroup[];
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {OrderEntry[]} [entries]
     */
    entries?: OrderEntry[];
    /**
     * @member {Date} [expirationTime]
     */
    expirationTime?: Date;
    /**
     * @member {string} [guid]
     */
    guid?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {boolean} [net]
     */
    net?: boolean;
    /**
     * @member {Price} [orderDiscounts]
     */
    orderDiscounts?: Price;
    /**
     * @member {PaymentDetails} [paymentInfo]
     */
    paymentInfo?: PaymentDetails;
    /**
     * @member {number} [pickupItemsQuantity]
     */
    pickupItemsQuantity?: number;
    /**
     * @member {PickupOrderEntryGroup[]} [pickupOrderGroups]
     */
    pickupOrderGroups?: PickupOrderEntryGroup[];
    /**
     * @member {PromotionResult[]} [potentialOrderPromotions]
     */
    potentialOrderPromotions?: PromotionResult[];
    /**
     * @member {PromotionResult[]} [potentialProductPromotions]
     */
    potentialProductPromotions?: PromotionResult[];
    /**
     * @member {Price} [productDiscounts]
     */
    productDiscounts?: Price;
    /**
     * @member {Date} [saveTime]
     */
    saveTime?: Date;
    /**
     * @member {Principal} [savedBy]
     */
    savedBy?: Principal;
    /**
     * @member {string} [site]
     */
    site?: string;
    /**
     * @member {string} [store]
     */
    store?: string;
    /**
     * @member {Price} [subTotal]
     */
    subTotal?: Price;
    /**
     * @member {Price} [totalDiscounts]
     */
    totalDiscounts?: Price;
    /**
     * @member {number} [totalItems]
     */
    totalItems?: number;
    /**
     * @member {Price} [totalPrice]
     */
    totalPrice?: Price;
    /**
     * @member {Price} [totalPriceWithTax]
     */
    totalPriceWithTax?: Price;
    /**
     * @member {Price} [totalTax]
     */
    totalTax?: Price;
    /**
     * @member {number} [totalUnitCount]
     */
    totalUnitCount?: number;
    /**
     * @member {Principal} [user]
     */
    user?: Principal;
  }

  /**
   *
   * An interface representing CartList.
   */
  export interface CartList {
    /**
     * @member {Cart[]} [carts]
     */
    carts?: Cart[];
  }

  /**
   *
   * An interface representing CartModification.
   */
  export interface CartModification {
    /**
     * @member {boolean} [deliveryModeChanged]
     */
    deliveryModeChanged?: boolean;
    /**
     * @member {OrderEntry} [entry]
     */
    entry?: OrderEntry;
    /**
     * @member {number} [quantity]
     */
    quantity?: number;
    /**
     * @member {number} [quantityAdded]
     */
    quantityAdded?: number;
    /**
     * @member {string} [statusCode]
     */
    statusCode?: string;
    /**
     * @member {string} [statusMessage]
     */
    statusMessage?: string;
  }

  /**
   *
   * An interface representing CategoryHierarchy.
   */
  export interface CategoryHierarchy {
    /**
     * @member {string} [id]
     */
    id?: string;
    /**
     * @member {Date} [lastModified]
     */
    lastModified?: Date;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {CategoryHierarchy[]} [subcategories]
     */
    subcategories?: CategoryHierarchy[];
    /**
     * @member {string} [url]
     */
    url?: string;
  }

  /**
   *
   * An interface representing CatalogVersion.
   */
  export interface CatalogVersion {
    /**
     * @member {CategoryHierarchy[]} [categories]
     */
    categories?: CategoryHierarchy[];
    /**
     * @member {string} [id]
     */
    id?: string;
    /**
     * @member {Date} [lastModified]
     */
    lastModified?: Date;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [url]
     */
    url?: string;
  }

  /**
   *
   * An interface representing Catalog.
   */
  export interface Catalog {
    /**
     * @member {CatalogVersion[]} [catalogVersions]
     */
    catalogVersions?: CatalogVersion[];
    /**
     * @member {string} [id]
     */
    id?: string;
    /**
     * @member {Date} [lastModified]
     */
    lastModified?: Date;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [url]
     */
    url?: string;
  }

  /**
   *
   * An interface representing CatalogList.
   */
  export interface CatalogList {
    /**
     * @member {Catalog[]} [catalogs]
     */
    catalogs?: Catalog[];
  }

  /**
   *
   * An interface representing ComponentIDList.
   */
  export interface ComponentIDList {
    /**
     * @member {string[]} [idList]
     */
    idList?: string[];
  }

  /**
   *
   * An interface representing ConsignmentEntry.
   */
  export interface ConsignmentEntry {
    /**
     * @member {OrderEntry} [orderEntry]
     */
    orderEntry?: OrderEntry;
    /**
     * @member {number} [quantity]
     */
    quantity?: number;
    /**
     * @member {number} [shippedQuantity]
     */
    shippedQuantity?: number;
  }

  /**
   *
   * An interface representing Consignment.
   */
  export interface Consignment {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {PointOfService} [deliveryPointOfService]
     */
    deliveryPointOfService?: PointOfService;
    /**
     * @member {ConsignmentEntry[]} [entries]
     */
    entries?: ConsignmentEntry[];
    /**
     * @member {Address} [shippingAddress]
     */
    shippingAddress?: Address;
    /**
     * @member {string} [status]
     */
    status?: string;
    /**
     * @member {Date} [statusDate]
     */
    statusDate?: Date;
    /**
     * @member {string} [trackingID]
     */
    trackingID?: string;
  }

  /**
   *
   * An interface representing CountryList.
   */
  export interface CountryList {
    /**
     * @member {Country[]} [countries]
     */
    countries?: Country[];
  }

  /**
   *
   * An interface representing CurrencyList.
   */
  export interface CurrencyList {
    /**
     * @member {Currency[]} [currencies]
     */
    currencies?: Currency[];
  }

  /**
   * An interface representing CustomerCoupon
   */
  export interface CustomerCoupon {
    /**
     * @member {string} [couponId]
     */
    couponId?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {string} [startDate]
     */
    startDate?: string;
    /**
     * @member {string} [endDate]
     */
    endDate?: string;
    /**
     * @member {string} [endDate]
     */
    status?: string;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {boolean} [notificationOn]
     */
    notificationOn?: boolean;
    /**
     * @member {boolean} [allProductsApplicable]
     */
    allProductsApplicable?: boolean;
  }

  /**
   * An interface representing CustomerCouponSearchResult
   */
  export interface CustomerCouponSearchResult {
    /**
     * @member {CustomerCoupon[]} [coupons]
     */
    coupons?: CustomerCoupon[];
    /**
     * @member {Sort[]} [sorts]
     */
    sorts?: Sort[];
    /**
     * @member {Pagination} [pagination]
     */
    pagination?: Pagination;
  }

  /**
   *
   * An interface representing DeliveryModeList.
   */
  export interface DeliveryModeList {
    /**
     * @member {DeliveryMode[]} [deliveryModes]
     */
    deliveryModes?: DeliveryMode[];
  }

  /**
   *
   * An interface representing FacetValue.
   */
  export interface FacetValue {
    /**
     * @member {number} [count]
     */
    count?: number;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {SearchState} [query]
     */
    query?: SearchState;
    /**
     * @member {boolean} [selected]
     */
    selected?: boolean;
  }

  /**
   *
   * An interface representing Facet.
   */
  export interface Facet {
    /**
     * @member {boolean} [category]
     */
    category?: boolean;
    /**
     * @member {boolean} [multiSelect]
     */
    multiSelect?: boolean;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {number} [priority]
     */
    priority?: number;
    /**
     * @member {FacetValue[]} [topValues]
     */
    topValues?: FacetValue[];
    /**
     * @member {FacetValue[]} [values]
     */
    values?: FacetValue[];
    /**
     * @member {boolean} [visible]
     */
    visible?: boolean;
  }

  /**
   *
   * An interface representing LanguageList.
   */
  export interface LanguageList {
    /**
     * @member {Language[]} [languages]
     */
    languages?: Language[];
  }

  /**
   *
   * An interface representing Pagination.
   * Pagination info
   *
   */
  export interface Pagination {
    /**
     * @member {number} [count] Number of elements on this page
     */
    count?: number;
    /**
     * @member {number} [page] Current page number
     */
    page?: number;
    /**
     * @member {number} [totalCount] Total number of elements
     */
    totalCount?: number;
    /**
     * @member {number} [totalPages] Total number of pages
     */
    totalPages?: number;
  }

  /**
   *
   * An interface representing Sort.
   * Sort option
   *
   */
  export interface Sort {
    /**
     * @member {boolean} [asc]
     */
    asc?: boolean;
    /**
     * @member {string} [code]
     */
    code?: string;
  }

  /**
   *
   * An interface representing ListAdaptedComponents.
   */
  export interface ListAdaptedComponents {
    /**
     * @member {any[]} [components]
     */
    components?: any[];
    /**
     * @member {Pagination} [pagination]
     */
    pagination?: Pagination;
    /**
     * @member {Sort[]} [sorts]
     */
    sorts?: Sort[];
  }

  /**
   *
   * An interface representing MemberList.
   */
  export interface MemberList {
    /**
     * @member {Principal[]} [members]
     */
    members?: Principal[];
  }

  /**
   *
   * An interface representing OrderEntryList.
   */
  export interface OrderEntryList {
    /**
     * @member {OrderEntry[]} [orderEntries]
     */
    orderEntries?: OrderEntry[];
  }

  /**
   *
   * An interface representing OrderHistory.
   */
  export interface OrderHistory {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [guid]
     */
    guid?: string;
    /**
     * @member {Date} [placed]
     */
    placed?: Date;
    /**
     * @member {string} [status]
     */
    status?: string;
    /**
     * @member {string} [statusDisplay]
     */
    statusDisplay?: string;
    /**
     * @member {Price} [total]
     */
    total?: Price;
  }

  /**
   *
   * An interface representing PaginationModel.
   */
  export interface PaginationModel {
    /**
     * @member {number} [currentPage]
     */
    currentPage?: number;
    /**
     * @member {number} [pageSize]
     */
    pageSize?: number;
    /**
     * @member {string} [sort]
     */
    sort?: string;
    /**
     * @member {number} [totalPages]
     */
    totalPages?: number;
    /**
     * @member {number} [totalResults]
     */
    totalResults?: number;
  }

  /**
   *
   * An interface representing SortModel.
   */
  export interface SortModel {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {boolean} [selected]
     */
    selected?: boolean;
  }

  /**
   *
   * An interface representing OrderHistoryList.
   */
  export interface OrderHistoryList {
    /**
     * @member {OrderHistory[]} [orders]
     */
    orders?: OrderHistory[];
    /**
     * @member {PaginationModel} [pagination]
     */
    pagination?: PaginationModel;
    /**
     * @member {SortModel[]} [sorts]
     */
    sorts?: SortModel[];
  }

  /**
   *
   * An interface representing OrderStatusUpdateElement.
   */
  export interface OrderStatusUpdateElement {
    /**
     * @member {string} [baseSiteId]
     */
    baseSiteId?: string;
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [status]
     */
    status?: string;
  }

  /**
   *
   * An interface representing OrderStatusUpdateElementList.
   */
  export interface OrderStatusUpdateElementList {
    /**
     * @member {OrderStatusUpdateElement[]} [orderStatusUpdateElements]
     */
    orderStatusUpdateElements?: OrderStatusUpdateElement[];
  }

  /**
   *
   * An interface representing Order.
   */
  export interface Order {
    /**
     * @member {PromotionResult[]} [appliedOrderPromotions]
     */
    appliedOrderPromotions?: PromotionResult[];
    /**
     * @member {PromotionResult[]} [appliedProductPromotions]
     */
    appliedProductPromotions?: PromotionResult[];
    /**
     * @member {Voucher[]} [appliedVouchers]
     */
    appliedVouchers?: Voucher[];
    /**
     * @member {boolean} [calculated]
     */
    calculated?: boolean;
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {Consignment[]} [consignments]
     */
    consignments?: Consignment[];
    /**
     * @member {Date} [created]
     */
    created?: Date;
    /**
     * @member {Address} [deliveryAddress]
     */
    deliveryAddress?: Address;
    /**
     * @member {Price} [deliveryCost]
     */
    deliveryCost?: Price;
    /**
     * @member {number} [deliveryItemsQuantity]
     */
    deliveryItemsQuantity?: number;
    /**
     * @member {DeliveryMode} [deliveryMode]
     */
    deliveryMode?: DeliveryMode;
    /**
     * @member {DeliveryOrderEntryGroup[]} [deliveryOrderGroups]
     */
    deliveryOrderGroups?: DeliveryOrderEntryGroup[];
    /**
     * @member {string} [deliveryStatus]
     */
    deliveryStatus?: string;
    /**
     * @member {string} [deliveryStatusDisplay]
     */
    deliveryStatusDisplay?: string;
    /**
     * @member {OrderEntry[]} [entries]
     */
    entries?: OrderEntry[];
    /**
     * @member {boolean} [guestCustomer]
     */
    guestCustomer?: boolean;
    /**
     * @member {string} [guid]
     */
    guid?: string;
    /**
     * @member {boolean} [net]
     */
    net?: boolean;
    /**
     * @member {Price} [orderDiscounts]
     */
    orderDiscounts?: Price;
    /**
     * @member {PaymentDetails} [paymentInfo]
     */
    paymentInfo?: PaymentDetails;
    /**
     * @member {number} [pickupItemsQuantity]
     */
    pickupItemsQuantity?: number;
    /**
     * @member {PickupOrderEntryGroup[]} [pickupOrderGroups]
     */
    pickupOrderGroups?: PickupOrderEntryGroup[];
    /**
     * @member {Price} [productDiscounts]
     */
    productDiscounts?: Price;
    /**
     * @member {string} [site]
     */
    site?: string;
    /**
     * @member {string} [status]
     */
    status?: string;
    /**
     * @member {string} [statusDisplay]
     */
    statusDisplay?: string;
    /**
     * @member {string} [store]
     */
    store?: string;
    /**
     * @member {Price} [subTotal]
     */
    subTotal?: Price;
    /**
     * @member {Price} [totalDiscounts]
     */
    totalDiscounts?: Price;
    /**
     * @member {number} [totalItems]
     */
    totalItems?: number;
    /**
     * @member {Price} [totalPrice]
     */
    totalPrice?: Price;
    /**
     * @member {Price} [totalPriceWithTax]
     */
    totalPriceWithTax?: Price;
    /**
     * @member {Price} [totalTax]
     */
    totalTax?: Price;
    /**
     * @member {OrderEntry[]} [unconsignedEntries]
     */
    unconsignedEntries?: OrderEntry[];
    /**
     * @member {Principal} [user]
     */
    user?: Principal;
  }

  /**
   *
   * An interface representing ReturnRequest.
   */
  export interface ReturnRequest {
    /**
     * @member {boolean} [cancellable]
     */
    cancellable?: boolean;
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {Date} [creationTime]
     */
    creationTime?: Date;
    /**
     * @member {Price} [deliveryCost]
     */
    deliveryCost?: Price;
    /**
     * @member {order} [order]
     */
    order?: Order;
    /**
     * @member {boolean} [refundDeliveryCost]
     */
    refundDeliveryCost?: boolean;
    /**
     * @member {ReturnRequestEntry[]} [returnEntries]
     */
    returnEntries?: ReturnRequestEntry[];
    /**
     * @member {string} [returnLabelDownloadUrl]
     */
    returnLabelDownloadUrl?: string;
    /**
     * @member {string} [rma]
     */
    rma?: string;
    /**
     * @member {string} [status]
     */
    status?: string;
    /**
     * @member {Price} [subTotal]
     */
    subTotal?: Price;
    /**
     * @member {Price} [totalPrice]
     */
    totalPrice?: Price;
  }

  /**
   *
   * An interface representing ReturnRequestEntry.
   */
  export interface ReturnRequestEntry {
    /**
     * @member {OrderEntry} [orderEntry]
     */
    orderEntry?: OrderEntry;
    /**
     * @member {number} [expectedQuantity]
     */
    expectedQuantity?: number;
    /**
     * @member {Price} [refundAmount]
     */
    refundAmount?: Price;
  }

  /**
   *
   * An interface representing PaymentDetailsList.
   */
  export interface PaymentDetailsList {
    /**
     * @member {PaymentDetails[]} [payments]
     */
    payments?: PaymentDetails[];
  }

  /**
   *
   * An interface representing PointOfServiceStock.
   */
  export interface PointOfServiceStock {
    /**
     * @member {Address} [address]
     */
    address?: Address;
    /**
     * @member {string} [description]
     */
    description?: string;
    /**
     * @member {string} [displayName]
     */
    displayName?: string;
    /**
     * @member {number} [distanceKm]
     */
    distanceKm?: number;
    /**
     * @member {{ [propertyName: string]: string }} [features]
     */
    features?: { [propertyName: string]: string };
    /**
     * @member {string} [formattedDistance]
     */
    formattedDistance?: string;
    /**
     * @member {GeoPoint} [geoPoint]
     */
    geoPoint?: GeoPoint;
    /**
     * @member {Image} [mapIcon]
     */
    mapIcon?: Image;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {OpeningSchedule} [openingHours]
     */
    openingHours?: OpeningSchedule;
    /**
     * @member {Stock} [stockInfo]
     */
    stockInfo?: Stock;
    /**
     * @member {string} [storeContent]
     */
    storeContent?: string;
    /**
     * @member {Image[]} [storeImages]
     */
    storeImages?: Image[];
    /**
     * @member {string} [url]
     */
    url?: string;
  }

  /**
   *
   * An interface representing ProductExpressUpdateElement.
   */
  export interface ProductExpressUpdateElement {
    /**
     * @member {string} [catalogId]
     */
    catalogId?: string;
    /**
     * @member {string} [catalogVersion]
     */
    catalogVersion?: string;
    /**
     * @member {string} [code]
     */
    code?: string;
  }

  /**
   *
   * An interface representing ProductExpressUpdateElementList.
   */
  export interface ProductExpressUpdateElementList {
    /**
     * @member {ProductExpressUpdateElement[]} [productExpressUpdateElements]
     */
    productExpressUpdateElements?: ProductExpressUpdateElement[];
  }

  /**
   *
   * An interface representing ProductList.
   */
  export interface ProductList {
    /**
     * @member {string} [catalog]
     */
    catalog?: string;
    /**
     * @member {number} [currentPage]
     */
    currentPage?: number;
    /**
     * @member {Product[]} [products]
     */
    products?: Product[];
    /**
     * @member {number} [totalPageCount]
     */
    totalPageCount?: number;
    /**
     * @member {number} [totalProductCount]
     */
    totalProductCount?: number;
    /**
     * @member {string} [version]
     */
    version?: string;
  }

  /**
   *
   * An interface representing ProductReferenceList.
   */
  export interface ProductReferenceList {
    /**
     * @member {ProductReference[]} [references]
     */
    references?: ProductReference[];
  }

  /**
   *
   * An interface representing SpellingSuggestion.
   */
  export interface SpellingSuggestion {
    /**
     * @member {string} [query]
     */
    query?: string;
    /**
     * @member {string} [suggestion]
     */
    suggestion?: string;
  }

  /**
   *
   * An interface representing ProductSearchPage.
   */
  export interface ProductSearchPage {
    /**
     * @member {Breadcrumb[]} [breadcrumbs]
     */
    breadcrumbs?: Breadcrumb[];
    /**
     * @member {string} [categoryCode]
     */
    categoryCode?: string;
    /**
     * @member {SearchState} [currentQuery]
     */
    currentQuery?: SearchState;
    /**
     * @member {Facet[]} [facets]
     */
    facets?: Facet[];
    /**
     * @member {string} [freeTextSearch]
     */
    freeTextSearch?: string;
    /**
     * @member {string} [keywordRedirectUrl]
     */
    keywordRedirectUrl?: string;
    /**
     * @member {PaginationModel} [pagination]
     */
    pagination?: PaginationModel;
    /**
     * @member {Product[]} [products]
     */
    products?: Product[];
    /**
     * @member {SortModel[]} [sorts]
     */
    sorts?: SortModel[];
    /**
     * @member {SpellingSuggestion} [spellingSuggestion]
     */
    spellingSuggestion?: SpellingSuggestion;
  }

  /**
   *
   * An interface representing PromotionList.
   */
  export interface PromotionList {
    /**
     * @member {Promotion[]} [promotions]
     */
    promotions?: Promotion[];
  }

  /**
   *
   * An interface representing PromotionResultList.
   */
  export interface PromotionResultList {
    /**
     * @member {PromotionResult[]} [promotions]
     */
    promotions?: PromotionResult[];
  }

  /**
   *
   * An interface representing ReviewList.
   */
  export interface ReviewList {
    /**
     * @member {Review[]} [reviews]
     */
    reviews?: Review[];
  }

  /**
   *
   * An interface representing SaveCartResult.
   */
  export interface SaveCartResult {
    /**
     * @member {Cart} [savedCartData]
     */
    savedCartData?: Cart;
  }

  /**
   *
   * An interface representing StoreFinderSearchPage.
   */
  export interface StoreFinderSearchPage {
    /**
     * @member {number} [boundEastLongitude]
     */
    boundEastLongitude?: number;
    /**
     * @member {number} [boundNorthLatitude]
     */
    boundNorthLatitude?: number;
    /**
     * @member {number} [boundSouthLatitude]
     */
    boundSouthLatitude?: number;
    /**
     * @member {number} [boundWestLongitude]
     */
    boundWestLongitude?: number;
    /**
     * @member {string} [locationText]
     */
    locationText?: string;
    /**
     * @member {PaginationModel} [pagination]
     */
    pagination?: PaginationModel;
    /**
     * @member {SortModel[]} [sorts]
     */
    sorts?: SortModel[];
    /**
     * @member {number} [sourceLatitude]
     */
    sourceLatitude?: number;
    /**
     * @member {number} [sourceLongitude]
     */
    sourceLongitude?: number;
    /**
     * @member {PointOfService[]} [stores]
     */
    stores?: PointOfService[];
  }

  /**
   *
   * An interface representing StoreFinderStockSearchPage.
   */
  export interface StoreFinderStockSearchPage {
    /**
     * @member {number} [boundEastLongitude]
     */
    boundEastLongitude?: number;
    /**
     * @member {number} [boundNorthLatitude]
     */
    boundNorthLatitude?: number;
    /**
     * @member {number} [boundSouthLatitude]
     */
    boundSouthLatitude?: number;
    /**
     * @member {number} [boundWestLongitude]
     */
    boundWestLongitude?: number;
    /**
     * @member {string} [locationText]
     */
    locationText?: string;
    /**
     * @member {PaginationModel} [pagination]
     */
    pagination?: PaginationModel;
    /**
     * @member {Product} [product]
     */
    product?: Product;
    /**
     * @member {SortModel[]} [sorts]
     */
    sorts?: SortModel[];
    /**
     * @member {number} [sourceLatitude]
     */
    sourceLatitude?: number;
    /**
     * @member {number} [sourceLongitude]
     */
    sourceLongitude?: number;
    /**
     * @member {PointOfServiceStock[]} [stores]
     */
    stores?: PointOfServiceStock[];
  }

  /**
   *
   * An interface representing Suggestion.
   */
  export interface Suggestion {
    /**
     * @member {string} [value]
     */
    value?: string;
  }

  /**
   *
   * An interface representing SuggestionList.
   */
  export interface SuggestionList {
    /**
     * @member {Suggestion[]} [suggestions]
     */
    suggestions?: Suggestion[];
  }

  /**
   *
   * An interface representing Title.
   */
  export interface Title {
    /**
     * @member {string} [code]
     */
    code?: string;
    /**
     * @member {string} [name]
     */
    name?: string;
  }

  /**
   *
   * An interface representing TitleList.
   */
  export interface TitleList {
    /**
     * @member {Title[]} [titles]
     */
    titles?: Title[];
  }

  /**
   *
   * An interface representing UserGroup.
   */
  export interface UserGroup {
    /**
     * @member {Principal[]} [members]
     */
    members?: Principal[];
    /**
     * @member {number} [membersCount]
     */
    membersCount?: number;
    /**
     * @member {string} [name]
     */
    name?: string;
    /**
     * @member {UserGroup[]} [subGroups]
     */
    subGroups?: UserGroup[];
    /**
     * @member {string} [uid]
     */
    uid?: string;
  }

  export interface StoreCount {
    count?: number;
    isoCode?: string;
    name?: string;
    type?: string;
  }

  export interface StoreCountList {
    countriesAndRegionsStoreCount?: StoreCount[];
  }

  /**
   *
   * An interface representing VoucherList.
   */
  export interface VoucherList {
    /**
     * @member {Voucher[]} [vouchers]
     */
    vouchers?: Voucher[];
  }

  /**
   * Defines values for PriceType.
   * Possible values include: 'BUY', 'FROM'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: PriceType = <PriceType>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum PriceType {
    BUY = 'BUY',
    FROM = 'FROM',
  }

  /**
   * Defines values for ImageType.
   * Possible values include: 'PRIMARY', 'GALLERY'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: ImageType = <ImageType>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum ImageType {
    PRIMARY = 'PRIMARY',
    GALLERY = 'GALLERY',
  }

  /**
   * Defines values for Fields.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields = <Fields>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields1.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields1 = <Fields1>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields1 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields2.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields2 = <Fields2>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields2 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields3.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields3 = <Fields3>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields3 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields4.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields4 = <Fields4>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields4 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields5.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields5 = <Fields5>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields5 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields6.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields6 = <Fields6>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields6 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for PageType.
   * Possible values include: 'ContentPage', 'ProductPage', 'CategoryPage',
   * 'CatalogPage'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: PageType = <PageType>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum PageType {
    CONTENT_PAGE = 'ContentPage',
    PRODUCT_PAGE = 'ProductPage',
    CATEGORY_PAGE = 'CategoryPage',
    CATALOG_PAGE = 'CatalogPage',
  }

  /**
   * Defines values for Fields7.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields7 = <Fields7>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields7 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields8.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields8 = <Fields8>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields8 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields9.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields9 = <Fields9>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields9 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields10.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields10 = <Fields10>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields10 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields11.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields11 = <Fields11>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields11 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields12.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields12 = <Fields12>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields12 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields13.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields13 = <Fields13>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields13 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields14.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields14 = <Fields14>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields14 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields15.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields15 = <Fields15>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields15 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields16.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields16 = <Fields16>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields16 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for SortEnum.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: SortEnum = <SortEnum>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum SortEnum {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields17.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields17 = <Fields17>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields17 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields18.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields18 = <Fields18>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields18 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields19.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields19 = <Fields19>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields19 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields20.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields20 = <Fields20>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields20 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields21.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields21 = <Fields21>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields21 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields22.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields22 = <Fields22>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields22 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields23.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields23 = <Fields23>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields23 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields24.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields24 = <Fields24>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields24 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields25.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields25 = <Fields25>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields25 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields26.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields26 = <Fields26>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields26 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields27.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields27 = <Fields27>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields27 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields28.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields28 = <Fields28>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields28 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields29.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields29 = <Fields29>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields29 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields30.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields30 = <Fields30>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields30 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields31.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields31 = <Fields31>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields31 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields32.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields32 = <Fields32>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields32 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields33.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields33 = <Fields33>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields33 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields34.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields34 = <Fields34>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields34 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields35.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields35 = <Fields35>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields35 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields36.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields36 = <Fields36>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields36 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields37.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields37 = <Fields37>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields37 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields38.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields38 = <Fields38>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields38 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields39.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields39 = <Fields39>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields39 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields40.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields40 = <Fields40>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields40 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields41.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields41 = <Fields41>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields41 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields42.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields42 = <Fields42>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields42 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields43.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields43 = <Fields43>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields43 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields44.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields44 = <Fields44>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields44 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields45.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields45 = <Fields45>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields45 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields46.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields46 = <Fields46>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields46 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields47.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields47 = <Fields47>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields47 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields48.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields48 = <Fields48>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields48 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields49.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields49 = <Fields49>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields49 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields50.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields50 = <Fields50>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields50 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields51.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields51 = <Fields51>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields51 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields52.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields52 = <Fields52>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields52 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields53.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields53 = <Fields53>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields53 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields54.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields54 = <Fields54>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields54 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields55.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields55 = <Fields55>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields55 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields56.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields56 = <Fields56>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields56 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields57.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields57 = <Fields57>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields57 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields58.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields58 = <Fields58>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields58 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields59.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields59 = <Fields59>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields59 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields60.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields60 = <Fields60>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields60 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Fields61.
   * Possible values include: 'BASIC', 'DEFAULT', 'FULL'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Fields61 = <Fields61>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Fields61 {
    BASIC = 'BASIC',
    DEFAULT = 'DEFAULT',
    FULL = 'FULL',
  }

  /**
   * Defines values for Type.
   * Possible values include: 'all', 'product', 'order'
   * There could be more values for this enum apart from the ones defined here.If
   * you want to set a value that is not from the known values then you can do
   * the following:
   * let param: Type = <Type>"someUnknownValueThatWillStillBeValid";
   * @readonly
   * @enum {string}
   */
  export enum Type {
    All = 'all',
    Product = 'product',
    Order = 'order',
  }

  export interface AnonymousConsent {
    templateCode?: string;
    version?: number;
    consentState?: CONSENT_STATUS;
  }

  export enum CONSENT_STATUS {
    ANONYMOUS_CONSENT_GIVEN = 'GIVEN',
    ANONYMOUS_CONSENT_WITHDRAWN = 'WITHDRAWN',
  }

  export interface ConsentTemplate {
    id?: string;
    name?: string;
    description?: string;
    version?: number;
    currentConsent?: Consent;
  }

  export interface Consent {
    code?: string;
    consentGivenDate?: Date;
    consentWithdrawnDate?: Date;
  }

  export interface ConsentTemplateList {
    consentTemplates?: ConsentTemplate[];
  }

  export interface BaseSites {
    baseSites?: BaseSite[];
  }

  export interface BaseSite {
    channel?: string;
    defaultLanguage?: Language;
    defaultPreviewCatalogId?: string;
    defaultPreviewCategoryCode?: string;
    defaultPreviewProductCode?: string;
    locale?: string;
    name?: string;
    theme?: string;
    uid?: string;
    stores?: BaseStore[];
    urlPatterns?: string[];
    urlEncodingAttributes?: string[];
  }

  export interface BaseStore {
    currencies?: Currency[];
    defaultCurrency?: Currency;
    languages?: Language[];
    defaultLanguage?: Language;
  }

  export interface ProductInterestEntry {
    interestType?: NotificationType;
    dateAdded?: string;
    expirationDate?: string;
  }

  export interface ProductInterestEntryRelation {
    product?: Product;
    productInterestEntry?: ProductInterestEntry[];
  }

  export interface ProductInterestSearchResult {
    results?: ProductInterestEntryRelation[];
    sorts?: Sort[];
    pagination?: Pagination;
  }

  export enum NotificationType {
    BACK_IN_STOCK = 'BACK_IN_STOCK',
  }

  export interface Budget {
    active?: boolean;
    budget?: number;
    code?: string;
    currency?: Currency;
    endDate?: string;
    startDate?: string;
    name?: string;
    orgUnit?: B2BUnit;
    costCenters?: CostCenter[];
  }

  export interface BudgetsList {
    budgets?: Budget[];
    pagination?: PaginationModel;
    sorts?: SortModel[];
  }

  export interface CostCenter {
    active?: string;
    activeFlag?: boolean;
    code?: string;
    currency?: Currency;
    name?: string;
    originalCode?: string;
    unit?: B2BUnit;
  }

  export interface CostCentersList {
    costCenters: CostCenter[];
    pagination?: PaginationModel;
    sorts?: SortModel[];
  }

  // TODO(#8878): Which models we can remove from here?
  export interface OrgUnitUserGroup {
    members?: B2BUser[];
    membersCoun?: number;
    name?: string;
    orgUnit?: B2BUnit;
    permissions?: Permission[];
    roles?: any;
    selected?: boolean;
    subGroups?: any;
    uid?: string;
  }

  export interface OrgUnitUserGroupList {
    orgUnitUserGroups: OrgUnitUserGroup[];
    pagination?: PaginationModel;
    sorts?: SortModel[];
  }

  export interface B2BUnitNode {
    active?: boolean;
    children?: B2BUnitNode[];
    id?: string;
    name?: string;
    parent?: string;
  }

  export interface B2BUnitNodeList {
    unitNodes?: B2BUnitNode[];
  }

  export interface B2BUser extends User {
    active?: boolean;
    approvers?: [];
    orgUnit?: B2BUnit;
    roles?: string[];
    selected?: boolean;
  }

  export interface OrgUnitUserList {
    users: B2BUser[];
    pagination?: PaginationModel;
    sorts?: SortModel[];
  }

  export interface B2BApprovalProcess {
    code?: string;
    name?: string;
  }

  export interface B2BApprovalProcessList {
    approvalProcesses?: B2BApprovalProcess[];
  }

  export interface B2BUnit {
    active?: boolean;
    addresses?: Address[];
    uid?: string;
    name?: string;
    parentOrgUnit?: Partial<B2BUnit>;
    approvalProcess?: B2BApprovalProcess;
    administrators?: B2BUser[];
    approvers?: B2BUser[];
    customers?: B2BUser[];
    managers?: B2BUser[];
  }

  export interface OrderApprovalPermissionType {
    code?: string;
    name?: string;
  }

  export interface OrderApprovalPermissionTypeList {
    orderApprovalPermissionTypes?: OrderApprovalPermissionType[];
  }

  export enum Period {
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH',
    QUARTER = 'QUARTER',
    YEAR = 'YEAR',
  }

  export interface Permission {
    active?: boolean;
    code?: string;
    currency?: Currency;
    orderApprovalPermissionType?: OrderApprovalPermissionType;
    orgUnit?: B2BUnitNode;
    periodRange?: Period;
    selected?: boolean;
    treshold?: number;
  }

  export interface PermissionsList {
    orderApprovalPermissions?: Permission[];
    pagination?: PaginationModel;
    sorts?: SortModel[];
  }

  export interface ReplenishmentOrder {
    active?: boolean;
    appliedOrderPromotions?: PromotionResult[];
    appliedProductPromotions?: PromotionResult[];
    appliedVouchers?: Voucher[];
    calculated?: boolean;
    code?: string;
    costCenter?: CostCenter;
    deliveryAddress?: Address;
    deliveryCost?: Price;
    deliveryItemsQuantity?: number;
    deliveryMode?: DeliveryMode;
    deliveryOrderGroups?: DeliveryOrderEntryGroup[];
    description?: string;
    entries?: OrderEntry[];
    expirationTime?: string;
    firstDate?: string;
    guid?: string;
    name?: string;
    net?: boolean;
    orderDiscounts?: Price;
    paymentInfo?: PaymentDetails;
    paymentStatus?: string;
    paymentType?: PaymentType;
    pickupItemsQuantity?: number;
    pickupOrderGroups?: PickupOrderEntryGroup[];
    potentialOrderPromotions?: PromotionResult[];
    potentialProductPromotions?: PromotionResult[];
    productDiscounts?: Price;
    purchaseOrderNumber?: string;
    replenishmentOrderCode?: string;
    saveTime?: string;
    savedBy?: Principal;
    site?: string;
    store?: string;
    subTotal?: Price;
    totalDiscounts?: Price;
    totalItems?: number;
    totalPrice?: Price;
    totalPriceWithTax?: Price;
    totalTax?: Price;
    totalUnitCount?: number;
    trigger?: Trigger;
    user?: Principal;
  }

  export interface ReplenishmentOrderList {
    replenishmentOrders?: ReplenishmentOrder[];
    pagination?: PaginationModel;
    sorts?: SortModel[];
  }

  export interface Trigger {
    activationTime?: string;
    displayTimeTable?: string;
  }

  export interface ScheduleReplenishmentForm {
    daysOfWeek?: DaysOfWeek[];
    nthDayOfMonth?: string;
    numberOfDays?: string;
    numberOfWeeks?: string;
    recurrencePeriod?: string;
    replenishmentStartDate?: string;
  }

  export enum DaysOfWeek {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
    SATURDAY = 'SATURDAY',
    SUNDAY = 'SUNDAY',
  }

  export enum OrderApprovalDecisionValue {
    APPROVE = 'APPROVE',
    REJECT = 'REJECT',
  }
  export interface OrderApprovalDecision {
    decision?: OrderApprovalDecisionValue;
    comment?: string;
  }

  export interface OrderApprovalRecord {
    approver?: Principal;
    comments?: string;
    permissionTypes?: OrderApprovalPermissionType[];
    statusDisplay?: string;
  }

  export interface OrderApproval {
    approvalDecisionRequired?: boolean;
    code?: string;
    customerOrderApprovalRecords?: OrderApprovalRecord[];
    merchantOrderApprovalRecords?: OrderApprovalRecord[];
    order?: Order;
    trigger?: Trigger;
  }

  export interface OrderApprovalsList {
    orderApprovals?: OrderApproval[];
    pagination?: PaginationModel;
    sorts?: SortModel[];
  }

  export interface CartModificationList {
    cartModifications?: CartModification[];
  }
}
