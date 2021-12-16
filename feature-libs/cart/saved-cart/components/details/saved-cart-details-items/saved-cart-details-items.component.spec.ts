import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { SavedCartFacade } from '@spartacus/cart/saved-cart/root';
import {
  Cart,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OrderEntry,
  Product,
  PromotionLocation,
  RoutingService,
  Translatable,
} from '@spartacus/core';
import { CartItemComponentOptions } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SavedCartDetailsService } from '../saved-cart-details.service';
import { SavedCartDetailsItemsComponent } from './saved-cart-details-items.component';

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
const mockDeleteSavedCartEvent = {
  userId: mockUserId,
  cartId: mockCartId,
  cartCode: mockCartId,
};

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
  @Input() cartId: string;
  @Input() promotionLocation: PromotionLocation;
}

class MockSavedCartDetailsService implements Partial<SavedCartDetailsService> {
  getCartDetails(): Observable<Cart> {
    return cart$.asObservable();
  }
  getSavedCartId(): Observable<string> {
    return of(mockCartId);
  }
}

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return of();
  }
}

class MockSavedCartFacade implements Partial<SavedCartFacade> {
  isStable(_cartId: string): Observable<boolean> {
    return of(true);
  }
  deleteSavedCart(_cartId: string): void {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}
class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

describe('SavedCartDetailsItemsComponent', () => {
  let component: SavedCartDetailsItemsComponent;
  let fixture: ComponentFixture<SavedCartDetailsItemsComponent>;
  let savedCartFacade: SavedCartFacade;
  let eventService: EventService;
  let globalMessageService: GlobalMessageService;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [StoreModule.forRoot({}), I18nTestingModule],
        declarations: [
          SavedCartDetailsItemsComponent,
          MockCartItemListComponent,
        ],
        providers: [
          {
            provide: SavedCartFacade,
            useClass: MockSavedCartFacade,
          },
          {
            provide: EventService,
            useClass: MockEventService,
          },
          {
            provide: SavedCartDetailsService,
            useClass: MockSavedCartDetailsService,
          },
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SavedCartDetailsItemsComponent);
      component = fixture.componentInstance;

      savedCartFacade = TestBed.inject(SavedCartFacade);
      eventService = TestBed.inject(EventService);
      globalMessageService = TestBed.inject(GlobalMessageService);
      routingService = TestBed.inject(RoutingService);

      spyOn(routingService, 'go').and.callThrough();
      spyOn(globalMessageService, 'add').and.callThrough();
      spyOn(savedCartFacade, 'deleteSavedCart').and.callThrough();

      cart$.next(mockSavedCart);

      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger onDeleteComplete when there was a successful deleted cart', () => {
    spyOn(component, 'onDeleteComplete').and.stub();
    spyOn(eventService, 'get').and.returnValue(of(mockDeleteSavedCartEvent));

    component.ngOnInit();
    expect(component.onDeleteComplete).toHaveBeenCalled();
  });

  it('should trigger a redirection and a global message onDeleteComplete', () => {
    component.onDeleteComplete(true);

    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'savedCarts',
    });
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'savedCartDialog.deleteCartSuccess' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should NOT trigger a redirection and a global message onDeleteComplete', () => {
    component.onDeleteComplete(false);

    expect(routingService.go).not.toHaveBeenCalled();
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should NOT delete saved cart when there are cart entries', () => {
    component.savedCart$
      .subscribe((savedCart) => {
        expect(savedCart).toEqual(mockSavedCart);
        expect(savedCartFacade.deleteSavedCart).not.toHaveBeenCalled();
      })
      .unsubscribe();
  });

  it('should delete saved cart when cart is empty', () => {
    cart$.next(mockEmptyEntriesCart);

    component.savedCart$
      .subscribe((savedCart) => {
        expect(savedCart).toEqual(mockEmptyEntriesCart);
        expect(savedCartFacade.deleteSavedCart).toHaveBeenCalledWith(
          mockCartId
        );
      })
      .unsubscribe();
  });
});
