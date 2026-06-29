/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('sample', () => {
  describe('sayHello', () => {
    it('should return a message', async () => {
      const res = await trpc.sample.sayHello.query();

      expect(res.message).toBe('Hello world!');
    });

    it('should use the input in the message', async () => {
      const res = await trpc.sample.sayHello.query({ name: 'Vivaldi' });

      expect(res.message).toBe('Hello Vivaldi!');
    });
  });
});
