import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { MockFeatureLevelDirective } from '../../../../shared/test/mock-feature-level-directive';
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

@Component({
  selector: 'cx-variant-style-icons',
  template: 'test',
})
class MockStyleIconsComponent {
  @Input() variants: any[];
}

class MockRoutingService {}
class MockProductService {}

describe('ProductGridItemComponent in product-list', () => {
  let component: ProductGridItemComponent;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        ProductGridItemComponent,
        MockMediaComponent,
        MockAddToCartComponent,
        MockStarRatingComponent,
        MockUrlPipe,
        MockCxIconComponent,
        MockStyleIconsComponent,
        MockFeatureLevelDirective,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridItemComponent);
    component = fixture.componentInstance;
    component.product = mockProduct;

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
});
