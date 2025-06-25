import { TestBed } from '@angular/core/testing';
import { LcpPresence } from './lcp-context.model';
import { DEFAULT_LCP_CONTEXT, LCP_CONTEXT } from './lcp-context.token';

describe('LCP_CONTEXT InjectionToken', () => {
  it('should be provided in root with the default value DEFAULT_LCP_CONTEXT', () => {
    const context = TestBed.inject(LCP_CONTEXT);
    expect(context).toBe(DEFAULT_LCP_CONTEXT);
  });

  it('DEFAULT_LCP_CONTEXT.lcpPresence$ should emit LcpPresence.NO_LCP', (done) => {
    DEFAULT_LCP_CONTEXT.lcpPresence$.subscribe({
      next: (value) => {
        expect(value).toBe(LcpPresence.NO_LCP);
        done();
      },
    });
  });
});
