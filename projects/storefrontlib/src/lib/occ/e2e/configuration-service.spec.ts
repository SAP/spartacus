import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccE2eConfigurationService } from './configuration-service';
import { ConfigService } from '../config.service';

const configurationKey = 'test';
const searchResult = 5;
const endpoint =
  '/e2econfigurationwebservices/e2econfiguration/e2egoogleservices.storesdisplayed';

export class MockConfigService {
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
        { provide: ConfigService, useClass: MockConfigService }
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

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint;
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(searchResult);
    });
  });
});
