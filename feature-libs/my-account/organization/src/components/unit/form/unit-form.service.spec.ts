import { TestBed } from '@angular/core/testing';
import { UnitFormService } from './unit-form.service';

xdescribe('CostCenterFormService', () => {
  let service: UnitFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm({});
    expect(form.get('uid')).not.toBeNull();
    expect(form.get('name')).not.toBeNull();
    expect(form.get('parentOrgUnit').get('uid')).not.toBeNull();
    expect(form.get('approvalProcess').get('code')).not.toBeNull();
  });

  it('should apply the model', () => {
    const form = service.getForm({ uid: 'test' });
    expect(form.get('uid')).not.toBeNull();
    expect(form.get('uid').value).toEqual('test');
  });
});
