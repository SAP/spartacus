/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartOutlets } from '@spartacus/cart/base/root';
import { I18nModule, UrlModule } from '@spartacus/core';
import { AtMessageModule, IconModule, ItemCounterModule, MediaModule, OutletModule, PromotionsModule, provideOutlet, } from '@spartacus/storefront';
import { CartItemListRowComponent } from './cart-item-list-row/cart-item-list-row.component';
import { CartCouponModule } from '../cart-coupon/cart-coupon.module';
import { CartItemValidationWarningModule } from '../validation/cart-item-warning/cart-item-validation-warning.module';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AddToCartModule } from '../add-to-cart/add-to-cart.module';
import * as i0 from "@angular/core";
export class CartSharedModule {
}
CartSharedModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartSharedModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartSharedModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartSharedModule, declarations: [CartItemComponent,
        OrderSummaryComponent,
        CartItemListComponent,
        CartItemListRowComponent], imports: [AtMessageModule,
        CartCouponModule,
        CartItemValidationWarningModule,
        CommonModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        OutletModule,
        PromotionsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        AddToCartModule], exports: [CartItemComponent,
        CartItemListRowComponent,
        CartItemListComponent,
        OrderSummaryComponent] });
CartSharedModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartSharedModule, providers: [
        provideOutlet({
            id: CartOutlets.ORDER_SUMMARY,
            component: OrderSummaryComponent,
        }),
        provideOutlet({
            id: CartOutlets.CART_ITEM_LIST,
            component: CartItemListComponent,
        }),
    ], imports: [AtMessageModule,
        CartCouponModule,
        CartItemValidationWarningModule,
        CommonModule,
        I18nModule,
        IconModule,
        ItemCounterModule,
        MediaModule,
        OutletModule,
        PromotionsModule,
        ReactiveFormsModule,
        RouterModule,
        UrlModule,
        AddToCartModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartSharedModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AtMessageModule,
                        CartCouponModule,
                        CartItemValidationWarningModule,
                        CommonModule,
                        I18nModule,
                        IconModule,
                        ItemCounterModule,
                        MediaModule,
                        OutletModule,
                        PromotionsModule,
                        ReactiveFormsModule,
                        RouterModule,
                        UrlModule,
                        AddToCartModule,
                    ],
                    providers: [
                        provideOutlet({
                            id: CartOutlets.ORDER_SUMMARY,
                            component: OrderSummaryComponent,
                        }),
                        provideOutlet({
                            id: CartOutlets.CART_ITEM_LIST,
                            component: CartItemListComponent,
                        }),
                    ],
                    declarations: [
                        CartItemComponent,
                        OrderSummaryComponent,
                        CartItemListComponent,
                        CartItemListRowComponent,
                    ],
                    exports: [
                        CartItemComponent,
                        CartItemListRowComponent,
                        CartItemListComponent,
                        OrderSummaryComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1zaGFyZWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtc2hhcmVkL2NhcnQtc2hhcmVkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFDTCxlQUFlLEVBQ2YsVUFBVSxFQUNWLGlCQUFpQixFQUNqQixXQUFXLEVBQ1gsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM3RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNyRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxxRUFBcUUsQ0FBQztBQUN0SCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7O0FBMENwRSxNQUFNLE9BQU8sZ0JBQWdCOzs2R0FBaEIsZ0JBQWdCOzhHQUFoQixnQkFBZ0IsaUJBWnpCLGlCQUFpQjtRQUNqQixxQkFBcUI7UUFDckIscUJBQXFCO1FBQ3JCLHdCQUF3QixhQTdCeEIsZUFBZTtRQUNmLGdCQUFnQjtRQUNoQiwrQkFBK0I7UUFDL0IsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsaUJBQWlCO1FBQ2pCLFdBQVc7UUFDWCxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osU0FBUztRQUNULGVBQWUsYUFtQmYsaUJBQWlCO1FBQ2pCLHdCQUF3QjtRQUN4QixxQkFBcUI7UUFDckIscUJBQXFCOzhHQUdaLGdCQUFnQixhQXZCaEI7UUFDVCxhQUFhLENBQUM7WUFDWixFQUFFLEVBQUUsV0FBVyxDQUFDLGFBQWE7WUFDN0IsU0FBUyxFQUFFLHFCQUFxQjtTQUNqQyxDQUFDO1FBQ0YsYUFBYSxDQUFDO1lBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxjQUFjO1lBQzlCLFNBQVMsRUFBRSxxQkFBcUI7U0FDakMsQ0FBQztLQUNILFlBeEJDLGVBQWU7UUFDZixnQkFBZ0I7UUFDaEIsK0JBQStCO1FBQy9CLFlBQVk7UUFDWixVQUFVO1FBQ1YsVUFBVTtRQUNWLGlCQUFpQjtRQUNqQixXQUFXO1FBQ1gsWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLFNBQVM7UUFDVCxlQUFlOzJGQXlCTixnQkFBZ0I7a0JBeEM1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxlQUFlO3dCQUNmLGdCQUFnQjt3QkFDaEIsK0JBQStCO3dCQUMvQixZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixpQkFBaUI7d0JBQ2pCLFdBQVc7d0JBQ1gsWUFBWTt3QkFDWixnQkFBZ0I7d0JBQ2hCLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixTQUFTO3dCQUNULGVBQWU7cUJBQ2hCO29CQUNELFNBQVMsRUFBRTt3QkFDVCxhQUFhLENBQUM7NEJBQ1osRUFBRSxFQUFFLFdBQVcsQ0FBQyxhQUFhOzRCQUM3QixTQUFTLEVBQUUscUJBQXFCO3lCQUNqQyxDQUFDO3dCQUNGLGFBQWEsQ0FBQzs0QkFDWixFQUFFLEVBQUUsV0FBVyxDQUFDLGNBQWM7NEJBQzlCLFNBQVMsRUFBRSxxQkFBcUI7eUJBQ2pDLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLGlCQUFpQjt3QkFDakIscUJBQXFCO3dCQUNyQixxQkFBcUI7d0JBQ3JCLHdCQUF3QjtxQkFDekI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGlCQUFpQjt3QkFDakIsd0JBQXdCO3dCQUN4QixxQkFBcUI7d0JBQ3JCLHFCQUFxQjtxQkFDdEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ2FydE91dGxldHMgfSBmcm9tICdAc3BhcnRhY3VzL2NhcnQvYmFzZS9yb290JztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBBdE1lc3NhZ2VNb2R1bGUsXG4gIEljb25Nb2R1bGUsXG4gIEl0ZW1Db3VudGVyTW9kdWxlLFxuICBNZWRpYU1vZHVsZSxcbiAgT3V0bGV0TW9kdWxlLFxuICBQcm9tb3Rpb25zTW9kdWxlLFxuICBwcm92aWRlT3V0bGV0LFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuaW1wb3J0IHsgQ2FydEl0ZW1MaXN0Um93Q29tcG9uZW50IH0gZnJvbSAnLi9jYXJ0LWl0ZW0tbGlzdC1yb3cvY2FydC1pdGVtLWxpc3Qtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXJ0Q291cG9uTW9kdWxlIH0gZnJvbSAnLi4vY2FydC1jb3Vwb24vY2FydC1jb3Vwb24ubW9kdWxlJztcbmltcG9ydCB7IENhcnRJdGVtVmFsaWRhdGlvbldhcm5pbmdNb2R1bGUgfSBmcm9tICcuLi92YWxpZGF0aW9uL2NhcnQtaXRlbS13YXJuaW5nL2NhcnQtaXRlbS12YWxpZGF0aW9uLXdhcm5pbmcubW9kdWxlJztcbmltcG9ydCB7IENhcnRJdGVtTGlzdENvbXBvbmVudCB9IGZyb20gJy4vY2FydC1pdGVtLWxpc3QvY2FydC1pdGVtLWxpc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENhcnRJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJ0LWl0ZW0vY2FydC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPcmRlclN1bW1hcnlDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLXN1bW1hcnkvb3JkZXItc3VtbWFyeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRkVG9DYXJ0TW9kdWxlIH0gZnJvbSAnLi4vYWRkLXRvLWNhcnQvYWRkLXRvLWNhcnQubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIEF0TWVzc2FnZU1vZHVsZSxcbiAgICBDYXJ0Q291cG9uTW9kdWxlLFxuICAgIENhcnRJdGVtVmFsaWRhdGlvbldhcm5pbmdNb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBJdGVtQ291bnRlck1vZHVsZSxcbiAgICBNZWRpYU1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUsXG4gICAgUHJvbW90aW9uc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgQWRkVG9DYXJ0TW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlT3V0bGV0KHtcbiAgICAgIGlkOiBDYXJ0T3V0bGV0cy5PUkRFUl9TVU1NQVJZLFxuICAgICAgY29tcG9uZW50OiBPcmRlclN1bW1hcnlDb21wb25lbnQsXG4gICAgfSksXG4gICAgcHJvdmlkZU91dGxldCh7XG4gICAgICBpZDogQ2FydE91dGxldHMuQ0FSVF9JVEVNX0xJU1QsXG4gICAgICBjb21wb25lbnQ6IENhcnRJdGVtTGlzdENvbXBvbmVudCxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FydEl0ZW1Db21wb25lbnQsXG4gICAgT3JkZXJTdW1tYXJ5Q29tcG9uZW50LFxuICAgIENhcnRJdGVtTGlzdENvbXBvbmVudCxcbiAgICBDYXJ0SXRlbUxpc3RSb3dDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDYXJ0SXRlbUNvbXBvbmVudCxcbiAgICBDYXJ0SXRlbUxpc3RSb3dDb21wb25lbnQsXG4gICAgQ2FydEl0ZW1MaXN0Q29tcG9uZW50LFxuICAgIE9yZGVyU3VtbWFyeUNvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydFNoYXJlZE1vZHVsZSB7fVxuIl19