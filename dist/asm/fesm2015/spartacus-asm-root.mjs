import * as i0 from '@angular/core';
import { Injectable, APP_INITIALIZER, NgModule, Inject, Optional } from '@angular/core';
import * as i1$1 from '@spartacus/core';
import { Config, OCC_HTTP_TOKEN, OCC_USER_ID_CONSTANTS, AuthStorageService, AuthActions, OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT, AuthHttpHeaderService, InterceptorUtil, USE_CUSTOMER_SUPPORT_AGENT_TOKEN, GlobalMessageType, AuthService, provideDefaultConfig, facadeFactory } from '@spartacus/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i3 from '@spartacus/storefront';
import { PageComponentModule, ICON_TYPE } from '@spartacus/storefront';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { of, BehaviorSubject, combineLatest, from } from 'rxjs';
import { map, concatMap, take, switchMap } from 'rxjs/operators';
import { __awaiter } from 'tslib';
import * as i3$1 from '@ngrx/store';
import * as i4 from '@spartacus/user/profile/root';
import * as i5 from '@spartacus/user/account/root';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmConfig {
}
AsmConfig.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmConfig.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmConfig, providedIn: 'root', useExisting: Config });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmConfig, decorators: [{
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
const ASM_ENABLED_LOCAL_STORAGE_KEY = 'asm_enabled';

/**
 * The AsmEnablerService is used to enable ASM for those scenario's
 * where it's actually used. This service is added to avoid any polution
 * of the UI and runtime performance for the ordinary production user.
 */
class AsmEnablerService {
    constructor(location, winRef, launchDialogService, featureModules) {
        this.location = location;
        this.winRef = winRef;
        this.launchDialogService = launchDialogService;
        this.featureModules = featureModules;
    }
    /**
     * Loads the ASM UI if needed. The ASM UI will be added based on the
     * existence of a URL parameter or previous usage given by local storage.
     */
    load() {
        if (this.isEnabled()) {
            this.addUi();
        }
    }
    /**
     * Indicates whether the ASM module is enabled.
     */
    isEnabled() {
        if (this.isLaunched() && !this.isUsedBefore()) {
            if (this.winRef.localStorage) {
                this.winRef.localStorage.setItem(ASM_ENABLED_LOCAL_STORAGE_KEY, 'true');
            }
        }
        return this.isLaunched() || this.isUsedBefore() || this.isEmulateInURL();
    }
    /**
     * Indicates whether ASM is launched through the URL,
     * using the asm flag in the URL.
     */
    isLaunched() {
        const params = this.location.path().split('?')[1];
        return !!params && params.split('&').includes('asm=true');
    }
    /**
     * check whether try to emulate customer from deeplink
     * */
    isEmulateInURL() {
        return this.location.path().indexOf('assisted-service/emulate?') > 0;
    }
    /**
     * Evaluates local storage where we persist the usage of ASM.
     */
    isUsedBefore() {
        if (this.winRef.localStorage) {
            return (this.winRef.localStorage.getItem(ASM_ENABLED_LOCAL_STORAGE_KEY) ===
                'true');
        }
        else {
            return false;
        }
    }
    /**
     * Adds the ASM UI by using the `cx-storefront` outlet.
     */
    addUi() {
        this.featureModules
            .resolveFeature('asm')
            .subscribe(() => this.launchDialogService.launch("ASM" /* LAUNCH_CALLER.ASM */));
    }
}
AsmEnablerService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmEnablerService, deps: [{ token: i1.Location }, { token: i1$1.WindowRef }, { token: i3.LaunchDialogService }, { token: i1$1.FeatureModulesService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmEnablerService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmEnablerService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmEnablerService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Location }, { type: i1$1.WindowRef }, { type: i3.LaunchDialogService }, { type: i1$1.FeatureModulesService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The ASM loader module takes care of loading the ASM UI
 * only in case there's a reason to do so.
 */
class AsmLoaderModule {
}
AsmLoaderModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmLoaderModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmLoaderModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmLoaderModule, imports: [CommonModule, PageComponentModule] });
AsmLoaderModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmLoaderModule, providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: asmFactory,
            deps: [AsmEnablerService],
            multi: true,
        },
    ], imports: [CommonModule, PageComponentModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmLoaderModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PageComponentModule],
                    providers: [
                        {
                            provide: APP_INITIALIZER,
                            useFactory: asmFactory,
                            deps: [AsmEnablerService],
                            multi: true,
                        },
                    ],
                }]
        }] });
