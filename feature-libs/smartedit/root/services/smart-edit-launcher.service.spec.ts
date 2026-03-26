import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import {
  FeatureModulesService,
  ScriptLoader,
  WindowRef,
} from '@spartacus/core';
import { of } from 'rxjs';
import { defaultSmartEditConfig } from '../config/default-smart-edit-config';
import { SmartEditConfig } from '../config/smart-edit-config';
import { SmartEditLauncherService } from './smart-edit-launcher.service';

class MockLocation {
  path() {
    return '';
  }
}

class MockWindowRef {
  isBrowser(): boolean {
    return true;
  }
}

class MockScriptLoader {
  public embedScript(): void {}
}

class MockFeatureModulesService implements Partial<FeatureModulesService> {
  isConfigured = () => true;
  resolveFeature = () => of(undefined);
}

describe('SmartEditLauncherService', () => {
  let smartEditLauncherService: SmartEditLauncherService;
  let location: Location;
  let scriptLoader: ScriptLoader;
  let featureModules: FeatureModulesService;
  let windowRef: WindowRef;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        { provide: Location, useClass: MockLocation },
        { provide: SmartEditConfig, useValue: defaultSmartEditConfig },
        { provide: ScriptLoader, useClass: MockScriptLoader },
        { provide: FeatureModulesService, useClass: MockFeatureModulesService },
        { provide: WindowRef, useClass: MockWindowRef },
      ],
    });

    smartEditLauncherService = TestBed.inject(SmartEditLauncherService);
    location = TestBed.inject(Location);
    scriptLoader = TestBed.inject(ScriptLoader);
    featureModules = TestBed.inject(FeatureModulesService);
    windowRef = TestBed.inject(WindowRef);
  });

  afterEach(() => {
    sessionStorage.clear();
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

    it('should persist cmsTicketId to sessionStorage on initial SmartEdit launch', () => {
      spyOn(location, 'path').and.returnValue(
        '/any/cx-preview?cmsTicketId=abc123'
      );
      expect(sessionStorage.getItem('smartedit.cmsTicketId')).toBeNull();
      const launched = smartEditLauncherService.isLaunchedInSmartEdit();
      expect(launched).toBeTruthy();
      expect(sessionStorage.getItem('smartedit.cmsTicketId')).toBe('abc123');
      expect(smartEditLauncherService.cmsTicketId).toBe('abc123');
    });

    it('should restore cmsTicketId from sessionStorage when full page redirect occurs after initial launch', () => {
      spyOn(location, 'path').and.returnValues(
        '/any/cx-preview?cmsTicketId=abc123',
        '/any/login/callback?code=auth-code'
      );
      expect(sessionStorage.getItem('smartedit.cmsTicketId')).toBeNull();
      const launched = smartEditLauncherService.isLaunchedInSmartEdit();
      expect(launched).toBeTruthy();
      expect(sessionStorage.getItem('smartedit.cmsTicketId')).toBe('abc123');
      const launched2 = smartEditLauncherService.isLaunchedInSmartEdit();
      expect(launched2).toBeTruthy();
      expect(sessionStorage.getItem('smartedit.cmsTicketId')).toBe('abc123');
      expect(smartEditLauncherService.cmsTicketId).toBe('abc123');
    });

    it('should prefer cmsTicketId from URL over sessionStorage', () => {
      spyOn(location, 'path').and.returnValues(
        '/any/cx-preview?cmsTicketId=abc123',
        '/any/cx-preview?cmsTicketId=def456'
      );
      expect(sessionStorage.getItem('smartedit.cmsTicketId')).toBeNull();
      const launched = smartEditLauncherService.isLaunchedInSmartEdit();
      expect(launched).toBeTruthy();
      expect(sessionStorage.getItem('smartedit.cmsTicketId')).toBe('abc123');
      const launched2 = smartEditLauncherService.isLaunchedInSmartEdit();
      expect(launched2).toBeTruthy();
      expect(sessionStorage.getItem('smartedit.cmsTicketId')).toBe('def456');
      expect(smartEditLauncherService.cmsTicketId).toBe('def456');
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

  it('should be able to load webApplicationInjector.js', () => {
    spyOn(location, 'path').and.returnValue(
      '/any/cx-preview?cmsTicketId=test-cms-ticket-id'
    );
    spyOn(scriptLoader, 'embedScript').and.callThrough();

    smartEditLauncherService.load();
    expect(scriptLoader.embedScript).toHaveBeenCalled();
  });

  describe('SSR behavior', () => {
    it('should not read cmsTicketId from sessionStorage when not in browser', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      sessionStorage.setItem('smartedit.cmsTicketId', 'abc123');
      spyOn(location, 'path').and.returnValue(
        '/any/login/callback?code=auth-code'
      );

      const launched = smartEditLauncherService.isLaunchedInSmartEdit();

      expect(launched).toBeFalsy();
      expect(smartEditLauncherService.cmsTicketId).toBeUndefined();
    });

    it('should not store cmsTicketId in sessionStorage when not in browser', () => {
      spyOn(windowRef, 'isBrowser').and.returnValue(false);
      spyOn(location, 'path').and.returnValue(
        '/any/cx-preview?cmsTicketId=abc123'
      );

      smartEditLauncherService.isLaunchedInSmartEdit();

      expect(sessionStorage.getItem('smartedit.cmsTicketId')).toBeNull();
      expect(smartEditLauncherService.cmsTicketId).toBe('abc123');
    });
  });
});
