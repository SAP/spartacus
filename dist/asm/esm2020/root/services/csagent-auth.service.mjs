/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable, Optional } from '@angular/core';
import { AuthActions, OCC_USER_ID_ANONYMOUS, OCC_USER_ID_CURRENT, } from '@spartacus/core';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TokenTarget } from './asm-auth-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "./asm-auth-storage.service";
import * as i3 from "@ngrx/store";
import * as i4 from "@spartacus/user/profile/root";
import * as i5 from "@spartacus/user/account/root";
/**
 * Auth service for CS agent. Useful to login/logout agent, start emulation
 * or get information about the status of emulation.
 */
export class CsAgentAuthService {
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
    async authorizeCustomerSupportAgent(userId, password) {
        let userToken;
        // Start emulation for currently logged in user
        let customerId;
        if (this.featureConfig?.isLevel('6.4')) {
            this.userAccountFacade
                .get()
                .subscribe((user) => (customerId = user?.customerId))
                .unsubscribe();
        }
        this.authStorageService
            .getToken()
            .subscribe((token) => (userToken = token))
            .unsubscribe();
        this.authStorageService.switchTokenTargetToCSAgent();
        try {
            await this.oAuthLibWrapperService.authorizeWithPasswordFlow(userId, password);
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
        catch {
            this.authStorageService.switchTokenTargetToUser();
        }
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
        ]).pipe(map(([token, tokenTarget]) => Boolean(token?.access_token && tokenTarget === TokenTarget.CSAgent)));
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
    async logoutCustomerSupportAgent() {
        const emulatedToken = this.authStorageService.getEmulatedUserToken();
        let isCustomerEmulated;
        this.userIdService
            .isEmulated()
            .subscribe((emulated) => (isCustomerEmulated = emulated))
            .unsubscribe();
        await this.oAuthLibWrapperService.revokeAndLogout();
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
    }
}
CsAgentAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CsAgentAuthService, deps: [{ token: i1.AuthService }, { token: i2.AsmAuthStorageService }, { token: i1.UserIdService }, { token: i1.OAuthLibWrapperService }, { token: i3.Store }, { token: i4.UserProfileFacade }, { token: i5.UserAccountFacade }, { token: i1.FeatureConfigService, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
CsAgentAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CsAgentAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CsAgentAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.AsmAuthStorageService }, { type: i1.UserIdService }, { type: i1.OAuthLibWrapperService }, { type: i3.Store }, { type: i4.UserProfileFacade }, { type: i5.UserAccountFacade }, { type: i1.FeatureConfigService, decorators: [{
                    type: Optional
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NhZ2VudC1hdXRoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL3Jvb3Qvc2VydmljZXMvY3NhZ2VudC1hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXJELE9BQU8sRUFDTCxXQUFXLEVBS1gscUJBQXFCLEVBQ3JCLG1CQUFtQixHQUVwQixNQUFNLGlCQUFpQixDQUFDO0FBR3pCLE9BQU8sRUFBRSxhQUFhLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQXlCLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7O0FBR2hGOzs7R0FHRztBQUlILE1BQU0sT0FBTyxrQkFBa0I7SUF5QjdCLFlBQ1ksV0FBd0IsRUFDeEIsa0JBQXlDLEVBQ3pDLGFBQTRCLEVBQzVCLHNCQUE4QyxFQUM5QyxLQUFZLEVBQ1osaUJBQW9DLEVBQ3BDLGlCQUFvQyxFQUN4QixhQUFvQztRQVBoRCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXVCO1FBQ3pDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBd0I7UUFDOUMsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUNaLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBdUI7SUFDekQsQ0FBQztJQUVKOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsNkJBQTZCLENBQ2pDLE1BQWMsRUFDZCxRQUFnQjtRQUVoQixJQUFJLFNBQWdDLENBQUM7UUFDckMsK0NBQStDO1FBQy9DLElBQUksVUFBOEIsQ0FBQztRQUNuQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxpQkFBaUI7aUJBQ25CLEdBQUcsRUFBRTtpQkFDTCxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDcEQsV0FBVyxFQUFFLENBQUM7U0FDbEI7UUFFRCxJQUFJLENBQUMsa0JBQWtCO2FBQ3BCLFFBQVEsRUFBRTthQUNWLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7YUFDekMsV0FBVyxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDckQsSUFBSTtZQUNGLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLHlCQUF5QixDQUN6RCxNQUFNLEVBQ04sUUFBUSxDQUNULENBQUM7WUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBRTlDLElBQUksVUFBVSxLQUFLLFNBQVMsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO2dCQUN2RCwrRUFBK0U7Z0JBQy9FLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDOUM7aUJBQU07Z0JBQ0wsaUVBQWlFO2dCQUNqRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzthQUNsRDtTQUNGO1FBQUMsTUFBTTtZQUNOLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1NBQ25EO0lBQ0gsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSw2QkFBNkIsQ0FBQyxVQUFrQjtRQUNyRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUVqRCwrRUFBK0U7UUFDL0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksOEJBQThCO1FBQ25DLE9BQU8sYUFBYSxDQUFDO1lBQ25CLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRTtTQUN6QyxDQUFDLENBQUMsSUFBSSxDQUNMLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FDM0IsT0FBTyxDQUFDLEtBQUssRUFBRSxZQUFZLElBQUksV0FBVyxLQUFLLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FDcEUsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxrQkFBa0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7T0FFRztJQUNJLG1DQUFtQztRQUN4Qyx5REFBeUQ7UUFDekQsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSyxDQUFDLDBCQUEwQjtRQUM5QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUVyRSxJQUFJLGtCQUFrQixDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhO2FBQ2YsVUFBVSxFQUFFO2FBQ1osU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxDQUFDO2FBQ3hELFdBQVcsRUFBRSxDQUFDO1FBRWpCLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLHNDQUFzQyxFQUFFLENBQUMsQ0FBQztRQUN0RSxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6RCxJQUFJLGtCQUFrQixJQUFJLGFBQWEsRUFBRTtZQUN2QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzlDO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7K0dBNUpVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7MEJBa0NJLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQge1xuICBBdXRoQWN0aW9ucyxcbiAgQXV0aFNlcnZpY2UsXG4gIEF1dGhUb2tlbixcbiAgRmVhdHVyZUNvbmZpZ1NlcnZpY2UsXG4gIE9BdXRoTGliV3JhcHBlclNlcnZpY2UsXG4gIE9DQ19VU0VSX0lEX0FOT05ZTU9VUyxcbiAgT0NDX1VTRVJfSURfQ1VSUkVOVCxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuaW1wb3J0IHsgVXNlclByb2ZpbGVGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvcHJvZmlsZS9yb290JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBc21BdXRoU3RvcmFnZVNlcnZpY2UsIFRva2VuVGFyZ2V0IH0gZnJvbSAnLi9hc20tYXV0aC1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlckFjY291bnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9yb290JztcblxuLyoqXG4gKiBBdXRoIHNlcnZpY2UgZm9yIENTIGFnZW50LiBVc2VmdWwgdG8gbG9naW4vbG9nb3V0IGFnZW50LCBzdGFydCBlbXVsYXRpb25cbiAqIG9yIGdldCBpbmZvcm1hdGlvbiBhYm91dCB0aGUgc3RhdHVzIG9mIGVtdWxhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENzQWdlbnRBdXRoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBhdXRoU3RvcmFnZVNlcnZpY2U6IEFzbUF1dGhTdG9yYWdlU2VydmljZSxcbiAgICB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIG9BdXRoTGliV3JhcHBlclNlcnZpY2U6IE9BdXRoTGliV3JhcHBlclNlcnZpY2UsXG4gICAgc3RvcmU6IFN0b3JlLFxuICAgIC8vIENvbnNpZGVyIGRlbGV0ZSBpdCBpbiA3LjBcbiAgICBfdXNlclByb2ZpbGVGYWNhZGU6IFVzZXJQcm9maWxlRmFjYWRlLFxuICAgIHVzZXJBY2NvdW50RmFjYWRlOiBVc2VyQWNjb3VudEZhY2FkZVxuICApO1xuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgc2luY2UgNy4wXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgYXV0aFN0b3JhZ2VTZXJ2aWNlOiBBc21BdXRoU3RvcmFnZVNlcnZpY2UsXG4gICAgdXNlcklkU2VydmljZTogVXNlcklkU2VydmljZSxcbiAgICBvQXV0aExpYldyYXBwZXJTZXJ2aWNlOiBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgIHN0b3JlOiBTdG9yZSxcbiAgICB1c2VyUHJvZmlsZUZhY2FkZTogVXNlclByb2ZpbGVGYWNhZGUsXG4gICAgdXNlckFjY291bnRGYWNhZGU6IFVzZXJBY2NvdW50RmFjYWRlLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5pZmllZC1zaWduYXR1cmVzXG4gICAgZmVhdHVyZUNvbmZpZzogRmVhdHVyZUNvbmZpZ1NlcnZpY2VcbiAgKTtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFN0b3JhZ2VTZXJ2aWNlOiBBc21BdXRoU3RvcmFnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIG9BdXRoTGliV3JhcHBlclNlcnZpY2U6IE9BdXRoTGliV3JhcHBlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBTdG9yZSxcbiAgICBwcm90ZWN0ZWQgdXNlclByb2ZpbGVGYWNhZGU6IFVzZXJQcm9maWxlRmFjYWRlLFxuICAgIHByb3RlY3RlZCB1c2VyQWNjb3VudEZhY2FkZTogVXNlckFjY291bnRGYWNhZGUsXG4gICAgQE9wdGlvbmFsKCkgcHJvdGVjdGVkIGZlYXR1cmVDb25maWc/OiBGZWF0dXJlQ29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgLyoqXG4gICAqIExvYWRzIGFjY2VzcyB0b2tlbiBmb3IgYSBjdXN0b21lciBzdXBwb3J0IGFnZW50LlxuICAgKiBAcGFyYW0gdXNlcklkXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgYXN5bmMgYXV0aG9yaXplQ3VzdG9tZXJTdXBwb3J0QWdlbnQoXG4gICAgdXNlcklkOiBzdHJpbmcsXG4gICAgcGFzc3dvcmQ6IHN0cmluZ1xuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdXNlclRva2VuOiBBdXRoVG9rZW4gfCB1bmRlZmluZWQ7XG4gICAgLy8gU3RhcnQgZW11bGF0aW9uIGZvciBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXJcbiAgICBsZXQgY3VzdG9tZXJJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGlmICh0aGlzLmZlYXR1cmVDb25maWc/LmlzTGV2ZWwoJzYuNCcpKSB7XG4gICAgICB0aGlzLnVzZXJBY2NvdW50RmFjYWRlXG4gICAgICAgIC5nZXQoKVxuICAgICAgICAuc3Vic2NyaWJlKCh1c2VyKSA9PiAoY3VzdG9tZXJJZCA9IHVzZXI/LmN1c3RvbWVySWQpKVxuICAgICAgICAudW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZVxuICAgICAgLmdldFRva2VuKClcbiAgICAgIC5zdWJzY3JpYmUoKHRva2VuKSA9PiAodXNlclRva2VuID0gdG9rZW4pKVxuICAgICAgLnVuc3Vic2NyaWJlKCk7XG5cbiAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5zd2l0Y2hUb2tlblRhcmdldFRvQ1NBZ2VudCgpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLm9BdXRoTGliV3JhcHBlclNlcnZpY2UuYXV0aG9yaXplV2l0aFBhc3N3b3JkRmxvdyhcbiAgICAgICAgdXNlcklkLFxuICAgICAgICBwYXNzd29yZFxuICAgICAgKTtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEF1dGhBY3Rpb25zLkxvZ291dCgpKTtcblxuICAgICAgaWYgKGN1c3RvbWVySWQgIT09IHVuZGVmaW5lZCAmJiB1c2VyVG9rZW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBPQ0Mgc3BlY2lmaWMgdXNlciBpZCBoYW5kbGluZy4gQ3VzdG9taXplIHdoZW4gaW1wbGVtZW50aW5nIGRpZmZlcmVudCBiYWNrZW5kXG4gICAgICAgIHRoaXMudXNlcklkU2VydmljZS5zZXRVc2VySWQoY3VzdG9tZXJJZCk7XG4gICAgICAgIHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLnNldEVtdWxhdGVkVXNlclRva2VuKHVzZXJUb2tlbik7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2gobmV3IEF1dGhBY3Rpb25zLkxvZ2luKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2hlbiB3ZSBjYW4ndCBnZXQgdGhlIGN1c3RvbWVySWQganVzdCBlbmQgYWxsIGN1cnJlbnQgc2Vzc2lvbnNcbiAgICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLnNldFVzZXJJZChPQ0NfVVNFUl9JRF9BTk9OWU1PVVMpO1xuICAgICAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5jbGVhckVtdWxhdGVkVXNlclRva2VuKCk7XG4gICAgICB9XG4gICAgfSBjYXRjaCB7XG4gICAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5zd2l0Y2hUb2tlblRhcmdldFRvVXNlcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYW4gQVNNIGN1c3RvbWVyIGVtdWxhdGlvbiBzZXNzaW9uLlxuICAgKiBBIGN1c3RvbWVyIGVtdWxhdGlvbiBzZXNzaW9uIGlzIHN0b3BwZWQgYnkgY2FsbGluZyBsb2dvdXQoKS5cbiAgICogQHBhcmFtIGN1c3RvbWVySWRcbiAgICovXG4gIHB1YmxpYyBzdGFydEN1c3RvbWVyRW11bGF0aW9uU2Vzc2lvbihjdXN0b21lcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5jbGVhckVtdWxhdGVkVXNlclRva2VuKCk7XG5cbiAgICAvLyBPQ0Mgc3BlY2lmaWMgdXNlciBpZCBoYW5kbGluZy4gQ3VzdG9taXplIHdoZW4gaW1wbGVtZW50aW5nIGRpZmZlcmVudCBiYWNrZW5kXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXV0aEFjdGlvbnMuTG9nb3V0KCkpO1xuICAgIHRoaXMudXNlcklkU2VydmljZS5zZXRVc2VySWQoY3VzdG9tZXJJZCk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXV0aEFjdGlvbnMuTG9naW4oKSk7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgQ1MgYWdlbnQgaXMgY3VycmVudGx5IGxvZ2dlZCBpbi5cbiAgICpcbiAgICogQHJldHVybnMgb2JzZXJ2YWJsZSBlbWl0dGluZyB0cnVlIHdoZW4gQ1MgYWdlbnQgaXMgbG9nZ2VkIGluIG9yIGZhbHNlIHdoZW4gbm90LlxuICAgKi9cbiAgcHVibGljIGlzQ3VzdG9tZXJTdXBwb3J0QWdlbnRMb2dnZWRJbigpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5nZXRUb2tlbigpLFxuICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW5UYXJnZXQoKSxcbiAgICBdKS5waXBlKFxuICAgICAgbWFwKChbdG9rZW4sIHRva2VuVGFyZ2V0XSkgPT5cbiAgICAgICAgQm9vbGVhbih0b2tlbj8uYWNjZXNzX3Rva2VuICYmIHRva2VuVGFyZ2V0ID09PSBUb2tlblRhcmdldC5DU0FnZW50KVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXRpbGl0eSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgY3VzdG9tZXIgaXMgZW11bGF0ZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIG9ic2VydmFibGUgZW1pdHRpbmcgdHJ1ZSB3aGVuIHRoZXJlIGlzIGFjdGl2ZSBlbXVsYXRpb24gc2Vzc2lvbiBvciBmYWxzZSB3aGVuIG5vdC5cbiAgICovXG4gIHB1YmxpYyBpc0N1c3RvbWVyRW11bGF0ZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlcklkU2VydmljZS5pc0VtdWxhdGVkKCk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgY3VzdG9tZXIgc3VwcG9ydCBhZ2VudCdzIHRva2VuIGxvYWRpbmcgc3RhdHVzXG4gICAqL1xuICBwdWJsaWMgZ2V0Q3VzdG9tZXJTdXBwb3J0QWdlbnRUb2tlbkxvYWRpbmcoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgLy8gVE9ETygjODI0OCk6IENyZWF0ZSBuZXcgbG9hZGluZyBzdGF0ZSBvdXRzaWRlIG9mIHN0b3JlXG4gICAgcmV0dXJuIG9mKGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dvdXQgYSBjdXN0b21lciBzdXBwb3J0IGFnZW50LlxuICAgKi9cbiAgYXN5bmMgbG9nb3V0Q3VzdG9tZXJTdXBwb3J0QWdlbnQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZW11bGF0ZWRUb2tlbiA9IHRoaXMuYXV0aFN0b3JhZ2VTZXJ2aWNlLmdldEVtdWxhdGVkVXNlclRva2VuKCk7XG5cbiAgICBsZXQgaXNDdXN0b21lckVtdWxhdGVkO1xuICAgIHRoaXMudXNlcklkU2VydmljZVxuICAgICAgLmlzRW11bGF0ZWQoKVxuICAgICAgLnN1YnNjcmliZSgoZW11bGF0ZWQpID0+IChpc0N1c3RvbWVyRW11bGF0ZWQgPSBlbXVsYXRlZCkpXG4gICAgICAudW5zdWJzY3JpYmUoKTtcblxuICAgIGF3YWl0IHRoaXMub0F1dGhMaWJXcmFwcGVyU2VydmljZS5yZXZva2VBbmRMb2dvdXQoKTtcblxuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiAnW0F1dGhdIExvZ291dCBDdXN0b21lciBTdXBwb3J0IEFnZW50JyB9KTtcbiAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5zZXRUb2tlblRhcmdldChUb2tlblRhcmdldC5Vc2VyKTtcblxuICAgIGlmIChpc0N1c3RvbWVyRW11bGF0ZWQgJiYgZW11bGF0ZWRUb2tlbikge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXV0aEFjdGlvbnMuTG9nb3V0KCkpO1xuICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2Uuc2V0VG9rZW4oZW11bGF0ZWRUb2tlbik7XG4gICAgICB0aGlzLnVzZXJJZFNlcnZpY2Uuc2V0VXNlcklkKE9DQ19VU0VSX0lEX0NVUlJFTlQpO1xuICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2UuY2xlYXJFbXVsYXRlZFVzZXJUb2tlbigpO1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChuZXcgQXV0aEFjdGlvbnMuTG9naW4oKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=