/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { ItemExistsModule } from '../../shared/item-exists.module';
import { CardModule } from '../../shared/card/card.module';
import { ToggleStatusModule } from '../../shared/detail/toggle-status-action/toggle-status.module';
import { BudgetDetailsComponent } from './budget-details.component';
import { DisableInfoModule } from '../../shared/detail/disable-info/disable-info.module';
import * as i0 from "@angular/core";
export class BudgetDetailsModule {
}
BudgetDetailsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BudgetDetailsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsModule, declarations: [BudgetDetailsComponent], imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule] });
BudgetDetailsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsModule, imports: [CommonModule,
        CardModule,
        RouterModule,
        UrlModule,
        I18nModule,
        ToggleStatusModule,
        ItemExistsModule,
        DisableInfoModule,
        KeyboardFocusModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetDetailsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        CardModule,
                        RouterModule,
                        UrlModule,
                        I18nModule,
                        ToggleStatusModule,
                        ItemExistsModule,
                        DisableInfoModule,
                        KeyboardFocusModule,
                    ],
                    declarations: [BudgetDetailsComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LWRldGFpbHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2J1ZGdldC9kZXRhaWxzL2J1ZGdldC1kZXRhaWxzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtEQUErRCxDQUFDO0FBQ25HLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNEQUFzRCxDQUFDOztBQWdCekYsTUFBTSxPQUFPLG1CQUFtQjs7Z0hBQW5CLG1CQUFtQjtpSEFBbkIsbUJBQW1CLGlCQUZmLHNCQUFzQixhQVZuQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLG1CQUFtQjtpSEFJVixtQkFBbUIsWUFaNUIsWUFBWTtRQUNaLFVBQVU7UUFDVixZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixrQkFBa0I7UUFDbEIsZ0JBQWdCO1FBQ2hCLGlCQUFpQjtRQUNqQixtQkFBbUI7MkZBSVYsbUJBQW1CO2tCQWQvQixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsWUFBWTt3QkFDWixTQUFTO3dCQUNULFVBQVU7d0JBQ1Ysa0JBQWtCO3dCQUNsQixnQkFBZ0I7d0JBQ2hCLGlCQUFpQjt3QkFDakIsbUJBQW1CO3FCQUNwQjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztpQkFDdkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBJMThuTW9kdWxlLCBVcmxNb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgS2V5Ym9hcmRGb2N1c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBJdGVtRXhpc3RzTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2l0ZW0tZXhpc3RzLm1vZHVsZSc7XG5pbXBvcnQgeyBDYXJkTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2NhcmQvY2FyZC5tb2R1bGUnO1xuaW1wb3J0IHsgVG9nZ2xlU3RhdHVzTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2RldGFpbC90b2dnbGUtc3RhdHVzLWFjdGlvbi90b2dnbGUtc3RhdHVzLm1vZHVsZSc7XG5pbXBvcnQgeyBCdWRnZXREZXRhaWxzQ29tcG9uZW50IH0gZnJvbSAnLi9idWRnZXQtZGV0YWlscy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGlzYWJsZUluZm9Nb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvZGV0YWlsL2Rpc2FibGUtaW5mby9kaXNhYmxlLWluZm8ubW9kdWxlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBDYXJkTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBUb2dnbGVTdGF0dXNNb2R1bGUsXG4gICAgSXRlbUV4aXN0c01vZHVsZSxcbiAgICBEaXNhYmxlSW5mb01vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtCdWRnZXREZXRhaWxzQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQnVkZ2V0RGV0YWlsc01vZHVsZSB7fVxuIl19