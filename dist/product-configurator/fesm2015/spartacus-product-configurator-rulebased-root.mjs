import * as i0 from '@angular/core';
import { Injectable, NgModule } from '@angular/core';
import * as i1$1 from '@angular/router';
import { RouterModule } from '@angular/router';
import * as i2$1 from '@spartacus/core';
import { provideDefaultConfig, Config, provideDefaultConfigFactory } from '@spartacus/core';
import * as i2 from '@spartacus/storefront';
import { BREAKPOINT, PAGE_LAYOUT_HANDLER, HamburgerMenuModule, PageLayoutComponent, CmsPageGuard } from '@spartacus/storefront';
import * as i1 from '@spartacus/product-configurator/common';
import { ConfiguratorRouter, CommonConfiguratorModule } from '@spartacus/product-configurator/common';
import { take, map, switchMap, filter, distinctUntilChanged, expand, catchError, tap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import * as i1$2 from '@angular/common/http';
import { HttpErrorResponse, HttpResponse, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BehaviorSubject, timer, throwError } from 'rxjs';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorPageLayoutHandler {
    constructor(configuratorRouterExtractorService, breakpointService, layoutConfig, commonConfiguratorUtilsService) {
        this.configuratorRouterExtractorService = configuratorRouterExtractorService;
        this.breakpointService = breakpointService;
        this.layoutConfig = layoutConfig;
        this.commonConfiguratorUtilsService = commonConfiguratorUtilsService;
    }
    handle(slots$, pageTemplate, section) {
        if (pageTemplate === CpqConfiguratorPageLayoutHandler.templateName &&
            section === CpqConfiguratorPageLayoutHandler.sectionHeader) {
            this.compileRouterAndResolution()
                .pipe(take(1))
                .subscribe((cont) => {
                slots$ = slots$.pipe(map((slots) => this.getHeaderSlots(slots, cont)));
            });
        }
        else if (pageTemplate === CpqConfiguratorPageLayoutHandler.templateName &&
            section === CpqConfiguratorPageLayoutHandler.sectionNavigation) {
            this.compileRouterAndResolution()
                .pipe(take(1))
                .subscribe((cont) => {
                slots$ = slots$.pipe(map((slots) => this.getNavigationSlots(slots, cont)));
            });
        }
        return slots$;
    }
    compileRouterAndResolution() {
        return this.configuratorRouterExtractorService.extractRouterData().pipe(switchMap((routerData) => this.breakpointService.isUp(BREAKPOINT.lg).pipe(map((isLargeResolution) => ({
            isLargeResolution: isLargeResolution,
            routerData,
        })))));
    }
    getHeaderSlots(slots, cont) {
        if (cont.routerData.pageType === ConfiguratorRouter.PageType.CONFIGURATION) {
            const extendedSlots = ['PreHeader'];
            extendedSlots.push(...slots);
            return extendedSlots;
        }
        else if (cont.routerData.displayOnly) {
            if (cont.isLargeResolution) {
                return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, CpqConfiguratorPageLayoutHandler.templateName, CpqConfiguratorPageLayoutHandler.sectionHeaderDisplayOnly, BREAKPOINT.lg);
            }
            else {
                return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, CpqConfiguratorPageLayoutHandler.templateName, CpqConfiguratorPageLayoutHandler.sectionHeaderDisplayOnly, BREAKPOINT.xs);
            }
        }
        else {
            return slots;
        }
    }
    getNavigationSlots(slots, cont) {
        if (cont.routerData.pageType === ConfiguratorRouter.PageType.OVERVIEW &&
            cont.routerData.displayOnly) {
            if (cont.isLargeResolution) {
                return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, CpqConfiguratorPageLayoutHandler.templateName, CpqConfiguratorPageLayoutHandler.sectionNavigationDisplayOnly, BREAKPOINT.lg);
            }
            else {
                return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, CpqConfiguratorPageLayoutHandler.templateName, CpqConfiguratorPageLayoutHandler.sectionNavigationDisplayOnly, BREAKPOINT.xs);
            }
        }
        else {
            return slots;
        }
    }
}
CpqConfiguratorPageLayoutHandler.templateName = 'CpqConfigurationTemplate';
CpqConfiguratorPageLayoutHandler.sectionHeaderDisplayOnly = 'headerDisplayOnly';
CpqConfiguratorPageLayoutHandler.sectionNavigationDisplayOnly = 'navigationDisplayOnly';
CpqConfiguratorPageLayoutHandler.sectionHeader = 'header';
CpqConfiguratorPageLayoutHandler.sectionNavigation = 'navigation';
CpqConfiguratorPageLayoutHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorPageLayoutHandler, deps: [{ token: i1.ConfiguratorRouterExtractorService }, { token: i2.BreakpointService }, { token: i2.LayoutConfig }, { token: i1.CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorPageLayoutHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorPageLayoutHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorPageLayoutHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorRouterExtractorService }, { type: i2.BreakpointService }, { type: i2.LayoutConfig }, { type: i1.CommonConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 *  Contains the layout configuration for the CPQ configurator pages. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from CpqConfiguratorInteractiveModule is active
 */
class CpqConfiguratorLayoutModule {
}
CpqConfiguratorLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorLayoutModule });
CpqConfiguratorLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorLayoutModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                CpqConfigurationTemplate: {
                    header: {
                        lg: {
                            slots: ['SiteLogo', 'CpqConfigExitButton', 'MiniCart'],
                        },
                        xs: {
                            slots: ['SiteLogo', 'CpqConfigExitButton', 'MiniCart'],
                        },
                    },
                    headerDisplayOnly: {
                        lg: {
                            slots: [
                                'SiteContext',
                                'SiteLinks',
                                'SiteLogo',
                                'SearchBox',
                                'SiteLogin',
                                'MiniCart',
                                'NavigationBar',
                            ],
                        },
                        xs: {
                            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
                        },
                    },
                    navigation: {
                        lg: { slots: [] },
                        slots: ['CpqConfigMenu'],
                    },
                    navigationDisplayOnly: {
                        lg: { slots: [] },
                        xs: {
                            slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
                        },
                    },
                    lg: {
                        slots: [
                            'CpqConfigHeader',
                            'CpqConfigBanner',
                            'CpqConfigMenu',
                            'CpqConfigContent',
                            'CpqConfigOverviewBanner',
                            'CpqConfigOverviewContent',
                            'CpqConfigBottombar',
                        ],
                    },
                    slots: [
                        'CpqConfigHeader',
                        'CpqConfigBanner',
                        'CpqConfigContent',
                        'CpqConfigOverviewBanner',
                        'CpqConfigOverviewContent',
                        'CpqConfigBottombar',
                    ],
                },
            },
        }),
        {
            provide: PAGE_LAYOUT_HANDLER,
            useExisting: CpqConfiguratorPageLayoutHandler,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                CpqConfigurationTemplate: {
                                    header: {
                                        lg: {
                                            slots: ['SiteLogo', 'CpqConfigExitButton', 'MiniCart'],
                                        },
                                        xs: {
                                            slots: ['SiteLogo', 'CpqConfigExitButton', 'MiniCart'],
                                        },
                                    },
                                    headerDisplayOnly: {
                                        lg: {
                                            slots: [
                                                'SiteContext',
                                                'SiteLinks',
                                                'SiteLogo',
                                                'SearchBox',
                                                'SiteLogin',
                                                'MiniCart',
                                                'NavigationBar',
                                            ],
                                        },
                                        xs: {
                                            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
                                        },
                                    },
                                    navigation: {
                                        lg: { slots: [] },
                                        slots: ['CpqConfigMenu'],
                                    },
                                    navigationDisplayOnly: {
                                        lg: { slots: [] },
                                        xs: {
                                            slots: ['SiteLogin', 'NavigationBar', 'SiteContext', 'SiteLinks'],
                                        },
                                    },
                                    lg: {
                                        slots: [
                                            'CpqConfigHeader',
                                            'CpqConfigBanner',
                                            'CpqConfigMenu',
                                            'CpqConfigContent',
                                            'CpqConfigOverviewBanner',
                                            'CpqConfigOverviewContent',
                                            'CpqConfigBottombar',
                                        ],
                                    },
                                    slots: [
                                        'CpqConfigHeader',
                                        'CpqConfigBanner',
                                        'CpqConfigContent',
                                        'CpqConfigOverviewBanner',
                                        'CpqConfigOverviewContent',
                                        'CpqConfigBottombar',
                                    ],
                                },
                            },
                        }),
                        {
                            provide: PAGE_LAYOUT_HANDLER,
                            useExisting: CpqConfiguratorPageLayoutHandler,
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
const defaultCpqInteractiveRoutingConfig = {
    routing: {
        routes: {
            configureCLOUDCPQCONFIGURATOR: {
                paths: ['configure/cpq/:ownerType/entityKey/:entityKey'],
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Takes care of the interactive configuration process (the user enters new attribute values and navigates through the configuration).
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots
 */
class CpqConfiguratorInteractiveModule {
}
CpqConfiguratorInteractiveModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInteractiveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorInteractiveModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInteractiveModule, imports: [i1$1.RouterModule, HamburgerMenuModule,
        CpqConfiguratorLayoutModule] });
CpqConfiguratorInteractiveModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInteractiveModule, providers: [provideDefaultConfig(defaultCpqInteractiveRoutingConfig)], imports: [RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                data: {
                    cxRoute: 'configureCLOUDCPQCONFIGURATOR',
                },
                component: PageLayoutComponent,
                canActivate: [CmsPageGuard],
            },
        ]),
        HamburgerMenuModule,
        CpqConfiguratorLayoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInteractiveModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                data: {
                                    cxRoute: 'configureCLOUDCPQCONFIGURATOR',
                                },
                                component: PageLayoutComponent,
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                        HamburgerMenuModule,
                        CpqConfiguratorLayoutModule,
                    ],
                    providers: [provideDefaultConfig(defaultCpqInteractiveRoutingConfig)],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCpqOverviewRoutingConfig = {
    routing: {
        routes: {
            configureOverviewCLOUDCPQCONFIGURATOR: {
                paths: [
                    'configure-overview/cpq/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
                    'configure-overview/cpq/:ownerType/entityKey/:entityKey',
                ],
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Takes care of the configuration overview that visualizes the attribute value assignments that have been done already in a condensed, read-only form.
 * The end-user can switch between the interactive view and this overview.
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots.
 * Some of the ng components on this view (tab bar, price summary and addToCart button) are shared between the interactive view and the overview.
 */
class CpqConfiguratorOverviewModule {
}
CpqConfiguratorOverviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorOverviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewModule, imports: [i1$1.RouterModule, CpqConfiguratorLayoutModule] });
CpqConfiguratorOverviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewModule, providers: [provideDefaultConfig(defaultCpqOverviewRoutingConfig)], imports: [RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'configureOverviewCLOUDCPQCONFIGURATOR',
                },
                canActivate: [CmsPageGuard],
            },
        ]),
        CpqConfiguratorLayoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorOverviewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'configureOverviewCLOUDCPQCONFIGURATOR',
                                },
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                        CpqConfiguratorLayoutModule,
                    ],
                    providers: [provideDefaultConfig(defaultCpqOverviewRoutingConfig)],
                }]
        }] });

