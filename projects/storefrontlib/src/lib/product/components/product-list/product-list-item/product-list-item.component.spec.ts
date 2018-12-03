import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListItemComponent } from './product-list-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Pipe,
  PipeTransform
} from '@angular/core';

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>'
})
export class MockAddToCartComponent {
  @Input()
  iconOnly;
  @Input()
  productCode;
  @Input()
  quantity;
}

@Component({
  selector: 'cx-star-rating',
  template: '*****'
})
export class MockStarRatingComponent {
  @Input()
  rating;
  @Input()
  disabled;
  @Input()
  steps;
}

@Component({
  selector: 'cx-picture',
  template: 'mock picture component'
})
export class MockPictureComponent {
  @Input()
  imageContainer;
  @Input()
  imageFormat;
  @Input()
  imagePosition;
  @Input()
  imageAlt;
}

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

describe('ProductListItemComponent in product-list', () => {
  let component: ProductListItemComponent;
  let fixture: ComponentFixture<ProductListItemComponent>;

  const mockProduct = {
    name: 'Test product',
    summary: 'Test summary',
    code: '1',
    averageRating: 4.5,
    stock: {
      stockLevelStatus: 'inStock'
    },
    price: {
      formattedValue: '$100,00'
    },
    images: {
      PRIMARY: {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ProductListItemComponent,
        MockPictureComponent,
        MockAddToCartComponent,
        MockStarRatingComponent,
        MockTranslateUrlPipe
      ]
    })
      .overrideComponent(ProductListItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;

    component.product = mockProduct;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.cx-product-search-list__name'
      ).textContent
    ).toContain(component.product.name);
  });

  it('should display product summary', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.cx-product-search-list__summary'
      ).textContent
    ).toContain(component.product.summary);
  });

  it('should display product formatted price', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.cx-product-search-list__price'
      ).textContent
    ).toContain(component.product.price.formattedValue);
  });

  it('should display product image', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-picture')
    ).not.toBeNull();
  });

  it('should display raiting component', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-star-rating')
    ).not.toBeNull();
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
