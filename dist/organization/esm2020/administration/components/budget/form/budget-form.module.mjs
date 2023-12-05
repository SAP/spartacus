/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { DatePickerModule, FormErrorsModule } from '@spartacus/storefront';
import { ItemActiveModule } from '../../shared/item-active.module';
import { FormModule } from '../../shared/form/form.module';
import { BudgetFormComponent } from './budget-form.component';
import * as i0 from "@angular/core";
export class BudgetFormModule {
}
BudgetFormModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
BudgetFormModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormModule, declarations: [BudgetFormComponent], imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        ItemActiveModule,
        DatePickerModule] });
BudgetFormModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormModule, imports: [CommonModule,
        RouterModule,
        FormModule,
        NgSelectModule,
        UrlModule,
        I18nModule,
        ReactiveFormsModule,
        FormErrorsModule,
        ItemActiveModule,
        DatePickerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: BudgetFormModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        FormModule,
                        NgSelectModule,
                        UrlModule,
                        I18nModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        ItemActiveModule,
                        DatePickerModule,
                    ],
                    declarations: [BudgetFormComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LWZvcm0ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL29yZ2FuaXphdGlvbi9hZG1pbmlzdHJhdGlvbi9jb21wb25lbnRzL2J1ZGdldC9mb3JtL2J1ZGdldC1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMzRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7QUFpQjlELE1BQU0sT0FBTyxnQkFBZ0I7OzZHQUFoQixnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFGWixtQkFBbUIsYUFYaEMsWUFBWTtRQUNaLFlBQVk7UUFDWixVQUFVO1FBQ1YsY0FBYztRQUNkLFNBQVM7UUFDVCxVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsZ0JBQWdCOzhHQUlQLGdCQUFnQixZQWJ6QixZQUFZO1FBQ1osWUFBWTtRQUNaLFVBQVU7UUFDVixjQUFjO1FBQ2QsU0FBUztRQUNULFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLGdCQUFnQjtRQUNoQixnQkFBZ0I7MkZBSVAsZ0JBQWdCO2tCQWY1QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixjQUFjO3dCQUNkLFNBQVM7d0JBQ1QsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7cUJBQ2pCO29CQUNELFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDO2lCQUNwQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOZ1NlbGVjdE1vZHVsZSB9IGZyb20gJ0BuZy1zZWxlY3Qvbmctc2VsZWN0JztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIFVybE1vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBEYXRlUGlja2VyTW9kdWxlLCBGb3JtRXJyb3JzTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEl0ZW1BY3RpdmVNb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvaXRlbS1hY3RpdmUubW9kdWxlJztcbmltcG9ydCB7IEZvcm1Nb2R1bGUgfSBmcm9tICcuLi8uLi9zaGFyZWQvZm9ybS9mb3JtLm1vZHVsZSc7XG5pbXBvcnQgeyBCdWRnZXRGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9idWRnZXQtZm9ybS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBGb3JtTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgIFVybE1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBJdGVtQWN0aXZlTW9kdWxlLFxuICAgIERhdGVQaWNrZXJNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW0J1ZGdldEZvcm1Db21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBCdWRnZXRGb3JtTW9kdWxlIHt9XG4iXX0=