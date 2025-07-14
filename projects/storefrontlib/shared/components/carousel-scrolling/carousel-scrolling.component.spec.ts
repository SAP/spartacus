import { Component, Directive, Input, OnDestroy } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule } from '@spartacus/core';
import {
  CarouselScrollingComponent,
  HorizontalScrollingPositionDirective,
  ICON_TYPE,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';

@Component({
  selector: 'cx-icon',
  template: '',
  standalone: false,
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Directive({
  selector: '[cxHorizontalScrollingPosition]',
  standalone: false,
  exportAs: 'cxHorizontalScrollingPosition',
})
class MockHorizontalScrollingPositionDirective
  implements Partial<HorizontalScrollingPositionDirective>
{
  isScrollStart$ = new BehaviorSubject<boolean>(false);
  isScrollEnd$ = new BehaviorSubject<boolean>(false);
  isScrollNeeded$ = new BehaviorSubject<boolean>(true);
  scrollBackward = jasmine.createSpy('scrollBackward');
  scrollForward = jasmine.createSpy('scrollForward');
}

@Component({
  selector: 'cx-test-child',
  template: ` Test Carousel Item
    <div>
      Item testProperty:
      <span class="child-item">{{ item.testProperty }}</span>
    </div>
    <div>
      itemIndex:
      <span class="child-itemIndex">{{ itemIndex }}</span>
    </div>`,
  standalone: false,
})
class TestChildComponent implements OnDestroy {
  @Input() item: any;
  @Input() itemIndex: number;

  static destroyedCount = 0;
  ngOnDestroy() {
    TestChildComponent.destroyedCount++;
  }
}

@Component({
  selector: 'cx-test-parent',
  template: `
    <cx-carousel-scrolling
      [items]="mockItems"
      [title]="mockTitle"
      [template]="carouselItem"
      [trackByFn]="carouselTrackByFn"
    ></cx-carousel-scrolling>
    <ng-template #carouselItem let-item="item" let-itemIndex="itemIndex">
      <cx-test-child [item]="item" [itemIndex]="itemIndex"></cx-test-child>
    </ng-template>
  `,
  standalone: false,
})
class TestParentComponent {
  mockTitle = 'Test Carousel';
  mockItems = [
    of({ testProperty: 'A', customID: 1 }),
    of({ testProperty: 'B', customID: 2 }),
    of({ testProperty: 'C', customID: 3 }),
    of({ testProperty: 'D', customID: 4 }),
    of({ testProperty: 'E', customID: 5 }),
  ];
  carouselTrackByFn = (_index: number, item: any) => item.customID;
}

describe('CarouselScrolling Component tested in TestParentComponent', () => {
  let parentFixture: ComponentFixture<TestParentComponent>;

  beforeEach(waitForAsync(() => {
    TestChildComponent.destroyedCount = 0;
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        CarouselScrollingComponent,
        MockHorizontalScrollingPositionDirective,
        MockCxIconComponent,
        TestParentComponent,
        TestChildComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    parentFixture = TestBed.createComponent(TestParentComponent);
    parentFixture.detectChanges();
  });

  it('should render 5 items', () => {
    const items = parentFixture.debugElement.queryAll(By.css('.item'));
    expect(items.length).toBe(5);
  });

  describe('carousel buttons', () => {
    let horizontalScrollingPositionDirective: MockHorizontalScrollingPositionDirective;

    beforeEach(() => {
      parentFixture.detectChanges();
      horizontalScrollingPositionDirective = parentFixture.debugElement
        .query(By.css('.carousel-panel'))
        .injector.get(MockHorizontalScrollingPositionDirective);
    });

    it('should have previous button', () => {
      const buttons = parentFixture.debugElement.queryAll(
        By.css('button.previous')
      );
      expect(buttons.length).toBe(1);
    });

    it('should have next button', () => {
      const buttons = parentFixture.debugElement.queryAll(
        By.css('button.next')
      );
      expect(buttons.length).toBe(1);
    });

    it('should have correct aria-label for previous button', () => {
      const prevButton = parentFixture.debugElement.query(
        By.css('button.previous')
      );
      expect(prevButton.attributes['aria-label']).toBe(
        'carousel.scrollBackward'
      );
    });

    it('should have correct title for previous button', () => {
      const prevButton = parentFixture.debugElement.query(
        By.css('button.previous')
      );
      expect(prevButton.attributes['title']).toBe('carousel.scrollBackward');
    });

    it('should have correct aria-label for next button', () => {
      const nextButton = parentFixture.debugElement.query(
        By.css('button.next')
      );
      expect(nextButton.attributes['aria-label']).toBe(
        'carousel.scrollForward'
      );
    });

    it('should have correct title for next button', () => {
      const nextButton = parentFixture.debugElement.query(
        By.css('button.next')
      );
      expect(nextButton.attributes['title']).toBe('carousel.scrollForward');
    });

    it('should disable previous button when scrolled to the start', () => {
      horizontalScrollingPositionDirective.isScrollStart$.next(true);
      parentFixture.detectChanges();
      const prevButton = parentFixture.debugElement.query(
        By.css('button.previous')
      );
      expect(prevButton.attributes['aria-disabled']).toBe('true');
    });

    it('should enable previous button when NOT scrolled to the start', () => {
      horizontalScrollingPositionDirective.isScrollStart$.next(false);
      parentFixture.detectChanges();
      const prevButton = parentFixture.debugElement.query(
        By.css('button.previous')
      );
      expect(prevButton.attributes['aria-disabled']).toBe('false');
    });

    it('should enable next button when scrolled to the end', () => {
      horizontalScrollingPositionDirective.isScrollEnd$.next(true);
      parentFixture.detectChanges();
      const nextButton = parentFixture.debugElement.query(
        By.css('button.next')
      );
      expect(nextButton.attributes['aria-disabled']).toBe('true');
    });

    it('should disable next button when NOT scrolled to the end', () => {
      horizontalScrollingPositionDirective.isScrollEnd$.next(false);
      parentFixture.detectChanges();
      const nextButton = parentFixture.debugElement.query(
        By.css('button.next')
      );
      expect(nextButton.attributes['aria-disabled']).toBe('false');
    });

    it('should hide previous and next button, when no scroll is needed (all items fit into container)', () => {
      horizontalScrollingPositionDirective.isScrollNeeded$.next(false);
      parentFixture.detectChanges();
      const prevButton = parentFixture.debugElement.query(
        By.css('button.previous')
      );
      const nextButton = parentFixture.debugElement.query(
        By.css('button.next')
      );
      expect(prevButton).not.toBeNull();
      expect(nextButton).not.toBeNull();
      expect(
        prevButton.nativeElement.classList.contains('scroll-possible')
      ).toBe(false);
      expect(
        nextButton.nativeElement.classList.contains('scroll-possible')
      ).toBe(false);
    });

    it('should scroll forward when user clicks next button', () => {
      const nextButton =
        parentFixture.nativeElement.querySelector('button.next');
      expect(
        horizontalScrollingPositionDirective.scrollForward
      ).not.toHaveBeenCalled();
      nextButton.click();
      expect(
        horizontalScrollingPositionDirective.scrollForward
      ).toHaveBeenCalled();
    });

    it('should scroll backward when user click previous button', () => {
      const prevButton =
        parentFixture.nativeElement.querySelector('button.previous');
      expect(
        horizontalScrollingPositionDirective.scrollForward
      ).not.toHaveBeenCalled();
      prevButton.click();
      expect(
        horizontalScrollingPositionDirective.scrollBackward
      ).toHaveBeenCalled();
    });
  });

  it(`should pass item's data to each child template context`, () => {
    const itemsData = parentFixture.debugElement.queryAll(
      By.css('.child-item')
    );
    expect(itemsData.length).toBe(5);
    expect(itemsData[0].nativeElement.textContent).toBe('A');
    expect(itemsData[1].nativeElement.textContent).toBe('B');
    expect(itemsData[2].nativeElement.textContent).toBe('C');
    expect(itemsData[3].nativeElement.textContent).toBe('D');
    expect(itemsData[4].nativeElement.textContent).toBe('E');
  });

  it(`should pass itemIndex to child each template context`, () => {
    const itemIndexes = parentFixture.debugElement.queryAll(
      By.css('.child-itemIndex')
    );
    expect(itemIndexes.length).toBe(5);
    expect(itemIndexes[0].nativeElement.textContent).toBe('0');
    expect(itemIndexes[1].nativeElement.textContent).toBe('1');
    expect(itemIndexes[2].nativeElement.textContent).toBe('2');
    expect(itemIndexes[3].nativeElement.textContent).toBe('3');
    expect(itemIndexes[4].nativeElement.textContent).toBe('4');
  });

  it('should not destroy child components when getting a new deep copy of the array, while trackByFn is used', () => {
    parentFixture.detectChanges();
    const oldChildEls = parentFixture.debugElement.queryAll(
      By.css('cx-test-child')
    );
    // Replace with a new array (same objects/ids)
    parentFixture.componentInstance.mockItems = [
      of({ testProperty: 'A', customID: 1 }),
      of({ testProperty: 'B', customID: 2 }),
      of({ testProperty: 'C', customID: 3 }),
      of({ testProperty: 'D', customID: 4 }),
      of({ testProperty: 'E', customID: 5 }),
    ];
    parentFixture.detectChanges();

    expect(TestChildComponent.destroyedCount).toBe(0);

    const newChildEls = parentFixture.debugElement.queryAll(
      By.css('cx-test-child')
    );
    expect(newChildEls.length).toEqual(oldChildEls.length);
    expect(newChildEls[0].nativeElement.textContent).toContain('A');
    expect(newChildEls[1].nativeElement.textContent).toContain('B');
    expect(newChildEls[2].nativeElement.textContent).toContain('C');
    expect(newChildEls[3].nativeElement.textContent).toContain('D');
    expect(newChildEls[4].nativeElement.textContent).toContain('E');
  });
});
