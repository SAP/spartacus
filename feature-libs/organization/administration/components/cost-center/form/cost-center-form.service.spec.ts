import { TestBed } from '@angular/core/testing';
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
    const form = service.getForm({});
    expect(form.get('code')).not.toBeNull();
    expect(form.get('name')).not.toBeNull();
    expect(form.get('currency').get('isocode')).not.toBeNull();
    expect(form.get('unit').get('uid')).not.toBeNull();
  });

  it('should apply the model', () => {
    const form = service.getForm({ code: 'test' });
    expect(form.get('code')).not.toBeNull();
    expect(form.get('code').value).toEqual('test');
  });
});
