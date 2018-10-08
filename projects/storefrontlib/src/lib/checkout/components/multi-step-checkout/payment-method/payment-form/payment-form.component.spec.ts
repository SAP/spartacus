import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';
import { PaymentFormComponent } from './payment-form.component';
import {
  ReactiveFormsModule,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import * as fromRoot from '../../../../../routing/store';
import * as fromCheckout from '../../../../store';
import * as fromCart from '../../../../../cart/store';
import * as fromUser from '../../../../../user/store';
import * as fromAuth from '../../../../../auth/store';

import { CheckoutService } from '../../../../services/checkout.service';
import { CartService } from '../../../../../cart/services/cart.service';
import { CartDataService } from '../../../../../cart/services/cart-data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CardModule } from '../../../../../ui/components/card/card.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Address } from '../../../../models/address-model';

export class MockAbstractControl {
  hasError() {
    return true;
  }
  get touched() {
    return true;
  }
}

export class MockFormGroup {
  get() {}
}

const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' }
};

const mockCardTypes = [
  {
    code: 'amex',
    name: 'American Express'
  },
  {
    isocode: 'maestro',
    name: 'Maestro'
  }
];

describe('PaymentFormComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let service: CheckoutService;

  let ac: AbstractControl;
  let mockCheckoutSelectors: {
    getAllCardTypes: BehaviorSubject<any[]>;
    getDeliveryAddress: BehaviorSubject<any[]>;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        CardModule,
        NgSelectModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          checkout: combineReducers(fromCheckout.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
      ],
      declarations: [PaymentFormComponent],
      providers: [
        CheckoutService,
        CartService,
        CartDataService,
        { provide: FormGroup, useClass: MockFormGroup },
        { provide: AbstractControl, useClass: MockAbstractControl }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    store = TestBed.get(Store);

    ac = TestBed.get(AbstractControl);

    mockCheckoutSelectors = {
      getAllCardTypes: new BehaviorSubject([]),
      getDeliveryAddress: new BehaviorSubject([])
    };
    spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
      switch (selector) {
        case fromCheckout.getAllCardTypes:
          return () => mockCheckoutSelectors.getAllCardTypes;
        case fromCheckout.getDeliveryAddress:
          return () => mockCheckoutSelectors.getDeliveryAddress;
      }
    });

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(ac, 'hasError').and.callThrough();
    spyOn(service, 'loadSupportedCardTypes').and.callThrough();

    spyOn(component.addPaymentInfo, 'emit').and.callThrough();
    spyOn(component.backToPayment, 'emit').and.callThrough();
    spyOn(component.payment, 'get').and.returnValue(ac);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get suppored card types if they do not exist', () => {
    mockCheckoutSelectors.getAllCardTypes.next([]);
    component.ngOnInit();
    component.cardTypes$.subscribe(() => {
      expect(service.loadSupportedCardTypes).toHaveBeenCalled();
    });
  });

  it('should call ngOnInit to get suppored card types if they exist', () => {
    mockCheckoutSelectors.getAllCardTypes.next(mockCardTypes);
    component.ngOnInit();
    component.cardTypes$.subscribe(data => {
      expect(data).toBe(mockCardTypes);
    });
  });

  it('should call ngOnInit to get shipping address set in cart', () => {
    mockCheckoutSelectors.getAllCardTypes.next(mockCardTypes);
    mockCheckoutSelectors.getDeliveryAddress.next(mockAddress);
    component.ngOnInit();
    component.cardTypes$.subscribe(data => {
      expect(data).toBe(mockCardTypes);
    });
    component.shippingAddress$.subscribe(data => {
      expect(data).toBe(mockAddress);
    });
  });

  it('should call toggleDefaultPaymentMethod() with defaultPayment flag set to false', () => {
    component.payment.value.defaultPayment = false;
    component.toggleDefaultPaymentMethod();
    expect(component.payment.value.defaultPayment).toBeTruthy();
  });

  it('should call toggleDefaultPaymentMethod() with defaultPayment flag set to false', () => {
    component.payment.value.defaultPayment = true;
    component.toggleDefaultPaymentMethod();
    expect(component.payment.value.defaultPayment).toBeFalsy();
  });

  it('should call next()', () => {
    component.next();
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith(
      component.payment.value
    );
  });

  it('should call back()', () => {
    component.back();
    expect(component.backToPayment.emit).toHaveBeenCalled();
  });

  it('should call required(name: string)', () => {
    component.required('someName');
    expect(component.payment.get).toHaveBeenCalledWith('someName');
  });

  it('should call notSelected(name: string)', () => {
    component.notSelected('someName');
    expect(component.payment.get).toHaveBeenCalledWith('someName');
  });

  it('should call paymentSelected(card)', () => {
    component.paymentSelected({ code: 'test select payment' });
    expect(
      component.payment['controls'].cardType['controls'].code.value
    ).toEqual('test select payment');
  });

  it('should call monthSelected(month)', () => {
    component.monthSelected({ id: '05' });
    expect(component.payment['controls'].expiryMonth.value).toEqual('05');
  });

  it('should call yearSelected(year)', () => {
    component.yearSelected({ name: '2022' });
    expect(component.payment['controls'].expiryYear.value).toEqual('2022');
  });

  it('should call getAddressCardContent(address)', () => {
    const card = component.getAddressCardContent(mockAddress);
    expect(card.textBold).toEqual('John Doe');
    expect(card.text).toEqual([
      'Toyosaki 2 create on cart',
      'line2',
      'town, JP-27, JP',
      'zip',
      undefined
    ]);
  });
});
