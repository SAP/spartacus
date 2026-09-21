import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { OccCancelServiceOrderAdapter } from './occ-cancel-service-order.adapter';
import { OccEndpointsService } from '@spartacus/core';
import { CancellationDetails } from '@spartacus/s4-service/root';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('OccCancelServiceOrderAdapter', () => {
  let adapter: OccCancelServiceOrderAdapter;
  let httpTestingController: HttpTestingController;
  let occEndpointsService: any;
  const userId = 'testUser';
  const code = 'testCode';
  const cancellationDetails: CancellationDetails = {
    cancellationRequestEntryInputs: [],
  };

  beforeEach(() => {
    const spyOccEndpointsService = { buildUrl: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        OccCancelServiceOrderAdapter,
        { provide: OccEndpointsService, useValue: spyOccEndpointsService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccCancelServiceOrderAdapter);
    httpTestingController = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService) as any;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should call buildUrl and post with correct URL and payload', () => {
    const url = 'http://example.com/cancelServiceOrder';
    occEndpointsService.buildUrl.mockReturnValue(url);

    adapter.cancelServiceOrder(userId, code, cancellationDetails).subscribe();

    const req = httpTestingController.expectOne({
      method: 'POST',
      url: url,
    });

    expect(req.request.body).toEqual(cancellationDetails);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({});
  });
});
