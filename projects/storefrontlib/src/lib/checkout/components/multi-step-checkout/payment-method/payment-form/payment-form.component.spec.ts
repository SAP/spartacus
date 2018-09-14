import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { PaymentFormComponent } from './payment-form.component';
import {
  ReactiveFormsModule,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { of } from 'rxjs';

import * as fromRoot from '../../../../../routing/store';
import * as fromCheckout from '../../../../store';
import * as fromCart from '../../../../../cart/store';
import * as fromUser from '../../../../../user/store';
import * as fromAuth from '../../../../../auth/store';

import { CheckoutService } from '../../../../services/checkout.service';
import { CartService } from '../../../../../cart/services/cart.service';
import { CartDataService } from '../../../../../cart/services/cart-data.service';
import { RouterTestingModule } from '@angular/router/testing';

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

const mockCardTypes = {
  cardTypes: [
    {
      code: 'amex',
      name: 'American Express'
    },
    {
      isocode: 'maestro',
      name: 'Maestro'
    }
  ]
};

describe('PaymentFormComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: PaymentFormComponent;
  let fixture: ComponentFixture<PaymentFormComponent>;
  let service: CheckoutService;

  let ac: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
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
    spyOn(store, 'select').and.returnValue(of({}));
    component.ngOnInit();
    component.cardTypes$.subscribe(() => {
      expect(service.loadSupportedCardTypes).toHaveBeenCalled();
    });
  });

  it('should call ngOnInit to get suppored card types if they exist', () => {
    spyOn(store, 'select').and.returnValue(of(mockCardTypes));
    component.ngOnInit();
    component.cardTypes$.subscribe(data => {
      expect(data).toBe(mockCardTypes);
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
});
