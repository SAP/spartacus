import { InvalidTraceparentFormatError } from './invalid-traceparent-format-error';

describe('InvalidTraceparentFormatError', () => {
  it('should be an instance of InstantiationError', () => {
    const error = new InvalidTraceparentFormatError();
    expect(error).toBeInstanceOf(InvalidTraceparentFormatError);
  });
});
