import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { CommonConfigurator } from '@spartacus/product/configurators/common';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { Configurator } from '../core/model/configurator.model';
import { CpqConfiguratorRestAdapter } from './cpq-configurator-rest.adapter';
import { Cpq } from './cpq.models';

const productCode = 'CONF_LAPTOP';
const configId = '1234-56-7890';
const token = 'abz1234jtzuf';

const productConfiguration: Configurator.Configuration = {
  configId: configId,
  productCode: productCode,
  owner: {
    type: CommonConfigurator.OwnerType.PRODUCT,
    id: productCode,
  },
};

const accessData: Cpq.AccessData = {
  accessToken: token,
  endpoint: 'https://cpq',
  tokenExpirationTime: 1605004667020,
};

const configCreatedResponse: Cpq.ConfigurationCreatedResponseData = {
  configurationId: configId,
  sessionId: '123',
};

describe('CpqConfiguratorRestAdapter', () => {
  let adapterUnderTest: CpqConfiguratorRestAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CpqConfiguratorRestAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );

    adapterUnderTest = TestBed.inject(
      CpqConfiguratorRestAdapter as Type<CpqConfiguratorRestAdapter>
    );
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return correct configurator type', () => {
    expect(adapterUnderTest.getConfiguratorType()).toEqual(
      'CLOUDCPQCONFIGURATOR'
    );
  });

  it('should fetch a token and use it to init a configuration', () => {
    adapterUnderTest
      .createConfiguration(productConfiguration.owner)
      .subscribe((config) => {
        expect(config.configId).toEqual(configId);
      });
    let mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/getCpqAccessData';
    });
    mockReq.flush(accessData);
    mockReq = httpMock.expectOne((req) => {
      return (
        req.method === 'POST' &&
        req.url === 'https://cpq/api/configuration/v1/configurations'
      );
    });
    mockReq.flush(configCreatedResponse);
  });
});
