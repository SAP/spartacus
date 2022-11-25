import { isTicketNotFoundError } from './utils';

describe('Ticket utils', () => {
  describe('isTicketNotFoundError', () => {
    it('should return true when it is normal cart notFound error', () => {
      expect(
        isTicketNotFoundError({
          type: 'NotFoundError',
          message: 'Ticket not found for the given ID XYZ12345',
          reason: 'notFound',
        })
      ).toEqual(true);
    });
  });
});
