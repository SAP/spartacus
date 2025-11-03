/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentQueryParams,
} from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';
import { AccountSummaryAdapter } from './account-summary.adapter';

@Injectable()
export class AccountSummaryConnector {
  protected accountSummaryAdapter = inject(AccountSummaryAdapter);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  getAccountSummary(
    userId: string,
    orgUnitId: string
  ): Observable<AccountSummaryDetails> {
    return this.accountSummaryAdapter.getAccountSummary(userId, orgUnitId);
  }

  getDocumentList(
    userId: string,
    orgUnitId: string,
    params: DocumentQueryParams
  ): Observable<AccountSummaryList> {
    return this.accountSummaryAdapter.getDocumentList(
      userId,
      orgUnitId,
      params
    );
  }

  getDocumentAttachment(
    userId: string,
    orgUnitId: string,
    orgDocumentId: string,
    orgDocumentAttachmentId: string
  ): Observable<Blob> {
    return this.accountSummaryAdapter.getDocumentAttachment(
      userId,
      orgUnitId,
      orgDocumentId,
      orgDocumentAttachmentId
    );
  }
}
