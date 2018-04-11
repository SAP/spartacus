import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';
import * as fromCart from '../../../../cart/store';
import * as fromAuth from '../../../../auth/store';

import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { AddressFormComponent } from './address-form.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  AbstractControl
} from '@angular/forms';

import { of } from 'rxjs/observable/of';
import * as fromRouting from '../../../../routing/store';
import { MaterialModule } from '../../../../material.module';
import { SuggestedAddressDialogComponent } from './suggested-addresses-dialog/suggested-addresses-dialog.component';
import { CheckoutService } from '../../../services';
import { CartService } from '../../../../cart/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material';

export class MockAbstractControl {
  hasError() {}
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

fdescribe('AddressFormComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let fb: FormBuilder;
  let ac: AbstractControl;
  let dialog: MatDialog;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          MaterialModule,
          BrowserAnimationsModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            checkout: combineReducers(fromCheckout.reducers),
            cart: combineReducers(fromCart.reducers),
            user: combineReducers(fromAuth.reducers)
          })
        ],
        declarations: [AddressFormComponent, SuggestedAddressDialogComponent],
        providers: [
          CheckoutService,
          CartService,
          { provide: FormGroup, useClass: MockFormGroup },
          { provide: AbstractControl, useClass: MockAbstractControl }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fb = TestBed.get(FormBuilder);
    fixture = TestBed.createComponent(AddressFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    ac = TestBed.get(AbstractControl);
    dialog = TestBed.get(MatDialog);

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(ac, 'hasError').and.callThrough();
    spyOn(component.addAddress, 'emit').and.callThrough();
    spyOn(component.address, 'get').and.returnValue(ac);
    spyOn(dialog, 'open').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit to get countries and titles data even when they not exist', () => {
    spyOn(store, 'select').and.returnValues(of({}), of({}));
    component.ngOnInit();
    component.countries$.subscribe(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.LoadDeliveryCountries()
      );
    });
    component.titles$.subscribe(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        new fromCheckout.LoadTitles()
      );
    });
  });

  it('should call ngOnInit to get countries and titles data when data exist', () => {
    spyOn(store, 'select').and.returnValues(
      of({ mockCountriesList }),
      of({ mockTitlesList })
    );
    component.ngOnInit();
    component.countries$.subscribe(data => {
      expect(data.mockCountriesList).toBe(mockCountriesList);
    });
    component.titles$.subscribe(data => {
      expect(data.mockTitlesList).toBe(mockTitlesList);
    });
  });

  it('should call next() with valid address', () => {
    const mockAddressVerificationResult = { decision: 'ACCEPT' };
    spyOn(store, 'select').and.returnValue(of(mockAddressVerificationResult));
    component.next();
    component.addressVerificationResults$.subscribe(() =>
      expect(component.addAddress.emit).toHaveBeenCalledWith(
        component.address.value
      )
    );
  });

  it('should call next() with valid address', () => {
    const mockAddressVerificationResult = { decision: 'REJECT' };
    spyOn(store, 'select').and.returnValue(of(mockAddressVerificationResult));
    component.next();
    component.addressVerificationResults$.subscribe(() =>
      expect(component.addAddress.emit).not.toHaveBeenCalled()
    );
  });

  it('should call back()', () => {
    component.back();
    expect(store.dispatch).toHaveBeenCalledWith(
      new fromRouting.Go({
        path: ['/cart']
      })
    );
  });

  it('should call required(name: string)', () => {
    component.required('someName');
    expect(component.address.get).toHaveBeenCalledWith('someName');
  });

  it('should call notSelected(name: string)', () => {
    component.notSelected('someName');
    expect(component.address.get).toHaveBeenCalledWith('someName');
  });
});
