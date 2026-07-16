import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageSlotService } from './page-slot.service';

import { CmsComponentsService } from '@spartacus/storefront';

function createSlotElementStub(slotName, top) {
  return {
    getAttribute: () => slotName,
    getBoundingClientRect: () => ({ top }),
  };
}

const documentStub = {
  querySelectorAll: () => [
    createSlotElementStub('test', 20),
    createSlotElementStub('test-2', 100),
  ],

  documentElement: {
    clientHeight: 80,
  },
};

describe('PageSlotService', () => {
  let pageSlotService: PageSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DOCUMENT,
          useValue: documentStub,
        },
      ],
    });

    pageSlotService = TestBed.inject(PageSlotService);
  });

  it('should inject service', () => {
    expect(pageSlotService).toBeTruthy();
  });

  describe('shouldNotDefer', () => {
    describe('for slot that is visible in SSR viewport', () => {
      it('should return true', () => {
        expect(pageSlotService.shouldNotDefer('test')).toBeTrue();
      });

      it('should return true only once', () => {
        expect(pageSlotService.shouldNotDefer('test')).toBeTrue();
        expect(pageSlotService.shouldNotDefer('test')).toBeFalse();
      });
    });

    describe('for slot that is visible in SSR viewport', () => {
      it('should return false', () => {
        expect(pageSlotService.shouldNotDefer('test-2')).toBeFalse();
      });
    });
  });

  describe('Component Defer Options', () => {
    it('should call cmsComponentsService.getDeferLoadingStrategy', () => {
      const cmsComponentsService = TestBed.inject(CmsComponentsService);
      vi.spyOn(cmsComponentsService, 'getDeferLoadingStrategy');

      pageSlotService.getComponentDeferOptions('test-slot', 'test-component');
      expect(cmsComponentsService.getDeferLoadingStrategy).toHaveBeenCalledWith(
        'test-component'
      );
    });

    it('should call shouldNotDefer', () => {
      vi.spyOn(pageSlotService, 'shouldNotDefer');
      pageSlotService.getComponentDeferOptions('test-slot', 'test-component');
      expect(pageSlotService.shouldNotDefer).toHaveBeenCalledWith('test-slot');
    });
  });
});
