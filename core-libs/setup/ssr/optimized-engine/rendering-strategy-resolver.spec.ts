/// <reference types="jest" />

import { RenderingStrategy } from './ssr-optimization-options';
import { Request } from 'express';

import { defaultRenderingStrategyResolver } from './rendering-strategy-resolver';

describe('RenderingStrategyResolver', () => {
  let resolver: (req: Request) => RenderingStrategy =
    defaultRenderingStrategyResolver({
      excludedUrls: ['checkout', 'my-account'],
      excludedParams: ['asm'],
    });

  it('should return DEFAULT rendering strategy if no excluded parameters or URLs match', () => {
    const request: Partial<Request> = {
      query: {},
      url: '/some-page',
    };

    const strategy = resolver(request as Request);

    expect(strategy).toBe(RenderingStrategy.DEFAULT);
  });

  it('should return ALWAYS_CSR rendering strategy if an excluded parameter matches', () => {
    const request: Partial<Request> = {
      query: {
        asm: 'true',
      },
      url: '/some-page',
    };

    const strategy = resolver(request as Request);

    expect(strategy).toBe(RenderingStrategy.ALWAYS_CSR);
  });

  it('should return ALWAYS_CSR rendering strategy if the URL matches an excluded URL', () => {
    const request: Partial<Request> = {
      query: {},
      url: '/checkout/confirm',
    };

    const strategy = resolver(request as Request);

    expect(strategy).toBe(RenderingStrategy.ALWAYS_CSR);
  });

  it('should return ALWAYS_CSR rendering strategy if both excluded parameters and URLs match', () => {
    const request: Partial<Request> = {
      query: {
        asm: 'true',
      },
      url: '/checkout/confirm',
    };

    const strategy = resolver(request as Request);

    expect(strategy).toBe(RenderingStrategy.ALWAYS_CSR);
  });

  it('should return ALWAYS_CSR rendering strategy if the URL matches SmartEdit url', () => {
    const request: Partial<Request> = {
      query: {},
      url: 'cx-preview',
    };

    const strategy = resolver(request as Request);

    expect(strategy).toBe(RenderingStrategy.ALWAYS_CSR);
  });
});
