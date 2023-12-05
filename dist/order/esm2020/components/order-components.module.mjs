/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OrderDetailsOrderEntriesContextToken } from '@spartacus/order/root';
import { OrderCancellationModule, OrderReturnModule, } from './amend-order/index';
import { MyAccountV2OrdersModule } from './my-account-v2';
import { OrderConfirmationModule } from './order-confirmation/order-confirmation.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderDetailsOrderEntriesContext } from './page-context/order-details-order-entries.context';
import { ReplenishmentOrderDetailsModule } from './replenishment-order-details/replenishment-order-details.module';
import { ReplenishmentOrderHistoryModule } from './replenishment-order-history/replenishment-order-history.module';
import { ReturnRequestDetailModule } from './return-request-detail/return-request-detail.module';
import { ReturnRequestListModule } from './return-request-list/order-return-request-list.module';
import * as i0 from "@angular/core";
export class OrderComponentsModule {
}
OrderComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderComponentsModule, imports: [OrderHistoryModule,
        OrderDetailsModule,
        ReplenishmentOrderDetailsModule,
        OrderCancellationModule,
        OrderReturnModule,
        ReplenishmentOrderHistoryModule,
        ReturnRequestListModule,
        ReturnRequestDetailModule,
        OrderConfirmationModule,
        MyAccountV2OrdersModule] });
OrderComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderComponentsModule, providers: [
        {
            provide: OrderDetailsOrderEntriesContextToken,
            useExisting: OrderDetailsOrderEntriesContext,
        },
    ], imports: [OrderHistoryModule,
        OrderDetailsModule,
        ReplenishmentOrderDetailsModule,
        OrderCancellationModule,
        OrderReturnModule,
        ReplenishmentOrderHistoryModule,
        ReturnRequestListModule,
        ReturnRequestDetailModule,
        OrderConfirmationModule,
        MyAccountV2OrdersModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        OrderHistoryModule,
                        OrderDetailsModule,
                        ReplenishmentOrderDetailsModule,
                        OrderCancellationModule,
                        OrderReturnModule,
                        ReplenishmentOrderHistoryModule,
                        ReturnRequestListModule,
                        ReturnRequestDetailModule,
                        OrderConfirmationModule,
                        MyAccountV2OrdersModule,
                    ],
                    providers: [
                        {
                            provide: OrderDetailsOrderEntriesContextToken,
                            useExisting: OrderDetailsOrderEntriesContext,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29tcG9uZW50cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM3RSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixHQUNsQixNQUFNLHFCQUFxQixDQUFDO0FBQzdCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFELE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQ3JHLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQ25ILE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLGtFQUFrRSxDQUFDO0FBQ25ILE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdEQUF3RCxDQUFDOztBQXNCakcsTUFBTSxPQUFPLHFCQUFxQjs7a0hBQXJCLHFCQUFxQjttSEFBckIscUJBQXFCLFlBbEI5QixrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLCtCQUErQjtRQUMvQix1QkFBdUI7UUFDdkIsaUJBQWlCO1FBQ2pCLCtCQUErQjtRQUMvQix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2Qix1QkFBdUI7bUhBU2QscUJBQXFCLGFBUHJCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsb0NBQW9DO1lBQzdDLFdBQVcsRUFBRSwrQkFBK0I7U0FDN0M7S0FDRixZQWhCQyxrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLCtCQUErQjtRQUMvQix1QkFBdUI7UUFDdkIsaUJBQWlCO1FBQ2pCLCtCQUErQjtRQUMvQix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2Qix1QkFBdUI7MkZBU2QscUJBQXFCO2tCQXBCakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1Asa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLCtCQUErQjt3QkFDL0IsdUJBQXVCO3dCQUN2QixpQkFBaUI7d0JBQ2pCLCtCQUErQjt3QkFDL0IsdUJBQXVCO3dCQUN2Qix5QkFBeUI7d0JBQ3pCLHVCQUF1Qjt3QkFDdkIsdUJBQXVCO3FCQUN4QjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Q7NEJBQ0UsT0FBTyxFQUFFLG9DQUFvQzs0QkFDN0MsV0FBVyxFQUFFLCtCQUErQjt5QkFDN0M7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuIH0gZnJvbSAnQHNwYXJ0YWN1cy9vcmRlci9yb290JztcbmltcG9ydCB7XG4gIE9yZGVyQ2FuY2VsbGF0aW9uTW9kdWxlLFxuICBPcmRlclJldHVybk1vZHVsZSxcbn0gZnJvbSAnLi9hbWVuZC1vcmRlci9pbmRleCc7XG5pbXBvcnQgeyBNeUFjY291bnRWMk9yZGVyc01vZHVsZSB9IGZyb20gJy4vbXktYWNjb3VudC12Mic7XG5pbXBvcnQgeyBPcmRlckNvbmZpcm1hdGlvbk1vZHVsZSB9IGZyb20gJy4vb3JkZXItY29uZmlybWF0aW9uL29yZGVyLWNvbmZpcm1hdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgT3JkZXJEZXRhaWxzTW9kdWxlIH0gZnJvbSAnLi9vcmRlci1kZXRhaWxzL29yZGVyLWRldGFpbHMubW9kdWxlJztcbmltcG9ydCB7IE9yZGVySGlzdG9yeU1vZHVsZSB9IGZyb20gJy4vb3JkZXItaGlzdG9yeS9vcmRlci1oaXN0b3J5Lm1vZHVsZSc7XG5pbXBvcnQgeyBPcmRlckRldGFpbHNPcmRlckVudHJpZXNDb250ZXh0IH0gZnJvbSAnLi9wYWdlLWNvbnRleHQvb3JkZXItZGV0YWlscy1vcmRlci1lbnRyaWVzLmNvbnRleHQnO1xuaW1wb3J0IHsgUmVwbGVuaXNobWVudE9yZGVyRGV0YWlsc01vZHVsZSB9IGZyb20gJy4vcmVwbGVuaXNobWVudC1vcmRlci1kZXRhaWxzL3JlcGxlbmlzaG1lbnQtb3JkZXItZGV0YWlscy5tb2R1bGUnO1xuaW1wb3J0IHsgUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeU1vZHVsZSB9IGZyb20gJy4vcmVwbGVuaXNobWVudC1vcmRlci1oaXN0b3J5L3JlcGxlbmlzaG1lbnQtb3JkZXItaGlzdG9yeS5tb2R1bGUnO1xuaW1wb3J0IHsgUmV0dXJuUmVxdWVzdERldGFpbE1vZHVsZSB9IGZyb20gJy4vcmV0dXJuLXJlcXVlc3QtZGV0YWlsL3JldHVybi1yZXF1ZXN0LWRldGFpbC5tb2R1bGUnO1xuaW1wb3J0IHsgUmV0dXJuUmVxdWVzdExpc3RNb2R1bGUgfSBmcm9tICcuL3JldHVybi1yZXF1ZXN0LWxpc3Qvb3JkZXItcmV0dXJuLXJlcXVlc3QtbGlzdC5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgT3JkZXJIaXN0b3J5TW9kdWxlLFxuICAgIE9yZGVyRGV0YWlsc01vZHVsZSxcbiAgICBSZXBsZW5pc2htZW50T3JkZXJEZXRhaWxzTW9kdWxlLFxuICAgIE9yZGVyQ2FuY2VsbGF0aW9uTW9kdWxlLFxuICAgIE9yZGVyUmV0dXJuTW9kdWxlLFxuICAgIFJlcGxlbmlzaG1lbnRPcmRlckhpc3RvcnlNb2R1bGUsXG4gICAgUmV0dXJuUmVxdWVzdExpc3RNb2R1bGUsXG4gICAgUmV0dXJuUmVxdWVzdERldGFpbE1vZHVsZSxcbiAgICBPcmRlckNvbmZpcm1hdGlvbk1vZHVsZSxcbiAgICBNeUFjY291bnRWMk9yZGVyc01vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogT3JkZXJEZXRhaWxzT3JkZXJFbnRyaWVzQ29udGV4dFRva2VuLFxuICAgICAgdXNlRXhpc3Rpbmc6IE9yZGVyRGV0YWlsc09yZGVyRW50cmllc0NvbnRleHQsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgT3JkZXJDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=