/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { PopoverModule } from '@spartacus/storefront';
import { BudgetDetailsCellComponent } from './budget-details-cell.component';
import * as i0 from "@angular/core";
export class BudgetDetailsCellModule {
}
BudgetDetailsCellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BudgetDetailsCellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellModule, declarations: [BudgetDetailsCellComponent], imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule], exports: [BudgetDetailsCellComponent] });
BudgetDetailsCellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellModule, imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsCellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, PopoverModule, RouterModule, I18nModule, UrlModule],
                    declarations: [BudgetDetailsCellComponent],
                    exports: [BudgetDetailsCellComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LWRldGFpbHMtY2VsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FkbWluaXN0cmF0aW9uL2NvbXBvbmVudHMvYnVkZ2V0L2RldGFpbHMtY2VsbC9idWRnZXQtZGV0YWlscy1jZWxsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ3RELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOztBQU83RSxNQUFNLE9BQU8sdUJBQXVCOztvSEFBdkIsdUJBQXVCO3FIQUF2Qix1QkFBdUIsaUJBSG5CLDBCQUEwQixhQUQvQixZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUyxhQUVoRSwwQkFBMEI7cUhBRXpCLHVCQUF1QixZQUp4QixZQUFZLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsU0FBUzsyRkFJL0QsdUJBQXVCO2tCQUxuQyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLENBQUM7b0JBQzNFLFlBQVksRUFBRSxDQUFDLDBCQUEwQixDQUFDO29CQUMxQyxPQUFPLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztpQkFDdEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3Zlck1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBCdWRnZXREZXRhaWxzQ2VsbENvbXBvbmVudCB9IGZyb20gJy4vYnVkZ2V0LWRldGFpbHMtY2VsbC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBQb3BvdmVyTW9kdWxlLCBSb3V0ZXJNb2R1bGUsIEkxOG5Nb2R1bGUsIFVybE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW0J1ZGdldERldGFpbHNDZWxsQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW0J1ZGdldERldGFpbHNDZWxsQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQnVkZ2V0RGV0YWlsc0NlbGxNb2R1bGUge31cbiJdfQ==