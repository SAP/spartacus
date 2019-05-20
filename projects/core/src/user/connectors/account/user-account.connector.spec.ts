import { TestBed } from '@angular/core/testing';
import { UserRegisterFormData } from '@spartacus/core';
import { of } from 'rxjs/internal/observable/of';
import { UserAccountAdapter } from './user-account.adapter';
import { UserAccountConnector } from './user-account.connector';
import createSpy = jasmine.createSpy;

class MockUserAccountAdapter implements UserAccountAdapter {
  register = createSpy('register').and.callFake(userId => of(userId));
  remove = createSpy('remove').and.returnValue(of({}));
  requestForgotPasswordEmail = createSpy(
    'requestForgotPasswordEmail'
  ).and.returnValue(of({}));
  resetPassword = createSpy('resetPassword').and.returnValue(of({}));
  updateEmail = createSpy('updateEmail').and.returnValue(of({}));
  updatePassword = createSpy('updatePassword').and.returnValue(of({}));
  loadTitles = createSpy('loadTitles').and.returnValue(of([]));
  loadConsents = createSpy('loadConsents').and.returnValue(of({}));
  giveConsent = createSpy('giveConsent').and.returnValue(of({}));
  withdrawConsent = createSpy('withdrawConsent').and.returnValue(of({}));
}

describe('UserAccountConnector', () => {
  let service: UserAccountConnector;
  let adapter: UserAccountAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: UserAccountAdapter, useClass: MockUserAccountAdapter },
      ],
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

  it('getTitles should call adapter', () => {
    let result;
    service.getTitles().subscribe(res => (result = res));
    expect(result).toEqual([]);
    expect(adapter.loadTitles).toHaveBeenCalledWith();
  });

  it('loadConsents should call adapter', () => {
    let result;
    service.loadConsents('userId').subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.loadConsents).toHaveBeenCalledWith('userId');
  });

  it('giveConsent should call adapter', () => {
    let result;
    service
      .giveConsent('userId', 'templateId', 0)
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.giveConsent).toHaveBeenCalledWith('userId', 'templateId', 0);
  });

  it('withdrawConsent should call adapter', () => {
    let result;
    service
      .withdrawConsent('userId', 'consentCode')
      .subscribe(res => (result = res));
    expect(result).toEqual({});
    expect(adapter.withdrawConsent).toHaveBeenCalledWith(
      'userId',
      'consentCode'
    );
  });
});
