/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { CustomerTicketingMessagesComponent } from './customer-ticketing-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatMessagingModule } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export class CustomerTicketingMessagesModule {
}
CustomerTicketingMessagesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CustomerTicketingMessagesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesModule, declarations: [CustomerTicketingMessagesComponent], imports: [CommonModule,
        I18nModule,
        UrlModule,
        ChatMessagingModule,
        ReactiveFormsModule,
        FormsModule], exports: [CustomerTicketingMessagesComponent] });
CustomerTicketingMessagesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                SupportTicketUpdateComponent: {
                    component: CustomerTicketingMessagesComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        I18nModule,
        UrlModule,
        ChatMessagingModule,
        ReactiveFormsModule,
        FormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: CustomerTicketingMessagesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        I18nModule,
                        UrlModule,
                        ChatMessagingModule,
                        ReactiveFormsModule,
                        FormsModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                SupportTicketUpdateComponent: {
                                    component: CustomerTicketingMessagesComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [CustomerTicketingMessagesComponent],
                    exports: [CustomerTicketingMessagesComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdGlja2V0aW5nLW1lc3NhZ2VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL2ZlYXR1cmUtbGlicy9jdXN0b21lci10aWNrZXRpbmcvY29tcG9uZW50cy9kZXRhaWxzL2N1c3RvbWVyLXRpY2tldGluZy1tZXNzYWdlcy9jdXN0b21lci10aWNrZXRpbmctbWVzc2FnZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0wsU0FBUyxFQUVULFVBQVUsRUFDVixvQkFBb0IsRUFDcEIsU0FBUyxHQUNWLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDN0YsT0FBTyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDOztBQXdCNUQsTUFBTSxPQUFPLCtCQUErQjs7NEhBQS9CLCtCQUErQjs2SEFBL0IsK0JBQStCLGlCQUgzQixrQ0FBa0MsYUFqQi9DLFlBQVk7UUFDWixVQUFVO1FBQ1YsU0FBUztRQUNULG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIsV0FBVyxhQWFILGtDQUFrQzs2SEFFakMsK0JBQStCLGFBYi9CO1FBQ1Qsb0JBQW9CLENBQVk7WUFDOUIsYUFBYSxFQUFFO2dCQUNiLDRCQUE0QixFQUFFO29CQUM1QixTQUFTLEVBQUUsa0NBQWtDO29CQUM3QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUJBQ3BCO2FBQ0Y7U0FDRixDQUFDO0tBQ0gsWUFoQkMsWUFBWTtRQUNaLFVBQVU7UUFDVixTQUFTO1FBQ1QsbUJBQW1CO1FBQ25CLG1CQUFtQjtRQUNuQixXQUFXOzJGQWVGLCtCQUErQjtrQkF0QjNDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixTQUFTO3dCQUNULG1CQUFtQjt3QkFDbkIsbUJBQW1CO3dCQUNuQixXQUFXO3FCQUNaO29CQUNELFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLDRCQUE0QixFQUFFO29DQUM1QixTQUFTLEVBQUUsa0NBQWtDO29DQUM3QyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUNBQ3BCOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7b0JBQ0QsWUFBWSxFQUFFLENBQUMsa0NBQWtDLENBQUM7b0JBQ2xELE9BQU8sRUFBRSxDQUFDLGtDQUFrQyxDQUFDO2lCQUM5QyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQXV0aEd1YXJkLFxuICBDbXNDb25maWcsXG4gIEkxOG5Nb2R1bGUsXG4gIHByb3ZpZGVEZWZhdWx0Q29uZmlnLFxuICBVcmxNb2R1bGUsXG59IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQgeyBDdXN0b21lclRpY2tldGluZ01lc3NhZ2VzQ29tcG9uZW50IH0gZnJvbSAnLi9jdXN0b21lci10aWNrZXRpbmctbWVzc2FnZXMuY29tcG9uZW50JztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQ2hhdE1lc3NhZ2luZ01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvc3RvcmVmcm9udCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgSTE4bk1vZHVsZSxcbiAgICBVcmxNb2R1bGUsXG4gICAgQ2hhdE1lc3NhZ2luZ01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyg8Q21zQ29uZmlnPntcbiAgICAgIGNtc0NvbXBvbmVudHM6IHtcbiAgICAgICAgU3VwcG9ydFRpY2tldFVwZGF0ZUNvbXBvbmVudDoge1xuICAgICAgICAgIGNvbXBvbmVudDogQ3VzdG9tZXJUaWNrZXRpbmdNZXNzYWdlc0NvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ3VzdG9tZXJUaWNrZXRpbmdNZXNzYWdlc0NvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDdXN0b21lclRpY2tldGluZ01lc3NhZ2VzQ29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJUaWNrZXRpbmdNZXNzYWdlc01vZHVsZSB7fVxuIl19