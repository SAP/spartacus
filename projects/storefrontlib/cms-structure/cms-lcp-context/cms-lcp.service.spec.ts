import { TestBed } from '@angular/core/testing';
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

  it('should return HAS_LCP if component UID contains the marker', (done) => {
    service
      .getLcpPresence({ uid: 'SomeOtherComponent__testMarker__' })
      .subscribe((result) => {
        expect(result).toBe(LcpPresence.HAS_LCP);
        done();
      });
  });

  it('should return HAS_LCP if component UID is in the configured list', (done) => {
    service.getLcpPresence({ uid: 'BannerComponent' }).subscribe((result) => {
      expect(result).toBe(LcpPresence.HAS_LCP);
      done();
    });
  });

  it('should return NO_LCP if component UID is not in the list and does not contain marker', (done) => {
    service.getLcpPresence({ uid: 'OtherComponent' }).subscribe((result) => {
      expect(result).toBe(LcpPresence.NO_LCP);
      done();
    });
  });

  it('should return NO_LCP if UID is missing', (done) => {
    service.getLcpPresence({}).subscribe((result) => {
      expect(result).toBe(LcpPresence.NO_LCP);
      done();
    });
  });

  it('should handle missing config gracefully', (done) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        CmsLcpService,
        { provide: LcpCmsComponentsConfig, useValue: {} },
      ],
    });
    const service = TestBed.inject(CmsLcpService);
    service.getLcpPresence({ uid: 'BannerComponent' }).subscribe((result) => {
      expect(result).toBe(LcpPresence.NO_LCP);
      done();
    });
  });
});
