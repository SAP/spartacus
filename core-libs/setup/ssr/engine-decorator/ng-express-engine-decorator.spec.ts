import { SERVER_REQUEST_URL } from '@spartacus/core';
import {
  decorateExpressEngine,
  NgExpressEngine,
  NgExpressEngineDecorator,
  NgExpressEngineInstance,
} from './ng-express-engine-decorator';

describe('NgExpressEngineDecorator', () => {
  describe('get', () => {
    let originalEngine: NgExpressEngine;
    let originalEngineInstance: NgExpressEngineInstance;
    let mockEngineOptions;

    let mockOptions;
    const mockPath = 'testPath';
    const mockCallback = () => {};

    beforeEach(() => {
      mockOptions = {
        req: {
          protocol: 'https',
          originalUrl: '/electronics/en/USD/cart',
          hostname: 'site.com',
        },
      } as any;

      mockEngineOptions = {
        bootstrap: 'TestModule',
        providers: [{ provide: 'testToken', useValue: 'testValue' }],
      } as any;

      originalEngine = jasmine
        .createSpy('ngExpressEngine')
        .and.callFake(() => originalEngineInstance);

      originalEngineInstance = jasmine
        .createSpy('ngExpressEngineInstance')
        .and.callFake(() => {});

      const engine = NgExpressEngineDecorator.get(originalEngine, null);
      const engineInstance = engine(mockEngineOptions);
      engineInstance(mockPath, mockOptions, mockCallback);
    });

    it(`should pass parameters to the original engine instance`, () => {
      expect(originalEngineInstance).toHaveBeenCalledWith(
        mockPath,
        mockOptions,
        mockCallback
      );
    });

    it(`should pass setup options to the original engine`, () => {
      expect(originalEngine).toHaveBeenCalledWith(
        jasmine.objectContaining({
          bootstrap: 'TestModule',
          providers: jasmine.arrayContaining([
            { provide: 'testToken', useValue: 'testValue' },
          ]),
        })
      );
    });

    it(`should add SERVER_REQUEST_URL to providers in the setup options passed to the original engine`, () => {
      expect(originalEngine).toHaveBeenCalledWith(
        jasmine.objectContaining({
          providers: jasmine.arrayContaining([
            jasmine.objectContaining({
              provide: SERVER_REQUEST_URL,
            }),
          ]),
        })
      );
    });
  });
});

describe('decorateExpressEngine', () => {
  let originalEngine: NgExpressEngine;
  let originalEngineInstance: NgExpressEngineInstance;
  let mockEngineOptions;

  let mockOptions;
  const mockPath = 'testPath';
  const mockCallback = () => {};
  let engineInstance;

  beforeEach(() => {
    const app = {
      get:
        (_name: string): any =>
        (_connectionRemoteAddress: string) => {},
    };

    mockOptions = {
      req: {
        protocol: 'https',
        originalUrl: '/electronics/en/USD/cart',
        get: jasmine.createSpy('req.get').and.returnValue('site.com'),
        app,
        connection: {},
      },
      res: <Partial<Response>>{
        set: jasmine.createSpy('req.set'),
      },
    } as any;

    mockEngineOptions = {
      bootstrap: 'TestModule',
      providers: [{ provide: 'testToken', useValue: 'testValue' }],
    } as any;

    originalEngine = jasmine
      .createSpy('ngExpressEngine')
      .and.callFake(() => originalEngineInstance);

    originalEngineInstance = jasmine
      .createSpy('ngExpressEngineInstance')
      .and.callFake(() => {});
  });

  describe('with disabled optimizations', () => {
    beforeEach(() => {
      const engine = decorateExpressEngine(originalEngine, null);
      engineInstance = engine(mockEngineOptions);
      engineInstance(mockPath, mockOptions, mockCallback);
    });

    it(`should pass parameters to the original engine instance`, () => {
      expect(originalEngineInstance).toHaveBeenCalledWith(
        mockPath,
        mockOptions,
        mockCallback
      );
    });

    it(`should pass setup options to the original engine`, () => {
      expect(originalEngine).toHaveBeenCalledWith(
        jasmine.objectContaining({
          bootstrap: 'TestModule',
          providers: jasmine.arrayContaining([
            { provide: 'testToken', useValue: 'testValue' },
          ]),
        })
      );
    });

    it(`should add SERVER_REQUEST_URL to providers in the setup options passed to the original engine`, () => {
      expect(originalEngine).toHaveBeenCalledWith(
        jasmine.objectContaining({
          providers: jasmine.arrayContaining([
            jasmine.objectContaining({
              provide: SERVER_REQUEST_URL,
            }),
          ]),
        })
      );
    });

    it(`should be called only once per request with caching`, () => {
      const mockOptions2 = {
        ...mockOptions,
        req: { ...mockOptions.req, originalUrl: 'aaa' },
      };
      const mockOptions3 = {
        ...mockOptions,
        req: { ...mockOptions.req, originalUrl: 'ccc' },
      };
      engineInstance(mockPath, mockOptions, mockCallback);
      engineInstance('aaa', mockOptions2, mockCallback);
      engineInstance(mockPath, mockOptions, mockCallback);
      engineInstance('aaa', mockOptions2, mockCallback);
      engineInstance('ccc', mockOptions3, mockCallback);
      expect(originalEngineInstance).toHaveBeenCalledTimes(6);
    });
  });

  describe('with enabled optimizations', () => {
    beforeEach(() => {
      const engine = decorateExpressEngine(originalEngine, {
        cache: true,
        timeout: 0,
      });
      engineInstance = engine(mockEngineOptions);
      engineInstance(mockPath, mockOptions, mockCallback);
    });

    it(`should pass parameters to the original engine instance`, () => {
      expect(originalEngineInstance).toHaveBeenCalledWith(
        mockPath,
        mockOptions,
        jasmine.any(Function)
      );
    });

    it(`should apply optimization wrapper`, () => {
      // we check, that callback is not the original one
      expect(originalEngineInstance).not.toHaveBeenCalledWith(
        mockPath,
        mockOptions,
        mockCallback
      );
    });

    it(`should pass setup options to the original engine`, () => {
      expect(originalEngine).toHaveBeenCalledWith(
        jasmine.objectContaining({
          bootstrap: 'TestModule',
          providers: jasmine.arrayContaining([
            { provide: 'testToken', useValue: 'testValue' },
          ]),
        })
      );
    });

    it(`should add SERVER_REQUEST_URL to providers in the setup options passed to the original engine`, () => {
      expect(originalEngine).toHaveBeenCalledWith(
        jasmine.objectContaining({
          providers: jasmine.arrayContaining([
            jasmine.objectContaining({
              provide: SERVER_REQUEST_URL,
            }),
          ]),
        })
      );
    });

    it(`should be called only once per request with caching`, () => {
      const mockOptions2 = {
        ...mockOptions,
        req: { ...mockOptions.req, originalUrl: 'aaa' },
      };
      const mockOptions3 = {
        ...mockOptions,
        req: { ...mockOptions.req, originalUrl: 'ccc' },
      };
      engineInstance(mockPath, mockOptions, mockCallback);
      engineInstance('aaa', mockOptions2, mockCallback);
      engineInstance(mockPath, mockOptions, mockCallback);
      engineInstance('aaa', mockOptions2, mockCallback);
      engineInstance('ccc', mockOptions3, mockCallback);
      expect(originalEngineInstance).toHaveBeenCalledTimes(3);
    });
  });
});
