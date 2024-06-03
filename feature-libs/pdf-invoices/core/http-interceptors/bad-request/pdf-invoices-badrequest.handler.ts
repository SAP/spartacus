/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ErrorModel,
  GlobalMessageType,
  HttpErrorHandler,
  HttpResponseStatus,
  Priority,
} from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class PDFInvoicesBadRequestHandler extends HttpErrorHandler {
  responseStatus = HttpResponseStatus.BAD_REQUEST;

  hasMatch(errorResponse: HttpErrorResponse): boolean {
    return (
      super.hasMatch(errorResponse) && this.getErrors(errorResponse)?.length > 0
    );
  }

  handleError(request: HttpRequest<any>, response: HttpErrorResponse): void {
    this.handleInvoicesListError(request, response);
    this.handlePDFDownloadError(request, response);
  }

  protected handleInvoicesListError(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ) {
    this.getErrors(response)
      .filter((e) => this.isInvoicesListNotFoundError(e))
      .forEach(() => {
        this.globalMessageService.add(
          { key: 'pdfInvoices.invoicesLoadingError' },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected handlePDFDownloadError(
    _request: HttpRequest<any>,
    response: HttpErrorResponse
  ) {
    this.getErrors(response)
      .filter((e) => this.isDownloadInvoiceError(e))
      .forEach(() => {
        this.globalMessageService.add(
          {
            key: 'pdfInvoices.downloadPDFError',
          },
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
  }

  protected isInvoicesListNotFoundError(error: ErrorModel): boolean {
    return (
      error?.type === 'UnknownIdentifierError' &&
      error?.message != null &&
      error?.message.includes('Order')
    );
  }

  protected isDownloadInvoiceError(error: ErrorModel): boolean {
    return (
      error?.type === 'UnknownIdentifierError' &&
      error?.message != null &&
      error?.message.includes('Invoice')
    );
  }

  protected getErrors(response: HttpErrorResponse): ErrorModel[] {
    return (response.error?.errors).filter(
      (error: any) =>
        this.isInvoicesListNotFoundError(error) ||
        this.isDownloadInvoiceError(error)
    );
  }

  getPriority(): Priority {
    return Priority.NORMAL;
  }
}
