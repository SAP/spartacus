import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { UserSignUp } from '@spartacus/user/profile/root';
import { firstValueFrom, of } from 'rxjs';
import { UserProfileAdapter } from './user-profile.adapter';
import { UserProfileConnector } from './user-profile.connector';

class MockUserAdapter implements UserProfileAdapter {
  update = vi.fn('update').mockReturnValue(of({}));
  register = vi.fn('register').mockImplementation((userId) => of(userId));
  registerGuest = vi
    .fn('registerGuest')
    .mockImplementation((userId) => of(userId));
  close = vi.fn('remove').mockReturnValue(of({}));
  requestForgotPasswordEmail = vi
    .fn('requestForgotPasswordEmail')
    .mockReturnValue(of({}));
  resetPassword = vi.fn('resetPassword').mockReturnValue(of({}));
  updateEmail = vi.fn('updateEmail').mockReturnValue(of({}));
  updatePassword = vi.fn('updatePassword').mockReturnValue(of({}));
  loadTitles = vi.fn('loadTitles').mockReturnValue(of([]));
}

describe('UserConnector', () => {
  let service: UserProfileConnector;
  let adapter: UserProfileAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserProfileConnector,
        { provide: UserProfileAdapter, useClass: MockUserAdapter },
      ],
    });

    service = TestBed.inject(UserProfileConnector);
    adapter = TestBed.inject(UserProfileAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('update should call adapter', async () => {
    const result = await firstValueFrom(service.update('user-id', {}));
    expect(result).toEqual({});
    expect(adapter.update).toHaveBeenCalledWith('user-id', {});
  });

  it('register should call adapter', async () => {
    const registerData: UserSignUp = {
      firstName: 'name',
      lastName: 'name',
      password: 'pass',
      titleCode: 'title',
      uid: 'uid',
    };

    const result = await firstValueFrom(service.register(registerData));
    expect(result).toBe(registerData);
    expect(adapter.register).toHaveBeenCalledWith(registerData);
  });

  it('registerGuest should call adapter', async () => {
    const result = await firstValueFrom(
      service.registerGuest('guid', 'password')
    );
    expect(result).toBe('guid');
    expect(adapter.registerGuest).toHaveBeenCalledWith('guid', 'password');
  });

  it('remove should call adapter', async () => {
    const result = await firstValueFrom(service.remove('user-id'));
    expect(result).toEqual({});
    expect(adapter.close).toHaveBeenCalledWith('user-id');
  });

  it('requestForgotPasswordEmail should call adapter', async () => {
    const result = await firstValueFrom(
      service.requestForgotPasswordEmail('user-id')
    );
    expect(result).toEqual({});
    expect(adapter.requestForgotPasswordEmail).toHaveBeenCalledWith('user-id');
  });

  it('resetPassword should call adapter', async () => {
    const result = await firstValueFrom(
      service.resetPassword('token', 'password')
    );
    expect(result).toEqual({});
    expect(adapter.resetPassword).toHaveBeenCalledWith('token', 'password');
  });

  it('updateEmail should call adapter', async () => {
    const result = await firstValueFrom(
      service.updateEmail('email', 'password', 'new-email')
    );
    expect(result).toEqual({});
    expect(adapter.updateEmail).toHaveBeenCalledWith(
      'email',
      'password',
      'new-email'
    );
  });

  it('updatePassword should call adapter', async () => {
    const result = await firstValueFrom(
      service.updatePassword('email', 'password', 'new-password')
    );
    expect(result).toEqual({});
    expect(adapter.updatePassword).toHaveBeenCalledWith(
      'email',
      'password',
      'new-password'
    );
  });

  it('getTitles should call adapter', async () => {
    const result = await firstValueFrom(service.getTitles());
    expect(result).toEqual([]);
    expect(adapter.loadTitles).toHaveBeenCalledWith();
  });
});
