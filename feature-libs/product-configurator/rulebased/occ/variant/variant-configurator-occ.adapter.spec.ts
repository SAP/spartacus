import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  CartModification,
  ConverterService,
  OccEndpointsService,
  TranslationService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { CART_MODIFICATION_NORMALIZER } from 'projects/core/src/cart';
import { of } from 'rxjs';
import { VariantConfiguratorOccAdapter } from '.';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../shared/testing/configurator-test-utils';
import { OccConfiguratorVariantNormalizer } from './converters/occ-configurator-variant-normalizer';
import { OccConfiguratorVariantOverviewNormalizer } from './converters/occ-configurator-variant-overview-normalizer';
import { OccConfiguratorVariantPriceSummaryNormalizer } from './converters/occ-configurator-variant-price-summary-normalizer';
import {
  VARIANT_CONFIGURATOR_NORMALIZER,
  VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
  VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
  VARIANT_CONFIGURATOR_SERIALIZER,
} from './variant-configurator-occ.converters';
import { OccConfigurator } from './variant-configurator-occ.models';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}
class MockTranslationService {
  translate(text: string) {
    return text;
  }
}
const productCode = 'CONF_LAPTOP';
const cartEntryNo = '1';
const configId = '1234-56-7890';
const groupId = 'GROUP1';
const documentEntryNumber = '3';
const userId = 'Anony';
const documentId = '82736353';

const productConfiguration: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    configId,
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      productCode
    )
  ),
  productCode: productCode,
};

const productConfigurationOcc: OccConfigurator.Configuration = {
  configId: configId,
};

const pricesOcc: OccConfigurator.Prices = {
  priceSummary: {
    basePrice: { currencyIso: 'USD' },
  },
};

const productConfigurationForCartEntry: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration(
    configId,
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.CART_ENTRY,
      cartEntryNo
    )
  ),
  productCode: productCode,
};

const overviewOcc: OccConfigurator.Overview = { id: configId };

const cartModification: CartModification = { quantity: 1 };

