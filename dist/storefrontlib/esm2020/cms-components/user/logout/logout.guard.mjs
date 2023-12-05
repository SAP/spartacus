/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { PageType, } from '@spartacus/core';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/router";
/**
 * Guards the _logout_ route.
 *
 * Takes care of routing the user to a logout page (if available) or redirects to
 * the homepage. If the homepage is protected, the user is redirected
 * to the login route instead.
 */
export class LogoutGuard {
    constructor(auth, cms, semanticPathService, protectedRoutes, router) {
        this.auth = auth;
        this.cms = cms;
        this.semanticPathService = semanticPathService;
        this.protectedRoutes = protectedRoutes;
        this.router = router;
    }
    canActivate() {
        /**
         * First we want to complete logout process before redirecting to logout page
         * We want to avoid errors like `token is no longer valid`
         */
        return from(this.logout()).pipe(switchMap(() => {
            return this.cms
                .hasPage({
                id: this.semanticPathService.get('logout') ?? '',
                type: PageType.CONTENT_PAGE,
            })
                .pipe(map((hasPage) => {
                if (!hasPage) {
                    return this.getRedirectUrl();
                }
                // TODO(#9385): Use CMS page guard here.
                return hasPage;
            }));
        }));
    }
    logout() {
        return this.auth.coreLogout();
    }
    /**
     * Whenever there is no specific "logout" page configured in the CMS,
     * we redirect after the user is logged out.
     *
     * The user gets redirected to the homepage, unless the homepage is protected
     * (in case of a closed shop). We'll redirect to the login page instead.
     */
    getRedirectUrl() {
        const cxRoute = this.protectedRoutes.shouldProtect ? 'login' : 'home';
        return this.router.parseUrl(this.semanticPathService.get(cxRoute) ?? '');
    }
}
LogoutGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LogoutGuard, deps: [{ token: i1.AuthService }, { token: i1.CmsService }, { token: i1.SemanticPathService }, { token: i1.ProtectedRoutesService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
LogoutGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LogoutGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LogoutGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.CmsService }, { type: i1.SemanticPathService }, { type: i1.ProtectedRoutesService }, { type: i2.Router }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb3V0Lmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9jbXMtY29tcG9uZW50cy91c2VyL2xvZ291dC9sb2dvdXQuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUdMLFFBQVEsR0FHVCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxJQUFJLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDeEMsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQUVoRDs7Ozs7O0dBTUc7QUFJSCxNQUFNLE9BQU8sV0FBVztJQUN0QixZQUNZLElBQWlCLEVBQ2pCLEdBQWUsRUFDZixtQkFBd0MsRUFDeEMsZUFBdUMsRUFDdkMsTUFBYztRQUpkLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsb0JBQWUsR0FBZixlQUFlLENBQXdCO1FBQ3ZDLFdBQU0sR0FBTixNQUFNLENBQVE7SUFDdkIsQ0FBQztJQUVKLFdBQVc7UUFDVDs7O1dBR0c7UUFDSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQzdCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDYixPQUFPLElBQUksQ0FBQyxHQUFHO2lCQUNaLE9BQU8sQ0FBQztnQkFDUCxFQUFFLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUNoRCxJQUFJLEVBQUUsUUFBUSxDQUFDLFlBQVk7YUFDNUIsQ0FBQztpQkFDRCxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDWixPQUFPLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDOUI7Z0JBQ0Qsd0NBQXdDO2dCQUN4QyxPQUFPLE9BQU8sQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxNQUFNO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxjQUFjO1FBQ3RCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN0RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQzs7d0dBaERVLFdBQVc7NEdBQVgsV0FBVyxjQUZWLE1BQU07MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgUm91dGVyLCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gIEF1dGhTZXJ2aWNlLFxuICBDbXNTZXJ2aWNlLFxuICBQYWdlVHlwZSxcbiAgUHJvdGVjdGVkUm91dGVzU2VydmljZSxcbiAgU2VtYW50aWNQYXRoU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vKipcbiAqIEd1YXJkcyB0aGUgX2xvZ291dF8gcm91dGUuXG4gKlxuICogVGFrZXMgY2FyZSBvZiByb3V0aW5nIHRoZSB1c2VyIHRvIGEgbG9nb3V0IHBhZ2UgKGlmIGF2YWlsYWJsZSkgb3IgcmVkaXJlY3RzIHRvXG4gKiB0aGUgaG9tZXBhZ2UuIElmIHRoZSBob21lcGFnZSBpcyBwcm90ZWN0ZWQsIHRoZSB1c2VyIGlzIHJlZGlyZWN0ZWRcbiAqIHRvIHRoZSBsb2dpbiByb3V0ZSBpbnN0ZWFkLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTG9nb3V0R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY21zOiBDbXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzZW1hbnRpY1BhdGhTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBwcm90ZWN0ZWRSb3V0ZXM6IFByb3RlY3RlZFJvdXRlc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyXG4gICkge31cblxuICBjYW5BY3RpdmF0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgLyoqXG4gICAgICogRmlyc3Qgd2Ugd2FudCB0byBjb21wbGV0ZSBsb2dvdXQgcHJvY2VzcyBiZWZvcmUgcmVkaXJlY3RpbmcgdG8gbG9nb3V0IHBhZ2VcbiAgICAgKiBXZSB3YW50IHRvIGF2b2lkIGVycm9ycyBsaWtlIGB0b2tlbiBpcyBubyBsb25nZXIgdmFsaWRgXG4gICAgICovXG4gICAgcmV0dXJuIGZyb20odGhpcy5sb2dvdXQoKSkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNtc1xuICAgICAgICAgIC5oYXNQYWdlKHtcbiAgICAgICAgICAgIGlkOiB0aGlzLnNlbWFudGljUGF0aFNlcnZpY2UuZ2V0KCdsb2dvdXQnKSA/PyAnJyxcbiAgICAgICAgICAgIHR5cGU6IFBhZ2VUeXBlLkNPTlRFTlRfUEFHRSxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgbWFwKChoYXNQYWdlKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghaGFzUGFnZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlZGlyZWN0VXJsKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gVE9ETygjOTM4NSk6IFVzZSBDTVMgcGFnZSBndWFyZCBoZXJlLlxuICAgICAgICAgICAgICByZXR1cm4gaGFzUGFnZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2dvdXQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5hdXRoLmNvcmVMb2dvdXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGVuZXZlciB0aGVyZSBpcyBubyBzcGVjaWZpYyBcImxvZ291dFwiIHBhZ2UgY29uZmlndXJlZCBpbiB0aGUgQ01TLFxuICAgKiB3ZSByZWRpcmVjdCBhZnRlciB0aGUgdXNlciBpcyBsb2dnZWQgb3V0LlxuICAgKlxuICAgKiBUaGUgdXNlciBnZXRzIHJlZGlyZWN0ZWQgdG8gdGhlIGhvbWVwYWdlLCB1bmxlc3MgdGhlIGhvbWVwYWdlIGlzIHByb3RlY3RlZFxuICAgKiAoaW4gY2FzZSBvZiBhIGNsb3NlZCBzaG9wKS4gV2UnbGwgcmVkaXJlY3QgdG8gdGhlIGxvZ2luIHBhZ2UgaW5zdGVhZC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRSZWRpcmVjdFVybCgpOiBVcmxUcmVlIHtcbiAgICBjb25zdCBjeFJvdXRlID0gdGhpcy5wcm90ZWN0ZWRSb3V0ZXMuc2hvdWxkUHJvdGVjdCA/ICdsb2dpbicgOiAnaG9tZSc7XG4gICAgcmV0dXJuIHRoaXMucm91dGVyLnBhcnNlVXJsKHRoaXMuc2VtYW50aWNQYXRoU2VydmljZS5nZXQoY3hSb3V0ZSkgPz8gJycpO1xuICB9XG59XG4iXX0=