import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import {
  CxDatePipe,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { of } from 'rxjs';
import { WishListItemComponent } from '../public_api';
import { WishListComponent } from './wish-list.component';

const mockWishList: Cart = {
  code: 'xxx',
  entries: [{ product: { code: 'yyy' } }],
};

class MockWishListService {
  getWishList = vi.fn().mockReturnValue(of(mockWishList));
  getWishListLoading = vi.fn().mockReturnValue(of(false));
}

@Component({
  selector: '[cx-wish-list-item], cx-wish-list-item',
  template: '',
})
class MockWishListItemComponent {
  @Input()
  cartEntry: OrderEntry;
  @Input()
  isLoading = false;
  @Output()
  remove = new EventEmitter<OrderEntry>();
}

describe('WishListComponent', () => {
  let component: WishListComponent;
  let fixture: ComponentFixture<WishListComponent>;

  let wishListService: WishListFacade;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, WishListComponent],
      providers: [
        {
          provide: WishListFacade,
          useClass: MockWishListService,
        },
      ],
    })
      .overrideComponent(WishListComponent, {
        remove: {
          imports: [TranslatePipe, CxDatePipe, WishListItemComponent],
        },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockWishListItemComponent],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListComponent);
    component = fixture.componentInstance;

    wishListService = TestBed.inject(WishListFacade);
    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get wish list', () => {
    expect(wishListService.getWishList).toHaveBeenCalled();
  });
});
