import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GenericConfigurator } from 'projects/core/src/model';
import { OccConfiguratorTextfieldAdapter } from '.';
import { CART_MODIFICATION_NORMALIZER } from '../../../../cart/connectors/entry/converters';
import { CONFIGURATION_TEXTFIELD_NORMALIZER } from '../../../../configurator/textfield/connectors/converters';
import { ConfiguratorTextfield } from '../../../../model/configurator-textfield.model';
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
const USER_ID = 'theUser';
const CART_ID = '98876';
const CART_ENTRY_NUMBER = '1';
const PRODUCT_CODE = 'CPQ_LAPTOP';
const QUANTITY = 1;
const LABEL1 = 'LABEL1';
const VALUE1 = 'VALUE1';
const SUCCESS = 'SUCCESS';
const configuration: ConfiguratorTextfield.Configuration = {
  configurationInfos: [
    {
      configurationLabel: LABEL1,
      configurationValue: VALUE1,
      status: SUCCESS,
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

    httpMock = TestBed.get(
      HttpTestingController as Type<HttpTestingController>
    );
    converterService = TestBed.get(ConverterService as Type<ConverterService>);
    occEnpointsService = TestBed.get(
      OccEndpointsService as Type<OccEndpointsService>
    );

    occConfiguratorVariantAdapter = TestBed.get(
      OccConfiguratorTextfieldAdapter as Type<OccConfiguratorTextfieldAdapter>
    );

    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'convert').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call createConfiguration endpoint', () => {
    occConfiguratorVariantAdapter
      .createConfiguration(productCode, null)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'createConfigurationTextfield';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'createConfigurationTextfield',
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

  it('should call readConfigurationForCartEntry endpoint', () => {
    occConfiguratorVariantAdapter
      .readConfigurationForCartEntry(readParams)
      .subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'GET' &&
        req.url === 'readConfigurationTextfieldForCartEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'readConfigurationTextfieldForCartEntry',
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
        req.method === 'POST' && req.url === 'addConfigurationTextfieldToCart'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'addConfigurationTextfieldToCart',
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
        req.url === 'updateConfigurationTextfieldForCartEntry'
      );
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
      'updateConfigurationTextfieldForCartEntry',
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