class CpqAccessLoaderService {
    constructor(http, occEndpointsService, userIdService) {
        this.http = http;
        this.occEndpointsService = occEndpointsService;
        this.userIdService = userIdService;
    }
    getCpqAccessData() {
        return this.userIdService.takeUserId(true).pipe(switchMap((userId) => this.http.get(this.occEndpointsService.buildUrl('getCpqAccessData', {
            urlParams: { userId: userId },
        }))));
    }
}
CpqAccessLoaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqAccessLoaderService, deps: [{ token: i1$2.HttpClient }, { token: i2$1.OccEndpointsService }, { token: i2$1.UserIdService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqAccessLoaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqAccessLoaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqAccessLoaderService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1$2.HttpClient }, { type: i2$1.OccEndpointsService }, { type: i2$1.UserIdService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorAuthConfig {
}
CpqConfiguratorAuthConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorAuthConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorAuthConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorAuthConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorAuthConfig, decorators: [{
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
class CpqAccessStorageService {
    constructor(cpqAccessLoaderService, authService, config) {
        this.cpqAccessLoaderService = cpqAccessLoaderService;
        this.authService = authService;
        this.config = config;
        this.EXPIRED_TOKEN = {
            accessToken: 'INVALID DUMMY',
            accessTokenExpirationTime: 0,
            endpoint: '',
        };
    }
    ngOnDestroy() {
        var _a, _b;
        (_a = this.currentCpqAccessSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
        (_b = this.currentAuthServiceSubscription) === null || _b === void 0 ? void 0 : _b.unsubscribe();
    }
    getCpqAccessData() {
        if (!this.cpqAccessData$ || this._cpqAccessData$.hasError) {
            this.initCpqAccessData();
        }
        return this.cpqAccessData$;
    }
    /**
     * Renews the current access data. All subscribers of getCachedCpqAccessData()
     * will receive the new data. Will only have an effect, if there are any subscribers
     * and the user is logged in.
     */
    renewCpqAccessData() {
        // only force token refresh if initialized.
        if (this.cpqAccessData$) {
            this.stopAutoFetchingCpqAccessData();
            this._cpqAccessData$.next(this.EXPIRED_TOKEN); // invalidate cache
            this.authService
                .isUserLoggedIn()
                .pipe(take(1)) // get current login state
                .subscribe((loggedIn) => {
                // only fetch new token if user is logged in.
                if (loggedIn) {
                    this.startAutoFetchingCpqAccessData();
                }
            });
        }
    }
    initCpqAccessData() {
        var _a;
        this._cpqAccessData$ = new BehaviorSubject(this.EXPIRED_TOKEN);
        this.cpqAccessData$ = this._cpqAccessData$.pipe(
        // Never expose expired tokens - either cache was invalidated with expired token,
        // or the cached one expired before a new one was fetched.
        filter((data) => !this.isTokenExpired(data)));
        (_a = this.currentAuthServiceSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe(); // cancel subscriptions created for old
        this.currentAuthServiceSubscription = this.authService
            .isUserLoggedIn()
            .pipe(distinctUntilChanged()) // only react if user login status changes
            .subscribe((loggedIn) => {
            if (loggedIn) {
                // user logged in - start/stop to ensure token is refreshed
                this.stopAutoFetchingCpqAccessData();
                this.startAutoFetchingCpqAccessData();
            }
            else {
                // user logged out - cancel token fetching
                this.stopAutoFetchingCpqAccessData();
                this._cpqAccessData$.next(this.EXPIRED_TOKEN); // invalidate cache
            }
        });
    }
    stopAutoFetchingCpqAccessData() {
        var _a;
        (_a = this.currentCpqAccessSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    startAutoFetchingCpqAccessData() {
        this.currentCpqAccessSubscription = this.cpqAccessLoaderService
            .getCpqAccessData()
            .pipe(expand((data) => timer(this.fetchNextTokenIn(data)).pipe(switchMap(() => this.cpqAccessLoaderService.getCpqAccessData()))))
            .subscribe(this._cpqAccessData$); // also propagate errors
    }
    fetchNextTokenIn(data) {
        var _a;
        const authSettings = (_a = this.config.productConfigurator.cpq) === null || _a === void 0 ? void 0 : _a.authentication;
        if (authSettings) {
            // we schedule a request to update our cache some time before expiration
            let fetchNextIn = data.accessTokenExpirationTime -
                Date.now() -
                authSettings.tokenExpirationBuffer;
            if (fetchNextIn < authSettings.tokenMinValidity) {
                fetchNextIn = authSettings.tokenMinValidity;
            }
            else if (fetchNextIn > authSettings.tokenMaxValidity) {
                fetchNextIn = authSettings.tokenMaxValidity;
            }
            return fetchNextIn;
        }
        else {
            throw new Error('CPQ authentication configuration not present');
        }
    }
    isTokenExpired(tokenData) {
        var _a;
        const authSettings = (_a = this.config.productConfigurator.cpq) === null || _a === void 0 ? void 0 : _a.authentication;
        if (authSettings) {
            return (Date.now() >
                tokenData.accessTokenExpirationTime - authSettings.tokenExpirationBuffer);
        }
        else {
            throw new Error('CPQ authentication configuration not present');
        }
    }
}
CpqAccessStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqAccessStorageService, deps: [{ token: CpqAccessLoaderService }, { token: i2$1.AuthService }, { token: CpqConfiguratorAuthConfig }], target: i0.ɵɵFactoryTarget.Injectable });
CpqAccessStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqAccessStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqAccessStorageService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: CpqAccessLoaderService }, { type: i2$1.AuthService }, { type: CpqConfiguratorAuthConfig }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * This header attribute shall be used to mark any request made to the CPQ System.
 * The presence of it enables this interceptor to actually intercept
 * this request and to decorate it with the authentication related attributes.
 */
const MARKER_HEADER_CPQ_CONFIGURATOR = 'x-cpq-configurator';
class CpqConfiguratorRestInterceptor {
    constructor(cpqAccessStorageService) {
        this.cpqAccessStorageService = cpqAccessStorageService;
        this.HEADER_ATTR_CPQ_SESSION_ID = 'x-cpq-session-id';
        this.HEADER_ATTR_CPQ_NO_COOKIES = 'x-cpq-disable-cookies';
        /**
         * Although CPQ API is stateless and can work without session id, it's recommended to always append the CPQ session id to any request.
         * It enables CPQ load balancer to redirect the request always to the same node, so that configuration related data is already in memory
         * and does not need to be reloaded from DB. This can have a significant impact on performance nd reduce load in the CPQ system.
         */
        this.cpqSessionId = null;
    }
    intercept(request, next) {
        if (!request.headers.has(MARKER_HEADER_CPQ_CONFIGURATOR)) {
            return next.handle(request);
        }
        return this.cpqAccessStorageService.getCpqAccessData().pipe(take(1), // avoid request being re-executed when token expires
        switchMap((cpqData) => {
            return next.handle(this.enrichHeaders(request, cpqData)).pipe(catchError((errorResponse) => {
                return this.handleError(errorResponse, next, request);
            }), tap((response) => this.extractCpqSessionId(response)));
        }));
    }
    handleError(errorResponse, next, request) {
        if (errorResponse instanceof HttpErrorResponse) {
            if (errorResponse.status === 403) {
                this.cpqSessionId = null;
                this.cpqAccessStorageService.renewCpqAccessData();
                return this.cpqAccessStorageService.getCpqAccessData().pipe(take(1), switchMap((newCpqData) => {
                    return next
                        .handle(this.enrichHeaders(request, newCpqData))
                        .pipe(tap((response) => this.extractCpqSessionId(response)));
                }));
            }
        }
        return throwError(errorResponse); //propagate error
    }
    extractCpqSessionId(response) {
        if (response instanceof HttpResponse ||
            response instanceof HttpErrorResponse) {
            if (response.headers.has(this.HEADER_ATTR_CPQ_SESSION_ID)) {
                this.cpqSessionId = response.headers.get(this.HEADER_ATTR_CPQ_SESSION_ID);
            }
        }
    }
    enrichHeaders(request, cpqData) {
        let newRequest = request.clone({
            url: cpqData.endpoint + request.url,
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + cpqData.accessToken,
                [this.HEADER_ATTR_CPQ_NO_COOKIES]: 'true',
            }),
        });
        if (this.cpqSessionId) {
            newRequest = newRequest.clone({
                setHeaders: {
                    [this.HEADER_ATTR_CPQ_SESSION_ID]: this.cpqSessionId,
                },
            });
        }
        return newRequest;
    }
}
CpqConfiguratorRestInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestInterceptor, deps: [{ token: CpqAccessStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
CpqConfiguratorRestInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRestInterceptor, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: CpqAccessStorageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultCpqConfiguratorAuthConfig = {
    productConfigurator: {
        cpq: {
            authentication: {
                tokenExpirationBuffer: 10000,
                tokenMaxValidity: 24 * 60 * 60 * 1000,
                tokenMinValidity: 5000, // five seconds
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class CpqConfiguratorInterceptorModule {
}
CpqConfiguratorInterceptorModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInterceptorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorInterceptorModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInterceptorModule, imports: [CommonModule] });
CpqConfiguratorInterceptorModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInterceptorModule, providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CpqConfiguratorRestInterceptor,
            multi: true,
        },
        provideDefaultConfig(defaultCpqConfiguratorAuthConfig),
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorInterceptorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        {
                            provide: HTTP_INTERCEPTORS,
                            useClass: CpqConfiguratorRestInterceptor,
                            multi: true,
                        },
                        provideDefaultConfig(defaultCpqConfiguratorAuthConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Exposes the CPQ aspects that we need to load eagerly, like page mappings, routing
 * and interceptor related entities
 */
class CpqConfiguratorRootModule {
}
CpqConfiguratorRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CpqConfiguratorRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRootModule, imports: [CpqConfiguratorInteractiveModule,
        CpqConfiguratorOverviewModule,
        CpqConfiguratorInterceptorModule] });
CpqConfiguratorRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRootModule, providers: [provideDefaultConfig({ routing: { protected: true } })], imports: [CpqConfiguratorInteractiveModule,
        CpqConfiguratorOverviewModule,
        CpqConfiguratorInterceptorModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CpqConfiguratorRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CpqConfiguratorInteractiveModule,
                        CpqConfiguratorOverviewModule,
                        CpqConfiguratorInterceptorModule,
                    ],
                    //force early login
                    providers: [provideDefaultConfig({ routing: { protected: true } })],
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
const PRODUCT_CONFIGURATOR_RULEBASED_FEATURE = 'productConfiguratorRulebased';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const cmsComponents = [
    'ConfiguratorForm',
    'ConfiguratorOverviewForm',
    'ConfiguratorOverviewMenu',
    'ConfiguratorUpdateMessage',
    'ConfiguratorAddToCartButton',
    'ConfiguratorMenu',
    'ConfiguratorGroupTitle',
    'ConfiguratorOverviewBanner',
    'ConfiguratorPrevNext',
    'ConfiguratorPriceSummary',
    'ConfiguratorProductTitle',
    'ConfiguratorTabBar',
    'ConfiguratorExitButton',
    'ConfiguratorVariantCarousel',
    'CpqConfiguratorConflictAndErrorMessagesComponent',
    'ConfiguratorOverviewFilterButton',
    'ConfiguratorOverviewFilter',
    'ConfiguratorOverviewSidebar',
];
// TODO: Inline this factory when we start releasing Ivy compiled libraries
function defaultProductConfiguratorRulebasedComponentsConfig() {
    const config = {
        featureModules: {
            [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE]: {
                cmsComponents,
            },
        },
    };
    return config;
}
/**
 * Contains feature module configuration
 */
class RulebasedConfiguratorRootFeatureModule {
}
RulebasedConfiguratorRootFeatureModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorRootFeatureModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule });
RulebasedConfiguratorRootFeatureModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule, providers: [
        provideDefaultConfigFactory(defaultProductConfiguratorRulebasedComponentsConfig),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootFeatureModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [],
                    providers: [
                        provideDefaultConfigFactory(defaultProductConfiguratorRulebasedComponentsConfig),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultRulebasedRoutingConfig = {
    routing: {
        routes: {
            configureCPQCONFIGURATOR: {
                paths: ['configure/vc/:ownerType/entityKey/:entityKey'],
            },
            configureOverviewCPQCONFIGURATOR: {
                paths: [
                    'configure-overview/vc/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
                    'configure-overview/vc/:ownerType/entityKey/:entityKey',
                ],
            },
        },
    },
};

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Provides the default cx routing configuration for the rulebased configurator
 */
class RulebasedConfiguratorRoutingModule {
    static forRoot() {
        return {
            ngModule: RulebasedConfiguratorRoutingModule,
            providers: [provideDefaultConfig(defaultRulebasedRoutingConfig)],
        };
    }
}
RulebasedConfiguratorRoutingModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRoutingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorRoutingModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRoutingModule });
RulebasedConfiguratorRoutingModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRoutingModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRoutingModule, decorators: [{
            type: NgModule,
            args: [{}]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 *  Contains the layout configuration for the interactive configuration page. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorInteractiveModule is active
 */
class VariantConfiguratorInteractiveLayoutModule {
}
VariantConfiguratorInteractiveLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorInteractiveLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule });
VariantConfiguratorInteractiveLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                VariantConfigurationTemplate: {
                    header: {
                        lg: {
                            slots: [
                                'PreHeader',
                                'SiteLogo',
                                'VariantConfigExitButton',
                                'MiniCart',
                            ],
                        },
                        xs: {
                            slots: [
                                'PreHeader',
                                'SiteLogo',
                                'VariantConfigExitButton',
                                'MiniCart',
                            ],
                        },
                    },
                    navigation: {
                        lg: { slots: [] },
                        slots: ['VariantConfigMenu'],
                    },
                    lg: {
                        slots: [
                            'VariantConfigHeader',
                            'VariantConfigMenu',
                            'VariantConfigContent',
                            'VariantConfigBottombar',
                            'VariantConfigVariantCarousel',
                        ],
                    },
                    slots: [
                        'VariantConfigHeader',
                        'VariantConfigContent',
                        'VariantConfigBottombar',
                        'VariantConfigVariantCarousel',
                    ],
                },
            },
        }),
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                VariantConfigurationTemplate: {
                                    header: {
                                        lg: {
                                            slots: [
                                                'PreHeader',
                                                'SiteLogo',
                                                'VariantConfigExitButton',
                                                'MiniCart',
                                            ],
                                        },
                                        xs: {
                                            slots: [
                                                'PreHeader',
                                                'SiteLogo',
                                                'VariantConfigExitButton',
                                                'MiniCart',
                                            ],
                                        },
                                    },
                                    navigation: {
                                        lg: { slots: [] },
                                        slots: ['VariantConfigMenu'],
                                    },
                                    lg: {
                                        slots: [
                                            'VariantConfigHeader',
                                            'VariantConfigMenu',
                                            'VariantConfigContent',
                                            'VariantConfigBottombar',
                                            'VariantConfigVariantCarousel',
                                        ],
                                    },
                                    slots: [
                                        'VariantConfigHeader',
                                        'VariantConfigContent',
                                        'VariantConfigBottombar',
                                        'VariantConfigVariantCarousel',
                                    ],
                                },
                            },
                        }),
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Takes care of the interactive configuration process (the user enters new attribute values and navigates through the configuration).
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots
 */
