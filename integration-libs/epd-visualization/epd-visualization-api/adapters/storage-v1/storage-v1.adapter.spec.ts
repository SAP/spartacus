import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  provideConfigFactory,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { NodesResponse, SceneAdapter } from '@spartacus/epd-visualization/core';
import { getEpdVisualizationDefaultConfig } from '@spartacus/epd-visualization/root';
import { getTestConfig } from '../../../root/testing/epd-visualization-test-config';
import { StorageV1Adapter } from './storage-v1.adapter';

let sceneAdapter: SceneAdapter;
let httpMock: HttpTestingController;

const fakeResponse: NodesResponse = {};

describe('StorageV1Adapter', () => {
  describe('getNodes', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          provideConfigFactory(getTestConfig),
          provideDefaultConfigFactory(getEpdVisualizationDefaultConfig),
          {
            provide: SceneAdapter,
            useClass: StorageV1Adapter,
          },
        ],
      });

      httpMock = TestBed.inject(HttpTestingController);
      sceneAdapter = TestBed.inject(SceneAdapter);

      spyOn(sceneAdapter, 'getNodes').and.callThrough();
    });

    afterEach(() => {
      httpMock.verify();
    });

    it('should allow request with no query params', () => {
      sceneAdapter.getNodes('123').subscribe((result) => {
        expect(result).toEqual(fakeResponse);
      });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });

    it('should construct multiple id query params', () => {
      sceneAdapter.getNodes('123', ['4', '5']).subscribe((result) => {
        expect(result).toEqual(fakeResponse);
      });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes?id=4&id=5'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });

    it('should construct $expand query param', () => {
      sceneAdapter
        .getNodes('123', undefined, ['metadata', 'mesh'])
        .subscribe((result) => {
          expect(result).toEqual(fakeResponse);
        });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes?$expand=metadata,mesh'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });

    it('should construct $filter query param', () => {
      sceneAdapter
        .getNodes('123', undefined, undefined, [
          'metadata[sourceNameValue].categoryNameValue.keyNameValue',
          'name.nameValue',
        ])
        .subscribe((result) => {
          expect(result).toEqual(fakeResponse);
        });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes?$filter=metadata[sourceNameValue].categoryNameValue.keyNameValue,name.nameValue'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });

    it('should construct content type query param', () => {
      sceneAdapter
        .getNodes('123', undefined, undefined, undefined, 'Hotspot')
        .subscribe((result) => {
          expect(result).toEqual(fakeResponse);
        });

      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url ===
            'https://epd-acc-eu20-consumer.epdacc.cfapps.eu20.hana.ondemand.com/vis/public/storage/v1/scenes/123/nodes?contentType=Hotspot'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fakeResponse);
    });
  });
});
