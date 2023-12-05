/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, I18nModule, provideDefaultConfig, } from '@spartacus/core';
import { CustomerTicketingCloseComponent } from './customer-ticketing-close.component';
import { CustomerTicketingCloseDialogComponent } from './customer-ticketing-close-dialog/customer-ticketing-close-dialog.component';
import { FileUploadModule, FormErrorsModule, IconModule, KeyboardFocusModule, SpinnerModule, } from '@spartacus/storefront';
import { ReactiveFormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
export class CustomerTicketingCloseModule {
}
CustomerTicketingCloseModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingCloseModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseModule, declarations: [CustomerTicketingCloseComponent,
        CustomerTicketingCloseDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule,
        SpinnerModule], exports: [CustomerTicketingCloseComponent,
        CustomerTicketingCloseDialogComponent] });
CustomerTicketingCloseModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketCloseComponent: {
                    component: CustomerTicketingCloseComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCloseModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        IconModule,
                        KeyboardFocusModule,
                        ReactiveFormsModule,
                        FormErrorsModule,
                        FileUploadModule,
                        SpinnerModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SupportTicketCloseComponent: {
                                    component: CustomerTicketingCloseComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        CustomerTicketingCloseComponent,
                        CustomerTicketingCloseDialogComponent,
                    ],
                    exports: [
                        CustomerTicketingCloseComponent,
                        CustomerTicketingCloseDialogComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLWNsb3NlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jdXN0b21lci10aWNrZXRpbmcvY29tcG9uZW50cy9kZXRhaWxzL2N1c3RvbWVyLXRpY2tldGluZy1jbG9zZS9jdXN0b21lci10aWNrZXRpbmctY2xvc2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixvQkFBb0IsR0FDckIsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RixPQUFPLEVBQUUscUNBQXFDLEVBQUUsTUFBTSw2RUFBNkUsQ0FBQztBQUNwSSxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLGFBQWEsR0FDZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQWdDckQsTUFBTSxPQUFPLDRCQUE0Qjs7eUhBQTVCLDRCQUE0QjswSEFBNUIsNEJBQTRCLGlCQVJyQywrQkFBK0I7UUFDL0IscUNBQXFDLGFBckJyQyxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsYUFBYSxhQWlCYiwrQkFBK0I7UUFDL0IscUNBQXFDOzBIQUc1Qiw0QkFBNEIsYUFuQjVCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLDJCQUEyQixFQUFFO29CQUMzQixTQUFTLEVBQUUsK0JBQStCO29CQUMxQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFsQkMsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGFBQWE7MkZBcUJKLDRCQUE0QjtrQkE5QnhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixVQUFVO3dCQUNWLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsYUFBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiwyQkFBMkIsRUFBRTtvQ0FDM0IsU0FBUyxFQUFFLCtCQUErQjtvQ0FDMUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lDQUNwQjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRTt3QkFDWiwrQkFBK0I7d0JBQy9CLHFDQUFxQztxQkFDdEM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLCtCQUErQjt3QkFDL0IscUNBQXFDO3FCQUN0QztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tZXJUaWNrZXRpbmdDbG9zZUNvbXBvbmVudCB9IGZyb20gJy4vY3VzdG9tZXItdGlja2V0aW5nLWNsb3NlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDdXN0b21lclRpY2tldGluZ0Nsb3NlRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jdXN0b21lci10aWNrZXRpbmctY2xvc2UtZGlhbG9nL2N1c3RvbWVyLXRpY2tldGluZy1jbG9zZS1kaWFsb2cuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIEZpbGVVcGxvYWRNb2R1bGUsXG4gIEZvcm1FcnJvcnNNb2R1bGUsXG4gIEljb25Nb2R1bGUsXG4gIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgSWNvbk1vZHVsZSxcbiAgICBLZXlib2FyZEZvY3VzTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgRm9ybUVycm9yc01vZHVsZSxcbiAgICBGaWxlVXBsb2FkTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBTdXBwb3J0VGlja2V0Q2xvc2VDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IEN1c3RvbWVyVGlja2V0aW5nQ2xvc2VDb21wb25lbnQsXG4gICAgICAgICAgZ3VhcmRzOiBbQXV0aEd1YXJkXSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEN1c3RvbWVyVGlja2V0aW5nQ2xvc2VDb21wb25lbnQsXG4gICAgQ3VzdG9tZXJUaWNrZXRpbmdDbG9zZURpYWxvZ0NvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEN1c3RvbWVyVGlja2V0aW5nQ2xvc2VDb21wb25lbnQsXG4gICAgQ3VzdG9tZXJUaWNrZXRpbmdDbG9zZURpYWxvZ0NvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdDbG9zZU1vZHVsZSB7fVxuIl19