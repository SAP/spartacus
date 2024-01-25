import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { ScriptLoader } from '@spartacus/core';
import { OpfDynamicScriptResourceType } from '../model';
import { OpfResourceLoaderService } from './opf-resource-loader.service';

describe('OpfResourceLoaderService', () => {
  let opfResourceLoaderService: OpfResourceLoaderService;
  let mockDocument: any;
  let mockPlatformId: Object;

  beforeEach(() => {
    mockDocument = {
      createElement: jasmine.createSpy('createElement').and.callFake(() => ({
        href: '',
        rel: '',
        type: '',
        setAttribute: jasmine.createSpy('setAttribute'),
        addEventListener: jasmine.createSpy('addEventListener'),
      })),
      head: {
        appendChild: jasmine.createSpy('appendChild'),
      },
      querySelector: jasmine.createSpy('querySelector'),
    };

    mockPlatformId = 'browser';

    TestBed.configureTestingModule({
      providers: [
        OpfResourceLoaderService,
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: PLATFORM_ID, useValue: mockPlatformId },
      ],
    });
  });

  it('should be created', () => {
    opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    expect(opfResourceLoaderService).toBeTruthy();
  });

  it('should create OpfResourceLoaderService instance', () => {
    opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    expect(opfResourceLoaderService instanceof ScriptLoader).toBe(true);
  });

  describe('loadProviderResources', () => {
    beforeEach(() => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should load provider resources successfully for both scripts and styles', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      const mockStyleResource = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      opfResourceLoaderService.loadProviderResources(
        [mockScriptResource],
        [mockStyleResource]
      );

      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalled();
      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalled();
    }));

    it('should load provider resources successfully for scripts', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      opfResourceLoaderService.loadProviderResources([mockScriptResource]);

      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalled();
    }));

    it('should load provider resources successfully for styles', fakeAsync(() => {
      const mockStyleResource = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      opfResourceLoaderService.loadProviderResources([], [mockStyleResource]);

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalled();
    }));

    it('should load provider resources successfully for styles with no url', fakeAsync(() => {
      const mockStyleResource = {
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'markResourceAsLoaded'
      ).and.callThrough();

      opfResourceLoaderService.loadProviderResources([], [mockStyleResource]);

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      expect(
        opfResourceLoaderService['markResourceAsLoaded']
      ).toHaveBeenCalled();
    }));

    it('should not load provider resources when no resources are provided', fakeAsync(() => {
      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'markResourceAsLoaded'
      ).and.callThrough();

      opfResourceLoaderService.loadProviderResources();

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      expect(
        opfResourceLoaderService['markResourceAsLoaded']
      ).not.toHaveBeenCalled();
    }));

    it('should mark resource as loaded when script is successfully loaded', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'markResourceAsLoaded'
      ).and.callThrough();
      spyOn<any>(ScriptLoader.prototype, 'embedScript').and.callFake(
        (options: any) => {
          options.callback?.();
        }
      );

      opfResourceLoaderService.loadProviderResources([mockScriptResource]);

      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalled();
      expect(ScriptLoader.prototype.embedScript).toHaveBeenCalled();
      expect(
        opfResourceLoaderService['markResourceAsLoaded']
      ).toHaveBeenCalled();
    }));

    it('should handle resource loading error when script is not successfully loaded', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'markResourceAsLoaded'
      ).and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'handleLoadingResourceError'
      ).and.callThrough();
      spyOn<any>(ScriptLoader.prototype, 'embedScript').and.callFake(
        (options: any) => {
          options.errorCallback?.();
        }
      );

      opfResourceLoaderService.loadProviderResources([mockScriptResource]);

      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalled();
      expect(
        opfResourceLoaderService['markResourceAsLoaded']
      ).not.toHaveBeenCalled();
      expect(ScriptLoader.prototype.embedScript).toHaveBeenCalled();
      expect(
        opfResourceLoaderService['handleLoadingResourceError']
      ).toHaveBeenCalled();
    }));

    it('should mark resource as loaded when style is successfully loaded', fakeAsync(() => {
      const mockStylesResources = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'markResourceAsLoaded'
      ).and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'embedStyles').and.callFake(
        (options: any) => {
          options.callback?.(); // Simulate script loading
        }
      );

      opfResourceLoaderService.loadProviderResources([], [mockStylesResources]);

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalled();
      expect(
        opfResourceLoaderService['markResourceAsLoaded']
      ).toHaveBeenCalled();
      expect(opfResourceLoaderService['embedStyles']).toHaveBeenCalled();
    }));

    it('should handle resource loading error when style is not successfully loaded', fakeAsync(() => {
      const mockStylesResources = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'markResourceAsLoaded'
      ).and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'handleLoadingResourceError'
      ).and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'embedStyles').and.callFake(
        (options: any) => {
          options.errorCallback?.(); // Simulate script loading
        }
      );

      opfResourceLoaderService.loadProviderResources([], [mockStylesResources]);

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(
        opfResourceLoaderService['markResourceAsLoaded']
      ).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalled();
      expect(opfResourceLoaderService['embedStyles']).toHaveBeenCalled();
      expect(
        opfResourceLoaderService['handleLoadingResourceError']
      ).toHaveBeenCalled();
    }));

    it('should not embed styles if there is no style in the element', fakeAsync(() => {
      const mockStyleResource = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'embedStyles').and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'markResourceAsLoaded'
      ).and.callThrough();
      mockDocument.querySelector = jasmine
        .createSpy('querySelector')
        .and.returnValue({} as Element);

      opfResourceLoaderService.loadProviderResources([], [mockStyleResource]);

      expect(opfResourceLoaderService['embedStyles']).not.toHaveBeenCalled();
      expect(
        opfResourceLoaderService['markResourceAsLoaded']
      ).toHaveBeenCalled();
    }));

    it('should not embed script if there is no script in the element', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      spyOn<any>(opfResourceLoaderService, 'embedScript').and.callThrough();
      spyOn<any>(
        opfResourceLoaderService,
        'markResourceAsLoaded'
      ).and.callThrough();
      mockDocument.querySelector = jasmine
        .createSpy('querySelector')
        .and.returnValue({} as Element);

      opfResourceLoaderService.loadProviderResources([mockScriptResource]);

      expect(opfResourceLoaderService['embedScript']).not.toHaveBeenCalled();
      expect(
        opfResourceLoaderService['markResourceAsLoaded']
      ).toHaveBeenCalled();
    }));
  });

  describe('loadProviderResources using server platform', () => {
    beforeEach(() => {
      TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should embed styles with SSR when platform is set to server', fakeAsync(() => {
      const mockStyleResource = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'embedStyles').and.callThrough();

      opfResourceLoaderService.loadProviderResources([], [mockStyleResource]);

      expect(opfResourceLoaderService['embedStyles']).toHaveBeenCalled();
    }));
  });

  describe('clearAllProviderResources', () => {
    it('should clear all provider resources', () => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);

      const mockLinkElement = {
        remove: jasmine.createSpy('remove'),
      };

      mockDocument.querySelectorAll = jasmine
        .createSpy('querySelectorAll')
        .and.returnValue([mockLinkElement]);

      opfResourceLoaderService.clearAllProviderResources();

      expect(mockLinkElement.remove).toHaveBeenCalled();
    });
  });

  describe('executeHtml', () => {
    it('should execute script from HTML correctly', () => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);

      const mockScript = document.createElement('script');
      mockScript.innerText = 'console.log("Script executed");';
      spyOn(document, 'createElement').and.returnValue(mockScript);
      spyOn(console, 'log');

      opfResourceLoaderService.executeScriptFromHtml(
        '<script>console.log("Script executed");</script>'
      );

      expect(console.log).toHaveBeenCalledWith('Script executed');
    });
  });
});
