import { ConfigurableRoutesConfig } from './configurable-routes-config';
import { defaultStorefrontRoutesTranslations } from './default-storefront-routes-translations';

export const defaultConfigurableRoutesConfig: ConfigurableRoutesConfig = {
  routes: {
    config: { translations: defaultStorefrontRoutesTranslations },
    fetch: false
  }
};
