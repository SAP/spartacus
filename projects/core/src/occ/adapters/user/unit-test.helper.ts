import { OccConfig } from '../../config/occ-config';
import { OccEndpointsService } from '../../services';

export const mockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
  },

  context: {
    baseSite: [''],
  },
};

export class MockOccEndpointsService implements Partial<OccEndpointsService> {
  getUrl(endpointKey: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpointKey);
  }
  getEndpoint(endpoint: string) {
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return endpoint;
  }
  getBaseEndpoint() {
    return '';
  }
  isConfigured() {
    return true;
  }
}
