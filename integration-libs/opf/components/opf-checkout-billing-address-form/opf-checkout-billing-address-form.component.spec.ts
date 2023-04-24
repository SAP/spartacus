import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CheckoutDeliveryAddressFacade,
  CheckoutPaymentFacade,
} from '@spartacus/checkout/base/root';
import {
  Address,
  Country,
  I18nTestingModule,
  UserPaymentService,
} from '@spartacus/core';
import { Card, IconTestingModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { OpfCheckoutBillingAddressFormComponent } from './opf-checkout-billing-address-form.component';
import createSpy = jasmine.createSpy;

const mockAddress = {
  firstName: 'John',
  lastName: 'Doe',
  line1: 'Street 1',
  line2: 'Street 2',
  town: 'Town',
  region: { isocode: 'Region' },
  country: { isocode: 'Country' },
  postalCode: 'Postal Code',
  phone: 'Phone',
};

const mockCountries = [{ isocode: 'Country', name: 'Test' }];

class MockCheckoutDeliveryAddressService
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: mockAddress })
  );
}

class MockUserPaymentService implements Partial<UserPaymentService> {
  getAllBillingCountries = createSpy().and.returnValue(of(mockCountries));
  loadBillingCountries = () => {};
}

class MockCheckoutPaymentService implements Partial<CheckoutPaymentFacade> {
  createPaymentDetails = createSpy().and.returnValue(of());
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-address-form',
  template: '',
})
class MockAddressFormComponent {
  @Input() showTitleCode: boolean;
  @Input() setAsDefaultField: boolean;
  @Input() showCancelBtn: boolean;
  @Input() addressData: Address;
  @Input() actionBtnLabel: any;
  @Input() cancelBtnLabel: any;
  @Input() submitAddress: any;
  @Input() backToAddress: any;
  @Input() countries: Country[];
}

@Component({
  selector: 'cx-card',
  template: '',
})
class MockCardComponent {
  @Input()
  content: Card;
}

describe('OpfCheckoutBillingAddressFormComponent', () => {
  let component: OpfCheckoutBillingAddressFormComponent;
  let fixture: ComponentFixture<OpfCheckoutBillingAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, IconTestingModule],
      declarations: [
        OpfCheckoutBillingAddressFormComponent,
        MockUrlPipe,
        MockAddressFormComponent,
        MockCardComponent,
      ],
      providers: [
        {
          provide: CheckoutDeliveryAddressFacade,
          useClass: MockCheckoutDeliveryAddressService,
        },
        { provide: UserPaymentService, useClass: MockUserPaymentService },
        {
          provide: CheckoutPaymentFacade,
          useClass: MockCheckoutPaymentService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpfCheckoutBillingAddressFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
