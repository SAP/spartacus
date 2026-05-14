import { normalizeEmpty } from './normalize-empty';

describe('normalizeEmpty()', () => {
  ['string', null, undefined].forEach((input) => {
    it(`should return the input value ${input} when not empty string`, () => {
      expect(normalizeEmpty(input)).toBe(input);
    });
  });

  it('should normalize empty string to undefined', () => {
    expect(normalizeEmpty('')).toBe(undefined);
  });
});
