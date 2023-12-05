import * as i0 from '@angular/core';
import { Injectable, Directive, Input, NgModule, inject, PLATFORM_ID, Inject, Component, ChangeDetectionStrategy, APP_INITIALIZER } from '@angular/core';
import * as i1 from '@spartacus/core';
import { Config, LoggerService, isNotUndefined, AuthActions, provideDefaultConfig, DeferLoadingStrategy, PageType, UrlModule, provideConfigValidator } from '@spartacus/core';
import * as i2 from '@angular/common/http';
import { HttpParams, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as i2$1 from '@angular/common';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import * as i6 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i1$1 from '@spartacus/storefront';
import { CategoryPageResultsEvent, PageEvent, SearchPageResultsEvent, ProductDetailsPageEvent, HomePageEvent, CarouselModule, MediaModule } from '@spartacus/storefront';
import { EMPTY, Subscription, merge, BehaviorSubject, fromEvent, of, combineLatest, using } from 'rxjs';
import { switchMap, take, map, shareReplay, filter, distinctUntilChanged, tap, withLatestFrom, startWith, pairwise, distinctUntilKeyChanged, debounceTime, mergeMap } from 'rxjs/operators';
import * as i3 from '@ngrx/store';
import * as i3$1 from '@spartacus/cart/base/root';
import { CartPageEvent, CartAddEntrySuccessEvent, CartRemoveEntrySuccessEvent, CartUpdateEntrySuccessEvent, MergeCartSuccessEvent } from '@spartacus/cart/base/root';
import { OrderPlacedEvent } from '@spartacus/order/root';
import * as i2$2 from '@spartacus/tracking/personalization/core';

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
class CdsConfig {
}
CdsConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CdsConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsConfig, decorators: [{
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
function cdsConfigValidator(config) {
    if (!config.cds) {
        return 'Please configure the config.cds object before using the CDS library';
    }
    if (config.cds.profileTag !== undefined) {
        if (config.cds.profileTag.configUrl === undefined ||
            config.cds.profileTag.configUrl.trim().length === 0) {
            return 'Please configure cds.profileTag.configUrl before using the CDS library';
        }
        if (config.cds.profileTag.javascriptUrl === undefined ||
            config.cds.profileTag.javascriptUrl.trim().length === 0) {
            return 'Please configure cds.profileTag.configUrl before using the CDS library';
        }
    }
    if (config.cds.tenant === undefined ||
        config.cds.tenant.trim().length === 0) {
        return 'Please configure cds.tenant before using CDS library';
    }
    if (config.cds.baseUrl === undefined) {
        return 'Please configure cds.baseUrl before using CDS library';
    }
    if (config.cds.endpoints === undefined ||
        config.cds.endpoints.strategyProducts === undefined) {
        return 'Please configure the cds.endpoints before using CDS library';
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const DEFAULT_CDS_CONFIG = {
    cds: {
        tenant: '',
        baseUrl: '',
        endpoints: {
            strategyProducts: '/strategy/${tenant}/strategies/${strategyId}/products',
        },
        merchandising: {
            defaultCarouselViewportThreshold: 80,
        },
        consentTemplateId: 'PROFILE',
        profileTag: {
            allowInsecureCookies: false,
        },
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
class DynamicTemplate {
    static resolve(templateString, templateVariables) {
        for (const variableLabel of Object.keys(templateVariables)) {
            const placeholder = new RegExp('\\${' + variableLabel + '}', 'g');
            templateString = templateString.replace(placeholder, templateVariables[variableLabel]);
        }
        return templateString;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdsEndpointsService {
    constructor(cdsConfig) {
        this.cdsConfig = cdsConfig;
    }
    getUrl(endpoint, urlParams = {}, queryParams) {
        if (this.cdsConfig?.cds?.endpoints[endpoint]) {
            endpoint = this.cdsConfig.cds.endpoints[endpoint];
        }
        if (!urlParams['tenant']) {
            urlParams['tenant'] = this.cdsConfig.cds.tenant;
        }
        Object.keys(urlParams).forEach((key) => {
            urlParams[key] = encodeURIComponent(urlParams[key]);
        });
        endpoint = DynamicTemplate.resolve(endpoint, urlParams);
        if (queryParams) {
            let httpParamsOptions;
            if (endpoint.includes('?')) {
                let queryParamsFromEndpoint;
                [endpoint, queryParamsFromEndpoint] = endpoint.split('?');
                httpParamsOptions = { fromString: queryParamsFromEndpoint };
            }
            let httpParams = new HttpParams(httpParamsOptions);
            Object.keys(queryParams).forEach((key) => {
                const value = queryParams[key];
                if (value !== undefined) {
                    if (value === null) {
                        httpParams = httpParams.delete(key);
                    }
                    else {
                        httpParams = httpParams.set(key, value);
                    }
                }
            });
            const params = httpParams.toString();
            if (params.length) {
                endpoint += '?' + params;
            }
        }
        return this.getEndpoint(endpoint);
    }
    getEndpoint(endpoint) {
        /*
         * If the endpoint to get the url for already has the configured base url appended,
         * do not try and append it again
         */
        if (endpoint.startsWith(this.getBaseEndpoint())) {
            return endpoint;
        }
        if (!endpoint.startsWith('/')) {
            endpoint = '/' + endpoint;
        }
        return `${this.getBaseEndpoint()}${endpoint}`;
    }
    getBaseEndpoint() {
        if (!this.cdsConfig || !this.cdsConfig.cds || !this.cdsConfig.cds.baseUrl) {
            return '';
        }
        return this.cdsConfig.cds.baseUrl;
    }
}
CdsEndpointsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsEndpointsService, deps: [{ token: CdsConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CdsEndpointsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsEndpointsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsEndpointsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CdsConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const STRATEGY_PRODUCTS_ENDPOINT_KEY = 'strategyProducts';
class CdsMerchandisingStrategyAdapter {
    constructor(cdsEndpointsService, http) {
        this.cdsEndpointsService = cdsEndpointsService;
        this.http = http;
    }
    loadProductsForStrategy(strategyId, strategyRequest = {}) {
        let headers = new HttpHeaders();
        if (strategyRequest.headers && strategyRequest.headers.consentReference) {
            headers = headers.set('consent-reference', strategyRequest.headers.consentReference);
        }
        return this.http.get(this.cdsEndpointsService.getUrl(STRATEGY_PRODUCTS_ENDPOINT_KEY, {
            strategyId,
        }, strategyRequest.queryParams), { headers });
    }
}
CdsMerchandisingStrategyAdapter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingStrategyAdapter, deps: [{ token: CdsEndpointsService }, { token: i2.HttpClient }], target: i0.ɵɵFactoryTarget.Injectable });
CdsMerchandisingStrategyAdapter.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingStrategyAdapter });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingStrategyAdapter, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: CdsEndpointsService }, { type: i2.HttpClient }]; } });

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
class AttributesDirective {
    set cxAttributesNamePrefix(attributesNamePrefix) {
        this._attributesNamePrefix = attributesNamePrefix;
    }
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    ngOnChanges() {
        if (this.cxAttributes) {
            for (const attributeName in this.cxAttributes) {
                if (this.cxAttributes.hasOwnProperty(attributeName)) {
                    const attributeValue = this.cxAttributes[attributeName];
                    if (attributeValue) {
                        const _attributeName = this._attributesNamePrefix
                            ? `${this._attributesNamePrefix}-${attributeName}`
                            : attributeName;
                        this.renderer.setAttribute(this.elementRef.nativeElement, _attributeName, attributeValue);
                    }
                }
            }
        }
    }
}
AttributesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AttributesDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
AttributesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: AttributesDirective, selector: "[cxAttributes]", inputs: { cxAttributes: "cxAttributes", cxAttributesNamePrefix: "cxAttributesNamePrefix" }, usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AttributesDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxAttributes]',
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { cxAttributes: [{
                type: Input
            }], cxAttributesNamePrefix: [{
                type: Input
            }] } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AttributesModule {
}
AttributesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AttributesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AttributesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AttributesModule, declarations: [AttributesDirective], imports: [CommonModule], exports: [AttributesDirective] });
AttributesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AttributesModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AttributesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [AttributesDirective],
                    exports: [AttributesDirective],
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
class MerchandisingCarouselViewedEvent {
    constructor(carouselEvent, productSkus) {
        this.name = 'CarouselViewed';
        this.data = {
            ...carouselEvent,
            productSkus,
        };
    }
}
class MerchandisingCarouselClickedEvent {
    constructor(carouselEvent, slotId, sku, imageUrl) {
        this.name = 'CarouselClicked';
        this.data = {
            ...carouselEvent,
            slotId,
            sku,
            imageUrl,
        };
    }
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
class MerchandisingStrategyAdapter {
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MerchandisingStrategyConnector {
    constructor(strategyAdapter) {
        this.strategyAdapter = strategyAdapter;
    }
    loadProductsForStrategy(strategyId, strategyRequest) {
        return this.strategyAdapter.loadProductsForStrategy(strategyId, strategyRequest);
    }
}
MerchandisingStrategyConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingStrategyConnector, deps: [{ token: MerchandisingStrategyAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
MerchandisingStrategyConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingStrategyConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingStrategyConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: MerchandisingStrategyAdapter }]; } });

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
class CdsBackendNotificationAdapter {
}

