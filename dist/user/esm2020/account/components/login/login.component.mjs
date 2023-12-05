/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
import * as i2 from "@spartacus/user/account/root";
import * as i3 from "@angular/common";
import * as i4 from "@angular/router";
import * as i5 from "@spartacus/storefront";
export class LoginComponent {
    constructor(auth, userAccount) {
        this.auth = auth;
        this.userAccount = userAccount;
    }
    ngOnInit() {
        this.user$ = this.auth.isUserLoggedIn().pipe(switchMap((isUserLoggedIn) => {
            if (isUserLoggedIn) {
                return this.userAccount.get();
            }
            else {
                return of(undefined);
            }
        }));
    }
}
LoginComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginComponent, deps: [{ token: i1.AuthService }, { token: i2.UserAccountFacade }], target: i0.ɵɵFactoryTarget.Component });
LoginComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: LoginComponent, selector: "cx-login", ngImport: i0, template: "<ng-container *ngIf=\"user$ | async as user; else login\">\n  <div class=\"cx-login-greet\">\n    {{ 'miniLogin.userGreeting' | cxTranslate: { name: user.name } }}\n  </div>\n  <cx-page-slot id=\"account-nav\" position=\"HeaderLinks\"></cx-page-slot>\n</ng-container>\n\n<ng-template #login>\n  <a role=\"link\" [routerLink]=\"{ cxRoute: 'login' } | cxUrl\">{{\n    'miniLogin.signInRegister' | cxTranslate\n  }}</a>\n</ng-template>\n", dependencies: [{ kind: "directive", type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "component", type: i5.PageSlotComponent, selector: "cx-page-slot,[cx-page-slot]", inputs: ["position", "class", "isPageFold", "hasComponents"] }, { kind: "pipe", type: i3.AsyncPipe, name: "async" }, { kind: "pipe", type: i1.UrlPipe, name: "cxUrl" }, { kind: "pipe", type: i1.TranslatePipe, name: "cxTranslate" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: LoginComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-login', template: "<ng-container *ngIf=\"user$ | async as user; else login\">\n  <div class=\"cx-login-greet\">\n    {{ 'miniLogin.userGreeting' | cxTranslate: { name: user.name } }}\n  </div>\n  <cx-page-slot id=\"account-nav\" position=\"HeaderLinks\"></cx-page-slot>\n</ng-container>\n\n<ng-template #login>\n  <a role=\"link\" [routerLink]=\"{ cxRoute: 'login' } | cxUrl\">{{\n    'miniLogin.signInRegister' | cxTranslate\n  }}</a>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AuthService }, { type: i2.UserAccountFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3VzZXIvYWNjb3VudC9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy91c2VyL2FjY291bnQvY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUdsRCxPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7OztBQU0zQyxNQUFNLE9BQU8sY0FBYztJQUd6QixZQUNVLElBQWlCLEVBQ2pCLFdBQThCO1FBRDlCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQW1CO0lBQ3JDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FDMUMsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUMvQjtpQkFBTTtnQkFDTCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUN0QjtRQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzsyR0FsQlUsY0FBYzsrRkFBZCxjQUFjLGdEQ2hCM0Isb2JBWUE7MkZESWEsY0FBYztrQkFKMUIsU0FBUzsrQkFDRSxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFVzZXIsIFVzZXJBY2NvdW50RmFjYWRlIH0gZnJvbSAnQHNwYXJ0YWN1cy91c2VyL2FjY291bnQvcm9vdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjeC1sb2dpbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdXNlciQ6IE9ic2VydmFibGU8VXNlciB8IHVuZGVmaW5lZD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSxcbiAgICBwcml2YXRlIHVzZXJBY2NvdW50OiBVc2VyQWNjb3VudEZhY2FkZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy51c2VyJCA9IHRoaXMuYXV0aC5pc1VzZXJMb2dnZWRJbigpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGlzVXNlckxvZ2dlZEluKSA9PiB7XG4gICAgICAgIGlmIChpc1VzZXJMb2dnZWRJbikge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVzZXJBY2NvdW50LmdldCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBvZih1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgKm5nSWY9XCJ1c2VyJCB8IGFzeW5jIGFzIHVzZXI7IGVsc2UgbG9naW5cIj5cbiAgPGRpdiBjbGFzcz1cImN4LWxvZ2luLWdyZWV0XCI+XG4gICAge3sgJ21pbmlMb2dpbi51c2VyR3JlZXRpbmcnIHwgY3hUcmFuc2xhdGU6IHsgbmFtZTogdXNlci5uYW1lIH0gfX1cbiAgPC9kaXY+XG4gIDxjeC1wYWdlLXNsb3QgaWQ9XCJhY2NvdW50LW5hdlwiIHBvc2l0aW9uPVwiSGVhZGVyTGlua3NcIj48L2N4LXBhZ2Utc2xvdD5cbjwvbmctY29udGFpbmVyPlxuXG48bmctdGVtcGxhdGUgI2xvZ2luPlxuICA8YSByb2xlPVwibGlua1wiIFtyb3V0ZXJMaW5rXT1cInsgY3hSb3V0ZTogJ2xvZ2luJyB9IHwgY3hVcmxcIj57e1xuICAgICdtaW5pTG9naW4uc2lnbkluUmVnaXN0ZXInIHwgY3hUcmFuc2xhdGVcbiAgfX08L2E+XG48L25nLXRlbXBsYXRlPlxuIl19