import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorModel, OccConfig, OccEndpoints } from '@spartacus/core';
import { throwError } from 'rxjs';
import { take } from 'rxjs/operators';
import { OccRequestedDeliveryDateAdapter } from './occ-requested-delivery-date.adapter';

const mockUserId = 'userId1';
const mockCartId = '00012345';
const mockRequestedDate = '15-09-2023';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
      endpoints: {
        requestedDeliveryDate:
          'users/${userId}/carts/${cartId}/requestedretrievaldate',
      } as OccEndpoints,
    },
  },
  context: {
    baseSite: [''],
  },
};

const mockValidationError = new HttpErrorResponse({
  error: {
    errors: [
      {
        message: 'checkout.multi.requestedretrievaldatevalid.error',
        reason: 'invalid',
        type: 'ValidationError',
      },
    ],
  },
});

describe('OccRequestedDeliveryDateAdapter', () => {
  let service: OccRequestedDeliveryDateAdapter;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccRequestedDeliveryDateAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });
    service = TestBed.inject(OccRequestedDeliveryDateAdapter);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe(`set requested delivery date`, () => {
    it(`should set requested delivery date for cart for given user id, cart id`, (done) => {
      service
        .setRequestedDeliveryDate(mockUserId, mockCartId, mockRequestedDate)
        .pipe(take(1))
        .subscribe((result) => {
          expect(result).toEqual('');
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PUT' &&
          req.url ===
            `users/${mockUserId}/carts/${mockCartId}/requestedretrievaldate?requestedRetrievalAt=${mockRequestedDate}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      mockReq.flush('');
      expect(mockReq.request.responseType).toEqual('json');
    });

    it(`should result in error when Validation Error is thrown`, () => {
      spyOn(httpClient, 'put').and.returnValue(throwError(mockValidationError));

      let result: HttpErrorModel | undefined;
      const subscription = service
        .setRequestedDeliveryDate(mockUserId, mockCartId, mockRequestedDate)
        .pipe(take(1))
        .subscribe({ error: (err: any) => (result = err) });

      expect(result).toEqual(mockValidationError);

      subscription.unsubscribe();
    });
  });
});
