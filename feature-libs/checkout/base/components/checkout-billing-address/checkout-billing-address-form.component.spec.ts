import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CheckoutDeliveryAddressFacade } from '@spartacus/checkout/base/root';
import {
  Address,
  AddressValidation,
  Country,
  GlobalMessageService,
  I18nTestingModule,
  UserAddressService,
  UserPaymentService,
} from '@spartacus/core';
import {
  FormErrorsModule,
  LaunchDialogService,
  NgSelectA11yModule,
} from '@spartacus/storefront';
import { EMPTY, firstValueFrom, of } from 'rxjs';
import { CheckoutBillingAddressFormComponent } from './checkout-billing-address-form.component';
import { CheckoutBillingAddressFormService } from './checkout-billing-address-form.service';

const mockBillingCountries: Country[] = [
  {
    isocode: 'CA',
    name: 'Canada',
  },
];

const mockBillingCountriesEmpty: Country[] = [];

const mockAddress: Address = {
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
};

@Component({
  selector: 'cx-card',
  template: '',
  imports: [
    ReactiveFormsModule,
    NgSelectModule,
    NgSelectA11yModule,
    I18nTestingModule,
    FormErrorsModule,
  ],
})
class MockCardComponent {
  @Input()
  content: any;
}

class MockCheckoutDeliveryService
  implements Partial<CheckoutDeliveryAddressFacade>
{
  getDeliveryAddressState = vi.fn().mockReturnValue(
    of({ loading: false, error: false, data: undefined })
  );
  getAddressVerificationResults = vi.fn().mockReturnValue(EMPTY);
  verifyAddress = vi.fn();
  clearAddressVerificationResults = vi.fn();
}

class MockUserPaymentService implements Partial<UserPaymentService> {
  loadBillingCountries = vi.fn();
  getAllBillingCountries = vi.fn().mockReturnValue(
    of(mockBillingCountries)
  );
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn();
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe() {
    return EMPTY;
  }
}
class MockUserAddressService implements Partial<UserAddressService> {
  getRegions = vi.fn().mockReturnValue(of([]));
  verifyAddress = vi.fn().mockReturnValue(of({}));
}

describe('CheckoutBillingAddressFormComponent', () => {
  let component: CheckoutBillingAddressFormComponent;
  let fixture: ComponentFixture<CheckoutBillingAddressFormComponent>;
  let mockCheckoutDeliveryService: MockCheckoutDeliveryService;
  let mockUserPaymentService: MockUserPaymentService;
  let mockGlobalMessageService: MockGlobalMessageService;
  let userAddressService: UserAddressService;

  beforeEach(async () => {
    mockCheckoutDeliveryService = new MockCheckoutDeliveryService();
    mockUserPaymentService = new MockUserPaymentService();
    mockGlobalMessageService = new MockGlobalMessageService();

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        NgSelectA11yModule,
        I18nTestingModule,
        FormErrorsModule,
        CheckoutBillingAddressFormComponent,
        MockCardComponent,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        {
          provide: CheckoutDeliveryAddressFacade,
          useValue: mockCheckoutDeliveryService,
        },
        { provide: UserPaymentService, useValue: mockUserPaymentService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        { provide: UserAddressService, useClass: MockUserAddressService },
        CheckoutBillingAddressFormService,
      ],
    })
      .overrideComponent(CheckoutBillingAddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  beforeEach(() => {
    userAddressService = TestBed.inject(UserAddressService);
    fixture = TestBed.createComponent(CheckoutBillingAddressFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call ngOnInit to get billing countries', async () => {
      mockUserPaymentService.getAllBillingCountries =
        vi.fn().mockReturnValue(of(mockBillingCountries));
      component.ngOnInit();
      const countries = await firstValueFrom(component.countries$);
      expect(countries).toBe(mockBillingCountries);
    });
    it('should call ngOnInit to get delivery address set in cart', async () => {
      mockCheckoutDeliveryService.getDeliveryAddressState =
        vi.fn().mockReturnValue(
          of({ loading: false, error: false, data: mockAddress })
        );
      component.ngOnInit();
      const address = await firstValueFrom(component.deliveryAddress$);
      expect(address).toBe(mockAddress);
    });
    it('should call ngOnInit to load billing countries', async () => {
      mockUserPaymentService.getAllBillingCountries =
        vi.fn().mockReturnValue(of(mockBillingCountriesEmpty));

      component.ngOnInit();
      const countries = await firstValueFrom(component.countries$);
      expect(countries).toBe(mockBillingCountriesEmpty);
      expect(mockUserPaymentService.loadBillingCountries).toHaveBeenCalled();
    });
    it('should add address with address verification result "accept"', () => {
      const mockAddressVerificationResult = { decision: 'ACCEPT' };
      component.ngOnInit();
      component['handleAddressVerificationResults'](
        mockAddressVerificationResult
      );
    });
    it('should display error message with address verification result "reject"', () => {
      const mockAddressVerificationResult: AddressValidation = {
        decision: 'REJECT',
      };
      component.ngOnInit();
      component['handleAddressVerificationResults'](
        mockAddressVerificationResult
      );
      expect(mockGlobalMessageService.add).toHaveBeenCalled();
    });
    it('should open suggested address with address verification result "review"', () => {
      const mockAddressVerificationResult: AddressValidation = {
        decision: 'REVIEW',
      };
      vi.spyOn(component, 'openSuggestedAddress');
      component.ngOnInit();
      component['handleAddressVerificationResults'](
        mockAddressVerificationResult
      );
      expect(component.openSuggestedAddress).toHaveBeenCalled();
    });
  });

  it('should call toggleSameAsDeliveryAddress()', () => {
    vi.spyOn(component, 'toggleSameAsDeliveryAddress');
    component.sameAsDeliveryAddress = true;

    component.toggleSameAsDeliveryAddress();

    expect(component.toggleSameAsDeliveryAddress).toHaveBeenCalled();
    expect(component.sameAsDeliveryAddress).toBeFalsy();
  });

  it('should call getAddressCardContent(address)', async () => {
    const card = await firstValueFrom(component.getAddressCardContent(mockAddress));
    expect(card?.textBold).toEqual('John Doe');
    expect(card?.text).toEqual([
      'Toyosaki 2 create on cart',
      'line2',
      'town, JP-27, JP',
      'zip',
      undefined,
    ]);
  });

  it('should call verifyAddress() when billing address not same as shipping', () => {
    userAddressService.verifyAddress = vi.fn().mockReturnValue(
      of({
        decision: 'ACCEPT',
      })
    );
    component.sameAsDeliveryAddress = true;
    component.verifyAddress();
    expect(userAddressService.verifyAddress).not.toHaveBeenCalled();
    component.sameAsDeliveryAddress = false;
    component.verifyAddress();
    expect(userAddressService.verifyAddress).toHaveBeenCalled();
  });
});
