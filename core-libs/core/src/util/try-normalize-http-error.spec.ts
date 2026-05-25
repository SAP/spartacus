import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as isDevModeFunc from '@angular/core';
import { HttpErrorModel } from '../model/index';
import { LoggerService } from '../logger';
import { tryNormalizeHttpError } from './try-normalize-http-error';

const logger = new LoggerService();

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
      'Error passed to tryNormalizeHttpError is not HttpErrorResponse instance',
      inputError
    );
  });

  describe(`when the provided argument is not HttpError`, () => {
    it('should return the original error', () => {
      const error = 'xxx';
      const result = tryNormalizeHttpError(error, logger);
      expect(result).toBe(error as any);
    });

    it('should log an error to the console in dev mode if logger is not provided', () => {
      spyOnProperty(isDevModeFunc, 'isDevMode').and.returnValue(() => true);
      spyOn(console, 'error');
      const error = 'xxx';
      tryNormalizeHttpError(error, logger);
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Error passed to tryNormalizeHttpError is not HttpErrorResponse instance',
        error
      );
    });

    it('should log an error to the logger in dev mode if logger is provided', () => {
      spyOnProperty(isDevModeFunc, 'isDevMode').and.returnValue(() => true);
      spyOn(logger, 'error');
      const error = 'xxx';
      tryNormalizeHttpError(error, logger);
      expect(logger.error).toHaveBeenCalledWith(
        'Error passed to tryNormalizeHttpError is not HttpErrorResponse instance',
        error
      );
    });
  });

  describe('when the provided error is an instance of HttpErrorResponse', () => {
    it('should make it serializable', () => {
      const mockError = new HttpErrorResponse({
        error: 'error',
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 500,
        statusText: 'Unknown error',
        url: '/xxx',
      });

      const result = tryNormalizeHttpError(mockError, logger);
      expect(result).toEqual(
        jasmine.objectContaining({
          message: mockError.message,
          status: mockError.status,
          statusText: mockError.statusText,
          url: mockError.url,
        })
      );
      expect(result instanceof HttpErrorModel).toBeTruthy();
    });

    it('should serialize details', () => {
      const mockError = new HttpErrorResponse({
        error: { errors: [{ message: 'errorMessage' }] },
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 500,
        statusText: 'Unknown error',
        url: '/xxx',
      });
      const result = tryNormalizeHttpError(mockError, logger);
      expect(result).toEqual(
        jasmine.objectContaining({
          message: mockError.message,
          status: mockError.status,
          statusText: mockError.statusText,
          url: mockError.url,
          details: [
            {
              message: 'errorMessage',
            },
          ],
        })
      );
      expect(result instanceof HttpErrorModel).toBeTruthy();
    });

    it('should normalize single error', () => {
      const mockError = new HttpErrorResponse({
        error: { error: 'errorType', error_description: 'errorMessage' },
        headers: new HttpHeaders().set('xxx', 'xxx'),
        status: 500,
        statusText: 'Unknown error',
        url: '/xxx',
      });
      const result = tryNormalizeHttpError(mockError, logger);
      expect(result).toEqual(
        jasmine.objectContaining({
          message: mockError.message,
          status: mockError.status,
          statusText: mockError.statusText,
          url: mockError.url,
          details: [
            {
              message: 'errorMessage',
              type: 'errorType',
            },
          ],
        })
      );
      expect(result instanceof HttpErrorModel).toBeTruthy();
    });
  });

  describe('when the provided error is an instance of HttpErrorModel due to backoff mechanism', () => {
    it('should return the normalized error', () => {
      const normalizedError = new HttpErrorModel();
      normalizedError.status = 400;

      const result = tryNormalizeHttpError(normalizedError, logger);
      expect(result).toEqual(normalizedError);
    });
  });
});
