/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, Optional, inject } from '@angular/core';
import { ASM_ENABLED_LOCAL_STORAGE_KEY, } from '@spartacus/asm/root';
import { RoutingService } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { AsmDialogActionType, } from '@spartacus/asm/customer-360/root';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/asm/root";
export class AsmComponentService {
    constructor(authService, csAgentAuthService, winRef, 
    // TODO(CXSPA-3090): Remove optional flag in 7.0 where service is used
    asmEnablerService, asmDeepLinkService) {
        this.authService = authService;
        this.csAgentAuthService = csAgentAuthService;
        this.winRef = winRef;
        this.asmEnablerService = asmEnablerService;
        this.asmDeepLinkService = asmDeepLinkService;
        this.isEmulatedByDeepLink$ = new BehaviorSubject(false);
        this.showDeeplinkCartInfoAlert$ = new BehaviorSubject(false);
        this.routingService = inject(RoutingService);
        // TODO(CXSPA-3090): We can remove this in 7.0 and use asmDeepLinkService instead.
        this.searchparam = new URLSearchParams(this.winRef?.location?.search);
    }
    /**
     * Returns a deep link parameter value if it is in the url.
     */
    getSearchParameter(key) {
        // TODO(CXSPA-3090): Use asmDeepLinkService only in 7.0
        return (this.asmDeepLinkService?.getSearchParameter(key) ??
            this.searchparam.get(key));
    }
    isEmulatedByDeepLink() {
        return this.isEmulatedByDeepLink$;
    }
    setEmulatedByDeepLink(emulated) {
        this.isEmulatedByDeepLink$.next(emulated);
    }
    setShowDeeplinkCartInfoAlert(display) {
        this.showDeeplinkCartInfoAlert$.next(display);
    }
    shouldShowDeeplinkCartInfoAlert() {
        return this.showDeeplinkCartInfoAlert$;
    }
    logoutCustomerSupportAgentAndCustomer() {
        this.csAgentAuthService.logoutCustomerSupportAgent();
    }
    logoutCustomer() {
        this.authService.logout();
    }
    isCustomerEmulationSessionInProgress() {
        return this.csAgentAuthService.isCustomerEmulated();
    }
    /**
     * We're currently only removing the persisted storage in the browser
     * to ensure the ASM experience isn't loaded on the next visit. There are a few
     * optimizations we could think of:
     * - drop the `asm` parameter from the URL, in case it's still there
     * - remove the generated UI from the DOM (outlets currently do not support this)
     */
    unload() {
        if (this.winRef.localStorage) {
            this.winRef.localStorage.removeItem(ASM_ENABLED_LOCAL_STORAGE_KEY);
        }
    }
    /**
     * check whether try to emulate customer from deeplink
     */
    isEmulateInURL() {
        // TODO(CXSPA-3090): Use asmDeepLinkService only in 7.0
        return ((this.asmDeepLinkService?.isEmulateInURL() ??
            this.asmEnablerService?.isEmulateInURL()) ||
            false);
    }
    /**
     * Returns valid deep link parameters in the url.
     */
    getDeepLinkUrlParams() {
        return this.asmDeepLinkService?.getParamsInUrl();
    }
    /**
     * Handles the navigation based on deep link parameters in the URL
     * or passed parameter.
     */
    handleDeepLinkNavigation(parameters = this.getDeepLinkUrlParams()) {
        this.asmDeepLinkService?.handleNavigation(parameters);
    }
    handleAsmDialogAction(event) {
        if (typeof event === 'object' &&
            event.actionType === AsmDialogActionType.NAVIGATE) {
            this.routingService.go(event.route);
        }
    }
}
AsmComponentService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentService, deps: [{ token: i1.AuthService }, { token: i2.CsAgentAuthService }, { token: i1.WindowRef }, { token: i2.AsmEnablerService, optional: true }, { token: i2.AsmDeepLinkService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
AsmComponentService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmComponentService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.CsAgentAuthService }, { type: i1.WindowRef }, { type: i2.AsmEnablerService, decorators: [{
                    type: Optional
                }] }, { type: i2.AsmDeepLinkService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWNvbXBvbmVudC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jb21wb25lbnRzL3NlcnZpY2VzL2FzbS1jb21wb25lbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFDTCw2QkFBNkIsR0FLOUIsTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEVBQWUsY0FBYyxFQUFhLE1BQU0saUJBQWlCLENBQUM7QUFDekUsT0FBTyxFQUFFLGVBQWUsRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBRUwsbUJBQW1CLEdBQ3BCLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUFLMUMsTUFBTSxPQUFPLG1CQUFtQjtJQXdCOUIsWUFDWSxXQUF3QixFQUN4QixrQkFBc0MsRUFDdEMsTUFBaUI7SUFDM0Isc0VBQXNFO0lBQ2hELGlCQUFxQyxFQUNyQyxrQkFBdUM7UUFMbkQsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBRUwsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFvQjtRQUNyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXFCO1FBNUIvRCwwQkFBcUIsR0FBNkIsSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkUsK0JBQTBCLEdBQ2xDLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRW5CLG1CQUFjLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBMEJoRCxrRkFBa0Y7UUFDbEYsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQ7O09BRUc7SUFDSCxrQkFBa0IsQ0FBQyxHQUFXO1FBQzVCLHVEQUF1RDtRQUN2RCxPQUFPLENBQ0wsSUFBSSxDQUFDLGtCQUFrQixFQUFFLGtCQUFrQixDQUFDLEdBQUcsQ0FBQztZQUNoRCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FDMUIsQ0FBQztJQUNKLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDcEMsQ0FBQztJQUVELHFCQUFxQixDQUFDLFFBQWlCO1FBQ3JDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELDRCQUE0QixDQUFDLE9BQWdCO1FBQzNDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELCtCQUErQjtRQUM3QixPQUFPLElBQUksQ0FBQywwQkFBMEIsQ0FBQztJQUN6QyxDQUFDO0lBRUQscUNBQXFDO1FBQ25DLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsb0NBQW9DO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsY0FBYztRQUNaLHVEQUF1RDtRQUN2RCxPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsQ0FBQztZQUMzQyxLQUFLLENBQ04sQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNILG9CQUFvQjtRQUNsQixPQUFPLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLEVBQUUsQ0FBQztJQUNuRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsd0JBQXdCLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtRQUMvRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELHFCQUFxQixDQUFDLEtBQW9DO1FBQ3hELElBQ0UsT0FBTyxLQUFLLEtBQUssUUFBUTtZQUN6QixLQUFLLENBQUMsVUFBVSxLQUFLLG1CQUFtQixDQUFDLFFBQVEsRUFDakQ7WUFDQSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDOztnSEExSFUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkE4QkksUUFBUTs7MEJBQ1IsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUsIE9wdGlvbmFsLCBpbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFTTV9FTkFCTEVEX0xPQ0FMX1NUT1JBR0VfS0VZLFxuICBDc0FnZW50QXV0aFNlcnZpY2UsXG4gIEFzbURlZXBMaW5rUGFyYW1ldGVycyxcbiAgQXNtRGVlcExpbmtTZXJ2aWNlLFxuICBBc21FbmFibGVyU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9hc20vcm9vdCc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSwgUm91dGluZ1NlcnZpY2UsIFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIEFzbURpYWxvZ0FjdGlvbkV2ZW50LFxuICBBc21EaWFsb2dBY3Rpb25UeXBlLFxufSBmcm9tICdAc3BhcnRhY3VzL2FzbS9jdXN0b21lci0zNjAvcm9vdCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBc21Db21wb25lbnRTZXJ2aWNlIHtcbiAgcHJvdGVjdGVkIHNlYXJjaHBhcmFtOiBVUkxTZWFyY2hQYXJhbXM7XG4gIGlzRW11bGF0ZWRCeURlZXBMaW5rJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdChmYWxzZSk7XG4gIHByb3RlY3RlZCBzaG93RGVlcGxpbmtDYXJ0SW5mb0FsZXJ0JDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0KGZhbHNlKTtcblxuICBwcm90ZWN0ZWQgcm91dGluZ1NlcnZpY2UgPSBpbmplY3QoUm91dGluZ1NlcnZpY2UpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBjc0FnZW50QXV0aFNlcnZpY2U6IENzQWdlbnRBdXRoU2VydmljZSxcbiAgICB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3VuaWZpZWQtc2lnbmF0dXJlc1xuICAgIGFzbUVuYWJsZXJTZXJ2aWNlOiBBc21FbmFibGVyU2VydmljZSxcbiAgICBhc21EZWVwTGlua1NlcnZpY2U6IEFzbURlZXBMaW5rU2VydmljZVxuICApO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgNy4wIChDWFNQQS0zMDkwKVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgYXV0aFNlcnZpY2U6IEF1dGhTZXJ2aWNlLFxuICAgIGNzQWdlbnRBdXRoU2VydmljZTogQ3NBZ2VudEF1dGhTZXJ2aWNlLFxuICAgIHdpblJlZjogV2luZG93UmVmXG4gICk7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNzQWdlbnRBdXRoU2VydmljZTogQ3NBZ2VudEF1dGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZixcbiAgICAvLyBUT0RPKENYU1BBLTMwOTApOiBSZW1vdmUgb3B0aW9uYWwgZmxhZyBpbiA3LjAgd2hlcmUgc2VydmljZSBpcyB1c2VkXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGFzbUVuYWJsZXJTZXJ2aWNlPzogQXNtRW5hYmxlclNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGFzbURlZXBMaW5rU2VydmljZT86IEFzbURlZXBMaW5rU2VydmljZVxuICApIHtcbiAgICAvLyBUT0RPKENYU1BBLTMwOTApOiBXZSBjYW4gcmVtb3ZlIHRoaXMgaW4gNy4wIGFuZCB1c2UgYXNtRGVlcExpbmtTZXJ2aWNlIGluc3RlYWQuXG4gICAgdGhpcy5zZWFyY2hwYXJhbSA9IG5ldyBVUkxTZWFyY2hQYXJhbXModGhpcy53aW5SZWY/LmxvY2F0aW9uPy5zZWFyY2gpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBkZWVwIGxpbmsgcGFyYW1ldGVyIHZhbHVlIGlmIGl0IGlzIGluIHRoZSB1cmwuXG4gICAqL1xuICBnZXRTZWFyY2hQYXJhbWV0ZXIoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAvLyBUT0RPKENYU1BBLTMwOTApOiBVc2UgYXNtRGVlcExpbmtTZXJ2aWNlIG9ubHkgaW4gNy4wXG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYXNtRGVlcExpbmtTZXJ2aWNlPy5nZXRTZWFyY2hQYXJhbWV0ZXIoa2V5KSA/P1xuICAgICAgdGhpcy5zZWFyY2hwYXJhbS5nZXQoa2V5KVxuICAgICk7XG4gIH1cblxuICBpc0VtdWxhdGVkQnlEZWVwTGluaygpOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmlzRW11bGF0ZWRCeURlZXBMaW5rJDtcbiAgfVxuXG4gIHNldEVtdWxhdGVkQnlEZWVwTGluayhlbXVsYXRlZDogYm9vbGVhbikge1xuICAgIHRoaXMuaXNFbXVsYXRlZEJ5RGVlcExpbmskLm5leHQoZW11bGF0ZWQpO1xuICB9XG5cbiAgc2V0U2hvd0RlZXBsaW5rQ2FydEluZm9BbGVydChkaXNwbGF5OiBib29sZWFuKSB7XG4gICAgdGhpcy5zaG93RGVlcGxpbmtDYXJ0SW5mb0FsZXJ0JC5uZXh0KGRpc3BsYXkpO1xuICB9XG5cbiAgc2hvdWxkU2hvd0RlZXBsaW5rQ2FydEluZm9BbGVydCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zaG93RGVlcGxpbmtDYXJ0SW5mb0FsZXJ0JDtcbiAgfVxuXG4gIGxvZ291dEN1c3RvbWVyU3VwcG9ydEFnZW50QW5kQ3VzdG9tZXIoKTogdm9pZCB7XG4gICAgdGhpcy5jc0FnZW50QXV0aFNlcnZpY2UubG9nb3V0Q3VzdG9tZXJTdXBwb3J0QWdlbnQoKTtcbiAgfVxuXG4gIGxvZ291dEN1c3RvbWVyKCk6IHZvaWQge1xuICAgIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCk7XG4gIH1cblxuICBpc0N1c3RvbWVyRW11bGF0aW9uU2Vzc2lvbkluUHJvZ3Jlc3MoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuY3NBZ2VudEF1dGhTZXJ2aWNlLmlzQ3VzdG9tZXJFbXVsYXRlZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFdlJ3JlIGN1cnJlbnRseSBvbmx5IHJlbW92aW5nIHRoZSBwZXJzaXN0ZWQgc3RvcmFnZSBpbiB0aGUgYnJvd3NlclxuICAgKiB0byBlbnN1cmUgdGhlIEFTTSBleHBlcmllbmNlIGlzbid0IGxvYWRlZCBvbiB0aGUgbmV4dCB2aXNpdC4gVGhlcmUgYXJlIGEgZmV3XG4gICAqIG9wdGltaXphdGlvbnMgd2UgY291bGQgdGhpbmsgb2Y6XG4gICAqIC0gZHJvcCB0aGUgYGFzbWAgcGFyYW1ldGVyIGZyb20gdGhlIFVSTCwgaW4gY2FzZSBpdCdzIHN0aWxsIHRoZXJlXG4gICAqIC0gcmVtb3ZlIHRoZSBnZW5lcmF0ZWQgVUkgZnJvbSB0aGUgRE9NIChvdXRsZXRzIGN1cnJlbnRseSBkbyBub3Qgc3VwcG9ydCB0aGlzKVxuICAgKi9cbiAgdW5sb2FkKCkge1xuICAgIGlmICh0aGlzLndpblJlZi5sb2NhbFN0b3JhZ2UpIHtcbiAgICAgIHRoaXMud2luUmVmLmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKEFTTV9FTkFCTEVEX0xPQ0FMX1NUT1JBR0VfS0VZKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogY2hlY2sgd2hldGhlciB0cnkgdG8gZW11bGF0ZSBjdXN0b21lciBmcm9tIGRlZXBsaW5rXG4gICAqL1xuICBpc0VtdWxhdGVJblVSTCgpOiBib29sZWFuIHtcbiAgICAvLyBUT0RPKENYU1BBLTMwOTApOiBVc2UgYXNtRGVlcExpbmtTZXJ2aWNlIG9ubHkgaW4gNy4wXG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLmFzbURlZXBMaW5rU2VydmljZT8uaXNFbXVsYXRlSW5VUkwoKSA/P1xuICAgICAgICB0aGlzLmFzbUVuYWJsZXJTZXJ2aWNlPy5pc0VtdWxhdGVJblVSTCgpKSB8fFxuICAgICAgZmFsc2VcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdmFsaWQgZGVlcCBsaW5rIHBhcmFtZXRlcnMgaW4gdGhlIHVybC5cbiAgICovXG4gIGdldERlZXBMaW5rVXJsUGFyYW1zKCk6IEFzbURlZXBMaW5rUGFyYW1ldGVycyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuYXNtRGVlcExpbmtTZXJ2aWNlPy5nZXRQYXJhbXNJblVybCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIG5hdmlnYXRpb24gYmFzZWQgb24gZGVlcCBsaW5rIHBhcmFtZXRlcnMgaW4gdGhlIFVSTFxuICAgKiBvciBwYXNzZWQgcGFyYW1ldGVyLlxuICAgKi9cbiAgaGFuZGxlRGVlcExpbmtOYXZpZ2F0aW9uKHBhcmFtZXRlcnMgPSB0aGlzLmdldERlZXBMaW5rVXJsUGFyYW1zKCkpOiB2b2lkIHtcbiAgICB0aGlzLmFzbURlZXBMaW5rU2VydmljZT8uaGFuZGxlTmF2aWdhdGlvbihwYXJhbWV0ZXJzKTtcbiAgfVxuXG4gIGhhbmRsZUFzbURpYWxvZ0FjdGlvbihldmVudDogQXNtRGlhbG9nQWN0aW9uRXZlbnQgfCBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgZXZlbnQgPT09ICdvYmplY3QnICYmXG4gICAgICBldmVudC5hY3Rpb25UeXBlID09PSBBc21EaWFsb2dBY3Rpb25UeXBlLk5BVklHQVRFXG4gICAgKSB7XG4gICAgICB0aGlzLnJvdXRpbmdTZXJ2aWNlLmdvKGV2ZW50LnJvdXRlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==