/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('GET /status', () => {
  it('should return a message', async () => {
    const res = await fetch(`${baseUrl}/status`);

    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ server: 'healthy' });
  });
});
