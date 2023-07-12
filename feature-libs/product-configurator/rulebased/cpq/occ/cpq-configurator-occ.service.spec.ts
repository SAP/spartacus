import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CartModification,
  CART_MODIFICATION_NORMALIZER,
} from '@spartacus/cart/base/root';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  OccEndpointsService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Configurator } from '@spartacus/product-configurator/rulebased';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import {
  CPQ_CONFIGURATOR_ADD_TO_CART_SERIALIZER,
  CPQ_CONFIGURATOR_UPDATE_CART_ENTRY_SERIALIZER,
} from './converters/cpq-configurator-occ.converters';
import { CpqConfiguratorOccService } from './cpq-configurator-occ.service';
import {
  CPQ_CONFIGURATOR_NORMALIZER,
  CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER,
  CPQ_CONFIGURATOR_SERIALIZER,
  CPQ_CONFIGURATOR_QUANTITY_SERIALIZER,
} from '../common/converters/cpq-configurator.converters';
import { Cpq } from '../common/cpq.models';

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
  const updateCartParams: Configurator.UpdateConfigurationForCartEntryParameters =
    {
      userId: userId,
      cartId: documentId,
      cartEntryNumber: entryNumber.toString(),
      configuration: {
        ...ConfiguratorTestUtils.createConfiguration(configId, {
          type: CommonConfigurator.OwnerType.CART_ENTRY,
          id: entryNumber.toString(),
          key: ConfiguratorModelUtils.getOwnerKey(
            CommonConfigurator.OwnerType.PRODUCT,
            entryNumber.toString()
          ),
          configuratorType: ConfiguratorType.CPQ,
        }),
      },
    };

  const readConfigCartEntryParams: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
    {
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

  const readConfigOrderEntryParams: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
    {
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

  const errorMessages = ['error message 1', 'error message 2'];
  const numberOfConflicts = 2;
  const attributeCode = '111';
  const attributeValueId = 'abc';
  const tabId = '11';

  const cpqConfiguration: Cpq.Configuration = {
    productSystemId: productCode,
    currencyISOCode: 'USD',
    errorMessages: errorMessages,
    numberOfConflicts: numberOfConflicts,
    configurationId: configId,
  };

  const configuration: Configurator.Configuration = {
    ...ConfiguratorTestUtils.createConfiguration(
      configId,
      ConfiguratorModelUtils.createInitialOwner()
    ),
    productCode: productCode,
  };

  const updateAttribute: Cpq.UpdateAttribute = {
    configurationId: configId,
    standardAttributeCode: attributeCode,
    changeAttributeValue: {
      attributeValueIds: attributeValueId,
    },
    tabId: tabId,
  };

  const updateValue: Cpq.UpdateValue = {
    configurationId: configId,
    standardAttributeCode: attributeCode,
    attributeValueId: attributeValueId,
    quantity: 5,
    tabId: tabId,
  };

  class MockOccEndpointsService {
    buildUrl(
      endpoint: string,
      _attributes?: DynamicAttributes,
      _propertiesToOmit?: BaseOccUrlProperties
    ) {
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

    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
    spyOn(converterService, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call addToCart endpoint', () => {
    spyOn(converterService, 'convert').and.callThrough();
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

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'addCpqConfigurationToCart',
      {
        urlParams: {
          userId: userId,
          cartId: documentId,
        },
      }
    );
  });

  it('should call readCpqConfigurationForCartEntry endpoint', () => {
    serviceUnderTest
      .getConfigIdForCartEntry(readConfigCartEntryParams)
      .subscribe((response) => {
        expect(response).toBe(configId);
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' && req.url === 'readCpqConfigurationForCartEntry'
      );
    });
    mockReq.flush({ configId: configId });

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'readCpqConfigurationForCartEntry',
      {
        urlParams: {
          userId: userId,
          cartId: documentId,
          cartEntryNumber: '3',
        },
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

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'readCpqConfigurationForOrderEntry',
      {
        urlParams: {
          userId: userId,
          orderId: documentId,
          orderEntryNumber: '3',
        },
      }
    );
  });

  it('should call upateCart endpoint', () => {
    spyOn(converterService, 'convert').and.callThrough();
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

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'updateCpqConfigurationForCartEntry',
      {
        urlParams: {
          userId: userId,
          cartId: documentId,
          cartEntryNumber: '3',
        },
      }
    );
  });

  it('should create a configuration and call normalizer', () => {
    serviceUnderTest.createConfiguration(productCode).subscribe((config) => {
      expect(config.errorMessages).toBe(errorMessages);
    });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'createCpqConfiguration';
    });
    mockReq.flush(cpqConfiguration);

    expect(converterService.pipeable).toHaveBeenCalledWith(
      CPQ_CONFIGURATOR_NORMALIZER
    );

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'createCpqConfiguration',
      {
        urlParams: {
          productCode: productCode,
        },
      }
    );
  });

  it('should read the default configuration tab and call normalizer', () => {
    serviceUnderTest.readConfiguration(configId).subscribe((config) => {
      expect(config.errorMessages).toBe(errorMessages);
    });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'readCpqConfiguration';
    });
    mockReq.flush(cpqConfiguration);

    expect(converterService.pipeable).toHaveBeenCalledWith(
      CPQ_CONFIGURATOR_NORMALIZER
    );

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'readCpqConfiguration',
      {
        urlParams: {
          configurationId: configId,
        },
        queryParams: undefined,
      }
    );
  });

  it('should read the desired configuration tab and call normalizer', () => {
    serviceUnderTest.readConfiguration(configId, tabId).subscribe((config) => {
      expect(config.errorMessages).toBe(errorMessages);
    });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'readCpqConfiguration';
    });
    mockReq.flush(cpqConfiguration);

    expect(converterService.pipeable).toHaveBeenCalledWith(
      CPQ_CONFIGURATOR_NORMALIZER
    );

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'readCpqConfiguration',
      {
        urlParams: {
          configurationId: configId,
        },
        queryParams: {
          tabId: tabId,
        },
      }
    );
  });

  it('should read the configuration overview and call the overview normalizer', () => {
    serviceUnderTest.readConfigurationOverview(configId).subscribe((config) => {
      expect(config.numberOfConflicts).toBe(numberOfConflicts);
    });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'readCpqConfigurationOverview';
    });
    mockReq.flush(cpqConfiguration);

    expect(converterService.pipeable).toHaveBeenCalledWith(
      CPQ_CONFIGURATOR_OVERVIEW_NORMALIZER
    );

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'readCpqConfigurationOverview',
      {
        urlParams: {
          configurationId: configId,
        },
      }
    );
  });

  it('should call serializer, update an attribute, retrieve configuration and call normalizer', () => {
    spyOn(converterService, 'convert').and.returnValue(updateAttribute);
    serviceUnderTest.updateAttribute(configuration).subscribe((config) => {
      expect(config.errorMessages).toBe(errorMessages);
    });

    expect(converterService.convert).toHaveBeenCalledWith(
      configuration,
      CPQ_CONFIGURATOR_SERIALIZER
    );

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'PATCH' && req.url === 'updateCpqAttribute';
    });
    mockReq.flush(cpqConfiguration);

    expect(converterService.pipeable).toHaveBeenCalledWith(
      CPQ_CONFIGURATOR_NORMALIZER
    );

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'updateCpqAttribute',
      {
        urlParams: {
          configurationId: configId,
          attributeCode: attributeCode,
        },
        queryParams: {
          tabId: tabId,
        },
      }
    );
  });

  it('should call serializer, update an attribute value quantity, retrieve configuration and call normalizer', () => {
    spyOn(converterService, 'convert').and.returnValue(updateValue);
    serviceUnderTest.updateValueQuantity(configuration).subscribe((config) => {
      expect(config.errorMessages).toBe(errorMessages);
    });

    expect(converterService.convert).toHaveBeenCalledWith(
      configuration,
      CPQ_CONFIGURATOR_QUANTITY_SERIALIZER
    );

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'PATCH' && req.url === 'updateCpqAttributeValueQuantity'
      );
    });
    mockReq.flush(cpqConfiguration);

    expect(converterService.pipeable).toHaveBeenCalledWith(
      CPQ_CONFIGURATOR_NORMALIZER
    );

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'updateCpqAttributeValueQuantity',
      {
        urlParams: {
          configurationId: configId,
          attributeCode: attributeCode,
          attributeValueId: attributeValueId,
        },
        queryParams: {
          tabId: tabId,
        },
      }
    );
  });

  it('should read the configuration for a cart entry and call normalizer', () => {
    serviceUnderTest
      .readConfigurationForCartEntry(readConfigCartEntryParams)
      .subscribe((config) => {
        expect(config.errorMessages).toBe(errorMessages);
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readCpqConfigurationForCartEntryFull'
      );
    });
    mockReq.flush(cpqConfiguration);

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'readCpqConfigurationForCartEntryFull',
      {
        urlParams: {
          userId: userId,
          cartId: documentId,
          cartEntryNumber: '3',
        },
      }
    );
  });

  it('should read the configuration for an order entry and call normalizer', () => {
    serviceUnderTest
      .readConfigurationForOrderEntry(readConfigOrderEntryParams)
      .subscribe((config) => {
        expect(config.errorMessages).toBe(errorMessages);
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readCpqConfigurationForOrderEntryFull'
      );
    });
    mockReq.flush(cpqConfiguration);

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'readCpqConfigurationForOrderEntryFull',
      {
        urlParams: {
          userId: userId,
          orderId: documentId,
          orderEntryNumber: '3',
        },
      }
    );
  });
});
