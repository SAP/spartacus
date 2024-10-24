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
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { ProductListItemContextSource } from '../model/product-list-item-context-source.model';
import { ProductListItemContext } from '../model/product-list-item-context.model';
import { ProductListItemComponent } from './product-list-item.component';
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
}

@Component({
  selector: 'cx-media',
  template: 'mock picture component',
})
class MockPictureComponent {
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

describe('ProductListItemComponent in product-list', () => {
  let component: ProductListItemComponent;
  let componentInjector: Injector;
  let fixture: ComponentFixture<ProductListItemComponent>;

  const mockProduct = {
    name: 'Test product',
    nameHtml: 'Test product',
    summary: 'Test summary',
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule, OutletModule],
      declarations: [
        ProductListItemComponent,
        MockPictureComponent,
        MockAddToCartComponent,
        MockStarRatingComponent,
        MockUrlPipe,
        MockCxIconComponent,
        MockFeatureDirective,
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
      .overrideComponent(ProductListItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    console.log('Starting ProductListItemComponent in product-list test');
    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;
    componentInjector = fixture.debugElement.injector;

    component.product = mockProduct;

    component.ngOnChanges({});
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

  it('should display product summary', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-summary')
        .textContent
    ).toContain(component.product.summary);
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
    expect(fixture.debugElement.nativeElement.innerText).toContain(
      'productDetails.noReviews'
    );
  });

  it('should have defined instance of list item context', () => {
    expect(component['productListItemContextSource']).toBeDefined();
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
