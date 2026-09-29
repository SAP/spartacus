import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
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
    it('should not enable close button in CDP scenario', async () => {
      const data = await firstValueFrom(service.enableCloseButton());
      expect(data).toEqual(false);
    });
  });
});
