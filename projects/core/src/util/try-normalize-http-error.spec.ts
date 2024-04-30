import {
  HttpErrorModel,
  LoggerService,
  tryNormalizeHttpError,
} from '@spartacus/core';

describe('tryNormalizeHttpError', () => {
  let mockLogger: LoggerService;

  beforeEach(() => {
    mockLogger = jasmine.createSpyObj('LoggerService', ['error']);
  });

  it('should return the normalized error when input is an HttpErrorModel', () => {
    const inputError = new HttpErrorModel();
    const result = tryNormalizeHttpError(inputError, mockLogger);

    expect(result).toBe(inputError);
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('should return the original error when input is not HttpErrorModel or HttpErrorResponse', () => {
    const inputError = new Error('An error occurred');

    const result = tryNormalizeHttpError(inputError, mockLogger);

    expect(result).toBe(inputError);
    expect(mockLogger.error).toHaveBeenCalledWith(
      'Error passed to normalizeHttpError is not HttpErrorResponse instance',
      inputError
    );
  });
});
