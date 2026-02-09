import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Cart, OrderEntry } from '@spartacus/cart/base/root';
import { WishListFacade } from '@spartacus/cart/wish-list/root';
import {
  CxDatePipe,
  MockDatePipe,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { of } from 'rxjs';
import { WishListItemComponent } from '../public_api';
import { WishListComponent } from './wish-list.component';
import createSpy = jasmine.createSpy;

const mockWishList: Cart = {
  code: 'xxx',
  entries: [{ product: { code: 'yyy' } }],
};

class MockWishListService {
  getWishList = createSpy().and.returnValue(of(mockWishList));
  getWishListLoading = createSpy().and.returnValue(of(false));
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WishListComponent],
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
  }));

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
