import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

import { NgSelectModule } from '@ng-select/ng-select';

import { Title, Country, Region, CheckoutService } from '@spartacus/core';

import { Observable, of } from 'rxjs';

import createSpy = jasmine.createSpy;

import { UserService, GlobalMessageService } from '@spartacus/core';

import { AddressFormComponent } from './address-form.component';
import { AddressValidation } from '@spartacus/core';

class MockUserService {
  getTitles(): Observable<Title[]> {
    return of();
  }

  loadTitles(): void {}

  getDeliveryCountries(): Observable<Country[]> {
    return of();
  }

  loadDeliveryCountries(): void {}

  getRegions(): Observable<Region[]> {
    return of();
  }

  loadRegions(_countryIsoCode: string): void {}
}

const mockTitles: Title[] = [
  {
    code: 'mr',
    name: 'Mr.'
  },
  {
    code: 'mrs',
    name: 'Mrs.'
  }
];
const mockCountries: Country[] = [
  {
    isocode: 'AD',
    name: 'Andorra'
  },
  {
    isocode: 'RS',
    name: 'Serbia'
  }
];
const mockRegions: Region[] = [
  {
    isocode: 'CA-ON',
    name: 'Ontario'
  },
  {
    isocode: 'CA-QC',
    name: 'Quebec'
  }
];

class MockCheckoutService {
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

  let mockCheckoutService: MockCheckoutService;
  let userService: UserService;
  let mockGlobalMessageService: any;

  beforeEach(async(() => {
    mockGlobalMessageService = {
      add: createSpy()
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgSelectModule],
      declarations: [AddressFormComponent],
      providers: [
        { provide: CheckoutService, useClass: MockCheckoutService },
        { provide: UserService, useClass: MockUserService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService }
      ]
    })
      .overrideComponent(AddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();

    userService = TestBed.get(UserService);
    mockCheckoutService = TestBed.get(CheckoutService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    controls = component.address.controls;
    component.showTitleCode = true;

    spyOn(component.addAddress, 'emit').and.callThrough();
    spyOn(component.backToAddress, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get countries and titles data even when they not exist', done => {
    spyOn(userService, 'getDeliveryCountries').and.returnValue(of([]));
    spyOn(userService, 'loadDeliveryCountries').and.stub();

    spyOn(userService, 'getTitles').and.returnValue(of([]));
    spyOn(userService, 'loadTitles').and.stub();

    spyOn(userService, 'getRegions').and.returnValue(of([]));

    spyOn(mockCheckoutService, 'getAddressVerificationResults').and.returnValue(
      of({})
    );
    component.ngOnInit();

    component.countries$
      .subscribe(() => {
        expect(userService.loadDeliveryCountries).toHaveBeenCalled();
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
    spyOn(userService, 'getDeliveryCountries').and.returnValue(
      of(mockCountries)
    );
    spyOn(userService, 'getTitles').and.returnValue(of(mockTitles));
    spyOn(userService, 'getRegions').and.returnValue(of(mockRegions));

    spyOn(mockCheckoutService, 'getAddressVerificationResults').and.returnValue(
      of({})
    );

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
    expect(titles).toEqual([{ code: '', name: 'None' }, ...mockTitles]);
    expect(regions).toBe(mockRegions);
  });

  it('should add address with address verification result "accept"', () => {
    spyOn(userService, 'getDeliveryCountries').and.returnValue(of([]));
    spyOn(userService, 'getTitles').and.returnValue(of([]));
    spyOn(userService, 'getRegions').and.returnValue(of([]));

    const mockAddressVerificationResult = { decision: 'ACCEPT' };
    spyOn(mockCheckoutService, 'getAddressVerificationResults').and.returnValue(
      of(mockAddressVerificationResult)
    );

    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(component.addAddress.emit).toHaveBeenCalledWith(
      component.address.value
    );
  });

  it('should clear address verification result with address verification result "reject"', () => {
    spyOn(userService, 'getDeliveryCountries').and.returnValue(of([]));
    spyOn(userService, 'getTitles').and.returnValue(of([]));
    spyOn(userService, 'getRegions').and.returnValue(of([]));

    const mockAddressVerificationResult = { decision: 'REJECT' };
    spyOn(mockCheckoutService, 'getAddressVerificationResults').and.returnValue(
      of(mockAddressVerificationResult)
    );

    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(
      mockCheckoutService.clearAddressVerificationResults
    ).toHaveBeenCalledWith();
  });

  it('should open suggested address with address verification result "review"', () => {
    spyOn(userService, 'getDeliveryCountries').and.returnValue(of([]));
    spyOn(userService, 'getTitles').and.returnValue(of([]));
    spyOn(userService, 'getRegions').and.returnValue(of([]));

    const mockAddressVerificationResult = { decision: 'REVIEW' };
    spyOn(mockCheckoutService, 'getAddressVerificationResults').and.returnValue(
      of(mockAddressVerificationResult)
    );

    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(component.openSuggestedAddress).toHaveBeenCalledWith(
      mockAddressVerificationResult
    );
  });

  it('should call verifyAddress()', () => {
    component.verifyAddress();
    expect(mockCheckoutService.verifyAddress).toHaveBeenCalled();
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
    spyOn(userService, 'loadRegions').and.stub();

    const mockCountryIsocode = 'test country isocode';
    component.countrySelected({ isocode: mockCountryIsocode });
    expect(
      component.address['controls'].country['controls'].isocode.value
    ).toEqual(mockCountryIsocode);
    expect(userService.loadRegions).toHaveBeenCalled();
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

    it('should call "verifyAddress" function when being clicked and when form is valid', () => {
      spyOn(userService, 'getDeliveryCountries').and.returnValue(of([]));
      spyOn(userService, 'getTitles').and.returnValue(of([]));
      spyOn(userService, 'getRegions').and.returnValue(of([]));
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
      spyOn(userService, 'getDeliveryCountries').and.returnValue(of([]));
      spyOn(userService, 'getTitles').and.returnValue(of([]));
      spyOn(userService, 'getRegions').and.returnValue(of([]));

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
