import {
  ChangeDetectionStrategy,
  DebugElement,
  Directive,
  Input,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Address,
  AddressValidation,
  Country,
  FeatureDirective,
  FeatureToggles,
  GlobalMessageService,
  HierarchicalAddressConfig,
  I18nTestingModule,
  LanguageService,
  Region,
  Title,
  UserAddressService,
} from '@spartacus/core';
import {
  FocusDirective,
  FocusFirstInvalidFieldDirective,
  FormErrorsModule,
  LaunchDialogService,
} from '@spartacus/storefront';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { BehaviorSubject, EMPTY, firstValueFrom, Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { vi } from 'vitest';
import { UserProfileFacade } from '../../../root/facade/user-profile.facade';
import { AddressFormComponent } from './address-form.component';

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
const expectedTitles: Title[] = [
  { code: '', name: 'addressForm.defaultTitle' },
  ...mockTitles,
];
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
  district: '',
  postalCode: 'zip',
  country: { isocode: 'JP' },
  phone: '123123123',
  cellphone: '12763552',
  defaultAddress: false,
};

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  getTitles(): Observable<Title[]> {
    return EMPTY;
  }

  loadTitles(): void {}
}

class MockUserAddressService {
  getDeliveryCountries(): Observable<Country[]> {
    return EMPTY;
  }

  loadDeliveryCountries(): void {}

  getRegions(): Observable<Region[]> {
    return EMPTY;
  }

  getAddresses(): Observable<Address[]> {
    return of([]);
  }
  verifyAddress(): Observable<AddressValidation> {
    return of({});
  }
  getCities(): Observable<{ isocode?: string; name?: string }[]> {
    return of([]);
  }
  getDistricts(): Observable<{ isocode?: string; name?: string }[]> {
    return of([]);
  }
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockFeatureToggles: FeatureToggles = {
  enableHierarchicalAddressFormat: true,
};

const dialogClose$ = new BehaviorSubject<any>('');

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe() {
    return EMPTY;
  }
  get dialogClose() {
    return dialogClose$.asObservable();
  }
}

