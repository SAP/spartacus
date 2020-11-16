import { OptimizedSsrEngine } from './optimized-ssr-engine';

const fakeEngine: any = {};

describe('OptimizedSsrEngine', () => {
  let engine: OptimizedSsrEngine;

  beforeEach(() => {
    engine = new OptimizedSsrEngine(fakeEngine, {});
  });

  it('should create engine instance', () => {
    expect(engine).toBeTruthy();
    expect(engine.engineInstance).toBeTruthy();
  });
});
