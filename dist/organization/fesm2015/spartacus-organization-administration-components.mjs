import * as i0 from '@angular/core';
import { Injectable, Directive, NgModule, PLATFORM_ID, Inject, HostBinding, Component, ChangeDetectionStrategy, Injector, ChangeDetectorRef, ViewContainerRef, ViewChild, Input, inject } from '@angular/core';
import * as i3 from '@spartacus/core';
import { GlobalMessageType, isNotNullable, I18nModule, UrlModule, FeaturesConfigModule, isNotUndefined, DefaultRoutePageMetaResolver, AuthGuard, provideDefaultConfig, provideDefaultConfigFactory, CurrencyService, B2BUserRole, FeatureConfigService } from '@spartacus/core';
import * as i3$1 from '@angular/common';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as i7 from '@angular/forms';
import { FormsModule, UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import * as i4 from '@angular/router';
import { RouterModule } from '@angular/router';
import { map, distinctUntilChanged, switchMap, filter, tap, first, take, startWith, withLatestFrom, shareReplay } from 'rxjs/operators';
import * as i1 from '@spartacus/storefront';
import { FormUtils, ICON_TYPE, IconModule, KeyboardFocusModule, ViewComponent, SplitViewModule, PopoverModule, TableLayout, TrapFocus, TableModule, PaginationModule, CustomFormValidators, FormErrorsModule, DatePickerModule, BREAKPOINT, PasswordVisibilityToggleModule } from '@spartacus/storefront';
import { of, BehaviorSubject, EMPTY, ReplaySubject, Subject, Subscription } from 'rxjs';
import { ROUTE_PARAMS } from '@spartacus/organization/administration/root';
import * as i2 from '@spartacus/organization/administration/core';
import { LoadStatus, AdminGuard, OrgUnitService, Period, OrgUnitGuard, UserGuard } from '@spartacus/organization/administration/core';
import * as i6 from '@ng-select/ng-select';
import { NgSelectModule } from '@ng-select/ng-select';
import { __rest } from 'tslib';
import * as i2$1 from '@spartacus/user/profile/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Abstract Base class for all organization entities. This class simplifies
 * the various entity implementation, that only differ by dependencies and
 * data model.
 */
class CurrentItemService {
    constructor(routingService) {
        this.routingService = routingService;
        /**
         * Observes the key for the active organization item. The active key is observed
         * from the list of route parameters. The full route parameter list is evaluated,
         * including child routes.
         *
         * To allow for specific ("semantic") route parameters, the route parameter _key_ is
         * retrieved from the `getParamKey`.
         */
        this.key$ = this.routingService.getParams().pipe(map((params) => params[this.getParamKey()]), distinctUntilChanged());
        /**
         * Observes the active item.
         *
         * The active item is loaded by the active `key$`.
         */
        this.item$ = this.key$.pipe(switchMap((code) => (code ? this.getItem(code) : of(undefined))));
        /**
         * Observes the b2bUnit based on the unitCode route parameter.
         */
        this.b2bUnit$ = this.routingService.getParams().pipe(map((params) => params[ROUTE_PARAMS.unitCode]), distinctUntilChanged());
    }
    getRouterParam(paramKey) {
        return this.routingService
            .getParams()
            .pipe(map((params) => params[paramKey]));
    }
}
CurrentItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentItemService, deps: [{ token: i3.RoutingService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentItemService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentItemService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i3.RoutingService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FormService {
    getForm(item) {
        var _a, _b;
        if (this.form && !!item) {
            this.patchData(item);
            return this.form;
        }
        if (!this.form) {
            this.build(item);
        }
        // while we should be able to reset with initial value, this doesn't always work
        // hence, we're patching afterwards.
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.reset();
        (_b = this.form) === null || _b === void 0 ? void 0 : _b.enable();
        this.patchData(item);
        return this.form;
    }
    patchData(item) {
        var _a;
        this.toggleFreeze(item);
        (_a = this.form) === null || _a === void 0 ? void 0 : _a.patchValue(Object.assign(Object.assign({}, this.defaultValue), item));
    }
    toggleFreeze(item) {
        var _a, _b;
        if (((_a = this.form) === null || _a === void 0 ? void 0 : _a.enabled) && (item === null || item === void 0 ? void 0 : item.active) === false) {
            this.form.disable();
        }
        if (((_b = this.form) === null || _b === void 0 ? void 0 : _b.disabled) && (item === null || item === void 0 ? void 0 : item.active) === true) {
            this.form.enable();
        }
    }
    /**
     * returns the default form value.
     */
    get defaultValue() {
        return {};
    }
}
FormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormService, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Provides CRUD operations for all organization entities.
 *
 * This base class simplifies the various entity implementation, and ensures a consistent
 * component implementation.
 */
class ItemService {
    constructor(currentItemService, routingService, formService) {
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.key$ = this.currentItemService.key$;
        this.current$ = this.currentItemService.item$;
        this.isInEditMode$ = new BehaviorSubject(false);
        /**
         * Returns the current business unit code.
         *
         * The current unit is driven by the route parameter.
         */
        this.unit$ = this.currentItemService.b2bUnit$;
        this.error$ = this.key$.pipe(switchMap((key) => this.currentItemService.getError(key)));
    }
    save(form, key) {
        if (form.invalid) {
            form.markAllAsTouched();
            FormUtils.deepUpdateValueAndValidity(form);
            return EMPTY;
        }
        else {
            /**
             * This assignment is needed to re-use form value after `form.disable()` call
             * In some cases value was converted by `form.disable()` into empty object
             */
            const formValue = form.value;
            form.disable();
            return key ? this.update(key, formValue) : this.create(formValue);
        }
    }
    getForm(item) {
        return this.formService.getForm(item);
    }
    /**
     * Launches the detailed route for the given item item.
     */
    launchDetails(item) {
        const cxRoute = this.getDetailsRoute();
        const params = this.buildRouteParams(item);
        if (cxRoute && item && Object.keys(item).length > 0) {
            this.routingService.go({ cxRoute, params });
        }
    }
    /**
     * Returns the route parameters that are used when launching the
     * details page. The route parameters default to the actual item,
     * but can be further populated in implementations.
     *
     * Customized route parameters are useful in case the actual item
     * doesn't match the expected route parameters. You can manipulate
     * the parameter data.
     */
    buildRouteParams(item) {
        return item;
    }
    getRouterParam(key) {
        return this.currentItemService.getRouterParam(key);
    }
    /**
     * Sets to true when the user is on the entity item form page
     */
    setEditMode(isInEdit) {
        this.isInEditMode$.next(isInEdit);
    }
}
ItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemService, deps: [{ token: CurrentItemService }, { token: i3.RoutingService }, { token: FormService }], target: i0.ɵɵFactoryTarget.Injectable });
ItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CurrentItemService }, { type: i3.RoutingService }, { type: FormService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const DEFAULT_INFO_TIMEOUT = 3000;
class MessageService {
    constructor() {
        this.data$ = new ReplaySubject();
    }
    get() {
        return this.data$;
    }
    add(message) {
        message = Object.assign(Object.assign({}, this.getDefaultMessage(message)), message);
        message.events = new Subject();
        this.data$.next(message);
        return message.events;
    }
    close(message) {
        message === null || message === void 0 ? void 0 : message.next({ close: true });
    }
    /**
     * Sets the message type to INFO, and adds a default timeout
     * for info messages.
     */
    getDefaultMessage(message) {
        const defaultMessage = {
            type: GlobalMessageType.MSG_TYPE_INFO,
        };
        if (!message.type ||
            (message.type === GlobalMessageType.MSG_TYPE_INFO && !message.timeout)) {
            defaultMessage.timeout = DEFAULT_INFO_TIMEOUT;
        }
        return defaultMessage;
    }
    clear() {
        this.data$.next(undefined); // TODO: CXSPA-3088 Type incongruity
    }
}
MessageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MessageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageService, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ItemActiveDirective {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
    }
    ngOnInit() {
        this.subscription = this.itemService.current$
            .pipe(distinctUntilChanged((previous, current) => (previous === null || previous === void 0 ? void 0 : previous.active) === (current === null || current === void 0 ? void 0 : current.active)), filter(isNotNullable), filter((item) => item.active === false))
            .subscribe((item) => this.handleDisabledItems(item));
    }
    handleDisabledItems(item) {
        this.messageService.add({
            message: {
                key: 'organization.notification.disabled',
                params: { item },
            },
            type: GlobalMessageType.MSG_TYPE_ERROR,
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
ItemActiveDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemActiveDirective, deps: [{ token: ItemService }, { token: MessageService }], target: i0.ɵɵFactoryTarget.Directive });
ItemActiveDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ItemActiveDirective, selector: "[cxOrgItemActive]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemActiveDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxOrgItemActive]',
                }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: MessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ItemActiveModule {
}
ItemActiveModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemActiveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ItemActiveModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ItemActiveModule, declarations: [ItemActiveDirective], imports: [CommonModule], exports: [ItemActiveDirective] });
ItemActiveModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemActiveModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemActiveModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [ItemActiveDirective],
                    exports: [ItemActiveDirective],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MessageData {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// eslint-disable-next-line @angular-eslint/directive-class-suffix
class BaseMessageComponent {
    constructor(messageData, platformId) {
        this.messageData = messageData;
        this.platformId = platformId;
        this.terminated = false;
    }
    ngOnInit() {
        var _a;
        this.message = (_a = this.messageData.message) !== null && _a !== void 0 ? _a : {};
        this.messageTitle = this.messageData.messageTitle;
        this.type = this.resolveType();
        this.messageIcon = this.messageData.messageIcon;
        if (this.messageData.timeout) {
            this.handleAutoHide();
        }
    }
    close() {
        var _a;
        (_a = this.messageData.events) === null || _a === void 0 ? void 0 : _a.next({ close: true });
    }
    resolveType() {
        if (!this.messageData.type ||
            this.messageData.type === GlobalMessageType.MSG_TYPE_INFO) {
            return 'info';
        }
        if (this.messageData.type === GlobalMessageType.MSG_TYPE_ERROR) {
            return 'error';
        }
        if (this.messageData.type === GlobalMessageType.MSG_TYPE_WARNING) {
            return 'warning';
        }
    }
    handleAutoHide() {
        if (isPlatformBrowser(this.platformId)) {
            // we don't want to run this logic when doing SSR
            setTimeout(() => {
                this.close();
            }, this.messageData.timeout);
        }
    }
}
BaseMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseMessageComponent, deps: [{ token: MessageData }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Directive });
BaseMessageComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: BaseMessageComponent, host: { properties: { "class": "this.type", "class.terminated": "this.terminated" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BaseMessageComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () {
        return [{ type: MessageData }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }];
    }, propDecorators: { type: [{
                type: HostBinding,
                args: ['class']
            }], terminated: [{
                type: HostBinding,
                args: ['class.terminated']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class NotificationMessageComponent extends BaseMessageComponent {
    constructor() {
        super(...arguments);
        this.closeIcon = ICON_TYPE.CLOSE;
    }
}
NotificationMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
NotificationMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: NotificationMessageComponent, selector: "cx-org-notification", usesInheritance: true, ngImport: i0, template: "<div\n  class=\"inner\"\n  [cxFocus]=\"{ autofocus: true, focusOnEscape: true }\"\n  (esc)=\"close()\"\n>\n  <cx-icon *ngIf=\"messageIcon\" [type]=\"messageIcon\"></cx-icon>\n  <p>{{ message | cxTranslate }}</p>\n  <button class=\"close\" (click)=\"close()\" type=\"button\">\n    <cx-icon [type]=\"closeIcon\"></cx-icon>\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-notification', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"inner\"\n  [cxFocus]=\"{ autofocus: true, focusOnEscape: true }\"\n  (esc)=\"close()\"\n>\n  <cx-icon *ngIf=\"messageIcon\" [type]=\"messageIcon\"></cx-icon>\n  <p>{{ message | cxTranslate }}</p>\n  <button class=\"close\" (click)=\"close()\" type=\"button\">\n    <cx-icon [type]=\"closeIcon\"></cx-icon>\n  </button>\n</div>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MessageRenderService {
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    getComponent(msg) {
        return this.componentFactoryResolver.resolveComponentFactory(msg.component || NotificationMessageComponent);
    }
    getInjector(componentData, parent) {
        return Injector.create({
            providers: [
                {
                    provide: MessageData,
                    useValue: componentData,
                },
            ],
            parent,
        });
    }
}
MessageRenderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageRenderService, deps: [{ token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
MessageRenderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageRenderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageRenderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MessageComponent {
    constructor(messageService, renderService) {
        this.messageService = messageService;
        this.renderService = renderService;
        this.subscription = new Subscription();
    }
    ngAfterViewInit() {
        this.subscription.add(this.messageService.get().subscribe((msg) => {
            var _a;
            if (msg) {
                this.render(msg);
            }
            else {
                (_a = this.vcr) === null || _a === void 0 ? void 0 : _a.clear();
            }
        }));
    }
    render(msg) {
        var _a;
        const ref = this.vcr.createComponent(this.renderService.getComponent(msg), 0, this.renderService.getInjector(msg, this.vcr.injector));
        ref.injector.get(ChangeDetectorRef).markForCheck();
        this.subscription.add((_a = msg.events) === null || _a === void 0 ? void 0 : _a.pipe(filter((event) => !!event.close)).subscribe(() => this.terminate(ref)));
    }
    /**
     * Terminates the message component in 2 steps. It starts to toggle the terminate
     * state of the component and shortly after destroys the component completely. The
     * termination state allows the CSS layer to play an animation before destroying.
     */
    terminate(ref) {
        ref.instance.terminated = true;
        ref.injector.get(ChangeDetectorRef).markForCheck();
        setTimeout(() => {
            ref.destroy();
        }, 500);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
MessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageComponent, deps: [{ token: MessageService }, { token: MessageRenderService }], target: i0.ɵɵFactoryTarget.Component });
MessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MessageComponent, selector: "cx-org-message", viewQueries: [{ propertyName: "vcr", first: true, predicate: ["vcr"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: "<ng-container #vcr></ng-container>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-message', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container #vcr></ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: MessageService }, { type: MessageRenderService }]; }, propDecorators: { vcr: [{
                type: ViewChild,
                args: ['vcr', { read: ViewContainerRef }]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class NotificationMessageModule {
}
NotificationMessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NotificationMessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageModule, declarations: [NotificationMessageComponent], imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
NotificationMessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageModule, imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NotificationMessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
                    declarations: [NotificationMessageComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MessageModule {
}
MessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MessageModule, declarations: [MessageComponent], imports: [CommonModule, NotificationMessageModule], exports: [MessageComponent] });
MessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageModule, imports: [CommonModule, NotificationMessageModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, NotificationMessageModule],
                    declarations: [MessageComponent],
                    exports: [MessageComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CardComponent {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
        this.previous = true;
        this.showHint = false;
        this.iconTypes = ICON_TYPE;
        this.item$ = this.itemService.current$.pipe(tap((item) => this.refreshMessages(item)));
    }
    /**
     * The views are router based, which means if we close a view, the router outlet is
     * cleaned immediately. To prevent this, we're closing the view manually, before
     * navigating back.
     */
    closeView(event) {
        event.stopPropagation();
        this.view.toggle(true);
        setTimeout(() => {
            var _a, _b;
            (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.click();
        }, 500);
        return false;
    }
    get previousLabel() {
        return this.previous;
    }
    refreshMessages(item) {
        var _a, _b;
        if (this.itemKey !== undefined &&
            (item === null || item === void 0 ? void 0 : item.code) !== this.itemKey &&
            (item === null || item === void 0 ? void 0 : item.uid) !== this.itemKey &&
            (item === null || item === void 0 ? void 0 : item.customerId) !== this.itemKey) {
            this.messageService.clear();
        }
        this.itemKey = (_b = (_a = item === null || item === void 0 ? void 0 : item.code) !== null && _a !== void 0 ? _a : item === null || item === void 0 ? void 0 : item.uid) !== null && _b !== void 0 ? _b : item === null || item === void 0 ? void 0 : item.customerId;
    }
}
CardComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CardComponent, deps: [{ token: ItemService }, { token: MessageService }], target: i0.ɵɵFactoryTarget.Component });
CardComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CardComponent, selector: "cx-org-card", inputs: { i18nRoot: "i18nRoot", previous: "previous", subtitle: "subtitle", showHint: "showHint" }, host: { classAttribute: "content-wrapper" }, providers: [MessageService], viewQueries: [{ propertyName: "view", first: true, predicate: ViewComponent, descendants: true, read: ViewComponent }], ngImport: i0, template: "<cx-view class=\"card\">\n  <div class=\"header\">\n    <div class=\"title-bar\">\n      <div class=\"title\">\n        <h3>\n          {{ i18nRoot + '.title' | cxTranslate: { item: item$ | async } }}\n          <button\n            *ngIf=\"showHint\"\n            [cxPopover]=\"detailHint\"\n            [cxPopoverOptions]=\"{\n              placement: 'auto',\n              class: 'hint-popover',\n              appendToBody: true,\n              displayCloseButton: true\n            }\"\n            [attr.aria-label]=\"'organization.information' | cxTranslate\"\n          >\n            <cx-icon [type]=\"iconTypes.INFO\"> </cx-icon>\n          </button>\n        </h3>\n        <h4>\n          {{\n            subtitle ||\n              (i18nRoot + '.subtitle' | cxTranslate: { item: item$ | async })\n          }}\n        </h4>\n      </div>\n      <div class=\"actions\">\n        <ng-content select=\"[actions]\"></ng-content>\n      </div>\n    </div>\n    <button\n      *ngIf=\"!!previous\"\n      class=\"link close\"\n      [attr.aria-label]=\"'common.close' | cxTranslate\"\n      routerLink=\"../\"\n    >\n      <cx-icon\n        *ngIf=\"previous === true; else prevLabel\"\n        type=\"CLOSE\"\n        (click)=\"closeView($event)\"\n      ></cx-icon>\n      <ng-template #prevLabel>{{ previousLabel | cxTranslate }}</ng-template>\n    </button>\n  </div>\n\n  <div class=\"main\">\n    <cx-org-message></cx-org-message>\n    <ng-content select=\"[info]\"></ng-content>\n    <ng-content select=\"[main]\"></ng-content>\n  </div>\n</cx-view>\n\n<router-outlet></router-outlet>\n\n<ng-template #detailHint>\n  <p>\n    {{ i18nRoot + '.hint' | cxTranslate }}\n  </p>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.ViewComponent, selector: "cx-view", inputs: ["position", "hidden"], outputs: ["hiddenChange"] }, { kind: "directive", type: i4.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: MessageComponent, selector: "cx-org-message" }, { kind: "directive", type: i1.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CardComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-card', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [MessageService], template: "<cx-view class=\"card\">\n  <div class=\"header\">\n    <div class=\"title-bar\">\n      <div class=\"title\">\n        <h3>\n          {{ i18nRoot + '.title' | cxTranslate: { item: item$ | async } }}\n          <button\n            *ngIf=\"showHint\"\n            [cxPopover]=\"detailHint\"\n            [cxPopoverOptions]=\"{\n              placement: 'auto',\n              class: 'hint-popover',\n              appendToBody: true,\n              displayCloseButton: true\n            }\"\n            [attr.aria-label]=\"'organization.information' | cxTranslate\"\n          >\n            <cx-icon [type]=\"iconTypes.INFO\"> </cx-icon>\n          </button>\n        </h3>\n        <h4>\n          {{\n            subtitle ||\n              (i18nRoot + '.subtitle' | cxTranslate: { item: item$ | async })\n          }}\n        </h4>\n      </div>\n      <div class=\"actions\">\n        <ng-content select=\"[actions]\"></ng-content>\n      </div>\n    </div>\n    <button\n      *ngIf=\"!!previous\"\n      class=\"link close\"\n      [attr.aria-label]=\"'common.close' | cxTranslate\"\n      routerLink=\"../\"\n    >\n      <cx-icon\n        *ngIf=\"previous === true; else prevLabel\"\n        type=\"CLOSE\"\n        (click)=\"closeView($event)\"\n      ></cx-icon>\n      <ng-template #prevLabel>{{ previousLabel | cxTranslate }}</ng-template>\n    </button>\n  </div>\n\n  <div class=\"main\">\n    <cx-org-message></cx-org-message>\n    <ng-content select=\"[info]\"></ng-content>\n    <ng-content select=\"[main]\"></ng-content>\n  </div>\n</cx-view>\n\n<router-outlet></router-outlet>\n\n<ng-template #detailHint>\n  <p>\n    {{ i18nRoot + '.hint' | cxTranslate }}\n  </p>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: MessageService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], previous: [{
                type: Input
            }], subtitle: [{
                type: Input
            }], showHint: [{
                type: Input
            }], view: [{
                type: ViewChild,
                args: [ViewComponent, { read: ViewComponent }]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Provides a reusable card UI component for the organization split views.
 *
 * The component does not intend to provide a complete set of card features, it's just
 * a reusable component inside the organization UI.
 */
class CardModule {
}
CardModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CardModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CardModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CardModule, declarations: [CardComponent], imports: [CommonModule,
        SplitViewModule,
        RouterModule,
        I18nModule,
        IconModule,
        UrlModule,
        MessageModule,
        PopoverModule], exports: [CardComponent] });
CardModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CardModule, imports: [CommonModule,
        SplitViewModule,
        RouterModule,
        I18nModule,
        IconModule,
        UrlModule,
        MessageModule,
        PopoverModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CardModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        SplitViewModule,
                        RouterModule,
                        I18nModule,
                        IconModule,
                        UrlModule,
                        MessageModule,
                        PopoverModule,
                    ],
                    declarations: [CardComponent],
                    exports: [CardComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const DISABLED_STATUS = 'DISABLED';
/**
 * Reusable component for creating and editing organization items. The component does not
 * know anything about form specific.
 */
class FormComponent {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
        this.animateBack = true;
        this.form$ = this.itemService.current$.pipe(map((item) => {
            this.setI18nRoot(item);
            if (!item) {
                // we trick the form builder...
                item = {};
            }
            return this.itemService.getForm(item);
        }));
        /**
         * To handle the case of receiving a negative response during creation an item
         */
        this.disabled$ = this.form$.pipe(switchMap((form) => { var _a; return (_a = form === null || form === void 0 ? void 0 : form.statusChanges) !== null && _a !== void 0 ? _a : EMPTY; }), map((status) => status === DISABLED_STATUS));
    }
    save(form) {
        this.itemService.key$
            .pipe(first(), switchMap((key) => this.itemService.save(form, key).pipe(take(1), map((data) => ({
            item: data.item,
            status: data.status,
            action: key ? 'update' : 'create',
        })))))
            .subscribe(({ item, action, status }) => {
            if (status === LoadStatus.SUCCESS) {
                this.itemService.launchDetails(item);
                this.notify(item, action);
            }
            form.enable();
        });
    }
    notify(item, action) {
        this.messageService.add({
            message: {
                key: `${this.i18nRoot}.messages.${action}`,
                params: {
                    item,
                },
            },
        });
    }
    setI18nRoot(item) {
        // concatenate the i18n root with .edit or .create suffix
        this.i18n = this.i18nRoot + (item ? '.edit' : '.create');
    }
    back(event, card) {
        if (this.animateBack) {
            card.closeView(event);
        }
    }
    ngOnInit() {
        this.itemService.setEditMode(true);
    }
    ngOnDestroy() {
        this.itemService.setEditMode(false);
    }
}
FormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormComponent, deps: [{ token: ItemService }, { token: MessageService }], target: i0.ɵɵFactoryTarget.Component });
FormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: FormComponent, selector: "cx-org-form", inputs: { i18nRoot: "i18nRoot", animateBack: "animateBack", subtitle: "subtitle" }, host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<form *ngIf=\"form$ | async as form\" (submit)=\"save(form)\">\n  <cx-org-card\n    #card\n    [previous]=\"false\"\n    [i18nRoot]=\"i18n\"\n    cxOrgItemActive\n    [subtitle]=\"subtitle\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <button\n      actions\n      class=\"button primary\"\n      [disabled]=\"form.disabled || (disabled$ | async)\"\n    >\n      {{ 'organization.save' | cxTranslate }}\n    </button>\n    <button actions class=\"link\" routerLink=\"../\" type=\"button\">\n      <!--\n        We leverage the soft-close feature from the split view, so that the animation\n        has time to kick in before the router outlet is deleted.\n       -->\n      <span (click)=\"back($event, card)\">{{\n        'organization.cancel' | cxTranslate\n      }}</span>\n    </button>\n\n    <section main class=\"details\">\n      <ng-content select=\"[main]\" ngProjectAs=\"[main]\"></ng-content>\n    </section>\n  </cx-org-card>\n</form>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: ItemActiveDirective, selector: "[cxOrgItemActive]" }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, template: "<form *ngIf=\"form$ | async as form\" (submit)=\"save(form)\">\n  <cx-org-card\n    #card\n    [previous]=\"false\"\n    [i18nRoot]=\"i18n\"\n    cxOrgItemActive\n    [subtitle]=\"subtitle\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <button\n      actions\n      class=\"button primary\"\n      [disabled]=\"form.disabled || (disabled$ | async)\"\n    >\n      {{ 'organization.save' | cxTranslate }}\n    </button>\n    <button actions class=\"link\" routerLink=\"../\" type=\"button\">\n      <!--\n        We leverage the soft-close feature from the split view, so that the animation\n        has time to kick in before the router outlet is deleted.\n       -->\n      <span (click)=\"back($event, card)\">{{\n        'organization.cancel' | cxTranslate\n      }}</span>\n    </button>\n\n    <section main class=\"details\">\n      <ng-content select=\"[main]\" ngProjectAs=\"[main]\"></ng-content>\n    </section>\n  </cx-org-card>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: MessageService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], animateBack: [{
                type: Input
            }], subtitle: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class FormModule {
}
FormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FormModule, declarations: [FormComponent], imports: [CommonModule,
        FormsModule,
        I18nModule,
        RouterModule,
        CardModule,
        MessageModule,
        ItemActiveModule,
        KeyboardFocusModule], exports: [FormComponent] });
FormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormModule, providers: [MessageService], imports: [CommonModule,
        FormsModule,
        I18nModule,
        RouterModule,
        CardModule,
        MessageModule,
        ItemActiveModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        I18nModule,
                        RouterModule,
                        CardModule,
                        MessageModule,
                        ItemActiveModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [FormComponent],
                    providers: [MessageService],
                    exports: [FormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var CreateButtonType;
(function (CreateButtonType) {
    CreateButtonType["LINK"] = "LINK";
    CreateButtonType["BUTTON"] = "BUTTON";
})(CreateButtonType || (CreateButtonType = {}));
/**
 * The `ListService` deals with the table structure, list data and
 * pagination of tables inside the b2b organization.
 *
 * @property {OrganizationTableType} tableType
 *   Used to load the table structure configuration and generate table outlets.
 * @property {PaginationModel} pagination$
 *   The pagination state of the listing.
 */
class ListService {
    get viewType() {
        return this.tableType;
    }
    get domainType() {
        var _a;
        return (_a = this._domainType) !== null && _a !== void 0 ? _a : this.viewType;
    }
    constructor(tableService) {
        this.tableService = tableService;
        /**
         * The default table structure is used to add the default configuration for all
         * organization list related tables. This avoids a lot of boilerplate configuration.
         */
        this.defaultTableStructure = {
            options: { layout: TableLayout.VERTICAL_STACKED },
            lg: { options: { layout: TableLayout.VERTICAL } },
        };
        /**
         * The ghost data contains an empty list of objects that is used in the UI
         * to render the HTML elements.
         *
         * This list contains 10 items, so that the ghost will show 10 rows by default.
         */
        this.ghostData = { values: new Array(10) };
        this.notification$ = new Subject();
        /**
         * The pagination state of the listing.
         *
         * The pagination size defaults to 10, but can be overridden by the
         * table configuration for each entity type.
         */
        this.pagination$ = new BehaviorSubject({
            pageSize: 10,
        });
    }
    /**
     * Indicates the unique key for the item model. The key is different for various
     * organizations, i.e. `budget.code`, `user.uid`.
     */
    key() {
        return 'code';
    }
    /**
     * Loads the data by delegating to the `load` method, which must be implemented
     * in specific implementations of this abstract class.
     *
     * The load method is streamed from the `pagination$` stream, which is initialized
     * with default pagination and structure drive properties.
     */
    getData(...args) {
        return this.pagination$.pipe(
        // we merge any configured pagination from the table structure
        switchMap((pagination) => this.getStructure().pipe(map((config) => { var _a; return (Object.assign(Object.assign({}, pagination), (_a = config.options) === null || _a === void 0 ? void 0 : _a.pagination)); }))), switchMap((pagination) => this.load(pagination, ...args)), startWith(this.ghostData));
    }
    /**
     * Returns the `TableStructure` for the `OrganizationTableType`.
     *
     * The table structure is build by the `TableService` based on configuration.
     * The `defaultTableStructure` is deep merged as a fallback configuration.
     */
    getStructure() {
        return this.tableService.buildStructure(this.viewType, this.defaultTableStructure);
    }
    /**
     * Views the page.
     */
    view(pagination, nextPage) {
        this.pagination$.next(Object.assign(Object.assign({}, pagination), { currentPage: nextPage }));
    }
    /**
     * Updates the sort code for the PaginationModel.
     *
     * The `currentPage` is reset to 0.
     */
    sort(pagination, _obsoleteSort) {
        this.view(pagination, 0);
    }
    /**
     * Indicates whether the given data equals to the ghost data.
     *
     * This is used to validate the initial loading state, which is
     * different from the loading state; the loading state occurs
     * while sorting and paginating, where as the initial loading state
     * only happens at the very first load.
     */
    hasGhostData(data) {
        return data === this.ghostData;
    }
    /**
     * This method will return what kind of UI element to be used for create option in UI
     */
    getCreateButtonType() {
        return CreateButtonType.LINK;
    }
    /**
     * This method will be called when the button to create new item is clicked.
     */
    onCreateButtonClick() { }
    /**
     * This method will return the label for create button
     */
    getCreateButtonLabel() {
        return { key: 'organization.add' };
    }
}
ListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListService, deps: [{ token: i1.TableService }], target: i0.ɵɵFactoryTarget.Injectable });
ListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.TableService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ListComponent {
    constructor(service, organizationItemService) {
        this.service = service;
        this.organizationItemService = organizationItemService;
        this.trapFocus = TrapFocus;
        this.hasGhostData = false;
        this.viewType = this.service.viewType;
        this.domainType = this.service.domainType;
        this.iconTypes = ICON_TYPE;
        this.createButtonAllTypes = CreateButtonType;
        this.createButtonType = this.service.getCreateButtonType();
        /**
         * The current key represents the current selected item from the dataset.
         * This key is used to load the item details as well as highlight the item in
         * a list of items.
         */
        this.currentKey$ = this.organizationItemService.key$;
        this.structure$ = this.service.getStructure();
        this.listData$ = this.service
            .getData()
            .pipe(tap((data) => {
            var _a;
            this.sortCode = (_a = data === null || data === void 0 ? void 0 : data.pagination) === null || _a === void 0 ? void 0 : _a.sort;
            this.hasGhostData = this.service.hasGhostData(data);
        }));
        this.key = this.service.key();
        this.hideAddButton = false;
    }
    /**
     * Returns the total number of items.
     */
    getListCount(dataTable) {
        var _a;
        return (_a = dataTable.pagination) === null || _a === void 0 ? void 0 : _a.totalResults;
    }
    /**
     * Browses to the given page number
     */
    browse(pagination, pageNumber) {
        if (pagination) {
            this.service.view(pagination, pageNumber);
        }
    }
    /**
     * Navigates to the detailed view of the selected list item.
     */
    launchItem(event) {
        this.organizationItemService.launchDetails(event);
    }
    /**
     * Sorts the list.
     */
    sort(pagination) {
        if (pagination) {
            this.service.sort(Object.assign(Object.assign({}, pagination), { sort: this.sortCode }));
        }
    }
    /**
     * Function to call when 'Manage Users' button is clicked
     */
    onCreateButtonClick() {
        this.service.onCreateButtonClick();
    }
    /**
     * Returns the label for Create button
     */
    getCreateButtonLabel() {
        return this.service.getCreateButtonLabel();
    }
}
ListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListComponent, deps: [{ token: ListService }, { token: ItemService }], target: i0.ɵɵFactoryTarget.Component });
ListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ListComponent, selector: "cx-org-list", inputs: { key: "key", hideAddButton: "hideAddButton" }, host: { properties: { "class.ghost": "this.hasGhostData", "class": "this.viewType" } }, ngImport: i0, template: "<cx-split-view [hideMode]=\"false\">\n  <ng-container *ngIf=\"structure$ | async as structure\">\n    <cx-view class=\"list\" *ngIf=\"listData$ | async as data\">\n      <div class=\"header\">\n        <div class=\"title\">\n          <h3>\n            {{\n              viewType + '.header' | cxTranslate: { count: getListCount(data) }\n            }}\n            <button\n              [cxPopover]=\"listHint\"\n              [cxPopoverOptions]=\"{\n                placement: 'auto',\n                class: 'hint-popover',\n                appendToBody: true,\n                displayCloseButton: true\n              }\"\n              [attr.aria-label]=\"'organization.information' | cxTranslate\"\n            >\n              <cx-icon [type]=\"iconTypes.INFO\"> </cx-icon>\n            </button>\n          </h3>\n        </div>\n\n        <div class=\"actions\">\n          <label>\n            <span *ngIf=\"data.pagination?.sort\">{{\n              structure.type + '.sortBy' | cxTranslate\n            }}</span>\n            <ng-select\n              name=\"sort\"\n              class=\"sort\"\n              *ngIf=\"data.pagination?.sort\"\n              [searchable]=\"false\"\n              [clearable]=\"false\"\n              (change)=\"sort($any(data.pagination))\"\n              [tabIndex]=\"0\"\n              [(ngModel)]=\"sortCode\"\n              [attr.aria-label]=\"\n                (sortCode\n                  ? structure.type + '.sort.' + sortCode\n                  : structure.type + '.sortBy'\n                ) | cxTranslate\n              \"\n            >\n              <ng-option *ngFor=\"let sort of data.sorts\" [value]=\"sort.code\">\n                {{ structure.type + '.sort.' + sort.code | cxTranslate }}\n              </ng-option>\n            </ng-select>\n          </label>\n\n          <ng-content select=\"[actions]\"></ng-content>\n\n          <ng-container\n            *ngIf=\"\n              createButtonType === createButtonAllTypes.LINK;\n              else showButton\n            \"\n          >\n            <a\n              *ngIf=\"!hideAddButton\"\n              class=\"button primary create\"\n              [routerLink]=\"{ cxRoute: structure.type + 'Create' } | cxUrl\"\n              routerLinkActive=\"disabled\"\n            >\n              {{ getCreateButtonLabel() | cxTranslate }}\n            </a>\n          </ng-container>\n        </div>\n      </div>\n\n      <cx-table\n        *ngIf=\"data.values && data.values.length > 0; else emptyList\"\n        [structure]=\"structure\"\n        [data]=\"data.values\"\n        [i18nRoot]=\"domainType\"\n        [currentItem]=\"{ property: key, value: currentKey$ | async }\"\n        (launch)=\"launchItem($event)\"\n        [cxFocus]=\"{ trap: trapFocus.both }\"\n      >\n      </cx-table>\n\n      <div class=\"footer\">\n        <cx-pagination\n          [pagination]=\"data.pagination\"\n          (viewPageEvent)=\"browse($any(data.pagination), $event)\"\n        ></cx-pagination>\n      </div>\n    </cx-view>\n\n    <!-- nested split views are rendered inside child routes -->\n    <router-outlet></router-outlet>\n  </ng-container>\n</cx-split-view>\n\n<ng-template #emptyList>\n  <p class=\"instruction is-empty\">\n    {{ 'organization.messages.emptyList' | cxTranslate }}\n  </p>\n</ng-template>\n\n<ng-template #listHint>\n  <p>\n    {{ viewType + '.hint' | cxTranslate }}\n  </p>\n</ng-template>\n\n<ng-template #showButton>\n  <button\n    *ngIf=\"!hideAddButton\"\n    class=\"button primary create\"\n    (click)=\"onCreateButtonClick()\"\n  >\n    {{ getCreateButtonLabel() | cxTranslate }}\n  </button>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterOutlet, selector: "router-outlet", inputs: ["name"], outputs: ["activate", "deactivate", "attach", "detach"], exportAs: ["outlet"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: i1.SplitViewComponent, selector: "cx-split-view", inputs: ["hideMode"] }, { kind: "component", type: i1.ViewComponent, selector: "cx-view", inputs: ["position", "hidden"], outputs: ["hiddenChange"] }, { kind: "component", type: i1.TableComponent, selector: "cx-table", inputs: ["structure", "data", "i18nRoot", "currentItem"], outputs: ["launch"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "component", type: i1.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "component", type: i6.NgOptionComponent, selector: "ng-option", inputs: ["value", "disabled"] }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i1.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-split-view [hideMode]=\"false\">\n  <ng-container *ngIf=\"structure$ | async as structure\">\n    <cx-view class=\"list\" *ngIf=\"listData$ | async as data\">\n      <div class=\"header\">\n        <div class=\"title\">\n          <h3>\n            {{\n              viewType + '.header' | cxTranslate: { count: getListCount(data) }\n            }}\n            <button\n              [cxPopover]=\"listHint\"\n              [cxPopoverOptions]=\"{\n                placement: 'auto',\n                class: 'hint-popover',\n                appendToBody: true,\n                displayCloseButton: true\n              }\"\n              [attr.aria-label]=\"'organization.information' | cxTranslate\"\n            >\n              <cx-icon [type]=\"iconTypes.INFO\"> </cx-icon>\n            </button>\n          </h3>\n        </div>\n\n        <div class=\"actions\">\n          <label>\n            <span *ngIf=\"data.pagination?.sort\">{{\n              structure.type + '.sortBy' | cxTranslate\n            }}</span>\n            <ng-select\n              name=\"sort\"\n              class=\"sort\"\n              *ngIf=\"data.pagination?.sort\"\n              [searchable]=\"false\"\n              [clearable]=\"false\"\n              (change)=\"sort($any(data.pagination))\"\n              [tabIndex]=\"0\"\n              [(ngModel)]=\"sortCode\"\n              [attr.aria-label]=\"\n                (sortCode\n                  ? structure.type + '.sort.' + sortCode\n                  : structure.type + '.sortBy'\n                ) | cxTranslate\n              \"\n            >\n              <ng-option *ngFor=\"let sort of data.sorts\" [value]=\"sort.code\">\n                {{ structure.type + '.sort.' + sort.code | cxTranslate }}\n              </ng-option>\n            </ng-select>\n          </label>\n\n          <ng-content select=\"[actions]\"></ng-content>\n\n          <ng-container\n            *ngIf=\"\n              createButtonType === createButtonAllTypes.LINK;\n              else showButton\n            \"\n          >\n            <a\n              *ngIf=\"!hideAddButton\"\n              class=\"button primary create\"\n              [routerLink]=\"{ cxRoute: structure.type + 'Create' } | cxUrl\"\n              routerLinkActive=\"disabled\"\n            >\n              {{ getCreateButtonLabel() | cxTranslate }}\n            </a>\n          </ng-container>\n        </div>\n      </div>\n\n      <cx-table\n        *ngIf=\"data.values && data.values.length > 0; else emptyList\"\n        [structure]=\"structure\"\n        [data]=\"data.values\"\n        [i18nRoot]=\"domainType\"\n        [currentItem]=\"{ property: key, value: currentKey$ | async }\"\n        (launch)=\"launchItem($event)\"\n        [cxFocus]=\"{ trap: trapFocus.both }\"\n      >\n      </cx-table>\n\n      <div class=\"footer\">\n        <cx-pagination\n          [pagination]=\"data.pagination\"\n          (viewPageEvent)=\"browse($any(data.pagination), $event)\"\n        ></cx-pagination>\n      </div>\n    </cx-view>\n\n    <!-- nested split views are rendered inside child routes -->\n    <router-outlet></router-outlet>\n  </ng-container>\n</cx-split-view>\n\n<ng-template #emptyList>\n  <p class=\"instruction is-empty\">\n    {{ 'organization.messages.emptyList' | cxTranslate }}\n  </p>\n</ng-template>\n\n<ng-template #listHint>\n  <p>\n    {{ viewType + '.hint' | cxTranslate }}\n  </p>\n</ng-template>\n\n<ng-template #showButton>\n  <button\n    *ngIf=\"!hideAddButton\"\n    class=\"button primary create\"\n    (click)=\"onCreateButtonClick()\"\n  >\n    {{ getCreateButtonLabel() | cxTranslate }}\n  </button>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: ListService }, { type: ItemService }]; }, propDecorators: { hasGhostData: [{
                type: HostBinding,
                args: ['class.ghost']
            }], viewType: [{
                type: HostBinding,
                args: ['class']
            }], key: [{
                type: Input
            }], hideAddButton: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ListModule {
}
ListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ListModule, declarations: [ListComponent], imports: [CommonModule,
        RouterModule,
        SplitViewModule,
        TableModule,
        IconModule,
        UrlModule,
        I18nModule,
        PaginationModule,
        NgSelectModule,
        FormsModule,
        MessageModule,
        KeyboardFocusModule,
        PopoverModule], exports: [ListComponent] });
ListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListModule, imports: [CommonModule,
        RouterModule,
        SplitViewModule,
        TableModule,
        IconModule,
        UrlModule,
        I18nModule,
        PaginationModule,
        NgSelectModule,
        FormsModule,
        MessageModule,
        KeyboardFocusModule,
        PopoverModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        SplitViewModule,
                        TableModule,
                        IconModule,
                        UrlModule,
                        I18nModule,
                        PaginationModule,
                        NgSelectModule,
                        FormsModule,
                        MessageModule,
                        KeyboardFocusModule,
                        PopoverModule,
                    ],
                    declarations: [ListComponent],
                    exports: [ListComponent],
                }]
        }] });

class CellComponent {
    constructor(outlet) {
        this.outlet = outlet;
    }
    get tabIndex() {
        return -1;
    }
    get model() {
        return this.outlet.context;
    }
    get property() {
        var _a, _b, _c;
        return (_a = this.model) === null || _a === void 0 ? void 0 : _a[(_c = (_b = this.outlet) === null || _b === void 0 ? void 0 : _b.context) === null || _c === void 0 ? void 0 : _c._field];
    }
    /**
     * Indicates wether the cell is linkable.
     *
     * If the cells is linkable, an anchor link is created to the detailed route
     * of the given `_type`.
     *
     * Defaults to `true`.
     */
    get linkable() {
        var _a;
        return this.property !== undefined && ((_a = this.cellOptions.linkable) !== null && _a !== void 0 ? _a : true);
    }
    /**
     * Helper method to access the cell options.
     */
    get cellOptions() {
        var _a, _b, _c, _d, _e;
        return ((_e = (_c = (_b = (_a = this.outlet.context) === null || _a === void 0 ? void 0 : _a._options) === null || _b === void 0 ? void 0 : _b.cells) === null || _c === void 0 ? void 0 : _c[(_d = this.outlet.context) === null || _d === void 0 ? void 0 : _d._field]) !== null && _e !== void 0 ? _e : {});
    }
    /**
     * Generates the configurable route to the detail page of the given context item.
     */
    get route() {
        return this.outlet.context._type + 'Details';
    }
    get routeModel() {
        return this.outlet.context;
    }
    get type() {
        return this.model._type;
    }
    /**
     * Indicates whether the item is loaded.
     */
    get hasItem() {
        return !!this.item && Object.keys(this.item).length > 0;
    }
    get item() {
        if (!this.outlet.context) {
            return null;
        }
        const _a = this.outlet.context, { _field, _options, _type, _i18nRoot } = _a, all = __rest(_a, ["_field", "_options", "_type", "_i18nRoot"]);
        return all;
    }
}
CellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellComponent, deps: [{ token: i1.OutletContextData }], target: i0.ɵɵFactoryTarget.Component });
CellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CellComponent, selector: "cx-org-cell", ngImport: i0, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AssignCellComponent extends CellComponent {
    constructor(outlet, organizationItemService, messageService, organizationSubListService) {
        super(outlet);
        this.outlet = outlet;
        this.organizationItemService = organizationItemService;
        this.messageService = messageService;
        this.organizationSubListService = organizationSubListService;
    }
    get isAssigned() {
        var _a;
        return (_a = this.item) === null || _a === void 0 ? void 0 : _a.selected;
    }
    toggleAssign() {
        const isAssigned = this.isAssigned;
        this.organizationItemService.key$
            .pipe(first(), switchMap((key) => {
            var _a;
            return isAssigned
                ? (_a = this.unassign) === null || _a === void 0 ? void 0 : _a.call(this, key, this.link)
                : this.assign(key, this.link);
        }), take(1), filter((data) => data.status === LoadStatus.SUCCESS))
            .subscribe((data) => this.notify(data.item, isAssigned ? 'unassigned' : 'assigned'));
    }
    assign(key, linkKey) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = this.organizationSubListService).assign) === null || _b === void 0 ? void 0 : _b.call(_a, key, linkKey)) !== null && _c !== void 0 ? _c : EMPTY);
    }
    unassign(key, linkKey) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = this.organizationSubListService).unassign) === null || _b === void 0 ? void 0 : _b.call(_a, key, linkKey)) !== null && _c !== void 0 ? _c : EMPTY);
    }
    /**
     * Returns the key for the linked object.
     *
     * At the moment, we're using a generic approach to assign objects,
     * but the object do not have a normalized shape. Therefor, we need
     * to evaluate the context to return the right key for the associated
     * item.
     */
    get link() {
        var _a, _b;
        return ((_b = (_a = this.outlet.context.code) !== null && _a !== void 0 ? _a : this.outlet.context.customerId) !== null && _b !== void 0 ? _b : this.outlet.context.uid);
    }
    notify(item, state) {
        this.messageService.add({
            message: {
                key: `${this.organizationSubListService.viewType}.${state}`,
                params: {
                    item,
                },
            },
        });
    }
}
AssignCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AssignCellComponent, deps: [{ token: i1.OutletContextData }, { token: ItemService }, { token: MessageService }, { token: ListService }], target: i0.ɵɵFactoryTarget.Component });
AssignCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AssignCellComponent, selector: "cx-org-assign-cell", usesInheritance: true, ngImport: i0, template: `
    <button type="button" *ngIf="hasItem" (click)="toggleAssign()" class="link">
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AssignCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-org-assign-cell',
                    template: `
    <button type="button" *ngIf="hasItem" (click)="toggleAssign()" class="link">
      {{ isAssigned ? 'unassign' : 'assign' }}
    </button>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: ItemService }, { type: MessageService }, { type: ListService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SubListComponent extends ListComponent {
    constructor() {
        super(...arguments);
        this.hostClass = '';
        this.previous = true;
        this.key = this.service.key();
        this.showHint = false;
        this.hasGhostData = false;
        this.listData$ = this.currentKey$.pipe(switchMap((key) => this.service.getData(key)), tap((data) => {
            this.hasGhostData = this.service.hasGhostData(data);
        }));
        this.dataStructure$ = this.service.getStructure();
    }
    set routerKey(key) {
        this.subKey$ = this.organizationItemService.getRouterParam(key);
    }
}
SubListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
SubListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: SubListComponent, selector: "cx-org-sub-list", inputs: { previous: "previous", key: "key", showHint: "showHint", routerKey: "routerKey" }, host: { properties: { "class.ghost": "this.hasGhostData" }, classAttribute: "content-wrapper" }, viewQueries: [{ propertyName: "messageService", first: true, predicate: MessageService, descendants: true, read: MessageService }], usesInheritance: true, ngImport: i0, template: "<cx-org-card\n  [previous]=\"previous\"\n  [i18nRoot]=\"viewType\"\n  [showHint]=\"showHint\"\n  [cxFocus]=\"{ autofocus: true }\"\n>\n  <ng-content select=\"[actions]\" ngProjectAs=\"[actions]\"></ng-content>\n  <ng-content select=\"[main]\" ngProjectAs=\"[main]\"></ng-content>\n  <ng-content select=\"[info]\" ngProjectAs=\"[info]\"></ng-content>\n\n  <ng-container main *ngIf=\"dataStructure$ | async as structure\">\n    <ng-container *ngIf=\"listData$ | async as data\">\n      <section>\n        <cx-table\n          *ngIf=\"data.values && data.values.length > 0; else emptyList\"\n          [structure]=\"structure\"\n          [data]=\"data.values\"\n          [i18nRoot]=\"domainType\"\n          [currentItem]=\"{ property: key, value: subKey$ | async }\"\n        >\n        </cx-table>\n      </section>\n\n      <div\n        class=\"footer\"\n        *ngIf=\"\n          data.pagination &&\n          data.pagination.totalPages !== undefined &&\n          data.pagination.totalPages > 1\n        \"\n      >\n        <cx-pagination\n          [pagination]=\"data.pagination\"\n          (viewPageEvent)=\"browse(data.pagination, $event)\"\n        ></cx-pagination>\n      </div>\n    </ng-container>\n  </ng-container>\n</cx-org-card>\n\n<ng-template #emptyList>\n  <p class=\"is-empty\">{{ 'organization.messages.emptyList' | cxTranslate }}</p>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "component", type: i1.TableComponent, selector: "cx-table", inputs: ["structure", "data", "i18nRoot", "currentItem"], outputs: ["launch"] }, { kind: "component", type: i1.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-sub-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, template: "<cx-org-card\n  [previous]=\"previous\"\n  [i18nRoot]=\"viewType\"\n  [showHint]=\"showHint\"\n  [cxFocus]=\"{ autofocus: true }\"\n>\n  <ng-content select=\"[actions]\" ngProjectAs=\"[actions]\"></ng-content>\n  <ng-content select=\"[main]\" ngProjectAs=\"[main]\"></ng-content>\n  <ng-content select=\"[info]\" ngProjectAs=\"[info]\"></ng-content>\n\n  <ng-container main *ngIf=\"dataStructure$ | async as structure\">\n    <ng-container *ngIf=\"listData$ | async as data\">\n      <section>\n        <cx-table\n          *ngIf=\"data.values && data.values.length > 0; else emptyList\"\n          [structure]=\"structure\"\n          [data]=\"data.values\"\n          [i18nRoot]=\"domainType\"\n          [currentItem]=\"{ property: key, value: subKey$ | async }\"\n        >\n        </cx-table>\n      </section>\n\n      <div\n        class=\"footer\"\n        *ngIf=\"\n          data.pagination &&\n          data.pagination.totalPages !== undefined &&\n          data.pagination.totalPages > 1\n        \"\n      >\n        <cx-pagination\n          [pagination]=\"data.pagination\"\n          (viewPageEvent)=\"browse(data.pagination, $event)\"\n        ></cx-pagination>\n      </div>\n    </ng-container>\n  </ng-container>\n</cx-org-card>\n\n<ng-template #emptyList>\n  <p class=\"is-empty\">{{ 'organization.messages.emptyList' | cxTranslate }}</p>\n</ng-template>\n" }]
        }], propDecorators: { messageService: [{
                type: ViewChild,
                args: [MessageService, { read: MessageService }]
            }], previous: [{
                type: Input
            }], key: [{
                type: Input
            }], showHint: [{
                type: Input
            }], routerKey: [{
                type: Input
            }], hasGhostData: [{
                type: HostBinding,
                args: ['class.ghost']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SubListModule {
}
SubListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SubListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SubListModule, declarations: [SubListComponent, AssignCellComponent], imports: [CommonModule,
        I18nModule,
        CardModule,
        TableModule,
        PaginationModule,
        MessageModule,
        KeyboardFocusModule], exports: [SubListComponent] });
SubListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListModule, imports: [CommonModule,
        I18nModule,
        CardModule,
        TableModule,
        PaginationModule,
        MessageModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        CardModule,
                        TableModule,
                        PaginationModule,
                        MessageModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [SubListComponent, AssignCellComponent],
                    exports: [SubListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class SharedOrganizationModule {
}
SharedOrganizationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SharedOrganizationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SharedOrganizationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SharedOrganizationModule, imports: [ListModule, SubListModule, FormModule] });
SharedOrganizationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SharedOrganizationModule, imports: [ListModule, SubListModule, FormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SharedOrganizationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, SubListModule, FormModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
// This is not for the public API
// TODO:#my-account-architecture - Number.MAX_VALUE?
const MAX_OCC_INTEGER_VALUE = 2147483647;

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ItemExistsDirective {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
    }
    ngOnInit() {
        this.subscription = this.itemService.error$
            .pipe(filter((error) => error))
            .subscribe(() => this.handleErrorMessage());
    }
    handleErrorMessage() {
        this.messageService.add({
            message: {
                key: 'organization.notification.notExist',
            },
            type: GlobalMessageType.MSG_TYPE_ERROR,
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
ItemExistsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemExistsDirective, deps: [{ token: ItemService }, { token: MessageService }], target: i0.ɵɵFactoryTarget.Directive });
ItemExistsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: ItemExistsDirective, selector: "[cxOrgItemExists]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemExistsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxOrgItemExists]',
                }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: MessageService }]; } });

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
 * Renders a confirmation message and cancel/confirm button in the message component.
 */
class ConfirmationMessageComponent extends BaseMessageComponent {
    constructor(data, platformId, messageService) {
        super(data, platformId);
        this.data = data;
        this.platformId = platformId;
        this.messageService = messageService;
        this.cancelText = {
            key: 'organization.confirmation.cancel',
        };
        this.confirmText = {
            key: 'organization.confirmation.confirm',
        };
    }
    ngOnInit() {
        var _a, _b;
        super.ngOnInit();
        this.cancelText = (_a = this.messageData.cancel) !== null && _a !== void 0 ? _a : this.cancelText;
        this.confirmText = (_b = this.messageData.confirm) !== null && _b !== void 0 ? _b : this.confirmText;
    }
    /**
     * Emits a confirmation event to the data events.
     *
     * The original author of the event message or other parties can observe
     * the event data.
     */
    confirm() {
        var _a;
        (_a = this.data.events) === null || _a === void 0 ? void 0 : _a.next({ confirm: true });
    }
}
ConfirmationMessageComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfirmationMessageComponent, deps: [{ token: MessageData }, { token: PLATFORM_ID }, { token: MessageService }], target: i0.ɵɵFactoryTarget.Component });
ConfirmationMessageComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ConfirmationMessageComponent, selector: "cx-org-confirmation", usesInheritance: true, ngImport: i0, template: "<div class=\"inner\" [cxFocus]=\"{ focusOnEscape: true }\" (esc)=\"close()\">\n  <p class=\"messageTitle\" *ngIf=\"messageTitle\">\n    {{ messageTitle | cxTranslate }}\n  </p>\n  <div class=\"message\">\n    <cx-icon *ngIf=\"messageIcon\" [type]=\"messageIcon\"></cx-icon>\n    <p>\n      {{ message | cxTranslate }}\n    </p>\n  </div>\n  <div class=\"actions\" [cxFocus]=\"{ autofocus: 'button.primary' }\">\n    <button class=\"button cancel\" (click)=\"close()\">\n      {{ cancelText | cxTranslate }}\n    </button>\n\n    <button class=\"button primary confirm\" (click)=\"confirm()\">\n      {{ confirmText | cxTranslate }}\n    </button>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfirmationMessageComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-confirmation', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"inner\" [cxFocus]=\"{ focusOnEscape: true }\" (esc)=\"close()\">\n  <p class=\"messageTitle\" *ngIf=\"messageTitle\">\n    {{ messageTitle | cxTranslate }}\n  </p>\n  <div class=\"message\">\n    <cx-icon *ngIf=\"messageIcon\" [type]=\"messageIcon\"></cx-icon>\n    <p>\n      {{ message | cxTranslate }}\n    </p>\n  </div>\n  <div class=\"actions\" [cxFocus]=\"{ autofocus: 'button.primary' }\">\n    <button class=\"button cancel\" (click)=\"close()\">\n      {{ cancelText | cxTranslate }}\n    </button>\n\n    <button class=\"button primary confirm\" (click)=\"confirm()\">\n      {{ confirmText | cxTranslate }}\n    </button>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () {
        return [{ type: MessageData }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [PLATFORM_ID]
                    }] }, { type: MessageService }];
    } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DisableInfoService {
    isItemDisabled(item) {
        return (item === null || item === void 0 ? void 0 : item.active) === false;
    }
    isParentDisabled(item) {
        var _a;
        return (((_a = (item.orgUnit || item.unit || item.parentOrgUnit)) === null || _a === void 0 ? void 0 : _a.active) === false &&
            !this.isRootUnit(item));
    }
    isRootUnit(item) {
        return Boolean((item === null || item === void 0 ? void 0 : item.uid) &&
            (item === null || item === void 0 ? void 0 : item.name) &&
            !(item === null || item === void 0 ? void 0 : item.orgUnit) &&
            !(item === null || item === void 0 ? void 0 : item.unit) &&
            (!(item === null || item === void 0 ? void 0 : item.parentOrgUnit) || (item === null || item === void 0 ? void 0 : item.uid) === (item === null || item === void 0 ? void 0 : item.parentOrgUnit)));
    }
}
DisableInfoService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
DisableInfoService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoService, decorators: [{
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
/**
 * Reusable component in the my-company is to toggle the disabled state for
 * my company entities.
 */
class ToggleStatusComponent {
    constructor(itemService, messageService, disableInfoService) {
        this.itemService = itemService;
        this.messageService = messageService;
        this.disableInfoService = disableInfoService;
        /**
         * The key input can be used to add a custom key.
         *
         * Most _organization_ entities use the `code` key, but there is some variations.
         */
        this.key = 'code';
        /**
         * resolves the current item.
         */
        this.current$ = this.itemService.current$;
        /**
         * resolves if the user is currently in the edit form.
         */
        this.isInEditMode$ = this.itemService.isInEditMode$;
        this.subscription = new Subscription();
    }
    toggle(item) {
        if (!item.active) {
            // we do ask for confirmation when the entity gets activated
            this.update(item);
        }
        else {
            if (!this.confirmation) {
                this.confirmation = this.messageService.add({
                    message: {
                        key: this.i18nRoot + '.messages.deactivate',
                        params: { item },
                    },
                    messageTitle: {
                        key: this.i18nRoot + '.messages.deactivateTitle',
                        params: { item },
                    },
                    confirm: {
                        key: 'organization.confirmation.disable',
                    },
                    component: ConfirmationMessageComponent,
                });
                this.subscription.add(this.confirmation.pipe(first()).subscribe((event) => {
                    if (event.close) {
                        this.confirmation = null;
                    }
                    if (event.confirm) {
                        this.messageService.close(this.confirmation);
                        this.update(item);
                        this.confirmation = null;
                    }
                }));
            }
        }
    }
    /**
     * Indicates whether the status can be toggled or not.
     */
    isDisabled(item) {
        var _a;
        return ((_a = this.disabled) !== null && _a !== void 0 ? _a : (this.disableInfoService.isParentDisabled(item) ||
            this.disableInfoService.isRootUnit(item)));
    }
    update(item) {
        this.itemService
            .update(item[this.key], this.getPatchedItem(item))
            .pipe(take(1), filter((data) => data.status === LoadStatus.SUCCESS))
            .subscribe((data) => this.notify(Object.assign(Object.assign({}, item), data.item)));
    }
    getPatchedItem(item) {
        const patch = {};
        Object.assign(patch, { [this.key]: item[this.key] });
        patch.active = !item.active;
        return patch;
    }
    notify(item) {
        this.messageService.add({
            message: {
                key: `${this.i18nRoot}.messages.${item.active ? 'confirmEnabled' : 'confirmDisabled'}`,
                params: { item },
            },
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
ToggleStatusComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusComponent, deps: [{ token: ItemService }, { token: MessageService }, { token: DisableInfoService }], target: i0.ɵɵFactoryTarget.Component });
ToggleStatusComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ToggleStatusComponent, selector: "cx-org-toggle-status", inputs: { i18nRoot: "i18nRoot", key: "key", disabled: "disabled" }, host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<button\n  *ngIf=\"current$ | async as item\"\n  class=\"button active\"\n  [disabled]=\"\n    isDisabled(item) ||\n    ((isInEditMode$ | async) && item.active && disabled !== true)\n  \"\n  (click)=\"toggle(item)\"\n>\n  {{ 'organization.' + (item.active ? 'disable' : 'enable') | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-toggle-status', host: { class: 'content-wrapper' }, template: "<button\n  *ngIf=\"current$ | async as item\"\n  class=\"button active\"\n  [disabled]=\"\n    isDisabled(item) ||\n    ((isInEditMode$ | async) && item.active && disabled !== true)\n  \"\n  (click)=\"toggle(item)\"\n>\n  {{ 'organization.' + (item.active ? 'disable' : 'enable') | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: MessageService }, { type: DisableInfoService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], key: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ConfirmationMessageModule {
}
ConfirmationMessageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfirmationMessageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ConfirmationMessageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfirmationMessageModule, declarations: [ConfirmationMessageComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        FeaturesConfigModule] });
ConfirmationMessageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfirmationMessageModule, imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfirmationMessageModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                        FeaturesConfigModule,
                    ],
                    declarations: [ConfirmationMessageComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ToggleStatusModule {
}
ToggleStatusModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToggleStatusModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusModule, declarations: [ToggleStatusComponent], imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule], exports: [ToggleStatusComponent] });
ToggleStatusModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusModule, imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleStatusModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule],
                    declarations: [ToggleStatusComponent],
                    exports: [ToggleStatusComponent],
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
 * Reusable component in the my-company is to delete an item (if it's possible)
 */
class DeleteItemComponent {
    constructor(itemService, messageService) {
        this.itemService = itemService;
        this.messageService = messageService;
        /**
         * The key input can be used to add a custom key.
         *
         * Most _organization_ entities use the `code` key, but there is some variations.
         */
        this.key = 'code';
        /**
         * resolves the current item.
         */
        this.current$ = this.itemService.current$;
        /**
         * resolves if the user is currently in the edit form.
         */
        this.isInEditMode$ = this.itemService.isInEditMode$;
        this.subscription = new Subscription();
    }
    delete(item) {
        if (!this.confirmation) {
            this.confirmation = this.messageService.add({
                message: {
                    key: this.i18nRoot + '.messages.delete',
                    params: { item },
                },
                messageTitle: {
                    key: this.i18nRoot + '.messages.deleteTitle',
                    params: { item },
                },
                component: ConfirmationMessageComponent,
            });
            this.subscription.add(this.confirmation.pipe(first()).subscribe((event) => {
                if (event.close) {
                    this.confirmation = null;
                }
                if (event.confirm) {
                    this.messageService.close(this.confirmation);
                    this.confirmDelete(item);
                    this.confirmation = null;
                }
            }));
        }
    }
    confirmDelete(item) {
        var _a, _b;
        (_b = (_a = this.itemService).delete) === null || _b === void 0 ? void 0 : _b.call(_a, item[this.key], this.additionalParam).pipe(take(1), filter((data) => data.status === LoadStatus.SUCCESS)).subscribe((data) => this.notify(Object.assign(Object.assign({}, item), data.item)));
    }
    notify(item) {
        this.messageService.add({
            message: {
                key: `${this.i18nRoot}.messages.deleted`,
                params: { item },
            },
        });
    }
    ngOnDestroy() {
        var _a;
        (_a = this.subscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
}
DeleteItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemComponent, deps: [{ token: ItemService }, { token: MessageService }], target: i0.ɵɵFactoryTarget.Component });
DeleteItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DeleteItemComponent, selector: "cx-org-delete-item", inputs: { i18nRoot: "i18nRoot", key: "key", additionalParam: "additionalParam" }, host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<button\n  *ngIf=\"current$ | async as item\"\n  class=\"button active\"\n  [disabled]=\"isInEditMode$ | async\"\n  (click)=\"delete(item)\"\n>\n  {{ 'organization.delete' | cxTranslate }}\n</button>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-delete-item', host: { class: 'content-wrapper' }, template: "<button\n  *ngIf=\"current$ | async as item\"\n  class=\"button active\"\n  [disabled]=\"isInEditMode$ | async\"\n  (click)=\"delete(item)\"\n>\n  {{ 'organization.delete' | cxTranslate }}\n</button>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: MessageService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], key: [{
                type: Input
            }], additionalParam: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DeleteItemModule {
}
DeleteItemModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DeleteItemModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemModule, declarations: [DeleteItemComponent], imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule], exports: [DeleteItemComponent] });
DeleteItemModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemModule, imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DeleteItemModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule],
                    declarations: [DeleteItemComponent],
                    exports: [DeleteItemComponent],
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
class DisableInfoComponent {
    constructor(itemService, disableInfoService) {
        this.itemService = itemService;
        this.disableInfoService = disableInfoService;
        /**
         * Flag to enable display custom message(s) even if no condition has been met
         */
        this.displayCustomInfo = false;
        /**
         * resolves the current item.
         */
        this.current$ = this.itemService.current$;
        this.iconTypes = ICON_TYPE;
    }
    get defaultInfoConfig() {
        return {
            disabledCreate: false,
            disabledEdit: true,
            disabledEnable: true,
            disabledDisable: false,
        };
    }
    ngOnInit() {
        this.displayInfoConfig = Object.assign(Object.assign({}, this.defaultInfoConfig), this.displayInfoConfig);
    }
    displayDisabledCreate(item) {
        var _a;
        return (((_a = this.displayInfoConfig) === null || _a === void 0 ? void 0 : _a.disabledCreate) &&
            this.disableInfoService.isItemDisabled(item));
    }
    displayDisabledEdit(item) {
        var _a;
        return (((_a = this.displayInfoConfig) === null || _a === void 0 ? void 0 : _a.disabledEdit) &&
            this.disableInfoService.isItemDisabled(item));
    }
    displayDisabledEnable(item) {
        var _a;
        return (((_a = this.displayInfoConfig) === null || _a === void 0 ? void 0 : _a.disabledEnable) &&
            this.disableInfoService.isParentDisabled(item));
    }
    displayDisabledDisable(item) {
        var _a;
        return (((_a = this.displayInfoConfig) === null || _a === void 0 ? void 0 : _a.disabledDisable) &&
            this.disableInfoService.isRootUnit(item));
    }
}
DisableInfoComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoComponent, deps: [{ token: ItemService }, { token: DisableInfoService }], target: i0.ɵɵFactoryTarget.Component });
DisableInfoComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: { i18nRoot: "i18nRoot", displayInfoConfig: "displayInfoConfig", displayCustomInfo: "displayCustomInfo" }, host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<ng-container *ngIf=\"current$ | async as item\">\n  <section\n    *ngIf=\"\n      displayDisabledCreate(item) ||\n      displayDisabledEdit(item) ||\n      displayDisabledEnable(item) ||\n      displayDisabledDisable(item) ||\n      displayCustomInfo\n    \"\n  >\n    <cx-icon [type]=\"iconTypes.INFO\"></cx-icon>\n    <ul>\n      <li *ngIf=\"displayDisabledEnable(item)\">\n        {{ i18nRoot + '.info.disabledEnable' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledCreate(item)\">\n        {{ i18nRoot + '.info.disabledCreate' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledEdit(item)\">\n        {{ i18nRoot + '.info.disabledEdit' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledDisable(item)\">\n        {{ i18nRoot + '.info.disabledDisable' | cxTranslate }}\n      </li>\n      <ng-content></ng-content>\n    </ul>\n  </section>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-disable-info', host: { class: 'content-wrapper' }, template: "<ng-container *ngIf=\"current$ | async as item\">\n  <section\n    *ngIf=\"\n      displayDisabledCreate(item) ||\n      displayDisabledEdit(item) ||\n      displayDisabledEnable(item) ||\n      displayDisabledDisable(item) ||\n      displayCustomInfo\n    \"\n  >\n    <cx-icon [type]=\"iconTypes.INFO\"></cx-icon>\n    <ul>\n      <li *ngIf=\"displayDisabledEnable(item)\">\n        {{ i18nRoot + '.info.disabledEnable' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledCreate(item)\">\n        {{ i18nRoot + '.info.disabledCreate' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledEdit(item)\">\n        {{ i18nRoot + '.info.disabledEdit' | cxTranslate }}\n      </li>\n      <li *ngIf=\"displayDisabledDisable(item)\">\n        {{ i18nRoot + '.info.disabledDisable' | cxTranslate }}\n      </li>\n      <ng-content></ng-content>\n    </ul>\n  </section>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: DisableInfoService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], displayInfoConfig: [{
                type: Input
            }], displayCustomInfo: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DisableInfoModule {
}
DisableInfoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DisableInfoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoModule, declarations: [DisableInfoComponent], imports: [CommonModule, IconModule, I18nModule], exports: [DisableInfoComponent] });
DisableInfoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoModule, imports: [CommonModule, IconModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DisableInfoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, IconModule, I18nModule],
                    declarations: [DisableInfoComponent],
                    exports: [DisableInfoComponent],
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
class SubListService extends ListService {
    constructor() {
        super(...arguments);
        /**
         * The default table structure for sub lists is only showing tables with vertical layout.
         */
        this.defaultTableStructure = {
            options: { layout: TableLayout.VERTICAL },
        };
        /**
         * @override This sub list will show 3 items.
         */
        this.ghostData = { values: new Array(3) };
    }
    // TODO: abstract
    assign(_key, ..._args) {
        return EMPTY;
    }
    unassign(_key, ..._args) {
        return EMPTY;
    }
    /**
     * As we can't filter with the backend API, we do this client side.
     */
    filterSelected(list) {
        if (!list) {
            return list;
        }
        const { pagination, sorts, values } = list;
        return {
            pagination,
            sorts,
            values: values.filter((value) => value.selected),
        };
    }
}
SubListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
SubListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SubListService, decorators: [{
            type: Injectable
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
class ActiveLinkCellComponent extends CellComponent {
    get tabIndex() {
        return 0;
    }
}
ActiveLinkCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveLinkCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
ActiveLinkCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ActiveLinkCellComponent, selector: "cx-org-active-link-cell", usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ActiveLinkCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-active-link-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AmountCellComponent extends CellComponent {
    get property() {
        if (this.budget && this.currency) {
            return this.budget + ' ' + this.currency;
        }
        return undefined;
    }
    get budget() {
        return this.model.budget;
    }
    get currency() {
        var _a;
        return ((_a = this.model.currency) === null || _a === void 0 ? void 0 : _a.isocode) || this.model.currency;
    }
}
AmountCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmountCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
AmountCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AmountCellComponent, selector: "cx-org-amount-cell", usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AmountCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-amount-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class DateRangeCellComponent extends CellComponent {
    get linkable() {
        var _a;
        return this.hasRange && ((_a = this.cellOptions.linkable) !== null && _a !== void 0 ? _a : true);
    }
    get hasRange() {
        return !!this.model.startDate && !!this.model.endDate;
    }
}
DateRangeCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateRangeCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
DateRangeCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: DateRangeCellComponent, selector: "cx-org-date-range-cell", usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span\n    class=\"text\"\n    title=\"{{ model.startDate | cxDate }} - {{ model.endDate | cxDate }}\"\n    *ngIf=\"hasRange\"\n  >\n    {{ model.startDate | cxDate }} - {{ model.endDate | cxDate }}\n  </span>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DateRangeCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-date-range-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span\n    class=\"text\"\n    title=\"{{ model.startDate | cxDate }} - {{ model.endDate | cxDate }}\"\n    *ngIf=\"hasRange\"\n  >\n    {{ model.startDate | cxDate }} - {{ model.endDate | cxDate }}\n  </span>\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class LimitCellComponent extends CellComponent {
    get isTimeSpanThreshold() {
        var _a;
        return (((_a = this.model.orderApprovalPermissionType) === null || _a === void 0 ? void 0 : _a.code) ===
            'B2BOrderThresholdTimespanPermission');
    }
    get isOrderThreshold() {
        var _a;
        return (((_a = this.model.orderApprovalPermissionType) === null || _a === void 0 ? void 0 : _a.code) ===
            'B2BOrderThresholdPermission');
    }
    get isExceedPermission() {
        var _a;
        return (((_a = this.model.orderApprovalPermissionType) === null || _a === void 0 ? void 0 : _a.code) ===
            'B2BBudgetExceededPermission');
    }
}
LimitCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LimitCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
LimitCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LimitCellComponent, selector: "cx-org-limit-cell", usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"linkable; else threshold\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"threshold\"></ng-container>\n</a>\n\n<ng-template #threshold>\n  <span\n    class=\"text\"\n    title=\"{{ model.threshold }} {{ model.currency?.symbol }} {{\n      'orgPurchaseLimit.per.' + model.periodRange | cxTranslate\n    }}\"\n    *ngIf=\"isTimeSpanThreshold\"\n  >\n    {{ model.threshold }} {{ model.currency?.symbol }}\n    {{ 'orgPurchaseLimit.per.' + model.periodRange | cxTranslate }}\n  </span>\n\n  <span\n    class=\"text\"\n    title=\"{{ model.threshold }} {{ model.currency?.symbol }}\"\n    *ngIf=\"isOrderThreshold\"\n  >\n    {{ model.threshold }} {{ model.currency?.symbol }}\n  </span>\n\n  <span\n    class=\"text\"\n    title=\"{{ model.orderApprovalPermissionType.name }}\"\n    *ngIf=\"isExceedPermission\"\n  >\n    {{ model.orderApprovalPermissionType.name }}\n  </span>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LimitCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-limit-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else threshold\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"threshold\"></ng-container>\n</a>\n\n<ng-template #threshold>\n  <span\n    class=\"text\"\n    title=\"{{ model.threshold }} {{ model.currency?.symbol }} {{\n      'orgPurchaseLimit.per.' + model.periodRange | cxTranslate\n    }}\"\n    *ngIf=\"isTimeSpanThreshold\"\n  >\n    {{ model.threshold }} {{ model.currency?.symbol }}\n    {{ 'orgPurchaseLimit.per.' + model.periodRange | cxTranslate }}\n  </span>\n\n  <span\n    class=\"text\"\n    title=\"{{ model.threshold }} {{ model.currency?.symbol }}\"\n    *ngIf=\"isOrderThreshold\"\n  >\n    {{ model.threshold }} {{ model.currency?.symbol }}\n  </span>\n\n  <span\n    class=\"text\"\n    title=\"{{ model.orderApprovalPermissionType.name }}\"\n    *ngIf=\"isExceedPermission\"\n  >\n    {{ model.orderApprovalPermissionType.name }}\n  </span>\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class RolesCellComponent extends CellComponent {
}
RolesCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RolesCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
RolesCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: RolesCellComponent, selector: "cx-org-roles-cell", usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <ul class=\"text\">\n    <li\n      *ngFor=\"let role of model.roles\"\n      class=\"li\"\n      [innerText]=\"'organization.userRoles.' + role | cxTranslate\"\n    ></li>\n    <li *ngIf=\"model.roles?.length === 0\">-</li>\n  </ul>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RolesCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-roles-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <ul class=\"text\">\n    <li\n      *ngFor=\"let role of model.roles\"\n      class=\"li\"\n      [innerText]=\"'organization.userRoles.' + role | cxTranslate\"\n    ></li>\n    <li *ngIf=\"model.roles?.length === 0\">-</li>\n  </ul>\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class StatusCellComponent extends CellComponent {
    get label() {
        if (this.isActive === undefined) {
            return;
        }
        return this.isActive ? 'organization.enabled' : 'organization.disabled';
    }
    get isActive() {
        return this.model.active;
    }
}
StatusCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StatusCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
StatusCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: StatusCellComponent, selector: "cx-org-status-cell", usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span\n    class=\"text\"\n    title=\"{{ label | cxTranslate }}\"\n    [class.is-active]=\"isActive\"\n    *ngIf=\"label\"\n  >\n    {{ label | cxTranslate }}</span\n  >\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StatusCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-status-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabindex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span\n    class=\"text\"\n    title=\"{{ label | cxTranslate }}\"\n    [class.is-active]=\"isActive\"\n    *ngIf=\"label\"\n  >\n    {{ label | cxTranslate }}</span\n  >\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitCellComponent extends CellComponent {
    get property() {
        var _a, _b, _c;
        return (_b = (_a = this.model.unit) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_c = this.model.orgUnit) === null || _c === void 0 ? void 0 : _c.name;
    }
}
UnitCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
UnitCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitCellComponent, selector: "cx-org-unit-cell", usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"linkable; else text\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <ng-container *ngTemplateOutlet=\"text\"></ng-container>\n</a>\n\n<ng-template #text>\n  <span class=\"text\" title=\"{{ property }}\">{{ property }}</span>\n</ng-template>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CellModule {
}
CellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CellModule, declarations: [CellComponent,
        ActiveLinkCellComponent,
        AmountCellComponent,
        DateRangeCellComponent,
        LimitCellComponent,
        RolesCellComponent,
        StatusCellComponent,
        UnitCellComponent], imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule] });
CellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellModule, imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, RouterModule, UrlModule, I18nModule, IconModule],
                    declarations: [
                        CellComponent,
                        ActiveLinkCellComponent,
                        AmountCellComponent,
                        DateRangeCellComponent,
                        LimitCellComponent,
                        RolesCellComponent,
                        StatusCellComponent,
                        UnitCellComponent,
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
var OrganizationTableType;
(function (OrganizationTableType) {
    OrganizationTableType["BUDGET"] = "orgBudget";
    OrganizationTableType["BUDGET_ASSIGNED_COST_CENTERS"] = "orgBudgetAssignedCostCenters";
    OrganizationTableType["COST_CENTER"] = "orgCostCenter";
    OrganizationTableType["COST_CENTER_BUDGETS"] = "orgCostCenterBudgets";
    OrganizationTableType["COST_CENTER_ASSIGNED_BUDGETS"] = "orgCostCenterAssignedBudgets";
    OrganizationTableType["UNIT"] = "orgUnit";
    OrganizationTableType["UNIT_USERS"] = "orgUnitUsers";
    OrganizationTableType["UNIT_CHILDREN"] = "orgUnitChildren";
    OrganizationTableType["UNIT_APPROVERS"] = "orgUnitApprovers";
    OrganizationTableType["UNIT_ASSIGNED_APPROVERS"] = "orgUnitAssignedApprovers";
    OrganizationTableType["UNIT_ADDRESS"] = "orgUnitAddress";
    OrganizationTableType["UNIT_COST_CENTERS"] = "orgUnitCostCenters";
    OrganizationTableType["USER_GROUP"] = "orgUserGroup";
    OrganizationTableType["USER_GROUP_USERS"] = "orgUserGroupUsers";
    OrganizationTableType["USER_GROUP_ASSIGNED_USERS"] = "orgUserGroupAssignedUsers";
    OrganizationTableType["USER_GROUP_PERMISSIONS"] = "orgUserGroupPermissions";
    OrganizationTableType["USER_GROUP_ASSIGNED_PERMISSIONS"] = "orgUserGroupAssignedPermissions";
    OrganizationTableType["USER"] = "orgUser";
    OrganizationTableType["USER_APPROVERS"] = "orgUserApprovers";
    OrganizationTableType["USER_ASSIGNED_APPROVERS"] = "orgUserAssignedApprovers";
    OrganizationTableType["USER_PERMISSIONS"] = "orgUserPermissions";
    OrganizationTableType["USER_ASSIGNED_PERMISSIONS"] = "orgUserAssignedPermissions";
    OrganizationTableType["USER_USER_GROUPS"] = "orgUserUserGroups";
    OrganizationTableType["USER_ASSIGNED_USER_GROUPS"] = "orgUserAssignedUserGroups";
    OrganizationTableType["PERMISSION"] = "orgPurchaseLimit";
})(OrganizationTableType || (OrganizationTableType = {}));

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
class CostCenterDetailsCellComponent extends CellComponent {
}
CostCenterDetailsCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CostCenterDetailsCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CostCenterDetailsCellComponent, selector: "cx-org-cost-center-details-cell", usesInheritance: true, ngImport: i0, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.name' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgCostCenterDetails',\n            params: model\n          } | cxUrl\n        \"\n      >\n        {{ model.name }}\n      </a>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.active' | cxTranslate }}</label>\n      <span\n        class=\"value\"\n        [class.is-active]=\"model.active\"\n        [class.is-inactive]=\"!model.active\"\n      >\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.currency' | cxTranslate }}</label>\n\n      <span class=\"value\">\n        {{ model.currency?.isocode }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.unit\">\n      <label>{{ 'orgCostCenter.unit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.unit\n          } | cxUrl\n        \"\n      >\n        {{ model.unit?.name }}\n      </a>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model.name }}\n</button>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-cost-center-details-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.name' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgCostCenterDetails',\n            params: model\n          } | cxUrl\n        \"\n      >\n        {{ model.name }}\n      </a>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.active' | cxTranslate }}</label>\n      <span\n        class=\"value\"\n        [class.is-active]=\"model.active\"\n        [class.is-inactive]=\"!model.active\"\n      >\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.currency' | cxTranslate }}</label>\n\n      <span class=\"value\">\n        {{ model.currency?.isocode }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.unit\">\n      <label>{{ 'orgCostCenter.unit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.unit\n          } | cxUrl\n        \"\n      >\n        {{ model.unit?.name }}\n      </a>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model.name }}\n</button>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetCostCenterListService extends SubListService {
    constructor(tableService, budgetService) {
        super(tableService);
        this.tableService = tableService;
        this.budgetService = budgetService;
        this.tableType = OrganizationTableType.BUDGET_ASSIGNED_COST_CENTERS;
        this._domainType = OrganizationTableType.COST_CENTER;
    }
    load(_pagination, code) {
        return this.budgetService.getCostCenters(code).pipe(filter((list) => Boolean(list)), map((costCenter) => this.filterSelected(costCenter)));
    }
    /**
     * As we can't filter with the backend API, we do this client side.
     */
    filterSelected({ pagination, sorts, values, }) {
        return {
            pagination,
            sorts,
            values: values.filter((value) => value.active),
        };
    }
}
BudgetCostCenterListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListService, deps: [{ token: i1.TableService }, { token: i2.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetCostCenterListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.BudgetService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetCostCenterListComponent {
}
BudgetCostCenterListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
BudgetCostCenterListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: BudgetCostCenterListComponent, selector: "cx-org-budget-cost-center-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: BudgetCostCenterListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list></cx-org-sub-list>\n", dependencies: [{ kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-budget-cost-center-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: BudgetCostCenterListService,
                        },
                    ], template: "<cx-org-sub-list></cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CurrentBudgetService extends CurrentItemService {
    constructor(routingService, budgetService) {
        super(routingService);
        this.routingService = routingService;
        this.budgetService = budgetService;
    }
    getDetailsRoute() {
        return 'orgBudgetDetails';
    }
    getParamKey() {
        return ROUTE_PARAMS.budgetCode;
    }
    getItem(code) {
        return this.budgetService.get(code);
    }
    getError(code) {
        return this.budgetService.getErrorState(code);
    }
}
CurrentBudgetService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentBudgetService, deps: [{ token: i3.RoutingService }, { token: i2.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentBudgetService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentBudgetService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentBudgetService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.RoutingService }, { type: i2.BudgetService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetFormService extends FormService {
    constructor(datePickerService) {
        super();
        this.datePickerService = datePickerService;
    }
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('code', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('name', new UntypedFormControl('', Validators.required));
        form.setControl('startDate', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.patternValidation((date) => this.datePickerService.isValidFormat(date)),
        ]));
        form.setControl('endDate', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.patternValidation((date) => this.datePickerService.isValidFormat(date)),
        ]));
        form.setControl('budget', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.mustBePositive,
        ]));
        form.setControl('currency', new UntypedFormGroup({
            isocode: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setControl('orgUnit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setValidators(CustomFormValidators.dateRange('startDate', 'endDate', (date) => this.datePickerService.getDate(date)));
        this.form = form;
    }
}
BudgetFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormService, deps: [{ token: i1.DatePickerService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.DatePickerService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetItemService extends ItemService {
    constructor(currentItemService, routingService, formService, budgetService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.budgetService = budgetService;
    }
    /**
     * @override
     * Returns the budget for the given code.
     *
     * Loads the budget each time, to ensure accurate data is resolved.
     */
    load(code) {
        this.budgetService.loadBudget(code);
        return this.budgetService.get(code);
    }
    update(code, value) {
        var _a;
        this.budgetService.update(code, value);
        return this.budgetService.getLoadingStatus((_a = value.code) !== null && _a !== void 0 ? _a : '');
    }
    create(value) {
        var _a;
        this.budgetService.create(value);
        return this.budgetService.getLoadingStatus((_a = value.code) !== null && _a !== void 0 ? _a : '');
    }
    /**
     * @override
     * Returns 'budgetDetails'
     */
    getDetailsRoute() {
        return 'orgBudgetDetails';
    }
}
BudgetItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetItemService, deps: [{ token: CurrentBudgetService }, { token: i3.RoutingService }, { token: BudgetFormService }, { token: i2.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CurrentBudgetService }, { type: i3.RoutingService }, { type: BudgetFormService }, { type: i2.BudgetService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetDetailsComponent {
    ngOnInit() {
        this.model$ = this.itemService.key$.pipe(switchMap((code) => this.itemService.load(code)), startWith({}));
    }
    constructor(itemService) {
        this.itemService = itemService;
        this.isInEditMode$ = this.itemService.isInEditMode$;
    }
}
BudgetDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsComponent, deps: [{ token: ItemService }], target: i0.ɵɵFactoryTarget.Component });
BudgetDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: BudgetDetailsComponent, selector: "cx-org-budget-details", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: BudgetItemService,
        },
    ], ngImport: i0, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgBudget.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgBudgetEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status actions i18nRoot=\"orgBudget\"></cx-org-toggle-status>\n\n  <cx-org-disable-info info i18nRoot=\"orgBudget\"> </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgBudget.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.startDate' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.startDate | cxDate }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.endDate' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.endDate | cxDate }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.amount' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.budget }} {{ model.currency?.isocode }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.unit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <a\n      *ngIf=\"model.code\"\n      class=\"link\"\n      [routerLink]=\"{ cxRoute: 'orgBudgetCostCenters', params: model } | cxUrl\"\n      routerLinkActive=\"is-current\"\n    >\n      {{ 'orgBudget.links.costCenters' | cxTranslate }}\n    </a>\n  </section>\n</cx-org-card>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: ToggleStatusComponent, selector: "cx-org-toggle-status", inputs: ["i18nRoot", "key", "disabled"] }, { kind: "directive", type: ItemExistsDirective, selector: "[cxOrgItemExists]" }, { kind: "component", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-budget-details', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: ItemService,
                            useExisting: BudgetItemService,
                        },
                    ], host: { class: 'content-wrapper' }, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgBudget.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgBudgetEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status actions i18nRoot=\"orgBudget\"></cx-org-toggle-status>\n\n  <cx-org-disable-info info i18nRoot=\"orgBudget\"> </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgBudget.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.startDate' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.startDate | cxDate }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.endDate' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.endDate | cxDate }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.amount' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.budget }} {{ model.currency?.isocode }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.unit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <a\n      *ngIf=\"model.code\"\n      class=\"link\"\n      [routerLink]=\"{ cxRoute: 'orgBudgetCostCenters', params: model } | cxUrl\"\n      routerLinkActive=\"is-current\"\n    >\n      {{ 'orgBudget.links.costCenters' | cxTranslate }}\n    </a>\n  </section>\n</cx-org-card>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
function createCodeForEntityName(name, code) {
    var _a;
    if (!(code === null || code === void 0 ? void 0 : code.value)) {
        const codeFromName = (_a = name === null || name === void 0 ? void 0 : name.value) === null || _a === void 0 ? void 0 : _a.replace(/\s+/g, '-').toLowerCase();
        code === null || code === void 0 ? void 0 : code.patchValue(codeFromName);
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetFormComponent {
    constructor(itemService, unitService, currencyService) {
        this.itemService = itemService;
        this.unitService = unitService;
        this.currencyService = currencyService;
        this.form = this.itemService.getForm();
        this.units$ = this.unitService
            .getActiveUnitList()
            .pipe(tap((units) => {
            var _a, _b, _c;
            if (units && units.length === 1) {
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('orgUnit.uid')) === null || _b === void 0 ? void 0 : _b.setValue((_c = units[0]) === null || _c === void 0 ? void 0 : _c.id);
            }
        }));
        this.currencies$ = this.currencyService.getAll().pipe(tap((currency) => {
            var _a, _b, _c;
            if (currency.length === 1) {
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('currency.isocode')) === null || _b === void 0 ? void 0 : _b.setValue((_c = currency[0]) === null || _c === void 0 ? void 0 : _c.isocode);
            }
        }));
    }
    ngOnInit() {
        this.unitService.loadList();
    }
    createCodeWithName(name, code) {
        createCodeForEntityName(name, code);
    }
}
BudgetFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormComponent, deps: [{ token: ItemService }, { token: i2.OrgUnitService }, { token: i3.CurrencyService }], target: i0.ɵɵFactoryTarget.Component });
BudgetFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: BudgetFormComponent, selector: "cx-org-budget-form", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: BudgetItemService,
        },
        {
            provide: CurrentItemService,
            useExisting: CurrentBudgetService,
        },
    ], ngImport: i0, template: "<cx-org-form i18nRoot=\"orgBudget\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgBudget.name' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgBudget.name' | cxTranslate }}\"\n        formControlName=\"name\"\n        (blur)=\"createCodeWithName(form.get('name'), form.get('code'))\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgBudget.code' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgBudget.code' | cxTranslate }}\"\n        formControlName=\"code\"\n      />\n      <cx-form-errors [control]=\"form.get('code')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'orgBudget.startDate' | cxTranslate\n      }}</span>\n      <cx-date-picker\n        [control]=\"$any(form.get('startDate'))\"\n        [max]=\"form.get('endDate')?.value\"\n        [required]=\"true\"\n        (update)=\"form.get('endDate')?.updateValueAndValidity()\"\n      ></cx-date-picker>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{ 'orgBudget.endDate' | cxTranslate }}</span>\n      <cx-date-picker\n        [control]=\"$any(form.get('endDate'))\"\n        [min]=\"form.get('startDate')?.value\"\n        [required]=\"true\"\n        (update)=\"form.get('startDate')?.updateValueAndValidity()\"\n      ></cx-date-picker>\n    </label>\n\n    <label [formGroup]=\"$any(form.get('currency'))\">\n      <span class=\"label-content required\">{{\n        'orgBudget.currency' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"isocode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"currencies$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"isocode\"\n        [class.invalid]=\"form.get('currency.isocode')?.invalid ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgBudget.currency' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('currency.isocode')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{ 'orgBudget.amount' | cxTranslate }}</span>\n      <input\n        required=\"true\"\n        type=\"number\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgBudget.amount' | cxTranslate }}\"\n        formControlName=\"budget\"\n        min=\"0\"\n      />\n      <cx-form-errors [control]=\"form.get('budget')\"></cx-form-errors>\n    </label>\n\n    <label\n      *ngIf=\"units$ | async as units\"\n      [formGroup]=\"$any(form.get('orgUnit'))\"\n    >\n      <span class=\"label-content required\">{{\n        'orgBudget.businessUnits' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"units\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        [readonly]=\"form.get('orgUnit.uid')?.disabled ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgBudget.businessUnits' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('orgUnit.uid')\"></cx-form-errors>\n    </label>\n  </ng-container>\n</cx-org-form>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: FormComponent, selector: "cx-org-form", inputs: ["i18nRoot", "animateBack", "subtitle"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i7.MinValidator, selector: "input[type=number][min][formControlName],input[type=number][min][formControl],input[type=number][min][ngModel]", inputs: ["min"] }, { kind: "directive", type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: i1.DatePickerComponent, selector: "cx-date-picker", inputs: ["control", "min", "max", "required"], outputs: ["update"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-budget-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ItemService,
                            useExisting: BudgetItemService,
                        },
                        {
                            provide: CurrentItemService,
                            useExisting: CurrentBudgetService,
                        },
                    ], template: "<cx-org-form i18nRoot=\"orgBudget\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgBudget.name' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgBudget.name' | cxTranslate }}\"\n        formControlName=\"name\"\n        (blur)=\"createCodeWithName(form.get('name'), form.get('code'))\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgBudget.code' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgBudget.code' | cxTranslate }}\"\n        formControlName=\"code\"\n      />\n      <cx-form-errors [control]=\"form.get('code')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{\n        'orgBudget.startDate' | cxTranslate\n      }}</span>\n      <cx-date-picker\n        [control]=\"$any(form.get('startDate'))\"\n        [max]=\"form.get('endDate')?.value\"\n        [required]=\"true\"\n        (update)=\"form.get('endDate')?.updateValueAndValidity()\"\n      ></cx-date-picker>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{ 'orgBudget.endDate' | cxTranslate }}</span>\n      <cx-date-picker\n        [control]=\"$any(form.get('endDate'))\"\n        [min]=\"form.get('startDate')?.value\"\n        [required]=\"true\"\n        (update)=\"form.get('startDate')?.updateValueAndValidity()\"\n      ></cx-date-picker>\n    </label>\n\n    <label [formGroup]=\"$any(form.get('currency'))\">\n      <span class=\"label-content required\">{{\n        'orgBudget.currency' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"isocode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"currencies$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"isocode\"\n        [class.invalid]=\"form.get('currency.isocode')?.invalid ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgBudget.currency' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('currency.isocode')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content\">{{ 'orgBudget.amount' | cxTranslate }}</span>\n      <input\n        required=\"true\"\n        type=\"number\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgBudget.amount' | cxTranslate }}\"\n        formControlName=\"budget\"\n        min=\"0\"\n      />\n      <cx-form-errors [control]=\"form.get('budget')\"></cx-form-errors>\n    </label>\n\n    <label\n      *ngIf=\"units$ | async as units\"\n      [formGroup]=\"$any(form.get('orgUnit'))\"\n    >\n      <span class=\"label-content required\">{{\n        'orgBudget.businessUnits' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"units\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        [readonly]=\"form.get('orgUnit.uid')?.disabled ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgBudget.businessUnits' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('orgUnit.uid')\"></cx-form-errors>\n    </label>\n  </ng-container>\n</cx-org-form>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: i2.OrgUnitService }, { type: i3.CurrencyService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to populate Budget data to `Table` data. Budget
 * data is driven by the table configuration, using the `OrganizationTables.BUDGET`.
 */
class BudgetListService extends ListService {
    constructor(tableService, budgetService) {
        super(tableService);
        this.tableService = tableService;
        this.budgetService = budgetService;
        this.tableType = OrganizationTableType.BUDGET;
    }
    load(pagination) {
        return this.budgetService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertBudgets(raw)));
    }
    /**
     * Populates budget data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertBudgets({ pagination, sorts, values, }) {
        const budgetModels = {
            pagination,
            sorts,
            values: values.map((value) => {
                var _a;
                return (Object.assign(Object.assign({}, value), { currency: (_a = value.currency) === null || _a === void 0 ? void 0 : _a.isocode, unit: value.orgUnit }));
            }),
        };
        return budgetModels;
    }
}
BudgetListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetListService, deps: [{ token: i1.TableService }, { token: i2.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.BudgetService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
BudgetRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetRoutePageMetaResolver, deps: [{ token: i3.TranslationService }, { token: CurrentBudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
BudgetRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i3.TranslationService }, { type: CurrentBudgetService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const budgetCmsConfig = {
    cmsComponents: {
        ManageBudgetsListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: BudgetListService,
                },
                {
                    provide: ItemService,
                    useExisting: BudgetItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgBudget.breadcrumbs.list',
                            resolver: BudgetRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: BudgetFormComponent,
                    },
                    {
                        path: `:${ROUTE_PARAMS.budgetCode}`,
                        component: BudgetDetailsComponent,
                        data: {
                            cxPageMeta: {
                                breadcrumb: 'orgBudget.breadcrumbs.details',
                            },
                        },
                        children: [
                            {
                                path: `edit`,
                                component: BudgetFormComponent,
                            },
                            {
                                path: 'cost-centers',
                                component: BudgetCostCenterListComponent,
                            },
                        ],
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
function budgetTableConfigFactory() {
    return budgetTableConfig;
}
const budgetTableConfig = {
    table: {
        [OrganizationTableType.BUDGET]: {
            cells: ['name', 'active', 'amount', 'dateRange', 'unit'],
            options: {
                cells: {
                    name: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    amount: {
                        dataComponent: AmountCellComponent,
                    },
                    dateRange: {
                        dataComponent: DateRangeCellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.BUDGET_ASSIGNED_COST_CENTERS]: {
            cells: ['name'],
            options: {
                cells: {
                    name: {
                        dataComponent: CostCenterDetailsCellComponent,
                    },
                },
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
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
class BudgetCostCenterListModule {
}
BudgetCostCenterListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BudgetCostCenterListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListModule, declarations: [BudgetCostCenterListComponent], imports: [CommonModule, SubListModule] });
BudgetCostCenterListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListModule, imports: [CommonModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetCostCenterListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SubListModule],
                    declarations: [BudgetCostCenterListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ItemExistsModule {
}
ItemExistsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemExistsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ItemExistsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ItemExistsModule, declarations: [ItemExistsDirective], imports: [CommonModule], exports: [ItemExistsDirective] });
ItemExistsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemExistsModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ItemExistsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [ItemExistsDirective],
                    exports: [ItemExistsDirective],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetDetailsModule {
}
BudgetDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BudgetDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsModule, declarations: [BudgetDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule] });
BudgetDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ToggleStatusModule,
                        ItemExistsModule,
                        DisableInfoModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [BudgetDetailsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetFormModule {
}
BudgetFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BudgetFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormModule, declarations: [BudgetFormComponent], imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        ItemActiveModule,
        DatePickerModule] });
BudgetFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormModule, imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        ItemActiveModule,
        DatePickerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        ItemActiveModule,
                        DatePickerModule,
                    ],
                    declarations: [BudgetFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetComponentsModule {
}
BudgetComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BudgetComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BudgetComponentsModule, imports: [SharedOrganizationModule,
        BudgetDetailsModule,
        BudgetFormModule,
        BudgetCostCenterListModule] });
BudgetComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetComponentsModule, providers: [
        provideDefaultConfig(budgetCmsConfig),
        provideDefaultConfigFactory(budgetTableConfigFactory),
    ], imports: [SharedOrganizationModule,
        BudgetDetailsModule,
        BudgetFormModule,
        BudgetCostCenterListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        SharedOrganizationModule,
                        BudgetDetailsModule,
                        BudgetFormModule,
                        BudgetCostCenterListModule,
                    ],
                    providers: [
                        provideDefaultConfig(budgetCmsConfig),
                        provideDefaultConfigFactory(budgetTableConfigFactory),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetDetailsCellComponent extends CellComponent {
}
BudgetDetailsCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
BudgetDetailsCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: BudgetDetailsCellComponent, selector: "cx-org-budget-details-cell", usesInheritance: true, ngImport: i0, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgBudget.name' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgBudgetDetails',\n            params: model\n          } | cxUrl\n        \"\n      >\n        {{ model.name }}\n      </a>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.startDate' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.startDate | cxDate }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.endDate' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.endDate | cxDate }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.amount' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.budget }} {{ model.currency?.isocode }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.unit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model.name }}\n</button>\n", dependencies: [{ kind: "directive", type: i1.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.CxDatePipe, name: "cxDate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-budget-details-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgBudget.name' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgBudgetDetails',\n            params: model\n          } | cxUrl\n        \"\n      >\n        {{ model.name }}\n      </a>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.startDate' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.startDate | cxDate }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.endDate' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.endDate | cxDate }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.amount' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.budget }} {{ model.currency?.isocode }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgBudget.unit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model.name }}\n</button>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class BudgetDetailsCellModule {
}
BudgetDetailsCellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BudgetDetailsCellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellModule, declarations: [BudgetDetailsCellComponent], imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule], exports: [BudgetDetailsCellComponent] });
BudgetDetailsCellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellModule, imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
                    declarations: [BudgetDetailsCellComponent],
                    exports: [BudgetDetailsCellComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterBudgetListService extends SubListService {
    constructor(tableService, costCenterService, budgetService) {
        super(tableService);
        this.tableService = tableService;
        this.costCenterService = costCenterService;
        this.budgetService = budgetService;
        this.tableType = OrganizationTableType.COST_CENTER_BUDGETS;
        this._domainType = OrganizationTableType.BUDGET;
    }
    load(pagination, code) {
        return this.costCenterService.getBudgets(code, pagination);
    }
    /**
     * @override
     * Assign budget to the cost center.
     */
    assign(costCenterCode, budgetCode) {
        this.costCenterService.assignBudget(costCenterCode, budgetCode);
        return this.budgetService.getLoadingStatus(budgetCode);
    }
    /**
     * @override
     * Unassign the budget from the cost center.
     */
    unassign(costCenterCode, budgetCode) {
        this.costCenterService.unassignBudget(costCenterCode, budgetCode);
        return this.budgetService.getLoadingStatus(budgetCode);
    }
}
CostCenterBudgetListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListService, deps: [{ token: i1.TableService }, { token: i2.CostCenterService }, { token: i2.BudgetService }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterBudgetListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.CostCenterService }, { type: i2.BudgetService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterAssignedBudgetListService extends CostCenterBudgetListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.COST_CENTER_ASSIGNED_BUDGETS;
    }
    load(pagination, code) {
        return super
            .load(pagination, code)
            .pipe(map((budgets) => this.filterSelected(budgets)));
    }
}
CostCenterAssignedBudgetListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterAssignedBudgetListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
CostCenterAssignedBudgetListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterAssignedBudgetListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterAssignedBudgetListService, decorators: [{
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
class CostCenterAssignedBudgetListComponent {
}
CostCenterAssignedBudgetListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterAssignedBudgetListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CostCenterAssignedBudgetListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CostCenterAssignedBudgetListComponent, selector: "cx-org-cost-center-assigned-budget-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: CostCenterAssignedBudgetListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterAssignedBudgetListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-cost-center-assigned-budget-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: CostCenterAssignedBudgetListService,
                        },
                    ], template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterBudgetListComponent {
}
CostCenterBudgetListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CostCenterBudgetListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CostCenterBudgetListComponent, selector: "cx-org-cost-center-budget-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: CostCenterBudgetListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-cost-center-budget-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: CostCenterBudgetListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterBudgetListModule {
}
CostCenterBudgetListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CostCenterBudgetListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListModule, declarations: [CostCenterAssignedBudgetListComponent,
        CostCenterBudgetListComponent], imports: [ListModule, I18nModule, RouterModule, SubListModule] });
CostCenterBudgetListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListModule, imports: [ListModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterBudgetListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        CostCenterAssignedBudgetListComponent,
                        CostCenterBudgetListComponent,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CurrentCostCenterService extends CurrentItemService {
    constructor(routingService, costCenterService) {
        super(routingService);
        this.routingService = routingService;
        this.costCenterService = costCenterService;
    }
    getParamKey() {
        return ROUTE_PARAMS.costCenterCode;
    }
    getItem(code) {
        return this.costCenterService.get(code);
    }
    getError(code) {
        return this.costCenterService.getErrorState(code);
    }
}
CurrentCostCenterService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentCostCenterService, deps: [{ token: i3.RoutingService }, { token: i2.CostCenterService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentCostCenterService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentCostCenterService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentCostCenterService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.RoutingService }, { type: i2.CostCenterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterFormService extends FormService {
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('code', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('name', new UntypedFormControl('', Validators.required));
        form.setControl('currency', new UntypedFormGroup({
            isocode: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setControl('unit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        this.form = form;
    }
}
CostCenterFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
CostCenterFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormService, decorators: [{
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
class CostCenterItemService extends ItemService {
    constructor(currentItemService, routingService, formService, costCenterService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.costCenterService = costCenterService;
    }
    load(code) {
        this.costCenterService.load(code);
        return this.costCenterService.get(code);
    }
    update(code, value) {
        var _a;
        this.costCenterService.update(code, value);
        return this.costCenterService.getLoadingStatus((_a = value.code) !== null && _a !== void 0 ? _a : '');
    }
    create(value) {
        var _a;
        this.costCenterService.create(value);
        return this.costCenterService.getLoadingStatus((_a = value.code) !== null && _a !== void 0 ? _a : '');
    }
    getDetailsRoute() {
        return 'orgCostCenterDetails';
    }
}
CostCenterItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterItemService, deps: [{ token: CurrentCostCenterService }, { token: i3.RoutingService }, { token: CostCenterFormService }, { token: i2.CostCenterService }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CurrentCostCenterService }, { type: i3.RoutingService }, { type: CostCenterFormService }, { type: i2.CostCenterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterDetailsComponent {
    constructor(itemService) {
        this.itemService = itemService;
        this.model$ = this.itemService.key$.pipe(switchMap((code) => this.itemService.load(code)), startWith({}));
        this.isInEditMode$ = this.itemService.isInEditMode$;
    }
}
CostCenterDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsComponent, deps: [{ token: ItemService }], target: i0.ɵɵFactoryTarget.Component });
CostCenterDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CostCenterDetailsComponent, selector: "cx-org-cost-center-details", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: CostCenterItemService,
        },
    ], ngImport: i0, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgCostCenter.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgCostCenterEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status actions i18nRoot=\"orgCostCenter\"></cx-org-toggle-status>\n\n  <cx-org-disable-info info i18nRoot=\"orgCostCenter\"> </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.active' | cxTranslate }}</label>\n      <span\n        class=\"value\"\n        [class.is-active]=\"model.active\"\n        [class.is-inactive]=\"!model.active\"\n      >\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.currency' | cxTranslate }}</label>\n\n      <span class=\"value\">\n        {{ model.currency?.isocode }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.unit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.unit\n          } | cxUrl\n        \"\n      >\n        {{ model.unit?.name }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <a\n      *ngIf=\"model.code\"\n      class=\"link\"\n      [routerLink]=\"{ cxRoute: 'orgCostCenterBudgets', params: model } | cxUrl\"\n      routerLinkActive=\"is-current\"\n    >\n      {{ 'orgCostCenter.budget.link' | cxTranslate }}\n    </a>\n  </section>\n</cx-org-card>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: ToggleStatusComponent, selector: "cx-org-toggle-status", inputs: ["i18nRoot", "key", "disabled"] }, { kind: "directive", type: ItemExistsDirective, selector: "[cxOrgItemExists]" }, { kind: "component", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-cost-center-details', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: ItemService,
                            useExisting: CostCenterItemService,
                        },
                    ], host: { class: 'content-wrapper' }, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgCostCenter.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgCostCenterEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status actions i18nRoot=\"orgCostCenter\"></cx-org-toggle-status>\n\n  <cx-org-disable-info info i18nRoot=\"orgCostCenter\"> </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.active' | cxTranslate }}</label>\n      <span\n        class=\"value\"\n        [class.is-active]=\"model.active\"\n        [class.is-inactive]=\"!model.active\"\n      >\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.currency' | cxTranslate }}</label>\n\n      <span class=\"value\">\n        {{ model.currency?.isocode }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgCostCenter.unit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.unit\n          } | cxUrl\n        \"\n      >\n        {{ model.unit?.name }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <a\n      *ngIf=\"model.code\"\n      class=\"link\"\n      [routerLink]=\"{ cxRoute: 'orgCostCenterBudgets', params: model } | cxUrl\"\n      routerLinkActive=\"is-current\"\n    >\n      {{ 'orgCostCenter.budget.link' | cxTranslate }}\n    </a>\n  </section>\n</cx-org-card>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterFormComponent {
    /**
     * Initialize the business unit for the cost center.
     *
     * If there's a unit provided, we disable the form control.
     */
    set unitKey(value) {
        var _a, _b, _c, _d;
        if (value) {
            (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('unit.uid')) === null || _b === void 0 ? void 0 : _b.setValue(value);
            (_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.get('unit')) === null || _d === void 0 ? void 0 : _d.disable();
        }
    }
    constructor(itemService, unitService, currencyService) {
        this.itemService = itemService;
        this.unitService = unitService;
        this.currencyService = currencyService;
        this.form = this.itemService.getForm();
        this.units$ = this.unitService
            .getActiveUnitList()
            .pipe(tap((units) => {
            var _a, _b, _c;
            if (units && units.length === 1) {
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('unit.uid')) === null || _b === void 0 ? void 0 : _b.setValue((_c = units[0]) === null || _c === void 0 ? void 0 : _c.id);
            }
        }));
        this.currencies$ = this.currencyService.getAll().pipe(tap((currency) => {
            var _a, _b, _c;
            if (currency.length === 1) {
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('currency.isocode')) === null || _b === void 0 ? void 0 : _b.setValue((_c = currency[0]) === null || _c === void 0 ? void 0 : _c.isocode);
            }
        }));
    }
    createCodeWithName(name, code) {
        createCodeForEntityName(name, code);
    }
}
CostCenterFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormComponent, deps: [{ token: ItemService }, { token: i2.OrgUnitService }, { token: i3.CurrencyService }], target: i0.ɵɵFactoryTarget.Component });
CostCenterFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CostCenterFormComponent, selector: "cx-org-cost-center-form", inputs: { unitKey: "unitKey" }, host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: CostCenterItemService,
        },
        {
            provide: CurrentItemService,
            useExisting: CurrentCostCenterService,
        },
    ], ngImport: i0, template: "<cx-org-form i18nRoot=\"orgCostCenter\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgCostCenter.name' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgCostCenter.name' | cxTranslate }}\"\n        formControlName=\"name\"\n        (blur)=\"createCodeWithName(form.get('name'), form.get('code'))\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgCostCenter.code' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgCostCenter.code' | cxTranslate }}\"\n        formControlName=\"code\"\n      />\n      <cx-form-errors [control]=\"form.get('code')\"></cx-form-errors>\n    </label>\n\n    <label formGroupName=\"currency\">\n      <span class=\"label-content required\">{{\n        'orgCostCenter.currency' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"isocode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"currencies$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"isocode\"\n        [class.invalid]=\"form.get('currency.isocode')?.invalid ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgCostCenter.currency' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('currency.isocode')\"></cx-form-errors>\n    </label>\n\n    <label [formGroup]=\"$any(form.get('unit'))\">\n      <span class=\"label-content required\">{{\n        'orgCostCenter.unit' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"(units$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        [readonly]=\"form.get('unit.uid')?.disabled ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgCostCenter.unit' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('unit.uid')\"></cx-form-errors>\n    </label>\n  </ng-container>\n</cx-org-form>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: FormComponent, selector: "cx-org-form", inputs: ["i18nRoot", "animateBack", "subtitle"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i7.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-cost-center-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ItemService,
                            useExisting: CostCenterItemService,
                        },
                        {
                            provide: CurrentItemService,
                            useExisting: CurrentCostCenterService,
                        },
                    ], template: "<cx-org-form i18nRoot=\"orgCostCenter\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgCostCenter.name' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgCostCenter.name' | cxTranslate }}\"\n        formControlName=\"name\"\n        (blur)=\"createCodeWithName(form.get('name'), form.get('code'))\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgCostCenter.code' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgCostCenter.code' | cxTranslate }}\"\n        formControlName=\"code\"\n      />\n      <cx-form-errors [control]=\"form.get('code')\"></cx-form-errors>\n    </label>\n\n    <label formGroupName=\"currency\">\n      <span class=\"label-content required\">{{\n        'orgCostCenter.currency' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"isocode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"currencies$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"isocode\"\n        [class.invalid]=\"form.get('currency.isocode')?.invalid ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgCostCenter.currency' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('currency.isocode')\"></cx-form-errors>\n    </label>\n\n    <label [formGroup]=\"$any(form.get('unit'))\">\n      <span class=\"label-content required\">{{\n        'orgCostCenter.unit' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"(units$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        [readonly]=\"form.get('unit.uid')?.disabled ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgCostCenter.unit' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('unit.uid')\"></cx-form-errors>\n    </label>\n  </ng-container>\n</cx-org-form>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: i2.OrgUnitService }, { type: i3.CurrencyService }]; }, propDecorators: { unitKey: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to populate Cost Center data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER`.
 */
class CostCenterListService extends ListService {
    constructor(tableService, costCenterService) {
        super(tableService);
        this.tableService = tableService;
        this.costCenterService = costCenterService;
        this.tableType = OrganizationTableType.COST_CENTER;
    }
    load(pagination) {
        return this.costCenterService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertCostCenters(raw)));
    }
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertCostCenters({ pagination, sorts, values, }) {
        const costCenterModels = {
            pagination,
            sorts,
            values: values.map((value) => {
                var _a;
                return (Object.assign(Object.assign({}, value), { currency: (_a = value.currency) === null || _a === void 0 ? void 0 : _a.isocode }));
            }),
        };
        return costCenterModels;
    }
}
CostCenterListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterListService, deps: [{ token: i1.TableService }, { token: i2.CostCenterService }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.CostCenterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
CostCenterRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterRoutePageMetaResolver, deps: [{ token: i3.TranslationService }, { token: CurrentCostCenterService }], target: i0.ɵɵFactoryTarget.Injectable });
CostCenterRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i3.TranslationService }, { type: CurrentCostCenterService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const costCenterCmsConfig = {
    cmsComponents: {
        ManageCostCentersListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: CostCenterListService,
                },
                {
                    provide: ItemService,
                    useExisting: CostCenterItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgCostCenter.breadcrumbs.list',
                            resolver: CostCenterRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: CostCenterFormComponent,
                    },
                    {
                        path: `:${ROUTE_PARAMS.costCenterCode}`,
                        component: CostCenterDetailsComponent,
                        data: {
                            cxPageMeta: { breadcrumb: 'orgCostCenter.breadcrumbs.details' },
                        },
                        children: [
                            {
                                path: 'edit',
                                component: CostCenterFormComponent,
                            },
                            {
                                path: 'budgets',
                                data: {
                                    cxPageMeta: {
                                        breadcrumb: 'orgCostCenter.breadcrumbs.budgets',
                                    },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: CostCenterAssignedBudgetListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: CostCenterBudgetListComponent,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
function costCenterTableConfigFactory() {
    return costCenterTableConfig;
}
const costCenterTableConfig = {
    table: {
        [OrganizationTableType.COST_CENTER]: {
            cells: ['name', 'active', 'currency', 'unit'],
            options: {
                cells: {
                    name: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    currency: {
                        dataComponent: CellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.COST_CENTER_ASSIGNED_BUDGETS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: BudgetDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                },
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
            },
        },
        [OrganizationTableType.COST_CENTER_BUDGETS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: BudgetDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
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
class CostCenterDetailsModule {
}
CostCenterDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CostCenterDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsModule, declarations: [CostCenterDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule], exports: [CostCenterDetailsComponent] });
CostCenterDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ToggleStatusModule,
                        ItemExistsModule,
                        DisableInfoModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [CostCenterDetailsComponent],
                    exports: [CostCenterDetailsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterFormModule {
}
CostCenterFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CostCenterFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormModule, declarations: [CostCenterFormComponent], imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        ItemActiveModule], exports: [CostCenterFormComponent] });
CostCenterFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormModule, providers: [CurrencyService, OrgUnitService], imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        ItemActiveModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        ItemActiveModule,
                    ],
                    declarations: [CostCenterFormComponent],
                    exports: [CostCenterFormComponent],
                    providers: [CurrencyService, OrgUnitService],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CostCenterComponentsModule {
}
CostCenterComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CostCenterComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CostCenterComponentsModule, imports: [SharedOrganizationModule,
        CostCenterDetailsModule,
        CostCenterFormModule,
        CostCenterBudgetListModule,
        BudgetDetailsCellModule] });
CostCenterComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterComponentsModule, providers: [
        provideDefaultConfig(costCenterCmsConfig),
        provideDefaultConfigFactory(costCenterTableConfigFactory),
    ], imports: [SharedOrganizationModule,
        CostCenterDetailsModule,
        CostCenterFormModule,
        CostCenterBudgetListModule,
        BudgetDetailsCellModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        SharedOrganizationModule,
                        CostCenterDetailsModule,
                        CostCenterFormModule,
                        CostCenterBudgetListModule,
                        BudgetDetailsCellModule,
                    ],
                    providers: [
                        provideDefaultConfig(costCenterCmsConfig),
                        provideDefaultConfigFactory(costCenterTableConfigFactory),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CurrentPermissionService extends CurrentItemService {
    constructor(routingService, permissionService) {
        super(routingService);
        this.routingService = routingService;
        this.permissionService = permissionService;
    }
    getParamKey() {
        return ROUTE_PARAMS.permissionCode;
    }
    getItem(code) {
        return this.permissionService.get(code);
    }
    getError(code) {
        return this.permissionService.getErrorState(code);
    }
}
CurrentPermissionService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentPermissionService, deps: [{ token: i3.RoutingService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentPermissionService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentPermissionService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentPermissionService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.RoutingService }, { type: i2.PermissionService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var PermissionType;
(function (PermissionType) {
    PermissionType["ORDER"] = "B2BOrderThresholdPermission";
    PermissionType["TIME_SPAN"] = "B2BOrderThresholdTimespanPermission";
    PermissionType["EXCEEDED"] = "B2BBudgetExceededPermission";
})(PermissionType || (PermissionType = {}));
class PermissionFormService extends FormService {
    constructor() {
        super(...arguments);
        this.subscription = new Subscription();
    }
    /**
     * @override
     * Builds a generic sub form for permissions and amends the form
     * based on the for approval permission type.
     */
    build() {
        var _a, _b;
        const form = new UntypedFormGroup({});
        form.setControl('code', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('orgUnit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setControl('orderApprovalPermissionType', new UntypedFormGroup({
            code: new UntypedFormControl(undefined, Validators.required),
        }));
        // subscribe to permission type changes and amend accordingly.
        this.subscription.add((_b = (_a = form
            .get('orderApprovalPermissionType')) === null || _a === void 0 ? void 0 : _a.get('code')) === null || _b === void 0 ? void 0 : _b.valueChanges.pipe(distinctUntilChanged(), filter((code) => !!code)).subscribe((code) => this.amend(form, code)));
        this.form = form;
    }
    /**
     * @override
     * The form is using  `B2BBudgetExceededPermission` by default.
     */
    get defaultValue() {
        return {
            orderApprovalPermissionType: {
                code: PermissionType.EXCEEDED,
            },
        };
    }
    /**
     * Amends the form structure based on the `PermissionType`.
     */
    amend(form, code) {
        if (code === PermissionType.EXCEEDED) {
            form.removeControl('periodRange');
            form.removeControl('currency');
            form.removeControl('threshold');
        }
        if (code === PermissionType.TIME_SPAN || code === PermissionType.ORDER) {
            if (!form.get('currency')) {
                form.setControl('currency', new UntypedFormGroup({
                    isocode: new UntypedFormControl(undefined, Validators.required),
                }));
            }
            if (!form.get('threshold')) {
                form.setControl('threshold', new UntypedFormControl('', Validators.required));
            }
        }
        if (code === PermissionType.ORDER) {
            form.removeControl('periodRange');
        }
        if (code === PermissionType.TIME_SPAN) {
            if (!form.get('periodRange')) {
                form.setControl('periodRange', new UntypedFormControl('', Validators.required));
            }
        }
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    patchData(item) {
        var _a, _b;
        super.patchData(item);
        if ((item === null || item === void 0 ? void 0 : item.code) !== undefined) {
            (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('orderApprovalPermissionType')) === null || _b === void 0 ? void 0 : _b.disable();
        }
    }
}
PermissionFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
PermissionFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormService, decorators: [{
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
class PermissionItemService extends ItemService {
    constructor(currentItemService, routingService, formService, permissionService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.permissionService = permissionService;
    }
    load(code) {
        this.permissionService.loadPermission(code);
        return this.permissionService.get(code);
    }
    update(code, value) {
        var _a;
        this.permissionService.update(code, value);
        return this.permissionService.getLoadingStatus((_a = value.code) !== null && _a !== void 0 ? _a : '');
    }
    create(value) {
        var _a;
        this.permissionService.create(value);
        return this.permissionService.getLoadingStatus((_a = value.code) !== null && _a !== void 0 ? _a : '');
    }
    getDetailsRoute() {
        return 'orgPurchaseLimitDetails';
    }
}
PermissionItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionItemService, deps: [{ token: CurrentPermissionService }, { token: i3.RoutingService }, { token: PermissionFormService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CurrentPermissionService }, { type: i3.RoutingService }, { type: PermissionFormService }, { type: i2.PermissionService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PermissionDetailsComponent {
    constructor(itemService) {
        this.itemService = itemService;
        this.model$ = this.itemService.key$.pipe(switchMap((code) => this.itemService.load(code)), startWith({}));
        this.isInEditMode$ = this.itemService.isInEditMode$;
    }
}
PermissionDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsComponent, deps: [{ token: ItemService }], target: i0.ɵɵFactoryTarget.Component });
PermissionDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PermissionDetailsComponent, selector: "cx-org-permission-details", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: PermissionItemService,
        },
    ], ngImport: i0, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgPurchaseLimit.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgPurchaseLimitEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status\n    actions\n    i18nRoot=\"orgPurchaseLimit\"\n    [disabled]=\"false\"\n  ></cx-org-toggle-status>\n\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgPurchaseLimit\"\n    [displayInfoConfig]=\"{ disabledEnable: false }\"\n  >\n  </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{\n        'orgPurchaseLimit.orderApprovalPermissionType' | cxTranslate\n      }}</label>\n      <span class=\"value\">\n        {{ model.orderApprovalPermissionType?.name }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.threshold || model.threshold === 0\">\n      <label>{{ 'orgPurchaseLimit.threshold' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.threshold }} {{ model.currency?.symbol }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.periodRange\">\n      <label>{{ 'orgPurchaseLimit.periodRange' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.periodRange }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.unit' | cxTranslate }}</label>\n      <a\n        *ngIf=\"model.code\"\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </section>\n</cx-org-card>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: ToggleStatusComponent, selector: "cx-org-toggle-status", inputs: ["i18nRoot", "key", "disabled"] }, { kind: "directive", type: ItemExistsDirective, selector: "[cxOrgItemExists]" }, { kind: "component", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-permission-details', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: ItemService,
                            useExisting: PermissionItemService,
                        },
                    ], host: { class: 'content-wrapper' }, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgPurchaseLimit.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgPurchaseLimitEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status\n    actions\n    i18nRoot=\"orgPurchaseLimit\"\n    [disabled]=\"false\"\n  ></cx-org-toggle-status>\n\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgPurchaseLimit\"\n    [displayInfoConfig]=\"{ disabledEnable: false }\"\n  >\n  </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.code' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.code }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{\n        'orgPurchaseLimit.orderApprovalPermissionType' | cxTranslate\n      }}</label>\n      <span class=\"value\">\n        {{ model.orderApprovalPermissionType?.name }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.threshold || model.threshold === 0\">\n      <label>{{ 'orgPurchaseLimit.threshold' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.threshold }} {{ model.currency?.symbol }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.periodRange\">\n      <label>{{ 'orgPurchaseLimit.periodRange' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.periodRange }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.unit' | cxTranslate }}</label>\n      <a\n        *ngIf=\"model.code\"\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </section>\n</cx-org-card>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PermissionDetailsModule {
}
PermissionDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PermissionDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsModule, declarations: [PermissionDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule], exports: [PermissionDetailsComponent] });
PermissionDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ToggleStatusModule,
                        ItemExistsModule,
                        DisableInfoModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [PermissionDetailsComponent],
                    exports: [PermissionDetailsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PermissionFormComponent {
    constructor(itemService, unitService, currencyService, permissionService) {
        this.itemService = itemService;
        this.unitService = unitService;
        this.currencyService = currencyService;
        this.permissionService = permissionService;
        this.form = this.itemService.getForm();
        this.units$ = this.unitService
            .getActiveUnitList()
            .pipe(tap((units) => {
            var _a, _b;
            if (units && units.length === 1) {
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('orgUnit.uid')) === null || _b === void 0 ? void 0 : _b.setValue(units[0].id);
            }
        }));
        this.currencies$ = this.currencyService.getAll().pipe(tap((currency) => {
            var _a, _b, _c;
            if (currency.length === 1) {
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('currency.isocode')) === null || _b === void 0 ? void 0 : _b.setValue((_c = currency[0]) === null || _c === void 0 ? void 0 : _c.isocode);
            }
        }));
        this.types$ = this.permissionService.getTypes();
        this.periods = Object.keys(Period);
    }
    ngOnInit() {
        this.unitService.loadList();
    }
}
PermissionFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormComponent, deps: [{ token: ItemService }, { token: i2.OrgUnitService }, { token: i3.CurrencyService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Component });
PermissionFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PermissionFormComponent, selector: "cx-org-permission-form", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: PermissionItemService,
        },
        {
            provide: CurrentItemService,
            useExisting: CurrentPermissionService,
        },
    ], ngImport: i0, template: "<cx-org-form i18nRoot=\"orgPurchaseLimit\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.code' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgPurchaseLimit.code' | cxTranslate }}\"\n        formControlName=\"code\"\n      />\n      <cx-form-errors [control]=\"form.get('code')\"></cx-form-errors>\n    </label>\n\n    <label\n      *ngIf=\"(types$ | async)?.length\"\n      [formGroup]=\"$any(form.get('orderApprovalPermissionType'))\"\n    >\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.orderApprovalPermissionType' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"code\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"(types$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        [readonly]=\"form.disabled\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"\n          'orgPurchaseLimit.orderApprovalPermissionType' | cxTranslate\n        \"\n      >\n      </ng-select>\n      <cx-form-errors\n        [control]=\"form.get('orderApprovalPermissionType.code')\"\n      ></cx-form-errors>\n    </label>\n\n    <label *ngIf=\"form.get('periodRange')\">\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.periodRange' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"periodRange\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"periods\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgPurchaseLimit.periodRange' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('periodRange')\"></cx-form-errors>\n    </label>\n\n    <label\n      *ngIf=\"form.get('currency')\"\n      [formGroup]=\"$any(form.get('currency'))\"\n    >\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.currency' | cxTranslate\n      }}</span>\n      <ng-select\n        *ngIf=\"currencies$ | async as currencies\"\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"isocode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"currencies\"\n        bindLabel=\"name\"\n        bindValue=\"isocode\"\n        [placeholder]=\"'orgPurchaseLimit.currency' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('currency.isocode')\"></cx-form-errors>\n    </label>\n\n    <label *ngIf=\"form.get('threshold')\">\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.threshold' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"number\"\n        required\n        placeholder=\"{{ 'orgPurchaseLimit.threshold' | cxTranslate }}\"\n        formControlName=\"threshold\"\n      />\n      <cx-form-errors [control]=\"form.get('threshold')\"></cx-form-errors>\n    </label>\n\n    <label [formGroup]=\"$any(form.get('orgUnit'))\">\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.orgUnit' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"(units$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        [readonly]=\"form.get('orgUnit')?.disabled ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgPurchaseLimit.orgUnit' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('orgUnit.uid')\"></cx-form-errors>\n    </label>\n  </ng-container>\n</cx-org-form>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: FormComponent, selector: "cx-org-form", inputs: ["i18nRoot", "animateBack", "subtitle"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-permission-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ItemService,
                            useExisting: PermissionItemService,
                        },
                        {
                            provide: CurrentItemService,
                            useExisting: CurrentPermissionService,
                        },
                    ], template: "<cx-org-form i18nRoot=\"orgPurchaseLimit\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.code' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgPurchaseLimit.code' | cxTranslate }}\"\n        formControlName=\"code\"\n      />\n      <cx-form-errors [control]=\"form.get('code')\"></cx-form-errors>\n    </label>\n\n    <label\n      *ngIf=\"(types$ | async)?.length\"\n      [formGroup]=\"$any(form.get('orderApprovalPermissionType'))\"\n    >\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.orderApprovalPermissionType' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"code\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"(types$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        [readonly]=\"form.disabled\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"\n          'orgPurchaseLimit.orderApprovalPermissionType' | cxTranslate\n        \"\n      >\n      </ng-select>\n      <cx-form-errors\n        [control]=\"form.get('orderApprovalPermissionType.code')\"\n      ></cx-form-errors>\n    </label>\n\n    <label *ngIf=\"form.get('periodRange')\">\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.periodRange' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"periodRange\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"periods\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgPurchaseLimit.periodRange' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('periodRange')\"></cx-form-errors>\n    </label>\n\n    <label\n      *ngIf=\"form.get('currency')\"\n      [formGroup]=\"$any(form.get('currency'))\"\n    >\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.currency' | cxTranslate\n      }}</span>\n      <ng-select\n        *ngIf=\"currencies$ | async as currencies\"\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"isocode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"currencies\"\n        bindLabel=\"name\"\n        bindValue=\"isocode\"\n        [placeholder]=\"'orgPurchaseLimit.currency' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('currency.isocode')\"></cx-form-errors>\n    </label>\n\n    <label *ngIf=\"form.get('threshold')\">\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.threshold' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"number\"\n        required\n        placeholder=\"{{ 'orgPurchaseLimit.threshold' | cxTranslate }}\"\n        formControlName=\"threshold\"\n      />\n      <cx-form-errors [control]=\"form.get('threshold')\"></cx-form-errors>\n    </label>\n\n    <label [formGroup]=\"$any(form.get('orgUnit'))\">\n      <span class=\"label-content required\">{{\n        'orgPurchaseLimit.orgUnit' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"(units$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        [readonly]=\"form.get('orgUnit')?.disabled ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgPurchaseLimit.orgUnit' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('orgUnit.uid')\"></cx-form-errors>\n    </label>\n  </ng-container>\n</cx-org-form>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: i2.OrgUnitService }, { type: i3.CurrencyService }, { type: i2.PermissionService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PermissionFormModule {
}
PermissionFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PermissionFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormModule, declarations: [PermissionFormComponent], imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FormModule,
        ItemActiveModule], exports: [PermissionFormComponent] });
PermissionFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormModule, imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FormModule,
        ItemActiveModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        FormModule,
                        ItemActiveModule,
                    ],
                    declarations: [PermissionFormComponent],
                    exports: [PermissionFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to populate permission data to `Table` data. The permission
 * data is driven by the table configuration, using the `OrganizationTables.PERMISSION`.
 */
class PermissionListService extends ListService {
    constructor(tableService, permissionsService) {
        super(tableService);
        this.tableService = tableService;
        this.permissionsService = permissionsService;
        this.tableType = OrganizationTableType.PERMISSION;
    }
    load(pagination) {
        return this.permissionsService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertPermissions(raw)));
    }
    /**
     * Populates the permission data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertPermissions({ pagination, sorts, values, }) {
        const permissionGroupModels = {
            pagination,
            sorts,
            values: values.map((value) => (Object.assign(Object.assign({}, value), { unit: value.orgUnit }))),
        };
        return permissionGroupModels;
    }
}
PermissionListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionListService, deps: [{ token: i1.TableService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.PermissionService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PermissionRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
PermissionRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionRoutePageMetaResolver, deps: [{ token: i3.TranslationService }, { token: CurrentPermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i3.TranslationService }, { type: CurrentPermissionService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const permissionCmsConfig = {
    cmsComponents: {
        ManagePermissionsListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: PermissionListService,
                },
                {
                    provide: ItemService,
                    useExisting: PermissionItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgPurchaseLimit.breadcrumbs.list',
                            resolver: PermissionRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: PermissionFormComponent,
                    },
                    {
                        path: `:${ROUTE_PARAMS.permissionCode}`,
                        component: PermissionDetailsComponent,
                        data: {
                            cxPageMeta: {
                                breadcrumb: 'orgPurchaseLimit.breadcrumbs.details',
                            },
                        },
                        children: [
                            {
                                path: 'edit',
                                component: PermissionFormComponent,
                            },
                        ],
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
function permissionTableConfigFactory() {
    return permissionTableConfig;
}
const permissionTableConfig = {
    table: {
        [OrganizationTableType.PERMISSION]: {
            cells: ['code', 'active', 'limit', 'unit'],
            options: {
                cells: {
                    code: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                    limit: {
                        dataComponent: LimitCellComponent,
                    },
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
class PermissionComponentsModule {
}
PermissionComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PermissionComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PermissionComponentsModule, imports: [SharedOrganizationModule,
        PermissionDetailsModule,
        PermissionFormModule] });
PermissionComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionComponentsModule, providers: [
        provideDefaultConfig(permissionCmsConfig),
        provideDefaultConfigFactory(permissionTableConfigFactory),
    ], imports: [SharedOrganizationModule,
        PermissionDetailsModule,
        PermissionFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        SharedOrganizationModule,
                        PermissionDetailsModule,
                        PermissionFormModule,
                    ],
                    providers: [
                        provideDefaultConfig(permissionCmsConfig),
                        provideDefaultConfigFactory(permissionTableConfigFactory),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CurrentUnitService extends CurrentItemService {
    constructor(routingService, orgUnitService) {
        super(routingService);
        this.routingService = routingService;
        this.orgUnitService = orgUnitService;
    }
    getParamKey() {
        return ROUTE_PARAMS.unitCode;
    }
    getItem(code) {
        return this.orgUnitService.get(code);
    }
    getError(code) {
        return this.orgUnitService.getErrorState(code);
    }
}
CurrentUnitService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitService, deps: [{ token: i3.RoutingService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUnitService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.RoutingService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitFormService extends FormService {
    patchData(item) {
        this.toggleParentUnit(item);
        super.patchData(item);
    }
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('uid', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('name', new UntypedFormControl('', Validators.required));
        form.setControl('approvalProcess', new UntypedFormGroup({
            code: new UntypedFormControl(null),
        }));
        this.form = form;
        this.toggleParentUnit();
    }
    toggleParentUnit(item) {
        var _a, _b, _c;
        if (this.isRootUnit(item)) {
            (_a = this.form) === null || _a === void 0 ? void 0 : _a.removeControl('parentOrgUnit');
        }
        else if (!((_b = this.form) === null || _b === void 0 ? void 0 : _b.get('parentOrgUnit'))) {
            (_c = this.form) === null || _c === void 0 ? void 0 : _c.setControl('parentOrgUnit', new UntypedFormGroup({
                uid: new UntypedFormControl(null, Validators.required),
            }));
        }
    }
    isRootUnit(item) {
        // as we don't have full response after toggle item status,
        // we have situation where we have object like {uid, active},
        // so decided to check name as alternative required property
        return Boolean((item === null || item === void 0 ? void 0 : item.uid) &&
            (item === null || item === void 0 ? void 0 : item.name) &&
            (!(item === null || item === void 0 ? void 0 : item.parentOrgUnit) || (item === null || item === void 0 ? void 0 : item.uid) === (item === null || item === void 0 ? void 0 : item.parentOrgUnit)));
    }
}
UnitFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnitFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormService, decorators: [{
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
class UnitItemService extends ItemService {
    constructor(currentItemService, routingService, formService, unitService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.unitService = unitService;
    }
    /**
     * @override
     * Returns the unit for the given code.
     *
     * Loads the unit each time, to ensure accurate data is resolved.
     */
    load(code) {
        this.unitService.load(code);
        return this.unitService.get(code);
    }
    update(code, value) {
        var _a;
        this.unitService.update(code, value);
        return this.unitService.getLoadingStatus((_a = value.uid) !== null && _a !== void 0 ? _a : '');
    }
    create(value) {
        var _a;
        this.unitService.create(value);
        return this.unitService.getLoadingStatus((_a = value.uid) !== null && _a !== void 0 ? _a : '');
    }
    /**
     * @override
     * Returns 'unitDetails'
     */
    getDetailsRoute() {
        return 'orgUnitDetails';
    }
}
UnitItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitItemService, deps: [{ token: CurrentUnitService }, { token: i3.RoutingService }, { token: UnitFormService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CurrentUnitService }, { type: i3.RoutingService }, { type: UnitFormService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitDetailsComponent {
    constructor(itemService, orgUnitService) {
        this.itemService = itemService;
        this.orgUnitService = orgUnitService;
        this.model$ = this.itemService.key$.pipe(switchMap((code) => this.itemService.load(code)), startWith({}));
        this.isInEditMode$ = this.itemService.isInEditMode$;
        this.isUpdatingUnitAllowed = this.orgUnitService
            ? this.orgUnitService.isUpdatingUnitAllowed()
            : true;
    }
}
UnitDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsComponent, deps: [{ token: ItemService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitDetailsComponent, selector: "cx-org-unit-details", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: UnitItemService,
        },
    ], ngImport: i0, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgUnit.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n  [showHint]=\"true\"\n>\n  <a\n    actions\n    *ngIf=\"isUpdatingUnitAllowed\"\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgUnitEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status\n    actions\n    key=\"uid\"\n    *ngIf=\"isUpdatingUnitAllowed\"\n    i18nRoot=\"orgUnit\"\n  ></cx-org-toggle-status>\n\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnit\"\n    [displayInfoConfig]=\"{ disabledDisable: true }\"\n  >\n  </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgUnit.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUnit.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.uid }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUnit.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.approvalProcess?.name\">\n      <label>{{ 'orgUnit.approvalProcess' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.approvalProcess?.name }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.parentOrgUnit\">\n      <label>{{ 'orgUnit.parentUnit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.parentOrgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.parentOrgUnit?.name }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <ng-container *ngIf=\"model.uid\">\n      <a\n        class=\"link\"\n        *ngIf=\"isUpdatingUnitAllowed\"\n        [routerLink]=\"{ cxRoute: 'orgUnitChildren', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.units' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUnitUserList', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.users' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUnitApprovers', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.approvers' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUnitAddressList', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.shippingAddresses' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUnitCostCenters', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.costCenters' | cxTranslate }}\n      </a>\n    </ng-container>\n  </section>\n</cx-org-card>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: ToggleStatusComponent, selector: "cx-org-toggle-status", inputs: ["i18nRoot", "key", "disabled"] }, { kind: "directive", type: ItemExistsDirective, selector: "[cxOrgItemExists]" }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-details', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: ItemService,
                            useExisting: UnitItemService,
                        },
                    ], host: { class: 'content-wrapper' }, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgUnit.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n  [showHint]=\"true\"\n>\n  <a\n    actions\n    *ngIf=\"isUpdatingUnitAllowed\"\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgUnitEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status\n    actions\n    key=\"uid\"\n    *ngIf=\"isUpdatingUnitAllowed\"\n    i18nRoot=\"orgUnit\"\n  ></cx-org-toggle-status>\n\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnit\"\n    [displayInfoConfig]=\"{ disabledDisable: true }\"\n  >\n  </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgUnit.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUnit.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.uid }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUnit.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.approvalProcess?.name\">\n      <label>{{ 'orgUnit.approvalProcess' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.approvalProcess?.name }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.parentOrgUnit\">\n      <label>{{ 'orgUnit.parentUnit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.parentOrgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.parentOrgUnit?.name }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <ng-container *ngIf=\"model.uid\">\n      <a\n        class=\"link\"\n        *ngIf=\"isUpdatingUnitAllowed\"\n        [routerLink]=\"{ cxRoute: 'orgUnitChildren', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.units' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUnitUserList', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.users' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUnitApprovers', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.approvers' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUnitAddressList', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.shippingAddresses' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUnitCostCenters', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUnit.links.costCenters' | cxTranslate }}\n      </a>\n    </ng-container>\n  </section>\n</cx-org-card>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitDetailsModule {
}
UnitDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsModule, declarations: [UnitDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        KeyboardFocusModule,
        DisableInfoModule], exports: [UnitDetailsComponent] });
UnitDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        KeyboardFocusModule,
        DisableInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ToggleStatusModule,
                        ItemExistsModule,
                        KeyboardFocusModule,
                        DisableInfoModule,
                    ],
                    declarations: [UnitDetailsComponent],
                    exports: [UnitDetailsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitFormComponent {
    constructor(itemService, unitService) {
        this.itemService = itemService;
        this.unitService = unitService;
        this.i18nRoot = 'orgUnit';
        this.createChildUnit = false;
        this.form = this.itemService.getForm();
        this.units$ = this.itemService.unit$.pipe(tap((unit) => {
            var _a, _b, _c, _d;
            (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('parentOrgUnit.uid')) === null || _b === void 0 ? void 0 : _b.setValue(unit);
            if (this.createChildUnit) {
                (_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.get('parentOrgUnit')) === null || _d === void 0 ? void 0 : _d.disable();
            }
        }), switchMap(() => this.unitService.getActiveUnitList().pipe(map((units) => units === null || units === void 0 ? void 0 : units.filter((unit) => { var _a; return unit.id !== ((_a = this.form) === null || _a === void 0 ? void 0 : _a.value.uid); })), tap((units) => {
            var _a, _b, _c;
            if (units && units.length === 1) {
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('parentOrgUnit.uid')) === null || _b === void 0 ? void 0 : _b.setValue((_c = units[0]) === null || _c === void 0 ? void 0 : _c.id);
            }
        }))));
        this.approvalProcess$ = this.unitService
            .getApprovalProcesses()
            .pipe(filter(isNotUndefined), filter((items) => items.length > 0));
    }
    ngOnInit() {
        this.unitService.loadList();
    }
    createUidWithName(name, code) {
        createCodeForEntityName(name, code);
    }
}
UnitFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormComponent, deps: [{ token: ItemService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitFormComponent, selector: "cx-org-unit-form", inputs: { i18nRoot: "i18nRoot", createChildUnit: "createChildUnit" }, host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: UnitItemService,
        },
        {
            provide: CurrentItemService,
            useExisting: CurrentUnitService,
        },
    ], ngImport: i0, template: "<cx-org-form [i18nRoot]=\"i18nRoot\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnit.name' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgUnit.name' | cxTranslate }}\"\n        formControlName=\"name\"\n        (blur)=\"createUidWithName(form.get('name'), form.get('uid'))\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnit.uid' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgUnit.uid' | cxTranslate }}\"\n        formControlName=\"uid\"\n      />\n      <cx-form-errors [control]=\"form.get('uid')\"></cx-form-errors>\n    </label>\n\n    <label formGroupName=\"approvalProcess\" class=\"full-width\">\n      <span class=\"label-content required\">{{\n        'orgUnit.approvalProcess' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"code\"\n        [searchable]=\"false\"\n        [items]=\"approvalProcess$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgUnit.approvalProcess' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors\n        [control]=\"form.get('approvalProcess.code')\"\n      ></cx-form-errors>\n    </label>\n    <ng-container *ngIf=\"form.get('parentOrgUnit'); else parentOrgUnitNotes\">\n      <label formGroupName=\"parentOrgUnit\">\n        <span class=\"label-content required\">{{\n          'orgUnit.form.parentOrgUnit' | cxTranslate\n        }}</span>\n        <ng-select\n          [inputAttrs]=\"{ required: 'true' }\"\n          formControlName=\"uid\"\n          [searchable]=\"true\"\n          [clearable]=\"false\"\n          [items]=\"(units$ | async) ?? null\"\n          bindLabel=\"name\"\n          bindValue=\"id\"\n          appendTo=\"cx-org-list\"\n          [placeholder]=\"'orgUnit.form.parentOrgUnit' | cxTranslate\"\n        >\n        </ng-select>\n        <cx-form-errors\n          [control]=\"form.get('parentOrgUnit.uid')\"\n        ></cx-form-errors>\n      </label>\n    </ng-container>\n    <ng-template #parentOrgUnitNotes>\n      <span class=\"notes-content\">{{\n        'orgUnit.form.parentOrgUnitNotes' | cxTranslate\n      }}</span>\n    </ng-template>\n  </ng-container>\n</cx-org-form>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: FormComponent, selector: "cx-org-form", inputs: ["i18nRoot", "animateBack", "subtitle"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i7.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ItemService,
                            useExisting: UnitItemService,
                        },
                        {
                            provide: CurrentItemService,
                            useExisting: CurrentUnitService,
                        },
                    ], template: "<cx-org-form [i18nRoot]=\"i18nRoot\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnit.name' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgUnit.name' | cxTranslate }}\"\n        formControlName=\"name\"\n        (blur)=\"createUidWithName(form.get('name'), form.get('uid'))\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnit.uid' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgUnit.uid' | cxTranslate }}\"\n        formControlName=\"uid\"\n      />\n      <cx-form-errors [control]=\"form.get('uid')\"></cx-form-errors>\n    </label>\n\n    <label formGroupName=\"approvalProcess\" class=\"full-width\">\n      <span class=\"label-content required\">{{\n        'orgUnit.approvalProcess' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"code\"\n        [searchable]=\"false\"\n        [items]=\"approvalProcess$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgUnit.approvalProcess' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors\n        [control]=\"form.get('approvalProcess.code')\"\n      ></cx-form-errors>\n    </label>\n    <ng-container *ngIf=\"form.get('parentOrgUnit'); else parentOrgUnitNotes\">\n      <label formGroupName=\"parentOrgUnit\">\n        <span class=\"label-content required\">{{\n          'orgUnit.form.parentOrgUnit' | cxTranslate\n        }}</span>\n        <ng-select\n          [inputAttrs]=\"{ required: 'true' }\"\n          formControlName=\"uid\"\n          [searchable]=\"true\"\n          [clearable]=\"false\"\n          [items]=\"(units$ | async) ?? null\"\n          bindLabel=\"name\"\n          bindValue=\"id\"\n          appendTo=\"cx-org-list\"\n          [placeholder]=\"'orgUnit.form.parentOrgUnit' | cxTranslate\"\n        >\n        </ng-select>\n        <cx-form-errors\n          [control]=\"form.get('parentOrgUnit.uid')\"\n        ></cx-form-errors>\n      </label>\n    </ng-container>\n    <ng-template #parentOrgUnitNotes>\n      <span class=\"notes-content\">{{\n        'orgUnit.form.parentOrgUnitNotes' | cxTranslate\n      }}</span>\n    </ng-template>\n  </ng-container>\n</cx-org-form>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: i2.OrgUnitService }]; }, propDecorators: { i18nRoot: [{
                type: Input
            }], createChildUnit: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitFormModule {
}
UnitFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitFormModule, declarations: [UnitFormComponent], imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        ItemActiveModule], exports: [UnitFormComponent] });
UnitFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormModule, imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        ItemActiveModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        ItemActiveModule,
                    ],
                    declarations: [UnitFormComponent],
                    exports: [UnitFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CurrentUnitAddressService extends CurrentItemService {
    constructor(routingService, unitService) {
        super(routingService);
        this.routingService = routingService;
        this.unitService = unitService;
        // override item$ as we need to use the unit code as well
        this.item$ = this.b2bUnit$.pipe(filter((unitUid) => Boolean(unitUid)), switchMap((unitUid) => this.key$.pipe(switchMap((code) => this.getItem(unitUid, code)))));
    }
    getDetailsRoute() {
        return 'orgUnitAddressDetails';
    }
    getParamKey() {
        return ROUTE_PARAMS.addressCode;
    }
    getItem(unitUid, addressId) {
        return addressId
            ? this.unitService.getAddress(unitUid, addressId)
            : of(undefined);
    }
    getError(code) {
        return this.unitService.getErrorState(code);
    }
}
CurrentUnitAddressService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitAddressService, deps: [{ token: i3.RoutingService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUnitAddressService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitAddressService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitAddressService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.RoutingService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressFormService extends FormService {
    constructor(userAddressService, userProfileFacade) {
        super();
        this.userAddressService = userAddressService;
        this.userProfileFacade = userProfileFacade;
    }
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('id', new UntypedFormControl(''));
        form.setControl('titleCode', new UntypedFormControl(''));
        form.setControl('firstName', new UntypedFormControl('', Validators.required));
        form.setControl('lastName', new UntypedFormControl('', Validators.required));
        form.setControl('line1', new UntypedFormControl('', Validators.required));
        form.setControl('line2', new UntypedFormControl(''));
        form.setControl('town', new UntypedFormControl('', Validators.required));
        form.setControl('country', new UntypedFormGroup({
            isocode: new UntypedFormControl(null, Validators.required),
        }));
        form.setControl('region', new UntypedFormGroup({
            isocode: new UntypedFormControl(null, Validators.required),
        }));
        form.setControl('postalCode', new UntypedFormControl('', Validators.required));
        form.setControl('phone', new UntypedFormControl(''));
        form.setControl('cellphone', new UntypedFormControl(''));
        this.form = form;
    }
    getCountries() {
        return this.userAddressService.getDeliveryCountries().pipe(tap((countries) => {
            if (Object.keys(countries).length === 0) {
                this.userAddressService.loadDeliveryCountries();
            }
        }));
    }
    getTitles() {
        return this.userProfileFacade.getTitles();
    }
    getRegions() {
        var _a, _b, _c, _d, _e;
        let selectedCountryCode = (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('country.isocode')) === null || _b === void 0 ? void 0 : _b.value;
        let newCountryCode;
        return ((_e = (_d = (_c = this.getForm()) === null || _c === void 0 ? void 0 : _c.get('country.isocode')) === null || _d === void 0 ? void 0 : _d.valueChanges.pipe(filter((countryIsoCode) => Boolean(countryIsoCode)), switchMap((countryIsoCode) => {
            newCountryCode = countryIsoCode;
            return this.userAddressService.getRegions(countryIsoCode);
        }), tap((regions) => {
            var _a;
            const regionControl = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('region.isocode');
            if (!regions || regions.length === 0) {
                regionControl === null || regionControl === void 0 ? void 0 : regionControl.disable();
            }
            else {
                regionControl === null || regionControl === void 0 ? void 0 : regionControl.enable();
            }
            if (selectedCountryCode && newCountryCode !== selectedCountryCode) {
                regionControl === null || regionControl === void 0 ? void 0 : regionControl.reset();
            }
            selectedCountryCode = newCountryCode;
        }))) !== null && _e !== void 0 ? _e : of([]));
    }
}
UnitAddressFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormService, deps: [{ token: i3.UserAddressService }, { token: i2$1.UserProfileFacade }], target: i0.ɵɵFactoryTarget.Injectable });
UnitAddressFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.UserAddressService }, { type: i2$1.UserProfileFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressItemService extends ItemService {
    constructor(currentItemService, routingService, formService, unitService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.unitService = unitService;
        this.unitRouteParam$ = this.routingService.getParams().pipe(map((params) => params[ROUTE_PARAMS.unitCode]), distinctUntilChanged());
    }
    load(unitUid, addressId) {
        return this.unitService
            .getAddress(unitUid, addressId)
            .pipe(filter(isNotUndefined));
    }
    update(addressCode, address) {
        this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
            this.unitService.updateAddress(unitCode, addressCode, address);
        });
        return this.unitService.getAddressLoadingStatus(addressCode);
    }
    create(value) {
        var _a;
        this.unitRouteParam$
            .pipe(first())
            .subscribe((unitCode) => this.unitService.createAddress(unitCode, value));
        return this.unitService.getAddressLoadingStatus((_a = value.id) !== null && _a !== void 0 ? _a : '');
    }
    getDetailsRoute() {
        return this.currentItemService.getDetailsRoute();
    }
    delete(addressId, unitUid) {
        this.launchList();
        this.unitService.deleteAddress(unitUid, addressId);
        return this.unitService.getAddressLoadingStatus(addressId);
    }
    launchDetails(item) {
        if (!item.id) {
            // since the ID is generated in the backend
            // we redirect to the list instead.
            this.launchList();
        }
        else {
            this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
                this.routingService.go({
                    cxRoute: this.getDetailsRoute(),
                    params: Object.assign(Object.assign({}, item), { uid: unitCode }),
                });
            });
        }
    }
    launchList() {
        this.unitRouteParam$.pipe(first()).subscribe((unitCode) => {
            this.routingService.go({
                cxRoute: 'orgUnitAddressList',
                params: { uid: unitCode },
            });
        });
    }
}
UnitAddressItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressItemService, deps: [{ token: CurrentUnitAddressService }, { token: i3.RoutingService }, { token: UnitAddressFormService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitAddressItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CurrentUnitAddressService }, { type: i3.RoutingService }, { type: UnitAddressFormService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressDetailsComponent {
    getCountry(isoCode) {
        return this.userAddressService.getDeliveryCountries().pipe(tap((countries) => {
            if (Object.keys(countries).length === 0) {
                this.userAddressService.loadDeliveryCountries();
            }
        }), map((countries) => countries.find((country) => country.isocode === isoCode)));
    }
    constructor(itemService, currentUnitService, userAddressService) {
        this.itemService = itemService;
        this.currentUnitService = currentUnitService;
        this.userAddressService = userAddressService;
        this.unit$ = this.currentUnitService.item$;
        this.model$ = this.itemService.key$.pipe(withLatestFrom(this.unit$), switchMap(([code, unit]) => this.itemService.load(unit === null || unit === void 0 ? void 0 : unit.uid, code)), shareReplay({ bufferSize: 1, refCount: true }));
    }
}
UnitAddressDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressDetailsComponent, deps: [{ token: ItemService }, { token: CurrentUnitService }, { token: i3.UserAddressService }], target: i0.ɵɵFactoryTarget.Component });
UnitAddressDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitAddressDetailsComponent, selector: "cx-org-unit-address-details", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: UnitAddressItemService,
        },
    ], ngImport: i0, template: "<ng-container *ngIf=\"unit$ | async as unit\">\n  <cx-org-card\n    *ngIf=\"model$ | async as model\"\n    i18nRoot=\"orgUnitAddress.details\"\n    [subtitle]=\"'orgUnitAddress.details.subtitle' | cxTranslate: { item: unit }\"\n    [cxFocus]=\"{ refreshFocus: model }\"\n  >\n    <a class=\"link\" actions routerLink=\"edit\">\n      {{ 'organization.edit' | cxTranslate }}\n    </a>\n\n    <cx-org-delete-item\n      actions\n      key=\"id\"\n      [additionalParam]=\"unit.uid\"\n      i18nRoot=\"orgUnitAddress\"\n    ></cx-org-delete-item>\n\n    <section main class=\"details\">\n      <div class=\"property\">\n        <label>{{ 'orgUnit.name' | cxTranslate }}</label>\n        <span class=\"value\"> {{ model.firstName }} {{ model.lastName }} </span>\n      </div>\n\n      <div class=\"property\">\n        <label>{{ 'orgUnit.unit' | cxTranslate }}</label>\n        <span class=\"value\">\n          <a\n            [routerLink]=\"\n              {\n                cxRoute: 'orgUnitDetails',\n                params: unit\n              } | cxUrl\n            \"\n          >\n            {{ unit.name }}\n          </a>\n        </span>\n      </div>\n\n      <div class=\"property full-width\">\n        <label>{{ 'orgUnitAddress.formattedAddress' | cxTranslate }}</label>\n        <span class=\"value\">\n          {{ model.formattedAddress }}\n        </span>\n      </div>\n\n      <div class=\"property\">\n        <label>{{ 'orgUnitAddress.country' | cxTranslate }}</label>\n        <span class=\"value\">\n          {{ (getCountry(model.country?.isocode) | async)?.name }}\n        </span>\n      </div>\n    </section>\n  </cx-org-card>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: DeleteItemComponent, selector: "cx-org-delete-item", inputs: ["i18nRoot", "key", "additionalParam"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-address-details', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ItemService,
                            useExisting: UnitAddressItemService,
                        },
                    ], template: "<ng-container *ngIf=\"unit$ | async as unit\">\n  <cx-org-card\n    *ngIf=\"model$ | async as model\"\n    i18nRoot=\"orgUnitAddress.details\"\n    [subtitle]=\"'orgUnitAddress.details.subtitle' | cxTranslate: { item: unit }\"\n    [cxFocus]=\"{ refreshFocus: model }\"\n  >\n    <a class=\"link\" actions routerLink=\"edit\">\n      {{ 'organization.edit' | cxTranslate }}\n    </a>\n\n    <cx-org-delete-item\n      actions\n      key=\"id\"\n      [additionalParam]=\"unit.uid\"\n      i18nRoot=\"orgUnitAddress\"\n    ></cx-org-delete-item>\n\n    <section main class=\"details\">\n      <div class=\"property\">\n        <label>{{ 'orgUnit.name' | cxTranslate }}</label>\n        <span class=\"value\"> {{ model.firstName }} {{ model.lastName }} </span>\n      </div>\n\n      <div class=\"property\">\n        <label>{{ 'orgUnit.unit' | cxTranslate }}</label>\n        <span class=\"value\">\n          <a\n            [routerLink]=\"\n              {\n                cxRoute: 'orgUnitDetails',\n                params: unit\n              } | cxUrl\n            \"\n          >\n            {{ unit.name }}\n          </a>\n        </span>\n      </div>\n\n      <div class=\"property full-width\">\n        <label>{{ 'orgUnitAddress.formattedAddress' | cxTranslate }}</label>\n        <span class=\"value\">\n          {{ model.formattedAddress }}\n        </span>\n      </div>\n\n      <div class=\"property\">\n        <label>{{ 'orgUnitAddress.country' | cxTranslate }}</label>\n        <span class=\"value\">\n          {{ (getCountry(model.country?.isocode) | async)?.name }}\n        </span>\n      </div>\n    </section>\n  </cx-org-card>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: CurrentUnitService }, { type: i3.UserAddressService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressDetailsModule {
}
UnitAddressDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitAddressDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressDetailsModule, declarations: [UnitAddressDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        DeleteItemModule,
        KeyboardFocusModule] });
UnitAddressDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        DeleteItemModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        DeleteItemModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [UnitAddressDetailsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class LinkCellComponent extends CellComponent {
    constructor(outlet, itemService) {
        super(outlet);
        this.outlet = outlet;
        this.itemService = itemService;
        this.unitKey$ = this.itemService.key$;
    }
    get tabIndex() {
        return 0;
    }
    getRouterModel(uid) {
        return Object.assign(Object.assign({}, this.outlet.context), { uid });
    }
}
LinkCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LinkCellComponent, deps: [{ token: i1.OutletContextData }, { token: ItemService }], target: i0.ɵɵFactoryTarget.Component });
LinkCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LinkCellComponent, selector: "cx-org-link-cell", usesInheritance: true, ngImport: i0, template: `
    <ng-container *ngIf="unitKey$ | async as uid">
      <a
        *ngIf="linkable; else text"
        [routerLink]="{ cxRoute: route, params: getRouterModel(uid) } | cxUrl"
        [tabIndex]="tabIndex"
      >
        <ng-container *ngTemplateOutlet="text"></ng-container>
      </a>
    </ng-container>

    <ng-template #text>
      <span class="text" title="{{ property }}">{{ property }}</span>
    </ng-template>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LinkCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-org-link-cell',
                    template: `
    <ng-container *ngIf="unitKey$ | async as uid">
      <a
        *ngIf="linkable; else text"
        [routerLink]="{ cxRoute: route, params: getRouterModel(uid) } | cxUrl"
        [tabIndex]="tabIndex"
      >
        <ng-container *ngTemplateOutlet="text"></ng-container>
      </a>
    </ng-container>

    <ng-template #text>
      <span class="text" title="{{ property }}">{{ property }}</span>
    </ng-template>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: ItemService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressListService extends SubListService {
    constructor(tableService, orgUnitService) {
        super(tableService);
        this.tableService = tableService;
        this.orgUnitService = orgUnitService;
        this.tableType = OrganizationTableType.UNIT_ADDRESS;
        this._domainType = OrganizationTableType.UNIT_ADDRESS;
    }
    load(_pagination, code) {
        return this.orgUnitService.getAddresses(code);
    }
}
UnitAddressListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitAddressListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressListComponent {
    constructor() {
        this.routerKey = ROUTE_PARAMS.addressCode;
    }
}
UnitAddressListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UnitAddressListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitAddressListComponent, selector: "cx-org-unit-address-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitAddressListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list\n  key=\"id\"\n  [routerKey]=\"routerKey\"\n  class=\"has-nested-view\"\n  [showHint]=\"true\"\n>\n  <a actions class=\"link\" routerLink=\"create\">\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-address-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitAddressListService,
                        },
                    ], template: "<cx-org-sub-list\n  key=\"id\"\n  [routerKey]=\"routerKey\"\n  class=\"has-nested-view\"\n  [showHint]=\"true\"\n>\n  <a actions class=\"link\" routerLink=\"create\">\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressListModule {
}
UnitAddressListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitAddressListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListModule, declarations: [UnitAddressListComponent, LinkCellComponent], imports: [CommonModule, I18nModule, RouterModule, UrlModule, SubListModule] });
UnitAddressListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListModule, imports: [CommonModule, I18nModule, RouterModule, UrlModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, RouterModule, UrlModule, SubListModule],
                    declarations: [UnitAddressListComponent, LinkCellComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressFormComponent {
    constructor(itemService, formService, currentUnitService) {
        this.itemService = itemService;
        this.formService = formService;
        this.currentUnitService = currentUnitService;
        this.form = this.itemService.getForm();
        this.key$ = this.itemService.key$;
        this.countries$ = this.formService.getCountries();
        this.titles$ = this.formService.getTitles();
        this.regions$ = this.formService.getRegions();
        this.unit$ = this.currentUnitService.item$;
    }
    ngOnInit() {
        // Intentional empty method
    }
}
UnitAddressFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormComponent, deps: [{ token: ItemService }, { token: UnitAddressFormService }, { token: CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitAddressFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitAddressFormComponent, selector: "cx-org-unit-address-form", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: UnitAddressItemService,
        },
    ], ngImport: i0, template: "<cx-org-form\n  i18nRoot=\"orgUnitAddress\"\n  [animateBack]=\"!(key$ | async)\"\n  [subtitle]=\"\n    'orgUnitAddress.details.subtitle' | cxTranslate: { item: (unit$ | async) }\n  \"\n>\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label formGroupName=\"country\">\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.country' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        class=\"country-select\"\n        formControlName=\"isocode\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"countries$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"isocode\"\n        placeholder=\"{{ 'orgUnitAddress.selectOne' | cxTranslate }}\"\n        appendTo=\"cx-org-list\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('country.isocode')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.titles' | cxTranslate\n      }}</span>\n      <ng-select\n        formControlName=\"titleCode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"titles$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        placeholder=\"{{ 'orgUnitAddress.selectOne' | cxTranslate }}\"\n        appendTo=\"cx-org-list\"\n      >\n      </ng-select>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.firstName' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"text\"\n        placeholder=\"{{ 'orgUnitAddress.firstName' | cxTranslate }}\"\n        formControlName=\"firstName\"\n      />\n      <cx-form-errors [control]=\"form.get('firstName')\"></cx-form-errors>\n    </label>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.lastName' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.lastName' | cxTranslate }}\"\n        formControlName=\"lastName\"\n      />\n      <cx-form-errors [control]=\"form.get('lastName')\"></cx-form-errors>\n    </label>\n\n    <label class=\"full-width\">\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.address1' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.streetAddress' | cxTranslate }}\"\n        formControlName=\"line1\"\n      />\n      <cx-form-errors [control]=\"form.get('line1')\"></cx-form-errors>\n    </label>\n\n    <label class=\"full-width\">\n      <span class=\"label-content\">{{\n        'orgUnitAddress.address2' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.aptSuite' | cxTranslate }}\"\n        formControlName=\"line2\"\n      />\n    </label>\n\n    <label class=\"full-width\">\n      <span class=\"label-content\">{{\n        'orgUnitAddress.phoneNumber' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.phoneNumber' | cxTranslate }}\"\n        formControlName=\"phone\"\n      />\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.city' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.city' | cxTranslate }}\"\n        formControlName=\"town\"\n      />\n      <cx-form-errors [control]=\"form.get('town')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.zipCode' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.zipCode' | cxTranslate }}\"\n        formControlName=\"postalCode\"\n      />\n      <cx-form-errors [control]=\"form.get('postalCode')\"></cx-form-errors>\n    </label>\n\n    <label></label>\n\n    <ng-container *ngIf=\"regions$ | async as regions\">\n      <label\n        class=\"full-width\"\n        formGroupName=\"region\"\n        *ngIf=\"regions.length > 0\"\n      >\n        <span class=\"label-content required\">{{\n          'orgUnitAddress.state' | cxTranslate\n        }}</span>\n        <ng-select\n          [inputAttrs]=\"{ required: 'true' }\"\n          class=\"region-select\"\n          formControlName=\"isocode\"\n          [searchable]=\"true\"\n          [clearable]=\"false\"\n          [items]=\"regions\"\n          bindLabel=\"name\"\n          bindValue=\"isocode\"\n          placeholder=\"{{ 'orgUnitAddress.selectOne' | cxTranslate }}\"\n          appendTo=\"cx-org-list\"\n        >\n        </ng-select>\n        <cx-form-errors [control]=\"form.get('region.isocode')\"></cx-form-errors>\n      </label>\n    </ng-container>\n  </ng-container>\n</cx-org-form>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: FormComponent, selector: "cx-org-form", inputs: ["i18nRoot", "animateBack", "subtitle"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i7.FormGroupName, selector: "[formGroupName]", inputs: ["formGroupName"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-address-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ItemService,
                            useExisting: UnitAddressItemService,
                        },
                    ], template: "<cx-org-form\n  i18nRoot=\"orgUnitAddress\"\n  [animateBack]=\"!(key$ | async)\"\n  [subtitle]=\"\n    'orgUnitAddress.details.subtitle' | cxTranslate: { item: (unit$ | async) }\n  \"\n>\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label formGroupName=\"country\">\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.country' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        class=\"country-select\"\n        formControlName=\"isocode\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"countries$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"isocode\"\n        placeholder=\"{{ 'orgUnitAddress.selectOne' | cxTranslate }}\"\n        appendTo=\"cx-org-list\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('country.isocode')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.titles' | cxTranslate\n      }}</span>\n      <ng-select\n        formControlName=\"titleCode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"titles$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        placeholder=\"{{ 'orgUnitAddress.selectOne' | cxTranslate }}\"\n        appendTo=\"cx-org-list\"\n      >\n      </ng-select>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.firstName' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        class=\"form-control\"\n        type=\"text\"\n        placeholder=\"{{ 'orgUnitAddress.firstName' | cxTranslate }}\"\n        formControlName=\"firstName\"\n      />\n      <cx-form-errors [control]=\"form.get('firstName')\"></cx-form-errors>\n    </label>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.lastName' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.lastName' | cxTranslate }}\"\n        formControlName=\"lastName\"\n      />\n      <cx-form-errors [control]=\"form.get('lastName')\"></cx-form-errors>\n    </label>\n\n    <label class=\"full-width\">\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.address1' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.streetAddress' | cxTranslate }}\"\n        formControlName=\"line1\"\n      />\n      <cx-form-errors [control]=\"form.get('line1')\"></cx-form-errors>\n    </label>\n\n    <label class=\"full-width\">\n      <span class=\"label-content\">{{\n        'orgUnitAddress.address2' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.aptSuite' | cxTranslate }}\"\n        formControlName=\"line2\"\n      />\n    </label>\n\n    <label class=\"full-width\">\n      <span class=\"label-content\">{{\n        'orgUnitAddress.phoneNumber' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.phoneNumber' | cxTranslate }}\"\n        formControlName=\"phone\"\n      />\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.city' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.city' | cxTranslate }}\"\n        formControlName=\"town\"\n      />\n      <cx-form-errors [control]=\"form.get('town')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUnitAddress.zipCode' | cxTranslate\n      }}</span>\n      <input\n        required=\"true\"\n        type=\"text\"\n        class=\"form-control\"\n        placeholder=\"{{ 'orgUnitAddress.zipCode' | cxTranslate }}\"\n        formControlName=\"postalCode\"\n      />\n      <cx-form-errors [control]=\"form.get('postalCode')\"></cx-form-errors>\n    </label>\n\n    <label></label>\n\n    <ng-container *ngIf=\"regions$ | async as regions\">\n      <label\n        class=\"full-width\"\n        formGroupName=\"region\"\n        *ngIf=\"regions.length > 0\"\n      >\n        <span class=\"label-content required\">{{\n          'orgUnitAddress.state' | cxTranslate\n        }}</span>\n        <ng-select\n          [inputAttrs]=\"{ required: 'true' }\"\n          class=\"region-select\"\n          formControlName=\"isocode\"\n          [searchable]=\"true\"\n          [clearable]=\"false\"\n          [items]=\"regions\"\n          bindLabel=\"name\"\n          bindValue=\"isocode\"\n          placeholder=\"{{ 'orgUnitAddress.selectOne' | cxTranslate }}\"\n          appendTo=\"cx-org-list\"\n        >\n        </ng-select>\n        <cx-form-errors [control]=\"form.get('region.isocode')\"></cx-form-errors>\n      </label>\n    </ng-container>\n  </ng-container>\n</cx-org-form>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: UnitAddressFormService }, { type: CurrentUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressFormModule {
}
UnitAddressFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitAddressFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormModule, declarations: [UnitAddressFormComponent], imports: [CommonModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule] });
UnitAddressFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormModule, imports: [CommonModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                    ],
                    declarations: [UnitAddressFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAddressModule {
}
UnitAddressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitAddressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressModule, imports: [UnitAddressListModule,
        UnitAddressDetailsModule,
        UnitAddressFormModule] });
UnitAddressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressModule, imports: [UnitAddressListModule,
        UnitAddressDetailsModule,
        UnitAddressFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        UnitAddressListModule,
                        UnitAddressDetailsModule,
                        UnitAddressFormModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitApproverListService extends SubListService {
    constructor(tableService, unitService, userService) {
        super(tableService);
        this.tableService = tableService;
        this.unitService = unitService;
        this.userService = userService;
        this.tableType = OrganizationTableType.UNIT_APPROVERS;
        this._domainType = OrganizationTableType.USER;
    }
    load(pagination, code) {
        return this.unitService.getUsers(code, B2BUserRole.APPROVER, pagination);
    }
    /**
     * @override
     * Assign budget to the cost center.
     */
    assign(unitId, customerId) {
        this.unitService.assignApprover(unitId, customerId, B2BUserRole.APPROVER);
        return this.userService.getLoadingStatus(customerId);
    }
    /**
     * @override
     * Unassign the budget from the cost center.
     */
    unassign(unitId, customerId) {
        this.unitService.unassignApprover(unitId, customerId, B2BUserRole.APPROVER);
        return this.userService.getLoadingStatus(customerId);
    }
}
UnitApproverListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitApproverListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitAssignedApproverListService extends UnitApproverListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.UNIT_ASSIGNED_APPROVERS;
    }
    load(pagination, code) {
        this.unitService.clearAssignedUsersList(code, B2BUserRole.APPROVER, pagination);
        return super
            .load(pagination, code)
            .pipe(map((users) => this.filterSelected(users)));
    }
}
UnitAssignedApproverListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnitAssignedApproverListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListService, decorators: [{
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
class UnitAssignedApproverListComponent {
}
UnitAssignedApproverListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UnitAssignedApproverListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitAssignedApproverListComponent, selector: "cx-org-unit-assigned-approver-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitAssignedApproverListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [showHint]=\"true\">\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAssignedApproverListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-assigned-approver-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitAssignedApproverListService,
                        },
                    ], template: "<cx-org-sub-list [showHint]=\"true\">\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitApproverListComponent {
}
UnitApproverListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UnitApproverListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitApproverListComponent, selector: "cx-org-unit-approver-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitApproverListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-approver-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitApproverListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitApproverListModule {
}
UnitApproverListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitApproverListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListModule, declarations: [UnitApproverListComponent, UnitAssignedApproverListComponent], imports: [I18nModule, RouterModule, SubListModule] });
UnitApproverListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListModule, imports: [I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitApproverListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [I18nModule, RouterModule, SubListModule],
                    declarations: [UnitApproverListComponent, UnitAssignedApproverListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitChildrenService extends SubListService {
    constructor(tableService, orgUnitService) {
        super(tableService);
        this.tableService = tableService;
        this.orgUnitService = orgUnitService;
        this.tableType = OrganizationTableType.UNIT_CHILDREN;
        this._domainType = OrganizationTableType.UNIT;
    }
    // method to be adjusted for proper children list when ready
    load(_pagination, code) {
        return this.orgUnitService.getChildUnits(code);
    }
}
UnitChildrenService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitChildrenService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitChildrenComponent {
    constructor(currentUnitService) {
        this.currentUnitService = currentUnitService;
        this.unit$ = this.currentUnitService
            ? this.currentUnitService.item$
            : of({ active: true });
    }
}
UnitChildrenComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenComponent, deps: [{ token: CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitChildrenComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitChildrenComponent, selector: "cx-org-unit-children", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitChildrenService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [showHint]=\"true\">\n  <a\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitChildren\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "component", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-children', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitChildrenService,
                        },
                    ], template: "<cx-org-sub-list [showHint]=\"true\">\n  <a\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitChildren\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n" }]
        }], ctorParameters: function () { return [{ type: CurrentUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitChildrenModule {
}
UnitChildrenModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitChildrenModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenModule, declarations: [UnitChildrenComponent], imports: [ListModule,
        I18nModule,
        RouterModule,
        SubListModule,
        CommonModule,
        DisableInfoModule] });
UnitChildrenModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenModule, imports: [ListModule,
        I18nModule,
        RouterModule,
        SubListModule,
        CommonModule,
        DisableInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildrenModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ListModule,
                        I18nModule,
                        RouterModule,
                        SubListModule,
                        CommonModule,
                        DisableInfoModule,
                    ],
                    declarations: [UnitChildrenComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitCostCenterListService extends SubListService {
    constructor(tableService, unitService) {
        super(tableService);
        this.tableService = tableService;
        this.unitService = unitService;
        this.tableType = OrganizationTableType.UNIT_COST_CENTERS;
        this._domainType = OrganizationTableType.COST_CENTER;
    }
    load(_pagination, code) {
        return this.unitService.getCostCenters(code);
    }
}
UnitCostCenterListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitCostCenterListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitCostCenterListComponent {
    constructor(currentUnitService) {
        this.currentUnitService = currentUnitService;
        this.unit$ = this.currentUnitService
            ? this.currentUnitService.item$
            : of({ active: true });
    }
}
UnitCostCenterListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListComponent, deps: [{ token: CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitCostCenterListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitCostCenterListComponent, selector: "cx-org-unit-cost-centers", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitCostCenterListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [showHint]=\"true\">\n  <a\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitCostCenters\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "component", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-cost-centers', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitCostCenterListService,
                        },
                    ], template: "<cx-org-sub-list [showHint]=\"true\">\n  <a\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitCostCenters\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n" }]
        }], ctorParameters: function () { return [{ type: CurrentUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitCostCenterListModule {
}
UnitCostCenterListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitCostCenterListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListModule, declarations: [UnitCostCenterListComponent], imports: [I18nModule,
        RouterModule,
        SubListModule,
        CommonModule,
        DisableInfoModule] });
UnitCostCenterListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListModule, imports: [I18nModule,
        RouterModule,
        SubListModule,
        CommonModule,
        DisableInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        I18nModule,
                        RouterModule,
                        SubListModule,
                        CommonModule,
                        DisableInfoModule,
                    ],
                    declarations: [UnitCostCenterListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserRolesCellComponent extends CellComponent {
    constructor(outlet, itemService, b2bUserService) {
        super(outlet);
        this.outlet = outlet;
        this.itemService = itemService;
        this.b2bUserService = b2bUserService;
        this.unitKey$ = this.itemService.key$;
        this.isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
    }
    getRouterModel(uid) {
        return Object.assign(Object.assign({}, this.outlet.context), { uid });
    }
}
UnitUserRolesCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesCellComponent, deps: [{ token: i1.OutletContextData }, { token: ItemService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Component });
UnitUserRolesCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitUserRolesCellComponent, selector: "cx-org-unit-user-link-cell", usesInheritance: true, ngImport: i0, template: `
    <a
      *ngIf="isUpdatingUserAllowed && hasItem && (unitKey$ | async) as uid"
      [routerLink]="
        { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
      "
    >
      {{ 'orgUser.links.rolesAndRights' | cxTranslate }}
    </a>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'cx-org-unit-user-link-cell',
                    template: `
    <a
      *ngIf="isUpdatingUserAllowed && hasItem && (unitKey$ | async) as uid"
      [routerLink]="
        { cxRoute: 'orgUnitUserRoles', params: getRouterModel(uid) } | cxUrl
      "
    >
      {{ 'orgUser.links.rolesAndRights' | cxTranslate }}
    </a>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: ItemService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserListService extends SubListService {
    constructor(tableService, unitService) {
        super(tableService);
        this.tableService = tableService;
        this.unitService = unitService;
        this.tableType = OrganizationTableType.UNIT_USERS;
        this._domainType = OrganizationTableType.USER;
    }
    load(pagination, code) {
        return this.unitService.getUsers(code, B2BUserRole.CUSTOMER, pagination);
    }
}
UnitUserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitUserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserListComponent {
    constructor(currentUnitService, b2bUserService) {
        this.currentUnitService = currentUnitService;
        this.b2bUserService = b2bUserService;
        this.routerKey = ROUTE_PARAMS.userCode;
        this.unit$ = this.currentUnitService
            ? this.currentUnitService.item$
            : of({ active: true });
        this.isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
    }
}
UnitUserListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListComponent, deps: [{ token: CurrentUnitService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Component });
UnitUserListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitUserListComponent, selector: "cx-org-unit-user-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UnitUserListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list key=\"customerId\" [routerKey]=\"routerKey\" [showHint]=\"true\">\n  <a\n    *ngIf=\"isUpdatingUserAllowed\"\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitUsers\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "component", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-user-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UnitUserListService,
                        },
                    ], template: "<cx-org-sub-list key=\"customerId\" [routerKey]=\"routerKey\" [showHint]=\"true\">\n  <a\n    *ngIf=\"isUpdatingUserAllowed\"\n    actions\n    class=\"link\"\n    routerLink=\"create\"\n    [class.disabled]=\"!(unit$ | async)?.active\"\n  >\n    {{ 'organization.create' | cxTranslate }}\n  </a>\n  <cx-org-disable-info\n    info\n    i18nRoot=\"orgUnitUsers\"\n    [displayInfoConfig]=\"{\n      disabledCreate: true,\n      disabledEnable: false,\n      disabledEdit: false\n    }\"\n  >\n  </cx-org-disable-info>\n</cx-org-sub-list>\n" }]
        }], ctorParameters: function () { return [{ type: CurrentUnitService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserListModule {
}
UnitUserListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitUserListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListModule, declarations: [UnitUserListComponent, UnitUserRolesCellComponent], imports: [CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        SubListModule,
        DisableInfoModule] });
UnitUserListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListModule, imports: [CommonModule,
        I18nModule,
        RouterModule,
        UrlModule,
        SubListModule,
        DisableInfoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        RouterModule,
                        UrlModule,
                        SubListModule,
                        DisableInfoModule,
                    ],
                    declarations: [UnitUserListComponent, UnitUserRolesCellComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CurrentUnitUserService extends CurrentItemService {
    constructor(routingService, b2bUserService) {
        super(routingService);
        this.routingService = routingService;
        this.b2bUserService = b2bUserService;
    }
    getDetailsRoute() {
        return 'orgUnitUserList';
    }
    getParamKey() {
        return ROUTE_PARAMS.userCode;
    }
    getItem(customerId) {
        return this.b2bUserService.get(customerId);
    }
    getError(code) {
        return this.b2bUserService.getErrorState(code);
    }
}
CurrentUnitUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitUserService, deps: [{ token: i3.RoutingService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUnitUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitUserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.RoutingService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserRolesFormService extends FormService {
    constructor(userService) {
        super();
        this.userService = userService;
        this.availableRoles = this.userService.getAllRoles();
        this.availableRights = this.userService.getAllRights();
    }
    getForm(item) {
        // if form already exist, while switching between users
        // it didn't patchData again, so used force rebuild
        this.form = null;
        return super.getForm(item);
    }
    build() {
        const form = new UntypedFormGroup({});
        this.availableRoles.forEach((role) => form.addControl(role, new UntypedFormControl()));
        this.availableRights.forEach((right) => form.addControl(right, new UntypedFormControl()));
        this.form = form;
    }
    patchData(item) {
        var _a;
        super.patchData(item);
        if (item) {
            (_a = item.roles) === null || _a === void 0 ? void 0 : _a.forEach((role) => {
                var _a, _b;
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get(role)) === null || _b === void 0 ? void 0 : _b.setValue(true);
            });
        }
    }
}
UnitUserRolesFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesFormService, deps: [{ token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitUserRolesFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesFormService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserRolesItemService extends ItemService {
    constructor(currentItemService, routingService, formService, unitService, b2bUserService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.unitService = unitService;
        this.b2bUserService = b2bUserService;
    }
    save(form, key) {
        var _a;
        // we enable the unit so that the underlying
        // save method can read the complete form.value.
        (_a = form.get('orgUnit')) === null || _a === void 0 ? void 0 : _a.enable();
        return super.save(form, key);
    }
    load(unitUid) {
        return this.b2bUserService.get(unitUid);
    }
    update(customerId, _user) {
        return this.b2bUserService.getLoadingStatus(customerId);
    }
    create(_customer) {
        return this.b2bUserService.getLoadingStatus('');
    }
    getDetailsRoute() {
        return this.currentItemService.getDetailsRoute();
    }
}
UnitUserRolesItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesItemService, deps: [{ token: CurrentUnitUserService }, { token: i3.RoutingService }, { token: UnitUserRolesFormService }, { token: i2.OrgUnitService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitUserRolesItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CurrentUnitUserService }, { type: i3.RoutingService }, { type: UnitUserRolesFormService }, { type: i2.OrgUnitService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CurrentUserService extends CurrentItemService {
    constructor(routingService, b2bUserService) {
        super(routingService);
        this.routingService = routingService;
        this.b2bUserService = b2bUserService;
        this.name$ = this.item$.pipe(map((user) => user === null || user === void 0 ? void 0 : user.name));
    }
    getParamKey() {
        return ROUTE_PARAMS.userCode;
    }
    getItem(code) {
        return this.b2bUserService.get(code);
    }
    getError(code) {
        return this.b2bUserService.getErrorState(code);
    }
}
CurrentUserService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserService, deps: [{ token: i3.RoutingService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUserService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.RoutingService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserFormService extends FormService {
    constructor() {
        super(...arguments);
        this.featureConfigService = inject(FeatureConfigService, {
            optional: true,
        });
    }
    build() {
        var _a;
        const form = new UntypedFormGroup({});
        form.setControl('customerId', new UntypedFormControl(''));
        form.setControl('titleCode', new UntypedFormControl(''));
        form.setControl('firstName', new UntypedFormControl('', Validators.required));
        form.setControl('lastName', new UntypedFormControl('', Validators.required));
        form.setControl('email', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.emailValidator,
        ]));
        form.setControl('orgUnit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        form.setControl('roles', new UntypedFormArray([]));
        form.setControl('isAssignedToApprovers', new UntypedFormControl(false));
        (_a = form.get('roles')) === null || _a === void 0 ? void 0 : _a.valueChanges.subscribe((roles) => {
            var _a, _b, _c;
            if (roles.includes(B2BUserRole.APPROVER)) {
                (_a = form.get('isAssignedToApprovers')) === null || _a === void 0 ? void 0 : _a.enable();
            }
            else {
                (_b = form.get('isAssignedToApprovers')) === null || _b === void 0 ? void 0 : _b.disable();
                (_c = form.get('isAssignedToApprovers')) === null || _c === void 0 ? void 0 : _c.reset();
            }
        });
        this.form = form;
    }
    patchData(item) {
        var _a, _b, _c, _d, _e;
        super.patchData(item);
        if (item) {
            const roles = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('roles');
            (_b = item.roles) === null || _b === void 0 ? void 0 : _b.forEach((role) => {
                if (!roles.value.includes(role)) {
                    roles.push(new UntypedFormControl(role));
                }
            });
            if ((_c = this.featureConfigService) === null || _c === void 0 ? void 0 : _c.isLevel('6.7')) {
                (_e = (_d = this.form) === null || _d === void 0 ? void 0 : _d.get('email')) === null || _e === void 0 ? void 0 : _e.setValue(item === null || item === void 0 ? void 0 : item.displayUid);
            }
        }
    }
}
UserFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormService, decorators: [{
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
class UserItemService extends ItemService {
    constructor(currentItemService, routingService, formService, userService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.userService = userService;
    }
    load(code) {
        this.userService.load(code);
        return this.userService.get(code);
    }
    update(code, value) {
        delete value.approvers;
        this.userService.update(code, value);
        return this.userService.getLoadingStatus(code);
    }
    create(value) {
        var _a;
        this.userService.create(value);
        return this.userService.getLoadingStatus((_a = value.uid) !== null && _a !== void 0 ? _a : '');
    }
    getDetailsRoute() {
        return 'orgUserDetails';
    }
    // @override to avoid errors while creation
    launchDetails(item) {
        if (item.customerId !== null) {
            super.launchDetails(item);
        }
    }
}
UserItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserItemService, deps: [{ token: CurrentUserService }, { token: i3.RoutingService }, { token: UserFormService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CurrentUserService }, { type: i3.RoutingService }, { type: UserFormService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserRolesFormComponent {
    constructor(itemService, formService, userService, userItemService) {
        this.itemService = itemService;
        this.formService = formService;
        this.userService = userService;
        this.userItemService = userItemService;
        this.form$ = this.itemService.current$.pipe(tap((item) => {
            var _a, _b, _c;
            if (!this.item) {
                this.item = item;
            }
            if (((_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.roles) === null || _b === void 0 ? void 0 : _b.join()) !== ((_c = item === null || item === void 0 ? void 0 : item.roles) === null || _c === void 0 ? void 0 : _c.join())) {
                this.item = Object.assign(Object.assign({}, this.item), item);
            }
        }), map((item) => this.formService.getForm(item)));
        this.availableRoles = this.userService.getAllRoles();
        this.availableRights = this.userService.getAllRights();
    }
    save(form) {
        var _a, _b;
        form.disable();
        const rolesAndRights = [
            ...this.availableRoles,
            ...this.availableRights,
        ].filter((role) => { var _a; return !!((_a = form.get(role)) === null || _a === void 0 ? void 0 : _a.value); });
        this.userItemService
            .update((_b = (_a = this.item) === null || _a === void 0 ? void 0 : _a.customerId) !== null && _b !== void 0 ? _b : '', { roles: rolesAndRights })
            .pipe(take(1), filter((data) => data.status === LoadStatus.SUCCESS))
            .subscribe((data) => {
            this.notify(Object.assign(Object.assign({}, this.item), data.item));
            form.enable();
        });
    }
    notify(item) {
        this.messageService.add({
            message: {
                key: 'orgUnitUserRoles.messages.rolesUpdated',
                params: { item },
            },
        });
    }
}
UnitUserRolesFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesFormComponent, deps: [{ token: ItemService }, { token: UnitUserRolesFormService }, { token: i2.B2BUserService }, { token: UserItemService }], target: i0.ɵɵFactoryTarget.Component });
UnitUserRolesFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitUserRolesFormComponent, selector: "cx-org-unit-user-roles", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: UnitUserRolesItemService,
        },
    ], viewQueries: [{ propertyName: "messageService", first: true, predicate: MessageService, descendants: true, read: MessageService }], ngImport: i0, template: "<form *ngIf=\"form$ | async as form\" (submit)=\"save(form)\">\n  <cx-org-card\n    #card\n    [previous]=\"false\"\n    i18nRoot=\"orgUnitUserRoles\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <a actions routerLink=\"../../\">\n      <span (click)=\"card.closeView($event)\">\n        {{ 'organization.done' | cxTranslate }}\n      </span>\n    </a>\n\n    <section main class=\"details\" [formGroup]=\"form\">\n      <fieldset class=\"full-width\">\n        <legend class=\"label-content required\">\n          {{ 'orgUser.roles' | cxTranslate }}\n        </legend>\n        <label class=\"form-check\" *ngFor=\"let role of availableRoles\">\n          <input\n            type=\"checkbox\"\n            [formControlName]=\"role\"\n            (change)=\"save(form)\"\n          />\n          <span class=\"form-check-label\">\n            {{ 'organization.userRoles.' + role | cxTranslate }}\n          </span>\n        </label>\n      </fieldset>\n      <fieldset class=\"full-width\">\n        <legend class=\"label-content required\">\n          {{ 'orgUser.rights' | cxTranslate }}\n        </legend>\n        <label class=\"form-check\" *ngFor=\"let right of availableRights\">\n          <input\n            type=\"checkbox\"\n            [formControlName]=\"right\"\n            (change)=\"save(form)\"\n          />\n          <span class=\"form-check-label\">\n            {{ 'organization.userRights.' + right | cxTranslate }}\n          </span>\n        </label>\n      </fieldset>\n    </section>\n  </cx-org-card>\n</form>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i7.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.NgForm, selector: "form:not([ngNoForm]):not([formGroup]),ng-form,[ngForm]", inputs: ["ngFormOptions"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-user-roles', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ItemService,
                            useExisting: UnitUserRolesItemService,
                        },
                    ], template: "<form *ngIf=\"form$ | async as form\" (submit)=\"save(form)\">\n  <cx-org-card\n    #card\n    [previous]=\"false\"\n    i18nRoot=\"orgUnitUserRoles\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <a actions routerLink=\"../../\">\n      <span (click)=\"card.closeView($event)\">\n        {{ 'organization.done' | cxTranslate }}\n      </span>\n    </a>\n\n    <section main class=\"details\" [formGroup]=\"form\">\n      <fieldset class=\"full-width\">\n        <legend class=\"label-content required\">\n          {{ 'orgUser.roles' | cxTranslate }}\n        </legend>\n        <label class=\"form-check\" *ngFor=\"let role of availableRoles\">\n          <input\n            type=\"checkbox\"\n            [formControlName]=\"role\"\n            (change)=\"save(form)\"\n          />\n          <span class=\"form-check-label\">\n            {{ 'organization.userRoles.' + role | cxTranslate }}\n          </span>\n        </label>\n      </fieldset>\n      <fieldset class=\"full-width\">\n        <legend class=\"label-content required\">\n          {{ 'orgUser.rights' | cxTranslate }}\n        </legend>\n        <label class=\"form-check\" *ngFor=\"let right of availableRights\">\n          <input\n            type=\"checkbox\"\n            [formControlName]=\"right\"\n            (change)=\"save(form)\"\n          />\n          <span class=\"form-check-label\">\n            {{ 'organization.userRights.' + right | cxTranslate }}\n          </span>\n        </label>\n      </fieldset>\n    </section>\n  </cx-org-card>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: UnitUserRolesFormService }, { type: i2.B2BUserService }, { type: UserItemService }]; }, propDecorators: { messageService: [{
                type: ViewChild,
                args: [MessageService, { read: MessageService }]
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserRolesModule {
}
UnitUserRolesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitUserRolesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesModule, declarations: [UnitUserRolesFormComponent], imports: [CommonModule,
        CardModule,
        FormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        KeyboardFocusModule] });
UnitUserRolesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesModule, imports: [CommonModule,
        CardModule,
        FormsModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserRolesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        FormsModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [UnitUserRolesFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUsersModule {
}
UnitUsersModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUsersModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitUsersModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitUsersModule, imports: [UnitUserListModule, UnitUserRolesModule] });
UnitUsersModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUsersModule, imports: [UnitUserListModule, UnitUserRolesModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUsersModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [UnitUserListModule, UnitUserRolesModule],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var TREE_TOGGLE;
(function (TREE_TOGGLE) {
    TREE_TOGGLE[TREE_TOGGLE["EXPANDED"] = 0] = "EXPANDED";
    TREE_TOGGLE[TREE_TOGGLE["COLLAPSED"] = 1] = "COLLAPSED";
})(TREE_TOGGLE || (TREE_TOGGLE = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
class UnitTreeService {
    constructor() {
        /**
         * Indicates the minimum number of (initial) expanded units.
         */
        this.minimalExpanded = 1;
        this.globalToggle$ = new BehaviorSubject(undefined);
        this.treeToggle$ = new BehaviorSubject(new Map());
    }
    /**
     * Initializes the unit tree with an active unit.
     *
     * The active unit will be collapsed.
     */
    initialize(root, activeUnitId) {
        if (activeUnitId) {
            this.expandUntilActiveNode(root, activeUnitId);
        }
    }
    /**
     * Sets the global toggle state to _collapsed_ and clears the toggle state
     * for individual units.
     */
    collapseAll() {
        this.globalToggle$.next(TREE_TOGGLE.COLLAPSED);
        this.treeToggle$.next(new Map());
    }
    /**
     * Sets the global toggle state to _expanded_ and clears the toggle state
     * for individual units.
     */
    expandAll() {
        this.globalToggle$.next(TREE_TOGGLE.EXPANDED);
        this.treeToggle$.next(new Map());
    }
    /**
     * Indicates whether the give unit is expanded.
     *
     * The returned (boolean) expand state is driven by the global toggle
     * state (expand / collapse all) and the toggle state for individual units.
     * There's also the `minimalExpanded` taken into consideration.
     */
    isExpanded(unitId, level) {
        var _a;
        const toggleState = (_a = this.treeToggle$.value) === null || _a === void 0 ? void 0 : _a.get(unitId);
        if (this.globalToggle$.value === TREE_TOGGLE.COLLAPSED &&
            toggleState !== TREE_TOGGLE.EXPANDED) {
            return false;
        }
        return (
        // the current node is expanded
        toggleState === TREE_TOGGLE.EXPANDED ||
            // the node is not collapsed, but globally expanded ("expand all") or above
            // the minimum visible nodes
            ((this.globalToggle$.value === TREE_TOGGLE.EXPANDED ||
                level < this.minimalExpanded) &&
                toggleState !== TREE_TOGGLE.COLLAPSED));
    }
    toggle(unit) {
        var _a, _b;
        const currentState = this.treeToggle$.value;
        currentState.set((_a = unit.id) !== null && _a !== void 0 ? _a : '', this.isExpanded((_b = unit.id) !== null && _b !== void 0 ? _b : '', unit.depthLevel)
            ? TREE_TOGGLE.COLLAPSED
            : TREE_TOGGLE.EXPANDED);
        this.treeToggle$.next(currentState);
    }
    /**
     * Expands all tree nodes till the active unit, to ensure that the
     * full tree is collapsed till the active item.
     *
     * This is useful while navigating the tree by the router.
     */
    expandUntilActiveNode(node, activeUnitId) {
        const hasActiveChild = (n, id) => { var _a; return !!((_a = n.children) === null || _a === void 0 ? void 0 : _a.find((child) => child.id === id || hasActiveChild(child, id))); };
        const findInvolvedTreeNodes = (n, activeItems = []) => {
            var _a, _b;
            if (hasActiveChild(n, activeUnitId)) {
                activeItems.push((_a = n.id) !== null && _a !== void 0 ? _a : '');
            }
            (_b = n.children) === null || _b === void 0 ? void 0 : _b.forEach((child) => {
                findInvolvedTreeNodes(child, activeItems);
            });
            return activeItems;
        };
        const m = this.treeToggle$.value;
        findInvolvedTreeNodes(node).forEach((activeId) => {
            if (m.get(activeId) !== TREE_TOGGLE.EXPANDED) {
                m.set(activeId, TREE_TOGGLE.EXPANDED);
            }
        });
        if (m !== this.treeToggle$.value) {
            this.treeToggle$.next(m);
        }
    }
}
UnitTreeService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitTreeService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
UnitTreeService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitTreeService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitTreeService, decorators: [{
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
class UnitListComponent {
    constructor(unitTreeService, orgUnitService) {
        this.unitTreeService = unitTreeService;
        this.orgUnitService = orgUnitService;
        this.isUpdatingUnitAllowed = this.orgUnitService
            ? this.orgUnitService.isUpdatingUnitAllowed()
            : true;
    }
    expandAll() {
        this.unitTreeService.expandAll();
    }
    collapseAll() {
        this.unitTreeService.collapseAll();
    }
}
UnitListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListComponent, deps: [{ token: UnitTreeService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitListComponent, selector: "cx-org-unit-list", ngImport: i0, template: "<cx-org-list [hideAddButton]=\"!isUpdatingUnitAllowed\">\n  <ng-container actions>\n    <button class=\"link\" (click)=\"expandAll()\">\n      {{ 'orgUnit.tree.expandAll' | cxTranslate }}\n    </button>\n    <button class=\"link\" (click)=\"collapseAll()\">\n      {{ 'orgUnit.tree.collapseAll' | cxTranslate }}\n    </button>\n  </ng-container>\n</cx-org-list>\n", dependencies: [{ kind: "component", type: ListComponent, selector: "cx-org-list", inputs: ["key", "hideAddButton"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-org-list [hideAddButton]=\"!isUpdatingUnitAllowed\">\n  <ng-container actions>\n    <button class=\"link\" (click)=\"expandAll()\">\n      {{ 'orgUnit.tree.expandAll' | cxTranslate }}\n    </button>\n    <button class=\"link\" (click)=\"collapseAll()\">\n      {{ 'orgUnit.tree.collapseAll' | cxTranslate }}\n    </button>\n  </ng-container>\n</cx-org-list>\n" }]
        }], ctorParameters: function () { return [{ type: UnitTreeService }, { type: i2.OrgUnitService }]; } });

class ToggleLinkCellComponent extends CellComponent {
    get depthLevel() {
        return this.model.depthLevel;
    }
    constructor(outlet, unitTreeService) {
        super(outlet);
        this.outlet = outlet;
        this.unitTreeService = unitTreeService;
    }
    get combinedName() {
        return this.property ? `${this.property} (${this.count})` : '';
    }
    get tabIndex() {
        return 0;
    }
    get expanded() {
        return this.model.expanded;
    }
    /**
     * Counts the number of descendants
     */
    get count() {
        return this.model.count;
    }
    toggleItem(event) {
        event.preventDefault();
        event.stopPropagation();
        this.unitTreeService.toggle(this.model);
    }
    /**
     * Indicates whether the tree item should have a toggle navigation.
     *
     * The toggle navigation is used in case the tree item has descendants,
     * and if the tree item level is not configured to be shown anyway.
     */
    get isSwitchable() {
        return this.count > 0;
    }
    // TODO: leverage these methods when available from future PR.
    get hasItem() {
        return !!this.item && Object.keys(this.item).length > 0;
    }
    get item() {
        if (!this.outlet.context) {
            return null;
        }
        const _a = this.outlet.context, { _field, _options, _type, _i18nRoot } = _a, all = __rest(_a, ["_field", "_options", "_type", "_i18nRoot"]);
        return all;
    }
}
ToggleLinkCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleLinkCellComponent, deps: [{ token: i1.OutletContextData }, { token: UnitTreeService }], target: i0.ɵɵFactoryTarget.Component });
ToggleLinkCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ToggleLinkCellComponent, selector: "cx-org-toggle-link-cell", host: { properties: { "style.--cx-depth-level": "this.depthLevel" } }, usesInheritance: true, ngImport: i0, template: "<a\n  *ngIf=\"hasItem\"\n  class=\"hide-focus-border\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <button\n    *ngIf=\"isSwitchable\"\n    class=\"button tree-item-toggle\"\n    type=\"button\"\n    [attr.aria-label]=\"\n      expanded\n        ? ('orgUnit.tree.collapse' | cxTranslate)\n        : ('orgUnit.tree.expand' | cxTranslate)\n    \"\n    (click)=\"toggleItem($event)\"\n  >\n    <cx-icon [type]=\"expanded ? 'CARET_DOWN' : 'CARET_RIGHT'\"></cx-icon>\n  </button>\n  <span class=\"text\" title=\"{{ combinedName }}\">{{ combinedName }}</span>\n</a>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ToggleLinkCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-toggle-link-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<a\n  *ngIf=\"hasItem\"\n  class=\"hide-focus-border\"\n  [routerLink]=\"{ cxRoute: route, params: routeModel } | cxUrl\"\n  [tabIndex]=\"tabIndex\"\n>\n  <button\n    *ngIf=\"isSwitchable\"\n    class=\"button tree-item-toggle\"\n    type=\"button\"\n    [attr.aria-label]=\"\n      expanded\n        ? ('orgUnit.tree.collapse' | cxTranslate)\n        : ('orgUnit.tree.expand' | cxTranslate)\n    \"\n    (click)=\"toggleItem($event)\"\n  >\n    <cx-icon [type]=\"expanded ? 'CARET_DOWN' : 'CARET_RIGHT'\"></cx-icon>\n  </button>\n  <span class=\"text\" title=\"{{ combinedName }}\">{{ combinedName }}</span>\n</a>\n" }]
        }], ctorParameters: function () { return [{ type: i1.OutletContextData }, { type: UnitTreeService }]; }, propDecorators: { depthLevel: [{
                type: HostBinding,
                args: ['style.--cx-depth-level']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitListModule {
}
UnitListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitListModule, declarations: [UnitListComponent, ToggleLinkCellComponent], imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        ListModule], exports: [ToggleLinkCellComponent] });
UnitListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListModule, imports: [CommonModule,
        RouterModule,
        UrlModule,
        I18nModule,
        IconModule,
        ListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        IconModule,
                        ListModule,
                    ],
                    declarations: [UnitListComponent, ToggleLinkCellComponent],
                    exports: [ToggleLinkCellComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserDetailsCellComponent extends CellComponent {
    constructor(b2bUserService, outlet) {
        super(outlet);
        this.b2bUserService = b2bUserService;
        this.outlet = outlet;
        this.availableRoles = this.b2bUserService
            .getAllRoles()
            .map((role) => role.toString());
        this.availableRights = this.b2bUserService
            .getAllRights()
            .map((right) => right.toString());
        this.b2bUserModel = super.model;
    }
    hasRight(model) {
        var _a;
        return ((_a = model.roles) !== null && _a !== void 0 ? _a : []).some((role) => this.availableRights.includes(role));
    }
}
UserDetailsCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsCellComponent, deps: [{ token: i2.B2BUserService }, { token: i1.OutletContextData }], target: i0.ɵɵFactoryTarget.Component });
UserDetailsCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserDetailsCellComponent, selector: "cx-org-user-details-cell", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"b2bUserModel as model\">\n  <ng-template #details>\n    <div class=\"popover-details\">\n      <div class=\"property\">\n        <label>{{ 'orgUser.name' | cxTranslate }}</label>\n        <a\n          class=\"value\"\n          [routerLink]=\"\n            {\n              cxRoute: 'orgUserDetails',\n              params: model\n            } | cxUrl\n          \"\n          >{{ model.name }}</a\n        >\n      </div>\n\n      <div class=\"property full-width\">\n        <label>{{ 'orgUser.uid' | cxTranslate }}</label>\n        <span class=\"value\">\n          {{ model.uid }}\n        </span>\n      </div>\n\n      <div class=\"property\">\n        <label>{{ 'orgUser.roles' | cxTranslate }}</label>\n        <ul class=\"value\">\n          <ng-container *ngFor=\"let role of model.roles\">\n            <li\n              *ngIf=\"availableRoles.includes(role)\"\n              [innerText]=\"'organization.userRoles.' + role | cxTranslate\"\n            ></li>\n          </ng-container>\n          <li *ngIf=\"model.roles?.length === 0\">-</li>\n        </ul>\n      </div>\n\n      <div class=\"property\" *ngIf=\"hasRight(model)\">\n        <label>{{ 'orgUser.rights' | cxTranslate }}</label>\n        <ul class=\"value\">\n          <ng-container *ngFor=\"let right of model.roles\">\n            <li\n              *ngIf=\"availableRights.includes(right)\"\n              [innerText]=\"'organization.userRights.' + right | cxTranslate\"\n            ></li>\n          </ng-container>\n          <li *ngIf=\"model.roles?.length === 0\">-</li>\n        </ul>\n      </div>\n\n      <div class=\"property\">\n        <label>{{ 'orgUser.orgUnit' | cxTranslate }}</label>\n        <a\n          class=\"value\"\n          [routerLink]=\"\n            {\n              cxRoute: 'orgUnitDetails',\n              params: model.orgUnit\n            } | cxUrl\n          \"\n        >\n          {{ model.orgUnit?.name }}\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <button\n    class=\"button text\"\n    [cxPopover]=\"details\"\n    [cxPopoverOptions]=\"{\n      placement: 'auto',\n      class: 'my-company-popover',\n      appendToBody: true,\n      displayCloseButton: true\n    }\"\n  >\n    {{ model?.name }}\n  </button>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-details-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"b2bUserModel as model\">\n  <ng-template #details>\n    <div class=\"popover-details\">\n      <div class=\"property\">\n        <label>{{ 'orgUser.name' | cxTranslate }}</label>\n        <a\n          class=\"value\"\n          [routerLink]=\"\n            {\n              cxRoute: 'orgUserDetails',\n              params: model\n            } | cxUrl\n          \"\n          >{{ model.name }}</a\n        >\n      </div>\n\n      <div class=\"property full-width\">\n        <label>{{ 'orgUser.uid' | cxTranslate }}</label>\n        <span class=\"value\">\n          {{ model.uid }}\n        </span>\n      </div>\n\n      <div class=\"property\">\n        <label>{{ 'orgUser.roles' | cxTranslate }}</label>\n        <ul class=\"value\">\n          <ng-container *ngFor=\"let role of model.roles\">\n            <li\n              *ngIf=\"availableRoles.includes(role)\"\n              [innerText]=\"'organization.userRoles.' + role | cxTranslate\"\n            ></li>\n          </ng-container>\n          <li *ngIf=\"model.roles?.length === 0\">-</li>\n        </ul>\n      </div>\n\n      <div class=\"property\" *ngIf=\"hasRight(model)\">\n        <label>{{ 'orgUser.rights' | cxTranslate }}</label>\n        <ul class=\"value\">\n          <ng-container *ngFor=\"let right of model.roles\">\n            <li\n              *ngIf=\"availableRights.includes(right)\"\n              [innerText]=\"'organization.userRights.' + right | cxTranslate\"\n            ></li>\n          </ng-container>\n          <li *ngIf=\"model.roles?.length === 0\">-</li>\n        </ul>\n      </div>\n\n      <div class=\"property\">\n        <label>{{ 'orgUser.orgUnit' | cxTranslate }}</label>\n        <a\n          class=\"value\"\n          [routerLink]=\"\n            {\n              cxRoute: 'orgUnitDetails',\n              params: model.orgUnit\n            } | cxUrl\n          \"\n        >\n          {{ model.orgUnit?.name }}\n        </a>\n      </div>\n    </div>\n  </ng-template>\n\n  <button\n    class=\"button text\"\n    [cxPopover]=\"details\"\n    [cxPopoverOptions]=\"{\n      placement: 'auto',\n      class: 'my-company-popover',\n      appendToBody: true,\n      displayCloseButton: true\n    }\"\n  >\n    {{ model?.name }}\n  </button>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i2.B2BUserService }, { type: i1.OutletContextData }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitDetailsCellComponent extends CellComponent {
}
UnitDetailsCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
UnitDetailsCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitDetailsCellComponent, selector: "cx-org-unit-details-cell", usesInheritance: true, ngImport: i0, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgUnit.name' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: { uid: model.id }\n          } | cxUrl\n        \"\n      >\n        {{ model.name }}\n      </a>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUnit.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.id }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUnit.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.approvalProcess?.name\">\n      <label>{{ 'orgUnit.approvalProcess' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.approvalProcess?.name }}\n      </span>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model.name }}\n</button>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-details-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgUnit.name' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: { uid: model.id }\n          } | cxUrl\n        \"\n      >\n        {{ model.name }}\n      </a>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUnit.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.id }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUnit.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.approvalProcess?.name\">\n      <label>{{ 'orgUnit.approvalProcess' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.approvalProcess?.name }}\n      </span>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model.name }}\n</button>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CurrentUnitChildService extends CurrentUnitService {
    getParamKey() {
        // We must come up with a fake param key, to avoid that the (parent) unit
        // code is loaded from the route parameter map.
        return 'childUnitCode';
    }
}
CurrentUnitChildService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitChildService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
CurrentUnitChildService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitChildService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUnitChildService, decorators: [{
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
class UnitChildItemService extends UnitItemService {
    constructor(currentItemService, routingService, formService, unitService) {
        super(currentItemService, routingService, formService, unitService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.unitService = unitService;
    }
    save(form, key) {
        var _a;
        // we enable the parentOrgUnit temporarily so that the underlying
        // save method can read the complete form.value.
        (_a = form.get('parentOrgUnit')) === null || _a === void 0 ? void 0 : _a.enable();
        return super.save(form, key);
    }
    /**
     * @override
     * Returns 'unitDetails'
     */
    getDetailsRoute() {
        return 'orgUnitChildren';
    }
    buildRouteParams(item) {
        var _a;
        return { uid: (_a = item.parentOrgUnit) === null || _a === void 0 ? void 0 : _a.uid };
    }
}
UnitChildItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildItemService, deps: [{ token: CurrentUnitChildService }, { token: i3.RoutingService }, { token: UnitFormService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitChildItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CurrentUnitChildService }, { type: i3.RoutingService }, { type: UnitFormService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitChildCreateComponent {
    constructor(unitService) {
        this.unitService = unitService;
        this.unitKey$ = this.unitService.key$;
    }
}
UnitChildCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildCreateComponent, deps: [{ token: CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitChildCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitChildCreateComponent, selector: "cx-org-unit-child-create", host: { classAttribute: "content-wrapper" }, providers: [
        // we provide a specific version of the `UnitItemService` to
        // let the form component work with child units.
        {
            provide: UnitItemService,
            useExisting: UnitChildItemService,
        },
    ], ngImport: i0, template: "<cx-org-unit-form\n  [createChildUnit]=\"true\"\n  i18nRoot=\"orgUnit.children\"\n></cx-org-unit-form>\n", dependencies: [{ kind: "component", type: UnitFormComponent, selector: "cx-org-unit-form", inputs: ["i18nRoot", "createChildUnit"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildCreateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-child-create', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        // we provide a specific version of the `UnitItemService` to
                        // let the form component work with child units.
                        {
                            provide: UnitItemService,
                            useExisting: UnitChildItemService,
                        },
                    ], template: "<cx-org-unit-form\n  [createChildUnit]=\"true\"\n  i18nRoot=\"orgUnit.children\"\n></cx-org-unit-form>\n" }]
        }], ctorParameters: function () { return [{ type: CurrentUnitService }]; } });

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
class UnitChildCreateModule {
}
UnitChildCreateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildCreateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitChildCreateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitChildCreateModule, declarations: [UnitChildCreateComponent], imports: [CommonModule, UnitFormModule] });
UnitChildCreateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildCreateModule, imports: [CommonModule, UnitFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitChildCreateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UnitFormModule],
                    declarations: [UnitChildCreateComponent],
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
class UnitCostCenterItemService extends CostCenterItemService {
    save(form, key) {
        var _a;
        // we enable the unit so that the underlying
        // save method can read the complete form.value.
        (_a = form.get('unit')) === null || _a === void 0 ? void 0 : _a.enable();
        return super.save(form, key);
    }
    /**
     * @override
     * Returns 'orgUnitCostCenters'
     */
    getDetailsRoute() {
        return 'orgUnitCostCenters';
    }
    buildRouteParams(item) {
        var _a;
        return { uid: (_a = item.unit) === null || _a === void 0 ? void 0 : _a.uid };
    }
}
UnitCostCenterItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterItemService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnitCostCenterItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterItemService, decorators: [{
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
class UnitCostCenterCreateComponent {
    constructor(unitService) {
        this.unitService = unitService;
        this.unitKey$ = this.unitService.key$;
    }
}
UnitCostCenterCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateComponent, deps: [{ token: CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitCostCenterCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitCostCenterCreateComponent, selector: "cx-org-unit-cost-center-create", host: { classAttribute: "content-wrapper" }, providers: [
        // we provide a specific version of the `CostCenterItemService` to
        // let the form component work with unit cost centers.
        {
            provide: CostCenterItemService,
            useExisting: UnitCostCenterItemService,
        },
    ], ngImport: i0, template: "<cx-org-cost-center-form [unitKey]=\"unitKey$ | async\"></cx-org-cost-center-form>\n", dependencies: [{ kind: "component", type: CostCenterFormComponent, selector: "cx-org-cost-center-form", inputs: ["unitKey"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-cost-center-create', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        // we provide a specific version of the `CostCenterItemService` to
                        // let the form component work with unit cost centers.
                        {
                            provide: CostCenterItemService,
                            useExisting: UnitCostCenterItemService,
                        },
                    ], template: "<cx-org-cost-center-form [unitKey]=\"unitKey$ | async\"></cx-org-cost-center-form>\n" }]
        }], ctorParameters: function () { return [{ type: CurrentUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitCostCenterCreateModule {
}
UnitCostCenterCreateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitCostCenterCreateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateModule, declarations: [UnitCostCenterCreateComponent], imports: [CommonModule, CostCenterFormModule] });
UnitCostCenterCreateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateModule, imports: [CommonModule, CostCenterFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitCostCenterCreateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, CostCenterFormModule],
                    declarations: [UnitCostCenterCreateComponent],
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
class UnitUserItemService extends UserItemService {
    save(form, key) {
        var _a;
        // we enable the orgUnit temporarily so that the underlying
        // save method can read the complete form.value.
        (_a = form.get('orgUnit')) === null || _a === void 0 ? void 0 : _a.enable();
        return super.save(form, key);
    }
    /**
     * @override
     * Returns 'unitDetails'
     */
    getDetailsRoute() {
        return 'orgUnitUserList';
    }
    buildRouteParams(item) {
        var _a;
        return { uid: (_a = item.orgUnit) === null || _a === void 0 ? void 0 : _a.uid };
    }
    // @override to default method
    launchDetails(item) {
        const cxRoute = this.getDetailsRoute();
        const params = this.buildRouteParams(item);
        if (cxRoute && item && Object.keys(item).length > 0) {
            this.routingService.go({ cxRoute, params });
        }
    }
}
UnitUserItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserItemService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UnitUserItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserItemService, decorators: [{
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
class UserFormComponent {
    /**
     * Initialize the business unit for the user.
     *
     * If there's a unit provided, we disable the unit form control.
     */
    set unitKey(value) {
        var _a, _b, _c, _d;
        if (value) {
            (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('orgUnit.uid')) === null || _b === void 0 ? void 0 : _b.setValue(value);
            (_d = (_c = this.form) === null || _c === void 0 ? void 0 : _c.get('orgUnit')) === null || _d === void 0 ? void 0 : _d.disable();
        }
    }
    constructor(itemService, unitService, userProfileFacade, b2bUserService) {
        this.itemService = itemService;
        this.unitService = unitService;
        this.userProfileFacade = userProfileFacade;
        this.b2bUserService = b2bUserService;
        this.form = this.itemService.getForm();
        this.units$ = this.unitService
            .getActiveUnitList()
            .pipe(tap((units) => {
            var _a, _b, _c;
            if (units && units.length === 1) {
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('orgUnit.uid')) === null || _b === void 0 ? void 0 : _b.setValue((_c = units[0]) === null || _c === void 0 ? void 0 : _c.id);
            }
        }));
        this.titles$ = this.userProfileFacade.getTitles();
        this.availableRoles = this.b2bUserService.getAllRoles();
        this.availableRights = this.b2bUserService.getAllRights();
    }
    ngOnInit() {
        this.unitService.loadList();
    }
    updateRoles(event) {
        const { checked, value } = event.target;
        if (checked) {
            this.roles.push(new UntypedFormControl(value));
        }
        else {
            this.roles.removeAt(this.roles.value.indexOf(value));
        }
    }
    get roles() {
        var _a;
        return (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('roles');
    }
    get isAssignedToApprovers() {
        var _a;
        return (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('isAssignedToApprovers');
    }
}
UserFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormComponent, deps: [{ token: ItemService }, { token: i2.OrgUnitService }, { token: i2$1.UserProfileFacade }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Component });
UserFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserFormComponent, selector: "cx-org-user-form", inputs: { unitKey: "unitKey" }, host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: UserItemService,
        },
        {
            provide: CurrentItemService,
            useExisting: CurrentUserService,
        },
    ], ngImport: i0, template: "<cx-org-form i18nRoot=\"orgUser\">\n  <ng-container main *ngIf=\"form\" [formGroup]=\"form\">\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUser.title' | cxTranslate\n      }}</span>\n      <ng-select\n        formControlName=\"titleCode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"titles$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgUser.title' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('titleCode')\"></cx-form-errors>\n    </label>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUser.firstName' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgUser.firstName' | cxTranslate }}\"\n        formControlName=\"firstName\"\n      />\n      <cx-form-errors [control]=\"form.get('firstName')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUser.lastName' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgUser.lastName' | cxTranslate }}\"\n        formControlName=\"lastName\"\n      />\n      <cx-form-errors [control]=\"form.get('lastName')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUser.email' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"email\"\n        required\n        placeholder=\"{{ 'orgUser.email' | cxTranslate }}\"\n        formControlName=\"email\"\n      />\n      <cx-form-errors [control]=\"form.get('email')\"></cx-form-errors>\n    </label>\n\n    <fieldset required=\"true\" class=\"full-width\" formArrayName=\"roles\">\n      <legend class=\"label-content required\">\n        {{ 'orgUser.roles' | cxTranslate }}\n      </legend>\n\n      <label\n        class=\"form-check\"\n        *ngFor=\"let role of availableRoles; let i = index\"\n      >\n        <input\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [value]=\"role\"\n          [checked]=\"roles?.value?.includes(role)\"\n          (change)=\"updateRoles($any($event))\"\n          [disabled]=\"form?.status === 'DISABLED'\"\n        />\n        <span class=\"form-check-label\">\n          {{ 'organization.userRoles.' + role | cxTranslate }}\n        </span>\n      </label>\n    </fieldset>\n\n    <fieldset required=\"true\" class=\"full-width\">\n      <legend class=\"label-content required\">\n        {{ 'orgUser.rights' | cxTranslate }}\n      </legend>\n\n      <label\n        class=\"form-check\"\n        *ngFor=\"let right of availableRights; let i = index\"\n      >\n        <input\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [value]=\"right\"\n          [checked]=\"roles?.value?.includes(right)\"\n          (change)=\"updateRoles($any($event))\"\n          [disabled]=\"form?.status === 'DISABLED'\"\n        />\n        <span class=\"form-check-label\">\n          {{ 'organization.userRights.' + right | cxTranslate }}\n        </span>\n      </label>\n    </fieldset>\n\n    <label [formGroup]=\"$any(form.get('orgUnit'))\">\n      <span class=\"label-content required\">{{\n        'orgUser.orgUnit' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"(units$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgUser.orgUnit' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('orgUnit.uid')\"></cx-form-errors>\n    </label>\n\n    <div *ngIf=\"isAssignedToApprovers\" class=\"full-width\">\n      <label class=\"form-check\">\n        <input\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          formControlName=\"isAssignedToApprovers\"\n        />\n        <span class=\"form-check-label\">{{\n          'orgUser.assignApprover' | cxTranslate\n        }}</span>\n      </label>\n    </div>\n  </ng-container>\n</cx-org-form>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: FormComponent, selector: "cx-org-form", inputs: ["i18nRoot", "animateBack", "subtitle"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "directive", type: i7.FormArrayName, selector: "[formArrayName]", inputs: ["formArrayName"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ItemService,
                            useExisting: UserItemService,
                        },
                        {
                            provide: CurrentItemService,
                            useExisting: CurrentUserService,
                        },
                    ], template: "<cx-org-form i18nRoot=\"orgUser\">\n  <ng-container main *ngIf=\"form\" [formGroup]=\"form\">\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUser.title' | cxTranslate\n      }}</span>\n      <ng-select\n        formControlName=\"titleCode\"\n        [searchable]=\"false\"\n        [clearable]=\"false\"\n        [items]=\"titles$ | async\"\n        bindLabel=\"name\"\n        bindValue=\"code\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgUser.title' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('titleCode')\"></cx-form-errors>\n    </label>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUser.firstName' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgUser.firstName' | cxTranslate }}\"\n        formControlName=\"firstName\"\n      />\n      <cx-form-errors [control]=\"form.get('firstName')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUser.lastName' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgUser.lastName' | cxTranslate }}\"\n        formControlName=\"lastName\"\n      />\n      <cx-form-errors [control]=\"form.get('lastName')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUser.email' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"email\"\n        required\n        placeholder=\"{{ 'orgUser.email' | cxTranslate }}\"\n        formControlName=\"email\"\n      />\n      <cx-form-errors [control]=\"form.get('email')\"></cx-form-errors>\n    </label>\n\n    <fieldset required=\"true\" class=\"full-width\" formArrayName=\"roles\">\n      <legend class=\"label-content required\">\n        {{ 'orgUser.roles' | cxTranslate }}\n      </legend>\n\n      <label\n        class=\"form-check\"\n        *ngFor=\"let role of availableRoles; let i = index\"\n      >\n        <input\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [value]=\"role\"\n          [checked]=\"roles?.value?.includes(role)\"\n          (change)=\"updateRoles($any($event))\"\n          [disabled]=\"form?.status === 'DISABLED'\"\n        />\n        <span class=\"form-check-label\">\n          {{ 'organization.userRoles.' + role | cxTranslate }}\n        </span>\n      </label>\n    </fieldset>\n\n    <fieldset required=\"true\" class=\"full-width\">\n      <legend class=\"label-content required\">\n        {{ 'orgUser.rights' | cxTranslate }}\n      </legend>\n\n      <label\n        class=\"form-check\"\n        *ngFor=\"let right of availableRights; let i = index\"\n      >\n        <input\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          [value]=\"right\"\n          [checked]=\"roles?.value?.includes(right)\"\n          (change)=\"updateRoles($any($event))\"\n          [disabled]=\"form?.status === 'DISABLED'\"\n        />\n        <span class=\"form-check-label\">\n          {{ 'organization.userRights.' + right | cxTranslate }}\n        </span>\n      </label>\n    </fieldset>\n\n    <label [formGroup]=\"$any(form.get('orgUnit'))\">\n      <span class=\"label-content required\">{{\n        'orgUser.orgUnit' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"(units$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgUser.orgUnit' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('orgUnit.uid')\"></cx-form-errors>\n    </label>\n\n    <div *ngIf=\"isAssignedToApprovers\" class=\"full-width\">\n      <label class=\"form-check\">\n        <input\n          type=\"checkbox\"\n          class=\"form-check-input\"\n          formControlName=\"isAssignedToApprovers\"\n        />\n        <span class=\"form-check-label\">{{\n          'orgUser.assignApprover' | cxTranslate\n        }}</span>\n      </label>\n    </div>\n  </ng-container>\n</cx-org-form>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: i2.OrgUnitService }, { type: i2$1.UserProfileFacade }, { type: i2.B2BUserService }]; }, propDecorators: { unitKey: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserCreateComponent {
    constructor(unitService) {
        this.unitService = unitService;
        this.unitKey$ = this.unitService.key$;
    }
}
UnitUserCreateComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserCreateComponent, deps: [{ token: CurrentUnitService }], target: i0.ɵɵFactoryTarget.Component });
UnitUserCreateComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UnitUserCreateComponent, selector: "cx-org-unit-user-create", host: { classAttribute: "content-wrapper" }, providers: [
        // we provide a specific version of the `UnitItemService` to
        // let the form component work with child units.
        {
            provide: UserItemService,
            useExisting: UnitUserItemService,
        },
    ], ngImport: i0, template: "<cx-org-user-form\n  [unitKey]=\"unitKey$ | async\"\n  i18nRoot=\"orgUnit.users\"\n></cx-org-user-form>\n", dependencies: [{ kind: "component", type: UserFormComponent, selector: "cx-org-user-form", inputs: ["unitKey"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserCreateComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-unit-user-create', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        // we provide a specific version of the `UnitItemService` to
                        // let the form component work with child units.
                        {
                            provide: UserItemService,
                            useExisting: UnitUserItemService,
                        },
                    ], template: "<cx-org-user-form\n  [unitKey]=\"unitKey$ | async\"\n  i18nRoot=\"orgUnit.users\"\n></cx-org-user-form>\n" }]
        }], ctorParameters: function () { return [{ type: CurrentUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserFormModule {
}
UserFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserFormModule, declarations: [UserFormComponent], imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule], exports: [UserFormComponent] });
UserFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormModule, imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                    ],
                    declarations: [UserFormComponent],
                    exports: [UserFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitUserCreateModule {
}
UnitUserCreateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserCreateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitUserCreateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitUserCreateModule, declarations: [UnitUserCreateComponent], imports: [CommonModule, UserFormModule] });
UnitUserCreateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserCreateModule, imports: [CommonModule, UserFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitUserCreateModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, UserFormModule],
                    declarations: [UnitUserCreateComponent],
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
class UnitAddressRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
UnitAddressRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressRoutePageMetaResolver, deps: [{ token: i3.TranslationService }, { token: CurrentUnitAddressService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitAddressRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i3.TranslationService }, { type: CurrentUnitAddressService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to populate Unit data to `Table` data. Unit
 * data is driven by the table configuration, using the `OrganizationTables.UNIT`.
 */
class UnitListService extends ListService {
    constructor(tableService, unitService, unitItemService, unitTreeService) {
        super(tableService);
        this.tableService = tableService;
        this.unitService = unitService;
        this.unitItemService = unitItemService;
        this.unitTreeService = unitTreeService;
        this.tableType = OrganizationTableType.UNIT;
    }
    load() {
        return this.unitService.getTree().pipe(switchMap((node) => this.unitItemService.key$.pipe(map((key) => {
            if (node) {
                this.unitTreeService.initialize(node, key);
            }
            return node;
        }))), switchMap((tree) => this.unitTreeService.treeToggle$.pipe(map(() => tree))), map((tree) => this.convertListItem(tree)));
    }
    convertListItem(unit, depthLevel = 0, pagination = { totalResults: 0 }) {
        var _a, _b, _c, _d, _e, _f;
        let values = [];
        if (!unit) {
            return undefined;
        }
        const node = Object.assign(Object.assign({}, unit), { count: (_b = (_a = unit.children) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0, expanded: this.unitTreeService.isExpanded((_c = unit.id) !== null && _c !== void 0 ? _c : '', depthLevel), depthLevel, 
            // tmp, should be normalized
            uid: (_d = unit.id) !== null && _d !== void 0 ? _d : '', children: [...((_e = unit.children) !== null && _e !== void 0 ? _e : [])].sort((unitA, unitB) => { var _a, _b; return ((_a = unitA.name) !== null && _a !== void 0 ? _a : '').localeCompare((_b = unitB.name) !== null && _b !== void 0 ? _b : ''); }) });
        values.push(node);
        pagination.totalResults++;
        (_f = node.children) === null || _f === void 0 ? void 0 : _f.forEach((childUnit) => {
            var _a;
            const childList = (_a = this.convertListItem(childUnit, depthLevel + 1, pagination)) === null || _a === void 0 ? void 0 : _a.values;
            if (node.expanded && childList && childList.length > 0) {
                values = values.concat(childList);
            }
        });
        return { values, pagination };
    }
    key() {
        return 'uid';
    }
}
UnitListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListService, deps: [{ token: i1.TableService }, { token: i2.OrgUnitService }, { token: UnitItemService }, { token: UnitTreeService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.OrgUnitService }, { type: UnitItemService }, { type: UnitTreeService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UnitRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
UnitRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitRoutePageMetaResolver, deps: [{ token: i3.TranslationService }, { token: CurrentUnitService }], target: i0.ɵɵFactoryTarget.Injectable });
UnitRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i3.TranslationService }, { type: CurrentUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const unitsCmsConfig = {
    cmsComponents: {
        ManageUnitsListComponent: {
            component: UnitListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: UnitListService,
                },
                {
                    provide: ItemService,
                    useExisting: UnitItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgUnit.breadcrumbs.list',
                            resolver: UnitRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: UnitFormComponent,
                        canActivate: [OrgUnitGuard],
                    },
                    {
                        path: `:${ROUTE_PARAMS.unitCode}`,
                        component: UnitDetailsComponent,
                        data: {
                            cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.details' },
                        },
                        children: [
                            {
                                path: 'edit',
                                component: UnitFormComponent,
                                canActivate: [OrgUnitGuard],
                            },
                            {
                                path: 'children',
                                component: UnitChildrenComponent,
                                canActivate: [OrgUnitGuard],
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.children' },
                                },
                                children: [
                                    {
                                        path: 'create',
                                        component: UnitChildCreateComponent,
                                    },
                                ],
                            },
                            {
                                path: 'approvers',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.approvers' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UnitAssignedApproverListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UnitApproverListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'users',
                                component: UnitUserListComponent,
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.users' },
                                },
                                children: [
                                    {
                                        path: 'create',
                                        component: UnitUserCreateComponent,
                                        canActivate: [UserGuard],
                                    },
                                    {
                                        path: `:${ROUTE_PARAMS.userCode}/roles`,
                                        component: UnitUserRolesFormComponent,
                                        canActivate: [UserGuard],
                                    },
                                ],
                            },
                            {
                                path: 'cost-centers',
                                component: UnitCostCenterListComponent,
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUnit.breadcrumbs.costCenters' },
                                },
                                children: [
                                    {
                                        path: 'create',
                                        component: UnitCostCenterCreateComponent,
                                    },
                                ],
                            },
                            {
                                path: 'addresses',
                                component: UnitAddressListComponent,
                                data: {
                                    cxPageMeta: {
                                        breadcrumb: 'orgUnit.breadcrumbs.addresses',
                                        resolver: UnitAddressRoutePageMetaResolver,
                                    },
                                },
                                children: [
                                    {
                                        path: 'create',
                                        component: UnitAddressFormComponent,
                                    },
                                    {
                                        path: `:${ROUTE_PARAMS.addressCode}`,
                                        data: {
                                            cxPageMeta: {
                                                breadcrumb: 'orgUnit.breadcrumbs.addressDetails',
                                            },
                                        },
                                        children: [
                                            {
                                                path: '',
                                                component: UnitAddressDetailsComponent,
                                            },
                                            {
                                                path: 'edit',
                                                component: UnitAddressFormComponent,
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
function unitsTableConfigFactory() {
    return unitsTableConfig;
}
const unitsTableConfig = {
    table: {
        [OrganizationTableType.UNIT]: {
            cells: ['name'],
            options: {
                layout: TableLayout.VERTICAL,
                cells: {
                    name: {
                        dataComponent: ToggleLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    uid: {
                        dataComponent: CellComponent,
                    },
                },
            },
            [BREAKPOINT.lg]: {
                cells: ['name', 'active', 'uid'],
            },
        },
        [OrganizationTableType.UNIT_USERS]: {
            cells: ['name', 'roles'],
            options: {
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    roles: {
                        dataComponent: UnitUserRolesCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.UNIT_CHILDREN]: {
            cells: ['name', 'active'],
            options: {
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
                cells: {
                    name: {
                        dataComponent: UnitDetailsCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                        linkable: false,
                    },
                },
            },
        },
        [OrganizationTableType.UNIT_APPROVERS]: {
            cells: ['name', 'orgUnit', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                    orgUnit: {
                        dataComponent: UnitCellComponent,
                        linkable: false,
                    },
                },
            },
        },
        [OrganizationTableType.UNIT_ASSIGNED_APPROVERS]: {
            cells: ['name', 'orgUnit', 'actions'],
            options: {
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                    orgUnit: {
                        dataComponent: UnitCellComponent,
                        linkable: false,
                    },
                },
            },
        },
        [OrganizationTableType.UNIT_COST_CENTERS]: {
            cells: ['name'],
            options: {
                cells: {
                    name: {
                        dataComponent: CostCenterDetailsCellComponent,
                    },
                },
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
            },
        },
        [OrganizationTableType.UNIT_ADDRESS]: {
            cells: ['formattedAddress'],
            options: {
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
                cells: {
                    formattedAddress: {
                        dataComponent: LinkCellComponent,
                    },
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
class UnitsComponentsModule {
}
UnitsComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitsComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitsComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitsComponentsModule, imports: [RouterModule,
        UnitListModule,
        UnitDetailsModule,
        UnitFormModule,
        UnitChildrenModule,
        UnitApproverListModule,
        UnitUsersModule,
        UnitCostCenterListModule,
        UnitAddressModule] });
UnitsComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitsComponentsModule, providers: [
        provideDefaultConfig(unitsCmsConfig),
        provideDefaultConfigFactory(unitsTableConfigFactory),
    ], imports: [RouterModule,
        UnitListModule,
        UnitDetailsModule,
        UnitFormModule,
        UnitChildrenModule,
        UnitApproverListModule,
        UnitUsersModule,
        UnitCostCenterListModule,
        UnitAddressModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitsComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule,
                        UnitListModule,
                        UnitDetailsModule,
                        UnitFormModule,
                        UnitChildrenModule,
                        UnitApproverListModule,
                        UnitUsersModule,
                        UnitCostCenterListModule,
                        UnitAddressModule,
                    ],
                    providers: [
                        provideDefaultConfig(unitsCmsConfig),
                        provideDefaultConfigFactory(unitsTableConfigFactory),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CurrentUserGroupService extends CurrentItemService {
    constructor(routingService, userGroupService) {
        super(routingService);
        this.routingService = routingService;
        this.userGroupService = userGroupService;
    }
    getParamKey() {
        return ROUTE_PARAMS.userGroupCode;
    }
    getItem(code) {
        return this.userGroupService.get(code);
    }
    getError(code) {
        return this.userGroupService.getErrorState(code);
    }
}
CurrentUserGroupService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserGroupService, deps: [{ token: i3.RoutingService }, { token: i2.UserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
CurrentUserGroupService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserGroupService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CurrentUserGroupService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3.RoutingService }, { type: i2.UserGroupService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupFormService extends FormService {
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('uid', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.noSpecialCharacters,
        ]));
        form.setControl('name', new UntypedFormControl('', Validators.required));
        form.setControl('orgUnit', new UntypedFormGroup({
            uid: new UntypedFormControl(undefined, Validators.required),
        }));
        this.form = form;
    }
}
UserGroupFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserGroupFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormService, decorators: [{
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
class UserGroupItemService extends ItemService {
    constructor(currentItemService, routingService, formService, userGroupService) {
        super(currentItemService, routingService, formService);
        this.currentItemService = currentItemService;
        this.routingService = routingService;
        this.formService = formService;
        this.userGroupService = userGroupService;
    }
    load(code) {
        this.userGroupService.load(code);
        return this.userGroupService.get(code);
    }
    update(code, value) {
        var _a;
        this.userGroupService.update(code, value);
        return this.userGroupService.getLoadingStatus((_a = value.uid) !== null && _a !== void 0 ? _a : '');
    }
    delete(code) {
        this.launchList();
        this.userGroupService.delete(code);
        return this.userGroupService.getLoadingStatus(code);
    }
    create(value) {
        var _a;
        this.userGroupService.create(value);
        return this.userGroupService.getLoadingStatus((_a = value.uid) !== null && _a !== void 0 ? _a : '');
    }
    getDetailsRoute() {
        return 'orgUserGroupDetails';
    }
    launchList() {
        this.routingService.go({
            cxRoute: 'orgUserGroup',
        });
    }
}
UserGroupItemService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupItemService, deps: [{ token: CurrentUserGroupService }, { token: i3.RoutingService }, { token: UserGroupFormService }, { token: i2.UserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupItemService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupItemService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupItemService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CurrentUserGroupService }, { type: i3.RoutingService }, { type: UserGroupFormService }, { type: i2.UserGroupService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupDetailsComponent {
    constructor(itemService) {
        this.itemService = itemService;
        this.model$ = this.itemService.key$.pipe(switchMap((code) => this.itemService.load(code)), startWith({}));
        this.isInEditMode$ = this.itemService.isInEditMode$;
    }
}
UserGroupDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsComponent, deps: [{ token: ItemService }], target: i0.ɵɵFactoryTarget.Component });
UserGroupDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupDetailsComponent, selector: "cx-org-user-group-details", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: UserGroupItemService,
        },
    ], ngImport: i0, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgUserGroup.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    class=\"link edit\"\n    [routerLink]=\"{ cxRoute: 'orgUserGroupEdit', params: model } | cxUrl\"\n    [class.disabled]=\"isInEditMode$ | async\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-delete-item\n    actions\n    key=\"uid\"\n    i18nRoot=\"orgUserGroup\"\n  ></cx-org-delete-item>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.uid }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.orgUnit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <ng-container *ngIf=\"model.uid\">\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUserGroupUsers', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUserGroup.links.user' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"\n          { cxRoute: 'orgUserGroupPermissions', params: model } | cxUrl\n        \"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUserGroup.links.permission' | cxTranslate }}\n      </a>\n    </ng-container>\n  </section>\n</cx-org-card>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: DeleteItemComponent, selector: "cx-org-delete-item", inputs: ["i18nRoot", "key", "additionalParam"] }, { kind: "directive", type: ItemExistsDirective, selector: "[cxOrgItemExists]" }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-details', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: ItemService,
                            useExisting: UserGroupItemService,
                        },
                    ], host: { class: 'content-wrapper' }, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgUserGroup.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    class=\"link edit\"\n    [routerLink]=\"{ cxRoute: 'orgUserGroupEdit', params: model } | cxUrl\"\n    [class.disabled]=\"isInEditMode$ | async\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-delete-item\n    actions\n    key=\"uid\"\n    i18nRoot=\"orgUserGroup\"\n  ></cx-org-delete-item>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.uid }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.orgUnit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <ng-container *ngIf=\"model.uid\">\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUserGroupUsers', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUserGroup.links.user' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"\n          { cxRoute: 'orgUserGroupPermissions', params: model } | cxUrl\n        \"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUserGroup.links.permission' | cxTranslate }}\n      </a>\n    </ng-container>\n  </section>\n</cx-org-card>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupDetailsModule {
}
UserGroupDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsModule, declarations: [UserGroupDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        DeleteItemModule,
        ItemExistsModule,
        KeyboardFocusModule] });
UserGroupDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        DeleteItemModule,
        ItemExistsModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        DeleteItemModule,
                        ItemExistsModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [UserGroupDetailsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupFormComponent {
    constructor(itemService, unitService) {
        this.itemService = itemService;
        this.unitService = unitService;
        this.form = this.itemService.getForm();
        // getList ???
        this.units$ = this.unitService
            .getActiveUnitList()
            .pipe(tap((units) => {
            var _a, _b, _c;
            if (units && units.length === 1) {
                (_b = (_a = this.form) === null || _a === void 0 ? void 0 : _a.get('orgUnit.uid')) === null || _b === void 0 ? void 0 : _b.setValue((_c = units[0]) === null || _c === void 0 ? void 0 : _c.id);
            }
        }));
    }
    ngOnInit() {
        this.unitService.loadList();
    }
    createUidWithName(name, code) {
        createCodeForEntityName(name, code);
    }
}
UserGroupFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormComponent, deps: [{ token: ItemService }, { token: i2.OrgUnitService }], target: i0.ɵɵFactoryTarget.Component });
UserGroupFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupFormComponent, selector: "cx-org-user-group-form", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: UserGroupItemService,
        },
    ], ngImport: i0, template: "<cx-org-form i18nRoot=\"orgUserGroup\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUserGroup.name' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgUserGroup.name' | cxTranslate }}\"\n        formControlName=\"name\"\n        (blur)=\"createUidWithName(form.get('name'), form.get('uid'))\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUserGroup.uid' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgUserGroup.uid' | cxTranslate }}\"\n        formControlName=\"uid\"\n      />\n      <cx-form-errors [control]=\"form.get('uid')\"></cx-form-errors>\n    </label>\n\n    <label [formGroup]=\"$any(form.get('orgUnit'))\">\n      <span class=\"label-content required\">{{\n        'orgUserGroup.orgUnit' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"(units$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        [readonly]=\"form.get('orgUnit.uid')?.disabled ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgUserGroup.orgUnit' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('orgUnit.uid')\"></cx-form-errors>\n    </label>\n  </ng-container>\n</cx-org-form>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i6.NgSelectComponent, selector: "ng-select", inputs: ["bindLabel", "bindValue", "markFirst", "placeholder", "notFoundText", "typeToSearchText", "addTagText", "loadingText", "clearAllText", "appearance", "dropdownPosition", "appendTo", "loading", "closeOnSelect", "hideSelected", "selectOnTab", "openOnEnter", "maxSelectedItems", "groupBy", "groupValue", "bufferAmount", "virtualScroll", "selectableGroup", "selectableGroupAsModel", "searchFn", "trackByFn", "clearOnBackspace", "labelForId", "inputAttrs", "tabIndex", "readonly", "searchWhileComposing", "minTermLength", "editableSearchTerm", "keyDownFn", "typeahead", "multiple", "addTag", "searchable", "clearable", "isOpen", "items", "compareWith", "clearSearchOnAdd"], outputs: ["blur", "focus", "change", "open", "close", "search", "clear", "add", "remove", "scroll", "scrollToEnd"] }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: FormComponent, selector: "cx-org-form", inputs: ["i18nRoot", "animateBack", "subtitle"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ItemService,
                            useExisting: UserGroupItemService,
                        },
                    ], template: "<cx-org-form i18nRoot=\"orgUserGroup\">\n  <ng-container *ngIf=\"form\" [formGroup]=\"form\" main>\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUserGroup.name' | cxTranslate\n      }}</span>\n      <input\n        type=\"text\"\n        class=\"form-control\"\n        required\n        placeholder=\"{{ 'orgUserGroup.name' | cxTranslate }}\"\n        formControlName=\"name\"\n        (blur)=\"createUidWithName(form.get('name'), form.get('uid'))\"\n      />\n      <cx-form-errors [control]=\"form.get('name')\"></cx-form-errors>\n    </label>\n\n    <label>\n      <span class=\"label-content required\">{{\n        'orgUserGroup.uid' | cxTranslate\n      }}</span>\n      <input\n        class=\"form-control\"\n        type=\"text\"\n        required\n        placeholder=\"{{ 'orgUserGroup.uid' | cxTranslate }}\"\n        formControlName=\"uid\"\n      />\n      <cx-form-errors [control]=\"form.get('uid')\"></cx-form-errors>\n    </label>\n\n    <label [formGroup]=\"$any(form.get('orgUnit'))\">\n      <span class=\"label-content required\">{{\n        'orgUserGroup.orgUnit' | cxTranslate\n      }}</span>\n      <ng-select\n        [inputAttrs]=\"{ required: 'true' }\"\n        formControlName=\"uid\"\n        [searchable]=\"true\"\n        [clearable]=\"false\"\n        [items]=\"(units$ | async) ?? null\"\n        bindLabel=\"name\"\n        bindValue=\"id\"\n        [readonly]=\"form.get('orgUnit.uid')?.disabled ?? false\"\n        appendTo=\"cx-org-list\"\n        [placeholder]=\"'orgUserGroup.orgUnit' | cxTranslate\"\n      >\n      </ng-select>\n      <cx-form-errors [control]=\"form.get('orgUnit.uid')\"></cx-form-errors>\n    </label>\n  </ng-container>\n</cx-org-form>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: i2.OrgUnitService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupFormModule {
}
UserGroupFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormModule, declarations: [UserGroupFormComponent], imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FormModule] });
UserGroupFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormModule, imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        FormModule,
                    ],
                    declarations: [UserGroupFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupPermissionListService extends SubListService {
    constructor(tableService, userGroupService, permissionService) {
        super(tableService);
        this.tableService = tableService;
        this.userGroupService = userGroupService;
        this.permissionService = permissionService;
        this.tableType = OrganizationTableType.USER_GROUP_PERMISSIONS;
        this._domainType = OrganizationTableType.PERMISSION;
    }
    /**
     *
     * @override
     * Loads all b2b users.
     *
     * @param code The user group code.
     */
    load(pagination, code) {
        return this.userGroupService.getAvailableOrderApprovalPermissions(code, pagination);
    }
    /**
     * @override
     * Assign user to the user group.
     */
    assign(userGroupCode, permissionCode) {
        this.userGroupService.assignPermission(userGroupCode, permissionCode);
        return this.permissionService.getLoadingStatus(permissionCode);
    }
    /**
     * @override
     * Unassigns the user from the user group.
     */
    unassign(userGroupCode, permissionCode) {
        this.userGroupService.unassignPermission(userGroupCode, permissionCode);
        return this.permissionService.getLoadingStatus(permissionCode);
    }
}
UserGroupPermissionListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListService, deps: [{ token: i1.TableService }, { token: i2.UserGroupService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupPermissionListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.UserGroupService }, { type: i2.PermissionService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupAssignedPermissionsListService extends UserGroupPermissionListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_GROUP_ASSIGNED_PERMISSIONS;
    }
    /**
     * @override
     * Load all b2b users assigned to the given user group
     */
    load(pagination, code) {
        return super
            .load(pagination, code)
            .pipe(map((users) => this.filterSelected(users)));
    }
}
UserGroupAssignedPermissionsListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionsListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserGroupAssignedPermissionsListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionsListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionsListService, decorators: [{
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
class UserGroupAssignedPermissionListComponent {
}
UserGroupAssignedPermissionListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserGroupAssignedPermissionListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupAssignedPermissionListComponent, selector: "cx-org-user-group-assigned-permission-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserGroupAssignedPermissionsListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedPermissionListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-assigned-permission-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserGroupAssignedPermissionsListService,
                        },
                    ], template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupPermissionListComponent {
}
UserGroupPermissionListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserGroupPermissionListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupPermissionListComponent, selector: "cx-org-user-group-permission-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserGroupPermissionListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-permission-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserGroupPermissionListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\">\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupPermissionModule {
}
UserGroupPermissionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupPermissionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionModule, declarations: [UserGroupPermissionListComponent,
        UserGroupAssignedPermissionListComponent], imports: [CommonModule, I18nModule, RouterModule, SubListModule] });
UserGroupPermissionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionModule, imports: [CommonModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupPermissionModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        UserGroupPermissionListComponent,
                        UserGroupAssignedPermissionListComponent,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PermissionDetailsCellComponent extends CellComponent {
}
PermissionDetailsCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
PermissionDetailsCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: PermissionDetailsCellComponent, selector: "cx-org-permission-details-cell", usesInheritance: true, ngImport: i0, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.code' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgPurchaseLimitDetails',\n            params: model\n          } | cxUrl\n        \"\n      >\n        {{ model.code }}\n      </a>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{\n        'orgPurchaseLimit.orderApprovalPermissionType' | cxTranslate\n      }}</label>\n      <span class=\"value\">\n        {{ model.orderApprovalPermissionType?.name }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.threshold || model.threshold === 0\">\n      <label>{{ 'orgPurchaseLimit.threshold' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.threshold }} {{ model.currency?.symbol }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.periodRange\">\n      <label>{{ 'orgPurchaseLimit.periodRange' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.periodRange }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.unit' | cxTranslate }}</label>\n      <a\n        *ngIf=\"model.code\"\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model.code }}\n</button>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-permission-details-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.code' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgPurchaseLimitDetails',\n            params: model\n          } | cxUrl\n        \"\n      >\n        {{ model.code }}\n      </a>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.active' | cxTranslate }}</label>\n      <span class=\"value\" [class.is-active]=\"model.active\">\n        {{\n          (model.active ? 'organization.enabled' : 'organization.disabled')\n            | cxTranslate\n        }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{\n        'orgPurchaseLimit.orderApprovalPermissionType' | cxTranslate\n      }}</label>\n      <span class=\"value\">\n        {{ model.orderApprovalPermissionType?.name }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.threshold || model.threshold === 0\">\n      <label>{{ 'orgPurchaseLimit.threshold' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.threshold }} {{ model.currency?.symbol }}\n      </span>\n    </div>\n\n    <div class=\"property\" *ngIf=\"model.periodRange\">\n      <label>{{ 'orgPurchaseLimit.periodRange' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.periodRange }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgPurchaseLimit.unit' | cxTranslate }}</label>\n      <a\n        *ngIf=\"model.code\"\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model.code }}\n</button>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to populate Cost Center data to `Table` data. The cost center
 * data is driven by the table configuration, using the `OrganizationTables.COST_CENTER`.
 */
class UserGroupListService extends ListService {
    constructor(tableService, userGroupService) {
        super(tableService);
        this.tableService = tableService;
        this.userGroupService = userGroupService;
        this.tableType = OrganizationTableType.USER_GROUP;
    }
    key() {
        return 'uid';
    }
    load(pagination) {
        return this.userGroupService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertUserGroups(raw)));
    }
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertUserGroups({ pagination, sorts, values, }) {
        const userGroupModels = {
            pagination,
            sorts,
            values: values.map((value) => (Object.assign(Object.assign({}, value), { unit: value.orgUnit }))),
        };
        return userGroupModels;
    }
}
UserGroupListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupListService, deps: [{ token: i1.TableService }, { token: i2.UserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.UserGroupService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
UserGroupRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupRoutePageMetaResolver, deps: [{ token: i3.TranslationService }, { token: CurrentUserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i3.TranslationService }, { type: CurrentUserGroupService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupUserListService extends SubListService {
    constructor(tableService, userGroupService, userService) {
        super(tableService);
        this.tableService = tableService;
        this.userGroupService = userGroupService;
        this.userService = userService;
        this.tableType = OrganizationTableType.USER_GROUP_USERS;
        this._domainType = OrganizationTableType.USER;
    }
    /**
     *
     * @override
     * Loads all b2b users.
     *
     * @param code The user group code.
     */
    load(pagination, code) {
        return this.userGroupService.getAvailableOrgCustomers(code, pagination);
    }
    /**
     * @override
     * Assign user to the user group.
     */
    assign(userGroupCode, customerId) {
        this.userGroupService.assignMember(userGroupCode, customerId);
        return this.userService.getLoadingStatus(customerId);
    }
    /**
     * @override
     * Unassigns the user from the user group.
     */
    unassign(userGroupCode, customerId) {
        this.userGroupService.unassignMember(userGroupCode, customerId);
        return this.userService.getLoadingStatus(customerId);
    }
    unassignAllMembers(userGroupCode) {
        this.userGroupService.unassignAllMembers(userGroupCode);
        return this.userGroupService.getLoadingStatus(userGroupCode);
    }
}
UserGroupUserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListService, deps: [{ token: i1.TableService }, { token: i2.UserGroupService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserGroupUserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.UserGroupService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupAssignedUserListService extends UserGroupUserListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_GROUP_ASSIGNED_USERS;
    }
    /**
     * @override
     * Load all b2b users assigned to the given user group
     */
    load(pagination, code) {
        return super
            .load(pagination, code)
            .pipe(map((users) => this.filterSelected(users)));
    }
}
UserGroupAssignedUserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserGroupAssignedUserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListService, decorators: [{
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
class UserGroupAssignedUserListComponent {
}
UserGroupAssignedUserListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserGroupAssignedUserListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupAssignedUserListComponent, selector: "cx-org-user-group-assigned-user-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserGroupAssignedUserListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupAssignedUserListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-assigned-user-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserGroupAssignedUserListService,
                        },
                    ], template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupUserListComponent {
    constructor(currentUserGroupService, userGroupUserListService) {
        this.currentUserGroupService = currentUserGroupService;
        this.userGroupUserListService = userGroupUserListService;
    }
    unassignAll() {
        this.currentUserGroupService.key$
            .pipe(first(), switchMap((key) => this.userGroupUserListService.unassignAllMembers(key).pipe(take(1), filter((data) => data.status === LoadStatus.SUCCESS))))
            .subscribe((data) => {
            this.notify(data.item);
        });
    }
    notify(item) {
        this.subList.messageService.add({
            message: {
                key: `orgUserGroupUsers.unassignAllConfirmation`,
                params: {
                    item,
                },
            },
        });
    }
}
UserGroupUserListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListComponent, deps: [{ token: CurrentUserGroupService }, { token: UserGroupUserListService }], target: i0.ɵɵFactoryTarget.Component });
UserGroupUserListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupUserListComponent, selector: "cx-org-user-group-user-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserGroupUserListService,
        },
    ], viewQueries: [{ propertyName: "subList", first: true, predicate: ["subList"], descendants: true }], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\" #subList>\n  <button actions (click)=\"unassignAll()\" class=\"link\">\n    {{ 'orgUserGroupUsers.unassignAll' | cxTranslate }}\n  </button>\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-user-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserGroupUserListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\" #subList>\n  <button actions (click)=\"unassignAll()\" class=\"link\">\n    {{ 'orgUserGroupUsers.unassignAll' | cxTranslate }}\n  </button>\n  <a actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }], ctorParameters: function () { return [{ type: CurrentUserGroupService }, { type: UserGroupUserListService }]; }, propDecorators: { subList: [{
                type: ViewChild,
                args: ['subList']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const userGroupCmsConfig = {
    cmsComponents: {
        ManageUserGroupsListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: UserGroupListService,
                },
                {
                    provide: ItemService,
                    useExisting: UserGroupItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgUserGroup.breadcrumbs.list',
                            resolver: UserGroupRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: UserGroupFormComponent,
                    },
                    {
                        path: `:${ROUTE_PARAMS.userGroupCode}`,
                        component: UserGroupDetailsComponent,
                        data: {
                            cxPageMeta: { breadcrumb: 'orgUserGroup.breadcrumbs.details' },
                        },
                        children: [
                            {
                                path: 'edit',
                                component: UserGroupFormComponent,
                            },
                            {
                                path: 'users',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUserGroup.breadcrumbs.users' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserGroupAssignedUserListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserGroupUserListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'purchase-limits',
                                data: {
                                    cxPageMeta: {
                                        breadcrumb: 'orgUserGroup.breadcrumbs.permissions',
                                    },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserGroupAssignedPermissionListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserGroupPermissionListComponent,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
function userGroupTableConfigFactory() {
    return userGroupTableConfig;
}
const userGroupTableConfig = {
    table: {
        [OrganizationTableType.USER_GROUP]: {
            cells: ['name', 'uid', 'unit'],
            options: {
                dataComponent: CellComponent,
                cells: {
                    name: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    uid: {
                        dataComponent: CellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.USER_GROUP_ASSIGNED_USERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                },
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
                },
            },
        },
        [OrganizationTableType.USER_GROUP_USERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.USER_GROUP_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.USER_GROUP_ASSIGNED_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
                    },
                    actions: {
                        dataComponent: AssignCellComponent,
                    },
                },
                pagination: {
                    pageSize: MAX_OCC_INTEGER_VALUE,
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
class UserGroupUserModule {
}
UserGroupUserModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupUserModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserModule, declarations: [UserGroupAssignedUserListComponent,
        UserGroupUserListComponent], imports: [CommonModule, I18nModule, RouterModule, SubListModule] });
UserGroupUserModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserModule, imports: [CommonModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupUserModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        UserGroupAssignedUserListComponent,
                        UserGroupUserListComponent,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupComponentsModule {
}
UserGroupComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupComponentsModule, imports: [SharedOrganizationModule,
        UserGroupDetailsModule,
        UserGroupFormModule,
        UserGroupPermissionModule,
        UserGroupUserModule] });
UserGroupComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupComponentsModule, providers: [
        provideDefaultConfig(userGroupCmsConfig),
        provideDefaultConfigFactory(userGroupTableConfigFactory),
    ], imports: [SharedOrganizationModule,
        UserGroupDetailsModule,
        UserGroupFormModule,
        UserGroupPermissionModule,
        UserGroupUserModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        SharedOrganizationModule,
                        UserGroupDetailsModule,
                        UserGroupFormModule,
                        UserGroupPermissionModule,
                        UserGroupUserModule,
                    ],
                    providers: [
                        provideDefaultConfig(userGroupCmsConfig),
                        provideDefaultConfigFactory(userGroupTableConfigFactory),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserApproverListService extends SubListService {
    constructor(tableService, userService) {
        super(tableService);
        this.tableService = tableService;
        this.userService = userService;
        this.tableType = OrganizationTableType.USER_APPROVERS;
        this._domainType = OrganizationTableType.USER_GROUP;
    }
    load(pagination, code) {
        return this.userService.getApprovers(code, pagination);
    }
    /**
     * @override
     * Assign approver to the user.
     */
    assign(userCode, approverId) {
        this.userService.assignApprover(userCode, approverId);
        return this.userService.getLoadingStatus(approverId);
    }
    /**
     * @override
     * Unassign the approver from the user.
     */
    unassign(userCode, approverId) {
        this.userService.unassignApprover(userCode, approverId);
        return this.userService.getLoadingStatus(approverId);
    }
}
UserApproverListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserApproverListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserAssignedApproverListService extends UserApproverListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_ASSIGNED_APPROVERS;
    }
    load(pagination, code) {
        return super
            .load(pagination, code)
            .pipe(map((users) => this.filterSelected(users)));
    }
}
UserAssignedApproverListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedApproverListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserAssignedApproverListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedApproverListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedApproverListService, decorators: [{
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
class UserAssignedApproverListComponent {
}
UserAssignedApproverListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedApproverListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserAssignedApproverListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserAssignedApproverListComponent, selector: "cx-org-user-assigned-approver-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserAssignedApproverListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedApproverListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-assigned-approver-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserAssignedApproverListService,
                        },
                    ], template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserApproverListComponent {
}
UserApproverListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserApproverListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserApproverListComponent, selector: "cx-org-user-approver-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserApproverListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\">\n  <button actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </button>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-approver-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserApproverListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\">\n  <button actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </button>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserApproverListModule {
}
UserApproverListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserApproverListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListModule, declarations: [UserApproverListComponent, UserAssignedApproverListComponent], imports: [ListModule, I18nModule, RouterModule, SubListModule] });
UserApproverListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListModule, imports: [ListModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserApproverListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, I18nModule, RouterModule, SubListModule],
                    declarations: [UserApproverListComponent, UserAssignedApproverListComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserChangePasswordFormService extends FormService {
    /**
     * @override
     * Adds the password and confirmPassword field. Also adds the customerId field,
     * so that the customerId can be used during persistent.
     */
    build() {
        const form = new UntypedFormGroup({});
        form.setControl('customerId', new UntypedFormControl(''));
        form.setControl('password', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.passwordValidator,
        ]));
        form.setControl('confirmPassword', new UntypedFormControl('', [
            Validators.required,
            CustomFormValidators.passwordValidator,
        ]));
        form.setValidators(CustomFormValidators.passwordsMustMatch('password', 'confirmPassword'));
        this.form = form;
    }
    getForm(item) {
        // we need do cleanup, to avoid have filled form after next open of that
        this.form = null;
        return super.getForm(item);
    }
}
UserChangePasswordFormService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserChangePasswordFormService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormService, decorators: [{
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
class UserChangePasswordFormComponent {
    constructor(itemService, formService, messageService) {
        this.itemService = itemService;
        this.formService = formService;
        this.messageService = messageService;
        this.form$ = this.itemService.current$.pipe(map((item) => this.formService.getForm(item)));
    }
    save(form) {
        this.itemService.current$
            .pipe(first(), switchMap((item) => this.itemService.save(form, form.value.customerId).pipe(take(1), filter((data) => data.status === LoadStatus.SUCCESS), map((data) => (Object.assign(Object.assign({}, item), data.item))))))
            .subscribe((data) => {
            this.notify(data);
            this.itemService.launchDetails(data);
        });
    }
    notify(item) {
        this.messageService.add({
            message: {
                key: `orgUser.messages.updatePassword`,
                params: {
                    item,
                },
            },
        });
    }
}
UserChangePasswordFormComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormComponent, deps: [{ token: UserItemService }, { token: UserChangePasswordFormService }, { token: MessageService }], target: i0.ɵɵFactoryTarget.Component });
UserChangePasswordFormComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserChangePasswordFormComponent, selector: "cx-org-user-change-password-form", host: { classAttribute: "content-wrapper" }, ngImport: i0, template: "<form *ngIf=\"form$ | async as form\" [formGroup]=\"form\" (submit)=\"save(form)\">\n  <cx-org-card\n    [previous]=\"false\"\n    i18nRoot=\"orgUser.password\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <button actions class=\"button primary\">\n      {{ 'organization.save' | cxTranslate }}\n    </button>\n    <button actions class=\"link\" routerLink=\"../\" type=\"button\">\n      {{ 'organization.cancel' | cxTranslate }}\n    </button>\n\n    <section main class=\"details\">\n      <label class=\"full-width\">\n        <span class=\"label-content\">{{\n          'orgUser.password.newPassword' | cxTranslate\n        }}</span>\n        <input\n          required=\"true\"\n          class=\"form-control\"\n          type=\"password\"\n          name=\"password\"\n          placeholder=\"{{ 'orgUser.password.newPassword' | cxTranslate }}\"\n          formControlName=\"password\"\n          [attr.aria-label]=\"'orgUser.password.newPassword' | cxTranslate\"\n          cxPasswordVisibilitySwitch\n        />\n        <cx-form-errors [control]=\"form.get('password')\"></cx-form-errors>\n      </label>\n      <label>\n        <span class=\"label-content\">{{\n          'orgUser.password.confirmPassword' | cxTranslate\n        }}</span>\n        <input\n          required=\"true\"\n          class=\"form-control\"\n          type=\"password\"\n          name=\"confirmPassword\"\n          placeholder=\"{{ 'orgUser.password.confirmPassword' | cxTranslate }}\"\n          formControlName=\"confirmPassword\"\n          [attr.aria-label]=\"'orgUser.password.confirmPassword' | cxTranslate\"\n          cxPasswordVisibilitySwitch\n        />\n        <cx-form-errors\n          [control]=\"form.get('confirmPassword')\"\n        ></cx-form-errors>\n      </label>\n    </section>\n  </cx-org-card>\n</form>\n", dependencies: [{ kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i7.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i7.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i7.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i7.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i7.RequiredValidator, selector: ":not([type=checkbox])[required][formControlName],:not([type=checkbox])[required][formControl],:not([type=checkbox])[required][ngModel]", inputs: ["required"] }, { kind: "directive", type: i7.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i7.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }, { kind: "component", type: i1.FormErrorsComponent, selector: "cx-form-errors", inputs: ["prefix", "translationParams", "control"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i1.PasswordVisibilityToggleDirective, selector: "[cxPasswordVisibilitySwitch][type=\"password\"]" }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-change-password-form', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, template: "<form *ngIf=\"form$ | async as form\" [formGroup]=\"form\" (submit)=\"save(form)\">\n  <cx-org-card\n    [previous]=\"false\"\n    i18nRoot=\"orgUser.password\"\n    [cxFocus]=\"{ autofocus: 'input', refreshFocus: form }\"\n  >\n    <button actions class=\"button primary\">\n      {{ 'organization.save' | cxTranslate }}\n    </button>\n    <button actions class=\"link\" routerLink=\"../\" type=\"button\">\n      {{ 'organization.cancel' | cxTranslate }}\n    </button>\n\n    <section main class=\"details\">\n      <label class=\"full-width\">\n        <span class=\"label-content\">{{\n          'orgUser.password.newPassword' | cxTranslate\n        }}</span>\n        <input\n          required=\"true\"\n          class=\"form-control\"\n          type=\"password\"\n          name=\"password\"\n          placeholder=\"{{ 'orgUser.password.newPassword' | cxTranslate }}\"\n          formControlName=\"password\"\n          [attr.aria-label]=\"'orgUser.password.newPassword' | cxTranslate\"\n          cxPasswordVisibilitySwitch\n        />\n        <cx-form-errors [control]=\"form.get('password')\"></cx-form-errors>\n      </label>\n      <label>\n        <span class=\"label-content\">{{\n          'orgUser.password.confirmPassword' | cxTranslate\n        }}</span>\n        <input\n          required=\"true\"\n          class=\"form-control\"\n          type=\"password\"\n          name=\"confirmPassword\"\n          placeholder=\"{{ 'orgUser.password.confirmPassword' | cxTranslate }}\"\n          formControlName=\"confirmPassword\"\n          [attr.aria-label]=\"'orgUser.password.confirmPassword' | cxTranslate\"\n          cxPasswordVisibilitySwitch\n        />\n        <cx-form-errors\n          [control]=\"form.get('confirmPassword')\"\n        ></cx-form-errors>\n      </label>\n    </section>\n  </cx-org-card>\n</form>\n" }]
        }], ctorParameters: function () { return [{ type: UserItemService }, { type: UserChangePasswordFormService }, { type: MessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserChangePasswordFormModule {
}
UserChangePasswordFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserChangePasswordFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormModule, declarations: [UserChangePasswordFormComponent], imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        CardModule,
        KeyboardFocusModule,
        PasswordVisibilityToggleModule] });
UserChangePasswordFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormModule, imports: [CommonModule,
        RouterModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        CardModule,
        KeyboardFocusModule,
        PasswordVisibilityToggleModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserChangePasswordFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        CardModule,
                        KeyboardFocusModule,
                        PasswordVisibilityToggleModule,
                    ],
                    declarations: [UserChangePasswordFormComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserDetailsComponent {
    constructor(itemService, b2bUserService) {
        this.itemService = itemService;
        this.b2bUserService = b2bUserService;
        this.model$ = this.itemService.key$.pipe(switchMap((code) => this.itemService.load(code)), startWith({}));
        this.isInEditMode$ = this.itemService.isInEditMode$;
        this.isUpdatingUserAllowed = this.b2bUserService.isUpdatingUserAllowed();
        this.availableRoles = this.b2bUserService
            .getAllRoles()
            .map((role) => role.toString());
        this.availableRights = this.b2bUserService
            .getAllRights()
            .map((right) => right.toString());
    }
    hasRight(model) {
        var _a;
        return ((_a = model.roles) !== null && _a !== void 0 ? _a : []).some((role) => this.availableRights.includes(role));
    }
}
UserDetailsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsComponent, deps: [{ token: ItemService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Component });
UserDetailsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserDetailsComponent, selector: "cx-org-user-details", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ItemService,
            useExisting: UserItemService,
        },
    ], ngImport: i0, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgUser.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    *ngIf=\"isUpdatingUserAllowed\"\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgUserEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status\n    actions\n    *ngIf=\"isUpdatingUserAllowed\"\n    key=\"customerId\"\n    i18nRoot=\"orgUser\"\n  ></cx-org-toggle-status>\n\n  <cx-org-disable-info info i18nRoot=\"orgUser\"> </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgUser.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property full-width\">\n      <label>{{ 'orgUser.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        <ng-container *cxFeatureLevel=\"'6.7'\">\n          {{ model.displayUid }}\n        </ng-container>\n        <ng-container *cxFeatureLevel=\"'!6.7'\">\n          {{ model.uid }}\n        </ng-container>\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUser.roles' | cxTranslate }}</label>\n      <ul class=\"value\">\n        <ng-container *ngFor=\"let role of model.roles\">\n          <li\n            *ngIf=\"availableRoles.includes(role)\"\n            [innerText]=\"'organization.userRoles.' + role | cxTranslate\"\n          ></li>\n        </ng-container>\n        <li *ngIf=\"model.roles?.length === 0\">-</li>\n      </ul>\n    </div>\n\n    <ng-container *ngIf=\"hasRight(model)\">\n      <div class=\"property\">\n        <label>{{ 'orgUser.rights' | cxTranslate }}</label>\n        <ul class=\"value\">\n          <ng-container *ngFor=\"let role of model.roles\">\n            <li\n              *ngIf=\"availableRights.includes(role)\"\n              [innerText]=\"'organization.userRights.' + role | cxTranslate\"\n            ></li>\n          </ng-container>\n          <li *ngIf=\"model.roles?.length === 0\">-</li>\n        </ul>\n      </div>\n    </ng-container>\n\n    <div class=\"property\">\n      <label>{{ 'orgUser.orgUnit' | cxTranslate }}</label>\n      <a\n        *ngIf=\"isUpdatingUserAllowed; else showOrgUnitValueWithoutNavigation\"\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n      <ng-template #showOrgUnitValueWithoutNavigation>\n        <div class=\"orgUnit\">{{ model.orgUnit?.name }}</div>\n      </ng-template>\n    </div>\n    <div class=\"property full-width\">\n      <a\n        *ngIf=\"model.customerId && isUpdatingUserAllowed\"\n        class=\"link\"\n        [class.disabled]=\"!model.active\"\n        [routerLink]=\"\n          { cxRoute: 'orgUserChangePassword', params: model } | cxUrl\n        \"\n      >\n        {{ 'orgUser.links.password' | cxTranslate }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <ng-container *ngIf=\"model.customerId\">\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUserApprovers', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUser.links.approvers' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUserUserGroups', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUser.links.userGroup' | cxTranslate }}\n      </a>\n\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUserPermissions', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUser.links.permission' | cxTranslate }}\n      </a>\n    </ng-container>\n  </section>\n</cx-org-card>\n", dependencies: [{ kind: "directive", type: i3$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: CardComponent, selector: "cx-org-card", inputs: ["i18nRoot", "previous", "subtitle", "showHint"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "directive", type: i4.RouterLinkActive, selector: "[routerLinkActive]", inputs: ["routerLinkActiveOptions", "ariaCurrentWhenActive", "routerLinkActive"], outputs: ["isActiveChange"], exportAs: ["routerLinkActive"] }, { kind: "component", type: ToggleStatusComponent, selector: "cx-org-toggle-status", inputs: ["i18nRoot", "key", "disabled"] }, { kind: "directive", type: ItemExistsDirective, selector: "[cxOrgItemExists]" }, { kind: "component", type: DisableInfoComponent, selector: "cx-org-disable-info", inputs: ["i18nRoot", "displayInfoConfig", "displayCustomInfo"] }, { kind: "directive", type: i1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "directive", type: i3.FeatureLevelDirective, selector: "[cxFeatureLevel]", inputs: ["cxFeatureLevel"] }, { kind: "pipe", type: i3$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-details', changeDetection: ChangeDetectionStrategy.OnPush, providers: [
                        {
                            provide: ItemService,
                            useExisting: UserItemService,
                        },
                    ], host: { class: 'content-wrapper' }, template: "<cx-org-card\n  *ngIf=\"model$ | async as model\"\n  i18nRoot=\"orgUser.details\"\n  [cxFocus]=\"{ refreshFocus: model }\"\n>\n  <a\n    actions\n    *ngIf=\"isUpdatingUserAllowed\"\n    class=\"link edit\"\n    [class.disabled]=\"!model.active || (isInEditMode$ | async)\"\n    [routerLink]=\"{ cxRoute: 'orgUserEdit', params: model } | cxUrl\"\n  >\n    {{ 'organization.edit' | cxTranslate }}\n  </a>\n\n  <cx-org-toggle-status\n    actions\n    *ngIf=\"isUpdatingUserAllowed\"\n    key=\"customerId\"\n    i18nRoot=\"orgUser\"\n  ></cx-org-toggle-status>\n\n  <cx-org-disable-info info i18nRoot=\"orgUser\"> </cx-org-disable-info>\n\n  <section main class=\"details\" cxOrgItemExists>\n    <div class=\"property\">\n      <label>{{ 'orgUser.name' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.name }}\n      </span>\n    </div>\n\n    <div class=\"property full-width\">\n      <label>{{ 'orgUser.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        <ng-container *cxFeatureLevel=\"'6.7'\">\n          {{ model.displayUid }}\n        </ng-container>\n        <ng-container *cxFeatureLevel=\"'!6.7'\">\n          {{ model.uid }}\n        </ng-container>\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUser.roles' | cxTranslate }}</label>\n      <ul class=\"value\">\n        <ng-container *ngFor=\"let role of model.roles\">\n          <li\n            *ngIf=\"availableRoles.includes(role)\"\n            [innerText]=\"'organization.userRoles.' + role | cxTranslate\"\n          ></li>\n        </ng-container>\n        <li *ngIf=\"model.roles?.length === 0\">-</li>\n      </ul>\n    </div>\n\n    <ng-container *ngIf=\"hasRight(model)\">\n      <div class=\"property\">\n        <label>{{ 'orgUser.rights' | cxTranslate }}</label>\n        <ul class=\"value\">\n          <ng-container *ngFor=\"let role of model.roles\">\n            <li\n              *ngIf=\"availableRights.includes(role)\"\n              [innerText]=\"'organization.userRights.' + role | cxTranslate\"\n            ></li>\n          </ng-container>\n          <li *ngIf=\"model.roles?.length === 0\">-</li>\n        </ul>\n      </div>\n    </ng-container>\n\n    <div class=\"property\">\n      <label>{{ 'orgUser.orgUnit' | cxTranslate }}</label>\n      <a\n        *ngIf=\"isUpdatingUserAllowed; else showOrgUnitValueWithoutNavigation\"\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n      <ng-template #showOrgUnitValueWithoutNavigation>\n        <div class=\"orgUnit\">{{ model.orgUnit?.name }}</div>\n      </ng-template>\n    </div>\n    <div class=\"property full-width\">\n      <a\n        *ngIf=\"model.customerId && isUpdatingUserAllowed\"\n        class=\"link\"\n        [class.disabled]=\"!model.active\"\n        [routerLink]=\"\n          { cxRoute: 'orgUserChangePassword', params: model } | cxUrl\n        \"\n      >\n        {{ 'orgUser.links.password' | cxTranslate }}\n      </a>\n    </div>\n  </section>\n\n  <section main class=\"link-list\">\n    <ng-container *ngIf=\"model.customerId\">\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUserApprovers', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUser.links.approvers' | cxTranslate }}\n      </a>\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUserUserGroups', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUser.links.userGroup' | cxTranslate }}\n      </a>\n\n      <a\n        class=\"link\"\n        [routerLink]=\"{ cxRoute: 'orgUserPermissions', params: model } | cxUrl\"\n        routerLinkActive=\"is-current\"\n      >\n        {{ 'orgUser.links.permission' | cxTranslate }}\n      </a>\n    </ng-container>\n  </section>\n</cx-org-card>\n" }]
        }], ctorParameters: function () { return [{ type: ItemService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserDetailsModule {
}
UserDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsModule, declarations: [UserDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule,
        FeaturesConfigModule], exports: [UserDetailsComponent] });
UserDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule,
        FeaturesConfigModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ToggleStatusModule,
                        ItemExistsModule,
                        DisableInfoModule,
                        KeyboardFocusModule,
                        FeaturesConfigModule,
                    ],
                    declarations: [UserDetailsComponent],
                    exports: [UserDetailsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserPermissionListService extends SubListService {
    constructor(tableService, userService, permissionService) {
        super(tableService);
        this.tableService = tableService;
        this.userService = userService;
        this.permissionService = permissionService;
        this.tableType = OrganizationTableType.USER_PERMISSIONS;
        this._domainType = OrganizationTableType.PERMISSION;
    }
    load(pagination, code) {
        return this.userService.getPermissions(code, pagination);
    }
    /**
     * @override
     * Assign permission to the user.
     */
    assign(userCode, code) {
        this.userService.assignPermission(userCode, code);
        return this.permissionService.getLoadingStatus(code);
    }
    /**
     * @override
     * Unassign the permission from the user.
     */
    unassign(userCode, code) {
        this.userService.unassignPermission(userCode, code);
        return this.permissionService.getLoadingStatus(code);
    }
}
UserPermissionListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }, { token: i2.PermissionService }], target: i0.ɵɵFactoryTarget.Injectable });
UserPermissionListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }, { type: i2.PermissionService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserAssignedPermissionListService extends UserPermissionListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_ASSIGNED_PERMISSIONS;
    }
    load(pagination, code) {
        return super
            .load(pagination, code)
            .pipe(map((result) => this.filterSelected(result)));
    }
}
UserAssignedPermissionListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserAssignedPermissionListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListService, decorators: [{
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
class UserAssignedPermissionListComponent {
}
UserAssignedPermissionListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserAssignedPermissionListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserAssignedPermissionListComponent, selector: "cx-org-user-assigned-permission-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserAssignedPermissionListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedPermissionListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-assigned-permission-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserAssignedPermissionListService,
                        },
                    ], template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserPermissionListComponent {
}
UserPermissionListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserPermissionListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserPermissionListComponent, selector: "cx-org-user-permission-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserPermissionListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\">\n  <button actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </button>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-permission-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserPermissionListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\">\n  <button actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </button>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserPermissionListModule {
}
UserPermissionListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserPermissionListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListModule, declarations: [UserPermissionListComponent,
        UserAssignedPermissionListComponent], imports: [ListModule, I18nModule, RouterModule, SubListModule] });
UserPermissionListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListModule, imports: [ListModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserPermissionListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        UserPermissionListComponent,
                        UserAssignedPermissionListComponent,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserUserGroupListService extends SubListService {
    constructor(tableService, userService, userGroupService) {
        super(tableService);
        this.tableService = tableService;
        this.userService = userService;
        this.userGroupService = userGroupService;
        this.tableType = OrganizationTableType.USER_USER_GROUPS;
        this._domainType = OrganizationTableType.USER_GROUP;
    }
    load(pagination, code) {
        return this.userService.getUserGroups(code, pagination);
    }
    /**
     * @override
     * Assign user group to the user.
     */
    assign(userCode, userGroupCode) {
        this.userService.assignUserGroup(userCode, userGroupCode);
        return this.userGroupService.getLoadingStatus(userGroupCode);
    }
    /**
     * @override
     * Unassign the user group from the user.
     */
    unassign(userCode, userGroupCode) {
        this.userService.unassignUserGroup(userCode, userGroupCode);
        return this.userGroupService.getLoadingStatus(userGroupCode);
    }
}
UserUserGroupListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }, { token: i2.UserGroupService }], target: i0.ɵɵFactoryTarget.Injectable });
UserUserGroupListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }, { type: i2.UserGroupService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserAssignedUserGroupListService extends UserUserGroupListService {
    constructor() {
        super(...arguments);
        this.tableType = OrganizationTableType.USER_ASSIGNED_USER_GROUPS;
    }
    load(pagination, code) {
        return super.load(pagination, code).pipe(filter((list) => Boolean(list)), map((userGroups) => this.filterSelected(userGroups)));
    }
}
UserAssignedUserGroupListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedUserGroupListService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
UserAssignedUserGroupListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedUserGroupListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedUserGroupListService, decorators: [{
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
class UserAssignedUserGroupListComponent {
}
UserAssignedUserGroupListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedUserGroupListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserAssignedUserGroupListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserAssignedUserGroupListComponent, selector: "cx-org-user-assigned-user-group-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserAssignedUserGroupListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserAssignedUserGroupListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-assigned-user-group-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserAssignedUserGroupListService,
                        },
                    ], template: "<cx-org-sub-list>\n  <a actions class=\"link\" routerLink=\"assign\">\n    {{ 'organization.assign' | cxTranslate }}\n  </a>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserUserGroupListComponent {
}
UserUserGroupListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
UserUserGroupListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserUserGroupListComponent, selector: "cx-org-user-user-group-list", host: { classAttribute: "content-wrapper" }, providers: [
        {
            provide: ListService,
            useExisting: UserUserGroupListService,
        },
    ], ngImport: i0, template: "<cx-org-sub-list [previous]=\"false\">\n  <button actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </button>\n</cx-org-sub-list>\n", dependencies: [{ kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: SubListComponent, selector: "cx-org-sub-list", inputs: ["previous", "key", "showHint", "routerKey"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-user-group-list', changeDetection: ChangeDetectionStrategy.OnPush, host: { class: 'content-wrapper' }, providers: [
                        {
                            provide: ListService,
                            useExisting: UserUserGroupListService,
                        },
                    ], template: "<cx-org-sub-list [previous]=\"false\">\n  <button actions class=\"link\" routerLink=\"../\">\n    {{ 'organization.done' | cxTranslate }}\n  </button>\n</cx-org-sub-list>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserUserGroupsModule {
}
UserUserGroupsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserUserGroupsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupsModule, declarations: [UserUserGroupListComponent,
        UserAssignedUserGroupListComponent], imports: [ListModule, I18nModule, RouterModule, SubListModule] });
UserUserGroupsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupsModule, imports: [ListModule, I18nModule, RouterModule, SubListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserUserGroupsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ListModule, I18nModule, RouterModule, SubListModule],
                    declarations: [
                        UserUserGroupListComponent,
                        UserAssignedUserGroupListComponent,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserGroupDetailsCellComponent extends CellComponent {
}
UserGroupDetailsCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
UserGroupDetailsCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: UserGroupDetailsCellComponent, selector: "cx-org-user-group-details-cell", usesInheritance: true, ngImport: i0, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.name' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUserGroupDetails',\n            params: model\n          } | cxUrl\n        \"\n        >{{ model.name }}</a\n      >\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.uid }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.orgUnit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model?.name }}\n</button>\n", dependencies: [{ kind: "directive", type: i1.PopoverDirective, selector: "[cxPopover]", inputs: ["cxPopover", "cxPopoverOptions"], outputs: ["openPopover", "closePopover"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-org-user-group-details-cell', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template #details>\n  <div class=\"popover-details\">\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.name' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUserGroupDetails',\n            params: model\n          } | cxUrl\n        \"\n        >{{ model.name }}</a\n      >\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.uid' | cxTranslate }}</label>\n      <span class=\"value\">\n        {{ model.uid }}\n      </span>\n    </div>\n\n    <div class=\"property\">\n      <label>{{ 'orgUserGroup.orgUnit' | cxTranslate }}</label>\n      <a\n        class=\"value\"\n        [routerLink]=\"\n          {\n            cxRoute: 'orgUnitDetails',\n            params: model.orgUnit\n          } | cxUrl\n        \"\n      >\n        {{ model.orgUnit?.name }}\n      </a>\n    </div>\n  </div>\n</ng-template>\n\n<button\n  class=\"button text\"\n  [cxPopover]=\"details\"\n  [cxPopoverOptions]=\"{\n    placement: 'auto',\n    class: 'my-company-popover',\n    appendToBody: true,\n    displayCloseButton: true\n  }\"\n>\n  {{ model?.name }}\n</button>\n" }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Service to populate User data to `Table` data. The user
 * data is driven by the table configuration, using the `OrganizationTables.USER`.
 */
class UserListService extends ListService {
    constructor(tableService, userService) {
        super(tableService);
        this.tableService = tableService;
        this.userService = userService;
        this.tableType = OrganizationTableType.USER;
    }
    key() {
        return 'customerId';
    }
    load(pagination) {
        return this.userService.getList(pagination).pipe(filter(isNotUndefined), map((raw) => this.convertUsers(raw)));
    }
    /**
     * Populates the cost center data to a convenient table data model, so that we
     * can skip specific conversion in the view logic where possible.
     */
    convertUsers({ pagination, sorts, values, }) {
        const availableRoles = this.userService.getAllRoles();
        const userModels = {
            pagination,
            sorts,
            values: values.map((value) => {
                var _a;
                return (Object.assign(Object.assign({}, value), { unit: value.orgUnit, roles: (_a = value.roles) === null || _a === void 0 ? void 0 : _a.filter((role) => availableRoles.includes(role)) }));
            }),
        };
        return userModels;
    }
}
UserListService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserListService, deps: [{ token: i1.TableService }, { token: i2.B2BUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserListService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserListService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserListService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.TableService }, { type: i2.B2BUserService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserRoutePageMetaResolver extends DefaultRoutePageMetaResolver {
    constructor(translation, currentItemService) {
        super(translation);
        this.currentItemService = currentItemService;
    }
    getParams() {
        return this.currentItemService.item$;
    }
}
UserRoutePageMetaResolver.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRoutePageMetaResolver, deps: [{ token: i3.TranslationService }, { token: CurrentUserService }], target: i0.ɵɵFactoryTarget.Injectable });
UserRoutePageMetaResolver.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRoutePageMetaResolver, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserRoutePageMetaResolver, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i3.TranslationService }, { type: CurrentUserService }]; } });

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
const userCmsConfig = {
    cmsComponents: {
        ManageUsersListComponent: {
            component: ListComponent,
            providers: [
                {
                    provide: ListService,
                    useExisting: UserListService,
                },
                {
                    provide: ItemService,
                    useExisting: UserItemService,
                },
            ],
            childRoutes: {
                parent: {
                    data: {
                        cxPageMeta: {
                            breadcrumb: 'orgUser.breadcrumbs.list',
                            resolver: UserRoutePageMetaResolver,
                        },
                    },
                },
                children: [
                    {
                        path: 'create',
                        component: UserFormComponent,
                        canActivate: [UserGuard],
                    },
                    {
                        path: `:${ROUTE_PARAMS.userCode}`,
                        component: UserDetailsComponent,
                        data: {
                            cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.details' },
                        },
                        children: [
                            {
                                path: `edit`,
                                component: UserFormComponent,
                                canActivate: [UserGuard],
                            },
                            {
                                path: `change-password`,
                                component: UserChangePasswordFormComponent,
                                canActivate: [UserGuard],
                            },
                            {
                                path: 'user-groups',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.userGroups' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserAssignedUserGroupListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserUserGroupListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'approvers',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.approvers' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserAssignedApproverListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserApproverListComponent,
                                    },
                                ],
                            },
                            {
                                path: 'purchase-limits',
                                data: {
                                    cxPageMeta: { breadcrumb: 'orgUser.breadcrumbs.permissions' },
                                },
                                children: [
                                    {
                                        path: '',
                                        component: UserAssignedPermissionListComponent,
                                    },
                                    {
                                        path: 'assign',
                                        component: UserPermissionListComponent,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            guards: [AuthGuard, AdminGuard],
        },
    },
};
function userTableConfigFactory() {
    return userTableConfig;
}
const actions = {
    dataComponent: AssignCellComponent,
};
const pagination = {
    pageSize: MAX_OCC_INTEGER_VALUE,
};
const userTableConfig = {
    table: {
        [OrganizationTableType.USER]: {
            cells: ['name', 'active', 'uid', 'roles', 'unit'],
            options: {
                cells: {
                    name: {
                        dataComponent: ActiveLinkCellComponent,
                    },
                    active: {
                        dataComponent: StatusCellComponent,
                    },
                    uid: {
                        dataComponent: CellComponent,
                    },
                    roles: {
                        dataComponent: RolesCellComponent,
                    },
                    unit: {
                        dataComponent: UnitCellComponent,
                    },
                },
            },
        },
        [OrganizationTableType.USER_APPROVERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions,
                },
            },
        },
        [OrganizationTableType.USER_ASSIGNED_APPROVERS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserDetailsCellComponent,
                    },
                    actions,
                },
                pagination,
            },
        },
        [OrganizationTableType.USER_USER_GROUPS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserGroupDetailsCellComponent,
                    },
                    actions,
                },
            },
        },
        [OrganizationTableType.USER_ASSIGNED_USER_GROUPS]: {
            cells: ['name', 'actions'],
            options: {
                cells: {
                    name: {
                        dataComponent: UserGroupDetailsCellComponent,
                    },
                    actions,
                },
                pagination,
            },
        },
        [OrganizationTableType.USER_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
                    },
                    actions,
                },
            },
        },
        [OrganizationTableType.USER_ASSIGNED_PERMISSIONS]: {
            cells: ['code', 'actions'],
            options: {
                cells: {
                    code: {
                        dataComponent: PermissionDetailsCellComponent,
                    },
                    actions,
                },
                pagination,
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class UserComponentsModule {
}
UserComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserComponentsModule, imports: [ListModule,
        UserChangePasswordFormModule,
        UserDetailsModule,
        UserFormModule,
        UserPermissionListModule,
        UserUserGroupsModule,
        UserApproverListModule] });
UserComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserComponentsModule, providers: [
        provideDefaultConfig(userCmsConfig),
        provideDefaultConfigFactory(userTableConfigFactory),
    ], imports: [ListModule,
        UserChangePasswordFormModule,
        UserDetailsModule,
        UserFormModule,
        UserPermissionListModule,
        UserUserGroupsModule,
        UserApproverListModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        ListModule,
                        UserChangePasswordFormModule,
                        UserDetailsModule,
                        UserFormModule,
                        UserPermissionListModule,
                        UserUserGroupsModule,
                        UserApproverListModule,
                    ],
                    providers: [
                        provideDefaultConfig(userCmsConfig),
                        provideDefaultConfigFactory(userTableConfigFactory),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AdministrationComponentsModule {
}
AdministrationComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AdministrationComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AdministrationComponentsModule, imports: [BudgetComponentsModule,
        CostCenterComponentsModule,
        UnitsComponentsModule,
        UserGroupComponentsModule,
        UserComponentsModule,
        PermissionComponentsModule] });
AdministrationComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationComponentsModule, imports: [BudgetComponentsModule,
        CostCenterComponentsModule,
        UnitsComponentsModule,
        UserGroupComponentsModule,
        UserComponentsModule,
        PermissionComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AdministrationComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BudgetComponentsModule,
                        CostCenterComponentsModule,
                        UnitsComponentsModule,
                        UserGroupComponentsModule,
                        UserComponentsModule,
                        PermissionComponentsModule,
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
class CostCenterDetailsCellModule {
}
CostCenterDetailsCellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsCellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CostCenterDetailsCellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsCellModule, declarations: [CostCenterDetailsCellComponent], imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule], exports: [CostCenterDetailsCellComponent] });
CostCenterDetailsCellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsCellModule, imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CostCenterDetailsCellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
                    declarations: [CostCenterDetailsCellComponent],
                    exports: [CostCenterDetailsCellComponent],
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
class PermissionDetailsCellModule {
}
PermissionDetailsCellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsCellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PermissionDetailsCellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsCellModule, declarations: [PermissionDetailsCellComponent], imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule], exports: [PermissionDetailsCellComponent] });
PermissionDetailsCellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsCellModule, imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PermissionDetailsCellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
                    declarations: [PermissionDetailsCellComponent],
                    exports: [PermissionDetailsCellComponent],
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
class UnitDetailsCellModule {
}
UnitDetailsCellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsCellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitDetailsCellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsCellModule, declarations: [UnitDetailsCellComponent], imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule], exports: [UnitDetailsCellComponent] });
UnitDetailsCellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsCellModule, imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitDetailsCellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
                    declarations: [UnitDetailsCellComponent],
                    exports: [UnitDetailsCellComponent],
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
class UserGroupDetailsCellModule {
}
UserGroupDetailsCellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserGroupDetailsCellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellModule, declarations: [UserGroupDetailsCellComponent], imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule], exports: [UserGroupDetailsCellComponent] });
UserGroupDetailsCellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellModule, imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserGroupDetailsCellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
                    declarations: [UserGroupDetailsCellComponent],
                    exports: [UserGroupDetailsCellComponent],
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
class UserDetailsCellModule {
}
UserDetailsCellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsCellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UserDetailsCellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsCellModule, declarations: [UserDetailsCellComponent], imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule], exports: [UserDetailsCellComponent] });
UserDetailsCellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsCellModule, imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserDetailsCellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
                    declarations: [UserDetailsCellComponent],
                    exports: [UserDetailsCellComponent],
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
/** AUGMENTABLE_TYPES_END */

/**
 * Generated bundle index. Do not edit.
 */

export { ActiveLinkCellComponent, AdministrationComponentsModule, AmountCellComponent, AssignCellComponent, BaseMessageComponent, BudgetComponentsModule, BudgetCostCenterListComponent, BudgetCostCenterListModule, BudgetCostCenterListService, BudgetDetailsCellComponent, BudgetDetailsCellModule, BudgetDetailsComponent, BudgetDetailsModule, BudgetFormComponent, BudgetFormModule, BudgetFormService, BudgetItemService, BudgetListService, CardComponent, CardModule, CellComponent, CellModule, ConfirmationMessageComponent, ConfirmationMessageModule, CostCenterAssignedBudgetListComponent, CostCenterAssignedBudgetListService, CostCenterBudgetListComponent, CostCenterBudgetListModule, CostCenterBudgetListService, CostCenterComponentsModule, CostCenterDetailsCellComponent, CostCenterDetailsCellModule, CostCenterDetailsComponent, CostCenterDetailsModule, CostCenterFormComponent, CostCenterFormModule, CostCenterFormService, CostCenterListService, CreateButtonType, CurrentBudgetService, CurrentCostCenterService, CurrentItemService, CurrentPermissionService, CurrentUnitAddressService, CurrentUnitChildService, CurrentUnitService, CurrentUnitUserService, CurrentUserGroupService, CurrentUserService, DateRangeCellComponent, DeleteItemComponent, DeleteItemModule, DisableInfoComponent, DisableInfoModule, DisableInfoService, FormComponent, FormModule, FormService, ItemActiveDirective, ItemExistsDirective, ItemService, LimitCellComponent, LinkCellComponent, ListComponent, ListModule, ListService, MessageComponent, MessageData, MessageModule, MessageRenderService, MessageService, NotificationMessageComponent, NotificationMessageModule, OrganizationTableType, PermissionComponentsModule, PermissionDetailsCellComponent, PermissionDetailsCellModule, PermissionDetailsComponent, PermissionDetailsModule, PermissionFormComponent, PermissionFormModule, PermissionFormService, PermissionItemService, PermissionListService, PermissionType, RolesCellComponent, SharedOrganizationModule, StatusCellComponent, SubListComponent, SubListModule, SubListService, ToggleLinkCellComponent, ToggleStatusComponent, ToggleStatusModule, UnitAddressDetailsComponent, UnitAddressDetailsModule, UnitAddressFormComponent, UnitAddressFormModule, UnitAddressFormService, UnitAddressItemService, UnitAddressListComponent, UnitAddressListModule, UnitAddressListService, UnitAddressModule, UnitApproverListComponent, UnitApproverListModule, UnitApproverListService, UnitAssignedApproverListComponent, UnitAssignedApproverListService, UnitCellComponent, UnitChildCreateComponent, UnitChildCreateModule, UnitChildItemService, UnitChildrenComponent, UnitChildrenModule, UnitChildrenService, UnitCostCenterCreateComponent, UnitCostCenterCreateModule, UnitCostCenterItemService, UnitCostCenterListComponent, UnitCostCenterListModule, UnitCostCenterListService, UnitDetailsCellComponent, UnitDetailsCellModule, UnitDetailsComponent, UnitDetailsModule, UnitFormComponent, UnitFormModule, UnitFormService, UnitItemService, UnitListComponent, UnitListModule, UnitListService, UnitTreeService, UnitUserCreateComponent, UnitUserCreateModule, UnitUserListComponent, UnitUserListModule, UnitUserListService, UnitUserRolesCellComponent, UnitUserRolesFormComponent, UnitUserRolesFormService, UnitUserRolesItemService, UnitUserRolesModule, UnitUsersModule, UnitsComponentsModule, UserApproverListComponent, UserApproverListModule, UserApproverListService, UserAssignedApproverListComponent, UserAssignedApproverListService, UserAssignedPermissionListComponent, UserAssignedPermissionListService, UserAssignedUserGroupListComponent, UserAssignedUserGroupListService, UserChangePasswordFormComponent, UserChangePasswordFormModule, UserChangePasswordFormService, UserComponentsModule, UserDetailsCellComponent, UserDetailsCellModule, UserDetailsComponent, UserDetailsModule, UserFormComponent, UserFormModule, UserFormService, UserGroupAssignedPermissionListComponent, UserGroupAssignedPermissionsListService, UserGroupAssignedUserListComponent, UserGroupAssignedUserListService, UserGroupComponentsModule, UserGroupDetailsCellComponent, UserGroupDetailsCellModule, UserGroupDetailsComponent, UserGroupDetailsModule, UserGroupFormComponent, UserGroupFormModule, UserGroupFormService, UserGroupItemService, UserGroupListService, UserGroupPermissionListComponent, UserGroupPermissionListService, UserGroupPermissionModule, UserGroupUserListComponent, UserGroupUserListService, UserGroupUserModule, UserItemService, UserListService, UserPermissionListComponent, UserPermissionListModule, UserPermissionListService, UserUserGroupListComponent, UserUserGroupListService, UserUserGroupsModule, budgetCmsConfig, budgetTableConfig, budgetTableConfigFactory, costCenterCmsConfig, costCenterTableConfig, costCenterTableConfigFactory, permissionCmsConfig, permissionTableConfig, permissionTableConfigFactory, unitsCmsConfig, unitsTableConfig, unitsTableConfigFactory, userCmsConfig, userGroupCmsConfig, userGroupTableConfig, userGroupTableConfigFactory, userTableConfig, userTableConfigFactory };
//# sourceMappingURL=spartacus-organization-administration-components.mjs.map
