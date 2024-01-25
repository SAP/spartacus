/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsmCustomer360ActivityList } from '@spartacus/asm/customer-360/root';
import { UrlCommand } from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CustomerTableColumn,
  CustomerTableTextAlign,
} from '../../asm-customer-360-table/asm-customer-360-table.model';
import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';
import { ActivityEntry, TypeCodes } from './asm-customer-360-activity.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-activity',
  templateUrl: './asm-customer-360-activity.component.html',
})
export class AsmCustomer360ActivityComponent implements OnInit {
  entries$: Observable<Array<ActivityEntry>>;
  columns: Array<CustomerTableColumn> = [
    {
      property: 'typeLabel',
      i18nTextKey: 'asmCustomer360.activity.type',
      headerTextAlign: CustomerTableTextAlign.START,
    },
    {
      property: 'associatedTypeId',
      text: 'id',
      i18nTextKey: 'asmCustomer360.activity.id',
      headerTextAlign: CustomerTableTextAlign.START,
      textAlign: CustomerTableTextAlign.START,
      navigatable: true,
    },
    {
      property: 'description',
      text: 'description',
      i18nTextKey: 'asmCustomer360.activity.description',
      headerTextAlign: CustomerTableTextAlign.START,
    },
    {
      property: 'statusLabel',
      text: 'status',
      i18nTextKey: 'asmCustomer360.activity.status',
      headerTextAlign: CustomerTableTextAlign.START,
    },
    {
      property: 'createdAt',
      text: 'created',
      i18nTextKey: 'asmCustomer360.activity.created',
      isDate: true,
    },
    {
      property: 'updatedAt',
      text: 'updated',
      i18nTextKey: 'asmCustomer360.activity.updated',
      isDate: true,
    },
  ];

  constructor(
    protected context: AsmCustomer360SectionContext<AsmCustomer360ActivityList>
  ) {}

  ngOnInit(): void {
    let entries: Array<ActivityEntry> = [];

    this.entries$ = combineLatest([this.context.data$]).pipe(
      map(([data]) => {
        entries = [];
        data.activities.forEach((activity) => {
          entries.push({
            ...activity,
            typeLabel: activity.type?.name,
            statusLabel: activity.status?.name,
          });
        });
        return entries;
      })
    );
  }

  itemSelected(entry: ActivityEntry | undefined): void {
    if (entry) {
      let urlCommand: UrlCommand;
      if (entry.type?.code === TypeCodes.SavedCart) {
        urlCommand = {
          cxRoute: 'savedCartsDetails',
          params: { savedCartId: entry?.associatedTypeId },
        };
      } else if (entry.type?.code === TypeCodes.Cart) {
        urlCommand = {
          cxRoute: 'cart',
        };
      } else if (entry.type?.code === TypeCodes.Order) {
        urlCommand = {
          cxRoute: 'orderDetails',
          params: { code: entry?.associatedTypeId },
        };
      } else if (entry.type?.code === TypeCodes.Ticket) {
        urlCommand = {
          cxRoute: 'supportTicketDetails',
          params: { ticketCode: entry?.associatedTypeId },
        };
      }
      if (urlCommand) {
        this.context.navigate$.next(urlCommand);
      }
    }
  }
}
