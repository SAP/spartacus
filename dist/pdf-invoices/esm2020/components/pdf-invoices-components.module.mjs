/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard, I18nModule, provideDefaultConfig, UrlModule, } from '@spartacus/core';
import { DatePickerModule, IconModule, ListNavigationModule, MediaModule, SpinnerModule, } from '@spartacus/storefront';
import { InvoicesListComponent } from './invoices-list/invoices-list.component';
import * as i0 from "@angular/core";
export class PDFInvoicesComponentsModule {
}
PDFInvoicesComponentsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesComponentsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PDFInvoicesComponentsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesComponentsModule, declarations: [InvoicesListComponent], imports: [CommonModule,
        DatePickerModule,
        I18nModule,
        ReactiveFormsModule,
        ListNavigationModule,
        UrlModule,
        IconModule,
        MediaModule,
        SpinnerModule], exports: [InvoicesListComponent] });
PDFInvoicesComponentsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesComponentsModule, providers: [
        provideDefaultConfig({
            cmsComponents: {
                AccountOrderDetailsPDFInvoicesComponent: {
                    component: InvoicesListComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ], imports: [CommonModule,
        DatePickerModule,
        I18nModule,
        ReactiveFormsModule,
        ListNavigationModule,
        UrlModule,
        IconModule,
        MediaModule,
        SpinnerModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PDFInvoicesComponentsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        DatePickerModule,
                        I18nModule,
                        ReactiveFormsModule,
                        ListNavigationModule,
                        UrlModule,
                        IconModule,
                        MediaModule,
                        SpinnerModule,
                    ],
                    declarations: [InvoicesListComponent],
                    exports: [InvoicesListComponent],
                    providers: [
                        provideDefaultConfig({
                            cmsComponents: {
                                AccountOrderDetailsPDFInvoicesComponent: {
                                    component: InvoicesListComponent,
                                    guards: [AuthGuard],
                                },
                            },
                        }),
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmLWludm9pY2VzLWNvbXBvbmVudHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vZmVhdHVyZS1saWJzL3BkZi1pbnZvaWNlcy9jb21wb25lbnRzL3BkZi1pbnZvaWNlcy1jb21wb25lbnRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUNMLFNBQVMsRUFFVCxVQUFVLEVBQ1Ysb0JBQW9CLEVBQ3BCLFNBQVMsR0FDVixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsYUFBYSxHQUNkLE1BQU0sdUJBQXVCLENBQUM7QUFDL0IsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7O0FBMkJoRixNQUFNLE9BQU8sMkJBQTJCOzt3SEFBM0IsMkJBQTJCO3lIQUEzQiwyQkFBMkIsaUJBYnZCLHFCQUFxQixhQVZsQyxZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLFVBQVU7UUFDVixtQkFBbUI7UUFDbkIsb0JBQW9CO1FBQ3BCLFNBQVM7UUFDVCxVQUFVO1FBQ1YsV0FBVztRQUNYLGFBQWEsYUFHTCxxQkFBcUI7eUhBWXBCLDJCQUEyQixhQVgzQjtRQUNULG9CQUFvQixDQUFZO1lBQzlCLGFBQWEsRUFBRTtnQkFDYix1Q0FBdUMsRUFBRTtvQkFDdkMsU0FBUyxFQUFFLHFCQUFxQjtvQkFDaEMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUNwQjthQUNGO1NBQ0YsQ0FBQztLQUNILFlBckJDLFlBQVk7UUFDWixnQkFBZ0I7UUFDaEIsVUFBVTtRQUNWLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsU0FBUztRQUNULFVBQVU7UUFDVixXQUFXO1FBQ1gsYUFBYTsyRkFlSiwyQkFBMkI7a0JBekJ2QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGdCQUFnQjt3QkFDaEIsVUFBVTt3QkFDVixtQkFBbUI7d0JBQ25CLG9CQUFvQjt3QkFDcEIsU0FBUzt3QkFDVCxVQUFVO3dCQUNWLFdBQVc7d0JBQ1gsYUFBYTtxQkFDZDtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDckMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ2hDLFNBQVMsRUFBRTt3QkFDVCxvQkFBb0IsQ0FBWTs0QkFDOUIsYUFBYSxFQUFFO2dDQUNiLHVDQUF1QyxFQUFFO29DQUN2QyxTQUFTLEVBQUUscUJBQXFCO29DQUNoQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7aUNBQ3BCOzZCQUNGO3lCQUNGLENBQUM7cUJBQ0g7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBBdXRoR3VhcmQsXG4gIENtc0NvbmZpZyxcbiAgSTE4bk1vZHVsZSxcbiAgcHJvdmlkZURlZmF1bHRDb25maWcsXG4gIFVybE1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7XG4gIERhdGVQaWNrZXJNb2R1bGUsXG4gIEljb25Nb2R1bGUsXG4gIExpc3ROYXZpZ2F0aW9uTW9kdWxlLFxuICBNZWRpYU1vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IEludm9pY2VzTGlzdENvbXBvbmVudCB9IGZyb20gJy4vaW52b2ljZXMtbGlzdC9pbnZvaWNlcy1saXN0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRGF0ZVBpY2tlck1vZHVsZSxcbiAgICBJMThuTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgTGlzdE5hdmlnYXRpb25Nb2R1bGUsXG4gICAgVXJsTW9kdWxlLFxuICAgIEljb25Nb2R1bGUsXG4gICAgTWVkaWFNb2R1bGUsXG4gICAgU3Bpbm5lck1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbSW52b2ljZXNMaXN0Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW0ludm9pY2VzTGlzdENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIHByb3ZpZGVEZWZhdWx0Q29uZmlnKDxDbXNDb25maWc+e1xuICAgICAgY21zQ29tcG9uZW50czoge1xuICAgICAgICBBY2NvdW50T3JkZXJEZXRhaWxzUERGSW52b2ljZXNDb21wb25lbnQ6IHtcbiAgICAgICAgICBjb21wb25lbnQ6IEludm9pY2VzTGlzdENvbXBvbmVudCxcbiAgICAgICAgICBndWFyZHM6IFtBdXRoR3VhcmRdLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUERGSW52b2ljZXNDb21wb25lbnRzTW9kdWxlIHt9XG4iXX0=