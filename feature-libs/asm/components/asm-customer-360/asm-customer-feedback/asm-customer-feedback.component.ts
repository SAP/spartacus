import { Component } from '@angular/core';
import { TicketFragment, ReviewFragment } from './asm-customer-feedback.model';

@Component({
  selector: 'cx-asm-customer-feedback',
  templateUrl: './asm-customer-feedback.component.html',
})
export class AsmCustomerFeedbackComponent {
  rawReviewFragment = {
    type: 'reviews',
    entries: [
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
    ],
  };

  rawTicketFragment = {
    type: 'tickets',
    entries: [
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
    ],
  };

  uiFragments = [
    new TicketFragment(this.rawTicketFragment.entries),
    new ReviewFragment(this.rawReviewFragment.entries),
  ];
}
