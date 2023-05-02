import { AvatarLabelPipe } from './avatar-label.pipe';
import { User } from '@spartacus/core';

describe('AvatarLabelPipe', () => {
  let pipe: AvatarLabelPipe;

  beforeEach(() => {
    pipe = new AvatarLabelPipe();
  });

  it('transforms a user object into a label', () => {
    const user: User = {
      firstName: 'John',
      lastName: 'Doe',
    };
    const result = pipe.transform(user);
    expect(result).toBe('JD');
  });

  it('returns an empty string when the firstName property is empty', () => {
    const user: User = {
      firstName: undefined,
      lastName: 'Doe',
    };
    const result = pipe.transform(user);
    expect(result).toBe('D');
  });

  it('returns an empty string when the lastName property is empty', () => {
    const user: User = {
      firstName: 'John',
      lastName: undefined,
    };
    const result = pipe.transform(user);
    expect(result).toBe('J');
  });

  it('returns an empty string when the user object is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBe('');
  });
});
