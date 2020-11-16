import { RenderingCache } from './rendering-cache';

describe('RenderingCache', () => {
  let renderingCache: RenderingCache;

  beforeEach(() => {
    renderingCache = new RenderingCache({});
  });

  it('should create rendering cache instance', () => {
    expect(renderingCache).toBeTruthy();
  });
});
