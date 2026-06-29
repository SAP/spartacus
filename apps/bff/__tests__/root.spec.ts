/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { rootRouter } from '../src/api/routers/root';

describe('root router', () => {
  it('should have the required routers', () => {
    expect(rootRouter).toMatchObject({
      sample: expect.any(Object),
      status: expect.any(Function),
    });
  });
});
