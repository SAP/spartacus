import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfigInitializerService } from '../../config';
import { SiteContextConfig } from '../config/site-context-config';
import { BaseSiteService } from '../facade/base-site.service';
import { BaseSiteInitializer } from './base-site-initializer';
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
      ],
    });

    baseSiteService = TestBed.inject(BaseSiteService);
    initializer = TestBed.inject(BaseSiteInitializer);
  });

  it('should be created', () => {
    expect(initializer).toBeTruthy();
  });

  describe('initialize', () => {
    it('should set default from config is the currency is NOT initialized', () => {
      initializer.initialize();
      expect(baseSiteService.setActive).toHaveBeenCalledWith('electronics-spa');
    });

    it('should NOT set default from config is the currency is initialized', () => {
      spyOn(baseSiteService, 'isInitialized').and.returnValue(true);
      initializer.initialize();
      expect(baseSiteService.setActive).not.toHaveBeenCalled();
    });
  });
});
