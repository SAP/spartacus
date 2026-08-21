/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';
import { UserIdService } from '@spartacus/core';

import { OrderDocumentFlowService } from './order-document-flow.service';
import { OrderDocumentFlowConnector } from '../connectors/order-document-flow.connector';
import {
  OrderSubsequentDocument,
  OrderSubsequentDocumentEntry,
} from '@spartacus/order/document-flow/root';

const userId = '123';
const orderCode = '00001004';
const documentCategory = 'category1';
const documentId = 'doc_id1';

const subsequentDocumentsData: OrderSubsequentDocument[] = [
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

const subsequentDocumentEntryData: OrderSubsequentDocumentEntry[] = [
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
    vi.spyOn(connector, 'getOrderSubsequentDocuments');
    vi.spyOn(connector, 'getOrderSubsequentDocumentEntries');
    vi.spyOn(userIdService, 'takeUserId');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getOrderSubsequentDocuments call connector', async () => {
    const result = await firstValueFrom(
      service.getOrderSubsequentDocuments(orderCode)
    );
    expect(result).toEqual(subsequentDocumentsData);
    expect(connector.getOrderSubsequentDocuments).toHaveBeenCalled();
  });

  it('should getOrderSubsequentDocumentEntries call connector', async () => {
    const result = await firstValueFrom(
      service.getOrderSubsequentDocumentEntries(
        orderCode,
        documentCategory,
        documentId
      )
    );
    expect(result).toEqual(subsequentDocumentEntryData);
    expect(connector.getOrderSubsequentDocumentEntries).toHaveBeenCalled();
  });
});
