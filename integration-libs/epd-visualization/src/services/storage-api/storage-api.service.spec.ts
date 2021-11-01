import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EpdVisualizationConfig } from '../../config/epd-visualization-config';
import { getValidConfig } from '../../config/epd-visualization-test-config';
import { NodesResponse, StorageApiService } from './storage-api.service';

let storageService: StorageApiService;
let httpMock: HttpTestingController;

const fakeResponse: NodesResponse = {};

describe('StorageApiService', () => {
  describe('getNodes', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          {
            provide: EpdVisualizationConfig,
            useValue: getValidConfig(),
          },
        ],
      });

      httpMock = TestBed.inject(HttpTestingController);
      storageService = TestBed.inject(StorageApiService);

      spyOn(storageService, 'getNodes').and.callThrough();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should allow request with no query params', () => {
      storageService.getNodes('123').subscribe((result) => {
        expect(result).toEqual(fakeResponse);
      });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-dev-eu20-consumer.epddev.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });

    it('should construct multiple id query params', () => {
      storageService.getNodes('123', ['4', '5']).subscribe((result) => {
        expect(result).toEqual(fakeResponse);
      });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-dev-eu20-consumer.epddev.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes?id=4&id=5'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });

    it('should construct $expand query param', () => {
      storageService
        .getNodes('123', undefined, ['metadata', 'mesh'])
        .subscribe((result) => {
          expect(result).toEqual(fakeResponse);
        });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-dev-eu20-consumer.epddev.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes?$expand=metadata,mesh'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });

    it('should construct $filter query param', () => {
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
            'https://epd-dev-eu20-consumer.epddev.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes?$filter=meta.categoryNameValue.keyNameValue,name.nameValue'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });

    it('should construct content type query param', () => {
      storageService
        .getNodes('123', undefined, undefined, undefined, 'Hotspot')
        .subscribe((result) => {
          expect(result).toEqual(fakeResponse);
        });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-dev-eu20-consumer.epddev.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes?contentType=Hotspot'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });
  });
});
