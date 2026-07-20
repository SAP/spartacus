import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  ActiveCartFacade,
  Cart,
  CartAddEntrySuccessEvent,
} from '@spartacus/cart/base/root';
import {
  CxDatePipe,
  EventService,
  FeatureDirective,
  FeatureToggles,
  GlobalMessageService,
  GlobalMessageType,
  MockDatePipe,
  MockTranslatePipe,
  MockTranslationService,
  Translatable,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { CartQuickOrderFormComponent } from './cart-quick-order-form.component';

const mockCart: Cart = {
  code: '123456789',
  description: 'testCartDescription',
  name: 'testCartName',
};

const mockUserId = 'test-user';
const mockCartId = '123456789';

const mockCartAddEntrySuccessEvent: CartAddEntrySuccessEvent = {
  cartCode: mockCartId,
  cartId: mockCartId,
  deliveryModeChanged: false,
  entry: {
    product: {
      name: 'test-product',
    },
  },
  productCode: '123456789',
  quantity: 1,
  quantityAdded: 1,
  userId: mockUserId,
};
const mockCartAddEntrySuccessEvent2: CartAddEntrySuccessEvent = {
  cartCode: mockCartId,
  cartId: mockCartId,
  deliveryModeChanged: false,
  entry: {
    product: {
      name: 'test-product',
    },
  },
  productCode: '123456789',
  quantity: 2,
  quantityAdded: 2,
  userId: mockUserId,
};

const cart$ = new BehaviorSubject<Cart>(mockCart);

const addEntryCartEvent$ = new Subject();

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return addEntryCartEvent$.asObservable();
  }
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add(
    _text: string | Translatable,
    _type: GlobalMessageType,
    _timeout?: number
  ): void {}
}

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive(): Observable<Cart> {
    return cart$.asObservable();
  }
  getActiveCartId(): Observable<string> {
    return of('123456789');
  }
  isStable(): Observable<boolean> {
    return of(true);
  }
  addEntry(_productCode: string, _quantity: number): void {}
}

describe('CartQuickOrderFormComponent', () => {
  let component: CartQuickOrderFormComponent;
  let fixture: ComponentFixture<CartQuickOrderFormComponent>;
  let activeCartService: ActiveCartFacade;
  let eventService: EventService;
  let globalMessageService: GlobalMessageService;
  let featureToggles: FeatureToggles;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        FormErrorsModule,
        ReactiveFormsModule,
        CartQuickOrderFormComponent,
      ],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
        {
          provide: EventService,
          useClass: MockEventService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    })
      .overrideComponent(CartQuickOrderFormComponent, {
        remove: { imports: [TranslatePipe, CxDatePipe, FeatureDirective] },
        add: {
          imports: [MockTranslatePipe, MockDatePipe, MockFeatureDirective],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CartQuickOrderFormComponent);
    component = fixture.componentInstance;

    activeCartService = TestBed.inject(ActiveCartFacade);
    eventService = TestBed.inject(EventService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    featureToggles = TestBed.inject(FeatureToggles);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form on init', () => {
    expect(component.quickOrderForm.controls['productCode'].value).toBe('');
    expect(component.quickOrderForm.controls['quantity'].value).toBe(1);
  });

  it('should do nothing on applyQuickOrder if form is invalid', () => {
    spyOn(activeCartService, 'addEntry').and.callThrough();
    component.quickOrderForm.setErrors({ invalid: true });
    component.applyQuickOrder();
    expect(activeCartService.addEntry).not.toHaveBeenCalled();
  });

  it('should add entry on form submit', () => {
    spyOn(activeCartService, 'addEntry').and.callThrough();

    component.quickOrderForm.controls['productCode'].setValue('test');
    component.applyQuickOrder();

    expect(activeCartService.addEntry).toHaveBeenCalledWith('test', 1);
  });

  it('should set quantity value to min when it is smaller than min value', () => {
    component.min = 3;
    component.quickOrderForm.controls['quantity'].setValue(2);
    fixture.detectChanges();

    expect(component.quickOrderForm.controls['quantity'].value).toEqual(3);
  });

  describe('should show global confirmation message on add entry success event', () => {
    beforeEach(() => {
      spyOn(globalMessageService, 'add').and.callThrough();
      spyOn(eventService, 'get').and.callThrough();

      component.ngOnInit();
      component.quickOrderForm.controls['productCode'].setValue('test');
    });

    it('with 1 quantity', () => {
      component.applyQuickOrder();
      addEntryCartEvent$.next(mockCartAddEntrySuccessEvent);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'quickOrderCartForm.entryWasAdded',
          params: {
            product: mockCartAddEntrySuccessEvent.entry?.product?.name,
            quantity: mockCartAddEntrySuccessEvent.quantityAdded,
          },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('with 2 quantity', () => {
      component.quickOrderForm.controls['quantity'].setValue(2);
      component.applyQuickOrder();
      addEntryCartEvent$.next(mockCartAddEntrySuccessEvent2);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'quickOrderCartForm.entriesWereAdded',
          params: {
            product: mockCartAddEntrySuccessEvent2.entry?.product?.name,
            quantity: mockCartAddEntrySuccessEvent2.quantityAdded,
          },
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });

  describe('global error message', () => {
    it('should not show global error message on add entry fail event', () => {
      spyOn(globalMessageService, 'add').and.callThrough();
      component.ngOnInit();
      component.quickOrderForm.controls['productCode'].setValue('test');
      featureToggles.a11yCartQuickOrderFormEnableSubmitAndAddValidation = true;

      component.applyQuickOrder();
      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });
});
