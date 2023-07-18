import { TestBed } from '@angular/core/testing';
import { WindowRef, RoutingService } from '@spartacus/core';
import { AsmDeepLinkService } from './asm-deep-link.service';
import { AsmEnablerService } from '@spartacus/asm/root';

const MockWindowRef = {
  location: {
    search: 'customerId=testId&ticketId=123&invalidparam=666',
  },
};

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

class MockAsmEnablerService implements Partial<AsmEnablerService> {
  isEmulateInURL = () => true;
}

describe('AsmDeepLinkService', () => {
  let asmDeepLinkService: AsmDeepLinkService;
  let asmEnablerService: AsmEnablerService;
  let routingService: RoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: WindowRef, useValue: MockWindowRef },
        { provide: AsmEnablerService, useClass: MockAsmEnablerService },
      ],
    });

    asmDeepLinkService = TestBed.inject(AsmDeepLinkService);
    asmEnablerService = TestBed.inject(AsmEnablerService);
    routingService = TestBed.inject(RoutingService);
  });

  it('should be created', () => {
    expect(asmDeepLinkService).toBeTruthy();
  });

  describe('getSearchParameter', () => {
    it('should get parameter from search result', () => {
      expect(asmDeepLinkService.getSearchParameter('customerId')).toEqual(
        'testId'
      );
    });
  });

  describe('isEmulateInURL', () => {
    it('should call enabler service', () => {
      spyOn(asmEnablerService, 'isEmulateInURL');
      asmDeepLinkService.isEmulateInURL();
      expect(asmEnablerService.isEmulateInURL).toHaveBeenCalled();
    });
  });

  describe('getParamsInUrl', () => {
    it('should return only valid deep link params in url', () => {
      expect(asmDeepLinkService.getParamsInUrl()).toEqual({
        customerId: 'testId',
        ticketId: '123',
      });
    });
  });

  describe('handleNavigation', () => {
    beforeEach(() => {
      spyOn(routingService, 'go').and.callThrough();
    });
    it('should navigate to active cart', () => {
      asmDeepLinkService.handleNavigation({
        customerId: '123',
        cartType: 'active',
      });
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
    });
    it('should navigate to saved cart', () => {
      asmDeepLinkService.handleNavigation({
        customerId: '123',
        cartType: 'saved',
        cartId: '456',
      });
      expect(routingService.go).toHaveBeenCalledWith(
        'my-account/saved-cart/456'
      );
    });
    it('should navigate to order details', () => {
      asmDeepLinkService.handleNavigation({
        customerId: '123',
        orderId: '456',
      });
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'orderDetails',
        params: { code: '456' },
      });
    });
    it('should navigate to support ticket details', () => {
      asmDeepLinkService.handleNavigation({
        customerId: '123',
        ticketId: '456',
      });
      expect(routingService.go).toHaveBeenCalledWith({
        cxRoute: 'supportTicketDetails',
        params: { ticketCode: '456' },
      });
    });
    it('should not navigate', () => {
      asmDeepLinkService.handleNavigation({});
      expect(routingService.go).not.toHaveBeenCalled();
    });
  });
});
