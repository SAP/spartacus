import { TestBed } from '@angular/core/testing';

import { BulkPricesService } from './bulk-prices.service';

describe('BulkPricesService', () => {
  let service: BulkPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
