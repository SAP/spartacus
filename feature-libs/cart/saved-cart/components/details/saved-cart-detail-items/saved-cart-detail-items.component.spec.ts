import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SavedCartService } from '@spartacus/cart/saved-cart/core';
import {
  Cart,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OrderEntry,
  Product,
  RoutingService,
  Translatable,
  UserIdService,
} from '@spartacus/core';
import { CartItemComponentOptions } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SavedCartDetailService } from '../saved-cart-detail.service';
import { SavedCartDetailItemsComponent } from './saved-cart-detail-items.component';

const mockUserId = 'test-user';
const mockCartId = 'test-cart';
const mockProduct: Product = {
  name: 'test-product',
  code: 'productCode',
};
const mockSavedCart: Cart = {
  code: mockCartId,
  name: 'test-cart-name',
  entries: [{ entryNumber: 0, product: mockProduct }],
  description: 'test-cart-description',
  totalItems: 5,
};
const mockEmptyEntriesCart: Cart = { ...mockSavedCart, entries: [] };

const cart$ = new BehaviorSubject<Cart>(mockSavedCart);

@Component({
  selector: 'cx-cart-item-list',
  template: '',
})
class MockCartItemListComponent {
  @Input() readonly = false;
  @Input() items: OrderEntry[];
  @Input() cartIsLoading: Observable<boolean>;
  @Input() options: CartItemComponentOptions = {
    isSaveForLater: false,
    optionalBtn: null,
  };
  @Input() cart: { cartId: string; userId: string };
}

class MockSavedCartDetailService implements Partial<SavedCartDetailService> {
  getCartDetails(): Observable<Cart> {
    return cart$.asObservable();
  }
  getSavedCartId(): Observable<string> {
    return of(mockCartId);
  }
}

class MockSavedCartService implements Partial<SavedCartService> {
  isStable(_cartId: string): Observable<boolean> {
    return of(true);
  }
  deleteSavedCart(_cartId: string): void {}
}

class MockUserIdService implements Partial<UserIdService> {
  takeUserId(_loggedIn: boolean): Observable<string> {
    return of(mockUserId);
  }
}

class MockRoutingService implements Partial<RoutingService> {
  go(): void {}
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

describe('SavedCartDetailItemsComponent', () => {
  let component: SavedCartDetailItemsComponent;
  let fixture: ComponentFixture<SavedCartDetailItemsComponent>;
  let savedCartService: SavedCartService;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), I18nTestingModule],
        declarations: [
          SavedCartDetailItemsComponent,
          MockCartItemListComponent,
        ],
        providers: [
          {
            provide: SavedCartService,
            useClass: MockSavedCartService,
          },
          {
            provide: SavedCartDetailService,
            useClass: MockSavedCartDetailService,
          },
          {
            provide: UserIdService,
            useClass: MockUserIdService,
          },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SavedCartDetailItemsComponent);
      component = fixture.componentInstance;

      savedCartService = TestBed.inject(SavedCartService);
      globalMessageService = TestBed.inject(GlobalMessageService);
      routingService = TestBed.inject(RoutingService);

      spyOn(routingService, 'go').and.callThrough();
      spyOn(globalMessageService, 'add').and.callThrough();
      spyOn(savedCartService, 'deleteSavedCart').and.callThrough();

      cart$.next(mockSavedCart);

      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT delete saved cart when there are cart entries', () => {
    component.savedCart$
      .subscribe((savedCart) => {
        expect(savedCart).toEqual(mockSavedCart);
        expect(routingService.go).not.toHaveBeenCalledWith({
          cxRoute: 'savedCarts',
        });
        expect(globalMessageService.add).not.toHaveBeenCalledWith(
          { key: 'savedCartDialog.deleteCartSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        expect(savedCartService.deleteSavedCart).not.toHaveBeenCalledWith(
          mockCartId
        );
      })
      .unsubscribe();
  });

  it('should delete saved cart when there are cart entries', () => {
    cart$.next(mockEmptyEntriesCart);

    component.savedCart$
      .subscribe((savedCart) => {
        expect(savedCart).toEqual(mockEmptyEntriesCart);
        expect(routingService.go).toHaveBeenCalledWith({
          cxRoute: 'savedCarts',
        });
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'savedCartDialog.deleteCartSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
        expect(savedCartService.deleteSavedCart).toHaveBeenCalledWith(
          mockCartId
        );
      })
      .unsubscribe();
  });
});
