import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccCancelServiceOrderAdapter } from './occ-cancel-service-order.adapter';
import { OccEndpointsService } from '@spartacus/core';
import { CancellationDetails } from '@spartacus/s4-service/root';

describe('OccCancelServiceOrderAdapter', () => {
  let adapter: OccCancelServiceOrderAdapter;
  let httpTestingController: HttpTestingController;
  let occEndpointsService: jasmine.SpyObj<OccEndpointsService>;
  const userId = 'testUser';
  const code = 'testCode';
  const cancellationDetails: CancellationDetails = {
    cancellationRequestEntryInputs: [],
  };

  beforeEach(() => {
    const spyOccEndpointsService = jasmine.createSpyObj('OccEndpointsService', [
      'buildUrl',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCancelServiceOrderAdapter,
        { provide: OccEndpointsService, useValue: spyOccEndpointsService },
      ],
    });

    adapter = TestBed.inject(OccCancelServiceOrderAdapter);
    httpTestingController = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(
      OccEndpointsService
    ) as jasmine.SpyObj<OccEndpointsService>;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should call buildUrl and post with correct URL and payload', () => {
    const url = 'http://example.com/cancelServiceOrder';
    occEndpointsService.buildUrl.and.returnValue(url);

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
