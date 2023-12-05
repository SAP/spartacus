/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { I18nModule, provideDefaultConfig } from '@spartacus/core';
import { PDFInvoicesComponentsModule } from '@spartacus/pdf-invoices/components';
import { IconModule, KeyboardFocusModule, PaginationModule, SortingModule, SpinnerModule, } from '@spartacus/storefront';
import { defaultMyAccountV2DownloadInvoicesLayoutConfig } from './default-my-account-v2-download-invoices-layout.config';
import { MyAccountV2DownloadInvoicesEventListener } from './my-account-v2-download-invoices-event.listener';
import { MyAccountV2DownloadInvoicesComponent } from './my-account-v2-download-invoices.component';
import * as i0 from "@angular/core";
export class MyAccountV2DownloadInvoicesModule {
    constructor() {
        this.downloadInvoicesDialogEventListener = inject(MyAccountV2DownloadInvoicesEventListener);
    }
}
MyAccountV2DownloadInvoicesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MyAccountV2DownloadInvoicesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesModule, declarations: [MyAccountV2DownloadInvoicesComponent], imports: [CommonModule,
        KeyboardFocusModule,
        IconModule,
        I18nModule,
        PaginationModule,
        SortingModule,
        SpinnerModule,
        PDFInvoicesComponentsModule], exports: [MyAccountV2DownloadInvoicesComponent] });
