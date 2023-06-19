import { DefaultExpressServerLogger } from '../logger';
import { SsrOptimizationOptions } from './ssr-optimization-options';
import { ssrOptimizationOptionsResolver } from './ssr-optimization-options-resolver';

class MockLogger extends DefaultExpressServerLogger {
  constructor() {
    super();
  }
}

describe('SsrOptimizationOptionsResolver', () => {
  const ssrOptions: SsrOptimizationOptions = {
    concurrency: 10,
    timeout: 3000,
    forcedSsrTimeout: 60000,
    maxRenderTime: 300000,
    reuseCurrentRendering: true,
    debug: false,
  };

  it('should return options in the same shape as provided', () => {
    expect(ssrOptimizationOptionsResolver(ssrOptions)).toMatchInlineSnapshot(`
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

  it('should return constructor name if property is an object', () => {
    expect(
      ssrOptimizationOptionsResolver({
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

  it('should change function to string if property is a function', () => {
    expect(
      ssrOptimizationOptionsResolver({
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
