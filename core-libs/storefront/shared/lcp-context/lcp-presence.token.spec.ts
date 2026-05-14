import { TestBed } from '@angular/core/testing';
import { LcpPresence } from './lcp-presence.model';
import { DEFAULT_LCP_PRESENCE, LCP_PRESENCE } from './lcp-presence.token';

describe('LCP_PRESENCEEE InjectionToken', () => {
  it('should be provided in root with the default value DEFAULT_LCP_PRESENCE', () => {
    const context = TestBed.inject(LCP_PRESENCE);
    expect(context).toBe(DEFAULT_LCP_PRESENCE);
  });

  it('DEFAULT_LCP_PRESENCE should emit LcpPresence.NO_LCP', (done) => {
    DEFAULT_LCP_PRESENCE.subscribe({
      next: (value) => {
        expect(value).toBe(LcpPresence.NO_LCP);
        done();
      },
    });
  });
});