/**
 *
 * We do not like to block the UI, which is why we delgate loading of ASM
 * to a real component; the router and state aren't available in an optimized
 * way during the APP_INITIALIZER.
 */
function asmFactory(asmEnablerService) {
    const isReady = () => {
        asmEnablerService.load();
    };
    return isReady;
}

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
var CustomerListColumnActionType;
(function (CustomerListColumnActionType) {
    CustomerListColumnActionType["START_SESSION"] = "START_SESSION";
    CustomerListColumnActionType["ORDER_HISTORY"] = "ORDER_HISTORY";
    CustomerListColumnActionType["ACTIVE_CART"] = "ACTIVE_CART";
})(CustomerListColumnActionType || (CustomerListColumnActionType = {}));

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
const defaultAsmConfig = {
    asm: {
        agentSessionTimer: {
            startingDelayInSeconds: 600,
        },
        customerSearch: {
            maxResults: 20,
        },
        customerList: {
            pageSize: 5,
            showAvatar: true,
            columns: [
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.customer',
                    renderer: (customer) => {
                        var _a;
                        return (_a = customer === null || customer === void 0 ? void 0 : customer.name) !== null && _a !== void 0 ? _a : '';
                    },
                    actionType: CustomerListColumnActionType.START_SESSION,
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.email',
                    renderer: (customer) => {
                        var _a;
                        return (_a = customer === null || customer === void 0 ? void 0 : customer.uid) !== null && _a !== void 0 ? _a : '';
                    },
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.phone',
                    renderer: (customer) => {
                        var _a, _b;
                        return (_b = (_a = customer === null || customer === void 0 ? void 0 : customer.defaultAddress) === null || _a === void 0 ? void 0 : _a.phone) !== null && _b !== void 0 ? _b : '';
                    },
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.account',
                    renderer: (customer) => {
                        var _a, _b;
                        return (_b = (_a = customer === null || customer === void 0 ? void 0 : customer.orgUnit) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
                    },
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.cart',
                    icon: {
                        symbol: ICON_TYPE.CART,
                        captionLocalizationKey: 'asm.customerList.tableHeader.cart',
                    },
                    actionType: CustomerListColumnActionType.ACTIVE_CART,
                },
                {
                    headerLocalizationKey: 'asm.customerList.tableHeader.order',
                    icon: {
                        symbol: ICON_TYPE.ORDER,
                        captionLocalizationKey: 'asm.customerList.tableHeader.order',
                    },
                    actionType: CustomerListColumnActionType.ORDER_HISTORY,
                },
            ],
        },
        userIdHttpHeader: {
            enable: true,
        },
    },
};

/**
 * Looks for a specific key in the HttpRequest's context (OCC_ASM_TOKEN) to decide when to
 * configure a request with 'sap-commerce-cloud-user-id' header.
 */
class UserIdHttpHeaderInterceptor {
    constructor(config, userIdService, userIdConstants) {
        this.config = config;
        this.userIdService = userIdService;
        this.userIdConstants = userIdConstants;
        this.userIdHeader = 'sap-commerce-cloud-user-id';
        this.uniqueUserIdConstants = new Set(Object.values(userIdConstants));
    }
    intercept(httpRequest, next) {
        var _a, _b;
        // Casting as <AsmConfig> to avoid circular dependencies with @spartacus/asm/core.
        if (!((_b = (_a = this.config.asm) === null || _a === void 0 ? void 0 : _a.userIdHttpHeader) === null || _b === void 0 ? void 0 : _b.enable)) {
            return next.handle(httpRequest);
        }
        const asmContext = httpRequest.context.get(OCC_HTTP_TOKEN);
        let userIdObservable;
        if (typeof asmContext.sendUserIdAsHeader === 'string') {
            userIdObservable = of(asmContext.sendUserIdAsHeader);
        }
        else if (asmContext.sendUserIdAsHeader) {
            userIdObservable = this.userIdService
                .takeUserId()
                .pipe(map((userId) => this.uniqueUserIdConstants.has(userId) ? undefined : userId));
        }
        else {
            return next.handle(httpRequest);
        }
        return userIdObservable.pipe(concatMap((userId) => {
            if (userId) {
                const request = httpRequest.clone({
                    headers: httpRequest.headers.set(this.userIdHeader, userId),
                });
                return next.handle(request);
            }
            else {
                return next.handle(httpRequest);
            }
        }));
    }
}
UserIdHttpHeaderInterceptor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserIdHttpHeaderInterceptor, deps: [{ token: i1$1.Config }, { token: i1$1.UserIdService }, { token: OCC_USER_ID_CONSTANTS }], target: i0.ɵɵFactoryTarget.Injectable });
UserIdHttpHeaderInterceptor.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserIdHttpHeaderInterceptor, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UserIdHttpHeaderInterceptor, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () {
        return [{ type: i1$1.Config }, { type: i1$1.UserIdService }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [OCC_USER_ID_CONSTANTS]
                    }] }];
    } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Indicates if auth token is for regular user or CS Agent.
 */
