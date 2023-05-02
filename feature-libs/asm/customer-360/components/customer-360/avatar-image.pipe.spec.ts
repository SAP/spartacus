import { AvatarImagePipe } from './avatar-image.pipe';

describe('GetAvatarImagePipe', () => {
  let pipe: AvatarImagePipe;
  beforeEach(() => {
    pipe = new AvatarImagePipe();
  });

  it('transforms a CustomerOverview object into an Image object', () => {
    const overview = {
      name: 'John Doe',
      userAvatar: {
        url: 'http://example.com/avatar.jpg',
        format: 'jpg',
      },
    };
    const result = pipe.transform(overview);
    expect(result).toEqual({
      altText: 'John Doe',
      url: 'http://example.com/avatar.jpg',
      format: 'jpg',
    });
  });

  it('returns undefined when the input is undefined', () => {
    const result = pipe.transform(undefined);
    expect(result).toBeUndefined();
  });

  it('returns undefined when the userAvatar.url is undefined', () => {
    const overview = {
      name: 'John Doe',
      userAvatar: {},
    };
    const result = pipe.transform(overview);
    expect(result).toBeUndefined();
  });
});
