import { getWishlistName } from './utils';

describe('WishList utils', () => {
  describe('getWishlistName', () => {
    it('should return wishlist name', () => {
      expect(getWishlistName('Id123')).toEqual(`wishlistId123`);
    });
  });
});
