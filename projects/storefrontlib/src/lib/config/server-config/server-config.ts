export abstract class ServerConfig {
  server?: {
    baseUrl?: string;
    occPrefix?: string;
  };
}

export const defaultServerConfig: ServerConfig = {
  server: {
    occPrefix: '/rest/v2/'
  }
};
