import { TestBed } from '@angular/core/testing';
import {
  PermissionFormService,
  PermissionType,
} from './permission-form.service';

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

  describe('default value', () => {
    it('should have default type', () => {
      const form = service.getForm();
      expect(form.get('orderApprovalPermissionType').get('code').value).toEqual(
        PermissionType.EXCEEDED
      );
    });
    it('should not have default type', () => {
      const form = service.getForm({
        orderApprovalPermissionType: { code: PermissionType.TIME_SPAN },
      });
      expect(
        form.get('orderApprovalPermissionType').get('code').value
      ).not.toEqual('B2BBudgetExceededPermission');
    });
  });

  describe('amend form', () => {
    it('should have EXCEED form structure by default', () => {
      const form = service.getForm();
      expect(form.get('periodRange')).toBeFalsy();
      expect(form.get('currency')).toBeFalsy();
      expect(form.get('threshold')).toBeFalsy();
    });

    it('should have TIME_SPAN form structure by default', () => {
      const form = service.getForm({
        orderApprovalPermissionType: { code: PermissionType.TIME_SPAN },
      });
      expect(form.get('currency')).toBeTruthy();
      expect(form.get('threshold')).toBeTruthy();
      expect(form.get('periodRange')).toBeTruthy();
    });

    it('should have ORDER form structure by default', () => {
      const form = service.getForm({
        orderApprovalPermissionType: { code: PermissionType.ORDER },
      });
      expect(form.get('currency')).toBeTruthy();
      expect(form.get('threshold')).toBeTruthy();
      expect(form.get('periodRange')).toBeFalsy();
    });

    it('should amend default form after changing to B2BOrderThresholdTimespanPermission', () => {
      const form = service.getForm();
      form
        .get('orderApprovalPermissionType')
        .get('code')
        .setValue(PermissionType.TIME_SPAN);
      expect(form.get('currency')).toBeTruthy();
      expect(form.get('threshold')).toBeTruthy();
      expect(form.get('periodRange')).toBeTruthy();
    });

    it('should amend default form after changing to B2BOrderThresholdPermission', () => {
      const form = service.getForm();
      form
        .get('orderApprovalPermissionType')
        .get('code')
        .setValue(PermissionType.ORDER);
      expect(form.get('currency')).toBeTruthy();
      expect(form.get('threshold')).toBeTruthy();
      expect(form.get('periodRange')).toBeFalsy();
    });
  });
});
