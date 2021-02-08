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
    expect(form.get('uid')).not.toBeNull();
    expect(form.get('name')).not.toBeNull();
    expect(form.get('orgUnit').get('uid')).not.toBeNull();
  });

  it('should apply the model', () => {
    const form = service.getForm({ uid: 'test' });
    expect(form.get('uid')).not.toBeNull();
    expect(form.get('uid').value).toEqual('test');
  });
});
