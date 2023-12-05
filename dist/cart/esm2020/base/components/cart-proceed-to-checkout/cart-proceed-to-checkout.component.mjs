/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { NavigationCancel, NavigationEnd, } from '@angular/router';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@spartacus/storefront";
import * as i3 from "@spartacus/core";
export class CartProceedToCheckoutComponent {
    constructor(router, cd) {
        this.router = router;
        this.cd = cd;
        this.cartValidationInProgress = false;
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd ||
                event instanceof NavigationCancel) {
                this.cartValidationInProgress = false;
                this.cd?.markForCheck();
            }
        }));
    }
    disableButtonWhileNavigation() {
        this.cartValidationInProgress = true;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CartProceedToCheckoutComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutComponent, deps: [{ token: i1.Router }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
CartProceedToCheckoutComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: CartProceedToCheckoutComponent, selector: "cx-cart-proceed-to-checkout", ngImport: i0, template: "<cx-progress-button\n  (clickEvent)=\"disableButtonWhileNavigation()\"\n  [class]=\"'btn btn-primary btn-block'\"\n  [disabled]=\"cartValidationInProgress\"\n  [loading]=\"cartValidationInProgress\"\n  [routerLink]=\"{ cxRoute: 'checkout' } | cxUrl\"\n  tabindex=\"-1\"\n>\n  {{\n    (cartValidationInProgress\n      ? 'validation.inProgress'\n      : 'cartDetails.proceedToCheckout'\n    ) | cxTranslate\n  }}\n</cx-progress-button>\n", dependencies: [{ kind: "component", type: i2.ProgressButtonComponent, selector: "cx-progress-button", inputs: ["ariaLabel", "class", "disabled", "loading"], outputs: ["clickEvent"] }, { kind: "directive", type: i1.RouterLink, selector: "[routerLink]", inputs: ["target", "queryParams", "fragment", "queryParamsHandling", "state", "relativeTo", "preserveFragment", "skipLocationChange", "replaceUrl", "routerLink"] }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i3.UrlPipe, name: "cxUrl" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartProceedToCheckoutComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-cart-proceed-to-checkout', changeDetection: ChangeDetectionStrategy.OnPush, template: "<cx-progress-button\n  (clickEvent)=\"disableButtonWhileNavigation()\"\n  [class]=\"'btn btn-primary btn-block'\"\n  [disabled]=\"cartValidationInProgress\"\n  [loading]=\"cartValidationInProgress\"\n  [routerLink]=\"{ cxRoute: 'checkout' } | cxUrl\"\n  tabindex=\"-1\"\n>\n  {{\n    (cartValidationInProgress\n      ? 'validation.inProgress'\n      : 'cartDetails.proceedToCheckout'\n    ) | cxTranslate\n  }}\n</cx-progress-button>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jYXJ0LXByb2NlZWQtdG8tY2hlY2tvdXQvY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L2Jhc2UvY29tcG9uZW50cy9jYXJ0LXByb2NlZWQtdG8tY2hlY2tvdXQvY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBRXZCLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBRUwsZ0JBQWdCLEVBQ2hCLGFBQWEsR0FFZCxNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7O0FBT3BDLE1BQU0sT0FBTyw4QkFBOEI7SUFjekMsWUFBc0IsTUFBYyxFQUFZLEVBQXNCO1FBQWhELFdBQU0sR0FBTixNQUFNLENBQVE7UUFBWSxPQUFFLEdBQUYsRUFBRSxDQUFvQjtRQWJ0RSw2QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFFdkIsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBVzZCLENBQUM7SUFFMUUsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtZQUM1QyxJQUNFLEtBQUssWUFBWSxhQUFhO2dCQUM5QixLQUFLLFlBQVksZ0JBQWdCLEVBQ2pDO2dCQUNBLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLENBQUM7YUFDekI7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVELDRCQUE0QjtRQUMxQixJQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzsySEFwQ1UsOEJBQThCOytHQUE5Qiw4QkFBOEIsbUVDMUIzQyxxYkFlQTsyRkRXYSw4QkFBOEI7a0JBTDFDLFNBQVM7K0JBQ0UsNkJBQTZCLG1CQUV0Qix1QkFBdUIsQ0FBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEV2ZW50LFxuICBOYXZpZ2F0aW9uQ2FuY2VsLFxuICBOYXZpZ2F0aW9uRW5kLFxuICBSb3V0ZXIsXG59IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtY2FydC1wcm9jZWVkLXRvLWNoZWNrb3V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhcnQtcHJvY2VlZC10by1jaGVja291dC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDYXJ0UHJvY2VlZFRvQ2hlY2tvdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIGNhcnRWYWxpZGF0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcm91dGVyOiBSb3V0ZXIsXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC91bmlmaWVkLXNpZ25hdHVyZXNcbiAgICBjZD86IENoYW5nZURldGVjdG9yUmVmXG4gICk7XG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCBzaW5jZSA1LjJcbiAgICovXG4gIGNvbnN0cnVjdG9yKHJvdXRlcjogUm91dGVyKTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLCBwcm90ZWN0ZWQgY2Q/OiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLnJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCB8fFxuICAgICAgICAgIGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbFxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNhcnRWYWxpZGF0aW9uSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuY2Q/Lm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBkaXNhYmxlQnV0dG9uV2hpbGVOYXZpZ2F0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuY2FydFZhbGlkYXRpb25JblByb2dyZXNzID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxjeC1wcm9ncmVzcy1idXR0b25cbiAgKGNsaWNrRXZlbnQpPVwiZGlzYWJsZUJ1dHRvbldoaWxlTmF2aWdhdGlvbigpXCJcbiAgW2NsYXNzXT1cIididG4gYnRuLXByaW1hcnkgYnRuLWJsb2NrJ1wiXG4gIFtkaXNhYmxlZF09XCJjYXJ0VmFsaWRhdGlvbkluUHJvZ3Jlc3NcIlxuICBbbG9hZGluZ109XCJjYXJ0VmFsaWRhdGlvbkluUHJvZ3Jlc3NcIlxuICBbcm91dGVyTGlua109XCJ7IGN4Um91dGU6ICdjaGVja291dCcgfSB8IGN4VXJsXCJcbiAgdGFiaW5kZXg9XCItMVwiXG4+XG4gIHt7XG4gICAgKGNhcnRWYWxpZGF0aW9uSW5Qcm9ncmVzc1xuICAgICAgPyAndmFsaWRhdGlvbi5pblByb2dyZXNzJ1xuICAgICAgOiAnY2FydERldGFpbHMucHJvY2VlZFRvQ2hlY2tvdXQnXG4gICAgKSB8IGN4VHJhbnNsYXRlXG4gIH19XG48L2N4LXByb2dyZXNzLWJ1dHRvbj5cbiJdfQ==