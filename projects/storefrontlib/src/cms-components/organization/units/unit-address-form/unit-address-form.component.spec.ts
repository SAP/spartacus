import { Pipe, PipeTransform } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import {
  I18nTestingModule,
  OrgUnitService,
  B2BAddress,
  Country,
  Title,
  Region,
  UserAddressService,
  UserService,
} from '@spartacus/core';

import { UnitAddressFormComponent } from './unit-address-form.component';
import createSpy = jasmine.createSpy;
import { DatePickerModule } from '../../../../shared/components/date-picker/date-picker.module';
import { By } from '@angular/platform-browser';

class MockUserService {
  getTitles(): Observable<Title[]> {
    return of();
  }

  loadTitles(): void {}
}

class MockUserAddressService {
  getDeliveryCountries(): Observable<Country[]> {
    return of();
  }

  loadDeliveryCountries(): void {}

  getRegions(): Observable<Region[]> {
    return of();
  }
}

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

const addressId = 'a1';

const mockAddress: Partial<B2BAddress> = {
  id: addressId,
  firstName: 'John',
  lastName: 'Doe',
  titleCode: 'mr',
  line1: 'Toyosaki 2 create on cart',
  line2: 'line2',
  town: 'town',
  region: { isocode: 'JP-27' },
  postalCode: 'zip',
  country: { isocode: 'JP' },
};

const mockAddresses = [mockAddress];

class MockOrgUnitService implements Partial<OrgUnitService> {
  loadOrgUnits = createSpy('loadOrgUnits');
  loadOrgUnit = createSpy('loadOrgUnit');
  update = createSpy('update');
  loadAddresses = createSpy('loadAddresses');
  getAddress = createSpy('getAddress').and.returnValue(of(mockAddress));
  getAddresses = createSpy('getAddresses').and.returnValue(of(mockAddresses));
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('UnitAddressFormComponent', () => {
  let component: UnitAddressFormComponent;
  let fixture: ComponentFixture<UnitAddressFormComponent>;
  let userService: UserService;
  let userAddressService: UserAddressService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        DatePickerModule,
        ReactiveFormsModule,
        NgSelectModule,
        RouterTestingModule,
      ],
      declarations: [UnitAddressFormComponent, MockUrlPipe],
      providers: [
        { provide: OrgUnitService, useClass: MockOrgUnitService },
        { provide: UserService, useClass: MockUserService },
        { provide: UserAddressService, useClass: MockUserAddressService },
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService);
    userAddressService = TestBed.inject(UserAddressService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    // TODO: for fellows
    xit('should load titles', () => {
      component.ngOnInit();
      let titles: any;
      component.titles$
        .subscribe((value) => {
          titles = value;
        })
        .unsubscribe();

      expect(userService.getTitles).toHaveBeenCalled();
      expect(titles).toEqual(mockTitles);
    });
    // TODO: for fellows
    xit('should load countries', () => {
      component.ngOnInit();
      let countries: any;
      component.countries$
        .subscribe((value) => {
          countries = value;
        })
        .unsubscribe();
      expect(userAddressService.getDeliveryCountries).toHaveBeenCalled();
      expect(countries).toEqual(mockCountries);
    });
    // TODO: for fellows
    xit('should load regions', () => {
      component.ngOnInit();
      let regions: any;
      component.regions$
        .subscribe((value) => {
          regions = value;
        })
        .unsubscribe();
      expect(this.userAddressService.getRegions).toHaveBeenCalled();
      expect(regions).toEqual(mockRegions);
    });

    it('should setup clean form', () => {
      spyOn(component.form, 'patchValue');
      component.addressData = null;
      component.ngOnInit();
      expect(component.form.patchValue).not.toHaveBeenCalled();
      expect(component.form.valid).toBeFalsy();
    });

    it('should setup form for update', () => {
      spyOn(component.form, 'patchValue').and.callThrough();
      component.addressData = mockAddress;
      component.ngOnInit();
      expect(component.form.patchValue).toHaveBeenCalledWith(mockAddress);
      expect(component.form.valid).toBeTruthy();
    });
  });

  describe('verifyAddress', () => {
    it('should not emit value if form is invalid', () => {
      spyOn(component.submit, 'emit');
      const submitButton = fixture.debugElement.query(By.css('.btn-primary'));
      submitButton.triggerEventHandler('click', null);
      expect(component.submit.emit).not.toHaveBeenCalled();
    });

    it('should emit value if form is valid', () => {
      spyOn(component.submit, 'emit');
      component.addressData = mockAddress;
      component.ngOnInit();
      const submitButton = fixture.debugElement.query(By.css('.btn-primary'));
      submitButton.triggerEventHandler('click', null);
      expect(component.submit.emit).toHaveBeenCalledWith(component.form.value);
    });
  });

  describe('back', () => {
    it('should emit clickBack event', () => {
      spyOn(component.clickBack, 'emit');
      component.back();
      expect(component.clickBack.emit).toHaveBeenCalled();
    });
  });
});
