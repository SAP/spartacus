import { LoggerService } from '../../logger';
import { validateConfig } from './config-validator';

describe('config validator', () => {
  const logger = new LoggerService();
  beforeEach(() => {
    spyOn(logger, 'warn');
  });

  it('should not warn if there is no validators', () => {
    validateConfig({}, [], logger);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('should warn if there is a validation error', () => {
    validateConfig({}, [(_c) => 'error'], logger);
    expect(logger.warn).toHaveBeenCalledWith('error');
  });

  it('should warn only for errors', () => {
    const mockInvalid = (_c) => 'error';
    const mockValidValidator = (_c) => {};
    validateConfig({}, [mockInvalid, mockValidValidator, mockInvalid], logger);
    expect(logger.warn).toHaveBeenCalledTimes(2);
  });
});
