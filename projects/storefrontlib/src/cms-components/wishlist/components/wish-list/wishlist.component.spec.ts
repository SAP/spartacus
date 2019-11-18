import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistComponent } from './wishlist.component';
import { Cart, CartModule, WishListService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { Type } from '@angular/core';

class MockWishListService {
  getActive(): Observable<Cart> {
    return of({});
  }
}
describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
  let wishListService: WishListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CartModule],
      providers: [
        {
          provide: WishListService,
          useClass: MockWishListService,
        },
      ],
      declarations: [WishlistComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    wishListService = TestBed.get(WishListService as Type<WishListService>);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get wishlist', () => {
    expect(wishListService.getWishList).toHaveBeenCalled();
  });
});
