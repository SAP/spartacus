import { TestBed } from '@angular/core/testing';
import { AccountSummaryDetailsService } from './account-summary-details.service';


describe('AccountSummaryDetailsService', () => {
  let service: AccountSummaryDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSummaryDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
