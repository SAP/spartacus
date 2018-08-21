import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccStoreFinderService } from './store-finder.service';
import { ConfigService } from '../config.service';
import { SearchConfig } from '../../store-finder/models/search-config';
import { OccE2eConfigurationService } from '../e2e/e2e-configuration-service';

const queryText = 'test';
const searchResults = { stores: [{ name: 'test' }] };
const mockSearchConfig: SearchConfig = { pageSize: 5 };

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

describe('OccStoreFinderService', () => {
  let service: OccStoreFinderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccStoreFinderService,
        OccE2eConfigurationService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccStoreFinderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('query text search', () => {
    it('should return search results for given query text', () => {
      service
        .findStores(queryText, mockSearchConfig)
        .toPromise()
        .then(result => {
          expect(result).toEqual(searchResults);
        });

      const mockReq = httpMock.expectOne({
        method: 'GET',
        url:
          '/e2econfigurationwebservices/e2econfiguration/e2egoogleservices.storesdisplayed'
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('text');
    });
  });
});
