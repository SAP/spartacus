import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  BaseOccUrlProperties,
  CART_MODIFICATION_NORMALIZER,
  ConverterService,
  DynamicAttributes,
  OccEndpointsService,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
} from '@spartacus/product-configurator/common';
import { OccConfiguratorTextfieldAdapter } from '.';
import { CONFIGURATION_TEXTFIELD_NORMALIZER } from '../core/connectors/converters';
import { ConfiguratorTextfield } from '../core/model/configurator-textfield.model';

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
const productCode = 'CONF_LAPTOP';
const USER_ID = 'theUser';
const CART_ID = '98876';
const ORDER_ID = '0001000';
const CART_ENTRY_NUMBER = '1';
const ORDER_ENTRY_NUMBER = '10';
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
  owner: ConfiguratorModelUtils.createInitialOwner(),
};

const addToCartParameters: ConfiguratorTextfield.AddToCartParameters = {
  userId: USER_ID,
  cartId: CART_ID,
  productCode: PRODUCT_CODE,
  quantity: QUANTITY,
  configuration: configuration,
};

const updateCartEntryParameters: ConfiguratorTextfield.UpdateCartEntryParameters =
  {
    userId: USER_ID,
    cartId: CART_ID,
    cartEntryNumber: CART_ENTRY_NUMBER,
    configuration: configuration,
  };
const readParams: CommonConfigurator.ReadConfigurationFromCartEntryParameters =
  {
    userId: USER_ID,
    cartId: CART_ID,
    cartEntryNumber: '0',
    owner: ConfiguratorModelUtils.createInitialOwner(),
  };

const readParamsForOrder: CommonConfigurator.ReadConfigurationFromOrderEntryParameters =
  {
    userId: USER_ID,
    orderId: ORDER_ID,
    orderEntryNumber: ORDER_ENTRY_NUMBER,
    owner: ConfiguratorModelUtils.createInitialOwner(),
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
    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call createTextfieldConfiguration endpoint', () => {
    occConfiguratorVariantAdapter
      .createConfiguration(
        productCode,
        ConfiguratorModelUtils.createInitialOwner()
      )
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'createTextfieldConfiguration';
    });

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'createTextfieldConfiguration',
      {
        urlParams: {
          productCode,
        },
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

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'readTextfieldConfigurationForCartEntry',
      {
        urlParams: {
          userId: USER_ID,
          cartId: CART_ID,
          cartEntryNumber: '0',
        },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CONFIGURATION_TEXTFIELD_NORMALIZER
    );
  });

  it('should call readTextfieldConfigurationForOrderEntry endpoint', () => {
    occConfiguratorVariantAdapter
      .readConfigurationForOrderEntry(readParamsForOrder)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readTextfieldConfigurationForOrderEntry'
      );
    });

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'readTextfieldConfigurationForOrderEntry',
      {
        urlParams: {
          userId: USER_ID,
          orderId: ORDER_ID,
          orderEntryNumber: ORDER_ENTRY_NUMBER,
        },
      }
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

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'addTextfieldConfigurationToCart',
      {
        urlParams: {
          userId: USER_ID,
          cartId: CART_ID,
        },
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

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'updateTextfieldConfigurationForCartEntry',
      {
        urlParams: {
          userId: USER_ID,
          cartId: CART_ID,
          cartEntryNumber: CART_ENTRY_NUMBER,
        },
      }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    expect(converterService.pipeable).toHaveBeenCalledWith(
      CART_MODIFICATION_NORMALIZER
    );
  });
});
