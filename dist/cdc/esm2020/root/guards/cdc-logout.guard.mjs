/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, CmsService, ProtectedRoutesService, SemanticPathService, WindowRef, } from '@spartacus/core';
import { LogoutGuard } from '@spartacus/storefront';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@angular/router";
/**
 * @override
 *
 * CDC version of logout guard. In addition to token revocation we invoke logout method from CDC JS lib.
 */
export class CdcLogoutGuard extends LogoutGuard {
    constructor(auth, cms, semanticPathService, protectedRoutes, router, winRef) {
        super(auth, cms, semanticPathService, protectedRoutes, router);
        this.auth = auth;
        this.cms = cms;
        this.semanticPathService = semanticPathService;
        this.protectedRoutes = protectedRoutes;
        this.router = router;
        this.winRef = winRef;
    }
    /**
     * Logout user from CDC
     */
    logoutFromCdc() {
        this.winRef.nativeWindow?.['gigya']?.accounts?.logout();
    }
    /**
     * @override
     * @returns promise to resolve after complete logout
     */
    logout() {
        return Promise.all([super.logout(), this.logoutFromCdc()]);
    }
}
CdcLogoutGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLogoutGuard, deps: [{ token: i1.AuthService }, { token: i1.CmsService }, { token: i1.SemanticPathService }, { token: i1.ProtectedRoutesService }, { token: i2.Router }, { token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
CdcLogoutGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLogoutGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CdcLogoutGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.CmsService }, { type: i1.SemanticPathService }, { type: i1.ProtectedRoutesService }, { type: i2.Router }, { type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2RjLWxvZ291dC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ludGVncmF0aW9uLWxpYnMvY2RjL3Jvb3QvZ3VhcmRzL2NkYy1sb2dvdXQuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFDTCxXQUFXLEVBQ1gsVUFBVSxFQUNWLHNCQUFzQixFQUN0QixtQkFBbUIsRUFDbkIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7O0FBRXBEOzs7O0dBSUc7QUFJSCxNQUFNLE9BQU8sY0FBZSxTQUFRLFdBQVc7SUFDN0MsWUFDWSxJQUFpQixFQUNqQixHQUFlLEVBQ2YsbUJBQXdDLEVBQ3hDLGVBQXVDLEVBQ3ZDLE1BQWMsRUFDZCxNQUFpQjtRQUUzQixLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFQckQsU0FBSSxHQUFKLElBQUksQ0FBYTtRQUNqQixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2Ysd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxvQkFBZSxHQUFmLGVBQWUsQ0FBd0I7UUFDdkMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQVc7SUFHN0IsQ0FBQztJQUVEOztPQUVHO0lBQ08sYUFBYTtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQXVDLEVBQUUsQ0FDcEQsT0FBTyxDQUNSLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7O09BR0c7SUFDTyxNQUFNO1FBQ2QsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7MkdBM0JVLGNBQWM7K0dBQWQsY0FBYyxjQUZiLE1BQU07MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgQXV0aFNlcnZpY2UsXG4gIENtc1NlcnZpY2UsXG4gIFByb3RlY3RlZFJvdXRlc1NlcnZpY2UsXG4gIFNlbWFudGljUGF0aFNlcnZpY2UsXG4gIFdpbmRvd1JlZixcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExvZ291dEd1YXJkIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcblxuLyoqXG4gKiBAb3ZlcnJpZGVcbiAqXG4gKiBDREMgdmVyc2lvbiBvZiBsb2dvdXQgZ3VhcmQuIEluIGFkZGl0aW9uIHRvIHRva2VuIHJldm9jYXRpb24gd2UgaW52b2tlIGxvZ291dCBtZXRob2QgZnJvbSBDREMgSlMgbGliLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2RjTG9nb3V0R3VhcmQgZXh0ZW5kcyBMb2dvdXRHdWFyZCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoOiBBdXRoU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgY21zOiBDbXNTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBzZW1hbnRpY1BhdGhTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBwcm90ZWN0ZWRSb3V0ZXM6IFByb3RlY3RlZFJvdXRlc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgIHByb3RlY3RlZCB3aW5SZWY6IFdpbmRvd1JlZlxuICApIHtcbiAgICBzdXBlcihhdXRoLCBjbXMsIHNlbWFudGljUGF0aFNlcnZpY2UsIHByb3RlY3RlZFJvdXRlcywgcm91dGVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dvdXQgdXNlciBmcm9tIENEQ1xuICAgKi9cbiAgcHJvdGVjdGVkIGxvZ291dEZyb21DZGMoKTogdm9pZCB7XG4gICAgKHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdyBhcyB7IFtrZXk6IHN0cmluZ106IGFueSB9KT8uW1xuICAgICAgJ2dpZ3lhJ1xuICAgIF0/LmFjY291bnRzPy5sb2dvdXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAb3ZlcnJpZGVcbiAgICogQHJldHVybnMgcHJvbWlzZSB0byByZXNvbHZlIGFmdGVyIGNvbXBsZXRlIGxvZ291dFxuICAgKi9cbiAgcHJvdGVjdGVkIGxvZ291dCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbc3VwZXIubG9nb3V0KCksIHRoaXMubG9nb3V0RnJvbUNkYygpXSk7XG4gIH1cbn1cbiJdfQ==