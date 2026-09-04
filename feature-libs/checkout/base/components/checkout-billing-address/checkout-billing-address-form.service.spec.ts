import { TestBed } from '@angular/core/testing';
import { Address } from '@spartacus/core';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import { CheckoutBillingAddressFormService } from './checkout-billing-address-form.service';
const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  line1: '123 Main St',
  town: 'Anytown',
  region: { isocodeShort: 'CA' },
  country: { isocode: 'US' },
  postalCode: '12345',
};
describe('CheckoutBillingAddressFormComponentService', () => {
  let service: CheckoutBillingAddressFormService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckoutBillingAddressFormService],
    });
    service = TestBed.inject(CheckoutBillingAddressFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getBillingAddressForm', () => {
    it('should create and return a form group with default values', () => {
      const form = service.getBillingAddressForm();
      expect(form).toBeTruthy();
      expect(form.get('firstName')).toBeTruthy();
      expect(form.get('lastName')).toBeTruthy();
      expect(form.get('line1')).toBeTruthy();
      expect(form.get('line2')).toBeTruthy();
      expect(form.get('town')).toBeTruthy();
      expect(form.get('region.isocodeShort')).toBeTruthy();
      expect(form.get('country.isocode')).toBeTruthy();
      expect(form.get('postalCode')).toBeTruthy();
    });
    it('should return the same form group instance if called multiple times', () => {
      const form1 = service.getBillingAddressForm();
      const form2 = service.getBillingAddressForm();
      expect(form1).toBe(form2);
    });
  });
  describe('setDeliveryAddressAsBillingAddress', () => {
    it('should set the billing address', () => {
      service.setDeliveryAddressAsBillingAddress(mockAddress);
      expect(service['billingAddress']).toEqual(mockAddress);
    });
    it('should set billing address to undefined', () => {
      service.setDeliveryAddressAsBillingAddress(undefined);
      expect(service['billingAddress']).toBeUndefined();
    });
  });
  describe('isBillingAddressSameAsDeliveryAddress', () => {
    it('should return false if billing address is undefined', () => {
      service.setDeliveryAddressAsBillingAddress(undefined);
      expect(service.isBillingAddressSameAsDeliveryAddress()).toEqual(false);
    });

    it('should return true if billing address is defined', () => {
      service.setDeliveryAddressAsBillingAddress(mockAddress);
      expect(service.isBillingAddressSameAsDeliveryAddress()).toEqual(true);
    });
  });
  describe('isBillingAddressFormValid', () => {
    it('should return false if form is invalid', () => {
      const form = service.getBillingAddressForm();
      form.patchValue({ firstName: '', lastName: '' });
      expect(service.isBillingAddressFormValid()).toEqual(false);
    });

    it('should return true if form is valid', () => {
      const form = service.getBillingAddressForm();
      form.patchValue(mockAddress);
      expect(service.isBillingAddressFormValid()).toEqual(true);
    });
  });
  describe('markAllAsTouched', () => {
    it('should mark all form controls as touched', () => {
      const form = service.getBillingAddressForm();
      vi.spyOn(form, 'markAllAsTouched');
      service.markAllAsTouched();
      expect(form.markAllAsTouched).toHaveBeenCalled();
    });
  });
  describe('getBillingAddress', () => {
    it('should return the billing address if it is defined', () => {
      service.setDeliveryAddressAsBillingAddress(mockAddress);
      expect(service.getBillingAddress()).toEqual(mockAddress);
    });

    it('should return the form value if billing address is undefined', () => {
      service.setDeliveryAddressAsBillingAddress(undefined);
      const form = service.getBillingAddressForm();
      form.patchValue(mockAddress);
      expect(service.getBillingAddress()).toEqual(form.value);
    });
  });
});

describe('CheckoutBillingAddressFormService — enableFormFieldMaxLength', () => {
  const overLength = 'a'.repeat(257);

  describe('when enabled', () => {
    let service: CheckoutBillingAddressFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CheckoutBillingAddressFormService,
          ...provideMockFeatureToggles({ enableFormFieldMaxLength: true }),
        ],
      });
      service = TestBed.inject(CheckoutBillingAddressFormService);
    });

    it('should add maxLength validator to form fields', () => {
      const control = service.getBillingAddressForm().get('firstName');
      control?.setValue(overLength);
      expect(control?.hasError('maxlength')).toBe(true);
    });
  });

  describe('when disabled', () => {
    let service: CheckoutBillingAddressFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          CheckoutBillingAddressFormService,
          ...provideMockFeatureToggles({ enableFormFieldMaxLength: false }),
        ],
      });
      service = TestBed.inject(CheckoutBillingAddressFormService);
    });

    it('should not add maxLength validator to form fields', () => {
      const control = service.getBillingAddressForm().get('firstName');
      control?.setValue(overLength);
      expect(control?.hasError('maxlength')).toBe(false);
    });
  });
});
