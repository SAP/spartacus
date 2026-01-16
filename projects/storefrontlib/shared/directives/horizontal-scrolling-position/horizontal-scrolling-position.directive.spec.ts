import { NgFor } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import { BehaviorSubject, filter } from 'rxjs';
import { HorizontalScrollingPositionDirective } from './horizontal-scrolling-position.directive';

@Component({
  selector: 'cx-test-component',
  template: `
    <ng-container
      cxHorizontalScrollingPosition
      #dir="cxHorizontalScrollingPosition"
      [scrollingArea]="scrollingArea"
      [scrollingAreaStart]="scrollingAreaStart"
      [scrollingAreaEnd]="scrollingAreaEnd"
    >
      <div
        #scrollingArea
        class="scrolling-area"
        style="overflow-x: auto; white-space: nowrap; width: 300px; display: flex;"
      >
        <div #scrollingAreaStart></div>
        <div *ngFor="let item of items" class="item" style="flex: 0 0 100px">
          {{ item }}
        </div>
        <div #scrollingAreaEnd></div>
      </div>
    </ng-container>
  `,
  imports: [HorizontalScrollingPositionDirective, NgFor],
})
export class TestComponent {
  items = [1, 2, 3, 4, 5];
}

class MockWindowRef implements Partial<WindowRef> {
  resize$ = new BehaviorSubject<any>({});
  isBrowser(): boolean {
    return true;
  }
}

describe('HorizontalScrollingPositionDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let scrollingArea: DebugElement;
  let directive: HorizontalScrollingPositionDirective;
  let mockWindowRef: MockWindowRef;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HorizontalScrollingPositionDirective, TestComponent],
      providers: [
        {
          provide: WindowRef,
          useClass: MockWindowRef,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    scrollingArea = fixture.debugElement.query(By.css('.scrolling-area'));
    directive = scrollingArea.injector.get(
      HorizontalScrollingPositionDirective
    );
    mockWindowRef = TestBed.inject(WindowRef) as unknown as MockWindowRef;
  });

  describe('ngOnChanges', () => {
    describe('in CSR', () => {
      beforeEach(() => {
        spyOn(mockWindowRef, 'isBrowser').and.returnValue(true);
      });

      it('should subscribe to new inputs scrolling position', () => {
        const mockIntersectionObserver = new IntersectionObserver(() => {});
        spyOn(mockIntersectionObserver, 'disconnect').and.callThrough();
        const mockResizeObserver = new ResizeObserver(() => {});
        spyOn(mockResizeObserver, 'disconnect').and.callThrough();
        directive['scrollingAreaIntersectionObserver'] =
          mockIntersectionObserver;
        directive['scrollingAreaResizeObserver'] = mockResizeObserver;

        const mockScrollingArea = document.createElement('div');
        const mockScrollingAreaStart = document.createElement('div');
        const mockScrollingAreaEnd = document.createElement('div');
        directive.scrollingArea = mockScrollingArea;
        directive.scrollingAreaStart = mockScrollingAreaStart;
        directive.scrollingAreaEnd = mockScrollingAreaEnd;

        spyOn(directive as any, 'subscribeScrollingArea').and.callThrough();
        spyOn(directive as any, 'unsubscribeScrollingArea').and.callThrough();
        spyOn(IntersectionObserver.prototype, 'observe');

        directive.ngOnChanges();

        // should unsubscribe from previous scrolling position
        expect(directive['unsubscribeScrollingArea']).toHaveBeenCalled();
        expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
        expect(mockResizeObserver.disconnect).toHaveBeenCalled();

        // should subscribe to new scrolling position
        expect(directive['subscribeScrollingArea']).toHaveBeenCalled();
        expect(directive['scrollingAreaIntersectionObserver']).not.toBe(
          mockIntersectionObserver
        );
        expect(directive['scrollingAreaIntersectionObserver']).toBeInstanceOf(
          IntersectionObserver
        );
        expect(directive['scrollingAreaIntersectionObserver'].root).toEqual(
          mockScrollingArea
        );
        expect(IntersectionObserver.prototype.observe).toHaveBeenCalledWith(
          mockScrollingAreaStart
        );
        expect(IntersectionObserver.prototype.observe).toHaveBeenCalledWith(
          mockScrollingAreaEnd
        );

        expect(directive['scrollingAreaResizeObserver']).not.toBe(
          mockResizeObserver
        );
        expect(directive['scrollingAreaResizeObserver']).toBeInstanceOf(
          ResizeObserver
        );
      });

      it('should unsubscribe from previous inputs scrolling position', () => {
        const mockIntersectionObserver = new IntersectionObserver(() => {});
        spyOn(mockIntersectionObserver, 'disconnect').and.callThrough();
        const mockResizeObserver = new ResizeObserver(() => {});
        spyOn(mockResizeObserver, 'disconnect').and.callThrough();
        directive['scrollingAreaIntersectionObserver'] =
          mockIntersectionObserver;
        directive['scrollingAreaResizeObserver'] = mockResizeObserver;

        spyOn(directive as any, 'unsubscribeScrollingArea').and.callThrough();
        spyOn(directive as any, 'subscribeScrollingArea').and.callThrough();
        directive.scrollingArea = undefined;
        directive.scrollingAreaStart = undefined;
        directive.scrollingAreaEnd = undefined;

        directive.ngOnChanges();

        expect(directive['unsubscribeScrollingArea']).toHaveBeenCalled();
        expect(directive['scrollingAreaIntersectionObserver']).toBeUndefined();
        expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
        expect(mockResizeObserver.disconnect).toHaveBeenCalled();
        expect(directive['scrollingAreaResizeObserver']).toBeUndefined();

        expect(directive['subscribeScrollingArea']).not.toHaveBeenCalled();
      });
    });

    describe('in SSR', () => {
      beforeEach(() => {
        spyOn(mockWindowRef, 'isBrowser').and.returnValue(false);
      });

      it('should NOT subscribe to new inputs scrolling position', () => {
        const mockScrollingArea = document.createElement('div');
        const mockScrollingAreaStart = document.createElement('div');
        const mockScrollingAreaEnd = document.createElement('div');
        directive.scrollingArea = mockScrollingArea;
        directive.scrollingAreaStart = mockScrollingAreaStart;
        directive.scrollingAreaEnd = mockScrollingAreaEnd;

        spyOn(directive as any, 'subscribeScrollingArea').and.callThrough();

        directive.ngOnChanges();

        expect(directive['subscribeScrollingArea']).not.toHaveBeenCalled();
        expect(directive['scrollingAreaIntersectionObserver']).toBeUndefined();
        expect(directive['scrollingAreaResizeObserver']).toBeUndefined();
      });

      it('should NOT unsubscribe from old inputs scrolling position', () => {
        const mockScrollingArea = document.createElement('div');
        const mockScrollingAreaStart = document.createElement('div');
        const mockScrollingAreaEnd = document.createElement('div');
        directive.scrollingArea = mockScrollingArea;
        directive.scrollingAreaStart = mockScrollingAreaStart;
        directive.scrollingAreaEnd = mockScrollingAreaEnd;

        spyOn(directive as any, 'unsubscribeScrollingArea').and.callThrough();

        directive.ngOnChanges();

        expect(directive['unsubscribeScrollingArea']).not.toHaveBeenCalled();
        expect(directive['scrollingAreaIntersectionObserver']).toBeUndefined();
        expect(directive['scrollingAreaResizeObserver']).toBeUndefined();
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from scrolling position', () => {
      spyOn(directive as any, 'subscribeScrollingArea').and.callThrough();
      spyOn(directive as any, 'unsubscribeScrollingArea').and.callThrough();
      directive.ngOnDestroy();
      expect(directive['unsubscribeScrollingArea']).toHaveBeenCalled();
      expect(directive['subscribeScrollingArea']).not.toHaveBeenCalled();
    });
  });

  describe('after initial rendering', () => {
    beforeEach(() => {
      fixture.detectChanges(); // trigger initial rendering
    });

    describe('public observables', () => {
      describe('isScrollStart$', () => {
        it('should emit true when scroll position is at the start', () => {
          let isScrollStart;
          directive.isScrollStart$.subscribe(
            (value) => (isScrollStart = value)
          );
          expect(isScrollStart).toBe(true);
        });

        it('should emit false when scroll position is NOT the start', (done) => {
          scrollingArea.nativeElement.scrollLeft = 100; // scroll a bit to the right

          directive.isScrollStart$
            .pipe(filter((value) => value === false)) // wait, because IntersectionObserver kicks after some delay
            .subscribe((value) => {
              expect(value).toBe(false);
              done();
            });
        });

        it('should be completed in ngOnDestroy', () => {
          let completed;
          directive.isScrollStart$.subscribe({
            complete: () => (completed = true),
          });
          directive.ngOnDestroy();
          expect(completed).toBe(true);
        });
      });

      describe('isScrollEnd$', () => {
        it('should emit false when scroll position is NOT the end', () => {
          let isScrollEnd;
          directive.isScrollEnd$.subscribe((value) => (isScrollEnd = value));
          expect(isScrollEnd).toBe(false);
        });

        it('should emit true when scroll position is at the end', (done) => {
          scrollingArea.nativeElement.scrollLeft = 400; // scroll until end to the right

          directive.isScrollEnd$
            .pipe(filter((value) => value === true)) // wait, because IntersectionObserver kicks after some delay
            .subscribe((value) => {
              expect(value).toBe(true);
              done();
            });
        });

        it('should be completed in ngOnDestroy', () => {
          let completed;
          directive.isScrollEnd$.subscribe({
            complete: () => (completed = true),
          });
          directive.ngOnDestroy();
          expect(completed).toBe(true);
        });
      });

      describe('isScrollNeeded$', () => {
        it('should emit true when not all elements fit into the container', () => {
          let isScrollNeeded;
          directive.isScrollNeeded$.subscribe(
            (value) => (isScrollNeeded = value)
          );
          expect(isScrollNeeded).toBe(true);
        });

        it('should emit false when all elements fit into the container', (done) => {
          scrollingArea.nativeElement.style.width = '500px'; // make it wider to fit all items

          directive.isScrollNeeded$
            .pipe(filter((value) => value === false)) // wait, because IntersectionObserver kicks after some delay
            .subscribe((value) => {
              expect(value).toBe(false);
              done();
            });
        });
      });

      describe('scrollingAreaWidth$', () => {
        it('should emit and update on scrollingArea resize', (done) => {
          directive.scrollingAreaWidth$.subscribe((width) => {
            expect(width).toBe(scrollingArea.nativeElement.clientWidth);
            done();
          });
        });
      });
    });

    describe('scrollForward', () => {
      it('should scroll forward by default width and behavior', () => {
        directive['_isScrollEnd$'].next(false);
        spyOn(scrollingArea.nativeElement, 'scrollBy').and.callThrough();

        directive.scrollForward();
        expect(scrollingArea.nativeElement.scrollBy).toHaveBeenCalledWith({
          left: scrollingArea.nativeElement.clientWidth,
          behavior: 'smooth',
        });
      });

      it('should scroll forward by provided distance and behavior', () => {
        spyOn(scrollingArea.nativeElement, 'scrollBy').and.callThrough();

        directive.scrollForward({
          distance: 100,
          behavior: 'instant',
        });
        expect(scrollingArea.nativeElement.scrollBy).toHaveBeenCalledWith({
          left: 100,
          behavior: 'instant',
        });
      });

      it('should not scroll if already at end', () => {
        directive['_isScrollEnd$'].next(true);
        spyOn(scrollingArea.nativeElement, 'scrollBy').and.callThrough();
        directive.scrollForward();
        expect(scrollingArea.nativeElement.scrollBy).not.toHaveBeenCalled();
      });

      it('should not scroll if scrollingArea is undefined', () => {
        directive['_isScrollEnd$'].next(false);
        directive.scrollingArea = undefined;
        spyOn(scrollingArea.nativeElement, 'scrollBy').and.callThrough();
        directive.scrollForward();
        expect(scrollingArea.nativeElement.scrollBy).not.toHaveBeenCalled();
      });
    });

    describe('scrollBackward', () => {
      it('should scroll backward by default width and behavior', () => {
        directive['_isScrollStart$'].next(false);
        spyOn(scrollingArea.nativeElement, 'scrollBy').and.callThrough();

        directive.scrollBackward();
        expect(scrollingArea.nativeElement.scrollBy).toHaveBeenCalledWith({
          left: -scrollingArea.nativeElement.clientWidth,
          behavior: 'smooth',
        });
      });

      it('should scroll forward by provided distance and behavior', () => {
        directive['_isScrollStart$'].next(false);
        spyOn(scrollingArea.nativeElement, 'scrollBy').and.callThrough();

        directive.scrollBackward({
          distance: 100,
          behavior: 'instant',
        });
        expect(scrollingArea.nativeElement.scrollBy).toHaveBeenCalledWith({
          left: -100,
          behavior: 'instant',
        });
      });

      it('should not scroll if already at end', () => {
        directive['_isScrollStart$'].next(true);
        spyOn(scrollingArea.nativeElement, 'scrollBy').and.callThrough();

        directive.scrollBackward();
        expect(scrollingArea.nativeElement.scrollBy).not.toHaveBeenCalled();
      });

      it('should not scroll if scrollingArea is undefined', () => {
        directive['_isScrollStart$'].next(true);
        directive.scrollingArea = undefined;

        spyOn(scrollingArea.nativeElement, 'scrollBy').and.callThrough();
        directive.scrollBackward();
        expect(scrollingArea.nativeElement.scrollBy).not.toHaveBeenCalled();
      });
    });
  });
});
