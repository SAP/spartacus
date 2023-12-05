/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../../../state/services/state-persistence.service";
import * as i2 from "../facade/user-id.service";
import * as i3 from "./auth-storage.service";
import * as i4 from "./auth-redirect-storage.service";
/**
 * Responsible for saving the authorization data (userId, token, redirectUrl) in browser storage.
 */
export class AuthStatePersistenceService {
    constructor(statePersistenceService, userIdService, authStorageService, authRedirectStorageService) {
        this.statePersistenceService = statePersistenceService;
        this.userIdService = userIdService;
        this.authStorageService = authStorageService;
        this.authRedirectStorageService = authRedirectStorageService;
        this.subscription = new Subscription();
        /**
         * Identifier used for storage key.
         */
        this.key = 'auth';
    }
    /**
     * Initializes the synchronization between state and browser storage.
     */
    initSync() {
        this.subscription.add(this.statePersistenceService.syncWithStorage({
            key: this.key,
            state$: this.getAuthState(),
            onRead: (state) => this.onRead(state),
        }));
    }
    /**
     * Gets and transforms state from different sources into the form that should
     * be saved in storage.
     */
    getAuthState() {
        return combineLatest([
            this.authStorageService.getToken().pipe(filter((state) => !!state), map((state) => {
                return {
                    ...state,
                };
            })),
            this.userIdService.getUserId(),
            this.authRedirectStorageService.getRedirectUrl(),
        ]).pipe(map(([authToken, userId, redirectUrl]) => {
            let token = authToken;
            if (token) {
                token = { ...token };
                // To minimize risk of user account hijacking we don't persist user refresh_token
                delete token.refresh_token;
            }
            return { token, userId, redirectUrl };
        }));
    }
    /**
     * Function called on each browser storage read.
     * Used to update state from browser -> state.
     */
    onRead(state) {
        if (state?.token) {
            this.authStorageService.setToken(state.token);
        }
        if (state?.redirectUrl) {
            this.authRedirectStorageService.setRedirectUrl(state.redirectUrl);
        }
        if (state?.userId) {
            this.userIdService.setUserId(state.userId);
        }
        else {
            this.userIdService.clearUserId();
        }
    }
    /**
     * Reads synchronously state from storage and returns it.
     */
    readStateFromStorage() {
        return this.statePersistenceService.readStateFromStorage({
            key: this.key,
        });
    }
    /**
     * Check synchronously in browser storage if user is logged in (required by transfer state reducer).
     * For most cases `isUserLoggedIn` from the `AuthService` should be used instead of this.
     */
    isUserLoggedIn() {
        return Boolean(this.readStateFromStorage()?.token?.access_token);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AuthStatePersistenceService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthStatePersistenceService, deps: [{ token: i1.StatePersistenceService }, { token: i2.UserIdService }, { token: i3.AuthStorageService }, { token: i4.AuthRedirectStorageService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthStatePersistenceService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthStatePersistenceService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthStatePersistenceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.StatePersistenceService }, { type: i2.UserIdService }, { type: i3.AuthStorageService }, { type: i4.AuthRedirectStorageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvYXV0aC91c2VyLWF1dGgvc2VydmljZXMvYXV0aC1zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7OztBQWdCN0M7O0dBRUc7QUFJSCxNQUFNLE9BQU8sMkJBQTJCO0lBR3RDLFlBQ1ksdUJBQWdELEVBQ2hELGFBQTRCLEVBQzVCLGtCQUFzQyxFQUN0QywwQkFBc0Q7UUFIdEQsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUF5QjtRQUNoRCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBQ3RDLCtCQUEwQixHQUExQiwwQkFBMEIsQ0FBNEI7UUFOeEQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBUzVDOztXQUVHO1FBQ08sUUFBRyxHQUFHLE1BQU0sQ0FBQztJQUxwQixDQUFDO0lBT0o7O09BRUc7SUFDSSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxlQUFlLENBQUM7WUFDM0MsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDM0IsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUN0QyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDTyxZQUFZO1FBQ3BCLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQ3JDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUMxQixHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDWixPQUFPO29CQUNMLEdBQUcsS0FBSztpQkFDVCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQ0g7WUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsRUFBRTtZQUM5QixJQUFJLENBQUMsMEJBQTBCLENBQUMsY0FBYyxFQUFFO1NBQ2pELENBQUMsQ0FBQyxJQUFJLENBQ0wsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUU7WUFDdkMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDO1lBQ3RCLElBQUksS0FBSyxFQUFFO2dCQUNULEtBQUssR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUM7Z0JBQ3JCLGlGQUFpRjtnQkFDakYsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDO2FBQzVCO1lBQ0QsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDTyxNQUFNLENBQUMsS0FBa0M7UUFDakQsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsSUFBSSxLQUFLLEVBQUUsV0FBVyxFQUFFO1lBQ3RCLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxLQUFLLEVBQUUsTUFBTSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsQztJQUNILENBQUM7SUFFRDs7T0FFRztJQUNPLG9CQUFvQjtRQUM1QixPQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxvQkFBb0IsQ0FBa0I7WUFDeEUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLGNBQWM7UUFDbkIsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzt3SEE5RlUsMkJBQTJCOzRIQUEzQiwyQkFBMkIsY0FGMUIsTUFBTTsyRkFFUCwyQkFBMkI7a0JBSHZDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9zZXJ2aWNlcy9zdGF0ZS1wZXJzaXN0ZW5jZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJJZFNlcnZpY2UgfSBmcm9tICcuLi9mYWNhZGUvdXNlci1pZC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhUb2tlbiB9IGZyb20gJy4uL21vZGVscy9hdXRoLXRva2VuLm1vZGVsJztcbmltcG9ydCB7IEF1dGhSZWRpcmVjdFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLXJlZGlyZWN0LXN0b3JhZ2Uuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2F1dGgtc3RvcmFnZS5zZXJ2aWNlJztcblxuLyoqXG4gKiBBdXRoIHN0YXRlIHN5bmNlZCB0byBicm93c2VyIHN0b3JhZ2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU3luY2VkQXV0aFN0YXRlIHtcbiAgdXNlcklkPzogc3RyaW5nO1xuICB0b2tlbj86IEF1dGhUb2tlbjtcbiAgcmVkaXJlY3RVcmw/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVzcG9uc2libGUgZm9yIHNhdmluZyB0aGUgYXV0aG9yaXphdGlvbiBkYXRhICh1c2VySWQsIHRva2VuLCByZWRpcmVjdFVybCkgaW4gYnJvd3NlciBzdG9yYWdlLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXV0aFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2U6IFN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU3RvcmFnZVNlcnZpY2U6IEF1dGhTdG9yYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFJlZGlyZWN0U3RvcmFnZVNlcnZpY2U6IEF1dGhSZWRpcmVjdFN0b3JhZ2VTZXJ2aWNlXG4gICkge31cblxuICAvKipcbiAgICogSWRlbnRpZmllciB1c2VkIGZvciBzdG9yYWdlIGtleS5cbiAgICovXG4gIHByb3RlY3RlZCBrZXkgPSAnYXV0aCc7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBzeW5jaHJvbml6YXRpb24gYmV0d2VlbiBzdGF0ZSBhbmQgYnJvd3NlciBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGluaXRTeW5jKCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuc3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2Uuc3luY1dpdGhTdG9yYWdlKHtcbiAgICAgICAga2V5OiB0aGlzLmtleSxcbiAgICAgICAgc3RhdGUkOiB0aGlzLmdldEF1dGhTdGF0ZSgpLFxuICAgICAgICBvblJlYWQ6IChzdGF0ZSkgPT4gdGhpcy5vblJlYWQoc3RhdGUpLFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgYW5kIHRyYW5zZm9ybXMgc3RhdGUgZnJvbSBkaWZmZXJlbnQgc291cmNlcyBpbnRvIHRoZSBmb3JtIHRoYXQgc2hvdWxkXG4gICAqIGJlIHNhdmVkIGluIHN0b3JhZ2UuXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0QXV0aFN0YXRlKCk6IE9ic2VydmFibGU8U3luY2VkQXV0aFN0YXRlPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW4oKS5waXBlKFxuICAgICAgICBmaWx0ZXIoKHN0YXRlKSA9PiAhIXN0YXRlKSxcbiAgICAgICAgbWFwKChzdGF0ZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIHRoaXMudXNlcklkU2VydmljZS5nZXRVc2VySWQoKSxcbiAgICAgIHRoaXMuYXV0aFJlZGlyZWN0U3RvcmFnZVNlcnZpY2UuZ2V0UmVkaXJlY3RVcmwoKSxcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbYXV0aFRva2VuLCB1c2VySWQsIHJlZGlyZWN0VXJsXSkgPT4ge1xuICAgICAgICBsZXQgdG9rZW4gPSBhdXRoVG9rZW47XG4gICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgIHRva2VuID0geyAuLi50b2tlbiB9O1xuICAgICAgICAgIC8vIFRvIG1pbmltaXplIHJpc2sgb2YgdXNlciBhY2NvdW50IGhpamFja2luZyB3ZSBkb24ndCBwZXJzaXN0IHVzZXIgcmVmcmVzaF90b2tlblxuICAgICAgICAgIGRlbGV0ZSB0b2tlbi5yZWZyZXNoX3Rva2VuO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHRva2VuLCB1c2VySWQsIHJlZGlyZWN0VXJsIH07XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gY2FsbGVkIG9uIGVhY2ggYnJvd3NlciBzdG9yYWdlIHJlYWQuXG4gICAqIFVzZWQgdG8gdXBkYXRlIHN0YXRlIGZyb20gYnJvd3NlciAtPiBzdGF0ZS5cbiAgICovXG4gIHByb3RlY3RlZCBvblJlYWQoc3RhdGU6IFN5bmNlZEF1dGhTdGF0ZSB8IHVuZGVmaW5lZCkge1xuICAgIGlmIChzdGF0ZT8udG9rZW4pIHtcbiAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLnNldFRva2VuKHN0YXRlLnRva2VuKTtcbiAgICB9XG4gICAgaWYgKHN0YXRlPy5yZWRpcmVjdFVybCkge1xuICAgICAgdGhpcy5hdXRoUmVkaXJlY3RTdG9yYWdlU2VydmljZS5zZXRSZWRpcmVjdFVybChzdGF0ZS5yZWRpcmVjdFVybCk7XG4gICAgfVxuICAgIGlmIChzdGF0ZT8udXNlcklkKSB7XG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2Uuc2V0VXNlcklkKHN0YXRlLnVzZXJJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXNlcklkU2VydmljZS5jbGVhclVzZXJJZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyBzeW5jaHJvbm91c2x5IHN0YXRlIGZyb20gc3RvcmFnZSBhbmQgcmV0dXJucyBpdC5cbiAgICovXG4gIHByb3RlY3RlZCByZWFkU3RhdGVGcm9tU3RvcmFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZVBlcnNpc3RlbmNlU2VydmljZS5yZWFkU3RhdGVGcm9tU3RvcmFnZTxTeW5jZWRBdXRoU3RhdGU+KHtcbiAgICAgIGtleTogdGhpcy5rZXksXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgc3luY2hyb25vdXNseSBpbiBicm93c2VyIHN0b3JhZ2UgaWYgdXNlciBpcyBsb2dnZWQgaW4gKHJlcXVpcmVkIGJ5IHRyYW5zZmVyIHN0YXRlIHJlZHVjZXIpLlxuICAgKiBGb3IgbW9zdCBjYXNlcyBgaXNVc2VyTG9nZ2VkSW5gIGZyb20gdGhlIGBBdXRoU2VydmljZWAgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZCBvZiB0aGlzLlxuICAgKi9cbiAgcHVibGljIGlzVXNlckxvZ2dlZEluKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMucmVhZFN0YXRlRnJvbVN0b3JhZ2UoKT8udG9rZW4/LmFjY2Vzc190b2tlbik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iXX0=