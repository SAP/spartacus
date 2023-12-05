/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartAdapter, CartEntryAdapter, CartValidationAdapter, CartVoucherAdapter, } from '@spartacus/cart/base/core';
import { CART_NORMALIZER, ORDER_ENTRY_PROMOTIONS_NORMALIZER, } from '@spartacus/cart/base/root';
import { provideDefaultConfig } from '@spartacus/core';
import { OccCartNormalizer } from './adapters/converters/occ-cart-normalizer';
import { OrderEntryPromotionsNormalizer } from './adapters/converters/order-entry-promotions-normalizer';
import { defaultOccCartConfig } from './adapters/default-occ-cart-config';
import { OccCartEntryAdapter } from './adapters/occ-cart-entry.adapter';
import { OccCartValidationAdapter } from './adapters/occ-cart-validation.adapter';
import { OccCartVoucherAdapter } from './adapters/occ-cart-voucher.adapter';
import { OccCartAdapter } from './adapters/occ-cart.adapter';
import * as i0 from "@angular/core";
export class CartBaseOccModule {
}
CartBaseOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CartBaseOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CartBaseOccModule, imports: [CommonModule] });
CartBaseOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseOccModule, providers: [
        provideDefaultConfig(defaultOccCartConfig),
        {
            provide: CartAdapter,
            useClass: OccCartAdapter,
        },
        {
            provide: CART_NORMALIZER,
            useExisting: OccCartNormalizer,
            multi: true,
        },
        {
            provide: ORDER_ENTRY_PROMOTIONS_NORMALIZER,
            useExisting: OrderEntryPromotionsNormalizer,
            multi: true,
        },
        {
            provide: CartEntryAdapter,
            useClass: OccCartEntryAdapter,
        },
        {
            provide: CartVoucherAdapter,
            useClass: OccCartVoucherAdapter,
        },
        {
            provide: CartValidationAdapter,
            useClass: OccCartValidationAdapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CartBaseOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccCartConfig),
                        {
                            provide: CartAdapter,
                            useClass: OccCartAdapter,
                        },
                        {
                            provide: CART_NORMALIZER,
                            useExisting: OccCartNormalizer,
                            multi: true,
                        },
                        {
                            provide: ORDER_ENTRY_PROMOTIONS_NORMALIZER,
                            useExisting: OrderEntryPromotionsNormalizer,
                            multi: true,
                        },
                        {
                            provide: CartEntryAdapter,
                            useClass: OccCartEntryAdapter,
                        },
                        {
                            provide: CartVoucherAdapter,
                            useClass: OccCartVoucherAdapter,
                        },
                        {
                            provide: CartValidationAdapter,
                            useClass: OccCartValidationAdapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC1iYXNlLW9jYy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9iYXNlL29jYy9jYXJ0LWJhc2Utb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLFdBQVcsRUFDWCxnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGtCQUFrQixHQUNuQixNQUFNLDJCQUEyQixDQUFDO0FBQ25DLE9BQU8sRUFDTCxlQUFlLEVBQ2YsaUNBQWlDLEdBQ2xDLE1BQU0sMkJBQTJCLENBQUM7QUFDbkMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0seURBQXlELENBQUM7QUFDekcsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDeEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDOztBQWtDN0QsTUFBTSxPQUFPLGlCQUFpQjs7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLFlBL0JsQixZQUFZOytHQStCWCxpQkFBaUIsYUE5QmpCO1FBQ1Qsb0JBQW9CLENBQUMsb0JBQW9CLENBQUM7UUFDMUM7WUFDRSxPQUFPLEVBQUUsV0FBVztZQUNwQixRQUFRLEVBQUUsY0FBYztTQUN6QjtRQUNEO1lBQ0UsT0FBTyxFQUFFLGVBQWU7WUFDeEIsV0FBVyxFQUFFLGlCQUFpQjtZQUM5QixLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsaUNBQWlDO1lBQzFDLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixRQUFRLEVBQUUsbUJBQW1CO1NBQzlCO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsa0JBQWtCO1lBQzNCLFFBQVEsRUFBRSxxQkFBcUI7U0FDaEM7UUFDRDtZQUNFLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsUUFBUSxFQUFFLHdCQUF3QjtTQUNuQztLQUNGLFlBN0JTLFlBQVk7MkZBK0JYLGlCQUFpQjtrQkFoQzdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQUMsb0JBQW9CLENBQUM7d0JBQzFDOzRCQUNFLE9BQU8sRUFBRSxXQUFXOzRCQUNwQixRQUFRLEVBQUUsY0FBYzt5QkFDekI7d0JBQ0Q7NEJBQ0UsT0FBTyxFQUFFLGVBQWU7NEJBQ3hCLFdBQVcsRUFBRSxpQkFBaUI7NEJBQzlCLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxpQ0FBaUM7NEJBQzFDLFdBQVcsRUFBRSw4QkFBOEI7NEJBQzNDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFFBQVEsRUFBRSxtQkFBbUI7eUJBQzlCO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxrQkFBa0I7NEJBQzNCLFFBQVEsRUFBRSxxQkFBcUI7eUJBQ2hDO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxxQkFBcUI7NEJBQzlCLFFBQVEsRUFBRSx3QkFBd0I7eUJBQ25DO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDYXJ0QWRhcHRlcixcbiAgQ2FydEVudHJ5QWRhcHRlcixcbiAgQ2FydFZhbGlkYXRpb25BZGFwdGVyLFxuICBDYXJ0Vm91Y2hlckFkYXB0ZXIsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ0FSVF9OT1JNQUxJWkVSLFxuICBPUkRFUl9FTlRSWV9QUk9NT1RJT05TX05PUk1BTElaRVIsXG59IGZyb20gJ0BzcGFydGFjdXMvY2FydC9iYXNlL3Jvb3QnO1xuaW1wb3J0IHsgcHJvdmlkZURlZmF1bHRDb25maWcgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgT2NjQ2FydE5vcm1hbGl6ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL2NvbnZlcnRlcnMvb2NjLWNhcnQtbm9ybWFsaXplcic7XG5pbXBvcnQgeyBPcmRlckVudHJ5UHJvbW90aW9uc05vcm1hbGl6ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL2NvbnZlcnRlcnMvb3JkZXItZW50cnktcHJvbW90aW9ucy1ub3JtYWxpemVyJztcbmltcG9ydCB7IGRlZmF1bHRPY2NDYXJ0Q29uZmlnIH0gZnJvbSAnLi9hZGFwdGVycy9kZWZhdWx0LW9jYy1jYXJ0LWNvbmZpZyc7XG5pbXBvcnQgeyBPY2NDYXJ0RW50cnlBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtY2FydC1lbnRyeS5hZGFwdGVyJztcbmltcG9ydCB7IE9jY0NhcnRWYWxpZGF0aW9uQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLWNhcnQtdmFsaWRhdGlvbi5hZGFwdGVyJztcbmltcG9ydCB7IE9jY0NhcnRWb3VjaGVyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLWNhcnQtdm91Y2hlci5hZGFwdGVyJztcbmltcG9ydCB7IE9jY0NhcnRBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtY2FydC5hZGFwdGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPY2NDYXJ0Q29uZmlnKSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBDYXJ0QWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NDYXJ0QWRhcHRlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENBUlRfTk9STUFMSVpFUixcbiAgICAgIHVzZUV4aXN0aW5nOiBPY2NDYXJ0Tm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogT1JERVJfRU5UUllfUFJPTU9USU9OU19OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9yZGVyRW50cnlQcm9tb3Rpb25zTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ2FydEVudHJ5QWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NDYXJ0RW50cnlBZGFwdGVyLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogQ2FydFZvdWNoZXJBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY0NhcnRWb3VjaGVyQWRhcHRlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IENhcnRWYWxpZGF0aW9uQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NDYXJ0VmFsaWRhdGlvbkFkYXB0ZXIsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FydEJhc2VPY2NNb2R1bGUge31cbiJdfQ==