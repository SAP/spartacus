import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfigInitializerService } from '../../config';
import { SiteContextConfig } from '../config/site-context-config';
import { BaseSiteService } from '../facade/base-site.service';
import { BaseSiteInitializer } from './base-site-initializer';
import { SiteContextRoutesHandler } from './site-context-routes-handler';
import createSpy = jasmine.createSpy;

const mockSiteContextConfig: SiteContextConfig = {
  context: {
    baseSite: ['electronics-spa'],
  },
};

class MockBaseSiteService implements Partial<BaseSiteService> {
  isInitialized() {
    return false;
  }
  setActive = createSpy().and.stub();
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService>
{
  getStable = () => of(mockSiteContextConfig);
}

class MockSiteContextRoutesHandler
  implements Partial<SiteContextRoutesHandler>
{
  initOnce = createSpy().and.returnValue(of(undefined));
}

describe('BaseSiteInitializer', () => {
  let initializer: BaseSiteInitializer;
  let baseSiteService: BaseSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseSiteInitializer,
        { provide: BaseSiteService, useClass: MockBaseSiteService },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
        {
          provide: SiteContextRoutesHandler,
          useClass: MockSiteContextRoutesHandler,
        },
      ],
    });

    baseSiteService = TestBed.inject(BaseSiteService);
    initializer = TestBed.inject(BaseSiteInitializer);
  });

  it('should be created', () => {
    expect(initializer).toBeTruthy();
  });

  describe('initialize', () => {
    it('should call SiteContextRoutesHandler initOnce()', async () => {
      spyOn<any>(initializer, 'setFallbackValue').and.returnValue(of(null));
      await initializer.initialize();
      expect(initializer.siteContextRoutesHandler.initOnce).toHaveBeenCalled();
      expect(initializer['setFallbackValue']).toHaveBeenCalled();
    });

    it('should set default from config is the baseSite is NOT initialized', async () => {
      await initializer.initialize();
      expect(baseSiteService.setActive).toHaveBeenCalledWith('electronics-spa');
    });

    it('should NOT set default from config is the baseSite is initialized', async () => {
      spyOn(baseSiteService, 'isInitialized').and.returnValue(true);
      await initializer.initialize();
      expect(baseSiteService.setActive).not.toHaveBeenCalled();
    });
  });
});
