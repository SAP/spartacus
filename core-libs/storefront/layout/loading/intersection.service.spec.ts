import { TestBed } from '@angular/core/testing';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionService } from './intersection.service';
import { firstValueFrom, Observable, of } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { PLATFORM_ID } from '@angular/core';

const INTERSECTION_MARGIN_GENERAL = '5%';
const INTERSECTION_MARGIN_SPECIFIC = '4%';

const MOCK_LAYOUT_CONFIG: LayoutConfig = {
  deferredLoading: { intersectionMargin: INTERSECTION_MARGIN_GENERAL },
};

const DOM_RECT_READ_ONLY: DOMRectReadOnly = {
  bottom: 1,
  height: 2,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
  toJSON() {},
};

const INTERSECTION_OBSERVER_ENTRY = {
  isIntersecting: false,
  intersectionRatio: 0,
  boundingClientRect: DOM_RECT_READ_ONLY,
  intersectionRect: DOM_RECT_READ_ONLY,
  rootBounds: null,
  time: 0,
};

describe('IntersectionService', () => {
  let service: IntersectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LayoutConfig, useValue: MOCK_LAYOUT_CONFIG },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });
    service = TestBed.inject(IntersectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isIntersecting', () => {
    it('should emit false in case html element does not intersect', async () => {
      const element: HTMLElement = document.createElement('h2');

      const entry: IntersectionObserverEntry = {
        ...INTERSECTION_OBSERVER_ENTRY,
        target: element,
        isIntersecting: false,
      };

      let intersectionObservable: Observable<IntersectionObserverEntry[]> = of([
        entry,
      ]);
      vi.spyOn<any>(service, 'createIntersectionObservable').mockReturnValue(
        intersectionObservable
      );

      const isIntersected = await firstValueFrom(service.isIntersecting(element));
      expect(isIntersected).toBe(false);
    });

    it('should emit true in case element is intersecting', async () => {
      const element: HTMLElement = document.createElement('section');
      const entry: IntersectionObserverEntry = {
        ...INTERSECTION_OBSERVER_ENTRY,
        target: element,
        isIntersecting: true,
      };

      let intersectionObservable: Observable<IntersectionObserverEntry[]> = of([
        entry,
      ]);
      vi.spyOn<any>(service, 'createIntersectionObservable').mockReturnValue(
        intersectionObservable
      );
      const isIntersected = await firstValueFrom(service.isIntersecting(element));
      expect(isIntersected).toBe(true);
    });
  });

  describe('isIntersected', () => {
    it('should emit nothing in case element is not intersecting', () => {
      const element: HTMLElement = document.createElement('h2');
      const entry: IntersectionObserverEntry = {
        ...INTERSECTION_OBSERVER_ENTRY,
        target: element,
        isIntersecting: false,
      };
      const inputObs = cold('a', { a: [entry] });
      vi.spyOn<any>(service, 'createIntersectionObservable').mockReturnValue(
        inputObs
      );
      const resultObs = cold('');
      expect(service.isIntersected(element)).toBeObservable(resultObs);
    });

    it('should emit true in case element is intersecting', () => {
      const element: HTMLElement = document.createElement('section');

      const entry: IntersectionObserverEntry = {
        ...INTERSECTION_OBSERVER_ENTRY,
        target: element,
        isIntersecting: true,
      };

      const inputObs = cold('a', { a: [entry] });
      vi.spyOn<any>(service, 'createIntersectionObservable').mockReturnValue(
        inputObs
      );
      const resultObs = cold('(a|)', { a: true });
      expect(service.isIntersected(element)).toBeObservable(resultObs);
    });

    it('should take intersecting conditions into account', () => {
      const element: HTMLElement = document.createElement('section');

      const entry: IntersectionObserverEntry = {
        ...INTERSECTION_OBSERVER_ENTRY,
        target: element,
        isIntersecting: true,
      };

      const entryMatchingCondition: IntersectionObserverEntry = {
        ...INTERSECTION_OBSERVER_ENTRY,
        target: element,
        isIntersecting: true,
        intersectionRatio: 1,
      };

      const inputObs = cold('a', { a: [entry, entryMatchingCondition] });
      vi.spyOn<any>(service, 'createIntersectionObservable').mockReturnValue(
        inputObs
      );
      const resultObs = cold('(a|)', { a: true });
      const intersectingCondition = (entry: IntersectionObserverEntry) =>
        entry.intersectionRatio === 1;
      expect(
        service.isIntersected(element, {}, intersectingCondition)
      ).toBeObservable(resultObs);
    });
  });

  describe('createIntersectionObservable', () => {
    beforeEach(() => {
      vi.stubGlobal(
        'IntersectionObserver',
        vi.fn().mockImplementation(function (
          cb: IntersectionObserverCallback
        ) {
          // Immediately fire callback with a default entry so the observable emits
          cb(
            [
              {
                isIntersecting: false,
                intersectionRatio: 0,
                boundingClientRect: DOM_RECT_READ_ONLY,
                intersectionRect: DOM_RECT_READ_ONLY,
                rootBounds: null,
                time: 0,
                target: document.createElement('section'),
              } as IntersectionObserverEntry,
            ],
            this
          );
          return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
        })
      );
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('should emit observable containing an IntersectionObserverEntry', async () => {
      const element: HTMLElement = document.createElement('section');
      const result = await firstValueFrom(
        service['createIntersectionObservable'](element, {})
      );
      expect(result.length).toBe(1);
      const intersectionObserverEntry: IntersectionObserverEntry = result[0];
      expect(intersectionObserverEntry.isIntersecting).toBe(false);
    });
  });

  describe('getRootMargin', () => {
    it('should get margin from layout config if not explicitly provided', () => {
      expect(service['getRootMargin']({})).toBe(INTERSECTION_MARGIN_GENERAL);
    });
    it('should get margin from layout config if no options provided at all', () => {
      expect(service['getRootMargin']()).toBe(INTERSECTION_MARGIN_GENERAL);
    });
    it('should get margin from options if provided', () => {
      expect(
        service['getRootMargin']({ rootMargin: INTERSECTION_MARGIN_SPECIFIC })
      ).toBe(INTERSECTION_MARGIN_SPECIFIC);
    });
  });
});

