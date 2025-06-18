import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ProductAvailabilities } from '../../../model/product.model';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccProductAvailabilityAdapter } from './occ-product-availability-adapter';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('OccProductAvailabilityAdapter', () => {
  let adapter: OccProductAvailabilityAdapter;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  const mockProductCode = '12345';
  const mockUnitSapCode = 'EA';
  const mockAvailabilityUrl = `https://example.com/productAvailabilities?filters=${mockProductCode}:${mockUnitSapCode}`;
  const mockResponse = {
    availabilityItems: [
      {
        unitAvailabilities: [
          {
            quantity: '25',
            status: 'inStock',
          },
        ],
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        OccProductAvailabilityAdapter,
        {
          provide: OccEndpointsService,
          useValue: {
            buildUrl: jasmine
              .createSpy('buildUrl')
              .and.returnValue(mockAvailabilityUrl),
          },
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    adapter = TestBed.inject(OccProductAvailabilityAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  it('should load real-time stock data', () => {
    let result: ProductAvailabilities | undefined;

    adapter
      .loadRealTimeStock(mockProductCode, mockUnitSapCode)
      .subscribe((data) => {
        result = data;
      });

    const req = httpMock.expectOne(mockAvailabilityUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(result).toEqual(
      mockResponse.availabilityItems[0].unitAvailabilities[0]
    );
    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'productAvailabilities',
      {
        urlParams: {
          productCode: mockProductCode,
          unitSapCode: mockUnitSapCode,
        },
      }
    );
  });

  it('should return an empty object if the response is missing availability data', () => {
    const mockEmptyResponse = { availabilityItems: [] };
    let result: ProductAvailabilities | undefined;

    adapter
      .loadRealTimeStock(mockProductCode, mockUnitSapCode)
      .subscribe((data) => {
        result = data;
      });

    const req = httpMock.expectOne(mockAvailabilityUrl);
    req.flush(mockEmptyResponse);

    expect(result).toEqual({});
  });
});
