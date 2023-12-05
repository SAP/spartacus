import * as i0 from '@angular/core';
import { Injectable, Component, ChangeDetectionStrategy, Input, NgModule, Optional, inject, isDevMode } from '@angular/core';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@spartacus/cart/base/root';
import { PromotionLocation, CartOutlets } from '@spartacus/cart/base/root';
import * as i4 from '@spartacus/core';
import { OCC_USER_ID_ANONYMOUS, UrlModule, I18nModule, ConfigModule, LoggerService, provideDefaultConfig } from '@spartacus/core';
import * as i1 from '@spartacus/storefront';
import { IconModule, ICON_TYPE, provideOutlet, OutletPosition, ProductListOutlets } from '@spartacus/storefront';
import * as i3$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { map, take, filter } from 'rxjs/operators';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var CommonConfigurator;
(function (CommonConfigurator) {
    /**
     * Possible types of owners: Product, cart or order entry
     */
    let OwnerType;
    (function (OwnerType) {
        OwnerType["PRODUCT"] = "product";
        OwnerType["CART_ENTRY"] = "cartEntry";
        OwnerType["ORDER_ENTRY"] = "orderEntry";
    })(OwnerType = CommonConfigurator.OwnerType || (CommonConfigurator.OwnerType = {}));
})(CommonConfigurator || (CommonConfigurator = {}));
/**
 * Statuses that can occur in the generic configuration
 * status summary
 */
var OrderEntryStatus;
(function (OrderEntryStatus) {
    OrderEntryStatus["Success"] = "SUCCESS";
    OrderEntryStatus["Info"] = "INFO";
    OrderEntryStatus["Warning"] = "WARNING";
    OrderEntryStatus["Error"] = "ERROR";
})(OrderEntryStatus || (OrderEntryStatus = {}));
/**
 *
 * An enum representing ConfigurationInfo fields.
 */
var ConfigurationInfoFields;
(function (ConfigurationInfoFields) {
    ConfigurationInfoFields["KEY"] = "KEY";
    ConfigurationInfoFields["NAME"] = "NAME";
    ConfigurationInfoFields["QTY"] = "QTY";
    ConfigurationInfoFields["FORMATTED_PRICE"] = "FORMATTED_PRICE";
    ConfigurationInfoFields["PRICE_VALUE"] = "PRICE_VALUE";
})(ConfigurationInfoFields || (ConfigurationInfoFields = {}));
/**
 *
 * An enum representing ConfigurationInfo special fields.
 */
