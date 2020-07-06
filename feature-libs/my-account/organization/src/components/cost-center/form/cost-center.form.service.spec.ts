import { TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { CostCenterFormService } from './cost-center-form.service';

describe('CostCenterFormService', () => {
  let service: CostCenterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostCenterFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = new FormGroup({});
    service.build(form);
    expect(form.get('code')).toBeDefined();
    expect(form.get('name')).toBeDefined();
    expect(form.get('currency').get('isocode')).toBeDefined();
    expect(form.get('unit').get('uid')).toBeDefined();
  });

  it('should fail building silently', () => {
    const form = undefined;
    service.build(form);
    expect(form).toBeUndefined();
  });
});
