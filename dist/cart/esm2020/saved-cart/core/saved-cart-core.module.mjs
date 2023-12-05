/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { SavedCartConnector } from './connectors/saved-cart.connector';
import { SavedCartEventsModule } from './events/saved-cart-events.module';
import { SavedCartStoreModule } from './store/saved-cart-store.module';
import { facadeProviders } from './facade/facade-providers';
import * as i0 from "@angular/core";
export class SavedCartCoreModule {
}
SavedCartCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SavedCartCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: SavedCartCoreModule, imports: [SavedCartStoreModule, SavedCartEventsModule] });
SavedCartCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartCoreModule, providers: [SavedCartConnector, ...facadeProviders], imports: [SavedCartStoreModule, SavedCartEventsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SavedCartCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [SavedCartStoreModule, SavedCartEventsModule],
                    providers: [SavedCartConnector, ...facadeProviders],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZWQtY2FydC1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jYXJ0L3NhdmVkLWNhcnQvY29yZS9zYXZlZC1jYXJ0LWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7QUFNNUQsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLFlBSHBCLG9CQUFvQixFQUFFLHFCQUFxQjtpSEFHMUMsbUJBQW1CLGFBRm5CLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxlQUFlLENBQUMsWUFEekMsb0JBQW9CLEVBQUUscUJBQXFCOzJGQUcxQyxtQkFBbUI7a0JBSi9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLEVBQUUscUJBQXFCLENBQUM7b0JBQ3RELFNBQVMsRUFBRSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsZUFBZSxDQUFDO2lCQUNwRCIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTYXZlZENhcnRDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMvc2F2ZWQtY2FydC5jb25uZWN0b3InO1xuaW1wb3J0IHsgU2F2ZWRDYXJ0RXZlbnRzTW9kdWxlIH0gZnJvbSAnLi9ldmVudHMvc2F2ZWQtY2FydC1ldmVudHMubW9kdWxlJztcbmltcG9ydCB7IFNhdmVkQ2FydFN0b3JlTW9kdWxlIH0gZnJvbSAnLi9zdG9yZS9zYXZlZC1jYXJ0LXN0b3JlLm1vZHVsZSc7XG5pbXBvcnQgeyBmYWNhZGVQcm92aWRlcnMgfSBmcm9tICcuL2ZhY2FkZS9mYWNhZGUtcHJvdmlkZXJzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1NhdmVkQ2FydFN0b3JlTW9kdWxlLCBTYXZlZENhcnRFdmVudHNNb2R1bGVdLFxuICBwcm92aWRlcnM6IFtTYXZlZENhcnRDb25uZWN0b3IsIC4uLmZhY2FkZVByb3ZpZGVyc10sXG59KVxuZXhwb3J0IGNsYXNzIFNhdmVkQ2FydENvcmVNb2R1bGUge31cbiJdfQ==