import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Address,
  AddressValidation,
  CheckoutDeliveryService,
  Country,
  GlobalMessageService,
  I18nTestingModule,
  Region,
  Title,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import { ModalService } from '../../../../../shared/components/modal/index';
import { AddressFormComponent } from './address-form.component';
import createSpy = jasmine.createSpy;

class MockUserService {
  getTitles(): Observable<Title[]> {
    return of();
  }

  loadTitles(): void {}
}

class MockUserAddressService {
  getDeliveryCountries(): Observable<Country[]> {
    return of();
  }

  loadDeliveryCountries(): void {}

  getRegions(): Observable<Region[]> {
    return of();
  }
}

const mockTitles: Title[] = [
  {
    code: 'mr',
    name: 'Mr.',
  },
  {
    code: 'mrs',
    name: 'Mrs.',
  },
];
const expectedTitles: Title[] = [{ code: '', name: 'Title' }, ...mockTitles];
const mockCountries: Country[] = [
  {
    isocode: 'AD',
    name: 'Andorra',
  },
  {
    isocode: 'RS',
    name: 'Serbia',
  },
];
const mockRegions: Region[] = [
  {
    isocode: 'CA-ON',
    name: 'Ontario',
  },
  {
    isocode: 'CA-QC',
    name: 'Quebec',
  },
];

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

const mockSuggestedAddressModalRef: any = {
  componentInstance: {
    enteredAddress: '',
    suggestedAddresses: '',
  },
  result: new Promise(resolve => {
    return resolve(true);
  }),
};

class MockModalService {
  open(): any {
    return mockSuggestedAddressModalRef;
  }
}

const mockAddressValidation: AddressValidation = {
  decision: 'test address validation',
  suggestedAddresses: [{ id: 'address1' }],
};

