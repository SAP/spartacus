import { TestBed } from '@angular/core/testing';
import { UserFormService } from './user-form.service';

describe('UserFormService', () => {
  let service: UserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm();
    expect(form.get('email')).not.toBeNull();
    expect(form.get('firstName')).not.toBeNull();
    expect(form.get('orgUnit').get('uid')).not.toBeNull();
  });

  it('should apply the model', () => {
    const email = 'test@test.com';
    const form = service.getForm({ email });
    expect(form.get('email')).not.toBeNull();
    expect(form.get('email').value).toEqual(email);
  });
});
