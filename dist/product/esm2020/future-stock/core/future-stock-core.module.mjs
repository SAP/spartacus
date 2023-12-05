/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { FutureStockConnector } from './connectors/future-stock.connector';
import { facadeProviders } from './facade/facade-providers';
import * as i0 from "@angular/core";
export class FutureStockCoreModule {
    static forRoot() {
        return {
            ngModule: FutureStockCoreModule,
        };
    }
}
FutureStockCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FutureStockCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FutureStockCoreModule });
FutureStockCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockCoreModule, providers: [...facadeProviders, FutureStockConnector] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FutureStockCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [...facadeProviders, FutureStockConnector],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnV0dXJlLXN0b2NrLWNvcmUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3Byb2R1Y3QvZnV0dXJlLXN0b2NrL2NvcmUvZnV0dXJlLXN0b2NrLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBSzVELE1BQU0sT0FBTyxxQkFBcUI7SUFDaEMsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLHFCQUFxQjtTQUNoQyxDQUFDO0lBQ0osQ0FBQzs7a0hBTFUscUJBQXFCO21IQUFyQixxQkFBcUI7bUhBQXJCLHFCQUFxQixhQUZyQixDQUFDLEdBQUcsZUFBZSxFQUFFLG9CQUFvQixDQUFDOzJGQUUxQyxxQkFBcUI7a0JBSGpDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUMsR0FBRyxlQUFlLEVBQUUsb0JBQW9CLENBQUM7aUJBQ3REIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZ1dHVyZVN0b2NrQ29ubmVjdG9yIH0gZnJvbSAnLi9jb25uZWN0b3JzL2Z1dHVyZS1zdG9jay5jb25uZWN0b3InO1xuaW1wb3J0IHsgZmFjYWRlUHJvdmlkZXJzIH0gZnJvbSAnLi9mYWNhZGUvZmFjYWRlLXByb3ZpZGVycyc7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogWy4uLmZhY2FkZVByb3ZpZGVycywgRnV0dXJlU3RvY2tDb25uZWN0b3JdLFxufSlcbmV4cG9ydCBjbGFzcyBGdXR1cmVTdG9ja0NvcmVNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEZ1dHVyZVN0b2NrQ29yZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogRnV0dXJlU3RvY2tDb3JlTW9kdWxlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==