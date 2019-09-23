import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Type } from '@angular/core';

import {
  Address,
  CheckoutDeliveryService,
  FeatureConfigService,
  I18nTestingModule,
  UserAddressService,
} from '@spartacus/core';

import { AddressCardComponent } from './address-card.component';

class MockUserAddressService {
  deleteUserAddress = jasmine.createSpy();
  setAddressAsDefault = jasmine.createSpy();
}

const mockAddress: Address = {
  id: '123',
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
  defaultAddress: false,
};

class MockCheckoutDeliveryService {
  clearCheckoutDeliveryDetails = jasmine.createSpy();
}

class MockFeatureConfigService {
  isLevel(_featureLevel: string): boolean {
    return true;
  }
}

describe('AddressCardComponent', () => {
  let component: AddressCardComponent;
  let fixture: ComponentFixture<AddressCardComponent>;
  let userAddressService: UserAddressService;
  let checkoutDeliveryService: CheckoutDeliveryService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [AddressCardComponent],
      providers: [
        { provide: UserAddressService, useClass: MockUserAddressService },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressCardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    userAddressService = TestBed.get(UserAddressService as Type<
      UserAddressService
    >);
    checkoutDeliveryService = TestBed.get(CheckoutDeliveryService as Type<
      CheckoutDeliveryService
    >);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display address data', () => {
    component.address = mockAddress;
    fixture.detectChanges();
    const element = el.query(By.css('.cx-address-data'));
    expect(element.nativeElement.textContent).toContain(
      mockAddress.firstName &&
        mockAddress.lastName &&
        mockAddress.line1 &&
        mockAddress.line2 &&
        mockAddress.town &&
        mockAddress.country.isocode &&
        mockAddress.postalCode
    );
  });

  it('should display default label on address default', () => {
    component.address = mockAddress;
    component.address.defaultAddress = true;
    fixture.detectChanges();
    const element = el.query(By.css('.card-header'));
    expect(element.nativeElement.textContent).toContain(
      ' ✓ addressCard.default '
    );
  });

  describe('setAddressAsDefault', () => {
    it('should set Address as default', () => {
      component.setAddressAsDefault(mockAddress[0]);
      expect(userAddressService.setAddressAsDefault).toHaveBeenCalledWith(
        mockAddress[0]
      );
    });

    it('should clear checkout delivery details', () => {
      component.setAddressAsDefault(mockAddress[0]);
      expect(
        checkoutDeliveryService.clearCheckoutDeliveryDetails
      ).toHaveBeenCalled();
    });
  });

  describe('deleteAddress', () => {
    it('should set delete user Address', () => {
      component.deleteAddress('1');
      expect(userAddressService.deleteUserAddress).toHaveBeenCalledWith('1');
    });

    it('should clear checkout delivery details', () => {
      component.deleteAddress('1');
      expect(
        checkoutDeliveryService.clearCheckoutDeliveryDetails
      ).toHaveBeenCalled();
    });
  });
});
