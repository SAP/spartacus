import { OptimizedSsrEngine } from './optimized-ssr-engine';
import { fakeAsync, tick } from '@angular/core/testing';
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
 * 3. Examine renderings property for the renders
 */
class TestEngineRunner {
  /** Accumulates html output for engine runs */
  renderings: string[] = [];

  /** Accumulates response parameters for engine runs */
  responseParams: object[] = [];

  renderCount = 0;
  engineInstance;

  constructor(options: SsrOptimizationOptions) {
    // mocked engine instance that will render test output in 100 milliseconds
    const engineInstanceMock = (filePath, _, callback) => {
      setTimeout(() => {
        callback(undefined, `${filePath}-${this.renderCount++}`);
      }, 100);
    };

    this.engineInstance = new OptimizedSsrEngine(
      engineInstanceMock,
      options
    ).engineInstance;
  }

  /** Run request against the engine. The result will be stored in rendering property. */
  request(url: string) {
    const response = {};
    const optionsMock = {
      req: {
        originalUrl: url,
      },
      res: {
        set: (key, value) => (response[key] = value),
      },
    };

    this.engineInstance(url, optionsMock, (_, html) => {
      this.renderings.push(html);
      this.responseParams.push(response);
    });

    return this;
  }
}

describe('OptimizedSsrEngine', () => {
  describe('timeout option', () => {
    it('should fallback to csr if rendering exceeds timeout', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 50 }).request('a');
      tick(200);
      expect(engineRunner.renderings).toEqual(['']);
    }));

    it('should return timed out render in the followup request', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 50 }).request('a');
      tick(200);
      expect(engineRunner.renderings).toEqual(['']);

      engineRunner.request('a');
      expect(engineRunner.renderings[1]).toEqual('a-0');
    }));

    it('should return render if rendering meets timeout', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 150 }).request('a');
      tick(200);
      expect(engineRunner.renderings).toEqual(['a-0']);
    }));

    it('should fallback instantly if is set to 0', () => {
      const engineRunner = new TestEngineRunner({ timeout: 0 }).request('a');
      expect(engineRunner.renderings).toEqual(['']);
    });
  });

  describe('no-store cache controll header', () => {
    it('should be applied for a fallback', () => {
      const engineRunner = new TestEngineRunner({ timeout: 0 }).request('a');
      expect(engineRunner.renderings).toEqual(['']);
      expect(engineRunner.responseParams).toEqual([
        { 'Cache-Control': 'no-store' },
      ]);
    });

    it('should not be applied for a render within time limit', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 200 }).request('a');
      tick(200);
      expect(engineRunner.renderings).toEqual(['a-0']);
      expect(engineRunner.responseParams).toEqual([{}]);
    }));

    it('should not be applied for a render served with next response', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({ timeout: 50 }).request('a');
      tick(200);
      engineRunner.request('a');
      expect(engineRunner.renderings).toEqual(['', 'a-0']);
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
      expect(engineRunner.renderings).toEqual(['a-0', 'a-1', 'a-2']);
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
      expect(engineRunner.renderings).toEqual(['a-0', 'a-0', 'a-0']);
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
      expect(engineRunner.renderings).toEqual(['', '', 'a-0', 'b-1', 'c-2']);
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

      expect(engineRunner.renderings).toEqual([
        '',
        'a-0',
        '',
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
      expect(engineRunner.renderings).toEqual(['a-0', 'a-0', 'a-1']);
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
      expect(engineRunner.renderings).toEqual([
        'ala-0',
        'ala-0',
        'ela-1',
        'ala-0',
        'ela-1',
      ]);
    }));
  });

  describe('renderingStrategyResolver option', () => {
    it('always SSR should ignore timeout', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        renderingStrategyResolver: () => RenderingStrategy.ALWAYS_SSR,
        timeout: 50,
        cache: true,
      }).request('a');

      tick(200);
      expect(engineRunner.renderings).toEqual(['a-0']);
    }));

    it('always CSR should return CSR instantly', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        renderingStrategyResolver: () => RenderingStrategy.ALWAYS_CSR,
        timeout: 200,
        cache: true,
      }).request('a');

      tick(200);
      engineRunner.request('a');
      tick(200);
      expect(engineRunner.renderings).toEqual(['', '']);
    }));

    it('default should obey the timeout', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        renderingStrategyResolver: () => RenderingStrategy.DEFAULT,
        timeout: 50,
      }).request('a');

      tick(200);
      engineRunner.request('a');
      expect(engineRunner.renderings).toEqual(['', 'a-0']);
    }));
  });

  describe('forcedSsrTimeout option', () => {
    it('should fallback to csr for always ssr rendering strategy', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        renderingStrategyResolver: () => RenderingStrategy.ALWAYS_SSR,
        timeout: 50,
        forcedSsrTimeout: 80,
      }).request('a');

      tick(60);
      expect(engineRunner.renderings).toEqual([]);

      tick(50);
      expect(engineRunner.renderings).toEqual(['']);

      engineRunner.request('a');
      expect(engineRunner.renderings).toEqual(['', 'a-0']);
    }));

    it('should not affect default rendering strategy', fakeAsync(() => {
      const engineRunner = new TestEngineRunner({
        timeout: 50,
        forcedSsrTimeout: 80,
      }).request('a');

      tick(60);
      expect(engineRunner.renderings).toEqual(['']);

      tick(50);
      engineRunner.request('a');
      expect(engineRunner.renderings).toEqual(['', 'a-0']);
    }));
  });
});
