import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { PaymentFormComponent } from './payment-form.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';

import { CheckoutService } from '../../../services/checkout.service';
import { CartService } from '../../../../cart/services/cart.service';
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

  let fb: FormBuilder;
  let ac: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cart: combineReducers(fromCart.reducers),
          user: combineReducers(fromUser.reducers),
          checkout: combineReducers(fromCheckout.reducers)
        })
      ],
      declarations: [PaymentFormComponent],
      providers: [
        CheckoutService,
        CartService,
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

    fb = TestBed.get(FormBuilder);
    ac = TestBed.get(AbstractControl);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(ac, 'hasError').and.callThrough();
    spyOn(service, 'loadSupportedCardTypes').and.callThrough();

    spyOn(component.addPaymentInfo, 'emit').and.callThrough();
    spyOn(component.backStep, 'emit').and.callThrough();
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

  it('should call next()', () => {
    component.next();
    expect(component.addPaymentInfo.emit).toHaveBeenCalledWith({
      payment: component.payment.value,
      newPayment: true
    });
  });

  it('should call back()', () => {
    component.back();
    expect(component.backStep.emit).toHaveBeenCalled();
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
