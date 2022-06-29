import { TestBed } from '@angular/core/testing';

import { AccountSummaryItemService } from './account-summary-item.service';

describe('AccountSummaryItemService', () => {
  let service: AccountSummaryItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSummaryItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
