import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  provideConfigFactory,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  LookupVisualizationsResponse,
  VisualizationAdapter,
} from '@spartacus/epd-visualization/core';
import {
  getEpdVisualizationDefaultConfig,
  UsageId,
} from '@spartacus/epd-visualization/root';
import { getTestConfig } from '../../../root/testing/epd-visualization-test-config';
import { VisualizationV1Adapter } from './visualization-v1.adapter';

let visualizationAdapter: VisualizationAdapter;
let httpMock: HttpTestingController;

const fakeResponse: LookupVisualizationsResponse = { visualizations: [] };

describe('VisualizationApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideConfigFactory(getTestConfig),
        provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
        {
          provide: VisualizationAdapter,
          useClass: VisualizationV1Adapter,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    visualizationAdapter = TestBed.inject(VisualizationAdapter);

    spyOn(visualizationAdapter, 'lookupVisualization').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('lookupVisualization', () => {
    it('should construct URL as expected', () => {
      const visualizationUsageId: UsageId = {
        name: 'CommerceCloud-SpareParts',
        keys: [
          {
            name: 'ProductCode',
            value: '123',
          },
        ],
      };

      const folderUsageId: UsageId = {
        name: 'CommerceCloud-Folder',
        keys: [
          {
            name: 'Function',
            value: 'Staging',
          },
        ],
      };

      visualizationAdapter
        .lookupVisualization(visualizationUsageId, folderUsageId)
        .subscribe((result) => {
          expect(result).toEqual(fakeResponse);
        });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com/vis/public/visualization/v1/lookup/visualization?usage=%7B%22name%22%3A%22CommerceCloud-SpareParts%22%2C%22keys%22%3A%5B%7B%22name%22%3A%22ProductCode%22%2C%22value%22%3A%22123%22%7D%5D%7D&folderUsageId=%7B%22name%22%3A%22CommerceCloud-Folder%22%2C%22keys%22%3A%5B%7B%22name%22%3A%22Function%22%2C%22value%22%3A%22Staging%22%7D%5D%7D'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });
  });
});
