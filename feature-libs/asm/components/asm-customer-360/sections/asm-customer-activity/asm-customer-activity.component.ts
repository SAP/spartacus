import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/root';

import { formatEpochTime } from '../../asm-customer-360.utils';
import { CustomerTableColumn } from '../../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-activity',
  templateUrl: './asm-customer-activity.component.html',
})
export class AsmCustomerActivityComponent {
  columns: Array<CustomerTableColumn> = [
    { property: 'type', text: 'type' },
    { property: 'id', text: 'id' },
    { property: 'description', text: 'description' },
    { property: 'category', text: 'status' },
    { property: 'created', text: 'created' },
    { property: 'updated', text: 'updated' },
  ];

  entries = [
    {
      type: 'Ticket',
      id: '00000001',
      description: 'Thing not work good',
      created: Number(new Date('2022-07-07T18:25:43.511Z')),
      updated: Number(new Date('2022-07-07T18:25:43.511Z')),
      category: 'New',
    },
    {
      type: 'Ticket',
      id: '00000002',
      description: 'Thing not work as expected',
      created: Number(new Date('2022-07-03T18:25:43.511Z')),
      updated: Number(new Date('2022-07-06T18:25:43.511Z')),
      category: 'Closed',
    },
    {
      type: 'Ticket',
      id: '00000003',
      description: 'Thing work but so slow ${cool}',
      descriptionArgs: [{ key: 'cool', value: 'beans' }],
      created: Number(new Date('2022-06-30T18:25:43.511Z')),
      updated: Number(new Date('2022-07-01T18:25:43.511Z')),
      category: 'Addressed',
    },
    {
      type: 'Cart',
      id: '00002001',
      description: 'Cart with 1 item',
      created: Number(new Date('2022-07-01T18:25:43.511Z')),
      updated: Number(new Date('2022-07-02T18:25:43.511Z')),
      url: 'https://www.example.com/00002001',
    },
    {
      type: 'Cart',
      id: '00002004',
      description: 'Cart with 2 items',
      created: Number(new Date('2022-06-01T18:25:43.511Z')),
      updated: Number(new Date('2022-07-06T18:25:43.511Z')),
      url: 'https://www.example.com/00002004',
    },
    {
      type: 'Cart',
      id: '00002007',
      description: 'Cart with 0 items',
      created: Number(new Date('2022-06-15T18:25:43.511Z')),
      updated: Number(new Date('2022-06-20T18:25:43.511Z')),
      url: 'https://www.example.com/00002007',
    },
    {
      type: 'Saved Cart',
      id: '00002002',
      description: 'Cart with 2 items',
      created: Number(new Date('2022-07-02T18:25:43.511Z')),
      updated: Number(new Date('2022-07-04T18:25:43.511Z')),
    },
    {
      type: 'Saved Cart',
      id: '00002005',
      description: 'Cart with 3 items',
      created: Number(new Date('2022-06-09T18:25:43.511Z')),
      updated: Number(new Date('2022-06-12T18:25:43.511Z')),
    },
    {
      type: 'Saved Cart',
      id: '00002008',
      description: 'Cart with 4 items',
      created: Number(new Date('2022-06-22T18:25:43.511Z')),
      updated: Number(new Date('2022-06-22T18:25:43.511Z')),
    },
    {
      type: 'Order',
      id: '00002003',
      description: 'Cart with 1 item',
      created: Number(new Date('2022-05-30T18:25:43.511Z')),
      updated: Number(new Date('2022-05-31T18:25:43.511Z')),
      category: 'Draft',
    },
    {
      type: 'Order',
      id: '00002006',
      description: 'Cart with 2 items',
      created: Number(new Date('2022-06-05T18:25:43.511Z')),
      updated: Number(new Date('2022-06-06T18:25:43.511Z')),
      category: 'Completed',
    },
    {
      type: 'Order',
      id: '00002009',
      description: 'Cart with 0 items',
      created: Number(new Date('2022-05-15T18:25:43.511Z')),
      updated: Number(new Date('2022-05-20T18:25:43.511Z')),
      category: 'Processing',
    },
  ];

  transformedEntries: Array<any>;

  constructor(public config: Customer360SectionConfig) {
    this.transformedEntries = this.entries.map((entry) => ({
      ...entry,
      created: entry.created && formatEpochTime(entry.created),
      updated: entry.updated && formatEpochTime(entry.updated),
    }));
  }
}
