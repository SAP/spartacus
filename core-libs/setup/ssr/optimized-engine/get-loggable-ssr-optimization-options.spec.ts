import { DefaultExpressServerLogger } from '../logger';
import { getLoggableSsrOptimizationOptions } from './get-loggable-ssr-optimization-options';
import { SsrOptimizationOptions } from './ssr-optimization-options';

class MockLogger extends DefaultExpressServerLogger {
  constructor() {
    super();
  }
}

describe('getLoggableSsrOptimizationOptions', () => {
  const ssrOptions: SsrOptimizationOptions = {
    concurrency: 10,
    timeout: 3000,
    forcedSsrTimeout: 60000,
    maxRenderTime: 300000,
    reuseCurrentRendering: true,
    debug: false,
  };

  it('should return options in the same shape as provided', () => {
    expect(getLoggableSsrOptimizationOptions(ssrOptions))
      .toMatchInlineSnapshot(`
      {
        "concurrency": 10,
        "debug": false,
        "forcedSsrTimeout": 60000,
        "maxRenderTime": 300000,
        "reuseCurrentRendering": true,
        "timeout": 3000,
      }
    `);
  });

  it('should return constructor name if property is not a plain object', () => {
    expect(
      getLoggableSsrOptimizationOptions({
        ...ssrOptions,
        logger: new MockLogger(),
      })
    ).toMatchInlineSnapshot(`
      {
        "concurrency": 10,
        "debug": false,
        "forcedSsrTimeout": 60000,
        "logger": "MockLogger",
        "maxRenderTime": 300000,
        "reuseCurrentRendering": true,
        "timeout": 3000,
      }
    `);
  });

  it('should not return constructor name if property is a plain object', () => {
    expect(
      getLoggableSsrOptimizationOptions({
        ...ssrOptions,
        somePlainObject: { config: 'value' },
      } as SsrOptimizationOptions)
    ).toMatchInlineSnapshot(`
      {
        "concurrency": 10,
        "debug": false,
        "forcedSsrTimeout": 60000,
        "maxRenderTime": 300000,
        "reuseCurrentRendering": true,
        "somePlainObject": {
          "config": "value",
        },
        "timeout": 3000,
      }
    `);
  });

  it('should change function to string if property is a function', () => {
    expect(
      getLoggableSsrOptimizationOptions({
        ...ssrOptions,
        renderKeyResolver: (req: any) => req.url,
      })
    ).toMatchInlineSnapshot(`
      {
        "concurrency": 10,
        "debug": false,
        "forcedSsrTimeout": 60000,
        "maxRenderTime": 300000,
        "renderKeyResolver": "(req) => req.url",
        "reuseCurrentRendering": true,
        "timeout": 3000,
      }
    `);
  });
});
