import {
  loginSuccessfully,
  goToProductVariantPageFromCategory,
  addProductVariantToCart,
  addApparelPaymentMethod,
  selectApparelShippingAddress,
  addApparelShippingAddress,
} from './checkout-as-persistent-user';

export function checkoutWithVariantsTest() {
  it('should login successfully', () => {
    loginSuccessfully();
  });
  it('should add a shipping address', () => {
    addApparelShippingAddress();
  });
  it('should go to product page from category page', () => {
    goToProductVariantPageFromCategory();
  });
  it('should add product to cart', () => {
    addProductVariantToCart();
  });
  it('should get cartId and add a payment method', () => {
    addApparelPaymentMethod();
  });
  it('should proceed to checkout and select shipping address', () => {
    selectApparelShippingAddress();
  });
}
