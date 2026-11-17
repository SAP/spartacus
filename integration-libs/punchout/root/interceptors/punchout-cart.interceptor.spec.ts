import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, Subscription } from 'rxjs';
import {
  PunchOutLevel,
  PunchOutOperation,
  PunchoutSession,
  PunchoutState,
} from '../model';
import { PunchoutStoreService } from '../services';
import { PunchoutCartInterceptor } from './punchout-cart.interceptor';

const PUNCHOUT_SESSION_ID_HEADER_KEY = 'punchoutsid';
const mockSessionId = '123abc';
const mockPunchoutSession: PunchoutSession = {
  customerId: 'test@test.com',
  cartId: 'mockCart',
  punchOutLevel: PunchOutLevel.PRODUCT,
  punchOutOperation: PunchOutOperation.EDIT,
  selectedItem: 'mockItemId',
  token: {
    accessToken: 'mockToken',
    tokenType: 'Bearer',
  },
};
const mockPunchoutState: PunchoutState = {
  punchoutSessionId: mockSessionId,
  punchoutSession: mockPunchoutSession,
};
class MockPunchoutStoreService implements Partial<PunchoutStoreService> {
  setPunchoutState = () => {};
  getPunchoutState = () => of(mockPunchoutState);
  clearState = () => {};
  getPunchoutSessionId = () => mockPunchoutState.punchoutSessionId;
}

describe('PunchoutCartInterceptor', () => {
  let interceptor: PunchoutCartInterceptor;
  let punchoutStoreService: PunchoutStoreService;
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PunchoutStoreService, useClass: MockPunchoutStoreService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: PunchoutCartInterceptor,
          multi: true,
        },

        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    interceptor = TestBed.inject(PunchoutCartInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    punchoutStoreService = TestBed.inject(PunchoutStoreService);
  });

  it('should be created', () => {
    vi.spyOn(punchoutStoreService, 'getPunchoutSessionId').mockReturnValue('');
    expect(interceptor).toBeTruthy();
  });

  it('should add sessionId in header for url related to punchout cart', async () => {
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of(mockPunchoutState)
    );
    const promise = firstValueFrom(
      http.get(`/carts/${mockPunchoutState.punchoutSession?.cartId}`)
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    const pchtHeader = mockReq.request.headers.get(
      PUNCHOUT_SESSION_ID_HEADER_KEY
    );
    expect(pchtHeader).toEqual(mockSessionId);
    mockReq.flush('someData');
    const result = await promise;
    expect(result).toBeTruthy();
  });

  it('should not modify header when no punchout sessionId', async () => {
    vi.spyOn(punchoutStoreService, 'getPunchoutState').mockReturnValue(
      of({ ...mockPunchoutState, punchoutSessionId: '' })
    );
    const promise = firstValueFrom(
      http.get(`/carts/${mockPunchoutState.punchoutSession?.cartId}`)
    );

    const mockReq: TestRequest = httpMock.expectOne((req) => {
      return req.method === 'GET';
    });

    const pchtHeader = mockReq.request.headers.get(
      PUNCHOUT_SESSION_ID_HEADER_KEY
    );
    expect(pchtHeader).toBeFalsy();
    mockReq.flush('someData');
    const result = await promise;
    expect(result).toBeTruthy();
  });
});
