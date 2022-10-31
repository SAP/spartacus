/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/root';

import { formatEpochTime, replaceTokens } from '../../asm-customer-360.utils';
import { CustomerTableColumn } from '../../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-support-tickets',
  templateUrl: './asm-customer-support-tickets.component.html',
})
export class AsmCustomerSupportTicketsComponent {
  ticketColumns: Array<CustomerTableColumn> = [
    { property: 'id', text: 'id' },
    { property: 'headline', text: 'headline' },
    { property: 'type', text: 'category' },
    { property: 'category', text: 'status' },
    { property: 'created', text: 'created' },
    { property: 'updated', text: 'updated' },
  ];

  ticketEntries = [
    {
      type: 'Enquiry',
      id: '00000001',
      description: 'Can thing work this way instead?',
      created: Number(new Date('2022-07-02T18:25:43.511Z')),
      updated: Number(new Date('2022-07-04T18:25:43.511Z')),
      category: 'New',
    },
    {
      type: 'Complaint',
      id: '00000002',
      description: 'Thing not work',
      created: Number(new Date('2022-07-04T18:25:43.511Z')),
      updated: Number(new Date('2022-07-05T18:25:43.511Z')),
      category: 'Closed',
    },
    {
      type: 'Problem',
      id: '00000003',
      description: 'Thing work but super slow',
      created: Number(new Date('2022-06-30T18:25:43.511Z')),
      updated: Number(new Date('2022-07-01T18:25:43.511Z')),
      category: 'Addressed',
    },
    {
      type: 'Enquiry',
      id: '00000004',
      description: 'Why thing work this way?',
      created: Number(new Date('2022-05-30T18:25:43.511Z')),
      updated: Number(new Date('2022-06-10T18:25:43.511Z')),
      category: 'New',
    },
    {
      type: 'Complaint',
      id: '00000005',
      description: 'Thing work but so slow ${cool}',
      descriptionArgs: [{ key: 'cool', value: 'as hell' }],
      created: Number(new Date('2022-07-03T18:25:43.511Z')),
      updated: Number(new Date('2022-07-06T18:25:43.511Z')),
      category: 'Closed',
    },
    {
      type: 'Problem',
      id: '00000006',
      description: 'Thing not work as expected',
      created: Number(new Date('2022-06-30T18:25:43.511Z')),
      updated: Number(new Date('2022-07-01T18:25:43.511Z')),
      category: 'Addressed',
    },
  ];

  transformedTicketEntries: Array<any>;

  constructor(public config: Customer360SectionConfig) {
    this.transformedTicketEntries = this.ticketEntries.map((entry) => ({
      ...entry,
      headline: replaceTokens(entry.description, entry.descriptionArgs),
      created: entry.created && formatEpochTime(entry.created),
      updated: entry.updated && formatEpochTime(entry.updated),
    }));
  }
}
