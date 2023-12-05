/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsmCustomer360Adapter } from '@spartacus/asm/customer-360/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccAsmCustomer360Config } from './adapters/default-occ-asm-customer-360-config';
import { OccAsmCustomer360Adapter } from './adapters/occ-asm-customer-360.adapter';
import * as i0 from "@angular/core";
export class AsmCustomer360OccModule {
}
AsmCustomer360OccModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360OccModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AsmCustomer360OccModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360OccModule, imports: [CommonModule] });
AsmCustomer360OccModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360OccModule, providers: [
        provideDefaultConfig(defaultOccAsmCustomer360Config),
        {
            provide: AsmCustomer360Adapter,
            useClass: OccAsmCustomer360Adapter,
        },
    ], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AsmCustomer360OccModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    providers: [
                        provideDefaultConfig(defaultOccAsmCustomer360Config),
                        {
                            provide: AsmCustomer360Adapter,
                            useClass: OccAsmCustomer360Adapter,
                        },
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNtLWN1c3RvbWVyLTM2MC1vY2MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL2FzbS9jdXN0b21lci0zNjAvb2NjL2FzbS1jdXN0b21lci0zNjAtb2NjLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFFLDhCQUE4QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDaEcsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBWW5GLE1BQU0sT0FBTyx1QkFBdUI7O29IQUF2Qix1QkFBdUI7cUhBQXZCLHVCQUF1QixZQVR4QixZQUFZO3FIQVNYLHVCQUF1QixhQVJ2QjtRQUNULG9CQUFvQixDQUFDLDhCQUE4QixDQUFDO1FBQ3BEO1lBQ0UsT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixRQUFRLEVBQUUsd0JBQXdCO1NBQ25DO0tBQ0YsWUFQUyxZQUFZOzJGQVNYLHVCQUF1QjtrQkFWbkMsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBQyw4QkFBOEIsQ0FBQzt3QkFDcEQ7NEJBQ0UsT0FBTyxFQUFFLHFCQUFxQjs0QkFDOUIsUUFBUSxFQUFFLHdCQUF3Qjt5QkFDbkM7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFzbUN1c3RvbWVyMzYwQWRhcHRlciB9IGZyb20gJ0BzcGFydGFjdXMvYXNtL2N1c3RvbWVyLTM2MC9jb3JlJztcbmltcG9ydCB7IHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IGRlZmF1bHRPY2NBc21DdXN0b21lcjM2MENvbmZpZyB9IGZyb20gJy4vYWRhcHRlcnMvZGVmYXVsdC1vY2MtYXNtLWN1c3RvbWVyLTM2MC1jb25maWcnO1xuaW1wb3J0IHsgT2NjQXNtQ3VzdG9tZXIzNjBBZGFwdGVyIH0gZnJvbSAnLi9hZGFwdGVycy9vY2MtYXNtLWN1c3RvbWVyLTM2MC5hZGFwdGVyJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKGRlZmF1bHRPY2NBc21DdXN0b21lcjM2MENvbmZpZyksXG4gICAge1xuICAgICAgcHJvdmlkZTogQXNtQ3VzdG9tZXIzNjBBZGFwdGVyLFxuICAgICAgdXNlQ2xhc3M6IE9jY0FzbUN1c3RvbWVyMzYwQWRhcHRlcixcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBc21DdXN0b21lcjM2ME9jY01vZHVsZSB7fVxuIl19