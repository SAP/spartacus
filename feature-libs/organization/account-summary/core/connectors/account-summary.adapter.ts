/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AccountSummaryDetails,
  AccountSummaryList,
  DocumentQueryParams,
} from '@spartacus/organization/account-summary/root';
import { Observable } from 'rxjs';

export abstract class AccountSummaryAdapter {
  /**
   * Abstract method to load account summary header data for given
   * @param userId
   * @param orgUnitId
   */

  abstract getAccountSummary(
    userId: string,
    orgUnitId: string
  ): Observable<AccountSummaryDetails>;

  /**
   * Abstract method to load account summary document list for given
   * @param userId
   * @param orgUnitId
   */

  abstract getDocumentList(
    userId: string,
    orgUnitId: string,
    params: DocumentQueryParams
  ): Observable<AccountSummaryList>;

  /**
   * Abstract method to load a document attachment file
   * @param userId
   * @param orgUnitId
   * @param orgDocumentId
   * @param orgDocumentAttachmentId
   */

  abstract getDocumentAttachment(
    userId: string,
    orgUnitId: string,
    orgDocumentId: string,
    orgDocumentAttachmentId: string
  ): Observable<Blob>;
}
