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
  buildUrl(endpointKey: string, _urlParams?: object, _queryParams?: object) {
    if (!endpointKey.startsWith('/')) {
      endpointKey = '/' + endpointKey;
    }
    return endpointKey;
  }
  getBaseUrl() {
    return '';
  }
  isConfigured() {
    return true;
  }
}
