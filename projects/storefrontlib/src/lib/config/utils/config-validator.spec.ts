import { validateConfig } from './config-validator';

describe('config validator', () => {
  it('should not warn if there is no validators', () => {
    spyOn(console, 'warn');
    validateConfig({}, []);
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('should warn if there is a validation error', () => {
    spyOn(console, 'warn');
    validateConfig({}, [c => 'error']);
    expect(console.warn).toHaveBeenCalledWith('error');
  });

  it('should warn only for errors', () => {
    spyOn(console, 'warn');
    const mockInvalid = c => 'error';
    const mockValidValidator = c => {};
    validateConfig({}, [mockInvalid, mockValidValidator, mockInvalid]);
    expect(console.warn).toHaveBeenCalledTimes(2);
  });

  it('should not warn in production mode', () => {
    spyOn(console, 'warn');
    validateConfig({ production: true }, [c => 'error']);
    expect(console.warn).not.toHaveBeenCalled();
  });
});
