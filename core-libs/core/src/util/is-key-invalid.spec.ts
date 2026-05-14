import { isKeyInvalid } from '@spartacus/core';

describe('isKeyInvalid', () => {
  it('should throw an error when key is "__proto__"', () => {
    expect(() => isKeyInvalid('__proto__')).toThrow();
  });

  it('should throw an error when key is "constructor"', () => {
    expect(() => isKeyInvalid('constructor')).toThrow();
  });

  it('should throw an error when key is "prototype"', () => {
    expect(() => isKeyInvalid('prototype')).toThrow();
  });

  it('should not throw an error for a valid key like "name"', () => {
    expect(() => isKeyInvalid('name')).not.toThrow();
  });

  it('should not throw an error for a valid key like "productId"', () => {
    expect(() => isKeyInvalid('productId')).not.toThrow();
  });
});
