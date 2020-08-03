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
    expect(form.get('orderApprovalPermissionType')).toBeDefined();
    expect(form.get('code')).toBeDefined();
    expect(form.get('orgUnit').get('code')).toBeDefined();
  });

  it('should apply the model', () => {
    const form = service.getForm({ code: 'test' });
    expect(form.get('code')).toBeDefined();
    expect(form.get('code').value).toEqual('test');
  });
});
