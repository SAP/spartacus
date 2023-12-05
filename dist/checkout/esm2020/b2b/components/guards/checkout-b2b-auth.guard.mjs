/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CheckoutAuthGuard, } from '@spartacus/checkout/base/components';
import { B2BUserRole, GlobalMessageType, } from '@spartacus/core';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/checkout/base/components";
import * as i3 from "@spartacus/cart/base/root";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/user/account/root";
export class CheckoutB2BAuthGuard extends CheckoutAuthGuard {
    constructor(authService, authRedirectService, checkoutConfigService, activeCartFacade, semanticPathService, router, userAccountFacade, globalMessageService) {
        super(authService, authRedirectService, checkoutConfigService, activeCartFacade, semanticPathService, router);
        this.authService = authService;
        this.authRedirectService = authRedirectService;
        this.checkoutConfigService = checkoutConfigService;
        this.activeCartFacade = activeCartFacade;
        this.semanticPathService = semanticPathService;
        this.router = router;
        this.userAccountFacade = userAccountFacade;
        this.globalMessageService = globalMessageService;
    }
    canActivate() {
        return combineLatest([
            this.authService.isUserLoggedIn(),
            this.activeCartFacade.isGuestCart(),
            this.userAccountFacade.get(),
            this.activeCartFacade.isStable(),
        ]).pipe(map(([isLoggedIn, isGuestCart, user, isStable]) => ({
            isLoggedIn,
            isGuestCart,
            user,
            isStable,
        })), filter((data) => data.isStable), 
        // if the user is authenticated and we have their data, OR if the user is anonymous
        filter((data) => (!!data.user && data.isLoggedIn) || !data.isLoggedIn), map((data) => {
            if (!data.isLoggedIn) {
                return data.isGuestCart ? true : this.handleAnonymousUser();
            }
            else if (data.user && 'roles' in data.user) {
                return this.handleUserRole(data.user);
            }
            return data.isLoggedIn;
        }));
    }
    handleUserRole(user) {
        const roles = user.roles;
        if (roles?.includes(B2BUserRole.CUSTOMER)) {
            return true;
        }
        this.globalMessageService.add({ key: 'checkoutB2B.invalid.accountType' }, GlobalMessageType.MSG_TYPE_WARNING);
        return this.router.parseUrl(this.semanticPathService.get('home') ?? '');
    }
}
CheckoutB2BAuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BAuthGuard, deps: [{ token: i1.AuthService }, { token: i1.AuthRedirectService }, { token: i2.CheckoutConfigService }, { token: i3.ActiveCartFacade }, { token: i1.SemanticPathService }, { token: i4.Router }, { token: i5.UserAccountFacade }, { token: i1.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Injectable });
CheckoutB2BAuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BAuthGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CheckoutB2BAuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i1.AuthRedirectService }, { type: i2.CheckoutConfigService }, { type: i3.ActiveCartFacade }, { type: i1.SemanticPathService }, { type: i4.Router }, { type: i5.UserAccountFacade }, { type: i1.GlobalMessageService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tvdXQtYjJiLWF1dGguZ3VhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2hlY2tvdXQvYjJiL2NvbXBvbmVudHMvZ3VhcmRzL2NoZWNrb3V0LWIyYi1hdXRoLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFDTCxpQkFBaUIsR0FFbEIsTUFBTSxxQ0FBcUMsQ0FBQztBQUM3QyxPQUFPLEVBSUwsV0FBVyxFQUVYLGlCQUFpQixHQUVsQixNQUFNLGlCQUFpQixDQUFDO0FBRXpCLE9BQU8sRUFBRSxhQUFhLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQUs3QyxNQUFNLE9BQU8sb0JBQ1gsU0FBUSxpQkFBaUI7SUFHekIsWUFDWSxXQUF3QixFQUN4QixtQkFBd0MsRUFDeEMscUJBQTRDLEVBQzVDLGdCQUFrQyxFQUNsQyxtQkFBd0MsRUFDeEMsTUFBYyxFQUNkLGlCQUFvQyxFQUNwQyxvQkFBMEM7UUFFcEQsS0FBSyxDQUNILFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3JCLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsTUFBTSxDQUNQLENBQUM7UUFoQlEsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QywwQkFBcUIsR0FBckIscUJBQXFCLENBQXVCO1FBQzVDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2Qsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO0lBVXRELENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxhQUFhLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEVBQUU7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRTtZQUNuQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU7U0FDakMsQ0FBQyxDQUFDLElBQUksQ0FDTCxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELFVBQVU7WUFDVixXQUFXO1lBQ1gsSUFBSTtZQUNKLFFBQVE7U0FDVCxDQUFDLENBQUMsRUFDSCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDL0IsbUZBQW1GO1FBQ25GLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQ3RFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQzthQUM3RDtpQkFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQzVDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkM7WUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFUyxjQUFjLENBQUMsSUFBVTtRQUNqQyxNQUFNLEtBQUssR0FBYSxJQUFLLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUksS0FBSyxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekMsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQzNCLEVBQUUsR0FBRyxFQUFFLGlDQUFpQyxFQUFFLEVBQzFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUNuQyxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzFFLENBQUM7O2lIQTdEVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQUZuQixNQUFNOzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgUm91dGVyLCBVcmxUcmVlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIENoZWNrb3V0QXV0aEd1YXJkLFxuICBDaGVja291dENvbmZpZ1NlcnZpY2UsXG59IGZyb20gJ0BzcGFydGFjdXMvY2hlY2tvdXQvYmFzZS9jb21wb25lbnRzJztcbmltcG9ydCB7XG4gIEF1dGhSZWRpcmVjdFNlcnZpY2UsXG4gIEF1dGhTZXJ2aWNlLFxuICBCMkJVc2VyLFxuICBCMkJVc2VyUm9sZSxcbiAgR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gIEdsb2JhbE1lc3NhZ2VUeXBlLFxuICBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgVXNlciwgVXNlckFjY291bnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL3VzZXIvYWNjb3VudC9yb290JztcbmltcG9ydCB7IGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tvdXRCMkJBdXRoR3VhcmRcbiAgZXh0ZW5kcyBDaGVja291dEF1dGhHdWFyZFxuICBpbXBsZW1lbnRzIENhbkFjdGl2YXRlXG57XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGF1dGhSZWRpcmVjdFNlcnZpY2U6IEF1dGhSZWRpcmVjdFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNoZWNrb3V0Q29uZmlnU2VydmljZTogQ2hlY2tvdXRDb25maWdTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBzZW1hbnRpY1BhdGhTZXJ2aWNlOiBTZW1hbnRpY1BhdGhTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCByb3V0ZXI6IFJvdXRlcixcbiAgICBwcm90ZWN0ZWQgdXNlckFjY291bnRGYWNhZGU6IFVzZXJBY2NvdW50RmFjYWRlLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoXG4gICAgICBhdXRoU2VydmljZSxcbiAgICAgIGF1dGhSZWRpcmVjdFNlcnZpY2UsXG4gICAgICBjaGVja291dENvbmZpZ1NlcnZpY2UsXG4gICAgICBhY3RpdmVDYXJ0RmFjYWRlLFxuICAgICAgc2VtYW50aWNQYXRoU2VydmljZSxcbiAgICAgIHJvdXRlclxuICAgICk7XG4gIH1cblxuICBjYW5BY3RpdmF0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgcmV0dXJuIGNvbWJpbmVMYXRlc3QoW1xuICAgICAgdGhpcy5hdXRoU2VydmljZS5pc1VzZXJMb2dnZWRJbigpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmlzR3Vlc3RDYXJ0KCksXG4gICAgICB0aGlzLnVzZXJBY2NvdW50RmFjYWRlLmdldCgpLFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLmlzU3RhYmxlKCksXG4gICAgXSkucGlwZShcbiAgICAgIG1hcCgoW2lzTG9nZ2VkSW4sIGlzR3Vlc3RDYXJ0LCB1c2VyLCBpc1N0YWJsZV0pID0+ICh7XG4gICAgICAgIGlzTG9nZ2VkSW4sXG4gICAgICAgIGlzR3Vlc3RDYXJ0LFxuICAgICAgICB1c2VyLFxuICAgICAgICBpc1N0YWJsZSxcbiAgICAgIH0pKSxcbiAgICAgIGZpbHRlcigoZGF0YSkgPT4gZGF0YS5pc1N0YWJsZSksXG4gICAgICAvLyBpZiB0aGUgdXNlciBpcyBhdXRoZW50aWNhdGVkIGFuZCB3ZSBoYXZlIHRoZWlyIGRhdGEsIE9SIGlmIHRoZSB1c2VyIGlzIGFub255bW91c1xuICAgICAgZmlsdGVyKChkYXRhKSA9PiAoISFkYXRhLnVzZXIgJiYgZGF0YS5pc0xvZ2dlZEluKSB8fCAhZGF0YS5pc0xvZ2dlZEluKSxcbiAgICAgIG1hcCgoZGF0YSkgPT4ge1xuICAgICAgICBpZiAoIWRhdGEuaXNMb2dnZWRJbikge1xuICAgICAgICAgIHJldHVybiBkYXRhLmlzR3Vlc3RDYXJ0ID8gdHJ1ZSA6IHRoaXMuaGFuZGxlQW5vbnltb3VzVXNlcigpO1xuICAgICAgICB9IGVsc2UgaWYgKGRhdGEudXNlciAmJiAncm9sZXMnIGluIGRhdGEudXNlcikge1xuICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVVzZXJSb2xlKGRhdGEudXNlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGEuaXNMb2dnZWRJbjtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBoYW5kbGVVc2VyUm9sZSh1c2VyOiBVc2VyKTogYm9vbGVhbiB8IFVybFRyZWUge1xuICAgIGNvbnN0IHJvbGVzID0gKDxCMkJVc2VyPnVzZXIpLnJvbGVzO1xuICAgIGlmIChyb2xlcz8uaW5jbHVkZXMoQjJCVXNlclJvbGUuQ1VTVE9NRVIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5nbG9iYWxNZXNzYWdlU2VydmljZS5hZGQoXG4gICAgICB7IGtleTogJ2NoZWNrb3V0QjJCLmludmFsaWQuYWNjb3VudFR5cGUnIH0sXG4gICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9XQVJOSU5HXG4gICAgKTtcbiAgICByZXR1cm4gdGhpcy5yb3V0ZXIucGFyc2VVcmwodGhpcy5zZW1hbnRpY1BhdGhTZXJ2aWNlLmdldCgnaG9tZScpID8/ICcnKTtcbiAgfVxufVxuIl19