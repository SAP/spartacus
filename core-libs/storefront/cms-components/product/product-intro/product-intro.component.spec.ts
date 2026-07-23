import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  EventService,
  FeatureDirective,
  MockTranslatePipe,
  Product,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import {
  ComponentCreateEvent,
  StarRatingComponent,
} from '@spartacus/storefront';
import { MockFeatureDirective } from '../../../shared/test/mock-feature-directive';
import { EMPTY, Observable, of } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ProductIntroComponent } from './product-intro.component';

@Component({
  selector: 'cx-star-rating',
  template: '',
})
class MockStarRatingComponent {
  @Input() rating: number;
  @Input() disabled: boolean;
}

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return EMPTY;
  }
}

class MockTranslationService {
  translate() {}
}

class MockEventService {
  get() {
    return EMPTY;
  }
}

const reviewsLabel = 'Reviews';

describe('ProductIntroComponent in product', () => {
  let productIntroComponent: ProductIntroComponent;
  let fixture: ComponentFixture<ProductIntroComponent>;
  let translationService: TranslationService;
  let eventService: EventService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ProductIntroComponent],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
        {
          provide: TranslationService,
          useClass: MockTranslationService,
        },
        {
          provide: EventService,
          useClass: MockEventService,
        },
      ],
    })
      .overrideComponent(ProductIntroComponent, {
        remove: {
          imports: [StarRatingComponent, FeatureDirective, TranslatePipe],
        },
        add: {
          imports: [
            MockStarRatingComponent,
            MockFeatureDirective,
            MockTranslatePipe,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    translationService = TestBed.inject(TranslationService);
    vi.spyOn(translationService, 'translate').mockReturnValue(of(reviewsLabel));

    eventService = TestBed.inject(EventService);

    fixture = TestBed.createComponent(ProductIntroComponent);
    productIntroComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(productIntroComponent).toBeTruthy();
  });

  describe('clickTabIfInactive to click tabs indicated as inactive', () => {
    it('should click tab with no classes', () => {
      const tabElement: HTMLElement = document.createElement('div');
      vi.spyOn(tabElement, 'click');
      (productIntroComponent as any).clickTabIfInactive(tabElement);
      expect(tabElement.click).toHaveBeenCalled();
    });

    it('should not click tab with active class', () => {
      const tabElement: HTMLElement = document.createElement('div');
      tabElement.classList.add('active');
      vi.spyOn(tabElement, 'click');
      (productIntroComponent as any).clickTabIfInactive(tabElement);
      expect(tabElement.click).not.toHaveBeenCalled();
    });

    it('should click tab with toggled classes', () => {
      const tabElement: HTMLElement = document.createElement('div');
      tabElement.classList.add('toggled');
      vi.spyOn(tabElement, 'click');
      (productIntroComponent as any).clickTabIfInactive(tabElement);
      expect(tabElement.click).toHaveBeenCalled();
    });

    it('should click tab with active and toggled classes', () => {
      const tab: HTMLElement = document.createElement('div');
      tab.classList.add('active');
      tab.classList.add('toggled');
      vi.spyOn(tab, 'click');
      (productIntroComponent as any).clickTabIfInactive(tab);
      expect(tab.click).toHaveBeenCalled();
    });
  });

  describe('getTabByLabel to get tab from tabs component', () => {
    it('should return correct tab', () => {
      const tabsComponent: HTMLElement = document.createElement('div');
      const tab1: HTMLElement = document.createElement('button');
      const tab2: HTMLElement = document.createElement('button');
      const tab3: HTMLElement = document.createElement('button');

      tab1.textContent = 'Tab 1';
      tab2.textContent = 'Tab 2';
      tab3.textContent = 'Tab 3';

      tabsComponent.appendChild(tab1);
      tabsComponent.appendChild(tab2);
      tabsComponent.appendChild(tab3);

      const result = (productIntroComponent as any).getTabByLabel(
        'Tab 2',
        tabsComponent
      );

      expect(result).toBe(tab2);
    });
  });

  describe('Product rating', () => {
    const tabsComponent: HTMLElement = document.createElement(
      'cx-tab-paragraph-container'
    );

    beforeEach(() => {
      productIntroComponent['getTabsComponent'] = () => tabsComponent;
    });

    it('should display rating component when rating is available', () => {
      productIntroComponent.product$ = of({ averageRating: 4.5 } as Product);
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('cx-star-rating')
      ).not.toBeNull();
    });

    it('should not display rating component when rating is unavailable', () => {
      productIntroComponent.product$ = of({
        averageRating: undefined,
      } as Product);
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('cx-star-rating')
      ).toBeNull();
    });

    it('should display noReviews when rating is unavailable', () => {
      productIntroComponent.product$ = of({
        averageRating: undefined,
      } as Product);
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.textContent).toContain(
        'productDetails.noReviews'
      );
    });

    it('should not display Show Reviews when no average rating', () => {
      productIntroComponent.product$ = of({
        averageRating: undefined,
      } as Product);
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.textContent).not.toContain(
        'productSummary.showReviews'
      );
    });

    it('should display Show Reviews when the reviews component is available', () => {
      const event = new ComponentCreateEvent();
      event.id = 'ProductReviewsTabComponent';

      vi.spyOn(eventService, 'get')
        .mockReturnValueOnce(of(event))
        .mockReturnValueOnce(EMPTY);

      fixture = TestBed.createComponent(ProductIntroComponent);
      productIntroComponent = fixture.componentInstance;

      productIntroComponent.product$ = of({
        averageRating: 5,
      } as Product);
      productIntroComponent['getReviewsComponent'] = () => ({}) as HTMLElement;

      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.textContent).toContain(
        'productSummary.showReviews'
      );
    });

    it('should display Show Reviews when reviews component has been created', () => {
      const event = new ComponentCreateEvent();
      event.id = 'ProductReviewsTabComponent';

      vi.spyOn(eventService, 'get')
        .mockReturnValueOnce(of(event))
        .mockReturnValueOnce(EMPTY);

      fixture = TestBed.createComponent(ProductIntroComponent);
      productIntroComponent = fixture.componentInstance;

      productIntroComponent.product$ = of({
        averageRating: 5,
      } as Product);
      productIntroComponent['getReviewsComponent'] = () => null;

      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.textContent).toContain(
        'productSummary.showReviews'
      );
    });

    it('should scroll to Reviews tab and set focus on Show Reviews click', async () => {
      const tab1: HTMLElement = document.createElement('button');
      const reviewsTab: HTMLElement = document.createElement('button');

      tab1.textContent = 'Tab 1';
      reviewsTab.textContent = reviewsLabel;

      tabsComponent.appendChild(tab1);
      tabsComponent.appendChild(reviewsTab);

      productIntroComponent.product$ = of({
        averageRating: 4.5,
      } as Product);

      vi.spyOn(reviewsTab, 'focus');
      HTMLElement.prototype.scrollIntoView = vi.fn();
      vi.spyOn(reviewsTab, 'scrollIntoView').mockImplementation(() => {});

      fixture.detectChanges();

      productIntroComponent.showReviews();

      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(reviewsTab.focus).toHaveBeenCalled();
      expect(reviewsTab.scrollIntoView).toHaveBeenCalled();
    });
  });
});
