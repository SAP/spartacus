import { TestBed } from '@angular/core/testing';
import { LcpPresence } from '@spartacus/storefront';
import { BehaviorSubject, defer, of } from 'rxjs';
import { LCP_CONTEXT } from '../../shared/directives/lcp-context/lcp-context.token';
import { CmsComponentData } from '../page/model/cms-component-data';
import { CmsLcpService } from './cms-lcp.service';
import { provideLcpContextForCmsComponent } from './provide-lcp-context-for-cms-component';

const testComponentData = { uid: 'test-component' };

class MockCmsComponentData {
  data$ = new BehaviorSubject<any>(testComponentData);
}

class MockCmsLcpService {
  getLcpPresence = jasmine.createSpy('getLcpPresence');
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
        provideLcpContextForCmsComponent(),
      ],
    });
  });

  it('should provide LCP_CONTEXT with lcpPresence$ observable returning HAS_LCP', (done) => {
    mockCmsLcpService.getLcpPresence.and.returnValue(of(LcpPresence.HAS_LCP));
    const lcpContext = TestBed.inject(LCP_CONTEXT);
    const sub = lcpContext.lcpPresence$.subscribe((lcpPresence) => {
      expect(lcpPresence).toEqual(LcpPresence.HAS_LCP);
      expect(mockCmsLcpService.getLcpPresence).toHaveBeenCalledWith(
        testComponentData
      );
      done();
    });
    sub.unsubscribe();
  });

  it('should provide LCP_CONTEXT with lcpPresence$ observable returning NO_LCP', (done) => {
    mockCmsLcpService.getLcpPresence.and.returnValue(of(LcpPresence.NO_LCP));
    const lcpContext = TestBed.inject(LCP_CONTEXT);
    const sub = lcpContext.lcpPresence$.subscribe((lcpPresence) => {
      expect(lcpPresence).toEqual(LcpPresence.NO_LCP);
      expect(mockCmsLcpService.getLcpPresence).toHaveBeenCalledWith(
        testComponentData
      );
      done();
    });
    sub.unsubscribe();
  });

  it('should not emit duplicate values (distinctUntilChanged)', () => {
    mockCmsLcpService.getLcpPresence.and.returnValue(
      of(
        LcpPresence.NO_LCP,
        LcpPresence.NO_LCP,
        LcpPresence.HAS_LCP,
        LcpPresence.HAS_LCP
      )
    );
    const lcpContext = TestBed.inject(LCP_CONTEXT);
    const emitted: any[] = [];
    const sub = lcpContext.lcpPresence$.subscribe((val) => {
      emitted.push(val);
    });
    expect(emitted.length).toBe(2);
    expect(emitted).toEqual([LcpPresence.NO_LCP, LcpPresence.HAS_LCP]);
    sub.unsubscribe();
  });

  it('should replay the last value to new subscribers (shareReplay)', () => {
    const lcpContext = TestBed.inject(LCP_CONTEXT);
    let heavyCalculationsCounter = 0;
    mockCmsLcpService.getLcpPresence.and.returnValue(
      defer(() => {
        heavyCalculationsCounter++;
        return of(LcpPresence.HAS_LCP);
      })
    );

    const sub1 = lcpContext.lcpPresence$.subscribe(() => {});

    const sub2 = lcpContext.lcpPresence$.subscribe(() => {});
    expect(heavyCalculationsCounter).toBe(1); // Only one calculation should happen
    sub1.unsubscribe();
    sub2.unsubscribe();
  });
});
