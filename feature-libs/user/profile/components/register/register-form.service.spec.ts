import { TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { RegisterFormService } from './register-form.service';

describe('RegisterFormService', () => {
  let service: RegisterFormService;
  let fb: UntypedFormBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterFormService, UntypedFormBuilder],
    });
    service = TestBed.inject(RegisterFormService);
    fb = TestBed.inject(UntypedFormBuilder);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('generateConsentsFormControl', () => {
    spyOn(fb, 'array').and.callThrough();
    service.generateConsentsFormControl();
    expect(fb.array).toHaveBeenCalled();
  });
  it('loadExtraRegistrationConsents', () => {
    let result = service.loadExtraRegistrationConsents();
    expect(result).toEqual([]);
  });
});
