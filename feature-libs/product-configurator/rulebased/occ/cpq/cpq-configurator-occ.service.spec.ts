import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CART_MODIFICATION_NORMALIZER,
  ConverterService,
  OccEndpointsService,
} from '@spartacus/core';
import { Configurator } from '../../core/model/configurator.model';
import { productConfiguration } from '../../shared/testing/configurator-test-data';
import { CpqConfiguratorOccService } from './cpq-configurator-occ.service';

describe('CpqConfigurationOccService', () => {
  const configId = '1234-56-7890';
  const userId = 'Anony';
  const documentId = '82736353';

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
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call addToCart endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    const params: Configurator.AddToCartParameters = {
      productCode: 'Product',
      quantity: 1,
      configId: configId,
      owner: productConfiguration.owner,
      userId: userId,
      cartId: documentId,
    };
    serviceUnderTest.addToCart(params).subscribe();
    done();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === 'addCpqConfigurationToCart';
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );
  });
});
