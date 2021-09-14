import { fakeAsync, flush, tick } from '@angular/core/testing';
import { NgExpressEngineInstance } from '../engine-decorator/ng-express-engine-decorator';
import { OptimizedSsrEngine } from './optimized-ssr-engine';
import {
  RenderingStrategy,
  SsrOptimizationOptions,
} from './ssr-optimization-options';

/**
 * Helper class to easily create and test engine wrapper against mocked engine.
 *
 * Mocked engine will return sample rendering after 100 milliseconds.
 *
 * Usage:
 * 1. Instantiate the class with desired options
 * 2. Call request() to run request through engine
 * 3. Examine renders property for the renders
 */
class TestEngineRunner {
  /** Accumulates html output for engine runs */
  renders: string[] = [];

  /** Accumulates response parameters for engine runs */
  responseParams: object[] = [];

  renderCount = 0;
  optimizedSsrEngine: OptimizedSsrEngine;
  engineInstance: NgExpressEngineInstance;

  constructor(options: SsrOptimizationOptions, renderTime?: number) {
    // mocked engine instance that will render test output in 100 milliseconds
    const engineInstanceMock = (
      filePath: string,
      _: any,
      callback: Function
    ) => {
      setTimeout(() => {
        callback(undefined, `${filePath}-${this.renderCount++}`);
      }, renderTime ?? 100);
    };

    this.optimizedSsrEngine = new OptimizedSsrEngine(
      engineInstanceMock,
      options
    );
    this.engineInstance = this.optimizedSsrEngine.engineInstance;
  }

  /** Run request against the engine. The result will be stored in rendering property. */
  request(url: string, params?: { httpHeaders?: { [key: string]: string } }) {
    const response: { [key: string]: string } = {};
    const headers = new Headers(params?.httpHeaders ?? {});
    const optionsMock = {
      req: <Partial<Request>>{
        originalUrl: url,
        headers,
        get: (header: string): string | null => headers.get(header),
      },
      res: <Partial<Response>>{
        set: (key: string, value: any) => (response[key] = value),
      },
    };

    this.engineInstance(url, optionsMock, (_, html) => {
      this.renders.push(html);
      this.responseParams.push(response);
    });

    return this;
  }
}

