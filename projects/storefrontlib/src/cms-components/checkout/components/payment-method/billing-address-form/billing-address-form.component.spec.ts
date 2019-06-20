import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Country,
  I18nTestingModule,
  Region,
  UserAddressService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { BillingAddressFormComponent } from './billing-address-form.component';

describe('BillingAddressFormComponent', () => {
  let component: BillingAddressFormComponent;
  let fixture: ComponentFixture<BillingAddressFormComponent>;

  const mockInputBillingAddress = new FormGroup({
    country: new FormGroup({
      isocode: new FormControl(),
    }),
    region: new FormGroup({
      isocodeShort: new FormControl(),
    }),
  });
  const mockCountry: Country = {
    isocode: 'CA',
  };

  const mockRegion: Region = {
    isocodeShort: 'QC',
  };

  class MockUserAddressService {
    getRegions(): Observable<Region[]> {
      return of();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        NgSelectModule,
        I18nTestingModule,
      ],
      declarations: [BillingAddressFormComponent],
      providers: [
        { provide: UserAddressService, useClass: MockUserAddressService },
      ],
    })
      .overrideComponent(BillingAddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
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

  describe('countrySelected', () => {
    it('should set country isocode after countrySelected was called', () => {
      component.billingAddress = mockInputBillingAddress;
      const countryField =
        component.billingAddress['controls'].country['controls'].isocode;

      component.countrySelected(mockCountry);
      expect(countryField.value).toContain(mockCountry.isocode);
    });
  });

  describe('regionSelected', () => {
    it('should set region isocode after regionSelected was called', () => {
      component.billingAddress = mockInputBillingAddress;
      const regionField =
        component.billingAddress['controls'].region['controls'].isocodeShort;

      component.regionSelected(mockRegion);
      expect(regionField.value).toContain(mockRegion.isocodeShort);
    });
  });
});