class VariantConfiguratorInteractiveModule {
}
VariantConfiguratorInteractiveModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorInteractiveModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveModule, imports: [i1$1.RouterModule, HamburgerMenuModule,
        VariantConfiguratorInteractiveLayoutModule] });
VariantConfiguratorInteractiveModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveModule, imports: [RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                data: {
                    cxRoute: 'configureCPQCONFIGURATOR',
                },
                component: PageLayoutComponent,
                canActivate: [CmsPageGuard],
            },
        ]),
        HamburgerMenuModule,
        VariantConfiguratorInteractiveLayoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorInteractiveModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                data: {
                                    cxRoute: 'configureCPQCONFIGURATOR',
                                },
                                component: PageLayoutComponent,
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                        HamburgerMenuModule,
                        VariantConfiguratorInteractiveLayoutModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class VariantConfiguratorPageLayoutHandler {
    constructor(configuratorRouterExtractorService, breakpointService, layoutConfig, commonConfiguratorUtilsService) {
        this.configuratorRouterExtractorService = configuratorRouterExtractorService;
        this.breakpointService = breakpointService;
        this.layoutConfig = layoutConfig;
        this.commonConfiguratorUtilsService = commonConfiguratorUtilsService;
    }
    handle(slots$, pageTemplate, section) {
        if (pageTemplate === VariantConfiguratorPageLayoutHandler.templateName &&
            section === 'header') {
            this.configuratorRouterExtractorService
                .extractRouterData()
                .pipe(take(1))
                .subscribe((routerData) => {
                if (routerData.displayOnly) {
                    slots$ = slots$.pipe(switchMap(() => this.breakpointService.isUp(BREAKPOINT.lg)), map((isLargeResolution) => {
                        if (isLargeResolution) {
                            return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, VariantConfiguratorPageLayoutHandler.templateName, VariantConfiguratorPageLayoutHandler.sectionDisplayOnlyName, BREAKPOINT.lg);
                        }
                        else {
                            return this.commonConfiguratorUtilsService.getSlotsFromLayoutConfiguration(this.layoutConfig, VariantConfiguratorPageLayoutHandler.templateName, VariantConfiguratorPageLayoutHandler.sectionDisplayOnlyName, BREAKPOINT.xs);
                        }
                    }));
                }
            });
        }
        return slots$;
    }
}
VariantConfiguratorPageLayoutHandler.templateName = 'VariantConfigurationOverviewTemplate';
VariantConfiguratorPageLayoutHandler.sectionDisplayOnlyName = 'headerDisplayOnly';
VariantConfiguratorPageLayoutHandler.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorPageLayoutHandler, deps: [{ token: i1.ConfiguratorRouterExtractorService }, { token: i2.BreakpointService }, { token: i2.LayoutConfig }, { token: i1.CommonConfiguratorUtilsService }], target: i0.ɵɵFactoryTarget.Injectable });
VariantConfiguratorPageLayoutHandler.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorPageLayoutHandler, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorPageLayoutHandler, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ConfiguratorRouterExtractorService }, { type: i2.BreakpointService }, { type: i2.LayoutConfig }, { type: i1.CommonConfiguratorUtilsService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 *  Contains the layout configuration for the overview configuration page. This configuration is
 *  optional as of version 4.2, and reduces the components that are rendered in the header section.
 *  It needs to be explicitly imported, otherwise the default configuration
 *  from VariantConfiguratorOverviewModule is active
 */
class VariantConfiguratorOverviewLayoutModule {
}
VariantConfiguratorOverviewLayoutModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorOverviewLayoutModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule });
VariantConfiguratorOverviewLayoutModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule, providers: [
        provideDefaultConfig({
            layoutSlots: {
                VariantConfigurationOverviewTemplate: {
                    header: {
                        slots: ['SiteLogo', 'VariantConfigOverviewExitButton', 'MiniCart'],
                    },
                    headerDisplayOnly: {
                        lg: {
                            slots: [
                                'SiteContext',
                                'SiteLinks',
                                'SiteLogo',
                                'SearchBox',
                                'SiteLogin',
                                'MiniCart',
                                'NavigationBar',
                            ],
                        },
                        xs: {
                            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
                        },
                    },
                    lg: {
                        slots: [
                            'VariantConfigOverviewHeader',
                            'VariantConfigOverviewBanner',
                            'VariantConfigOverviewNavigation',
                            'VariantConfigOverviewContent',
                            'VariantConfigOverviewBottombar',
                        ],
                    },
                    slots: [
                        'VariantConfigOverviewHeader',
                        'VariantConfigOverviewBanner',
                        'VariantConfigOverviewFilterButton',
                        'VariantConfigOverviewContent',
                        'VariantConfigOverviewBottombar',
                    ],
                },
            },
        }),
        {
            provide: PAGE_LAYOUT_HANDLER,
            useExisting: VariantConfiguratorPageLayoutHandler,
            multi: true,
        },
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewLayoutModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        provideDefaultConfig({
                            layoutSlots: {
                                VariantConfigurationOverviewTemplate: {
                                    header: {
                                        slots: ['SiteLogo', 'VariantConfigOverviewExitButton', 'MiniCart'],
                                    },
                                    headerDisplayOnly: {
                                        lg: {
                                            slots: [
                                                'SiteContext',
                                                'SiteLinks',
                                                'SiteLogo',
                                                'SearchBox',
                                                'SiteLogin',
                                                'MiniCart',
                                                'NavigationBar',
                                            ],
                                        },
                                        xs: {
                                            slots: ['PreHeader', 'SiteLogo', 'SearchBox', 'MiniCart'],
                                        },
                                    },
                                    lg: {
                                        slots: [
                                            'VariantConfigOverviewHeader',
                                            'VariantConfigOverviewBanner',
                                            'VariantConfigOverviewNavigation',
                                            'VariantConfigOverviewContent',
                                            'VariantConfigOverviewBottombar',
                                        ],
                                    },
                                    slots: [
                                        'VariantConfigOverviewHeader',
                                        'VariantConfigOverviewBanner',
                                        'VariantConfigOverviewFilterButton',
                                        'VariantConfigOverviewContent',
                                        'VariantConfigOverviewBottombar',
                                    ],
                                },
                            },
                        }),
                        {
                            provide: PAGE_LAYOUT_HANDLER,
                            useExisting: VariantConfiguratorPageLayoutHandler,
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
/**
 * Takes care of the configuration overview that visualizes the attribute value assignments that have been done already in a condensed, read-only form.
 * The end-user can switch between the interactive view and this overview.
 * Provides routing, assignment of ng components to CMS components and assignment of CMS components to the layout slots.
 * Some of the ng components on this view (tab bar, price summary and addToCart button) are shared between the interactive view and the overview.
 */
class VariantConfiguratorOverviewModule {
}
VariantConfiguratorOverviewModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
VariantConfiguratorOverviewModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewModule, imports: [i1$1.RouterModule, VariantConfiguratorOverviewLayoutModule] });
VariantConfiguratorOverviewModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewModule, imports: [RouterModule.forChild([
            {
                // We can neither omit the path nor set to undefined
                // @ts-ignore
                path: null,
                component: PageLayoutComponent,
                data: {
                    cxRoute: 'configureOverviewCPQCONFIGURATOR',
                },
                canActivate: [CmsPageGuard],
            },
        ]),
        VariantConfiguratorOverviewLayoutModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: VariantConfiguratorOverviewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        RouterModule.forChild([
                            {
                                // We can neither omit the path nor set to undefined
                                // @ts-ignore
                                path: null,
                                component: PageLayoutComponent,
                                data: {
                                    cxRoute: 'configureOverviewCPQCONFIGURATOR',
                                },
                                canActivate: [CmsPageGuard],
                            },
                        ]),
                        VariantConfiguratorOverviewLayoutModule,
                    ],
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Exposes the root modules that we need to load statically. Contains page mappings, route configurations
 * and feature configuration
 */
