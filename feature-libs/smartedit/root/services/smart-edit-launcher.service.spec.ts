import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { defaultSmartEditConfig } from '../config/default-smart-edit-config';
import { SmartEditConfig } from '../config/smart-edit-config';
import { SmartEditLauncherService } from './smart-edit-launcher.service';
import { FeatureModulesService } from '@spartacus/core';

class MockLocation {
  path() {
    return '';
  }
}

class MockFeatureModulesService implements Partial<FeatureModulesService> {
  isConfigured = () => true;
  resolveFeature = () => of(undefined);
}

describe('SmartEditLauncherService', () => {
  let smartEditLauncherService: SmartEditLauncherService;
  let location: Location;
  let featureModules: FeatureModulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Location, useClass: MockLocation },
        { provide: SmartEditConfig, useValue: defaultSmartEditConfig },
        { provide: FeatureModulesService, useClass: MockFeatureModulesService },
      ],
    });

    smartEditLauncherService = TestBed.inject(SmartEditLauncherService);
    location = TestBed.inject(Location);
    featureModules = TestBed.inject(FeatureModulesService);
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
      spyOn(featureModules, 'resolveFeature').and.callThrough();

      smartEditLauncherService.load();
      expect(featureModules.resolveFeature).toHaveBeenCalledWith('smartEdit');
    });
  });
});
