import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Occ } from '../../occ/occ-models/occ.models';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { ConverterService } from '../../util/converter.service';
import { PRODUCT_REFERENCES_NORMALIZER } from '../connectors/references/converters';
import { OccProductReferencesAdapter } from './occ-product-references.adapter';
import createSpy = jasmine.createSpy;

const productCode = 'productCode';
const product = {
  code: productCode,
  name: 'testProduct',
};
const referenceType = 'SIMILAR';
const pageSize = 2;
const productReferences: Occ.ProductReferenceList = {
  references: [
    { referenceType: 'SIMILAR', target: product },
    { referenceType: 'ACCESSORIES', target: product },
  ],
};
const endpoint = '/productReferences';

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.returnValue(
    endpoint
  );
}

class MockConvertService {
  convert = createSpy().and.callFake(x => x);
  pipeable = createSpy().and.returnValue(x => x);
}

describe('OccProductReferencesAdapter', () => {
  let service: OccProductReferencesAdapter;
  let httpMock: HttpTestingController;
  let endpoints: OccEndpointsService;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductReferencesAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        { provide: ConverterService, useClass: MockConvertService },
      ],
    });

    service = TestBed.get(OccProductReferencesAdapter);
    endpoints = TestBed.get(OccEndpointsService);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
    it('should load reference list', () => {
      let loadResult;
      service.load(productCode).subscribe(res => (loadResult = res));

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(productReferences);

      expect(loadResult).toEqual(productReferences);
    });

    it('should use references endpoint', () => {
      service.load(productCode, referenceType, pageSize).subscribe();
      const mockReq = httpMock.expectOne(endpoint);
      mockReq.flush(productReferences);
      expect(endpoints.getUrl).toHaveBeenCalledWith(
        'productReferences',
        {
          productCode,
        },
        { referenceType, pageSize }
      );
    });

    it('should use converter', () => {
      service.load('333').subscribe();
      httpMock.expectOne(endpoint).flush(productReferences);

      expect(converter.pipeable).toHaveBeenCalledWith(
        PRODUCT_REFERENCES_NORMALIZER
      );
    });
  });
});
