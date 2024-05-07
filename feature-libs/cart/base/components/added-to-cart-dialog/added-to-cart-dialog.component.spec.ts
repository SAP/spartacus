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
import { RouterTestingModule } from '@angular/router/testing';
import {
  ActiveCartFacade,
  Cart,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/cart/base/root';
import {
  ActivatedRouterStateSnapshot,
  FeatureConfigService,
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  ICON_TYPE,
  KeyboardFocusTestingModule,
  LaunchDialogService,
  PromotionsModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { cold } from 'jasmine-marbles';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { skip, take } from 'rxjs/operators';
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
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

const routerState = new BehaviorSubject<RouterState>({
  nextState: undefined,
} as RouterState);

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = () => routerState;
}

@Component({
  selector: 'cx-cart-item',
  template: '',
})
class MockCartItemComponent {
  @Input() compact = false;
  @Input() item: Observable<OrderEntry>;
  @Input() readonly = false;
  @Input() quantityControl: UntypedFormControl;
  @Input() promotionLocation: PromotionLocation = PromotionLocation.ActiveCart;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('AddedToCartDialogComponent', () => {
  let component: AddedToCartDialogComponent;
  let fixture: ComponentFixture<AddedToCartDialogComponent>;
  let el: DebugElement;
  let activeCartFacade: ActiveCartFacade;
  let launchDialogService: LaunchDialogService;
  let featureConfigService: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SpinnerModule,
        I18nTestingModule,
        PromotionsModule,
        KeyboardFocusTestingModule,
      ],
      declarations: [
        AddedToCartDialogComponent,
        MockCartItemComponent,
        MockUrlPipe,
        MockCxIconComponent,
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
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToCartDialogComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    activeCartFacade = TestBed.inject(ActiveCartFacade);

    launchDialogService = TestBed.inject(LaunchDialogService);
    featureConfigService = TestBed.inject(FeatureConfigService);

    spyOn(activeCartFacade, 'updateEntry').and.callThrough();

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
      spyOn(activeCartFacade, 'getLastEntry').and.returnValue(
        cold('a', { a: mockOrderEntries[0] })
      );

      spyOn(component as any, 'getAddedEntryWasMerged').and.stub();
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
      spyOn(component, 'dismissModal');
      routerState.next({
        nextState: { url: 'test' } as ActivatedRouterStateSnapshot,
      } as RouterState);
      component.ngOnInit();

      expect(component.dismissModal).toHaveBeenCalledWith('dismiss');
    });
  });

  describe('getAddedEntryWasMerged()', () => {
    it('should return observable<true> when entry was merged.', () => {
      spyOn(activeCartFacade, 'getEntries').and.returnValue(
        cold('a', { a: mockOrderEntries })
      );
      component.loaded$ = cold('t', { t: true });
      expect(component['getAddedEntryWasMerged'](2)).toBeObservable(
        cold('t', { t: true })
      );
    });
    it('should return observable<false> when a new entry is added.', () => {
      spyOn(activeCartFacade, 'getEntries').and.returnValue(
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
    expect(
      el.query(By.css('.cx-dialog-title')).nativeElement.textContent.trim()
    ).toEqual('addToCart.updatingCart');
    expect(el.query(By.css('cx-spinner')).nativeElement).toBeDefined();
  });

  it('should display quantity', () => {
    fixture.detectChanges();
    expect(
      el.query(By.css('.cx-dialog-title')).nativeElement.textContent.trim()
    ).toEqual('addToCart.itemsAddedToYourCart');
  });

  it('should display cart item', () => {
    fixture.detectChanges();
    expect(el.query(By.css('cx-cart-item'))).toBeDefined();
  });

  it('should display cart total', () => {
    component.cart$ = of({
      deliveryItemsQuantity: 1,
      totalPrice: {
        formattedValue: '$100.00',
      },
      subTotal: {
        formattedValue: '$100.00',
      },
    });
    fixture.detectChanges();
    const cartTotalEl = el.query(By.css('.cx-dialog-total')).nativeElement;
    expect(cartTotalEl.children[0].textContent).toEqual(
      ' cartItems.cartTotal count:1 '
    );
    expect(cartTotalEl.children[1].textContent).toEqual('$100.00');
  });

  it('should return formControl with order entry quantity', (done) => {
    component.entry$ = of({
      quantity: 5,
      entryNumber: 0,
    } as OrderEntry);

    component
      .getQuantityControl()
      .pipe(take(1))
      .subscribe((control) => {
        expect(control.value).toEqual(5);
        done();
      });
  });

  it('should return formControl with updated order entry quantity', (done) => {
    const entry$ = new BehaviorSubject<any>({
      quantity: 5,
      entryNumber: 0,
    });

    component.entry$ = entry$;
    component
      .getQuantityControl()
      .pipe(skip(1), take(1))
      .subscribe((control) => {
        expect(control.value).toEqual(50);
        done();
      });

    entry$.next({
      quantity: 50,
      entryNumber: 0,
    });
  });

  it('should show added dialog title message in case new entry appears in cart', () => {
    component.entry$ = of(mockOrderEntries[0]);
    component.loaded$ = of(true);
    spyOn(activeCartFacade, 'getEntries').and.returnValue(of([]));
    fixture.detectChanges();
    const dialogTitleEl = el.query(By.css('.cx-dialog-title')).nativeElement;
    expect(dialogTitleEl.textContent).toEqual(
      ' addToCart.itemsAddedToYourCart '
    );
  });

  it('should show increment dialog title message in case no new entry appears in cart', () => {
    component.entry$ = of(mockOrderEntries[0]);
    component.loaded$ = of(true);
    component.addedEntryWasMerged$ = of(true);
    spyOn(activeCartFacade, 'getEntries').and.returnValue(of(mockOrderEntries));
    fixture.detectChanges();
    const dialogTitleEl = el.query(By.css('.cx-dialog-title')).nativeElement;
    expect(dialogTitleEl.textContent).toEqual(
      ' addToCart.itemsIncrementedInYourCart '
    );
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

  it('should close modal after removing cart item', (done) => {
    spyOn(launchDialogService, 'closeDialog').and.stub();
    fixture.detectChanges();
    component
      .getQuantityControl()
      .pipe(take(1))
      .subscribe((control) => {
        control.setValue(0);
        expect(launchDialogService.closeDialog).toHaveBeenCalled();
        done();
      });
  });

  it('should closeModal when user click outside', () => {
    const el = fixture.debugElement.nativeElement;
    spyOn(component, 'dismissModal');

    el.click();
    expect(component.dismissModal).toHaveBeenCalledWith('Cross click');
  });

  describe('init()', () => {
    it('should compile addedCartEntryWasMerged$ from respective input attribute in case feature toggle adddedToCartDialogDrivenBySuccessEvent is active', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      component.init(
        PRODUCT_CODE,
        QUANTITY,
        NUMBER_ENTRIES_BEFORE_ADD,
        '',
        true
      );
      expect(component.addedEntryWasMerged$).toBeObservable(
        cold('(t|)', { t: true })
      );
    });
    it('should compile addedCartEntryWasMerged$ handling undefined input in case feature toggle adddedToCartDialogDrivenBySuccessEvent is active', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
      component.init(
        PRODUCT_CODE,
        QUANTITY,
        NUMBER_ENTRIES_BEFORE_ADD,
        '',
        undefined
      );
      expect(component.addedEntryWasMerged$).toBeObservable(
        cold('(t|)', { t: false })
      );
    });
    it('should compile addedCartEntryWasMerged$ from quantity comparison in case feature toggle adddedToCartDialogDrivenBySuccessEvent is not active', () => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
      spyOn(activeCartFacade, 'getEntries').and.returnValue(
        cold('a', { a: mockOrderEntries })
      );
      component.loaded$ = cold('t', { t: true });
      component.init(PRODUCT_CODE, QUANTITY, NUMBER_ENTRIES_BEFORE_ADD);
      expect(component.addedEntryWasMerged$).toBeObservable(
        cold('t', { t: true })
      );
    });
  });

  describe('ngOnInit()', () => {
    it('should default numberOfEntriesBeforeAdd with zero in case it is not provided from outside', () => {
      numberOfEntriesBeforeAdd = undefined;
      spyOn(component, 'init').and.callThrough();
      component.ngOnInit();
      expect(component.init).toHaveBeenCalledWith(
        PRODUCT_CODE,
        QUANTITY,
        0,
        PICKUP_STORE_NAME,
        undefined
      );
    });
  });
});
