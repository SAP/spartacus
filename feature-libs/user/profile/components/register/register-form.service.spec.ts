import { TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { isEmpty } from 'rxjs/operators';
import { RegisterFormService } from './register-form.service';

describe('RegisterFormService', () => {
  let service: RegisterFormService;
  let fb: UntypedFormBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [UntypedFormBuilder],
    });
    service = TestBed.inject(RegisterFormService);
    fb = TestBed.inject(UntypedFormBuilder);
    TestBed.compileComponents();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('generateConsentsFormControl', () => {
    service.generateConsentsFormControl();
    expect(fb.array).toHaveBeenCalled();
  });
  describe('loadExtraRegistrationConsents', () => {
    service
      .loadExtraRegistrationConsents()
      .pipe(isEmpty())
      .subscribe((res) => {
        expect(res).toEqual(true);
      });
  });
});
