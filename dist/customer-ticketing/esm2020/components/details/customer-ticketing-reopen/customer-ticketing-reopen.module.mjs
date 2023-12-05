/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard, provideDefaultConfig, I18nModule, } from '@spartacus/core';
import { FileUploadModule, FormErrorsModule, IconModule, KeyboardFocusModule, SpinnerModule, } from '@spartacus/storefront';
import { CustomerTicketingReopenComponent } from './customer-ticketing-reopen.component';
import { CustomerTicketingReopenDialogComponent } from './customer-ticketing-reopen-dialog/customer-ticketing-reopen-dialog.component';
import * as i0 from "@angular/core";
export class CustomerTicketingReopenModule {
}
CustomerTicketingReopenModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingReopenModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenModule, declarations: [CustomerTicketingReopenComponent,
        CustomerTicketingReopenDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule,
        SpinnerModule], exports: [CustomerTicketingReopenComponent,
        CustomerTicketingReopenDialogComponent] });
CustomerTicketingReopenModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketReopenComponent: {
                    component: CustomerTicketingReopenComponent,
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingReopenModule, decorators: [{
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
                                SupportTicketReopenComponent: {
                                    component: CustomerTicketingReopenComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [
                        CustomerTicketingReopenComponent,
                        CustomerTicketingReopenDialogComponent,
                    ],
                    exports: [
                        CustomerTicketingReopenComponent,
                        CustomerTicketingReopenDialogComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLXJlb3Blbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY3VzdG9tZXItdGlja2V0aW5nL2NvbXBvbmVudHMvZGV0YWlscy9jdXN0b21lci10aWNrZXRpbmctcmVvcGVuL2N1c3RvbWVyLXRpY2tldGluZy1yZW9wZW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsU0FBUyxFQUVULG9CQUFvQixFQUNwQixVQUFVLEdBQ1gsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QixPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsbUJBQW1CLEVBQ25CLGFBQWEsR0FDZCxNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLCtFQUErRSxDQUFDOztBQWdDdkksTUFBTSxPQUFPLDZCQUE2Qjs7MEhBQTdCLDZCQUE2QjsySEFBN0IsNkJBQTZCLGlCQVJ0QyxnQ0FBZ0M7UUFDaEMsc0NBQXNDLGFBckJ0QyxZQUFZO1FBQ1osVUFBVTtRQUNWLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixnQkFBZ0I7UUFDaEIsYUFBYSxhQWlCYixnQ0FBZ0M7UUFDaEMsc0NBQXNDOzJIQUc3Qiw2QkFBNkIsYUFuQjdCO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLDRCQUE0QixFQUFFO29CQUM1QixTQUFTLEVBQUUsZ0NBQWdDO29CQUMzQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFsQkMsWUFBWTtRQUNaLFVBQVU7UUFDVixVQUFVO1FBQ1YsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsZ0JBQWdCO1FBQ2hCLGFBQWE7MkZBcUJKLDZCQUE2QjtrQkE5QnpDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixVQUFVO3dCQUNWLG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixnQkFBZ0I7d0JBQ2hCLGdCQUFnQjt3QkFDaEIsYUFBYTtxQkFDZDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiw0QkFBNEIsRUFBRTtvQ0FDNUIsU0FBUyxFQUFFLGdDQUFnQztvQ0FDM0MsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lDQUNwQjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRTt3QkFDWixnQ0FBZ0M7d0JBQ2hDLHNDQUFzQztxQkFDdkM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdDQUFnQzt3QkFDaEMsc0NBQXNDO3FCQUN2QztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7XG4gIEF1dGhHdWFyZCxcbiAgQ21zQ29uZmlnLFxuICBwcm92aWRlRGVmYXVsdENvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIEZpbGVVcGxvYWRNb2R1bGUsXG4gIEZvcm1FcnJvcnNNb2R1bGUsXG4gIEljb25Nb2R1bGUsXG4gIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gIFNwaW5uZXJNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5pbXBvcnQgeyBDdXN0b21lclRpY2tldGluZ1Jlb3BlbkNvbXBvbmVudCB9IGZyb20gJy4vY3VzdG9tZXItdGlja2V0aW5nLXJlb3Blbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VzdG9tZXJUaWNrZXRpbmdSZW9wZW5EaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2N1c3RvbWVyLXRpY2tldGluZy1yZW9wZW4tZGlhbG9nL2N1c3RvbWVyLXRpY2tldGluZy1yZW9wZW4tZGlhbG9nLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIEtleWJvYXJkRm9jdXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBGb3JtRXJyb3JzTW9kdWxlLFxuICAgIEZpbGVVcGxvYWRNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgcHJvdmlkZURlZmF1bHRDb25maWcoPENtc0NvbmZpZz57XG4gICAgICBjbXNDb21wb25lbnRzOiB7XG4gICAgICAgIFN1cHBvcnRUaWNrZXRSZW9wZW5Db21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IEN1c3RvbWVyVGlja2V0aW5nUmVvcGVuQ29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBDdXN0b21lclRpY2tldGluZ1Jlb3BlbkNvbXBvbmVudCxcbiAgICBDdXN0b21lclRpY2tldGluZ1Jlb3BlbkRpYWxvZ0NvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEN1c3RvbWVyVGlja2V0aW5nUmVvcGVuQ29tcG9uZW50LFxuICAgIEN1c3RvbWVyVGlja2V0aW5nUmVvcGVuRGlhbG9nQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21lclRpY2tldGluZ1Jlb3Blbk1vZHVsZSB7fVxuIl19