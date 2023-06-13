import { TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { RegisterConsentsService } from './register-consents.service';

describe('RegisterConsentsService', () => {
  let service: RegisterConsentsService;
  let fb: UntypedFormBuilder;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterConsentsService, UntypedFormBuilder],
    });
    service = TestBed.inject(RegisterConsentsService);
    fb = TestBed.inject(UntypedFormBuilder);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('generateAdditionalConsentsFormControl', () => {
    spyOn(fb, 'array').and.callThrough();
    service.generateAdditionalConsentsFormControl();
    expect(fb.array).toHaveBeenCalled();
  });
  it('loadAdditionalConsents', () => {
    let result = service.loadAdditionalConsents();
    expect(result).toEqual([]);
  });
});
