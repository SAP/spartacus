/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import {
  SapOrderSubsequentDocument,
  SapOrderSubsequentDocumentEntry,
} from '@spartacus/order/root';

import { OrderDocumentFlowConnector } from '../connectors/order-document-flow.connector';
import { OrderDocumentFlowAdapter } from './order-document-flow.adapter';

const userId = '123';
const orderCode = '00001004';
const documentCategory = 'category1';
const documentId = 'doc_id1';

const subsequentDocumentsData: SapOrderSubsequentDocument[] = [
  {
    sapDocumentId: 'doc_id1',
    sapDocumentCategory: 'category1',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [
      {
        sapDocumentId: 'doc_id11',
        sapDocumentCategory: 'category1',
        sapDocumentEntryIdColumnName: 'Outbound delivery',
        sapSubsequentDocuments: [
          {
            sapDocumentId: 'doc_id111',
            sapDocumentCategory: 'category1',
            sapDocumentEntryIdColumnName: 'Picking Request',
            sapSubsequentDocuments: [],
            sapCreatedAt: new Date(),
            sapStatus: 'open',
          },
        ],
        sapCreatedAt: new Date(),
        sapStatus: 'open',
      },
    ],
    sapCreatedAt: new Date(),
    sapStatus: 'open',
  },
  {
    sapDocumentId: 'doc_id2',
    sapDocumentCategory: 'category1',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [],
    sapCreatedAt: new Date(),
    sapStatus: 'open',
  },
  {
    sapDocumentId: 'doc_id3',
    sapDocumentCategory: 'category2',
    sapDocumentEntryIdColumnName: 'Standard Order',
    sapSubsequentDocuments: [],
    sapCreatedAt: new Date(),
    sapStatus: 'open',
  },
];

const subsequentDocumentEntryData: SapOrderSubsequentDocumentEntry[] = [
  {
    sapSubsequentDocumentEntryNumber: '1',
    sapOrderEntryNumber: '1',
    sapCreatedAt: new Date(),
    sapStatus: 'completed',
  },
];

class MockOrderDocumentFlowAdapter
  implements Partial<OrderDocumentFlowAdapter>
{
  getOrderSubsequentDocuments() {
    return of(subsequentDocumentsData);
  }

  getOrderSubsequentDocumentEntries() {
    return of(subsequentDocumentEntryData);
  }
}

describe('OrderDocumentFlowConnector', () => {
  let service: OrderDocumentFlowConnector;
  let adapter: OrderDocumentFlowAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDocumentFlowConnector,
        {
          provide: OrderDocumentFlowAdapter,
          useClass: MockOrderDocumentFlowAdapter,
        },
      ],
    });

    service = TestBed.inject(OrderDocumentFlowConnector);
    adapter = TestBed.inject(OrderDocumentFlowAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getOrderSubsequentDocuments call adapter', (done) => {
    spyOn(adapter, 'getOrderSubsequentDocuments').and.callThrough();
    service
      .getOrderSubsequentDocuments(userId, orderCode)
      .subscribe((result) => {
        expect(result).toBe(subsequentDocumentsData);
        done();
      })
      .unsubscribe();
    expect(adapter.getOrderSubsequentDocuments).toHaveBeenCalled();
  });

  it('should getOrderSubsequentDocumentEntries call adapter', (done) => {
    spyOn(adapter, 'getOrderSubsequentDocumentEntries').and.callThrough();
    service
      .getOrderSubsequentDocumentEntries(
        userId,
        orderCode,
        documentCategory,
        documentId
      )
      .subscribe((result) => {
        expect(result).toEqual(subsequentDocumentEntryData);
        done();
      })
      .unsubscribe();
    expect(adapter.getOrderSubsequentDocumentEntries).toHaveBeenCalled();
  });
});
