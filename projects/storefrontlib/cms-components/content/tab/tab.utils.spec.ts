import { wrapIntoBounds } from './tab.utils';

describe('wrapIntoBounds', () => {
  it('should wrap index exceeding max boundary to min boundary', () => {
    expect(wrapIntoBounds(5, 3)).toBe(0);
  });

  it('should wrap index exceeding min boundary to max boundary', () => {
    expect(wrapIntoBounds(-2, 3, 0)).toBe(3);
  });

  it('should return index if it does not exceed any boundary', () => {
    expect(wrapIntoBounds(1, 5)).toBe(1);
  });

  it('should wrap index exceeding max boundary to min boundary when default min is used', () => {
    expect(wrapIntoBounds(7, 3)).toBe(0);
  });
});
