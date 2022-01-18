import { Component, EventEmitter, Input, Output } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Cart,
  I18nTestingModule,
  OrderEntry,
  WishListService,
} from '@spartacus/core';
import { of } from 'rxjs';
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
  selector: 'cx-wish-list-item',
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

  let wishListService: WishListService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule],
        declarations: [WishListComponent, MockWishListItemComponent],
        providers: [
          {
            provide: WishListService,
            useClass: MockWishListService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListComponent);
    component = fixture.componentInstance;

    wishListService = TestBed.inject(WishListService);
    fixture.detectChanges();
  });

  it('should create instance', () => {
    expect(component).toBeTruthy();
  });

  it('should get wish list', () => {
    expect(wishListService.getWishList).toHaveBeenCalled();
  });
});
