import { ClientGenerator } from '../helpers/client-generator';
import { ENDPOINTS } from '../constants/endpoints';

export class TitlesGenerator extends ClientGenerator {
  async generateForSite(site: string) {
    const result = await this.client.getTitles(site);

    console.log(`[${site}-${ENDPOINTS.TITLES}] generated`);

    return {
      [`${site}-${ENDPOINTS.TITLES}`]: result
    };
  }
}
