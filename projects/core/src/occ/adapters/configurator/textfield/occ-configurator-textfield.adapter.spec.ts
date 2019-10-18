import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OccConfiguratorTextfieldAdapter } from '.';
import { CONFIGURATION_TEXTFIELD_NORMALIZER } from '../../../../configurator/textfield/connectors/converters';
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

    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    converterService = TestBed.get(ConverterService as Type<ConverterService>);
    occEnpointsService = TestBed.get(OccEndpointsService as Type<
      OccEndpointsService
    >);

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
    occConfiguratorVariantAdapter.createConfiguration(productCode).subscribe();

    const mockReq = httpMock.expectOne(req => {
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
});
