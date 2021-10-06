import { TestBed } from '@angular/core/testing';
import { UserChangePasswordFormService } from './user-change-password-form.service';

describe('UserChangePasswordFormService', () => {
  let service: UserChangePasswordFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserChangePasswordFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm();
    expect(form.get('customerId')).not.toBeNull();
    expect(form.get('password')).not.toBeNull();
    expect(form.get('confirmPassword')).not.toBeNull();
  });
});
