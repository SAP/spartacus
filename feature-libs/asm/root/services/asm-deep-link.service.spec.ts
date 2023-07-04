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

  // TODO: Complete these when final design decided on
  //describe('handleNavigation', () => {});
});
