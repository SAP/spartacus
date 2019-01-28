import { ConfigurableRoutesConfig } from './configurable-routes-config';
import { defaultStorefrontRoutesTranslations } from './default-storefront-routes-translations';

export const defaultConfigurableRoutesConfig: ConfigurableRoutesConfig = {
  routesConfig: {
    translations: defaultStorefrontRoutesTranslations
  },
  fetchRoutesConfig: false
};
