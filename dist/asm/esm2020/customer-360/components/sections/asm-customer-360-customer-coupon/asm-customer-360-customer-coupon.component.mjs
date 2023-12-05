/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { AsmCustomer360Type, } from '@spartacus/asm/customer-360/root';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICON_TYPE } from '@spartacus/storefront';
import * as i0 from "@angular/core";
import * as i1 from "../asm-customer-360-section-context.model";
import * as i2 from "@spartacus/asm/customer-360/root";
import * as i3 from "@spartacus/core";
import * as i4 from "../../asm-customer-360-promotion-listing/asm-customer-360-promotion-listing.component";
import * as i5 from "@spartacus/storefront";
import * as i6 from "@angular/common";
export class AsmCustomer360CustomerCouponComponent {
    constructor(context, asmCustomer360Facade, customerCouponService) {
        this.context = context;
        this.asmCustomer360Facade = asmCustomer360Facade;
        this.customerCouponService = customerCouponService;
        this.showErrorAlert$ = new BehaviorSubject(false);
        this.showErrorAlertForApplyAction$ = new BehaviorSubject(false);
        this.subscription = new Subscription();
        this.currentTabIsAssignable = true;
        this.iconTypes = ICON_TYPE;
        this.activeTab = 0;
    }
    ngOnInit() {
        this.subscription.add(this.customerCouponService
            .getClaimCustomerCouponResultError()
            .subscribe((error) => {
            if (error) {
                this.changeTab(true);
                this.showErrorAlertForApplyAction$.next(true);
            }
        }));
        this.subscription.add(this.customerCouponService
            .getDisclaimCustomerCouponResultError()
            .subscribe((error) => {
            if (error) {
                this.changeTab(false);
                this.showErrorAlertForApplyAction$.next(true);
            }
        }));
        this.fetchCustomerCoupons();
        this.currentTabIsAssignable = true;
        this.hideAllErrorAlert();
    }
    fetchCustomerCoupons() {
        this.entries$ = this.context.data$.pipe(map((data) => {
            const entries = [];
            data.customerCoupons.forEach((customerCoupon) => {
                entries.push({
                    code: customerCoupon.name,
                    name: customerCoupon.description,
                    codeForApplyAction: customerCoupon.code,
                    applied: false,
                });
            });
            return entries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    changeTab(assignable) {
        this.currentTabIsAssignable = assignable;
        this.hideAllErrorAlert();
        this.entries$ = this.asmCustomer360Facade
            .get360Data([
            {
                requestData: {
                    type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
                    additionalRequestParameters: {
                        assignable: assignable,
                    },
                },
            },
        ])
            .pipe(map((response) => {
            return this.mapParams(assignable, response);
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    searchCustomerCoupon(searchQuery) {
        this.hideAllErrorAlert();
        this.entries$ = this.asmCustomer360Facade
            .get360Data([
            {
                requestData: {
                    type: AsmCustomer360Type.CUSTOMER_COUPON_LIST,
                    additionalRequestParameters: {
                        assignable: this.currentTabIsAssignable,
                        searchQuery: searchQuery,
                    },
                },
            },
        ])
            .pipe(map((response) => {
            return this.mapParams(this.currentTabIsAssignable, response);
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    hideAllErrorAlert() {
        this.showErrorAlert$.next(false);
        this.showErrorAlertForApplyAction$.next(false);
    }
    mapParams(applied, response) {
        const couponList = response?.value?.find((item) => item.type === AsmCustomer360Type.CUSTOMER_COUPON_LIST);
        const newEntries = [];
        if (couponList.customerCoupons) {
            couponList.customerCoupons.forEach((customerCoupon) => {
                newEntries.push({
                    code: customerCoupon.name,
                    name: customerCoupon.description,
                    codeForApplyAction: customerCoupon.code,
                    applied: !applied,
                });
            });
        }
        this.activeTab = applied ? 0 : 1;
        return newEntries;
    }
    closeErrorAlert() {
        this.showErrorAlert$.next(false);
    }
    closeErrorAlertForApplyAction() {
        this.showErrorAlertForApplyAction$.next(false);
    }
    claimCouponToCustomer(entry) {
        this.customerCouponService.claimCustomerCoupon(entry.codeForApplyAction);
        this.refreshActionButton(entry?.codeForApplyAction);
    }
    disclaimCouponToCustomer(entry) {
        this.customerCouponService.resetDisclaimCustomerCoupon();
        this.customerCouponService.disclaimCustomerCoupon(entry.codeForApplyAction);
        this.refreshActionButton(entry?.codeForApplyAction);
    }
    refreshActionButton(couponCode) {
        this.entries$ = this.entries$.pipe(map((entries) => {
            return entries.filter((item) => item.codeForApplyAction !== couponCode);
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmCustomer360CustomerCouponComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CustomerCouponComponent, deps: [{ token: i1.AsmCustomer360SectionContext }, { token: i2.AsmCustomer360Facade }, { token: i3.CustomerCouponService }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360CustomerCouponComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360CustomerCouponComponent, selector: "cx-asm-customer-360-customer-coupon", ngImport: i0, template: "<cx-asm-customer-360-promotion-listing\n  [headerText]=\"'asmCustomer360.customerCoupons.headerText' | cxTranslate\"\n  [emptyStateText]=\"\n    'asmCustomer360.customerCoupons.emptyDescription' | cxTranslate\n  \"\n  [applyButtonText]=\"\n    'asmCustomer360.customerCoupons.applyButtonText' | cxTranslate\n  \"\n  [applied]=\"'asmCustomer360.customerCoupons.applied' | cxTranslate\"\n  [removeButtonText]=\"\n    'asmCustomer360.customerCoupons.removeButtonText' | cxTranslate\n  \"\n  [entries]=\"entries$ | async\"\n  [showRemoveButton]=\"true\"\n  [showApplyButton]=\"true\"\n  [isCustomerCoupon]=\"true\"\n  (apply)=\"claimCouponToCustomer($event)\"\n  (remove)=\"disclaimCouponToCustomer($event)\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [showAlertForApplyAction]=\"showErrorAlertForApplyAction$ | async\"\n  (removeAlert)=\"closeErrorAlert()\"\n  (removeAlertForApplyAction)=\"closeErrorAlertForApplyAction()\"\n>\n  <ng-container>\n    <div class=\"cx-asm-customer-360-promotion-listing-tabs\">\n      <button\n        class=\"cx-tab-header\"\n        [class.active]=\"this.activeTab === 0\"\n        [textContent]=\"\n          'asmCustomer360.customerCoupons.availableTab' | cxTranslate\n        \"\n        (click)=\"this.changeTab(true); searchBox.value = ''\"\n      ></button>\n      <button\n        class=\"cx-tab-header\"\n        [class.active]=\"this.activeTab === 1\"\n        [textContent]=\"'asmCustomer360.customerCoupons.sentTab' | cxTranslate\"\n        (click)=\"this.changeTab(false); searchBox.value = ''\"\n      ></button>\n    </div>\n    <hr\n      class=\"cx-asm-customer-360-promotion-listing-separator\"\n      aria-hidden=\"true\"\n    />\n    <div class=\"cx-asm-customer-360-promotion-listing-search\">\n      <input\n        #searchBox\n        class=\"cx-asm-customer-360-promotion-listing-search-input\"\n        placeholder=\"{{\n          'asmCustomer360.customerCoupons.searchBox' | cxTranslate\n        }}\"\n        (keydown.enter)=\"this.searchCustomerCoupon(searchBox.value)\"\n      />\n      <cx-icon\n        class=\"cx-asm-customer-360-promotion-listing-search-icon-reset\"\n        [type]=\"iconTypes.CLOSE\"\n        role=\"button\"\n        (click)=\"this.searchBox.value = ''\"\n      ></cx-icon>\n      <cx-icon\n        class=\"cx-asm-customer-360-promotion-listing-search-icon-search\"\n        [type]=\"iconTypes.SEARCH\"\n        role=\"button\"\n        (click)=\"this.searchCustomerCoupon(searchBox.value)\"\n      ></cx-icon>\n    </div>\n  </ng-container>\n</cx-asm-customer-360-promotion-listing>\n", dependencies: [{ kind: "component", type: i4.AsmCustomer360PromotionListingComponent, selector: "cx-asm-customer-360-promotion-listing", inputs: ["headerText", "emptyStateText", "applyButtonText", "applied", "removeButtonText", "entries", "showAlert", "showAlertForApplyAction", "showRemoveButton", "showApplyButton", "isCustomerCoupon"], outputs: ["apply", "remove", "removeAlert", "removeAlertForApplyAction"] }, { kind: "component", type: i5.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CustomerCouponComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-customer-coupon', template: "<cx-asm-customer-360-promotion-listing\n  [headerText]=\"'asmCustomer360.customerCoupons.headerText' | cxTranslate\"\n  [emptyStateText]=\"\n    'asmCustomer360.customerCoupons.emptyDescription' | cxTranslate\n  \"\n  [applyButtonText]=\"\n    'asmCustomer360.customerCoupons.applyButtonText' | cxTranslate\n  \"\n  [applied]=\"'asmCustomer360.customerCoupons.applied' | cxTranslate\"\n  [removeButtonText]=\"\n    'asmCustomer360.customerCoupons.removeButtonText' | cxTranslate\n  \"\n  [entries]=\"entries$ | async\"\n  [showRemoveButton]=\"true\"\n  [showApplyButton]=\"true\"\n  [isCustomerCoupon]=\"true\"\n  (apply)=\"claimCouponToCustomer($event)\"\n  (remove)=\"disclaimCouponToCustomer($event)\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [showAlertForApplyAction]=\"showErrorAlertForApplyAction$ | async\"\n  (removeAlert)=\"closeErrorAlert()\"\n  (removeAlertForApplyAction)=\"closeErrorAlertForApplyAction()\"\n>\n  <ng-container>\n    <div class=\"cx-asm-customer-360-promotion-listing-tabs\">\n      <button\n        class=\"cx-tab-header\"\n        [class.active]=\"this.activeTab === 0\"\n        [textContent]=\"\n          'asmCustomer360.customerCoupons.availableTab' | cxTranslate\n        \"\n        (click)=\"this.changeTab(true); searchBox.value = ''\"\n      ></button>\n      <button\n        class=\"cx-tab-header\"\n        [class.active]=\"this.activeTab === 1\"\n        [textContent]=\"'asmCustomer360.customerCoupons.sentTab' | cxTranslate\"\n        (click)=\"this.changeTab(false); searchBox.value = ''\"\n      ></button>\n    </div>\n    <hr\n      class=\"cx-asm-customer-360-promotion-listing-separator\"\n      aria-hidden=\"true\"\n    />\n    <div class=\"cx-asm-customer-360-promotion-listing-search\">\n      <input\n        #searchBox\n        class=\"cx-asm-customer-360-promotion-listing-search-input\"\n        placeholder=\"{{\n          'asmCustomer360.customerCoupons.searchBox' | cxTranslate\n        }}\"\n        (keydown.enter)=\"this.searchCustomerCoupon(searchBox.value)\"\n      />\n      <cx-icon\n        class=\"cx-asm-customer-360-promotion-listing-search-icon-reset\"\n        [type]=\"iconTypes.CLOSE\"\n        role=\"button\"\n        (click)=\"this.searchBox.value = ''\"\n      ></cx-icon>\n      <cx-icon\n        class=\"cx-asm-customer-360-promotion-listing-search-icon-search\"\n        [type]=\"iconTypes.SEARCH\"\n        role=\"button\"\n        (click)=\"this.searchCustomerCoupon(searchBox.value)\"\n      ></cx-icon>\n    </div>\n  </ng-container>\n</cx-asm-customer-360-promotion-listing>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmCustomer360SectionContext }, { type: i2.AsmCustomer360Facade }, { type: i3.CustomerCouponService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1jdXN0b21lci1jb3Vwb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvY29tcG9uZW50cy9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLWN1c3RvbWVyLWNvdXBvbi9hc20tY3VzdG9tZXItMzYwLWN1c3RvbWVyLWNvdXBvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtY3VzdG9tZXItY291cG9uL2FzbS1jdXN0b21lci0zNjAtY3VzdG9tZXItY291cG9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBSUwsa0JBQWtCLEdBQ25CLE1BQU0sa0NBQWtDLENBQUM7QUFFMUMsT0FBTyxFQUFFLGVBQWUsRUFBYyxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDOzs7Ozs7OztBQU9sRCxNQUFNLE9BQU8scUNBQXFDO0lBV2hELFlBQ1ksT0FBdUUsRUFDdkUsb0JBQTBDLEVBQzFDLHFCQUE0QztRQUY1QyxZQUFPLEdBQVAsT0FBTyxDQUFnRTtRQUN2RSx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXNCO1FBQzFDLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBdUI7UUFYeEQsb0JBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUN0RCxrQ0FBNkIsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztRQUVwRSxpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEMsMkJBQXNCLEdBQUcsSUFBSSxDQUFDO1FBQzlCLGNBQVMsR0FBRyxTQUFTLENBQUM7UUFDdEIsY0FBUyxHQUFHLENBQUMsQ0FBQztJQU1YLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxxQkFBcUI7YUFDdkIsaUNBQWlDLEVBQUU7YUFDbkMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDbkIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLDZCQUE2QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMvQztRQUNILENBQUMsQ0FBQyxDQUNMLENBQUM7UUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLHFCQUFxQjthQUN2QixvQ0FBb0MsRUFBRTthQUN0QyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNuQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DO1FBQ0gsQ0FBQyxDQUFDLENBQ0wsQ0FBQztRQUNGLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVNLG9CQUFvQjtRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDckMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDWCxNQUFNLE9BQU8sR0FBK0IsRUFBRSxDQUFDO1lBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7Z0JBQzlDLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ1gsSUFBSSxFQUFFLGNBQWMsQ0FBQyxJQUFJO29CQUN6QixJQUFJLEVBQUUsY0FBYyxDQUFDLFdBQVc7b0JBQ2hDLGtCQUFrQixFQUFFLGNBQWMsQ0FBQyxJQUFJO29CQUN2QyxPQUFPLEVBQUUsS0FBSztpQkFDZixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVNLFNBQVMsQ0FBQyxVQUFtQjtRQUNsQyxJQUFJLENBQUMsc0JBQXNCLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQjthQUN0QyxVQUFVLENBQUM7WUFDVjtnQkFDRSxXQUFXLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLGtCQUFrQixDQUFDLG9CQUFvQjtvQkFDN0MsMkJBQTJCLEVBQUU7d0JBQzNCLFVBQVUsRUFBRSxVQUFVO3FCQUN2QjtpQkFDRjthQUNGO1NBQ0YsQ0FBQzthQUNELElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRU0sb0JBQW9CLENBQUMsV0FBbUI7UUFDN0MsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsb0JBQW9CO2FBQ3RDLFVBQVUsQ0FBQztZQUNWO2dCQUNFLFdBQVcsRUFBRTtvQkFDWCxJQUFJLEVBQUUsa0JBQWtCLENBQUMsb0JBQW9CO29CQUM3QywyQkFBMkIsRUFBRTt3QkFDM0IsVUFBVSxFQUFFLElBQUksQ0FBQyxzQkFBc0I7d0JBQ3ZDLFdBQVcsRUFBRSxXQUFXO3FCQUN6QjtpQkFDRjthQUNGO1NBQ0YsQ0FBQzthQUNELElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLFNBQVMsQ0FDZixPQUFnQixFQUNoQixRQUE0QztRQUU1QyxNQUFNLFVBQVUsR0FBRyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FDdEMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssa0JBQWtCLENBQUMsb0JBQW9CLENBQzVCLENBQUM7UUFDdEMsTUFBTSxVQUFVLEdBQStCLEVBQUUsQ0FBQztRQUNsRCxJQUFJLFVBQVUsQ0FBQyxlQUFlLEVBQUU7WUFDOUIsVUFBVSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtnQkFDcEQsVUFBVSxDQUFDLElBQUksQ0FBQztvQkFDZCxJQUFJLEVBQUUsY0FBYyxDQUFDLElBQUk7b0JBQ3pCLElBQUksRUFBRSxjQUFjLENBQUMsV0FBVztvQkFDaEMsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLElBQUk7b0JBQ3ZDLE9BQU8sRUFBRSxDQUFDLE9BQU87aUJBQ2xCLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVNLGVBQWU7UUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLDZCQUE2QjtRQUNsQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTSxxQkFBcUIsQ0FBQyxLQUEwQjtRQUNyRCxJQUFJLENBQUMscUJBQXFCLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSx3QkFBd0IsQ0FBQyxLQUEwQjtRQUN4RCxJQUFJLENBQUMscUJBQXFCLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMscUJBQXFCLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxtQkFBbUIsQ0FBQyxVQUFrQjtRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNoQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNkLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixLQUFLLFVBQVUsQ0FBQyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7a0lBMUtVLHFDQUFxQztzSEFBckMscUNBQXFDLDJFQzlCbEQsNmdGQW9FQTsyRkR0Q2EscUNBQXFDO2tCQUxqRCxTQUFTO3NDQUNTLHVCQUF1QixDQUFDLE1BQU0sWUFDckMscUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXNtQ3VzdG9tZXIzNjBDdXN0b21lckNvdXBvbkxpc3QsXG4gIEFzbUN1c3RvbWVyMzYwRmFjYWRlLFxuICBBc21DdXN0b21lcjM2MFJlc3BvbnNlLFxuICBBc21DdXN0b21lcjM2MFR5cGUsXG59IGZyb20gJ0BzcGFydGFjdXMvYXNtL2N1c3RvbWVyLTM2MC9yb290JztcbmltcG9ydCB7IEN1c3RvbWVyQ291cG9uU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwU2VjdGlvbkNvbnRleHQgfSBmcm9tICcuLi9hc20tY3VzdG9tZXItMzYwLXNlY3Rpb24tY29udGV4dC5tb2RlbCc7XG5pbXBvcnQgeyBDdXN0b21lckNvdXBvbkVudHJ5IH0gZnJvbSAnLi9hc20tY3VzdG9tZXItMzYwLWN1c3RvbWVyLWNvdXBvbi5tb2RlbCc7XG5pbXBvcnQgeyBJQ09OX1RZUEUgfSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHNlbGVjdG9yOiAnY3gtYXNtLWN1c3RvbWVyLTM2MC1jdXN0b21lci1jb3Vwb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYXNtLWN1c3RvbWVyLTM2MC1jdXN0b21lci1jb3Vwb24uY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBBc21DdXN0b21lcjM2MEN1c3RvbWVyQ291cG9uQ29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcbntcbiAgc2hvd0Vycm9yQWxlcnQkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHNob3dFcnJvckFsZXJ0Rm9yQXBwbHlBY3Rpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIGVudHJpZXMkOiBPYnNlcnZhYmxlPEFycmF5PEN1c3RvbWVyQ291cG9uRW50cnk+PjtcbiAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICBjdXJyZW50VGFiSXNBc3NpZ25hYmxlID0gdHJ1ZTtcbiAgaWNvblR5cGVzID0gSUNPTl9UWVBFO1xuICBhY3RpdmVUYWIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb250ZXh0OiBBc21DdXN0b21lcjM2MFNlY3Rpb25Db250ZXh0PEFzbUN1c3RvbWVyMzYwQ3VzdG9tZXJDb3Vwb25MaXN0PixcbiAgICBwcm90ZWN0ZWQgYXNtQ3VzdG9tZXIzNjBGYWNhZGU6IEFzbUN1c3RvbWVyMzYwRmFjYWRlLFxuICAgIHByb3RlY3RlZCBjdXN0b21lckNvdXBvblNlcnZpY2U6IEN1c3RvbWVyQ291cG9uU2VydmljZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5jdXN0b21lckNvdXBvblNlcnZpY2VcbiAgICAgICAgLmdldENsYWltQ3VzdG9tZXJDb3Vwb25SZXN1bHRFcnJvcigpXG4gICAgICAgIC5zdWJzY3JpYmUoKGVycm9yKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRhYih0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQWxlcnRGb3JBcHBseUFjdGlvbiQubmV4dCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi5hZGQoXG4gICAgICB0aGlzLmN1c3RvbWVyQ291cG9uU2VydmljZVxuICAgICAgICAuZ2V0RGlzY2xhaW1DdXN0b21lckNvdXBvblJlc3VsdEVycm9yKClcbiAgICAgICAgLnN1YnNjcmliZSgoZXJyb3IpID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGFiKGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQWxlcnRGb3JBcHBseUFjdGlvbiQubmV4dCh0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLmZldGNoQ3VzdG9tZXJDb3Vwb25zKCk7XG4gICAgdGhpcy5jdXJyZW50VGFiSXNBc3NpZ25hYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmhpZGVBbGxFcnJvckFsZXJ0KCk7XG4gIH1cblxuICBwdWJsaWMgZmV0Y2hDdXN0b21lckNvdXBvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5lbnRyaWVzJCA9IHRoaXMuY29udGV4dC5kYXRhJC5waXBlKFxuICAgICAgbWFwKChkYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IGVudHJpZXM6IEFycmF5PEN1c3RvbWVyQ291cG9uRW50cnk+ID0gW107XG4gICAgICAgIGRhdGEuY3VzdG9tZXJDb3Vwb25zLmZvckVhY2goKGN1c3RvbWVyQ291cG9uKSA9PiB7XG4gICAgICAgICAgZW50cmllcy5wdXNoKHtcbiAgICAgICAgICAgIGNvZGU6IGN1c3RvbWVyQ291cG9uLm5hbWUsXG4gICAgICAgICAgICBuYW1lOiBjdXN0b21lckNvdXBvbi5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGNvZGVGb3JBcHBseUFjdGlvbjogY3VzdG9tZXJDb3Vwb24uY29kZSxcbiAgICAgICAgICAgIGFwcGxpZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGVudHJpZXM7XG4gICAgICB9KSxcbiAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dFcnJvckFsZXJ0JC5uZXh0KHRydWUpO1xuICAgICAgICByZXR1cm4gb2YoW10pO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGNoYW5nZVRhYihhc3NpZ25hYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5jdXJyZW50VGFiSXNBc3NpZ25hYmxlID0gYXNzaWduYWJsZTtcbiAgICB0aGlzLmhpZGVBbGxFcnJvckFsZXJ0KCk7XG4gICAgdGhpcy5lbnRyaWVzJCA9IHRoaXMuYXNtQ3VzdG9tZXIzNjBGYWNhZGVcbiAgICAgIC5nZXQzNjBEYXRhKFtcbiAgICAgICAge1xuICAgICAgICAgIHJlcXVlc3REYXRhOiB7XG4gICAgICAgICAgICB0eXBlOiBBc21DdXN0b21lcjM2MFR5cGUuQ1VTVE9NRVJfQ09VUE9OX0xJU1QsXG4gICAgICAgICAgICBhZGRpdGlvbmFsUmVxdWVzdFBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgYXNzaWduYWJsZTogYXNzaWduYWJsZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0pXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLm1hcFBhcmFtcyhhc3NpZ25hYmxlLCByZXNwb25zZSk7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNob3dFcnJvckFsZXJ0JC5uZXh0KHRydWUpO1xuICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIHNlYXJjaEN1c3RvbWVyQ291cG9uKHNlYXJjaFF1ZXJ5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGVBbGxFcnJvckFsZXJ0KCk7XG4gICAgdGhpcy5lbnRyaWVzJCA9IHRoaXMuYXNtQ3VzdG9tZXIzNjBGYWNhZGVcbiAgICAgIC5nZXQzNjBEYXRhKFtcbiAgICAgICAge1xuICAgICAgICAgIHJlcXVlc3REYXRhOiB7XG4gICAgICAgICAgICB0eXBlOiBBc21DdXN0b21lcjM2MFR5cGUuQ1VTVE9NRVJfQ09VUE9OX0xJU1QsXG4gICAgICAgICAgICBhZGRpdGlvbmFsUmVxdWVzdFBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgYXNzaWduYWJsZTogdGhpcy5jdXJyZW50VGFiSXNBc3NpZ25hYmxlLFxuICAgICAgICAgICAgICBzZWFyY2hRdWVyeTogc2VhcmNoUXVlcnksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tYXBQYXJhbXModGhpcy5jdXJyZW50VGFiSXNBc3NpZ25hYmxlLCByZXNwb25zZSk7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNob3dFcnJvckFsZXJ0JC5uZXh0KHRydWUpO1xuICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBoaWRlQWxsRXJyb3JBbGVydCgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dFcnJvckFsZXJ0JC5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLnNob3dFcnJvckFsZXJ0Rm9yQXBwbHlBY3Rpb24kLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgcHJpdmF0ZSBtYXBQYXJhbXMoXG4gICAgYXBwbGllZDogYm9vbGVhbixcbiAgICByZXNwb25zZTogQXNtQ3VzdG9tZXIzNjBSZXNwb25zZSB8IHVuZGVmaW5lZFxuICApOiBBcnJheTxDdXN0b21lckNvdXBvbkVudHJ5PiB7XG4gICAgY29uc3QgY291cG9uTGlzdCA9IHJlc3BvbnNlPy52YWx1ZT8uZmluZChcbiAgICAgIChpdGVtKSA9PiBpdGVtLnR5cGUgPT09IEFzbUN1c3RvbWVyMzYwVHlwZS5DVVNUT01FUl9DT1VQT05fTElTVFxuICAgICkgYXMgQXNtQ3VzdG9tZXIzNjBDdXN0b21lckNvdXBvbkxpc3Q7XG4gICAgY29uc3QgbmV3RW50cmllczogQXJyYXk8Q3VzdG9tZXJDb3Vwb25FbnRyeT4gPSBbXTtcbiAgICBpZiAoY291cG9uTGlzdC5jdXN0b21lckNvdXBvbnMpIHtcbiAgICAgIGNvdXBvbkxpc3QuY3VzdG9tZXJDb3Vwb25zLmZvckVhY2goKGN1c3RvbWVyQ291cG9uKSA9PiB7XG4gICAgICAgIG5ld0VudHJpZXMucHVzaCh7XG4gICAgICAgICAgY29kZTogY3VzdG9tZXJDb3Vwb24ubmFtZSxcbiAgICAgICAgICBuYW1lOiBjdXN0b21lckNvdXBvbi5kZXNjcmlwdGlvbixcbiAgICAgICAgICBjb2RlRm9yQXBwbHlBY3Rpb246IGN1c3RvbWVyQ291cG9uLmNvZGUsXG4gICAgICAgICAgYXBwbGllZDogIWFwcGxpZWQsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuYWN0aXZlVGFiID0gYXBwbGllZCA/IDAgOiAxO1xuICAgIHJldHVybiBuZXdFbnRyaWVzO1xuICB9XG5cbiAgcHVibGljIGNsb3NlRXJyb3JBbGVydCgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dFcnJvckFsZXJ0JC5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZUVycm9yQWxlcnRGb3JBcHBseUFjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dFcnJvckFsZXJ0Rm9yQXBwbHlBY3Rpb24kLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIGNsYWltQ291cG9uVG9DdXN0b21lcihlbnRyeTogQ3VzdG9tZXJDb3Vwb25FbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuY3VzdG9tZXJDb3Vwb25TZXJ2aWNlLmNsYWltQ3VzdG9tZXJDb3Vwb24oZW50cnkuY29kZUZvckFwcGx5QWN0aW9uKTtcbiAgICB0aGlzLnJlZnJlc2hBY3Rpb25CdXR0b24oZW50cnk/LmNvZGVGb3JBcHBseUFjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZGlzY2xhaW1Db3Vwb25Ub0N1c3RvbWVyKGVudHJ5OiBDdXN0b21lckNvdXBvbkVudHJ5KTogdm9pZCB7XG4gICAgdGhpcy5jdXN0b21lckNvdXBvblNlcnZpY2UucmVzZXREaXNjbGFpbUN1c3RvbWVyQ291cG9uKCk7XG4gICAgdGhpcy5jdXN0b21lckNvdXBvblNlcnZpY2UuZGlzY2xhaW1DdXN0b21lckNvdXBvbihlbnRyeS5jb2RlRm9yQXBwbHlBY3Rpb24pO1xuICAgIHRoaXMucmVmcmVzaEFjdGlvbkJ1dHRvbihlbnRyeT8uY29kZUZvckFwcGx5QWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyByZWZyZXNoQWN0aW9uQnV0dG9uKGNvdXBvbkNvZGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZW50cmllcyQgPSB0aGlzLmVudHJpZXMkLnBpcGUoXG4gICAgICBtYXAoKGVudHJpZXMpID0+IHtcbiAgICAgICAgcmV0dXJuIGVudHJpZXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmNvZGVGb3JBcHBseUFjdGlvbiAhPT0gY291cG9uQ29kZSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCI8Y3gtYXNtLWN1c3RvbWVyLTM2MC1wcm9tb3Rpb24tbGlzdGluZ1xuICBbaGVhZGVyVGV4dF09XCInYXNtQ3VzdG9tZXIzNjAuY3VzdG9tZXJDb3Vwb25zLmhlYWRlclRleHQnIHwgY3hUcmFuc2xhdGVcIlxuICBbZW1wdHlTdGF0ZVRleHRdPVwiXG4gICAgJ2FzbUN1c3RvbWVyMzYwLmN1c3RvbWVyQ291cG9ucy5lbXB0eURlc2NyaXB0aW9uJyB8IGN4VHJhbnNsYXRlXG4gIFwiXG4gIFthcHBseUJ1dHRvblRleHRdPVwiXG4gICAgJ2FzbUN1c3RvbWVyMzYwLmN1c3RvbWVyQ291cG9ucy5hcHBseUJ1dHRvblRleHQnIHwgY3hUcmFuc2xhdGVcbiAgXCJcbiAgW2FwcGxpZWRdPVwiJ2FzbUN1c3RvbWVyMzYwLmN1c3RvbWVyQ291cG9ucy5hcHBsaWVkJyB8IGN4VHJhbnNsYXRlXCJcbiAgW3JlbW92ZUJ1dHRvblRleHRdPVwiXG4gICAgJ2FzbUN1c3RvbWVyMzYwLmN1c3RvbWVyQ291cG9ucy5yZW1vdmVCdXR0b25UZXh0JyB8IGN4VHJhbnNsYXRlXG4gIFwiXG4gIFtlbnRyaWVzXT1cImVudHJpZXMkIHwgYXN5bmNcIlxuICBbc2hvd1JlbW92ZUJ1dHRvbl09XCJ0cnVlXCJcbiAgW3Nob3dBcHBseUJ1dHRvbl09XCJ0cnVlXCJcbiAgW2lzQ3VzdG9tZXJDb3Vwb25dPVwidHJ1ZVwiXG4gIChhcHBseSk9XCJjbGFpbUNvdXBvblRvQ3VzdG9tZXIoJGV2ZW50KVwiXG4gIChyZW1vdmUpPVwiZGlzY2xhaW1Db3Vwb25Ub0N1c3RvbWVyKCRldmVudClcIlxuICBbc2hvd0FsZXJ0XT1cInNob3dFcnJvckFsZXJ0JCB8IGFzeW5jXCJcbiAgW3Nob3dBbGVydEZvckFwcGx5QWN0aW9uXT1cInNob3dFcnJvckFsZXJ0Rm9yQXBwbHlBY3Rpb24kIHwgYXN5bmNcIlxuICAocmVtb3ZlQWxlcnQpPVwiY2xvc2VFcnJvckFsZXJ0KClcIlxuICAocmVtb3ZlQWxlcnRGb3JBcHBseUFjdGlvbik9XCJjbG9zZUVycm9yQWxlcnRGb3JBcHBseUFjdGlvbigpXCJcbj5cbiAgPG5nLWNvbnRhaW5lcj5cbiAgICA8ZGl2IGNsYXNzPVwiY3gtYXNtLWN1c3RvbWVyLTM2MC1wcm9tb3Rpb24tbGlzdGluZy10YWJzXCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzPVwiY3gtdGFiLWhlYWRlclwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidGhpcy5hY3RpdmVUYWIgPT09IDBcIlxuICAgICAgICBbdGV4dENvbnRlbnRdPVwiXG4gICAgICAgICAgJ2FzbUN1c3RvbWVyMzYwLmN1c3RvbWVyQ291cG9ucy5hdmFpbGFibGVUYWInIHwgY3hUcmFuc2xhdGVcbiAgICAgICAgXCJcbiAgICAgICAgKGNsaWNrKT1cInRoaXMuY2hhbmdlVGFiKHRydWUpOyBzZWFyY2hCb3gudmFsdWUgPSAnJ1wiXG4gICAgICA+PC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIGNsYXNzPVwiY3gtdGFiLWhlYWRlclwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidGhpcy5hY3RpdmVUYWIgPT09IDFcIlxuICAgICAgICBbdGV4dENvbnRlbnRdPVwiJ2FzbUN1c3RvbWVyMzYwLmN1c3RvbWVyQ291cG9ucy5zZW50VGFiJyB8IGN4VHJhbnNsYXRlXCJcbiAgICAgICAgKGNsaWNrKT1cInRoaXMuY2hhbmdlVGFiKGZhbHNlKTsgc2VhcmNoQm94LnZhbHVlID0gJydcIlxuICAgICAgPjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxoclxuICAgICAgY2xhc3M9XCJjeC1hc20tY3VzdG9tZXItMzYwLXByb21vdGlvbi1saXN0aW5nLXNlcGFyYXRvclwiXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIC8+XG4gICAgPGRpdiBjbGFzcz1cImN4LWFzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLWxpc3Rpbmctc2VhcmNoXCI+XG4gICAgICA8aW5wdXRcbiAgICAgICAgI3NlYXJjaEJveFxuICAgICAgICBjbGFzcz1cImN4LWFzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLWxpc3Rpbmctc2VhcmNoLWlucHV0XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJ7e1xuICAgICAgICAgICdhc21DdXN0b21lcjM2MC5jdXN0b21lckNvdXBvbnMuc2VhcmNoQm94JyB8IGN4VHJhbnNsYXRlXG4gICAgICAgIH19XCJcbiAgICAgICAgKGtleWRvd24uZW50ZXIpPVwidGhpcy5zZWFyY2hDdXN0b21lckNvdXBvbihzZWFyY2hCb3gudmFsdWUpXCJcbiAgICAgIC8+XG4gICAgICA8Y3gtaWNvblxuICAgICAgICBjbGFzcz1cImN4LWFzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLWxpc3Rpbmctc2VhcmNoLWljb24tcmVzZXRcIlxuICAgICAgICBbdHlwZV09XCJpY29uVHlwZXMuQ0xPU0VcIlxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgKGNsaWNrKT1cInRoaXMuc2VhcmNoQm94LnZhbHVlID0gJydcIlxuICAgICAgPjwvY3gtaWNvbj5cbiAgICAgIDxjeC1pY29uXG4gICAgICAgIGNsYXNzPVwiY3gtYXNtLWN1c3RvbWVyLTM2MC1wcm9tb3Rpb24tbGlzdGluZy1zZWFyY2gtaWNvbi1zZWFyY2hcIlxuICAgICAgICBbdHlwZV09XCJpY29uVHlwZXMuU0VBUkNIXCJcbiAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgIChjbGljayk9XCJ0aGlzLnNlYXJjaEN1c3RvbWVyQ291cG9uKHNlYXJjaEJveC52YWx1ZSlcIlxuICAgICAgPjwvY3gtaWNvbj5cbiAgICA8L2Rpdj5cbiAgPC9uZy1jb250YWluZXI+XG48L2N4LWFzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLWxpc3Rpbmc+XG4iXX0=