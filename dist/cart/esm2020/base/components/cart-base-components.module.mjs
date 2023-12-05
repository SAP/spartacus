/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActiveCartOrderEntriesContextToken } from '@spartacus/cart/base/root';
import { OutletModule, PAGE_LAYOUT_HANDLER } from '@spartacus/storefront';
import { ClearCartModule } from './clear-cart/clear-cart-button/clear-cart.module';
import { AddedToCartDialogModule } from './added-to-cart-dialog/added-to-cart-dialog.module';
import { CartDetailsModule } from './cart-details/cart-details.module';
import { CartPageLayoutHandler } from './cart-page-layout-handler';
import { CartProceedToCheckoutModule } from './cart-proceed-to-checkout/cart-proceed-to-checkout.module';
import { CartSharedModule } from './cart-shared/cart-shared.module';
import { CartTotalsModule } from './cart-totals/cart-totals.module';
import { ActiveCartOrderEntriesContext } from './page-context/active-cart-order-entries.context';
import { SaveForLaterModule } from './save-for-later/save-for-later.module';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/storefront";
export class CartBaseComponentsModule {
}
CartBaseComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseComponentsModule, imports: [CommonModule,
        CartDetailsModule,
        CartProceedToCheckoutModule,
        CartTotalsModule,
        CartSharedModule,
        SaveForLaterModule,
        ClearCartModule, i1.OutletModule], exports: [CartDetailsModule,
        CartProceedToCheckoutModule,
        CartTotalsModule,
        CartSharedModule,
        ClearCartModule,
        AddedToCartDialogModule,
        SaveForLaterModule] });
CartBaseComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseComponentsModule, providers: [
        {
            provide: PAGE_LAYOUT_HANDLER,
            useExisting: CartPageLayoutHandler,
            multi: true,
        },
        {
            provide: ActiveCartOrderEntriesContextToken,
            useExisting: ActiveCartOrderEntriesContext,
        },
    ], imports: [CommonModule,
        CartDetailsModule,
        CartProceedToCheckoutModule,
        CartTotalsModule,
        CartSharedModule,
        SaveForLaterModule,
        ClearCartModule,
        OutletModule.forChild(), CartDetailsModule,
        CartProceedToCheckoutModule,
        CartTotalsModule,
        CartSharedModule,
        ClearCartModule,
        AddedToCartDialogModule,
        SaveForLaterModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CartDetailsModule,
                        CartProceedToCheckoutModule,
                        CartTotalsModule,
                        CartSharedModule,
                        SaveForLaterModule,
                        ClearCartModule,
                        OutletModule.forChild(),
                    ],
                    exports: [
                        CartDetailsModule,
                        CartProceedToCheckoutModule,
                        CartTotalsModule,
                        CartSharedModule,
                        ClearCartModule,
                        AddedToCartDialogModule,
                        SaveForLaterModule,
                    ],
                    providers: [
                        {
                            provide: PAGE_LAYOUT_HANDLER,
                            useExisting: CartPageLayoutHandler,
                            multi: true,
                        },
                        {
                            provide: ActiveCartOrderEntriesContextToken,
                            useExisting: ActiveCartOrderEntriesContext,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1iYXNlLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2NhcnQvYmFzZS9jb21wb25lbnRzL2NhcnQtYmFzZS1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFlBQVksRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNuRixPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUM3RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN2RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSw0REFBNEQsQ0FBQztBQUN6RyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUNqRyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQzs7O0FBa0M1RSxNQUFNLE9BQU8sd0JBQXdCOztxSEFBeEIsd0JBQXdCO3NIQUF4Qix3QkFBd0IsWUE5QmpDLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsMkJBQTJCO1FBQzNCLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLGVBQWUsOEJBSWYsaUJBQWlCO1FBQ2pCLDJCQUEyQjtRQUMzQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZix1QkFBdUI7UUFDdkIsa0JBQWtCO3NIQWNULHdCQUF3QixhQVp4QjtRQUNUO1lBQ0UsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixXQUFXLEVBQUUscUJBQXFCO1lBQ2xDLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSxrQ0FBa0M7WUFDM0MsV0FBVyxFQUFFLDZCQUE2QjtTQUMzQztLQUNGLFlBNUJDLFlBQVk7UUFDWixpQkFBaUI7UUFDakIsMkJBQTJCO1FBQzNCLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsa0JBQWtCO1FBQ2xCLGVBQWU7UUFDZixZQUFZLENBQUMsUUFBUSxFQUFFLEVBR3ZCLGlCQUFpQjtRQUNqQiwyQkFBMkI7UUFDM0IsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsdUJBQXVCO1FBQ3ZCLGtCQUFrQjsyRkFjVCx3QkFBd0I7a0JBaENwQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsMkJBQTJCO3dCQUMzQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsa0JBQWtCO3dCQUNsQixlQUFlO3dCQUNmLFlBQVksQ0FBQyxRQUFRLEVBQUU7cUJBQ3hCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxpQkFBaUI7d0JBQ2pCLDJCQUEyQjt3QkFDM0IsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7d0JBQ2hCLGVBQWU7d0JBQ2YsdUJBQXVCO3dCQUN2QixrQkFBa0I7cUJBQ25CO29CQUNELFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsbUJBQW1COzRCQUM1QixXQUFXLEVBQUUscUJBQXFCOzRCQUNsQyxLQUFLLEVBQUUsSUFBSTt5QkFDWjt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsa0NBQWtDOzRCQUMzQyxXQUFXLEVBQUUsNkJBQTZCO3lCQUMzQztxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydE9yZGVyRW50cmllc0NvbnRleHRUb2tlbiB9IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgT3V0bGV0TW9kdWxlLCBQQUdFX0xBWU9VVF9IQU5ETEVSIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IENsZWFyQ2FydE1vZHVsZSB9IGZyb20gJy4vY2xlYXItY2FydC9jbGVhci1jYXJ0LWJ1dHRvbi9jbGVhci1jYXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBBZGRlZFRvQ2FydERpYWxvZ01vZHVsZSB9IGZyb20gJy4vYWRkZWQtdG8tY2FydC1kaWFsb2cvYWRkZWQtdG8tY2FydC1kaWFsb2cubW9kdWxlJztcbmltcG9ydCB7IENhcnREZXRhaWxzTW9kdWxlIH0gZnJvbSAnLi9jYXJ0LWRldGFpbHMvY2FydC1kZXRhaWxzLm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJ0UGFnZUxheW91dEhhbmRsZXIgfSBmcm9tICcuL2NhcnQtcGFnZS1sYXlvdXQtaGFuZGxlcic7XG5pbXBvcnQgeyBDYXJ0UHJvY2VlZFRvQ2hlY2tvdXRNb2R1bGUgfSBmcm9tICcuL2NhcnQtcHJvY2VlZC10by1jaGVja291dC9jYXJ0LXByb2NlZWQtdG8tY2hlY2tvdXQubW9kdWxlJztcbmltcG9ydCB7IENhcnRTaGFyZWRNb2R1bGUgfSBmcm9tICcuL2NhcnQtc2hhcmVkL2NhcnQtc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJ0VG90YWxzTW9kdWxlIH0gZnJvbSAnLi9jYXJ0LXRvdGFscy9jYXJ0LXRvdGFscy5tb2R1bGUnO1xuaW1wb3J0IHsgQWN0aXZlQ2FydE9yZGVyRW50cmllc0NvbnRleHQgfSBmcm9tICcuL3BhZ2UtY29udGV4dC9hY3RpdmUtY2FydC1vcmRlci1lbnRyaWVzLmNvbnRleHQnO1xuaW1wb3J0IHsgU2F2ZUZvckxhdGVyTW9kdWxlIH0gZnJvbSAnLi9zYXZlLWZvci1sYXRlci9zYXZlLWZvci1sYXRlci5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIENhcnREZXRhaWxzTW9kdWxlLFxuICAgIENhcnRQcm9jZWVkVG9DaGVja291dE1vZHVsZSxcbiAgICBDYXJ0VG90YWxzTW9kdWxlLFxuICAgIENhcnRTaGFyZWRNb2R1bGUsXG4gICAgU2F2ZUZvckxhdGVyTW9kdWxlLFxuICAgIENsZWFyQ2FydE1vZHVsZSxcbiAgICBPdXRsZXRNb2R1bGUuZm9yQ2hpbGQoKSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENhcnREZXRhaWxzTW9kdWxlLFxuICAgIENhcnRQcm9jZWVkVG9DaGVja291dE1vZHVsZSxcbiAgICBDYXJ0VG90YWxzTW9kdWxlLFxuICAgIENhcnRTaGFyZWRNb2R1bGUsXG4gICAgQ2xlYXJDYXJ0TW9kdWxlLFxuICAgIEFkZGVkVG9DYXJ0RGlhbG9nTW9kdWxlLFxuICAgIFNhdmVGb3JMYXRlck1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogUEFHRV9MQVlPVVRfSEFORExFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBDYXJ0UGFnZUxheW91dEhhbmRsZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IEFjdGl2ZUNhcnRPcmRlckVudHJpZXNDb250ZXh0VG9rZW4sXG4gICAgICB1c2VFeGlzdGluZzogQWN0aXZlQ2FydE9yZGVyRW50cmllc0NvbnRleHQsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydEJhc2VDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=