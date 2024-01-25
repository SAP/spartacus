/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { facadeFactory } from '@spartacus/core';
import { ORGANIZATION_ACCOUNT_SUMMARY_FEATURE } from '../feature-name';
import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentQueryParams,
} from '../model/account-summary.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: AccountSummaryFacade,
      feature: ORGANIZATION_ACCOUNT_SUMMARY_FEATURE,
      methods: [
        'getAccountSummary',
        'getDocumentList',
        'getDocumentAttachment',
      ],
    }),
})
export abstract class AccountSummaryFacade {
  /**
   * Returns the account summary header details for a orgUnit and current logged in user
   * @param orgUnitId If provided, it will be used, otherwise it will use orgUnitId from router state.
   */
  abstract getAccountSummary(
    orgUnitId?: string
  ): Observable<AccountSummaryDetails>;

  /**
   * Returns the result of account summary documents search
   * @param params Search parameters
   * @param orgUnitId If provided, it will be used, otherwise it will use orgUnitId from router state.
   */
  abstract getDocumentList(
    params: DocumentQueryParams,
    orgUnitId?: string
  ): Observable<AccountSummaryList>;

  /**
   * Returns the document blob for given orgDocumentId and orgDocumentAttachmentId
   * @param orgDocumentId organization document id
   * @param orgDocumentAttachmentId attachment id belonging to a organization document id
   * @param orgUnitId If provided, it will be used, otherwise it will use orgUnitId from router state.
   */
  abstract getDocumentAttachment(
    orgDocumentId?: string,
    orgDocumentAttachmentId?: string,
    orgUnitId?: string
  ): Observable<Blob>;
}
