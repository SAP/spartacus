/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Address, Country } from '@spartacus/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { OpfCheckoutBillingAddressFormComponent } from './opf-checkout-billing-address-form.component';
import { OpfCheckoutBillingAddressFormService } from './opf-checkout-billing-address-form.service';

class Service {
  billingAddress$ = new BehaviorSubject<Address | undefined>(undefined);
  isLoadingAddress$ = new BehaviorSubject<boolean>(false);
  isSameAsDelivery$ = new BehaviorSubject<boolean>(true);

  getCountries(): Observable<Country[]> {
    return EMPTY;
  }

  getAddresses(): void {}

  putDeliveryAddressAsPaymentAddress(): void {}

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
}

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

describe('OpfCheckoutBillingAddressFormComponent', () => {
  let component: OpfCheckoutBillingAddressFormComponent;
  let fixture: ComponentFixture<OpfCheckoutBillingAddressFormComponent>;
  let service: OpfCheckoutBillingAddressFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpfCheckoutBillingAddressFormComponent, MockTranslatePipe],
      providers: [
        {
          provide: OpfCheckoutBillingAddressFormService,
          useClass: Service,
        },
      ],
    }).compileComponents();

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

    component.ngOnInit();

    expect(component.countries$).toBeDefined();
    expect(service.getCountries).toHaveBeenCalled();
    expect(service.getAddresses).toHaveBeenCalled();
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
    const putDeliveryAddressAsPaymentAddressSpy = spyOn(
      service,
      'putDeliveryAddressAsPaymentAddress'
    );
    const setIsSameAsDeliveryValueSpy = spyOn(
      service,
      'setIsSameAsDeliveryValue'
    );
    component.isAddingBillingAddressInProgress = true;

    component.toggleSameAsDeliveryAddress(mockEvent);

    expect(setIsSameAsDeliveryValueSpy).toHaveBeenCalledWith(true);
    expect(putDeliveryAddressAsPaymentAddressSpy).toHaveBeenCalled();
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
});
