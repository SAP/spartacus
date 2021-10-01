import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EpdVisualizationConfig } from '../../config/epd-visualization-config';
import { VisualizationService } from './visualization.service';
import { UsageId } from '../../models/usage-ids/usage-id';

let visualizationService: VisualizationService;
let httpMock: HttpTestingController;

const fakeResponse = {};
const mockEpdVisualizationConfig: EpdVisualizationConfig = {
  ui5: {
    bootstrapUrl:
      'https://sapui5.hana.ondemand.com/1.94.0/resources/sap-ui-core.js',
  },
  usageIds: {
    folderUsageId: {
      name: 'CommerceCloud-Folder',
      keys: [
        {
          name: 'Function',
          value: 'Online',
        },
      ],
    },
    sparePartUsageId: {
      name: 'CommerceCloud-SparePart',
      source: 'CommerceCloud',
      category: 'SpareParts',
      keyName: 'ProductCode',
    },
  },
  apis: {
    baseUrl: 'http://localhost:3000',
  },
};

describe('visualization.service tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VisualizationService,
        {
          provide: EpdVisualizationConfig,
          useValue: mockEpdVisualizationConfig,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    visualizationService = TestBed.inject(VisualizationService);

    spyOn(visualizationService, 'lookupVisualization').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('lookupVisualization test', () => {
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

    visualizationService
      .lookupVisualization(visualizationUsageId, folderUsageId)
      .subscribe((result) => {
        expect(result).toEqual(fakeResponse);
      });

    const mockReq = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url ===
          'http://localhost:3000/vis/public/visualization/v1/lookup/visualization?usage=%7B%22name%22%3A%22CommerceCloud-SpareParts%22%2C%22keys%22%3A%5B%7B%22name%22%3A%22ProductCode%22%2C%22value%22%3A%22123%22%7D%5D%7D&folderUsageId=%7B%22name%22%3A%22CommerceCloud-Folder%22%2C%22keys%22%3A%5B%7B%22name%22%3A%22Function%22%2C%22value%22%3A%22Staging%22%7D%5D%7D'
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(fakeResponse);
  });
});
