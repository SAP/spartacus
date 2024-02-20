import { TestBed } from '@angular/core/testing';
import { CdpCustomerTicketingCloseComponentService } from './cdp-customer-ticketing-close-component.service';

describe('CdpCustomerTicketingCloseComponentService', () => {
  let service: CdpCustomerTicketingCloseComponentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CdpCustomerTicketingCloseComponentService],
    });
    service = TestBed.inject(CdpCustomerTicketingCloseComponentService);
    TestBed.compileComponents();
  });

  it('should create service', () => {
    expect(service).toBeTruthy();
  });
  describe('enableCloseButton()', () => {
    it('should not enable close button in CDP scenario', (done) => {
      service.enableCloseButton().subscribe((data) => {
        expect(data).toEqual(false);
        done();
      });
    });
  });
});
