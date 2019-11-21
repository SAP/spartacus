import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WishListItemComponent } from './wish-list-item.component';

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
export class MockAddToCartComponent {
  @Input() product;
  @Input() showQuantity;
}

@Component({
  selector: 'cx-star-rating',
  template: '*****',
})
export class MockStarRatingComponent {
  @Input() rating;
  @Input() disabled;
}

@Component({
  selector: 'cx-media',
  template: 'mock picture component',
})
export class MockPictureComponent {
  @Input() container;
  @Input() alt;
}

@Component({
  selector: 'cx-icon',
  template: '',
})
export class MockCxIconComponent {
  @Input() type;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('WishListItemItemComponent in wish-list', () => {
  let component: WishListItemComponent;
  let fixture: ComponentFixture<WishListItemComponent>;

  const mockCartEntry = {
    basePrice: {
      formattedValue: '$546.20',
    },
    product: {
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
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        WishListItemComponent,
        MockPictureComponent,
        MockAddToCartComponent,
        MockStarRatingComponent,
        MockUrlPipe,
        MockCxIconComponent,
      ],
    })
      .overrideComponent(WishListItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListItemComponent);
    component = fixture.componentInstance;

    component.cartEntry = mockCartEntry;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-name')
        .textContent
    ).toContain(component.cartEntry.product.name);
  });

  it('should display product summary', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-summary')
        .textContent
    ).toContain(component.cartEntry.product.summary);
  });

  it('should display product formatted price', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('.cx-product-price')
        .textContent
    ).toContain(component.cartEntry.basePrice.formattedValue);
  });

  it('should display product image', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('cx-media')
    ).not.toBeNull();
  });

  it('should display rating component', () => {
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
    component.cartEntry.product.stock.stockLevelStatus = 'outOfStock';
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector('cx-add-to-cart')
    ).toBeNull();
  });
});
