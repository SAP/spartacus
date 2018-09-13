import { ClientGenerator } from '../helpers/client-generator';
import { ENDPOINTS } from '../constants/endpoints';

export class LanguagesGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    const result = await this.client.getLanguages(site);
    return {
      [`${site}-${ENDPOINTS.LANGUAGES}`]: result
    };
  }
}
