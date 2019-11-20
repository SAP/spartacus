import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistComponent } from './wishlist.component';
import { I18nTestingModule, WishListService } from '@spartacus/core';
import { Component, Input, Pipe, PipeTransform, Type } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MediaComponent } from '@spartacus/storefront';

@Component({
  selector: 'cx-star-rating',
  template: '',
})
class MockStarRatingComponent {
  @Input() rating;
  @Input() disabled;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-icon',
  template: '',
})
export class MockCxIconComponent {
  @Input() type;
}

@Component({
  selector: 'cx-add-to-cart',
  template: '<button>add to cart</button>',
})
export class MockAddToCartComponent {
  @Input() product;
  @Input() showQuantity;
}

const MockWishListService = jasmine.createSpyObj('WishListService', [
  'getWishList',
]);

@Component({
  selector: 'cx-wish-list-item',
  template: '',
})
class MockWishListItemComponent {
  @Input()
  cartEntry;
}

describe('WishListComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let wishListService: WishListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WishlistComponent,
        MockWishListItemComponent,
        MockStarRatingComponent,
        MockAddToCartComponent,
        MockUrlPipe,
        MockCxIconComponent,
        MediaComponent,
      ],
      imports: [I18nTestingModule, RouterTestingModule],
      providers: [
        {
          provide: WishListService,
          useValue: MockWishListService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    wishListService = fixture.debugElement.injector.get(WishListService as Type<
      WishListService
    >);
    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get wish list', () => {
    expect(wishListService.getWishList).toHaveBeenCalled();
  });
});
