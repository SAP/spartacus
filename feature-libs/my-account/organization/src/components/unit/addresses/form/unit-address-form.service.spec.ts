import { TestBed } from '@angular/core/testing';
import {
  Country,
  Title,
  UserAddressService,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UnitAddressFormService } from './unit-address-form.service';

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

xdescribe('UnitAddressFormService', () => {
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
    expect(form.get('id')).not.toBeNull();
    expect(form.get('firstName')).not.toBeNull();
    expect(form.get('lastName')).not.toBeNull();
    expect(form.get('line1')).not.toBeNull();
    expect(form.get('town')).not.toBeNull();
    expect(form.get('region').get('isocode')).not.toBeNull();
    expect(form.get('country').get('isocode')).not.toBeNull();
  });

  it('should apply the model', () => {
    const form = service.getForm({ id: 'test' });
    expect(form.get('id')).not.toBeNull();
    expect(form.get('id').value).toEqual('test');
  });
});
