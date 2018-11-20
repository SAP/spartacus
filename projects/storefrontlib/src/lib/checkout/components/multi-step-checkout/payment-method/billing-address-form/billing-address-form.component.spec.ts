import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromCheckout from '../../../../store';
import * as fromCart from '../../../../../cart/store';
import * as fromUser from '../../../../../user/store';

import { StoreModule, Store } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import { BillingAddressFormComponent } from './billing-address-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BehaviorSubject, of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutService } from '../../../../services';
import { CartService, CartDataService } from '../../../../../cart/services';
import { BillingAddressFormModule } from './billing-address-form.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

describe('BillingAddressFormComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: BillingAddressFormComponent;
  let fixture: ComponentFixture<BillingAddressFormComponent>;
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
        BillingAddressFormModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckout.getReducers()),
        StoreModule.forFeature('cart', fromCart.getReducers()),
        StoreModule.forFeature('user', fromUser.getReducers())
      ],
      providers: [CheckoutService, CartService, CartDataService, NgbModal]
    })
      .overrideComponent(BillingAddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

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
    mockSelectors.user.getAllTitles.next(mockTitles);
    mockSelectors.user.getAllRegions.next(mockRegions);
    mockSelectors.checkout.getAddressVerificationResults.next({});
    component.ngOnInit();
    component.countries$ = of(mockCountries);
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

  it('should call titleSelected()', () => {
    const mockTitleCode = 'test title code';
    component.titleSelected({ code: mockTitleCode });
    expect(component.billingAddress['controls'].titleCode.value).toEqual(
      mockTitleCode
    );
  });

  it('should call countrySelected()', () => {
    const mockCountryIsocode = 'test country isocode';
    component.countrySelected({ isocode: mockCountryIsocode });
    expect(
      component.billingAddress['controls'].country['controls'].isocode.value
    ).toEqual(mockCountryIsocode);
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromUser.LoadRegions(mockCountryIsocode)
    );
  });

  it('should call regionSelected()', () => {
    const mockRegionIsocode = 'test region isocode';
    component.regionSelected({ isocode: mockRegionIsocode });
    expect(
      component.billingAddress['controls'].region['controls'].isocode.value
    ).toEqual(mockRegionIsocode);
  });
});
