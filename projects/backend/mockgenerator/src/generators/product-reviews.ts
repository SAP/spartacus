import * as faker from 'faker';
import { ClientGenerator } from '../helpers/client-generator';
import { ENDPOINTS } from '../constants/endpoints';

export class ProductReviewsGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    const reviews = this.generateProductReviews();
    return {
      [ENDPOINTS.PRODUCTS_REVIEWS]: { reviews }
    };
  }

  generateProductReviews() {
    const amount = faker.random.number({ min: 0, max: 32 });
    return Array(amount)
      .fill({ name: faker.name.findName(), email: faker.internet.email() })
      .map(({ name, email }) => ({
        comment: faker.lorem.sentences(4),
        date: faker.date.past(),
        headline: faker.lorem.sentence(1),
        id: faker.random.alphaNumeric(12),
        principal: { name, uid: email },
        name,
        uid: faker.internet.email(),
        rating: faker.random.number()
      }));
  }
}
