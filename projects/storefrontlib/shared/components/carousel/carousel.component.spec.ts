import { Component, Input, TemplateRef } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, LoggerService, Product } from '@spartacus/core';
import { ICON_TYPE } from '@spartacus/storefront';
import { EMPTY, Observable, of } from 'rxjs';
import { MockFeatureDirective } from '../../test/mock-feature-directive';
import { CarouselComponent } from './carousel.component';
import { CarouselService } from './carousel.service';

class MockCarouselService {
  getItemsPerSlide(
    _nativeElement: HTMLElement,
    _itemWidth: number
  ): Observable<number> {
    return EMPTY;
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Component({
  template: ` <div id="templateEl"></div> `,
})
class MockTemplateComponent {}

function checkIndicatorAriaLabels(
  fixture: ComponentFixture<CarouselComponent>
) {
  const els = fixture.debugElement.queryAll(By.css('div.indicators button'));
  let currentSlide = 1;
  els.forEach((el) => {
    expect(el.nativeNode.ariaLabel).toContain(currentSlide);
    currentSlide++;
  });
}

describe('Carousel Component', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let service: CarouselService;

  let templateFixture: ComponentFixture<MockTemplateComponent>;
  let template: TemplateRef<any>;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        CarouselComponent,
        MockCxIconComponent,
        MockTemplateComponent,
        MockFeatureDirective,
      ],
      providers: [{ provide: CarouselService, useClass: MockCarouselService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(CarouselService);

    templateFixture = TestBed.createComponent(MockTemplateComponent);
    const compiled = templateFixture.debugElement.nativeElement;
    template = compiled.querySelector('#templateEl');
  });

  describe('component tests', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should log an error when there is no render template given', () => {
      const logger = TestBed.inject(LoggerService);
      spyOn(logger, 'error');
      component.ngOnInit();
      expect(logger.error).toHaveBeenCalledWith(
        'No template reference provided to render the carousel items for the `cx-carousel`'
      );
    });

    it('should have a size of 4 items per slide', () => {
      spyOn(service, 'getItemsPerSlide').and.returnValue(of(4));
      component.template = template;
      component.ngOnInit();
      let results: number;
      component.ngOnChanges();
      component.size$.subscribe((value) => (results = value)).unsubscribe();

      expect(results).toEqual(4);
    });

    it('should default to first activeSlide', () => {
      spyOn(service, 'getItemsPerSlide').and.returnValue(of(4));
      component.template = template;
      component.ngOnInit();
      component.ngOnChanges();
      component.size$.subscribe().unsubscribe();
      expect(component.activeSlide).toEqual(0);
    });

    it('should default to 300px itemWidth', () => {
      expect(component.itemWidth).toEqual('300px');
    });

    it('should default hideIndicators to false', () => {
      expect(component.hideIndicators).toEqual(false);
    });

    it('indicatorIcon should default to "CIRCLE"', () => {
      expect(component.indicatorIcon).toEqual('CIRCLE');
    });

    it('indicatorIcon should default to "CARET_LEFT"', () => {
      expect(component.previousIcon).toEqual('CARET_LEFT');
    });

