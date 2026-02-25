import {
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { LoggerService, OccConfig, OccEndpointsService } from '@spartacus/core';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from 'projects/core/src/occ/adapters/user/unit-test.helper';

import { OccOrderDocumentFlowAdapter } from '@spartacus/order/document-flow/occ';
import {
  OrderSubsequentDocument,
  OrderSubsequentDocumentEntry,
} from '@spartacus/order/document-flow/root';

const userId = '123';
const orderId = '00001004';
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

describe('OccOrderDocumentFlowAdapter', () => {
  let adapter: OccOrderDocumentFlowAdapter;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService,
        OccOrderDocumentFlowAdapter,
        {
          provide: OccConfig,
          useValue: mockOccModuleConfig,
        },
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccOrderDocumentFlowAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch array of order subsequent documents for logged in user', waitForAsync(() => {
    const subscription = adapter
      .getOrderSubsequentDocuments(userId, orderId)
      .subscribe();
    const request = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET';
    }, `GET subsequent documents`);
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'subsequentDocuments',
      { urlParams: { userId, orderId } }
    );
    request.flush(subsequentDocumentsData);
    httpMock.verify();
    subscription.unsubscribe();
  }));

  it('should fetch order subsequent document entry for logged in user', waitForAsync(() => {
    const subscription = adapter
      .getOrderSubsequentDocumentEntries(
        userId,
        orderId,
        documentCategory,
        documentId
      )
      .subscribe();
    const request = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET';
    }, `GET subsequent document entry`);
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'subsequentDocumentsEntries',
      { urlParams: { userId, orderId, documentCategory, documentId } }
    );
    request.flush(subsequentDocumentEntryData);
    httpMock.verify();
    subscription.unsubscribe();
  }));
});
