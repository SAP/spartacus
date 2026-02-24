import {
  HttpClient,
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
  tryNormalizeHttpError,
} from '@spartacus/core';
import {
  PUNCHOUT_REQUISITION_NORMALIZER,
  PUNCHOUT_SESSION_NORMALIZER,
} from '@spartacus/punchout/core';
import {
  PunchOutLevel,
  PunchOutOperation,
  PunchoutRequisition,
  PunchoutSession,
} from '@spartacus/punchout/root';
import { Observable, throwError } from 'rxjs';
import { OccPunchoutAdapter } from './occ-punchout.adapter';

const mockSid = 'mockSid';
const discardCartEntries = false;
const mockPunchoutSessionResponse: PunchoutSession = {
  customerId: 'test@test.com',
  cartId: 'mockCartId',
  punchOutLevel: PunchOutLevel.PRODUCT,
  punchOutOperation: PunchOutOperation.EDIT,
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
  let httpClient: HttpClient;
  let mockLogger: jasmine.SpyObj<LoggerService>;
  let converter: ConverterService;

  beforeEach(() => {
    mockConverter = jasmine.createSpyObj('ConverterService', ['pipeable']);
    mockOccEndpointsService = jasmine.createSpyObj('OccEndpointsService', [
      'buildUrl',
    ]);
    mockLogger = jasmine.createSpyObj('LoggerService', ['warn', 'error']);
    TestBed.configureTestingModule({
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
    httpClient = TestBed.inject(HttpClient);
    converter = TestBed.inject(ConverterService);
    mockConverter.pipeable.and.callFake(() => {
      return (source: Observable<any>) => source;
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getPunchoutSession successfully', (done) => {
    mockOccEndpointsService.buildUrl.and.returnValue(
      `/punchout/sessions/${mockSid}`
    );

    service.getPunchoutSession(mockSid).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutSessionResponse);
        done();
      },
    });
    const req = httpMock.expectOne(`/punchout/sessions/${mockSid}`);
    expect(req.request.method).toBe('GET');
    expect(converter.pipeable).toHaveBeenCalledWith(
      PUNCHOUT_SESSION_NORMALIZER
    );
    req.flush(mockPunchoutSessionResponse);
  });

  it('should getPunchoutSessionRequisition successfully', (done) => {
    mockOccEndpointsService.buildUrl.and.returnValue(
      `/punchout/sessions/${mockSid}/requisition`
    );

    service
      .getPunchoutSessionRequisition(mockSid, discardCartEntries)
      .subscribe({
        next: (result) => {
          expect(result).toEqual(mockPunchoutRequisitionResponse);
          done();
        },
      });
    const req = httpMock.expectOne(`/punchout/sessions/${mockSid}/requisition`);
    expect(req.request.method).toBe('GET');
    expect(converter.pipeable).toHaveBeenCalledWith(
      PUNCHOUT_REQUISITION_NORMALIZER
    );
    req.flush(mockPunchoutRequisitionResponse);
  });

  it('should getPunchoutSessionRequisition successfully with discardCartEntries true', (done) => {
    mockOccEndpointsService.buildUrl.and.returnValue(
      `/punchout/sessions/${mockSid}/requisition`
    );

    service.getPunchoutSessionRequisition(mockSid, true).subscribe({
      next: (result) => {
        expect(result).toEqual(mockPunchoutRequisitionResponse);
        done();
      },
    });
    const req = httpMock.expectOne(
      `/punchout/sessions/${mockSid}/requisition?discardCartEntries=true`
    );
    expect(req.request.method).toBe('GET');
    expect(converter.pipeable).toHaveBeenCalledWith(
      PUNCHOUT_REQUISITION_NORMALIZER
    );
    req.flush(mockPunchoutRequisitionResponse);
  });

  it('should getPunchoutSessionRequisition logs error when failing', (done) => {
    mockOccEndpointsService.buildUrl.and.returnValue(
      `/punchout/sessions/${mockSid}/requisition`
    );
    const mockError = { status: 500, message: 'Server Error' };
    const result = tryNormalizeHttpError(mockError, mockLogger);
    spyOn(httpClient, 'get').and.returnValue(throwError(() => mockError));
    service
      .getPunchoutSessionRequisition(mockSid, discardCartEntries)
      .subscribe({
        error: (error) => {
          expect(error).toBe(result);
          done();
        },
      });
  });

  it('should getPunchoutSession logs error when failing', (done) => {
    mockOccEndpointsService.buildUrl.and.returnValue(
      `/punchout/sessions/${mockSid}`
    );
    const mockError = { status: 500, message: 'Server Error' };

    const result = tryNormalizeHttpError(mockError, mockLogger);
    spyOn(httpClient, 'get').and.returnValue(throwError(() => mockError));
    service.getPunchoutSession(mockSid).subscribe({
      error: (error) => {
        expect(error).toBe(result);
        done();
      },
    });
  });
});
