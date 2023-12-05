/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { AsmCustomer360ComponentsModule, defaultAsmCustomer360Config, } from '@spartacus/asm/customer-360/components';
import { AsmCustomer360CoreModule } from '@spartacus/asm/customer-360/core';
import { AsmCustomer360OccModule } from '@spartacus/asm/customer-360/occ';
import { provideDefaultConfig } from '@spartacus/core';
import * as i0 from "@angular/core";
export class AsmCustomer360Module {
}
AsmCustomer360Module.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Module, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360Module.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Module, imports: [AsmCustomer360CoreModule,
        AsmCustomer360OccModule,
        AsmCustomer360ComponentsModule] });
AsmCustomer360Module.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Module, providers: [provideDefaultConfig(defaultAsmCustomer360Config)], imports: [AsmCustomer360CoreModule,
        AsmCustomer360OccModule,
        AsmCustomer360ComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360Module, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        AsmCustomer360CoreModule,
                        AsmCustomer360OccModule,
                        AsmCustomer360ComponentsModule,
                    ],
                    providers: [provideDefaultConfig(defaultAsmCustomer360Config)],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2N1c3RvbWVyLTM2MC9hc20tY3VzdG9tZXItMzYwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsOEJBQThCLEVBQzlCLDJCQUEyQixHQUM1QixNQUFNLHdDQUF3QyxDQUFDO0FBQ2hELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzVFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQVV2RCxNQUFNLE9BQU8sb0JBQW9COztpSEFBcEIsb0JBQW9CO2tIQUFwQixvQkFBb0IsWUFON0Isd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2Qiw4QkFBOEI7a0hBSXJCLG9CQUFvQixhQUZwQixDQUFDLG9CQUFvQixDQUFDLDJCQUEyQixDQUFDLENBQUMsWUFKNUQsd0JBQXdCO1FBQ3hCLHVCQUF1QjtRQUN2Qiw4QkFBOEI7MkZBSXJCLG9CQUFvQjtrQkFSaEMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1Asd0JBQXdCO3dCQUN4Qix1QkFBdUI7d0JBQ3ZCLDhCQUE4QjtxQkFDL0I7b0JBQ0QsU0FBUyxFQUFFLENBQUMsb0JBQW9CLENBQUMsMkJBQTJCLENBQUMsQ0FBQztpQkFDL0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQXNtQ3VzdG9tZXIzNjBDb21wb25lbnRzTW9kdWxlLFxuICBkZWZhdWx0QXNtQ3VzdG9tZXIzNjBDb25maWcsXG59IGZyb20gJ0BzcGFydGFjdXMvYXNtL2N1c3RvbWVyLTM2MC9jb21wb25lbnRzJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwQ29yZU1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL2N1c3RvbWVyLTM2MC9jb3JlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwT2NjTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9hc20vY3VzdG9tZXItMzYwL29jYyc7XG5pbXBvcnQgeyBwcm92aWRlRGVmYXVsdENvbmZpZyB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBc21DdXN0b21lcjM2MENvcmVNb2R1bGUsXG4gICAgQXNtQ3VzdG9tZXIzNjBPY2NNb2R1bGUsXG4gICAgQXNtQ3VzdG9tZXIzNjBDb21wb25lbnRzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0QXNtQ3VzdG9tZXIzNjBDb25maWcpXSxcbn0pXG5leHBvcnQgY2xhc3MgQXNtQ3VzdG9tZXIzNjBNb2R1bGUge31cbiJdfQ==