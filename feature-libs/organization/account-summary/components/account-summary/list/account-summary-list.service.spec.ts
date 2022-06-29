import { TestBed } from '@angular/core/testing';
import { AccountSummaryListService } from '../../services/account-summary-list.service';


describe('AccountSummaryListService', () => {
  let service: AccountSummaryListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSummaryListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
