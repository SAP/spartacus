import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromRoot from '../../../../../routing/store';
import * as fromCheckout from '../../../../store';
import * as fromCart from '../../../../../cart/store';
import * as fromUser from '../../../../../user/store';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import { AddressFormComponent } from './address-form.component';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutService } from '../../../../services';
import { CartService, CartDataService } from '../../../../../cart/services';
import { AddressFormModule } from './address-form.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

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
  let store: Store<fromCheckout.CheckoutState>;
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let service: CheckoutService;
  let controls: FormGroup['controls'];
  let mockSelectors: {
    checkout: {
      getAddressVerificationResults: BehaviorSubject<any>;
    };
    user: {
      getAllDeliveryCountries: BehaviorSubject<any[]>;
      getAllTitles: BehaviorSubject<any[]>;
      getAllRegions: BehaviorSubject<any[]>;
    };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AddressFormModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          checkout: combineReducers(fromCheckout.getReducers()),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers())
        })
      ],
      providers: [CheckoutService, CartService, CartDataService, NgbModal]
    })
      .overrideComponent(AddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    service = TestBed.get(CheckoutService);
    controls = component.address.controls;

    mockSelectors = {
      checkout: {
        getAddressVerificationResults: new BehaviorSubject({})
      },
      user: {
        getAllDeliveryCountries: new BehaviorSubject([]),
        getAllTitles: new BehaviorSubject([]),
        getAllRegions: new BehaviorSubject([])
      }
    };
    spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
      switch (selector) {
        case fromCheckout.getAddressVerificationResults:
          return () => mockSelectors.checkout.getAddressVerificationResults;
        case fromUser.getAllDeliveryCountries:
          return () => mockSelectors.user.getAllDeliveryCountries;
        case fromUser.getAllTitles:
          return () => mockSelectors.user.getAllTitles;
        case fromUser.getAllRegions:
          return () => mockSelectors.user.getAllRegions;
      }
    });

    spyOn(store, 'dispatch').and.callThrough();

    spyOn(component.addAddress, 'emit').and.callThrough();
    spyOn(component.backToAddress, 'emit').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get countries and titles data even when they not exist', () => {
    mockSelectors.user.getAllDeliveryCountries.next([]);
    mockSelectors.user.getAllTitles.next([]);
    mockSelectors.user.getAllRegions.next([]);
    mockSelectors.checkout.getAddressVerificationResults.next({});
    component.ngOnInit();
    component.countries$.subscribe(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromUser.LoadDeliveryCountries()
      );
    });
    component.titles$.subscribe(() => {
      expect(store.dispatch).toHaveBeenCalledWith(new fromUser.LoadTitles());
    });
  });

  it('should call ngOnInit to get countries, titles and regions data when data exist', () => {
    mockSelectors.user.getAllDeliveryCountries.next(mockCountries);
    mockSelectors.user.getAllTitles.next(mockTitles);
    mockSelectors.user.getAllRegions.next(mockRegions);
    mockSelectors.checkout.getAddressVerificationResults.next({});
    component.ngOnInit();
    component.countries$.subscribe(countries => {
      expect(countries).toBe(mockCountries);
    });
    component.titles$.subscribe(titles => {
      expect(titles).toBe(mockTitles);
    });
    component.regions$.subscribe(regions => {
      expect(regions).toBe(mockRegions);
    });
  });

  it('should add address with address verification result "accept"', () => {
    const mockAddressVerificationResult = { decision: 'ACCEPT' };
    mockSelectors.user.getAllDeliveryCountries.next([]);
    mockSelectors.user.getAllTitles.next([]);
    mockSelectors.user.getAllRegions.next([]);
    mockSelectors.checkout.getAddressVerificationResults.next(
      mockAddressVerificationResult
    );
    spyOn(component, 'openSuggestedAddress');
    component.ngOnInit();
    expect(component.addAddress.emit).toHaveBeenCalledWith(
      component.address.value
    );
  });

  it('should clear address verification result with address verification result "reject"', () => {
    const mockAddressVerificationResult = { decision: 'REJECT' };
    spyOn(component, 'openSuggestedAddress');
    mockSelectors.user.getAllDeliveryCountries.next([]);
    mockSelectors.user.getAllTitles.next([]);
    mockSelectors.user.getAllRegions.next([]);
    mockSelectors.checkout.getAddressVerificationResults.next(
      mockAddressVerificationResult
    );
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.ClearAddressVerificationResults()
    );
  });

  it('should open suggested address with address verification result "review"', () => {
    const mockAddressVerificationResult = { decision: 'REVIEW' };
    spyOn(component, 'openSuggestedAddress');
    mockSelectors.user.getAllDeliveryCountries.next([]);
    mockSelectors.user.getAllTitles.next([]);
    mockSelectors.user.getAllRegions.next([]);
    mockSelectors.checkout.getAddressVerificationResults.next(
      mockAddressVerificationResult
    );
    component.ngOnInit();
    expect(component.openSuggestedAddress).toHaveBeenCalledWith(
      mockAddressVerificationResult
    );
  });

  it('should call verfiyAddress()', () => {
    spyOn(service, 'verifyAddress');
    component.verifyAddress();
    expect(service.verifyAddress).toHaveBeenCalled();
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
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromUser.LoadRegions(mockCountryIsocode)
    );
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
      mockSelectors.user.getAllDeliveryCountries.next([]);
      mockSelectors.user.getAllTitles.next([]);
      mockSelectors.user.getAllRegions.next([]);

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
