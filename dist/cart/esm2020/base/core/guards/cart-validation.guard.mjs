/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { CartValidationStatusCode, } from '@spartacus/cart/base/root';
import { GlobalMessageType, } from '@spartacus/core';
import { of } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/root";
import * as i2 from "@spartacus/core";
import * as i3 from "@angular/router";
import * as i4 from "../services/cart-validation-state.service";
import * as i5 from "../services/cart-config.service";
export class CartValidationGuard {
    constructor(cartValidationService, semanticPathService, router, globalMessageService, activeCartService, cartValidationStateService, cartConfigService) {
        this.cartValidationService = cartValidationService;
        this.semanticPathService = semanticPathService;
        this.router = router;
        this.globalMessageService = globalMessageService;
        this.activeCartService = activeCartService;
        this.cartValidationStateService = cartValidationStateService;
        this.cartConfigService = cartConfigService;
        this.GLOBAL_MESSAGE_TIMEOUT = 10000;
    }
    canActivate() {
        return !this.cartConfigService.isCartValidationEnabled()
            ? of(true)
            : this.cartValidationService.validateCart().pipe(withLatestFrom(this.activeCartService.getEntries()), map(([cartModificationList, cartEntries]) => {
                this.cartValidationStateService.updateValidationResultAndRoutingId(cartModificationList.cartModifications ?? []);
                if (cartModificationList.cartModifications !== undefined &&
                    cartModificationList.cartModifications.length !== 0) {
                    let validationResultMessage;
                    const modification = cartModificationList.cartModifications[0];
                    if (cartEntries.length === 1 &&
                        cartEntries[0].product?.code ===
                            modification.entry?.product?.code &&
                        modification.statusCode === CartValidationStatusCode.NO_STOCK) {
                        validationResultMessage = {
                            key: 'validation.cartEntryRemoved',
                            params: {
                                name: modification.entry?.product?.name,
                            },
                        };
                    }
                    else {
                        validationResultMessage = {
                            key: 'validation.cartEntriesChangeDuringCheckout',
                        };
                    }
                    this.globalMessageService.add(validationResultMessage, GlobalMessageType.MSG_TYPE_ERROR, this.GLOBAL_MESSAGE_TIMEOUT);
                    this.activeCartService.reloadActiveCart();
                    return this.router.parseUrl(this.semanticPathService.get('cart') ?? '');
                }
                return true;
            }));
    }
}
CartValidationGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationGuard, deps: [{ token: i1.CartValidationFacade }, { token: i2.SemanticPathService }, { token: i3.Router }, { token: i2.GlobalMessageService }, { token: i1.ActiveCartFacade }, { token: i4.CartValidationStateService }, { token: i5.CartConfigService }], target: i0.ɵɵFactoryTarget.Injectable });
CartValidationGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationGuard, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartValidationGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.CartValidationFacade }, { type: i2.SemanticPathService }, { type: i3.Router }, { type: i2.GlobalMessageService }, { type: i1.ActiveCartFacade }, { type: i4.CartValidationStateService }, { type: i5.CartConfigService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC12YWxpZGF0aW9uLmd1YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb3JlL2d1YXJkcy9jYXJ0LXZhbGlkYXRpb24uZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUdMLHdCQUF3QixHQUN6QixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFFTCxpQkFBaUIsR0FFbEIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7QUFPckQsTUFBTSxPQUFPLG1CQUFtQjtJQUM5QixZQUNZLHFCQUEyQyxFQUMzQyxtQkFBd0MsRUFDeEMsTUFBYyxFQUNkLG9CQUEwQyxFQUMxQyxpQkFBbUMsRUFDbkMsMEJBQXNELEVBQ3RELGlCQUFvQztRQU5wQywwQkFBcUIsR0FBckIscUJBQXFCLENBQXNCO1FBQzNDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFDeEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBc0I7UUFDMUMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQywrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQ3RELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFHdEMsMkJBQXNCLEdBQUcsS0FBSyxDQUFDO0lBRnRDLENBQUM7SUFJSixXQUFXO1FBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx1QkFBdUIsRUFBRTtZQUN0RCxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztZQUNWLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUM1QyxjQUFjLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQ25ELEdBQUcsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGtDQUFrQyxDQUNoRSxvQkFBb0IsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQzdDLENBQUM7Z0JBRUYsSUFDRSxvQkFBb0IsQ0FBQyxpQkFBaUIsS0FBSyxTQUFTO29CQUNwRCxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUNuRDtvQkFDQSxJQUFJLHVCQUF1QixDQUFDO29CQUM1QixNQUFNLFlBQVksR0FBRyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFL0QsSUFDRSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUM7d0JBQ3hCLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsSUFBSTs0QkFDMUIsWUFBWSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSTt3QkFDbkMsWUFBWSxDQUFDLFVBQVUsS0FBSyx3QkFBd0IsQ0FBQyxRQUFRLEVBQzdEO3dCQUNBLHVCQUF1QixHQUFHOzRCQUN4QixHQUFHLEVBQUUsNkJBQTZCOzRCQUNsQyxNQUFNLEVBQUU7Z0NBQ04sSUFBSSxFQUFFLFlBQVksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUk7NkJBQ3hDO3lCQUNGLENBQUM7cUJBQ0g7eUJBQU07d0JBQ0wsdUJBQXVCLEdBQUc7NEJBQ3hCLEdBQUcsRUFBRSw0Q0FBNEM7eUJBQ2xELENBQUM7cUJBQ0g7b0JBRUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FDM0IsdUJBQXVCLEVBQ3ZCLGlCQUFpQixDQUFDLGNBQWMsRUFDaEMsSUFBSSxDQUFDLHNCQUFzQixDQUM1QixDQUFDO29CQUNGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO29CQUMxQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUN6QixJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FDM0MsQ0FBQztpQkFDSDtnQkFFRCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDUixDQUFDOztnSEE5RFUsbUJBQW1CO29IQUFuQixtQkFBbUIsY0FGbEIsTUFBTTsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIFJvdXRlciwgVXJsVHJlZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBY3RpdmVDYXJ0RmFjYWRlLFxuICBDYXJ0VmFsaWRhdGlvbkZhY2FkZSxcbiAgQ2FydFZhbGlkYXRpb25TdGF0dXNDb2RlLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7XG4gIEdsb2JhbE1lc3NhZ2VTZXJ2aWNlLFxuICBHbG9iYWxNZXNzYWdlVHlwZSxcbiAgU2VtYW50aWNQYXRoU2VydmljZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHdpdGhMYXRlc3RGcm9tIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQ2FydENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9jYXJ0LWNvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IENhcnRWYWxpZGF0aW9uU3RhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY2FydC12YWxpZGF0aW9uLXN0YXRlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydFZhbGlkYXRpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNhcnRWYWxpZGF0aW9uU2VydmljZTogQ2FydFZhbGlkYXRpb25GYWNhZGUsXG4gICAgcHJvdGVjdGVkIHNlbWFudGljUGF0aFNlcnZpY2U6IFNlbWFudGljUGF0aFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHJvdXRlcjogUm91dGVyLFxuICAgIHByb3RlY3RlZCBnbG9iYWxNZXNzYWdlU2VydmljZTogR2xvYmFsTWVzc2FnZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGFjdGl2ZUNhcnRTZXJ2aWNlOiBBY3RpdmVDYXJ0RmFjYWRlLFxuICAgIHByb3RlY3RlZCBjYXJ0VmFsaWRhdGlvblN0YXRlU2VydmljZTogQ2FydFZhbGlkYXRpb25TdGF0ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGNhcnRDb25maWdTZXJ2aWNlOiBDYXJ0Q29uZmlnU2VydmljZVxuICApIHt9XG5cbiAgcHJvdGVjdGVkIEdMT0JBTF9NRVNTQUdFX1RJTUVPVVQgPSAxMDAwMDtcblxuICBjYW5BY3RpdmF0ZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4gfCBVcmxUcmVlPiB7XG4gICAgcmV0dXJuICF0aGlzLmNhcnRDb25maWdTZXJ2aWNlLmlzQ2FydFZhbGlkYXRpb25FbmFibGVkKClcbiAgICAgID8gb2YodHJ1ZSlcbiAgICAgIDogdGhpcy5jYXJ0VmFsaWRhdGlvblNlcnZpY2UudmFsaWRhdGVDYXJ0KCkucGlwZShcbiAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLmFjdGl2ZUNhcnRTZXJ2aWNlLmdldEVudHJpZXMoKSksXG4gICAgICAgICAgbWFwKChbY2FydE1vZGlmaWNhdGlvbkxpc3QsIGNhcnRFbnRyaWVzXSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jYXJ0VmFsaWRhdGlvblN0YXRlU2VydmljZS51cGRhdGVWYWxpZGF0aW9uUmVzdWx0QW5kUm91dGluZ0lkKFxuICAgICAgICAgICAgICBjYXJ0TW9kaWZpY2F0aW9uTGlzdC5jYXJ0TW9kaWZpY2F0aW9ucyA/PyBbXVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBjYXJ0TW9kaWZpY2F0aW9uTGlzdC5jYXJ0TW9kaWZpY2F0aW9ucyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgICAgICAgIGNhcnRNb2RpZmljYXRpb25MaXN0LmNhcnRNb2RpZmljYXRpb25zLmxlbmd0aCAhPT0gMFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGxldCB2YWxpZGF0aW9uUmVzdWx0TWVzc2FnZTtcbiAgICAgICAgICAgICAgY29uc3QgbW9kaWZpY2F0aW9uID0gY2FydE1vZGlmaWNhdGlvbkxpc3QuY2FydE1vZGlmaWNhdGlvbnNbMF07XG5cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGNhcnRFbnRyaWVzLmxlbmd0aCA9PT0gMSAmJlxuICAgICAgICAgICAgICAgIGNhcnRFbnRyaWVzWzBdLnByb2R1Y3Q/LmNvZGUgPT09XG4gICAgICAgICAgICAgICAgICBtb2RpZmljYXRpb24uZW50cnk/LnByb2R1Y3Q/LmNvZGUgJiZcbiAgICAgICAgICAgICAgICBtb2RpZmljYXRpb24uc3RhdHVzQ29kZSA9PT0gQ2FydFZhbGlkYXRpb25TdGF0dXNDb2RlLk5PX1NUT0NLXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25SZXN1bHRNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgICAga2V5OiAndmFsaWRhdGlvbi5jYXJ0RW50cnlSZW1vdmVkJyxcbiAgICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBtb2RpZmljYXRpb24uZW50cnk/LnByb2R1Y3Q/Lm5hbWUsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsaWRhdGlvblJlc3VsdE1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICBrZXk6ICd2YWxpZGF0aW9uLmNhcnRFbnRyaWVzQ2hhbmdlRHVyaW5nQ2hlY2tvdXQnLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLmdsb2JhbE1lc3NhZ2VTZXJ2aWNlLmFkZChcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVzdWx0TWVzc2FnZSxcbiAgICAgICAgICAgICAgICBHbG9iYWxNZXNzYWdlVHlwZS5NU0dfVFlQRV9FUlJPUixcbiAgICAgICAgICAgICAgICB0aGlzLkdMT0JBTF9NRVNTQUdFX1RJTUVPVVRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgdGhpcy5hY3RpdmVDYXJ0U2VydmljZS5yZWxvYWRBY3RpdmVDYXJ0KCk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlci5wYXJzZVVybChcbiAgICAgICAgICAgICAgICB0aGlzLnNlbWFudGljUGF0aFNlcnZpY2UuZ2V0KCdjYXJ0JykgPz8gJydcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgfVxufVxuIl19