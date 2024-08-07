import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductMultiDimensionalPriceRangeComponent } from './product-multi-dimensional-price-range.component';
import { ProductListItemContext } from '@spartacus/storefront';
import { of } from 'rxjs';
import { I18nTestingModule, Product } from '@spartacus/core';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

describe('ProductMultiDimensionalPriceRangeComponent', () => {
  let component: ProductMultiDimensionalPriceRangeComponent;
  let fixture: ComponentFixture<ProductMultiDimensionalPriceRangeComponent>;

  beforeEach(async () => {
    const mockContext = {
      product$: of(),
    };

    await TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ProductMultiDimensionalPriceRangeComponent],
      providers: [{ provide: ProductListItemContext, useValue: mockContext }],
    })
      .overrideComponent(ProductMultiDimensionalPriceRangeComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(
      ProductMultiDimensionalPriceRangeComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getProductPrice', () => {
    it('should return the formatted price range for a multidimensional product with price range', () => {
      const product: Product = {
        multidimensional: true,
        priceRange: {
          minPrice: { formattedValue: '$100' },
          maxPrice: { formattedValue: '$200' },
        },
      };

      const result = component.getProductPrice(product);
      expect(result).toBe('$100 - $200');
    });

    it('should return the formatted price for a non-multidimensional product with a single price', () => {
      const product: Product = {
        multidimensional: false,
        price: { formattedValue: '$150' },
      };

      const result = component.getProductPrice(product);
      expect(result).toBe('$150');
    });

    it('should return 0 for a product without a price', () => {
      const product: Product = {
        multidimensional: false,
      };

      const result = component.getProductPrice(product);
      expect(result).toBe(0);
    });
  });

  describe('Template', () => {
    it('should display the price range if product is multidimensional with price range', () => {
      const product: Product = {
        multidimensional: true,
        priceRange: {
          minPrice: { formattedValue: '$100' },
          maxPrice: { formattedValue: '$200' },
        },
      };
      (component as any).product$ = of(product);
      fixture.detectChanges();

      const priceElement = fixture.debugElement.query(
        By.css('.cx-product-price')
      ).nativeElement;
      expect(priceElement.textContent.trim()).toBe('$100 - $200');
    });

    it('should display the single price if product is non-multidimensional', () => {
      const product: Product = {
        multidimensional: false,
        price: { formattedValue: '$150' },
      };
      (component as any).product$ = of(product);
      fixture.detectChanges();

      const priceElement = fixture.debugElement.query(
        By.css('.cx-product-price')
      ).nativeElement;
      expect(priceElement.textContent.trim()).toBe('$150');
    });

    it('should not display price if product does not have a price', () => {
      const product: Product = {
        multidimensional: false,
      };
      (component as any).product$ = of(product);
      fixture.detectChanges();

      const priceElement = fixture.debugElement.query(
        By.css('.cx-product-price')
      )?.nativeElement;
      expect(priceElement).toBe(undefined);
    });
  });
});
