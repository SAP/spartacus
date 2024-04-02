import { TestBed } from '@angular/core/testing';
import { CdpCustomerTicketingReopenComponentService } from './cdp-customer-ticketing-reopen-component.service';

describe('CdpCustomerTicketingReopenComponentService', () => {
  let service: CdpCustomerTicketingReopenComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdpCustomerTicketingReopenComponentService],
    });
    service = TestBed.inject(CdpCustomerTicketingReopenComponentService);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('enableReopenButton()', () => {
    it('should not enable re-open button in CDP scenario', (done) => {
      service.enableReopenButton().subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });
  });
});
