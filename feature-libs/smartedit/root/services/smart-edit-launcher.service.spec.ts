import { Location } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FeatureConfigService, FeatureModulesService } from '@spartacus/core';
import { of } from 'rxjs';
import { defaultSmartEditConfig } from '../config/default-smart-edit-config';
import { SmartEditConfig } from '../config/smart-edit-config';
import { SmartEditLauncherService } from './smart-edit-launcher.service';

class MockLocation {
  path() {
    return '';
  }
}

class MockFeatureModulesService implements Partial<FeatureModulesService> {
  isConfigured = () => true;
  resolveFeature = () => of(undefined);
}

class MockFeatureConfigService implements Partial<FeatureConfigService> {
  isLevel(_version: string): boolean {
    return true;
  }
}

describe('SmartEditLauncherService', () => {
  let smartEditLauncherService: SmartEditLauncherService;
  let location: Location;
  let featureModules: FeatureModulesService;

  function beforeEachForPlatform(platformId: string) {
    TestBed.configureTestingModule({
      providers: [
        { provide: Location, useClass: MockLocation },
        { provide: SmartEditConfig, useValue: defaultSmartEditConfig },
        { provide: FeatureModulesService, useClass: MockFeatureModulesService },
        { provide: PLATFORM_ID, useValue: platformId },
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
      ],
    });

    smartEditLauncherService = TestBed.inject(SmartEditLauncherService);
    location = TestBed.inject(Location);
    featureModules = TestBed.inject(FeatureModulesService);
  }

  describe('should get whether Spartacus is launched in SmartEdit', () => {
    beforeEach(() => {
      beforeEachForPlatform('browser');
    });

    it('should be created', () => {
      expect(smartEditLauncherService).toBeTruthy();
    });

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

  describe('should not lazy load SmartEditModule in SSR', () => {
    beforeEach(() => {
      beforeEachForPlatform('no-browser');
    });

    it('not lazy load SmartEditModule', () => {
      spyOn(location, 'path').and.returnValue(
        '/any/cx-preview?cmsTicketId=test-cms-ticket-id'
      );
      spyOn(featureModules, 'resolveFeature').and.callThrough();

      smartEditLauncherService.load();
      expect(featureModules.resolveFeature).not.toHaveBeenCalledWith(
        'smartEdit'
      );
    });
  });

  describe('should lazy load SmartEditModule in CSR', () => {
    beforeEach(() => {
      beforeEachForPlatform('browser');
    });

    it('lazy load SmartEditModule', () => {
      spyOn(location, 'path').and.returnValue(
        '/any/cx-preview?cmsTicketId=test-cms-ticket-id'
      );
      spyOn(featureModules, 'resolveFeature').and.callThrough();

      smartEditLauncherService.load();
      expect(featureModules.resolveFeature).toHaveBeenCalledWith('smartEdit');
    });
  });
});
