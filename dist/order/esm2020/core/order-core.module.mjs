/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { OrderHistoryConnector } from './connectors/order-history.connector';
import { OrderConnector } from './connectors/order.connector';
import { ReorderOrderConnector } from './connectors/reorder-order.connector';
import { ReplenishmentOrderHistoryConnector } from './connectors/replenishment-order-history.connector';
import { ScheduledReplenishmentOrderConnector } from './connectors/scheduled-replenishment-order.connector';
import { facadeProviders } from './facade/facade-providers';
import { OrderStoreModule } from './store/order-store.module';
import * as i0 from "@angular/core";
export class OrderCoreModule {
}
OrderCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
OrderCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: OrderCoreModule, imports: [OrderStoreModule] });
OrderCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCoreModule, providers: [
        ...facadeProviders,
        OrderHistoryConnector,
        ReplenishmentOrderHistoryConnector,
        OrderConnector,
        ScheduledReplenishmentOrderConnector,
        ReorderOrderConnector,
    ], imports: [OrderStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: OrderCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OrderStoreModule],
                    providers: [
                        ...facadeProviders,
                        OrderHistoryConnector,
                        ReplenishmentOrderHistoryConnector,
                        OrderConnector,
                        ScheduledReplenishmentOrderConnector,
                        ReorderOrderConnector,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29yZS9vcmRlci1jb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM3RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDN0UsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFDeEcsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sc0RBQXNELENBQUM7QUFDNUcsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOztBQWE5RCxNQUFNLE9BQU8sZUFBZTs7NEdBQWYsZUFBZTs2R0FBZixlQUFlLFlBVmhCLGdCQUFnQjs2R0FVZixlQUFlLGFBVGY7UUFDVCxHQUFHLGVBQWU7UUFDbEIscUJBQXFCO1FBQ3JCLGtDQUFrQztRQUNsQyxjQUFjO1FBQ2Qsb0NBQW9DO1FBQ3BDLHFCQUFxQjtLQUN0QixZQVJTLGdCQUFnQjsyRkFVZixlQUFlO2tCQVgzQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO29CQUMzQixTQUFTLEVBQUU7d0JBQ1QsR0FBRyxlQUFlO3dCQUNsQixxQkFBcUI7d0JBQ3JCLGtDQUFrQzt3QkFDbEMsY0FBYzt3QkFDZCxvQ0FBb0M7d0JBQ3BDLHFCQUFxQjtxQkFDdEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT3JkZXJIaXN0b3J5Q29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL29yZGVyLWhpc3RvcnkuY29ubmVjdG9yJztcbmltcG9ydCB7IE9yZGVyQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL29yZGVyLmNvbm5lY3Rvcic7XG5pbXBvcnQgeyBSZW9yZGVyT3JkZXJDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvcmVvcmRlci1vcmRlci5jb25uZWN0b3InO1xuaW1wb3J0IHsgUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUNvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9yZXBsZW5pc2htZW50LW9yZGVyLWhpc3RvcnkuY29ubmVjdG9yJztcbmltcG9ydCB7IFNjaGVkdWxlZFJlcGxlbmlzaG1lbnRPcmRlckNvbm5lY3RvciB9IGZyb20gJy4vY29ubmVjdG9ycy9zY2hlZHVsZWQtcmVwbGVuaXNobWVudC1vcmRlci5jb25uZWN0b3InO1xuaW1wb3J0IHsgZmFjYWRlUHJvdmlkZXJzIH0gZnJvbSAnLi9mYWNhZGUvZmFjYWRlLXByb3ZpZGVycyc7XG5pbXBvcnQgeyBPcmRlclN0b3JlTW9kdWxlIH0gZnJvbSAnLi9zdG9yZS9vcmRlci1zdG9yZS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbT3JkZXJTdG9yZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIC4uLmZhY2FkZVByb3ZpZGVycyxcbiAgICBPcmRlckhpc3RvcnlDb25uZWN0b3IsXG4gICAgUmVwbGVuaXNobWVudE9yZGVySGlzdG9yeUNvbm5lY3RvcixcbiAgICBPcmRlckNvbm5lY3RvcixcbiAgICBTY2hlZHVsZWRSZXBsZW5pc2htZW50T3JkZXJDb25uZWN0b3IsXG4gICAgUmVvcmRlck9yZGVyQ29ubmVjdG9yLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBPcmRlckNvcmVNb2R1bGUge31cbiJdfQ==