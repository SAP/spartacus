import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {
  ActiveCartService,
  Cart,
  CartAddEntryFailEvent,
  CartAddEntrySuccessEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  Translatable,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CartQuickOrderFormComponent } from './cart-quick-order-form.component';

const mockCart: Cart = {
  code: '123456789',
  description: 'testCartDescription',
  name: 'testCartName',
};

const mockUserId = 'test-user';
const mockCartId = '123456789';

const mockCartAddEntryFailEvent: CartAddEntryFailEvent = {
  cartCode: mockCartId,
  cartId: mockCartId,
  productCode: '123456789',
  quantity: 1,
  userId: mockUserId,
};
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

class MockActiveCartService implements Partial<ActiveCartService> {
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
  let activeCartService: ActiveCartService;
  let eventService: EventService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        FormErrorsModule,
        I18nTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [CartQuickOrderFormComponent],
      providers: [
        { provide: ActiveCartService, useClass: MockActiveCartService },
        {
          provide: EventService,
          useClass: MockEventService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartQuickOrderFormComponent);
    component = fixture.componentInstance;

    activeCartService = TestBed.inject(ActiveCartService);
    eventService = TestBed.inject(EventService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form on init', () => {
    expect(component.quickOrderForm.valid).toBeFalsy();
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

  it('should show global error message on add entry fail event', () => {
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(eventService, 'get').and.callThrough();

    component.ngOnInit();
    component.quickOrderForm.controls['productCode'].setValue('test');
    component.applyQuickOrder();
    addEntryCartEvent$.next(mockCartAddEntryFailEvent);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quickOrderCartForm.noResults',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
