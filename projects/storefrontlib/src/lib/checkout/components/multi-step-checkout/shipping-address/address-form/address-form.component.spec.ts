import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromRoot from '../../../../../routing/store';
import * as fromCheckout from '../../../../store';
import * as fromCart from '../../../../../cart/store';
import * as fromUser from '../../../../../user/store';

import { StoreModule, Store, combineReducers } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import { AddressFormComponent } from './address-form.component';
import {
  ReactiveFormsModule,
  FormGroup,
  AbstractControl
} from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckoutService } from '../../../../services';
import { CartService, CartDataService } from '../../../../../cart/services';
import { AddressFormModule } from './address-form.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class MockAbstractControl {
  hasError() {}
  enable() {}
  disable() {}
}

export class MockFormGroup {
  get() {}
}

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

fdescribe('AddressFormComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let ac: AbstractControl;
  let service: CheckoutService;
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
      providers: [
        CheckoutService,
        CartService,
        { provide: FormGroup, useClass: MockFormGroup },
        { provide: AbstractControl, useClass: MockAbstractControl },
        CartDataService,
        NgbModal
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    ac = TestBed.get(AbstractControl);
    service = TestBed.get(CheckoutService);

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
    spyOn(ac, 'hasError').and.callThrough();

    spyOn(component.addAddress, 'emit').and.callThrough();
    spyOn(component.backToAddress, 'emit').and.callThrough();
    spyOn(component.address, 'get').and.returnValue(ac);
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
    component.verfiyAddress();
    expect(service.verifyAddress).toHaveBeenCalled();
  });

  it('should call back()', () => {
    component.back();
    expect(component.backToAddress.emit).toHaveBeenCalledWith();
  });

  it('should call required(name: string)', () => {
    component.required('someName');
    expect(component.address.get).toHaveBeenCalledWith('someName');
  });

  it('should call notSelected(name: string)', () => {
    component.notSelected('someName');
    expect(component.address.get).toHaveBeenCalledWith('someName');
  });

  it('should call toggleDefaultAddress()', () => {
    component.address.value.defaultAddress = false;
    component.toggleDefaultAddress();
    expect(component.address.value.defaultAddress).toBeTruthy();
  });

  it('should call titleSelected()', () => {
    component.titleSelected({ code: 'test select title' });
    expect(component.address['controls'].titleCode.value).toEqual(
      'test select title'
    );
  });

  it('should call countrySelected()', () => {
    component.countrySelected({ isocode: 'test select country' });
    expect(
      component.address['controls'].country['controls'].isocode.value
    ).toEqual('test select country');
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromUser.LoadRegions('test select country')
    );
  });

  it('should call regionSelected()', () => {
    component.regionSelected({ isocode: 'test select region' });
    expect(
      component.address['controls'].region['controls'].isocode.value
    ).toEqual('test select region');
  });
});
