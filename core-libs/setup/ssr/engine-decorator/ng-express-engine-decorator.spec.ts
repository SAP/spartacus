import {
  NgExpressEngine,
  NgExpressEngineDecorator,
  NgExpressEngineInstance,
  NgSetupOptions,
  RenderOptions,
} from './ng-express-engine-decorator';
import { SERVER_REQUEST_URL } from '@spartacus/core';

describe('NgExpressEngineDecorator', () => {
  describe('get', () => {
    let originalEngine: NgExpressEngine;
    let originalEngineInstance: NgExpressEngineInstance;
    let mockEngineOptions: NgSetupOptions;

    let mockOptions: RenderOptions;
    const mockPath = 'testPath';
    const mockCallback = () => {};

    beforeEach(() => {
      mockOptions = {
        req: {
          protocol: 'https',
          originalUrl: '/electronics/en/USD/cart',
          get: jasmine.createSpy('req.get').and.returnValue('site.com'),
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

      const engine = NgExpressEngineDecorator.get(originalEngine);
      const engineInstance = engine(mockEngineOptions);
      engineInstance(mockPath, mockOptions, mockCallback);
    });

    xit(`should pass parameters to the original engine instance`, () => {
      expect(originalEngineInstance).toHaveBeenCalledWith(
        mockPath,
        mockOptions,
        mockCallback
      );
    });

    xit(`should pass setup options to the original engine`, () => {
      expect(originalEngine).toHaveBeenCalledWith(
        jasmine.objectContaining({
          bootstrap: 'TestModule',
          providers: jasmine.arrayContaining([
            { provide: 'testToken', useValue: 'testValue' },
          ]),
        })
      );
    });

    xit(`should add SERVER_REQUEST_URL to providers in the setup options passed to the original engine`, () => {
      expect(mockOptions.req.get).toHaveBeenCalledWith('host');
      expect(originalEngine).toHaveBeenCalledWith(
        jasmine.objectContaining({
          providers: jasmine.arrayContaining([
            {
              provide: SERVER_REQUEST_URL,
              useValue: 'https://site.com/electronics/en/USD/cart',
            },
          ]),
        })
      );
    });
  });
});
