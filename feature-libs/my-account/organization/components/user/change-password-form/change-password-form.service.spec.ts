import { TestBed } from '@angular/core/testing';
import { ChangePasswordFormService } from './change-password-form.service';

describe('ChangePasswordFormService', () => {
  let service: ChangePasswordFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePasswordFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm();
    expect(form.get('password')).not.toBeNull();
    expect(form.get('confirmPassword')).not.toBeNull();
  });
});
