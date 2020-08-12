import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  Country,
  Title,
  Region,
  UserAddressService,
} from '@spartacus/core';

import { UnitAddressFormComponent } from './unit-address-form.component';
import createSpy = jasmine.createSpy;
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { UnitAddressFormService } from './unit-address-form.service';
import { FormErrorsComponent } from '@spartacus/storefront';

const mockForm: FormGroup = new FormGroup({
  id: new FormControl(''),
  titleCode: new FormControl(''),
  firstName: new FormControl(''),
  lastName: new FormControl(''),
  line1: new FormControl(''),
  line2: new FormControl(''),
  town: new FormControl(''),
  postalCode: new FormControl(''),
  phone: new FormControl(''),
  country: new FormGroup({
    isocode: new FormControl(null),
  }),
  region: new FormGroup({
    isocode: new FormControl(null),
  }),
});

const mockTitles: Title[] = [
  {
    code: 'mr',
    name: 'Mr.',
  },
  {
    code: 'mrs',
    name: 'Mrs.',
  },
];

const mockCountries: Country[] = [
  {
    isocode: 'AD',
    name: 'Andorra',
  },
  {
    isocode: 'RS',
    name: 'Serbia',
  },
];
const mockRegions: Region[] = [
  {
    isocode: 'CA-ON',
    name: 'Ontario',
  },
  {
    isocode: 'CA-QC',
    name: 'Quebec',
  },
];

// const addressId = 'a1';

// const mockAddress: Partial<B2BAddress> = {
//   id: addressId,
//   firstName: 'John',
//   lastName: 'Doe',
//   titleCode: 'mr',
//   line1: 'Toyosaki 2 create on cart',
//   line2: 'line2',
//   town: 'town',
//   region: { isocode: 'JP-27' },
//   postalCode: 'zip',
//   country: { isocode: 'JP' },
// };

class MockUserAddressService implements Partial<UserAddressService> {
  getRegions = createSpy('getRegions').and.returnValue(of(mockRegions));
}

class MockUnitAddressFormService implements Partial<UnitAddressFormService> {
  getDeliveryCountries(): Observable<Country[]> {
    return of(mockCountries);
  }

  getTitles(): Observable<Title[]> {
    return of(mockTitles);
  }
}

describe('UnitAddressFormComponent', () => {
  let component: UnitAddressFormComponent;
  let fixture: ComponentFixture<UnitAddressFormComponent>;
  let userAddressService: UserAddressService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        NgSelectModule,
        RouterTestingModule,
        UrlTestingModule,
        ReactiveFormsModule,
      ],
      declarations: [UnitAddressFormComponent, FormErrorsComponent],
      providers: [
        { provide: UserAddressService, useClass: MockUserAddressService },
        {
          provide: UnitAddressFormService,
          useClass: MockUnitAddressFormService,
        },
      ],
    }).compileComponents();

    userAddressService = TestBed.inject(UserAddressService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddressFormComponent);
    component = fixture.componentInstance;
    component.form = mockForm;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select country and call getRegions', () => {
    component.countrySelected(mockCountries[0]);
    expect(
      component.form['controls'].country['controls'].isocode.value
    ).toEqual(mockCountries[0].isocode);
    expect(userAddressService.getRegions).toHaveBeenCalledWith(
      mockCountries[0].isocode
    );
  });
});
