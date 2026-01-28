import { DOCUMENT, PLATFORM_ID } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Config, ScriptLoader, WindowRef } from '@spartacus/core';
import {
  OpfDynamicScriptResource,
  OpfDynamicScriptResourceType,
  OpfHtmlContentMode,
} from '../model';
import { OpfResourceLoaderService } from './opf-resource-loader.service';

describe('OpfResourceLoaderService', () => {
  let opfResourceLoaderService: OpfResourceLoaderService;
  let mockDocument: any;
  let mockPlatformId: Object;
  let mockConfig: any;

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
    mockConfig = {
      opf: {
        localPspResources: {
          123: {
            jsFiles: ['/assets/local/script1.js', '/assets/local/script2.js'],
            cssFiles: ['/assets/local/styles1.css'],
          },
          456: {
            jsFiles: ['/assets/local/other.js'],
            cssFiles: ['/assets/local/other.css'],
          },
        },
      },
    };

    TestBed.configureTestingModule({
      providers: [
        OpfResourceLoaderService,
        { provide: DOCUMENT, useValue: mockDocument },
        { provide: PLATFORM_ID, useValue: mockPlatformId },
        { provide: Config, useValue: mockConfig },
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

  describe('local PSP resources', () => {
    beforeEach(() => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should check if local PSP resources are available', () => {
      expect(opfResourceLoaderService.hasLocalPspResources(123)).toBe(true);
      expect(opfResourceLoaderService.hasLocalPspResources(456)).toBe(true);
      expect(opfResourceLoaderService.hasLocalPspResources(999)).toBe(false);
      expect(opfResourceLoaderService.hasLocalPspResources(undefined)).toBe(
        false
      );
    });

    it('should load local PSP resources when available', fakeAsync(() => {
      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      opfResourceLoaderService.loadResources([], [], 123);

      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalledWith(
        jasmine.objectContaining({
          url: '/assets/local/script1.js',
          type: OpfDynamicScriptResourceType.SCRIPT,
        })
      );
      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalledWith(
        jasmine.objectContaining({
          url: '/assets/local/script2.js',
          type: OpfDynamicScriptResourceType.SCRIPT,
        })
      );
      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalledWith(
        jasmine.objectContaining({
          url: '/assets/local/styles1.css',
          type: OpfDynamicScriptResourceType.STYLES,
        })
      );
    }));

    it('should fallback to external resources when no local resources are configured', fakeAsync(() => {
      const externalScript = {
        url: 'external-script.js',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      const externalStyle = {
        url: 'external-style.css',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.callThrough();

      opfResourceLoaderService.loadResources(
        [externalScript],
        [externalStyle],
        999
      );

      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalledWith(
        jasmine.objectContaining({
          url: 'external-script.js',
          type: OpfDynamicScriptResourceType.SCRIPT,
        })
      );
      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalledWith(
        jasmine.objectContaining({
          url: 'external-style.css',
          type: OpfDynamicScriptResourceType.STYLES,
        })
      );
    }));

    it('should fallback to external resources when paymentOptionId is undefined', fakeAsync(() => {
      const externalScript = {
        url: 'external-script.js',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.callThrough();

      opfResourceLoaderService.loadResources([externalScript], []);

      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalledWith(
        jasmine.objectContaining({
          url: 'external-script.js',
          type: OpfDynamicScriptResourceType.SCRIPT,
        })
      );
    }));
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

  describe('executeScriptWithContext', () => {
    let windowRef: WindowRef;
    let nativeWindowMock: any;
    const script = 'console.log("Script executed");';

    beforeEach(() => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
      windowRef = TestBed.inject(WindowRef);
      nativeWindowMock = {};

      spyOn(windowRef, 'isBrowser').and.returnValue(true);
      spyOnProperty(windowRef, 'nativeWindow', 'get').and.returnValue(
        nativeWindowMock
      );
    });

    it('should keep existing additionalData when provided in contextData', () => {
      const contextData = {
        additionalData: {
          scriptIdentifier: '1234',
        },
      };

      (opfResourceLoaderService as any).executeScriptWithContext(
        script,
        contextData
      );

      const opfContext = nativeWindowMock.OpfContext;
      expect(opfContext).toBeDefined();
      expect(opfContext.additionalData).toBeDefined();
      expect(opfContext.additionalData.scriptIdentifier).toBe('1234');
    });

    it('should initialize additionalData when missing in contextData', () => {
      const contextData = {
        foo: 'bar',
      };

      (opfResourceLoaderService as any).executeScriptWithContext(
        script,
        contextData
      );

      const opfContext = nativeWindowMock.OpfContext;
      expect(opfContext).toBeDefined();
      expect(opfContext.additionalData).toBeDefined();
      expect(opfContext.additionalData).toEqual({});
    });

    it('should create OpfContext and additionalData when contextData is undefined', () => {
      (opfResourceLoaderService as any).executeScriptWithContext(
        script,
        undefined
      );

      const opfContext = nativeWindowMock.OpfContext;
      expect(opfContext).toBeDefined();
      expect(opfContext.additionalData).toBeDefined();
      expect(opfContext.additionalData).toEqual({});
    });
  });

  describe('extractDynamicScriptContext', () => {
    beforeEach(() => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should extract script and context when in SEPARATE mode with jsContent', () => {
      const mockContextData = { orderId: '12345' };
      const mockJsContext = JSON.stringify(mockContextData);
      const dynamicScript = {
        htmlContentMode: OpfHtmlContentMode.SEPARATE,
        jsContent: 'console.log("test");',
        jsContext: mockJsContext,
      };

      const result =
        opfResourceLoaderService['extractDynamicScriptContext'](dynamicScript);

      expect(result.originalScript).toBe('console.log("test");');
      expect(result.contextData).toEqual(mockContextData);
    });

    it('should return empty object when not in SEPARATE mode', () => {
      const dynamicScript = {
        htmlContentMode: OpfHtmlContentMode.MIXED,
        jsContent: 'console.log("test");',
        jsContext: '{}',
      };

      const result =
        opfResourceLoaderService['extractDynamicScriptContext'](dynamicScript);

      expect(result).toEqual({});
    });

    it('should return empty object when jsContent is missing', () => {
      const dynamicScript = {
        htmlContentMode: OpfHtmlContentMode.SEPARATE,
        jsContext: '{}',
        // jsContent is missing
      };

      const result =
        opfResourceLoaderService['extractDynamicScriptContext'](dynamicScript);

      expect(result).toEqual({});
    });

    it('should return empty object when dynamicScript is undefined', () => {
      const result =
        opfResourceLoaderService['extractDynamicScriptContext'](undefined);

      expect(result).toEqual({});
    });
  });

  describe('addDynamicScriptCss', () => {
    beforeEach(() => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should add CSS when in SEPARATE mode with both cssUrl and cssHash', () => {
      const styles: OpfDynamicScriptResource[] = [];
      const dynamicScript = {
        htmlContentMode: OpfHtmlContentMode.SEPARATE,
        cssUrl: 'https://example.com/styles.css',
        cssHash: 'sha384-css-hash',
      };

      opfResourceLoaderService['addDynamicScriptCss'](dynamicScript, styles);

      expect(styles.length).toBe(1);
      expect(styles[0]).toEqual({
        url: 'https://example.com/styles.css',
        sri: 'sha384-css-hash',
        type: OpfDynamicScriptResourceType.STYLES,
      });
    });

    it('should not add CSS when not in SEPARATE mode', () => {
      const styles: OpfDynamicScriptResource[] = [];
      const dynamicScript = {
        htmlContentMode: OpfHtmlContentMode.MIXED,
        cssUrl: 'https://example.com/styles.css',
        cssHash: 'sha384-css-hash',
      };

      opfResourceLoaderService['addDynamicScriptCss'](dynamicScript, styles);

      expect(styles.length).toBe(0);
    });

    it('should not add CSS when cssUrl is missing', () => {
      const styles: OpfDynamicScriptResource[] = [];
      const dynamicScript = {
        htmlContentMode: OpfHtmlContentMode.SEPARATE,
        cssHash: 'sha384-css-hash',
      };

      opfResourceLoaderService['addDynamicScriptCss'](dynamicScript, styles);

      expect(styles.length).toBe(0);
    });

    it('should not add CSS when cssHash is missing', () => {
      const styles: OpfDynamicScriptResource[] = [];
      const dynamicScript = {
        htmlContentMode: OpfHtmlContentMode.SEPARATE,
        cssUrl: 'https://example.com/styles.css',
      };

      opfResourceLoaderService['addDynamicScriptCss'](dynamicScript, styles);

      expect(styles.length).toBe(0);
    });

    it('should not add CSS when dynamicScript is undefined', () => {
      const styles: OpfDynamicScriptResource[] = [];

      opfResourceLoaderService['addDynamicScriptCss'](undefined, styles);

      expect(styles.length).toBe(0);
    });
  });

  describe('getLocalResources', () => {
    beforeEach(() => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should return local resources when paymentOptionId exists and hasLocalPspResources returns true', () => {
      const result: OpfDynamicScriptResource[] =
        opfResourceLoaderService['getLocalResources'](123);

      expect(result.length).toBe(3); // 2 scripts + 1 style
      expect(result[0]).toEqual({
        url: '/assets/local/script1.js',
        type: OpfDynamicScriptResourceType.SCRIPT,
      });
      expect(result[1]).toEqual({
        url: '/assets/local/script2.js',
        type: OpfDynamicScriptResourceType.SCRIPT,
      });
      expect(result[2]).toEqual({
        url: '/assets/local/styles1.css',
        type: OpfDynamicScriptResourceType.STYLES,
      });
    });

    it('should return empty array when paymentOptionId is undefined', () => {
      const result = opfResourceLoaderService['getLocalResources'](undefined);

      expect(result).toEqual([]);
    });

    it('should return empty array when hasLocalPspResources returns false', () => {
      const result = opfResourceLoaderService['getLocalResources'](999);

      expect(result).toEqual([]);
    });

    it('should return empty array when localResources is undefined', () => {
      const configWithUndefinedResources = {
        opf: {
          localPspResources: {
            123: undefined,
          },
        },
      };

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          OpfResourceLoaderService,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: Config, useValue: configWithUndefinedResources },
        ],
      });
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);

      const result = opfResourceLoaderService['getLocalResources'](123);

      expect(result).toEqual([]);
    });

    it('should return empty array when localPspResources is undefined', () => {
      const configWithoutLocalResources = {
        opf: {},
      };

      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          OpfResourceLoaderService,
          { provide: DOCUMENT, useValue: mockDocument },
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: Config, useValue: configWithoutLocalResources },
        ],
      });
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);

      const result = opfResourceLoaderService['getLocalResources'](123);

      expect(result).toEqual([]);
    });
  });

  describe('getExternalResources', () => {
    beforeEach(() => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should convert scripts and styles to resource format', () => {
      const scripts: OpfDynamicScriptResource[] = [
        { url: 'script1.js', type: OpfDynamicScriptResourceType.SCRIPT },
        { url: 'script2.js' },
      ];
      const styles: OpfDynamicScriptResource[] = [
        { url: 'style1.css', type: OpfDynamicScriptResourceType.STYLES },
        { url: 'style2.css' },
      ];

      const result: OpfDynamicScriptResource[] = opfResourceLoaderService[
        'getExternalResources'
      ](scripts, styles);

      expect(result.length).toBe(4);
      expect(result[0]).toEqual({
        url: 'script1.js',
        type: OpfDynamicScriptResourceType.SCRIPT,
      });
      expect(result[1]).toEqual({
        url: 'script2.js',
        type: OpfDynamicScriptResourceType.SCRIPT,
      });
      expect(result[2]).toEqual({
        url: 'style1.css',
        type: OpfDynamicScriptResourceType.STYLES,
      });
      expect(result[3]).toEqual({
        url: 'style2.css',
        type: OpfDynamicScriptResourceType.STYLES,
      });
    });

    it('should handle empty scripts array', () => {
      const styles: OpfDynamicScriptResource[] = [{ url: 'style1.css' }];

      const result: OpfDynamicScriptResource[] = opfResourceLoaderService[
        'getExternalResources'
      ]([], styles);

      expect(result.length).toBe(1);
      expect(result[0].type).toBe(OpfDynamicScriptResourceType.STYLES);
    });

    it('should handle empty styles array', () => {
      const scripts: OpfDynamicScriptResource[] = [{ url: 'script1.js' }];

      const result: OpfDynamicScriptResource[] = opfResourceLoaderService[
        'getExternalResources'
      ](scripts, []);

      expect(result.length).toBe(1);
      expect(result[0].type).toBe(OpfDynamicScriptResourceType.SCRIPT);
    });

    it('should handle empty arrays', () => {
      const result = opfResourceLoaderService['getExternalResources']([], []);

      expect(result).toEqual([]);
    });

    it('should preserve additional properties from scripts and styles', () => {
      const scripts: OpfDynamicScriptResource[] = [
        {
          url: 'script1.js',
          sri: 'sha384-hash',
          attributes: [{ key: 'custom', value: 'value' }],
        },
      ];
      const styles: OpfDynamicScriptResource[] = [
        {
          url: 'style1.css',
          sri: 'sha384-hash',
        },
      ];

      const result = opfResourceLoaderService['getExternalResources'](
        scripts,
        styles
      );

      expect(result[0].sri).toBe('sha384-hash');
      expect(result[0].attributes).toEqual([{ key: 'custom', value: 'value' }]);
      expect(result[1].sri).toBe('sha384-hash');
    });
  });

  describe('loadResource', () => {
    beforeEach(() => {
      opfResourceLoaderService = TestBed.inject(OpfResourceLoaderService);
    });

    it('should load script resource', fakeAsync(() => {
      const resource: OpfDynamicScriptResource = {
        url: 'script-url',
        type: OpfDynamicScriptResourceType.SCRIPT,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.returnValue(
        Promise.resolve()
      );
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.returnValue(
        Promise.resolve()
      );

      const promise = opfResourceLoaderService['loadResource'](resource);

      tick();

      expect(opfResourceLoaderService['loadScript']).toHaveBeenCalledWith(
        resource
      );
      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      promise.then(() => {
        expect(true).toBe(true);
      });
    }));

    it('should load styles resource', fakeAsync(() => {
      const resource: OpfDynamicScriptResource = {
        url: 'style-url',
        type: OpfDynamicScriptResourceType.STYLES,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript').and.returnValue(
        Promise.resolve()
      );
      spyOn<any>(opfResourceLoaderService, 'loadStyles').and.returnValue(
        Promise.resolve()
      );

      const promise = opfResourceLoaderService['loadResource'](resource);

      tick();

      expect(opfResourceLoaderService['loadStyles']).toHaveBeenCalledWith(
        resource
      );
      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      promise.then(() => {
        expect(true).toBe(true);
      });
    }));

    it('should resolve immediately when resource has no URL', fakeAsync(() => {
      const resource: OpfDynamicScriptResource = {
        type: OpfDynamicScriptResourceType.SCRIPT,
        // url is missing
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript');
      spyOn<any>(opfResourceLoaderService, 'loadStyles');

      const promise = opfResourceLoaderService['loadResource'](resource);

      tick();

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      promise.then(() => {
        expect(true).toBe(true);
      });
    }));

    it('should resolve immediately for unknown resource type', fakeAsync(() => {
      const resource: OpfDynamicScriptResource = {
        url: 'unknown-url',
        type: 'UNKNOWN_TYPE' as any,
      };

      spyOn<any>(opfResourceLoaderService, 'loadScript');
      spyOn<any>(opfResourceLoaderService, 'loadStyles');

      const promise = opfResourceLoaderService['loadResource'](resource);

      tick();

      expect(opfResourceLoaderService['loadScript']).not.toHaveBeenCalled();
      expect(opfResourceLoaderService['loadStyles']).not.toHaveBeenCalled();
      promise.then(() => {
        expect(true).toBe(true);
      });
    }));
  });
});
