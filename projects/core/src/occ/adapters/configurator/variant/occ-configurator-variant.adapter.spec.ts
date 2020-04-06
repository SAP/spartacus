import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CART_MODIFICATION_NORMALIZER } from 'projects/core/src/cart';
import { OccConfiguratorVariantAdapter } from '.';
import {
  CONFIGURATION_NORMALIZER,
  CONFIGURATION_OVERVIEW_NORMALIZER,
  CONFIGURATION_PRICE_SUMMARY_NORMALIZER,
  CONFIGURATION_SERIALIZER,
} from '../../../../configurator/commons/connectors/converters';
import { GenericConfigUtilsService } from '../../../../configurator/generic/utils/config-utils.service';
import { Configurator } from '../../../../model/configurator.model';
import { GenericConfigurator } from '../../../../model/generic-configurator.model';
import { ConverterService } from '../../../../util/converter.service';
import { OccEndpointsService } from '../../../services/occ-endpoints.service';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}
const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';
const groupId = 'GROUP1';
const cartEntryNumber = '3';
const userId = 'Anony';
const cartId = '82736353';

const productConfiguration: Configurator.Configuration = {
  configId: configId,
  productCode: productCode,
  owner: {
    type: GenericConfigurator.OwnerType.PRODUCT,
    id: productCode,
  },
};

describe('OccConfigurationVariantAdapter', () => {
  let occConfiguratorVariantAdapter: OccConfiguratorVariantAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEnpointsService: OccEndpointsService;
  let configuratorUtils: GenericConfigUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccConfiguratorVariantAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    httpMock = TestBed.get(
      HttpTestingController as Type<HttpTestingController>
    );
    converterService = TestBed.get(ConverterService as Type<ConverterService>);
    occEnpointsService = TestBed.get(
      OccEndpointsService as Type<OccEndpointsService>
    );

    occConfiguratorVariantAdapter = TestBed.get(
      OccConfiguratorVariantAdapter as Type<OccConfiguratorVariantAdapter>
    );
    configuratorUtils = TestBed.get(
      GenericConfigUtilsService as Type<GenericConfigUtilsService>
    );
    configuratorUtils.setOwnerKey(productConfiguration.owner);

    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call createConfiguration endpoint', () => {
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
  });

  it('should call readConfiguration endpoint', () => {
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
  });

  it('should call updateConfiguration endpoint', () => {
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
  });

  it('should call readConfigurationPrice endpoint', () => {
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
  });

  it('should call readConfigurationForCartEntry endpoint', () => {
    const params: Configurator.ReadConfigurationFromCartEntryParameters = {
      owner: productConfiguration.owner,
      userId: userId,
      cartId: cartId,
      cartEntryNumber: cartEntryNumber,
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
        cartId,
        cartEntryNumber,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_NORMALIZER
    );
  });

  it('should call updateConfigurationForCartEntry endpoint', () => {
    const params: Configurator.UpdateConfigurationForCartEntryParameters = {
      configuration: productConfiguration,
      userId: userId,
      cartId: cartId,
      cartEntryNumber: cartEntryNumber,
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
        cartId,
        cartEntryNumber,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );
  });

  it('should set owner on readConfigurationForCartEntry', () => {
    const params: Configurator.ReadConfigurationFromCartEntryParameters = {
      owner: productConfiguration.owner,
      userId: userId,
      cartId: cartId,
      cartEntryNumber: cartEntryNumber,
    };
    occConfiguratorVariantAdapter
      .readConfigurationForCartEntry(params)
      .subscribe((result) => {
        const owner = result.owner;
        expect(owner).toBeDefined();
        expect(owner.type).toBe(GenericConfigurator.OwnerType.CART_ENTRY);
        expect(owner.key).toBeUndefined();
      });
    httpMock.expectOne((req) => {
      return (
        req.method === 'GET' && req.url === 'readConfigurationForCartEntry'
      );
    });
  });

  it('should call getConfigurationOverview endpoint', () => {
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
  });
});
