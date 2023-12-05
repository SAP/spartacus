import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, NgModule } from '@angular/core';
import * as i2 from '@spartacus/core';
import { GlobalMessageType, I18nModule, UrlModule, provideDefaultConfig, AuthGuard } from '@spartacus/core';
import * as i1 from '@spartacus/pdf-invoices/root';
import { InvoicesFields } from '@spartacus/pdf-invoices/root';
import * as i3 from '@spartacus/storefront';
import { ICON_TYPE, DatePickerModule, ListNavigationModule, IconModule, MediaModule, SpinnerModule } from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, Subscription, combineLatest } from 'rxjs';
import { switchMap, tap, catchError, skip, take } from 'rxjs/operators';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class InvoicesListComponent {
    constructor(pdfInvoicesFacade, translationService, downloadService, languageService, globalMessageService) {
        this.pdfInvoicesFacade = pdfInvoicesFacade;
        this.translationService = translationService;
        this.downloadService = downloadService;
        this.languageService = languageService;
        this.globalMessageService = globalMessageService;
        /* For Enum use in HTML */
        this.ICON_TYPE = ICON_TYPE;
        this.PAGE_SIZE = 5; //Default page size
        this.sort = 'byInvoiceIdAsc';
        this.sortMapping = {
            byCreatedAtAsc: 'invoiceDate:asc',
            byCreatedAtDesc: 'invoiceDate:desc',
            byInvoiceIdAsc: 'invoiceId:asc',
            byInvoiceIdDesc: 'invoiceId:desc',
            byNetAmountAsc: 'netAmount:asc',
            byNetAmountDesc: 'netAmount:desc',
            byTotalAmountAsc: 'totalAmount:asc',
            byTotalAmountDesc: 'totalAmount:desc',
        };
        // Contains the initial query parameters and will be updated with current state of filters
        this._initQueryParams = {
            currentPage: 0,
            pageSize: this.PAGE_SIZE,
            fields: InvoicesFields.FULL,
            sort: this.sortMapping[this.sort], //backend supports sort codes like invoiceId:asc
        };
        // Triggers events on chaning the page, sort options
        this.queryParams$ = new BehaviorSubject(this._initQueryParams);
        // Used by template to subscribe to data from documents api
        this.invoicesList$ = this.queryParams$.pipe(switchMap((param) => this.pdfInvoicesFacade.getInvoicesForOrder(param)), tap((invoicesList) => {
            var _a, _b, _c, _d;
            return (this.pagination = {
                currentPage: (_a = invoicesList.pagination) === null || _a === void 0 ? void 0 : _a.page,
                pageSize: (_b = invoicesList.pagination) === null || _b === void 0 ? void 0 : _b.count,
                totalPages: (_c = invoicesList.pagination) === null || _c === void 0 ? void 0 : _c.totalPages,
                totalResults: (_d = invoicesList.pagination) === null || _d === void 0 ? void 0 : _d.totalCount,
                sort: this.sortMapping[this.sort],
            });
        }), catchError((error) => {
            var _a;
            if (error && ((_a = this.getNotEnabledError(error)) === null || _a === void 0 ? void 0 : _a.length)) {
                this.globalMessageService.add({ key: 'pdfInvoices.featureNotEnabled' }, GlobalMessageType.MSG_TYPE_ERROR);
            }
            return EMPTY;
        }));
        this.subscription = new Subscription();
    }
    ngOnInit() {
        this.subscription.add(this.languageService
            .getActive()
            .pipe(skip(1))
            .subscribe(() => this.updateQueryParams({ fields: InvoicesFields.FULL })));
        this.getSortOptions();
    }
    updateQueryParams(partialParams) {
        // Overwrite each value present in partialParams to _queryParams
        Object.keys(partialParams).forEach((key) => (this._initQueryParams[key] = partialParams[key]));
        // Every request that doesn't specify fields should be set to DEFAULT
        if (!partialParams.fields) {
            this._initQueryParams.fields = InvoicesFields.DEFAULT;
        }
        this.queryParams$.next(this._initQueryParams);
    }
    pageChange(currentPage) {
        this.updateQueryParams({
            currentPage: currentPage,
        });
    }
    sortChange(sortCode) {
        this.sort = sortCode;
        this.updateQueryParams({
            sort: this.sortMapping[sortCode],
            currentPage: 0,
        });
    }
    downloadPDFInvoice(invoiceId, externalSystemId) {
        this.pdfInvoicesFacade
            .getInvoicePDF(invoiceId, externalSystemId)
            .pipe(take(1))
            .subscribe({
            next: (data) => {
                const file = new Blob([data], { type: data.type });
                const url = URL.createObjectURL(file);
                this.downloadService.download(url, `${invoiceId}.pdf`);
            },
        });
    }
    getSortOptions() {
        this.sortOptions = [];
        Object.keys(this.sortMapping).forEach((sortKey) => this.sortOptions.push({ code: sortKey, selected: false }));
        const translations = this.sortOptions.map((sort) => this.translationService.translate(`pdfInvoices.sorts.${sort.code}`));
        combineLatest(translations)
            .pipe(take(1))
            .subscribe((translated) => this.sortOptions.forEach((sort, index) => (sort.name = translated[index])));
    }
    getNotEnabledError(response) {
        return (response === null || response === void 0 ? void 0 : response.details)
            ? response.details.filter((error) => (error === null || error === void 0 ? void 0 : error.type) === 'UnknownResourceError')
            : [];
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
InvoicesListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InvoicesListComponent, deps: [{ token: i1.PDFInvoicesFacade }, { token: i2.TranslationService }, { token: i3.FileDownloadService }, { token: i2.LanguageService }, { token: i2.GlobalMessageService }], target: i0.ɵɵFactoryTarget.Component });
InvoicesListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: InvoicesListComponent, selector: "cx-invoices-list", ngImport: i0, template: "<ng-container *ngIf=\"invoicesList$ | async as invoicesList\">\n  <ng-container\n    *ngIf=\"\n      invoicesList.pagination &&\n      invoicesList.pagination.totalCount &&\n      invoicesList.pagination.totalCount > 0\n    \"\n  >\n    <div>\n      <!-- HEADER -->\n      <div class=\"cx-invoices-list-header\">\n        <h2>\n          {{ 'pdfInvoices.invoicesTable.header' | cxTranslate }}\n        </h2>\n      </div>\n\n      <!-- BODY -->\n      <div class=\"cx-invoices-list-body\">\n        <div class=\"cx-invoices-list-sort top\">\n          <label class=\"cx-invoices-list-form-group form-group\">\n            <span>\n              {{ 'pdfInvoices.sortBy' | cxTranslate }}\n            </span>\n            <cx-sorting\n              [sortOptions]=\"sortOptions\"\n              (sortListEvent)=\"sortChange($event)\"\n              [selectedOption]=\"sort\"\n              placeholder=\"{{ 'pdfInvoices.sortBy' | cxTranslate }}\"\n              [ariaLabel]=\"'pdfInvoices.sortInvoices' | cxTranslate\"\n              ariaControls=\"cx-invoices-list-table\"\n            ></cx-sorting>\n          </label>\n          <div\n            class=\"cx-invoices-list-pagination\"\n            *ngIf=\"\n              invoicesList.pagination &&\n              invoicesList.pagination.totalPages &&\n              invoicesList.pagination.totalPages > 1\n            \"\n          >\n            <cx-pagination\n              [pagination]=\"pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n\n        <!-- TABLE -->\n        <table\n          id=\"cx-invoices-list-table\"\n          class=\"table cx-invoices-list-table\"\n          attr.aria-label=\"{{\n            'pdfInvoices.invoicesTable.label' | cxTranslate\n          }}\"\n        >\n          <thead class=\"cx-invoices-list-thead-mobile\">\n            <th scope=\"col\">\n              {{ 'pdfInvoices.invoicesTable.invoiceId' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'pdfInvoices.invoicesTable.createdAt' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'pdfInvoices.invoicesTable.netAmount' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'pdfInvoices.invoicesTable.totalAmount' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              <cx-icon\n                [type]=\"ICON_TYPE.DOWNLOAD\"\n                class=\"cx-invoices-list-attachment-icon\"\n                title=\"{{\n                  'pdfInvoices.invoicesTable.attachment' | cxTranslate\n                }}\"\n              ></cx-icon>\n            </th>\n          </thead>\n          <tbody>\n            <tr\n              *ngFor=\"let invoice of invoicesList.invoices\"\n              class=\"cx-invoices-list-row\"\n            >\n              <td class=\"cx-invoices-list-code\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.invoiceId' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  {{ invoice.invoiceId }}\n                </div>\n              </td>\n              <td class=\"cx-invoices-list-date\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.createdAt' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  {{ invoice.createdAt | cxDate: 'longDate' }}\n                </div>\n              </td>\n              <td class=\"cx-invoices-list-monetary\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.netAmount' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  {{\n                    invoice.netAmount?.formattedValue\n                      ? invoice.netAmount?.formattedValue\n                      : invoice.netAmount?.currencyIso +\n                        '&nbsp;' +\n                        invoice.netAmount?.value\n                  }}\n                </div>\n              </td>\n              <td class=\"cx-invoices-list-monetary\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.totalAmount' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  {{\n                    invoice.totalAmount?.formattedValue\n                      ? invoice.totalAmount?.formattedValue\n                      : invoice.totalAmount?.currencyIso +\n                        '&nbsp;' +\n                        invoice.totalAmount?.value\n                  }}\n                </div>\n              </td>\n              <td class=\"cx-invoices-list-attachment\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.attachment' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  <button\n                    *ngIf=\"invoice.invoiceId\"\n                    class=\"cx-invoices-list-attachment-btn\"\n                    (click)=\"\n                      downloadPDFInvoice(\n                        invoice.invoiceId,\n                        invoice.externalSystemId\n                      )\n                    \"\n                    attr.aria-label=\"{{\n                      'pdfInvoices.invoicesTable.attachmentDescription'\n                        | cxTranslate\n                          : {\n                              id: invoice.invoiceId\n                            }\n                    }}\"\n                  >\n                    <cx-icon\n                      [type]=\"ICON_TYPE.FILE\"\n                      class=\"cx-invoices-list-attachment-icon\"\n                      title=\"{{\n                        'pdfInvoices.invoicesTable.download' | cxTranslate\n                      }}\"\n                    >\n                    </cx-icon>\n                    <span\n                      class=\"cx-invoices-list-attachment-text\"\n                      [innerText]=\"\n                        'pdfInvoices.invoicesTable.download' | cxTranslate\n                      \"\n                    >\n                    </span>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-invoices-list-sort bottom\">\n          <div\n            class=\"cx-invoices-list-pagination\"\n            *ngIf=\"\n              invoicesList.pagination &&\n              invoicesList.pagination.totalPages &&\n              invoicesList.pagination.totalPages > 1\n            \"\n          >\n            <cx-pagination\n              [pagination]=\"pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.SortingComponent, selector: "cx-sorting", inputs: ["sortOptions", "ariaControls", "ariaLabel", "selectedOption", "placeholder", "sortLabels"], outputs: ["sortListEvent"] }, { kind: "component", type: i3.PaginationComponent, selector: "cx-pagination", inputs: ["pageRoute", "queryParam", "defaultPage", "pagination"], outputs: ["viewPageEvent"] }, { kind: "component", type: i3.IconComponent, selector: "cx-icon,[cxIcon]", inputs: ["cxIcon", "type"] }, { kind: "pipe", type: i4.AsyncPipe, name: "async" }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }, { kind: "pipe", type: i2.CxDatePipe, name: "cxDate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: InvoicesListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-invoices-list', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"invoicesList$ | async as invoicesList\">\n  <ng-container\n    *ngIf=\"\n      invoicesList.pagination &&\n      invoicesList.pagination.totalCount &&\n      invoicesList.pagination.totalCount > 0\n    \"\n  >\n    <div>\n      <!-- HEADER -->\n      <div class=\"cx-invoices-list-header\">\n        <h2>\n          {{ 'pdfInvoices.invoicesTable.header' | cxTranslate }}\n        </h2>\n      </div>\n\n      <!-- BODY -->\n      <div class=\"cx-invoices-list-body\">\n        <div class=\"cx-invoices-list-sort top\">\n          <label class=\"cx-invoices-list-form-group form-group\">\n            <span>\n              {{ 'pdfInvoices.sortBy' | cxTranslate }}\n            </span>\n            <cx-sorting\n              [sortOptions]=\"sortOptions\"\n              (sortListEvent)=\"sortChange($event)\"\n              [selectedOption]=\"sort\"\n              placeholder=\"{{ 'pdfInvoices.sortBy' | cxTranslate }}\"\n              [ariaLabel]=\"'pdfInvoices.sortInvoices' | cxTranslate\"\n              ariaControls=\"cx-invoices-list-table\"\n            ></cx-sorting>\n          </label>\n          <div\n            class=\"cx-invoices-list-pagination\"\n            *ngIf=\"\n              invoicesList.pagination &&\n              invoicesList.pagination.totalPages &&\n              invoicesList.pagination.totalPages > 1\n            \"\n          >\n            <cx-pagination\n              [pagination]=\"pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n\n        <!-- TABLE -->\n        <table\n          id=\"cx-invoices-list-table\"\n          class=\"table cx-invoices-list-table\"\n          attr.aria-label=\"{{\n            'pdfInvoices.invoicesTable.label' | cxTranslate\n          }}\"\n        >\n          <thead class=\"cx-invoices-list-thead-mobile\">\n            <th scope=\"col\">\n              {{ 'pdfInvoices.invoicesTable.invoiceId' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'pdfInvoices.invoicesTable.createdAt' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'pdfInvoices.invoicesTable.netAmount' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              {{ 'pdfInvoices.invoicesTable.totalAmount' | cxTranslate }}\n            </th>\n            <th scope=\"col\">\n              <cx-icon\n                [type]=\"ICON_TYPE.DOWNLOAD\"\n                class=\"cx-invoices-list-attachment-icon\"\n                title=\"{{\n                  'pdfInvoices.invoicesTable.attachment' | cxTranslate\n                }}\"\n              ></cx-icon>\n            </th>\n          </thead>\n          <tbody>\n            <tr\n              *ngFor=\"let invoice of invoicesList.invoices\"\n              class=\"cx-invoices-list-row\"\n            >\n              <td class=\"cx-invoices-list-code\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.invoiceId' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  {{ invoice.invoiceId }}\n                </div>\n              </td>\n              <td class=\"cx-invoices-list-date\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.createdAt' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  {{ invoice.createdAt | cxDate: 'longDate' }}\n                </div>\n              </td>\n              <td class=\"cx-invoices-list-monetary\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.netAmount' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  {{\n                    invoice.netAmount?.formattedValue\n                      ? invoice.netAmount?.formattedValue\n                      : invoice.netAmount?.currencyIso +\n                        '&nbsp;' +\n                        invoice.netAmount?.value\n                  }}\n                </div>\n              </td>\n              <td class=\"cx-invoices-list-monetary\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.totalAmount' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  {{\n                    invoice.totalAmount?.formattedValue\n                      ? invoice.totalAmount?.formattedValue\n                      : invoice.totalAmount?.currencyIso +\n                        '&nbsp;' +\n                        invoice.totalAmount?.value\n                  }}\n                </div>\n              </td>\n              <td class=\"cx-invoices-list-attachment\">\n                <div class=\"cx-invoices-list-label\">\n                  {{ 'pdfInvoices.invoicesTable.attachment' | cxTranslate }}\n                </div>\n                <div class=\"cx-invoices-list-value\">\n                  <button\n                    *ngIf=\"invoice.invoiceId\"\n                    class=\"cx-invoices-list-attachment-btn\"\n                    (click)=\"\n                      downloadPDFInvoice(\n                        invoice.invoiceId,\n                        invoice.externalSystemId\n                      )\n                    \"\n                    attr.aria-label=\"{{\n                      'pdfInvoices.invoicesTable.attachmentDescription'\n                        | cxTranslate\n                          : {\n                              id: invoice.invoiceId\n                            }\n                    }}\"\n                  >\n                    <cx-icon\n                      [type]=\"ICON_TYPE.FILE\"\n                      class=\"cx-invoices-list-attachment-icon\"\n                      title=\"{{\n                        'pdfInvoices.invoicesTable.download' | cxTranslate\n                      }}\"\n                    >\n                    </cx-icon>\n                    <span\n                      class=\"cx-invoices-list-attachment-text\"\n                      [innerText]=\"\n                        'pdfInvoices.invoicesTable.download' | cxTranslate\n                      \"\n                    >\n                    </span>\n                  </button>\n                </div>\n              </td>\n            </tr>\n          </tbody>\n        </table>\n\n        <!-- Select Form and Pagination Bottom -->\n        <div class=\"cx-invoices-list-sort bottom\">\n          <div\n            class=\"cx-invoices-list-pagination\"\n            *ngIf=\"\n              invoicesList.pagination &&\n              invoicesList.pagination.totalPages &&\n              invoicesList.pagination.totalPages > 1\n            \"\n          >\n            <cx-pagination\n              [pagination]=\"pagination\"\n              (viewPageEvent)=\"pageChange($event)\"\n            ></cx-pagination>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-container>\n</ng-container>\n" }]
        }], ctorParameters: function () { return [{ type: i1.PDFInvoicesFacade }, { type: i2.TranslationService }, { type: i3.FileDownloadService }, { type: i2.LanguageService }, { type: i2.GlobalMessageService }]; } });

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
class PDFInvoicesComponentsModule {
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

/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generated bundle index. Do not edit.
 */

export { InvoicesListComponent, PDFInvoicesComponentsModule };
//# sourceMappingURL=spartacus-pdf-invoices-components.mjs.map
