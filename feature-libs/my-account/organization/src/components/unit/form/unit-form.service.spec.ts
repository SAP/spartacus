import { TestBed } from '@angular/core/testing';
import { UnitFormService } from './unit-form.service';

describe('UnitFormService', () => {
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

  it('should update built form with provided data model', () => {
    const form = service.getForm({ uid: 'uid1', name: 'name1' });
    expect(form.get('uid')).not.toBeNull();
    expect(form.get('uid').value).toEqual('uid1');
    expect(form.get('name')).not.toBeNull();
    expect(form.get('name').value).toEqual('name1');
    expect(form.get('parentOrgUnit').get('uid')).not.toBeNull();
    expect(form.get('approvalProcess').get('code')).not.toBeNull();
  });

  it('should apply the model', () => {
    const form = service.getForm({ uid: 'test' });
    expect(form.get('uid')).not.toBeNull();
    expect(form.get('uid').value).toEqual('test');
  });
});
