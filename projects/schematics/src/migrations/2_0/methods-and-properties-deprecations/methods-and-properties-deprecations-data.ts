import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { CMS_ACTIONS_MIGRATION } from './data/cms-group.actions.migration';
import { CMS_SELECTORS_MIGRATION } from './data/cms-group.selectors.migration';
import { CMS_SERVICE_MIGRATION } from './data/cms-service.migration';
import { DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION } from './data/dynamic-attribute.service.migration';
import { URL_MATCHER_FACTORY_SERVICE_MIGRATION } from './data/url-matcher-factory.service.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...CMS_SELECTORS_MIGRATION,
  ...CMS_ACTIONS_MIGRATION,
  ...CMS_SERVICE_MIGRATION,
  ...DYNAMIC_ATTRIBUTE_SERVICE_MIGRATION,
  ...URL_MATCHER_FACTORY_SERVICE_MIGRATION,
];
