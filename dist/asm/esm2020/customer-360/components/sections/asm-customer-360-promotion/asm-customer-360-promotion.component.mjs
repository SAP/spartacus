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
import * as i2 from "@spartacus/asm/customer-360/root";
import * as i3 from "@spartacus/cart/base/root";
import * as i4 from "../../asm-customer-360-promotion-listing/asm-customer-360-promotion-listing.component";
import * as i5 from "@angular/common";
import * as i6 from "@spartacus/core";
export class AsmCustomer360PromotionComponent {
    constructor(context, asmCustomer360Facade, activeCartFacade) {
        this.context = context;
        this.asmCustomer360Facade = asmCustomer360Facade;
        this.activeCartFacade = activeCartFacade;
        this.showErrorAlert$ = new BehaviorSubject(false);
        this.entries$ = new BehaviorSubject([]);
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.showErrorAlert$.next(false);
        this.fetchPromotions();
        this.subscription.add(this.activeCartFacade.getActiveCartId().subscribe((cartId) => {
            if (cartId && this.entries$.value.length === 0) {
                this.refreshPromotions();
            }
        }));
    }
    refreshPromotions() {
        this.asmCustomer360Facade
            .get360Data([
            {
                requestData: { type: AsmCustomer360Type.PROMOTION_LIST },
            },
        ])
            .pipe(map((response) => {
            const promotionList = response?.value?.find((item) => item.type === AsmCustomer360Type.PROMOTION_LIST);
            const newEntries = [];
            if (promotionList.promotions) {
                promotionList.promotions.forEach((promotion) => {
                    newEntries.push({
                        applied: promotion.applied,
                        code: promotion.name || '',
                        name: promotion.message,
                    });
                });
            }
            return newEntries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }))
            .subscribe((newEntries) => {
            this.entries$.next(newEntries);
        });
    }
    fetchPromotions() {
        this.context.data$
            .pipe(map((data) => {
            const entries = [];
            data.promotions.forEach((promotion) => {
                entries.push({
                    applied: promotion.applied,
                    code: promotion.name || '',
                    name: promotion.message,
                });
            });
            return entries;
        }), catchError(() => {
            this.showErrorAlert$.next(true);
            return of([]);
        }))
            .subscribe((newEntries) => {
            this.entries$.next(newEntries);
        });
    }
    closeErrorAlert() {
        this.showErrorAlert$.next(false);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
AsmCustomer360PromotionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionComponent, deps: [{ token: i1.AsmCustomer360SectionContext }, { token: i2.AsmCustomer360Facade }, { token: i3.ActiveCartFacade }], target: i0.ɵɵFactoryTarget.Component });
AsmCustomer360PromotionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: AsmCustomer360PromotionComponent, selector: "cx-asm-customer-360-promotion", ngImport: i0, template: "<cx-asm-customer-360-promotion-listing\n  [emptyStateText]=\"'asmCustomer360.promotions.emptyDescription' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.promotions.headerText' | cxTranslate\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [entries]=\"entries$ | async\"\n  [applied]=\"'asmCustomer360.promotions.applied' | cxTranslate\"\n  [showRemoveButton]=\"false\"\n  [showApplyButton]=\"false\"\n>\n</cx-asm-customer-360-promotion-listing>\n", dependencies: [{ kind: "component", type: i4.AsmCustomer360PromotionListingComponent, selector: "cx-asm-customer-360-promotion-listing", inputs: ["headerText", "emptyStateText", "applyButtonText", "applied", "removeButtonText", "entries", "showAlert", "showAlertForApplyAction", "showRemoveButton", "showApplyButton", "isCustomerCoupon"], outputs: ["apply", "remove", "removeAlert", "removeAlertForApplyAction"] }, { kind: "pipe", type: i5.AsyncPipe, name: "async" }, { kind: "pipe", type: i6.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360PromotionComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'cx-asm-customer-360-promotion', template: "<cx-asm-customer-360-promotion-listing\n  [emptyStateText]=\"'asmCustomer360.promotions.emptyDescription' | cxTranslate\"\n  [headerText]=\"'asmCustomer360.promotions.headerText' | cxTranslate\"\n  [showAlert]=\"showErrorAlert$ | async\"\n  [entries]=\"entries$ | async\"\n  [applied]=\"'asmCustomer360.promotions.applied' | cxTranslate\"\n  [showRemoveButton]=\"false\"\n  [showApplyButton]=\"false\"\n>\n</cx-asm-customer-360-promotion-listing>\n" }]
        }], ctorParameters: function () { return [{ type: i1.AsmCustomer360SectionContext }, { type: i2.AsmCustomer360Facade }, { type: i3.ActiveCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1wcm9tb3Rpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvY29tcG9uZW50cy9zZWN0aW9ucy9hc20tY3VzdG9tZXItMzYwLXByb21vdGlvbi9hc20tY3VzdG9tZXItMzYwLXByb21vdGlvbi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzL3NlY3Rpb25zL2FzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uL2FzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBR0wsa0JBQWtCLEdBRW5CLE1BQU0sa0NBQWtDLENBQUM7QUFDMUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBU2pELE1BQU0sT0FBTyxnQ0FBZ0M7SUFNM0MsWUFDWSxPQUFrRSxFQUNsRSxvQkFBMEMsRUFDMUMsZ0JBQWtDO1FBRmxDLFlBQU8sR0FBUCxPQUFPLENBQTJEO1FBQ2xFLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQVI5QyxvQkFBZSxHQUFHLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQyxDQUFDO1FBQ3RELGFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBaUMsRUFBRSxDQUFDLENBQUM7UUFDbkUsaUJBQVksR0FBRyxJQUFJ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QyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDbEMsQ0FBQzs7NkhBeEZVLGdDQUFnQztpSEFBaEMsZ0NBQWdDLHFFQzVCN0Msa2NBVUE7MkZEa0JhLGdDQUFnQztrQkFMNUMsU0FBUztzQ0FDUyx1QkFBdUIsQ0FBQyxNQUFNLFlBQ3JDLCtCQUErQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEFzbUN1c3RvbWVyMzYwRmFjYWRlLFxuICBBc21DdXN0b21lcjM2MFByb21vdGlvbkxpc3QsXG4gIEFzbUN1c3RvbWVyMzYwVHlwZSxcbiAgQXNtQ3VzdG9tZXIzNjBQcm9tb3Rpb24sXG59IGZyb20gJ0BzcGFydGFjdXMvYXNtL2N1c3RvbWVyLTM2MC9yb290JztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgU3Vic2NyaXB0aW9uLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXNtQ3VzdG9tZXIzNjBTZWN0aW9uQ29udGV4dCB9IGZyb20gJy4uL2FzbS1jdXN0b21lci0zNjAtc2VjdGlvbi1jb250ZXh0Lm1vZGVsJztcbmltcG9ydCB7IEFjdGl2ZUNhcnRGYWNhZGUgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcblxuQENvbXBvbmVudCh7XG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBzZWxlY3RvcjogJ2N4LWFzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgQXNtQ3VzdG9tZXIzNjBQcm9tb3Rpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHNob3dFcnJvckFsZXJ0JCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuICBlbnRyaWVzJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QXJyYXk8QXNtQ3VzdG9tZXIzNjBQcm9tb3Rpb24+PihbXSk7XG4gIHN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgdXNlcklkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbnRleHQ6IEFzbUN1c3RvbWVyMzYwU2VjdGlvbkNvbnRleHQ8QXNtQ3VzdG9tZXIzNjBQcm9tb3Rpb25MaXN0PixcbiAgICBwcm90ZWN0ZWQgYXNtQ3VzdG9tZXIzNjBGYWNhZGU6IEFzbUN1c3RvbWVyMzYwRmFjYWRlLFxuICAgIHByb3RlY3RlZCBhY3RpdmVDYXJ0RmFjYWRlOiBBY3RpdmVDYXJ0RmFjYWRlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dFcnJvckFsZXJ0JC5uZXh0KGZhbHNlKTtcbiAgICB0aGlzLmZldGNoUHJvbW90aW9ucygpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuYWN0aXZlQ2FydEZhY2FkZS5nZXRBY3RpdmVDYXJ0SWQoKS5zdWJzY3JpYmUoKGNhcnRJZCkgPT4ge1xuICAgICAgICBpZiAoY2FydElkICYmIHRoaXMuZW50cmllcyQudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5yZWZyZXNoUHJvbW90aW9ucygpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmVmcmVzaFByb21vdGlvbnMoKTogdm9pZCB7XG4gICAgdGhpcy5hc21DdXN0b21lcjM2MEZhY2FkZVxuICAgICAgLmdldDM2MERhdGEoW1xuICAgICAgICB7XG4gICAgICAgICAgcmVxdWVzdERhdGE6IHsgdHlwZTogQXNtQ3VzdG9tZXIzNjBUeXBlLlBST01PVElPTl9MSVNUIH0sXG4gICAgICAgIH0sXG4gICAgICBdKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBjb25zdCBwcm9tb3Rpb25MaXN0ID0gcmVzcG9uc2U/LnZhbHVlPy5maW5kKFxuICAgICAgICAgICAgKGl0ZW0pID0+IGl0ZW0udHlwZSA9PT0gQXNtQ3VzdG9tZXIzNjBUeXBlLlBST01PVElPTl9MSVNUXG4gICAgICAgICAgKSBhcyBBc21DdXN0b21lcjM2MFByb21vdGlvbkxpc3Q7XG4gICAgICAgICAgY29uc3QgbmV3RW50cmllczogQXJyYXk8QXNtQ3VzdG9tZXIzNjBQcm9tb3Rpb24+ID0gW107XG4gICAgICAgICAgaWYgKHByb21vdGlvbkxpc3QucHJvbW90aW9ucykge1xuICAgICAgICAgICAgcHJvbW90aW9uTGlzdC5wcm9tb3Rpb25zLmZvckVhY2goKHByb21vdGlvbikgPT4ge1xuICAgICAgICAgICAgICBuZXdFbnRyaWVzLnB1c2goe1xuICAgICAgICAgICAgICAgIGFwcGxpZWQ6IHByb21vdGlvbi5hcHBsaWVkLFxuICAgICAgICAgICAgICAgIGNvZGU6IHByb21vdGlvbi5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICAgIG5hbWU6IHByb21vdGlvbi5tZXNzYWdlLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3RW50cmllcztcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc2hvd0Vycm9yQWxlcnQkLm5leHQodHJ1ZSk7XG4gICAgICAgICAgcmV0dXJuIG9mKFtdKTtcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKG5ld0VudHJpZXMpID0+IHtcbiAgICAgICAgdGhpcy5lbnRyaWVzJC5uZXh0KG5ld0VudHJpZXMpO1xuICAgICAgfSk7XG4gIH1cblxuICBmZXRjaFByb21vdGlvbnMoKSB7XG4gICAgdGhpcy5jb250ZXh0LmRhdGEkXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChkYXRhKSA9PiB7XG4gICAgICAgICAgY29uc3QgZW50cmllczogQXJyYXk8QXNtQ3VzdG9tZXIzNjBQcm9tb3Rpb24+ID0gW107XG4gICAgICAgICAgZGF0YS5wcm9tb3Rpb25zLmZvckVhY2goKHByb21vdGlvbikgPT4ge1xuICAgICAgICAgICAgZW50cmllcy5wdXNoKHtcbiAgICAgICAgICAgICAgYXBwbGllZDogcHJvbW90aW9uLmFwcGxpZWQsXG4gICAgICAgICAgICAgIGNvZGU6IHByb21vdGlvbi5uYW1lIHx8ICcnLFxuICAgICAgICAgICAgICBuYW1lOiBwcm9tb3Rpb24ubWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBlbnRyaWVzO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zaG93RXJyb3JBbGVydCQubmV4dCh0cnVlKTtcbiAgICAgICAgICByZXR1cm4gb2YoW10pO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgobmV3RW50cmllcykgPT4ge1xuICAgICAgICB0aGlzLmVudHJpZXMkLm5leHQobmV3RW50cmllcyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGNsb3NlRXJyb3JBbGVydCgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dFcnJvckFsZXJ0JC5uZXh0KGZhbHNlKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiIsIjxjeC1hc20tY3VzdG9tZXItMzYwLXByb21vdGlvbi1saXN0aW5nXG4gIFtlbXB0eVN0YXRlVGV4dF09XCInYXNtQ3VzdG9tZXIzNjAucHJvbW90aW9ucy5lbXB0eURlc2NyaXB0aW9uJyB8IGN4VHJhbnNsYXRlXCJcbiAgW2hlYWRlclRleHRdPVwiJ2FzbUN1c3RvbWVyMzYwLnByb21vdGlvbnMuaGVhZGVyVGV4dCcgfCBjeFRyYW5zbGF0ZVwiXG4gIFtzaG93QWxlcnRdPVwic2hvd0Vycm9yQWxlcnQkIHwgYXN5bmNcIlxuICBbZW50cmllc109XCJlbnRyaWVzJCB8IGFzeW5jXCJcbiAgW2FwcGxpZWRdPVwiJ2FzbUN1c3RvbWVyMzYwLnByb21vdGlvbnMuYXBwbGllZCcgfCBjeFRyYW5zbGF0ZVwiXG4gIFtzaG93UmVtb3ZlQnV0dG9uXT1cImZhbHNlXCJcbiAgW3Nob3dBcHBseUJ1dHRvbl09XCJmYWxzZVwiXG4+XG48L2N4LWFzbS1jdXN0b21lci0zNjAtcHJvbW90aW9uLWxpc3Rpbmc+XG4iXX0=