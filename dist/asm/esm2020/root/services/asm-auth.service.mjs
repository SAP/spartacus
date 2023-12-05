/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { AuthActions, AuthService, GlobalMessageType, } from '@spartacus/core';
import { combineLatest, from, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { TokenTarget } from './asm-auth-storage.service';
import * as i0 from "@angular/core";
import * as i1 from "@ngrx/store";
import * as i2 from "@spartacus/core";
import * as i3 from "./asm-auth-storage.service";
/**
 * Version of AuthService that is working for both user na CS agent.
 * Overrides AuthService when ASM module is enabled.
 */
export class AsmAuthService extends AuthService {
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
        return !(Boolean(token?.access_token) && tokenTarget === TokenTarget.CSAgent);
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
    async loginWithCredentials(userId, password) {
        if (this.canUserLogin()) {
            await super.loginWithCredentials(userId, password);
        }
        else {
            this.warnAboutLoggedCSAgent();
        }
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
        ]).pipe(map(([token, isEmulated, tokenTarget]) => Boolean(token?.access_token) &&
            (tokenTarget === TokenTarget.User ||
                (tokenTarget === TokenTarget.CSAgent && isEmulated))));
    }
}
AsmAuthService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthService, deps: [{ token: i1.Store }, { token: i2.UserIdService }, { token: i2.OAuthLibWrapperService }, { token: i3.AsmAuthStorageService }, { token: i2.AuthRedirectService }, { token: i2.GlobalMessageService }, { token: i2.RoutingService }, { token: i2.AuthMultisiteIsolationService }], target: i0.ɵɵFactoryTarget.Injectable });
AsmAuthService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmAuthService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }, { type: i2.UserIdService }, { type: i2.OAuthLibWrapperService }, { type: i3.AsmAuthStorageService }, { type: i2.AuthRedirectService }, { type: i2.GlobalMessageService }, { type: i2.RoutingService }, { type: i2.AuthMultisiteIsolationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWF1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9hc20vcm9vdC9zZXJ2aWNlcy9hc20tYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFDTCxXQUFXLEVBR1gsV0FBVyxFQUdYLGlCQUFpQixHQUtsQixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFjLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMzRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RCxPQUFPLEVBQXlCLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7OztBQUVoRjs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFdBQVc7SUFDN0MsWUFDWSxLQUFpQyxFQUNqQyxhQUE0QixFQUM1QixzQkFBOEMsRUFDOUMsa0JBQXlDLEVBQ3pDLG1CQUF3QyxFQUN4QyxvQkFBMEMsRUFDMUMsY0FBOEIsRUFDOUIsNkJBQTZEO1FBRXZFLEtBQUssQ0FDSCxLQUFLLEVBQ0wsYUFBYSxFQUNiLHNCQUFzQixFQUN0QixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCw2QkFBNkIsQ0FDOUIsQ0FBQztRQWpCUSxVQUFLLEdBQUwsS0FBSyxDQUE0QjtRQUNqQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQXdCO1FBQzlDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBdUI7UUFDekMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLG1CQUFjLEdB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QVcsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsQ0FDekQsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7MkdBakhVLGNBQWM7K0dBQWQsY0FBYyxjQUZiLE1BQU07MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7XG4gIEF1dGhBY3Rpb25zLFxuICBBdXRoTXVsdGlzaXRlSXNvbGF0aW9uU2VydmljZSxcbiAgQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgQXV0aFNlcnZpY2UsXG4gIEF1dGhUb2tlbixcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICBSb3V0aW5nU2VydmljZSxcbiAgU3RhdGVXaXRoQ2xpZW50QXV0aCxcbiAgVXNlcklkU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIGZyb20sIE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFzbUF1dGhTdG9yYWdlU2VydmljZSwgVG9rZW5UYXJnZXQgfSBmcm9tICcuL2FzbS1hdXRoLXN0b3JhZ2Uuc2VydmljZSc7XG5cbi8qKlxuICogVmVyc2lvbiBvZiBBdXRoU2VydmljZSB0aGF0IGlzIHdvcmtpbmcgZm9yIGJvdGggdXNlciBuYSBDUyBhZ2VudC5cbiAqIE92ZXJyaWRlcyBBdXRoU2VydmljZSB3aGVuIEFTTSBtb2R1bGUgaXMgZW5hYmxlZC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFzbUF1dGhTZXJ2aWNlIGV4dGVuZHMgQXV0aFNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IFN0b3JlPFN0YXRlV2l0aENsaWVudEF1dGg+LFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBvQXV0aExpYldyYXBwZXJTZXJ2aWNlOiBPQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhdXRoU3RvcmFnZVNlcnZpY2U6IEFzbUF1dGhTdG9yYWdlU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgYXV0aFJlZGlyZWN0U2VydmljZTogQXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICBwcm90ZWN0ZWQgZ2xvYmFsTWVzc2FnZVNlcnZpY2U6IEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0aW5nU2VydmljZTogUm91dGluZ1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhNdWx0aXNpdGVJc29sYXRpb25TZXJ2aWNlPzogQXV0aE11bHRpc2l0ZUlzb2xhdGlvblNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoXG4gICAgICBzdG9yZSxcbiAgICAgIHVzZXJJZFNlcnZpY2UsXG4gICAgICBvQXV0aExpYldyYXBwZXJTZXJ2aWNlLFxuICAgICAgYXV0aFN0b3JhZ2VTZXJ2aWNlLFxuICAgICAgYXV0aFJlZGlyZWN0U2VydmljZSxcbiAgICAgIHJvdXRpbmdTZXJ2aWNlLFxuICAgICAgYXV0aE11bHRpc2l0ZUlzb2xhdGlvblNlcnZpY2VcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNhblVzZXJMb2dpbigpOiBib29sZWFuIHtcbiAgICBsZXQgdG9rZW5UYXJnZXQ6IFRva2VuVGFyZ2V0IHwgdW5kZWZpbmVkO1xuICAgIGxldCB0b2tlbjogQXV0aFRva2VuIHwgdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2VcbiAgICAgIC5nZXRUb2tlbigpXG4gICAgICAuc3Vic2NyaWJlKCh0b2spID0+ICh0b2tlbiA9IHRvaykpXG4gICAgICAudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZVxuICAgICAgLmdldFRva2VuVGFyZ2V0KClcbiAgICAgIC5zdWJzY3JpYmUoKHRva1RhcmdldCkgPT4gKHRva2VuVGFyZ2V0ID0gdG9rVGFyZ2V0KSlcbiAgICAgIC51bnN1YnNjcmliZSgpO1xuICAgIHJldHVybiAhKFxuICAgICAgQm9vbGVhbih0b2tlbj8uYWNjZXNzX3Rva2VuKSAmJiB0b2tlblRhcmdldCA9PT0gVG9rZW5UYXJnZXQuQ1NBZ2VudFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgd2FybkFib3V0TG9nZ2VkQ1NBZ2VudCgpOiB2b2lkIHtcbiAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgIHtcbiAgICAgICAga2V5OiAnYXNtLmF1dGguYWdlbnRMb2dnZWRJbkVycm9yJyxcbiAgICAgIH0sXG4gICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogTG9hZHMgYSBuZXcgdXNlciB0b2tlbiB3aXRoIFJlc291cmNlIE93bmVyIFBhc3N3b3JkIEZsb3cgd2hlbiBDUyBhZ2VudCBpcyBub3QgbG9nZ2VkIGluLlxuICAgKiBAcGFyYW0gdXNlcklkXG4gICAqIEBwYXJhbSBwYXNzd29yZFxuICAgKi9cbiAgYXN5bmMgbG9naW5XaXRoQ3JlZGVudGlhbHModXNlcklkOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5jYW5Vc2VyTG9naW4oKSkge1xuICAgICAgYXdhaXQgc3VwZXIubG9naW5XaXRoQ3JlZGVudGlhbHModXNlcklkLCBwYXNzd29yZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud2FybkFib3V0TG9nZ2VkQ1NBZ2VudCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIEltcGxpY2l0L0F1dGhvcml6YXRpb24gQ29kZSBmbG93IGJ5IHJlZGlyZWN0aW5nIHRvIE9BdXRoIHNlcnZlciB3aGVuIENTIGFnZW50IGlzIG5vdCBsb2dnZWQgaW4uXG4gICAqL1xuICBsb2dpbldpdGhSZWRpcmVjdCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5jYW5Vc2VyTG9naW4oKSkge1xuICAgICAgc3VwZXIubG9naW5XaXRoUmVkaXJlY3QoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndhcm5BYm91dExvZ2dlZENTQWdlbnQoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV2b2tlcyB0b2tlbnMgYW5kIGNsZWFycyBzdGF0ZSBmb3IgbG9nZ2VkIHVzZXIgKHRva2VucywgdXNlcklkKS5cbiAgICogVG8gcGVyZm9ybSBsb2dvdXQgaXQgaXMgYmVzdCB0byB1c2UgYGxvZ291dGAgbWV0aG9kLiBVc2UgdGhpcyBtZXRob2Qgd2l0aCBjYXV0aW9uLlxuICAgKi9cbiAgY29yZUxvZ291dCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLnVzZXJJZFNlcnZpY2VcbiAgICAgIC5pc0VtdWxhdGVkKClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBzd2l0Y2hNYXAoKGlzRW11bGF0ZWQpID0+IHtcbiAgICAgICAgICBpZiAoaXNFbXVsYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2UuY2xlYXJFbXVsYXRlZFVzZXJUb2tlbigpO1xuICAgICAgICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLmNsZWFyVXNlcklkKCk7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKG5ldyBBdXRoQWN0aW9ucy5Mb2dvdXQoKSk7XG4gICAgICAgICAgICByZXR1cm4gb2YodHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tKHN1cGVyLmNvcmVMb2dvdXQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYHRydWVgIGlmIHVzZXIgaXMgbG9nZ2VkIGluIG9yIGJlaW5nIGVtdWxhdGVkLlxuICAgKi9cbiAgaXNVc2VyTG9nZ2VkSW4oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5hdXRoU3RvcmFnZVNlcnZpY2UuZ2V0VG9rZW4oKSxcbiAgICAgIHRoaXMudXNlcklkU2VydmljZS5pc0VtdWxhdGVkKCksXG4gICAgICB0aGlzLmF1dGhTdG9yYWdlU2VydmljZS5nZXRUb2tlblRhcmdldCgpLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoXG4gICAgICAgIChbdG9rZW4sIGlzRW11bGF0ZWQsIHRva2VuVGFyZ2V0XSkgPT5cbiAgICAgICAgICBCb29sZWFuKHRva2VuPy5hY2Nlc3NfdG9rZW4pICYmXG4gICAgICAgICAgKHRva2VuVGFyZ2V0ID09PSBUb2tlblRhcmdldC5Vc2VyIHx8XG4gICAgICAgICAgICAodG9rZW5UYXJnZXQgPT09IFRva2VuVGFyZ2V0LkNTQWdlbnQgJiYgaXNFbXVsYXRlZCkpXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuIl19