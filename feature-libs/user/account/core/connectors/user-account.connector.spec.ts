import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VerificationToken, VerificationTokenCreation } from '../../root/model';
import { UserAccountAdapter } from './user-account.adapter';
import { UserAccountConnector } from './user-account.connector';

const verificationTokenCreation: VerificationTokenCreation = {
  purpose: 'LOGIN',
  loginId: 'test@email.com',
  password: '1234',
};

const verificationToken: VerificationToken = {
  expiresIn: '300',
  tokenId: 'mockTokenId',
};

class MockUserAdapter implements UserAccountAdapter {
  createVerificationToken = vi
    .fn('createVerificationToken')
    .mockImplementation(() => of(verificationToken));
  load = vi.fn('load').mockImplementation((userId) => of(`load-${userId}`));
}

describe('UserConnector', () => {
  let service: UserAccountConnector;
  let adapter: UserAccountAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAccountConnector,
        { provide: UserAccountAdapter, useClass: MockUserAdapter },
      ],
    });

    service = TestBed.inject(UserAccountConnector);
    adapter = TestBed.inject(UserAccountAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should call adapter', () => {
    let result;
    service.get('user-id').subscribe((res) => (result = res));
    expect(result).toEqual('load-user-id');
    expect(adapter.load).toHaveBeenCalledWith('user-id');
  });

  it('should create a new verification token', () => {
    let result;
    service
      .createVerificationToken(verificationTokenCreation)
      .subscribe((res) => (result = res));
    expect(result).toEqual(verificationToken);
    expect(adapter.createVerificationToken).toHaveBeenCalledWith(
      verificationTokenCreation
    );
  });
});
