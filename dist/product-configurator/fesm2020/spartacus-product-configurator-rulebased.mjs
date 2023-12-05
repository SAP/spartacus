import * as i0 from '@angular/core';
import { Injectable, inject, isDevMode, Component, ChangeDetectionStrategy, Optional, NgModule, Input, EventEmitter, Output, Directive, Injector, HostBinding, ViewChildren, ViewChild, HostListener, InjectionToken, Inject } from '@angular/core';
import * as i1$1 from '@spartacus/core';
import { StateUtils, OCC_USER_ID_CURRENT, LoggerService, GlobalMessageType, I18nModule, FeaturesConfigModule, provideDefaultConfig, Config, UrlModule, WindowRef, normalizeHttpError, StateModule, LogoutEvent, OCC_HTTP_TOKEN, ConfigModule } from '@spartacus/core';
import * as i2$1 from '@spartacus/product-configurator/common';
import { CommonConfigurator, ConfiguratorRouter, ConfiguratorModelUtils, ConfiguratorProductScope } from '@spartacus/product-configurator/common';
import * as i3 from '@spartacus/storefront';
import { ICON_TYPE, ItemCounterModule, IconModule, DirectionMode, KeyboardFocusModule, MediaModule, BREAKPOINT, DIALOG_TYPE, HamburgerMenuModule, SpinnerModule, CarouselModule, ProductCarouselModule } from '@spartacus/storefront';
import { ReplaySubject, Subscription, of, timer, BehaviorSubject, combineLatest, EMPTY, merge } from 'rxjs';
import { delayWhen, filter, map, tap, take, switchMap, delay, distinctUntilChanged, distinct, debounce, first, skip, distinctUntilKeyChanged, mergeMap, catchError } from 'rxjs/operators';
import * as i8 from '@angular/forms';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as i1 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, StoreModule } from '@ngrx/store';
import { MULTI_CART_DATA, CartActions } from '@spartacus/cart/base/core';
import * as i2 from '@spartacus/cart/base/root';
import { CART_MODIFICATION_NORMALIZER } from '@spartacus/cart/base/root';
import * as i4 from '@spartacus/checkout/base/root';
import * as i6 from '@spartacus/order/root';
import * as i4$1 from '@angular/common';
import { CommonModule, formatNumber, getLocaleNumberSymbol, NumberSymbol, getLocaleId } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i5 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1$2 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import * as i1$3 from '@angular/common/http';
import { HttpErrorResponse, HttpHeaders, HttpContext } from '@angular/common/http';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// Note that this namespace should be augmentable, therefore it's exposed in the 'public_api.ts'
// of the rulebased entry point, and there is no index.ts file in this folder
var Configurator;
(function (Configurator) {
    let GroupType;
    (function (GroupType) {
        GroupType["ATTRIBUTE_GROUP"] = "AttributeGroup";
        GroupType["SUB_ITEM_GROUP"] = "SubItemGroup";
        GroupType["CONFLICT_HEADER_GROUP"] = "ConflictHeaderGroup";
        GroupType["CONFLICT_GROUP"] = "ConflictGroup";
    })(GroupType = Configurator.GroupType || (Configurator.GroupType = {}));
    let UiType;
    (function (UiType) {
        UiType["NOT_IMPLEMENTED"] = "not_implemented";
        UiType["RADIOBUTTON"] = "radioGroup";
        UiType["RADIOBUTTON_ADDITIONAL_INPUT"] = "radioGroup_add";
        UiType["CHECKBOX"] = "checkBox";
        UiType["CHECKBOXLIST"] = "checkBoxList";
        UiType["DROPDOWN"] = "dropdown";
        UiType["DROPDOWN_ADDITIONAL_INPUT"] = "dropdown_add";
        UiType["LISTBOX"] = "listbox";
        UiType["LISTBOX_MULTI"] = "listboxmulti";
        UiType["READ_ONLY"] = "readonly";
        UiType["STRING"] = "string";
        UiType["NUMERIC"] = "numeric";
        UiType["AUTO_COMPLETE_CUSTOM"] = "input_autocomplete";
        UiType["MULTI_SELECTION_IMAGE"] = "multi_selection_image";
        UiType["SINGLE_SELECTION_IMAGE"] = "single_selection_image";
        //introduced with CPQ
        UiType["CHECKBOXLIST_PRODUCT"] = "checkBoxListProduct";
        UiType["DROPDOWN_PRODUCT"] = "dropdownProduct";
        UiType["RADIOBUTTON_PRODUCT"] = "radioGroupProduct";
    })(UiType = Configurator.UiType || (Configurator.UiType = {}));
    let ImageFormatType;
    (function (ImageFormatType) {
        ImageFormatType["VALUE_IMAGE"] = "VALUE_IMAGE";
        ImageFormatType["ATTRIBUTE_IMAGE"] = "ATTRIBUTE_IMAGE";
    })(ImageFormatType = Configurator.ImageFormatType || (Configurator.ImageFormatType = {}));
    let ImageType;
    (function (ImageType) {
        ImageType["PRIMARY"] = "PRIMARY";
        ImageType["GALLERY"] = "GALLERY";
    })(ImageType = Configurator.ImageType || (Configurator.ImageType = {}));
    let DataType;
    (function (DataType) {
        DataType["INPUT_STRING"] = "String";
        DataType["INPUT_NUMBER"] = "Number";
        DataType["USER_SELECTION_QTY_ATTRIBUTE_LEVEL"] = "UserSelectionWithAttributeQuantity";
        DataType["USER_SELECTION_QTY_VALUE_LEVEL"] = "UserSelectionWithValueQuantity";
        DataType["USER_SELECTION_NO_QTY"] = "UserSelectionWithoutQuantity";
        DataType["NOT_IMPLEMENTED"] = "not_implemented";
    })(DataType = Configurator.DataType || (Configurator.DataType = {}));
    let UpdateType;
    (function (UpdateType) {
        UpdateType["ATTRIBUTE"] = "Attribute";
        UpdateType["ATTRIBUTE_QUANTITY"] = "AttributeQuantity";
        UpdateType["VALUE_QUANTITY"] = "ValueQuantity";
    })(UpdateType = Configurator.UpdateType || (Configurator.UpdateType = {}));
    let AttributeOverviewType;
    (function (AttributeOverviewType) {
        AttributeOverviewType["GENERAL"] = "general";
        AttributeOverviewType["BUNDLE"] = "bundle";
    })(AttributeOverviewType = Configurator.AttributeOverviewType || (Configurator.AttributeOverviewType = {}));
    let ValidationType;
    (function (ValidationType) {
        ValidationType["NONE"] = "NONE";
        ValidationType["NUMERIC"] = "NUMERIC";
    })(ValidationType = Configurator.ValidationType || (Configurator.ValidationType = {}));
    let OverviewFilter;
    (function (OverviewFilter) {
        OverviewFilter["VISIBLE"] = "PRIMARY";
        OverviewFilter["USER_INPUT"] = "USER_INPUT";
        OverviewFilter["PRICE_RELEVANT"] = "PRICE_RELEVANT";
    })(OverviewFilter = Configurator.OverviewFilter || (Configurator.OverviewFilter = {}));
    Configurator.ConflictIdPrefix = 'CONFLICT';
    Configurator.ConflictHeaderId = 'CONFLICT_HEADER';
    Configurator.CustomUiTypeIndicator = '___';
    Configurator.RetractValueCode = '###RETRACT_VALUE_CODE###';
})(Configurator || (Configurator = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CONFIGURATOR_FEATURE = 'productConfigurator';
const CONFIGURATOR_DATA = '[Configurator] Configuration Data';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const READ_CART_ENTRY_CONFIGURATION = '[Configurator] Read Cart Entry Configuration';
const READ_CART_ENTRY_CONFIGURATION_SUCCESS = '[Configurator] Read Cart Entry Configuration Success';
const READ_CART_ENTRY_CONFIGURATION_FAIL = '[Configurator] Read Cart Entry Configuration Fail';
const READ_ORDER_ENTRY_CONFIGURATION = '[Configurator] Read Order Entry Configuration';
const READ_ORDER_ENTRY_CONFIGURATION_SUCCESS = '[Configurator] Read Order Entry Configuration Success';
const READ_ORDER_ENTRY_CONFIGURATION_FAIL = '[Configurator] Read Order Entry Configuration Fail';
const ADD_TO_CART = '[Configurator] Add to cart';
const UPDATE_CART_ENTRY = '[Configurator] Update cart entry';
const UPDATE_CART_ENTRY_SUCCESS = '[Configurator] Update cart entry success';
const ADD_NEXT_OWNER = '[Configurator] Add next owner';
const SET_NEXT_OWNER_CART_ENTRY = '[Configurator] Set next owner cart entry';
const REMOVE_CART_BOUND_CONFIGURATIONS = '[Configurator] Remove cart bound configurations';
class ReadCartEntryConfiguration extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_CART_ENTRY_CONFIGURATION;
    }
}
class ReadCartEntryConfigurationSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_CART_ENTRY_CONFIGURATION_SUCCESS;
    }
}
class ReadCartEntryConfigurationFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = READ_CART_ENTRY_CONFIGURATION_FAIL;
    }
}
class ReadOrderEntryConfiguration extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_ORDER_ENTRY_CONFIGURATION;
    }
}
class ReadOrderEntryConfigurationSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_ORDER_ENTRY_CONFIGURATION_SUCCESS;
    }
}
class ReadOrderEntryConfigurationFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = READ_ORDER_ENTRY_CONFIGURATION_FAIL;
    }
}
class AddToCart extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = ADD_TO_CART;
    }
}
class UpdateCartEntry extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(MULTI_CART_DATA, payload.cartId);
        this.payload = payload;
        this.type = UPDATE_CART_ENTRY;
    }
}
class AddNextOwner {
    constructor(payload) {
        this.payload = payload;
        this.type = ADD_NEXT_OWNER;
    }
}
class RemoveCartBoundConfigurations {
    constructor() {
        this.type = REMOVE_CART_BOUND_CONFIGURATIONS;
        // Intentional Empty Constructor
    }
}
class SetNextOwnerCartEntry extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.configuration.owner.key);
        this.payload = payload;
        this.type = SET_NEXT_OWNER_CART_ENTRY;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const SEARCH_VARIANTS = '[Configurator] Search Variants';
const SEARCH_VARIANTS_FAIL = '[Configurator]  Search Variants fail';
const SEARCH_VARIANTS_SUCCESS = '[Configurator] Search Variants success';
class SearchVariants extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = SEARCH_VARIANTS;
    }
}
class SearchVariantsFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = SEARCH_VARIANTS_FAIL;
    }
}
class SearchVariantsSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey);
        this.payload = payload;
        this.type = SEARCH_VARIANTS_SUCCESS;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CREATE_CONFIGURATION = '[Configurator] Create Configuration';
const CREATE_CONFIGURATION_FAIL = '[Configurator] Create Configuration Fail';
const CREATE_CONFIGURATION_SUCCESS = '[Configurator] Create Configuration Sucess';
const READ_CONFIGURATION = '[Configurator] Read Configuration';
const READ_CONFIGURATION_FAIL = '[Configurator] Read Configuration Fail';
const READ_CONFIGURATION_SUCCESS = '[Configurator] Read Configuration Sucess';
const UPDATE_CONFIGURATION = '[Configurator] Update Configuration';
const UPDATE_CONFIGURATION_FAIL = '[Configurator] Update Configuration Fail';
const UPDATE_CONFIGURATION_SUCCESS = '[Configurator] Update Configuration Success';
const UPDATE_CONFIGURATION_FINALIZE_SUCCESS = '[Configurator] Update Configuration finalize success';
const UPDATE_CONFIGURATION_FINALIZE_FAIL = '[Configurator] Update Configuration finalize fail';
const CHANGE_GROUP = '[Configurator] Change group';
const CHANGE_GROUP_FINALIZE = '[Configurator] Change group finalize';
const REMOVE_CONFIGURATION = '[Configurator] Remove configuration';
const UPDATE_PRICE_SUMMARY = '[Configurator] Update Configuration Summary Price';
const UPDATE_PRICE_SUMMARY_FAIL = '[Configurator] Update Configuration Price Summary fail';
const UPDATE_PRICE_SUMMARY_SUCCESS = '[Configurator] Update Configuration Price Summary success';
const GET_CONFIGURATION_OVERVIEW = '[Configurator] Get Configuration Overview';
const GET_CONFIGURATION_OVERVIEW_FAIL = '[Configurator] Get Configuration Overview fail';
const GET_CONFIGURATION_OVERVIEW_SUCCESS = '[Configurator] Get Configuration Overview success';
const UPDATE_CONFIGURATION_OVERVIEW = '[Configurator] Update Configuration Overview';
const UPDATE_CONFIGURATION_OVERVIEW_FAIL = '[Configurator] Update Configuration Overview fail';
const UPDATE_CONFIGURATION_OVERVIEW_SUCCESS = '[Configurator] Update Configuration Overview success';
const SET_INTERACTION_STATE = '[Configurator] Set interaction state';
const SET_CURRENT_GROUP = '[Configurator] Set current group to State';
const SET_MENU_PARENT_GROUP = '[Configurator] Set current parent group for menu to State';
const SET_GROUPS_VISITED = '[Configurator] Set groups to visited';
const REMOVE_PRODUCT_BOUND_CONFIGURATIONS = '[Configurator] Remove product bound configurations';
const DISMISS_CONFLICT_DIALOG = '[Configurator] Dismiss conflict dialog';
const CHECK_CONFLICT_DIALOG = '[Configurator] Check conflict dialog';
class CreateConfiguration extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = CREATE_CONFIGURATION;
    }
}
class CreateConfigurationFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = CREATE_CONFIGURATION_FAIL;
    }
}
class CreateConfigurationSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = CREATE_CONFIGURATION_SUCCESS;
    }
}
class ReadConfiguration extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.configuration.owner.key);
        this.payload = payload;
        this.type = READ_CONFIGURATION;
    }
}
class ReadConfigurationFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = READ_CONFIGURATION_FAIL;
    }
}
class ReadConfigurationSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = READ_CONFIGURATION_SUCCESS;
    }
}
class UpdateConfiguration extends StateUtils.EntityProcessesIncrementAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION;
        this.meta.loader = {
            load: true,
        };
    }
}
class UpdateConfigurationFail extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.configuration.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_FAIL;
        this.meta.loader = {
            error: payload.error,
        };
    }
}
class UpdateConfigurationSuccess extends StateUtils.EntityProcessesDecrementAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_SUCCESS;
    }
}
class UpdateConfigurationFinalizeSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_FINALIZE_SUCCESS;
    }
}
class UpdateConfigurationFinalizeFail extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_FINALIZE_FAIL;
    }
}
class UpdatePriceSummary extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_PRICE_SUMMARY;
    }
}
class UpdatePriceSummaryFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = UPDATE_PRICE_SUMMARY_FAIL;
    }
}
class UpdatePriceSummarySuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_PRICE_SUMMARY_SUCCESS;
    }
}
class ChangeGroup extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.configuration.owner.key);
        this.payload = payload;
        this.type = CHANGE_GROUP;
    }
}
class ChangeGroupFinalize extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = CHANGE_GROUP_FINALIZE;
    }
}
class RemoveConfiguration extends StateUtils.EntityLoaderResetAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey);
        this.payload = payload;
        this.type = REMOVE_CONFIGURATION;
    }
}
class GetConfigurationOverview extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = GET_CONFIGURATION_OVERVIEW;
    }
}
class GetConfigurationOverviewFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = GET_CONFIGURATION_OVERVIEW_FAIL;
    }
}
class GetConfigurationOverviewSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey);
        this.payload = payload;
        this.type = GET_CONFIGURATION_OVERVIEW_SUCCESS;
    }
}
class UpdateConfigurationOverview extends StateUtils.EntityLoadAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.owner.key);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_OVERVIEW;
    }
}
class UpdateConfigurationOverviewFail extends StateUtils.EntityFailAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey, payload.error);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_OVERVIEW_FAIL;
    }
}
class UpdateConfigurationOverviewSuccess extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.ownerKey);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION_OVERVIEW_SUCCESS;
    }
}
class SetInteractionState extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.entityKey, payload.interactionState);
        this.payload = payload;
        this.type = SET_INTERACTION_STATE;
    }
}
class SetCurrentGroup extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.entityKey, payload.currentGroup);
        this.payload = payload;
        this.type = SET_CURRENT_GROUP;
    }
}
class SetMenuParentGroup extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.entityKey, payload.menuParentGroup);
        this.payload = payload;
        this.type = SET_MENU_PARENT_GROUP;
    }
}
class SetGroupsVisited extends StateUtils.EntitySuccessAction {
    constructor(payload) {
        super(CONFIGURATOR_DATA, payload.entityKey, payload.visitedGroups);
        this.payload = payload;
        this.type = SET_GROUPS_VISITED;
    }
}
class RemoveProductBoundConfigurations {
    constructor() {
        this.type = REMOVE_PRODUCT_BOUND_CONFIGURATIONS;
        // Intentional Empty Constructor
    }
}
class DissmissConflictDialoge extends StateUtils.EntitySuccessAction {
    constructor(ownerKey) {
        super(CONFIGURATOR_DATA, ownerKey);
        this.ownerKey = ownerKey;
        this.type = DISMISS_CONFLICT_DIALOG;
    }
}
class CheckConflictDialoge extends StateUtils.EntitySuccessAction {
    constructor(ownerKey) {
        super(CONFIGURATOR_DATA, ownerKey);
        this.ownerKey = ownerKey;
        this.type = CHECK_CONFLICT_DIALOG;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var configuratorGroup_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ADD_NEXT_OWNER: ADD_NEXT_OWNER,
    ADD_TO_CART: ADD_TO_CART,
    AddNextOwner: AddNextOwner,
    AddToCart: AddToCart,
    CHANGE_GROUP: CHANGE_GROUP,
    CHANGE_GROUP_FINALIZE: CHANGE_GROUP_FINALIZE,
    CHECK_CONFLICT_DIALOG: CHECK_CONFLICT_DIALOG,
    CREATE_CONFIGURATION: CREATE_CONFIGURATION,
    CREATE_CONFIGURATION_FAIL: CREATE_CONFIGURATION_FAIL,
    CREATE_CONFIGURATION_SUCCESS: CREATE_CONFIGURATION_SUCCESS,
    ChangeGroup: ChangeGroup,
    ChangeGroupFinalize: ChangeGroupFinalize,
    CheckConflictDialoge: CheckConflictDialoge,
    CreateConfiguration: CreateConfiguration,
    CreateConfigurationFail: CreateConfigurationFail,
    CreateConfigurationSuccess: CreateConfigurationSuccess,
    DISMISS_CONFLICT_DIALOG: DISMISS_CONFLICT_DIALOG,
    DissmissConflictDialoge: DissmissConflictDialoge,
    GET_CONFIGURATION_OVERVIEW: GET_CONFIGURATION_OVERVIEW,
    GET_CONFIGURATION_OVERVIEW_FAIL: GET_CONFIGURATION_OVERVIEW_FAIL,
    GET_CONFIGURATION_OVERVIEW_SUCCESS: GET_CONFIGURATION_OVERVIEW_SUCCESS,
    GetConfigurationOverview: GetConfigurationOverview,
    GetConfigurationOverviewFail: GetConfigurationOverviewFail,
    GetConfigurationOverviewSuccess: GetConfigurationOverviewSuccess,
    READ_CART_ENTRY_CONFIGURATION: READ_CART_ENTRY_CONFIGURATION,
    READ_CART_ENTRY_CONFIGURATION_FAIL: READ_CART_ENTRY_CONFIGURATION_FAIL,
    READ_CART_ENTRY_CONFIGURATION_SUCCESS: READ_CART_ENTRY_CONFIGURATION_SUCCESS,
    READ_CONFIGURATION: READ_CONFIGURATION,
    READ_CONFIGURATION_FAIL: READ_CONFIGURATION_FAIL,
    READ_CONFIGURATION_SUCCESS: READ_CONFIGURATION_SUCCESS,
    READ_ORDER_ENTRY_CONFIGURATION: READ_ORDER_ENTRY_CONFIGURATION,
    READ_ORDER_ENTRY_CONFIGURATION_FAIL: READ_ORDER_ENTRY_CONFIGURATION_FAIL,
    READ_ORDER_ENTRY_CONFIGURATION_SUCCESS: READ_ORDER_ENTRY_CONFIGURATION_SUCCESS,
    REMOVE_CART_BOUND_CONFIGURATIONS: REMOVE_CART_BOUND_CONFIGURATIONS,
    REMOVE_CONFIGURATION: REMOVE_CONFIGURATION,
    REMOVE_PRODUCT_BOUND_CONFIGURATIONS: REMOVE_PRODUCT_BOUND_CONFIGURATIONS,
    ReadCartEntryConfiguration: ReadCartEntryConfiguration,
    ReadCartEntryConfigurationFail: ReadCartEntryConfigurationFail,
    ReadCartEntryConfigurationSuccess: ReadCartEntryConfigurationSuccess,
    ReadConfiguration: ReadConfiguration,
    ReadConfigurationFail: ReadConfigurationFail,
    ReadConfigurationSuccess: ReadConfigurationSuccess,
    ReadOrderEntryConfiguration: ReadOrderEntryConfiguration,
    ReadOrderEntryConfigurationFail: ReadOrderEntryConfigurationFail,
    ReadOrderEntryConfigurationSuccess: ReadOrderEntryConfigurationSuccess,
    RemoveCartBoundConfigurations: RemoveCartBoundConfigurations,
    RemoveConfiguration: RemoveConfiguration,
    RemoveProductBoundConfigurations: RemoveProductBoundConfigurations,
    SEARCH_VARIANTS: SEARCH_VARIANTS,
    SEARCH_VARIANTS_FAIL: SEARCH_VARIANTS_FAIL,
    SEARCH_VARIANTS_SUCCESS: SEARCH_VARIANTS_SUCCESS,
    SET_CURRENT_GROUP: SET_CURRENT_GROUP,
    SET_GROUPS_VISITED: SET_GROUPS_VISITED,
    SET_INTERACTION_STATE: SET_INTERACTION_STATE,
    SET_MENU_PARENT_GROUP: SET_MENU_PARENT_GROUP,
    SET_NEXT_OWNER_CART_ENTRY: SET_NEXT_OWNER_CART_ENTRY,
    SearchVariants: SearchVariants,
    SearchVariantsFail: SearchVariantsFail,
    SearchVariantsSuccess: SearchVariantsSuccess,
    SetCurrentGroup: SetCurrentGroup,
    SetGroupsVisited: SetGroupsVisited,
    SetInteractionState: SetInteractionState,
    SetMenuParentGroup: SetMenuParentGroup,
    SetNextOwnerCartEntry: SetNextOwnerCartEntry,
    UPDATE_CART_ENTRY: UPDATE_CART_ENTRY,
    UPDATE_CART_ENTRY_SUCCESS: UPDATE_CART_ENTRY_SUCCESS,
    UPDATE_CONFIGURATION: UPDATE_CONFIGURATION,
    UPDATE_CONFIGURATION_FAIL: UPDATE_CONFIGURATION_FAIL,
    UPDATE_CONFIGURATION_FINALIZE_FAIL: UPDATE_CONFIGURATION_FINALIZE_FAIL,
    UPDATE_CONFIGURATION_FINALIZE_SUCCESS: UPDATE_CONFIGURATION_FINALIZE_SUCCESS,
    UPDATE_CONFIGURATION_OVERVIEW: UPDATE_CONFIGURATION_OVERVIEW,
    UPDATE_CONFIGURATION_OVERVIEW_FAIL: UPDATE_CONFIGURATION_OVERVIEW_FAIL,
    UPDATE_CONFIGURATION_OVERVIEW_SUCCESS: UPDATE_CONFIGURATION_OVERVIEW_SUCCESS,
    UPDATE_CONFIGURATION_SUCCESS: UPDATE_CONFIGURATION_SUCCESS,
    UPDATE_PRICE_SUMMARY: UPDATE_PRICE_SUMMARY,
    UPDATE_PRICE_SUMMARY_FAIL: UPDATE_PRICE_SUMMARY_FAIL,
    UPDATE_PRICE_SUMMARY_SUCCESS: UPDATE_PRICE_SUMMARY_SUCCESS,
    UpdateCartEntry: UpdateCartEntry,
    UpdateConfiguration: UpdateConfiguration,
    UpdateConfigurationFail: UpdateConfigurationFail,
    UpdateConfigurationFinalizeFail: UpdateConfigurationFinalizeFail,
    UpdateConfigurationFinalizeSuccess: UpdateConfigurationFinalizeSuccess,
    UpdateConfigurationOverview: UpdateConfigurationOverview,
    UpdateConfigurationOverviewFail: UpdateConfigurationOverviewFail,
    UpdateConfigurationOverviewSuccess: UpdateConfigurationOverviewSuccess,
    UpdateConfigurationSuccess: UpdateConfigurationSuccess,
    UpdatePriceSummary: UpdatePriceSummary,
    UpdatePriceSummaryFail: UpdatePriceSummaryFail,
    UpdatePriceSummarySuccess: UpdatePriceSummarySuccess
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const getConfigurationsState = createFeatureSelector(CONFIGURATOR_FEATURE);
const getConfigurationState = createSelector(getConfigurationsState, (state) => state.configurations);
const getConfigurationProcessLoaderStateFactory = (code) => {
    return createSelector(getConfigurationState, (details) => StateUtils.entityProcessesLoaderStateSelector(details, code));
};
const hasPendingChanges = (code) => {
    return createSelector(getConfigurationState, (details) => StateUtils.entityHasPendingProcessesSelector(details, code));
};
const getConfigurationFactory = (code) => {
    return createSelector(getConfigurationProcessLoaderStateFactory(code), (configurationState) => StateUtils.loaderValueSelector(configurationState));
};
const getCurrentGroup = (ownerKey) => {
    return createSelector(getConfigurationFactory(ownerKey), (configuration) => configuration?.interactionState?.currentGroup);
};
const isGroupVisited = (ownerKey, groupId) => {
    return createSelector(getConfigurationFactory(ownerKey), (configuration) => {
        const groupsVisited = configuration?.interactionState?.groupsVisited;
        return groupsVisited ? groupsVisited[groupId] : false;
    });
};
const areGroupsVisited = (ownerKey, groupIds) => {
    return createSelector(getConfigurationFactory(ownerKey), (configuration) => {
        return (groupIds
            .map((id) => {
            const groupsVisited = configuration?.interactionState?.groupsVisited;
            return groupsVisited ? groupsVisited[id] : false;
        })
            .filter((visited) => !visited).length === 0);
    });
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var configuratorGroup_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    areGroupsVisited: areGroupsVisited,
    getConfigurationFactory: getConfigurationFactory,
    getConfigurationProcessLoaderStateFactory: getConfigurationProcessLoaderStateFactory,
    getConfigurationState: getConfigurationState,
    getConfigurationsState: getConfigurationsState,
    getCurrentGroup: getCurrentGroup,
    hasPendingChanges: hasPendingChanges,
    isGroupVisited: isGroupVisited
});

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Utility service for the facade layer. Supposed to be accessed by facade services
 */
class ConfiguratorUtilsService {
    /**
     * Determines the direct parent group for an attribute group
     * @param {Configurator.Group[]} groups - List of groups where we search for parent
     * @param {Configurator.Group} group - If already part of groups, no further search is needed, and we return the provided parent group
     * @param {Configurator.Group} parentGroup - Optional parent group.
     * @returns {Configurator.Group | undefined} - Parent group. Might be undefined
     */
    getParentGroup(groups, group, parentGroup) {
        if (groups.includes(group)) {
            return parentGroup;
        }
        return groups
            .map((currentGroup) => {
            return currentGroup.subGroups
                ? this.getParentGroup(currentGroup.subGroups, group, currentGroup)
                : undefined;
        })
            .filter((foundGroup) => foundGroup)
            .pop();
    }
    /**
     * Finds group identified by its ID, and ensures that we always get a valid group.
     * If nothing is found in the configuration group list, this methods returns the first group.
     *
     * The exceptional case can happen if e.g. an edit in a conflict was done that
     * resolved the conflict, or if a group vanished due to object dependencies.
     * @param {Configurator.Group[]} groups - List of groups
     * @param {string} groupId - Group id
     * @returns {Configurator.Group} - Group identified by its id, if available. Otherwise first group
     */
    getGroupById(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        if (currentGroup) {
            return currentGroup;
        }
        const groupFound = this.getGroupFromSubGroups(groups, groupId);
        return groupFound ? groupFound : groups[0];
    }
    /**
     * Finds group identified by its ID. If nothing is found, this
     * methods returns undefined
     * @param {Configurator.Group[]} groups - List of groups
     * @param {string} groupId - Group id
     * @returns {Configurator.Group | undefined} - Group identified by its id, if available. Otherwise undefined
     */
    getOptionalGroupById(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        return currentGroup
            ? currentGroup
            : this.getGroupFromSubGroups(groups, groupId);
    }
    getGroupByIdIfPresent(groups, groupId) {
        const currentGroup = groups.find((group) => group.id === groupId);
        if (currentGroup) {
            return currentGroup;
        }
        return this.getGroupFromSubGroups(groups, groupId);
    }
    getGroupFromSubGroups(groups, groupId) {
        const groupFound = groups
            .map((group) => {
            return group.subGroups
                ? this.getGroupByIdIfPresent(group.subGroups, groupId)
                : undefined;
        })
            .filter((foundGroup) => foundGroup)
            .pop();
        return groupFound;
    }
    /**
     * Verifies whether the current group has a subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the current group has any subgroups, otherwise 'false'
     */
    hasSubGroups(group) {
        return group.subGroups ? group.subGroups.length > 0 : false;
    }
    /**
     * Verifies whether the configuration has been created.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {boolean} - 'True' if the configuration hass been created, otherwise 'false'
     */
    isConfigurationCreated(configuration) {
        const configId = configuration?.configId;
        return (configId !== undefined &&
            configId.length !== 0 &&
            configuration !== undefined &&
            (configuration.flatGroups.length > 0 ||
                configuration.overview !== undefined));
    }
    /**
     * Creates configuration extract.
     *
     * @param {Configurator.Attribute} changedAttribute - changed configuration
     * @param {Configurator.Configuration} configuration - configuration
     * @param {Configurator.UpdateType} updateType - updated type
     * @return {Configurator.Configuration} - Configuration
     */
    createConfigurationExtract(changedAttribute, configuration, updateType) {
        if (!updateType) {
            updateType = Configurator.UpdateType.ATTRIBUTE;
        }
        const newConfiguration = {
            configId: configuration.configId,
            groups: [],
            flatGroups: [],
            interactionState: {
                isConflictResolutionMode: configuration.interactionState.isConflictResolutionMode,
            },
            owner: configuration.owner,
            productCode: configuration.productCode,
            updateType,
        };
        const groupPath = [];
        if (changedAttribute.groupId) {
            this.buildGroupPath(changedAttribute.groupId, configuration.groups, groupPath);
        }
        else {
            throw Error('GroupId must be available at attribute level during update');
        }
        const groupPathLength = groupPath.length;
        if (groupPathLength === 0) {
            throw new Error('At this point we expect that group is available in the configuration: ' +
                changedAttribute.groupId +
                ', ' +
                JSON.stringify(configuration.groups.map((cGroup) => cGroup.id)));
        }
        let currentGroupInExtract = this.buildGroupForExtract(groupPath[groupPathLength - 1]);
        let currentLeafGroupInExtract = currentGroupInExtract;
        newConfiguration.groups.push(currentGroupInExtract);
        for (let index = groupPath.length - 1; index > 0; index--) {
            currentLeafGroupInExtract = this.buildGroupForExtract(groupPath[index - 1]);
            currentGroupInExtract.subGroups = [currentLeafGroupInExtract];
            currentGroupInExtract = currentLeafGroupInExtract;
        }
        currentLeafGroupInExtract.attributes = [changedAttribute];
        return newConfiguration;
    }
    /**
     * Builds group path.
     *
     * @param {string} groupId - Group ID
     * @param { Configurator.Group[]} groupList - List of groups
     * @param { Configurator.Group[]} groupPath - Path of groups
     * @return {boolean} - 'True' if the group has been found, otherwise 'false'
     */
    buildGroupPath(groupId, groupList, groupPath) {
        let haveFoundGroup = false;
        const group = groupList.find((currentGroup) => currentGroup.id === groupId);
        if (group) {
            groupPath.push(group);
            haveFoundGroup = true;
        }
        else {
            groupList
                .filter((currentGroup) => currentGroup.subGroups)
                .forEach((currentGroup) => {
                if (currentGroup.subGroups &&
                    this.buildGroupPath(groupId, currentGroup.subGroups, groupPath)) {
                    groupPath.push(currentGroup);
                    haveFoundGroup = true;
                }
            });
        }
        return haveFoundGroup;
    }
    /**
     * Retrieves the configuration from state, and throws an error in case the configuration is
     * not available
     * @param {StateUtils.ProcessesLoaderState<Configurator.Configuration>} configurationState - Process loader state containing product configuration
     * @returns {Configurator.Configuration} - The actual product configuration
     */
    getConfigurationFromState(configurationState) {
        const configuration = configurationState.value;
        if (configuration) {
            return configuration;
        }
        else {
            throw new Error('Configuration must be defined at this point');
        }
    }
    buildGroupForExtract(group) {
        const changedGroup = {
            groupType: group.groupType,
            id: group.id,
            subGroups: [],
        };
        return changedGroup;
    }
}
ConfiguratorUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUtilsService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUtilsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorCartService {
    constructor(store, activeCartService, commonConfigUtilsService, checkoutQueryFacade, userIdService, configuratorUtilsService) {
        this.store = store;
        this.activeCartService = activeCartService;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.checkoutQueryFacade = checkoutQueryFacade;
        this.userIdService = userIdService;
        this.configuratorUtilsService = configuratorUtilsService;
    }
    /**
     * Reads a configuration that is attached to a cart entry, dispatching the respective action.
     *
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForCartEntry(owner) {
        return this.store.pipe(select(getConfigurationProcessLoaderStateFactory(owner.key)), 
        //needed as we cannot read the cart in general and for the OV
        //in parallel, this can lead to cache issues with promotions
        delayWhen(() => this.activeCartService.isStable().pipe(filter((stable) => stable))), delayWhen(() => this.checkoutQueryFacade.getCheckoutDetailsState().pipe(map((state) => state.loading), filter((loading) => !loading))), tap((configurationState) => {
            if (this.configurationNeedsReading(configurationState)) {
                this.activeCartService
                    .requireLoadedCart()
                    .pipe(take(1))
                    .subscribe((cart) => {
                    this.userIdService
                        .getUserId()
                        .pipe(take(1))
                        .subscribe((userId) => {
                        const readFromCartEntryParameters = {
                            userId: userId,
                            cartId: this.commonConfigUtilsService.getCartId(cart),
                            cartEntryNumber: owner.id,
                            owner: owner,
                        };
                        this.store.dispatch(new ReadCartEntryConfiguration(readFromCartEntryParameters));
                    });
                });
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtilsService.getConfigurationFromState(configurationState)));
    }
    /**
     * Reads a configuration that is attached to an order entry, dispatching the respective action.
     *
     * @param owner Configuration owner
     * @returns Observable of product configurations
     */
    readConfigurationForOrderEntry(owner) {
        return this.store.pipe(select(getConfigurationProcessLoaderStateFactory(owner.key)), tap((configurationState) => {
            if (this.configurationNeedsReading(configurationState)) {
                const ownerIdParts = this.commonConfigUtilsService.decomposeOwnerId(owner.id);
                const readFromOrderEntryParameters = {
                    userId: OCC_USER_ID_CURRENT,
                    orderId: ownerIdParts.documentId,
                    orderEntryNumber: ownerIdParts.entryNumber,
                    owner: owner,
                };
                this.store.dispatch(new ReadOrderEntryConfiguration(readFromOrderEntryParameters));
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtilsService.getConfigurationFromState(configurationState)));
    }
    /**
     * Adds a configuration to the cart, specified by the product code, a configuration ID and configuration owner key.
     *
     * @param productCode - Product code
     * @param configId - Configuration ID
     * @param owner - Configuration owner
     * @param quantity - Quantity
     */
    addToCart(productCode, configId, owner, quantity) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const addToCartParameters = {
                    userId: userId,
                    cartId: this.commonConfigUtilsService.getCartId(cart),
                    productCode: productCode,
                    quantity: quantity ?? 1,
                    configId: configId,
                    owner: owner,
                };
                this.store.dispatch(new AddToCart(addToCartParameters));
            });
        });
    }
    /**
     * Updates a cart entry, specified by the configuration.
     * The cart entry number for the entry that owns the configuration can be told
     * from the configuration's owner ID
     *
     * @param configuration - Configuration
     */
    updateCartEntry(configuration) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const parameters = {
                    userId: userId,
                    cartId: this.commonConfigUtilsService.getCartId(cart),
                    cartEntryNumber: configuration.owner.id,
                    configuration: configuration,
                };
                this.store.dispatch(new UpdateCartEntry(parameters));
            });
        });
    }
    /**
     * Can be used to check if the active cart has any product configuration issues.
     *
     * @returns True if and only if there is at least one cart entry with product configuration issues
     */
    activeCartHasIssues() {
        return this.activeCartService.requireLoadedCart().pipe(map((cart) => {
            return cart ? cart.entries : [];
        }), map((entries) => entries
            ? entries.filter((entry) => this.commonConfigUtilsService.getNumberOfIssues(entry))
            : []), map((entries) => entries.length > 0));
    }
    /**
     * Retrieves cart entry by a cart entry number.
     *
     * @param {string} entryNumber - Entry number
     * @returns {Observable<OrderEntry | undefined>} - Cart entry
     */
    getEntry(entryNumber) {
        return this.activeCartService.requireLoadedCart().pipe(map((cart) => {
            return cart.entries ? cart.entries : [];
        }), map((entries) => {
            const filteredEntries = entries.filter((entry) => entry.entryNumber?.toString() === entryNumber);
            return filteredEntries
                ? filteredEntries[filteredEntries.length - 1]
                : undefined;
        }));
    }
    /**
     * Remove all configurations that are linked to cart entries
     */
    removeCartBoundConfigurations() {
        this.store.dispatch(new RemoveCartBoundConfigurations());
    }
    isConfigurationCreated(configuration) {
        const configId = configuration.configId;
        return configId.length !== 0;
    }
    configurationNeedsReading(configurationState) {
        const configuration = configurationState.value;
        return (configuration === undefined ||
            (!this.isConfigurationCreated(configuration) &&
                !configurationState.loading &&
                !configurationState.error));
    }
}
ConfiguratorCartService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartService, deps: [{ token: i1.Store }, { token: i2.ActiveCartFacade }, { token: i2$1.CommonConfiguratorUtilsService }, { token: i4.CheckoutQueryFacade }, { token: i1$1.UserIdService }, { token: ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCartService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ActiveCartFacade }, { type: i2$1.CommonConfiguratorUtilsService }, { type: i4.CheckoutQueryFacade }, { type: i1$1.UserIdService }, { type: ConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorCommonsService {
    constructor(store, commonConfigUtilsService, configuratorCartService, activeCartService, configuratorUtils) {
        this.store = store;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.configuratorCartService = configuratorCartService;
        this.activeCartService = activeCartService;
        this.configuratorUtils = configuratorUtils;
        this.logger = inject(LoggerService);
    }
    /**
     * Verifies whether there are any pending configuration changes.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} Returns true if there are any pending changes, otherwise false
     */
    hasPendingChanges(owner) {
        return this.store.pipe(select(hasPendingChanges(owner.key)));
    }
    /**
     * Verifies whether the configuration is loading.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} Returns true if the configuration is loading, otherwise false
     */
    isConfigurationLoading(owner) {
        return this.store.pipe(select(getConfigurationProcessLoaderStateFactory(owner.key)), map((configurationState) => configurationState.loading ?? false));
    }
    /**
     * Returns a configuration for an owner. Emits only if there are valid configurations
     * available for the requested owner, does not trigger the re-read or
     * creation of the configuration in case it's not there
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<Configurator.Configuration>}
     */
    getConfiguration(owner) {
        return this.store.pipe(select(getConfigurationFactory(owner.key)), filter((configuration) => this.configuratorUtils.isConfigurationCreated(configuration)));
    }
    /**
     * Returns a configuration if it exists or creates a new one.
     * Emits if there is a valid configuration available and triggers
     * the configuration creation or read from backend in case it is not
     * available
     *
     * @param owner - Configuration owner
     * @returns {Observable<Configurator.Configuration>}
     */
    getOrCreateConfiguration(owner, configIdTemplate) {
        switch (owner.type) {
            case CommonConfigurator.OwnerType.CART_ENTRY: {
                return this.configuratorCartService.readConfigurationForCartEntry(owner);
            }
            case CommonConfigurator.OwnerType.ORDER_ENTRY: {
                return this.configuratorCartService.readConfigurationForOrderEntry(owner);
            }
            default: {
                return this.getOrCreateConfigurationForProduct(owner, configIdTemplate);
            }
        }
    }
    /**
     * Updates a configuration, specified by the configuration owner key, group ID and a changed attribute.
     *
     * @param ownerKey - Configuration owner key
     * @param changedAttribute - Changes attribute
     */
    updateConfiguration(ownerKey, changedAttribute, updateType) {
        if (!updateType) {
            updateType = Configurator.UpdateType.ATTRIBUTE;
        }
        // in case cart updates pending: Do nothing, because an addToCart might
        // be in progress. Can happen if on slow networks addToCart was hit and
        // afterwards an attribute was changed before the OV navigation has
        // taken place
        this.activeCartService
            .getActive()
            .pipe(take(1), switchMap((cart) => this.activeCartService.isStable().pipe(take(1), tap((stable) => {
            if (isDevMode() && cart.code && !stable) {
                this.logger.warn('Cart is busy, no configuration updates possible');
            }
        }), filter((stable) => !cart.code || stable), switchMap(() => this.store.pipe(select(getConfigurationFactory(ownerKey)), take(1))))))
            .subscribe((configuration) => {
            this.store.dispatch(new UpdateConfiguration(this.configuratorUtils.createConfigurationExtract(changedAttribute, configuration, updateType)));
        });
    }
    /**
     * Returns a configuration with an overview. Emits valid configurations which
     * include the overview aspect
     *
     * @param configuration - Configuration
     * @returns Observable of configurations including the overview
     */
    getConfigurationWithOverview(configuration) {
        return this.store.pipe(select(getConfigurationFactory(configuration.owner.key)), filter((config) => this.configuratorUtils.isConfigurationCreated(config)), tap((configurationState) => {
            if (!this.hasConfigurationOverview(configurationState)) {
                this.store.dispatch(new GetConfigurationOverview(configuration));
            }
        }), filter((config) => this.hasConfigurationOverview(config)));
    }
    /**
     * Updates configuration overview according to group and attribute filters
     *
     * @param configuration - Configuration. Can contain filters in its overview facet
     */
    updateConfigurationOverview(configuration) {
        this.store.dispatch(new UpdateConfigurationOverview(configuration));
    }
    /**
     * Removes a configuration.
     *
     * @param owner - Configuration owner
     */
    removeConfiguration(owner) {
        this.store.dispatch(new RemoveConfiguration({ ownerKey: owner.key }));
    }
    /**
     * Dismisses conflict solver dialog
     *
     * @param owner - Configuration owner
     */
    dismissConflictSolverDialog(owner) {
        this.store.dispatch(new DissmissConflictDialoge(owner.key));
    }
    /**
     * Check if we need to launch conflict solver dialog
     *
     * @param owner - Configuration owner
     */
    checkConflictSolverDialog(owner) {
        this.store.dispatch(new CheckConflictDialoge(owner.key));
    }
    /**
     * Checks if the configuration contains conflicts that are displayed as conflict groups. Note
     * that in case conflicts are displayed by the conflict solver dialog, they are not taken into
     * account for this method
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<boolean>} - Returns true if the configuration has conflicts, otherwise false
     */
    hasConflicts(owner) {
        return this.getConfiguration(owner).pipe(map((configuration) => 
        //We expect that the first group must always be the conflict group
        configuration.immediateConflictResolution === false &&
            configuration.groups[0]?.groupType ===
                Configurator.GroupType.CONFLICT_HEADER_GROUP));
    }
    /**
     * Forces the creation of a new default configuration for the given owner
     * @param owner - Configuration owner
     */
    forceNewConfiguration(owner) {
        this.store.dispatch(new RemoveConfiguration({
            ownerKey: owner.key,
        }));
        this.store.dispatch(new CreateConfiguration({
            owner: owner,
            configIdTemplate: undefined,
            forceReset: true,
        }));
    }
    getOrCreateConfigurationForProduct(owner, configIdTemplate) {
        return this.store.pipe(select(getConfigurationProcessLoaderStateFactory(owner.key)), tap((configurationState) => {
            if ((configurationState.value === undefined ||
                !this.configuratorUtils.isConfigurationCreated(configurationState.value)) &&
                configurationState.loading !== true &&
                configurationState.error !== true) {
                this.store.dispatch(new CreateConfiguration({
                    owner,
                    configIdTemplate,
                }));
            }
        }), filter((configurationState) => configurationState.value !== undefined &&
            this.configuratorUtils.isConfigurationCreated(configurationState.value)), 
        //save to assume configuration is defined after previous filter
        map((configurationState) => this.configuratorUtils.getConfigurationFromState(configurationState)));
    }
    hasConfigurationOverview(configuration) {
        return configuration.overview !== undefined;
    }
    /**
     * Removes product bound configurations that is linked to state
     */
    removeProductBoundConfigurations() {
        this.store.dispatch(new RemoveProductBoundConfigurations());
    }
}
ConfiguratorCommonsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCommonsService, deps: [{ token: i1.Store }, { token: i2$1.CommonConfiguratorUtilsService }, { token: ConfiguratorCartService }, { token: i2.ActiveCartFacade }, { token: ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCommonsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCommonsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCommonsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2$1.CommonConfiguratorUtilsService }, { type: ConfiguratorCartService }, { type: i2.ActiveCartFacade }, { type: ConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service for handling group statuses
 */
class ConfiguratorGroupStatusService {
    constructor(store, configuratorUtilsService) {
        this.store = store;
        this.configuratorUtilsService = configuratorUtilsService;
    }
    /**
     * Verifies whether the group has been visited.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID
     * @returns {Observable<boolean>} Has group been visited?
     */
    isGroupVisited(owner, groupId) {
        return this.store.select(isGroupVisited(owner.key, groupId));
    }
    /**
     * Returns the first non-conflict group of the configuration which is not completed
     * and undefined if all are completed.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     *
     * @return {Configurator.Group} - First incomplete group or undefined
     */
    getFirstIncompleteGroup(configuration) {
        return configuration.flatGroups
            ? configuration.flatGroups
                .filter((group) => group.groupType !== Configurator.GroupType.CONFLICT_GROUP)
                .find((group) => !group.complete)
            : undefined;
    }
    /**
     * Determines whether the group has been visited or not.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @param {string} groupId - Group ID
     */
    setGroupStatusVisited(configuration, groupId) {
        const group = this.configuratorUtilsService.getGroupById(configuration.groups, groupId);
        const parentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, groupId));
        const visitedGroupIds = [];
        visitedGroupIds.push(group.id);
        if (parentGroup) {
            this.getParentGroupStatusVisited(configuration, group.id, parentGroup, visitedGroupIds);
        }
        this.store.dispatch(new SetGroupsVisited({
            entityKey: configuration.owner.key,
            visitedGroups: visitedGroupIds,
        }));
    }
    areGroupsVisited(owner, groupIds) {
        return this.store.select(areGroupsVisited(owner.key, groupIds));
    }
    getParentGroupStatusVisited(configuration, groupId, parentGroup, visitedGroupIds) {
        const subGroups = [];
        parentGroup.subGroups.forEach((subGroup) => {
            //The current group is not set to visited yet, therefore we have to exclude it in the check
            if (subGroup.id === groupId) {
                return;
            }
            subGroups.push(subGroup.id);
        });
        this.areGroupsVisited(configuration.owner, subGroups)
            .pipe(take(1))
            .subscribe((isVisited) => {
            if (isVisited) {
                visitedGroupIds.push(parentGroup.id);
                const grandParentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, parentGroup.id));
                if (grandParentGroup) {
                    this.getParentGroupStatusVisited(configuration, parentGroup.id, grandParentGroup, visitedGroupIds);
                }
            }
        });
    }
}
ConfiguratorGroupStatusService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupStatusService, deps: [{ token: i1.Store }, { token: ConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupStatusService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupStatusService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupStatusService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: ConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service for handling configuration groups
 */
class ConfiguratorGroupsService {
    constructor(store, configuratorCommonsService, configuratorUtilsService, configuratorGroupStatusService) {
        this.store = store;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorUtilsService = configuratorUtilsService;
        this.configuratorGroupStatusService = configuratorGroupStatusService;
    }
    /**
     * Returns the current group Id.
     * In case no group Id is being set before returns the first group of the configuration.
     * Return null when configuration contains no groups.
     *
     * @param {CommonConfigurator.Owner} owner configuration owner
     * @returns {Observable<string>} Group ID
     */
    getCurrentGroupId(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
            if (configuration.interactionState.currentGroup) {
                return configuration.interactionState.currentGroup;
            }
            else {
                return configuration.groups[0]?.id;
            }
        }));
    }
    /**
     * Return the first conflict group of a configuration or undefined
     * if not present
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {Configurator.Group} Conflict group
     */
    getFirstConflictGroup(configuration) {
        return configuration.flatGroups.find((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP);
    }
    /**
     * Navigates to the first non-conflict group of the configuration which is not completed.
     * This method assumes that the configuration has incomplete groups,
     * the caller has to verify this prior to calling this method. In case no incomplete group is
     * present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     */
    navigateToFirstIncompleteGroup(owner) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            const groupId = this.configuratorGroupStatusService.getFirstIncompleteGroup(configuration)?.id;
            if (groupId) {
                this.navigateToGroup(configuration, groupId, true);
            }
        });
    }
    /**
     * Navigates to the first conflict group and sets the conflict header as parent group.
     * This method assumes that the configuration has conflicts,
     * the caller has to verify this prior to calling this method. In case no conflict group
     * is present, nothing will happen
     *
     * @param {CommonConfigurator.Owner} owner Configuration Owner
     */
    navigateToConflictSolver(owner) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            const groupId = this.getFirstConflictGroup(configuration)?.id;
            if (groupId) {
                this.navigateToGroup(configuration, groupId, true, true);
            }
        });
    }
    /**
     * Returns the parent group of the subgroup that is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @returns {Observable<Configurator.Group>} Group
     */
    getMenuParentGroup(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
            const menuParentGroup = configuration.interactionState.menuParentGroup;
            return menuParentGroup
                ? this.configuratorUtilsService.getOptionalGroupById(configuration.groups, menuParentGroup)
                : undefined;
        }));
    }
    /**
     * Set the parent group, specified by the group ID, which is displayed in the group menu.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID. Can be ommitted, in this case parent group will be cleared, in case we are on root level
     */
    setMenuParentGroup(owner, groupId) {
        this.store.dispatch(new SetMenuParentGroup({
            entityKey: owner.key,
            menuParentGroup: groupId,
        }));
    }
    /**
     * Returns the group that is currently visited.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<Configurator.Group>} Current group
     */
    getCurrentGroup(owner) {
        return this.getCurrentGroupId(owner).pipe(switchMap((currentGroupId) => {
            return this.configuratorCommonsService
                .getConfiguration(owner)
                .pipe(map((configuration) => this.configuratorUtilsService.getGroupById(configuration.groups, currentGroupId)));
        }));
    }
    /**
     * Retrieves a conflict group for immediate conflict resolution.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<Configurator.Group | undefined} - Conflict group
     */
    getConflictGroupForImmediateConflictResolution(owner) {
        return this.configuratorCommonsService.getConfiguration(owner).pipe(
        //needed because we need have the form to react first on showConflictSolverDialog
        delay(0), map((configuration) => {
            if (configuration.interactionState.showConflictSolverDialog) {
                return configuration.flatGroups.find((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP);
            }
            return undefined;
        }));
    }
    /**
     * Determines whether the group has been visited or not.
     *
     * @param {CommonConfigurator.Owner} owner - Owner
     * @param {string} groupId - Group ID
     */
    setGroupStatusVisited(owner, groupId) {
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(map((configuration) => this.configuratorGroupStatusService.setGroupStatusVisited(configuration, groupId)), take(1))
            .subscribe();
    }
    /**
     * Navigates to the group, specified by its group ID.
     *
     * @param {Configurator.Configuration}configuration - Configuration
     * @param {string} groupId - Group ID
     * @param {boolean} setStatus - Group status will be set for previous group, default true
     * @param {boolean} conflictResolutionMode - Parameter with default (false). If set to true, we enter the conflict resolution mode, i.e.
     *  if a conflict is solved, the system will navigate to the next conflict present
     */
    navigateToGroup(configuration, groupId, setStatus = true, conflictResolutionMode = false) {
        if (setStatus) {
            //Set Group status for current group
            this.getCurrentGroup(configuration.owner)
                .pipe(take(1))
                .subscribe((currentGroup) => {
                this.configuratorGroupStatusService.setGroupStatusVisited(configuration, currentGroup.id);
            });
        }
        const parentGroup = this.configuratorUtilsService.getParentGroup(configuration.groups, this.configuratorUtilsService.getGroupById(configuration.groups, groupId));
        this.store.dispatch(new ChangeGroup({
            configuration: configuration,
            groupId: groupId,
            parentGroupId: parentGroup ? parentGroup.id : undefined,
            conflictResolutionMode: conflictResolutionMode,
        }));
    }
    /**
     * Returns the group ID of the group that is coming after the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string> | undefined} ID of next group
     */
    getNextGroupId(owner) {
        return this.getNeighboringGroupId(owner, 1);
    }
    /**
     * Returns the group ID of the group that is preceding the current one in a sequential order.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @return {Observable<string | undefined >} ID of previous group
     */
    getPreviousGroupId(owner) {
        return this.getNeighboringGroupId(owner, -1);
    }
    /**
     * Verifies whether the group has been visited
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} Has been visited?
     */
    isGroupVisited(owner, groupId) {
        return this.configuratorGroupStatusService.isGroupVisited(owner, groupId);
    }
    /**
     * Returns a parent group for the given group.
     *
     * @param {Configurator.Group[]} groups - List of groups where we search for the parent group
     * @param {Configurator.Group} group - Given group
     * @return {Configurator.Group} Parent group or undefined if group is a top-level group
     */
    getParentGroup(groups, group) {
        return this.configuratorUtilsService.getParentGroup(groups, group);
    }
    /**
     * Verifies whether the given group has sub groups.
     *
     * @param {Configurator.Group} group - Given group
     * @return {boolean} Sub groups available?
     */
    hasSubGroups(group) {
        return this.configuratorUtilsService.hasSubGroups(group);
    }
    isConflictGroupInImmediateConflictResolutionMode(groupType, immediateConflictResolution = false) {
        if (groupType) {
            return (groupType === Configurator.GroupType.CONFLICT_GROUP &&
                immediateConflictResolution);
        }
        return false;
    }
    /**
     * Retrieves a group ID of the neighboring group.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     * @param {number} neighboringIndex - Index of neighboring group
     * @return {Observable<string>} group ID of the neighboring group
     */
    getNeighboringGroupId(owner, neighboringIndex) {
        return this.getCurrentGroupId(owner).pipe(switchMap((currentGroupId) => {
            return this.configuratorCommonsService.getConfiguration(owner).pipe(map((configuration) => {
                let nextGroup;
                configuration.flatGroups.forEach((group, index) => {
                    if (group.id === currentGroupId &&
                        configuration.flatGroups &&
                        configuration.flatGroups[index + neighboringIndex] && //Check if neighboring group exists
                        !this.isConflictGroupInImmediateConflictResolutionMode(configuration.flatGroups[index + neighboringIndex]?.groupType, configuration.immediateConflictResolution)) {
                        nextGroup =
                            configuration.flatGroups[index + neighboringIndex].id;
                    }
                });
                return nextGroup;
            }), take(1));
        }));
    }
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType) {
        return (groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP ||
            groupType === Configurator.GroupType.CONFLICT_GROUP);
    }
}
ConfiguratorGroupsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupsService, deps: [{ token: i1.Store }, { token: ConfiguratorCommonsService }, { token: ConfiguratorUtilsService }, { token: ConfiguratorGroupStatusService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: ConfiguratorCommonsService }, { type: ConfiguratorUtilsService }, { type: ConfiguratorGroupStatusService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorStorefrontUtilsService {
    constructor(configuratorGroupsService, windowRef, keyboardFocusService) {
        this.configuratorGroupsService = configuratorGroupsService;
        this.windowRef = windowRef;
        this.keyboardFocusService = keyboardFocusService;
        /**
         * 'CX' prefix is used to generate an alphanumeric prefix ID.
         */
        this.CX_PREFIX = 'cx';
        this.SEPARATOR = '--';
        /**
         * Height of a CSS box model of an 'add-to-cart' button
         * See _configurator-add-to-cart-button.scss
         */
        this.ADD_TO_CART_BUTTON_HEIGHT = 82;
        this.logger = inject(LoggerService);
    }
    /**
     * Does the configuration belong to a cart entry, or has the group been visited already?
     * In both cases we need to render indications for mandatory attributes.
     * This method emits only once and then stops further emissions.
     *
     * @param {CommonConfigurator.Owner} owner -
     * @param {string} groupId - Group ID
     * @return {Observable<boolean>} - Returns 'Observable<true>' if the cart entry or group are visited, otherwise 'Observable<false>'
     */
    isCartEntryOrGroupVisited(owner, groupId) {
        return this.configuratorGroupsService.isGroupVisited(owner, groupId).pipe(take(1), map((result) => result ? true : owner.type === CommonConfigurator.OwnerType.CART_ENTRY));
    }
    /**
     * Assemble an attribute value with the currently selected values from a checkbox list.
     *
     * @param {UntypedFormControl[]} controlArray - Control array
     * @param {Configurator.Attribute} attribute -  Configuration attribute
     * @return {Configurator.Value[]} - list of configurator values
     */
    assembleValuesForMultiSelectAttributes(controlArray, attribute) {
        const localAssembledValues = [];
        for (let i = 0; i < controlArray.length; i++) {
            const value = attribute.values ? attribute.values[i] : undefined;
            if (value) {
                const localAttributeValue = {
                    valueCode: value.valueCode,
                };
                localAttributeValue.name = value.name;
                localAttributeValue.quantity = value.quantity;
                localAttributeValue.selected = controlArray[i].value;
                localAssembledValues.push(localAttributeValue);
            }
            else {
                if (isDevMode()) {
                    this.logger.warn('ControlArray does not match values, at least one value could not been found');
                }
            }
        }
        return localAssembledValues;
    }
    /**
     * Scrolls to the corresponding HTML element.
     *
     * @param {Element | HTMLElement} element - HTML element
     */
    scroll(element) {
        let topOffset = 0;
        if (element instanceof HTMLElement) {
            topOffset = element.offsetTop;
        }
        this.windowRef.nativeWindow?.scroll(0, topOffset);
    }
    /**
     * Scrolls to the corresponding configuration element in the HTML tree.
     *
     * @param {string} selector - Selector of the HTML element
     */
    scrollToConfigurationElement(selector) {
        if (this.windowRef.isBrowser()) {
            // we don't want to run this logic when doing SSR
            const element = this.getElement(selector);
            if (element) {
                this.scroll(element);
            }
        }
    }
    /**
     * Focus the first attribute in the form.
     */
    focusFirstAttribute() {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const form = this.getElement('cx-configurator-form');
        if (form) {
            const focusableElements = this.keyboardFocusService.findFocusable(form);
            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    }
    getFocusableElementById(focusableElements, id) {
        return focusableElements.find((focusableElement) => {
            if (id) {
                if (focusableElement.nodeName.toLocaleLowerCase().indexOf(id) !== -1 ||
                    focusableElement.id.indexOf(id) !== -1) {
                    return focusableElement;
                }
            }
        });
    }
    getFocusableConflictDescription(focusableElements) {
        return this.getFocusableElementById(focusableElements, 'cx-configurator-conflict-description');
    }
    getFocusableElementByValueUiKey(focusableElements, valueUiKey) {
        return this.getFocusableElementById(focusableElements, valueUiKey);
    }
    getFocusableElementByAttributeId(focusableElements, attributeName) {
        return this.getFocusableElementById(focusableElements, attributeName);
    }
    createAttributeValueUiKey(attributeId, valueId) {
        return attributeId + this.SEPARATOR + valueId;
    }
    /**
     * Focus a value in the form.
     *
     * @param {Configurator.Attribute} attribute - Attribute
     */
    focusValue(attribute) {
        if (!this.windowRef.isBrowser()) {
            return;
        }
        const form = this.getElement('cx-configurator-form');
        if (form) {
            const focusableElements = this.keyboardFocusService.findFocusable(form);
            if (focusableElements.length > 0) {
                this.focusOnElements(focusableElements, attribute);
            }
        }
    }
    focusOnElements(focusableElements, attribute) {
        let foundFocusableElement = this.getFocusableConflictDescription(focusableElements);
        if (!foundFocusableElement) {
            foundFocusableElement = this.focusOnElementForConflicting(attribute, foundFocusableElement, focusableElements);
        }
        if (foundFocusableElement) {
            foundFocusableElement.focus();
        }
    }
    focusOnElementForConflicting(attribute, foundFocusableElement, focusableElements) {
        const selectedValue = attribute.values?.find((value) => value.selected);
        if (selectedValue) {
            const valueUiKey = this.createAttributeValueUiKey(attribute.name, selectedValue.valueCode);
            foundFocusableElement = this.getFocusableElementByValueUiKey(focusableElements, valueUiKey);
        }
        if (!foundFocusableElement) {
            foundFocusableElement = this.getFocusableElementByAttributeId(focusableElements, attribute.name);
        }
        return foundFocusableElement;
    }
    /**
     * Retrieves a unique prefix ID.
     *
     * @param {string | undefined} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - prefix ID
     */
    getPrefixId(idPrefix, groupId) {
        return idPrefix
            ? idPrefix + this.SEPARATOR + groupId
            : this.CX_PREFIX + this.SEPARATOR + groupId;
    }
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId) {
        if (groupId) {
            return groupId + '-group';
        }
    }
    /**
     * Generates a unique overview group ID from the local group ID
     * and a prefix that reflects the parent groups in the group hierarchy
     *
     * @param {string} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - generated group ID
     */
    createOvGroupId(prefix, groupId) {
        return this.getPrefixId(prefix, groupId) + '-ovGroup';
    }
    /**
     * Generates a unique overview menu item ID from the local group ID
     * and a prefix that reflects the parent groups in the group hierarchy
     *
     * @param {string} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - generated group ID
     */
    createOvMenuItemId(prefix, groupId) {
        return this.getPrefixId(prefix, groupId) + '-ovMenuItem';
    }
    /**
     * Persist the keyboard focus state for the given key.
     * The focus is stored globally or for the given group.
     *
     * @param {string} key - key
     * @param {string} group? - Group
     */
    setFocus(key, group) {
        if (key) {
            this.keyboardFocusService.set(key, group);
        }
    }
    /**
     * Change styling of element
     *
     * @param {string} querySelector - querySelector
     * @param {string} property - CSS property
     * @param {string} value - CSS value
     */
    changeStyling(querySelector, property, value) {
        const element = this.getElement(querySelector);
        if (element) {
            element.style.setProperty(property, value);
        }
    }
    /**
     * Removes styling for element
     *
     * @param {string} querySelector - querySelector
     * @param {string} property - CSS property
     */
    removeStyling(querySelector, property) {
        const element = this.getElement(querySelector);
        if (element) {
            element.style.removeProperty(property);
        }
    }
    /**
     * Get HTML element based on querySelector when running in browser
     *
     * @param querySelector - querySelector
     * @returns selected HTML element
     */
    getElement(querySelector) {
        if (this.windowRef.isBrowser()) {
            return this.windowRef.document.querySelector(querySelector);
        }
    }
    /**
     * Retrieves a list of HTML elements based on querySelector when running in browser
     *
     * @param {string} querySelector - querySelector
     * @returns {HTMLElement[] | undefined} - List of HTML elements
     */
    getElements(querySelector) {
        if (this.windowRef.isBrowser()) {
            return Array.from(this.windowRef.document.querySelectorAll(querySelector));
        }
    }
    /**
     * Retrieves a number of pixels that the document is currently scrolled vertically.
     *
     * @returns {number | undefined} - Number of pixels that the document is currently scrolled vertically.
     */
    getVerticallyScrolledPixels() {
        if (this.windowRef.isBrowser()) {
            return this.windowRef.nativeWindow?.scrollY;
        }
        return undefined;
    }
    /**
     * Verifies whether the element has a scrollbar.
     *
     * @param {string} querySelector - Element query selector
     * @returns {boolean} - 'True', if the element has a scrollbar, otherwise 'false'
     */
    hasScrollbar(querySelector) {
        const element = this.getElement(querySelector);
        if (element) {
            return element.scrollHeight > element.clientHeight;
        }
        return false;
    }
    isInViewport(element) {
        if (element) {
            const bounding = element.getBoundingClientRect();
            const height = element.offsetHeight;
            const width = element.offsetWidth;
            return (bounding.top >= -height &&
                bounding.left >= -width &&
                bounding.right <=
                    (this.windowRef.nativeWindow?.innerWidth || element.clientWidth) +
                        width &&
                bounding.bottom <=
                    (this.windowRef.nativeWindow?.innerHeight || element.clientHeight) +
                        height);
        }
        return false;
    }
    getHeight(querySelector) {
        const element = this.getElement(querySelector);
        const isElementInViewport = this.isInViewport(element);
        if (isElementInViewport && element?.offsetHeight) {
            return element?.offsetHeight;
        }
        return 0;
    }
    /**
     * Retrieves the actual height of the spare viewport.
     *
     * SPA header, variant configuration overview header and "Add to cart" button occupy certain height of the viewport, that's why
     * if SPA header, variant configuration overview header and "Add to cart" button are in the viewport,
     * they will be subtracted from the actual viewport height.
     *
     * @returns {number} - Height of the spare viewport.
     */
    getSpareViewportHeight() {
        if (this.windowRef.isBrowser()) {
            const spaHeaderHeight = this.getHeight('header');
            const ovHeaderHeight = this.getHeight('.VariantConfigOverviewHeader');
            const addToCartHeight = this.getHeight('cx-configurator-add-to-cart-button') !== 0
                ? this.getHeight('cx-configurator-add-to-cart-button')
                : this.ADD_TO_CART_BUTTON_HEIGHT;
            const occupiedHeight = spaHeaderHeight + ovHeaderHeight + addToCartHeight * 2;
            return this.windowRef.nativeWindow
                ? this.windowRef.nativeWindow.innerHeight - occupiedHeight
                : 0;
        }
        return 0;
    }
    /**
     * Ensure that the element is always visible.
     *
     * @param {string} querySelector - Element query selector
     * @param {HTMLElement | undefined} element - Element that should be visible within the scrollable element.
     */
    ensureElementVisible(querySelector, element) {
        const container = this.getElement(querySelector);
        if (element && container) {
            if (element.offsetTop > container.scrollTop) {
                const offsetBottom = element.offsetTop + element.offsetHeight;
                if (offsetBottom > container.scrollTop) {
                    container.scrollTop = offsetBottom - container.offsetHeight;
                }
            }
            else {
                container.scrollTop = element.getBoundingClientRect()?.top - 10;
            }
        }
    }
}
ConfiguratorStorefrontUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorStorefrontUtilsService, deps: [{ token: ConfiguratorGroupsService }, { token: i1$1.WindowRef }, { token: i3.KeyboardFocusService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorStorefrontUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorStorefrontUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorStorefrontUtilsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: ConfiguratorGroupsService }, { type: i1$1.WindowRef }, { type: i3.KeyboardFocusService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * To implement custom solution provide your own implementation and customize services that use ConfiguratorQuantityService
 */
class ConfiguratorQuantityService {
    constructor() {
        this._quantity = new ReplaySubject(1);
    }
    /**
     * Sets the configuration quantity.
     *
     * @param quantity
     */
    setQuantity(quantity) {
        this._quantity.next(quantity);
    }
    /**
     * Retrieves the configuration quantity.
     *
     * @returns {Observable<number>} - Configuration quantity.
     */
    getQuantity() {
        return this._quantity;
    }
}
ConfiguratorQuantityService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorQuantityService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorQuantityService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorQuantityService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorQuantityService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CX_SELECTOR = 'cx-configurator-add-to-cart-button';
class ConfiguratorAddToCartButtonComponent {
    constructor(routingService, configuratorCommonsService, configuratorCartService, configuratorGroupsService, configRouterExtractorService, globalMessageService, orderHistoryFacade, commonConfiguratorUtilsService, configUtils, intersectionService, configuratorQuantityService) {
        this.routingService = routingService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorCartService = configuratorCartService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.globalMessageService = globalMessageService;
        this.orderHistoryFacade = orderHistoryFacade;
        this.commonConfiguratorUtilsService = commonConfiguratorUtilsService;
        this.configUtils = configUtils;
        this.intersectionService = intersectionService;
        this.configuratorQuantityService = configuratorQuantityService;
        this.subscription = new Subscription();
        this.quantityControl = new UntypedFormControl(1);
        this.iconType = ICON_TYPE;
        this.container$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService
            .getConfiguration(routerData.owner)
            .pipe(map((configuration) => ({ routerData, configuration })))
            .pipe(switchMap((cont) => this.configuratorCommonsService
            .hasPendingChanges(cont.configuration.owner)
            .pipe(map((hasPendingChanges) => ({
            routerData: cont.routerData,
            configuration: cont.configuration,
            hasPendingChanges,
        })))))));
    }
    ngOnInit() {
        this.makeAddToCartButtonSticky();
        if (this.configuratorQuantityService) {
            this.configuratorQuantityService
                .getQuantity()
                .pipe(take(1))
                .subscribe((quantity) => {
                this.quantityControl.setValue(quantity);
            });
        }
        this.subscription.add(this.quantityControl.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe(() => this.configuratorQuantityService?.setQuantity(this.quantityControl.value)));
    }
    navigateToCart() {
        this.routingService.go('cart');
    }
    navigateToOverview(configuratorType, owner) {
        this.routingService.go({
            cxRoute: 'configureOverview' + configuratorType,
            params: { ownerType: 'cartEntry', entityKey: owner.id },
        });
    }
    displayConfirmationMessage(key) {
        this.globalMessageService.add({ key: key }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
    }
    /**
     * Performs the navigation to the corresponding location (cart or overview pages).
     *
     * @param {string} configuratorType - Configurator type
     * @param {CommonConfigurator.Owner} owner - Owner
     * @param {boolean} isAdd - Is add to cart
     * @param {boolean} isOverview - Is overview page
     * @param {boolean} showMessage - Show message
     */
    performNavigation(configuratorType, owner, isAdd, isOverview, showMessage) {
        const messageKey = isAdd
            ? 'configurator.addToCart.confirmation'
            : 'configurator.addToCart.confirmationUpdate';
        if (isOverview) {
            this.navigateToCart();
        }
        else {
            this.navigateToOverview(configuratorType, owner);
        }
        if (showMessage) {
            this.displayConfirmationMessage(messageKey);
        }
    }
    /**
     * Decides on the resource key for the button. Depending on the business process (owner of the configuration) and the
     * need for a cart update, the text will differ.
     *
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {string} The resource key that controls the button description
     */
    getButtonResourceKey(routerData, configuration) {
        if (routerData.isOwnerCartEntry &&
            configuration.isCartEntryUpdateRequired) {
            return 'configurator.addToCart.buttonUpdateCart';
        }
        else if (routerData.isOwnerCartEntry &&
            !configuration.isCartEntryUpdateRequired) {
            return 'configurator.addToCart.buttonAfterAddToCart';
        }
        else {
            return 'configurator.addToCart.button';
        }
    }
    /**
     * Verifies whether it is a cart entry.
     *
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     * @returns {boolean} - 'true' if it is a cart entry, otherwise 'false'
     */
    isCartEntry(routerData) {
        return routerData.isOwnerCartEntry ? routerData.isOwnerCartEntry : false;
    }
    /**
     * Triggers action and navigation, both depending on the context. Might result in an addToCart, updateCartEntry,
     * just a cart navigation or a browser back navigation
     * @param {Configurator.Configuration} configuration - Configuration
     * @param {ConfiguratorRouter.Data} routerData - Reflects the current router state
     */
    onAddToCart(configuration, routerData) {
        const pageType = routerData.pageType;
        const configuratorType = configuration.owner.configuratorType;
        const isOverview = pageType === ConfiguratorRouter.PageType.OVERVIEW;
        const isOwnerCartEntry = routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY;
        const owner = configuration.owner;
        const currentGroup = configuration.interactionState.currentGroup;
        if (currentGroup) {
            this.configuratorGroupsService.setGroupStatusVisited(configuration.owner, currentGroup);
        }
        this.container$
            .pipe(filter((cont) => !cont.hasPendingChanges), take(1))
            .subscribe(() => {
            if (isOwnerCartEntry) {
                this.onUpdateCart(configuration, configuratorType, owner, isOverview);
            }
            else {
                this.onAddToCartForProduct(owner, configuration, configuratorType, isOverview);
            }
        });
    }
    onAddToCartForProduct(owner, configuration, configuratorType, isOverview) {
        const quantity = this.quantityControl.value;
        this.configuratorCartService.addToCart(owner.id, configuration.configId, owner, quantity);
        this.configuratorCommonsService
            .getConfiguration(owner)
            .pipe(filter((configWithNextOwner) => configWithNextOwner.nextOwner !== undefined), take(1))
            .subscribe((configWithNextOwner) => {
            //See preceding filter operator: configWithNextOwner.nextOwner is always defined here
            this.navigateForProductBound(configWithNextOwner, configuratorType, isOverview);
        });
    }
    navigateForProductBound(configWithNextOwner, configuratorType, isOverview) {
        const nextOwner = configWithNextOwner.nextOwner ??
            ConfiguratorModelUtils.createInitialOwner();
        this.performNavigation(configuratorType, nextOwner, true, isOverview, true);
        // we clean up the cart entry related configuration, as we might have a
        // configuration for the same cart entry number stored already.
        // (Cart entries might have been deleted)
        // Needs to happen only if we are on configuration page, navigation to
        // cart will anyhow delete.
        // We do not clean up the product bound configuration yet, as existing
        // observables would instantly trigger a re-create.
        // Cleaning up this obsolete product bound configuration (with link to the cart) will
        // only happen on leaving the configurator pages, see ConfiguratorRouterListener
        if (!isOverview) {
            this.configuratorCommonsService.removeConfiguration(nextOwner);
        }
    }
    onUpdateCart(configuration, configuratorType, owner, isOverview) {
        if (configuration.isCartEntryUpdateRequired) {
            this.configuratorCartService.updateCartEntry(configuration);
        }
        this.performNavigation(configuratorType, owner, false, isOverview, configuration.isCartEntryUpdateRequired ?? false);
        //Only remove if we are on configuration page, because on final cart navigation,
        //the configuration will anyhow be removed
        if (configuration.isCartEntryUpdateRequired && !isOverview) {
            this.configuratorCommonsService.removeConfiguration(owner);
        }
    }
    leaveConfigurationOverview() {
        this.container$.pipe(take(1)).subscribe((container) => {
            if (container.routerData.owner.type ===
                CommonConfigurator.OwnerType.ORDER_ENTRY) {
                this.goToOrderDetails(container.routerData.owner);
            }
            else {
                this.routingService.go({ cxRoute: 'checkoutReviewOrder' });
            }
        });
    }
    goToOrderDetails(owner) {
        this.orderHistoryFacade.loadOrderDetails(this.commonConfiguratorUtilsService.decomposeOwnerId(owner.id).documentId);
        this.orderHistoryFacade
            .getOrderDetails()
            .pipe(filter((order) => order !== undefined), take(1))
            .subscribe((order) => this.routingService.go({ cxRoute: 'orderDetails', params: order }));
    }
    extractConfigPrices(configuration) {
        const priceSummary = configuration.priceSummary;
        const basePrice = priceSummary?.basePrice?.formattedValue;
        const selectedOptions = priceSummary?.selectedOptions?.formattedValue;
        const totalPrice = priceSummary?.currentTotal?.formattedValue;
        const prices = {
            basePrice: basePrice,
            selectedOptions: selectedOptions,
            totalPrice: totalPrice,
        };
        if (!basePrice || basePrice === '-') {
            prices.basePrice = '0';
        }
        if (!selectedOptions || selectedOptions === '-') {
            prices.selectedOptions = '0';
        }
        if (!totalPrice || totalPrice === '-') {
            prices.totalPrice = '0';
        }
        return prices;
    }
    makeAddToCartButtonSticky() {
        // The add-to-cart button has to be shown at the bottom of the configuration view
        // and scrolled out together with the configuration view when it is moved to the top out from the viewport.
        // From the technical point of view it is controlled by checking whether the add-to-cart button intersects the price-summary or not:
        // the add-to-cart button has to be shown sticky, if intersects, and fixed, if not.
        // To avoid the situation where the add-to-cart button is shown fixed below the footer view
        // when the configuration view is scrolled out to the top on small mobile screens, we use the rootMargin parameter.
        // The first field of the rootMargin controls the delay in pixel after them the add-to-cart button has to be shown fixed again.
        // We set this value very high, so the add-to-cart button will never appear below the footer view even in case of small screens.
        const options = {
            rootMargin: '9999px 0px -100px 0px',
        };
        this.subscription.add(this.container$
            .pipe(take(1), delay(0), map(() => this.configUtils.getElement('cx-configurator-price-summary')), switchMap((priceSummary) => priceSummary
            ? this.intersectionService.isIntersecting(priceSummary, options)
            : of(undefined)), filter((isIntersecting) => isIntersecting !== undefined))
            .subscribe((isIntersecting) => {
            if (isIntersecting) {
                this.configUtils.changeStyling(CX_SELECTOR, 'position', 'sticky');
            }
            else {
                this.configUtils.changeStyling(CX_SELECTOR, 'position', 'fixed');
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ConfiguratorAddToCartButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonComponent, deps: [{ token: i1$1.RoutingService }, { token: ConfiguratorCommonsService }, { token: ConfiguratorCartService }, { token: ConfiguratorGroupsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: i1$1.GlobalMessageService }, { token: i6.OrderHistoryFacade }, { token: i2$1.CommonConfiguratorUtilsService }, { token: ConfiguratorStorefrontUtilsService }, { token: i3.IntersectionService }, { token: ConfiguratorQuantityService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAddToCartButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAddToCartButtonComponent, selector: "cx-configurator-add-to-cart-button", ngImport: i0, template: "<ng-container *ngIf=\"container$ | async as container\">\n  <ng-container *ngIf=\"!container.routerData.displayOnly; else displayOnly\">\n    <div class=\"cx-add-to-cart-btn-container\">\n      <ng-container *cxFeatureLevel=\"'!6.1'\">\n        <button\n          class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n          (click)=\"onAddToCart(container.configuration, container.routerData)\"\n          [attr.aria-label]=\"\n            (getButtonResourceKey(container.routerData, container.configuration)\n              | cxTranslate) +\n            ' ' +\n            ('configurator.a11y.addToCartPrices'\n              | cxTranslate: extractConfigPrices(container.configuration))\n          \"\n        >\n          {{\n            getButtonResourceKey(container.routerData, container.configuration)\n              | cxTranslate\n          }}\n        </button>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.1'\">\n        <ng-container *ngIf=\"!isCartEntry(container.routerData)\">\n          <div class=\"cx-quantity-add-to-cart-container\">\n            <div class=\"cx-quantity-add-to-cart-row\">\n              <div class=\"cx-quantity\">\n                <label>{{\n                  'configurator.addToCart.quantity' | cxTranslate\n                }}</label>\n                <cx-item-counter [control]=\"quantityControl\"></cx-item-counter>\n              </div>\n              <button\n                class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n                (click)=\"\n                  onAddToCart(container.configuration, container.routerData)\n                \"\n                [attr.aria-label]=\"\n                  (getButtonResourceKey(\n                    container.routerData,\n                    container.configuration\n                  ) | cxTranslate) +\n                  ' ' +\n                  ('configurator.a11y.addToCartPrices'\n                    | cxTranslate: extractConfigPrices(container.configuration))\n                \"\n                title=\"{{\n                  getButtonResourceKey(\n                    container.routerData,\n                    container.configuration\n                  ) | cxTranslate\n                }}\"\n              >\n                <cx-icon [type]=\"iconType.CART_PLUS\"></cx-icon>\n              </button>\n            </div>\n          </div>\n        </ng-container>\n        <ng-container *ngIf=\"isCartEntry(container.routerData)\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n            (click)=\"onAddToCart(container.configuration, container.routerData)\"\n            [attr.aria-label]=\"\n              (getButtonResourceKey(\n                container.routerData,\n                container.configuration\n              ) | cxTranslate) +\n              ' ' +\n              ('configurator.a11y.addToCartPrices'\n                | cxTranslate: extractConfigPrices(container.configuration))\n            \"\n          >\n            {{\n              getButtonResourceKey(\n                container.routerData,\n                container.configuration\n              ) | cxTranslate\n            }}\n          </button>\n        </ng-container>\n      </ng-container>\n    </div>\n  </ng-container>\n  <ng-template #displayOnly>\n    <div class=\"cx-display-only-btn-container\">\n      <ng-container *cxFeatureLevel=\"'!6.1'\">\n        <button\n          class=\"cx-btn btn btn-block btn-primary cx-display-only-btn\"\n          (click)=\"leaveConfigurationOverview()\"\n        >\n          {{ 'configurator.addToCart.buttonDisplayOnly' | cxTranslate }}\n        </button>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.1'\">\n        <button\n          class=\"cx-btn btn btn-block btn-secondary cx-display-only-btn\"\n          (click)=\"leaveConfigurationOverview()\"\n        >\n          {{ 'configurator.addToCart.buttonClose' | cxTranslate }}\n        </button>\n      </ng-container>\n    </div>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: CX_SELECTOR, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"container$ | async as container\">\n  <ng-container *ngIf=\"!container.routerData.displayOnly; else displayOnly\">\n    <div class=\"cx-add-to-cart-btn-container\">\n      <ng-container *cxFeatureLevel=\"'!6.1'\">\n        <button\n          class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n          (click)=\"onAddToCart(container.configuration, container.routerData)\"\n          [attr.aria-label]=\"\n            (getButtonResourceKey(container.routerData, container.configuration)\n              | cxTranslate) +\n            ' ' +\n            ('configurator.a11y.addToCartPrices'\n              | cxTranslate: extractConfigPrices(container.configuration))\n          \"\n        >\n          {{\n            getButtonResourceKey(container.routerData, container.configuration)\n              | cxTranslate\n          }}\n        </button>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.1'\">\n        <ng-container *ngIf=\"!isCartEntry(container.routerData)\">\n          <div class=\"cx-quantity-add-to-cart-container\">\n            <div class=\"cx-quantity-add-to-cart-row\">\n              <div class=\"cx-quantity\">\n                <label>{{\n                  'configurator.addToCart.quantity' | cxTranslate\n                }}</label>\n                <cx-item-counter [control]=\"quantityControl\"></cx-item-counter>\n              </div>\n              <button\n                class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n                (click)=\"\n                  onAddToCart(container.configuration, container.routerData)\n                \"\n                [attr.aria-label]=\"\n                  (getButtonResourceKey(\n                    container.routerData,\n                    container.configuration\n                  ) | cxTranslate) +\n                  ' ' +\n                  ('configurator.a11y.addToCartPrices'\n                    | cxTranslate: extractConfigPrices(container.configuration))\n                \"\n                title=\"{{\n                  getButtonResourceKey(\n                    container.routerData,\n                    container.configuration\n                  ) | cxTranslate\n                }}\"\n              >\n                <cx-icon [type]=\"iconType.CART_PLUS\"></cx-icon>\n              </button>\n            </div>\n          </div>\n        </ng-container>\n        <ng-container *ngIf=\"isCartEntry(container.routerData)\">\n          <button\n            class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n            (click)=\"onAddToCart(container.configuration, container.routerData)\"\n            [attr.aria-label]=\"\n              (getButtonResourceKey(\n                container.routerData,\n                container.configuration\n              ) | cxTranslate) +\n              ' ' +\n              ('configurator.a11y.addToCartPrices'\n                | cxTranslate: extractConfigPrices(container.configuration))\n            \"\n          >\n            {{\n              getButtonResourceKey(\n                container.routerData,\n                container.configuration\n              ) | cxTranslate\n            }}\n          </button>\n        </ng-container>\n      </ng-container>\n    </div>\n  </ng-container>\n  <ng-template #displayOnly>\n    <div class=\"cx-display-only-btn-container\">\n      <ng-container *cxFeatureLevel=\"'!6.1'\">\n        <button\n          class=\"cx-btn btn btn-block btn-primary cx-display-only-btn\"\n          (click)=\"leaveConfigurationOverview()\"\n        >\n          {{ 'configurator.addToCart.buttonDisplayOnly' | cxTranslate }}\n        </button>\n      </ng-container>\n      <ng-container *cxFeatureLevel=\"'6.1'\">\n        <button\n          class=\"cx-btn btn btn-block btn-secondary cx-display-only-btn\"\n          (click)=\"leaveConfigurationOverview()\"\n        >\n          {{ 'configurator.addToCart.buttonClose' | cxTranslate }}\n        </button>\n      </ng-container>\n    </div>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.RoutingService }, { type: ConfiguratorCommonsService }, { type: ConfiguratorCartService }, { type: ConfiguratorGroupsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: i1$1.GlobalMessageService }, { type: i6.OrderHistoryFacade }, { type: i2$1.CommonConfiguratorUtilsService }, { type: ConfiguratorStorefrontUtilsService }, { type: i3.IntersectionService }, { type: ConfiguratorQuantityService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAddToCartButtonModule {
}
ConfiguratorAddToCartButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAddToCartButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonModule, declarations: [ConfiguratorAddToCartButtonComponent], imports: [CommonModule,
        I18nModule,
        ItemCounterModule,
        IconModule,
        FeaturesConfigModule], exports: [ConfiguratorAddToCartButtonComponent] });
ConfiguratorAddToCartButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorAddToCartButton: {
                    component: ConfiguratorAddToCartButtonComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        ItemCounterModule,
        IconModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAddToCartButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        ItemCounterModule,
                        IconModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorAddToCartButton: {
                                    component: ConfiguratorAddToCartButtonComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAddToCartButtonComponent],
                    exports: [ConfiguratorAddToCartButtonComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to provide unique keys for elements on the UI and for sending to configurator
 */
class ConfiguratorAttributeBaseComponent {
    /**
     * Creates unique key for config value on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     * @param valueId
     */
    createValueUiKey(prefix, attributeId, valueId) {
        return (this.createAttributeUiKey(prefix, attributeId) +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            valueId);
    }
    /**
     * Creates unique key for config value to be sent to configurator
     * @param currentAttribute
     * @param value
     */
    createAttributeValueIdForConfigurator(currentAttribute, value) {
        return this.createValueUiKey(this.getUiType(currentAttribute), currentAttribute.name, value);
    }
    getUiType(attribute) {
        return attribute.uiType
            ? attribute.uiType
            : Configurator.UiType.NOT_IMPLEMENTED;
    }
    /**
     * Creates unique key for config attribute on the UI
     * @param prefix for key depending on usage (e.g. uiType, label)
     * @param attributeId
     */
    createAttributeUiKey(prefix, attributeId) {
        return (ConfiguratorAttributeBaseComponent.PREFIX +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            prefix +
            ConfiguratorAttributeBaseComponent.SEPERATOR +
            attributeId);
    }
    /**
     * Creates unique key for config attribute to be sent to configurator
     * @param currentAttribute
     */
    createAttributeIdForConfigurator(currentAttribute) {
        return this.createAttributeUiKey(this.getUiType(currentAttribute), currentAttribute.name);
    }
    /**
     * Creates unique key for attribute 'aria-labelledby'
     * @param prefix
     * @param attributeId
     * @param valueId
     * @param hasQuantity
     */
    createAriaLabelledBy(prefix, attributeId, valueId, hasQuantity) {
        let attributeUiKey = this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_LABEL, attributeId);
        if (valueId) {
            attributeUiKey +=
                ' ' +
                    this.createAttributeUiKey(prefix, attributeId) +
                    ConfiguratorAttributeBaseComponent.SEPERATOR +
                    valueId +
                    ' ';
            if (typeof hasQuantity === 'boolean' && !hasQuantity) {
                attributeUiKey +=
                    this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_DDLB_OPTION_PRICE_VALUE, attributeId) +
                        ConfiguratorAttributeBaseComponent.SEPERATOR +
                        valueId;
            }
            else {
                attributeUiKey +=
                    this.createAttributeUiKey(ConfiguratorAttributeBaseComponent.PREFIX_OPTION_PRICE_VALUE, attributeId) +
                        ConfiguratorAttributeBaseComponent.SEPERATOR +
                        valueId;
            }
        }
        return attributeUiKey;
    }
    /**
     * Creates a unique key for focus handling for the given attribute and value
     * @param attributeId
     * @param valueCode
     * @returns focus key
     */
    createFocusId(attributeId, valueCode) {
        return `${attributeId}--${valueCode}--focus`;
    }
    /**
     * Retrieves label with or without technical name depending whether the expert mode is set or not.
     *
     * @param expMode - Is expert mode set?
     * @param label - value label
     * @param techName - value technical name
     * @param value - Configurator value
     */
    getLabel(expMode, label, techName, value) {
        let title = label ? label : '';
        if (expMode && techName) {
            title += ` / [${techName}]`;
        }
        title += this.getValuePrice(value);
        return title;
    }
    /**
     * Fetches the first image for a given value
     * @param value Value
     * @returns Image
     */
    getImage(value) {
        const images = value.images;
        return images ? images[0] : undefined;
    }
    getValuePrice(value) {
        if (value?.valuePrice?.value && !value.selected) {
            if (value.valuePrice.value < 0) {
                return ` [${value.valuePrice?.formattedValue}]`;
            }
            else if (value.valuePrice.value > 0) {
                return ` [+${value.valuePrice?.formattedValue}]`;
            }
        }
        return '';
    }
    /**
     * Get code from attribute.
     * The code is not a mandatory attribute (since not available for VC flavour),
     * still it is mandatory in the context of CPQ. Calling this method therefore only
     * makes sense when CPQ is active. In case the method is called in the wrong context, an exception will
     * be thrown
     *
     * @param {Configurator.Attribute} Attribute
     * @returns {number} Attribute code
     */
    getAttributeCode(attribute) {
        const code = attribute.attrCode;
        if (code) {
            return code;
        }
        else {
            throw new Error('No attribute code for: ' + attribute.name);
        }
    }
    /**
     * Checks if attribute type allows additional values
     * @param attribute Attribute
     * @returns true if attribute type allows to enter additional values
     */
    isWithAdditionalValues(attribute) {
        const uiType = attribute.uiType;
        return (uiType === Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT ||
            uiType === Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT);
    }
    isRequiredErrorMsg(attribute) {
        return (attribute.required && attribute.incomplete) || false;
    }
    isUserInput(attribute) {
        return (attribute.uiType === Configurator.UiType.STRING ||
            attribute.uiType === Configurator.UiType.NUMERIC);
    }
    isDropDown(attribute) {
        return (attribute.uiType === Configurator.UiType.DROPDOWN ||
            attribute.uiType === Configurator.UiType.DROPDOWN_PRODUCT);
    }
    getSelectedValue(attribute) {
        return attribute.values?.find((value) => value.selected);
    }
    isNoValueSelected(attribute) {
        const selectedValue = this.getSelectedValue(attribute);
        if (selectedValue) {
            return selectedValue.valueCode === Configurator.RetractValueCode;
        }
        return true;
    }
}
ConfiguratorAttributeBaseComponent.SEPERATOR = '--';
ConfiguratorAttributeBaseComponent.PREFIX = 'cx-configurator';
ConfiguratorAttributeBaseComponent.PREFIX_LABEL = 'label';
ConfiguratorAttributeBaseComponent.PREFIX_OPTION_PRICE_VALUE = 'price--optionsPriceValue';
ConfiguratorAttributeBaseComponent.PREFIX_DDLB_OPTION_PRICE_VALUE = 'option--price';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCompositionContext {
}
ConfiguratorAttributeCompositionContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionContext, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorAttributeCompositionContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionContext });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionContext, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeFooterComponent extends ConfiguratorAttributeBaseComponent {
    constructor(configUtils, attributeComponentContext, 
    // TODO (CXSPA-3392): for next major release remove featureConfigService
    featureConfigService) {
        super();
        this.configUtils = configUtils;
        this.attributeComponentContext = attributeComponentContext;
        this.featureConfigService = featureConfigService;
        this.iconType = ICON_TYPE;
        this.attribute = attributeComponentContext.attribute;
        this.owner = attributeComponentContext.owner;
        this.groupId = attributeComponentContext.group.id;
    }
    ngOnInit() {
        /**
         * Show message that indicates that attribute is required in case attribute is a
         * free input field or a drop-dow list
         */
        this.showRequiredMessageForUserInput$ = this.configUtils
            .isCartEntryOrGroupVisited(this.owner, this.groupId)
            .pipe(map((result) => result ? this.needsRequiredAttributeErrorMsg() : false));
    }
    // TODO (CXSPA-3392): for next major release remove featureConfigService
    needsRequiredAttributeErrorMsg() {
        if (this.featureConfigService?.isLevel('6.2')) {
            // TODO: for next major release only these requirements should be proved
            return this.needsUserInputMsg() || this.needsDropDownMsg();
        }
        else {
            return this.needsUserInputMsg();
        }
    }
    needsDropDownMsg() {
        return (this.isRequiredErrorMsg(this.attribute) &&
            this.isDropDown(this.attribute) &&
            this.isNoValueSelected(this.attribute));
    }
    /**
     * Checks if attribute is a user input typed attribute with empty value.
     * Method will return false for domain based attributes
     * @param {string} input - user input
     */
    isUserInputEmpty(input) {
        return input !== undefined && (!input.trim() || 0 === input.length);
    }
    needsUserInputMsg() {
        return (this.isRequiredErrorMsg(this.attribute) &&
            this.isUserInput(this.attribute) &&
            this.isUserInputEmpty(this.attribute.userInput));
    }
    /**
     * @deprecated since 6.2
     *
     * `needsUserInputMsg` method will be called instead.
     */
    needsUserInputMessage() {
        const uiType = this.attribute.uiType;
        const needsMessage = this.attribute.required &&
            this.attribute.incomplete &&
            (uiType === Configurator.UiType.STRING ||
                uiType === Configurator.UiType.NUMERIC) &&
            this.isUserInputEmpty(this.attribute.userInput);
        return needsMessage ?? false;
    }
}
ConfiguratorAttributeFooterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeFooterComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorAttributeCompositionContext }, { token: i1$1.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeFooterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeFooterComponent, selector: "cx-configurator-attribute-footer", usesInheritance: true, ngImport: i0, template: "<ng-container *cxFeatureLevel=\"'!6.2'\">\n  <div\n    *ngIf=\"showRequiredMessageForUserInput$ | async\"\n    class=\"cx-required-error-msg\"\n    id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n    [attr.aria-label]=\"\n      'configurator.attribute.defaultRequiredMessage' | cxTranslate\n    \"\n    aria-live=\"assertive\"\n    aria-atomic=\"true\"\n    role=\"alert\"\n  >\n    <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n    {{ 'configurator.attribute.defaultRequiredMessage' | cxTranslate }}\n  </div>\n</ng-container>\n<ng-container *cxFeatureLevel=\"'6.2'\">\n  <div\n    *ngIf=\"showRequiredMessageForUserInput$ | async\"\n    class=\"cx-required-error-msg\"\n    id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n    [attr.aria-label]=\"\n      isUserInput(attribute)\n        ? ('configurator.attribute.defaultRequiredMessage' | cxTranslate)\n        : ('configurator.attribute.singleSelectRequiredMessage' | cxTranslate)\n    \"\n    aria-live=\"assertive\"\n    aria-atomic=\"true\"\n    role=\"alert\"\n  >\n    <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n    <ng-container *ngIf=\"isUserInput(attribute)\">\n      {{ 'configurator.attribute.defaultRequiredMessage' | cxTranslate }}\n    </ng-container>\n    <ng-container *ngIf=\"isDropDown(attribute)\">\n      {{ 'configurator.attribute.singleSelectRequiredMessage' | cxTranslate }}\n    </ng-container>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeFooterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-footer', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *cxFeatureLevel=\"'!6.2'\">\n  <div\n    *ngIf=\"showRequiredMessageForUserInput$ | async\"\n    class=\"cx-required-error-msg\"\n    id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n    [attr.aria-label]=\"\n      'configurator.attribute.defaultRequiredMessage' | cxTranslate\n    \"\n    aria-live=\"assertive\"\n    aria-atomic=\"true\"\n    role=\"alert\"\n  >\n    <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n    {{ 'configurator.attribute.defaultRequiredMessage' | cxTranslate }}\n  </div>\n</ng-container>\n<ng-container *cxFeatureLevel=\"'6.2'\">\n  <div\n    *ngIf=\"showRequiredMessageForUserInput$ | async\"\n    class=\"cx-required-error-msg\"\n    id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n    [attr.aria-label]=\"\n      isUserInput(attribute)\n        ? ('configurator.attribute.defaultRequiredMessage' | cxTranslate)\n        : ('configurator.attribute.singleSelectRequiredMessage' | cxTranslate)\n    \"\n    aria-live=\"assertive\"\n    aria-atomic=\"true\"\n    role=\"alert\"\n  >\n    <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n    <ng-container *ngIf=\"isUserInput(attribute)\">\n      {{ 'configurator.attribute.defaultRequiredMessage' | cxTranslate }}\n    </ng-container>\n    <ng-container *ngIf=\"isDropDown(attribute)\">\n      {{ 'configurator.attribute.singleSelectRequiredMessage' | cxTranslate }}\n    </ng-container>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorAttributeCompositionContext }, { type: i1$1.FeatureConfigService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeFooterModule {
}
ConfiguratorAttributeFooterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeFooterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeFooterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeFooterModule, declarations: [ConfiguratorAttributeFooterComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        FeaturesConfigModule], exports: [ConfiguratorAttributeFooterComponent] });
ConfiguratorAttributeFooterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeFooterModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    Footer: ConfiguratorAttributeFooterComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeFooterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    Footer: ConfiguratorAttributeFooterComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeFooterComponent],
                    exports: [ConfiguratorAttributeFooterComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorUISettingsConfig {
}
ConfiguratorUISettingsConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUISettingsConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorUISettingsConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUISettingsConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUISettingsConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeHeaderComponent extends ConfiguratorAttributeBaseComponent {
    constructor(configUtils, configuratorCommonsService, configuratorGroupsService, configuratorUiSettings, attributeComponentContext, 
    // TODO (CXSPA-3392): for next major release remove featureConfigService
    featureConfigService) {
        super();
        this.configUtils = configUtils;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configuratorUiSettings = configuratorUiSettings;
        this.attributeComponentContext = attributeComponentContext;
        this.featureConfigService = featureConfigService;
        this.iconTypes = ICON_TYPE;
        this.logger = inject(LoggerService);
        this.attribute = attributeComponentContext.attribute;
        this.owner = attributeComponentContext.owner;
        this.groupId = attributeComponentContext.group.id;
        this.groupType =
            attributeComponentContext.group.groupType ??
                Configurator.GroupType.ATTRIBUTE_GROUP;
        this.expMode = attributeComponentContext.expMode;
        this.isNavigationToGroupEnabled =
            attributeComponentContext.isNavigationToGroupEnabled ?? false;
    }
    ngOnInit() {
        /**
         * Show message that indicates that attribute is required in case attribute has a domain of values
         */
        this.showRequiredMessageForDomainAttribute$ = this.configUtils
            .isCartEntryOrGroupVisited(this.owner, this.groupId)
            .pipe(map((result) => result && this.needsRequiredAttributeErrorMsg()));
    }
    /**
     * Get message key for the required message. Is different for multi- and single selection values
     *  @return {string} - required message key
     */
    getRequiredMessageKey() {
        if (this.isSingleSelection()) {
            return this.isWithAdditionalValues(this.attribute)
                ? 'configurator.attribute.singleSelectAdditionalRequiredMessage'
                : 'configurator.attribute.singleSelectRequiredMessage';
        }
        else if (this.isMultiSelection) {
            return 'configurator.attribute.multiSelectRequiredMessage';
        }
        else {
            return 'configurator.attribute.singleSelectRequiredMessage';
        }
    }
    get isMultiSelection() {
        switch (this.attribute.uiType) {
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOXLIST_PRODUCT:
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                return true;
            }
        }
        return false;
    }
    isSingleSelection() {
        switch (this.attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
            case Configurator.UiType.RADIOBUTTON_PRODUCT:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                return true;
            }
        }
        return false;
    }
    isAttributeWithoutErrorMsg(uiType) {
        switch (uiType) {
            case Configurator.UiType.NOT_IMPLEMENTED:
            case Configurator.UiType.STRING:
            case Configurator.UiType.NUMERIC:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.DROPDOWN:
            case Configurator.UiType.DROPDOWN_PRODUCT: {
                return false;
            }
        }
        return true;
    }
    isAttributeWithDomain(uiType) {
        switch (uiType) {
            case Configurator.UiType.NOT_IMPLEMENTED:
            case Configurator.UiType.STRING:
            case Configurator.UiType.NUMERIC:
            case Configurator.UiType.CHECKBOX: {
                return false;
            }
        }
        return true;
    }
    // TODO (CXSPA-3392): for next major release remove featureConfigService
    needsRequiredAttributeErrorMsg() {
        if (this.featureConfigService?.isLevel('6.2')) {
            // TODO: for next major release this condition should be proved
            return this.isRequiredAttributeWithoutErrorMsg();
        }
        else {
            return this.isRequiredAttributeWithDomain();
        }
    }
    isRequiredAttributeWithDomain() {
        return (this.isRequiredErrorMsg(this.attribute) &&
            this.isAttributeWithDomain(this.attribute.uiType));
    }
    isRequiredAttributeWithoutErrorMsg() {
        return (this.isRequiredErrorMsg(this.attribute) &&
            this.isAttributeWithoutErrorMsg(this.attribute.uiType));
    }
    /**
     * Verifies whether the group type is attribute group
     *
     * @return {boolean} - 'true' if the group type is 'attribute group' otherwise 'false'
     */
    isAttributeGroup() {
        if (Configurator.GroupType.ATTRIBUTE_GROUP === this.groupType) {
            return true;
        }
        return false;
    }
    /**
     * Verifies whether the conflict resolution is active.
     *
     * @return {boolean} - 'true' if the conflict resolution is active otherwise 'false'
     */
    isConflictResolutionActive() {
        return this.isAttributeGroup() && this.isNavigationToGroupEnabled;
    }
    /**
     * Retrieves a certain conflict link key depending on the current group type for translation.
     *
     * @return {string} - the conflict link key
     */
    getConflictMessageKey() {
        return this.groupType === Configurator.GroupType.CONFLICT_GROUP
            ? 'configurator.conflict.viewConfigurationDetails'
            : this.isNavigationToConflictEnabled()
                ? 'configurator.conflict.viewConflictDetails'
                : 'configurator.conflict.conflictDetected';
    }
    /**
     * Checks if an image is attached
     * @returns True if an only if at least one image exists
     */
    get hasImage() {
        const images = this.attribute.images;
        return images ? images.length > 0 : false;
    }
    /**
     * Returns image attached to the attribute (if available)
     * @returns Image
     */
    get image() {
        const images = this.attribute.images;
        return images && this.hasImage ? images[0] : undefined;
    }
    /**
     * Navigates to the group.
     */
    navigateToGroup() {
        this.configuratorCommonsService
            .getConfiguration(this.owner)
            .pipe(take(1))
            .subscribe((configuration) => {
            let groupId;
            if (this.groupType === Configurator.GroupType.CONFLICT_GROUP) {
                groupId = this.attribute.groupId;
            }
            else {
                groupId = this.findConflictGroupId(configuration, this.attribute);
            }
            if (groupId) {
                this.configuratorGroupsService.navigateToGroup(configuration, groupId);
                this.focusValue(this.attribute);
                this.scrollToAttribute(this.attribute.name);
            }
            else {
                this.logError('Attribute was not found in any conflict group. Note that for this navigation, commerce 22.05 or later is required. Consider to disable setting "enableNavigationToConflict"');
            }
        });
    }
    /**
     * Scroll to conflicting attribute
     *
     * @protected
     */
    scrollToAttribute(name) {
        this.onNavigationCompleted(() => this.configUtils.scrollToConfigurationElement('#' + this.createAttributeUiKey('label', name)));
    }
    findConflictGroupId(configuration, currentAttribute) {
        return configuration.flatGroups
            .filter((group) => group.groupType === Configurator.GroupType.CONFLICT_GROUP)
            .find((group) => {
            return group.attributes?.find((attribute) => attribute.key === currentAttribute.key);
        })?.id;
    }
    logError(text) {
        if (isDevMode()) {
            this.logger.error(text);
        }
    }
    focusValue(attribute) {
        this.onNavigationCompleted(() => this.configUtils.focusValue(attribute));
    }
    /**
     * The status of the configuration loading is retrieved twice:
     * firstly, wait that the navigation to the corresponding group is started,
     * secondly, wait that the navigation is completed and
     * finally, invoke the callback function
     *
     * @protected
     */
    onNavigationCompleted(callback) {
        this.configuratorCommonsService
            .isConfigurationLoading(this.owner)
            .pipe(filter((isLoading) => isLoading), take(1), switchMap(() => this.configuratorCommonsService
            .isConfigurationLoading(this.owner)
            .pipe(filter((isLoading) => !isLoading), take(1), delay(0) //we need to consider the re-rendering of the page
        )))
            .subscribe(callback);
    }
    /**
     * Verifies whether the navigation to a conflict group is enabled.
     *
     * @returns {boolean} true only if navigation to conflict groups is enabled.
     */
    isNavigationToConflictEnabled() {
        return ((this.isNavigationToGroupEnabled &&
            this.configuratorUiSettings.productConfigurator
                ?.enableNavigationToConflict) ??
            false);
    }
}
ConfiguratorAttributeHeaderComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorCommonsService }, { token: ConfiguratorGroupsService }, { token: ConfiguratorUISettingsConfig }, { token: ConfiguratorAttributeCompositionContext }, { token: i1$1.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeHeaderComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeHeaderComponent, selector: "cx-configurator-attribute-header", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"!attribute.visible\" class=\"cx-hidden-msg\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ 'configurator.attribute.notVisibleAttributeMsg' | cxTranslate }}\n</div>\n\n<label\n  id=\"{{ createAttributeUiKey('label', attribute.name) }}\"\n  [class.cx-required-error]=\"showRequiredMessageForDomainAttribute$ | async\"\n  [attr.aria-label]=\"\n    !attribute.required\n      ? ('configurator.a11y.attribute'\n        | cxTranslate: { attribute: attribute.label })\n      : ('configurator.a11y.requiredAttribute'\n        | cxTranslate: { param: attribute.label })\n  \"\n  ><span\n    [class.cx-required-icon]=\"attribute.required\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >{{ getLabel(expMode, attribute.label, attribute.name) }}</span\n  ></label\n>\n<div\n  *ngIf=\"attribute.hasConflicts\"\n  class=\"cx-conflict-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-live]=\"isConflictResolutionActive() ? 'assertive' : 'off'\"\n  [attr.aria-atomic]=\"isConflictResolutionActive() ? true : false\"\n  [attr.role]=\"isConflictResolutionActive() ? 'alert' : null\"\n  [attr.aria-label]=\"\n    isConflictResolutionActive()\n      ? ('configurator.a11y.conflictDetected' | cxTranslate)\n      : ''\n  \"\n>\n  <cx-icon\n    *ngIf=\"isAttributeGroup()\"\n    [type]=\"iconTypes.WARNING\"\n    aria-hidden=\"true\"\n  ></cx-icon>\n  <ng-container *ngIf=\"isAttributeGroup(); else conflictGroup\">\n    <ng-container *ngIf=\"isNavigationToConflictEnabled(); else withoutLink\">\n      <a\n        class=\"link cx-action-link\"\n        (click)=\"navigateToGroup()\"\n        (keydown.enter)=\"navigateToGroup()\"\n        tabindex=\"0\"\n        [attr.aria-label]=\"\n          'configurator.a11y.navigateToConflict'\n            | cxTranslate: { attribute: attribute.label }\n        \"\n      >\n        {{ getConflictMessageKey() | cxTranslate }}\n      </a>\n    </ng-container>\n  </ng-container>\n</div>\n<div\n  *ngIf=\"showRequiredMessageForDomainAttribute$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"getRequiredMessageKey() | cxTranslate\"\n>\n  <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n  {{ getRequiredMessageKey() | cxTranslate }}\n</div>\n<img\n  *ngIf=\"hasImage\"\n  class=\"cx-attribute-img\"\n  src=\"{{ image?.url }}\"\n  alt=\"{{ image?.altText }}\"\n/>\n\n<ng-template #conflictGroup>\n  <a\n    *ngIf=\"isNavigationToGroupEnabled\"\n    class=\"link cx-action-link\"\n    (click)=\"navigateToGroup()\"\n    (keydown.enter)=\"navigateToGroup()\"\n    tabindex=\"0\"\n  >\n    {{ getConflictMessageKey() | cxTranslate }}\n  </a>\n</ng-template>\n\n<ng-template #withoutLink>\n  <div class=\"cx-conflict-msg\">\n    {{ getConflictMessageKey() | cxTranslate }}\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-header', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div *ngIf=\"!attribute.visible\" class=\"cx-hidden-msg\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ 'configurator.attribute.notVisibleAttributeMsg' | cxTranslate }}\n</div>\n\n<label\n  id=\"{{ createAttributeUiKey('label', attribute.name) }}\"\n  [class.cx-required-error]=\"showRequiredMessageForDomainAttribute$ | async\"\n  [attr.aria-label]=\"\n    !attribute.required\n      ? ('configurator.a11y.attribute'\n        | cxTranslate: { attribute: attribute.label })\n      : ('configurator.a11y.requiredAttribute'\n        | cxTranslate: { param: attribute.label })\n  \"\n  ><span\n    [class.cx-required-icon]=\"attribute.required\"\n    [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >{{ getLabel(expMode, attribute.label, attribute.name) }}</span\n  ></label\n>\n<div\n  *ngIf=\"attribute.hasConflicts\"\n  class=\"cx-conflict-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-live]=\"isConflictResolutionActive() ? 'assertive' : 'off'\"\n  [attr.aria-atomic]=\"isConflictResolutionActive() ? true : false\"\n  [attr.role]=\"isConflictResolutionActive() ? 'alert' : null\"\n  [attr.aria-label]=\"\n    isConflictResolutionActive()\n      ? ('configurator.a11y.conflictDetected' | cxTranslate)\n      : ''\n  \"\n>\n  <cx-icon\n    *ngIf=\"isAttributeGroup()\"\n    [type]=\"iconTypes.WARNING\"\n    aria-hidden=\"true\"\n  ></cx-icon>\n  <ng-container *ngIf=\"isAttributeGroup(); else conflictGroup\">\n    <ng-container *ngIf=\"isNavigationToConflictEnabled(); else withoutLink\">\n      <a\n        class=\"link cx-action-link\"\n        (click)=\"navigateToGroup()\"\n        (keydown.enter)=\"navigateToGroup()\"\n        tabindex=\"0\"\n        [attr.aria-label]=\"\n          'configurator.a11y.navigateToConflict'\n            | cxTranslate: { attribute: attribute.label }\n        \"\n      >\n        {{ getConflictMessageKey() | cxTranslate }}\n      </a>\n    </ng-container>\n  </ng-container>\n</div>\n<div\n  *ngIf=\"showRequiredMessageForDomainAttribute$ | async\"\n  class=\"cx-required-error-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  [attr.aria-label]=\"getRequiredMessageKey() | cxTranslate\"\n>\n  <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n  {{ getRequiredMessageKey() | cxTranslate }}\n</div>\n<img\n  *ngIf=\"hasImage\"\n  class=\"cx-attribute-img\"\n  src=\"{{ image?.url }}\"\n  alt=\"{{ image?.altText }}\"\n/>\n\n<ng-template #conflictGroup>\n  <a\n    *ngIf=\"isNavigationToGroupEnabled\"\n    class=\"link cx-action-link\"\n    (click)=\"navigateToGroup()\"\n    (keydown.enter)=\"navigateToGroup()\"\n    tabindex=\"0\"\n  >\n    {{ getConflictMessageKey() | cxTranslate }}\n  </a>\n</ng-template>\n\n<ng-template #withoutLink>\n  <div class=\"cx-conflict-msg\">\n    {{ getConflictMessageKey() | cxTranslate }}\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorCommonsService }, { type: ConfiguratorGroupsService }, { type: ConfiguratorUISettingsConfig }, { type: ConfiguratorAttributeCompositionContext }, { type: i1$1.FeatureConfigService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeHeaderModule {
}
ConfiguratorAttributeHeaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeHeaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderModule, declarations: [ConfiguratorAttributeHeaderComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        NgSelectModule], exports: [ConfiguratorAttributeHeaderComponent] });
ConfiguratorAttributeHeaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    Header: ConfiguratorAttributeHeaderComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        NgSelectModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeHeaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        NgSelectModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    Header: ConfiguratorAttributeHeaderComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeHeaderComponent],
                    exports: [ConfiguratorAttributeHeaderComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorShowMoreComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.showMore = false;
        this.showHiddenText = false;
        this.textSize = 60;
    }
    ngAfterViewInit() {
        this.textNormalized = this.normalize(this.text);
        if (this.textNormalized.length > this.textSize) {
            this.showMore = true;
            this.textToShow = this.textNormalized.substring(0, this.textSize);
        }
        else {
            this.textToShow = this.textNormalized;
        }
        this.cdRef.detectChanges();
    }
    toggleShowMore() {
        this.showHiddenText = !this.showHiddenText;
        this.showHiddenText
            ? (this.textToShow = this.textNormalized)
            : (this.textToShow = this.textNormalized.substring(0, this.textSize));
        this.cdRef.detectChanges();
    }
    normalize(text = '') {
        return text.replace(/<[^>]*>/g, '');
    }
}
ConfiguratorShowMoreComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorShowMoreComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorShowMoreComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorShowMoreComponent, selector: "cx-configurator-show-more", inputs: { text: "text", textSize: "textSize", productName: "productName" }, ngImport: i0, template: "<ng-container *ngIf=\"text\">\n  <span\n    [attr.aria-label]=\"\n      'configurator.a11y.itemDescription'\n        | cxTranslate\n          : {\n              item: productName\n            }\n    \"\n    [innerHTML]=\"textToShow\"\n  ></span>\n\n  <button (click)=\"toggleShowMore()\" *ngIf=\"showMore\" tabindex=\"-1\">\n    <ng-container *ngIf=\"showHiddenText; else less\"\n      >&nbsp;... {{ 'configurator.button.less' | cxTranslate }}</ng-container\n    >\n\n    <ng-template #less>\n      &nbsp;... {{ 'configurator.button.more' | cxTranslate }}</ng-template\n    >\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorShowMoreComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-show-more', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"text\">\n  <span\n    [attr.aria-label]=\"\n      'configurator.a11y.itemDescription'\n        | cxTranslate\n          : {\n              item: productName\n            }\n    \"\n    [innerHTML]=\"textToShow\"\n  ></span>\n\n  <button (click)=\"toggleShowMore()\" *ngIf=\"showMore\" tabindex=\"-1\">\n    <ng-container *ngIf=\"showHiddenText; else less\"\n      >&nbsp;... {{ 'configurator.button.less' | cxTranslate }}</ng-container\n    >\n\n    <ng-template #less>\n      &nbsp;... {{ 'configurator.button.more' | cxTranslate }}</ng-template\n    >\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { text: [{
                type: Input
            }], textSize: [{
                type: Input
            }], productName: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeQuantityComponent {
    constructor(config) {
        this.config = config;
        this.quantity = new UntypedFormControl(1);
        this.optionsChangeSub = new Subscription();
        this.quantityChangeSub = new Subscription();
        this.changeQuantity = new EventEmitter();
    }
    ngOnInit() {
        this.quantity.setValue(this.quantityOptions?.initialQuantity);
        this.optionsChangeSub.add(this.quantityOptions.disableQuantityActions$
            ?.pipe(distinct())
            .subscribe((disable) => {
            // stepper always emits an value when it gets enabled regardless, if the original value was changed.
            // so we subscribe to quantity change when stepper gets enabled and unsubscribe when it gets disabled
            // this way we will not get the unwanted emission on enabling the stepper.
            if (disable) {
                this.quantity.disable();
                this.quantityChangeSub.unsubscribe();
            }
            else {
                this.quantity.enable();
                this.quantityChangeSub.add(this.subscribeToQuantityChange());
            }
        }));
    }
    subscribeToQuantityChange() {
        return this.quantity.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.quantity ?? 0)), take(1))
            .subscribe(() => this.onChangeQuantity());
    }
    ngOnDestroy() {
        this.optionsChangeSub.unsubscribe();
        this.quantityChangeSub.unsubscribe();
    }
    onChangeQuantity() {
        this.changeQuantity.emit(this.quantity?.value);
    }
}
ConfiguratorAttributeQuantityComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityComponent, deps: [{ token: ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeQuantityComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: { quantityOptions: "quantityOptions" }, outputs: { changeQuantity: "changeQuantity" }, ngImport: i0, template: "<div class=\"cx-quantity\">\n  <label>{{ 'configurator.attribute.quantity' | cxTranslate }}</label>\n  <cx-item-counter\n    [allowZero]=\"quantityOptions.allowZero ?? false\"\n    [control]=\"quantity\"\n    [min]=\"quantityOptions.allowZero ? 0 : 1\"\n  ></cx-item-counter>\n</div>\n", dependencies: [{ kind: "component", type: i3.ItemCounterComponent, selector: "cx-item-counter", inputs: ["control", "min", "max", "step", "allowZero", "readonly"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-quantity', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-quantity\">\n  <label>{{ 'configurator.attribute.quantity' | cxTranslate }}</label>\n  <cx-item-counter\n    [allowZero]=\"quantityOptions.allowZero ?? false\"\n    [control]=\"quantity\"\n    [min]=\"quantityOptions.allowZero ? 0 : 1\"\n  ></cx-item-counter>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorUISettingsConfig }]; }, propDecorators: { quantityOptions: [{
                type: Input
            }], changeQuantity: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPriceComponent {
    constructor(directionService) {
        this.directionService = directionService;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
    removeSign(value, sign) {
        if (value) {
            return value.replace(sign, '');
        }
        return '';
    }
    addSign(value, sign, before) {
        if (value) {
            return before ? sign + value : value + sign;
        }
        return '';
    }
    compileFormattedValue(priceValue, formattedValue, isRTL) {
        if (priceValue > 0) {
            return this.addSign(formattedValue, '+', !isRTL);
        }
        else {
            if (isRTL) {
                const withoutSign = this.removeSign(formattedValue, '-');
                return this.addSign(withoutSign, '-', false);
            }
            return formattedValue ?? '';
        }
    }
    /**
     * Retrieves price.
     *
     * @return {string} - value price formula
     */
    get price() {
        if (this.formula.priceTotal) {
            return this.priceTotal;
        }
        else {
            return this.compileFormattedValue(this.formula.price?.value ?? 0, this.formula.price?.formattedValue, this.isRTLDirection());
        }
    }
    /**
     * Retrieves the total price.
     *
     * @return {string} - total price formula
     */
    get priceTotal() {
        return this.compileFormattedValue(this.formula.priceTotal?.value ?? 0, this.formula.priceTotal?.formattedValue, this.isRTLDirection());
    }
    /**
     * Verifies whether quantity with price should be displayed.
     *
     * @return {boolean} - 'true' if quantity and price should be displayed, otherwise 'false'
     */
    displayQuantityAndPrice() {
        const quantity = this.formula.quantity;
        return quantity ? this.formula.price?.value !== 0 && quantity >= 1 : false;
    }
    /**
     * Verifies whether only price should be displayed.
     *
     * @return {boolean} - 'true' if only price should be displayed, otherwise 'false'
     */
    displayPriceOnly() {
        const priceValue = this.formula.price?.value ?? 0;
        const priceTotalValue = this.formula.priceTotal?.value ?? 0;
        return ((priceValue !== 0 || priceTotalValue !== 0) &&
            !this.displayQuantityAndPrice());
    }
    /**
     * Verifies whether the price formula should be displayed.
     *
     * @return {boolean} - 'true' if price formula should be displayed, otherwise 'false'
     */
    displayFormula() {
        const displayFormula = (this.formula.quantity && this.formula.quantity !== 0) ||
            (this.formula.price && this.formula.price?.value !== 0) ||
            (this.formula.priceTotal && this.formula.priceTotal?.value !== 0);
        return displayFormula ?? false;
    }
    /**
     * Retrieves formula for quantity with price.
     *
     * @param {string} formattedQuantity- formatted quantity
     * @return {string} - price formula
     */
    quantityWithPrice(formattedQuantity) {
        return formattedQuantity + 'x(' + this.formula.price?.formattedValue + ')';
    }
    /**
     * Verifies whether the price is lighted up.
     *
     * @return {boolean} - 'true' if price should be lighted up, otherwise 'false'
     */
    isPriceLightedUp() {
        return this.formula.isLightedUp ?? false;
    }
    /**
     * Retrieves the styling for the corresponding element.
     *
     * @return {string} - corresponding style class
     */
    get styleClass() {
        let styleClass = 'cx-price';
        if (!this.isPriceLightedUp()) {
            styleClass += ' cx-greyed-out';
        }
        return styleClass;
    }
}
ConfiguratorPriceComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceComponent, deps: [{ token: i3.DirectionService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorPriceComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: { formula: "formula" }, ngImport: i0, template: "<ng-container *ngIf=\"displayFormula()\">\n  <ng-container *ngIf=\"displayPriceOnly()\">\n    <div\n      [ngClass]=\"styleClass\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ price }}\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"displayQuantityAndPrice()\">\n    <div\n      class=\"cx-quantity-price\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ quantityWithPrice(formula?.quantity | cxNumeric) }}\n    </div>\n    <div class=\"cx-price-total\">{{ priceTotal }}</div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.CxNumericPipe, name: "cxNumeric" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-price', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayFormula()\">\n  <ng-container *ngIf=\"displayPriceOnly()\">\n    <div\n      [ngClass]=\"styleClass\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ price }}\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"displayQuantityAndPrice()\">\n    <div\n      class=\"cx-quantity-price\"\n      [attr.aria-label]=\"'configurator.a11y.valueSurcharge' | cxTranslate\"\n    >\n      {{ quantityWithPrice(formula?.quantity | cxNumeric) }}\n    </div>\n    <div class=\"cx-price-total\">{{ priceTotal }}</div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i3.DirectionService }]; }, propDecorators: { formula: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeProductCardComponent extends ConfiguratorAttributeBaseComponent {
    constructor(productService, keyBoardFocus, translation) {
        super();
        this.productService = productService;
        this.keyBoardFocus = keyBoardFocus;
        this.translation = translation;
        this.loading$ = new BehaviorSubject(true);
        this.showDeselectionNotPossible = false;
        this.handleDeselect = new EventEmitter();
        this.handleQuantity = new EventEmitter();
        this.handleSelect = new EventEmitter();
        this.iconType = ICON_TYPE;
    }
    ngOnInit() {
        this.loading$.next(true);
        const productSystemId = this.productCardOptions.productBoundValue.productSystemId;
        this.product$ = this.productService
            .get(productSystemId ? productSystemId : '', ConfiguratorProductScope.CONFIGURATOR_PRODUCT_CARD)
            .pipe(map((respProduct) => {
            return respProduct
                ? respProduct
                : this.transformToProductType(this.productCardOptions.productBoundValue);
        }), tap(() => this.loading$.next(false)));
    }
    get showQuantity() {
        return ((this.productCardOptions.withQuantity &&
            this.productCardOptions.productBoundValue.selected &&
            this.productCardOptions.multiSelect) ??
            false);
    }
    //TODO(CXSPA-3392) for next major: turn ConfiguratorAttributeProductCardComponentOptions#attributeName
    //into a required field and get rid of this method, use this.productCardOptions.attributeName instead
    get attributeName() {
        const attributeName = this.productCardOptions.attributeName;
        return attributeName
            ? attributeName
            : this.productCardOptions.attributeId.toString();
    }
    get focusConfig() {
        const focusConfig = {
            key: this.createFocusId(this.productCardOptions.attributeId.toString(), this.productCardOptions.productBoundValue.valueCode),
        };
        return focusConfig;
    }
    onHandleSelect() {
        this.loading$.next(true);
        if (this.productCardOptions.hideRemoveButton &&
            this.productCardOptions.fallbackFocusId) {
            this.keyBoardFocus.set(this.productCardOptions.fallbackFocusId);
        }
        this.handleSelect.emit(this.productCardOptions.productBoundValue.valueCode);
    }
    onHandleDeselect() {
        {
            if (this.productCardOptions.productBoundValue.selected &&
                this.productCardOptions.hideRemoveButton) {
                this.showDeselectionNotPossibleMessage();
                return;
            }
            this.loading$.next(true);
            this.handleDeselect.emit(this.productCardOptions.productBoundValue.valueCode);
        }
    }
    onChangeQuantity(eventObject) {
        if (!eventObject) {
            this.onHandleDeselect();
        }
        else {
            this.onHandleQuantity(eventObject);
        }
    }
    /**
     * Verifies whether the product card refers to a selected value
     * @return {boolean} - Selected?
     */
    isProductCardSelected() {
        const isProductCardSelected = this.productCardOptions.productBoundValue &&
            this.productCardOptions.productBoundValue.selected &&
            !this.productCardOptions.singleDropdown;
        return isProductCardSelected ?? false;
    }
    /**
     * Checks if price needs to be displayed. This is the
     * case if either value price, quantity or value price total
     * are present
     * @return {boolean} - Price display?
     */
    hasPriceDisplay() {
        const productPrice = this.productCardOptions.productBoundValue.valuePrice ||
            this.productCardOptions.productBoundValue.quantity ||
            this.productCardOptions.productBoundValue.valuePriceTotal;
        return productPrice ? true : false;
    }
    /**
     * Extract corresponding price formula parameters
     *
     *  @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        if (!this.productCardOptions.multiSelect) {
            return {
                price: this.productCardOptions.productBoundValue.valuePrice,
                isLightedUp: this.productCardOptions.productBoundValue.selected,
            };
        }
        return {
            quantity: this.productCardOptions.productBoundValue.quantity,
            price: this.productCardOptions.productBoundValue.valuePrice,
            priceTotal: this.productCardOptions.productBoundValue.valuePriceTotal,
            isLightedUp: this.productCardOptions.productBoundValue.selected,
        };
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters() {
        const quantityFromOptions = this.productCardOptions.productBoundValue.quantity;
        const mergedLoading = this.productCardOptions.loading$
            ? combineLatest([this.loading$, this.productCardOptions.loading$]).pipe(map((values) => {
                return values[0] || values[1];
            }))
            : this.loading$;
        return {
            allowZero: !this.productCardOptions.hideRemoveButton,
            initialQuantity: quantityFromOptions ? quantityFromOptions : 0,
            disableQuantityActions$: mergedLoading,
        };
    }
    /**
     * Verifies whether the value code is defined.
     *
     * @param {string} valueCode - Value code
     * @return {boolean} - 'true' if the value code is defined, otherwise 'false'
     */
    isValueCodeDefined(valueCode) {
        return valueCode && valueCode !== Configurator.RetractValueCode
            ? true
            : false;
    }
    transformToProductType(value) {
        return {
            code: value?.productSystemId,
            description: value?.description,
            images: {},
            name: value?.valueDisplay,
        };
    }
    onHandleQuantity(quantity) {
        this.loading$.next(true);
        this.handleQuantity.emit({
            quantity,
            valueCode: this.productCardOptions.productBoundValue.valueCode,
        });
    }
    showDeselectionNotPossibleMessage() {
        this.showDeselectionNotPossible = true;
    }
    getAriaLabelSingleUnselected(product) {
        let translatedText = '';
        const index = this.productCardOptions.itemIndex + 1;
        if (this.isValueCodeDefined(this.productCardOptions?.productBoundValue?.valueCode)) {
            if (this.hasPriceDisplay() &&
                this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeUnselectedWithPrice', {
                    item: product.code,
                    attribute: this.productCardOptions?.attributeLabel,
                    itemIndex: index,
                    itemCount: this.productCardOptions.itemCount,
                    price: this.productCardOptions.productBoundValue.valuePriceTotal
                        ?.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeUnselected', {
                    item: product.code,
                    attribute: this.productCardOptions?.attributeLabel,
                    itemIndex: index,
                    itemCount: this.productCardOptions.itemCount,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.selectNoItemOfAttribute', {
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    getAriaLabelSingleSelected(product) {
        let translatedText = '';
        const index = this.productCardOptions.itemIndex + 1;
        if (this.hasPriceDisplay() &&
            this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
                price: this.productCardOptions.productBoundValue.valuePriceTotal
                    ?.formattedValue,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselect', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    getAriaLabelSingleSelectedNoButton(product) {
        let translatedText = '';
        const index = this.productCardOptions.itemIndex + 1;
        if (this.hasPriceDisplay() &&
            this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedWithPrice', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
                price: this.productCardOptions.productBoundValue.valuePriceTotal
                    ?.formattedValue,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelected', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    getAriaLabelMultiSelected(product) {
        let translatedText = '';
        const index = this.productCardOptions.itemIndex + 1;
        if (this.hasPriceDisplay() &&
            this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselectWithPrice', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
                price: this.productCardOptions.productBoundValue.valuePriceTotal
                    ?.formattedValue,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.itemOfAttributeSelectedPressToUnselect', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    getAriaLabelMultiUnselected(product) {
        let translatedText = '';
        const index = this.productCardOptions.itemIndex + 1;
        if (this.hasPriceDisplay() &&
            this.productCardOptions.productBoundValue.valuePrice?.value !== 0) {
            this.translation
                .translate('configurator.a11y.itemOfAttributeUnselectedWithPrice', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
                price: this.productCardOptions.productBoundValue.valuePriceTotal
                    ?.formattedValue,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.itemOfAttributeUnselected', {
                item: product.code,
                attribute: this.productCardOptions?.attributeLabel,
                itemIndex: index,
                itemCount: this.productCardOptions.itemCount,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
}
ConfiguratorAttributeProductCardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardComponent, deps: [{ token: i1$1.ProductService }, { token: i3.KeyboardFocusService }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeProductCardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: { productCardOptions: "productCardOptions" }, outputs: { handleDeselect: "handleDeselect", handleQuantity: "handleQuantity", handleSelect: "handleSelect" }, usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div\n    class=\"cx-product-card\"\n    [ngClass]=\"{\n      'cx-product-card-selected': isProductCardSelected()\n    }\"\n    [attr.aria-label]=\"\n      'configurator.a11y.itemOfAttribute'\n        | cxTranslate\n          : {\n              attribute: productCardOptions.attributeLabel\n            }\n    \"\n  >\n    <div class=\"cx-product-card-rows\">\n      <div class=\"cx-product-card-imgs\">\n        <cx-media\n          [container]=\"product.images?.PRIMARY\"\n          format=\"product\"\n          aria-hidden=\"true\"\n        ></cx-media>\n      </div>\n\n      <div class=\"cx-product-card-info\">\n        <div class=\"cx-product-card-name\">\n          <p>\n            {{ product.name }}\n          </p>\n        </div>\n        <div class=\"cx-product-card-code\" *ngIf=\"product.code\">\n          {{ 'configurator.attribute.id' | cxTranslate }}:\n          {{ product.code }}\n        </div>\n        <cx-configurator-show-more\n          *ngIf=\"product.description && product.code\"\n          [text]=\"product.description\"\n          [textSize]=\"45\"\n          [productName]=\"product.code\"\n        ></cx-configurator-show-more>\n      </div>\n    </div>\n\n    <div\n      class=\"cx-product-card-rows column\"\n      *ngIf=\"!productCardOptions.singleDropdown || hasPriceDisplay()\"\n    >\n      <div class=\"cx-product-card-quantity-price\">\n        <div class=\"cx-product-card-quantity\">\n          <cx-configurator-attribute-quantity\n            *ngIf=\"showQuantity\"\n            (changeQuantity)=\"onChangeQuantity($event)\"\n            [quantityOptions]=\"extractQuantityParameters()\"\n          ></cx-configurator-attribute-quantity>\n        </div>\n        <div class=\"cx-product-card-price\">\n          <cx-configurator-price\n            [formula]=\"extractPriceFormulaParameters()\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n      <div class=\"cx-product-card-action\">\n        <div\n          class=\"cx-product-card-action-btn\"\n          *ngIf=\"!productCardOptions?.singleDropdown\"\n        >\n          <ng-container *ngIf=\"productCardOptions?.multiSelect; else single\">\n            <button\n              *ngIf=\"\n                productCardOptions?.productBoundValue?.selected;\n                else select\n              \"\n              class=\"btn btn-secondary\"\n              (click)=\"onHandleDeselect()\"\n              [cxFocus]=\"focusConfig\"\n              [attr.aria-label]=\"getAriaLabelMultiSelected(product)\"\n              [attr.aria-describedby]=\"\n                createAttributeUiKey('label', attributeName)\n              \"\n            >\n              {{ 'configurator.button.remove' | cxTranslate }}\n            </button>\n\n            <ng-template #select>\n              <button\n                class=\"btn btn-primary\"\n                (click)=\"onHandleSelect()\"\n                [disabled]=\"\n                  productCardOptions.disableAllButtons || (loading$ | async)\n                \"\n                [cxFocus]=\"focusConfig\"\n                [attr.aria-label]=\"getAriaLabelMultiUnselected(product)\"\n                [attr.aria-describedby]=\"\n                  createAttributeUiKey('label', attributeName)\n                \"\n              >\n                {{ 'configurator.button.add' | cxTranslate }}\n              </button>\n            </ng-template>\n          </ng-container>\n\n          <ng-template #single>\n            <button\n              class=\"btn btn-primary\"\n              (click)=\"onHandleSelect()\"\n              [disabled]=\"\n                productCardOptions.disableAllButtons || (loading$ | async)\n              \"\n              *ngIf=\"\n                !productCardOptions?.productBoundValue?.selected;\n                else deselect\n              \"\n              [cxFocus]=\"focusConfig\"\n              [attr.aria-label]=\"getAriaLabelSingleUnselected(product)\"\n              [attr.aria-describedby]=\"\n                createAttributeUiKey('label', attributeName)\n              \"\n            >\n              {{ 'configurator.button.select' | cxTranslate }}\n            </button>\n            <ng-template #deselect>\n              <ng-container\n                *ngIf=\"\n                  isValueCodeDefined(\n                    productCardOptions?.productBoundValue?.valueCode\n                  )\n                \"\n              >\n                <button\n                  *ngIf=\"!productCardOptions?.hideRemoveButton\"\n                  class=\"btn btn-secondary\"\n                  (click)=\"onHandleDeselect()\"\n                  [disabled]=\"\n                    productCardOptions.hideRemoveButton || (loading$ | async)\n                  \"\n                  [cxFocus]=\"focusConfig\"\n                  [attr.aria-label]=\"getAriaLabelSingleSelected(product)\"\n                  [attr.aria-describedby]=\"\n                    createAttributeUiKey('label', attributeName)\n                  \"\n                >\n                  {{ 'configurator.button.deselect' | cxTranslate }}\n                </button>\n                <span\n                  *ngIf=\"productCardOptions?.hideRemoveButton\"\n                  class=\"cx-visually-hidden\"\n                  tabindex=\"0\"\n                >\n                  {{ getAriaLabelSingleSelectedNoButton(product) }}\n                </span>\n              </ng-container>\n            </ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n    <ng-container *ngIf=\"showDeselectionNotPossible\">\n      <div\n        class=\"cx-product-card-rows deselection-error-message\"\n        aria-live=\"assertive\"\n        aria-atomic=\"true\"\n        role=\"alert\"\n        id=\"{{ createAttributeUiKey('attribute-msg', attributeName) }}\"\n      >\n        <cx-icon class=\"deselection-error-symbol\" type=\"ERROR\"></cx-icon>\n        {{ 'configurator.attribute.deselectionNotPossible' | cxTranslate }}\n      </div>\n    </ng-container>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorShowMoreComponent, selector: "cx-configurator-show-more", inputs: ["text", "textSize", "productName"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-product-card', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div\n    class=\"cx-product-card\"\n    [ngClass]=\"{\n      'cx-product-card-selected': isProductCardSelected()\n    }\"\n    [attr.aria-label]=\"\n      'configurator.a11y.itemOfAttribute'\n        | cxTranslate\n          : {\n              attribute: productCardOptions.attributeLabel\n            }\n    \"\n  >\n    <div class=\"cx-product-card-rows\">\n      <div class=\"cx-product-card-imgs\">\n        <cx-media\n          [container]=\"product.images?.PRIMARY\"\n          format=\"product\"\n          aria-hidden=\"true\"\n        ></cx-media>\n      </div>\n\n      <div class=\"cx-product-card-info\">\n        <div class=\"cx-product-card-name\">\n          <p>\n            {{ product.name }}\n          </p>\n        </div>\n        <div class=\"cx-product-card-code\" *ngIf=\"product.code\">\n          {{ 'configurator.attribute.id' | cxTranslate }}:\n          {{ product.code }}\n        </div>\n        <cx-configurator-show-more\n          *ngIf=\"product.description && product.code\"\n          [text]=\"product.description\"\n          [textSize]=\"45\"\n          [productName]=\"product.code\"\n        ></cx-configurator-show-more>\n      </div>\n    </div>\n\n    <div\n      class=\"cx-product-card-rows column\"\n      *ngIf=\"!productCardOptions.singleDropdown || hasPriceDisplay()\"\n    >\n      <div class=\"cx-product-card-quantity-price\">\n        <div class=\"cx-product-card-quantity\">\n          <cx-configurator-attribute-quantity\n            *ngIf=\"showQuantity\"\n            (changeQuantity)=\"onChangeQuantity($event)\"\n            [quantityOptions]=\"extractQuantityParameters()\"\n          ></cx-configurator-attribute-quantity>\n        </div>\n        <div class=\"cx-product-card-price\">\n          <cx-configurator-price\n            [formula]=\"extractPriceFormulaParameters()\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n      <div class=\"cx-product-card-action\">\n        <div\n          class=\"cx-product-card-action-btn\"\n          *ngIf=\"!productCardOptions?.singleDropdown\"\n        >\n          <ng-container *ngIf=\"productCardOptions?.multiSelect; else single\">\n            <button\n              *ngIf=\"\n                productCardOptions?.productBoundValue?.selected;\n                else select\n              \"\n              class=\"btn btn-secondary\"\n              (click)=\"onHandleDeselect()\"\n              [cxFocus]=\"focusConfig\"\n              [attr.aria-label]=\"getAriaLabelMultiSelected(product)\"\n              [attr.aria-describedby]=\"\n                createAttributeUiKey('label', attributeName)\n              \"\n            >\n              {{ 'configurator.button.remove' | cxTranslate }}\n            </button>\n\n            <ng-template #select>\n              <button\n                class=\"btn btn-primary\"\n                (click)=\"onHandleSelect()\"\n                [disabled]=\"\n                  productCardOptions.disableAllButtons || (loading$ | async)\n                \"\n                [cxFocus]=\"focusConfig\"\n                [attr.aria-label]=\"getAriaLabelMultiUnselected(product)\"\n                [attr.aria-describedby]=\"\n                  createAttributeUiKey('label', attributeName)\n                \"\n              >\n                {{ 'configurator.button.add' | cxTranslate }}\n              </button>\n            </ng-template>\n          </ng-container>\n\n          <ng-template #single>\n            <button\n              class=\"btn btn-primary\"\n              (click)=\"onHandleSelect()\"\n              [disabled]=\"\n                productCardOptions.disableAllButtons || (loading$ | async)\n              \"\n              *ngIf=\"\n                !productCardOptions?.productBoundValue?.selected;\n                else deselect\n              \"\n              [cxFocus]=\"focusConfig\"\n              [attr.aria-label]=\"getAriaLabelSingleUnselected(product)\"\n              [attr.aria-describedby]=\"\n                createAttributeUiKey('label', attributeName)\n              \"\n            >\n              {{ 'configurator.button.select' | cxTranslate }}\n            </button>\n            <ng-template #deselect>\n              <ng-container\n                *ngIf=\"\n                  isValueCodeDefined(\n                    productCardOptions?.productBoundValue?.valueCode\n                  )\n                \"\n              >\n                <button\n                  *ngIf=\"!productCardOptions?.hideRemoveButton\"\n                  class=\"btn btn-secondary\"\n                  (click)=\"onHandleDeselect()\"\n                  [disabled]=\"\n                    productCardOptions.hideRemoveButton || (loading$ | async)\n                  \"\n                  [cxFocus]=\"focusConfig\"\n                  [attr.aria-label]=\"getAriaLabelSingleSelected(product)\"\n                  [attr.aria-describedby]=\"\n                    createAttributeUiKey('label', attributeName)\n                  \"\n                >\n                  {{ 'configurator.button.deselect' | cxTranslate }}\n                </button>\n                <span\n                  *ngIf=\"productCardOptions?.hideRemoveButton\"\n                  class=\"cx-visually-hidden\"\n                  tabindex=\"0\"\n                >\n                  {{ getAriaLabelSingleSelectedNoButton(product) }}\n                </span>\n              </ng-container>\n            </ng-template>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n    <ng-container *ngIf=\"showDeselectionNotPossible\">\n      <div\n        class=\"cx-product-card-rows deselection-error-message\"\n        aria-live=\"assertive\"\n        aria-atomic=\"true\"\n        role=\"alert\"\n        id=\"{{ createAttributeUiKey('attribute-msg', attributeName) }}\"\n      >\n        <cx-icon class=\"deselection-error-symbol\" type=\"ERROR\"></cx-icon>\n        {{ 'configurator.attribute.deselectionNotPossible' | cxTranslate }}\n      </div>\n    </ng-container>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ProductService }, { type: i3.KeyboardFocusService }, { type: i1$1.TranslationService }]; }, propDecorators: { productCardOptions: [{
                type: Input
            }], handleDeselect: [{
                type: Output
            }], handleQuantity: [{
                type: Output
            }], handleSelect: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPriceModule {
}
ConfiguratorPriceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorPriceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceModule, declarations: [ConfiguratorPriceComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorPriceComponent] });
ConfiguratorPriceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceModule, imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorPriceComponent],
                    exports: [ConfiguratorPriceComponent],
                    imports: [CommonModule, I18nModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorShowMoreModule {
}
ConfiguratorShowMoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorShowMoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorShowMoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorShowMoreModule, declarations: [ConfiguratorShowMoreComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorShowMoreComponent] });
ConfiguratorShowMoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorShowMoreModule, imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorShowMoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    declarations: [ConfiguratorShowMoreComponent],
                    exports: [ConfiguratorShowMoreComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultConfiguratorUISettingsConfig = {
    productConfigurator: {
        updateDebounceTime: {
            quantity: 750,
            input: 500,
        },
        addRetractOption: false,
        enableNavigationToConflict: false,
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeQuantityModule {
}
ConfiguratorAttributeQuantityModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeQuantityModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityModule, declarations: [ConfiguratorAttributeQuantityComponent], imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule], exports: [ConfiguratorAttributeQuantityComponent] });
ConfiguratorAttributeQuantityModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityModule, providers: [provideDefaultConfig(defaultConfiguratorUISettingsConfig)], imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorAttributeQuantityComponent],
                    exports: [ConfiguratorAttributeQuantityComponent],
                    imports: [CommonModule, I18nModule, ItemCounterModule, KeyboardFocusModule],
                    providers: [provideDefaultConfig(defaultConfiguratorUISettingsConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeProductCardModule {
}
ConfiguratorAttributeProductCardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeProductCardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardModule, declarations: [ConfiguratorAttributeProductCardComponent], imports: [CommonModule,
        ConfiguratorShowMoreModule,
        ConfiguratorAttributeQuantityModule,
        I18nModule,
        RouterModule,
        UrlModule,
        FormsModule,
        ReactiveFormsModule,
        MediaModule,
        ConfiguratorPriceModule,
        KeyboardFocusModule,
        IconModule], exports: [ConfiguratorAttributeProductCardComponent] });
ConfiguratorAttributeProductCardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardModule, imports: [CommonModule,
        ConfiguratorShowMoreModule,
        ConfiguratorAttributeQuantityModule,
        I18nModule,
        RouterModule,
        UrlModule,
        FormsModule,
        ReactiveFormsModule,
        MediaModule,
        ConfiguratorPriceModule,
        KeyboardFocusModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeProductCardModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorAttributeProductCardComponent],
                    exports: [ConfiguratorAttributeProductCardComponent],
                    imports: [
                        CommonModule,
                        ConfiguratorShowMoreModule,
                        ConfiguratorAttributeQuantityModule,
                        I18nModule,
                        RouterModule,
                        UrlModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MediaModule,
                        ConfiguratorPriceModule,
                        KeyboardFocusModule,
                        IconModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeQuantityService {
    /**
     * Checks if the interaction with the quantity control needs
     * to be disabled
     * @param {any} value Selected value
     * @returns {boolean} Quantity actions disabled?
     */
    disableQuantityActions(value) {
        return !value || value === '0';
    }
    /**
     * Checks if the interaction with the quantity control needs for multiselection components
     * to be disabled
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @returns {boolean} Quantity actions disabled?
     */
    disableQuantityActionsMultiSelection(attribute) {
        return (attribute.dataType ===
            Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL &&
            (!attribute.values ||
                !attribute.values.find((value) => value.selected) ||
                attribute.quantity === 0));
    }
    /**
     * Checks if it is supposed to render a quantity control on attribute level
     *
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @return {boolean} - Display quantity picker on attribute level?
     */
    withQuantityOnAttributeLevel(attribute) {
        return (attribute.dataType ===
            Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL);
    }
    /**
     * Checks if an attribute needs to be equipped with the option to select
     * a quantity
     * @param {Configurator.DataType} dataType Attribute data type
     * @param {Configurator.UiType} uiType Attribute ui type, refers to how an attribute must be rendered
     * @returns  {boolean} Render a quantity component?
     */
    withQuantity(dataType, uiType) {
        switch (uiType) {
            case Configurator.UiType.DROPDOWN_PRODUCT:
            case Configurator.UiType.DROPDOWN:
            case Configurator.UiType.RADIOBUTTON_PRODUCT:
            case Configurator.UiType.RADIOBUTTON:
                return (dataType === Configurator.DataType.USER_SELECTION_QTY_ATTRIBUTE_LEVEL);
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOXLIST_PRODUCT:
                return (dataType === Configurator.DataType.USER_SELECTION_QTY_VALUE_LEVEL);
            default:
                return false;
        }
    }
    /**
     * Checks if the zero quantity is allowed
     *
     * @param {Configurator.Attribute} attribute Configurator Attribute
     * @return {boolean} - true when zero quantity is allowed
     */
    allowZeroValueQuantity(attribute) {
        const selectedValues = attribute.values
            ? attribute.values.filter((value) => value.selected).length
            : 0;
        if (attribute.required && selectedValues < 2) {
            return false;
        }
        return true;
    }
}
ConfiguratorAttributeQuantityService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorAttributeQuantityService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeQuantityService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line @angular-eslint/directive-class-suffix
class ConfiguratorAttributeSingleSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    constructor(quantityService, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService) {
        super();
        this.quantityService = quantityService;
        this.translation = translation;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.loading$ = new BehaviorSubject(false);
        this.showRequiredErrorMessage$ = of(false);
        this.attribute = attributeComponentContext.attribute;
        this.ownerKey = attributeComponentContext.owner.key;
        this.ownerType = attributeComponentContext.owner.type;
        this.language = attributeComponentContext.language;
        this.expMode = attributeComponentContext.expMode;
        if (this.configuratorStorefrontUtilsService) {
            this.showRequiredErrorMessage$ = this.configuratorStorefrontUtilsService
                .isCartEntryOrGroupVisited(attributeComponentContext.owner, attributeComponentContext.group.id)
                .pipe(map((result) => (result &&
                this.isRequiredErrorMsg(this.attribute) &&
                this.isDropDown(this.attribute) &&
                this.isNoValueSelected(this.attribute)) ||
                false));
        }
    }
    /**
     * Checks if we are supposed to render a quantity control, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker?
     */
    get withQuantity() {
        return this.quantityService.withQuantity(this.attribute.dataType ?? Configurator.DataType.NOT_IMPLEMENTED, this.attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED);
    }
    /**
     * Checks if quantity control should be disabled
     *
     * @return {boolean} - Disable quantity picker?
     */
    get disableQuantityActions() {
        return this.quantityService.disableQuantityActions(this.attribute.selectedSingleValue);
    }
    onSelect(value) {
        this.loading$.next(true);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            selectedSingleValue: value,
        }, Configurator.UpdateType.ATTRIBUTE);
    }
    onSelectAdditionalValue(event) {
        const userInput = event.changedAttribute.userInput;
        if (userInput) {
            this.loading$.next(true);
            event.changedAttribute.selectedSingleValue = userInput;
            this.configuratorCommonsService.updateConfiguration(event.ownerKey, event.changedAttribute, Configurator.UpdateType.ATTRIBUTE);
        }
    }
    onHandleQuantity(quantity) {
        this.loading$.next(true);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            quantity,
        }, Configurator.UpdateType.ATTRIBUTE_QUANTITY);
    }
    onChangeQuantity(eventObject, form) {
        if (!eventObject) {
            if (form) {
                form.setValue('0');
            }
            this.onSelect('');
        }
        else {
            this.onHandleQuantity(eventObject);
        }
    }
    getInitialQuantity(form) {
        const quantity = this.attribute.quantity ?? 0;
        if (form) {
            return form.value !== '0' ? quantity : 0;
        }
        else {
            return this.attribute.selectedSingleValue ? quantity : 0;
        }
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {FormControl} form - Form control
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(form) {
        const initialQuantity = this.getInitialQuantity(form);
        const disableQuantityActions$ = this.loading$.pipe(map((loading) => {
            return loading || this.disableQuantityActions;
        }));
        return {
            allowZero: !this.attribute.required,
            initialQuantity: initialQuantity,
            disableQuantityActions$: disableQuantityActions$,
        };
    }
    /**
     * Extract corresponding price formula parameters.
     * For the single-selection attribute types the complete price formula should be displayed at the attribute level.
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: this.attribute.quantity,
            price: this.getSelectedValuePrice(),
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the single-selection attribute types only value price should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        return {
            price: value?.valuePrice,
            isLightedUp: value ? value.selected : false,
        };
    }
    getSelectedValuePrice() {
        return this.attribute.values?.find((value) => value.selected)?.valuePrice;
    }
    get isAdditionalValueNumeric() {
        return (this.isWithAdditionalValues(this.attribute) &&
            this.attribute.validationType === Configurator.ValidationType.NUMERIC);
    }
    get isAdditionalValueAlphaNumeric() {
        return (this.isWithAdditionalValues(this.attribute) &&
            this.attribute.validationType === Configurator.ValidationType.NONE);
    }
    getAriaLabel(value, attribute) {
        const ariaLabel = this.getAriaLabelWithoutAdditionalValue(value, attribute);
        if (this.isWithAdditionalValues(this.attribute)) {
            const ariaLabelWithAdditionalValue = this.getAdditionalValueAriaLabel();
            return ariaLabel + ' ' + ariaLabelWithAdditionalValue;
        }
        else {
            return ariaLabel;
        }
    }
    getAdditionalValueAriaLabel() {
        let ariaLabel = '';
        this.translation
            .translate('configurator.a11y.additionalValue')
            .pipe(take(1))
            .subscribe((text) => (ariaLabel = text));
        return ariaLabel;
    }
    getAriaLabelWithoutAdditionalValue(value, attribute) {
        let ariaLabel = '';
        if (value.valuePrice && value.valuePrice?.value !== 0) {
            if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.selectedValueOfAttributeFullWithPrice', {
                    value: value.valueDisplay,
                    attribute: attribute.label,
                    price: value.valuePriceTotal.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (ariaLabel = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.selectedValueOfAttributeFullWithPrice', {
                    value: value.valueDisplay,
                    attribute: attribute.label,
                    price: value.valuePrice.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (ariaLabel = text));
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.selectedValueOfAttributeFull', {
                value: value.valueDisplay,
                attribute: attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (ariaLabel = text));
        }
        return ariaLabel;
    }
}
ConfiguratorAttributeSingleSelectionBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBaseComponent, deps: [{ token: ConfiguratorAttributeQuantityService }, { token: i1$1.TranslationService }, { token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }, { token: ConfiguratorStorefrontUtilsService, optional: true }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeSingleSelectionBaseComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeSingleSelectionBaseComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBaseComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeQuantityService }, { type: i1$1.TranslationService }, { type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }, { type: ConfiguratorStorefrontUtilsService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line @angular-eslint/directive-class-suffix
class ConfiguratorAttributeMultiSelectionBaseComponent extends ConfiguratorAttributeBaseComponent {
    constructor(quantityService, attributeComponentContext, configuratorCommonsService) {
        super();
        this.quantityService = quantityService;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.loading$ = new BehaviorSubject(false);
        this.attribute = attributeComponentContext.attribute;
        this.ownerKey = attributeComponentContext.owner.key;
        this.expMode = attributeComponentContext.expMode;
    }
    /**
     * Checks if we are supposed to render a quantity control on attribute level, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker on attribute level?
     */
    get withQuantityOnAttributeLevel() {
        return this.quantityService.withQuantityOnAttributeLevel(this.attribute);
    }
    /**
     * Checks if we are supposed to render a quantity control, which
     * can be derived from the attribute meta data
     *
     * @return {boolean} - Display quantity picker?
     */
    get withQuantity() {
        return this.quantityService.withQuantity(this.attribute.dataType ?? Configurator.DataType.NOT_IMPLEMENTED, this.attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED);
    }
    /**
     * Checks if quantity control should be disabled
     *
     * @return {boolean} - Disable quantity picker?
     */
    get disableQuantityActions() {
        return this.quantityService.disableQuantityActionsMultiSelection(this.attribute);
    }
    /**
     *  Extract corresponding quantity parameters
     *
     * @param {number} initialQuantity - Initial quantity
     * @param {boolean} allowZero - Allow zero
     * @return {ConfiguratorAttributeQuantityComponentOptions} - New quantity options
     */
    extractQuantityParameters(initialQuantity, allowZero) {
        const disableQuantityActions$ = this.loading$.pipe(map((loading) => {
            return loading || this.disableQuantityActions;
        }));
        return {
            allowZero: allowZero ?? !this.attribute.required,
            initialQuantity: initialQuantity,
            disableQuantityActions$: disableQuantityActions$,
        };
    }
    onHandleAttributeQuantity(quantity) {
        this.loading$.next(true);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            quantity,
        }, Configurator.UpdateType.ATTRIBUTE_QUANTITY);
    }
    /**
     * Extract corresponding price formula parameters.
     * For the multi-selection attribute types only total price of the attribute should be displayed at the attribute level.
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: 0,
            price: {
                value: 0,
                currencyIso: '',
            },
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the multi-selection attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        return {
            quantity: value.quantity,
            price: value.valuePrice,
            priceTotal: value.valuePriceTotal,
            isLightedUp: value.selected,
        };
    }
}
ConfiguratorAttributeMultiSelectionBaseComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBaseComponent, deps: [{ token: ConfiguratorAttributeQuantityService }, { token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeMultiSelectionBaseComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeMultiSelectionBaseComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBaseComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeQuantityService }, { type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCheckBoxListComponent extends ConfiguratorAttributeMultiSelectionBaseComponent {
    constructor(configUtilsService, quantityService, attributeComponentContext, configuratorCommonsService) {
        super(quantityService, attributeComponentContext, configuratorCommonsService);
        this.configUtilsService = configUtilsService;
        this.quantityService = quantityService;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.attributeCheckBoxForms = new Array();
        this.logger = inject(LoggerService);
        this.group = attributeComponentContext.group.id;
    }
    ngOnInit() {
        const disabled = !this.allowZeroValueQuantity;
        for (const value of this.attribute.values ?? []) {
            let attributeCheckBoxForm;
            if (value.selected) {
                attributeCheckBoxForm = new UntypedFormControl({
                    value: true,
                    disabled: disabled,
                });
            }
            else {
                attributeCheckBoxForm = new UntypedFormControl(false);
            }
            this.attributeCheckBoxForms.push(attributeCheckBoxForm);
        }
    }
    get allowZeroValueQuantity() {
        return this.quantityService.allowZeroValueQuantity(this.attribute);
    }
    onSelect() {
        const selectedValues = this.configUtilsService.assembleValuesForMultiSelectAttributes(this.attributeCheckBoxForms, this.attribute);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            values: selectedValues,
        }, Configurator.UpdateType.ATTRIBUTE);
    }
    onChangeValueQuantity(eventObject, valueCode, formIndex) {
        if (eventObject === 0) {
            this.attributeCheckBoxForms[formIndex].setValue(false);
            this.onSelect();
            return;
        }
        const value = this.configUtilsService
            .assembleValuesForMultiSelectAttributes(this.attributeCheckBoxForms, this.attribute)
            .find((item) => item.valueCode === valueCode);
        if (!value) {
            if (isDevMode()) {
                this.logger.warn('no value for event:', eventObject);
            }
            return;
        }
        value.quantity = eventObject;
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            values: [value],
        }, Configurator.UpdateType.VALUE_QUANTITY);
    }
    onChangeQuantity(eventObject) {
        if (!eventObject) {
            this.attributeCheckBoxForms.forEach((_, index) => this.attributeCheckBoxForms[index].setValue(false));
            this.onSelect();
        }
        else {
            this.onHandleAttributeQuantity(eventObject);
        }
    }
}
ConfiguratorAttributeCheckBoxListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckBoxListComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorAttributeQuantityService }, { token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeCheckBoxListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeCheckBoxListComponent, selector: "cx-configurator-attribute-checkbox-list", usesInheritance: true, ngImport: i0, template: "<fieldset>\n  <legend style=\"display: none\">{{ attribute.label }}</legend>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div\n      *ngIf=\"withQuantityOnAttributeLevel\"\n      class=\"cx-attribute-level-quantity-price\"\n    >\n      <cx-configurator-attribute-quantity\n        (changeQuantity)=\"onChangeQuantity($event)\"\n        [quantityOptions]=\"\n          extractQuantityParameters(attribute.quantity, !attribute.required)\n        \"\n      ></cx-configurator-attribute-quantity>\n      <cx-configurator-price\n        [formula]=\"extractPriceFormulaParameters()\"\n      ></cx-configurator-price>\n    </div>\n    <ng-container *ngFor=\"let value of attribute.values; let i = index\">\n      <div class=\"form-check\">\n        <div class=\"cx-value-label-pair\">\n          <input\n            id=\"{{\n              createAttributeValueIdForConfigurator(attribute, value.valueCode)\n            }}\"\n            type=\"checkbox\"\n            class=\"form-check-input\"\n            [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n            [value]=\"value.valueCode\"\n            (change)=\"onSelect()\"\n            [formControl]=\"attributeCheckBoxForms[i]\"\n            name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n            [attr.aria-label]=\"\n              value.valuePrice && value.valuePrice?.value !== 0\n                ? value.valuePriceTotal && value.valuePriceTotal?.value !== 0\n                  ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n                    | cxTranslate\n                      : {\n                          value: value.valueDisplay,\n                          attribute: attribute.label,\n                          price: value.valuePriceTotal.formattedValue\n                        })\n                  : ('configurator.a11y.valueOfAttributeFullWithPrice'\n                    | cxTranslate\n                      : {\n                          value: value.valueDisplay,\n                          attribute: attribute.label,\n                          price: value.valuePrice.formattedValue\n                        })\n                : ('configurator.a11y.valueOfAttributeFull'\n                  | cxTranslate\n                    : { value: value.valueDisplay, attribute: attribute.label })\n            \"\n            [attr.aria-describedby]=\"\n              createAttributeUiKey('label', attribute.name)\n            \"\n          />\n          <label\n            id=\"{{\n              createValueUiKey('label', attribute.name, value.valueCode)\n            }}\"\n            for=\"{{\n              createAttributeValueIdForConfigurator(attribute, value.valueCode)\n            }}\"\n            aria-hidden=\"true\"\n            class=\"cx-configurator-attribute-value-label form-check-label\"\n            >{{ getLabel(expMode, value.valueDisplay, value.valueCode) }}</label\n          >\n        </div>\n        <div class=\"cx-value-price\">\n          <cx-configurator-price\n            [formula]=\"extractValuePriceFormulaParameters(value)\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n      <cx-configurator-attribute-quantity\n        *ngIf=\"value.selected && withQuantity && !withQuantityOnAttributeLevel\"\n        (changeQuantity)=\"onChangeValueQuantity($event, value.valueCode, i)\"\n        [quantityOptions]=\"\n          extractQuantityParameters(value.quantity, allowZeroValueQuantity)\n        \"\n      ></cx-configurator-attribute-quantity>\n    </ng-container>\n  </div>\n</fieldset>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckBoxListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-checkbox-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<fieldset>\n  <legend style=\"display: none\">{{ attribute.label }}</legend>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div\n      *ngIf=\"withQuantityOnAttributeLevel\"\n      class=\"cx-attribute-level-quantity-price\"\n    >\n      <cx-configurator-attribute-quantity\n        (changeQuantity)=\"onChangeQuantity($event)\"\n        [quantityOptions]=\"\n          extractQuantityParameters(attribute.quantity, !attribute.required)\n        \"\n      ></cx-configurator-attribute-quantity>\n      <cx-configurator-price\n        [formula]=\"extractPriceFormulaParameters()\"\n      ></cx-configurator-price>\n    </div>\n    <ng-container *ngFor=\"let value of attribute.values; let i = index\">\n      <div class=\"form-check\">\n        <div class=\"cx-value-label-pair\">\n          <input\n            id=\"{{\n              createAttributeValueIdForConfigurator(attribute, value.valueCode)\n            }}\"\n            type=\"checkbox\"\n            class=\"form-check-input\"\n            [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n            [value]=\"value.valueCode\"\n            (change)=\"onSelect()\"\n            [formControl]=\"attributeCheckBoxForms[i]\"\n            name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n            [attr.aria-label]=\"\n              value.valuePrice && value.valuePrice?.value !== 0\n                ? value.valuePriceTotal && value.valuePriceTotal?.value !== 0\n                  ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n                    | cxTranslate\n                      : {\n                          value: value.valueDisplay,\n                          attribute: attribute.label,\n                          price: value.valuePriceTotal.formattedValue\n                        })\n                  : ('configurator.a11y.valueOfAttributeFullWithPrice'\n                    | cxTranslate\n                      : {\n                          value: value.valueDisplay,\n                          attribute: attribute.label,\n                          price: value.valuePrice.formattedValue\n                        })\n                : ('configurator.a11y.valueOfAttributeFull'\n                  | cxTranslate\n                    : { value: value.valueDisplay, attribute: attribute.label })\n            \"\n            [attr.aria-describedby]=\"\n              createAttributeUiKey('label', attribute.name)\n            \"\n          />\n          <label\n            id=\"{{\n              createValueUiKey('label', attribute.name, value.valueCode)\n            }}\"\n            for=\"{{\n              createAttributeValueIdForConfigurator(attribute, value.valueCode)\n            }}\"\n            aria-hidden=\"true\"\n            class=\"cx-configurator-attribute-value-label form-check-label\"\n            >{{ getLabel(expMode, value.valueDisplay, value.valueCode) }}</label\n          >\n        </div>\n        <div class=\"cx-value-price\">\n          <cx-configurator-price\n            [formula]=\"extractValuePriceFormulaParameters(value)\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n      <cx-configurator-attribute-quantity\n        *ngIf=\"value.selected && withQuantity && !withQuantityOnAttributeLevel\"\n        (changeQuantity)=\"onChangeValueQuantity($event, value.valueCode, i)\"\n        [quantityOptions]=\"\n          extractQuantityParameters(value.quantity, allowZeroValueQuantity)\n        \"\n      ></cx-configurator-attribute-quantity>\n    </ng-container>\n  </div>\n</fieldset>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorAttributeQuantityService }, { type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCheckboxListModule {
}
ConfiguratorAttributeCheckboxListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeCheckboxListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, declarations: [ConfiguratorAttributeCheckBoxListComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeCheckBoxListComponent] });
ConfiguratorAttributeCheckboxListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_checkBoxList: ConfiguratorAttributeCheckBoxListComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_checkBoxList: ConfiguratorAttributeCheckBoxListComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeCheckBoxListComponent],
                    exports: [ConfiguratorAttributeCheckBoxListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCheckBoxComponent extends ConfiguratorAttributeBaseComponent {
    constructor(attributeComponentContext, configuratorCommonsService) {
        super();
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.attributeCheckBoxForm = new UntypedFormControl('');
        this.attribute = attributeComponentContext.attribute;
        this.group = attributeComponentContext.group.id;
        this.ownerKey = attributeComponentContext.owner.key;
        this.expMode = attributeComponentContext.expMode;
    }
    ngOnInit() {
        this.attributeCheckBoxForm.setValue(this.attribute.selectedSingleValue);
        this.attributeValue = this.getValueFromAttribute();
    }
    /**
     * Fired when a check box has been selected i.e. when a value has been set
     */
    onSelect() {
        const selectedValues = this.assembleSingleValue();
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            values: selectedValues,
        }, Configurator.UpdateType.ATTRIBUTE);
    }
    getValueFromAttribute() {
        //we can assume that for this component, value is always present
        //otherwise attribute type would not be correct,
        //could only happen in exceptional cases, on wrong modifications e.g.
        return this.attribute.values ? this.attribute.values[0] : { valueCode: '' };
    }
    assembleSingleValue() {
        const localAssembledValues = [];
        const value = this.getValueFromAttribute();
        const localAttributeValue = {
            valueCode: value.valueCode,
        };
        localAttributeValue.name = value.name;
        localAttributeValue.selected = this.attributeCheckBoxForm.value;
        localAssembledValues.push(localAttributeValue);
        return localAssembledValues;
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the multi-selection attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        return {
            quantity: value.quantity,
            price: value.valuePrice,
            priceTotal: value.valuePriceTotal,
            isLightedUp: value.selected,
        };
    }
}
ConfiguratorAttributeCheckBoxComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckBoxComponent, deps: [{ token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeCheckBoxComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeCheckBoxComponent, selector: "cx-configurator-attribute-checkbox", usesInheritance: true, ngImport: i0, template: "<ng-container>\n  <fieldset>\n    <legend style=\"display: none\">{{ attribute.label }}</legend>\n    <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n      <div class=\"form-check\">\n        <div class=\"cx-value-label-pair\">\n          <input\n            id=\"{{\n              createAttributeValueIdForConfigurator(\n                attribute,\n                attributeValue.valueCode\n              )\n            }}\"\n            type=\"checkbox\"\n            class=\"form-check-input\"\n            [value]=\"attributeValue.valueCode\"\n            [cxFocus]=\"{\n              key: attribute.name + '-' + attributeValue.name\n            }\"\n            (change)=\"onSelect()\"\n            [formControl]=\"attributeCheckBoxForm\"\n            name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n            [attr.aria-label]=\"\n              attributeValue.valuePrice &&\n              attributeValue.valuePrice?.value !== 0\n                ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n                  | cxTranslate\n                    : {\n                        value: attributeValue.valueDisplay,\n                        attribute: attribute.label,\n                        price: attributeValue.valuePrice.formattedValue\n                      })\n                : ('configurator.a11y.valueOfAttributeFull'\n                  | cxTranslate\n                    : {\n                        value: attributeValue.valueDisplay,\n                        attribute: attribute.label\n                      })\n            \"\n            [attr.aria-describedby]=\"\n              createAttributeUiKey('label', attribute.name) +\n              ' ' +\n              createAttributeUiKey('attribute-msg', attribute.name)\n            \"\n          />\n          <label\n            id=\"{{\n              createValueUiKey(\n                'label',\n                attribute.name,\n                attributeValue.valueCode\n              )\n            }}\"\n            for=\"{{\n              createAttributeValueIdForConfigurator(\n                attribute,\n                attributeValue.valueCode\n              )\n            }}\"\n            aria-hidden=\"true\"\n            class=\"form-check-label\"\n            >{{\n              getLabel(\n                expMode,\n                attributeValue.valueDisplay,\n                attributeValue.valueCode\n              )\n            }}</label\n          >\n        </div>\n        <div class=\"cx-value-price\">\n          <cx-configurator-price\n            [formula]=\"extractValuePriceFormulaParameters(attributeValue)\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n    </div>\n  </fieldset>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckBoxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-checkbox', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container>\n  <fieldset>\n    <legend style=\"display: none\">{{ attribute.label }}</legend>\n    <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n      <div class=\"form-check\">\n        <div class=\"cx-value-label-pair\">\n          <input\n            id=\"{{\n              createAttributeValueIdForConfigurator(\n                attribute,\n                attributeValue.valueCode\n              )\n            }}\"\n            type=\"checkbox\"\n            class=\"form-check-input\"\n            [value]=\"attributeValue.valueCode\"\n            [cxFocus]=\"{\n              key: attribute.name + '-' + attributeValue.name\n            }\"\n            (change)=\"onSelect()\"\n            [formControl]=\"attributeCheckBoxForm\"\n            name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n            [attr.aria-label]=\"\n              attributeValue.valuePrice &&\n              attributeValue.valuePrice?.value !== 0\n                ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n                  | cxTranslate\n                    : {\n                        value: attributeValue.valueDisplay,\n                        attribute: attribute.label,\n                        price: attributeValue.valuePrice.formattedValue\n                      })\n                : ('configurator.a11y.valueOfAttributeFull'\n                  | cxTranslate\n                    : {\n                        value: attributeValue.valueDisplay,\n                        attribute: attribute.label\n                      })\n            \"\n            [attr.aria-describedby]=\"\n              createAttributeUiKey('label', attribute.name) +\n              ' ' +\n              createAttributeUiKey('attribute-msg', attribute.name)\n            \"\n          />\n          <label\n            id=\"{{\n              createValueUiKey(\n                'label',\n                attribute.name,\n                attributeValue.valueCode\n              )\n            }}\"\n            for=\"{{\n              createAttributeValueIdForConfigurator(\n                attribute,\n                attributeValue.valueCode\n              )\n            }}\"\n            aria-hidden=\"true\"\n            class=\"form-check-label\"\n            >{{\n              getLabel(\n                expMode,\n                attributeValue.valueDisplay,\n                attributeValue.valueCode\n              )\n            }}</label\n          >\n        </div>\n        <div class=\"cx-value-price\">\n          <cx-configurator-price\n            [formula]=\"extractValuePriceFormulaParameters(attributeValue)\"\n          ></cx-configurator-price>\n        </div>\n      </div>\n    </div>\n  </fieldset>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCheckboxModule {
}
ConfiguratorAttributeCheckboxModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeCheckboxModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxModule, declarations: [ConfiguratorAttributeCheckBoxComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeCheckBoxComponent] });
ConfiguratorAttributeCheckboxModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_checkBox: ConfiguratorAttributeCheckBoxComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        ConfiguratorPriceModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_checkBox: ConfiguratorAttributeCheckBoxComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeCheckBoxComponent],
                    exports: [ConfiguratorAttributeCheckBoxComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeInputFieldComponent extends ConfiguratorAttributeBaseComponent {
    // TODO (CXSPA-3392): make ConfiguratorStorefrontUtilsService a required dependency
    constructor(config, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService) {
        super();
        this.config = config;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.attributeInputForm = new UntypedFormControl('');
        this.showRequiredErrorMessage$ = of(false);
        /**
         * In case no config is injected, or when the debounce time is not configured at all,
         * this value will be used as fallback.
         */
        this.FALLBACK_DEBOUNCE_TIME = 500;
        this.attribute = attributeComponentContext.attribute;
        this.group = attributeComponentContext.group.id;
        this.owner = attributeComponentContext.owner;
        this.ownerKey = attributeComponentContext.owner.key;
        this.ownerType = attributeComponentContext.owner.type;
        if (this.configuratorStorefrontUtilsService) {
            this.showRequiredErrorMessage$ = this.configuratorStorefrontUtilsService
                .isCartEntryOrGroupVisited(this.owner, this.group)
                .pipe(map((result) => result
                ? this.isRequiredErrorMsg(this.attribute) &&
                    this.isUserInput(this.attribute)
                : false));
        }
    }
    ngOnInit() {
        this.attributeInputForm.setValue(this.attribute.userInput);
        if (this.ownerType === CommonConfigurator.OwnerType.CART_ENTRY &&
            this.attribute.required &&
            this.attribute.incomplete &&
            !this.attributeInputForm.value) {
            this.attributeInputForm.markAsTouched();
        }
        this.sub = this.attributeInputForm.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.input ??
            this.FALLBACK_DEBOUNCE_TIME)))
            .subscribe(() => this.onChange());
    }
    onChange() {
        if (!this.attributeInputForm.invalid) {
            this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
                ...this.attribute,
                userInput: this.attributeInputForm.value,
                selectedSingleValue: this.attributeInputForm.value,
            }, Configurator.UpdateType.ATTRIBUTE);
        }
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
    /**
     * Verifies if the user input has a non-blank value.
     * @returns {boolean} - 'True' if the user input is undefined, empty or contains only blanks, otherwise 'false'.
     */
    get isUserInputEmpty() {
        return (!this.attribute.userInput || this.attribute.userInput.trim().length === 0);
    }
    /**
     * Checks if the component needs to be marked as required.
     * This is never the case if it is used as sub component for an attribute type which allows an additional value
     * @returns Required?
     */
    get isRequired() {
        return this.isUserInput(this.attribute)
            ? this.attribute.required ?? false
            : false;
    }
}
ConfiguratorAttributeInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldComponent, deps: [{ token: ConfiguratorUISettingsConfig }, { token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }, { token: ConfiguratorStorefrontUtilsService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeInputFieldComponent, selector: "cx-configurator-attribute-input-field", usesInheritance: true, ngImport: i0, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      [required]=\"isRequired\"\n      class=\"form-control\"\n      attr.required=\"{{ attribute.required }}\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"\n        isUserInputEmpty\n          ? ('configurator.a11y.valueOfAttributeBlank'\n            | cxTranslate\n              : {\n                  attribute: attribute.label\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute.userInput,\n                  attribute: attribute.label\n                })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [class.ng-invalid]=\"isRequired && isUserInputEmpty\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"\n        isUserInputEmpty\n          ? ('configurator.a11y.valueOfAttributeBlank'\n            | cxTranslate\n              : {\n                  attribute: attribute.label\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute.userInput,\n                  attribute: attribute.label\n                })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i8.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i4$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-input-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      [required]=\"isRequired\"\n      class=\"form-control\"\n      attr.required=\"{{ attribute.required }}\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"\n        isUserInputEmpty\n          ? ('configurator.a11y.valueOfAttributeBlank'\n            | cxTranslate\n              : {\n                  attribute: attribute.label\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute.userInput,\n                  attribute: attribute.label\n                })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [class.ng-invalid]=\"isRequired && isUserInputEmpty\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"\n        isUserInputEmpty\n          ? ('configurator.a11y.valueOfAttributeBlank'\n            | cxTranslate\n              : {\n                  attribute: attribute.label\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : {\n                  value: attribute.userInput,\n                  attribute: attribute.label\n                })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorUISettingsConfig }, { type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }, { type: ConfiguratorStorefrontUtilsService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Provides validation and formatting of numeric input
 */
class ConfiguratorAttributeNumericInputFieldService {
    /**
     * Validates numeric input according to settings that are not derived from the locale but from the attribute
     * meta data like the total number of digits and the maximum number of decimal places.
     *
     * @param input Numeric user input, formatted according to session locale
     * @param groupingSeparator Separator for grouping, e.g. ',' for 'en' locale. We allow the grouping separator but
     *   do not check exactly on the position of it in the numerical input. This e.g. is ok: '12,12,12', will be converted
     *   to '121,212' after the next roundtrip
     * @param decimalSeparator  Decimal separator, e.g. '.' for 'en' locale. Must not occur more that 1 time in the input.
     * @param numberTotalPlaces  Total number of places e.g. 10
     * @param numberDecimalPlaces  Number of decimal places e.g. 2
     *  @returns {boolean} Did we see a validation error?
     */
    performValidationAccordingToMetaData(input, groupingSeparator, decimalSeparator, numberTotalPlaces, numberDecimalPlaces) {
        const regexEscape = '\\';
        const search = new RegExp(regexEscape + groupingSeparator, 'g');
        const woGrouping = input.replace(search, '');
        const splitParts = woGrouping.split(decimalSeparator);
        if (splitParts.length > 2) {
            return true;
        }
        if (splitParts.length === 1) {
            return woGrouping.length > numberTotalPlaces - numberDecimalPlaces;
        }
        return (splitParts[0].length > numberTotalPlaces - numberDecimalPlaces ||
            splitParts[1].length > numberDecimalPlaces);
    }
    formatIntervalValue(intervalValue, decimalPlaces, locale) {
        if (decimalPlaces === undefined) {
            decimalPlaces = 0;
        }
        const formatted = formatNumber(intervalValue, locale, '1.' + decimalPlaces + '-' + decimalPlaces);
        return formatted;
    }
    /**
     * Parses the value names and returns the intervals.
     *
     * @param values values of the attribute
     * @returns {ConfiguratorAttributeNumericInterval[]} parsed intervals
     */
    getIntervals(values) {
        const intervals = [];
        if (values && values.length > 0) {
            values.forEach((value) => {
                const interval = this.getInterval(value);
                if (interval && Object.keys(interval).length !== 0) {
                    intervals.push(interval);
                }
            });
        }
        return intervals;
    }
    /**
     * Parses the value name and returns the interval structure.
     * Valid interval strings:
     * Standard Interval
     * 5 - 10
     * 5 - <10
     * >5 - 10
     * >5 - <10
     * -10 - -5
     * 1.25 - 1.35
     *
     * Infinite Interval
     * >5
     * >=5
     * <5
     * <=5
     * >-5
     *
     * @param value value which will be parsed
     * @returns {ConfiguratorAttributeNumericInterval} parsed interval
     */
    getInterval(value) {
        const interval = {
            minValue: undefined,
            maxValue: undefined,
            minValueIncluded: false,
            maxValueIncluded: false,
        };
        if (!value || !value.name || value.selected) {
            return undefined;
        }
        let minVal;
        let maxVal;
        // standard interval a - b
        if (value.name.includes(' - ')) {
            ({ minVal, maxVal } = this.handleStandardInterval(value.name, interval));
            // infinite interval or single value
        }
        else {
            ({ minVal, maxVal } = this.handleSingleOrInfinite(value.name, interval));
        }
        if (minVal && minVal.length > 0) {
            interval.minValue = +minVal;
        }
        if (maxVal && maxVal.length > 0) {
            interval.maxValue = +maxVal;
        }
        return interval;
    }
    handleSingleOrInfinite(valueName, interval) {
        let minVal = '';
        let maxVal = '';
        if (valueName.includes('>')) {
            minVal = valueName;
            interval.minValueIncluded = false;
            minVal = minVal.replace('>', '');
        }
        if (valueName.includes('<')) {
            maxVal = valueName;
            interval.maxValueIncluded = false;
            maxVal = maxVal.replace('<', '');
        }
        if (valueName.includes('≥')) {
            minVal = valueName;
            interval.minValueIncluded = true;
            minVal = minVal.replace('≥', '');
        }
        if (valueName.includes('≤')) {
            maxVal = valueName;
            interval.maxValueIncluded = true;
            maxVal = maxVal.replace('≤', '');
        }
        if (!valueName.includes('>') &&
            !valueName.includes('<') &&
            !valueName.includes('≤') &&
            !valueName.includes('≥')) {
            minVal = valueName;
            maxVal = valueName;
            interval.maxValueIncluded = true;
            interval.minValueIncluded = true;
        }
        return { minVal, maxVal };
    }
    handleStandardInterval(valueName, interval) {
        const index = valueName.indexOf(' - ');
        let minVal = valueName.substring(0, index);
        let maxVal = valueName.substring(index + 3, valueName.length);
        interval.minValueIncluded = true;
        interval.maxValueIncluded = true;
        if (minVal.includes('>')) {
            interval.minValueIncluded = false;
            minVal = minVal.replace('>', '');
        }
        if (maxVal.includes('<')) {
            interval.maxValueIncluded = false;
            maxVal = maxVal.replace('<', '');
        }
        return { minVal, maxVal };
    }
    /**
     * Get pattern for the message that is displayed when the validation fails. This message e.g. looks like
     * 'Enter the number in the following format: ##,###,###.##'
     * for the 'en' locale for an attribute with total length of 10 and 2 decimal places.
     *
     * @param decimalPlaces Number of decimal places
     * @param totalLength Total number of digits
     * @param negativeAllowed Do we allow negative input?
     * @param locale  Locale
     *  @returns {string} The pattern that we display in the validation message
     */
    getPatternForValidationMessage(decimalPlaces, totalLength, negativeAllowed, locale) {
        let input = (10 ** totalLength - 1).toString();
        if (decimalPlaces > 0) {
            input =
                input.substring(0, totalLength - decimalPlaces) +
                    '.' +
                    input.substring(totalLength - decimalPlaces, totalLength);
        }
        const inputAsNumber = Number(input);
        let formatted = formatNumber(inputAsNumber, locale, '1.' + decimalPlaces + '-' + decimalPlaces).replace(/9/g, '#');
        if (negativeAllowed) {
            formatted = '-' + formatted;
        }
        return formatted;
    }
    /**
     * Returns the validator for the input component that represents numeric input.
     * The validator only allows the grouping separator, the decimal separator, an optional '-' sign,
     * and the digits between 0..9. This validator does not support the scientific notation of
     * attributes.
     *
     * @param locale The locale
     * @param numberDecimalPlaces Number of decimal places
     * @param numberTotalPlaces  Total number of digits
     * @param negativeAllowed: Do we allow negative input?
     * @returns {ValidatorFn} The validator
     */
    getNumberFormatValidator(locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed) {
        return (control) => {
            const input = control.value?.trim();
            if (input) {
                return this.getValidationErrorsNumericFormat(input, locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed);
            }
            return null;
        };
    }
    getValidationErrorsNumericFormat(input, locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed) {
        //allowed: only numbers and separators
        const groupingSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Group);
        const decimalSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Decimal);
        const expressionPrefix = negativeAllowed ? '^-?' : '^';
        const expressionOnlyNumericalInput = new RegExp(expressionPrefix +
            '[0123456789' +
            groupingSeparator +
            decimalSeparator +
            ']*$');
        if (!expressionOnlyNumericalInput.test(input)) {
            return this.createValidationError(true);
        }
        return this.createValidationError(this.performValidationAccordingToMetaData(input, groupingSeparator, decimalSeparator, numberTotalPlaces + (input.includes('-') ? 1 : 0), numberDecimalPlaces));
    }
    /**
     * Returns the interval validator for the input component that represents numeric input.
     * It becomes active only if intervals are provided (they originate from the attribute's values),
     * and matches the input with the list of intervals.
     * It also becomes active only if the validation for the numeric format itself is fine, in order
     * to avoid multiple validation messages.
     *
     * @param locale The locale
     * @param numberDecimalPlaces Number of decimal places
     * @param numberTotalPlaces  Total number of digits
     * @param negativeAllowed: Do we allow negative input?
     * @returns {ValidatorFn} The validator
     */
    getIntervalValidator(locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed, intervals, currentValue) {
        return (control) => {
            const input = control.value?.trim();
            if (input &&
                input !== currentValue && //this is to ensure that selected interval consisting of only one value will not lead to a validation error
                // in the next roundtrip, when this value has been removed from the list of intervals
                intervals.length !== 0 && // perform validation only if intervals exist
                this.getValidationErrorsNumericFormat(input, locale, numberDecimalPlaces, numberTotalPlaces, negativeAllowed) == null) {
                return this.createIntervalValidationError(!this.checkIfPartOfIntervals(input, locale, intervals));
            }
            return null;
        };
    }
    checkIfPartOfIntervals(input, locale, intervals) {
        return (intervals.find((interval) => this.inputMatchesInterval(input, locale, interval)) !== undefined);
    }
    inputMatchesInterval(input, locale, interval) {
        const inputNum = this.parseInput(input, locale);
        let matchesLower = true;
        if (interval.minValue) {
            matchesLower = interval.minValueIncluded
                ? interval.minValue <= inputNum
                : interval.minValue < inputNum;
        }
        let matchesHigher = true;
        if (interval.maxValue) {
            matchesHigher = interval.maxValueIncluded
                ? interval.maxValue >= inputNum
                : interval.maxValue > inputNum;
        }
        return matchesLower && matchesHigher;
    }
    parseInput(input, locale) {
        const groupingSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Group);
        const decimalSeparator = getLocaleNumberSymbol(locale, NumberSymbol.Decimal);
        return this.parseInputForSeparators(input, groupingSeparator, decimalSeparator);
    }
    parseInputForSeparators(input, groupingSeparator, decimalSeparator) {
        const escapeString = '\\';
        const search = new RegExp(escapeString + groupingSeparator, 'g');
        const normalizedInput = input
            .replace(search, '')
            .replace(decimalSeparator, '.');
        return parseFloat(normalizedInput);
    }
    createValidationError(isError) {
        return isError ? { wrongFormat: {} } : null;
    }
    createIntervalValidationError(isError) {
        return isError ? { intervalNotMet: {} } : null;
    }
}
ConfiguratorAttributeNumericInputFieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorAttributeNumericInputFieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DefaultSettings {
}
class ConfiguratorAttributeNumericInputFieldComponent extends ConfiguratorAttributeInputFieldComponent {
    // TODO (CXSPA-3392): make ConfiguratorStorefrontUtilsService a required dependency
    constructor(configAttributeNumericInputFieldService, config, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService, 
    // TODO:(CXSPA-3392) for next major release remove feature config service
    featureConfigService) {
        super(config, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService);
        this.configAttributeNumericInputFieldService = configAttributeNumericInputFieldService;
        this.config = config;
        this.translation = translation;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.featureConfigService = featureConfigService;
        this.iconType = ICON_TYPE;
        this.intervals = [];
        this.logger = inject(LoggerService);
        this.language = attributeComponentContext.language;
    }
    /**
     * Do we need to display a validation message
     */
    mustDisplayValidationMessage() {
        const wrongFormat = (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
            this.attributeInputForm.errors?.wrongFormat;
        return wrongFormat;
    }
    /**
     * Do we need to display a validation message concerning intervals
     */
    mustDisplayIntervalMessage() {
        const intervalNotMet = (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
            this.attributeInputForm.errors?.intervalNotMet;
        return intervalNotMet;
    }
    ngOnInit() {
        this.initializeValidation();
        if (this.attribute.userInput) {
            this.attributeInputForm.setValue(this.attribute.userInput);
        }
        if (this.ownerType === CommonConfigurator.OwnerType.CART_ENTRY &&
            this.attribute.required &&
            this.attribute.incomplete &&
            !this.attributeInputForm.value) {
            this.attributeInputForm.markAsTouched();
        }
        this.sub = this.attributeInputForm.valueChanges
            .pipe(debounce(() => timer(this.config.productConfigurator?.updateDebounceTime?.input ??
            this.FALLBACK_DEBOUNCE_TIME)))
            .subscribe(() => this.onChange());
    }
    initializeValidation() {
        //locales are available as 'languages' in the commerce backend
        this.locale = this.getInstalledLocale(this.language);
        let numDecimalPlaces = this.attribute.numDecimalPlaces;
        let numTotalLength = this.attribute.numTotalLength;
        let negativeAllowed = this.attribute.negativeAllowed;
        if (numDecimalPlaces === undefined ||
            numTotalLength === undefined ||
            negativeAllowed === undefined) {
            //This won't happen in environments with the standard configurators deployed, as numeric
            //attributes do carry these settings. We still introduce default values to ease development
            //of extension use cases, but log a warning
            const defaultSettings = this.getDefaultSettings();
            numDecimalPlaces = defaultSettings.numDecimalPlaces;
            numTotalLength = defaultSettings.numTotalLength;
            negativeAllowed = defaultSettings.negativeAllowed;
            if (isDevMode()) {
                this.logger.warn('Meta data for numeric attribute not present, falling back to defaults');
            }
        }
        if (this.attribute.intervalInDomain) {
            this.intervals =
                this.configAttributeNumericInputFieldService.getIntervals(this.attribute.values);
        }
        const numberFormatValidator = this.configAttributeNumericInputFieldService.getNumberFormatValidator(this.locale, numDecimalPlaces, numTotalLength, negativeAllowed);
        // TODO (CXSPA-3392): for next major release remove feature level
        const validatorArray = this.featureConfigService?.isLevel('6.2')
            ? [
                numberFormatValidator,
                this.configAttributeNumericInputFieldService.getIntervalValidator(this.locale, numDecimalPlaces, numTotalLength, negativeAllowed, this.intervals, this.attribute.userInput),
            ]
            : [numberFormatValidator];
        this.attributeInputForm = new UntypedFormControl('', validatorArray);
        this.numericFormatPattern =
            this.configAttributeNumericInputFieldService.getPatternForValidationMessage(numDecimalPlaces, numTotalLength, negativeAllowed, this.locale);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    /**
     * Returns a concatenated help text for multiple intervals.
     */
    getHelpTextForInterval() {
        let intervalText = '';
        let concatenatedIntervalText = '';
        this.intervals.forEach((interval, index) => {
            intervalText = this.getIntervalText(interval);
            if (index > 0) {
                intervalText =
                    intervalText.charAt(0).toLowerCase() + intervalText.slice(1);
                this.translation
                    .translate('configurator.a11y.combinedIntervalsText', {
                    combinedInterval: concatenatedIntervalText,
                    newInterval: intervalText,
                })
                    .pipe(take(1))
                    .subscribe((text) => (concatenatedIntervalText = text));
            }
            else {
                concatenatedIntervalText = intervalText;
            }
        });
        return concatenatedIntervalText.trim();
    }
    /**
     * Returns the combined aria text for attribute and value and the interval help text
     */
    getAriaLabelComplete() {
        let completeAriaText = '';
        if (this.attribute.userInput?.length === 0) {
            this.translation
                .translate('configurator.a11y.valueOfAttributeBlank', {
                attribute: this.attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (completeAriaText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.valueOfAttributeFull', {
                value: this.attribute.userInput,
                attribute: this.attribute.label,
            })
                .pipe(take(1))
                .subscribe((text) => (completeAriaText = text));
        }
        completeAriaText += ' ';
        completeAriaText += this.getHelpTextForInterval();
        return completeAriaText;
    }
    getIntervalText(interval) {
        let intervalText = '';
        let formattedMinValue = '';
        let formattedMaxValue = '';
        if (interval.minValue) {
            formattedMinValue =
                this.configAttributeNumericInputFieldService.formatIntervalValue(interval.minValue, this.attribute.numDecimalPlaces, this.locale);
        }
        if (interval.maxValue) {
            formattedMaxValue =
                this.configAttributeNumericInputFieldService.formatIntervalValue(interval.maxValue, this.attribute.numDecimalPlaces, this.locale);
        }
        if (interval.minValue && interval.maxValue) {
            if (interval.minValue === interval.maxValue) {
                this.translation
                    .translate('configurator.a11y.numericIntervalSingleValue', {
                    value: formattedMinValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (intervalText = text));
                return intervalText;
            }
            intervalText = this.getTextForRealInterval(formattedMinValue, formattedMaxValue, intervalText, interval);
        }
        else {
            intervalText = this.getTextForPartialInterval(interval, intervalText, formattedMinValue, formattedMaxValue);
        }
        return intervalText;
    }
    getTextForPartialInterval(interval, intervalText, formattedMinValue, formattedMaxValue) {
        if (interval.minValue) {
            if (interval.minValueIncluded) {
                intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMinValueIncluded', formattedMinValue);
            }
            else {
                intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMinValue', formattedMinValue);
            }
        }
        else {
            if (interval.maxValue) {
                if (interval.maxValueIncluded) {
                    intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMaxValueIncluded', formattedMaxValue);
                }
                else {
                    intervalText = this.getInfiniteIntervalText('configurator.a11y.numericInfiniteIntervalMaxValue', formattedMaxValue);
                }
            }
        }
        return intervalText;
    }
    getTextForRealInterval(formattedMinValue, formattedMaxValue, intervalText, interval) {
        let textToReturn = intervalText;
        this.translation
            .translate('configurator.a11y.numericIntervalStandard', {
            minValue: formattedMinValue,
            maxValue: formattedMaxValue,
        })
            .pipe(take(1))
            .subscribe((text) => (textToReturn = text));
        if (!interval.minValueIncluded || !interval.maxValueIncluded) {
            if (!interval.minValueIncluded && !interval.maxValueIncluded) {
                textToReturn += ' ';
                textToReturn += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardOpen');
            }
            else {
                if (!interval.minValueIncluded) {
                    textToReturn += ' ';
                    textToReturn += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardLowerEndpointNotIncluded');
                }
                if (!interval.maxValueIncluded) {
                    textToReturn += ' ';
                    textToReturn += this.getAdditionalIntervalText('configurator.a11y.numericIntervalStandardUpperEndpointNotIncluded');
                }
            }
        }
        return textToReturn;
    }
    getAdditionalIntervalText(key) {
        let intervalText = '';
        this.translation
            .translate(key)
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        return intervalText;
    }
    getInfiniteIntervalText(key, value) {
        let intervalText = '';
        this.translation
            .translate(key, {
            value: value,
        })
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        return intervalText;
    }
    getDefaultSettings() {
        return { numDecimalPlaces: 2, numTotalLength: 6, negativeAllowed: false };
    }
    getInstalledLocale(locale) {
        try {
            getLocaleId(locale);
            return locale;
        }
        catch {
            this.reportMissingLocaleData(locale);
            return 'en';
        }
    }
    reportMissingLocaleData(lang) {
        if (isDevMode()) {
            this.logger.warn(`ConfigAttributeNumericInputFieldComponent: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`);
        }
    }
}
ConfiguratorAttributeNumericInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldComponent, deps: [{ token: ConfiguratorAttributeNumericInputFieldService }, { token: ConfiguratorUISettingsConfig }, { token: i1$1.TranslationService }, { token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }, { token: ConfiguratorStorefrontUtilsService, optional: true }, { token: i1$1.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeNumericInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeNumericInputFieldComponent, selector: "cx-configurator-attribute-numeric-input-field", usesInheritance: true, ngImport: i0, template: "<label *ngIf=\"attribute.intervalInDomain\" class=\"cx-intervalHelpText\">{{\n  this.getHelpTextForInterval()\n}}</label>\n<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      [required]=\"isRequired\"\n      class=\"form-control\"\n      [attr.aria-describedby]=\"\n        mustDisplayValidationMessage()\n          ? createAttributeUiKey('label', attribute.name) +\n            ' ' +\n            createAttributeUiKey('attribute-msg', attribute.name)\n          : createAttributeUiKey('label', attribute.name)\n      \"\n      attr.role=\"{{ attribute.dataType }}\"\n      attr.required=\"{{ attribute.required }}\"\n      (change)=\"onChange()\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"getAriaLabelComplete()\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [class.ng-invalid]=\"isRequired && isUserInputEmpty\"\n      [attr.aria-describedby]=\"\n        mustDisplayValidationMessage()\n          ? createAttributeUiKey('label', attribute.name) +\n            ' ' +\n            createAttributeUiKey('attribute-msg', attribute.name)\n          : createAttributeUiKey('label', attribute.name)\n      \"\n      attr.role=\"{{ attribute.dataType }}\"\n      attr.required=\"{{ attribute.required }}\"\n      (change)=\"onChange()\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"getAriaLabelComplete()\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayValidationMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <cx-icon [type]=\"iconType.WARNING\"></cx-icon>\n    {{\n      'configurator.attribute.wrongNumericFormat'\n        | cxTranslate: { pattern: numericFormatPattern }\n    }}\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n    {{\n      'configurator.attribute.wrongNumericFormatMessage'\n        | cxTranslate: { pattern: numericFormatPattern }\n    }}\n  </ng-container>\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayIntervalMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n  {{ 'configurator.attribute.wrongIntervalFormat' | cxTranslate }}\n</div>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i8.MaxLengthValidator, selector: "[maxlength][formControlName],[maxlength][formControl],[maxlength][ngModel]", inputs: ["maxlength"] }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i4$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-numeric-input-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label *ngIf=\"attribute.intervalInDomain\" class=\"cx-intervalHelpText\">{{\n  this.getHelpTextForInterval()\n}}</label>\n<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"form-group\">\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      [required]=\"isRequired\"\n      class=\"form-control\"\n      [attr.aria-describedby]=\"\n        mustDisplayValidationMessage()\n          ? createAttributeUiKey('label', attribute.name) +\n            ' ' +\n            createAttributeUiKey('attribute-msg', attribute.name)\n          : createAttributeUiKey('label', attribute.name)\n      \"\n      attr.role=\"{{ attribute.dataType }}\"\n      attr.required=\"{{ attribute.required }}\"\n      (change)=\"onChange()\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"getAriaLabelComplete()\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <input\n      [formControl]=\"attributeInputForm\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [class.ng-invalid]=\"isRequired && isUserInputEmpty\"\n      [attr.aria-describedby]=\"\n        mustDisplayValidationMessage()\n          ? createAttributeUiKey('label', attribute.name) +\n            ' ' +\n            createAttributeUiKey('attribute-msg', attribute.name)\n          : createAttributeUiKey('label', attribute.name)\n      \"\n      attr.role=\"{{ attribute.dataType }}\"\n      attr.required=\"{{ attribute.required }}\"\n      (change)=\"onChange()\"\n      maxlength=\"{{ attribute.maxlength }}\"\n      [attr.aria-label]=\"getAriaLabelComplete()\"\n      [cxFocus]=\"{\n        key: createAttributeIdForConfigurator(attribute)\n      }\"\n    />\n  </ng-container>\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayValidationMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <cx-icon [type]=\"iconType.WARNING\"></cx-icon>\n    {{\n      'configurator.attribute.wrongNumericFormat'\n        | cxTranslate: { pattern: numericFormatPattern }\n    }}\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n    {{\n      'configurator.attribute.wrongNumericFormatMessage'\n        | cxTranslate: { pattern: numericFormatPattern }\n    }}\n  </ng-container>\n</div>\n<div\n  class=\"cx-validation-msg\"\n  id=\"{{ createAttributeUiKey('attribute-msg', attribute.name) }}\"\n  *ngIf=\"mustDisplayIntervalMessage()\"\n  aria-live=\"assertive\"\n  aria-atomic=\"true\"\n  role=\"alert\"\n>\n  <cx-icon [type]=\"iconType.ERROR\"></cx-icon>\n  {{ 'configurator.attribute.wrongIntervalFormat' | cxTranslate }}\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeNumericInputFieldService }, { type: ConfiguratorUISettingsConfig }, { type: i1$1.TranslationService }, { type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }, { type: ConfiguratorStorefrontUtilsService, decorators: [{
                    type: Optional
                }] }, { type: i1$1.FeatureConfigService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeDropDownComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
    constructor(quantityService, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService) {
        super(quantityService, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService);
        this.quantityService = quantityService;
        this.translation = translation;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.attributeDropDownForm = new UntypedFormControl('');
        this.group = attributeComponentContext.group.id;
    }
    ngOnInit() {
        this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
    }
    getSelectedValue() {
        return this.attribute.values?.find((value) => value?.selected);
    }
}
ConfiguratorAttributeDropDownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownComponent, deps: [{ token: ConfiguratorAttributeQuantityService }, { token: i1$1.TranslationService }, { token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }, { token: ConfiguratorStorefrontUtilsService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeDropDownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeDropDownComponent, selector: "cx-configurator-attribute-drop-down", usesInheritance: true, ngImport: i0, template: "<div\n  class=\"form-group\"\n  *ngIf=\"attribute.values && attribute.values.length !== 0\"\n>\n  <label\n    for=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'configurator.a11y.listbox'\n        | cxTranslate\n          : {\n              count: attribute.values.length\n            }\n    }}\n  </label>\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <select\n      id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      class=\"form-control\"\n      [formControl]=\"attributeDropDownForm\"\n      [cxFocus]=\"{ key: attribute.name }\"\n      (change)=\"onSelect(attributeDropDownForm.value)\"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >\n      <option\n        *ngFor=\"let item of attribute.values\"\n        [selected]=\"item.selected\"\n        [label]=\"getLabel(expMode, item.valueDisplay, item.valueCode, item)\"\n        [attr.aria-label]=\"getAriaLabel(item, attribute)\"\n        [value]=\"item.valueCode\"\n      >\n        {{ getLabel(expMode, item.valueDisplay, item.valueCode, item) }}\n      </option>\n    </select>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <select\n      id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [formControl]=\"attributeDropDownForm\"\n      [cxFocus]=\"{ key: attribute.name }\"\n      (change)=\"onSelect(attributeDropDownForm.value)\"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >\n      <option\n        *ngFor=\"let item of attribute.values\"\n        [selected]=\"item.selected\"\n        [label]=\"getLabel(expMode, item.valueDisplay, item.valueCode, item)\"\n        [attr.aria-label]=\"getAriaLabel(item, attribute)\"\n        [value]=\"item.valueCode\"\n      >\n        {{ getLabel(expMode, item.valueDisplay, item.valueCode, item) }}\n      </option>\n    </select>\n  </ng-container>\n\n  <div\n    *ngIf=\"!withQuantity && getSelectedValue()?.valuePrice\"\n    class=\"cx-value-price\"\n  >\n    <cx-configurator-price\n      [formula]=\"extractValuePriceFormulaParameters(getSelectedValue())\"\n    ></cx-configurator-price>\n  </div>\n</div>\n<div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n  <cx-configurator-attribute-quantity\n    (changeQuantity)=\"onChangeQuantity($event, attributeDropDownForm)\"\n    [quantityOptions]=\"extractQuantityParameters(attributeDropDownForm)\"\n  ></cx-configurator-attribute-quantity>\n  <cx-configurator-price\n    [formula]=\"extractPriceFormulaParameters()\"\n  ></cx-configurator-price>\n</div>\n\n<cx-configurator-attribute-numeric-input-field\n  *ngIf=\"isAdditionalValueNumeric\"\n  class=\"cx-configurator-attribute-additional-value\"\n  [attr.aria-label]=\"'configurator.a11y.additionalValue' | cxTranslate\"\n></cx-configurator-attribute-numeric-input-field>\n\n<cx-configurator-attribute-input-field\n  *ngIf=\"isAdditionalValueAlphaNumeric\"\n  class=\"cx-configurator-attribute-additional-value\"\n  [attr.aria-label]=\"'configurator.a11y.additionalValue' | cxTranslate\"\n>\n</cx-configurator-attribute-input-field>\n", dependencies: [{ kind: "directive", type: i4$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "directive", type: i8.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "component", type: ConfiguratorAttributeNumericInputFieldComponent, selector: "cx-configurator-attribute-numeric-input-field" }, { kind: "component", type: ConfiguratorAttributeInputFieldComponent, selector: "cx-configurator-attribute-input-field" }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-drop-down', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"form-group\"\n  *ngIf=\"attribute.values && attribute.values.length !== 0\"\n>\n  <label\n    for=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'configurator.a11y.listbox'\n        | cxTranslate\n          : {\n              count: attribute.values.length\n            }\n    }}\n  </label>\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <select\n      id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      class=\"form-control\"\n      [formControl]=\"attributeDropDownForm\"\n      [cxFocus]=\"{ key: attribute.name }\"\n      (change)=\"onSelect(attributeDropDownForm.value)\"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >\n      <option\n        *ngFor=\"let item of attribute.values\"\n        [selected]=\"item.selected\"\n        [label]=\"getLabel(expMode, item.valueDisplay, item.valueCode, item)\"\n        [attr.aria-label]=\"getAriaLabel(item, attribute)\"\n        [value]=\"item.valueCode\"\n      >\n        {{ getLabel(expMode, item.valueDisplay, item.valueCode, item) }}\n      </option>\n    </select>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <select\n      id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [formControl]=\"attributeDropDownForm\"\n      [cxFocus]=\"{ key: attribute.name }\"\n      (change)=\"onSelect(attributeDropDownForm.value)\"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >\n      <option\n        *ngFor=\"let item of attribute.values\"\n        [selected]=\"item.selected\"\n        [label]=\"getLabel(expMode, item.valueDisplay, item.valueCode, item)\"\n        [attr.aria-label]=\"getAriaLabel(item, attribute)\"\n        [value]=\"item.valueCode\"\n      >\n        {{ getLabel(expMode, item.valueDisplay, item.valueCode, item) }}\n      </option>\n    </select>\n  </ng-container>\n\n  <div\n    *ngIf=\"!withQuantity && getSelectedValue()?.valuePrice\"\n    class=\"cx-value-price\"\n  >\n    <cx-configurator-price\n      [formula]=\"extractValuePriceFormulaParameters(getSelectedValue())\"\n    ></cx-configurator-price>\n  </div>\n</div>\n<div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n  <cx-configurator-attribute-quantity\n    (changeQuantity)=\"onChangeQuantity($event, attributeDropDownForm)\"\n    [quantityOptions]=\"extractQuantityParameters(attributeDropDownForm)\"\n  ></cx-configurator-attribute-quantity>\n  <cx-configurator-price\n    [formula]=\"extractPriceFormulaParameters()\"\n  ></cx-configurator-price>\n</div>\n\n<cx-configurator-attribute-numeric-input-field\n  *ngIf=\"isAdditionalValueNumeric\"\n  class=\"cx-configurator-attribute-additional-value\"\n  [attr.aria-label]=\"'configurator.a11y.additionalValue' | cxTranslate\"\n></cx-configurator-attribute-numeric-input-field>\n\n<cx-configurator-attribute-input-field\n  *ngIf=\"isAdditionalValueAlphaNumeric\"\n  class=\"cx-configurator-attribute-additional-value\"\n  [attr.aria-label]=\"'configurator.a11y.additionalValue' | cxTranslate\"\n>\n</cx-configurator-attribute-input-field>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeQuantityService }, { type: i1$1.TranslationService }, { type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }, { type: ConfiguratorStorefrontUtilsService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeNumericInputFieldModule {
}
ConfiguratorAttributeNumericInputFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeNumericInputFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldModule, declarations: [ConfiguratorAttributeNumericInputFieldComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        FeaturesConfigModule], exports: [ConfiguratorAttributeNumericInputFieldComponent] });
ConfiguratorAttributeNumericInputFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_numeric: ConfiguratorAttributeNumericInputFieldComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        IconModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNumericInputFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_numeric: ConfiguratorAttributeNumericInputFieldComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeNumericInputFieldComponent],
                    exports: [ConfiguratorAttributeNumericInputFieldComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeInputFieldModule {
}
ConfiguratorAttributeInputFieldModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeInputFieldModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, declarations: [ConfiguratorAttributeInputFieldComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule], exports: [ConfiguratorAttributeInputFieldComponent] });
ConfiguratorAttributeInputFieldModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_string: ConfiguratorAttributeInputFieldComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeInputFieldModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_string: ConfiguratorAttributeInputFieldComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeInputFieldComponent],
                    exports: [ConfiguratorAttributeInputFieldComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeDropDownModule {
}
ConfiguratorAttributeDropDownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeDropDownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownModule, declarations: [ConfiguratorAttributeDropDownComponent], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule,
        FeaturesConfigModule], exports: [ConfiguratorAttributeDropDownComponent] });
ConfiguratorAttributeDropDownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_dropdown: ConfiguratorAttributeDropDownComponent,
                    AttributeType_dropdown_add: ConfiguratorAttributeDropDownComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeDropDownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        NgSelectModule,
                        ReactiveFormsModule,
                        ConfiguratorPriceModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeInputFieldModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_dropdown: ConfiguratorAttributeDropDownComponent,
                                    AttributeType_dropdown_add: ConfiguratorAttributeDropDownComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeDropDownComponent],
                    exports: [ConfiguratorAttributeDropDownComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeMultiSelectionBundleComponent extends ConfiguratorAttributeMultiSelectionBaseComponent {
    constructor() {
        super(...arguments);
        this.preventAction$ = new BehaviorSubject(false);
        this.multipleSelectionValues = [];
    }
    ngOnInit() {
        this.initialize();
    }
    /**
     * Initializes selection values and peventAction observable
     */
    initialize() {
        if (this.attribute.values && this.attribute.values.length > 0) {
            this.multipleSelectionValues = this.attribute.values.map(({ name, quantity, selected, valueCode }) => ({
                name,
                quantity,
                selected,
                valueCode,
            }));
        }
        if (this.attribute.required &&
            this.multipleSelectionValues.filter((value) => value.selected).length < 2) {
            this.preventAction$.next(true);
        }
    }
    /**
     * Updates the value dependent on the provided state
     *
     * @param  {any} valueCode - value code to be updated
     * @param  {any} state - selected state
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    updateMultipleSelectionValues(valueCode, state) {
        const index = this.multipleSelectionValues.findIndex((value) => value.valueCode === valueCode);
        this.multipleSelectionValues[index] = {
            ...this.multipleSelectionValues[index],
            selected: state,
        };
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: this.multipleSelectionValues,
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.ATTRIBUTE,
        };
        return event;
    }
    /**
     * Updates the quantity of the given value
     *
     * @param  eventValue - event value
     *
     * @return {ConfigFormUpdateEvent} - form update event
     */
    updateMultipleSelectionValuesQuantity(eventValue) {
        const value = this.multipleSelectionValues.find((selectionValue) => selectionValue.valueCode === eventValue.valueCode);
        if (!value) {
            return;
        }
        value.quantity = eventValue.quantity;
        const event = {
            changedAttribute: {
                ...this.attribute,
                values: [value],
            },
            ownerKey: this.ownerKey,
            updateType: Configurator.UpdateType.VALUE_QUANTITY,
        };
        return event;
    }
    onSelect(eventValue) {
        this.loading$.next(true);
        const changes = this.updateMultipleSelectionValues(eventValue, true);
        this.configuratorCommonsService.updateConfiguration(changes.ownerKey, changes.changedAttribute, changes.updateType);
    }
    onDeselect(eventValue) {
        this.loading$.next(true);
        const changes = this.updateMultipleSelectionValues(eventValue, false);
        this.configuratorCommonsService.updateConfiguration(changes.ownerKey, changes.changedAttribute, changes.updateType);
    }
    onDeselectAll() {
        this.loading$.next(true);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            values: [],
        }, Configurator.UpdateType.ATTRIBUTE);
    }
    onChangeValueQuantity(eventValue) {
        this.loading$.next(true);
        const changes = this.updateMultipleSelectionValuesQuantity(eventValue);
        if (changes) {
            this.configuratorCommonsService.updateConfiguration(changes.ownerKey, changes.changedAttribute, changes.updateType);
        }
    }
    onChangeAttributeQuantity(eventObject) {
        this.loading$.next(true);
        if (!eventObject) {
            this.onDeselectAll();
        }
        else {
            this.onHandleAttributeQuantity(eventObject);
        }
    }
    /**
     * Extract corresponding price formula parameters
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: 0,
            price: {
                value: 0,
                currencyIso: '',
            },
            priceTotal: this.attribute.attributePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Extract corresponding product card parameters
     * @param {boolean} disableAllButtons - Prevent all actions, e.g. while loading
     * @param {boolean} hideRemoveButton - hide remove action, e.g. if only value required attribute
     * @param {Configurator.Value} value - Value
     * @param {number} index - index of current value in list of values of attribute
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(disableAllButtons, hideRemoveButton, value, index) {
        return {
            disableAllButtons: disableAllButtons ?? false,
            hideRemoveButton: hideRemoveButton ?? false,
            productBoundValue: value,
            multiSelect: true,
            withQuantity: this.withQuantity,
            loading$: this.loading$,
            attributeId: this.getAttributeCode(this.attribute),
            attributeLabel: this.attribute.label,
            attributeName: this.attribute.name,
            itemCount: this.attribute.values?.length
                ? this.attribute.values.length
                : 0,
            itemIndex: index,
        };
    }
}
ConfiguratorAttributeMultiSelectionBundleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeMultiSelectionBundleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeMultiSelectionBundleComponent, selector: "cx-configurator-attribute-multi-selection-bundle", usesInheritance: true, ngImport: i0, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div\n    *ngIf=\"withQuantityOnAttributeLevel\"\n    class=\"cx-attribute-level-quantity-price\"\n  >\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeAttributeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters(attribute.quantity)\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    (handleDeselect)=\"onDeselect($event)\"\n    (handleQuantity)=\"onChangeValueQuantity($event)\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"\n      extractProductCardParameters(\n        loading$ | async,\n        preventAction$ | async,\n        value,\n        i\n      )\n    \"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n", dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: ["productCardOptions"], outputs: ["handleDeselect", "handleQuantity", "handleSelect"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-multi-selection-bundle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div\n    *ngIf=\"withQuantityOnAttributeLevel\"\n    class=\"cx-attribute-level-quantity-price\"\n  >\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeAttributeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters(attribute.quantity)\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    (handleDeselect)=\"onDeselect($event)\"\n    (handleQuantity)=\"onChangeValueQuantity($event)\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"\n      extractProductCardParameters(\n        loading$ | async,\n        preventAction$ | async,\n        value,\n        i\n      )\n    \"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeMultiSelectionBundleModule {
}
ConfiguratorAttributeMultiSelectionBundleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeMultiSelectionBundleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, declarations: [ConfiguratorAttributeMultiSelectionBundleComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeMultiSelectionBundleComponent] });
ConfiguratorAttributeMultiSelectionBundleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_checkBoxListProduct: ConfiguratorAttributeMultiSelectionBundleComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionBundleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_checkBoxListProduct: ConfiguratorAttributeMultiSelectionBundleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeMultiSelectionBundleComponent],
                    exports: [ConfiguratorAttributeMultiSelectionBundleComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeMultiSelectionImageComponent extends ConfiguratorAttributeBaseComponent {
    constructor(configUtilsService, attributeComponentContext, configuratorCommonsService) {
        super();
        this.configUtilsService = configUtilsService;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.attributeCheckBoxForms = new Array();
        this.attribute = attributeComponentContext.attribute;
        this.ownerKey = attributeComponentContext.owner.key;
        this.expMode = attributeComponentContext.expMode;
    }
    ngOnInit() {
        const values = this.attribute.values;
        if (values) {
            for (const value of values) {
                let attributeCheckBoxForm;
                if (value.selected) {
                    attributeCheckBoxForm = new UntypedFormControl(true);
                }
                else {
                    attributeCheckBoxForm = new UntypedFormControl(false);
                }
                this.attributeCheckBoxForms.push(attributeCheckBoxForm);
            }
        }
    }
    /**
     * Fired when a value has been selected
     * @param index Index of selected value
     */
    onSelect(index) {
        this.attributeCheckBoxForms[index].setValue(!this.attributeCheckBoxForms[index].value);
        const selectedValues = this.configUtilsService.assembleValuesForMultiSelectAttributes(this.attributeCheckBoxForms, this.attribute);
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            values: selectedValues,
        }, Configurator.UpdateType.ATTRIBUTE);
    }
    extractValuePriceFormulaParameters(value) {
        return {
            quantity: value.quantity,
            price: value.valuePrice,
            priceTotal: value.valuePriceTotal,
            isLightedUp: value.selected,
        };
    }
}
ConfiguratorAttributeMultiSelectionImageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeMultiSelectionImageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeMultiSelectionImageComponent, selector: "cx-configurator-attribute-multi-selection-image", usesInheritance: true, ngImport: i0, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"cx-row\">\n  <div\n    *ngFor=\"let value of attribute.values; let i = index\"\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    class=\"cx-configurator-select\"\n  >\n    <input\n      id=\"{{\n        createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n          '-input'\n      }}\"\n      type=\"checkbox\"\n      class=\"form-input\"\n      [value]=\"value.valueCode\"\n      [formControl]=\"attributeCheckBoxForms[i]\"\n      name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      (click)=\"onSelect(i)\"\n      [attr.aria-label]=\"\n        value.valuePrice && value.valuePrice?.value !== 0\n          ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label,\n                  price: value.valuePrice.formattedValue\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : { value: value.valueDisplay, attribute: attribute.label })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      [attr.checked]=\"attributeCheckBoxForms[i].value ? 'checked' : null\"\n      [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n    />\n    <div class=\"cx-label-container\">\n      <label\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n            '-input'\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label\"\n      >\n        <img\n          *ngIf=\"getImage(value) as image\"\n          class=\"cx-img\"\n          src=\"{{ image?.url }}\"\n          alt=\"{{ image?.altText }}\"\n        />\n        <div *ngIf=\"!getImage(value)\" class=\"cx-img-dummy\"></div>\n        {{ getLabel(expMode, value.valueDisplay, value.valueCode) }}\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </label>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-multi-selection-image', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div id=\"{{ createAttributeIdForConfigurator(attribute) }}\" class=\"cx-row\">\n  <div\n    *ngFor=\"let value of attribute.values; let i = index\"\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    class=\"cx-configurator-select\"\n  >\n    <input\n      id=\"{{\n        createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n          '-input'\n      }}\"\n      type=\"checkbox\"\n      class=\"form-input\"\n      [value]=\"value.valueCode\"\n      [formControl]=\"attributeCheckBoxForms[i]\"\n      name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      (click)=\"onSelect(i)\"\n      [attr.aria-label]=\"\n        value.valuePrice && value.valuePrice?.value !== 0\n          ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label,\n                  price: value.valuePrice.formattedValue\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : { value: value.valueDisplay, attribute: attribute.label })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      [attr.checked]=\"attributeCheckBoxForms[i].value ? 'checked' : null\"\n      [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n    />\n    <div class=\"cx-label-container\">\n      <label\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n            '-input'\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label\"\n      >\n        <img\n          *ngIf=\"getImage(value) as image\"\n          class=\"cx-img\"\n          src=\"{{ image?.url }}\"\n          alt=\"{{ image?.altText }}\"\n        />\n        <div *ngIf=\"!getImage(value)\" class=\"cx-img-dummy\"></div>\n        {{ getLabel(expMode, value.valueDisplay, value.valueCode) }}\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </label>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeMultiSelectionImageModule {
}
ConfiguratorAttributeMultiSelectionImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeMultiSelectionImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageModule, declarations: [ConfiguratorAttributeMultiSelectionImageComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeMultiSelectionImageComponent] });
ConfiguratorAttributeMultiSelectionImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_multi_selection_image: ConfiguratorAttributeMultiSelectionImageComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeMultiSelectionImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        ConfiguratorPriceModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_multi_selection_image: ConfiguratorAttributeMultiSelectionImageComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeMultiSelectionImageComponent],
                    exports: [ConfiguratorAttributeMultiSelectionImageComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeNotSupportedComponent {
}
ConfiguratorAttributeNotSupportedComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeNotSupportedComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeNotSupportedComponent, selector: "cx-configurator-attribute-not-supported", ngImport: i0, template: "<em>{{ 'configurator.attribute.notSupported' | cxTranslate }}</em>\n", dependencies: [{ kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-not-supported', changeDetection: ChangeDetectionStrategy.OnPush, template: "<em>{{ 'configurator.attribute.notSupported' | cxTranslate }}</em>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeNotSupportedModule {
}
ConfiguratorAttributeNotSupportedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeNotSupportedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedModule, declarations: [ConfiguratorAttributeNotSupportedComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorAttributeNotSupportedComponent] });
ConfiguratorAttributeNotSupportedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_not_implemented: ConfiguratorAttributeNotSupportedComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeNotSupportedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_not_implemented: ConfiguratorAttributeNotSupportedComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeNotSupportedComponent],
                    exports: [ConfiguratorAttributeNotSupportedComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeRadioButtonComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
    constructor(quantityService, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService) {
        super(quantityService, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService);
        this.quantityService = quantityService;
        this.translation = translation;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.attributeRadioButtonForm = new UntypedFormControl('');
    }
    ngOnInit() {
        this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
    }
}
ConfiguratorAttributeRadioButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeRadioButtonComponent, deps: [{ token: ConfiguratorAttributeQuantityService }, { token: i1$1.TranslationService }, { token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }, { token: ConfiguratorStorefrontUtilsService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeRadioButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeRadioButtonComponent, selector: "cx-configurator-attribute-radio-button", usesInheritance: true, ngImport: i0, template: "<fieldset>\n  <legend style=\"display: none\">{{ attribute.label }}</legend>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n      <cx-configurator-attribute-quantity\n        (changeQuantity)=\"onChangeQuantity($event)\"\n        [quantityOptions]=\"extractQuantityParameters()\"\n      ></cx-configurator-attribute-quantity>\n      <cx-configurator-price\n        [formula]=\"extractPriceFormulaParameters()\"\n      ></cx-configurator-price>\n    </div>\n\n    <div class=\"form-check\" *ngFor=\"let value of attribute.values\">\n      <div class=\"cx-value-label-pair\">\n        <input\n          id=\"{{\n            createAttributeValueIdForConfigurator(attribute, value.valueCode)\n          }}\"\n          class=\"form-check-input\"\n          type=\"radio\"\n          formcontrolname=\"attributeRadioButtonForm\"\n          [formControl]=\"attributeRadioButtonForm\"\n          [attr.required]=\"attribute.required\"\n          [value]=\"value.valueCode\"\n          name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n          attr.name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n          [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n          [attr.aria-label]=\"getAriaLabel(value, attribute)\"\n          [attr.checked]=\"\n            attributeRadioButtonForm.value === value.valueCode\n              ? 'checked'\n              : null\n          \"\n          [attr.aria-describedby]=\"\n            createAttributeUiKey('label', attribute.name)\n          \"\n          (change)=\"onSelect(value.valueCode)\"\n        />\n        <label\n          id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n          for=\"{{\n            createAttributeValueIdForConfigurator(attribute, value.valueCode)\n          }}\"\n          aria-hidden=\"true\"\n          class=\"form-check-label form-radio-label\"\n          >{{ getLabel(expMode, value.valueDisplay, value.valueCode) }}</label\n        >\n      </div>\n\n      <div class=\"cx-value-price\">\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </div>\n    </div>\n\n    <cx-configurator-attribute-numeric-input-field\n      *ngIf=\"isAdditionalValueNumeric\"\n      class=\"cx-configurator-attribute-additional-value\"\n    ></cx-configurator-attribute-numeric-input-field>\n\n    <cx-configurator-attribute-input-field\n      *ngIf=\"isAdditionalValueAlphaNumeric\"\n      class=\"cx-configurator-attribute-additional-value\"\n    >\n    </cx-configurator-attribute-input-field>\n  </div>\n</fieldset>\n", dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "component", type: ConfiguratorAttributeNumericInputFieldComponent, selector: "cx-configurator-attribute-numeric-input-field" }, { kind: "component", type: ConfiguratorAttributeInputFieldComponent, selector: "cx-configurator-attribute-input-field" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeRadioButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-radio-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<fieldset>\n  <legend style=\"display: none\">{{ attribute.label }}</legend>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n      <cx-configurator-attribute-quantity\n        (changeQuantity)=\"onChangeQuantity($event)\"\n        [quantityOptions]=\"extractQuantityParameters()\"\n      ></cx-configurator-attribute-quantity>\n      <cx-configurator-price\n        [formula]=\"extractPriceFormulaParameters()\"\n      ></cx-configurator-price>\n    </div>\n\n    <div class=\"form-check\" *ngFor=\"let value of attribute.values\">\n      <div class=\"cx-value-label-pair\">\n        <input\n          id=\"{{\n            createAttributeValueIdForConfigurator(attribute, value.valueCode)\n          }}\"\n          class=\"form-check-input\"\n          type=\"radio\"\n          formcontrolname=\"attributeRadioButtonForm\"\n          [formControl]=\"attributeRadioButtonForm\"\n          [attr.required]=\"attribute.required\"\n          [value]=\"value.valueCode\"\n          name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n          attr.name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n          [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n          [attr.aria-label]=\"getAriaLabel(value, attribute)\"\n          [attr.checked]=\"\n            attributeRadioButtonForm.value === value.valueCode\n              ? 'checked'\n              : null\n          \"\n          [attr.aria-describedby]=\"\n            createAttributeUiKey('label', attribute.name)\n          \"\n          (change)=\"onSelect(value.valueCode)\"\n        />\n        <label\n          id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n          for=\"{{\n            createAttributeValueIdForConfigurator(attribute, value.valueCode)\n          }}\"\n          aria-hidden=\"true\"\n          class=\"form-check-label form-radio-label\"\n          >{{ getLabel(expMode, value.valueDisplay, value.valueCode) }}</label\n        >\n      </div>\n\n      <div class=\"cx-value-price\">\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </div>\n    </div>\n\n    <cx-configurator-attribute-numeric-input-field\n      *ngIf=\"isAdditionalValueNumeric\"\n      class=\"cx-configurator-attribute-additional-value\"\n    ></cx-configurator-attribute-numeric-input-field>\n\n    <cx-configurator-attribute-input-field\n      *ngIf=\"isAdditionalValueAlphaNumeric\"\n      class=\"cx-configurator-attribute-additional-value\"\n    >\n    </cx-configurator-attribute-input-field>\n  </div>\n</fieldset>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeQuantityService }, { type: i1$1.TranslationService }, { type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }, { type: ConfiguratorStorefrontUtilsService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeRadioButtonModule {
}
ConfiguratorAttributeRadioButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeRadioButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, declarations: [ConfiguratorAttributeRadioButtonComponent], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule], exports: [ConfiguratorAttributeRadioButtonComponent] });
ConfiguratorAttributeRadioButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_radioGroup: ConfiguratorAttributeRadioButtonComponent,
                    AttributeType_radioGroup_add: ConfiguratorAttributeRadioButtonComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeInputFieldModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeRadioButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        ConfiguratorPriceModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeInputFieldModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_radioGroup: ConfiguratorAttributeRadioButtonComponent,
                                    AttributeType_radioGroup_add: ConfiguratorAttributeRadioButtonComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeRadioButtonComponent],
                    exports: [ConfiguratorAttributeRadioButtonComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeReadOnlyComponent extends ConfiguratorAttributeBaseComponent {
    constructor(translationService, attributeComponentContext) {
        super();
        this.translationService = translationService;
        this.attributeComponentContext = attributeComponentContext;
        this.attribute = attributeComponentContext.attribute;
        this.group = attributeComponentContext.group.id;
        this.expMode = attributeComponentContext.expMode;
    }
    getCurrentValueName(attribute, value) {
        let name = '';
        if (attribute.selectedSingleValue && !value) {
            name = attribute.selectedSingleValue;
        }
        else if (attribute.userInput && !value) {
            name = attribute.userInput;
        }
        else if (value && value.valueDisplay) {
            name = value?.valueDisplay;
        }
        return name;
    }
    getAriaLabel(attribute, value) {
        let ariaLabel = '';
        if (value) {
            const valueName = this.getCurrentValueName(attribute, value);
            if (value.valuePrice && value.valuePrice?.value !== 0) {
                if (value.valuePriceTotal && value.valuePriceTotal?.value !== 0) {
                    ariaLabel = this.translate('configurator.a11y.readOnlyValueOfAttributeFullWithPrice', valueName, attribute, value.valuePriceTotal?.formattedValue);
                }
                else {
                    ariaLabel = this.translate('configurator.a11y.readOnlyValueOfAttributeFullWithPrice', valueName, attribute, value.valuePrice?.formattedValue);
                }
            }
            else {
                ariaLabel = this.translate('configurator.a11y.readOnlyValueOfAttributeFull', valueName, attribute);
            }
        }
        else {
            const valueName = this.getCurrentValueName(attribute);
            ariaLabel = this.translate('configurator.a11y.readOnlyValueOfAttributeFull', valueName, attribute);
        }
        return ariaLabel;
    }
    translate(resourceKey, valueName, attribute, formattedPrice) {
        let ariaLabel = '';
        const options = formattedPrice
            ? {
                value: valueName,
                attribute: attribute.label,
                price: formattedPrice,
            }
            : {
                value: valueName,
                attribute: attribute.label,
            };
        this.translationService
            .translate(resourceKey, options)
            .pipe(take(1))
            .subscribe((text) => (ariaLabel = text));
        return ariaLabel;
    }
    /**
     * Extract corresponding value price formula parameters.
     * For the read-only attribute types the complete price formula should be displayed at the value level.
     *
     * @param {Configurator.Value} value - Configurator value
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractValuePriceFormulaParameters(value) {
        return {
            quantity: value.quantity,
            price: value.valuePrice,
            priceTotal: value.valuePriceTotal,
            isLightedUp: value.selected,
        };
    }
}
ConfiguratorAttributeReadOnlyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyComponent, deps: [{ token: i1$1.TranslationService }, { token: ConfiguratorAttributeCompositionContext }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeReadOnlyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeReadOnlyComponent, selector: "cx-configurator-attribute-read-only", usesInheritance: true, ngImport: i0, template: "<fieldset>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <ng-container\n      *ngIf=\"\n        attribute.values && attribute.values.length > 0;\n        else noStaticDomain\n      \"\n    >\n      <ng-container *ngFor=\"let value of attribute.values\">\n        <div *ngIf=\"value.selected\" class=\"form-check\">\n          <span\n            id=\"{{\n              createValueUiKey('label', attribute.name, value.valueCode)\n            }}\"\n            tabindex=\"0\"\n            class=\"cx-visually-hidden\"\n          >\n            {{ getAriaLabel(attribute, value) }}\n          </span>\n          <div class=\"cx-value-label-pair\">\n            <label\n              id=\"{{\n                createValueUiKey('label', attribute.name, value.valueCode)\n              }}\"\n              aria-hidden=\"true\"\n              class=\"cx-read-only-attribute-label\"\n              >{{\n                getLabel(expMode, value.valueDisplay, value.valueCode)\n              }}</label\n            >\n          </div>\n          <div class=\"cx-value-price\">\n            <cx-configurator-price\n              [formula]=\"extractValuePriceFormulaParameters(value)\"\n            ></cx-configurator-price>\n          </div>\n        </div>\n      </ng-container>\n    </ng-container>\n    <ng-template #noStaticDomain>\n      <ng-container *ngIf=\"attribute.selectedSingleValue\">\n        <span\n          id=\"{{\n            createValueUiKey(\n              'label',\n              attribute.name,\n              attribute.selectedSingleValue\n            )\n          }}\"\n          tabindex=\"0\"\n          class=\"cx-visually-hidden\"\n        >\n          {{ getAriaLabel(attribute) }}\n        </span>\n        <div class=\"cx-read-only-attribute-label\" aria-hidden=\"true\">\n          <span aria-hidden=\"true\">{{ attribute.selectedSingleValue }}</span>\n        </div>\n      </ng-container>\n      <ng-container *ngIf=\"attribute.userInput\">\n        <span\n          id=\"{{\n            createValueUiKey('label', attribute.name, attribute.userInput)\n          }}\"\n          tabindex=\"0\"\n          class=\"cx-visually-hidden\"\n        >\n          {{ getAriaLabel(attribute) }}\n        </span>\n        <div class=\"cx-read-only-attribute-label\" aria-hidden=\"true\">\n          <span aria-hidden=\"true\">{{ attribute.userInput }}</span>\n        </div>\n      </ng-container>\n    </ng-template>\n  </div>\n</fieldset>\n", dependencies: [{ kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-read-only', changeDetection: ChangeDetectionStrategy.OnPush, template: "<fieldset>\n  <div id=\"{{ createAttributeIdForConfigurator(attribute) }}\">\n    <ng-container\n      *ngIf=\"\n        attribute.values && attribute.values.length > 0;\n        else noStaticDomain\n      \"\n    >\n      <ng-container *ngFor=\"let value of attribute.values\">\n        <div *ngIf=\"value.selected\" class=\"form-check\">\n          <span\n            id=\"{{\n              createValueUiKey('label', attribute.name, value.valueCode)\n            }}\"\n            tabindex=\"0\"\n            class=\"cx-visually-hidden\"\n          >\n            {{ getAriaLabel(attribute, value) }}\n          </span>\n          <div class=\"cx-value-label-pair\">\n            <label\n              id=\"{{\n                createValueUiKey('label', attribute.name, value.valueCode)\n              }}\"\n              aria-hidden=\"true\"\n              class=\"cx-read-only-attribute-label\"\n              >{{\n                getLabel(expMode, value.valueDisplay, value.valueCode)\n              }}</label\n            >\n          </div>\n          <div class=\"cx-value-price\">\n            <cx-configurator-price\n              [formula]=\"extractValuePriceFormulaParameters(value)\"\n            ></cx-configurator-price>\n          </div>\n        </div>\n      </ng-container>\n    </ng-container>\n    <ng-template #noStaticDomain>\n      <ng-container *ngIf=\"attribute.selectedSingleValue\">\n        <span\n          id=\"{{\n            createValueUiKey(\n              'label',\n              attribute.name,\n              attribute.selectedSingleValue\n            )\n          }}\"\n          tabindex=\"0\"\n          class=\"cx-visually-hidden\"\n        >\n          {{ getAriaLabel(attribute) }}\n        </span>\n        <div class=\"cx-read-only-attribute-label\" aria-hidden=\"true\">\n          <span aria-hidden=\"true\">{{ attribute.selectedSingleValue }}</span>\n        </div>\n      </ng-container>\n      <ng-container *ngIf=\"attribute.userInput\">\n        <span\n          id=\"{{\n            createValueUiKey('label', attribute.name, attribute.userInput)\n          }}\"\n          tabindex=\"0\"\n          class=\"cx-visually-hidden\"\n        >\n          {{ getAriaLabel(attribute) }}\n        </span>\n        <div class=\"cx-read-only-attribute-label\" aria-hidden=\"true\">\n          <span aria-hidden=\"true\">{{ attribute.userInput }}</span>\n        </div>\n      </ng-container>\n    </ng-template>\n  </div>\n</fieldset>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.TranslationService }, { type: ConfiguratorAttributeCompositionContext }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeReadOnlyModule {
}
ConfiguratorAttributeReadOnlyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeReadOnlyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, declarations: [ConfiguratorAttributeReadOnlyComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        CommonModule,
        I18nModule], exports: [ConfiguratorAttributeReadOnlyComponent] });
ConfiguratorAttributeReadOnlyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_readonly: ConfiguratorAttributeReadOnlyComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        ConfiguratorPriceModule,
        CommonModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeReadOnlyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ConfiguratorPriceModule,
                        CommonModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_readonly: ConfiguratorAttributeReadOnlyComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeReadOnlyComponent],
                    exports: [ConfiguratorAttributeReadOnlyComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeSingleSelectionBundleDropdownComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
    constructor(quantityService, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService) {
        super(quantityService, translation, attributeComponentContext, configuratorCommonsService, configuratorStorefrontUtilsService);
        this.quantityService = quantityService;
        this.translation = translation;
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.RETRACT_VALUE_CODE = Configurator.RetractValueCode;
        this.attributeDropDownForm = new UntypedFormControl('');
        this.group = attributeComponentContext.group.id;
    }
    ngOnInit() {
        this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);
        const values = this.attribute.values;
        if (values && values.length > 0) {
            const selectedValue = values.find((value) => value.selected);
            if (selectedValue) {
                this.selectionValue = selectedValue;
            }
        }
    }
    /**
     * Returns selected value. We assume that when this method is called,
     * a selection has been made before. In case this assumption is false,
     * an error is thrown
     * @returns selected value
     */
    get selectedValue() {
        let selectedValue;
        if (this.selectionValue) {
            selectedValue = this.selectionValue;
        }
        else {
            throw new Error('selectedValue called without a defined selectionValue');
        }
        return selectedValue;
    }
    /**
     * Extract corresponding product card parameters
     *
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters() {
        return {
            hideRemoveButton: true,
            productBoundValue: this.selectedValue,
            singleDropdown: true,
            withQuantity: false,
            loading$: this.loading$,
            attributeId: this.getAttributeCode(this.attribute),
            attributeName: this.attribute.name,
            itemCount: 0,
            itemIndex: 0,
        };
    }
    /**
     * Verifies whether a selection value is defined and its value code is not a retract one.
     *
     * @returns {boolean} - 'True' if a selection value is defined and its value code is not a retract one, otherwise 'false'.
     */
    isNotRetractValue() {
        return ((this.selectionValue &&
            this.selectionValue?.valueCode !== Configurator.RetractValueCode) ??
            false);
    }
    /**
     * Verifies whether a value code is a retract one.
     *
     * @param {string} valueCode - Value code
     * @returns {boolean} - 'True' if a value code is a retract one, otherwise 'false'.
     */
    isRetractValue(valueCode) {
        return valueCode === Configurator.RetractValueCode;
    }
}
ConfiguratorAttributeSingleSelectionBundleDropdownComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownComponent, deps: [{ token: ConfiguratorAttributeQuantityService }, { token: i1$1.TranslationService }, { token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }, { token: ConfiguratorStorefrontUtilsService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeSingleSelectionBundleDropdownComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeSingleSelectionBundleDropdownComponent, selector: "cx-configurator-attribute-single-selection-bundle-dropdown", usesInheritance: true, ngImport: i0, template: "<div class=\"form-group\" *ngIf=\"attribute?.values?.length\">\n  <label\n    for=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'configurator.a11y.listbox'\n        | cxTranslate\n          : {\n              count: attribute.values?.length\n            }\n    }}\n  </label>\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <select\n      id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      class=\"form-control\"\n      [formControl]=\"attributeDropDownForm\"\n      [cxFocus]=\"{ key: attribute.name }\"\n      (change)=\"onSelect(attributeDropDownForm.value)\"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >\n      <option\n        *ngFor=\"let item of attribute.values\"\n        [label]=\"getLabel(false, item.valueDisplay, undefined, item)\"\n        [selected]=\"item.selected\"\n        [value]=\"item.valueCode\"\n        [attr.aria-label]=\"\n          isRetractValue(item.valueCode)\n            ? ('configurator.a11y.forAttribute'\n              | cxTranslate\n                : { value: item.valueDisplay, attribute: attribute.label })\n            : item.valuePrice && item.valuePrice?.value !== 0\n            ? ('configurator.a11y.selectedValueOfAttributeFullWithPrice'\n              | cxTranslate\n                : {\n                    value: item.valueDisplay,\n                    attribute: attribute.label,\n                    price: item.valuePriceTotal?.formattedValue ?? 0\n                  })\n            : ('configurator.a11y.selectedValueOfAttributeFull'\n              | cxTranslate\n                : { value: item.valueDisplay, attribute: attribute.label })\n        \"\n        [value]=\"item.valueCode\"\n      >\n        {{ getLabel(false, item.valueDisplay, undefined, item) }}\n      </option>\n    </select>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <select\n      id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [formControl]=\"attributeDropDownForm\"\n      [cxFocus]=\"{ key: attribute.name }\"\n      (change)=\"onSelect(attributeDropDownForm.value)\"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >\n      <option\n        *ngFor=\"let item of attribute.values\"\n        [label]=\"getLabel(false, item.valueDisplay, undefined, item)\"\n        [selected]=\"item.selected\"\n        [value]=\"item.valueCode\"\n        [attr.aria-label]=\"\n          isRetractValue(item.valueCode)\n            ? ('configurator.a11y.forAttribute'\n              | cxTranslate\n                : { value: item.valueDisplay, attribute: attribute.label })\n            : item.valuePrice && item.valuePrice?.value !== 0\n            ? ('configurator.a11y.selectedValueOfAttributeFullWithPrice'\n              | cxTranslate\n                : {\n                    value: item.valueDisplay,\n                    attribute: attribute.label,\n                    price: item.valuePriceTotal?.formattedValue ?? 0\n                  })\n            : ('configurator.a11y.selectedValueOfAttributeFull'\n              | cxTranslate\n                : { value: item.valueDisplay, attribute: attribute.label })\n        \"\n        [value]=\"item.valueCode\"\n      >\n        {{ getLabel(false, item.valueDisplay, undefined, item) }}\n      </option>\n    </select>\n  </ng-container>\n</div>\n\n<cx-configurator-attribute-product-card\n  *ngIf=\"isNotRetractValue()\"\n  id=\"{{\n    createAttributeValueIdForConfigurator(attribute, selectedValue.valueCode)\n  }}\"\n  (handleDeselect)=\"onSelect(RETRACT_VALUE_CODE)\"\n  [productCardOptions]=\"extractProductCardParameters()\"\n>\n</cx-configurator-attribute-product-card>\n\n<div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n  <cx-configurator-attribute-quantity\n    (changeQuantity)=\"onChangeQuantity($event, attributeDropDownForm)\"\n    [quantityOptions]=\"extractQuantityParameters(attributeDropDownForm)\"\n  ></cx-configurator-attribute-quantity>\n  <cx-configurator-price\n    [formula]=\"extractPriceFormulaParameters()\"\n  ></cx-configurator-price>\n</div>\n", dependencies: [{ kind: "directive", type: i4$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: ["productCardOptions"], outputs: ["handleDeselect", "handleQuantity", "handleSelect"] }, { kind: "directive", type: i8.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i8.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-single-selection-bundle-dropdown', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"form-group\" *ngIf=\"attribute?.values?.length\">\n  <label\n    for=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n    class=\"cx-visually-hidden\"\n  >\n    {{\n      'configurator.a11y.listbox'\n        | cxTranslate\n          : {\n              count: attribute.values?.length\n            }\n    }}\n  </label>\n  <ng-container *cxFeatureLevel=\"'!6.2'\">\n    <select\n      id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      class=\"form-control\"\n      [formControl]=\"attributeDropDownForm\"\n      [cxFocus]=\"{ key: attribute.name }\"\n      (change)=\"onSelect(attributeDropDownForm.value)\"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >\n      <option\n        *ngFor=\"let item of attribute.values\"\n        [label]=\"getLabel(false, item.valueDisplay, undefined, item)\"\n        [selected]=\"item.selected\"\n        [value]=\"item.valueCode\"\n        [attr.aria-label]=\"\n          isRetractValue(item.valueCode)\n            ? ('configurator.a11y.forAttribute'\n              | cxTranslate\n                : { value: item.valueDisplay, attribute: attribute.label })\n            : item.valuePrice && item.valuePrice?.value !== 0\n            ? ('configurator.a11y.selectedValueOfAttributeFullWithPrice'\n              | cxTranslate\n                : {\n                    value: item.valueDisplay,\n                    attribute: attribute.label,\n                    price: item.valuePriceTotal?.formattedValue ?? 0\n                  })\n            : ('configurator.a11y.selectedValueOfAttributeFull'\n              | cxTranslate\n                : { value: item.valueDisplay, attribute: attribute.label })\n        \"\n        [value]=\"item.valueCode\"\n      >\n        {{ getLabel(false, item.valueDisplay, undefined, item) }}\n      </option>\n    </select>\n  </ng-container>\n  <ng-container *cxFeatureLevel=\"'6.2'\">\n    <select\n      id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      class=\"form-control\"\n      [ngClass]=\"{\n        'cx-required-error-msg ': (showRequiredErrorMessage$ | async)\n      }\"\n      [formControl]=\"attributeDropDownForm\"\n      [cxFocus]=\"{ key: attribute.name }\"\n      (change)=\"onSelect(attributeDropDownForm.value)\"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n    >\n      <option\n        *ngFor=\"let item of attribute.values\"\n        [label]=\"getLabel(false, item.valueDisplay, undefined, item)\"\n        [selected]=\"item.selected\"\n        [value]=\"item.valueCode\"\n        [attr.aria-label]=\"\n          isRetractValue(item.valueCode)\n            ? ('configurator.a11y.forAttribute'\n              | cxTranslate\n                : { value: item.valueDisplay, attribute: attribute.label })\n            : item.valuePrice && item.valuePrice?.value !== 0\n            ? ('configurator.a11y.selectedValueOfAttributeFullWithPrice'\n              | cxTranslate\n                : {\n                    value: item.valueDisplay,\n                    attribute: attribute.label,\n                    price: item.valuePriceTotal?.formattedValue ?? 0\n                  })\n            : ('configurator.a11y.selectedValueOfAttributeFull'\n              | cxTranslate\n                : { value: item.valueDisplay, attribute: attribute.label })\n        \"\n        [value]=\"item.valueCode\"\n      >\n        {{ getLabel(false, item.valueDisplay, undefined, item) }}\n      </option>\n    </select>\n  </ng-container>\n</div>\n\n<cx-configurator-attribute-product-card\n  *ngIf=\"isNotRetractValue()\"\n  id=\"{{\n    createAttributeValueIdForConfigurator(attribute, selectedValue.valueCode)\n  }}\"\n  (handleDeselect)=\"onSelect(RETRACT_VALUE_CODE)\"\n  [productCardOptions]=\"extractProductCardParameters()\"\n>\n</cx-configurator-attribute-product-card>\n\n<div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n  <cx-configurator-attribute-quantity\n    (changeQuantity)=\"onChangeQuantity($event, attributeDropDownForm)\"\n    [quantityOptions]=\"extractQuantityParameters(attributeDropDownForm)\"\n  ></cx-configurator-attribute-quantity>\n  <cx-configurator-price\n    [formula]=\"extractPriceFormulaParameters()\"\n  ></cx-configurator-price>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeQuantityService }, { type: i1$1.TranslationService }, { type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }, { type: ConfiguratorStorefrontUtilsService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeSingleSelectionBundleDropdownModule {
}
ConfiguratorAttributeSingleSelectionBundleDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeSingleSelectionBundleDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, declarations: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule,
        FeaturesConfigModule], exports: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent] });
ConfiguratorAttributeSingleSelectionBundleDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_dropdownProduct: ConfiguratorAttributeSingleSelectionBundleDropdownComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        FormsModule,
        I18nModule,
        KeyboardFocusModule,
        NgSelectModule,
        ReactiveFormsModule,
        ConfiguratorAttributeQuantityModule,
        ConfiguratorPriceModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        FormsModule,
                        I18nModule,
                        KeyboardFocusModule,
                        NgSelectModule,
                        ReactiveFormsModule,
                        ConfiguratorAttributeQuantityModule,
                        ConfiguratorPriceModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_dropdownProduct: ConfiguratorAttributeSingleSelectionBundleDropdownComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent],
                    exports: [ConfiguratorAttributeSingleSelectionBundleDropdownComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeSingleSelectionBundleComponent extends ConfiguratorAttributeSingleSelectionBaseComponent {
    /**
     * Extract corresponding product card parameters
     *
     * @param {Configurator.Value} value - Value
     * @param {number} index - index of current value in list of values of attribute
     * @return {ConfiguratorAttributeProductCardComponentOptions} - New product card options
     */
    extractProductCardParameters(value, index) {
        return {
            hideRemoveButton: this.attribute.required,
            fallbackFocusId: this.getFocusIdOfNearestValue(value),
            productBoundValue: value,
            loading$: this.loading$,
            attributeId: this.getAttributeCode(this.attribute),
            attributeLabel: this.attribute.label,
            attributeName: this.attribute.name,
            itemCount: this.attribute.values?.length
                ? this.attribute.values.length
                : 0,
            itemIndex: index,
        };
    }
    getFocusIdOfNearestValue(currentValue) {
        if (!this.attribute.values) {
            return 'n/a';
        }
        let prevIdx = this.attribute.values.findIndex((value) => value.valueCode === currentValue.valueCode);
        prevIdx--;
        if (prevIdx < 0) {
            prevIdx = this.attribute.values.length > 1 ? 1 : 0;
        }
        return this.createFocusId(this.getAttributeCode(this.attribute).toString(), this.attribute.values[prevIdx].valueCode);
    }
}
ConfiguratorAttributeSingleSelectionBundleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeSingleSelectionBundleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeSingleSelectionBundleComponent, selector: "cx-configurator-attribute-single-selection-bundle", usesInheritance: true, ngImport: i0, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters()\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    [id]=\"createAttributeValueIdForConfigurator(attribute, value.valueCode)\"\n    (handleDeselect)=\"onSelect('')\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"extractProductCardParameters(value, i)\"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n", dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorAttributeProductCardComponent, selector: "cx-configurator-attribute-product-card", inputs: ["productCardOptions"], outputs: ["handleDeselect", "handleQuantity", "handleSelect"] }, { kind: "component", type: ConfiguratorAttributeQuantityComponent, selector: "cx-configurator-attribute-quantity", inputs: ["quantityOptions"], outputs: ["changeQuantity"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-single-selection-bundle', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  *ngIf=\"attribute?.values?.length\"\n>\n  <div *ngIf=\"withQuantity\" class=\"cx-attribute-level-quantity-price\">\n    <cx-configurator-attribute-quantity\n      (changeQuantity)=\"onChangeQuantity($event)\"\n      [quantityOptions]=\"extractQuantityParameters()\"\n    ></cx-configurator-attribute-quantity>\n\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n\n  <cx-configurator-attribute-product-card\n    [id]=\"createAttributeValueIdForConfigurator(attribute, value.valueCode)\"\n    (handleDeselect)=\"onSelect('')\"\n    (handleSelect)=\"onSelect($event)\"\n    *ngFor=\"let value of attribute?.values; let i = index\"\n    [productCardOptions]=\"extractProductCardParameters(value, i)\"\n  >\n  </cx-configurator-attribute-product-card>\n</div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeSingleSelectionBundleModule {
}
ConfiguratorAttributeSingleSelectionBundleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeSingleSelectionBundleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, declarations: [ConfiguratorAttributeSingleSelectionBundleComponent], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeSingleSelectionBundleComponent] });
ConfiguratorAttributeSingleSelectionBundleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_radioGroupProduct: ConfiguratorAttributeSingleSelectionBundleComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorAttributeProductCardModule,
        ConfiguratorAttributeQuantityModule,
        FormsModule,
        I18nModule,
        ItemCounterModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionBundleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorAttributeProductCardModule,
                        ConfiguratorAttributeQuantityModule,
                        FormsModule,
                        I18nModule,
                        ItemCounterModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        ConfiguratorPriceModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_radioGroupProduct: ConfiguratorAttributeSingleSelectionBundleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeSingleSelectionBundleComponent],
                    exports: [ConfiguratorAttributeSingleSelectionBundleComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeSingleSelectionImageComponent extends ConfiguratorAttributeBaseComponent {
    constructor(attributeComponentContext, configuratorCommonsService) {
        super();
        this.attributeComponentContext = attributeComponentContext;
        this.configuratorCommonsService = configuratorCommonsService;
        this.attributeRadioButtonForm = new UntypedFormControl('');
        this.attribute = attributeComponentContext.attribute;
        this.ownerKey = attributeComponentContext.owner.key;
        this.expMode = attributeComponentContext.expMode;
    }
    ngOnInit() {
        this.attributeRadioButtonForm.setValue(this.attribute.selectedSingleValue);
    }
    /**
     * Submits a value.
     *
     * @param {string} value - Selected value
     */
    onClick(value) {
        this.configuratorCommonsService.updateConfiguration(this.ownerKey, {
            ...this.attribute,
            selectedSingleValue: value,
        }, Configurator.UpdateType.ATTRIBUTE);
    }
    extractValuePriceFormulaParameters(value) {
        return {
            price: value?.valuePrice,
            isLightedUp: value ? value.selected : false,
        };
    }
}
ConfiguratorAttributeSingleSelectionImageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageComponent, deps: [{ token: ConfiguratorAttributeCompositionContext }, { token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorAttributeSingleSelectionImageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeSingleSelectionImageComponent, selector: "cx-configurator-attribute-single-selection-image", usesInheritance: true, ngImport: i0, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  class=\"cx-row\"\n  role=\"radiogroup\"\n>\n  <div\n    *ngFor=\"let value of attribute.values\"\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    class=\"cx-configurator-select\"\n  >\n    <input\n      id=\"{{\n        createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n          '-input'\n      }}\"\n      type=\"radio\"\n      class=\"form-input\"\n      [value]=\"value.valueCode\"\n      formcontrolname=\"attributeRadioButtonForm\"\n      [formControl]=\"attributeRadioButtonForm\"\n      [value]=\"value.valueCode\"\n      name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      attr.name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      [attr.required]=\"attribute.required\"\n      [attr.checked]=\"\n        attributeRadioButtonForm.value === value.valueCode ? 'checked' : null\n      \"\n      [attr.aria-checked]=\"\n        attributeRadioButtonForm.value === value.valueCode ? 'true' : 'false'\n      \"\n      [attr.aria-label]=\"\n        value.valuePrice && value.valuePrice?.value !== 0\n          ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label,\n                  price: value.valuePrice.formattedValue\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : { value: value.valueDisplay, attribute: attribute.label })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      (click)=\"onClick(value.valueCode)\"\n      [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n      role=\"radio\"\n    />\n    <div class=\"cx-label-container\">\n      <label\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n            '-input'\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label form-radio-label\"\n      >\n        <img\n          *ngIf=\"getImage(value)\"\n          class=\"cx-img\"\n          src=\"{{ getImage(value)?.url }}\"\n          alt=\"{{ getImage(value)?.altText }}\"\n        />\n        <div *ngIf=\"!getImage(value)\" class=\"cx-img-dummy\"></div>\n        {{ getLabel(expMode, value.valueDisplay, value.valueCode) }}\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </label>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i8.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i8.RadioControlValueAccessor, selector: "input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]", inputs: ["name", "formControlName", "value"] }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-attribute-single-selection-image', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  id=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n  class=\"cx-row\"\n  role=\"radiogroup\"\n>\n  <div\n    *ngFor=\"let value of attribute.values\"\n    id=\"{{ createAttributeValueIdForConfigurator(attribute, value.valueCode) }}\"\n    class=\"cx-configurator-select\"\n  >\n    <input\n      id=\"{{\n        createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n          '-input'\n      }}\"\n      type=\"radio\"\n      class=\"form-input\"\n      [value]=\"value.valueCode\"\n      formcontrolname=\"attributeRadioButtonForm\"\n      [formControl]=\"attributeRadioButtonForm\"\n      [value]=\"value.valueCode\"\n      name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      attr.name=\"{{ createAttributeIdForConfigurator(attribute) }}\"\n      [attr.required]=\"attribute.required\"\n      [attr.checked]=\"\n        attributeRadioButtonForm.value === value.valueCode ? 'checked' : null\n      \"\n      [attr.aria-checked]=\"\n        attributeRadioButtonForm.value === value.valueCode ? 'true' : 'false'\n      \"\n      [attr.aria-label]=\"\n        value.valuePrice && value.valuePrice?.value !== 0\n          ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n            | cxTranslate\n              : {\n                  value: value.valueDisplay,\n                  attribute: attribute.label,\n                  price: value.valuePrice.formattedValue\n                })\n          : ('configurator.a11y.valueOfAttributeFull'\n            | cxTranslate\n              : { value: value.valueDisplay, attribute: attribute.label })\n      \"\n      [attr.aria-describedby]=\"createAttributeUiKey('label', attribute.name)\"\n      (click)=\"onClick(value.valueCode)\"\n      [cxFocus]=\"{ key: attribute.name + '-' + value.name }\"\n      role=\"radio\"\n    />\n    <div class=\"cx-label-container\">\n      <label\n        id=\"{{ createValueUiKey('label', attribute.name, value.valueCode) }}\"\n        for=\"{{\n          createAttributeValueIdForConfigurator(attribute, value.valueCode) +\n            '-input'\n        }}\"\n        aria-hidden=\"true\"\n        class=\"form-check-label form-radio-label\"\n      >\n        <img\n          *ngIf=\"getImage(value)\"\n          class=\"cx-img\"\n          src=\"{{ getImage(value)?.url }}\"\n          alt=\"{{ getImage(value)?.altText }}\"\n        />\n        <div *ngIf=\"!getImage(value)\" class=\"cx-img-dummy\"></div>\n        {{ getLabel(expMode, value.valueDisplay, value.valueCode) }}\n        <cx-configurator-price\n          [formula]=\"extractValuePriceFormulaParameters(value)\"\n        ></cx-configurator-price>\n      </label>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorAttributeCompositionContext }, { type: ConfiguratorCommonsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeSingleSelectionImageModule {
}
ConfiguratorAttributeSingleSelectionImageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeSingleSelectionImageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageModule, declarations: [ConfiguratorAttributeSingleSelectionImageComponent], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule], exports: [ConfiguratorAttributeSingleSelectionImageComponent] });
ConfiguratorAttributeSingleSelectionImageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageModule, providers: [
        provideDefaultConfig({
            productConfigurator: {
                assignment: {
                    AttributeType_single_selection_image: ConfiguratorAttributeSingleSelectionImageComponent,
                },
            },
        }),
    ], imports: [KeyboardFocusModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeSingleSelectionImageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        KeyboardFocusModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        ConfiguratorPriceModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            productConfigurator: {
                                assignment: {
                                    AttributeType_single_selection_image: ConfiguratorAttributeSingleSelectionImageComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorAttributeSingleSelectionImageComponent],
                    exports: [ConfiguratorAttributeSingleSelectionImageComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCompositionConfig {
}
ConfiguratorAttributeCompositionConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorAttributeCompositionConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCompositionDirective {
    constructor(vcr, configuratorAttributeCompositionConfig) {
        this.vcr = vcr;
        this.configuratorAttributeCompositionConfig = configuratorAttributeCompositionConfig;
        this.logger = inject(LoggerService);
    }
    ngOnInit() {
        const componentKey = this.context.componentKey;
        const composition = this.configuratorAttributeCompositionConfig.productConfigurator
            ?.assignment;
        if (composition) {
            this.renderComponent(composition[componentKey], componentKey);
        }
    }
    renderComponent(component, componentKey) {
        if (component) {
            this.vcr.createComponent(component, {
                injector: this.getComponentInjector(),
            });
        }
        else {
            if (isDevMode()) {
                this.logger.warn('No attribute type component available for: ' + componentKey);
            }
        }
    }
    getComponentInjector() {
        return Injector.create({
            providers: [
                {
                    provide: ConfiguratorAttributeCompositionContext,
                    useValue: this.context,
                },
            ],
            parent: this.vcr.injector,
        });
    }
}
ConfiguratorAttributeCompositionDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionDirective, deps: [{ token: i0.ViewContainerRef }, { token: ConfiguratorAttributeCompositionConfig }], target: i0.ɵɵFactoryTarget.Directive });
ConfiguratorAttributeCompositionDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorAttributeCompositionDirective, selector: "[cxConfiguratorAttributeComponent]", inputs: { context: ["cxConfiguratorAttributeComponent", "context"] }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxConfiguratorAttributeComponent]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }, { type: ConfiguratorAttributeCompositionConfig }]; }, propDecorators: { context: [{
                type: Input,
                args: ['cxConfiguratorAttributeComponent']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorAttributeCompositionModule {
}
ConfiguratorAttributeCompositionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorAttributeCompositionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionModule, declarations: [ConfiguratorAttributeCompositionDirective], imports: [CommonModule], exports: [ConfiguratorAttributeCompositionDirective] });
ConfiguratorAttributeCompositionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorAttributeCompositionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [ConfiguratorAttributeCompositionDirective],
                    exports: [ConfiguratorAttributeCompositionDirective],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorMessageConfig {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictAndErrorMessagesComponent {
    toggleWarnings() {
        this.showWarnings = !this.showWarnings;
    }
    toggleErrors() {
        this.showErrors = !this.showErrors;
    }
    constructor(configuratorCommonsService, configRouterExtractorService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.iconTypes = ICON_TYPE;
        this.configuration$ = this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)));
        this.showWarnings = false;
        this.showErrors = false;
    }
}
ConfiguratorConflictAndErrorMessagesComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorConflictAndErrorMessagesComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorConflictAndErrorMessagesComponent, selector: "cx-configuration-conflict-and-error-messages", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"(configuration?.warningMessages?.length ?? 0) > 0\">\n    <div\n      aria-live=\"assertive\"\n      aria-atomic=\"true\"\n      class=\"alert-message alert-message-invalid-warning\"\n    >\n      <span class=\"alert-icon\">\n        <cx-icon type=\"WARNING\"></cx-icon>\n      </span>\n      <span\n        class=\"cx-warning-text\"\n        *ngIf=\"(configuration?.warningMessages?.length ?? 0) > 1\"\n      >\n        {{ 'configurator.header.multipleWarnings' | cxTranslate }}</span\n      >\n      <button\n        (click)=\"toggleWarnings()\"\n        *ngIf=\"(configuration?.warningMessages?.length ?? 0) > 1\"\n        class=\"cx-warning-toggle\"\n        [attr.aria-expanded]=\"showWarnings\"\n      >\n        {{ 'configurator.header.reviewWarnings' | cxTranslate }}\n\n        <ng-container *ngIf=\"!showWarnings\">\n          <cx-icon type=\"CARET_DOWN\"></cx-icon>\n        </ng-container>\n\n        <ng-container *ngIf=\"showWarnings\">\n          <cx-icon type=\"CARET_UP\"></cx-icon>\n        </ng-container>\n      </button>\n      <div\n        class=\"cx-warning-messages\"\n        [class.inline]=\"configuration?.warningMessages?.length === 1\"\n      >\n        <div\n          class=\"cx-warning-message\"\n          [class.open]=\"\n            showWarnings || configuration?.warningMessages?.length === 1\n          \"\n          *ngFor=\"let warningMessage of configuration.warningMessages\"\n        >\n          {{ warningMessage }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"(configuration?.errorMessages?.length ?? 0) > 0\">\n    <div\n      aria-live=\"assertive\"\n      aria-atomic=\"true\"\n      role=\"alert\"\n      class=\"alert-message alert-message-error\"\n    >\n      <span class=\"alert-icon\">\n        <cx-icon type=\"ERROR\"></cx-icon>\n      </span>\n      <span\n        class=\"cx-error-text\"\n        *ngIf=\"(configuration?.errorMessages?.length ?? 0) > 1\"\n      >\n        {{ 'configurator.header.multipleErrors' | cxTranslate }}</span\n      >\n      <button\n        (click)=\"toggleErrors()\"\n        *ngIf=\"(configuration?.errorMessages?.length ?? 0) > 1\"\n        class=\"cx-error-toggle\"\n        [attr.aria-expanded]=\"showErrors\"\n      >\n        {{ 'configurator.header.reviewErrors' | cxTranslate }}\n        <ng-container *ngIf=\"!showErrors\">\n          <cx-icon type=\"CARET_DOWN\"></cx-icon>\n        </ng-container>\n\n        <ng-container *ngIf=\"showErrors\">\n          <cx-icon type=\"CARET_UP\"></cx-icon>\n        </ng-container>\n      </button>\n      <div\n        class=\"cx-error-messages\"\n        [class.inline]=\"configuration?.errorMessages?.length === 1\"\n      >\n        <div\n          class=\"cx-error-message\"\n          [class.open]=\"\n            showErrors || configuration?.errorMessages?.length === 1\n          \"\n          *ngFor=\"let errorMessage of configuration.errorMessages\"\n        >\n          {{ errorMessage }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configuration-conflict-and-error-messages', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"(configuration?.warningMessages?.length ?? 0) > 0\">\n    <div\n      aria-live=\"assertive\"\n      aria-atomic=\"true\"\n      class=\"alert-message alert-message-invalid-warning\"\n    >\n      <span class=\"alert-icon\">\n        <cx-icon type=\"WARNING\"></cx-icon>\n      </span>\n      <span\n        class=\"cx-warning-text\"\n        *ngIf=\"(configuration?.warningMessages?.length ?? 0) > 1\"\n      >\n        {{ 'configurator.header.multipleWarnings' | cxTranslate }}</span\n      >\n      <button\n        (click)=\"toggleWarnings()\"\n        *ngIf=\"(configuration?.warningMessages?.length ?? 0) > 1\"\n        class=\"cx-warning-toggle\"\n        [attr.aria-expanded]=\"showWarnings\"\n      >\n        {{ 'configurator.header.reviewWarnings' | cxTranslate }}\n\n        <ng-container *ngIf=\"!showWarnings\">\n          <cx-icon type=\"CARET_DOWN\"></cx-icon>\n        </ng-container>\n\n        <ng-container *ngIf=\"showWarnings\">\n          <cx-icon type=\"CARET_UP\"></cx-icon>\n        </ng-container>\n      </button>\n      <div\n        class=\"cx-warning-messages\"\n        [class.inline]=\"configuration?.warningMessages?.length === 1\"\n      >\n        <div\n          class=\"cx-warning-message\"\n          [class.open]=\"\n            showWarnings || configuration?.warningMessages?.length === 1\n          \"\n          *ngFor=\"let warningMessage of configuration.warningMessages\"\n        >\n          {{ warningMessage }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"(configuration?.errorMessages?.length ?? 0) > 0\">\n    <div\n      aria-live=\"assertive\"\n      aria-atomic=\"true\"\n      role=\"alert\"\n      class=\"alert-message alert-message-error\"\n    >\n      <span class=\"alert-icon\">\n        <cx-icon type=\"ERROR\"></cx-icon>\n      </span>\n      <span\n        class=\"cx-error-text\"\n        *ngIf=\"(configuration?.errorMessages?.length ?? 0) > 1\"\n      >\n        {{ 'configurator.header.multipleErrors' | cxTranslate }}</span\n      >\n      <button\n        (click)=\"toggleErrors()\"\n        *ngIf=\"(configuration?.errorMessages?.length ?? 0) > 1\"\n        class=\"cx-error-toggle\"\n        [attr.aria-expanded]=\"showErrors\"\n      >\n        {{ 'configurator.header.reviewErrors' | cxTranslate }}\n        <ng-container *ngIf=\"!showErrors\">\n          <cx-icon type=\"CARET_DOWN\"></cx-icon>\n        </ng-container>\n\n        <ng-container *ngIf=\"showErrors\">\n          <cx-icon type=\"CARET_UP\"></cx-icon>\n        </ng-container>\n      </button>\n      <div\n        class=\"cx-error-messages\"\n        [class.inline]=\"configuration?.errorMessages?.length === 1\"\n      >\n        <div\n          class=\"cx-error-message\"\n          [class.open]=\"\n            showErrors || configuration?.errorMessages?.length === 1\n          \"\n          *ngFor=\"let errorMessage of configuration.errorMessages\"\n        >\n          {{ errorMessage }}\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictAndErrorMessagesModule {
}
ConfiguratorConflictAndErrorMessagesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictAndErrorMessagesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, declarations: [ConfiguratorConflictAndErrorMessagesComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule], exports: [ConfiguratorConflictAndErrorMessagesComponent] });
ConfiguratorConflictAndErrorMessagesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                CpqConfiguratorConflictAndErrorMessagesComponent: {
                    component: ConfiguratorConflictAndErrorMessagesComponent,
                },
            },
        }),
    ], imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictAndErrorMessagesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                CpqConfiguratorConflictAndErrorMessagesComponent: {
                                    component: ConfiguratorConflictAndErrorMessagesComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorConflictAndErrorMessagesComponent],
                    exports: [ConfiguratorConflictAndErrorMessagesComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictDescriptionComponent {
    constructor() {
        this.groupType = Configurator.GroupType;
        this.iconTypes = ICON_TYPE;
        this.tabindex = '0';
        // Intentional empty constructor
    }
    /**
     * Verifies whether the  conflict description should be displayed for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
     */
    displayConflictDescription(group) {
        return group.groupType === Configurator.GroupType.CONFLICT_GROUP;
    }
}
ConfiguratorConflictDescriptionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorConflictDescriptionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorConflictDescriptionComponent, selector: "cx-configurator-conflict-description", inputs: { currentGroup: "currentGroup" }, host: { properties: { "tabindex": "this.tabindex" } }, ngImport: i0, template: "<ng-container *ngIf=\"displayConflictDescription(currentGroup)\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ currentGroup.name }}\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-conflict-description', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayConflictDescription(currentGroup)\">\n  <cx-icon [type]=\"iconTypes.WARNING\" aria-hidden=\"true\"></cx-icon>\n  {{ currentGroup.name }}\n</ng-container>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { currentGroup: [{
                type: Input
            }], tabindex: [{
                type: HostBinding,
                args: ['tabindex']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictDescriptionModule {
}
ConfiguratorConflictDescriptionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictDescriptionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionModule, declarations: [ConfiguratorConflictDescriptionComponent], imports: [CommonModule, IconModule], exports: [ConfiguratorConflictDescriptionComponent] });
ConfiguratorConflictDescriptionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionModule, imports: [CommonModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictDescriptionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule],
                    declarations: [ConfiguratorConflictDescriptionComponent],
                    exports: [ConfiguratorConflictDescriptionComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictSuggestionComponent {
    constructor() {
        this.groupType = Configurator.GroupType;
        this.tabindex = '0';
        // Intentional empty constructor
    }
    /**
     * Verifies whether the conflict suggestion should be displayed for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - 'True' if the conflict description should be displayed, otherwise 'false'.
     */
    displayConflictSuggestion(group) {
        return group.groupType === Configurator.GroupType.CONFLICT_GROUP &&
            group.attributes
            ? group.attributes.length > 0
            : false;
    }
    createSuggestionUiKey() {
        return 'suggestion--' + this.suggestionNumber;
    }
}
ConfiguratorConflictSuggestionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSuggestionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorConflictSuggestionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorConflictSuggestionComponent, selector: "cx-configurator-conflict-suggestion", inputs: { currentGroup: "currentGroup", attribute: "attribute", suggestionNumber: "suggestionNumber" }, host: { properties: { "tabindex": "this.tabindex" } }, ngImport: i0, template: "<ng-container *ngIf=\"displayConflictSuggestion(currentGroup)\">\n  <div\n    class=\"cx-title\"\n    [attr.aria-label]=\"\n      ('configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }) +\n      ' ' +\n      ('configurator.conflict.suggestionText'\n        | cxTranslate: { attribute: attribute.label })\n    \"\n  >\n    <span aria-hidden=\"true\">{{\n      'configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }\n    }}</span>\n  </div>\n  <span aria-hidden=\"true\">{{\n    'configurator.conflict.suggestionText'\n      | cxTranslate: { attribute: attribute.label }\n  }}</span>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSuggestionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-conflict-suggestion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayConflictSuggestion(currentGroup)\">\n  <div\n    class=\"cx-title\"\n    [attr.aria-label]=\"\n      ('configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }) +\n      ' ' +\n      ('configurator.conflict.suggestionText'\n        | cxTranslate: { attribute: attribute.label })\n    \"\n  >\n    <span aria-hidden=\"true\">{{\n      'configurator.conflict.suggestionTitle'\n        | cxTranslate: { number: suggestionNumber + 1 }\n    }}</span>\n  </div>\n  <span aria-hidden=\"true\">{{\n    'configurator.conflict.suggestionText'\n      | cxTranslate: { attribute: attribute.label }\n  }}</span>\n</ng-container>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { currentGroup: [{
                type: Input
            }], attribute: [{
                type: Input
            }], suggestionNumber: [{
                type: Input
            }], tabindex: [{
                type: HostBinding,
                args: ['tabindex']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictSuggestionModule {
}
ConfiguratorConflictSuggestionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSuggestionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictSuggestionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSuggestionModule, declarations: [ConfiguratorConflictSuggestionComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorConflictSuggestionComponent] });
ConfiguratorConflictSuggestionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSuggestionModule, imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSuggestionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    declarations: [ConfiguratorConflictSuggestionComponent],
                    exports: [ConfiguratorConflictSuggestionComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class ConfiguratorExitButtonComponent {
    constructor(productService, routingService, configRouterExtractorService, configuratorCommonsService, breakpointService, windowRef, location) {
        this.productService = productService;
        this.routingService = routingService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.breakpointService = breakpointService;
        this.windowRef = windowRef;
        this.location = location;
        this.container$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService
            .getConfiguration(routerData.owner)
            .pipe(map((configuration) => ({ routerData, configuration })))
            .pipe(switchMap((cont) => this.productService.get(cont.configuration.productCode).pipe(map((product) => ({
            routerData: cont.routerData,
            configuration: cont.configuration,
            product,
        })))))));
    }
    navigateToCart() {
        this.routingService.go('cart');
    }
    /**
     * Navigates to the product detail page of the product that is being configured.
     */
    exitConfiguration() {
        this.container$.pipe(take(1)).subscribe((container) => {
            if (container.routerData.owner.type ===
                CommonConfigurator.OwnerType.CART_ENTRY) {
                this.navigateToCart();
            }
            else {
                this.routingService.go({
                    cxRoute: 'product',
                    params: container.product,
                });
            }
        });
    }
    /**
     * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
     */
    isDesktop() {
        return this.breakpointService.isUp(BREAKPOINT.md);
    }
    /**
     * Verifies whether the current screen size equals or is smaller than breakpoint `BREAKPOINT.sm`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is smaller than`BREAKPOINT.sm` returns `true`, otherwise `false`.
     */
    isMobile() {
        return this.breakpointService.isDown(BREAKPOINT.sm);
    }
}
ConfiguratorExitButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExitButtonComponent, deps: [{ token: i1$1.ProductService }, { token: i1$1.RoutingService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorCommonsService }, { token: i3.BreakpointService }, { token: i1$1.WindowRef }, { token: i4$1.Location }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorExitButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorExitButtonComponent, selector: "cx-configurator-exit-button", ngImport: i0, template: "<ng-container *ngIf=\"container$ | async as container\">\n  <button\n    class=\"btn btn-tertiary\"\n    tabindex=\"0\"\n    (click)=\"exitConfiguration()\"\n    [attr.title]=\"\n      container.routerData.isOwnerCartEntry\n        ? ('configurator.button.cancelConfiguration' | cxTranslate)\n        : ('configurator.button.exit' | cxTranslate)\n    \"\n  >\n    <ng-container *ngIf=\"!container.routerData.isOwnerCartEntry\">\n      <ng-container *ngIf=\"isDesktop() | async\">\n        {{ 'configurator.button.exit' | cxTranslate }}\n      </ng-container>\n      <ng-container *ngIf=\"isMobile() | async\">\n        {{ 'configurator.button.exitMobile' | cxTranslate }}\n      </ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"container.routerData.isOwnerCartEntry\">\n      <ng-container *ngIf=\"isMobile() | async\">\n        {{ 'configurator.button.cancelConfigurationMobile' | cxTranslate }}\n      </ng-container>\n      <ng-container *ngIf=\"isDesktop() | async\">\n        {{ 'configurator.button.cancelConfiguration' | cxTranslate }}\n      </ng-container>\n    </ng-container>\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExitButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-exit-button', template: "<ng-container *ngIf=\"container$ | async as container\">\n  <button\n    class=\"btn btn-tertiary\"\n    tabindex=\"0\"\n    (click)=\"exitConfiguration()\"\n    [attr.title]=\"\n      container.routerData.isOwnerCartEntry\n        ? ('configurator.button.cancelConfiguration' | cxTranslate)\n        : ('configurator.button.exit' | cxTranslate)\n    \"\n  >\n    <ng-container *ngIf=\"!container.routerData.isOwnerCartEntry\">\n      <ng-container *ngIf=\"isDesktop() | async\">\n        {{ 'configurator.button.exit' | cxTranslate }}\n      </ng-container>\n      <ng-container *ngIf=\"isMobile() | async\">\n        {{ 'configurator.button.exitMobile' | cxTranslate }}\n      </ng-container>\n    </ng-container>\n    <ng-container *ngIf=\"container.routerData.isOwnerCartEntry\">\n      <ng-container *ngIf=\"isMobile() | async\">\n        {{ 'configurator.button.cancelConfigurationMobile' | cxTranslate }}\n      </ng-container>\n      <ng-container *ngIf=\"isDesktop() | async\">\n        {{ 'configurator.button.cancelConfiguration' | cxTranslate }}\n      </ng-container>\n    </ng-container>\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ProductService }, { type: i1$1.RoutingService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorCommonsService }, { type: i3.BreakpointService }, { type: i1$1.WindowRef }, { type: i4$1.Location }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorExitButtonModule {
}
ConfiguratorExitButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExitButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorExitButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExitButtonModule, declarations: [ConfiguratorExitButtonComponent], imports: [CommonModule, I18nModule], exports: [ConfiguratorExitButtonComponent] });
ConfiguratorExitButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExitButtonModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorExitButton: {
                    component: ConfiguratorExitButtonComponent,
                },
            },
        }),
        WindowRef,
    ], imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExitButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorExitButton: {
                                    component: ConfiguratorExitButtonComponent,
                                },
                            },
                        }),
                        WindowRef,
                    ],
                    declarations: [ConfiguratorExitButtonComponent],
                    exports: [ConfiguratorExitButtonComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * This implementation is OCC specific.
 * Different backend might have completely different need regarding expert mode.
 * To implement custom solution provide your own implementation and customize services that use ConfiguratorExpertModeService
 */
class ConfiguratorExpertModeService {
    constructor() {
        this._expModeRequested = new ReplaySubject(1);
        this._expModeActive = new ReplaySubject(1);
    }
    /**
     * Sets requested expert mode.
     *
     * @param expMode
     */
    setExpModeRequested(expMode) {
        this._expModeRequested.next(expMode);
    }
    /**
     * This function provides the requested expert mode the OCC calls should use, depending
     * on whether there is an active storefront session or not.
     */
    getExpModeRequested() {
        return this._expModeRequested;
    }
    /**
     * Sets requested expert mode.
     *
     * @param expMode
     */
    setExpModeActive(expMode) {
        this._expModeActive.next(expMode);
    }
    /**
     * This function provides the requested expert mode the OCC calls should use, depending
     * on whether there is an active storefront session or not.
     */
    getExpModeActive() {
        return this._expModeActive;
    }
}
ConfiguratorExpertModeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExpertModeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorExpertModeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExpertModeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorExpertModeService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupComponent {
    constructor(configuratorCommonsService, configuratorGroupsService, languageService, configUtils, configExpertModeService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.languageService = languageService;
        this.configUtils = configUtils;
        this.configExpertModeService = configExpertModeService;
        this.typePrefix = 'AttributeType_';
        this.activeLanguage$ = this.languageService.getActive();
        this.uiType = Configurator.UiType;
    }
    /**
     * Updates a configuration, specified by the configuration form update event.
     *
     * @param {ConfigFormUpdateEvent} event - Configuration form update event
     */
    updateConfiguration(event) {
        this.configuratorCommonsService.updateConfiguration(event.ownerKey, event.changedAttribute, event.updateType);
    }
    /**
     * Verifies whether the current group type is conflict one.
     *
     * @param {Configurator.GroupType | undefined} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType) {
        return groupType
            ? this.configuratorGroupsService.isConflictGroupType(groupType)
            : false;
    }
    /**
     * Display group description box only for conflict groups with a given group name (i.e. a conflict description)
     *
     * @param {Configurator.Group} group - Group
     * @returns {boolean} - 'True' if conflict description box should be displayed, otherwise 'false'.
     */
    displayConflictDescription(group) {
        return (group.groupType !== undefined &&
            this.configuratorGroupsService.isConflictGroupType(group.groupType) &&
            group.name !== '');
    }
    /**
     * Generates a group ID.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createGroupId(groupId) {
        return this.configUtils.createGroupId(groupId);
    }
    /**
     * Retrieves information whether the expert mode is active.
     *
     * @returns {Observable<boolean> | undefined } - 'True' if the expert mode is active, otherwise 'false'.
     */
    get expMode() {
        return this.configExpertModeService.getExpModeActive();
    }
    getComponentKey(attribute) {
        return attribute.uiTypeVariation?.includes(Configurator.CustomUiTypeIndicator)
            ? this.typePrefix + attribute.uiTypeVariation
            : this.typePrefix + attribute.uiType;
    }
}
ConfiguratorGroupComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupComponent, deps: [{ token: ConfiguratorCommonsService }, { token: ConfiguratorGroupsService }, { token: i1$1.LanguageService }, { token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorExpertModeService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorGroupComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorGroupComponent, selector: "cx-configurator-group", inputs: { group: "group", owner: "owner", isNavigationToGroupEnabled: "isNavigationToGroupEnabled" }, ngImport: i0, template: "<div id=\"{{ createGroupId(group.id) }}\" role=\"tabpanel\">\n  <ng-container *ngIf=\"displayConflictDescription(group)\">\n    <cx-configurator-conflict-description\n      [currentGroup]=\"group\"\n    ></cx-configurator-conflict-description>\n  </ng-container>\n  <div\n    class=\"cx-group-attribute\"\n    [class.cx-hidden]=\"!attribute.visible\"\n    *ngFor=\"let attribute of group.attributes; let indexOfAttribute = index\"\n  >\n    <ng-container *ngIf=\"isConflictGroupType(group.groupType)\">\n      <cx-configurator-conflict-suggestion\n        [currentGroup]=\"group\"\n        [attribute]=\"attribute\"\n        [suggestionNumber]=\"indexOfAttribute\"\n      ></cx-configurator-conflict-suggestion>\n    </ng-container>\n\n    <ng-container *ngIf=\"activeLanguage$ | async as activeLanguage\">\n      <div\n        [cxConfiguratorAttributeComponent]=\"{\n          componentKey: 'Header',\n          attribute: attribute,\n          owner: owner,\n          group: group,\n          language: activeLanguage,\n          expMode: (expMode | async) ?? false,\n          isNavigationToGroupEnabled: isNavigationToGroupEnabled\n        }\"\n      ></div>\n\n      <div\n        [cxConfiguratorAttributeComponent]=\"{\n          componentKey: getComponentKey(attribute),\n          attribute: attribute,\n          owner: owner,\n          group: group,\n          language: activeLanguage,\n          expMode: (expMode | async) ?? false\n        }\"\n      ></div>\n\n      <div\n        [cxConfiguratorAttributeComponent]=\"{\n          componentKey: 'Footer',\n          attribute: attribute,\n          owner: owner,\n          group: group,\n          language: activeLanguage,\n          expMode: (expMode | async) ?? false\n        }\"\n      ></div>\n    </ng-container>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorConflictDescriptionComponent, selector: "cx-configurator-conflict-description", inputs: ["currentGroup"] }, { kind: "component", type: ConfiguratorConflictSuggestionComponent, selector: "cx-configurator-conflict-suggestion", inputs: ["currentGroup", "attribute", "suggestionNumber"] }, { kind: "directive", type: ConfiguratorAttributeCompositionDirective, selector: "[cxConfiguratorAttributeComponent]", inputs: ["cxConfiguratorAttributeComponent"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-group', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div id=\"{{ createGroupId(group.id) }}\" role=\"tabpanel\">\n  <ng-container *ngIf=\"displayConflictDescription(group)\">\n    <cx-configurator-conflict-description\n      [currentGroup]=\"group\"\n    ></cx-configurator-conflict-description>\n  </ng-container>\n  <div\n    class=\"cx-group-attribute\"\n    [class.cx-hidden]=\"!attribute.visible\"\n    *ngFor=\"let attribute of group.attributes; let indexOfAttribute = index\"\n  >\n    <ng-container *ngIf=\"isConflictGroupType(group.groupType)\">\n      <cx-configurator-conflict-suggestion\n        [currentGroup]=\"group\"\n        [attribute]=\"attribute\"\n        [suggestionNumber]=\"indexOfAttribute\"\n      ></cx-configurator-conflict-suggestion>\n    </ng-container>\n\n    <ng-container *ngIf=\"activeLanguage$ | async as activeLanguage\">\n      <div\n        [cxConfiguratorAttributeComponent]=\"{\n          componentKey: 'Header',\n          attribute: attribute,\n          owner: owner,\n          group: group,\n          language: activeLanguage,\n          expMode: (expMode | async) ?? false,\n          isNavigationToGroupEnabled: isNavigationToGroupEnabled\n        }\"\n      ></div>\n\n      <div\n        [cxConfiguratorAttributeComponent]=\"{\n          componentKey: getComponentKey(attribute),\n          attribute: attribute,\n          owner: owner,\n          group: group,\n          language: activeLanguage,\n          expMode: (expMode | async) ?? false\n        }\"\n      ></div>\n\n      <div\n        [cxConfiguratorAttributeComponent]=\"{\n          componentKey: 'Footer',\n          attribute: attribute,\n          owner: owner,\n          group: group,\n          language: activeLanguage,\n          expMode: (expMode | async) ?? false\n        }\"\n      ></div>\n    </ng-container>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: ConfiguratorGroupsService }, { type: i1$1.LanguageService }, { type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorExpertModeService }]; }, propDecorators: { group: [{
                type: Input
            }], owner: [{
                type: Input
            }], isNavigationToGroupEnabled: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictSolverDialogComponent {
    constructor(configuratorStorefrontUtilsService, configuratorCommonsService, launchDialogService, focusService) {
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.launchDialogService = launchDialogService;
        this.focusService = focusService;
        this.iconTypes = ICON_TYPE;
        this.uiType = Configurator.UiType;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: true,
            focusOnEscape: true,
        };
        this.subscription = new Subscription();
    }
    init(conflictGroup, routerData) {
        this.focusService.clear();
        this.conflictGroup$ = conflictGroup;
        this.routerData$ = routerData;
    }
    ngOnInit() {
        this.subscription.add(this.launchDialogService.data$.subscribe((dialogData) => {
            this.init(dialogData.conflictGroup, dialogData.routerData);
        }));
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
    /**
     * Closes a modal with a certain reason.
     * Scrolls to the top of the configuration form.
     * Sets focus to the first attribute.
     *
     * @param {any} reason - Reason
     */
    dismissModal(reason) {
        this.routerData$
            .pipe(take(1))
            .subscribe((routerData) => this.configuratorCommonsService.dismissConflictSolverDialog(routerData.owner));
        this.launchDialogService.closeDialog(reason);
        this.configuratorStorefrontUtilsService.scrollToConfigurationElement('.VariantConfigurationTemplate');
        this.configuratorStorefrontUtilsService.focusFirstAttribute();
    }
}
ConfiguratorConflictSolverDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorCommonsService }, { token: i3.LaunchDialogService }, { token: i3.KeyboardFocusService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorConflictSolverDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorConflictSolverDialogComponent, selector: "cx-configurator-conflict-solver-dialog", ngImport: i0, template: "<div class=\"cx-modal-container\">\n  <!-- For screen reader purposes (not visual)-->\n  <div\n    class=\"cx-visually-hidden\"\n    aria-atomic=\"true\"\n    aria-live=\"assertive\"\n    role=\"alert\"\n    aria-relevant=\"additions\"\n  >\n    {{ 'configurator.header.conflictWarning' | cxTranslate }}\n  </div>\n  <div class=\"cx-modal-content\" [cxFocus]=\"focusConfig\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <div class=\"cx-dialog-title modal-title\" tabindex=\"0\">\n        {{ 'configurator.header.resolveIssue' | cxTranslate }}\n      </div>\n      <button\n        type=\"button\"\n        class=\"close\"\n        attr.aria-label=\"{{\n          'configurator.a11y.closeConflictSolverModal' | cxTranslate\n        }}\"\n        (click)=\"dismissModal('Close conflict solver dialog')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <div class=\"cx-msg-warning\">\n        <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n        {{ 'configurator.header.conflictWarning' | cxTranslate }}\n      </div>\n      <ng-container *ngIf=\"routerData$ | async as routerData\">\n        <ng-container *ngIf=\"conflictGroup$ | async as conflictGroup\">\n          <cx-configurator-group\n            [group]=\"conflictGroup\"\n            [owner]=\"routerData.owner\"\n            [isNavigationToGroupEnabled]=\"false\"\n          >\n          </cx-configurator-group> </ng-container\n      ></ng-container>\n    </div>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: ConfiguratorGroupComponent, selector: "cx-configurator-group", inputs: ["group", "owner", "isNavigationToGroupEnabled"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-conflict-solver-dialog', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"cx-modal-container\">\n  <!-- For screen reader purposes (not visual)-->\n  <div\n    class=\"cx-visually-hidden\"\n    aria-atomic=\"true\"\n    aria-live=\"assertive\"\n    role=\"alert\"\n    aria-relevant=\"additions\"\n  >\n    {{ 'configurator.header.conflictWarning' | cxTranslate }}\n  </div>\n  <div class=\"cx-modal-content\" [cxFocus]=\"focusConfig\">\n    <!-- Modal Header -->\n    <div class=\"cx-dialog-header modal-header\">\n      <div class=\"cx-dialog-title modal-title\" tabindex=\"0\">\n        {{ 'configurator.header.resolveIssue' | cxTranslate }}\n      </div>\n      <button\n        type=\"button\"\n        class=\"close\"\n        attr.aria-label=\"{{\n          'configurator.a11y.closeConflictSolverModal' | cxTranslate\n        }}\"\n        (click)=\"dismissModal('Close conflict solver dialog')\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body modal-body\">\n      <div class=\"cx-msg-warning\">\n        <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n        {{ 'configurator.header.conflictWarning' | cxTranslate }}\n      </div>\n      <ng-container *ngIf=\"routerData$ | async as routerData\">\n        <ng-container *ngIf=\"conflictGroup$ | async as conflictGroup\">\n          <cx-configurator-group\n            [group]=\"conflictGroup\"\n            [owner]=\"routerData.owner\"\n            [isNavigationToGroupEnabled]=\"false\"\n          >\n          </cx-configurator-group> </ng-container\n      ></ng-container>\n    </div>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorCommonsService }, { type: i3.LaunchDialogService }, { type: i3.KeyboardFocusService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictSolverDialogLauncherService {
    constructor(launchDialogService, configRouterExtractorService, configuratorGroupsService) {
        this.launchDialogService = launchDialogService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.subscription = new Subscription();
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.conflictGroupAndRouterData$ = this.routerData$.pipe(switchMap((routerData) => this.configuratorGroupsService
            .getConflictGroupForImmediateConflictResolution(routerData.owner)
            .pipe(map((conflictGroup) => ({
            conflictGroup: conflictGroup,
            routerData: routerData,
        })))), 
        //Delay because we first want the form to react on data changes
        delay(0));
        this.controlDialog();
    }
    controlDialog() {
        this.subscription.add(this.conflictGroupAndRouterData$
            .pipe(filter((data) => !!data.conflictGroup), 
        // subscribeToCloseDialog triggers another emission of conflictGroup$ with the same conflict group and router data
        // so until we get a new navigation id in the router data, we ignore emissions of same conflict group
        distinctUntilChanged((prev, cur) => prev.conflictGroup === cur.conflictGroup &&
            prev.routerData.navigationId === cur.routerData.navigationId))
            .subscribe(() => {
            this.openModal();
            this.subscribeToCloseDialog();
        }));
    }
    subscribeToCloseDialog() {
        this.subscription.add(this.conflictGroupAndRouterData$
            .pipe(first((data) => !data.conflictGroup)) // stop listening, after we closed once
            .subscribe(() => this.closeModal('CLOSE_NO_CONFLICTS_EXIST')));
    }
    openModal() {
        this.launchDialogService.openDialogAndSubscribe("CONFLICT_SOLVER" /* LAUNCH_CALLER.CONFLICT_SOLVER */, undefined, {
            conflictGroup: this.conflictGroupAndRouterData$.pipe(map((data) => data.conflictGroup)),
            routerData: this.routerData$,
        });
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
ConfiguratorConflictSolverDialogLauncherService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogLauncherService, deps: [{ token: i3.LaunchDialogService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorGroupsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorConflictSolverDialogLauncherService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogLauncherService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogLauncherService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.LaunchDialogService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorGroupsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupModule {
}
ConfiguratorGroupModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorGroupModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupModule, declarations: [ConfiguratorGroupComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        NgSelectModule,
        ConfiguratorAttributeNotSupportedModule,
        ConfiguratorAttributeInputFieldModule,
        ConfiguratorAttributeFooterModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeHeaderModule,
        ConfiguratorAttributeRadioButtonModule,
        ConfiguratorAttributeSingleSelectionBundleModule,
        ConfiguratorAttributeMultiSelectionBundleModule,
        ConfiguratorAttributeReadOnlyModule,
        ConfiguratorAttributeSingleSelectionImageModule,
        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
        ConfiguratorAttributeCheckboxModule,
        ConfiguratorAttributeCheckboxListModule,
        ConfiguratorAttributeDropDownModule,
        ConfiguratorAttributeMultiSelectionImageModule,
        ConfiguratorConflictDescriptionModule,
        ConfiguratorConflictSuggestionModule,
        ConfiguratorAttributeCompositionModule], exports: [ConfiguratorGroupComponent] });
ConfiguratorGroupModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorForm: {
                    component: ConfiguratorGroupComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        NgSelectModule,
        ConfiguratorAttributeNotSupportedModule,
        ConfiguratorAttributeInputFieldModule,
        ConfiguratorAttributeFooterModule,
        ConfiguratorAttributeNumericInputFieldModule,
        ConfiguratorAttributeHeaderModule,
        ConfiguratorAttributeRadioButtonModule,
        ConfiguratorAttributeSingleSelectionBundleModule,
        ConfiguratorAttributeMultiSelectionBundleModule,
        ConfiguratorAttributeReadOnlyModule,
        ConfiguratorAttributeSingleSelectionImageModule,
        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
        ConfiguratorAttributeCheckboxModule,
        ConfiguratorAttributeCheckboxListModule,
        ConfiguratorAttributeDropDownModule,
        ConfiguratorAttributeMultiSelectionImageModule,
        ConfiguratorConflictDescriptionModule,
        ConfiguratorConflictSuggestionModule,
        ConfiguratorAttributeCompositionModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        NgSelectModule,
                        ConfiguratorAttributeNotSupportedModule,
                        ConfiguratorAttributeInputFieldModule,
                        ConfiguratorAttributeFooterModule,
                        ConfiguratorAttributeNumericInputFieldModule,
                        ConfiguratorAttributeHeaderModule,
                        ConfiguratorAttributeRadioButtonModule,
                        ConfiguratorAttributeSingleSelectionBundleModule,
                        ConfiguratorAttributeMultiSelectionBundleModule,
                        ConfiguratorAttributeReadOnlyModule,
                        ConfiguratorAttributeSingleSelectionImageModule,
                        ConfiguratorAttributeSingleSelectionBundleDropdownModule,
                        ConfiguratorAttributeCheckboxModule,
                        ConfiguratorAttributeCheckboxListModule,
                        ConfiguratorAttributeDropDownModule,
                        ConfiguratorAttributeMultiSelectionImageModule,
                        ConfiguratorConflictDescriptionModule,
                        ConfiguratorConflictSuggestionModule,
                        ConfiguratorAttributeCompositionModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorForm: {
                                    component: ConfiguratorGroupComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorGroupComponent],
                    exports: [ConfiguratorGroupComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultConfiguratorConflictSolverLayoutConfig = {
    launch: {
        CONFLICT_SOLVER: {
            inlineRoot: true,
            component: ConfiguratorConflictSolverDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorConflictSolverDialogModule {
    constructor(_configuratorConflictSolverDialogLauncherService) {
        // Intentional empty constructor
    }
}
ConfiguratorConflictSolverDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogModule, deps: [{ token: ConfiguratorConflictSolverDialogLauncherService }], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorConflictSolverDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogModule, declarations: [ConfiguratorConflictSolverDialogComponent], imports: [CommonModule,
        IconModule,
        I18nModule,
        ConfiguratorGroupModule,
        KeyboardFocusModule], exports: [ConfiguratorConflictSolverDialogComponent] });
ConfiguratorConflictSolverDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogModule, providers: [
        provideDefaultConfig(defaultConfiguratorConflictSolverLayoutConfig),
    ], imports: [CommonModule,
        IconModule,
        I18nModule,
        ConfiguratorGroupModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorConflictSolverDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        IconModule,
                        I18nModule,
                        ConfiguratorGroupModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultConfiguratorConflictSolverLayoutConfig),
                    ],
                    declarations: [ConfiguratorConflictSolverDialogComponent],
                    exports: [ConfiguratorConflictSolverDialogComponent],
                }]
        }], ctorParameters: function () { return [{ type: ConfiguratorConflictSolverDialogLauncherService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorFormComponent {
    constructor(configuratorCommonsService, configuratorGroupsService, configRouterExtractorService, configExpertModeService, launchDialogService, 
    // TODO:(CXSPA-3392) for next major release remove feature config service
    featureConfigservice, globalMessageService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configExpertModeService = configExpertModeService;
        this.launchDialogService = launchDialogService;
        this.featureConfigservice = featureConfigservice;
        this.globalMessageService = globalMessageService;
        this.subscription = new Subscription();
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.configuration$ = this.routerData$.pipe(filter((routerData) => routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION), switchMap((routerData) => {
            return this.configuratorCommonsService.getOrCreateConfiguration(routerData.owner, routerData.configIdTemplate);
        }));
        this.currentGroup$ = this.routerData$.pipe(switchMap((routerData) => this.configuratorGroupsService.getCurrentGroup(routerData.owner)));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    listenForConflictResolution() {
        this.subscription.add(this.routerData$
            .pipe(switchMap((routerData) => this.configuratorCommonsService.hasConflicts(routerData.owner)), distinctUntilChanged(), // we are interested only in status changes
        skip(1), // we skip the very first emission to avoid the change fron undefined -> no conflicts
        filter((hasConflicts) => !hasConflicts))
            .subscribe(() => this.displayConflictResolvedMessage()));
    }
    displayConflictResolvedMessage() {
        if (this.globalMessageService &&
            (this.featureConfigservice?.isLevel('6.1') ?? false)) {
            this.globalMessageService.add({ key: 'configurator.header.conflictsResolved' }, GlobalMessageType.MSG_TYPE_CONFIRMATION);
        }
    }
    ngOnInit() {
        this.listenForConflictResolution();
        this.routerData$
            .pipe(switchMap((routerData) => {
            return this.configuratorCommonsService.getConfiguration(routerData.owner);
        }), take(1))
            .subscribe((configuration) => {
            this.configuratorCommonsService.checkConflictSolverDialog(configuration.owner);
        });
        this.routerData$
            .pipe(filter((routingData) => routingData.displayRestartDialog === true), switchMap((routerData) => {
            return this.configuratorCommonsService.getConfiguration(routerData.owner);
        }), take(1), filter((configuration) => configuration.interactionState.newConfiguration === false), delay(0) // Delay because we first want the form to react on data changes
        )
            .subscribe((configuration) => {
            this.launchDialogService.openDialogAndSubscribe("CONFIGURATOR_RESTART_DIALOG" /* LAUNCH_CALLER.CONFIGURATOR_RESTART_DIALOG */, undefined, { owner: configuration.owner });
        });
        this.routerData$.pipe(take(1)).subscribe((routingData) => {
            //In case of resolving issues (if no conflict solver dialog is present!), check if the configuration contains conflicts,
            //if not, check if the configuration contains missing mandatory fields and show the group
            if (routingData.resolveIssues) {
                this.configuratorCommonsService
                    .hasConflicts(routingData.owner)
                    .pipe(take(1))
                    .subscribe((hasConflicts) => {
                    if (hasConflicts && !routingData.skipConflicts) {
                        this.configuratorGroupsService.navigateToConflictSolver(routingData.owner);
                        //Only check for Incomplete group when there are no conflicts or conflicts should be skipped
                    }
                    else {
                        this.configuratorGroupsService.navigateToFirstIncompleteGroup(routingData.owner);
                    }
                });
            }
            if (routingData.expMode) {
                this.configExpertModeService?.setExpModeRequested(routingData.expMode);
            }
        });
    }
    /**
     * Verifies whether the navigation to a conflict group is enabled.
     * @param configuration Current configuration
     * @returns {boolean} Returns 'true' if the navigation to a conflict group is enabled, otherwise 'false'.
     */
    isNavigationToGroupEnabled(configuration) {
        return !configuration.immediateConflictResolution;
    }
    /**
     * Checks if conflict solver dialog is active
     * @param configuration
     * @returns Conflict solver dialog active?
     */
    isDialogActive(configuration) {
        return configuration.interactionState.showConflictSolverDialog ?? false;
    }
}
ConfiguratorFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormComponent, deps: [{ token: ConfiguratorCommonsService }, { token: ConfiguratorGroupsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorExpertModeService }, { token: i3.LaunchDialogService }, { token: i1$1.FeatureConfigService, optional: true }, { token: i1$1.GlobalMessageService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorFormComponent, selector: "cx-configurator-form", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostForm\">\n  <ng-container *ngIf=\"!isDialogActive(configuration); else ghostForm\">\n    <ng-container *ngIf=\"currentGroup$ | async as group\">\n      <cx-configurator-group\n        [group]=\"group\"\n        [owner]=\"configuration.owner\"\n        [isNavigationToGroupEnabled]=\"isNavigationToGroupEnabled(configuration)\"\n      >\n      </cx-configurator-group>\n    </ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #ghostForm>\n  <ng-container *ngFor=\"let number of [0, 1, 2]\">\n    <div class=\"cx-ghost-attribute\">\n      <div class=\"cx-ghost-header\">\n        <div class=\"cx-ghost-title ghost\"></div>\n        <div class=\"cx-ghost-icon ghost\"></div>\n      </div>\n      <div class=\"cx-ghost-body\">\n        <div class=\"cx-ghost-text ghost\"></div>\n        <div class=\"cx-ghost-price ghost\"></div>\n      </div>\n    </div>\n\n    <div class=\"cx-ghost-attribute\">\n      <div class=\"cx-ghost-header\">\n        <div class=\"cx-ghost-title ghost\"></div>\n        <div class=\"cx-ghost-icon ghost\"></div>\n        <div class=\"cx-ghost-description-box\">\n          <div class=\"cx-ghost-description ghost\"></div>\n        </div>\n      </div>\n      <div class=\"cx-ghost-body\">\n        <div\n          *ngFor=\"let number of [0, 1, 2]; let i = index\"\n          class=\"cx-ghost-radiobutton-value\"\n        >\n          <div class=\"cx-ghost-value-label-pair\">\n            <div class=\"cx-ghost-value-icon ghost\"></div>\n            <div class=\"cx-ghost-label ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-value-price ghost\">\n            <ng-container *ngIf=\"i !== 0\">\n              <div class=\"cx-ghost-price\"></div>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorGroupComponent, selector: "cx-configurator-group", inputs: ["group", "owner", "isNavigationToGroupEnabled"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostForm\">\n  <ng-container *ngIf=\"!isDialogActive(configuration); else ghostForm\">\n    <ng-container *ngIf=\"currentGroup$ | async as group\">\n      <cx-configurator-group\n        [group]=\"group\"\n        [owner]=\"configuration.owner\"\n        [isNavigationToGroupEnabled]=\"isNavigationToGroupEnabled(configuration)\"\n      >\n      </cx-configurator-group>\n    </ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #ghostForm>\n  <ng-container *ngFor=\"let number of [0, 1, 2]\">\n    <div class=\"cx-ghost-attribute\">\n      <div class=\"cx-ghost-header\">\n        <div class=\"cx-ghost-title ghost\"></div>\n        <div class=\"cx-ghost-icon ghost\"></div>\n      </div>\n      <div class=\"cx-ghost-body\">\n        <div class=\"cx-ghost-text ghost\"></div>\n        <div class=\"cx-ghost-price ghost\"></div>\n      </div>\n    </div>\n\n    <div class=\"cx-ghost-attribute\">\n      <div class=\"cx-ghost-header\">\n        <div class=\"cx-ghost-title ghost\"></div>\n        <div class=\"cx-ghost-icon ghost\"></div>\n        <div class=\"cx-ghost-description-box\">\n          <div class=\"cx-ghost-description ghost\"></div>\n        </div>\n      </div>\n      <div class=\"cx-ghost-body\">\n        <div\n          *ngFor=\"let number of [0, 1, 2]; let i = index\"\n          class=\"cx-ghost-radiobutton-value\"\n        >\n          <div class=\"cx-ghost-value-label-pair\">\n            <div class=\"cx-ghost-value-icon ghost\"></div>\n            <div class=\"cx-ghost-label ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-value-price ghost\">\n            <ng-container *ngIf=\"i !== 0\">\n              <div class=\"cx-ghost-price\"></div>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: ConfiguratorGroupsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorExpertModeService }, { type: i3.LaunchDialogService }, { type: i1$1.FeatureConfigService, decorators: [{
                    type: Optional
                }] }, { type: i1$1.GlobalMessageService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfigFormUpdateEvent {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorFormModule {
}
ConfiguratorFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormModule, declarations: [ConfiguratorFormComponent], imports: [CommonModule, I18nModule, NgSelectModule, ConfiguratorGroupModule], exports: [ConfiguratorFormComponent] });
ConfiguratorFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorForm: {
                    component: ConfiguratorFormComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, NgSelectModule, ConfiguratorGroupModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, NgSelectModule, ConfiguratorGroupModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorForm: {
                                    component: ConfiguratorFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorFormComponent],
                    exports: [ConfiguratorFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupMenuService {
    constructor(windowRef) {
        this.windowRef = windowRef;
    }
    /**
     * Retrieves the focused group index.
     *
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @returns {number | undefined} - focused group index
     * @protected
     */
    getFocusedGroupIndex(groups) {
        if (groups) {
            const group = groups.find((groupHTMLEl) => groupHTMLEl.nativeElement?.id ===
                this.windowRef?.document?.activeElement?.id);
            if (group) {
                return groups.toArray().indexOf(group);
            }
        }
        return undefined;
    }
    /**
     * Updates the current group index, if the current group index is not equal focused group index.
     * Otherwise the current group index stays unchanged.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {number} focusedGroupIndex - Focused group index
     * @returns {number} - updated group index
     * @protected
     */
    updateCurrentGroupIndex(currentGroupIndex, focusedGroupIndex) {
        if (focusedGroupIndex) {
            return focusedGroupIndex !== currentGroupIndex
                ? focusedGroupIndex
                : currentGroupIndex;
        }
        return currentGroupIndex;
    }
    /**
     * Focuses the next group.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @protected
     */
    focusNextGroup(currentGroupIndex, groups) {
        const focusedGroupIndex = this.getFocusedGroupIndex(groups);
        currentGroupIndex = this.updateCurrentGroupIndex(currentGroupIndex, focusedGroupIndex);
        if (groups) {
            if (currentGroupIndex === groups.length - 1) {
                groups.first?.nativeElement?.focus();
            }
            else {
                groups.toArray()[currentGroupIndex + 1]?.nativeElement.focus();
            }
        }
    }
    /**
     * Focuses the previous group.
     *
     * @param {number} currentGroupIndex - Current group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @protected
     */
    focusPreviousGroup(currentGroupIndex, groups) {
        const focusedGroupIndex = this.getFocusedGroupIndex(groups);
        currentGroupIndex = this.updateCurrentGroupIndex(currentGroupIndex, focusedGroupIndex);
        if (groups) {
            if (currentGroupIndex === 0) {
                groups.last?.nativeElement?.focus();
            }
            else {
                groups.toArray()[currentGroupIndex - 1]?.nativeElement?.focus();
            }
        }
    }
    /**
     * Switches the group on pressing an arrow key.
     *
     * @param {KeyboardEvent} event - keyboard event
     * @param {number} groupIndex - Group index
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     */
    switchGroupOnArrowPress(event, groupIndex, groups) {
        event.preventDefault();
        if (event.code === 'ArrowUp') {
            this.focusPreviousGroup(groupIndex, groups);
        }
        else if (event.code === 'ArrowDown') {
            this.focusNextGroup(groupIndex, groups);
        }
    }
    /**
     * Verifies whether the first group in the group list is `Back` button.
     *
     * @param {QueryList<ElementRef<HTMLElement>>} groups - List of the groups
     * @returns {boolean} - returns `true` if the first group in the group list is `Back` button, otherwise `false`
     */
    isBackBtnFocused(groups) {
        if (groups) {
            return (groups.first?.nativeElement?.classList?.value?.indexOf('cx-menu-back') !== -1 &&
                this.windowRef?.document?.activeElement === groups.first?.nativeElement);
        }
        return undefined;
    }
}
ConfiguratorGroupMenuService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuService, deps: [{ token: i1$1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorGroupMenuService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.WindowRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupMenuComponent {
    constructor(configCommonsService, configuratorGroupsService, hamburgerMenuService, configRouterExtractorService, configUtils, configGroupMenuService, directionService, translation, configExpertModeService) {
        this.configCommonsService = configCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.hamburgerMenuService = hamburgerMenuService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configUtils = configUtils;
        this.configGroupMenuService = configGroupMenuService;
        this.directionService = directionService;
        this.translation = translation;
        this.configExpertModeService = configExpertModeService;
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.configuration$ = this.routerData$.pipe(switchMap((routerData) => this.configCommonsService
            .getConfiguration(routerData.owner)
            .pipe(map((configuration) => ({ routerData, configuration })), 
        //We need to ensure that the navigation to conflict groups or
        //groups with mandatory attributes already has taken place, as this happens
        //in an onInit of another component.
        //otherwise we risk that this component is completely initialized too early,
        //in dev mode resulting in ExpressionChangedAfterItHasBeenCheckedError
        filter((cont) => (cont.configuration.complete &&
            cont.configuration.consistent) ||
            cont.configuration.interactionState.issueNavigationDone ||
            !cont.routerData.resolveIssues))
            .pipe(map((cont) => cont.configuration))));
        this.currentGroup$ = this.routerData$.pipe(switchMap((routerData) => this.configuratorGroupsService.getCurrentGroup(routerData.owner)));
        /**
         * Current parent group. Undefined for top level groups
         */
        this.displayedParentGroup$ = this.configuration$.pipe(switchMap((configuration) => this.configuratorGroupsService.getMenuParentGroup(configuration.owner)), switchMap((parentGroup) => {
            return parentGroup
                ? this.getCondensedParentGroup(parentGroup)
                : of(parentGroup);
        }));
        this.displayedGroups$ = this.displayedParentGroup$.pipe(switchMap((parentGroup) => {
            return this.configuration$.pipe(map((configuration) => {
                if (parentGroup) {
                    return this.condenseGroups(parentGroup.subGroups);
                }
                else {
                    return this.condenseGroups(configuration.groups);
                }
            }));
        }));
        this.iconTypes = ICON_TYPE;
        this.ERROR = ' ERROR';
        this.COMPLETE = ' COMPLETE';
        this.WARNING = ' WARNING';
        this.ICON = 'ICON';
    }
    click(group) {
        this.configuration$.pipe(take(1)).subscribe((configuration) => {
            if (configuration.interactionState.currentGroup === group.id) {
                return;
            }
            if (!this.configuratorGroupsService.hasSubGroups(group)) {
                this.configuratorGroupsService.navigateToGroup(configuration, group.id);
                this.hamburgerMenuService.toggle(true);
                this.configUtils.scrollToConfigurationElement('.VariantConfigurationTemplate, .CpqConfigurationTemplate');
            }
            else {
                this.configuratorGroupsService.setMenuParentGroup(configuration.owner, group.id);
            }
        });
    }
    navigateUp() {
        this.displayedParentGroup$
            .pipe(take(1))
            .subscribe((displayedParentGroup) => {
            //we only navigate up if we are not on a sub level group
            if (displayedParentGroup) {
                const grandParentGroup$ = this.getParentGroup(displayedParentGroup);
                this.configuration$.pipe(take(1)).subscribe((configuration) => {
                    grandParentGroup$.pipe(take(1)).subscribe((grandParentGroup) => {
                        this.configuratorGroupsService.setMenuParentGroup(configuration.owner, grandParentGroup ? grandParentGroup.id : undefined);
                    });
                });
            }
        });
    }
    /**
     * Retrieves the number of conflicts for the current group.
     *
     * @param {Configurator.Group} group - Current group
     * @return {string} - number of conflicts
     */
    getConflictNumber(group) {
        if (group &&
            group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            return '(' + group.subGroups.length + ')';
        }
        return '';
    }
    /**
     * Verifies whether the current group has subgroups.
     *
     * @param {Configurator.Group} group - Current group
     * @return {boolean} - Returns 'true' if the current group has a subgroups, otherwise 'false'.
     */
    hasSubGroups(group) {
        return this.configuratorGroupsService.hasSubGroups(group);
    }
    /**
     * Retrieves observable of parent group for a group
     * @param group
     * @returns Parent group, undefined in case input group is already on root level
     */
    getParentGroup(group) {
        return this.configuration$.pipe(map((configuration) => this.configuratorGroupsService.getParentGroup(configuration.groups, group)));
    }
    getCondensedParentGroup(parentGroup) {
        if (parentGroup &&
            parentGroup.subGroups &&
            parentGroup.subGroups.length === 1 &&
            parentGroup.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            return this.getParentGroup(parentGroup).pipe(switchMap((group) => {
                return group ? this.getCondensedParentGroup(group) : of(group);
            }));
        }
        else {
            return of(parentGroup);
        }
    }
    condenseGroups(groups) {
        return groups.flatMap((group) => {
            if (group.subGroups.length === 1 &&
                group.groupType !== Configurator.GroupType.CONFLICT_HEADER_GROUP) {
                return this.condenseGroups(group.subGroups);
            }
            else {
                return group;
            }
        });
    }
    /**
     * Returns true if group has been visited and if the group is not a conflict group.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    isGroupVisited(group, configuration) {
        return this.configuratorGroupsService
            .isGroupVisited(configuration.owner, group.id)
            .pipe(map((isVisited) => isVisited &&
            !this.isConflictGroupType(group.groupType ?? Configurator.GroupType.ATTRIBUTE_GROUP)), take(1));
    }
    /**
     * Verifies whether the current group is conflict one.
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupType(groupType) {
        return this.configuratorGroupsService.isConflictGroupType(groupType);
    }
    //TODO(CXSPA-3392) get rid of this method in next major. Change signature of
    //isConflictGroupType to allow undefined, and use this method instead
    /**
     * Verifies whether the current group is conflict one but allows for undefined input
     *
     * @param {Configurator.GroupType} groupType - Group type
     * @return {boolean} - 'True' if the current group is conflict one, otherwise 'false'.
     */
    isConflictGroupTypeAllowingUndefined(groupType) {
        return groupType
            ? this.configuratorGroupsService.isConflictGroupType(groupType)
            : false;
    }
    /**
     * Returns true if group is conflict header group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict header group, otherwise 'false'.
     */
    isConflictHeader(group) {
        return (group && group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP);
    }
    /**
     * Returns true if group is conflict group.
     *
     * @param {Configurator.Group} group - Current group
     *  @return {boolean} - Returns 'true' if the current group is conflict group, otherwise 'false'.
     */
    isConflictGroup(group) {
        return group && group.groupType === Configurator.GroupType.CONFLICT_GROUP;
    }
    /**
     * Returns group-status style classes dependent on completeness, conflicts, visited status and configurator type.
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<boolean>} - true if visited and not a conflict group
     */
    getGroupStatusStyles(group, configuration) {
        return this.isGroupVisited(group, configuration).pipe(map((isVisited) => {
            const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
            let groupStatusStyle = 'cx-menu-item';
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                !group.consistent) {
                groupStatusStyle = groupStatusStyle + this.WARNING;
            }
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                group.complete &&
                group.consistent &&
                isVisited) {
                groupStatusStyle = groupStatusStyle + this.COMPLETE;
            }
            if (!group.complete && isVisited) {
                groupStatusStyle = groupStatusStyle + this.ERROR;
            }
            return groupStatusStyle;
        }));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
    /**
     * Verifies whether the user navigates into a subgroup of the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates into the subgroup, otherwise 'false'.
     * @protected
     */
    isForwardsNavigation(event) {
        return ((event.code === 'ArrowRight' && this.isLTRDirection()) ||
            (event.code === 'ArrowLeft' && this.isRTLDirection()));
    }
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    isBackNavigation(event) {
        return ((event.code === 'ArrowLeft' && this.isLTRDirection()) ||
            (event.code === 'ArrowRight' && this.isRTLDirection()));
    }
    /**
     * Switches the group on pressing an arrow key.
     *
     * @param {KeyboardEvent} event - Keyboard event
     * @param {string} groupIndex - Group index
     * @param {Configurator.Group} targetGroup - Target group
     * @param {Configurator.Group} currentGroup - Current group
     */
    switchGroupOnArrowPress(event, groupIndex, targetGroup, currentGroup) {
        if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
            this.configGroupMenuService.switchGroupOnArrowPress(event, groupIndex, this.groups);
        }
        else if (this.isForwardsNavigation(event)) {
            if (targetGroup && this.hasSubGroups(targetGroup)) {
                this.click(targetGroup);
                this.setFocusForSubGroup(targetGroup, currentGroup.id);
            }
        }
        else if (this.isBackNavigation(event)) {
            if (this.configGroupMenuService.isBackBtnFocused(this.groups)) {
                this.navigateUp();
                this.setFocusForMainMenu(currentGroup.id);
            }
        }
    }
    /**
     * Persists the keyboard focus state for the given key
     * from the main group menu by back navigation.
     *
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForMainMenu(currentGroupId) {
        let key = currentGroupId;
        this.configuration$.pipe(take(1)).subscribe((configuration) => {
            configuration.groups?.forEach((group) => {
                if (group.subGroups?.length !== 1 &&
                    (this.isGroupSelected(group.id, currentGroupId) ||
                        this.containsSelectedGroup(group, currentGroupId))) {
                    key = group.id;
                }
            });
        });
        this.configUtils.setFocus(key);
    }
    /**
     * Persists the keyboard focus state for the given key
     * from the subgroup menu by forwards navigation.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     */
    setFocusForSubGroup(group, currentGroupId) {
        let key = 'cx-menu-back';
        if (this.containsSelectedGroup(group, currentGroupId)) {
            key = currentGroupId;
        }
        this.configUtils.setFocus(key);
    }
    /**
     * Verifies whether the parent group contains a selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the parent group contains a selected group, otherwise 'false'
     */
    containsSelectedGroup(group, currentGroupId) {
        let isCurrentGroupFound = false;
        group.subGroups?.forEach((subGroup) => {
            if (this.isGroupSelected(subGroup.id, currentGroupId)) {
                isCurrentGroupFound = true;
            }
        });
        return isCurrentGroupFound;
    }
    /**
     * Retrieves the tab index depending on if the the current group is selected
     * or the parent group contains the selected group.
     *
     * @param {Configurator.Group} group - Group
     * @param {string} currentGroupId - Current group ID
     * @returns {number} - tab index
     */
    getTabIndex(group, currentGroupId) {
        if (!this.isGroupSelected(group.id, currentGroupId) &&
            !this.containsSelectedGroup(group, currentGroupId)) {
            return -1;
        }
        else {
            return 0;
        }
    }
    /**
     * Verifies whether the current group is selected.
     *
     * @param {string} groupId - group ID
     * @param {string} currentGroupId - Current group ID
     * @returns {boolean} - 'true' if the current group is selected, otherwise 'false'
     */
    isGroupSelected(groupId, currentGroupId) {
        return groupId === currentGroupId;
    }
    /**
     * Generates a group ID for aria-controls.
     *
     * @param {string} groupId - group ID
     * @returns {string | undefined} - generated group ID
     */
    createAriaControls(groupId) {
        return this.configUtils.createGroupId(groupId);
    }
    /**
     * Generates aria-label for group menu item
     *
     * @param {Configurator.Group} group - group
     * @returns {string | undefined} - generated group ID
     */
    getAriaLabel(group) {
        let translatedText = '';
        if (group && group.groupType && this.isConflictGroupType(group.groupType)) {
            if (this.isConflictHeader(group)) {
                this.translation
                    .translate('configurator.a11y.conflictsInConfiguration', {
                    numberOfConflicts: this.getConflictNumber(group),
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                translatedText = group.description ? group.description : '';
            }
        }
        else {
            this.translation
                .translate('configurator.a11y.groupName', {
                group: group.description,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    /**
     * Generates an id for icons.
     *
     * @param {ICON_TYPE} type - icon type
     * @param {string} groupId - group id
     * @returns {string | undefined} - generated icon id
     */
    createIconId(type, groupId) {
        return this.ICON + type + groupId;
    }
    /**
     * Generates aria-describedby
     *
     * @param {Configurator.Group} group - Current group
     * @param {Configurator.Configuration} configuration - Configuration
     * @return {Observable<string>} - aria-describedby
     */
    getAriaDescribedby(group, configuration) {
        return this.isGroupVisited(group, configuration).pipe(map((isVisited) => {
            const CLOUDCPQ_CONFIGURATOR_TYPE = 'CLOUDCPQCONFIGURATOR';
            let ariaDescribedby = '';
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                !group.consistent &&
                group.groupType &&
                !this.isConflictGroupType(group.groupType)) {
                ariaDescribedby =
                    ariaDescribedby + this.createIconId(ICON_TYPE.WARNING, group.id);
            }
            if (configuration.owner.configuratorType !== CLOUDCPQ_CONFIGURATOR_TYPE &&
                group.complete &&
                group.consistent &&
                isVisited) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.SUCCESS, group.id);
            }
            if (!group.complete && isVisited) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.ERROR, group.id);
            }
            if (this.hasSubGroups(group)) {
                ariaDescribedby =
                    ariaDescribedby +
                        ' ' +
                        this.createIconId(ICON_TYPE.CARET_RIGHT, group.id);
            }
            ariaDescribedby = ariaDescribedby + ' inListOfGroups';
            return ariaDescribedby;
        }));
    }
    getGroupMenuTitle(group) {
        let title = group.description;
        if (!this.isConflictHeader(group) && !this.isConflictGroup(group)) {
            this.configExpertModeService
                .getExpModeActive()
                .pipe(take(1))
                .subscribe((expMode) => {
                if (expMode) {
                    title += ` / [${group.name}]`;
                }
            });
        }
        return title;
    }
    displayMenuItem(group) {
        return this.configuration$.pipe(map((configuration) => {
            let displayMenuItem = true;
            if (configuration.immediateConflictResolution &&
                group.groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP) {
                displayMenuItem = false;
            }
            return displayMenuItem;
        }));
    }
    /**
     * Checks if conflict solver dialog is active
     * @param configuration
     * @returns Conflict solver dialog active?
     */
    isDialogActive(configuration) {
        return configuration.interactionState.showConflictSolverDialog ?? false;
    }
}
ConfiguratorGroupMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuComponent, deps: [{ token: ConfiguratorCommonsService }, { token: ConfiguratorGroupsService }, { token: i3.HamburgerMenuService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorStorefrontUtilsService }, { token: ConfiguratorGroupMenuService }, { token: i3.DirectionService }, { token: i1$1.TranslationService }, { token: ConfiguratorExpertModeService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorGroupMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorGroupMenuComponent, selector: "cx-configurator-group-menu", viewQueries: [{ propertyName: "groups", predicate: ["groupItem"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostGroups\">\n  <ng-container *ngIf=\"!isDialogActive(configuration); else ghostGroups\">\n    <div class=\"cx-group-menu\" role=\"tablist\">\n      <span id=\"listOfGroups\" class=\"cx-visually-hidden\">\n        {{ 'configurator.a11y.listOfGroups' | cxTranslate }}\n      </span>\n      <span id=\"inListOfGroups\" class=\"cx-visually-hidden\" aria-hidden=\"true\">\n        {{ 'configurator.a11y.inListOfGroups' | cxTranslate }}\n      </span>\n      <ng-container *ngIf=\"displayedGroups$ | async as groups\">\n        <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n          <ng-container *ngFor=\"let group of groups; let groupIndex = index\">\n            <ng-container *ngIf=\"displayedParentGroup$ | async as parentGroup\">\n              <button\n                *ngIf=\"parentGroup !== null && groupIndex === 0\"\n                #groupItem\n                class=\"cx-menu-back\"\n                role=\"tab\"\n                [attr.aria-selected]=\"false\"\n                [attr.aria-label]=\"\n                  isConflictGroupTypeAllowingUndefined(parentGroup.groupType)\n                    ? ('configurator.a11y.conflictBack' | cxTranslate)\n                    : ('configurator.a11y.groupBack' | cxTranslate)\n                \"\n                aria-describedby=\"listOfGroups\"\n                [cxFocus]=\"{ key: 'cx-menu-back' }\"\n                (click)=\"navigateUp()\"\n                (keydown)=\"\n                  switchGroupOnArrowPress(\n                    $event,\n                    groupIndex,\n                    group,\n                    currentGroup\n                  )\n                \"\n              >\n                <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n                {{ 'configurator.button.back' | cxTranslate }}\n              </button>\n            </ng-container>\n            <ng-container *ngIf=\"displayMenuItem(group) | async\">\n              <button\n                #groupItem\n                id=\"{{ group.id }}\"\n                ngClass=\"{{\n                  getGroupStatusStyles(group, configuration) | async\n                }}\"\n                role=\"tab\"\n                [class.DISABLED]=\"!group.configurable\"\n                [class.cx-menu-conflict]=\"\n                  isConflictGroupTypeAllowingUndefined(group.groupType)\n                \"\n                [class.active]=\"isGroupSelected(group.id, currentGroup.id)\"\n                [class.disable]=\"!group.configurable\"\n                [attr.aria-describedby]=\"\n                  getAriaDescribedby(group, configuration) | async\n                \"\n                [attr.aria-selected]=\"\n                  isGroupSelected(group.id, currentGroup.id)\n                \"\n                [attr.aria-controls]=\"\n                  isGroupSelected(group.id, currentGroup.id)\n                    ? createAriaControls(group.id)\n                    : null\n                \"\n                [attr.aria-label]=\"getAriaLabel(group)\"\n                [cxFocus]=\"{\n                  key: group.id\n                }\"\n                (click)=\"click(group)\"\n                [tabindex]=\"getTabIndex(group, currentGroup.id)\"\n                (keydown)=\"\n                  switchGroupOnArrowPress(\n                    $event,\n                    groupIndex,\n                    group,\n                    currentGroup\n                  )\n                \"\n              >\n                <span title=\"{{ group.description }}\">{{\n                  getGroupMenuTitle(group)\n                }}</span>\n                <div class=\"groupIndicators\">\n                  <div class=\"conflictNumberIndicator\">\n                    {{ getConflictNumber(group) }}\n                  </div>\n                  <div class=\"groupStatusIndicator\">\n                    <cx-icon\n                      class=\"WARNING\"\n                      [type]=\"iconTypes.WARNING\"\n                      id=\"{{ createIconId(iconTypes.WARNING, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconConflict' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupConflict' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                  </div>\n                  <div class=\"groupStatusIndicator\">\n                    <cx-icon\n                      class=\"ERROR\"\n                      [type]=\"iconTypes.ERROR\"\n                      id=\"{{ createIconId(iconTypes.ERROR, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconIncomplete' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupIncomplete' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                    <cx-icon\n                      class=\"COMPLETE\"\n                      [type]=\"iconTypes.SUCCESS\"\n                      id=\"{{ createIconId(iconTypes.SUCCESS, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconComplete' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupComplete' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                  </div>\n                  <div class=\"subGroupIndicator\">\n                    <cx-icon\n                      *ngIf=\"hasSubGroups(group)\"\n                      [type]=\"iconTypes.CARET_RIGHT\"\n                      id=\"{{ createIconId(iconTypes.CARET_RIGHT, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconSubGroup' | cxTranslate\n                      \"\n                      title=\"{{ 'configurator.icon.subgroup' | cxTranslate }}\"\n                    ></cx-icon>\n                  </div>\n                </div>\n              </button>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </ng-container>\n    </div> </ng-container\n></ng-container>\n<ng-template #ghostGroups>\n  <div class=\"cx-ghost-group-menu\">\n    <div\n      *ngFor=\"let number of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\"\n      class=\"cx-ghost-menu-item\"\n    >\n      <div class=\"cx-ghost-item-title ghost\"></div>\n    </div>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-group-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostGroups\">\n  <ng-container *ngIf=\"!isDialogActive(configuration); else ghostGroups\">\n    <div class=\"cx-group-menu\" role=\"tablist\">\n      <span id=\"listOfGroups\" class=\"cx-visually-hidden\">\n        {{ 'configurator.a11y.listOfGroups' | cxTranslate }}\n      </span>\n      <span id=\"inListOfGroups\" class=\"cx-visually-hidden\" aria-hidden=\"true\">\n        {{ 'configurator.a11y.inListOfGroups' | cxTranslate }}\n      </span>\n      <ng-container *ngIf=\"displayedGroups$ | async as groups\">\n        <ng-container *ngIf=\"currentGroup$ | async as currentGroup\">\n          <ng-container *ngFor=\"let group of groups; let groupIndex = index\">\n            <ng-container *ngIf=\"displayedParentGroup$ | async as parentGroup\">\n              <button\n                *ngIf=\"parentGroup !== null && groupIndex === 0\"\n                #groupItem\n                class=\"cx-menu-back\"\n                role=\"tab\"\n                [attr.aria-selected]=\"false\"\n                [attr.aria-label]=\"\n                  isConflictGroupTypeAllowingUndefined(parentGroup.groupType)\n                    ? ('configurator.a11y.conflictBack' | cxTranslate)\n                    : ('configurator.a11y.groupBack' | cxTranslate)\n                \"\n                aria-describedby=\"listOfGroups\"\n                [cxFocus]=\"{ key: 'cx-menu-back' }\"\n                (click)=\"navigateUp()\"\n                (keydown)=\"\n                  switchGroupOnArrowPress(\n                    $event,\n                    groupIndex,\n                    group,\n                    currentGroup\n                  )\n                \"\n              >\n                <cx-icon [type]=\"iconTypes.CARET_LEFT\"></cx-icon>\n                {{ 'configurator.button.back' | cxTranslate }}\n              </button>\n            </ng-container>\n            <ng-container *ngIf=\"displayMenuItem(group) | async\">\n              <button\n                #groupItem\n                id=\"{{ group.id }}\"\n                ngClass=\"{{\n                  getGroupStatusStyles(group, configuration) | async\n                }}\"\n                role=\"tab\"\n                [class.DISABLED]=\"!group.configurable\"\n                [class.cx-menu-conflict]=\"\n                  isConflictGroupTypeAllowingUndefined(group.groupType)\n                \"\n                [class.active]=\"isGroupSelected(group.id, currentGroup.id)\"\n                [class.disable]=\"!group.configurable\"\n                [attr.aria-describedby]=\"\n                  getAriaDescribedby(group, configuration) | async\n                \"\n                [attr.aria-selected]=\"\n                  isGroupSelected(group.id, currentGroup.id)\n                \"\n                [attr.aria-controls]=\"\n                  isGroupSelected(group.id, currentGroup.id)\n                    ? createAriaControls(group.id)\n                    : null\n                \"\n                [attr.aria-label]=\"getAriaLabel(group)\"\n                [cxFocus]=\"{\n                  key: group.id\n                }\"\n                (click)=\"click(group)\"\n                [tabindex]=\"getTabIndex(group, currentGroup.id)\"\n                (keydown)=\"\n                  switchGroupOnArrowPress(\n                    $event,\n                    groupIndex,\n                    group,\n                    currentGroup\n                  )\n                \"\n              >\n                <span title=\"{{ group.description }}\">{{\n                  getGroupMenuTitle(group)\n                }}</span>\n                <div class=\"groupIndicators\">\n                  <div class=\"conflictNumberIndicator\">\n                    {{ getConflictNumber(group) }}\n                  </div>\n                  <div class=\"groupStatusIndicator\">\n                    <cx-icon\n                      class=\"WARNING\"\n                      [type]=\"iconTypes.WARNING\"\n                      id=\"{{ createIconId(iconTypes.WARNING, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconConflict' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupConflict' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                  </div>\n                  <div class=\"groupStatusIndicator\">\n                    <cx-icon\n                      class=\"ERROR\"\n                      [type]=\"iconTypes.ERROR\"\n                      id=\"{{ createIconId(iconTypes.ERROR, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconIncomplete' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupIncomplete' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                    <cx-icon\n                      class=\"COMPLETE\"\n                      [type]=\"iconTypes.SUCCESS\"\n                      id=\"{{ createIconId(iconTypes.SUCCESS, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconComplete' | cxTranslate\n                      \"\n                      title=\"{{\n                        'configurator.icon.groupComplete' | cxTranslate\n                      }}\"\n                    ></cx-icon>\n                  </div>\n                  <div class=\"subGroupIndicator\">\n                    <cx-icon\n                      *ngIf=\"hasSubGroups(group)\"\n                      [type]=\"iconTypes.CARET_RIGHT\"\n                      id=\"{{ createIconId(iconTypes.CARET_RIGHT, group.id) }}\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.iconSubGroup' | cxTranslate\n                      \"\n                      title=\"{{ 'configurator.icon.subgroup' | cxTranslate }}\"\n                    ></cx-icon>\n                  </div>\n                </div>\n              </button>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </ng-container>\n    </div> </ng-container\n></ng-container>\n<ng-template #ghostGroups>\n  <div class=\"cx-ghost-group-menu\">\n    <div\n      *ngFor=\"let number of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\"\n      class=\"cx-ghost-menu-item\"\n    >\n      <div class=\"cx-ghost-item-title ghost\"></div>\n    </div>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: ConfiguratorGroupsService }, { type: i3.HamburgerMenuService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorStorefrontUtilsService }, { type: ConfiguratorGroupMenuService }, { type: i3.DirectionService }, { type: i1$1.TranslationService }, { type: ConfiguratorExpertModeService }]; }, propDecorators: { groups: [{
                type: ViewChildren,
                args: ['groupItem']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupMenuModule {
}
ConfiguratorGroupMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorGroupMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuModule, declarations: [ConfiguratorGroupMenuComponent], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule], exports: [ConfiguratorGroupMenuComponent] });
ConfiguratorGroupMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorMenu: {
                    component: ConfiguratorGroupMenuComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorMenu: {
                                    component: ConfiguratorGroupMenuComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorGroupMenuComponent],
                    exports: [ConfiguratorGroupMenuComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupTitleComponent {
    constructor(configuratorCommonsService, configuratorGroupsService, configRouterExtractorService, configExpertModeService, breakpointService, configuratorStorefrontUtilsService, hamburgerMenuService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuratorGroupsService = configuratorGroupsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configExpertModeService = configExpertModeService;
        this.breakpointService = breakpointService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.hamburgerMenuService = hamburgerMenuService;
        this.ghostStyle = true;
        this.subscription = new Subscription();
        this.PRE_HEADER = '.PreHeader';
        this.displayedGroup$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorGroupsService.getCurrentGroup(routerData.owner).pipe(tap(() => {
            this.ghostStyle = false;
        }))));
        this.iconTypes = ICON_TYPE;
    }
    ngOnInit() {
        this.subscription.add(this.hamburgerMenuService.isExpanded.subscribe((isExpanded) => {
            if (!isExpanded) {
                this.configuratorStorefrontUtilsService.changeStyling(this.PRE_HEADER, 'display', 'none');
            }
            else {
                this.configuratorStorefrontUtilsService.changeStyling(this.PRE_HEADER, 'display', 'block');
            }
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.configuratorStorefrontUtilsService.removeStyling(this.PRE_HEADER, 'display');
    }
    getGroupTitle(group) {
        let title = group.description;
        if (group.groupType !== Configurator.GroupType.CONFLICT_GROUP) {
            this.configExpertModeService
                .getExpModeActive()
                .pipe(take(1))
                .subscribe((expMode) => {
                if (expMode) {
                    title += ` / [${group.name}]`;
                }
            });
        }
        return title;
    }
    /**
     * Verifies whether the current screen size equals or is smaller than breakpoint `BREAKPOINT.md`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is smaller than`BREAKPOINT.md` returns `true`, otherwise `false`.
     */
    isMobile() {
        return this.breakpointService.isDown(BREAKPOINT.md);
    }
}
ConfiguratorGroupTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleComponent, deps: [{ token: ConfiguratorCommonsService }, { token: ConfiguratorGroupsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorExpertModeService }, { token: i3.BreakpointService }, { token: ConfiguratorStorefrontUtilsService }, { token: i3.HamburgerMenuService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorGroupTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorGroupTitleComponent, selector: "cx-configurator-group-title", host: { properties: { "class.ghost": "this.ghostStyle" } }, ngImport: i0, template: "<ng-container *ngIf=\"displayedGroup$ | async as group; else ghostGroup\">\n  <div class=\"cx-group-title\">\n    <ng-container *ngIf=\"isMobile() | async\">\n      <cx-hamburger-menu></cx-hamburger-menu>\n    </ng-container>\n\n    {{ getGroupTitle(group) }}\n  </div>\n</ng-container>\n<ng-template #ghostGroup>\n  <div class=\"cx-ghost-group-title\"></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.HamburgerMenuComponent, selector: "cx-hamburger-menu" }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-group-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"displayedGroup$ | async as group; else ghostGroup\">\n  <div class=\"cx-group-title\">\n    <ng-container *ngIf=\"isMobile() | async\">\n      <cx-hamburger-menu></cx-hamburger-menu>\n    </ng-container>\n\n    {{ getGroupTitle(group) }}\n  </div>\n</ng-container>\n<ng-template #ghostGroup>\n  <div class=\"cx-ghost-group-title\"></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: ConfiguratorGroupsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorExpertModeService }, { type: i3.BreakpointService }, { type: ConfiguratorStorefrontUtilsService }, { type: i3.HamburgerMenuService }]; }, propDecorators: { ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorGroupTitleModule {
}
ConfiguratorGroupTitleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorGroupTitleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleModule, declarations: [ConfiguratorGroupTitleComponent], imports: [CommonModule, HamburgerMenuModule], exports: [ConfiguratorGroupTitleComponent] });
ConfiguratorGroupTitleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorGroupTitle: {
                    component: ConfiguratorGroupTitleComponent,
                },
            },
        }),
    ], imports: [CommonModule, HamburgerMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorGroupTitleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, HamburgerMenuModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorGroupTitle: {
                                    component: ConfiguratorGroupTitleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorGroupTitleComponent],
                    exports: [ConfiguratorGroupTitleComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewAttributeComponent {
    constructor(breakpointService) {
        this.breakpointService = breakpointService;
    }
    extractPriceFormulaParameters() {
        return {
            quantity: this.attributeOverview.quantity,
            price: this.attributeOverview.valuePrice,
            priceTotal: this.attributeOverview.valuePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Verifies whether the current screen size equals or is larger than breakpoint `BREAKPOINT.md`.
     *
     * @returns {Observable<boolean>} - If the given breakpoint equals or is larger than`BREAKPOINT.md` returns `true`, otherwise `false`.
     */
    isDesktop() {
        return this.breakpointService.isUp(BREAKPOINT.md);
    }
}
ConfiguratorOverviewAttributeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeComponent, deps: [{ token: i3.BreakpointService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewAttributeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewAttributeComponent, selector: "cx-configurator-overview-attribute", inputs: { attributeOverview: "attributeOverview" }, ngImport: i0, template: "<span class=\"cx-visually-hidden\">\n  {{\n    attributeOverview.valuePrice && attributeOverview.valuePrice?.value !== 0\n      ? attributeOverview.valuePriceTotal &&\n        attributeOverview.valuePriceTotal?.value !== 0\n        ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n          | cxTranslate\n            : {\n                value: attributeOverview.value,\n                attribute: attributeOverview.attribute,\n                price: attributeOverview.valuePriceTotal.formattedValue\n              })\n        : ('configurator.a11y.valueOfAttributeFullWithPrice'\n          | cxTranslate\n            : {\n                value: attributeOverview.value,\n                attribute: attributeOverview.attribute,\n                price: attributeOverview.valuePrice.formattedValue\n              })\n      : ('configurator.a11y.valueOfAttributeFull'\n        | cxTranslate\n          : {\n              value: attributeOverview.value,\n              attribute: attributeOverview.attribute\n            })\n  }}\n</span>\n<div class=\"cx-attribute-value\" aria-hidden=\"true\">\n  {{ attributeOverview.value }}\n</div>\n<ng-container *ngIf=\"isDesktop() | async; else mobile\">\n  <div class=\"cx-attribute-label\" aria-hidden=\"true\">\n    {{ attributeOverview.attribute }}\n  </div>\n  <div class=\"cx-attribute-price\" aria-hidden=\"true\">\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n<ng-template #mobile>\n  <div class=\"cx-attribute-price\" aria-hidden=\"true\">\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n  <div class=\"cx-attribute-label\" aria-hidden=\"true\">\n    {{ attributeOverview.attribute }}\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-attribute', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span class=\"cx-visually-hidden\">\n  {{\n    attributeOverview.valuePrice && attributeOverview.valuePrice?.value !== 0\n      ? attributeOverview.valuePriceTotal &&\n        attributeOverview.valuePriceTotal?.value !== 0\n        ? ('configurator.a11y.valueOfAttributeFullWithPrice'\n          | cxTranslate\n            : {\n                value: attributeOverview.value,\n                attribute: attributeOverview.attribute,\n                price: attributeOverview.valuePriceTotal.formattedValue\n              })\n        : ('configurator.a11y.valueOfAttributeFullWithPrice'\n          | cxTranslate\n            : {\n                value: attributeOverview.value,\n                attribute: attributeOverview.attribute,\n                price: attributeOverview.valuePrice.formattedValue\n              })\n      : ('configurator.a11y.valueOfAttributeFull'\n        | cxTranslate\n          : {\n              value: attributeOverview.value,\n              attribute: attributeOverview.attribute\n            })\n  }}\n</span>\n<div class=\"cx-attribute-value\" aria-hidden=\"true\">\n  {{ attributeOverview.value }}\n</div>\n<ng-container *ngIf=\"isDesktop() | async; else mobile\">\n  <div class=\"cx-attribute-label\" aria-hidden=\"true\">\n    {{ attributeOverview.attribute }}\n  </div>\n  <div class=\"cx-attribute-price\" aria-hidden=\"true\">\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n<ng-template #mobile>\n  <div class=\"cx-attribute-price\" aria-hidden=\"true\">\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n  <div class=\"cx-attribute-label\" aria-hidden=\"true\">\n    {{ attributeOverview.attribute }}\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i3.BreakpointService }]; }, propDecorators: { attributeOverview: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewAttributeModule {
}
ConfiguratorOverviewAttributeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewAttributeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeModule, declarations: [ConfiguratorOverviewAttributeComponent], imports: [CommonModule, I18nModule, ConfiguratorPriceModule], exports: [ConfiguratorOverviewAttributeComponent] });
ConfiguratorOverviewAttributeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeModule, imports: [CommonModule, I18nModule, ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewAttributeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ConfiguratorPriceModule],
                    declarations: [ConfiguratorOverviewAttributeComponent],
                    exports: [ConfiguratorOverviewAttributeComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewBundleAttributeComponent {
    constructor(productService, translation) {
        this.productService = productService;
        this.translation = translation;
    }
    ngOnInit() {
        const noCommerceProduct = { images: {} };
        if (this.attributeOverview.productCode) {
            this.product$ = this.productService
                .get(this.attributeOverview.productCode, "list" /* ProductScope.LIST */)
                .pipe(map((respProduct) => {
                return respProduct ? respProduct : noCommerceProduct;
            }));
        }
        else {
            this.product$ = of(noCommerceProduct);
        }
    }
    /**
     * Returns primary image from product object
     *
     * @param {Product} product
     * @returns {(ImageGroup | ImageGroup[] | undefined)} - primary image. View can handle an undefined image
     */
    getProductPrimaryImage(product) {
        return product?.images?.PRIMARY;
    }
    /**
     * Extract corresponding price formula parameters
     *
     * @return {ConfiguratorPriceComponentOptions} - New price formula
     */
    extractPriceFormulaParameters() {
        return {
            quantity: this.attributeOverview.quantity,
            price: this.attributeOverview.valuePrice,
            priceTotal: this.attributeOverview.valuePriceTotal,
            isLightedUp: true,
        };
    }
    /**
     * Verifies whether the quantity should be displayed.
     *
     * @return {boolean} - 'true' if the quantity should be displayed, otherwise 'false'
     */
    displayQuantity() {
        const quantity = this.attributeOverview.quantity;
        return quantity !== undefined && quantity > 0;
    }
    /**
     * Verifies whether the item price should be displayed.
     *
     * @return {boolean} - 'true' if the item price price should be displayed, otherwise 'false'
     */
    displayPrice() {
        return (this.attributeOverview.valuePrice?.value !== undefined &&
            this.attributeOverview.valuePrice?.value > 0);
    }
    getAriaLabel() {
        let translatedText = '';
        if (this.displayQuantity()) {
            if (this.attributeOverview.valuePrice?.value !== undefined &&
                this.attributeOverview.valuePrice?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFullWithPriceAndQuantity', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                    price: this.attributeOverview.valuePriceTotal?.formattedValue,
                    quantity: this.attributeOverview.quantity,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFullWithQuantity', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                    quantity: this.attributeOverview.quantity,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
        }
        else {
            if (this.attributeOverview.valuePrice?.value !== undefined &&
                this.attributeOverview.valuePrice?.value !== 0) {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFullWithPrice', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                    price: this.attributeOverview.valuePriceTotal?.formattedValue,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
            else {
                this.translation
                    .translate('configurator.a11y.itemOfAttributeFull', {
                    item: this.attributeOverview.value,
                    attribute: this.attributeOverview.attribute,
                })
                    .pipe(take(1))
                    .subscribe((text) => (translatedText = text));
            }
        }
        return translatedText;
    }
}
ConfiguratorOverviewBundleAttributeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeComponent, deps: [{ token: i1$1.ProductService }, { token: i1$1.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewBundleAttributeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewBundleAttributeComponent, selector: "cx-configurator-cpq-overview-attribute", inputs: { attributeOverview: "attributeOverview" }, ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"cx-value-container\">\n    <div class=\"cx-thumbnail\">\n      <cx-media\n        [container]=\"getProductPrimaryImage(product)\"\n        format=\"product\"\n        aria-hidden=\"true\"\n      ></cx-media>\n    </div>\n    <span class=\"cx-visually-hidden\">\n      {{ getAriaLabel() }}\n    </span>\n    <div class=\"cx-value-info\" aria-hidden=\"true\">\n      <div>\n        {{ attributeOverview.value }}\n      </div>\n      <span class=\"cx-code\" *ngIf=\"attributeOverview?.productCode\">\n        {{ 'configurator.attribute.id' | cxTranslate }}:\n        {{ attributeOverview.productCode }}</span\n      >\n      <div *ngIf=\"displayQuantity()\" class=\"cx-quantity\">\n        <span class=\"cx-identifier\">{{\n          'configurator.attribute.quantity' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.quantity | cxNumeric\n        }}</span>\n      </div>\n      <div *ngIf=\"displayPrice()\" class=\"cx-price\">\n        <span class=\"cx-identifier\">{{\n          'configurator.overviewForm.itemPrice' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.valuePrice?.formattedValue\n        }}</span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"cx-attribute-price-container\" aria-hidden=\"true\">\n    <span class=\"cx-attribute-label\">{{ attributeOverview.attribute }}</span>\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: ConfiguratorPriceComponent, selector: "cx-configurator-price", inputs: ["formula"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.CxNumericPipe, name: "cxNumeric" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-cpq-overview-attribute', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <div class=\"cx-value-container\">\n    <div class=\"cx-thumbnail\">\n      <cx-media\n        [container]=\"getProductPrimaryImage(product)\"\n        format=\"product\"\n        aria-hidden=\"true\"\n      ></cx-media>\n    </div>\n    <span class=\"cx-visually-hidden\">\n      {{ getAriaLabel() }}\n    </span>\n    <div class=\"cx-value-info\" aria-hidden=\"true\">\n      <div>\n        {{ attributeOverview.value }}\n      </div>\n      <span class=\"cx-code\" *ngIf=\"attributeOverview?.productCode\">\n        {{ 'configurator.attribute.id' | cxTranslate }}:\n        {{ attributeOverview.productCode }}</span\n      >\n      <div *ngIf=\"displayQuantity()\" class=\"cx-quantity\">\n        <span class=\"cx-identifier\">{{\n          'configurator.attribute.quantity' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.quantity | cxNumeric\n        }}</span>\n      </div>\n      <div *ngIf=\"displayPrice()\" class=\"cx-price\">\n        <span class=\"cx-identifier\">{{\n          'configurator.overviewForm.itemPrice' | cxTranslate\n        }}</span>\n        <span class=\"cx-item\">{{\n          attributeOverview.valuePrice?.formattedValue\n        }}</span>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"cx-attribute-price-container\" aria-hidden=\"true\">\n    <span class=\"cx-attribute-label\">{{ attributeOverview.attribute }}</span>\n    <cx-configurator-price\n      [formula]=\"extractPriceFormulaParameters()\"\n    ></cx-configurator-price>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ProductService }, { type: i1$1.TranslationService }]; }, propDecorators: { attributeOverview: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewBundleAttributeModule {
}
ConfiguratorOverviewBundleAttributeModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewBundleAttributeModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, declarations: [ConfiguratorOverviewBundleAttributeComponent], imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule], exports: [ConfiguratorOverviewBundleAttributeComponent] });
ConfiguratorOverviewBundleAttributeModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewBundleAttributeModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MediaModule, I18nModule, ConfiguratorPriceModule],
                    declarations: [ConfiguratorOverviewBundleAttributeComponent],
                    exports: [ConfiguratorOverviewBundleAttributeComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFilterBarComponent {
    constructor(configuratorCommonsService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.iconTypes = ICON_TYPE;
        this.attributeFilterTypes = Configurator.OverviewFilter;
    }
    /**
     * gets the description for the given group id
     *
     * @param {string} groupId groupId
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    getGroupFilterDescription(overview, groupId) {
        return (overview.possibleGroups?.find((group) => group.id === groupId)
            ?.groupDescription ?? '');
    }
    /**
     * removes the given attribute filter and updates the configuration overview accordingly
     *
     * @param {Configurator.OverviewFilter} attrToRemove attribute filter to remove
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    onAttrFilterRemove(config, attrToRemove) {
        let [attrFilters, groupFilters] = this.getInputFilters(config.overview);
        attrFilters = attrFilters.filter((attrFilterName) => attrToRemove !== attrFilterName);
        this.configuratorCommonsService.updateConfigurationOverview(this.createInputConfig(config, attrFilters, groupFilters));
    }
    /**
     * removes the given group filter and updates the configuration overview accordingly
     *
     * @param {string} groupIdToRemove id of the group to be removed from filtering
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    onGroupFilterRemove(config, groupIdToRemove) {
        let [attrFilters, groupFilters] = this.getInputFilters(config.overview);
        groupFilters = groupFilters.filter((groupId) => groupIdToRemove !== groupId);
        this.configuratorCommonsService.updateConfigurationOverview(this.createInputConfig(config, attrFilters, groupFilters));
    }
    /**
     * check whether the button to remove all filters should be shown
     *
     * @param {Configurator.Overview} overview - current configuration overview data
     * @returns {boolean} - 'true' only if the button to remove all filters should be shown
     */
    isShowRemoveAll(overview) {
        const numFilters = (overview.attributeFilters?.length ?? 0) +
            (overview.groupFilters?.length ?? 0);
        return numFilters > 1;
    }
    /**
     * removes all filters and updates the configuration overview accordingly
     *
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    onRemoveAll(config) {
        this.configuratorCommonsService.updateConfigurationOverview(this.createInputConfig(config, [], []));
    }
    getInputFilters(overview) {
        return [overview.attributeFilters ?? [], overview.groupFilters ?? []];
    }
    createInputConfig(config, attrFilters, groupFilers) {
        return {
            ...config,
            overview: {
                configId: config.configId,
                productCode: config.productCode,
                attributeFilters: attrFilters,
                groupFilters: groupFilers,
                possibleGroups: config.overview?.possibleGroups,
            },
        };
    }
}
ConfiguratorOverviewFilterBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterBarComponent, deps: [{ token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewFilterBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewFilterBarComponent, selector: "cx-configurator-overview-filter-bar", inputs: { config: "config" }, ngImport: i0, template: "<ng-container\n  *ngFor=\"let filter of config.overview.attributeFilters; let i = index\"\n>\n  <button\n    class=\"cx-overview-filter-applied\"\n    title=\"{{\n      (filter === attributeFilterTypes.PRICE_RELEVANT\n        ? 'configurator.overviewFilter.removeByPrice'\n        : 'configurator.overviewFilter.removeMySelections'\n      ) | cxTranslate\n    }}\"\n    (click)=\"onAttrFilterRemove(config, filter)\"\n  >\n    {{\n      (filter === attributeFilterTypes.PRICE_RELEVANT\n        ? 'configurator.overviewFilter.byPrice'\n        : 'configurator.overviewFilter.mySelections'\n      ) | cxTranslate\n    }}\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-container>\n\n<ng-container\n  *ngFor=\"let groupId of config.overview.groupFilters; let i = index\"\n>\n  <button\n    class=\"cx-overview-filter-applied\"\n    title=\"{{\n      'configurator.overviewFilter.removeByGroup'\n        | cxTranslate\n          : { group: getGroupFilterDescription(config.overview, groupId) }\n    }}\"\n    (click)=\"onGroupFilterRemove(config, groupId)\"\n  >\n    {{ getGroupFilterDescription(config.overview, groupId) }}\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-container>\n\n<ng-container *ngIf=\"isShowRemoveAll(config.overview)\">\n  <button\n    class=\"cx-overview-filter-applied\"\n    title=\"{{ 'configurator.overviewFilter.removeAllFilters' | cxTranslate }}\"\n    (click)=\"onRemoveAll(config)\"\n  >\n    {{ 'configurator.overviewFilter.removeAll' | cxTranslate }}\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-filter-bar', template: "<ng-container\n  *ngFor=\"let filter of config.overview.attributeFilters; let i = index\"\n>\n  <button\n    class=\"cx-overview-filter-applied\"\n    title=\"{{\n      (filter === attributeFilterTypes.PRICE_RELEVANT\n        ? 'configurator.overviewFilter.removeByPrice'\n        : 'configurator.overviewFilter.removeMySelections'\n      ) | cxTranslate\n    }}\"\n    (click)=\"onAttrFilterRemove(config, filter)\"\n  >\n    {{\n      (filter === attributeFilterTypes.PRICE_RELEVANT\n        ? 'configurator.overviewFilter.byPrice'\n        : 'configurator.overviewFilter.mySelections'\n      ) | cxTranslate\n    }}\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-container>\n\n<ng-container\n  *ngFor=\"let groupId of config.overview.groupFilters; let i = index\"\n>\n  <button\n    class=\"cx-overview-filter-applied\"\n    title=\"{{\n      'configurator.overviewFilter.removeByGroup'\n        | cxTranslate\n          : { group: getGroupFilterDescription(config.overview, groupId) }\n    }}\"\n    (click)=\"onGroupFilterRemove(config, groupId)\"\n  >\n    {{ getGroupFilterDescription(config.overview, groupId) }}\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-container>\n\n<ng-container *ngIf=\"isShowRemoveAll(config.overview)\">\n  <button\n    class=\"cx-overview-filter-applied\"\n    title=\"{{ 'configurator.overviewFilter.removeAllFilters' | cxTranslate }}\"\n    (click)=\"onRemoveAll(config)\"\n  >\n    {{ 'configurator.overviewFilter.removeAll' | cxTranslate }}\n    <span aria-hidden=\"true\">\n      <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n    </span>\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }]; }, propDecorators: { config: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFilterComponent {
    constructor(configuratorCommonsService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.showFilterBar = true;
        this.priceFilter = new UntypedFormControl('');
        this.mySelectionsFilter = new UntypedFormControl('');
        this.groupFilters = new Array();
    }
    ngOnChanges() {
        this.extractAttrFilterState(this.config);
        this.extractGroupFilterState(this.config);
    }
    /**
     * Updates the overview based on the filters currently selected in the UI
     *
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    onFilter(config) {
        const inputConfig = this.createInputConfig(config, this.collectAttrFilters(), this.collectGroupFilters(config.overview));
        this.configuratorCommonsService.updateConfigurationOverview(inputConfig);
    }
    extractGroupFilterState(configuration) {
        this.groupFilters = [];
        configuration.overview.possibleGroups?.forEach((group) => {
            let isSelected = false;
            if (configuration.overview.groupFilters) {
                isSelected = configuration.overview.groupFilters.indexOf(group.id) >= 0;
            }
            this.groupFilters.push(new UntypedFormControl(isSelected));
        });
    }
    extractAttrFilterState(configuration) {
        if (configuration.overview.attributeFilters) {
            const isPriceFilterSelected = configuration.overview.attributeFilters.indexOf(Configurator.OverviewFilter.PRICE_RELEVANT) >= 0;
            this.priceFilter.setValue(isPriceFilterSelected);
            const isMySelectionsFilterSelected = configuration.overview.attributeFilters.indexOf(Configurator.OverviewFilter.USER_INPUT) >= 0;
            this.mySelectionsFilter.setValue(isMySelectionsFilterSelected);
        }
    }
    collectGroupFilters(overview) {
        const filters = [];
        let idx = 0;
        this.groupFilters.forEach((groupFilter) => {
            if (groupFilter.value && overview?.possibleGroups) {
                filters.push(overview.possibleGroups[idx].id);
            }
            idx++;
        });
        return filters;
    }
    collectAttrFilters() {
        const filters = [];
        if (this.priceFilter.value) {
            filters.push(Configurator.OverviewFilter.PRICE_RELEVANT);
        }
        if (this.mySelectionsFilter.value) {
            filters.push(Configurator.OverviewFilter.USER_INPUT);
        }
        return filters;
    }
    createInputConfig(config, attrFilters, groupFilers) {
        return {
            ...config,
            overview: {
                configId: config.configId,
                productCode: config.productCode,
                attributeFilters: attrFilters,
                groupFilters: groupFilers,
                possibleGroups: config.overview?.possibleGroups,
            },
        };
    }
}
ConfiguratorOverviewFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterComponent, deps: [{ token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewFilterComponent, selector: "cx-configurator-overview-filter", inputs: { showFilterBar: "showFilterBar", config: "config" }, usesOnChanges: true, ngImport: i0, template: "<ng-container *ngIf=\"showFilterBar\">\n  <cx-configurator-overview-filter-bar\n    [config]=\"config\"\n  ></cx-configurator-overview-filter-bar>\n</ng-container>\n<div class=\"cx-overview-filter-header\">\n  {{ 'configurator.overviewFilter.byOption' | cxTranslate }}\n</div>\n\n<div class=\"cx-overview-filter-option\">\n  <div class=\"form-check\">\n    <input\n      id=\"cx-configurator-overview-filter-option-price\"\n      type=\"checkbox\"\n      class=\"form-check-input\"\n      [formControl]=\"priceFilter\"\n      (change)=\"onFilter(config)\"\n      name=\"config-overview-price-filter\"\n      [attr.aria-label]=\"\n        'configurator.a11y.filterOverviewByPrice' | cxTranslate\n      \"\n    />\n    <label\n      class=\"form-check-label\"\n      for=\"cx-configurator-overview-filter-option-price\"\n    >\n      {{ 'configurator.overviewFilter.byPrice' | cxTranslate }}</label\n    >\n  </div>\n</div>\n\n<div class=\"cx-overview-filter-option\">\n  <div class=\"form-check\">\n    <input\n      id=\"cx-configurator-overview-filter-option-mySelections\"\n      type=\"checkbox\"\n      class=\"form-check-input\"\n      [formControl]=\"mySelectionsFilter\"\n      (change)=\"onFilter(config)\"\n      name=\"config-overview-my-selection-filter\"\n      [attr.aria-label]=\"\n        'configurator.a11y.filterOverviewByMySelections' | cxTranslate\n      \"\n    />\n    <label\n      class=\"form-check-label\"\n      for=\"cx-configurator-overview-filter-option-mySelections\"\n    >\n      {{ 'configurator.overviewFilter.mySelections' | cxTranslate }}</label\n    >\n  </div>\n</div>\n<ng-container *ngIf=\"config.overview.possibleGroups\">\n  <div class=\"cx-overview-filter-header\">\n    {{ 'configurator.overviewFilter.byGroup' | cxTranslate }}\n  </div>\n  <ng-container\n    *ngFor=\"let group of config.overview.possibleGroups; let i = index\"\n  >\n    <div class=\"cx-overview-filter-option\">\n      <div class=\"form-check\">\n        <input\n          id=\"{{ 'cx-configurator-overview-filter-option-group-' + group.id }}\"\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [formControl]=\"groupFilters[i]\"\n          (change)=\"onFilter(config)\"\n          name=\"{{ 'config-overview-group-filter-' + group.id }}\"\n          [attr.aria-label]=\"\n            'configurator.a11y.filterOverviewByGroup'\n              | cxTranslate: { groupName: group.groupDescription }\n          \"\n        />\n        <label\n          class=\"form-check-label\"\n          for=\"{{ 'cx-configurator-overview-filter-option-group-' + group.id }}\"\n          >{{ group.groupDescription }}</label\n        >\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i8.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i8.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i8.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "component", type: ConfiguratorOverviewFilterBarComponent, selector: "cx-configurator-overview-filter-bar", inputs: ["config"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-filter', template: "<ng-container *ngIf=\"showFilterBar\">\n  <cx-configurator-overview-filter-bar\n    [config]=\"config\"\n  ></cx-configurator-overview-filter-bar>\n</ng-container>\n<div class=\"cx-overview-filter-header\">\n  {{ 'configurator.overviewFilter.byOption' | cxTranslate }}\n</div>\n\n<div class=\"cx-overview-filter-option\">\n  <div class=\"form-check\">\n    <input\n      id=\"cx-configurator-overview-filter-option-price\"\n      type=\"checkbox\"\n      class=\"form-check-input\"\n      [formControl]=\"priceFilter\"\n      (change)=\"onFilter(config)\"\n      name=\"config-overview-price-filter\"\n      [attr.aria-label]=\"\n        'configurator.a11y.filterOverviewByPrice' | cxTranslate\n      \"\n    />\n    <label\n      class=\"form-check-label\"\n      for=\"cx-configurator-overview-filter-option-price\"\n    >\n      {{ 'configurator.overviewFilter.byPrice' | cxTranslate }}</label\n    >\n  </div>\n</div>\n\n<div class=\"cx-overview-filter-option\">\n  <div class=\"form-check\">\n    <input\n      id=\"cx-configurator-overview-filter-option-mySelections\"\n      type=\"checkbox\"\n      class=\"form-check-input\"\n      [formControl]=\"mySelectionsFilter\"\n      (change)=\"onFilter(config)\"\n      name=\"config-overview-my-selection-filter\"\n      [attr.aria-label]=\"\n        'configurator.a11y.filterOverviewByMySelections' | cxTranslate\n      \"\n    />\n    <label\n      class=\"form-check-label\"\n      for=\"cx-configurator-overview-filter-option-mySelections\"\n    >\n      {{ 'configurator.overviewFilter.mySelections' | cxTranslate }}</label\n    >\n  </div>\n</div>\n<ng-container *ngIf=\"config.overview.possibleGroups\">\n  <div class=\"cx-overview-filter-header\">\n    {{ 'configurator.overviewFilter.byGroup' | cxTranslate }}\n  </div>\n  <ng-container\n    *ngFor=\"let group of config.overview.possibleGroups; let i = index\"\n  >\n    <div class=\"cx-overview-filter-option\">\n      <div class=\"form-check\">\n        <input\n          id=\"{{ 'cx-configurator-overview-filter-option-group-' + group.id }}\"\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [formControl]=\"groupFilters[i]\"\n          (change)=\"onFilter(config)\"\n          name=\"{{ 'config-overview-group-filter-' + group.id }}\"\n          [attr.aria-label]=\"\n            'configurator.a11y.filterOverviewByGroup'\n              | cxTranslate: { groupName: group.groupDescription }\n          \"\n        />\n        <label\n          class=\"form-check-label\"\n          for=\"{{ 'cx-configurator-overview-filter-option-group-' + group.id }}\"\n          >{{ group.groupDescription }}</label\n        >\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }]; }, propDecorators: { showFilterBar: [{
                type: Input
            }], config: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFilterBarModule {
}
ConfiguratorOverviewFilterBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFilterBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterBarModule, declarations: [ConfiguratorOverviewFilterBarComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        FormsModule,
        ReactiveFormsModule], exports: [ConfiguratorOverviewFilterBarComponent] });
ConfiguratorOverviewFilterBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterBarModule, imports: [CommonModule,
        I18nModule,
        IconModule,
        FormsModule,
        ReactiveFormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        FormsModule,
                        ReactiveFormsModule,
                    ],
                    declarations: [ConfiguratorOverviewFilterBarComponent],
                    exports: [ConfiguratorOverviewFilterBarComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFilterModule {
}
ConfiguratorOverviewFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterModule, declarations: [ConfiguratorOverviewFilterComponent], imports: [CommonModule,
        I18nModule,
        FormsModule,
        ReactiveFormsModule,
        ConfiguratorOverviewFilterBarModule], exports: [ConfiguratorOverviewFilterComponent] });
ConfiguratorOverviewFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterModule, imports: [CommonModule,
        I18nModule,
        FormsModule,
        ReactiveFormsModule,
        ConfiguratorOverviewFilterBarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        FormsModule,
                        ReactiveFormsModule,
                        ConfiguratorOverviewFilterBarModule,
                    ],
                    declarations: [ConfiguratorOverviewFilterComponent],
                    exports: [ConfiguratorOverviewFilterComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFilterButtonComponent {
    constructor(launchDialogService, configuratorCommonsService, configRouterExtractorService) {
        this.launchDialogService = launchDialogService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.ghostStyle = true;
        //TODO(CXSPA-3392) remove this member in next major, it is not used
        /**
         * @deprecated since 6.1. Use configurationWithOv$ instead
         */
        this.config$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)), 
        // filter 'strict null check safe'
        filter((configuration) => configuration.overview != null), tap(() => {
            this.ghostStyle = false;
        }));
        this.configurationWithOv$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)), 
        // filter 'strict null check safe'
        filter((configuration) => configuration.overview != null), tap(() => {
            this.ghostStyle = false;
        }));
    }
    /**
     * get the number of filters currently applied to the overview page
     *
     * @param {Configurator.Overview} overview - current configuration overview data
     * @returns {number} - number of applied filters
     */
    getNumFilters(overview) {
        return ((overview.attributeFilters?.length ?? 0) +
            (overview.groupFilters?.length ?? 0));
    }
    /**
     * opens the filter modal
     * @param {Configurator.ConfigurationWithOverview} config - current configuration with overview data
     */
    openFilterModal(config) {
        this.launchDialogService.openDialogAndSubscribe("CONFIGURATOR_OV_FILTER" /* LAUNCH_CALLER.CONFIGURATOR_OV_FILTER */, this.filterButton, config);
    }
}
ConfiguratorOverviewFilterButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonComponent, deps: [{ token: i3.LaunchDialogService }, { token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewFilterButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewFilterButtonComponent, selector: "cx-configurator-overview-filter-button", host: { properties: { "class.ghost": "this.ghostStyle" } }, viewQueries: [{ propertyName: "filterButton", first: true, predicate: ["filterButton"], descendants: true }], ngImport: i0, template: "<ng-container\n  *ngIf=\"\n    configurationWithOv$ | async as configurationWithOv;\n    else ghostFilterButton\n  \"\n>\n  <button\n    #filterButton\n    class=\"btn btn-secondary cx-config-filter-button\"\n    tabindex=\"0\"\n    (click)=\"openFilterModal(configurationWithOv)\"\n    title=\"{{\n      (getNumFilters(configurationWithOv.overview) > 0\n        ? 'configurator.a11y.filterOverviewWithCount'\n        : 'configurator.a11y.filterOverview'\n      )\n        | cxTranslate\n          : { numAppliedFilters: getNumFilters(configurationWithOv.overview) }\n    }}\"\n  >\n    {{\n      (getNumFilters(configurationWithOv.overview) > 0\n        ? 'configurator.button.filterOverviewWithCount'\n        : 'configurator.button.filterOverview'\n      )\n        | cxTranslate\n          : { numAppliedFilters: getNumFilters(configurationWithOv.overview) }\n    }}\n  </button>\n  <cx-configurator-overview-filter-bar\n    [config]=\"configurationWithOv\"\n  ></cx-configurator-overview-filter-bar>\n</ng-container>\n\n<ng-template #ghostFilterButton>\n  <div class=\"cx-ghost-filter-button ghost\"></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorOverviewFilterBarComponent, selector: "cx-configurator-overview-filter-bar", inputs: ["config"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-filter-button', template: "<ng-container\n  *ngIf=\"\n    configurationWithOv$ | async as configurationWithOv;\n    else ghostFilterButton\n  \"\n>\n  <button\n    #filterButton\n    class=\"btn btn-secondary cx-config-filter-button\"\n    tabindex=\"0\"\n    (click)=\"openFilterModal(configurationWithOv)\"\n    title=\"{{\n      (getNumFilters(configurationWithOv.overview) > 0\n        ? 'configurator.a11y.filterOverviewWithCount'\n        : 'configurator.a11y.filterOverview'\n      )\n        | cxTranslate\n          : { numAppliedFilters: getNumFilters(configurationWithOv.overview) }\n    }}\"\n  >\n    {{\n      (getNumFilters(configurationWithOv.overview) > 0\n        ? 'configurator.button.filterOverviewWithCount'\n        : 'configurator.button.filterOverview'\n      )\n        | cxTranslate\n          : { numAppliedFilters: getNumFilters(configurationWithOv.overview) }\n    }}\n  </button>\n  <cx-configurator-overview-filter-bar\n    [config]=\"configurationWithOv\"\n  ></cx-configurator-overview-filter-bar>\n</ng-container>\n\n<ng-template #ghostFilterButton>\n  <div class=\"cx-ghost-filter-button ghost\"></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i3.LaunchDialogService }, { type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }]; }, propDecorators: { filterButton: [{
                type: ViewChild,
                args: ['filterButton']
            }], ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFilterButtonModule {
}
ConfiguratorOverviewFilterButtonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFilterButtonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonModule, declarations: [ConfiguratorOverviewFilterButtonComponent], imports: [CommonModule, I18nModule, ConfiguratorOverviewFilterBarModule], exports: [ConfiguratorOverviewFilterButtonComponent] });
ConfiguratorOverviewFilterButtonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewFilterButton: {
                    component: ConfiguratorOverviewFilterButtonComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, ConfiguratorOverviewFilterBarModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ConfiguratorOverviewFilterBarModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewFilterButton: {
                                    component: ConfiguratorOverviewFilterButtonComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewFilterButtonComponent],
                    exports: [ConfiguratorOverviewFilterButtonComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFilterDialogComponent {
    constructor(launchDialogService) {
        this.launchDialogService = launchDialogService;
        this.config$ = this.launchDialogService.data$;
        this.iconTypes = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'button',
            focusOnEscape: true,
        };
    }
    /**
     * closes the filter modal
     */
    closeFilterModal() {
        this.launchDialogService.closeDialog('Close Filtering');
    }
}
ConfiguratorOverviewFilterDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogComponent, deps: [{ token: i3.LaunchDialogService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewFilterDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewFilterDialogComponent, selector: "cx-configurator-overview-filter-dialog", ngImport: i0, template: "<div\n  class=\"cx-configurator-overview-filter-dialog cx-modal-container\"\n  (click)=\"closeFilterModal()\"\n>\n  <div\n    class=\"cx-modal-content\"\n    (click)=\"$event.stopPropagation()\"\n    [cxFocus]=\"focusConfig\"\n    (esc)=\"closeFilterModal()\"\n  >\n    <div class=\"cx-dialog-header modal-header\">\n      <div class=\"cx-dialog-title modal-title\">\n        {{ 'configurator.overviewFilter.title' | cxTranslate }}\n      </div>\n      <button\n        title=\"{{ 'configurator.a11y.closeFilterMenu' | cxTranslate }}\"\n        type=\"button\"\n        class=\"close\"\n        (click)=\"closeFilterModal()\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <ng-container *ngIf=\"config$ | async as config\">\n      <div class=\"cx-dialog-body modal-body\">\n        <cx-configurator-overview-filter\n          [config]=\"config\"\n          [showFilterBar]=\"false\"\n        ></cx-configurator-overview-filter>\n      </div>\n    </ng-container>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: ConfiguratorOverviewFilterComponent, selector: "cx-configurator-overview-filter", inputs: ["showFilterBar", "config"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-filter-dialog', template: "<div\n  class=\"cx-configurator-overview-filter-dialog cx-modal-container\"\n  (click)=\"closeFilterModal()\"\n>\n  <div\n    class=\"cx-modal-content\"\n    (click)=\"$event.stopPropagation()\"\n    [cxFocus]=\"focusConfig\"\n    (esc)=\"closeFilterModal()\"\n  >\n    <div class=\"cx-dialog-header modal-header\">\n      <div class=\"cx-dialog-title modal-title\">\n        {{ 'configurator.overviewFilter.title' | cxTranslate }}\n      </div>\n      <button\n        title=\"{{ 'configurator.a11y.closeFilterMenu' | cxTranslate }}\"\n        type=\"button\"\n        class=\"close\"\n        (click)=\"closeFilterModal()\"\n      >\n        <span aria-hidden=\"true\">\n          <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n        </span>\n      </button>\n    </div>\n    <ng-container *ngIf=\"config$ | async as config\">\n      <div class=\"cx-dialog-body modal-body\">\n        <cx-configurator-overview-filter\n          [config]=\"config\"\n          [showFilterBar]=\"false\"\n        ></cx-configurator-overview-filter>\n      </div>\n    </ng-container>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i3.LaunchDialogService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultConfiguratorOverviewFilterDialogLayoutConfig = {
    launch: {
        CONFIGURATOR_OV_FILTER: {
            inlineRoot: true,
            component: ConfiguratorOverviewFilterDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFilterDialogModule {
}
ConfiguratorOverviewFilterDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFilterDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogModule, declarations: [ConfiguratorOverviewFilterDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        ConfiguratorOverviewFilterModule,
        KeyboardFocusModule], exports: [ConfiguratorOverviewFilterDialogComponent] });
ConfiguratorOverviewFilterDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogModule, providers: [
        provideDefaultConfig(defaultConfiguratorOverviewFilterDialogLayoutConfig),
    ], imports: [CommonModule,
        I18nModule,
        IconModule,
        ConfiguratorOverviewFilterModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFilterDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        ConfiguratorOverviewFilterModule,
                        KeyboardFocusModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultConfiguratorOverviewFilterDialogLayoutConfig),
                    ],
                    declarations: [ConfiguratorOverviewFilterDialogComponent],
                    exports: [ConfiguratorOverviewFilterDialogComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFormComponent {
    constructor(configuratorCommonsService, configRouterExtractorService, configuratorStorefrontUtilsService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.ghostStyle = true;
        this.attributeOverviewType = Configurator.AttributeOverviewType;
        this.configuration$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService.getOrCreateConfiguration(routerData.owner)), distinctUntilKeyChanged('configId'), switchMap((configuration) => this.configuratorCommonsService.getConfigurationWithOverview(configuration)), filter((configuration) => configuration.overview != null), tap(() => {
            this.ghostStyle = false;
        }));
    }
    /**
     * Does the configuration contain any selected attribute values?
     * @param {Configurator.Configuration} configuration - Current configuration
     * @returns {boolean} - Any attributes available
     */
    hasAttributes(configuration) {
        return this.hasGroupWithAttributes(configuration.overview?.groups);
    }
    hasGroupWithAttributes(groups) {
        if (groups) {
            let hasAttributes = groups.find((group) => (group.attributes ? group.attributes.length : 0) > 0) !== undefined;
            if (!hasAttributes) {
                hasAttributes =
                    groups.find((group) => this.hasGroupWithAttributes(group.subGroups)) !== undefined;
            }
            return hasAttributes;
        }
        else {
            return false;
        }
    }
    /**
     * Verifies whether the next or the previous attributes are same.
     *
     * @param {Configurator.AttributeOverview[]} attributes - Attribute array
     * @param {number} index - Index of the attribute in the array
     * @return {boolean} - 'True' if it is the same attribute, otherwise 'false'
     */
    isSameAttribute(attributes, index) {
        if (attributes.length > 1) {
            if (index === 0) {
                return (attributes[index]?.attribute === attributes[index + 1]?.attribute);
            }
            else {
                return (attributes[index]?.attribute === attributes[index - 1]?.attribute);
            }
        }
        return false;
    }
    /**
     * Retrieves the styling for the corresponding element.
     *
     * @param {Configurator.AttributeOverview[]} attributes - Attribute array
     * @param {number} index - Index of the attribute in the array
     * @return {string} - corresponding style class
     */
    getStyleClasses(attributes, index) {
        let styleClass = '';
        switch (attributes[index]?.type) {
            case this.attributeOverviewType.BUNDLE:
                styleClass += 'bundle';
                break;
            case this.attributeOverviewType.GENERAL:
                styleClass += 'general';
                break;
        }
        if (index === 0 || !this.isSameAttribute(attributes, index)) {
            styleClass += ' margin';
        }
        if (!this.isSameAttribute(attributes, index + 1) &&
            !styleClass.includes('bundle')) {
            styleClass += ' last-value-pair';
        }
        return styleClass;
    }
    /**
     * Retrieves the styling for the group levels.
     *
     * @param {number} level - Group level. 1 is top level.
     * @param {Configurator.GroupOverview[]} subGroups - subgroups array
     * @return {string} - corresponding style classes
     */
    getGroupLevelStyleClasses(level, subGroups) {
        let styleClass = 'cx-group';
        if (level === 1) {
            styleClass += ' topLevel';
            if (subGroups && subGroups.length > 0) {
                styleClass += ' subgroupTopLevel';
            }
        }
        else {
            styleClass += ' subgroup';
            styleClass += ' subgroupLevel' + level;
        }
        return styleClass;
    }
    /**
     * Retrieves a unique prefix ID.
     *
     * @param {string | undefined} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - prefix ID
     */
    getPrefixId(idPrefix, groupId) {
        return this.configuratorStorefrontUtilsService.getPrefixId(idPrefix, groupId);
    }
    /**
     * Retrieves the ids for the overview group headers
     *
     * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} groupId - local group id
     * @return {string} - unique group id
     */
    getGroupId(idPrefix, groupId) {
        return this.configuratorStorefrontUtilsService.createOvGroupId(idPrefix, groupId);
    }
}
ConfiguratorOverviewFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewFormComponent, selector: "cx-configurator-overview-form", host: { properties: { "class.ghost": "this.ghostStyle" } }, ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostForm\">\n  <ng-container *ngIf=\"hasAttributes(configuration); else noAttributes\">\n    <ng-container\n      *ngTemplateOutlet=\"\n        groups;\n        context: {\n          overviewGroups: configuration.overview?.groups,\n          level: 1,\n          idPrefix: ''\n        }\n      \"\n    ></ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #noAttributes>\n  <div class=\"cx-no-attribute-value-pairs\">\n    <h2>{{ 'configurator.overviewForm.noAttributeHeader' | cxTranslate }}</h2>\n    <p>{{ 'configurator.overviewForm.noAttributeText' | cxTranslate }}</p>\n  </div>\n</ng-template>\n\n<ng-template\n  #groups\n  let-overviewGroups=\"overviewGroups\"\n  let-level=\"level\"\n  let-idPrefix=\"idPrefix\"\n>\n  <span class=\"cx-visually-hidden\">\n    {{ 'configurator.a11y.listOfAttributesAndValues' | cxTranslate }}\n  </span>\n\n  <ng-container *ngFor=\"let group of overviewGroups\">\n    <div\n      id=\"{{ getGroupId(idPrefix, group.id) }}\"\n      [ngClass]=\"getGroupLevelStyleClasses(level, group.subGroups)\"\n    >\n      <span class=\"cx-visually-hidden\">\n        {{\n          'configurator.a11y.group'\n            | cxTranslate\n              : {\n                  group: group.groupDescription\n                }\n        }}\n      </span>\n      <h2 aria-hidden=\"true\">\n        <span>{{ group.groupDescription }}</span>\n      </h2>\n\n      <div\n        *ngFor=\"let attributeOverview of group.attributes; let i = index\"\n        class=\"cx-attribute-value-pair\"\n        [ngClass]=\"getStyleClasses(group.attributes, i)\"\n      >\n        <ng-container [ngSwitch]=\"attributeOverview?.type\">\n          <ng-container *ngSwitchCase=\"attributeOverviewType.GENERAL\">\n            <cx-configurator-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-overview-attribute>\n          </ng-container>\n\n          <ng-container *ngSwitchCase=\"attributeOverviewType.BUNDLE\">\n            <cx-configurator-cpq-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-cpq-overview-attribute>\n          </ng-container>\n\n          <ng-container *ngSwitchDefault>\n            <cx-configurator-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-overview-attribute>\n          </ng-container>\n        </ng-container>\n      </div>\n      <ng-container *ngIf=\"group.subGroups?.length > 0\">\n        <ng-container\n          *ngTemplateOutlet=\"\n            groups;\n            context: {\n              overviewGroups: group.subGroups,\n              level: level + 1,\n              idPrefix: getPrefixId(idPrefix, group.id)\n            }\n          \"\n        ></ng-container>\n      </ng-container>\n    </div>\n  </ng-container>\n</ng-template>\n\n<ng-template #ghostForm>\n  <ng-container *ngFor=\"let number of [0, 1, 2]\">\n    <div class=\"cx-ghost-group\">\n      <div class=\"cx-ghost-header ghost\"></div>\n      <div class=\"cx-ghost-body\">\n        <ng-container *ngFor=\"let number of [0, 1, 2, 3, 4, 5]\">\n          <div class=\"cx-ghost-attribute-value\">\n            <div class=\"cx-ghost-value ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-attribute-label\">\n            <div class=\"cx-ghost-label ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-attribute-price ghost\"></div>\n        </ng-container>\n      </div>\n    </div>\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4$1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i4$1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i4$1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: ConfiguratorOverviewAttributeComponent, selector: "cx-configurator-overview-attribute", inputs: ["attributeOverview"] }, { kind: "component", type: ConfiguratorOverviewBundleAttributeComponent, selector: "cx-configurator-cpq-overview-attribute", inputs: ["attributeOverview"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-form', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration; else ghostForm\">\n  <ng-container *ngIf=\"hasAttributes(configuration); else noAttributes\">\n    <ng-container\n      *ngTemplateOutlet=\"\n        groups;\n        context: {\n          overviewGroups: configuration.overview?.groups,\n          level: 1,\n          idPrefix: ''\n        }\n      \"\n    ></ng-container>\n  </ng-container>\n</ng-container>\n\n<ng-template #noAttributes>\n  <div class=\"cx-no-attribute-value-pairs\">\n    <h2>{{ 'configurator.overviewForm.noAttributeHeader' | cxTranslate }}</h2>\n    <p>{{ 'configurator.overviewForm.noAttributeText' | cxTranslate }}</p>\n  </div>\n</ng-template>\n\n<ng-template\n  #groups\n  let-overviewGroups=\"overviewGroups\"\n  let-level=\"level\"\n  let-idPrefix=\"idPrefix\"\n>\n  <span class=\"cx-visually-hidden\">\n    {{ 'configurator.a11y.listOfAttributesAndValues' | cxTranslate }}\n  </span>\n\n  <ng-container *ngFor=\"let group of overviewGroups\">\n    <div\n      id=\"{{ getGroupId(idPrefix, group.id) }}\"\n      [ngClass]=\"getGroupLevelStyleClasses(level, group.subGroups)\"\n    >\n      <span class=\"cx-visually-hidden\">\n        {{\n          'configurator.a11y.group'\n            | cxTranslate\n              : {\n                  group: group.groupDescription\n                }\n        }}\n      </span>\n      <h2 aria-hidden=\"true\">\n        <span>{{ group.groupDescription }}</span>\n      </h2>\n\n      <div\n        *ngFor=\"let attributeOverview of group.attributes; let i = index\"\n        class=\"cx-attribute-value-pair\"\n        [ngClass]=\"getStyleClasses(group.attributes, i)\"\n      >\n        <ng-container [ngSwitch]=\"attributeOverview?.type\">\n          <ng-container *ngSwitchCase=\"attributeOverviewType.GENERAL\">\n            <cx-configurator-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-overview-attribute>\n          </ng-container>\n\n          <ng-container *ngSwitchCase=\"attributeOverviewType.BUNDLE\">\n            <cx-configurator-cpq-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-cpq-overview-attribute>\n          </ng-container>\n\n          <ng-container *ngSwitchDefault>\n            <cx-configurator-overview-attribute\n              [attributeOverview]=\"attributeOverview\"\n            >\n            </cx-configurator-overview-attribute>\n          </ng-container>\n        </ng-container>\n      </div>\n      <ng-container *ngIf=\"group.subGroups?.length > 0\">\n        <ng-container\n          *ngTemplateOutlet=\"\n            groups;\n            context: {\n              overviewGroups: group.subGroups,\n              level: level + 1,\n              idPrefix: getPrefixId(idPrefix, group.id)\n            }\n          \"\n        ></ng-container>\n      </ng-container>\n    </div>\n  </ng-container>\n</ng-template>\n\n<ng-template #ghostForm>\n  <ng-container *ngFor=\"let number of [0, 1, 2]\">\n    <div class=\"cx-ghost-group\">\n      <div class=\"cx-ghost-header ghost\"></div>\n      <div class=\"cx-ghost-body\">\n        <ng-container *ngFor=\"let number of [0, 1, 2, 3, 4, 5]\">\n          <div class=\"cx-ghost-attribute-value\">\n            <div class=\"cx-ghost-value ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-attribute-label\">\n            <div class=\"cx-ghost-label ghost\"></div>\n          </div>\n          <div class=\"cx-ghost-attribute-price ghost\"></div>\n        </ng-container>\n      </div>\n    </div>\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorStorefrontUtilsService }]; }, propDecorators: { ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewFormModule {
}
ConfiguratorOverviewFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormModule, declarations: [ConfiguratorOverviewFormComponent], imports: [CommonModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewBundleAttributeModule,
        I18nModule], exports: [ConfiguratorOverviewFormComponent] });
ConfiguratorOverviewFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewForm: {
                    component: ConfiguratorOverviewFormComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewBundleAttributeModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfiguratorOverviewAttributeModule,
                        ConfiguratorOverviewBundleAttributeModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewForm: {
                                    component: ConfiguratorOverviewFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewFormComponent],
                    exports: [ConfiguratorOverviewFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewMenuComponent {
    constructor(configuratorStorefrontUtilsService) {
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.height = this.getHeight();
        this.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT = 'cx-page-slot.VariantConfigOverviewNavigation';
        this.CX_CONFIGURATOR_OVERVIEW_MENU = 'cx-configurator-overview-menu';
        this.CX_MENU_ITEM_BUTTONS = 'button.cx-menu-item';
        this.CX_GROUPS = 'div.cx-group';
        this.CX_MENU_GROUP = 'cx-menu-group';
        this.OV_MENU_ITEM = '-ovMenuItem';
        this.OV_GROUP = '-ovGroup';
        this.ACTIVE_CLASS = 'active';
        /**
         * Height of a CSS box model of a menu item
         * See _configurator-overview-menu.scss
         */
        this.MENU_ITEM_HEIGHT = 39.5;
        this.iconTypes = ICON_TYPE;
        this.styles = [
            ['margin-block-end', '268px'],
            ['position', '-webkit-sticky'],
            ['position', 'sticky'],
            ['top', '0'],
        ];
    }
    ngAfterViewInit() {
        this.amount = this.getAmount(this.config);
        this.menuItemsHeight = this.getMenuItemsHeight();
        this.adjustStyling();
        this.onScroll();
    }
    onScroll() {
        this.menuItem = this.getMenuItemToHighlight();
        this.highlight(this.menuItem);
        this.height = this.getHeight();
        this.ensureElementVisible(this.menuItem);
    }
    onResize() {
        this.height = this.getHeight();
        this.ensureElementVisible(this.menuItem);
    }
    /**
     *  Retrieves amount of groups and all its subgroups in the overview.
     *
     *  If there are no groups in the overview then zero will be returned.
     *  Otherwise the amount of groups and all its subgroups will be returned.
     *
     * @param {Configurator.Configuration} configuration - Configuration
     * @returns {number} - Amount of groups and all its subgroups
     * @protected
     */
    getAmount(configuration) {
        if (configuration.overview?.groups) {
            return this.getAmountOfGroups(0, configuration.overview.groups);
        }
        return 0;
    }
    getAmountOfGroups(amount, groups) {
        if (groups) {
            amount = amount + groups.length;
            groups.forEach((group) => {
                if (group.subGroups) {
                    amount = this.getAmountOfGroups(amount, group.subGroups);
                }
            });
        }
        return amount;
    }
    /**
     * Calculates the total height of existing menu items.
     *
     * @returns {number} - total height of existing menu items
     * @protected
     */
    getMenuItemsHeight() {
        return this.amount * this.MENU_ITEM_HEIGHT;
    }
    /**
     * Adjust the styling of VariantConfigOverviewNavigation slot.
     *
     * If the amount is larger than 1 then the styling will be applied.
     * Otherwise the styling will be removed.
     *
     * @protected
     */
    adjustStyling() {
        if (this.amount >= 1) {
            this.changeStyling();
        }
        else {
            this.removeStyling();
        }
    }
    /**
     * Retrieves the height of the menu in pixels.
     *
     * If the menu items are rendered, it will be checked whether
     * the height of all menu items equals zero or is larger than the actual height of the spare viewport.
     * If it is a case then the actual height of the spare viewport will be returned, otherwise no height will be returned.
     *
     * @returns {string} - Menu height in pixels
     * @protected
     */
    getHeight() {
        const spareViewportHeight = this.configuratorStorefrontUtilsService.getSpareViewportHeight();
        if (this.menuItemsHeight > spareViewportHeight) {
            return spareViewportHeight + 'px';
        }
        return '';
    }
    /**
     * Applies the styling of element according to the passed list of CSS styles.
     *
     * @protected
     */
    changeStyling() {
        this.styles.forEach((style) => {
            this.configuratorStorefrontUtilsService.changeStyling(this.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT, style[0], style[1]);
        });
    }
    /**
     * Removes the styling of element according to the passed list of CSS styles.
     *
     * @protected
     */
    removeStyling() {
        this.styles.forEach((style) => {
            this.configuratorStorefrontUtilsService.removeStyling(this.VARIANT_CONFIG_OVERVIEW_NAVIGATION_SLOT, style[0]);
        });
    }
    getMenuItemToHighlight() {
        let menuItem;
        const groups = this.configuratorStorefrontUtilsService.getElements(this.CX_GROUPS);
        const verticallyScrolledPixels = this.configuratorStorefrontUtilsService.getVerticallyScrolledPixels();
        groups?.forEach((group) => {
            if (verticallyScrolledPixels &&
                verticallyScrolledPixels >= group.offsetTop) {
                const id = group.id.replace(this.OV_GROUP, this.OV_MENU_ITEM);
                if (id) {
                    const querySelector = '#' + id;
                    menuItem =
                        this.configuratorStorefrontUtilsService.getElement(querySelector);
                }
            }
        });
        return menuItem;
    }
    highlight(elementToHighlight) {
        if (elementToHighlight) {
            const menuItems = this.configuratorStorefrontUtilsService.getElements(this.CX_MENU_ITEM_BUTTONS);
            menuItems?.forEach((menuItem) => {
                menuItem.classList.remove(this.ACTIVE_CLASS);
                if (menuItem.id === elementToHighlight.id) {
                    elementToHighlight.classList.add(this.ACTIVE_CLASS);
                }
            });
        }
    }
    ensureElementVisible(element) {
        if (element &&
            this.configuratorStorefrontUtilsService.hasScrollbar(this.CX_CONFIGURATOR_OVERVIEW_MENU)) {
            this.configuratorStorefrontUtilsService.ensureElementVisible(this.CX_CONFIGURATOR_OVERVIEW_MENU, element);
        }
    }
    /**
     * Retrieves the styling for the group levels.
     *
     * @param {number} level - Group level. 1 is top level.
     * @return {string} - corresponding style classes
     */
    getGroupLevelStyleClasses(level) {
        return this.CX_MENU_GROUP + ' groupLevel' + level;
    }
    /**
     * Navigates to group in OV form
     *
     * @param {string} prefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} id - Group id
     */
    navigateToGroup(prefix, id) {
        const ovGroupId = this.configuratorStorefrontUtilsService.createOvGroupId(prefix, id);
        this.configuratorStorefrontUtilsService.scrollToConfigurationElement('#' + ovGroupId + ' h2');
    }
    /**
     * Retrieves a unique prefix ID.
     *
     * @param {string | undefined} prefix - prefix that we need to make the ID unique
     * @param {string} groupId - group ID
     * @returns {string} - prefix ID
     */
    getPrefixId(idPrefix, groupId) {
        return this.configuratorStorefrontUtilsService.getPrefixId(idPrefix, groupId);
    }
    /**
     * Retrieves the ids for the overview group headers
     *
     * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} groupId - local group id
     * @return {string} - unique group id
     */
    getGroupId(idPrefix, groupId) {
        return this.configuratorStorefrontUtilsService.createOvGroupId(idPrefix, groupId);
    }
    /**
     * Retrieves the ids for the overview menu group items
     *
     * @param {string} idPrefix - Prefix (reflects the parent groups in the hierarchy)
     * @param {string} groupId - local group id
     * @return {string} - unique group id
     */
    getMenuItemId(idPrefix, groupId) {
        return this.configuratorStorefrontUtilsService.createOvMenuItemId(idPrefix, groupId);
    }
}
ConfiguratorOverviewMenuComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewMenuComponent, deps: [{ token: ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewMenuComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewMenuComponent, selector: "cx-configurator-overview-menu", inputs: { config: "config" }, host: { listeners: { "window:scroll": "onScroll($event)", "window:resize": "onResize($event)" }, properties: { "style.height": "this.height" } }, ngImport: i0, template: "<ng-container *ngIf=\"config\">\n  <ng-container\n    *ngTemplateOutlet=\"\n      groups;\n      context: {\n        overviewGroups: config.overview.groups,\n        level: 1,\n        idPrefix: ''\n      }\n    \"\n  ></ng-container>\n</ng-container>\n\n<ng-template\n  #groups\n  let-overviewGroups=\"overviewGroups\"\n  let-level=\"level\"\n  let-idPrefix=\"idPrefix\"\n>\n  <ul>\n    <ng-container *ngFor=\"let group of overviewGroups\">\n      <li [ngClass]=\"getGroupLevelStyleClasses(level)\">\n        <button\n          id=\"{{ getMenuItemId(idPrefix, group.id) }}\"\n          class=\"cx-menu-item\"\n          [attr.aria-label]=\"\n            'configurator.a11y.groupName'\n              | cxTranslate: { group: group.groupDescription }\n          \"\n          (click)=\"navigateToGroup(idPrefix, group.id)\"\n        >\n          <span aria-hidden=\"true\"> {{ group.groupDescription }}</span>\n          <cx-icon [type]=\"iconTypes.ARROW_LEFT\" aria-hidden=\"true\"></cx-icon>\n        </button>\n        <ng-container *ngIf=\"group.subGroups?.length > 0\">\n          <ng-container\n            *ngTemplateOutlet=\"\n              groups;\n              context: {\n                overviewGroups: group.subGroups,\n                level: level + 1,\n                idPrefix: getPrefixId(idPrefix, group.id)\n              }\n            \"\n          ></ng-container>\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-menu', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"config\">\n  <ng-container\n    *ngTemplateOutlet=\"\n      groups;\n      context: {\n        overviewGroups: config.overview.groups,\n        level: 1,\n        idPrefix: ''\n      }\n    \"\n  ></ng-container>\n</ng-container>\n\n<ng-template\n  #groups\n  let-overviewGroups=\"overviewGroups\"\n  let-level=\"level\"\n  let-idPrefix=\"idPrefix\"\n>\n  <ul>\n    <ng-container *ngFor=\"let group of overviewGroups\">\n      <li [ngClass]=\"getGroupLevelStyleClasses(level)\">\n        <button\n          id=\"{{ getMenuItemId(idPrefix, group.id) }}\"\n          class=\"cx-menu-item\"\n          [attr.aria-label]=\"\n            'configurator.a11y.groupName'\n              | cxTranslate: { group: group.groupDescription }\n          \"\n          (click)=\"navigateToGroup(idPrefix, group.id)\"\n        >\n          <span aria-hidden=\"true\"> {{ group.groupDescription }}</span>\n          <cx-icon [type]=\"iconTypes.ARROW_LEFT\" aria-hidden=\"true\"></cx-icon>\n        </button>\n        <ng-container *ngIf=\"group.subGroups?.length > 0\">\n          <ng-container\n            *ngTemplateOutlet=\"\n              groups;\n              context: {\n                overviewGroups: group.subGroups,\n                level: level + 1,\n                idPrefix: getPrefixId(idPrefix, group.id)\n              }\n            \"\n          ></ng-container>\n        </ng-container>\n      </li>\n    </ng-container>\n  </ul>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorStorefrontUtilsService }]; }, propDecorators: { height: [{
                type: HostBinding,
                args: ['style.height']
            }], config: [{
                type: Input
            }], onScroll: [{
                type: HostListener,
                args: ['window:scroll', ['$event']]
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewMenuModule {
}
ConfiguratorOverviewMenuModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewMenuModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewMenuModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewMenuModule, declarations: [ConfiguratorOverviewMenuComponent], imports: [CommonModule, I18nModule, IconModule], exports: [ConfiguratorOverviewMenuComponent] });
ConfiguratorOverviewMenuModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewMenuModule, imports: [CommonModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewMenuModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule],
                    declarations: [ConfiguratorOverviewMenuComponent],
                    exports: [ConfiguratorOverviewMenuComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewNotificationBannerComponent {
    constructor(configuratorCommonsService, configRouterExtractorService, commonConfigUtilsService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.configuration$ = this.routerData$.pipe(filter((routerData) => routerData.owner.type === CommonConfigurator.OwnerType.PRODUCT ||
            routerData.owner.type === CommonConfigurator.OwnerType.CART_ENTRY), switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)));
        this.configurationOverview$ = this.configuration$.pipe(map((configuration) => configuration.overview));
        this.numberOfIssues$ = this.configuration$.pipe(map((configuration) => {
            //In case overview carries number of issues: We take it from there.
            //otherwise configuration's number will be accurate
            const configOv = configuration.overview;
            if (configOv?.totalNumberOfIssues) {
                return configOv.numberOfIncompleteCharacteristics !== undefined
                    ? configOv.numberOfIncompleteCharacteristics
                    : configOv.totalNumberOfIssues;
            }
            else {
                return configuration.totalNumberOfIssues
                    ? configuration.totalNumberOfIssues
                    : 0;
            }
        }));
        this.numberOfConflicts$ = this.configuration$.pipe(map((configuration) => {
            return configuration.overview?.numberOfConflicts ?? 0;
        }));
        this.skipConflictsOnIssueNavigation$ = this.configuration$.pipe(map((configuration) => {
            return (configuration.overview?.numberOfConflicts ?? 0) > 0;
        }));
        this.iconTypes = ICON_TYPE;
    }
}
ConfiguratorOverviewNotificationBannerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: i2$1.CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewNotificationBannerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewNotificationBannerComponent, selector: "cx-configurator-overview-notification-banner", ngImport: i0, template: "<ng-container *ngIf=\"routerData$ | async as routerData\">\n  <ng-container *ngIf=\"configurationOverview$ | async\">\n    <div\n      class=\"cx-error-notification-banner\"\n      *ngIf=\"numberOfIssues$ | async as numberOfIssues\"\n    >\n      <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n      <div class=\"cx-error-msg\" id=\"cx-configurator-overview-error-msg\">\n        {{\n          'configurator.notificationBanner.numberOfIssues'\n            | cxTranslate: { count: numberOfIssues }\n        }}\n        <button\n          class=\"link cx-action-link\"\n          aria-describedby=\"cx-configurator-overview-error-msg\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [queryParams]=\"{\n            resolveIssues: true,\n            skipConflicts: skipConflictsOnIssueNavigation$ | async\n          }\"\n          cxAutoFocus\n        >\n          {{ 'configurator.header.resolveIssues' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <div\n      class=\"cx-conflict-notification-banner\"\n      *ngIf=\"numberOfConflicts$ | async as numberOfConflicts\"\n    >\n      <cx-icon [type]=\"iconTypes.WARNING\"></cx-icon>\n      <div class=\"cx-conflict-msg\" id=\"cx-configurator-overview-conflict-msg\">\n        {{\n          'configurator.notificationBanner.numberOfConflicts'\n            | cxTranslate: { count: numberOfConflicts }\n        }}\n        <button\n          class=\"link cx-action-link\"\n          aria-describedby=\"cx-configurator-overview-conflict-msg\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [queryParams]=\"{ resolveIssues: true }\"\n          cxAutoFocus\n        >\n          {{ 'configurator.header.resolveConflicts' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-notification-banner', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"routerData$ | async as routerData\">\n  <ng-container *ngIf=\"configurationOverview$ | async\">\n    <div\n      class=\"cx-error-notification-banner\"\n      *ngIf=\"numberOfIssues$ | async as numberOfIssues\"\n    >\n      <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n      <div class=\"cx-error-msg\" id=\"cx-configurator-overview-error-msg\">\n        {{\n          'configurator.notificationBanner.numberOfIssues'\n            | cxTranslate: { count: numberOfIssues }\n        }}\n        <button\n          class=\"link cx-action-link\"\n          aria-describedby=\"cx-configurator-overview-error-msg\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [queryParams]=\"{\n            resolveIssues: true,\n            skipConflicts: skipConflictsOnIssueNavigation$ | async\n          }\"\n          cxAutoFocus\n        >\n          {{ 'configurator.header.resolveIssues' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n    <div\n      class=\"cx-conflict-notification-banner\"\n      *ngIf=\"numberOfConflicts$ | async as numberOfConflicts\"\n    >\n      <cx-icon [type]=\"iconTypes.WARNING\"></cx-icon>\n      <div class=\"cx-conflict-msg\" id=\"cx-configurator-overview-conflict-msg\">\n        {{\n          'configurator.notificationBanner.numberOfConflicts'\n            | cxTranslate: { count: numberOfConflicts }\n        }}\n        <button\n          class=\"link cx-action-link\"\n          aria-describedby=\"cx-configurator-overview-conflict-msg\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [queryParams]=\"{ resolveIssues: true }\"\n          cxAutoFocus\n        >\n          {{ 'configurator.header.resolveConflicts' | cxTranslate }}\n        </button>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: i2$1.CommonConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewNotificationBannerModule {
}
ConfiguratorOverviewNotificationBannerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewNotificationBannerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, declarations: [ConfiguratorOverviewNotificationBannerComponent], imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule], exports: [ConfiguratorOverviewNotificationBannerComponent] });
ConfiguratorOverviewNotificationBannerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewBanner: {
                    component: ConfiguratorOverviewNotificationBannerComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewNotificationBannerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewBanner: {
                                    component: ConfiguratorOverviewNotificationBannerComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewNotificationBannerComponent],
                    exports: [ConfiguratorOverviewNotificationBannerComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewSidebarComponent {
    constructor(configuratorCommonsService, configRouterExtractorService, configuratorStorefrontUtilsService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuratorStorefrontUtilsService = configuratorStorefrontUtilsService;
        this.ghostStyle = true;
        this.showFilter = false;
        //TODO(CXSPA-3392) remove this member in next major, it is not used
        /**
         * @deprecated since 6.1. Use configurationWithOv$ instead
         */
        this.config$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)), 
        // filter 'strict null check safe'
        filter((configuration) => configuration.overview != null), tap((data) => {
            if (data) {
                this.ghostStyle = false;
            }
        }));
        this.configurationWithOv$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)), 
        // filter 'strict null check safe'
        filter((configuration) => configuration.overview != null), tap((data) => {
            if (data) {
                this.ghostStyle = false;
            }
        }));
    }
    /**
     * Triggers display of the filter view in the overview sidebar
     */
    onFilter() {
        this.showFilter = true;
    }
    /**
     * Triggers display of the menu view in the overview sidebar
     */
    onMenu() {
        this.showFilter = false;
    }
}
ConfiguratorOverviewSidebarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorOverviewSidebarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorOverviewSidebarComponent, selector: "cx-configurator-overview-sidebar", host: { properties: { "class.ghost": "this.ghostStyle" } }, ngImport: i0, template: "<ng-container\n  *ngIf=\"configurationWithOv$ | async as configurationWithOv; else ghostSidebar\"\n>\n  <div class=\"cx-menu-bar\" role=\"tablist\">\n    <button\n      role=\"tab\"\n      [attr.aria-selected]=\"!showFilter\"\n      [class.active]=\"!showFilter\"\n      (click)=\"onMenu()\"\n    >\n      {{ 'configurator.overviewSidebar.menu' | cxTranslate }}\n    </button>\n    <button\n      role=\"tab\"\n      [attr.aria-selected]=\"showFilter\"\n      [class.active]=\"showFilter\"\n      (click)=\"onFilter()\"\n    >\n      {{ 'configurator.overviewSidebar.filter' | cxTranslate }}\n    </button>\n  </div>\n\n  <cx-configurator-overview-filter\n    *ngIf=\"showFilter\"\n    [config]=\"configurationWithOv\"\n  >\n  </cx-configurator-overview-filter>\n\n  <cx-configurator-overview-menu\n    *ngIf=\"!showFilter\"\n    [config]=\"configurationWithOv\"\n  >\n  </cx-configurator-overview-menu>\n</ng-container>\n\n<ng-template #ghostSidebar>\n  <div class=\"cx-ghost-menu\">\n    <div class=\"cx-ghost-menu-bar ghost\"></div>\n    <ng-container *ngFor=\"let number of [0, 1]\">\n      <ng-container *ngFor=\"let number of [0, 1, 2]; let i = index\">\n        <div class=\"cx-ghost-menu-level1\">\n          <div class=\"cx-ghost-menu-item\">\n            <div class=\"cx-ghost-menu-item-title ghost\"></div>\n          </div>\n\n          <ng-container *ngIf=\"i === 0\">\n            <div class=\"cx-ghost-menu-level2\">\n              <div\n                *ngFor=\"let number of [0, 1, 2, 3]\"\n                class=\"cx-ghost-menu-item\"\n              >\n                <div class=\"cx-ghost-menu-item-title ghost\"></div>\n              </div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngIf=\"i === 1\">\n            <div class=\"cx-ghost-menu-level2\">\n              <div *ngFor=\"let number of [0, 1, 2]\" class=\"cx-ghost-menu-item\">\n                <div class=\"cx-ghost-menu-item-title ghost\"></div>\n              </div>\n              <div class=\"cx-ghost-menu-level3\">\n                <div\n                  *ngFor=\"let number of [0, 1, 2]\"\n                  class=\"cx-ghost-menu-item\"\n                >\n                  <div class=\"cx-ghost-menu-item-title ghost\"></div>\n                </div>\n              </div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngIf=\"i === 2\">\n            <div class=\"cx-ghost-menu-level1\">\n              <div *ngFor=\"let number of [0, 1]\" class=\"cx-ghost-menu-item\">\n                <div class=\"cx-ghost-menu-item-title ghost\"></div>\n              </div>\n            </div>\n          </ng-container>\n        </div>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorOverviewFilterComponent, selector: "cx-configurator-overview-filter", inputs: ["showFilterBar", "config"] }, { kind: "component", type: ConfiguratorOverviewMenuComponent, selector: "cx-configurator-overview-menu", inputs: ["config"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-overview-sidebar', template: "<ng-container\n  *ngIf=\"configurationWithOv$ | async as configurationWithOv; else ghostSidebar\"\n>\n  <div class=\"cx-menu-bar\" role=\"tablist\">\n    <button\n      role=\"tab\"\n      [attr.aria-selected]=\"!showFilter\"\n      [class.active]=\"!showFilter\"\n      (click)=\"onMenu()\"\n    >\n      {{ 'configurator.overviewSidebar.menu' | cxTranslate }}\n    </button>\n    <button\n      role=\"tab\"\n      [attr.aria-selected]=\"showFilter\"\n      [class.active]=\"showFilter\"\n      (click)=\"onFilter()\"\n    >\n      {{ 'configurator.overviewSidebar.filter' | cxTranslate }}\n    </button>\n  </div>\n\n  <cx-configurator-overview-filter\n    *ngIf=\"showFilter\"\n    [config]=\"configurationWithOv\"\n  >\n  </cx-configurator-overview-filter>\n\n  <cx-configurator-overview-menu\n    *ngIf=\"!showFilter\"\n    [config]=\"configurationWithOv\"\n  >\n  </cx-configurator-overview-menu>\n</ng-container>\n\n<ng-template #ghostSidebar>\n  <div class=\"cx-ghost-menu\">\n    <div class=\"cx-ghost-menu-bar ghost\"></div>\n    <ng-container *ngFor=\"let number of [0, 1]\">\n      <ng-container *ngFor=\"let number of [0, 1, 2]; let i = index\">\n        <div class=\"cx-ghost-menu-level1\">\n          <div class=\"cx-ghost-menu-item\">\n            <div class=\"cx-ghost-menu-item-title ghost\"></div>\n          </div>\n\n          <ng-container *ngIf=\"i === 0\">\n            <div class=\"cx-ghost-menu-level2\">\n              <div\n                *ngFor=\"let number of [0, 1, 2, 3]\"\n                class=\"cx-ghost-menu-item\"\n              >\n                <div class=\"cx-ghost-menu-item-title ghost\"></div>\n              </div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngIf=\"i === 1\">\n            <div class=\"cx-ghost-menu-level2\">\n              <div *ngFor=\"let number of [0, 1, 2]\" class=\"cx-ghost-menu-item\">\n                <div class=\"cx-ghost-menu-item-title ghost\"></div>\n              </div>\n              <div class=\"cx-ghost-menu-level3\">\n                <div\n                  *ngFor=\"let number of [0, 1, 2]\"\n                  class=\"cx-ghost-menu-item\"\n                >\n                  <div class=\"cx-ghost-menu-item-title ghost\"></div>\n                </div>\n              </div>\n            </div>\n          </ng-container>\n\n          <ng-container *ngIf=\"i === 2\">\n            <div class=\"cx-ghost-menu-level1\">\n              <div *ngFor=\"let number of [0, 1]\" class=\"cx-ghost-menu-item\">\n                <div class=\"cx-ghost-menu-item-title ghost\"></div>\n              </div>\n            </div>\n          </ng-container>\n        </div>\n      </ng-container>\n    </ng-container>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorStorefrontUtilsService }]; }, propDecorators: { ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorOverviewSidebarModule {
}
ConfiguratorOverviewSidebarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorOverviewSidebarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarModule, declarations: [ConfiguratorOverviewSidebarComponent], imports: [CommonModule,
        I18nModule,
        ConfiguratorOverviewFilterModule,
        ConfiguratorOverviewMenuModule], exports: [ConfiguratorOverviewSidebarComponent] });
ConfiguratorOverviewSidebarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorOverviewSidebar: {
                    component: ConfiguratorOverviewSidebarComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        ConfiguratorOverviewFilterModule,
        ConfiguratorOverviewMenuModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorOverviewSidebarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        ConfiguratorOverviewFilterModule,
                        ConfiguratorOverviewMenuModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorOverviewSidebar: {
                                    component: ConfiguratorOverviewSidebarComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorOverviewSidebarComponent],
                    exports: [ConfiguratorOverviewSidebarComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPreviousNextButtonsComponent {
    constructor(configuratorGroupsService, configuratorCommonsService, configRouterExtractorService, configUtils) {
        this.configuratorGroupsService = configuratorGroupsService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configUtils = configUtils;
        this.configuration$ = this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)));
    }
    onPrevious(configuration) {
        this.configuratorGroupsService
            .getPreviousGroupId(configuration.owner)
            .pipe(take(1))
            .subscribe((groupId) => {
            if (groupId) {
                this.configuratorGroupsService.navigateToGroup(configuration, groupId);
                this.focusFirstAttribute();
            }
        });
        this.configUtils.scrollToConfigurationElement('.VariantConfigurationTemplate, .CpqConfigurationTemplate');
    }
    onNext(configuration) {
        this.configuratorGroupsService
            .getNextGroupId(configuration.owner)
            .pipe(take(1))
            .subscribe((groupId) => {
            if (groupId) {
                this.configuratorGroupsService.navigateToGroup(configuration, groupId);
                this.focusFirstAttribute();
            }
        });
        this.configUtils.scrollToConfigurationElement('.VariantConfigurationTemplate, .CpqConfigurationTemplate');
    }
    isFirstGroup(owner) {
        return this.configuratorGroupsService
            .getPreviousGroupId(owner)
            .pipe(map((group) => !group));
    }
    isLastGroup(owner) {
        return this.configuratorGroupsService
            .getNextGroupId(owner)
            .pipe(map((group) => !group));
    }
    focusFirstAttribute() {
        this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService
            .isConfigurationLoading(routerData.owner)
            .pipe(filter((isLoading) => isLoading), take(1), switchMap(() => this.configuratorCommonsService
            .isConfigurationLoading(routerData.owner)
            .pipe(filter((isLoading) => !isLoading), take(1), delay(0) //we need to consider the re-rendering of the page
        )))))
            .subscribe(() => this.configUtils.focusFirstAttribute());
    }
}
ConfiguratorPreviousNextButtonsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsComponent, deps: [{ token: ConfiguratorGroupsService }, { token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorStorefrontUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorPreviousNextButtonsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorPreviousNextButtonsComponent, selector: "cx-configurator-previous-next-buttons", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"configuration.groups.length > 1\">\n    <button\n      class=\"btn btn-block btn-secondary cx-previous\"\n      [disabled]=\"isFirstGroup(configuration.owner) | async\"\n      (click)=\"onPrevious(configuration)\"\n      [attr.aria-label]=\"'configurator.a11y.previous' | cxTranslate\"\n    >\n      {{ 'configurator.button.previous' | cxTranslate }}\n    </button>\n    <button\n      class=\"btn btn-block btn-secondary cx-next\"\n      [disabled]=\"isLastGroup(configuration.owner) | async\"\n      (click)=\"onNext(configuration)\"\n      [attr.aria-label]=\"'configurator.a11y.next' | cxTranslate\"\n    >\n      {{ 'configurator.button.next' | cxTranslate }}\n    </button>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-previous-next-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"configuration.groups.length > 1\">\n    <button\n      class=\"btn btn-block btn-secondary cx-previous\"\n      [disabled]=\"isFirstGroup(configuration.owner) | async\"\n      (click)=\"onPrevious(configuration)\"\n      [attr.aria-label]=\"'configurator.a11y.previous' | cxTranslate\"\n    >\n      {{ 'configurator.button.previous' | cxTranslate }}\n    </button>\n    <button\n      class=\"btn btn-block btn-secondary cx-next\"\n      [disabled]=\"isLastGroup(configuration.owner) | async\"\n      (click)=\"onNext(configuration)\"\n      [attr.aria-label]=\"'configurator.a11y.next' | cxTranslate\"\n    >\n      {{ 'configurator.button.next' | cxTranslate }}\n    </button>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorGroupsService }, { type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorStorefrontUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPreviousNextButtonsModule {
}
ConfiguratorPreviousNextButtonsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorPreviousNextButtonsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, declarations: [ConfiguratorPreviousNextButtonsComponent], imports: [CommonModule, I18nModule, KeyboardFocusModule], exports: [ConfiguratorPreviousNextButtonsComponent] });
ConfiguratorPreviousNextButtonsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorPrevNext: {
                    component: ConfiguratorPreviousNextButtonsComponent,
                },
            },
        }),
    ], imports: [CommonModule, I18nModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPreviousNextButtonsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, KeyboardFocusModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorPrevNext: {
                                    component: ConfiguratorPreviousNextButtonsComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorPreviousNextButtonsComponent],
                    exports: [ConfiguratorPreviousNextButtonsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPriceSummaryComponent {
    constructor(configuratorCommonsService, configRouterExtractorService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuration$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => {
            return this.configuratorCommonsService.getConfiguration(routerData.owner);
        }));
    }
}
ConfiguratorPriceSummaryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceSummaryComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorPriceSummaryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorPriceSummaryComponent, selector: "cx-configurator-price-summary", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"configuration.pricingEnabled\">\n    <div class=\"cx-price-summary-container\">\n      <div class=\"cx-total-summary\">\n        <ng-container *ngIf=\"!configuration.hideBasePriceAndSelectedOptions\">\n          <div class=\"cx-summary-row cx-base-price\">\n            <div class=\"cx-label\">\n              {{ 'configurator.priceSummary.basePrice' | cxTranslate }}:\n            </div>\n            <div class=\"cx-amount\">\n              {{ configuration?.priceSummary?.basePrice?.formattedValue }}\n            </div>\n          </div>\n          <div class=\"cx-summary-row cx-selected-options\">\n            <div class=\"cx-label\">\n              {{ 'configurator.priceSummary.selectedOptions' | cxTranslate }}:\n            </div>\n            <div class=\"cx-amount\">\n              {{ configuration?.priceSummary?.selectedOptions?.formattedValue }}\n            </div>\n          </div>\n        </ng-container>\n        <div class=\"cx-summary-row cx-total-price\">\n          <div class=\"cx-label\">\n            <ng-container *cxFeatureLevel=\"'!6.1'\">\n              {{ 'configurator.priceSummary.totalPrice' | cxTranslate }}:\n            </ng-container>\n            <ng-container *cxFeatureLevel=\"'6.1'\">\n              {{ 'configurator.priceSummary.totalPricePerItem' | cxTranslate }}:\n            </ng-container>\n          </div>\n          <div class=\"cx-amount\">\n            {{ configuration?.priceSummary?.currentTotal?.formattedValue }}\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceSummaryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-price-summary', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"configuration.pricingEnabled\">\n    <div class=\"cx-price-summary-container\">\n      <div class=\"cx-total-summary\">\n        <ng-container *ngIf=\"!configuration.hideBasePriceAndSelectedOptions\">\n          <div class=\"cx-summary-row cx-base-price\">\n            <div class=\"cx-label\">\n              {{ 'configurator.priceSummary.basePrice' | cxTranslate }}:\n            </div>\n            <div class=\"cx-amount\">\n              {{ configuration?.priceSummary?.basePrice?.formattedValue }}\n            </div>\n          </div>\n          <div class=\"cx-summary-row cx-selected-options\">\n            <div class=\"cx-label\">\n              {{ 'configurator.priceSummary.selectedOptions' | cxTranslate }}:\n            </div>\n            <div class=\"cx-amount\">\n              {{ configuration?.priceSummary?.selectedOptions?.formattedValue }}\n            </div>\n          </div>\n        </ng-container>\n        <div class=\"cx-summary-row cx-total-price\">\n          <div class=\"cx-label\">\n            <ng-container *cxFeatureLevel=\"'!6.1'\">\n              {{ 'configurator.priceSummary.totalPrice' | cxTranslate }}:\n            </ng-container>\n            <ng-container *cxFeatureLevel=\"'6.1'\">\n              {{ 'configurator.priceSummary.totalPricePerItem' | cxTranslate }}:\n            </ng-container>\n          </div>\n          <div class=\"cx-amount\">\n            {{ configuration?.priceSummary?.currentTotal?.formattedValue }}\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorPriceSummaryModule {
}
ConfiguratorPriceSummaryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceSummaryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorPriceSummaryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceSummaryModule, declarations: [ConfiguratorPriceSummaryComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule], exports: [ConfiguratorPriceSummaryComponent] });
ConfiguratorPriceSummaryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceSummaryModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorPriceSummary: {
                    component: ConfiguratorPriceSummaryComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorPriceSummaryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        FeaturesConfigModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorPriceSummary: {
                                    component: ConfiguratorPriceSummaryComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorPriceSummaryComponent],
                    exports: [ConfiguratorPriceSummaryComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorProductTitleComponent {
    constructor(configuratorCommonsService, configRouterExtractorService, productService, configExpertModeService) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.productService = productService;
        this.configExpertModeService = configExpertModeService;
        this.ghostStyle = true;
        this.configuration$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => {
            return this.configuratorCommonsService.getConfiguration(routerData.owner);
        }));
        this.product$ = this.configuration$
            .pipe(map((configuration) => {
            switch (configuration.owner.type) {
                case CommonConfigurator.OwnerType.PRODUCT:
                case CommonConfigurator.OwnerType.CART_ENTRY:
                    return configuration.productCode;
                case CommonConfigurator.OwnerType.ORDER_ENTRY:
                    return configuration.overview?.productCode;
            }
        }), switchMap((productCode) => productCode
            ? this.productService.get(productCode, "list" /* ProductScope.LIST */)
            : EMPTY))
            .pipe(tap(() => {
            this.ghostStyle = false;
        }));
        this.showMore = false;
        this.iconTypes = ICON_TYPE;
    }
    triggerDetails() {
        this.showMore = !this.showMore;
    }
    get expMode() {
        return this.configExpertModeService.getExpModeActive();
    }
}
ConfiguratorProductTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorProductTitleComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: i1$1.ProductService }, { token: ConfiguratorExpertModeService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorProductTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorProductTitleComponent, selector: "cx-configurator-product-title", host: { properties: { "class.ghost": "this.ghostStyle" } }, ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product; else ghostProductTitle\">\n  <div class=\"cx-general-product-info\">\n    <div class=\"cx-title\">\n      <span> {{ product.name }} </span>\n    </div>\n    <button (click)=\"triggerDetails()\" [attr.aria-expanded]=\"showMore\">\n      <ng-container *ngIf=\"!showMore\">\n        <div\n          class=\"cx-toggle-details-link-text\"\n          [attr.aria-label]=\"\n            'configurator.a11y.showMoreProductInfo'\n              | cxTranslate: { product: product.name }\n          \"\n        >\n          <span aria-hidden=\"true\">{{\n            'configurator.header.showMore' | cxTranslate\n          }}</span>\n        </div>\n        <cx-icon [type]=\"iconTypes.CARET_DOWN\"></cx-icon>\n      </ng-container>\n\n      <ng-container *ngIf=\"showMore\">\n        <div\n          class=\"cx-toggle-details-link-text\"\n          [attr.aria-label]=\"\n            'configurator.a11y.showLessProductInfo'\n              | cxTranslate: { product: product.name }\n          \"\n        >\n          {{ 'configurator.header.showLess' | cxTranslate }}\n        </div>\n        <cx-icon [type]=\"iconTypes.CARET_UP\"></cx-icon>\n      </ng-container>\n    </button>\n    <div class=\"cx-details\" [class.open]=\"showMore\">\n      <div class=\"cx-details-image\" aria-hidden=\"true\">\n        <cx-media\n          [container]=\"product?.images?.PRIMARY\"\n          format=\"product\"\n        ></cx-media>\n      </div>\n      <div\n        class=\"cx-details-content\"\n        [attr.aria-hidden]=\"showMore ? false : true\"\n      >\n        <div class=\"cx-detail-title\">\n          <span\n            *ngIf=\"product.name\"\n            [attr.aria-label]=\"'configurator.a11y.productName' | cxTranslate\"\n          >\n            {{ product.name }}\n          </span>\n        </div>\n        <div class=\"cx-code\">\n          <span\n            *ngIf=\"product.code\"\n            [attr.aria-label]=\"'configurator.a11y.productCode' | cxTranslate\"\n          >\n            {{ product.code }}\n          </span>\n        </div>\n        <div class=\"cx-description\">\n          <span\n            *ngIf=\"product.description\"\n            [attr.aria-label]=\"\n              'configurator.a11y.productDescription' | cxTranslate\n            \"\n          >\n            {{ product.description }}\n          </span>\n        </div>\n\n        <ng-container *ngIf=\"expMode | async\">\n          <ng-container *ngIf=\"configuration$ | async as configuration\">\n            <ng-container *ngIf=\"configuration.kbKey\">\n              <div class=\"cx-kb-key-details\">\n                <ng-container *ngIf=\"configuration.kbKey.kbName\">\n                  <div class=\"cx-kb-pair\">\n                    <span\n                      class=\"cx-label\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.kbKeyName'\n                          | cxTranslate: { name: configuration.kbKey.kbName }\n                      \"\n                    >\n                      {{ 'configurator.header.kbKeyName' | cxTranslate }}\n                    </span>\n                    <span class=\"cx-value\">\n                      {{ configuration.kbKey.kbName }}\n                    </span>\n                  </div>\n                </ng-container>\n                <ng-container *ngIf=\"configuration.kbKey.kbLogsys\">\n                  <div class=\"cx-kb-pair\">\n                    <span\n                      class=\"cx-label\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.kbKeyLogsys'\n                          | cxTranslate\n                            : { logsys: configuration.kbKey.kbLogsys }\n                      \"\n                    >\n                      {{ 'configurator.header.kbKeyLogsys' | cxTranslate }}\n                    </span>\n                    <span class=\"cx-value\">\n                      {{ configuration.kbKey.kbLogsys }}\n                    </span>\n                  </div>\n                </ng-container>\n                <ng-container *ngIf=\"configuration.kbKey.kbVersion\">\n                  <div class=\"cx-kb-pair\">\n                    <span\n                      class=\"cx-label\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.kbKeyVersion'\n                          | cxTranslate\n                            : { version: configuration.kbKey.kbVersion }\n                      \"\n                    >\n                      {{ 'configurator.header.kbKeyVersion' | cxTranslate }}\n                    </span>\n                    <span class=\"cx-value\">\n                      {{ configuration.kbKey.kbVersion }}\n                    </span>\n                  </div>\n                </ng-container>\n                <ng-container *ngIf=\"configuration.kbKey.kbBuildNumber\">\n                  <div class=\"cx-kb-pair\">\n                    <span\n                      class=\"cx-label\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.kbKeyBuildNr'\n                          | cxTranslate\n                            : { number: configuration.kbKey.kbBuildNumber }\n                      \"\n                    >\n                      {{ 'configurator.header.kbKeyBuildNr' | cxTranslate }}\n                    </span>\n                    <span class=\"cx-value\">\n                      {{ configuration.kbKey.kbBuildNumber }}\n                    </span>\n                  </div>\n                </ng-container>\n              </div>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n  </div>\n</ng-container>\n<ng-template #ghostProductTitle>\n  <div class=\"cx-ghost-general-product-info\"></div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i3.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorProductTitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-product-title', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product; else ghostProductTitle\">\n  <div class=\"cx-general-product-info\">\n    <div class=\"cx-title\">\n      <span> {{ product.name }} </span>\n    </div>\n    <button (click)=\"triggerDetails()\" [attr.aria-expanded]=\"showMore\">\n      <ng-container *ngIf=\"!showMore\">\n        <div\n          class=\"cx-toggle-details-link-text\"\n          [attr.aria-label]=\"\n            'configurator.a11y.showMoreProductInfo'\n              | cxTranslate: { product: product.name }\n          \"\n        >\n          <span aria-hidden=\"true\">{{\n            'configurator.header.showMore' | cxTranslate\n          }}</span>\n        </div>\n        <cx-icon [type]=\"iconTypes.CARET_DOWN\"></cx-icon>\n      </ng-container>\n\n      <ng-container *ngIf=\"showMore\">\n        <div\n          class=\"cx-toggle-details-link-text\"\n          [attr.aria-label]=\"\n            'configurator.a11y.showLessProductInfo'\n              | cxTranslate: { product: product.name }\n          \"\n        >\n          {{ 'configurator.header.showLess' | cxTranslate }}\n        </div>\n        <cx-icon [type]=\"iconTypes.CARET_UP\"></cx-icon>\n      </ng-container>\n    </button>\n    <div class=\"cx-details\" [class.open]=\"showMore\">\n      <div class=\"cx-details-image\" aria-hidden=\"true\">\n        <cx-media\n          [container]=\"product?.images?.PRIMARY\"\n          format=\"product\"\n        ></cx-media>\n      </div>\n      <div\n        class=\"cx-details-content\"\n        [attr.aria-hidden]=\"showMore ? false : true\"\n      >\n        <div class=\"cx-detail-title\">\n          <span\n            *ngIf=\"product.name\"\n            [attr.aria-label]=\"'configurator.a11y.productName' | cxTranslate\"\n          >\n            {{ product.name }}\n          </span>\n        </div>\n        <div class=\"cx-code\">\n          <span\n            *ngIf=\"product.code\"\n            [attr.aria-label]=\"'configurator.a11y.productCode' | cxTranslate\"\n          >\n            {{ product.code }}\n          </span>\n        </div>\n        <div class=\"cx-description\">\n          <span\n            *ngIf=\"product.description\"\n            [attr.aria-label]=\"\n              'configurator.a11y.productDescription' | cxTranslate\n            \"\n          >\n            {{ product.description }}\n          </span>\n        </div>\n\n        <ng-container *ngIf=\"expMode | async\">\n          <ng-container *ngIf=\"configuration$ | async as configuration\">\n            <ng-container *ngIf=\"configuration.kbKey\">\n              <div class=\"cx-kb-key-details\">\n                <ng-container *ngIf=\"configuration.kbKey.kbName\">\n                  <div class=\"cx-kb-pair\">\n                    <span\n                      class=\"cx-label\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.kbKeyName'\n                          | cxTranslate: { name: configuration.kbKey.kbName }\n                      \"\n                    >\n                      {{ 'configurator.header.kbKeyName' | cxTranslate }}\n                    </span>\n                    <span class=\"cx-value\">\n                      {{ configuration.kbKey.kbName }}\n                    </span>\n                  </div>\n                </ng-container>\n                <ng-container *ngIf=\"configuration.kbKey.kbLogsys\">\n                  <div class=\"cx-kb-pair\">\n                    <span\n                      class=\"cx-label\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.kbKeyLogsys'\n                          | cxTranslate\n                            : { logsys: configuration.kbKey.kbLogsys }\n                      \"\n                    >\n                      {{ 'configurator.header.kbKeyLogsys' | cxTranslate }}\n                    </span>\n                    <span class=\"cx-value\">\n                      {{ configuration.kbKey.kbLogsys }}\n                    </span>\n                  </div>\n                </ng-container>\n                <ng-container *ngIf=\"configuration.kbKey.kbVersion\">\n                  <div class=\"cx-kb-pair\">\n                    <span\n                      class=\"cx-label\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.kbKeyVersion'\n                          | cxTranslate\n                            : { version: configuration.kbKey.kbVersion }\n                      \"\n                    >\n                      {{ 'configurator.header.kbKeyVersion' | cxTranslate }}\n                    </span>\n                    <span class=\"cx-value\">\n                      {{ configuration.kbKey.kbVersion }}\n                    </span>\n                  </div>\n                </ng-container>\n                <ng-container *ngIf=\"configuration.kbKey.kbBuildNumber\">\n                  <div class=\"cx-kb-pair\">\n                    <span\n                      class=\"cx-label\"\n                      [attr.aria-label]=\"\n                        'configurator.a11y.kbKeyBuildNr'\n                          | cxTranslate\n                            : { number: configuration.kbKey.kbBuildNumber }\n                      \"\n                    >\n                      {{ 'configurator.header.kbKeyBuildNr' | cxTranslate }}\n                    </span>\n                    <span class=\"cx-value\">\n                      {{ configuration.kbKey.kbBuildNumber }}\n                    </span>\n                  </div>\n                </ng-container>\n              </div>\n            </ng-container>\n          </ng-container>\n        </ng-container>\n      </div>\n    </div>\n  </div>\n</ng-container>\n<ng-template #ghostProductTitle>\n  <div class=\"cx-ghost-general-product-info\"></div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: i1$1.ProductService }, { type: ConfiguratorExpertModeService }]; }, propDecorators: { ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorProductTitleModule {
}
ConfiguratorProductTitleModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorProductTitleModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorProductTitleModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorProductTitleModule, declarations: [ConfiguratorProductTitleComponent], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        IconModule,
        MediaModule], exports: [ConfiguratorProductTitleComponent] });
ConfiguratorProductTitleModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorProductTitleModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorProductTitle: {
                    component: ConfiguratorProductTitleComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        IconModule,
        MediaModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorProductTitleModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        MediaModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorProductTitle: {
                                    component: ConfiguratorProductTitleComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorProductTitleComponent],
                    exports: [ConfiguratorProductTitleComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorRestartDialogComponent {
    constructor(launchDialogService, configuratorCommonsService, routingService, productService) {
        this.launchDialogService = launchDialogService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.routingService = routingService;
        this.productService = productService;
        this.dialogData$ = this.launchDialogService.data$.pipe(
        // In case conflict solver opens as well we need to filter out is data
        filter((dialogData) => dialogData && dialogData.owner));
        this.product$ = this.dialogData$.pipe(switchMap((dialogData) => this.productService.get(dialogData.owner.id)));
        this.iconTypes = ICON_TYPE;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: '.btn-primary',
            focusOnEscape: true,
        };
    }
    /**
     * Closes the dialog
     */
    close() {
        this.launchDialogService.closeDialog('Close restart configuration dialog');
    }
    /**
     * Resume with current configuration
     * @param product owning this configuration
     */
    resume(product) {
        this.close();
        // In case conflict solver was open as well, it was closed by the call above.
        // By navigating again we ensure it will open again.
        this.routingService.go({
            cxRoute: 'configure' + product.configuratorType,
            params: {
                ownerType: CommonConfigurator.OwnerType.PRODUCT,
                entityKey: product.code,
            },
        });
    }
    /**
     * Discards current configuration and requests a new default configuration
     * @param owner owner of the current configuration that will be reused for next configuration
     */
    restart(owner) {
        this.configuratorCommonsService.forceNewConfiguration(owner);
        this.close();
    }
    /**
     * Navigates back to product detail page without making a decision
     * @param product owning this configuration
     */
    backToPDP(product) {
        this.close();
        this.routingService.go({
            cxRoute: 'product',
            params: product,
        });
    }
}
ConfiguratorRestartDialogComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogComponent, deps: [{ token: i3.LaunchDialogService }, { token: ConfiguratorCommonsService }, { token: i1$1.RoutingService }, { token: i1$1.ProductService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorRestartDialogComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorRestartDialogComponent, selector: "cx-configurator-restart-dialog", ngImport: i0, template: "<div class=\"cx-modal-container\">\n  <ng-container *ngIf=\"dialogData$ | async as dialogData\">\n    <ng-container *ngIf=\"product$ | async as product\">\n      <div\n        class=\"cx-modal-content\"\n        [cxFocus]=\"focusConfig\"\n        (esc)=\"backToPDP(product)\"\n      >\n        <div class=\"cx-dialog-header modal-header\">\n          <div class=\"cx-dialog-title modal-title\">\n            {{ 'configurator.restartDialog.title' | cxTranslate }}\n          </div>\n          <button\n            title=\"{{ 'configurator.a11y.closeRestartDialog' | cxTranslate }}\"\n            type=\"button\"\n            class=\"close\"\n            (click)=\"backToPDP(product)\"\n          >\n            <span aria-hidden=\"true\">\n              <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n            </span>\n          </button>\n        </div>\n\n        <div class=\"cx-dialog-body modal-body\">\n          <div id=\"cx-configurator-restart-dialog-description\">\n            {{ 'configurator.restartDialog.description' | cxTranslate }}\n          </div>\n          <button\n            class=\"btn btn-primary btn-block\"\n            (click)=\"resume(product)\"\n            aria-describedby=\"cx-configurator-restart-dialog-description\"\n          >\n            {{ 'configurator.restartDialog.resumeButton' | cxTranslate }}\n          </button>\n          <button\n            type=\"button\"\n            class=\"btn btn-secondary btn-block\"\n            (click)=\"restart(dialogData.owner)\"\n            aria-describedby=\"cx-configurator-restart-dialog-description\"\n          >\n            {{ 'configurator.restartDialog.restartButton' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-container>\n  </ng-container>\n</div>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-restart-dialog', template: "<div class=\"cx-modal-container\">\n  <ng-container *ngIf=\"dialogData$ | async as dialogData\">\n    <ng-container *ngIf=\"product$ | async as product\">\n      <div\n        class=\"cx-modal-content\"\n        [cxFocus]=\"focusConfig\"\n        (esc)=\"backToPDP(product)\"\n      >\n        <div class=\"cx-dialog-header modal-header\">\n          <div class=\"cx-dialog-title modal-title\">\n            {{ 'configurator.restartDialog.title' | cxTranslate }}\n          </div>\n          <button\n            title=\"{{ 'configurator.a11y.closeRestartDialog' | cxTranslate }}\"\n            type=\"button\"\n            class=\"close\"\n            (click)=\"backToPDP(product)\"\n          >\n            <span aria-hidden=\"true\">\n              <cx-icon [type]=\"iconTypes.CLOSE\"></cx-icon>\n            </span>\n          </button>\n        </div>\n\n        <div class=\"cx-dialog-body modal-body\">\n          <div id=\"cx-configurator-restart-dialog-description\">\n            {{ 'configurator.restartDialog.description' | cxTranslate }}\n          </div>\n          <button\n            class=\"btn btn-primary btn-block\"\n            (click)=\"resume(product)\"\n            aria-describedby=\"cx-configurator-restart-dialog-description\"\n          >\n            {{ 'configurator.restartDialog.resumeButton' | cxTranslate }}\n          </button>\n          <button\n            type=\"button\"\n            class=\"btn btn-secondary btn-block\"\n            (click)=\"restart(dialogData.owner)\"\n            aria-describedby=\"cx-configurator-restart-dialog-description\"\n          >\n            {{ 'configurator.restartDialog.restartButton' | cxTranslate }}\n          </button>\n        </div>\n      </div>\n    </ng-container>\n  </ng-container>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i3.LaunchDialogService }, { type: ConfiguratorCommonsService }, { type: i1$1.RoutingService }, { type: i1$1.ProductService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultConfiguratorRestartDialogLayoutConfig = {
    launch: {
        CONFIGURATOR_RESTART_DIALOG: {
            inlineRoot: true,
            component: ConfiguratorRestartDialogComponent,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorRestartDialogModule {
}
ConfiguratorRestartDialogModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorRestartDialogModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogModule, declarations: [ConfiguratorRestartDialogComponent], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
ConfiguratorRestartDialogModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogModule, providers: [
        provideDefaultConfig(defaultConfiguratorRestartDialogLayoutConfig),
    ], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRestartDialogModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ConfiguratorRestartDialogComponent],
                    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
                    providers: [
                        provideDefaultConfig(defaultConfiguratorRestartDialogLayoutConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTabBarComponent {
    /**
     * Returns the tabindex for the configuration tab.
     * The configuration tab is excluded from the tab chain if currently the overview page is displayed.
     * @returns tabindex of the configuration tab
     */
    getTabIndexConfigTab() {
        let tabIndex = 0;
        this.isOverviewPage$.pipe(take(1)).subscribe((isOvPage) => {
            if (isOvPage) {
                tabIndex = -1;
            }
        });
        return tabIndex;
    }
    /**
     * Returns the tabindex for the overview tab.
     * The overview tab is excluded from the tab chain if currently the configuration page is displayed.
     * @returns tabindex of the overview tab
     */
    getTabIndexOverviewTab() {
        let tabIndex = 0;
        this.isOverviewPage$.pipe(take(1)).subscribe((isOvPage) => {
            if (!isOvPage) {
                tabIndex = -1;
            }
        });
        return tabIndex;
    }
    /**
     * Switches the focus of the tabs on pressing left or right arrow key.
     * @param {KeyboardEvent} event - Keyboard event
     * @param {string} currentTab - Current tab
     */
    switchTabOnArrowPress(event, currentTab) {
        if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
            event.preventDefault();
            if (currentTab === '#configTab') {
                this.overviewTab.nativeElement?.focus();
            }
            else {
                this.configTab.nativeElement?.focus();
            }
        }
    }
    constructor(configRouterExtractorService, configuratorCommonsService) {
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.ghostStyle = true;
        this.routerData$ = this.configRouterExtractorService.extractRouterData();
        this.configuration$ = this.routerData$.pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner).pipe(tap(() => {
            this.ghostStyle = false;
        }))));
        this.isOverviewPage$ = this.routerData$.pipe(map((routerData) => routerData.pageType === ConfiguratorRouter.PageType.OVERVIEW));
    }
}
ConfiguratorTabBarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTabBarComponent, deps: [{ token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorTabBarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorTabBarComponent, selector: "cx-configurator-tab-bar", host: { properties: { "class.ghost": "this.ghostStyle" } }, viewQueries: [{ propertyName: "configTab", first: true, predicate: ["configTab"], descendants: true }, { propertyName: "overviewTab", first: true, predicate: ["overviewTab"], descendants: true }], ngImport: i0, template: "<ng-container *ngIf=\"routerData$ | async as routerData\">\n  <ng-container *ngIf=\"configuration$ | async; else ghostTabBar\">\n    <ng-container *ngIf=\"!routerData.displayOnly\">\n      <div class=\"cx-tab-bar\" role=\"tablist\">\n        <a\n          #configTab\n          [tabindex]=\"getTabIndexConfigTab()\"\n          role=\"tab\"\n          [class.active]=\"!(isOverviewPage$ | async)\"\n          [attr.aria-selected]=\"!(isOverviewPage$ | async)\"\n          (keydown)=\"switchTabOnArrowPress($event, '#configTab')\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [attr.aria-label]=\"\n            !(isOverviewPage$ | async)\n              ? ('configurator.a11y.configurationPage' | cxTranslate)\n              : ('configurator.a11y.configurationPageLink' | cxTranslate)\n          \"\n          >{{ 'configurator.tabBar.configuration' | cxTranslate }}</a\n        >\n        <a\n          #overviewTab\n          [tabindex]=\"getTabIndexOverviewTab()\"\n          role=\"tab\"\n          [class.active]=\"isOverviewPage$ | async\"\n          [attr.aria-selected]=\"isOverviewPage$ | async\"\n          (keydown)=\"switchTabOnArrowPress($event, '#overviewTab')\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configureOverview' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [attr.aria-label]=\"\n            (isOverviewPage$ | async)\n              ? ('configurator.a11y.overviewPage' | cxTranslate)\n              : ('configurator.a11y.overviewPageLink' | cxTranslate)\n          \"\n          >{{ 'configurator.tabBar.overview' | cxTranslate }}</a\n        >\n      </div>\n    </ng-container>\n  </ng-container>\n  <ng-template #ghostTabBar>\n    <div class=\"cx-ghost-tab-bar\"></div>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i5.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i1$1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTabBarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-tab-bar', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"routerData$ | async as routerData\">\n  <ng-container *ngIf=\"configuration$ | async; else ghostTabBar\">\n    <ng-container *ngIf=\"!routerData.displayOnly\">\n      <div class=\"cx-tab-bar\" role=\"tablist\">\n        <a\n          #configTab\n          [tabindex]=\"getTabIndexConfigTab()\"\n          role=\"tab\"\n          [class.active]=\"!(isOverviewPage$ | async)\"\n          [attr.aria-selected]=\"!(isOverviewPage$ | async)\"\n          (keydown)=\"switchTabOnArrowPress($event, '#configTab')\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configure' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [attr.aria-label]=\"\n            !(isOverviewPage$ | async)\n              ? ('configurator.a11y.configurationPage' | cxTranslate)\n              : ('configurator.a11y.configurationPageLink' | cxTranslate)\n          \"\n          >{{ 'configurator.tabBar.configuration' | cxTranslate }}</a\n        >\n        <a\n          #overviewTab\n          [tabindex]=\"getTabIndexOverviewTab()\"\n          role=\"tab\"\n          [class.active]=\"isOverviewPage$ | async\"\n          [attr.aria-selected]=\"isOverviewPage$ | async\"\n          (keydown)=\"switchTabOnArrowPress($event, '#overviewTab')\"\n          [routerLink]=\"\n            {\n              cxRoute: 'configureOverview' + routerData.owner.configuratorType,\n              params: {\n                entityKey: routerData.owner.id,\n                ownerType: routerData.owner.type\n              }\n            } | cxUrl\n          \"\n          [attr.aria-label]=\"\n            (isOverviewPage$ | async)\n              ? ('configurator.a11y.overviewPage' | cxTranslate)\n              : ('configurator.a11y.overviewPageLink' | cxTranslate)\n          \"\n          >{{ 'configurator.tabBar.overview' | cxTranslate }}</a\n        >\n      </div>\n    </ng-container>\n  </ng-container>\n  <ng-template #ghostTabBar>\n    <div class=\"cx-ghost-tab-bar\"></div>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorCommonsService }]; }, propDecorators: { ghostStyle: [{
                type: HostBinding,
                args: ['class.ghost']
            }], configTab: [{
                type: ViewChild,
                args: ['configTab']
            }], overviewTab: [{
                type: ViewChild,
                args: ['overviewTab']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTabBarModule {
}
ConfiguratorTabBarModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTabBarModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorTabBarModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTabBarModule, declarations: [ConfiguratorTabBarComponent], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        UrlModule,
        RouterModule], exports: [ConfiguratorTabBarComponent] });
ConfiguratorTabBarModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTabBarModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorTabBar: {
                    component: ConfiguratorTabBarComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        UrlModule,
        RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTabBarModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        RouterModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorTabBar: {
                                    component: ConfiguratorTabBarComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorTabBarComponent],
                    exports: [ConfiguratorTabBarComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultConfiguratorMessageConfig = {
    productConfigurator: {
        updateConfigurationMessage: {
            waitingTime: 1000,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorUpdateMessageComponent {
    constructor(configuratorCommonsService, configRouterExtractorService, config) {
        this.configuratorCommonsService = configuratorCommonsService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.config = config;
        this.hasPendingChanges$ = this.configRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService.hasPendingChanges(routerData.owner)), distinctUntilChanged(), // avoid subsequent emissions of the same value from the source observable
        switchMap((isLoading) => isLoading
            ? of(isLoading).pipe(delay(this.config.productConfigurator?.updateConfigurationMessage
                ?.waitingTime || 1000)) // delay information if it is loading
            : of(isLoading) // inform immediately if it's not loading anymore
        ));
    }
}
ConfiguratorUpdateMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageComponent, deps: [{ token: ConfiguratorCommonsService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorMessageConfig }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorUpdateMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorUpdateMessageComponent, selector: "cx-configurator-update-message", ngImport: i0, template: "<div aria-live=\"polite\" aria-atomic=\"false\">\n  <div class=\"cx-update-msg\" [class.visible]=\"hasPendingChanges$ | async\">\n    <cx-spinner></cx-spinner>\n    <strong>{{ 'configurator.header.updateMessage' | cxTranslate }}</strong>\n  </div>\n</div>\n", dependencies: [{ kind: "component", type: i3.SpinnerComponent, selector: "cx-spinner" }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-update-message', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div aria-live=\"polite\" aria-atomic=\"false\">\n  <div class=\"cx-update-msg\" [class.visible]=\"hasPendingChanges$ | async\">\n    <cx-spinner></cx-spinner>\n    <strong>{{ 'configurator.header.updateMessage' | cxTranslate }}</strong>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCommonsService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorMessageConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorUpdateMessageModule {
}
ConfiguratorUpdateMessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorUpdateMessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageModule, declarations: [ConfiguratorUpdateMessageComponent], imports: [CommonModule, SpinnerModule, I18nModule], exports: [ConfiguratorUpdateMessageComponent] });
ConfiguratorUpdateMessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorUpdateMessage: {
                    component: ConfiguratorUpdateMessageComponent,
                },
            },
        }),
        provideDefaultConfig(defaultConfiguratorMessageConfig),
        { provide: ConfiguratorMessageConfig, useExisting: Config },
    ], imports: [CommonModule, SpinnerModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorUpdateMessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SpinnerModule, I18nModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorUpdateMessage: {
                                    component: ConfiguratorUpdateMessageComponent,
                                },
                            },
                        }),
                        provideDefaultConfig(defaultConfiguratorMessageConfig),
                        { provide: ConfiguratorMessageConfig, useExisting: Config },
                    ],
                    declarations: [ConfiguratorUpdateMessageComponent],
                    exports: [ConfiguratorUpdateMessageComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorVariantCarouselComponent {
    constructor(productService, translationService, configuratorRouterExtractorService, configuratorCommonsService) {
        this.productService = productService;
        this.translationService = translationService;
        this.configuratorRouterExtractorService = configuratorRouterExtractorService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.configuration$ = this.configuratorRouterExtractorService
            .extractRouterData()
            .pipe(switchMap((routerData) => this.configuratorCommonsService.getConfiguration(routerData.owner)));
        this.title$ = this.translationService.translate('configurator.variantCarousel.title');
        this.items$ = this.configuration$.pipe(map((configuration) => configuration.variants ? configuration.variants : []), map((variants) => {
            return variants.map((variant) => this.productService.get(variant.productCode));
        }));
    }
}
ConfiguratorVariantCarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselComponent, deps: [{ token: i1$1.ProductService }, { token: i1$1.TranslationService }, { token: i2$1.ConfiguratorRouterExtractorService }, { token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorVariantCarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorVariantCarouselComponent, selector: "cx-configurator-variant-carousel", ngImport: i0, template: "<ng-container\n  *ngIf=\"((items$ | async)?.length ?? 0) > 0 && (items$ | async) as items\"\n>\n  <div class=\"cx-variant-carousel-container\">\n    <cx-carousel\n      role=\"region\"\n      [attr.aria-label]=\"\n        'productCarousel.carouselLabel' | cxTranslate: { title: title$ | async }\n      \"\n      [items]=\"items\"\n      [title]=\"title$ | async\"\n      [template]=\"carouselItem\"\n      itemWidth=\"285px\"\n    >\n    </cx-carousel>\n\n    <ng-template #carouselItem let-item=\"item\">\n      <cx-product-carousel-item [item]=\"item\"></cx-product-carousel-item>\n    </ng-template>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.CarouselComponent, selector: "cx-carousel", inputs: ["title", "items", "template", "itemWidth", "hideIndicators", "indicatorIcon", "previousIcon", "nextIcon"] }, { kind: "component", type: i3.ProductCarouselItemComponent, selector: "cx-product-carousel-item", inputs: ["item"] }, { kind: "pipe", type: i4$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-variant-carousel', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container\n  *ngIf=\"((items$ | async)?.length ?? 0) > 0 && (items$ | async) as items\"\n>\n  <div class=\"cx-variant-carousel-container\">\n    <cx-carousel\n      role=\"region\"\n      [attr.aria-label]=\"\n        'productCarousel.carouselLabel' | cxTranslate: { title: title$ | async }\n      \"\n      [items]=\"items\"\n      [title]=\"title$ | async\"\n      [template]=\"carouselItem\"\n      itemWidth=\"285px\"\n    >\n    </cx-carousel>\n\n    <ng-template #carouselItem let-item=\"item\">\n      <cx-product-carousel-item [item]=\"item\"></cx-product-carousel-item>\n    </ng-template>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.ProductService }, { type: i1$1.TranslationService }, { type: i2$1.ConfiguratorRouterExtractorService }, { type: ConfiguratorCommonsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorVariantCarouselModule {
}
ConfiguratorVariantCarouselModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorVariantCarouselModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselModule, declarations: [ConfiguratorVariantCarouselComponent], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        CarouselModule,
        ProductCarouselModule], exports: [ConfiguratorVariantCarouselComponent] });
ConfiguratorVariantCarouselModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ConfiguratorVariantCarousel: {
                    component: ConfiguratorVariantCarouselComponent,
                },
            },
        }),
    ], imports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        I18nModule,
        CarouselModule,
        ProductCarouselModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantCarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        FormsModule,
                        ReactiveFormsModule,
                        CommonModule,
                        I18nModule,
                        CarouselModule,
                        ProductCarouselModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ConfiguratorVariantCarousel: {
                                    component: ConfiguratorVariantCarouselComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [ConfiguratorVariantCarouselComponent],
                    exports: [ConfiguratorVariantCarouselComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RulebasedConfiguratorComponentsModule {
}
RulebasedConfiguratorComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorComponentsModule, imports: [ConfiguratorPriceSummaryModule,
        ConfiguratorAddToCartButtonModule,
        ConfiguratorGroupMenuModule,
        ConfiguratorProductTitleModule,
        ConfiguratorTabBarModule,
        ConfiguratorGroupModule,
        ConfiguratorFormModule,
        ConfiguratorGroupTitleModule,
        ConfiguratorUpdateMessageModule,
        ConfiguratorPreviousNextButtonsModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewFormModule,
        ConfiguratorOverviewMenuModule,
        ConfiguratorOverviewNotificationBannerModule,
        ConfiguratorConflictAndErrorMessagesModule,
        ConfiguratorExitButtonModule,
        ConfiguratorAttributeCompositionModule,
        ConfiguratorVariantCarouselModule,
        ConfiguratorOverviewFilterModule,
        ConfiguratorOverviewFilterButtonModule,
        ConfiguratorOverviewFilterDialogModule,
        ConfiguratorOverviewSidebarModule,
        ConfiguratorConflictSolverDialogModule,
        ConfiguratorRestartDialogModule] });
RulebasedConfiguratorComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorComponentsModule, imports: [ConfiguratorPriceSummaryModule,
        ConfiguratorAddToCartButtonModule,
        ConfiguratorGroupMenuModule,
        ConfiguratorProductTitleModule,
        ConfiguratorTabBarModule,
        ConfiguratorGroupModule,
        ConfiguratorFormModule,
        ConfiguratorGroupTitleModule,
        ConfiguratorUpdateMessageModule,
        ConfiguratorPreviousNextButtonsModule,
        ConfiguratorOverviewAttributeModule,
        ConfiguratorOverviewFormModule,
        ConfiguratorOverviewMenuModule,
        ConfiguratorOverviewNotificationBannerModule,
        ConfiguratorConflictAndErrorMessagesModule,
        ConfiguratorExitButtonModule,
        ConfiguratorAttributeCompositionModule,
        ConfiguratorVariantCarouselModule,
        ConfiguratorOverviewFilterModule,
        ConfiguratorOverviewFilterButtonModule,
        ConfiguratorOverviewFilterDialogModule,
        ConfiguratorOverviewSidebarModule,
        ConfiguratorConflictSolverDialogModule,
        ConfiguratorRestartDialogModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ConfiguratorPriceSummaryModule,
                        ConfiguratorAddToCartButtonModule,
                        ConfiguratorGroupMenuModule,
                        ConfiguratorProductTitleModule,
                        ConfiguratorTabBarModule,
                        ConfiguratorGroupModule,
                        ConfiguratorFormModule,
                        ConfiguratorGroupTitleModule,
                        ConfiguratorUpdateMessageModule,
                        ConfiguratorPreviousNextButtonsModule,
                        ConfiguratorOverviewAttributeModule,
                        ConfiguratorOverviewFormModule,
                        ConfiguratorOverviewMenuModule,
                        ConfiguratorOverviewNotificationBannerModule,
                        ConfiguratorConflictAndErrorMessagesModule,
                        ConfiguratorExitButtonModule,
                        ConfiguratorAttributeCompositionModule,
                        ConfiguratorVariantCarouselModule,
                        ConfiguratorOverviewFilterModule,
                        ConfiguratorOverviewFilterButtonModule,
                        ConfiguratorOverviewFilterDialogModule,
                        ConfiguratorOverviewSidebarModule,
                        ConfiguratorConflictSolverDialogModule,
                        ConfiguratorRestartDialogModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorCoreConfig {
}
ConfiguratorCoreConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCoreConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCoreConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCoreConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCoreConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useExisting: Config,
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RulebasedConfiguratorAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
//Not provided in root, as this would break lazy loading
class RulebasedConfiguratorConnector {
    constructor(adapters, configUtilsService, config) {
        this.adapters = adapters;
        this.configUtilsService = configUtilsService;
        this.config = config;
    }
    createConfiguration(owner, configIdTemplate, forceReset = false) {
        return this.getAdapter(owner.configuratorType).createConfiguration(owner, configIdTemplate, forceReset);
    }
    readConfiguration(configId, groupId, configurationOwner) {
        return this.getAdapter(configurationOwner.configuratorType).readConfiguration(configId, groupId, configurationOwner);
    }
    updateConfiguration(configuration) {
        return this.getAdapter(configuration.owner.configuratorType).updateConfiguration(configuration);
    }
    addToCart(parameters) {
        return this.getAdapter(parameters.owner.configuratorType).addToCart(parameters);
    }
    readConfigurationForCartEntry(parameters) {
        return this.getAdapter(parameters.owner.configuratorType).readConfigurationForCartEntry(parameters);
    }
    updateConfigurationForCartEntry(parameters) {
        return this.getAdapter(parameters.configuration.owner.configuratorType).updateConfigurationForCartEntry(parameters);
    }
    readConfigurationForOrderEntry(parameters) {
        return this.getAdapter(parameters.owner.configuratorType).readConfigurationForOrderEntry(parameters);
    }
    readPriceSummary(configuration) {
        return this.getAdapter(configuration.owner.configuratorType).readPriceSummary(configuration);
    }
    getConfigurationOverview(configuration) {
        return this.getAdapter(configuration.owner.configuratorType).getConfigurationOverview(configuration.configId);
    }
    updateConfigurationOverview(configuration) {
        const overview = configuration.overview;
        return overview
            ? this.getAdapter(configuration.owner.configuratorType).updateConfigurationOverview(overview)
            : this.getAdapter(configuration.owner.configuratorType).getConfigurationOverview(configuration.configId);
    }
    searchVariants(configuration) {
        return this.getAdapter(configuration.owner.configuratorType).searchVariants(configuration.configId);
    }
    getAdapter(configuratorType) {
        const adapterResult = this.adapters.find((adapter) => this.isAdapterMatching(adapter, configuratorType));
        if (adapterResult) {
            return adapterResult;
        }
        else {
            throw new Error('No adapter found for configurator type: ' + configuratorType);
        }
    }
    isAdapterMatching(adapter, configuratorType) {
        let matching = adapter.getConfiguratorType() === configuratorType;
        if (matching && "CLOUDCPQCONFIGURATOR" /* ConfiguratorType.CPQ */ === configuratorType) {
            const isCpqOverOccRequested = this.config?.productConfigurator?.cpqOverOcc ?? false;
            const isCpqOverOccSupported = !!adapter.supportsCpqOverOcc && adapter.supportsCpqOverOcc();
            matching = isCpqOverOccRequested === isCpqOverOccSupported;
        }
        return matching;
    }
}
RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST = new InjectionToken('ConfiguratorAdapterList');
RulebasedConfiguratorConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorConnector, deps: [{ token: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST }, { token: i2$1.CommonConfiguratorUtilsService }, { token: ConfiguratorCoreConfig, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
RulebasedConfiguratorConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST]
                }] }, { type: i2$1.CommonConfiguratorUtilsService }, { type: ConfiguratorCoreConfig, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorRouterListener {
    constructor(configuratorCartService, routingService, configuratorQuantityService) {
        this.configuratorCartService = configuratorCartService;
        this.routingService = routingService;
        this.configuratorQuantityService = configuratorQuantityService;
        this.subscription = new Subscription();
        this.observeRouterChanges();
    }
    observeRouterChanges() {
        this.subscription.add(this.routingService.getRouterState().subscribe((routerState) => {
            if (!this.isConfiguratorRelatedRoute(routerState.state.semanticRoute)) {
                this.configuratorCartService.removeCartBoundConfigurations();
                if (this.configuratorQuantityService) {
                    this.configuratorQuantityService.setQuantity(1);
                }
            }
        }));
    }
    isConfiguratorRelatedRoute(semanticRoute) {
        return semanticRoute ? semanticRoute.includes('configure') : false;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ConfiguratorRouterListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterListener, deps: [{ token: ConfiguratorCartService }, { token: i1$1.RoutingService }, { token: ConfiguratorQuantityService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorRouterListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterListener, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: ConfiguratorCartService }, { type: i1$1.RoutingService }, { type: ConfiguratorQuantityService, decorators: [{
                    type: Optional
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorRouterModule {
    constructor(_configuratorRouterListener) {
        // Intentional empty constructor
    }
}
ConfiguratorRouterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterModule, deps: [{ token: ConfiguratorRouterListener }], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorRouterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterModule });
ConfiguratorRouterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: ConfiguratorRouterListener }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultConfiguratorCoreConfig = {
    productConfigurator: {
        enableVariantSearch: false,
        cpqOverOcc: false,
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service that provides helper methods for the basic configurator effects,
 * in order to enhance them without the need to introduce new effects
 */
class ConfiguratorBasicEffectService {
    /**
     * Finds first attribute group with attributes for a configuration (ignores conflict groups per default).
     * If optional parameter 'includeConflicts' is set to true it finds first group with attributes including conflict groups.
     * Throws error if such a group does not exist, as this is an illegal state
     * @param configuration
     * @param includeConflicts (optional) if true it includes also conflict groups in the search
     * @returns Group id
     *
     */
    getFirstGroupWithAttributes(configuration, includeConflicts = false) {
        const id = this.getFirstGroupWithAttributesForList(configuration.groups, includeConflicts);
        if (id) {
            return id;
        }
        else {
            throw new Error('Configuration does not have any attributes');
        }
    }
    /**
     * Finds first group with attributes in a list of groups. Dependent on 'includeConflicts' parameters it includes conflict groups in the search or it ignores them.
     * @param groups
     * @param includeConflicts set to true in order to include conflict groups in the seach
     * @returns Group id
     */
    getFirstGroupWithAttributesForList(groups, includeConflicts) {
        let groupWithAttributes;
        if (includeConflicts &&
            groups.length > 0 &&
            groups[0].groupType === Configurator.GroupType.CONFLICT_HEADER_GROUP) {
            //check if conflicts exist and try to return first conflict group with attributes
            groupWithAttributes = groups[0].subGroups
                .filter((currentGroup) => currentGroup.attributes && currentGroup.attributes.length > 0)
                .shift();
        }
        if (groupWithAttributes === undefined) {
            groupWithAttributes = groups
                .filter((currentGroup) => currentGroup.attributes &&
                currentGroup.attributes.length > 0 &&
                currentGroup.groupType !== Configurator.GroupType.CONFLICT_GROUP)
                .shift();
        }
        let id;
        if (groupWithAttributes) {
            id = groupWithAttributes.id;
        }
        else {
            id = groups
                .filter((currentGroup) => currentGroup.subGroups && currentGroup.subGroups.length > 0)
                .flatMap((currentGroup) => this.getFirstGroupWithAttributesForList(currentGroup.subGroups, includeConflicts))
                .filter((groupId) => groupId) //Filter undefined strings
                .shift();
        }
        return id;
    }
}
ConfiguratorBasicEffectService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorBasicEffectService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorBasicEffectService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorBasicEffectService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorBasicEffectService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Common configurator effects, used for complex configurators like variant configurator
 * and CPQ
 */
class ConfiguratorBasicEffects {
    constructor(actions$, configuratorCommonsConnector, commonConfigUtilsService, configuratorGroupUtilsService, configuratorGroupStatusService, store, configuratorBasicEffectService) {
        this.actions$ = actions$;
        this.configuratorCommonsConnector = configuratorCommonsConnector;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.configuratorGroupUtilsService = configuratorGroupUtilsService;
        this.configuratorGroupStatusService = configuratorGroupStatusService;
        this.store = store;
        this.configuratorBasicEffectService = configuratorBasicEffectService;
        this.logger = inject(LoggerService);
        this.createConfiguration$ = createEffect(() => this.actions$.pipe(ofType(CREATE_CONFIGURATION), mergeMap((action) => {
            return this.configuratorCommonsConnector
                .createConfiguration(action.payload.owner, action.payload.configIdTemplate, action.payload.forceReset)
                .pipe(switchMap((configuration) => {
                const currentGroup = this.configuratorBasicEffectService.getFirstGroupWithAttributes(configuration);
                this.store.dispatch(new UpdatePriceSummary({
                    ...configuration,
                    interactionState: { currentGroup: currentGroup },
                }));
                return [
                    new CreateConfigurationSuccess(configuration),
                    new SearchVariants(configuration),
                ];
            }), catchError((error) => [
                new CreateConfigurationFail({
                    ownerKey: action.payload.owner.key,
                    error: normalizeHttpError(error, this.logger),
                }),
            ]));
        })));
        this.readConfiguration$ = createEffect(() => this.actions$.pipe(ofType(READ_CONFIGURATION), mergeMap((action) => {
            return this.configuratorCommonsConnector
                .readConfiguration(action.payload.configuration.configId, action.payload.groupId, action.payload.configuration.owner)
                .pipe(switchMap((configuration) => [
                new ReadConfigurationSuccess(configuration),
            ]), catchError((error) => [
                new ReadConfigurationFail({
                    ownerKey: action.payload.configuration.owner.key,
                    error: normalizeHttpError(error, this.logger),
                }),
            ]));
        })));
        this.updateConfiguration$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CONFIGURATION), map((action) => action.payload), 
        //mergeMap here as we need to process each update
        //(which only sends one changed attribute at a time),
        //so we must not cancel inner emissions
        mergeMap((payload) => {
            return this.configuratorCommonsConnector
                .updateConfiguration(payload)
                .pipe(map((configuration) => {
                return new UpdateConfigurationSuccess({
                    ...configuration,
                    interactionState: {
                        isConflictResolutionMode: payload.interactionState.isConflictResolutionMode,
                    },
                });
            }), catchError((error) => {
                const errorPayload = normalizeHttpError(error, this.logger);
                return [
                    new UpdateConfigurationFail({
                        configuration: payload,
                        error: errorPayload,
                    }),
                ];
            }));
        })));
        this.updatePriceSummary$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_PRICE_SUMMARY), map((action) => action.payload), filter((configuration) => configuration.pricingEnabled === true), mergeMap((payload) => {
            return this.configuratorCommonsConnector.readPriceSummary(payload).pipe(map((configuration) => {
                return new UpdatePriceSummarySuccess(configuration);
            }), catchError((error) => {
                const errorPayload = normalizeHttpError(error, this.logger);
                return [
                    new UpdatePriceSummaryFail({
                        ownerKey: payload.owner.key,
                        error: errorPayload,
                    }),
                ];
            }));
        })));
        this.getOverview$ = createEffect(() => this.actions$.pipe(ofType(GET_CONFIGURATION_OVERVIEW), map((action) => action.payload), mergeMap((payload) => {
            return this.configuratorCommonsConnector
                .getConfigurationOverview(payload)
                .pipe(map((overview) => {
                return new GetConfigurationOverviewSuccess({
                    ownerKey: payload.owner.key,
                    overview: overview,
                });
            }), catchError((error) => {
                const errorPayload = normalizeHttpError(error, this.logger);
                return [
                    new GetConfigurationOverviewFail({
                        ownerKey: payload.owner.key,
                        error: errorPayload,
                    }),
                ];
            }));
        })));
        this.updateOverview$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CONFIGURATION_OVERVIEW), map((action) => action.payload), mergeMap((payload) => {
            return this.configuratorCommonsConnector
                .updateConfigurationOverview(payload)
                .pipe(map((overview) => {
                return new UpdateConfigurationOverviewSuccess({
                    ownerKey: payload.owner.key,
                    overview: overview,
                });
            }), catchError((error) => {
                const errorPayload = normalizeHttpError(error, this.logger);
                return [
                    new UpdateConfigurationOverviewFail({
                        ownerKey: payload.owner.key,
                        error: errorPayload,
                    }),
                ];
            }));
        })));
        this.updateConfigurationSuccess$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CONFIGURATION_SUCCESS), map((action) => action.payload), mergeMap((payload) => {
            return this.store.pipe(select(hasPendingChanges(payload.owner.key)), take(1), filter((hasPendingChanges) => hasPendingChanges === false), switchMap(() => this.store.pipe(select(getCurrentGroup(payload.owner.key)), take(1), map((currentGroupId) => {
                // Group ids of conflict groups (Configurator.GroupType.CONFLICT_GROUP) always start with 'CONFLICT'
                const groupIdFromPayload = this.configuratorBasicEffectService.getFirstGroupWithAttributes(payload, payload.interactionState.isConflictResolutionMode);
                const parentGroupFromPayload = this.configuratorGroupUtilsService.getParentGroup(payload.groups, this.configuratorGroupUtilsService.getGroupById(payload.groups, groupIdFromPayload), undefined);
                return {
                    currentGroupId,
                    groupIdFromPayload,
                    parentGroupFromPayload,
                };
            }), switchMap((container) => {
                //changeGroup because in cases where a queue of updates exists with a group navigation in between,
                //we need to ensure that the last update determines the current group.
                const updateFinalizeSuccessAction = new UpdateConfigurationFinalizeSuccess(payload);
                const updatePriceSummaryAction = new UpdatePriceSummary({
                    ...payload,
                    interactionState: {
                        currentGroup: container.groupIdFromPayload,
                    },
                });
                const searchVariantsAction = new SearchVariants(payload);
                return container.currentGroupId ===
                    container.groupIdFromPayload
                    ? [
                        updateFinalizeSuccessAction,
                        updatePriceSummaryAction,
                        searchVariantsAction,
                    ]
                    : [
                        updateFinalizeSuccessAction,
                        updatePriceSummaryAction,
                        searchVariantsAction,
                        new ChangeGroup({
                            configuration: payload,
                            groupId: container.groupIdFromPayload,
                            parentGroupId: container.parentGroupFromPayload?.id,
                        }),
                    ];
            }))));
        })));
        this.updateConfigurationFail$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CONFIGURATION_FAIL), map((action) => action.payload), mergeMap((payload) => {
            return this.store.pipe(select(hasPendingChanges(payload.configuration.owner.key)), take(1), filter((hasPendingChanges) => hasPendingChanges === false), map(() => new UpdateConfigurationFinalizeFail(payload.configuration)));
        })));
        this.handleErrorOnUpdate$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CONFIGURATION_FINALIZE_FAIL), map((action) => action.payload), map((payload) => new ReadConfiguration({
            configuration: payload,
            groupId: this.configuratorBasicEffectService.getFirstGroupWithAttributes(payload),
        }))));
        this.groupChange$ = createEffect(() => this.actions$.pipe(ofType(CHANGE_GROUP), switchMap((action) => {
            return this.store.pipe(select(hasPendingChanges(action.payload.configuration.owner.key)), take(1), filter((hasPendingChanges) => hasPendingChanges === false), switchMap(() => {
                return this.configuratorCommonsConnector
                    .readConfiguration(action.payload.configuration.configId, action.payload.groupId, action.payload.configuration.owner)
                    .pipe(switchMap((configuration) => {
                    return [
                        new SetCurrentGroup({
                            entityKey: action.payload.configuration.owner.key,
                            currentGroup: action.payload.groupId,
                        }),
                        new SetMenuParentGroup({
                            entityKey: action.payload.configuration.owner.key,
                            menuParentGroup: action.payload.parentGroupId,
                        }),
                        new ReadConfigurationSuccess(configuration),
                        new UpdatePriceSummary({
                            ...configuration,
                            interactionState: {
                                currentGroup: action.payload.groupId,
                            },
                        }),
                    ];
                }), catchError((error) => [
                    new ReadConfigurationFail({
                        ownerKey: action.payload.configuration.owner.key,
                        error: normalizeHttpError(error, this.logger),
                    }),
                ]));
            }));
        })));
        this.removeProductBoundConfigurations$ = createEffect(() => this.actions$.pipe(ofType(REMOVE_PRODUCT_BOUND_CONFIGURATIONS), switchMap(() => {
            return this.store.pipe(select(getConfigurationsState), take(1), map((configuratorState) => {
                const entities = configuratorState.configurations.entities;
                const ownerKeysToRemove = [];
                for (const ownerKey in entities) {
                    if (ownerKey.includes(CommonConfigurator.OwnerType.PRODUCT)) {
                        ownerKeysToRemove.push(ownerKey);
                    }
                }
                return new RemoveConfiguration({
                    ownerKey: ownerKeysToRemove,
                });
            }));
        })));
    }
}
ConfiguratorBasicEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorBasicEffects, deps: [{ token: i1$2.Actions }, { token: RulebasedConfiguratorConnector }, { token: i2$1.CommonConfiguratorUtilsService }, { token: ConfiguratorUtilsService }, { token: ConfiguratorGroupStatusService }, { token: i1.Store }, { token: ConfiguratorBasicEffectService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorBasicEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorBasicEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorBasicEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.Actions }, { type: RulebasedConfiguratorConnector }, { type: i2$1.CommonConfiguratorUtilsService }, { type: ConfiguratorUtilsService }, { type: ConfiguratorGroupStatusService }, { type: i1.Store }, { type: ConfiguratorBasicEffectService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ERROR_MESSAGE_NO_ENTRY_NUMBER_FOUND = 'Entry number is required in addToCart response';
/**
 * Common configurator effects related to cart handling
 */
class ConfiguratorCartEffects {
    constructor(actions$, configuratorCommonsConnector, commonConfigUtilsService, configuratorGroupUtilsService, store, configuratorBasicEffectService) {
        this.actions$ = actions$;
        this.configuratorCommonsConnector = configuratorCommonsConnector;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.configuratorGroupUtilsService = configuratorGroupUtilsService;
        this.store = store;
        this.configuratorBasicEffectService = configuratorBasicEffectService;
        this.logger = inject(LoggerService);
        this.addToCart$ = createEffect(() => this.actions$.pipe(ofType(ADD_TO_CART), map((action) => action.payload), switchMap((payload) => {
            return this.configuratorCommonsConnector.addToCart(payload).pipe(switchMap((entry) => {
                const entryNumber = entry.entry?.entryNumber;
                if (entryNumber === undefined) {
                    throw Error(ERROR_MESSAGE_NO_ENTRY_NUMBER_FOUND);
                }
                else {
                    return [
                        new AddNextOwner({
                            ownerKey: payload.owner.key,
                            cartEntryNo: entryNumber.toString(),
                        }),
                        new CartActions.CartAddEntrySuccess({
                            ...entry,
                            userId: payload.userId,
                            cartId: payload.cartId,
                            productCode: payload.productCode,
                            quantity: payload.quantity,
                            deliveryModeChanged: entry.deliveryModeChanged,
                            entry: entry.entry,
                            quantityAdded: entry.quantityAdded,
                            statusCode: entry.statusCode,
                            statusMessage: entry.statusMessage,
                        }),
                    ];
                }
            }), catchError((error) => of(new CartActions.CartAddEntryFail({
                userId: payload.userId,
                cartId: payload.cartId,
                productCode: payload.productCode,
                quantity: payload.quantity,
                error: error instanceof HttpErrorResponse
                    ? normalizeHttpError(error, this.logger)
                    : error,
            }))));
        })));
        this.updateCartEntry$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CART_ENTRY), map((action) => action.payload), switchMap((payload) => {
            return this.configuratorCommonsConnector
                .updateConfigurationForCartEntry(payload)
                .pipe(switchMap((cartModification) => {
                return [
                    new CartActions.CartUpdateEntrySuccess({
                        userId: payload.userId,
                        cartId: payload.cartId,
                        entryNumber: payload.cartEntryNumber,
                        quantity: cartModification.quantity,
                    }),
                ];
            }), catchError((error) => of(new CartActions.CartUpdateEntryFail({
                userId: payload.userId,
                cartId: payload.cartId,
                entryNumber: payload.cartEntryNumber,
                error: normalizeHttpError(error, this.logger),
            }))));
        })));
        this.readConfigurationForCartEntry$ = createEffect(() => this.actions$.pipe(ofType(READ_CART_ENTRY_CONFIGURATION), switchMap((action) => {
            const parameters = action.payload;
            return this.configuratorCommonsConnector
                .readConfigurationForCartEntry(parameters)
                .pipe(switchMap((result) => {
                const updatePriceSummaryAction = new UpdatePriceSummary({
                    ...result,
                    interactionState: {
                        currentGroup: this.configuratorBasicEffectService.getFirstGroupWithAttributes(result, !result.immediateConflictResolution),
                    },
                });
                return [
                    new ReadCartEntryConfigurationSuccess(result),
                    updatePriceSummaryAction,
                    new SearchVariants(result),
                ];
            }), catchError((error) => [
                new ReadCartEntryConfigurationFail({
                    ownerKey: action.payload.owner.key,
                    error: normalizeHttpError(error, this.logger),
                }),
            ]));
        })));
        this.readConfigurationForOrderEntry$ = createEffect(() => this.actions$.pipe(ofType(READ_ORDER_ENTRY_CONFIGURATION), switchMap((action) => {
            const parameters = action.payload;
            return this.configuratorCommonsConnector
                .readConfigurationForOrderEntry(parameters)
                .pipe(switchMap((result) => [
                new ReadOrderEntryConfigurationSuccess(result),
            ]), catchError((error) => [
                new ReadOrderEntryConfigurationFail({
                    ownerKey: action.payload.owner.key,
                    error: normalizeHttpError(error, this.logger),
                }),
            ]));
        })));
        this.removeCartBoundConfigurations$ = createEffect(() => this.actions$.pipe(ofType(REMOVE_CART_BOUND_CONFIGURATIONS), switchMap(() => {
            return this.store.pipe(select(getConfigurationsState), take(1), map((configuratorState) => {
                const entities = configuratorState.configurations.entities;
                const ownerKeysToRemove = [];
                const ownerKeysProductBound = [];
                for (const ownerKey in entities) {
                    if (ownerKey.includes(CommonConfigurator.OwnerType.CART_ENTRY)) {
                        ownerKeysToRemove.push(ownerKey);
                    }
                    else if (ownerKey.includes(CommonConfigurator.OwnerType.PRODUCT)) {
                        ownerKeysProductBound.push(ownerKey);
                    }
                }
                ownerKeysProductBound.forEach((ownerKey) => {
                    const configuration = entities[ownerKey];
                    if (configuration.value?.nextOwner !== undefined) {
                        ownerKeysToRemove.push(ownerKey);
                    }
                });
                return new RemoveConfiguration({
                    ownerKey: ownerKeysToRemove,
                });
            }));
        })));
        this.addOwner$ = createEffect(() => this.actions$.pipe(ofType(ADD_NEXT_OWNER), switchMap((action) => {
            return this.store.pipe(select(getConfigurationFactory(action.payload.ownerKey)), take(1), switchMap((configuration) => {
                const newOwner = ConfiguratorModelUtils.createOwner(CommonConfigurator.OwnerType.CART_ENTRY, action.payload.cartEntryNo);
                this.commonConfigUtilsService.setOwnerKey(newOwner);
                return [
                    new SetNextOwnerCartEntry({
                        configuration: configuration,
                        cartEntryNo: action.payload.cartEntryNo,
                    }),
                    new SetInteractionState({
                        entityKey: newOwner.key,
                        interactionState: configuration.interactionState,
                    }),
                ];
            }));
        })));
    }
}
ConfiguratorCartEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEffects, deps: [{ token: i1$2.Actions }, { token: RulebasedConfiguratorConnector }, { token: i2$1.CommonConfiguratorUtilsService }, { token: ConfiguratorUtilsService }, { token: i1.Store }, { token: ConfiguratorBasicEffectService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCartEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.Actions }, { type: RulebasedConfiguratorConnector }, { type: i2$1.CommonConfiguratorUtilsService }, { type: ConfiguratorUtilsService }, { type: i1.Store }, { type: ConfiguratorBasicEffectService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Rulebased configurator effects related to variant search
 */
class ConfiguratorVariantEffects {
    constructor(actions$, configuratorCommonsConnector, configuratorCoreConfig) {
        this.actions$ = actions$;
        this.configuratorCommonsConnector = configuratorCommonsConnector;
        this.configuratorCoreConfig = configuratorCoreConfig;
        this.logger = inject(LoggerService);
        this.searchVariants$ = createEffect(() => this.actions$.pipe(ofType(SEARCH_VARIANTS), filter(() => this.configuratorCoreConfig.productConfigurator
            ?.enableVariantSearch === true), filter((action) => action.payload.owner.configuratorType === "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */), switchMap((action) => {
            return this.configuratorCommonsConnector
                .searchVariants(action.payload)
                .pipe(switchMap((result) => [
                new SearchVariantsSuccess({
                    ownerKey: action.payload.owner.key,
                    variants: result,
                }),
            ]), catchError((error) => [
                new SearchVariantsFail({
                    ownerKey: action.payload.owner.key,
                    error: normalizeHttpError(error, this.logger),
                }),
            ]));
        })));
    }
}
ConfiguratorVariantEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantEffects, deps: [{ token: i1$2.Actions }, { token: RulebasedConfiguratorConnector }, { token: ConfiguratorCoreConfig }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorVariantEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorVariantEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.Actions }, { type: RulebasedConfiguratorConnector }, { type: ConfiguratorCoreConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ConfiguratorEffects = [
    ConfiguratorBasicEffects,
    ConfiguratorCartEffects,
    ConfiguratorVariantEffects,
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorStateUtils {
    static mergeGroupsWithSupplements(groups, attributeSupplements) {
        const mergedGroups = [];
        groups.forEach((group) => mergedGroups.push(this.mergeGroupWithSupplements(group, attributeSupplements)));
        return mergedGroups;
    }
    static mergeGroupWithSupplements(group, attributeSupplements) {
        if (this.isTargetGroup(group, attributeSupplements)) {
            return this.mergeTargetGroupWithSupplements(group, attributeSupplements);
        }
        else {
            return {
                ...group,
                subGroups: this.mergeGroupsWithSupplements(group.subGroups, attributeSupplements),
            };
        }
    }
    static mergeTargetGroupWithSupplements(group, attributeSupplements) {
        let mergedAttributes = group.attributes;
        attributeSupplements.forEach((attributeSupplement) => {
            const attributeName = ConfiguratorStateUtils.getAttributeName(attributeSupplement.attributeUiKey);
            mergedAttributes = this.updateArrayElement(mergedAttributes, (attribute) => attribute.name === attributeName, (attribute) => {
                return {
                    ...attribute,
                    values: this.mergeValuesWithSupplement(attribute.values, attributeSupplement),
                };
            });
        });
        return {
            ...group,
            attributes: mergedAttributes,
        };
    }
    static mergeValuesWithSupplement(attributeValues, attributeSupplement) {
        let mergedValues = attributeValues;
        attributeSupplement.valueSupplements.forEach((valueSupplement) => {
            mergedValues = this.updateArrayElement(mergedValues, (value) => value.valueCode === valueSupplement.attributeValueKey, (value) => {
                return {
                    ...value,
                    valuePrice: valueSupplement.priceValue,
                };
            });
        });
        return mergedValues;
    }
    static isTargetGroup(group, attributeSupplements) {
        const firstSupplement = attributeSupplements[0];
        if (firstSupplement) {
            const attributeName = ConfiguratorStateUtils.getAttributeName(firstSupplement.attributeUiKey);
            const attributeUiKey = ConfiguratorStateUtils.getKey(firstSupplement.attributeUiKey, attributeName);
            return group.id.indexOf(attributeUiKey) >= 0;
        }
        else {
            // that should never happen, as we merge existing groups
            // with supplements only if supplements are available
            throw new Error('We expect at least one attribute supplement');
        }
    }
    /**
     * It searches in the given `array` for the first element satisfying the `predicate` function.
     * Then it returns a fresh array, where this element is replaced with the result of the `projection` function.
     *
     * If no element of the `array` satisfied the `predicate`, it returns the original `array`.
     */
    static updateArrayElement(array, predicate, projection) {
        if (array) {
            const index = array.findIndex(predicate);
            if (index === -1) {
                return array;
            }
            const value = array[index];
            const newValue = projection(value, index);
            const newArray = [...array];
            newArray[index] = newValue;
            return newArray;
        }
    }
    static getAttributeName(attributeUiKey) {
        const lastIndexOf = attributeUiKey.lastIndexOf('@');
        return attributeUiKey.slice(lastIndexOf + 1);
    }
    static getKey(key, name) {
        return key.replace('@' + name, '');
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState = {
    configId: '',
    productCode: '',
    groups: [],
    flatGroups: [],
    interactionState: {
        currentGroup: undefined,
        groupsVisited: {},
        menuParentGroup: undefined,
    },
    owner: ConfiguratorModelUtils.createInitialOwner(),
};
const initialStatePendingChanges = 0;
let reducerMap;
function configuratorReducer(state = initialState, action) {
    ensureReducerMapCreated();
    if (reducerMap.has(action.type)) {
        return reducerMap.get(action.type)(state, action);
    }
    else {
        return state;
    }
}
function ensureReducerMapCreated() {
    if (reducerMap === undefined) {
        reducerMap = new Map();
        reducerMap.set(UPDATE_CONFIGURATION_FINALIZE_SUCCESS, handleActionUpdateConfigurationFinalizeSuccess);
        reducerMap.set(UPDATE_CART_ENTRY, handleActionUpdateCartEntry);
        reducerMap.set(CREATE_CONFIGURATION_SUCCESS, handleCreateSuccess);
        reducerMap.set(READ_CONFIGURATION_SUCCESS, handleReadSucess);
        reducerMap.set(READ_CART_ENTRY_CONFIGURATION_SUCCESS, handleCartEntryReadSucess);
        reducerMap.set(UPDATE_PRICE_SUMMARY_SUCCESS, handleUpdatePriceSummarySuccess);
        reducerMap.set(GET_CONFIGURATION_OVERVIEW_SUCCESS, handleGetConfigurationOverviewSuccess);
        reducerMap.set(UPDATE_CONFIGURATION_OVERVIEW_SUCCESS, handleUpdateConfigurationOverviewSuccess);
        reducerMap.set(SEARCH_VARIANTS_SUCCESS, handleSearchVariantsSuccess);
        reducerMap.set(READ_ORDER_ENTRY_CONFIGURATION_SUCCESS, handleReadOrderEntryConfigurationSuccess);
        reducerMap.set(SET_NEXT_OWNER_CART_ENTRY, handleSetNextOwnerCartEntry);
        reducerMap.set(SET_INTERACTION_STATE, handleSetInteractionState);
        reducerMap.set(SET_CURRENT_GROUP, handleSetCurrentGroup);
        reducerMap.set(SET_MENU_PARENT_GROUP, handleSetMenuParentGroup);
        reducerMap.set(SET_GROUPS_VISITED, handleSetGroupsVisited);
        reducerMap.set(DISMISS_CONFLICT_DIALOG, handleActionDismissConflictSolverDialog);
        reducerMap.set(CHECK_CONFLICT_DIALOG, handleActionCheckConflictSolverDialog);
        reducerMap.set(CHANGE_GROUP, handleChangeGroup);
    }
}
function handleActionUpdateConfigurationFinalizeSuccess(state, action) {
    const result = takeOverChanges(action, state);
    checkConflictSolverDialog(result);
    result.isCartEntryUpdateRequired = true;
    result.overview = undefined;
    if (state.interactionState.newConfiguration !== undefined) {
        result.interactionState.newConfiguration = false;
    }
    return result;
}
function checkConflictSolverDialog(configuration) {
    configuration.interactionState.showConflictSolverDialog =
        configuration.immediateConflictResolution && !configuration.consistent;
    if (configuration.interactionState.showConflictSolverDialog) {
        configuration.interactionState.issueNavigationDone = true;
    }
}
function handleActionDismissConflictSolverDialog(state, action) {
    if (action.type === DISMISS_CONFLICT_DIALOG) {
        const result = {
            ...state,
            interactionState: {
                ...state.interactionState,
                showConflictSolverDialog: false,
            },
        };
        return result;
    }
}
function handleActionCheckConflictSolverDialog(state) {
    const result = {
        ...state,
        interactionState: {
            ...state.interactionState,
        },
    };
    checkConflictSolverDialog(result);
    return result;
}
function handleActionUpdateCartEntry(state) {
    const result = { ...state };
    result.isCartEntryUpdateRequired = false;
    return result;
}
function handleCreateSuccess(state, action) {
    const result = setInitialCurrentGroup(takeOverChanges(action, state));
    checkConflictSolverDialog(result);
    result.interactionState.newConfiguration = result.newConfiguration;
    return result;
}
function handleReadSucess(state, action) {
    const result = setInitialCurrentGroup(takeOverChanges(action, state));
    checkConflictSolverDialog(result);
    return result;
}
function handleCartEntryReadSucess(state, action) {
    return setInitialCurrentGroup(takeOverChanges(action, state));
}
function handleUpdatePriceSummarySuccess(state, action) {
    return setInitialCurrentGroup(takeOverPricingChanges(action, state));
}
function handleGetConfigurationOverviewSuccess(state, action) {
    const content = {
        ...action.payload.overview,
        possibleGroups: action.payload.overview.groups,
    };
    return {
        ...state,
        overview: content,
        priceSummary: content.priceSummary,
        interactionState: {
            ...state.interactionState,
            issueNavigationDone: false,
        },
    };
}
function handleUpdateConfigurationOverviewSuccess(state, action) {
    const content = {
        ...action.payload.overview,
    };
    return {
        ...state,
        overview: content,
        priceSummary: content.priceSummary,
        interactionState: {
            ...state.interactionState,
            issueNavigationDone: false,
        },
    };
}
function handleSearchVariantsSuccess(state, action) {
    return {
        ...state,
        variants: action.payload.variants,
    };
}
function handleReadOrderEntryConfigurationSuccess(state, action) {
    const configuration = { ...action.payload };
    const result = {
        ...state,
        ...configuration,
        priceSummary: configuration.overview?.priceSummary,
    };
    return result;
}
function handleSetNextOwnerCartEntry(state, action) {
    const content = { ...action.payload.configuration };
    content.nextOwner = ConfiguratorModelUtils.createOwner(CommonConfigurator.OwnerType.CART_ENTRY, action.payload.cartEntryNo);
    const result = {
        ...state,
        ...content,
    };
    return result;
}
function handleSetInteractionState(state, action) {
    const newInteractionState = action.payload.interactionState;
    return {
        ...state,
        interactionState: newInteractionState,
    };
}
function handleSetCurrentGroup(state, action) {
    const newCurrentGroup = action.payload.currentGroup;
    const result = {
        ...state,
        interactionState: {
            ...state.interactionState,
            currentGroup: newCurrentGroup,
        },
    };
    checkConflictSolverDialog(result);
    return result;
}
function handleSetMenuParentGroup(state, action) {
    const newMenuParentGroup = action.payload.menuParentGroup;
    return {
        ...state,
        interactionState: {
            ...state.interactionState,
            menuParentGroup: newMenuParentGroup,
        },
    };
}
function handleSetGroupsVisited(state, action) {
    const groupIds = action.payload.visitedGroups;
    const changedInteractionState = {
        groupsVisited: {},
    };
    //Set Current state items
    if (state.interactionState.groupsVisited) {
        Object.keys(state.interactionState.groupsVisited).forEach((groupId) => setGroupsVisited(changedInteractionState, groupId));
    }
    //Add new Groups
    groupIds.forEach((groupId) => setGroupsVisited(changedInteractionState, groupId));
    return {
        ...state,
        interactionState: {
            ...state.interactionState,
            groupsVisited: changedInteractionState.groupsVisited,
        },
    };
}
function handleChangeGroup(state, action) {
    const isConflictResolutionMode = action.payload.conflictResolutionMode;
    return {
        ...state,
        interactionState: {
            ...state.interactionState,
            isConflictResolutionMode: isConflictResolutionMode,
        },
    };
}
function setGroupsVisited(changedInteractionState, groupId) {
    const groupsVisited = changedInteractionState.groupsVisited;
    if (groupsVisited) {
        groupsVisited[groupId] = true;
    }
}
function setInitialCurrentGroup(state) {
    if (state.interactionState.currentGroup) {
        return state;
    }
    let initialCurrentGroup;
    const flatGroups = state.flatGroups;
    if (flatGroups && flatGroups.length > 0) {
        initialCurrentGroup = state.immediateConflictResolution
            ? flatGroups.find((group) => !group.id.startsWith(Configurator.ConflictIdPrefix))?.id
            : flatGroups[0].id;
    }
    const menuParentGroup = initialCurrentGroup?.startsWith(Configurator.ConflictIdPrefix)
        ? Configurator.ConflictHeaderId
        : undefined;
    return {
        ...state,
        interactionState: {
            ...state.interactionState,
            currentGroup: initialCurrentGroup,
            menuParentGroup: menuParentGroup,
        },
    };
}
function takeOverChanges(action, state) {
    const content = { ...action.payload };
    const groups = content.groups.length > 0 ? content.groups : state.groups;
    const result = {
        ...state,
        ...content,
        groups: groups,
        interactionState: {
            ...state.interactionState,
            ...content.interactionState,
            showConflictSolverDialog: state.interactionState.showConflictSolverDialog,
            issueNavigationDone: true,
        },
    };
    return result;
}
function takeOverPricingChanges(action, state) {
    const content = { ...action.payload };
    const priceSupplements = content.priceSupplements;
    const groups = priceSupplements && priceSupplements.length > 0
        ? ConfiguratorStateUtils.mergeGroupsWithSupplements(state.groups, priceSupplements)
        : state.groups;
    const result = {
        ...state,
        ...content,
        groups: groups,
        interactionState: {
            ...state.interactionState,
            ...content.interactionState,
            issueNavigationDone: true,
        },
    };
    return result;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getConfiguratorReducers() {
    return {
        // @ts-ignore TODO (#12620)
        configurations: StateUtils.entityProcessesLoaderReducer(CONFIGURATOR_DATA, 
        // @ts-ignore TODO (#12620)
        configuratorReducer),
    };
}
const configuratorReducerToken = new InjectionToken('ConfiguratorReducers');
const configuratorReducerProvider = {
    provide: configuratorReducerToken,
    useFactory: getConfiguratorReducers,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RulebasedConfiguratorStateModule {
}
RulebasedConfiguratorStateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorStateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorStateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorStateModule, imports: [CommonModule,
        StateModule, i1.StoreFeatureModule, i1$2.EffectsFeatureModule] });
RulebasedConfiguratorStateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorStateModule, providers: [configuratorReducerProvider], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(CONFIGURATOR_FEATURE, configuratorReducerToken),
        EffectsModule.forFeature(ConfiguratorEffects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorStateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(CONFIGURATOR_FEATURE, configuratorReducerToken),
                        EffectsModule.forFeature(ConfiguratorEffects),
                    ],
                    providers: [configuratorReducerProvider],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorLogoutEventListener {
    constructor(eventService, configExpertModeService, configuratorCommonsService) {
        this.eventService = eventService;
        this.configExpertModeService = configExpertModeService;
        this.configuratorCommonsService = configuratorCommonsService;
        this.subscription = new Subscription();
        this.onLogout();
    }
    onLogout() {
        this.subscription.add(merge(this.eventService.get(LogoutEvent)).subscribe(() => {
            this.configExpertModeService.setExpModeActive(false);
            this.configExpertModeService.setExpModeRequested(false);
            this.configuratorCommonsService.removeProductBoundConfigurations();
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
ConfiguratorLogoutEventListener.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorLogoutEventListener, deps: [{ token: i1$1.EventService }, { token: ConfiguratorExpertModeService }, { token: ConfiguratorCommonsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorLogoutEventListener.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorLogoutEventListener, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorLogoutEventListener, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.EventService }, { type: ConfiguratorExpertModeService }, { type: ConfiguratorCommonsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
class RulebasedConfiguratorCoreModule {
    constructor(_configuratorLogoutEventListener) {
        // Intentional empty constructor
    }
}
RulebasedConfiguratorCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorCoreModule, deps: [{ token: ConfiguratorLogoutEventListener }], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorCoreModule, imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule] });
RulebasedConfiguratorCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorCoreModule, providers: [
        RulebasedConfiguratorConnector,
        provideDefaultConfig(defaultConfiguratorCoreConfig),
    ], imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [RulebasedConfiguratorStateModule, ConfiguratorRouterModule],
                    providers: [
                        RulebasedConfiguratorConnector,
                        provideDefaultConfig(defaultConfiguratorCoreConfig),
                    ],
                }]
        }], ctorParameters: function () { return [{ type: ConfiguratorLogoutEventListener }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantAddToCartSerializer {
    constructor() {
        // Intentional empty constructor
    }
    convert(source, target) {
        const resultTarget = {
            ...target,
            userId: source.userId,
            cartId: source.cartId,
            product: { code: source.productCode },
            quantity: source.quantity,
            configId: source.configId,
        };
        return resultTarget;
    }
}
OccConfiguratorVariantAddToCartSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantAddToCartSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantAddToCartSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantAddToCartSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantAddToCartSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var OccConfigurator;
(function (OccConfigurator) {
    let GroupType;
    (function (GroupType) {
        GroupType["CSTIC_GROUP"] = "CSTIC_GROUP";
        GroupType["INSTANCE"] = "INSTANCE";
        GroupType["CONFLICT_HEADER"] = "CONFLICT_HEADER";
        GroupType["CONFLICT"] = "CONFLICT";
    })(GroupType = OccConfigurator.GroupType || (OccConfigurator.GroupType = {}));
    let UiType;
    (function (UiType) {
        UiType["STRING"] = "STRING";
        UiType["NUMERIC"] = "NUMERIC";
        UiType["CHECK_BOX"] = "CHECK_BOX";
        UiType["CHECK_BOX_LIST"] = "CHECK_BOX_LIST";
        UiType["RADIO_BUTTON"] = "RADIO_BUTTON";
        UiType["RADIO_BUTTON_ADDITIONAL_INPUT"] = "RADIO_BUTTON_ADDITIONAL_INPUT";
        UiType["DROPDOWN"] = "DROPDOWN";
        UiType["DROPDOWN_ADDITIONAL_INPUT"] = "DROPDOWN_ADDITIONAL_INPUT";
        UiType["READ_ONLY"] = "READ_ONLY";
        UiType["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
        UiType["SINGLE_SELECTION_IMAGE"] = "SINGLE_SELECTION_IMAGE";
        UiType["MULTI_SELECTION_IMAGE"] = "MULTI_SELECTION_IMAGE";
    })(UiType = OccConfigurator.UiType || (OccConfigurator.UiType = {}));
    let PriceType;
    (function (PriceType) {
        PriceType["BUY"] = "BUY";
    })(PriceType = OccConfigurator.PriceType || (OccConfigurator.PriceType = {}));
    let ImageFormatType;
    (function (ImageFormatType) {
        ImageFormatType["VALUE_IMAGE"] = "VALUE_IMAGE";
        ImageFormatType["CSTIC_IMAGE"] = "CSTIC_IMAGE";
    })(ImageFormatType = OccConfigurator.ImageFormatType || (OccConfigurator.ImageFormatType = {}));
    let ImageType;
    (function (ImageType) {
        ImageType["PRIMARY"] = "PRIMARY";
        ImageType["GALLERY"] = "GALLERY";
    })(ImageType = OccConfigurator.ImageType || (OccConfigurator.ImageType = {}));
    let OverviewFilterEnum;
    (function (OverviewFilterEnum) {
        OverviewFilterEnum["VISIBLE"] = "PRIMARY";
        OverviewFilterEnum["USER_INPUT"] = "USER_INPUT";
        OverviewFilterEnum["PRICE_RELEVANT"] = "PRICE_RELEVANT";
    })(OverviewFilterEnum = OccConfigurator.OverviewFilterEnum || (OccConfigurator.OverviewFilterEnum = {}));
})(OccConfigurator || (OccConfigurator = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantNormalizer {
    constructor(config, translation, uiSettingsConfig) {
        this.config = config;
        this.translation = translation;
        this.uiSettingsConfig = uiSettingsConfig;
    }
    convert(source, target) {
        const resultTarget = {
            ...target,
            owner: target?.owner ?? ConfiguratorModelUtils.createInitialOwner(),
            interactionState: target?.interactionState ?? {},
            configId: source.configId,
            complete: source.complete,
            consistent: source.consistent,
            totalNumberOfIssues: source.totalNumberOfIssues,
            productCode: source.rootProduct,
            groups: [],
            flatGroups: [],
            kbKey: source.kbKey ?? undefined,
            pricingEnabled: source.pricingEnabled ?? true,
            hideBasePriceAndSelectedOptions: source.hideBasePriceAndSelectedOptions,
            immediateConflictResolution: source.immediateConflictResolution ?? false,
            newConfiguration: source.newConfiguration, // we need a trinary state true, false, undefined!
        };
        const flatGroups = [];
        source.groups?.forEach((group) => this.convertGroup(group, resultTarget.groups, flatGroups));
        resultTarget.flatGroups = flatGroups;
        return resultTarget;
    }
    convertGroup(source, groupList, flatGroupList) {
        const attributes = [];
        if (source.attributes) {
            source.attributes.forEach((sourceAttribute) => this.convertAttribute(sourceAttribute, attributes));
        }
        const group = {
            description: source.description,
            configurable: source.configurable,
            complete: source.complete,
            consistent: source.consistent,
            groupType: this.convertGroupType(source.groupType),
            name: source.name,
            id: source.id,
            attributes: attributes,
            subGroups: [],
        };
        this.setGroupDescription(group);
        if (source.subGroups) {
            source.subGroups.forEach((sourceSubGroup) => this.convertGroup(sourceSubGroup, group.subGroups, flatGroupList));
        }
        if (group.groupType === Configurator.GroupType.ATTRIBUTE_GROUP ||
            group.groupType === Configurator.GroupType.CONFLICT_GROUP) {
            flatGroupList.push(group);
        }
        groupList.push(group);
    }
    getGroupId(key, name) {
        return key.replace('@' + name, '');
    }
    convertAttribute(sourceAttribute, attributeList) {
        const numberOfConflicts = sourceAttribute.conflicts
            ? sourceAttribute.conflicts.length
            : 0;
        const attributeImages = [];
        const attributeValues = [];
        if (sourceAttribute.images) {
            sourceAttribute.images.forEach((occImage) => this.convertImage(occImage, attributeImages));
        }
        this.addRetractValue(sourceAttribute, attributeValues);
        if (sourceAttribute.domainValues) {
            sourceAttribute.domainValues.forEach((value) => this.convertValue(value, attributeValues));
        }
        const uiType = this.convertAttributeType(sourceAttribute);
        const attribute = {
            name: sourceAttribute.name,
            label: sourceAttribute.langDepName,
            required: sourceAttribute.required,
            uiType: uiType,
            uiTypeVariation: sourceAttribute.type,
            groupId: this.getGroupId(sourceAttribute.key, sourceAttribute.name),
            userInput: uiType === Configurator.UiType.NUMERIC ||
                uiType === Configurator.UiType.STRING
                ? sourceAttribute.formattedValue
                    ? sourceAttribute.formattedValue
                    : ''
                : undefined,
            maxlength: (sourceAttribute.maxlength ?? 0) +
                (sourceAttribute.negativeAllowed ? 1 : 0),
            numDecimalPlaces: sourceAttribute.numberScale,
            negativeAllowed: sourceAttribute.negativeAllowed,
            numTotalLength: sourceAttribute.typeLength,
            selectedSingleValue: undefined,
            hasConflicts: numberOfConflicts > 0,
            images: attributeImages,
            values: attributeValues,
            intervalInDomain: sourceAttribute.intervalInDomain,
            key: sourceAttribute.key,
            validationType: sourceAttribute.validationType,
            visible: sourceAttribute.visible,
        };
        this.setSelectedSingleValue(attribute);
        //Has to be called after setSelectedSingleValue because it depends on the value of this property
        this.compileAttributeIncomplete(attribute);
        attributeList.push(attribute);
    }
    setSelectedSingleValue(attribute) {
        if (attribute.values) {
            const selectedValues = attribute.values
                .map((entry) => entry)
                .filter((entry) => entry.selected);
            if (selectedValues && selectedValues.length === 1) {
                attribute.selectedSingleValue = selectedValues[0].valueCode;
            }
        }
    }
    isRetractValueSelected(sourceAttribute) {
        return sourceAttribute.domainValues &&
            sourceAttribute.domainValues.filter((value) => value.selected).length
            ? false
            : true;
    }
    setRetractValueDisplay(attributeType, value) {
        if (attributeType === Configurator.UiType.DROPDOWN ||
            attributeType === Configurator.UiType.RADIOBUTTON) {
            if (attributeType === Configurator.UiType.DROPDOWN && value.selected) {
                this.translation
                    .translate('configurator.attribute.dropDownSelectMsg')
                    .pipe(take(1))
                    .subscribe((text) => (value.valueDisplay = text));
            }
            else {
                this.translation
                    .translate('configurator.attribute.noOptionSelectedMsg')
                    .pipe(take(1))
                    .subscribe((text) => (value.valueDisplay = text));
            }
        }
    }
    hasSourceAttributeConflicts(sourceAttribute) {
        return sourceAttribute.conflicts
            ? sourceAttribute.conflicts.length > 0
            : false;
    }
    isSourceAttributeTypeReadOnly(sourceAttribute) {
        return sourceAttribute.type === OccConfigurator.UiType.READ_ONLY;
    }
    isRetractBlocked(sourceAttribute) {
        return sourceAttribute.retractBlocked
            ? sourceAttribute.retractBlocked
            : false;
    }
    addRetractValue(sourceAttribute, values) {
        const isRetractBlocked = this.isRetractBlocked(sourceAttribute);
        const isConflicting = this.hasSourceAttributeConflicts(sourceAttribute);
        if (!isRetractBlocked) {
            if (this.uiSettingsConfig?.productConfigurator?.addRetractOption ||
                (this.isSourceAttributeTypeReadOnly(sourceAttribute) && isConflicting)) {
                const attributeType = this.convertAttributeType(sourceAttribute);
                if (attributeType === Configurator.UiType.RADIOBUTTON ||
                    attributeType === Configurator.UiType.DROPDOWN) {
                    const value = {
                        valueCode: Configurator.RetractValueCode,
                        selected: this.isRetractValueSelected(sourceAttribute),
                    };
                    this.setRetractValueDisplay(attributeType, value);
                    values.push(value);
                }
            }
        }
    }
    convertValue(occValue, values) {
        const valueImages = [];
        if (occValue.images) {
            occValue.images.forEach((occImage) => this.convertImage(occImage, valueImages));
        }
        const value = {
            valueCode: occValue.key,
            valueDisplay: occValue.langDepName,
            name: occValue.name,
            selected: occValue.selected,
            images: valueImages,
        };
        values.push(value);
    }
    convertImage(occImage, images) {
        const image = {
            /**
             * Traditionally, in an on-prem world, medias and other backend related calls
             * are hosted at the same platform, but in a cloud setup, applications are
             * typically distributed cross different environments. For media, we use the
             * `backend.media.baseUrl` by default, but fallback to `backend.occ.baseUrl`
             * if none provided.
             */
            url: (this.config?.backend?.media?.baseUrl ||
                this.config?.backend?.occ?.baseUrl ||
                '') + occImage.url,
            altText: occImage.altText,
            galleryIndex: occImage.galleryIndex,
            type: this.convertImageType(occImage.imageType),
            format: this.convertImageFormatType(occImage.format),
        };
        images.push(image);
    }
    convertAttributeType(sourceAttribute) {
        let uiType;
        const sourceType = sourceAttribute.type?.toString() ?? '';
        const coreSourceType = this.determineCoreUiType(sourceType);
        switch (coreSourceType) {
            case OccConfigurator.UiType.RADIO_BUTTON: {
                uiType = Configurator.UiType.RADIOBUTTON;
                break;
            }
            case OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT: {
                uiType = Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT;
                break;
            }
            case OccConfigurator.UiType.DROPDOWN: {
                uiType = Configurator.UiType.DROPDOWN;
                break;
            }
            case OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT: {
                uiType = Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
                break;
            }
            case OccConfigurator.UiType.STRING: {
                uiType = Configurator.UiType.STRING;
                break;
            }
            case OccConfigurator.UiType.NUMERIC: {
                uiType = Configurator.UiType.NUMERIC;
                break;
            }
            case OccConfigurator.UiType.READ_ONLY: {
                uiType =
                    !sourceAttribute.retractBlocked &&
                        this.hasSourceAttributeConflicts(sourceAttribute)
                        ? Configurator.UiType.RADIOBUTTON
                        : Configurator.UiType.READ_ONLY;
                break;
            }
            case OccConfigurator.UiType.CHECK_BOX_LIST: {
                uiType = Configurator.UiType.CHECKBOXLIST;
                break;
            }
            case OccConfigurator.UiType.CHECK_BOX: {
                uiType = Configurator.UiType.CHECKBOX;
                break;
            }
            case OccConfigurator.UiType.MULTI_SELECTION_IMAGE: {
                uiType = Configurator.UiType.MULTI_SELECTION_IMAGE;
                break;
            }
            case OccConfigurator.UiType.SINGLE_SELECTION_IMAGE: {
                uiType = Configurator.UiType.SINGLE_SELECTION_IMAGE;
                break;
            }
            default: {
                uiType = Configurator.UiType.NOT_IMPLEMENTED;
            }
        }
        return uiType;
    }
    determineCoreUiType(sourceType) {
        const indexCustomSeparator = sourceType.indexOf(Configurator.CustomUiTypeIndicator);
        return indexCustomSeparator > 0
            ? sourceType.substring(0, indexCustomSeparator)
            : sourceType;
    }
    convertGroupType(groupType) {
        switch (groupType) {
            case OccConfigurator.GroupType.CSTIC_GROUP:
                return Configurator.GroupType.ATTRIBUTE_GROUP;
            case OccConfigurator.GroupType.INSTANCE:
                return Configurator.GroupType.SUB_ITEM_GROUP;
            case OccConfigurator.GroupType.CONFLICT_HEADER:
                return Configurator.GroupType.CONFLICT_HEADER_GROUP;
            case OccConfigurator.GroupType.CONFLICT:
                return Configurator.GroupType.CONFLICT_GROUP;
        }
    }
    setGroupDescription(group) {
        switch (group.groupType) {
            case Configurator.GroupType.CONFLICT_HEADER_GROUP:
                this.translation
                    .translate('configurator.group.conflictHeader')
                    .pipe(take(1))
                    .subscribe((conflictHeaderText) => (group.description = conflictHeaderText));
                break;
            case Configurator.GroupType.CONFLICT_GROUP:
                const conflictDescription = group.description;
                this.translation
                    .translate('configurator.group.conflictGroup', {
                    attribute: group.name,
                })
                    .pipe(take(1))
                    .subscribe((conflictGroupText) => (group.description = conflictGroupText));
                group.name = conflictDescription;
                break;
            default:
                if (group.name !== '_GEN') {
                    return;
                }
                this.translation
                    .translate('configurator.group.general')
                    .pipe(take(1))
                    .subscribe((generalText) => (group.description = generalText));
        }
    }
    convertImageType(imageType) {
        switch (imageType) {
            case OccConfigurator.ImageType.GALLERY:
                return Configurator.ImageType.GALLERY;
            case OccConfigurator.ImageType.PRIMARY:
                return Configurator.ImageType.PRIMARY;
        }
    }
    convertImageFormatType(formatType) {
        switch (formatType) {
            case OccConfigurator.ImageFormatType.VALUE_IMAGE:
                return Configurator.ImageFormatType.VALUE_IMAGE;
            case OccConfigurator.ImageFormatType.CSTIC_IMAGE:
                return Configurator.ImageFormatType.ATTRIBUTE_IMAGE;
        }
    }
    compileAttributeIncomplete(attribute) {
        //Default value for incomplete is false
        attribute.incomplete = false;
        switch (attribute.uiType) {
            case Configurator.UiType.RADIOBUTTON:
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT:
            case Configurator.UiType.DROPDOWN: {
                if (!attribute.selectedSingleValue ||
                    attribute.selectedSingleValue === Configurator.RetractValueCode) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                if (!attribute.selectedSingleValue) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.NUMERIC:
            case Configurator.UiType.STRING: {
                if (!attribute.userInput) {
                    attribute.incomplete = true;
                }
                break;
            }
            case Configurator.UiType.CHECKBOXLIST:
            case Configurator.UiType.CHECKBOX:
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                const isOneValueSelected = attribute.values?.find((value) => value.selected) !== undefined;
                attribute.incomplete = !isOneValueSelected;
                break;
            }
        }
    }
}
/**
 * @deprecated since 6.2
 */
OccConfiguratorVariantNormalizer.RETRACT_VALUE_CODE = '###RETRACT_VALUE_CODE###';
OccConfiguratorVariantNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantNormalizer, deps: [{ token: i1$1.OccConfig }, { token: i1$1.TranslationService }, { token: ConfiguratorUISettingsConfig }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.OccConfig }, { type: i1$1.TranslationService }, { type: ConfiguratorUISettingsConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const VARIANT_CONFIGURATOR_NORMALIZER = new InjectionToken('VariantConfiguratorNormalizer');
const VARIANT_CONFIGURATOR_SERIALIZER = new InjectionToken('VariantConfiguratorSerializer');
const VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER = new InjectionToken('VariantConfiguratorPriceSummaryNormalizer');
const VARIANT_CONFIGURATOR_PRICE_NORMALIZER = new InjectionToken('VariantConfiguratorPriceNormalizer');
const VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER = new InjectionToken('VariantConfiguratorAddToCartSerializer');
const VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER = new InjectionToken('VariantConfiguratorUpdateCartEntrySerializer');
const VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER = new InjectionToken('VariantConfiguratorOverviewNormalizer');
const VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER = new InjectionToken('VariantConfiguratorOverviewSerializer');

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantOverviewNormalizer {
    constructor(translation, converterService) {
        this.translation = translation;
        this.converterService = converterService;
    }
    convert(source, target) {
        const prices = {
            priceSummary: source.pricing,
            configId: source.id,
        };
        const resultTarget = {
            ...target,
            configId: source.id,
            groups: source.groups?.flatMap((group) => this.convertGroup(group)),
            priceSummary: this.converterService.convert(prices, VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER),
            productCode: source.productCode,
        };
        this.setIssueCounters(resultTarget, source);
        return resultTarget;
    }
    convertGroup(source) {
        const result = [];
        const characteristicValues = source.characteristicValues;
        const subGroups = source.subGroups;
        const group = {
            id: source.id,
            groupDescription: source.groupDescription,
            attributes: characteristicValues
                ? characteristicValues.map((characteristic) => {
                    return {
                        attribute: characteristic.characteristic,
                        attributeId: characteristic.characteristicId,
                        value: characteristic.value,
                        valueId: characteristic.valueId,
                        valuePrice: characteristic.price,
                    };
                })
                : [],
        };
        this.setGeneralDescription(group);
        if (subGroups) {
            const resultSubGroups = [];
            subGroups.forEach((subGroup) => this.convertGroup(subGroup).forEach((groupArray) => resultSubGroups.push(groupArray)));
            group.subGroups = resultSubGroups;
        }
        result.push(group);
        return result;
    }
    setGeneralDescription(group) {
        if (group.id !== '_GEN') {
            return;
        }
        this.translation
            .translate('configurator.group.general')
            .pipe(take(1))
            .subscribe((generalText) => (group.groupDescription = generalText));
    }
    setIssueCounters(target, source) {
        target.totalNumberOfIssues = source.totalNumberOfIssues;
        target.numberOfConflicts = source.numberOfConflicts;
        target.numberOfIncompleteCharacteristics =
            source.numberOfIncompleteCharacteristics;
    }
}
OccConfiguratorVariantOverviewNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewNormalizer, deps: [{ token: i1$1.TranslationService }, { token: i1$1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantOverviewNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.TranslationService }, { type: i1$1.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantOverviewSerializer {
    constructor(converterService) {
        this.converterService = converterService;
    }
    convert(source, target) {
        return {
            ...target,
            id: source.configId,
            productCode: source.productCode,
            appliedCsticFilter: this.convertAttributeFilters(source.attributeFilters),
            groupFilterList: this.convertGroupFilters(source.groupFilters),
        };
    }
    convertAttributeFilters(attributeFilters) {
        const result = [];
        attributeFilters?.forEach((filter) => {
            result.push({ key: filter, selected: true });
        });
        return result;
    }
    convertGroupFilters(groupFilters) {
        const result = [];
        groupFilters?.forEach((filter) => {
            result.push({ key: filter, selected: true });
        });
        return result;
    }
}
OccConfiguratorVariantOverviewSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewSerializer, deps: [{ token: i1$1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantOverviewSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantOverviewSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$1.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantPriceSummaryNormalizer {
    convert(source, target) {
        const resultTarget = {
            ...target,
            ...source.priceSummary,
        };
        return resultTarget;
    }
}
OccConfiguratorVariantPriceSummaryNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceSummaryNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantPriceSummaryNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceSummaryNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceSummaryNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantSerializer {
    convert(source, target) {
        const resultGroups = [];
        source.groups.forEach((group) => this.convertGroup(group, resultGroups));
        const resultTarget = {
            ...target,
            configId: source.configId,
            rootProduct: source.productCode,
            complete: source.complete,
            groups: resultGroups,
        };
        return resultTarget;
    }
    convertGroup(source, occGroups) {
        const resultSubGroups = [];
        const resultAttributes = [];
        if (source.attributes) {
            source.attributes.forEach((attribute) => this.convertAttribute(attribute, resultAttributes));
        }
        if (source.subGroups) {
            source.subGroups.forEach((subGroup) => this.convertGroup(subGroup, resultSubGroups));
        }
        const group = {
            name: source.name,
            id: source.id,
            configurable: source.configurable,
            groupType: this.convertGroupType(source.groupType ?? Configurator.GroupType.ATTRIBUTE_GROUP),
            description: source.description,
            attributes: resultAttributes,
            subGroups: resultSubGroups,
        };
        occGroups.push(group);
    }
    isRetractValue(attribute) {
        return attribute.selectedSingleValue === Configurator.RetractValueCode;
    }
    getRetractedValue(attribute) {
        return attribute.values?.find((value) => value.selected)?.valueCode;
    }
    retractValue(attribute, targetAttribute) {
        if (!this.isRetractValue(attribute)) {
            targetAttribute.value = attribute.selectedSingleValue;
        }
        else {
            targetAttribute.value = this.getRetractedValue(attribute);
            targetAttribute.retractTriggered = true;
        }
    }
    convertAttribute(attribute, occAttributes) {
        const targetAttribute = {
            key: attribute.name,
            name: attribute.name,
            langDepName: attribute.label,
            required: attribute.required,
            retractTriggered: attribute.retractTriggered,
            type: this.convertCharacteristicType(attribute.uiType ?? Configurator.UiType.NOT_IMPLEMENTED),
        };
        if (attribute.uiType === Configurator.UiType.DROPDOWN ||
            attribute.uiType === Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT ||
            attribute.uiType === Configurator.UiType.RADIOBUTTON ||
            attribute.uiType === Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT ||
            attribute.uiType === Configurator.UiType.SINGLE_SELECTION_IMAGE) {
            this.retractValue(attribute, targetAttribute);
        }
        else if (attribute.uiType === Configurator.UiType.STRING) {
            targetAttribute.value = attribute.userInput;
        }
        else if (attribute.uiType === Configurator.UiType.NUMERIC) {
            targetAttribute.formattedValue = attribute.userInput;
        }
        else if (attribute.uiType === Configurator.UiType.CHECKBOXLIST ||
            attribute.uiType === Configurator.UiType.CHECKBOX ||
            attribute.uiType === Configurator.UiType.MULTI_SELECTION_IMAGE) {
            const domainValues = [];
            if (attribute.values) {
                attribute.values.forEach((value) => {
                    this.convertValue(value, domainValues);
                });
            }
            targetAttribute.domainValues = domainValues;
        }
        occAttributes.push(targetAttribute);
    }
    convertValue(value, values) {
        values.push({
            key: value.valueCode,
            langDepName: value.valueDisplay,
            name: value.name,
            selected: value.selected,
        });
    }
    convertCharacteristicType(type) {
        let uiType;
        switch (type) {
            case Configurator.UiType.RADIOBUTTON: {
                uiType = OccConfigurator.UiType.RADIO_BUTTON;
                break;
            }
            case Configurator.UiType.RADIOBUTTON_ADDITIONAL_INPUT: {
                uiType = OccConfigurator.UiType.RADIO_BUTTON_ADDITIONAL_INPUT;
                break;
            }
            case Configurator.UiType.DROPDOWN: {
                uiType = OccConfigurator.UiType.DROPDOWN;
                break;
            }
            case Configurator.UiType.DROPDOWN_ADDITIONAL_INPUT: {
                uiType = OccConfigurator.UiType.DROPDOWN_ADDITIONAL_INPUT;
                break;
            }
            case Configurator.UiType.STRING: {
                uiType = OccConfigurator.UiType.STRING;
                break;
            }
            case Configurator.UiType.NUMERIC: {
                uiType = OccConfigurator.UiType.NUMERIC;
                break;
            }
            case Configurator.UiType.CHECKBOX: {
                uiType = OccConfigurator.UiType.CHECK_BOX;
                break;
            }
            case Configurator.UiType.CHECKBOXLIST: {
                uiType = OccConfigurator.UiType.CHECK_BOX_LIST;
                break;
            }
            case Configurator.UiType.MULTI_SELECTION_IMAGE: {
                uiType = OccConfigurator.UiType.MULTI_SELECTION_IMAGE;
                break;
            }
            case Configurator.UiType.SINGLE_SELECTION_IMAGE: {
                uiType = OccConfigurator.UiType.SINGLE_SELECTION_IMAGE;
                break;
            }
            default: {
                uiType = OccConfigurator.UiType.NOT_IMPLEMENTED;
            }
        }
        return uiType;
    }
    convertGroupType(groupType) {
        switch (groupType) {
            case Configurator.GroupType.ATTRIBUTE_GROUP:
                return OccConfigurator.GroupType.CSTIC_GROUP;
            case Configurator.GroupType.SUB_ITEM_GROUP:
                return OccConfigurator.GroupType.INSTANCE;
            case Configurator.GroupType.CONFLICT_GROUP:
                return OccConfigurator.GroupType.CONFLICT;
            case Configurator.GroupType.CONFLICT_HEADER_GROUP:
                return OccConfigurator.GroupType.CONFLICT_HEADER;
        }
    }
}
/**
 * @deprecated since 6.2
 */
OccConfiguratorVariantSerializer.RETRACT_VALUE_CODE = '###RETRACT_VALUE_CODE###';
OccConfiguratorVariantSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantUpdateCartEntrySerializer {
    convert(source, target) {
        const resultTarget = {
            ...target,
            userId: source.userId,
            cartId: source.cartId,
            product: { code: source.configuration.productCode },
            entryNumber: source.cartEntryNumber,
            configId: source.configuration.configId,
            configurationInfos: [{ configuratorType: "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */ }],
        };
        return resultTarget;
    }
}
OccConfiguratorVariantUpdateCartEntrySerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantUpdateCartEntrySerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantUpdateCartEntrySerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantUpdateCartEntrySerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantUpdateCartEntrySerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VariantConfiguratorOccAdapter {
    constructor(http, occEndpointsService, converterService, configExpertModeService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
        this.configExpertModeService = configExpertModeService;
    }
    getConfiguratorType() {
        return "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */;
    }
    getExpModeRequested() {
        let expMode = false;
        this.configExpertModeService
            .getExpModeRequested()
            .pipe(take(1))
            .subscribe((mode) => (expMode = mode));
        return expMode;
    }
    setExpModeActive(expMode) {
        this.configExpertModeService.setExpModeActive(expMode);
    }
    createConfiguration(owner, configIdTemplate, forceReset = false) {
        const productCode = owner.id;
        const expMode = this.getExpModeRequested();
        return this.http
            .get(this.occEndpointsService.buildUrl('createVariantConfiguration', {
            urlParams: { productCode },
            queryParams: configIdTemplate
                ? { configIdTemplate, expMode, forceReset }
                : { expMode, forceReset },
        }), { context: this.indicateSendUserForAsm() })
            .pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER), tap((resultConfiguration) => {
            this.setExpModeActive(resultConfiguration.kbKey !== undefined);
        }), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: owner,
            };
        }));
    }
    readConfiguration(configId, groupId, configurationOwner) {
        const expMode = this.getExpModeRequested();
        return this.http
            .get(this.occEndpointsService.buildUrl('readVariantConfiguration', {
            urlParams: { configId },
            queryParams: { groupId, expMode },
        }), { context: this.indicateSendUserForAsm() })
            .pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER), tap((resultConfiguration) => {
            this.setExpModeActive(resultConfiguration.kbKey !== undefined);
        }), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: configurationOwner,
                newConfiguration: false,
            };
        }));
    }
    updateConfiguration(configuration) {
        const configId = configuration.configId;
        const expMode = this.getExpModeRequested();
        const url = this.occEndpointsService.buildUrl('updateVariantConfiguration', {
            urlParams: { configId },
            queryParams: { expMode },
        });
        const occConfiguration = this.converterService.convert(configuration, VARIANT_CONFIGURATOR_SERIALIZER);
        return this.http
            .patch(url, occConfiguration, {
            context: this.indicateSendUserForAsm(),
        })
            .pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER), tap((resultConfiguration) => {
            this.setExpModeActive(resultConfiguration.kbKey !== undefined);
        }), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: configuration.owner,
            };
        }));
    }
    addToCart(parameters) {
        const url = this.occEndpointsService.buildUrl('addVariantConfigurationToCart', { urlParams: { userId: parameters.userId, cartId: parameters.cartId } });
        const occAddToCartParameters = this.converterService.convert(parameters, VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http
            .post(url, occAddToCartParameters, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    readConfigurationForCartEntry(parameters) {
        const expMode = this.getExpModeRequested();
        const url = this.occEndpointsService.buildUrl('readVariantConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
            queryParams: { expMode },
        });
        return this.http.get(url).pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_NORMALIZER), tap((resultConfiguration) => {
            this.setExpModeActive(resultConfiguration.kbKey !== undefined);
        }), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: parameters.owner,
            };
        }));
    }
    updateConfigurationForCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('updateVariantConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        const occUpdateCartEntryParameters = this.converterService.convert(parameters, VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER);
        return this.http
            .put(url, occUpdateCartEntryParameters, { headers })
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    readConfigurationForOrderEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readVariantConfigurationOverviewForOrderEntry', {
            urlParams: {
                userId: parameters.userId,
                orderId: parameters.orderId,
                orderEntryNumber: parameters.orderEntryNumber,
            },
        });
        return this.http.get(url).pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER), map((overview) => {
            const configuration = {
                configId: overview.configId,
                productCode: overview.productCode,
                groups: [],
                flatGroups: [],
                interactionState: {},
                overview: overview,
                owner: ConfiguratorModelUtils.createInitialOwner(),
            };
            return configuration;
        }), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: parameters.owner,
            };
        }));
    }
    readPriceSummary(configuration) {
        const url = this.occEndpointsService.buildUrl('readVariantConfigurationPriceSummary', {
            urlParams: {
                configId: configuration.configId,
            },
            queryParams: { groupId: configuration.interactionState.currentGroup },
        });
        return this.http.get(url, { context: this.indicateSendUserForAsm() }).pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_PRICE_NORMALIZER), map((configResult) => {
            const result = {
                ...configuration,
                priceSummary: configResult.priceSummary,
                priceSupplements: configResult.priceSupplements,
            };
            return result;
        }));
    }
    getConfigurationOverview(configId) {
        const url = this.occEndpointsService.buildUrl('getVariantConfigurationOverview', { urlParams: { configId } });
        return this.http
            .get(url, {
            context: this.indicateSendUserForAsm(),
        })
            .pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER));
    }
    updateConfigurationOverview(ovInput) {
        const url = this.occEndpointsService.buildUrl('getVariantConfigurationOverview', { urlParams: { configId: ovInput.configId } });
        const occOverview = this.converterService.convert(ovInput, VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER);
        return this.http
            .patch(url, occOverview, {
            context: this.indicateSendUserForAsm(),
        })
            .pipe(this.converterService.pipeable(VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER), map((overview) => ({
            ...overview,
            attributeFilters: ovInput.attributeFilters,
            groupFilters: ovInput.groupFilters,
            possibleGroups: ovInput.possibleGroups,
        })));
    }
    searchVariants(configId) {
        const url = this.occEndpointsService.buildUrl('searchConfiguratorVariants', { urlParams: { configId } });
        //no need to work with a converter here, as Configurator.Variant is a projection of the OCC
        //variant representation
        return this.http.get(url, {
            context: this.indicateSendUserForAsm(),
        });
    }
    /**
     * Prepares http context indicating that emulated user has to be added to the request in ASM mode
     *
     * The actual calls to the commerce backend will only be changed if the ASM setting
     * userIdHttpHeader:{
     *  enable:true
     * },
     * is active
     * @returns http context indicating that emulated user has to be added to the request in ASM mode
     */
    indicateSendUserForAsm() {
        return new HttpContext().set(OCC_HTTP_TOKEN, {
            sendUserIdAsHeader: true,
        });
    }
}
VariantConfiguratorOccAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccAdapter, deps: [{ token: i1$3.HttpClient }, { token: i1$1.OccEndpointsService }, { token: i1$1.ConverterService }, { token: ConfiguratorExpertModeService }], target: i0.ɵɵFactoryTarget.Injectable });
VariantConfiguratorOccAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$3.HttpClient }, { type: i1$1.OccEndpointsService }, { type: i1$1.ConverterService }, { type: ConfiguratorExpertModeService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorVariantPriceNormalizer {
    convert(source, target) {
        const priceSupplements = [];
        source.attributes?.forEach((attr) => {
            this.convertAttributeSupplements(attr, priceSupplements);
        });
        //fine to build an incomplete configuratiom here,
        //as we later on only take over the pricing related aspects
        const resultTarget = {
            ...target,
            configId: source.configId,
            productCode: '',
            groups: [],
            flatGroups: [],
            owner: ConfiguratorModelUtils.createInitialOwner(),
            interactionState: {},
            priceSummary: source?.priceSummary,
            priceSupplements: priceSupplements,
        };
        return resultTarget;
    }
    convertAttributeSupplements(source, priceSupplements) {
        const attributeSupplement = {
            attributeUiKey: source?.csticUiKey,
            valueSupplements: [],
        };
        source?.priceSupplements?.forEach((value) => {
            this.convertValueSupplement(value, attributeSupplement?.valueSupplements);
        });
        priceSupplements.push(attributeSupplement);
    }
    convertValueSupplement(source, valueSupplements) {
        const valueSupplement = {
            attributeValueKey: source?.attributeValueKey,
            priceValue: source?.priceValue,
            obsoletePriceValue: source?.obsoletePriceValue,
        };
        valueSupplements.push(valueSupplement);
    }
}
OccConfiguratorVariantPriceNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorVariantPriceNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorVariantPriceNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultOccVariantConfiguratorConfigFactory() {
    return {
        backend: {
            occ: {
                endpoints: {
                    createVariantConfiguration: 'products/${productCode}/configurators/ccpconfigurator',
                    readVariantConfiguration: 'ccpconfigurator/${configId}',
                    updateVariantConfiguration: 'ccpconfigurator/${configId}',
                    addVariantConfigurationToCart: 'users/${userId}/carts/${cartId}/entries/ccpconfigurator',
                    readVariantConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',
                    updateVariantConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/ccpconfigurator',
                    readVariantConfigurationOverviewForOrderEntry: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/ccpconfigurator/configurationOverview',
                    readVariantConfigurationPriceSummary: 'ccpconfigurator/${configId}/pricing',
                    getVariantConfigurationOverview: 'ccpconfigurator/${configId}/configurationOverview',
                    searchConfiguratorVariants: 'ccpconfigurator/${configId}/variants',
                },
            },
        },
    };
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VariantConfiguratorOccModule {
}
VariantConfiguratorOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccModule, imports: [CommonModule, i1$1.ConfigModule] });
VariantConfiguratorOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccModule, providers: [
        {
            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
            useClass: VariantConfiguratorOccAdapter,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_NORMALIZER,
            useExisting: OccConfiguratorVariantNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_SERIALIZER,
            useExisting: OccConfiguratorVariantSerializer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
            useExisting: OccConfiguratorVariantPriceSummaryNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
            useExisting: OccConfiguratorVariantPriceNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
            useExisting: OccConfiguratorVariantAddToCartSerializer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
            useExisting: OccConfiguratorVariantUpdateCartEntrySerializer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
            useExisting: OccConfiguratorVariantOverviewNormalizer,
            multi: true,
        },
        {
            provide: VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER,
            useExisting: OccConfiguratorVariantOverviewSerializer,
            multi: true,
        },
    ], imports: [CommonModule,
        ConfigModule.withConfigFactory(defaultOccVariantConfiguratorConfigFactory)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfigModule.withConfigFactory(defaultOccVariantConfiguratorConfigFactory),
                    ],
                    providers: [
                        {
                            provide: RulebasedConfiguratorConnector.CONFIGURATOR_ADAPTER_LIST,
                            useClass: VariantConfiguratorOccAdapter,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_NORMALIZER,
                            useExisting: OccConfiguratorVariantNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_SERIALIZER,
                            useExisting: OccConfiguratorVariantSerializer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
                            useExisting: OccConfiguratorVariantPriceSummaryNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
                            useExisting: OccConfiguratorVariantPriceNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
                            useExisting: OccConfiguratorVariantAddToCartSerializer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
                            useExisting: OccConfiguratorVariantUpdateCartEntrySerializer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
                            useExisting: OccConfiguratorVariantOverviewNormalizer,
                            multi: true,
                        },
                        {
                            provide: VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER,
                            useExisting: OccConfiguratorVariantOverviewSerializer,
                            multi: true,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RulebasedConfiguratorModule {
}
RulebasedConfiguratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorModule, imports: [VariantConfiguratorOccModule,
        RulebasedConfiguratorCoreModule,
        RulebasedConfiguratorComponentsModule] });
RulebasedConfiguratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorModule, imports: [VariantConfiguratorOccModule,
        RulebasedConfiguratorCoreModule,
        RulebasedConfiguratorComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        VariantConfiguratorOccModule,
                        RulebasedConfiguratorCoreModule,
                        RulebasedConfiguratorComponentsModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { CONFIGURATOR_DATA, CONFIGURATOR_FEATURE, ConfigFormUpdateEvent, Configurator, configuratorGroup_actions as ConfiguratorActions, ConfiguratorAddToCartButtonComponent, ConfiguratorAddToCartButtonModule, ConfiguratorAttributeBaseComponent, ConfiguratorAttributeCheckBoxComponent, ConfiguratorAttributeCheckBoxListComponent, ConfiguratorAttributeCheckboxListModule, ConfiguratorAttributeCheckboxModule, ConfiguratorAttributeCompositionConfig, ConfiguratorAttributeCompositionContext, ConfiguratorAttributeCompositionDirective, ConfiguratorAttributeCompositionModule, ConfiguratorAttributeDropDownComponent, ConfiguratorAttributeDropDownModule, ConfiguratorAttributeFooterComponent, ConfiguratorAttributeFooterModule, ConfiguratorAttributeHeaderComponent, ConfiguratorAttributeHeaderModule, ConfiguratorAttributeInputFieldComponent, ConfiguratorAttributeInputFieldModule, ConfiguratorAttributeMultiSelectionBaseComponent, ConfiguratorAttributeMultiSelectionBundleComponent, ConfiguratorAttributeMultiSelectionBundleModule, ConfiguratorAttributeMultiSelectionImageComponent, ConfiguratorAttributeMultiSelectionImageModule, ConfiguratorAttributeNotSupportedComponent, ConfiguratorAttributeNotSupportedModule, ConfiguratorAttributeNumericInputFieldComponent, ConfiguratorAttributeNumericInputFieldModule, ConfiguratorAttributeNumericInputFieldService, ConfiguratorAttributeProductCardComponent, ConfiguratorAttributeProductCardModule, ConfiguratorAttributeQuantityComponent, ConfiguratorAttributeQuantityModule, ConfiguratorAttributeQuantityService, ConfiguratorAttributeRadioButtonComponent, ConfiguratorAttributeRadioButtonModule, ConfiguratorAttributeReadOnlyComponent, ConfiguratorAttributeReadOnlyModule, ConfiguratorAttributeSingleSelectionBaseComponent, ConfiguratorAttributeSingleSelectionBundleComponent, ConfiguratorAttributeSingleSelectionBundleDropdownComponent, ConfiguratorAttributeSingleSelectionBundleDropdownModule, ConfiguratorAttributeSingleSelectionBundleModule, ConfiguratorAttributeSingleSelectionImageComponent, ConfiguratorAttributeSingleSelectionImageModule, ConfiguratorBasicEffectService, ConfiguratorCartService, ConfiguratorCommonsService, ConfiguratorConflictAndErrorMessagesComponent, ConfiguratorConflictAndErrorMessagesModule, ConfiguratorConflictDescriptionComponent, ConfiguratorConflictDescriptionModule, ConfiguratorConflictSolverDialogComponent, ConfiguratorConflictSolverDialogLauncherService, ConfiguratorConflictSolverDialogModule, ConfiguratorConflictSuggestionComponent, ConfiguratorConflictSuggestionModule, ConfiguratorCoreConfig, ConfiguratorExitButtonComponent, ConfiguratorExitButtonModule, ConfiguratorExpertModeService, ConfiguratorFormComponent, ConfiguratorFormModule, ConfiguratorGroupComponent, ConfiguratorGroupMenuComponent, ConfiguratorGroupMenuModule, ConfiguratorGroupModule, ConfiguratorGroupStatusService, ConfiguratorGroupTitleComponent, ConfiguratorGroupTitleModule, ConfiguratorGroupsService, ConfiguratorLogoutEventListener, ConfiguratorMessageConfig, ConfiguratorOverviewAttributeComponent, ConfiguratorOverviewAttributeModule, ConfiguratorOverviewBundleAttributeComponent, ConfiguratorOverviewBundleAttributeModule, ConfiguratorOverviewFilterBarComponent, ConfiguratorOverviewFilterBarModule, ConfiguratorOverviewFilterButtonComponent, ConfiguratorOverviewFilterButtonModule, ConfiguratorOverviewFilterComponent, ConfiguratorOverviewFilterDialogComponent, ConfiguratorOverviewFilterDialogModule, ConfiguratorOverviewFilterModule, ConfiguratorOverviewFormComponent, ConfiguratorOverviewFormModule, ConfiguratorOverviewMenuComponent, ConfiguratorOverviewMenuModule, ConfiguratorOverviewNotificationBannerComponent, ConfiguratorOverviewNotificationBannerModule, ConfiguratorOverviewSidebarComponent, ConfiguratorOverviewSidebarModule, ConfiguratorPreviousNextButtonsComponent, ConfiguratorPreviousNextButtonsModule, ConfiguratorPriceComponent, ConfiguratorPriceModule, ConfiguratorPriceSummaryComponent, ConfiguratorPriceSummaryModule, ConfiguratorProductTitleComponent, ConfiguratorProductTitleModule, ConfiguratorQuantityService, ConfiguratorRestartDialogComponent, ConfiguratorRestartDialogModule, ConfiguratorRouterListener, ConfiguratorRouterModule, configuratorGroup_selectors as ConfiguratorSelectors, ConfiguratorShowMoreComponent, ConfiguratorShowMoreModule, ConfiguratorStorefrontUtilsService, ConfiguratorTabBarComponent, ConfiguratorTabBarModule, ConfiguratorUISettingsConfig, ConfiguratorUpdateMessageComponent, ConfiguratorUpdateMessageModule, ConfiguratorUtilsService, ConfiguratorVariantCarouselComponent, ConfiguratorVariantCarouselModule, OccConfigurator, OccConfiguratorVariantAddToCartSerializer, OccConfiguratorVariantNormalizer, OccConfiguratorVariantOverviewNormalizer, OccConfiguratorVariantOverviewSerializer, OccConfiguratorVariantPriceSummaryNormalizer, OccConfiguratorVariantSerializer, OccConfiguratorVariantUpdateCartEntrySerializer, RulebasedConfiguratorAdapter, RulebasedConfiguratorComponentsModule, RulebasedConfiguratorConnector, RulebasedConfiguratorCoreModule, RulebasedConfiguratorModule, VARIANT_CONFIGURATOR_ADD_TO_CART_SERIALIZER, VARIANT_CONFIGURATOR_NORMALIZER, VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER, VARIANT_CONFIGURATOR_OVERVIEW_SERIALIZER, VARIANT_CONFIGURATOR_PRICE_NORMALIZER, VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER, VARIANT_CONFIGURATOR_SERIALIZER, VARIANT_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER, VariantConfiguratorOccAdapter, VariantConfiguratorOccModule };
//# sourceMappingURL=spartacus-product-configurator-rulebased.mjs.map
