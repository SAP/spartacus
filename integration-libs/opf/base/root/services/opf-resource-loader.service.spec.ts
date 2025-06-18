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

  describe('loadResources', () => {
    beforeEach(() => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should load provider resources successfully for both scripts and styles', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
        attributes: [{ key: 'opf-load-once', value: 'true' }],
      };

      const mockStyleResource = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
        attributes: [{ key: 'opf-load-once', value: 'true' }],
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      opfResourceLoaderService.loadResources(
        [mockScriptResource],
        [mockStyleResource]
      );

      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalled();
      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalled();
    }));

    it('should load provider resources successfully for scripts', fakeAsync(() => {
      const mockScriptResource = {
        attributes: [{ key: 'crossorigin', value: 'use-credentials' }],
        url: 'script-url',
        sri: 'fake-hash-code',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      opfResourceLoaderService.loadResources([mockScriptResource]);

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

      opfResourceLoaderService.loadResources([], [mockStyleResource]);

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalled();
    }));

    it('should load provider resources successfully for styles with no url', fakeAsync(() => {
      const mockStyleResource = {
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      opfResourceLoaderService.loadResources([], [mockStyleResource]);

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
    }));

    it('should not load provider resources when no resources are provided', fakeAsync(() => {
      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      opfResourceLoaderService.loadResources();

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
    }));

    it('should mark resource as loaded when script is successfully loaded', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      spyOn<any>(ScriptLoader.prototype, 'embedScript').and.callFake(
        (options: any) => {
          options.callback?.();
        }
      );

      opfResourceLoaderService.loadResources([mockScriptResource]);

      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalled();
      expect(ScriptLoader.prototype.embedScript).toHaveBeenCalled();
    }));

    it('should handle resource loading error when script is not successfully loaded', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      spyOn<any>(ScriptLoader.prototype, 'embedScript').and.callFake(
        (options: any) => {
          options.errorCallback?.();
        }
      );

      opfResourceLoaderService
        .loadResources([mockScriptResource])
        .then(() => {})
        .catch(() => {});

      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalled();

      expect(ScriptLoader.prototype.embedScript).toHaveBeenCalled();
    }));

    it('should mark resource as loaded when style is successfully loaded', fakeAsync(() => {
      const mockStylesResources = {
        url: 'style-url',
        sri: 'fake-hash-code',
        attributes: [
          { key: 'mock-key', value: 'mock-value' },
          { key: 'crossorigin', value: 'use-credentials' },
        ],
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      spyOn<any>(opfResourceLoaderService, 'embedStyles').and.callFake(
        (options: any) => {
          options.callback?.(); // Simulate script loading
        }
      );

      opfResourceLoaderService.loadResources([], [mockStylesResources]);

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalled();
      expect(opfResourceLoaderService['embedStyles']).toHaveBeenCalled();
    }));

    it('should handle resource loading error when style is not successfully loaded', fakeAsync(() => {
      const mockStylesResources = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      spyOn<any>(opfResourceLoaderService, 'embedStyles').and.callFake(
        (options: any) => {
          options.errorCallback?.(); // Simulate script loading
        }
      );

      opfResourceLoaderService
        .loadResources([], [mockStylesResources])
        .then(() => {})
        .catch(() => {});

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();

      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalled();
      expect(opfResourceLoaderService['embedStyles']).toHaveBeenCalled();
    }));

    it('should not embed styles if there is no style in the element', fakeAsync(() => {
      const mockStyleResource = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'embedStyles').and.callThrough();

      mockDocument.querySelector = jasmine
        .createSpy('querySelector')
        .and.returnValue({} as Element);

      opfResourceLoaderService.loadResources([], [mockStyleResource]);

      expect(opfResourceLoaderService['embedStyles']).not.toHaveBeenCalled();
    }));

    it('should not embed script if there is no script in the element', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      const scriptLoader = TestBed.inject(ScriptLoader);
      spyOn<any>(scriptLoader, 'embedScript').and.callThrough();

      mockDocument.querySelector = jasmine
        .createSpy('querySelector')
        .and.returnValue({} as Element);

      opfResourceLoaderService.loadResources([mockScriptResource]);

      expect(scriptLoader.embedScript).not.toHaveBeenCalled();
    }));
  });

  describe('loadResources using server platform', () => {
    beforeEach(() => {
      TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should not loadStyles with SSR when platform is set to server', fakeAsync(() => {
      const mockStyleResource = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();
      opfResourceLoaderService.loadResources([], [mockStyleResource]);
      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
    }));

    it('should not loadScript with SSR when platform is set to server', fakeAsync(() => {
      const mockScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };
      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      opfResourceLoaderService.loadResources([], [mockScriptResource]);
      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
    }));
  });

  describe('clearAllResources', () => {
    it('should clear all provider resources', () => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);

      const mockLinkElement = {
        remove: jasmine.createSpy('remove'),
      };

      mockDocument.querySelectorAll = jasmine
        .createSpy('querySelectorAll')
        .and.returnValue([mockLinkElement]);

      opfResourceLoaderService.clearAllResources();

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

  describe('executeHtml in SSR', () => {
    it('should not execute script with SSR when platform is set to server', () => {
      TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);

      const mockScript = document.createElement('script');
      mockScript.innerText = 'console.log("Script executed");';
      spyOn(document, 'createElement').and.returnValue(mockScript);
      spyOn(console, 'log');

      opfResourceLoaderService.executeScriptFromHtml(
        '<script>console.log("Script executed");</script>'
      );

      expect(console.log).not.toHaveBeenCalledWith('Script executed');
    });
  });
});
