import { TestBed } from '@angular/core/testing';
import { LcpPresence } from './lcp-context.model';
import { DEFAULT_LCP_PRESENCE, LCP_PRESENCE } from './lcp-context.token';

describe('LCP_CONTEXT InjectionToken', () => {
  it('should be provided in root with the default value DEFAULT_LCP_CONTEXT', () => {
    const context = TestBed.inject(LCP_PRESENCE);
    expect(context).toBe(DEFAULT_LCP_PRESENCE);
  });

  it('DEFAULT_LCP_CONTEXT should emit LcpPresence.NO_LCP', (done) => {
    DEFAULT_LCP_PRESENCE.subscribe({
      next: (value) => {
        expect(value).toBe(LcpPresence.NO_LCP);
        done();
      },
    });
  });
});
