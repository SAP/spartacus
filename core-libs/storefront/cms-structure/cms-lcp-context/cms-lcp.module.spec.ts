import { TestBed } from '@angular/core/testing';
import { DefaultConfig } from '@spartacus/core';
import { CmsLcpModule } from './cms-lcp.module';

describe('CmsLcpModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CmsLcpModule.forRoot()],
    });
  });

  it('should provide a default config `lcpCmsComponents.idMarker` as "__cxLCP__"', () => {
    const config = TestBed.inject(DefaultConfig);
    expect(config.lcpCmsComponents?.idMarker).toBe('__cxLCP__');
  });
});
