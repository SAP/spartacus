export interface SuffixRouteConfig {
  disabled?: boolean;
}

export abstract class SuffixRoutesConfig {
  routing?: {
    suffixRoutes?: {
      product?: SuffixRouteConfig;
      category?: SuffixRouteConfig;
    };
  };
}