var TokenTarget;
(function (TokenTarget) {
    TokenTarget["CSAgent"] = "CSAgent";
    TokenTarget["User"] = "User";
})(TokenTarget || (TokenTarget = {}));
/**
 * With AsmAuthStorageService apart from storing the token we also need to store
 * information for which user is the token (regular user or CS Agent).
 *
 * Overrides `AuthStorageService`.
 */
class AsmAuthStorageService extends AuthStorageService {
    constructor() {
        super(...arguments);
        this._tokenTarget$ = new BehaviorSubject(TokenTarget.User);
    }
    /**
     * Get target user for current auth token.
     *
     * @return observable with TokenTarget
     */
    getTokenTarget() {
        return this._tokenTarget$;
    }
    /**
     * Set new token target.
     *
     * @param tokenTarget
     */
    setTokenTarget(tokenTarget) {
        this._tokenTarget$.next(tokenTarget);
    }
    /**
     * Get token for previously user session, when it was interrupted by CS agent login.
     *
     * @return previously logged in user token.
     */
    getEmulatedUserToken() {
        return this.emulatedUserToken;
    }
    /**
     * Save user token on CS agent login.
     *
     * @param token
     */
    setEmulatedUserToken(token) {
        this.emulatedUserToken = token;
    }
    /**
     * Change token target to CS Agent.
     */
    switchTokenTargetToCSAgent() {
        this._tokenTarget$.next(TokenTarget.CSAgent);
    }
    /**
     * Change token target to user.
     */
    switchTokenTargetToUser() {
        this._tokenTarget$.next(TokenTarget.User);
    }
    /**
     * When we start emulation from the UI (not by ASM login) we can't restore user session on cs agent logout.
     * Only available solution is to drop session we could restore, to avoid account hijack.
     */
    clearEmulatedUserToken() {
        this.emulatedUserToken = undefined;
    }
}
AsmAuthStorageService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthStorageService, deps: null, target: i0.ɵɵFactoryTarget.Injectable });
AsmAuthStorageService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthStorageService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthStorageService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });

/**
 * Auth service for CS agent. Useful to login/logout agent, start emulation
 * or get information about the status of emulation.
 */