class RulebasedConfiguratorRootModule {
    static forRoot() {
        return {
            ngModule: RulebasedConfiguratorRootModule,
        };
    }
}
RulebasedConfiguratorRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
RulebasedConfiguratorRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootModule, imports: [CommonModule,
        CommonConfiguratorModule,
        RulebasedConfiguratorRootFeatureModule,
        VariantConfiguratorInteractiveModule,
        VariantConfiguratorOverviewModule, RulebasedConfiguratorRoutingModule] });
RulebasedConfiguratorRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootModule, imports: [CommonModule,
        CommonConfiguratorModule,
        RulebasedConfiguratorRootFeatureModule,
        VariantConfiguratorInteractiveModule,
        VariantConfiguratorOverviewModule,
        RulebasedConfiguratorRoutingModule.forRoot()] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: RulebasedConfiguratorRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CommonConfiguratorModule,
                        RulebasedConfiguratorRootFeatureModule,
                        VariantConfiguratorInteractiveModule,
                        VariantConfiguratorOverviewModule,
                        RulebasedConfiguratorRoutingModule.forRoot(),
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
 * Generated bundle index. Do not edit.
 */

export { CpqAccessLoaderService, CpqAccessStorageService, CpqConfiguratorAuthConfig, CpqConfiguratorInteractiveModule, CpqConfiguratorInterceptorModule, CpqConfiguratorLayoutModule, CpqConfiguratorOverviewModule, CpqConfiguratorRestInterceptor, CpqConfiguratorRootModule, MARKER_HEADER_CPQ_CONFIGURATOR, PRODUCT_CONFIGURATOR_RULEBASED_FEATURE, RulebasedConfiguratorRootFeatureModule, RulebasedConfiguratorRootModule, RulebasedConfiguratorRoutingModule, VariantConfiguratorInteractiveLayoutModule, VariantConfiguratorInteractiveModule, VariantConfiguratorOverviewLayoutModule, VariantConfiguratorOverviewModule, VariantConfiguratorPageLayoutHandler, defaultProductConfiguratorRulebasedComponentsConfig };
//# sourceMappingURL=spartacus-product-configurator-rulebased-root.mjs.map
