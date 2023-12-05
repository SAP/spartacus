import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import { ASM_FEATURE } from '@spartacus/asm/root';
import * as i1 from '@spartacus/core';
import { getContextParameterDefault, LANGUAGE_CONTEXT_ID, CURRENCY_CONTEXT_ID, provideDefaultConfig, facadeFactory } from '@spartacus/core';
import { PageComponentModule } from '@spartacus/storefront';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const ASM_CUSTOMER_360_FEATURE = 'asmCustomer360';
const ASM_CUSTOMER_360_CORE_FEATURE = 'asmCustomer360Core';

class SiteContextInterceptor {
    constructor(languageService, currencyService, occEndpoints, config) {
        this.languageService = languageService;
        this.currencyService = currencyService;
        this.occEndpoints = occEndpoints;
        this.config = config;
        this.activeLang = getContextParameterDefault(this.config, LANGUAGE_CONTEXT_ID);
        this.activeCurr = getContextParameterDefault(this.config, CURRENCY_CONTEXT_ID);
        this.languageService
            .getActive()
            .subscribe((data) => (this.activeLang = data));
        this.currencyService.getActive().subscribe((data) => {
            this.activeCurr = data;
        });
    }
    intercept(request, next) {
        if (request.url.includes(this.occEndpoints.getBaseUrl({ prefix: false, baseSite: false })) &&
            request.url.includes('/assistedservicewebservices/')) {
            request = request.clone({
                setParams: {
                    lang: this.activeLang ?? '',
                    curr: this.activeCurr ?? '',
                },
            });
        }
        return next.handle(request);
    }
}
SiteContextInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextInterceptor, deps: [{ token: i1.LanguageService }, { token: i1.CurrencyService }, { token: i1.OccEndpointsService }, { token: i1.SiteContextConfig }], target: i0.ɵɵFactoryTarget.Injectable });
SiteContextInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SiteContextInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.LanguageService }, { type: i1.CurrencyService }, { type: i1.OccEndpointsService }, { type: i1.SiteContextConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360RootModule {
}
AsmCustomer360RootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360RootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360RootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360RootModule, imports: [PageComponentModule] });
AsmCustomer360RootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360RootModule, providers: [
        provideDefaultConfig({
            featureModules: {
                [ASM_CUSTOMER_360_FEATURE]: {
                    dependencies: [ASM_FEATURE],
                },
                [ASM_CUSTOMER_360_CORE_FEATURE]: ASM_CUSTOMER_360_FEATURE,
            },
        }),
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: SiteContextInterceptor,
            multi: true,
        },
    ], imports: [PageComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360RootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [PageComponentModule],
                    providers: [
                        provideDefaultConfig({
                            featureModules: {
                                [ASM_CUSTOMER_360_FEATURE]: {
                                    dependencies: [ASM_FEATURE],
                                },
                                [ASM_CUSTOMER_360_CORE_FEATURE]: ASM_CUSTOMER_360_FEATURE,
                            },
                        }),
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: SiteContextInterceptor,
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
class AsmCustomer360Facade {
}
AsmCustomer360Facade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Facade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomer360Facade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Facade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: AsmCustomer360Facade,
        feature: ASM_CUSTOMER_360_FEATURE,
        methods: ['get360Data'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Facade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: AsmCustomer360Facade,
                        feature: ASM_CUSTOMER_360_FEATURE,
                        methods: ['get360Data'],
                    }),
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
class AsmCustomer360SectionConfig {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360SectionData {
    constructor(data) {
        this.data = data;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360TabConfig {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomer360TabsConfig {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var AsmCustomer360Type;
(function (AsmCustomer360Type) {
    AsmCustomer360Type["REVIEW_LIST"] = "c360ReviewList";
    AsmCustomer360Type["STORE_LOCATION"] = "c360StoreLocation";
    AsmCustomer360Type["PRODUCT_INTEREST_LIST"] = "c360CustomerProductInterestList";
    AsmCustomer360Type["SUPPORT_TICKET_LIST"] = "c360TicketList";
    AsmCustomer360Type["CUSTOMER_PROFILE"] = "c360CustomerProfile";
    AsmCustomer360Type["ACTIVE_CART"] = "c360Cart";
    AsmCustomer360Type["SAVED_CART"] = "c360SavedCart";
    AsmCustomer360Type["OVERVIEW"] = "c360Overview";
    AsmCustomer360Type["ACTIVITY_LIST"] = "c360ActivityList";
    AsmCustomer360Type["COUPON_LIST"] = "c360CouponList";
    AsmCustomer360Type["PROMOTION_LIST"] = "c360PromotionList";
    AsmCustomer360Type["CUSTOMER_COUPON_LIST"] = "c360CustomerCouponList";
})(AsmCustomer360Type || (AsmCustomer360Type = {}));
var PaymentCardCode;
(function (PaymentCardCode) {
    PaymentCardCode["VISA"] = "visa";
    PaymentCardCode["MASTER"] = "master";
    PaymentCardCode["MASTERCARD_EUROCARD"] = "mastercard_eurocard";
    PaymentCardCode["DINERS"] = "diners";
    PaymentCardCode["AMEX"] = "amex";
})(PaymentCardCode || (PaymentCardCode = {}));
var KeyBoardEventCode;
(function (KeyBoardEventCode) {
    KeyBoardEventCode["ARROW_LEFT"] = "ArrowLeft";
    KeyBoardEventCode["ARROW_RIGHT"] = "ArrowRight";
    KeyBoardEventCode["ARROW_DOWN"] = "ArrowDown";
    KeyBoardEventCode["ARROW_UP"] = "ArrowUp";
    KeyBoardEventCode["HOME"] = "Home";
    KeyBoardEventCode["END"] = "End";
    KeyBoardEventCode["PAGE_DOWN"] = "PageDown";
    KeyBoardEventCode["PAGE_UP"] = "PageUp";
})(KeyBoardEventCode || (KeyBoardEventCode = {}));
var AsmDialogActionType;
(function (AsmDialogActionType) {
    AsmDialogActionType["NAVIGATE"] = "NAVIGATE";
})(AsmDialogActionType || (AsmDialogActionType = {}));

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
 * Generated bundle index. Do not edit.
 */

export { ASM_CUSTOMER_360_CORE_FEATURE, ASM_CUSTOMER_360_FEATURE, AsmCustomer360Facade, AsmCustomer360RootModule, AsmCustomer360SectionConfig, AsmCustomer360SectionData, AsmCustomer360TabConfig, AsmCustomer360TabsConfig, AsmCustomer360Type, AsmDialogActionType, KeyBoardEventCode, PaymentCardCode };
//# sourceMappingURL=spartacus-asm-customer-360-root.mjs.map
