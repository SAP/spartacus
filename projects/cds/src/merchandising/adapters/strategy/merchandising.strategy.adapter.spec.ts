import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MerchandisingStrategyAdapter } from './merchandising.strategy.adapter';

// import createSpy = jasmine.createSpy;

// const tenant = 'cvappareluk';
// const strategyId = '';

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
});
