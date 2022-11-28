import { TestBed } from '@angular/core/testing';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionService } from './intersection.service';
import { take } from 'rxjs/operators';

const MockLayoutConfig: LayoutConfig = {};

const mockIntersectionObserver = class {
  observe(): void {}
  disconnect(): void {}
};

fdescribe('IntersectionService', () => {
  let service: IntersectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LayoutConfig, useValue: MockLayoutConfig }],
    });
  });

  beforeEach(() => {
    service = TestBed.inject(IntersectionService);
    (<any>window).IntersectionObserver = mockIntersectionObserver;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isIntersected', () => {
    it('should return false', (done) => {
      const heading = document.createElement('h2');

      (<any>window).IntersectionObserverEntry = {
        target: heading,
        isIntersecting: false,
        intersectionRatio: 0,
      };

      service
        .isIntersected(heading)
        .pipe(take(1))
        .subscribe((isIntersected) => {
          expect(isIntersected).toBe(false);
          done();
        });
    });
  });
});
