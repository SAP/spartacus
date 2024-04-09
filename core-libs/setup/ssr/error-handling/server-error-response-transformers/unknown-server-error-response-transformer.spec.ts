import { Priority } from '@spartacus/core';
import { UnknownServerErrorResponseTransformer } from './unknown-server-error-response-transformer';
import { TestBed } from '@angular/core/testing';

describe('UnknonnServerErrorResponse', () => {
  let unknownServerErrorResponse: UnknownServerErrorResponseTransformer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnknownServerErrorResponseTransformer],
    });
    unknownServerErrorResponse = TestBed.inject(
      UnknownServerErrorResponseTransformer
    );
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
    expect(result.data?.cause).toBe(error);
  });
});
