import { validateConfig } from './config-validator';

describe('config validator', () => {
  it('should not warn if there is no validators', () => {
    spyOn(console, 'warn');
    validateConfig({}, []);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should warn if there is a validation error', () => {
    spyOn(console, 'warn');
    validateConfig({}, [(_c) => 'error']);
    expect(console.warn).toHaveBeenCalledWith('error');
  });

  it('should warn only for errors', () => {
    spyOn(console, 'warn');
    const mockInvalid = (_c) => 'error';
    const mockValidValidator = (_c) => {};
    const EXPECTED_TIMES_CALLED = 2;
    validateConfig({}, [mockInvalid, mockValidValidator, mockInvalid]);
    expect(console.warn).toHaveBeenCalledTimes(EXPECTED_TIMES_CALLED);
  });
});
