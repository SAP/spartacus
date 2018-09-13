import { ClientGenerator } from '../helpers/client-generator';
import { ENDPOINTS } from '../constants/endpoints';

export class CurrenciesGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    const result = await this.client.getCurrencies(site);
    return {
      [`${site}-${ENDPOINTS.CURRENCIES}`]: result
    };
  }
}
