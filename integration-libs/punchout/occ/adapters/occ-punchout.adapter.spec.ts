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
import { firstValueFrom, Observable, throwError } from 'rxjs';
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
  let mockConverter: {
    pipeable: ReturnType<typeof vi.fn>;
  };
  let mockOccEndpointsService: {
    buildUrl: ReturnType<typeof vi.fn>;
  };
  let httpClient: HttpClient;
  let mockLogger: {
    warn: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };
  let converter: ConverterService;

  beforeEach(() => {
    mockConverter = { pipeable: vi.fn() };
    mockOccEndpointsService = { buildUrl: vi.fn() };
    mockLogger = { warn: vi.fn(), error: vi.fn() };
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
    mockConverter.pipeable.mockImplementation(() => {
      return (source: Observable<any>) => source;
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getPunchoutSession successfully', async () => {
    mockOccEndpointsService.buildUrl.mockReturnValue(
      `/punchout/sessions/${mockSid}`
    );

    const promise = firstValueFrom(service.getPunchoutSession(mockSid));
    const req = httpMock.expectOne(`/punchout/sessions/${mockSid}`);
    expect(req.request.method).toBe('GET');
    expect(converter.pipeable).toHaveBeenCalledWith(
      PUNCHOUT_SESSION_NORMALIZER
    );
    req.flush(mockPunchoutSessionResponse);
    const result = await promise;
    expect(result).toEqual(mockPunchoutSessionResponse);
  });

  it('should getPunchoutSessionRequisition successfully', async () => {
    mockOccEndpointsService.buildUrl.mockReturnValue(
      `/punchout/sessions/${mockSid}/requisition`
    );

    const promise = firstValueFrom(
      service.getPunchoutSessionRequisition(mockSid, discardCartEntries)
    );
    const req = httpMock.expectOne(`/punchout/sessions/${mockSid}/requisition`);
    expect(req.request.method).toBe('GET');
    expect(converter.pipeable).toHaveBeenCalledWith(
      PUNCHOUT_REQUISITION_NORMALIZER
    );
    req.flush(mockPunchoutRequisitionResponse);
    const result = await promise;
    expect(result).toEqual(mockPunchoutRequisitionResponse);
  });

  it('should getPunchoutSessionRequisition successfully with discardCartEntries true', async () => {
    mockOccEndpointsService.buildUrl.mockReturnValue(
      `/punchout/sessions/${mockSid}/requisition`
    );

    const promise = firstValueFrom(
      service.getPunchoutSessionRequisition(mockSid, true)
    );
    const req = httpMock.expectOne(
      `/punchout/sessions/${mockSid}/requisition?discardCartEntries=true`
    );
    expect(req.request.method).toBe('GET');
    expect(converter.pipeable).toHaveBeenCalledWith(
      PUNCHOUT_REQUISITION_NORMALIZER
    );
    req.flush(mockPunchoutRequisitionResponse);
    const result = await promise;
    expect(result).toEqual(mockPunchoutRequisitionResponse);
  });

  it('should getPunchoutSessionRequisition logs error when failing', async () => {
    mockOccEndpointsService.buildUrl.mockReturnValue(
      `/punchout/sessions/${mockSid}/requisition`
    );
    const mockError = { status: 500, message: 'Server Error' };
    const expected = tryNormalizeHttpError(mockError, mockLogger as any);
    vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => mockError));
    await expect(
      firstValueFrom(
        service.getPunchoutSessionRequisition(mockSid, discardCartEntries)
      )
    ).rejects.toStrictEqual(expected);
  });

  it('should getPunchoutSession logs error when failing', async () => {
    mockOccEndpointsService.buildUrl.mockReturnValue(
      `/punchout/sessions/${mockSid}`
    );
    const mockError = { status: 500, message: 'Server Error' };

    const expected = tryNormalizeHttpError(mockError, mockLogger as any);
    vi.spyOn(httpClient, 'get').mockReturnValue(throwError(() => mockError));
    await expect(
      firstValueFrom(service.getPunchoutSession(mockSid))
    ).rejects.toStrictEqual(expected);
  });
});
