import { TestBed } from '@angular/core/testing';
import { B2BUnit } from '@spartacus/core';
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
    expect(form.get('approvalProcess.code')).not.toBeNull();
  });

  it('should update built form with provided data model', () => {
    const form = service.getForm({ uid: 'uid1', name: 'name1' });
    expect(form.get('uid')).not.toBeNull();
    expect(form.get('uid').value).toEqual('uid1');
    expect(form.get('name')).not.toBeNull();
    expect(form.get('name').value).toEqual('name1');
    expect(form.get('approvalProcess.code')).not.toBeNull();
  });

  it('should not have parent unit form control', () => {
    const form = service.getForm({ uid: 'uid1', name: 'name1' });
    expect(form.get('parentOrgUnit')).toBeNull();
  });

  it('should have parent unit form control with value', () => {
    const form = service.getForm({
      uid: 'uid1',
      name: 'name1',
      parentOrgUnit: { uid: 'p1' },
    } as B2BUnit);
    expect(form.get('parentOrgUnit.uid')).not.toBeNull();
    expect(form.get('parentOrgUnit.uid').value).toEqual('p1');
  });

  it('should apply the model', () => {
    const form = service.getForm({ uid: 'test' });
    expect(form.get('uid')).not.toBeNull();
    expect(form.get('uid').value).toEqual('test');
  });
});
