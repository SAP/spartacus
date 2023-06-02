/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Customer360SupportTicketList } from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CustomerTableColumn,
  CustomerTableTextAlign,
} from '../../asm-customer-table/asm-customer-table.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { SupportTicketEntry } from './asm-customer-support-tickets.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-support-tickets',
  templateUrl: './asm-customer-support-tickets.component.html',
})
export class AsmCustomerSupportTicketsComponent implements OnInit {
  supportTicketsColumns: Array<CustomerTableColumn> = [
    {
      property: 'id',
      i18nTextKey: 'customer360.supportTickets.columnHeaders.id',
      navigatable: true,
      headerTextAlign: CustomerTableTextAlign.START,
      textAlign: CustomerTableTextAlign.START,
    },
    {
      property: 'subject',
      i18nTextKey: 'customer360.supportTickets.columnHeaders.headline',
      headerTextAlign: CustomerTableTextAlign.START,
    },
    {
      property: 'categoryLabel',
      i18nTextKey: 'customer360.supportTickets.columnHeaders.category',
    },
    {
      property: 'createdAt',
      i18nTextKey: 'customer360.activity.created',
      isDate: true,
    },
    {
      property: 'updatedAt',
      i18nTextKey: 'customer360.activity.updated',
      isDate: true,
    },
    {
      property: 'statusLabel',
      i18nTextKey: 'customer360.activity.status',
    },
  ];

  supportTicketsEntries$: Observable<Array<SupportTicketEntry>>;

  constructor(
    protected context: Customer360SectionContext<Customer360SupportTicketList>
  ) {}

  ngOnInit(): void {
    this.supportTicketsEntries$ = this.context.data$.pipe(
      map((data) => {
        return (
          data?.tickets?.map((entry) => {
            return {
              ...entry,
              statusLabel: entry.status.name,
              categoryLabel: entry.category.name,
            };
          }) ?? []
        );
      })
    );
  }
  navigateTo(entry: SupportTicketEntry): void {
    if (entry) {
      this.context.navigate$.next({
        cxRoute: 'supportTicketDetails',
        params: { ticketCode: entry.id },
      });
    }
  }
}
