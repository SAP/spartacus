import { TestBed } from '@angular/core/testing';
import { UnitAddressFormService } from './unit-address-form.service';
import {
  Country,
  Region,
  Title,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';

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
}

describe('UnitAddressFormService', () => {
  let service: UnitAddressFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: UserAddressService,
          useClass: MockUserAddressService,
        },
      ],
    });
    service = TestBed.inject(UnitAddressFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm({});
    expect(form.get('id')).toBeDefined();
    expect(form.get('firstName')).toBeDefined();
    expect(form.get('lastName')).toBeDefined();
    expect(form.get('line1')).toBeDefined();
    expect(form.get('town')).toBeDefined();
    expect(form.get('region').get('isocode')).toBeDefined();
    expect(form.get('country').get('isocode')).toBeDefined();
  });

  it('should apply the model', () => {
    const form = service.getForm({ id: 'test' });
    expect(form.get('id')).toBeDefined();
    expect(form.get('id').value).toEqual('test');
  });
});
