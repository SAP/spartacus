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
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import {
  CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
  CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
} from './converters/cpq-configurator-occ.converters';
import { CpqConfiguratorOccService } from './cpq-configurator-occ.service';

describe('CpqConfigurationOccService', () => {
  const configId = '1234-56-7890';
  const userId = 'Anony';
  const documentId = '82736353';
  const entryNumber = 3;
  const productCode = 'Product';
  const cartResponse: CartModification = {
    quantityAdded: 1,
    entry: { entryNumber: entryNumber },
    statusCode: '201',
  };
  const addToCartParams: Configurator.AddToCartParameters = {
    productCode: productCode,
    quantity: 1,
    configId: configId,
    owner: {
      type: CommonConfigurator.OwnerType.PRODUCT,
      id: productCode,
      key: ConfiguratorModelUtils.getOwnerKey(
        CommonConfigurator.OwnerType.PRODUCT,
        productCode
      ),
      configuratorType: ConfiguratorType.CPQ,
    },
    userId: userId,
    cartId: documentId,
  };
  const updateCartParams: Configurator.UpdateConfigurationForCartEntryParameters = {
    userId: userId,
    cartId: documentId,
    cartEntryNumber: entryNumber.toString(),
    configuration: {
      configId: configId,
      owner: {
        type: CommonConfigurator.OwnerType.CART_ENTRY,
        id: entryNumber.toString(),
        key: ConfiguratorModelUtils.getOwnerKey(
          CommonConfigurator.OwnerType.PRODUCT,
          entryNumber.toString()
        ),
        configuratorType: ConfiguratorType.CPQ,
      },
    },
  };

  const readConfigCartParams: CommonConfigurator.ReadConfigurationFromCartEntryParameters = {
    userId: userId,
    cartId: documentId,
    cartEntryNumber: '3',
    owner: {
      type: CommonConfigurator.OwnerType.CART_ENTRY,
      id: productCode,
      key: ConfiguratorModelUtils.getOwnerKey(
        CommonConfigurator.OwnerType.CART_ENTRY,
        productCode
      ),
      configuratorType: ConfiguratorType.CPQ,
    },
  };

  const readConfigOrderEntryParams: CommonConfigurator.ReadConfigurationFromOrderEntryParameters = {
    userId: userId,
    orderId: documentId,
    orderEntryNumber: '3',
    owner: {
      type: CommonConfigurator.OwnerType.ORDER_ENTRY,
      id: productCode,
      key: ConfiguratorModelUtils.getOwnerKey(
        CommonConfigurator.OwnerType.ORDER_ENTRY,
        productCode
      ),
      configuratorType: ConfiguratorType.CPQ,
    },
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
      expect(response).toBe(cartResponse);
    });
    expect(converterService.convert).toHaveBeenCalledWith(
      addToCartParams,
      CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER
    );

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === 'addCpqConfigurationToCart';
    });
    mockReq.flush(cartResponse);

    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'addCpqConfigurationToCart',
      {
        userId: userId,
        cartId: documentId,
      }
    );
  });

  it('should call readCpqConfigurationForCartEntry endpoint', () => {
    serviceUnderTest
      .getConfigIdForCartEntry(readConfigCartParams)
      .subscribe((response) => {
        expect(response).toBe(configId);
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' && req.url === 'readCpqConfigurationForCartEntry'
      );
    });
    mockReq.flush({ configId: configId });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readCpqConfigurationForCartEntry',
      {
        userId: userId,
        cartId: documentId,
        cartEntryNumber: '3',
      }
    );
  });

  it('should call readCpqConfigurationForOrderEntry endpoint', () => {
    serviceUnderTest
      .getConfigIdForOrderEntry(readConfigOrderEntryParams)
      .subscribe((response) => {
        expect(response).toBe(configId);
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' && req.url === 'readCpqConfigurationForOrderEntry'
      );
    });
    mockReq.flush({ configId: configId });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readCpqConfigurationForOrderEntry',
      {
        userId: userId,
        orderId: documentId,
        orderEntryNumber: '3',
      }
    );
  });

  it('should call upateCart endpoint', () => {
    serviceUnderTest.updateCartEntry(updateCartParams).subscribe((response) => {
      expect(response).toBe(cartResponse);
    });
    expect(converterService.convert).toHaveBeenCalledWith(
      updateCartParams,
      CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER
    );

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'PUT' && req.url === 'updateCpqConfigurationForCartEntry'
      );
    });
    mockReq.flush(cartResponse);

    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'updateCpqConfigurationForCartEntry',
      {
        userId: userId,
        cartId: documentId,
        cartEntryNumber: '3',
      }
    );
  });
});
