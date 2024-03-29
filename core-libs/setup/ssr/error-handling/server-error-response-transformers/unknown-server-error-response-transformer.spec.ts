import { Priority } from '@spartacus/core';
import { UnknownServerErrorResponseTransformer } from './unknown-server-error-response-transformer';

describe('UnknonnServerErrorResponse', () => {
  let unknownServerErrorResponse: UnknownServerErrorResponseTransformer;

  beforeEach(() => {
    unknownServerErrorResponse = new UnknownServerErrorResponseTransformer();
  });

  it('should return the priority', () => {
    expect(unknownServerErrorResponse.getPriority()).toBe(Priority.FALLBACK);
  });

  it('should match', () => {
    expect(unknownServerErrorResponse.hasMatch()).toBe(true);
  });

  it('should transform the error', () => {
    const error = 'error';
    const result = unknownServerErrorResponse.transform(error);
    expect(result.data?.message).toBe('An unknown server error occurred');
    expect(result.data?.originalError).toBe(error);
  });
});
