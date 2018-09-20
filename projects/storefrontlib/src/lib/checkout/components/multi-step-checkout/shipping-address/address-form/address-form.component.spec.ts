import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromRoot from '../../../../../routing/store';
import * as fromCheckout from '../../../../store';
import * as fromCart from '../../../../../cart/store';
import * as fromUser from '../../../../../user/store';

import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { AddressFormComponent } from './address-form.component';
import {
  ReactiveFormsModule,
  FormGroup,
  AbstractControl
} from '@angular/forms';

import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../.././../../../material.module';
import { CheckoutService } from '../../../../services';
import { CartService, CartDataService } from '../../../../../cart/services';
import { MatDialog } from '@angular/material';
import { AddressFormModule } from './address-form.module';

export class MockAbstractControl {
  hasError() {}
  enable() {}
  disable() {}
}

export class MockFormGroup {
  get() {}
}
const mockTitlesList = {
  titles: [
    {
      code: 'mr',
      name: 'Mr.'
    },
    {
      code: 'mrs',
      name: 'Mrs.'
    }
  ]
};

const mockCountriesList = {
  countries: [
    {
      isocode: 'AL',
      name: 'Albania'
    },
    {
      isocode: 'AD',
      name: 'Andorra'
    }
  ]
};

const mockRegionsList = [
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
  let ac: AbstractControl;
  let dialog: MatDialog;
  let service: CheckoutService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
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
        CartDataService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    ac = TestBed.get(AbstractControl);
    dialog = TestBed.get(MatDialog);
    service = TestBed.get(CheckoutService);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(ac, 'hasError').and.callThrough();

    spyOn(component.addAddress, 'emit').and.callThrough();
    spyOn(component.backToAddress, 'emit').and.callThrough();
    spyOn(component.address, 'get').and.returnValue(ac);
    spyOn(component, 'openSuggestedAddress').and.callThrough();
    spyOn(dialog, 'open').and.callThrough();

    spyOn(service, 'verifyAddress').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get countries and titles data even when they not exist', () => {
    spyOn(store, 'select').and.returnValues(of({}), of({}), of({}), of({}));
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
    spyOn(store, 'select').and.returnValues(
      of({ mockCountriesList }),
      of({ mockTitlesList }),
      of(mockRegionsList),
      of({})
    );
    component.ngOnInit();
    component.countries$.subscribe(data => {
      expect(data.mockCountriesList).toBe(mockCountriesList);
    });
    component.titles$.subscribe(data => {
      expect(data.mockTitlesList).toBe(mockTitlesList);
    });
    component.regions$.subscribe(data => {
      expect(data).toBe(mockRegionsList);
    });
  });

  it('should add address with address verification result "accept"', () => {
    const mockAddressVerificationResult = { decision: 'ACCEPT' };
    spyOn(store, 'select').and.returnValues(
      of({}),
      of({}),
      of([]),
      of(mockAddressVerificationResult)
    );
    component.ngOnInit();
    expect(component.addAddress.emit).toHaveBeenCalledWith(
      component.address.value
    );
  });

  it('should clear address verification result with address verification result "reject"', () => {
    const mockAddressVerificationResult = { decision: 'REJECT' };
    spyOn(store, 'select').and.returnValues(
      of({}),
      of({}),
      of([]),
      of(mockAddressVerificationResult)
    );
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromCheckout.ClearAddressVerificationResults()
    );
  });

  it('should open suggested address with address verification result "review"', () => {
    const mockAddressVerificationResult = { decision: 'REVIEW' };
    spyOn(store, 'select').and.returnValues(
      of({}),
      of({}),
      of({}),
      of(mockAddressVerificationResult)
    );
    component.ngOnInit();
    expect(component.openSuggestedAddress).toHaveBeenCalledWith(
      mockAddressVerificationResult
    );
  });

  it('should call verfiyAddress()', () => {
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
  });

  it('should call regionSelected()', () => {
    component.regionSelected({ isocode: 'test select region' });
    expect(
      component.address['controls'].region['controls'].isocode.value
    ).toEqual('test select region');
  });
});
