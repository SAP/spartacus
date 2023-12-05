/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AccountSummaryDocumentFilterComponent } from './account-summary-document-filter.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule, FormErrorsModule, NgSelectA11yModule, } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export class AccountSummaryDocumentFilterModule {
}
AccountSummaryDocumentFilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AccountSummaryDocumentFilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterModule, declarations: [AccountSummaryDocumentFilterComponent], imports: [CommonModule,
        I18nModule,
        NgSelectModule,
        NgSelectA11yModule,
        ReactiveFormsModule,
        DatePickerModule,
        FormErrorsModule], exports: [AccountSummaryDocumentFilterComponent] });
AccountSummaryDocumentFilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterModule, imports: [CommonModule,
        I18nModule,
        NgSelectModule,
        NgSelectA11yModule,
        ReactiveFormsModule,
        DatePickerModule,
        FormErrorsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: AccountSummaryDocumentFilterModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AccountSummaryDocumentFilterComponent],
                    imports: [
                        CommonModule,
                        I18nModule,
                        NgSelectModule,
                        NgSelectA11yModule,
                        ReactiveFormsModule,
                        DatePickerModule,
                        FormErrorsModule,
                    ],
                    exports: [AccountSummaryDocumentFilterComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC1zdW1tYXJ5LWRvY3VtZW50LWZpbHRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JnYW5pemF0aW9uL2FjY291bnQtc3VtbWFyeS9jb21wb25lbnRzL2RldGFpbHMvZG9jdW1lbnQvZmlsdGVyL2FjY291bnQtc3VtbWFyeS1kb2N1bWVudC1maWx0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDcEcsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLGtCQUFrQixHQUNuQixNQUFNLHVCQUF1QixDQUFDOztBQWUvQixNQUFNLE9BQU8sa0NBQWtDOzsrSEFBbEMsa0NBQWtDO2dJQUFsQyxrQ0FBa0MsaUJBWjlCLHFDQUFxQyxhQUVsRCxZQUFZO1FBQ1osVUFBVTtRQUNWLGNBQWM7UUFDZCxrQkFBa0I7UUFDbEIsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixnQkFBZ0IsYUFFUixxQ0FBcUM7Z0lBRXBDLGtDQUFrQyxZQVYzQyxZQUFZO1FBQ1osVUFBVTtRQUNWLGNBQWM7UUFDZCxrQkFBa0I7UUFDbEIsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixnQkFBZ0I7MkZBSVAsa0NBQWtDO2tCQWI5QyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLHFDQUFxQyxDQUFDO29CQUNyRCxPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixVQUFVO3dCQUNWLGNBQWM7d0JBQ2Qsa0JBQWtCO3dCQUNsQixtQkFBbUI7d0JBQ25CLGdCQUFnQjt3QkFDaEIsZ0JBQWdCO3FCQUNqQjtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztpQkFDakQiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQWNjb3VudFN1bW1hcnlEb2N1bWVudEZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4vYWNjb3VudC1zdW1tYXJ5LWRvY3VtZW50LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdTZWxlY3RNb2R1bGUgfSBmcm9tICdAbmctc2VsZWN0L25nLXNlbGVjdCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgRGF0ZVBpY2tlck1vZHVsZSxcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgTmdTZWxlY3RBMTF5TW9kdWxlLFxufSBmcm9tICdAc3BhcnRhY3VzL3N0b3JlZnJvbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtBY2NvdW50U3VtbWFyeURvY3VtZW50RmlsdGVyQ29tcG9uZW50XSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIE5nU2VsZWN0TW9kdWxlLFxuICAgIE5nU2VsZWN0QTExeU1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIERhdGVQaWNrZXJNb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgXSxcbiAgZXhwb3J0czogW0FjY291bnRTdW1tYXJ5RG9jdW1lbnRGaWx0ZXJDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBBY2NvdW50U3VtbWFyeURvY3VtZW50RmlsdGVyTW9kdWxlIHt9XG4iXX0=