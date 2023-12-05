import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, Input, EventEmitter, Output, NgModule, inject, InjectionToken } from '@angular/core';
import * as i3 from '@spartacus/product-configurator/common';
import { ConfiguratorModelUtils, CommonConfigurator, ConfiguratorRouter } from '@spartacus/product-configurator/common';
import * as i1 from '@ngrx/store';
import { createFeatureSelector, createSelector, select, StoreModule } from '@ngrx/store';
import * as i2$1 from '@spartacus/core';
import { StateUtils, OCC_USER_ID_CURRENT, I18nModule, UrlModule, provideDefaultConfig, LoggerService, normalizeHttpError, StateModule, ConfigModule } from '@spartacus/core';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';
import * as i2 from '@spartacus/cart/base/root';
import { CART_MODIFICATION_NORMALIZER } from '@spartacus/cart/base/root';
import * as i2$2 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i3$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i1$1 from '@angular/forms';
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import * as i1$2 from '@ngrx/effects';
import { createEffect, ofType, EffectsModule } from '@ngrx/effects';
import { CartActions } from '@spartacus/cart/base/core';
import { of } from 'rxjs';
import * as i1$3 from '@angular/common/http';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var ConfiguratorTextfield;
(function (ConfiguratorTextfield) {
    /**
     * Textfield configuration status
     */
    let ConfigurationStatus;
    (function (ConfigurationStatus) {
        ConfigurationStatus["SUCCESS"] = "SUCCESS";
        ConfigurationStatus["ERROR"] = "ERROR";
    })(ConfigurationStatus = ConfiguratorTextfield.ConfigurationStatus || (ConfiguratorTextfield.ConfigurationStatus = {}));
})(ConfiguratorTextfield || (ConfiguratorTextfield = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CONFIGURATION_TEXTFIELD_FEATURE = 'productConfigurationTextfield';
const CONFIGURATION_TEXTFIELD_DATA = '[ConfiguratorTextfield] Configuration Data';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CREATE_CONFIGURATION = '[Configurator] Create Configuration Textfield';
const CREATE_CONFIGURATION_FAIL = '[Configurator] Create Configuration Textfield Fail';
const CREATE_CONFIGURATION_SUCCESS = '[Configurator] Create Configuration Textfield Success';
const UPDATE_CONFIGURATION = '[Configurator] Update Configuration Textfield';
const ADD_TO_CART = '[Configurator] Add to cart Textfield';
const ADD_TO_CART_FAIL = '[Configurator] Add to cart Textfield Fail';
const READ_CART_ENTRY_CONFIGURATION = '[Configurator] Read cart entry configuration Textfield';
const READ_CART_ENTRY_CONFIGURATION_FAIL = '[Configurator] Read cart entry configuration Textfield Fail';
const READ_CART_ENTRY_CONFIGURATION_SUCCESS = '[Configurator] Read cart entry configuration Textfield Success';
const READ_ORDER_ENTRY_CONFIGURATION = '[Configurator] Read order entry configuration textfield';
const READ_ORDER_ENTRY_CONFIGURATION_FAIL = '[Configurator] Read order entry configuration textfield Fail';
const READ_ORDER_ENTRY_CONFIGURATION_SUCCESS = '[Configurator] Read order entry configuration textfield Success';
const UPDATE_CART_ENTRY_CONFIGURATION = '[Configurator] Update cart entry configuration Textfield';
const UPDATE_CART_ENTRY_CONFIGURATION_FAIL = '[Configurator] Update cart entry configuration Textfield Fail';
const REMOVE_CONFIGURATION = '[Configurator] Remove Configuration Textfield';
class CreateConfiguration extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.payload = payload;
        this.type = CREATE_CONFIGURATION;
    }
}
class CreateConfigurationFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA, payload);
        this.payload = payload;
        this.type = CREATE_CONFIGURATION_FAIL;
    }
}
class CreateConfigurationSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.payload = payload;
        this.type = CREATE_CONFIGURATION_SUCCESS;
    }
}
class UpdateConfiguration extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.payload = payload;
        this.type = UPDATE_CONFIGURATION;
    }
}
class AddToCart extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.payload = payload;
        this.type = ADD_TO_CART;
    }
}
class AddToCartFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA, payload);
        this.payload = payload;
        this.type = ADD_TO_CART_FAIL;
    }
}
class UpdateCartEntryConfiguration extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.payload = payload;
        this.type = UPDATE_CART_ENTRY_CONFIGURATION;
    }
}
class UpdateCartEntryConfigurationFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA, payload);
        this.payload = payload;
        this.type = UPDATE_CART_ENTRY_CONFIGURATION_FAIL;
    }
}
class ReadCartEntryConfiguration extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.payload = payload;
        this.type = READ_CART_ENTRY_CONFIGURATION;
    }
}
class ReadCartEntryConfigurationSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.payload = payload;
        this.type = READ_CART_ENTRY_CONFIGURATION_SUCCESS;
    }
}
class ReadCartEntryConfigurationFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA, payload);
        this.payload = payload;
        this.type = READ_CART_ENTRY_CONFIGURATION_FAIL;
    }
}
class ReadOrderEntryConfiguration extends StateUtils.LoaderLoadAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.payload = payload;
        this.type = READ_ORDER_ENTRY_CONFIGURATION;
    }
}
class ReadOrderEntryConfigurationSuccess extends StateUtils.LoaderSuccessAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.payload = payload;
        this.type = READ_ORDER_ENTRY_CONFIGURATION_SUCCESS;
    }
}
class ReadOrderEntryConfigurationFail extends StateUtils.LoaderFailAction {
    constructor(payload) {
        super(CONFIGURATION_TEXTFIELD_DATA, payload);
        this.payload = payload;
        this.type = READ_ORDER_ENTRY_CONFIGURATION_FAIL;
    }
}
class RemoveConfiguration extends StateUtils.LoaderResetAction {
    constructor() {
        super(CONFIGURATION_TEXTFIELD_DATA);
        this.type = REMOVE_CONFIGURATION;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var configuratorTextfieldGroup_actions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ADD_TO_CART: ADD_TO_CART,
    ADD_TO_CART_FAIL: ADD_TO_CART_FAIL,
    AddToCart: AddToCart,
    AddToCartFail: AddToCartFail,
    CREATE_CONFIGURATION: CREATE_CONFIGURATION,
    CREATE_CONFIGURATION_FAIL: CREATE_CONFIGURATION_FAIL,
    CREATE_CONFIGURATION_SUCCESS: CREATE_CONFIGURATION_SUCCESS,
    CreateConfiguration: CreateConfiguration,
    CreateConfigurationFail: CreateConfigurationFail,
    CreateConfigurationSuccess: CreateConfigurationSuccess,
    READ_CART_ENTRY_CONFIGURATION: READ_CART_ENTRY_CONFIGURATION,
    READ_CART_ENTRY_CONFIGURATION_FAIL: READ_CART_ENTRY_CONFIGURATION_FAIL,
    READ_CART_ENTRY_CONFIGURATION_SUCCESS: READ_CART_ENTRY_CONFIGURATION_SUCCESS,
    READ_ORDER_ENTRY_CONFIGURATION: READ_ORDER_ENTRY_CONFIGURATION,
    READ_ORDER_ENTRY_CONFIGURATION_FAIL: READ_ORDER_ENTRY_CONFIGURATION_FAIL,
    READ_ORDER_ENTRY_CONFIGURATION_SUCCESS: READ_ORDER_ENTRY_CONFIGURATION_SUCCESS,
    REMOVE_CONFIGURATION: REMOVE_CONFIGURATION,
    ReadCartEntryConfiguration: ReadCartEntryConfiguration,
    ReadCartEntryConfigurationFail: ReadCartEntryConfigurationFail,
    ReadCartEntryConfigurationSuccess: ReadCartEntryConfigurationSuccess,
    ReadOrderEntryConfiguration: ReadOrderEntryConfiguration,
    ReadOrderEntryConfigurationFail: ReadOrderEntryConfigurationFail,
    ReadOrderEntryConfigurationSuccess: ReadOrderEntryConfigurationSuccess,
    RemoveConfiguration: RemoveConfiguration,
    UPDATE_CART_ENTRY_CONFIGURATION: UPDATE_CART_ENTRY_CONFIGURATION,
    UPDATE_CART_ENTRY_CONFIGURATION_FAIL: UPDATE_CART_ENTRY_CONFIGURATION_FAIL,
    UPDATE_CONFIGURATION: UPDATE_CONFIGURATION,
    UpdateCartEntryConfiguration: UpdateCartEntryConfiguration,
    UpdateCartEntryConfigurationFail: UpdateCartEntryConfigurationFail,
    UpdateConfiguration: UpdateConfiguration
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
const getConfigurationContentSelector = (state) => state.loaderState.value;
const getConfigurationsState = createFeatureSelector(CONFIGURATION_TEXTFIELD_FEATURE);
const getConfigurationContent = createSelector(getConfigurationsState, getConfigurationContentSelector);

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

var configuratorTextfieldGroup_selectors = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getConfigurationContent: getConfigurationContent,
    getConfigurationsState: getConfigurationsState
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
class ConfiguratorTextfieldService {
    constructor(store, activeCartService, configuratorUtils, userIdService) {
        this.store = store;
        this.activeCartService = activeCartService;
        this.configuratorUtils = configuratorUtils;
        this.userIdService = userIdService;
        this.ensureConfigurationDefined = (configuration) => configuration ?? {
            configurationInfos: [],
            owner: ConfiguratorModelUtils.createInitialOwner(),
        };
    }
    /**
     * Creates a default textfield configuration for a product specified by the configuration owner.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    createConfiguration(owner) {
        return this.store.pipe(select(getConfigurationsState), tap((configurationState) => {
            const configuration = configurationState.loaderState.value;
            const isAvailableForProduct = configuration !== undefined &&
                !ConfiguratorModelUtils.isInitialOwner(configuration.owner);
            const isLoading = configurationState.loaderState.loading;
            if (!isAvailableForProduct && !isLoading) {
                this.store.dispatch(new CreateConfiguration({
                    productCode: owner.id,
                    owner: owner,
                }));
            }
        }), map((configurationState) => configurationState.loaderState.value), filter((configuration) => !this.isConfigurationInitial(configuration)), 
        //save to assume configuration is defined, see previous filter
        map(this.ensureConfigurationDefined));
    }
    /**
     * Updates a textfield configuration, specified by the changed attribute.
     *
     * @param changedAttribute - Changed attribute
     */
    updateConfiguration(changedAttribute) {
        this.store
            .pipe(select(getConfigurationContent), take(1))
            .subscribe((oldConfiguration) => {
            if (oldConfiguration) {
                this.store.dispatch(new UpdateConfiguration(this.createNewConfigurationWithChange(changedAttribute, oldConfiguration)));
            }
        });
    }
    /**
     * Adds the textfield configuration to the cart
     *
     * @param productCode - Product code of the configuration root product. Cart entry carries refers to this product
     * @param configuration Textfield configuration
     */
    addToCart(productCode, configuration) {
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
                    cartId: this.configuratorUtils.getCartId(cart),
                    productCode: productCode,
                    configuration: configuration,
                    quantity: 1,
                };
                this.store.dispatch(new AddToCart(addToCartParameters));
            });
        });
    }
    /**
     * Updates a cart entry, specified by its cart entry number.
     *
     * @param cartEntryNumber - Cart entry number
     * @param configuration Textfield configuration (list of alphanumeric attributes)
     */
    updateCartEntry(cartEntryNumber, configuration) {
        this.activeCartService
            .requireLoadedCart()
            .pipe(take(1))
            .subscribe((cart) => {
            this.userIdService
                .getUserId()
                .pipe(take(1))
                .subscribe((userId) => {
                const updateCartParameters = {
                    userId: userId,
                    cartId: this.configuratorUtils.getCartId(cart),
                    cartEntryNumber: cartEntryNumber,
                    configuration: configuration,
                };
                this.store.dispatch(new UpdateCartEntryConfiguration(updateCartParameters));
            });
        });
    }
    /**
     * Returns a textfield configuration for a cart entry.
     *
     * @param owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    readConfigurationForCartEntry(owner) {
        return this.activeCartService.requireLoadedCart().pipe(switchMap((cart) => this.userIdService
            .getUserId()
            .pipe(take(1), map((userId) => ({ cart, userId: userId })))
            .pipe(map((cont) => ({
            userId: cont.userId,
            cartId: this.configuratorUtils.getCartId(cont.cart),
            cartEntryNumber: owner.id,
            owner: owner,
        })), tap((readFromCartEntryParameters) => this.store.dispatch(new ReadCartEntryConfiguration(readFromCartEntryParameters))), switchMap(() => this.store.pipe(select(getConfigurationContent))), filter((configuration) => !this.isConfigurationInitial(configuration)), 
        //save to assume that the configuration exists, see previous filter
        map(this.ensureConfigurationDefined))));
    }
    /**
     * Returns the textfield configuration attached to an order entry.
     *
     * @param {CommonConfigurator.Owner} owner - Configuration owner
     *
     * @returns {Observable<ConfiguratorTextfield.Configuration>}
     */
    readConfigurationForOrderEntry(owner) {
        const ownerIdParts = this.configuratorUtils.decomposeOwnerId(owner.id);
        const readFromOrderEntryParameters = {
            userId: OCC_USER_ID_CURRENT,
            orderId: ownerIdParts.documentId,
            orderEntryNumber: ownerIdParts.entryNumber,
            owner: owner,
        };
        this.store.dispatch(new ReadOrderEntryConfiguration(readFromOrderEntryParameters));
        return this.store.pipe(select(getConfigurationContent), filter((configuration) => !this.isConfigurationInitial(configuration)), map(this.ensureConfigurationDefined));
    }
    /**
     * Creates a textfield configuration supposed to be sent to the backend when an attribute
     * has been changed
     * @param changedAttribute Attribute changed by the end user
     * @param oldConfiguration Existing configuration to which the attribute change is applied to
     * @returns Textfield configuration (merge of existing configuration and the changed attribute)
     */
    createNewConfigurationWithChange(changedAttribute, oldConfiguration) {
        const newConfiguration = {
            configurationInfos: [],
            owner: oldConfiguration.owner,
        };
        oldConfiguration.configurationInfos.forEach((info) => {
            if (info.configurationLabel === changedAttribute.configurationLabel) {
                changedAttribute.status =
                    ConfiguratorTextfield.ConfigurationStatus.SUCCESS;
                newConfiguration.configurationInfos.push(changedAttribute);
            }
            else {
                newConfiguration.configurationInfos.push(info);
            }
        });
        return newConfiguration;
    }
    isConfigurationInitial(configuration) {
        return (configuration === undefined ||
            ConfiguratorModelUtils.isInitialOwner(configuration.owner));
    }
}
ConfiguratorTextfieldService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldService, deps: [{ token: i1.Store }, { token: i2.ActiveCartFacade }, { token: i3.CommonConfiguratorUtilsService }, { token: i2$1.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorTextfieldService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.ActiveCartFacade }, { type: i3.CommonConfiguratorUtilsService }, { type: i2$1.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTextfieldAddToCartButtonComponent {
    constructor(configuratorTextfieldService) {
        this.configuratorTextfieldService = configuratorTextfieldService;
    }
    /**
     * Adds the textfield configuration to the cart or updates it
     */
    onAddToCart() {
        const owner = this.configuration.owner;
        switch (owner.type) {
            case CommonConfigurator.OwnerType.PRODUCT:
                this.configuratorTextfieldService.addToCart(owner.id, this.configuration);
                break;
            case CommonConfigurator.OwnerType.CART_ENTRY:
                this.configuratorTextfieldService.updateCartEntry(owner.id, this.configuration);
                break;
        }
    }
    /**
     * Returns button description. Button will display 'addToCart' or 'done' in case configuration indicates that owner is a cart entry
     * @returns Resource key of button description
     */
    getButtonText() {
        return this.configuration.owner.type ===
            CommonConfigurator.OwnerType.CART_ENTRY
            ? 'configurator.addToCart.buttonUpdateCart'
            : 'configurator.addToCart.button';
    }
}
ConfiguratorTextfieldAddToCartButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldAddToCartButtonComponent, deps: [{ token: ConfiguratorTextfieldService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorTextfieldAddToCartButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorTextfieldAddToCartButtonComponent, selector: "cx-configurator-textfield-add-to-cart-button", inputs: { configuration: "configuration", productCode: "productCode" }, ngImport: i0, template: "<button\n  class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n  [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n  (click)=\"onAddToCart()\"\n>\n  {{ getButtonText() | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i2$2.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2$1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldAddToCartButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-textfield-add-to-cart-button', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"cx-btn btn btn-block btn-primary cx-add-to-cart-btn\"\n  [routerLink]=\"{ cxRoute: 'cart' } | cxUrl\"\n  (click)=\"onAddToCart()\"\n>\n  {{ getButtonText() | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorTextfieldService }]; }, propDecorators: { configuration: [{
                type: Input
            }], productCode: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTextfieldInputFieldComponent {
    constructor() {
        this.PREFIX_TEXTFIELD = 'cx-configurator-textfield';
        this.attributeInputForm = new UntypedFormControl('');
        this.inputChange = new EventEmitter();
        // Intentional empty constructor
    }
    ngOnInit() {
        this.attributeInputForm.setValue(this.attribute.configurationValue);
    }
    /**
     * Triggered if an attribute value is changed. Triggers the emission of the inputChange event emitter that is
     * in turn received in the form component
     */
    onInputChange() {
        const attribute = {
            configurationLabel: this.attribute.configurationLabel,
            configurationValue: this.attributeInputForm.value,
        };
        this.inputChange.emit(attribute);
    }
    /**
     * Compiles an ID for the attribute label by using the label from the backend and a prefix 'label'
     * @param attribute Textfield configurator attribute. Carries the attribute label information from the backend
     * @returns ID
     */
    getIdLabel(attribute) {
        return (this.PREFIX_TEXTFIELD + 'label' + this.getLabelForIdGeneration(attribute));
    }
    /**
     * Compiles an ID for the attribute value by using the label from the backend
     * @param attribute Textfield configurator attribute. Carries the attribute label information from the backend
     * @returns ID
     */
    getId(attribute) {
        return this.PREFIX_TEXTFIELD + this.getLabelForIdGeneration(attribute);
    }
    getLabelForIdGeneration(attribute) {
        //replace white spaces with an empty string
        return attribute.configurationLabel.replace(/\s/g, '');
    }
}
ConfiguratorTextfieldInputFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldInputFieldComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorTextfieldInputFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorTextfieldInputFieldComponent, selector: "cx-configurator-textfield-input-field", inputs: { attribute: "attribute" }, outputs: { inputChange: "inputChange" }, ngImport: i0, template: "<label\n  id=\"{{ getIdLabel(attribute) }}\"\n  class=\"cx-configurator-textfield-label\"\n  [attr.aria-label]=\"'configurator.a11y.nameOfAttribute' | cxTranslate\"\n  >{{ attribute.configurationLabel }}</label\n>\n<div class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    class=\"form-control\"\n    (change)=\"onInputChange()\"\n    [attr.aria-label]=\"\n      'configurator.a11y.valueOfAttributeFull'\n        | cxTranslate\n          : {\n              value: attribute.configurationValue,\n              attribute: attribute.configurationLabel\n            }\n    \"\n  />\n</div>\n", dependencies: [{ kind: "directive", type: i1$1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1$1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1$1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldInputFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-textfield-input-field', changeDetection: ChangeDetectionStrategy.OnPush, template: "<label\n  id=\"{{ getIdLabel(attribute) }}\"\n  class=\"cx-configurator-textfield-label\"\n  [attr.aria-label]=\"'configurator.a11y.nameOfAttribute' | cxTranslate\"\n  >{{ attribute.configurationLabel }}</label\n>\n<div class=\"form-group\">\n  <input\n    [formControl]=\"attributeInputForm\"\n    class=\"form-control\"\n    (change)=\"onInputChange()\"\n    [attr.aria-label]=\"\n      'configurator.a11y.valueOfAttributeFull'\n        | cxTranslate\n          : {\n              value: attribute.configurationValue,\n              attribute: attribute.configurationLabel\n            }\n    \"\n  />\n</div>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { attribute: [{
                type: Input
            }], inputChange: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTextfieldInputFieldReadonlyComponent {
    constructor() {
        this.PREFIX_TEXTFIELD = 'cx-configurator-textfield';
    }
    /**
     * Compiles an ID for the attribute label by using the label from the backend and a prefix 'label'
     * @param {ConfiguratorTextfield.ConfigurationInfo} attribute Textfield configurator attribute. Carries the attribute label information from the backend
     * @returns {string} ID
     */
    getIdLabel(attribute) {
        return (this.PREFIX_TEXTFIELD + 'label' + this.getLabelForIdGeneration(attribute));
    }
    getLabelForIdGeneration(attribute) {
        //replace white spaces with an empty string
        return attribute.configurationLabel.replace(/\s/g, '');
    }
}
ConfiguratorTextfieldInputFieldReadonlyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldInputFieldReadonlyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorTextfieldInputFieldReadonlyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorTextfieldInputFieldReadonlyComponent, selector: "cx-configurator-textfield-input-field-readonly", inputs: { attribute: "attribute" }, ngImport: i0, template: "<span id=\"{{ getIdLabel(attribute) }}\" class=\"cx-visually-hidden\">\n  {{\n    'configurator.a11y.valueOfAttributeFull'\n      | cxTranslate\n        : {\n            value: attribute.configurationValue,\n            attribute: attribute.configurationLabel\n          }\n  }}\n</span>\n<label aria-hidden=\"true\" attr.aria-describedby=\"{{ getIdLabel(attribute) }}\">{{\n  attribute.configurationLabel\n}}</label>\n<div aria-hidden=\"true\">\n  {{ attribute.configurationValue }}\n</div>\n", dependencies: [{ kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldInputFieldReadonlyComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-textfield-input-field-readonly', changeDetection: ChangeDetectionStrategy.OnPush, template: "<span id=\"{{ getIdLabel(attribute) }}\" class=\"cx-visually-hidden\">\n  {{\n    'configurator.a11y.valueOfAttributeFull'\n      | cxTranslate\n        : {\n            value: attribute.configurationValue,\n            attribute: attribute.configurationLabel\n          }\n  }}\n</span>\n<label aria-hidden=\"true\" attr.aria-describedby=\"{{ getIdLabel(attribute) }}\">{{\n  attribute.configurationLabel\n}}</label>\n<div aria-hidden=\"true\">\n  {{ attribute.configurationValue }}\n</div>\n" }]
        }], propDecorators: { attribute: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTextfieldFormComponent {
    constructor(configuratorTextfieldService, configRouterExtractorService) {
        this.configuratorTextfieldService = configuratorTextfieldService;
        this.configRouterExtractorService = configRouterExtractorService;
        this.configuration$ = this.configRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => {
            switch (routerData.owner.type) {
                case CommonConfigurator.OwnerType.PRODUCT:
                    return this.configuratorTextfieldService.createConfiguration(routerData.owner);
                case CommonConfigurator.OwnerType.CART_ENTRY:
                    return this.configuratorTextfieldService.readConfigurationForCartEntry(routerData.owner);
                case CommonConfigurator.OwnerType.ORDER_ENTRY:
                    return this.configuratorTextfieldService.readConfigurationForOrderEntry(routerData.owner);
            }
        }));
        this.isEditable$ = this.configRouterExtractorService
            .extractRouterData()
            .pipe(map((routerData) => routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION));
    }
    /**
     * Updates a configuration attribute
     * @param attribute - Configuration attribute, always containing a string typed value
     */
    updateConfiguration(attribute) {
        this.configuratorTextfieldService.updateConfiguration(attribute);
    }
}
ConfiguratorTextfieldFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldFormComponent, deps: [{ token: ConfiguratorTextfieldService }, { token: i3.ConfiguratorRouterExtractorService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorTextfieldFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorTextfieldFormComponent, selector: "cx-configurator-textfield-form", ngImport: i0, template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"isEditable$ | async as isEditable; else readonly\">\n    <span class=\"cx-visually-hidden\">\n      {{ 'configurator.a11y.editAttributesAndValues' | cxTranslate }}\n    </span>\n    <div\n      class=\"cx-attribute\"\n      *ngFor=\"let attribute of configuration.configurationInfos\"\n    >\n      <cx-configurator-textfield-input-field\n        [attribute]=\"attribute\"\n        (inputChange)=\"updateConfiguration($event)\"\n      ></cx-configurator-textfield-input-field>\n    </div>\n\n    <cx-configurator-textfield-add-to-cart-button\n      [configuration]=\"configuration\"\n    ></cx-configurator-textfield-add-to-cart-button>\n  </ng-container>\n  <ng-template #readonly>\n    <span class=\"cx-visually-hidden\">\n      {{ 'configurator.a11y.listOfAttributesAndValues' | cxTranslate }}\n    </span>\n    <div\n      class=\"cx-attribute\"\n      *ngFor=\"let attribute of configuration.configurationInfos\"\n    >\n      <cx-configurator-textfield-input-field-readonly\n        [attribute]=\"attribute\"\n      ></cx-configurator-textfield-input-field-readonly>\n    </div>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfiguratorTextfieldInputFieldComponent, selector: "cx-configurator-textfield-input-field", inputs: ["attribute"], outputs: ["inputChange"] }, { kind: "component", type: ConfiguratorTextfieldInputFieldReadonlyComponent, selector: "cx-configurator-textfield-input-field-readonly", inputs: ["attribute"] }, { kind: "component", type: ConfiguratorTextfieldAddToCartButtonComponent, selector: "cx-configurator-textfield-add-to-cart-button", inputs: ["configuration", "productCode"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i2$1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-textfield-form', template: "<ng-container *ngIf=\"configuration$ | async as configuration\">\n  <ng-container *ngIf=\"isEditable$ | async as isEditable; else readonly\">\n    <span class=\"cx-visually-hidden\">\n      {{ 'configurator.a11y.editAttributesAndValues' | cxTranslate }}\n    </span>\n    <div\n      class=\"cx-attribute\"\n      *ngFor=\"let attribute of configuration.configurationInfos\"\n    >\n      <cx-configurator-textfield-input-field\n        [attribute]=\"attribute\"\n        (inputChange)=\"updateConfiguration($event)\"\n      ></cx-configurator-textfield-input-field>\n    </div>\n\n    <cx-configurator-textfield-add-to-cart-button\n      [configuration]=\"configuration\"\n    ></cx-configurator-textfield-add-to-cart-button>\n  </ng-container>\n  <ng-template #readonly>\n    <span class=\"cx-visually-hidden\">\n      {{ 'configurator.a11y.listOfAttributesAndValues' | cxTranslate }}\n    </span>\n    <div\n      class=\"cx-attribute\"\n      *ngFor=\"let attribute of configuration.configurationInfos\"\n    >\n      <cx-configurator-textfield-input-field-readonly\n        [attribute]=\"attribute\"\n      ></cx-configurator-textfield-input-field-readonly>\n    </div>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ConfiguratorTextfieldService }, { type: i3.ConfiguratorRouterExtractorService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class TextfieldConfiguratorComponentsModule {
}
TextfieldConfiguratorComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorComponentsModule, declarations: [ConfiguratorTextfieldFormComponent,
        ConfiguratorTextfieldInputFieldComponent,
        ConfiguratorTextfieldInputFieldReadonlyComponent,
        ConfiguratorTextfieldAddToCartButtonComponent], imports: [RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        UrlModule], exports: [ConfiguratorTextfieldFormComponent,
        ConfiguratorTextfieldInputFieldComponent,
        ConfiguratorTextfieldInputFieldReadonlyComponent,
        ConfiguratorTextfieldAddToCartButtonComponent] });
TextfieldConfiguratorComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                TextfieldConfigurationForm: {
                    component: ConfiguratorTextfieldFormComponent,
                },
            },
        }),
    ], imports: [RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CommonModule,
        I18nModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule,
                        FormsModule,
                        ReactiveFormsModule,
                        NgSelectModule,
                        CommonModule,
                        I18nModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                TextfieldConfigurationForm: {
                                    component: ConfiguratorTextfieldFormComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [
                        ConfiguratorTextfieldFormComponent,
                        ConfiguratorTextfieldInputFieldComponent,
                        ConfiguratorTextfieldInputFieldReadonlyComponent,
                        ConfiguratorTextfieldAddToCartButtonComponent,
                    ],
                    exports: [
                        ConfiguratorTextfieldFormComponent,
                        ConfiguratorTextfieldInputFieldComponent,
                        ConfiguratorTextfieldInputFieldReadonlyComponent,
                        ConfiguratorTextfieldAddToCartButtonComponent,
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
class ConfiguratorTextfieldAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTextfieldConnector {
    constructor(adapter) {
        this.adapter = adapter;
    }
    /**
     * Creates default configuration for a product that is textfield-configurable
     * @param productCode Product code
     * @param owner Owner of the configuration
     * @returns Observable of product configurations
     */
    createConfiguration(productCode, owner) {
        return this.adapter.createConfiguration(productCode, owner);
    }
    /**
     * Reads an existing configuration for a cart entry
     * @param parameters Attributes needed to read a product configuration for a cart entry
     * @returns Observable of product configurations
     */
    readConfigurationForCartEntry(parameters) {
        return this.adapter.readConfigurationForCartEntry(parameters);
    }
    /**
     * Reads an existing configuration for an order entry
     * @param {CommonConfigurator.ReadConfigurationFromOrderEntryParameters} parameters Attributes needed to read a product configuration for an order entry
     * @returns {Observable<ConfiguratorTextfield.Configuration>} Observable of product configurations
     */
    readConfigurationForOrderEntry(parameters) {
        return this.adapter.readConfigurationForOrderEntry(parameters);
    }
    /**
     * Updates a configuration that is attached to a cart entry
     * @param parameters Attributes needed to update a cart entries' configuration
     * @returns Observable of cart modifications
     */
    updateConfigurationForCartEntry(parameters) {
        return this.adapter.updateConfigurationForCartEntry(parameters);
    }
    /**
     * Adds a textfield-configurable product to the cart, and passes along its configuration
     * @param parameters Attributes needed to add a textfield product along with its configuration to the cart
     * @returns Observable of cart modifications
     */
    addToCart(parameters) {
        return this.adapter.addToCart(parameters);
    }
}
ConfiguratorTextfieldConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldConnector, deps: [{ token: ConfiguratorTextfieldAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorTextfieldConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldConnector });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldConnector, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: ConfiguratorTextfieldAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTextfieldEffects {
    constructor(actions$, configuratorTextfieldConnector) {
        this.actions$ = actions$;
        this.configuratorTextfieldConnector = configuratorTextfieldConnector;
        this.logger = inject(LoggerService);
        this.createConfiguration$ = createEffect(() => this.actions$.pipe(ofType(CREATE_CONFIGURATION), map((action) => action.payload), switchMap((payload) => {
            return this.configuratorTextfieldConnector
                .createConfiguration(payload.productCode, payload.owner)
                .pipe(switchMap((configuration) => {
                return [
                    new CreateConfigurationSuccess(configuration),
                ];
            }), catchError((error) => of(new CreateConfigurationFail(normalizeHttpError(error, this.logger)))));
        })));
        this.addToCart$ = createEffect(() => this.actions$.pipe(ofType(ADD_TO_CART), map((action) => action.payload), switchMap((payload) => {
            return this.configuratorTextfieldConnector.addToCart(payload).pipe(switchMap(() => {
                return [
                    new RemoveConfiguration(),
                    new CartActions.LoadCart({
                        cartId: payload.cartId,
                        userId: payload.userId,
                    }),
                ];
            }), catchError((error) => of(new AddToCartFail(normalizeHttpError(error, this.logger)))));
        })));
        this.updateCartEntry$ = createEffect(() => this.actions$.pipe(ofType(UPDATE_CART_ENTRY_CONFIGURATION), map((action) => action.payload), switchMap((payload) => {
            return this.configuratorTextfieldConnector
                .updateConfigurationForCartEntry(payload)
                .pipe(switchMap(() => {
                return [
                    new RemoveConfiguration(),
                    new CartActions.LoadCart({
                        cartId: payload.cartId,
                        userId: payload.userId,
                    }),
                ];
            }), catchError((error) => of(new UpdateCartEntryConfigurationFail(normalizeHttpError(error, this.logger)))));
        })));
        this.readConfigurationForCartEntry$ = createEffect(() => this.actions$.pipe(ofType(READ_CART_ENTRY_CONFIGURATION), switchMap((action) => {
            const parameters = action.payload;
            return this.configuratorTextfieldConnector
                .readConfigurationForCartEntry(parameters)
                .pipe(switchMap((result) => [
                new ReadCartEntryConfigurationSuccess(result),
            ]), catchError((error) => [
                new ReadCartEntryConfigurationFail(normalizeHttpError(error, this.logger)),
            ]));
        })));
        this.readConfigurationForOrderEntry$ = createEffect(() => this.actions$.pipe(ofType(READ_ORDER_ENTRY_CONFIGURATION), switchMap((action) => {
            const parameters = action.payload;
            return this.configuratorTextfieldConnector
                .readConfigurationForOrderEntry(parameters)
                .pipe(switchMap((result) => [
                new ReadOrderEntryConfigurationSuccess(result),
            ]), catchError((error) => [
                new ReadOrderEntryConfigurationFail(normalizeHttpError(error, this.logger)),
            ]));
        })));
    }
}
ConfiguratorTextfieldEffects.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldEffects, deps: [{ token: i1$2.Actions }, { token: ConfiguratorTextfieldConnector }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorTextfieldEffects.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldEffects });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldEffects, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$2.Actions }, { type: ConfiguratorTextfieldConnector }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const configuratorTextfieldEffects = [
    ConfiguratorTextfieldEffects,
];

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialState = {
    configurationInfos: [],
    owner: ConfiguratorModelUtils.createInitialOwner(),
};
function reducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_CONFIGURATION_SUCCESS:
        case READ_CART_ENTRY_CONFIGURATION_SUCCESS:
        case READ_ORDER_ENTRY_CONFIGURATION_SUCCESS:
        case UPDATE_CONFIGURATION: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case REMOVE_CONFIGURATION: {
            return initialState;
        }
    }
    return state;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function getConfiguratorTextfieldReducers() {
    return {
        loaderState: StateUtils.loaderReducer(CONFIGURATION_TEXTFIELD_DATA, 
        // @ts-ignore TODO (#12620)
        reducer),
    };
}
const configuratorTextfieldReducerToken = new InjectionToken('ConfiguratorReducers');
const configuratorTextfieldReducerProvider = {
    provide: configuratorTextfieldReducerToken,
    useFactory: getConfiguratorTextfieldReducers,
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorTextfieldStoreModule {
}
ConfiguratorTextfieldStoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldStoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorTextfieldStoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldStoreModule, imports: [CommonModule,
        StateModule, i1.StoreFeatureModule, i1$2.EffectsFeatureModule] });
ConfiguratorTextfieldStoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldStoreModule, providers: [configuratorTextfieldReducerProvider], imports: [CommonModule,
        StateModule,
        StoreModule.forFeature(CONFIGURATION_TEXTFIELD_FEATURE, configuratorTextfieldReducerToken),
        EffectsModule.forFeature(configuratorTextfieldEffects)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorTextfieldStoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StateModule,
                        StoreModule.forFeature(CONFIGURATION_TEXTFIELD_FEATURE, configuratorTextfieldReducerToken),
                        EffectsModule.forFeature(configuratorTextfieldEffects),
                    ],
                    providers: [configuratorTextfieldReducerProvider],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Exposes the textfield configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
class TextfieldConfiguratorCoreModule {
}
TextfieldConfiguratorCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorCoreModule, imports: [ConfiguratorTextfieldStoreModule] });
TextfieldConfiguratorCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorCoreModule, providers: [ConfiguratorTextfieldConnector], imports: [ConfiguratorTextfieldStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ConfiguratorTextfieldStoreModule],
                    providers: [ConfiguratorTextfieldConnector],
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
const CONFIGURATOR_TYPE_TEXTFIELD$1 = 'TEXTFIELD';
class OccConfiguratorTextfieldAddToCartSerializer {
    constructor() {
        // Intentional empty constructor
    }
    /**
     * Converts addToCart parameters into the OCC format
     * @param source Add to cart parameters in generic format
     * @param target Add to cart parameters in OCC format. Optional, can be used in case converters should be chained
     * @returns Add to cart parameters in OCC format
     */
    convert(source, target) {
        const configurationInfos = [];
        source.configuration?.configurationInfos.forEach((info) => this.convertInfo(info, configurationInfos));
        const resultTarget = {
            ...target,
            userId: source.userId,
            cartId: source.cartId,
            product: { code: source.productCode },
            quantity: source.quantity,
            configurationInfos: configurationInfos,
        };
        return resultTarget;
    }
    convertInfo(source, occConfigurationInfos) {
        const occInfo = {
            configurationLabel: source.configurationLabel,
            configurationValue: source.configurationValue,
            status: source.status,
            configuratorType: CONFIGURATOR_TYPE_TEXTFIELD$1,
        };
        occConfigurationInfos.push(occInfo);
    }
}
OccConfiguratorTextfieldAddToCartSerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldAddToCartSerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorTextfieldAddToCartSerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldAddToCartSerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldAddToCartSerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class OccConfiguratorTextfieldNormalizer {
    constructor() {
        // Intentional empty constructor
    }
    /**
     * Converts addToCart parameters into the generic format
     * @param source Add to cart parameters in OCC format
     * @param target Optional result, can be provided in case converters should be chained
     * @returns Add to cart parameters in generic format
     */
    convert(source, target) {
        const resultTarget = {
            ...target,
            ...source,
        };
        return resultTarget;
    }
}
OccConfiguratorTextfieldNormalizer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldNormalizer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorTextfieldNormalizer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldNormalizer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldNormalizer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

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
const CONFIGURATION_TEXTFIELD_NORMALIZER = new InjectionToken('ConfigurationNormalizer');
const CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER = new InjectionToken('ConfigurationAddToCartSerializer');
const CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER = new InjectionToken('ConfigurationUpdateCartEntrySerializer');

