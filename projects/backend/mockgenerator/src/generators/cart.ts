import * as faker from 'faker';
import { ClientGenerator } from '../helpers/client-generator';
import { ENDPOINTS } from '../constants/endpoints';

export class CartGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    const productName = faker.commerce.productName();
    return {
      [`${site}-${ENDPOINTS.CARTS}`]: [],
      [ENDPOINTS.CART_ENTRIES]: []
    };
  }
}