class CsAgentAuthService {
    constructor(authService, authStorageService, userIdService, oAuthLibWrapperService, store, userProfileFacade, userAccountFacade, featureConfig) {
        this.authService = authService;
        this.authStorageService = authStorageService;
        this.userIdService = userIdService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.store = store;
        this.userProfileFacade = userProfileFacade;
        this.userAccountFacade = userAccountFacade;
        this.featureConfig = featureConfig;
    }
    /**
     * Loads access token for a customer support agent.
     * @param userId
     * @param password
     */
    authorizeCustomerSupportAgent(userId, password) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let userToken;
            // Start emulation for currently logged in user
            let customerId;
            if ((_a = this.featureConfig) === null || _a === void 0 ? void 0 : _a.isLevel('6.4')) {
                this.userAccountFacade
                    .get()
                    .subscribe((user) => (customerId = user === null || user === void 0 ? void 0 : user.customerId))
                    .unsubscribe();
            }
            this.authStorageService
                .getToken()
                .subscribe((token) => (userToken = token))
                .unsubscribe();
            this.authStorageService.switchTokenTargetToCSAgent();
            try {
                yield this.oAuthLibWrapperService.authorizeWithPasswordFlow(userId, password);
                this.store.dispatch(new AuthActions.Logout());
                if (customerId !== undefined && userToken !== undefined) {
                    // OCC specific user id handling. Customize when implementing different backend
                    this.userIdService.setUserId(customerId);
                    this.authStorageService.setEmulatedUserToken(userToken);
                    this.store.dispatch(new AuthActions.Login());
                }
                else {
                    // When we can't get the customerId just end all current sessions
                    this.userIdService.setUserId(OCC_USER_ID_ANONYMOUS);
                    this.authStorageService.clearEmulatedUserToken();
                }
            }
            catch (_b) {
                this.authStorageService.switchTokenTargetToUser();
            }
        });
    }
    /**
     * Starts an ASM customer emulation session.
     * A customer emulation session is stopped by calling logout().
     * @param customerId
     */
    startCustomerEmulationSession(customerId) {
        this.authStorageService.clearEmulatedUserToken();
        // OCC specific user id handling. Customize when implementing different backend
        this.store.dispatch(new AuthActions.Logout());
        this.userIdService.setUserId(customerId);
        this.store.dispatch(new AuthActions.Login());
    }
    /**
     * Check if CS agent is currently logged in.
     *
     * @returns observable emitting true when CS agent is logged in or false when not.
     */
    isCustomerSupportAgentLoggedIn() {
        return combineLatest([
            this.authStorageService.getToken(),
            this.authStorageService.getTokenTarget(),
        ]).pipe(map(([token, tokenTarget]) => Boolean((token === null || token === void 0 ? void 0 : token.access_token) && tokenTarget === TokenTarget.CSAgent)));
    }
    /**
     * Utility function to determine if customer is emulated.
     *
     * @returns observable emitting true when there is active emulation session or false when not.
     */
    isCustomerEmulated() {
        return this.userIdService.isEmulated();
    }
    /**
     * Returns the customer support agent's token loading status
     */
    getCustomerSupportAgentTokenLoading() {
        // TODO(#8248): Create new loading state outside of store
        return of(false);
    }
    /**
     * Logout a customer support agent.
     */
    logoutCustomerSupportAgent() {
        return __awaiter(this, void 0, void 0, function* () {
            const emulatedToken = this.authStorageService.getEmulatedUserToken();
            let isCustomerEmulated;
            this.userIdService
                .isEmulated()
                .subscribe((emulated) => (isCustomerEmulated = emulated))
                .unsubscribe();
            yield this.oAuthLibWrapperService.revokeAndLogout();
            this.store.dispatch({ type: '[Auth] Logout Customer Support Agent' });
            this.authStorageService.setTokenTarget(TokenTarget.User);
            if (isCustomerEmulated && emulatedToken) {
                this.store.dispatch(new AuthActions.Logout());
                this.authStorageService.setToken(emulatedToken);
                this.userIdService.setUserId(OCC_USER_ID_CURRENT);
                this.authStorageService.clearEmulatedUserToken();
                this.store.dispatch(new AuthActions.Login());
            }
            else {
                this.authService.logout();
            }
        });
    }
}
CsAgentAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CsAgentAuthService, deps: [{ token: i1$1.AuthService }, { token: AsmAuthStorageService }, { token: i1$1.UserIdService }, { token: i1$1.OAuthLibWrapperService }, { token: i3$1.Store }, { token: i4.UserProfileFacade }, { token: i5.UserAccountFacade }, { token: i1$1.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
CsAgentAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CsAgentAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CsAgentAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: i1$1.AuthService }, { type: AsmAuthStorageService }, { type: i1$1.UserIdService }, { type: i1$1.OAuthLibWrapperService }, { type: i3$1.Store }, { type: i4.UserProfileFacade }, { type: i5.UserAccountFacade }, { type: i1$1.FeatureConfigService, decorators: [{
                        type: Optional
                    }] }];
    } });

/**
 * Overrides `AuthHttpHeaderService` to handle asm calls as well (not only OCC)
 * in cases of normal user session and on customer emulation.
 */
