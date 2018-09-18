export abstract class ServerConfig {
  server?: {
    baseUrl?: string,
    occPrefix?: string
  };
}

export const defaultServerConfig: ServerConfig = {
  server: {
    baseUrl: 'https://localhost:9002',
    occPrefix: '/rest/v2/'
  }
};
