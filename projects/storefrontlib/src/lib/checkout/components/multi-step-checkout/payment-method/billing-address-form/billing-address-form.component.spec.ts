import { ChangeDetectionStrategy } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { Country } from '@spartacus/core';

import { BillingAddressFormComponent } from './billing-address-form.component';

describe('BillingAddressFormComponent', () => {
  let component: BillingAddressFormComponent;
  let fixture: ComponentFixture<BillingAddressFormComponent>;

  const mockInputBillingAddress = new FormGroup({
    country: new FormGroup({
      isocode: new FormControl()
    })
  });
  const mockCountry: Country = {
    isocode: 'CA'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        NgSelectModule
      ],
      declarations: [BillingAddressFormComponent]
    })
      .overrideComponent(BillingAddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressFormComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set country isocode after countrySelected was called', () => {
    component.billingAddress = mockInputBillingAddress;
    const countryField =
      component.billingAddress['controls'].country['controls'].isocode;

    component.countrySelected(mockCountry);
    expect(countryField.value).toContain(mockCountry.isocode);
  });
});
