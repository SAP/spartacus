/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OrderDocumentFlowConnector } from '@spartacus/order/core';
import { UserIdService } from '@spartacus/core';
import {
  SapOrderSubsequentDocument,
  SapOrderSubsequentDocumentEntry,
} from '@spartacus/order/root';
import { OrderDocumentFlowService } from './order-document-flow.service';

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

class MockOrderDocumentFlowConnector
  implements Partial<OrderDocumentFlowConnector>
{
  getOrderSubsequentDocuments() {
    return of(subsequentDocumentsData);
  }

  getOrderSubsequentDocumentEntries() {
    return of(subsequentDocumentEntryData);
  }
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId() {
    return of(userId);
  }
}

describe('OrderDocumentFlowService', () => {
  let service: OrderDocumentFlowService;
  let connector: OrderDocumentFlowConnector;
  let userIdService: UserIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderDocumentFlowService,
        {
          provide: OrderDocumentFlowConnector,
          useClass: MockOrderDocumentFlowConnector,
        },
        {
          provide: UserIdService,
          useClass: MockUserIdService,
        },
      ],
    });

    service = TestBed.inject(OrderDocumentFlowService);
    connector = TestBed.inject(OrderDocumentFlowConnector);
    userIdService = TestBed.inject(UserIdService);
  });

  beforeEach(() => {
    spyOn(connector, 'getOrderSubsequentDocuments').and.callThrough();
    spyOn(connector, 'getOrderSubsequentDocumentEntries').and.callThrough();
    spyOn(userIdService, 'takeUserId').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getOrderSubsequentDocuments call connector', (done) => {
    service
      .getOrderSubsequentDocuments(orderCode)
      .subscribe((result) => {
        expect(result).toEqual(subsequentDocumentsData);
        done();
      })
      .unsubscribe();
    expect(connector.getOrderSubsequentDocuments).toHaveBeenCalled();
  });

  it('should getOrderSubsequentDocumentEntries call connector', (done) => {
    service
      .getOrderSubsequentDocumentEntries(
        orderCode,
        documentCategory,
        documentId
      )
      .subscribe((result) => {
        expect(result).toEqual(subsequentDocumentEntryData);
        done();
      })
      .unsubscribe();
    expect(connector.getOrderSubsequentDocumentEntries).toHaveBeenCalled();
  });
});
