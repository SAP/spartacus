import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
  Type,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WishListItemComponent } from './wish-list-item.component';
import { I18nTestingModule, WishListService } from '@spartacus/core';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

const MockWishListService = jasmine.createSpyObj('WishListService', [
  'removeEntry',
  'getWishListLoading',
]);

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

describe('WishListItemComponent in WishList', () => {
  let component: WishListItemComponent;
  let fixture: ComponentFixture<WishListItemComponent>;
  let wishListService: WishListService;
  let el: DebugElement;

  const mockCartEntry = {
    basePrice: {
      formattedValue: '$546.20',
    },
    product: {
      name: 'Test product',
      code: '1',
      averageRating: 4.5,
      stock: {
        stockLevelStatus: 'inStock',
      },
      images: {
        PRIMARY: {},
      },
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [
        WishListItemComponent,
        MockPictureComponent,
        MockAddToCartComponent,
        MockStarRatingComponent,
        MockUrlPipe,
        MockCxIconComponent,
      ],
      providers: [
        {
          provide: WishListService,
          useValue: MockWishListService,
        },
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
    el = fixture.debugElement;

    wishListService = fixture.debugElement.injector.get(WishListService as Type<
      WishListService
    >);

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

  it('should call remove', () => {
    component.remove(mockCartEntry);
    expect(wishListService.removeEntry).toHaveBeenCalledWith(mockCartEntry);
  });

  it('should disable remove link when loading', () => {
    component.loading$ = of(false);
    fixture.detectChanges();

    expect(el.query(By.css('.btn-link')).nativeElement.disabled).toBeFalsy();
  });

  it('should not display add to cart component when product is out of stock', () => {
    component.cartEntry.product.stock.stockLevelStatus = 'outOfStock';
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector('cx-add-to-cart')
    ).toBeNull();
  });
});