describe('IntersectionService SSR Platform Detection', () => {
  let service: IntersectionService;

  describe('Server Platform', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: LayoutConfig, useValue: MOCK_LAYOUT_CONFIG },
          { provide: PLATFORM_ID, useValue: 'server' },
        ],
      });
      service = TestBed.inject(IntersectionService);
    });

    it('should return false immediately for isIntersected in SSR', async () => {
      const element: HTMLElement = document.createElement('section');
      const isIntersected = await firstValueFrom(service.isIntersected(element));
      expect(isIntersected).toBe(false);
    });

    it('should return false immediately for isIntersecting in SSR', async () => {
      const element: HTMLElement = document.createElement('section');
      const isIntersected = await firstValueFrom(service.isIntersecting(element));
      expect(isIntersected).toBe(false);
    });

    it('should return false for intersecting conditions in SSR', async () => {
      const element: HTMLElement = document.createElement('section');
      const intersectingCondition = (entry: IntersectionObserverEntry) =>
        entry.intersectionRatio === 1;

      const isIntersected = await firstValueFrom(
        service.isIntersected(element, {}, intersectingCondition)
      );
      expect(isIntersected).toBe(false);
    });
  });

  describe('Browser Platform', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: LayoutConfig, useValue: MOCK_LAYOUT_CONFIG },
          { provide: PLATFORM_ID, useValue: 'browser' },
        ],
      });
      service = TestBed.inject(IntersectionService);
    });

    it('should create IntersectionObserver in browser', () => {
      const element: HTMLElement = document.createElement('section');
      const createIntersectionObservableSpy = vi.spyOn<any>(
        service,
        'createIntersectionObservable'
      ).mockReturnValue(
        of([
          {
            ...INTERSECTION_OBSERVER_ENTRY,
            target: element,
            isIntersecting: true,
          },
        ])
      );

      service.isIntersected(element).subscribe();

      expect(createIntersectionObservableSpy).toHaveBeenCalled();
    });
  });
});
