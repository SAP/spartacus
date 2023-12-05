/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { FileUploadModule, FormErrorsModule, IconModule, KeyboardFocusModule, } from '@spartacus/storefront';
import { CustomerTicketingCreateDialogComponent } from './customer-ticketing-create-dialog/customer-ticketing-create-dialog.component';
import { CustomerTicketingCreateComponent } from './customer-ticketing-create.component';
import * as i0 from "@angular/core";
export class CustomerTicketingCreateModule {
}
CustomerTicketingCreateModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingCreateModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateModule, declarations: [CustomerTicketingCreateComponent,
        CustomerTicketingCreateDialogComponent], imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule], exports: [CustomerTicketingCreateComponent,
        CustomerTicketingCreateDialogComponent] });
CustomerTicketingCreateModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateModule, imports: [CommonModule,
        I18nModule,
        IconModule,
        KeyboardFocusModule,
        ReactiveFormsModule,
        FormErrorsModule,
        FileUploadModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingCreateModule, decorators: [{
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
                    ],
                    declarations: [
                        CustomerTicketingCreateComponent,
                        CustomerTicketingCreateDialogComponent,
                    ],
                    exports: [
                        CustomerTicketingCreateComponent,
                        CustomerTicketingCreateDialogComponent,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLWNyZWF0ZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvY3VzdG9tZXItdGlja2V0aW5nL2NvbXBvbmVudHMvbGlzdC9jdXN0b21lci10aWNrZXRpbmctY3JlYXRlL2N1c3RvbWVyLXRpY2tldGluZy1jcmVhdGUubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUNMLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLG1CQUFtQixHQUNwQixNQUFNLHVCQUF1QixDQUFDO0FBQy9CLE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSxNQUFNLCtFQUErRSxDQUFDO0FBQ3ZJLE9BQU8sRUFBRSxnQ0FBZ0MsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQXFCekYsTUFBTSxPQUFPLDZCQUE2Qjs7MEhBQTdCLDZCQUE2QjsySEFBN0IsNkJBQTZCLGlCQVJ0QyxnQ0FBZ0M7UUFDaEMsc0NBQXNDLGFBVnRDLFlBQVk7UUFDWixVQUFVO1FBQ1YsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLGdCQUFnQixhQU9oQixnQ0FBZ0M7UUFDaEMsc0NBQXNDOzJIQUc3Qiw2QkFBNkIsWUFqQnRDLFlBQVk7UUFDWixVQUFVO1FBQ1YsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIsZ0JBQWdCO1FBQ2hCLGdCQUFnQjsyRkFXUCw2QkFBNkI7a0JBbkJ6QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsZ0JBQWdCO3dCQUNoQixnQkFBZ0I7cUJBQ2pCO29CQUNELFlBQVksRUFBRTt3QkFDWixnQ0FBZ0M7d0JBQ2hDLHNDQUFzQztxQkFDdkM7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGdDQUFnQzt3QkFDaEMsc0NBQXNDO3FCQUN2QztpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHtcbiAgRmlsZVVwbG9hZE1vZHVsZSxcbiAgRm9ybUVycm9yc01vZHVsZSxcbiAgSWNvbk1vZHVsZSxcbiAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEN1c3RvbWVyVGlja2V0aW5nQ3JlYXRlRGlhbG9nQ29tcG9uZW50IH0gZnJvbSAnLi9jdXN0b21lci10aWNrZXRpbmctY3JlYXRlLWRpYWxvZy9jdXN0b21lci10aWNrZXRpbmctY3JlYXRlLWRpYWxvZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ3VzdG9tZXJUaWNrZXRpbmdDcmVhdGVDb21wb25lbnQgfSBmcm9tICcuL2N1c3RvbWVyLXRpY2tldGluZy1jcmVhdGUuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEZvcm1FcnJvcnNNb2R1bGUsXG4gICAgRmlsZVVwbG9hZE1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ3VzdG9tZXJUaWNrZXRpbmdDcmVhdGVDb21wb25lbnQsXG4gICAgQ3VzdG9tZXJUaWNrZXRpbmdDcmVhdGVEaWFsb2dDb21wb25lbnQsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBDdXN0b21lclRpY2tldGluZ0NyZWF0ZUNvbXBvbmVudCxcbiAgICBDdXN0b21lclRpY2tldGluZ0NyZWF0ZURpYWxvZ0NvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdDcmVhdGVNb2R1bGUge31cbiJdfQ==