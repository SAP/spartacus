/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
export var Occ;
(function (Occ) {
    /**
     * The page robot information is exposed with 4 string values.
     */
    let PageRobots;
    (function (PageRobots) {
        PageRobots["INDEX_FOLLOW"] = "INDEX_FOLLOW";
        PageRobots["NOINDEX_FOLLOW"] = "NOINDEX_FOLLOW";
        PageRobots["INDEX_NOFOLLOW"] = "INDEX_NOFOLLOW";
        PageRobots["NOINDEX_NOFOLLOW"] = "NOINDEX_NOFOLLOW";
    })(PageRobots = Occ.PageRobots || (Occ.PageRobots = {}));
    /**
     * Possible order entry statuses
     */
    let OrderEntryStatus;
    (function (OrderEntryStatus) {
        OrderEntryStatus["Success"] = "SUCCESS";
        OrderEntryStatus["Info"] = "INFO";
        OrderEntryStatus["Warning"] = "WARNING";
        OrderEntryStatus["Error"] = "ERROR";
    })(OrderEntryStatus = Occ.OrderEntryStatus || (Occ.OrderEntryStatus = {}));
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
    let PriceType;
    (function (PriceType) {
        PriceType["BUY"] = "BUY";
        PriceType["FROM"] = "FROM";
    })(PriceType = Occ.PriceType || (Occ.PriceType = {}));
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
    let ImageType;
    (function (ImageType) {
        ImageType["PRIMARY"] = "PRIMARY";
        ImageType["GALLERY"] = "GALLERY";
    })(ImageType = Occ.ImageType || (Occ.ImageType = {}));
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
    let Fields;
    (function (Fields) {
        Fields["BASIC"] = "BASIC";
        Fields["DEFAULT"] = "DEFAULT";
        Fields["FULL"] = "FULL";
    })(Fields = Occ.Fields || (Occ.Fields = {}));
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
    let Fields1;
    (function (Fields1) {
        Fields1["BASIC"] = "BASIC";
        Fields1["DEFAULT"] = "DEFAULT";
        Fields1["FULL"] = "FULL";
    })(Fields1 = Occ.Fields1 || (Occ.Fields1 = {}));
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
    let Fields2;
    (function (Fields2) {
        Fields2["BASIC"] = "BASIC";
        Fields2["DEFAULT"] = "DEFAULT";
        Fields2["FULL"] = "FULL";
    })(Fields2 = Occ.Fields2 || (Occ.Fields2 = {}));
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
    let Fields3;
    (function (Fields3) {
        Fields3["BASIC"] = "BASIC";
        Fields3["DEFAULT"] = "DEFAULT";
        Fields3["FULL"] = "FULL";
    })(Fields3 = Occ.Fields3 || (Occ.Fields3 = {}));
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
    let Fields4;
    (function (Fields4) {
        Fields4["BASIC"] = "BASIC";
        Fields4["DEFAULT"] = "DEFAULT";
        Fields4["FULL"] = "FULL";
    })(Fields4 = Occ.Fields4 || (Occ.Fields4 = {}));
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
    let Fields5;
    (function (Fields5) {
        Fields5["BASIC"] = "BASIC";
        Fields5["DEFAULT"] = "DEFAULT";
        Fields5["FULL"] = "FULL";
    })(Fields5 = Occ.Fields5 || (Occ.Fields5 = {}));
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
    let Fields6;
    (function (Fields6) {
        Fields6["BASIC"] = "BASIC";
        Fields6["DEFAULT"] = "DEFAULT";
        Fields6["FULL"] = "FULL";
    })(Fields6 = Occ.Fields6 || (Occ.Fields6 = {}));
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
    let PageType;
    (function (PageType) {
        PageType["CONTENT_PAGE"] = "ContentPage";
        PageType["PRODUCT_PAGE"] = "ProductPage";
        PageType["CATEGORY_PAGE"] = "CategoryPage";
        PageType["CATALOG_PAGE"] = "CatalogPage";
    })(PageType = Occ.PageType || (Occ.PageType = {}));
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
    let Fields7;
    (function (Fields7) {
        Fields7["BASIC"] = "BASIC";
        Fields7["DEFAULT"] = "DEFAULT";
        Fields7["FULL"] = "FULL";
    })(Fields7 = Occ.Fields7 || (Occ.Fields7 = {}));
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
    let Fields8;
    (function (Fields8) {
        Fields8["BASIC"] = "BASIC";
        Fields8["DEFAULT"] = "DEFAULT";
        Fields8["FULL"] = "FULL";
    })(Fields8 = Occ.Fields8 || (Occ.Fields8 = {}));
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
    let Fields9;
    (function (Fields9) {
        Fields9["BASIC"] = "BASIC";
        Fields9["DEFAULT"] = "DEFAULT";
        Fields9["FULL"] = "FULL";
    })(Fields9 = Occ.Fields9 || (Occ.Fields9 = {}));
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
    let Fields10;
    (function (Fields10) {
        Fields10["BASIC"] = "BASIC";
        Fields10["DEFAULT"] = "DEFAULT";
        Fields10["FULL"] = "FULL";
    })(Fields10 = Occ.Fields10 || (Occ.Fields10 = {}));
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
    let Fields11;
    (function (Fields11) {
        Fields11["BASIC"] = "BASIC";
        Fields11["DEFAULT"] = "DEFAULT";
        Fields11["FULL"] = "FULL";
    })(Fields11 = Occ.Fields11 || (Occ.Fields11 = {}));
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
    let Fields12;
    (function (Fields12) {
        Fields12["BASIC"] = "BASIC";
        Fields12["DEFAULT"] = "DEFAULT";
        Fields12["FULL"] = "FULL";
    })(Fields12 = Occ.Fields12 || (Occ.Fields12 = {}));
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
    let Fields13;
    (function (Fields13) {
        Fields13["BASIC"] = "BASIC";
        Fields13["DEFAULT"] = "DEFAULT";
        Fields13["FULL"] = "FULL";
    })(Fields13 = Occ.Fields13 || (Occ.Fields13 = {}));
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
    let Fields14;
    (function (Fields14) {
        Fields14["BASIC"] = "BASIC";
        Fields14["DEFAULT"] = "DEFAULT";
        Fields14["FULL"] = "FULL";
    })(Fields14 = Occ.Fields14 || (Occ.Fields14 = {}));
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
    let Fields15;
    (function (Fields15) {
        Fields15["BASIC"] = "BASIC";
        Fields15["DEFAULT"] = "DEFAULT";
        Fields15["FULL"] = "FULL";
    })(Fields15 = Occ.Fields15 || (Occ.Fields15 = {}));
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
    let Fields16;
    (function (Fields16) {
        Fields16["BASIC"] = "BASIC";
        Fields16["DEFAULT"] = "DEFAULT";
        Fields16["FULL"] = "FULL";
    })(Fields16 = Occ.Fields16 || (Occ.Fields16 = {}));
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
    let SortEnum;
    (function (SortEnum) {
        SortEnum["BASIC"] = "BASIC";
        SortEnum["DEFAULT"] = "DEFAULT";
        SortEnum["FULL"] = "FULL";
    })(SortEnum = Occ.SortEnum || (Occ.SortEnum = {}));
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
    let Fields17;
    (function (Fields17) {
        Fields17["BASIC"] = "BASIC";
        Fields17["DEFAULT"] = "DEFAULT";
        Fields17["FULL"] = "FULL";
    })(Fields17 = Occ.Fields17 || (Occ.Fields17 = {}));
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
    let Fields18;
    (function (Fields18) {
        Fields18["BASIC"] = "BASIC";
        Fields18["DEFAULT"] = "DEFAULT";
        Fields18["FULL"] = "FULL";
    })(Fields18 = Occ.Fields18 || (Occ.Fields18 = {}));
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
    let Fields19;
    (function (Fields19) {
        Fields19["BASIC"] = "BASIC";
        Fields19["DEFAULT"] = "DEFAULT";
        Fields19["FULL"] = "FULL";
    })(Fields19 = Occ.Fields19 || (Occ.Fields19 = {}));
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
    let Fields20;
    (function (Fields20) {
        Fields20["BASIC"] = "BASIC";
        Fields20["DEFAULT"] = "DEFAULT";
        Fields20["FULL"] = "FULL";
    })(Fields20 = Occ.Fields20 || (Occ.Fields20 = {}));
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
    let Fields21;
    (function (Fields21) {
        Fields21["BASIC"] = "BASIC";
        Fields21["DEFAULT"] = "DEFAULT";
        Fields21["FULL"] = "FULL";
    })(Fields21 = Occ.Fields21 || (Occ.Fields21 = {}));
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
    let Fields22;
    (function (Fields22) {
        Fields22["BASIC"] = "BASIC";
        Fields22["DEFAULT"] = "DEFAULT";
        Fields22["FULL"] = "FULL";
    })(Fields22 = Occ.Fields22 || (Occ.Fields22 = {}));
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
    let Fields23;
    (function (Fields23) {
        Fields23["BASIC"] = "BASIC";
        Fields23["DEFAULT"] = "DEFAULT";
        Fields23["FULL"] = "FULL";
    })(Fields23 = Occ.Fields23 || (Occ.Fields23 = {}));
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
    let Fields24;
    (function (Fields24) {
        Fields24["BASIC"] = "BASIC";
        Fields24["DEFAULT"] = "DEFAULT";
        Fields24["FULL"] = "FULL";
    })(Fields24 = Occ.Fields24 || (Occ.Fields24 = {}));
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
    let Fields25;
    (function (Fields25) {
        Fields25["BASIC"] = "BASIC";
        Fields25["DEFAULT"] = "DEFAULT";
        Fields25["FULL"] = "FULL";
    })(Fields25 = Occ.Fields25 || (Occ.Fields25 = {}));
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
    let Fields26;
    (function (Fields26) {
        Fields26["BASIC"] = "BASIC";
        Fields26["DEFAULT"] = "DEFAULT";
        Fields26["FULL"] = "FULL";
    })(Fields26 = Occ.Fields26 || (Occ.Fields26 = {}));
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
    let Fields27;
    (function (Fields27) {
        Fields27["BASIC"] = "BASIC";
        Fields27["DEFAULT"] = "DEFAULT";
        Fields27["FULL"] = "FULL";
    })(Fields27 = Occ.Fields27 || (Occ.Fields27 = {}));
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
    let Fields28;
    (function (Fields28) {
        Fields28["BASIC"] = "BASIC";
        Fields28["DEFAULT"] = "DEFAULT";
        Fields28["FULL"] = "FULL";
    })(Fields28 = Occ.Fields28 || (Occ.Fields28 = {}));
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
    let Fields29;
    (function (Fields29) {
        Fields29["BASIC"] = "BASIC";
        Fields29["DEFAULT"] = "DEFAULT";
        Fields29["FULL"] = "FULL";
    })(Fields29 = Occ.Fields29 || (Occ.Fields29 = {}));
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
    let Fields30;
    (function (Fields30) {
        Fields30["BASIC"] = "BASIC";
        Fields30["DEFAULT"] = "DEFAULT";
        Fields30["FULL"] = "FULL";
    })(Fields30 = Occ.Fields30 || (Occ.Fields30 = {}));
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
    let Fields31;
    (function (Fields31) {
        Fields31["BASIC"] = "BASIC";
        Fields31["DEFAULT"] = "DEFAULT";
        Fields31["FULL"] = "FULL";
    })(Fields31 = Occ.Fields31 || (Occ.Fields31 = {}));
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
    let Fields32;
    (function (Fields32) {
        Fields32["BASIC"] = "BASIC";
        Fields32["DEFAULT"] = "DEFAULT";
        Fields32["FULL"] = "FULL";
    })(Fields32 = Occ.Fields32 || (Occ.Fields32 = {}));
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
    let Fields33;
    (function (Fields33) {
        Fields33["BASIC"] = "BASIC";
        Fields33["DEFAULT"] = "DEFAULT";
        Fields33["FULL"] = "FULL";
    })(Fields33 = Occ.Fields33 || (Occ.Fields33 = {}));
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
    let Fields34;
    (function (Fields34) {
        Fields34["BASIC"] = "BASIC";
        Fields34["DEFAULT"] = "DEFAULT";
        Fields34["FULL"] = "FULL";
    })(Fields34 = Occ.Fields34 || (Occ.Fields34 = {}));
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
    let Fields35;
    (function (Fields35) {
        Fields35["BASIC"] = "BASIC";
        Fields35["DEFAULT"] = "DEFAULT";
        Fields35["FULL"] = "FULL";
    })(Fields35 = Occ.Fields35 || (Occ.Fields35 = {}));
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
    let Fields36;
    (function (Fields36) {
        Fields36["BASIC"] = "BASIC";
        Fields36["DEFAULT"] = "DEFAULT";
        Fields36["FULL"] = "FULL";
    })(Fields36 = Occ.Fields36 || (Occ.Fields36 = {}));
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
    let Fields37;
    (function (Fields37) {
        Fields37["BASIC"] = "BASIC";
        Fields37["DEFAULT"] = "DEFAULT";
        Fields37["FULL"] = "FULL";
    })(Fields37 = Occ.Fields37 || (Occ.Fields37 = {}));
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
    let Fields38;
    (function (Fields38) {
        Fields38["BASIC"] = "BASIC";
        Fields38["DEFAULT"] = "DEFAULT";
        Fields38["FULL"] = "FULL";
    })(Fields38 = Occ.Fields38 || (Occ.Fields38 = {}));
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
    let Fields39;
    (function (Fields39) {
        Fields39["BASIC"] = "BASIC";
        Fields39["DEFAULT"] = "DEFAULT";
        Fields39["FULL"] = "FULL";
    })(Fields39 = Occ.Fields39 || (Occ.Fields39 = {}));
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
    let Fields40;
    (function (Fields40) {
        Fields40["BASIC"] = "BASIC";
        Fields40["DEFAULT"] = "DEFAULT";
        Fields40["FULL"] = "FULL";
    })(Fields40 = Occ.Fields40 || (Occ.Fields40 = {}));
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
    let Fields41;
    (function (Fields41) {
        Fields41["BASIC"] = "BASIC";
        Fields41["DEFAULT"] = "DEFAULT";
        Fields41["FULL"] = "FULL";
    })(Fields41 = Occ.Fields41 || (Occ.Fields41 = {}));
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
    let Fields42;
    (function (Fields42) {
        Fields42["BASIC"] = "BASIC";
        Fields42["DEFAULT"] = "DEFAULT";
        Fields42["FULL"] = "FULL";
    })(Fields42 = Occ.Fields42 || (Occ.Fields42 = {}));
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
    let Fields43;
    (function (Fields43) {
        Fields43["BASIC"] = "BASIC";
        Fields43["DEFAULT"] = "DEFAULT";
        Fields43["FULL"] = "FULL";
    })(Fields43 = Occ.Fields43 || (Occ.Fields43 = {}));
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
    let Fields44;
    (function (Fields44) {
        Fields44["BASIC"] = "BASIC";
        Fields44["DEFAULT"] = "DEFAULT";
        Fields44["FULL"] = "FULL";
    })(Fields44 = Occ.Fields44 || (Occ.Fields44 = {}));
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
    let Fields45;
    (function (Fields45) {
        Fields45["BASIC"] = "BASIC";
        Fields45["DEFAULT"] = "DEFAULT";
        Fields45["FULL"] = "FULL";
    })(Fields45 = Occ.Fields45 || (Occ.Fields45 = {}));
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
    let Fields46;
    (function (Fields46) {
        Fields46["BASIC"] = "BASIC";
        Fields46["DEFAULT"] = "DEFAULT";
        Fields46["FULL"] = "FULL";
    })(Fields46 = Occ.Fields46 || (Occ.Fields46 = {}));
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
    let Fields47;
    (function (Fields47) {
        Fields47["BASIC"] = "BASIC";
        Fields47["DEFAULT"] = "DEFAULT";
        Fields47["FULL"] = "FULL";
    })(Fields47 = Occ.Fields47 || (Occ.Fields47 = {}));
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
    let Fields48;
    (function (Fields48) {
        Fields48["BASIC"] = "BASIC";
        Fields48["DEFAULT"] = "DEFAULT";
        Fields48["FULL"] = "FULL";
    })(Fields48 = Occ.Fields48 || (Occ.Fields48 = {}));
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
    let Fields49;
    (function (Fields49) {
        Fields49["BASIC"] = "BASIC";
        Fields49["DEFAULT"] = "DEFAULT";
        Fields49["FULL"] = "FULL";
    })(Fields49 = Occ.Fields49 || (Occ.Fields49 = {}));
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
    let Fields50;
    (function (Fields50) {
        Fields50["BASIC"] = "BASIC";
        Fields50["DEFAULT"] = "DEFAULT";
        Fields50["FULL"] = "FULL";
    })(Fields50 = Occ.Fields50 || (Occ.Fields50 = {}));
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
    let Fields51;
    (function (Fields51) {
        Fields51["BASIC"] = "BASIC";
        Fields51["DEFAULT"] = "DEFAULT";
        Fields51["FULL"] = "FULL";
    })(Fields51 = Occ.Fields51 || (Occ.Fields51 = {}));
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
    let Fields52;
    (function (Fields52) {
        Fields52["BASIC"] = "BASIC";
        Fields52["DEFAULT"] = "DEFAULT";
        Fields52["FULL"] = "FULL";
    })(Fields52 = Occ.Fields52 || (Occ.Fields52 = {}));
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
    let Fields53;
    (function (Fields53) {
        Fields53["BASIC"] = "BASIC";
        Fields53["DEFAULT"] = "DEFAULT";
        Fields53["FULL"] = "FULL";
    })(Fields53 = Occ.Fields53 || (Occ.Fields53 = {}));
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
    let Fields54;
    (function (Fields54) {
        Fields54["BASIC"] = "BASIC";
        Fields54["DEFAULT"] = "DEFAULT";
        Fields54["FULL"] = "FULL";
    })(Fields54 = Occ.Fields54 || (Occ.Fields54 = {}));
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
    let Fields55;
    (function (Fields55) {
        Fields55["BASIC"] = "BASIC";
        Fields55["DEFAULT"] = "DEFAULT";
        Fields55["FULL"] = "FULL";
    })(Fields55 = Occ.Fields55 || (Occ.Fields55 = {}));
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
    let Fields56;
    (function (Fields56) {
        Fields56["BASIC"] = "BASIC";
        Fields56["DEFAULT"] = "DEFAULT";
        Fields56["FULL"] = "FULL";
    })(Fields56 = Occ.Fields56 || (Occ.Fields56 = {}));
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
    let Fields57;
    (function (Fields57) {
        Fields57["BASIC"] = "BASIC";
        Fields57["DEFAULT"] = "DEFAULT";
        Fields57["FULL"] = "FULL";
    })(Fields57 = Occ.Fields57 || (Occ.Fields57 = {}));
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
    let Fields58;
    (function (Fields58) {
        Fields58["BASIC"] = "BASIC";
        Fields58["DEFAULT"] = "DEFAULT";
        Fields58["FULL"] = "FULL";
    })(Fields58 = Occ.Fields58 || (Occ.Fields58 = {}));
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
    let Fields59;
    (function (Fields59) {
        Fields59["BASIC"] = "BASIC";
        Fields59["DEFAULT"] = "DEFAULT";
        Fields59["FULL"] = "FULL";
    })(Fields59 = Occ.Fields59 || (Occ.Fields59 = {}));
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
    let Fields60;
    (function (Fields60) {
        Fields60["BASIC"] = "BASIC";
        Fields60["DEFAULT"] = "DEFAULT";
        Fields60["FULL"] = "FULL";
    })(Fields60 = Occ.Fields60 || (Occ.Fields60 = {}));
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
    let Fields61;
    (function (Fields61) {
        Fields61["BASIC"] = "BASIC";
        Fields61["DEFAULT"] = "DEFAULT";
        Fields61["FULL"] = "FULL";
    })(Fields61 = Occ.Fields61 || (Occ.Fields61 = {}));
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
    let Type;
    (function (Type) {
        Type["All"] = "all";
        Type["Product"] = "product";
        Type["Order"] = "order";
    })(Type = Occ.Type || (Occ.Type = {}));
    let CONSENT_STATUS;
    (function (CONSENT_STATUS) {
        CONSENT_STATUS["ANONYMOUS_CONSENT_GIVEN"] = "GIVEN";
        CONSENT_STATUS["ANONYMOUS_CONSENT_WITHDRAWN"] = "WITHDRAWN";
    })(CONSENT_STATUS = Occ.CONSENT_STATUS || (Occ.CONSENT_STATUS = {}));
    let NotificationType;
    (function (NotificationType) {
        NotificationType["BACK_IN_STOCK"] = "BACK_IN_STOCK";
    })(NotificationType = Occ.NotificationType || (Occ.NotificationType = {}));
    let Period;
    (function (Period) {
        Period["DAY"] = "DAY";
        Period["WEEK"] = "WEEK";
        Period["MONTH"] = "MONTH";
        Period["QUARTER"] = "QUARTER";
        Period["YEAR"] = "YEAR";
    })(Period = Occ.Period || (Occ.Period = {}));
    let DaysOfWeek;
    (function (DaysOfWeek) {
        DaysOfWeek["MONDAY"] = "MONDAY";
        DaysOfWeek["TUESDAY"] = "TUESDAY";
        DaysOfWeek["WEDNESDAY"] = "WEDNESDAY";
        DaysOfWeek["THURSDAY"] = "THURSDAY";
        DaysOfWeek["FRIDAY"] = "FRIDAY";
        DaysOfWeek["SATURDAY"] = "SATURDAY";
        DaysOfWeek["SUNDAY"] = "SUNDAY";
    })(DaysOfWeek = Occ.DaysOfWeek || (Occ.DaysOfWeek = {}));
    let OrderApprovalDecisionValue;
    (function (OrderApprovalDecisionValue) {
        OrderApprovalDecisionValue["APPROVE"] = "APPROVE";
        OrderApprovalDecisionValue["REJECT"] = "REJECT";
    })(OrderApprovalDecisionValue = Occ.OrderApprovalDecisionValue || (Occ.OrderApprovalDecisionValue = {}));
})(Occ || (Occ = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2NjLm1vZGVscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL29jYy9vY2MtbW9kZWxzL29jYy5tb2RlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE1BQU0sS0FBVyxHQUFHLENBMnJHbkI7QUEzckdELFdBQWlCLEdBQUc7SUErVmxCOztPQUVHO0lBQ0gsSUFBWSxVQUtYO0lBTEQsV0FBWSxVQUFVO1FBQ3BCLDJDQUE2QixDQUFBO1FBQzdCLCtDQUFpQyxDQUFBO1FBQ2pDLCtDQUFpQyxDQUFBO1FBQ2pDLG1EQUFxQyxDQUFBO0lBQ3ZDLENBQUMsRUFMVyxVQUFVLEdBQVYsY0FBVSxLQUFWLGNBQVUsUUFLckI7SUErakJEOztPQUVHO0lBQ0gsSUFBWSxnQkFLWDtJQUxELFdBQVksZ0JBQWdCO1FBQzFCLHVDQUFtQixDQUFBO1FBQ25CLGlDQUFhLENBQUE7UUFDYix1Q0FBbUIsQ0FBQTtRQUNuQixtQ0FBZSxDQUFBO0lBQ2pCLENBQUMsRUFMVyxnQkFBZ0IsR0FBaEIsb0JBQWdCLEtBQWhCLG9CQUFnQixRQUszQjtJQTI1QkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBWSxTQUdYO0lBSEQsV0FBWSxTQUFTO1FBQ25CLHdCQUFXLENBQUE7UUFDWCwwQkFBYSxDQUFBO0lBQ2YsQ0FBQyxFQUhXLFNBQVMsR0FBVCxhQUFTLEtBQVQsYUFBUyxRQUdwQjtJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQVksU0FHWDtJQUhELFdBQVksU0FBUztRQUNuQixnQ0FBbUIsQ0FBQTtRQUNuQixnQ0FBbUIsQ0FBQTtJQUNyQixDQUFDLEVBSFcsU0FBUyxHQUFULGFBQVMsS0FBVCxhQUFTLFFBR3BCO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBWSxNQUlYO0lBSkQsV0FBWSxNQUFNO1FBQ2hCLHlCQUFlLENBQUE7UUFDZiw2QkFBbUIsQ0FBQTtRQUNuQix1QkFBYSxD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QyxFQVJXLFVBQVUsR0FBVixjQUFVLEtBQVYsY0FBVSxRQVFyQjtJQUVELElBQVksMEJBR1g7SUFIRCxXQUFZLDBCQUEwQjtRQUNwQyxpREFBbUIsQ0FBQTtRQUNuQiwrQ0FBaUIsQ0FBQTtJQUNuQixDQUFDLEVBSFcsMEJBQTBCLEdBQTFCLDhCQUEwQixLQUExQiw4QkFBMEIsUUFHckM7QUErQkgsQ0FBQyxFQTNyR2dCLEdBQUcsS0FBSCxHQUFHLFFBMnJHbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgbmFtZXNwYWNlIE9jYyB7XG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIENvdW50cnkuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIENvdW50cnkge1xuICAgIGlzb2NvZGU/OiBzdHJpbmc7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUmVnaW9uLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBSZWdpb24ge1xuICAgIGNvdW50cnlJc28/OiBzdHJpbmc7XG5cbiAgICBpc29jb2RlPzogc3RyaW5nO1xuXG4gICAgaXNvY29kZVNob3J0Pzogc3RyaW5nO1xuXG4gICAgbmFtZT86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFJlZ2lvbkxpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFJlZ2lvbkxpc3Qge1xuICAgIHJlZ2lvbnM/OiBSZWdpb25bXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQWRkcmVzc0xpc3Qge1xuICAgIGFkZHJlc3Nlcz86IEFkZHJlc3NbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIEFkZHJlc3MuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEFkZHJlc3Mge1xuICAgIGNvbXBhbnlOYW1lPzogc3RyaW5nO1xuXG4gICAgY291bnRyeT86IENvdW50cnk7XG5cbiAgICBkZWZhdWx0QWRkcmVzcz86IGJvb2xlYW47XG5cbiAgICBlbWFpbD86IHN0cmluZztcblxuICAgIGZpcnN0TmFtZT86IHN0cmluZztcblxuICAgIGZvcm1hdHRlZEFkZHJlc3M/OiBzdHJpbmc7XG5cbiAgICBpZD86IHN0cmluZztcblxuICAgIGxhc3ROYW1lPzogc3RyaW5nO1xuXG4gICAgbGluZTE/OiBzdHJpbmc7XG5cbiAgICBsaW5lMj86IHN0cmluZztcblxuICAgIHBob25lPzogc3RyaW5nO1xuXG4gICAgY2VsbHBob25lPzogc3RyaW5nO1xuXG4gICAgcG9zdGFsQ29kZT86IHN0cmluZztcblxuICAgIHJlZ2lvbj86IFJlZ2lvbjtcblxuICAgIGRpc3RyaWN0Pzogc3RyaW5nO1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzPzogYm9vbGVhbjtcblxuICAgIHRpdGxlPzogc3RyaW5nO1xuXG4gICAgdGl0bGVDb2RlPzogc3RyaW5nO1xuXG4gICAgdG93bj86IHN0cmluZztcblxuICAgIHZpc2libGVJbkFkZHJlc3NCb29rPzogYm9vbGVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIEFkZHJlc3NMaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBBZGRyZXNzTGlzdCB7XG4gICAgYWRkcmVzc2VzPzogQWRkcmVzc1tdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgRXJyb3JNb2RlbC5cbiAgICogRXJyb3IgbWVzc2FnZVxuICAgKlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBFcnJvck1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBEZXNjcmlwdGl2ZSwgaHVtYW4gcmVhZGFibGUgZXJyb3IgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBtZXNzYWdlPzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEFkZGl0aW9uYWwgY2xhc3NpZmljYXRpb24gc3BlY2lmaWMgZm9yIGVhY2hcbiAgICAgKiBlcnJvciB0eXBlIGUuZy4gJ25vU3RvY2snLlxuICAgICAqL1xuICAgIHJlYXNvbj86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJZGVudGlmaWVyIG9mIHRoZSByZWxhdGVkIG9iamVjdCBlLmcuICcxJy5cbiAgICAgKi9cbiAgICBzdWJqZWN0Pzogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgdGhlIG9iamVjdCByZWxhdGVkIHRvIHRoZSBlcnJvclxuICAgICAqIGUuZy4gJ2VudHJ5Jy5cbiAgICAgKi9cbiAgICBzdWJqZWN0VHlwZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHRoZSBlcnJvciBlLmcuICdMb3dTdG9ja0Vycm9yJy5cbiAgICAgKi9cbiAgICB0eXBlPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgRXJyb3JMaXN0LlxuICAgKiBMaXN0IG9mIGVycm9yc1xuICAgKlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBFcnJvckxpc3Qge1xuICAgIGVycm9ycz86IEVycm9yTW9kZWxbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIEFkZHJlc3NWYWxpZGF0aW9uLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBBZGRyZXNzVmFsaWRhdGlvbiB7XG4gICAgZGVjaXNpb24/OiBzdHJpbmc7XG5cbiAgICBlcnJvcnM/OiBFcnJvckxpc3Q7XG5cbiAgICBzdWdnZXN0ZWRBZGRyZXNzZXM/OiBBZGRyZXNzW107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQcmljZS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUHJpY2Uge1xuICAgIGN1cnJlbmN5SXNvPzogc3RyaW5nO1xuXG4gICAgZm9ybWF0dGVkVmFsdWU/OiBzdHJpbmc7XG5cbiAgICBtYXhRdWFudGl0eT86IG51bWJlcjtcblxuICAgIG1pblF1YW50aXR5PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQlVZJywgJ0ZST00nXG4gICAgICovXG4gICAgcHJpY2VUeXBlPzogUHJpY2VUeXBlO1xuXG4gICAgdmFsdWU/OiBudW1iZXI7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBTdG9jay5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgU3RvY2sge1xuICAgIHN0b2NrTGV2ZWw/OiBudW1iZXI7XG5cbiAgICBzdG9ja0xldmVsU3RhdHVzPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgSW1hZ2UuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEltYWdlIHtcbiAgICBhbHRUZXh0Pzogc3RyaW5nO1xuXG4gICAgZm9ybWF0Pzogc3RyaW5nO1xuXG4gICAgZ2FsbGVyeUluZGV4PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnUFJJTUFSWScsXG4gICAgICogJ0dBTExFUlknXG4gICAgICovXG4gICAgaW1hZ2VUeXBlPzogSW1hZ2VUeXBlO1xuXG4gICAgdXJsPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgVmFyaWFudE9wdGlvblF1YWxpZmllci5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgVmFyaWFudE9wdGlvblF1YWxpZmllciB7XG4gICAgaW1hZ2U/OiBJbWFnZTtcblxuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICBxdWFsaWZpZXI/OiBzdHJpbmc7XG5cbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFZhcmlhbnRPcHRpb24uXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFZhcmlhbnRPcHRpb24ge1xuICAgIGNvZGU/OiBzdHJpbmc7XG5cbiAgICBwcmljZURhdGE/OiBQcmljZTtcblxuICAgIHN0b2NrPzogU3RvY2s7XG5cbiAgICB1cmw/OiBzdHJpbmc7XG5cbiAgICB2YXJpYW50T3B0aW9uUXVhbGlmaWVycz86IFZhcmlhbnRPcHRpb25RdWFsaWZpZXJbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIEJhc2VPcHRpb24uXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEJhc2VPcHRpb24ge1xuICAgIG9wdGlvbnM/OiBWYXJpYW50T3B0aW9uW107XG5cbiAgICBzZWxlY3RlZD86IFZhcmlhbnRPcHRpb247XG5cbiAgICB2YXJpYW50VHlwZT86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFNlYXJjaFF1ZXJ5LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTZWFyY2hRdWVyeSB7XG4gICAgdmFsdWU/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBTZWFyY2hTdGF0ZS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoU3RhdGUge1xuICAgIHF1ZXJ5PzogU2VhcmNoUXVlcnk7XG5cbiAgICB1cmw/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBCcmVhZGNydW1iLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBCcmVhZGNydW1iIHtcbiAgICBmYWNldENvZGU/OiBzdHJpbmc7XG5cbiAgICBmYWNldE5hbWU/OiBzdHJpbmc7XG5cbiAgICBmYWNldFZhbHVlQ29kZT86IHN0cmluZztcblxuICAgIGZhY2V0VmFsdWVOYW1lPzogc3RyaW5nO1xuXG4gICAgcmVtb3ZlUXVlcnk/OiBTZWFyY2hTdGF0ZTtcblxuICAgIHRydW5jYXRlUXVlcnk/OiBTZWFyY2hTdGF0ZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIENvbXBvbmVudC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50IHtcbiAgICBtb2RpZmllZFRpbWU/OiBEYXRlO1xuXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIG90aGVyUHJvcGVydGllcz86IGFueTtcblxuICAgIHR5cGVDb2RlPzogc3RyaW5nO1xuXG4gICAgdWlkPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ29tcG9uZW50TGlzdC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29tcG9uZW50TGlzdCB7XG4gICAgY29tcG9uZW50PzogQ29tcG9uZW50W10gfCBhbnlbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIENvbnRlbnRTbG90LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBDb250ZW50U2xvdCB7XG4gICAgY29tcG9uZW50cz86IENvbXBvbmVudExpc3Q7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuXG4gICAgcG9zaXRpb24/OiBzdHJpbmc7XG5cbiAgICBzbG90SWQ/OiBzdHJpbmc7XG5cbiAgICBzbG90U2hhcmVkPzogYm9vbGVhbjtcblxuICAgIHNsb3RTdGF0dXM/OiBzdHJpbmc7XG5cbiAgICBwcm9wZXJ0aWVzPzogYW55O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ29udGVudFNsb3RMaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBDb250ZW50U2xvdExpc3Qge1xuICAgIGNvbnRlbnRTbG90PzogQ29udGVudFNsb3RbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIENNU1BhZ2UuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIENNU1BhZ2Uge1xuICAgIGNvbnRlbnRTbG90cz86IENvbnRlbnRTbG90TGlzdDtcblxuICAgIGRlZmF1bHRQYWdlPzogYm9vbGVhbjtcblxuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICB0ZW1wbGF0ZT86IHN0cmluZztcblxuICAgIHRpdGxlPzogc3RyaW5nO1xuXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgICB0eXBlQ29kZT86IHN0cmluZztcblxuICAgIHVpZD86IHN0cmluZztcblxuICAgIGxhYmVsPzogc3RyaW5nO1xuXG4gICAgcHJvcGVydGllcz86IGFueTtcblxuICAgIHJvYm90VGFnPzogUGFnZVJvYm90cztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcGFnZSByb2JvdCBpbmZvcm1hdGlvbiBpcyBleHBvc2VkIHdpdGggNCBzdHJpbmcgdmFsdWVzLlxuICAgKi9cbiAgZXhwb3J0IGVudW0gUGFnZVJvYm90cyB7XG4gICAgSU5ERVhfRk9MTE9XID0gJ0lOREVYX0ZPTExPVycsXG4gICAgTk9JTkRFWF9GT0xMT1cgPSAnTk9JTkRFWF9GT0xMT1cnLFxuICAgIElOREVYX05PRk9MTE9XID0gJ0lOREVYX05PRk9MTE9XJyxcbiAgICBOT0lOREVYX05PRk9MTE9XID0gJ05PSU5ERVhfTk9GT0xMT1cnLFxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ2FyZFR5cGUuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIENhcmRUeXBlIHtcbiAgICBjb2RlPzogc3RyaW5nO1xuXG4gICAgbmFtZT86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIENhcmRUeXBlTGlzdC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ2FyZFR5cGVMaXN0IHtcbiAgICBjYXJkVHlwZXM/OiBDYXJkVHlwZVtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUGF5bWVudFR5cGUuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFBheW1lbnRUeXBlIHtcbiAgICBjb2RlPzogc3RyaW5nO1xuXG4gICAgZGlzcGxheU5hbWU/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQYXltZW50VHlwZUxpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFBheW1lbnRUeXBlTGlzdCB7XG4gICAgcGF5bWVudFR5cGVzPzogUGF5bWVudFR5cGVbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFByb21vdGlvbk9yZGVyRW50cnlDb25zdW1lZC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUHJvbW90aW9uT3JkZXJFbnRyeUNvbnN1bWVkIHtcbiAgICBhZGp1c3RlZFVuaXRQcmljZT86IG51bWJlcjtcblxuICAgIGNvZGU/OiBzdHJpbmc7XG5cbiAgICBvcmRlckVudHJ5TnVtYmVyPzogbnVtYmVyO1xuXG4gICAgcXVhbnRpdHk/OiBudW1iZXI7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQcm9tb3Rpb25SZXN0cmljdGlvbi5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUHJvbW90aW9uUmVzdHJpY3Rpb24ge1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXG4gICAgcmVzdHJpY3Rpb25UeXBlPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUHJvbW90aW9uLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBQcm9tb3Rpb24ge1xuICAgIGNvZGU/OiBzdHJpbmc7XG5cbiAgICBjb3VsZEZpcmVNZXNzYWdlcz86IHN0cmluZ1tdO1xuXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgICBlbmFibGVkPzogYm9vbGVhbjtcblxuICAgIGVuZERhdGU/OiBEYXRlO1xuXG4gICAgZmlyZWRNZXNzYWdlcz86IHN0cmluZ1tdO1xuXG4gICAgcHJpb3JpdHk/OiBudW1iZXI7XG5cbiAgICBwcm9kdWN0QmFubmVyPzogSW1hZ2U7XG5cbiAgICBwcm9tb3Rpb25Hcm91cD86IHN0cmluZztcblxuICAgIHByb21vdGlvblR5cGU/OiBzdHJpbmc7XG5cbiAgICByZXN0cmljdGlvbnM/OiBQcm9tb3Rpb25SZXN0cmljdGlvbltdO1xuXG4gICAgc3RhcnREYXRlPzogRGF0ZTtcblxuICAgIHRpdGxlPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUHJvbW90aW9uUmVzdWx0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBQcm9tb3Rpb25SZXN1bHQge1xuICAgIGNvbnN1bWVkRW50cmllcz86IFByb21vdGlvbk9yZGVyRW50cnlDb25zdW1lZFtdO1xuXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgICBwcm9tb3Rpb24/OiBQcm9tb3Rpb247XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBDdXJyZW5jeS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ3VycmVuY3kge1xuICAgIGFjdGl2ZT86IGJvb2xlYW47XG5cbiAgICBpc29jb2RlPzogc3RyaW5nO1xuXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIHN5bWJvbD86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFZvdWNoZXIuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFZvdWNoZXIge1xuICAgIGFwcGxpZWRWYWx1ZT86IFByaWNlO1xuXG4gICAgY29kZT86IHN0cmluZztcblxuICAgIGN1cnJlbmN5PzogQ3VycmVuY3k7XG5cbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcblxuICAgIGZyZWVTaGlwcGluZz86IGJvb2xlYW47XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuXG4gICAgdmFsdWU/OiBudW1iZXI7XG5cbiAgICB2YWx1ZUZvcm1hdHRlZD86IHN0cmluZztcblxuICAgIHZhbHVlU3RyaW5nPzogc3RyaW5nO1xuXG4gICAgdm91Y2hlckNvZGU/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBEZWxpdmVyeU1vZGUuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIERlbGl2ZXJ5TW9kZSB7XG4gICAgY29kZT86IHN0cmluZztcblxuICAgIGRlbGl2ZXJ5Q29zdD86IFByaWNlO1xuXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgR2VvUG9pbnQuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEdlb1BvaW50IHtcbiAgICBsYXRpdHVkZT86IG51bWJlcjtcblxuICAgIGxvbmdpdHVkZT86IG51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFRpbWUuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFRpbWUge1xuICAgIGZvcm1hdHRlZEhvdXI/OiBzdHJpbmc7XG5cbiAgICBob3VyPzogbnVtYmVyO1xuXG4gICAgbWludXRlPzogbnVtYmVyO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgU3BlY2lhbE9wZW5pbmdEYXkuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFNwZWNpYWxPcGVuaW5nRGF5IHtcbiAgICBjbG9zZWQ/OiBib29sZWFuO1xuXG4gICAgY2xvc2luZ1RpbWU/OiBUaW1lO1xuXG4gICAgY29tbWVudD86IHN0cmluZztcblxuICAgIGRhdGU/OiBEYXRlO1xuXG4gICAgZm9ybWF0dGVkRGF0ZT86IHN0cmluZztcblxuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICBvcGVuaW5nVGltZT86IFRpbWU7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBXZWVrZGF5T3BlbmluZ0RheS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgV2Vla2RheU9wZW5pbmdEYXkge1xuICAgIGNsb3NlZD86IGJvb2xlYW47XG5cbiAgICBjbG9zaW5nVGltZT86IFRpbWU7XG5cbiAgICBvcGVuaW5nVGltZT86IFRpbWU7XG5cbiAgICB3ZWVrRGF5Pzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgT3BlbmluZ1NjaGVkdWxlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBPcGVuaW5nU2NoZWR1bGUge1xuICAgIGNvZGU/OiBzdHJpbmc7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuXG4gICAgc3BlY2lhbERheU9wZW5pbmdMaXN0PzogU3BlY2lhbE9wZW5pbmdEYXlbXTtcblxuICAgIHdlZWtEYXlPcGVuaW5nTGlzdD86IFdlZWtkYXlPcGVuaW5nRGF5W107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQb2ludE9mU2VydmljZS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUG9pbnRPZlNlcnZpY2Uge1xuICAgIGFkZHJlc3M/OiBBZGRyZXNzO1xuXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgICBkaXNwbGF5TmFtZT86IHN0cmluZztcblxuICAgIGRpc3RhbmNlS20/OiBudW1iZXI7XG5cbiAgICBmZWF0dXJlcz86IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG5cbiAgICBmb3JtYXR0ZWREaXN0YW5jZT86IHN0cmluZztcblxuICAgIGdlb1BvaW50PzogR2VvUG9pbnQ7XG5cbiAgICBtYXBJY29uPzogSW1hZ2U7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuXG4gICAgb3BlbmluZ0hvdXJzPzogT3BlbmluZ1NjaGVkdWxlO1xuXG4gICAgc3RvcmVDb250ZW50Pzogc3RyaW5nO1xuXG4gICAgc3RvcmVJbWFnZXM/OiBJbWFnZVtdO1xuXG4gICAgdXJsPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ2F0ZWdvcnkuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIENhdGVnb3J5IHtcbiAgICBjb2RlPzogc3RyaW5nO1xuXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIGltYWdlPzogSW1hZ2U7XG5cbiAgICB1cmw/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBGZWF0dXJlVW5pdC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgRmVhdHVyZVVuaXQge1xuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICBzeW1ib2w/OiBzdHJpbmc7XG5cbiAgICB1bml0VHlwZT86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIEZlYXR1cmVWYWx1ZS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgRmVhdHVyZVZhbHVlIHtcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIEZlYXR1cmUuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEZlYXR1cmUge1xuICAgIGNvZGU/OiBzdHJpbmc7XG5cbiAgICBjb21wYXJhYmxlPzogYm9vbGVhbjtcblxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXG4gICAgZmVhdHVyZVVuaXQ/OiBGZWF0dXJlVW5pdDtcblxuICAgIGZlYXR1cmVWYWx1ZXM/OiBGZWF0dXJlVmFsdWVbXTtcblxuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICByYW5nZT86IGJvb2xlYW47XG5cbiAgICB0eXBlPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ2xhc3NpZmljYXRpb24uXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIENsYXNzaWZpY2F0aW9uIHtcbiAgICBjb2RlPzogc3RyaW5nO1xuXG4gICAgZmVhdHVyZXM/OiBGZWF0dXJlW107XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgRnV0dXJlU3RvY2suXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEZ1dHVyZVN0b2NrIHtcbiAgICBkYXRlPzogRGF0ZTtcblxuICAgIGZvcm1hdHRlZERhdGU/OiBzdHJpbmc7XG5cbiAgICBzdG9jaz86IFN0b2NrO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUHJpY2VSYW5nZS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUHJpY2VSYW5nZSB7XG4gICAgbWF4UHJpY2U/OiBQcmljZTtcblxuICAgIG1pblByaWNlPzogUHJpY2U7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQcm9kdWN0UmVmZXJlbmNlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBQcm9kdWN0UmVmZXJlbmNlIHtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcblxuICAgIHByZXNlbGVjdGVkPzogYm9vbGVhbjtcblxuICAgIHF1YW50aXR5PzogbnVtYmVyO1xuXG4gICAgcmVmZXJlbmNlVHlwZT86IHN0cmluZztcblxuICAgIHRhcmdldD86IFByb2R1Y3Q7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBMYW5ndWFnZS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgTGFuZ3VhZ2Uge1xuICAgIGFjdGl2ZT86IGJvb2xlYW47XG5cbiAgICBpc29jb2RlPzogc3RyaW5nO1xuXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIG5hdGl2ZU5hbWU/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBVc2VyLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBVc2VyIHtcbiAgICBjdXJyZW5jeT86IEN1cnJlbmN5O1xuXG4gICAgY3VzdG9tZXJJZD86IHN0cmluZztcblxuICAgIGRlYWN0aXZhdGlvbkRhdGU/OiBEYXRlO1xuXG4gICAgZGVmYXVsdEFkZHJlc3M/OiBBZGRyZXNzO1xuXG4gICAgZGlzcGxheVVpZD86IHN0cmluZztcblxuICAgIGZpcnN0TmFtZT86IHN0cmluZztcblxuICAgIGxhbmd1YWdlPzogTGFuZ3VhZ2U7XG5cbiAgICBsYXN0TmFtZT86IHN0cmluZztcblxuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICB0aXRsZT86IHN0cmluZztcblxuICAgIHRpdGxlQ29kZT86IHN0cmluZztcblxuICAgIHVpZD86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFJldmlldy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUmV2aWV3IHtcbiAgICBhbGlhcz86IHN0cmluZztcblxuICAgIGNvbW1lbnQ/OiBzdHJpbmc7XG5cbiAgICBkYXRlPzogRGF0ZTtcblxuICAgIGhlYWRsaW5lPzogc3RyaW5nO1xuXG4gICAgaWQ/OiBzdHJpbmc7XG5cbiAgICBwcmluY2lwYWw/OiBVc2VyO1xuXG4gICAgcmF0aW5nPzogbnVtYmVyO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgVmFyaWFudENhdGVnb3J5LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBWYXJpYW50Q2F0ZWdvcnkge1xuICAgIGhhc0ltYWdlPzogYm9vbGVhbjtcblxuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICBwcmlvcml0eT86IG51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFZhcmlhbnRWYWx1ZUNhdGVnb3J5LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBWYXJpYW50VmFsdWVDYXRlZ29yeSB7XG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIHNlcXVlbmNlPzogbnVtYmVyO1xuXG4gICAgc3VwZXJDYXRlZ29yaWVzPzogVmFyaWFudENhdGVnb3J5W107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBWYXJpYW50TWF0cml4RWxlbWVudC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgVmFyaWFudE1hdHJpeEVsZW1lbnQge1xuICAgIGVsZW1lbnRzPzogVmFyaWFudE1hdHJpeEVsZW1lbnRbXTtcblxuICAgIGlzTGVhZj86IGJvb2xlYW47XG5cbiAgICBwYXJlbnRWYXJpYW50Q2F0ZWdvcnk/OiBWYXJpYW50Q2F0ZWdvcnk7XG5cbiAgICB2YXJpYW50T3B0aW9uPzogVmFyaWFudE9wdGlvbjtcblxuICAgIHZhcmlhbnRWYWx1ZUNhdGVnb3J5PzogVmFyaWFudFZhbHVlQ2F0ZWdvcnk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQcm9kdWN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBQcm9kdWN0IHtcbiAgICBhdmFpbGFibGVGb3JQaWNrdXA/OiBib29sZWFuO1xuXG4gICAgYXZlcmFnZVJhdGluZz86IG51bWJlcjtcblxuICAgIGJhc2VPcHRpb25zPzogQmFzZU9wdGlvbltdO1xuXG4gICAgYmFzZVByb2R1Y3Q/OiBzdHJpbmc7XG5cbiAgICBjYXRlZ29yaWVzPzogQ2F0ZWdvcnlbXTtcblxuICAgIGNsYXNzaWZpY2F0aW9ucz86IENsYXNzaWZpY2F0aW9uW107XG5cbiAgICBjb2RlPzogc3RyaW5nO1xuXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgICBmdXR1cmVTdG9ja3M/OiBGdXR1cmVTdG9ja1tdO1xuXG4gICAgaW1hZ2VzPzogSW1hZ2VbXTtcblxuICAgIG1hbnVmYWN0dXJlcj86IHN0cmluZztcblxuICAgIG11bHRpZGltZW5zaW9uYWw/OiBib29sZWFuO1xuXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIG51bWJlck9mUmV2aWV3cz86IG51bWJlcjtcblxuICAgIHBvdGVudGlhbFByb21vdGlvbnM/OiBQcm9tb3Rpb25bXTtcblxuICAgIHByaWNlPzogUHJpY2U7XG5cbiAgICBwcmljZVJhbmdlPzogUHJpY2VSYW5nZTtcblxuICAgIHByb2R1Y3RSZWZlcmVuY2VzPzogUHJvZHVjdFJlZmVyZW5jZVtdO1xuXG4gICAgcHVyY2hhc2FibGU/OiBib29sZWFuO1xuXG4gICAgcmV2aWV3cz86IFJldmlld1tdO1xuXG4gICAgc3RvY2s/OiBTdG9jaztcblxuICAgIHN1bW1hcnk/OiBzdHJpbmc7XG5cbiAgICB1cmw/OiBzdHJpbmc7XG5cbiAgICB2YXJpYW50TWF0cml4PzogVmFyaWFudE1hdHJpeEVsZW1lbnRbXTtcblxuICAgIHZhcmlhbnRPcHRpb25zPzogVmFyaWFudE9wdGlvbltdO1xuXG4gICAgdmFyaWFudFR5cGU/OiBzdHJpbmc7XG5cbiAgICB2b2x1bWVQcmljZXM/OiBQcmljZVtdO1xuXG4gICAgdm9sdW1lUHJpY2VzRmxhZz86IGJvb2xlYW47XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBPcmRlckVudHJ5LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBPcmRlckVudHJ5IHtcbiAgICBiYXNlUHJpY2U/OiBQcmljZTtcblxuICAgIGRlbGl2ZXJ5TW9kZT86IERlbGl2ZXJ5TW9kZTtcblxuICAgIGRlbGl2ZXJ5UG9pbnRPZlNlcnZpY2U/OiBQb2ludE9mU2VydmljZTtcblxuICAgIGVudHJ5TnVtYmVyPzogbnVtYmVyO1xuXG4gICAgcHJvZHVjdD86IFByb2R1Y3Q7XG5cbiAgICBxdWFudGl0eT86IG51bWJlcjtcblxuICAgIHRvdGFsUHJpY2U/OiBQcmljZTtcblxuICAgIHVwZGF0ZWFibGU/OiBib29sZWFuO1xuXG4gICAgc3RhdHVzU3VtbWFyeUxpc3Q/OiBTdGF0dXNTdW1tYXJ5W107XG5cbiAgICBjb25maWd1cmF0aW9uSW5mb3M/OiBDb25maWd1cmF0aW9uSW5mb1tdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ29uZmlndXJhdGlvbkluZm8uXG4gICAqIFByb3ZpZGVzIGluZm9ybWF0aW9uIGFib3V0IGNvbmZpZ3VyYXRpb24gdmFsdWVzIG9mIHRoZSBlbnRyeS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29uZmlndXJhdGlvbkluZm8ge1xuICAgIGNvbmZpZ3VyYXRpb25MYWJlbD86IHN0cmluZztcblxuICAgIGNvbmZpZ3VyYXRpb25WYWx1ZT86IHN0cmluZztcblxuICAgIGNvbmZpZ3VyYXRvclR5cGU/OiBzdHJpbmc7XG5cbiAgICBzdGF0dXM/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogUG9zc2libGUgb3JkZXIgZW50cnkgc3RhdHVzZXNcbiAgICovXG4gIGV4cG9ydCBlbnVtIE9yZGVyRW50cnlTdGF0dXMge1xuICAgIFN1Y2Nlc3MgPSAnU1VDQ0VTUycsXG4gICAgSW5mbyA9ICdJTkZPJyxcbiAgICBXYXJuaW5nID0gJ1dBUk5JTkcnLFxuICAgIEVycm9yID0gJ0VSUk9SJyxcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFN0YXR1c1N1bW1hcnkuXG4gICAqIFByb3ZpZGVzIHN0YXR1cyBpbmNsdWRpbmcgbnVtYmVyIG9mIGlzc3VlcyBmb3IgY29uZmlndXJhYmxlIGVudHJ5LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTdGF0dXNTdW1tYXJ5IHtcbiAgICBudW1iZXJPZklzc3Vlcz86IG51bWJlcjtcblxuICAgIHN0YXR1cz86IE9yZGVyRW50cnlTdGF0dXM7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBEZWxpdmVyeU9yZGVyRW50cnlHcm91cC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgRGVsaXZlcnlPcmRlckVudHJ5R3JvdXAge1xuICAgIGRlbGl2ZXJ5QWRkcmVzcz86IEFkZHJlc3M7XG5cbiAgICBlbnRyaWVzPzogT3JkZXJFbnRyeVtdO1xuXG4gICAgcXVhbnRpdHk/OiBudW1iZXI7XG5cbiAgICB0b3RhbFByaWNlV2l0aFRheD86IFByaWNlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUGF5bWVudERldGFpbHMuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFBheW1lbnREZXRhaWxzIHtcbiAgICBhY2NvdW50SG9sZGVyTmFtZT86IHN0cmluZztcblxuICAgIGJpbGxpbmdBZGRyZXNzPzogQWRkcmVzcztcblxuICAgIGNhcmROdW1iZXI/OiBzdHJpbmc7XG5cbiAgICBjYXJkVHlwZT86IENhcmRUeXBlO1xuXG4gICAgY3ZuPzogc3RyaW5nO1xuXG4gICAgZGVmYXVsdFBheW1lbnQ/OiBib29sZWFuO1xuXG4gICAgZXhwaXJ5TW9udGg/OiBzdHJpbmc7XG5cbiAgICBleHBpcnlZZWFyPzogc3RyaW5nO1xuXG4gICAgaWQ/OiBzdHJpbmc7XG5cbiAgICBpc3N1ZU51bWJlcj86IHN0cmluZztcblxuICAgIHNhdmVkPzogYm9vbGVhbjtcblxuICAgIHN0YXJ0TW9udGg/OiBzdHJpbmc7XG5cbiAgICBzdGFydFllYXI/OiBzdHJpbmc7XG5cbiAgICBzdWJzY3JpcHRpb25JZD86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFBpY2t1cE9yZGVyRW50cnlHcm91cC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUGlja3VwT3JkZXJFbnRyeUdyb3VwIHtcbiAgICBkZWxpdmVyeVBvaW50T2ZTZXJ2aWNlPzogUG9pbnRPZlNlcnZpY2U7XG5cbiAgICBkaXN0YW5jZT86IG51bWJlcjtcblxuICAgIGVudHJpZXM/OiBPcmRlckVudHJ5W107XG5cbiAgICBxdWFudGl0eT86IG51bWJlcjtcblxuICAgIHRvdGFsUHJpY2VXaXRoVGF4PzogUHJpY2U7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQcmluY2lwYWwuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFByaW5jaXBhbCB7XG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIHVpZD86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIENhcnQuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIENhcnQge1xuICAgIGFwcGxpZWRPcmRlclByb21vdGlvbnM/OiBQcm9tb3Rpb25SZXN1bHRbXTtcblxuICAgIGFwcGxpZWRQcm9kdWN0UHJvbW90aW9ucz86IFByb21vdGlvblJlc3VsdFtdO1xuXG4gICAgYXBwbGllZFZvdWNoZXJzPzogVm91Y2hlcltdO1xuXG4gICAgY2FsY3VsYXRlZD86IGJvb2xlYW47XG5cbiAgICBjb2RlPzogc3RyaW5nO1xuXG4gICAgZGVsaXZlcnlBZGRyZXNzPzogQWRkcmVzcztcblxuICAgIGRlbGl2ZXJ5Q29zdD86IFByaWNlO1xuXG4gICAgZGVsaXZlcnlJdGVtc1F1YW50aXR5PzogbnVtYmVyO1xuXG4gICAgZGVsaXZlcnlNb2RlPzogRGVsaXZlcnlNb2RlO1xuXG4gICAgZGVsaXZlcnlPcmRlckdyb3Vwcz86IERlbGl2ZXJ5T3JkZXJFbnRyeUdyb3VwW107XG5cbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcblxuICAgIGVudHJpZXM/OiBPcmRlckVudHJ5W107XG5cbiAgICBleHBpcmF0aW9uVGltZT86IERhdGU7XG5cbiAgICBndWlkPzogc3RyaW5nO1xuXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIG5ldD86IGJvb2xlYW47XG5cbiAgICBvcmRlckRpc2NvdW50cz86IFByaWNlO1xuXG4gICAgcGF5bWVudEluZm8/OiBQYXltZW50RGV0YWlscztcblxuICAgIHBpY2t1cEl0ZW1zUXVhbnRpdHk/OiBudW1iZXI7XG5cbiAgICBwaWNrdXBPcmRlckdyb3Vwcz86IFBpY2t1cE9yZGVyRW50cnlHcm91cFtdO1xuXG4gICAgcG90ZW50aWFsT3JkZXJQcm9tb3Rpb25zPzogUHJvbW90aW9uUmVzdWx0W107XG5cbiAgICBwb3RlbnRpYWxQcm9kdWN0UHJvbW90aW9ucz86IFByb21vdGlvblJlc3VsdFtdO1xuXG4gICAgcHJvZHVjdERpc2NvdW50cz86IFByaWNlO1xuXG4gICAgc2F2ZVRpbWU/OiBEYXRlO1xuXG4gICAgc2F2ZWRCeT86IFByaW5jaXBhbDtcblxuICAgIHNpdGU/OiBzdHJpbmc7XG5cbiAgICBzdG9yZT86IHN0cmluZztcblxuICAgIHN1YlRvdGFsPzogUHJpY2U7XG5cbiAgICB0b3RhbERpc2NvdW50cz86IFByaWNlO1xuXG4gICAgdG90YWxJdGVtcz86IG51bWJlcjtcblxuICAgIHRvdGFsUHJpY2U/OiBQcmljZTtcblxuICAgIHRvdGFsUHJpY2VXaXRoVGF4PzogUHJpY2U7XG5cbiAgICB0b3RhbFRheD86IFByaWNlO1xuXG4gICAgdG90YWxVbml0Q291bnQ/OiBudW1iZXI7XG5cbiAgICB1c2VyPzogUHJpbmNpcGFsO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ2FydExpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIENhcnRMaXN0IHtcbiAgICBjYXJ0cz86IENhcnRbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIENhcnRNb2RpZmljYXRpb24uXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIENhcnRNb2RpZmljYXRpb24ge1xuICAgIGRlbGl2ZXJ5TW9kZUNoYW5nZWQ/OiBib29sZWFuO1xuXG4gICAgZW50cnk/OiBPcmRlckVudHJ5O1xuXG4gICAgcXVhbnRpdHk/OiBudW1iZXI7XG5cbiAgICBxdWFudGl0eUFkZGVkPzogbnVtYmVyO1xuXG4gICAgc3RhdHVzQ29kZT86IHN0cmluZztcblxuICAgIHN0YXR1c01lc3NhZ2U/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBDYXRlZ29yeUhpZXJhcmNoeS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ2F0ZWdvcnlIaWVyYXJjaHkge1xuICAgIGlkPzogc3RyaW5nO1xuXG4gICAgbGFzdE1vZGlmaWVkPzogRGF0ZTtcblxuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICBzdWJjYXRlZ29yaWVzPzogQ2F0ZWdvcnlIaWVyYXJjaHlbXTtcblxuICAgIHVybD86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIENhdGFsb2dWZXJzaW9uLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBDYXRhbG9nVmVyc2lvbiB7XG4gICAgY2F0ZWdvcmllcz86IENhdGVnb3J5SGllcmFyY2h5W107XG5cbiAgICBpZD86IHN0cmluZztcblxuICAgIGxhc3RNb2RpZmllZD86IERhdGU7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuXG4gICAgdXJsPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ2F0YWxvZy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ2F0YWxvZyB7XG4gICAgY2F0YWxvZ1ZlcnNpb25zPzogQ2F0YWxvZ1ZlcnNpb25bXTtcblxuICAgIGlkPzogc3RyaW5nO1xuXG4gICAgbGFzdE1vZGlmaWVkPzogRGF0ZTtcblxuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICB1cmw/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBDYXRhbG9nTGlzdC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ2F0YWxvZ0xpc3Qge1xuICAgIGNhdGFsb2dzPzogQ2F0YWxvZ1tdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ29tcG9uZW50SURMaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBDb21wb25lbnRJRExpc3Qge1xuICAgIGlkTGlzdD86IHN0cmluZ1tdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ29uc2lnbm1lbnRFbnRyeS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29uc2lnbm1lbnRFbnRyeSB7XG4gICAgb3JkZXJFbnRyeT86IE9yZGVyRW50cnk7XG5cbiAgICBxdWFudGl0eT86IG51bWJlcjtcblxuICAgIHNoaXBwZWRRdWFudGl0eT86IG51bWJlcjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIENvbnNpZ25tZW50LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBDb25zaWdubWVudCB7XG4gICAgY29kZT86IHN0cmluZztcblxuICAgIGRlbGl2ZXJ5UG9pbnRPZlNlcnZpY2U/OiBQb2ludE9mU2VydmljZTtcblxuICAgIGVudHJpZXM/OiBDb25zaWdubWVudEVudHJ5W107XG5cbiAgICBzaGlwcGluZ0FkZHJlc3M/OiBBZGRyZXNzO1xuXG4gICAgc3RhdHVzPzogc3RyaW5nO1xuXG4gICAgc3RhdHVzRGF0ZT86IERhdGU7XG5cbiAgICB0cmFja2luZ0lEPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgQ291bnRyeUxpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIENvdW50cnlMaXN0IHtcbiAgICBjb3VudHJpZXM/OiBDb3VudHJ5W107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBDdXJyZW5jeUxpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEN1cnJlbmN5TGlzdCB7XG4gICAgY3VycmVuY2llcz86IEN1cnJlbmN5W107XG4gIH1cblxuICAvKipcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBDdXN0b21lckNvdXBvblxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBDdXN0b21lckNvdXBvbiB7XG4gICAgY291cG9uSWQ/OiBzdHJpbmc7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuXG4gICAgc3RhcnREYXRlPzogc3RyaW5nO1xuXG4gICAgZW5kRGF0ZT86IHN0cmluZztcblxuICAgIHN0YXR1cz86IHN0cmluZztcblxuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXG4gICAgbm90aWZpY2F0aW9uT24/OiBib29sZWFuO1xuXG4gICAgYWxsUHJvZHVjdHNBcHBsaWNhYmxlPzogYm9vbGVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIEN1c3RvbWVyQ291cG9uU2VhcmNoUmVzdWx0XG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEN1c3RvbWVyQ291cG9uU2VhcmNoUmVzdWx0IHtcbiAgICBjb3Vwb25zPzogQ3VzdG9tZXJDb3Vwb25bXTtcblxuICAgIHNvcnRzPzogU29ydFtdO1xuXG4gICAgcGFnaW5hdGlvbj86IFBhZ2luYXRpb247XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBEZWxpdmVyeU1vZGVMaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBEZWxpdmVyeU1vZGVMaXN0IHtcbiAgICBkZWxpdmVyeU1vZGVzPzogRGVsaXZlcnlNb2RlW107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBGYWNldFZhbHVlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBGYWNldFZhbHVlIHtcbiAgICBjb3VudD86IG51bWJlcjtcblxuICAgIG5hbWU/OiBzdHJpbmc7XG5cbiAgICBxdWVyeT86IFNlYXJjaFN0YXRlO1xuXG4gICAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgRmFjZXQuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIEZhY2V0IHtcbiAgICBjYXRlZ29yeT86IGJvb2xlYW47XG5cbiAgICBtdWx0aVNlbGVjdD86IGJvb2xlYW47XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuXG4gICAgcHJpb3JpdHk/OiBudW1iZXI7XG5cbiAgICB0b3BWYWx1ZXM/OiBGYWNldFZhbHVlW107XG5cbiAgICB2YWx1ZXM/OiBGYWNldFZhbHVlW107XG5cbiAgICB2aXNpYmxlPzogYm9vbGVhbjtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIExhbmd1YWdlTGlzdC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgTGFuZ3VhZ2VMaXN0IHtcbiAgICBsYW5ndWFnZXM/OiBMYW5ndWFnZVtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUGFnaW5hdGlvbi5cbiAgICogUGFnaW5hdGlvbiBpbmZvXG4gICAqXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFBhZ2luYXRpb24ge1xuICAgIC8qKlxuICAgICAqIE51bWJlciBvZiBlbGVtZW50cyBvbiB0aGlzIHBhZ2VcbiAgICAgKi9cbiAgICBjb3VudD86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IHBhZ2UgbnVtYmVyXG4gICAgICovXG4gICAgcGFnZT86IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBUb3RhbCBudW1iZXIgb2YgZWxlbWVudHNcbiAgICAgKi9cbiAgICB0b3RhbENvdW50PzogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFRvdGFsIG51bWJlciBvZiBwYWdlc1xuICAgICAqL1xuICAgIHRvdGFsUGFnZXM/OiBudW1iZXI7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBTb3J0LlxuICAgKiBTb3J0IG9wdGlvblxuICAgKlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTb3J0IHtcbiAgICBhc2M/OiBib29sZWFuO1xuXG4gICAgY29kZT86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIExpc3RBZGFwdGVkQ29tcG9uZW50cy5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgTGlzdEFkYXB0ZWRDb21wb25lbnRzIHtcbiAgICBjb21wb25lbnRzPzogYW55W107XG5cbiAgICBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbjtcblxuICAgIHNvcnRzPzogU29ydFtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgTWVtYmVyTGlzdC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgTWVtYmVyTGlzdCB7XG4gICAgbWVtYmVycz86IFByaW5jaXBhbFtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgT3JkZXJFbnRyeUxpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIE9yZGVyRW50cnlMaXN0IHtcbiAgICBvcmRlckVudHJpZXM/OiBPcmRlckVudHJ5W107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBPcmRlckhpc3RvcnkuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIE9yZGVySGlzdG9yeSB7XG4gICAgY29kZT86IHN0cmluZztcblxuICAgIGd1aWQ/OiBzdHJpbmc7XG5cbiAgICBwbGFjZWQ/OiBEYXRlO1xuXG4gICAgc3RhdHVzPzogc3RyaW5nO1xuXG4gICAgc3RhdHVzRGlzcGxheT86IHN0cmluZztcblxuICAgIHRvdGFsPzogUHJpY2U7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQYWdpbmF0aW9uTW9kZWwuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFBhZ2luYXRpb25Nb2RlbCB7XG4gICAgY3VycmVudFBhZ2U/OiBudW1iZXI7XG5cbiAgICBwYWdlU2l6ZT86IG51bWJlcjtcblxuICAgIHNvcnQ/OiBzdHJpbmc7XG5cbiAgICB0b3RhbFBhZ2VzPzogbnVtYmVyO1xuXG4gICAgdG90YWxSZXN1bHRzPzogbnVtYmVyO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgU29ydE1vZGVsLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTb3J0TW9kZWwge1xuICAgIGNvZGU/OiBzdHJpbmc7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuXG4gICAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgT3JkZXJIaXN0b3J5TGlzdC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgT3JkZXJIaXN0b3J5TGlzdCB7XG4gICAgb3JkZXJzPzogT3JkZXJIaXN0b3J5W107XG5cbiAgICBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbk1vZGVsO1xuXG4gICAgc29ydHM/OiBTb3J0TW9kZWxbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIE9yZGVyU3RhdHVzVXBkYXRlRWxlbWVudC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgT3JkZXJTdGF0dXNVcGRhdGVFbGVtZW50IHtcbiAgICBiYXNlU2l0ZUlkPzogc3RyaW5nO1xuXG4gICAgY29kZT86IHN0cmluZztcblxuICAgIHN0YXR1cz86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIE9yZGVyU3RhdHVzVXBkYXRlRWxlbWVudExpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIE9yZGVyU3RhdHVzVXBkYXRlRWxlbWVudExpc3Qge1xuICAgIG9yZGVyU3RhdHVzVXBkYXRlRWxlbWVudHM/OiBPcmRlclN0YXR1c1VwZGF0ZUVsZW1lbnRbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIE9yZGVyLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBPcmRlciB7XG4gICAgYXBwbGllZE9yZGVyUHJvbW90aW9ucz86IFByb21vdGlvblJlc3VsdFtdO1xuXG4gICAgYXBwbGllZFByb2R1Y3RQcm9tb3Rpb25zPzogUHJvbW90aW9uUmVzdWx0W107XG5cbiAgICBhcHBsaWVkVm91Y2hlcnM/OiBWb3VjaGVyW107XG5cbiAgICBjYWxjdWxhdGVkPzogYm9vbGVhbjtcblxuICAgIGNvZGU/OiBzdHJpbmc7XG5cbiAgICBjb25zaWdubWVudHM/OiBDb25zaWdubWVudFtdO1xuXG4gICAgY3JlYXRlZD86IERhdGU7XG5cbiAgICBkZWxpdmVyeUFkZHJlc3M/OiBBZGRyZXNzO1xuXG4gICAgZGVsaXZlcnlDb3N0PzogUHJpY2U7XG5cbiAgICBkZWxpdmVyeUl0ZW1zUXVhbnRpdHk/OiBudW1iZXI7XG5cbiAgICBkZWxpdmVyeU1vZGU/OiBEZWxpdmVyeU1vZGU7XG5cbiAgICBkZWxpdmVyeU9yZGVyR3JvdXBzPzogRGVsaXZlcnlPcmRlckVudHJ5R3JvdXBbXTtcblxuICAgIGRlbGl2ZXJ5U3RhdHVzPzogc3RyaW5nO1xuXG4gICAgZGVsaXZlcnlTdGF0dXNEaXNwbGF5Pzogc3RyaW5nO1xuXG4gICAgZW50cmllcz86IE9yZGVyRW50cnlbXTtcblxuICAgIGd1ZXN0Q3VzdG9tZXI/OiBib29sZWFuO1xuXG4gICAgZ3VpZD86IHN0cmluZztcblxuICAgIG5ldD86IGJvb2xlYW47XG5cbiAgICBvcmRlckRpc2NvdW50cz86IFByaWNlO1xuXG4gICAgcGF5bWVudEluZm8/OiBQYXltZW50RGV0YWlscztcblxuICAgIHBpY2t1cEl0ZW1zUXVhbnRpdHk/OiBudW1iZXI7XG5cbiAgICBwaWNrdXBPcmRlckdyb3Vwcz86IFBpY2t1cE9yZGVyRW50cnlHcm91cFtdO1xuXG4gICAgcHJvZHVjdERpc2NvdW50cz86IFByaWNlO1xuXG4gICAgc2l0ZT86IHN0cmluZztcblxuICAgIHN0YXR1cz86IHN0cmluZztcblxuICAgIHN0YXR1c0Rpc3BsYXk/OiBzdHJpbmc7XG5cbiAgICBzdG9yZT86IHN0cmluZztcblxuICAgIHN1YlRvdGFsPzogUHJpY2U7XG5cbiAgICB0b3RhbERpc2NvdW50cz86IFByaWNlO1xuXG4gICAgdG90YWxJdGVtcz86IG51bWJlcjtcblxuICAgIHRvdGFsUHJpY2U/OiBQcmljZTtcblxuICAgIHRvdGFsUHJpY2VXaXRoVGF4PzogUHJpY2U7XG5cbiAgICB0b3RhbFRheD86IFByaWNlO1xuXG4gICAgdW5jb25zaWduZWRFbnRyaWVzPzogT3JkZXJFbnRyeVtdO1xuXG4gICAgdXNlcj86IFByaW5jaXBhbDtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFJldHVyblJlcXVlc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFJldHVyblJlcXVlc3Qge1xuICAgIGNhbmNlbGxhYmxlPzogYm9vbGVhbjtcblxuICAgIGNvZGU/OiBzdHJpbmc7XG5cbiAgICBjcmVhdGlvblRpbWU/OiBEYXRlO1xuXG4gICAgZGVsaXZlcnlDb3N0PzogUHJpY2U7XG5cbiAgICBvcmRlcj86IE9yZGVyO1xuXG4gICAgcmVmdW5kRGVsaXZlcnlDb3N0PzogYm9vbGVhbjtcblxuICAgIHJldHVybkVudHJpZXM/OiBSZXR1cm5SZXF1ZXN0RW50cnlbXTtcblxuICAgIHJldHVybkxhYmVsRG93bmxvYWRVcmw/OiBzdHJpbmc7XG5cbiAgICBybWE/OiBzdHJpbmc7XG5cbiAgICBzdGF0dXM/OiBzdHJpbmc7XG5cbiAgICBzdWJUb3RhbD86IFByaWNlO1xuXG4gICAgdG90YWxQcmljZT86IFByaWNlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUmV0dXJuUmVxdWVzdEVudHJ5LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBSZXR1cm5SZXF1ZXN0RW50cnkge1xuICAgIG9yZGVyRW50cnk/OiBPcmRlckVudHJ5O1xuXG4gICAgZXhwZWN0ZWRRdWFudGl0eT86IG51bWJlcjtcblxuICAgIHJlZnVuZEFtb3VudD86IFByaWNlO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUGF5bWVudERldGFpbHNMaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBQYXltZW50RGV0YWlsc0xpc3Qge1xuICAgIHBheW1lbnRzPzogUGF5bWVudERldGFpbHNbXTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFBvaW50T2ZTZXJ2aWNlU3RvY2suXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFBvaW50T2ZTZXJ2aWNlU3RvY2sge1xuICAgIGFkZHJlc3M/OiBBZGRyZXNzO1xuXG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgICBkaXNwbGF5TmFtZT86IHN0cmluZztcblxuICAgIGRpc3RhbmNlS20/OiBudW1iZXI7XG5cbiAgICBmZWF0dXJlcz86IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogc3RyaW5nIH07XG5cbiAgICBmb3JtYXR0ZWREaXN0YW5jZT86IHN0cmluZztcblxuICAgIGdlb1BvaW50PzogR2VvUG9pbnQ7XG5cbiAgICBtYXBJY29uPzogSW1hZ2U7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuXG4gICAgb3BlbmluZ0hvdXJzPzogT3BlbmluZ1NjaGVkdWxlO1xuXG4gICAgc3RvY2tJbmZvPzogU3RvY2s7XG5cbiAgICBzdG9yZUNvbnRlbnQ/OiBzdHJpbmc7XG5cbiAgICBzdG9yZUltYWdlcz86IEltYWdlW107XG5cbiAgICB1cmw/OiBzdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQcm9kdWN0RXhwcmVzc1VwZGF0ZUVsZW1lbnQuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RFeHByZXNzVXBkYXRlRWxlbWVudCB7XG4gICAgY2F0YWxvZ0lkPzogc3RyaW5nO1xuXG4gICAgY2F0YWxvZ1ZlcnNpb24/OiBzdHJpbmc7XG5cbiAgICBjb2RlPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUHJvZHVjdEV4cHJlc3NVcGRhdGVFbGVtZW50TGlzdC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEV4cHJlc3NVcGRhdGVFbGVtZW50TGlzdCB7XG4gICAgcHJvZHVjdEV4cHJlc3NVcGRhdGVFbGVtZW50cz86IFByb2R1Y3RFeHByZXNzVXBkYXRlRWxlbWVudFtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUHJvZHVjdExpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RMaXN0IHtcbiAgICBjYXRhbG9nPzogc3RyaW5nO1xuXG4gICAgY3VycmVudFBhZ2U/OiBudW1iZXI7XG5cbiAgICBwcm9kdWN0cz86IFByb2R1Y3RbXTtcblxuICAgIHRvdGFsUGFnZUNvdW50PzogbnVtYmVyO1xuXG4gICAgdG90YWxQcm9kdWN0Q291bnQ/OiBudW1iZXI7XG5cbiAgICB2ZXJzaW9uPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgUHJvZHVjdFJlZmVyZW5jZUxpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RSZWZlcmVuY2VMaXN0IHtcbiAgICByZWZlcmVuY2VzPzogUHJvZHVjdFJlZmVyZW5jZVtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgU3BlbGxpbmdTdWdnZXN0aW9uLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTcGVsbGluZ1N1Z2dlc3Rpb24ge1xuICAgIHF1ZXJ5Pzogc3RyaW5nO1xuXG4gICAgc3VnZ2VzdGlvbj86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFByb2R1Y3RTZWFyY2hQYWdlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBQcm9kdWN0U2VhcmNoUGFnZSB7XG4gICAgYnJlYWRjcnVtYnM/OiBCcmVhZGNydW1iW107XG5cbiAgICBjYXRlZ29yeUNvZGU/OiBzdHJpbmc7XG5cbiAgICBjdXJyZW50UXVlcnk/OiBTZWFyY2hTdGF0ZTtcblxuICAgIGZhY2V0cz86IEZhY2V0W107XG5cbiAgICBmcmVlVGV4dFNlYXJjaD86IHN0cmluZztcblxuICAgIGtleXdvcmRSZWRpcmVjdFVybD86IHN0cmluZztcblxuICAgIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uTW9kZWw7XG5cbiAgICBwcm9kdWN0cz86IFByb2R1Y3RbXTtcblxuICAgIHNvcnRzPzogU29ydE1vZGVsW107XG5cbiAgICBzcGVsbGluZ1N1Z2dlc3Rpb24/OiBTcGVsbGluZ1N1Z2dlc3Rpb247XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQcm9tb3Rpb25MaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBQcm9tb3Rpb25MaXN0IHtcbiAgICBwcm9tb3Rpb25zPzogUHJvbW90aW9uW107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBQcm9tb3Rpb25SZXN1bHRMaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBQcm9tb3Rpb25SZXN1bHRMaXN0IHtcbiAgICBwcm9tb3Rpb25zPzogUHJvbW90aW9uUmVzdWx0W107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBSZXZpZXdMaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBSZXZpZXdMaXN0IHtcbiAgICByZXZpZXdzPzogUmV2aWV3W107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBTYXZlQ2FydFJlc3VsdC5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgU2F2ZUNhcnRSZXN1bHQge1xuICAgIHNhdmVkQ2FydERhdGE/OiBDYXJ0O1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgU3RvcmVGaW5kZXJTZWFyY2hQYWdlLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTdG9yZUZpbmRlclNlYXJjaFBhZ2Uge1xuICAgIGJvdW5kRWFzdExvbmdpdHVkZT86IG51bWJlcjtcblxuICAgIGJvdW5kTm9ydGhMYXRpdHVkZT86IG51bWJlcjtcblxuICAgIGJvdW5kU291dGhMYXRpdHVkZT86IG51bWJlcjtcblxuICAgIGJvdW5kV2VzdExvbmdpdHVkZT86IG51bWJlcjtcblxuICAgIGxvY2F0aW9uVGV4dD86IHN0cmluZztcblxuICAgIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uTW9kZWw7XG5cbiAgICBzb3J0cz86IFNvcnRNb2RlbFtdO1xuXG4gICAgc291cmNlTGF0aXR1ZGU/OiBudW1iZXI7XG5cbiAgICBzb3VyY2VMb25naXR1ZGU/OiBudW1iZXI7XG5cbiAgICBzdG9yZXM/OiBQb2ludE9mU2VydmljZVtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgU3RvcmVGaW5kZXJTdG9ja1NlYXJjaFBhZ2UuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFN0b3JlRmluZGVyU3RvY2tTZWFyY2hQYWdlIHtcbiAgICBib3VuZEVhc3RMb25naXR1ZGU/OiBudW1iZXI7XG5cbiAgICBib3VuZE5vcnRoTGF0aXR1ZGU/OiBudW1iZXI7XG5cbiAgICBib3VuZFNvdXRoTGF0aXR1ZGU/OiBudW1iZXI7XG5cbiAgICBib3VuZFdlc3RMb25naXR1ZGU/OiBudW1iZXI7XG5cbiAgICBsb2NhdGlvblRleHQ/OiBzdHJpbmc7XG5cbiAgICBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbk1vZGVsO1xuXG4gICAgcHJvZHVjdD86IFByb2R1Y3Q7XG5cbiAgICBzb3J0cz86IFNvcnRNb2RlbFtdO1xuXG4gICAgc291cmNlTGF0aXR1ZGU/OiBudW1iZXI7XG5cbiAgICBzb3VyY2VMb25naXR1ZGU/OiBudW1iZXI7XG5cbiAgICBzdG9yZXM/OiBQb2ludE9mU2VydmljZVN0b2NrW107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBTdWdnZXN0aW9uLlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTdWdnZXN0aW9uIHtcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIFN1Z2dlc3Rpb25MaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBTdWdnZXN0aW9uTGlzdCB7XG4gICAgc3VnZ2VzdGlvbnM/OiBTdWdnZXN0aW9uW107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBUaXRsZS5cbiAgICovXG4gIGV4cG9ydCBpbnRlcmZhY2UgVGl0bGUge1xuICAgIGNvZGU/OiBzdHJpbmc7XG5cbiAgICBuYW1lPzogc3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgVGl0bGVMaXN0LlxuICAgKi9cbiAgZXhwb3J0IGludGVyZmFjZSBUaXRsZUxpc3Qge1xuICAgIHRpdGxlcz86IFRpdGxlW107XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyBVc2VyR3JvdXAuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFVzZXJHcm91cCB7XG4gICAgbWVtYmVycz86IFByaW5jaXBhbFtdO1xuXG4gICAgbWVtYmVyc0NvdW50PzogbnVtYmVyO1xuXG4gICAgbmFtZT86IHN0cmluZztcblxuICAgIHN1Ykdyb3Vwcz86IFVzZXJHcm91cFtdO1xuXG4gICAgdWlkPzogc3RyaW5nO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBTdG9yZUNvdW50IHtcbiAgICBjb3VudD86IG51bWJlcjtcbiAgICBpc29Db2RlPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdHlwZT86IHN0cmluZztcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgU3RvcmVDb3VudExpc3Qge1xuICAgIGNvdW50cmllc0FuZFJlZ2lvbnNTdG9yZUNvdW50PzogU3RvcmVDb3VudFtdO1xuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgVm91Y2hlckxpc3QuXG4gICAqL1xuICBleHBvcnQgaW50ZXJmYWNlIFZvdWNoZXJMaXN0IHtcbiAgICB2b3VjaGVycz86IFZvdWNoZXJbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgUHJpY2VUeXBlLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JVWScsICdGUk9NJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBQcmljZVR5cGUgPSA8UHJpY2VUeXBlPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gUHJpY2VUeXBlIHtcbiAgICBCVVkgPSAnQlVZJyxcbiAgICBGUk9NID0gJ0ZST00nLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBJbWFnZVR5cGUuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnUFJJTUFSWScsICdHQUxMRVJZJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBJbWFnZVR5cGUgPSA8SW1hZ2VUeXBlPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gSW1hZ2VUeXBlIHtcbiAgICBQUklNQVJZID0gJ1BSSU1BUlknLFxuICAgIEdBTExFUlkgPSAnR0FMTEVSWScsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkcy5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkcyA9IDxGaWVsZHM+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczEuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMxID0gPEZpZWxkczE+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMxIHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMyLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMiA9IDxGaWVsZHMyPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMiB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMy5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczMgPSA8RmllbGRzMz5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczMge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczQuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHM0ID0gPEZpZWxkczQ+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM0IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHM1LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNSA9IDxGaWVsZHM1Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzNSB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzNi5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczYgPSA8RmllbGRzNj5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczYge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIFBhZ2VUeXBlLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0NvbnRlbnRQYWdlJywgJ1Byb2R1Y3RQYWdlJywgJ0NhdGVnb3J5UGFnZScsXG4gICAqICdDYXRhbG9nUGFnZSdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogUGFnZVR5cGUgPSA8UGFnZVR5cGU+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBQYWdlVHlwZSB7XG4gICAgQ09OVEVOVF9QQUdFID0gJ0NvbnRlbnRQYWdlJyxcbiAgICBQUk9EVUNUX1BBR0UgPSAnUHJvZHVjdFBhZ2UnLFxuICAgIENBVEVHT1JZX1BBR0UgPSAnQ2F0ZWdvcnlQYWdlJyxcbiAgICBDQVRBTE9HX1BBR0UgPSAnQ2F0YWxvZ1BhZ2UnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHM3LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNyA9IDxGaWVsZHM3Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzNyB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzOC5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczggPSA8RmllbGRzOD5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczgge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczkuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHM5ID0gPEZpZWxkczk+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM5IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMxMC5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczEwID0gPEZpZWxkczEwPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMTAge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczExLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMTEgPSA8RmllbGRzMTE+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMxMSB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMTIuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMxMiA9IDxGaWVsZHMxMj5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczEyIHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMxMy5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczEzID0gPEZpZWxkczEzPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMTMge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczE0LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMTQgPSA8RmllbGRzMTQ+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMxNCB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMTUuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMxNSA9IDxGaWVsZHMxNT5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczE1IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMxNi5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczE2ID0gPEZpZWxkczE2Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMTYge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIFNvcnRFbnVtLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogU29ydEVudW0gPSA8U29ydEVudW0+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBTb3J0RW51bSB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMTcuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMxNyA9IDxGaWVsZHMxNz5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczE3IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMxOC5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczE4ID0gPEZpZWxkczE4Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMTgge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczE5LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMTkgPSA8RmllbGRzMTk+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMxOSB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMjAuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMyMCA9IDxGaWVsZHMyMD5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczIwIHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMyMS5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczIxID0gPEZpZWxkczIxPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMjEge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczIyLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMjIgPSA8RmllbGRzMjI+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMyMiB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMjMuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMyMyA9IDxGaWVsZHMyMz5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczIzIHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMyNC5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczI0ID0gPEZpZWxkczI0Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMjQge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczI1LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMjUgPSA8RmllbGRzMjU+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMyNSB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMjYuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMyNiA9IDxGaWVsZHMyNj5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczI2IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMyNy5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczI3ID0gPEZpZWxkczI3Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMjcge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczI4LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMjggPSA8RmllbGRzMjg+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMyOCB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMjkuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMyOSA9IDxGaWVsZHMyOT5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczI5IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMzMC5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczMwID0gPEZpZWxkczMwPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMzAge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczMxLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMzEgPSA8RmllbGRzMzE+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMzMSB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMzIuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMzMiA9IDxGaWVsZHMzMj5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczMyIHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMzMy5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczMzID0gPEZpZWxkczMzPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMzMge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczM0LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMzQgPSA8RmllbGRzMzQ+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMzNCB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMzUuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMzNSA9IDxGaWVsZHMzNT5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczM1IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMzNi5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczM2ID0gPEZpZWxkczM2Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMzYge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczM3LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzMzcgPSA8RmllbGRzMzc+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHMzNyB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzMzguXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHMzOCA9IDxGaWVsZHMzOD5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczM4IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHMzOS5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczM5ID0gPEZpZWxkczM5Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzMzkge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczQwLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNDAgPSA8RmllbGRzNDA+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM0MCB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzNDEuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHM0MSA9IDxGaWVsZHM0MT5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczQxIHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHM0Mi5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczQyID0gPEZpZWxkczQyPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzNDIge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczQzLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNDMgPSA8RmllbGRzNDM+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM0MyB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzNDQuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHM0NCA9IDxGaWVsZHM0ND5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczQ0IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHM0NS5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczQ1ID0gPEZpZWxkczQ1Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzNDUge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczQ2LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNDYgPSA8RmllbGRzNDY+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM0NiB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzNDcuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHM0NyA9IDxGaWVsZHM0Nz5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczQ3IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHM0OC5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczQ4ID0gPEZpZWxkczQ4Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzNDgge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczQ5LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNDkgPSA8RmllbGRzNDk+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM0OSB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzNTAuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHM1MCA9IDxGaWVsZHM1MD5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczUwIHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHM1MS5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczUxID0gPEZpZWxkczUxPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzNTEge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczUyLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNTIgPSA8RmllbGRzNTI+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM1MiB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzNTMuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHM1MyA9IDxGaWVsZHM1Mz5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczUzIHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHM1NC5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczU0ID0gPEZpZWxkczU0Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzNTQge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczU1LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNTUgPSA8RmllbGRzNTU+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM1NSB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzNTYuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHM1NiA9IDxGaWVsZHM1Nj5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczU2IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHM1Ny5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczU3ID0gPEZpZWxkczU3Plwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzNTcge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczU4LlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNTggPSA8RmllbGRzNTg+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM1OCB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgRmllbGRzNTkuXG4gICAqIFBvc3NpYmxlIHZhbHVlcyBpbmNsdWRlOiAnQkFTSUMnLCAnREVGQVVMVCcsICdGVUxMJ1xuICAgKiBUaGVyZSBjb3VsZCBiZSBtb3JlIHZhbHVlcyBmb3IgdGhpcyBlbnVtIGFwYXJ0IGZyb20gdGhlIG9uZXMgZGVmaW5lZCBoZXJlLklmXG4gICAqIHlvdSB3YW50IHRvIHNldCBhIHZhbHVlIHRoYXQgaXMgbm90IGZyb20gdGhlIGtub3duIHZhbHVlcyB0aGVuIHlvdSBjYW4gZG9cbiAgICogdGhlIGZvbGxvd2luZzpcbiAgICogbGV0IHBhcmFtOiBGaWVsZHM1OSA9IDxGaWVsZHM1OT5cInNvbWVVbmtub3duVmFsdWVUaGF0V2lsbFN0aWxsQmVWYWxpZFwiO1xuICAgKiBAcmVhZG9ubHlcbiAgICogQGVudW0ge3N0cmluZ31cbiAgICovXG4gIGV4cG9ydCBlbnVtIEZpZWxkczU5IHtcbiAgICBCQVNJQyA9ICdCQVNJQycsXG4gICAgREVGQVVMVCA9ICdERUZBVUxUJyxcbiAgICBGVUxMID0gJ0ZVTEwnLFxuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgdmFsdWVzIGZvciBGaWVsZHM2MC5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdCQVNJQycsICdERUZBVUxUJywgJ0ZVTEwnXG4gICAqIFRoZXJlIGNvdWxkIGJlIG1vcmUgdmFsdWVzIGZvciB0aGlzIGVudW0gYXBhcnQgZnJvbSB0aGUgb25lcyBkZWZpbmVkIGhlcmUuSWZcbiAgICogeW91IHdhbnQgdG8gc2V0IGEgdmFsdWUgdGhhdCBpcyBub3QgZnJvbSB0aGUga25vd24gdmFsdWVzIHRoZW4geW91IGNhbiBkb1xuICAgKiB0aGUgZm9sbG93aW5nOlxuICAgKiBsZXQgcGFyYW06IEZpZWxkczYwID0gPEZpZWxkczYwPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gRmllbGRzNjAge1xuICAgIEJBU0lDID0gJ0JBU0lDJyxcbiAgICBERUZBVUxUID0gJ0RFRkFVTFQnLFxuICAgIEZVTEwgPSAnRlVMTCcsXG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyB2YWx1ZXMgZm9yIEZpZWxkczYxLlxuICAgKiBQb3NzaWJsZSB2YWx1ZXMgaW5jbHVkZTogJ0JBU0lDJywgJ0RFRkFVTFQnLCAnRlVMTCdcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogRmllbGRzNjEgPSA8RmllbGRzNjE+XCJzb21lVW5rbm93blZhbHVlVGhhdFdpbGxTdGlsbEJlVmFsaWRcIjtcbiAgICogQHJlYWRvbmx5XG4gICAqIEBlbnVtIHtzdHJpbmd9XG4gICAqL1xuICBleHBvcnQgZW51bSBGaWVsZHM2MSB7XG4gICAgQkFTSUMgPSAnQkFTSUMnLFxuICAgIERFRkFVTFQgPSAnREVGQVVMVCcsXG4gICAgRlVMTCA9ICdGVUxMJyxcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzIHZhbHVlcyBmb3IgVHlwZS5cbiAgICogUG9zc2libGUgdmFsdWVzIGluY2x1ZGU6ICdhbGwnLCAncHJvZHVjdCcsICdvcmRlcidcbiAgICogVGhlcmUgY291bGQgYmUgbW9yZSB2YWx1ZXMgZm9yIHRoaXMgZW51bSBhcGFydCBmcm9tIHRoZSBvbmVzIGRlZmluZWQgaGVyZS5JZlxuICAgKiB5b3Ugd2FudCB0byBzZXQgYSB2YWx1ZSB0aGF0IGlzIG5vdCBmcm9tIHRoZSBrbm93biB2YWx1ZXMgdGhlbiB5b3UgY2FuIGRvXG4gICAqIHRoZSBmb2xsb3dpbmc6XG4gICAqIGxldCBwYXJhbTogVHlwZSA9IDxUeXBlPlwic29tZVVua25vd25WYWx1ZVRoYXRXaWxsU3RpbGxCZVZhbGlkXCI7XG4gICAqIEByZWFkb25seVxuICAgKiBAZW51bSB7c3RyaW5nfVxuICAgKi9cbiAgZXhwb3J0IGVudW0gVHlwZSB7XG4gICAgQWxsID0gJ2FsbCcsXG4gICAgUHJvZHVjdCA9ICdwcm9kdWN0JyxcbiAgICBPcmRlciA9ICdvcmRlcicsXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEFub255bW91c0NvbnNlbnQge1xuICAgIHRlbXBsYXRlQ29kZT86IHN0cmluZztcbiAgICB2ZXJzaW9uPzogbnVtYmVyO1xuICAgIGNvbnNlbnRTdGF0ZT86IENPTlNFTlRfU1RBVFVTO1xuICB9XG5cbiAgZXhwb3J0IGVudW0gQ09OU0VOVF9TVEFUVVMge1xuICAgIEFOT05ZTU9VU19DT05TRU5UX0dJVkVOID0gJ0dJVkVOJyxcbiAgICBBTk9OWU1PVVNfQ09OU0VOVF9XSVRIRFJBV04gPSAnV0lUSERSQVdOJyxcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29uc2VudFRlbXBsYXRlIHtcbiAgICBpZD86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIHZlcnNpb24/OiBudW1iZXI7XG4gICAgY3VycmVudENvbnNlbnQ/OiBDb25zZW50O1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBDb25zZW50IHtcbiAgICBjb2RlPzogc3RyaW5nO1xuICAgIGNvbnNlbnRHaXZlbkRhdGU/OiBEYXRlO1xuICAgIGNvbnNlbnRXaXRoZHJhd25EYXRlPzogRGF0ZTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQ29uc2VudFRlbXBsYXRlTGlzdCB7XG4gICAgY29uc2VudFRlbXBsYXRlcz86IENvbnNlbnRUZW1wbGF0ZVtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBCYXNlU2l0ZXMge1xuICAgIGJhc2VTaXRlcz86IEJhc2VTaXRlW107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEJhc2VTaXRlIHtcbiAgICBjaGFubmVsPzogc3RyaW5nO1xuICAgIGRlZmF1bHRMYW5ndWFnZT86IExhbmd1YWdlO1xuICAgIGRlZmF1bHRQcmV2aWV3Q2F0YWxvZ0lkPzogc3RyaW5nO1xuICAgIGRlZmF1bHRQcmV2aWV3Q2F0ZWdvcnlDb2RlPzogc3RyaW5nO1xuICAgIGRlZmF1bHRQcmV2aWV3UHJvZHVjdENvZGU/OiBzdHJpbmc7XG4gICAgbG9jYWxlPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgdGhlbWU/OiBzdHJpbmc7XG4gICAgdWlkPzogc3RyaW5nO1xuICAgIHN0b3Jlcz86IEJhc2VTdG9yZVtdO1xuICAgIHVybFBhdHRlcm5zPzogc3RyaW5nW107XG4gICAgdXJsRW5jb2RpbmdBdHRyaWJ1dGVzPzogc3RyaW5nW107XG4gICAgcmVxdWlyZXNBdXRoZW50aWNhdGlvbj86IGJvb2xlYW47XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEJhc2VTdG9yZSB7XG4gICAgY3VycmVuY2llcz86IEN1cnJlbmN5W107XG4gICAgZGVmYXVsdEN1cnJlbmN5PzogQ3VycmVuY3k7XG4gICAgbGFuZ3VhZ2VzPzogTGFuZ3VhZ2VbXTtcbiAgICBkZWZhdWx0TGFuZ3VhZ2U/OiBMYW5ndWFnZTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjdEludGVyZXN0RW50cnkge1xuICAgIGludGVyZXN0VHlwZT86IE5vdGlmaWNhdGlvblR5cGU7XG4gICAgZGF0ZUFkZGVkPzogc3RyaW5nO1xuICAgIGV4cGlyYXRpb25EYXRlPzogc3RyaW5nO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBQcm9kdWN0SW50ZXJlc3RFbnRyeVJlbGF0aW9uIHtcbiAgICBwcm9kdWN0PzogUHJvZHVjdDtcbiAgICBwcm9kdWN0SW50ZXJlc3RFbnRyeT86IFByb2R1Y3RJbnRlcmVzdEVudHJ5W107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFByb2R1Y3RJbnRlcmVzdFNlYXJjaFJlc3VsdCB7XG4gICAgcmVzdWx0cz86IFByb2R1Y3RJbnRlcmVzdEVudHJ5UmVsYXRpb25bXTtcbiAgICBzb3J0cz86IFNvcnRbXTtcbiAgICBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbjtcbiAgfVxuXG4gIGV4cG9ydCBlbnVtIE5vdGlmaWNhdGlvblR5cGUge1xuICAgIEJBQ0tfSU5fU1RPQ0sgPSAnQkFDS19JTl9TVE9DSycsXG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEJ1ZGdldCB7XG4gICAgYWN0aXZlPzogYm9vbGVhbjtcbiAgICBidWRnZXQ/OiBudW1iZXI7XG4gICAgY29kZT86IHN0cmluZztcbiAgICBjdXJyZW5jeT86IEN1cnJlbmN5O1xuICAgIGVuZERhdGU/OiBzdHJpbmc7XG4gICAgc3RhcnREYXRlPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgb3JnVW5pdD86IEIyQlVuaXQ7XG4gICAgY29zdENlbnRlcnM/OiBDb3N0Q2VudGVyW107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEJ1ZGdldHNMaXN0IHtcbiAgICBidWRnZXRzPzogQnVkZ2V0W107XG4gICAgcGFnaW5hdGlvbj86IFBhZ2luYXRpb25Nb2RlbDtcbiAgICBzb3J0cz86IFNvcnRNb2RlbFtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBDb3N0Q2VudGVyIHtcbiAgICBhY3RpdmU/OiBzdHJpbmc7XG4gICAgYWN0aXZlRmxhZz86IGJvb2xlYW47XG4gICAgY29kZT86IHN0cmluZztcbiAgICBjdXJyZW5jeT86IEN1cnJlbmN5O1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgb3JpZ2luYWxDb2RlPzogc3RyaW5nO1xuICAgIHVuaXQ/OiBCMkJVbml0O1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBDb3N0Q2VudGVyc0xpc3Qge1xuICAgIGNvc3RDZW50ZXJzOiBDb3N0Q2VudGVyW107XG4gICAgcGFnaW5hdGlvbj86IFBhZ2luYXRpb25Nb2RlbDtcbiAgICBzb3J0cz86IFNvcnRNb2RlbFtdO1xuICB9XG5cbiAgLy8gVE9ETygjODg3OCk6IFdoaWNoIG1vZGVscyB3ZSBjYW4gcmVtb3ZlIGZyb20gaGVyZT9cbiAgZXhwb3J0IGludGVyZmFjZSBPcmdVbml0VXNlckdyb3VwIHtcbiAgICBtZW1iZXJzPzogQjJCVXNlcltdO1xuICAgIG1lbWJlcnNDb3VuPzogbnVtYmVyO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgb3JnVW5pdD86IEIyQlVuaXQ7XG4gICAgcGVybWlzc2lvbnM/OiBQZXJtaXNzaW9uW107XG4gICAgcm9sZXM/OiBhbnk7XG4gICAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICAgIHN1Ykdyb3Vwcz86IGFueTtcbiAgICB1aWQ/OiBzdHJpbmc7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIE9yZ1VuaXRVc2VyR3JvdXBMaXN0IHtcbiAgICBvcmdVbml0VXNlckdyb3VwczogT3JnVW5pdFVzZXJHcm91cFtdO1xuICAgIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uTW9kZWw7XG4gICAgc29ydHM/OiBTb3J0TW9kZWxbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQjJCVW5pdE5vZGUge1xuICAgIGFjdGl2ZT86IGJvb2xlYW47XG4gICAgY2hpbGRyZW4/OiBCMkJVbml0Tm9kZVtdO1xuICAgIGlkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgcGFyZW50Pzogc3RyaW5nO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBCMkJVbml0Tm9kZUxpc3Qge1xuICAgIHVuaXROb2Rlcz86IEIyQlVuaXROb2RlW107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIEIyQlVzZXIgZXh0ZW5kcyBVc2VyIHtcbiAgICBhY3RpdmU/OiBib29sZWFuO1xuICAgIGFwcHJvdmVycz86IFtdO1xuICAgIG9yZ1VuaXQ/OiBCMkJVbml0O1xuICAgIHJvbGVzPzogc3RyaW5nW107XG4gICAgc2VsZWN0ZWQ/OiBib29sZWFuO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBPcmdVbml0VXNlckxpc3Qge1xuICAgIHVzZXJzOiBCMkJVc2VyW107XG4gICAgcGFnaW5hdGlvbj86IFBhZ2luYXRpb25Nb2RlbDtcbiAgICBzb3J0cz86IFNvcnRNb2RlbFtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBCMkJBcHByb3ZhbFByb2Nlc3Mge1xuICAgIGNvZGU/OiBzdHJpbmc7XG4gICAgbmFtZT86IHN0cmluZztcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQjJCQXBwcm92YWxQcm9jZXNzTGlzdCB7XG4gICAgYXBwcm92YWxQcm9jZXNzZXM/OiBCMkJBcHByb3ZhbFByb2Nlc3NbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgQjJCVW5pdCB7XG4gICAgYWN0aXZlPzogYm9vbGVhbjtcbiAgICBhZGRyZXNzZXM/OiBBZGRyZXNzW107XG4gICAgdWlkPzogc3RyaW5nO1xuICAgIG5hbWU/OiBzdHJpbmc7XG4gICAgcGFyZW50T3JnVW5pdD86IFBhcnRpYWw8QjJCVW5pdD47XG4gICAgYXBwcm92YWxQcm9jZXNzPzogQjJCQXBwcm92YWxQcm9jZXNzO1xuICAgIGFkbWluaXN0cmF0b3JzPzogQjJCVXNlcltdO1xuICAgIGFwcHJvdmVycz86IEIyQlVzZXJbXTtcbiAgICBjdXN0b21lcnM/OiBCMkJVc2VyW107XG4gICAgbWFuYWdlcnM/OiBCMkJVc2VyW107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIE9yZGVyQXBwcm92YWxQZXJtaXNzaW9uVHlwZSB7XG4gICAgY29kZT86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBPcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVMaXN0IHtcbiAgICBvcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVzPzogT3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlW107XG4gIH1cblxuICBleHBvcnQgZW51bSBQZXJpb2Qge1xuICAgIERBWSA9ICdEQVknLFxuICAgIFdFRUsgPSAnV0VFSycsXG4gICAgTU9OVEggPSAnTU9OVEgnLFxuICAgIFFVQVJURVIgPSAnUVVBUlRFUicsXG4gICAgWUVBUiA9ICdZRUFSJyxcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgUGVybWlzc2lvbiB7XG4gICAgYWN0aXZlPzogYm9vbGVhbjtcbiAgICBjb2RlPzogc3RyaW5nO1xuICAgIGN1cnJlbmN5PzogQ3VycmVuY3k7XG4gICAgb3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlPzogT3JkZXJBcHByb3ZhbFBlcm1pc3Npb25UeXBlO1xuICAgIG9yZ1VuaXQ/OiBCMkJVbml0Tm9kZTtcbiAgICBwZXJpb2RSYW5nZT86IFBlcmlvZDtcbiAgICBzZWxlY3RlZD86IGJvb2xlYW47XG4gICAgdHJlc2hvbGQ/OiBudW1iZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFBlcm1pc3Npb25zTGlzdCB7XG4gICAgb3JkZXJBcHByb3ZhbFBlcm1pc3Npb25zPzogUGVybWlzc2lvbltdO1xuICAgIHBhZ2luYXRpb24/OiBQYWdpbmF0aW9uTW9kZWw7XG4gICAgc29ydHM/OiBTb3J0TW9kZWxbXTtcbiAgfVxuXG4gIGV4cG9ydCBpbnRlcmZhY2UgUmVwbGVuaXNobWVudE9yZGVyIHtcbiAgICBhY3RpdmU/OiBib29sZWFuO1xuICAgIGFwcGxpZWRPcmRlclByb21vdGlvbnM/OiBQcm9tb3Rpb25SZXN1bHRbXTtcbiAgICBhcHBsaWVkUHJvZHVjdFByb21vdGlvbnM/OiBQcm9tb3Rpb25SZXN1bHRbXTtcbiAgICBhcHBsaWVkVm91Y2hlcnM/OiBWb3VjaGVyW107XG4gICAgY2FsY3VsYXRlZD86IGJvb2xlYW47XG4gICAgY29kZT86IHN0cmluZztcbiAgICBjb3N0Q2VudGVyPzogQ29zdENlbnRlcjtcbiAgICBkZWxpdmVyeUFkZHJlc3M/OiBBZGRyZXNzO1xuICAgIGRlbGl2ZXJ5Q29zdD86IFByaWNlO1xuICAgIGRlbGl2ZXJ5SXRlbXNRdWFudGl0eT86IG51bWJlcjtcbiAgICBkZWxpdmVyeU1vZGU/OiBEZWxpdmVyeU1vZGU7XG4gICAgZGVsaXZlcnlPcmRlckdyb3Vwcz86IERlbGl2ZXJ5T3JkZXJFbnRyeUdyb3VwW107XG4gICAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gICAgZW50cmllcz86IE9yZGVyRW50cnlbXTtcbiAgICBleHBpcmF0aW9uVGltZT86IHN0cmluZztcbiAgICBmaXJzdERhdGU/OiBzdHJpbmc7XG4gICAgZ3VpZD86IHN0cmluZztcbiAgICBuYW1lPzogc3RyaW5nO1xuICAgIG5ldD86IGJvb2xlYW47XG4gICAgb3JkZXJEaXNjb3VudHM/OiBQcmljZTtcbiAgICBwYXltZW50SW5mbz86IFBheW1lbnREZXRhaWxzO1xuICAgIHBheW1lbnRTdGF0dXM/OiBzdHJpbmc7XG4gICAgcGF5bWVudFR5cGU/OiBQYXltZW50VHlwZTtcbiAgICBwaWNrdXBJdGVtc1F1YW50aXR5PzogbnVtYmVyO1xuICAgIHBpY2t1cE9yZGVyR3JvdXBzPzogUGlja3VwT3JkZXJFbnRyeUdyb3VwW107XG4gICAgcG90ZW50aWFsT3JkZXJQcm9tb3Rpb25zPzogUHJvbW90aW9uUmVzdWx0W107XG4gICAgcG90ZW50aWFsUHJvZHVjdFByb21vdGlvbnM/OiBQcm9tb3Rpb25SZXN1bHRbXTtcbiAgICBwcm9kdWN0RGlzY291bnRzPzogUHJpY2U7XG4gICAgcHVyY2hhc2VPcmRlck51bWJlcj86IHN0cmluZztcbiAgICByZXBsZW5pc2htZW50T3JkZXJDb2RlPzogc3RyaW5nO1xuICAgIHNhdmVUaW1lPzogc3RyaW5nO1xuICAgIHNhdmVkQnk/OiBQcmluY2lwYWw7XG4gICAgc2l0ZT86IHN0cmluZztcbiAgICBzdG9yZT86IHN0cmluZztcbiAgICBzdWJUb3RhbD86IFByaWNlO1xuICAgIHRvdGFsRGlzY291bnRzPzogUHJpY2U7XG4gICAgdG90YWxJdGVtcz86IG51bWJlcjtcbiAgICB0b3RhbFByaWNlPzogUHJpY2U7XG4gICAgdG90YWxQcmljZVdpdGhUYXg/OiBQcmljZTtcbiAgICB0b3RhbFRheD86IFByaWNlO1xuICAgIHRvdGFsVW5pdENvdW50PzogbnVtYmVyO1xuICAgIHRyaWdnZXI/OiBUcmlnZ2VyO1xuICAgIHVzZXI/OiBQcmluY2lwYWw7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFJlcGxlbmlzaG1lbnRPcmRlckxpc3Qge1xuICAgIHJlcGxlbmlzaG1lbnRPcmRlcnM/OiBSZXBsZW5pc2htZW50T3JkZXJbXTtcbiAgICBwYWdpbmF0aW9uPzogUGFnaW5hdGlvbk1vZGVsO1xuICAgIHNvcnRzPzogU29ydE1vZGVsW107XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFRyaWdnZXIge1xuICAgIGFjdGl2YXRpb25UaW1lPzogc3RyaW5nO1xuICAgIGRpc3BsYXlUaW1lVGFibGU/OiBzdHJpbmc7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIFNjaGVkdWxlUmVwbGVuaXNobWVudEZvcm0ge1xuICAgIGRheXNPZldlZWs/OiBEYXlzT2ZXZWVrW107XG4gICAgbnRoRGF5T2ZNb250aD86IHN0cmluZztcbiAgICBudW1iZXJPZkRheXM/OiBzdHJpbmc7XG4gICAgbnVtYmVyT2ZXZWVrcz86IHN0cmluZztcbiAgICByZWN1cnJlbmNlUGVyaW9kPzogc3RyaW5nO1xuICAgIHJlcGxlbmlzaG1lbnRTdGFydERhdGU/OiBzdHJpbmc7XG4gIH1cblxuICBleHBvcnQgZW51bSBEYXlzT2ZXZWVrIHtcbiAgICBNT05EQVkgPSAnTU9OREFZJyxcbiAgICBUVUVTREFZID0gJ1RVRVNEQVknLFxuICAgIFdFRE5FU0RBWSA9ICdXRURORVNEQVknLFxuICAgIFRIVVJTREFZID0gJ1RIVVJTREFZJyxcbiAgICBGUklEQVkgPSAnRlJJREFZJyxcbiAgICBTQVRVUkRBWSA9ICdTQVRVUkRBWScsXG4gICAgU1VOREFZID0gJ1NVTkRBWScsXG4gIH1cblxuICBleHBvcnQgZW51bSBPcmRlckFwcHJvdmFsRGVjaXNpb25WYWx1ZSB7XG4gICAgQVBQUk9WRSA9ICdBUFBST1ZFJyxcbiAgICBSRUpFQ1QgPSAnUkVKRUNUJyxcbiAgfVxuICBleHBvcnQgaW50ZXJmYWNlIE9yZGVyQXBwcm92YWxEZWNpc2lvbiB7XG4gICAgZGVjaXNpb24/OiBPcmRlckFwcHJvdmFsRGVjaXNpb25WYWx1ZTtcbiAgICBjb21tZW50Pzogc3RyaW5nO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBPcmRlckFwcHJvdmFsUmVjb3JkIHtcbiAgICBhcHByb3Zlcj86IFByaW5jaXBhbDtcbiAgICBjb21tZW50cz86IHN0cmluZztcbiAgICBwZXJtaXNzaW9uVHlwZXM/OiBPcmRlckFwcHJvdmFsUGVybWlzc2lvblR5cGVbXTtcbiAgICBzdGF0dXNEaXNwbGF5Pzogc3RyaW5nO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBPcmRlckFwcHJvdmFsIHtcbiAgICBhcHByb3ZhbERlY2lzaW9uUmVxdWlyZWQ/OiBib29sZWFuO1xuICAgIGNvZGU/OiBzdHJpbmc7XG4gICAgY3VzdG9tZXJPcmRlckFwcHJvdmFsUmVjb3Jkcz86IE9yZGVyQXBwcm92YWxSZWNvcmRbXTtcbiAgICBtZXJjaGFudE9yZGVyQXBwcm92YWxSZWNvcmRzPzogT3JkZXJBcHByb3ZhbFJlY29yZFtdO1xuICAgIG9yZGVyPzogT3JkZXI7XG4gICAgdHJpZ2dlcj86IFRyaWdnZXI7XG4gIH1cblxuICBleHBvcnQgaW50ZXJmYWNlIE9yZGVyQXBwcm92YWxzTGlzdCB7XG4gICAgb3JkZXJBcHByb3ZhbHM/OiBPcmRlckFwcHJvdmFsW107XG4gICAgcGFnaW5hdGlvbj86IFBhZ2luYXRpb25Nb2RlbDtcbiAgICBzb3J0cz86IFNvcnRNb2RlbFtdO1xuICB9XG5cbiAgZXhwb3J0IGludGVyZmFjZSBDYXJ0TW9kaWZpY2F0aW9uTGlzdCB7XG4gICAgY2FydE1vZGlmaWNhdGlvbnM/OiBDYXJ0TW9kaWZpY2F0aW9uW107XG4gIH1cbn1cbiJdfQ==