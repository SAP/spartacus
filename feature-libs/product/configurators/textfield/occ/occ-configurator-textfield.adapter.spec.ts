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
import { GenericConfigurator } from 'projects/core/src/model';
import { OccConfiguratorTextfieldAdapter } from '.';
import { CONFIGURATION_TEXTFIELD_NORMALIZER } from '../core/connectors/converters';
import { ConfiguratorTextfield } from '../core/model/configurator-textfield.model';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}
const productCode = 'CONF_LAPTOP';
const USER_ID = 'theUser';
const CART_ID = '98876';
const CART_ENTRY_NUMBER = '1';
const PRODUCT_CODE = 'CPQ_LAPTOP';
const QUANTITY = 1;
const LABEL1 = 'LABEL1';
const VALUE1 = 'VALUE1';
const configuration: ConfiguratorTextfield.Configuration = {
  configurationInfos: [
    {
      configurationLabel: LABEL1,
      configurationValue: VALUE1,
      status: ConfiguratorTextfield.ConfigurationStatus.SUCCESS,
    },
  ],
};

const addToCartParameters: ConfiguratorTextfield.AddToCartParameters = {
  userId: USER_ID,
  cartId: CART_ID,
  productCode: PRODUCT_CODE,
  quantity: QUANTITY,
  configuration: configuration,
};

const updateCartEntryParameters: ConfiguratorTextfield.UpdateCartEntryParameters = {
  userId: USER_ID,
  cartId: CART_ID,
  cartEntryNumber: CART_ENTRY_NUMBER,
  configuration: configuration,
};
const readParams: GenericConfigurator.ReadConfigurationFromCartEntryParameters = {
  userId: USER_ID,
  cartId: CART_ID,
  cartEntryNumber: '0',
};

describe('OccConfigurationTextfieldAdapter', () => {
  let occConfiguratorVariantAdapter: OccConfiguratorTextfieldAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccConfiguratorTextfieldAdapter,
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
      OccConfiguratorTextfieldAdapter as Type<OccConfiguratorTextfieldAdapter>
    );

    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call createTextfieldConfiguration endpoint', () => {
    occConfiguratorVariantAdapter
      .createConfiguration(productCode, null)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'createTextfieldConfiguration';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'createTextfieldConfiguration',
      {
        productCode,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_TEXTFIELD_NORMALIZER
    );
  });

  it('should call readTextfieldConfigurationForCartEntry endpoint', () => {
    occConfiguratorVariantAdapter
      .readConfigurationForCartEntry(readParams)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readTextfieldConfigurationForCartEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readTextfieldConfigurationForCartEntry',
      readParams
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_TEXTFIELD_NORMALIZER
    );
  });

  it('should call addConfigurationTextfieldToCart endpoint', () => {
    occConfiguratorVariantAdapter.addToCart(addToCartParameters).subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'POST' && req.url === 'addTextfieldConfigurationToCart'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'addTextfieldConfigurationToCart',
      {
        userId: USER_ID,
        cartId: CART_ID,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );
  });

  it('should call correct endpoint when update cart entry is triggered', () => {
    occConfiguratorVariantAdapter
      .updateConfigurationForCartEntry(updateCartEntryParameters)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'POST' &&
        req.url === 'updateTextfieldConfigurationForCartEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'updateTextfieldConfigurationForCartEntry',
      {
        userId: USER_ID,
        cartId: CART_ID,
        cartEntryNumber: CART_ENTRY_NUMBER,
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );
  });
});
