/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import { CheckoutStepService } from '@spartacus/checkout/base/components';
import {
  Address,
  BaseSiteService,
  Country,
  MockTranslatePipe,
  TranslatePipe,
  UserAddressAdapter,
} from '@spartacus/core';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { OpfCheckoutBillingAddressFormComponent } from './opf-checkout-billing-address-form.component';
import { OpfCheckoutBillingAddressFormService } from './opf-checkout-billing-address-form.service';

class Service {
  billingAddress$ = new BehaviorSubject<Address | undefined>(undefined);
  isLoadingAddress$ = new BehaviorSubject<boolean>(false);
  isSameAsDelivery$ = new BehaviorSubject<boolean>(true);
  pickupNoDefaultAddress$ = new Subject<void>();

  getCountries(): Observable<Country[]> {
    return EMPTY;
  }

  getAddresses(): void {}

  setDeliveryAddressAsPaymentAddress(): void {}

  setBillingAddress(address: Address): Observable<Address | undefined> {
    return of(address);
  }

  get billingAddressValue(): Address | undefined {
    return this.billingAddress$.value;
  }

  get isSameAsDeliveryValue(): boolean {
    return this.isSameAsDelivery$.value;
  }

  setIsSameAsDeliveryValue(value: boolean): void {
    this.isSameAsDelivery$.next(value);
  }
  setDefaultBillingAddress(): void {}
}

describe('OpfCheckoutBillingAddressFormComponent', () => {
  let component: OpfCheckoutBillingAddressFormComponent;
  let fixture: ComponentFixture<OpfCheckoutBillingAddressFormComponent>;
  let service: OpfCheckoutBillingAddressFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OpfCheckoutBillingAddressFormComponent],
      providers: [
        {
          provide: OpfCheckoutBillingAddressFormService,
          useClass: Service,
        },
        {
          provide: ActiveCartFacade,
          useValue: {
            getActive: () => of({ code: '123', totalItems: 2 }),
          },
        },
        { provide: Store, useValue: {} },
        { provide: UserAddressAdapter, useValue: {} },
        { provide: CheckoutStepService, useValue: {} },
        { provide: BaseSiteService, useValue: {} },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
    })
      .overrideComponent(OpfCheckoutBillingAddressFormComponent, {
        remove: {
          imports: [TranslatePipe],
        },
        add: {
          imports: [MockTranslatePipe],
        },
      })
      .compileComponents();

    service = TestBed.inject(OpfCheckoutBillingAddressFormService);
    fixture = TestBed.createComponent(OpfCheckoutBillingAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize countries and addresses on ngOnInit', () => {
    const countries = [{ id: '1', name: 'Country 1' }];
    spyOn(service, 'getCountries').and.returnValue(of(countries));
    spyOn(service, 'getAddresses');
    spyOn(service, 'setDefaultBillingAddress');

    component.ngOnInit();

    expect(component.countries$).toBeDefined();
    expect(service.getCountries).toHaveBeenCalled();
    expect(service.getAddresses).toHaveBeenCalled();
    expect(service.setDefaultBillingAddress).toHaveBeenCalled();
  });

  it('should cancel and hide form on cancelAndHideForm', () => {
    const setIsSameAsDeliveryValueSpy = spyOn(
      service,
      'setIsSameAsDeliveryValue'
    );
    component.isEditBillingAddress = true;
    component.isAddingBillingAddressInProgress = true;

    component.cancelAndHideForm();

    expect(component.isEditBillingAddress).toBe(false);
    expect(setIsSameAsDeliveryValueSpy).toHaveBeenCalledWith(true);
    expect(component.isAddingBillingAddressInProgress).toBe(false);
  });

  it('should set isEditBillingAddress to true on editCustomBillingAddress', () => {
    component.editCustomBillingAddress();
    expect(component.isEditBillingAddress).toBe(true);
  });

  it('should toggle same as delivery address on toggleSameAsDeliveryAddress', () => {
    const mockEvent = { target: { checked: true } as unknown } as Event;
    const setDeliveryAddressAsPaymentAddress = spyOn(
      service,
      'setDeliveryAddressAsPaymentAddress'
    );
    const setIsSameAsDeliveryValueSpy = spyOn(
      service,
      'setIsSameAsDeliveryValue'
    );
    component.isAddingBillingAddressInProgress = true;

    component.toggleSameAsDeliveryAddress(mockEvent);

    expect(setIsSameAsDeliveryValueSpy).toHaveBeenCalledWith(true);
    expect(setDeliveryAddressAsPaymentAddress).toHaveBeenCalled();
    expect(component.isEditBillingAddress).toBe(false);
  });

  it('should return billingAddress if valid and not adding on getAddressData', () => {
    component.isAddingBillingAddressInProgress = false;
    const billingAddress = { id: '1', streetName: '123 Main St' };

    const result = component.getAddressData(billingAddress);

    expect(result).toEqual(billingAddress);
  });

  it('should reset flags and call setBillingAddress on onSubmitAddress', () => {
    spyOn(service, 'setBillingAddress').and.returnValue(of());
    const address = { id: '1', streetName: '456 Elm St' };

    component.onSubmitAddress(address);

    expect(component.isEditBillingAddress).toBe(false);
    expect(component.isAddingBillingAddressInProgress).toBe(false);
    expect(service.setBillingAddress).toHaveBeenCalledWith(address);
  });

  it('should not call setBillingAddress if address is falsy on onSubmitAddress', () => {
    spyOn(service, 'setBillingAddress');
    const address = null as unknown as Address;

    component.onSubmitAddress(address);

    expect(service.setBillingAddress).not.toHaveBeenCalled();
  });

  it('should set flags correctly when toggleSameAsDeliveryAddress is called with checked = false', () => {
    const mockEvent = { target: { checked: false } as unknown } as Event;

    component.isAddingBillingAddressInProgress = false;
    component.isEditBillingAddress = false;

    component.toggleSameAsDeliveryAddress(mockEvent);

    expect(component.isAddingBillingAddressInProgress).toBe(true);
    expect(component.isEditBillingAddress).toBe(true);
  });

  it('should return an empty object when billingAddress is falsy and isAddingBillingAddressInProgress is true', () => {
    const billingAddress: Address | undefined | null = null;
    component.isAddingBillingAddressInProgress = true;

    const result = component.getAddressData(billingAddress);

    expect(result).toEqual({});
  });
});