MyAccountV2DownloadInvoicesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesModule, providers: [
        provideDefaultConfig(defaultMyAccountV2DownloadInvoicesLayoutConfig),
    ], imports: [CommonModule,
        KeyboardFocusModule,
        IconModule,
        I18nModule,
        PaginationModule,
        SortingModule,
        SpinnerModule,
        PDFInvoicesComponentsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MyAccountV2DownloadInvoicesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        KeyboardFocusModule,
                        IconModule,
                        I18nModule,
                        PaginationModule,
                        SortingModule,
                        SpinnerModule,
                        PDFInvoicesComponentsModule,
                    ],
                    providers: [
                        provideDefaultConfig(defaultMyAccountV2DownloadInvoicesLayoutConfig),
                    ],
                    exports: [MyAccountV2DownloadInvoicesComponent],
                    declarations: [MyAccountV2DownloadInvoicesComponent],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktYWNjb3VudC12Mi1kb3dubG9hZC1pbnZvaWNlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvb3JkZXIvY29tcG9uZW50cy9vcmRlci1kZXRhaWxzL215LWFjY291bnQtdjIvZG93bmxvYWQtaW52b2ljZXMvbXktYWNjb3VudC12Mi1kb3dubG9hZC1pbnZvaWNlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDbkUsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDakYsT0FBTyxFQUNMLFVBQVUsRUFDVixtQkFBbUIsRUFDbkIsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixhQUFhLEdBQ2QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsOENBQThDLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUN6SCxPQUFPLEVBQUUsd0NBQXdDLEVBQUUsTUFBTSxrREFBa0QsQ0FBQztBQUM1RyxPQUFPLEVBQUUsb0NBQW9DLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7QUFtQm5HLE1BQU0sT0FBTyxpQ0FBaUM7SUFqQjlDO1FBa0JZLHdDQUFtQyxHQUFHLE1BQU0sQ0FDcEQsd0NBQXdDLENBQ3pDLENBQUM7S0FDSDs7OEhBSlksaUNBQWlDOytIQUFqQyxpQ0FBaUMsaUJBRjdCLG9DQUFvQyxhQWJqRCxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFVBQVU7UUFDVixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixhQUFhO1FBQ2IsMkJBQTJCLGFBS25CLG9DQUFvQzsrSEFHbkMsaUNBQWlDLGFBTmpDO1FBQ1Qsb0JBQW9CLENBQUMsOENBQThDLENBQUM7S0FDckUsWUFYQyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFVBQVU7UUFDVixVQUFVO1FBQ1YsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixhQUFhO1FBQ2IsMkJBQTJCOzJGQVFsQixpQ0FBaUM7a0JBakI3QyxRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLG1CQUFtQjt3QkFDbkIsVUFBVTt3QkFDVixVQUFVO3dCQUNWLGdCQUFnQjt3QkFDaEIsYUFBYTt3QkFDYixhQUFhO3dCQUNiLDJCQUEyQjtxQkFDNUI7b0JBQ0QsU0FBUyxFQUFFO3dCQUNULG9CQUFvQixDQUFDLDhDQUE4QyxDQUFDO3FCQUNyRTtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztvQkFDL0MsWUFBWSxFQUFFLENBQUMsb0NBQW9DLENBQUM7aUJBQ3JEIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IGluamVjdCwgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEkxOG5Nb2R1bGUsIHByb3ZpZGVEZWZhdWx0Q29uZmlnIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcbmltcG9ydCB7IFBERkludm9pY2VzQ29tcG9uZW50c01vZHVsZSB9IGZyb20gJ0BzcGFydGFjdXMvcGRmLWludm9pY2VzL2NvbXBvbmVudHMnO1xuaW1wb3J0IHtcbiAgSWNvbk1vZHVsZSxcbiAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgUGFnaW5hdGlvbk1vZHVsZSxcbiAgU29ydGluZ01vZHVsZSxcbiAgU3Bpbm5lck1vZHVsZSxcbn0gZnJvbSAnQHNwYXJ0YWN1cy9zdG9yZWZyb250JztcbmltcG9ydCB7IGRlZmF1bHRNeUFjY291bnRWMkRvd25sb2FkSW52b2ljZXNMYXlvdXRDb25maWcgfSBmcm9tICcuL2RlZmF1bHQtbXktYWNjb3VudC12Mi1kb3dubG9hZC1pbnZvaWNlcy1sYXlvdXQuY29uZmlnJztcbmltcG9ydCB7IE15QWNjb3VudFYyRG93bmxvYWRJbnZvaWNlc0V2ZW50TGlzdGVuZXIgfSBmcm9tICcuL215LWFjY291bnQtdjItZG93bmxvYWQtaW52b2ljZXMtZXZlbnQubGlzdGVuZXInO1xuaW1wb3J0IHsgTXlBY2NvdW50VjJEb3dubG9hZEludm9pY2VzQ29tcG9uZW50IH0gZnJvbSAnLi9teS1hY2NvdW50LXYyLWRvd25sb2FkLWludm9pY2VzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgS2V5Ym9hcmRGb2N1c01vZHVsZSxcbiAgICBJY29uTW9kdWxlLFxuICAgIEkxOG5Nb2R1bGUsXG4gICAgUGFnaW5hdGlvbk1vZHVsZSxcbiAgICBTb3J0aW5nTW9kdWxlLFxuICAgIFNwaW5uZXJNb2R1bGUsXG4gICAgUERGSW52b2ljZXNDb21wb25lbnRzTW9kdWxlLFxuICBdLFxuICBwcm92aWRlcnM6IFtcbiAgICBwcm92aWRlRGVmYXVsdENvbmZpZyhkZWZhdWx0TXlBY2NvdW50VjJEb3dubG9hZEludm9pY2VzTGF5b3V0Q29uZmlnKSxcbiAgXSxcbiAgZXhwb3J0czogW015QWNjb3VudFYyRG93bmxvYWRJbnZvaWNlc0NvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW015QWNjb3VudFYyRG93bmxvYWRJbnZvaWNlc0NvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE15QWNjb3VudFYyRG93bmxvYWRJbnZvaWNlc01vZHVsZSB7XG4gIHByb3RlY3RlZCBkb3dubG9hZEludm9pY2VzRGlhbG9nRXZlbnRMaXN0ZW5lciA9IGluamVjdChcbiAgICBNeUFjY291bnRWMkRvd25sb2FkSW52b2ljZXNFdmVudExpc3RlbmVyXG4gICk7XG59XG4iXX0=