class AsmAuthHttpHeaderService extends AuthHttpHeaderService {
    constructor(authService, authStorageService, csAgentAuthService, oAuthLibWrapperService, routingService, globalMessageService, occEndpointsService, authRedirectService) {
        super(authService, authStorageService, oAuthLibWrapperService, routingService, occEndpointsService, globalMessageService, authRedirectService);
        this.authService = authService;
        this.authStorageService = authStorageService;
        this.csAgentAuthService = csAgentAuthService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.routingService = routingService;
        this.globalMessageService = globalMessageService;
        this.occEndpointsService = occEndpointsService;
        this.authRedirectService = authRedirectService;
    }
    /**
     * Checks if the authorization header should be added to the request
     *
     *  @override
     */
    shouldAddAuthorizationHeader(request) {
        return (super.shouldAddAuthorizationHeader(request) ||
            this.isCSAgentTokenRequest(request));
    }
    /**
     * @override
     *
     * Checks if particular request should be handled by this service.
     */
    shouldCatchError(request) {
        return (super.shouldCatchError(request) || this.isCSAgentTokenRequest(request));
    }
    /**
     * @override
     *
     * Adds `Authorization` header to occ and CS agent requests.
     * For CS agent requests also removes the `cx-use-csagent-token` header (to avoid problems with CORS).
     */
    alterRequest(request, token) {
        const hasAuthorizationHeader = !!this.getAuthorizationHeader(request);
        const isCSAgentRequest = this.isCSAgentTokenRequest(request);
        let req = super.alterRequest(request, token);
        if (!hasAuthorizationHeader && isCSAgentRequest) {
            req = request.clone({
                setHeaders: Object.assign({}, this.createAuthorizationHeader(token)),
            });
            return InterceptorUtil.removeHeader(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, req);
        }
        return req;
    }
    isCSAgentTokenRequest(request) {
        const isRequestWithCSAgentToken = InterceptorUtil.getInterceptorParam(USE_CUSTOMER_SUPPORT_AGENT_TOKEN, request.headers);
        return Boolean(isRequestWithCSAgentToken);
    }
    /**
     * @override
     *
     * On backend errors indicating expired `refresh_token` we need to logout
     * currently logged in user and CS agent.
     */
    handleExpiredRefreshToken() {
        this.csAgentAuthService
            .isCustomerSupportAgentLoggedIn()
            .pipe(take(1))
            .subscribe((csAgentLoggedIn) => {
            if (csAgentLoggedIn) {
                this.authService.setLogoutProgress(true);
                this.csAgentAuthService.logoutCustomerSupportAgent();
                this.globalMessageService.add({
                    key: 'asm.csagentTokenExpired',
                }, GlobalMessageType.MSG_TYPE_ERROR);
            }
            else {
                super.handleExpiredRefreshToken();
            }
        });
    }
}
AsmAuthHttpHeaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthHttpHeaderService, deps: [{ token: i1$1.AuthService }, { token: i1$1.AuthStorageService }, { token: CsAgentAuthService }, { token: i1$1.OAuthLibWrapperService }, { token: i1$1.RoutingService }, { token: i1$1.GlobalMessageService }, { token: i1$1.OccEndpointsService }, { token: i1$1.AuthRedirectService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmAuthHttpHeaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthHttpHeaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthHttpHeaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.AuthService }, { type: i1$1.AuthStorageService }, { type: CsAgentAuthService }, { type: i1$1.OAuthLibWrapperService }, { type: i1$1.RoutingService }, { type: i1$1.GlobalMessageService }, { type: i1$1.OccEndpointsService }, { type: i1$1.AuthRedirectService }]; } });

/**
 * Version of AuthService that is working for both user na CS agent.
 * Overrides AuthService when ASM module is enabled.
 */