class OccConfiguratorTextfieldAdapter {
    constructor(http, occEndpointsService, converterService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.converterService = converterService;
    }
    createConfiguration(productCode, owner) {
        return this.http
            .get(this.occEndpointsService.buildUrl('createTextfieldConfiguration', {
            urlParams: {
                productCode,
            },
        }))
            .pipe(this.converterService.pipeable(CONFIGURATION_TEXTFIELD_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: owner,
            };
        }));
    }
    addToCart(parameters) {
        const url = this.occEndpointsService.buildUrl('addTextfieldConfigurationToCart', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
            },
        });
        const occAddToCartParameters = this.converterService.convert(parameters, CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER);
        return this.http
            .post(url, occAddToCartParameters)
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
    readConfigurationForCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readTextfieldConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        return this.http.get(url).pipe(this.converterService.pipeable(CONFIGURATION_TEXTFIELD_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: {
                    ...parameters.owner,
                },
            };
        }));
    }
    readConfigurationForOrderEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('readTextfieldConfigurationForOrderEntry', {
            urlParams: {
                userId: parameters.userId,
                orderId: parameters.orderId,
                orderEntryNumber: parameters.orderEntryNumber,
            },
        });
        return this.http.get(url).pipe(this.converterService.pipeable(CONFIGURATION_TEXTFIELD_NORMALIZER), map((resultConfiguration) => {
            return {
                ...resultConfiguration,
                owner: {
                    ...parameters.owner,
                },
            };
        }));
    }
    updateConfigurationForCartEntry(parameters) {
        const url = this.occEndpointsService.buildUrl('updateTextfieldConfigurationForCartEntry', {
            urlParams: {
                userId: parameters.userId,
                cartId: parameters.cartId,
                cartEntryNumber: parameters.cartEntryNumber,
            },
        });
        const occUpdateCartEntryParameters = this.converterService.convert(parameters, CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER);
        return this.http
            .post(url, occUpdateCartEntryParameters)
            .pipe(this.converterService.pipeable(CART_MODIFICATION_NORMALIZER));
    }
}
OccConfiguratorTextfieldAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldAdapter, deps: [{ token: i1$3.HttpClient }, { token: i2$1.OccEndpointsService }, { token: i2$1.ConverterService }], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorTextfieldAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1$3.HttpClient }, { type: i2$1.OccEndpointsService }, { type: i2$1.ConverterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const CONFIGURATOR_TYPE_TEXTFIELD = 'TEXTFIELD';
class OccConfiguratorTextfieldUpdateCartEntrySerializer {
    constructor() {
        // Intentional empty constructor
    }
    /**
     * Converts the attributes for the updateCartEntry request into OCC format. Most attributes are just copied,
     * except for the backend configurator type that needs to be set to 'TEXTFIELD'
     * @param source Attributes for updating a cart entries' configuration in generic format
     * @returns ttributes for updating a cart entries' configuration in OCC format
     */
    convert(source) {
        const configurationInfos = [];
        source.configuration?.configurationInfos.forEach((info) => this.convertInfo(info, configurationInfos));
        const target = {
            userId: source.userId,
            cartId: source.cartId,
            cartEntryNumber: source.cartEntryNumber,
            configurationInfos: configurationInfos,
        };
        return target;
    }
    convertInfo(source, occConfigurationInfos) {
        const occInfo = {
            configurationLabel: source.configurationLabel,
            configurationValue: source.configurationValue,
            status: source.status,
            configuratorType: CONFIGURATOR_TYPE_TEXTFIELD,
        };
        occConfigurationInfos.push(occInfo);
    }
}
OccConfiguratorTextfieldUpdateCartEntrySerializer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldUpdateCartEntrySerializer, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
OccConfiguratorTextfieldUpdateCartEntrySerializer.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldUpdateCartEntrySerializer, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccConfiguratorTextfieldUpdateCartEntrySerializer, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return []; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function defaultOccConfiguratorTextfieldConfigFactory() {
    return {
        backend: {
            occ: {
                endpoints: {
                    createTextfieldConfiguration: 'products/${productCode}/configurator/textfield',
                    addTextfieldConfigurationToCart: 'users/${userId}/carts/${cartId}/entries/configurator/textfield',
                    readTextfieldConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/configurator/textfield',
                    readTextfieldConfigurationForOrderEntry: 'users/${userId}/orders/${orderId}/entries/${orderEntryNumber}/configurator/textfield',
                    updateTextfieldConfigurationForCartEntry: 'users/${userId}/carts/${cartId}/entries/${cartEntryNumber}/configurator/textfield',
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
class TextfieldConfiguratorOccModule {
}
TextfieldConfiguratorOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorOccModule, imports: [CommonModule, i2$1.ConfigModule] });
TextfieldConfiguratorOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorOccModule, providers: [
        {
            provide: ConfiguratorTextfieldAdapter,
            useClass: OccConfiguratorTextfieldAdapter,
        },
        {
            provide: CONFIGURATION_TEXTFIELD_NORMALIZER,
            useExisting: OccConfiguratorTextfieldNormalizer,
            multi: true,
        },
        {
            provide: CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER,
            useExisting: OccConfiguratorTextfieldAddToCartSerializer,
            multi: true,
        },
        {
            provide: CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER,
            useExisting: OccConfiguratorTextfieldUpdateCartEntrySerializer,
            multi: true,
        },
    ], imports: [CommonModule,
        ConfigModule.withConfigFactory(defaultOccConfiguratorTextfieldConfigFactory)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        ConfigModule.withConfigFactory(defaultOccConfiguratorTextfieldConfigFactory),
                    ],
                    providers: [
                        {
                            provide: ConfiguratorTextfieldAdapter,
                            useClass: OccConfiguratorTextfieldAdapter,
                        },
                        {
                            provide: CONFIGURATION_TEXTFIELD_NORMALIZER,
                            useExisting: OccConfiguratorTextfieldNormalizer,
                            multi: true,
                        },
                        {
                            provide: CONFIGURATION_TEXTFIELD_ADD_TO_CART_SERIALIZER,
                            useExisting: OccConfiguratorTextfieldAddToCartSerializer,
                            multi: true,
                        },
                        {
                            provide: CONFIGURATION_TEXTFIELD_UPDATE_CART_ENTRY_SERIALIZER,
                            useExisting: OccConfiguratorTextfieldUpdateCartEntrySerializer,
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
/**
 * Exposes the textfield configurator, a small configurator that only provides 3 attributes at product level without any dependencies between them,
 * and in the first place serves as a template for other configurator implementations.
 */
class TextfieldConfiguratorModule {
}
TextfieldConfiguratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TextfieldConfiguratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorModule, imports: [TextfieldConfiguratorCoreModule,
        TextfieldConfiguratorComponentsModule,
        TextfieldConfiguratorOccModule] });
TextfieldConfiguratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorModule, imports: [TextfieldConfiguratorCoreModule,
        TextfieldConfiguratorComponentsModule,
        TextfieldConfiguratorOccModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TextfieldConfiguratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        TextfieldConfiguratorCoreModule,
                        TextfieldConfiguratorComponentsModule,
                        TextfieldConfiguratorOccModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CONFIGURATOR_TYPE_TEXTFIELD$1 as CONFIGURATOR_TYPE_TEXTFIELD, ConfiguratorTextfieldAddToCartButtonComponent, ConfiguratorTextfieldFormComponent, ConfiguratorTextfieldInputFieldComponent, ConfiguratorTextfieldInputFieldReadonlyComponent, OccConfiguratorTextfieldAdapter, OccConfiguratorTextfieldAddToCartSerializer, OccConfiguratorTextfieldNormalizer, TextfieldConfiguratorComponentsModule, TextfieldConfiguratorCoreModule, TextfieldConfiguratorModule, TextfieldConfiguratorOccModule };
//# sourceMappingURL=spartacus-product-configurator-textfield.mjs.map
