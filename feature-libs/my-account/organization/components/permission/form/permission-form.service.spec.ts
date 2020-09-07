import { TestBed } from '@angular/core/testing';
import { PermissionFormService } from './permission-form.service';

describe('PermissionFormService', () => {
  let service: PermissionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissionFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm({});
    expect(form.get('code')).not.toBeNull();
    expect(form.get('orderApprovalPermissionType').get('code')).not.toBeNull();
    expect(form.get('orgUnit').get('uid')).not.toBeNull();
  });

  it('should apply the model', () => {
    const form = service.getForm({
      code: 'test',
      orderApprovalPermissionType: { code: 'abc' },
      orgUnit: { uid: '123' },
    });
    expect(form.get('code')).not.toBeNull();
    expect(form.get('code').value).toEqual('test');
    expect(form.get('orgUnit').get('uid').value).toEqual('123');
    expect(form.get('orderApprovalPermissionType').get('code').value).toEqual(
      'abc'
    );
  });
});
