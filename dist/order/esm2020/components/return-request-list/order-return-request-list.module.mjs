/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { ListNavigationModule } from '@spartacus/storefront';
import { OrderReturnRequestListComponent } from './order-return-request-list.component';
import * as i0 from "@angular/core";
export class ReturnRequestListModule {
}
ReturnRequestListModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestListModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ReturnRequestListModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestListModule, declarations: [OrderReturnRequestListComponent], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule], exports: [OrderReturnRequestListComponent] });
ReturnRequestListModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestListModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                OrderReturnRequestListComponent: {
                    component: OrderReturnRequestListComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        RouterModule,
        ListNavigationModule,
        UrlModule,
        I18nModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ReturnRequestListModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        RouterModule,
                        ListNavigationModule,
                        UrlModule,
                        I18nModule,
                    ],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                OrderReturnRequestListComponent: {
                                    component: OrderReturnRequestListComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                    declarations: [OrderReturnRequestListComponent],
                    exports: [OrderReturnRequestListComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItcmV0dXJuLXJlcXVlc3QtbGlzdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9yZXR1cm4tcmVxdWVzdC1saXN0L29yZGVyLXJldHVybi1yZXF1ZXN0LWxpc3QubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzdELE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLHVDQUF1QyxDQUFDOztBQXVCeEYsTUFBTSxPQUFPLHVCQUF1Qjs7b0hBQXZCLHVCQUF1QjtxSEFBdkIsdUJBQXVCLGlCQUhuQiwrQkFBK0IsYUFoQjVDLFlBQVk7UUFDWixZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxVQUFVLGFBYUYsK0JBQStCO3FIQUU5Qix1QkFBdUIsYUFidkI7UUFDVCxvQkFBb0IsQ0FBWTtZQUM5QixhQUFhLEVBQUU7Z0JBQ2IsK0JBQStCLEVBQUU7b0JBQy9CLFNBQVMsRUFBRSwrQkFBK0I7b0JBQzFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztpQkFDcEI7YUFDRjtTQUNGLENBQUM7S0FDSCxZQWZDLFlBQVk7UUFDWixZQUFZO1FBQ1osb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxVQUFVOzJGQWVELHVCQUF1QjtrQkFyQm5DLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLFNBQVM7d0JBQ1QsVUFBVTtxQkFDWDtvQkFDRCxTQUFTLEVBQUU7d0JBQ1Qsb0JBQW9CLENBQVk7NEJBQzlCLGFBQWEsRUFBRTtnQ0FDYiwrQkFBK0IsRUFBRTtvQ0FDL0IsU0FBUyxFQUFFLCtCQUErQjtvQ0FDMUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lDQUNwQjs2QkFDRjt5QkFDRixDQUFDO3FCQUNIO29CQUNELFlBQVksRUFBRSxDQUFDLCtCQUErQixDQUFDO29CQUMvQyxPQUFPLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztpQkFDM0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IExpc3ROYXZpZ2F0aW9uTW9kdWxlIH0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IE9yZGVyUmV0dXJuUmVxdWVzdExpc3RDb21wb25lbnQgfSBmcm9tICcuL29yZGVyLXJldHVybi1yZXF1ZXN0LWxpc3QuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgTGlzdE5hdmlnYXRpb25Nb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBPcmRlclJldHVyblJlcXVlc3RMaXN0Q29tcG9uZW50OiB7XG4gICAgICAgICAgY29tcG9uZW50OiBPcmRlclJldHVyblJlcXVlc3RMaXN0Q29tcG9uZW50LFxuICAgICAgICAgIGd1YXJkczogW0F1dGhHdWFyZF0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtPcmRlclJldHVyblJlcXVlc3RMaXN0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW09yZGVyUmV0dXJuUmVxdWVzdExpc3RDb21wb25lbnRdLFxufSlcbmV4cG9ydCBjbGFzcyBSZXR1cm5SZXF1ZXN0TGlzdE1vZHVsZSB7fVxuIl19