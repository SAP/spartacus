import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccE2eConfigurationService } from './e2e-configuration-service';
import { OccConfig } from '@spartacus/core';

const configurationKey = 'test';
const searchResult = '5';
const endpoint = '/e2econfigurationwebservices/e2econfiguration/test';

export class MockOccModuleConfig {
  server = {
    baseUrl: '',
    occPrefix: ''
  };
  site = {
    baseSite: '',
    language: '',
    currency: ''
  };
}

describe('OccE2eConfigurationService', () => {
  let service: OccE2eConfigurationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccE2eConfigurationService,
        { provide: OccConfig, useClass: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccE2eConfigurationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('get page size', () => {
    it('should return page size', () => {
      service.getConfiguration(configurationKey).subscribe(result => {
        expect(result).toEqual(searchResult);
      });

      const mockReq = httpMock.expectOne({
        method: 'GET',
        url: endpoint
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('text');
      mockReq.flush(searchResult);
    });
  });
});
