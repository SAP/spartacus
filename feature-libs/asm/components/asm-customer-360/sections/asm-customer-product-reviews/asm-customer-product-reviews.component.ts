import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/core';

import { combineStrings, formatEpochTime } from '../../asm-customer-360.utils';
import { CustomerTableColumn } from '../../asm-customer-ui-components/asm-customer-table/asm-customer-table.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-product-reviews',
  templateUrl: './asm-customer-product-reviews.component.html',
})
export class AsmCustomerProductReviewsComponent {
  reviewColumns: Array<CustomerTableColumn> = [
    { property: 'item', text: 'item' },
    { property: 'dateAndStatus', text: 'DATE / STATUS' },
    { property: 'rating', text: 'rate', renderAsStarRating: true },
    { property: 'reviewText', text: 'review' },
  ];

  reviewEntries = [
    {
      productName: 'DC Car Battery Adapter',
      SKUNumber: '107701',
      rating: 0.5,
      reviewStatus: 'pending',
      reviewText: 'Adapter? More like Badapter!!!',
      productUrl: 'https://www.example.com/107701',
      created: Number(new Date('2022-05-15T18:25:43.511Z')),
    },
    {
      productName: 'VCT-D580RM Remote Control Tripod',
      SKUNumber: '2992',
      rating: 4.5,
      reviewStatus: 'pending',
      reviewText: 'Flimsy stand!',
      productUrl: 'https://www.example.com/2992',
      created: Number(new Date('2022-06-22T18:25:43.511Z')),
    },
    {
      productName: 'Mini T-Cam',
      SKUNumber: '458542',
      rating: 1,
      reviewStatus: 'pending',
      reviewText: 'Webcam bad',
      productUrl: 'https://www.example.com/458542',
      created: Number(new Date('2022-07-02T18:25:43.511Z')),
    },
    {
      productName: 'HDR-CX105E Red',
      SKUNumber: '1934406',
      rating: 1.5,
      reviewStatus: 'pending',
      reviewText: 'First review',
      productUrl: 'https://www.example.com/1934406',
      created: Number(new Date('2022-07-03T18:25:43.511Z')),
    },
    {
      productName: 'DC Car Battery Adapter',
      SKUNumber: '10770',
      rating: 2.5,
      reviewStatus: 'pending',
      reviewText: 'Adapter? More like Badapter!!!',
      productUrl: 'https://www.example.com/10770',
      created: Number(new Date('2022-05-15T18:25:43.511Z')),
    },
    {
      productName: 'VCT-D580RM Remote Control Tripod',
      SKUNumber: '29925',
      rating: 3.5,
      reviewStatus: 'pending',
      reviewText: 'Flimsy stand!',
      productUrl: 'https://www.example.com/29925',
      created: Number(new Date('2022-06-22T18:25:43.511Z')),
    },
    {
      productName: 'Mini T-Cam',
      SKUNumber: '4585',
      rating: 4,
      reviewStatus: 'pending',
      reviewText: 'Webcam bad',
      productUrl: 'https://www.example.com/4585',
      created: Number(new Date('2022-07-02T18:25:43.511Z')),
    },
    {
      productName: 'HDR-CX105E Red',
      SKUNumber: '19406',
      rating: 3,
      reviewStatus: 'pending',
      reviewText: 'First review',
      productUrl: 'https://www.example.com/19406',
      created: Number(new Date('2022-07-03T18:25:43.511Z')),
    },
  ];

  transformedReviewEntries: Array<any>;

  constructor(public config: Customer360SectionConfig) {
    this.transformedReviewEntries = this.reviewEntries.map((entry) => ({
      ...entry,
      item: combineStrings(entry.productName, entry.SKUNumber, ', SKU: '),
      dateAndStatus: combineStrings(
        entry.created ? formatEpochTime(entry.created) : undefined,
        entry.reviewStatus,
        ' / '
      ),
    }));
  }
}