describe('OptimizedSsrEngine', () => {
  describe('timeout option', () => {
    it('should fallback to CSR if rendering exceeds timeout', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 50 }).request('a');
      tick(200);
      expect(engineRunner.renders).toEqual(['']);
    }));

    it('should return timed out render in the followup request', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 50 }).request('a');
      tick(200);
      expect(engineRunner.renders).toEqual(['']);

      engineRunner.request('a');
      expect(engineRunner.renders[1]).toEqual('a-0');
    }));

    it('should return render if rendering meets timeout', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 150 }).request('a');
      tick(200);
      expect(engineRunner.renders).toEqual(['a-0']);
    }));

    it('should fallback instantly if is set to 0', () => {
      const engineRunner = new TestEngineRunner({ timeout: 0 }).request('a');
      expect(engineRunner.renders).toEqual(['']);
    });

    it('should return timed out render in the followup request, also when timeout is set to 0', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 0 }).request('a');
      expect(engineRunner.renders).toEqual(['']);

      tick(200);
      engineRunner.request('a');
      expect(engineRunner.renders[1]).toEqual('a-0');
    }));
  });

  describe('no-store cache control header', () => {
    it('should be applied for a fallback', () => {
      const engineRunner = new TestEngineRunner({ timeout: 0 }).request('a');
      expect(engineRunner.renders).toEqual(['']);
      expect(engineRunner.responseParams).toEqual([
        { 'Cache-Control': 'no-store' },
      ]);
    });

    it('should not be applied for a render within time limit', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 200 }).request('a');
      tick(200);
      expect(engineRunner.renders).toEqual(['a-0']);
      expect(engineRunner.responseParams).toEqual([{}]);
    }));

    it('should not be applied for a render served with next response', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 50 }).request('a');
      tick(200);
      engineRunner.request('a');
      expect(engineRunner.renders).toEqual(['', 'a-0']);
      expect(engineRunner.responseParams).toEqual([
        { 'Cache-Control': 'no-store' },
        {},
      ]);
    }));
  });

  describe('cache option', () => {
    it('should not cache requests if disabled', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        cache: false,
        timeout: 200,
      }).request('a');

      tick(200);
      engineRunner.request('a');
      tick(200);
      engineRunner.request('a');
      tick(200);
      expect(engineRunner.renders).toEqual(['a-0', 'a-1', 'a-2']);
    }));

    it('should cache requests if enabled', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        cache: true,
        timeout: 200,
      }).request('a');

      tick(200);
      engineRunner.request('a');
      tick(200);
      engineRunner.request('a');
      tick(200);
      expect(engineRunner.renders).toEqual(['a-0', 'a-0', 'a-0']);
    }));
  });

  describe('concurrency option', () => {
    it('should limit concurrency and fallback to csr', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        concurrency: 3,
        timeout: 200,
      })
        .request('a')
        .request('b')
        .request('c')
        .request('d')
        .request('e');

      tick(200);
      expect(engineRunner.renders).toEqual([
        '', // CSR fallback for 'd'
        '', // CSR fallback for 'e'
        'a-0',
        'b-1',
        'c-2',
      ]);
    }));

    it('should reinvigorate limit after emptying the queue', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        concurrency: 2,
        timeout: 200,
      }).request('a');

      tick(60);
      engineRunner.request('b').request('c');
      tick(60);
      engineRunner.request('d').request('e');
      tick(200);
      engineRunner.request('f').request('g');
      tick(200);

      expect(engineRunner.renders).toEqual([
        '', // CSR fallback for 'c'
        'a-0',
        '', // CSR fallback for 'e'
        'b-1',
        'd-2',
        'f-3',
        'g-4',
      ]);
    }));
  });

  describe('ttl option', () => {
    it('should invalidate expired renders', fakeAsync(() => {
      let currentDate = 100;
      spyOn(Date, 'now').and.callFake(() => currentDate);

      const engineRunner = new TestEngineRunner({
        cache: true,
        ttl: 300,
        timeout: 200,
      }).request('a');

      tick(200);
      currentDate += 200;
      engineRunner.request('a');

      tick(200);
      currentDate += 200;
      engineRunner.request('a');

      tick(200);
      expect(engineRunner.renders).toEqual(['a-0', 'a-0', 'a-1']);
    }));
  });

  describe('renderKeyResolver option', () => {
    it('should use custom render key resolver', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        renderKeyResolver: (req) => req.originalUrl.substr(0, 2),
        timeout: 200,
        cache: true,
      }).request('ala');

      tick(200);
      engineRunner.request('ale');
      tick(200);
      engineRunner.request('ela');
      tick(200);
      engineRunner.request('alu');
      tick(200);
      engineRunner.request('elu');
      tick(200);
      expect(engineRunner.renders).toEqual([
        'ala-0',
        'ala-0',
        'ela-1',
        'ala-0',
        'ela-1',
      ]);
    }));
  });

  describe('renderingStrategyResolver option', () => {
    describe('ALWAYS_SSR', () => {
      it('should ignore timeout', fakeAsync(() => {
        const engineRunner = new TestEngineRunner({
          renderingStrategyResolver: () => RenderingStrategy.ALWAYS_SSR,
          timeout: 50,
          cache: true,
        }).request('a');

        tick(200);
        expect(engineRunner.renders).toEqual(['a-0']);
      }));

      it('should ignore timeout also when it is set to 0', fakeAsync(() => {
        const engineRunner = new TestEngineRunner({
          renderingStrategyResolver: () => RenderingStrategy.ALWAYS_SSR,
          timeout: 0,
          cache: true,
        }).request('a');

        tick(200);
        expect(engineRunner.renders).toEqual(['a-0']);
      }));

      it('should render each request separately, even if there is already a pending render for the same rendering key', fakeAsync(() => {
        const engineRunner = new TestEngineRunner({
          renderingStrategyResolver: () => RenderingStrategy.ALWAYS_SSR,
          timeout: 200,
        });
        spyOn(
          engineRunner.optimizedSsrEngine as any,
          'expressEngine' // 'expressEngine' is a protected property
        ).and.callThrough();

        engineRunner.request('a');
        tick(1);
        engineRunner.request('a');
        expect(engineRunner.renders).toEqual([]);

        tick(100);
        expect(engineRunner.renders).toEqual(['a-0', 'a-1']);
        expect(
          engineRunner.optimizedSsrEngine['expressEngine']
        ).toHaveBeenCalledTimes(2);
      }));
    });

    describe('ALWAYS_CSR', () => {
      it('should return CSR instantly', fakeAsync(() => {
        const engineRunner = new TestEngineRunner({
          renderingStrategyResolver: () => RenderingStrategy.ALWAYS_CSR,
          timeout: 200,
          cache: true,
        }).request('a');

        tick(200);
        engineRunner.request('a');
        tick(200);
        expect(engineRunner.renders).toEqual(['', '']);
      }));

      it('should not start the actual render in the background', fakeAsync(() => {
        const engineRunner = new TestEngineRunner({
          renderingStrategyResolver: () => RenderingStrategy.ALWAYS_CSR,
          timeout: 200,
          cache: true,
        });
        spyOn(
          engineRunner.optimizedSsrEngine as any,
          'expressEngine' // 'expressEngine' is a protected property
        ).and.callThrough();

        engineRunner.request('a');
        expect(engineRunner.renders).toEqual(['']);

        expect(
          engineRunner.optimizedSsrEngine['expressEngine']
        ).not.toHaveBeenCalled();
      }));
    });

    describe('DEFAULT', () => {
      it('should obey the timeout', fakeAsync(() => {
        const engineRunner = new TestEngineRunner({
          renderingStrategyResolver: () => RenderingStrategy.DEFAULT,
          timeout: 50,
        }).request('a');

        tick(200);
        engineRunner.request('a');
        expect(engineRunner.renders).toEqual(['', 'a-0']);
      }));

      it('should fallback to CSR when there is already pending a render for the same rendering key', fakeAsync(() => {
        const engineRunner = new TestEngineRunner({
          renderingStrategyResolver: () => RenderingStrategy.DEFAULT,
          timeout: 200,
        }).request('a');

        tick(1);
        engineRunner.request('a');

        expect(engineRunner.renders).toEqual(['']); // immediate fallback to CSR for the 2nd request for the same key

        tick(100);
        expect(engineRunner.renders).toEqual(['', 'a-0']);
      }));
    });

    describe('custom resolver function', () => {
      it('should return different strategies for different requests', fakeAsync(() => {
        const engineRunner = new TestEngineRunner({
          renderingStrategyResolver: (req) =>
            req.get('User-Agent')?.match(/bot|crawl|slurp|spider|mediapartners/)
              ? RenderingStrategy.ALWAYS_SSR
              : RenderingStrategy.DEFAULT,
          timeout: 50,
        });

        engineRunner.request('a');
        engineRunner.request('a', { httpHeaders: { 'User-Agent': 'bot' } });
        tick(200);

        expect(engineRunner.renders).toEqual(['', 'a-1']);
      }));
    });
  });

  describe('forcedSsrTimeout option', () => {
    it('should fallback to csr when forcedSsrTimeout timeout is exceeded for ALWAYS_SSR rendering strategy, and return the timed out render in the followup request', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        renderingStrategyResolver: () => RenderingStrategy.ALWAYS_SSR,
        timeout: 50,
        forcedSsrTimeout: 80,
      }).request('a');

      tick(60);
      expect(engineRunner.renders).toEqual([]);

      tick(50);
      expect(engineRunner.renders).toEqual(['']);

      engineRunner.request('a');
      expect(engineRunner.renders).toEqual(['', 'a-0']);
    }));

    it('should not affect DEFAULT rendering strategy', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        timeout: 50,
        forcedSsrTimeout: 80,
      }).request('a');

      tick(60);
      expect(engineRunner.renders).toEqual(['']);

      tick(50);
      engineRunner.request('a');
      expect(engineRunner.renders).toEqual(['', 'a-0']);
    }));
  });

  describe('maxRenderTime option', () => {
    const fiveMinutes = 300000;

    it('should not kick-in for the non-hanging (normal) renders', fakeAsync(() => {
      const renderTime = 10;
      const requestUrl = 'a';
      const engineRunner = new TestEngineRunner({}, renderTime).request(
        requestUrl
      );
      spyOn<any>(engineRunner.optimizedSsrEngine, 'log').and.callThrough();

      tick(renderTime + 1);
      expect(engineRunner.renderCount).toEqual(1);
      expect(engineRunner.optimizedSsrEngine['log']).not.toHaveBeenCalledWith(
        `Rendering of ${requestUrl} was not able to complete. This might cause memory leaks!`,
        false
      );
    }));

    it('should use the default value of 5 minutes for hanging renders', fakeAsync(() => {
      const requestUrl = 'a';
      const renderTime = fiveMinutes + 100;
      const engineRunner = new TestEngineRunner({}, renderTime).request(
        requestUrl
      );
      spyOn<any>(engineRunner.optimizedSsrEngine, 'log').and.callThrough();

      tick(fiveMinutes);
      expect(engineRunner.renderCount).toEqual(0);
      expect(engineRunner.optimizedSsrEngine['log']).toHaveBeenCalledWith(
        `Rendering of ${requestUrl} was not able to complete. This might cause memory leaks!`,
        false
      );

      tick(101);
      expect(engineRunner.renderCount).toEqual(1);
    }));

    it('should use the provided value instead of the default one', fakeAsync(() => {
      const requestUrl = 'a';
      const renderTime = 200;
      const maxRenderTime = renderTime - 50; // shorter than the predicted render time
      const engineRunner = new TestEngineRunner(
        { maxRenderTime },
        renderTime
      ).request(requestUrl);
      spyOn<any>(engineRunner.optimizedSsrEngine, 'log').and.callThrough();

      tick(maxRenderTime);
      expect(engineRunner.renderCount).toEqual(0);
      expect(engineRunner.optimizedSsrEngine['log']).toHaveBeenCalledWith(
        `Rendering of ${requestUrl} was not able to complete. This might cause memory leaks!`,
        false
      );

      tick(50);
      expect(engineRunner.renderCount).toEqual(1);
    }));

    it('should release the concurrency slot for the hanging render', fakeAsync(() => {
      const hangingRequest = 'a';
      const csrRequest = 'b';
      const ssrRequest = 'c';
      const renderTime = 200;
      const maxRenderTime = renderTime - 50; // shorter than the predicted render time
      const engineRunner = new TestEngineRunner(
        { concurrency: 1, maxRenderTime },
        renderTime
      );
      spyOn<any>(engineRunner.optimizedSsrEngine, 'log').and.callThrough();

      // issue two requests
      engineRunner.request(hangingRequest);
      engineRunner.request(csrRequest);
      expect(engineRunner.optimizedSsrEngine['currentConcurrency']).toEqual(1);

      tick(1);
      // while the concurrency slot is busy rendering the first hanging request, the second request gets the CSR version
      expect(engineRunner.optimizedSsrEngine['log']).toHaveBeenCalledWith(
        `CSR fallback: Concurrency limit exceeded (1)`
      );
      expect(engineRunner.renderCount).toEqual(0);
      expect(engineRunner.optimizedSsrEngine['currentConcurrency']).toEqual(1);

      tick(maxRenderTime);
      expect(engineRunner.optimizedSsrEngine['log']).toHaveBeenCalledWith(
        `Rendering of ${hangingRequest} was not able to complete. This might cause memory leaks!`,
        false
      );
      expect(engineRunner.renderCount).toEqual(0);

      // even though the hanging request is still rendering, we've freed up a slot for a new request
      engineRunner.request(ssrRequest);
      tick(1);
      expect(engineRunner.optimizedSsrEngine['log']).toHaveBeenCalledWith(
        `Rendering started (${ssrRequest})`
      );
      expect(engineRunner.optimizedSsrEngine['currentConcurrency']).toEqual(1);

      flush();
    }));

    it('should not cache the result of the hanging render, even when it succeeds after `maxRenderTime`', fakeAsync(() => {
      const requestUrl = 'a';
      const renderTime = fiveMinutes + 100;
      const engineRunner = new TestEngineRunner(
        {
          timeout: 200,
          cache: true,
        },
        renderTime
      ).request(requestUrl);
      spyOn<any>(engineRunner.optimizedSsrEngine, 'log').and.callThrough();
      expect(engineRunner.renders).toEqual([]);

      tick(fiveMinutes + 101);
      expect(engineRunner.optimizedSsrEngine['log']).toHaveBeenCalledWith(
        `Rendering of ${requestUrl} completed after the specified maxRenderTime, therefore it was ignored.`
      );
      expect(engineRunner.renders).toEqual(['']);

      engineRunner.request(requestUrl);
      expect(engineRunner.renders).toEqual(['']); // if the result was cached, the 2nd request would get immediately 'a-0'
      flush();
    }));
  });
});
