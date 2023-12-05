/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { OrderAdapter, OrderHistoryAdapter, ReorderOrderAdapter, ReplenishmentOrderHistoryAdapter, ScheduledReplenishmentOrderAdapter, } from '@spartacus/order/core';
import { ORDER_NORMALIZER, ORDER_RETURN_REQUEST_NORMALIZER, REORDER_ORDER_NORMALIZER, REPLENISHMENT_ORDER_FORM_SERIALIZER, REPLENISHMENT_ORDER_NORMALIZER, } from '@spartacus/order/root';
import { OccOrderNormalizer } from './adapters/converters/occ-order-normalizer';
import { OccReorderOrderNormalizer } from './adapters/converters/occ-reorder-order-normalizer';
import { OccReplenishmentOrderNormalizer } from './adapters/converters/occ-replenishment-order-normalizer';
import { OccReturnRequestNormalizer } from './adapters/converters/occ-return-request-normalizer';
import { OccScheduledReplenishmentOrderFormSerializer } from './adapters/converters/occ-scheduled-replenishment-order-form-serializer';
import { OccOrderHistoryAdapter } from './adapters/occ-order-history.adapter';
import { OccOrderAdapter } from './adapters/occ-order.adapter';
import { OccReorderOrderAdapter } from './adapters/occ-reorder-order.adapter';
import { OccReplenishmentOrderHistoryAdapter } from './adapters/occ-replenishment-order-history.adapter';
import { OccScheduledReplenishmentOrderAdapter } from './adapters/occ-scheduled-replenishment-order.adapter';
import { defaultOccOrderConfig } from './config/default-occ-order-config';
import * as i0 from "@angular/core";
export class OrderOccModule {
}
OrderOccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderOccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderOccModule, imports: [CommonModule] });
OrderOccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOccModule, providers: [
        provideDefaultConfig(defaultOccOrderConfig),
        { provide: OrderHistoryAdapter, useClass: OccOrderHistoryAdapter },
        {
            provide: ReplenishmentOrderHistoryAdapter,
            useClass: OccReplenishmentOrderHistoryAdapter,
        },
        {
            provide: OrderAdapter,
            useClass: OccOrderAdapter,
        },
        {
            provide: ScheduledReplenishmentOrderAdapter,
            useClass: OccScheduledReplenishmentOrderAdapter,
        },
        {
            provide: ReorderOrderAdapter,
            useClass: OccReorderOrderAdapter,
        },
        {
            provide: ORDER_RETURN_REQUEST_NORMALIZER,
            useExisting: OccReturnRequestNormalizer,
            multi: true,
        },
        {
            provide: ORDER_NORMALIZER,
            useExisting: OccOrderNormalizer,
            multi: true,
        },
        {
            provide: REPLENISHMENT_ORDER_NORMALIZER,
            useExisting: OccReplenishmentOrderNormalizer,
            multi: true,
        },
        {
            provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
            useExisting: OccScheduledReplenishmentOrderFormSerializer,
            multi: true,
        },
        {
            provide: REORDER_ORDER_NORMALIZER,
            useExisting: OccReorderOrderNormalizer,
            multi: true,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderOccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccOrderConfig),
                        { provide: OrderHistoryAdapter, useClass: OccOrderHistoryAdapter },
                        {
                            provide: ReplenishmentOrderHistoryAdapter,
                            useClass: OccReplenishmentOrderHistoryAdapter,
                        },
                        {
                            provide: OrderAdapter,
                            useClass: OccOrderAdapter,
                        },
                        {
                            provide: ScheduledReplenishmentOrderAdapter,
                            useClass: OccScheduledReplenishmentOrderAdapter,
                        },
                        {
                            provide: ReorderOrderAdapter,
                            useClass: OccReorderOrderAdapter,
                        },
                        {
                            provide: ORDER_RETURN_REQUEST_NORMALIZER,
                            useExisting: OccReturnRequestNormalizer,
                            multi: true,
                        },
                        {
                            provide: ORDER_NORMALIZER,
                            useExisting: OccOrderNormalizer,
                            multi: true,
                        },
                        {
                            provide: REPLENISHMENT_ORDER_NORMALIZER,
                            useExisting: OccReplenishmentOrderNormalizer,
                            multi: true,
                        },
                        {
                            provide: REPLENISHMENT_ORDER_FORM_SERIALIZER,
                            useExisting: OccScheduledReplenishmentOrderFormSerializer,
                            multi: true,
                        },
                        {
                            provide: REORDER_ORDER_NORMALIZER,
                            useExisting: OccReorderOrderNormalizer,
                            multi: true,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItb2NjLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmRlci9vY2Mvb3JkZXItb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUNMLFlBQVksRUFDWixtQkFBbUIsRUFDbkIsbUJBQW1CLEVBQ25CLGdDQUFnQyxFQUNoQyxrQ0FBa0MsR0FDbkMsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLCtCQUErQixFQUMvQix3QkFBd0IsRUFDeEIsbUNBQW1DLEVBQ25DLDhCQUE4QixHQUMvQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLDBEQUEwRCxDQUFDO0FBQzNHLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSw0Q0FBNEMsRUFBRSxNQUFNLHlFQUF5RSxDQUFDO0FBQ3ZJLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMvRCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsbUNBQW1DLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQUN6RyxPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSxzREFBc0QsQ0FBQztBQUM3RyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7QUFrRDFFLE1BQU0sT0FBTyxjQUFjOzsyR0FBZCxjQUFjOzRHQUFkLGNBQWMsWUEvQ2YsWUFBWTs0R0ErQ1gsY0FBYyxhQTlDZDtRQUNULG9CQUFvQixDQUFDLHFCQUFxQixDQUFDO1FBQzNDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxzQkFBc0IsRUFBRTtRQUNsRTtZQUNFLE9BQU8sRUFBRSxnQ0FBZ0M7WUFDekMsUUFBUSxFQUFFLG1DQUFtQztTQUM5QztRQUNEO1lBQ0UsT0FBTyxFQUFFLFlBQVk7WUFDckIsUUFBUSxFQUFFLGVBQWU7U0FDMUI7UUFDRDtZQUNFLE9BQU8sRUFBRSxrQ0FBa0M7WUFDM0MsUUFBUSxFQUFFLHFDQUFxQztTQUNoRDtRQUNEO1lBQ0UsT0FBTyxFQUFFLG1CQUFtQjtZQUM1QixRQUFRLEVBQUUsc0JBQXNCO1NBQ2pDO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsK0JBQStCO1lBQ3hDLFdBQVcsRUFBRSwwQkFBMEI7WUFDdkMsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixXQUFXLEVBQUUsa0JBQWtCO1lBQy9CLEtBQUssRUFBRSxJQUFJO1NBQ1o7UUFDRDtZQUNFLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxLQUFLLEVBQUUsSUFBSTtTQUNaO1FBQ0Q7WUFDRSxPQUFPLEVBQUUsbUNBQW1DO1lBQzVDLFdBQVcsRUFBRSw0Q0FBNEM7WUFDekQsS0FBSyxFQUFFLElBQUk7U0FDWjtRQUNEO1lBQ0UsT0FBTyxFQUFFLHdCQUF3QjtZQUNqQyxXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLEtBQUssRUFBRSxJQUFJO1NBQ1o7S0FDRixZQTdDUyxZQUFZOzJGQStDWCxjQUFjO2tCQWhEMUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyxxQkFBcUIsQ0FBQzt3QkFDM0MsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFO3dCQUNsRTs0QkFDRSxPQUFPLEVBQUUsZ0NBQWdDOzRCQUN6QyxRQUFRLEVBQUUsbUNBQW1DO3lCQUM5Qzt3QkFDRDs0QkFDRSxPQUFPLEVBQUUsWUFBWTs0QkFDckIsUUFBUSxFQUFFLGVBQWU7eUJBQzFCO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxrQ0FBa0M7NEJBQzNDLFFBQVEsRUFBRSxxQ0FBcUM7eUJBQ2hEO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxtQkFBbUI7NEJBQzVCLFFBQVEsRUFBRSxzQkFBc0I7eUJBQ2pDO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSwrQkFBK0I7NEJBQ3hDLFdBQVcsRUFBRSwwQkFBMEI7NEJBQ3ZDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFdBQVcsRUFBRSxrQkFBa0I7NEJBQy9CLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSw4QkFBOEI7NEJBQ3ZDLFdBQVcsRUFBRSwrQkFBK0I7NEJBQzVDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSxtQ0FBbUM7NEJBQzVDLFdBQVcsRUFBRSw0Q0FBNEM7NEJBQ3pELEtBQUssRUFBRSxJQUFJO3lCQUNaO3dCQUNEOzRCQUNFLE9BQU8sRUFBRSx3QkFBd0I7NEJBQ2pDLFdBQVcsRUFBRSx5QkFBeUI7NEJBQ3RDLEtBQUssRUFBRSxJQUFJO3lCQUNaO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBPcmRlckFkYXB0ZXIsXG4gIE9yZGVySGlzdG9yeUFkYXB0ZXIsXG4gIFJlb3JkZXJPcmRlckFkYXB0ZXIsXG4gIFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlBZGFwdGVyLFxuICBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJBZGFwdGVyLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL2NvcmUnO1xuaW1wb3J0IHtcbiAgT1JERVJfTk9STUFMSVpFUixcbiAgT1JERVJfUkVUVVJOX1JFUVVFU1RfTk9STUFMSVpFUixcbiAgUkVPUkRFUl9PUkRFUl9OT1JNQUxJWkVSLFxuICBSRVBMRU5JU0hNRU5UX09SREVSX0ZPUk1fU0VSSUFMSVpFUixcbiAgUkVQTEVOSVNITUVOVF9PUkRFUl9OT1JNQUxJWkVSLFxufSBmcm9tICdAc3BhcnRhY3VzL29yZGVyL3Jvb3QnO1xuaW1wb3J0IHsgT2NjT3JkZXJOb3JtYWxpemVyIH0gZnJvbSAnLi9hZGFwdGVycy9jb252ZXJ0ZXJzL29jYy1vcmRlci1ub3JtYWxpemVyJztcbmltcG9ydCB7IE9jY1Jlb3JkZXJPcmRlck5vcm1hbGl6ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL2NvbnZlcnRlcnMvb2NjLXJlb3JkZXItb3JkZXItbm9ybWFsaXplcic7XG5pbXBvcnQgeyBPY2NSZXBsZW5pc2htZW50T3JkZXJOb3JtYWxpemVyIH0gZnJvbSAnLi9hZGFwdGVycy9jb252ZXJ0ZXJzL29jYy1yZXBsZW5pc2htZW50LW9yZGVyLW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjUmV0dXJuUmVxdWVzdE5vcm1hbGl6ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL2NvbnZlcnRlcnMvb2NjLXJldHVybi1yZXF1ZXN0LW5vcm1hbGl6ZXInO1xuaW1wb3J0IHsgT2NjU2NoZWR1bGVkUmVwbGVuaXNobWVudE9yZGVyRm9ybVNlcmlhbGl6ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL2NvbnZlcnRlcnMvb2NjLXNjaGVkdWxlZC1yZXBsZW5pc2htZW50LW9yZGVyLWZvcm0tc2VyaWFsaXplcic7XG5pbXBvcnQgeyBPY2NPcmRlckhpc3RvcnlBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2Mtb3JkZXItaGlzdG9yeS5hZGFwdGVyJztcbmltcG9ydCB7IE9jY09yZGVyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLW9yZGVyLmFkYXB0ZXInO1xuaW1wb3J0IHsgT2NjUmVvcmRlck9yZGVyQWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLXJlb3JkZXItb3JkZXIuYWRhcHRlcic7XG5pbXBvcnQgeyBPY2NSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5QWRhcHRlciB9IGZyb20gJy4vYWRhcHRlcnMvb2NjLXJlcGxlbmlzaG1lbnQtb3JkZXItaGlzdG9yeS5hZGFwdGVyJztcbmltcG9ydCB7IE9jY1NjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckFkYXB0ZXIgfSBmcm9tICcuL2FkYXB0ZXJzL29jYy1zY2hlZHVsZWQtcmVwbGVuaXNobWVudC1vcmRlci5hZGFwdGVyJztcbmltcG9ydCB7IGRlZmF1bHRPY2NPcmRlckNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtb2NjLW9yZGVyLWNvbmZpZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0T2NjT3JkZXJDb25maWcpLFxuICAgIHsgcHJvdmlkZTogT3JkZXJIaXN0b3J5QWRhcHRlciwgdXNlQ2xhc3M6IE9jY09yZGVySGlzdG9yeUFkYXB0ZXIgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5QWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NSZXBsZW5pc2htZW50T3JkZXJIaXN0b3J5QWRhcHRlcixcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IE9yZGVyQWRhcHRlcixcbiAgICAgIHVzZUNsYXNzOiBPY2NPcmRlckFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY1NjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBSZW9yZGVyT3JkZXJBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY1Jlb3JkZXJPcmRlckFkYXB0ZXIsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBPUkRFUl9SRVRVUk5fUkVRVUVTVF9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY1JldHVyblJlcXVlc3ROb3JtYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBPUkRFUl9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY09yZGVyTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogUkVQTEVOSVNITUVOVF9PUkRFUl9OT1JNQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY1JlcGxlbmlzaG1lbnRPcmRlck5vcm1hbGl6ZXIsXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFJFUExFTklTSE1FTlRfT1JERVJfRk9STV9TRVJJQUxJWkVSLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9jY1NjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckZvcm1TZXJpYWxpemVyLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBSRU9SREVSX09SREVSX05PUk1BTElaRVIsXG4gICAgICB1c2VFeGlzdGluZzogT2NjUmVvcmRlck9yZGVyTm9ybWFsaXplcixcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE9yZGVyT2NjTW9kdWxlIHt9XG4iXX0=