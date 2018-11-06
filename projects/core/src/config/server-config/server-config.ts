export abstract class ServerConfig {
  production?: boolean;
  server?: {
    baseUrl?: string;
    routesConfigUrl?: string;
    occPrefix?: string;
  };
}

export const defaultServerConfig: ServerConfig = {
  server: {
    occPrefix: '/rest/v2/'
  }
};
