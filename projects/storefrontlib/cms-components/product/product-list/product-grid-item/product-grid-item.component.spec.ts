import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Injector,
  Input,
  Pipe,
  PipeTransform,
  SimpleChange,
} from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { OutletDirective, OutletModule } from '@spartacus/storefront';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
import { ProductListItemContextSource } from '../model/product-list-item-context-source.model';
import { ProductListItemContext } from '../model/product-list-item-context.model';
import { ProductGridItemComponent } from './product-grid-item.component';

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
class MockAddToCartComponent {
  @Input() product;
  @Input() showQuantity;
}

@Component({
  selector: 'cx-star-rating',
  template: '*****',
})
class MockStarRatingComponent {
  @Input() rating;
  @Input() disabled;
  @Input() steps;
}

@Component({
  selector: 'cx-media',
  template: 'mock picture component',
})
class MockMediaComponent {
  @Input() container;
  @Input() alt;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockRoutingService {}
class MockProductService {}

@Directive({
  selector: '[cxOutlet]',
})
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
}
describe('ProductGridItemComponent in product-list', () => {
  let component: ProductGridItemComponent;
  let componentInjector: Injector;
  let fixture: ComponentFixture<ProductGridItemComponent>;

  const mockProduct = {
    name: 'Test product',
    nameHtml: 'Test product',
    code: '1',
    averageRating: 4.5,
    stock: {
      stockLevelStatus: 'inStock',
    },
    price: {
      formattedValue: '$100,00',
    },
    images: {
      PRIMARY: {},
    },
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, I18nTestingModule, OutletModule],
        declarations: [
          ProductGridItemComponent,
          MockMediaComponent,
          MockAddToCartComponent,
          MockStarRatingComponent,
          MockUrlPipe,
          MockCxIconComponent,
          MockFeatureLevelDirective,
          MockOutletDirective,
        ],
        providers: [
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: ProductService,
            useClass: MockProductService,
          },
        ],
      })
        .overrideComponent(ProductGridItemComponent, {
          set: { changeDetection: ChangeDetectionStrategy.Default },
        })
        .compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridItemComponent);
    component = fixture.componentInstance;
    componentInjector = fixture.debugElement.injector;

    component.product = mockProduct;

    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-name')
        .textContent
    ).toContain(component.product.name);
  });

  it('should display product formatted price', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-price')
        .textContent
    ).toContain(component.product.price.formattedValue);
  });

  it('should display product image', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-media')
    ).not.toBeNull();
  });

  it('should display raiting component', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-star-rating')
    ).not.toBeNull();
  });

  it('should not display rating component when rating is unavailable', () => {
    component.product.averageRating = undefined;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-star-rating')
    ).toBeNull();
  });

  it('should display noReviews when rating is unavailable', () => {
    component.product.averageRating = undefined;
    fixture.detectChanges();
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-rating')
        .textContent
    ).toContain('productDetails.noReviews');
  });

  it('should display add to cart component', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-add-to-cart')
    ).not.toBeNull();
  });

  it('should not display add to cart component when product is out of stock', () => {
    component.product.stock.stockLevelStatus = 'outOfStock';
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector('cx-add-to-cart')
    ).toBeNull();
  });

  it('should provide ProductListItemContextSource', () => {
    expect(componentInjector.get(ProductListItemContextSource)).toBeTruthy();
  });

  it('should provide ProductListItemContext', () => {
    expect(componentInjector.get(ProductListItemContext)).toBe(
      componentInjector.get(ProductListItemContextSource)
    );
  });

  it('should push changes of input"product" to context', () => {
    const contextSource: ProductListItemContextSource = componentInjector.get(
      ProductListItemContextSource
    );
    spyOn(contextSource.product$, 'next');
    component.product = mockProduct;
    component.ngOnChanges({
      product: { currentValue: component.product } as SimpleChange,
    });
    expect(contextSource.product$.next).toHaveBeenCalledWith(mockProduct);
  });
});