describe('OccConfigurationVariantAdapter', () => {
  let occConfiguratorVariantAdapter: VariantConfiguratorOccAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEnpointsService: OccEndpointsService;
  let configuratorUtils: CommonConfiguratorUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VariantConfiguratorOccAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: VARIANT_CONFIGURATOR_NORMALIZER,
          useExisting: OccConfiguratorVariantNormalizer,
          multi: true,
        },
        {
          provide: VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
          useExisting: OccConfiguratorVariantOverviewNormalizer,
          multi: true,
        },
        {
          provide: VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER,
          useExisting: OccConfiguratorVariantPriceSummaryNormalizer,
          multi: true,
        },
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

    occConfiguratorVariantAdapter = TestBed.inject(
      VariantConfiguratorOccAdapter as Type<VariantConfiguratorOccAdapter>
    );
    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(productConfiguration.owner);

    spyOn(converterService, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call createConfiguration endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();

    occConfiguratorVariantAdapter
      .createConfiguration(productConfiguration.owner)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);
        done();
      });

    //this call doesn't do the actual mapping but retrieves the map function,
    //therefore expectation is valid here outside the subscribe
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_NORMALIZER
    );
    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'createVariantConfiguration';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'createVariantConfiguration',
      {
        productCode,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(productConfigurationOcc);
  });

  it('should call readConfiguration endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .readConfiguration(configId, groupId, productConfiguration.owner)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'readVariantConfiguration';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readVariantConfiguration',
      { configId },
      { groupId }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_NORMALIZER
    );
    mockReq.flush(productConfigurationOcc);
  });

  it('should call updateConfiguration endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .updateConfiguration(productConfiguration)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'PATCH' && req.url === 'updateVariantConfiguration';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'updateVariantConfiguration',
      {
        configId,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_NORMALIZER
    );
    expect(converterService.convert).toHaveBeenCalledWith(
      productConfiguration,
      VARIANT_CONFIGURATOR_SERIALIZER
    );
    mockReq.flush(productConfigurationOcc);
  });

  it('should call readPriceSummary endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .readPriceSummary(productConfiguration)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.priceSummary?.basePrice?.currencyIso).toBe(
          pricesOcc.priceSummary?.basePrice?.currencyIso
        );
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readVariantConfigurationPriceSummary'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readVariantConfigurationPriceSummary',
      {
        configId,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_PRICE_SUMMARY_NORMALIZER
    );

    mockReq.flush(pricesOcc);
  });

  it('should call readConfigurationForCartEntry endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    const params: CommonConfigurator.ReadConfigurationFromCartEntryParameters = {
      owner: productConfiguration.owner,
      userId: userId,
      cartId: documentId,
      cartEntryNumber: documentEntryNumber,
    };
    occConfiguratorVariantAdapter
      .readConfigurationForCartEntry(params)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readVariantConfigurationForCartEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readVariantConfigurationForCartEntry',
      {
        userId,
        cartId: documentId,
        cartEntryNumber: documentEntryNumber,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_NORMALIZER
    );
    mockReq.flush(productConfigurationOcc);
  });

  it('should call readVariantConfigurationOverviewForOrderEntry endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    const params: CommonConfigurator.ReadConfigurationFromOrderEntryParameters = {
      owner: productConfiguration.owner,
      userId: userId,
      orderId: documentId,
      orderEntryNumber: documentEntryNumber,
    };
    occConfiguratorVariantAdapter
      .readConfigurationForOrderEntry(params)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readVariantConfigurationOverviewForOrderEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readVariantConfigurationOverviewForOrderEntry',
      {
        userId,
        orderId: documentId,
        orderEntryNumber: documentEntryNumber,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER
    );
    mockReq.flush(overviewOcc);
  });

  it('should call updateVariantConfigurationForCartEntry endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    const params: Configurator.UpdateConfigurationForCartEntryParameters = {
      configuration: productConfiguration,
      userId: userId,
      cartId: documentId,
      cartEntryNumber: documentEntryNumber,
    };
    occConfiguratorVariantAdapter
      .updateConfigurationForCartEntry(params)
      .subscribe((cartModificationResult) => {
        expect(cartModificationResult.quantity).toEqual(
          cartModification.quantity
        );
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'PUT' &&
        req.url === 'updateVariantConfigurationForCartEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'updateVariantConfigurationForCartEntry',
      {
        userId,
        cartId: documentId,
        cartEntryNumber: documentEntryNumber,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );
    mockReq.flush(cartModification);
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
    occConfiguratorVariantAdapter
      .addToCart(params)
      .subscribe((cartModificationResult) => {
        expect(cartModificationResult.quantity).toEqual(
          cartModification.quantity
        );
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'POST' && req.url === 'addVariantConfigurationToCart'
      );
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );
    mockReq.flush(cartModification);
  });

  it('should set owner on readVariantConfigurationForCartEntry according to parameters', (done) => {
    const params: CommonConfigurator.ReadConfigurationFromCartEntryParameters = {
      owner: productConfigurationForCartEntry.owner,
      userId: userId,
      cartId: documentId,
      cartEntryNumber: documentEntryNumber,
    };
    spyOn(converterService, 'pipeable').and.returnValue(() =>
      of(productConfiguration)
    );
    occConfiguratorVariantAdapter
      .readConfigurationForCartEntry(params)
      .subscribe((result) => {
        const owner = result.owner;
        expect(owner).toBeDefined();
        expect(owner.type).toBe(CommonConfigurator.OwnerType.CART_ENTRY);
        expect(owner.id).toBe(cartEntryNo);
        done();
      });
  });

  it('should call getVariantConfigurationOverview endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .getConfigurationOverview(productConfiguration.configId)
      .subscribe((productConfigurationResult) => {
        expect(productConfigurationResult.configId).toBe(configId);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' && req.url === 'getVariantConfigurationOverview'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'getVariantConfigurationOverview',
      {
        configId,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER
    );
    mockReq.flush(overviewOcc);
  });

  it('should return configurator type', () => {
    expect(occConfiguratorVariantAdapter.getConfiguratorType()).toEqual(
      ConfiguratorType.VARIANT
    );
  });
});
