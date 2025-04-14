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
import {
  LoggerService,
  OccConfig,
  OccEndpointsService,
} from '@spartacus/core';
import {
  MockOccEndpointsService,
  mockOccModuleConfig,
} from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { OccS4omOrderAttachmentsAdapter } from './occ-s4om-order-attachments-adapter.service';
import { S4omOrderAttachments } from '@spartacus/s4om/root';

const userId = '123';
const orderId = '00001004';
const attachmentId = 'a_123';
const attachmentsData: S4omOrderAttachments = {
  attachments: [
    {
      attachmentId: attachmentId,
      fileName: 'a123',
    },
  ],
};
const blobData: Blob = new Blob(['mock content'], { type: 'application/pdf' });

describe('OccOrderAttachmentsAdapter', () => {
  let adapter: OccS4omOrderAttachmentsAdapter;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        LoggerService,
        OccS4omOrderAttachmentsAdapter,
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

    adapter = TestBed.inject(OccS4omOrderAttachmentsAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch array of order attachments for logged in user', waitForAsync(() => {
    const subscription = adapter.getOrderAttachments(userId, orderId).subscribe();
    const request = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET';
    }, `GET order attachments`);
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'orderAttachments',
      { urlParams: { userId, orderId } },
    );
    request.flush(attachmentsData);
    httpMock.verify();
    subscription.unsubscribe();
  }));

  it('should fetch order attachment blob for logged in user\'s', waitForAsync(() => {
    const subscription = adapter.downloadOrderAttachment(userId, orderId, attachmentId).subscribe();
    const request = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET';
    }, `GET order attachment data`);
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'downloadOrderAttachment',
      { urlParams: { userId, orderId, attachmentId } },
    );
    request.flush(blobData);
    httpMock.verify();
    subscription.unsubscribe();
  }));
});
