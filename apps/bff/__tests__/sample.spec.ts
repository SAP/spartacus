/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { sample, sayHelloFn } from '../src/api/routers/sample';

describe('sample', () => {
  const caller = createCaller.procedure(sample);

  it('should return the "Hello Foo!" message', async () => {
    await expect(caller().sayHello({ name: 'Foo' })).resolves.toEqual({
      message: 'Hello Foo!',
    });
  });

  it('should return the "Hello world!" message by default', async () => {
    await expect(caller().sayHello()).resolves.toEqual({
      message: 'Hello world!',
    });
  });

  it('should log forwarded headers when sayHelloFn is used', async () => {
    const info = vi.fn();
    const forwardedHeaders = { 'x-app-custom': 'foo' };
    const ctx = {
      logger: { info },
      forwardHeaders: forwardedHeaders,
      custom: { greeting: 'Hello' },
    } as any;
    const input = { name: 'Foo' };

    await sayHelloFn({ ctx, input });

    expect(info).toHaveBeenCalledWith(
      'Forwarded Headers: %o',
      forwardedHeaders,
    );
  });
});