class OccBackendNotification {
    constructor(http, occEndpoints) {
        this.http = http;
        this.occEndpoints = occEndpoints;
    }
    notifySuccessfulLogin() {
        return this.http
            .post(`${this.occEndpoints.getBaseUrl()}/users/current/loginnotification`, {})
            .pipe(switchMap(() => EMPTY));
    }
}
OccBackendNotification.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBackendNotification, deps: [{ token: i2.HttpClient }, { token: i1.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
OccBackendNotification.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBackendNotification });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OccBackendNotification, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i2.HttpClient }, { type: i1.OccEndpointsService }]; } });

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
var InternalProfileTagEventNames;
(function (InternalProfileTagEventNames) {
    InternalProfileTagEventNames["CONSENT_REFERENCE_LOADED"] = "profiletag_consentReferenceLoaded";
    InternalProfileTagEventNames["DEBUG_FLAG_CHANGED"] = "profiletag_debugFlagChanged";
})(InternalProfileTagEventNames || (InternalProfileTagEventNames = {}));
class NavigatedPushEvent {
    constructor(data) {
        this.name = 'Navigated';
        this.data = data;
    }
}
class ConsentChangedPushEvent {
    constructor(granted) {
        this.name = 'ConsentChanged';
        this.data = { granted: undefined };
        this.data.granted = granted;
    }
}
class KeywordSearchPushEvent {
    constructor(data) {
        this.name = 'KeywordSearch';
        this.data = data;
    }
}
class ProductViewPushEvent {
    constructor(data) {
        this.name = 'ProductDetailsPageViewed';
        this.data = data;
    }
}
class CategoryViewPushEvent {
    constructor(data) {
        this.name = 'CategoryPageViewed';
        this.data = data;
    }
}
// TODO:#cds - check the class name and the `name` property
class BrandPageVisitedEvent {
    constructor(data) {
        this.name = 'BrandPageVisitedEvent';
        this.data = data;
    }
}
class HomePageViewPushEvent {
    constructor(data) {
        this.name = 'HomePageViewed';
        this.data = data;
    }
}
class OrderConfirmationPushEvent {
    constructor(data) {
        this.name = 'OrderConfirmationPageViewed';
        this.data = data;
    }
}
class CartViewPushEvent {
    constructor(data) {
        this.name = 'CartPageViewed';
        this.data = data;
    }
}
class AddedToCartPushEvent {
    constructor(data) {
        this.name = 'AddedToCart';
        this.data = data;
    }
}
class RemovedFromCartPushEvent {
    constructor(data) {
        this.name = 'RemovedFromCart';
        this.data = data;
    }
}
class ModifiedCartPushEvent {
    constructor(data) {
        this.name = 'ModifiedCart';
        this.data = data;
    }
}
class CartSnapshotPushEvent {
    constructor(data) {
        this.name = 'CartSnapshot';
        this.data = data;
    }
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProfileTagEventService {
    constructor(winRef, config, baseSiteService, platform) {
        this.winRef = winRef;
        this.config = config;
        this.baseSiteService = baseSiteService;
        this.platform = platform;
        this.subscription = new Subscription();
        this.profileTagDebug = false;
        this.profileTagEvents$ = merge(this.setConsentReference(), this.debugModeChanged());
        this.logger = inject(LoggerService);
        this.initWindow();
        this.setConsentReferenceFromLocalStorage();
    }
    setConsentReferenceFromLocalStorage() {
        if (this.winRef.isBrowser() && this.winRef.localStorage) {
            const profileTagMetadata = JSON.parse(this.winRef.localStorage.getItem('profiletag') || '{"cr":{}}');
            this.subscription.add(this.baseSiteService
                .getActive()
                .pipe(take(1))
                .subscribe((baseSite) => {
                this.latestConsentReference = new BehaviorSubject(profileTagMetadata.cr[`${baseSite}-consentReference`]?.consentReference);
            }));
        }
    }
    getProfileTagEvents() {
        return this.profileTagEvents$;
    }
    getConsentReference() {
        if (!this.consentReference$) {
            this.consentReference$ = fromEvent(this.winRef.nativeWindow, InternalProfileTagEventNames.CONSENT_REFERENCE_LOADED).pipe(map((event) => event), map((event) => event.detail.consentReference), shareReplay(1));
        }
        return this.consentReference$;
    }
    handleConsentWithdrawn() {
        this.consentReference$ = null;
        this.latestConsentReference.next(null);
    }
    addTracker() {
        return this.baseSiteService.getActive().pipe(filter(() => isPlatformBrowser(this.platform)), filter((siteId) => Boolean(siteId)), distinctUntilChanged(), tap(() => this.addScript()), tap((siteId) => this.createConfig(siteId)));
    }
    notifyProfileTagOfEventOccurrence(event) {
        try {
            this.profileTagWindow.Y_TRACKING.eventLayer.push(event);
        }
        catch (e) {
            this.logger.log(`Unexpected error when calling profiletag push method ${e}`);
        }
    }
    setConsentReference() {
        return this.getConsentReference().pipe(tap((consentReference) => this.latestConsentReference.next(consentReference)));
    }
    debugModeChanged() {
        return fromEvent(this.winRef.nativeWindow, InternalProfileTagEventNames.DEBUG_FLAG_CHANGED).pipe(map((event) => event), tap((event) => (this.profileTagDebug = event.detail.debug)));
    }
    createConfig(siteId) {
        const newConfig = {
            ...this.config.cds.profileTag,
            tenant: this.config.cds.tenant,
            siteId,
            spa: true,
        };
        this.exposeConfig(newConfig);
    }
    /*
     * Checks if the script with the given source exists in the document or not.
     */
    isScriptLoaded(scriptSource) {
        return !!this.winRef.document.querySelector(`script[src="${scriptSource}"]`);
    }
    addScript() {
        if (this.isScriptLoaded(this.config.cds.profileTag.javascriptUrl)) {
            return;
        }
        const profileTagScript = this.winRef.document.createElement('script');
        profileTagScript.type = 'text/javascript';
        profileTagScript.async = true;
        profileTagScript.src = this.config.cds.profileTag.javascriptUrl;
        this.winRef.document
            .getElementsByTagName('head')[0]
            .appendChild(profileTagScript);
    }
    initWindow() {
        if (!isPlatformBrowser(this.platform)) {
            return;
        }
        this.profileTagWindow = this.winRef.nativeWindow;
        this.profileTagWindow.Y_TRACKING = this.profileTagWindow.Y_TRACKING || {};
        this.profileTagWindow.Y_TRACKING.eventLayer =
            this.profileTagWindow.Y_TRACKING.eventLayer || [];
    }
    exposeConfig(options) {
        const q = this.profileTagWindow.Y_TRACKING.q || [];
        if (q.length !== 0) {
            return;
        }
        q.push([options]);
        this.profileTagWindow.Y_TRACKING.q = q;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
ProfileTagEventService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagEventService, deps: [{ token: i1.WindowRef }, { token: CdsConfig }, { token: i1.BaseSiteService }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagEventService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagEventService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagEventService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }, { type: CdsConfig }, { type: i1.BaseSiteService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdsBackendConnector {
    constructor(cdsBackendNotificationAdapter) {
        this.cdsBackendNotificationAdapter = cdsBackendNotificationAdapter;
    }
    notifySuccessfulLogin() {
        return this.cdsBackendNotificationAdapter.notifySuccessfulLogin();
    }
}
CdsBackendConnector.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsBackendConnector, deps: [{ token: CdsBackendNotificationAdapter }], target: i0.ɵɵFactoryTarget.Injectable });
CdsBackendConnector.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsBackendConnector, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsBackendConnector, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CdsBackendNotificationAdapter }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProfileTagLifecycleService {
    constructor(consentService, config, actionsSubject) {
        this.consentService = consentService;
        this.config = config;
        this.actionsSubject = actionsSubject;
    }
    consentChanged() {
        return this.consentService
            .getConsent(this.config.cds?.consentTemplateId ?? '')
            .pipe(filter(isNotUndefined), map((profileConsent) => {
            return this.consentService.isConsentGiven(profileConsent);
        }), map((granted) => {
            return new ConsentChangedPushEvent(granted);
        }));
    }
    loginSuccessful() {
        return this.actionsSubject.pipe(filter((action) => action.type === AuthActions.LOGIN), map(() => true));
    }
}
ProfileTagLifecycleService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagLifecycleService, deps: [{ token: i1.ConsentService }, { token: CdsConfig }, { token: i3.ActionsSubject }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagLifecycleService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagLifecycleService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagLifecycleService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConsentService }, { type: CdsConfig }, { type: i3.ActionsSubject }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProfileTagInjectorService {
    constructor(profileTagEventTracker, cdsBackendConnector, profileTagLifecycleService) {
        this.profileTagEventTracker = profileTagEventTracker;
        this.cdsBackendConnector = cdsBackendConnector;
        this.profileTagLifecycleService = profileTagLifecycleService;
    }
    track() {
        return this.profileTagEventTracker
            .addTracker()
            .pipe(switchMap((_) => merge(this.profileTagEventTracker.getProfileTagEvents(), this.notifyEcOfLoginSuccessful()).pipe(map(() => true))));
    }
    notifyEcOfLoginSuccessful() {
        return this.profileTagLifecycleService.loginSuccessful().pipe(switchMap((_) => {
            return this.cdsBackendConnector
                .notifySuccessfulLogin()
                .pipe(map(() => true));
        }));
    }
}
ProfileTagInjectorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagInjectorService, deps: [{ token: ProfileTagEventService }, { token: CdsBackendConnector }, { token: ProfileTagLifecycleService }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagInjectorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagInjectorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagInjectorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: ProfileTagEventService }, { type: CdsBackendConnector }, { type: ProfileTagLifecycleService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProfileTagComponent {
    constructor(profileTagInjector) {
        this.profileTagInjector = profileTagInjector;
        this.profileTagEnabled$ = this.profileTagInjector.track();
    }
}
ProfileTagComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagComponent, deps: [{ token: ProfileTagInjectorService }], target: i0.ɵɵFactoryTarget.Component });
ProfileTagComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: ProfileTagComponent, selector: "cx-profiletag", ngImport: i0, template: `
    <ng-container *ngIf="profileTagEnabled$ | async"></ng-container>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagComponent, decorators: [{
            type: Component,
            args: [{
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    selector: 'cx-profiletag',
                    template: `
    <ng-container *ngIf="profileTagEnabled$ | async"></ng-container>
  `,
                }]
        }], ctorParameters: function () { return [{ type: ProfileTagInjectorService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class ProfileTagCmsModule {
}
ProfileTagCmsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagCmsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProfileTagCmsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagCmsModule, declarations: [ProfileTagComponent], imports: [CommonModule], exports: [ProfileTagComponent] });
ProfileTagCmsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagCmsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                ProfileTagComponent: {
                    component: ProfileTagComponent,
                    deferLoading: DeferLoadingStrategy.INSTANT,
                },
            },
        }),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagCmsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                ProfileTagComponent: {
                                    component: ProfileTagComponent,
                                    deferLoading: DeferLoadingStrategy.INSTANT,
                                },
                            },
                        }),
                    ],
                    exports: [ProfileTagComponent],
                    declarations: [ProfileTagComponent],
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

class ConsentReferenceInterceptor {
    constructor(profileTagEventTracker, occEndpoints) {
        this.profileTagEventTracker = profileTagEventTracker;
        this.occEndpoints = occEndpoints;
    }
    intercept(request, next) {
        if (!this.profileTagEventTracker.latestConsentReference ||
            !this.profileTagEventTracker.latestConsentReference.value ||
            !this.isOccUrl(request.url)) {
            return next.handle(request);
        }
        const cdsHeaders = request.headers.set('X-Consent-Reference', this.profileTagEventTracker.latestConsentReference.value);
        const cdsRequest = request.clone({ headers: cdsHeaders });
        return next.handle(cdsRequest);
    }
    isOccUrl(url) {
        return url.includes(this.occEndpoints.getBaseUrl());
    }
}
ConsentReferenceInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsentReferenceInterceptor, deps: [{ token: ProfileTagEventService }, { token: i1.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
ConsentReferenceInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsentReferenceInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConsentReferenceInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: ProfileTagEventService }, { type: i1.OccEndpointsService }]; } });

class DebugInterceptor {
    constructor(profileTagEventTracker, occEndpoints) {
        this.profileTagEventTracker = profileTagEventTracker;
        this.occEndpoints = occEndpoints;
    }
    intercept(request, next) {
        if (!this.isOccUrl(request.url)) {
            return next.handle(request);
        }
        const cdsHeaders = request.headers.set('X-Profile-Tag-Debug', this.profileTagEventTracker.profileTagDebug.toString());
        const cdsRequest = request.clone({ headers: cdsHeaders });
        return next.handle(cdsRequest);
    }
    isOccUrl(url) {
        return url.includes(this.occEndpoints.getBaseUrl());
    }
}
DebugInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DebugInterceptor, deps: [{ token: ProfileTagEventService }, { token: i1.OccEndpointsService }], target: i0.ɵɵFactoryTarget.Injectable });
DebugInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DebugInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: DebugInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: ProfileTagEventService }, { type: i1.OccEndpointsService }]; } });

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
class ProfileTagModule {
}
ProfileTagModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ProfileTagModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagModule, imports: [ProfileTagCmsModule] });
ProfileTagModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagModule, providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: ConsentReferenceInterceptor,
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useExisting: DebugInterceptor, multi: true },
        {
            provide: CdsBackendNotificationAdapter,
            useClass: OccBackendNotification,
        },
    ], imports: [ProfileTagCmsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ProfileTagCmsModule],
                    providers: [
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: ConsentReferenceInterceptor,
                            multi: true,
                        },
                        { provide: HTTP_INTERCEPTORS, useExisting: DebugInterceptor, multi: true },
                        {
                            provide: CdsBackendNotificationAdapter,
                            useClass: OccBackendNotification,
                        },
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A service to convert spartacus events into profiletag push events that can be picked up and processed by profiletag.
 * The service observes the event service and the active cart service for supported events. These events are parsed into
 * a profiletag compliant format and enriched by segments and actions from the latest personalization context.
 *
 * Currently supported events from the event service:
 *  - CartPageVisited
 *  - CategoryPageVisited
 *  - HomePageVisited
 *  - KeywordSearchPageVisited
 *  - OrderConfirmationPageVisited
 *  - PageVisited
 *  - ProductDetailsPageVisited
 *  - CartAddEntrySuccessEvent
 *  - CartRemoveEntrySuccessEvent
 *  - CartUpdateEntrySuccessEvent
 */
class ProfileTagPushEventsService {
    constructor(eventService, personalizationContextService, activeCartFacade) {
        this.eventService = eventService;
        this.personalizationContextService = personalizationContextService;
        this.activeCartFacade = activeCartFacade;
        this.pushEvents$ = merge(this.categoryPageVisited(), this.productDetailsPageView(), this.searchResultsChanged(), this.homePageVisitedEvent(), this.cartPageVisitedEvent(), this.navigatedEvent(), this.orderConfirmationPageVisited(), this.addedToCart(), this.removedFromCart(), this.modifiedCart(), this.cartChangedEvent());
    }
    /**
     * Returns a push event emitting observable that emits all converted events emitted by the event or the active cart service.
     * These events are enriched with segments and actions from the latest personalization context.
     *
     * @returns an observable emitting profiletag push events
     */
    getPushEvents() {
        return this.pushEvents$.pipe(withLatestFrom(merge(of({ segments: undefined, actions: undefined }), this.personalizationContextService.getPersonalizationContext())), map(([item, personalizationContext]) => {
            item.data = item.data ? item.data : {};
            item.data.segments = personalizationContext?.segments;
            item.data.actions = personalizationContext?.actions;
            return item;
        }));
    }
    /**
     * Adds a new push event emitting observable to this service. This observable will be merged with the internal one.
     * This method can be used to extend the functionality of this service at runtime.
     *
     * @param event an observable emitting profiltag push events
     */
    addPushEvent(event) {
        this.pushEvents$ = merge(this.pushEvents$, event);
    }
    /**
     * Emits the category page visited event.
     *
     * @returns an observable emitting events that describe category page visits in a profiltag compliant way
     * @see CategoryPageResultsEvent
     * @see CategoryViewPushEvent
     */
    categoryPageVisited() {
        return this.eventService.get(CategoryPageResultsEvent).pipe(withLatestFrom(this.eventService.get(PageEvent).pipe(startWith(null), // https://github.com/ReactiveX/rxjs/issues/4772
        pairwise())), distinctUntilChanged(([previouslyEmittedCategoryPage], [currentCategoryPage, [previousRoute, currentRoute]]) => {
            return (previouslyEmittedCategoryPage.categoryCode ===
                currentCategoryPage.categoryCode &&
                previousRoute.navigation.semanticRoute ===
                    currentRoute.navigation.semanticRoute);
            // A true means that this item is not unique, so this is hard to wrap your head around.
            // What we are saying, is that if the category code is the same AND the last emitted semantic route is the
            // same then this is a duplicate (i.e. via a facet change). In other words, no other page type was visited,
            // and we are on the same category code.
        }), map(([categoryPageEvent]) => new CategoryViewPushEvent({
            productCategory: categoryPageEvent.categoryCode,
            productCategoryName: categoryPageEvent.categoryName,
        })));
    }
    /**
     * Listens to SearchPageResultsEvent events
     *
     * @returns an observable emitting events that describe keyword search page visits in a profiltag compliant way
     * @see SearchPageResultsEvent
     * @see KeywordSearchPushEvent
     */
    searchResultsChanged() {
        return this.eventService.get(SearchPageResultsEvent).pipe(distinctUntilKeyChanged('searchTerm'), map((searchEvent) => new KeywordSearchPushEvent({
            searchTerm: searchEvent.searchTerm,
            numResults: searchEvent.numberOfResults,
        })));
    }
    /**
     * Listens to ProductDetailsPageEvent events
     *
     * @returns an observable emitting events that describe product detail page visits in a profiltag compliant way
     * @see ProductDetailsPageEvent
     * @see ProductViewPushEvent
     */
    productDetailsPageView() {
        return this.eventService.get(ProductDetailsPageEvent).pipe(map((item) => new ProductViewPushEvent({
            productSku: item.code,
            productName: item.name,
            productPrice: item.price ? item.price.value : undefined,
            productCategoryName: item.categories
                ? item.categories[item.categories.length - 1].name
                : undefined,
            productCategory: item.categories
                ? item.categories[item.categories.length - 1].code
                : undefined,
            categories: this.categoriesToIds(item.categories),
        })));
    }
    /**
     * Listens to PageVisited events
     *
     * @returns an observable emitting events that describe page visits in a profiltag compliant way
     * @see PageVisited
     * @see NavigatedPushEvent
     */
    navigatedEvent() {
        return this.eventService
            .get(PageEvent)
            .pipe(map(() => new NavigatedPushEvent()));
    }
    /**
     * Listens to CartPageVisited events
     *
     * @returns an observable emitting events that describe cart page visits in a profiltag compliant way
     * @see CartPageVisited
     * @see CartViewPushEvent
     */
    cartPageVisitedEvent() {
        return this.eventService
            .get(CartPageEvent)
            .pipe(map(() => new CartViewPushEvent()));
    }
    /**
     * Listens to HomePageEvent events
     *
     * @returns an observable emitting events that describe home page visits in a profiltag compliant way
     * @see HomePageEvent
     * @see HomePageViewPushEvent
     */
    homePageVisitedEvent() {
        return this.eventService
            .get(HomePageEvent)
            .pipe(map(() => new HomePageViewPushEvent()));
    }
    /**
     * Listens to OrderPlacedEvent events
     *
     * @returns an observable emitting events that describe order confirmation page visits in a profiltag compliant way
     * @see OrderPlacedEvent
     * @see OrderConfirmationPushEvent
     */
    orderConfirmationPageVisited() {
        return this.eventService
            .get(OrderPlacedEvent)
            .pipe(map(() => new OrderConfirmationPushEvent()));
    }
    /**
     * Listens to @CartAddEntrySuccessEvent events, transforms them to @AddedToCartPushEvent .
     *
     * @returns an observable emitting @AddedToCartPushEvent events
     * @see CartAddEntrySuccessEvent
     * @see AddedToCartPushEvent
     */
    addedToCart() {
        return this.eventService.get(CartAddEntrySuccessEvent).pipe(map((item) => new AddedToCartPushEvent({
            productQty: item.quantityAdded,
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            productPrice: this.getProductPrice(item),
            categories: this.categoriesToIds(item.entry.product.categories),
            productCategoryName: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].name
                : undefined,
            productCategory: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].code
                : undefined,
        })));
    }
    /**
     * Listens to @CartRemoveEntrySuccessEvent events, transforms them to @RemovedFromCartPushEvent
     *
     * @returns an observable emitting @RemovedFromCartPushEvent events
     * @see CartRemoveEntrySuccessEvent
     * @see RemovedFromCartPushEvent
     */
    removedFromCart() {
        return this.eventService.get(CartRemoveEntrySuccessEvent).pipe(map((item) => new RemovedFromCartPushEvent({
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            productCategoryName: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].name
                : undefined,
            productCategory: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].code
                : undefined,
            categories: this.categoriesToIds(item.entry.product.categories),
        })));
    }
    /**
     * Listens to @CartUpdateEntrySuccessEvent events, transforms them to @ModifiedCartPushEvent
     *
     * @returns an observable emitting @ModifiedCartPushEvent events
     * @see CartUpdateEntrySuccessEvent
     * @see ModifiedCartPushEvent
     */
    modifiedCart() {
        return this.eventService.get(CartUpdateEntrySuccessEvent).pipe(map((item) => new ModifiedCartPushEvent({
            productQty: item.quantity,
            productSku: item.entry.product.code,
            productName: item.entry.product.name,
            cartId: item.cartId,
            cartCode: item.cartCode,
            categories: this.categoriesToIds(item.entry.product.categories),
            productCategoryName: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].name
                : undefined,
            productCategory: item.entry.product.categories
                ? item.entry.product.categories[item.entry.product.categories.length - 1].code
                : undefined,
        })));
    }
    /**
     * Listens to @CartAddEntrySuccessEvent , @CartUpdateEntrySuccessEvent and @CartRemoveEntrySuccessEvent events,
     * transforms them to @CartSnapshotPushEvent whenever there is an activity on the cart.
     *
     * @returns an observable emitting @CartSnapshotPushEvent events
     * @see CartAddEntrySuccessEvent
     * @see CartUpdateEntrySuccessEvent
     * @see CartRemoveEntrySuccessEvent
     * @see MergeCartSuccessEvent
     * @see CartSnapshotPushEvent
     */
    cartChangedEvent() {
        return merge(this.eventService.get(CartAddEntrySuccessEvent), this.eventService.get(CartUpdateEntrySuccessEvent), this.eventService.get(CartRemoveEntrySuccessEvent), this.eventService.get(MergeCartSuccessEvent)).pipe(switchMap(() => this.activeCartFacade.takeActive()), map((cart) => new CartSnapshotPushEvent({
            cart,
        })));
    }
    getProductPrice(event) {
        if (!event.entry.totalPrice ||
            !event.entry.totalPrice.value ||
            !event.entry.quantity) {
            return undefined;
        }
        return parseFloat((event.entry.totalPrice.value / event.entry.quantity).toFixed(2));
    }
    categoriesToIds(categories) {
        return categories.map((category) => category.code);
    }
}
ProfileTagPushEventsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagPushEventsService, deps: [{ token: i1.EventService }, { token: i2$2.PersonalizationContextService }, { token: i3$1.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
ProfileTagPushEventsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagPushEventsService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ProfileTagPushEventsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.EventService }, { type: i2$2.PersonalizationContextService }, { type: i3$1.ActiveCartFacade }]; } });

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
class TrackingService {
    constructor(profileTagLifecycleService, profileTagPushEventsService, profileTagEventTracker) {
        this.profileTagLifecycleService = profileTagLifecycleService;
        this.profileTagPushEventsService = profileTagPushEventsService;
        this.profileTagEventTracker = profileTagEventTracker;
    }
    static factory(trackingService) {
        const factoryFunction = () => {
            trackingService.trackEvents();
        };
        return factoryFunction;
    }
    trackEvents() {
        this.profileTagPushEventsService
            .getPushEvents()
            .pipe(withLatestFrom(this.profileTagLifecycleService.consentChanged().pipe(tap((event) => {
            // always notify of consent changes
            this.profileTagEventTracker.notifyProfileTagOfEventOccurrence(event);
        }))), filter(([_event, consentChanged]) => consentChanged.data.granted), //don't notify other events until consent is granted
        tap(([event]) => {
            this.profileTagEventTracker.notifyProfileTagOfEventOccurrence(event);
        }))
            .subscribe();
    }
}
TrackingService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingService, deps: [{ token: ProfileTagLifecycleService }, { token: ProfileTagPushEventsService }, { token: ProfileTagEventService }], target: i0.ɵɵFactoryTarget.Injectable });
TrackingService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: ProfileTagLifecycleService }, { type: ProfileTagPushEventsService }, { type: ProfileTagEventService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class TrackingModule {
}
TrackingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TrackingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TrackingModule });
TrackingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingModule, providers: [
        {
            multi: true,
            provide: APP_INITIALIZER,
            useFactory: TrackingService.factory,
            deps: [TrackingService],
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TrackingModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        {
                            multi: true,
                            provide: APP_INITIALIZER,
                            useFactory: TrackingService.factory,
                            deps: [TrackingService],
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
class CdsMerchandisingUserContextService {
    constructor(routingService, productSearchService, profileTagEventService, profileTagLifecycleService, facetService) {
        this.routingService = routingService;
        this.productSearchService = productSearchService;
        this.profileTagEventService = profileTagEventService;
        this.profileTagLifecycleService = profileTagLifecycleService;
        this.facetService = facetService;
    }
    getUserContext() {
        return combineLatest([
            this.getConsentReferenceContext(),
            this.getPageContext(),
            this.getSearchContext(),
        ]).pipe(map(([consentContext, pageContext, searchContext]) => {
            const result = {
                ...consentContext,
                ...pageContext,
            };
            if (!pageContext.products) {
                result['facets'] = searchContext.facets;
                result['searchPhrase'] = searchContext.searchPhrase;
            }
            return result;
        }), distinctUntilChanged((prev, curr) => prev.facets === curr.facets &&
            prev.searchPhrase === curr.searchPhrase &&
            prev.consentReference === curr.consentReference &&
            prev.category === curr.category &&
            prev.products === curr.products));
    }
    getConsentReferenceContext() {
        return this.profileTagLifecycleService.consentChanged().pipe(switchMap((changed) => {
            if (changed.data.granted) {
                return this.profileTagEventService
                    .getConsentReference()
                    .pipe(map((consentReference) => ({ consentReference })));
            }
            else {
                this.profileTagEventService.handleConsentWithdrawn();
                return of({ consentReference: '' });
            }
        }));
    }
    getPageContext() {
        return this.routingService.getPageContext().pipe(map((pageContext) => {
            const result = {};
            if (pageContext.type === PageType.PRODUCT_PAGE) {
                result.products = [pageContext.id];
            }
            else if (pageContext.type === PageType.CATEGORY_PAGE) {
                result.category = pageContext.id;
            }
            return result;
        }));
    }
    getSearchContext() {
        return combineLatest([
            this.productSearchService
                .getResults()
                .pipe(startWith({})),
            this.facetService.facetList$.pipe(startWith({})),
        ]).pipe(map(([searchResult, facetList]) => {
            const facets = facetList?.activeFacets
                ?.map((facet) => `${facet.facetCode}:${facet.facetValueCode}`)
                .join(':');
            return {
                facets: facets || undefined,
                searchPhrase: searchResult.freeTextSearch || undefined,
            };
        }), distinctUntilChanged((prev, curr) => prev.facets === curr.facets && prev.searchPhrase === curr.searchPhrase));
    }
}
CdsMerchandisingUserContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingUserContextService, deps: [{ token: i1.RoutingService }, { token: i1.ProductSearchService }, { token: ProfileTagEventService }, { token: ProfileTagLifecycleService }, { token: i1$1.FacetService }], target: i0.ɵɵFactoryTarget.Injectable });
CdsMerchandisingUserContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingUserContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingUserContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.RoutingService }, { type: i1.ProductSearchService }, { type: ProfileTagEventService }, { type: ProfileTagLifecycleService }, { type: i1$1.FacetService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdsMerchandisingSiteContextService {
    constructor(baseSiteService, languageService) {
        this.baseSiteService = baseSiteService;
        this.languageService = languageService;
    }
    getSiteContext() {
        return combineLatest([
            this.baseSiteService.getActive(),
            this.languageService.getActive(),
        ]).pipe(map(([site, language]) => {
            const siteContext = {
                site,
                language,
            };
            return siteContext;
        }));
    }
}
CdsMerchandisingSiteContextService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingSiteContextService, deps: [{ token: i1.BaseSiteService }, { token: i1.LanguageService }], target: i0.ɵɵFactoryTarget.Injectable });
CdsMerchandisingSiteContextService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingSiteContextService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingSiteContextService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.BaseSiteService }, { type: i1.LanguageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CdsMerchandisingProductService {
    constructor(strategyConnector, merchandisingUserContextService, merchandisingSiteContextService) {
        this.strategyConnector = strategyConnector;
        this.merchandisingUserContextService = merchandisingUserContextService;
        this.merchandisingSiteContextService = merchandisingSiteContextService;
    }
    loadProductsForStrategy(strategyId, numberToDisplay) {
        return combineLatest([
            this.merchandisingSiteContextService.getSiteContext(),
            this.merchandisingUserContextService.getUserContext(),
        ]).pipe(debounceTime(0), map(([siteContext, userContext]) => {
            return {
                queryParams: {
                    ...siteContext,
                    products: userContext.products,
                    category: userContext.category,
                    facets: userContext.facets,
                    searchPhrase: userContext.searchPhrase,
                    pageSize: numberToDisplay,
                },
                headers: {
                    consentReference: userContext.consentReference,
                },
            };
        }), mergeMap((request) => this.strategyConnector
            .loadProductsForStrategy(strategyId, request)
            .pipe(map((products) => ({ request, products })))));
    }
}
CdsMerchandisingProductService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingProductService, deps: [{ token: MerchandisingStrategyConnector }, { token: CdsMerchandisingUserContextService }, { token: CdsMerchandisingSiteContextService }], target: i0.ɵɵFactoryTarget.Injectable });
CdsMerchandisingProductService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingProductService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsMerchandisingProductService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: MerchandisingStrategyConnector }, { type: CdsMerchandisingUserContextService }, { type: CdsMerchandisingSiteContextService }]; } });

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
const DEFAULT_CAROUSEL_VIEWPORT_THRESHOLD = 80;
class MerchandisingCarouselComponentService {
    constructor(cdsMerchandisingProductService, productService, profileTagEventService, cdsConfig) {
        this.cdsMerchandisingProductService = cdsMerchandisingProductService;
        this.productService = productService;
        this.profileTagEventService = profileTagEventService;
        this.cdsConfig = cdsConfig;
    }
    getMerchandisingCaourselViewportThreshold(cmsComponent) {
        const viewportPercentage = cmsComponent.viewportPercentage ??
            this.cdsConfig?.cds?.merchandising?.defaultCarouselViewportThreshold ??
            DEFAULT_CAROUSEL_VIEWPORT_THRESHOLD;
        return viewportPercentage / 100;
    }
    getMerchandisingCarouselModel(cmsComponent) {
        return this.cdsMerchandisingProductService
            .loadProductsForStrategy(cmsComponent.strategy, cmsComponent.numberToDisplay)
            .pipe(map((strategy) => {
            const metadata = this.getCarouselMetadata(strategy.products, cmsComponent);
            const items$ = this.mapStrategyProductsToCarouselItems(strategy.products);
            const productIds = this.mapStrategyProductsToProductIds(strategy.products);
            const id = this.getMerchandisingCarouselModelId(cmsComponent, strategy.request);
            return {
                id,
                items$,
                productIds,
                metadata,
                title: cmsComponent.title,
                backgroundColor: cmsComponent.backgroundColour,
                textColor: cmsComponent.textColour,
            };
        }));
    }
    sendCarouselViewEvent(lastSendModelId, merchandisingCarouselModel$) {
        return merchandisingCarouselModel$.pipe(filter((model) => model.id !== lastSendModelId), tap((merchandisingCarouselModel) => {
            const carouselEvent = this.getCarouselEventFromCarouselModel(merchandisingCarouselModel);
            this.profileTagEventService.notifyProfileTagOfEventOccurrence(new MerchandisingCarouselViewedEvent(carouselEvent, merchandisingCarouselModel.productIds));
        }));
    }
    sendCarouselItemClickedEvent(merchandisingCarouselModel, clickedProduct) {
        const carouselEvent = this.getCarouselEventFromCarouselModel(merchandisingCarouselModel);
        carouselEvent.metadata = {
            ...carouselEvent.metadata,
            ...clickedProduct.metadata,
        };
        this.profileTagEventService.notifyProfileTagOfEventOccurrence(new MerchandisingCarouselClickedEvent(carouselEvent, clickedProduct.metadata.slot, clickedProduct.code, clickedProduct.images?.PRIMARY['product']?.url));
    }
    getCarouselMetadata(strategyProducts, componentData) {
        const metadata = strategyProducts.metadata ?? {};
        if (strategyProducts.products && strategyProducts.products.length) {
            metadata.slots = strategyProducts.products.length;
        }
        metadata.title = componentData.title;
        metadata.name = componentData.name;
        metadata.strategyid = componentData.strategy;
        metadata.id = componentData.uid;
        return metadata;
    }
    mapStrategyProductsToCarouselItems(strategyProducts) {
        return strategyProducts && strategyProducts.products
            ? strategyProducts.products.map((strategyProduct, index) => this.productService
                .get(strategyProduct.id, ["details" /* ProductScope.DETAILS */, "price" /* ProductScope.PRICE */])
                .pipe(map((product) => ({
                ...product,
                metadata: this.getCarouselItemMetadata(strategyProduct, index + 1),
            }))))
            : [EMPTY];
    }
    mapStrategyProductsToProductIds(strategyProducts) {
        return strategyProducts && strategyProducts.products
            ? strategyProducts.products.map((strategyProduct) => strategyProduct.id)
            : [];
    }
    getMerchandisingCarouselModelId(cmsComponent, request) {
        return (cmsComponent.uid +
            '_' +
            cmsComponent.strategy +
            '_' +
            JSON.stringify(request.queryParams));
    }
    getCarouselItemMetadata(strategyProduct, index) {
        const metadata = strategyProduct.metadata ?? {};
        metadata.slot = index;
        metadata.id = strategyProduct.id;
        return metadata;
    }
    getCarouselEventFromCarouselModel(carouselModel) {
        return {
            carouselId: carouselModel.metadata.id,
            carouselName: carouselModel.metadata.name,
            strategyId: carouselModel.metadata.strategyid,
            metadata: carouselModel.metadata,
        };
    }
}
MerchandisingCarouselComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselComponentService, deps: [{ token: CdsMerchandisingProductService }, { token: i1.ProductService }, { token: ProfileTagEventService }, { token: CdsConfig }], target: i0.ɵɵFactoryTarget.Injectable });
MerchandisingCarouselComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CdsMerchandisingProductService }, { type: i1.ProductService }, { type: ProfileTagEventService }, { type: CdsConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MerchandisingCarouselComponent {
    constructor(componentData, merchandisingCarouselComponentService, routingService, intersectionService, el) {
        this.componentData = componentData;
        this.merchandisingCarouselComponentService = merchandisingCarouselComponentService;
        this.routingService = routingService;
        this.intersectionService = intersectionService;
        this.el = el;
        /**
         * returns an Observable string for the title.
         */
        this.title$ = this.componentData.data$.pipe(filter((data) => Boolean(data)), map((data) => data.title));
        this.fetchProducts$ = this.componentData.data$.pipe(filter((data) => Boolean(data)), distinctUntilKeyChanged('strategy'), switchMap((data) => this.merchandisingCarouselComponentService.getMerchandisingCarouselModel(data)), tap((data) => {
            if (typeof data.backgroundColor === 'string') {
                this.el.nativeElement.style.setProperty('--cx-color-background', data.backgroundColor);
            }
            if (typeof data.textColor === 'string') {
                this.el.nativeElement.style.setProperty('--cx-color-text', data.textColor);
            }
        }), shareReplay({ bufferSize: 1, refCount: true }));
        this.intersection$ = this.fetchProducts$.pipe(take(1), switchMap(() => this.routingService.getPageContext().pipe(switchMap(() => this.componentData.data$), map((data) => this.merchandisingCarouselComponentService.getMerchandisingCaourselViewportThreshold(data)), switchMap((threshold) => this.intersectionService
            .isIntersected(this.el.nativeElement, {
            threshold,
        })
            .pipe(filter((carouselIsVisible) => carouselIsVisible), switchMap((_) => {
            return this.merchandisingCarouselComponentService
                .sendCarouselViewEvent(this.lastEventModelId, this.fetchProducts$)
                .pipe(tap((model) => {
                this.lastEventModelId = model.id;
            }), switchMap(() => EMPTY));
        }))))));
        this.merchandisingCarouselModel$ = using(() => this.intersection$.subscribe(), () => this.fetchProducts$);
        this.lastEventModelId = '';
    }
    onMerchandisingCarouselItemClick(merchandisingCarouselModel, clickedProduct) {
        this.merchandisingCarouselComponentService.sendCarouselItemClickedEvent(merchandisingCarouselModel, clickedProduct);
    }
}
MerchandisingCarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselComponent, deps: [{ token: i1$1.CmsComponentData }, { token: MerchandisingCarouselComponentService }, { token: i1.RoutingService }, { token: i1$1.IntersectionService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
MerchandisingCarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: MerchandisingCarouselComponent, selector: "cx-merchandising-carousel", ngImport: i0, template: "<ng-container\n  *ngIf=\"merchandisingCarouselModel$ | async as merchandisingCarouselModel\"\n>\n  <div\n    class=\"data-cx-merchandising-carousel\"\n    [cxAttributes]=\"merchandisingCarouselModel.metadata\"\n    [cxAttributesNamePrefix]=\"'data-cx-merchandising-carousel'\"\n  ></div>\n  <cx-carousel\n    [items]=\"merchandisingCarouselModel.items$\"\n    [title]=\"title$ | async\"\n    [template]=\"carouselItem\"\n    itemWidth=\"285px\"\n  >\n  </cx-carousel>\n\n  <ng-template #carouselItem let-item=\"item\">\n    <div\n      class=\"data-cx-merchandising-product\"\n      [cxAttributes]=\"item.metadata\"\n      [cxAttributesNamePrefix]=\"'data-cx-merchandising-product'\"\n    ></div>\n    <a\n      tabindex=\"0\"\n      [routerLink]=\"{ cxRoute: 'product', params: item } | cxUrl\"\n      (click)=\"\n        onMerchandisingCarouselItemClick(merchandisingCarouselModel, item)\n      \"\n    >\n      <cx-media\n        *ngIf=\"item.images?.PRIMARY\"\n        [container]=\"item.images.PRIMARY\"\n        format=\"product\"\n      >\n      </cx-media>\n      <h4>{{ item.name }}</h4>\n      <div class=\"price\">\n        {{ item.price?.formattedValue }}\n      </div>\n      <div class=\"price\" *ngIf=\"item.stock?.stockLevel > 0; else outOfStock\">\n        {{ item.stock?.stockLevelStatus }} : {{ item.stock?.stockLevel }}\n      </div>\n      <ng-template #outOfStock>\n        <div class=\"price\">\n          {{ item.stock?.stockLevelStatus }}\n        </div>\n      </ng-template>\n    </a>\n  </ng-template>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i2$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: AttributesDirective, selector: "[cxAttributes]", inputs: ["cxAttributes", "cxAttributesNamePrefix"] }, { kind: "component", type: i1$1.CarouselComponent, selector: "cx-carousel", inputs: ["title", "items", "template", "itemWidth", "hideIndicators", "indicatorIcon", "previousIcon", "nextIcon"] }, { kind: "component", type: i1$1.MediaComponent, selector: "cx-media", inputs: ["container", "format", "alt", "role", "loading"], outputs: ["loaded"] }, { kind: "directive", type: i6.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i2$1.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-merchandising-carousel', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container\n  *ngIf=\"merchandisingCarouselModel$ | async as merchandisingCarouselModel\"\n>\n  <div\n    class=\"data-cx-merchandising-carousel\"\n    [cxAttributes]=\"merchandisingCarouselModel.metadata\"\n    [cxAttributesNamePrefix]=\"'data-cx-merchandising-carousel'\"\n  ></div>\n  <cx-carousel\n    [items]=\"merchandisingCarouselModel.items$\"\n    [title]=\"title$ | async\"\n    [template]=\"carouselItem\"\n    itemWidth=\"285px\"\n  >\n  </cx-carousel>\n\n  <ng-template #carouselItem let-item=\"item\">\n    <div\n      class=\"data-cx-merchandising-product\"\n      [cxAttributes]=\"item.metadata\"\n      [cxAttributesNamePrefix]=\"'data-cx-merchandising-product'\"\n    ></div>\n    <a\n      tabindex=\"0\"\n      [routerLink]=\"{ cxRoute: 'product', params: item } | cxUrl\"\n      (click)=\"\n        onMerchandisingCarouselItemClick(merchandisingCarouselModel, item)\n      \"\n    >\n      <cx-media\n        *ngIf=\"item.images?.PRIMARY\"\n        [container]=\"item.images.PRIMARY\"\n        format=\"product\"\n      >\n      </cx-media>\n      <h4>{{ item.name }}</h4>\n      <div class=\"price\">\n        {{ item.price?.formattedValue }}\n      </div>\n      <div class=\"price\" *ngIf=\"item.stock?.stockLevel > 0; else outOfStock\">\n        {{ item.stock?.stockLevelStatus }} : {{ item.stock?.stockLevel }}\n      </div>\n      <ng-template #outOfStock>\n        <div class=\"price\">\n          {{ item.stock?.stockLevelStatus }}\n        </div>\n      </ng-template>\n    </a>\n  </ng-template>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1$1.CmsComponentData }, { type: MerchandisingCarouselComponentService }, { type: i1.RoutingService }, { type: i1$1.IntersectionService }, { type: i0.ElementRef }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class MerchandisingCarouselCmsModule {
}
MerchandisingCarouselCmsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselCmsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MerchandisingCarouselCmsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselCmsModule, declarations: [MerchandisingCarouselComponent], imports: [CommonModule,
        AttributesModule,
        CarouselModule,
        MediaModule,
        RouterModule,
        UrlModule], exports: [MerchandisingCarouselComponent] });
MerchandisingCarouselCmsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselCmsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                MerchandisingCarouselComponent: {
                    component: MerchandisingCarouselComponent,
                },
            },
        }),
    ], imports: [CommonModule,
        AttributesModule,
        CarouselModule,
        MediaModule,
        RouterModule,
        UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingCarouselCmsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        AttributesModule,
                        CarouselModule,
                        MediaModule,
                        RouterModule,
                        UrlModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                MerchandisingCarouselComponent: {
                                    component: MerchandisingCarouselComponent,
                                },
                            },
                        }),
                    ],
                    declarations: [MerchandisingCarouselComponent],
                    exports: [MerchandisingCarouselComponent],
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
class MerchandisingModule {
}
MerchandisingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MerchandisingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingModule, imports: [MerchandisingCarouselCmsModule] });
MerchandisingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingModule, providers: [
        {
            provide: MerchandisingStrategyAdapter,
            useClass: CdsMerchandisingStrategyAdapter,
        },
    ], imports: [MerchandisingCarouselCmsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MerchandisingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [MerchandisingCarouselCmsModule],
                    providers: [
                        {
                            provide: MerchandisingStrategyAdapter,
                            useClass: CdsMerchandisingStrategyAdapter,
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
class CdsModule {
    static forRoot(config) {
        return {
            ngModule: CdsModule,
            providers: [
                provideDefaultConfig(DEFAULT_CDS_CONFIG),
                provideDefaultConfig(config),
                provideConfigValidator(cdsConfigValidator),
                ProfileTagPushEventsService,
            ],
        };
    }
}
CdsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CdsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CdsModule, imports: [ProfileTagModule, TrackingModule, MerchandisingModule] });
CdsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsModule, imports: [ProfileTagModule, TrackingModule, MerchandisingModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [ProfileTagModule, TrackingModule, MerchandisingModule],
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

export { AddedToCartPushEvent, AttributesDirective, AttributesModule, BrandPageVisitedEvent, CartSnapshotPushEvent, CartViewPushEvent, CategoryViewPushEvent, CdsBackendConnector, CdsBackendNotificationAdapter, CdsConfig, CdsMerchandisingProductService, CdsMerchandisingSiteContextService, CdsMerchandisingStrategyAdapter, CdsMerchandisingUserContextService, CdsModule, ConsentChangedPushEvent, ConsentReferenceInterceptor, DEFAULT_CDS_CONFIG, DebugInterceptor, HomePageViewPushEvent, InternalProfileTagEventNames, KeywordSearchPushEvent, MerchandisingCarouselClickedEvent, MerchandisingCarouselCmsModule, MerchandisingCarouselComponent, MerchandisingCarouselComponentService, MerchandisingCarouselViewedEvent, MerchandisingModule, MerchandisingStrategyAdapter, MerchandisingStrategyConnector, ModifiedCartPushEvent, NavigatedPushEvent, OccBackendNotification, OrderConfirmationPushEvent, ProductViewPushEvent, ProfileTagCmsModule, ProfileTagComponent, ProfileTagEventService, ProfileTagInjectorService, ProfileTagLifecycleService, ProfileTagModule, ProfileTagPushEventsService, RemovedFromCartPushEvent, TrackingModule, TrackingService, cdsConfigValidator };
//# sourceMappingURL=spartacus-cds.mjs.map
