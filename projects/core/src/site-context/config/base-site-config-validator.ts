import { SiteContextConfig } from './site-context-config';
import { BASE_SITE_CONTEXT_ID } from '../providers/context-service-map';
import { getContextParameterDefault } from './context-config-utils';

export function baseSiteConfigValidator(config: SiteContextConfig) {
  if (getContextParameterDefault(config, BASE_SITE_CONTEXT_ID) === undefined) {
    return 'Please configure context.parameters.baseSite before using storefront library!';
  }
}
