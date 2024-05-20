import { InvalidTraceparentLengthError } from './invalid-traceparent-length-error';

describe('InvalidTraceparentFormatError', () => {
  it('should be an instance of InstantiationError', () => {
    const error = new InvalidTraceparentLengthError(0);
    expect(error).toBeInstanceOf(InvalidTraceparentLengthError);
  });

  it('should have the correct message', () => {
    const error = new InvalidTraceparentLengthError(20);
    expect(error.message).toBe(
      `Traceparent header has invalid length: ${20}. Expected 55 characters.`
    );
  });
});
