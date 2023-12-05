/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { OrderEntriesSource, ProductImportStatus, } from '@spartacus/cart/base/root';
import { queueScheduler } from 'rxjs';
import { debounce, every, filter, map, observeOn, switchMap, take, tap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/cart/base/core";
import * as i2 from "@spartacus/core";
import * as i3 from "@spartacus/cart/base/root";
import * as i4 from "@spartacus/cart/saved-cart/root";
export class NewSavedCartOrderEntriesContext {
    constructor(importInfoService, userIdService, multiCartService, savedCartService) {
        this.importInfoService = importInfoService;
        this.userIdService = userIdService;
        this.multiCartService = multiCartService;
        this.savedCartService = savedCartService;
        this.type = OrderEntriesSource.NEW_SAVED_CART;
    }
    addEntries(products, savedCartInfo) {
        return this.add(products, savedCartInfo).pipe(tap((cartId) => {
            this.importInfoService
                .getResults(cartId)
                .pipe(take(products.length), every((productInfo) => productInfo.statusCode ===
                ProductImportStatus.UNKNOWN_IDENTIFIER ||
                productInfo.statusCode === ProductImportStatus.UNKNOWN_ERROR))
                .subscribe((isInvalid) => {
                if (isInvalid) {
                    this.savedCartService.deleteSavedCart(cartId);
                }
            });
        }), switchMap((cartId) => this.importInfoService.getResults(cartId)), take(products.length));
    }
    add(products, savedCartInfo) {
        return this.userIdService.takeUserId().pipe(switchMap((userId) => this.multiCartService
            .createCart({
            userId,
            extraData: { active: false },
        })
            .pipe(map((cart) => cart.code), tap((cartId) => {
            this.savedCartService.saveCart({
                cartId,
                saveCartName: savedCartInfo?.name,
                saveCartDescription: savedCartInfo?.description,
            });
            this.savedCartService.loadSavedCarts();
        }), observeOn(queueScheduler), debounce(() => this.savedCartService
            .getSaveCartProcessLoading()
            .pipe(filter((loading) => !loading))), tap((cartId) => this.multiCartService.addEntries(userId, cartId, products)))));
    }
}
NewSavedCartOrderEntriesContext.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NewSavedCartOrderEntriesContext, deps: [{ token: i1.ProductImportInfoService }, { token: i2.UserIdService }, { token: i3.MultiCartFacade }, { token: i4.SavedCartFacade }], target: i0.ɵɵFactoryTarget.Injectable });
NewSavedCartOrderEntriesContext.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NewSavedCartOrderEntriesContext, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: NewSavedCartOrderEntriesContext, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.ProductImportInfoService }, { type: i2.UserIdService }, { type: i3.MultiCartFacade }, { type: i4.SavedCartFacade }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3LXNhdmVkLWNhcnQtb3JkZXItZW50cmllcy5jb250ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvc2F2ZWQtY2FydC9jb21wb25lbnRzL3BhZ2UtY29udGV4dC9zYXZlZC1jYXJ0cy1wYWdlL25ldy1zYXZlZC1jYXJ0LW9yZGVyLWVudHJpZXMuY29udGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBSUwsa0JBQWtCLEVBR2xCLG1CQUFtQixHQUNwQixNQUFNLDJCQUEyQixDQUFDO0FBR25DLE9BQU8sRUFBYyxjQUFjLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDbEQsT0FBTyxFQUNMLFFBQVEsRUFDUixLQUFLLEVBQ0wsTUFBTSxFQUNOLEdBQUcsRUFDSCxTQUFTLEVBQ1QsU0FBUyxFQUNULElBQUksRUFDSixHQUFHLEdBQ0osTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBS3hCLE1BQU0sT0FBTywrQkFBK0I7SUFHMUMsWUFDWSxpQkFBMkMsRUFDM0MsYUFBNEIsRUFDNUIsZ0JBQWlDLEVBQ2pDLGdCQUFpQztRQUhqQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTBCO1FBQzNDLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQU5wQyxTQUFJLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxDQUFDO0lBTy9DLENBQUM7SUFFSixVQUFVLENBQ1IsUUFBdUIsRUFDdkIsYUFBcUQ7UUFFckQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQzNDLEdBQUcsQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxpQkFBaUI7aUJBQ25CLFVBQVUsQ0FBQyxNQUFNLENBQUM7aUJBQ2xCLElBQUksQ0FDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUNyQixLQUFLLENBQ0gsQ0FBQyxXQUE4QixFQUFFLEVBQUUsQ0FDakMsV0FBVyxDQUFDLFVBQVU7Z0JBQ3BCLG1CQUFtQixDQUFDLGtCQUFrQjtnQkFDeEMsV0FBVyxDQUFDLFVBQVUsS0FBSyxtQkFBbUIsQ0FBQyxhQUFhLENBQy9ELENBQ0Y7aUJBQ0EsU0FBUyxDQUFDLENBQUMsU0FBa0IsRUFBRSxFQUFFO2dCQUNoQyxJQUFJLFNBQVMsRUFBRTtvQkFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUMvQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLEVBQ0YsU0FBUyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQ3hFLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQ3RCLENBQUM7SUFDSixDQUFDO0lBRVMsR0FBRyxDQUNYLFFBQXVCLEVBQ3ZCLGFBQXFEO1FBRXJELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQ3pDLFNBQVMsQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQzNCLElBQUksQ0FBQyxnQkFBZ0I7YUFDbEIsVUFBVSxDQUFDO1lBQ1YsTUFBTTtZQUNOLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7U0FDN0IsQ0FBQzthQUNELElBQUksQ0FDSCxHQUFHLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFjLENBQUMsRUFDeEMsR0FBRyxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztnQkFDN0IsTUFBTTtnQkFDTixZQUFZLEVBQUUsYUFBYSxFQUFFLElBQUk7Z0JBQ2pDLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxXQUFXO2FBQ2hELENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxDQUFDLENBQUMsRUFDRixTQUFTLENBQUMsY0FBYyxDQUFDLEVBQ3pCLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FDWixJQUFJLENBQUMsZ0JBQWdCO2FBQ2xCLHlCQUF5QixFQUFFO2FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FDdkMsRUFDRCxHQUFHLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUNyQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQzNELENBQ0YsQ0FDSixDQUNGLENBQUM7SUFDSixDQUFDOzs0SEF2RVUsK0JBQStCO2dJQUEvQiwrQkFBK0IsY0FGOUIsTUFBTTsyRkFFUCwrQkFBK0I7a0JBSDNDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUHJvZHVjdEltcG9ydEluZm9TZXJ2aWNlIH0gZnJvbSAnQHNwYXJ0YWN1cy9jYXJ0L2Jhc2UvY29yZSc7XG5pbXBvcnQge1xuICBBZGRPcmRlckVudHJpZXNDb250ZXh0LFxuICBDYXJ0LFxuICBNdWx0aUNhcnRGYWNhZGUsXG4gIE9yZGVyRW50cmllc1NvdXJjZSxcbiAgUHJvZHVjdERhdGEsXG4gIFByb2R1Y3RJbXBvcnRJbmZvLFxuICBQcm9kdWN0SW1wb3J0U3RhdHVzLFxufSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IFNhdmVkQ2FydEZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9zYXZlZC1jYXJ0L3Jvb3QnO1xuaW1wb3J0IHsgVXNlcklkU2VydmljZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBxdWV1ZVNjaGVkdWxlciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGVib3VuY2UsXG4gIGV2ZXJ5LFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgb2JzZXJ2ZU9uLFxuICBzd2l0Y2hNYXAsXG4gIHRha2UsXG4gIHRhcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTmV3U2F2ZWRDYXJ0T3JkZXJFbnRyaWVzQ29udGV4dCBpbXBsZW1lbnRzIEFkZE9yZGVyRW50cmllc0NvbnRleHQge1xuICByZWFkb25seSB0eXBlID0gT3JkZXJFbnRyaWVzU291cmNlLk5FV19TQVZFRF9DQVJUO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBpbXBvcnRJbmZvU2VydmljZTogUHJvZHVjdEltcG9ydEluZm9TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCB1c2VySWRTZXJ2aWNlOiBVc2VySWRTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBtdWx0aUNhcnRTZXJ2aWNlOiBNdWx0aUNhcnRGYWNhZGUsXG4gICAgcHJvdGVjdGVkIHNhdmVkQ2FydFNlcnZpY2U6IFNhdmVkQ2FydEZhY2FkZVxuICApIHt9XG5cbiAgYWRkRW50cmllcyhcbiAgICBwcm9kdWN0czogUHJvZHVjdERhdGFbXSxcbiAgICBzYXZlZENhcnRJbmZvPzogeyBuYW1lOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmcgfVxuICApOiBPYnNlcnZhYmxlPFByb2R1Y3RJbXBvcnRJbmZvPiB7XG4gICAgcmV0dXJuIHRoaXMuYWRkKHByb2R1Y3RzLCBzYXZlZENhcnRJbmZvKS5waXBlKFxuICAgICAgdGFwKChjYXJ0SWQ6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLmltcG9ydEluZm9TZXJ2aWNlXG4gICAgICAgICAgLmdldFJlc3VsdHMoY2FydElkKVxuICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgdGFrZShwcm9kdWN0cy5sZW5ndGgpLFxuICAgICAgICAgICAgZXZlcnkoXG4gICAgICAgICAgICAgIChwcm9kdWN0SW5mbzogUHJvZHVjdEltcG9ydEluZm8pID0+XG4gICAgICAgICAgICAgICAgcHJvZHVjdEluZm8uc3RhdHVzQ29kZSA9PT1cbiAgICAgICAgICAgICAgICAgIFByb2R1Y3RJbXBvcnRTdGF0dXMuVU5LTk9XTl9JREVOVElGSUVSIHx8XG4gICAgICAgICAgICAgICAgcHJvZHVjdEluZm8uc3RhdHVzQ29kZSA9PT0gUHJvZHVjdEltcG9ydFN0YXR1cy5VTktOT1dOX0VSUk9SXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICAgIC5zdWJzY3JpYmUoKGlzSW52YWxpZDogYm9vbGVhbikgPT4ge1xuICAgICAgICAgICAgaWYgKGlzSW52YWxpZCkge1xuICAgICAgICAgICAgICB0aGlzLnNhdmVkQ2FydFNlcnZpY2UuZGVsZXRlU2F2ZWRDYXJ0KGNhcnRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9KSxcbiAgICAgIHN3aXRjaE1hcCgoY2FydElkOiBzdHJpbmcpID0+IHRoaXMuaW1wb3J0SW5mb1NlcnZpY2UuZ2V0UmVzdWx0cyhjYXJ0SWQpKSxcbiAgICAgIHRha2UocHJvZHVjdHMubGVuZ3RoKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkKFxuICAgIHByb2R1Y3RzOiBQcm9kdWN0RGF0YVtdLFxuICAgIHNhdmVkQ2FydEluZm8/OiB7IG5hbWU6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZyB9XG4gICk6IE9ic2VydmFibGU8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlcklkU2VydmljZS50YWtlVXNlcklkKCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgodXNlcklkOiBzdHJpbmcpID0+XG4gICAgICAgIHRoaXMubXVsdGlDYXJ0U2VydmljZVxuICAgICAgICAgIC5jcmVhdGVDYXJ0KHtcbiAgICAgICAgICAgIHVzZXJJZCxcbiAgICAgICAgICAgIGV4dHJhRGF0YTogeyBhY3RpdmU6IGZhbHNlIH0sXG4gICAgICAgICAgfSlcbiAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcCgoY2FydDogQ2FydCkgPT4gY2FydC5jb2RlIGFzIHN0cmluZyksXG4gICAgICAgICAgICB0YXAoKGNhcnRJZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuc2F2ZWRDYXJ0U2VydmljZS5zYXZlQ2FydCh7XG4gICAgICAgICAgICAgICAgY2FydElkLFxuICAgICAgICAgICAgICAgIHNhdmVDYXJ0TmFtZTogc2F2ZWRDYXJ0SW5mbz8ubmFtZSxcbiAgICAgICAgICAgICAgICBzYXZlQ2FydERlc2NyaXB0aW9uOiBzYXZlZENhcnRJbmZvPy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuc2F2ZWRDYXJ0U2VydmljZS5sb2FkU2F2ZWRDYXJ0cygpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBvYnNlcnZlT24ocXVldWVTY2hlZHVsZXIpLFxuICAgICAgICAgICAgZGVib3VuY2UoKCkgPT5cbiAgICAgICAgICAgICAgdGhpcy5zYXZlZENhcnRTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmdldFNhdmVDYXJ0UHJvY2Vzc0xvYWRpbmcoKVxuICAgICAgICAgICAgICAgIC5waXBlKGZpbHRlcigobG9hZGluZykgPT4gIWxvYWRpbmcpKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRhcCgoY2FydElkOiBzdHJpbmcpID0+XG4gICAgICAgICAgICAgIHRoaXMubXVsdGlDYXJ0U2VydmljZS5hZGRFbnRyaWVzKHVzZXJJZCwgY2FydElkLCBwcm9kdWN0cylcbiAgICAgICAgICAgIClcbiAgICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufVxuIl19