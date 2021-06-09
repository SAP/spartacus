import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../current-product.service';
import { ProductIntroComponent } from './product-intro.component';

@Component({
  selector: 'cx-star-rating',
  template: '',
})
class MockStarRatingComponent {
  @Input() rating;
  @Input() disabled;
}

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of();
  }
}

describe('ProductIntroComponent in product', () => {
  let productIntroComponent: ProductIntroComponent;
  let fixture: ComponentFixture<ProductIntroComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [ProductIntroComponent, MockStarRatingComponent],
        providers: [
          {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductIntroComponent);
    productIntroComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(productIntroComponent).toBeTruthy();
  });

  describe('clickTabIfInactive to click tabs indicated as inactive', () => {
    it('should click tab with no classes', () => {
      const tabElement: HTMLElement = document.createElement('div');
      spyOn(tabElement, 'click');
      (productIntroComponent as any).clickTabIfInactive(tabElement);
      expect(tabElement.click).toHaveBeenCalled();
    });

    it('should not click tab with active class', () => {
      const tabElement: HTMLElement = document.createElement('div');
      tabElement.classList.add('active');
      spyOn(tabElement, 'click');
      (productIntroComponent as any).clickTabIfInactive(tabElement);
      expect(tabElement.click).not.toHaveBeenCalled();
    });

    it('should click tab with toggled classes', () => {
      const tabElement: HTMLElement = document.createElement('div');
      tabElement.classList.add('toggled');
      spyOn(tabElement, 'click');
      (productIntroComponent as any).clickTabIfInactive(tabElement);
      expect(tabElement.click).toHaveBeenCalled();
    });

    it('should click tab with active and toggled classes', () => {
      const tab: HTMLElement = document.createElement('div');
      tab.classList.add('active');
      tab.classList.add('toggled');
      spyOn(tab, 'click');
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

      tab1.innerText = 'Tab 1';
      tab2.innerText = 'Tab 2';
      tab3.innerText = 'Tab 3';

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
    it('should display rating component when rating is available', () => {
      productIntroComponent.product$ = of<Product>({ averageRating: 4.5 });
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('cx-star-rating')
      ).not.toBeNull();
    });

    it('should not display rating component when rating is unavailable', () => {
      productIntroComponent.product$ = of<Product>({
        averageRating: undefined,
      });
      fixture.detectChanges();
      expect(
        fixture.debugElement.nativeElement.querySelector('cx-star-rating')
      ).toBeNull();
    });

    it('should display noReviews when rating is unavailable', () => {
      productIntroComponent.product$ = of<Product>({
        averageRating: undefined,
      });
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).toContain(
        'productDetails.noReviews'
      );
    });

    it('should not display Show Reviews when no reviews available', () => {
      productIntroComponent.product$ = of<Product>({
        averageRating: undefined,
      });
      productIntroComponent.ngAfterContentChecked = () => {
        productIntroComponent.reviewsTabAvailable.next(true);
      };
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.innerText).not.toContain(
        'productSummary.showReviews'
      );
    });
  });
});
