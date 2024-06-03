import { TestBed } from '@angular/core/testing';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionService } from './intersection.service';
import { take } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { cold } from 'jasmine-marbles';

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
      providers: [{ provide: LayoutConfig, useValue: MOCK_LAYOUT_CONFIG }],
    });
    service = TestBed.inject(IntersectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isIntersecting', () => {
    it('should emit false in case html element does not intersect', (done) => {
      const element: HTMLElement = document.createElement('h2');

      const entry: IntersectionObserverEntry = {
        ...INTERSECTION_OBSERVER_ENTRY,
        target: element,
        isIntersecting: false,
      };

      let intersectionObservable: Observable<IntersectionObserverEntry[]> = of([
        entry,
      ]);
      spyOn<any>(service, 'createIntersectionObservable').and.returnValue(
        intersectionObservable
      );

      service
        .isIntersecting(element)
        .pipe(take(1))
        .subscribe((isIntersected) => {
          expect(isIntersected).toBe(false);
          done();
        });
    });

    it('should emit true in case element is intersecting', (done) => {
      const element: HTMLElement = document.createElement('section');
      const entry: IntersectionObserverEntry = {
        ...INTERSECTION_OBSERVER_ENTRY,
        target: element,
        isIntersecting: true,
      };

      let intersectionObservable: Observable<IntersectionObserverEntry[]> = of([
        entry,
      ]);
      spyOn<any>(service, 'createIntersectionObservable').and.returnValue(
        intersectionObservable
      );
      service
        .isIntersecting(element)
        .pipe(take(1))
        .subscribe((isIntersected) => {
          expect(isIntersected).toBe(true);
          done();
        });
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
      spyOn<any>(service, 'createIntersectionObservable').and.returnValue(
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
      spyOn<any>(service, 'createIntersectionObservable').and.returnValue(
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
      spyOn<any>(service, 'createIntersectionObservable').and.returnValue(
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
    it('should emit observable containing an IntersectionObserverEntry', (done) => {
      const element: HTMLElement = document.createElement('section');
      service['createIntersectionObservable'](element, {})
        .pipe(take(1))
        .subscribe((result) => {
          expect(result.length).toBe(1);
          const intersectionObserverEntry: IntersectionObserverEntry =
            result[0];
          expect(intersectionObserverEntry.isIntersecting).toBe(false);
          done();
        });
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
