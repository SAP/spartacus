/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';
import { QuickOrderStatePersistenceService } from './services/quick-order-state-persistance.service';
import * as i0 from "@angular/core";
export class QuickOrderCoreModule {
    static forRoot() {
        return {
            ngModule: QuickOrderCoreModule,
        };
    }
}
QuickOrderCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
QuickOrderCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderCoreModule });
QuickOrderCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderCoreModule, providers: [...facadeProviders, QuickOrderStatePersistenceService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: QuickOrderCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [...facadeProviders, QuickOrderStatePersistenceService],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVpY2stb3JkZXItY29yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY2FydC9xdWljay1vcmRlci9jb3JlL3F1aWNrLW9yZGVyLWNvcmUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sa0RBQWtELENBQUM7O0FBS3JHLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0IsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO0lBQ0osQ0FBQzs7aUhBTFUsb0JBQW9CO2tIQUFwQixvQkFBb0I7a0hBQXBCLG9CQUFvQixhQUZwQixDQUFDLEdBQUcsZUFBZSxFQUFFLGlDQUFpQyxDQUFDOzJGQUV2RCxvQkFBb0I7a0JBSGhDLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFLENBQUMsR0FBRyxlQUFlLEVBQUUsaUNBQWlDLENBQUM7aUJBQ25FIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhY2FkZVByb3ZpZGVycyB9IGZyb20gJy4vZmFjYWRlL2ZhY2FkZS1wcm92aWRlcnMnO1xuaW1wb3J0IHsgUXVpY2tPcmRlclN0YXRlUGVyc2lzdGVuY2VTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9xdWljay1vcmRlci1zdGF0ZS1wZXJzaXN0YW5jZS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbLi4uZmFjYWRlUHJvdmlkZXJzLCBRdWlja09yZGVyU3RhdGVQZXJzaXN0ZW5jZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBRdWlja09yZGVyQ29yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8UXVpY2tPcmRlckNvcmVNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFF1aWNrT3JkZXJDb3JlTW9kdWxlLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==