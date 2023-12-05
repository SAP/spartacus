export declare namespace OccConfigurator {
    /**
     *
     * An interface representing the variant configuration consumed through OCC.
     */
    interface Configuration {
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
        rootProduct: string;
        kbKey?: KB;
        pricingEnabled?: boolean;
        hideBasePriceAndSelectedOptions?: boolean;
        immediateConflictResolution?: boolean;
        newConfiguration?: boolean;
    }
    interface KB {
        kbName?: string;
        kbLogsys?: string;
        kbVersion?: string;
        kbBuildNumber?: string;
    }
    interface Prices {
        configId: string;
        attributes?: Supplements[];
        pricingError?: boolean;
        showDeltaPrices?: boolean;
        priceSummary?: PriceSummary;
    }
    interface Supplements {
        csticUiKey: string;
        selectedValues: string[];
        priceSupplements: ValueSupplements[];
    }
    interface ValueSupplements {
        attributeValueKey: string;
        priceValue: PriceDetails;
        obsoletePriceValue: PriceDetails;
    }
    interface PriceSummary {
        basePrice?: PriceDetails;
        currentTotal?: PriceDetails;
        currentTotalSavings?: PriceSavingDetails;
        selectedOptions?: PriceDetails;
    }
    interface PriceDetails {
        currencyIso: string;
        formattedValue?: string;
        value: number;
    }
    interface PriceSavingDetails extends PriceDetails {
        maxQuantity?: number;
        minQuantity?: number;
    }
    interface Group {
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
    interface Attribute {
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
        intervalInDomain?: boolean;
        retractBlocked?: boolean;
        validationType?: string;
        visible?: boolean;
    }
    interface Value {
        key: string;
        name?: string;
        langDepName?: string;
        readonly?: boolean;
        selected?: boolean;
        images?: Image[];
    }
    interface AddToCartParameters {
        userId?: string;
        cartId?: string;
        product?: AddToCartProductData;
        quantity?: number;
        configId?: string;
    }
    interface UpdateConfigurationForCartEntryParameters {
        userId?: string;
        cartId?: string;
        product?: AddToCartProductData;
        quantity?: number;
        configId: string;
        entryNumber: string;
        configurationInfos: ConfigurationInfo[];
    }
    interface ConfigurationInfo {
        configuratorType: string;
    }
    interface AddToCartProductData {
        code?: string;
    }
    interface Overview {
        id: string;
        totalNumberOfIssues?: number;
        numberOfIncompleteCharacteristics?: number;
        numberOfConflicts?: number;
        groups?: GroupOverview[];
        pricing?: PriceSummary;
        productCode: string;
        appliedCsticFilter?: OverviewFilter[];
        groupFilterList?: OverviewFilter[];
    }
    interface OverviewFilter {
        key: string;
        selected?: boolean;
    }
    interface GroupOverview {
        id: string;
        groupDescription?: string;
        characteristicValues?: CharacteristicOverview[];
        subGroups?: GroupOverview[];
    }
    interface CharacteristicOverview {
        characteristic: string;
        characteristicId?: string;
        value: string;
        valueId?: string;
        price?: PriceDetails;
    }
    interface Image {
        imageType: ImageType;
        format: ImageFormatType;
        url?: string;
        altText?: string;
        galleryIndex?: number;
    }
    enum GroupType {
        CSTIC_GROUP = "CSTIC_GROUP",
        INSTANCE = "INSTANCE",
        CONFLICT_HEADER = "CONFLICT_HEADER",
        CONFLICT = "CONFLICT"
    }
    enum UiType {
        STRING = "STRING",
        NUMERIC = "NUMERIC",
        CHECK_BOX = "CHECK_BOX",
        CHECK_BOX_LIST = "CHECK_BOX_LIST",
        RADIO_BUTTON = "RADIO_BUTTON",
        RADIO_BUTTON_ADDITIONAL_INPUT = "RADIO_BUTTON_ADDITIONAL_INPUT",
        DROPDOWN = "DROPDOWN",
        DROPDOWN_ADDITIONAL_INPUT = "DROPDOWN_ADDITIONAL_INPUT",
        READ_ONLY = "READ_ONLY",
        NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
        SINGLE_SELECTION_IMAGE = "SINGLE_SELECTION_IMAGE",
        MULTI_SELECTION_IMAGE = "MULTI_SELECTION_IMAGE"
    }
    enum PriceType {
        BUY = "BUY"
    }
    enum ImageFormatType {
        VALUE_IMAGE = "VALUE_IMAGE",
        CSTIC_IMAGE = "CSTIC_IMAGE"
    }
    enum ImageType {
        PRIMARY = "PRIMARY",
        GALLERY = "GALLERY"
    }
    enum OverviewFilterEnum {
        VISIBLE = "PRIMARY",
        USER_INPUT = "USER_INPUT",
        PRICE_RELEVANT = "PRICE_RELEVANT"
    }
}
