import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { LcpPresence } from '../../shared/lcp-context/lcp-presence.model';
import { CmsLcpService } from './cms-lcp.service';
import { LcpCmsComponentsConfig } from './config/lcp-cms-components.config';

describe('CmsLcpService', () => {
  let service: CmsLcpService;
  let config: LcpCmsComponentsConfig;

  beforeEach(() => {
    config = {
      lcpCmsComponents: {
        idMarker: '__testMarker__',
        ids: ['BannerComponent', 'HeroComponent'],
      },
    };
    TestBed.configureTestingModule({
      providers: [
        CmsLcpService,
        { provide: LcpCmsComponentsConfig, useValue: config },
      ],
    });
    service = TestBed.inject(CmsLcpService);
  });

  it('should return HAS_LCP if component UID contains the marker', async () => {
    const result = await firstValueFrom(
      service.getLcpPresence({ uid: 'SomeOtherComponent__testMarker__' })
    );
    expect(result).toBe(LcpPresence.HAS_LCP);
  });

  it('should return HAS_LCP if component UID is in the configured list', async () => {
    const result = await firstValueFrom(
      service.getLcpPresence({ uid: 'BannerComponent' })
    );
    expect(result).toBe(LcpPresence.HAS_LCP);
  });

  it('should return NO_LCP if component UID is not in the list and does not contain marker', async () => {
    const result = await firstValueFrom(
      service.getLcpPresence({ uid: 'OtherComponent' })
    );
    expect(result).toBe(LcpPresence.NO_LCP);
  });

  it('should return NO_LCP if UID is missing', async () => {
    const result = await firstValueFrom(service.getLcpPresence({}));
    expect(result).toBe(LcpPresence.NO_LCP);
  });

  it('should handle missing config gracefully', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        CmsLcpService,
        { provide: LcpCmsComponentsConfig, useValue: {} },
      ],
    });
    const service = TestBed.inject(CmsLcpService);
    const result = await firstValueFrom(
      service.getLcpPresence({ uid: 'BannerComponent' })
    );
    expect(result).toBe(LcpPresence.NO_LCP);
  });
});
