import { TestBed } from '@angular/core/testing';
import { Priority } from '@spartacus/core';
import { UnknownServerErrorResponseFactory } from './unknown-server-error-response-factory';

describe('UnknownServerErrorResponse', () => {
  let unknownServerErrorResponse: UnknownServerErrorResponseFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnknownServerErrorResponseFactory],
    });
    unknownServerErrorResponse = TestBed.inject(
      UnknownServerErrorResponseFactory
    );
  });

  it('should return the priority', () => {
    expect(unknownServerErrorResponse.getPriority()).toBe(Priority.FALLBACK);
  });

  it('should match', () => {
    expect(unknownServerErrorResponse.hasMatch()).toBe(true);
  });

  it('should create the error', () => {
    const error = 'error';
    const result = unknownServerErrorResponse.create(error);
    expect(result.message).toBe('An unknown server error occurred');
    expect(result.cause).toBe(error);
  });
});
