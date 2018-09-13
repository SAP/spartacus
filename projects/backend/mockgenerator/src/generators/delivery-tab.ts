import * as faker from 'faker';
import { ClientGenerator } from '../helpers/client-generator';
import { ENDPOINTS } from '../constants/endpoints';

export class DeliveryTabGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    console.log(`[${site}-${ENDPOINTS.PRODUCT_DELIVERY_TAB}] generated`);

    return {
      [`${site}-${ENDPOINTS.PRODUCT_DELIVERY_TAB}`]: {
        uid: 'deliveryTab',
        typeCode: 'CMSTabParagraphComponent',
        modifiedTime: faker.date.recent(),
        name: 'Delivery tab',
        container: 'false',
        title: 'Delivery',
        content: `<div class="tab-delivery">${faker.lorem.sentences(5)}</div>`
      }
    };
  }
}
