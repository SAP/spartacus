import { Component, DebugElement, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WindowRef } from '@spartacus/core';
import { BehaviorSubject, filter } from 'rxjs';
import { HorizontalScrollingPositionDirective } from './horizontal-scrolling-position.directive';

@Component({
  selector: 'test-component',
  standalone: false,
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
      // teardown: { destroyAfterEach: true },
      declarations: [HorizontalScrollingPositionDirective, TestComponent],
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
    fixture.detectChanges();
  });

  describe('scrollingArea input', () => {
    it('should subscribe to scrolling area on input set', () => {
      spyOn(directive as any, 'subscribeScrollingArea').and.callThrough();
      const newScrollingAreaElement = document.createElement('div');
      directive.scrollingArea = newScrollingAreaElement;
      directive.ngOnChanges({
        scrollingArea: new SimpleChange(
          newScrollingAreaElement,
          undefined,
          false
        ),
      });
      expect(directive['subscribeScrollingArea']).toHaveBeenCalled();
    });

    it('should unsubscribe from scrolling area on input unset', () => {
      spyOn(directive as any, 'unsubscribeScrollingArea').and.callThrough();
      const previousScrollingAreaElement = document.createElement('div');

      directive.scrollingArea = undefined;
      directive.ngOnChanges({
        scrollingArea: new SimpleChange(
          previousScrollingAreaElement,
          undefined,
          false
        ),
      });
      expect(directive['unsubscribeScrollingArea']).toHaveBeenCalled();
    });

    it('should clean up subscriptions and observers on destroy', () => {
      spyOn(directive as any, 'unsubscribeScrollingArea').and.callThrough();
      directive.ngOnDestroy();
      expect(directive['unsubscribeScrollingArea']).toHaveBeenCalled();
    });
  });

  describe('subscribeScrollingArea', () => {
    it('should do nothing if running in SSR', () => {
      spyOn(directive['windowRef'], 'isBrowser').and.returnValue(false);
      directive['subscribeScrollingArea']();
      expect(directive['windowRef'].isBrowser).toHaveBeenCalled();

      // SPIKE TODO: Add more tests for SSR behavior
    });
  });

  describe('unsubscribeScrollingArea', () => {
    it('should do nothing if running in SSR', () => {
      spyOn(directive['windowRef'], 'isBrowser').and.returnValue(false);
      directive['unsubscribeScrollingArea']();
      expect(directive['windowRef'].isBrowser).toHaveBeenCalled();

      // SPIKE TODO: Add more tests for SSR behavior
    });
  });

  describe('inputs', () => {
    it(
      'should handle scrollingArea, scrollingAreaStart, scrollingAreaEnd being undefined'
    );
    it('should handle input mutation after initialization');
    it('should handle DOM mutation after initialization');
  });

  describe('public observables', () => {
    describe('isScrollStart$', () => {
      it('should emit true when scroll position is at the start', () => {
        let isScrollStart;
        directive.isScrollStart$.subscribe((value) => (isScrollStart = value));
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
      it('should emit and update on WindowRef.resize$ emission', () => {
        const scrollingAreaWidthsHistory = [];
        directive.scrollingAreaWidth$.subscribe((width) => {
          scrollingAreaWidthsHistory.push(width);
        });
        expect(scrollingAreaWidthsHistory.length).toBe(1);
        mockWindowRef.resize$.next({});
        expect(scrollingAreaWidthsHistory.length).toBe(2);
        mockWindowRef.resize$.next({});
        expect(scrollingAreaWidthsHistory.length).toBe(3);
      });
    });
  });

  describe('scrollForward', () => {
    it('should scroll forward by default width and behavior');
    it('should scroll forward by provided distance and behavior');
    it('should not scroll if already at end');
    it('should not scroll if scrollingArea is undefined');
    it('should handle rapid calls and input changes');
  });

  describe('scrollBackward', () => {
    it('should scroll backward by default width and behavior');
    it('should scroll backward by provided distance and behavior');
    it('should not scroll if already at start');
    it('should not scroll if scrollingArea is undefined');
    it('should handle rapid calls and input changes');
  });

  describe('IntersectionObserver', () => {
    it('should observe scrollingAreaStart and scrollingAreaEnd');
    it('should disconnect observer on destroy');
    it('should not create observer if not in browser');
  });

  describe('error handling', () => {
    it('should log error if scrollingAreaStart or scrollingAreaEnd is missing');
    it('should not log error if both are present');
  });

  describe('memory and concurrency', () => {
    it(
      'should clean up all subscriptions and observers to prevent memory leaks'
    );
    it('should handle concurrent input changes and scrolling');
  });
});
