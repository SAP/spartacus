import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../auth/store';

import { MultiStepCheckoutComponent } from './multi-step-checkout.component';
import { AddressFormComponent } from '../address-form/address-form.component';
import { CheckoutService } from './../../../services/checkout.service';
import { CartService } from './../../../../cart/services/cart.service';

export class MockAbstractControl {
  hasError() {}
}

const mockTitlesList = {
  titles: [
    {
      code: 'mr',
      name: 'Mr.'
    },
    {
      code: 'mrs',
      name: 'Mrs.'
    }
  ]
};

const mockCountriesList = {
  countries: [
    {
      isocode: 'AL',
      name: 'Albania'
    },
    {
      isocode: 'AD',
      name: 'Andorra'
    }
  ]
};

describe('MultiStepCheckoutComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: MultiStepCheckoutComponent;
  let fixture: ComponentFixture<MultiStepCheckoutComponent>;
  let fb: FormBuilder;
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
        declarations: [MultiStepCheckoutComponent, AddressFormComponent],
        providers: [
          { provide: AbstractControl, useClass: MockAbstractControl },
          CheckoutService,
          CartService
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fb = TestBed.get(FormBuilder);
    fixture = TestBed.createComponent(MultiStepCheckoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CheckoutService);
    store = TestBed.get(Store);

    component.form = fb.group({
      address: fb.group({
        titleCode: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        line1: ['', Validators.required],
        line2: ['', Validators.required],
        town: ['', Validators.required],
        region: fb.group({
          isocode: ['', Validators.required]
        }),
        country: fb.group({
          isocode: ['', Validators.required]
        }),
        title: fb.group({
          code: ''
        }),
        postalCode: ['', Validators.required],
        phone: ''
      }),
      shippingMethod: fb.group({}),
      paymentMethod: fb.group({})
    });

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(service, 'createAndSetAddress').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get countries and titles data even when they not exist', () => {
    spyOn(store, 'select').and.returnValues(of({}), of({}));
    component.ngOnInit();
    component.countries$.subscribe(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.LoadDeliveryCountries()
      );
    });
    component.titles$.subscribe(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.LoadTitles()
      );
    });
  });

  it('should call ngOnInit to get countries and titles data when data exist', () => {
    spyOn(store, 'select').and.returnValues(
      of({ mockCountriesList }),
      of({ mockTitlesList })
    );
    component.ngOnInit();
    component.countries$.subscribe(data => {
      expect(data.mockCountriesList).toBe(mockCountriesList);
    });
    component.titles$.subscribe(data => {
      expect(data.mockTitlesList).toBe(mockTitlesList);
    });
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
