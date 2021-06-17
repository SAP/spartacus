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
import { FormErrorsModule } from 'projects/storefrontlib/src/shared';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartQuickFormComponent } from './cart-quick-form.component';

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

const cart$ = new BehaviorSubject<Cart>(mockCart);

class MockEventService implements Partial<EventService> {
  get(): Observable<any> {
    return of();
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

fdescribe('CartQuickFormComponent', () => {
  let component: CartQuickFormComponent;
  let fixture: ComponentFixture<CartQuickFormComponent>;
  let activeCartService: ActiveCartService;
  let eventService: EventService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormErrorsModule,
        I18nTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
      ],
      declarations: [CartQuickFormComponent],
      providers: [
        { provide: ActiveCartService, useClass: MockActiveCartService },
        {
          provide: EventService,
          useClass: MockEventService,
        },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartQuickFormComponent);
    component = fixture.componentInstance;

    activeCartService = TestBed.inject(ActiveCartService);
    eventService = TestBed.inject(EventService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    console.log('orderForm', component.orderForm);
  });

  it('should create form on init', () => {
    expect(component.orderForm.valid).toBeFalsy();
    expect(component.orderForm.controls['productCode'].value).toBe('');
    expect(component.orderForm.controls['quantity'].value).toBe(1);
  });

  it('should add entry on form submit', () => {
    spyOn(activeCartService, 'addEntry').and.callThrough();

    component.orderForm.controls['productCode'].setValue('test');
    component.applyQuickOrder();

    expect(activeCartService.addEntry).toHaveBeenCalledWith('test', 1);
  });

  it('should set quantity value to min when it is smaller than min value', () => {
    component.min = 3;
    component.orderForm.controls['quantity'].setValue(2);
    fixture.detectChanges();

    expect(component.orderForm.controls['quantity'].value).toEqual(3);
  });

  it('should show global confirmation message on add entry success event', () => {
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(eventService, 'get').and.returnValue(
      of(mockCartAddEntrySuccessEvent)
    );

    component.ngOnInit();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quickOrderCartForm.entryWasAdded',
        params: {
          product: mockCartAddEntrySuccessEvent.entry.product?.name,
          quantity: mockCartAddEntrySuccessEvent.quantityAdded,
        },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });

  it('should show global error message on add entry fail event', () => {
    spyOn(globalMessageService, 'add').and.callThrough();
    spyOn(eventService, 'get').and.returnValue(of(mockCartAddEntryFailEvent));

    component.ngOnInit();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'quickOrderCartForm.noResults',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
