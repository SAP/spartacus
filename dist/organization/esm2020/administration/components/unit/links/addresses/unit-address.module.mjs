/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { UnitAddressDetailsModule } from './details/unit-address-details.module';
import { UnitAddressListModule } from './list/unit-address-list.module';
import { UnitAddressFormModule } from './form/unit-address-form.module';
import * as i0 from "@angular/core";
export class UnitAddressModule {
}
UnitAddressModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
UnitAddressModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressModule, imports: [UnitAddressListModule,
        UnitAddressDetailsModule,
        UnitAddressFormModule] });
UnitAddressModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressModule, imports: [UnitAddressListModule,
        UnitAddressDetailsModule,
        UnitAddressFormModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: UnitAddressModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        UnitAddressListModule,
                        UnitAddressDetailsModule,
                        UnitAddressFormModule,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pdC1hZGRyZXNzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9vcmdhbml6YXRpb24vYWRtaW5pc3RyYXRpb24vY29tcG9uZW50cy91bml0L2xpbmtzL2FkZHJlc3Nlcy91bml0LWFkZHJlc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQVN4RSxNQUFNLE9BQU8saUJBQWlCOzs4R0FBakIsaUJBQWlCOytHQUFqQixpQkFBaUIsWUFMMUIscUJBQXFCO1FBQ3JCLHdCQUF3QjtRQUN4QixxQkFBcUI7K0dBR1osaUJBQWlCLFlBTDFCLHFCQUFxQjtRQUNyQix3QkFBd0I7UUFDeEIscUJBQXFCOzJGQUdaLGlCQUFpQjtrQkFQN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AscUJBQXFCO3dCQUNyQix3QkFBd0I7d0JBQ3hCLHFCQUFxQjtxQkFDdEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW5pdEFkZHJlc3NEZXRhaWxzTW9kdWxlIH0gZnJvbSAnLi9kZXRhaWxzL3VuaXQtYWRkcmVzcy1kZXRhaWxzLm1vZHVsZSc7XG5pbXBvcnQgeyBVbml0QWRkcmVzc0xpc3RNb2R1bGUgfSBmcm9tICcuL2xpc3QvdW5pdC1hZGRyZXNzLWxpc3QubW9kdWxlJztcbmltcG9ydCB7IFVuaXRBZGRyZXNzRm9ybU1vZHVsZSB9IGZyb20gJy4vZm9ybS91bml0LWFkZHJlc3MtZm9ybS5tb2R1bGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgVW5pdEFkZHJlc3NMaXN0TW9kdWxlLFxuICAgIFVuaXRBZGRyZXNzRGV0YWlsc01vZHVsZSxcbiAgICBVbml0QWRkcmVzc0Zvcm1Nb2R1bGUsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFVuaXRBZGRyZXNzTW9kdWxlIHt9XG4iXX0=