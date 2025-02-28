import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  LoggerService,
  OccEndpointsService,
} from '@spartacus/core';
import { PunchoutRequisition, PunchoutSession } from '@spartacus/punchout/root';
import { Observable } from 'rxjs';
import { OccPunchoutAdapter } from './occ-punchout.adapter';
// import createSpy = jasmine.createSpy;

const mockSid = 'mockSid';

const mockPunchoutSessionResponse: PunchoutSession = {
  customerId: 'test@test.com',
  cartId: 'mockCart',
  punchOutLevel: 'product',
  punchOutOperation: 'edit',
  selectedItem: 'mockItemId',
  token: {
    accessToken: 'mockToken',
    tokenType: 'Bearer',
  },
};

const mockPunchoutRequisitionResponse: PunchoutRequisition = {
  browseFormPostUrl: 'mockFormUrl',
  orderAsCXML: 'mockCXML',
};

describe('OccPunchoutAdapter', () => {
  let service: OccPunchoutAdapter;
  let httpMock: HttpTestingController;
  let mockConverter: jasmine.SpyObj<ConverterService>;
  let mockOccEndpointsService: jasmine.SpyObj<OccEndpointsService>;

  let mockLogger: jasmine.SpyObj<LoggerService>;
  beforeEach(() => {
    mockConverter = jasmine.createSpyObj('ConverterService', ['pipeable']);
    mockOccEndpointsService = jasmine.createSpyObj('OccEndpointsService', [
      'buildUrl',
    ]);
    mockLogger = jasmine.createSpyObj('LoggerService', ['warn', 'error']);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OccPunchoutAdapter,
        { provide: ConverterService, useValue: mockConverter },
        { provide: OccEndpointsService, useValue: mockOccEndpointsService },

        { provide: LoggerService, useValue: mockLogger },

        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OccPunchoutAdapter);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPunchoutSession', (done) => {
    mockOccEndpointsService.buildUrl.and.returnValue(
      `/punchout/sessions/${mockSid}`
    );
    mockConverter.pipeable.and.callFake(() => {
      return (source: Observable<any>) => source;
    });

    service.getPunchoutSession(mockSid).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutSessionResponse);
        done();
      },
    });
    const req = httpMock.expectOne(`/punchout/sessions/${mockSid}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPunchoutSessionResponse);
  });

  it('getPunchoutRequisition', (done) => {
    mockOccEndpointsService.buildUrl.and.returnValue(
      `/punchout/sessions/${mockSid}/requisition`
    );
    mockConverter.pipeable.and.callFake(() => {
      return (source: Observable<any>) => source;
    });

    service.getPunchoutRequisition(mockSid).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutRequisitionResponse);
        done();
      },
    });
    const req = httpMock.expectOne(`/punchout/sessions/${mockSid}/requisition`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPunchoutRequisitionResponse);
  });
});
