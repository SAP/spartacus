export interface CdsConfig {
  cds: {
    profileTag: ProfileTagConfig;
  }
}


export interface ProfileTagConfig {
  tenant: string;
  siteId: string;
  javascriptUrl: string;
  configUrl: string;
  allowInsecureCookies?: boolean;
  gtmId?: string;
}