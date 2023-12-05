/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { AsmCustomer360Type, } from '@spartacus/asm/customer-360/root';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../asm-customer-360-section-context.model";
import * as i2 from "@spartacus/cart/base/root";
import * as i3 from "@spartacus/core";
import * as i4 from "@spartacus/asm/customer-360/root";
import * as i5 from "../../asm-customer-360-promotion-listing/asm-customer-360-promotion-listing.component";
import * as i6 from "@angular/common";
export class AsmCustomer360CouponComponent {
    constructor(context, cartVoucherService, userIdService, activeCartFacade, asmCustomer360Facade) {
        this.context = context;
        this.cartVoucherService = cartVoucherService;
        this.userIdService = userIdService;
        this.activeCartFacade = activeCartFacade;
        this.asmCustomer360Facade = asmCustomer360Facade;
        this.showErrorAlert$ = new BehaviorSubject(false);
        this.showErrorAlertForApplyAction$ = new BehaviorSubject(false);
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.userIdService.getUserId().subscribe((user) => {
            this.userId = user ?? '';
        }));
        this.subscription.add(this.activeCartFacade.requireLoadedCart().subscribe((cart) => {
            this.currentCartId = cart?.code;
        }));
        this.subscription.add(this.cartVoucherService.getAddVoucherResultError().subscribe((error) => {
            if (error) {
                this.refreshComponent();
                this.showErrorAlertForApplyAction$.next(true);
            }
        }));
        this.showErrorAlert$.next(false);
        this.showErrorAlertForApplyAction$.next(false);
        this.fetchCoupons();
    }
    fetchCoupons() {
        this.entries$ = this.context.data$.pipe(map((data) => {
            const entries = [];
            data.coupons.forEach((coupon) => {
                entries.push({
                    ...coupon,
                });
            });
            return entries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    closeErrorAlert() {
        this.showErrorAlert$.next(false);
    }
    closeErrorAlertForApplyAction() {
        this.showErrorAlertForApplyAction$.next(false);
    }
    refreshComponent() {
        this.entries$ = this.asmCustomer360Facade
            .get360Data([
            {
                requestData: { type: AsmCustomer360Type.COUPON_LIST },
            },
        ])
            .pipe(map((response) => {
            const couponList = response?.value?.find((item) => item.type === AsmCustomer360Type.COUPON_LIST);
            const newEntries = [];
            if (couponList.coupons) {
                couponList.coupons.forEach((coupon) => {
                    newEntries.push({
                        ...coupon,
                    });
                });
            }
            return newEntries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }));
    }
    applyCouponToCustomer(entry) {
        this.cartVoucherService.addVoucher(entry?.code, this.currentCartId);
        this.refreshActionButton(true, entry?.code);
    }
    removeCouponToCustomer(entry) {
        this.cartVoucherService.removeVoucher(entry?.code, this.currentCartId);
        this.refreshActionButton(false, entry?.code);
    }
    refreshActionButton(state, voucherCode) {
        this.entries$ = this.entries$.pipe(map((entries) => {
            entries.forEach((item) => {
                if (item.code === voucherCode) {
                    item.applied = state;
                }
            });
            return entries;
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmCustomer360CouponComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CouponComponent, deps: [{ token: i1.AsmCustomer360SectionContext }, { token: i2.CartVoucherFacade }, { token: i3.UserIdService }, { token: i2.ActiveCartFacade }, { token: i4.AsmCustomer360Facade }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360CouponComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360CouponComponent, selector: "cx-asm-customer-360-coupon", ngImport: i0, template: "<cx-asm-customer-360-promotion-listing\n  [emptyStateText]=\"'asmCustomer360.coupons.emptyDescription' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.coupons.headerText' | cxTranslate\"\n  [entries]=\"entries$ | async\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [showAlertForApplyAction]=\"showErrorAlertForApplyAction$ | async\"\n  (apply)=\"applyCouponToCustomer($event)\"\n  (remove)=\"removeCouponToCustomer($event)\"\n  (removeAlert)=\"closeErrorAlert()\"\n  (removeAlertForApplyAction)=\"closeErrorAlertForApplyAction()\"\n  [applyButtonText]=\"'asmCustomer360.coupons.applyButtonText' | cxTranslate\"\n  [applied]=\"'asmCustomer360.coupons.applied' | cxTranslate\"\n  [removeButtonText]=\"'asmCustomer360.coupons.removeButtonText' | cxTranslate\"\n  [showRemoveButton]=\"true\"\n  [showApplyButton]=\"true\"\n>\n</cx-asm-customer-360-promotion-listing>\n", dependencies: [{ kind: "component", type: i5.AsmCustomer360PromotionListingComponent, selector: "cx-asm-customer-360-promotion-listing", inputs: ["headerText", "emptyStateText", "applyButtonText", "applied", "removeButtonText", "entries", "showAlert", "showAlertForApplyAction", "showRemoveButton", "showApplyButton", "isCustomerCoupon"], outputs: ["apply", "remove", "removeAlert", "removeAlertForApplyAction"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }, { kind: "pipe", type: i3.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360CouponComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-coupon', template: "<cx-asm-customer-360-promotion-listing\n  [emptyStateText]=\"'asmCustomer360.coupons.emptyDescription' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.coupons.headerText' | cxTranslate\"\n  [entries]=\"entries$ | async\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [showAlertForApplyAction]=\"showErrorAlertForApplyAction$ | async\"\n  (apply)=\"applyCouponToCustomer($event)\"\n  (remove)=\"removeCouponToCustomer($event)\"\n  (removeAlert)=\"closeErrorAlert()\"\n  (removeAlertForApplyAction)=\"closeErrorAlertForApplyAction()\"\n  [applyButtonText]=\"'asmCustomer360.coupons.applyButtonText' | cxTranslate\"\n  [applied]=\"'asmCustomer360.coupons.applied' | cxTranslate\"\n  [removeButtonText]=\"'asmCustomer360.coupons.removeButtonText' | cxTranslate\"\n  [showRemoveButton]=\"true\"\n  [showApplyButton]=\"true\"\n>\n</cx-asm-customer-360-promotion-listing>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmCustomer360SectionContext }, { type: i2.CartVoucherFacade }, { type: i3.UserIdService }, { type: i2.ActiveCartFacade }, { type: i4.AsmCustomer360Facade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1jb3Vwb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvY29tcG9uZW50cy9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLWNvdXBvbi9hc20tY3VzdG9tZXItMzYwLWNvdXBvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtY291cG9uL2FzbS1jdXN0b21lci0zNjAtY291cG9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBSUwsa0JBQWtCLEdBQ25CLE1BQU0sa0NBQWtDLENBQUM7QUFFMUMsT0FBTyxFQUFFLGVBQWUsRUFBYyxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBU2pELE1BQU0sT0FBTyw2QkFBNkI7SUFReEMsWUFDWSxPQUErRCxFQUMvRCxrQkFBcUMsRUFDckMsYUFBNEIsRUFDNUIsZ0JBQWtDLEVBQ2xDLG9CQUEwQztRQUoxQyxZQUFPLEdBQVAsT0FBTyxDQUF3RDtRQUMvRCx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBQ3JDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQVp0RCxvQkFBZSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFD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QUFJLEtBQUssV0FBVyxFQUFFO29CQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztpQkFDdEI7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7MEhBeEhVLDZCQUE2Qjs4R0FBN0IsNkJBQTZCLGtFQzdCMUMsczJCQWlCQTsyRkRZYSw2QkFBNkI7a0JBTHpDLFNBQVM7c0NBQ1MsdUJBQXVCLENBQUMsTUFBTSxZQUNyQyw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBBc21DdXN0b21lcjM2MENvdXBvbixcbiAgQXNtQ3VzdG9tZXIzNjBDb3Vwb25MaXN0LFxuICBBc21DdXN0b21lcjM2MEZhY2FkZSxcbiAgQXNtQ3VzdG9tZXIzNjBUeXBlLFxufSBmcm9tICdAc3BhcnRhY3VzL2FzbS9jdXN0b21lci0zNjAvcm9vdCc7XG5pbXBvcnQgeyBVc2VySWRTZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydEZhY2FkZSwgQ2FydFZvdWNoZXJGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwU2VjdGlvbkNvbnRleHQgfSBmcm9tICcuLi9hc20tY3VzdG9tZXItMzYwLXNlY3Rpb24tY29udGV4dC5tb2RlbCc7XG5cbkBDb21wb25lbnQoe1xuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgc2VsZWN0b3I6ICdjeC1hc20tY3VzdG9tZXItMzYwLWNvdXBvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9hc20tY3VzdG9tZXItMzYwLWNvdXBvbi5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEFzbUN1c3RvbWVyMzYwQ291cG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBzaG93RXJyb3JBbGVydCQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgc2hvd0Vycm9yQWxlcnRGb3JBcHBseUFjdGlvbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgY3VycmVudENhcnRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB1c2VySWQ6IHN0cmluZztcbiAgZW50cmllcyQ6IE9ic2VydmFibGU8QXJyYXk8QXNtQ3VzdG9tZXIzNjBDb3Vwb24+PjtcbiAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBjb250ZXh0OiBBc21DdXN0b21lcjM2MFNlY3Rpb25Db250ZXh0PEFzbUN1c3RvbWVyMzYwQ291cG9uTGlzdD4sXG4gICAgcHJvdGVjdGVkIGNhcnRWb3VjaGVyU2VydmljZTogQ2FydFZvdWNoZXJGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHVzZXJJZFNlcnZpY2U6IFVzZXJJZFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRGYWNhZGU6IEFjdGl2ZUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIGFzbUN1c3RvbWVyMzYwRmFjYWRlOiBBc21DdXN0b21lcjM2MEZhY2FkZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy51c2VySWRTZXJ2aWNlLmdldFVzZXJJZCgpLnN1YnNjcmliZSgodXNlcikgPT4ge1xuICAgICAgICB0aGlzLnVzZXJJZCA9IHVzZXIgPz8gJyc7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5hY3RpdmVDYXJ0RmFjYWRlLnJlcXVpcmVMb2FkZWRDYXJ0KCkuc3Vic2NyaWJlKChjYXJ0KSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudENhcnRJZCA9IGNhcnQ/LmNvZGU7XG4gICAgICB9KVxuICAgICk7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5jYXJ0Vm91Y2hlclNlcnZpY2UuZ2V0QWRkVm91Y2hlclJlc3VsdEVycm9yKCkuc3Vic2NyaWJlKChlcnJvcikgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLnJlZnJlc2hDb21wb25lbnQoKTtcbiAgICAgICAgICB0aGlzLnNob3dFcnJvckFsZXJ0Rm9yQXBwbHlBY3Rpb24kLm5leHQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgICB0aGlzLnNob3dFcnJvckFsZXJ0JC5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLnNob3dFcnJvckFsZXJ0Rm9yQXBwbHlBY3Rpb24kLm5leHQoZmFsc2UpO1xuICAgIHRoaXMuZmV0Y2hDb3Vwb25zKCk7XG4gIH1cblxuICBwdWJsaWMgZmV0Y2hDb3Vwb25zKCk6IHZvaWQge1xuICAgIHRoaXMuZW50cmllcyQgPSB0aGlzLmNvbnRleHQuZGF0YSQucGlwZShcbiAgICAgIG1hcCgoZGF0YSkgPT4ge1xuICAgICAgICBjb25zdCBlbnRyaWVzOiBBcnJheTxBc21DdXN0b21lcjM2MENvdXBvbj4gPSBbXTtcbiAgICAgICAgZGF0YS5jb3Vwb25zLmZvckVhY2goKGNvdXBvbikgPT4ge1xuICAgICAgICAgIGVudHJpZXMucHVzaCh7XG4gICAgICAgICAgICAuLi5jb3Vwb24sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZW50cmllcztcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0Vycm9yQWxlcnQkLm5leHQodHJ1ZSk7XG4gICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2VFcnJvckFsZXJ0KCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0Vycm9yQWxlcnQkLm5leHQoZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlRXJyb3JBbGVydEZvckFwcGx5QWN0aW9uKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0Vycm9yQWxlcnRGb3JBcHBseUFjdGlvbiQubmV4dChmYWxzZSk7XG4gIH1cblxuICBwdWJsaWMgcmVmcmVzaENvbXBvbmVudCgpOiB2b2lkIHtcbiAgICB0aGlzLmVudHJpZXMkID0gdGhpcy5hc21DdXN0b21lcjM2MEZhY2FkZVxuICAgICAgLmdldDM2MERhdGEoW1xuICAgICAgICB7XG4gICAgICAgICAgcmVxdWVzdERhdGE6IHsgdHlwZTogQXNtQ3VzdG9tZXIzNjBUeXBlLkNPVVBPTl9MSVNUIH0sXG4gICAgICAgIH0sXG4gICAgICBdKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBjb25zdCBjb3Vwb25MaXN0ID0gcmVzcG9uc2U/LnZhbHVlPy5maW5kKFxuICAgICAgICAgICAgKGl0ZW0pID0+IGl0ZW0udHlwZSA9PT0gQXNtQ3VzdG9tZXIzNjBUeXBlLkNPVVBPTl9MSVNUXG4gICAgICAgICAgKSBhcyBBc21DdXN0b21lcjM2MENvdXBvbkxpc3Q7XG4gICAgICAgICAgY29uc3QgbmV3RW50cmllczogQXJyYXk8QXNtQ3VzdG9tZXIzNjBDb3Vwb24+ID0gW107XG4gICAgICAgICAgaWYgKGNvdXBvbkxpc3QuY291cG9ucykge1xuICAgICAgICAgICAgY291cG9uTGlzdC5jb3Vwb25zLmZvckVhY2goKGNvdXBvbikgPT4ge1xuICAgICAgICAgICAgICBuZXdFbnRyaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIC4uLmNvdXBvbixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ld0VudHJpZXM7XG4gICAgICAgIH0pLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnNob3dFcnJvckFsZXJ0JC5uZXh0KHRydWUpO1xuICAgICAgICAgIHJldHVybiBvZihbXSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG5cbiAgcHVibGljIGFwcGx5Q291cG9uVG9DdXN0b21lcihlbnRyeTogQXNtQ3VzdG9tZXIzNjBDb3Vwb24pOiB2b2lkIHtcbiAgICB0aGlzLmNhcnRWb3VjaGVyU2VydmljZS5hZGRWb3VjaGVyKGVudHJ5Py5jb2RlLCB0aGlzLmN1cnJlbnRDYXJ0SWQpO1xuICAgIHRoaXMucmVmcmVzaEFjdGlvbkJ1dHRvbih0cnVlLCBlbnRyeT8uY29kZSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQ291cG9uVG9DdXN0b21lcihlbnRyeTogQXNtQ3VzdG9tZXIzNjBDb3Vwb24pOiB2b2lkIHtcbiAgICB0aGlzLmNhcnRWb3VjaGVyU2VydmljZS5yZW1vdmVWb3VjaGVyKGVudHJ5Py5jb2RlLCB0aGlzLmN1cnJlbnRDYXJ0SWQpO1xuICAgIHRoaXMucmVmcmVzaEFjdGlvbkJ1dHRvbihmYWxzZSwgZW50cnk/LmNvZGUpO1xuICB9XG5cbiAgcHVibGljIHJlZnJlc2hBY3Rpb25CdXR0b24oc3RhdGU6IGJvb2xlYW4sIHZvdWNoZXJDb2RlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmVudHJpZXMkID0gdGhpcy5lbnRyaWVzJC5waXBlKFxuICAgICAgbWFwKChlbnRyaWVzKSA9PiB7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIGlmIChpdGVtLmNvZGUgPT09IHZvdWNoZXJDb2RlKSB7XG4gICAgICAgICAgICBpdGVtLmFwcGxpZWQgPSBzdGF0ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZW50cmllcztcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxjeC1hc20tY3VzdG9tZXItMzYwLXByb21vdGlvbi1saXN0aW5nXG4gIFtlbXB0eVN0YXRlVGV4dF09XCInYXNtQ3VzdG9tZXIzNjAuY291cG9ucy5lbXB0eURlc2NyaXB0aW9uJyB8IGN4VHJhbnNsYXRlXCJcbiAgW2hlYWRlclRleHRdPVwiJ2FzbUN1c3RvbWVyMzYwLmNvdXBvbnMuaGVhZGVyVGV4dCcgfCBjeFRyYW5zbGF0ZVwiXG4gIFtlbnRyaWVzXT1cImVudHJpZXMkIHwgYXN5bmNcIlxuICBbc2hvd0FsZXJ0XT1cInNob3dFcnJvckFsZXJ0JCB8IGFzeW5jXCJcbiAgW3Nob3dBbGVydEZvckFwcGx5QWN0aW9uXT1cInNob3dFcnJvckFsZXJ0Rm9yQXBwbHlBY3Rpb24kIHwgYXN5bmNcIlxuICAoYXBwbHkpPVwiYXBwbHlDb3Vwb25Ub0N1c3RvbWVyKCRldmVudClcIlxuICAocmVtb3ZlKT1cInJlbW92ZUNvdXBvblRvQ3VzdG9tZXIoJGV2ZW50KVwiXG4gIChyZW1vdmVBbGVydCk9XCJjbG9zZUVycm9yQWxlcnQoKVwiXG4gIChyZW1vdmVBbGVydEZvckFwcGx5QWN0aW9uKT1cImNsb3NlRXJyb3JBbGVydEZvckFwcGx5QWN0aW9uKClcIlxuICBbYXBwbHlCdXR0b25UZXh0XT1cIidhc21DdXN0b21lcjM2MC5jb3Vwb25zLmFwcGx5QnV0dG9uVGV4dCcgfCBjeFRyYW5zbGF0ZVwiXG4gIFthcHBsaWVkXT1cIidhc21DdXN0b21lcjM2MC5jb3Vwb25zLmFwcGxpZWQnIHwgY3hUcmFuc2xhdGVcIlxuICBbcmVtb3ZlQnV0dG9uVGV4dF09XCInYXNtQ3VzdG9tZXIzNjAuY291cG9ucy5yZW1vdmVCdXR0b25UZXh0JyB8IGN4VHJhbnNsYXRlXCJcbiAgW3Nob3dSZW1vdmVCdXR0b25dPVwidHJ1ZVwiXG4gIFtzaG93QXBwbHlCdXR0b25dPVwidHJ1ZVwiXG4+XG48L2N4LWFzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLWxpc3Rpbmc+XG4iXX0=