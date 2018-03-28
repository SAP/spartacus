import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromRoot from '../../../../routing/store';
import * as fromCheckout from '../../../store';

import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { AddressFormComponent } from './address-form.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import * as fromRouting from '../../../../routing/store';

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

describe('AddressFormComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: AddressFormComponent;
  let fixture: ComponentFixture<AddressFormComponent>;
  let fb: FormBuilder;
  let ac: AbstractControl;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            checkout: combineReducers(fromCheckout.reducers)
          })
        ],
        declarations: [AddressFormComponent],
        providers: [
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

    component.address = fb.group({
      titleCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      town: ['', Validators.required],
      region: fb.group({
        isocode: ['', Validators.required]
      }),
      country: fb.group({
        isocode: ['', Validators.required]
      }),
      postalCode: ['', Validators.required],
      phone: ''
    });

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(ac, 'hasError').and.callThrough();
    spyOn(component.addAddress, 'emit').and.callThrough();
    spyOn(component.address, 'get').and.returnValue(ac);
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

  it('should call next()', () => {
    component.next();
    expect(component.addAddress.emit).toHaveBeenCalledWith(component.address.value);
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
