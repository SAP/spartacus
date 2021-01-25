import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConfigInitializerService, LazyModulesService } from '@spartacus/core';
import { of } from 'rxjs';
import { defaultSmartEditConfig } from '../config/default-smart-edit-config';
import { SmartEditConfig } from '../config/smart-edit-config';
import { SmartEditLauncherService } from './smart-edit-launcher.service';

class MockLocation {
  path() {
    return '';
  }
}

class MockConfigInitializerService
  implements Partial<ConfigInitializerService> {
  getStable() {
    return of({
      featureModules: {
        smartEdit: {
          module: () => async () => MockLazySmartEditModule,
        },
      },
    });
  }
}

class MockLazyModule {
  resolveModuleInstance() {
    return of();
  }
}

@NgModule({})
class MockLazySmartEditModule {}

describe('SmartEditLauncherService', () => {
  let smartEditLauncherService: SmartEditLauncherService;
  let location: Location;
  let lazyModule: LazyModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Location, useClass: MockLocation },
        { provide: SmartEditConfig, useValue: defaultSmartEditConfig },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
        { provide: LazyModulesService, useClass: MockLazyModule },
      ],
    });

    smartEditLauncherService = TestBed.inject(SmartEditLauncherService);
    location = TestBed.inject(Location);
    lazyModule = TestBed.inject(LazyModulesService);
  });

  it('should be created', () => {
    expect(smartEditLauncherService).toBeTruthy();
  });

  describe('should get whether Spartacus is launched in SmartEdit', () => {
    it('launched in smartEdit when storefrontPreviewRoute matches, and there is cmsTicketId', () => {
      spyOn(location, 'path').and.returnValue(
        '/any/cx-preview?cmsTicketId=test-cms-ticket-id'
      );
      const launched = smartEditLauncherService.isLaunchedInSmartEdit();
      expect(launched).toBeTruthy();
    });

    it('not launched in smartEdit when storefrontPreviewRoute does not matches', () => {
      spyOn(location, 'path').and.returnValue(
        '/any/cx-something?cmsTicketId=test-cms-ticket-id'
      );
      const launched = smartEditLauncherService.isLaunchedInSmartEdit();
      expect(launched).toBeFalsy();
    });

    it('not launched in smartEdit when there is no cmsTicketId', () => {
      spyOn(location, 'path').and.returnValue('/any/cx-preview');
      const launched = smartEditLauncherService.isLaunchedInSmartEdit();
      expect(launched).toBeFalsy();
    });
  });

  describe('should lazy load SmartEditModule', () => {
    it('lazy load SmartEditModule', () => {
      spyOn(location, 'path').and.returnValue(
        '/any/cx-preview?cmsTicketId=test-cms-ticket-id'
      );
      spyOn(lazyModule, 'resolveModuleInstance').and.callThrough();

      smartEditLauncherService.load();
      expect(lazyModule.resolveModuleInstance).toHaveBeenCalled();
    });
  });
});
