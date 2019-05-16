import { TestBed } from '@angular/core/testing';

import { UserAccountConnector } from './user-account.connector';
import { of } from 'rxjs/internal/observable/of';
import { UserAccountAdapter } from './user-account.adapter';
import { UserRegisterFormData } from '@spartacus/core';
import createSpy = jasmine.createSpy;

class MockUserAdapter implements UserAccountAdapter {
  register = createSpy('UserAdapter.place').and.callFake(userId => of(userId));
  remove = createSpy('UserAdapter.place').and.returnValue(of({}));
  requestForgotPasswordEmail = createSpy('UserAdapter.place').and.returnValue(
    of({})
  );
  resetPassword = createSpy('UserAdapter.place').and.returnValue(of({}));
  updateEmail = createSpy('UserAdapter.place').and.returnValue(of({}));
  updatePassword = createSpy('UserAdapter.place').and.returnValue(of({}));
}

describe('SiteConnector', () => {
  let service: UserAccountConnector;
  let adapter: UserAccountAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserAccountAdapter, useClass: MockUserAdapter }],
    });

    service = TestBed.get(UserAccountConnector);
    adapter = TestBed.get(UserAccountAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('register should call adapter', () => {
    let result;

    const registerData: UserRegisterFormData = {
      firstName: 'name',
      lastName: 'name',
      password: 'pass',
      titleCode: 'title',
      uid: 'uid',
    };

    service.register(registerData).subscribe(res => (result = res));
    expect(result).toBe(registerData);
    expect(adapter.register).toHaveBeenCalledWith(registerData);
  });

  it('remove should call adapter', () => {
    let result;
    service.remove('user-id').subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.remove).toHaveBeenCalledWith('user-id');
  });

  it('requestForgotPasswordEmail should call adapter', () => {
    let result;
    service
      .requestForgotPasswordEmail('user-id')
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.requestForgotPasswordEmail).toHaveBeenCalledWith('user-id');
  });

  it('resetPassword should call adapter', () => {
    let result;
    service.resetPassword('token', 'password').subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.resetPassword).toHaveBeenCalledWith('token', 'password');
  });

  it('updateEmail should call adapter', () => {
    let result;
    service
      .updateEmail('email', 'password', 'new-email')
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.updateEmail).toHaveBeenCalledWith(
      'email',
      'password',
      'new-email'
    );
  });

  it('updatePassword should call adapter', () => {
    let result;
    service
      .updatePassword('email', 'password', 'new-password')
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.updatePassword).toHaveBeenCalledWith(
      'email',
      'password',
      'new-password'
    );
  });
});
