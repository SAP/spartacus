import * as faker from 'faker';
import { ClientGenerator } from '../helpers/client-generator';
import { ENDPOINTS } from '../constants/endpoints';

export class SuggestionsGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    const suggestions = this.generateSuggestions();
    return {
      [ENDPOINTS.SUGGESTIONS]: suggestions
    };
  }

  generateSuggestions() {
    const colorSuggestions = Array(20)
      .fill(1)
      .map(val => ({ value: faker.commerce.color() }));
    const productNameSuggestions = Array(50)
      .fill(1)
      .map(val => ({ value: faker.commerce.productName() }));
    return [...colorSuggestions, ...productNameSuggestions];
  }
}
