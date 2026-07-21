import { Component, Directive, Input, OnDestroy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CxDatePipe,
  I18nTestingModule,
  LoggerService,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import {
  CarouselScrollingComponent,
  FocusableCarouselItemDirective,
  HorizontalScrollingPositionDirective,
  ICON_TYPE,
  IconComponent,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';

const EVENT_NAME_KEYDOWN = 'keydown';
const KEY_NAME_TAB = 'Tab';
const KEY_NAME_ARROW_RIGHT = 'ArrowRight';
const KEY_NAME_ARROW_LEFT = 'ArrowLeft';
const KEY_NAME_ENTER = 'Enter';

const createKeyboardEvent = (key: string) =>
  new KeyboardEvent(EVENT_NAME_KEYDOWN, {
    key,
    bubbles: true,
  });

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Directive({
  selector: '[cxHorizontalScrollingPosition]',
  exportAs: 'cxHorizontalScrollingPosition',
})
class MockHorizontalScrollingPositionDirective
  implements Partial<HorizontalScrollingPositionDirective>
{
  @Input() scrollingArea: HTMLElement;
  @Input() scrollingAreaStart: HTMLElement;
  @Input() scrollingAreaEnd: HTMLElement;

  isScrollStart$ = new BehaviorSubject<boolean>(false);
  isScrollEnd$ = new BehaviorSubject<boolean>(false);
  isScrollNeeded$ = new BehaviorSubject<boolean>(true);
  scrollBackward = vi.fn();
  scrollForward = vi.fn();
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
      <cx-test-child
        [item]="item"
        [itemIndex]="itemIndex"
        tabindex="0"
      ></cx-test-child>
    </ng-template>
  `,
  imports: [I18nTestingModule, CarouselScrollingComponent, TestChildComponent],
})
class TestParentComponent {
  mockTitle: string | undefined = 'Test Carousel Title';
  mockItems = [
    of({ testProperty: 'A', customID: 1 }),
    of({ testProperty: 'B', customID: 2 }),
    of({ testProperty: 'C', customID: 3 }),
    of({ testProperty: 'D', customID: 4 }),
    of({ testProperty: 'E', customID: 5 }),
  ];
  carouselTrackByFn = (_index: number, item: any) => item.customID;
}

@Component({
  selector: 'cx-test-parent-with-cx-focusable-carousel-item',
  template: `
    <cx-carousel-scrolling
      [items]="mockItems"
      [title]="mockTitle"
      [template]="carouselItem"
      [trackByFn]="carouselTrackByFn"
    ></cx-carousel-scrolling>
    <ng-template #carouselItem let-item="item" let-itemIndex="itemIndex">
      <cx-test-child
        [item]="item"
        [itemIndex]="itemIndex"
        tabindex="0"
        cxFocusableCarouselItem
      ></cx-test-child>
    </ng-template>
  `,
  imports: [I18nTestingModule, CarouselScrollingComponent, TestChildComponent],
})
class TestParentWithCxFocusableCarouselItemComponent {
  mockTitle: string | undefined = 'Test Carousel With cxFocusableCarouselItem';
  mockItems = [
    of({ testProperty: 'A', customID: 1 }),
    of({ testProperty: 'B', customID: 2 }),
    of({ testProperty: 'C', customID: 3 }),
    of({ testProperty: 'D', customID: 4 }),
    of({ testProperty: 'E', customID: 5 }),
  ];
  carouselTrackByFn = (_index: number, item: any) => item.customID;
}

@Component({
  selector: 'cx-test-parent-without-track-by',
  template: `
    <cx-carousel-scrolling
      [items]="mockItems"
      [title]="mockTitle"
      [template]="carouselItem"
    ></cx-carousel-scrolling>
    <ng-template #carouselItem let-item="item" let-itemIndex="itemIndex">
      <cx-test-child
        [item]="item"
        [itemIndex]="itemIndex"
        tabindex="0"
      ></cx-test-child>
    </ng-template>
  `,
  imports: [I18nTestingModule, CarouselScrollingComponent, TestChildComponent],
})
class TestParentWithoutTrackByComponent {
  mockTitle: string | undefined = 'Test Carousel Without TrackBy';
  mockItems = [
    of({ testProperty: 'A', customID: 1 }),
    of({ testProperty: 'B', customID: 2 }),
    of({ testProperty: 'C', customID: 3 }),
    of({ testProperty: 'D', customID: 4 }),
    of({ testProperty: 'E', customID: 5 }),
  ];
  carouselTrackByFn = (_index: number, item: any) => item.customID;
}

@Component({
  selector: 'cx-test-parent-without-child-template',
  template: `
    <cx-carousel-scrolling
      [items]="mockItems"
      [title]="mockTitle"
      [trackByFn]="carouselTrackByFn"
    ></cx-carousel-scrolling>
  `,
  imports: [I18nTestingModule, CarouselScrollingComponent],
})
class TestParentWithoutChildTemplateComponent {
  mockTitle = 'Test Carousel Without Child Template';
  mockItems = [];
  carouselTrackByFn = (_index: number, item: any) => item.customID;
}

describe('CarouselScrollingComponent', () => {
  describe('with child template', () => {
    let parentFixture: ComponentFixture<TestParentComponent>;
    let horizontalScrollingPositionDirective: MockHorizontalScrollingPositionDirective;
    let carouselScrollingComponent: CarouselScrollingComponent;

    beforeEach(async () => {
      TestChildComponent.destroyedCount = 0;
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          CarouselScrollingComponent,
          TestParentComponent,
          TestChildComponent,
        ],
      })
        .overrideComponent(CarouselScrollingComponent, {
          remove: {
            imports: [
              TranslatePipe,
              CxDatePipe,
              HorizontalScrollingPositionDirective,
              IconComponent,
            ],
          },
          add: {
            imports: [
              MockTranslatePipe,
              MockDatePipe,
              MockHorizontalScrollingPositionDirective,
              MockCxIconComponent,
            ],
          },
        })
        .compileComponents();
    });

    beforeEach(() => {
      parentFixture = TestBed.createComponent(TestParentComponent);

      horizontalScrollingPositionDirective = null!;
      carouselScrollingComponent = null!;
    });

    function detectAndQueryHelpers() {
      parentFixture.detectChanges();
      horizontalScrollingPositionDirective = parentFixture.debugElement
        .query(By.css('.carousel-panel'))
        .injector.get(MockHorizontalScrollingPositionDirective);
      carouselScrollingComponent = parentFixture.debugElement.query(
        By.directive(CarouselScrollingComponent)
      ).componentInstance;
    }

    describe('items', () => {
      it('should render all items with correct CSS class and structure', () => {
        detectAndQueryHelpers();
        const items = parentFixture.debugElement.queryAll(
          By.css('.carousel-panel .carousel-items .item')
        );
        expect(items.length).toBe(5);
      });

      it('should render no items, when items input is an empty array', () => {
        parentFixture.componentInstance.mockItems = [];
        parentFixture.detectChanges();
        const items = parentFixture.debugElement.queryAll(By.css('.item'));
        expect(items.length).toBe(0);
      });
    });

    describe('title', () => {
      it('should render h2 with title', () => {
        detectAndQueryHelpers();
        const el = parentFixture.debugElement.query(By.css('h2'));
        expect((<HTMLElement>el.nativeElement).textContent).toEqual(
          'Test Carousel Title'
        );
      });

      it('should NOT render h2 with title when not given via input', () => {
        parentFixture.componentInstance.mockTitle = undefined;
        detectAndQueryHelpers();
        const el = parentFixture.debugElement.query(By.css('h2'));
        expect(el).toBeNull();
      });
    });

    describe('scrolling position tracking', () => {
      beforeEach(() => detectAndQueryHelpers());
      it('should bind .carousel-items-start element to horizontalScrollingPositionDirective.scrollingAreaStart', () => {
        const carouselItemsStart = parentFixture.debugElement.queryAll(
          By.css('.carousel-panel .carousel-items .carousel-items-start')
        );
        expect(carouselItemsStart.length).toBe(1);
        expect(horizontalScrollingPositionDirective.scrollingAreaStart).toBe(
          carouselItemsStart[0].nativeElement
        );
      });

      it('should bind .carousel-items-end element to horizontalScrollingPositionDirective.scrollingAreaEnd', () => {
        const carouselItemsEnd = parentFixture.debugElement.queryAll(
          By.css('.carousel-panel .carousel-items .carousel-items-end')
        );
        expect(carouselItemsEnd.length).toBe(1);
        expect(horizontalScrollingPositionDirective.scrollingAreaEnd).toBe(
          carouselItemsEnd[0].nativeElement
        );
      });

      it('should bind .carousel-items element to horizontalScrollingPositionDirective.scrollingArea', () => {
        const carouselItemsContainer = parentFixture.debugElement.queryAll(
          By.css('.carousel-panel .carousel-items')
        );
        expect(carouselItemsContainer.length).toBe(1);
        expect(horizontalScrollingPositionDirective.scrollingArea).toBe(
          carouselItemsContainer[0].nativeElement
        );
      });

      it('should bind .carousel-items-end element to horizontalScrollingPositionDirective.scrollingAreaEnd', () => {
        const carouselItemsEnd = parentFixture.debugElement.queryAll(
          By.css('.carousel-panel .carousel-items .carousel-items-end')
        );
        expect(carouselItemsEnd.length).toBe(1);
        expect(horizontalScrollingPositionDirective.scrollingAreaEnd).toBe(
          carouselItemsEnd[0].nativeElement
        );
      });
    });

    describe('scrolling buttons', () => {
      beforeEach(() => detectAndQueryHelpers());
      describe('previous button', () => {
        it('should have previous button', () => {
          const buttons = parentFixture.debugElement.queryAll(
            By.css('button.previous')
          );
          expect(buttons.length).toBe(1);
        });

        it('should have previous button non-focusable', () => {
          const prevButton = parentFixture.debugElement.query(
            By.css('button.previous')
          );
          expect(prevButton.attributes['tabindex']).toBe('-1');
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
          expect(prevButton.attributes['title']).toBe(
            'carousel.scrollBackward'
          );
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

        it('should hide previous button when no scroll is needed (all items are visible in the container)', () => {
          horizontalScrollingPositionDirective.isScrollNeeded$.next(false);
          parentFixture.detectChanges();
          const prevButton = parentFixture.debugElement.query(
            By.css('button.previous')
          );
          expect(prevButton).not.toBeNull();
          expect(
            prevButton.nativeElement.classList.contains('scroll-possible')
          ).toBe(false);
        });
      });

      describe('next button', () => {
        it('should have next button', () => {
          const buttons = parentFixture.debugElement.queryAll(
            By.css('button.next')
          );
          expect(buttons.length).toBe(1);
        });

        it('should have next button non-focusable', () => {
          const nextButton = parentFixture.debugElement.query(
            By.css('button.next')
          );
          expect(nextButton.attributes['tabindex']).toBe('-1');
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

        it('should hide next button when no scroll is needed (all items are visible in the container)', () => {
          horizontalScrollingPositionDirective.isScrollNeeded$.next(false);
          parentFixture.detectChanges();
          const nextButton = parentFixture.debugElement.query(
            By.css('button.next')
          );
          expect(nextButton).not.toBeNull();
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
      });
    });

    describe('child template creation', () => {
      beforeEach(() => detectAndQueryHelpers());
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

    describe('when an item is focused in', () => {
      beforeEach(() => detectAndQueryHelpers());
      it('should scroll it into view', () => {
        const items = parentFixture.debugElement.queryAll(By.css('.item'));
        const secondItem = items[1].nativeElement as HTMLElement;
        if (!secondItem.scrollIntoView) {
          secondItem.scrollIntoView = () => {};
        }
        vi.spyOn(secondItem, 'scrollIntoView');

        secondItem.dispatchEvent(new FocusEvent('focusin'));

        expect(secondItem.scrollIntoView).toHaveBeenCalled();
      });
    });

    describe('keyboard navigation', () => {
      beforeEach(() => detectAndQueryHelpers());
      let firstChild: HTMLElement;
      let secondChild: HTMLElement;

      beforeEach(() => {
        const children = parentFixture.debugElement.queryAll(
          By.css('cx-test-child')
        );
        firstChild = children[0].nativeElement;
        secondChild = children[1].nativeElement;
      });

      describe('onItemKeyDown', () => {
        describe('on Tab key', () => {
          it('should NOT set tabindex="-1" on children (i.e. should allow for tab-navigation)', () => {
            expect(secondChild.tabIndex).toBe(0);
            firstChild.dispatchEvent(createKeyboardEvent(KEY_NAME_TAB));
            expect(secondChild.tabIndex).toBe(0);
          });
        });

        describe('on ArrowRight key', () => {
          it('should prevent default behavior', () => {
            const event = createKeyboardEvent(KEY_NAME_ARROW_RIGHT);
            vi.spyOn(event, 'preventDefault');
            firstChild.dispatchEvent(event);
            expect(event.preventDefault).toHaveBeenCalled();
          });

          it('should NOT focus the next item', () => {
            vi.spyOn(
              carouselScrollingComponent as any,
              'focusNextPrevItem'
            );
            vi.spyOn(secondChild, 'focus');

            firstChild.dispatchEvent(createKeyboardEvent(KEY_NAME_ARROW_RIGHT));

            expect(secondChild.focus).not.toHaveBeenCalled();
            expect(
              carouselScrollingComponent['focusNextPrevItem']
            ).toHaveBeenCalledWith(firstChild, 1);
          });
        });

        describe('on ArrowLeft key', () => {
          it('should prevent default behavior', () => {
            const event = createKeyboardEvent(KEY_NAME_ARROW_LEFT);
            vi.spyOn(event, 'preventDefault');
            firstChild.dispatchEvent(event);
            expect(event.preventDefault).toHaveBeenCalled();
          });

          it('should NOT focus the previous child directive', () => {
            vi.spyOn(
              carouselScrollingComponent as any,
              'focusNextPrevItem'
            );
            vi.spyOn(firstChild, 'focus');

            secondChild.dispatchEvent(createKeyboardEvent(KEY_NAME_ARROW_LEFT));

            expect(firstChild.focus).not.toHaveBeenCalled();
            expect(
              carouselScrollingComponent['focusNextPrevItem']
            ).toHaveBeenCalledWith(secondChild, -1);
          });
        });
      });
    });
  });

  describe('with [cxFocusableCarouselItem] directive on children', () => {
    let parentFixture: ComponentFixture<TestParentWithCxFocusableCarouselItemComponent>;
    let carouselScrollingComponent: CarouselScrollingComponent;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          CarouselScrollingComponent,
          TestParentWithCxFocusableCarouselItemComponent,
          TestChildComponent,
          FocusableCarouselItemDirective,
        ],
      })
        .overrideComponent(CarouselScrollingComponent, {
          remove: {
            imports: [
              TranslatePipe,
              CxDatePipe,
              HorizontalScrollingPositionDirective,
              IconComponent,
            ],
          },
          add: {
            imports: [
              MockTranslatePipe,
              MockDatePipe,
              MockHorizontalScrollingPositionDirective,
              MockCxIconComponent,
            ],
          },
        })
        .compileComponents();
    });

    beforeEach(() => {
      parentFixture = TestBed.createComponent(
        TestParentWithCxFocusableCarouselItemComponent
      );
      parentFixture.detectChanges();
      carouselScrollingComponent = parentFixture.debugElement.query(
        By.directive(CarouselScrollingComponent)
      ).componentInstance;
    });

    describe('keyboard navigation', () => {
      let firstChild: HTMLElement;
      let secondChild: HTMLElement;

      beforeEach(() => {
        const children = parentFixture.debugElement.queryAll(
          By.css('cx-test-child')
        );
        firstChild = children[0].nativeElement;
        secondChild = children[1].nativeElement;
      });

      describe('onItemKeyDown', () => {
        describe('on Tab key', () => {
          const KEY_NAME_TAB = 'Tab';

          it('should set tabindex="-1" on children with cxFocusableCarouselItem until next animation frame', async () => {
            expect(secondChild.tabIndex).toBe(0);

            firstChild.dispatchEvent(createKeyboardEvent(KEY_NAME_TAB));
            expect(firstChild.tabIndex).toBe(-1);

            await new Promise((resolve) => requestAnimationFrame(resolve));
            expect(secondChild.tabIndex).toBe(0);
          });
        });

        describe('on ArrowRight key', () => {
          it('should prevent default behavior', () => {
            const event = createKeyboardEvent(KEY_NAME_ARROW_RIGHT);
            vi.spyOn(event, 'preventDefault');
            firstChild.dispatchEvent(event);
            expect(event.preventDefault).toHaveBeenCalled();
          });

          it('should focus the next item with cxFocusableCarouselItem directive', () => {
            vi.spyOn(
              carouselScrollingComponent as any,
              'focusNextPrevItem'
            );

            vi.spyOn(secondChild, 'focus');
            firstChild.dispatchEvent(createKeyboardEvent(KEY_NAME_ARROW_RIGHT));

            expect(secondChild.focus).toHaveBeenCalled();
            expect(
              carouselScrollingComponent['focusNextPrevItem']
            ).toHaveBeenCalledWith(firstChild, 1);
          });
        });

        describe('on ArrowLeft key', () => {
          it('should prevent default behavior', () => {
            const event = createKeyboardEvent(KEY_NAME_ARROW_LEFT);
            vi.spyOn(event, 'preventDefault');
            firstChild.dispatchEvent(event);
            expect(event.preventDefault).toHaveBeenCalled();
          });

          it('should focus the previous child with cxFocusableCarouselItem directive', () => {
            vi.spyOn(
              carouselScrollingComponent as any,
              'focusNextPrevItem'
            );

            vi.spyOn(firstChild, 'focus');
            secondChild.dispatchEvent(createKeyboardEvent(KEY_NAME_ARROW_LEFT));

            expect(firstChild.focus).toHaveBeenCalled();
            expect(
              carouselScrollingComponent['focusNextPrevItem']
            ).toHaveBeenCalledWith(secondChild, -1);
          });
        });

        describe('on other keys', () => {
          it('should not prevent default behavior', () => {
            const event = createKeyboardEvent(KEY_NAME_ENTER);
            vi.spyOn(event, 'preventDefault');
            firstChild.dispatchEvent(event);
            expect(event.preventDefault).not.toHaveBeenCalled();
          });

          it('should not call focusNextPrevItem', () => {
            vi.spyOn(
              carouselScrollingComponent as any,
              'focusNextPrevItem'
            );

            firstChild.dispatchEvent(createKeyboardEvent(KEY_NAME_ENTER));

            expect(
              carouselScrollingComponent['focusNextPrevItem']
            ).not.toHaveBeenCalled();
          });
        });
      });
    });
  });

  describe('without child template', () => {
    let parentFixture: ComponentFixture<TestParentWithoutChildTemplateComponent>;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          CarouselScrollingComponent,
          TestParentWithoutChildTemplateComponent,
        ],
      })
        .overrideComponent(CarouselScrollingComponent, {
          remove: {
            imports: [
              TranslatePipe,
              CxDatePipe,
              HorizontalScrollingPositionDirective,
              IconComponent,
            ],
          },
          add: {
            imports: [
              MockTranslatePipe,
              MockDatePipe,
              MockHorizontalScrollingPositionDirective,
              MockCxIconComponent,
            ],
          },
        })
        .compileComponents();
    });

    beforeEach(() => {
      parentFixture = TestBed.createComponent(
        TestParentWithoutChildTemplateComponent
      );
    });

    it('should log an error when no template is provided', () => {
      const logger = TestBed.inject(LoggerService);
      vi.spyOn(logger, 'error');
      parentFixture.detectChanges();
      expect(logger.error).toHaveBeenCalledWith(
        'No template reference provided to render the carousel items for the `cx-carousel-scrolling`'
      );
    });
  });

  describe('without trackByFn input', () => {
    let parentFixture: ComponentFixture<TestParentWithoutTrackByComponent>;
    let carouselScrollingComponent: CarouselScrollingComponent;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        imports: [
          I18nTestingModule,
          CarouselScrollingComponent,
          TestParentWithoutTrackByComponent,
          TestChildComponent,
        ],
      })
        .overrideComponent(CarouselScrollingComponent, {
          remove: {
            imports: [
              TranslatePipe,
              CxDatePipe,
              HorizontalScrollingPositionDirective,
              IconComponent,
            ],
          },
          add: {
            imports: [
              MockTranslatePipe,
              MockDatePipe,
              MockHorizontalScrollingPositionDirective,
              MockCxIconComponent,
            ],
          },
        })
        .compileComponents();
    });

    beforeEach(() => {
      parentFixture = TestBed.createComponent(
        TestParentWithoutTrackByComponent
      );
      parentFixture.detectChanges();

      carouselScrollingComponent = parentFixture.debugElement.query(
        By.directive(CarouselScrollingComponent)
      ).componentInstance;
    });

    it('should use default trackByFn', () => {
      const item = { id: '123' };
      expect(carouselScrollingComponent.trackByFn(999, item)).toBe(item);
    });
  });
});
