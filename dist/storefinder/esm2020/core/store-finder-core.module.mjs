/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultStoreFinderConfig } from './config/default-store-finder-config';
import { StoreFinderStoreModule } from './store/store-finder-store.module';
import { StoreFinderConnector } from './connectors/store-finder.connector';
import * as i0 from "@angular/core";
export class StoreFinderCoreModule {
}
StoreFinderCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StoreFinderCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderCoreModule, imports: [StoreFinderStoreModule] });
StoreFinderCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderCoreModule, providers: [
        provideDefaultConfig(defaultStoreFinderConfig),
        StoreFinderConnector,
    ], imports: [StoreFinderStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: StoreFinderCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [StoreFinderStoreModule],
                    providers: [
                        provideDefaultConfig(defaultStoreFinderConfig),
                        StoreFinderConnector,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtZmluZGVyLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3N0b3JlZmluZGVyL2NvcmUvc3RvcmUtZmluZGVyLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ2hGLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFDQUFxQyxDQUFDOztBQVMzRSxNQUFNLE9BQU8scUJBQXFCOztrSEFBckIscUJBQXFCO21IQUFyQixxQkFBcUIsWUFOdEIsc0JBQXNCO21IQU1yQixxQkFBcUIsYUFMckI7UUFDVCxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQztRQUM5QyxvQkFBb0I7S0FDckIsWUFKUyxzQkFBc0I7MkZBTXJCLHFCQUFxQjtrQkFQakMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDakMsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLHdCQUF3QixDQUFDO3dCQUM5QyxvQkFBb0I7cUJBQ3JCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRTdG9yZUZpbmRlckNvbmZpZyB9IGZyb20gJy4vY29uZmlnL2RlZmF1bHQtc3RvcmUtZmluZGVyLWNvbmZpZyc7XG5pbXBvcnQgeyBTdG9yZUZpbmRlclN0b3JlTW9kdWxlIH0gZnJvbSAnLi9zdG9yZS9zdG9yZS1maW5kZXItc3RvcmUubW9kdWxlJztcbmltcG9ydCB7IFN0b3JlRmluZGVyQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL3N0b3JlLWZpbmRlci5jb25uZWN0b3InO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU3RvcmVGaW5kZXJTdG9yZU1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRTdG9yZUZpbmRlckNvbmZpZyksXG4gICAgU3RvcmVGaW5kZXJDb25uZWN0b3IsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlRmluZGVyQ29yZU1vZHVsZSB7fVxuIl19