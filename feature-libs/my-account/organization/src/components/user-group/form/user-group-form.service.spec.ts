import { TestBed } from '@angular/core/testing';
import { UserGroupFormService } from './user-group-form.service';

describe('UserGroupFormService', () => {
  let service: UserGroupFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGroupFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm({});
    expect(form.get('code')).toBeDefined();
    expect(form.get('name')).toBeDefined();
    expect(form.get('currency').get('isocode')).toBeDefined();
    expect(form.get('unit').get('uid')).toBeDefined();
  });

  it('should apply the model', () => {
    const form = service.getForm({ code: 'test' });
    expect(form.get('code')).toBeDefined();
    expect(form.get('code').value).toEqual('test');
  });
});
