import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

import { NgSelectModule } from '@ng-select/ng-select';

import { BehaviorSubject } from 'rxjs';

import createSpy = jasmine.createSpy;

import { CheckoutService } from '../../../../facade';
import { GlobalMessageService } from '../../../../../global-message/facade/global-message.service';
import { UserService } from '../../../../../user/facade/user.service';

import { AddressFormComponent } from './address-form.component';

const mockTitles = [
  {
    code: 'mr',
    name: 'Mr.'
  },
  {
    code: 'mrs',
    name: 'Mrs.'
  }
];
const mockCountries = [
  {
    isocode: 'AL',
    name: 'Albania'
  },
  {
    isocode: 'AD',
    name: 'Andorra'
  }
];
const mockRegions = [
  {
    isocode: 'CA-ON',
    name: 'Ontario'
  },
  {
    isocode: 'CA-QC',
    name: 'Quebec'
  }
];

describe('AddressFormComponent', () => {
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let controls: FormGroup['controls'];

  let mockCheckoutService: any;
  let mockUserService: any;
  let mockGlobalMessageService: any;

  beforeEach(async(() => {
    mockCheckoutService = {
      addressVerificationResults$: new BehaviorSubject({ decision: 'ACCEPT' }),
      clearAddressVerificationResults: createSpy(),
      verifyAddress: createSpy()
    };
    mockUserService = {
      titles$: new BehaviorSubject(null),
      allDeliveryCountries$: new BehaviorSubject(null),
      allRegions$: new BehaviorSubject(null),
      loadTitles: createSpy(),
      loadDeliveryCountries: createSpy(),
      loadRegions: createSpy()
    };
    mockGlobalMessageService = {
      add: createSpy()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgSelectModule],
      declarations: [AddressFormComponent],
      providers: [
        { provide: CheckoutService, useValue: mockCheckoutService },
        { provide: UserService, useValue: mockUserService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService }
      ]
    })
      .overrideComponent(AddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    controls = component.address.controls;

    spyOn(component.addAddress, 'emit').and.callThrough();
    spyOn(component.backToAddress, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get countries and titles data even when they not exist', done => {
    mockUserService.allDeliveryCountries$.next([]);
    mockUserService.titles$.next([]);
    mockUserService.allRegions$.next([]);
    mockCheckoutService.addressVerificationResults$.next({});
    component.ngOnInit();

    component.countries$.subscribe(() => {
      expect(mockUserService.loadDeliveryCountries).toHaveBeenCalled();
      done();
    });

    component.titles$.subscribe(() => {
      expect(mockUserService.loadTitles).toHaveBeenCalled();
      done();
    });
  });

  it('should call ngOnInit to get countries, titles and regions data when data exist', () => {
    mockUserService.allDeliveryCountries$.next(mockCountries);
    mockUserService.titles$.next(mockTitles);
    mockUserService.allRegions$.next(mockRegions);
    mockCheckoutService.addressVerificationResults$.next({});
    component.ngOnInit();

    let countries;
    component.countries$.subscribe(data => {
      countries = data;
    });
    let titles;
    component.titles$.subscribe(data => {
      titles = data;
    });
    let regions;
    component.regions$.subscribe(data => {
      regions = data;
    });
    expect(countries).toBe(mockCountries);
    expect(titles).toBe(mockTitles);
    expect(regions).toBe(mockRegions);
  });

  it('should add address with address verification result "accept"', () => {
    mockUserService.allDeliveryCountries$.next([]);
    mockUserService.titles$.next([]);
    mockUserService.allRegions$.next([]);
    const mockAddressVerificationResult = { decision: 'ACCEPT' };
    mockCheckoutService.addressVerificationResults$.next(
      mockAddressVerificationResult
    );

    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(component.addAddress.emit).toHaveBeenCalledWith(
      component.address.value
    );
  });

  it('should clear address verification result with address verification result "reject"', () => {
    mockUserService.allDeliveryCountries$.next([]);
    mockUserService.titles$.next([]);
    mockUserService.allRegions$.next([]);
    const mockAddressVerificationResult = { decision: 'REJECT' };
    mockCheckoutService.addressVerificationResults$.next(
      mockAddressVerificationResult
    );

    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(
      mockCheckoutService.clearAddressVerificationResults
    ).toHaveBeenCalledWith();
  });

  it('should open suggested address with address verification result "review"', () => {
    mockUserService.allDeliveryCountries$.next([]);
    mockUserService.titles$.next([]);
    mockUserService.allRegions$.next([]);
    const mockAddressVerificationResult = { decision: 'REVIEW' };
    mockCheckoutService.addressVerificationResults$.next(
      mockAddressVerificationResult
    );

    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(component.openSuggestedAddress).toHaveBeenCalledWith(
      mockAddressVerificationResult
    );
  });

  it('should call verfiyAddress()', () => {
    component.verifyAddress();
    expect(mockCheckoutService.verifyAddress).toHaveBeenCalled();
  });

  it('should call back()', () => {
    component.back();
    expect(component.backToAddress.emit).toHaveBeenCalledWith();
  });

  it('should call toggleDefaultAddress()', () => {
    component.address.value.defaultAddress = false;
    component.toggleDefaultAddress();
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
    const mockCountryIsocode = 'test country isocode';
    component.countrySelected({ isocode: mockCountryIsocode });
    expect(
      component.address['controls'].country['controls'].isocode.value
    ).toEqual(mockCountryIsocode);
    expect(mockUserService.loadRegions).toHaveBeenCalled();
  });

  it('should call regionSelected()', () => {
    const mockRegionIsocode = 'test region isocode';
    component.regionSelected({ isocode: mockRegionIsocode });
    expect(
      component.address['controls'].region['controls'].isocode.value
    ).toEqual(mockRegionIsocode);
  });

  describe('UI continue button', () => {
    const getContinueBtn = () =>
      fixture.debugElement.query(By.css('.btn-primary'));

    xit('should call "verifyAddress" function when being clicked and when form is valid', () => {
      spyOn(component, 'verifyAddress');
      fixture.detectChanges();

      getContinueBtn().nativeElement.click();
      expect(component.verifyAddress).not.toHaveBeenCalled();

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
      expect(component.verifyAddress).toHaveBeenCalled();
    });

    it('should be enabled only when form has all mandatory fields filled', () => {
      const isContinueBtnDisabled = () => {
        fixture.detectChanges();
        return getContinueBtn().nativeElement.disabled;
      };
      mockUserService.allDeliveryCountries$.next([]);
      mockUserService.titles$.next([]);
      mockUserService.allRegions$.next([]);

      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['titleCode'].setValue('test titleCode');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['firstName'].setValue('test firstName');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['lastName'].setValue('test lastName');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['line1'].setValue('test line1');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['town'].setValue('test town');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.region['controls'].isocode.setValue('test region isocode');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls.country['controls'].isocode.setValue('test country isocode');
      expect(isContinueBtnDisabled()).toBeTruthy();
      controls['postalCode'].setValue('test postalCode');

      expect(isContinueBtnDisabled()).toBeFalsy();
    });
  });

  describe('UI back button', () => {
    const getBackBtn = () => fixture.debugElement.query(By.css('.btn-action'));

    it('should call "back" function after being clicked', () => {
      spyOn(component, 'back');
      getBackBtn().nativeElement.click();
      expect(component.back).toHaveBeenCalled();
    });
  });
});
