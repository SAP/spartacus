import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { PageSlotService } from './page-slot.service';

import { CmsComponentsService } from '@spartacus/storefront';

function createSlotElementStub(slotName, top) {
  return {
    getAttribute: () => slotName,
    getBoundingClientRect: () => ({ top }),
  };
}

describe('PageSlotService', () => {
  let pageSlotService: PageSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });

    const doc = TestBed.inject(DOCUMENT);

    vi.spyOn(doc, 'querySelectorAll').mockReturnValue([
      createSlotElementStub('test', 20),
      createSlotElementStub('test-2', 100),
    ] as any);

    Object.defineProperty(doc.documentElement, 'clientHeight', {
      value: 80,
      configurable: true,
    });

    pageSlotService = TestBed.inject(PageSlotService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should inject service', () => {
    expect(pageSlotService).toBeTruthy();
  });

  describe('shouldNotDefer', () => {
    describe('for slot that is visible in SSR viewport', () => {
      it('should return true', () => {
        expect(pageSlotService.shouldNotDefer('test')).toBe(true);
      });

      it('should return true only once', () => {
        expect(pageSlotService.shouldNotDefer('test')).toBe(true);
        expect(pageSlotService.shouldNotDefer('test')).toBe(false);
      });
    });

    describe('for slot that is visible in SSR viewport', () => {
      it('should return false', () => {
        expect(pageSlotService.shouldNotDefer('test-2')).toBe(false);
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