@Directive({ selector: '[cxNgSelectA11y]' })
class MockNgSelectA11yDirective {
  @Input() cxNgSelectA11y: { ariaLabel?: string; ariaControls?: string };
}

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let controls: UntypedFormGroup['controls'];

  let userAddressService: UserAddressService;
  let mockGlobalMessageService: any;
  let launchDialogService: LaunchDialogService;
  let userProfileFacade: UserProfileFacade;

  const defaultAddressCheckbox = (): DebugElement =>
    fixture.debugElement.query(By.css('[formcontrolname=defaultAddress]'));

  // The component/directive defer focus work to a `setTimeout(0)` macrotask.
  // `of(...)` emits synchronously, so the timer is scheduled during `ngOnInit`;
  // awaiting a real macrotask (a later `setTimeout(0)`) lets it run before we
  // assert, without needing `fakeAsync`/`tick` (unsupported by the vitest zone
  // setup) or the deprecated `done` callback.
  const flushMacrotask = (): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve));

  beforeEach(async () => {
    mockGlobalMessageService = {
      add: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NgSelectModule,
        I18nTestingModule,
        FormErrorsModule,
        AddressFormComponent,
        MockNgSelectA11yDirective,
      ],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: UserAddressService, useClass: MockUserAddressService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
        { provide: UserProfileFacade, useClass: MockUserProfileFacade },
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        provideMockFeatureToggles({ ...mockFeatureToggles }),
        {
          provide: HierarchicalAddressConfig,
          useValue: {
            hierarchicalAddress: {
              countriesUsingHierarchicalAddressFormat: ['CN'],
            },
          },
        },
      ],
    })
      .overrideComponent(AddressFormComponent, {
        add: {
          changeDetection: ChangeDetectionStrategy.Eager,
          imports: [MockFeatureDirective],
        },
        remove: {
          imports: [FeatureDirective],
        },
      })
      .compileComponents();

    userProfileFacade = TestBed.inject(UserProfileFacade);
    userAddressService = TestBed.inject(UserAddressService);
    launchDialogService = TestBed.inject(LaunchDialogService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    controls = component.addressForm.controls;
    component.showTitleCode = true;

    vi.spyOn(component.submitAddress, 'emit');
    vi.spyOn(component.backToAddress, 'emit');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get countries data even when they not exist', async () => {
    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of([])
    );
    vi.spyOn(userAddressService, 'loadDeliveryCountries').mockImplementation(
      () => {}
    );

    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));

    vi.spyOn(userAddressService, 'getAddresses').mockReturnValue(of([]));

    component.ngOnInit();

    await firstValueFrom(component.countries$);
    expect(userAddressService.loadDeliveryCountries).toHaveBeenCalled();
  });

  it('should call ngOnInit to get countries, titles and regions data when data exist', () => {
    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of(mockCountries)
    );
    vi.spyOn(userProfileFacade, 'getTitles').mockReturnValue(of(mockTitles));
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of(mockRegions));

    component.ngOnInit();

    let countries: Country[] | undefined;
    component.countries$
      .subscribe((data) => {
        countries = data;
      })
      .unsubscribe();
    let titles: Title[] | undefined;
    component.titles$
      .subscribe((data) => {
        titles = data;
      })
      .unsubscribe();
    let regions: Region[] | undefined;
    component.regions$
      .subscribe((data) => {
        regions = data;
      })
      .unsubscribe();

    expect(countries).toBe(mockCountries);
    expect(titles).toEqual(expectedTitles);
    expect(regions).toBe(mockRegions);
  });

  it('should add address with address verification result "accept"', () => {
    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of([])
    );
    vi.spyOn(userProfileFacade, 'getTitles').mockReturnValue(of([]));
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));

    const mockAddressVerificationResult: AddressValidation = {
      decision: 'ACCEPT',
    };

    vi.spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    component['handleAddressVerificationResults'](
      mockAddressVerificationResult
    );
    expect(component.submitAddress.emit).toHaveBeenCalledWith(
      component.addressForm.value
    );
  });

  it('should display error message on address verification result "reject"', () => {
    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of([])
    );
    vi.spyOn(userProfileFacade, 'getTitles').mockReturnValue(of([]));
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));

    const mockAddressVerificationResult: AddressValidation = {
      decision: 'REJECT',
      errors: {
        errors: [{ subject: 'No' }],
      },
    };
    component['handleAddressVerificationResults'](
      mockAddressVerificationResult
    );

    vi.spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    if (mockAddressVerificationResult.errors) {
      mockAddressVerificationResult.errors.errors = [{ subject: 'titleCode' }];
    }
    component.ngOnInit();
    expect(mockGlobalMessageService.add).toHaveBeenCalled();
  });

  it('should open suggested address dialog with address verification result "review"', () => {
    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of([])
    );
    vi.spyOn(userProfileFacade, 'getTitles').mockReturnValue(of([]));
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));

    const mockAddressVerificationResult: AddressValidation = {
      decision: 'REVIEW',
    };

    vi.spyOn(component, 'openSuggestedAddress');
    vi.spyOn(launchDialogService, 'openDialogAndSubscribe');

    component.ngOnInit();
    component['handleAddressVerificationResults'](
      mockAddressVerificationResult
    );
    expect(component.openSuggestedAddress).toHaveBeenCalledWith(
      mockAddressVerificationResult
    );
    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
  });

  it('should emit submitAddress if dialog was closed with selected address as parameter', () => {
    vi.spyOn(launchDialogService, 'openDialogAndSubscribe');
    const mockAddressVerificationResult: AddressValidation = {
      decision: 'REVIEW',
    };
    dialogClose$.next(mockAddress);

    component.openSuggestedAddress(mockAddressVerificationResult);

    expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();

    component.submitAddress.pipe(take(1)).subscribe((address) => {
      expect(address).toEqual(mockAddress);
    });
  });

  it('should call verifyAddress() when address has some changes', () => {
    vi.spyOn(userAddressService, 'verifyAddress').mockReturnValue(
      of({
        decision: 'ACCEPT',
      })
    );
    component.ngOnInit();
    component.addressForm.setValue(mockAddress);
    component.addressForm.markAsDirty();
    component.verifyAddress();

    expect(userAddressService.verifyAddress).toHaveBeenCalled();
  });

  it('should not call verifyAddress() when address does not have change', () => {
    vi.spyOn(userAddressService, 'verifyAddress').mockReturnValue(of({}));
    component.ngOnInit();
    component.addressForm.setValue(mockAddress);
    component.verifyAddress();
    expect(userAddressService.verifyAddress).not.toHaveBeenCalled();
  });

  it('should call back()', () => {
    component.back();
    expect(component.backToAddress.emit).toHaveBeenCalledWith();
  });

  it('should toggleDefaultAddress() adapt control value', () => {
    component.setAsDefaultField = true;
    vi.spyOn(userAddressService, 'getAddresses').mockReturnValue(
      of([mockAddress])
    );

    fixture.detectChanges();
    // eslint-disable-next-line no-restricted-syntax
    defaultAddressCheckbox().nativeElement.click();

    expect(component.addressForm.value.defaultAddress).toBeTruthy();
  });

  it('should call countrySelected()', () => {
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));
    const mockCountryIsocode = 'test country isocode';
    component.countrySelected({ isocode: mockCountryIsocode });
    component.ngOnInit();
    component.regions$.subscribe();
    expect(
      (component.addressForm['controls'].country as UntypedFormGroup)[
        'controls'
      ].isocode.value
    ).toEqual(mockCountryIsocode);
    expect(userAddressService.getRegions).toHaveBeenCalledWith(
      mockCountryIsocode
    );
  });

  it('should set isHierarchicalAddressFormat and add validators when CN is selected', () => {
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));
    (component as any).featureToggles = {
      enableHierarchicalAddressFormat: true,
    };
    (component as any).hierarchicalAddressConfig = {
      hierarchicalAddress: { countriesUsingHierarchicalAddressFormat: ['CN'] },
    };
    component.countrySelected({ isocode: 'CN' });
    expect(component.isHierarchicalAddressFormat).toBe(true);
    expect(component.addressForm.get('cellphone')?.validator).toBeTruthy();
    expect(component.addressForm.get('district')?.validator).toBeTruthy();
  });

  it('should clear validators and reset state when switching away from CN', () => {
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));
    component.countrySelected({ isocode: 'CN' });
    component.countrySelected({ isocode: 'US' });
    expect(component.isHierarchicalAddressFormat).toBe(false);
    expect(component.addressForm.get('cellphone')?.validator).toBeNull();
    expect(component.addressForm.get('district')?.validator).toBeNull();
  });

  it('should reset town and district when region changes for CN address', () => {
    (component as any).featureToggles = {
      enableHierarchicalAddressFormat: true,
    };
    component.isHierarchicalAddressFormat = true;
    component.addressForm.get('town')?.setValue('old-town');
    component.addressForm.get('district')?.setValue('old-district');
    component.regionSelected({ isocode: 'CN-11' });
    expect(component.addressForm.get('town')?.value).toBeNull();
    expect(component.addressForm.get('district')?.value).toBeNull();
  });

  it('should not reset town and district when region changes for non-CN address', () => {
    component.isHierarchicalAddressFormat = false;
    component.addressForm.get('town')?.setValue('old-town');
    component.regionSelected({ isocode: 'US-CA' });
    expect(component.addressForm.get('town')?.value).toEqual('old-town');
  });

  it('should update selectedCity$ and reset district on citySelected', () => {
    component.addressForm.get('district')?.setValue('old-district');
    component.citySelected({ isocode: 'CN-11-1', name: 'Beijing' });
    expect(component.addressForm.get('district')?.value).toBeNull();
  });

  it('should not update selectedCity$ when city is undefined', () => {
    component.addressForm.get('district')?.setValue('old-district');
    component.citySelected(undefined);
    expect(component.addressForm.get('district')?.value).toEqual(
      'old-district'
    );
  });

  it('should initialize cities as empty array', () => {
    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of([])
    );
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));
    component.ngOnInit();
    expect(component.cities).toEqual([]);
  });

  it('should initialize districts as empty array', () => {
    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of([])
    );
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));
    component.ngOnInit();
    expect(component.districts).toEqual([]);
  });

  it('should have empty cities when no region is selected', () => {
    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of([])
    );
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));
    component.ngOnInit();
    expect(component.cities).toEqual([]);
  });

  it('should have empty districts when no city is selected', () => {
    vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
      of([])
    );
    vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));
    component.ngOnInit();
    expect(component.districts).toEqual([]);
  });

  it('should call verifyAddress', () => {
    vi.spyOn(component, 'verifyAddress');
    const mockCountryIsocode = 'test country isocode';
    component.regionSelected({ isocode: mockCountryIsocode });
    component.ngOnInit();
    component.regions$.subscribe();
    component.verifyAddress();
    expect(
      (component.addressForm['controls'].region as UntypedFormGroup)['controls']
        .isocode.value
    ).toEqual(mockCountryIsocode);
    expect(component.verifyAddress).toHaveBeenCalled();
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.btn-primary'));

    it('should call "verifyAddress" function when being clicked and when form is valid', () => {
      vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
        of([])
      );
      vi.spyOn(userProfileFacade, 'getTitles').mockReturnValue(of([]));
      vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));
      vi.spyOn(component, 'verifyAddress');

      fixture.detectChanges();

      // eslint-disable-next-line no-restricted-syntax
      getContinueBtn().nativeElement.click();
      expect(component.verifyAddress).toHaveBeenCalledTimes(1);

      controls['titleCode'].setValue('test titleCode');
      controls['firstName'].setValue('test firstName');
      controls['lastName'].setValue('test lastName');
      controls['line1'].setValue('test line1');
      controls['town'].setValue('test town');
      (controls.region as UntypedFormGroup)['controls'].isocode.setValue(
        'test region isocode'
      );
      (controls.country as UntypedFormGroup)['controls'].isocode.setValue(
        'test country isocode'
      );
      controls['postalCode'].setValue('test postalCode');
      fixture.detectChanges();

      // eslint-disable-next-line no-restricted-syntax
      getContinueBtn().nativeElement.click();
      expect(component.verifyAddress).toHaveBeenCalledTimes(2);
    });

    it('should show assitive message when form is submitted with errors', () => {
      component.addressForm.setErrors({ required: true });
      component.verifyAddress();
      expect(mockGlobalMessageService.add).toHaveBeenCalled();
    });
  });

  describe('UI cancel button', () => {
    it('should show the "Back to cart", if it is provided as an input', () => {
      component.cancelBtnLabel = 'Back to cart';
      fixture.detectChanges();
      expect(
        // eslint-disable-next-line no-restricted-syntax
        fixture.nativeElement
          .querySelector('.btn-secondary')
          .textContent?.trim()
      ).toEqual('Back to cart');
    });

    it('should show the "Choose Address", if there is no "cancelBtnLabel" input provided', () => {
      component.cancelBtnLabel = undefined as unknown as string;
      fixture.detectChanges();
      expect(
        // eslint-disable-next-line no-restricted-syntax
        fixture.nativeElement
          .querySelector('.btn-secondary')
          .textContent?.trim()
      ).toEqual('addressForm.chooseAddress');
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () =>
      fixture.debugElement.query(By.css('.btn-secondary'));

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
      vi.spyOn(component, 'back');
      // eslint-disable-next-line no-restricted-syntax
      getBackBtn().nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    vi.spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should show the "Set as default" checkbox when there is one or more saved addresses', () => {
    vi.spyOn(userAddressService, 'getAddresses').mockReturnValue(
      of([mockAddress])
    );

    fixture.detectChanges();

    expect(defaultAddressCheckbox().nativeElement).toBeTruthy();
  });

  it('should not show the "Set as default" checkbox when there no saved addresses', () => {
    vi.spyOn(userAddressService, 'getAddresses').mockReturnValue(of([]));

    fixture.detectChanges();

    expect(defaultAddressCheckbox()).toBe(null);
  });

  describe('toggle off behavior', () => {
    let featureToggles: FeatureToggles;

    beforeEach(() => {
      featureToggles = TestBed.inject(FeatureToggles);
      featureToggles.enableHierarchicalAddressFormat = false;
    });

    it('countrySelected should not set isHierarchicalAddressFormat', () => {
      component.isHierarchicalAddressFormat = true;
      component.countrySelected({ isocode: 'CN' });
      expect(component.isHierarchicalAddressFormat).toBe(true);
    });

    it('verifyAddress should call OCC verifyAddress when toggle is off', () => {
      vi.spyOn(userAddressService, 'verifyAddress').mockReturnValue(
        of({ decision: 'ACCEPT' })
      );
      component.ngOnInit();
      component.addressForm.setValue(mockAddress);
      component.addressForm.markAsDirty();
      component.verifyAddress();
      expect(userAddressService.verifyAddress).toHaveBeenCalled();
    });

    it('countrySelected should not enter the hierarchical branch when toggle is off', () => {
      // toggle is off, so isHierarchicalAddressFormat must stay at its current
      // value even when CN is selected
      component.isHierarchicalAddressFormat = false;
      component.countrySelected({ isocode: 'CN' });
      expect(component.isHierarchicalAddressFormat).toBe(false);
    });
  });

  describe('a11yImproveAddressFormFocus', () => {
    let featureTogglesController: MockFeatureTogglesController;

    const getFocusForm = (): DebugElement =>
      fixture.debugElement.query(By.directive(FocusDirective));

    beforeEach(async () => {
      // This block needs a different module setup than the outer `beforeEach`
      // (which replaces `FeatureDirective` with a mock that always renders):
      // here we keep the real `*cxFeature` so toggling `a11yImproveAddressFormFocus`
      // actually gates the `cxFocus` host. Reset first — the outer `beforeEach`
      // has already instantiated the module, and you can't reconfigure (or
      // `inject`) after that without a reset.
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          NgSelectModule,
          I18nTestingModule,
          FormErrorsModule,
          AddressFormComponent,
          MockNgSelectA11yDirective,
        ],
        providers: [
          { provide: LaunchDialogService, useClass: MockLaunchDialogService },
          { provide: UserAddressService, useClass: MockUserAddressService },
          { provide: GlobalMessageService, useValue: { add: vi.fn() } },
          { provide: UserProfileFacade, useClass: MockUserProfileFacade },
          { provide: LanguageService, useClass: MockLanguageService },
          provideMockFeatureToggles({
            ...mockFeatureToggles,
            a11yImproveAddressFormFocus: true,
          }),
          {
            provide: HierarchicalAddressConfig,
            useValue: {
              hierarchicalAddress: {
                countriesUsingHierarchicalAddressFormat: ['CN'],
              },
            },
          },
        ],
      });

      await TestBed.compileComponents();

      featureTogglesController = TestBed.inject(MockFeatureTogglesController);
      userAddressService = TestBed.inject(UserAddressService);
      userProfileFacade = TestBed.inject(UserProfileFacade);
      fixture = TestBed.createComponent(AddressFormComponent);
      component = fixture.componentInstance;
    });

    it('should apply cxFocus to the form when a11yImproveAddressFormFocus is true', () => {
      featureTogglesController.set('a11yImproveAddressFormFocus', true);
      fixture.detectChanges();

      expect(getFocusForm()).toBeTruthy();
    });

    it('should not apply cxFocus to the form when a11yImproveAddressFormFocus is false', () => {
      featureTogglesController.set('a11yImproveAddressFormFocus', false);
      fixture.detectChanges();

      expect(getFocusForm()).toBeNull();
    });

    it('should render the action buttons outside the cxFocus host', () => {
      featureTogglesController.set('a11yImproveAddressFormFocus', true);
      fixture.detectChanges();

      const focusHost: HTMLElement = getFocusForm().nativeElement;
      const submitBtn = fixture.debugElement.query(
        By.css('.btn-primary')
      )?.nativeElement;
      const backBtn = fixture.debugElement.query(
        By.css('.btn-secondary')
      )?.nativeElement;

      expect(submitBtn).toBeTruthy();
      expect(backBtn).toBeTruthy();
      // In Safari a `<button>` doesn't take focus on click; keeping the buttons
      // out of the autofocus host prevents focus from jumping to the first field.
      expect(focusHost.contains(submitBtn)).toBe(false);
      expect(focusHost.contains(backBtn)).toBe(false);
    });

    const getFocusFirstInvalidFieldDirective =
      (): FocusFirstInvalidFieldDirective =>
        fixture.debugElement
          .query(By.directive(FocusFirstInvalidFieldDirective))
          .injector.get(FocusFirstInvalidFieldDirective);

    it('should focus the first invalid field on invalid submit when toggle is on', () => {
      featureTogglesController.set('a11yImproveAddressFormFocus', true);
      fixture.detectChanges();
      const directive = getFocusFirstInvalidFieldDirective();
      vi.spyOn(directive, 'focusFirstInvalidField');

      component.verifyAddress(); // form is invalid by default

      expect(directive.focusFirstInvalidField).toHaveBeenCalled();
    });

    it('should not focus the first invalid field on invalid submit when toggle is off', () => {
      featureTogglesController.set('a11yImproveAddressFormFocus', false);
      fixture.detectChanges();
      const directive = getFocusFirstInvalidFieldDirective();
      vi.spyOn(directive, 'focusFirstInvalidField');

      component.verifyAddress(); // form is invalid by default

      expect(directive.focusFirstInvalidField).not.toHaveBeenCalled();
    });

    it('should start with autofocus disabled', () => {
      expect(component.focusConfig).toEqual({ autofocus: false });
    });

    it('should enable autofocus once the country data has loaded', async () => {
      featureTogglesController.set('a11yImproveAddressFormFocus', true);
      vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
        of(mockCountries)
      );

      component.ngOnInit();
      await flushMacrotask(); // flush the deferred macrotask

      expect(component.focusConfig.autofocus).toBe(true);
      // a `refreshFocus` token is set to re-trigger the directive's focus logic
      expect(component.focusConfig.refreshFocus).toBeTruthy();
    });

    it('should not steal focus when the user has already focused a form field', async () => {
      featureTogglesController.set('a11yImproveAddressFormFocus', true);
      vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
        of(mockCountries)
      );

      // Simulate the user having engaged with the form before the (deferred)
      // country data arrives — the focus refresh must not yank focus back.
      const host: HTMLElement = fixture.nativeElement;
      const input = document.createElement('input');
      host.appendChild(input);
      document.body.appendChild(host);
      input.focus();
      expect(document.activeElement).toBe(input);

      component.ngOnInit();
      await flushMacrotask();

      expect(component.focusConfig).toEqual({ autofocus: false });

      document.body.removeChild(host);
    });

    it('should not enable autofocus while the country list is empty', async () => {
      featureTogglesController.set('a11yImproveAddressFormFocus', true);
      vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
        of([])
      );

      component.ngOnInit();
      await flushMacrotask();

      expect(component.focusConfig).toEqual({ autofocus: false });
    });

    it('should not enable autofocus when the toggle is off', async () => {
      featureTogglesController.set('a11yImproveAddressFormFocus', false);
      vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
        of(mockCountries)
      );

      component.ngOnInit();
      await flushMacrotask();

      expect(component.focusConfig).toEqual({ autofocus: false });
    });
  });

  describe('focusFirstInvalidField', () => {
    let focusFirstInvalidFieldDirective: FocusFirstInvalidFieldDirective;

    beforeEach(() => {
      vi.spyOn(userAddressService, 'getDeliveryCountries').mockReturnValue(
        of(mockCountries)
      );
      vi.spyOn(userProfileFacade, 'getTitles').mockReturnValue(of([]));
      vi.spyOn(userAddressService, 'getRegions').mockReturnValue(of([]));
      component.ngOnInit();
      fixture.detectChanges();
      focusFirstInvalidFieldDirective = fixture.debugElement
        .query(By.directive(FocusFirstInvalidFieldDirective))
        .injector.get(FocusFirstInvalidFieldDirective);
    });

    it('should focus the inner input of the invalid country ng-select', async () => {
      const countryInput: HTMLElement = fixture.debugElement.query(
        By.css('ng-select.country-select input')
      ).nativeElement;
      vi.spyOn(countryInput, 'focus');

      focusFirstInvalidFieldDirective.focusFirstInvalidField();

      // the directive defers focus to a macrotask, so assert after it runs
      await flushMacrotask();
      expect(countryInput.focus).toHaveBeenCalled();
    });

    it('should focus the first invalid text input when preceding selects are valid', async () => {
      (controls.country as UntypedFormGroup).controls['isocode'].setValue('AD');
      fixture.detectChanges();

      const firstNameInput: HTMLElement = fixture.debugElement.query(
        By.css('[formcontrolname=firstName]')
      ).nativeElement;
      vi.spyOn(firstNameInput, 'focus');

      focusFirstInvalidFieldDirective.focusFirstInvalidField();

      await flushMacrotask();
      expect(firstNameInput.focus).toHaveBeenCalled();
    });
  });
});
