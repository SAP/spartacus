import { TestBed } from '@angular/core/testing';
import { LcpPresence } from '@spartacus/storefront';
import { BehaviorSubject, defer, firstValueFrom, of } from 'rxjs';
import { LCP_PRESENCE } from '../../shared/lcp-context/lcp-presence.token';
import { CmsComponentData } from '../page/model/cms-component-data';
import { CmsLcpService } from './cms-lcp.service';
import { provideLcpPresenceForCmsComponent } from './provide-lcp-presence-for-cms-component';

const testComponentData = { uid: 'test-component' };

class MockCmsComponentData {
  data$ = new BehaviorSubject<any>(testComponentData);
}

class MockCmsLcpService {
  getLcpPresence = vi.fn();
}

describe('provideLcpContextForCmsComponent', () => {
  let mockCmsComponentData: MockCmsComponentData;
  let mockCmsLcpService: MockCmsLcpService;

  beforeEach(() => {
    mockCmsComponentData = new MockCmsComponentData();
    mockCmsLcpService = new MockCmsLcpService();
    TestBed.configureTestingModule({
      providers: [
        { provide: CmsComponentData, useValue: mockCmsComponentData },
        { provide: CmsLcpService, useValue: mockCmsLcpService },
        provideLcpPresenceForCmsComponent(),
      ],
    });
  });

  it('should provide LCP_PRESENCE with lcpPresence$ observable returning HAS_LCP', async () => {
    mockCmsLcpService.getLcpPresence.mockReturnValue(of(LcpPresence.HAS_LCP));
    const lcpPresence$ = TestBed.inject(LCP_PRESENCE);
    const lcpPresence = await firstValueFrom(lcpPresence$);
    expect(lcpPresence).toEqual(LcpPresence.HAS_LCP);
    expect(mockCmsLcpService.getLcpPresence).toHaveBeenCalledWith(
      testComponentData
    );
  });

  it('should provide LCP_PRESENCE with lcpPresence$ observable returning NO_LCP', async () => {
    mockCmsLcpService.getLcpPresence.mockReturnValue(of(LcpPresence.NO_LCP));
    const lcpPresence$ = TestBed.inject(LCP_PRESENCE);
    const lcpPresence = await firstValueFrom(lcpPresence$);
    expect(lcpPresence).toEqual(LcpPresence.NO_LCP);
    expect(mockCmsLcpService.getLcpPresence).toHaveBeenCalledWith(
      testComponentData
    );
  });

  it('should not emit duplicate values (distinctUntilChanged)', () => {
    mockCmsLcpService.getLcpPresence.mockReturnValue(
      of(
        LcpPresence.NO_LCP,
        LcpPresence.NO_LCP,
        LcpPresence.HAS_LCP,
        LcpPresence.HAS_LCP
      )
    );
    const lcpPresence$ = TestBed.inject(LCP_PRESENCE);
    const emitted: any[] = [];
    const sub = lcpPresence$.subscribe((val) => {
      emitted.push(val);
    });
    expect(emitted.length).toBe(2);
    expect(emitted).toEqual([LcpPresence.NO_LCP, LcpPresence.HAS_LCP]);
    sub.unsubscribe();
  });

  it('should replay the last value to new subscribers (shareReplay)', () => {
    const lcpPresence$ = TestBed.inject(LCP_PRESENCE);
    let heavyCalculationsCounter = 0;
    mockCmsLcpService.getLcpPresence.mockReturnValue(
      defer(() => {
        heavyCalculationsCounter++;
        return of(LcpPresence.HAS_LCP);
      })
    );

    const sub1 = lcpPresence$.subscribe(() => {});

    const sub2 = lcpPresence$.subscribe(() => {});
    expect(heavyCalculationsCounter).toBe(1); // Only one calculation should happen
    sub1.unsubscribe();
    sub2.unsubscribe();
  });
});
