import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MerchandisingStrategyAdapter } from './merchandising.strategy.adapter';

// import createSpy = jasmine.createSpy;

//const tenant = 'cvappareluk';
const strategyId = '4081413c-620c-40d4-bf43-bc8d05d203d3';

describe('MerchandisingStrategyAdapter', () => {
  let service: MerchandisingStrategyAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MerchandisingStrategyAdapter],
    });
    service = TestBed.get(MerchandisingStrategyAdapter as Type<
      MerchandisingStrategyAdapter
    >);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load strategies', () => {
    it('should load strategy for given strategy id', () => {
      service.load(strategyId).subscribe(result => {
        console.log(`results ${result}`);
        expect(result.resultCount).toEqual(16);
      });
    });
  });
});
