import { OccProductConfig } from './product-config';

export abstract class ProductOccService {
  constructor(private occConfig: OccProductConfig) {}

  protected getProductEndpoint() {
    return (
      (this.occConfig.server.baseUrl || '') +
      this.occConfig.server.occPrefix +
      this.occConfig.site.baseSite +
      '/'
    );
  }
}
