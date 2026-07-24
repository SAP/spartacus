import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  ActiveCartFacade,
  Cart,
  CartAddEntrySuccessEvent,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import {
  ActivatedRouterStateSnapshot,
  CxDatePipe,
  FeatureDirective,
  I18nTestingModule,
  MockDatePipe,
  MockTranslatePipe,
  RouterState,
  RoutingService,
  TranslatePipe,
  UrlPipe,
} from '@spartacus/core';
import {
  ICON_TYPE,
  IconComponent,
  KeyboardFocusTestingModule,
  LaunchDialogService,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { MockFeatureDirective } from '../../../../../core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject, EMPTY, Observable, of, firstValueFrom } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { CartItemComponent } from '../cart-shared';
import { AddedToCartDialogComponent } from './added-to-cart-dialog.component';

class MockActiveCartService implements Partial<ActiveCartFacade> {
  updateEntry(_entryNumber: number, _quantity: number): void {}

  getEntries(): Observable<OrderEntry[]> {
    return of([]);
  }

  getActive(): Observable<Cart> {
    return of({});
  }

  getLastEntry(_productCode: string): Observable<OrderEntry | undefined> {
    return of({});
  }

  isStable(): Observable<boolean> {
    return of(true);
  }

  getEntry(_productCode: string): Observable<OrderEntry | undefined> {
    return of({});
  }
}

const PRODUCT_CODE = 'CODE1111';
const QUANTITY = 3;
const NUMBER_ENTRIES_BEFORE_ADD = 2;
const PICKUP_STORE_NAME = 'testStore';
let numberOfEntriesBeforeAdd: number | undefined = NUMBER_ENTRIES_BEFORE_ADD;
class MockLaunchDialogService implements Partial<LaunchDialogService> {
  get data$(): Observable<any> {
    return of({
      productCode: PRODUCT_CODE,
      quantity: QUANTITY,
      numberOfEntriesBeforeAdd: numberOfEntriesBeforeAdd,
      pickupStoreName: PICKUP_STORE_NAME,
    });
  }

  closeDialog(_reason: string): void {}
}

const mockOrderEntries: OrderEntry[] = [
  {
    quantity: 1,
    entryNumber: 1,
    product: {
      code: PRODUCT_CODE,
    },
  },
  {
    quantity: 2,
    entryNumber: 1,
    product: {
      code: PRODUCT_CODE,
    },
  },
];

@Component({
  selector: 'cx-icon',
  template: '',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nTestingModule,
    PromotionsModule,
    KeyboardFocusTestingModule,
  ],
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

const routerState = new BehaviorSubject<RouterState>({
  nextState: undefined,
} as RouterState);

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
  getRouterState = () => routerState;
}

@Component({
  selector: 'cx-cart-item',
  template: '',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    I18nTestingModule,
    PromotionsModule,
    KeyboardFocusTestingModule,
  ],
})
class MockCartItemComponent {
  @Input() compact = false;
  @Input() item: Observable<OrderEntry>;
  @Input() readonly = false;
  @Input() quantityControl: UntypedFormControl;
  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('AddedToCartDialogComponent', () => {
  let component: AddedToCartDialogComponent;
  let fixture: ComponentFixture<AddedToCartDialogComponent>;
  let el: DebugElement;
  let activeCartFacade: ActiveCartFacade;
  let launchDialogService: LaunchDialogService;
  let routingService: RoutingService;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SpinnerModule,
        PromotionsModule,
        KeyboardFocusTestingModule,
        AddedToCartDialogComponent,
        RouterModule,
      ],
      providers: [
        {
          provide: ActiveCartFacade,
          useClass: MockActiveCartService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
      ],
    })
      .overrideComponent(AddedToCartDialogComponent, {
        remove: {
          imports: [
            TranslatePipe,
            CxDatePipe,
            CartItemComponent,
            UrlPipe,
            IconComponent,
            FeatureDirective,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockDatePipe,
            MockCartItemComponent,
            MockUrlPipe,
            MockCxIconComponent,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    activeCartFacade = TestBed.inject(ActiveCartFacade);

    launchDialogService = TestBed.inject(LaunchDialogService);
    routingService = TestBed.inject(RoutingService);

    vi.spyOn(activeCartFacade, 'updateEntry');

    component.entry$ = of(mockOrderEntries[0]);
    component.loaded$ = of(true);
    component.addedEntryWasMerged$ = of(false);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('init()', () => {
    it('should init the component', () => {
      component.quantity = -1;
      component.entry$ = EMPTY;
      component.addedEntryWasMerged$ = EMPTY;
      vi.spyOn(activeCartFacade, 'getLastEntry').mockReturnValue(
        cold('a', { a: mockOrderEntries[0] })
      );

      vi.spyOn(component as any, 'getAddedEntryWasMerged').mockImplementation(() => {});
      component.ngOnInit();

      expect(component.quantity).toEqual(3);
      expect((component as any)['getAddedEntryWasMerged']).toHaveBeenCalledWith(
        2
      );
      expect(component.entry$).toBeObservable(
        cold('r', { r: mockOrderEntries[0] })
      );
    });

    it('should subscribe to routerState and close dialog when route changed', () => {
      vi.spyOn(component, 'dismissModal');
      routerState.next({
        nextState: { url: 'test' } as ActivatedRouterStateSnapshot,
      } as RouterState);
      component.ngOnInit();

      expect(component.dismissModal).toHaveBeenCalledWith('dismiss');
    });
  });

  describe('getAddedEntryWasMerged()', () => {
    it('should return observable<true> when entry was merged.', () => {
      vi.spyOn(activeCartFacade, 'getEntries').mockReturnValue(
        cold('a', { a: mockOrderEntries })
      );
      component.loaded$ = cold('t', { t: true });
      expect(component['getAddedEntryWasMerged'](2)).toBeObservable(
        cold('t', { t: true })
      );
    });
    it('should return observable<false> when a new entry is added.', () => {
      vi.spyOn(activeCartFacade, 'getEntries').mockReturnValue(
        cold('a', { a: mockOrderEntries })
      );
      component.loaded$ = cold('t', { t: true });
      expect(component['getAddedEntryWasMerged'](3)).toBeObservable(
        cold('f', { f: false })
      );
    });
  });

  it('should display loading placeholder', () => {
    component.loaded$ = of(false);
    fixture.detectChanges();
    expect(el.query(By.css('cx-spinner')).nativeElement).toBeDefined();
  });

  it('should show item added to your cart dialog title message', () => {
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-dialog-title')).nativeElement.textContent.trim()
    ).toEqual('addToCart.itemAddedToYourCart');
  });

  it('should display cart item', () => {
    fixture.detectChanges();
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();
  });

  it('should display cart total', () => {
    component.cart$ = of({
      totalUnitCount: 1,
      totalPrice: {
        formattedValue: '$100.00',
      },
      subTotal: {
        formattedValue: '$100.00',
      },
    });
    fixture.detectChanges();
    const cartTotalEl = el.query(By.css('.cx-dialog-total')).nativeElement;
    expect(cartTotalEl.children[0].textContent?.trim()).toEqual(
      'cartItems.cartTotal count:1'
    );
    expect(cartTotalEl.children[1].textContent?.trim()).toEqual('$100.00');
  });

  it('should return formControl with order entry quantity', async () => {
    component.entry$ = of({
      quantity: 5,
      entryNumber: 0,
    } as OrderEntry);

    const control = await firstValueFrom(component.getQuantityControl());
    expect(control.value).toEqual(5);
  });

  it('should return formControl with updated order entry quantity', async () => {
    const entry$ = new BehaviorSubject<any>({
      quantity: 5,
      entryNumber: 0,
    });

    component.entry$ = entry$;
    const controlPromise = firstValueFrom(
      component.getQuantityControl().pipe(skip(1))
    );

    entry$.next({
      quantity: 50,
      entryNumber: 0,
    });

    const control = await controlPromise;
    expect(control.value).toEqual(50);
  });

  it('should not show cart entry', () => {
    component.loaded$ = of(false);
    expect(el.query(By.css('cx-cart-item'))).toBeNull();
  });

  it('should show cart entry', () => {
    fixture.detectChanges();
    component.loaded$ = of(true);
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();

    component.loaded$ = of(true);
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();

    component.loaded$ = of(false);
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();
  });

  it('should close modal after removing cart item', async () => {
    vi.spyOn(launchDialogService, 'closeDialog').mockImplementation(() => {});
    fixture.detectChanges();
    const control = await firstValueFrom(component.getQuantityControl());
    control.setValue(0);
    expect(launchDialogService.closeDialog).toHaveBeenCalled();
  });

  it('should closeModal when user click outside', () => {
    const el = fixture.debugElement.nativeElement;
    vi.spyOn(component, 'dismissModal');

    el.click();
    expect(component.dismissModal).toHaveBeenCalledWith('Cross click');
  });

  describe('init()', () => {
    it('should compile addedCartEntryWasMerged$ from quantity comparison', () => {
      vi.spyOn(activeCartFacade, 'getEntries').mockReturnValue(
        cold('a', { a: mockOrderEntries })
      );
      component.loaded$ = cold('t', { t: true });
      component.init(PRODUCT_CODE, QUANTITY, NUMBER_ENTRIES_BEFORE_ADD);
      expect(component.addedEntryWasMerged$).toBeObservable(
        cold('t', { t: true })
      );
    });
    it('should determine product from input in case addingEntryResult in not provided', () => {
      vi.spyOn(activeCartFacade, 'getLastEntry');

      component.init(PRODUCT_CODE, QUANTITY, NUMBER_ENTRIES_BEFORE_ADD);
      component.entry$.subscribe(() => {
        expect(activeCartFacade.getLastEntry).toHaveBeenCalledWith(
          PRODUCT_CODE
        );
      });
    });

    it('should determine product from addingEntryResult in case provided', () => {
      vi.spyOn(activeCartFacade, 'getLastEntry');
      const mockSuccessEvent = new CartAddEntrySuccessEvent();
      const replacedProductCode = 'NEW_PRODUCT_CODE';
      mockSuccessEvent.entry = { product: { code: 'NEW_PRODUCT_CODE' } };
      component.init(
        PRODUCT_CODE,
        QUANTITY,
        NUMBER_ENTRIES_BEFORE_ADD,
        undefined,
        of(mockSuccessEvent)
      );
      component.entry$.subscribe(() => {
        expect(activeCartFacade.getLastEntry).toHaveBeenCalledWith(
          replacedProductCode
        );
      });
    });

    it('should fallback to events product code from addingEntryResult in case entries product code does not exist', () => {
      vi.spyOn(activeCartFacade, 'getLastEntry');
      const mockSuccessEvent = new CartAddEntrySuccessEvent();
      mockSuccessEvent.productCode = PRODUCT_CODE;
      component.init(
        PRODUCT_CODE,
        QUANTITY,
        NUMBER_ENTRIES_BEFORE_ADD,
        undefined,
        of(mockSuccessEvent)
      );
      component.entry$.subscribe(() => {
        expect(activeCartFacade.getLastEntry).toHaveBeenCalledWith(
          PRODUCT_CODE
        );
      });
    });
  });

  describe('onAction()', () => {
    it('should redirect to the cart view on "View Cart" button click', () => {
      vi.spyOn(routingService, 'go');
      vi.spyOn(component, 'dismissModal');
      fixture.detectChanges();
      const viewCartBtn = el.query(
        By.css('.cx-dialog-buttons button.btn-primary')
      );
      viewCartBtn.triggerEventHandler('click');
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'cart' });
      expect(component.dismissModal).toHaveBeenCalledWith('View Cart click');
    });

    it('should redirect to the checkout view on "Proceed to Checkout" button click', () => {
      vi.spyOn(routingService, 'go');
      vi.spyOn(component, 'dismissModal');
      fixture.detectChanges();
      const checkoutBtn = el.query(
        By.css('.cx-dialog-buttons button.btn-secondary')
      );
      checkoutBtn.triggerEventHandler('click');
      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'checkout' });
      expect(component.dismissModal).toHaveBeenCalledWith(
        'Proceed To Checkout click'
      );
    });
  });
});
