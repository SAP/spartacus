import { TestBed } from '@angular/core/testing';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionService } from './intersection.service';
import { take } from 'rxjs/operators';

const MockLayoutConfig: LayoutConfig = {};

const entries: IntersectionObserverEntry[] = [];

fdescribe('IntersectionService', () => {
  let service: IntersectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LayoutConfig, useValue: MockLayoutConfig }],
    });

    service = TestBed.inject(IntersectionService);
    spyOn(window, 'IntersectionObserver').and.callThrough();
  });

  afterEach(() => {
    entries.pop();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isIntersected', () => {
    it('should return false', (done) => {
      const element: Element = document.createElement('h2');

      const entry: IntersectionObserverEntry = {
        target: element,
        isIntersecting: false,
        intersectionRatio: 0,
        boundingClientRect: undefined,
        intersectionRect: undefined,
        rootBounds: null,
        time: undefined,
      };

      entries.push(entry);

      service
        .isIntersected(element as HTMLElement)
        .pipe(take(1))
        .subscribe((isIntersected) => {
          expect(isIntersected).toBe(false);
          done();
        });
    });

    it('should return true', (done) => {
      const element: Element = document.createElement('section');

      const entry: IntersectionObserverEntry = {
        target: element,
        isIntersecting: true,
        intersectionRatio: 0,
        boundingClientRect: undefined,
        intersectionRect: undefined,
        rootBounds: null,
        time: undefined,
      };

      entries.push(entry);

      service
        .isIntersected(element as HTMLElement)
        .pipe(take(1))
        .subscribe((isIntersected) => {
          expect(isIntersected).toBe(true);
          done();
        });
    });
  });
});
