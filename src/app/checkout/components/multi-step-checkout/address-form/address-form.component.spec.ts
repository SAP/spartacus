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
import * as fromRouting from '../../../../routing/store';

export class MockAbstractControl {
  hasError() {}
}

export class MockFormGroup {
  get() {}
}

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

    component.parent = fb.group({
      address: fb.group({
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
        title: fb.group({
          code: ''
        }),
        postalCode: ['', Validators.required],
        phone: ''
      }),
      shippingMethod: fb.group({}),
      paymentMethod: fb.group({})
    });

    spyOn(store, 'dispatch').and.callThrough();
    spyOn(ac, 'hasError').and.callThrough();
    spyOn(component.added, 'emit').and.callThrough();
    spyOn(component.parent, 'get').and.returnValue(ac);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call onAdd()', () => {
    component.onAdd();
    expect(component.parent.get).toHaveBeenCalledWith('address');
    expect(component.added.emit).toHaveBeenCalledWith(
      component.parent.get('address').value
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
    expect(component.parent.get).toHaveBeenCalledWith('address.someName');
  });

  it('should call notSelected(name: string)', () => {
    component.notSelected('someName');
    expect(component.parent.get).toHaveBeenCalledWith('address.someName');
  });
});