var ConfigurationInfoSpecialFields;
(function (ConfigurationInfoSpecialFields) {
    ConfigurationInfoSpecialFields["VERSION"] = "CI#@#VERSION";
    ConfigurationInfoSpecialFields["CURRENCY"] = "CI#@#CURRENCY";
    ConfigurationInfoSpecialFields["LINE_ITEM"] = "LI";
    ConfigurationInfoSpecialFields["LINE_ITEM_DELIMITER"] = "#";
})(ConfigurationInfoSpecialFields || (ConfigurationInfoSpecialFields = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const initialIndicator = 'INITIAL';
class ConfiguratorModelUtils {
    /**
     * Compiles a unique key for a configuration owner from id and type
     * @param owner Specifies the owner of a product configuration
     * @returns Owner key
     */
    static getOwnerKey(ownerType, ownerId) {
        if (!ownerId || !ownerType) {
            throw new Error('We expect an owner ID and an owner type');
        }
        return ownerType + '/' + ownerId;
    }
    /**
     * Creates an initial owner object
     * @returns Initial owner
     */
    static createInitialOwner() {
        return {
            key: initialIndicator,
            configuratorType: initialIndicator,
            id: initialIndicator,
            type: CommonConfigurator.OwnerType.PRODUCT,
        };
    }
    /**
     * Checks if an owner is an initial one
     * @param owner Owner
     * @returns Is owner initial?
     */
    static isInitialOwner(owner) {
        return owner.configuratorType === initialIndicator;
    }
    /**
     * Creates a configuration owner object based on its essential attributes
     * @param ownerType Owner type (Does it refer to product, cart or order?)
     * @param ownerId Owner identifier
     * @param configuratorType Configurator type
     * @returns Owner
     */
    static createOwner(ownerType, ownerId, configuratorType = "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */) {
        return {
            type: ownerType,
            id: ownerId,
            configuratorType: configuratorType,
            key: ConfiguratorModelUtils.getOwnerKey(ownerType, ownerId),
        };
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Utilities for generic configuration
 */
class CommonConfiguratorUtilsService {
    constructor(userIdService) {
        this.userIdService = userIdService;
    }
    /**
     * Compiles a unique key for a configuration owner and sets it into the 'key'
     * attribute
     * @param {CommonConfigurator.Owner }owner - Specifies the owner of a product configuration
     */
    setOwnerKey(owner) {
        owner.key = ConfiguratorModelUtils.getOwnerKey(owner.type, owner.id);
    }
    /**
     * Composes owner ID from document ID and entry number
     * @param {string} documentId - ID of document the entry is part of, like the order or quote code
     * @param {string} entryNumber - Entry number
     * @returns {string} - owner ID
     */
    getComposedOwnerId(documentId, entryNumber) {
        return documentId + '+' + entryNumber;
    }
    /**
     * Decomposes an owner ID into documentId and entryNumber
     * @param {string} ownerId - ID of owner
     * @returns {any} object containing documentId and entryNumber
     */
    decomposeOwnerId(ownerId) {
        const parts = ownerId.split('+');
        if (parts.length !== 2) {
            throw new Error('We only expect 2 parts in ownerId, separated by +, but was: ' + ownerId);
        }
        const result = { documentId: parts[0], entryNumber: parts[1] };
        return result;
    }
    /**
     * Gets cart ID (which can be either its guid or its code)
     * @param {Cart} cart - Cart
     * @returns {string} - Cart identifier
     */
    getCartId(cart) {
        var _a;
        const cartId = ((_a = cart === null || cart === void 0 ? void 0 : cart.user) === null || _a === void 0 ? void 0 : _a.uid) === OCC_USER_ID_ANONYMOUS ? cart.guid : cart === null || cart === void 0 ? void 0 : cart.code;
        if (!cartId) {
            throw new Error('Cart ID is not defined');
        }
        return cartId;
    }
    /**
     * Verifies whether the item has any issues.
     *
     * @param {OrderEntry} cartItem - Cart item
     * @returns {boolean} - whether there are any issues
     */
    hasIssues(cartItem) {
        return this.getNumberOfIssues(cartItem) > 0;
    }
    /**
     * Retrieves the number of issues at the cart item.
     *
     * @param {OrderEntry} cartItem - Cart item
     * @returns {number} - the number of issues at the cart item
     */
    getNumberOfIssues(cartItem) {
        var _a;
        let numberOfIssues = 0;
        (_a = cartItem === null || cartItem === void 0 ? void 0 : cartItem.statusSummaryList) === null || _a === void 0 ? void 0 : _a.forEach((statusSummary) => {
            if (statusSummary.status === OrderEntryStatus.Error) {
                const numberOfIssuesFromStatus = statusSummary.numberOfIssues;
                numberOfIssues = numberOfIssuesFromStatus
                    ? numberOfIssuesFromStatus
                    : 0;
            }
        });
        return numberOfIssues;
    }
    /**
     * Verifies whether the configurator type is an attribute based one.
     *
     * @param {string} configuratorType - Configurator type
     * @returns {boolean} - 'True' if the expected configurator type, otherwise 'false'
     */
    isAttributeBasedConfigurator(configuratorType) {
        if (configuratorType) {
            return (configuratorType === "CPQCONFIGURATOR" /* ConfiguratorType.VARIANT */ ||
                configuratorType === "TEXTFIELD" /* ConfiguratorType.TEXTFIELD */);
        }
        return false;
    }
    /**
     * Verifies whether the configurator type is a bundle based one.
     *
     * @param {string} configuratorType - Configurator type
     * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
     */
    isBundleBasedConfigurator(configuratorType) {
        if (configuratorType) {
            return configuratorType === "CLOUDCPQCONFIGURATOR" /* ConfiguratorType.CPQ */;
        }
        return false;
    }
    /**
     * Determines whether we are in the context of an active cart
     * @param cartItemContext Cart item context
     * @returns Item part of an active cart?
     */
    isActiveCartContext(cartItemContext) {
        var _a;
        return ((_a = cartItemContext === null || cartItemContext === void 0 ? void 0 : cartItemContext.location$) !== null && _a !== void 0 ? _a : EMPTY).pipe(map((location) => location !== PromotionLocation.SaveForLater &&
            location !== PromotionLocation.SavedCart));
    }
    /**
     * Reads slots from layout config, taking the breakpoint into account
     * @param layoutConfig Layout config
     * @param templateName Page template name
     * @param sectionName Section name like 'header'
     * @param breakPoint Current breakpoint
     * @returns Array of slots
     */
    getSlotsFromLayoutConfiguration(layoutConfig, templateName, sectionName, breakPoint) {
        const slots = layoutConfig.layoutSlots;
        if (slots) {
            const slotsForTemplate = (slots[templateName]);
            const slotGroupForSection = (slotsForTemplate[sectionName]);
            const slotConfigForBreakpoint = (slotGroupForSection[breakPoint]);
            return slotConfigForBreakpoint['slots'];
        }
        else {
            return [];
        }
    }
}
CommonConfiguratorUtilsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorUtilsService, deps: [{ token: i4.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
CommonConfiguratorUtilsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorUtilsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorUtilsService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i4.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfigureCartEntryComponent {
    /**
     * Verifies whether the entry has any issues.
     *
     * @returns - whether there are any issues
     */
    hasIssues() {
        return this.commonConfigUtilsService.hasIssues(this.cartEntry);
    }
    /**
     * Verifies whether the cart entry has an order code and returns a corresponding owner type.
     *
     * @returns - an owner type
     */
    getOwnerType() {
        return this.cartEntry.orderCode !== undefined
            ? CommonConfigurator.OwnerType.ORDER_ENTRY
            : CommonConfigurator.OwnerType.CART_ENTRY;
    }
    /**
     * Verifies whether the cart entry has an order code, retrieves a composed owner ID
     * and concatenates a corresponding entry number.
     *
     * @returns - an entry key
     */
    getEntityKey() {
        const entryNumber = this.cartEntry.entryNumber;
        if (entryNumber === undefined) {
            throw new Error('No entryNumber present in entry');
        }
        return this.cartEntry.orderCode
            ? this.commonConfigUtilsService.getComposedOwnerId(this.cartEntry.orderCode, entryNumber)
            : entryNumber.toString();
    }
    /**
     * Retrieves a corresponding route depending whether the configuration is read only or not.
     *
     * @returns - a route
     */
    getRoute() {
        var _a;
        const configuratorType = (_a = this.cartEntry.product) === null || _a === void 0 ? void 0 : _a.configuratorType;
        return this.readOnly
            ? 'configureOverview' + configuratorType
            : 'configure' + configuratorType;
    }
    /**
     * Retrieves the state of the configuration.
     *
     *  @returns - 'true' if the configuration is read only, otherwise 'false'
     */
    getDisplayOnly() {
        return this.readOnly;
    }
    /**
     * Verifies whether the link to the configuration is disabled.
     *
     *  @returns - 'true' if the the configuration is not read only, otherwise 'false'
     */
    isDisabled() {
        return this.readOnly ? false : this.disabled;
    }
    /**
     * Retrieves the additional resolve issues accessibility description.
     *
     * @returns - If there is a 'resolve issues' link, the ID to the element with additional description will be returned.
     */
    getResolveIssuesA11yDescription() {
        const errorMsgId = 'cx-error-msg-' + this.cartEntry.entryNumber;
        return !this.readOnly && this.msgBanner ? errorMsgId : undefined;
    }
    /**
     * Compiles query parameters for the router link. 'resolveIssues' is only set if the component is
     * rendered in the context of the message banner, and if issues exist at all
     * @returns Query parameters
     */
    getQueryParams() {
        return {
            forceReload: true,
            resolveIssues: this.msgBanner && this.hasIssues(),
        };
    }
    constructor(commonConfigUtilsService) {
        this.commonConfigUtilsService = commonConfigUtilsService;
    }
}
ConfigureCartEntryComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureCartEntryComponent, deps: [{ token: CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfigureCartEntryComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfigureCartEntryComponent, selector: "cx-configure-cart-entry", inputs: { cartEntry: "cartEntry", readOnly: "readOnly", msgBanner: "msgBanner", disabled: "disabled" }, ngImport: i0, template: "<ng-container *ngIf=\"cartEntry\">\n  <label *ngIf=\"isDisabled()\" class=\"disabled-link\">\n    <ng-container *ngIf=\"isDisabled(); then configureText\"> </ng-container>\n  </label>\n\n  <a\n    *ngIf=\"!isDisabled()\"\n    class=\"link cx-action-link\"\n    [routerLink]=\"\n      {\n        cxRoute: getRoute(),\n        params: {\n          ownerType: getOwnerType(),\n          entityKey: getEntityKey(),\n          displayOnly: getDisplayOnly()\n        }\n      } | cxUrl\n    \"\n    [queryParams]=\"getQueryParams()\"\n    cxAutoFocus\n    attr.aria-describedby=\"{{ getResolveIssuesA11yDescription() }}\"\n  >\n    <ng-container *ngIf=\"!isDisabled(); then configureText\"> </ng-container>\n  </a>\n</ng-container>\n\n<ng-template #configureText>\n  <ng-container *ngIf=\"readOnly\">\n    {{ 'configurator.header.displayConfiguration' | cxTranslate }}</ng-container\n  >\n  <ng-container *ngIf=\"!readOnly && !msgBanner\">\n    {{ 'configurator.header.editConfiguration' | cxTranslate }}\n  </ng-container>\n\n  <ng-container *ngIf=\"!readOnly && msgBanner\">\n    {{ 'configurator.header.resolveIssues' | cxTranslate }}\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i4.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureCartEntryComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configure-cart-entry', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"cartEntry\">\n  <label *ngIf=\"isDisabled()\" class=\"disabled-link\">\n    <ng-container *ngIf=\"isDisabled(); then configureText\"> </ng-container>\n  </label>\n\n  <a\n    *ngIf=\"!isDisabled()\"\n    class=\"link cx-action-link\"\n    [routerLink]=\"\n      {\n        cxRoute: getRoute(),\n        params: {\n          ownerType: getOwnerType(),\n          entityKey: getEntityKey(),\n          displayOnly: getDisplayOnly()\n        }\n      } | cxUrl\n    \"\n    [queryParams]=\"getQueryParams()\"\n    cxAutoFocus\n    attr.aria-describedby=\"{{ getResolveIssuesA11yDescription() }}\"\n  >\n    <ng-container *ngIf=\"!isDisabled(); then configureText\"> </ng-container>\n  </a>\n</ng-container>\n\n<ng-template #configureText>\n  <ng-container *ngIf=\"readOnly\">\n    {{ 'configurator.header.displayConfiguration' | cxTranslate }}</ng-container\n  >\n  <ng-container *ngIf=\"!readOnly && !msgBanner\">\n    {{ 'configurator.header.editConfiguration' | cxTranslate }}\n  </ng-container>\n\n  <ng-container *ngIf=\"!readOnly && msgBanner\">\n    {{ 'configurator.header.resolveIssues' | cxTranslate }}\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: CommonConfiguratorUtilsService }]; }, propDecorators: { cartEntry: [{
                type: Input
            }], readOnly: [{
                type: Input
            }], msgBanner: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfigureCartEntryModule {
}
ConfigureCartEntryModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureCartEntryModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigureCartEntryModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfigureCartEntryModule, declarations: [ConfigureCartEntryComponent], imports: [CommonModule, UrlModule, I18nModule, IconModule, RouterModule], exports: [ConfigureCartEntryComponent] });
ConfigureCartEntryModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureCartEntryModule, imports: [CommonModule, UrlModule, I18nModule, IconModule, RouterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureCartEntryModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UrlModule, I18nModule, IconModule, RouterModule],
                    declarations: [ConfigureCartEntryComponent],
                    exports: [ConfigureCartEntryComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorIssuesNotificationComponent {
    constructor(commonConfigUtilsService, cartItemContext) {
        var _a, _b, _c, _d, _e, _f;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.cartItemContext = cartItemContext;
        this.iconTypes = ICON_TYPE;
        this.orderEntry$ = (_b = (_a = this.cartItemContext) === null || _a === void 0 ? void 0 : _a.item$) !== null && _b !== void 0 ? _b : EMPTY;
        this.quantityControl$ = (_d = (_c = this.cartItemContext) === null || _c === void 0 ? void 0 : _c.quantityControl$) !== null && _d !== void 0 ? _d : EMPTY;
        this.readonly$ = (_f = (_e = this.cartItemContext) === null || _e === void 0 ? void 0 : _e.readonly$) !== null && _f !== void 0 ? _f : EMPTY;
        // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
        this.shouldShowButton$ = this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext);
    }
    /**
     * Verifies whether the item has any issues.
     *
     * @param item - Cart item
     * @returns - whether there are any issues
     */
    hasIssues(item) {
        return this.commonConfigUtilsService.hasIssues(item);
    }
    /**
     * Retrieves the number of issues at the cart item.
     *
     * @param item - Cart item
     * @returns - the number of issues at the cart item
     */
    getNumberOfIssues(item) {
        return this.commonConfigUtilsService.getNumberOfIssues(item);
    }
    /**
     * Retrieves the unique id for the error message.
     *
     * @param item - Cart item
     * @returns - Unique id for error message
     */
    getErrorMessageId(item) {
        return 'cx-error-msg-' + item.entryNumber;
    }
}
ConfiguratorIssuesNotificationComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationComponent, deps: [{ token: CommonConfiguratorUtilsService }, { token: i2.CartItemContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorIssuesNotificationComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorIssuesNotificationComponent, selector: "cx-configurator-issues-notification", ngImport: i0, template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"hasIssues(orderEntry) && !(readonly$ | async)\">\n    <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n    <div id=\"{{ getErrorMessageId(orderEntry) }}\">\n      {{\n        'configurator.notificationBanner.numberOfIssues'\n          | cxTranslate: { count: getNumberOfIssues(orderEntry) }\n      }}\n      <ng-container *ngIf=\"quantityControl$ | async as quantityControl\">\n        <cx-configure-cart-entry\n          class=\"cx-error-msg-action\"\n          *ngIf=\"\n            (shouldShowButton$ | async) && orderEntry?.product?.configurable\n          \"\n          [cartEntry]=\"orderEntry\"\n          [readOnly]=\"(readonly$ | async) ?? true\"\n          [msgBanner]=\"true\"\n          [disabled]=\"quantityControl.disabled\"\n        ></cx-configure-cart-entry\n      ></ng-container>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: ConfigureCartEntryComponent, selector: "cx-configure-cart-entry", inputs: ["cartEntry", "readOnly", "msgBanner", "disabled"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-issues-notification', template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"hasIssues(orderEntry) && !(readonly$ | async)\">\n    <cx-icon [type]=\"iconTypes.ERROR\"></cx-icon>\n    <div id=\"{{ getErrorMessageId(orderEntry) }}\">\n      {{\n        'configurator.notificationBanner.numberOfIssues'\n          | cxTranslate: { count: getNumberOfIssues(orderEntry) }\n      }}\n      <ng-container *ngIf=\"quantityControl$ | async as quantityControl\">\n        <cx-configure-cart-entry\n          class=\"cx-error-msg-action\"\n          *ngIf=\"\n            (shouldShowButton$ | async) && orderEntry?.product?.configurable\n          \"\n          [cartEntry]=\"orderEntry\"\n          [readOnly]=\"(readonly$ | async) ?? true\"\n          [msgBanner]=\"true\"\n          [disabled]=\"quantityControl.disabled\"\n        ></cx-configure-cart-entry\n      ></ng-container>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () {
        return [{ type: CommonConfiguratorUtilsService }, { type: i2.CartItemContext, decorators: [{
                        type: Optional
                    }] }];
    } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorIssuesNotificationModule {
}
ConfiguratorIssuesNotificationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorIssuesNotificationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationModule, declarations: [ConfiguratorIssuesNotificationComponent], imports: [CommonModule,
        UrlModule,
        I18nModule,
        IconModule,
        ConfigureCartEntryModule], exports: [ConfiguratorIssuesNotificationComponent] });
ConfiguratorIssuesNotificationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_CONFIGURATOR_ISSUES,
            position: OutletPosition.REPLACE,
            component: ConfiguratorIssuesNotificationComponent,
        }),
    ], imports: [CommonModule,
        UrlModule,
        I18nModule,
        IconModule,
        ConfigureCartEntryModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorIssuesNotificationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        UrlModule,
                        I18nModule,
                        IconModule,
                        ConfigureCartEntryModule,
                    ],
                    declarations: [ConfiguratorIssuesNotificationComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_CONFIGURATOR_ISSUES,
                            position: OutletPosition.REPLACE,
                            component: ConfiguratorIssuesNotificationComponent,
                        }),
                    ],
                    exports: [ConfiguratorIssuesNotificationComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorCartEntryInfoComponent {
    constructor(cartItemContext, commonConfigUtilsService) {
        var _a, _b, _c, _d, _e, _f;
        this.cartItemContext = cartItemContext;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.orderEntry$ = (_b = (_a = this.cartItemContext) === null || _a === void 0 ? void 0 : _a.item$) !== null && _b !== void 0 ? _b : EMPTY;
        this.quantityControl$ = (_d = (_c = this.cartItemContext) === null || _c === void 0 ? void 0 : _c.quantityControl$) !== null && _d !== void 0 ? _d : EMPTY;
        this.readonly$ = (_f = (_e = this.cartItemContext) === null || _e === void 0 ? void 0 : _e.readonly$) !== null && _f !== void 0 ? _f : EMPTY;
        // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
        this.shouldShowButton$ = this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext);
    }
    /**
     * Verifies whether the configuration infos have any entries and the first entry has a status.
     * Only in this case we want to display the configuration summary
     *
     * @param {OrderEntry} item - Cart item
     * @returns {boolean} - whether the status of configuration infos entry has status
     */
    hasStatus(item) {
        const configurationInfos = item.configurationInfos;
        return configurationInfos
            ? configurationInfos.length > 0 && configurationInfos[0].status !== 'NONE'
            : false;
    }
    /**
     * Verifies whether the configurator type is attribute based one.
     *
     * @param {OrderEntry} item - Order entry item
     * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
     */
    isAttributeBasedConfigurator(item) {
        var _a;
        const configurationInfos = item.configurationInfos;
        return configurationInfos
            ? this.commonConfigUtilsService.isAttributeBasedConfigurator((_a = configurationInfos[0]) === null || _a === void 0 ? void 0 : _a.configuratorType)
            : false;
    }
    getHiddenConfigurationInfoId(index) {
        return 'cx-configuration-hidden-info-' + index.toString();
    }
}
ConfiguratorCartEntryInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoComponent, deps: [{ token: i2.CartItemContext, optional: true }, { token: CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorCartEntryInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorCartEntryInfoComponent, selector: "cx-configurator-cart-entry-info", ngImport: i0, template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"isAttributeBasedConfigurator(orderEntry)\">\n    <ng-container *ngIf=\"hasStatus(orderEntry)\">\n      <span\n        *ngIf=\"orderEntry.configurationInfos?.length ?? 0 > 0\"\n        class=\"cx-intro cx-visually-hidden\"\n      >\n        {{ 'configurator.a11y.cartEntryInfoIntro' | cxTranslate }}\n      </span>\n      <div\n        *ngFor=\"let info of orderEntry.configurationInfos; let i = index\"\n        class=\"cx-configuration-info\"\n        attr.aria-describedby=\"{{ getHiddenConfigurationInfoId(i) }}\"\n      >\n        <span\n          id=\"{{ getHiddenConfigurationInfoId(i) }}\"\n          class=\"cx-visually-hidden\"\n        >\n          {{\n            'configurator.a11y.cartEntryInfo'\n              | cxTranslate\n                : {\n                    attribute: info.configurationLabel,\n                    value: info.configurationValue\n                  }\n          }}\n        </span>\n        <div class=\"cx-label\" aria-hidden=\"true\">\n          {{ info?.configurationLabel }}:\n        </div>\n        <div class=\"cx-value\" aria-hidden=\"true\">\n          {{ info?.configurationValue }}\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"quantityControl$ | async as quantityControl\">\n      <cx-configure-cart-entry\n        *ngIf=\"(shouldShowButton$ | async) && orderEntry?.product?.configurable\"\n        [cartEntry]=\"orderEntry\"\n        [readOnly]=\"(readonly$ | async) ?? true\"\n        [msgBanner]=\"false\"\n        [disabled]=\"quantityControl.disabled\"\n      ></cx-configure-cart-entry\n    ></ng-container>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfigureCartEntryComponent, selector: "cx-configure-cart-entry", inputs: ["cartEntry", "readOnly", "msgBanner", "disabled"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-cart-entry-info', template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"isAttributeBasedConfigurator(orderEntry)\">\n    <ng-container *ngIf=\"hasStatus(orderEntry)\">\n      <span\n        *ngIf=\"orderEntry.configurationInfos?.length ?? 0 > 0\"\n        class=\"cx-intro cx-visually-hidden\"\n      >\n        {{ 'configurator.a11y.cartEntryInfoIntro' | cxTranslate }}\n      </span>\n      <div\n        *ngFor=\"let info of orderEntry.configurationInfos; let i = index\"\n        class=\"cx-configuration-info\"\n        attr.aria-describedby=\"{{ getHiddenConfigurationInfoId(i) }}\"\n      >\n        <span\n          id=\"{{ getHiddenConfigurationInfoId(i) }}\"\n          class=\"cx-visually-hidden\"\n        >\n          {{\n            'configurator.a11y.cartEntryInfo'\n              | cxTranslate\n                : {\n                    attribute: info.configurationLabel,\n                    value: info.configurationValue\n                  }\n          }}\n        </span>\n        <div class=\"cx-label\" aria-hidden=\"true\">\n          {{ info?.configurationLabel }}:\n        </div>\n        <div class=\"cx-value\" aria-hidden=\"true\">\n          {{ info?.configurationValue }}\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"quantityControl$ | async as quantityControl\">\n      <cx-configure-cart-entry\n        *ngIf=\"(shouldShowButton$ | async) && orderEntry?.product?.configurable\"\n        [cartEntry]=\"orderEntry\"\n        [readOnly]=\"(readonly$ | async) ?? true\"\n        [msgBanner]=\"false\"\n        [disabled]=\"quantityControl.disabled\"\n      ></cx-configure-cart-entry\n    ></ng-container>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () {
        return [{ type: i2.CartItemContext, decorators: [{
                        type: Optional
                    }] }, { type: CommonConfiguratorUtilsService }];
    } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorCartEntryInfoModule {
}
ConfiguratorCartEntryInfoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorCartEntryInfoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoModule, declarations: [ConfiguratorCartEntryInfoComponent], imports: [CommonModule,
        UrlModule,
        I18nModule,
        IconModule,
        ConfiguratorIssuesNotificationModule,
        ConfigureCartEntryModule] });
ConfiguratorCartEntryInfoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_DETAILS,
            position: OutletPosition.AFTER,
            component: ConfiguratorCartEntryInfoComponent,
        }),
    ], imports: [CommonModule,
        UrlModule,
        I18nModule,
        IconModule,
        ConfiguratorIssuesNotificationModule,
        ConfigureCartEntryModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryInfoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        UrlModule,
                        I18nModule,
                        IconModule,
                        ConfiguratorIssuesNotificationModule,
                        ConfigureCartEntryModule,
                    ],
                    declarations: [ConfiguratorCartEntryInfoComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_DETAILS,
                            position: OutletPosition.AFTER,
                            component: ConfiguratorCartEntryInfoComponent,
                        }),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var ConfiguratorProductScope;
(function (ConfiguratorProductScope) {
    ConfiguratorProductScope["CONFIGURATOR"] = "configurator";
    ConfiguratorProductScope["CONFIGURATOR_PRODUCT_CARD"] = "configuratorProductCard";
})(ConfiguratorProductScope || (ConfiguratorProductScope = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfigureProductComponent {
    constructor(productListItemContext, // when on PLP
    currentProductService // when on PDP
    ) {
        this.productListItemContext = productListItemContext;
        this.currentProductService = currentProductService;
        this.nonConfigurable = { configurable: false };
        this.product$ = (this.productListItemContext
            ? this.productListItemContext.product$
            : this.currentProductService
                ? this.currentProductService.getProduct(ConfiguratorProductScope.CONFIGURATOR)
                : of(null)).pipe(
        //needed because also currentProductService might return null
        map((product) => (product ? product : this.nonConfigurable)));
        this.ownerTypeProduct = CommonConfigurator.OwnerType.PRODUCT;
    }
}
ConfigureProductComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductComponent, deps: [{ token: i1.ProductListItemContext, optional: true }, { token: i1.CurrentProductService, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfigureProductComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfigureProductComponent, selector: "cx-configure-product", ngImport: i0, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <ng-container *ngIf=\"product.configurable\">\n    <a\n      [routerLink]=\"\n        {\n          cxRoute: 'configure' + product.configuratorType,\n          params: {\n            ownerType: ownerTypeProduct,\n            entityKey: product.code\n          }\n        } | cxUrl\n      \"\n      [queryParams]=\"{ displayRestartDialog: 'true' }\"\n      class=\"btn btn-primary btn-block\"\n      cxAutoFocus\n      [attr.aria-label]=\"'configurator.a11y.configureProduct' | cxTranslate\"\n      >{{ 'configurator.header.toconfig' | cxTranslate }}</a\n    >\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configure-product', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"product$ | async as product\">\n  <ng-container *ngIf=\"product.configurable\">\n    <a\n      [routerLink]=\"\n        {\n          cxRoute: 'configure' + product.configuratorType,\n          params: {\n            ownerType: ownerTypeProduct,\n            entityKey: product.code\n          }\n        } | cxUrl\n      \"\n      [queryParams]=\"{ displayRestartDialog: 'true' }\"\n      class=\"btn btn-primary btn-block\"\n      cxAutoFocus\n      [attr.aria-label]=\"'configurator.a11y.configureProduct' | cxTranslate\"\n      >{{ 'configurator.header.toconfig' | cxTranslate }}</a\n    >\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () {
        return [{ type: i1.ProductListItemContext, decorators: [{
                        type: Optional
                    }] }, { type: i1.CurrentProductService, decorators: [{
                        type: Optional
                    }] }];
    } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfigureProductModule {
}
ConfigureProductModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfigureProductModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductModule, declarations: [ConfigureProductComponent], imports: [CommonModule,
        RouterModule, i4.ConfigModule, UrlModule,
        I18nModule,
        IconModule], exports: [ConfigureProductComponent] });
ConfigureProductModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductModule, providers: [
        provideOutlet({
            id: ProductListOutlets.ITEM_ACTIONS,
            position: OutletPosition.AFTER,
            component: ConfigureProductComponent,
        }),
    ], imports: [CommonModule,
        RouterModule,
        ConfigModule.withConfig({
            cmsComponents: {
                ConfigureProductComponent: {
                    component: ConfigureProductComponent,
                },
            },
        }),
        UrlModule,
        I18nModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigureProductModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ConfigModule.withConfig({
                            cmsComponents: {
                                ConfigureProductComponent: {
                                    component: ConfigureProductComponent,
                                },
                            },
                        }),
                        UrlModule,
                        I18nModule,
                        IconModule,
                    ],
                    providers: [
                        provideOutlet({
                            id: ProductListOutlets.ITEM_ACTIONS,
                            position: OutletPosition.AFTER,
                            component: ConfigureProductComponent,
                        }),
                    ],
                    declarations: [ConfigureProductComponent],
                    exports: [ConfigureProductComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service for mapping of the CPQ line items from order entry
 */
class ConfiguratorCartEntryBundleInfoService {
    constructor() {
        this.logger = inject(LoggerService);
    }
    /**
     * Retrieves the CPQ line items for an order entry
     *
     * @param {OrderEntry} entry - Order entry
     * @returns {LineItem[]} - Line item array
     */
    retrieveLineItems(entry) {
        var _a, _b;
        let lineItems = [];
        if (entry.configurationInfos) {
            const configurationInfos = entry.configurationInfos.filter((configurationInfo) => configurationInfo &&
                (configurationInfo.configurationLabel ||
                    configurationInfo.configurationValue));
            const firstLabel = (_a = configurationInfos[0]) === null || _a === void 0 ? void 0 : _a.configurationLabel;
            const firstValue = (_b = configurationInfos[0]) === null || _b === void 0 ? void 0 : _b.configurationValue;
            if (firstLabel !== ConfigurationInfoSpecialFields.VERSION) {
                configurationInfos.forEach((configurationInfo) => lineItems.push(this.prepareLineItem(configurationInfo)));
            }
            else if (firstLabel === ConfigurationInfoSpecialFields.VERSION &&
                Number(firstValue) >= 2) {
                lineItems = this.processConfigurationInfos(configurationInfos);
            }
            else {
                this.logWarning('Wrong ConfigurationInfo version');
            }
        }
        return lineItems;
    }
    prepareLineItem(configurationInfo) {
        const quantityAndPrice = configurationInfo.configurationValue
            ? configurationInfo.configurationValue.split('x')
            : [];
        return {
            name: configurationInfo.configurationLabel
                ? this.removeDelimiter(configurationInfo.configurationLabel)
                : '',
            formattedQuantity: quantityAndPrice.length >= 1 ? quantityAndPrice[0].trim() : '',
            formattedPrice: quantityAndPrice.length >= 2 ? quantityAndPrice[1].trim() : '',
        };
    }
    removeDelimiter(label) {
        let preparedLabel = label.trim();
        const lastCharacter = preparedLabel.charAt(preparedLabel.length - 1);
        if (lastCharacter === ':') {
            preparedLabel = preparedLabel.substring(0, preparedLabel.length - 1);
        }
        return preparedLabel;
    }
    processConfigurationInfos(configurationInfos) {
        const lineItemMap = new Map();
        configurationInfos.forEach((configurationInfo) => this.processConfigurationInfoEntry(lineItemMap, configurationInfo));
        // sort
        const lineItemMapSorted = new Map(Array.from(lineItemMap).sort((a, b) => {
            return a[0] - b[0];
        }));
        // convert to array
        const lineItems = Array.from(lineItemMapSorted.values());
        return lineItems;
    }
    processConfigurationInfoEntry(lineItemMap, configurationInfo) {
        if (configurationInfo.configurationLabel) {
            const configurationInfoSplit = configurationInfo.configurationLabel.split(ConfigurationInfoSpecialFields.LINE_ITEM_DELIMITER);
            if (configurationInfoSplit[0] === ConfigurationInfoSpecialFields.LINE_ITEM) {
                const configurationInfoValue = configurationInfo.configurationValue
                    ? configurationInfo.configurationValue
                    : '';
                this.addLineItemData(lineItemMap, configurationInfoSplit, configurationInfoValue);
            }
        }
    }
    addLineItemData(lineItemMap, configurationInfoSplit, configurationInfoValue) {
        if (configurationInfoSplit.length === 3) {
            const lineItemNumber = Number(configurationInfoSplit[1]);
            let lineItem;
            switch (configurationInfoSplit[2]) {
                case ConfigurationInfoFields.NAME:
                    lineItem = this.getOrCreateLineItem(lineItemMap, lineItemNumber);
                    lineItem.name = configurationInfoValue;
                    break;
                case ConfigurationInfoFields.QTY:
                    lineItem = this.getOrCreateLineItem(lineItemMap, lineItemNumber);
                    lineItem.formattedQuantity = configurationInfoValue;
                    break;
                case ConfigurationInfoFields.FORMATTED_PRICE:
                    lineItem = this.getOrCreateLineItem(lineItemMap, lineItemNumber);
                    lineItem.formattedPrice = configurationInfoValue;
                    break;
                case ConfigurationInfoFields.KEY:
                case ConfigurationInfoFields.PRICE_VALUE:
                    break;
                default: {
                    this.logWarning('Wrong LineItem format');
                }
            }
        }
        else {
            this.logWarning('Wrong LineItem format');
        }
    }
    getOrCreateLineItem(lineItemMap, lineItemNumber) {
        var _a;
        const lineItem = (_a = lineItemMap.get(lineItemNumber)) !== null && _a !== void 0 ? _a : {
            name: '',
            formattedQuantity: '',
            formattedPrice: '',
        };
        if (!lineItemMap.get(lineItemNumber)) {
            lineItemMap.set(lineItemNumber, lineItem);
        }
        return lineItem;
    }
    logWarning(text) {
        if (isDevMode()) {
            this.logger.warn(text);
        }
    }
}
ConfiguratorCartEntryBundleInfoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorCartEntryBundleInfoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Requires default change detection strategy, as the disabled state of the quantity from control may change,
 * which would not be proper detected with onPush strategy.
 */
class ConfiguratorCartEntryBundleInfoComponent {
    constructor(commonConfigUtilsService, configCartEntryBundleInfoService, breakpointService, translation, cartItemContext) {
        var _a, _b, _c, _d, _e, _f;
        this.commonConfigUtilsService = commonConfigUtilsService;
        this.configCartEntryBundleInfoService = configCartEntryBundleInfoService;
        this.breakpointService = breakpointService;
        this.translation = translation;
        this.cartItemContext = cartItemContext;
        this.orderEntry$ = (_b = (_a = this.cartItemContext) === null || _a === void 0 ? void 0 : _a.item$) !== null && _b !== void 0 ? _b : EMPTY;
        this.quantityControl$ = (_d = (_c = this.cartItemContext) === null || _c === void 0 ? void 0 : _c.quantityControl$) !== null && _d !== void 0 ? _d : EMPTY;
        this.readonly$ = (_f = (_e = this.cartItemContext) === null || _e === void 0 ? void 0 : _e.readonly$) !== null && _f !== void 0 ? _f : EMPTY;
        this.hideItems = true;
        this.lineItems$ = this.orderEntry$.pipe(map((entry) => this.configCartEntryBundleInfoService.retrieveLineItems(entry)));
        this.numberOfLineItems$ = this.lineItems$.pipe(map((items) => items.length));
        // TODO: remove the logic below when configurable products support "Saved Cart" and "Save For Later"
        this.shouldShowButton$ = this.commonConfigUtilsService.isActiveCartContext(this.cartItemContext);
    }
    /**
     * Toggles the state of the items list.
     */
    toggleItems() {
        this.hideItems = !this.hideItems;
    }
    /**
     * Verifies whether the configurator type is a bundle based one.
     *
     * @param {OrderEntry} entry - Order entry
     * @returns {boolean} - 'true' if the expected configurator type, otherwise 'false'
     */
    isBundleBasedConfigurator(entry) {
        var _a;
        const configInfos = entry.configurationInfos;
        return configInfos
            ? this.commonConfigUtilsService.isBundleBasedConfigurator((_a = configInfos[0]) === null || _a === void 0 ? void 0 : _a.configuratorType)
            : false;
    }
    getButtonText(translatedText) {
        if (!translatedText) {
            translatedText = '';
        }
        if (this.hideItems) {
            this.translation
                .translate('configurator.header.show')
                .pipe(take(1))
                .subscribe((text) => (translatedText += text));
        }
        else {
            this.translation
                .translate('configurator.header.hide')
                .pipe(take(1))
                .subscribe((text) => (translatedText += text));
        }
        return translatedText;
    }
    getItemsMsg(items) {
        let translatedText = '';
        this.translation
            .translate('configurator.a11y.cartEntryBundleInfo', { items: items })
            .pipe(take(1))
            .subscribe((text) => (translatedText = text));
        return this.getButtonText(translatedText);
    }
    getHiddenItemInfo(item) {
        let translatedText = '';
        if (item.name && item.formattedPrice && item.formattedQuantity) {
            this.translation
                .translate('configurator.a11y.cartEntryBundle', {
                name: item.name,
                price: item.formattedPrice,
                quantity: item.formattedQuantity,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else if (item.name && item.formattedPrice) {
            this.translation
                .translate('configurator.a11y.cartEntryBundleNameWithPrice', {
                name: item.name,
                price: item.formattedPrice,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else if (item.name && item.formattedQuantity) {
            this.translation
                .translate('configurator.a11y.cartEntryBundleNameWithQuantity', {
                name: item.name,
                quantity: item.formattedQuantity,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        else {
            this.translation
                .translate('configurator.a11y.cartEntryBundleName', {
                name: item.name,
            })
                .pipe(take(1))
                .subscribe((text) => (translatedText = text));
        }
        return translatedText;
    }
    getHiddenItemInfoId(index) {
        return 'cx-item-hidden-info-' + index.toString();
    }
}
ConfiguratorCartEntryBundleInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoComponent, deps: [{ token: CommonConfiguratorUtilsService }, { token: ConfiguratorCartEntryBundleInfoService }, { token: i1.BreakpointService }, { token: i4.TranslationService }, { token: i2.CartItemContext, optional: true }], target: i0.ɵɵFactoryTarget.Component });
ConfiguratorCartEntryBundleInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfiguratorCartEntryBundleInfoComponent, selector: "cx-configurator-cart-entry-bundle-info", ngImport: i0, template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"isBundleBasedConfigurator(orderEntry)\">\n    <ng-container *ngIf=\"numberOfLineItems$ | async as numberOfItems\">\n      <div class=\"cx-number-items\">\n        {{\n          'configurator.header.items' | cxTranslate: { count: numberOfItems }\n        }}\n      </div>\n      <button\n        (click)=\"toggleItems()\"\n        [attr.aria-expanded]=\"!this.hideItems\"\n        [attr.aria-label]=\"getItemsMsg(numberOfItems)\"\n      >\n        <div class=\"cx-toggle-hide-items\">\n          {{ getButtonText() }}\n        </div>\n      </button>\n\n      <div class=\"cx-item-infos\" [class.open]=\"!hideItems\">\n        <div\n          *ngFor=\"let lineItem of lineItems$ | async; let i = index\"\n          class=\"cx-item-info\"\n          attr.aria-describedby=\"{{ getHiddenItemInfoId(i) }}\"\n        >\n          <span id=\"{{ getHiddenItemInfoId(i) }}\" class=\"cx-visually-hidden\">\n            {{ getHiddenItemInfo(lineItem) }}\n          </span>\n          <div class=\"cx-item-name\" aria-hidden=\"true\">\n            {{ lineItem?.name }}\n          </div>\n          <div class=\"cx-item-quantity\" aria-hidden=\"true\">\n            <ng-container *ngIf=\"lineItem?.formattedQuantity\">\n              <span class=\"cx-identifier\">{{\n                'configurator.attribute.quantity' | cxTranslate\n              }}</span>\n              <span class=\"cx-item\">{{\n                lineItem?.formattedQuantity | cxNumeric\n              }}</span>\n            </ng-container>\n          </div>\n          <div class=\"cx-item-price\" aria-hidden=\"true\">\n            <ng-container *ngIf=\"lineItem?.formattedPrice\">\n              <span class=\"cx-identifier\">{{\n                'configurator.overviewForm.itemPrice' | cxTranslate\n              }}</span>\n              <span class=\"cx-item\">{{ lineItem?.formattedPrice }}</span>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"quantityControl$ | async as quantityControl\">\n      <cx-configure-cart-entry\n        *ngIf=\"(shouldShowButton$ | async) && orderEntry?.product?.configurable\"\n        [cartEntry]=\"orderEntry\"\n        [readOnly]=\"(readonly$ | async) ?? true\"\n        [msgBanner]=\"false\"\n        [disabled]=\"quantityControl.disabled\"\n      ></cx-configure-cart-entry\n    ></ng-container>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ConfigureCartEntryComponent, selector: "cx-configure-cart-entry", inputs: ["cartEntry", "readOnly", "msgBanner", "disabled"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i4.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i4.CxNumericPipe, name: "cxNumeric" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-configurator-cart-entry-bundle-info', template: "<ng-container *ngIf=\"orderEntry$ | async as orderEntry\">\n  <ng-container *ngIf=\"isBundleBasedConfigurator(orderEntry)\">\n    <ng-container *ngIf=\"numberOfLineItems$ | async as numberOfItems\">\n      <div class=\"cx-number-items\">\n        {{\n          'configurator.header.items' | cxTranslate: { count: numberOfItems }\n        }}\n      </div>\n      <button\n        (click)=\"toggleItems()\"\n        [attr.aria-expanded]=\"!this.hideItems\"\n        [attr.aria-label]=\"getItemsMsg(numberOfItems)\"\n      >\n        <div class=\"cx-toggle-hide-items\">\n          {{ getButtonText() }}\n        </div>\n      </button>\n\n      <div class=\"cx-item-infos\" [class.open]=\"!hideItems\">\n        <div\n          *ngFor=\"let lineItem of lineItems$ | async; let i = index\"\n          class=\"cx-item-info\"\n          attr.aria-describedby=\"{{ getHiddenItemInfoId(i) }}\"\n        >\n          <span id=\"{{ getHiddenItemInfoId(i) }}\" class=\"cx-visually-hidden\">\n            {{ getHiddenItemInfo(lineItem) }}\n          </span>\n          <div class=\"cx-item-name\" aria-hidden=\"true\">\n            {{ lineItem?.name }}\n          </div>\n          <div class=\"cx-item-quantity\" aria-hidden=\"true\">\n            <ng-container *ngIf=\"lineItem?.formattedQuantity\">\n              <span class=\"cx-identifier\">{{\n                'configurator.attribute.quantity' | cxTranslate\n              }}</span>\n              <span class=\"cx-item\">{{\n                lineItem?.formattedQuantity | cxNumeric\n              }}</span>\n            </ng-container>\n          </div>\n          <div class=\"cx-item-price\" aria-hidden=\"true\">\n            <ng-container *ngIf=\"lineItem?.formattedPrice\">\n              <span class=\"cx-identifier\">{{\n                'configurator.overviewForm.itemPrice' | cxTranslate\n              }}</span>\n              <span class=\"cx-item\">{{ lineItem?.formattedPrice }}</span>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n    </ng-container>\n    <ng-container *ngIf=\"quantityControl$ | async as quantityControl\">\n      <cx-configure-cart-entry\n        *ngIf=\"(shouldShowButton$ | async) && orderEntry?.product?.configurable\"\n        [cartEntry]=\"orderEntry\"\n        [readOnly]=\"(readonly$ | async) ?? true\"\n        [msgBanner]=\"false\"\n        [disabled]=\"quantityControl.disabled\"\n      ></cx-configure-cart-entry\n    ></ng-container>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () {
        return [{ type: CommonConfiguratorUtilsService }, { type: ConfiguratorCartEntryBundleInfoService }, { type: i1.BreakpointService }, { type: i4.TranslationService }, { type: i2.CartItemContext, decorators: [{
                        type: Optional
                    }] }];
    } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfiguratorCartEntryBundleInfoModule {
}
ConfiguratorCartEntryBundleInfoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfiguratorCartEntryBundleInfoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoModule, declarations: [ConfiguratorCartEntryBundleInfoComponent], imports: [CommonModule, I18nModule, ConfigureCartEntryModule] });
ConfiguratorCartEntryBundleInfoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoModule, providers: [
        provideOutlet({
            id: CartOutlets.ITEM_BUNDLE_DETAILS,
            position: OutletPosition.AFTER,
            component: ConfiguratorCartEntryBundleInfoComponent,
        }),
    ], imports: [CommonModule, I18nModule, ConfigureCartEntryModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorCartEntryBundleInfoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ConfigureCartEntryModule],
                    declarations: [ConfiguratorCartEntryBundleInfoComponent],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ITEM_BUNDLE_DETAILS,
                            position: OutletPosition.AFTER,
                            component: ConfiguratorCartEntryBundleInfoComponent,
                        }),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CommonConfiguratorComponentsModule {
}
CommonConfiguratorComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CommonConfiguratorComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorComponentsModule, imports: [ConfiguratorIssuesNotificationModule,
        ConfiguratorCartEntryInfoModule,
        ConfiguratorCartEntryBundleInfoModule,
        ConfigureCartEntryModule,
        ConfigureProductModule] });
CommonConfiguratorComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorComponentsModule, imports: [ConfiguratorIssuesNotificationModule,
        ConfiguratorCartEntryInfoModule,
        ConfiguratorCartEntryBundleInfoModule,
        ConfigureCartEntryModule,
        ConfigureProductModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ConfiguratorIssuesNotificationModule,
                        ConfiguratorCartEntryInfoModule,
                        ConfiguratorCartEntryBundleInfoModule,
                        ConfigureCartEntryModule,
                        ConfigureProductModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultOccConfiguratorProductConfig = {
    backend: {
        occ: {
            endpoints: {
                product: {
                    configurator: 'products/${productCode}?fields=code,configurable,configuratorType',
                    configuratorProductCard: 'products/${productCode}?fields=code,description,images(DEFAULT)',
                },
            },
        },
        loadingScopes: {
            product: {
                list: {
                    include: [ConfiguratorProductScope.CONFIGURATOR],
                },
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CommonConfiguratorOccModule {
}
CommonConfiguratorOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CommonConfiguratorOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorOccModule });
CommonConfiguratorOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorOccModule, providers: [provideDefaultConfig(defaultOccConfiguratorProductConfig)] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorOccModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [provideDefaultConfig(defaultOccConfiguratorProductConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CommonConfiguratorModule {
}
CommonConfiguratorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CommonConfiguratorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorModule, imports: [CommonConfiguratorOccModule, CommonConfiguratorComponentsModule] });
CommonConfiguratorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorModule, imports: [CommonConfiguratorOccModule, CommonConfiguratorComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CommonConfiguratorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonConfiguratorOccModule, CommonConfiguratorComponentsModule],
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
var ConfiguratorRouter;
(function (ConfiguratorRouter) {
    let PageType;
    (function (PageType) {
        PageType["CONFIGURATION"] = "configuration";
        PageType["OVERVIEW"] = "overview";
    })(PageType = ConfiguratorRouter.PageType || (ConfiguratorRouter.PageType = {}));
})(ConfiguratorRouter || (ConfiguratorRouter = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to extract the configuration owner key from the current route
 */
class ConfiguratorRouterExtractorService {
    constructor(configUtilsService, routingService) {
        this.configUtilsService = configUtilsService;
        this.routingService = routingService;
        this.ROUTE_FRAGMENT_CONFIGURE = 'configure';
        this.ROUTE_FRAGMENT_OVERVIEW = 'configureOverview';
    }
    extractRouterData() {
        return this.routingService.getRouterState().pipe(filter((routingData) => routingData.state.params.entityKey), 
        //we don't need to cover the intermediate router states where a future route is already known.
        //only changes to the URL are relevant. Otherwise we get wrong hits where e.g. the config form fires although
        //the OV already loads
        filter((routingData) => routingData.nextState === undefined), map((routingData) => {
            var _a, _b, _c, _d, _e, _f;
            const owner = this.createOwnerFromRouterState(routingData);
            const semanticRoute = routingData.state.semanticRoute;
            const routerData = {
                owner: owner,
                isOwnerCartEntry: owner.type === CommonConfigurator.OwnerType.CART_ENTRY,
                displayOnly: routingData.state.params.displayOnly,
                resolveIssues: ((_a = routingData.state.queryParams) === null || _a === void 0 ? void 0 : _a.resolveIssues) === 'true',
                skipConflicts: ((_b = routingData.state.queryParams) === null || _b === void 0 ? void 0 : _b.skipConflicts) === 'true',
                forceReload: ((_c = routingData.state.queryParams) === null || _c === void 0 ? void 0 : _c.forceReload) === 'true',
                expMode: ((_d = routingData.state.queryParams) === null || _d === void 0 ? void 0 : _d.expMode) === 'true',
                displayRestartDialog: ((_e = routingData.state.queryParams) === null || _e === void 0 ? void 0 : _e.displayRestartDialog) === 'true',
                configIdTemplate: (_f = routingData.state.queryParams) === null || _f === void 0 ? void 0 : _f.configIdTemplate,
                navigationId: routingData.navigationId,
                pageType: semanticRoute &&
                    semanticRoute.includes(this.ROUTE_FRAGMENT_OVERVIEW)
                    ? ConfiguratorRouter.PageType.OVERVIEW
                    : ConfiguratorRouter.PageType.CONFIGURATION,
            };
            return routerData;
        }));
    }
    createOwnerFromRouterState(routerState) {
        const owner = ConfiguratorModelUtils.createInitialOwner();
        const params = routerState.state.params;
        if (params.ownerType) {
            const entityKey = params.entityKey;
            owner.type = params.ownerType;
            owner.id = entityKey;
        }
        else {
            owner.type = CommonConfigurator.OwnerType.PRODUCT;
            owner.id = params.rootProduct;
        }
        const semanticRoute = routerState.state.semanticRoute;
        if (semanticRoute) {
            const configuratorType = this.getConfiguratorTypeFromSemanticRoute(semanticRoute);
            owner.configuratorType = configuratorType;
        }
        this.configUtilsService.setOwnerKey(owner);
        return owner;
    }
    /**
     * Compiles the configurator type from the semantic route
     * @param semanticRoute Consists of a prefix that indicates if target is interactive configuration or overview and
     *                      the commerce configurator type as postfix.
     *                      Example: configureTEXTFIELD or configureOverviewCPQCONFIGURATOR
     * @returns Configurator type
     */
    getConfiguratorTypeFromSemanticRoute(semanticRoute) {
        if (semanticRoute.startsWith(this.ROUTE_FRAGMENT_OVERVIEW)) {
            return semanticRoute.split(this.ROUTE_FRAGMENT_OVERVIEW)[1];
        }
        else if (semanticRoute.startsWith(this.ROUTE_FRAGMENT_CONFIGURE)) {
            return semanticRoute.split(this.ROUTE_FRAGMENT_CONFIGURE)[1];
        }
        else {
            throw new Error('Not able to determine configurator type');
        }
    }
}
ConfiguratorRouterExtractorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterExtractorService, deps: [{ token: CommonConfiguratorUtilsService }, { token: i4.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
ConfiguratorRouterExtractorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterExtractorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfiguratorRouterExtractorService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: CommonConfiguratorUtilsService }, { type: i4.RoutingService }]; } });

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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { CommonConfigurator, CommonConfiguratorComponentsModule, CommonConfiguratorModule, CommonConfiguratorOccModule, CommonConfiguratorUtilsService, ConfigurationInfoFields, ConfigurationInfoSpecialFields, ConfiguratorCartEntryBundleInfoComponent, ConfiguratorCartEntryBundleInfoModule, ConfiguratorCartEntryBundleInfoService, ConfiguratorCartEntryInfoComponent, ConfiguratorCartEntryInfoModule, ConfiguratorIssuesNotificationComponent, ConfiguratorIssuesNotificationModule, ConfiguratorModelUtils, ConfiguratorProductScope, ConfiguratorRouter, ConfiguratorRouterExtractorService, ConfigureCartEntryComponent, ConfigureCartEntryModule, ConfigureProductComponent, ConfigureProductModule, OrderEntryStatus };
//# sourceMappingURL=spartacus-product-configurator-common.mjs.map
