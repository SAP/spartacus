/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  LanguageService,
  SortModel,
  TranslationService,
} from '@spartacus/core';
import {
  AccountSummaryDocumentType,
  AccountSummaryFacade,
  AccountSummaryList,
  DocumentFields,
  DocumentQueryParams,
  DocumentStatus,
  FilterByOptions,
} from '@spartacus/organization/account-summary/root';
import { FileDownloadService, ICON_TYPE } from '@spartacus/storefront';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { skip, switchMap, take, tap } from 'rxjs/operators';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { AccountSummaryDocumentFilterComponent } from './filter/account-summary-document-filter.component';
import { SortingComponent } from '../../../../../../projects/storefrontlib/shared/components/list-navigation/sorting/sorting.component';
import { PaginationComponent } from '../../../../../../projects/storefrontlib/shared/components/list-navigation/pagination/pagination.component';
import { FeatureDirective } from '@spartacus/core';
import { IconComponent } from '../../../../../../projects/storefrontlib/cms-components/misc/icon/icon.component';
import { TranslatePipe } from '@spartacus/core';
import { CxDatePipe } from '@spartacus/core';
import { MockTranslatePipe } from '@spartacus/core';
import { MockDatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-account-summary-document',
  templateUrl: './account-summary-document.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    AccountSummaryDocumentFilterComponent,
    SortingComponent,
    PaginationComponent,
    FeatureDirective,
    IconComponent,
    NgFor,
    NgClass,
    AsyncPipe,
    TranslatePipe,
    CxDatePipe,
    MockTranslatePipe,
    MockDatePipe,
  ],
})
export class AccountSummaryDocumentComponent implements OnInit, OnDestroy {
  /* For Enum use in HTML */
  ICON_TYPE = ICON_TYPE;

  documentTypeOptions: AccountSummaryDocumentType[];
  sortOptions: SortModel[];

  // Contains the initial query parameters and will be updated with current state of filters
  _queryParams: DocumentQueryParams = {
    status: DocumentStatus.OPEN,
    filterByKey: FilterByOptions.DOCUMENT_NUMBER,
    page: 0,
    pageSize: 10,
    fields: DocumentFields.FULL,
  };
  // Used to fire event every time query params are changed
  queryParams$ = new BehaviorSubject<DocumentQueryParams>(this._queryParams);
  // Used by template to subscribe to data from documents api
  accountSummary$: Observable<AccountSummaryList> = this.queryParams$.pipe(
    switchMap((param) => this.accountSummaryFacade.getDocumentList(param)),
    tap((accountSummaryList: AccountSummaryList) => {
      if (accountSummaryList.orgDocumentTypes) {
        this.documentTypeOptions = accountSummaryList.orgDocumentTypes;
      }

      if (accountSummaryList.sorts) {
        this.addNamesToSortModel(accountSummaryList.sorts);
      }
    })
  );

  private subscription = new Subscription();

  constructor(
    protected accountSummaryFacade: AccountSummaryFacade,
    protected translation: TranslationService,
    protected downloadService: FileDownloadService,
    protected languageService: LanguageService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(skip(1))
        .subscribe(() =>
          this.updateQueryParams({ fields: DocumentFields.FULL })
        )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  pageChange(page: number): void {
    this.updateQueryParams({
      page: page,
    });
  }

  changeSortCode(sortCode: string): void {
    this.updateQueryParams({
      sort: sortCode,
      page: 0,
    });
  }

  filterChange(newFilters: DocumentQueryParams): void {
    this.updateQueryParams({
      ...newFilters,
      page: 0,
    });
  }

  downloadAttachment(documentId?: string, attachmentId?: string): void {
    this.accountSummaryFacade
      .getDocumentAttachment(documentId, attachmentId)
      .pipe(take(1))
      .subscribe((data) => {
        const file = new Blob([data], { type: data.type });
        const url = URL.createObjectURL(file);
        this.downloadService.download(url, attachmentId);
      });
  }

  private updateQueryParams(partialParams: DocumentQueryParams) {
    // Overwrite each value present in partialParams to _queryParams
    Object.entries(partialParams).forEach(
      (param) => ((this._queryParams as any)[param[0]] = param[1])
    );
    // Every request that doesn't specify fields should be set to DEFAULT
    if (!partialParams.fields) {
      this._queryParams.fields = DocumentFields.DEFAULT;
    }

    this.queryParams$.next(this._queryParams);
  }

  private addNamesToSortModel(sorts: Array<SortModel>) {
    this.sortOptions = sorts;
    const translations = sorts.map((sort) =>
      this.translation.translate(`orgAccountSummary.sorts.${sort.code}`)
    );

    combineLatest(translations)
      .pipe(take(1))
      .subscribe((translated) =>
        this.sortOptions.forEach(
          (sort, index) => (sort.name = translated[index])
        )
      );
  }
}