    it('indicatorIcon should default to "CARET_RIGHT"', () => {
      expect(component.nextIcon).toEqual('CARET_RIGHT');
    });
  });

  describe('(UI tests)', () => {
    beforeEach(() => {
      component.template = template;
    });
    describe('carousel title', () => {
      beforeEach(() => {
        spyOn(service, 'getItemsPerSlide').and.returnValue(of(1));
        component.items = [EMPTY];
      });

      it('should have h2 with title', () => {
        component.title = 'test carousel with title';
        component.ngOnInit();
        component.ngOnChanges();
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('h2'));
        expect(el.nativeElement).toBeTruthy();

        expect((<HTMLElement>el.nativeElement).innerText).toEqual(
          'test carousel with title'
        );
      });

      it('should not have a h3', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('h3'));
        expect(el).toBeNull();
      });
    });

    describe('carousel buttons', () => {
      beforeEach(() => {
        spyOn(service, 'getItemsPerSlide').and.returnValue(of(4));
        component.items = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
        component.ngOnInit();
        component.ngOnChanges();
        fixture.detectChanges();
      });

      it('should have previous button', () => {
        const el = fixture.debugElement.query(By.css('button.previous'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have disabled previous button on slide 1', () => {
        const el = fixture.debugElement.query(
          By.css('button.previous[aria-disabled="true"]')
        );
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have enabled next button on slide 1', () => {
        const el = fixture.debugElement.query(By.css('button.next[disabled]'));
        expect(el).toBeNull();
      });

      it('should have disabled state after clicking on next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        (<HTMLElement>el.nativeElement).click();
        fixture.detectChanges();
        expect(el.nativeElement.getAttribute('aria-disabled')).toBe('true');
      });

      it('should enabled previous button after clicking on next button', () => {
        const prevButton = fixture.debugElement.query(
          By.css('button.previous')
        );
        expect(prevButton.nativeElement.getAttribute('aria-disabled')).toBe(
          'true'
        );

        const nextButton = fixture.debugElement.query(By.css('button.next'));
        (<HTMLElement>nextButton.nativeElement).click();

        fixture.detectChanges();
        expect(prevButton.nativeElement.getAttribute('aria-disabled')).toBe(
          'false'
        );
      });

      it('should toggle disabled state of previous/next buttons after navigating to next slide', () => {
        const prevButton = fixture.debugElement.query(
          By.css('button.previous')
        );
        const nextButton = fixture.debugElement.query(By.css('button.next'));
        (<HTMLElement>nextButton.nativeElement).click();

        fixture.detectChanges();
        expect(prevButton.nativeElement.getAttribute('aria-disabled')).toBe(
          'false'
        );
        expect(nextButton.nativeElement.getAttribute('aria-disabled')).toBe(
          'true'
        );
      });

      it('should have 2 indicators', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button')
        );
        expect(el.length).toEqual(2);
      });

      it('should have disabled indicator', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button')
        );
        expect(el[0].nativeElement.getAttribute('aria-disabled')).toBe('true');
      });

      it('should have enabled indicator', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button')
        );
        expect(el[1].nativeElement.disabled).toEqual(false);
      });

      it('should toggle disabled state after navigating with the indicators', () => {
        const indicators = fixture.debugElement.queryAll(
          By.css('div.indicators button')
        );

        expect(indicators[0].nativeElement.getAttribute('aria-disabled')).toBe(
          'true'
        );
        expect(indicators[1].nativeElement.getAttribute('aria-disabled')).toBe(
          'false'
        );

        indicators[1].nativeElement.click();

        fixture.detectChanges();
        expect(indicators[0].nativeElement.getAttribute('aria-disabled')).toBe(
          'false'
        );
        expect(indicators[1].nativeElement.getAttribute('aria-disabled')).toBe(
          'true'
        );
      });
    });

    describe('carousel with 5 items divided by 2 slides', () => {
      beforeEach(() => {
        spyOn(service, 'getItemsPerSlide').and.returnValue(of(4));
        component.items = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
        component.ngOnInit();
        component.ngOnChanges();
        fixture.detectChanges();
      });

      it('should have previous button', () => {
        const el = fixture.debugElement.query(By.css('button.previous'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have a size-4 class', () => {
        const el = fixture.debugElement.query(
          By.css('div.carousel-panel.size-4')
        );
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have 2 indicators', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button')
        );
        expect(el.length).toEqual(2);
      });

      it('should have the correct indicator labels', () => {
        checkIndicatorAriaLabels(fixture);
      });
    });

    describe('carousel with 7 items divided by 3 slides', () => {
      beforeEach(() => {
        spyOn(service, 'getItemsPerSlide').and.returnValue(of(3));
        component.title = 'test carousel with title';
        component.items = [
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
          EMPTY,
        ];
        component.ngOnInit();
        component.ngOnChanges();
        fixture.detectChanges();
      });

      it('should have previous button', () => {
        const el = fixture.debugElement.query(By.css('button.previous'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have a size-3 class', () => {
        const el = fixture.debugElement.query(
          By.css('div.carousel-panel.size-3')
        );
        expect(el.nativeElement).toBeTruthy();
      });

      it('should have 3 indicators', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button')
        );
        expect(el.length).toEqual(3);
      });

      it('should have the correct indicator labels', () => {
        checkIndicatorAriaLabels(fixture);
      });
    });

    describe('carousel with 3 items divided by 1 slide', () => {
      beforeEach(() => {
        spyOn(service, 'getItemsPerSlide').and.returnValue(of(3));
        component.title = 'test carousel with title';
        component.items = [EMPTY, EMPTY, EMPTY];
        component.ngOnInit();
        component.ngOnChanges();
        fixture.detectChanges();
      });

      it('should not have a previous button', () => {
        const el = fixture.debugElement.query(By.css('button.previous'));
        expect(el).toBeNull();
      });

      it('should not have a next button', () => {
        const el = fixture.debugElement.query(By.css('button.next'));
        expect(el).toBeNull();
      });

      it('should have no indicators', () => {
        const el = fixture.debugElement.queryAll(
          By.css('div.indicators button')
        );
        expect(el.length).toEqual(0);
      });

      it('should have a size-3 class', () => {
        const el = fixture.debugElement.query(
          By.css('div.carousel-panel.size-3')
        );
        expect(el.nativeElement).toBeTruthy();
      });
    });

    describe('empty carousel', () => {
      beforeEach(() => {
        spyOn(service, 'getItemsPerSlide').and.returnValue(of(1));
        component.items = [];
      });

      it('should not render the carousel', () => {
        component.ngOnInit();
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('div.carousel-panel'));
        expect(el).toBeNull();
      });
    });

    describe('new input items', () => {
      const mockProduct: Product = {
        name: 'mockProduct',
        code: 'code1',
        stock: { stockLevelStatus: 'inStock', stockLevel: 20 },
      };

      it('should reset slider', () => {
        component.activeSlide = 1;
        const mockProductArr: Observable<Product>[] = [of(mockProduct)];
        component.setItems = mockProductArr;
        expect(component.activeSlide).toEqual(0);
      });
    });
  });

  describe('getSlideNumber', () => {
    it('should return the 3rd slide', () => {
      expect(component.getSlideNumber(1, 2)).toBe(3);
    });

    it('should return the 1st slide', () => {
      expect(component.getSlideNumber(4, 3)).toBe(1);
    });

    it('should return the 6th slide', () => {
      expect(component.getSlideNumber(5, 27)).toBe(6);
    });
  });

  describe('keyboard navigation', () => {
    let nativeElement: HTMLElement;
    const sizeMock = 4;
    beforeEach(() => {
      component.template = template;
      nativeElement = fixture.nativeElement;

      for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.setAttribute('cxFocusableCarouselItem', '');
        element.addEventListener(
          'keydown',
          (e) => component.onItemKeydown(e, sizeMock),
          { once: true }
        );
        nativeElement.appendChild(element);
      }
      fixture.detectChanges();
    });

    describe('onItemKeydown', () => {
      it('should call focusNextPrevItem with +1 when ArrowRight is pressed', () => {
        spyOn(<any>component, 'focusNextPrevItem');
        const keyboardEvent = new KeyboardEvent('keydown', {
          key: 'ArrowRight',
        });

        const targetElement = nativeElement.querySelector(
          '[cxFocusableCarouselItem]'
        );
        targetElement?.dispatchEvent(keyboardEvent);

        expect(component['focusNextPrevItem']).toHaveBeenCalledWith(
          targetElement,
          1,
          sizeMock
        );
      });

      it('should call focusNextPrevItem with -1 when ArrowLeft is pressed', () => {
        spyOn(<any>component, 'focusNextPrevItem');
        const keyboardEvent = new KeyboardEvent('keydown', {
          key: 'ArrowLeft',
        });

        const targetElement = nativeElement.querySelector(
          '[cxFocusableCarouselItem]'
        );
        targetElement?.dispatchEvent(keyboardEvent);

        expect(component['focusNextPrevItem']).toHaveBeenCalledWith(
          targetElement,
          -1,
          sizeMock
        );
      });

      it('should not handle keydown events other than ArrowRight or ArrowLeft', () => {
        spyOn(<any>component, 'focusNextPrevItem');
        const keyboardEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });

        const targetElement = nativeElement.querySelector(
          '[cxFocusableCarouselItem]'
        );
        targetElement?.dispatchEvent(keyboardEvent);

        expect(component['focusNextPrevItem']).not.toHaveBeenCalled();
      });
    });

    describe('focusNextPrevItem', () => {
      let focusableElements: NodeListOf<HTMLElement>;
      beforeEach(() => {
        nativeElement = fixture.nativeElement;
        component.activeSlide = 0;
        fixture.detectChanges();
        focusableElements = nativeElement.querySelectorAll(
          '[cxFocusableCarouselItem]'
        );
      });

      it('should focus the next item within the current slide', () => {
        const initialIndex = 0;
        const targetIndex = 1;
        spyOn(focusableElements[targetIndex], 'focus');

        component['focusNextPrevItem'](
          focusableElements[initialIndex],
          1,
          sizeMock
        );

        expect(focusableElements[targetIndex].focus).toHaveBeenCalled();
        expect(component.activeSlide).toBe(0);
      });

      it('should update the active slide and focus next item when crossing boundary', () => {
        const initialIndex = 3;
        const targetIndex = 4;

        spyOn(focusableElements[targetIndex], 'addEventListener');

        component['focusNextPrevItem'](
          focusableElements[initialIndex],
          1,
          sizeMock
        );

        expect(
          focusableElements[targetIndex].addEventListener
        ).toHaveBeenCalledWith('transitionend', jasmine.any(Function), {
          once: true,
        });
        expect(component.activeSlide).toBe(4);
      });

      it('should handle transitionend event to focus the target element', (done) => {
        const initialIndex = 3;
        const targetIndex = 4;
        const focusableElements = nativeElement.querySelectorAll(
          '[cxFocusableCarouselItem]'
        );
        const targetElement = focusableElements[targetIndex] as HTMLElement;
        spyOn(targetElement, 'focus');

        component['focusNextPrevItem'](
          focusableElements[initialIndex],
          1,
          sizeMock
        );

        const event = new Event('transitionend');
        targetElement.dispatchEvent(event);

        setTimeout(() => {
          expect(targetElement.focus).toHaveBeenCalled();
          done();
        }, 100);
      });

      it('should not change focus if attempting to navigate out of bounds', () => {
        const initialIndex = 0;
        spyOn(focusableElements[initialIndex], 'focus');

        component['focusNextPrevItem'](
          focusableElements[initialIndex],
          -1,
          sizeMock
        );

        expect(focusableElements[initialIndex].focus).not.toHaveBeenCalled();
        expect(component.activeSlide).toBe(0);
      });
    });

    describe('skipTabForCarouselItems', () => {
      let carouselItems: HTMLElement[] = [];
      beforeEach(() => {
        component.template = template;
        nativeElement = fixture.nativeElement;

        for (let i = 0; i < 10; i++) {
          const element = document.createElement('div');
          element.setAttribute('cxFocusableCarouselItem', '');
          nativeElement.appendChild(element);
          carouselItems.push(element);
        }
        fixture.detectChanges();
      });

      afterEach(() => {
        carouselItems.forEach((item) => nativeElement.removeChild(item));
        carouselItems = [];
      });

      it('should set tabIndex to -1 for all carousel items', () => {
        component['skipTabForCarouselItems']();
        carouselItems.forEach((item) => {
          expect(item.tabIndex).toBe(-1);
        });
      });

      it('should restore tabIndex to 0 after a short delay', fakeAsync(() => {
        component['skipTabForCarouselItems']();

        tick(100);

        carouselItems.forEach((item) => {
          expect(item.tabIndex).toBe(0);
        });
      }));
    });
  });
});
