/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsmCustomer360SupportTicketList } from '@spartacus/asm/customer-360/root';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CustomerTableColumn,
  CustomerTableTextAlign,
} from '../../asm-customer-360-table/asm-customer-360-table.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { SupportTicketEntry } from './asm-customer-360-support-tickets.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-support-tickets',
  templateUrl: './asm-customer-360-support-tickets.component.html',
})
export class AsmCustomer360SupportTicketsComponent implements OnInit {
  supportTicketsColumns: Array<CustomerTableColumn> = [
    {
      property: 'id',
      i18nTextKey: 'asmCustomer360.supportTickets.columnHeaders.id',
      navigatable: true,
      headerTextAlign: CustomerTableTextAlign.START,
      textAlign: CustomerTableTextAlign.START,
    },
    {
      property: 'subject',
      i18nTextKey: 'asmCustomer360.supportTickets.columnHeaders.headline',
      headerTextAlign: CustomerTableTextAlign.START,
    },
    {
      property: 'categoryLabel',
      i18nTextKey: 'asmCustomer360.supportTickets.columnHeaders.category',
      headerTextAlign: CustomerTableTextAlign.START,
    },
    {
      property: 'createdAt',
      i18nTextKey: 'asmCustomer360.activity.created',
      isDate: true,
    },
    {
      property: 'updatedAt',
      i18nTextKey: 'asmCustomer360.activity.updated',
      isDate: true,
    },
    {
      property: 'statusLabel',
      i18nTextKey: 'asmCustomer360.activity.status',
      headerTextAlign: CustomerTableTextAlign.START,
    },
  ];

  supportTicketsEntries$: Observable<Array<SupportTicketEntry>>;

  constructor(
    protected context: AsmCustomer360SectionContext<AsmCustomer360SupportTicketList>
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
