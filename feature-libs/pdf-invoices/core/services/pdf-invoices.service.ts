/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import { RoutingService, UserIdService } from '@spartacus/core';
import {
  InvoiceQueryParams,
  OrderInvoiceList,
  PDFInvoicesFacade,
} from '@spartacus/pdf-invoices/root';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { PDFInvoicesConnector } from '../connectors/pdf-invoices.connector';

@Injectable()
export class PDFInvoicesService implements PDFInvoicesFacade, OnDestroy {
  protected subscriptions = new Subscription();

  userId: string;
  orderId: string;

  constructor(
    private routingService: RoutingService,
    private userIdService: UserIdService,
    protected pdfInvoicesConnector: PDFInvoicesConnector
  ) {
    this.subscriptions.add(
      this.userIdService
        .takeUserId()
        .subscribe((userId) => (this.userId = userId))
    );
    this.subscriptions.add(
      this.getOrderId().subscribe((orderId) => (this.orderId = orderId))
    );
  }

  getInvoicesForOrder(
    queryParams: InvoiceQueryParams,
    userId?: string,
    orderId?: string
  ): Observable<OrderInvoiceList> {
    return this.pdfInvoicesConnector
      .getInvoicesForOrder(
        userId || this.userId,
        orderId || this.orderId,
        queryParams
      )
      .pipe(shareReplay(1));
  }

  getInvoicePDF(
    invoiceId: string,
    externalSystemId?: string,
    userId?: string,
    orderId?: string
  ): Observable<Blob> {
    return this.pdfInvoicesConnector
      .getInvoicePDF(
        userId || this.userId,
        orderId || this.orderId,
        invoiceId,
        externalSystemId
      )
      .pipe(shareReplay(1));
  }

  protected getOrderId(): Observable<string> {
    return this.routingService.getRouterState().pipe(
      map((routingData) => routingData.state.params),
      distinctUntilChanged(),
      map((params) => params.orderCode)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
