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
} from 'core-libs/core/src/occ/adapters/user/unit-test.helper';
import { OrderAttachments } from '@spartacus/order/root';
import { OccOrderAttachmentsAdapter } from '@spartacus/order/occ';

const userId = '123';
const orderId = '00001004';
const attachmentId = 'a_123';
const attachmentsData: OrderAttachments = {
  sapAttachments: [
    {
      sapAttachmentId: attachmentId,
      sapFileName: 'a123',
    },
  ],
};
const blobData: Blob = new Blob(['mock content'], { type: 'application/pdf' });

describe('OccOrderAttachmentsAdapter', () => {
  let adapter: OccOrderAttachmentsAdapter;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoggerService,
        OccOrderAttachmentsAdapter,
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

    adapter = TestBed.inject(OccOrderAttachmentsAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch array of order attachments for logged in user', waitForAsync(() => {
    const subscription = adapter
      .getOrderAttachments(userId, orderId)
      .subscribe();
    const request = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET';
    }, `GET order attachments`);
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'orderAttachments',
      { urlParams: { userId, orderId } }
    );
    request.flush(attachmentsData);
    httpMock.verify();
    subscription.unsubscribe();
  }));

  it("should fetch order attachment blob for logged in user's", waitForAsync(() => {
    const subscription = adapter
      .downloadOrderAttachment(userId, orderId, attachmentId)
      .subscribe();
    const request = httpMock.expectOne((req: HttpRequest<any>) => {
      return req.method === 'GET';
    }, `GET order attachment data`);
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'downloadOrderAttachment',
      { urlParams: { userId, orderId, attachmentId } }
    );
    request.flush(blobData);
    httpMock.verify();
    subscription.unsubscribe();
  }));
});
