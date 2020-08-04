import { TestBed } from '@angular/core/testing';
import { UserFormService } from './user-form.service';

describe('UserFormService', () => {
  let service: UserFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserFormService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should build the form', () => {
    const form = service.getForm({});
    expect(form.get('uid')).toBeDefined();
    expect(form.get('name')).toBeDefined();
    expect(form.get('orgUnit').get('uid')).toBeDefined();
  });

  it('should apply the model', () => {
    const form = service.getForm({ uid: 'test' });
    expect(form.get('uid')).toBeDefined();
    expect(form.get('uid').value).toEqual('test');
  });
});
