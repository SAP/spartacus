/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../facade/auth.service";
import * as i2 from "../services/auth-redirect.service";
import * as i3 from "@angular/router";
import * as i4 from "../../../routing/configurable-routes/url-translation/semantic-path.service";
/**
 * Checks if there is currently logged in user.
 * Use to protect pages dedicated only for logged in users.
 */
export class AuthGuard {
    constructor(authService, authRedirectService, router, semanticPathService) {
        this.authService = authService;
        this.authRedirectService = authRedirectService;
        this.router = router;
        this.semanticPathService = semanticPathService;
    }
    canActivate() {
        return this.authService.isUserLoggedIn().pipe(map((isLoggedIn) => {
            if (!isLoggedIn) {
                this.authRedirectService.saveCurrentNavigationUrl();
                return this.router.parseUrl(this.semanticPathService.get('login') ?? '');
            }
            return isLoggedIn;
        }));
    }
}
AuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthGuard, deps: [{ token: i1.AuthService }, { token: i2.AuthRedirectService }, { token: i3.Router }, { token: i4.SemanticPathService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.AuthRedirectService }, { type: i3.Router }, { type: i4.SemanticPathService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2F1dGgvdXNlci1hdXRoL2d1YXJkcy9hdXRoLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBS3JDOzs7R0FHRztBQUlILE1BQU0sT0FBTyxTQUFTO0lBQ3BCLFlBQ1ksV0FBd0IsRUFDeEIsbUJBQXdDLEVBQ3hDLE1BQWMsRUFDZCxtQkFBd0M7UUFIeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtJQUNqRCxDQUFDO0lBRUosV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQzNDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLG1CQUFtQixDQUFDLHdCQUF3QixFQUFFLENBQUM7Z0JBQ3BELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUM1QyxDQUFDO2FBQ0g7WUFDRCxPQUFPLFVBQVUsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQzs7c0dBcEJVLFNBQVM7MEdBQVQsU0FBUyxjQUZSLE1BQU07MkZBRVAsU0FBUztrQkFIckIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgUm91dGVyLCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFNlbWFudGljUGF0aFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9yb3V0aW5nL2NvbmZpZ3VyYWJsZS1yb3V0ZXMvdXJsLXRyYW5zbGF0aW9uL3NlbWFudGljLXBhdGguc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4uL2ZhY2FkZS9hdXRoLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXV0aFJlZGlyZWN0U2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2F1dGgtcmVkaXJlY3Quc2VydmljZSc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBsb2dnZWQgaW4gdXNlci5cbiAqIFVzZSB0byBwcm90ZWN0IHBhZ2VzIGRlZGljYXRlZCBvbmx5IGZvciBsb2dnZWQgaW4gdXNlcnMuXG4gKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBdXRoR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhSZWRpcmVjdFNlcnZpY2U6IEF1dGhSZWRpcmVjdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgIHByb3RlY3RlZCBzZW1hbnRpY1BhdGhTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlXG4gICkge31cblxuICBjYW5BY3RpdmF0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UuaXNVc2VyTG9nZ2VkSW4oKS5waXBlKFxuICAgICAgbWFwKChpc0xvZ2dlZEluKSA9PiB7XG4gICAgICAgIGlmICghaXNMb2dnZWRJbikge1xuICAgICAgICAgIHRoaXMuYXV0aFJlZGlyZWN0U2VydmljZS5zYXZlQ3VycmVudE5hdmlnYXRpb25VcmwoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yb3V0ZXIucGFyc2VVcmwoXG4gICAgICAgICAgICB0aGlzLnNlbWFudGljUGF0aFNlcnZpY2UuZ2V0KCdsb2dpbicpID8/ICcnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNMb2dnZWRJbjtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19