/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { UnitOrderFacade } from '@spartacus/organization/unit-order/root';
import { UnitOrderConnector } from './connectors';
import { UnitOrderService } from './services';
import { UnitOrderStoreModule } from './store/unit-order-store.module';
import * as i0 from "@angular/core";
export class UnitOrderCoreModule {
    static forRoot() {
        return {
            ngModule: UnitOrderCoreModule,
            providers: [
                {
                    provide: UnitOrderFacade,
                    useExisting: UnitOrderService,
                },
                UnitOrderConnector,
            ],
        };
    }
}
UnitOrderCoreModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderCoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitOrderCoreModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderCoreModule, imports: [UnitOrderStoreModule] });
UnitOrderCoreModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderCoreModule, imports: [UnitOrderStoreModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitOrderCoreModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [UnitOrderStoreModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1vcmRlci1jb3JlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vdW5pdC1vcmRlci9jb3JlL3VuaXQtb3JkZXItY29yZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBdUIsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDbEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQUt2RSxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxtQkFBbUI7WUFDN0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSxlQUFlO29CQUN4QixXQUFXLEVBQUUsZ0JBQWdCO2lCQUM5QjtnQkFDRCxrQkFBa0I7YUFDbkI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0hBWlUsbUJBQW1CO2lIQUFuQixtQkFBbUIsWUFGcEIsb0JBQW9CO2lIQUVuQixtQkFBbUIsWUFGcEIsb0JBQW9COzJGQUVuQixtQkFBbUI7a0JBSC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7aUJBQ2hDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVuaXRPcmRlckZhY2FkZSB9IGZyb20gJ0BzcGFydGFjdXMvb3JnYW5pemF0aW9uL3VuaXQtb3JkZXIvcm9vdCc7XG5pbXBvcnQgeyBVbml0T3JkZXJDb25uZWN0b3IgfSBmcm9tICcuL2Nvbm5lY3RvcnMnO1xuaW1wb3J0IHsgVW5pdE9yZGVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMnO1xuaW1wb3J0IHsgVW5pdE9yZGVyU3RvcmVNb2R1bGUgfSBmcm9tICcuL3N0b3JlL3VuaXQtb3JkZXItc3RvcmUubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1VuaXRPcmRlclN0b3JlTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgVW5pdE9yZGVyQ29yZU1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VW5pdE9yZGVyQ29yZU1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVW5pdE9yZGVyQ29yZU1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVW5pdE9yZGVyRmFjYWRlLFxuICAgICAgICAgIHVzZUV4aXN0aW5nOiBVbml0T3JkZXJTZXJ2aWNlLFxuICAgICAgICB9LFxuICAgICAgICBVbml0T3JkZXJDb25uZWN0b3IsXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==