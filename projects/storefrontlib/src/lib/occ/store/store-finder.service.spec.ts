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
const endpoint = '/stores';

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
      service.findStores(queryText, mockSearchConfig).subscribe(result => {
        expect(result).toEqual(searchResults);
      });

      const mockReq1 = httpMock.expectOne({
        method: 'GET',
        url: endpoint
      });

      const mockReq2 = httpMock.expectOne({
        method: 'GET',
        url: endpoint
      });

      expect(mockReq2.request.params.get('query')).toEqual(queryText);
      expect(mockReq2.request.params.get('pageSize')).toEqual(
        mockSearchConfig.pageSize.toString()
      );
      expect(mockReq2.request.params.get('fields')).toEqual(
        'stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL)),' +
          'geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country) ),' +
          'pagination(DEFAULT),' +
          'sorts(DEFAULT)'
      );

      expect(mockReq1.cancelled).toBeFalsy();
      expect(mockReq1.request.responseType).toEqual('json');
      mockReq2.flush(searchResults);

      expect(mockReq2.cancelled).toBeFalsy();
      expect(mockReq2.request.responseType).toEqual('json');
      mockReq2.flush(searchResults);
    });
  });
});
