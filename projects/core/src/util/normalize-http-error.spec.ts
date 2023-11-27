import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import * as isDevModeFunc from '@angular/core';
import { LoggerService } from '../logger';
import { HttpErrorModel } from '../model/index';
import { normalizeHttpError } from './normalize-http-error';

const logger = new LoggerService();

describe('normalizeHttpError', () => {
  describe(`when the provided argument is not HttpError`, () => {
    it('should return undefined', () => {
      const error = 'xxx';
      const result = normalizeHttpError(error);
      expect(result).toEqual(undefined);
    });

    it('should log an error to the console in dev mode if logger is not provided', () => {
      spyOnProperty(isDevModeFunc, 'isDevMode').and.returnValue(() => true);
      spyOn(console, 'error');
      const error = 'xxx';
      normalizeHttpError(error);
      expect(console.error).toHaveBeenCalledWith(
        'Error passed to normalizeHttpError is not HttpErrorResponse instance',
        error
      );
    });

    it('should log an error to the logger in dev mode if logger is provided', () => {
      spyOnProperty(isDevModeFunc, 'isDevMode').and.returnValue(() => true);
      spyOn(logger, 'error');
      const error = 'xxx';
      normalizeHttpError(error, logger);
      expect(logger.error).toHaveBeenCalledWith(
        'Error passed to normalizeHttpError is not HttpErrorResponse instance',
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

      const result = normalizeHttpError(mockError);
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
      const result = normalizeHttpError(mockError);
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
      const result = normalizeHttpError(mockError);
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

      const result = normalizeHttpError(normalizedError);
      expect(result).toEqual(normalizedError);
    });
  });
});
