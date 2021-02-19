import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CartModification,
  CART_MODIFICATION_NORMALIZER,
  ConverterService,
  OccEndpointsService,
} from '@spartacus/core';
import { Configurator } from '../../core/model/configurator.model';
import { productConfiguration } from '../../shared/testing/configurator-test-data';
import { CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER } from './converters/cpq-configurator-occ.converters';
import { CpqConfiguratorOccService } from './cpq-configurator-occ.service';

describe('CpqConfigurationOccService', () => {
  const configId = '1234-56-7890';
  const userId = 'Anony';
  const documentId = '82736353';
  const addToCartResponse: CartModification = {
    quantityAdded: 1,
    entry: { entryNumber: 3 },
    statusCode: '201',
  };
  const addToCartParams: Configurator.AddToCartParameters = {
    productCode: 'Product',
    quantity: 1,
    configId: configId,
    owner: productConfiguration.owner,
    userId: userId,
    cartId: documentId,
  };

  class MockOccEndpointsService {
    getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
      return this.getEndpoint(endpoint);
    }
    getEndpoint(url: string) {
      return url;
    }
  }

  let serviceUnderTest: CpqConfiguratorOccService;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CpqConfiguratorOccService,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );
    converterService = TestBed.inject(
      ConverterService as Type<ConverterService>
    );
    occEnpointsService = TestBed.inject(
      OccEndpointsService as Type<OccEndpointsService>
    );

    serviceUnderTest = TestBed.inject(
      CpqConfiguratorOccService as Type<CpqConfiguratorOccService>
    );

    spyOn(converterService, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
    spyOn(converterService, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call addToCart endpoint', () => {
    serviceUnderTest.addToCart(addToCartParams).subscribe((response) => {
      expect(response).toBe(addToCartResponse);
    });
    expect(converterService.convert).toHaveBeenCalledWith(
      addToCartParams,
      CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER
    );

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === 'addCpqConfigurationToCart';
    });
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(addToCartResponse);

    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );
  });
});
