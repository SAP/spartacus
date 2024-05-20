import { isNotFoundError } from './utils';

describe('Ticket utils', () => {
  describe('isNotFoundError', () => {
    it('should return true when it is notFound error', () => {
      expect(
        isNotFoundError({
          type: 'NotFoundError',
          reason: 'notFound',
        })
      ).toEqual(true);
    });
  });
});
