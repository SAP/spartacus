import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../auth/store';

import { MultiStepCheckoutComponent } from './multi-step-checkout.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { DeliveryModeFormComponent } from '../delivery-mode-form/delivery-mode-form.component';

import { CheckoutService } from './../../../services/checkout.service';
import { CartService } from './../../../../cart/services/cart.service';

describe('MultiStepCheckoutComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: MultiStepCheckoutComponent;
  let fixture: ComponentFixture<MultiStepCheckoutComponent>;
  let service: CheckoutService;

  beforeEach(
    async(() => {
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
        declarations: [
          MultiStepCheckoutComponent,
          AddressFormComponent,
          DeliveryModeFormComponent,
          OrderSummaryComponent
        ],
        providers: [CheckoutService, CartService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStepCheckoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(service, 'createAndSetAddress').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call setStep()', () => {
    component.step = 2;
    component.setStep(1);
    expect(component.step).toBe(1);

    component.step = 2;
    component.setStep(3);
    expect(component.step).toBe(2);
  });

  it('should call addAddress()', () => {
    const address: any = {
      id: 'testAddressId',
      firstName: 'John',
      lastName: 'Doe',
      titleCode: 'mr',
      line1: 'Toyosaki 2 create on cart'
    };
    spyOn(store, 'select').and.returnValue(of(address));

    component.addAddress(address);
    expect(service.createAndSetAddress).toHaveBeenCalledWith(address);
    expect(component.step).toBe(2);
  });
});
