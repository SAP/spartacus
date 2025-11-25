import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
import { EMPTY, of } from 'rxjs';
import createSpy = jasmine.createSpy;
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
  getDeliveryAddressState = createSpy().and.returnValue(
    of({ loading: false, error: false, data: undefined })
  );
  getAddressVerificationResults = createSpy().and.returnValue(EMPTY);
  verifyAddress = createSpy();
  clearAddressVerificationResults = createSpy();
}

class MockUserPaymentService implements Partial<UserPaymentService> {
  loadBillingCountries = createSpy();
  getAllBillingCountries = createSpy().and.returnValue(
    of(mockBillingCountries)
  );
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe() {
    return EMPTY;
  }
}
class MockUserAddressService implements Partial<UserAddressService> {
  getRegions = createSpy().and.returnValue(of([]));
  verifyAddress = createSpy().and.returnValue(of({}));
}

describe('CheckoutBillingAddressFormComponent', () => {
  let component: CheckoutBillingAddressFormComponent;
  let fixture: ComponentFixture<CheckoutBillingAddressFormComponent>;
  let mockCheckoutDeliveryService: MockCheckoutDeliveryService;
  let mockUserPaymentService: MockUserPaymentService;
  let mockGlobalMessageService: MockGlobalMessageService;
  let userAddressService: UserAddressService;

  beforeEach(waitForAsync(() => {
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
  }));

  beforeEach(() => {
    userAddressService = TestBed.inject(UserAddressService);
    fixture = TestBed.createComponent(CheckoutBillingAddressFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call ngOnInit to get billing countries', (done) => {
      mockUserPaymentService.getAllBillingCountries =
        createSpy().and.returnValue(of(mockBillingCountries));
      component.ngOnInit();
      component.countries$.subscribe((countries: Country[]) => {
        expect(countries).toBe(mockBillingCountries);
        done();
      });
    });
    it('should call ngOnInit to get delivery address set in cart', (done) => {
      mockCheckoutDeliveryService.getDeliveryAddressState =
        createSpy().and.returnValue(
          of({ loading: false, error: false, data: mockAddress })
        );
      component.ngOnInit();
      component.deliveryAddress$.subscribe((address) => {
        expect(address).toBe(mockAddress);
        done();
      });
    });
    it('should call ngOnInit to load billing countries', (done) => {
      mockUserPaymentService.getAllBillingCountries =
        createSpy().and.returnValue(of(mockBillingCountriesEmpty));

      component.ngOnInit();
      component.countries$.subscribe((countries: Country[]) => {
        expect(countries).toBe(mockBillingCountriesEmpty);
        expect(mockUserPaymentService.loadBillingCountries).toHaveBeenCalled();
        done();
      });
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
      spyOn(component, 'openSuggestedAddress');
      component.ngOnInit();
      component['handleAddressVerificationResults'](
        mockAddressVerificationResult
      );
      expect(component.openSuggestedAddress).toHaveBeenCalled();
    });
  });

  it('should call toggleSameAsDeliveryAddress()', () => {
    spyOn(component, 'toggleSameAsDeliveryAddress').and.callThrough();
    component.sameAsDeliveryAddress = true;

    component.toggleSameAsDeliveryAddress();

    expect(component.toggleSameAsDeliveryAddress).toHaveBeenCalled();
    expect(component.sameAsDeliveryAddress).toBeFalsy();
  });

  it('should call getAddressCardContent(address)', (done) => {
    component.getAddressCardContent(mockAddress).subscribe((card) => {
      expect(card?.textBold).toEqual('John Doe');
      expect(card?.text).toEqual([
        'Toyosaki 2 create on cart',
        'line2',
        'town, JP-27, JP',
        'zip',
        undefined,
      ]);
      done();
    });
  });

  it('should call verifyAddress() when billing address not same as shipping', () => {
    userAddressService.verifyAddress = createSpy().and.returnValue(
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