class AsmAuthService extends AuthService {
    constructor(store, userIdService, oAuthLibWrapperService, authStorageService, authRedirectService, globalMessageService, routingService, authMultisiteIsolationService) {
        super(store, userIdService, oAuthLibWrapperService, authStorageService, authRedirectService, routingService, authMultisiteIsolationService);
        this.store = store;
        this.userIdService = userIdService;
        this.oAuthLibWrapperService = oAuthLibWrapperService;
        this.authStorageService = authStorageService;
        this.authRedirectService = authRedirectService;
        this.globalMessageService = globalMessageService;
        this.routingService = routingService;
        this.authMultisiteIsolationService = authMultisiteIsolationService;
    }
    canUserLogin() {
        let tokenTarget;
        let token;
        this.authStorageService
            .getToken()
            .subscribe((tok) => (token = tok))
            .unsubscribe();
        this.authStorageService
            .getTokenTarget()
            .subscribe((tokTarget) => (tokenTarget = tokTarget))
            .unsubscribe();
        return !(Boolean(token === null || token === void 0 ? void 0 : token.access_token) && tokenTarget === TokenTarget.CSAgent);
    }
    warnAboutLoggedCSAgent() {
        this.globalMessageService.add({
            key: 'asm.auth.agentLoggedInError',
        }, GlobalMessageType.MSG_TYPE_ERROR);
    }
    /**
     * Loads a new user token with Resource Owner Password Flow when CS agent is not logged in.
     * @param userId
     * @param password
     */
    loginWithCredentials(userId, password) {
        const _super = Object.create(null, {
            loginWithCredentials: { get: () => super.loginWithCredentials }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.canUserLogin()) {
                yield _super.loginWithCredentials.call(this, userId, password);
            }
            else {
                this.warnAboutLoggedCSAgent();
            }
        });
    }
    /**
     * Initialize Implicit/Authorization Code flow by redirecting to OAuth server when CS agent is not logged in.
     */
    loginWithRedirect() {
        if (this.canUserLogin()) {
            super.loginWithRedirect();
            return true;
        }
        else {
            this.warnAboutLoggedCSAgent();
            return false;
        }
    }
    /**
     * Revokes tokens and clears state for logged user (tokens, userId).
     * To perform logout it is best to use `logout` method. Use this method with caution.
     */
    coreLogout() {
        return this.userIdService
            .isEmulated()
            .pipe(take(1), switchMap((isEmulated) => {
            if (isEmulated) {
                this.authStorageService.clearEmulatedUserToken();
                this.userIdService.clearUserId();
                this.store.dispatch(new AuthActions.Logout());
                return of(true);
            }
            else {
                return from(super.coreLogout());
            }
        }))
            .toPromise();
    }
    /**
     * Returns `true` if user is logged in or being emulated.
     */
    isUserLoggedIn() {
        return combineLatest([
            this.authStorageService.getToken(),
            this.userIdService.isEmulated(),
            this.authStorageService.getTokenTarget(),
        ]).pipe(map(([token, isEmulated, tokenTarget]) => Boolean(token === null || token === void 0 ? void 0 : token.access_token) &&
            (tokenTarget === TokenTarget.User ||
                (tokenTarget === TokenTarget.CSAgent && isEmulated))));
    }
}
AsmAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthService, deps: [{ token: i3$1.Store }, { token: i1$1.UserIdService }, { token: i1$1.OAuthLibWrapperService }, { token: AsmAuthStorageService }, { token: i1$1.AuthRedirectService }, { token: i1$1.GlobalMessageService }, { token: i1$1.RoutingService }, { token: i1$1.AuthMultisiteIsolationService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i3$1.Store }, { type: i1$1.UserIdService }, { type: i1$1.OAuthLibWrapperService }, { type: AsmAuthStorageService }, { type: i1$1.AuthRedirectService }, { type: i1$1.GlobalMessageService }, { type: i1$1.RoutingService }, { type: i1$1.AuthMultisiteIsolationService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmRootModule {
}
AsmRootModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmRootModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmRootModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmRootModule, imports: [AsmLoaderModule] });
AsmRootModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmRootModule, providers: [
        provideDefaultConfig(defaultAsmConfig),
        {
            provide: AuthStorageService,
            useExisting: AsmAuthStorageService,
        },
        {
            provide: AuthService,
            useExisting: AsmAuthService,
        },
        {
            provide: AuthHttpHeaderService,
            useExisting: AsmAuthHttpHeaderService,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: UserIdHttpHeaderInterceptor,
            multi: true,
        },
    ], imports: [AsmLoaderModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmRootModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [AsmLoaderModule],
                    providers: [
                        provideDefaultConfig(defaultAsmConfig),
                        {
                            provide: AuthStorageService,
                            useExisting: AsmAuthStorageService,
                        },
                        {
                            provide: AuthService,
                            useExisting: AsmAuthService,
                        },
                        {
                            provide: AuthHttpHeaderService,
                            useExisting: AsmAuthHttpHeaderService,
                        },
                        {
                            provide: HTTP_INTERCEPTORS,
                            useExisting: UserIdHttpHeaderInterceptor,
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
const ASM_FEATURE = 'asm';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmBindCartFacade {
}
AsmBindCartFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmBindCartFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: AsmBindCartFacade,
        feature: ASM_FEATURE,
        methods: ['bindCart'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmBindCartFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: AsmBindCartFacade,
                        feature: ASM_FEATURE,
                        methods: ['bindCart'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCreateCustomerFacade {
}
AsmCreateCustomerFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmCreateCustomerFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: AsmCreateCustomerFacade,
        feature: ASM_FEATURE,
        methods: ['createCustomer'],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCreateCustomerFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: AsmCreateCustomerFacade,
                        feature: ASM_FEATURE,
                        methods: ['createCustomer'],
                    }),
                }]
        }] });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class AsmCustomerListFacade {
}
AsmCustomerListFacade.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListFacade, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AsmCustomerListFacade.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListFacade, providedIn: 'root', useFactory: () => facadeFactory({
        facade: AsmCustomerListFacade,
        feature: ASM_FEATURE,
        methods: [
            'getCustomerLists',
            'getCustomerListsState',
            'customerListCustomersSearch',
            'getCustomerListCustomersSearchResults',
            'getCustomerListCustomersSearchResultsLoading',
            'customerListCustomersSearchReset',
            'getCustomerListCustomersSearchResultsError',
        ],
    }) });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomerListFacade, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: () => facadeFactory({
                        facade: AsmCustomerListFacade,
                        feature: ASM_FEATURE,
                        methods: [
                            'getCustomerLists',
                            'getCustomerListsState',
                            'customerListCustomersSearch',
                            'getCustomerListCustomersSearchResults',
                            'getCustomerListCustomersSearchResultsLoading',
                            'customerListCustomersSearchReset',
                            'getCustomerListCustomersSearchResultsError',
                        ],
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

class AsmDeepLinkService {
    constructor(routingService, winRef, asmEnablerService) {
        var _a, _b;
        this.routingService = routingService;
        this.winRef = winRef;
        this.asmEnablerService = asmEnablerService;
        this.searchParams = new URLSearchParams((_b = (_a = this.winRef) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.search);
    }
    /**
     * check whether try to emulate customer from deeplink
     */
    isEmulateInURL() {
        var _a;
        return ((_a = this.asmEnablerService) === null || _a === void 0 ? void 0 : _a.isEmulateInURL()) || false;
    }
    /**
     * Returns a deep link parameter value if it is in the url.
     */
    getSearchParameter(key) {
        var _a;
        return (_a = this.searchParams.get(key)) !== null && _a !== void 0 ? _a : undefined;
    }
    /**
     * Handles the navigation based on deep link parameters in the URL
     * or passed parameters.
     */
    handleNavigation(parameters = this.getParamsInUrl()) {
        if (parameters.cartType === 'active') {
            // Navigate to active cart
            this.routingService.go({ cxRoute: 'cart' });
        }
        else if (parameters.cartType === 'saved' && parameters.cartId) {
            // Navigate to saved cart
            this.routingService.go('my-account/saved-cart/' + parameters.cartId);
        }
        else if (parameters.orderId) {
            // Navigate to order details
            this.routingService.go({
                cxRoute: 'orderDetails',
                params: { code: parameters.orderId },
            });
        }
        else if (parameters.ticketId) {
            // Navigate to support ticket details
            this.routingService.go({
                cxRoute: 'supportTicketDetails',
                params: { ticketCode: parameters.ticketId },
            });
        }
    }
    /**
     * Returns valid deep link parameters in the url.
     */
    getParamsInUrl() {
        const params = {
            customerId: this.getSearchParameter('customerId'),
            orderId: this.getSearchParameter('orderId'),
            ticketId: this.getSearchParameter('ticketId'),
            cartId: this.getSearchParameter('cartId'),
            cartType: this.getSearchParameter('cartType'),
        };
        // Filter undefined properties
        return Object.fromEntries(Object.entries(params).filter(([_, v]) => !!v));
    }
}
AsmDeepLinkService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmDeepLinkService, deps: [{ token: i1$1.RoutingService }, { token: i1$1.WindowRef }, { token: AsmEnablerService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmDeepLinkService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmDeepLinkService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmDeepLinkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1$1.RoutingService }, { type: i1$1.WindowRef }, { type: AsmEnablerService }]; } });

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

export { ASM_ENABLED_LOCAL_STORAGE_KEY, ASM_FEATURE, AsmAuthHttpHeaderService, AsmAuthService, AsmAuthStorageService, AsmBindCartFacade, AsmConfig, AsmCreateCustomerFacade, AsmCustomerListFacade, AsmDeepLinkService, AsmEnablerService, AsmLoaderModule, AsmRootModule, CsAgentAuthService, CustomerListColumnActionType, TokenTarget, asmFactory };
//# sourceMappingURL=spartacus-asm-root.mjs.map
