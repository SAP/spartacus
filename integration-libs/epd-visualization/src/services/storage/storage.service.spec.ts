import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EpdVisualizationConfig } from '../../config/epd-visualization-config';
import { StorageService } from './storage.service';

let storageService: StorageService;
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

describe('storage.service tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StorageService,
        {
          provide: EpdVisualizationConfig,
          useValue: mockEpdVisualizationConfig,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);

    spyOn(storageService, 'getNodes').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('no query params', () => {
    storageService.getNodes('123').subscribe((result) => {
      expect(result).toEqual(fakeResponse);
    });

    const mockReq = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url ===
          'http://localhost:3000/vis/public/storage/v1/scenes/123/nodes'
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(fakeResponse);
  });

  it('multiple id query params', () => {
    storageService.getNodes('123', ['4', '5']).subscribe((result) => {
      expect(result).toEqual(fakeResponse);
    });

    const mockReq = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url ===
          'http://localhost:3000/vis/public/storage/v1/scenes/123/nodes?id=4&id=5'
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(fakeResponse);
  });

  it('$expand query param', () => {
    storageService
      .getNodes('123', undefined, ['metadata', 'mesh'])
      .subscribe((result) => {
        expect(result).toEqual(fakeResponse);
      });

    const mockReq = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url ===
          'http://localhost:3000/vis/public/storage/v1/scenes/123/nodes?$expand=metadata,mesh'
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(fakeResponse);
  });

  it('$filter query param', () => {
    storageService
      .getNodes('123', undefined, undefined, [
        'meta.categoryNameValue.keyNameValue',
        'name.nameValue',
      ])
      .subscribe((result) => {
        expect(result).toEqual(fakeResponse);
      });

    const mockReq = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url ===
          'http://localhost:3000/vis/public/storage/v1/scenes/123/nodes?$filter=meta.categoryNameValue.keyNameValue,name.nameValue'
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(fakeResponse);
  });

  it('content type query param', () => {
    storageService
      .getNodes('123', undefined, undefined, undefined, 'Hotspot')
      .subscribe((result) => {
        expect(result).toEqual(fakeResponse);
      });

    const mockReq = httpMock.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url ===
          'http://localhost:3000/vis/public/storage/v1/scenes/123/nodes?contentType=Hotspot'
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(fakeResponse);
  });
});