class MockCheckoutDeliveryService {
  clearAddressVerificationResults = createSpy();
  verifyAddress = createSpy();
  getAddressVerificationResults(): Observable<AddressValidation> {
    return of({ decision: 'ACCEPT' });
  }
}

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let controls: FormGroup['controls'];

  let mockCheckoutDeliveryService: CheckoutDeliveryService;
  let userAddressService: UserAddressService;
  let userService: UserService;
  let mockGlobalMessageService: any;
  let mockModalService: MockModalService;

  beforeEach(async(() => {
    mockGlobalMessageService = {
      add: createSpy(),
    };
    mockModalService = new MockModalService();

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgSelectModule, I18nTestingModule],
      declarations: [AddressFormComponent],
      providers: [
        { provide: ModalService, useValue: { open: () => {} } },
        {
          provide: CheckoutDeliveryService,
          useClass: MockCheckoutDeliveryService,
        },
        { provide: UserService, useClass: MockUserService },
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        { provide: ModalService, useClass: MockModalService },
      ],
    })
      .overrideComponent(AddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    userService = TestBed.inject(UserService);
    userAddressService = TestBed.inject(UserAddressService);
    mockCheckoutDeliveryService = TestBed.inject(CheckoutDeliveryService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    controls = component.address.controls;
    component.showTitleCode = true;

    spyOn(component.submitAddress, 'emit').and.callThrough();
    spyOn(component.backToAddress, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get countries and titles data even when they not exist', done => {
    spyOn(userAddressService, 'getDeliveryCountries').and.returnValue(of([]));
    spyOn(userAddressService, 'loadDeliveryCountries').and.stub();

    spyOn(userService, 'getTitles').and.returnValue(of([]));
    spyOn(userService, 'loadTitles').and.stub();

    spyOn(userAddressService, 'getRegions').and.returnValue(of([]));

    spyOn(
      mockCheckoutDeliveryService,
      'getAddressVerificationResults'
    ).and.returnValue(of({}));
    component.ngOnInit();

    component.countries$
      .subscribe(() => {
        expect(userAddressService.loadDeliveryCountries).toHaveBeenCalled();
        done();
      })
      .unsubscribe();

    component.titles$
      .subscribe(() => {
        expect(userService.loadTitles).toHaveBeenCalled();
        done();
      })
      .unsubscribe();
  });

  it('should call ngOnInit to get countries, titles and regions data when data exist', () => {
    spyOn(userAddressService, 'getDeliveryCountries').and.returnValue(
      of(mockCountries)
    );
    spyOn(userService, 'getTitles').and.returnValue(of(mockTitles));
    spyOn(userAddressService, 'getRegions').and.returnValue(of(mockRegions));

    spyOn(
      mockCheckoutDeliveryService,
      'getAddressVerificationResults'
    ).and.returnValue(of({}));

    component.ngOnInit();

    let countries: Country[];
    component.countries$
      .subscribe(data => {
        countries = data;
      })
      .unsubscribe();
    let titles: Title[];
    component.titles$
      .subscribe(data => {
        titles = data;
      })
      .unsubscribe();
    let regions: Region[];
    component.regions$
      .subscribe(data => {
        regions = data;
      })
      .unsubscribe();

    expect(countries).toBe(mockCountries);
    expect(titles).toEqual(expectedTitles);
    expect(regions).toBe(mockRegions);
  });

  it('should add address with address verification result "accept"', () => {
    spyOn(userAddressService, 'getDeliveryCountries').and.returnValue(of([]));
    spyOn(userService, 'getTitles').and.returnValue(of([]));
    spyOn(userAddressService, 'getRegions').and.returnValue(of([]));

    const mockAddressVerificationResult: AddressValidation = {
      decision: 'ACCEPT',
    };
    spyOn(
      mockCheckoutDeliveryService,
      'getAddressVerificationResults'
    ).and.returnValue(of(mockAddressVerificationResult));

    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(component.submitAddress.emit).toHaveBeenCalledWith(
      component.address.value
    );
  });

  it('should clear address verification result with address verification result "reject"', () => {
    spyOn(userAddressService, 'getDeliveryCountries').and.returnValue(of([]));
    spyOn(userService, 'getTitles').and.returnValue(of([]));
    spyOn(userAddressService, 'getRegions').and.returnValue(of([]));

    const mockAddressVerificationResult: AddressValidation = {
      decision: 'REJECT',
      errors: {
        errors: [{ subject: 'No' }],
      },
    };
    spyOn(
      mockCheckoutDeliveryService,
      'getAddressVerificationResults'
    ).and.returnValue(of(mockAddressVerificationResult));

    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(
      mockCheckoutDeliveryService.clearAddressVerificationResults
    ).toHaveBeenCalledWith();
    mockAddressVerificationResult.errors.errors = [{ subject: 'titleCode' }];
    component.ngOnInit();
    expect(mockGlobalMessageService.add).toHaveBeenCalled();
  });

  it('should clear address verification result with address verification result "fail"', () => {
    const mockAddressVerificationResult: AddressValidation = {
      decision: 'FAIL',
    };
    component.addressData = mockAddress;
    spyOn(
      mockCheckoutDeliveryService,
      'getAddressVerificationResults'
    ).and.returnValue(of(mockAddressVerificationResult));
    component.ngOnInit();
    expect(
      mockCheckoutDeliveryService.clearAddressVerificationResults
    ).toHaveBeenCalled();
  });

  it('should open suggested address with address verification result "review"', () => {
    spyOn(userAddressService, 'getDeliveryCountries').and.returnValue(of([]));
    spyOn(userService, 'getTitles').and.returnValue(of([]));
    spyOn(userAddressService, 'getRegions').and.returnValue(of([]));

    const mockAddressVerificationResult: AddressValidation = {
      decision: 'REVIEW',
    };
    spyOn(
      mockCheckoutDeliveryService,
      'getAddressVerificationResults'
    ).and.returnValue(of(mockAddressVerificationResult));

    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(component.openSuggestedAddress).toHaveBeenCalledWith(
      mockAddressVerificationResult
    );
  });

  it('should call verifyAddress() when address has some changes', () => {
    component.address.markAsDirty();
    component.verifyAddress();
    expect(mockCheckoutDeliveryService.verifyAddress).toHaveBeenCalled();
  });

  it('should not call verifyAddress() when address does not have change', () => {
    component.verifyAddress();
    expect(mockCheckoutDeliveryService.verifyAddress).not.toHaveBeenCalled();
  });

  it('should call back()', () => {
    component.back();
    expect(component.backToAddress.emit).toHaveBeenCalledWith();
  });

  it('should toggleDefaultAddress() adapt control value', () => {
    component.setAsDefaultField = true;
    fixture.detectChanges();
    const checkbox = fixture.debugElement.query(
      By.css('[formcontrolname=defaultAddress]')
    ).nativeElement;

    fixture.detectChanges();
    checkbox.click();

    expect(component.address.value.defaultAddress).toBeTruthy();
  });

  it('should call titleSelected()', () => {
    const mockTitleCode = 'test title code';
    component.titleSelected({ code: mockTitleCode });
    expect(component.address['controls'].titleCode.value).toEqual(
      mockTitleCode
    );
  });

  it('should call countrySelected()', () => {
    spyOn(userAddressService, 'getRegions').and.returnValue(of([]));
    const mockCountryIsocode = 'test country isocode';
    component.countrySelected({ isocode: mockCountryIsocode });
    component.ngOnInit();
    component.regions$.subscribe(_ => _);
    expect(
      component.address['controls'].country['controls'].isocode.value
    ).toEqual(mockCountryIsocode);
    expect(userAddressService.getRegions).toHaveBeenCalledWith(
      mockCountryIsocode
    );
  });

  it('should call regionSelected()', () => {
    const mockRegionIsocode = 'test region isocode';
    component.regionSelected({ isocode: mockRegionIsocode });
    expect(
      component.address['controls'].region['controls'].isocode.value
    ).toEqual(mockRegionIsocode);
  });

  it('should call openSuggestedAddress', () => {
    spyOn(component, 'openSuggestedAddress').and.callThrough();
    spyOn(mockModalService, 'open').and.callThrough();

    component.openSuggestedAddress(mockAddressValidation);
    component.suggestedAddressModalRef.result.then(() => {
      expect(
        mockCheckoutDeliveryService.clearAddressVerificationResults
      ).toHaveBeenCalled();
    });
  });

  it('should call verifyAddress', () => {
    spyOn(component, 'verifyAddress').and.callThrough();
    const mockCountryIsocode = 'test country isocode';
    component.regionSelected({ isocode: mockCountryIsocode });
    component.ngOnInit();
    component.regions$.subscribe(_ => _);
    component.verifyAddress();
    expect(
      component.address['controls'].region['controls'].isocode.value
    ).toEqual(mockCountryIsocode);
    expect(component.verifyAddress).toHaveBeenCalled();
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.btn-primary'));

    it('should call "verifyAddress" function when being clicked and when form is valid', () => {
      spyOn(userAddressService, 'getDeliveryCountries').and.returnValue(of([]));
      spyOn(userService, 'getTitles').and.returnValue(of([]));
      spyOn(userAddressService, 'getRegions').and.returnValue(of([]));
      spyOn(component, 'verifyAddress');

      fixture.detectChanges();

      getContinueBtn().nativeElement.click();
      expect(component.verifyAddress).toHaveBeenCalledTimes(1);

      controls['titleCode'].setValue('test titleCode');
      controls['firstName'].setValue('test firstName');
      controls['lastName'].setValue('test lastName');
      controls['line1'].setValue('test line1');
      controls['town'].setValue('test town');
      controls.region['controls'].isocode.setValue('test region isocode');
      controls.country['controls'].isocode.setValue('test country isocode');
      controls['postalCode'].setValue('test postalCode');
      fixture.detectChanges();

      getContinueBtn().nativeElement.click();
      expect(component.verifyAddress).toHaveBeenCalledTimes(2);
    });
  });

  describe('UI cancel button', () => {
    it('should show the "Back to cart", if it is provided as an input', () => {
      component.cancelBtnLabel = 'Back to cart';
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.btn-action').innerText
      ).toEqual('Back to cart');
    });

    it('should show the "Choose Address", if there is no "cancelBtnLabel" input provided', () => {
      component.cancelBtnLabel = undefined;
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelector('.btn-action').innerText
      ).toEqual('addressForm.chooseAddress');
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () => fixture.debugElement.query(By.css('.btn-action'));

    it('should default "showCancelBtn" to true and create button', () => {
      fixture.detectChanges();
      expect(getBackBtn()).toBeDefined();
    });

    it('should not create back button when "showCancelBtn" is false', () => {
      component.showCancelBtn = false;
      fixture.detectChanges();
      expect(getBackBtn()).toBeNull();
    });

    it('should create back button when "showCancelBtn" is true', () => {
      component.showCancelBtn = true;
      fixture.detectChanges();
      expect(getBackBtn()).toBeDefined();
    });

    it('should call "back" function after being clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'back');
      getBackBtn().nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    component.regionsSub = new Subscription();
    spyOn(component.regionsSub, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.regionsSub.unsubscribe).toHaveBeenCalled();
  });
});
