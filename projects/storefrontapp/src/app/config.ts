import { environment } from '../environments/environment';

export const config = {
  server: {
    baseUrl: environment.occBaseUrl,
    occPrefix: '/rest/v2/'
  }
};
