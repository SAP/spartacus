import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  GenericConfigurator,
  GenericConfiguratorUtilsService,
  OccEndpointsService,
} from '@spartacus/core';
import { CART_MODIFICATION_NORMALIZER } from 'projects/core/src/cart';
import { of } from 'rxjs';
import { OccConfiguratorVariantAdapter } from '.';
import {
  CONFIGURATION_NORMALIZER,
  CONFIGURATION_OVERVIEW_NORMALIZER,
  CONFIGURATION_PRICE_SUMMARY_NORMALIZER,
  CONFIGURATION_SERIALIZER,
} from './../../core/connectors/configurator-converters';
import { Configurator } from './../../core/model/configurator.model';
import { OccConfigurator } from './occ-configurator.models';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
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
  configId: configId,
  productCode: productCode,
  owner: {
    type: GenericConfigurator.OwnerType.PRODUCT,
    id: productCode,
  },
};

const productConfigurationForCartEntry: Configurator.Configuration = {
  configId: configId,
  productCode: productCode,
  owner: {
    type: GenericConfigurator.OwnerType.CART_ENTRY,
    id: cartEntryNo,
  },
};

const overview: OccConfigurator.Overview = { id: configId };

describe('OccConfigurationVariantAdapter', () => {
  let occConfiguratorVariantAdapter: OccConfiguratorVariantAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEnpointsService: OccEndpointsService;
  let configuratorUtils: GenericConfiguratorUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccConfiguratorVariantAdapter,
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

    occConfiguratorVariantAdapter = TestBed.inject(
      OccConfiguratorVariantAdapter as Type<OccConfiguratorVariantAdapter>
    );
    configuratorUtils = TestBed.inject(
      GenericConfiguratorUtilsService as Type<GenericConfiguratorUtilsService>
    );
    configuratorUtils.setOwnerKey(productConfiguration.owner);

    spyOn(converterService, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call createConfiguration endpoint', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .createConfiguration(productConfiguration.owner)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'createConfiguration';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'createConfiguration',
      {
        productCode,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_NORMALIZER
    );
    mockReq.flush(productConfiguration);
  });

  it('should call readConfiguration endpoint', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .readConfiguration(configId, groupId, productConfiguration.owner)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'readConfiguration';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readConfiguration',
      { configId },
      { groupId }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_NORMALIZER
    );
    mockReq.flush(productConfiguration);
  });

  it('should call updateConfiguration endpoint', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .updateConfiguration(productConfiguration)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'PATCH' && req.url === 'updateConfiguration';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'updateConfiguration',
      {
        configId,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_NORMALIZER
    );
    expect(converterService.convert).toHaveBeenCalledWith(
      productConfiguration,
      CONFIGURATION_SERIALIZER
    );
    mockReq.flush(productConfiguration);
  });

  it('should call readPriceSummary endpoint', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .readPriceSummary(productConfiguration)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'readPriceSummary';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith('readPriceSummary', {
      configId,
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_PRICE_SUMMARY_NORMALIZER
    );
    const priceSummary: OccConfigurator.Prices = {};
    mockReq.flush(priceSummary);
  });

  it('should call readConfigurationForCartEntry endpoint', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    const params: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
      owner: productConfiguration.owner,
      userId: userId,
      cartId: documentId,
      cartEntryNumber: documentEntryNumber,
    };
    occConfiguratorVariantAdapter
      .readConfigurationForCartEntry(params)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' && req.url === 'readConfigurationForCartEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readConfigurationForCartEntry',
      {
        userId,
        cartId: documentId,
        cartEntryNumber: documentEntryNumber,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_NORMALIZER
    );
    mockReq.flush(productConfiguration);
  });

  it('should call readConfigurationOverviewForOrderEntry endpoint', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    const params: GenericConfigurator.ReadConfigurationFromOrderEntryParameters = {
      owner: productConfiguration.owner,
      userId: userId,
      orderId: documentId,
      orderEntryNumber: documentEntryNumber,
    };
    occConfiguratorVariantAdapter
      .readConfigurationForOrderEntry(params)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readConfigurationOverviewForOrderEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readConfigurationOverviewForOrderEntry',
      {
        userId,
        orderId: documentId,
        orderEntryNumber: documentEntryNumber,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_OVERVIEW_NORMALIZER
    );
    mockReq.flush(overview);
  });

  it('should call updateConfigurationForCartEntry endpoint', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    const params: Configurator.UpdateConfigurationForCartEntryParameters = {
      configuration: productConfiguration,
      userId: userId,
      cartId: documentId,
      cartEntryNumber: documentEntryNumber,
    };
    occConfiguratorVariantAdapter
      .updateConfigurationForCartEntry(params)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'PUT' && req.url === 'updateConfigurationForCartEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'updateConfigurationForCartEntry',
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
  });

  it('should call addToCart endpoint', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    const params: Configurator.AddToCartParameters = {
      productCode: 'Product',
      quantity: 1,
      configId: configId,
      ownerKey: productConfiguration.owner.key,
      userId: userId,
      cartId: documentId,
    };
    occConfiguratorVariantAdapter.addToCart(params).subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'POST' && req.url === 'addConfigurationToCart';
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );
  });

  it('should set owner on readConfigurationForCartEntry according to parameters', () => {
    const params: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
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
        expect(owner.type).toBe(GenericConfigurator.OwnerType.CART_ENTRY);
        expect(owner.key).toBeUndefined();
      });
  });

  it('should call getConfigurationOverview endpoint', () => {
    spyOn(converterService, 'pipeable').and.callThrough();
    occConfiguratorVariantAdapter
      .getConfigurationOverview(productConfiguration.configId)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'getConfigurationOverview';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'getConfigurationOverview',
      {
        configId,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_OVERVIEW_NORMALIZER
    );
    mockReq.flush(overview);
  });
});
