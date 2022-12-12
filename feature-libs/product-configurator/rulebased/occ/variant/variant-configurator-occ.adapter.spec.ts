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
  TranslationService,
  OCC_HTTP_TOKEN,
} from '@spartacus/core';
import {
  CommonConfigurator,
  CommonConfiguratorUtilsService,
  ConfiguratorModelUtils,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { of } from 'rxjs';
import {
  VariantConfiguratorOccAdapter,
  VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
} from '.';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { OccConfiguratorTestUtils } from '../../testing/occ-configurator-test-utils';
import { OccConfiguratorVariantNormalizer } from './converters/occ-configurator-variant-normalizer';
import { OccConfiguratorVariantOverviewNormalizer } from './converters/occ-configurator-variant-overview-normalizer';
import { OccConfiguratorVariantPriceNormalizer } from './converters/occ-configurator-variant-price-normalizer';
import {
  VARIANT_CONFIGURATOR_NORMALIZER,
  VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER,
  VARIANT_CONFIGURATOR_SERIALIZER,
} from './variant-configurator-occ.converters';
import { OccConfigurator } from './variant-configurator-occ.models';
import { ConfiguratorExpertModeService } from '../../core/services/configurator-expert-mode.service';

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

class MockTranslationService {
  translate(text: string) {
    return text;
  }
}

const productCode = 'CONF_LAPTOP';
const kbLogSys = 'RR5CLNT910';
let expMode = true;
const cartEntryNo = '1';
const configId = '1234-56-7890';
const groupId = 'GROUP1';
const documentEntryNumber = '3';
const userId = 'Anony';
const documentId = '82736353';

//const mockProductConfiguration: Configurator.Configuration = productConfiguration;

const configuration: Configurator.Configuration = {
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
  rootProduct: productCode,
};

const kbKeyOcc: OccConfigurator.KB = {
  kbName: productCode + '_KB',
  kbLogsys: kbLogSys,
  kbVersion: '1',
  kbBuildNumber: '2',
};

const pricesOcc: OccConfigurator.Prices =
  OccConfiguratorTestUtils.createOccConfiguratorPrices(false, 1, 0, 3, 3);

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

const overviewOcc: OccConfigurator.Overview = {
  id: configId,
  productCode: productCode,
};

const variantSearchResult: Configurator.Variant[] = [{ productCode: 'a' }];

const cartModification: CartModification = { quantity: 1 };

describe('OccConfigurationVariantAdapter', () => {
  let occConfiguratorVariantAdapter: VariantConfiguratorOccAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEndpointsService: OccEndpointsService;
  let configuratorUtils: CommonConfiguratorUtilsService;
  let configExpertModeService: ConfiguratorExpertModeService;

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
          provide: VARIANT_CONFIGURATOR_PRICE_NORMALIZER,
          useExisting: OccConfiguratorVariantPriceNormalizer,
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
    occEndpointsService = TestBed.inject(
      OccEndpointsService as Type<OccEndpointsService>
    );

    occConfiguratorVariantAdapter = TestBed.inject(
      VariantConfiguratorOccAdapter as Type<VariantConfiguratorOccAdapter>
    );
    configuratorUtils = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(configuration.owner);
    configExpertModeService = TestBed.inject(
      ConfiguratorExpertModeService as Type<ConfiguratorExpertModeService>
    );
    configExpertModeService.setExpModeRequested(expMode);

    spyOn(converterService, 'convert').and.callThrough();
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
    productConfigurationOcc.kbKey = undefined;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call createConfiguration endpoint', (done) => {
    expMode = false;
    configExpertModeService.setExpModeRequested(expMode);
    productConfigurationOcc.kbKey = undefined;
    spyOn(converterService, 'pipeable').and.callThrough();

    occConfiguratorVariantAdapter
      .createConfiguration(configuration.owner)
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

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'createVariantConfiguration',
      {
        urlParams: {
          productCode,
        },
        queryParams: { expMode },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
      sendUserIdAsHeader: true,
    });
    mockReq.flush(productConfigurationOcc);
  });

  it('should call createConfiguration endpoint for expert mode', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    productConfigurationOcc.kbKey = kbKeyOcc;

    occConfiguratorVariantAdapter
      .createConfiguration(configuration.owner)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);

        //check if expert mode data has been transferred to model
        expect(resultConfiguration.kbKey?.kbLogsys).toBe(kbLogSys);

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

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'createVariantConfiguration',
      {
        urlParams: {
          productCode,
        },
        queryParams: { expMode },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
      sendUserIdAsHeader: true,
    });
    mockReq.flush(productConfigurationOcc);
  });

  it('should call readConfiguration endpoint', (done) => {
    expMode = false;
    configExpertModeService.setExpModeRequested(expMode);
    productConfigurationOcc.kbKey = undefined;
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .readConfiguration(configId, groupId, configuration.owner)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'readVariantConfiguration';
    });

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'readVariantConfiguration',
      {
        urlParams: { configId },
        queryParams: { groupId, expMode },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
      sendUserIdAsHeader: true,
    });
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_NORMALIZER
    );
    mockReq.flush(productConfigurationOcc);
  });

  it('should call readConfiguration endpoint for expert mode', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    productConfigurationOcc.kbKey = kbKeyOcc;

    occConfiguratorVariantAdapter
      .readConfiguration(configId, groupId, configuration.owner)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);

        //check if expert mode data has been transferred to model
        expect(resultConfiguration.kbKey?.kbLogsys).toBe(kbLogSys);

        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'readVariantConfiguration';
    });

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'readVariantConfiguration',
      {
        urlParams: { configId },
        queryParams: { groupId, expMode },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
      sendUserIdAsHeader: true,
    });
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_NORMALIZER
    );
    mockReq.flush(productConfigurationOcc);
  });

  it('should call updateConfiguration endpoint', (done) => {
    expMode = false;
    configExpertModeService.setExpModeRequested(expMode);
    productConfigurationOcc.kbKey = undefined;
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .updateConfiguration(configuration)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'PATCH' && req.url === 'updateVariantConfiguration';
    });

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'updateVariantConfiguration',
      {
        urlParams: {
          configId,
        },
        queryParams: { expMode },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
      sendUserIdAsHeader: true,
    });
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_NORMALIZER
    );
    expect(converterService.convert).toHaveBeenCalledWith(
      configuration,
      VARIANT_CONFIGURATOR_SERIALIZER
    );
    mockReq.flush(productConfigurationOcc);
  });

  it('should call updateConfiguration endpoint for expert mode', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    productConfigurationOcc.kbKey = kbKeyOcc;

    occConfiguratorVariantAdapter
      .updateConfiguration(configuration)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.configId).toEqual(configId);
        //check if expert mode data has been transferred to model
        expect(resultConfiguration.kbKey?.kbLogsys).toBe(kbLogSys);

        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'PATCH' && req.url === 'updateVariantConfiguration';
    });

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'updateVariantConfiguration',
      {
        urlParams: {
          configId,
        },
        queryParams: { expMode },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
      sendUserIdAsHeader: true,
    });
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_NORMALIZER
    );
    expect(converterService.convert).toHaveBeenCalledWith(
      configuration,
      VARIANT_CONFIGURATOR_SERIALIZER
    );
    mockReq.flush(productConfigurationOcc);
  });

  it('should call readPriceSummary endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .readPriceSummary(configuration)
      .subscribe((resultConfiguration) => {
        expect(resultConfiguration.priceSummary?.basePrice?.currencyIso).toBe(
          pricesOcc.priceSummary?.basePrice?.currencyIso
        );
        expect(resultConfiguration.priceSupplements?.length).toBe(3);
        const suppls = resultConfiguration.priceSupplements;
        const supp1 = suppls ? suppls[0] : undefined;
        expect(supp1).toBeDefined();
        if (supp1) {
          expect(supp1.attributeUiKey).toBe('group1@attribute_1_1');
          expect(supp1.valueSupplements.length).toBe(3);
          expect(supp1.valueSupplements[0].attributeValueKey).toBe('value_1_1');
          expect(supp1.valueSupplements[1].attributeValueKey).toBe('value_1_2');
          expect(supp1.valueSupplements[2].attributeValueKey).toBe('value_1_3');
        }
        const supp2 = suppls ? suppls[1] : undefined;
        expect(supp2).toBeDefined();
        if (supp2) {
          expect(supp2.attributeUiKey).toBe('group1@attribute_1_2');
          expect(supp2.valueSupplements.length).toBe(3);
          expect(supp2.valueSupplements[0].attributeValueKey).toBe('value_2_1');
          expect(supp2.valueSupplements[1].attributeValueKey).toBe('value_2_2');
          expect(supp2.valueSupplements[2].attributeValueKey).toBe('value_2_3');
        }
        const supp3 = suppls ? suppls[2] : undefined;
        expect(supp3).toBeDefined();
        if (supp3) {
          expect(supp3.attributeUiKey).toBe('group1@attribute_1_3');
          expect(supp3.valueSupplements.length).toBe(3);
          expect(supp3.valueSupplements[0].attributeValueKey).toBe('value_3_1');
          expect(supp3.valueSupplements[1].attributeValueKey).toBe('value_3_2');
          expect(supp3.valueSupplements[2].attributeValueKey).toBe('value_3_3');
          done();
        }
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readVariantConfigurationPriceSummary'
      );
    });

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'readVariantConfigurationPriceSummary',
      {
        urlParams: {
          configId,
        },
        queryParams: { groupId: configuration?.interactionState?.currentGroup },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
      sendUserIdAsHeader: true,
    });
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_PRICE_NORMALIZER
    );

    mockReq.flush(pricesOcc);
  });
  describe('readConfigurationForCartEntry', () => {
    const expMode = false;
    const params: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
      {
        owner: configuration.owner,
        userId: userId,
        cartId: documentId,
        cartEntryNumber: documentEntryNumber,
      };
    it('should call readConfigurationForCartEntry endpoint', (done) => {
      spyOn(converterService, 'pipeable').and.callThrough();

      occConfiguratorVariantAdapter
        .readConfigurationForCartEntry(params)
        .subscribe((resultConfiguration) => {
          expect(resultConfiguration.configId).toEqual(configId);
          expect(resultConfiguration.kbKey).toBeUndefined();
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url === 'readVariantConfigurationForCartEntry'
        );
      });

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'readVariantConfigurationForCartEntry',
        {
          urlParams: {
            userId,
            cartId: documentId,
            cartEntryNumber: documentEntryNumber,
          },
          queryParams: { expMode },
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(converterService.pipeable).toHaveBeenCalledWith(
        VARIANT_CONFIGURATOR_NORMALIZER
      );
      mockReq.flush(productConfigurationOcc);
    });

    it('should try to activate expert mode if requested', (done) => {
      spyOn(converterService, 'pipeable').and.callThrough();
      configExpertModeService.setExpModeRequested(true);
      productConfigurationOcc.kbKey = kbKeyOcc;
      occConfiguratorVariantAdapter
        .readConfigurationForCartEntry(params)
        .subscribe((resultConfiguration) => {
          expect(resultConfiguration.configId).toEqual(configId);

          //check if expert mode data has been transferred to model
          expect(resultConfiguration.kbKey?.kbLogsys).toBe(kbLogSys);

          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url === 'readVariantConfigurationForCartEntry'
        );
      });

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'readVariantConfigurationForCartEntry',
        {
          urlParams: {
            userId,
            cartId: documentId,
            cartEntryNumber: documentEntryNumber,
          },
          queryParams: { expMode: true },
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(converterService.pipeable).toHaveBeenCalledWith(
        VARIANT_CONFIGURATOR_NORMALIZER
      );
      mockReq.flush(productConfigurationOcc);
    });
  });

  it('should call readVariantConfigurationOverviewForOrderEntry endpoint', (done) => {
    spyOn(converterService, 'pipeable').and.callThrough();
    const params: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
      {
        owner: configuration.owner,
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

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'readVariantConfigurationOverviewForOrderEntry',
      {
        urlParams: {
          userId,
          orderId: documentId,
          orderEntryNumber: documentEntryNumber,
        },
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
      configuration: configuration,
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

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'updateVariantConfigurationForCartEntry',
      {
        urlParams: {
          userId,
          cartId: documentId,
          cartEntryNumber: documentEntryNumber,
        },
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
      owner: configuration.owner,
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
    const params: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
      {
        owner: productConfigurationForCartEntry.owner,
        userId: userId,
        cartId: documentId,
        cartEntryNumber: documentEntryNumber,
      };
    spyOn(converterService, 'pipeable').and.returnValue(() =>
      of(configuration)
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
      .getConfigurationOverview(configuration.configId)
      .subscribe((productConfigurationResult) => {
        expect(productConfigurationResult.configId).toBe(configId);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' && req.url === 'getVariantConfigurationOverview'
      );
    });

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'getVariantConfigurationOverview',
      {
        urlParams: {
          configId,
        },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
      sendUserIdAsHeader: true,
    });
    expect(converterService.pipeable).toHaveBeenCalledWith(
      VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER
    );
    mockReq.flush(overviewOcc);
  });

  it('should call searchConfiguratorVariants endpoint', (done) => {
    occConfiguratorVariantAdapter
      .searchVariants(configuration.configId)
      .subscribe((productConfigurationResult) => {
        expect(productConfigurationResult.length).toBe(1);
        done();
      });

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'searchConfiguratorVariants';
    });

    expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
      'searchConfiguratorVariants',
      {
        urlParams: {
          configId,
        },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
      sendUserIdAsHeader: true,
    });

    mockReq.flush(variantSearchResult);
  });

  it('should return configurator type', () => {
    expect(occConfiguratorVariantAdapter.getConfiguratorType()).toEqual(
      ConfiguratorType.VARIANT
    );
  });

  describe('updateConfigurationOverview', () => {
    const overviewInput: Configurator.Overview = {
      configId: configId,
      productCode: productCode,
      groupFilters: ['A'],
      attributeFilters: [Configurator.OverviewFilter.PRICE_RELEVANT],
      possibleGroups: [{ id: '1' }, { id: '2' }],
    };
    it('should call overview endpoint and build url', (done) => {
      spyOn(converterService, 'pipeable').and.callThrough();

      occConfiguratorVariantAdapter
        .updateConfigurationOverview(overviewInput)
        .subscribe((resultOv) => {
          expect(resultOv.configId).toEqual(configId);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PATCH' &&
          req.url === 'getVariantConfigurationOverview'
        );
      });

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'getVariantConfigurationOverview',
        {
          urlParams: {
            configId,
          },
        }
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(converterService.pipeable).toHaveBeenCalledWith(
        VARIANT_CONFIGURATOR_OVERVIEW_NORMALIZER
      );
      mockReq.flush(overviewOcc);
    });

    it('should return filter attributes like provided as input', (done) => {
      spyOn(converterService, 'pipeable').and.callThrough();

      occConfiguratorVariantAdapter
        .updateConfigurationOverview(overviewInput)
        .subscribe((resultOv) => {
          expect(resultOv.attributeFilters).toEqual(
            overviewInput.attributeFilters
          );
          expect(resultOv.groupFilters).toEqual(overviewInput.groupFilters);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PATCH' &&
          req.url === 'getVariantConfigurationOverview'
        );
      });
      mockReq.flush(overviewOcc);
    });

    it('should return possible groups like provided as input', (done) => {
      spyOn(converterService, 'pipeable').and.callThrough();

      occConfiguratorVariantAdapter
        .updateConfigurationOverview(overviewInput)
        .subscribe((resultOv) => {
          expect(resultOv.possibleGroups).toEqual(overviewInput.possibleGroups);
          done();
        });

      const mockReq = httpMock.expectOne((req) => {
        return (
          req.method === 'PATCH' &&
          req.url === 'getVariantConfigurationOverview'
        );
      });
      mockReq.flush(overviewOcc);
    });
  });
});
