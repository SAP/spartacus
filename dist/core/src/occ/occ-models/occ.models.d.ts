export declare namespace Occ {
    /**
     *
     * An interface representing Country.
     */
    interface Country {
        isocode?: string;
        name?: string;
    }
    /**
     *
     * An interface representing Region.
     */
    interface Region {
        countryIso?: string;
        isocode?: string;
        isocodeShort?: string;
        name?: string;
    }
    /**
     *
     * An interface representing RegionList.
     */
    interface RegionList {
        regions?: Region[];
    }
    interface AddressList {
        addresses?: Address[];
    }
    /**
     *
     * An interface representing Address.
     */
    interface Address {
        companyName?: string;
        country?: Country;
        defaultAddress?: boolean;
        email?: string;
        firstName?: string;
        formattedAddress?: string;
        id?: string;
        lastName?: string;
        line1?: string;
        line2?: string;
        phone?: string;
        cellphone?: string;
        postalCode?: string;
        region?: Region;
        district?: string;
        shippingAddress?: boolean;
        title?: string;
        titleCode?: string;
        town?: string;
        visibleInAddressBook?: boolean;
    }
    /**
     *
     * An interface representing AddressList.
     */
    interface AddressList {
        addresses?: Address[];
    }
    /**
     *
     * An interface representing ErrorModel.
     * Error message
     *
     */
    interface ErrorModel {
        /**
         * Descriptive, human readable error message.
         */
        message?: string;
        /**
         * Additional classification specific for each
         * error type e.g. 'noStock'.
         */
        reason?: string;
        /**
         * Identifier of the related object e.g. '1'.
         */
        subject?: string;
        /**
         * Type of the object related to the error
         * e.g. 'entry'.
         */
        subjectType?: string;
        /**
         * Type of the error e.g. 'LowStockError'.
         */
        type?: string;
    }
    /**
     *
     * An interface representing ErrorList.
     * List of errors
     *
     */
    interface ErrorList {
        errors?: ErrorModel[];
    }
    /**
     *
     * An interface representing AddressValidation.
     */
    interface AddressValidation {
        decision?: string;
        errors?: ErrorList;
        suggestedAddresses?: Address[];
    }
    /**
     *
     * An interface representing Price.
     */
    interface Price {
        currencyIso?: string;
        formattedValue?: string;
        maxQuantity?: number;
        minQuantity?: number;
        /**
         * Possible values include: 'BUY', 'FROM'
         */
        priceType?: PriceType;
        value?: number;
    }
    /**
     *
     * An interface representing Stock.
     */
    interface Stock {
        stockLevel?: number;
        stockLevelStatus?: string;
    }
    /**
     *
     * An interface representing Image.
     */
    interface Image {
        altText?: string;
        format?: string;
        galleryIndex?: number;
        /**
         * Possible values include: 'PRIMARY',
         * 'GALLERY'
         */
        imageType?: ImageType;
        url?: string;
    }
    /**
     *
     * An interface representing VariantOptionQualifier.
     */
    interface VariantOptionQualifier {
        image?: Image;
        name?: string;
        qualifier?: string;
        value?: string;
    }
    /**
     *
     * An interface representing VariantOption.
     */
    interface VariantOption {
        code?: string;
        priceData?: Price;
        stock?: Stock;
        url?: string;
        variantOptionQualifiers?: VariantOptionQualifier[];
    }
    /**
     *
     * An interface representing BaseOption.
     */
    interface BaseOption {
        options?: VariantOption[];
        selected?: VariantOption;
        variantType?: string;
    }
    /**
     *
     * An interface representing SearchQuery.
     */
    interface SearchQuery {
        value?: string;
    }
    /**
     *
     * An interface representing SearchState.
     */
    interface SearchState {
        query?: SearchQuery;
        url?: string;
    }
    /**
     *
     * An interface representing Breadcrumb.
     */
    interface Breadcrumb {
        facetCode?: string;
        facetName?: string;
        facetValueCode?: string;
        facetValueName?: string;
        removeQuery?: SearchState;
        truncateQuery?: SearchState;
    }
    /**
     *
     * An interface representing Component.
     */
    interface Component {
        modifiedTime?: Date;
        name?: string;
        otherProperties?: any;
        typeCode?: string;
        uid?: string;
    }
    /**
     *
     * An interface representing ComponentList.
     */
    interface ComponentList {
        component?: Component[] | any[];
    }
    /**
     *
     * An interface representing ContentSlot.
     */
    interface ContentSlot {
        components?: ComponentList;
        name?: string;
        position?: string;
        slotId?: string;
        slotShared?: boolean;
        slotStatus?: string;
        properties?: any;
    }
    /**
     *
     * An interface representing ContentSlotList.
     */
    interface ContentSlotList {
        contentSlot?: ContentSlot[];
    }
    /**
     *
     * An interface representing CMSPage.
     */
    interface CMSPage {
        contentSlots?: ContentSlotList;
        defaultPage?: boolean;
        name?: string;
        template?: string;
        title?: string;
        description?: string;
        typeCode?: string;
        uid?: string;
        label?: string;
        properties?: any;
        robotTag?: PageRobots;
    }
    /**
     * The page robot information is exposed with 4 string values.
     */
    enum PageRobots {
        INDEX_FOLLOW = "INDEX_FOLLOW",
        NOINDEX_FOLLOW = "NOINDEX_FOLLOW",
        INDEX_NOFOLLOW = "INDEX_NOFOLLOW",
        NOINDEX_NOFOLLOW = "NOINDEX_NOFOLLOW"
    }
    /**
     *
     * An interface representing CardType.
     */
    interface CardType {
        code?: string;
        name?: string;
    }
    /**
     *
     * An interface representing CardTypeList.
     */
    interface CardTypeList {
        cardTypes?: CardType[];
    }
    /**
     *
     * An interface representing PaymentType.
     */
    interface PaymentType {
        code?: string;
        displayName?: string;
    }
    /**
     *
     * An interface representing PaymentTypeList.
     */
    interface PaymentTypeList {
        paymentTypes?: PaymentType[];
    }
    /**
     *
     * An interface representing PromotionOrderEntryConsumed.
     */
    interface PromotionOrderEntryConsumed {
        adjustedUnitPrice?: number;
        code?: string;
        orderEntryNumber?: number;
        quantity?: number;
    }
    /**
     *
     * An interface representing PromotionRestriction.
     */
    interface PromotionRestriction {
        description?: string;
        restrictionType?: string;
    }
    /**
     *
     * An interface representing Promotion.
     */
    interface Promotion {
        code?: string;
        couldFireMessages?: string[];
        description?: string;
        enabled?: boolean;
        endDate?: Date;
        firedMessages?: string[];
        priority?: number;
        productBanner?: Image;
        promotionGroup?: string;
        promotionType?: string;
        restrictions?: PromotionRestriction[];
        startDate?: Date;
        title?: string;
    }
    /**
     *
     * An interface representing PromotionResult.
     */
    interface PromotionResult {
        consumedEntries?: PromotionOrderEntryConsumed[];
        description?: string;
        promotion?: Promotion;
    }
    /**
     *
     * An interface representing Currency.
     */
    interface Currency {
        active?: boolean;
        isocode?: string;
        name?: string;
        symbol?: string;
    }
    /**
     *
     * An interface representing Voucher.
     */
    interface Voucher {
        appliedValue?: Price;
        code?: string;
        currency?: Currency;
        description?: string;
        freeShipping?: boolean;
        name?: string;
        value?: number;
        valueFormatted?: string;
        valueString?: string;
        voucherCode?: string;
    }
    /**
     *
     * An interface representing DeliveryMode.
     */
    interface DeliveryMode {
        code?: string;
        deliveryCost?: Price;
        description?: string;
        name?: string;
    }
    /**
     *
     * An interface representing GeoPoint.
     */
    interface GeoPoint {
        latitude?: number;
        longitude?: number;
    }
    /**
     *
     * An interface representing Time.
     */
    interface Time {
        formattedHour?: string;
        hour?: number;
        minute?: number;
    }
    /**
     *
     * An interface representing SpecialOpeningDay.
     */
    interface SpecialOpeningDay {
        closed?: boolean;
        closingTime?: Time;
        comment?: string;
        date?: Date;
        formattedDate?: string;
        name?: string;
        openingTime?: Time;
    }
    /**
     *
     * An interface representing WeekdayOpeningDay.
     */
    interface WeekdayOpeningDay {
        closed?: boolean;
        closingTime?: Time;
        openingTime?: Time;
        weekDay?: string;
    }
    /**
     *
     * An interface representing OpeningSchedule.
     */
    interface OpeningSchedule {
        code?: string;
        name?: string;
        specialDayOpeningList?: SpecialOpeningDay[];
        weekDayOpeningList?: WeekdayOpeningDay[];
    }
    /**
     *
     * An interface representing PointOfService.
     */
    interface PointOfService {
        address?: Address;
        description?: string;
        displayName?: string;
        distanceKm?: number;
        features?: {
            [propertyName: string]: string;
        };
        formattedDistance?: string;
        geoPoint?: GeoPoint;
        mapIcon?: Image;
        name?: string;
        openingHours?: OpeningSchedule;
        storeContent?: string;
        storeImages?: Image[];
        url?: string;
    }
    /**
     *
     * An interface representing Category.
     */
    interface Category {
        code?: string;
        name?: string;
        image?: Image;
        url?: string;
    }
    /**
     *
     * An interface representing FeatureUnit.
     */
    interface FeatureUnit {
        name?: string;
        symbol?: string;
        unitType?: string;
    }
    /**
     *
     * An interface representing FeatureValue.
     */
    interface FeatureValue {
        value?: string;
    }
    /**
     *
     * An interface representing Feature.
     */
    interface Feature {
        code?: string;
        comparable?: boolean;
        description?: string;
        featureUnit?: FeatureUnit;
        featureValues?: FeatureValue[];
        name?: string;
        range?: boolean;
        type?: string;
    }
    /**
     *
     * An interface representing Classification.
     */
    interface Classification {
        code?: string;
        features?: Feature[];
        name?: string;
    }
    /**
     *
     * An interface representing FutureStock.
     */
    interface FutureStock {
        date?: Date;
        formattedDate?: string;
        stock?: Stock;
    }
    /**
     *
     * An interface representing PriceRange.
     */
    interface PriceRange {
        maxPrice?: Price;
        minPrice?: Price;
    }
    /**
     *
     * An interface representing ProductReference.
     */
    interface ProductReference {
        description?: string;
        preselected?: boolean;
        quantity?: number;
        referenceType?: string;
        target?: Product;
    }
    /**
     *
     * An interface representing Language.
     */
    interface Language {
        active?: boolean;
        isocode?: string;
        name?: string;
        nativeName?: string;
    }
    /**
     *
     * An interface representing User.
     */
    interface User {
        currency?: Currency;
        customerId?: string;
        deactivationDate?: Date;
        defaultAddress?: Address;
        displayUid?: string;
        firstName?: string;
        language?: Language;
        lastName?: string;
        name?: string;
        title?: string;
        titleCode?: string;
        uid?: string;
    }
    /**
     *
     * An interface representing Review.
     */
    interface Review {
        alias?: string;
        comment?: string;
        date?: Date;
        headline?: string;
        id?: string;
        principal?: User;
        rating?: number;
    }
    /**
     *
     * An interface representing VariantCategory.
     */
    interface VariantCategory {
        hasImage?: boolean;
        name?: string;
        priority?: number;
    }
    /**
     *
     * An interface representing VariantValueCategory.
     */
    interface VariantValueCategory {
        name?: string;
        sequence?: number;
        superCategories?: VariantCategory[];
    }
    /**
     *
     * An interface representing VariantMatrixElement.
     */
    interface VariantMatrixElement {
        elements?: VariantMatrixElement[];
        isLeaf?: boolean;
        parentVariantCategory?: VariantCategory;
        variantOption?: VariantOption;
        variantValueCategory?: VariantValueCategory;
    }
    /**
     *
     * An interface representing Product.
     */
    interface Product {
        availableForPickup?: boolean;
        averageRating?: number;
        baseOptions?: BaseOption[];
        baseProduct?: string;
        categories?: Category[];
        classifications?: Classification[];
        code?: string;
        description?: string;
        futureStocks?: FutureStock[];
        images?: Image[];
        manufacturer?: string;
        multidimensional?: boolean;
        name?: string;
        numberOfReviews?: number;
        potentialPromotions?: Promotion[];
        price?: Price;
        priceRange?: PriceRange;
        productReferences?: ProductReference[];
        purchasable?: boolean;
        reviews?: Review[];
        stock?: Stock;
        summary?: string;
        url?: string;
        variantMatrix?: VariantMatrixElement[];
        variantOptions?: VariantOption[];
        variantType?: string;
        volumePrices?: Price[];
        volumePricesFlag?: boolean;
    }
    /**
     *
     * An interface representing OrderEntry.
     */
    interface OrderEntry {
        basePrice?: Price;
        deliveryMode?: DeliveryMode;
        deliveryPointOfService?: PointOfService;
        entryNumber?: number;
        product?: Product;
        quantity?: number;
        totalPrice?: Price;
        updateable?: boolean;
        statusSummaryList?: StatusSummary[];
        configurationInfos?: ConfigurationInfo[];
    }
    /**
     *
     * An interface representing ConfigurationInfo.
     * Provides information about configuration values of the entry.
     */
    interface ConfigurationInfo {
        configurationLabel?: string;
        configurationValue?: string;
        configuratorType?: string;
        status?: string;
    }
    /**
     * Possible order entry statuses
     */
    enum OrderEntryStatus {
        Success = "SUCCESS",
        Info = "INFO",
        Warning = "WARNING",
        Error = "ERROR"
    }
    /**
     *
     * An interface representing StatusSummary.
     * Provides status including number of issues for configurable entry.
     */
    interface StatusSummary {
        numberOfIssues?: number;
        status?: OrderEntryStatus;
    }
    /**
     *
     * An interface representing DeliveryOrderEntryGroup.
     */
    interface DeliveryOrderEntryGroup {
        deliveryAddress?: Address;
        entries?: OrderEntry[];
        quantity?: number;
        totalPriceWithTax?: Price;
    }
    /**
     *
     * An interface representing PaymentDetails.
     */
    interface PaymentDetails {
        accountHolderName?: string;
        billingAddress?: Address;
        cardNumber?: string;
        cardType?: CardType;
        cvn?: string;
        defaultPayment?: boolean;
        expiryMonth?: string;
        expiryYear?: string;
        id?: string;
        issueNumber?: string;
        saved?: boolean;
        startMonth?: string;
        startYear?: string;
        subscriptionId?: string;
    }
    /**
     *
     * An interface representing PickupOrderEntryGroup.
     */
    interface PickupOrderEntryGroup {
        deliveryPointOfService?: PointOfService;
        distance?: number;
        entries?: OrderEntry[];
        quantity?: number;
        totalPriceWithTax?: Price;
    }
    /**
     *
     * An interface representing Principal.
     */
    interface Principal {
        name?: string;
        uid?: string;
    }
    /**
     *
     * An interface representing Cart.
     */
    interface Cart {
        appliedOrderPromotions?: PromotionResult[];
        appliedProductPromotions?: PromotionResult[];
        appliedVouchers?: Voucher[];
        calculated?: boolean;
        code?: string;
        deliveryAddress?: Address;
        deliveryCost?: Price;
        deliveryItemsQuantity?: number;
        deliveryMode?: DeliveryMode;
        deliveryOrderGroups?: DeliveryOrderEntryGroup[];
        description?: string;
        entries?: OrderEntry[];
        expirationTime?: Date;
        guid?: string;
        name?: string;
        net?: boolean;
        orderDiscounts?: Price;
        paymentInfo?: PaymentDetails;
        pickupItemsQuantity?: number;
        pickupOrderGroups?: PickupOrderEntryGroup[];
        potentialOrderPromotions?: PromotionResult[];
        potentialProductPromotions?: PromotionResult[];
        productDiscounts?: Price;
        saveTime?: Date;
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
        user?: Principal;
    }
    /**
     *
     * An interface representing CartList.
     */
    interface CartList {
        carts?: Cart[];
    }
    /**
     *
     * An interface representing CartModification.
     */
    interface CartModification {
        deliveryModeChanged?: boolean;
        entry?: OrderEntry;
        quantity?: number;
        quantityAdded?: number;
        statusCode?: string;
        statusMessage?: string;
    }
    /**
     *
     * An interface representing CategoryHierarchy.
     */
    interface CategoryHierarchy {
        id?: string;
        lastModified?: Date;
        name?: string;
        subcategories?: CategoryHierarchy[];
        url?: string;
    }
    /**
     *
     * An interface representing CatalogVersion.
     */
    interface CatalogVersion {
        categories?: CategoryHierarchy[];
        id?: string;
        lastModified?: Date;
        name?: string;
        url?: string;
    }
    /**
     *
     * An interface representing Catalog.
     */
    interface Catalog {
        catalogVersions?: CatalogVersion[];
        id?: string;
        lastModified?: Date;
        name?: string;
        url?: string;
    }
    /**
     *
     * An interface representing CatalogList.
     */
    interface CatalogList {
        catalogs?: Catalog[];
    }
    /**
     *
     * An interface representing ComponentIDList.
     */
    interface ComponentIDList {
        idList?: string[];
    }
    /**
     *
     * An interface representing ConsignmentEntry.
     */
    interface ConsignmentEntry {
        orderEntry?: OrderEntry;
        quantity?: number;
        shippedQuantity?: number;
    }
    /**
     *
     * An interface representing Consignment.
     */
    interface Consignment {
        code?: string;
        deliveryPointOfService?: PointOfService;
        entries?: ConsignmentEntry[];
        shippingAddress?: Address;
        status?: string;
        statusDate?: Date;
        trackingID?: string;
    }
    /**
     *
     * An interface representing CountryList.
     */
    interface CountryList {
        countries?: Country[];
    }
    /**
     *
     * An interface representing CurrencyList.
     */
    interface CurrencyList {
        currencies?: Currency[];
    }
    /**
     * An interface representing CustomerCoupon
     */
    interface CustomerCoupon {
        couponId?: string;
        name?: string;
        startDate?: string;
        endDate?: string;
        status?: string;
        description?: string;
        notificationOn?: boolean;
        allProductsApplicable?: boolean;
    }
    /**
     * An interface representing CustomerCouponSearchResult
     */
    interface CustomerCouponSearchResult {
        coupons?: CustomerCoupon[];
        sorts?: Sort[];
        pagination?: Pagination;
    }
    /**
     *
     * An interface representing DeliveryModeList.
     */
    interface DeliveryModeList {
        deliveryModes?: DeliveryMode[];
    }
    /**
     *
     * An interface representing FacetValue.
     */
    interface FacetValue {
        count?: number;
        name?: string;
        query?: SearchState;
        selected?: boolean;
    }
    /**
     *
     * An interface representing Facet.
     */
    interface Facet {
        category?: boolean;
        multiSelect?: boolean;
        name?: string;
        priority?: number;
        topValues?: FacetValue[];
        values?: FacetValue[];
        visible?: boolean;
    }
    /**
     *
     * An interface representing LanguageList.
     */
    interface LanguageList {
        languages?: Language[];
    }
    /**
     *
     * An interface representing Pagination.
     * Pagination info
     *
     */
    interface Pagination {
        /**
         * Number of elements on this page
         */
        count?: number;
        /**
         * Current page number
         */
        page?: number;
        /**
         * Total number of elements
         */
        totalCount?: number;
        /**
         * Total number of pages
         */
        totalPages?: number;
    }
    /**
     *
     * An interface representing Sort.
     * Sort option
     *
     */
    interface Sort {
        asc?: boolean;
        code?: string;
    }
    /**
     *
     * An interface representing ListAdaptedComponents.
     */
    interface ListAdaptedComponents {
        components?: any[];
        pagination?: Pagination;
        sorts?: Sort[];
    }
    /**
     *
     * An interface representing MemberList.
     */
    interface MemberList {
        members?: Principal[];
    }
    /**
     *
     * An interface representing OrderEntryList.
     */
    interface OrderEntryList {
        orderEntries?: OrderEntry[];
    }
    /**
     *
     * An interface representing OrderHistory.
     */
    interface OrderHistory {
        code?: string;
        guid?: string;
        placed?: Date;
        status?: string;
        statusDisplay?: string;
        total?: Price;
    }
    /**
     *
     * An interface representing PaginationModel.
     */
    interface PaginationModel {
        currentPage?: number;
        pageSize?: number;
        sort?: string;
        totalPages?: number;
        totalResults?: number;
    }
    /**
     *
     * An interface representing SortModel.
     */
    interface SortModel {
        code?: string;
        name?: string;
        selected?: boolean;
    }
    /**
     *
     * An interface representing OrderHistoryList.
     */
    interface OrderHistoryList {
        orders?: OrderHistory[];
        pagination?: PaginationModel;
        sorts?: SortModel[];
    }
    /**
     *
     * An interface representing OrderStatusUpdateElement.
     */
    interface OrderStatusUpdateElement {
        baseSiteId?: string;
        code?: string;
        status?: string;
    }
    /**
     *
     * An interface representing OrderStatusUpdateElementList.
     */
    interface OrderStatusUpdateElementList {
        orderStatusUpdateElements?: OrderStatusUpdateElement[];
    }
    /**
     *
     * An interface representing Order.
     */
    interface Order {
        appliedOrderPromotions?: PromotionResult[];
        appliedProductPromotions?: PromotionResult[];
        appliedVouchers?: Voucher[];
        calculated?: boolean;
        code?: string;
        consignments?: Consignment[];
        created?: Date;
        deliveryAddress?: Address;
        deliveryCost?: Price;
        deliveryItemsQuantity?: number;
        deliveryMode?: DeliveryMode;
        deliveryOrderGroups?: DeliveryOrderEntryGroup[];
        deliveryStatus?: string;
        deliveryStatusDisplay?: string;
        entries?: OrderEntry[];
        guestCustomer?: boolean;
        guid?: string;
        net?: boolean;
        orderDiscounts?: Price;
        paymentInfo?: PaymentDetails;
        pickupItemsQuantity?: number;
        pickupOrderGroups?: PickupOrderEntryGroup[];
        productDiscounts?: Price;
        site?: string;
        status?: string;
        statusDisplay?: string;
        store?: string;
        subTotal?: Price;
        totalDiscounts?: Price;
        totalItems?: number;
        totalPrice?: Price;
        totalPriceWithTax?: Price;
        totalTax?: Price;
        unconsignedEntries?: OrderEntry[];
        user?: Principal;
    }
    /**
     *
     * An interface representing ReturnRequest.
     */
    interface ReturnRequest {
        cancellable?: boolean;
        code?: string;
        creationTime?: Date;
        deliveryCost?: Price;
        order?: Order;
        refundDeliveryCost?: boolean;
        returnEntries?: ReturnRequestEntry[];
        returnLabelDownloadUrl?: string;
        rma?: string;
        status?: string;
        subTotal?: Price;
        totalPrice?: Price;
    }
    /**
     *
     * An interface representing ReturnRequestEntry.
     */
    interface ReturnRequestEntry {
        orderEntry?: OrderEntry;
        expectedQuantity?: number;
        refundAmount?: Price;
    }
    /**
     *
     * An interface representing PaymentDetailsList.
     */
    interface PaymentDetailsList {
        payments?: PaymentDetails[];
    }
    /**
     *
     * An interface representing PointOfServiceStock.
     */
    interface PointOfServiceStock {
        address?: Address;
        description?: string;
        displayName?: string;
        distanceKm?: number;
        features?: {
            [propertyName: string]: string;
        };
        formattedDistance?: string;
        geoPoint?: GeoPoint;
        mapIcon?: Image;
        name?: string;
        openingHours?: OpeningSchedule;
        stockInfo?: Stock;
        storeContent?: string;
        storeImages?: Image[];
        url?: string;
    }
    /**
     *
     * An interface representing ProductExpressUpdateElement.
     */
    interface ProductExpressUpdateElement {
        catalogId?: string;
        catalogVersion?: string;
        code?: string;
    }
    /**
     *
     * An interface representing ProductExpressUpdateElementList.
     */
    interface ProductExpressUpdateElementList {
        productExpressUpdateElements?: ProductExpressUpdateElement[];
    }
    /**
     *
     * An interface representing ProductList.
     */
    interface ProductList {
        catalog?: string;
        currentPage?: number;
        products?: Product[];
        totalPageCount?: number;
        totalProductCount?: number;
        version?: string;
    }
    /**
     *
     * An interface representing ProductReferenceList.
     */
    interface ProductReferenceList {
        references?: ProductReference[];
    }
    /**
     *
     * An interface representing SpellingSuggestion.
     */
    interface SpellingSuggestion {
        query?: string;
        suggestion?: string;
    }
    /**
     *
     * An interface representing ProductSearchPage.
     */
    interface ProductSearchPage {
        breadcrumbs?: Breadcrumb[];
        categoryCode?: string;
        currentQuery?: SearchState;
        facets?: Facet[];
        freeTextSearch?: string;
        keywordRedirectUrl?: string;
        pagination?: PaginationModel;
        products?: Product[];
        sorts?: SortModel[];
        spellingSuggestion?: SpellingSuggestion;
    }
    /**
     *
     * An interface representing PromotionList.
     */
    interface PromotionList {
        promotions?: Promotion[];
    }
    /**
     *
     * An interface representing PromotionResultList.
     */
    interface PromotionResultList {
        promotions?: PromotionResult[];
    }
    /**
     *
     * An interface representing ReviewList.
     */
    interface ReviewList {
        reviews?: Review[];
    }
    /**
     *
     * An interface representing SaveCartResult.
     */
    interface SaveCartResult {
        savedCartData?: Cart;
    }
    /**
     *
     * An interface representing StoreFinderSearchPage.
     */
    interface StoreFinderSearchPage {
        boundEastLongitude?: number;
        boundNorthLatitude?: number;
        boundSouthLatitude?: number;
        boundWestLongitude?: number;
        locationText?: string;
        pagination?: PaginationModel;
        sorts?: SortModel[];
        sourceLatitude?: number;
        sourceLongitude?: number;
        stores?: PointOfService[];
    }
    /**
     *
     * An interface representing StoreFinderStockSearchPage.
     */
    interface StoreFinderStockSearchPage {
        boundEastLongitude?: number;
        boundNorthLatitude?: number;
        boundSouthLatitude?: number;
        boundWestLongitude?: number;
        locationText?: string;
        pagination?: PaginationModel;
        product?: Product;
        sorts?: SortModel[];
        sourceLatitude?: number;
        sourceLongitude?: number;
        stores?: PointOfServiceStock[];
    }
    /**
     *
     * An interface representing Suggestion.
     */
    interface Suggestion {
        value?: string;
    }
    /**
     *
     * An interface representing SuggestionList.
     */
    interface SuggestionList {
        suggestions?: Suggestion[];
    }
    /**
     *
     * An interface representing Title.
     */
    interface Title {
        code?: string;
        name?: string;
    }
    /**
     *
     * An interface representing TitleList.
     */
    interface TitleList {
        titles?: Title[];
    }
    /**
     *
     * An interface representing UserGroup.
     */
    interface UserGroup {
        members?: Principal[];
        membersCount?: number;
        name?: string;
        subGroups?: UserGroup[];
        uid?: string;
    }
    interface StoreCount {
        count?: number;
        isoCode?: string;
        name?: string;
        type?: string;
    }
    interface StoreCountList {
        countriesAndRegionsStoreCount?: StoreCount[];
    }
    /**
     *
     * An interface representing VoucherList.
     */
    interface VoucherList {
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
    enum PriceType {
        BUY = "BUY",
        FROM = "FROM"
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
    enum ImageType {
        PRIMARY = "PRIMARY",
        GALLERY = "GALLERY"
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
    enum Fields {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields1 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields2 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields3 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields4 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields5 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields6 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum PageType {
        CONTENT_PAGE = "ContentPage",
        PRODUCT_PAGE = "ProductPage",
        CATEGORY_PAGE = "CategoryPage",
        CATALOG_PAGE = "CatalogPage"
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
    enum Fields7 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields8 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields9 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields10 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields11 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields12 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields13 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields14 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields15 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields16 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum SortEnum {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields17 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields18 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields19 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields20 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields21 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields22 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields23 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields24 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields25 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields26 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields27 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields28 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields29 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields30 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields31 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields32 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields33 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields34 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields35 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields36 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields37 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields38 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields39 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields40 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields41 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields42 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields43 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields44 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields45 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields46 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields47 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields48 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields49 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields50 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields51 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields52 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields53 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields54 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields55 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields56 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields57 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields58 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields59 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields60 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Fields61 {
        BASIC = "BASIC",
        DEFAULT = "DEFAULT",
        FULL = "FULL"
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
    enum Type {
        All = "all",
        Product = "product",
        Order = "order"
    }
    interface AnonymousConsent {
        templateCode?: string;
        version?: number;
        consentState?: CONSENT_STATUS;
    }
    enum CONSENT_STATUS {
        ANONYMOUS_CONSENT_GIVEN = "GIVEN",
        ANONYMOUS_CONSENT_WITHDRAWN = "WITHDRAWN"
    }
    interface ConsentTemplate {
        id?: string;
        name?: string;
        description?: string;
        version?: number;
        currentConsent?: Consent;
    }
    interface Consent {
        code?: string;
        consentGivenDate?: Date;
        consentWithdrawnDate?: Date;
    }
    interface ConsentTemplateList {
        consentTemplates?: ConsentTemplate[];
    }
    interface BaseSites {
        baseSites?: BaseSite[];
    }
    interface BaseSite {
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
        requiresAuthentication?: boolean;
    }
    interface BaseStore {
        currencies?: Currency[];
        defaultCurrency?: Currency;
        languages?: Language[];
        defaultLanguage?: Language;
    }
    interface ProductInterestEntry {
        interestType?: NotificationType;
        dateAdded?: string;
        expirationDate?: string;
    }
    interface ProductInterestEntryRelation {
        product?: Product;
        productInterestEntry?: ProductInterestEntry[];
    }
    interface ProductInterestSearchResult {
        results?: ProductInterestEntryRelation[];
        sorts?: Sort[];
        pagination?: Pagination;
    }
    enum NotificationType {
        BACK_IN_STOCK = "BACK_IN_STOCK"
    }
    interface Budget {
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
    interface BudgetsList {
        budgets?: Budget[];
        pagination?: PaginationModel;
        sorts?: SortModel[];
    }
    interface CostCenter {
        active?: string;
        activeFlag?: boolean;
        code?: string;
        currency?: Currency;
        name?: string;
        originalCode?: string;
        unit?: B2BUnit;
    }
    interface CostCentersList {
        costCenters: CostCenter[];
        pagination?: PaginationModel;
        sorts?: SortModel[];
    }
    interface OrgUnitUserGroup {
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
    interface OrgUnitUserGroupList {
        orgUnitUserGroups: OrgUnitUserGroup[];
        pagination?: PaginationModel;
        sorts?: SortModel[];
    }
    interface B2BUnitNode {
        active?: boolean;
        children?: B2BUnitNode[];
        id?: string;
        name?: string;
        parent?: string;
    }
    interface B2BUnitNodeList {
        unitNodes?: B2BUnitNode[];
    }
    interface B2BUser extends User {
        active?: boolean;
        approvers?: [];
        orgUnit?: B2BUnit;
        roles?: string[];
        selected?: boolean;
    }
    interface OrgUnitUserList {
        users: B2BUser[];
        pagination?: PaginationModel;
        sorts?: SortModel[];
    }
    interface B2BApprovalProcess {
        code?: string;
        name?: string;
    }
    interface B2BApprovalProcessList {
        approvalProcesses?: B2BApprovalProcess[];
    }
    interface B2BUnit {
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
    interface OrderApprovalPermissionType {
        code?: string;
        name?: string;
    }
    interface OrderApprovalPermissionTypeList {
        orderApprovalPermissionTypes?: OrderApprovalPermissionType[];
    }
    enum Period {
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        QUARTER = "QUARTER",
        YEAR = "YEAR"
    }
    interface Permission {
        active?: boolean;
        code?: string;
        currency?: Currency;
        orderApprovalPermissionType?: OrderApprovalPermissionType;
        orgUnit?: B2BUnitNode;
        periodRange?: Period;
        selected?: boolean;
        treshold?: number;
    }
    interface PermissionsList {
        orderApprovalPermissions?: Permission[];
        pagination?: PaginationModel;
        sorts?: SortModel[];
    }
    interface ReplenishmentOrder {
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
    interface ReplenishmentOrderList {
        replenishmentOrders?: ReplenishmentOrder[];
        pagination?: PaginationModel;
        sorts?: SortModel[];
    }
    interface Trigger {
        activationTime?: string;
        displayTimeTable?: string;
    }
    interface ScheduleReplenishmentForm {
        daysOfWeek?: DaysOfWeek[];
        nthDayOfMonth?: string;
        numberOfDays?: string;
        numberOfWeeks?: string;
        recurrencePeriod?: string;
        replenishmentStartDate?: string;
    }
    enum DaysOfWeek {
        MONDAY = "MONDAY",
        TUESDAY = "TUESDAY",
        WEDNESDAY = "WEDNESDAY",
        THURSDAY = "THURSDAY",
        FRIDAY = "FRIDAY",
        SATURDAY = "SATURDAY",
        SUNDAY = "SUNDAY"
    }
    enum OrderApprovalDecisionValue {
        APPROVE = "APPROVE",
        REJECT = "REJECT"
    }
    interface OrderApprovalDecision {
        decision?: OrderApprovalDecisionValue;
        comment?: string;
    }
    interface OrderApprovalRecord {
        approver?: Principal;
        comments?: string;
        permissionTypes?: OrderApprovalPermissionType[];
        statusDisplay?: string;
    }
    interface OrderApproval {
        approvalDecisionRequired?: boolean;
        code?: string;
        customerOrderApprovalRecords?: OrderApprovalRecord[];
        merchantOrderApprovalRecords?: OrderApprovalRecord[];
        order?: Order;
        trigger?: Trigger;
    }
    interface OrderApprovalsList {
        orderApprovals?: OrderApproval[];
        pagination?: PaginationModel;
        sorts?: SortModel[];
    }
    interface CartModificationList {
        cartModifications?: CartModification[];
    }
}
