import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MerchandisingStrategyAdapter } from './merchandising.strategy.adapter';
import { CdsConfig } from '../../../cds-config';
import { StrategyResult } from '../../model/strategy.result';

// import createSpy = jasmine.createSpy;

const mockCdsConfig: CdsConfig = {
  cds: {
    tenant: 'merchandising-strategy-adapter-test-tenant',
    baseUrl: 'http://some-cds-base-url',
    profileTag: {
      configUrl: 'http://some-profile-tag-config-url',
      javascriptUrl: 'http://some-profile-tag-js-url'
    }
  }
}

const strategyId = '4081413c-620c-40d4-bf43-bc8d05d203d3';

const strategyResultMetadata: Map<string, string> = new Map<string, string>();
strategyResultMetadata.set('test-metadata-field', 'test-metadata-value');

const strategyResult: StrategyResult = {
  resultCount: 1,
  products: [],
  paged: {
    from: 1,
    size: 5
  },
  metadata: strategyResultMetadata
}

describe('MerchandisingStrategyAdapter', () => {
  let strategyAdapter: MerchandisingStrategyAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [mockCdsConfig, MerchandisingStrategyAdapter],
    });

    strategyAdapter = TestBed.get(MerchandisingStrategyAdapter as Type<MerchandisingStrategyAdapter>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(strategyAdapter).toBeTruthy();
  });

  describe('load products for strategy', () => {
    it('should load products for the given strategy id', () => {
      strategyAdapter.load(strategyId).subscribe(result => {
        expect(result).toEqual(strategyResult);
      });

      const mockProductRequest = httpMock.expectOne(request => {
        return request.method === 'GET' &&
          request.url === `${mockCdsConfig.cds.baseUrl}/strategy/${mockCdsConfig.cds.tenant}/strategies/${strategyId}/products`;
      });

    });
  });
});
