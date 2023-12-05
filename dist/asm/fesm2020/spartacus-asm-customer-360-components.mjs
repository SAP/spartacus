import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { Injectable, EventEmitter, Component, Input, Output, ChangeDetectionStrategy, HostBinding, ViewChildren, NgModule, ViewChild } from '@angular/core';
import * as i8 from '@spartacus/asm/core';
import { SortOrder, itemsWith, property, byNullish, whenType, isString, byString, isNumber, byComparison, isBoolean, byBoolean, ArgsModule } from '@spartacus/asm/core';
import * as i3$2 from '@spartacus/core';
import { Config, GlobalMessageType, isNotUndefined, I18nModule, CxDatePipe, provideDefaultConfig } from '@spartacus/core';
import * as i3$1 from '@spartacus/storefront';
import { ICON_TYPE, DirectionMode, MediaModule, BREAKPOINT, StarRatingModule, CardModule, MessageComponentModule, IconModule, SearchBoxModule, DIALOG_TYPE, KeyboardFocusModule, PageComponentModule } from '@spartacus/storefront';
import { getAsmDialogActionEvent } from '@spartacus/asm/customer-360/core';
import * as i2 from '@spartacus/asm/customer-360/root';
import { AsmCustomer360Type, KeyBoardEventCode, AsmDialogActionType, PaymentCardCode } from '@spartacus/asm/customer-360/root';
import { ReplaySubject, Subject, Subscription, BehaviorSubject, of, forkJoin, combineLatest } from 'rxjs';
import { map, catchError, distinctUntilChanged, filter, concatMap, take } from 'rxjs/operators';
import * as i4 from '@spartacus/asm/root';
import * as i2$1 from '@spartacus/storefinder/core';
import * as i2$2 from '@spartacus/cart/base/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360Config {
}
AsmCustomer360Config.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Config, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360Config.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Config, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Config, decorators: [{
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
class AsmCustomer360SectionContext {
}
AsmCustomer360SectionContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionContext, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360SectionContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionContext });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionContext, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360SectionContextSource extends AsmCustomer360SectionContext {
    constructor() {
        super(...arguments);
        this.customer$ = new ReplaySubject(1);
        this.config$ = new ReplaySubject(1);
        this.navigate$ = new Subject();
        this.data$ = new ReplaySubject(1);
        this.savedCarts$ = new ReplaySubject(1);
        this.activeCart$ = new ReplaySubject(1);
        this.orderHistory$ = new ReplaySubject(1);
    }
}
AsmCustomer360SectionContextSource.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionContextSource, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360SectionContextSource.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionContextSource });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionContextSource, decorators: [{
            type: Injectable
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360SectionComponent {
    set customer(customer) {
        this.source.customer$.next(customer);
    }
    set config(config) {
        this.source.config$.next(config);
    }
    set data(data) {
        this.source.data$.next(data);
    }
    constructor(source) {
        this.source = source;
        this.navigate = new EventEmitter();
        this.subscription = new Subscription();
        this.subscription.add(source.navigate$.subscribe((urlCommand) => this.navigate.emit(urlCommand)));
        this.subscription.add(() => {
            this.source.config$.complete();
            this.source.customer$.complete();
            this.source.data$.complete();
            this.source.navigate$.complete();
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmCustomer360SectionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionComponent, deps: [{ token: AsmCustomer360SectionContextSource }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360SectionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360SectionComponent, selector: "cx-asm-customer-360-section", inputs: { component: "component", customer: "customer", config: "config", data: "data" }, outputs: { navigate: "navigate" }, providers: [
        AsmCustomer360SectionContextSource,
        {
            provide: AsmCustomer360SectionContext,
            useExisting: AsmCustomer360SectionContextSource,
        },
    ], ngImport: i0, template: "<ng-container *ngComponentOutlet=\"component\"></ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SectionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-customer-360-section', providers: [
                        AsmCustomer360SectionContextSource,
                        {
                            provide: AsmCustomer360SectionContext,
                            useExisting: AsmCustomer360SectionContextSource,
                        },
                    ], template: "<ng-container *ngComponentOutlet=\"component\"></ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContextSource }]; }, propDecorators: { component: [{
                type: Input
            }], customer: [{
                type: Input
            }], config: [{
                type: Input
            }], data: [{
                type: Input
            }], navigate: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360Component {
    constructor(asmCustomer360Config, asmCustomer360Facade, launchDialogService, csAgentAuthService, directionService) {
        this.asmCustomer360Config = asmCustomer360Config;
        this.asmCustomer360Facade = asmCustomer360Facade;
        this.launchDialogService = launchDialogService;
        this.csAgentAuthService = csAgentAuthService;
        this.directionService = directionService;
        this.role = 'dialog';
        this.modal = true;
        this.labelledby = 'asm-customer-360-title';
        this.describedby = 'asm-customer-360-desc';
        this.cartIcon = ICON_TYPE.CART;
        this.closeIcon = ICON_TYPE.CLOSE;
        this.orderIcon = ICON_TYPE.ORDER;
        this.ticketIcon = ICON_TYPE.FILE;
        this.globalMessageType = GlobalMessageType;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: '.close',
            focusOnEscape: true,
        };
        this.activeTab = 0;
        this.subscription = new Subscription();
        this.showErrorAlert$ = new BehaviorSubject(false);
        this.showErrorTab$ = new BehaviorSubject(false);
        this.errorAlert$ = this.showErrorAlert$.asObservable();
        this.errorTab$ = this.showErrorTab$.asObservable();
        this.customerOverview$ = this.asmCustomer360Facade
            .get360Data([
            {
                requestData: { type: AsmCustomer360Type.OVERVIEW },
            },
        ])
            .pipe(map((response) => {
            const overviewItem = response?.value?.find((item) => item.type === AsmCustomer360Type.OVERVIEW);
            return overviewItem?.overview || undefined;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of(undefined);
        }));
        this.tabs = asmCustomer360Config?.asmCustomer360?.tabs ?? [];
        this.currentTab = this.tabs[0];
    }
    ngOnInit() {
        this.subscription.add(this.csAgentAuthService
            .isCustomerSupportAgentLoggedIn()
            .pipe(distinctUntilChanged())
            .subscribe((loggedIn) => {
            if (!loggedIn) {
                this.launchDialogService.closeDialog('logout');
            }
        }));
        this.subscription.add(this.launchDialogService.data$.subscribe((data) => {
            this.customer = data.customer;
        }));
        this.setTabData();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    /**
     * Triggered when a tab is selected.
     * @param {number} selectedTab selected tab index
     */
    selectTab(selectedTab) {
        this.activeTab = selectedTab;
        this.currentTab = this.tabs[selectedTab];
        this.updateTabIndex(selectedTab);
        this.setTabData();
    }
    /**
     *  Update tab focus when key is pressed
     * @param {KeyboardEvent} event
     * @param {number} selectedIndex current tab index
     */
    switchTab(event, selectedIndex) {
        const maxTab = this.tabs.length - 1;
        let flag = true;
        if (this.isBackNavigation(event)) {
            selectedIndex--;
            if (selectedIndex < 0) {
                selectedIndex = maxTab;
            }
        }
        else if (this.isForwardsNavigation(event)) {
            selectedIndex++;
            if (selectedIndex > maxTab) {
                selectedIndex = 0;
            }
        }
        else if (event.code === KeyBoardEventCode.HOME) {
            selectedIndex = 0;
        }
        else if (event.code === KeyBoardEventCode.END) {
            selectedIndex = maxTab;
        }
        else {
            flag = false;
        }
        if (flag) {
            this.updateTabIndex(selectedIndex);
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * If there is a link within the modal, use this method to redirect the user and close the modal.
     */
    navigateTo(route) {
        const event = getAsmDialogActionEvent(this.customer, AsmDialogActionType.NAVIGATE, route);
        this.closeModal(event);
    }
    closeErrorAlert() {
        this.showErrorAlert$.next(false);
    }
    closeModal(reason) {
        this.launchDialogService.closeDialog(reason);
    }
    getAvatarText(customer) {
        customer = customer ?? {};
        const { firstName = '', lastName = '' } = customer;
        return `${firstName.charAt(0)}${lastName.charAt(0)}`;
    }
    getAvatarImage(overview) {
        return overview?.userAvatar?.url
            ? {
                altText: overview.name,
                url: overview.userAvatar.url,
                format: overview.userAvatar.format,
            }
            : undefined;
    }
    /**
     * Update tabIndex for each tab: select tab becomes 0 and other tabs will be -1
     * this is for prevent tabbing within tabs
     * @param {number} selectedIndex - selected tab index
     */
    updateTabIndex(selectedIndex) {
        this.tabHeaderItems.toArray().forEach((tabHeaderItem, index) => {
            if (index === selectedIndex) {
                tabHeaderItem.nativeElement.tabIndex = 0;
                tabHeaderItem.nativeElement.focus();
            }
            else {
                tabHeaderItem.nativeElement.tabIndex = -1;
            }
        });
    }
    setTabData() {
        this.showErrorTab$.next(false);
        const get360Data = this.asmCustomer360Facade
            .get360Data(this.currentTab.components)
            .pipe(catchError(() => {
            this.showErrorTab$.next(true);
            this.showErrorAlert$.next(true);
            return of(undefined);
        }));
        this.asmCustomer360Tabs$ = get360Data.pipe(filter(isNotUndefined), map((response) => {
            return this.currentTab.components.map((component) => {
                const requestData = component.requestData;
                if (requestData) {
                    return response.value.find((data) => data.type === requestData.type);
                }
                else {
                    return undefined;
                }
            });
        }));
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
        return ((event.code === KeyBoardEventCode.ARROW_LEFT && this.isLTRDirection()) ||
            (event.code === KeyBoardEventCode.ARROW_RIGHT && this.isRTLDirection()));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
}
AsmCustomer360Component.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Component, deps: [{ token: AsmCustomer360Config }, { token: i2.AsmCustomer360Facade }, { token: i3$1.LaunchDialogService }, { token: i4.CsAgentAuthService }, { token: i3$1.DirectionService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360Component.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360Component, selector: "cx-asm-customer-360", host: { properties: { "attr.role": "this.role", "attr.aria-modal": "this.modal", "attr.aria-labelledby": "this.labelledby", "attr.aria-describedby": "this.describedby" } }, viewQueries: [{ propertyName: "tabHeaderItems", predicate: ["tabHeaderItem"], descendants: true }], ngImport: i0, template: "<div\n  class=\"cx-asm-customer-360 cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal('Escape clicked')\"\n>\n  <!-- Modal Header -->\n  <div class=\"cx-modal-content\">\n    <div class=\"cx-dialog-header modal-header\">\n      <div class=\"header-title\">\n        <h3 id=\"asm-customer-360-title\" class=\"modal-title\">\n          {{ 'asmCustomer360.header.title' | cxTranslate }}\n        </h3>\n        <div id=\"asm-customer-360-desc\" class=\"cx-visually-hidden\">\n          {{\n            'asmCustomer360.header.subTitle'\n              | cxTranslate: { name: customer.firstName }\n          }}\n        </div>\n        <ng-template *ngTemplateOutlet=\"closeButton\"></ng-template>\n      </div>\n      <cx-message\n        *ngIf=\"errorAlert$ | async\"\n        [text]=\"'asmCustomer360.alertErrorMessage' | cxTranslate\"\n        [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n        (closeMessage)=\"closeErrorAlert()\"\n      >\n      </cx-message>\n      <div\n        class=\"header-content\"\n        *ngIf=\"customerOverview$ | async as customerOverview\"\n      >\n        <div class=\"header-profile-details\">\n          <div class=\"header-profile-details-info\">\n            <ng-container\n              *ngIf=\"\n                getAvatarImage | cxArgs: customerOverview as avatarImage;\n                else customerTextAvatar\n              \"\n            >\n              <div class=\"cx-avatar-image\">\n                <cx-media [container]=\"avatarImage\"></cx-media>\n              </div>\n            </ng-container>\n\n            <ng-template #customerTextAvatar>\n              <div class=\"cx-avatar\">\n                {{ getAvatarText | cxArgs: customer }}\n              </div>\n            </ng-template>\n            <div class=\"cx-asm-customer-info ml-3\">\n              <div class=\"cx-asm-customer-name\">\n                {{\n                  'asmCustomer360.header.subTitle'\n                    | cxTranslate: { name: customerOverview?.name }\n                }}\n              </div>\n              <div class=\"cx-asm-customer-email\">\n                {{ customerOverview?.email }}\n              </div>\n              <div\n                class=\"cx-asm-customer-address\"\n                *ngIf=\"customerOverview?.address?.town\"\n              >\n                {{ customerOverview.address.town }}\n              </div>\n            </div>\n          </div>\n          <div\n            class=\"header-profile-details-log\"\n            *ngIf=\"customerOverview?.signedUpAt\"\n          >\n            {{\n              'asmCustomer360.header.signedUpAt'\n                | cxTranslate\n                  : {\n                      date:\n                        customerOverview.signedUpAt\n                        | cxDate\n                          : asmCustomer360Config?.asmCustomer360?.dateFormat\n                    }\n            }}\n          </div>\n        </div>\n        <div class=\"header-account-details\">\n          <span\n            class=\"header-account-details-active-cart\"\n            *ngIf=\"customerOverview?.cartCode\"\n          >\n            <cx-icon class=\"account-icon\" [type]=\"cartIcon\"></cx-icon>\n            {{\n              'asmCustomer360.header.activeCartLabel'\n                | cxTranslate: { cartSize: customerOverview?.cartSize }\n            }}\n            <button\n              [attr.aria-label]=\"\n                'asmCustomer360.aria.activeCartCode'\n                  | cxTranslate: { code: customerOverview.cartCode }\n              \"\n              class=\"cx-overview-title-link link\"\n              (click)=\"navigateTo({ cxRoute: 'cart' })\"\n            >\n              {{ customerOverview.cartCode }}\n            </button>\n          </span>\n          <span\n            class=\"header-account-details-recent-order\"\n            *ngIf=\"customerOverview?.latestOrderCode\"\n          >\n            <cx-icon class=\"account-icon\" [type]=\"orderIcon\"></cx-icon>\n            {{\n              'asmCustomer360.header.recentOrderLabel'\n                | cxTranslate: { price: customerOverview?.latestOrderTotal }\n            }}\n            <button\n              [attr.aria-label]=\"\n                'asmCustomer360.aria.recentOrderCode'\n                  | cxTranslate: { code: customerOverview.latestOrderCode }\n              \"\n              class=\"cx-overview-title-link link\"\n              (click)=\"\n                navigateTo({\n                  cxRoute: 'orderDetails',\n                  params: { code: customerOverview.latestOrderCode }\n                })\n              \"\n            >\n              {{ customerOverview.latestOrderCode }}</button\n            >,\n            {{\n              customerOverview?.latestOrderTime\n                | cxDate: asmCustomer360Config?.asmCustomer360?.dateFormat\n            }}\n          </span>\n          <span\n            class=\"header-account-details-recent-ticket\"\n            *ngIf=\"customerOverview?.latestOpenedTicketId\"\n          >\n            <cx-icon class=\"account-icon\" [type]=\"ticketIcon\"></cx-icon>\n            {{ 'asmCustomer360.header.recentTicketLabel' | cxTranslate }}\n            <button\n              [attr.aria-label]=\"\n                'asmCustomer360.aria.recentOrderCode'\n                  | cxTranslate: { code: customerOverview.latestOpenedTicketId }\n              \"\n              class=\"cx-overview-title-link link\"\n              (click)=\"\n                navigateTo({\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: customerOverview.latestOpenedTicketId }\n                })\n              \"\n            >\n              {{ customerOverview.latestOpenedTicketId }}</button\n            >,\n            {{\n              customerOverview?.latestOpenedTicketCreatedAt\n                | cxDate: asmCustomer360Config?.asmCustomer360?.dateFormat\n            }}\n          </span>\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body\">\n      <div class=\"cx-tab-headers\" role=\"tablist\">\n        <button\n          #tabHeaderItem\n          *ngFor=\"let tabHeader of tabs; let i = index\"\n          class=\"cx-tab-header\"\n          role=\"tab\"\n          [attr.aria-selected]=\"activeTab === i\"\n          attr.aria-controls=\"asm-customer-360-tab-panel\"\n          (click)=\"selectTab(i)\"\n          [class.active]=\"activeTab === i\"\n          (keydown)=\"switchTab($event, i)\"\n        >\n          {{ tabHeader.i18nNameKey | cxTranslate }}\n        </button>\n      </div>\n      <div id=\"asm-customer-360-tab-panel\" class=\"cx-tab-content modal-body\">\n        <ng-container *ngIf=\"showErrorTab$ | async; else tabContent\">\n          <div class=\"cx-tab-error\">\n            <div class=\"cx-tab-error-image\"></div>\n            <div class=\"cx-tab-error-header\">\n              {{ 'asmCustomer360.errorMessageHeader' | cxTranslate }}\n            </div>\n            <div class=\"cx-tab-error-message\">\n              {{ 'asmCustomer360.alertErrorMessage' | cxTranslate }}\n            </div>\n          </div>\n        </ng-container>\n        <ng-template #tabContent>\n          <ng-container\n            *ngIf=\"asmCustomer360Tabs$ | async as asmCustomer360Tabs\"\n          >\n            <cx-asm-customer-360-section\n              *ngFor=\"let config of currentTab?.components; let i = index\"\n              [component]=\"config.component\"\n              [config]=\"config.config\"\n              [data]=\"asmCustomer360Tabs?.[i]\"\n              (navigate)=\"navigateTo($event)\"\n            ></cx-asm-customer-360-section>\n          </ng-container>\n        </ng-template>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #closeButton>\n  <button\n    type=\"button\"\n    class=\"close\"\n    attr.aria-label=\"{{ 'common.close' | cxTranslate }}\"\n    (click)=\"closeModal('Cross click')\"\n  >\n    <cx-icon [type]=\"closeIcon\"></cx-icon>\n  </button>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i3$1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "component", type: i3$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "directive", type: i3$1.FocusDirective, selector: "[cxFocus]", inputs: ["cxFocus"] }, { kind: "component", type: i3$1.MessageComponent, selector: "cx-message", inputs: ["text", "actionButtonText", "actionButtonMessage", "accordionText", "showBody", "isVisibleCloseButton", "type"], outputs: ["closeMessage", "buttonAction"] }, { kind: "component", type: AsmCustomer360SectionComponent, selector: "cx-asm-customer-360-section", inputs: ["component", "customer", "config", "data"], outputs: ["navigate"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3$2.CxDatePipe, name: "cxDate" }, { kind: "pipe", type: i8.ArgsPipe, name: "cxArgs" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Component, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360', template: "<div\n  class=\"cx-asm-customer-360 cx-modal-container cx-asm-dialog\"\n  [cxFocus]=\"focusConfig\"\n  (esc)=\"closeModal('Escape clicked')\"\n>\n  <!-- Modal Header -->\n  <div class=\"cx-modal-content\">\n    <div class=\"cx-dialog-header modal-header\">\n      <div class=\"header-title\">\n        <h3 id=\"asm-customer-360-title\" class=\"modal-title\">\n          {{ 'asmCustomer360.header.title' | cxTranslate }}\n        </h3>\n        <div id=\"asm-customer-360-desc\" class=\"cx-visually-hidden\">\n          {{\n            'asmCustomer360.header.subTitle'\n              | cxTranslate: { name: customer.firstName }\n          }}\n        </div>\n        <ng-template *ngTemplateOutlet=\"closeButton\"></ng-template>\n      </div>\n      <cx-message\n        *ngIf=\"errorAlert$ | async\"\n        [text]=\"'asmCustomer360.alertErrorMessage' | cxTranslate\"\n        [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n        (closeMessage)=\"closeErrorAlert()\"\n      >\n      </cx-message>\n      <div\n        class=\"header-content\"\n        *ngIf=\"customerOverview$ | async as customerOverview\"\n      >\n        <div class=\"header-profile-details\">\n          <div class=\"header-profile-details-info\">\n            <ng-container\n              *ngIf=\"\n                getAvatarImage | cxArgs: customerOverview as avatarImage;\n                else customerTextAvatar\n              \"\n            >\n              <div class=\"cx-avatar-image\">\n                <cx-media [container]=\"avatarImage\"></cx-media>\n              </div>\n            </ng-container>\n\n            <ng-template #customerTextAvatar>\n              <div class=\"cx-avatar\">\n                {{ getAvatarText | cxArgs: customer }}\n              </div>\n            </ng-template>\n            <div class=\"cx-asm-customer-info ml-3\">\n              <div class=\"cx-asm-customer-name\">\n                {{\n                  'asmCustomer360.header.subTitle'\n                    | cxTranslate: { name: customerOverview?.name }\n                }}\n              </div>\n              <div class=\"cx-asm-customer-email\">\n                {{ customerOverview?.email }}\n              </div>\n              <div\n                class=\"cx-asm-customer-address\"\n                *ngIf=\"customerOverview?.address?.town\"\n              >\n                {{ customerOverview.address.town }}\n              </div>\n            </div>\n          </div>\n          <div\n            class=\"header-profile-details-log\"\n            *ngIf=\"customerOverview?.signedUpAt\"\n          >\n            {{\n              'asmCustomer360.header.signedUpAt'\n                | cxTranslate\n                  : {\n                      date:\n                        customerOverview.signedUpAt\n                        | cxDate\n                          : asmCustomer360Config?.asmCustomer360?.dateFormat\n                    }\n            }}\n          </div>\n        </div>\n        <div class=\"header-account-details\">\n          <span\n            class=\"header-account-details-active-cart\"\n            *ngIf=\"customerOverview?.cartCode\"\n          >\n            <cx-icon class=\"account-icon\" [type]=\"cartIcon\"></cx-icon>\n            {{\n              'asmCustomer360.header.activeCartLabel'\n                | cxTranslate: { cartSize: customerOverview?.cartSize }\n            }}\n            <button\n              [attr.aria-label]=\"\n                'asmCustomer360.aria.activeCartCode'\n                  | cxTranslate: { code: customerOverview.cartCode }\n              \"\n              class=\"cx-overview-title-link link\"\n              (click)=\"navigateTo({ cxRoute: 'cart' })\"\n            >\n              {{ customerOverview.cartCode }}\n            </button>\n          </span>\n          <span\n            class=\"header-account-details-recent-order\"\n            *ngIf=\"customerOverview?.latestOrderCode\"\n          >\n            <cx-icon class=\"account-icon\" [type]=\"orderIcon\"></cx-icon>\n            {{\n              'asmCustomer360.header.recentOrderLabel'\n                | cxTranslate: { price: customerOverview?.latestOrderTotal }\n            }}\n            <button\n              [attr.aria-label]=\"\n                'asmCustomer360.aria.recentOrderCode'\n                  | cxTranslate: { code: customerOverview.latestOrderCode }\n              \"\n              class=\"cx-overview-title-link link\"\n              (click)=\"\n                navigateTo({\n                  cxRoute: 'orderDetails',\n                  params: { code: customerOverview.latestOrderCode }\n                })\n              \"\n            >\n              {{ customerOverview.latestOrderCode }}</button\n            >,\n            {{\n              customerOverview?.latestOrderTime\n                | cxDate: asmCustomer360Config?.asmCustomer360?.dateFormat\n            }}\n          </span>\n          <span\n            class=\"header-account-details-recent-ticket\"\n            *ngIf=\"customerOverview?.latestOpenedTicketId\"\n          >\n            <cx-icon class=\"account-icon\" [type]=\"ticketIcon\"></cx-icon>\n            {{ 'asmCustomer360.header.recentTicketLabel' | cxTranslate }}\n            <button\n              [attr.aria-label]=\"\n                'asmCustomer360.aria.recentOrderCode'\n                  | cxTranslate: { code: customerOverview.latestOpenedTicketId }\n              \"\n              class=\"cx-overview-title-link link\"\n              (click)=\"\n                navigateTo({\n                  cxRoute: 'supportTicketDetails',\n                  params: { ticketCode: customerOverview.latestOpenedTicketId }\n                })\n              \"\n            >\n              {{ customerOverview.latestOpenedTicketId }}</button\n            >,\n            {{\n              customerOverview?.latestOpenedTicketCreatedAt\n                | cxDate: asmCustomer360Config?.asmCustomer360?.dateFormat\n            }}\n          </span>\n        </div>\n      </div>\n    </div>\n\n    <!-- Modal Body -->\n    <div class=\"cx-dialog-body\">\n      <div class=\"cx-tab-headers\" role=\"tablist\">\n        <button\n          #tabHeaderItem\n          *ngFor=\"let tabHeader of tabs; let i = index\"\n          class=\"cx-tab-header\"\n          role=\"tab\"\n          [attr.aria-selected]=\"activeTab === i\"\n          attr.aria-controls=\"asm-customer-360-tab-panel\"\n          (click)=\"selectTab(i)\"\n          [class.active]=\"activeTab === i\"\n          (keydown)=\"switchTab($event, i)\"\n        >\n          {{ tabHeader.i18nNameKey | cxTranslate }}\n        </button>\n      </div>\n      <div id=\"asm-customer-360-tab-panel\" class=\"cx-tab-content modal-body\">\n        <ng-container *ngIf=\"showErrorTab$ | async; else tabContent\">\n          <div class=\"cx-tab-error\">\n            <div class=\"cx-tab-error-image\"></div>\n            <div class=\"cx-tab-error-header\">\n              {{ 'asmCustomer360.errorMessageHeader' | cxTranslate }}\n            </div>\n            <div class=\"cx-tab-error-message\">\n              {{ 'asmCustomer360.alertErrorMessage' | cxTranslate }}\n            </div>\n          </div>\n        </ng-container>\n        <ng-template #tabContent>\n          <ng-container\n            *ngIf=\"asmCustomer360Tabs$ | async as asmCustomer360Tabs\"\n          >\n            <cx-asm-customer-360-section\n              *ngFor=\"let config of currentTab?.components; let i = index\"\n              [component]=\"config.component\"\n              [config]=\"config.config\"\n              [data]=\"asmCustomer360Tabs?.[i]\"\n              (navigate)=\"navigateTo($event)\"\n            ></cx-asm-customer-360-section>\n          </ng-container>\n        </ng-template>\n      </div>\n    </div>\n  </div>\n</div>\n\n<ng-template #closeButton>\n  <button\n    type=\"button\"\n    class=\"close\"\n    attr.aria-label=\"{{ 'common.close' | cxTranslate }}\"\n    (click)=\"closeModal('Cross click')\"\n  >\n    <cx-icon [type]=\"closeIcon\"></cx-icon>\n  </button>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360Config }, { type: i2.AsmCustomer360Facade }, { type: i3$1.LaunchDialogService }, { type: i4.CsAgentAuthService }, { type: i3$1.DirectionService }]; }, propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], modal: [{
                type: HostBinding,
                args: ['attr.aria-modal']
            }], labelledby: [{
                type: HostBinding,
                args: ['attr.aria-labelledby']
            }], describedby: [{
                type: HostBinding,
                args: ['attr.aria-describedby']
            }], tabHeaderItems: [{
                type: ViewChildren,
                args: ['tabHeaderItem']
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProductItemComponent {
    constructor() {
        this.isOrderEntry = true;
        this.selectProduct = new EventEmitter();
    }
}
AsmCustomer360ProductItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360ProductItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360ProductItemComponent, selector: "cx-asm-customer-360-product-item", inputs: { product: "product", quantity: "quantity", isOrderEntry: "isOrderEntry" }, outputs: { selectProduct: "selectProduct" }, ngImport: i0, template: "<button\n  class=\"cx-asm-customer-360-product-item-media link\"\n  [attr.aria-label]=\"product?.name\"\n  (click)=\"selectProduct.emit(product)\"\n>\n  <cx-media\n    [container]=\"product?.images?.PRIMARY\"\n    format=\"product\"\n    [alt]=\"product?.name ?? ''\"\n  ></cx-media>\n</button>\n<div class=\"cx-asm-customer-360-product-item-content\">\n  <button\n    [attr.aria-label]=\"product?.name\"\n    (click)=\"selectProduct.emit(product)\"\n    class=\"cx-asm-customer-360-product-item-name link\"\n  >\n    <span title=\"{{ product?.name }}\">{{ product?.name }}</span>\n  </button>\n  <ng-container *ngIf=\"isOrderEntry; else notOrderEntryTemplate\">\n    <div class=\"cx-asm-customer-360-product-item-code\">\n      {{ product?.code }}\n    </div>\n    <div class=\"cx-asm-customer-360-product-item-quantity\" *ngIf=\"quantity\">\n      {{\n        'asmCustomer360.productItem.quantity' | cxTranslate: { count: quantity }\n      }}\n    </div>\n    <div class=\"cx-asm-customer-360-product-item-price\">\n      {{\n        'asmCustomer360.productItem.itemPrice'\n          | cxTranslate\n            : { price: product?.basePrice ?? product?.price?.formattedValue }\n      }}\n    </div>\n  </ng-container>\n  <ng-template #notOrderEntryTemplate>\n    <div\n      class=\"cx-asm-customer-360-product-item-out-of-stock\"\n      *ngIf=\"product.stock?.stockLevelStatus === 'outOfStock'\"\n    >\n      {{ 'asmCustomer360.productItem.outOfStock' | cxTranslate }}\n    </div>\n  </ng-template>\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-customer-360-product-item', changeDetection: ChangeDetectionStrategy.OnPush, template: "<button\n  class=\"cx-asm-customer-360-product-item-media link\"\n  [attr.aria-label]=\"product?.name\"\n  (click)=\"selectProduct.emit(product)\"\n>\n  <cx-media\n    [container]=\"product?.images?.PRIMARY\"\n    format=\"product\"\n    [alt]=\"product?.name ?? ''\"\n  ></cx-media>\n</button>\n<div class=\"cx-asm-customer-360-product-item-content\">\n  <button\n    [attr.aria-label]=\"product?.name\"\n    (click)=\"selectProduct.emit(product)\"\n    class=\"cx-asm-customer-360-product-item-name link\"\n  >\n    <span title=\"{{ product?.name }}\">{{ product?.name }}</span>\n  </button>\n  <ng-container *ngIf=\"isOrderEntry; else notOrderEntryTemplate\">\n    <div class=\"cx-asm-customer-360-product-item-code\">\n      {{ product?.code }}\n    </div>\n    <div class=\"cx-asm-customer-360-product-item-quantity\" *ngIf=\"quantity\">\n      {{\n        'asmCustomer360.productItem.quantity' | cxTranslate: { count: quantity }\n      }}\n    </div>\n    <div class=\"cx-asm-customer-360-product-item-price\">\n      {{\n        'asmCustomer360.productItem.itemPrice'\n          | cxTranslate\n            : { price: product?.basePrice ?? product?.price?.formattedValue }\n      }}\n    </div>\n  </ng-container>\n  <ng-template #notOrderEntryTemplate>\n    <div\n      class=\"cx-asm-customer-360-product-item-out-of-stock\"\n      *ngIf=\"product.stock?.stockLevelStatus === 'outOfStock'\"\n    >\n      {{ 'asmCustomer360.productItem.outOfStock' | cxTranslate }}\n    </div>\n  </ng-template>\n</div>\n" }]
        }], propDecorators: { product: [{
                type: Input
            }], quantity: [{
                type: Input
            }], isOrderEntry: [{
                type: Input
            }], selectProduct: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProductItemModule {
}
AsmCustomer360ProductItemModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductItemModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ProductItemModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductItemModule, declarations: [AsmCustomer360ProductItemComponent], imports: [CommonModule, MediaModule, I18nModule], exports: [AsmCustomer360ProductItemComponent] });
AsmCustomer360ProductItemModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductItemModule, imports: [CommonModule, MediaModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductItemModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, MediaModule, I18nModule],
                    declarations: [AsmCustomer360ProductItemComponent],
                    exports: [AsmCustomer360ProductItemComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProductListingComponent {
    constructor(breakpointService) {
        this.breakpointService = breakpointService;
        this.clickHeader = new EventEmitter();
        this.selectProduct = new EventEmitter();
    }
    ngOnInit() {
        this.numberofColumns$ = this.getNumberofColumns();
    }
    toggleShowMore() {
        this.showMore = !this.showMore;
    }
    getNumberofColumns() {
        return this.breakpointService.breakpoint$.pipe(map((breakpoint) => {
            switch (breakpoint) {
                case BREAKPOINT.xl:
                    return 3;
                case BREAKPOINT.lg:
                    return 2;
                default:
                    return 1;
            }
        }));
    }
}
AsmCustomer360ProductListingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingComponent, deps: [{ token: i3$1.BreakpointService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360ProductListingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360ProductListingComponent, selector: "cx-asm-customer-360-product-listing", inputs: { emptyResultDescription: "emptyResultDescription", headerInactive: "headerInactive", headerText: "headerText", products: "products", headerTemplate: "headerTemplate" }, outputs: { clickHeader: "clickHeader", selectProduct: "selectProduct" }, ngImport: i0, template: "<div class=\"product-listing\" *ngIf=\"products?.length; else emptyResultTemplate\">\n  <div\n    class=\"product-listing-header\"\n    role=\"heading\"\n    aria-level=\"4\"\n    [attr.aria-label]=\"headerText\"\n  >\n    <button\n      [attr.aria-label]=\"headerText\"\n      [disabled]=\"headerInactive\"\n      [class.inactive]=\"headerInactive\"\n      class=\"title-link link\"\n      (click)=\"clickHeader.emit()\"\n    >\n      {{ headerText }}\n    </button>\n    <ng-container *ngIf=\"headerTemplate\">\n      <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n    </ng-container>\n  </div>\n  <ng-container *ngIf=\"numberofColumns$ | async as numberofColumns\">\n    <div\n      class=\"product-listing-items\"\n      [ngClass]=\"'column-' + numberofColumns\"\n      [class.show-more]=\"showMore\"\n    >\n      <ng-container *ngFor=\"let product of products; let i = index\">\n        <cx-asm-customer-360-product-item\n          *ngIf=\"showMore || i < numberofColumns\"\n          [product]=\"product\"\n          [quantity]=\"product?.quantity\"\n          (selectProduct)=\"selectProduct.emit($event)\"\n        ></cx-asm-customer-360-product-item>\n      </ng-container>\n    </div>\n    <ng-container *ngIf=\"products.length > numberofColumns\">\n      <button\n        class=\"link cx-action-link show-hide-button\"\n        (click)=\"toggleShowMore()\"\n      >\n        <span *ngIf=\"!showMore; else showLess\">{{\n          'asmCustomer360.productListing.showMore' | cxTranslate\n        }}</span>\n        <ng-template #showLess>\n          <span *ngIf=\"showMore\">{{\n            'asmCustomer360.productListing.showLess' | cxTranslate\n          }}</span>\n        </ng-template>\n      </button>\n    </ng-container>\n  </ng-container>\n</div>\n\n<ng-template #emptyResultTemplate>\n  <div class=\"empty-result-description\">\n    {{ emptyResultDescription }}\n  </div>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: AsmCustomer360ProductItemComponent, selector: "cx-asm-customer-360-product-item", inputs: ["product", "quantity", "isOrderEntry"], outputs: ["selectProduct"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-customer-360-product-listing', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"product-listing\" *ngIf=\"products?.length; else emptyResultTemplate\">\n  <div\n    class=\"product-listing-header\"\n    role=\"heading\"\n    aria-level=\"4\"\n    [attr.aria-label]=\"headerText\"\n  >\n    <button\n      [attr.aria-label]=\"headerText\"\n      [disabled]=\"headerInactive\"\n      [class.inactive]=\"headerInactive\"\n      class=\"title-link link\"\n      (click)=\"clickHeader.emit()\"\n    >\n      {{ headerText }}\n    </button>\n    <ng-container *ngIf=\"headerTemplate\">\n      <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n    </ng-container>\n  </div>\n  <ng-container *ngIf=\"numberofColumns$ | async as numberofColumns\">\n    <div\n      class=\"product-listing-items\"\n      [ngClass]=\"'column-' + numberofColumns\"\n      [class.show-more]=\"showMore\"\n    >\n      <ng-container *ngFor=\"let product of products; let i = index\">\n        <cx-asm-customer-360-product-item\n          *ngIf=\"showMore || i < numberofColumns\"\n          [product]=\"product\"\n          [quantity]=\"product?.quantity\"\n          (selectProduct)=\"selectProduct.emit($event)\"\n        ></cx-asm-customer-360-product-item>\n      </ng-container>\n    </div>\n    <ng-container *ngIf=\"products.length > numberofColumns\">\n      <button\n        class=\"link cx-action-link show-hide-button\"\n        (click)=\"toggleShowMore()\"\n      >\n        <span *ngIf=\"!showMore; else showLess\">{{\n          'asmCustomer360.productListing.showMore' | cxTranslate\n        }}</span>\n        <ng-template #showLess>\n          <span *ngIf=\"showMore\">{{\n            'asmCustomer360.productListing.showLess' | cxTranslate\n          }}</span>\n        </ng-template>\n      </button>\n    </ng-container>\n  </ng-container>\n</div>\n\n<ng-template #emptyResultTemplate>\n  <div class=\"empty-result-description\">\n    {{ emptyResultDescription }}\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i3$1.BreakpointService }]; }, propDecorators: { emptyResultDescription: [{
                type: Input
            }], headerInactive: [{
                type: Input
            }], headerText: [{
                type: Input
            }], products: [{
                type: Input
            }], headerTemplate: [{
                type: Input
            }], clickHeader: [{
                type: Output
            }], selectProduct: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProductListingModule {
}
AsmCustomer360ProductListingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ProductListingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingModule, declarations: [AsmCustomer360ProductListingComponent], imports: [CommonModule,
        I18nModule,
        MediaModule,
        AsmCustomer360ProductItemModule], exports: [AsmCustomer360ProductListingComponent] });
AsmCustomer360ProductListingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingModule, imports: [CommonModule,
        I18nModule,
        MediaModule,
        AsmCustomer360ProductItemModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductListingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        MediaModule,
                        AsmCustomer360ProductItemModule,
                    ],
                    declarations: [AsmCustomer360ProductListingComponent],
                    exports: [AsmCustomer360ProductListingComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ActiveCartComponent {
    constructor(sectionContext, productService) {
        this.sectionContext = sectionContext;
        this.productService = productService;
        this.activeCart$ = this.sectionContext.data$.pipe(map((activeCart) => {
            return activeCart.cart;
        }));
        this.productItems$ = this.activeCart$.pipe(concatMap((cart) => {
            if (!cart?.entries?.length) {
                return of([]);
            }
            else {
                return forkJoin(cart.entries.map((entry) => {
                    return this.productService
                        .get(entry.productCode, "details" /* ProductScope.DETAILS */)
                        .pipe(filter((product) => Boolean(product)), map((product) => {
                        return {
                            ...product,
                            quantity: entry.quantity,
                            basePrice: entry.basePrice,
                            totalPrice: entry.totalPrice,
                        };
                    }), take(1));
                }));
            }
        }));
    }
}
AsmCustomer360ActiveCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActiveCartComponent, deps: [{ token: AsmCustomer360SectionContext }, { token: i3$2.ProductService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360ActiveCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360ActiveCartComponent, selector: "cx-asm-customer-360-active-cart", ngImport: i0, template: "<cx-asm-customer-360-product-listing\n  *ngIf=\"productItems$ | async as productItems\"\n  [emptyResultDescription]=\"\n    'asmCustomer360.activeCart.emptyDescription' | cxTranslate\n  \"\n  [headerInactive]=\"true\"\n  [headerTemplate]=\"headerTemplate\"\n  [headerText]=\"'asmCustomer360.activeCart.header' | cxTranslate\"\n  [products]=\"productItems\"\n  (selectProduct)=\"\n    sectionContext.navigate$.next({ cxRoute: 'product', params: $event })\n  \"\n>\n</cx-asm-customer-360-product-listing>\n\n<ng-template #headerTemplate>\n  <ng-container *ngIf=\"activeCart$ | async as activeCart\">\n    <button\n      [attr.aria-label]=\"\n        'asmCustomer360.activeCart.aria.linkLabel'\n          | cxTranslate: { code: activeCart.code }\n      \"\n      class=\"cx-overview-title-link link\"\n      (click)=\"sectionContext.navigate$.next({ cxRoute: 'cart' })\"\n    >\n      {{ activeCart.code }}\n    </button>\n    <div class=\"cart-total-no-items\">\n      {{\n        'asmCustomer360.productListing.totalNoItems'\n          | cxTranslate: { count: activeCart.totalItemCount }\n      }}\n    </div>\n    <div class=\"cart-divider\"></div>\n    <div class=\"cart-total-price\">\n      {{\n        'asmCustomer360.productListing.totalPrice'\n          | cxTranslate: { price: activeCart.totalPrice }\n      }}\n    </div>\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AsmCustomer360ProductListingComponent, selector: "cx-asm-customer-360-product-listing", inputs: ["emptyResultDescription", "headerInactive", "headerText", "products", "headerTemplate"], outputs: ["clickHeader", "selectProduct"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActiveCartComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-active-cart', template: "<cx-asm-customer-360-product-listing\n  *ngIf=\"productItems$ | async as productItems\"\n  [emptyResultDescription]=\"\n    'asmCustomer360.activeCart.emptyDescription' | cxTranslate\n  \"\n  [headerInactive]=\"true\"\n  [headerTemplate]=\"headerTemplate\"\n  [headerText]=\"'asmCustomer360.activeCart.header' | cxTranslate\"\n  [products]=\"productItems\"\n  (selectProduct)=\"\n    sectionContext.navigate$.next({ cxRoute: 'product', params: $event })\n  \"\n>\n</cx-asm-customer-360-product-listing>\n\n<ng-template #headerTemplate>\n  <ng-container *ngIf=\"activeCart$ | async as activeCart\">\n    <button\n      [attr.aria-label]=\"\n        'asmCustomer360.activeCart.aria.linkLabel'\n          | cxTranslate: { code: activeCart.code }\n      \"\n      class=\"cx-overview-title-link link\"\n      (click)=\"sectionContext.navigate$.next({ cxRoute: 'cart' })\"\n    >\n      {{ activeCart.code }}\n    </button>\n    <div class=\"cart-total-no-items\">\n      {{\n        'asmCustomer360.productListing.totalNoItems'\n          | cxTranslate: { count: activeCart.totalItemCount }\n      }}\n    </div>\n    <div class=\"cart-divider\"></div>\n    <div class=\"cart-total-price\">\n      {{\n        'asmCustomer360.productListing.totalPrice'\n          | cxTranslate: { price: activeCart.totalPrice }\n      }}\n    </div>\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }, { type: i3$2.ProductService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ActiveCartModule {
}
AsmCustomer360ActiveCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActiveCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ActiveCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActiveCartModule, declarations: [AsmCustomer360ActiveCartComponent], imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule], exports: [AsmCustomer360ActiveCartComponent] });
AsmCustomer360ActiveCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActiveCartModule, imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActiveCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule],
                    declarations: [AsmCustomer360ActiveCartComponent],
                    exports: [AsmCustomer360ActiveCartComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var CustomerTableTextAlign;
(function (CustomerTableTextAlign) {
    CustomerTableTextAlign["START"] = "START";
    CustomerTableTextAlign["CENTER"] = "CENTER";
    CustomerTableTextAlign["END"] = "END";
})(CustomerTableTextAlign || (CustomerTableTextAlign = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360TableComponent {
    constructor(asmCustomer360Config, directionService) {
        this.asmCustomer360Config = asmCustomer360Config;
        this.directionService = directionService;
        this.selectItem = new EventEmitter();
        this.SortOrder = SortOrder;
        this.CustomerTableTextAlign = CustomerTableTextAlign;
        this.currentPageNumber = 0;
        this.currentPage$ = new BehaviorSubject(undefined);
        this.listSortOrder = SortOrder.DESC;
        this.focusedTableColumnIndex = 0;
        this.focusedTableRowIndex = 0;
        this.setFocusOnStartTableItem = false;
    }
    ngOnChanges(changes) {
        if (changes?.entries) {
            const entries = this.sortEntries(this.entries, this.sortProperty, this.listSortOrder);
            this.entryPages = this.updateEntryPages(entries);
            this.setPageNumber(this.currentPageNumber);
        }
    }
    ngAfterViewChecked() {
        if (this.setFocusOnStartTableItem) {
            this.setSelectedTabIndex(0, 1);
            this.setFocusOnStartTableItem = false;
        }
    }
    sortEntriesAndUpdatePages(sortProperty) {
        const currentProperty = this.sortProperty;
        let newSortOrder;
        if (sortProperty !== currentProperty) {
            newSortOrder = SortOrder.ASC;
        }
        else {
            newSortOrder =
                this.listSortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
        }
        this.sortProperty = sortProperty;
        this.listSortOrder = newSortOrder;
        this.entries = this.sortEntries(this.entries, this.sortProperty, this.listSortOrder);
        this.entryPages = this.updateEntryPages(this.entries);
        this.setPageNumber(this.currentPageNumber);
    }
    setPageNumber(pageNumber, selectFirstRecord = false) {
        this.currentPageNumber = pageNumber;
        this.currentPage$.next(this.entryPages[this.currentPageNumber]);
        if (selectFirstRecord) {
            this.setFocusOnStartTableItem = true;
        }
    }
    /**
     * returns sort direction
     * @param columnProperty column property
     * @param sortProperty current sort property
     * @param listSortOrder current sort order
     */
    sortDirection(columnProperty, sortProperty, listSortOrder) {
        if (columnProperty === sortProperty) {
            return listSortOrder === SortOrder.ASC ? 'ascending' : 'descending';
        }
        else {
            return 'none';
        }
    }
    /**
     * returns tabIndex value
     * @param focusedTableColumnIndex saved column index
     * @param focusedTableRowIndex saved row index
     * @param columnIndex selected column index
     */
    tabIndexValue(focusedTableColumnIndex, focusedTableRowIndex, columnIndex) {
        return focusedTableColumnIndex === columnIndex && focusedTableRowIndex === 0
            ? 0
            : -1;
    }
    /**
     * Update cell's focus When keyboard key is pressed:
     * handles arrowUp, arrowDown, arrowRight, arrowLeft, Home, End, Home+Ctrl, End+Ctrl
     * PageDown, PageUp
     * @param event KeyboardEvent
     * @param columnIndex selected column index of table
     * @param rowIndex selected row index of table
     */
    onKeyDownCell(event, columnIndex, rowIndex) {
        let knownKeyPressed = true;
        switch (event.code) {
            case KeyBoardEventCode.ARROW_LEFT:
            case KeyBoardEventCode.ARROW_RIGHT:
                this.moveFocusLeftRight(event, columnIndex, rowIndex);
                break;
            case KeyBoardEventCode.ARROW_DOWN:
                this.moveFocusDown(columnIndex, rowIndex);
                break;
            case KeyBoardEventCode.ARROW_UP:
                this.moveFocusUp(columnIndex, rowIndex);
                break;
            case KeyBoardEventCode.HOME:
                this.moveFocusHome(event, rowIndex);
                break;
            case KeyBoardEventCode.END:
                this.moveFocusEnd(event, rowIndex);
                break;
            case KeyBoardEventCode.PAGE_DOWN:
                this.handlePageDown();
                break;
            case KeyBoardEventCode.PAGE_UP:
                this.handlePageUp();
                break;
            default:
                knownKeyPressed = false;
        }
        if (knownKeyPressed) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * Update selected cell's tabIndex (change tabIndex to 0).
     * if cell contains link(button) then update link
     * @param columnIndex selected column index of table
     * @param rowIndex selected row index of table
     */
    setSelectedTabIndex(columnIndex, rowIndex) {
        const maxColumn = this.columns.length - 1;
        const maxRow = this.table.nativeElement.rows.length - 1;
        if (columnIndex > maxColumn || rowIndex > maxRow) {
            return;
        }
        this.removeCellTabIndex(this.focusedTableColumnIndex, this.focusedTableRowIndex);
        this.focusedTableColumnIndex = columnIndex;
        this.focusedTableRowIndex = rowIndex;
        const tableCell = this.table.nativeElement.rows[rowIndex].cells[columnIndex];
        const childElement = tableCell.firstChild;
        const elementToFocus = childElement.tagName === 'BUTTON' ? childElement : tableCell;
        elementToFocus.tabIndex = 0;
        elementToFocus.focus();
    }
    handlePageUp() {
        if (this.entryPages.length > 1 && this.currentPageNumber > 0) {
            const pageNumber = Math.max(0, this.currentPageNumber - 1);
            this.setPageNumber(pageNumber, true);
        }
    }
    handlePageDown() {
        const maxPage = this.entryPages.length - 1;
        if (this.entryPages.length > 1 && this.currentPageNumber < maxPage) {
            const pageNumber = Math.min(maxPage, this.currentPageNumber + 1);
            this.setPageNumber(pageNumber, true);
        }
    }
    moveFocusEnd(event, rowIndex) {
        const maxRow = this.table.nativeElement.rows.length - 1;
        rowIndex = event.ctrlKey ? maxRow : rowIndex;
        this.setSelectedTabIndex(this.columns.length - 1, rowIndex);
    }
    moveFocusHome(event, rowIndex) {
        rowIndex = event.ctrlKey ? 0 : rowIndex;
        this.setSelectedTabIndex(0, rowIndex);
    }
    moveFocusUp(columnIndex, rowIndex) {
        rowIndex = Math.max(0, rowIndex - 1);
        this.setSelectedTabIndex(columnIndex, rowIndex);
    }
    moveFocusDown(columnIndex, rowIndex) {
        const maxRow = this.table.nativeElement.rows.length - 1;
        rowIndex = Math.min(maxRow, rowIndex + 1);
        this.setSelectedTabIndex(columnIndex, rowIndex);
    }
    moveFocusLeftRight(event, columnIndex, rowIndex) {
        const maxColumn = this.columns.length - 1;
        if (this.isBackNavigation(event)) {
            columnIndex = Math.max(0, columnIndex - 1);
        }
        else {
            columnIndex = Math.min(maxColumn, columnIndex + 1);
        }
        this.setSelectedTabIndex(columnIndex, rowIndex);
    }
    /**
     * Removes tabindex and CSS focus class from a cell in the table.
     * @param columnIndex The index of the column containing the cell.
     * @param rowIndex The index of the row containing the cell.
     */
    removeCellTabIndex(columnIndex, rowIndex) {
        const tableCell = this.table.nativeElement.rows?.[rowIndex]?.cells?.[columnIndex];
        const childElement = tableCell?.firstChild;
        if (childElement) {
            if (childElement.tagName === 'BUTTON') {
                childElement.tabIndex = -1;
            }
            else {
                if (tableCell) {
                    tableCell.tabIndex = -1;
                }
            }
        }
    }
    /**
     * Verifies whether the user navigates from a subgroup back to the main group menu.
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {boolean} -'true' if the user navigates back into the main group menu, otherwise 'false'.
     * @protected
     */
    isBackNavigation(event) {
        return ((event.code === KeyBoardEventCode.ARROW_LEFT && this.isLTRDirection()) ||
            (event.code === KeyBoardEventCode.ARROW_RIGHT && this.isRTLDirection()));
    }
    isLTRDirection() {
        return this.directionService.getDirection() === DirectionMode.LTR;
    }
    isRTLDirection() {
        return this.directionService.getDirection() === DirectionMode.RTL;
    }
    updateEntryPages(entries) {
        const newEntryPages = [];
        for (let i = 0; i < entries.length; i += this.pageSize) {
            newEntryPages.push(entries.slice(i, i + this.pageSize));
        }
        return newEntryPages;
    }
    sortEntries(entries, sortByProperty, sortOrder) {
        if (entries?.length) {
            return entries.sort(itemsWith(property(sortByProperty, itemsWith(byNullish(SortOrder.DESC), whenType(isString, byString(sortOrder)), whenType(isNumber, byComparison(sortOrder)), whenType(isBoolean, byBoolean(sortOrder))))));
        }
        else {
            return [];
        }
    }
}
AsmCustomer360TableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableComponent, deps: [{ token: AsmCustomer360Config }, { token: i3$1.DirectionService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360TableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360TableComponent, selector: "cx-asm-customer-360-table", inputs: { columns: "columns", emptyStateText: "emptyStateText", entries: "entries", headerText: "headerText", pageSize: "pageSize", sortProperty: "sortProperty" }, outputs: { selectItem: "selectItem" }, viewQueries: [{ propertyName: "table", first: true, predicate: ["table"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"cx-asm-customer-360-table-heading\" *ngIf=\"headerText\">\n  <h4 class=\"cx-asm-customer-360-table-heading-text\">\n    {{ headerText }}\n  </h4>\n  <div\n    [attr.aria-label]=\"'asmCustomer360.pagination' | cxTranslate\"\n    class=\"cx-asm-customer-360-table-heading-pages\"\n    *ngIf=\"entryPages\"\n  >\n    <ng-container *ngFor=\"let page of entryPages; let pageNumber = index\">\n      <button\n        *ngIf=\"entryPages.length > 1\"\n        (click)=\"setPageNumber(pageNumber, true)\"\n        class=\"cx-asm-customer-360-table-heading-page link\"\n        [class.active]=\"currentPageNumber === pageNumber\"\n        [attr.aria-current]=\"currentPageNumber === pageNumber ? 'page' : null\"\n        [disabled]=\"currentPageNumber === pageNumber\"\n        [attr.aria-label]=\"\n          'asmCustomer360.page' | cxTranslate: { number: pageNumber + 1 }\n        \"\n      >\n        {{ pageNumber + 1 }}\n      </button>\n    </ng-container>\n  </div>\n</div>\n<hr class=\"cx-asm-customer-360-table-separator\" aria-hidden=\"true\" />\n<ng-container *ngIf=\"entryPages?.length && columns?.length\">\n  <table\n    #table\n    class=\"cx-asm-customer-360-table\"\n    role=\"grid\"\n    [attr.aria-rowcount]=\"entries.length\"\n    [attr.aria-colcount]=\"columns.length\"\n    [attr.data-per-page]=\"pageSize\"\n  >\n    <caption class=\"cx-visually-hidden\">\n      {{\n        headerText\n      }}\n    </caption>\n    <thead>\n      <tr class=\"cx-asm-customer-360-table-row-header\" role=\"row\">\n        <th\n          class=\"cx-asm-customer-360-table-header\"\n          role=\"columnheader\"\n          *ngFor=\"let column of columns; let columnIndex = index\"\n          [class.active]=\"sortProperty === column.property\"\n          [class.asc]=\"listSortOrder === SortOrder.ASC\"\n          [class.desc]=\"listSortOrder !== SortOrder.ASC\"\n          [attr.aria-sort]=\"\n            sortDirection | cxArgs: column.property:sortProperty:listSortOrder\n          \"\n          [ngClass]=\"{\n            'text-start':\n              column.headerTextAlign === CustomerTableTextAlign.START,\n            'text-center':\n              column.headerTextAlign === CustomerTableTextAlign.CENTER,\n            'text-end': column.headerTextAlign === CustomerTableTextAlign.END\n          }\"\n          (click)=\"setSelectedTabIndex(columnIndex, 0)\"\n        >\n          <button\n            [tabindex]=\"\n              tabIndexValue\n                | cxArgs\n                  : focusedTableColumnIndex\n                  : focusedTableRowIndex\n                  : columnIndex\n            \"\n            class=\"link\"\n            (click)=\"sortEntriesAndUpdatePages(column.property)\"\n            (keydown)=\"onKeyDownCell($event, columnIndex, 0)\"\n          >\n            <span *ngIf=\"column?.i18nTextKey\">{{\n              column.i18nTextKey | cxTranslate\n            }}</span>\n            <span *ngIf=\"!column?.i18nTextKey\">{{ column.text }}</span>\n          </button>\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr\n        class=\"cx-asm-customer-360-table-row\"\n        role=\"row\"\n        *ngFor=\"let entry of currentPage$ | async; let rowIndex = index\"\n      >\n        <td\n          role=\"cell\"\n          tabindex=\"-1\"\n          *ngFor=\"let column of columns; let columnIndex = index\"\n          (keydown)=\"onKeyDownCell($event, columnIndex, rowIndex + 1)\"\n          (click)=\"setSelectedTabIndex(columnIndex, rowIndex + 1)\"\n          [ngClass]=\"{\n            'text-start': column.textAlign === CustomerTableTextAlign.START,\n            'text-center': column.textAlign === CustomerTableTextAlign.CENTER,\n            'text-end': column.textAlign === CustomerTableTextAlign.END\n          }\"\n        >\n          <ng-container\n            *ngIf=\"column.navigatable; then linkTemplate; else starRating\"\n          ></ng-container>\n\n          <ng-template #linkTemplate>\n            <button\n              tabindex=\"-1\"\n              [attr.aria-label]=\"entry[column.property]\"\n              (click)=\"selectItem.emit(entry)\"\n              class=\"cx-asm-customer-360-table-link link\"\n              [title]=\"\n                entry[column.property] ||\n                ('asmCustomer360.emptyCellValue' | cxTranslate)\n              \"\n            >\n              {{\n                entry[column.property] ||\n                  ('asmCustomer360.emptyCellValue' | cxTranslate)\n              }}\n            </button>\n          </ng-template>\n\n          <ng-template #starRating>\n            <cx-star-rating\n              tabindex=\"-1\"\n              *ngIf=\"column.renderAsStarRating; else dateCell\"\n              [rating]=\"entry[column.property]\"\n            ></cx-star-rating>\n          </ng-template>\n\n          <ng-template #dateCell>\n            <ng-container\n              *ngIf=\"column?.isDate && entry[column.property]; else tableCell\"\n              ><span>{{\n                entry[column.property]\n                  | cxDate: asmCustomer360Config?.asmCustomer360?.dateTimeFormat\n              }}</span></ng-container\n            >\n          </ng-template>\n\n          <ng-template #tableCell>\n            <ng-container\n              ><span\n                [title]=\"\n                  entry[column.property] ||\n                  ('asmCustomer360.emptyCellValue' | cxTranslate)\n                \"\n                >{{\n                  entry[column.property] ||\n                    ('asmCustomer360.emptyCellValue' | cxTranslate)\n                }}</span\n              ></ng-container\n            >\n          </ng-template>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</ng-container>\n<div class=\"cx-asm-customer-360-table-empty\" *ngIf=\"!entryPages?.length\">\n  {{ emptyStateText }}\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.StarRatingComponent, selector: "cx-star-rating", inputs: ["disabled", "rating"], outputs: ["change"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3$2.CxDatePipe, name: "cxDate" }, { kind: "pipe", type: i8.ArgsPipe, name: "cxArgs" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-table', template: "<div class=\"cx-asm-customer-360-table-heading\" *ngIf=\"headerText\">\n  <h4 class=\"cx-asm-customer-360-table-heading-text\">\n    {{ headerText }}\n  </h4>\n  <div\n    [attr.aria-label]=\"'asmCustomer360.pagination' | cxTranslate\"\n    class=\"cx-asm-customer-360-table-heading-pages\"\n    *ngIf=\"entryPages\"\n  >\n    <ng-container *ngFor=\"let page of entryPages; let pageNumber = index\">\n      <button\n        *ngIf=\"entryPages.length > 1\"\n        (click)=\"setPageNumber(pageNumber, true)\"\n        class=\"cx-asm-customer-360-table-heading-page link\"\n        [class.active]=\"currentPageNumber === pageNumber\"\n        [attr.aria-current]=\"currentPageNumber === pageNumber ? 'page' : null\"\n        [disabled]=\"currentPageNumber === pageNumber\"\n        [attr.aria-label]=\"\n          'asmCustomer360.page' | cxTranslate: { number: pageNumber + 1 }\n        \"\n      >\n        {{ pageNumber + 1 }}\n      </button>\n    </ng-container>\n  </div>\n</div>\n<hr class=\"cx-asm-customer-360-table-separator\" aria-hidden=\"true\" />\n<ng-container *ngIf=\"entryPages?.length && columns?.length\">\n  <table\n    #table\n    class=\"cx-asm-customer-360-table\"\n    role=\"grid\"\n    [attr.aria-rowcount]=\"entries.length\"\n    [attr.aria-colcount]=\"columns.length\"\n    [attr.data-per-page]=\"pageSize\"\n  >\n    <caption class=\"cx-visually-hidden\">\n      {{\n        headerText\n      }}\n    </caption>\n    <thead>\n      <tr class=\"cx-asm-customer-360-table-row-header\" role=\"row\">\n        <th\n          class=\"cx-asm-customer-360-table-header\"\n          role=\"columnheader\"\n          *ngFor=\"let column of columns; let columnIndex = index\"\n          [class.active]=\"sortProperty === column.property\"\n          [class.asc]=\"listSortOrder === SortOrder.ASC\"\n          [class.desc]=\"listSortOrder !== SortOrder.ASC\"\n          [attr.aria-sort]=\"\n            sortDirection | cxArgs: column.property:sortProperty:listSortOrder\n          \"\n          [ngClass]=\"{\n            'text-start':\n              column.headerTextAlign === CustomerTableTextAlign.START,\n            'text-center':\n              column.headerTextAlign === CustomerTableTextAlign.CENTER,\n            'text-end': column.headerTextAlign === CustomerTableTextAlign.END\n          }\"\n          (click)=\"setSelectedTabIndex(columnIndex, 0)\"\n        >\n          <button\n            [tabindex]=\"\n              tabIndexValue\n                | cxArgs\n                  : focusedTableColumnIndex\n                  : focusedTableRowIndex\n                  : columnIndex\n            \"\n            class=\"link\"\n            (click)=\"sortEntriesAndUpdatePages(column.property)\"\n            (keydown)=\"onKeyDownCell($event, columnIndex, 0)\"\n          >\n            <span *ngIf=\"column?.i18nTextKey\">{{\n              column.i18nTextKey | cxTranslate\n            }}</span>\n            <span *ngIf=\"!column?.i18nTextKey\">{{ column.text }}</span>\n          </button>\n        </th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr\n        class=\"cx-asm-customer-360-table-row\"\n        role=\"row\"\n        *ngFor=\"let entry of currentPage$ | async; let rowIndex = index\"\n      >\n        <td\n          role=\"cell\"\n          tabindex=\"-1\"\n          *ngFor=\"let column of columns; let columnIndex = index\"\n          (keydown)=\"onKeyDownCell($event, columnIndex, rowIndex + 1)\"\n          (click)=\"setSelectedTabIndex(columnIndex, rowIndex + 1)\"\n          [ngClass]=\"{\n            'text-start': column.textAlign === CustomerTableTextAlign.START,\n            'text-center': column.textAlign === CustomerTableTextAlign.CENTER,\n            'text-end': column.textAlign === CustomerTableTextAlign.END\n          }\"\n        >\n          <ng-container\n            *ngIf=\"column.navigatable; then linkTemplate; else starRating\"\n          ></ng-container>\n\n          <ng-template #linkTemplate>\n            <button\n              tabindex=\"-1\"\n              [attr.aria-label]=\"entry[column.property]\"\n              (click)=\"selectItem.emit(entry)\"\n              class=\"cx-asm-customer-360-table-link link\"\n              [title]=\"\n                entry[column.property] ||\n                ('asmCustomer360.emptyCellValue' | cxTranslate)\n              \"\n            >\n              {{\n                entry[column.property] ||\n                  ('asmCustomer360.emptyCellValue' | cxTranslate)\n              }}\n            </button>\n          </ng-template>\n\n          <ng-template #starRating>\n            <cx-star-rating\n              tabindex=\"-1\"\n              *ngIf=\"column.renderAsStarRating; else dateCell\"\n              [rating]=\"entry[column.property]\"\n            ></cx-star-rating>\n          </ng-template>\n\n          <ng-template #dateCell>\n            <ng-container\n              *ngIf=\"column?.isDate && entry[column.property]; else tableCell\"\n              ><span>{{\n                entry[column.property]\n                  | cxDate: asmCustomer360Config?.asmCustomer360?.dateTimeFormat\n              }}</span></ng-container\n            >\n          </ng-template>\n\n          <ng-template #tableCell>\n            <ng-container\n              ><span\n                [title]=\"\n                  entry[column.property] ||\n                  ('asmCustomer360.emptyCellValue' | cxTranslate)\n                \"\n                >{{\n                  entry[column.property] ||\n                    ('asmCustomer360.emptyCellValue' | cxTranslate)\n                }}</span\n              ></ng-container\n            >\n          </ng-template>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</ng-container>\n<div class=\"cx-asm-customer-360-table-empty\" *ngIf=\"!entryPages?.length\">\n  {{ emptyStateText }}\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360Config }, { type: i3$1.DirectionService }]; }, propDecorators: { table: [{
                type: ViewChild,
                args: ['table']
            }], columns: [{
                type: Input
            }], emptyStateText: [{
                type: Input
            }], entries: [{
                type: Input
            }], headerText: [{
                type: Input
            }], pageSize: [{
                type: Input
            }], sortProperty: [{
                type: Input
            }], selectItem: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360TableModule {
}
AsmCustomer360TableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360TableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableModule, declarations: [AsmCustomer360TableComponent], imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule], exports: [AsmCustomer360TableComponent] });
AsmCustomer360TableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableModule, imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360TableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, ArgsModule, StarRatingModule],
                    declarations: [AsmCustomer360TableComponent],
                    exports: [AsmCustomer360TableComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var TypeCodes;
(function (TypeCodes) {
    TypeCodes["SavedCart"] = "SAVED CART";
    TypeCodes["Cart"] = "CART";
    TypeCodes["Ticket"] = "TICKET";
    TypeCodes["Order"] = "ORDER";
})(TypeCodes || (TypeCodes = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ActivityComponent {
    constructor(context) {
        this.context = context;
        this.columns = [
            {
                property: 'typeLabel',
                i18nTextKey: 'asmCustomer360.activity.type',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'associatedTypeId',
                text: 'id',
                i18nTextKey: 'asmCustomer360.activity.id',
                headerTextAlign: CustomerTableTextAlign.START,
                textAlign: CustomerTableTextAlign.START,
                navigatable: true,
            },
            {
                property: 'description',
                text: 'description',
                i18nTextKey: 'asmCustomer360.activity.description',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'statusLabel',
                text: 'status',
                i18nTextKey: 'asmCustomer360.activity.status',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'createdAt',
                text: 'created',
                i18nTextKey: 'asmCustomer360.activity.created',
                isDate: true,
            },
            {
                property: 'updatedAt',
                text: 'updated',
                i18nTextKey: 'asmCustomer360.activity.updated',
                isDate: true,
            },
        ];
    }
    ngOnInit() {
        let entries = [];
        this.entries$ = combineLatest([this.context.data$]).pipe(map(([data]) => {
            entries = [];
            data.activities.forEach((activity) => {
                entries.push({
                    ...activity,
                    typeLabel: activity.type?.name,
                    statusLabel: activity.status?.name,
                });
            });
            return entries;
        }));
    }
    itemSelected(entry) {
        if (entry) {
            let urlCommand;
            if (entry.type?.code === TypeCodes.SavedCart) {
                urlCommand = {
                    cxRoute: 'savedCartsDetails',
                    params: { savedCartId: entry?.associatedTypeId },
                };
            }
            else if (entry.type?.code === TypeCodes.Cart) {
                urlCommand = {
                    cxRoute: 'cart',
                };
            }
            else if (entry.type?.code === TypeCodes.Order) {
                urlCommand = {
                    cxRoute: 'orderDetails',
                    params: { code: entry?.associatedTypeId },
                };
            }
            else if (entry.type?.code === TypeCodes.Ticket) {
                urlCommand = {
                    cxRoute: 'supportTicketDetails',
                    params: { ticketCode: entry?.associatedTypeId },
                };
            }
            if (urlCommand) {
                this.context.navigate$.next(urlCommand);
            }
        }
    }
}
AsmCustomer360ActivityComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityComponent, deps: [{ token: AsmCustomer360SectionContext }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360ActivityComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360ActivityComponent, selector: "cx-asm-customer-360-activity", ngImport: i0, template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"'asmCustomer360.activity.emptyStateText' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.activity.headerText' | cxTranslate\"\n  sortProperty=\"createdAt\"\n  [columns]=\"columns\"\n  [entries]=\"entries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"itemSelected($event)\"\n></cx-asm-customer-360-table>\n", dependencies: [{ kind: "component", type: AsmCustomer360TableComponent, selector: "cx-asm-customer-360-table", inputs: ["columns", "emptyStateText", "entries", "headerText", "pageSize", "sortProperty"], outputs: ["selectItem"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-activity', template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"'asmCustomer360.activity.emptyStateText' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.activity.headerText' | cxTranslate\"\n  sortProperty=\"createdAt\"\n  [columns]=\"columns\"\n  [entries]=\"entries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"itemSelected($event)\"\n></cx-asm-customer-360-table>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ActivityModule {
}
AsmCustomer360ActivityModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ActivityModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityModule, declarations: [AsmCustomer360ActivityComponent], imports: [CommonModule, AsmCustomer360TableModule, I18nModule], exports: [AsmCustomer360ActivityComponent] });
AsmCustomer360ActivityModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityModule, imports: [CommonModule, AsmCustomer360TableModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ActivityModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmCustomer360TableModule, I18nModule],
                    declarations: [AsmCustomer360ActivityComponent],
                    exports: [AsmCustomer360ActivityComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360MapComponent {
    constructor(source, changeDetectorRef, storeFinderService, translationService, storeFinderConfig) {
        this.source = source;
        this.changeDetectorRef = changeDetectorRef;
        this.storeFinderService = storeFinderService;
        this.translationService = translationService;
        this.storeFinderConfig = storeFinderConfig;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.dataSource$ = combineLatest([this.source.config$, this.source.data$]);
        this.subscription.add(this.dataSource$
            .pipe(concatMap(([config, data]) => {
            this.storeFinderService.findStoresAction(data.address, {
                pageSize: config.pageSize,
            }, undefined, undefined, undefined, this.storeFinderConfig.googleMaps?.radius);
            return this.storeFinderService.getFindStoresEntities();
        }), concatMap((storeSearchData) => {
            if (storeSearchData) {
                this.storeData = storeSearchData;
                this.selectedStore = this.storeData.stores?.[0];
            }
            return of(undefined);
        }))
            .subscribe(() => this.changeDetectorRef.detectChanges()));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    selectStore(store) {
        this.selectedStore = store;
    }
    getStoreOpening(opening) {
        const { closed, openingTime, closingTime } = opening;
        if (closed) {
            return this.translationService.translate('asmCustomer360.maps.storeClosed');
        }
        else if (openingTime) {
            let storeOpening = `${openingTime.formattedHour}`;
            if (closingTime) {
                storeOpening = `${storeOpening} - ${closingTime.formattedHour}`;
            }
            return of(storeOpening);
        }
        else {
            return of('');
        }
    }
}
AsmCustomer360MapComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360MapComponent, deps: [{ token: AsmCustomer360SectionContext }, { token: i0.ChangeDetectorRef }, { token: i2$1.StoreFinderService }, { token: i3$2.TranslationService }, { token: i2$1.StoreFinderConfig }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360MapComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360MapComponent, selector: "cx-asm-customer-360-map", ngImport: i0, template: "<ng-container *ngIf=\"storeData\">\n  <div class=\"store-count\">\n    {{\n      'asmCustomer360.maps.storesFound'\n        | cxTranslate\n          : {\n              initial: 1,\n              end: storeData.pagination?.pageSize,\n              total: storeData.pagination?.totalResults\n            }\n    }}\n  </div>\n\n  <div>\n    <button\n      class=\"store-listing-item\"\n      [class.selected]=\"selectedStore === store\"\n      *ngFor=\"let store of storeData.stores\"\n      [attr.aria-label]=\"store.displayName\"\n      (click)=\"selectStore(store)\"\n    >\n      <div class=\"store-listing-item-details\">\n        <div class=\"store-listing-item-text\">{{ store.displayName }}</div>\n        <div class=\"store-listing-item-text\">\n          {{ store.address?.line1 }}, {{ store.address?.line2 }}\n        </div>\n        <div class=\"store-listing-item-text\">{{ store.address?.town }}</div>\n      </div>\n      <div class=\"store-listing-item-distance store-listing-item-text\">\n        {{ store.formattedDistance }}\n      </div>\n    </button>\n  </div>\n\n  <div *ngIf=\"selectedStore\">\n    <div class=\"store-details\">\n      <img\n        *ngIf=\"selectedStore.storeImages?.[0]\"\n        [src]=\"selectedStore.storeImages?.[0]?.url\"\n        alt=\"{{ selectedStore.displayName }}\"\n        width=\"110px\"\n        height=\"110px\"\n      />\n      <div class=\"store-details-info\">\n        <div class=\"bold\">{{ selectedStore.displayName }}</div>\n        <div>{{ selectedStore.address?.line1 }}</div>\n        <div>{{ selectedStore.address?.line2 }}</div>\n        <div>{{ selectedStore.address?.town }}</div>\n      </div>\n    </div>\n    <div\n      class=\"store-openings\"\n      *ngIf=\"selectedStore?.openingHours as openingHours\"\n    >\n      <div\n        class=\"store-openings-dates\"\n        *ngIf=\"openingHours.weekDayOpeningList as weekDayOpeningList\"\n      >\n        <div\n          class=\"store-openings-date\"\n          *ngFor=\"let opening of weekDayOpeningList\"\n        >\n          <span class=\"store-openings-day bold\">{{ opening.weekDay }}</span\n          >{{ getStoreOpening(opening) | async }}\n        </div>\n      </div>\n      <div\n        class=\"store-openings-dates\"\n        *ngIf=\"openingHours.specialDayOpeningList as specialDayOpeningList\"\n      >\n        <div\n          class=\"store-openings-date\"\n          *ngFor=\"let opening of specialDayOpeningList\"\n        >\n          <span class=\"store-openings-day bold\">{{ opening.name }}</span\n          >{{ getStoreOpening(opening) | async }}\n        </div>\n      </div>\n      <div class=\"store-openings-features\">\n        <div *ngFor=\"let feature of selectedStore.features?.entry\">\n          {{ feature.value }}\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360MapComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-map', template: "<ng-container *ngIf=\"storeData\">\n  <div class=\"store-count\">\n    {{\n      'asmCustomer360.maps.storesFound'\n        | cxTranslate\n          : {\n              initial: 1,\n              end: storeData.pagination?.pageSize,\n              total: storeData.pagination?.totalResults\n            }\n    }}\n  </div>\n\n  <div>\n    <button\n      class=\"store-listing-item\"\n      [class.selected]=\"selectedStore === store\"\n      *ngFor=\"let store of storeData.stores\"\n      [attr.aria-label]=\"store.displayName\"\n      (click)=\"selectStore(store)\"\n    >\n      <div class=\"store-listing-item-details\">\n        <div class=\"store-listing-item-text\">{{ store.displayName }}</div>\n        <div class=\"store-listing-item-text\">\n          {{ store.address?.line1 }}, {{ store.address?.line2 }}\n        </div>\n        <div class=\"store-listing-item-text\">{{ store.address?.town }}</div>\n      </div>\n      <div class=\"store-listing-item-distance store-listing-item-text\">\n        {{ store.formattedDistance }}\n      </div>\n    </button>\n  </div>\n\n  <div *ngIf=\"selectedStore\">\n    <div class=\"store-details\">\n      <img\n        *ngIf=\"selectedStore.storeImages?.[0]\"\n        [src]=\"selectedStore.storeImages?.[0]?.url\"\n        alt=\"{{ selectedStore.displayName }}\"\n        width=\"110px\"\n        height=\"110px\"\n      />\n      <div class=\"store-details-info\">\n        <div class=\"bold\">{{ selectedStore.displayName }}</div>\n        <div>{{ selectedStore.address?.line1 }}</div>\n        <div>{{ selectedStore.address?.line2 }}</div>\n        <div>{{ selectedStore.address?.town }}</div>\n      </div>\n    </div>\n    <div\n      class=\"store-openings\"\n      *ngIf=\"selectedStore?.openingHours as openingHours\"\n    >\n      <div\n        class=\"store-openings-dates\"\n        *ngIf=\"openingHours.weekDayOpeningList as weekDayOpeningList\"\n      >\n        <div\n          class=\"store-openings-date\"\n          *ngFor=\"let opening of weekDayOpeningList\"\n        >\n          <span class=\"store-openings-day bold\">{{ opening.weekDay }}</span\n          >{{ getStoreOpening(opening) | async }}\n        </div>\n      </div>\n      <div\n        class=\"store-openings-dates\"\n        *ngIf=\"openingHours.specialDayOpeningList as specialDayOpeningList\"\n      >\n        <div\n          class=\"store-openings-date\"\n          *ngFor=\"let opening of specialDayOpeningList\"\n        >\n          <span class=\"store-openings-day bold\">{{ opening.name }}</span\n          >{{ getStoreOpening(opening) | async }}\n        </div>\n      </div>\n      <div class=\"store-openings-features\">\n        <div *ngFor=\"let feature of selectedStore.features?.entry\">\n          {{ feature.value }}\n        </div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }, { type: i0.ChangeDetectorRef }, { type: i2$1.StoreFinderService }, { type: i3$2.TranslationService }, { type: i2$1.StoreFinderConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360MapComponentModule {
}
AsmCustomer360MapComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360MapComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360MapComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360MapComponentModule, declarations: [AsmCustomer360MapComponent], imports: [CommonModule, I18nModule], exports: [AsmCustomer360MapComponent] });
AsmCustomer360MapComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360MapComponentModule, imports: [CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360MapComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule],
                    declarations: [AsmCustomer360MapComponent],
                    exports: [AsmCustomer360MapComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProductInterestsComponent {
    constructor(sectionContext, productService) {
        this.sectionContext = sectionContext;
        this.productService = productService;
        this.products$ = this.sectionContext.data$.pipe(concatMap((interestList) => {
            if (!interestList?.customerProductInterests?.length) {
                return of([]);
            }
            else {
                return forkJoin(interestList.customerProductInterests.map((interest) => {
                    return this.productService
                        .get(interest.product.code, "details" /* ProductScope.DETAILS */)
                        .pipe(filter((product) => Boolean(product)), take(1));
                }));
            }
        }));
    }
}
AsmCustomer360ProductInterestsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsComponent, deps: [{ token: AsmCustomer360SectionContext }, { token: i3$2.ProductService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360ProductInterestsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360ProductInterestsComponent, selector: "cx-asm-customer-360-product-interests", ngImport: i0, template: "<cx-asm-customer-360-product-listing\n  *ngIf=\"products$ | async as products\"\n  [emptyResultDescription]=\"\n    'asmCustomer360.productInterests.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.productInterests.header' | cxTranslate\"\n  [products]=\"products\"\n  (clickHeader)=\"sectionContext.navigate$.next({ cxRoute: 'myInterests' })\"\n  (selectProduct)=\"\n    sectionContext.navigate$.next({ cxRoute: 'product', params: $event })\n  \"\n>\n</cx-asm-customer-360-product-listing>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AsmCustomer360ProductListingComponent, selector: "cx-asm-customer-360-product-listing", inputs: ["emptyResultDescription", "headerInactive", "headerText", "products", "headerTemplate"], outputs: ["clickHeader", "selectProduct"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-product-interests', template: "<cx-asm-customer-360-product-listing\n  *ngIf=\"products$ | async as products\"\n  [emptyResultDescription]=\"\n    'asmCustomer360.productInterests.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.productInterests.header' | cxTranslate\"\n  [products]=\"products\"\n  (clickHeader)=\"sectionContext.navigate$.next({ cxRoute: 'myInterests' })\"\n  (selectProduct)=\"\n    sectionContext.navigate$.next({ cxRoute: 'product', params: $event })\n  \"\n>\n</cx-asm-customer-360-product-listing>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }, { type: i3$2.ProductService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProductInterestsModule {
}
AsmCustomer360ProductInterestsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ProductInterestsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsModule, declarations: [AsmCustomer360ProductInterestsComponent], imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule], exports: [AsmCustomer360ProductInterestsComponent] });
AsmCustomer360ProductInterestsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsModule, imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductInterestsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule],
                    declarations: [AsmCustomer360ProductInterestsComponent],
                    exports: [AsmCustomer360ProductInterestsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProductReviewsComponent {
    constructor(asmCustomer360Config, context, datePipe, translation) {
        this.asmCustomer360Config = asmCustomer360Config;
        this.context = context;
        this.datePipe = datePipe;
        this.translation = translation;
        this.reviewColumns = [
            {
                property: 'item',
                i18nTextKey: 'asmCustomer360.productReviews.columnHeaders.item',
                navigatable: true,
                headerTextAlign: CustomerTableTextAlign.START,
                textAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'dateAndStatus',
                i18nTextKey: 'asmCustomer360.productReviews.columnHeaders.dateAndStatus',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'rating',
                i18nTextKey: 'asmCustomer360.productReviews.columnHeaders.rating',
                renderAsStarRating: true,
            },
            {
                property: 'reviewText',
                i18nTextKey: 'asmCustomer360.productReviews.columnHeaders.review',
                headerTextAlign: CustomerTableTextAlign.START,
            },
        ];
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.reviewEntries$ = combineLatest([
            this.context.data$,
            this.translation.translate('asmCustomer360.productReviews.sku'),
        ]).pipe(map(([data, skuLabel]) => {
            return data.reviews.map((entry) => ({
                ...entry,
                item: `${entry.productName}, ${skuLabel}: ${entry.productCode}`,
                dateAndStatus: `${this.getLongDate(new Date(entry.createdAt))} / ${entry.localizedReviewStatus}`,
            }));
        }));
    }
    navigateTo(entry) {
        const params = {
            name: entry.productName,
            code: entry.productCode,
        };
        this.context.navigate$.next({ cxRoute: 'product', params });
    }
    getLongDate(date) {
        return date
            ? this.datePipe.transform(date, this.asmCustomer360Config?.asmCustomer360?.dateTimeFormat) ?? ''
            : '';
    }
}
AsmCustomer360ProductReviewsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductReviewsComponent, deps: [{ token: AsmCustomer360Config }, { token: AsmCustomer360SectionContext }, { token: i3$2.CxDatePipe }, { token: i3$2.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360ProductReviewsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360ProductReviewsComponent, selector: "cx-asm-customer-360-product-reviews", providers: [CxDatePipe], ngImport: i0, template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"\n    'asmCustomer360.productReviews.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.productReviews.header' | cxTranslate\"\n  sortProperty=\"dateAndStatus\"\n  [columns]=\"reviewColumns\"\n  [entries]=\"reviewEntries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"navigateTo($event)\"\n></cx-asm-customer-360-table>\n", dependencies: [{ kind: "component", type: AsmCustomer360TableComponent, selector: "cx-asm-customer-360-table", inputs: ["columns", "emptyStateText", "entries", "headerText", "pageSize", "sortProperty"], outputs: ["selectItem"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductReviewsComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-product-reviews', providers: [CxDatePipe], template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"\n    'asmCustomer360.productReviews.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.productReviews.header' | cxTranslate\"\n  sortProperty=\"dateAndStatus\"\n  [columns]=\"reviewColumns\"\n  [entries]=\"reviewEntries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"navigateTo($event)\"\n></cx-asm-customer-360-table>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360Config }, { type: AsmCustomer360SectionContext }, { type: i3$2.CxDatePipe }, { type: i3$2.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProductReviewsComponentModule {
}
AsmCustomer360ProductReviewsComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductReviewsComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ProductReviewsComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductReviewsComponentModule, declarations: [AsmCustomer360ProductReviewsComponent], imports: [CommonModule, AsmCustomer360TableModule, I18nModule], exports: [AsmCustomer360ProductReviewsComponent] });
AsmCustomer360ProductReviewsComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductReviewsComponentModule, imports: [CommonModule, AsmCustomer360TableModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProductReviewsComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmCustomer360TableModule, I18nModule],
                    declarations: [AsmCustomer360ProductReviewsComponent],
                    exports: [AsmCustomer360ProductReviewsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProfileComponent {
    constructor(sectionContext, translation) {
        this.sectionContext = sectionContext;
        this.translation = translation;
        this.focusConfig = {
            trap: true,
            block: true,
            autofocus: 'customer-list-selector',
            focusOnEscape: true,
        };
        this.iconTypes = ICON_TYPE;
    }
    ngOnInit() {
        this.customerProfileData$ = this.sectionContext.data$.pipe(map((data) => {
            return data?.profile;
        }));
    }
    getCardContent({ defaultPayment, expiryMonth, expiryYear, cardNumber, cardType, }) {
        return combineLatest([
            this.translation.translate('paymentCard.expires', {
                month: expiryMonth,
                year: expiryYear,
            }),
            this.translation.translate('paymentCard.defaultPaymentMethod'),
        ]).pipe(map(([textExpires, textDefaultPaymentMethod]) => {
            const card = {
                role: 'region',
                header: defaultPayment ? textDefaultPaymentMethod : undefined,
                text: [cardNumber ?? '', textExpires],
                img: this.getCardIcon(cardType?.code ?? ''),
                label: defaultPayment
                    ? 'paymentCard.defaultPaymentLabel'
                    : 'paymentCard.additionalPaymentLabel',
            };
            return card;
        }));
    }
    getCardIcon(code) {
        let ccIcon;
        if (code === PaymentCardCode.VISA) {
            ccIcon = this.iconTypes.VISA;
        }
        else if (code === PaymentCardCode.MASTER ||
            code === PaymentCardCode.MASTERCARD_EUROCARD) {
            ccIcon = this.iconTypes.MASTER_CARD;
        }
        else if (code === PaymentCardCode.DINERS) {
            ccIcon = this.iconTypes.DINERS_CLUB;
        }
        else if (code === PaymentCardCode.AMEX) {
            ccIcon = this.iconTypes.AMEX;
        }
        else {
            ccIcon = this.iconTypes.CREDIT_CARD;
        }
        return ccIcon;
    }
}
AsmCustomer360ProfileComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileComponent, deps: [{ token: AsmCustomer360SectionContext }, { token: i3$2.TranslationService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360ProfileComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360ProfileComponent, selector: "cx-asm-customer-360-profile", ngImport: i0, template: "<div class=\"cx-asm-customer-360-profile\">\n  <ng-container *ngIf=\"customerProfileData$ | async as customerProfileData\">\n    <div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <h4 class=\"mt-4 mb-3\">\n            {{ 'asmCustomer360.profile.address' | cxTranslate }}\n          </h4>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <h5 class=\"cx-asm-profile-subheader\">\n            {{ 'asmCustomer360.profile.billingAddress' | cxTranslate }}\n          </h5>\n          <div class=\"cx-asm-profile-container billing-address\">\n            <ng-container\n              *ngTemplateOutlet=\"\n                address;\n                context: { address: customerProfileData?.billingAddress }\n              \"\n            ></ng-container>\n          </div>\n        </div>\n        <div class=\"col\">\n          <h5 class=\"cx-asm-profile-subheader\">\n            {{ 'asmCustomer360.profile.deliveryAddress' | cxTranslate }}\n          </h5>\n          <div class=\"cx-asm-profile-container delivery-address\">\n            <ng-container\n              *ngTemplateOutlet=\"\n                address;\n                context: { address: customerProfileData?.deliveryAddress }\n              \"\n            ></ng-container>\n          </div>\n        </div>\n        <div class=\"w-100 d-lg-none\"></div>\n        <div class=\"col\">\n          <h5 class=\"cx-asm-profile-subheader\">\n            {{ 'asmCustomer360.profile.phone1' | cxTranslate }}\n          </h5>\n          <div class=\"cx-asm-profile-container profile-phone1\">\n            {{ customerProfileData?.phone1 }}\n          </div>\n        </div>\n        <div class=\"col\">\n          <h5 class=\"cx-asm-profile-subheader\">\n            {{ 'asmCustomer360.profile.phone2' | cxTranslate }}\n          </h5>\n          <div class=\"cx-asm-profile-container profile-phone2\">\n            {{ customerProfileData?.phone2 }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <h4 class=\"mt-4 mb-4\">\n      {{ 'asmCustomer360.profile.paymentMethodHeader' | cxTranslate }}\n    </h4>\n    <div class=\"cx-asm-profile-cards\">\n      <div\n        class=\"cx-asm-profile-card\"\n        *ngFor=\"\n          let paymentInfoList of customerProfileData.paymentDetails;\n          let i = index\n        \"\n      >\n        <cx-card\n          [index]=\"i\"\n          [border]=\"true\"\n          [fitToContainer]=\"true\"\n          [content]=\"getCardContent(paymentInfoList) | async\"\n        ></cx-card>\n      </div>\n    </div>\n  </ng-container>\n  <ng-template #address let-address=\"address\">\n    <div class=\"cx-asm-profile-address-cell\">\n      <div class=\"address-line1\">\n        {{ address?.line1 }}\n      </div>\n      <div class=\"address-line2\">\n        {{ address?.line2 }}\n      </div>\n      <div>\n        <span class=\"address-town\" *ngIf=\"address?.town\"\n          >{{ address.town }},\n        </span>\n        <span class=\"address-region\" *ngIf=\"address?.region?.name\"\n          >{{ address.region.name }},\n        </span>\n        <span class=\"address-country\">{{ address?.country?.name }}</span>\n      </div>\n    </div>\n  </ng-template>\n</div>\n", dependencies: [{ kind: "component", type: i3$1.CardComponent, selector: "cx-card", inputs: ["border", "editMode", "isDefault", "content", "fitToContainer", "truncateText", "charactersLimit", "index"], outputs: ["deleteCard", "setDefaultCard", "sendCard", "editCard", "cancelCard"] }, { kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-customer-360-profile', template: "<div class=\"cx-asm-customer-360-profile\">\n  <ng-container *ngIf=\"customerProfileData$ | async as customerProfileData\">\n    <div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <h4 class=\"mt-4 mb-3\">\n            {{ 'asmCustomer360.profile.address' | cxTranslate }}\n          </h4>\n        </div>\n      </div>\n      <div class=\"row\">\n        <div class=\"col\">\n          <h5 class=\"cx-asm-profile-subheader\">\n            {{ 'asmCustomer360.profile.billingAddress' | cxTranslate }}\n          </h5>\n          <div class=\"cx-asm-profile-container billing-address\">\n            <ng-container\n              *ngTemplateOutlet=\"\n                address;\n                context: { address: customerProfileData?.billingAddress }\n              \"\n            ></ng-container>\n          </div>\n        </div>\n        <div class=\"col\">\n          <h5 class=\"cx-asm-profile-subheader\">\n            {{ 'asmCustomer360.profile.deliveryAddress' | cxTranslate }}\n          </h5>\n          <div class=\"cx-asm-profile-container delivery-address\">\n            <ng-container\n              *ngTemplateOutlet=\"\n                address;\n                context: { address: customerProfileData?.deliveryAddress }\n              \"\n            ></ng-container>\n          </div>\n        </div>\n        <div class=\"w-100 d-lg-none\"></div>\n        <div class=\"col\">\n          <h5 class=\"cx-asm-profile-subheader\">\n            {{ 'asmCustomer360.profile.phone1' | cxTranslate }}\n          </h5>\n          <div class=\"cx-asm-profile-container profile-phone1\">\n            {{ customerProfileData?.phone1 }}\n          </div>\n        </div>\n        <div class=\"col\">\n          <h5 class=\"cx-asm-profile-subheader\">\n            {{ 'asmCustomer360.profile.phone2' | cxTranslate }}\n          </h5>\n          <div class=\"cx-asm-profile-container profile-phone2\">\n            {{ customerProfileData?.phone2 }}\n          </div>\n        </div>\n      </div>\n    </div>\n    <h4 class=\"mt-4 mb-4\">\n      {{ 'asmCustomer360.profile.paymentMethodHeader' | cxTranslate }}\n    </h4>\n    <div class=\"cx-asm-profile-cards\">\n      <div\n        class=\"cx-asm-profile-card\"\n        *ngFor=\"\n          let paymentInfoList of customerProfileData.paymentDetails;\n          let i = index\n        \"\n      >\n        <cx-card\n          [index]=\"i\"\n          [border]=\"true\"\n          [fitToContainer]=\"true\"\n          [content]=\"getCardContent(paymentInfoList) | async\"\n        ></cx-card>\n      </div>\n    </div>\n  </ng-container>\n  <ng-template #address let-address=\"address\">\n    <div class=\"cx-asm-profile-address-cell\">\n      <div class=\"address-line1\">\n        {{ address?.line1 }}\n      </div>\n      <div class=\"address-line2\">\n        {{ address?.line2 }}\n      </div>\n      <div>\n        <span class=\"address-town\" *ngIf=\"address?.town\"\n          >{{ address.town }},\n        </span>\n        <span class=\"address-region\" *ngIf=\"address?.region?.name\"\n          >{{ address.region.name }},\n        </span>\n        <span class=\"address-country\">{{ address?.country?.name }}</span>\n      </div>\n    </div>\n  </ng-template>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }, { type: i3$2.TranslationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ProfileModule {
}
AsmCustomer360ProfileModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ProfileModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileModule, declarations: [AsmCustomer360ProfileComponent], imports: [CardModule, CommonModule, I18nModule], exports: [AsmCustomer360ProfileComponent] });
AsmCustomer360ProfileModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileModule, imports: [CardModule, CommonModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ProfileModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CardModule, CommonModule, I18nModule],
                    declarations: [AsmCustomer360ProfileComponent],
                    exports: [AsmCustomer360ProfileComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360SavedCartComponent {
    constructor(sectionContext, productService) {
        this.sectionContext = sectionContext;
        this.productService = productService;
        this.savedCart$ = this.sectionContext.data$.pipe(map((cart) => {
            return cart.savedCart;
        }));
        this.productItems$ = this.savedCart$.pipe(concatMap((cart) => {
            if (!cart?.entries?.length) {
                return of([]);
            }
            else {
                return forkJoin(cart.entries.map((entry) => {
                    return this.productService
                        .get(entry.productCode, "details" /* ProductScope.DETAILS */)
                        .pipe(filter((product) => Boolean(product)), map((product) => {
                        return {
                            ...product,
                            quantity: entry.quantity,
                            basePrice: entry.basePrice,
                            totalPrice: entry.totalPrice,
                        };
                    }), take(1));
                }));
            }
        }));
    }
}
AsmCustomer360SavedCartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SavedCartComponent, deps: [{ token: AsmCustomer360SectionContext }, { token: i3$2.ProductService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360SavedCartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360SavedCartComponent, selector: "cx-asm-customer-360-saved-cart", ngImport: i0, template: "<cx-asm-customer-360-product-listing\n  *ngIf=\"productItems$ | async as productItems\"\n  [emptyResultDescription]=\"\n    'asmCustomer360.savedCart.emptyDescription' | cxTranslate\n  \"\n  [headerInactive]=\"true\"\n  [headerTemplate]=\"headerTemplate\"\n  [headerText]=\"'asmCustomer360.savedCart.header' | cxTranslate\"\n  [products]=\"productItems\"\n  (selectProduct)=\"\n    sectionContext.navigate$.next({ cxRoute: 'product', params: $event })\n  \"\n>\n</cx-asm-customer-360-product-listing>\n\n<ng-template #headerTemplate>\n  <ng-container *ngIf=\"savedCart$ | async as savedCart\">\n    <button\n      [attr.aria-label]=\"\n        'asmCustomer360.savedCart.aria.linkLabel'\n          | cxTranslate: { code: savedCart.code }\n      \"\n      class=\"cx-overview-title-link link\"\n      (click)=\"\n        sectionContext.navigate$.next({\n          cxRoute: 'savedCartsDetails',\n          params: { savedCartId: savedCart?.code }\n        })\n      \"\n    >\n      {{ savedCart.code }}\n    </button>\n    <div class=\"cart-total-no-items\">\n      {{\n        'asmCustomer360.productListing.totalNoItems'\n          | cxTranslate: { count: savedCart.totalItemCount }\n      }}\n    </div>\n    <div class=\"cart-divider\"></div>\n    <div class=\"cart-total-price\">\n      {{\n        'asmCustomer360.productListing.totalPrice'\n          | cxTranslate: { price: savedCart.totalPrice }\n      }}\n    </div>\n  </ng-container>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: AsmCustomer360ProductListingComponent, selector: "cx-asm-customer-360-product-listing", inputs: ["emptyResultDescription", "headerInactive", "headerText", "products", "headerTemplate"], outputs: ["clickHeader", "selectProduct"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SavedCartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-asm-customer-360-saved-cart', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-asm-customer-360-product-listing\n  *ngIf=\"productItems$ | async as productItems\"\n  [emptyResultDescription]=\"\n    'asmCustomer360.savedCart.emptyDescription' | cxTranslate\n  \"\n  [headerInactive]=\"true\"\n  [headerTemplate]=\"headerTemplate\"\n  [headerText]=\"'asmCustomer360.savedCart.header' | cxTranslate\"\n  [products]=\"productItems\"\n  (selectProduct)=\"\n    sectionContext.navigate$.next({ cxRoute: 'product', params: $event })\n  \"\n>\n</cx-asm-customer-360-product-listing>\n\n<ng-template #headerTemplate>\n  <ng-container *ngIf=\"savedCart$ | async as savedCart\">\n    <button\n      [attr.aria-label]=\"\n        'asmCustomer360.savedCart.aria.linkLabel'\n          | cxTranslate: { code: savedCart.code }\n      \"\n      class=\"cx-overview-title-link link\"\n      (click)=\"\n        sectionContext.navigate$.next({\n          cxRoute: 'savedCartsDetails',\n          params: { savedCartId: savedCart?.code }\n        })\n      \"\n    >\n      {{ savedCart.code }}\n    </button>\n    <div class=\"cart-total-no-items\">\n      {{\n        'asmCustomer360.productListing.totalNoItems'\n          | cxTranslate: { count: savedCart.totalItemCount }\n      }}\n    </div>\n    <div class=\"cart-divider\"></div>\n    <div class=\"cart-total-price\">\n      {{\n        'asmCustomer360.productListing.totalPrice'\n          | cxTranslate: { price: savedCart.totalPrice }\n      }}\n    </div>\n  </ng-container>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }, { type: i3$2.ProductService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360SavedCartModule {
}
AsmCustomer360SavedCartModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SavedCartModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360SavedCartModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SavedCartModule, declarations: [AsmCustomer360SavedCartComponent], imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule], exports: [AsmCustomer360SavedCartComponent] });
AsmCustomer360SavedCartModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SavedCartModule, imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SavedCartModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, I18nModule, AsmCustomer360ProductListingModule],
                    declarations: [AsmCustomer360SavedCartComponent],
                    exports: [AsmCustomer360SavedCartComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360SupportTicketsComponent {
    constructor(context) {
        this.context = context;
        this.supportTicketsColumns = [
            {
                property: 'id',
                i18nTextKey: 'asmCustomer360.supportTickets.columnHeaders.id',
                navigatable: true,
                headerTextAlign: CustomerTableTextAlign.START,
                textAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'subject',
                i18nTextKey: 'asmCustomer360.supportTickets.columnHeaders.headline',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'categoryLabel',
                i18nTextKey: 'asmCustomer360.supportTickets.columnHeaders.category',
                headerTextAlign: CustomerTableTextAlign.START,
            },
            {
                property: 'createdAt',
                i18nTextKey: 'asmCustomer360.activity.created',
                isDate: true,
            },
            {
                property: 'updatedAt',
                i18nTextKey: 'asmCustomer360.activity.updated',
                isDate: true,
            },
            {
                property: 'statusLabel',
                i18nTextKey: 'asmCustomer360.activity.status',
                headerTextAlign: CustomerTableTextAlign.START,
            },
        ];
    }
    ngOnInit() {
        this.supportTicketsEntries$ = this.context.data$.pipe(map((data) => {
            return (data?.tickets?.map((entry) => {
                return {
                    ...entry,
                    statusLabel: entry.status.name,
                    categoryLabel: entry.category.name,
                };
            }) ?? []);
        }));
    }
    navigateTo(entry) {
        if (entry) {
            this.context.navigate$.next({
                cxRoute: 'supportTicketDetails',
                params: { ticketCode: entry.id },
            });
        }
    }
}
AsmCustomer360SupportTicketsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SupportTicketsComponent, deps: [{ token: AsmCustomer360SectionContext }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360SupportTicketsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360SupportTicketsComponent, selector: "cx-asm-customer-360-support-tickets", ngImport: i0, template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"\n    'asmCustomer360.supportTickets.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.supportTickets.header' | cxTranslate\"\n  sortProperty=\"createdAt\"\n  [columns]=\"supportTicketsColumns\"\n  [entries]=\"supportTicketsEntries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"navigateTo($event)\"\n></cx-asm-customer-360-table>\n", dependencies: [{ kind: "component", type: AsmCustomer360TableComponent, selector: "cx-asm-customer-360-table", inputs: ["columns", "emptyStateText", "entries", "headerText", "pageSize", "sortProperty"], outputs: ["selectItem"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SupportTicketsComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-support-tickets', template: "<cx-asm-customer-360-table\n  [emptyStateText]=\"\n    'asmCustomer360.supportTickets.emptyDescription' | cxTranslate\n  \"\n  [headerText]=\"'asmCustomer360.supportTickets.header' | cxTranslate\"\n  sortProperty=\"createdAt\"\n  [columns]=\"supportTicketsColumns\"\n  [entries]=\"supportTicketsEntries$ | async\"\n  [pageSize]=\"(context.config$ | async)?.pageSize\"\n  (selectItem)=\"navigateTo($event)\"\n></cx-asm-customer-360-table>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360SupportTicketsComponentModule {
}
AsmCustomer360SupportTicketsComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SupportTicketsComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360SupportTicketsComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SupportTicketsComponentModule, declarations: [AsmCustomer360SupportTicketsComponent], imports: [CommonModule, AsmCustomer360TableModule, I18nModule], exports: [AsmCustomer360SupportTicketsComponent] });
AsmCustomer360SupportTicketsComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SupportTicketsComponentModule, imports: [CommonModule, AsmCustomer360TableModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360SupportTicketsComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmCustomer360TableModule, I18nModule],
                    declarations: [AsmCustomer360SupportTicketsComponent],
                    exports: [AsmCustomer360SupportTicketsComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360PromotionListingComponent {
    constructor() {
        this.apply = new EventEmitter();
        this.remove = new EventEmitter();
        this.removeAlert = new EventEmitter();
        this.removeAlertForApplyAction = new EventEmitter();
        this.globalMessageType = GlobalMessageType;
    }
}
AsmCustomer360PromotionListingComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionListingComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360PromotionListingComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360PromotionListingComponent, selector: "cx-asm-customer-360-promotion-listing", inputs: { headerText: "headerText", emptyStateText: "emptyStateText", applyButtonText: "applyButtonText", applied: "applied", removeButtonText: "removeButtonText", entries: "entries", showAlert: "showAlert", showAlertForApplyAction: "showAlertForApplyAction", showRemoveButton: "showRemoveButton", showApplyButton: "showApplyButton", isCustomerCoupon: "isCustomerCoupon" }, outputs: { apply: "apply", remove: "remove", removeAlert: "removeAlert", removeAlertForApplyAction: "removeAlertForApplyAction" }, ngImport: i0, template: "<div class=\"cx-asm-customer-360-promotion-listing-heading\" *ngIf=\"headerText\">\n  <h4 class=\"cx-asm-customer-360-promotion-listing-heading-text\">\n    {{ headerText }}\n  </h4>\n</div>\n<ng-content></ng-content>\n<div class=\"message-container\">\n  <cx-message\n    *ngIf=\"showAlert\"\n    [text]=\"'asmCustomer360.alertErrorMessage' | cxTranslate\"\n    [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n    (closeMessage)=\"removeAlert.emit()\"\n  ></cx-message>\n  <cx-message\n    *ngIf=\"showAlertForApplyAction\"\n    [text]=\"'asmCustomer360.applyActionAlter' | cxTranslate\"\n    [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n    (closeMessage)=\"removeAlertForApplyAction.emit()\"\n  ></cx-message>\n</div>\n<table class=\"cx-asm-customer-360-promotion-listing\">\n  <caption class=\"cx-visually-hidden\">\n    {{\n      headerText\n    }}\n  </caption>\n  <thead class=\"cx-visually-hidden\">\n    <tr>\n      <th role=\"columnheader\">\n        {{ 'asmCustomer360.promotions.headerName' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\">\n        {{ 'asmCustomer360.promotions.headerAction' | cxTranslate }}\n      </th>\n    </tr>\n  </thead>\n  <ng-container *ngFor=\"let entry of entries\">\n    <tr class=\"cx-asm-customer-360-promotion-listing-row\">\n      <td>\n        <tr\n          class=\"cx-asm-customer-360-promotion-listing-subheader\"\n          tabindex=\"-1\"\n        >\n          {{\n            entry.code\n          }}\n        </tr>\n        <tr class=\"cx-asm-customer-360-promotion-listing-description\">\n          {{\n            entry.name\n          }}\n        </tr>\n      </td>\n      <td>\n        <ng-container *ngIf=\"!entry.applied\">\n          <button\n            *ngIf=\"showApplyButton\"\n            class=\"cx-asm-customer-360-promotion-listing-apply-button\"\n            (click)=\"apply.emit(entry)\"\n          >\n            {{ applyButtonText }}\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"entry.applied\">\n          <tr class=\"cx-asm-customer-360-promotion-listing-action\">\n            <ng-container *ngIf=\"!isCustomerCoupon\">\n              <td>\n                <cx-icon class=\"success\" type=\"SUCCESS\"></cx-icon>\n              </td>\n              <td class=\"cx-asm-customer-360-promotion-listing-applied\">\n                {{ applied }}\n              </td>\n              <td\n                *ngIf=\"showRemoveButton\"\n                class=\"cx-asm-customer-360-promotion-listing-action-separator\"\n              >\n                |\n              </td>\n            </ng-container>\n            <td *ngIf=\"showRemoveButton\">\n              <button\n                class=\"cx-asm-customer-360-promotion-listing-remove-button\"\n                (click)=\"remove.emit(entry)\"\n              >\n                {{ removeButtonText }}\n              </button>\n            </td>\n          </tr>\n        </ng-container>\n      </td>\n    </tr>\n  </ng-container>\n</table>\n<hr\n  class=\"cx-asm-customer-360-promotion-listing-separator\"\n  aria-hidden=\"true\"\n  *ngIf=\"!showAlert\"\n/>\n<div\n  class=\"cx-asm-customer-360-promotion-listing-empty\"\n  *ngIf=\"entries?.length === 0 && !showAlert\"\n>\n  {{ emptyStateText }}\n</div>\n", dependencies: [{ kind: "directive", type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3$1.MessageComponent, selector: "cx-message", inputs: ["text", "actionButtonText", "actionButtonMessage", "accordionText", "showBody", "isVisibleCloseButton", "type"], outputs: ["closeMessage", "buttonAction"] }, { kind: "component", type: i3$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionListingComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-promotion-listing', template: "<div class=\"cx-asm-customer-360-promotion-listing-heading\" *ngIf=\"headerText\">\n  <h4 class=\"cx-asm-customer-360-promotion-listing-heading-text\">\n    {{ headerText }}\n  </h4>\n</div>\n<ng-content></ng-content>\n<div class=\"message-container\">\n  <cx-message\n    *ngIf=\"showAlert\"\n    [text]=\"'asmCustomer360.alertErrorMessage' | cxTranslate\"\n    [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n    (closeMessage)=\"removeAlert.emit()\"\n  ></cx-message>\n  <cx-message\n    *ngIf=\"showAlertForApplyAction\"\n    [text]=\"'asmCustomer360.applyActionAlter' | cxTranslate\"\n    [type]=\"globalMessageType.MSG_TYPE_ERROR\"\n    (closeMessage)=\"removeAlertForApplyAction.emit()\"\n  ></cx-message>\n</div>\n<table class=\"cx-asm-customer-360-promotion-listing\">\n  <caption class=\"cx-visually-hidden\">\n    {{\n      headerText\n    }}\n  </caption>\n  <thead class=\"cx-visually-hidden\">\n    <tr>\n      <th role=\"columnheader\">\n        {{ 'asmCustomer360.promotions.headerName' | cxTranslate }}\n      </th>\n      <th role=\"columnheader\">\n        {{ 'asmCustomer360.promotions.headerAction' | cxTranslate }}\n      </th>\n    </tr>\n  </thead>\n  <ng-container *ngFor=\"let entry of entries\">\n    <tr class=\"cx-asm-customer-360-promotion-listing-row\">\n      <td>\n        <tr\n          class=\"cx-asm-customer-360-promotion-listing-subheader\"\n          tabindex=\"-1\"\n        >\n          {{\n            entry.code\n          }}\n        </tr>\n        <tr class=\"cx-asm-customer-360-promotion-listing-description\">\n          {{\n            entry.name\n          }}\n        </tr>\n      </td>\n      <td>\n        <ng-container *ngIf=\"!entry.applied\">\n          <button\n            *ngIf=\"showApplyButton\"\n            class=\"cx-asm-customer-360-promotion-listing-apply-button\"\n            (click)=\"apply.emit(entry)\"\n          >\n            {{ applyButtonText }}\n          </button>\n        </ng-container>\n        <ng-container *ngIf=\"entry.applied\">\n          <tr class=\"cx-asm-customer-360-promotion-listing-action\">\n            <ng-container *ngIf=\"!isCustomerCoupon\">\n              <td>\n                <cx-icon class=\"success\" type=\"SUCCESS\"></cx-icon>\n              </td>\n              <td class=\"cx-asm-customer-360-promotion-listing-applied\">\n                {{ applied }}\n              </td>\n              <td\n                *ngIf=\"showRemoveButton\"\n                class=\"cx-asm-customer-360-promotion-listing-action-separator\"\n              >\n                |\n              </td>\n            </ng-container>\n            <td *ngIf=\"showRemoveButton\">\n              <button\n                class=\"cx-asm-customer-360-promotion-listing-remove-button\"\n                (click)=\"remove.emit(entry)\"\n              >\n                {{ removeButtonText }}\n              </button>\n            </td>\n          </tr>\n        </ng-container>\n      </td>\n    </tr>\n  </ng-container>\n</table>\n<hr\n  class=\"cx-asm-customer-360-promotion-listing-separator\"\n  aria-hidden=\"true\"\n  *ngIf=\"!showAlert\"\n/>\n<div\n  class=\"cx-asm-customer-360-promotion-listing-empty\"\n  *ngIf=\"entries?.length === 0 && !showAlert\"\n>\n  {{ emptyStateText }}\n</div>\n" }]
        }], propDecorators: { headerText: [{
                type: Input
            }], emptyStateText: [{
                type: Input
            }], applyButtonText: [{
                type: Input
            }], applied: [{
                type: Input
            }], removeButtonText: [{
                type: Input
            }], entries: [{
                type: Input
            }], showAlert: [{
                type: Input
            }], showAlertForApplyAction: [{
                type: Input
            }], showRemoveButton: [{
                type: Input
            }], showApplyButton: [{
                type: Input
            }], isCustomerCoupon: [{
                type: Input
            }], apply: [{
                type: Output
            }], remove: [{
                type: Output
            }], removeAlert: [{
                type: Output
            }], removeAlertForApplyAction: [{
                type: Output
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360CouponComponent {
    constructor(context, cartVoucherService, userIdService, activeCartFacade, asmCustomer360Facade) {
        this.context = context;
        this.cartVoucherService = cartVoucherService;
        this.userIdService = userIdService;
        this.activeCartFacade = activeCartFacade;
        this.asmCustomer360Facade = asmCustomer360Facade;
        this.showErrorAlert$ = new BehaviorSubject(false);
        this.showErrorAlertForApplyAction$ = new BehaviorSubject(false);
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.userIdService.getUserId().subscribe((user) => {
            this.userId = user ?? '';
        }));
        this.subscription.add(this.activeCartFacade.requireLoadedCart().subscribe((cart) => {
            this.currentCartId = cart?.code;
        }));
        this.subscription.add(this.cartVoucherService.getAddVoucherResultError().subscribe((error) => {
            if (error) {
                this.refreshComponent();
                this.showErrorAlertForApplyAction$.next(true);
            }
        }));
        this.showErrorAlert$.next(false);
        this.showErrorAlertForApplyAction$.next(false);
        this.fetchCoupons();
    }
    fetchCoupons() {
        this.entries$ = this.context.data$.pipe(map((data) => {
            const entries = [];
            data.coupons.forEach((coupon) => {
                entries.push({
                    ...coupon,
                });
            });
            return entries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    closeErrorAlert() {
        this.showErrorAlert$.next(false);
    }
    closeErrorAlertForApplyAction() {
        this.showErrorAlertForApplyAction$.next(false);
    }
    refreshComponent() {
        this.entries$ = this.asmCustomer360Facade
            .get360Data([
            {
                requestData: { type: AsmCustomer360Type.COUPON_LIST },
            },
        ])
            .pipe(map((response) => {
            const couponList = response?.value?.find((item) => item.type === AsmCustomer360Type.COUPON_LIST);
            const newEntries = [];
            if (couponList.coupons) {
                couponList.coupons.forEach((coupon) => {
                    newEntries.push({
                        ...coupon,
                    });
                });
            }
            return newEntries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    applyCouponToCustomer(entry) {
        this.cartVoucherService.addVoucher(entry?.code, this.currentCartId);
        this.refreshActionButton(true, entry?.code);
    }
    removeCouponToCustomer(entry) {
        this.cartVoucherService.removeVoucher(entry?.code, this.currentCartId);
        this.refreshActionButton(false, entry?.code);
    }
    refreshActionButton(state, voucherCode) {
        this.entries$ = this.entries$.pipe(map((entries) => {
            entries.forEach((item) => {
                if (item.code === voucherCode) {
                    item.applied = state;
                }
            });
            return entries;
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmCustomer360CouponComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CouponComponent, deps: [{ token: AsmCustomer360SectionContext }, { token: i2$2.CartVoucherFacade }, { token: i3$2.UserIdService }, { token: i2$2.ActiveCartFacade }, { token: i2.AsmCustomer360Facade }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360CouponComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360CouponComponent, selector: "cx-asm-customer-360-coupon", ngImport: i0, template: "<cx-asm-customer-360-promotion-listing\n  [emptyStateText]=\"'asmCustomer360.coupons.emptyDescription' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.coupons.headerText' | cxTranslate\"\n  [entries]=\"entries$ | async\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [showAlertForApplyAction]=\"showErrorAlertForApplyAction$ | async\"\n  (apply)=\"applyCouponToCustomer($event)\"\n  (remove)=\"removeCouponToCustomer($event)\"\n  (removeAlert)=\"closeErrorAlert()\"\n  (removeAlertForApplyAction)=\"closeErrorAlertForApplyAction()\"\n  [applyButtonText]=\"'asmCustomer360.coupons.applyButtonText' | cxTranslate\"\n  [applied]=\"'asmCustomer360.coupons.applied' | cxTranslate\"\n  [removeButtonText]=\"'asmCustomer360.coupons.removeButtonText' | cxTranslate\"\n  [showRemoveButton]=\"true\"\n  [showApplyButton]=\"true\"\n>\n</cx-asm-customer-360-promotion-listing>\n", dependencies: [{ kind: "component", type: AsmCustomer360PromotionListingComponent, selector: "cx-asm-customer-360-promotion-listing", inputs: ["headerText", "emptyStateText", "applyButtonText", "applied", "removeButtonText", "entries", "showAlert", "showAlertForApplyAction", "showRemoveButton", "showApplyButton", "isCustomerCoupon"], outputs: ["apply", "remove", "removeAlert", "removeAlertForApplyAction"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CouponComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-coupon', template: "<cx-asm-customer-360-promotion-listing\n  [emptyStateText]=\"'asmCustomer360.coupons.emptyDescription' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.coupons.headerText' | cxTranslate\"\n  [entries]=\"entries$ | async\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [showAlertForApplyAction]=\"showErrorAlertForApplyAction$ | async\"\n  (apply)=\"applyCouponToCustomer($event)\"\n  (remove)=\"removeCouponToCustomer($event)\"\n  (removeAlert)=\"closeErrorAlert()\"\n  (removeAlertForApplyAction)=\"closeErrorAlertForApplyAction()\"\n  [applyButtonText]=\"'asmCustomer360.coupons.applyButtonText' | cxTranslate\"\n  [applied]=\"'asmCustomer360.coupons.applied' | cxTranslate\"\n  [removeButtonText]=\"'asmCustomer360.coupons.removeButtonText' | cxTranslate\"\n  [showRemoveButton]=\"true\"\n  [showApplyButton]=\"true\"\n>\n</cx-asm-customer-360-promotion-listing>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }, { type: i2$2.CartVoucherFacade }, { type: i3$2.UserIdService }, { type: i2$2.ActiveCartFacade }, { type: i2.AsmCustomer360Facade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360PromotionListingModule {
}
AsmCustomer360PromotionListingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionListingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360PromotionListingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionListingModule, declarations: [AsmCustomer360PromotionListingComponent], imports: [CommonModule,
        I18nModule,
        ArgsModule,
        StarRatingModule,
        MessageComponentModule,
        IconModule], exports: [AsmCustomer360PromotionListingComponent] });
AsmCustomer360PromotionListingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionListingModule, imports: [CommonModule,
        I18nModule,
        ArgsModule,
        StarRatingModule,
        MessageComponentModule,
        IconModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionListingModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AsmCustomer360PromotionListingComponent],
                    exports: [AsmCustomer360PromotionListingComponent],
                    imports: [
                        CommonModule,
                        I18nModule,
                        ArgsModule,
                        StarRatingModule,
                        MessageComponentModule,
                        IconModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360CouponComponentModule {
}
AsmCustomer360CouponComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CouponComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360CouponComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CouponComponentModule, declarations: [AsmCustomer360CouponComponent], imports: [CommonModule, AsmCustomer360PromotionListingModule, I18nModule], exports: [AsmCustomer360CouponComponent] });
AsmCustomer360CouponComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CouponComponentModule, imports: [CommonModule, AsmCustomer360PromotionListingModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CouponComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmCustomer360PromotionListingModule, I18nModule],
                    declarations: [AsmCustomer360CouponComponent],
                    exports: [AsmCustomer360CouponComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360PromotionComponent {
    constructor(context, asmCustomer360Facade, activeCartFacade) {
        this.context = context;
        this.asmCustomer360Facade = asmCustomer360Facade;
        this.activeCartFacade = activeCartFacade;
        this.showErrorAlert$ = new BehaviorSubject(false);
        this.entries$ = new BehaviorSubject([]);
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.showErrorAlert$.next(false);
        this.fetchPromotions();
        this.subscription.add(this.activeCartFacade.getActiveCartId().subscribe((cartId) => {
            if (cartId && this.entries$.value.length === 0) {
                this.refreshPromotions();
            }
        }));
    }
    refreshPromotions() {
        this.asmCustomer360Facade
            .get360Data([
            {
                requestData: { type: AsmCustomer360Type.PROMOTION_LIST },
            },
        ])
            .pipe(map((response) => {
            const promotionList = response?.value?.find((item) => item.type === AsmCustomer360Type.PROMOTION_LIST);
            const newEntries = [];
            if (promotionList.promotions) {
                promotionList.promotions.forEach((promotion) => {
                    newEntries.push({
                        applied: promotion.applied,
                        code: promotion.name || '',
                        name: promotion.message,
                    });
                });
            }
            return newEntries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }))
            .subscribe((newEntries) => {
            this.entries$.next(newEntries);
        });
    }
    fetchPromotions() {
        this.context.data$
            .pipe(map((data) => {
            const entries = [];
            data.promotions.forEach((promotion) => {
                entries.push({
                    applied: promotion.applied,
                    code: promotion.name || '',
                    name: promotion.message,
                });
            });
            return entries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }))
            .subscribe((newEntries) => {
            this.entries$.next(newEntries);
        });
    }
    closeErrorAlert() {
        this.showErrorAlert$.next(false);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmCustomer360PromotionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionComponent, deps: [{ token: AsmCustomer360SectionContext }, { token: i2.AsmCustomer360Facade }, { token: i2$2.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360PromotionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360PromotionComponent, selector: "cx-asm-customer-360-promotion", ngImport: i0, template: "<cx-asm-customer-360-promotion-listing\n  [emptyStateText]=\"'asmCustomer360.promotions.emptyDescription' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.promotions.headerText' | cxTranslate\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [entries]=\"entries$ | async\"\n  [applied]=\"'asmCustomer360.promotions.applied' | cxTranslate\"\n  [showRemoveButton]=\"false\"\n  [showApplyButton]=\"false\"\n>\n</cx-asm-customer-360-promotion-listing>\n", dependencies: [{ kind: "component", type: AsmCustomer360PromotionListingComponent, selector: "cx-asm-customer-360-promotion-listing", inputs: ["headerText", "emptyStateText", "applyButtonText", "applied", "removeButtonText", "entries", "showAlert", "showAlertForApplyAction", "showRemoveButton", "showApplyButton", "isCustomerCoupon"], outputs: ["apply", "remove", "removeAlert", "removeAlertForApplyAction"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-promotion', template: "<cx-asm-customer-360-promotion-listing\n  [emptyStateText]=\"'asmCustomer360.promotions.emptyDescription' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.promotions.headerText' | cxTranslate\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [entries]=\"entries$ | async\"\n  [applied]=\"'asmCustomer360.promotions.applied' | cxTranslate\"\n  [showRemoveButton]=\"false\"\n  [showApplyButton]=\"false\"\n>\n</cx-asm-customer-360-promotion-listing>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }, { type: i2.AsmCustomer360Facade }, { type: i2$2.ActiveCartFacade }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360PromotionComponentModule {
}
AsmCustomer360PromotionComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360PromotionComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionComponentModule, declarations: [AsmCustomer360PromotionComponent], imports: [CommonModule, AsmCustomer360PromotionListingModule, I18nModule], exports: [AsmCustomer360PromotionComponent] });
AsmCustomer360PromotionComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionComponentModule, imports: [CommonModule, AsmCustomer360PromotionListingModule, I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, AsmCustomer360PromotionListingModule, I18nModule],
                    declarations: [AsmCustomer360PromotionComponent],
                    exports: [AsmCustomer360PromotionComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360CustomerCouponComponent {
    constructor(context, asmCustomer360Facade, customerCouponService) {
        this.context = context;
        this.asmCustomer360Facade = asmCustomer360Facade;
        this.customerCouponService = customerCouponService;
        this.showErrorAlert$ = new BehaviorSubject(false);
        this.showErrorAlertForApplyAction$ = new BehaviorSubject(false);
        this.subscription = new Subscription();
        this.currentTabIsAssignable = true;
        this.iconTypes = ICON_TYPE;
        this.activeTab = 0;
    }
    ngOnInit() {
        this.subscription.add(this.customerCouponService
            .getClaimCustomerCouponResultError()
            .subscribe((error) => {
            if (error) {
                this.changeTab(true);
                this.showErrorAlertForApplyAction$.next(true);
            }
        }));
        this.subscription.add(this.customerCouponService
            .getDisclaimCustomerCouponResultError()
            .subscribe((error) => {
            if (error) {
                this.changeTab(false);
                this.showErrorAlertForApplyAction$.next(true);
            }
        }));
        this.fetchCustomerCoupons();
        this.currentTabIsAssignable = true;
        this.hideAllErrorAlert();
    }
    fetchCustomerCoupons() {
        this.entries$ = this.context.data$.pipe(map((data) => {
            const entries = [];
            data.customerCoupons.forEach((customerCoupon) => {
                entries.push({
                    code: customerCoupon.name,
                    name: customerCoupon.description,
                    codeForApplyAction: customerCoupon.code,
                    applied: false,
                });
            });
            return entries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    changeTab(assignable) {
        this.currentTabIsAssignable = assignable;
        this.hideAllErrorAlert();
        this.entries$ = this.asmCustomer360Facade
            .get360Data([
            {
                requestData: {
                    type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
                    additionalRequestParameters: {
                        assignable: assignable,
                    },
                },
            },
        ])
            .pipe(map((response) => {
            return this.mapParams(assignable, response);
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    searchCustomerCoupon(searchQuery) {
        this.hideAllErrorAlert();
        this.entries$ = this.asmCustomer360Facade
            .get360Data([
            {
                requestData: {
                    type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
                    additionalRequestParameters: {
                        assignable: this.currentTabIsAssignable,
                        searchQuery: searchQuery,
                    },
                },
            },
        ])
            .pipe(map((response) => {
            return this.mapParams(this.currentTabIsAssignable, response);
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    hideAllErrorAlert() {
        this.showErrorAlert$.next(false);
        this.showErrorAlertForApplyAction$.next(false);
    }
    mapParams(applied, response) {
        const couponList = response?.value?.find((item) => item.type === AsmCustomer360Type.CUSTOMER_COUPON_LIST);
        const newEntries = [];
        if (couponList.customerCoupons) {
            couponList.customerCoupons.forEach((customerCoupon) => {
                newEntries.push({
                    code: customerCoupon.name,
                    name: customerCoupon.description,
                    codeForApplyAction: customerCoupon.code,
                    applied: !applied,
                });
            });
        }
        this.activeTab = applied ? 0 : 1;
        return newEntries;
    }
    closeErrorAlert() {
        this.showErrorAlert$.next(false);
    }
    closeErrorAlertForApplyAction() {
        this.showErrorAlertForApplyAction$.next(false);
    }
    claimCouponToCustomer(entry) {
        this.customerCouponService.claimCustomerCoupon(entry.codeForApplyAction);
        this.refreshActionButton(entry?.codeForApplyAction);
    }
    disclaimCouponToCustomer(entry) {
        this.customerCouponService.resetDisclaimCustomerCoupon();
        this.customerCouponService.disclaimCustomerCoupon(entry.codeForApplyAction);
        this.refreshActionButton(entry?.codeForApplyAction);
    }
    refreshActionButton(couponCode) {
        this.entries$ = this.entries$.pipe(map((entries) => {
            return entries.filter((item) => item.codeForApplyAction !== couponCode);
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmCustomer360CustomerCouponComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CustomerCouponComponent, deps: [{ token: AsmCustomer360SectionContext }, { token: i2.AsmCustomer360Facade }, { token: i3$2.CustomerCouponService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360CustomerCouponComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360CustomerCouponComponent, selector: "cx-asm-customer-360-customer-coupon", ngImport: i0, template: "<cx-asm-customer-360-promotion-listing\n  [headerText]=\"'asmCustomer360.customerCoupons.headerText' | cxTranslate\"\n  [emptyStateText]=\"\n    'asmCustomer360.customerCoupons.emptyDescription' | cxTranslate\n  \"\n  [applyButtonText]=\"\n    'asmCustomer360.customerCoupons.applyButtonText' | cxTranslate\n  \"\n  [applied]=\"'asmCustomer360.customerCoupons.applied' | cxTranslate\"\n  [removeButtonText]=\"\n    'asmCustomer360.customerCoupons.removeButtonText' | cxTranslate\n  \"\n  [entries]=\"entries$ | async\"\n  [showRemoveButton]=\"true\"\n  [showApplyButton]=\"true\"\n  [isCustomerCoupon]=\"true\"\n  (apply)=\"claimCouponToCustomer($event)\"\n  (remove)=\"disclaimCouponToCustomer($event)\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [showAlertForApplyAction]=\"showErrorAlertForApplyAction$ | async\"\n  (removeAlert)=\"closeErrorAlert()\"\n  (removeAlertForApplyAction)=\"closeErrorAlertForApplyAction()\"\n>\n  <ng-container>\n    <div class=\"cx-asm-customer-360-promotion-listing-tabs\">\n      <button\n        class=\"cx-tab-header\"\n        [class.active]=\"this.activeTab === 0\"\n        [textContent]=\"\n          'asmCustomer360.customerCoupons.availableTab' | cxTranslate\n        \"\n        (click)=\"this.changeTab(true); searchBox.value = ''\"\n      ></button>\n      <button\n        class=\"cx-tab-header\"\n        [class.active]=\"this.activeTab === 1\"\n        [textContent]=\"'asmCustomer360.customerCoupons.sentTab' | cxTranslate\"\n        (click)=\"this.changeTab(false); searchBox.value = ''\"\n      ></button>\n    </div>\n    <hr\n      class=\"cx-asm-customer-360-promotion-listing-separator\"\n      aria-hidden=\"true\"\n    />\n    <div class=\"cx-asm-customer-360-promotion-listing-search\">\n      <input\n        #searchBox\n        class=\"cx-asm-customer-360-promotion-listing-search-input\"\n        placeholder=\"{{\n          'asmCustomer360.customerCoupons.searchBox' | cxTranslate\n        }}\"\n        (keydown.enter)=\"this.searchCustomerCoupon(searchBox.value)\"\n      />\n      <cx-icon\n        class=\"cx-asm-customer-360-promotion-listing-search-icon-reset\"\n        [type]=\"iconTypes.CLOSE\"\n        role=\"button\"\n        (click)=\"this.searchBox.value = ''\"\n      ></cx-icon>\n      <cx-icon\n        class=\"cx-asm-customer-360-promotion-listing-search-icon-search\"\n        [type]=\"iconTypes.SEARCH\"\n        role=\"button\"\n        (click)=\"this.searchCustomerCoupon(searchBox.value)\"\n      ></cx-icon>\n    </div>\n  </ng-container>\n</cx-asm-customer-360-promotion-listing>\n", dependencies: [{ kind: "component", type: AsmCustomer360PromotionListingComponent, selector: "cx-asm-customer-360-promotion-listing", inputs: ["headerText", "emptyStateText", "applyButtonText", "applied", "removeButtonText", "entries", "showAlert", "showAlertForApplyAction", "showRemoveButton", "showApplyButton", "isCustomerCoupon"], outputs: ["apply", "remove", "removeAlert", "removeAlertForApplyAction"] }, { kind: "component", type: i3$1.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i3$2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CustomerCouponComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-customer-coupon', template: "<cx-asm-customer-360-promotion-listing\n  [headerText]=\"'asmCustomer360.customerCoupons.headerText' | cxTranslate\"\n  [emptyStateText]=\"\n    'asmCustomer360.customerCoupons.emptyDescription' | cxTranslate\n  \"\n  [applyButtonText]=\"\n    'asmCustomer360.customerCoupons.applyButtonText' | cxTranslate\n  \"\n  [applied]=\"'asmCustomer360.customerCoupons.applied' | cxTranslate\"\n  [removeButtonText]=\"\n    'asmCustomer360.customerCoupons.removeButtonText' | cxTranslate\n  \"\n  [entries]=\"entries$ | async\"\n  [showRemoveButton]=\"true\"\n  [showApplyButton]=\"true\"\n  [isCustomerCoupon]=\"true\"\n  (apply)=\"claimCouponToCustomer($event)\"\n  (remove)=\"disclaimCouponToCustomer($event)\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [showAlertForApplyAction]=\"showErrorAlertForApplyAction$ | async\"\n  (removeAlert)=\"closeErrorAlert()\"\n  (removeAlertForApplyAction)=\"closeErrorAlertForApplyAction()\"\n>\n  <ng-container>\n    <div class=\"cx-asm-customer-360-promotion-listing-tabs\">\n      <button\n        class=\"cx-tab-header\"\n        [class.active]=\"this.activeTab === 0\"\n        [textContent]=\"\n          'asmCustomer360.customerCoupons.availableTab' | cxTranslate\n        \"\n        (click)=\"this.changeTab(true); searchBox.value = ''\"\n      ></button>\n      <button\n        class=\"cx-tab-header\"\n        [class.active]=\"this.activeTab === 1\"\n        [textContent]=\"'asmCustomer360.customerCoupons.sentTab' | cxTranslate\"\n        (click)=\"this.changeTab(false); searchBox.value = ''\"\n      ></button>\n    </div>\n    <hr\n      class=\"cx-asm-customer-360-promotion-listing-separator\"\n      aria-hidden=\"true\"\n    />\n    <div class=\"cx-asm-customer-360-promotion-listing-search\">\n      <input\n        #searchBox\n        class=\"cx-asm-customer-360-promotion-listing-search-input\"\n        placeholder=\"{{\n          'asmCustomer360.customerCoupons.searchBox' | cxTranslate\n        }}\"\n        (keydown.enter)=\"this.searchCustomerCoupon(searchBox.value)\"\n      />\n      <cx-icon\n        class=\"cx-asm-customer-360-promotion-listing-search-icon-reset\"\n        [type]=\"iconTypes.CLOSE\"\n        role=\"button\"\n        (click)=\"this.searchBox.value = ''\"\n      ></cx-icon>\n      <cx-icon\n        class=\"cx-asm-customer-360-promotion-listing-search-icon-search\"\n        [type]=\"iconTypes.SEARCH\"\n        role=\"button\"\n        (click)=\"this.searchCustomerCoupon(searchBox.value)\"\n      ></cx-icon>\n    </div>\n  </ng-container>\n</cx-asm-customer-360-promotion-listing>\n" }]
        }], ctorParameters: function () { return [{ type: AsmCustomer360SectionContext }, { type: i2.AsmCustomer360Facade }, { type: i3$2.CustomerCouponService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360CustomerCouponComponentModule {
}
AsmCustomer360CustomerCouponComponentModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CustomerCouponComponentModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360CustomerCouponComponentModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CustomerCouponComponentModule, declarations: [AsmCustomer360CustomerCouponComponent], imports: [CommonModule,
        AsmCustomer360PromotionListingModule,
        I18nModule,
        IconModule,
        SearchBoxModule], exports: [AsmCustomer360CustomerCouponComponent] });
AsmCustomer360CustomerCouponComponentModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CustomerCouponComponentModule, imports: [CommonModule,
        AsmCustomer360PromotionListingModule,
        I18nModule,
        IconModule,
        SearchBoxModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CustomerCouponComponentModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AsmCustomer360PromotionListingModule,
                        I18nModule,
                        IconModule,
                        SearchBoxModule,
                    ],
                    declarations: [AsmCustomer360CustomerCouponComponent],
                    exports: [AsmCustomer360CustomerCouponComponent],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAsmCustomer360LayoutConfig = {
    launch: {
        ["ASM_CUSTOMER_360" /* LAUNCH_CALLER.ASM_CUSTOMER_360 */]: {
            inlineRoot: true,
            component: AsmCustomer360Component,
            dialogType: DIALOG_TYPE.DIALOG,
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360ComponentsModule {
}
AsmCustomer360ComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360ComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ComponentsModule, declarations: [AsmCustomer360Component, AsmCustomer360SectionComponent], imports: [CommonModule,
        StarRatingModule,
        I18nModule,
        ArgsModule,
        MediaModule,
        IconModule,
        KeyboardFocusModule,
        PageComponentModule,
        MessageComponentModule,
        AsmCustomer360ActiveCartModule,
        AsmCustomer360ProductInterestsModule,
        AsmCustomer360SavedCartModule,
        AsmCustomer360ProfileModule,
        AsmCustomer360ActivityModule,
        AsmCustomer360MapComponentModule,
        AsmCustomer360ProductReviewsComponentModule,
        AsmCustomer360SupportTicketsComponentModule,
        AsmCustomer360CouponComponentModule,
        AsmCustomer360PromotionComponentModule,
        AsmCustomer360CustomerCouponComponentModule], exports: [AsmCustomer360Component] });
AsmCustomer360ComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ComponentsModule, providers: [provideDefaultConfig(defaultAsmCustomer360LayoutConfig)], imports: [CommonModule,
        StarRatingModule,
        I18nModule,
        ArgsModule,
        MediaModule,
        IconModule,
        KeyboardFocusModule,
        PageComponentModule,
        MessageComponentModule,
        AsmCustomer360ActiveCartModule,
        AsmCustomer360ProductInterestsModule,
        AsmCustomer360SavedCartModule,
        AsmCustomer360ProfileModule,
        AsmCustomer360ActivityModule,
        AsmCustomer360MapComponentModule,
        AsmCustomer360ProductReviewsComponentModule,
        AsmCustomer360SupportTicketsComponentModule,
        AsmCustomer360CouponComponentModule,
        AsmCustomer360PromotionComponentModule,
        AsmCustomer360CustomerCouponComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360ComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        StarRatingModule,
                        I18nModule,
                        ArgsModule,
                        MediaModule,
                        IconModule,
                        KeyboardFocusModule,
                        PageComponentModule,
                        MessageComponentModule,
                        AsmCustomer360ActiveCartModule,
                        AsmCustomer360ProductInterestsModule,
                        AsmCustomer360SavedCartModule,
                        AsmCustomer360ProfileModule,
                        AsmCustomer360ActivityModule,
                        AsmCustomer360MapComponentModule,
                        AsmCustomer360ProductReviewsComponentModule,
                        AsmCustomer360SupportTicketsComponentModule,
                        AsmCustomer360CouponComponentModule,
                        AsmCustomer360PromotionComponentModule,
                        AsmCustomer360CustomerCouponComponentModule,
                    ],
                    declarations: [AsmCustomer360Component, AsmCustomer360SectionComponent],
                    exports: [AsmCustomer360Component],
                    providers: [provideDefaultConfig(defaultAsmCustomer360LayoutConfig)],
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
const defaultAsmCustomer360Config = {
    asmCustomer360: {
        dateFormat: 'MM-dd-yyyy',
        dateTimeFormat: 'dd-MM-yy hh:mm a',
        tabs: [
            {
                i18nNameKey: 'asmCustomer360.overviewTab',
                components: [
                    {
                        component: AsmCustomer360ActiveCartComponent,
                        requestData: {
                            type: AsmCustomer360Type.ACTIVE_CART,
                        },
                    },
                    {
                        component: AsmCustomer360SavedCartComponent,
                        requestData: {
                            type: AsmCustomer360Type.SAVED_CART,
                        },
                    },
                    {
                        component: AsmCustomer360ProductInterestsComponent,
                        requestData: {
                            type: AsmCustomer360Type.PRODUCT_INTEREST_LIST,
                        },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.profileTab',
                components: [
                    {
                        component: AsmCustomer360ProfileComponent,
                        requestData: {
                            type: AsmCustomer360Type.CUSTOMER_PROFILE,
                        },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.activityTab',
                components: [
                    {
                        component: AsmCustomer360ActivityComponent,
                        requestData: {
                            type: AsmCustomer360Type.ACTIVITY_LIST,
                            additionalRequestParameters: {
                                listSize: 10,
                            },
                        },
                        config: { pageSize: 5 },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.feedbackTab',
                components: [
                    {
                        component: AsmCustomer360SupportTicketsComponent,
                        requestData: {
                            type: AsmCustomer360Type.SUPPORT_TICKET_LIST,
                            additionalRequestParameters: {
                                listSize: 10,
                            },
                        },
                        config: { pageSize: 5 },
                    },
                    {
                        component: AsmCustomer360ProductReviewsComponent,
                        requestData: {
                            type: AsmCustomer360Type.REVIEW_LIST,
                            additionalRequestParameters: {
                                listSize: 10,
                            },
                        },
                        config: { pageSize: 5 },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.promotionsTab',
                components: [
                    {
                        component: AsmCustomer360CouponComponent,
                        requestData: {
                            type: AsmCustomer360Type.COUPON_LIST,
                        },
                    },
                    {
                        component: AsmCustomer360PromotionComponent,
                        requestData: {
                            type: AsmCustomer360Type.PROMOTION_LIST,
                        },
                    },
                    {
                        component: AsmCustomer360CustomerCouponComponent,
                        requestData: {
                            type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
                            additionalRequestParameters: {
                                assignable: true,
                            },
                        },
                    },
                ],
            },
            {
                i18nNameKey: 'asmCustomer360.storeLocationsTab',
                components: [
                    {
                        component: AsmCustomer360MapComponent,
                        requestData: {
                            type: AsmCustomer360Type.STORE_LOCATION,
                        },
                        config: {
                            pageSize: 10,
                        },
                    },
                ],
            },
        ],
    },
};

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
 * Generated bundle index. Do not edit.
 */

export { AsmCustomer360ActiveCartComponent, AsmCustomer360ActivityComponent, AsmCustomer360Component, AsmCustomer360ComponentsModule, AsmCustomer360Config, AsmCustomer360CouponComponent, AsmCustomer360CustomerCouponComponent, AsmCustomer360MapComponent, AsmCustomer360ProductInterestsComponent, AsmCustomer360ProductReviewsComponent, AsmCustomer360ProfileComponent, AsmCustomer360PromotionComponent, AsmCustomer360SavedCartComponent, AsmCustomer360SupportTicketsComponent, defaultAsmCustomer360Config, defaultAsmCustomer360LayoutConfig };
//# sourceMappingURL=spartacus-asm-customer-360-components.mjs.map
