import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { LcpPresence } from './lcp-presence.model';
import { DEFAULT_LCP_PRESENCE, LCP_PRESENCE } from './lcp-presence.token';

describe('LCP_PRESENCEEE InjectionToken', () => {
  it('should be provided in root with the default value DEFAULT_LCP_PRESENCE', () => {
    const context = TestBed.inject(LCP_PRESENCE);
    expect(context).toBe(DEFAULT_LCP_PRESENCE);
  });

  it('DEFAULT_LCP_PRESENCE should emit LcpPresence.NO_LCP', async () => {
    const value = await firstValueFrom(DEFAULT_LCP_PRESENCE);
    expect(value).toBe(LcpPresence.NO_LCP);
  });
});
